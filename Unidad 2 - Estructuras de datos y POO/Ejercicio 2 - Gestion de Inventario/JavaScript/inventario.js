/*
 * Ejercicio 2 - Simulación de Gestión de Inventario
 * Javier Garrido Terrón - 2º DAW
 *
 * Clase Producto: guarda el nombre y el stock y tiene los métodos
 * para consultar el stock, retirar unidades (venta) y reponer unidades.
 * Clase GestorInventario: muestra el menú, pide los datos al usuario
 * con prompt y escribe los resultados en la consola.
 */

class Producto {
    constructor(nombre, stock) {
        this.nombre = nombre;
        this.stock = stock;
    }

    // Devuelve el nombre del producto
    getNombre() {
        return this.nombre;
    }

    // Devuelve el stock actual
    consultarStock() {
        return this.stock;
    }

    // Quita unidades para una venta. Devuelve true si ha podido hacerla.
    // Si no hay stock suficiente no hace nada y devuelve false,
    // así el stock nunca se queda en negativo.
    retirar(cantidad) {
        if (cantidad > this.stock) {
            return false;
        }

        this.stock -= cantidad;
        return true;
    }

    // Suma las unidades que llegan del proveedor
    reponer(cantidad) {
        this.stock += cantidad;
    }
}

class GestorInventario {
    constructor() {
        this.productos = [];
    }

    // Añade un producto al inventario
    agregarProducto(producto) {
        this.productos.push(producto);
    }

    // Texto con todos los productos y su stock, para el menú
    listarProductos() {
        let lista = "";

        for (let i = 0; i < this.productos.length; i++) {
            lista += (i + 1) + ") " + this.productos[i].getNombre()
                + " - Stock: " + this.productos[i].consultarStock() + "\n";
        }

        return lista;
    }

    // Muestra la lista y pide al usuario un producto.
    // Devuelve su posición en el array, o -1 si se pulsa cancelar.
    elegirProducto() {
        let opcion;

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
    pedirCantidad(texto) {
        let linea;

        do {
            linea = prompt(texto);

            if (linea === null) {
                return null;
            }
        } while (linea.trim() === "" || isNaN(Number(linea))
            || Number(linea) <= 0 || Number(linea) % 1 !== 0);

        return parseInt(linea);
    }

    // Opción 1: consultar el stock de un producto
    consultarStock() {
        const posicion = this.elegirProducto();

        if (posicion === -1) {
            console.log("Operación cancelada.");
            return;
        }

        const producto = this.productos[posicion];
        console.log("El stock de " + producto.getNombre() + " es: " + producto.consultarStock());
    }

    // Opción 2: retirar unidades para una venta
    retirarUnidades() {
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
    reponerUnidades() {
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

let opcion;

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
