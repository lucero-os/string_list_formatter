# String List Formatter

Un script hecho en TypeScript que toma un listado de palabras dentro de un archivo .txt y las organiza según la estrategia seleccionada.

# Enfoque

- La intención es hacer un script que cumpla con el propósito inicial de generar un listado de palabras circular en base a un listado de palabras, que luego pueda ser extendido para generar distintos ordenamientos en base al mismo input.
- Se implementa utilizando TypeScript debido a su balance entre seguridad y facilidad de comprensión. Este script puede escalar fácilmente a un servicio por API sin mucha necesidad de configuración extra.
- Para la implementación del ordenamiento circular de cadenas, se utiliza un grafo como estructura de datos, implementado mediante un hashmap; el mismo provee acceso eficiente para agregar, eliminar o encontrar elementos, generalmente alcanzando una complejidad temporal promedio de O(1). 

El algoritmo:
1. Crea un grafo donde cada palabra es una esquina desde su primera hasta su última letra.
2. Comprueba si existe un circuito euleriano (todos los nodos tienen el mismo grado de entrada y de salida).
3. Utiliza el algoritmo de Hierholzer para encontrar el circuito:
- Comienza desde cualquier nodo con esquinas salientes.
- Sigue las esquinas, eliminándolas a medida que avanzamos.
- Retrocede cuando se atasca.
- Construye la ruta en sentido inverso.
4. Verifica que el resultado forme un círculo verdadero.

# Requerimientos tecnológicos

- Tener instalado node.js 22.x

## Instalación

### Clonar proyecto

```bash
git clone https://github.com/lucero-os/string_list_formatter.git
# o descargar ZIP y extraer.
```

### Instalar dependencias

```bash
npm install
```

## Uso

### Desde la línea de comandos

```bash
ts-node index.ts <file-path> <strategy-code>
```

### Listar estrategias disponibles

```bash
ts-node index.ts --list
# or
ts-node index.ts --help
# or
ts-node index.ts -h
```

### Ejemplo para Cadena de Palabras Circular

```bash
ts-node index.ts example-words.txt --circular
# Crea: example-words-circular.txt como resultado
```

### Output

La herramienta crea un nuevo .txt, dentro del mismo path del archivo de entrada, con el nombre siguiendo el formato: `<nombre-original>-<estrategia>.txt`. En caso de no poder aplicar la estrategia deseada, el archivo estará vacío.

## Tests

```bash
npm run test
```