/*
 * Ejercicio 1 - Conversor de Almacenamiento Digital (versión en TypeScript)
 * Javier Garrido Terrón - 2º DAW
 *
 * Es el mismo conversor que hice en JavaScript, pero pasado a TypeScript
 * y añadiendo la validación de los datos que introduce el usuario:
 *  - La cantidad debe ser un número mayor que cero.
 *  - Las unidades deben existir en la lista.
 */

// Unidades que admite el conversor
type Unidad = "Bytes" | "Kilobytes" | "Megabytes" | "Gigabytes";

class ConversorAlmacenamiento {
    // Cuántos Bytes vale cada unidad
    private unidades: { [clave: string]: number } = {
        "Bytes": 1,
        "Kilobytes": 1024,
        "Megabytes": 1024 * 1024,
        "Gigabytes": 1024 * 1024 * 1024
    };

    // Comprueba que la unidad escrita esté en la lista
    esUnidadValida(unidad: string): boolean {
        return Object.keys(this.unidades).includes(unidad);
    }

    // Convierte una cantidad de una unidad a otra.
    // Antes de hacer la conversión valido todos los datos y,
    // si algo no cuadra, lanzo un error.
    convertir(cantidad: number, unidadOrigen: string, unidadDestino: string): number {
        if (isNaN(cantidad)) {
            throw new Error("La cantidad tiene que ser un número.");
        }

        if (cantidad <= 0) {
            throw new Error("La cantidad tiene que ser mayor que cero.");
        }

        if (!this.esUnidadValida(unidadOrigen) || !this.esUnidadValida(unidadDestino)) {
            throw new Error("La unidad de origen o de destino no es válida.");
        }

        const enBytes = cantidad * this.unidades[unidadOrigen];
        return enBytes / this.unidades[unidadDestino];
    }
}

// ------------------- Programa principal -------------------

const nombresUnidades: Unidad[] = ["Bytes", "Kilobytes", "Megabytes", "Gigabytes"];

// Devuelve el texto del menú de unidades
function menuUnidades(): string {
    return "1 - Bytes\n2 - Kilobytes\n3 - Megabytes\n4 - Gigabytes";
}

// Pide una unidad (opción del 1 al 4) y la repite mientras no sea correcta.
// Devuelve el nombre de la unidad, o null si el usuario pulsa cancelar.
function pedirUnidad(texto: string): Unidad | null {
    let opcion: string | null;

    do {
        opcion = prompt(texto + "\n\n" + menuUnidades());

        if (opcion === null) {
            return null; // ha pulsado cancelar
        }
    } while (opcion !== "1" && opcion !== "2" && opcion !== "3" && opcion !== "4");

    return nombresUnidades[Number(opcion) - 1];
}

// Pide la cantidad y la repite mientras no sea un número mayor que cero
function pedirCantidad(): number | null {
    let texto: string | null = prompt("Introduce la cantidad que quieres convertir:");

    while (texto !== null && (texto.trim() === "" || isNaN(Number(texto)) || Number(texto) <= 0)) {
        texto = prompt("Dato no válido. Introduce un número mayor que cero:");
    }

    if (texto === null) {
        return null;
    }

    return parseFloat(texto);
}

// ------------------- Ejecución -------------------

const conversor = new ConversorAlmacenamiento();
const cantidad = pedirCantidad();
const unidadOrigen = pedirUnidad("¿De qué unidad partes?");
const unidadDestino = pedirUnidad("¿A qué unidad quieres convertir?");

if (cantidad === null || unidadOrigen === null || unidadDestino === null) {
    alert("Programa cancelado.");
} else {
    try {
        const resultado = conversor.convertir(cantidad, unidadOrigen, unidadDestino);
        const mensaje = cantidad + " " + unidadOrigen + " son " + resultado.toFixed(4) + " " + unidadDestino;

        alert(mensaje);       // el resultado, en una ventana emergente
        console.log(mensaje); // lo dejo también en la consola
    } catch (error: any) {
        // Si algún dato no era válido, el conversor avisa del error
        alert("Error: " + error.message);
        console.log("Error: " + error.message);
    }
}
