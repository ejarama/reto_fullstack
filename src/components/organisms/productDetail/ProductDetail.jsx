import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../../services/productService';
import { imageMap } from '../../../assets/imageMap';
import useCartStore from '../../../store/cartStore';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        getProductById(id).then((data) => {
            setProduct(data);
            setLoading(false);
        });
    }, [id]);

    const handleAddToCart = () => {
        addItem(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const renderStars = (rate) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < Math.round(rate) ? 'text-yellow-400' : 'text-gray-300'}>
                ★
            </span>
        ));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-6">
                <p className="text-xl text-blackand-text-secondary">Producto no encontrado.</p>
                <button
                    onClick={() => navigate('/gallery')}
                    className="btn-secondary"
                >
                    Volver a la galería
                </button>
            </div>
        );
    }

    const resolvedImage = imageMap[product.image] ?? product.image;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Back button */}
            <button
                onClick={() => navigate('/gallery')}
                className="flex items-center gap-2 text-blackand-text-secondary hover:text-white transition-colors mb-10 text-sm tracking-wide"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver a la galería
            </button>

            <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
                {/* Image */}
                <div className="md:w-1/2 relative bg-blackand-surface border border-blackand-border p-6 flex items-center justify-center aspect-[3/4]">
                    <img
                        src={resolvedImage}
                        alt={product.title}
                        className="w-full h-full object-cover shadow-2xl"
                    />
                </div>

                {/* Info */}
                <div className="md:w-1/2 flex flex-col justify-center py-6">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-light text-white tracking-wide mb-4 uppercase">{product.title}</h1>

                        {/* Price & Rating */}
                        <div className="flex flex-col mb-8 gap-2">
                            <p className="text-2xl text-blackand-text-secondary font-light tracking-wider">
                                ${product.price}
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="text-sm">{renderStars(product.rate)}</div>
                                <span className="text-xs text-blackand-text-secondary">({product.rate} / 5)</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-blackand-text-secondary font-light leading-relaxed mb-10 text-sm lg:text-base">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Quantity selector */}
                        <div className="flex items-center gap-6">
                            <span className="text-xs uppercase tracking-wider text-blackand-text-secondary">Cantidad</span>
                            <div className="flex items-center border border-blackand-border">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                >
                                    −
                                </button>
                                <span className="w-12 text-center text-white text-sm">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to cart button */}
                        <button
                            onClick={handleAddToCart}
                            className={`w-full md:w-auto px-12 py-4 border transition-all duration-300 font-semibold tracking-wider text-sm uppercase ${
                                added
                                    ? 'bg-blackand-surface text-white border-blackand-border'
                                    : 'bg-white text-black border-white hover:bg-gray-200'
                            }`}
                        >
                            {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
