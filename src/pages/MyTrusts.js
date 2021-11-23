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
                                const linkedAcc = dataUtil.findAccount(t.trust.body[0].value)
                                console.log(linkedAcc)
                                return (
                                    <DropdownTableItem
                                        key={t.trust.headers.contract_no.value + ' ' + index}
                                        label1={t.trust.headers.contract_no.value}
                                        label2={t.trust.headers.date.value}
                                        index={index}
                                    >
                                        <DropdownTableMenu
                                            mainMenu={t.trust.body}
                                            rightMenu={linkedAcc ? linkedAcc.account.body : null}
                                            rightMenuTitle='Linked Account'
                                        />
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
