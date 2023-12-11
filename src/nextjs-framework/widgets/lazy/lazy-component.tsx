
import React from 'react';
import { WidgetContext } from '../../editor';

export async function LazyComponent(props: WidgetContext<any>) {
    return (
      <div id={props.model.Id} />
    );
}

