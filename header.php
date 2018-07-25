<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' :'; } ?> <?php bloginfo('name'); ?></title>

		<link href="//www.google-analytics.com" rel="dns-prefetch">
    <link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">
    <link href="<?php echo get_template_directory_uri(); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">

		<!-- Fonts -->
		<link href="https://fonts.googleapis.com/css?family=Kaushan+Script|Montserrat|Permanent+Marker" rel="stylesheet">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">


		<!-- Highlight JS -->
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/obsidian.min.css">

		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="<?php bloginfo('description'); ?>">

		<script src='https://www.google.com/recaptcha/api.js'></script>

		<?php wp_head(); ?>
		<script>
        // conditionizr.com
        // configure environment tests
        conditionizr.config({
            assets: '<?php echo get_template_directory_uri(); ?>',
            tests: {}
        });
        </script>

	</head>
	<body <?php body_class('site'); ?>>
		<div id="loading">
			<div class="lds-ripple"><div></div><div></div></div>
		</div>
		<!-- wrapper -->
		<!--<div class="wrapper">-->

			<!-- header -->

			<!--<header class="header clear" role="banner">


					<div class="logo">
						<a href="<?php //echo home_url(); ?>">

							<img src="<?php //echo get_template_directory_uri(); ?>/img/logo.svg" alt="Logo" class="logo-img">
						</a>
					</div>

					<nav class="nav" role="navigation">
						<?php //html5blank_nav(); ?>
					</nav>


			</header>-->

			<header>
				<div class="nickname-spill-control"><div class="nickname">THE DENTIST</div></div>
				<div class="row">
					<div class="logo">
						<a id="home-link" href="<?php echo home_url(); ?>">
							<img src="<?php echo get_template_directory_uri(); ?>/img/logo.png" alt="Sean Tanue-Bongwa Logo" title="Sean Tanue-Bongwa Logo"/>
						</a>
					</div>
					<span class="flex-push"></span>
					<div id="navStandard">
						<a href="javascript:void(0);" class="icon smooth-transition" id="toggle-nav"><i class="fa fa-bars"></i></a>
						<a id="blog-link" class="smooth-transition" href="<?php echo home_url(); ?>">Blog</a>
						<a href="/index.php/portfolio" class="smooth-transition">Portfolio</a>
						<a href="/index.php/resume" class="smooth-transition">Resume</a>
						<a href="/index.php/contact" class="smooth-transition">Contact</a>
						<a href="javascript:void(0);" class="search smooth-transition" id="open-search"><i class="fa fa-search"></i></a>
					</div>
				</div>
				<div id="navResponsive">
					<a href="<?php echo home_url(); ?>" class="smooth-transition">Blog</a>
					<a href="/index.php/portfolio" class="smooth-transition">Portfolio</a>
					<a href="/index.php/resume" class="smooth-transition">Resume</a>
					<a href="/index.php/contact" class="smooth-transition">Contact</a>
				</div>
			</header>


			<!-- /header -->
