import { BrowserRouter, useLocation } from "react-router-dom";
import "./App.css";
import AuthProvider from "./contexts/AuthContext";
import RoutesComponent from "./components/Routes/Routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SearchProvider } from "./contexts/SearchContext";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SearchProvider>
            <RoutesComponent />
            <ScrollToTop />
          </SearchProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
export default App;
