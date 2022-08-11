'use strict'

module.exports = class ArithmeticOperator {

    static add(left, right)
    {
        return {"$add": [left, right]};
    }

    static sub(left, right)
    {
        return {"$sub": [left, right]};
    }

    static mul(left, right)
    {
        return {"$mul": [left, right]};
    }

    static div(left, right)
    {
        return {"$div": [left, right]};
    }

    static precise_add(left = null, right = null, scale = 0)
    {
        return {"$precise_add": [left, right, scale]};
    }

    static precise_sub(left = null, right = null, scale = 0)
    {
        return {"$precise_sub": [left, right, scale]};
    }

    static precise_mul(left = null, right = null, scale = 0)
    {
        return {"$precise_mul": [left, right, scale]};
    }

    static precise_div(left = null, right = null, scale = 0)
    {
        return {"$precise_div": [left, right, scale]};
    }

    static scale(value = null) {
        return {"$scale": [value]};
    }
}