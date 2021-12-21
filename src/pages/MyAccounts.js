import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import SideMenu from '../components/SideMenu'
import DropdownTable, { DropdownTableMenu, DropdownTableItem } from '../components/DropdownTable';
import DropdownElement from '../components/DropdownElement';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import './styles/MyAccounts.css'

function MyAccounts() {

    const { t } = useTranslation();

    const myAccounts = JSON.parse(sessionStorage.getItem('myAccounts'));
    const history = useHistory();

    if (myAccounts === null) {
        history.push('/accounts-error');
    }

    const tableHeaders = [t('account_no'), t('balance')];
    const sectionHeaders = [t('real-estate'), t('checking'), t('auto'), t('income'), t('loans'), t('inv'), t('other')];
    const realEstateIcon = <BsIcons.BsHouse style={{color: 'rgb(179, 197, 197)'}}  />
    const checkingIcon = <FaIcons.FaMoneyCheckAlt style={{color: 'rgb(179, 197, 197)'}}  />
    const autoIcon = <AiIcons.AiFillCar style={{color: 'rgb(179, 197, 197)'}}  />
    const incomeIcon = <FaIcons.FaMoneyBillWave style={{color: 'rgb(179, 197, 197)'}}  />
    const loansIcon = <FaIcons.FaMoneyCheck style={{color: 'rgb(179, 197, 197)'}}  />
    const marketIcon = <BsIcons.BsGraphUp style={{color: 'rgb(179, 197, 197)'}}  />
    const otherIcon = <BsIcons.BsThreeDots style={{color: 'rgb(179, 197, 197)'}}  />
    const icons = [realEstateIcon, checkingIcon, autoIcon, incomeIcon, loansIcon, marketIcon, otherIcon];

    return (
        <div className='myaccounts'>
            <SideMenu />
            <div className='my-accounts-container'>
                <h1 className='my-accounts-title'>{t('my-accounts')}</h1>
                {
                    myAccounts.map((section, index) => {
                        return (
                            section ? (
                                <DropdownElement icon={icons[index]} header={sectionHeaders[index]} key={index}>
                                    <DropdownTable headers={tableHeaders}>
                                        {
                                            section.map((acc) => {
                                                return (
                                                    <DropdownTableItem
                                                        key={acc.id}
                                                        label1={acc.headers.account_no}
                                                        label2={acc.headers.balance}
                                                        index={acc.id}
                                                        styles='grey'
                                                    >
                                                        <DropdownTableMenu styles='grey' mainMenu={acc.body} leftMenu />
                                                    </DropdownTableItem>
                                                );
                                            })
                                        }
                                    </DropdownTable>
                                </DropdownElement>
                            )
                                :
                                (null)
                        );
                    })
                }
            </div>
        </div >
    )
}

export default MyAccounts
