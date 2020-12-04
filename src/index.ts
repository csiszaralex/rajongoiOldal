import app from './app';

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
  console.log(`Express started on ${port} port.`);
});