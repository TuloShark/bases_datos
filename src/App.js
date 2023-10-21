import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "./ProductsPage";
import ProductDetailsPage from "./ProductDetailsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
