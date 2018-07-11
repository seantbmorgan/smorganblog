(function(){
	$(document).ready(function(){
	 console.log("Welcome to Sean Morgan's Blog: Everything Digital Media, and Everything Striking.");
	 //***********************************************************************************************
	 // Adding CSS Animations to jQuery
	 //***********************************************************************************************
	 $.fn.extend({
	   animateCss: function(animationName, callback) {
	     var animationEnd = (function(el) {
	       var animations = {
	         animation: "animationend",
	         OAnimation: "oAnimationEnd",
	         MozAnimation: "mozAnimationEnd",
	         WebkitAnimation: "webkitAnimationEnd",
	       };

	       for (var t in animations) {
	         if (el.style[t] !== undefined) {
	           return animations[t];
	         }
	       }
	     })(document.createElement("div"));

	     this.addClass("animated " + animationName).one(animationEnd, function() {
	       $(this).removeClass("animated " + animationName);

	       if (typeof callback === "function") callback();
	     });

	     return this;
	   },
	 });
	 //***********************************************************************************************
	 // Blog Object
	 //***********************************************************************************************
	 let app = {
		scroll:{
			current:0,
			direction:null,
			timeout:null
		},
		viewport:{
			width:Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			height:Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
			resetTimeout:null,
			reset:()=>{
				app.viewport.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
				app.viewport.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
				if(!app.singlePost.headerOpen){
					if(app.viewport.resetTimeout!==null){
						clearTimeout(app.viewport.resetTimeout);
					}
					app.viewport.resetTimeout = setTimeout(function(){
						app.singlePost.toggleHeader(true,function(){
							// Reset Constant
							app.singlePost.headerHeightConst = $("#single-post-header").height();
							// Adjust Splash Size
							app.singlePost.setSplashSize();
						});
					},250);
				}else{
					app.singlePost.headerHeightConst = $("#single-post-header").height();
					app.singlePost.setSplashSize();
				}
			}
		},
		checkScroll:() => {
				// End Header Scroll
				if(app.page.content.length) {
					// Currently Main Page
					let scrollLimit = app.viewport.height;
					if(window.pageYOffset>app.scroll.current){
						// Scrolling Down
						if(app.scroll.direction !== "down" && window.pageYOffset>app.viewport.height-app.page.header.height()){
							app.scroll.direction = "down";
							app.page.header.animate({
								top:"-100px"
							},250, function() {
		    				// Animation complete.
		  				});
							app.page.search.animate({
									top:"0px"
							},250, function() {
								// Animation complete.
							});
						}
						// Resent Current Scroll Position
						app.scroll.current = window.pageYOffset;
					}else if(window.pageYOffset<app.scroll.current-25){
						if(app.scroll.timeout!==null){
							clearTimeout(app.scroll.timeout);
						}
						function showHeader(){
							// Scrolling Up
							if(app.scroll.direction !== "up"){
								app.scroll.direction = "up";
								app.page.header.animate({
									top:"0px"
								},250, function() {
			    				// Animation complete.
						  	});
								app.page.search.animate({
									top:"100px"
								},250, function() {
											// Animation complete.
								});
								// Resent Current Scroll Position
								app.scroll.current = window.pageYOffset;
							}
						}
						if(window.pageYOffset>600)
							app.scroll.timeout = setTimeout(function(){showHeader();},250);
						else
							showHeader();
					}
				}
				if(app.singlePost.content.length){
					// Single Post
					if(window.pageYOffset>app.scroll.current){
						// Scrolling Down
						if(app.scroll.direction !== "down" && window.pageYOffset>app.viewport.height-app.page.header.height()-app.singlePost.headerHeightConst){

							//console.log(app.viewport.height-app.page.header.height(),app.singlePost.header.height());
							app.scroll.direction = "down";
							app.page.header.animate({
								top:"-100px"
							},250, function() {
		    				// Animation complete.
		  				});
							app.page.search.animate({
									top:"0px"
							},250, function() {
								// Animation complete.
							});
							app.singlePost.header.animate({
									top:"0px"
							},250, function() {
								// Animation complete.
							});
						}
						// Resent Current Scroll Position
						app.scroll.current = window.pageYOffset;
					}else if(window.pageYOffset<app.scroll.current-10){
						if(app.scroll.timeout!==null){
							clearTimeout(app.scroll.timeout);
						}
						function showHeader2(){
							// Scrolling Up
								if(app.scroll.direction !== "up"){
									app.scroll.direction = "up";
									app.page.header.animate({
									top:"0px"
								},250, function() {
									// Animation complete.
								});
														app.page.search.animate({
															top:"100px"
														},250, function() {
																	// Animation complete.
														});
														app.singlePost.header.animate({
																top:"100px"
														},250, function() {
															// Animation complete.
														});
													}
													// Resent Current Scroll Position
													app.scroll.current = window.pageYOffset;
						}
						if(window.pageYOffset>600)
							app.scroll.timeout = setTimeout(function(){showHeader2();},250);
						else
							showHeader2();
					}
					let scrollLimit = app.viewport.height-app.page.header.height()-app.singlePost.header.height();
					if(window.pageYOffset>scrollLimit&&app.singlePost.headerOpen&&app.singlePost.headerAutoHide){
						app.singlePost.headerAutoHide=false;
							app.singlePost.toggleClick();
					}
				}

		},
		toggleElement:(item) => {
			let htmlEl = null;
			switch(item) {
				case "search":
					htmlEl = app.page.search;
					break;
				case "categories":
					htmlEl = app.page.categories;
					break;
				case "header":
					htmlEl = app.page.header;
					break;
			}
			htmlEl.slideToggle(250, function() {
			// Animation complete.
				switch(item) {
					case "search":
						app.page.searchOpen = !app.page.searchOpen;
						break;
					case "categories":
						app.page.catsOpen = !app.page.catsOpen;
						break;
				}
			});
		},
		skipSplash:() => {
			let offset = 0;
			if(app.page.content.length){
				offset = app.page.content.offset().top - app.page.header.height();
			}
			if(app.singlePost.content.length){
				offset = app.singlePost.splash.height();
				if(app.singlePost.headerOpen){
					app.singlePost.headerAutoHide=false;
					app.singlePost.toggleClick();
				}
			}
			$("html, body").animate({ scrollTop: offset });
		},
		// page
		page:{
			loading:$("#loading"),
			header:$("header"),
			headerHeight:$("header").height(),
			responsiveNav:$("#navResponsive"),
			splash:$("#splash"),
			splashSkip:$("#skip-splash"),
			toggleNav:$("#toggle-nav"),
			categories:$("#categories"),
			categoriesToggle:$("#toggle-cats"),
			categoriesOpen:false,
			search:$("#search-bar"),
			searchOpen:false,
			closeSearch:$("#close-search"),
			openSearch:$("#open-search"),
			content:$("#page-main"),
			footer:$("footer")
		},
		// single post html elements
		singlePost:{
			content:$("#single-post"),
			header: $("#single-post-header"),
			headerHeightConst:0,
			headerToggle: $("#single-post-header .toggle"),
			headerOpen: true,
			headerAutoHide: true,
			toggle: $("#toggle-header"),
			title: $("#single-post-title"),
			splash: $("#single-splash"),
			discussionLink: $("#single-discussion"),
			// Functions
			setSplashSize:() => {
				app.singlePost.splash.css({"opacity":1,"height":app.viewport.height - app.singlePost.header.height() - app.page.header.height(),"top":app.singlePost.header.height(),"margin-bottom":app.singlePost.header.height()});
			},
			toggleHeader:(bool,callback) => {
				if(bool){
					// Open Single Post Header
					app.singlePost.splash.animate({top : app.singlePost.headerHeightConst+"px","margin-bottom" : app.singlePost.headerHeightConst+"px"},250, function(){
						// Animation Complete
					});
				}else{
					// Close Single Post Header
					app.singlePost.splash.animate({top : "0px","margin-bottom" : "0px"},250, function(){
						// Animation Complete
					});
				}
				app.singlePost.headerToggle.slideToggle(250, function(){
					// Toggle Chevron
					if(app.singlePost.headerOpen){
						app.singlePost.toggle.html("<i class='fa fa-chevron-down'></i>");
					}else{
						app.singlePost.toggle.html("<i class='fa fa-chevron-up'></i>");
					}
					app.singlePost.headerOpen = !app.singlePost.headerOpen;
					if(typeof callback === "function"){
							callback();
					}
				});
			},
			// Interactions
			titleClick:function(){
				$("html, body").animate({ scrollTop: 0 });
			},
			discussionClick:function(){
				let offset = $("#comments").offset().top - app.singlePost.header.height() - app.page.header.height();
				$("html, body").animate({ scrollTop: offset });
			},
			toggleClick: () =>{
				if(app.singlePost.headerOpen){
					// Close Header
					app.singlePost.toggleHeader(false,function(){
						// Do Nothing
					});
				}else{
					// Open Header
					app.singlePost.toggleHeader(true,function(){
						// Do Nothing

					});
				}
			}
		},
		contact:{
			request:null,
			form:$("#contactForm"),
			error:$("#formError"),
			prompt:$("#ui-prompt"),
			visitor:{
				name:$("#visitorname"),
				email:$("#visitoremail"),
				comments:$("#visitorcomment"),
			},
			submit:$("#contactSubmit"),
			loading:$("#email-loading"),
			validate:()=>{
				// Name
				if(app.contact.visitor.name.val() === "" || !app.contact.visitor.name.val().length || app.contact.visitor.name.val() === null){
					app.contact.error.text( "Please fill out your name." ).show().fadeOut( 2000 );
					return false;
				}
				// Email
				let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(!emailRegex.test(String(app.contact.visitor.email.val()).toLowerCase())){
					app.contact.error.text( "Please use a valid email address." ).show().fadeOut( 2000 );
					return false;
				}
				// Comments
				if(app.contact.visitor.comments.val() === "" || !app.contact.visitor.comments.val().length || app.contact.visitor.comments.val() === null){
					app.contact.error.text( "Please add some comments." ).show().fadeOut( 2000 );
					return false;
				}
				return true;
			}
		},
		resume:{
			quicklinks:$(".quick-link, .top-link"),
			quicknav:(tgt)=>{
				let offset = $("#"+tgt).offset().top - app.page.header.height();
				$("html, body").animate({ scrollTop: offset });
			}
		}
	};
	//***********************************************************************************************
	// Interactions
	//***********************************************************************************************
	// Window Resizing
	$( window ).resize(function() {
		app.viewport.reset();
	});
	// Window Scrolling
	window.addEventListener("scroll", function(e) {
		app.checkScroll();
	});
	app.checkScroll();
	// Splash
	app.page.splashSkip.click(function(){
		app.skipSplash();
	});
	// Responsive Navigation Toggle
	app.page.toggleNav.click(function(event) {
			app.page.responsiveNav.slideToggle(250, function() {
				// Animation complete.
			});
	});
	// Search Bar
	app.page.openSearch.click(function(event) {
		app.toggleElement("search");
	});
	app.page.closeSearch.click(function(event) {
		app.toggleElement("search");
	});
	app.page.categoriesToggle.click(function(event) {
		app.toggleElement("categories");
	});
	// Post Thumbnail Clicks
	$(document).delegate(".post-header", "click", function() {
   	window.location = $(this).find("a.hidden-link").attr("href");
	});
	// Single Post Title Link
	app.singlePost.title.click(function(event) {
		app.singlePost.titleClick();
	});
	// Single Post Discussions Link
	app.singlePost.discussionLink.click(function(event) {
		app.singlePost.discussionClick();
	});
	// Single Post Header Toggle
	app.singlePost.toggle.click(function(event) {
		app.singlePost.toggleClick();
	});
	$("#contactSubmit").click(function(event) {
		const emailFailure = (msg) => {
			app.contact.error.text( msg ).show().fadeOut( 4000 );
			grecaptcha.reset();
		};

		const emailSuccess = (msg) => {
			app.contact.prompt.text( "Message delivered, thanks for reaching out!" ).show().fadeOut( 4000 );
			app.contact.visitor.name.val("");
			app.contact.visitor.email.val("");
			app.contact.visitor.comments.val("");
			grecaptcha.reset();
		};
  	if (app.contact.validate()){

			app.contact.form.css({"display":"none"});
			app.contact.loading.css({"display":"block"});

			if (app.contact.request){
					app.contact.request.abort();
			}
			let inputs = app.contact.form.find("input, textarea"),
			serializedData = inputs.serialize();
			let request = $.ajax({
				url: emailHandler+"/email/contact.php",
				type: "post",
				data: serializedData,
				error: (jqXHR, textStatus, errorThrown) => {
					// BAD
				},
				success: (data, textStatus, jqXHR) => {
					emailSuccess();
					app.contact.form.css({"display":"flex"});
					app.contact.loading.css({"display":"none"});


					let serverRspnd = JSON.parse(data);
					switch(serverRspnd.success){
						case 1:
							// Success
							grecaptcha.reset();
							break;
						case 2:
							// Name Fail
							emailFailure("Please fill out your name.");
							break;
						case 3:
							// Email Fail
							emailFailure("Please use a vaild email address.");
							break;
						case 4:
							// Comments Fail
							emailFailure("Please add some comments.");
							break;
						case 5:
							// Captcha Fail
							emailFailure("Captcha failed.");
							break;
						case 6:
							// Email Not Sent
							emailFailure("I'm sorry, the server had troubled delivering your message.");
							break;
						case 7:
							// Google Captcha Fail
							emailFailure("Captcha failed.");
							break;
					}
				}
			});
		}
	});
	app.resume.quicklinks.click(function(event){
		let tgt = $(this).data("tgt");
		app.resume.quicknav(tgt);
	});
	//***********************************************************************************************
	// On Load
	//***********************************************************************************************
	if(app.page.content.length){
		// Main Page (Index)
		app.page.footer.css({"display":"flex"});
		$("#blog-link").attr("href","javascript:void(0);");
		$("#blog-link").click(function(event){
			let offset = app.page.content.offset().top-100;
			$("html, body").animate({ scrollTop: offset });
		});
		$("#home-link").attr("href","javascript:void(0);");
		$("#home-link").click(function(event){
			$("html, body").animate({ scrollTop: 0 });
		});
	}
	else if(app.singlePost.content.length){
		// Single Post
		app.singlePost.setSplashSize();
		app.singlePost.splash.animateCss("fadeIn", function() {
  		// Animation Complete
			app.page.footer.css({"display":"flex"});
		});
		app.singlePost.headerHeightConst = $("#single-post-header").height();
	}else{
		// Further Page Work Here
		app.page.footer.css({"display":"flex"});
	}
	app.page.loading.animateCss("fadeOut", function() {
		// Animation Complete
		app.page.loading.css({"display" : "none"});
	});







});
})();
