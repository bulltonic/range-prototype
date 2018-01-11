$(document).ready(function(){

	// ==============================================================*/
	// Remove loading class to "note" document is ready
	// ==============================================================*/

	$('body').removeClass('loading');

	// ==============================================================*/
	// Create node and insert SVG file after the body
	// ==============================================================*/

	// Remove local file and uncomment below once on the dev server

	// $.get("./img/spritemap.svg", function(data) {
	//   var div = document.createElement("div");
	//   div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
	//   document.body.insertBefore(div, document.body.childNodes[0]);
	// });

	$('input[type="range"]').rangeslider({

	    // Feature detection the default is `true`.
	    // Set this to `false` if you want to use
	    // the polyfill also in Browsers which support
	    // the native <input type="range"> element.
	    polyfill: false,

	    // Default CSS classes
	    rangeClass: 'rangeslider',
	    disabledClass: 'rangeslider--disabled',
	    horizontalClass: 'rangeslider--horizontal',
	    verticalClass: 'rangeslider--vertical',
	    fillClass: 'rangeslider__fill',
	    handleClass: 'rangeslider__handle',

	    // Callback function
	    onInit: function() {

	    	$('.rangeslider__handle').attr('data-value', '70').append('<span class="arrows"></span>');

	    	$('.range-content').each(function(e){

	    		$this = $(this);

	    		if ( ( 70 > $this.data('value-min') ) && ( 70 < $this.data('value-max')) ) {
		    		$('.range-content').removeClass('active');
		    		$this.addClass('active');
		    	} else {
		    		
		    	}

	    	});

	    },

	    // Callback function
	    onSlide: function(position, value) {
	    	
	    	// Updates the value within the range inner circle
	    	$('.rangeslider__handle').attr('data-value', value);

	    	// Updates the value within the header in the range content div
	    	$('.range-content .value').text(value);

	    	// Calculates and updates the values of savings within the range content div if
	    	// the value/score is "better then" 100. The lower the "score" the better
			
	    	if (value < 100) {

	    		var $newHomeCost = 2335,
	    			$newHomeScore = value*17.73247,
	    			$newHomeValue = $newHomeCost - $newHomeScore,
	    			$newHomeValue = '$' + $newHomeValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

	    			$('.range-content .built-home .value-amount').text($newHomeValue);
	    			

	    			$('.range-content .old-home .value-amount').text('$0');

	    	} else {

	    		var $oldHomeCost = 125,
	    			$oldHomeScore = value*7.73247,
	    			$oldHomeValue = $oldHomeCost - $oldHomeScore,
	    			$oldHomeValue = '$' + $oldHomeValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

	    		$('.range-content .built-home .value-amount').text('$0');

	    		$('.range-content .old-home .value-amount').text($oldHomeValue);

	    	}

	    	$('.range-content').each(function(e){

	    		$this = $(this);

	    		if ( ( value > $this.data('value-min') ) && ( value < $this.data('value-max')) ) {
		    		$('.range-content').removeClass('active');
		    		$this.addClass('active');
		    	} 

	    		if ( ( value < $this.data('value-min') ) || ( value > $this.data('value-max')) ) {
		    		
		    		if( $this.hasClass('active') ) {
		    			$this.addClass('disabled');
		    		} 

		    	} else {
	    			$('.range-content').removeClass('disabled');
	    		} 

	    	});

	    },

	    // Callback function
	    onSlideEnd: function(position, value) {
	    	
	    	$('.range-content').each(function(e){

	    		$this = $(this);

	    		if ( ( value > $this.data('value-min') ) && ( value < $this.data('value-max')) ) {
		    		$('.range-content').removeClass('active');
		    		$this.addClass('active');
		    	} 

	    	});
	    }
	});

	

})