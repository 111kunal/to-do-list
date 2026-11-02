const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let todos = [
    {id:1,text:"Learn backend basics"}
];
let nextId = 2;

app.get("/api/todos" , (req, res) => {
    res.json(todos);
});

app.get('/api/hello',(req,res)=>{
    res.json({message:"Hello from the backend"});
});

app.post("/api/todos", (req,res) => {
    const text = req.body.text;
    if(!text){
        return res.status(400).json({error:"Text is required"});
    }

    const newtodo = {id:nextId++,text:text};
    todos.push(newtodo);
    res.status(200).json(newtodo);
})

app.delete("/api/todos/:id", (req,res)=>{
    const id = Number(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.json({sucess:true});
})

app.listen(3000, ()=>{
    console.log("Server is running at http://localhost:3000");
});
