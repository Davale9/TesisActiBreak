let ejercicios = [];
let personajeActual = "male";
let ejercicioActual;
const url = "https://davale9.github.io/TesisPausasActivas/ejercicios.json";
const url1 = "../ejercicios.json"
console.log("Inicié documento");

document.addEventListener("DOMContentLoaded", () => {
    console.log("Entre a event listener de carga de contenido");
    fetch(url)
        .then(r => r.json())
        .then(data => {
        ejercicios = data;
        renderEjercicios();
        console.log("fetch ejercicios");
        console.log(ejercicios);
    });

    document.getElementById("filtro-intensidad").addEventListener("change", renderEjercicios);
    document.getElementById("filtro-enfoque").addEventListener("change", renderEjercicios);
    document.getElementById("close-popup").addEventListener("click", () => {
        document.getElementById("popup").classList.add("hide");
    });

    console.log("ya tengo los filtros");

    document.getElementById("toggle-personaje").addEventListener("click", () => {
        personajeActual = personajeActual === "male" ? "female" : "male";
        actualizarVideoPopup();
        console.log("aquí se cambia de personaje");
    });
});

function renderEjercicios() {
    console.log("entré a renderizar");
    const grid = document.getElementById("grid-ejercicios");
    grid.innerHTML = "";

    console.log("cojo valor de filtros");
    const filInt = document.getElementById("filtro-intensidad").value;
    const filEnf = document.getElementById("filtro-enfoque").value;

    console.log("voy a filtrar ejercicios");
    ejercicios
        .filter(e => (filInt == "todos" || e.intensidad == filInt))
        .filter(e => (filEnf == "todos" || e.enfoque == filEnf))
        .forEach(e => {
            console.log("ya filtré");
            const card = document.createElement("div");
            card.classList.add("card");

            console.log("ya creé tarjetas");
            // Estilo según intensidad y enfoque (a definir con tus gradientes)
            card.style.border = "3px solid cyan";

            const img = document.createElement("img");
            img.src = e.videosMale.diagonal;
            card.appendChild(img);

            const title = document.createElement("h3");
            title.textContent = e.nombre;
            card.appendChild(title);

            // Hover → video inline
            card.addEventListener("mouseenter", () => {
                const video = document.createElement("video");
                video.src = e.videosMale.diagonal;
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.style.width = "100%";
                card.replaceChild(video, img);
            });

            card.addEventListener("mouseleave", () => {
                card.replaceChild(img, card.querySelector("video"));
            });

            card.addEventListener("click", () => abrirPopup(e));
            grid.appendChild(card);
            console.log("puse tarjetas");
    });
}

function abrirPopup(ejercicio) {
    console.log("abrir pop ups");
    ejercicioActual = ejercicio;
    personajeActual = "male";
    document.getElementById("popup-nombre").textContent = ejercicio.nombre;
    document.getElementById("popup-descripcion").textContent = ejercicio.descripción;
    actualizarVideoPopup();
    document.getElementById("popup").classList.remove("hide");
}

function actualizarVideoPopup() {
    console.log("se actualizó el video");
    const video = document.getElementById("video-popup");
    if (personajeActual == "Male") {
        video.src = ejercicioActual.videosMale.diagonal;
    } else if (personajeActual == "Female") {
        video.src = ejercicioActual.videosFemale.diagonal;
    }
    
}