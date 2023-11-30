'use client';

import React from 'react';
const DropDownWrapper = (props: { children: React.ReactNode}) => {
    return (
      <div className="qu-dropdown-selector dropdown d-flex justify-content-center">
        {props.children}
      </div>);
};

export { DropDownWrapper };
