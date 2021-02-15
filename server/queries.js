require('dotenv').config()
const Pool=require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
})
const queryText=`CREATE TABLE IF NOT EXISTS memes(id SERIAL PRIMARY KEY,name VARCHAR(100),url VARCHAR(300) UNIQUE,caption VARCHAR(200) UNIQUE);`
pool.query(queryText)
.then(res=>{
  console.log("Created")
}).catch((err) => {
  console.log(err);
  pool.end();
});

const getMemes=(request,response)=>{
    pool.query('SELECT * FROM memes ORDER BY id desc limit 100',(error,results)=>{
        if (error){
             console.log(error)
        }
        response.status(200).json(results.rows)
    })
}


const createMeme=(request,response)=>{
    const {name,url,caption}=request.body

    pool.query('INSERT INTO memes (name,url,caption) VALUES ($1,$2,$3) RETURNING id',[name,url,caption],(error,results)=>{
        if(error){
            response.status(409).json({error:'duplicate data'})
        }else{
          const json={"id":JSON.stringify(results.rows[0].id)}
          response.status(201).send(json)
        }
        
    })
}


const getMemeById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM memes WHERE id = $1', [id], (error, results) => {
      if (error) {
          console.log(error)
      }
      else if(results.rows.length){
        response.status(200).json(results.rows)
        
      }else{
        response.status(404).json({error:"Not Found"})
      }
      
    })
  }

  const updateMeme = (request, response) => {
    const id = parseInt(request.params.id)
    const { url,caption } = request.body
  
    pool.query(
      'UPDATE memes SET  url = $1 ,caption=$2 WHERE id = $3',
      [url,caption, id],
      (error, results) => {
        if (error) {
            console.log(error)
        }

        else if(results.rowCount){
          response.status(200).send(`${id}`)
        }
        else{
          response.status(404).json({error:'Not Found'})
        }
      }
    )
  }

module.exports={
    getMemes,
    createMeme,
    getMemeById,
    updateMeme,
}


