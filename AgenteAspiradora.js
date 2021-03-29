var posicionAspiradora; // variable global para conocer la posicion de la aspiradora 
var posicionInicial;   // guarda la posicion inicial de la aspiradora por si hay un reinicio
var posicionBasura = Array(15); //arreglo para conocer donde esta la basura
var posicionBasuraAux = Array(15); // guarda las posiciones por si hay un reinicio
var banBotonCrearMapa=0; // Bandera que indica si se presiono el boton de crear mapa
var intervalo, intervaloTiempo;	//variable para limpiar el intervalo de ejecucion (pausar o finalizar el recorrido)
var numBasura = 15; // numero total de la basura
var minuto = 0;
var segundos = 0;

//arreglos para validar el limite del mapa
var limiteSuperior = [1,2,3,4,5,6,7,8,9,10];
var limiteInferior = [91,92,93,94,95,96,97,98,99,100];
var limiteIzquierdo = [1,11,21,31,41,51,61,71,81,91];
var limiteDerecho = [10,20,30,40,50,60,70,80,90,100];

//textos inciales del tiempo y la basura faltante
const divFalta = document.createElement('div');
var text = document.createTextNode(0);
const divCronometro = document.createElement('div');
var textConometro = document.createTextNode("00:00");


// funcion para crear el tablero y poner la aspiradora (solo se hace al cargar por primera vez la pagina)
window.onload= function creaTablero(){

	const dimension = 10;	//dimension del tablero 
	const tablero = document.getElementById("tablero"); // se obtiene el div donde se dibujara el tablero
	const tiempo = document.getElementById("cronometro");
	const falta = document.getElementById("falta");
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

	posicionAspiradora = Math.round(Math.random()*99+1); // Numero aleatorio para la posicion de inicial de la aspiradora
	posicionInicial = posicionAspiradora;
	//alert(posicionAspiradora);
	agregarAspiradora(posicionAspiradora);

	//agregar los parametros inciales de tiempo y basura faltante, como es la primera vez que se une el div entonces se usa appnedChild
	divFalta.appendChild(text);
	falta.appendChild(divFalta);

	divCronometro.appendChild(textConometro);
	tiempo.appendChild(divCronometro);
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
	// cambiar el valor de la basura faltante, como ya se agrego previamente el div solo se sustituye el valor
	divFalta.innerHTML = numBasura;
	
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
			var boleano = eliminarBasura(posicionBasura[i]); // es neceario cachar el retorno de la funcion para asi evitar salirse del for
		} 
		banBotonCrearMapa=0; //la bandera se regresa a cero para crear un nuevo mapa
		crearMapa();
	}
}
//Termina la funcion para añadir la basura

//funcion para comprobrar si hay basura en el cuadro y quitarla retorna verdadero si elimino una basura
function eliminarBasura(pos){
	var eliminar= posicionBasura.indexOf(pos) // se busca si la varuable pos se encuentra dentro del arreglo de las posiciones de la basura
	if(eliminar!=-1){// si esta entonces se elimina la basura de ese div
		var img = document.getElementById("imgBasura"+pos);
		document.getElementById(pos).removeChild(img);
		posicionBasura[eliminar] = -1;
		return true;
	}
	return false
}
//termina funcion eliminar basura

//funcion para iniciar la recoleecion de basura
function inciarRecoleccion(){
	var botonCrear = document.getElementById("crear"); // se tiene que desabilitar el boton de crear mapa al momento de inicar el juego 
	var botonIniciar = document.getElementById("iniciar");
	botonCrear.disabled = true;
	botonIniciar.disabled = true;
	intervalo = setInterval(recolectarBasura,700); // ejecuta la funcion cada 700ms
	intervaloTiempo = setInterval(actualizarCronometro,1000) // Aumenta el tiempo en 1
}

//funcion para que se mueva nuestro agente aspiradora
function recolectarBasura(){
	var direccion = Math.round(Math.random()*3); // 0=izquierda, 1=arriba, 2=derecha, 3=abajo; 
	direccion = basuraCerca(direccion); //si esta cerca una basura entonces es su prioridad almenos que se salga del limite permitido
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
			break;
		case 1:
			eliminarAspiradora();
			posicionAspiradora = posicionAspiradora -10;
			break;
		case 2:
			eliminarAspiradora();
			posicionAspiradora = posicionAspiradora +1;
			break;
		case 3:
			eliminarAspiradora();
			posicionAspiradora = posicionAspiradora +10;
			break;
	}
	agregarAspiradora(posicionAspiradora); // se agrega la aspiradora en su nueva posicion 
	if(eliminarBasura(posicionAspiradora)){ // si elimino la basura entonces se debe de descontar del contador que se muetra en la pantalla
		//como ya se agrego previamente el div solo se sustituye el valor
		divFalta.innerHTML = --numBasura;

	}
	if(terminarPartida()){// comprobar si ya recolecto toda la basura, finaliza la partida
		pausa();
		var botonCrear = document.getElementById("crear"); //se vuelve habilitar el boton de crear mapa
		botonCrear.disabled = false;
		//se reinician los campos de tiempo y numero de basura
		numBasura = posicionBasura.length;
		minuto=0;
		segundos=0;
		//como ya se agrego previamente el div solo se sustituye el valor
		divFalta.innerHTML = 0;
		divCronometro.innerHTML = "00:00";
		banBotonCrearMapa=0; //la bandera se regresa a cero para crear un nuevo mapa
	}
}
//Termina funcion para moverse

// funcion para comprobar si todavia queda basura en el mapa, retorna verdadero si concluyo la recoleccion
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
	clearInterval(intervaloTiempo);
 //se vuelve habilitar el boton de inicio
	var botonIniciar = document.getElementById("iniciar");
	botonIniciar.disabled = false;
}
//termina funcion pausa

//funcion para reiniciar la partida 
function reiniciar(){
	var botonCrear = document.getElementById("crear"); //se vuelve habilitar el boton de crear mapa
	botonCrear.disabled = false;
	pausa();	// es necesario limpiar el intervalo para que no se ejecuten las acciones guardadas en la pila
	eliminarAspiradora();	//se elimina la aspiradora de su posicion actual
	agregarAspiradora(posicionInicial);	// se agrega en su posicion inicial
	posicionAspiradora=posicionInicial;
	for(var i=0; i<posicionBasura.length; i++){	// si ya se habia recolectado basura se debe de volver a poner
		if(posicionBasura[i] != posicionBasuraAux[i]){
			agregarBasura(posicionBasuraAux[i]);
			posicionBasura[i] = posicionBasuraAux[i];
		}
	}

	//se reinician los campos de tiempo y numero de basura
	numBasura = posicionBasura.length;
	minuto=0;
	segundos=0;
	//como ya se agrego previamente el div solo se sustituye el valor
	divFalta.innerHTML = numBasura;
	divCronometro.innerHTML = "00:00";
}

//funcion para actualizar el cronometro
function actualizarCronometro(){
	var minutoAux;
	var segundosAux;
	segundos++;
	if(segundos >59){
		segundos = 0;
		minuto++;
	}

	if(segundos<10){
		segundosAux = "0" + segundos;
	}else{
		segundosAux = segundos;
	}

	if(minuto < 10){
		minutoAux = "0" + minuto;
	}else{
		minutoAux = minuto
	}

	divCronometro.innerHTML = minutoAux + ":" + segundosAux;
}
// termina la funcion para aumentar un segundo 

//funcion para recoger la basura cunado esta cerca, retorna la direccion hacia donde debe moverse
function basuraCerca(direccion){
	if(posicionBasura.indexOf(posicionAspiradora + 1) != -1){
		return 2;
	}
	if(posicionBasura.indexOf(posicionAspiradora + 10) != -1){
		return 3;
	}
	if(posicionBasura.indexOf(posicionAspiradora - 1) != -1){
		return 0;
	}
	if(posicionBasura.indexOf(posicionAspiradora - 10) != -1){
		return 1;
	}
	return direccion;
}
