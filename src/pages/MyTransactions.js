import React from 'react'
import './styles/MyTransactions.css'
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/SideMenu';
import DropdownTable, { DropdownTableMenu, DropdownTableItem } from '../components/DropdownTable';
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
    const headers = [t('name'), t('transaction-amt')];

    return (
        <div className='mytransactions'>
            <Sidebar />
            <div className='my-transactions-container'>
                <h1 className='my-transactions-title'>{t('my-transactions')}</h1>
                <h2 className='table-head-approved'>Approved</h2>
                <hr className='approved' />
                <DropdownTable headers={headers}>
                    {
                        mytransactions[0] ? (
                            mytransactions[0].map((trans, index) => {
                                return (
                                    <DropdownTableItem
                                        key={trans.transaction.headers.contract.value + index}
                                        label1={trans.transaction.headers.contract.value}
                                        label2={trans.transaction.headers.amount.value}
                                        index={index}
                                    >
                                        <DropdownTableMenu mainMenu={trans.transaction.body} leftMenu>
                                        </DropdownTableMenu>
                                    </DropdownTableItem>
                                );
                            })
                        ) : (
                            null
                        )
                    }
                </DropdownTable>
                <h2 className='table-head-pending'>Pending</h2>
                <hr className='pending' />
                <DropdownTable headers={headers}>
                    {
                        mytransactions[1] ? (
                            mytransactions[1].map((trans, index) => {
                                return (
                                    <DropdownTableItem
                                        key={trans.transaction.headers.contract.value + index}
                                        label1={trans.transaction.headers.contract.value}
                                        label2={trans.transaction.headers.amount.value}
                                        index={index}
                                    >
                                        <DropdownTableMenu mainMenu={trans.transaction.body} leftMenu>
                                        </DropdownTableMenu>
                                    </DropdownTableItem>
                                );
                            })
                        ) : (
                            null
                        )
                    }
                </DropdownTable>
                <h2 className='table-head-rejected'>Rejected</h2>
                <hr className='rejected' />
                <DropdownTable headers={headers}>
                    {
                        mytransactions[2] ? (
                            mytransactions[2].map((trans, index) => {
                                return (
                                    <DropdownTableItem
                                        key={trans.transaction.headers.contract.value + index}
                                        label1={trans.transaction.headers.contract.value}
                                        label2={trans.transaction.headers.amount.value}
                                        index={index}
                                    >
                                        <DropdownTableMenu mainMenu={trans.transaction.body} leftMenu>
                                        </DropdownTableMenu>
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

export default MyTransactions
