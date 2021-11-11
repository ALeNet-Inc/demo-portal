import Cookies from "js-cookie";

/**
 * Class with helper functions to process @module ClientixAPI data
 */
export default class DataProcessingUtil {

    /**
     * Function to process the trust information stored by the @module ClientixAPI [MY_FICO]{@link http://oxygen.alenet.com/clx56dev/apirest.php?classname=MY_FICO} endpoint in the user's local storage.
     * @returns An HTML table with the extracted trust information from the user's local storage
     */
    populateTable() {

        //obtain trust infromation from user's local storage and process to json. propArray contains all trustProperties.
        let myTrusts = sessionStorage.getItem('myTrusts');
        let trustsObj = JSON.parse(myTrusts);
        if(!trustsObj[0].objects) {
            return null;
        }
        let trustsProperties = trustsObj.map(trust => {
            return trust.objects.map(elem => {
                return elem.objects.map(obj => {
                    return obj;
                });
            })
        });
        let propArray = trustsProperties[0];

        /*ARRAY SETUP: elem[0] : ID, elem[1] : FICO No., elem[2] : Contract No., elem[3] : irrelevant
                       elem[4] : Contract Name, elem[5] : Contract Start date, elem[6]: irrelevant, elem[7] : Trust type */
        let trustInfo = propArray.map((elem, index) => {
            let date = new Date(elem[5].contents); //Pretty format the date for usability.
            let year = new Intl.DateTimeFormat(Cookies.get('i18next'), { year: 'numeric' }).format(date);
            let month = new Intl.DateTimeFormat(Cookies.get('i18next'), { month: 'short' }).format(date);
            let day = new Intl.DateTimeFormat(Cookies.get('i18next'), { year: '2-digit' }).format(date);
            let dateString = `${year}-${month}-${day}`;
            return (
                <tr key={index}>
                    <td className='fico-contract-num' key="{elem[2]}">{this.removeUglyChars(elem[2].contents)}</td>
                    <td className='fico-contract-name' key="{elem[4]}">{this.removeUglyChars(this.toTitleCase(elem[4].contents))}</td>
                    <td className='fico-contract-date' key="{elem[5]}">{dateString}</td>
                    <td className='fico-type' key="{elem[7]}">{elem[7].contents}</td>
                </tr>
            )
        })
        return trustInfo;
    }

    /**
     * Function to process the trust information stored by the @module ClientixAPI [MY_TRANSACT]{@link http://oxygen.alenet.com/clx56dev/apirest.php?classname=MY_TRANSACT} endpoint in the user's local storage.
     * @returns An HTML table with the extracted trust information from the user's local storage
     */
    populateTransactions() {
        //obtain transaction infromation from user's local storage and process to json. propArray contains all trustProperties.
        let myTransactions = sessionStorage.getItem('myTransactions');
        let transactionObj = JSON.parse(myTransactions);
        if (!transactionObj[0].objects) {
            return null;
        }
        let transactionProperties = transactionObj.map(transaction => {
            return transaction.objects.map(elem => {
                return elem.objects.map(obj => {
                    return obj;
                });
            })
        });

        let propArray = transactionProperties[0];

        let dollarUs = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        /*ARRAY SETUP: 0=ID, 1=IDCODE , 3=EFFTDATE  5=REVERSAL_PEND 6=TRANSTBL_CODE
                        7=CURRENCY_CODE 8=TRANS_AMT 9=TAXABLE_AMT 10=TAX_AMT 11=TOTAL_AMT 12=EXCHANGE_RT 13=BASE_TRANS_AMT
                        14=CONTRACT_NAME 15=DISBURSEMENT_TYPE 16=VOID 17=CHECK_NO 18=CHECK_PRINT_DATI 19=CHECK_PRINT_BY */
        let transInfo = propArray.map((elem, index) => {
            let status = elem[4].contents
            let ammount = dollarUs.format(parseFloat(elem[8].contents))
            let name = this.toTitleCase(elem[2].contents)
            let contract = this.toTitleCase(elem[14].contents)
            return (
                <tr key={index}>
                    <td className='trans-status' key="{elem[4]}">{status}</td>
                    <td className='trans-ammount' key="{elem[8]}">{ammount}</td>
                    <td className='trans-name' key="{elem[2]}">{name}</td>
                    <td className='trans-contract' key="{elem[14]}">{contract}</td>
                </tr>
            )
        })
        return transInfo;
    }

    populateAccounts() {
        //obtain transaction infromation from user's local storage and process to json. propArray contains all trustProperties.
        let myAccounts;
        let accountObj = JSON.parse(myAccounts);
        if (!accountObj[0].objects) {
            return null;
        }
        let accountProperties = accountObj.map(account => {
            return account.objects.map(elem => {
                return elem.objects.map(obj => {
                    return obj;
                });
            })
        });

        let propArray = accountProperties[0];
        console.log(propArray);

        let dollarUs = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        /*ARRAY SETUP: 0=Company, 1=account type, 3=account_code,  4=account_no, 5=contract_name, 7=balance, 8=interest_earned, 9=interest_paid */
        let accountInfo = propArray.map((elem, index) => {
            let account_type = elem[1].contents
            let account_no = elem[4].contents
            let balance = dollarUs.format(parseFloat(elem[7].contents))
            let int_earned = dollarUs.format(parseFloat(elem[8].contents))
            return (
                <tr key={index}>
                    <td className='acc-type' key="{elem[1]}">{account_type}</td>
                    <td className='acc-no' key="{elem[4]}">{account_no}</td>
                    <td className='acc-balance' key="{elem[7]">{balance}</td>
                    <td className='acc-int_earned' key="{elem[8]">{int_earned}</td>
                </tr>
            )

        })
        return accountInfo;
    }

    /**
     * Function to turn a string into "Title Casing"
     * @param {*} str the string to be processed
     * @returns the "Title Cased" string
     */
    toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    /**
     * Removes ugly chars
     */
    removeUglyChars(str) {
        return str.replace(
            /_/g,
            " "
        )
    }
}