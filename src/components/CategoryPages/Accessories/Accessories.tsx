import {
    Card,
    CardTitle,
    CardImage
} from "@progress/kendo-react-layout";
import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';
import { BreadCrumb } from '../../BreadCrumb/BreadCrumb';
import '../ProductComponents/Components.css';
import { Link } from "react-router-dom";

export const Accessories = () => {
    return (
        <div className='components'>
            <Header />
            <div className='componentsPage'>
                <div className='breadCrumb'>
                    <BreadCrumb crumbValue={'Accessories'}></BreadCrumb>
                </div>
                <div className='allComponents'>
                    <div className='frame11'>
                        <span className='componentsTitle'>Accessories</span>
                    </div>
                    <div className='aboveCards'>
                        <Link to={'/products'} state={{category:'Bottles and Cages', subCategory:'Accessories'}}>
                            <Card className='chainsCard'>
                                <CardTitle className='cardTitle'>Bottles & Cages</CardTitle>
                                <CardImage className='chainsImage' src={require('../../../images/bottle.png')}></CardImage>
                            </Card>
                        </Link>
                        <Link to={'/products'} state={{category:'Lights', subCategory:'Accessories'}}>
                            <Card className='derailleursCard'>
                                <CardTitle className='cardTitle'>Lights</CardTitle>
                                <CardImage className='derailleursImage' src={require('../../../images/lights.png')}></CardImage>
                            </Card>
                        </Link>
                        <Link to={'/products'} state={{category:'Locks', subCategory:'Accessories'}}>
                            <Card className='forksCard'>
                                <CardTitle className='cardTitle'>Locks</CardTitle>
                                <CardImage className='forksImage' src={require('../../../images/locks.png')}></CardImage>
                            </Card>
                        </Link>
                        <Link to={'/products'} state={{category:'Tires and Tubes', subCategory:'Accessories'}}>
                            <Card className='framesCard'>
                                <CardTitle className='cardTitle'>Tires and Tubes</CardTitle>
                                <CardImage className='framesImage' src={require('../../../images/tiresandtubes.png')}></CardImage>
                            </Card>
                        </Link>
                        <Link to={'/products'} state={{category:'Pumps', subCategory:'Accessories'}}>
                            <Card className='barsCard'>
                                <CardTitle className='cardTitle'>Pumps</CardTitle>
                                <CardImage className='barsImage' src={require('../../../images/handlebars.png')}></CardImage>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
            <div style={{
                position: 'absolute',
                top: '55em'
            }}>
                <Footer />
            </div>
            <style>
                {`
                .components .componentsPage {
                    position: relative;
                    width: 1920px;
                    height: auto;
                    background: #FFFFFF;
                }
                `}
            </style>
        </div>
    )
}