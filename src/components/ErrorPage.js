import React from 'react'
import { useHistory } from 'react-router'
import * as FaIcons from 'react-icons/fa'
import { useTranslation } from 'react-i18next';
import * as AiIcons from 'react-icons/ai';
import './styles/ErrorPage.css'

function ErrorPage(props) {

    const history = useHistory();

    const redirect = () => {
        history.push(props.previousPage);
    }

    const { t } = useTranslation();

    return (
        <div className='error-page'>
            <div className='error-container'>
                <AiIcons.AiFillBank className='error-icon' />
                <h1 className='error-page-title'>{t('error_prompt')}</h1>
                <h2 className='error-page-subtitle'>{t('error_prompt_2')}</h2>
                <h3 className='error-page-message'>{props.message}</h3>
                <h2 className='error-page-subtitle'>{t('try_again')}</h2>
                <button className='error-button' type='button' onClick={redirect}>{t('back')} <FaIcons.FaArrowCircleLeft /></button>
            </div>
        </div>
    )
}

export default ErrorPage
