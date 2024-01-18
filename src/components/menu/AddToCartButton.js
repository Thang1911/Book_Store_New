export default function AddToCartButton({
  onClick, basePrice
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      <span>Add to cart (${basePrice})</span>
    </button>
  );
}