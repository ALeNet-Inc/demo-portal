import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import SideMenu from '../components/SideMenu'
import DataProcessingUtil from '../functions/DataProcessingUtil'
import './styles/MyAccounts.css'

function MyAccounts() {

    const { t } = useTranslation();

    const dataUtil = new DataProcessingUtil();
    const myAccounts = dataUtil.populateAccounts();
    const history = useHistory();

    if(myAccounts === null) {
        history.push('/accounts-error');
    }

    return (
        <div className='myaccounts'>
            <SideMenu />
            <div className='my-accounts-container'>
                <h1 className='my-accounts-title'>{t('my-accounts')}</h1>
                <table className='my-accounts-table'>
                    <thead>
                        <tr className='headers'>
                            <th className='table-header'>{t('account_type')}</th>
                            <th className='table-header'>{t('account_no')}</th>
                            <th className='table-header'>{t('balance')}</th>
                            <th className='table-header'>{t('int_earned')}</th>
                        </tr>
                    </thead>
                    <tbody id='my-accounts-table'>{myAccounts}</tbody>
                </table>
            </div>
        </div>
    )
}

export default MyAccounts
