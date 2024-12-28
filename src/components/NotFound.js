// src/pages/NotFound.js
import React from 'react';
import { TriangleAlert } from 'lucide-react'; // Icono de advertencia

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center p-5">
      {/* Icono y texto "404" alineados */}
      <div className="flex items-center text-blue-500 mb-8">
        <TriangleAlert className="text-9xl sm:text-10xl mr-4" width={170} height={170} />
        <h1 className="text-9xl sm:text-10xl font-semibold text-blue-500">404</h1>
      </div>

      {/* Título y descripción */}
      <h2 className="text-3xl sm:text-4xl font-semibold text-blue-500 mb-4">Página No Encontrada</h2>
      <p className="text-lg sm:text-xl text-blue-500">Lo siento, la página que estás buscando no existe.</p>
    </div>
  );
};

export default NotFound;
