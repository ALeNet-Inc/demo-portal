import Cookies from 'js-cookie'
import DataProcessingUtil from './DataProcessingUtil';
/* A class to use the Clientix API endpoints */

export default class ClientixAPI {

    //Defining default fields for REST API call:
    constructor() {
        this.sessionToken = Cookies.get("session_token"); // Session token obtained at log in.
        this.language = Cookies.get("i18next"); // Language token from cookies.
        this.headers = new Headers(); // Headers for the call.
        this.headers.append("Cookie", "PHPSESSID=" + this.sessionToken);
        this.requestOptions = {
            mode: 'cors', // cors-policy adherent
            headers: this.headers,
            redirect: 'follow'
        }
        this.method = {
            get: 'GET',
            post: 'POST',
            delete: 'DELETE'
        }
    }

    /**
     * Function: Uses Clientix clxLogin Endpoint to log a user into the system. Function is asynchrnous
     * @param username The username to be logged into the system.
     * @param password The password to be logged into the system.
     * @returns: None. Automatically sets a session token to the User's cookies 
     */
    async login(username, password, showLoader) {
        showLoader()
        this.requestOptions.method = this.method.post; // append method of call to request options
        await fetch("https://eportal.clientix.com/clx56dev/apirest.php?username=" + (username) + "&password=" + (password) + "&language=" + (this.language) + "&classname=clxLogin", this.requestOptions)
            .then(response => response.text())
            .then(result => {
                let token = JSON.parse(result);
                this.session_token = token.Token;
                Cookies.set("session_token", this.session_token)
            })
            .catch(error => console.log('error', error));
    }

    /**
     * Function: Uses Clientix GetSessionData Endpoint to retrieve information about account usage. Function is asynchronous. Timeout of 1.5s.
     * @param: None, automatically retrieves a session token from the user's cookies.
     * @returns: Sets account information to the respective elements in the HTML with the appropriate ID's.
     */
    async getAccountInfo() {
        this.sessionToken = Cookies.get("session_token")
        this.requestOptions.method = this.method.get; // append method of call to request options
        await fetch("https://eportal.clientix.com/clx56dev/apirest.php?classname=clxGetSessionData&CLX_SESSION_ID=" + this.sessionToken, this.requestOptions)
            .then(response => response.json())
            .then(result => {
                let account = JSON.stringify(result);
                let accountInfo = JSON.parse(account);
                sessionStorage.setItem('FIRSTNAME', accountInfo.session_data.FIRSTNAME);
                sessionStorage.setItem('LASTNAME', accountInfo.session_data.LASTNAME);
                sessionStorage.setItem('EMAIL', accountInfo.session_data.EMAIL);
                sessionStorage.setItem('PHONE', accountInfo.session_data.PHONE);
            })
            .catch(error => console.log('error', error))
    }

    /**
     * Function: Uses Clientix MY_FICO Endpoint to retrieve the user's trust information. Function is asynchronous. Timeout of 1.5s.
     * @param: None, automatically retrieves a session token from the user's cookies.
     * @returns: Sets trusts to the user's local storage to be retrieved and processed.
     */
    async getUserTrusts() {
        let dataUtil = new DataProcessingUtil();
        this.sessionToken = Cookies.get("session_token");
        this.language = Cookies.get("i18-next")
        this.requestOptions.method = this.method.get; // append method of call to request options
        await fetch("https://eportal.clientix.com/clx56dev/apirest.php?classname=MY_FICO&CLX_SESSION_ID=" + this.sessionToken + "&language=" + this.language, this.requestOptions)
            .then(response => response.json())
            .then(result => {
                let myTrustsJson = JSON.stringify(result)
                if (myTrustsJson != null) {
                    sessionStorage.setItem('myTrusts', JSON.stringify(dataUtil.populateTrusts(myTrustsJson)));
                }
            })
            .catch(error => console.log('error', error))
    }

    /**
     * Function: Uses Clientix MY_FICO Endpoint to retrieve the user's trust information. Function is asynchronous. Timeout of 1.5s.
     * @param: None, automatically retrieves a session token from the user's cookies.
     * @returns: Sets trusts to the user's local storage to be retrieved and processed.
     */
     async getUserTransactions(hideLoader) {
        let dataUtil = new DataProcessingUtil();
        this.sessionToken = Cookies.get("session_token");
        this.requestOptions.method = this.method.get; // append method of call to request options
        await fetch("https://eportal.clientix.com/clx56dev/apirest.php?classname=MY_TRANSACT&CLX_SESSION_ID=" + this.sessionToken, this.requestOptions)
            .then(response => response.json())
            .then(result => {
                let myTransactionsJson = JSON.stringify(result)
                if (myTransactionsJson != null) {
                    sessionStorage.setItem('myTransactions', JSON.stringify(dataUtil.populateTransactions(myTransactionsJson)));
                    hideLoader()
                }
            })
            .catch(error => console.log('error', error))
    }

    async getUserAccounts() {
        let dataUtil = new DataProcessingUtil();
        this.sessionToken = Cookies.get("session_token");
        this.requestOptions.method = this.method.get;
        await fetch("https://eportal.clientix.com/clx56dev/apirest.php?classname=MY_PRODUCT&CLX_SESSION_ID=" + this.sessionToken, this.requestOptions)
            .then(response => response.json())
            .then(result => {
                let myAccountsJson = JSON.stringify(result)
                if(myAccountsJson != null) {
                    sessionStorage.setItem('myAccounts', JSON.stringify(dataUtil.populateAccounts(myAccountsJson)))
                } 
            })
    }



    /**
     * Function: Uses Clientix ServRequestLoad to get the options for a service request. Function is asynchronous. Timeout of 1.5 seconds.
     * No Parameters.
     * @returns Sets service request options to the user's local storage to be retrieved and processed.
     */
    async submitServiceRequest(subject, info, serviceOptions) {
        this.sessionToken = Cookies.get("session_token");
        setTimeout(async () => {

            console.log("Sending...")

            let key = serviceOptions.filter(option => {
                return option.key ? subject === option.value : 0
            })

            console.log("Subject: " + subject)

            this.requestOptions.method = this.method.get;

             console.log("KEY: " + key[0].key)

            let urlPrep = "https://eportal.clientix.com/clx56dev/apirest.php?classname=ServRequestLoad&CLX_SESSION_ID=" + this.sessionToken;
            urlPrep += "&FIRSTNAME=" + sessionStorage.getItem('FIRSTNAME');
            urlPrep += "&LASTNAME=" + sessionStorage.getItem('LASTNAME');
            urlPrep += "&EMAIL=" + sessionStorage.getItem('EMAIL');
            urlPrep += "&PHONE=" + sessionStorage.getItem('PHONE');
            urlPrep += "&REQ_TYPE=" + key[0].key;
            urlPrep += "&SUBJECT=" + subject;
            urlPrep += "&ADD_INFO=" + info;
            urlPrep += "&EXT_REF_NO=API001";
            urlPrep += "&DEPARTMENT_CODE=000001";
            urlPrep += "&REQ_SOURCE=0010";
            urlPrep += "&ASSIGNEDTO_USER=salegrett";

            console.log("URL" + urlPrep)


            await fetch(urlPrep, this.requestOptions)
                .then(response => response.json())
                .then(result => {
                    let servRequestOptions = JSON.stringify(result)
                    if (servRequestOptions != null) {
                        sessionStorage.setItem('serviceRequestStatus', servRequestOptions);
                    }
                })
                .catch(error => console.log('error', error));
        }, 0);
    }

    logOut() {
        Cookies.remove('session_token');
        localStorage.clear();
        sessionStorage.clear();
    }


    async getUserData(username, password, showLoader, hideLoader) {
        await this.login(username, password, showLoader)
        await this.getAccountInfo()
        await this.getUserTrusts()
        await this.getUserAccounts()
        return await this.getUserTransactions(hideLoader)
    }
}