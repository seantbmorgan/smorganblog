<?php get_header(); ?>

	<div id="splash">
		<div class="fill-image">
			<img src="<?php echo get_template_directory_uri(); ?>/img/splash.png" alt="Fighter Splash Image" tile="Fighter Splash Image"/>
			<h1>Digital Media Guru</h1>
			<h2>Cerebral Striker</h2>
		</div>
	</div>


	<div id="search-bar">
		<div class="section"><?php get_template_part('searchform'); ?></div>
		<div id="categories" class="section"><?php wp_list_categories() ?></div>
	</div>




		<?php //get_sidebar(); ?>

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
