var saturation = 100;

const botonCuenta = document.getElementById("crear-cuenta");
const botonReset = document.getElementById("reset");
const popUp = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");
const sliderSaturacion = document.getElementById("saturation");
const body = document.body;

const valorGuardado = JSON.parse(localStorage.getItem('configuracionColor'));

document.addEventListener("DOMContentLoaded", () => {
    if (valorGuardado !== null) {
        const sat = valorGuardado.saturation;
        console.log("Valor guardado encontrado:", valorGuardado);
        sliderSaturacion.value = sat;

        saturation = sat;
        body.style.filter = `saturate(${saturation}%) brightness(${90+(saturation/10)}%)`;
    } else {
        sliderSaturacion.value = saturation;
    }
});

botonCuenta.addEventListener("click", () => {
    popUp.classList.remove("hide");
});

botonReset.addEventListener("click", () => {
    localStorage.removeItem('configuracionColor');
    saturation = 100;
    location.reload();
});

closePopup.addEventListener("click", () => {
    popUp.classList.add("hide");
});

sliderSaturacion.addEventListener("input", () => {
    saturation = sliderSaturacion.value;
    body.style.filter = `saturate(${saturation}%) brightness(${90+(saturation/10)}%)`;
    localStorage.setItem("configuracionColor", JSON.stringify({saturation}));
});

