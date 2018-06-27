 $(document).ready(function(){
	 console.log("Welcome to Sean Morgan's Blog: Everything Digital Media, and Everything Striking.");
	 //***********************************************************************************************
	 // Blog Object
	 //***********************************************************************************************
	let app = {
		checkScroll:() => {
			if(app.page.content !== null) {
				// Currently Main Page
				let scrollLimit = app.page.splash.height(),
				padding = $(window).height()*0.02
				if(window.pageYOffset>=scrollLimit){
					app.page.search.css("position","fixed");
					app.page.search.css("top","100px");
					app.page.content.css("top",app.page.search.height()+padding);
				}
				else if(window.pageYOffset<scrollLimit){
					app.page.search.css("position","relative");
					app.page.search.css("top","0");
					app.page.content.css("top","0");
				}
			}
			if(app.singlePost.content !== null){
				// Single Post
				let scrollLimit = 450;
				if(window.pageYOffset===0){
					app.singlePost.headerAutoHide = true;
				}
				if(window.pageYOffset>=scrollLimit&&app.singlePost.headerOpen&&app.singlePost.headerAutoHide){
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
		// page
		page:{
			responsiveNav:$("#navResponsive"),
			toggleNav:$("#toggle-nav"),
			categories:$("#categories"),
			categoriesToggle:$("#toggle-cats"),
			categoriesOpen:false,
			search:$("#search-bar"),
			searchOpen:false,
			closeSearch:$("#close-search"),
			openSearch:$("#open-search"),
			splash:$("#splash"),
			content:$("#page-main")
		},
		// single post html elements
		singlePost:{
			content:$("#single-post"),
			header: $("#single-post-header"),
			headerToggle: $("#single-post-header .toggle"),
			headerOpen: true,
			headerAutoHide: true,
			toggle: $('#toggle-header'),
			title: $("#single-post-title"),
			splash: $("#single-splash"),
			discussionLink: $("#single-discussion"),
			titleClick:function(){
				$("html, body").animate({ scrollTop: 0 });
			},
			discussionClick:function(){
				let offset = $("#comments").offset().top - app.singlePost.header.height() - app.page.header.height();
				$("html, body").animate({ scrollTop: offset });
			},
			toggleClick: () =>{
				//let app = blogObj,
				let toggleChevron = () => {
					if(app.singlePost.headerOpen){
						app.singlePost.toggle.html('<i class="fa fa-chevron-down"></i>');
					}else{
						app.singlePost.toggle.html('<i class="fa fa-chevron-up"></i>');
					}
					app.singlePost.headerOpen = !app.singlePost.headerOpen;
				}
				if(app.singlePost.headerOpen){
					// Close Single Post Header
					app.singlePost.splash.animate({top : "0px","margin-bottom" : "0px"},250, function(){
						// Animation Complete
					});
				}else{
					// Open Single Post Header
					app.singlePost.splash.animate({top : "100px","margin-bottom" : "100px"},250, function(){
						// Animation Complete
					});
				}
				app.singlePost.headerToggle.slideToggle(250, function(){
					// Animation Complete
					toggleChevron();
				});
			}
		}
	};
	//***********************************************************************************************
	// Interactions
	//***********************************************************************************************
	// Window Resizing
	$( window ).resize(function() {
			if ($(window).width() > 767) {
					header.css("display","none");
			}
	});
	// Window Scrolling
	window.addEventListener('scroll', function(e) {
		app.checkScroll();
	});
	app.checkScroll();
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
});
