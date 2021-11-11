import React from 'react'
import ErrorPage from '../components/ErrorPage'

function LoginError() {
  return (<ErrorPage previousPage='/login' message='Your credentials could not be found in our System.' />)
}

export default LoginError
