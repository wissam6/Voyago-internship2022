import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import {
    NumericTextBox,
    NumericTextBoxChangeEvent,
} from "@progress/kendo-react-inputs";
import {
    Card,
    CardTitle,
    CardImage,
    CardSubtitle,
    CardActions,
} from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import '../../ShoppingCartv1/ShoppingListView/ShoppingListView.css';

import articles from './bikes.json';

const MyItemRender = (props: any) => {
    const item = props.dataItem;
    return (
        <div className='shopview1'>
            <Card
                className='cardStyle'
                orientation="horizontal"

            >
                <CardImage
                    src={require('../../../images/mountain100.png')}
                    style={{ width: 160, height: 120, maxWidth: 120 }}
                />

                <div style={{ padding: '0 8px', marginRight: '3rem' }}>
                    <h3 className='titleDiv'>{item.Title}</h3>
                    <Button className='removeButton'>Remove</Button>
                    <h4 className='priceDiv'>{item.Price}</h4>
                    <div className='quantityDiv'>
                        <NumericTextBox
                            className='numericBoxV2'
                            placeholder='0'
                        />
                    </div>
                    <h4 className='totalDiv'>$3,399.99</h4>

                </div>
            </Card>
        </div>
    );
};

export const ShoppingListView2 = () => {
    return (
        <div className='shopview2' style={{
            position: 'absolute',
            top: '2.5em'
        }}>
            <ListView className='listView' data={articles} item={MyItemRender} style={{ width: '100%' }} />
        </div>
    );
};


