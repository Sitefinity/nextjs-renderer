'use client'

import React from "react";
import {
    Grid,
    GridColumn as Column,
    GridToolbar,
} from "@progress/kendo-react-grid";
import { MyCommandCell } from "./myCommandCell";
import { insertItem, getItems, updateItem, deleteItem } from "./services";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";
import { htmlAttributes } from "sitefinity-react-framework/widgets/attributes";
const editField = "inEdit";

export function GridComponent(props: WidgetContext<GridEntity>) {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        let newItems = getItems();
        setData(newItems as any);
    }, []);

    // modify the data in the store, db etc
    const remove = (dataItem: any) => {
        const newData = [...deleteItem(dataItem)];
        setData(newData as any);
    };
    const add = (dataItem: any) => {
        dataItem.inEdit = true;
        const newData = insertItem(dataItem);
        setData(newData as any);
    };
    const update = (dataItem: any) => {
        dataItem.inEdit = false;
        const newData = updateItem(dataItem);
        setData(newData as any);
    };

    // Local state operations
    const discard = () => {
        const newData = [...data];
        newData.splice(0, 1);
        setData(newData);
    };
    const cancel = (dataItem: any) => {
        const originalItem = getItems().find(
            (p) => p.ProductID === dataItem.ProductID
        );
        const newData = data.map((item) =>
            (item as any).ProductID === (originalItem as any).ProductID ? originalItem : item
        );
        setData(newData as any);
    };
    const enterEdit = (dataItem: any) => {
        setData(
            (data as any).map((item: any) =>
                item.ProductID === dataItem.ProductID
                    ? {
                        ...item,
                        inEdit: true,
                    }
                    : item
            )
        );
    };
    const itemChange = (event: any) => {
        const newData = data.map((item) =>
            (item as any).ProductID === event.dataItem.ProductID
                ? {
                    ...item as any,
                    [event.field || ""]: event.value,
                }
                : item
        );
        setData(newData as any);
    };
    const addNew = () => {
        const newDataItem = {
            inEdit: true,
            Discontinued: false,
        };
        setData([newDataItem as never, ...data]);
    };
    const CommandCell = (props: any) => (
        <MyCommandCell
            {...props}
            edit={enterEdit}
            remove={remove}
            add={add}
            discard={discard}
            update={update}
            cancel={cancel}
            editField={editField}
        />
    );
    const dataAttributes = htmlAttributes(props);
    return (
        <div {...dataAttributes} >
            <Grid
                style={{
                    height: "420px",
                }}
                data={data}
                onItemChange={itemChange}
                editField={editField}
            >
                <GridToolbar>
                    <button
                        title="Add new"
                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                        onClick={addNew}
                    >
                        Add new
                    </button>
                </GridToolbar>
                <Column field="ProductID" title="Id" width="50px" editable={false} />
                <Column field="ProductName" title="Product Name" width="200px" />
                <Column
                    field="FirstOrderedOn"
                    title="First Ordered"
                    editor="date"
                    format="{0:d}"
                    width="150px"
                />
                <Column
                    field="UnitsInStock"
                    title="Units"
                    width="120px"
                    editor="numeric"
                />
                <Column field="Discontinued" title="Discontinued" editor="boolean" />
                <Column cell={CommandCell} width="200px" />
            </Grid>
        </div>
    );
}

interface GridEntity {
    ShowLegend: true,
    ChartTitle: string,
    ChartCategoryAxisTitle: string,
    SeriesType: "column",
    FirstSeriesName: string,
    SecondSeriesName: string,
    ThirdSeriesName: string,
    FourthSeriesName: string,
}
