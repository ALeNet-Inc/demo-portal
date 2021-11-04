import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from './Button';
import './styles/Footer.css';
import { useTranslation } from 'react-i18next';
import * as FaIcons from 'react-icons/fa'

/* Custom Footer Component */

function Footer() {
    const {t} = useTranslation();

    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    {t('join_newsletter')}
                </p>
                <p className='footer-subscription-text'>
                    {t('unsubscribe_prompt')}
                </p>
                <div className='input-areas'>
                    <form>
                        <input type='email' name='email' placeholder={t('email_placeholder')} className='footer-input'/>
                        <Button buttonSize='btn-medium' link='/products' buttonStyle='btn--primary'>{t('subscribe')}</Button>
                    </form>
                </div>
            </section>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>{t('about_us')}</h2>
                        <Link to='/services'>{t('our_philosophy')}</Link>
                        <Link to='/services'>{t('testimonials')} </Link>
                        <Link to='/services'>{t('careers')} </Link>
                        <Link to='/services'>{t('investors')} </Link>
                        <Link to='/services'>{t('terms_of_service')}</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>{t('social_media')}</h2>
                        <Link to='/services'>Instagram </Link>
                        <Link to='/services'>Facebook </Link>
                        <Link to='/services'>Twitter </Link>
                        <Link to='/services'>Youtube </Link>
                    </div>     
                </div>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>{t('contact_us')}</h2>
                        <Link to='/services'>{t('contact')} </Link>
                        <Link to='/services'>{t('support')} </Link>
                        <Link to='/services'>{t('accounts')} </Link>
                        <Link to='/services'>{t('service')} </Link>
                        <Link to='/services'>{t('sponsorships')} </Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>{t('rewards')}</h2>
                        <Link to='/services'>{t('contact')} </Link>
                        <Link to='/services'>{t('financial_freedom')}</Link>
                        <Link to='/services'>{t('projects')} </Link>
                        <Link to='/services'>{t('loans')} </Link>
                        <Link to='/services'>{t('credit')} </Link>
                    </div>     
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link className='social-logo' to='www.alenet.com'>
                            <img src='/images/clientixlogo.webp' alt='Clientix Logo' className='social-logo-img'></img>
                        </Link>
                    </div>
                    <small className='website-rights'> Powered by Clientix ©2003-2021 ALeNet, Inc.</small>
                    <div className='social-icons'>
                        <Link className='social-icon-link facebook'
                            to='/'
                            target='_blank'
                            aria-label='Facebook'
                        >
                            <FaIcons.FaFacebook />
                        </Link>
                        <Link className='social-icon-link instagram'
                            to='/'
                            target='_blank'
                            aria-label='Instagram'
                        >
                            <FaIcons.FaInstagram />
                        </Link>
                        <Link className='social-icon-link youtube'
                            to='/'
                            target='_blank'
                            aria-label='Youtube'
                        >
                            <FaIcons.FaYoutube />
                        </Link>
                        <Link className='social-icon-link twitter'
                            to='/'
                            target='_blank'
                            aria-label='Twitter'
                        >
                            <FaIcons.FaTwitter />
                        </Link>
                        <Link className='social-icon-link linkedin'
                            to='/'
                            target='_blank'
                            aria-label='LinkedIn'
                        >
                            <FaIcons.FaLinkedin />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer
