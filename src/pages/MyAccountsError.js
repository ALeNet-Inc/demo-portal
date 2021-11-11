import React from 'react'
import ErrorPage from '../components/ErrorPage'

function MyAccountsError() {
  return (
    <ErrorPage previousPage='/account' message='We found no products   for your account' />
  )
}

export default MyAccountsError
