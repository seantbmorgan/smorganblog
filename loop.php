<?php if (have_posts()): while (have_posts()) : the_post(); ?>

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
				<span class="post-cats"><?php echo 'Categories: '; the_category( ', ', '', $post->ID );  ?></span>
			</div>
			<span class="comments"><?php if (comments_open( get_the_ID() ) ) comments_popup_link( __( 'No Comments', 'html5blank' ), __( '1 Comment', 'html5blank' ), __( '% Comments', 'html5blank' )); ?></span>
			<a class="post-link" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">Full Post</a>
		</div>

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
