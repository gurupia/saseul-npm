'use strict'

const Clock = require('./clock');
const PHP = require('../php/php');
const Enc = require('../util/enc');

module.exports = class Hasher {
    static HASH_BYTES = 32;
    static TIME_HASH_BYTES = Clock.HEX_TIME_BYTES + this.HASH_BYTES;
    static ID_HASH_BYTES = 22;
    static SHORT_HASH_BYTES = 20;
    static STATUS_KEY_BYTES = 48;
    static STATUS_HASH_BYTES = 64;

    static HASH_SIZE = 64;
    static TIME_HASH_SIZE = Clock.HEX_TIME_SIZE + this.HASH_SIZE;
    static ID_HASH_SIZE = 44;
    static SHORT_HASH_SIZE = 40;
    static STATUS_PREFIX_SIZE = 64;
    static STATUS_KEY_SIZE = 64;
    static STATUS_HASH_SIZE = 128;

    static MerkleRoot(array=[])
    {
        if (array.length === 0) {
            return this.Hash('');
        }

        let hash_array = [];

        array.forEach(item => {
            hash_array.push(this.Hash(item));
        })

        while (hash_array.length > 1) {
            let tmp_array = hash_array;
            let hash_array = [];

            for (let i = 0; i < tmp_array.length; i = i + 2) {
                if (i === tmp_array.length - 1) {
                    hash_array.push(tmp_array[i]);
                } else {
                    hash_array.push(this.Hash(tmp_array[i] + tmp_array[i + 1]));
                }
            }
        }

        return hash_array[0];
    }

    static Hash(obj)
    {
        return PHP.hash('SHA256', this.String(obj));
    }

    static ShortHash(obj)
    {
        return PHP.hash('RIPEMD160', this.Hash(obj));
    }

    static Checksum(hash)
    {
        return PHP.substr(PHP.hash('SHA256', PHP.hash('SHA256', hash)), 0, 4);
    }

    static AttributeHash(prefix)
    {
        return PHP.hash('MD5', prefix);
    }

    static TimeHash(obj, timestamp)
    {
        return Clock.Hextime(timestamp) + this.Hash(obj);
    }

    static TransactionHash(transaction)
    {
        return this.TimeHash(this.Hash(transaction), (transaction['timestamp'] ?? 0));
    }

    static IdHash(obj)
    {
        let hash = this.ShortHash(obj);
        let checksum = this.Checksum(hash);

        return hash + checksum;
    }

    static IdHashValidity(id)
    {
        if (id.length !== this.ID_HASH_SIZE) {
            return false;
        }

        let hash = PHP.substr(id, 0, -4);
        let checksum = PHP.substr(id, -4);

        return (id.length === this.ID_HASH_SIZE) && (this.Checksum(hash) === checksum);
    }

    static StatusHash(writer, nonce, attr, key)
    {
        if (key.length > this.STATUS_KEY_SIZE || !this.IsHex(key)) {
            return null;
        }

        return this.StatusPrefix(writer, nonce, attr) + key;
    }

    static StatusPrefix(writer, nonce, attr)
    {
        return this.Hash(writer + nonce + attr);
    }

    static String(obj)
    {
        if (['array', 'object', 'resource'].includes(typeof obj)) {
            obj = JSON.stringify(obj);
            obj = Enc.StringToUnicode(obj.replace(/\//g, '\\/'));
        }

        return String(obj);
    }

    static IsHex(hex)
    {
        if (typeof hex !== 'string') {
            return false;
        }
        return (Boolean(hex.match(/^[0-9a-f]+$/)));
    }
}