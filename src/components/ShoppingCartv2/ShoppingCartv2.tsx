import { Button } from "@progress/kendo-react-buttons";
import { Header } from "../Header/Header";
import { ShoppingListView2 } from "./ShoppingListView2/ShoppingListView2";
import { Footer } from "../Footer/Footer";
import '../ShoppingCartv1/ShoppingCartv1.css';

export const ShoppingCartv2 = () => {
    return (
        <div className="shopcartv1">
            <Header></Header>
            <h1 className="pageName">Your Cart items</h1>
            <Button className="continueButton"><span className="continueStyle">Continue Shopping</span></Button>
            <div className="productsList">
                <span className="productTitle">Product</span>
                <span className="priceTitle">Price</span>
                <span className="quantityTitle">Quantity</span>
                <span className="totalTitle">Total</span>
            </div>
            <ShoppingListView2 />
            <h4 className="subTotal">Sub-total</h4>
            <h4 className='subPrice'>$6,749.98</h4>
            <span className="vat">Tax and shipping cost will be calculated later</span>
            <Button className="checkoutButton">Checkout</Button>
            <Footer />
        </div>
    )
}