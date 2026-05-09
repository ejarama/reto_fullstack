import { Link } from "react-router-dom";
import useCartStore from "../../../store/cartStore";
import { imageMap } from "../../../assets/imageMap";

export default function Cart() {
  // TODO ESTUDIANTE: agregar cupones, envio y resumen con impuestos.
  const items = useCartStore((state) => state.items);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-blackand-surface border border-blackand-border p-12 text-center">
          <h2 className="text-2xl tracking-wide text-white mb-2 uppercase">Tu carrito está vacío</h2>
          <p className="text-blackand-text-secondary mb-8 text-sm">
            Agrega productos desde la galería para iniciar la compra.
          </p>
          <Link
            to="/gallery"
            className="btn-primary inline-flex"
          >
            VER PRODUCTOS
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-light tracking-widest text-white mb-8 uppercase">Tu Carrito</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="bg-blackand-surface border border-blackand-border divide-y divide-blackand-border">
          {items.map(({ product, quantity }) => {
            const resolvedImage = imageMap[product.image] ?? product.image;
            const itemSubtotal = Number(product.price) * Number(quantity);
            return (
              <article key={product.id} className="p-6 flex gap-6 items-center">
                <img
                  src={resolvedImage}
                  alt={product.title}
                  className="w-24 h-24 object-cover border border-blackand-border"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg text-white font-light tracking-wide truncate">{product.title}</h3>
                  <p className="text-sm text-blackand-text-secondary mt-1">${Number(product.price).toFixed(2)}</p>
                </div>
                <div className="flex items-center border border-blackand-border">
                  <button
                    type="button"
                    onClick={() => decrementItem(product.id)}
                    className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm text-white">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => incrementItem(product.id)}
                    className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  className="text-blackand-text-secondary hover:text-white transition-colors ml-4 p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </article>
            );
          })}
        </div>

        <aside className="bg-blackand-surface border border-blackand-border p-8 h-fit">
          <h3 className="text-lg uppercase tracking-widest text-white mb-6 border-b border-blackand-border pb-4">Resumen</h3>
          <div className="flex justify-between text-blackand-text-secondary text-sm mb-4">
            <span>Subtotal ({items.length} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white text-lg tracking-wide mb-8 pt-4 border-t border-blackand-border">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="btn-primary w-full"
          >
            FINALIZAR COMPRA
          </Link>
        </aside>
      </div>
    </section>
  );
}
