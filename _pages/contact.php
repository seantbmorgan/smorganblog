<div class="header-push"></div>
<div id="email-loading" class="spinner"></div>
<form id="contactForm" onsubmit="return false;" name="contactForm">

	<h1>Get in touch with me</h1>

	<div class="dynamic-row">
		<div class="form-group flex-push"><input type="text" id="visitorname" name="visitorname" placeholder="Your name..."><label for="visitorname">Full Name</label></div>
		<div class="form-group flex-push"><input type="email" id="visitoremail" name="visitoremail" placeholder="Your email..."><label for="visitoremail">Email Address</label></div>
	</div>
	<div class="row">
		<div class="form-group"><textarea id="visitorcomment" name="visitorcomment" placeholder="Whats on your mind?"></textarea><label for="visitorcomment">Comment</label></div>
	</div>
	<div class="row">
		<div id="formError" class="error"></div>
		<h3 id="ui-prompt" class="accent"></h3>
	</div>
	<div class="g-recaptcha" data-sitekey="6Ld7kV0UAAAAAA1pGSBuL0lqUMYfuQBN9ivUxItC"></div>
	<div class="actions">
		<input id="contactSubmit" type="submit" value="Reach Out">
	</div>
</form>
