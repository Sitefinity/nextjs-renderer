import React from 'react';
import { KendoHorizontal } from '../kendo/menu/horizontal';

export function KendoMenu(props: {
    items: any;
 }) {

    return (
      <KendoHorizontal items={props.items} />
    );
}
