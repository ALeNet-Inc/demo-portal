import React from 'react'
import './styles/MyTransactions.css'
import { useTranslation } from 'react-i18next';
import DataProcessingUtil from '../functions/DataProcessingUtil';
import Sidebar from '../components/SideMenu'
import { useHistory } from 'react-router';

/* A page with all trust banking information for a user */

function MyTransactions() {

    //Populate HTML table with Trust information
    const dataProcessor = new DataProcessingUtil();
    const mytransactions = dataProcessor.populateTransactions();
    const history = useHistory();

    const { t } = useTranslation(); //react-i18-next

    if(mytransactions === null) {
        history.push('/transactions-error');
    }

    return (
        <div className='mytransactions'>
            <Sidebar />
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
    )
}

export default MyTransactions
