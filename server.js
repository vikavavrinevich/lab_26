const express = require("express")
const bodyParser = require('body-parser')
const fs  = require("fs")
const app = express()
const PORT = 3000
const data = require("./data.json")
const history = require("./history.json")
app.use(express.static("public"))

app.use(bodyParser.json())


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*") 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    recordDo(req.method, req.originalUrl)
    next()
})


const recordDo = (type, url) => {
    const nowData = new Date()
    let newRecord = {"type": type,"time": nowData,"url": url}
    history.push(newRecord)
    writeFile("./history.json", history)
   

}

app.use(express.json())

 app.get("/",(req, res)=>{
res.send("Hello, Express!")
})

 app.get("/product/list",(req, res)=>{
    try{
        if(data){
            res.send(data)
        }else{
            res.status(400)
            .send("Error")
        }
    }catch{
        res.status(500)
        .send("Internal Server Error")
    } 
})


app.post("/product/create", (req,res)=>{
    try{
        if(req.body){
            data.push(req.body)
        console.log(req.body)
        writeFile("./data.json", data)

                res.send("Product created successfully.")
        }else{
            res.status(400)
            .send("Error")
        }
    }
    catch{
        res.status(500)
        .send("Internal Server Error")
    }   
    
}) 


app.put("/product/:id", (req,res)=>{
    try{
        if(req.body.price){
            let product = data.find((product) => product.id === req.params.id)
            product.price = req.body.price
            writeFile("./data.json", data)
            res.send(product) 
        }else{
            res.status(400)
            .send("Error")
        }
    }
    catch{
        res.status(500)
        .send("Internal Server Error")
    }   
}) 

app.delete("/product/:id", (req, res)=>{
    try{
        const productId = req.params.id
        const productIndex = data.findIndex(product => product.id == productId)
    
        if (productIndex !== -1) {
            data.splice(productIndex, 1) 
            writeFile("./data.json", data)
            res.send("We have deleted the product with id: " + productId)
        } else {
            res.status(404).send("Product not found")
        }
    }catch{
        res.status(500)
        .send("Internal Server Error")
    } 
}) 

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})



const writeFile = (url, data) => {
    fs.writeFile(url, JSON.stringify(data))
        
}





