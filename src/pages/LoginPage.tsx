
import { useState } from 'react';
import { AuthService } from '../services/AuthService';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const token = await AuthService.login(loginData);
      console.log("Inicio de sesión exitoso!", token);
      // Almacenar información de inicio de sesión en localStorage
      window.localStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form className="login-form">
        <label>
          Username:
          <input type="email" name="username" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        <br />
        <button type="button" className="login-button" onClick={handleLogin}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

// Componente Login no es necesario
