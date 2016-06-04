function thumbnails() {
	var $container = $("#container"),
		pageNum = 0,
		pageCount = 0,
		threadNum = 0,
		threadCount = 0,
		chans = [{"site":"4chan", "boards":"http://a.4cdn.org/boards.json"}],
		chan = null,
		board = null,
		catalog = null,
		i = 0,
		thread = null,
		top = "",
		left = "",
		removeId = "";

	chan = chans[randInt(0, chans.length - 1)];

	setInterval(genThumbs, 500);

	function genThumbs() {
		getBoard().then(getCatalog).then(getThread);
		if(thumbQ.length > 6) {
			removeId = "#id-" + thumbQ.shift().toString();
			$(removeId).remove();
		}
	}

	function getBoard() {
		return $.ajax({
			type: "POST",
			url: "http://localhost:5000/boards",
			data: JSON.stringify(chan),
			contentType: "application/json",
			dataType: "json",
			error: function(data) {
				console.log("An error occured while obtaining a board");
				console.log(data);
			}
		});
	}

	function getCatalog(boardData, textStatus, jqXHR) {
		do {
			board = boardData.boards[randInt(0, boardData.boards.length - 1)].board;
		} while(board == "f" || board == "adv")
		
		catalog = {"board":board, "threads":"http://a.4cdn.org/" + board + "/catalog.json"};
		
		return $.ajax({
			type: "POST",
			url: "http://localhost:5000/threads",
			data: JSON.stringify(catalog),
			contentType: "application/json",
			dataType: "json",
			error: function(data) {
				console.log(data);
				console.log("err");
			}
	});

	function getThread(catalogData, textStatus, jqXHR) {
		do {
			for(i = 0; i < catalogData.length - 1; i++) {
				pageCount++;
			}
			pageNum = randInt(0, pageCount);
			pageCount = 0;

			for(i = 0; i < catalogData[pageNum].threads.length - 1; i++) {
				threadCount++;
			}
			threadNum = randInt(0, threadCount);
			threadCount = 0;

			thread = {"no":catalogData[pageNum].threads[threadNum].no.toString(), "tim":catalogData[pageNum].threads[threadNum].tim.toString(), "ext":catalogData[pageNum].threads[threadNum].ext};
		} while(thread.ext == ".swf" || thread.ext == ".webm" || thread.ext == ".pdf")
		
		
		top = randInt(5, 75).toString() + "%";
		left = randInt(5, 75).toString() + "%";
		$container.append("<a class=\"thumb\" id=\"id-" + thumbId.toString() + "\" target=\"_blank\" href=\"http://boards.4chan.org/" 
			+ board + "/thread/" + thread.no + "\"><img src=\"http://i.4cdn.org/" + board + "/" + thread.tim + thread.ext 
			+ "\" style=\"top:" + top + ";left:" + left + "\" alt=\"\>current year \>using alt\"></a>");

		thumbQ.push(thumbId);
		thumbId++;
		if(thumbId == 20) {
			thumbId = 0;
		}
	}
}