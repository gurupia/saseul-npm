'use strict'
const Hasher = require('./util/hasher');
const Signer = require("./util/signer");

module.exports = class Config {
    static NETWORK = 'SASEUL PUBLIC NETWORK';

    static ZERO_ADDRESS = '00000000000000000000000000000000000000000000';
    static SYSTEM_NONCE_BASE = 'Fiat lux. ';

    static FULL_LEDGER = 'full';
    static PARTIAL_LEDGER = 'partial';

    static MAIN_CHAIN_INTERVAL = 1000000;
    static MAIN_CONSENSUS_PER = 0.6;

    static RESOURCE_INTERVAL = 60000000;
    static RESOURCE_CONFIRM_COUNT = 10;
    static CONFIRM_INTERVAL = this.RESOURCE_INTERVAL * this.RESOURCE_CONFIRM_COUNT;
    static VALIDATOR_COUNT = 9;

    static DIFFICULTY_CHANGE_CYCLE = 1440;
    static DEFAULT_DIFFICULTY = '100000';
    static MINING_INTERVAL = 15000000;

    static CHUNK_REFRESH_INTERVAL = this.RESOURCE_INTERVAL;
    static HYPOTHESIS_REFRESH_INTERVAL = this.MINING_INTERVAL;
    static HYPOTHESIS_ERROR_INTERVAL = this.CHUNK_REFRESH_INTERVAL * 2;

    static BLOCK_AFFIX_LENGTH = 2;
    static BLOCK_PER_FILE = 16 ** this.BLOCK_AFFIX_LENGTH;
    static BLOCK_PER_GENERATION = this.BLOCK_PER_FILE ** 2;
    static SPLIT_COUNT = 1048576;

    static MAX_DIFFICULTY_WEIGHT = 4;
    static MIN_DIFFICULTY_WEIGHT = 0.25;

    static HASH_COUNT = '115792089237316195423570985008687907853269984665640564039457584007913129639936';

    static BLOCK_TX_SIZE_LIMIT = 8388608;
    static BLOCK_TX_COUNT_LIMIT = 2048;
    static TX_SIZE_LIMIT = 1048576;

    static RECEIPT_COUNT_LIMIT = 256;
    static TIMESTAMP_ERROR_LIMIT = 10000000;

    static STANDARD_AMOUNT = '2000000000000000000000';
    static CREDIT_AMOUNT = '60000000000000000000000000';

    static PEER_SEARCH_TIMEOUT = 1;
    static ROUND_TIMEOUT = this.PEER_SEARCH_TIMEOUT;
    static BROADCAST_TIMEOUT = this.PEER_SEARCH_TIMEOUT + 2;
    static DATA_TIMEOUT = this.PEER_SEARCH_TIMEOUT + 2;


    static SystemNonce()
    {
        return Hasher.Hash(this.SYSTEM_NONCE_BASE);
    }

    static NetworkKey()
    {
        return Hasher.Hash(this.NETWORK);
    }

    static NetworkAddress()
    {
        return Signer.Address(this.NetworkKey());
    }

    static TxCountHash()
    {
        return Hasher.StatusHash(this.ZERO_ADDRESS, this.SystemNonce(), 'transaction_count', this.ZERO_ADDRESS);
    }

    static CalculatedHeightHash()
    {
        return Hasher.StatusHash(this.ZERO_ADDRESS, this.SystemNonce(), 'fixed_height', this.ZERO_ADDRESS);
    }

    static ResourceHash(address)
    {
        return Hasher.StatusHash(this.ZERO_ADDRESS, this.SystemNonce(), 'resource', address);
    }

    static RecycleResourceHash()
    {
        return Hasher.StatusHash(this.ZERO_ADDRESS, this.SystemNonce(), 'recycle_resource', this.ZERO_ADDRESS);
    }

    static ContractPrefix()
    {
        return Hasher.StatusPrefix(this.ZERO_ADDRESS, this.SystemNonce(), 'contract');
    }

    static RequestPrefix()
    {
        return Hasher.StatusPrefix(this.ZERO_ADDRESS, this.SystemNonce(), 'request');
    }
}