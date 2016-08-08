require('../src/assets/css/ju.less');
require('../src/assets/lib/jquery-2.0.0.min.js');
require('../src/assets/js/slide.js');
require('../src/assets/js/form_validate.js');
require('../src/assets/js/dropdown.js');
require('../src/assets/js/modal.js');
require('../src/assets/js/smooth_scroll.js');
require('../src/assets/js/superslide.js');
require('../src/assets/js/autocomplete.js');
require('../src/assets/js/popover.js');
window.WebUploader = require('../src/assets/js/uploader.js');
window.Pikaday = require('../src/assets/js/datepicker.js');
var header = require('../src/init/header.html');
var m_nav = require('../src/init/m_nav.html');
var s_nav = require('../src/init/comp_left.html');
var footer = require('../src/init/footer.html');
var url = window.location.pathname;
var pathName = url.slice(url.lastIndexOf('/') + 1, name.length - 5);
if(!!pathName){
	var bodyHtml = require('../src/views/' + pathName + '.html');
}else{
	var bodyHtml = require('../src/views/index.html');
}

document.write(bodyHtml);
$(".head-nav").html(header);
$(".mobile-nav").html(m_nav);
$(".side-nav").html(s_nav);
$("footer").html(footer);
$("a[href='" + pathName + ".html']").addClass("active");

