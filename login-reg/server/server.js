import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import authRoutes from './routes/authRoutes.js';



const app = express();
const port = process.env.PORT || 4000

connectDB()
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));

//Api's
app.get('/', (req, res)=>{
    res.send('API working')
})
app.use('/api/auth', authRoutes)

//Port
app.listen(port, () => 
    console.log(`Server is working on PORT: ${port}`)
);

