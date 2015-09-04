
(function(options) {
	options = options || {};
	options['background'] = options['background'] || 'url(src/img/comp_plate_graybasic.png)';
	options['headerColor'] = options['headerColor'] || '#fd7a0d';

	var $ = require('jquery');
	var products = require('../info_box.json');

	

	function ProductComponent(index) {
		index = index || 0;
		products[index].title = products[index].title || "No product title provided";
		products[index].description = products[index].description || "No product description provided";
		var html;
		
		while(products[index]&&!products[index].img) {
			index++;
		}
		if (!products[index]) {
			html = [
				'<h2 class="noProducts" style="color: '+options.headerColor+'">Sorry, no products with images provided at the moment, please, check up later!</h2>'
			]
		} else {
	
		
			html = [
						'<div id="productWrapper">\
							<img class="productImg" src="src/img/'+products[index].img+'" alt="Image picture"/>\
							<h2 class="productHeader" style="color: '+options.headerColor+'">' + products[index].title + '</h2>\
							<div class="productDescrWrapper">\
								<p class="productDescr">' + products[index].description  + '</p><p class="productNote">' + products[index].note + '</p>\
							</div>\
							<a class="showDetails">show details</a>\
						</div>'
			];
		}
			return html[0];	
	}
	
	function renderCallForActionComponent() {
		var html = [
		'<div class="callToAction">\
			<div class="buttonLeft"><div class="buttonLeftArrow"></div><p class="prev">Prev</p></div>\
			<div class="buttonRight"><div class="buttonRightArrow"></div><p class="next">Next</p></div>\
			<div class="buttonFind"><div class="buttonFindArrow"></div><p class="find">Find A Store</p></div>\
		</div>'
		];

		$('#app').append(html[0]);
	}

	function getIndex() {
		var index;
		for(var i = 0; i<products.length; i++) {
			if(products[i].title===$('.productHeader').text()) {
				index = i;
			}
		}
		return index;
	}

	$(function() {
		$('body').prepend(
		'<div id="app" style="background: '+options.background+'"><div id="infoBoxWrapper"></div></div>'
		);

    	$('#infoBoxWrapper').append(ProductComponent());
    	renderCallForActionComponent();
    	
    	/*Events*/

    	//Next product

		 $('#app').on('click', '.next', function(e) {
		    
		    //var title = $(e.target).parents('#app').find('h2').text();
		    
		    var productIndex = getIndex();
		    
		    if (productIndex===undefined) {
		    	return;
		    } else {
			    productIndex++;
			    if (products[productIndex]){
			    	while(!products[productIndex].img) {
			    		productIndex++;
			    		if (!products[productIndex]) {
			    			productIndex = 0;
			    		}
			    	}	
			    } else {
			    		productIndex = 0;
			    }
			    
			    $( "#productWrapper" ).hide();
			    $('#infoBoxWrapper').prepend(ProductComponent(productIndex)).hide().fadeIn(600);
			    $("#app").find("#productWrapper").next().remove();
		    }
		    
		 });

		 //Prev product

		 $('#app').on('click', '.prev', function(e) {
		    
		    var productIndex = getIndex();
		    
		    if (productIndex===undefined) {
		    	return;
		    } else {
		    	productIndex--;

			    if (products[productIndex]){
			    	while(!products[productIndex].img) {
			    		productIndex--;
			    		if (!products[productIndex]) {
			    			productIndex = products.length-1;
			    		}
			    	}	
			    } else {
			    	productIndex = products.length-1;
			    	while(!products[productIndex].img) {
			    		productIndex--;
			    	}	
			    }
			    
			    $( "#productWrapper" ).hide();
			    $('#infoBoxWrapper').prepend(ProductComponent(productIndex)).hide().fadeIn(600);
			    $("#app").find("#productWrapper").next().remove();
		    }
		    
		 });

		 //Show details

		 $('#app').on('click', '.showDetails', function(e) {
		    e.stopPropagation();
		    var thisProduct = $(e.target).parents('#productWrapper');
		    
		    if (thisProduct.hasClass('open')) {
				
			    thisProduct.find('.productImg').animate({
                            height: '200px',
                            opacity: 1
                        }, 600);
			    thisProduct.find('.productHeader').animate({
	                            paddingTop: '0px',
	                            opacity: 1
	                        }, 300);
			    thisProduct.find('.productDescrWrapper').animate({
	                            height: '34px',
	                            opacity: 1
	                        }, 0);
			    thisProduct.find('.showDetails').text('show details');
			    thisProduct.removeClass('open');

		    } else {
		    	thisProduct.find('.productImg').animate({
                            height: '0px',
                            opacity: 0
                        }, 300);
			    thisProduct.find('.productHeader').animate({
	                            paddingTop: '20px',
	                            opacity: 1
	                        }, 300);
			    thisProduct.find('.productDescrWrapper').animate({
	                            height: '210px',
	                            opacity: 1
	                        }, 300);
			    thisProduct.find('.showDetails').text('hide details');
			    thisProduct.addClass('open');

		    }
		});
	})
}());