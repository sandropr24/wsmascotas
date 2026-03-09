const express = require('express') //Framework
const mysql = require('mysql2')  //Acceso DB
const bodyParser = require('body-parser') //Interactuar con JSON

const app = express()
app.use(bodyParser.json())

//Configuración de acceso 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbmascotas'
})

//Aperturar la conexion 
db.connect((err) => {
  if(err) throw err;
  console.log("Conectado a la BD de mascotas")
})

//Iniciar el servidor 
const PORT = 3000

//VERBO  = ACCION = INTENCION
//GET : Leer 
//POST: Crear
//PUT : Actualizar
//DELETE: Eliminar


//req (require , requerimiento)
//res (response , respuesta)
app.post('/mascotas', (req,res)=>{
  //¿Y los datos que queremos guardar? - DESERIALIZACION
  const{tipo, nombre , color , pesokg} = req.body

  //? = comodin , evita los ataques por SQLinjection
  const sql = "INSERT INTO mascotas(tipo, nombre, color ,pesokg)VALUES(?,?,?,?)"

  db.query(sql, [tipo , nombre, color , pesokg], (err, results)=> {
    if (err){
      return res.status(500).send({
        success: false ,
        message: 'Nose concreto el registro'
      })
    }

    //¿Que hacemos cuando logramos registrar?
    res.send({
      success: true,
      message: 'Nueva mascota registrada',
      id: results.insertId
    })  
  })
})

app.get('/mascotas', (req,res)=>{
  const sql = "SELECT * FROM mascotas LIMIT 10"
  db.query(sql,(err , results)=>{
    if(err) return res.status(500).send({message: 'Error acceso a datos'})
      res.json(results)
  })
  //res.send({ 'proceso' : 'GET'})
})

//Se enviara el ID por la URL (endpoint)
//Se enviaran los datos por JSON
app.put('/mascotas/:id', (req,res)=>{
  const {id}= req.params
  const {tipo , nombre, color , pesokg} = req.body
  //Podemos escribir multilinea utilizando '
  //COMODINES van en un indice
  const sql = "UPDATE mascotas SET tipo = ?, nombre = ? , color = ? , pesokg = ? WHERE id = ?"

  db.query(sql , [tipo , nombre , color , pesokg, id], (err , results) => {
    if(err){
      res.status(500).send({
        success:false ,
        message: 'No se completo la actualización'
      })
    }

    return res.send({
      success: true,
      message: 'Registro actualizado'
    })
  })
})

//En un WS para eliminar un regsitro, pasamos la PK como parte de la ruta 
//Ejemplo : DELETE - miwebservice.com/cliente/1
app.delete('/mascotas/:id', (req,res)=>{
  //¿De dodne obtenemos el ID borrar? =>ENDPOINT(URL)
  const {id } = req.params
  const sql = "DELETE FROM mascotas WHERE id = ?"
  db.query(sql, [id], (err , results) => {
    //Clausula de GUARDA /retorno temprano
    if(err){
      res.status(500).send({
        success: false,
        message: 'No se puede eliminar el registro'
      })
    }
    
    if(results.affectedRows == 0){
      return res.status(404).send({
        success: false,
        message: 'No existe la mascota'
      })
    }
    res.send({
      success: true,
      message: 'Eliminado correctamente'
    })
  } )
})



app.listen(PORT, ()=> {
  console.log("Servidor iniciado correctamente en http://localhost:3000")
})