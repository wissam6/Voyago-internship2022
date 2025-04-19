import * as React from 'react';
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import {
  Card,
  CardTitle,
  CardImage,
  CardSubtitle,
  CardActions,
} from '@progress/kendo-react-layout';
import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import '../MinusPlusButton/MinusPlusButton.css';
import { SvgIcon } from "@progress/kendo-react-common";
import {
  minusIcon,
  plusIcon
} from "@progress/kendo-svg-icons";
import { ReactSession } from 'react-client-session';
import { Buffer } from 'buffer';
import './ShoppingListView.css';

ReactSession.setStoreType("localStorage");
const cartInfo = ReactSession.get('cart');


const MyItemRender = (props: any) => {
  //props.setSubtotal(1);
  const [value, setValue] = React.useState(1);
  const [total, setTotal] = React.useState(props.dataItem.ListPrice);

  const image = Buffer.from(props.dataItem.LargePhoto).toString('base64');

  const add = () => {
    setValue(value + 1);
    setTotal(total + props.dataItem.ListPrice);
  }
  const subtract = () => {
    if (value > 1) {
      setValue(value - 1);
      setTotal(total - props.dataItem.ListPrice);
    }
  }
  
  const handleRemove = () => {
    console.log('1',cartInfo[0].ProductID);
    console.log('2',props.dataItem.ProductID);
    let indexValue: number = 0;
    cartInfo.filter((cart: any, index: number) => {
      if (cart.ProductID === props.dataItem.ProductID) {
        indexValue = index;
      }
    })
    cartInfo.splice(indexValue, 1);
    ReactSession.set('cart', cartInfo);
  }

  return (
    <div className='shopview1'>
      <Card
        className='cardStyle'
        orientation="horizontal"
      >
        <CardImage
          src={`data:image/gif;base64,${image}`}
          style={{ width: 160, height: 120, maxWidth: 120 }}
        />
        <div style={{ padding: '0 8px', marginRight: '3rem' }}>
          <h3 className='titleDiv'>{props.dataItem.Name}</h3>
          <Button className='removeButton' onClick={handleRemove}>Remove</Button>
          <h4 className='priceDiv'>{'$' + props.dataItem.ListPrice}</h4>
          <div className='quantityDiv'><div className='minusplus'>
            <ButtonGroup>
              <Button className='buttonStyle' onClick={subtract}>
                <SvgIcon icon={minusIcon} />
              </Button>
              <Button className='buttonStyle'>
                <span className='valueStyle'>{value}</span>
              </Button>
              <Button className='buttonStyle' onClick={add}>
                <SvgIcon icon={plusIcon} />
              </Button>
            </ButtonGroup>
          </div>
          </div>
          <h4 className='totalDiv'>{'$' + total}</h4>
        </div>
      </Card>
    </div>
  );
};

export const ShoppingListView = () => {

  const [cartInfo, setCartInfo] = React.useState([]);
  React.useEffect(() => {
    const items = ReactSession.get('cart');
    if (items) {
      setCartInfo(items);
    }
  }, []);
  //console.log(cartInfo);

  /*const subTotal = (total: number) => {
    console.log(total);
  }*/

  return (
    <div className='shopview2' style={{
      position: 'absolute',
      top: '2.5em'
    }}>
      <ListView className='listView' data={cartInfo} item={MyItemRender} style={{ width: '100%' }} />
    </div>
  );
};


