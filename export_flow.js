var mongodb = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI||'mongodb://heroku_d4frfm6w:p1tje6k1l78fm879dk900nhh5j@ds023468.mlab.com:23468/heroku_d4frfm6w';

var fs = require('fs');

console.log("Connecting to " + url);
mongodb.connect(url, function(err, db) {
    if(err) return console.error(err);

    var nodered = db.collection('nodered').findOne(
	    {}, 
	    {"flow":1}, 
	    function(err, doc) {
    		var flows = doc.flow;
    		console.log(flows);
    		fs.writeFileSync('flow.json', JSON.stringify(flows));
		db.close();
	    });
});
