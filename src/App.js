import logo from './logo.svg';
import './App.css';
import { Todos } from "./Components/Todos";
import {TodoId} from "./Components/TodoId"
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Switch>
         <Route  exact path="/">
           <Todos></Todos>
       </Route> 
        <Route path="/todo/:id">
          <TodoId></TodoId>
        </Route>
      <Route>404 Page not found</Route>
      </Switch>
    
    </div>
  );
}

export default App;
