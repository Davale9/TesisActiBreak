var saturation = 100;

const valorGuardado = JSON.parse(localStorage.getItem('configuracionColor'));
const body = document.body;

if (valorGuardado !== null) {
    const sat = valorGuardado.saturation;
    console.log("Valor guardado encontrado:", valorGuardado);

    saturation = sat;
    body.style.filter = `saturate(${saturation}%)`;
}