var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
    host: process.env.DATABASE_URL
});

module.exports = elasticClient;
