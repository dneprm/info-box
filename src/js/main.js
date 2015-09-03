
(function(options) {
	options = options || {};
	options['background'] = options['background'] || 'url(src/img/comp_plate_graybasic.png)';
	options['headerColor'] = options['headerColor'] || '#fd7a0d';

	var $ = require('jquery');
	var products = require('../info_box.json');

	function renderProductComponent(index) {
		index = index || 0;
		var html = [
			'<img class="productImg" src="src/img/'+products[index].img+'" alt="Image picture"/>\
			<h2 class="productHeader" style="color: '+options.headerColor+'">' + products[index].title + '</h2>\
			<p class="productDescr">' + makeShortDescr(products[index].description) + '</p>\
			<a class="showDetail">show detail</a>'

		];
		
		
		$('#app').append(html[0]);
	  /*$('#content').html(AppComponent({
	    products: PRODUCTS,
	    cart: cart
	  }));*/
	}
	function renderCallForActionComponent() {
		var html = [
		'<div class="buttonLeft"><div class="buttonLeftArrow"></div><p class="prev">Prev</p></div>\
		<div class="buttonRight"><div class="buttonRightArrow"></div><p class="next">Next</p></div>\
		<div class="buttonFind"><div class="buttonFindArrow"></div><p class="find">Find A Store</p></div>'
		];

		$('#app').append(html[0]);
	}
	function getIndex() {
		var index;
		for(var i = 0; i<products.length; i++) {
			if(products[i].title===$('.header').text()) {
				index = i;
			}
		}
		return index;
	}
	function makeShortDescr(text) {
		return text.substr(0, 124);
	}


	$(function() {
		$('#content').append(
		'<div id="app" style="background: '+options.background+'"></div>'
		);

    	renderProductComponent();
    	renderCallForActionComponent();
	})
}());


