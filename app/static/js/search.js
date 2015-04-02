OAuth.initialize('9uKv1TdU3SgGu8reX5HM4np9Egc');
var a = {};
var tweets = [];
var res;

//Using popup
function twitauth(display) {
	tweets.length = 0;
	OAuth.popup('twitter').done(function(result) {
    		result.get('/1.1/friends/list.json').done(function (response1) {
		  res = result;
		  for (var i = 0; i < response1.users.length; i++) {
		  	result.get('/1.1/statuses/user_timeline.json?user_id=' + response1.users[i].id + '&count=5')
		  	.done(function (response2) {
		  		for (var j = 0; j < response2.length; j++) {
					a[response2[j].id_str] = response2[j].retweet_count;
		  		}});
		  }
		  setTimeout(function(){ process(a, display);}, 500);
    		})
    		.fail(function (err) {
		  console.log(err);
    		});
	})
	.fail(function (err) {
    	console.log(err);
		  });
}

function randomize(o) {
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

function process(map, display) {
	var keys = [];
	for(var key in map)
		keys.push(key);
	var sorted = keys.sort(function(a,b){return map[a]-map[b]});
	var max = Math.min(20, sorted.length);
	sorted = randomize(sorted).slice(0, max);
	//console.log(sorted);
	for (var i = 0; i < sorted.length; i++) {
		res.get('/1.1/statuses/show.json?id=' + sorted[i])
		.done(function (response3) {
			  tweets.push({"tid":response3.id_str,
						   "uid":response3.user.name,
						   "profile_image_url_https":response3.user.profile_image_url,
						   "text":response3.text});
			  });
	}
	setTimeout(function(){
			   sessionStorage.myObject = JSON.stringify(tweets);display()}, 500);
	
}

function retweet(tid) {
	res.post('/1.1/statuses/retweet/' + tid + '.json', {
			 data: {
			 post_field: "",
			 }
	})
	.done(function (response4) {
		  //this will display "John Doe" in the console
		  console.log(response.name);
    });
}

function favorite(tid) {
	res.post('/1.1/favorites/create.json?id=' + tid, {
			 data: {
			 post_field: "",
			 }
	})
	.done(function (response5) {
		  //this will display "John Doe" in the console
		  console.log(response.name);
    });
}

function respond(msg, tid) {
	res.post('/1.1/statuses/update.json?status=' + msg + '&in_reply_to_status_id=' + tid, {
		data: {
			post_field: "",
		}
	})
	.done(function (response6) {
		  //this will display "John Doe" in the console
		  console.log(response.name);
    });
}
