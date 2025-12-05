let video = document.getElementById("video");
let generar = document.getElementById("generar");
let controles = document.getElementById("controles");
let historial = document.getElementById("historial");
let catalogo = document.getElementById("catalogo");
let color = document.getElementById("color");
let pausa = false;

video.children[0].addEventListener("click", () => { 
    video.children[1].classList.toggle("hide");
    if (!pausa) {
        video.children[1].innerHTML = '<iframe src="https://player.vimeo.com/video/1143315398?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="902" height="507" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" title="ActiBreak - Manual de Usuario"></iframe>';
        pausa = true;
    } else if (pausa) {
        video.children[1].innerHTML = "";
        pausa = false;
    }
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