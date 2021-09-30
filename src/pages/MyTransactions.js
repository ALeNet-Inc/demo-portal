import React from 'react'
import './styles/MyTransactions.css'
import { useTranslation } from 'react-i18next';
import DataProcessingUtil from '../functions/DataProcessingUtil';
import Sidebar from '../components/Sidebar'

/* A page with all trust banking information for a user */

function MyTransactions() {

    //Populate HTML table with Trust information
    const dataProcessor = new DataProcessingUtil();
    const mytransactions = dataProcessor.populateTransactions();

    const { t } = useTranslation(); //react-i18-next

    return (
        <div className='background'>
            <Sidebar />
            <div className='mytransactions'>
                <div className='my-transactions-container'>
                    <h1 className='my-transactions-title'>{t('my-transactions')}</h1>
                    <table className='my-transactions-table'>
                        <thead>
                            <tr className='headers'>
                                <th className='table-header'>{t('transaction-status')}</th>
                                <th className='table-header'>{t('transaction-amt')}</th>
                                <th className='table-header'>{t('transaction-comments')}</th>
                                <th className='table-header'>{t('transaction-contract')}</th>
                            </tr>
                        </thead>
                        <tbody id='transactions'>{mytransactions}</tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyTransactions
