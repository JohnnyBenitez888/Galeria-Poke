const galeria = document.getElementById('galeria');
const pokemonPorPagina = 20;  // Mostrar 20 Pokémon por página
let paginaActual = 1;         // Página inicial

 /*function obtenerPalabra() {
    return new Promise((resolve, reject) => {
        let palabra = "Johnny Cassius";
        const div = document.createElement("div");
        div.style.border = "2px solid blue";
        setTimeout(() => {
            if (palabra === "Johnny Cassius") {
                resolve(document.body.appendChild(div).innerHTML = palabra);
            } else {
                div.style.border = "2px solid red";
                reject(document.body.appendChild(div).innerHTML = "No es Johnny Cassius");
            }
        }, 2000);
    });
}

obtenerPalabra().then((value) => {
    console.log(value);
}).catch((value) => {
    console.log(value);
}).finally(() => {
    console.log("Termino la promesa 1");
});

function obtenerDatosDeApi() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let fallo = Math.random() > 0.5;
            if (fallo) {
                resolve("Error al obtener la informacion");
            } else {
                reject("Información obtenida");
            }
        }, 4000);
    });
}

obtenerDatosDeApi().then((value) => {
    console.log(value);
}).catch((value) => {
    console.log(value);
}).finally(() => {
    console.log("Termino la promesa 2");
});
 */
//------------------------------------------------------------------------

//const opcion = { method: 'GET', headers: { accept: 'application/json' } };//esto es un objeto


//Con async y await
const pedirDatos = async (pagina) => {

    galeria.innerHTML = '';  // Limpiar la galería para cada nueva página

    const inicio = (pagina - 1) * pokemonPorPagina + 1;
    const fin = pagina * pokemonPorPagina;

    try {
        for (let i = inicio; i <= fin; i++) {
            const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/' + i);
            const personaje = await respuesta.json();

            const cubo = document.createElement('div');
            cubo.classList.add('cubos');
            cubo.style.display = 'inline-block';
            const img = document.createElement('img');
            img.classList.add('imagen');
            const p = document.createElement('p');
            const p2 = document.createElement('p');
            galeria.appendChild(cubo);

            //Primer palabra en mayuscula
            let nombre = personaje.name.charAt(0).toUpperCase() + personaje.name.slice(1).toLowerCase();

            cubo.appendChild(p).innerHTML = personaje.id + " " + nombre;
            cubo.appendChild(img);
            img.src = personaje.sprites.front_default;

            //Primer palabra en mayuscula
            let tipo1 = personaje.types[0].type.name.charAt(0).toUpperCase() + personaje.types[0].type.name.slice(1).toLowerCase();
            
            if (personaje.types.length > 1) {
                //Primer palabra en mayuscula
                let tipo2 = personaje.types[1].type.name.charAt(0).toUpperCase() + personaje.types[1].type.name.slice(1).toLowerCase();
                cubo.appendChild(p2).innerHTML = "Tipo: " + tipo1 + ", " +tipo2; 
            } else {
                cubo.appendChild(p2).innerHTML = "Tipo: " + tipo1;
            }
            
        };



    } catch (error) { console.log(error) };


};


//Sin async y await
/* const pedirDatos = (pagina) => {
    galeria.innerHTML = '';  // Limpiar la galería para cada nueva página

    const inicio = (pagina - 1) * pokemonPorPagina + 1;
    const fin = pagina * pokemonPorPagina;

    for (let i = inicio; i <= fin; i++) {
        fetch('https://pokeapi.co/api/v2/pokemon/' + i)
            .then(response => response.json())
            .then(response => {
                const personaje = response;
                const cubo = document.createElement('div');
                cubo.classList.add('cubos');
                cubo.style.display = 'inline-block';
                const br = document.createElement('br');
                const img = document.createElement('img');
                img.classList.add('imagen');
                const p = document.createElement('p');
                const p2 = document.createElement('p');
                galeria.appendChild(cubo);

                //Primer palabra en mayuscula
                let nombre = personaje.name.charAt(0).toUpperCase() + personaje.name.slice(1).toLowerCase();

                cubo.appendChild(p).innerHTML = personaje.id + " " + nombre;
                cubo.appendChild(img);
                img.src = personaje.sprites.front_default;

                //Primer palabra en mayuscula
                let tipo1 = personaje.types[0].type.name.charAt(0).toUpperCase() + personaje.types[0].type.name.slice(1).toLowerCase();

                if (personaje.types.length > 1) {
                    //Primer palabra en mayuscula
                    let tipo2 = personaje.types[1].type.name.charAt(0).toUpperCase() + personaje.types[1].type.name.slice(1).toLowerCase();
                    cubo.appendChild(p2).innerHTML = "Tipo: " + tipo1 + ", " + tipo2;
                } else {
                    cubo.appendChild(p2).innerHTML = "Tipo: " + tipo1;
                }
            })

            .catch(error => console.log(error));

    }

}; */

const cambiarPagina = (nuevaPagina) => {
    paginaActual = nuevaPagina;
    pedirDatos(paginaActual);  // Llamar a la función con la nueva página
    actualizarBotones();
};

const actualizarBotones = () => {
    const botones = document.getElementById('botones');
    botones.innerHTML = '';  // Limpiar los botones anteriores

    // Crear botón anterior
    if (paginaActual > 1) {
        const botonAnterior = document.createElement('button');
        botonAnterior.classList.add('boton');
        botonAnterior.innerText = 'Anterior';
        botonAnterior.onclick = () => cambiarPagina(paginaActual - 1);
        botones.appendChild(botonAnterior);
    }

    // Crear botón siguiente
    if (paginaActual * pokemonPorPagina < 1025) {
        const botonSiguiente = document.createElement('button');
        botonSiguiente.classList.add('boton');
        botonSiguiente.innerText = 'Siguiente';
        botonSiguiente.onclick = () => cambiarPagina(paginaActual + 1);
        botones.appendChild(botonSiguiente);
    }
};

// Inicializar la primera página
document.addEventListener('DOMContentLoaded', () => {
    pedirDatos(paginaActual);
    actualizarBotones();
});



