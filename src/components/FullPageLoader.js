import React from 'react'
import './styles/FullPageLoader.css'

const FullPageLoader = () => {
    return (
        <div className='load-container'>
            <img src='images/loader.gif' className='loader' alt='loading' />
        </div>
    )
}

export default FullPageLoader
