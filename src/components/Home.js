import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Bienvenido</h2>
      <p className="text-gray-600 mb-4">
        Bienvenido al sistema de Mantenimiento de Clientes. Desde aquí puedes acceder a las principales funciones del sistema.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/consulta-clientes"
          className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Consulta de Clientes</h3>
          <p className="text-sm">
            Busca y gestiona la información de los clientes registrados en el sistema.
          </p>
        </Link>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Próximamente</h3>
          <p className="text-sm text-gray-600">
            Más funcionalidades estarán disponibles en futuras actualizaciones.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

