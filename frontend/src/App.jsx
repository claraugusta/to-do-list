import { useState } from 'react'
import Todo from './components/Todo';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import Login from './components/Login';
import Register from './components/Register';
import './App.css'


function App() {

  
  const REACT_APP_API_URL = "http://localhost:5555";
  const [todos, setTodos] = useState([
    {
      "id": 1,
      "text": "Criar funcionalidade X no sistema",
      "category": "Alta",
      "isCompleted": false
    },
    {
      "id": 2,
      "text": "Ir para a academia",
      "category": "Média",
      "isCompleted": false
    },
    {
      "id": 3,
      "text": "Estudar React",
      "category": "Baixa",
      "isCompleted": false
    }
  ]
  )
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [token, setToken] = useState(null);
  
  
  const addTodo = (text, category) =>{
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      }
    ]

    setTodos(newTodos)
  }
  
  

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/login`, { email, pwd: password });
      setIsLoggedIn(true);
      setToken(response.data.token);
      alert('Login bem-sucedido!');
    } catch (error) {
      alert('E-mail ou senha incorretos.');
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      await axios.post(`${REACT_APP_API_URL}/register`, { name, email, pwd: password });
      alert('Cadastro realizado com sucesso! Faça login.');
      setIsRegistering(false);
    } catch (error) {
      alert('Erro ao cadastrar usuário.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    alert('Logout realizado com sucesso!');
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        isRegistering ? (
          <>
            <Register onRegister={handleRegister} />
            <p>Já tem uma conta? <button onClick={() => setIsRegistering(false)}>Faça login</button></p>
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} />
            <p>Não tem uma conta? <button onClick={() => setIsRegistering(true)}>Cadastre-se</button></p>
          </>
        )
      ) : (
        <>
          <button onClick={handleLogout} className="logout-button">Logout</button>
          <h1>Lista de tarefas</h1>
          <div className="todo-list">
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>
          <TodoForm addTodo={addTodo} />
        </>
      )}
    </div>
  );
}

export default App
