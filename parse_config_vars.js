//script to automatically configure heroku config variables 
//for node-red to ingest properly
//1- read MONGOLAB_URI and write out to MONGODB_URL, MONGODB_DATABASE, and MONGODB_PORT
//2- read DATABASE_URL and write out to POSTGRESDB_DATABASE, POSTGRESDB_URL
//3- read username and password from DATABASE_URL and write out to flow_creds.json

//splice MONGOLAB_URI
var mongodb_url = process.env.MONGOLAB_URI.substring("mongodb://".length, process.env.MONGOLAB_URI.lastIndexOf(":"));
var mongodb_port = process.env.MONGOLAB_URI.substring(process.env.MONGOLAB_URI.lastIndexOf(":")+1, process.env.MONGOLAB_URI.lastIndexOf("/"));
var mongodb_database = process.env.MONGOLAB_URI.substring(process.env.MONGOLAB_URI.lastIndexOf("/")+1);
console.log(mongodb_url);
console.log(mongodb_port);
console.log(mongodb_database);

//splice DATABASE_URL
var postgresdb_url = process.env.DATABASE_URL.substring(process.env.DATABASE_URL.indexOf("@")+1, process.env.DATABASE_URL.lastIndexOf(":"));
var postgresdb_database = process.env.DATABASE_URL.substring(process.env.DATABASE_URL.lastIndexOf("/")+1);
console.log(postgresdb_url);
console.log(postgresdb_database);

process.env['MONGODB_PORT'] = mongodb_port;
process.env['MONGODB_DATABASE'] = mongodb_database;
process.env['MONGODB_URL'] = mongodb_url;
process.env['POSTGRESDB_URL'] = postgresdb_url;
process.env['POSTGRESDB_DATABASE'] = postgresdb_database;