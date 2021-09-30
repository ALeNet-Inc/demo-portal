import React from 'react';
import CardItem from './CardItem';
import './styles/Cards2.css';
import { useTranslation } from 'react-i18next';

/**
 * Custom {@link CardItem} Component showing an image, text, a label.
 * @returns formatted {@link CardItem} Components
 */
function Cards2() {
    const {t} =useTranslation(); //react-i18-next

    return (
        <div className='cards2'>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem 
                            src='images/my-trusts.jpg'
                            text={t('my-trusts')}
                            label={t('trust_prompt')}
                            path='/my-trusts'
                        />
                        <CardItem 
                            src='images/my-transactions.jpg'
                            text={t('my-transactions')}
                            label={t('transactions_prompt')}
                            path='/my-transactions'
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem 
                            src='images/credit.jpg'
                            text={t('my_accs')}
                            label={t('acc_prompt')}
                            path='/my-accounts'
                        />
                        <CardItem 
                            src='images/settings.jpg'
                            text={t('settings')}
                            label={t('settings_prompt')}
                            path='/settings'
                        />
                        <CardItem 
                            src='images/customerService.jpg'
                            text={t('service_requests')}
                            label={t('request_prompt')}
                            path='/service-request'
                        />

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards2
