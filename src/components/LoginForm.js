
import React, { useState } from 'react';
import Login from './Login';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import './styles/FormLogin.css'
import Cookies from 'js-cookie';

/**
 * LogIn Form, calls Login the actual form component and also defines states isSubmitted and setIsSubmitted to handle form submission
 * @returns the log in form to be displayed with submission handling.
 */
function LoginForm() {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const history = useHistory()
  function submitForm(api, username, password, showLoader, hideLoader) {
    api.getUserData(username, password, showLoader, hideLoader).then(() => {
      if(Cookies.get('session_token')) {
        setIsSubmitted(true)
      } else {
        history.push('/login-error')
      }
    })
  }

  return (
    <>
      <div className='form-container-2'>
        {!isSubmitted ? (
          <Login submitForm={submitForm} />
        ) : (
          <Redirect to='/account' />
        )}
      </div>
    </>
  );
};

export default LoginForm;