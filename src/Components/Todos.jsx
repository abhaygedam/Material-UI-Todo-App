import { useEffect, useState } from "react";
import axios from "axios";
import { Switch, Link } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { margin } from "@mui/system";


 
export const Todos = () => {

    const [text, setText] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        handleGetTodo();
    }, []);

   
    const handleAddTodo = async () => {
        try {
            const res = await axios.post("http://localhost:3005/todos", {
                status: false,
                tittle: text,
            });
            handleGetTodo();
            setText("");
        }
        catch (e) {
            console.log(e.message);
        }
    }

     const handleGetTodo = async () => {
        try {
            const res = await axios.get("http://localhost:3005/todos");
            console.log("res", res.data);
            setData(res.data);
        }
        catch (e) {
             console.log(e.message);
        }
    }
    
   
    const handleTogle = async (id, stat) => {
         try {
            const res = await axios.patch(`http://localhost:3005/todos/${id}`, {
                status: !stat,
            });
             handleGetTodo();
        }
        catch (e) {
           console.log(e.message);
        }
    }

    const handleDelete = async (id) => {
         try {
            const res = await axios.delete(`http://localhost:3005/todos/${id}`);
             handleGetTodo();
        }
        catch (e) {
              console.log(e.message);
        }
    }

  
    return (
        <div>
            <h1>Todo App</h1>
            <TextField variant="standard" id="outlined-todo" label="Enter Todo" type="Todo" type="text" onChange={(e) => {
                setText(e.target.value);
            }} />
            <Button variant="contained" color="primary" style={{width:"120px", height:"40px" ,marginLeft:"20px", marginTop:"10px"}} onClick={handleAddTodo}>Add Todo</Button>

            {
                data.map((e) => {
                    console.log(e);
                    return (
                        <>
                        <h2>{e.status}</h2>
                          <div style={{  width:"400px", height:"60px", border: "1px solid grey", display:"flex",justifyContent:"space-evenly" ,margin:"auto"}}> <Link to={`/todo/${e.id}`} ><Typography style={{
                               marginTop:"15px",fontSize:"20px", color: e.status ? "#6ECB63" : "black"
                            }}>{e.tittle}</Typography></Link> 
                           
                                <Button  variant="contained" color="inherit" style={{width: "100px", height:"40px", marginTop:"10px"}} onClick={()=>{handleDelete(e.id)}}>Delete</Button>
                                <Button  variant="contained" color="inherit" style={{width: "100px", height:"40px", marginTop:"10px"}} onClick={()=>{handleTogle(e.id, e.status)}}>Toggle</Button>
                            </div>
                        </>    
                    )
                })
            }
        </div>
    );
}

