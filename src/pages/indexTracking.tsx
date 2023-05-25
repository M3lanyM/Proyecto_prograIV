import Page_header from '@/components/page_header';
import React from 'react';

const PackageTracking: React.FC = () => {
    return (
        <>
            <header>
                <Page_header></Page_header>
            </header>
            <div className="package-container">
                <div className="circle" />
                <div className="circleProcess" />
                <div className="circleDelivered" />
            </div>
        </>
    );
};

export default PackageTracking;

