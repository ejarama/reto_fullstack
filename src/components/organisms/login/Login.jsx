import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import smile from "../../../assets/smile.png";
import { loginUser } from "../../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    /*
    // Obtener usuarios registrados
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const allUsers = [...MOCK_USERS, ...registeredUsers];

    // Buscar usuario
    const user = allUsers.find(u => u.email === formData.email && u.password === formData.password);
    if (user) {
      // Login exitoso
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/gallery');
    } else {
      setError('Credenciales incorrectas.');
    }
      */
    const result = await loginUser(formData.email, formData.password);
    if (result.success) {
      navigate('/gallery');
    } else {
      setError(result.error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-blackand-bg p-6">
      <div className="w-full max-w-md bg-blackand-surface p-10 border border-blackand-border">

        {/* Header con Texto */}
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="text-2xl font-bold tracking-widest uppercase text-blackand-text-primary mb-2">BlackAnd</h1>
          <p className="text-blackand-text-secondary text-sm">Bienvenido de nuevo. Ingresa a tu cuenta.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-blackand-border border border-blackand-accent text-blackand-text-primary rounded-none text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Input de Email */}
          <div className="relative">
            <label className="block text-blackand-text-secondary text-xs uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-blackand"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          {/* Input de Password */}
          <div className="relative">
            <label className="block text-blackand-text-secondary text-xs uppercase tracking-wider mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-blackand"
              placeholder="••••••••••••"
              required
            />
          </div>

          {/* Opciones de Forgot */}
          <div className="flex items-center justify-end">
            <a href="#" className="text-blackand-text-secondary hover:text-white transition-colors text-xs">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón de Login */}
          <button
            type="submit"
            className="w-full btn-primary mt-4"
          >
            INICIAR SESIÓN
          </button>
          
          <p className="text-center text-xs text-blackand-text-secondary mt-6">
            ¿No tienes cuenta? <a href="/register" className="text-white hover:underline">Regístrate</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;