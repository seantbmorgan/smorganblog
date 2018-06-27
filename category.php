<?php get_header(); ?>

<div id="filtered-header">

	<div id="search-bar">
		<div class="section"><?php get_template_part('searchform'); ?></div>
		<div id="categories" class="section"><?php wp_list_categories() ?></div>
	</div>

	<h1><a>Catergory : <?php single_cat_title(); ?></a></h1>
</div>

	<main role="main" class="filtered">

		<!-- section -->
		<section>

			<!--<h1><?php //_e( 'Categories for ', 'html5blank' ); single_cat_title(); ?></h1> -->

			<?php get_template_part('loop'); ?>

			<?php get_template_part('pagination'); ?>

		</section>
		<!-- /section -->
	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
