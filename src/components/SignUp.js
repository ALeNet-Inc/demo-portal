import React from 'react';
import validate from '../functions/validateinfoSignUp'
import useForm from '../functions/useForm';
import './styles/Form.css';
import { useTranslation } from "react-i18next";

/* Sign up page, takes a form submition handler as an argument for easy management of behavior */
const SignUp = ({ submitForm }) => {
  const { t } = useTranslation();
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <form onSubmit={handleSubmit} className='form' noValidate>
      <h1>
        {t('signup_form_header')}
      </h1>
      <div className='form-inputs'>
        <label className='form-label'>{t('username')}</label>
        <input
          className='form-input'
          type='text'
          name='username'
          placeholder={t('username_placeholder')}
          value={values.username}
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div className='form-inputs'>
        <label className='form-label'>{t('email')}</label>
        <input
          className='form-input'
          type='email'
          name='email'
          placeholder={t('email_placeholder')}
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div className='form-inputs'>
        <label className='form-label'>{t('password')}</label>
        <input
          className='form-input'
          type='password'
          name='password'
          placeholder={t('password_placeholder')}
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div className='form-inputs'>
        <label className='form-label'>{t('confirm_password')}</label>
        <input
          className='form-input'
          type='password'
          name='password2'
          placeholder={t('confirm_password_placeholder')}
          value={values.password2}
          onChange={handleChange}
        />
        {errors.password2 && <p>{errors.password2}</p>}
      </div>
      <button className='form-input-btn' type='submit'>
        {t('sign_up')}
      </button>
      <span className='form-input-login'>
        {t('already_have_acc')} <a href='./login'>{t('here')}</a>
      </span>
    </form>
  );
};

export default SignUp;
