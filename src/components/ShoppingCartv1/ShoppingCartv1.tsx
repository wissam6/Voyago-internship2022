import { Button } from "@progress/kendo-react-buttons";
import { Header } from "../Header/Header";
import { ShoppingListView } from "./ShoppingListView/ShoppingListView";
import { Footer } from "../Footer/Footer";
import { ReactSession } from 'react-client-session';
import { ShoppingCartEmpty } from "../ShoppingCartEmpty/ShoppingCartEmpty";
import { Link } from 'react-router-dom';
import './ShoppingCartv1.css';

export const ShoppingCartv1 = () => {

    ReactSession.setStoreType("localStorage");
    const cartItems = ReactSession.get('cart');
    const page = ReactSession.get('page');

    console.log(cartItems);

    let returnedComp;
    if (cartItems === undefined || cartItems.length<1) {
        returnedComp = <ShoppingCartEmpty />
    }
    else {
        returnedComp = <div className="shopcartv1">
            <Header />
            <h1 className="pageName">Your Cart items</h1>
            <Link to='/products' state={{category:page}} className="continueButton">
                <span className="continueStyle">Continue Shopping</span>
            </Link>
            <div className="productsList">
                <span className="productTitle">Product</span>
                <span className="priceTitle">Price</span>
                <span className="quantityTitle">Quantity</span>
                <span className="totalTitle">Total</span>
            </div>
            <ShoppingListView />
            <h4 className="subTotal">Sub-total</h4>
            <h4 className='subPrice'>$6,749.98</h4>
            <span className="vat">Tax and shipping cost will be calculated later</span>
            <Button className="checkoutButton"><span className="checkoutText">Checkout</span></Button>
            <Footer />
        </div>
    }

    return (
        <div>
            {returnedComp}
        </div>
    )
}