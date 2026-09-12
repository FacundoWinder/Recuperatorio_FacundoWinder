// DATOS DE LAS OBRAS

let obras = [
    {
        id: "osuperman",
        nombre: "O Superman",
        duracion: 8,
        peso: 120
    },

    {
        id: "bigscience",
        nombre: "Big Science",
        duracion: 6,
        peso: 100
    },

    {
        id: "letx",
        nombre: "Let X = X",
        duracion: 5,
        peso: 90
    },

    {
        id: "fromtheair",
        nombre: "From the Air",
        duracion: 4,
        peso: 80
    },

    {
        id: "homeland",
        nombre: "Homeland",
        duracion: 7,
        peso: 110
    }
];


// DATOS QUE NECESITA EL SISTEMA

let tiempoPorMB = 5;
let costoPorMB = 2;


// OBRAS SELECCIONADAS

let obrasSeleccionadas = [];


// ELEMENTOS DEL HTML

let botonesObras = document.querySelectorAll(".obra");
let contadorObras = document.getElementById("contadorObras");
let botonCalcular = document.getElementById("botonCalcular");
let botonReiniciar = document.getElementById("botonReiniciar");


// SELECCIONAR OBRAS

for (let i = 0; i < botonesObras.length; i++) {

    botonesObras[i].addEventListener("click", function() {

        let identificacion = botonesObras[i].dataset.obra;

        let obraEncontrada = null;

        for (let j = 0; j < obras.length; j++) {

            if (obras[j].id == identificacion) {
                obraEncontrada = obras[j];
            }

        }

        let posicion = obrasSeleccionadas.indexOf(obraEncontrada);

        if (posicion != -1) {

            obrasSeleccionadas.splice(posicion, 1);

            botonesObras[i].classList.remove("seleccionada");

        } else {

            obrasSeleccionadas.push(obraEncontrada);

            botonesObras[i].classList.add("seleccionada");

        }

        contadorObras.textContent =
            obrasSeleccionadas.length + " obras seleccionadas";


        if (obrasSeleccionadas.length > 0) {

            botonCalcular.disabled = false;

        } else {

            botonCalcular.disabled = true;

        }

    });

}


// CALCULAR RESULTADOS

botonCalcular.addEventListener("click", function() {

    let duracionTotal = 0;
    let pesoTotal = 0;
    let obraMasLarga = null;


    for (let i = 0; i < obrasSeleccionadas.length; i++) {

        let obra = obrasSeleccionadas[i];

        duracionTotal = duracionTotal + obra.duracion;

        pesoTotal = pesoTotal + obra.peso;


        if (
            obraMasLarga == null ||
            obra.duracion > obraMasLarga.duracion
        ) {

            obraMasLarga = obra;

        }

    }


    let duracionPromedio =
        duracionTotal / obrasSeleccionadas.length;


    let tiempoDescarga =
        obraMasLarga.peso * tiempoPorMB;


    let presupuestoAnual =
        pesoTotal * costoPorMB * 12;


    document.getElementById("duracionTotal").textContent =
        "Duración total: " + duracionTotal + " minutos";


    document.getElementById("duracionPromedio").textContent =
        "Duración promedio: " + duracionPromedio.toFixed(2) + " minutos";


    document.getElementById("obraMayor").textContent =
        "Obra de mayor duración: " +
        obraMasLarga.nombre +
        " (" + obraMasLarga.duracion + " minutos)";


    document.getElementById("tiempoDescarga").textContent =
        "Tiempo de transferencia: " +
        tiempoDescarga +
        " milisegundos";


    document.getElementById("presupuesto").textContent =
        "Presupuesto anual: $" + presupuestoAnual;


    botonCalcular.disabled = true;
    botonReiniciar.disabled = false;


    for (let i = 0; i < botonesObras.length; i++) {
        botonesObras[i].disabled = true;
    }

});


// REINICIAR

botonReiniciar.addEventListener("click", function() {

    obrasSeleccionadas = [];


    for (let i = 0; i < botonesObras.length; i++) {

        botonesObras[i].classList.remove("seleccionada");

        botonesObras[i].disabled = false;

    }


    contadorObras.textContent =
        "0 obras seleccionadas";


    document.getElementById("duracionTotal").textContent = "";
    document.getElementById("duracionPromedio").textContent = "";
    document.getElementById("obraMayor").textContent = "";
    document.getElementById("tiempoDescarga").textContent = "";
    document.getElementById("presupuesto").textContent = "";


    botonCalcular.disabled = true;
    botonReiniciar.disabled = true;

});