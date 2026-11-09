/*
 * Ejercicio 1 - Conversor de Almacenamiento Digital
 * Javier Garrido Terrón - 2º DAW
 *
 * Convierte unidades de almacenamiento: Bytes, Kilobytes, Megabytes y Gigabytes.
 * Los datos se piden en ventanas emergentes (prompt) y el resultado
 * se muestra en otra ventana emergente (alert).
 */

class ConversorAlmacenamiento {
    constructor() {
        // Cuántos Bytes vale cada unidad
        this.unidades = {
            "Bytes": 1,
            "Kilobytes": 1024,
            "Megabytes": 1024 * 1024,
            "Gigabytes": 1024 * 1024 * 1024
        };
    }

    // Convierte una cantidad de una unidad a otra.
    // El truco está en pasar todo primero a Bytes y luego dividir
    // entre lo que vale la unidad de destino.
    convertir(cantidad, unidadOrigen, unidadDestino) {
        const enBytes = cantidad * this.unidades[unidadOrigen];
        return enBytes / this.unidades[unidadDestino];
    }
}

// ------------------- Programa principal -------------------

const conversor = new ConversorAlmacenamiento();
const nombresUnidades = ["Bytes", "Kilobytes", "Megabytes", "Gigabytes"];

// Devuelve el texto del menú de unidades
function menuUnidades() {
    return "1 - Bytes\n2 - Kilobytes\n3 - Megabytes\n4 - Gigabytes";
}

// Pide una unidad (opción del 1 al 4) y la repite mientras no sea correcta.
// Devuelve el nombre de la unidad, o null si el usuario pulsa cancelar.
function pedirUnidad(texto) {
    let opcion;

    do {
        opcion = prompt(texto + "\n\n" + menuUnidades());

        if (opcion === null) {
            return null; // ha pulsado cancelar
        }
    } while (opcion !== "1" && opcion !== "2" && opcion !== "3" && opcion !== "4");

    return nombresUnidades[Number(opcion) - 1];
}

// Pide la cantidad y la repite mientras no sea un número
function pedirCantidad() {
    let texto = prompt("Introduce la cantidad que quieres convertir:");

    while (texto !== null && (texto.trim() === "" || isNaN(Number(texto)))) {
        texto = prompt("Eso no es un número, inténtalo otra vez:");
    }

    if (texto === null) {
        return null;
    }

    return parseFloat(texto);
}

const cantidad = pedirCantidad();
const unidadOrigen = pedirUnidad("¿De qué unidad partes?");
const unidadDestino = pedirUnidad("¿A qué unidad quieres convertir?");

if (cantidad === null || unidadOrigen === null || unidadDestino === null) {
    alert("Programa cancelado.");
} else {
    const resultado = conversor.convertir(cantidad, unidadOrigen, unidadDestino);
    const mensaje = cantidad + " " + unidadOrigen + " son " + resultado.toFixed(4) + " " + unidadDestino;

    alert(mensaje);       // el resultado, en una ventana emergente
    console.log(mensaje); // lo dejo también en la consola
}
