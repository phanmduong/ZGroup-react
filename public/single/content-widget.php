<?php
/**
 * The default template for displaying standard post format
 */
	global $gdlr_post_settings; 
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="gdlr-standard-style">
		<div class="blog-date-wrapper gdlr-title-font">
			<span class="blog-date-day"><?php echo get_the_time('j'); ?></span>
			<span class="blog-date-month"><?php echo get_the_time('M'); ?></span>
		</div>
		<header class="post-header">
			<h3 class="gdlr-blog-title"><a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></h3>

			<div class="gdlr-blog-excerpt"><?php echo get_the_excerpt(); ?></div>	
			<div class="clear"></div>
		</header><!-- entry-header -->
		<div class="clear"></div>
	</div>
</article><!-- #post -->