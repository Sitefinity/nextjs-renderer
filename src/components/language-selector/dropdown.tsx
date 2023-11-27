'use client';

import React from 'react';
const importBootstrapbundle = () => import('bootstrap');

const DropDownWrapper = (props: { children: React.ReactNode}) => {
    if (typeof window !== 'undefined') {
        importBootstrapbundle();
      }
    return (
      <div className="qu-dropdown-selector dropdown d-flex justify-content-center">
        {props.children}
      </div>);
};

export { DropDownWrapper };
