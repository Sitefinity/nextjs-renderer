'use client';

import React from "react";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";
import { htmlAttributes } from "sitefinity-react-framework/widgets/attributes";
import { TileLayout, TileLayoutItem, TilePosition, TileLayoutGap, TileLayoutProps, TileLayoutRepositionEvent } from "@progress/kendo-react-layout";
import { widgetRegistry } from "@/widget-registry";
import { RenderWidgetService } from "sitefinity-react-framework/services/render-widget-service";

const TileNamePrefix = "Tile";
const DEFAULT_GAP_SIZE = 0;

/*
* Known issues:
* - when you drop widget from one tile to another with widget in it only one is saved in DB.
* - setOperations should lock the page if not locked
* - better way to reorder tiles when widget is dropped and there is no space to hold it
*/

export function TileLayoutComponent(props: WidgetContext<TileLayoutEntity>) {
    const columnsCount: number = +props.model.Properties.Columns || 1
    const tilesCount: number = props.model.Properties.Tiles || 1;
    const tilesProperties: TilePosition[] = props.model.Properties.TilesProperties;
    const gap: TileLayoutGap = getGaps(props.model.Properties.Gaps);
    const dataAttributes = htmlAttributes(props);
    const tilesAndPositions: TilesAndPositions = getTilesAndPositions(props, tilesCount, columnsCount, tilesProperties);
    const tileLayoutProperties: TileLayoutProps = {
        columns: columnsCount,
        items: tilesAndPositions.tiles,
        gap,
        rowHeight: "auto"
    };
    let lastPositions: TilePosition[] = tilesAndPositions.positions;
    let timeout: any = undefined;

    function handleReposition(event: TileLayoutRepositionEvent) {
        lastPositions = event.value;

        if (!timeout) {
            timeout = setTimeout(() => {
                setTilesPositions(lastPositions, props);
                timeout = undefined;
            }, 500);
        }

    }

    function handleIgnoreDrag(event: any) {
        // TODO: Add more check, this is just for POC
        const shouldIgnore = event.target.nodeName === 'SF-WIDGET-LABEL' || event.target.getAttribute("data-sfiscontentwidget") === 'true';
        return shouldIgnore;
    }

    return (
        <div {...dataAttributes} >
            <TileLayout
                {...tileLayoutProperties}
                onReposition={(event) => handleReposition(event)}
                ignoreDrag={(event) => handleIgnoreDrag(event)}/>
        </div>
    );
}

async function setTilesPositions(positions: TilePosition[], props: WidgetContext<TileLayoutEntity>) {
    const url =  `/sf/system/pages(${props.requestContext.pageId})/Default.SetProperties()?sf_provider=OpenAccessDataProvider&sf_culture=en&sf_site=${props.requestContext.siteId}&segment=00000000-0000-0000-0000-000000000000`
    const positionsString = JSON.stringify(positions).replace(/"/g, '\"');
    const data = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "propertyValueGroup": {
                "ComponentId": props.model.Id,
                "Properties": [
                    {
                        "Name": "TilesProperties",
                        "Value": positionsString
                    }
                ],
                "PropertyMetadata": [],
                "PropertyLocalizationMode": "1"
            }
        }),
        headers: {
            "content-type": "application/json",
        }
    });
    return data;
}

function getTilesAndPositions(context: WidgetContext<TileLayoutEntity>, tilesCount: number, columnsCount: number, tilesPositions: TilePosition[]): TilesAndPositions {
    const tiles = [];
    const positions: TilePosition[] = [];

    let nextCol = 1;
    for (let i = 0; i < tilesCount; i++) {
        let currentName = `${TileNamePrefix} ${i + 1}`;

        const child = context.model.Children.filter(x => x.PlaceHolder === currentName).map((x => {
            let ret: WidgetContext<any> = {
                model: x,
                metadata: widgetRegistry.widgets[x.Name],
                requestContext: context.requestContext
            }

            return ret;
        }));

        let position: TilePosition = {
            col: nextCol,
            order: i,
            colSpan: 1,
            rowSpan: 1
        }

        if (tilesPositions && tilesPositions[i]) {
            position = {
                col: tilesPositions[i].col,
                order: tilesPositions[i].order,
                colSpan: tilesPositions[i].colSpan,
                rowSpan: tilesPositions[i].rowSpan
            }
        }

        nextCol = position.col + (position.colSpan || 1);

        if (nextCol > columnsCount) {
            nextCol = 1;
        }

        const tile: TileLayoutItem = {
            reorderable: context.requestContext.isEdit,
            resizable: context.requestContext.isEdit,
            defaultPosition: position,
            item: (
                <div data-sfcontainer={currentName}>
                    {child[0] && RenderWidgetService.createComponent(child[0].model, context.requestContext)}
                </div>
            ),
        }



        tiles.push(tile);
        positions.push(position);
    }

    // Currently when you create new tile the "Default" values are not set and if you change one property only this property comes with the response
    setTilesPositions(positions, context);

    return {
        tiles,
        positions: tilesPositions || positions
    };
}

function getGaps(gaps: TileLayoutGap): TileLayoutGap {
    return {
        columns: gaps?.columns || DEFAULT_GAP_SIZE,
        rows: gaps?.rows || DEFAULT_GAP_SIZE
    }
}

interface TileLayoutEntity {
    Columns: number,
    Gaps: TileLayoutGap;
    TilesProperties: TilePosition[];
    Tiles: number;
}

interface TilesAndPositions {
    tiles: TileLayoutItem[];
    positions: TilePosition[];
}
