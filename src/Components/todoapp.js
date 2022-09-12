import { useState } from "react"
import Todo from "./todo";
import "./todoapp.css";

export default function TodoApp() {

    const [title, setTitle] = useState("Hola");
    const [to_dos, setTo_dos] = useState([]);

    
    function handleChange(event){
        const value = event.target.value;

        setTitle(value);
    }

    function handleSubmit(e){
        e.preventDefault();

        const newTodo={
            id: crypto.randomUUID(),
            title: title,
            completed: false
        };

        const temp = [...to_dos]; //copiando el arreglo to_dos
        temp.unshift(newTodo);

        setTo_dos(temp);

        setTitle("");
    }

    function handleUpdate(id, value){
        const temp = [...to_dos];
        const item = temp.find(item => item.id === id);
        item.title = value;
        setTo_dos(temp);
    }

    function handleDelete(id){
        const temp = to_dos.filter(item => item.id !== id);
        setTo_dos(temp);
    }

    return <div className="todoContainer">
        <form className="todoCreateForm" onSubmit={handleSubmit}>
            <input onChange={handleChange} className="todoInput" placeholder="Add to-do activity" value={title}/>
            <input onClick={handleSubmit} type="submit" value="Create to-do" className="buttonCreate" />

        </form>

        <div className="todosContainer">
            {
                to_dos.map((item) => (
                    <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                ))
            }
        </div>
    </div>
}