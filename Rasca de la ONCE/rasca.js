// Rango de valores posibles en el juego (1 a 7 y figuras como 1/2)
const rangoValores = [1, 2, 3, 4, 5, 6, 7, 0.5]; // 0.5 representa el "½"

// Array para la banca 
let banca = [];

// Array para tus cartas 
let tusCartas = [];

// Array para la carta bonus 
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
    // Primera carta de la banca
    let cartaBanca1 = numeroRandom();
    banca.push(cartaBanca1);
    console.log("Primera carta de la banca: " + cartaBanca1);

    // Cogemos el numero que ha salido y le restamos 7.5 que es valor maximo que te puede salir
    let maxValorBanca2 = 7.5 - cartaBanca1;

    let cartaBanca2 = numeroRandomMenorOIgualA(maxValorBanca2);
    banca.push(cartaBanca2);
    console.log("Segunda carta de la banca: " + cartaBanca2);

    // Generar cartas para el jugador tusCartas
    let cartaTusC1 = numeroRandom();
    tusCartas.push(cartaTusC1);
    console.log("Primera carta de tus cartas: " + cartaTusC1);

    // Determinamos el máximo valor posible para la segunda carta de tus cartas
    let maxValorTus2 = 7.5 - cartaTusC1;

    // Si la segunda carta supera 7.5, no la generamos
    let cartaTusC2 = numeroRandomMenorOIgualA(maxValorTus2);
    tusCartas.push(cartaTusC2);
    console.log("Segunda carta de tus cartas: " + cartaTusC2);

    // Determinamos el máximo valor posible para la tercera carta de tus cartas
    let maxValorTus3 = 7.5 - (cartaTusC1 + cartaTusC2);

    // Si la tercera carta supera 7.5, no la generamos
    let cartaTusC3 = numeroRandomMenorOIgualA(maxValorTus3);
    tusCartas.push(cartaTusC3);
    console.log("Tercera carta de tus cartas: " + cartaTusC3);

    // Generar carta bonus
    cartaBonus.push(numeroRandom());
    console.log("Carta bonus: " + cartaBonus);
}

// Función para obtener un número aleatorio de la lista, pero restringido a un máximo
function numeroRandomMenorOIgualA(max) {
    // Si el valor máximo es menor que 0.5, devolvemos 0.5
    if (max < 0.5) return 0.5;

    // Filtro los valores disponibles para que no superen el valor máximo
    let valoresPosibles = rangoValores.filter(valor => valor <= max);
    return valoresPosibles[Math.floor(Math.random() * valoresPosibles.length)];
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

    let cartaBonus = document.querySelector("#secundario > div:nth-of-type(3) > .carta");
    cartaBonus.addEventListener("click", () =>{
        console.log(numeroRandom());   
        const premioBonus = obtenerPremioAleatorio();
        console.log(premioBonus);
    })

    // Validamos los premios después de las interacciones
    validarPremios();
}

// Función para seleccionar un premio aleatorio
function obtenerPremioAleatorio() {
    const premioAleatorio = premios[Math.floor(Math.random() * premios.length)];
    
    console.log("Premio asignado: " + premioAleatorio);
    return premioAleatorio;
}

let premio = document.querySelector("#secundario > div:nth-of-type(4)")

premio.addEventListener("click", () => {
    console.log(obtenerPremioAleatorio());
})

// Función para validar los premios
function validarPremios() {
    console.log("Validando premios...");

    // Asegurarnos de que ambas sumas (banca y jugador) hayan sido calculadas
    if (sumaBanca > 0 && sumaTusCartas > 0) {
        let premio = obtenerPremioAleatorio();
        comparacionBonus();
        // Comparación entre la banca y el jugador
        if (sumaBanca > sumaTusCartas) {
            console.log("Has perdido. Premio asignado: " + premio);
        } else if (sumaBanca < sumaTusCartas) {
            console.log("¡Tú has ganado! Premio asignado: " + premio);
        } else {
            console.log("Es un empate.");
        }
    }

}

function comparacionBonus() {
    tusCartas.forEach(carta => {
        if(cartaBonus === carta){
            console.log(premioBonus);    
        }
    });
}

// Inicia la partida
partida();
