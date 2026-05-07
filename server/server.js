import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 4000

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}))

app.get('/', (req, res)=>{
    res.send('API working')
})

app.listen(port, () => 
    console.log(`Server is working on PORT: ${port}`)
);

