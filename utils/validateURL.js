const validUrl = require('valid-url');

const validateURL = (url) => {
    return validUrl.isUri(url);
};

module.exports = validateURL;
