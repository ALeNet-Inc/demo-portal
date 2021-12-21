import React from 'react';
import './styles/MyTrusts.css';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/SideMenu';
import { useHistory } from 'react-router';
import DropdownTable, { DropdownTableMenu, DropdownTableItem } from '../components/DropdownTable';
import DropdownElement from '../components/DropdownElement';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

/* A page with all trust banking information for a user */

function MyTrusts() {

    //Populate HTML table with Trust information
    const myTrusts = JSON.parse(sessionStorage.getItem('myTrusts'))
    const history = useHistory();

    if (myTrusts === null) {
        history.push('/trusts-error');
    }

    const { t } = useTranslation(); //react-i18-next

    const realEstateIcon = <BsIcons.BsHouse style={{ color: 'rgb(179, 197, 197)' }} />
    const marketIcon = <BsIcons.BsGraphUp style={{ color: 'rgb(179, 197, 197)' }} />
    const otherIcon = <BsIcons.BsThreeDots style={{ color: 'rgb(179, 197, 197)' }} />
    const adminIcon = <FaIcons.FaUser style={{ color: 'rgb(179, 197, 197)' }} />
    const guaranteesIcon = <MdIcons.MdAttachMoney style={{ color: 'rgb(179, 197, 197)' }} />
    const icons = [adminIcon, realEstateIcon, marketIcon, guaranteesIcon, otherIcon, otherIcon]
    const tableHeaders = [t('contract-date'), t('contract-name')];
    const sectionHeaders = [t('admin'), t('real-estate'), t('inv'), t('guar'), t('ret'), t('other')];
    return (
        <div className='mytrusts'>
            <Sidebar className='sidebar' />
            <div className='my-trusts-container'>
                <h1 className='my-trusts-title'>{t('my-trusts')}</h1>
                {
                    myTrusts.map((section, index) => {
                        return (
                            section ? (
                                <DropdownElement icon={icons[index]} header={sectionHeaders[index]} key={index}>
                                    <DropdownTable headers={tableHeaders}>
                                        {
                                            section.map((trust) => {
                                                return (
                                                    <DropdownTableItem
                                                        key={trust.id}
                                                        label1={trust.headers.date}
                                                        label2={trust.headers.contract_name}
                                                        index={trust.id}
                                                        styles='grey'
                                                    >
                                                        <DropdownTableMenu styles='grey' mainMenu={trust.body} leftMenu />
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

export default MyTrusts
