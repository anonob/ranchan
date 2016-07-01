var settings = function() {
	var cfilters = ['content-filter-sfw', 'content-filter-all', 'content-filter-nsfw'];
	var cfiltersQuick = ['#quicknav > .content-filter > .content-filter-sfw', 
		'#quicknav > .content-filter > .content-filter-all',
		'#quicknav > .content-filter > .content-filter-nsfw'];
	var cfiltersFull = ['#fullnav-general > .content-filter > .content-filter-sfw', 
		'#fullnav-general > .content-filter > .content-filter-all',
		'#fullnav-general > .content-filter > .content-filter-nsfw'];
	var afilters = ['activity-filter-live', 'activity-filter-all', 'activity-filter-dead'];
	var afiltersQuick = ['#quicknav > .activity-filter > .activity-filter-live',
		'#quicknav > .activity-filter > .activity-filter-all',
		'#quicknav > .activity-filter > .activity-filter-dead'];
	var afiltersFull = ['#fullnav-general > .activity-filter > .activity-filter-live',
		'#fullnav-general > .activity-filter > .activity-filter-all',
		'#fullnav-general > .activity-filter > .activity-filter-dead'];
	var cfilter = {'sfw':0, 'all':1, 'nsfw':2, 'custom':3};
	var afilter = {'live':0, 'all':1, 'dead':2, 'custom':3};
	var bgOverlays = ['', 'bgol-rainbow', 'bgol-rainbow'];
	var bgStyles = [{parent:'', child:''}, {parent:'bgs-le4channer', child:'.bgs-le4channer-child'}];
	var contentState = cfilter.sfw;
	var activityState = afilter.live;
	var bgolState = bgOverlays[1];
	var bgsState = 1;

	var initialize = function(boards, meta) {
		//Activate tooltips
		$('[data-toggle="tooltip"]').tooltip();

		//Setup fullnav
		$('#fullnav').appendTo('body');

		//Modify GitHub button in fullnav
		$('#fullnav .site-source > button').append('Learn more on GitHub');
		
		//Toggle fullnav
		$('#fullnav-btn').on('click', function() {
			$('#fullnav').modal('show');
		});

		//Custom dropdown toggling
		$('.dropdown-toggle').on('click', function() {
			$(this).parent().toggleClass('open');
		});
		$('body').on('click', function(e) {
			if($('.dropdown-4chan').is(e.target) === false && $('.dropdown-4chan').has(e.target).length === 0) {
				$('.dropdown-toggle').parent().removeClass('open');
			}
		});

		//Toggle quicknav
		$('#quicknav-btn').on('click', function() {
			if($('#quicknav-icon').hasClass('fa-chevron-right') == true) {
				if($('#quicknav > .content-filter').hasClass('slide-in') == true) {
					$('#quicknav > .content-filter').removeClass('slide-in');
				}
				$('#quicknav > .content-filter').addClass('slide-out');
				$('#quicknav > .content-filter').css('left', '24px');
				$('#quicknav > .content-filter').css('opacity', '1');
				$('#quicknav > .content-filter').css('transform', 'translateX(24px)');

				if($('#quicknav > .activity-filter').hasClass('slide-in') == true) {
					$('#quicknav > .activity-filter').removeClass('slide-in');
				}
				$('#quicknav > .activity-filter').addClass('slide-out');
				$('#quicknav > .activity-filter').css('left', '24px');
				$('#quicknav > .activity-filter').css('opacity', '1');
				$('#quicknav > .activity-filter').css('transform', 'translateX(48px)');

				if($('#quicknav > .site-source').hasClass('slide-in') == true) {
					$('#quicknav > .site-source').removeClass('slide-in');
				}
				$('#quicknav > .site-source').addClass('slide-out');
				$('#quicknav > .site-source').css('left', '24px');
				$('#quicknav > .site-source').css('opacity', '1');
				$('#quicknav > .site-source').css('transform', 'translateX(72px)');

				$('#quicknav-icon').addClass('fa-chevron-left').removeClass('fa-chevron-right');
			} else {
				if($('#quicknav > .content-filter').hasClass('slide-out') == true) {
					$('#quicknav > .content-filter').removeClass('slide-out');
				}
				$('#quicknav > .content-filter').addClass('slide-in');
				$('#quicknav > .content-filter').css('left', '-400px');
				$('#quicknav > .content-filter').css('opacity', '0');
				$('#quicknav > .content-filter').css('transform', 'translateX(-48px)');

				if($('#quicknav > .activity-filter').hasClass('slide-out') == true) {
					$('#quicknav > .activity-filter').removeClass('slide-out');
				}
				$('#quicknav > .activity-filter').addClass('slide-in');
				$('#quicknav > .activity-filter').css('left', '-400px');
				$('#quicknav > .activity-filter').css('opacity', '0');
				$('#quicknav > .activity-filter').css('transform', 'translateX(-246px)');

				if($('#quicknav > .site-source').hasClass('slide-out') == true) {
					$('#quicknav > .site-source').removeClass('slide-out');
				}
				$('#quicknav > .site-source').addClass('slide-in');
				$('#quicknav > .site-source').css('left', '-400px');
				$('#quicknav > .site-source').css('opacity', '0');
				$('#quicknav > .site-source').css('transform', 'translateX(-466px)');

				$('#quicknav-icon').addClass('fa-chevron-right').removeClass('fa-chevron-left');
			}
		});

		//Update/sync content filter state
		$('.content-filter-sfw').on('click', function() {
			if(contentState == cfilter.sfw) {
				return;
			}
			updateContentState(cfilter.sfw);
			$.each(boards.getLists4chan(), function(idx, val) {
				if(val.current == 0) {
					if(val.content == 'sfw') {
						val.current = 1;
						$('li.sname-' + val.sname).removeClass('current-0').addClass('current-1');
						$('li.sname-' + val.sname).find('i').removeClass('fa-square-o').addClass('fa-check-square');
					}
				} else {
					if(val.content == 'nsfw') {
						val.current = 0;
						$('li.sname-' + val.sname).removeClass('current-1').addClass('current-0');
						$('li.sname-' + val.sname).find('i').removeClass('fa-check-square').addClass('fa-square-o');
					}
				}
			});
			if($('.toggle-4chan i').hasClass('fa-square-o')) {
				$('.toggle-4chan i').removeClass('fa-square-o').addClass('fa-check-square');
			}
		});
		$('.content-filter-all').on('click', function() {
			if(contentState == cfilter.all) {
				return;
			}
			updateContentState(cfilter.all);
			$.each(boards.getLists4chan(), function(idx, val) {
				if(val.current == 0) {
					val.current = 1;
					$('li.sname-' + val.sname).removeClass('current-0').addClass('current-1');
					$('li.sname-' + val.sname).find('i').removeClass('fa-square-o').addClass('fa-check-square');
				}
			});
			if($('.toggle-4chan i').hasClass('fa-square-o')) {
				$('.toggle-4chan i').removeClass('fa-square-o').addClass('fa-check-square');
			}
		});
		$('.content-filter-nsfw').on('click', function() {
			if(contentState == cfilter.nsfw) {
				return;
			}
			updateContentState(cfilter.nsfw);
			$.each(boards.getLists4chan(), function(idx, val) {
				if(val.current == 0) {
					if(val.content == 'nsfw') {
						val.current = 1;
						$('li.sname-' + val.sname).removeClass('current-0').addClass('current-1');
						$('li.sname-' + val.sname).find('i').removeClass('fa-square-o').addClass('fa-check-square');
					}
				} else {
					if(val.content == 'sfw') {
						val.current = 0;
						$('li.sname-' + val.sname).removeClass('current-1').addClass('current-0');
						$('li.sname-' + val.sname).find('i').removeClass('fa-check-square').addClass('fa-square-o');
					}
				}
			});
			if($('.toggle-4chan i').hasClass('fa-square-o')) {
				$('.toggle-4chan i').removeClass('fa-square-o').addClass('fa-check-square');
			}
		});

		//Update/sync activity filter state
		$('.activity-filter-live').on('click', function(){
			if(activityState == afilter.live) {
				return;
			}
			$(afiltersQuick[afilter.live]).addClass('active');
			$(afiltersFull[afilter.live]).addClass('active');
			$(afiltersQuick[activityState]).removeClass('active');
			$(afiltersFull[activityState]).removeClass('active');
			activityState = afilter.live;
		});
		$('.activity-filter-all').on('click', function(){
			if(activityState == afilter.all) {
				return;
			}
			$(afiltersQuick[afilter.all]).addClass('active');
			$(afiltersFull[afilter.all]).addClass('active');
			$(afiltersQuick[activityState]).removeClass('active');
			$(afiltersFull[activityState]).removeClass('active');
			activityState = afilter.all;
		});
		$('.activity-filter-dead').on('click', function(){
			if(activityState == afilter.dead) {
				return;
			}
			$(afiltersQuick[afilter.dead]).addClass('active');
			$(afiltersFull[afilter.dead]).addClass('active');
			$(afiltersQuick[activityState]).removeClass('active');
			$(afiltersFull[activityState]).removeClass('active');
			activityState = afilter.dead;
		});

		//Update/sync background style effect
		$('.background-style').on('change', function() {
			$(bgStyles[bgsState].child).css('display', 'none');
			$('#background-sol').removeClass(bgStyles[bgsState].parent);
			bgsState = $(this).val();
			$('#background-sol').addClass(bgStyles[bgsState].parent);
			$(bgStyles[bgsState].child).css('display', 'block');
		});

		//Update/sync background overlay effect
		$('.background-overlay').on('change', function() {
			bgolState = bgOverlays[$(this).val()];
			$('#background-sol').removeClass(bgOverlays[bgOverlays.length - 1]).addClass(bgolState);
		});

		//Toggle all 4chan boards
		$('.toggle-4chan').on('click', function() {
			var selectIcon = $(this).find('i');
			if(selectIcon.hasClass('fa-check-square')) {
				selectIcon.removeClass('fa-check-square').addClass('fa-square-o');
				$('li.status-1').each(function(idx) {
					if($(this).hasClass('current-1')) {
						$(this).find('i').removeClass('fa-check-square').addClass('fa-square-o');
						$(this).removeClass('current-1').addClass('current-0');
					}
				});
				$.each(boards.getLists4chan(), function(idx, val) {
					val.current = 0;
				});
				updateContentState(cfilter.custom);
			} else {
				selectIcon.removeClass('fa-square-o').addClass('fa-check-square');
				$('li.status-1').each(function(idx) {
					if($(this).hasClass('current-0')) {
						$(this).find('i').removeClass('fa-square-o').addClass('fa-check-square');
						$(this).removeClass('current-0').addClass('current-1');
					}
				});
				$.each(boards.getLists4chan(), function(idx, val) {
					val.current = 1;
				});
				updateContentState(cfilter.all);
			}
		});

		//Toggle individual 4chan boards
		$('li.status-1').on('click', function() {
			var sfwCount = 0, sfwCurCount = 0, nsfwCount = 0, nsfwCurCount = 0;
			var selectIcon = $(this).find('i');
			if(selectIcon.hasClass('fa-check-square')) {
				selectIcon.removeClass('fa-check-square').addClass('fa-square-o');
				$(this).removeClass('current-1').addClass('current-0');
				var sname =  $(this).attr('class').slice(6, $(this).attr('class').indexOf(' '));
				boards.getLists4chan().find(function(val){return val.sname == sname}).current = 0;
			} else if(selectIcon.hasClass('fa-square-o')) {
				selectIcon.removeClass('fa-square-o').addClass('fa-check-square');
				$(this).removeClass('current-0').addClass('current-1');
				var sname =  $(this).attr('class').slice(6, $(this).attr('class').indexOf(' '));
				boards.getLists4chan().find(function(val){return val.sname == sname}).current = 1;
			}

			$.each(boards.getLists4chan(), function(idx, val) {
				if(val.content == 'sfw') {
					if(val.current == 1) {
						sfwCurCount++;
					}
					sfwCount++;
				} else if(val.content == 'nsfw') {
					if(val.current == 1) {
						nsfwCurCount++;
					}
					nsfwCount++;
				}
			});

			if(sfwCurCount == sfwCount && nsfwCurCount == 0) {
				updateContentState(cfilter.sfw);
			} else if(sfwCurCount == sfwCount && nsfwCurCount == nsfwCount) {
				updateContentState(cfilter.all);
			} else if(sfwCurCount == 0 && nsfwCurCount == nsfwCount) {
				updateContentState(cfilter.nsfw);
			} else {
				updateContentState(cfilter.custom);
			}

			if((sfwCurCount + nsfwCurCount) == 0) {
				$('.toggle-4chan i').removeClass('fa-check-square').addClass('fa-square-o');
			} else if((sfwCurCount + nsfwCurCount) != 0 && $('.toggle-4chan i').hasClass('fa-square-o')) {
				$('.toggle-4chan i').removeClass('fa-square-o').addClass('fa-check-square');
			}
		});
	}

	function updateContentState(newContentState) {
		if(newContentState == contentState) {
			return;
		} else if(contentState == cfilter.custom) {
			$(cfiltersQuick[newContentState]).addClass('active');
			$(cfiltersFull[newContentState]).addClass('active');
		} else if(newContentState == cfilter.custom) {
			$(cfiltersQuick[contentState]).removeClass('active');
			$(cfiltersFull[contentState]).removeClass('active');
		} else if(newContentState == cfilter.sfw) {
			$(cfiltersQuick[cfilter.sfw]).addClass('active');
			$(cfiltersFull[cfilter.sfw]).addClass('active');
			$(cfiltersQuick[contentState]).removeClass('active');
			$(cfiltersFull[contentState]).removeClass('active');
		} else if(newContentState == cfilter.all) {
			$(cfiltersQuick[cfilter.all]).addClass('active');
			$(cfiltersFull[cfilter.all]).addClass('active');
			$(cfiltersQuick[contentState]).removeClass('active');
			$(cfiltersFull[contentState]).removeClass('active');
		} else if(newContentState == cfilter.nsfw) {
			$(cfiltersQuick[cfilter.nsfw]).addClass('active');
			$(cfiltersFull[cfilter.nsfw]).addClass('active');
			$(cfiltersQuick[contentState]).removeClass('active');
			$(cfiltersFull[contentState]).removeClass('active');
		}
		contentState = newContentState;
	}

	var getContentState = function() {
		return contentState;
	}

	var getActivityState = function() {
		return activityState;
	}

	var getcfilter= function() {
		return cfilter;
	}

	var getafilter = function() {
		return afilter;
	}

	return {
		initialize: initialize,
		getContentState: getContentState,
		getActivityState: getActivityState,
		getcfilter: getcfilter,
		getafilter: getafilter
	};
}