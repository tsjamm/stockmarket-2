var route = function(app){
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