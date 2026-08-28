// Service Worker - Taller: Conceptos fundamentales de PWA
const CACHE_NAME = 'cacheApp-v1';


const ANIMALS = ['dog.svg', 'cat.svg', 'fox.svg', 'rabbit.svg'];


let visitCount = 0;

self.addEventListener('install', event => {
    console.log('[SW] installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ANIMALS.map(a => './img/' + a)))
    );
});


self.addEventListener('activate', event => {
    console.log('[SW] activated, ready to handle fetches!');
    event.waitUntil(self.clients.claim());
});


self.addEventListener('message', event => {
    if (event.data && event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});


self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);


    if (url.pathname.endsWith('/img/animal.svg')) {
        const current = url.searchParams.get('current');
        const opciones = ANIMALS.filter(a => a !== current);
        const elegido = opciones[Math.floor(Math.random() * opciones.length)];

        event.respondWith(
            caches.match('./img/' + elegido).then(response =>
                response.blob().then(blob => new Response(blob, {
                    headers: {
                        'Content-Type': 'image/svg+xml',
                        'X-Animal-Name': elegido
                    }
                }))
            )
        );
        return;
    }

 
    if (url.pathname.endsWith('/api/hora')) {
        const ahora = new Date().toLocaleTimeString('es-CO');
        event.respondWith(
            new Response(JSON.stringify({ hora: ahora }), {
                headers: { 'Content-Type': 'application/json' }
            })
        );
        return;
    }


    if (url.pathname.endsWith('/api/contador')) {
        visitCount++;
        event.respondWith(
            new Response(JSON.stringify({ contador: visitCount }), {
                headers: { 'Content-Type': 'application/json' }
            })
        );
        return;
    }

  
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});
