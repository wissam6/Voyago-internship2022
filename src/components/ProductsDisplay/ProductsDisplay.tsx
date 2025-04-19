import * as React from 'react';
import { Header } from "../Header/Header";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { ProductCard } from "../ProductCard/ProductCard";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { SvgIcon } from "@progress/kendo-react-common";
import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import { Pager, PageChangeEvent } from "@progress/kendo-react-data-tools";
import { Input } from "@progress/kendo-react-inputs";
import { Checkbox, Rating } from "@progress/kendo-react-inputs";
import { ProductListView } from "../ProductListView/ProductListView";
import { BreadCrumb } from "../BreadCrumb/BreadCrumb";
import { Footer } from "../Footer/Footer";
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
import { useLocation } from 'react-router-dom';
import { orderBy } from '@progress/kendo-data-query';
import { ReactSession } from 'react-client-session';
import './ProductsDisplay.css'
const axios = require('axios');

//const total: number = 128;
const pageSizes: number[] = [5, 12];
const initialType: 'numeric' | 'input' = 'numeric'

interface AppState {
    skip: number,
    take: number,
    buttonCount: number,
    type: 'numeric' | 'input',
    info: boolean,
    pageSizes: boolean,
    previousNext: boolean,
    responsive: boolean
}

const initialPageState: AppState = {
    skip: 0,
    take: 12,
    buttonCount: 6,
    type: initialType,
    info: true,
    pageSizes: true,
    previousNext: true,
    responsive: true
};

export const ProductsDisplay = () => {

    const [data, setData]: any = React.useState([]);
    const [filteredData, setFilteredData]: any = React.useState([]);
    const [rowsValue, setRows]: any = React.useState([{ height: 500 }]);
    const [colsValue, setCols]: any = React.useState([{ width: 360 }, { width: 360 }, { width: 360 }]);
    const [pageState, setPageState] = React.useState(initialPageState);
    const [isAll, setAll] = React.useState(true);
    const [isDisc, setDisc] = React.useState(false);
    const [chosenModels, setModel] = React.useState([]);
    const [filteredSizes, setSize] = React.useState([]);
    const [chosenRatings, setRating] = React.useState([]);
    const [chosenColors, setColor] = React.useState([]);
    const [priceStart, setPriceStart]: any = React.useState(0);
    const [priceEnd, setPriceEnd]: any = React.useState(2000);
    //const [sortType, setSort]: any = React.useState('product.Name');
    //const [order, setOrder]: any = React.useState('DESC');
    const [weightStart, setWeightStart]: any = React.useState(20);
    const [weightEnd, setWeightEnd]: any = React.useState(50);
    const [view, setView] = React.useState('firstview');
    const [type, setType]: any = React.useState();
    const [pagedData, setPagedData]: any = React.useState([]);
    const [pagerSize, setPagerSize] = React.useState(12);
    //const [pagerTake, setTake] = React.useState(0);
    const [tileViewColor, setTileViewColor] = React.useState('');
    const [listViewColor, setListViewColor] = React.useState('');
    const location: any = useLocation();

    ReactSession.setStoreType("localStorage");
    const category = location.state.category;
    const subCategory = location.state.subCategory;
    const minWeight = 20;
    const maxWeight = 50;
    const minPrice = 0;
    const maxPrice = 100;
    const sortOptions = ['Price-Low to High', 'Price-High to Low', 'Name-A to Z', 'Name-Z to A'];
    const { skip, take, ...rest } = pageState;
    const checkboxCount = 5;
    const dataModels = data.map((mydata: any) => mydata.modelName).filter((value: any, index: any, self: any) => self.indexOf(value) === index);
    const dataSizes = data.map((mydata: any) => mydata.Size).filter((value: any, index: any, self: any) => self.indexOf(value) === index);
    const dataColors = data.map((mydata: any) => mydata.Color).filter((value: any, index: any, self: any) => self.indexOf(value) === index);

    ReactSession.set('page', category);

    const handlePageChange = (event: PageChangeEvent) => {
        const { skip, take } = event;
        setPagerSize(take);
        setPageState({ ...pageState, skip: skip, take: take })
        console.log(`Page Change: skip ${skip}, take ${take}`);
        setFilteredData(pagedData.slice(skip));
    };

    const handleAllEvents = (event: any, type: string, eventData: any) => {
        setType(type);
        if (event.value) {
            const result: any = [
                ...eventData,
                event.target.name,
            ]
            setTheEventData(type, result);
        }
        else {
            const newData: any = eventData.filter((data: any) => {
                if (data !== event.target.name) {
                    return data;
                }
            })
            setTheEventData(type, newData);
        }
        handleAllFilters();
    }

    const setTheEventData = React.useCallback((type: string, result: any) => {
        if (type === 'model') {
            setModel(result);
        }
        else if (type === 'size') {
            setSize(result);
        }
        else {
            setColor(result);
        }
    }, []);

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
        setPriceStart(priceStartValue.toFixed(2));
        setPriceEnd(priceEndValue.toFixed(2));
        handleAllFilters();
    }

    const handleWeight = (event: any) => {
        setWeightStart(event.value.start.toFixed(2));
        setWeightEnd(event.value.end.toFixed(2));
        handleAllFilters();
    }

    const handleSortChange = (event: any) => {
        //setTake(0);
        const sortingType = event.value;
        let result;
        if (sortingType === 'Price-Low to High') {
            result = orderBy(filteredData, [{ field: "ListPrice", dir: "asc" }]);
        }
        if (sortingType === 'Price-High to Low') {
            result = orderBy(filteredData, [{ field: "ListPrice", dir: "desc" }]);
        }
        if (sortingType === 'Name-A to Z') {
            result = orderBy(filteredData, [{ field: "Name", dir: "asc" }]);
        }
        if (sortingType === 'Name-Z to A') {
            result = orderBy(filteredData, [{ field: "Name", dir: "desc" }]);
        }
        setFilteredData(result);
        setPagedData(result);
    }

    const clearAll = () => {
        setModel([]);
        setSize([]);
        setColor([]);
        window.location.reload();
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
        axios.post('/allproducts', {
            category: category
        })
            .then(function (response: any) {
                setData(response.data.recordset);
                setFilteredData(response.data.recordset);
                setPagedData(response.data.recordset);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }, []);

    React.useEffect(() => {
        handleAllFilters();
    }, [chosenModels, filteredSizes, chosenColors, priceStart, priceEnd, weightEnd, weightStart]);

    const handleAllFilters = React.useCallback(() => {
        let newData: any = [];
        newData = handleAllFiltersFilter();
        /* //price
         data.map((mydata: any) => {
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
        //console.log(newData);
        setTheData(newData);
    }, [chosenColors, filteredSizes, chosenModels, priceStart, priceEnd, data, weightEnd, weightStart])

    const handleAllFiltersFilter = () => {
        const newData: any = [];
        let chosenData: any = '';
        if (type === 'model') {
            chosenData = chosenModels;
        }
        else if (type === 'size') {
            chosenData = filteredSizes;
        }
        else {
            chosenData = chosenColors;
        }

        for (let i = 0; i < data.length; i++) {
            let validColor = true;
            let validSize = true;
            let validModel = true;
            let validPrice = false;
            let validWeight = false;
            if (chosenColors.length > 0) {
                validColor = false;
            }
            if (filteredSizes.length > 0) {
                validSize = false;
            }
            if (chosenModels.length > 0) {
                validModel = false;
            }
            if (data[i].Color !== null) {
                for (let j = 0; j < chosenColors.length; j++) {
                    if (data[i].Color === chosenColors[j]) {
                        validColor = true;
                    }
                }
            }

            if (data[i].Size !== null) {
                for (let k = 0; k < filteredSizes.length; k++) {
                    if (data[i].Size === filteredSizes[k]) {
                        validSize = true;
                    }
                }
            }

            if (data[i].modelName !== null) {
                for (let c = 0; c < chosenModels.length; c++) {
                    if (data[i].modelName === chosenModels[c]) {
                        validModel = true;
                    }
                }
            }

            if (data[i].ListPrice !== null) {
                if (data[i].ListPrice >= priceStart && data[i].ListPrice <= priceEnd) {
                    validPrice = true;
                }
            }
            else {
                validPrice = true;
            }

            if (data[i].Weight !== null) {
                if (data[i].Weight >= weightStart && data[i].Weight <= weightEnd) {
                    validWeight = true;
                }
            }
            else {
                validWeight = true;
            }


            if (validModel && validSize && validColor && validPrice && validWeight) {
                newData.push(data[i]);
            }
        }
        return newData;
    }
    const setTheData = React.useCallback((newData: string) => {
        setFilteredData(newData);
        setPagedData(newData);
    }, [filteredData])


    return (
        <div className="productDisplay">
            <Header />
            <div className="breadCrumb">
                <BreadCrumb crumbValue={subCategory} crumbValue2={category} />
            </div>
            <div className="content">
                <div className="contentHeader">
                    <h1>{data[0] !== undefined && data[0].categoryName}</h1>
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
                <GridLayout
                    rows={rowsValue}
                    cols={colsValue}
                >
                    {view === 'firstview' ?
                        filteredData.slice(0, pagerSize).map((item: any, index: number) => {
                            return <GridLayoutItem key={index}>
                                <ProductCard key={item.ProductID}
                                    {...item}
                                ></ProductCard>
                            </GridLayoutItem>
                        })
                        : view === 'secondview' ?
                            <GridLayoutItem >
                                <ProductListView
                                    data={filteredData.slice(0, pagerSize)}
                                />
                            </GridLayoutItem>
                            : <p> hi </p>
                    }
                </GridLayout>
            </div>
            <div className="pager">
                <Pager
                    skip={skip}
                    take={take}
                    total={pagedData.length}
                    buttonCount={pageState.buttonCount}
                    info={pageState.info}
                    type={pageState.type}
                    pageSizes={pageState.pageSizes ? pageSizes : undefined}
                    previousNext={pageState.previousNext}
                    onPageChange={handlePageChange}
                    style={{ border: 'none' }}
                />
            </div>
            <div className="filters">
                <h4 className="filterTitle">Filters</h4>
                <div className="allFilters">
                    <div className="clear">
                        <Card className='clearCard'>
                            <div className="contentClear">
                                <CardHeader className="clearHeader">
                                    <span className="clearText">Clear All</span>
                                </CardHeader>
                                <Button className="clearButton" onClick={clearAll}>
                                    <SvgIcon width='16px' height='16px' icon={xIcon}></SvgIcon>
                                </Button>
                            </div>
                        </Card>
                    </div>
                    <div className="discounted">
                        <Card className="discCard">
                            <CardHeader className="discHeader"><span className="showStyle">Show</span></CardHeader>
                            <Checkbox className="allCheck" checked={isAll} onClick={handleDiscounted}>
                                <span className="checkText">All</span>
                            </Checkbox>
                            <Checkbox className="discCheck" checked={isDisc} onClick={handleDiscounted}>
                                <span className="checkText">Discounted items only</span>
                            </Checkbox>
                        </Card>
                    </div>
                    {dataModels[0] !== null && dataModels.length > 1 &&
                        <div className="model">
                            <Card className='modelCard'>
                                <CardHeader className="modelHeader">
                                    Model
                                </CardHeader>
                                <div className="modelCheckBoxes">
                                    {dataModels.map((model: any) => {
                                        return (
                                            <Checkbox onChange={(event) => { handleAllEvents(event, 'model', chosenModels) }} name={model}>
                                                <span className="modelNames">{model}</span>
                                            </Checkbox>
                                        )
                                    })}
                                </div>
                            </Card>
                        </div>}

                    {dataSizes[0] !== null && dataSizes.length > 1 && <div className="size">
                        <Card className='sizeCard'>
                            <CardHeader className="sizeHeader">
                                <span className="sizeTitle">Size</span>
                            </CardHeader>
                            <div className="sizeBoxes">
                                {
                                    dataSizes.map((bike: any) => {
                                        return <div className="sizeInsideBox">
                                            <Checkbox
                                                onChange={(event) => { handleAllEvents(event, 'size', filteredSizes) }}
                                                name={bike}>
                                                <span className="sizeText">{bike}</span>
                                            </Checkbox>
                                        </div>
                                    })
                                }
                            </div>
                        </Card>

                    </div>}
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
                    {dataColors[0] !== null && dataColors.length > 1 &&
                        <div className="color">
                            <Card className='colorCard'>
                                <CardHeader className="colorHeader">Color</CardHeader>
                                <div className="colorContent">
                                    {
                                        dataColors.map((bikes: any) => {
                                            return <Checkbox name={bikes} onChange={(event) => { handleAllEvents(event, 'color', chosenColors) }}>
                                                <span className="bikeColor">{bikes}</span>
                                            </Checkbox>
                                        })
                                    }
                                </div>
                            </Card>
                        </div>
                    }
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