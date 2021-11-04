import React from 'react';
import '../App.css';
import { useTranslation } from "react-i18next";
import './styles/Products.css';

/* Filler "Products" page, this is blank at the moment, no actual information or utility here */

function Products() {
    const {t} = useTranslation(); //react-i18-next
    return (
        <div className="products-background">
            <h1 className='products'>{t('products')}</h1>
        </div>
        
    );

}

export default Products;