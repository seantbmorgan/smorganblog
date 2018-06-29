 	$(document).ready(function(){
	 console.log("Welcome to Sean Morgan's Blog: Everything Digital Media, and Everything Striking.");
	 //***********************************************************************************************
	 // Adding CSS Animations to jQuery
	 //***********************************************************************************************
	 $.fn.extend({
	   animateCss: function(animationName, callback) {
	     var animationEnd = (function(el) {
	       var animations = {
	         animation: 'animationend',
	         OAnimation: 'oAnimationEnd',
	         MozAnimation: 'mozAnimationEnd',
	         WebkitAnimation: 'webkitAnimationEnd',
	       };

	       for (var t in animations) {
	         if (el.style[t] !== undefined) {
	           return animations[t];
	         }
	       }
	     })(document.createElement('div'));

	     this.addClass('animated ' + animationName).one(animationEnd, function() {
	       $(this).removeClass('animated ' + animationName);

	       if (typeof callback === 'function') callback();
	     });

	     return this;
	   },
	 });
	 //***********************************************************************************************
	 // Blog Object
	 //***********************************************************************************************
	let app = {
		viewport:{
			width:Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			height:Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
			reset:()=>{
				//if ($(window).width() > 767) {
						//app.page.navResponsive.css("display","none");
				//}
				app.viewport.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
				app.viewport.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
				// Single Page Splashes
				// app.singlePost.splash.css({"height":app.viewport.height - app.singlePost.header.height(),"top":app.singlePost.header.height()});
				// Open Header
				//console.log('hellow');
				//console.log(app.singlePost.headerOpen);
				if(!app.singlePost.headerOpen){
					app.singlePost.toggleHeader(true,app.singlePost.setSplashSize);
				}else{
					app.singlePost.setSplashSize();
				}
			}
		},
		checkScroll:() => {
			if(app.page.content.length) {
				// Currently Main Page
				let scrollLimit = app.page.splash.height(),
				padding = $(window).height()*0.02
				if(window.pageYOffset>=scrollLimit && app.page.searchOpen){
					app.page.search.css("position","fixed");
					app.page.search.css("top","100px");
					app.page.content.css("top",app.page.search.height()+padding);
				}
				else if(window.pageYOffset<scrollLimit && app.page.searchOpen){
					app.page.search.css("position","relative");
					app.page.search.css("top","0");
					app.page.content.css("top","0");
				}
			}
			if(app.singlePost.content.length){
				// Single Post
				let scrollLimit = app.singlePost.splash.height();
				if(window.pageYOffset>scrollLimit&&app.singlePost.headerOpen&&app.singlePost.headerAutoHide){
					app.singlePost.headerAutoHide=false;
						app.singlePost.toggleClick();
				}
			}
		},
		toggleElement:(item) => {
			let htmlEl = null;
			switch(item) {
				case 'search':
					htmlEl = app.page.search;
					break;
				case 'categories':
					htmlEl = app.page.categories;
					break;
			}
			htmlEl.slideToggle(250, function() {
			// Animation complete.
				switch(item) {
					case 'search':
						app.page.searchOpen = !app.page.searchOpen;
						break;
					case 'categories':
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
			headerHeightConst: $("#single-post-header").height(),
			headerToggle: $("#single-post-header .toggle"),
			headerOpen: true,
			headerAutoHide: true,
			toggle: $('#toggle-header'),
			title: $("#single-post-title"),
			splash: $("#single-splash"),
			discussionLink: $("#single-discussion"),
			// Functions
			setSplashSize:() => {
				app.singlePost.splash.css({"opacity":1,"height":app.viewport.height - app.singlePost.header.height() - app.page.header.height(),"top":app.singlePost.header.height(),"margin-bottom":app.singlePost.header.height()});
			},
			toggleHeader:(bool,callback) => {
				let toggleChevron = () => {
					if(app.singlePost.headerOpen){
						app.singlePost.toggle.html('<i class="fa fa-chevron-down"></i>');
					}else{
						app.singlePost.toggle.html('<i class="fa fa-chevron-up"></i>');
					}
					app.singlePost.headerOpen = !app.singlePost.headerOpen;
				}
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
					// Animation Complete
					toggleChevron();
					callback();
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
					app.singlePost.toggleHeader(false,function(){console.log('no funciton');});
				}else{
					// Open Header
					app.singlePost.toggleHeader(true,function(){console.log('no funciton');});
				}
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
	window.addEventListener('scroll', function(e) {
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
		app.toggleElement('search');
	});
	app.page.closeSearch.click(function(event) {
		app.toggleElement('search');
	});
	app.page.categoriesToggle.click(function(event) {
		app.toggleElement('categories');
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
	//***********************************************************************************************
	// On Load
	//***********************************************************************************************
	if(app.page.content.length){
		// Main Page (Index)
		app.page.footer.css({"display":"flex"});
	}
	if(app.singlePost.content.length){
		// Single Post
		app.singlePost.setSplashSize();
		app.singlePost.splash.animateCss('fadeIn', function() {
  		// Animation Complete
			app.page.footer.css({"display":"flex"});
		});
	}
	app.page.loading.animateCss('fadeOut', function() {
		// Animation Complete
		app.page.loading.css({"display" : "none"});
	});

});
