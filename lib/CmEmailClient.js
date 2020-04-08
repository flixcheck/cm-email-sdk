const axios = require("axios");

class CmEmailClient {

    constructor(accountId, productToken) {
        this.baseUrl = "https://api.cmtelecom.com/bulkemail/v1.0/accounts/" + accountId;
        this.headers = {
            "X-CM-PRODUCTTOKEN": productToken
        };
        this.ready = false;
        this.possibleFromAddresses = [];
        this.fromAddressId = null;
        this.fromName = "";
        this.updateFromAddresses()
            .then(() => {
                this.ready = true;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async updateFromAddresses() {
        try {
            const addresses = await this.getFromAddresses();
            this.possibleFromAddresses = addresses;
        } catch (e) {
            throw e;
        }
    }

    async setFrom(fromAddress, fromName) {
        try {
            await this.awaitReadyness();
            const setFromAddressId = () => {
                const fromAddressEntry = this.possibleFromAddresses.find((a) => !!(a.address === fromAddress));
                if (fromAddressEntry) {
                    this.fromAddressId = fromAddressEntry.id;
                    return true;
                } else {
                    return false;
                }
            };
            let found = setFromAddressId();
            if (!found) {
                await updateFromAddresses();
                found = setFromAddressId();
            }
            if (!found) {
                throw new Error("fromAddress not in possible fromAddresses");
            }
            this.fromName = fromName;
        } catch (e) {
            throw e;
        }
    }

    async send(toAddress, toName, subject, body) {
        try {
            await this.awaitReadyness();
            await axios({
                method: "POST",
                url: this.baseUrl + "/mails",
                headers: this.headers,
                data: {
                    FromAddressId: this.fromAddressId,
                    FromName: this.fromName,
                    ToName: toName,
                    ToAddress: toAddress,
                    Subject: subject,
                    TextBody: body,
                }
            });
        } catch (e) {
            console.error(e.response.config);
            throw e;
        }
    }

    async getFromAddresses() {
        try {
            const addresses = await axios({
                method: "GET",
                url: this.baseUrl + "/fromaddresses",
                headers: this.headers
            });
            if (!addresses.data || !addresses.data.length) {
                return [];
            } else {
                return addresses.data.map((a) => {
                    return {
                        id: a.ID,
                        address: a.EmailAddress
                    }
                });
            }
        } catch (e) {
            throw e;
        }
    }

    async awaitReadyness() {
        if (this.ready) {
            return Promise.resolve;
        }
        return new Promise((resolve, reject) => {
            let tryCount = 0;
            const tryAgain = () => {
                if (this.ready) {
                    resolve();
                    return;
                }
                if (tryCount > 100) {
                    reject(new Error("CmEmailClient doesn't become ready."));
                    return;
                }
                tryCount++;
                setTimeout(tryAgain, 100);
            }
            tryAgain();
        });
    }

}

module.exports = CmEmailClient;
