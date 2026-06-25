import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import authRoutes from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';



const app = express();
const port = process.env.PORT || 4000

const allowedOrigins = ['http://localhost:5173']

connectDB()
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

//Api's
app.get('/', (req, res)=>{
    res.send('API working')
})
app.use('/api/auth', authRoutes)
app.use('/api/user', userRouter)

//Port
app.listen(port, () => 
    console.log(`Server is working on PORT: ${port}`)
);
