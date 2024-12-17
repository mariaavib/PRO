// Rango de valores posibles en el juego (1 a 7 y figuras como 1/2)
const rangoValores = [1, 2, 3, 4, 5, 6, 7, 0.5]; // 0.5 representa el "½"

// Array para la banca (inicialmente vacío)
let banca = [];

// Array para tus cartas (inicialmente vacío)
let tusCartas = [];

// Array para la carta bonus (inicialmente vacío, solo una carta)
let cartaBonus = [];

// Premios posibles
const premios = [1, 2, 4, 10, 15, 30, 75, 150, 750, 1000];

// Valores de bonus
const bonus = [300, 500, 7500];

// Variables globales para las sumas de las cartas
let sumaBanca = 0;
let sumaTusCartas = 0;

// Función para obtener un número aleatorio
function numeroRandom() {
    return rangoValores[Math.floor(Math.random() * rangoValores.length)];
}

// Función para preparar la partida
function preparacionPartida() {
    for (let i = 0; i < 2; i++) {
        banca.push(numeroRandom());
    }
    console.log(banca);

    for (let i = 0; i < 3; i++) {
        tusCartas.push(numeroRandom());
    }
    console.log(tusCartas);

    cartaBonus.push(numeroRandom());
    console.log(cartaBonus);
}

// Función para manejar la partida
function partida() {
    preparacionPartida();

    // Seleccionamos las cartas de la banca
    let cartaBanca = document.querySelectorAll("#secundario > div:nth-of-type(1) > .carta");

    // Clickamos sobre las cartas de la banca para agregarles el evento de clic
    cartaBanca.forEach((carta, index) => {
        carta.addEventListener("click", () => {
            let valorCartaBanca = banca[index];

            console.log("Valor de la carta de la banca clicada: " + valorCartaBanca);

            sumaBanca += valorCartaBanca;

            console.log("Suma de la banca: " + sumaBanca);

        });
    });

    // Seleccionamos las cartas de tus cartas
    let cartaTusCartas = document.querySelectorAll("#secundario > div:nth-of-type(2) > .carta");

    cartaTusCartas.forEach((carta, index) => {
        carta.addEventListener("click", () => {
            let valorTusCartas = tusCartas[index];

            console.log("Valor de tus cartas clicada: " + valorTusCartas);

            sumaTusCartas += valorTusCartas;

            console.log("Suma de tus cartas: " + sumaTusCartas);

        });
    });

    validarPremios();
}

// Función para seleccionar un premio aleatorio
function obtenerPremioAleatorio() {
    const premioAleatorio = premios[Math.floor(Math.random() * premios.length)];
    console.log("Premio asignado: " + premioAleatorio);
    return premioAleatorio;
}

// Función para validar los premios
function validarPremios() {
    console.log("Validando premios...");

    if (sumaBanca > 0 && sumaTusCartas > 0) {
        let premio = obtenerPremioAleatorio();

        if (sumaBanca > sumaTusCartas) {
            console.log("Has perdido. Premio asignado: " + premio);
        } else if (sumaBanca < sumaTusCartas) {
            console.log("¡Tú has ganado! Premio asignado: " + premio);
        } else {
            console.log("Es un empate.");
        }
    }
}



// Inicia la partida
partida();
