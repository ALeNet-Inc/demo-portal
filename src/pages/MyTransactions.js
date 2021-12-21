import React from 'react'
import './styles/MyTransactions.css'
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/SideMenu';
import DropdownTable, { DropdownTableMenu, DropdownTableItem } from '../components/DropdownTable';
import { useHistory } from 'react-router';
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import DropdownElement from '../components/DropdownElement';

/* A page with all transaction banking information for a user */

function MyTransactions() {

    //Populate HTML table with transaction information
    const mytransactions = JSON.parse(sessionStorage.getItem('myTransactions'))
    const history = useHistory();

    const { t } = useTranslation(); //react-i18-next

    if (mytransactions === null) {
        history.push('/transactions-error');
    }
    const tableHeaders = [t('transaction-amt'), t('date')];
    const sectionHeaders = [t('approved'), t('pending'), t('rejected')];
    const approvalIcon = <AiIcons.AiFillCheckCircle style={{ color: 'green' }} />
    const rejectedIcon = <FaIcons.FaTimesCircle style={{ color: 'red' }} />
    const pendingIcon = <AiIcons.AiFillClockCircle style={{ color: 'gold' }} />
    const icons = [approvalIcon, pendingIcon, rejectedIcon];
    const styles = ['approved', 'pending', 'rejected'];


    return (
        <div className='mytransactions'>
            <Sidebar />
            <div className='my-transactions-container'>
                <h1 className='my-transactions-title'>{t('my-transactions')}</h1>
                {
                    mytransactions.map((section, index) => {
                        return (
                            section ? (
                                <DropdownElement icon={icons[index]} header={sectionHeaders[index]} key={sectionHeaders[index]}>
                                    <DropdownTable headers={tableHeaders}>
                                        {
                                            section.map((transaction) => {
                                                return (
                                                    <DropdownTableItem
                                                        key={transaction.id}
                                                        label1={transaction.headers.amount}
                                                        label2={transaction.headers.date}
                                                        index={transaction.id}
                                                        styles={styles[index]}
                                                    >
                                                        <DropdownTableMenu styles={styles[index]} mainMenu={transaction.body} leftMenu />
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
        </div>
    )
}

export default MyTransactions
