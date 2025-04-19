import * as React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardActions,
    CardImage,
    CardSubtitle,
    Avatar,
    CardFooter,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import { ReactSession } from 'react-client-session';
import { Buffer } from 'buffer';
import {
    heartOutlineIcon,
    cartIcon,
    starIcon
} from "@progress/kendo-svg-icons";
import { Routes, Route, useNavigate } from 'react-router-dom';
import './ProductCard.css';

ReactSession.setStoreType("localStorage");

export const ProductCard = (props: any) => {
    //console.log(props);
    const navigate = useNavigate();
    const image = Buffer.from(props.LargePhoto).toString('base64');
    const [cartItems, setCartItems] = React.useState([]);
    const [favoritesItems, setFavoritesItems] = React.useState([]);

    React.useEffect(() => {
        const cart = ReactSession.get('cart');
        const favorites = ReactSession.get('favorites');
        if (cart) {
            setCartItems(cart);
        }
        if (favorites) {
            setFavoritesItems(favorites);
        }
    }, [cartItems, favoritesItems])

    const handleCart = () => {
        alert('added to cart');
        if (cartItems.length === undefined) {
            console.log('case1');
            let cartArray: any = [props];
            ReactSession.set('cart', cartArray);
        }
        else {
            console.log('case2');
            ReactSession.set('cart', [...cartItems, props]);
        }
    }

    const handleFavorites = () => {
        alert('added to favorites');
        if (favoritesItems === undefined) {
            let favoritesArray: any = [props];
            ReactSession.set('favorites', favoritesArray);
        }
        else {
            ReactSession.set("favorites", [...favoritesItems, props]);
        }
    }

    const handleButton = () => {
        navigate('/singleproduct', { state: { data: props } });
    }

    return (
        <div className="productCard">
            <Card className='card'>
                <div className="image">
                    <a href="" style={{ textDecoration: 'none' }} onClick={handleButton}>
                        <CardImage className="imageStyle" src={`data:image/gif;base64,${image}`} />
                    </a>
                </div>
                <CardHeader className="headerStyle">
                    <h3 className="cardTitle">{props.Name}</h3>
                    <div className="rating">
                        <SvgIcon className="rateIcon" icon={starIcon} />
                        <span className="ratingValue"><b>{'4.5'}</b>/5</span>
                    </div>
                </CardHeader>
                <div className="priceDiv">
                    <h2 className="price">{'$' + props.ListPrice}</h2>
                </div>
                <CardActions>
                    <Button className="cartButton" onClick={handleCart}>
                        <SvgIcon className="cart" icon={cartIcon} />
                        <span className="buttonText">Add to cart</span>
                    </Button>
                    <Button className="favButton" onClick={handleFavorites}>
                        <SvgIcon className="favIcon" icon={heartOutlineIcon} />
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}