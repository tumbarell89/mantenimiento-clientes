import React, { useState } from 'react';

const ConsultarCliente = () => {
  const [nombre, setNombre] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [clientes, setClientes] = useState([
    { id: '504440333', nombre: 'Allen Rivel Villalobos' },
    { id: '503330333', nombre: 'Jose Rivel Villa' },
    { id: '503330334', nombre: 'Luis Corrales Espinoza' },
    { id: '501110111', nombre: 'Test Test Test' },
    { id: '111111111', nombre: 'Virtual Virtual Virtual' },
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para buscar clientes en el backend
    console.log('Buscando:', { nombre, identificacion });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Consulta de clientes</h2>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Nombre"
            className="flex-1 p-2 border rounded"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Identificación"
            className="flex-1 p-2 border rounded"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Buscar
          </button>
        </div>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Identificación</th>
              <th className="py-2 px-4 border-b text-left">Nombre completo</th>
              <th className="py-2 px-4 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td className="py-2 px-4 border-b">{cliente.id}</td>
                <td className="py-2 px-4 border-b">{cliente.nombre}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultarCliente;

