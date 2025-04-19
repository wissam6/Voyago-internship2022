import * as React from 'react';
import { Header } from "../Header/Header";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { ProductCard } from "../ProductCard/ProductCard";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { SvgIcon } from "@progress/kendo-react-common";
import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Checkbox, Rating } from "@progress/kendo-react-inputs";
//import { ProductListView } from "../ProductListView/ProductListView";
import { BreadCrumb } from "../BreadCrumb/BreadCrumb";
import { Footer } from "../Footer/Footer";
import { useLocation } from 'react-router-dom';
import {
    Card,
    CardHeader,
} from "@progress/kendo-react-layout";
import { RangeSlider, SliderLabel } from "@progress/kendo-react-inputs";
import {
    listUnorderedSquareIcon,
    groupIcon,
    xIcon
} from "@progress/kendo-svg-icons";
import { Link } from "react-router-dom";
import './AllResults.css';
import { ProductListView } from '../ProductListView/ProductListView';

const axios = require('axios');

export const AllResults = () => {
    const location: any = useLocation();

    const [rowsValue, setRows]: any = React.useState([{ height: 500 }]);
    const [colsValue, setCols]: any = React.useState([{ width: 360 }, { width: 360 }, { width: 360 }]);
    const [data, setData]: any = React.useState([]);
    const [filteredData, setFilteredData]: any = React.useState([]);
    const [isAll, setAll] = React.useState(true);
    const [isDisc, setDisc] = React.useState(false);
    const [chosenRatings, setRating] = React.useState([]);
    const [priceStart, setPriceStart]: any = React.useState(0);
    const [priceEnd, setPriceEnd]: any = React.useState(2000);
    const [weightStart, setWeightStart]: any = React.useState(20);
    const [weightEnd, setWeightEnd]: any = React.useState(50);
    const [tileViewColor, setTileViewColor] = React.useState('');
    const [listViewColor, setListViewColor] = React.useState('');
    const minPrice = 0;
    const maxPrice = 100;
    const minWeight = 20;
    const maxWeight = 50;
    const [view, setView] = React.useState('firstview');

    const searchedResult = location.state.data;
    const sortOptions = ['Price-Low to High', 'Price-High to Low', 'Name-A to Z', 'Name-Z to A'];
    const checkboxCount = 5;

    const handleDiscounted = () => {
        if (isAll) {
            setAll(false);
            setDisc(true);
        }
        else {
            setAll(true);
            setDisc(false);
        }
    }

    const handleRating = (event: any) => {
        if (event.value) {
            const result: any = [
                ...chosenRatings,
                event.target.name,
            ]
            setRating(result);
        }
        else {
            chosenRatings.forEach((rating: any, index: number) => {
                if (rating === event.target.name) {
                    chosenRatings.splice(index, 1);
                }
            })
        }
        handleRatingChange();
    }

    React.useEffect(() => {
        handleRatingChange();
    }, [chosenRatings])

    const handleRatingChange = React.useCallback(() => {
        setFilteredData(data);
        chosenRatings.forEach((rating: string) => {
            if (rating !== '4') {
                setFilteredData([]);
            }
        })
    }, [chosenRatings])

    const handlePrice = (event: any) => {
        const priceStartValue: any = 20 * event.value.start;
        const priceEndValue: any = 20 * event.value.end;
        setPriceStart(priceStartValue);
        setPriceEnd(priceEndValue);
        handleAllFilters();
    }

    const handleSortChange = (event: any) => {
        
    }

    const handleWeight = (event: any) => {
        setWeightStart(event.value.start);
        setWeightEnd(event.value.end);
        handleAllFilters();
    }

    const handleView = (event: any) => {
        if (event === 'firstview') {
            setListViewColor('');
            setTileViewColor('#4AA675');
            setRows([{ height: 500 }]);
            setCols([{ width: 360 }, { width: 360 }, { width: 360 }]);
            setView('firstview');
        }
        else {
            setListViewColor('#4AA675');
            setTileViewColor('');
            setRows([{ height: 450 }]);
            setCols([{ width: 360 }]);
            setView('secondview');
        }
    }

    React.useEffect(() => {
        axios.post('/viewAllProducts', {
        })
            .then(function (response: any) {
                setData(response.data.recordset);
                setFilteredData(response.data.recordset);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }, []);

    React.useEffect(() => {
        handleAllFilters();
    }, [priceStart, priceEnd, weightEnd, weightStart])

    const handleAllFilters = React.useCallback(() => {
        const newData: any = [];
        //price
        /*data.map((mydata: any) => {
            if (mydata.ListPrice >= priceStart && mydata.ListPrice <= priceEnd) {
                newData.push(mydata);
            }
        })
        //weight
        data.map((mydata: any) => {
            if (mydata.Weight >= weightStart && mydata.Weight <= weightEnd) {
                newData.push(mydata);
            }
        })*/
        setTheData(newData);
    }, [priceStart, priceEnd, data, weightEnd, weightStart])

    const setTheData = React.useCallback((newData: string) => {
        setFilteredData(newData);
    }, [filteredData])

    const clearAll = () => {
        window.location.reload();
    }

    return (
        <div className="allProds">
            <Header />
            <div className="breadCrumb">
                <BreadCrumb crumbValue={'Bikes'} crumbValue2={'Mountain Bikes'} />
            </div>
            <div className="content">
                <div className="contentHeader">
                    <h1 className='allResTitle'>{data.length} results for {searchedResult}</h1>
                    <div className="sort">
                        <div className="config">
                            <div className="dropdown">
                                <DropDownList defaultValue='Sort By' className="dropdownButton" data={sortOptions} onChange={handleSortChange} />
                            </div>
                        </div>
                        <div className="views">
                            <ButtonGroup>
                                <Button className="firstview" onClick={() => handleView('firstview')}>
                                    <SvgIcon icon={groupIcon} color={tileViewColor}></SvgIcon>
                                </Button>
                                <Button className="secondview" onClick={() => handleView('secondview')}>
                                    <SvgIcon icon={listUnorderedSquareIcon} color={listViewColor}></SvgIcon>
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
                <div className='allProdsContent'>

                    <span className='mountainTitle'>{'Mountain Bikes (22)'}</span>
                    <GridLayout
                        rows={rowsValue}
                        cols={colsValue}
                    >
                        <div className='mountainBikesRow'>
                            {view === 'firstview' ?
                                data.map((item: any, index: number) => {
                                    return item.productSubcategoryID === 1 && item.Name.toLowerCase().includes(searchedResult) && <GridLayoutItem key={index}>
                                        <ProductCard key={item.ProductID}
                                            {...item}
                                        ></ProductCard>
                                    </GridLayoutItem>
                                })
                                : view === 'secondview' ?
                                    <p>hi</p>

                                    : <p> hi </p>
                            }
                            <Button className='mountainButton'>
                                <span className='mountainLabelStyle'>
                                    Show all results from <b>Mountain Bikes</b> subcategory
                                </span>
                            </Button>
                        </div>
                    </GridLayout>

                    <div className='framesHeader'>
                        <span className='framesTitle'>{'Mountain Frames (10)'}</span>
                    </div>
                    <GridLayout
                        rows={rowsValue}
                        cols={colsValue}
                    >
                        <div className='mountainFramesRow'>
                            {view === 'firstview' ?
                                data.map((item: any, index: number) => {
                                    return item.productSubcategoryID === 12 && item.Name.toLowerCase().includes(searchedResult) && <GridLayoutItem key={index}>
                                        <ProductCard key={item.ProductID}

                                            {...item}
                                        ></ProductCard>
                                    </GridLayoutItem>
                                })
                                : view === 'secondview' ?
                                    data.map((item: any, index: number) => {
                                        return item.productSubcategoryID === 12 && item.Name.toLowerCase().includes(searchedResult) && <GridLayoutItem key={index}>
                                            <ProductListView key={item.ProductID}
                                                data={data.slice(0, 1)}
                                            ></ProductListView>
                                        </GridLayoutItem>
                                    })

                                    : <p> hi </p>
                            }
                            <Button className='framesButton'>
                                <span className='mountainLabelStyle'>Show all results from <b>Mountain Frames</b> subcategory</span>
                            </Button>
                        </div>
                    </GridLayout>
                    <div className='framesHeader'>
                        <span className='framesTitle'>{'Wheels (9)'}</span>
                    </div>
                    <GridLayout
                        rows={rowsValue}
                        cols={colsValue}
                    >
                        <div className='wheelsRow'>
                            {view === 'firstview' ?
                                data.map((item: any, index: number) => {
                                    return item.productSubcategoryID === 17 && item.Name.toLowerCase().includes(searchedResult) && <GridLayoutItem key={index}>
                                        <ProductCard key={item.ProductID}

                                            {...item}
                                        ></ProductCard>
                                    </GridLayoutItem>
                                })
                                : view === 'secondview' ?
                                    <p>hi</p>

                                    : <p> hi </p>
                            }
                            <Button className='wheelsButton'>
                                <span className='mountainLabelStyle'>Show all results from <b>Wheels</b> subcategory</span>
                            </Button>
                        </div>
                    </GridLayout>
                    <div className='framesHeader'>
                        <span className='framesTitle'>{'Pedals (6)'}</span>
                    </div>
                    <GridLayout
                        rows={rowsValue}
                        cols={colsValue}
                    >
                        <div className='pedalsRow'>
                            {view === 'firstview' ?
                                data.map((item: any, index: number) => {
                                    return item.productSubcategoryID === 13 && item.Name.toLowerCase().includes(searchedResult) && <GridLayoutItem key={index}>
                                        <ProductCard key={item.ProductID}

                                            {...item}
                                        ></ProductCard>
                                    </GridLayoutItem>
                                })
                                : view === 'secondview' ?
                                    <p>hi</p>

                                    : <p> hi </p>
                            }
                            <Button className='pedalsButton'>
                                <span className='mountainLabelStyle'>Show all results from <b>Mountain Frames</b> subcategory</span>
                            </Button>
                        </div>
                    </GridLayout>
                    <div className='framesHeader'>
                        <span className='framesTitle'>{'Clothes (1)'}</span>
                    </div>
                    <GridLayout
                        rows={rowsValue}
                        cols={colsValue}
                    >
                        <div className='pedalsRow'>
                            {view === 'firstview' ?
                                data.map((item: any, index: number) => {
                                    return item.productSubcategoryID === 22 && item.Name.toLowerCase().includes(searchedResult) && <GridLayoutItem key={index}>
                                        <ProductCard key={item.ProductID}

                                            {...item}
                                        ></ProductCard>
                                    </GridLayoutItem>
                                })
                                : view === 'secondview' ?
                                    <p>hi</p>

                                    : <p> hi </p>
                            }
                            <Button className='pedalsButton'>
                                <span className='mountainLabelStyle'>Show all results from <b>Mountain Frames</b> subcategory</span>
                            </Button>
                        </div>
                    </GridLayout>
                    <div className='framesHeader'>
                        <span className='framesTitle'>{'Pumps (1)'}</span>
                    </div>
                    <GridLayout
                        rows={rowsValue}
                        cols={colsValue}
                    >
                        <div className='pedalsRow'>
                            {view === 'firstview' ?
                                data.map((item: any, index: number) => {
                                    return item.productSubcategoryID === 36 && item.Name.toLowerCase().includes(searchedResult) && <GridLayoutItem key={index}>
                                        <ProductCard key={item.ProductID}

                                            {...item}
                                        ></ProductCard>
                                    </GridLayoutItem>
                                })
                                : view === 'secondview' ?
                                    <p>hi</p>

                                    : <p> hi </p>
                            }
                            <Button className='pumpsButton'>
                                <span className='mountainLabelStyle'>Show all results from <b>Mountain Frames</b> subcategory</span>
                            </Button>
                        </div>
                    </GridLayout>
                    <div className='framesHeader'>
                        <span className='framesTitle'>{'Tires (1)'}</span>
                    </div>
                    <GridLayout
                        rows={rowsValue}
                        cols={colsValue}
                    >
                        <div className='pedalsRow'>
                            {view === 'firstview' ?
                                data.map((item: any, index: number) => {
                                    return item.productSubcategoryID === 17 && item.Name.toLowerCase().includes(searchedResult) && <GridLayoutItem key={index}>
                                        <ProductCard key={item.ProductID}

                                            {...item}
                                        ></ProductCard>
                                    </GridLayoutItem>
                                })
                                : view === 'secondview' ?
                                    <p>hi</p>

                                    : <p> hi </p>
                            }
                            <Button className='tiresButton'>
                                <span className='mountainLabelStyle'>Show all results from <b>Mountain Frames</b> subcategory</span>
                            </Button>
                        </div>
                    </GridLayout>
                    <div className='framesHeader'>
                        <span className='framesTitle'>{'Handlebars (1)'}</span>
                    </div>
                    <GridLayout
                        rows={rowsValue}
                        cols={colsValue}
                    >
                        <div className='pedalsRow'>
                            {view === 'firstview' ?
                                data.map((item: any, index: number) => {
                                    return item.productSubcategoryID === 4 && item.Name.toLowerCase().includes(searchedResult) && <GridLayoutItem key={index}>
                                        <ProductCard key={item.ProductID}

                                            {...item}
                                        ></ProductCard>
                                    </GridLayoutItem>
                                })
                                : view === 'secondview' ?
                                    <p>hi</p>

                                    : <p> hi </p>
                            }
                            <Button className='handleBarsButton'>
                                <span className='mountainLabelStyle'>Show all results from <b>Mountain Frames</b> subcategory</span>
                            </Button>
                        </div>
                    </GridLayout>
                    <div className='framesHeader'>
                        <span className='framesTitle'>{'Saddles (1)'}</span>
                    </div>
                    <GridLayout
                        rows={rowsValue}
                        cols={colsValue}
                    >
                        <div className='pedalsRow'>
                            {view === 'firstview' ?
                                data.map((item: any, index: number) => {
                                    return item.productSubcategoryID === 15 && item.Name.toLowerCase().includes(searchedResult) && <GridLayoutItem key={index}>
                                        <ProductCard key={item.ProductID}

                                            {...item}
                                        ></ProductCard>
                                    </GridLayoutItem>
                                })
                                : view === 'secondview' ?
                                    <p>hi</p>

                                    : <p> hi </p>
                            }
                            <Button className='saddlesButton'>
                                <span className='mountainLabelStyle'>Show all results from <b>Mountain Frames</b> subcategory</span>
                            </Button>
                        </div>
                    </GridLayout>
                </div>
            </div>
            <div className="filters">
                <h4 className="categsTitle">Categories</h4>
                <div className='allCategs'>
                    <div className='categsDiv'>
                        <Card className='categsCard'>
                            <Link to='/products' state={{category:'Mountain Bikes'}} className='categoriesLinks'>
                                <CardHeader className='header1'><span className='categsStyle'>Mountain Bikes</span></CardHeader>
                            </Link>
                            <Link to='/products' state={{category:'Mountain Frames'}} className='categoriesLinks'>
                                <CardHeader className='header2'><span className='categsStyle'>Mountain Frames</span></CardHeader>
                            </Link>
                            <Link to='/products' state={{category:'Wheels'}} className='categoriesLinks'>
                                <CardHeader className='header3'><span className='categsStyle'>Wheels</span></CardHeader>
                            </Link>
                            <Link to='/products' state={{category:'Pedals'}} className='categoriesLinks'>
                                <CardHeader className='header4'><span className='categsStyle'>Pedals</span></CardHeader>
                            </Link>
                            <Link to='/products' state={{category:'Clothes'}} className='categoriesLinks'>
                                <CardHeader className='header5'><span className='categsStyle'>Clothes</span></CardHeader>
                            </Link>
                            <Link to='/products' state={{category:'Pumps'}} className='categoriesLinks'>
                                <CardHeader className='header6'><span className='categsStyle'>Pumps</span></CardHeader>
                            </Link>
                            <Link to='/products' state={{category:'Handlebars'}} className='categoriesLinks'>
                                <CardHeader className='header7'><span className='categsStyle'>Handlebars</span></CardHeader>
                            </Link>
                            <Link to='/products' state={{category:'Saddles'}} className='categoriesLinks'>
                                <CardHeader className='header8'><span className='categsStyle'>Saddles</span></CardHeader>
                            </Link>
                        </Card>
                    </div>
                </div>
                <h4 className="filterTitle">Filters</h4>
                <div className="allFilters">
                    <div className="clear">
                        <Card className='clearCard'>
                            <div className="contentClear">
                                <CardHeader className="clearHeader">
                                    <span className="clearText">Clear All</span>
                                </CardHeader>
                                <Button className="clearButton" style={{zIndex:1}} onClick={clearAll}>
                                    <SvgIcon width='16px' height='16px' icon={xIcon} />
                                </Button>
                            </div>
                        </Card>
                    </div>
                    <div className="discounted">
                        <Card className="discCard">
                            <CardHeader className="discHeader">
                                <span className="showStyle">Show</span>
                            </CardHeader>
                            <Checkbox className="allCheck" checked={isAll} onClick={handleDiscounted}>
                                <span className="checkText">All</span>
                            </Checkbox>
                            <Checkbox className="discCheck" checked={isDisc} onClick={handleDiscounted}>
                                <span className="checkText">Discounted items only</span>
                            </Checkbox>
                        </Card>
                    </div>
                    <div className="ratingDiv">
                        <Card className="ratingCard">
                            <CardHeader className="ratingHeader">Rating</CardHeader>
                            <div className="ratingContent">
                                {
                                    [...Array(checkboxCount)].map((elementInArray, index) => (
                                        <div className="ratingInside">
                                            <Checkbox name={'' + (5 - index)} onChange={handleRating}></Checkbox>
                                            <Rating value={5 - index} readonly={true}></Rating>
                                        </div>
                                    )
                                    )
                                }
                            </div>
                        </Card>
                    </div>
                    <div className="priceFilter">
                        <div style={{ gap: '10px', padding: '16px' }}>
                            <CardHeader className="priceHeader">
                                <span className="priceTitle">Price</span>
                            </CardHeader>
                            <Card className='priceCard'>
                                <RangeSlider
                                    defaultValue={{
                                        start: minPrice,
                                        end: maxPrice,
                                    }}
                                    step={1}
                                    min={0}
                                    max={100}
                                    onChange={handlePrice}
                                >
                                    <SliderLabel position={0}>0$</SliderLabel>
                                    <SliderLabel position={25}>$500</SliderLabel>
                                    <SliderLabel position={50}>$1000</SliderLabel>
                                    <SliderLabel position={75}>$1500</SliderLabel>
                                    <SliderLabel position={100}>$2000</SliderLabel>
                                </RangeSlider>
                            </Card>
                            <div className="priceInputs">
                                <Input className="inputRangeStyle" value={priceStart} />
                                -
                                <Input className="inputRangeStyle" value={priceEnd} />
                            </div>
                        </div>
                    </div>
                    <div className="weight">
                        <div style={{ gap: '10px', padding: '16px' }}>
                            <CardHeader className="weightHeader">
                                <span className="weightTitle">Weight</span>
                            </CardHeader>
                            <Card className='weightCard'>
                                <RangeSlider
                                    defaultValue={{
                                        start: minWeight,
                                        end: maxWeight,
                                    }}
                                    step={1}
                                    min={20}
                                    max={50}
                                    onChange={handleWeight}
                                >
                                    <SliderLabel position={20}>20</SliderLabel>
                                    <SliderLabel position={30}>30</SliderLabel>
                                    <SliderLabel position={40}>40</SliderLabel>
                                    <SliderLabel position={50}>50</SliderLabel>
                                </RangeSlider>
                            </Card>
                            <div className="weightInputs">
                                <Input className="inputRangeStyle" value={weightStart} />
                                -
                                <Input value={weightEnd} className="inputRangeStyle" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productsFooter">
                <Footer />
            </div>
            <style>
                {`
                .k-pager-numbers .k-link {
                    color: #4AA675;
                }
                .k-pager-numbers .k-link {
                    color: #4AA675;
                }
                .k-checkbox:checked, .k-checkbox.k-checked {
                    border-color: #4AA675;
                    color: #fff;
                    background-color: #4AA675;
                }
                .k-rating-item.k-selected {
                    color: #4AA675;
                }
                .k-slider .k-draghandle {
                    border-color: #4AA675;
                    color: #4AA675;
                    background-color: #4AA675;
                    border-radius: 50%;
                }
                .k-slider .k-draghandle:hover {
                    border-color: #4AA675;
                    color: #4AA675;
                    background-color: #4AA675;
                    border-radius: 50%;
                }
                .k-slider .k-slider-selection {
                    background-color: #4AA675;
                }
                .k-pager-numbers .k-link.k-selected {
                    color: #4AA675;
                    background-color: white;
                }
                .k-picker-solid {
                    border-color: black;
                    color: #424242;
                    background-color: white;
                    background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.02));
                }
                .k-list-item.k-selected:hover, .k-selected.k-list-optionlabel:hover, .k-list-item.k-selected.k-hover, .k-selected.k-hover.k-list-optionlabel {
                    color: #fff;
                    background-color: #4AA675;
                }
                .k-list-item.k-selected, .k-selected.k-list-optionlabel {
                    color: #fff;
                    background-color: #4AA675;
                }
                .k-pager-numbers .k-link:hover, .k-pager-numbers .k-link.k-state-hover, .k-pager-numbers .k-link.k-hover {
                    color: white;
                    background-color: #4AA675;
                    opacity: 50%;
                }
                .k-slider .k-draghandle:active, .k-slider .k-draghandle.k-pressed {
                    border-color: #4AA675;
                    background-color: #4AA675;
                }
                `}
            </style>
        </div>
    )
}