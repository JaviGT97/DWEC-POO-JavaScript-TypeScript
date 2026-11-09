/*
 * Ejercicio 2 - Simulación de Gestión de Inventario (versión en TypeScript)
 * Javier Garrido Terrón - 2º DAW
 *
 * Es la misma aplicación que hice en JavaScript, pero con TypeScript
 * usando tipos estrictos para que el código sea más robusto:
 *  - El stock nunca puede quedar en negativo (lo controla Producto.retirar).
 *  - Las cantidades tienen que ser números enteros positivos.
 *  - Se comprueba que el producto y la opción del menú existan.
 *  - Se tiene en cuenta el null que devuelve prompt al cancelar.
 */

class Producto {
    private nombre: string;
    private stock: number;

    constructor(nombre: string, stock: number) {
        this.nombre = nombre;
        this.stock = stock;
    }

    // Devuelve el nombre del producto
    getNombre(): string {
        return this.nombre;
    }

    // Devuelve el stock actual
    consultarStock(): number {
        return this.stock;
    }

    // Quita unidades para una venta. Devuelve true si ha podido hacerla.
    // Si no hay stock suficiente no hace nada y devuelve false,
    // así el stock nunca se queda en negativo.
    retirar(cantidad: number): boolean {
        if (cantidad > this.stock) {
            return false;
        }

        this.stock -= cantidad;
        return true;
    }

    // Suma las unidades que llegan del proveedor
    reponer(cantidad: number): void {
        this.stock += cantidad;
    }
}

class GestorInventario {
    private productos: Producto[] = [];

    // Añade un producto al inventario
    agregarProducto(producto: Producto): void {
        this.productos.push(producto);
    }

    // Texto con todos los productos y su stock, para el menú
    private listarProductos(): string {
        let lista = "";

        for (let i = 0; i < this.productos.length; i++) {
            lista += (i + 1) + ") " + this.productos[i].getNombre()
                + " - Stock: " + this.productos[i].consultarStock() + "\n";
        }

        return lista;
    }

    // Muestra la lista y pide al usuario un producto.
    // Devuelve su posición en el array, o -1 si se pulsa cancelar.
    private elegirProducto(): number {
        let opcion: string | null;

        do {
            opcion = prompt("Elige un producto:\n\n" + this.listarProductos());

            if (opcion === null) {
                return -1; // ha pulsado cancelar
            }
        } while (opcion.trim() === "" || isNaN(Number(opcion))
            || Number(opcion) < 1 || Number(opcion) > this.productos.length);

        return Number(opcion) - 1;
    }

    // Pide una cantidad y la repite mientras no sea un número entero positivo.
    // Devuelve null si el usuario pulsa cancelar.
    private pedirCantidad(texto: string): number | null {
        let linea: string | null;

        do {
            linea = prompt(texto);

            if (linea === null) {
                return null;
            }
        } while (linea.trim() === "" || isNaN(Number(linea))
            || Number(linea) <= 0 || Number(linea) % 1 !== 0);

        return parseInt(linea, 10);
    }

    // Opción 1: consultar el stock de un producto
    consultarStock(): void {
        const posicion = this.elegirProducto();

        if (posicion === -1) {
            console.log("Operación cancelada.");
            return;
        }

        const producto = this.productos[posicion];
        console.log("El stock de " + producto.getNombre() + " es: " + producto.consultarStock());
    }

    // Opción 2: retirar unidades para una venta
    retirarUnidades(): void {
        const posicion = this.elegirProducto();

        if (posicion === -1) {
            console.log("Operación cancelada.");
            return;
        }

        const producto = this.productos[posicion];
        const cantidad = this.pedirCantidad("¿Cuántas unidades quieres vender de " + producto.getNombre() + "?");

        if (cantidad === null) {
            console.log("Operación cancelada.");
            return;
        }

        if (producto.retirar(cantidad)) {
            console.log("Venta realizada.");
        } else {
            console.log("No se puede hacer la venta: solo quedan " + producto.consultarStock() + " unidades.");
        }

        // Stock actualizado después de la operación
        console.log("Stock de " + producto.getNombre() + ": " + producto.consultarStock());
    }

    // Opción 3: reponer unidades del proveedor
    reponerUnidades(): void {
        const posicion = this.elegirProducto();

        if (posicion === -1) {
            console.log("Operación cancelada.");
            return;
        }

        const producto = this.productos[posicion];
        const cantidad = this.pedirCantidad("¿Cuántas unidades ha traído el proveedor de " + producto.getNombre() + "?");

        if (cantidad === null) {
            console.log("Operación cancelada.");
            return;
        }

        producto.reponer(cantidad);

        // Stock actualizado después de la operación
        console.log("Reposición realizada. Stock de " + producto.getNombre() + ": " + producto.consultarStock());
    }
}

// ------------------- Programa principal -------------------

const gestor = new GestorInventario();

// Productos de ejemplo con los que arranca el inventario
gestor.agregarProducto(new Producto("Teclado mecánico", 15));
gestor.agregarProducto(new Producto("Ratón inalámbrico", 8));
gestor.agregarProducto(new Producto("Monitor 24 pulgadas", 5));
gestor.agregarProducto(new Producto("Cable HDMI", 30));

console.log("Bienvenido a la gestión de inventario.");

let opcion: string | null;

do {
    opcion = prompt(
        "GESTIÓN DE INVENTARIO\n" +
        "=====================\n\n" +
        "1 - Consultar stock de un producto\n" +
        "2 - Retirar unidades (venta)\n" +
        "3 - Reponer unidades (proveedor)\n" +
        "4 - Salir"
    );

    if (opcion === null) {
        opcion = "4"; // si pulsa cancelar se sale del programa
    }

    switch (opcion) {
        case "1":
            gestor.consultarStock();
            break;

        case "2":
            gestor.retirarUnidades();
            break;

        case "3":
            gestor.reponerUnidades();
            break;

        case "4":
            console.log("Hasta pronto.");
            break;

        default:
            console.log("Opción no válida, prueba otra vez.");
    }
} while (opcion !== "4");
