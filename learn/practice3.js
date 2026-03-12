//Objeto
const lenguajes = {
  compilados: ["JAVA" , "C" , "C++"] , 
  interpretados: ["Python" ,"PHP" , "Javascrip"]
}


const body ={
  apellidos: "Pachas Romani",
  nombres: "Sandro Steven",
  edad: 19 ,
  estadoCasado: false,
  direccion: "Chincha",
  especialidad: "Ingenieria Software"
}

const{apellidos , nombres, edad , estadoCasado ,direccion , especialidad} = body





/*
const apellidos = body.apellidos
const nombres = body.nombres
const edad = body.edad
const estadoCasado = body.estadoCasado
*/

console.log(apellidos, nombres , edad , estadoCasado , direccion , especialidad)
//console.log(lenguajes.compilados[0])