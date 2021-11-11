import React from 'react'
import ErrorPage from '../components/ErrorPage'

function MyTransactionsError() {
  return (
    <ErrorPage previousPage='/account' message='We found no transactions for your account.' />
  )
}

export default MyTransactionsError
