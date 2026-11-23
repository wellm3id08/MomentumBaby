// Guarda lo que se ha marcado en esta página y pasa a la siguiente
function siguiente(pagina) {
    const marcados = document.querySelectorAll("input:checked");

    if (marcados.length === 0) {
        alert("Elige una opción");
        return;
    }

    const ids = [];
    marcados.forEach(function (input) {
        ids.push(input.id);
    });

    sessionStorage.setItem(marcados[0].name, JSON.stringify(ids));
    location.href = pagina;
}

function elegirAleatorio(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
}

// Filtra por largo. Si no queda ningún nombre, se usa la lista entera.
function filtrarLargo(lista, largo) {
    const filtros = {
        short: function (n) { return n.length <= 5; },
        medium: function (n) { return n.length >= 6 && n.length <= 7; },
        long: function (n) { return n.length >= 8; },
        anylen: function () { return true; }
    };
    const filtrada = lista.filter(filtros[largo] || filtros.anylen);
    return filtrada.length > 0 ? filtrada : lista;
}

// ---------- Solo se usa en la última página ----------

let nombreActual = "";
let listaNombres = [];
let esCompuesto = false;

function leerOpciones() {
    const genero = JSON.parse(sessionStorage.getItem("genero"));
    const continentes = JSON.parse(sessionStorage.getItem("continente"));
    const compuesto = JSON.parse(sessionStorage.getItem("compuesto"));
    const largo = JSON.parse(sessionStorage.getItem("largo"));

    if (!genero || !continentes || !compuesto || !largo) {
        return null;
    }
    return { genero: genero[0], continentes: continentes, compuesto: compuesto[0], largo: largo[0] };
}

function construirLista(opciones) {
    const listas = {
        europa: { male: nameEuropeMen, female: nameEuropeWomen },
        america: { male: nameAmericaMen, female: nameAmericaWomen },
        asia: { male: nameAsiaMen, female: nameAsiaWomen },
        africa: { male: nameAfricaMen, female: nameAfricaWomen },
        oceania: { male: nameOceaniaMen, female: nameOceaniaWomen },
        antartida: { male: nameAntarcticaMen, female: nameAntarcticaWomen }
    };

    // "any" (sorpréndeme) mezcla nombres de niño y de niña
    const generos = opciones.genero === "any" ? ["male", "female"] : [opciones.genero];

    let lista = [];
    opciones.continentes.forEach(function (continente) {
        generos.forEach(function (genero) {
            lista = lista.concat(listas[continente][genero]);
        });
    });

    return filtrarLargo(lista, opciones.largo);
}

function generarNombre() {
    let nombre = elegirAleatorio(listaNombres);

    if (esCompuesto) {
        let segundo = elegirAleatorio(listaNombres);
        while (segundo === nombre && listaNombres.length > 1) {
            segundo = elegirAleatorio(listaNombres);
        }
        nombre = nombre + " " + segundo;
    }
    return nombre;
}

function mostrarNombre() {
    const parrafo = document.getElementById("nombreBebe");
    const opciones = leerOpciones();

    if (!opciones) {
        parrafo.textContent = "Faltan opciones, vuelve a empezar";
        document.querySelector(".acciones").hidden = true;
        return;
    }

    listaNombres = construirLista(opciones);
    esCompuesto = opciones.compuesto === "yes";
    nuevoNombre();
}

function nuevoNombre() {
    let nombre = generarNombre();

    // Que "Otro nombre" no repita el que ya está en pantalla
    let intentos = 0;
    while (nombre === nombreActual && intentos < 10) {
        nombre = generarNombre();
        intentos++;
    }

    nombreActual = nombre;
    document.getElementById("nombreBebe").textContent = nombre;
    actualizarBotonGuardar();
}

// ---------- Favoritos (se guardan en este navegador) ----------

function leerFavoritos() {
    try {
        return JSON.parse(localStorage.getItem("favoritos")) || [];
    } catch (e) {
        return [];
    }
}

function guardarFavoritos(lista) {
    try {
        localStorage.setItem("favoritos", JSON.stringify(lista));
    } catch (e) {
        // si el navegador no deja guardar, los favoritos duran lo que dure la página
    }
}

function alternarFavorito() {
    let favoritos = leerFavoritos();

    if (favoritos.includes(nombreActual)) {
        favoritos = favoritos.filter(function (n) { return n !== nombreActual; });
    } else {
        favoritos.push(nombreActual);
    }

    guardarFavoritos(favoritos);
    actualizarBotonGuardar();
    pintarFavoritos();
}

function actualizarBotonGuardar() {
    const boton = document.getElementById("guardar");
    const guardado = leerFavoritos().includes(nombreActual);
    boton.textContent = "♥ " + (guardado ? "Saved" : "Save");
    boton.setAttribute("aria-pressed", guardado ? "true" : "false");
}

function quitarFavorito(nombre) {
    guardarFavoritos(leerFavoritos().filter(function (n) { return n !== nombre; }));
    actualizarBotonGuardar();
    pintarFavoritos();
}

function pintarFavoritos() {
    const caja = document.getElementById("favoritos");
    const lista = document.getElementById("listaFavoritos");
    const favoritos = leerFavoritos();

    lista.textContent = "";
    caja.hidden = favoritos.length === 0;

    favoritos.forEach(function (nombre) {
        const item = document.createElement("li");
        const texto = document.createElement("span");
        const quitar = document.createElement("button");

        texto.textContent = nombre;
        quitar.type = "button";
        quitar.textContent = "×";
        quitar.setAttribute("aria-label", "Remove" + " " + nombre);
        quitar.addEventListener("click", function () {
            quitarFavorito(nombre);
        });

        item.append(texto, quitar);
        lista.appendChild(item);
    });
}

function copiarNombre() {
    const boton = document.getElementById("copiar");
    const aviso = function () {
        boton.textContent = "Copied";
        setTimeout(function () { boton.textContent = "Copy"; }, 1500);
    };

    if (navigator.clipboard) {
        navigator.clipboard.writeText(nombreActual).then(aviso);
    }
}

if (document.getElementById("nombreBebe")) {
    mostrarNombre();
    pintarFavoritos();

    document.getElementById("otro").addEventListener("click", nuevoNombre);
    document.getElementById("guardar").addEventListener("click", alternarFavorito);
    document.getElementById("copiar").addEventListener("click", copiarNombre);
}
