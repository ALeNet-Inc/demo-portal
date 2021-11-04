import React from 'react';
import CardItem from './CardItem';
import './styles/Cards.css';
import { useTranslation } from 'react-i18next';

/**
 * Custom {@link CardItem} Component showing an image, text, a label.
 * @returns formatted {@link CardItem} Components
 */
function Cards() {
    const {t} =useTranslation(); //react-i18-next

    return (
        <div className='cards'>
            <h1 className='cards-header'>{t('browse_options')}</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem 
                            src='images/credit.webp'
                            text={t('credit_options')}
                            label={t('rewards')}
                            path='/services'
                        />
                        <CardItem 
                            src='images/loans.webp'
                            text={t('loan_today')}
                            label={t('low_interest')}
                            path='/services'
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem 
                            src='images/debit.webp'
                            text={t('awesome_debit')}
                            label={t('service')}
                            path='/services'
                        />
                        <CardItem 
                            src='images/money.webp'
                            text={t('saving_accounts')}
                            label={t('high_return_interest')}
                            path='/services'
                        />
                        <CardItem 
                            src='images/customerService.webp'
                            text={t('account_service')}
                            label={t('example_email')}
                            path='/services'
                        />

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
