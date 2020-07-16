const env = process.env.NODE_ENV || 'development';
const defaultServerPort = 3006

const config = {
    development: {
        port: process.env.PORT || defaultServerPort,
        dbURL: process.env.DATABASE_URL, 
    },
    production: {}
};

module.exports = config[env];