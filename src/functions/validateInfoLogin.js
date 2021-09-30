export default function validateInfoLogin(values) {

    let errors = {}

    if (!values.username.trim()) {
        errors.username = "Username required"
    }

    if (!values.password) {
        errors.password = 'Password is required'
    } else if (values.password.length < 5) {
        errors.password = 'Password must be 8 characters or more'
    }

    return errors;
}