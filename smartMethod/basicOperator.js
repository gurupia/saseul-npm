'use strict'

module.exports = class BasicOperator {

    static if(condition = false, ifTrue = null, ifFalse = null)
    {
        return {"$if": [condition, ifTrue, ifFalse]};
    }

    static and(vars = [])
    {
        return {"$and": vars};
    }

    static or(vars = [])
    {
        return {"$or": vars};
    }

    static get(obj = {}, key = '')
    {
        return {"$get": [obj, key]};
    }
}