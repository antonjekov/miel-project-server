/**@dbName is the name of the database of the current project. You must change it before to start 
 * @dbPort is the port in which work mongodb. Default port for the base is 27017, but if you need you can change it.
 * @defaultServerPort is the port in which will work this server that we make in development mode. If you want you can change it.
 * 
*/

const env = process.env.NODE_ENV || 'development';
const dbName = "miel"
const dbPort = "27017"
const defaultServerPort = 3006

//dotenv is library for introduce env variables in out project. Look file .env in root directory. File .env must be in gitignore for not be posible people to watch our user and pass for cloud
require('dotenv').config();

const config = {
    development: {
        port: process.env.PORT || defaultServerPort,
        ////local MongoDb
        //dbURL: `mongodb://localhost:${dbPort}/${dbName}`
        //cloud MongoDb
        dbURL: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@miel-dn0tf.mongodb.net/miel?retryWrites=true&w=majority`
    },
    production: {}
};

module.exports = config[env];