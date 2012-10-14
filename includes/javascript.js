$(document).ready(function() {

	// Create a function 
	function getSize() {
		
		// Get the width and height of the window
		var winHeight = $(window).height();
		var winWidth = $(window).width();
		
		// Change the divs to that width and height
		$('[data-full="true"]').css({'width' : winWidth+'px', 'height' : winHeight+'px'});
		
		// An exception for iPods and iPhones
		if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
			$('[data-full="true"]').css({'width' : winWidth+'px', 'height' : winHeight+70+'px'});
			$('#home').css({'width' : winWidth+'px', 'height' : winHeight+'px'});
		}
			
		
		// Remove classes
		$('#menu a').removeClass('current');
		$('#header').removeClass('dark light');
		
		
		// Check what page we're on in the document using the height and
		// scroll postion (That's $(window).scrollTop())
		
		var currentPage = $(window).scrollTop() + 60;
		
		if(currentPage < winHeight) {
			// Add correct classes, repeat for different sizes
			$('#menu a[href="#home"]').addClass('current');
			$('#header').addClass('light');
		} else if(currentPage > winHeight && currentPage < winHeight*2) {
			$('#menu a[href="#about"]').addClass('current');
			$('#header').addClass('light');
		} else if(currentPage > winHeight*2 && currentPage < winHeight*3) {
			$('#menu a[href="#services"]').addClass('current');
			$('#header').addClass('dark');
		} else if(currentPage > winHeight*3 && currentPage < winHeight*4) {
			$('#menu a[href="#contact"]').addClass('current');
			$('#header').addClass('dark');

		}
	}	
	
	// When the user clicks a #header anchor
	$('#header a').click(function() {
		// Get the hash of the anchor
		var hash = $(this).attr('href');
		// Get the offset (i.e. what height it is at on the document) plus 2 
		var offset = $(hash).offset().top+2;
		
		// Animate the document to scroll down slowly
		$('html,body').animate({scrollTop: offset},'slow', function() {
			// When the scrolling is done, change the hash accordingly.
			window.location.hash = hash;
		});
		// Override default behaviour (so clicking the link wont automatically jump to the hash
		return false;	
	});
	
	// When the user is scrolling
	$(window).scroll(function() {
		// Assuming they aren't scrolling beyond the document (mobile issue)
		if($(window).scrollTop() < $(window).height()*3.5) {
			// Change the header position so it's always attached to the top of the document
			$('#header').stop().animate({'top' : $(window).scrollTop()+'px'}, 20);
		}
	});
	
	// When the user resizes the winow
	$(window).resize(function() {
		// Get the hash and height
		var hash = window.location.hash;
		var height = $(window).height();
		
		// Maintain scroll position based on hash.
		if(hash == '#home') { $(window).scrollTop(0); }
		else if(hash == '#skills') { $(window).scrollTop(height); }
		else if(hash == '#portfolio') { $(window).scrollTop(((height)*2)); }
		else if(hash == '#about') { $(window).scrollTop((height*3)); }

	});
	
	// ABOUT PAGE
	
	function aboutPage() {
		// Get the width and height of the about page, and divide the height by 4
		var aboutWidth = $('#about').width();
		var aboutHeight = $('#about').height() / 4;
			
		// Run a loop that adds circles
		for(var noCircles = 65; noCircles > 0; --noCircles) {
			
			// Get a random co-ordinate, random size, and a random opacity
			var randX = Math.floor(Math.random() * (aboutWidth + 1)) - 20;
			var randY = Math.floor(Math.random() * (aboutHeight + 1)) - 20;
			var randNo = Math.floor(Math.random() * 49) + 20; // Random height/width
			var randOp = (Math.floor(Math.random() * (10)) + 1) / 10;
				
			// Get more random co-ordinates for the second background element
			var randX2 = Math.floor(Math.random() * (301));
			var randY2 = Math.floor(Math.random() * (111));
			
			// Fill the two background divs with circles. We use two because
			// It allows for a certain amount of room if the user resizes the window
			$('#about .background').append('<span class="circle" style="width: '+randNo+'px; height: '+randNo+'px; opacity: '+randOp+'; bottom: '+randY+'px; left: '+randX+'px"></span>');
			$('#about .background-2').append('<span class="circle-2" style="width: '+randNo+'px; height: '+randNo+'px; opacity: '+randOp+'; left: '+randY2+'%; top: '+randX2+'px"></span>');
		}
		
	}
	
	// CONTACT PAGE 
	
	function contactBackground() {
		
		// The number of layers we'll be working with
		var layers = 9;
		
		// The window width and the number of triangles we should use.
		var theWidth = $(window).width();	
		var numberTri = Math.ceil(theWidth / 60);	
		
		// Run a loop to add some 'layer' divs based on the number of layers
		for(var i = 0; i < layers; ++i) {
			$('#contact .background').append('<div class="layer"></div>');
		}	
		
		// Then add some triangles to each div
		$('#contact .background .layer').each(function() {
			
			// Overcompensate so that the triangles dont abruptly end
			var newWidth = numberTri * 60;
			
			// Then change the CSS for the layer based on the number of triangles
			$(this).css({'width' : newWidth+300+'px'});
			// Append spans (that act as triangles) as needed
			for(var j = 0; j < (numberTri/2)+2; ++j) {
				$(this).append('<span></span>');
			}
			// Reduce number of triangles for the next layer
			numberTri = Math.ceil(numberTri - 1);
			
		});
		
	}
	
	/* RUN ALL FUNCTIONS */
	
	contactBackground();
	aboutPage();
	getSize();
	$(window).resize(getSize);
	$(window).scroll(getSize);
	
});

