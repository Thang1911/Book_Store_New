import AddToCartButton from "@/components/menu/AddToCartButton";
import Link from "next/link";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, name, description, basePrice, authors, categoty, _id } = item;
  return (
    <div
      className="bg-gray-200 p-4 rounded-lg text-center
      group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
    >
      <Link href={`/product/${_id}`}>
        <div className="text-center">
          <img
            src={image}
            className="max-h-auto max-h-24 block mx-auto"
            alt="book"
          />
        </div>
        <h4 className="font-semibold text-xl my-3">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
        <AddToCartButton onClick={onAddToCart} basePrice={basePrice} />
      </Link>
    </div>
  );
}
