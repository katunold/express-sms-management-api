import app from './express';
import dotenv from 'dotenv';

dotenv.config();


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>console.log(`server has started on port ${PORT}`));
