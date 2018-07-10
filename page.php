<?php get_header(); ?>

<div id="search-bar">
	<div class="section"><?php get_template_part('searchform'); ?></div>
	<div id="categories" class="section"><?php wp_list_categories() ?></div>
</div>
<!--
<div id="page-header" class="no-sticky">



	<h1><a> <?php //the_title(); ?></a></h1>
	<?php //edit_post_link(); ?>
</div>-->

	<main role="main" class="wp-page">
		<!--<construction></construction>-->
		<!-- section -->
		<section>

			<!--<h1><?php //the_title(); ?></h1>-->

		<?php if (have_posts()): while (have_posts()) : the_post(); ?>

			<!-- article -->
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

				<?php the_content(); ?>

				<?php comments_template( '', true ); // Remove if you don't want comments ?>

				<br class="clear">

				<?php //edit_post_link(); ?>

			</article>
			<!-- /article -->

		<?php endwhile; ?>

		<?php else: ?>

			<!-- article -->
			<article>

				<h2><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h2>

			</article>
			<!-- /article -->

		<?php endif; ?>

		</section>
		<!-- /section -->
	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
