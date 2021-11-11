import React, { useMemo } from 'react'
import './styles/MyTrusts.css'
import { useTranslation } from 'react-i18next';
import DataProcessingUtil from '../functions/DataProcessingUtil';
import Sidebar from '../components/SideMenu'
import Table from '../components/Table';
import { useHistory } from 'react-router';

/* A page with all trust banking information for a user */

function MyTrusts() {

    //Populate HTML table with Trust information
    const dataProcessor = new DataProcessingUtil();
    const myTrusts = dataProcessor.populateTrusts();
    const history = useHistory();

    if (myTrusts === null) {
        history.push('/trusts-error');
    }

    const { t } = useTranslation(); //react-i18-next

    const columns = useMemo(
        () => [
            {
                Header: t('contract-no'),
                accessor: "trust.contract_no"
            },
            {
                Header: t('contract-name'),
                accessor: "trust.contract_name"
            },
            {
                Header: t('fico-type'),
                accessor: "trust.fico_type"
            },
            {
                Header: t('contract-date'),
                accessor: "trust.date"
            },
        ],
        [t]
    );
    return (
        <div className='mytrusts'>
            <Sidebar className='sidebar' />
            <div className='my-trusts-container'>
                <h1 className='my-trusts-title'>{t('my-trusts')}</h1>
                <Table columns={columns} data={myTrusts} name='custom-table'/>
            </div>
        </div>
    )
}

export default MyTrusts
