import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';
import {
    Card,
    CardTitle,
    CardImage
} from "@progress/kendo-react-layout";
import { BreadCrumb } from '../../BreadCrumb/BreadCrumb';
import { Link } from "react-router-dom";
import './Bikes.css';

export const Bikes = () => {
    return (
        <div className='bikes'>
            <Header />
            <div className='clothesFrame'>
                <div className='breadCrumb'>
                    <BreadCrumb crumbValue={'Bikes'} />
                </div>
                <div className='titleFrame'>
                    <h1 className='titleStyle'>Bikes</h1>
                </div>
                <div className='displayFrame'>
                    <div className='insideFrame'>

                        <Card className='cardStyle'>
                            <CardTitle className='cardTitleStyle'>Mountain Bikes</CardTitle>
                            <Link to={'/products'} state={{ category: 'Mountain Bikes', subCategory: 'Bikes' }}>
                                <CardImage className='imageStyle' src={require('../../../images/mountainbike.png')}></CardImage>
                            </Link>
                        </Card>


                        <Card className='cardStyle'>
                            <CardTitle className='cardTitleStyle'>Road Bikes</CardTitle>
                            <Link to={'/products'} state={{ category: 'Road Bikes', subCategory: 'Bikes' }}>
                                <CardImage className='imageStyle' src={require('../../../images/roadbike.png')}></CardImage>
                            </Link>
                        </Card>


                        <Card className='cardStyle'>
                            <CardTitle className='cardTitleStyle'>Touring Bikes</CardTitle>
                            <Link to={'/products'} state={{ category: 'Touring Bikes', subCategory: 'Bikes' }}>
                                <CardImage className='imageStyle' src={require('../../../images/touringbike.png')}></CardImage>
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}