const express = require('express')
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.pbaqirc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


       

async function run(){
    try{ 
        const incomes = client.db('budget-tracker').collection('incomes');
        const expenses = client.db('budget-tracker').collection('expenses');
        

    app.get('/', async (req,res)=>{
         res.send('server is running')
         console.log(uri);
    })

    app.post('/incomes', async (req,res)=>{
        const query = req.body
        const result = await incomes.insertOne(query)
        res.send(result)
    })

    app.get('/incomes', async (req,res)=>{
        const user = req.query.email
        const query = {email : user}
        const result = await incomes.find(query).toArray()
        res.send(result)
    })

    app.get('/incomes/:id', async(req,res)=>{
        const ids = req.params.id
        const query ={_id: new ObjectId(ids)}
        const result = await incomes.findOne(query)
        res.send(result)

    })

    app.delete('/incomes/:id', async(req,res)=>{
        const ids = req.params.id
        const query ={_id: new ObjectId(ids)}
        const result = await incomes.deleteOne(query)
        res.send(result)

    })

    app.post('/expenses', async (req,res)=>{
        const query = req.body
        const result = await expenses.insertOne(query)
        res.send(result)
    })

    app.get('/expenses', async (req,res)=>{
        const query = {}
        const result = await expenses.find(query).toArray()
        res.send(result)
    })

    app.delete('/expenses/:id', async(req,res)=>{
        const ids = req.params.id
        const query ={_id: new ObjectId(ids)}
        const result = await expenses.deleteOne(query)
        res.send(result)

    })





    }
    finally
    {}
}
run().catch(err=> console.log(err))

app.listen(port,()=>{
    console.log(`server is running ${port}`);
})

