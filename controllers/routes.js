var multer = require('multer');

var route = function(app){
	app.use( multer( {
		dest : './users/avatars',
		rename : function(fieldname,filename,req) {
			return req.body.email+req.body.name+req.body.lastname+'Avatar';
		},
		onFileUploadStart : function(file) {
			if(file.extension!='png')
				return false;
		},
		onFileUploadComplete : function(file) {
			console.log('Subida completada');
		}
	}));

	require('./about.js')(app);
	require('./explore.js')(app);
	require('./homeBoxes.js')(app);
	require('./index.js')(app);
	require('./my_favourites.js')(app);
	require('./my_finances.js')(app);
	require('./logout.js')(app);
	require('./profile.js')(app);
	require('./register.js')(app);
	require('./sendPassword.js')(app);
};

module.exports = route;