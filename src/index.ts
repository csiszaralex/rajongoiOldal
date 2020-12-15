import app from "./app";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`\u001b[35m[START]\u001b[0m Express started on ${port} port.`);
});
