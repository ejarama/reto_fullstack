import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { subscribeToAuthChanges } from '../../../services/authService';
import useCartStore from '../../../store/cartStore';

export default function NavBar() {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    /*
      // BACKUP: OLD LOCALSTORAGE METHOD
      // const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
      // setLoggedInUser(user);
    */
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setLoggedInUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const isActive = (path) => location.pathname === path;

  /*
    // BACKUP: OLD LOCALSTORAGE METHOD
    // const handleLogout = () => {
    //   localStorage.removeItem('loggedInUser');
    //   setLoggedInUser(null);
    //   navigate('/login');
    // };
  */

  return (
    <nav className="sticky top-0 z-50 bg-blackand-bg/80 backdrop-blur-md border-b border-blackand-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold tracking-widest uppercase hover:opacity-80 transition-opacity"
          >
            <span className="text-white">
              BlackAnd Store
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link
                to="/gallery"
                className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                  isActive('/gallery')
                    ? 'text-white border-white'
                    : 'text-blackand-text-secondary border-transparent hover:text-white hover:border-white/50'
                }`}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                  isActive('/cart')
                    ? 'text-white border-white'
                    : 'text-blackand-text-secondary border-transparent hover:text-white hover:border-white/50'
                }`}
              >
                Cart ({totalItems})
              </Link>
            </li>
            {loggedInUser ? (
              <li>
                <Link
                  to="/profile"
                  className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                    isActive('/profile')
                      ? 'text-white border-white'
                      : 'text-blackand-text-secondary border-transparent hover:text-white hover:border-white/50'
                  }`}
                >
                  Profile
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                      isActive('/login')
                        ? 'text-white border-white'
                        : 'text-blackand-text-secondary border-transparent hover:text-white hover:border-white/50'
                    }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                      isActive('/register')
                        ? 'text-white border-white'
                        : 'text-blackand-text-secondary border-transparent hover:text-white hover:border-white/50'
                    }`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button (opcional para futuro) */}
          <button className="md:hidden p-2 rounded-md text-blackand-text-secondary hover:text-white hover:bg-white/5 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
