import * as React from "react";
import {
    Card,
    CardTitle,
    CardBody,
    CardImage,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import { ReactSession } from 'react-client-session';
import {
    heartOutlineIcon,
    cartIcon
} from "@progress/kendo-svg-icons";
import { Link } from "react-router-dom";
import { ProductCard } from "../../ProductCard/ProductCard";
import './Categories.css';

export const Categories = () => {
    ReactSession.setStoreType("localStorage");
    const [items, setItems] = React.useState([]);
    const productData = {
        Name: 'Mountain-300 Black, 46',
        ListPrice: '2,294.99'
    }
    const addCart = () => {
        alert('added to cart');
        ReactSession.set('cart', productData);
    }

    const handleFavorites = () => {
        alert('added to favorites');
        ReactSession.set('favorites', productData);
    }

    React.useEffect(() => {
        const items = ReactSession.get('recentlyViewed');
        if (items) {
            setItems(items);
        }
    }, [])

    console.log(items);

    return (
        <div className="categories">
            <div className="categoriesFrame">
                <span className="categoriesTitle">Categories</span>
                <div className="categoriesDiv">
                    <div className='accessoriesCard'>
                        <Link to="/accessories" style={{ textDecoration: 'none' }}>
                            <Card style={{
                                border: 'none'
                            }}>
                                <CardTitle>
                                    Accessories
                                </CardTitle>
                                <CardImage className="accessoriesImage" src={require('../../../images/accessories.png')}
                                />
                            </Card>
                        </Link>
                    </div>
                    <div className='bikesCard'>
                        <Link to="/bikes" style={{ textDecoration: 'none' }}>
                            <Card style={{
                                border: 'none'
                            }}>
                                <CardTitle>
                                    Bikes
                                </CardTitle>
                                <CardImage className="bikesImage" src={require('../../../images/bikes.png')}
                                />
                            </Card>
                        </Link>
                    </div>
                    <div>
                        <Link to="/components" style={{ textDecoration: 'none' }}>
                            <Card style={{
                                border: 'none'
                            }} className='componentsCard'>
                                <CardTitle>
                                    Components
                                </CardTitle>
                                <CardImage className="componentsImage" src={require('../../../images/components.png')}
                                />
                            </Card>
                        </Link>
                    </div>
                    <div className='clothesCard'>
                        <Link to="/clothes" style={{ textDecoration: 'none' }}>
                            <Card style={{
                                border: 'none'
                            }}>
                                <CardTitle>
                                    Clothes
                                </CardTitle>
                                <CardImage className="clothesImage" src={require('../../../images/clothes.png')}
                                />
                            </Card>
                        </Link>
                    </div>
                </div>

                <div className="recentlyViewed">
                    <span className="viewedTitle">Recently Viewed</span>
                    <div className="viewedCards">
                        {items!==undefined && items.length>0 && items.slice(0).reverse().map((item: any, index:number) => {
                            while(index<=3) {
                                return <ProductCard
                                {...item}
                            />
                            }
                        })}
                    </div>
                </div>
            </div>
            <div className="downloads">
                <span className="downloadText">Download Voyago Application</span>
                <Link to=''><img src={require('../../../images/googleplay.png')} width="180" height="52" alt="playstore" /> </Link>
                <Link to=''><img src={require('../../../images/appstore.png')} width="180" height="52" alt="appstore" /></Link>
            </div>
        </div >
    )
}