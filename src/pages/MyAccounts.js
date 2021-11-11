import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import SideMenu from '../components/SideMenu'
import DataProcessingUtil from '../functions/DataProcessingUtil'
import Table from '../components/Table';
import './styles/MyAccounts.css'

function MyAccounts() {

    const { t } = useTranslation();

    const dataUtil = new DataProcessingUtil();
    const myAccounts = dataUtil.populateAccounts();
    const history = useHistory();

    if (myAccounts === null) {
        history.push('/accounts-error');
    }

    const columns = useMemo(
        () => [
            {
                Header: t('account_type'),
                accessor: "account.type"
            },
            {
                Header: t('account_no'),
                accessor: "account.account_no"
            },
            {
                Header: t('balance'),
                accessor: "account.balance"
            },
            {
                Header: t('int_earned'),
                accessor: "account.int_earned"
            },
        ],
        [t]
    );


    return (
        <div className='myaccounts'>
            <SideMenu />
            <div className='my-accounts-container'>
                <h1 className='my-accounts-title'>{t('my-accounts')}</h1>
                {
                    myAccounts ? (
                        <Table columns={columns} data={myAccounts} name='custom-table' />
                    ) : (
                        null
                    )
                }
            </div>
        </div>
    )
}

export default MyAccounts
