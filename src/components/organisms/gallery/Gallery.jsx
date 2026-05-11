import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../molecules/ProductCard";
import { getProducts, getCategories } from "../../../services/productService";

const ITEMS_PER_PAGE = 4;

export default function Gallery() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(([productsData, categoriesData]) => {
      setProducts(productsData);
      
      // Si la API falla al traer categorías, derivarlas del catálogo base (fallback)
      const validCategories = categoriesData && categoriesData.length > 0 
        ? categoriesData 
        : [...new Set(productsData.map(p => p.category))];
        
      setCategories(["All", ...validCategories]);
      setLoading(false);
    });
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch = normalizedSearch
        ? product.title.toLowerCase().includes(normalizedSearch) || product.description.toLowerCase().includes(normalizedSearch)
        : true;
      
      const matchesCategory = selectedCategory !== "All"
        ? product.category === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "All";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col mb-10 border-b border-blackand-border pb-8 gap-6">
        <div>
          <h2 className="text-3xl font-light tracking-wide uppercase text-white">Nuestros Productos</h2>
          <p className="text-sm text-blackand-text-secondary mt-1">
            {filteredProducts.length} resultado(s)
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por nombre o descripción..."
              className="input-blackand w-full"
            />
          </div>
          
          <div className="md:w-64">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="input-blackand w-full cursor-pointer appearance-none bg-blackand-surface"
              style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"292.4\" height=\"292.4\"><path fill=\"%23D1D1D1\" d=\"M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-12.9 5.4A17.6 17.6 0 0 0 0 82.2c0 5 1.8 9.3 5.4 12.9l128 127.9c3.6 3.6 7.8 5.4 12.8 5.4s9.2-1.8 12.8-5.4L287 95c3.5-3.5 5.4-7.8 5.4-12.8 0-5-1.9-9.2-5.4-12.8z\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem top 50%", backgroundSize: "0.65rem auto" }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-blackand-surface text-blackand-text-primary">
                  {cat === "All" ? "Todas las categorías" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="btn-secondary whitespace-nowrap h-[46px] md:h-auto"
            >
              LIMPIAR FILTROS
            </button>
          )}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-blackand-surface border border-blackand-border p-12 text-center flex flex-col items-center justify-center my-10">
          <svg className="w-16 h-16 text-blackand-text-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
          <h3 className="text-xl tracking-wide text-white uppercase mb-2">No se encontraron productos</h3>
          <p className="text-blackand-text-secondary text-sm mb-6">
            Intenta usar términos de búsqueda diferentes o cambiar la categoría seleccionada.
          </p>
          <button
            onClick={handleClearFilters}
            className="btn-primary"
          >
            LIMPIAR FILTROS
          </button>
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
