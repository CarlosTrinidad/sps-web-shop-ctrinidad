import { Product } from "../services/FakeStore/fakeStore";
import { useSearchParams } from "react-router";

function sortProducts(products: Product[], sortBy: string): Product[] {
  const sortedProducts = [...products]; // Create a copy to avoid mutating the original array

  sortedProducts.sort((a, b) => {
    if (sortBy === "priceAsc") {
      return a.price - b.price;
    } else if (sortBy === "priceDesc") {
      return b.price - a.price;
    }
    return 0; // No sorting if sortBy is not recognized
  });

  return sortedProducts;
}

function useFilter(
  products: Product[],
  initialCategories: string[] = [],
  excludeId?: number
) {
  const [searchParams] = useSearchParams();

  // Get values from URL parameters
  const category =
    initialCategories.length > 0
      ? initialCategories
      : searchParams.getAll("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const rating = searchParams.get("rating");
  const sort = searchParams.get("sortBy");

  const filteredProducts = products.filter((product) => {
    // Filter by id
    if (excludeId && excludeId === product.id) {
      return false;
    }

    // Filter by category
    if (category.length > 0 && !category.includes(product.category)) {
      return false;
    }

    // Filter by minimum price
    if (minPrice && product.price < Number(minPrice)) {
      return false;
    }

    // Filter by maximum price
    if (maxPrice && product.price > Number(maxPrice)) {
      return false;
    }

    // Filter by rating
    const roundRating = Math.round(product.rating.rate);
    const filterRate = Number(rating);

    if (rating && (roundRating < filterRate || roundRating >= filterRate + 1)) {
      return false;
    }

    return true;
  });

  if (sort) {
    return sortProducts(filteredProducts, sort);
  }

  return filteredProducts;
}

export default useFilter;
