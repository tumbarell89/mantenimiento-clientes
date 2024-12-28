import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const { logout, username } = useContext(AuthContext);
  const history = useHistory();
  
  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <header className="bg-[#1a237e] text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 text-white focus:outline-none md:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold">COMPANIA PRUEBA</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm hidden sm:inline">{username}</span>
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

