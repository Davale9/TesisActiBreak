let ejercicios = [];
let personajeActual = "male";
let ejercicioActual;
const url = "https://davale9.github.io/TesisActiBreak/ejercicios.json";
const url1 = "../ejercicios.json"

document.addEventListener("DOMContentLoaded", () => {
    fetch(url)
        .then(r => r.json())
        .then(data => {
        ejercicios = data;
        renderEjercicios();
    });

    document.getElementById("filtro-intensidad").addEventListener("change", renderEjercicios);
    document.getElementById("filtro-enfoque").addEventListener("change", renderEjercicios);
    document.getElementById("close-popup").addEventListener("click", () => {
        document.getElementById("popup").classList.add("hide");
    });

    document.getElementById("toggle-personaje").addEventListener("click", () => {
        personajeActual = personajeActual === "male" ? "female" : "male";
        actualizarVideoPopup();
    });
});

function renderEjercicios() {
    const grid = document.getElementById("grid-ejercicios");
    grid.innerHTML = "";

    const filInt = document.getElementById("filtro-intensidad").value;
    const filEnf = document.getElementById("filtro-enfoque").value;

    ejercicios
        .filter(e => (filInt == "todos" || e.intensidad == filInt))
        .filter(e => (filEnf == "todos" || e.enfoque == filEnf))
        .filter(e => (e.enfoque != null))
        .forEach(e => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.style.border = "3px solid " + e.color;
            card.style.boxShadow = "0px 0px 10px " + e.color;

            const img = document.createElement("img");
            img.src = "../" + e.portada;
            card.appendChild(img);

            const title = document.createElement("h3");
            title.textContent = e.nombre;
            title.style.color = e.color;
            card.appendChild(title);

            // Hover → video inline
            card.addEventListener("mouseenter", () => {
                const video = document.createElement("video");
                video.src = "../" + e.videosMale.diagonal;
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.setAttribute("playsinline", "");
                video.setAttribute("webkit-playsinline", "");
                video.style.width = "50%";
                img.replaceWith(video);
            });

            card.addEventListener("mouseleave", () => {
                card.querySelector("video").replaceWith(img);
            });

            card.addEventListener("click", () => abrirPopup(e));
            grid.appendChild(card);
    });
}

function abrirPopup(ejercicio) {
    ejercicioActual = ejercicio;
    personajeActual = "male";
    const contenidoPopup = document.getElementById("popup-content");

    contenidoPopup.style.border = "3px solid " + ejercicioActual.color;
    contenidoPopup.style.boxShadow = "0px 0px 10px " + ejercicioActual.color;

    document.getElementById("popup-nombre").textContent = ejercicio.nombre;
    document.getElementById("popup-nombre").style.color = ejercicioActual.color;
    document.getElementById("popup-descripcion").textContent = ejercicio.descripción;
    document.getElementById("close-popup").style.color = ejercicioActual.color;
    
    document.getElementById("toggle-personaje").style.backgroundColor = ejercicioActual.color;

    actualizarVideoPopup();
    document.getElementById("popup").classList.remove("hide");
}

function actualizarVideoPopup() {
    const video = document.getElementById("video-popup");
    if (personajeActual == "male") {
        video.src = "../" + ejercicioActual.videosMale.diagonal;
    } else if (personajeActual == "female") {
        video.src = "../" + ejercicioActual.videosFemale.diagonal;
    }
    
}