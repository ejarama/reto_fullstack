import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useUserStore from "../../../store/userStore";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cellphone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const registerFullUser = useUserStore((state) => state.registerFullUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validar contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const respuesta = await registerFullUser(formData);

    if (respuesta.success) {
      navigate('/login');
    } else {
      setError(respuesta.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blackand-bg p-4">
      <div className="w-full max-w-4xl bg-blackand-surface border border-blackand-border transition-all">
        <div className="p-8 md:p-12">

          <header className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-widest uppercase text-blackand-text-primary mb-2">BlackAnd</h1>
            <h2 className="text-xl font-light text-blackand-text-primary">Crear cuenta</h2>
            <p className="text-blackand-text-secondary text-xs mt-1">Únete a BlackAnd Store</p>
          </header>

          {error && (
            <div className="mb-6 p-3 bg-blackand-border border border-blackand-accent text-blackand-text-primary text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

              {/* Columna Izquierda */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-blackand-text-secondary mb-2">Nombre completo</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="input-blackand"
                    placeholder="Tu nombre"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-blackand-text-secondary mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="input-blackand"
                    placeholder="correo@ejemplo.com"
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-blackand-text-secondary mb-2">Celular</label>
                    <input
                      type="tel"
                      name="cellphone"
                      className="input-blackand"
                      placeholder="+57 300..."
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-blackand-text-secondary mb-2">Dirección</label>
                    <input
                      type="text"
                      name="address"
                      className="input-blackand"
                      placeholder="Calle 123..."
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Columna Derecha */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-blackand-text-secondary mb-2">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="input-blackand"
                    placeholder="••••••••"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-blackand-text-secondary mb-2">Confirmar contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    className="input-blackand"
                    placeholder="••••••••"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Acción */}
            <div className="pt-6 space-y-4">
              <button
                type="submit"
                className="w-full btn-primary"
              >
                CREAR CUENTA
              </button>

              <p className="text-center text-xs text-blackand-text-secondary">
                ¿Ya tienes una cuenta? <Link to="/login" className="text-white hover:underline">Inicia sesión</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;