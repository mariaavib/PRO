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

// Función para obtener un número aleatorio sin renstrinccion
function numeroRandom() {
    return rangoValores[Math.floor(Math.random() * rangoValores.length)];
}

// Función para obtener un número aleatorio de la lista con restrincción a un maximo
function numeroRandomRenstrinccion(max) {
    // Si el valor máximo es menor que 0.5, devolvemos 0.5
    if (max < 0.5) 
        return 0.5;

    // Filtro los valores disponibles para que no superen el valor máximo
    let valoresPosibles = rangoValores.filter(valor => valor <= max);
    return valoresPosibles[Math.floor(Math.random() * valoresPosibles.length)];
}

// Función para preparar la partida
function preparacionPartida() {
    // Primera carta de la banca
    let cartaBanca1 = numeroRandom();
    banca.push(cartaBanca1);

    // Cogemos el numero que ha salido y le restamos 7.5 que es valor maximo que te puede salir asi te queda solo lo que te puede salir
    let maxValorBanca2 = 7.5 - cartaBanca1;

    // Segunda carta de la banca
    let cartaBanca2 = numeroRandomRenstrinccion(maxValorBanca2);
    banca.push(cartaBanca2);

    // Primera carta para el jugador tusCartas
    let cartaTusC1 = numeroRandom();
    tusCartas.push(cartaTusC1);

    // Determinamos el máximo valor posible para la segunda carta de tus cartas
    let maxValorTus2 = 7.5 - cartaTusC1;

    // Si la segunda carta supera 7.5, no la generamos
    let cartaTusC2 = numeroRandomRenstrinccion(maxValorTus2);
    tusCartas.push(cartaTusC2);

    // Determinamos el máximo valor posible para la tercera carta de tus cartas
    let maxValorTus3 = 7.5 - (cartaTusC1 + cartaTusC2);

    // Si la tercera carta supera 7.5, no la generamos
    let cartaTusC3 = numeroRandomRenstrinccion(maxValorTus3);
    tusCartas.push(cartaTusC3);

    // Generar numero para la carta bonus
    cartaBonus.push(numeroRandom());
}


// Función para manejar la partida
function partida() {
    preparacionPartida();

    // Seleccionamos las cartas de la banca
    let cartaBanca = document.querySelectorAll("#secundario > div:nth-of-type(1) > .carta");

    // Agregarles el evento de click y sumar el total de las cartas de la banca
    cartaBanca.forEach((carta, index) => {
        const manejarClickBanca = () => {
            let valorCartaBanca = banca[index];

            console.log("Valor de la carta de la banca clicada: " + valorCartaBanca);

            sumaBanca += valorCartaBanca;

            console.log("Suma de la banca: " + sumaBanca);

            // Remover el evento click después de ser clicado
            carta.removeEventListener("click", manejarClickBanca);
        };

        // Agregar el evento de click
        carta.addEventListener("click", manejarClickBanca);
    });

    // Seleccionamos las cartas de tus cartas
    let cartaTusCartas = document.querySelectorAll("#secundario > div:nth-of-type(2) > .carta");

    // Agregarles el evento de click y sumar el total de las cartas de tus cartas
    cartaTusCartas.forEach((carta, index) => {
        const manejarClickTusCartas = () => {
            let valorTusCartas = tusCartas[index];

            console.log("Valor de tus cartas clicada: " + valorTusCartas);

            sumaTusCartas += valorTusCartas;

            console.log("Suma de tus cartas: " + sumaTusCartas);

            // Remover el evento click después de ser clicado
            carta.removeEventListener("click", manejarClickTusCartas);
        };

        // Agregar el evento de click
        carta.addEventListener("click", manejarClickTusCartas);
    });

    // Agregarles el evento de click a la carta Bonus y procesar el premio
    let cartaBonus = document.querySelector("#secundario > div:nth-of-type(3) > .carta");
    const manejarClickBonus = () => {
        console.log(numeroRandom());   
        const premioBonus = obtenerPremioAleatorioB();
        console.log(premioBonus);

        // Remover el evento click después de ser clicado
        cartaBonus.removeEventListener("click", manejarClickBonus);
    };

    // Agregar el evento de click
    cartaBonus.addEventListener("click", manejarClickBonus);

    // Validamos los premios después de las interacciones
    validarPremios();
}


// Función para seleccionar un premio aleatorio
function obtenerPremioAleatorioB() {
    const premioAleatorioB = bonus[Math.floor(Math.random() * bonus.length)];

    console.log("Premio asignado: " + premioAleatorioB+"€");
    return premioAleatorioB;
}

function obtenerPremioAleatorio() {
    const premioAleatorio = premios[Math.floor(Math.random() * premios.length)];

    return premioAleatorio+"€";
}

// Seleccionar el premio con el evento click
let premio = document.querySelector("#secundario > div:nth-of-type(4)");

// Guardamos la función de manejo del evento en una constante
const manejarClickPremio = () => {
    console.log(obtenerPremioAleatorio());

    // Remover el evento click después de ser clicado
    premio.removeEventListener("click", manejarClickPremio);
};

// Agregar el evento de click
premio.addEventListener("click", manejarClickPremio);

// Función para validar los premios
function validarPremios() {
    // Asegurarnos de que ambas sumas (banca y jugador) hayan sido calculadas

        // Guardamos el premio aleatorio
        let premio = obtenerPremioAleatorio();
        // Funcion para comparar el numero de la carta Bonus con tus Cartas
        comparacionBonus();
        // Comparación entre la banca y el jugador para saber si has obtenido premio
        if (sumaBanca > sumaTusCartas) {
            console.log("Has perdido. Premio asignado: " + premio);
        } else if (sumaBanca < sumaTusCartas) {
            console.log("¡Tú has ganado! Premio asignado: " + premio);
        }

}

function comparacionBonus() {
    tusCartas.forEach(carta => {
        if(cartaBonus === carta){
            console.log("Has obtenido el premio de la carta bonus"+premioBonus);    
        }
    });
}

// Inicia la partida
partida();
