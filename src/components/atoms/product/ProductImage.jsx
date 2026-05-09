function ProductImage({ src, alt, className }) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className || "w-full h-[150px] object-cover"} 
    />
  );
}
export default ProductImage;