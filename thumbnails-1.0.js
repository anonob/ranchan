$(function () {
	var site = "4chan",
		board = "http://a.4cdn.org/a/catalog.json",
		threadNum = 0,
		threadCount = 0,
		sites = ["4chan"],
		boards = []
		threads = [];

	site = sites[randInt(0, sites.length-1)];

	if(site == "4chan") {
		$.ajax({
			type: "GET",
			url: "http://a.4cdn.org/boards.json",
			data: "",
			success: function(feed) {
				board = "http://a.4cdn.org/" + feed.boards[randInt(0, feed.boards.length - 1)].board + "/catalog.json";
			},
			dataType: "jsonp"
		});

		$.ajax({
			type: "GET",
			url: board,
			data: "",
			success: function(feed) {

				for(var i = 0; i < feed.length; i++) {
					for(var j = 0; j < feed[i].threads.length; j++) {
						threadCount++;
					}
				}

				var threadId

			},
			dataType: "jsonp"
		});
	}




});