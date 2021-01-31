require('dotenv').config();

module.exports = {
    development: {
        database: 'altrufit',
        username: 'postgres',
        password: 'viola',
        host: '127.0.0.1',
        dialect: 'postgres'
    },
    production: {
        use_env_variable: 'DATABASE_URL'
    }
};
