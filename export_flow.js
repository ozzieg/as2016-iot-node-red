var mongodb = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI||(process.argv.length > 2 ? process.argv[2] : 'Provide URL on command line or set MONGOLAB_URI');

var fs = require('fs');

console.log("Connecting to " + url);
mongodb.connect(url, function(err, db) {
    if(err) return console.error(err);

    var nodered = db.collection('nodered').findOne(
	    {}, 
	    {"flow":1}, 
	    function(err, doc) {
     		if(err) return console.error(err);
	   		var flows = doc.flow;
    		console.log(flows);
    		fs.writeFileSync('defaults/flow.json', JSON.stringify(flows));
			db.close();
	    });
});
