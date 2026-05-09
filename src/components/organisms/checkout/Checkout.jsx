import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../../store/cartStore";

export default function Checkout() {
  // TODO ESTUDIANTE:
  // Este checkout debe mantenerse simulado en el taller.
  // Solo personaliza estilos, estructura visual y textos.
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
  });

  const total = getTotalPrice();

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-20">
        <div className="bg-blackand-surface border border-blackand-border p-12 text-center">
          <h2 className="text-2xl tracking-wide uppercase text-white mb-2">Compra confirmada</h2>
          <p className="text-blackand-text-secondary text-sm mb-8">
            Este checkout es simulado para el taller. Puedes personalizar este flujo.
          </p>
          <Link
            to="/gallery"
            className="btn-primary inline-flex"
          >
            VOLVER A LA GALERÍA
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-20">
        <div className="bg-blackand-surface border border-blackand-border p-12 text-center">
          <h2 className="text-2xl tracking-wide uppercase text-white mb-2">
            No hay productos para pagar
          </h2>
          <p className="text-blackand-text-secondary text-sm mb-8">Agrega productos al carrito antes de ir al checkout.</p>
          <Link
            to="/gallery"
            className="btn-primary inline-flex"
          >
            IR A PRODUCTOS
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-light tracking-widest text-white mb-8 uppercase">Checkout</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <form
          onSubmit={handleSubmit}
          className="bg-blackand-surface border border-blackand-border p-8 space-y-6"
        >
          <h3 className="text-lg uppercase tracking-widest text-white mb-4 border-b border-blackand-border pb-4">Datos de envío</h3>
          <div>
            <label className="block text-xs uppercase tracking-wider text-blackand-text-secondary mb-2">Nombre completo</label>
            <input
              required
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input-blackand"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-blackand-text-secondary mb-2">Email</label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-blackand"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-blackand-text-secondary mb-2">Dirección</label>
            <input
              required
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-blackand"
            />
          </div>
          <button
            type="submit"
            className="w-full btn-primary mt-6"
          >
            CONFIRMAR COMPRA
          </button>
        </form>

        <aside className="bg-blackand-surface border border-blackand-border p-8 h-fit">
          <h3 className="text-lg uppercase tracking-widest text-white mb-6 border-b border-blackand-border pb-4">Resumen</h3>
          <div className="space-y-4 mb-6">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="text-blackand-text-secondary truncate pr-4">
                  {quantity}x {product.title}
                </span>
                <span className="text-white">
                  ${(Number(product.price) * Number(quantity)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-blackand-border pt-4 flex justify-between text-white text-lg tracking-wide">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
