const env = process.env.NODE_ENV || 'development';
const defaultServerPort = 3006

const config = {
    development: {
        port: process.env.PORT || defaultServerPort,
        dbURL: process.env.DATABASE_URL, 
    },
    production: {
        port: process.env.PORT || defaultServerPort,
        dbURL: process.env.DATABASE_URL,
    }
};

module.exports = config[env];