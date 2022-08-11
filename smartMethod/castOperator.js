'use strict'

module.exports = class CastOperator {

    static get_type(variable)
    {
        return {"$get_type": [variable]};
    }

    static is_numeric(vars = [])
    {
        return {"$is_numeric": [vars]};
    }

    static is_int(vars = [])
    {
        return {"$is_int": [vars]};
    }

    static is_string(vars = [])
    {
        return {"$is_string": [vars]};
    }

    static is_null(vars = [])
    {
        return {"$is_null": [vars]};
    }

    static is_bool(vars = [])
    {
        return {"$is_bool": [vars]};
    }

    static is_array(vars = [])
    {
        return {"$is_array": [vars]};
    }

    static is_double(vars = [])
    {
        return {"$is_double": [vars]};
    }

}