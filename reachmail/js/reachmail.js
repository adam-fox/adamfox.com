$('#nav-solutions').click(function() {
    $('#dd-about').hide();
    $('#dd-solutions').show();
    $('#dd-solutions').addClass('active');
});

$('#nav-about').click(function() {
    $('#dd-solutions').hide();
    $('#dd-about').show();
    $('#dd-about').addClass('active');
});

$("#nav-solutions").click(function(e) {
    e.stopPropagation();
});

$("#dd-solutions").click(function(e) {
    e.stopPropagation();
});

$("#nav-about").click(function(e) {
    e.stopPropagation();
});

$("#dd-about").click(function(e) {
    e.stopPropagation();
});

$('body').click(function() {
	if($('#dd-solutions').hasClass('active')) {
		$("#dd-solutions").hide();
	}
	if($('#dd-about').hasClass('active')) {
		$("#dd-about").hide();
	}
});