const { Client } = require('pg');

let config = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === 'production') {
    config.ssl = {
        rejectUnauthorized: false,
    };
}

const client = new Client(config);

client.connect();

module.exports = client;
