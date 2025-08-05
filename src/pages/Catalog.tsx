import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, title: "Табак Darkside Core", price: 750 },
  { id: 2, title: "Уголь Cocobrico 1кг", price: 350 },
  { id: 3, title: "Кальян Alpha Hookah", price: 6500 },
];

export default function Catalog() {
  return (
    <div className="p-4">
      <h2 className="text-2xl text-white mb-4">Каталог</h2>
      <div className="grid gap-4">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
