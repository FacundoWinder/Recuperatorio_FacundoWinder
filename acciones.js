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


// ELEMENTOS DEL HTML

let cantidad = document.getElementById("cantidad");
let tiempo = document.getElementById("tiempo");
let costo = document.getElementById("costo");

let botonesObras = document.querySelectorAll(".obra");

let contadorObras = document.getElementById("contadorObras");

let botonCalcular = document.getElementById("botonCalcular");
let botonReiniciar = document.getElementById("botonReiniciar");


// ACÁ VAMOS A GUARDAR LAS OBRAS SELECCIONADAS

let obrasSeleccionadas = [];


// CUANDO CAMBIA LA CANTIDAD

cantidad.addEventListener("input", function() {

    let numero = Number(cantidad.value);

    if (numero > 0 && numero <= obras.length) {

        tiempo.disabled = false;
        costo.disabled = false;

        for (let i = 0; i < botonesObras.length; i++) {
            botonesObras[i].disabled = false;
        }

    } else {

        tiempo.disabled = true;
        costo.disabled = true;

        for (let i = 0; i < botonesObras.length; i++) {
            botonesObras[i].disabled = true;
        }

        botonCalcular.disabled = true;
    }

    validarDatos();
});


// CUANDO HACEMOS CLIC EN UNA OBRA

for (let i = 0; i < botonesObras.length; i++) {

    botonesObras[i].addEventListener("click", function() {

        let identificacion = botonesObras[i].dataset.obra;

        let obraEncontrada = null;

        for (let j = 0; j < obras.length; j++) {

            if (obras[j].id == identificacion) {

                obraEncontrada = obras[j];

            }
        }


        // SI LA OBRA YA ESTÁ SELECCIONADA

        let posicion = obrasSeleccionadas.indexOf(obraEncontrada);

        if (posicion != -1) {

            obrasSeleccionadas.splice(posicion, 1);

            botonesObras[i].classList.remove("seleccionada");

        }

        // SI LA OBRA NO ESTÁ SELECCIONADA

        else {

            let cantidadMaxima = Number(cantidad.value);

            if (obrasSeleccionadas.length < cantidadMaxima) {

                obrasSeleccionadas.push(obraEncontrada);

                botonesObras[i].classList.add("seleccionada");

            }

        }


        // ACTUALIZAR CONTADOR

        contadorObras.textContent =
            obrasSeleccionadas.length + " obras seleccionadas";


        validarDatos();

    });
}


// CUANDO CAMBIA EL TIEMPO O EL COSTO

tiempo.addEventListener("input", validarDatos);
costo.addEventListener("input", validarDatos);


// FUNCIÓN PARA VALIDAR LOS DATOS

function validarDatos() {

    let numero = Number(cantidad.value);

    let tiempoValido = Number(tiempo.value) > 0;

    let costoValido = Number(costo.value) >= 0;

    let cantidadObrasCorrecta =
        obrasSeleccionadas.length == numero;


    if (
        numero > 0 &&
        numero <= obras.length &&
        tiempoValido &&
        costoValido &&
        cantidadObrasCorrecta
    ) {

        botonCalcular.disabled = false;

    } else {

        botonCalcular.disabled = true;

    }
}


// BOTÓN CALCULAR

botonCalcular.addEventListener("click", function() {

    let duracionTotal = 0;
    let pesoTotal = 0;

    let obraMasLarga = null;


    // RECORREMOS LAS OBRAS SELECCIONADAS

    for (let i = 0; i < obrasSeleccionadas.length; i++) {

        let obra = obrasSeleccionadas[i];

        duracionTotal =
            duracionTotal + obra.duracion;

        pesoTotal =
            pesoTotal + obra.peso;


        // BUSCAR LA OBRA MÁS LARGA

        if (
            obraMasLarga == null ||
            obra.duracion > obraMasLarga.duracion
        ) {

            obraMasLarga = obra;

        }

    }


    // DURACIÓN PROMEDIO

    let duracionPromedio =
        duracionTotal / obrasSeleccionadas.length;


    // TIEMPO DE TRANSFERENCIA

    let tiempoPorMB = Number(tiempo.value);

    let tiempoDescarga =
        obraMasLarga.peso * tiempoPorMB;


    // PRESUPUESTO ANUAL

    let costoPorMB = Number(costo.value);

    let costoMensual =
        pesoTotal * costoPorMB;

    let presupuestoAnual =
        costoMensual * 12;


    // MOSTRAR RESULTADOS

    document.getElementById("duracionTotal").textContent =
        "Duración total: " +
        duracionTotal +
        " minutos";


    document.getElementById("duracionPromedio").textContent =
        "Duración promedio: " +
        duracionPromedio.toFixed(2) +
        " minutos";


    document.getElementById("obraMayor").textContent =
        "Obra de mayor duración: " +
        obraMasLarga.nombre +
        " (" +
        obraMasLarga.duracion +
        " minutos)";


    document.getElementById("tiempoDescarga").textContent =
        "Tiempo de transferencia para descargarla: " +
        tiempoDescarga +
        " milisegundos";


    document.getElementById("presupuesto").textContent =
        "Presupuesto necesario para un año: $" +
        presupuestoAnual;


    // DESHABILITAR LOS DATOS DESPUÉS DE CALCULAR

    cantidad.disabled = true;
    tiempo.disabled = true;
    costo.disabled = true;

    for (let i = 0; i < botonesObras.length; i++) {
        botonesObras[i].disabled = true;
    }

    botonCalcular.disabled = true;
    botonReiniciar.disabled = false;

});


// BOTÓN REINICIAR

botonReiniciar.addEventListener("click", function() {

    // BORRAR LOS DATOS

    cantidad.value = "";
    tiempo.value = "";
    costo.value = "";


    // BORRAR LAS OBRAS SELECCIONADAS

    obrasSeleccionadas = [];


    // QUITAR LA CLASE SELECCIONADA

    for (let i = 0; i < botonesObras.length; i++) {

        botonesObras[i].classList.remove("seleccionada");

        botonesObras[i].disabled = true;

    }


    // RESTABLECER LOS INPUTS

    cantidad.disabled = false;
    tiempo.disabled = true;
    costo.disabled = true;


    // RESTABLECER BOTONES

    botonCalcular.disabled = true;
    botonReiniciar.disabled = true;


    // RESTABLECER CONTADOR

    contadorObras.textContent =
        "0 obras seleccionadas";


    // BORRAR RESULTADOS

    document.getElementById("duracionTotal").textContent = "";
    document.getElementById("duracionPromedio").textContent = "";
    document.getElementById("obraMayor").textContent = "";
    document.getElementById("tiempoDescarga").textContent = "";
    document.getElementById("presupuesto").textContent = "";

});