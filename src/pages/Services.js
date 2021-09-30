import React from 'react'
import '../App.css'
import { useTranslation } from "react-i18next";
import './styles/Services.css'

/* Filler "Services" page, this is blank at the moment, no actual information or utility here. */

function Services() {
    const {t} = useTranslation(); //react-i18-next
    return (
        <div className="services-background">
             <h1 className='services'>{t('services')}</h1>;
        </div>
    )
}

export default Services

