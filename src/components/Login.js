import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://pruebareactjs.test-class.com/Api/api/Authenticate/login', {
        username,
        password
      });

      if (response.data.token) {
        login(response.data.token, response.data.userId);
        if (rememberMe) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);
        }
        history.push('/');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, verifique sus credenciales.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Iniciar Sesión
        </h2>
        
        {error && (
          <div className="mb-4 text-red-500 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Usuario *"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contraseña *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Recuérdame
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            INICIAR SESIÓN
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-blue-500">¿No tiene una cuenta?</p>
          <Link 
            to="/register" 
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Regístrese
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);

