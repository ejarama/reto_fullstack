import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToAuthChanges, logoutUser } from '../../../services/authService';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* 
      // BACKUP: OLD LOCALSTORAGE METHOD
      // const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
      // setUser(loggedInUser);
      // setLoading(false);
    */

    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      /*
        // BACKUP: OLD LOCALSTORAGE METHOD
        // localStorage.removeItem('loggedInUser');
      */
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <p className="text-xl text-blackand-text-secondary">Inicia sesión para ver tu perfil</p>
        <button 
          onClick={() => navigate('/login')}
          className="btn-primary"
        >
          IR A LOGIN
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-blackand-surface border border-blackand-border rounded-none overflow-hidden">
        {/* Header/Cover background */}
        <div className="h-32 bg-blackand-card border-b border-blackand-border"></div>
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start px-8 -mt-12 pb-8">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-none bg-blackand-surface p-1 border border-blackand-border shadow-2xl">
            <div className="w-full h-full rounded-none bg-blackand-bg flex items-center justify-center text-3xl font-light text-white">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
          
          {/* User Info */}
          <div className="mt-6 sm:mt-14 sm:ml-8 text-center sm:text-left flex-1 min-w-0 pr-4">
            <h1 className="text-2xl font-light tracking-wide uppercase text-white truncate">
              {user.displayName || 'Usuario de BlackAnd'}
            </h1>
            <p className="text-sm text-blackand-text-secondary mt-1 truncate">{user.email}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-14 flex-shrink-0">
            <button
              onClick={handleLogout}
              className="btn-secondary px-6 py-2"
            >
              CERRAR SESIÓN
            </button>
          </div>
        </div>

        {/* Profile Details Sections */}
        <div className="border-t border-blackand-border p-8">
          <h3 className="text-sm font-light tracking-widest uppercase text-white mb-6">Información de Cuenta</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
            <div className="sm:col-span-1">
              <dt className="text-xs font-semibold text-blackand-text-secondary uppercase tracking-wider">ID de Usuario</dt>
              <dd className="mt-2 text-sm text-white break-all">{user.uid}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-xs font-semibold text-blackand-text-secondary uppercase tracking-wider">Estado de Cuenta</dt>
              <dd className="mt-2 text-sm text-white">Activa</dd>
            </div>
            {/* Add more info later if available connected logic */}
            <div className="sm:col-span-2">
               <dt className="text-xs font-semibold text-blackand-text-secondary uppercase tracking-wider">Email Verificado</dt>
               <dd className="mt-2 text-sm text-white">{user.emailVerified ? 'Sí' : 'No'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
