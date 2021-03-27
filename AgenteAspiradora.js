var posicionAspiradora; // variable global para conocer la posicion de la aspiradora 
var posicionInicial;   // guarda la posicion inicial de la aspiradora por si hay un reinicio
var posicionBasura = Array(15); //arreglo para conocer donde esta la basura
var posicionBasuraAux = Array(15); // guarda las posiciones por si hay un reinicio
var banBotonCrearMapa=0; // Bandera que indica si se presiono el boton de crear mapa
var intervalo;	//variable para limpiar el intervalo de ejecucion (pausar o finalizar el recorrido)

//arreglos para validar el limite del mapa
var limiteSuperior = [1,2,3,4,5,6,7,8,9,10];
var limiteInferior = [91,92,93,94,95,96,97,98,99,100];
var limiteIzquierdo = [1,11,21,31,41,51,61,71,81,91];
var limiteDerecho = [10,20,30,40,50,60,70,80,90,100];

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
	posicionInicial = posicionAspiradora;
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
function agregarAspiradora(pos){
	var imgAspiradora = document.createElement("img"); // se crea el elemento imagen 
	//llenar la informacion necesaria de la imagen
	imgAspiradora.src = './lina.jpg';
	imgAspiradora.id = 'imgAspiradora';
	imgAspiradora.className = 'img';
	//Termina el llenado de informacion
	document.getElementById(pos).appendChild(imgAspiradora);	//agregamos el elemnto al div correspondiente

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
	var numBasura = posicionBasura.length;		// numero de la basura a agregar
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
			posicionBasuraAux[aux] = posicion;
		}
		//fin del ciclo que coloca la basura
		banBotonCrearMapa =1;	//indica que ya se genero un mapa (se presiono el boton)
		posicionInicial = posicionAspiradora; // si se crea un nuevo mapa su posicion inicial debe cambiar 
	}else{

		for(var i=0; i<numBasura; i++){	// se elimina la basura que esta actuamente en el tablero para generar un nuevo mapa
			if(posicionBasura[i] != -1) // quiere decio que ya no hay basura en esa cuadro (es por si crea un nuevo mapa cuando ya se habia empezado el juego)
				eliminarBasura(posicionBasura[i]);
		} 
	
		banBotonCrearMapa=0; //la bandera se regresa a cero para crear un nuevo mapa
		crearMapa();
	}
}
//Termina la funcion para añadir la basura

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

//funcion para iniciar la recoleecion de basura
function inciarRecoleccion(){
	var botonCrear = document.getElementById("crear"); // se tiene que desabilitar el boton de crear mapa al momento de inicar el juego 
	var botonIniciar = document.getElementById("iniciar");
	botonCrear.disabled = true;
	botonIniciar.disabled = true;
	intervalo = setInterval(recolectarBasura,1000); // ejecuta la funcion cada segundo

}

//funcion para que se mueva nuestro agente aspiradora
function recolectarBasura(){
	var direccion = Math.round(Math.random()*3); // 0=izquierda, 1=arriba, 2=derecha, 3=abajo; 
	/* validar limites del mapa (se cambia al lado contrario al que se saldria del mapa, 
		ejemplo si esta en el limite superior y se debe mover hacia arriba el movimiento se cambia hacia abajo)*/
	if(limiteSuperior.indexOf(posicionAspiradora)!=-1 && direccion == 1){
		direccion = 3;
	}
	if(limiteInferior.indexOf(posicionAspiradora)!=-1 && direccion == 3){
		direccion = 1;
	}
	if(limiteIzquierdo.indexOf(posicionAspiradora)!=-1 && direccion == 0){
		direccion = 2;
	}
	if(limiteDerecho.indexOf(posicionAspiradora)!=-1 && direccion == 2){
		direccion = 0;
	}
	//termina validacion de los limites 
	switch(direccion){
		case 0:
			eliminarAspiradora();
			posicionAspiradora = posicionAspiradora -1;
			agregarAspiradora(posicionAspiradora);
			eliminarBasura(posicionAspiradora);
			break;
		case 1:
			eliminarAspiradora();
			posicionAspiradora = posicionAspiradora -10;
			agregarAspiradora(posicionAspiradora);
			eliminarBasura(posicionAspiradora);
			break;
		case 2:
			eliminarAspiradora();
			posicionAspiradora = posicionAspiradora +1;
			agregarAspiradora(posicionAspiradora);
			eliminarBasura(posicionAspiradora);
			break;
		case 3:
			eliminarAspiradora();
			posicionAspiradora = posicionAspiradora +10;
			agregarAspiradora(posicionAspiradora);
			eliminarBasura(posicionAspiradora);
			break;
	}

	if(terminarPartida()){// comprobar si ya recolecto toda la basura, finaliza la partida
		pausa();
	}
}
//Termina funcion para moverse

// funcion para comprobar si todavia queda basura en el mapa
function terminarPartida(){
	var ban=posicionBasura.length;
	for(var i=0; i<posicionBasura.length; i++){
		if(posicionBasura[i] == -1)
			ban--;
	}
	if(ban == 0){
		return true;
	}else{
		return false;
	}
}
//termina funcion de verificacion de partida

//funcion para pausar la partida
function pausa(){
	clearInterval(intervalo); // se limpia el intervalo para que se deje de ejecutar la funcion 
	var botonCrear = document.getElementById("crear"); //se vuelve habilitar el boton de crear mapa
	var botonIniciar = document.getElementById("iniciar");
	botonCrear.disabled = false;
	botonIniciar.disabled = false;
}
//termina funcion pausa

//funcion para reiniciar la partida 
function reiniciar(){
	pausa();	// es necesario limpiar el intervalo para que no se ejecuten las acciones guardadas en la pila
	eliminarAspiradora();	//se elimina la aspiradora de su posicion actual
	agregarAspiradora(posicionInicial);	// se agrega en su posicion inicial
	posicionAspiradora=posicionInicial;

	for(var i=0; i<posicionBasura.length; i++){	// si ya se habia recolectado basura se debe de volver a poner
		if(posicionBasura[i] != posicionBasuraAux[i]){
			agregarBasura(posicionBasuraAux[i]);
		}
	}
}
