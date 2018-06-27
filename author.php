<?php get_header(); ?>

<div id="filtered-header">

	<div id="search-bar">
		<div class="section"><?php get_template_part('searchform'); ?></div>
		<div id="categories" class="section"><?php wp_list_categories() ?></div>
	</div>

	<h1><a>Author : <?php echo get_the_author(); ?></a></h1>
</div>

	<main role="main" class="filtered">
		<!-- section -->
		<section>

		<?php if (have_posts()): the_post(); ?>

			<!--<h1><?php //_e( 'Author Archives for ', 'html5blank' ); echo get_the_author(); ?></h1>-->

		<?php if ( get_the_author_meta('description')) : ?>

		<?php echo get_avatar(get_the_author_meta('user_email')); ?>

			<h2><?php _e( 'About ', 'html5blank' ); echo get_the_author() ; ?></h2>

			<?php echo wpautop( get_the_author_meta('description') ); ?>

		<?php endif; ?>

		<?php rewind_posts(); while (have_posts()) : the_post(); ?>

			<!-- article -->
			<article class="loop" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

				<div class="post-header">
					<!-- post thumbnail and Title -->
					<?php if ( has_post_thumbnail()) : // Check if thumbnail exists ?>
						<?php $thumbUrl = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>
						<div style="background-image:url('<?php echo $thumbUrl; ?>;')" class="post-thumb" ></div>
					<?php endif; ?>

					<?php if ( !has_post_thumbnail()) : // Check if thumbnail exists ?>
						<div class="post-no-thumb"></div>
					<?php endif; ?>
					<!-- /post thumbnail -->
					<?php edit_post_link(); ?>
					<a class="hidden-link" href="<?php the_permalink(); ?>"></a>
				</div>

				<div class="post-body">
					<!-- Post Title -->
					<h2>
						<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
					</h2>
					<!-- /Post Title -->

					<!-- Post Details -->
					<div class="post-details">
						<span class="author"><?php _e( 'Published by', 'html5blank' ); ?> <?php the_author_posts_link(); ?></span>
						<span class="date"><?php the_time('F j, Y'); ?> <?php //the_time('g:i a'); ?></span>
					</div>
					<!-- /Post Details -->

					<div class="post-excerpt">
						<?php
							html5wp_excerpt('html5wp_index'); // Build your custom callback length in functions.php
							//the_content( '', TRUE );
						?>
					</div>
					<div class="post-details">
						<span><?php echo 'Categories: '; the_category( ', ', '', $post->ID );  ?></span>
					</div>
					<span class="comments"><?php if (comments_open( get_the_ID() ) ) comments_popup_link( __( 'No Comments', 'html5blank' ), __( '1 Comment', 'html5blank' ), __( '% Comments', 'html5blank' )); ?></span>
					<a class="post-link" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">Full Post</a>
				</div>

				<!-- post thumbnail -->
				<?php //if ( has_post_thumbnail()) : // Check if Thumbnail exists ?>
					<!--<a href="<?php //the_permalink(); ?>" title="<?php //the_title(); ?>">
						<?//php the_post_thumbnail(array(120,120)); // Declare pixel size you need inside the array ?>
					</a>-->
				<?php //endif; ?>
				<!-- /post thumbnail -->

				<!-- post title -->
				<!--<h2>
					<a href="<?php //the_permalink(); ?>" title="<?php //the_title(); ?>"><?php //the_title(); ?></a>
				</h2>-->
				<!-- /Post title -->

				<!-- post details -->
				<!--<span class="date"><?php //the_time('F j, Y'); ?> <?php //the_time('g:i a'); ?></span>
				<span class="author"><?php //_e( 'Published by', 'html5blank' ); ?> <?php //the_author_posts_link(); ?></span>
				<span class="comments"><?php //comments_popup_link( __( 'Leave your thoughts', 'html5blank' ), __( '1 Comment', 'html5blank' ), __( '% Comments', 'html5blank' )); ?></span>-->
				<!-- /post details -->

				<!--<?php //html5wp_excerpt('html5wp_index'); // Build your custom callback length in functions.php ?>

				<br class="clear">-->

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

			<?php get_template_part('pagination'); ?>

		</section>
		<!-- /section -->
	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
