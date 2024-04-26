import React from 'react';
import { useTranslation } from "react-i18next";
import {Button} from './Button';
import './styles/HeroSection.css';
import '../App.css';
import * as FaIcons from 'react-icons/fa'

/* Custom Home Page Welcome Section Component Displaying a video, buttons for sign up etc.. */

function HeroSection() {
    const {t} = useTranslation();

    return (
        <div className='hero-container'>
            <img src='images/savings.jpg' alt='city' className='background' />
            <h1> {t('achieve_freedom_msg')} </h1>
            <p> {t('waiting_for_msg')} </p>
            <div className='hero-btns'>
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large' link='/signup'>
                {t('create_account_msg')}
                </Button>
                <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large' link='/login'>
                {t('get_started_msg')} <FaIcons.FaPlayCircle className='fa-play-circle'/>
                </Button>
            </div>
        </div>
    )
}

export default HeroSection
