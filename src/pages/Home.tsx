import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-white">Добро пожаловать в Diamond Smoke</h1>
      <p className="text-gray-300 mb-6">Табачная продукция премиум-класса. Только для взрослых.</p>
      <Link to="/catalog" className="bg-yellow-500 px-4 py-2 rounded text-black font-semibold">Каталог товаров</Link>
    </div>
  );
}
