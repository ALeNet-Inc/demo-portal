import Cookies from "js-cookie";

/**
 * Class with helper functions to process @module ClientixAPI data
 */
export default class DataProcessingUtil {

    /**
     * Function to process the trust information stored by the @module ClientixAPI [MY_FICO]{@link http://oxygen.alenet.com/clx56dev/apirest.php?classname=MY_FICO} endpoint in the user's local storage.
     * @returns An HTML table with the extracted trust information from the user's local storage
     */
    populateTrusts(myTrusts) {
        //obtain trust infromation from user's local storage and process to json. propArray contains all trustProperties.
        let trustsObj = JSON.parse(myTrusts);
        if (!trustsObj[0].objects) {
            return null;
        }
        let trustObjectArray = trustsObj[0].objects;
        let trustArray = trustObjectArray.map(obj => {
            return obj.objects;
        })

        /*ARRAY SETUP: elem[0] : ID, elem[1] : Clx_Status (irrelevant to the customer), 
                       elem[2] : Contract No., elem[3] : irrelevant, elem[4] : Contract Name, 
                       elem[5] : Contract Start date, elem[6]: irrelevant, elem[7] : Trust type
                       eem[9] : Company Code */
        let trustInfo = trustArray.map((elem, index) => {
            let date = new Date(elem[5].contents); //Pretty format the date for usability.
            let year = new Intl.DateTimeFormat(Cookies.get('i18next'), { year: 'numeric' }).format(date);
            let month = new Intl.DateTimeFormat(Cookies.get('i18next'), { month: 'short' }).format(date);
            let day = new Intl.DateTimeFormat(Cookies.get('i18next'), { year: '2-digit' }).format(date);
            let dateString = `${year}-${month}-${day}`;
            let contractNo = this.removeUglyChars(elem[2].contents);
            let contractName = this.removeUglyChars(this.toTitleCase(elem[4].contents));
            let companyCode = elem[9].contents.toUpperCase();
            let ficoType = this.removeUglyChars(this.toTitleCase(elem[7].contents));
            if (ficoType === "") {
                ficoType = "Other";
            }
            return {
                id: index,
                headers: {
                    type: ficoType,
                    date: dateString,
                    contract_name: contractName,
                },
                body: [
                    { label: 'contract-no', value: contractNo },
                    { label: 'company-code', value: companyCode }
                ],
            }
        })

        let filteredInfo = trustInfo.filter((trust, index, self) => (
            index === self.findIndex((t) => (
                trust.headers.type !== "" &&
                t.headers.contract_name === trust.headers.contract_name &&
                t.body[0].value === trust.body[0].value
            ))
        ));

        let administration = filteredInfo.filter((t) => {
            return (t.headers.type === 'Administration') ||
                (t.headers.type === 'Administración');
        });
        let other = filteredInfo.filter((t) => {
            return (t.headers.type === 'Other') ||
                (t.headers.type === '') ||
                (t.headers.type === 'Otro');
        });
        let realEstate = filteredInfo.filter((t) => {
            return (t.headers.type === 'Real State Developments') ||
                (t.headers.type === 'Desarrollos inmobiliarios');
        });
        let investment = filteredInfo.filter((t) => {
            return (t.headers.type === 'Investments') ||
                (t.headers.type === 'inversiones');
        });
        let guarantees = filteredInfo.filter((t) => {
            return (t.headers.type === 'Guarantees') ||
                (t.headers.type === 'Garantías');
        })
        let retirement = filteredInfo.filter((t) => {
            return (t.headers.type === 'Retirement plan') ||
                (t.headers.type === 'Previsión social')
        });
        return [administration, other, realEstate, investment, guarantees, retirement];
    }

    /**
* Function to process the trust information stored by the @module ClientixAPI [MY_TRANSACT]{@link http://oxygen.alenet.com/clx56dev/apirest.php?classname=MY_TRANSACT} endpoint in the user's local storage.
* @returns An HTML table with the extracted trust information from the user's local storage
*/
    populateTransactions(myTransactions) {
        //obtain transaction infromation from user's local storage and process to json. propArray contains all trustProperties.
        let transactionObj = JSON.parse(myTransactions);
        if (!transactionObj[0].objects) {
            return null;
        }
        let transactionArray = transactionObj[0].objects.map(obj => { return obj.objects });
        let dollarUs = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        })
        /*
        ARRAY SETUP: 0=ID, 1=IDCODE, 2=IDNAME, 3=EFFTDATE, 4=STATUS  5=REVERSAL_PEND 6=TRANSTBL_CODE
        7=CURRENCY_CODE 8=TRANS_AMT 9=TAXABLE_AMT 10=TAX_AMT 11=TOTAL_AMT 12=EXCHANGE_RT 13=BASE_TRANS_AMT
        14=CONTRACT_NAME 15=DISBURSEMENT_TYPE 16=VOID 17=CHECK_NO 18=CHECK_PRINT_DATI 19=CHECK_PRINT_BY 
        */
        let transactionInfo = transactionArray.map((elem, index) => {
            let date = new Date(elem[3].contents);
            let year = new Intl.DateTimeFormat(Cookies.get('i18next'), { year: 'numeric' }).format(date);
            let month = new Intl.DateTimeFormat(Cookies.get('i18next'), { month: 'short' }).format(date);
            let day = new Intl.DateTimeFormat(Cookies.get('i18next'), { year: '2-digit' }).format(date);
            let currency = (elem[7].contents.replace(/.*/, '')).toUpperCase();
            let dateString = `${year}-${month}-${day}`;
            let status = this.removeUglyChars(this.toTitleCase(elem[4].contents));
            let amt = dollarUs.format(parseFloat(elem[11].contents));
            let contract = this.removeUglyChars(this.toTitleCase(elem[14].contents))
            let name = this.removeUglyChars(this.toTitleCase(elem[2].contents))
            return {
                id: index,
                headers: {
                    amount: amt,
                    name: name,
                    date: dateString,
                    status: status,
                },
                body: [
                    { label: 'contract-name', value: contract },
                    { label: 'currency', value: currency },
                ]
            }
        })
        let filteredInfo = transactionInfo.filter((transaction, index, self) => (
            index === self.findIndex((t) => (
                t.headers.name === transaction.headers.name &&
                t.body[0].value === transaction.body[0].value
            ))
        ))
        let approved = filteredInfo.filter((transaction) => {
            return (transaction.headers.status === 'Approved') ||
                (transaction.headers.status === 'Aprobada');
        })
        let pending = filteredInfo.filter((transaction) => {
            return (transaction.headers.status === 'Pending Approval') ||
                (transaction.headers.status === 'Pendiente de aprobar')
        })
        let rejected = filteredInfo.filter((transaction) => {
            return (transaction.headers.status === 'Rejected') ||
                (transaction.headers.status === 'Rechazada');
        })
        return [approved, pending, rejected];
    }

    populateAccounts(myAccounts) {
        //obtain transaction infromation from user's local storage and process to json. propArray contains all trustProperties.
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
            let company = this.removeUglyChars(this.toTitleCase(elem[0].contents));
            let accountType = this.removeUglyChars(this.toTitleCase(elem[1].contents));
            let accountNo = this.removeUglyChars(elem[4].contents);
            let balance = dollarUs.format(parseFloat(elem[7].contents));
            let intEarned = dollarUs.format(parseFloat(elem[8].contents));
            let intPaid = dollarUs.format(parseFloat(elem[9].contents));
            let contract = this.removeUglyChars(this.toTitleCase(elem[5].contents));
            return {
                headers: {
                    account_no: accountNo,
                    balance: balance,
                    linked_trust: contract,
                    acc_type: accountType,
                },
                body: [
                    { label: 'company', value: company },
                    { label: 'int-earned', value: intEarned },
                    { label: 'int-paid', value: intPaid },
                ],
            }
        })

        let filteredInfo = accountInfo.filter((acc, index, self) => (
            index === self.findIndex((t) => (
                t.headers.account_no === acc.headers.account_no
            ))
        ))

        let realEstate = filteredInfo.filter((account) => {
            return (account.headers.acc_type === 'Real Estate') ||
                (account.headers.acc_type === 'Desarrollos inmobiliarios');
        });

        let checking = filteredInfo.filter((account) => {
            return (account.headers.acc_type === 'Checking Account') ||
                (account.headers.acc_type === 'Cuenta corriente');
        });

        let auto = filteredInfo.filter((account) => {
            return (account.headers.acc_type === 'Automobile') ||
                (account.headers.acc_type === 'Automóbil')
        });

        let income = filteredInfo.filter((account) => {
            return (account.headers.acc_type === 'Fix Income') ||
                (account.headers.acc_type === 'Ingresos')
        });

        let loans = filteredInfo.filter((account) => {
            return (account.headers.acc_type === 'Loan') ||
                (account.headers.acc_type === 'Prestamo')
        });

        let other = filteredInfo.filter((account) => {
            return (account.account.headers.acc_type === 'Other') ||
                (account.headers.acc_type === 'Otro') || (account.headers.acc_type === '')
        });

        let market = filteredInfo.filter((account) => {
            return (account.headers.acc_type === 'Equity Market, Stocks') ||
                (account.headers.acc_type === 'Mercado')
        });

        return [realEstate, checking, auto, income, loans, other, market];
    }

    findContract(contractName) {
        let contracts = JSON.parse(sessionStorage.getItem('myTrusts'));
        return contracts.find(contract => contract.headers.contract_name === contractName)
    }

    findAccount(contractName) {
        let accounts = JSON.parse(sessionStorage.getItem('myAccounts'));
        return accounts.find(acc => acc.headers.linked_trust === contractName)
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