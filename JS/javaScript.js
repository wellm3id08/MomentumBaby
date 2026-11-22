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

// Solo se usa en la última página
function mostrarNombre() {
    const parrafo = document.getElementById("nombreBebe");

    const genero = JSON.parse(sessionStorage.getItem("genero"));
    const continentes = JSON.parse(sessionStorage.getItem("continente"));
    const compuesto = JSON.parse(sessionStorage.getItem("compuesto"));
    const largo = JSON.parse(sessionStorage.getItem("largo"));

    if (!genero || !continentes || !compuesto || !largo) {
        parrafo.textContent = "Faltan opciones, vuelve a empezar";
        return;
    }

    const listas = {
        europa: { male: nameEuropeMen, female: nameEuropeWomen },
        america: { male: nameAmericaMen, female: nameAmericaWomen },
        asia: { male: nameAsiaMen, female: nameAsiaWomen },
        africa: { male: nameAfricaMen, female: nameAfricaWomen },
        oceania: { male: nameOceaniaMen, female: nameOceaniaWomen },
        antartida: { male: nameAntarcticaMen, female: nameAntarcticaWomen }
    };

    let lista = [];
    continentes.forEach(function (continente) {
        lista = lista.concat(listas[continente][genero[0]]);
    });

    lista = filtrarLargo(lista, largo[0]);

    let nombre = elegirAleatorio(lista);

    if (compuesto[0] === "yes") {
        let segundo = elegirAleatorio(lista);
        while (segundo === nombre && lista.length > 1) {
            segundo = elegirAleatorio(lista);
        }
        nombre = nombre + " " + segundo;
    }

    parrafo.textContent = nombre;
}

if (document.getElementById("nombreBebe")) {
    mostrarNombre();
}