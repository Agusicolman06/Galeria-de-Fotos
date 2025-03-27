// Variables globales
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const modal = document.getElementById('fullscreen-modal');
const modalContent = document.getElementById('modal-content');

// Elementos del reproductor
const audioPlayer = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const audioControls = document.getElementById('audio-controls');
const progressBar = document.querySelector('.progress');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

// Función para cambiar el tema
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'light');
    }
}

// Función para controlar la reproducción de música
function toggleMusic() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        musicToggle.textContent = 'Pausar Música ⏸️';
        audioControls.style.display = 'block';
    } else {
        audioPlayer.pause();
        musicToggle.textContent = 'Reproducir Música ▶️';
        audioControls.style.display = 'none';
    }
}

// Función para actualizar la barra de progreso
function updateProgress() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
    
    const currentTime = formatTime(audioPlayer.currentTime);
    const duration = formatTime(audioPlayer.duration);
    
    currentTimeDisplay.textContent = currentTime;
    durationDisplay.textContent = duration;
}

// Función para formatear el tiempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Event listeners
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
musicToggle.addEventListener('click', toggleMusic);

audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('loadedmetadata', () => {
    const duration = formatTime(audioPlayer.duration);
    durationDisplay.textContent = duration;
});

progressBar.parentElement.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = position * audioPlayer.duration;
});


// Función para cambiar la diapositiva
function changeSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Iniciar el carrusel automático
setInterval(changeSlide, 3000);

// Agregar controles del teclado al modal
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// mostrar imagen en pantalla completa
function openFullscreen(imgElement) {
    modal.style.display = 'block';
    modalContent.src = imgElement.src;
    }
    
    // Configurar eventos de clic en las imágenes
slides.forEach(slide => {
    slide.querySelector('img').addEventListener('click', (e) => {
    openFullscreen(e.target);
    });
    });
    
    // Función para cerrar el modal
    function closeModal() {
    modal.style.display = 'none';
    }
    
    // Agregar evento de cierre al botón
    document.querySelector('.close-button').addEventListener('click', closeModal);