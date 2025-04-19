import * as React from 'react';
import { ListView } from '@progress/kendo-react-listview';
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
import {
  starIcon,
  heartOutlineIcon,
  heartIcon
} from "@progress/kendo-svg-icons";
import { ReactSession } from 'react-client-session';
import { useNavigate, Link } from 'react-router-dom';
import { Buffer } from 'buffer';
import './Favorites.css'
const axios = require('axios');

ReactSession.setStoreType("localStorage");
const favoriteProps = ReactSession.get('favorites');

const MyItemRender = (props: any) => {
  const [description, setDescription]: any = React.useState();
  const cartItems: any = ReactSession.get("cart");
  const image = Buffer.from(props.dataItem.LargePhoto).toString('base64');

  const handleCart = () => {
    alert('added to cart');
    if (cartItems === undefined) {
      let cartArray: any = [props.dataItem];
      ReactSession.set('cart', cartArray);
    }
    else {
      ReactSession.set('cart', [...cartItems, props.dataItem]);
    }
  }

  const handleFavorites = () => {
    alert('already added to favs');
  }

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

  return (
    <div className='favorites'>
      <Card
        orientation="horizontal"
      >
        <CardImage
          src={`data:image/gif;base64,${image}`}
          style={{
            width: 272,
            height: 272,
            maxWidth: 272,
            padding: 30
          }}
        />
        <div className='insideCard'>
          <div className='cardBody'>
            <CardTitle>
              <h2 className='cardTitleStyle'>{props.dataItem.Name}</h2>
            </CardTitle>
            <CardSubtitle className='rating'>
              <div>
                <SvgIcon className='iconStyle' icon={starIcon} />
                <span className='ratingValue'>{4.5}</span>
              </div>
            </CardSubtitle>
            <CardSubtitle className='subTitle'>{description}</CardSubtitle>
            <div className='priceDiv'>
              <h2 className='priceStyle'>{'$' + props.dataItem.ListPrice}</h2>
            </div>
            <CardActions className='buttons'>
              <div className="cartButton">
                <Button className='cartButtonStyle' onClick={handleCart}>
                  <SvgIcon icon={heartOutlineIcon} className="outlineIcon" />
                  <span className='addToCart'>Add to cart</span>
                </Button>
              </div>
              <div className="favoriteButton">
                <Button className='favoriteButtonStyle' onClick={handleFavorites}>
                  <SvgIcon icon={heartIcon} className="heartIcon" />
                  <span className='addtoFav'>Added to Favorites</span>
                </Button>
              </div>
            </CardActions>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const Favorites = () => {

  const category = ReactSession.get('page');
  const [favorites,setFavorites] = React.useState([]);
  React.useEffect(() => {
    const items = ReactSession.get('favorites');
    if (items) {
      setFavorites(items);
    }
  }, []);

  return (
    <div className='fav'>
      <Header />
      <h1 className='pageTitle'>Favorites</h1>
      <div className='shopButtonDiv'>
        <Link to={'/products'} state={{category:category}} className='shopButton'><span className='shopText'>Continue Shopping</span></Link>
      </div>
      <ListView
        className='listStyle'
        data={favorites}
        item={MyItemRender}
      />
    </div>
  );
};