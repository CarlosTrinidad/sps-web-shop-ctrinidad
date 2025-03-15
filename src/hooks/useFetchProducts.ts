import { Product, fetchProducts } from "../services/FakeStore/fakeStore";
import { useEffect, useState } from "react";

export interface PriceRanges {
  minPrice: number;
  maxPrice: number;
}

interface FetchProductsState {
  products: Product[];
  categories: string[];
  prices: PriceRanges;
  loading: boolean;
  error: Error | null;
}

function useFetchProducts(): FetchProductsState {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [prices, setPrices] = useState<PriceRanges>({
    minPrice: 0,
    maxPrice: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const productData: Product[] = await fetchProducts();
        setProducts(productData);

        const allCategories: string[] = [];
        const allPrices: number[] = [];
        for (let index = 0; index < productData.length; index++) {
          const product = productData[index];
          allCategories.push(product.category);
          allPrices.push(product.price);
        }

        setCategories([...new Set(allCategories)]);
        setPrices({
          minPrice: Math.min(...allPrices),
          maxPrice: Math.max(...allPrices),
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, loading, error, categories, prices };
}

export default useFetchProducts;
