import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';
import { Dropdown } from 'react-bootstrap';
import i18next from 'i18next'
import { useTranslation } from "react-i18next";
import cookies from 'js-cookie';
import { withRouter } from 'react-router';
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'


/* Current i8next language options available in the dropdown*/
const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb'
  },
  {
    code: 'es',
    name: 'Español',
    country_code: 'es'
  }
]

/* Used for drop down menu for language selection */
const GlobeIcon = ({ width = 24, height = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
</svg>)

/* A Custom Navbar component */

function Navbar(props) {
  const { location } = props
  const currentLanguageCode = cookies.get('i18next') || 'en'; //the current language selected

  const { t } = useTranslation(); //react-i18-next

  const [click, setClick] = useState(false); //mobile menu options
  const [button, setButton] = useState(true); //display for sign up button on navbar

  const handleClick = () => setClick(!click); //handles mobile menu clicks
  const closeMobileMenu = () => setClick(false);

  //Show the button only when window's inner width is <= 960 px
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  //SHow the respectice app title according to language
  useEffect(() => {
    document.title = t('app_title')
    showButton();
  }, [t]);

  //resizing for the window will show or hide button depending on width
  window.addEventListener('resize', showButton);

  if (location.pathname.match('/account')
    || location.pathname.match('/my-trusts')
    || location.pathname.match('/service-request')
    || location.pathname.match('/my-transactions')
    || location.pathname.match('/my-accounts')) {
    return null;
  }

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            {t('banking_portal')}
            <AiIcons.AiFillBank className='bank' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            {click ? (<FaIcons.FaTimes className='fas fa-times' />) : (<FaIcons.FaBars className='fas fa-bars' />)}
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                {t('home')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                {t('services')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                {t('products')}
              </Link>
            </li>
            <li className="nav-item">
              <Dropdown className="dropdown">
                <Dropdown.Toggle className="dropdown-toggle" variant="success" id="dropdown-basic">
                  <GlobeIcon className="globe" /><FaIcons.FaChevronDown id='chevron-down' />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                  <li><span className="dropdow-item-text">{t('language')}</span></li>
                  {languages.map(({ code, name, country_code }) => (
                    <li key={country_code} className="dropdown-list-item">
                      <Dropdown.Item className="dropdown-item"
                        onClick={() => i18next.changeLanguage(code)}
                        disabled={code === currentLanguageCode}>
                        <span className={`flag-icon flag-icon-${country_code} mx-2`} style={{ opacity: code === currentLanguageCode ? 0.3 : 1 }}></span> {/* Deactivate button when the current language is active */}
                        {name}
                      </Dropdown.Item>
                    </li>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className='nav-item'>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                {t('sign_up')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/login'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                {t('login')}
              </Link>
            </li>
          </ul>
          {button && <Button link='/login' buttonStyle='btn--outline'>{t('login')}</Button>}
          {button && <Button link='/sign-up' buttonStyle='btn--outline'>{t('sign_up')}</Button>}
        </div>
      </nav>
    </>
  );
}

export default withRouter(Navbar);
