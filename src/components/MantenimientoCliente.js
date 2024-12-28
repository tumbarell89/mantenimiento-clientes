import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../utils/api';
import { Save, ArrowLeft, Upload } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const MantenimientoCliente = () => {
  const { id } = useParams();
  const history = useHistory();
  const { userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [intereses, setIntereses] = useState([]);
  const baseURL = api.defaults.baseURL;
  
  const [cliente, setCliente] = useState({
    nombre: '',
    apellidos: '',
    identificacion: '',
    telefonoCelular: '',
    otroTelefono: '',
    direccion: '',
    fNacimiento: '',
    fAfiliacion: new Date().toISOString().split('T')[0],
    sexo: '',
    resenaPersonal: '',
    imagen: '',
    interesesId: '',
    usuarioId: userId
  });

  useEffect(() => {
    console.log(userId);
    const intereses = async () => {
      try {
        const responseInteres = await api.get(baseURL + `/api/Intereses/Listado`);
        setIntereses(responseInteres.data); // Guardar los intereses en el estado
      } catch (error) {
        console.error('Error al obtener intereses:', error);
      }
    };
    if (id) {
      const cargarCliente = async () => {
        try {
          const response = await api.get(baseURL+`/api/Cliente/Obtener/${id}`);
          const clienteData = response.data;
          setCliente({
            ...clienteData,
            usuarioId: userId,
            fNacimiento: clienteData.fNacimiento.split('T')[0],
            fAfiliacion: clienteData.fAfiliacion.split('T')[0]
          });
          if (clienteData.imagen) {
            setPreviewImage(clienteData.imagen);
          }
        } catch (error) {
          console.error('Error al cargar cliente:', error);
        }
        
      };
      
      cargarCliente();
    }
    intereses();
  }, [baseURL, id]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!cliente.nombre || cliente.nombre.length > 50) {
      newErrors.nombre = 'El nombre es obligatorio y no debe exceder 50 caracteres';
    }
    
    if (!cliente.apellidos || cliente.apellidos.length > 100) {
      newErrors.apellidos = 'Los apellidos son obligatorios y no deben exceder 100 caracteres';
    }
    
    if (!cliente.identificacion || cliente.identificacion.length > 20) {
      newErrors.identificacion = 'La identificación es obligatoria y no debe exceder 20 caracteres';
    }
    
    if (!cliente.telefonoCelular || cliente.telefonoCelular.length > 20) {
      newErrors.telefonoCelular = 'El teléfono telefonoCelular es obligatorio y no debe exceder 20 caracteres';
    }
    
    if (cliente.otroTelefono && cliente.otroTelefono.length > 20) {
      newErrors.otroTelefono = 'El otro teléfono no debe exceder 20 caracteres';
    }
    
    if (!cliente.direccion || cliente.direccion.length > 200) {
      newErrors.direccion = 'La dirección es obligatoria y no debe exceder 200 caracteres';
    }
    
    if (!cliente.fNacimiento) {
      newErrors.fNacimiento = 'La fecha de nacimiento es obligatoria';
    }
    
    if (!cliente.fAfiliacion) {
      newErrors.fAfiliacion = 'La fecha de afiliación es obligatoria';
    }
    
    if (!cliente.sexo || !['M', 'F'].includes(cliente.sexo)) {
      newErrors.sexo = 'El género es obligatorio (M/F)';
    }
    
    if (!cliente.resenaPersonal || cliente.resenaPersonal.length > 200) {
      newErrors.resenaPersonal = 'La reseña es obligatoria y no debe exceder 200 caracteres';
    }
    
    if (!cliente.interesesId) {
      newErrors.interesesId = 'El interés es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreviewImage(base64String);
        setCliente(prev => ({
          ...prev,
          imagen: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      console.log(cliente);
      if (id) {
        await api.post(baseURL+'/api/Cliente/Actualizar', {
          id,
          ...cliente,
          celular: cliente.telefonoCelular,
          sexo: cliente.sexo.toUpperCase(),
          usuarioId: userId,
        });
      } else {
        await api.post(baseURL+'/api/Cliente/Crear', {
          ...cliente,
          celular: cliente.telefonoCelular,
          sexo: cliente.sexo.toUpperCase(),
          usuarioId: userId,
        });
      }
      history.push('/consulta-clientes');
    } catch (error) {
      console.error('Error al guardar cliente:', error);
      setErrors({ submit: 'Error al guardar el cliente. Por favor, intente nuevamente.' });
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
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-3 overflow-hidden relative">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Cliente" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600 text-2xl">👤</span>

                )}
                <label className="absolute bottom-0 right-2 flex items-center justify-center p-1 bg-black bg-opacity-50 rounded-full cursor-pointer">
                  <Upload className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Mantenimiento de clientes</h2>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </button>
              <button
                type="button"
                onClick={() => history.push('/consulta-clientes')}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Regresar
              </button>
            </div>
          </div>

          {errors.submit && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Identificación *
              </label>
              <input
                type="text"
                name="identificacion"
                value={cliente.identificacion}
                onChange={handleChange}
                maxLength={20}
                className={`w-full p-2 border rounded-md ${errors.identificacion ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.identificacion && (
                <p className="mt-1 text-xs text-red-500">{errors.identificacion}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={cliente.nombre}
                onChange={handleChange}
                maxLength={50}
                className={`w-full p-2 border rounded-md ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.nombre && (
                <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellidos *
              </label>
              <input
                type="text"
                name="apellidos"
                value={cliente.apellidos}
                onChange={handleChange}
                maxLength={100}
                className={`w-full p-2 border rounded-md ${errors.apellidos ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.apellidos && (
                <p className="mt-1 text-xs text-red-500">{errors.apellidos}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Género *
              </label>
              <select
                name="sexo"
                value={cliente.sexo}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.sexo ? 'border-red-500' : 'border-gray-300'}`}
                required
              >
                <option value="">Seleccione</option>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
              </select>
              {errors.sexo && (
                <p className="mt-1 text-xs text-red-500">{errors.sexo}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de nacimiento *
              </label>
              <input
                type="date"
                name="fNacimiento"
                value={cliente.fNacimiento}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.fNacimiento ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.fNacimiento && (
                <p className="mt-1 text-xs text-red-500">{errors.fNacimiento}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de afiliación *
              </label>
              <input
                type="date"
                name="fAfiliacion"
                value={cliente.fAfiliacion}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.fAfiliacion ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.fAfiliacion && (
                <p className="mt-1 text-xs text-red-500">{errors.fAfiliacion}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono telefonoCelular *
              </label>
              <input
                type="tel"
                name="telefonoCelular"
                value={cliente.telefonoCelular}
                onChange={handleChange}
                maxLength={20}
                className={`w-full p-2 border rounded-md ${errors.telefonoCelular ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.telefonoCelular && (
                <p className="mt-1 text-xs text-red-500">{errors.telefonoCelular}</p>
              )}
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
                maxLength={20}
                className={`w-full p-2 border rounded-md ${errors.otroTelefono ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.otroTelefono && (
                <p className="mt-1 text-xs text-red-500">{errors.otroTelefono}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interés *
              </label>
              <select
                name="interesesId"
                value={cliente.interesesId}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.interesesId ? 'border-red-500' : 'border-gray-300'}`}
                required
              >
                <option value="">Seleccione</option>
                {intereses.length > 0 && intereses.map((interes) => (
                  <option key={interes.id} value={interes.id}>
                    {interes.descripcion}
                  </option>
                ))}
              </select>
              {errors.interesesId && (
                <p className="mt-1 text-xs text-red-500">{errors.interesesId}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección *
            </label>
            <input
              type="text"
              name="direccion"
              value={cliente.direccion}
              onChange={handleChange}
              maxLength={200}
              className={`w-full p-2 border rounded-md ${errors.direccion ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.direccion && (
              <p className="mt-1 text-xs text-red-500">{errors.direccion}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reseña *
            </label>
            <textarea
              name="resenaPersonal"
              value={cliente.resenaPersonal}
              onChange={handleChange}
              maxLength={200}
              rows="4"
              className={`w-full p-2 border rounded-md ${errors.resenaPersonal ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.resenaPersonal && (
              <p className="mt-1 text-xs text-red-500">{errors.resenaPersonal}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MantenimientoCliente;

