import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import SideMenu from '../components/SideMenu'
import DataProcessingUtil from '../functions/DataProcessingUtil'
import DropdownTable, { DropdownTableMenu, DropdownTableItem } from '../components/DropdownTable';
import DropdownElement from '../components/DropdownElement';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import './styles/MyAccounts.css'

function MyAccounts() {

    const { t } = useTranslation();

    const dataUtil = new DataProcessingUtil();
    const myAccounts = JSON.parse(sessionStorage.getItem('myAccounts'));
    const history = useHistory();

    if (myAccounts === null) {
        history.push('/accounts-error');
    }

    const headers = [t('account_no'), t('balance')]

    const realEstateIcon = <BsIcons.BsHouse style={{color: 'rgba(143, 188, 255, 1)'}}  />
    const checkingIcon = <FaIcons.FaMoneyCheckAlt style={{color: 'rgba(143, 188, 255, 1)'}}  />
    const autoIcon = <AiIcons.AiFillCar style={{color: 'rgba(143, 188, 255, 1)'}}  />
    const incomeIcon = <FaIcons.FaMoneyBillWave style={{color: 'rgba(143, 188, 255, 1)'}}  />
    const loansIcon = <FaIcons.FaMoneyCheck style={{color: 'rgba(143, 188, 255, 1)'}}  />
    const marketIcon = <BsIcons.BsGraphUp style={{color: 'rgba(143, 188, 255, 1)'}}  />
    const otherIcon = <BsIcons.BsThreeDots style={{color: 'rgba(143, 188, 255, 1)'}}  />

    return (
        <div className='myaccounts'>
            <SideMenu />
            <div className='my-accounts-container'>
                <h1 className='my-accounts-title'>{t('my-accounts')}</h1>
                <DropdownElement icon={realEstateIcon} header='Real Estate'>
                    <DropdownTable headers={headers}>
                        {
                            myAccounts[0] ? (
                                myAccounts[0].map((acc, index) => {
                                    return (
                                        <DropdownTableItem
                                            key={acc.account.headers.account_no.value + index}
                                            label1={acc.account.headers.account_no.value}
                                            label2={acc.account.headers.balance.value}
                                            index={index}
                                            styles='blue'
                                        >
                                            <DropdownTableMenu styles='blue' mainMenu={acc.account.body} leftMenu />
                                        </DropdownTableItem>
                                    );
                                })
                            ) : (
                                null
                            )
                        }
                    </DropdownTable>
                </DropdownElement>
                <DropdownElement icon={checkingIcon} header='Checking'>
                    <DropdownTable headers={headers}>
                        {
                            myAccounts[1] ? (
                                myAccounts[1].map((acc, index) => {
                                    return (
                                        <DropdownTableItem
                                            key={acc.account.headers.account_no.value + index}
                                            label1={acc.account.headers.account_no.value}
                                            label2={acc.account.headers.balance.value}
                                            index={index}
                                            styles='blue'
                                        >
                                            <DropdownTableMenu styles='blue' mainMenu={acc.account.body} leftMenu />
                                        </DropdownTableItem>
                                    );
                                })
                            ) : (
                                null
                            )
                        }
                    </DropdownTable>
                </DropdownElement>
                <DropdownElement icon={autoIcon} header='Auto'>
                    <DropdownTable headers={headers}>
                        {
                            myAccounts[2] ? (
                                myAccounts[2].map((acc, index) => {
                                    return (
                                        <DropdownTableItem
                                            key={acc.account.headers.account_no.value + index}
                                            label1={acc.account.headers.account_no.value}
                                            label2={acc.account.headers.balance.value}
                                            index={index}
                                            styles='blue'
                                        >
                                            <DropdownTableMenu styles='blue' mainMenu={acc.account.body} leftMenu />
                                        </DropdownTableItem>
                                    );
                                })
                            ) : (
                                null
                            )
                        }
                    </DropdownTable>
                </DropdownElement>
                <DropdownElement icon={incomeIcon} header='Income'>
                    <DropdownTable headers={headers}>
                        {
                            myAccounts[3] ? (
                                myAccounts[3].map((acc, index) => {
                                    return (
                                        <DropdownTableItem
                                            key={acc.account.headers.account_no.value + index}
                                            label1={acc.account.headers.account_no.value}
                                            label2={acc.account.headers.balance.value}
                                            index={index}
                                            styles='blue'
                                        >
                                            <DropdownTableMenu styles='blue' mainMenu={acc.account.body} leftMenu />
                                        </DropdownTableItem>
                                    );
                                })
                            ) : (
                                null
                            )
                        }
                    </DropdownTable>
                </DropdownElement>
                <DropdownElement icon={loansIcon} header='Loan'>
                    <DropdownTable headers={headers}>
                        {
                            myAccounts[4] ? (
                                myAccounts[4].map((acc, index) => {
                                    return (
                                        <DropdownTableItem
                                            key={acc.account.headers.account_no.value + index}
                                            label1={acc.account.headers.account_no.value}
                                            label2={acc.account.headers.balance.value}
                                            index={index}
                                            styles='blue'
                                        >
                                            <DropdownTableMenu styles='blue' mainMenu={acc.account.body} leftMenu />
                                        </DropdownTableItem>
                                    );
                                })
                            ) : (
                                null
                            )
                        }
                    </DropdownTable>
                </DropdownElement>
                <DropdownElement icon={otherIcon} header='Other'>
                    <DropdownTable headers={headers}>
                        {
                            !myAccounts[5].length ? (
                                myAccounts[5].map((acc, index) => {
                                    return (
                                        <DropdownTableItem
                                            key={acc.account.headers.account_no.value + index}
                                            label1={acc.account.headers.account_no.value}
                                            label2={acc.account.headers.balance.value}
                                            index={index}
                                            styles='blue'
                                        >
                                            <DropdownTableMenu styles='blue' mainMenu={acc.account.body} leftMenu />
                                        </DropdownTableItem>
                                    );
                                })
                            ) : (
                                null
                            )
                        }
                    </DropdownTable>
                </DropdownElement>
                <DropdownElement icon={marketIcon} header='Market'>
                    <DropdownTable headers={headers}>
                        {
                            myAccounts[6] ? (
                                myAccounts[6].map((acc, index) => {
                                    return (
                                        <DropdownTableItem
                                            key={acc.account.headers.account_no.value + index}
                                            label1={acc.account.headers.account_no.value}
                                            label2={acc.account.headers.balance.value}
                                            index={index}
                                            styles='blue'
                                        >
                                            <DropdownTableMenu styles='blue' mainMenu={acc.account.body} leftMenu />
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
        </div >
    )
}

export default MyAccounts
