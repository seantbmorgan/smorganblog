<?php get_header(); ?>

<div id="filtered-header">

	<div id="search-bar">
		<div class="section"><?php get_template_part('searchform'); ?></div>
		<div id="categories" class="section"><?php wp_list_categories() ?></div>
	</div>

	<h1><a>Search : <?php echo get_search_query(); ?></a></h1>
</div>

	<main role="main" class="filtered">
		<!-- section -->
		<section>

			<!--<h1><?php //echo sprintf( __( '%s Search Results for ', 'html5blank' ), $wp_query->found_posts ); echo get_search_query(); ?></h1> -->

			<?php get_template_part('loop'); ?>

			<?php get_template_part('pagination'); ?>

		</section>
		<!-- /section -->
	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
