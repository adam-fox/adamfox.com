$(document).ready(function () {
	var owl = $('.owl-carousel');
	owl.owlCarousel({
		center: true,
		items: 1,
		loop: true,
		margin: 20,
		responsiveClass: true,
		autoplay: true,
		onDrag: onDragStart,
		onDragged: onDragEnd
	});

	$('.desktop-navigation li a, .navbar-navigation li').each(function () {
		$(this).on('click', function () {
			var navClass = $(this).attr('class');
			$(window).scrollTo('#' + navClass, 500);
			$(".navbar-collapse").collapse('hide');
		});
	});

	var amountScrolled = $('.carousel').outerHeight(),
		scrollElement = $('.scroll-to-top');
	
	$(window).scroll(function () {
		if ($(window).scrollTop() > amountScrolled) {
			scrollElement.fadeIn('slow');
		} else {
			scrollElement.fadeOut('slow');
		}
	});
	scrollElement.on('click', function () {
		$(window).scrollTo('html', 500);
	});
	
	$('.fa-chevron-left').on('click', function () {
		owl.trigger('prev.owl.carousel');
	});	
	
	$('.fa-chevron-right').on('click', function () {
		owl.trigger('next.owl.carousel');
	});
	
	
	function onDragStart(event) {
		$('.main-heading, .fa-chevron-left, .fa-chevron-right').fadeOut();
	};
	function onDragEnd(event) {
		$('.main-heading, .fa-chevron-left, .fa-chevron-right').fadeIn();
	}
});