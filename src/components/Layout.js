import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <Header toggleSidebar={toggleSidebar} />}
      <div className="flex-1 flex">
        {isAuthenticated && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
        <main className="flex-1 bg-gray-50 overflow-x-hidden">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
      {isAuthenticated && <Footer />}
    </div>
  );
};

export default withRouter(Layout);

