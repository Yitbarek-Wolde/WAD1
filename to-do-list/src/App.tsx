import Header from './components/Header';
import Footer from './components/Footer';
import List from './components/List';

import './App.css'
import { useState, useEffect } from 'react';
import { Todo } from './types/propTypes';

function App() {
  const [todos, setTodo] = useState<Todo[]>([])

  useEffect(() => {
    async function getList(){
    const res = await fetch('http://localhost:3004/todos');
    const data = await res.json();
    setTodo(data);
    }
    getList();
    }, []);
    


  return (
    <div className="todo-container">
      <div className="todo-wrap">
        <Header />
        <List todos={todos}/>
        <Footer />
      </div>
    </div>
  );
}

export default App;
