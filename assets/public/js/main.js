$(function() {
	var chans = [
		{
			'site':'4chan',
			'boardURL':'http://ranchan.moe/json/boards.json',
			'catalogURLpre':'http://a.4cdn.org/',
			'catalogURLpost':'/catalog.json'
		}
	];
	var meta = {'phase':'alpha', 'version':'0.1.3'};
	var boardsObj = new boards();
	var settingsObj = new settings();
	var le4channerObj = new le4channer();
	var thumbnailsObj = new thumbnails();

	//Insert meta info
	$('.meta-phase').append(meta.phase);
	$('.meta-version').append(meta.version);

	$.when(boardsObj.getBoardData4chan()).then(function() {
		settingsObj.initialize(boardsObj);
		le4channerObj.generateStrips();
		setInterval(thumbnailsObj.genThumbs, 350, chans, settingsObj, boardsObj);
	});
});