import {
    Card,
    CardTitle,
    CardImage
} from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
import {
    homeIcon,
    chevronRightIcon
} from "@progress/kendo-svg-icons";
import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';
import { BreadCrumb } from '../../BreadCrumb/BreadCrumb';
import { Link } from "react-router-dom";
import './Components.css';

export const Components = () => {
    return (
        <div className='components'>
            <Header />
            <div className='componentsPage'>
                <div className='breadCrumb'>
                    <BreadCrumb crumbValue={'Components'} />
                </div>
                <div className='allComponents'>
                    <div className='frame11'>
                        <span className='componentsTitle'>Components</span>
                    </div>
                    <div className='aboveCards'>
                        <Link to={'/products'} state={{ category: 'Chains', subCategory: 'Components' }}>
                            <Card className='chainsCard'>
                                <CardTitle className='cardTitle'>Chains</CardTitle>
                                <CardImage className='chainsImage' src={require('../../../images/chainscomponent.png')} />
                            </Card>
                        </Link>
                        <Link to={'/products'} state={{ category: 'Derailleurs', subCategory: 'Components' }}>
                            <Card className='derailleursCard'>
                                <CardTitle className='cardTitle'>Derailleurs</CardTitle>
                                <CardImage className='derailleursImage' src={require('../../../images/derailleurs.png')} />
                            </Card>
                        </Link>
                        <Link to={'/products'} state={{ category: 'Forks', subCategory: 'Components' }}>
                            <Card className='forksCard'>
                                <CardTitle className='cardTitle'>Forks</CardTitle>
                                <CardImage className='forksImage' src={require('../../../images/forks.png')} />
                            </Card>
                        </Link>
                        <Link to={'/products'} state={{ category: 'Mountain Frames', subCategory: 'Components' }}>
                            <Card className='framesCard'>
                                <CardTitle className='cardTitle'>Mountain Frames</CardTitle>
                                <CardImage className='framesImage' src={require('../../../images/mountainframes.png')} />
                            </Card>
                        </Link>
                        <Link to={'/products'} state={{ category: 'HandleBars', subCategory: 'Components' }}>
                            <Card className='barsCard'>
                                <CardTitle className='cardTitle'>Handlebars</CardTitle>
                                <CardImage className='barsImage' src={require('../../../images/handlebars.png')} />
                            </Card>
                        </Link>
                    </div>
                    <div className='belowCards'>
                        <Card className='pedalCard'>
                            <CardTitle className='cardTitle'>Pedals</CardTitle>
                            <Link to={'/products'} state={{ category: 'Pedals', subCategory: 'Components' }}>
                                <CardImage className='pedalImage' src={require('../../../images/pedals.png')} />
                            </Link>
                        </Card>

                        <Card className='saddleCard'>
                            <CardTitle className='cardTitle'>Saddles</CardTitle>
                            <Link to={'/products'} state={{ category: 'Saddles', subCategory: 'Components' }}>
                                <CardImage className='saddleImage' src={require('../../../images/saddles.png')} />
                            </Link>
                        </Card>

                        <Card className='touringCard'>
                            <CardTitle className='cardTitle'>Touring Frames</CardTitle>
                            <Link to={'/products'} state={{ category: 'TouringFrames', subCategory: 'Components' }}>
                                <CardImage className='touringImage' src={require('../../../images/touringframes.png')} />
                            </Link>
                        </Card>


                        <Card className='wheelsCard'>
                            <CardTitle className='cardTitle'>Wheels</CardTitle>
                            <Link to={'/products'} state={{ category: 'Wheels', subCategory: 'Components' }}>
                                <CardImage className='wheelImage' src={require('../../../images/wheels.png')} />
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
            <div style={{
                position: 'absolute',
                top: '77em'
            }}>
                <Footer />
            </div>
        </div>
    )
}