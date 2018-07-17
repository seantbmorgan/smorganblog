<?php get_header(); ?>

	<!--
	<div id="splash">
		<div class="fill-image">
			<img src="<?php echo get_template_directory_uri(); ?>/img/splash.png" alt="Fighter Splash Image" tile="Fighter Splash Image"/>
			<h1>Digital Media Guru</h1>
			<h2>Cerebral Striker</h2>
		</div>
	</div>
-->

	<div id="search-bar">
		<div class="section"><?php get_template_part('searchform'); ?></div>
		<div id="categories" class="section"><?php wp_list_categories() ?></div>
	</div>

	<div id="splash">
		<div id="video-splash">
			<video autoplay loop poster="<?php echo get_template_directory_uri(); ?>/img/poster.png" id="index-video">
				<source "<?php echo get_template_directory_uri(); ?>/img/cover.webm" type="video/webm">
				<source src="<?php echo get_template_directory_uri(); ?>/img/cover.mp4" type="video/mp4">
			</video>
		</div>
		<div id="caption">
			<div class="fill flex-col flex-center">
				<div id="captionText" class="flex-row">
					<h1>Digital Media Guru</h1>
					<h2>Cerebral Kickboxer &amp; Striking Enthusiast</h2>
				</div>
				<a id="skip-splash" href="javascript:void(0);" class="smoothTrans"><i class="fa fa-angle-double-down"></i></a>
			</div>
		</div>
	</div>






		<?php //get_sidebar(); ?>
		<div id="social">
			<a href="https://www.facebook.com/seantbmorgan" target="_blank"><i class="fab fa-facebook-f"></i></a>
			<a href="https://www.linkedin.com/in/seantbmorgan/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
			<!--<a href="https://twitter.com/therealbongwa" target="_blank"><i class="fab fa-twitter"></i></a>-->
		</div>
		<main role="main" id="page-main">
			<!-- section -->
			<section>

				<!--<h1><?php //_e( 'Latest Posts', 'html5blank' ); ?></h1>-->

				<?php get_template_part('loop'); ?>

				<?php get_template_part('pagination'); ?>

			</section>
			<!-- /section -->
		</main>


<?php get_footer(); ?>
