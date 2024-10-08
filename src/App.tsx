// import react stuff
import React, { createContext, FC, useEffect, useState } from 'react';
// import component to create todos
import TodoInputComponent from './components/todoInputComponent/TodoInputComponent';
import TodoList from './components/todoListComponent/TodoListComponent';
import TodoFilter from './components/todoFilterComponent/TodoFilterComponent';

import "./style/style.css"
import BackgroundComponent from './components/backgroundComponent/BackgroundComponent';
import TitleComponent from './components/titleComponent/TitleComponent';

// create a type for todos
export interface Todos {
  id : number,
  value : string
  done : boolean
}

// create a type for context (to hold todos state) 
interface TodoStateType {
  todos: Todos[];  
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
}

// create context for todos, receive 2 types :
//  - null : to initialize empty
//  - TodoStateType : for hold todo State
export const TodosContext = createContext<TodoStateType | null>(null);

// app component
const App : FC = () => {

  // todos states
  const [todos, setTodos] = useState<Todos[] >([]);

  useEffect(() => {
    // initialize localStorage
    const todosFromLocalStorage = localStorage.getItem("McTodos")
  
    // if have initialized local Storage once
    if (todosFromLocalStorage) {
      // get data from localStorage and put on state
      const jsonTodos = JSON.parse(todosFromLocalStorage)
      setTodos (jsonTodos)
    }else { // if first time
      // create a empty array and put on localStorage
      const jsonForLocalStorage = JSON.stringify([])
      localStorage.setItem("McTodos", jsonForLocalStorage)
    }
  } ,[])

  
  return (
    // create a provider for context and pass states
    <div className="app">
      <TodosContext.Provider value={{ todos, setTodos }}>
        <TitleComponent/>
        <BackgroundComponent/>
        <TodoInputComponent/>
        <TodoList/>
        <TodoFilter/>
      </TodosContext.Provider>
    </div>
  );
}

export default App;