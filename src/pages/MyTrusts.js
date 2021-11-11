import React from 'react'
import './styles/MyTrusts.css'
import { useTranslation } from 'react-i18next';
import DataProcessingUtil from '../functions/DataProcessingUtil';
import Sidebar from '../components/SideMenu'
import { useHistory } from 'react-router';

/* A page with all trust banking information for a user */

function MyTrusts() {

    //Populate HTML table with Trust information
    const dataProcessor = new DataProcessingUtil();
    const myTrusts = dataProcessor.populateTable();
    const history = useHistory();

    if (myTrusts === null) {
        history.push('/trusts-error');
    }

    const { t } = useTranslation(); //react-i18-next

    return (
        <div className='mytrusts'>
            <Sidebar className='sidebar'/>
            <div className='my-trusts-container'>
                <h1 className='my-trusts-title'>{t('my-trusts')}</h1>
                <table className='my-trusts-table'>
                    <thead>
                        <tr className='headers'>
                            <th className='table-header'>{t('contract-no')}</th>
                            <th className='table-header'>{t('contract-name')}</th>
                            <th className='table-header'>{t('contract-date')}</th>
                            <th className='table-header'>{t('fico-type')}</th>
                        </tr>
                    </thead>
                    <tbody id='trusts'>{myTrusts}</tbody>
                </table>
            </div>
        </div>
    )
}

export default MyTrusts
