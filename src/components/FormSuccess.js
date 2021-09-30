import React from 'react';
import './styles/Form.css';
import { useTranslation } from 'react-i18next'

/* Defines Sign Up Success behavior */
const FormSuccess = () => {
  const {t} = useTranslation();
  return (
    <div className='form-content-right'>
      <h1 className='form-success'>{t('signup_success')}</h1>
      <img className='form-img-2' src='images/img-2.png' alt='success' />
    </div>
  );
};

export default FormSuccess;