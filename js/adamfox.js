var browser;
var viewport;
var image;
var browserWidth;
var browserHeight;
var browserPosition;
var containerHeight;
var scrolledDistance;
	
function isScrolledIntoFullView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function isScrolledIntoTopView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return (elemTop <= docViewBottom);
}

$(window).resize(function() {
	if($(window).width() < 1024){
		$('.description').css('transform', 'translate( 0px, 0px)');
	} else {
		$('.description').each(function () {
			if (isScrolledIntoTopView(this) === true) {
				$(this).css('transform', 'translate( 0px, ' + ($(window).scrollTop() + $(window).height() - $(this).parent().offset().top) / 10  + 'px )');
			}	
		});
	}
	if($(browser).hasClass('on')) {
		$(browser).css({top: browserPosition.top, left: browserPosition.left, width: browserWidth, height: browserHeight});
		setTimeout(function() {
			$('.pagination').removeAttr('style');
			$('header').removeClass('zoom');
			$('#test').css({"opacity" : "0"});
			$(browser).removeAttr('style');
			$(browser).removeClass('on');
	    }, 200);
	}
});

$(window).scroll(function() {
	
	
	if($(window).scrollTop() > scrolledDistance + 100 || $(window).scrollTop() < scrolledDistance - 100) {
		if($(browser).hasClass('on')) {
			$(browser).removeClass('on');
			$(browser).css({top: browserPosition.top, left: browserPosition.left, width: browserWidth, height: browserHeight});
			$(".viewport").removeAttr('style');
			setTimeout(function() {
				$('.pagination').removeAttr('style');
				$('header').removeClass('zoom');
				$('#test').css({"opacity" : "0"});
				$(browser).removeAttr('style');
				$(browser).parent().removeAttr('style');
		    }, 300);
		}
	}
	
	if($(window).width() >= 1024){
		$('.description').first().css('transform', 'translate( 0px, ' + $(window).scrollTop() / 10  + 'px )');
		
		$('.description').slice(1).each(function () {
			if (isScrolledIntoTopView(this) === true) {
				$(this).css('transform', 'translate( 0px, ' + ($(window).scrollTop() + $(window).height() - $(this).parent().offset().top) / 10 + 'px )');
			}	
		});
	}
/*
	$('.social').each(function () {
		if (isScrolledIntoTopView(this) === true) {
			$(this).children('a').addClass('in-view');
		}
	});
*/
	
	if (isScrolledIntoFullView('.expertise > ul > li:nth-child(1) > div') === true) {
		$('.expertise > ul > li > div').each(function(i){
			var row = $(this);
			setTimeout(function() {
				row.addClass('in-view');
			}, 100*i);
		});
	}
	
	$('.history > ul > li').each(function () {
		if (isScrolledIntoTopView(this) === true) {
			$(this).prev().addClass('line-animation');
			$(this).addClass('in-view');
		}
	});

	
	var scrollTop = $(window).scrollTop();
	
	if($("header").offset().top - $(window).scrollTop() <= 0) {
		$("header").addClass("on");
		$('#bg_main').fadeOut(1000);
	} 
	if($(window).scrollTop() <= 0) {
		$("header").removeClass("on");
		$('#bg_main').fadeIn();
	}
});



// init controller
/*
var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 100}});

$(".expertise > ul > li > div").each(function (index, elem) {
	
	var myScene = new ScrollMagic.Scene({
        triggerElement: this,
        duration: 2000,
        triggerHook: "onEnter"
    })
    
	.setClassToggle(this, 'in-view')
// 	.removeClassToggle(false)
		.addIndicators()
	    .addTo(controller);
	
});
*/

/*
$(".history > ul > li").each(function (index, elem) {
	new ScrollMagic.Scene({triggerElement:elem, triggerHook: "onEnter"})
	.setClassToggle(elem, "line-animation") // add class toggle
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);
});
*/

$("header > .wrapper > svg").click(function() {
	$("html, body").animate({ scrollTop: "0px" });
});

// ***************
// PROJECT MAGNIFY
// ***************

$(".browser").click(function() {
	if($(this).hasClass('on')){
		$(browser).removeClass('on');
		$(browser).css({top: browserPosition.top, left: browserPosition.left, width: browserWidth, height: browserHeight});
		$(".viewport").removeAttr('style');
		setTimeout(function() {
			$('.pagination').removeAttr('style');
			$('header').removeClass('zoom');
			$('#test').css({"opacity" : "0"});
			$(browser).removeAttr('style');
			$(browser).parent().removeAttr('style');
	    }, 300);
	} else {
		browser = $(this);
		viewport = $(this).parent().parent().attr('class').replace('project ','');
		imageHeight = $(browser).find("." + viewport)[0].naturalHeight / 2;
		imageWidth = $(browser).find("." + viewport)[0].naturalWidth / 2;
		browserWidth = $(browser).width();
		browserHeight = $(browser).height();
		browserPosition = $(browser).offset();
		containerHeight = $(this).parent().height();
		scrolledDistance = $(window).scrollTop();
		aspectRatio = browserHeight / browserWidth;
		browserChrome = $(browser).find(".viewport").css("top").replace('px', '');
		
		$('#test').css({"opacity" : "1"});
// 		$(browser).parent().css({height: containerHeight});
		$(browser).parent().find(".pagination").css({'margin-top': browserHeight + 60 + 'px'}); //FIX
		$(browser).css({transition: 'none', top: browserPosition.top, left: browserPosition.left, width: browserWidth, height: browserHeight, position: 'absolute', 'z-index' : '9999'});
		$(browser).addClass("on");
		$("header").addClass("zoom");
		
		setTimeout(function() {
			$(browser).find(".viewport").css({
				transition: 'all .25s linear',
				top:"0", 
				border: "none", 
				"border-radius":"0px"
			});
			$(browser).css({
				transition: 'all .25s linear',
				"border-radius":"8px"
			});
	    }, 100);

		setTimeout(function() {
			
			if(browserWidth * 2 > $(window).width()) { 
				
				$(browser).css({
					left: $(window).width() * .1,
					width: $(window).width() * .8
				});
				
				if(browserHeight * 2 > $(window).height()) {
					$(browser).css({
						height: $(window).height() - browserChrome * .8,
						top: $(window).scrollTop() + ($(window).height() - $(window).height() * .8) / 2
					});
					
				} else {
					
					$(browser).css({
						height: $(window).width() * .8 * aspectRatio - browserChrome, //FIX
						top: $(window).scrollTop() + ($(window).height() - $(window).width() * .8 * aspectRatio - browserChrome) / 2
					});
					
				}
				
			}  else {
				$(browser).css({
					left: 'calc( 50% - ' + browserWidth + 'px )', 
					width: browserWidth * 2
				});
				
				if(browserHeight * 2 > $(window).height()) {
					$(browser).css({
						height: $(window).height() * .8,
						top: $(window).scrollTop() + ($(window).height() - ($(window).height() * .8)) / 2
					});
					
				} else {
					
					$(browser).css({
						height: (browserHeight - browserChrome) * 2,
						top: $(window).scrollTop() + ($(window).height() - (browserHeight - browserChrome) * 2) / 2
					});
					
				}
			}
			
		}, 100);
		
	}
});

$(".btn_menu").click(function() {
	$(this).toggleClass('on');
	$('nav > ul').toggleClass('on');
	$('.logo_af').toggleClass('hidden');
	$('.logo_circle').toggleClass('hidden');
});

// **********
// TOUCHSWIPE
// **********

$(function() {      
	//Enable swiping...
	$(".browser").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			var browser = $(this);
			var paginationNext = browser.parent().children(".pagination").children(".on");
			if(browser.parent().children(".pagination").children("a").last().hasClass("on")){
				browser.css("transform","translate( -100vw ,0)");
				browser.parent().children(".pagination").children(".on").removeClass("on");
				browser.parent().children(".pagination").children("a").first().addClass("on");
				setTimeout(function() {
					browser.css("transition","none");
					browser.css("transform","translate( 100vw ,0)");
			    }, 250);
			    setTimeout(function() {
					browser.find(".viewport > img.desktop").css("left", "0%");
					browser.find(".viewport > img.tablet").css("left", "0%");
					browser.find(".viewport > img.mobile").css("left", "0%");
					browser.css("transition","all .25s linear");
					browser.css("transform","translate(0,0)");
			    }, 350);
			} else {
				paginationNext.next().trigger("click");
			}
			
		},
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			var browser = $(this);
			var paginationPrev = browser.parent().children(".pagination").children(".on").prev();
			if(browser.parent().children(".pagination").children("a").first().hasClass("on")){
				browser.css("transform","translate( 100vw ,0)");
				browser.parent().children(".pagination").children(".on").removeClass("on");
				browser.parent().children(".pagination").children("a").last().addClass("on");
				setTimeout(function() {
					browser.css("transition","none");
					browser.css("transform","translate( -100vw ,0)");
			    }, 250);
			    setTimeout(function() {
					browser.find(".viewport > img.desktop").css("left", "calc( -" + browser.parent().children(".pagination").children("a").last().index() * 100 + "% - " +  paginationPrev.index() + "px)");
					browser.find(".viewport > img.tablet").css("left", "calc( -" + browser.parent().children(".pagination").children("a").last().index() * 100 + "% - " +  paginationPrev.index() + "px)");
					browser.find(".viewport > img.mobile").css("left", "calc( -" + browser.parent().children(".pagination").children("a").last().index() * 100 + "% - " +  paginationPrev.index() + "px)");
					browser.css("transition","all .25s linear");
					browser.css("transform","translate(0,0)");
			    }, 350);
			} else {
				paginationPrev.trigger("click");
			}
		},
		threshold:25
	});
});


$(".pagination > a").click(function() {
	var paginationClicked = $(this);
	var paginationOn = $(this).parent().find('.on');
	
	if(!$(this).hasClass("on")) {
		
		if(paginationClicked.index() > paginationOn.index()) {
			paginationClicked.parent().parent().children(".browser").css("transform","translate( -100vw ,0)");
			paginationOn.removeClass("on");
			paginationClicked.addClass("on");
			setTimeout(function() {
				paginationClicked.parent().parent().children(".browser").css("transition","none");
				paginationClicked.parent().parent().children(".browser").css("transform","translate( 100vw ,0)");
				
		    }, 250);
		} else {
			paginationClicked.parent().parent().children(".browser").css("transform","translate( 100vw ,0)");
			paginationOn.removeClass("on");
			paginationClicked.addClass("on");
			setTimeout(function() {
				paginationClicked.parent().parent().children(".browser").css("transition","none");
				paginationClicked.parent().parent().children(".browser").css("transform","translate( -100vw ,0)");
		    }, 250);
		}
		setTimeout(function() {
			paginationClicked.parent().parent().find(".browser > .viewport > img.desktop").css("left", "calc( -" + paginationClicked.index() * 100 + "% - " +  paginationClicked.index() + "px)");
			paginationClicked.parent().parent().find(".browser > .viewport > img.tablet").css("left", "calc( -" + paginationClicked.index() * 100 + "% - " +  paginationClicked.index() + "px)");
			paginationClicked.parent().parent().find(".browser > .viewport > img.mobile").css("left", "calc( -" + paginationClicked.index() * 100 + "% - " +  paginationClicked.index() + "px)");
			paginationClicked.parent().parent().children(".browser").css("transition","all .25s linear");
			paginationClicked.parent().parent().children(".browser").css("transform","translate(0,0)");
	    }, 350);
	}	

});



$(".main").click(function() {
	$('html, body').animate({ scrollTop: $("#experience").offset().top - 120 }, 2000);
});

var animationEvent = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

$(".btn").click(function () {
	if(!$(this).hasClass("disabled")) {
		$(this).addClass('on');
		$(this).one(animationEvent, function(event) {
			$(this).removeClass('on');
		});
	}
});

$(".plus").click(function() {
	
	if(!$(this).hasClass("disabled")) {
		$(this).parent().children(".minus").removeClass("disabled");
		if($(this).parent().parent().parent().hasClass("mobile")) {
			if($(this).parent().parent().parent().find(".browser > .viewport > img.tablet")[0]) {
				$(this).parent().parent().parent().removeClass("mobile");
				$(this).parent().parent().parent().addClass("tablet");
				$(this).parent().children("span").text("Tablet");
				
				if(!$(this).parent().parent().parent().find(".browser > .viewport > img.desktop")[0]) {
					$(this).addClass("disabled");
				}
			} else if($(this).parent().parent().parent().find(".browser > .viewport > img.desktop")[0]) {
				$(this).parent().parent().parent().removeClass("mobile");
				$(this).parent().parent().parent().addClass("desktop");
				$(this).parent().children("span").text("Desktop");
				$(this).addClass("disabled");
			}
		} else if($(this).parent().parent().parent().hasClass("tablet")) {
			if($(this).parent().parent().parent().find(".browser > .viewport > img.desktop")[0]) {
				$(this).parent().parent().parent().removeClass("tablet");
				$(this).parent().parent().parent().addClass("desktop");
				$(this).parent().children("span").text("Desktop");
				$(this).addClass("disabled");
			}
		}
	}
});

$(".minus").click(function() {
	if(!$(this).hasClass("disabled")) {
		$(this).parent().children(".plus").removeClass("disabled");
		if($(this).parent().parent().parent().hasClass("tablet")) {
			if($(this).parent().parent().parent().find(".browser > .viewport > img.mobile")[0]) {
				$(this).parent().parent().parent().removeClass("tablet");
				$(this).parent().parent().parent().addClass("mobile");
				$(this).parent().children("span").text("Mobile");
				$(this).addClass("disabled");
			}
		} else if($(this).parent().parent().parent().hasClass("mobile")) {
		} else {
			if($(this).parent().parent().parent().find(".browser > .viewport > img.tablet")[0]) {
				$(this).parent().parent().parent().removeClass("desktop");
				$(this).parent().parent().parent().addClass("tablet");
				$(this).parent().children("span").text("Tablet");
				
				if(!$(this).parent().parent().parent().find(".browser > .viewport > img.mobile")[0]) {
					$(this).addClass("disabled");
				}
			} else if($(this).parent().parent().parent().find(".browser > .viewport > img.mobile")[0]) {
				$(this).parent().parent().parent().removeClass("desktop");
				$(this).parent().parent().parent().addClass("mobile");
				$(this).parent().children("span").text("Mobile");
				$(this).addClass("disabled");
			}
		}
	}
});



/*
$(document).ready(function () {
    var classes = new Array ('desktop', 'mobile', 'tablet');
    var length = classes.length;
    var links = $('.browser').slice(1);

    $.each( links, function(key, value) {
	    var theClass = classes[ Math.floor ( Math.random() * length ) ];
        $(value).addClass(theClass);
    });
    
    $(links).each(function () {
	    if($(this).hasClass("desktop")) {
	        $(this).parent().find(".plus").addClass("disabled");
        } else if ($(this).hasClass("mobile")) {
        	$(this).parent().find(".minus").addClass("disabled");
        	$(this).parent().find("span").text("Mobile");
        } else {
	        $(this).parent().find("span").text("Tablet");
        }
	});
});
*/