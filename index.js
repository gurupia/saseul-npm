'use strict'
const CONFIG = require('./config');
const TYPE = require('./type');
const CODE = require('./code');

const ABI = require('./core/abi');
const Code = require('./model/code');
const Contract = require('./model/contract');
const Request = require('./model/request');
const Parameter = require('./model/parameter');
const SignedTransaction = require('./model/signedTransaction');
const SignedRequest = require('./model/signedRequest');
const SignedData = require('./model/signedData');

const ArithmeticOperator = require('./smartMethod/arithmeticOperator');
const BasicOperator = require('./smartMethod/basicOperator');
const CastOperator = require('./smartMethod/castOperator');
const ChainOperator = require('./smartMethod/chainOperator');
const ComparisonOperator = require('./smartMethod/comparisonOperator');
const ReadOperator = require('./smartMethod/readOperator');
const UtilOperator = require('./smartMethod/utilOperator');
const WriteOperator = require('./smartMethod/writeOperator');
const EthereumOperator = require('./smartMethod/ethereumOperator');

const Factory = require('./rpc/factory');
const Sender = require('./rpc/sender');

const Enc = require('./util/enc');
const Clock = require('./util/clock');
const Hasher = require('./util/hasher');
const Signer = require('./util/signer');
const Account = require('./util/account');
const Math = require('./util/math');
const Etc = require('./util/etc');
const Common = require("./core/common");

module.exports = class Saseul {

    /**
     * Initiate Saseul instance
     * @param network [String] SASEUL NETWORK
     * @param option [Object] Options
     */
    constructor(network = null, option = { ethereum: false }) {
        if(network !== null) this.CONFIG.NETWORK = network;
        if(option) this.Core.ABI = new ABI(option);
    }

    CONFIG = CONFIG;
    TYPE = TYPE;
    CODE = CODE;

    Core = {
        ABI: new ABI(),
        Common: Common
    }
    Model = {
        Code: Code,
        Contract: Contract,
        Request: Request,
        Parameter: Parameter,
        SignedData: SignedData,
        SignedRequest: SignedRequest,
        SignedTransaction: SignedTransaction,
    }
    SmartMethod = {
        ArithmeticOperator: ArithmeticOperator,
        BasicOperator: BasicOperator,
        CastOperator: CastOperator,
        ChainOperator: ChainOperator,
        ComparisonOperator: ComparisonOperator,
        ReadOperator: ReadOperator,
        UtilOperator: UtilOperator,
        WriteOperator: WriteOperator,
        EthereumOperator: EthereumOperator,
    }
    Rpc = {
        Factory: Factory,
        Sender: Sender,
    }
    Util = {
        Enc: Enc,
        Clock: Clock,
        Hasher: Hasher,
        Signer: Signer,
        Account: Account,
        Math: Math,
        Etc: Etc
    }
}