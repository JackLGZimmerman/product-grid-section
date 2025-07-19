// src/components/ProductCard.tsx
import { memo, useMemo, useEffect, useState, useRef } from "react";
import { useProducts } from "../../../context";

interface Product {
  id: string;
  name: string;
  product_id: string;
  images: { color: string; image_url: string }[];
  colors: string[];
  priceRange: { highest: number; lowest: number };
}

function isProduct(item: any): item is Product {
  return (
    Array.isArray(item.images) &&
    Array.isArray(item.colors) &&
    typeof item.product_id === "string" &&
    typeof item.name === "string" &&
    item.priceRange != null &&
    typeof item.priceRange.lowest === "number" &&
    typeof item.priceRange.highest === "number"
  );
}

export const ProductCard = memo(function ProductCard() {
  const { data, error, loading } = useProducts();

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error.message}</div>;

  const raw = data?.data ?? [];
  console.log(raw)
  const products: Product[] = raw.filter(isProduct);

  if (!products.length) return <div>No products found.</div>;

  return (
    <>
      {products.map((p) => (
        <ProductItem key={p.product_id} product={p} />
      ))}
    </>
  );
});

interface ProductItemProps {
  product: Product;
}

const ProductItem = memo(({ product }: ProductItemProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [colour, setColour] = useState(product.colors[0]);

  const images = product.images.filter((img) => img.color === colour).map((img) => img.image_url);
  const intervalRef = useRef<number | null>(null);

  const startCycling = () => {
    if (images.length <= 1 || intervalRef.current !== null) return;

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % images.length);
    }, 2000);
  };

  const stopCycling = () => {
    if (intervalRef.current === null) return;
    window.clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCurrentIndex(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const { colorNames, displayName, priceMarkup } = useMemo(() => {
    const titleCase = (s: string) => s[0].toUpperCase() + s.slice(1);

    const colorNames = product.colors.map(titleCase).join(", ");
    const displayName = product.name;

    const { highest, lowest } = product.priceRange;
    const priceMarkup =
      highest === lowest ? (
        `$${highest}`
      ) : (
        <>
          <s>${highest}</s> ${lowest}
        </>
      );

    return { colorNames, displayName, priceMarkup };
  }, [product]);

  /* ----------------------- UI ------------------------ */
  return (
    <div className="flex flex-col space-y-2" onMouseEnter={startCycling} onMouseLeave={stopCycling}>
      <img src={images[currentIndex]} alt={displayName} className="w-full aspect-square object-cover rounded-md" loading="lazy" />
      <span className="text-xs">{colorNames}</span>
      <span>{displayName}</span>
      <span className="text-gray-500">{priceMarkup}</span>

      <span className="flex space-x-2 mt-1">
        {product.colors.map((c) => (
          <span
            key={c}
            onClick={() => setColour(c)}
            className="inline-block w-4 h-4 rounded-full border border-gray-300 cursor-pointer"
            style={{ backgroundColor: c }}
            title={c}
          />
        ))}
      </span>
    </div>
  );
});
