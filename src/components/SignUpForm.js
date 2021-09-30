
import React, { useState } from 'react';
import './styles/Form.css';
import FormSignup from './SignUp';
import FormSuccess from './FormSuccess';


/**
 * The form used by {@link FormSignup} for sing up into the system
 * @returns the actual form in {@link FormSignup}
 */
const SignUpForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default SignUpForm;