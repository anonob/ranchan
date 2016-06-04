function thumbnails() {
	var $container = $("#container"),
		thumbId = 0,
		thumbQ = [],
		pageNum = 0,
		pageCount = 0,
		threadNum = 0,
		threadCount = 0,
		chans = [{"site":"4chan", "boards":"http://a.4cdn.org/boards.json"}],
		i = 0,
		top = "",
		left = "",
		removeId = "";

	setInterval(genThumbs, 500);

	function genThumbs() {
		var randChan = chans[randInt(0, chans.length - 1)];
		var thread = {"tid":"", "chan":{"site":"", "boards":""}, "board":{"letter":"", "catalog":""}, "op":{"no":"", "tim":"", "ext":""}};
		thread.tid = thumbId.toString();
		thread.chan.site = randChan.site;
		thread.chan.boards = randChan.boards;
		thumbId++;

		if(thumbQ.length > 6) {
			removeId = "#tid-" + thumbQ.shift().toString();
			$(removeId).remove();
		}
		getBoard(thread);
	}

	function getBoard(thread) {
		return $.ajax({
			type: "POST",
			url: "http://ranchan.moe/boards",
			data: JSON.stringify(thread.chan),
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				$.when(getBoard).then(function() {
					getCatalog(thread, data);
				})
			},
			error: function(data) {
				console.log("An error occured while obtaining a board");
				console.log(data);
			}
		});
	}

	function getCatalog(thread, boardData) {
		do {
			thread.board.letter = boardData.boards[randInt(0, boardData.boards.length - 1)].board;
		} while(thread.board.letter == "f" || thread.board.letter == "adv")
		
		thread.board.catalog = "http://a.4cdn.org/" + thread.board.letter + "/catalog.json";
		
		return $.ajax({
			type: "POST",
			url: "http://ranchan.moe/catalog",
			data: JSON.stringify(thread.board),
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				$.when(getCatalog).then(function() {
					getThread(thread, data);
				})
			},
			error: function(data) {
				console.log("An error occured while obtaining a board");
				console.log(data);
			}
		});
	}

	function getThread(thread, catalogData) {
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

			thread.op.no = catalogData[pageNum].threads[threadNum].no.toString()
			thread.op.tim = catalogData[pageNum].threads[threadNum].tim.toString()
			thread.op.ext = catalogData[pageNum].threads[threadNum].ext;
		} while(thread.op.ext == ".swf" || thread.op.ext == ".webm" || thread.op.ext == ".pdf")
		
		top = randInt(5, 70).toString() + "%";
		left = randInt(5, 80).toString() + "%";
		$container.append("<a class=\"thumb\" id=\"tid-" + thread.tid + "\" target=\"_blank\" href=\"http://boards.4chan.org/" 
			+ thread.board.letter + "/thread/" + thread.op.no + "\"><img src=\"http://i.4cdn.org/" + thread.board.letter + "/" 
			+ thread.op.tim + thread.op.ext + "\" style=\"top:" + top + ";left:" + left + "\" alt=\"\>current year \>using alt\"></a>");

		thumbQ.push(parseInt(thread.tid, 10));
		if(thumbId == 32) {
			thumbId = 0;
		}
	}
}