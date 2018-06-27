 $(document).ready(function(){
	 console.log("Welcome to Sean Morgan's Blog: Everything Digital Media, and Everything Striking.");
	 //***********************************************************************************************
	 // Blog Object
	 //***********************************************************************************************
	let app = {
		getHeight:(id)=>{
			if(id==='window'){
				return $(window).height();
			}else{
				return $('#'+id).height();
			}
		},
		// page
		page:{
			/*
			header:{
				id:$("#navResponsive")
			},
			categories:{
				id:$("#categories"),
				isOpen:false
			},
			search:{
				id:$("#search-bar"),
			}
			search = ,
			searchH = search.height(),
			searchOpen = false,
			closeSearch = $("#close-search"),
			openSearch = $("#open-search"),
			content = $("#page-main");
			*/
		},
		// single post html elements
		singlePost:{
			header: $("#single-post-header"),
			headerToggle: $("#single-post-header .toggle"),
			headerOpen: true,
			headerAutoHide: true,
			toggle: $('#toggle-header'),
			title: $("#single-post-title"),
			splash: $("#single-splash"),
			discussionLink: $("#single-discussion"),
			titleClick:function(){
				//let height = blogObj.singlePost.header.height();
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
	// Blog Object
	//***********************************************************************************************
	app.singlePost.title.click(function(event) {
		app.singlePost.titleClick();
	});
	app.singlePost.discussionLink.click(function(event) {
		app.singlePost.discussionClick();
	});
	app.singlePost.toggle.click(function(event) {
		app.singlePost.toggleClick();
	});

	let windowHeight = $(window).height(),
	header = $("#navResponsive"),
	categories = $("#categories"),
	catHeight = categories.height(),
	search = $("#search-bar"),
	searchHeight = search.height(),
	searchOpen = false,
	catsOpen = false,
	closeSearch = $("#close-search"),
	openSearch = $("#open-search"),
	content = $("#page-main");

	$("#toggle-nav").click(function(event) {
			//console.log('weeeee');
			header.slideToggle( "fast", function() {
	    // Animation complete.
	  	});
	});

	const toggleElement = (item) => {
		let htmlEl = null;
		switch(item) {
			case 'search':
				htmlEl = search;
				break;
			case 'categories':
				htmlEl = categories;
				break;
		}
		htmlEl.slideToggle( "fast", function() {
		// Animation complete.
			switch(item) {
				case 'search':
					searchOpen = !searchOpen;
					break;
				case 'categories':
					catsOpen = !catsOpen;
					break;
			}
		});
	}

	// Search Bar
	openSearch.click(function(event) {
		toggleElement('search');
	});
	$("#close-search").click(function(event) {
		toggleElement('search');
	});
	$("#toggle-cats").click(function(event) {
		toggleElement('categories');
	});

	$( window ).resize(function() {
			if ($(window).width() > 767) {
			   	header.css("display","none");
			}
	});


	let headerScroll = 300;
	const checkScroll = () => {
		if(document.getElementById("page-main") !== null) {
			if(window.pageYOffset>=headerScroll){
				// Main Page
				let padding = windowHeight*0.02;
				search.css("position","fixed");
				search.css("top","100px");
				if(searchOpen && catsOpen){
					// Search and Catergories Open
					catHeight = categories.height();
					content.css("top",searchHeight+catHeight+padding);
				}
				else if(searchOpen && !catsOpen){
					// Search Open
					content.css("top",searchHeight+padding);
				}
				else {
					// Do Nothing
				}
			}
			else if(window.pageYOffset<headerScroll){
				search.css("position","relative");
				search.css("top","0");
				content.css("top","0");
			}
		}
		if(document.getElementById("single-post") !== null){
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
	}
	window.addEventListener('scroll', function(e) {
		checkScroll();
	});
	checkScroll();




	$(document).delegate(".post-header", "click", function() {
   	window.location = $(this).find("a.hidden-link").attr("href");
	});
});
