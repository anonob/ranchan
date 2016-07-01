var boards = function() {
	var thread4chan = {"chan":{
			'site':'4chan',
			'boardURL':'http://ranchan.moe/json/boards.json'
		}};
	var lists4chan = [];

	function createList4chan(bdata) {
		var cLen4chan = Math.ceil(bdata.length / 3);
		var cMod4chan = bdata.length % 3;
		var cMin4chan = 0, cMax4chan = cLen4chan;
		var classTag = '.a-col';

		$.each(bdata, function(idx, val) {
			var entry = "<li class='sname-" + val.sname + " status-" + val.status;
			if(val.status == 1 && val.content == 'sfw') {
				entry += " current-1";
			} else {
				entry += " current-0";
			}
			entry +=  " content-" + val.content + " activity-" + val.activity + "'><i class='fa ";
			if(val.status == 1 && val.content == 'sfw') {
				entry += "fa-check-square";
				lists4chan.push(val);
			} else if(val.status == 1 && val.content == 'nsfw'){
				entry += "fa-square-o";
				lists4chan.push(val);
			} else {
				entry += "fa-square-o";
			}
			entry += " fa-lg fa-fw' aria-hidden='true'></i>/" + val.sname + "/ - " + val.lname + "</li>"
			
			$(classTag).append(entry);
			cMin4chan++;
			if(cMin4chan == cMax4chan) {
				if(classTag == '.a-col') {
					classTag = '.b-col';
				} else {
					classTag = '.c-col';
				}
				if(cMod4chan == 1) {
					cLen4chan--;
				}
				cMod4chan--;
				cMin4chan = 0;
				cMax4chan = cLen4chan;
			}
		});
	}

	var getBoardData4chan = function() {
		return $.ajax({
			type: "POST",
			url: "http://ranchan.moe/boards",
			data: JSON.stringify(thread4chan),
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				$.when(getBoardData4chan).then(function() {
					$.each(data, function(key, value) {
						if(key == thread4chan.chan.site) {
							data = value;
							return false;
						}
					});
					createList4chan(data);
				})
			},
			error: function(data) {
				console.log("An error occured while obtaining a board");
				console.log(data);
			}
		});
	}

	var getLists4chan = function() {
		return lists4chan;
	}

	return {
		getBoardData4chan:getBoardData4chan,
		getLists4chan:getLists4chan
	};
}