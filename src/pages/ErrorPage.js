import React from 'react'
import { useHistory } from 'react-router'
import * as FaIcons from 'react-icons/fa'
import { useTranslation } from 'react-i18next';

function ErrorPage(previous_page, message) {

    const history = useHistory();

    const redirect = () => {
        history.push(previous_page);
    }

    const { t } = useTranslation();

    return (
        <div className='error-page'>
            <h1 className='error-page-title'>{t('error_prompt')}</h1>
            <h2 className='error-page-subtitle'>{t('error_prompt_2')}</h2>
            <h3 className='error-page-message'>{message}</h3>
            <h2 className='error-page-subtitle'>{t('try_again')}</h2>
            <button type='button'onClick={redirect}>{t('back')}<FaIcons.FaArrowCircleLeft/></button>
        </div>
    )
}

export default ErrorPage
