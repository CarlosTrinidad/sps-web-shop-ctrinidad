import { useEffect, useState } from "react";

import { useSearchParams } from "react-router";

interface UsePaginationResult<T> {
  currentPage: number;
  itemsPerPage: number;
  currentPageItems: T[];
  totalPages: number;
  handlePageChange: (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => void;
  setItemsPerPage: (items: number) => void;
}

function usePagination<T>(
  items: T[],
  initialItemsPerPage: number = 5
): UsePaginationResult<T> {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = searchParams.get("page");

  const [currentPage, setCurrentPage] = useState(Number(initialPage) || 1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = items.slice(startIndex, endIndex);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSearchParams((searchParams) => {
        searchParams.set("page", newPage.toString());
        return searchParams;
      });
    }else{
      setSearchParams((searchParams) => {
        searchParams.delete("page");
        return searchParams;
      });
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setCurrentPage(1);
    }

    return () => {
      mounted = false;
    };
  }, [items.length]);

  return {
    currentPage,
    itemsPerPage,
    currentPageItems,
    totalPages,
    handlePageChange,
    setItemsPerPage,
  };
}

export default usePagination;
