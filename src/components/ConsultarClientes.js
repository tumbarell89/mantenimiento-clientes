import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../utils/api';
import { Search, Plus, ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const ConsultarClientes = () => {
  const [nombre, setNombre] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { userId } = useContext(AuthContext);

  const buscarClientes = useCallback(async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    try {
      const response = await api.post('/api/Cliente/Listado', {
        identificacion,
        nombre,
        usuarioId: userId
      });
      setClientes(response.data);
    } catch (error) {
      console.error('Error al buscar clientes:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        history.push('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [history, identificacion, nombre, userId]);

  useEffect(() => {
    buscarClientes();
  }, [buscarClientes]);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este cliente?')) {
      try {
        await api.delete(`/api/Cliente/Eliminar/${id}`);
        buscarClientes();
      } catch (error) {
        console.error('Error al eliminar cliente:', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          history.push('/login');
        }
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-semibold mb-4 sm:mb-0">Consulta de clientes</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={() => history.push('/mantenimiento-cliente')}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </button>
            <button
              onClick={() => history.goBack()}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Regresar
            </button>
          </div>
        </div>

        <form onSubmit={buscarClientes} className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Nombre"
            className="flex-1 p-2 border rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Identificación"
            className="flex-1 p-2 border rounded-md"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Identificación</th>
                <th className="px-6 py-3 text-left">Nombre completo</th>
                <th className="px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">Cargando...</td>
                </tr>
              ) : clientes.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">No se encontraron clientes</td>
                </tr>
              ) : (
                clientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{cliente.identificacion}</td>
                    <td className="px-6 py-4">{`${cliente.nombre} ${cliente.apellidos}`}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => history.push(`/mantenimiento-cliente/${cliente.id}`)}
                        className="text-blue-500 hover:text-blue-700 mr-3"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEliminar(cliente.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsultarClientes;

