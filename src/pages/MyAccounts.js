import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import SideMenu from '../components/SideMenu'
import DataProcessingUtil from '../functions/DataProcessingUtil'
import DropdownTable, { DropdownTableMenu, DropdownTableItem } from '../components/DropdownTable';
import './styles/MyAccounts.css'

function MyAccounts() {

    const { t } = useTranslation();

    const dataUtil = new DataProcessingUtil();
    const myAccounts = dataUtil.populateAccounts();
    const history = useHistory();

    if (myAccounts === null) {
        history.push('/accounts-error');
    }

    const headers = [t('account_no'), t('balance')]

    return (
        <div className='myaccounts'>
            <SideMenu />
            <div className='my-accounts-container'>
                <h1 className='my-accounts-title'>{t('my-accounts')}</h1>
                <DropdownTable headers={headers}>
                    {
                        myAccounts ? (
                            myAccounts.map(acc => {
                                return (
                                    <DropdownTableItem
                                        key={acc.account.headers.account_no.value}
                                        label1={acc.account.headers.account_no.value}
                                        label2={acc.account.headers.balance.value}>
                                        <DropdownTableMenu textItems={acc.account.body} />
                                    </DropdownTableItem>
                                );
                            })
                        ) : (
                            null
                        )
                    }
                </DropdownTable>
            </div>
        </div>
    )
}

export default MyAccounts
