import React from 'react'
import ErrorPage from '../components/ErrorPage'

function MyTrustsError() {
  return (
    <ErrorPage previousPage='/account' message='We found no trusts for your account.' />
  )
}

export default MyTrustsError

