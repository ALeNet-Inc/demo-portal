import React from 'react'
import './styles/MyTransactions.css'
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/SideMenu';
import DropdownTable, { DropdownTableMenu, DropdownTableItem } from '../components/DropdownTable';
import { useHistory } from 'react-router';
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import DropdownElement from '../components/DropdownElement';

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
    const approvalIcon = <AiIcons.AiFillCheckCircle />
    const rejectedIcon = <FaIcons.FaTimesCircle />
    const pendingIcon = <AiIcons.AiFillClockCircle />


    return (
        <div className='mytransactions'>
            <Sidebar />
            <div className='my-transactions-container'>
                <h1 className='my-transactions-title'>{t('my-transactions')}</h1>
                <DropdownElement icon={approvalIcon} header='Approved' styles='Approved'>
                    <DropdownTable headers={headers} styles='approved'>
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
                </DropdownElement>
                <DropdownElement icon={pendingIcon}  header='Pending' styles='Pending'>
                    <DropdownTable headers={headers} styles='pending'>
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
                </DropdownElement>
                <DropdownElement icon={rejectedIcon}  header='Rejected' styles='Rejected'>
                    <DropdownTable headers={headers} styles='rejected'>
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
                </DropdownElement>
            </div>
        </div>
    )
}

export default MyTransactions
