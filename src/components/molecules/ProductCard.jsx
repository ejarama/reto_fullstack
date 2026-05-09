import ProductImage from "../atoms/product/ProductImage";
import ProductTitle from "../atoms/product/ProductTitle";
import ProductRate from "../atoms/product/ProductRate";
import ProductPrice from "../atoms/product/ProductPrice";
import { imageMap } from "../../assets/imageMap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const resolvedImage = imageMap[product.image] ?? product.image;

    return (
        <Link to={`/product/${product.id}`} className="flex flex-col bg-transparent group cursor-pointer h-full w-full max-w-[280px]">
            <div className="relative aspect-[3/4] bg-blackand-surface overflow-hidden mb-4 border border-blackand-border group-hover:border-blackand-text-secondary transition-colors duration-300">
               <ProductImage src={resolvedImage} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex flex-col flex-grow">
                <ProductTitle title={product.title} />
                <div className="flex justify-between items-end mt-auto pt-2">
                    <div>
                        <ProductPrice price={product.price} />
                        <ProductRate rate={product.rate} />
                    </div>
                    <button 
                        className="w-10 h-10 flex items-center justify-center border border-blackand-border text-blackand-text-primary hover:bg-blackand-text-primary hover:text-black transition-colors duration-300" 
                        onClick={(e) => { e.preventDefault(); /* Navega sin clickear el link padre o delega */ }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </button>
                </div>
            </div>
        </Link>
    );
}
export default ProductCard;

