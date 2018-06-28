<?php get_header(); ?>

<div id="single-post-header">

	<div id="search-bar">
		<div class="section"><?php get_template_part('searchform'); ?></div>
		<div id="categories" class="section"><?php wp_list_categories() ?></div>
	</div>

	<div class="toggle">
		<!-- post title -->
		<h1>
			<a id="single-post-title" href="javascript:void(0);" title="<?php the_title(); ?>"><?php the_title(); ?></a>
		</h1>
		<!-- /post title -->
		<?php $post_author_id = get_post_field( 'post_author', $post_id );?>
		<!-- post details -->
		<div class="post-details">
			<span class="date"><?php the_time('F j, Y'); ?> <?php the_time('g:i a'); ?></span>
			<span class="author"><?php _e( 'Published by', 'html5blank' ); ?>
				<a href="<?php echo get_author_posts_url($post_author_id); ?>">
					<?php  echo get_the_author_meta('display_name',$post_author_id); ?>
				</a>
			</span>
			<span id="single-discussion" class="comments"><a href="#comments">Discussion<i class="fas fa-comments"></i></a></span>
		</div>
		<?php edit_post_link('<i class="fa fa-edit"></i>'); // Always handy to have Edit Post Links available ?>
		<!-- /post details -->
	</div>
	<a href="javascript:void(0);" id="toggle-header"><i class="fa fa-chevron-up"></i></a>

</div>




<!-- post thumbnail -->
<?php if ( has_post_thumbnail()) : // Check if Thumbnail exists ?>
	<?php $thumbUrl = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>
	<div id="single-splash" style="background-image:url('<?php echo $thumbUrl; ?>;')" class="post-thumb-full" >
		<div class="fill flex-col flex-center">
			<a id="skip-splash" href="javascript:void(0);"><i class="fa fa-angle-double-down"></i></a>
		</div>
	</div>
	<!--<a href="<?php //the_permalink(); ?>" title="<?php //the_title(); ?>" class="post-thumb-full">
		<?php //the_post_thumbnail(); // Fullsize image for the single post ?>
	</a>-->
<?php endif; ?>
<!-- /post thumbnail -->
	<main id="single-post" role="main" class="single">
	<!-- section -->
	<section>
	<?php if (have_posts()): while (have_posts()) : the_post(); ?>

		<!-- article -->
		<article class="single" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>


			<?php the_content(); // Dynamic Content ?>

			<?php the_tags( __( 'Tags: ', 'html5blank' ), ', ', '<br>'); // Separated by commas with a line break at the end ?>

			<div id="footer-cats"><?php _e( 'Categorised in: ', 'html5blank' ); the_category(', '); // Separated by commas ?></div>

			<!--<p><?php //_e( 'This post was written by ', 'html5blank' ); the_author(); ?></p>-->



			<div id="comments">
				<?php comments_template(); ?>
			</div>

		</article>
		<!-- /article -->

	<?php endwhile; ?>

	<?php else: ?>

		<!-- article -->
		<article>

			<h1><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h1>

		</article>
		<!-- /article -->

	<?php endif; ?>

	</section>
	<!-- /section -->
	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
