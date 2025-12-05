let contenedor = document.getElementById("contenedor-historial");
let popup = document.getElementById("popup-historial");
let popupContent = document.getElementById("popup-content");

document.addEventListener("DOMContentLoaded", () => {
    let colores = [
        "#7A5CFF",
        "#00E5FF",
        "#4DFF73",
        "#FFD93B",
        "#FF9933",
        "#FF3366",
    ];

    let historial = JSON.parse(localStorage.getItem("historialRutina")) || [];

    if (!historial || historial.length === 0) {
        contenedor.innerHTML += `<h3>Aún no has realizado ninguna rutina.</h3>`;
        return
    }

    historial.forEach((r, index) => {
        let card = document.createElement("div");
        card.classList.add("card-historial");   
        card.style.border = "2px solid " + colores[index % colores.length];
        card.style.boxShadow = "0px 0px 10px " + colores[index % colores.length];
        card.style.color = colores[index % colores.length];
        card.innerHTML = `
            <div class="historial-info">
                <img src="../Img/${r.personajeH === 'male' ? 'Male' : 'Female'}.png" alt="${r.personaje}" class="img-content">
                <h3>${r.fecha}</h3>
            </div>
        `;

        card.addEventListener("click", () => {
            mostrarPopup(r, card);
        })

        console.log(r.personajeH);

        contenedor.appendChild(card);
    });
});

function mostrarPopup(rutina, card) {
    popup.classList.remove("hide");
    popupContent.innerHTML += `
        <div class="content-child">
            <div class="popup-up">
                <button id="boton-cerrar" class="close-btn">X</button>
            </div>
            <div class="popup-down">
                <div class="popup-left">
                    <img src='../Img/${rutina.personajeH === 'male' ? 'Male' : 'Female'}.png' alt='${rutina.personaje}' id="img-popup" class="img-content">
                </div>
                <div class="popup-right">
                    <div class="arriba">
                        <h3>${rutina.fecha}</h3>
                        <p><strong>Intensidad:</strong> <br>${rutina.intensidadH}</p>
                        <p><strong>Duración:</strong> <br>${rutina.duracionH} min</p>
                    </div>
                    <div class="abajo">
                        <p><strong>Ejercicios incluidos:</strong></p>
                        <p class="lista-ejercicios">
                            ${rutina.ejerciciosH.map(e => e.nombre).join("<br>")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-child">
            <button id="boton-repetir" class="repetir">Repetir Rutina</button>      
        </div>
    `;

    let botonCerrar = document.getElementById("boton-cerrar");
    let botonReiniciar = document.getElementById("boton-repetir");  

    popupContent.style.border = card.style.border;
    popupContent.style.boxShadow = card.style.boxShadow

    botonCerrar.style.color = card.style.color;
    botonReiniciar.style.backgroundColor = card.style.color;

    botonReiniciar.addEventListener("click", () => {
        localStorage.setItem("rutinaRehacer", JSON.stringify(rutina));
        window.location.href = "https://davale9.github.io/TesisActiBreak/HTML/Generador.html";
        //window.location.href = "Generador.html";
    });

    botonCerrar.addEventListener("click", () => {
        popupContent.innerHTML = "";
        popup.classList.add("hide");
    }); 
}

/*
window.addEventListener('keypress', (e) => {
    if (e.key == 'h') {
        localStorage.removeItem("historialRutina")
    }
})
*/