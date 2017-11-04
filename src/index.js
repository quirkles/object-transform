const { map, propOr } = require("ramda")

const is_function = var_to_check => var_to_check instanceof Function
const is_string = var_to_check => var_to_check => var_to_check instanceof String

const get_attr = attr => propOr('', attr)

const get_transform = transform_shorthand => {
    if(is_function(transform_shorthand)){
        return transform_shorthand
    } else if (is_string(transform_shorthand)){
        return get_attr(transform_shorthand)
    }
}

const create_mapper = schema => {
    const schema_with_transformers =  map(get_transform, schema)
    return input => map(fn => fn(input), schema_with_transformers)
}

const schema = {
    name: ({first_name, last_name}) => `${first_name} ${last_name}`,
    age: "current_age"
}

const mapper = create_mapper(schema)

const input  = {
    first_name: "pete",
    last_name: "jones",
    current_age: 5
}

console.log(mapper(input))