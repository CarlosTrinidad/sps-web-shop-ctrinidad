import { Product, fetchProduct } from "../services/FakeStore/fakeStore";
import { useEffect, useState } from "react";

interface FetchProductState {
  product: Product | undefined;
  loading: boolean;
  error: Error | null;
}

function useFetchProduct(id: number): FetchProductState {
  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const productData: Product = await fetchProduct(id);
        setProduct(productData);
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
  }, [id]);

  return { product, loading, error };
}

export default useFetchProduct;
