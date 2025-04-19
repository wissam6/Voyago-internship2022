import * as React from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { RadioGroup } from "@progress/kendo-react-inputs";
import { SvgIcon } from "@progress/kendo-react-common";
import { Rating, RatingItem } from "@progress/kendo-react-inputs";
import {
    cartIcon,
    heartOutlineIcon
} from "@progress/kendo-svg-icons";
import './SingleProduct.css';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '../ProductCard/ProductCard';
import { Buffer } from 'buffer';
import { ReactSession } from 'react-client-session';
const axios = require('axios');

export const SingleProduct = (props: any) => {

    const [data, setData] = React.useState([]);
    const [description, setDescription]: any = React.useState();
    const [cartItems, setCartItems]: any = React.useState([]);
    const [favoritesItems, setFavoritesItems]: any = React.useState([]);

    const location: any = useLocation();
    const recentlyViewed = ReactSession.get("recentlyViewed")
    ReactSession.setStoreType("localStorage");
    const sizeData = [38, 40, 42, 44, 46, 48, 52];
    const productData = location.state.data;
    const image = Buffer.from(productData.LargePhoto).toString('base64');
    const color = productData.Color;
    const radioData = [
        { label: "Black", value: "Black" },
        { label: "Silver", value: "Silver" },
    ];
    React.useEffect(() => {
        if (recentlyViewed === undefined) {
            let recentsArray: any = [productData];
            ReactSession.set('recentlyViewed', recentsArray);
        }
        else {
            let flag = false;
            recentlyViewed.map((item: any) => {
                if (item.ProductID === productData.ProductID) {
                    flag = true;
                }
            })
            if (!flag) {
                ReactSession.set('recentlyViewed', [...recentlyViewed, productData]);
            }
        }
    }, [productData, recentlyViewed])

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
            let cartArray: any = [productData];
            ReactSession.set('cart', cartArray);
        }
        else {
            ReactSession.set('cart', [...cartItems, productData]);
        }
    }

    const handleFavorites = () => {
        alert('added to favorites');
        if (favoritesItems === undefined) {
            let favoritesArray: any = [productData];
            ReactSession.set('favorites', favoritesArray);
        }
        else {
            ReactSession.set("favorites", [...favoritesItems, productData]);
        }
    }
    //console.log(productData);
    React.useEffect(() => {
        axios.post('/similar', {
            id: productData['productModelID']
        })
            .then(function (response: any) {
                setData(response.data.recordset);
            })
            .catch(function (error: any) {
                //console.log(error);
            });

        axios.post('/description', {
            id: productData.ProductID
        })
            .then(function (response: any) {
                setDescription(response.data.recordset[0]['Description']);
            })
            .catch(function (error: any) {
                //console.log(error);
            });
    }, []);

    return (
        <div className="singleProduct">
            <Header />
            <img className="productImage" src={`data:image/gif;base64,${image}`}></img>
            <h1 className='productCategory'>{productData.modelName}</h1>
            <div className='ratingFrame'>
                <div className='ratingItem'>
                    <Rating
                        value={4}
                        readonly={true}
                    >
                    </Rating>
                </div>
            </div>
            <div className='productName'>
                <span className='label'>Product Name</span>
                <span className='value'>{productData.Name}</span>
            </div>
            <div className='productNo'>
                <span className='label'>Product No</span>
                <span className='value'>{productData.ProductNumber}</span>
            </div>
            <div className='size'>
                <span className='label'>Size</span>
                <div className='sizeDropDown'>
                    <DropDownList defaultValue={productData.Size} data={sizeData} className='baseDropDown' />
                </div>
            </div>
            <div className='weight'>
                <span className='label'>Weight</span>
                <span className='value'>{productData.Weight}</span>
            </div>
            <div className='color'>
                <span className='label'>Color</span>
                <div >
                    <RadioGroup className='radioGroup' data={radioData} defaultValue={color} />
                </div>
            </div>
            <div className='description'>
                <span className='label'>Description</span>
                <p className='descText'>{description}</p>
            </div>
            <div className='actions'>
                <span className='productPrice'>{productData.price}</span>

                <Button className='buttonStyle' onClick={handleCart}>
                    <SvgIcon icon={cartIcon} className='iconStyle' />
                    <span className='buttonText'>Add to Cart</span>
                </Button>

                <Button className='buttonStyle' onClick={handleFavorites}>
                    <SvgIcon icon={heartOutlineIcon} className='iconStyle' />
                    <span className='buttonText'>Add to Favorites</span>
                </Button>
            </div>
            <div className='similarProductsDiv'>
                <h2 className='similarTitle'>Similar Products</h2>
                <div className='similarProducts'>
                    {data.map((mydata: any) => {
                        return (
                            <ProductCard
                                {...mydata}
                                LargePhoto={productData.LargePhoto}
                                modelName={productData.modelName}
                            />
                        )
                    })}
                </div>
            </div>
            <div className='footerPos'>
                <Footer />
            </div>
        </div>
    )
}