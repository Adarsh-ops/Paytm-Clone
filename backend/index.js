const express=require('express');
const app=express();
const mainRouter=require('./routes/index')
const cors=require('cors');
const port=4004;

app.use(cors());
app.use(express.json());
app.use('/api/v1',mainRouter);

app.listen(port,()=>{
    console.log('Server running on port '+port)
})