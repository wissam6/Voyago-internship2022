import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';
import {
    Card,
    CardTitle,
    CardImage
} from "@progress/kendo-react-layout";
import { BreadCrumb } from '../../BreadCrumb/BreadCrumb';
import { Link } from "react-router-dom";
import './Clothes.css';

export const Clothes = () => {
    return (
        <div className='clothes'>
            <Header />
            <div className='clothesFrame'>
                <div className='breadCrumb'>
                    <BreadCrumb crumbValue={'Clothes'} />
                </div>
                <div className='titleFrame'>
                    <h1 className='titleStyle'>Clothes</h1>
                </div>
                <div className='displayFrame'>
                    <div className='insideFrame'>

                        <Card className='cardStyle'>
                            <CardTitle>
                                <h3 className='cardTitleStyle'>Jerseys</h3>
                            </CardTitle>
                            <Link to={'/products'} state={{ category: 'Jerseys', subCategory: 'Clothes' }}>
                                <CardImage className='imageStyle' src={require('../../../images/jersey.png')}></CardImage>
                            </Link>
                        </Card>
                        <Card className='cardStyle'>
                            <CardTitle>
                                <h3 className='cardTitleStyle'>Shorts</h3>
                            </CardTitle>
                            <Link to={'/products'} state={{ category: 'Shorts', subCategory: 'Clothes' }}>
                                <CardImage className='imageStyle' src={require('../../../images/short.png')}></CardImage>
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}