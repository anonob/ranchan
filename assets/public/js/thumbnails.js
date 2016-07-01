var thumbnails = function(chans, settings, boards) {
	var $container = $("#foreground-container"),
		thumbId = 0,
		thumbQ = [];
	
	var genThumbs = function(chans, settings, boards) {
		var thread = {"tid":"", "chan":{}, "board":{}, "thumb":{"no":"", "tim":"", "ext":""}};
		thread.tid = thumbId.toString();
		thread.chan = chans[randInt(0, chans.length - 1)];
		thumbId++;

		while(thumbQ.length > 10) {
			deleteThumb();
		}
		if(thumbId >= 32) {
			thumbId = 0;
		}

		getCatalog(thread, settings, boards);
	}

	function getCatalog(thread, settings, boards) {
		var whitelist = [];

		if(settings.getContentState() == settings.getcfilter().sfw) {
			whitelist = boards.getLists4chan().filter(function(val){return val.content == 'sfw'});
		} else if(settings.getContentState() == settings.getcfilter().all) {
			whitelist = boards.getLists4chan();
		} else if(settings.getContentState() == settings.getcfilter().nsfw) {
			whitelist = boards.getLists4chan().filter(function(val){return val.content == 'nsfw'});
		} else if(settings.getContentState() == settings.getcfilter().custom) {
			whitelist = boards.getLists4chan().filter(function(val){return val.current == 1});
			if(whitelist.length == 0) {
				if(thumbQ.length != 0) {
					deleteThumb();
				}
				return;
			}
		}
		do {
			thread.board = whitelist[randInt(0, whitelist.length - 1)];
		} while(whitelist.indexOf(thread.board) == -1 )

		return $.ajax({
			type: "POST",
			url: "http://ranchan.moe/catalog",
			data: JSON.stringify(thread),
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				$.when(getCatalog).then(function() {
					getThread(thread, data);
				})
			},
			error: function(data) {
				console.log("An error occured while obtaining a board");
				console.log(thread);
				console.log(boards);
				console.log(data);
			}
		});
	}

	function getThread(thread, cdata) {
		var filetype = "",
			top = "",
			left = "",
			pageNum = 0,
			threadNum = 0
			imgsrc = "";

		do {
			pageNum = randInt(0, cdata.length - 1);
			threadNum = randInt(0, cdata[pageNum].threads.length - 1);
			thread.thumb.no = cdata[pageNum].threads[threadNum].no.toString();
			if(cdata[pageNum].threads[threadNum].tim == undefined) {
				if(cdata[pageNum].threads[threadNum].filedeleted == 1) {
					imgsrc = "http://s.4cdn.org/image/filedeleted.gif";
				} else {
					imgsrc = "http://s.4cdn.org/image/nofile.png";
				}
			} else {
				thread.thumb.tim = cdata[pageNum].threads[threadNum].tim.toString();
				thread.thumb.ext = cdata[pageNum].threads[threadNum].ext;
				if(thread.thumb.ext == ".gif") {
					filetype = ".gif";
				} else {
					filetype = "s.jpg";
				}
				imgsrc = "http://i.4cdn.org/" + thread.board.sname + "/" + thread.thumb.tim + filetype;
			}
		} while(thread.thumb.ext == ".swf" || thread.thumb.ext == ".webm" || thread.thumb.ext == ".pdf")

		top = randInt(8, 72).toString() + "%";
		left = randInt(5, 85).toString() + "%";
		$container.append("<a class='thumb' id='tid-" + thread.tid + "' target='_blank' href='http://boards.4chan.org/" 
			+ thread.board.sname + "/thread/" + thread.thumb.no + "'><img src='" + imgsrc + "' style='top:" + top + ";left:" 
			+ left + "' alt='\>current year \>using alt-text'></a>");

		thumbQ.push(parseInt(thread.tid, 10));
	}

	function deleteThumb() {
		var removeId = "#tid-" + thumbQ.shift().toString();
		$(removeId).remove();
	}

	return {
		genThumbs:genThumbs
	};
}