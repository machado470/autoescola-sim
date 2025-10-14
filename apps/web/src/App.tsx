import { useState, useEffect } from 'react'
import Login from './Login'
import './App.css'
import './styles.css';


function App() {
  const tokenKey = import.meta.env.VITE_TOKEN_KEY || '@autoescola/token'
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(tokenKey)
    if (stored) {
      setIsAuthenticated(true)
    }
  }, [tokenKey])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem(tokenKey)
    setIsAuthenticated(false)
  }

  return (
    <div className="app">
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="dashboard">
     <h1 className="title">Bem-vindo à AutoEscola Sim</h1>
          <p>Você está conectado.</p>
          <button onClick={handleLogout}>Sair</button>
        </div>
      )}
    </div>
  )
}

export default App
