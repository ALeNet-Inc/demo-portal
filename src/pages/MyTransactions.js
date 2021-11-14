import React, { useMemo } from 'react'
import './styles/MyTransactions.css'
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/SideMenu';
import Table from '../components/Table';
import { useHistory } from 'react-router';

/* A page with all trust banking information for a user */

function MyTransactions() {

    //Populate HTML table with Trust information
    const mytransactions = JSON.parse(sessionStorage.getItem('myTransactions'))
    const history = useHistory();

    const { t } = useTranslation(); //react-i18-next

    if (mytransactions === null) {
        history.push('/transactions-error');
    }

    const columns = useMemo(
        () => [
            {
                Header: t('transaction-status'),
                accessor: "transaction.status"
            },
            {
                Header: t('transaction-amt'),
                accessor: "transaction.ammount"
            },
            {
                Header: t('transaction-contract'),
                accessor: "transaction.contract"
            },
            {
                Header: t('name'),
                accessor: "transaction.name"
            },
        ],
        [t]
    );

    return (
        <div className='mytransactions'>
            <Sidebar />
            <div className='my-transactions-container'>
                <h1 className='my-transactions-title'>{t('my-transactions')}</h1>
                {
                    mytransactions ? (
                        <Table columns={columns} data={mytransactions} name='custom-table' />
                    ) : (
                        null
                    )
                }
            </div>
        </div>
    )
}

export default MyTransactions
