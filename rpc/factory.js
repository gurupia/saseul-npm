'use strict'

const Signer = require('../util/signer');
const Clock = require('../util/clock');
const SignedTransaction = require('../model/signedTransaction');
const SignedRequest = require('../model/signedRequest');

module.exports = class Factory {

    static Transaction(type, vars = {}, private_key) {
        try {
            if(private_key === null) throw 'private_key not given.';

            let transaction = this.Data(type, private_key);

            for (const key in vars) {
                transaction[key] = vars[key];
            }

            let signedTx = new SignedTransaction({
                type: transaction.type,
                from: transaction.from,
                timestamp: transaction.timestamp,
                transaction: transaction,
                public_key: Signer.PublicKey(private_key)
            });

            signedTx.signature = Signer.Signature(signedTx.Hash(), private_key);
            signedTx.Validity(true);

            return signedTx;

        } catch (e) {
            throw e;
        }
    }

    static Request(type, vars = {}, private_key) {
        try {
            if(private_key === null) throw 'private_key not given.';

            let request = this.Data(type, private_key);

            for (const key in vars) {
                request[key] = vars[key];
            }

            let signedReq = new SignedRequest({
                type: request.type,
                timestamp: request.timestamp,
                from: request.from,
                request: request,
                public_key: Signer.PublicKey(private_key)
            });

            signedReq.signature = Signer.Signature(signedReq.Hash(), private_key);
            signedReq.Validity(true);

            return signedReq;

        } catch (e) {
            throw e;
        }
    }

    static Data(type, private_key) {
        const public_key = Signer.PublicKey(private_key);
        const address = Signer.Address(public_key);
        const timestamp = Clock.Utime();

        return {
            "type": type,
            "timestamp": timestamp,
            "from": address
        }
    }
}