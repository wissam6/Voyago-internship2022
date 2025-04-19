import * as React from 'react';
import { Breadcrumb, BreadcrumbLinkMouseEvent, BreadcrumbLinkKeyDownEvent } from '@progress/kendo-react-layout';
import { useNavigate } from "react-router-dom";



export const BreadCrumb = (props: any) => {

    const navigate = useNavigate();

    interface DataModel {
        id: string;
        text?: string;
        icon?: React.ReactNode;
        iconClass?: string;
        disabled?: boolean
    }

    let items: DataModel[];
    if (props.crumbValue2 === undefined) {
        items = [
            {
                id: 'home',
                text: '',
                iconClass: 'k-i-home'
            },
            {
                id: props.crumbValue,
                text: props.crumbValue
            },
        ];
    }
    else {
        items = [
            {
                id: 'home',
                text: '',
                iconClass: 'k-i-home'
            },
            {
                id: props.crumbValue,
                text: props.crumbValue
            },
            {
                id: props.crumbValue2,
                text: props.crumbValue2,
                disabled: true
            }
        ];
    }

    const [data, setData] = React.useState<DataModel[]>(items);

    const handleItemSelect = (event: BreadcrumbLinkMouseEvent) => {
        const itemIndex: number = data.findIndex((curValue) => curValue.id === event.id);
        const newData: DataModel[] = data.slice(0, itemIndex + 1);
        setData(newData);
        if (event.id === 'home') navigate('/');
        else {
            const loc = `/${event.id?.toLocaleLowerCase()}`;
            navigate(loc);
        }
    };

    const handleKeyDown = (event: BreadcrumbLinkKeyDownEvent) => {
        if (event.nativeEvent.keyCode === 13) {
            const itemIndex = data.findIndex((curValue) => curValue.id === event.id);
            const newData = data.slice(0, itemIndex + 1);
            setData(newData);
        }
    };

    return (
        <div>
            <Breadcrumb
                data={data}
                onItemSelect={handleItemSelect}
                onKeyDown={handleKeyDown}
            />
            <style>
                {`
        .k-breadcrumb-link {
            color: #4AA675;
        }
        .k-breadcrumb-link:hover {
            color: black;
        }
        .k-i-home::before {
            color: black;
        }
        .k-state-disabled, .k-disabled, .k-widget[disabled] {
            opacity: 1;
        }
        `}
            </style>
        </div>
    );
};