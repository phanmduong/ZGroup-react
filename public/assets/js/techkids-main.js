$(document).ready(function(){
	console.log("Hello World")

	$('#newest-post').slick({
	  slidesToShow: 3,
	  arrows: false,
	  responsive: [
	  	{
      		breakpoint: 768,
      		settings: {
        		slidesToShow: 1,
        		dots: true
        	}
    	}
	  ]
	});
})