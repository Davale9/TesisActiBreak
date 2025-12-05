let video = document.getElementById("video");
let generar = document.getElementById("generar");
let controles = document.getElementById("controles");
let historial = document.getElementById("historial");
let catalogo = document.getElementById("catalogo");
let color = document.getElementById("color");
let pausa = false;

video.children[0].addEventListener("click", () => { 
    video.children[1].classList.toggle("hide");
});

generar.children[0].addEventListener("click", () => { 
    generar.children[1].classList.toggle("hide");
});

controles.children[0].addEventListener("click", () => { 
    controles.children[1].classList.toggle("hide");
});

historial.children[0].addEventListener("click", () => { 
    historial.children[1].classList.toggle("hide");
});

catalogo.children[0].addEventListener("click", () => { 
    catalogo.children[1].classList.toggle("hide");
});

color.children[0].addEventListener("click", () => { 
    color.children[1].classList.toggle("hide");
});