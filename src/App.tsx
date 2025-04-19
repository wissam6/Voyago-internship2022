import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { HomePage } from "./components/HomePage/HomePage";
import { Favorites } from "./components/Favorites/Favorites";
import { Contacts } from "./components/Contacts/Contacts";
import { ShoppingCartv1 } from "./components/ShoppingCartv1/ShoppingCartv1";
import { ShoppingCartEmpty } from "./components/ShoppingCartEmpty/ShoppingCartEmpty";
import { Components } from './components/CategoryPages/ProductComponents/Components'
import { Accessories } from "./components/CategoryPages/Accessories/Accessories";
import { Clothes } from "./components/CategoryPages/Clothes/Clothes";
import { Bikes } from "./components/CategoryPages/Bikes/Bikes";
import { ShoppingCartv2 } from "./components/ShoppingCartv2/ShoppingCartv2";
import { ProductsDisplay } from "./components/ProductsDisplay/ProductsDisplay";
import { SingleProduct } from "./components/SingleProduct/SingleProduct";
import { ProductListView } from "./components/ProductListView/ProductListView";
import { AllResults } from "./components/AllResults/AllResults";
import { ReportViewer } from "./components/ReportViewer/ReportViewer";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/cart" element={<ShoppingCartv1 />} />
        <Route path="/shopcartv2" element={<ShoppingCartv2 />} />
        <Route path="/shopcartempty" element={<ShoppingCartEmpty />} />
        <Route path="/components" element={<Components />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/products" element={<ProductsDisplay />} />
        <Route path="/all" element={<AllResults />} />
        <Route path="/singleproduct" element={<SingleProduct />} />
        <Route path="/report" element={<ReportViewer />} />
      </Routes>
    </Router>
  );
}