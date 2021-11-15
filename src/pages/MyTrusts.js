import React from 'react'
import './styles/MyTrusts.css'
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/SideMenu'
import { useHistory } from 'react-router';
import DropdownTable, { DropdownTableMenu, DropdownTableItem } from '../components/DropdownTable';
import DataProcessingUtil from '../functions/DataProcessingUtil';

/* A page with all trust banking information for a user */

function MyTrusts() {

    //Populate HTML table with Trust information
    const dataUtil = new DataProcessingUtil();
    const myTrusts = JSON.parse(sessionStorage.getItem('myTrusts'))
    const history = useHistory();

    if (myTrusts === null) {
        history.push('/trusts-error');
    }

    const { t } = useTranslation(); //react-i18-next

    const headers = [t('contract-no'), t('contract-date')];
    return (
        <div className='mytrusts'>
            <Sidebar className='sidebar' />
            <div className='my-trusts-container'>
                <h1 className='my-trusts-title'>{t('my-trusts')}</h1>
                <DropdownTable headers={headers}>
                    {
                        myTrusts ? (
                            myTrusts.map((t, index) => {
                                let linkedAcc = dataUtil.findAccount(t.trust.body[0].value);
                                return (
                                    <DropdownTableItem
                                        key={t.trust.headers.contract_no.value + ' ' + index}
                                        label1={t.trust.headers.contract_no.value}
                                        label2={t.trust.headers.date.value}
                                        index={index}
                                    >
                                        <DropdownTableMenu textItems={t.trust.body} button expansionOpen='Trust' expansionClosed='Linked Account'>
                                            <div className='expansion-container'>
                                                <h2 className='expansion-header'>Linked Accounts</h2>
                                                {
                                                    linkedAcc ? (
                                                        <div className='expansion'>
                                                            <div className='expansion-fields'>
                                                                <label className='dropdown-table-item-label'>
                                                                    <strong>
                                                                        {linkedAcc.account.headers.account_no.label +
                                                                            ': '}
                                                                    </strong> {linkedAcc.account.headers.account_no.value}
                                                                </label>
                                                            </div>
                                                        </div>

                                                    ) : (
                                                        <h2 className='expansion-header'>No Linked Accounts Found</h2>
                                                    )
                                                }
                                            </div>
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

export default MyTrusts
