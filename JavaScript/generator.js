//Variaables para el generador
let personaje = "";
let intensidad = "";
let duracion = 0;
let ejerciciosTodos = [];
let ejerciciosFiltrados = [];
let ejerciciosRutina = [];
let indiceActual = 0;
let video = null;
let audio = null;
const videoContainer = document.getElementById("video-container");

//Variables para pausas
let tiempoTotal = 0;
let tiempoRestante = 0;
let tiempoFaltante = 0;
let temporizador = null;
let enPausa = false;
let isPaused = false;
let isSilenced = false;

//Variables para reemplazar
let duracionActual = 0;
let ejercicioReemplazo = null;
let indiceCambio = 0;

//Variables para inicio y final
let img = null;
let tiempoImagen = 0;
let audioIF = null;
let temporizadorImg = null;


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

    const rutinaRehacer = localStorage.getItem("rutinaRehacer");
    if (rutinaRehacer) {
        const rutina = JSON.parse(rutinaRehacer);
        generarRutinaDesdeHistorial(rutina);
        localStorage.removeItem("rutinaRehacer"); // limpiar después de usarla
    }
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
    document.getElementById("reiniciar").classList.remove("hide");
    generarRutina();
});

boton2.addEventListener("click", () => { 
    duracion = 2;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    document.getElementById("reiniciar").classList.remove("hide");
    generarRutina();
});

boton3.addEventListener("click", () => { 
    duracion = 3;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    document.getElementById("reiniciar").classList.remove("hide");
    generarRutina();
});

boton4.addEventListener("click", () => { 
    duracion = 4;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    document.getElementById("reiniciar").classList.remove("hide");
    generarRutina();
});

boton5.addEventListener("click", () => { 
    duracion = 5;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    document.getElementById("reiniciar").classList.remove("hide");
    generarRutina();
});

boton6.addEventListener("click", () => { 
    duracion = 6;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    document.getElementById("reiniciar").classList.remove("hide");
    generarRutina();
});

boton7.addEventListener("click", () => { 
    duracion = 7;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    document.getElementById("reiniciar").classList.remove("hide");
    generarRutina();
});

boton8.addEventListener("click", () => { 
    duracion = 8;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    document.getElementById("reiniciar").classList.remove("hide");
    generarRutina();
});

boton9.addEventListener("click", () => { 
    duracion = 9;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    document.getElementById("reiniciar").classList.remove("hide");
    generarRutina();
});

boton10.addEventListener("click", () => { 
    duracion = 10;
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    document.getElementById("reiniciar").classList.remove("hide");
    generarRutina();
});

// FUNCION GENERAR RUTINA
function generarRutina() {
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

    guardarRutinaHistorial();

    inicio();
}

//FUNCION RENDERIZAR VIDEOS Y AUDIOS
function renderizarVideos(ejercicio, duracion) {
    if (video != null) video.remove();
    if (!audio) {
        audio = document.createElement("audio");
    }

    video = document.createElement("video");
    

    isPaused = false;
    video.id = "video";
    video.preload = "auto";
    audio.preload = "auto";

    
    if (isPaused || enPausa) {
        video.autoplay = false;
        audio.pause();
        video.pause();
    } else {
        video.autoplay = true;
    }

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
        audio.play().catch(err => {
            if (err.name !== "AbortError") {
                console.error("Error al reproducir el audio:", err);
            }
        });

        if (isSilenced) {
            audio.volume = 0
        }

        if (isPaused || enPausa) {
            audio.pause();
        }
    } else if (personaje == "female") {
        video.src = "../" + ejercicio.videosFemale.diagonal;
        videoContainer.appendChild(video);

        audio.src = "../" + ejercicio.audioFemale;
        audio.play().catch(err => {
            if (err.name !== "AbortError") {
                console.error("Error al reproducir el audio:", err);
            }
        });

        if (isSilenced) {
            audio.volume = 0
        }

        if (isPaused || enPausa) {
            audio.pause();
        }
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
    actualizarCronometroGeneral();

    if (temporizador) clearInterval(temporizador);

    temporizador = setInterval(() => {
        if (!enPausa) {
            tiempoRestante -= 1;
            tiempoTotal -= 1;
            actualizarCronometro();
            actualizarCronometroGeneral();
            //console.log(enPausa);

            if (tiempoRestante <= 0) {
                clearInterval(temporizador);
                video.remove();
                audio.remove();
                pasarEjercicio();
            }
        }
    }, 1000);
}

//FUNCION PARA SIGUIENTE EJERCICIO
function pasarEjercicio() {
    indiceActual++;
    if (indiceActual < ejerciciosRutina.length) {
        const siguiente = ejerciciosRutina[indiceActual];
        renderizarVideos(siguiente, siguiente.duracion);
    } else {
        despedida();
    }
}

//BOTON PAUSA
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

        //console.log(enPausa);
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

        //console.log(enPausa);
    }
});

//BOTON SILENCIO
botonSilencio.addEventListener("click", () => { 
    if (botonSilencio.value == "1") {
        botonSilencio.value = "0";
        isSilenced = true;
        audio.volume = 0;
        document.getElementById("icono-silencio").classList.remove("hide");
        document.getElementById("icono-sonido").classList.add("hide");
    } else {
        isSilenced = false;
        botonSilencio.value = "1";
        audio.volume = 1;
        document.getElementById("icono-silencio").classList.add("hide");
        document.getElementById("icono-sonido").classList.remove("hide");
    }
});

//BOTON SALTAR
botonSaltar.addEventListener("click", () => { 
    saltar();
});

//BOTON REEMPLAZAR
botonReemplazar.addEventListener("click", () => { 
    duracionActual = ejerciciosRutina[indiceActual].duracion;

    indiceCambio = Math.floor(Math.random() * ejerciciosFiltrados.length);

    while (indiceActual == indiceCambio) {
        indiceCambio = Math.floor(Math.random() * ejerciciosFiltrados.length);
    }

    ejercicioReemplazo = ejerciciosFiltrados[indiceCambio];

    ejercicioReemplazo.duracion = duracionActual;
    ejerciciosRutina.splice(indiceActual + 1, 0, ejercicioReemplazo);

    tiempoTotal += duracionActual;

    saltar();
});

//FUNCION PARA CRONOMETRO DE EJERCICIO
function actualizarCronometro() {
    const cronometro = document.getElementById("time-ejercicio");
    const minutos = String(Math.floor(tiempoRestante / 60)).padStart(2, "0");
    const segundos = String(tiempoRestante % 60).padStart(2, "0");
    cronometro.textContent = `${minutos}:${segundos}`;
}

function actualizarCronometroGeneral() {
    const cronometro = document.getElementById("time-rutina");
    const minutos = String(Math.floor(tiempoTotal / 60)).padStart(2, "0");
    const segundos = String(tiempoTotal % 60).padStart(2, "0");
    cronometro.textContent = `${minutos}:${segundos}`;
}

//FUNCION PARA CAMBIAR DE EJERCICIO
function saltar() {
    tiempoFaltante = ejerciciosRutina[indiceActual].duracion - Math.trunc(video.currentTime);

    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    video.remove();
    
    tiempoTotal -= tiempoFaltante;
    clearInterval(temporizador);
    pasarEjercicio();
}

//FUNCION PARA GUARDAR LA RUTINA EN EL HISTORIAL
function guardarRutinaHistorial() {
    try {
        let historial = JSON.parse(localStorage.getItem("historialRutina")) || [];

        let nuevaRutina = {
                fecha: new Date().toLocaleString("es-CO", {
                    dateStyle: "short",
                    timeStyle: "short",
                }),
                personajeH: personaje,
                intensidadH: intensidad,
                duracionH: duracion,
                ejerciciosH: ejerciciosRutina
        };

        historial.unshift(nuevaRutina);

        if (historial.length > 6) {
            historial.pop();
        }

        localStorage.setItem("historialRutina", JSON.stringify(historial));
        console.log("Rutina guardada en el historial.");
    } catch (err) {
        console.log("Error: " + err);
    }
}

//FUNCION PARA GENERAR RUTINA DESDE EL HISTORIAL
function generarRutinaDesdeHistorial(rutinaGuardada) {
    console.log("Cargando rutina desde el historial");
    document.getElementById("selector").classList.add("hide");
    document.getElementById("rutina").classList.remove("hide");
    document.getElementById("reiniciar").classList.remove("hide");

    let { personajeH, intensidadH, duracionH, ejerciciosH } = rutinaGuardada;
    
    ejerciciosRutina = ejerciciosH;
    personaje = personajeH;
    intensidad = intensidadH;
    duracion = duracionH;

    inicio();
}

//FUNCION PARA INICIAR LA RUTINA Y BIENVENIDA
function inicio() {
    for (let index = 0; index < ejerciciosRutina.length; index++) {
        tiempoTotal += ejerciciosRutina[index].duracion;
    }

    if (!audioIF) {
        audioIF = document.createElement("audio");
    }


    img = document.createElement("img");
    img.style.width = "100%";
    if (personaje == "male") {
        img.src = "../Img/Male.png";
    } else {
        img.src = "../Img/Female.png";
    }
    img.id = "img-despedida";
    videoContainer.appendChild(img);

    document.getElementById("angle-container").classList.add("hide");
    document.getElementById("cronometroYControl").classList.add("hide");

    if (personaje == "male") {
        switch (intensidad) {
            case "Baja":
                tiempoImagen = 12;
                audioIF.src = "../Audio/Male/4 Extras/IRB.mp3";
                audioIF.play();
                break;
        
            case "Media":
                tiempoImagen = 11;
                audioIF.src = "../Audio/Male/4 Extras/IRM.mp3";
                audioIF.play();
                break;
    
            case "Alta":
                tiempoImagen = 19;
                audioIF.src = "../Audio/Male/4 Extras/IRA.mp3";
                audioIF.play();
                break;
    
            default:
                break;
        }
    } else if (personaje == "female") {
        switch (intensidad) {
            case "Baja":
                tiempoImagen = 13;
                audioIF.src = "../Audio/Female/4 Extras/IRB.mp3";
                audioIF.play();
                break;
        
            case "Media":
                tiempoImagen = 13;
                audioIF.src = "../Audio/Female/4 Extras/IRM.mp3";
                audioIF.play();
                break;
    
            case "Alta":
                tiempoImagen = 22;
                audioIF.src = "../Audio/Female/4 Extras/IRA.mp3";
                audioIF.play();
                break;
    
            default:
                break;
        }
    }

    temporizadorImg = setInterval(() => {
        tiempoImagen -= 1;
        if (tiempoImagen <= 0) {
            clearInterval(temporizadorImg);
            img.remove();
            document.getElementById("angle-container").classList.remove("hide");
            document.getElementById("cronometroYControl").classList.remove("hide");
            renderizarVideos(ejerciciosRutina[indiceActual], ejerciciosRutina[indiceActual].duracion);
        }
    }, 1000);
}

//FUNCION PARA DESPEDIR AL USUARIO
function despedida() {
    img = document.createElement("img");
    img.style.width = "100%";
    if (personaje == "male") {
        img.src = "../Img/Male.png";
    } else {
        img.src = "../Img/Female.png";
    }
    img.id = "img-despedida";

    document.getElementById("angle-container").classList.add("hide");
    document.getElementById("cronometroYControl").classList.add("hide");

    videoContainer.appendChild(img);

    if (personaje == "male") {
        tiempoImagen = 18;
        audioIF.src ="../Audio/Male/4 Extras/FR.mp3";
        audioIF.play();
    } else if (personaje == "female") {
        tiempoImagen = 20;
        audioIF.src ="../Audio/Female/4 Extras/FR.mp3";
        audioIF.play();
    }

    temporizadorImg = setInterval(() => {
        tiempoImagen -= 1;
        if (tiempoImagen <= 0) {
            clearInterval(temporizadorImg);
            audioIF.remove();
            document.getElementById("angle-container").classList.remove("hide");
            document.getElementById("cronometroYControl").classList.remove("hide");
            img.remove();
            finalizarRutina();
        }
    }, 1000);
}


//FUNCION PARA ACABAR LA RUTINA
function finalizarRutina() {
    clearInterval(temporizador);
    clearInterval(temporizadorImg);
    if (video) video.remove();
    if (audio) audio.remove();
    document.getElementById("rutina").classList.add("hide");
    intensidades.forEach(intensidad => {
        intensidad.setAttribute("disabled", "");
    });
    duraciones.forEach(duracion => {
        duracion.setAttribute("disabled", "");
    });

    personaje = "";
    intensidad = "";
    duracion = 0;
    ejerciciosFiltrados = [];
    ejerciciosRutina = [];
    indiceActual = 0;

    tiempoTotal = 0;
    tiempoRestante = 0;
    tiempoFaltante = 0;
    temporizador = null;
    enPausa = false;
    isPaused = false;
    isSilenced = false;

    duracionActual = 0;
    ejercicioReemplazo = null;
    indiceCambio = 0;

    img = null;
    tiempoImagen = 0;
    temporizadorImg = null;

    if (video != null) {
        video.pause();
        video.remove();
        video = null;
    }

    if (audio != null) {
        audio.pause();
        audio.remove();
        audio = null;
    }

    if (audioIF != null) {
        audioIF.pause();
        audioIF.remove();
        audioIF = null;
    }

    videoContainer.innerHTML = "";
}

//Botón que permite reiniciar el generador sin tener que recargar la página
document.getElementById("boton-reiniciar").addEventListener("click", () => {
    //document.getElementById("reiniciar").classList.add("hide");
    //document.getElementById("rutina").classList.add("hide");
    //document.getElementById("selector").classList.remove("hide");

    finalizarRutina();

    window.location.reload();
});