// JavaScript Document
/* madebycat */
/* umit karaosmanoglu */

/*global $:false */
/* ------------------------------------ WINDOW.LOAD ------------------------------- */
$(window).load(function(){
	"use strict";
}); // END___ window.load


/* ------------------------------------ FUNCTION ------------------------------- */
$(function(){
	"use strict";
	
	// main content slider
	$('#mainSlider').responsiveSlides({
		auto: true,             // Boolean: Animate automatically, true or false
		speed: 500,             // Integer: Speed of the transition, in milliseconds
		timeout: 10000,         // Integer: Time between slide transitions, in milliseconds
		pager: false,           // Boolean: Show pager, true or false
		nav: true,              // Boolean: Show navigation, true or false
		random: false,          // Boolean: Randomize the order of the slides, true or false
		pause: false,           // Boolean: Pause on hover, true or false
		pauseControls: true,    // Boolean: Pause when hovering controls, true or false
		prevText: "Previous",   // String: Text for the "previous" button
		nextText: "Next",       // String: Text for the "next" button
		maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
		navContainer: ".mainSliderNav",       // Selector: Where controls should be appended to, default is after the 'ul'
		manualControls: "",     // Selector: Declare custom pager navigation
		namespace: "rslides",   // String: Change the default namespace used
		before: function(){},   // Function: Before callback
		after: function(){}     // Function: After callback
	});
	
	// bottom image slider
	$('#bottomSlider').responsiveSlides({
		auto: true,             // Boolean: Animate automatically, true or false
		speed: 500,             // Integer: Speed of the transition, in milliseconds
		timeout: 10000,         // Integer: Time between slide transitions, in milliseconds
		pager: false,           // Boolean: Show pager, true or false
		nav: true,              // Boolean: Show navigation, true or false
		random: false,          // Boolean: Randomize the order of the slides, true or false
		pause: false,           // Boolean: Pause on hover, true or false
		pauseControls: true,    // Boolean: Pause when hovering controls, true or false
		prevText: "Previous",   // String: Text for the "previous" button
		nextText: "Next",       // String: Text for the "next" button
		maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
		navContainer: ".bottomSliderNav",       // Selector: Where controls should be appended to, default is after the 'ul'
		manualControls: "",     // Selector: Declare custom pager navigation
		namespace: "rslides",   // String: Change the default namespace used
		before: function(){},   // Function: Before callback
		after: function(){}     // Function: After callback
	});
	
	// main content slider
	$('#detailSlider').responsiveSlides({
		auto: true,             // Boolean: Animate automatically, true or false
		speed: 500,             // Integer: Speed of the transition, in milliseconds
		timeout: 10000,         // Integer: Time between slide transitions, in milliseconds
		pager: true,           // Boolean: Show pager, true or false
		nav: false,              // Boolean: Show navigation, true or false
		random: false,          // Boolean: Randomize the order of the slides, true or false
		pause: false,           // Boolean: Pause on hover, true or false
		pauseControls: true,    // Boolean: Pause when hovering controls, true or false
		prevText: "Previous",   // String: Text for the "previous" button
		nextText: "Next",       // String: Text for the "next" button
		maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
		navContainer: ".detailSliderNav",       // Selector: Where controls should be appended to, default is after the 'ul'
		manualControls: "",     // Selector: Declare custom pager navigation
		namespace: "rslides",   // String: Change the default namespace used
		before: function(){},   // Function: Before callback
		after: function(){}     // Function: After callback
	});
	
	// main menu for mobile
	$('.mainMenu ul li').each(function(){
		if( $(this).hasClass('active') ){
			$('.mainMenu .mobDropdown').html($(this).text());
			$('.mainMenu .mobDropdown').attr('id',$(this).attr('id'));
		}
	});
	$('.mainMenu .mobDropdown').click(function(){
		$('.mainMenu ul').slideUp();
		if($(this).hasClass('active')===false){
			$(this).addClass('active');
			$(this).parent().find('ul').slideDown();
			$('.mainMenu .mobDropdown').html($(this).text());
			$('.mainMenu .mobDropdown').attr('id',$(this).attr('id'));
		} else {
			$(this).parent().find('ul').slideUp('slow', function(){ $(this).parent().find('.mobDropdown').removeClass('active'); });
		}
	});
	
	// top menu mobile init
	$(".topmenu ul").tinyNav();
	
	// booking tabs
	$('#bookingTabs').easyResponsiveTabs();
	$('#detailTab').easyResponsiveTabs();
	
	// calendar init
	$('.datePick').datepick();
	
	// custom select 
	$('.customSelectInput').customSelect();
	
	// special offers
	$("#specialOffers").owlCarousel({
		autoPlay: 3000, //Set AutoPlay to 3 seconds
		items : 3,
		stopOnHover: true,
		navigation: true,
		pagination: false,	
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,2]
	});
		
	
	/* ------------------------------------ WINDOW.RESIZE ------------------------------- */
	$(window).resize(function(){
		
		
		
	}); // END___ window.resize
	
	

}); // END___ function

/* ------------------------------------ DOCUMENT.READY ------------------------------- */
$(document).ready(function() {
	"use strict";
	
	// ul last li
	$('ul').each(function(){ $(this).find('li:last').addClass('last'); });
	
	// ul first li
	$('ul').each(function(){ $(this).find('li:first').addClass('first'); });
	
	// booking forms init
	bookingForm("#flightBooking");
	bookingForm("#hotelBooking");
	bookingForm("#carsBooking");
	bookingForm("#cruiseBooking");
	
	// newsletter form
	formInputValue('#newsletter input[type="text"]');
	
	$('#newsletter input[type="submit"]').click(function(){
		var val = $('#newsletter input[type="text"]').val();
		var regEmail = /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;
		if(val.toUpperCase().match(regEmail)){
			$.ajax({
				type: 'POST',
				url: 'sendmail.php',
				data: $("#newsletter").serialize(),
				beforeSend: function(){
					$(".newsletter").hide();
					$(".loader").show();
				},
				success: function(msg){
					if (msg == "OK"){
						$('#newsletter').submit();
						$('#newsletter').hide();
						$(".loader").hide();
						$('#newsletter').after('<div class="newsmsg">Your email address has been saved to our system.</div>');
					}else{
						$(".loader").hide();
						$('#newsletter').show();
						$('#newsletter').after('<div class="newsmsg">Your email address has not saved to our system.</div>');
					}
					return false;
				}
			});
		} else {
			alert("Please enter correct email address!");
			return false;
		}
	});
	
	
	// Load dialog on click
	$('.login').click(function() {
		$('#loginModal').modal();
		return false;
	});
	$('#simplemodal-overlay').click(function(){ $('a.simplemodal-close').trigger('click'); });
	
	formInputValue('#loginForm .loginName');
	formInputValue('#loginForm .loginPass');
	
	// login form validate
	$('#loginForm').validate({
		errorElement: "span",
		required: true,
		submitHandler:function(){
			$('#loginForm').hide();
			$.ajax({
				type: 'POST',
				url: window.location.href,
				data: $('#loginForm').serialize(),
				beforeSend:function(){
					$(".loaderImg").show();
				},
				success: function(msg){
					$(".loaderImg").hide();
					if (msg == "OK"){
						$(".formOK").show();
					}else{
						$(".formNOK").show();
					}
					return false;
				}
			});
			return false;
		}
	});
	
	// contact form
	formInputValue('#contactForm input[type="text"], #contactForm textarea');
	
	/* $.validator.addMethod("customRequired", function(value, element){
		if($(element).attr("alt") == value){
			return "";
		}else{
			return value;
		}
	}, ""); */
	
	// contact form validate
	$('#contactForm').validate({
		errorElement: "span",
		required: true,
		submitHandler:function(){
			$('#contactForm').hide();
			$.ajax({
				type: 'POST',
				url: window.location.href,
				data: $('#contactForm').serialize(),
				beforeSend:function(){
					$(".loaderImg").show();
				},
				success: function(msg){
					$(".loaderImg").hide();
					if (msg == "OK"){
						$(".formOK").show();
					}else{
						$(".formNOK").show();
					}
					return false;
				}
			});
			return false;
		}
	});
	
	// rating init
    $(".ratingDisabled").jRating({
		nbRates: 5,
		length: 5,
		type: 'small',
		showRateInfo: false,
		rateMax : 5,
		isDisabled: true
	});
	$(".ratingBig").jRating({
		nbRates: 5,
		length: 5,
		showRateInfo: false,
		rateMax : 5,
		isDisabled: true
	});
	$(".ratingBasic").jRating({
		nbRates: 5,
		length: 5,
		//type: 'small',
		showRateInfo: false,
		rateMax : 5
	});
	
	
	// contact form validate
	$('#bookingForm').validate({
		errorElement: "span",
		required: true,
		submitHandler:function(){
			$('#bookingForm').hide();
			$.ajax({
				type: 'POST',
				url: window.location.href,
				data: $('#bookingForm').serialize(),
				beforeSend:function(){
					$(".loaderImg").show();
				},
				success: function(msg){
					$(".loaderImg").hide();
					if (msg == "OK"){
						$(".formOK").show();
					}else{
						$(".formNOK").show();
					}
					return false;
				}
			});
			return false;
		}
	});
	
	// filter open-close
	$('.filter').each(function(){
		if( $('h5',this).hasClass('active') ){
			$(this).find('.filterInner').show();
		}
	});
	$('.filter h5').click(function(){
		if( $(this).hasClass('active') ){
			$(this).removeClass('active');
			$(this).next('.filterInner').slideUp();
		} else {
			$(this).addClass('active');
			$(this).next('.filterInner').slideDown();
		}
	});
	
	// custom checkbox
	$('.customCheck').screwDefaultButtons({
        image: 'url("assets/images/checkbox.png")',
        width: 15,
        height: 13
    });
	
	// dropdown
	$('.dropdownFilter em').click(function(){
		$('.dropdownFilter ul').slideUp();
		if($(this).hasClass('active')===false){
			$(this).addClass('active');
			$(this).parent().find('ul').slideDown();
		} else {
			$(this).parent().find('ul').slideUp('slow', function(){ $(this).parent().find('em').removeClass('active'); });
		}
	});
	
	$('.dropdownFilter ul li').click(function(){
		var aText = $(this).text();
		$(this).parent().parent().find('em span').text(aText);
		$(this).parent().slideUp('slow',function(){ $(this).parent().parent().find('em').removeClass('active'); });
	});
	
	// offer list and grid
	$('.listLayout').click(function(){
		$('.offersGrid').hide();
		$('.offersList').fadeIn();
		$(this).addClass('active');
		$('.gridLayout').removeClass('active');
	});
	$('.gridLayout').click(function(){
		$('.offersList').hide();
		$('.offersGrid').fadeIn();
		$(this).addClass('active');
		$('.listLayout').removeClass('active');
	});

	
}); // END___ document.ready


/* ------------------------------------ ALL FUNCTIONS ------------------------------- */

// booking form ajax validate
function bookingForm($selector){
	"use strict";
	$($selector).validate({
		errorElement: "span",
		required: true,
		submitHandler:function(){
			$($selector).hide();
			$.ajax({
				type: 'POST',
				url: window.location.href,
				data: $($selector).serialize(),
				beforeSend:function(){
					$(".sendingContact").show();
				},
				success: function(msg){
					$(".sendingContact").hide();
					if (msg == "OK"){
						$(".formOK").show();
					}else{
						$(".formNOK").show();
					}
					return false;
				}
			});
			return false;
		}
	});
}


// input hide and show value
function formInputValue(element) {
	"use strict";
	$(element).click(function() {
		if (this.value == this.defaultValue) {this.value = '';}
	}).focusin(function() {
		if (this.value == this.defaultValue) {this.value = '';}
	});
	$(element).blur(function() {
		if (this.value === '') {
			this.value = this.defaultValue;
		}
	});
}