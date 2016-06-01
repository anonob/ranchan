$(function () {
	var $container = $("#container"),
		pageNum = 0,
		pageCount = 0,
		threadNum = 0,
		threadCount = 0,
		site = "4chan",
		board = "a",
		boardjson = "http://a.4cdn.org/a/catalog.json",
		sites = ["4chan"];

	site = sites[randInt(0, sites.length - 1)];

	if(site == "4chan") {
		$.ajax({
			type: "GET",
			url: "http://a.4cdn.org/boards.json",
			data: "",
			success: function(feed) {
				boardjson = "http://a.4cdn.org/" + feed.boards[randInt(0, feed.boards.length - 1)].board + "/catalog.json";
			},
			dataType: "jsonp"
		});

		console.log(boardjson);

		$.ajax({
			type: "GET",
			url: boardjson,
			data: "",
			success: function(feed) {
				for(var i = 0; i < feed.length - 1; i++) {
					pageCount++;
				}
				pageNum = randInt(0, pageCount);

				for(var i = 0; i < feed[pageNum].threads.length - 1; i++) {
					threadCount++;
				}
				threadNum = randInt(0, threadCount);
				var thread = {"no":feed[pageNum].threads[threadNum].no, "tim":feed[pageNum].threads[threadNum].tim, "ext":feed[pageNum].threads[threadNum].ext};
				
				console.log(thread.no + "/" + thread.tim);

				$container.append("<img class=\"thumb\" src=\"i.4cdn.org/" + thread.board + "/" + thread.tim.toString() + thread.ext + 
					"\" href=\"boards.4chan.org/" + board + "/thread/" + thread.no.toString() + " alt=\"\>current year \>using alt\">");
			},
			dataType: "jsonp"
		});
	}
});