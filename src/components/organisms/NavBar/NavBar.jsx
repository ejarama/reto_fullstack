import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import useCartStore from '../../../store/cartStore';
import useUserStore from '../../../store/userStore';

export default function NavBar() {
  const location = useLocation();
  const loggedInUser = useUserStore((state) => state.currentUser);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-blackand-bg/80 backdrop-blur-md border-b border-blackand-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold tracking-widest uppercase hover:opacity-80 transition-opacity"
            onClick={closeMenu}
          >
            <span className="text-white">
              BlackAnd Store
            </span>
          </Link>

          {/* Navigation Links (Desktop) */}
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
                  Hola, {loggedInUser.displayName?.split(' ')[0] || 'Usuario'}
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

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-blackand-text-secondary hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-blackand-border bg-blackand-bg">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <li>
              <Link
                to="/gallery"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/gallery') ? 'bg-white/10 text-white' : 'text-blackand-text-secondary hover:bg-white/5 hover:text-white'
                }`}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/cart') ? 'bg-white/10 text-white' : 'text-blackand-text-secondary hover:bg-white/5 hover:text-white'
                }`}
              >
                Cart ({totalItems})
              </Link>
            </li>
            {loggedInUser ? (
              <li>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/profile') ? 'bg-white/10 text-white' : 'text-blackand-text-secondary hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Hola, {loggedInUser.displayName?.split(' ')[0] || 'Usuario'}
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/login') ? 'bg-white/10 text-white' : 'text-blackand-text-secondary hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/register') ? 'bg-white/10 text-white' : 'text-blackand-text-secondary hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
