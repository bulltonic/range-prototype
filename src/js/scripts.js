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

	// ==============================================================*/
	// Range slider configurations
	// ==============================================================*/

	var $document = $(document);
	var selector = '[data-rangeslider]';
	var $element = $(selector);

	// For ie8 support
	var textContent = ('textContent' in document) ? 'textContent' : 'innerText';

	// Example functionality to demonstrate a value feedback
	function valueOutput(element) {
		var value = element.value;
		//var output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0];
		//output[textContent] = value;
	}

	$document.on('input', 'input[type="range"], ' + selector, function(e) {
		// valueOutput(e.target);
	});

	$element.rangeslider({

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
		    		
		    		// $('.range-content').removeClass('active');
		    		$this.addClass('active');

		    	} else {
		    		
		    	}

	    	});

	    },

	    // Callback function
	    onSlide: function(position, value) {
	    	
	    	// Current active range
	    	$currentRange = this.$element;

	    	// Current active ranges value
	    	$currentRangeValue = this.value;

	    	// Value containers
	    	$newHomeValueContainer = $currentRange.closest('.range-input-content-wrapper').find($('.range-content .built-home .value-amount'));
	    	$oldHomeValueContainer = $currentRange.closest('.range-input-content-wrapper').find($('.range-content .old-home .value-amount'));
	    	$ratingContainer = $currentRange.closest('.range-input-content-wrapper').find($('.range-content .value'));
	    	
	    	// Updates the value within the range inner circle
	    	this.$element.next('.rangeslider').find('.rangeslider__handle').attr('data-value', value);

	    	// Updates the value within the header in the range content div
	    	$ratingContainer.text(value);

	    	// Disables/enables the text and the ends of the ranges
	    	if ( $currentRangeValue < 10) {

	    		this.$element.next('.rangeslider').addClass('disable-begin-status');

	    	} else {
				
				this.$element.next('.rangeslider').removeClass('disable-begin-status');


	    	}
	    	if ( $currentRangeValue > 140) {

	    		this.$element.next('.rangeslider').addClass('disable-end-status');

	    	} else {
				
				this.$element.next('.rangeslider').removeClass('disable-end-status');


	    	}

	    	// Calculates and updates the values of savings within the range content div if
	    	// the value/score is "better then" 100. The lower the "score" the better
			
	    	if ( $currentRangeValue < 100) {


	    		// New home value
	    		var $newHomeCost = 2335,
	    			$newHomeScore = value*17.73247,
	    			$newHomeValue = $newHomeCost - $newHomeScore,
	    			$newHomeValue = '$' + $newHomeValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

	    			$newHomeValueContainer.text($newHomeValue);
	    			

	    			$oldHomeValueContainer.text('$0');

	    	} else {

	    		// Old home value
	    		var $oldHomeCost = 125,
	    			$oldHomeScore = value*7.73247,
	    			$oldHomeValue = $oldHomeCost - $oldHomeScore,
	    			$oldHomeValue = '$' + $oldHomeValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

	    		$newHomeValueContainer.text('$0');

	    		$oldHomeValueContainer.text($oldHomeValue);

	    	}

    		$currentRange.closest('.range-input-content-wrapper').find($('.range-content')).removeClass('active');

    		// Reset charts to 100% or 0%
    		$currentRange.closest('.range-input-content-wrapper').find($('.range-content .pie')).each(function(pie) {
				
				$this = $(this);

				$this.find('circle').attr("stroke-dasharray", "100 100");

			});


	    	$('.range-content').each(function(e){

	    		$rangeContent = $(this);

	    		if ( ( $currentRangeValue > $rangeContent.data('value-min') ) && ( $currentRangeValue < $rangeContent.data('value-max')) ) {
	    				
		    		$currentRange.closest('.range-input-content-wrapper').find($rangeContent).addClass('active');



		    		// Change chart value to animate to value on .pie element
		    		$currentRange.closest('.range-input-content-wrapper').find('.pie').each(function(pie) {
						
						$this = $(this);
						
						var value = $this.data('chart-value');
					
						$circle = $this.find('circle');

						$this.find('circle').attr("stroke-dasharray", value + " 100");

					});

		    	} 

	    	});


	    },

	    // Callback function
	    onSlideEnd: function(position, value) {

	    	// Current active range
	    	$currentRange = this.$element;

	    	// Current active ranges value
	    	$currentRangeValue = this.value;

    		$currentRange.closest('.range-input-content-wrapper').find($('.range-content')).removeClass('active');

    		// Reset charts to 100% or 0%
    		$currentRange.closest('.range-input-content-wrapper').find($('.range-content .pie')).each(function(pie) {
				
				$this = $(this);	

				$this.find('circle').attr("stroke-dasharray", "100 100");

			});

	    	$('.range-content').each(function(e){

	    		$rangeContent = $(this)

	    		if ( ( $currentRangeValue > $rangeContent.data('value-min') ) && ( $currentRangeValue < $rangeContent.data('value-max')) ) {
	    				
		    		$currentRange.closest('.range-input-content-wrapper').find($rangeContent).addClass('active');

		    		// Change chart value to animate to value on .pie element
		    		$currentRange.closest('.range-input-content-wrapper').find($('.range-content .pie')).each(function(pie) {
						
						$this = $(this);
						var value = $this.data('chart-value');
					
						$circle = $this.find('circle');
						$this.find('circle').attr("stroke-dasharray", value + " 100");

					});

		    	} 

	    	});

    		if ( ( $currentRangeValue < $this.data('value-min') ) || ( $currentRangeValue > $this.data('value-max')) ) {
	    		
	    		if( $this.hasClass('active') ) {

	    			$this.addClass('disabled');

	    		} 

	    	}
	    }

	});

	// ==============================================================*/
	// Chart generation
	// ==============================================================*/


	function createSvgEl(tag) {
	    return document.createElementNS('http://www.w3.org/2000/svg', tag);
	}

	$('.pie').each(function() {
		$this = $(this);
		var value = $this.data('chart-value');
		var svg = createSvgEl('svg');
		var circle = createSvgEl('circle');
		var title = createSvgEl('title');
		circle.setAttribute("r", "16");
		circle.setAttribute("cx", "16");
		circle.setAttribute("cy", "16");
		circle.setAttribute("stroke-dasharray", "100 100");
		svg.setAttribute("viewBox", "0 0 32 32");
		// title.text(p);
		svg.append(title);
		svg.append(circle);
		$this.append(svg);
		setTimeout(function(){ 
			circle.setAttribute("stroke-dasharray", value + " 100");
		}, 100);
	});

	$('.bar').each(function() {
		$this = $(this);
		var value = $this.data('chart-value');
		var svg = createSvgEl('svg');
		var rectangle = createSvgEl('rect');
		var title = createSvgEl('title');
		var cost = $this.find('.cost');
		rectangle.setAttribute("height", "100%");
		rectangle.setAttribute("width", "0");
		// rectangle.setAttribute("cy", "16");
		// svg.setAttribute("viewBox", "0 0 200 25");
		// title.text(p);
		svg.append(title);
		svg.append(rectangle);
		$this.append(svg);
		// setTimeout(function(){ 
		// 	rectangle.setAttribute("width", value+'%' );
		// 	cost.css({'left': value+'%'});
		// }, 100);
	});

	var watchers = $('.bar').map(function(i, element) {

		var watcher = scrollMonitor.create( element );

		watcher.lock();

		if (watcher.isInViewport) {

			$('.bar').each(function() {

				$this = $(this);
				var value = $this.data('chart-value');
				var cost = $this.find('.cost');
				var rectangle = $this.find('svg rect');
				setTimeout(function(){
					rectangle.attr({'width': value+'%'});
					cost.css({'left': value+'%'});
				}, 250);
			});
						
		} else if (watcher.isBelowViewport) {

			watcher.fullyEnterViewport(function() {

				$('.bar').each(function() {
					$this = $(this);
					var value = $this.data('chart-value');
					var cost = $this.find('.cost');
					var rectangle = $this.find('svg rect');
					setTimeout(function(){
						rectangle.attr({'width': value+'%'});
						cost.css({'left': value+'%'});
					}, 250);
				});

			});

			watcher.exitViewport(function() {

				$('.bar').each(function() {
					$this = $(this);
					var value = $this.data('chart-value');
					var cost = $this.find('.cost');
					var rectangle = $this.find('svg rect');
						rectangle.attr({'width': '0%'});
						cost.css({'left': '0%'});
				});

			});

		} 

		return watcher;

	});


});

