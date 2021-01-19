if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod_keys.config');
} else {
    module.exports = require('./dev_keys.config');
}