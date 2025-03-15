import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router";
import Home from "../../pages/Home/Home";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";

// Mocks
vi.mock("../../hooks/useFetchProducts", () => ({
  __esModule: true,
  default: () => ({
    products: [],
    categories: [],
    prices: {
      minPrice: 0,
      maxPrice: 100,
    },
    loading: false,
  }),
}));

vi.mock("../../hooks/useFilter", () => ({
  __esModule: true,
  default: () => [],
}));

vi.mock("../../hooks/usePagination", () => ({
  __esModule: true,
  default: () => ({
    currentPage: 1,
    currentPageItems: [],
    totalPages: 1,
    handlePageChange: vi.fn(),
  }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const scrollToMock = vi.fn();
global.window.scrollTo = scrollToMock;

describe("Home Component (Basic)", () => {
  it("renders the Home component", () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole("main")).toBeInTheDocument(); // Verifica que el componente principal se renderiza
    expect(screen.getByTestId("test-filter-button-id")).toBeInTheDocument(); // Verifica que el botón de filtro se renderiza
  });

  it('renders "no_products" when there are no products', () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("no_products")).toBeInTheDocument(); // Verifica que el mensaje "no_products" se renderiza
  });
});
