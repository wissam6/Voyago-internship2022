import * as React from 'react';
import { ListView, ListViewHeader, ListViewItemProps } from '@progress/kendo-react-listview';
import { Button } from "@progress/kendo-react-buttons";
import { Header } from '../Header/Header';
import {
    Card,
    CardTitle,
    CardImage,
    CardSubtitle,
    CardActions,
} from '@progress/kendo-react-layout';
import { SvgIcon } from "@progress/kendo-react-common";
import { ReactSession } from 'react-client-session';
import {
    starIcon,
    heartOutlineIcon,
    heartIcon
} from "@progress/kendo-svg-icons";
import { Buffer } from 'buffer';
import { Link } from "react-router-dom";
import './ProductListView.css';
const axios = require('axios');

const MyItemRender = (props: ListViewItemProps) => {
    const [description, setDescription]: any = React.useState();
    const [cartItems, setCartItems]: any = React.useState([]);
    const [favoritesItems, setFavoritesItems]: any = React.useState([]);

    const image = Buffer.from(props.dataItem.LargePhoto).toString('base64');
    const item = props.dataItem;
    ReactSession.setStoreType("localStorage");

    React.useEffect(() => {
        axios.post('/description', {
            id: props.dataItem.ProductID
        })
            .then(function (response: any) {
                setDescription(response.data.recordset[0]['Description']);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }, [])

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
        if (cartItems === undefined) {
            let cartArray: any = [item];
            ReactSession.set('cart', cartArray);
        }
        else {
            ReactSession.set('cart', [...cartItems, item]);
        }
    }

    const handleFavorites = () => {
        alert('added to favorites');
        if (favoritesItems === undefined) {
            let favoritesArray: any = [item];
            ReactSession.set('favorites', favoritesArray);
        }
        else {
            ReactSession.set("favorites", [...favoritesItems, item]);
        }
    }

    return (
        <div className='productListView'>
            <div className='productImage'>
                <Link to='/singleproduct' state={{data:item}}>
                <CardImage
                    src={`data:image/gif;base64,${image}`}
                    //className="productImageStyle"
                    style={{
                        width: '272px',
                        height: '272px'
                    }}
                />
                </Link>
            </div>
            <Card
                className='productCard'
                orientation="horizontal"
            >
                <div className='insideCard'>
                    <CardTitle>
                        <h2 className='productTitle'>{item.Name}</h2>
                    </CardTitle>
                    <CardSubtitle className='productRating'>
                        <div>
                            <SvgIcon className='productRatingIcon' icon={starIcon}></SvgIcon>
                            <span className='ratingValue'>4.5</span>
                        </div>
                    </CardSubtitle>
                    <CardSubtitle className='productDescription'>
                        <span className='descStyle'>{description}</span>
                    </CardSubtitle>
                    <div className='productPrice'>
                        <h2 className='priceStyle'>{'$' + item.ListPrice}</h2>
                    </div>
                    <CardActions className='controlButtons'>
                        <Button className='button1' onClick={handleCart}>
                            <SvgIcon icon={heartOutlineIcon} className="heart1"></SvgIcon>
                            <span className='productCart'>Add to cart</span>
                        </Button>
                        <Button className='button2' onClick={handleFavorites}>
                            <SvgIcon icon={heartIcon} className="heart2"></SvgIcon>
                            <span className='productFav'>Added to Favorites</span>
                        </Button>
                    </CardActions>
                </div>
            </Card>
        </div>
    );
};

export const ProductListView = (props: any) => {
    //console.log(props);
    return (
        <div className='listViewContent'>
            <ListView
                className='listViewItem'
                data={props.data}
                item={MyItemRender}
            />
        </div>
    );
};


