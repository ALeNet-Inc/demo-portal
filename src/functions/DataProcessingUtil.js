import Cookies from "js-cookie";

/**
 * Class with helper functions to process @module ClientixAPI data
 */
export default class DataProcessingUtil {

    /**
     * Function to process the trust information stored by the @module ClientixAPI [MY_FICO]{@link http://oxygen.alenet.com/clx56dev/apirest.php?classname=MY_FICO} endpoint in the user's local storage.
     * @returns An HTML table with the extracted trust information from the user's local storage
     */
    populateTrusts() {
        //obtain trust infromation from user's local storage and process to json. propArray contains all trustProperties.
        let myTrusts = sessionStorage.getItem('myTrusts');
        let trustsObj = JSON.parse(myTrusts);
        if (!trustsObj[0].objects) {
            return null;
        }
        let trustObjectArray = trustsObj[0].objects;
        let trustArray = trustObjectArray.map(obj => {
            return obj.objects;
        })

        /*ARRAY SETUP: elem[0] : ID, elem[1] : FICO No., elem[2] : Contract No., elem[3] : irrelevant
                       elem[4] : Contract Name, elem[5] : Contract Start date, elem[6]: irrelevant, elem[7] : Trust type */
        let trustInfo = trustArray.map((elem) => {
            let date = new Date(elem[5].contents); //Pretty format the date for usability.
            let year = new Intl.DateTimeFormat(Cookies.get('i18next'), { year: 'numeric' }).format(date);
            let month = new Intl.DateTimeFormat(Cookies.get('i18next'), { month: 'short' }).format(date);
            let day = new Intl.DateTimeFormat(Cookies.get('i18next'), { year: '2-digit' }).format(date);
            let dateString = `${year}-${month}-${day}`;
            let contractNo = this.removeUglyChars(elem[2].contents);
            let contractName = this.removeUglyChars(this.toTitleCase(elem[4].contents));
            let ficoType = this.removeUglyChars(this.toTitleCase(elem[7].contents));
            return {
                "trust": {
                    contract_no: contractNo,
                    contract_name: contractName,
                    fico_type: ficoType,
                    date: dateString
                }
            }
        })

        let filteredInfo = trustInfo.filter((trust, index, self) => (
            index === self.findIndex((t) => (
                trust.trust.fico_type !== "" && t.trust.contract_no === trust.trust.contract_no && t.trust.contract_name === trust.trust.contract_name
            ))
        ))

        return filteredInfo;
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
        let transactionArray = transactionObj[0].objects.map(obj => { return obj.objects } );
        let dollarUs = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        })
        /*
        ARRAY SETUP: 0=ID, 1=IDCODE , 3=EFFTDATE, 4=STATUS  5=REVERSAL_PEND 6=TRANSTBL_CODE
        7=CURRENCY_CODE 8=TRANS_AMT 9=TAXABLE_AMT 10=TAX_AMT 11=TOTAL_AMT 12=EXCHANGE_RT 13=BASE_TRANS_AMT
        14=CONTRACT_NAME 15=DISBURSEMENT_TYPE 16=VOID 17=CHECK_NO 18=CHECK_PRINT_DATI 19=CHECK_PRINT_BY 
        */
        let transactionInfo = transactionArray.map(elem => {
            let status = this.removeUglyChars(this.toTitleCase(elem[4].contents));
            let amt = dollarUs.format(parseFloat(elem[11].contents));
            let contract = this.removeUglyChars(this.toTitleCase(elem[14].contents))
            let name = this.removeUglyChars(this.toTitleCase(elem[2].contents))
            return {
                "transaction" : {
                    status : status,
                    ammount : amt,
                    contract : contract,
                    name : name
                }
            }
        })
        let filteredInfo = transactionInfo.filter((transaction, index, self) => (
            index === self.findIndex((t) => (
                t.transaction.contract === transaction.transaction.contract && t.transaction.name === transaction.transaction.name
            ))
        ))
        console.log(filteredInfo)
        return filteredInfo;
    }

    populateAccounts() {
        //obtain transaction infromation from user's local storage and process to json. propArray contains all trustProperties.
        let myAccounts = sessionStorage.getItem('myAccounts');
        let accountObjArray = JSON.parse(myAccounts);
        if (!accountObjArray[0].objects) {
            return null;
        }
        let accountArray = accountObjArray[0].objects.map(obj => { return obj.objects });
        let dollarUs = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        })
        let accountInfo = accountArray.map(elem => {
            let accountType = this.removeUglyChars(this.toTitleCase(elem[1].contents));
            let accountNo = this.removeUglyChars(elem[4].contents);
            let balance = dollarUs.format(parseFloat(elem[7].contents));
            let intEarned = dollarUs.format(parseFloat(elem[8].contents));
            return {
                "account" : {
                    type: accountType,
                    account_no: accountNo,
                    balance: balance,
                    int_earned: intEarned
                }
            }
        })

        let filteredInfo = accountInfo.filter((acc, index, self) => (
            index === self.findIndex((t) => (
                t.account.account_no === acc.account.account_no
            ))
        ))

        return filteredInfo;
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