
// funcion para crear el tablero
window.onload= function creaTablero(){

	const dimension = 10;	//dimension del tablero 
	const tablero = document.getElementById("tablero"); // se obtiene el div donde se dibujara el tablero
	let NumeroDiv = 1	//se usara para nombrar el id de cada un de los cuadros para poder manipularlos mas facil despues
	for(let i=0; i<dimension; i++){	//for para crear las filas
		let fila = document.createElement("div");	// se crea el div de la fila
		fila.className= ("fila" );	// se le agrega una clase 
			for(let j=0; j<dimension; j++){	//for para agregar los cuadros pertenecientes a la columna
			let cuadro = document.createElement("div"); // se crea el div del cuadro
			cuadro.className= "cuadro";	// se le asigna una clase
			cuadro.id=NumeroDiv;	// se le asigna id para mejor manejo
			//cuadro.textContent=cuadro.getAttribute("id");	
			fila.appendChild(cuadro);	//se añade cada cuadro a el div fila
			NumeroDiv++;
		}// fin for de los cuadros 
		tablero.appendChild(fila);	// se añade la fila al div tablero
	}// fin for de las filas
	//alert(cuadro.getAttribute("class"));
}	



/*
<!DOCTYPE html>
<html>
<head>
    <style>
        #tablero {
            display: inline-block;
            border:5px solid;
        }
        .fila {
            background-color: #999;
            display: table;
        }
        .recuadro {
            width:50px;
            height:50px;
            float:left;
        }
        .fila:nth-child(odd) .recuadro:nth-child(even),
        .fila:nth-child(even) .recuadro:nth-child(odd) {
            background-color: white;
        }
    </style>
</head>
 
<body>
 
    <div id="tablero"></div>
 
</body>
</html>
 
<script>
const tamano=8;
const tablero=document.getElementById("tablero");
for (let i=0; i<tamano; i++) {
 
    // creamos la fila
    let fila=document.createElement("div");
    fila.classList.add("fila")
    for (let j=0; j<tamano; j++) {
 
        // creamos cada elemento de la fila
        let div=document.createElement("div");
        div.classList.add("recuadro")
        fila.appendChild(div);
    }
    tablero.appendChild(fila);
}
</script>*/