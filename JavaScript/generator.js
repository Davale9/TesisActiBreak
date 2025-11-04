//Variaables para el generador
let personaje = "";
let intensidad = "";
let duracion = 0;
let ejerciciosTodos = [];
let ejerciciosRutina = [];
let indiceActual = 0;
let video = null;
let audio = null;
const videoContainer = document.getElementById("video-container");

//Variables para pausas
let tiempoRestante = 0;
let temporizador = null;
let enPausa = false;
let isPaused = false;


//Botones de personaje
const botonHombre = document.getElementById("Male");
const botonMujer = document.getElementById("Female");


//Botones de intensidad
const botonBaja = document.getElementById("Baja");
const botonMedia = document.getElementById("Media");
const botonAlta = document.getElementById("Alta");

//Botones de duracion
const boton1 = document.getElementById("1");
const boton2 = document.getElementById("2");
const boton3 = document.getElementById("3");
const boton4 = document.getElementById("4");
const boton5 = document.getElementById("5");
const boton6 = document.getElementById("6");
const boton7 = document.getElementById("7");
const boton8 = document.getElementById("8");
const boton9 = document.getElementById("9");
const boton10 = document.getElementById("10");

//Botones de ángulos
const botonFrente = document.getElementById("Frente");
const botonDiagonal = document.getElementById("Diagonal");
const botonLado = document.getElementById("Lado");

//Botones de controles
const botonPausa = document.getElementById("Pausa");
const botonSilencio = document.getElementById("Silencio");
const botonSaltar = document.getElementById("Saltar");
const botonReemplazar = document.getElementById("Reemplazar");

//Arreglos con todos los botones
const intensidades = [...document.getElementsByClassName("button-intensity")];
const duraciones = [...document.getElementsByClassName("button-duration")];

//Recolectar ejercicios de JSON
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://davale9.github.io/TesisActiBreak/ejercicios.json")
        .then(r => r.json())
        .then(data => {
        ejerciciosTodos = data;
    });
});

//Determinar personaje y activar o desactivar el resto de botones
botonHombre.addEventListener("click", () => { 
    personaje = "male";
    intensidades.forEach(intensidad => {
        intensidad.removeAttribute("disabled");
    });
    duraciones.forEach(duracion => {
        duracion.setAttribute("disabled", "");
    });
});

botonMujer.addEventListener("click", () => { 
    personaje = "female";
    intensidades.forEach(intensidad => {
        intensidad.removeAttribute("disabled");
    });
    duraciones.forEach(duracion => {
        duracion.setAttribute("disabled", "");
    });
});

//Determinar intensidad y activar el resto de botones
botonBaja.addEventListener("click", () => { 
    intensidad = "Baja";
    duraciones.forEach(duracion => {
        duracion.removeAttribute("disabled");
    }); 
});
botonMedia.addEventListener("click", () => { 
    intensidad = "Media"; 
    duraciones.forEach(duracion => {
        duracion.removeAttribute("disabled");
    });
});
botonAlta.addEventListener("click", () => { 
    intensidad = "Alta"; 
    duraciones.forEach(duracion => {
        duracion.removeAttribute("disabled");
    });
});

//Determinar duracion, desactivar vista del selector y función que genra rutina
boton1.addEventListener("click", () => { 
    duracion = 1;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    generarRutina();
});
boton2.addEventListener("click", () => { 
    duracion = 2;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    generarRutina();
});
boton3.addEventListener("click", () => { 
    duracion = 3;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    generarRutina();
});
boton4.addEventListener("click", () => { 
    duracion = 4;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    generarRutina();
});
boton5.addEventListener("click", () => { 
    duracion = 5;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    generarRutina();
});
boton6.addEventListener("click", () => { 
    duracion = 6;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    generarRutina();
});
boton7.addEventListener("click", () => { 
    duracion = 7;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    generarRutina();
});
boton8.addEventListener("click", () => { 
    duracion = 8;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    generarRutina();
});
boton9.addEventListener("click", () => { 
    duracion = 9;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    generarRutina();
});
boton10.addEventListener("click", () => { 
    duracion = 10;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    generarRutina();
});

function generarRutina() {
    var ejerciciosFiltrados = [];
    var unidades = 0;
    var extra = 0;

    ejerciciosFiltrados = ejerciciosTodos
        .filter(e => (e.intensidad == intensidad))
        .filter(e => (e.enfoque != null));
    ejerciciosFiltrados.sort(function() {
        return Math.random() - 0.5;
    });

    unidades = duracion * 2;

    if (unidades <= 10) {
        ejerciciosRutina = ejerciciosFiltrados.slice(0, unidades);
    } else if (unidades >=12) {
        ejerciciosRutina = ejerciciosFiltrados;
        extra = unidades - 10;
        for (let index = 0; index < extra; index++) {
            ejerciciosRutina[index].duracion = 60;
        }
    }

    renderizarVideos(ejerciciosRutina[indiceActual], ejerciciosRutina[indiceActual].duracion);
}

function pasarEjercicio() {
    indiceActual++;
    if (indiceActual < ejerciciosRutina.length) {
        const siguiente = ejerciciosRutina[indiceActual];
        renderizarVideos(siguiente, siguiente.duracion);
    } else {
        finalizarRutina();
    }
}

function renderizarVideos(ejercicio, duracion) {
    video = document.createElement("video");

    audio = document.createElement("audio");

    isPaused = false;
    video.id = "video";
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.style.width = "100%";

    var tiempoActual = video.currentTime;

    if (personaje == "male") {
        video.src = "../" + ejercicio.videosMale.diagonal;
        videoContainer.appendChild(video);

        audio.src = "../" + ejercicio.audioMale;
        audio.play();
    } else if (personaje == "female") {
        video.src = "../" + ejercicio.videosFemale.diagonal;
        videoContainer.appendChild(video);

        audio.src = "../" + ejercicio.audioFemale;
        audio.play();
    }

    audio.addEventListener("ended", () => {
        audio.remove();
    });

    botonFrente.addEventListener("click", () => { 
        if (personaje == "male") {
            tiempoActual = video.currentTime;
            video.src = "../" + ejercicio.videosMale.frontal;
            video.currentTime = tiempoActual;
            if (isPaused) {
                video.pause();
            }
        } else if (personaje == "female") {
            tiempoActual = video.currentTime;
            video.src = "../" + ejercicio.videosFemale.frontal;
            video.currentTime = tiempoActual;
            if (isPaused) {
                video.pause();
            }
        }
    });

    botonDiagonal.addEventListener("click", () => { 
        if (personaje == "male") {
            tiempoActual = video.currentTime;
            video.src = "../" + ejercicio.videosMale.diagonal;
            video.currentTime = tiempoActual;
            if (isPaused) {
                video.pause();
            }
        } else if (personaje == "female") {
            tiempoActual = video.currentTime;
            video.src = "../" + ejercicio.videosFemale.diagonal;
            video.currentTime = tiempoActual;
            if (isPaused) {
                video.pause();
            }
        }
    });

    botonLado.addEventListener("click", () => { 
        if (personaje == "male") {
            tiempoActual = video.currentTime;
            video.src = "../" + ejercicio.videosMale.lateral;
            video.currentTime = tiempoActual;
            if (isPaused) {
                video.pause();
            }
        } else if (personaje == "female") {
            tiempoActual = video.currentTime;
            video.src = "../" + ejercicio.videosFemale.lateral;
            video.currentTime = tiempoActual;
            if (isPaused) {
                video.pause();
            }
        }
    });

    tiempoRestante = duracion;
    actualizarCronometro();

    if (temporizador) clearInterval(temporizador);

    temporizador = setInterval(() => {
        if (!enPausa) {
            tiempoRestante -= 1;
            actualizarCronometro();
            console.log(enPausa);

            if (tiempoRestante <= 0) {
                clearInterval(temporizador);
                video.remove();
                pasarEjercicio();   
            }
        }
    }, 1000);
}

botonPausa.addEventListener("click", () => { 
    if (botonPausa.value == "1") {
        if (enPausa) return;
        enPausa = true;
        
        botonPausa.value = "0";
        video.pause();
        document.getElementById("icono-pausa").classList.add("hide");
        document.getElementById("icono-play").classList.remove("hide");
        isPaused = true;

        audio.pause();

        console.log(enPausa);
    } else {
        if (!enPausa) return;
        enPausa = false;

        botonPausa.value = "1";
        video.play();
        document.getElementById("icono-pausa").classList.remove("hide");
        document.getElementById("icono-play").classList.add("hide");
        isPaused = false;
        
        if (audio && audio.currentTime < audio.duration) {
            audio.play();
        }

        console.log(enPausa);
    }
});

function actualizarCronometro() {
    const cronometro = document.getElementById("time-ejercicio");
    const minutos = String(Math.floor(tiempoRestante / 60)).padStart(2, "0");
    const segundos = String(tiempoRestante % 60).padStart(2, "0");
    cronometro.textContent = `${minutos}:${segundos}`;
}

function finalizarRutina() {
    clearInterval(temporizador);
    if (video) video.remove();
    if (audio) audio.remove();
    alert("¡Rutina completada!");
}