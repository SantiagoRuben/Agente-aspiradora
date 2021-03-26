var posicionAspiradora; // variable global para conocer la posicion de la aspiradora 
var posicionBasura = Array(15); //arreglo para conocer donde esta la basura
var banBotonCrearMapa=0; // Bandera que indica si se presiono el boton de crear mapa

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


// Funcion para eliminar la aspiradora del lugar actual 
function eliminarAspiradora(){
	var img = document.getElementById("imgAspiradora");
	document.getElementById(posicionAspiradora).removeChild(img);
}
//termina funcion de eliminar el agente aspiradora

// Funcion para poner la aspiradora
function agregarAspiradora(){
	var imgAspiradora = document.createElement("img"); // se crea el elemento imagen 
	//llenar la informacion necesaria de la imagen
	imgAspiradora.src = './lina.jpg';
	imgAspiradora.id = 'imgAspiradora';
	imgAspiradora.className = 'img';
	//Termina el llenado de informacion
	document.getElementById(posicionAspiradora).appendChild(imgAspiradora);	//agregamos el elemnto al div correspondiente

}
//Termina funcion de agregar el agente aspiradora

/*Funcion para agregar una bolsa de basura*/
function agregarBasura(pos){
	var imgBasura = document.createElement("img"); // se crea el elemento imagen 
	//llenar la informacion necesaria de la imagen
	imgBasura.src = './robot.png';
	imgBasura.id = 'imgBasura' + pos;
	imgBasura.className = 'img';
	//Termina el llenado de informacion
	document.getElementById(pos).appendChild(imgBasura);	//agregamos el elemnto al div correspondiente
}
//termina funcion de agregar una basura

//funcion para añadir toda la basura en el campo, se hace de forma aleatoria
function crearMapa(){
	var numBasura = 15;		// numero de la basura a agregar
	if(banBotonCrearMapa ==0){ 
		var aux = numBasura;
		var posicion;	//posicion a colocar la basura

		//coloca toda la basura
		while(aux > 0){

			do{//para no repetir la posicion de algun elemento
				posicion =  Math.round(Math.random()*99+1);
			}while(posicionBasura.indexOf(posicion)!=-1 || posicion==posicionAspiradora)
			agregarBasura(posicion);
			aux--;
			posicionBasura[aux] = posicion;	// agrega la basura al arreglo

		}
		//fin del ciclo que coloca la basura
		var botonCrear = document.getElementById("crear");
		banBotonCrearMapa =1;	//indica que ya se genero un mapa (se presiono el boton)
		//botonCrear.disabled = true;
	}else{

		for(var i=0; i<numBasura; i++){	// se elimina la basura que esta actuamente en el tablero para generar un nuevo mapa
			eliminarBasura(posicionBasura[i]);
		} 
	
		banBotonCrearMapa=0; //la bandera se regresa a cero para crear un nuevo mapa
		crearMapa();
	}
}
//Termina la funcion para añadir la basura

//funcion para que se mueva nuestro agente aspiradora
function inciarRecoleccion(){
	var direccion = Math.round(Math.random()*3); // 0=izquierda, 1=arriba, 2=derecha, 3=abajo; 
	switch(direccion){
		case 0:
			eliminarAspiradora();
			posicionAspiradora = posicionAspiradora -1;
			agregarAspiradora();
			eliminarBasura(posicionAspiradora);
			break;
		case 1:
			eliminarAspiradora();
			posicionAspiradora = posicionAspiradora -10;
			agregarAspiradora();
			eliminarBasura(posicionAspiradora);
			break;
		case 2:
			eliminarAspiradora();
			posicionAspiradora = posicionAspiradora +1;
			agregarAspiradora();
			eliminarBasura(posicionAspiradora);
			break;
		case 3:
			eliminarAspiradora();
			posicionAspiradora = posicionAspiradora +10;
			agregarAspiradora();
			eliminarBasura(posicionAspiradora);
			break;
	}
}
//Termina funcion para moverse

//funcion para comprobrar si hay basura en el cuadro y quitarla
function eliminarBasura(pos){
	var eliminar= posicionBasura.indexOf(pos) // se busca si la varuable pos se encuentra dentro del arreglo de las posiciones de la basura
	if(eliminar!=-1){// si esta entonces se elimina la basura de ese div
		var img = document.getElementById("imgBasura"+pos);
		document.getElementById(pos).removeChild(img);
		posicionBasura[eliminar] = -1;
	}
}
//termina funcion eliminar basura
