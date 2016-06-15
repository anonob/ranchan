function thumbnails() {
	var $container = $("#container"),
		thumbId = 0,
		thumbQ = [],
		chans = [{"site":"4chan", "boards":"http://a.4cdn.org/boards.json"}],
		invalidList = ["f", "adv"],
		nsfwList = ["aco", "b", "d", "e", "gif", "h", "hc", "hm", "hr", "i", "ic", "pol", "r", "r9k", "s", "s4s", "soc", "t", "trash", "u", "wg", "y"];

	


$("#content-filter-sfw").on("click", function() {
		if($(this).hasClass("active") == false) {
			if($("#content-filter-both").hasClass("active") == true) {
				$("#content-filter-both").removeClass("active");
			} else {
				$("#content-filter-nsfw").removeClass("active");
			}
			$("#content-filter-sfw").addClass("active");
		}
	});


	setInterval(genThumbs, 350);
	function genThumbs() {
		var randomChan = chans[randInt(0, chans.length - 1)];
		var thread = {"tid":"", "chan":{"site":"", "boards":""}, "board":{"letter":"", "catalog":""}, "op":{"no":"", "tim":"", "ext":""}};
		thread.tid = thumbId.toString();
		thread.chan.site = randomChan.site;
		thread.chan.boards = randomChan.boards;
		thumbId++;

		while(thumbQ.length > 10) {
			var removeId = "#tid-" + thumbQ.shift().toString();
			$(removeId).remove();
		}
		if(thumbId >= 32) {
			thumbId = 0;
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
		var blackList = [];
		if($("#content-filter-sfw").hasClass("active")){
			blackList = invalidList.concat(nsfwList);
			do {
				thread.board.letter = boardData.boards[randInt(0, boardData.boards.length - 1)].board;
			} while(blackList.indexOf(thread.board.letter) != -1 )
		} else if($("#content-filter-both").hasClass("active")) {
			blackList = invalidList;
			do {
				thread.board.letter = boardData.boards[randInt(0, boardData.boards.length - 1)].board;
			} while(blackList.indexOf(thread.board.letter) != -1 )
		} else {
			blackList = nsfwList;
			do {
				thread.board.letter = boardData.boards[randInt(0, boardData.boards.length - 1)].board;
			} while(blackList.indexOf(thread.board.letter) == -1 )
		}
		
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
		var filetype = "",
			top = "",
			left = "",
			pageNum = 0,
			threadNum = 0
			imgsrc = "";

		do {
			pageNum = randInt(0, catalogData.length - 1);
			threadNum = randInt(0, catalogData[pageNum].threads.length - 1);

			thread.op.no = catalogData[pageNum].threads[threadNum].no.toString();
			if(catalogData[pageNum].threads[threadNum].tim == undefined) {
				if(catalogData[pageNum].threads[threadNum].filedeleted == 1) {
					imgsrc = "http://s.4cdn.org/image/filedeleted.gif";
				} else {
					imgsrc = "http://s.4cdn.org/image/nofile.png";
				}
			} else {
				thread.op.tim = catalogData[pageNum].threads[threadNum].tim.toString();
				thread.op.ext = catalogData[pageNum].threads[threadNum].ext;
				if(thread.op.ext == ".gif") {
					filetype = ".gif";
				} else {
					filetype = "s.jpg";
				}
				imgsrc = "http://i.4cdn.org/" + thread.board.letter + "/" + thread.op.tim + filetype;
			}
		} while(thread.op.ext == ".swf" || thread.op.ext == ".webm" || thread.op.ext == ".pdf")

		top = randInt(8, 72).toString() + "%";
		left = randInt(5, 85).toString() + "%";
		$container.append("<a class=\"thumb\" id=\"tid-" + thread.tid + "\" target=\"_blank\" href=\"http://boards.4chan.org/" 
			+ thread.board.letter + "/thread/" + thread.op.no + "\"><img src=\"" + imgsrc + "\" style=\"top:" + top + ";left:" 
			+ left + "\" alt=\"\>current year \>using alt-text\"></a>");

		thumbQ.push(parseInt(thread.tid, 10));
	}
}
