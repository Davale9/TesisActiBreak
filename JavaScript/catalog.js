let ejercicios = [];
let personajeActual = "male";
let ejercicioActual;
const url = "https://davale9.github.io/TesisPausasActivas/ejercicios.json";
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

            card.style.border = e.color;
            card.style.boxShadow = e.color;

            const img = document.createElement("img");
            img.src = "../" + e.portada;
            card.appendChild(img);

            const title = document.createElement("h3");
            title.textContent = e.nombre;
            card.appendChild(title);

            // Hover → video inline
            card.addEventListener("mouseenter", () => {
                const video = document.createElement("video");
                video.src = "../" + e.videosMale.diagonal;
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.style.width = "100%";
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
    document.getElementById("popup-nombre").textContent = ejercicio.nombre;
    document.getElementById("popup-descripcion").textContent = ejercicio.descripción;
    actualizarVideoPopup();
    document.getElementById("popup").classList.remove("hide");
}

function actualizarVideoPopup() {
    const video = document.getElementById("video-popup");
    if (personajeActual == "Male") {
        video.src = ejercicioActual.videosMale.diagonal;
    } else if (personajeActual == "Female") {
        video.src = ejercicioActual.videosFemale.diagonal;
    }
    
}