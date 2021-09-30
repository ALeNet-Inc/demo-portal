import { React, useState } from 'react'
import './styles/ServiceRequests.css'
import { useTranslation } from 'react-i18next';
import ClientixAPI from '../functions/ClientixAPI';
import Dropdown from '../components/Dropdown'
import TextArea from '../components/TextArea'
import Sidebar from '../components/Sidebar'
import Popup from '../components/Popup'

function ServiceRequests() {

    const { t } = useTranslation(); //react-i18-next

    const [serviceOption, setServiceOption] = useState(t('serv101'))
    const [info, setInfo] = useState('')

    const textHandler = information => setInfo(information.value)
    const dropdownHandler = option => setServiceOption(option.value)


    const api = new ClientixAPI()

    const [buttonPopup, setButtonPopup] = useState(false);

    const handleSubmit = () => {
        api.submitServiceRequest(serviceOption, info, serviceRequestOptions)
        setButtonPopup(true)
    }

    const serviceRequestOptions = [
        { key: '101', value: t('serv101') },
        { key: '104', value: t('serv104') },
        { key: '105', value: t('serv105') },
        { key: '106', value: t('serv106') },
        { key: '112', value: t('serv112') },
        { key: '113', value: t('serv113') },
        { key: '301', value: t('serv301') },
        { key: '305', value: t('serv305') },
        { key: '403', value: t('serv403') },
        { key: '405', value: t('serv405') }
    ]

    return (
        <div className='background'>
            <Sidebar />
            <div className='service-requests'>
                <div className='service-form-container'>
                    <h1 className='form-title'>{t("customer-support")}</h1>
                    <p className='dropdown-prompt'>{t('what-help-with')}</p>
                    <Dropdown id='service-dropdown' placeholder={t('what-help-with')} options={serviceRequestOptions} onChange={dropdownHandler} />
                    <h2 className='text-prompt'>{t('problem-description')}</h2>
                    <TextArea onChange={textHandler} />
                    <h3 className='contact-prompt'>{t('contact_prompt')}
                        <a className='phone_no' href='tel:+178649-2258'>+1 (786) 749-2258</a>
                        {t('contact_prompt_2')}
                        <a className='email' href='mailto: support@alenet.com'>support@alenet.com</a>
                    </h3>
                    <button className='service-btn-submit' onClick={handleSubmit}> {t('submit-req')} </button>
                </div>
            </div>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3>{t('request_success') + serviceOption}</h3>
                <br />
                <p>
                    {"Descripcion: " + info}
                    <br />
                    <br />
                    {t('request_success_2')}
                </p>
            </Popup>
        </div>
    )
}

export default ServiceRequests
