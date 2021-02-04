var togglePassword = document.getElementById("toggle-password");
var r_togglePassword = document.getElementById("r-toggle-password");
var c_togglePassword = document.getElementById("c-toggle-password");

var formContent = document.getElementsByClassName('form-content')[0];
var getFormContentHeight = formContent.clientHeight;

var formImage = document.getElementsByClassName('form-image')[0];
if (formImage) {
	var setFormImageHeight = formImage.style.height = getFormContentHeight + 'px';
}

if (togglePassword) {
	togglePassword.addEventListener('click', function () {
		var x = document.getElementById("password");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
	});
}
if (r_togglePassword) {
	r_togglePassword.addEventListener('click', function () {
		var y = document.getElementById("r-password");
		if (y.type === "password") {
			y.type = "text";
		} else {
			y.type = "password";
		}
	});
}
if (c_togglePassword) {
	c_togglePassword.addEventListener('click', function () {
		var z = document.getElementById("c-password");
		if (z.type === "password") {
			z.type = "text";
		} else {
			z.type = "password";
		}
	});
}