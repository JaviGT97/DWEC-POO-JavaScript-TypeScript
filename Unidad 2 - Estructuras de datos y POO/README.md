# Unidad 2 - Estructuras de datos y POO

**Javier Garrido Terrón - 2º DAW**

Práctica con dos ejercicios sobre estructuras de datos y Programación Orientada a Objetos.
Cada ejercicio tiene su versión en JavaScript y su versión en TypeScript.

---

## Ejercicio 1 - Conversor de Almacenamiento Digital

Programa que convierte entre unidades de almacenamiento (Bytes, Kilobytes, Megabytes y Gigabytes).
El usuario introduce la cantidad, la unidad de origen y la unidad de destino, y el resultado
se muestra en una ventana emergente (alert).

Está hecho con POO, con una clase `ConversorAlmacenamiento` que guarda cuántos Bytes vale cada
unidad y tiene el método `convertir()` que pasa todo primero a Bytes y luego divide entre la
unidad de destino.

En la versión de TypeScript, además, se validan los datos: la cantidad tiene que ser un número
mayor que cero y las unidades tienen que existir en la lista.

- `JavaScript/conversor.js` - versión en JavaScript
- `JavaScript/conversor.html` - página para probarlo en el navegador
- `TypeScript/conversor.ts` - versión en TypeScript con validación
- `TypeScript/conversor.js` - el conversor.ts ya compilado
- `TypeScript/conversor.html` - página para probar la versión compilada

## Ejercicio 2 - Simulación de Gestión de Inventario

Aplicación que simula el inventario de una tienda. Con un menú se puede:

1. Consultar el stock de un producto
2. Retirar unidades (venta), comprobando que el stock no quede en negativo
3. Reponer unidades que llegan del proveedor
4. Salir

Después de cada operación, el stock actualizado se muestra en la consola.

Está hecho con POO:

- Clase `Producto`: guarda el nombre y el stock, y tiene los métodos `consultarStock()`,
  `retirar()` y `reponer()`. Es `retirar()` la que impide que el stock sea negativo.
- Clase `GestorInventario`: lleva el array de productos, muestra el menú, pide los datos
  al usuario y escribe los resultados en la consola.

En la versión de TypeScript se usan tipos estrictos (con `"strict": true` en el tsconfig):
campos privados, tipos en todos los métodos y control del null que devuelve prompt.

- `JavaScript/inventario.js` - versión en JavaScript
- `JavaScript/inventario.html` - página para probarlo en el navegador
- `TypeScript/inventario.ts` - versión en TypeScript con tipos estrictos
- `TypeScript/inventario.js` - el inventario.ts ya compilado
- `TypeScript/inventario.html` - página para probar la versión compilada

---

## Cómo probarlos

### JavaScript
Abre el archivo `.html` de cada carpeta JavaScript en el navegador y sigue las ventanas que
van apareciendo. Para el ejercicio 2, abre la consola del navegador (F12) para ver los resultados.

### TypeScript
El TypeScript se compila a JavaScript. Si quieres compilarlo tú mismo:

```
npm install -g typescript     (solo la primera vez)
tsc -p .                      (dentro de la carpeta TypeScript)
```

Yo dejo los `.js` ya compilados para que se puedan probar directamente abriendo los `.html`.
