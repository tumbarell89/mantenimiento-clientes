import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const MantenimientoCliente = () => {
  const { id } = useParams();
  const history = useHistory();
  const { userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [cliente, setCliente] = useState({
    nombre: '',
    apellidos: '',
    identificacion: '',
    celular: '',
    otroTelefono: '',
    direccion: '',
    fNacimiento: '',
    fAfiliacion: '',
    sexo: '',
    resennaPersonal: '',
    imagen: '',
    interesFK: '',
    usuarioId: userId
  });

  useEffect(() => {
    if (id) {
      // Aquí iría la lógica para cargar los datos del cliente si es una edición
      // Por ahora usaremos datos de ejemplo
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await axios.post('https://pruebareactjs.test-class.com/Api/api/Cliente/Actualizar', {
          id,
          ...cliente
        });
      } else {
        await axios.post('https://pruebareactjs.test-class.com/Api/api/Cliente/Crear', cliente);
      }
      history.push('/consulta-clientes');
    } catch (error) {
      console.error('Error al guardar cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-600">👤</span>
              </div>
              <h2 className="text-2xl font-semibold">Mantenimiento de clientes</h2>
            </div>
            <div className="space-x-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </button>
              <button
                type="button"
                onClick={() => history.goBack()}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Regresar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Identificación
              </label>
              <input
                type="text"
                name="identificacion"
                value={cliente.identificacion}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={cliente.nombre}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellidos
              </label>
              <input
                type="text"
                name="apellidos"
                value={cliente.apellidos}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Género
              </label>
              <select
                name="sexo"
                value={cliente.sexo}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Seleccione</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                name="fNacimiento"
                value={cliente.fNacimiento.split('T')[0]}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de afiliación
              </label>
              <input
                type="date"
                name="fAfiliacion"
                value={cliente.fAfiliacion.split('T')[0]}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono Celular
              </label>
              <input
                type="tel"
                name="celular"
                value={cliente.celular}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono Otro
              </label>
              <input
                type="tel"
                name="otroTelefono"
                value={cliente.otroTelefono}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interés
              </label>
              <select
                name="interesFK"
                value={cliente.interesFK}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Seleccione</option>
                {/* Aquí irían las opciones de interés */}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              value={cliente.direccion}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reseña
            </label>
            <textarea
              name="resennaPersonal"
              value={cliente.resennaPersonal}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MantenimientoCliente;

