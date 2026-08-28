
const ANIMALS = ['dog.svg', 'cat.svg', 'fox.svg', 'rabbit.svg'];
let current = 'dog.svg';

const img = new Image();

navigator.serviceWorker.register('sw.js')
    .then(reg => {
        console.log('SW registered!', reg);

        
        reg.addEventListener('updatefound', () => {
            const nuevoSW = reg.installing;
            console.log('[Página] Nuevo Service Worker encontrado, instalando...');
            nuevoSW.addEventListener('statechange', () => {
                console.log('[Página] El nuevo SW cambió de estado a:', nuevoSW.state);
                if (nuevoSW.state === 'installed' && navigator.serviceWorker.controller) {
                    mostrarBotonActualizar(reg);
                }
            });
        });
    })
    .catch(err => console.log(err));

let refrescando = false;
navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refrescando) return;
    refrescando = true;
    window.location.reload();
});

function mostrarBotonActualizar(reg) {
    let btn = document.getElementById('btnActualizar');
    if (btn) return; // ya se mostró
    btn = document.createElement('button');
    btn.id = 'btnActualizar';
    btn.textContent = 'Hay una nueva versión del Service Worker. Click para actualizar';
    btn.addEventListener('click', () => {
        reg.waiting.postMessage({ action: 'skipWaiting' });
    });
    document.body.appendChild(btn);
}

setTimeout(() => {
    img.src = './img/' + current;
    img.alt = 'Animal aleatorio';
    img.title = 'Haz click para cambiar de animal';
    img.style.cursor = 'pointer';
    document.body.appendChild(img);
}, 3000);

img.addEventListener('click', () => {
    if (!navigator.serviceWorker.controller) {
        console.log('El Service Worker aún no controla la página, recarga e inténtalo de nuevo.');
        return;
    }
    fetch('./img/animal.svg?current=' + current)
        .then(res => {
            current = res.headers.get('X-Animal-Name') || current;
            return res.blob();
        })
        .then(blob => {
            img.src = URL.createObjectURL(blob);
            console.log('Click en la imagen -> nuevo animal mostrado:', current);
        });
});

const btnHora = document.getElementById('btnHora');
const resultadoHora = document.getElementById('resultadoHora');
btnHora.addEventListener('click', () => {
    fetch('./api/hora')
        .then(res => res.json())
        .then(data => {
            resultadoHora.textContent = 'Hora reportada por el Service Worker: ' + data.hora;
        });
});

const btnContador = document.getElementById('btnContador');
const resultadoContador = document.getElementById('resultadoContador');
btnContador.addEventListener('click', () => {
    fetch('./api/contador')
        .then(res => res.json())
        .then(data => {
            resultadoContador.textContent = 'El Service Worker ha contado ' + data.contador + ' clic(s)';
        });
});
