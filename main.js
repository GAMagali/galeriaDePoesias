import './css/style.css'
//creo un array de objetos, cada objeto tiene 3 propiedades: id, ruta y texto. Este array es necesario para poder interactuar con las imagenes y manipular en el DOM por JS

const arrayImagenesSlider = [
    {id: 1, ruta: 'img/rel01.png', texto: 'relato 1'},
    {id: 2, ruta: 'img/rel02.png', texto: 'relato 2'},
    {id: 3, ruta: 'img/rel03.png', texto: 'relato 3'},
    {id: 4, ruta: 'img/rel04.png', texto: 'relato 4'},
    {id: 5, ruta: 'img/rel05.png', texto: 'relato 5'},
    {id: 6, ruta: 'img/rel06.png', texto: 'relato 6'},
    {id: 7, ruta: 'img/rel07.png', texto: 'relato 7'},
    {id: 8, ruta: 'img/rel08.png', texto: 'relato 8'},
]
// console.log(arrayImagenesSlider)

//l window.addEventListener('DOMContentLoaded', ...) es un evento importante en el DOM, especialmente útil cuando quieres asegurarte de que todo el HTML y los elementos de la página estén cargados antes de ejecutar tu código JavaScript. 
// Evento DOMContentLoaded:
// Este evento se dispara cuando el contenido HTML de la página se ha cargado y procesado completamente (sin esperar a que se carguen recursos externos como imágenes o estilos).
// Usar DOMContentLoaded garantiza que el código dentro de la función solo se ejecute después de que el DOM esté listo, lo que ayuda a evitar errores al intentar acceder a elementos del DOM que aún no existen.
// window.addEventListener es un método que permite "escuchar" un evento y ejecutar una función cuando ese evento ocurre.

// Vamos a desglosarlo para que quede claro:

// window: Es el objeto global que representa la ventana del navegador. Cuando usas window, estás accediendo a propiedades y métodos que afectan a toda la ventana (como el tamaño de la pantalla, los eventos de carga de la página, etc.).

// addEventListener: Es un método del objeto window (y también de otros objetos, como los elementos HTML). Este método "escucha" eventos específicos (por ejemplo, click, DOMContentLoaded, resize) y ejecuta una función cuando el evento ocurre.

// Funcionamiento de window.addEventListener:

// Primero especificas el evento que quieres escuchar (por ejemplo, DOMContentLoaded para cuando el contenido de la página se ha cargado).
// Luego defines la función que se ejecutará cuando ocurra ese evento.

window.addEventListener('DOMContentLoaded',function(){
    //Con const divSlider = document.querySelector('#slider'), seleccionas el contenedor principal donde quieres agregar las imágenes. #slider es el id del contenedor en el HTML donde se va a construir la galería de imágenes.
    const divSlider = document.querySelector('#slider')
    // console.log(divSlider)


    //Usando arrayImagenesSlider.forEach, recorres cada objeto en el array arrayImagenesSlider para crear y agregar elementos de imagen al contenedor #slider.
    arrayImagenesSlider.forEach(function(imagen){
        //divSliderSection y imgTag se crean para representar cada "sección" de imagen en el slider: divSliderSection: Es un div que contiene la imagen y tiene una clase slider-section, lo que puede servir para aplicar estilos o efectos específicos. imgTag: Es un elemento <img> en el que se define la ruta de la imagen (imgTag.src = imagen.ruta) y el texto alternativo (imgTag.alt = imagen.texto).

        const divSliderSection = document.createElement('div')
        const imgTag = document.createElement('img')
        // console.log(divSliderSection)
        // console.log(imgTag)
        // console.log(imagen)
        imgTag.src = imagen.ruta
        imgTag.alt = imagen.texto

        //classList no es un evento es una propiedad que devuelve un objeto especial llamado DOMTokenList, que contiene todas las clases CSS de un elemento. Esta lineaañade una clase CSS llamada slider-section al div (divSliderSection) que contiene cada imagen del slider.¿Para qué sirve esta línea? Aplica estilos CSS:  
        divSliderSection.classList.add('slider-section')

        //El elemento (imgTag) se agrega al divSliderSection con divSliderSection.appendChild(imgTag). Luego, el divSliderSection se añade al divSlider con divSlider.appendChild(divSliderSection).
        
        divSliderSection.appendChild(imgTag)
        divSlider.appendChild(divSliderSection)
    })
    
    const btnIzquierda = document.querySelector('.btn-izquierda')
    const btnDerecha = document.querySelector('.btn-derecha')
    console.log(btnIzquierda, btnDerecha)
    const sliderSection = document.querySelectorAll('.slider-section')
    console.log(sliderSection)

    //para mover las imagenes

    let operacion = 0
    let anchoImg = 100 / sliderSection.length
    let counter = 0
    console.log(anchoImg)

//     Desglose del código
// Variables Iniciales:

// let operacion = 0;: Esta variable se usa para calcular cuánto se debe mover el slider en el eje X (horizontalmente).
// let widthImg = 100 / sliderSection.length;: Esta línea calcula el ancho de cada imagen en porcentaje. Si hay 5 imágenes, cada una ocupará el 20% del contenedor.
// let counter = 0;: Esta variable cuenta cuántas imágenes se han desplazado, comenzando desde 0.
// Función moverAlaDerecha:

// Esta función es responsable de mover las imágenes a la derecha cuando se llama. 
// Si counter alcanza el número total de imágenes menos uno (sliderSection.length - 1), significa que has llegado a la última imagen. En este caso, el counter se reinicia a 0 y operacion también se restablece a 0, mostrando la primera imagen de nuevo.
// Si no estás en la última imagen, counter se incrementa en 1, lo que indica que se ha pasado a la siguiente imagen.
// operacion se actualiza sumando el ancho de la imagen (widthImg). Esto significa que si la primera imagen es mostrada y el ancho es 20%, al pasar a la segunda imagen, operacion será 20, para la tercera será 40, y así sucesivamente.
// Finalmente, se aplica un transform al divSlider para desplazarlo hacia la izquierda en función de operacion, mostrando así la siguiente imagen.

    function moverAlaDerecha(){
        if (counter >= sliderSection.length-1) {
            counter = 0
            operacion = 0
            console.log('mover a la derecha')
            divSlider.style.transform = `translate(-${operacion}%)`
            
        }else {
            counter++
            operacion = operacion + anchoImg
            divSlider.style.transform = `translate(-${operacion}%)`
            divSlider.style.transition = 'transform ease .6s'
        }
    }

    function moverAlaIzquierda(){
        console.log('mover a la izquierda')
        counter--
        if (counter < 0) {
            counter = sliderSection.length-1
            operacion = anchoImg * (sliderSection.length-1)
            divSlider.style.transform = `translate(-${operacion}%)`
            
        }else {
            operacion = operacion - anchoImg
            divSlider.style.transform = `translate(-${operacion}%)`
            divSlider.style.transition = 'transform ease .6s'
        }
    }


    btnDerecha.addEventListener('click', moverAlaDerecha)
    btnIzquierda.addEventListener('click', moverAlaIzquierda)
})
// Propiedad
// ¿Qué es?: Es un valor o característica que pertenece a un elemento o a un objeto.

// Ejemplo: elemento.id o elemento.classList son propiedades que nos dicen cuál es el id o las clases de un elemento.

// Uso: Piensa en una propiedad como un adjetivo o característica. Nos dice algo sobre el objeto o el elemento.

// Método
// ¿Qué es?: Es una función que pertenece a un objeto y realiza una acción.

// Ejemplo: elemento.appendChild() es un método que agrega un elemento dentro de otro.

// Uso: Piensa en un método como un verbo o acción. Es algo que haces con el objeto o elemento

// Evento
// ¿Qué es?: Es una acción o suceso que ocurre en la página y puede ser "escuchado" para responder a ello.

// Ejemplo: click es un evento que ocurre cuando haces clic en un elemento. Otro ejemplo es DOMContentLoaded y resize

// Uso: Piensa en un evento como una notificación de que algo pasó. Es algo que ocurre y a lo cual puedes reaccionar.

//document.querySelector('.btn-izquierda') es un método que selecciona un elemento del DOM utilizando un selector CSS. Aquí te explico cómo funciona:

// document: Es un objeto global que representa el documento HTML cargado en el navegador. Usamos document para acceder y manipular elementos dentro de la página.

// querySelector: Es un método del objeto document que permite buscar y seleccionar el primer elemento que coincida con un selector CSS que especifiques (como una clase, id, etiqueta, etc.).

// '.btn-izquierda': Es el selector CSS que estamos usando. En este caso, '.btn-izquierda' es una clase, selecciona el elemento con class="btn-izquierda".

