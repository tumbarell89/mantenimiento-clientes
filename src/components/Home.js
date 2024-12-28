import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-4 sm:mb-6">Bienvenido</h2>
      <p className="text-gray-600 mb-4">
        Bienvenido al sistema de Mantenimiento de Clientes.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/consulta-clientes"
          className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Consulta de Clientes</h3>
          <p className="text-sm">
            Busca y gestiona la información de los clientes registrados en el sistema.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;

