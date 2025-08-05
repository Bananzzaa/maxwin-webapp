import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: { id: number, title: string, price: number } }) {
  return (
    <Link to={`/product/${product.id}`} className="block p-4 bg-gray-800 rounded shadow">
      <h3 className="text-xl text-white">{product.title}</h3>
      <p className="text-yellow-400">{product.price} ₽</p>
    </Link>
  );
}
