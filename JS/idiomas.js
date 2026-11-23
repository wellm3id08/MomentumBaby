// Textos de la web en español, inglés y portugués.
// Cada elemento con data-i18n="clave" se rellena con el idioma elegido.

const TEXTOS = {
    es: {
        intro: "Una web para padres que acaban de tener un bebé y se han dado cuenta de que todavía no se ponen de acuerdo con el nombre. Tranquilos, os echamos una mano.",
        q_genero: "¿Qué género tiene el bebé?",
        male: "Niño",
        female: "Niña",
        any: "Sorpréndeme",
        q_continente: "¿En qué continente nace el bebé?",
        europa: "Europa",
        africa: "África",
        asia: "Asia",
        america: "América",
        oceania: "Oceanía",
        antartida: "Antártida",
        q_compuesto: "¿Queréis un nombre compuesto?",
        yes: "Sí",
        no: "No",
        q_largo: "¿Qué largo tiene que ser?",
        short: "Cortito (hasta 5 letras)",
        medium: "Normal (6 o 7 letras)",
        long: "Largo (8 o más)",
        anylen: "Me da igual",
        siguiente: "Siguiente",
        elige: "Elige una opción para continuar",
        resultado: "Este es el nombre de tu bebé.",
        otro: "Otro nombre",
        guardar: "Guardar",
        guardado: "Guardado",
        copiar: "Copiar",
        copiado: "Copiado",
        favoritos: "Vuestros favoritos",
        quitar: "Quitar",
        reiniciar: "Empezar de nuevo",
        faltan: "Faltan opciones, vuelve a empezar",
        pie: "© 2026 | Equipo MomentumBaby",
        ocurrencias: [
            "Aprobado por el 50 % de los padres. Con eso hay que conformarse.",
            "Si a la abuela no le gusta, decid que es tradición de otro país.",
            "Ya no podéis decir que no se os ocurría ninguno.",
            "Gritadlo desde la cocina. Si el bebé no se asusta, es buen nombre.",
            "Mirad las iniciales antes de bordar la toalla.",
            "Recomendado por cero pediatras, pero también por cero abogados.",
            "Nombre elegido al azar. La culpa no es nuestra.",
            "Si luego no le gusta, tiene 18 años para cambiarlo."
        ]
    },
    en: {
        intro: "A web app for parents who just had a baby and suddenly realized they still haven't agreed on a name. Don't panic, we've got you covered.",
        q_genero: "What is the gender of the baby?",
        male: "Boy",
        female: "Girl",
        any: "Surprise me",
        q_continente: "Which continent is the baby born in?",
        europa: "Europe",
        africa: "Africa",
        asia: "Asia",
        america: "America",
        oceania: "Oceania",
        antartida: "Antarctica",
        q_compuesto: "Do you want a compound name?",
        yes: "Yes",
        no: "No",
        q_largo: "How long should it be?",
        short: "Short (up to 5 letters)",
        medium: "Medium (6 or 7 letters)",
        long: "Long (8 or more)",
        anylen: "Don't care",
        siguiente: "Next",
        elige: "Pick an option to continue",
        resultado: "This is your baby's name.",
        otro: "Another name",
        guardar: "Save",
        guardado: "Saved",
        copiar: "Copy",
        copiado: "Copied",
        favoritos: "Your favorites",
        quitar: "Remove",
        reiniciar: "Start over",
        faltan: "Some options are missing, please start over",
        pie: "© 2026 | MomentumBaby team",
        ocurrencias: [
            "Approved by 50% of the parents. You'll have to live with that.",
            "If grandma doesn't like it, say it's a tradition from another country.",
            "You can no longer say you had no ideas.",
            "Shout it from the kitchen. If the baby isn't scared, it's a good name.",
            "Check the initials before embroidering the towel.",
            "Recommended by zero pediatricians, but also by zero lawyers.",
            "Name picked at random. Not our fault.",
            "If they hate it later, they have 18 years to change it."
        ]
    },
    pt: {
        intro: "Uma web para pais que acabaram de ter um bebé e perceberam que ainda não se entendem sobre o nome. Calma, nós damos uma ajuda.",
        q_genero: "Qual é o género do bebé?",
        male: "Menino",
        female: "Menina",
        any: "Surpreende-me",
        q_continente: "Em que continente nasce o bebé?",
        europa: "Europa",
        africa: "África",
        asia: "Ásia",
        america: "América",
        oceania: "Oceânia",
        antartida: "Antártida",
        q_compuesto: "Querem um nome composto?",
        yes: "Sim",
        no: "Não",
        q_largo: "Que tamanho deve ter?",
        short: "Curto (até 5 letras)",
        medium: "Normal (6 ou 7 letras)",
        long: "Longo (8 ou mais)",
        anylen: "Tanto faz",
        siguiente: "Seguinte",
        elige: "Escolhe uma opção para continuar",
        resultado: "Este é o nome do teu bebé.",
        otro: "Outro nome",
        guardar: "Guardar",
        guardado: "Guardado",
        copiar: "Copiar",
        copiado: "Copiado",
        favoritos: "Os vossos favoritos",
        quitar: "Tirar",
        reiniciar: "Recomeçar",
        faltan: "Faltam opções, recomeça",
        pie: "© 2026 | Equipa MomentumBaby",
        ocurrencias: [
            "Aprovado por 50 % dos pais. Têm de se contentar com isso.",
            "Se a avó não gostar, digam que é tradição de outro país.",
            "Já não podem dizer que não tinham ideias.",
            "Gritem-no da cozinha. Se o bebé não se assustar, é bom nome.",
            "Vejam as iniciais antes de bordar a toalha.",
            "Recomendado por zero pediatras, mas também por zero advogados.",
            "Nome escolhido ao acaso. A culpa não é nossa.",
            "Se depois não gostar, tem 18 anos para o mudar."
        ]
    }
};

const IDIOMAS = ["es", "en", "pt"];

// Idioma guardado, o el del navegador, o inglés si no hay otro
function idiomaActual() {
    let guardado = null;
    try {
        guardado = localStorage.getItem("idioma");
    } catch (e) {
        guardado = null;
    }
    if (IDIOMAS.includes(guardado)) {
        return guardado;
    }
    const navegador = (navigator.language || "en").slice(0, 2).toLowerCase();
    return IDIOMAS.includes(navegador) ? navegador : "en";
}

function t(clave) {
    return TEXTOS[idiomaActual()][clave];
}

function aplicarIdioma() {
    const idioma = idiomaActual();
    document.documentElement.lang = idioma;

    document.querySelectorAll("[data-i18n]").forEach(function (elemento) {
        elemento.textContent = TEXTOS[idioma][elemento.dataset.i18n];
    });

    document.querySelectorAll(".idiomas button").forEach(function (boton) {
        boton.setAttribute("aria-pressed", boton.dataset.lang === idioma ? "true" : "false");
    });

    document.dispatchEvent(new CustomEvent("idioma-cambiado"));
}

function cambiarIdioma(idioma) {
    try {
        localStorage.setItem("idioma", idioma);
    } catch (e) {
        // sin localStorage el idioma solo dura esta página
    }
    aplicarIdioma();
}

// Selector ES / EN / PT, se añade solo en todas las páginas
function crearSelectorIdioma() {
    const nav = document.createElement("nav");
    nav.className = "idiomas";
    nav.setAttribute("aria-label", "Language");

    IDIOMAS.forEach(function (idioma) {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.dataset.lang = idioma;
        boton.textContent = idioma.toUpperCase();
        boton.addEventListener("click", function () {
            cambiarIdioma(idioma);
        });
        nav.appendChild(boton);
    });

    document.body.prepend(nav);
}

crearSelectorIdioma();
aplicarIdioma();
