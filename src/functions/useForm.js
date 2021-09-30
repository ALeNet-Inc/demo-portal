import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import ClientixApi from './ClientixAPI'


/**
 * A Function to use the login and singup forms, validate information, and define a successful log into the system.
 * @param {*} callback the function takes a callback to a submit function, to submit the login / signup form
 * @param {*} validate the validation parameters to be used for the information.
 * @returns { handleChange, handleSubmit, values, errors } handleCHange is responsible for handling the user's input, 
 *                                                         handleSubmit will handle what happens on form submission,
 *                                                         values will be the respective username password email etc...
 *                                                         errors defined for using the form, no empty values, and password validation etc...
 */
const useForm = (showLoader, hideLoader, callback1, validate) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true)
    };

    useEffect(
        () => {
            let api = new ClientixApi()
            if ((Object.keys(errors).length === 0 ) && (isSubmitting === true)) {
                Cookies.remove('session_token')
                sessionStorage.clear()
                localStorage.clear()
                callback1(api, values.username, values.password, showLoader, hideLoader)
            }
        },
        // eslint-disable-next-line 
        [errors]
    );

    return { handleChange, handleSubmit, values, errors };
};

export default useForm;