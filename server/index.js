import express from 'express';
import Connection from './database/db.js';
import router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', router) 

app.delete('/mens/:id', async(req,res)=> {
    try {
        const _id = req.params.id
        const getMensRecord =await MensRanking.findByIdAndDelete(_id)
        res.send(getMensRecord)
    } catch (error) {
        res.status(400).send(error)
    }
})

const PORT=8000;

app.listen(PORT, () => console.log(`server is running succesfully over the port ${PORT}`));

Connection() ;
