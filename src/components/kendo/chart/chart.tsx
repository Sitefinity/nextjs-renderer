'use client'

import React from "react";

import {
  Chart,
  ChartTitle,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisTitle,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartTooltip,
} from "@progress/kendo-react-charts";
import "hammerjs";
import { htmlAttributes } from "sitefinity-react-framework/widgets/attributes";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";

export function ChartComponent(props: WidgetContext<ChartEntity>) {
    const [firstSeries, secondSeries, thirdSeries, fourthSeries] = [
      [100, 123, 234, 343],
      [120, 67, 231, 196],
      [45, 124, 189, 143],
      [87, 154, 210, 215],
    ];
    const categories = ["Q1", "Q2", "Q3", "Q4"];
    const dataAttributes = htmlAttributes(props);
    return (
        <div {...dataAttributes} >
          <Chart>
              <ChartTooltip />
              <ChartLegend position="top" orientation="horizontal" visible/>
              <ChartTitle text={props.model.Properties.ChartTitle} />
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={categories}>
                  <ChartCategoryAxisTitle text={props.model.Properties.ChartCategoryAxisTitle} />
                </ChartCategoryAxisItem>
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem type={props.model.Properties.SeriesType} gap={2} spacing={0.25} data={firstSeries} name={props.model.Properties.FirstSeriesName} />
                <ChartSeriesItem type={props.model.Properties.SeriesType} data={secondSeries} name={props.model.Properties.SecondSeriesName}/>
                <ChartSeriesItem type={props.model.Properties.SeriesType} data={thirdSeries} name={props.model.Properties.ThirdSeriesName}/>
                <ChartSeriesItem type={props.model.Properties.SeriesType} data={fourthSeries} name={props.model.Properties.FourthSeriesName}/>
              </ChartSeries>
            </Chart>
        </div>
    );
}

interface ChartEntity {
    ShowLegend: true,
    ChartTitle: string,
    ChartCategoryAxisTitle: string,
    SeriesType: "column",
    FirstSeriesName: string,
    SecondSeriesName: string,
    ThirdSeriesName: string,
    FourthSeriesName: string,
}
