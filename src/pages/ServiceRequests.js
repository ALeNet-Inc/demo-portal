import { React, useState } from 'react'
import { useTranslation } from 'react-i18next';
import * as FaIcons from 'react-icons/fa';
import ClientixAPI from '../functions/ClientixAPI';
import Dropdown from '../components/Dropdown'
import TextArea from '../components/TextArea'
import Sidebar from '../components/SideMenu'
import Popup from '../components/Popup'
import './styles/ServiceRequests.css'

function ServiceRequests() {

    const { t } = useTranslation(); //react-i18-next

    const [serviceOption, setServiceOption] = useState(t('serv101'))
    const [file, setFile] = useState(null);
    const [base64, setBase64] = useState(null);
    const [info, setInfo] = useState('')

    const textHandler = information => setInfo(information.value)
    const dropdownHandler = option => setServiceOption(option.value)


    const api = new ClientixAPI()

    const [buttonPopup, setButtonPopup] = useState(false);

    const handleSubmit = () => {
        api.submitServiceRequest(serviceOption, info, serviceRequestOptions, file, base64)
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

    const convertBase64 = (file) => {
        if (file) {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);

                fileReader.onload = () => {
                    resolve(fileReader.result);
                };

                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
        }
    };

    const uploadImage = async (e) => {
        const fileimg = e.target.files[0];
        const base64file = await convertBase64(fileimg);
        setBase64(base64file);
        console.log(base64file);
        setFile(fileimg.name);
    };

    return (
        <div className='service-requests'>
            <Sidebar />
            <div className='service-form-container'>
                <h1 className='form-title'>{t("customer-support")}</h1>
                <p className='dropdown-prompt'>{t('what-help-with')}</p>
                <div className='top-section'>
                    <Dropdown id='service-dropdown' placeholder={t('what-help-with')} options={serviceRequestOptions} onChange={dropdownHandler} />
                    <br />
                    <label className='upload-prompt'>
                        <input type='file' className='fileUpload' onChange={(e) => uploadImage(e)} />
                        Upload File
                    </label>
                    {
                        file ? <span>{file + ' '}<FaIcons.FaCheckCircle /></span> : null
                    }
                </div>
                <h2 className='text-prompt'>{t('problem-description')}</h2>
                <TextArea onChange={textHandler} />
                <h3 className='contact-prompt'>{t('contact_prompt')}
                    <a className='phone_no' href='tel:+178649-2258'>+1 (786) 749-2258</a>
                    {t('contact_prompt_2')}
                    <a className='email' href='mailto: support@alenet.com'>support@alenet.com</a>
                </h3>
                <button className='service-btn-submit' onClick={handleSubmit}> {t('submit-req')} </button>
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
