import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { username } = useContext(AuthContext);

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-500' : 'text-gray-700';
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 w-64 h-full bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}
      >
        <div className="flex justify-between items-center p-4 md:hidden">
          <span className="font-semibold text-lg">Menú</span>
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 border-b border-gray-200">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p className="text-center text-gray-700 font-medium">{username}</p>
        </div>
        <nav className="p-4">
          <p className="text-gray-600 font-bold mb-4">MENÚ</p>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`flex items-center hover:text-blue-500 py-2 ${isActive('/')}`}
                onClick={() => toggleSidebar()}
              >
                <span className="w-8">IN</span>
                <span>INICIO</span>
              </Link>
            </li>
            <li>
              <Link
                to="/consulta-clientes"
                className={`flex items-center hover:text-blue-500 py-2 ${isActive('/consulta-clientes')}`}
                onClick={() => toggleSidebar()}
              >
                <span className="w-8">CC</span>
                <span>Consulta Clientes</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

