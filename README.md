# Unidad 2 - Estructuras de Datos y POO en JavaScript

![Estado](https://img.shields.io/badge/estado-finalizado-brightgreen)
![Lenguajes](https://img.shields.io/badge/lenguajes-JavaScript%20%7C%20TypeScript-yellow)
![Asignatura](https://img.shields.io/badge/asignatura-DWEC-blue)

> Práctica de la asignatura **Desarrollo Web en Entorno Cliente (DWEC)** — 2º DAW
> **Autor:** Javier Garrido Terrón

---

## Descripción

Práctica centrada en el uso de **estructuras de datos** y el **paradigma de Programación
Orientada a Objetos (POO)** en JavaScript, con su equivalente en **TypeScript** para
demostrar cómo un sistema de tipos añade robustez al código.

La aplicación surge del contexto de una empresa ficticia (*DevCore Solutions S.A.*) que
necesita organizar la información de sus sistemas mediante objetos, atributos y métodos.

## Objetivos de aprendizaje

- Definir y utilizar estructuras de datos adecuadas para manejar la información de un proyecto.
- Aplicar el paradigma de la programación orientada a objetos en JavaScript.
- Usar TypeScript como extensión de JavaScript para una POO más cercana a otros lenguajes orientados a objetos.

## Tecnologías

| Tecnología | Uso |
|---|---|
| JavaScript (ES6+) | Clases, objetos, arrays y funciones |
| TypeScript | Tipos estrictos, validación y compilación con `tsc` |
| HTML5 | Página mínima para ejecutar los scripts en el navegador |
| API del navegador | `prompt`, `alert` y `console` para la interacción con el usuario |

## Estructura del repositorio

```
Unidad 2 - Estructuras de datos y POO/
│
├── Ejercicio 1 - Conversor de Almacenamiento/
│   ├── JavaScript/
│   │   ├── conversor.js        # Clase ConversorAlmacenamiento + programa principal
│   │   └── conversor.html      # Página para ejecutarlo en el navegador
│   └── TypeScript/
│       ├── conversor.ts        # Versión tipada con validación de datos
│       ├── conversor.js        # Resultado de compilar con tsc
│       ├── conversor.html
│       └── tsconfig.json       # Configuración con "strict": true
│
└── Ejercicio 2 - Gestion de Inventario/
    ├── JavaScript/
    │   ├── inventario.js       # Clases Producto y GestorInventario
    │   └── inventario.html
    └── TypeScript/
        ├── inventario.ts       # Versión tipada estricta
        ├── inventario.js       # Resultado de compilar con tsc
        ├── inventario.html
        └── tsconfig.json
```

## Ejercicio 1 - Conversor de Almacenamiento Digital

Convierte cantidades entre unidades de almacenamiento: **Bytes, Kilobytes, Megabytes y
Gigabytes**. El usuario introduce la cantidad y las unidades de origen y destino, y el
resultado se muestra en una ventana emergente (`alert`).

### Diseño orientado a objetos

| Elemento | Descripción |
|---|---|
| Clase `ConversorAlmacenamiento` | Encapsula la tabla de equivalencias (cuántos Bytes vale cada unidad) |
| Método `convertir()` | Pasa la cantidad a Bytes y divide entre la unidad de destino |
| Método `esUnidadValida()` *(versión TS)* | Comprueba que la unidad exista antes de convertir |

### Ejemplo de uso

```
Introduce la cantidad que quieres convertir: 5
¿De qué unidad partes?      → 3 (Megabytes)
¿A qué unidad quieres convertir? → 2 (Kilobytes)

5 Megabytes son 5120.0000 Kilobytes
```

### Aportación de la versión TypeScript

- Tipo `Unidad` con las cuatro unidades válidas.
- Validación de la entrada: la cantidad debe ser un **número mayor que cero** y las
  unidades deben existir; si no, se lanza un error que se captura en el programa principal.
- Manejo explícito del `null` que devuelve `prompt` cuando se pulsa cancelar.

## Ejercicio 2 - Simulación de Gestión de Inventario

Simula el inventario básico de una tienda con un menú que permite **consultar el stock** de
un producto, **retirar unidades** para una venta (impidiendo que el stock quede en negativo)
y **reponer unidades** recibidas del proveedor. Tras cada operación, el stock actualizado se
muestra en la consola.

### Diseño orientado a objetos

| Clase | Responsabilidad |
|---|---|
| `Producto` | Guarda nombre y stock. Métodos: `consultarStock()`, `retirar()`, `reponer()` y `getNombre()` |
| `GestorInventario` | Gestiona el array de productos, la interacción con el usuario (menú, cantidad, producto) y muestra los resultados por consola |

### Ejemplo de ejecución (consola del navegador)

```
Bienvenido a la gestión de inventario.
Venta realizada.
Stock de Ratón inalámbrico: 5
El stock de Teclado mecánico es: 15
Reposición realizada. Stock de Monitor 24 pulgadas: 15
No se puede hacer la venta: solo quedan 15 unidades.
Stock de Monitor 24 pulgadas: 15
Hasta pronto.
```

### Aportación de la versión TypeScript

- Campos **privados** y tipos en todos los atributos y métodos (`strict: true`).
- El stock **nunca puede ser negativo**: `retirar()` devuelve `false` si no hay unidades suficientes.
- Validación de cantidades: solo se aceptan números enteros positivos.
- Control de las opciones de menú inválidas y de la cancelación del usuario.

## Cómo ejecutarlo

### Versión JavaScript

1. Abre el archivo `.html` de la carpeta `JavaScript` de cada ejercicio en cualquier navegador.
2. Sigue las ventanas emergentes. En el ejercicio 2, abre la consola del navegador (**F12**) para ver los resultados.

### Versión TypeScript

El código `.ts` ya viene compilado a `.js`, pero si quieres compilarlo tú mismo:

```bash
npm install -g typescript   # solo la primera vez
tsc -p .                    # dentro de la carpeta TypeScript
```

El `tsconfig.json` usa `"strict": true`, de modo que el compilador comprueba los tipos,
los valores nulos y la inicialización de las propiedades.

## Conceptos practicados

- Programación orientada a objetos: clases, objetos, atributos, métodos y encapsulación.
- Estructuras de datos: objetos literales como tablas de datos y arrays de objetos.
- Funciones de reutilización y modularidad del código.
- TypeScript: tipos primitivos, tipos unión, arrays tipados, `private`, `void`, `null`.
- Validación de datos de entrada y manejo de errores con `throw` y `try/catch`.

## Posibles mejoras

- Añadir más unidades (Terabytes) y permitir conversiones encadenadas.
- Persistir el inventario en `localStorage`.
- Ampliar `Producto` con precio y calcular el valor total del inventario.
- Sustituir `prompt`/`alert` por una interfaz con formularios HTML.

---

*Trabajo realizado con fines educativos para el módulo de Desarrollo Web en Entorno Cliente (2º DAW).*
