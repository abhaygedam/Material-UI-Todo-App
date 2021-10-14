import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { Todos } from "./Todos";
import { Button, TextField } from "@mui/material";

export const TodoId = () => {
   
    const param = useParams();
    const [todo, setTodo] = useState("");
    const [text, setText] = useState();
  
    console.log(param.id);
    
    useEffect(() => {
        getTodo();
    }, []);

    const getTodo = () => {
        axios.get(`http://localhost:3005/todos/${param.id}`).then((res) => {
            console.log(res.data);
           setTodo(res.data);
        });
    }

    const handleEdit = () => {
        axios.patch(`http://localhost:3005/todos/${param.id}`,
            { tittle: text }
        ).then((res) => {
            
           setTodo(res.data);
        });
    }

    return (
        <div>
            <Button variant="contained" color="primary" style={{width:"100px" ,marginLeft:"0px"}}><Link to="/" style={{color:"white"}}>Home</Link></Button>
            <h1>Todo Edit Page</h1>
            <div>
                <p>{todo.tittle}</p>

                <div>
                    <TextField  variant="standard" id="outlined-todo" type="text" label="Edit Todo" onChange={(e) => { setText(e.target.value) }} />
                    <Button variant="contained" color="primary" style={{marginTop:"10px", marginLeft:"20px"}} onClick={handleEdit}>Edit</Button>
                </div>
            </div>
        </div>
    );
}

