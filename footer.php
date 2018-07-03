			<!-- footer -->
			<footer class="footer" role="contentinfo">

				<!-- copyright -->
				<p class="copyright">
					&copy; <?php echo date('Y'); ?> Copyright <?php bloginfo('name'); ?>. <?php _e('Powered by', 'html5blank'); ?>
					<a href="//wordpress.org" title="WordPress">WordPress</a>.
				</p>
				<!-- /copyright -->

			</footer>
			<!-- /footer -->

		<!--</div> -->
		<!-- /wrapper -->

		<?php wp_footer(); ?>

		<!-- analytics -->
		<script>
		(function(f,i,r,e,s,h,l){i['GoogleAnalyticsObject']=s;f[s]=f[s]||function(){
		(f[s].q=f[s].q||[]).push(arguments)},f[s].l=1*new Date();h=i.createElement(r),
		l=i.getElementsByTagName(r)[0];h.async=1;h.src=e;l.parentNode.insertBefore(h,l)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-XXXXXXXX-XX', 'yourdomain.com');
		ga('send', 'pageview');
		</script>

		<!-- Custom JS -->
		<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
		<!-- Highlight JS -->
		<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
		<script>hljs.initHighlightingOnLoad();</script>
		<?php

		if(gethostname()==="Sean-Laptop"){
		echo "<script src='//localhost:35729/livereload.js'></script>";
		}
		echo '<script src="'.get_template_directory_uri().'/js/smorgan.min.js"></script>';

		?>

		<script type="text/javascript">	let emailHandler = "<?php echo get_template_directory_uri(); ?>";</script>
	</body>
</html>
