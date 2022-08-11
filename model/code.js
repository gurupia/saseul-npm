'use strict'

module.exports = class Code {

    type = 'code';
    name;
    version;
    nonce;
    writer;
    parameters = {};
    conditions = [];

    Compile()
    {
        return {
            type: this.type,
            name: this.name,
            version: this.version,
            nonce: this.nonce,
            writer: this.writer,
            parameters: this.parameters,
            conditions: this.conditions,
        };
    }

    Name(name= null)
    {
        this.name = name ?? this.name;

        return this.name;
    }

    Version(version= null)
    {
        this.version = version ?? this.version;

        return this.version;
    }

    Nonce(nonce= null)
    {
        this.nonce = nonce ?? this.nonce;

        return this.nonce;
    }

    Writer(writer= null)
    {
        this.writer = writer ?? this.writer;

        return this.writer;
    }

    AddParameter(parameter) {
        if (parameter.ObjValidity() && !this.parameters[parameter.Name()]) {
            this.parameters[parameter.Name()] = parameter.Obj();
        }
    }

    Parameters(parameters = null) {
        this.parameters = parameters ?? this.parameters;

        return this.parameters;
    }

    AddCondition(condition) {
        this.conditions.push(condition);
    }

    Conditions(conditions = null) {
        this.conditions = conditions ?? this.conditions;

        return this.conditions;
    }
}