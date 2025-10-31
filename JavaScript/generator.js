//Variaables para el generador
var personaje = "";
var intensidad = "";
var duracion = 0;
var ejerciciosTodos = [];
var ejerciciosRutina = [];


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

    mostrarRutina(ejerciciosRutina);
}

function mostrarRutina(ejeRutina) {
    console.log(ejeRutina);
}