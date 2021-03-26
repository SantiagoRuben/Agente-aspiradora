var posicionAspiradora; // variable global para conocer la posicion de la aspiradora 
// funcion para crear el tablero y poner la aspiradora (solo se hace al cargar por primera vez la pagina)
window.onload= function creaTablero(){

	const dimension = 10;	//dimension del tablero 
	const tablero = document.getElementById("tablero"); // se obtiene el div donde se dibujara el tablero
	var NumeroDiv = 1	//se usara para nombrar el id de cada un de los cuadros para poder manipularlos mas facil despues
	for(var i=0; i<dimension; i++){	//for para crear las filas
		var fila = document.createElement("div");	// se crea el div de la fila
		fila.className= ("fila" );	// se le agrega una clase 
			for(var j=0; j<dimension; j++){	//for para agregar los cuadros pertenecientes a la columna
			var cuadro = document.createElement("div"); // se crea el div del cuadro
			cuadro.className= "cuadro";	// se le asigna una clase
			cuadro.id=NumeroDiv;	// se le asigna id para mejor manejo
			//cuadro.textContent=cuadro.getAttribute("id");	
			fila.appendChild(cuadro);	//se añade cada cuadro a el div fila
			NumeroDiv++;
		}// fin for de los cuadros 
		tablero.appendChild(fila);	// se añade la fila al div tablero
	}// fin for de las filas
	
	//agregar la imagen de la aspiradora

	posicionAspiradora = Math.round(Math.random()*100); // Numero aleatorio para la posicion de inicial de la aspiradora
	//alert(posicionAspiradora);
	agregarAspiradora(posicionAspiradora);
}	
// Funcion para elimianr la aspiradora del lugar actual 
function eliminarAspiradora(){
	var img = document.getElementById("imgAspiradora");
	document.getElementById(posicionAspiradora).removeChild(img);
}

// Funcion para poner la aspiradora
function agregarAspiradora(){
	var imgAspiradora = document.createElement("img"); // se crea el elemento imagen 
	//llenar la informacion necesaria de la imagen
	imgAspiradora.src = './aspiradora.jpg';
	imgAspiradora.id = 'imgAspiradora';
	imgAspiradora.className = 'img';
	//Termina el llenado de informacion
	document.getElementById(posicionAspiradora).appendChild(imgAspiradora);	//agregamos el elemnto al div correspondiente
}
