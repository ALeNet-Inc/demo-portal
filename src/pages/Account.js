import React from 'react';
import './styles/Account.css'
import Cards2 from '../components/Cards2'
import Sidebar from '../components/SideMenu'
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
/* Account Page, displays basic account information and links to all other account pages*/

function Account() {

    const acc_hold = sessionStorage.getItem("FIRSTNAME") + " " + sessionStorage.getItem("LASTNAME")
    const { t } = useTranslation();
    const history = useHistory();

    if(acc_hold === 'undefined undefined' || acc_hold === 'null null') {
        history.push('/login-error');
    }

    return (
        <>
            <Sidebar />
            <div className='account'>
                <h1 id="account-holder" className='acc_name'>{t('welcome') + ' ' + acc_hold}</h1>
                <h3 className='prompt'>{t('what-help-with')}</h3>
                <Cards2 className='card-acc-menu' />
            </div>
        </>
    )
}

export default Account
