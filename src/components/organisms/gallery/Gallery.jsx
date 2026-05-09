import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../molecules/ProductCard";
import { getProducts } from "../../../services/productService";

const ITEMS_PER_PAGE = 4;
// TODO ESTUDIANTE: ajusta items por pagina y mejora UX de filtros/categorias.

export default function Gallery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filteredProducts = useMemo(() => {
    // TODO ESTUDIANTE: extender busqueda por categoria y precio.
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return products;

    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized)
      );
    });
  }, [products, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <section className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 border-b border-blackand-border pb-4">
        <div>
          <h2 className="text-3xl font-light tracking-wide text-white">Nuestros Productos</h2>
          <p className="text-sm text-blackand-text-secondary mt-1">
            {filteredProducts.length} resultado(s)
          </p>
        </div>
        <div className="w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar por nombre o descripción..."
            className="input-blackand"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-blackand-surface border border-blackand-border rounded-xl p-8 text-center text-blackand-text-secondary">
          No se encontraron productos para esa búsqueda.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border border-blackand-border text-white text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 rounded-md text-sm font-medium border transition-colors duration-300 ${
                    page === currentPage
                      ? "border-white bg-white text-black"
                      : "border-blackand-border text-white hover:bg-white/10"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border border-blackand-border text-white text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </section>
  );
}
