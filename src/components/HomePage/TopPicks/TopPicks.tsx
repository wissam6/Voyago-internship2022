import * as React from "react";
import { ScrollView } from "@progress/kendo-react-scrollview";
import {
    Card,
    CardTitle,
    CardImage
} from "@progress/kendo-react-layout";
import { Link } from "react-router-dom";
import './TopPicks.css'

export const TopPicks = () => {
    return (
        <div className="topPicksPage">
            <div className="topPicks">
                <h2 className="topPicksText">Top Picks</h2>
                <ScrollView style={{
                    width: '1440px',
                    height: '320px',
                    background: 'rgba(74, 166, 117, 0)'
                }} endless={true} pageable={false} automaticViewChange={false} className='scrollView'>

                    <div className="cards">
                    
                        <Card>
                            <CardTitle className="cardTitle">
                                Bottles and Cages
                            </CardTitle>
                            <Link to={'/products'} state={{category:'Bottles and Cages'}}>
                            <CardImage className="image" src={require('../../../images/bottle.png')} />
                            </Link>
                        </Card>
                        <Card>
                            <CardTitle className="cardTitle">
                                Chains
                            </CardTitle>
                            <Link to={'/products'} state={{category:'Chains'}}>
                            <CardImage className="image" src={require('../../../images/chains.png')} />
                            </Link>
                        </Card>
                        <Card>
                            <CardTitle className="cardTitle">
                                Pedals
                            </CardTitle>
                            <Link to={'/products'} state={{category:'Pedals'}}>
                            <CardImage className="image" src={require('../../../images/pedals.png')} />
                            </Link>
                        </Card>
                        <Card>
                            <CardTitle className="cardTitle">
                                Tires & Tubes
                            </CardTitle>
                            <Link to={'/products'} state={{category:'Tires and Tubes'}}>
                            <CardImage className="image" src={require('../../../images/tire.png')} />
                            </Link>
                        </Card>
                    </div>
                    <div className="cards">
                        <Card>
                            <CardTitle className="cardTitle">
                                Bottles and Cages
                            </CardTitle>
                            <CardImage className="image" src={require('../../../images/bottle.png')} />
                        </Card>
                        <Card>
                            <CardTitle className="cardTitle">
                                Chains
                            </CardTitle>
                            <CardImage className="image" src={require('../../../images/chains.png')}/>
                        </Card>
                        <Card>
                            <CardTitle className="cardTitle">
                                Pedals
                            </CardTitle>
                            <CardImage className="image" src={require('../../../images/pedals.png')}/>
                        </Card>
                        <Card>
                            <CardTitle className="cardTitle">
                                Tires & Tubes
                            </CardTitle>
                            <CardImage className="image" src={require('../../../images/tire.png')}/>
                        </Card>
                    </div>
                </ScrollView>
            </div>
        </div>
    )
}