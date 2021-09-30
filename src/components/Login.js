import React from 'react';
import validate from '../functions/validateInfoLogin'
import useForm from '../functions/useForm';
import { useTranslation } from "react-i18next";
import useFullPageLoader from '../functions/useFullPageLoader';
import './styles/FormLogin.css'

/* A Login component that will return a form */

const Login = ({ submitForm }) => {

  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const { t } = useTranslation();
  const { handleChange, handleSubmit, values, errors } = useForm(
    showLoader,
    hideLoader,
    submitForm,
    validate
  );


  return (
    <>
      <div className='form-content-2'>
        <form onSubmit={handleSubmit} className='form-2' noValidate>
          <h1>
            {t('login_prompt')}
          </h1>
          <div className='form-inputs-2'>
            <label className='form-label-2'>{t('username')}</label>
            <input
              className='form-input-2'
              type='text'
              name='username'
              placeholder={t('username_placeholder')}
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div className='form-inputs-2'>
            <label className='form-label-2'>{t('password')}</label>
            <input
              className='form-input-2'
              type='password'
              name='password'
              placeholder={t('password_placeholder')}
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <button className='form-input-btn-2' type='submit'>
            {t('login')}
          </button>
        </form>
      </div>
      {loader}
    </>
  );
};

export default Login;
