/*
	PIXBUILDER version 5.0
	BY PixFort 2016

*/
//=======================================================================================================================
// This file is licensed to Pixfort.com (http://themeforest.net/user/PixFort) and it's not allowed to copy or reuse it
// Copyright PixFort 2016
//=======================================================================================================================


/* SETTINGS */
var pageContainer = "#page";
var popupContainer = ".fancybox-overlay";
var enablePreview = true; //set to off to disable previews
var editableItems = new Array();

editableItems['.frameCover'] = [];
editableItems['form'] = ['background-color', 'padding-top', 'padding-bottom'];
editableItems['.pi'] = ['color', 'font-size', 'background-color'];
editableItems['.bg.bg1'] = ['background-color'];
editableItems['nav a, a.edit, nav .text_span'] = ['color', 'font-weight', 'text-transform', 'font-size'];
editableItems['h1'] = ['color', 'font-size', 'background-color', 'font-family'];
editableItems['h2'] = ['color', 'font-size', 'background-color', 'font-family'];
editableItems['h3'] = ['color', 'font-size', 'background-color', 'font-family'];
editableItems['h4'] = ['color', 'font-size', 'background-color', 'font-family'];
editableItems['h5'] = ['color', 'font-size', 'background-color', 'font-family'];
editableItems['h6'] = ['color', 'font-size', 'background-color', 'font-family'];
editableItems['.pix_text, .pix_edit'] = ['color', 'font-size', 'background-color', 'font-family'];
editableItems['.pix_button'] = ['color', 'font-size', 'background-color', 'font-family', 'border-color', 'border-radius', 'border-width'];
editableItems['.pix_button_pro'] = ['color', 'font-size', 'background', 'font-family', 'border-color', 'border-radius', 'border-width'];
editableItems['p'] = ['color', 'font-size', 'background-color', 'font-family'];
editableItems['a.btn, button.btn'] = ['border-radius', 'font-size', 'background-color'];
editableItems['img'] = ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-color', 'border-style', 'border-width', 'width', 'height'];
editableItems['hr.dashed'] = ['border-color', 'border-width'];
editableItems['.divider > span'] = ['color', 'font-size'];
editableItems['hr.shadowDown'] = ['margin-top', 'margin-bottom'];
editableItems['.footer a, .pix_footers a'] = ['color', 'font-size'];
editableItems['.bg.bg1, .bg.bg2, .header10, .header11'] = ['background-image', 'background-color'];
//editableItems['.pix_builder_bg, .confirm_page_2'] = ['background-image', 'background-color', 'height', 'padding-top', 'padding-bottom'];
editableItems['.pix_builder_bg'] = ['background-image', 'background-color', 'padding-top', 'padding-bottom', 'box-shadow', 'border-color', 'background-size', 'background-attachment', 'background-repeat'];
editableItems['.confirm_page_2'] = ['background-image', 'background-color', 'padding-top', 'padding-bottom', 'box-shadow', 'background-size', 'background-attachment', 'background-repeat'];
editableItems['.pix_builder_bg2'] = ['background-image', 'background-color', 'padding-top', 'padding-bottom', 'box-shadow', 'border-color', 'border-width'];
//editableItems['#nivoSlider img.edit'] = [];

	var editableItemOptions = new Array();

editableItemOptions['.pix_builder_bg, .confirm_page_2 : background-size'] = ['auto', 'cover'];
editableItemOptions['.pix_builder_bg, .confirm_page_2 : background-attachment'] = ['fixed', 'scroll'];
editableItemOptions['.pix_builder_bg, .confirm_page_2 : background-repeat'] = ['no-repeat', 'repeat', 'repeat-x', 'repeat-y'];

editableItemOptions['nav a : font-weight'] = ['400', '700'];
editableItemOptions['a.btn : border-radius'] = ['0px', '4px', '10px'];
editableItemOptions['img : border-style'] = ['none', 'dotted', 'dashed', 'solid'];
editableItemOptions['img : border-width'] = ['1px', '2px', '3px', '4px'];


var editableContent = ['.editContent', '.pix_edit', '.navbar a', 'a.btn', '.footer a:not(.fa)', '.tableWrapper', '.pix_button span'];

/* FLAT UI PRO INITS */
$(function(){
	// Tabs
	$(".nav-tabs a").on('click', function (e) {
	  e.preventDefault();
	  $(this).tab("show");
	})
})


/* END SETTINGS */
var mainMenuWidth = 230;
var secondMenuWidth = 300;

//local storage check
if(typeof(Storage) !== "undefined") {
    
	localStorage = true;
	
} else {
    
	localStorage = false;
	
}

$( window ).load(function() {

	// Animate left sidebar
	$('#loader').fadeOut(function(){
		$('#menu').animate({'left': '-190px'}, 1000);
	});
		
	//activate previews?
	if( enablePreview == true ) {
		if( (localStorage.getItem("fastpreview") !== null) && (localStorage.getItem("fastpreview") !== "") && (localStorage.getItem("fastpreview") == "1") ) {
			$('#preview').hide();
			$('#pix_preview_form').css('display', 'inline-block');
			$('#pix_preview_form').css('float', 'right');
		}else{
			$('#pix_preview_form').hide();
			$('#preview').show();	
		}
	}
	
	//do we have saved pages?
	if( localStorage.getItem("blocksElement1") !== null ) {
		$('#start').hide()	
	}

	//do we have saved page Export options?
	if( localStorage.getItem("pix_export") !== null ) {
		$('select[name=form_type_export]').val("");
		$('input[name=recaptcha]').val("");
		$('input[name=to_Email]').val("");
		$('input[name=subject]').val("");
		$('input[name=MC_APIKEY]').val("");
		$('input[name=MC_LISTID]').val("");
		$('input[name=CM_APIKEY]').val(""); 
		$('input[name=CM_LISTID]').val(""); 
		$('input[name=GR_APIKEY]').val("");
		$('input[name=GR_CAMPAIGN]').val("");
		$('input[name=AW_AUTHCODE]').val("");
		$('input[name=AW_LISTNAME]').val("");

		temp_export =  JSON.parse(localStorage['pix_export']);
		$('select[name=form_type_export]').val(temp_export[0]);
		$('input[name=recaptcha]').val(temp_export[1]);
		$('input[name=to_Email]').val(temp_export[2]);
		$('input[name=subject]').val(temp_export[3]);
		$('input[name=MC_APIKEY]').val(temp_export[4]);
		$('input[name=MC_LISTID]').val(temp_export[5]);
		$('input[name=CM_APIKEY]').val(temp_export[6]);
		$('input[name=CM_LISTID]').val(temp_export[7]);
		$('input[name=GR_APIKEY]').val(temp_export[8]);
		$('input[name=GR_CAMPAIGN]').val(temp_export[9]);
		$('input[name=AW_AUTHCODE]').val(temp_export[10]);
		$('input[name=AW_LISTNAME]').val(temp_export[11]);

		$('select#exportformprovider').selectpicker('refresh');
		
		zIndex = 0;
		$('select#exportformprovider').prop('selectedIndex', 0);
		$('select#exportformprovider option').each(function(){
			if( $(this).attr('value') == temp_export[0] ) {
				$(this).attr('selected', true);
				zIndex = $(this).index();
			} 
		})
		//the pretty dropdown
		$('.pix_export_drop .btn-group.select .dropdown-menu li').removeClass('selected');
		$('.pix_export_drop .btn-group.select .dropdown-menu li:eq('+zIndex+')').addClass('selected');
		$('.pix_export_drop .btn-group.select:eq(0) .filter-option').text( $('select#exportformprovider option:selected').text() )
	}

	var framesForLater = [];
	var page_num = 0;
	var numForLater = [];
	for(x=0; x<=99; x++) {
		if( localStorage.getItem("blocksElement"+x) !== null && localStorage.getItem("blocksFrame"+x) !== null ) {
			var blocksElement = JSON.parse(localStorage["blocksElement"+x]);
			var blocksFrame = JSON.parse(localStorage["blocksFrame"+x]);
			var pageNames = JSON.parse(localStorage["pageNames"]);
			//does the parent UL exist?
			if( $('ul#page'+x).size() == 0 ) {
				newUL = $('<ul id="page'+x+'"></ul>');
				$('#pageList').append(newUL);
		    	makeSortable( newUL );
			}
			for(var y=0; y<=blocksElement.length; y++) {
				page_num = x;
				if( blocksElement[y] != null ) {
					//build 'em
					toInsert = $("<li>"+blocksElement[y]+"</li>");
					//Pix fix
					theHeight = toInsert.find('.frameCover').height();
					toInsert = $("<li style='height:"+theHeight+"px'>"+blocksElement[y]+"</li>");
					toInsert.find('iframe').attr('id', 'ui-id-'+x+y);
					dupButton = $('<button type="button" class="btn btn-info dupBlock"><i class="fa fa-copy"></i> duplicate</button>');
					if(toInsert.find('.dupBlock').length == 0){
						toInsert.find('.frameCover').append( dupButton );	
					}
					toInsert.find('.frameCover').show();
					//sandbox? if so, create the sanboxed frame
					var attr = toInsert.find('iframe').attr('data-sandbox');

					if (typeof attr !== typeof undefined && attr !== false) {
						theiFrame = toInsert.find('iframe');
						theID = theiFrame.attr('data-sandbox');
						sandboxedFrame = $('<iframe src="'+theiFrame.attr('src')+'" id="'+theID+'" sandbox="allow-same-origin"></iframe>');
						$('#sandboxes').append( sandboxedFrame );
					}
					
					framesForLater[toInsert.find('iframe').attr('id')] = blocksFrame[y];
					numForLater[toInsert.find('iframe').attr('id')] = page_num;
					toInsert.find('iframe').load(function(){
						$(this).contents().find(pageContainer).html( framesForLater[$(this).attr('id')] );
						page_x = pageNames[numForLater[$(this).attr('id')]-1];	
						temp_css = "";
						if( localStorage['css_'+page_x] ){
						 	temp_css =  JSON.parse(localStorage['css_'+page_x]);
						 	ff = $(this).contents().find('#pix_style');
							if(ff.length){
								q = ff[0].innerHTML;	
							 	$(this).contents().find('#pix_style')[0].innerHTML=temp_css;
							}else{
							 	style = document.createElement('style');
							 	style.type = 'text/css';
							 	style.id = 'pix_style';
							 	if (style.styleSheet){
							 	  style.styleSheet.cssText = temp_css;
							 	} else {
							 	  style.appendChild(document.createTextNode(temp_css));
							 	}
							 	head = $(this).contents().find('head')[0];
							 	head.appendChild(style);
							}
						}						
						//sandbox
						var attr = $(this).attr('data-sandbox');
						if (typeof attr !== typeof undefined && attr !== false) {
							$('iframe#'+$(this).attr('data-sandbox')).contents().find(pageContainer).html( framesForLater[$(this).attr('id')] );
							theLoaderFunction = $(this).data('data-loaderfunction');
							theiFrame = $(this);
							var codeToExecute = "theiFrame[0].contentWindow."+theiFrame.attr('data-loaderfunction')+"()";
							var tmpFunc = new Function(codeToExecute);
							tmpFunc();							
						}
					});
					$('ul#page'+x).append( toInsert );
					//page links
				}
			}
			
			if( x >= 1 && pageNames[x] != undefined) {
				newLI = $('<li><a class="plink" href="#'+pageNames[x]+'">'+pageNames[x]+'</a><span class="pageButtons"><a class="fileEdit" href=""><i class="pi pixicon-cog"></i></a><a href="" class="pix_dupliacte" title="Duplicate Page"><i class="pi pixicon-stack"></i></a><a class="fileDel" href=""><i class="pi pixicon-trash"></i></a><a href="#" class="btn btn-xs btn-primary btn-embossed fileSave"><span class="fui-check"></span></a></span></li>');
				$('ul#pages').append( newLI );
			}
			//localStorage.removeItem("blocksElement"+x);
			//localStorage.removeItem("blocksFrame"+x);
		}
	}
	allEmpty();
});


var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
//Function to convert hex format to a rgb color
function rgb2hex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  	return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var pendingChanges = false;

function setPendingChanges(v) {
	if( v == true ) {
		$('#savePage .bLabel').text("Save changes (!)");
		pendingChanges = true;
	} else {
		$('#savePage .bLabel').text("Nothing new to save");
		pendingChanges = false;
	}
}

function pageEmpty() {
	if( $('#pageList ul:visible > li').size() == 0 ) {
		$('#start').show();
		$('#frameWrapper').addClass('empty');
	} else {
		$('#start').hide();
		$('#frameWrapper').removeClass('empty');
	}
}

function allEmpty() {
	var allEmpty = false;
	if( $('#pageList li').size() == 0 ) {
		allEmpty = true;
	} else {
		allEmpty = false;
	}
	
	if( allEmpty ) {
		$('a.actionButtons').each(function(){
			$(this).addClass('disabled');
		});
		$('header .modes input').each(function(){
			$(this).prop('disabled', true).parent().addClass('disabled');
		})
	} else {
		$('header .modes input').each(function(){
			$(this).prop('disabled', false).parent().removeClass('disabled');
		});
		$('a.actionButtons').each(function(){
			$(this).removeClass('disabled');
		})
	}
}


function makeDraggable(theID) {
	$('#second #elements li').each(function(){

		$(this).draggable({
			helper: function() {
				return $('<div style="height: 150px; width: 300px; background: #F9FAFA; box-shadow: 5px 5px 1px rgba(0,0,0,0.1); text-align: center; line-height: 150px; font-size: 28px; color: #16A085"><span class="fui-list"></span></div>');
			},
			revert: 'invalid',
			appendTo: 'body',
			connectToSortable: theID,
			stop: function(){
				pageEmpty();
				allEmpty();
			},
			start: function(){
				//switch to block mode // PixFort
				$('input:radio[name=mode]').parent().addClass('disabled');
				$('input:radio[name=mode]#modeBlock').radio('check');
				//show all iframe covers and activate designMode
				$('#pageList ul .zoomer-wrapper .zoomer-cover').each(function(){
					$(this).show();
				})
				//deactivate designmode
				$('#pageList ul li iframe').each(function(){
					this.contentDocument.designMode = "off";
				})
			}
		});	
	})
	
	$('#elements li a').each(function(){
		$(this).unbind('click').bind('click', function(e){
			e.preventDefault();
		})
	})
}

var frameContents = '';//holds frame contents

function makeSortable(el) {

	el.sortable({
		revert: true,
		placeholder: {
	        element: function(currentItem) {
	            return $('<div class="drop-hover"><i class="pi pixicon-circle-plus"></i> Drop Section Here</div>')[0];
	        },
	        update: function(container, p) {
	            return;
	        }
	    },
		handle: ".frameCover",
		beforeStop: function(event, ui){
			if( ui.item.find('.frameCover').size() == 0 ) {
											
				if( ui.item.find('iframe').size() > 0 ) {//iframe thumbnails
			   				
					theHeight = ui.item.height();
												
					var attr = ui.item.find('iframe').attr('data-sandbox');
				
					if (typeof attr !== typeof undefined && attr !== false) {
						
						//sandboxed
						
						theID = getRandomArbitrary(10000, 1000000000);
						
						sandboxedFrame = $('<iframe src="'+ui.item.find('iframe').attr('src')+'" id="'+theID+'" sandbox="allow-same-origin"></iframe>');
						
						$('#sandboxes').append( sandboxedFrame );
						
						if (typeof ui.item.find('iframe').attr('data-loaderfunction') !== typeof undefined && ui.item.find('iframe').attr('data-loaderfunction') !== false) {
							loaderFunction_ = 'data-loaderfunction="'+ui.item.find('iframe').attr('data-loaderfunction')+'"';
						}
											
						ui.item.html('<iframe src="'+ui.item.find('iframe').attr('src')+'" scrolling="no" frameborder="0" data-sandbox="'+theID+'" '+loaderFunction_+'><iframe>');
					
					} else {
				
						ui.item.html('<iframe src="'+ui.item.find('iframe').attr('src')+'" scrolling="no" frameborder="0"><iframe>');
				
					}
					
					ui.item.find('iframe').uniqueId();
					ui.item.find('iframe').height(theHeight+"px");
				
				
				} else {//image thumbnails
				
					theHeight = ui.item.find('img').attr('data-height');

					//is this iframe to be sandboxed?
					
					var attr = ui.item.find('img').attr('data-sandbox');
					
					if (typeof attr !== typeof undefined && attr !== false) {
						
						//sandboxed
						
						theID = getRandomArbitrary(10000, 1000000000);
						
						sandboxedFrame = $('<iframe src="'+ui.item.find('img').attr('data-srcc')+'" id="'+theID+'" sandbox="allow-same-origin"></iframe>');
						
						$('#sandboxes').append( sandboxedFrame );
						
						if (typeof ui.item.find('img').attr('data-loaderfunction') !== typeof undefined && ui.item.find('img').attr('data-loaderfunction') !== false) {
							loaderFunction_ = 'data-loaderfunction="'+ui.item.find('img').attr('data-loaderfunction')+'"';
						}
						
						ui.item.html('<iframe src="'+ui.item.find('img').attr('data-srcc')+'" scrolling="no" frameborder="0" data-sandbox="'+theID+'" '+loaderFunction_+'><iframe>');

						
					} else {
						ui.item.html('<iframe src="'+ui.item.find('img').attr('data-srcc')+'" scrolling="no" frameborder="0"><iframe>');
					}

					ui.item.find('iframe').uniqueId();
					ui.item.find('iframe').height(theHeight+"px");
					ui.item.find('iframe').css('background', '#ffffff url(images/pixbuilder-gif.gif) 50% 50% no-repeat');
										
					ui.item.find('iframe').load(function(){					
						heightAdjustment( ui.item.find('iframe').attr('id'), true );
						// custom css - add new
						temp_css = "";
						if( localStorage['css_'+$('#pageTitle span span').text()] ){
							temp_css =  JSON.parse(localStorage['css_'+$('#pageTitle span span').text()]);
							ff = ui.item.find('iframe').contents().find('#pix_style');
							if(ff.length){
								q = ff[0].innerHTML;	
								ui.item.find('iframe').contents().find('#pix_style')[0].innerHTML=temp_css;
							}else{
								style = document.createElement('style');
								style.type = 'text/css';
								style.id = 'pix_style';
								if (style.styleSheet){
								  style.styleSheet.cssText = temp_css;
								} else {
								  style.appendChild(document.createTextNode(temp_css));
								}
								head = ui.item.find('iframe').contents().find('head')[0];
								head.appendChild(style);
							}
						}
						
					})
									
				}
				
				//add a delete button
				delButton = $('<button type="button" class="btn btn-danger deleteBlock"><i class="pi pixicon-trash"></i> remove</button>');
				resetButton = $('<button type="button" class="btn btn-warning resetBlock"><i class="fa fa-refresh"></i> reset</button>');
				htmlButton = $('<button type="button" class="btn btn-inverse htmlBlock"><i class="fa fa-code"></i> source</button>');
				dupButton = $('<button type="button" class="btn btn-info dupBlock"><i class="pi pixicon-stack"></i> duplicate</button>');
				
				frameCover = $('<div class="frameCover"></div>');
				
				frameCover.append( delButton );
				frameCover.append( resetButton );
				frameCover.append( htmlButton );
				frameCover.append( dupButton );
				
				ui.item.append( frameCover );
							
			} else {
				
				//sorted
				ui.item.find('iframe').load(function(){
					
					$(this).contents().find( pageContainer ).html( frameContents );

					temp_css = "";
					if( localStorage['css_'+$('#pageTitle span span').text()] ){
						temp_css =  JSON.parse(localStorage['css_'+$('#pageTitle span span').text()]);
						ff = $(this).contents().find('#pix_style');
						if(ff.length){
							q = ff[0].innerHTML;	
							//alert(q);
							$(this).contents().find('#pix_style')[0].innerHTML=temp_css;
						}else{
							style = document.createElement('style');
							style.type = 'text/css';
							 style.id = 'pix_style';
							if (style.styleSheet){
							  style.styleSheet.cssText = temp_css;
							} else {
							  style.appendChild(document.createTextNode(temp_css));
							}
							head = $(this).contents().find('head')[0];
							head.appendChild(style);
							//alert("No Custom Style!");
						}
					}
					
				})
				
			}
			
			setPendingChanges(true)
			   			
		},
		stop: function(){
			
			$('#pageList ul:visible li').each(function(){
			
				$(this).find('.zoomer-cover > a').remove();
				
			});
						
		},
		start: function(event, ui){
			
			if( ui.item.find('.frameCover').size() != 0 ) {
			
				frameContents = ui.item.find('iframe').contents().find( pageContainer ).html();
						
			}
			
		},
		over: function(){
			
			$('#start').hide();
			
		}
	});

}


function buildeStyleElements(el, theSelector) {

	for( x=0; x<editableItems[theSelector].length; x++ ) {
			
		//create style elements
		newStyleEl = $('#styleElTemplate').clone();
				
		newStyleEl.attr('id', '');
		newStyleEl.find('.control-label').text( editableItems[theSelector][x]+":" );
				
		if( theSelector+" : "+editableItems[theSelector][x] in editableItemOptions) {//we've got a dropdown instead of open text input
					
			newStyleEl.find('input').remove();
					
			newDropDown = $('<select></select>');
			newDropDown.attr('name', editableItems[theSelector][x]);
					
			for( z=0; z<editableItemOptions[ theSelector+" : "+editableItems[theSelector][x] ].length; z++ ) {
					
				newOption = $('<option value="'+editableItemOptions[theSelector+" : "+editableItems[theSelector][x]][z]+'">'+editableItemOptions[theSelector+" : "+editableItems[theSelector][x]][z]+'</option>');
						
						
				if( editableItemOptions[theSelector+" : "+editableItems[theSelector][x]][z] == $(el).css( editableItems[theSelector][x] ) ) {
						
					//current value, marked as selected
					newOption.attr('selected', 'true')
						
				}
						
					
				newDropDown.append( newOption )
						
			}
					
			newStyleEl.append( newDropDown );
					
			newDropDown.selectpicker({style: 'btn-sm ', menuStyle: 'dropdown-inverse'});
					
				
		} else {
				
			newStyleEl.find('input').val( $(el).css( editableItems[theSelector][x] ) ).attr('name', editableItems[theSelector][x])
				
			if( editableItems[theSelector][x].indexOf("color") > -1 ) {
														
				if( $(el).css( editableItems[theSelector][x] ) != 'transparent' && $(el).css( editableItems[theSelector][x] ) != 'none' && $(el).css( editableItems[theSelector][x] ) != '' ) {
					
					newStyleEl.val( $(el).css( editableItems[theSelector][x] ) )
						
				}
					
				newStyleEl.find('input').spectrum({
					preferredFormat: "hex",
					showPalette: true,
					allowEmpty: true,
					showInput: true,
					palette: [
						["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
						["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
						["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
						["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
						["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
						["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
						["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
						["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
					]
				});
					
			}
					
		}

		newStyleEl.css('display', 'block');
		$('#styleElements').append( newStyleEl );
		$('#styleEditor form#stylingForm').height('auto')
	}

}

function getParentFrameID(el) {
	theID = '';
	$('#pageList li:visible iframe').each(function(){
		theBody = $(this).contents().find('body');
		if( $.contains( document.getElementById( $(this).attr('id') ).contentWindow.document, el ) ) {
			theID = $(this).attr('id');
		} 
	})
	if( theID != '' ) {	
		return theID;
	}
}


function heightAdjustment(el, par) {

	par = typeof par !== 'undefined' ? par : false;

	if( par == false ) {
	
		$('#pageList li:visible iframe').each(function(){
	
			theBody = $(this).contents().find('body');
	
			if( $.contains( document.getElementById( $(this).attr('id') ).contentWindow.document, el ) ) {
			
				frameID = $(this).attr('id');
		
			} 
	
		})
	
		theFrame = document.getElementById(frameID);
	
	} else {
			
		theFrame = document.getElementById(el)
	
	}
	
	realHeight = theFrame.contentWindow.document.body.offsetHeight;
						
	$(theFrame).height( realHeight+"px" );
	
	$(theFrame).parent().height( (realHeight)+"px" );
	$(theFrame).next().height( (realHeight)+"px" );
}

function hasSandbox(el) {
	var attr = $('#'+getParentFrameID( el.get(0) )).attr('data-sandbox');
	if (typeof attr !== typeof undefined && attr !== false) {
		return attr;
	} else {
		return false;
	}
}


var _oldIcon = new Array();

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function styleClick(el) {

	theSelector = $(el).attr('data-selector');
	
	$('#editingElement').text( theSelector );

	//activate first tab
	$('#detailTabs a:first').click();
		
	//hide all by default
	$('a#link_Link').parent().hide();
	$('a#img_Link').parent().hide();
	$('a#icon_Link').parent().hide();
	$('a#video_Link').parent().hide();
	$('a#input_Link').parent().hide();
	$('a#checkbox_Link').parent().hide();
	$('a#form_Link').parent().hide();
	$('a#paypal_Link').parent().hide();
	//$('a#animation_Link').parent().hide();
	$('a#animation_Link').parent().show();

	$('select#animations option').each(function(){
		
		if( $(this).val() == get ) {
		
			$(this).attr('selected', true);
			
			$('#animations').trigger('chosen:updated');
		
		}
	
	});
	
	
	//is the element an ancor tag?
	if( $(el).prop('tagName') == 'A' || $(el).parent().prop('tagName') == 'A' ) {
		
		$('a#link_Link').parent().show();
				
		if( $(el).prop('tagName') == 'A' ) {
				
			theHref = $(el).attr('href');
		
		} else if( $(el).parent().prop('tagName') == 'A' ) {
			
			theHref = $(el).parent().attr('href');
			
		}
		
		zIndex = 0;
		
		pageLink = false;
		
		//the actual select
		
		$('select#internalLinksDropdown').prop('selectedIndex', 0);
		
		// Fix pages after import
		
		$("select#internalLinksDropdown option").each(function() {
			//if( $(this).val() != '#'){
				$(this).remove();
			//}
		});
		$('#internalLinksDropdown').selectpicker('refresh');

		newItem = $('<option value="#">Choose a page</option>');
		$('#internalLinksDropdown').append( newItem );

		$('ul#pages li:not(#newPageLI)').each(function(){
				newItem = $('<option value="'+$(this).find('a').text()+'.html">'+$(this).find('a').text()+'</option>');
				$('#internalLinksDropdown').append( newItem );
			
			});
			

		$('select#internalLinksDropdown option').each(function(){
			
				
			if( $(this).attr('value') == theHref ) {
			
				$(this).attr('selected', true);
				
				zIndex = $(this).index();
			
				pageLink = true;
			
			} 
		
		})
		
		if (typeof String.prototype.startsWith != 'function') {
		  // see below for better implementation!
		  String.prototype.startsWith = function (str){
		    return this.indexOf(str) === 0;
		  };
		}
		//the pretty dropdown
		$('.link_Tab .btn-group.select .dropdown-menu li').removeClass('selected');
		
		$('.link_Tab .btn-group.select .dropdown-menu li:eq('+zIndex+')').addClass('selected');
				
		$('.link_Tab .btn-group.select:eq(0) .filter-option').text( $('select#internalLinksDropdown option:selected').text() )
		
		$('.link_Tab .btn-group.select:eq(1) .filter-option').text( $('select#pageLinksDropdown option:selected').text() )
		
		if( pageLink == true ) {
		
			$('input#internalLinksCustom').val('');
		
		} else {
		
			if( $(el).prop('tagName') == 'A' ) {
		
				//if( $(el).attr('href')[0] != "#" ) {
				if( !$(el).attr('href').startsWith("#section") ) {
					$('input#internalLinksCustom').val( $(el).attr('href') )
				} else {
					$('input#internalLinksCustom').val( '' )
				}
			
			} else if( $(el).parent().prop('tagName') == 'A' ) {
				
				//if( $(el).parent().attr('href')[0] != "#" ) {
				if( !$(el).parent().attr('href').startsWith("#section") ) {
					$('input#internalLinksCustom').val( $(el).parent().attr('href') )
				} else {
					$('input#internalLinksCustom').val( '' )
				}
				
			}
		}
		
		
		//list available blocks on this page, remove old ones first
		
		$('select#pageLinksDropdown option:not(:first)').remove();
		
		
		$('#pageList ul:visible iframe').each(function(){
			
			if( $(this).contents().find( pageContainer + " > *:first" ).attr('id') != undefined ) {
				
				if( $(el).attr('href') == '#'+$(this).contents().find( pageContainer + " > *:first" ).attr('id') ) {
					
					newOption = '<option selected value=#'+$(this).contents().find( pageContainer + " > *:first" ).attr('id')+'>#'+$(this).contents().find( pageContainer + " > *:first" ).attr('id')+'</option>';
					
				} else {
					
					newOption = '<option value=#'+$(this).contents().find( pageContainer + " > *:first" ).attr('id')+'>#'+$(this).contents().find( pageContainer + " > *:first" ).attr('id')+'</option>';
					
				}
				
				
				
				$('select#pageLinksDropdown').append( newOption );
				
			}
			
		})
		
	
	} 
	
	if( $(el).attr('data-type') == 'video' ) {
	
		$('a#video_Link').parent().show();
		
		$('a#video_Link').click();
				
		//inject current video ID,check if we're dealing with Youtube or Vimeo
		
		if( $(el).prev().attr('src').indexOf("vimeo.com") > -1 ) {//vimeo
			
			match = $(el).prev().attr('src').match(/player\.vimeo\.com\/video\/([0-9]*)/);
			
			//console.log(match);
			
			$('#video_Tab input#vimeoID').val( match[match.length-1] );
			$('#video_Tab input#youtubeID').val('');
			
		} else {//youtube
			
			//temp = $(el).prev().attr('src').split('/');
			
			var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
			var match = $(el).prev().attr('src').match(regExp);
				
			$('#video_Tab input#youtubeID').val( match[1] );
			$('#video_Tab input#vimeoID').val('');
			
		}
	} 
	
	//if( ($(el).prop('tagName') == 'IMG') || ($(el).prop('tagName') == 'DIV')  ){
	if( ($(el).prop('tagName') == 'IMG')){
		
		$('a#img_Link').parent().show();
				
		//set the current SRC
		$('.imageFileTab').find('input#imageURL').val( $(el).attr('src') );
	
		
		
		//reset the file upload
		$('.imageFileTab').find('a.fileinput-exists').click();
		
			
	} 

	if( ($(el).prop('tagName') == 'INPUT' && $(el).attr('type') != "radio") || ($(el).prop('tagName') == 'TEXTAREA') || ($(el).prop('tagName') == 'SELECT') ){
		$('a#input_Link').parent().show();
		//set the current SRC
		$('.pixformbuilder').find('input#inputname').val( $(el).attr('name') );
		$('.pixformbuilder').find('input#inputplace').val( $(el).attr('placeholder') );
		
		zIndex = 0;
		$('select#is_required').prop('selectedIndex', 0);
		$('select#is_required option').each(function(){
			if( $(this).attr('value') == $(el).attr('required') ) {
				$(this).attr('selected', true);
				zIndex = $(this).index();
			} 
		})
		//the pretty dropdown
		$('.pixformbuilder .btn-group.select .dropdown-menu li').removeClass('selected');
		$('.pixformbuilder .btn-group.select .dropdown-menu li:eq('+zIndex+')').addClass('selected');
		$('.pixformbuilder .btn-group.select:eq(0) .filter-option').text( $('select#is_required option:selected').text() );
		
	}

	if( $(el).attr('type') == "radio" ){
		$('a#checkbox_Link').parent().show();
	}

	if( ($(el).prop('tagName') == 'FORM') && !($(el).hasClass( "pix_paypal" )) ){
		$('a#form_Link').parent().show();
		$('#pix_edit_note').show();
		
		//set the current SRC
		$('.pixformbuilder2').find('input#popupid').val( $(el).attr('pix-confirm') );
		$('.pixformbuilder2').find('input#redirecturl').val( $(el).attr('pix-redirect') );
		$('.pixformbuilder2').find('select#formprovider').val( $(el).attr('pix-form-type') );

		zIndex = 0;
		$('select#formprovider').prop('selectedIndex', 0);
		$('select#formprovider option').each(function(){
			if( $(this).attr('value') == $(el).attr('pix-form-type') ) {
				$(this).attr('selected', true);
				zIndex = $(this).index();
			} 
		})
		//the pretty dropdown
		$('.pixformbuilder2 .btn-group.select .dropdown-menu li').removeClass('selected');
		$('.pixformbuilder2 .btn-group.select .dropdown-menu li:eq('+zIndex+')').addClass('selected');
		$('.pixformbuilder2 .btn-group.select:eq(0) .filter-option').text( $('select#formprovider option:selected').text() );
	}

	if( ($(el).prop('tagName') == 'FORM') && ($(el).hasClass( "pix_paypal" )) ){
		$('a#paypal_Link').parent().show();
		$('#paypal_complex').removeClass('pix_note_box');
		$('#paypal_price_note').hide();
		$('.pixpaypalbuilder').find('input#paypal_email').val('');
		$('.pixpaypalbuilder').find('input#paypal_item_name').val('');
		$('.pixpaypalbuilder').find('input#paypal_item_price').val('');
		$('.pixpaypalbuilder').find('input#paypal_successful_url').val('');
		$('.pixpaypalbuilder').find('input#paypal_cancel_url').val('');
		$('.pixpaypalbuilder').find('input#paypal_notify_url').val('');
		
		if($(el).find('select[name$="os0"]').length){
			$('#paypal_complex').addClass('pix_note_box');
			$('#paypal_price_note').show();
		}

		if($(el).find('input[name$="business"]').length){
			$('.pixpaypalbuilder').find('input#paypal_email').val( $(el).find('input[name$="business"]')[0].value );
		}
		if($(el).find('input[name$="item_name"]').length){
			$('.pixpaypalbuilder').find('input#paypal_item_name').val( $(el).find('input[name$="item_name"]')[0].value );
		}
		if($(el).find('input[name$="amount"]').length){
			$('.pixpaypalbuilder').find('input#paypal_item_price').val( $(el).find('input[name$="amount"]')[0].value );
		}
		if($(el).find('input[name$="return"]').length){
			$('.pixpaypalbuilder').find('input#paypal_successful_url').val( $(el).find('input[name$="return"]')[0].value );
		}
		if($(el).find('input[name$="cancel_return"]').length){
			$('.pixpaypalbuilder').find('input#paypal_cancel_url').val( $(el).find('input[name$="cancel_return"]')[0].value );
		}
		if($(el).find('input[name$="notify_url"]').length){
			$('.pixpaypalbuilder').find('input#paypal_notify_url').val( $(el).find('input[name$="notify_url"]')[0].value );
		}

	}

	if( (hasClass(el, 'pix_builder_bg'))  ){
		
		 $('a#img_Link').parent().show();
			
	} 

	anim_type = $(el).attr("data-anim-type");
	if(!anim_type){
		anim_type = "";
	}
	anim_delay = $(el).attr("data-anim-delay");
	if(!anim_delay){
		anim_delay = "";
	}
	$('select#animations option').each(function(){		
		if( $(this).val() == anim_type ) {
			$(this).attr('selected', true);
			$('#animations').trigger('chosen:updated');
		}
	});
	$('input#data-anim-delay').val( anim_delay );
	var timeIndex = 0;

	var timeget = $.grep(el.className.split(" "), function(v, i){
		if(v.indexOf('slow-mo')== 0){
			return v.indexOf('slow-mo') === 0;	
		}
		if(v.indexOf('super-slow-mo')== 0){
			return v.indexOf('super-slow-mo') === 0;	
		}
		if(v.indexOf('ultra-slow-mo')== 0){
			return v.indexOf('ultra-slow-mo') === 0;	
		}
		if(v.indexOf('hyper-slow-mo')== 0){
			return v.indexOf('hyper-slow-mo') === 0;	
		}
		
	}).join();

	//$('select#animationdur').prop('selectedIndex', 0);

	$('select#animationdur option').each(function(){
		if( $(this).attr('value') == timeget ) {
			$(this).attr('selected', true);
			timeIndex = $(this).index();
		} 
	});
	//the pretty dropdown
	$('.pixanimations .btn-group.select .dropdown-menu li').removeClass('selected');
	$('.pixanimations .btn-group.select .dropdown-menu li:eq('+timeIndex+')').addClass('selected');
	$('.pixanimations .btn-group.select:eq(0) .filter-option').text( $('select#animationdur option:selected').text() );
	
	if( $(el).hasClass('pi') ) {
	
		$('a#icon_Link').parent().show();
			
		//get icon class name, starting with fa-
		var get = $.grep(el.className.split(" "), function(v, i){
		
			return v.indexOf('pixicon-') === 0;
			
		}).join();
		
		$('select#icons option').each(function(){
		
			if( $(this).val() == get ) {
			
				$(this).attr('selected', true);
				
				$('#icons').trigger('chosen:updated');
			
			}
		
		})
	
	} 
	
	//remove borders from other elements
	$('#pageList ul:visible li iframe').each(function(){
		
		//remove borders		
		
		for( var key in editableItems ) {
		
			//$(this).contents().find( pageContainer + ' '+ key ).css({'outline': 'none', 'cursor': 'default'});
			$(this).contents().find( 'body' + ' '+ key ).css({'outline': 'none', 'cursor': 'default'});
			
			$(this).contents().find( pageContainer + ' '+ key ).hover( function(e){
			
				e.stopPropagation();
			
				if( $(this).closest('body').width() != $(this).width() ) {
											
					$(this).css({'outline': '2px dotted #f67828', 'cursor': 'pointer'});
						
				} else {
							
					$(this).css({'outline': '2px dotted #f67828', 'outline-offset': '-3px', 'cursor': 'pointer'});
							
				}
			
			}, function(){
									
				if( $(this).closest('body').width() != ($(this).width()+6) ) {
						
					$(this).css({'outline': '', 'cursor': ''});
						
				} else {
						
					$(this).css({'border': '', 'cursor': '', 'outline-offset': ''});
						
				}
				
			} )
		
		}
		
	});
	
	//unbind event
	$(el).unbind('mouseenter mouseleave');
	
	if( $(el).closest('body').width() != $(el).width() ) {
											
		$(el).css({'outline': '2px dotted #f67828', 'cursor': 'pointer'});
						
	} else {
							
		$(el).css({'outline': '2px dotted #f67828', 'outline-offset':'-3px',  'cursor': 'pointer'});
							
	}
	
	
	
	//remove all style attributes
	
	$('#styleElements > *:not(#styleElTemplate)').each(function(){
	
		$(this).remove();
	
	})
	
	
	//load the attributes
	
	buildeStyleElements(el, theSelector)
	
	
	//show style editor if hidden
	
	if( $('#styleEditor').css('left') == '-300px' ) {
	
		$('#styleEditor').animate({'left': '0px'}, 400);
	
	}
	
	$('button#add_field').unbind('click').bind('click', function(){
		newElem = $('\n<input type="text" name="field_example" id="name" placeholder="Field Placeholder" class="pix_text">');
		if($(el).find('.send_btn').length!=0){
			$(el).find('.send_btn').before(newElem);	
		}else{
			if($(el).find('#result')){
				$(el).find('#result').after(newElem);	
			}else{
				$(el).prepend( newElem );	
			}	
		}
		randomEl = $(el).closest('body').find('*:first');
		heightAdjustment(randomEl[0]);
 	});


 	$('button#add_select').unbind('click').bind('click', function(){
		newElem = $('\n<select id="NewSelect" name="example" class="pix_text"><option value="">Select an Option</option><option value="A">Example 1</option><option value="B">Example 2</option></select>');
		if($(el).find('.send_btn').length!=0){
			$(el).find('.send_btn').before(newElem);	
		}else{
			if($(el).find('#result')){
				$(el).find('#result').after(newElem);	
			}else{
				$(el).prepend( newElem );	
			}	
		}
		randomEl = $(el).closest('body').find('*:first');
		heightAdjustment(randomEl[0]);
 	});

 	$('button#add_textarea').unbind('click').bind('click', function(){
		newElem = $('\n<textarea rows="5" name="message_example" class="text_area pix_text" placeholder="Write your Message Here"></textarea>');
		if($(el).find('.send_btn').length!=0){
			$(el).find('.send_btn').before(newElem);	
		}else{
			if($(el).find('#result')){
				$(el).find('#result').after(newElem);	
			}else{
				$(el).prepend( newElem );	
			}	
		}
		randomEl = $(el).closest('body').find('*:first');
		heightAdjustment(randomEl[0]);
 	});

 	$('button#add_radio').unbind('click').bind('click', function(){
		newElem = $('\n<input type="radio" name="radio_input" value="option1" checked><span class="label_span editContent"> Option 1</span><br><input type="radio" name="radio_input" value="option2"><span class="label_span editContent"> Option 2</span><br><input type="radio" name="radio_input" value="other"><span class="label_span editContent"> Other</span><br>');
		if($(el).find('.send_btn').length!=0){
			$(el).find('.send_btn').before(newElem);	
		}else{
			if($(el).find('#result')){
				$(el).find('#result').after(newElem);	
			}else{
				$(el).prepend( newElem );	
			}	
		}
		randomEl = $(el).closest('body').find('*:first');
		heightAdjustment(randomEl[0]);
 	});

 	$('button#add_checkboxs').unbind('click').bind('click', function(){
		newElem = $('\n<input type="checkbox" name="vehicle1" value="Bike"><span class="label_span editContent"> I have a bike</span><br><input type="checkbox" name="vehicle2" value="Car"><span class="label_span editContent"> I have a car </span><br>');
		if($(el).find('.send_btn').length!=0){
			$(el).find('.send_btn').before(newElem);	
		}else{
			if($(el).find('#result')){
				$(el).find('#result').after(newElem);	
			}else{
				$(el).prepend( newElem );	
			}	
		}
		randomEl = $(el).closest('body').find('*:first');
		heightAdjustment(randomEl[0]);
 	});
 	
 	$('button#add_date').unbind('click').bind('click', function(){
		newElem = $('\n<input type="date" name="bday"><br><br>');
		if($(el).find('.send_btn').length!=0){
			$(el).find('.send_btn').before(newElem);	
		}else{
			if($(el).find('#result')){
				$(el).find('#result').after(newElem);	
			}else{
				$(el).prepend( newElem );	
			}	
		}
		randomEl = $(el).closest('body').find('*:first');
		heightAdjustment(randomEl[0]);
 	});
 	
 	$('button#add_terms').unbind('click').bind('click', function(){
		newElem = $('\n<input type="checkbox" name="terms" value="accept" required="" title="You should accept the terms of use."><span class="label_span editContent"> Accept Terms of Use. </span><br>');
		if($(el).find('.send_btn').length!=0){
			$(el).find('.send_btn').before(newElem);	
		}else{
			if($(el).find('#result')){
				$(el).find('#result').after(newElem);	
			}else{
				$(el).prepend( newElem );	
			}	
		}
		randomEl = $(el).closest('body').find('*:first');
		heightAdjustment(randomEl[0]);
 	});
	

	//save button
	$('button#saveStyling').unbind('click').bind('click', function(){
		$('#styleEditor #tab1 .form-group:not(#styleElTemplate) input, #styleEditor #tab1 .form-group:not(#styleElTemplate) select').each(function(){
			$(el).css( $(this).attr('name'),  $(this).val());
			/* SANDBOX */
			sandboxID = hasSandbox($(el))
			if( sandboxID ) {
				elementID = $(el).attr('id');
				$('#'+sandboxID).contents().find('#'+elementID).css( $(this).attr('name'),  $(this).val() )
			}
			/* END SANDBOX */
		})
		
		
		//links
		if( $(el).prop('tagName') == 'A' ) {
			
			//change the href prop?


			if( $('select#internalLinksDropdown').val() != '#' ) {
									
				$(el).attr('href', $('select#internalLinksDropdown').val());
				
			} else if( $('select#pageLinksDropdown').val() != '#' ) {
									
				$(el).attr('href', $('select#pageLinksDropdown').val() );
					
			} else if( $('input#internalLinksCustom').val() != '' ) {
								
				$(el).attr('href', $('input#internalLinksCustom').val());
				
			}
			
			/* SANDBOX */
			
			sandboxID = hasSandbox( $(el) )
			
			if( sandboxID ) {
				
				elementID = $(el).attr('id');
								
				if( $('select#internalLinksDropdown').val() != '#' ) {
									
					$('#'+sandboxID).contents().find('#'+elementID).attr('href', $('select#internalLinksDropdown').val());
				
				} else if( $('select#pageLinksDropdown').val() != '#' ) {
									
					$('#'+sandboxID).contents().find('#'+elementID).attr('href', $('select#pageLinksDropdown').val() );
					
				} else if( $('input#internalLinksCustom').val() != '' ) {
								
					$('#'+sandboxID).contents().find('#'+elementID).attr('href', $('input#internalLinksCustom').val());
				
				}
				
			}
			
			/* END SANDBOX */
			
		}

		if( $(el).prop('tagName') == 'FORM' && ($(el).hasClass( "pix_paypal" )) ) {
			// update paypal information
			if( $('input#paypal_email').val() != '' ) {
				if($(el).find('input[name$="business"]').length){
					$(el).find('input[name$="business"]')[0].value = $('input#paypal_email').val();
				}else{
					new_input = $('<input type="hidden" name="business" value="' + $('input#paypal_email').val() +'">');

					$(el).append( new_input );
				}
			}
			if( $('input#paypal_item_name').val() != '' ) {
				if($(el).find('input[name$="item_name"]').length){
					$(el).find('input[name$="item_name"]')[0].value = $('input#paypal_item_name').val();
				}else{
					new_input = $('<input type="hidden" name="item_name" value="' + $('input#paypal_item_name').val() +'">');
					$(el).append( new_input );
				}
			}
			if( $('input#paypal_item_price').val() != '' ) {
				if($(el).find('input[name$="amount"]').length){
					$(el).find('input[name$="amount"]')[0].value = $('input#paypal_item_price').val();
				}else{
					new_input = $('<input type="hidden" name="amount" value="' + $('input#paypal_item_price').val() +'">');
					$(el).append( new_input );
				}
			}
			if( $('input#paypal_successful_url').val() != '' ) {
				if($(el).find('input[name$="return"]').length){
					$(el).find('input[name$="return"]')[0].value = $('input#paypal_successful_url').val();
				}else{
					new_input = $('<input type="hidden" name="return" value="' + $('input#paypal_successful_url').val() +'">');
					$(el).append( new_input );
				}
			}
			if( $('input#paypal_cancel_url').val() != '' ) {
				if($(el).find('input[name$="cancel_return"]').length){
					$(el).find('input[name$="cancel_return"]')[0].value = $('input#paypal_cancel_url').val();
				}else{
					new_input = $('<input type="hidden" name="cancel_return" value="' + $('input#paypal_cancel_url').val() +'">');
					$(el).append( new_input );
				}
			}
			if( $('input#paypal_notify_url').val() != '' ) {
				if($(el).find('input[name$="notify_url"]').length){
					$(el).find('input[name$="notify_url"]')[0].value = $('input#paypal_notify_url').val();
				}else{
					new_input = $('<input type="hidden" name="notify_url" value="' + $('input#paypal_notify_url').val() +'">');
					$(el).append( new_input );
				}
			}
			

		
		
		
		}

		if( $(el).parent().prop('tagName') == 'FORM' && !($(el).parent().hasClass( "pix_paypal" )) ) {
			if( $('input#inputname').val() != '' ) {
				$(el).attr('name', $('input#inputname').val());
			}
			if( $('input#inputplace').val() != '' ) {
				$(el).attr('placeholder', $('input#inputplace').val());
			}
			
			if( $('select#is_required').val() == 'required' ) {
				$(el).prop('required', true);
			}else{
				$(el).prop('required', false);
			}
		}

		if( $(el).prop('tagName') == 'FORM' && !($(el).hasClass( "pix_paypal" )) ) {
			$(el).attr('pix-confirm', $('input#popupid').val());
			$(el).attr('pix-redirect', $('input#redirecturl').val());

			// if( $('input#popupid').val() != '' ) {
			// 	$(el).attr('pix-confirm', $('input#popupid').val());
			// }
			// if( $('input#redirecturl').val() != '' ) {
			// 	$(el).attr('pix-redirect', $('input#redirecturl').val());
			// }
			//alert($('select#formprovider').val());
			if( $('select#formprovider').val() != '' ) {
				$(el).attr('pix-form-type', $('select#formprovider').val());
			}
			
		}

		if( $(el).parent().prop('tagName') == 'A' ) {
			
			//change the href prop?
				
			if( $('select#internalLinksDropdown').val() != '#' ) {
									
				$(el).parent().attr('href', $('select#internalLinksDropdown').val());
				
			} else if( $('select#pageLinksDropdown').val() != '#' ) {
									
				$(el).parent().attr('href', $('select#pageLinksDropdown').val() );
					
			} else if( $('input#internalLinksCustom').val() != '' ) {
								
				$(el).parent().attr('href', $('input#internalLinksCustom').val());
				
			}
			
			/* SANDBOX */
			
			sandboxID = hasSandbox( $(el) )
			
			if( sandboxID ) {
				
				elementID = $(el).attr('id');
								
				if( $('select#internalLinksDropdown').val() != '#' ) {
									
					$('#'+sandboxID).contents().find('#'+elementID).parent().attr('href', $('select#internalLinksDropdown').val());
				
				} else if( $('select#pageLinksDropdown').val() != '#' ) {
									
					$('#'+sandboxID).contents().find('#'+elementID).parent().attr('href', $('select#pageLinksDropdown').val() );
					
				} else if( $('input#internalLinksCustom').val() != '' ) {
								
					$('#'+sandboxID).contents().find('#'+elementID).parent().attr('href', $('input#internalLinksCustom').val());
				
				}
				
			}
			
			/* END SANDBOX */
			
		}
		
		
		//do we need to upload an image?
		if( $('a#img_Link').css('display') == 'block' && $('input#imageFileField').val() != '' ) {
				
			var form = $('form#imageUploadForm');
			
			var formdata = false;
			
			if (window.FormData){
				formdata = new FormData(form[0]);
			}
			
			var formAction = form.attr('action');
			
			$.ajax({
				url : formAction,
				data : formdata ? formdata : form.serialize(),
				cache : false,
				contentType : false,
				processData : false,
				dataType: "json",
				type : 'POST',
			}).done(function(response){
							
				if( response.code == 1 ) {//success
					$('input#imageURL').val( response.response );
				//	$(el).css( 'background-image', response.response )	;
					
					
					
					if( (hasClass(el, 'pix_builder_bg'))  ){
					//	$(el).css( 'padding-top', '200px' )	;
						var stringurl = "url('"+response.response+"')";
						$(el).css('background-image', stringurl );
						//$(el).style.backgroundSize = "cover";
					//	$(el).style.backgroundImage = stringurl;
					}else{
						$(el).attr('src', response.response);	
					}
					//reset the file upload
					$('.imageFileTab').find('a.fileinput-exists').click();

					
					/* SANDBOX */
			
					sandboxID = hasSandbox( $(el) )
			
					if( sandboxID ) {
				
						elementID = $(el).attr('id');
								
						$('#'+sandboxID).contents().find('#'+elementID).attr('src', response.response);
				
					}
			
					/* END SANDBOX */
					$('input[name=background-image]').val( "url("+ response.response +")");
				
				} else if( response.code == 0 ) {//error
				
					alert('Something went wrong: '+response.response)
				
				}
			
			})		
			
					
		} else if( $('a#img_Link').css('display') == 'block' ) {
		
			
			//no image to upload, just a SRC change
			if( $('input#imageURL').val() != '' && $('input#imageURL').val() != $(el).attr('src') ) {
			
				$(el).attr('src', $('input#imageURL').val());
				
				/* SANDBOX */
		
				sandboxID = hasSandbox( $(el) )
		
				if( sandboxID ) {
			
					elementID = $(el).attr('id');
							
					$('#'+sandboxID).contents().find('#'+elementID).attr('src', $('input#imageURL').val());
			
				}
		
				/* END SANDBOX */
			
			}
			
		
		}
		
		// Animations
		$(el).removeClass( "animate-in" );
		$(el).removeAttr('data-anim-type');
		$(el).removeAttr('data-anim-delay');
		$(el).removeClass( "slow-mo" );
		$(el).removeClass( "super-slow-mo" );
		$(el).removeClass( "ultra-slow-mo" );
		$(el).removeClass( "hyper-slow-mo" );
		if($('select#animations').val()!=""){
			$(el).addClass( "animate-in" );
			$(el).attr('data-anim-type', $('select#animations').val() );
			$(el).attr('data-anim-delay', $('input#data-anim-delay').val() );
			$(el).addClass( $('select#animationdur').val() );
		}


		//icons
		if( $(el).hasClass('pi') ) {
		
			//out with the old, in with the new :)
			//get icon class name, starting with pixicon-
			var get = $.grep(el.className.split(" "), function(v, i){
			
				return v.indexOf('pixicon-') === 0;
				
			}).join();
			
			//if the icons is being changed, save the old one so we can reset it if needed
			
			if( get != $('select#icons').val() ) {
			
				$(el).uniqueId();
			
				_oldIcon[$(el).attr('id')] = get;
				
			}
			
			$(el).removeClass( get ).addClass( $('select#icons').val() );
			
			
			/* SANDBOX */
	
			sandboxID = hasSandbox( $(el) )
	
			if( sandboxID ) {
		
				elementID = $(el).attr('id');
						
				$('#'+sandboxID).contents().find('#'+elementID).removeClass( get ).addClass( $('select#icons').val() );
		
			}
	
			/* END SANDBOX */
		
		}
		
		
		//video URL
		
		if( $(el).attr('data-type') == 'video' ) {
		
			if( $('input#youtubeID').val() != '' ) {
			
				$(el).prev().attr('src', "//www.youtube.com/embed/"+$('#video_Tab input#youtubeID').val());
			
			} else if( $('input#vimeoID').val() != '' ) {
				
				$(el).prev().attr('src', "//player.vimeo.com/video/"+$('#video_Tab input#vimeoID').val()+"?title=0&amp;byline=0&amp;portrait=0");
				
			}
			
			
			/* SANDBOX */
	
			sandboxID = hasSandbox( $(el) )
	
			if( sandboxID ) {
		
				elementID = $(el).attr('id');
						
				if( $('input#youtubeID').val() != '' ) {
			
					$('#'+sandboxID).contents().find('#'+elementID).prev().attr('src', "//www.youtube.com/embed/"+$('#video_Tab input#youtubeID').val());
			
				} else if( $('input#vimeoID').val() != '' ) {
				
					$('#'+sandboxID).contents().find('#'+elementID).prev().attr('src', "//player.vimeo.com/video/"+$('#video_Tab input#vimeoID').val()+"?title=0&amp;byline=0&amp;portrait=0");
				
				}
		
			}
	
			/* END SANDBOX */
			
		}
		
		
		$('#detailsAppliedMessage').fadeIn(600, function(){
		
			setTimeout(function(){ $('#detailsAppliedMessage').fadeOut(1000) }, 3000)
		
		})
		
		heightAdjustment(el);
		
		setPendingChanges(true);
	
	});
	
	
	//delete button
	$('button#removeElementButton').unbind('click').bind('click', function(){
	
		if( $(el).prop('tagName') == 'A' ) {//ancor
		
			if( $(el).parent().prop('tagName') == 'LI' ) {//clone the LI
								
				toDel = $(el).parent();
							
			} else {
			
				toDel = $(el);
			
			}
			
		} else if( $(el).prop('tagName') == 'IMG' ) {//image
		
			if( $(el).parent().prop('tagName') == 'A' ) {//clone the A
				
				toDel = $(el).parent();
			
			} else {
			
				toDel = $(el);
			
			}
		
		} else {//everything else
			
			toDel = $(el);
		
		}
		
		$('#styleEditor').on('click', 'button#removeElementButton', function(){
		
			$('#deleteElement').modal('show');
			
			$('#deleteElement button#deleteElementConfirm').unbind('click').bind('click', function(){
			
				toDel.fadeOut(500, function(){
				
					randomEl = $(this).closest('body').find('*:first');
				
					toDel.remove();
					
					heightAdjustment(randomEl[0])
				
				})
				
				$('#deleteElement').modal('hide');
				
				closeStyleEditor();
			
			})
		
		})
	
	})
	
	
	//clone button
	$('button#cloneElementButton').unbind('click').bind('click', function(){
		
		if( $(el).parent().hasClass('propClone') ) {//clone the parent element
					
			theClone = $(el).parent().clone();
			theClone.find( $(el).prop('tagName') ).attr('style', '');
			
			theOne = theClone.find( $(el).prop('tagName') );
			cloned = $(el).parent();
		
			cloneParent = $(el).parent().parent();
		
		} else {//clone the element itself
		
			theClone = $(el).clone();
			theClone.attr('style', '');
			
			theOne = theClone;
			cloned = $(el);
			
			cloneParent = $(el).parent();
		
		}
				
		cloned.after( theClone );		
		
				
		for( var key in editableItems ) {
								
			$(el).closest('body').find( pageContainer + ' '+ key ).each( function(){
													
				if( $(this)[0] === $(theOne)[0] ) {
													
					theOne.hover( function(){
											
						if( $(this).closest('body').width() != $(this).width() ) {
											
							$(this).css({'outline': '2px dotted #f67828', 'cursor': 'pointer'});
						
						} else {
							
							$(this).css({'outline': '2px dotted #f67828', 'outline-offset': '-3px', 'cursor': 'pointer'});
							
						}
					
					}, function(){
											
						if( $(this).closest('body').width() != ($(this).width()+6) ) {
						
							$(this).css({'outline': '', 'cursor': ''});
						
						} else {
						
							$(this).css({'outline': '', 'cursor': '', 'outline-offset': ''});
						
						}
						
					} ).click( function(e){
					
						e.preventDefault();
						
						e.stopPropagation();
					
						styleClick(this, key)
						
					
					} ).each( function(){
					
						$(this).attr('data-selector', key)
					
					} );
				
				}		
			});
		
		}
		
		//possible height adjustments
						
		heightAdjustment(el);
	
	})
	
	
	//reset button
	$('button#resetStyleButton').unbind('click').bind('click', function(){
	
		if( $(el).closest('body').width() != $(el).width() ) {
			
			$(el).attr('style', '').css({'outline': '2px dotted #f67828', 'cursor': 'pointer'})
		
		} else {
			
			$(el).attr('style', '').css({'outline': '2px dotted #f67828', 'outline-offset':'-3px', 'cursor': 'pointer'})
			
		}
		
		$('#styleEditor form#stylingForm').height( $('#styleEditor form#stylingForm').height()+"px" );
		
		$('#styleEditor form#stylingForm .form-group:not(#styleElTemplate)').fadeOut(500, function(){
		
			$(this).remove()
		
		})
		
		//reset icon
		
		if( _oldIcon[$(el).attr('id')] != null ) {
		
			var get = $.grep(el.className.split(" "), function(v, i){
			
				return v.indexOf('pixicon-') === 0;
				
			}).join();
			
			$(el).removeClass( get ).addClass( _oldIcon[$(el).attr('id')] );
			
			$('select#icons option').each(function(){
			
				if( $(this).val() == _oldIcon[$(el).attr('id')] ) {
				
					$(this).attr('selected', true);
					
					$('#icons').trigger('chosen:updated');
									
				}
			
			})
		
		}
		
		setTimeout( function(){buildeStyleElements(el, theSelector)}, 550)
		
	})
	
	
	

}


function closeStyleEditor() {
	
	//only if visible
		
	if( $('#styleEditor').css('left') == '0px' ) {

		$('#styleEditor').animate({'left': '-300px'}, 250);
	
		$('#pageList ul li iframe').each(function(){
		
			//remove hover events used by Styling modus			
		
			for( var key in editableItems ) {
				//$(this).contents().find( popupContainer + ' '+ key ).unbind('mouseenter mouseleave click').css({'outline': '', 'cursor': ''});
				$(this).contents().find( 'body' + ' '+ key ).unbind('mouseenter mouseleave click').css({'outline': '', 'cursor': ''});
		
			}
			
		
			if ( $('input:radio[name=mode]:checked').val() == 'styling' ) {
			
				$('#pageList ul li iframe').each(function(){
			
					for( var key in editableItems ) {
				
						$(this).contents().find( 'body' + ' '+ key ).hover( function(e){
											
							e.stopPropagation();
											
							if( $(this).closest('body').width() != $(this).width() ) {
							
								$(this).css({'outline': '2px dotted #f67828', 'cursor': 'pointer'});
							
							} else {
							
								$(this).css({'outline': '2px dotted #f67828', 'outline-offset': '-3px', 'cursor': 'pointer'});
							
							}
					
						}, function(){
											
							if( $(this).closest('body').width() != ($(this).width()+6) ) {
						
								$(this).css({'outline': '', 'cursor': ''});
						
							} else {
						
								$(this).css({'outline': '', 'cursor': '', 'outline-offset': ''});
						
							}
						
						} ).click( function(e){
					
							e.preventDefault();
							
							e.stopPropagation();
						
							styleClick(this, key)
						
						} );
				
					}				
			
				})
		
			}
				
		})
	
	}

}


$(function(){

	//video ID toggle
	
	$('input#youtubeID').focus(function(){
		$('input#vimeoID').val('');
	})
	
	$('input#vimeoID').focus(function(){
		$('input#youtubeID').val('');
	})
	

	//chosen pixicon dropdown
	
	$('select#icons').chosen({
		'search_contains': true
	});
	$('select#animations').chosen({
		'search_contains': true
	});

	//detect mode
	if( window.location.protocol == 'file:' ) {
	
		_mode = "local";
	
	} else {
	
		_mode = "server";
	
	}
		
	//check if formData is supported
	if (!window.FormData){
		
		//not supported, hide file upload
		$('form#imageUploadForm').hide();
		
		$('.imageFileTab .or').hide();
	
	}
	

	//internal links dropdown
	
	$('select#internalLinksDropdown').selectpicker({style: 'btn-sm ', menuStyle: 'dropdown-inverse'});
	$('select#internalLinksDropdown').change(function(){
		
		$('select#pageLinksDropdown option').attr('selected', false);
		
		$('.link_Tab .btn-group.select:eq(1) .dropdown-menu li').removeClass('selected');
		
		$('.link_Tab .btn-group.select:eq(1) > button .filter-option').text( $('.link_Tab .btn-group.select:eq(1) .dropdown-menu li:first').text() )
		
	})

	$('select#formprovider').selectpicker({style: 'btn-sm ', menuStyle: 'dropdown-inverse'});
	$('select#exportformprovider').selectpicker({style: 'btn-sm btn-embossed', menuStyle: 'dropdown-inverse'});
	$('select#is_required').selectpicker({style: 'btn-sm ', menuStyle: 'dropdown-inverse'});

	$('select#animationdur').selectpicker({style: 'btn-sm ', menuStyle: 'dropdown-inverse'});
	
	

	
	$('select#pageLinksDropdown').selectpicker({style: 'btn-sm ', menuStyle: 'dropdown-inverse'});
	
	$('select#pageLinksDropdown').change(function(){
		
		$('select#internalLinksDropdown option').attr('selected', false);
		
		$('.link_Tab .btn-group.select:eq(0) .dropdown-menu li').removeClass('selected');
		
		$('.link_Tab .btn-group.select:eq(0) > button .filter-option').text( $('.link_Tab .btn-group.select:eq(0) .dropdown-menu li:first').text() )
		
	})


	$('input#internalLinksCustom').focus(function(){
	
		$('select#internalLinksDropdown option').attr('selected', false);
		$('select#pageLinksDropdown option').attr('selected', false);
		
		$('.link_Tab .dropdown-menu li').removeClass('selected');
		
		//$('.link_Tab .btn-group.select > button .filter-option').text( $('.link_Tab .dropdown-menu li:first').text() )
		$('.link_Tab .btn-group.select > button#internalLinksDropdown .filter-option').text( 'Choose a page' );
		$('.link_Tab .btn-group.select > button#pageLinksDropdown .filter-option').text( 'Choose a block (one page sites)' );
		
		this.select();
	
	})
	
	
	$('#detailsAppliedMessageHide').click(function(){
	
		$(this).parent().fadeOut(500)
	
	})


	//hide style editor option?
	
	if( typeof editableItems === 'undefined' ) {
	
		$('#modeStyle').parent().remove();
	
	}
	
	$('#closeStyling').click(function(){
		
		closeStyleEditor();
	
	})


	$('#styleEditor form').on("focus", "input", function(){
	
		$(this).css('position', 'absolute');
		$(this).css('right', '0px')
		
		$(this).animate({'width': '100%'}, 500);
		
		$(this).focus(function(){
		    this.select();
		});
	
	}).on("blur", "input", function(){
		
		$(this).animate({'width': '42%'}, 500, function(){
		
			$(this).css('position', 'relative');
			$(this).css('right', 'auto');
		
		})
	
	})
		
		
	for( var key in _Elements.elements ) {
					
		niceKey = key.toLowerCase().replace(" ", "_");
		
		//$('<li><a href="" id="'+niceKey+'">'+key+'</a></li>').appendTo('#menu #main ul#elements');
		if(key=='PayPal' || key=='Popups'||key=='Titles and&nbsp;Texts'||key=='Social' ||key=='Headers'){
			if(key=='PayPal'){
				$('<li><a href="" id="'+niceKey+'">'+key+'  <span class="label label-danger pix_paypal_new_label">New</span></a></li>').appendTo('#menu #main ul#elements');
			}else{
				$('<li><a href="" id="'+niceKey+'">'+key+'  <span class="label label-danger pix_new_label">New</span></a></li>').appendTo('#menu #main ul#elements');	
			}
		}else{
			$('<li><a href="" id="'+niceKey+'">'+key+'</a></li>').appendTo('#menu #main ul#elements');
		}
			
		for( x=0; x<_Elements.elements[key].length; x++ ) {
			
			
			if( _Elements.elements[key][x].thumbnail == null ) {//we'll need an iframe
			
				//build us some iframes!
			
				if( _Elements.elements[key][x].sandbox != null ) {
					
					if( _Elements.elements[key][x].loaderFunction != null ) {
						loaderFunction = 'data-loaderfunction="'+_Elements.elements[key][x].loaderFunction+'"';
					}
			
					newItem = $('<li class="element '+niceKey+'"><iframe src="'+_Elements.elements[key][x].url+'" scrolling="no" data-sandbox="" '+loaderFunction+'></iframe></li>');
			
				} else {
				
					newItem = $('<li class="element '+niceKey+'"><iframe src="about:blank" scrolling="no"></iframe></li>');
			
				}
				
				newItem.find('iframe').uniqueId();
				
				newItem.find('iframe').attr('src', _Elements.elements[key][x].url);
			
			} else {//we've got a thumbnail
				
				if( _Elements.elements[key][x].sandbox != null ) {
					
					if( _Elements.elements[key][x].loaderFunction != null ) {
						loaderFunction = 'data-loaderfunction="'+_Elements.elements[key][x].loaderFunction+'"';
					}
					
					newItem = $('<li class="element '+niceKey+'"><img src="'+_Elements.elements[key][x].thumbnail+'" data-srcc="'+_Elements.elements[key][x].url+'" data-height="'+_Elements.elements[key][x].height+'" data-sandbox="" '+loaderFunction+'></li>')
					
				} else {
			
					newItem = $('<li class="element '+niceKey+'"><img src="'+_Elements.elements[key][x].thumbnail+'" data-srcc="'+_Elements.elements[key][x].url+'" data-height="'+_Elements.elements[key][x].height+'"></li>')
					
				}
			
			}
			
			
							
			newItem.appendTo('#menu #second ul');		
			
				
			//zoomer works
			if( _Elements.elements[key][x].height ) {
				theHeight = _Elements.elements[key][x].height*0.25;
			} else {
				theHeight = 'auto'
			}
				
			newItem.find('iframe').zoomer({
				zoom: 0.25,
				width: 270,
				height: theHeight,
				message: "Drag&Drop Me!"
			});
			
		}
			
		//draggables
		makeDraggable( '#page1' )
	
	}
	
	// main menu (left sidebar) hide/show
	$('#menu').mouseenter(function(){
		$(this).stop().animate({'left': '0px'}, 500);
	}).mouseleave(function(){
		$(this).stop().animate({'left': '-190px'}, 500);
	})
		
	//use function call to make the ULs sortable
	makeSortable( $('#pageList ul#page1') );
	makeSortable( $('form input') );
		
	//second menu animation		
	$('#menu #main #elements').on('click', 'a:not(.btn)', function(){
	
		$('#menu #main a').removeClass('active');
		$(this).addClass('active');
	
		//show only the right elements
		$('#menu #second ul li').hide();
		$('#menu #second ul li.'+$(this).attr('id')).show();
		
		if( $(this).attr('id') == 'all' ) {
			$('#menu #second ul li').show();
		}
	
		$('.menu .second').css('display', 'block').stop().animate({
			width: secondMenuWidth
		}, 500);	
		
	
	})
	
	//second nav hide button
	$('#menu').mouseleave(function(){
	
		$('#menu #main a').removeClass('active');

		$('.menu .second').stop().animate({
			width: 0
		}, 500, function(){
		
			$('#menu #second').hide();
		
		});

	});
	
	
	$('#menu #main').on('click', 'a:not(.actionButtons)', function(e){
		e.preventDefault();
	})

	$('#menu').mouseleave(function(){
	
		$('#menu #main a').removeClass('active');

		$('.menu .second').stop().animate({
			width: 0
		}, 500, function(){
		
			$('#menu #second').hide();
		
		});

	});
	
	
	//disable on load
	$('input:radio[name=mode]').parent().addClass('disabled');
	$('input:radio[name=mode]#modeBlock').radio('check');
	
	
	var elToUpdate;
	var pix_Frame;
	var context = false;

	//design mode toggle
	$('input:radio[name=mode]').on('toggle', function(){
	
		if( $(this).val() == 'content' ) {
		
			//close style editor
			closeStyleEditor();
		
			//hide all iframe covers and activate designMode
			
			$('#pageList ul .frameCover').each(function(){
			
				$(this).hide();
			
			})

			
			
			$('#pageList ul li iframe').each(function(){
			
				
				//remove old click events
				for( var key in editableItems ) {
					//pixbody			
					$(this).contents().find( 'body' + ' '+ key ).unbind('hover').unbind('click');
				
				}				
			
			})
			
			
			//active content edit mode
			$('#pageList ul li iframe').each(function(){
				pix_Frame = $(this);
				
				for (i=0; i<editableContent.length; ++i) {
					
					//remove old events
					//pixbody
					$(this).contents().find( 'body' + ' '+editableContent[i] ).unbind('click').unbind('hover');
					
					//pixbody
					$(this).contents().find( 'body' + ' '+editableContent[i] ).hover( function(){
											
						$(this).css({'outline': '2px dotted #f67828', 'cursor': 'pointer'})
						
					}, function(){
											
						$(this).css({'outline': '', 'cursor': ''})

						
					} ).bind("contextmenu", function (event) {
					    event.preventDefault();
					    context = true;
					    event.target.click();
					    context = false;

					}).click( function(e){
				
						elToUpdate = $(this);
						
						if(!context){
							e.preventDefault();	
							e.stopPropagation();
							$('#editContentModal #contentToEdit').val( $(this).html() )
							$('#editContentModal').modal('show');

						//for the elements below, we'll use a simplyfied editor, only direct text can be done through this one
						if( this.tagName == 'SMALL' || this.tagName == 'A' || this.tagName == 'LI' || this.tagName == 'SPAN' || this.tagName == 'B' || this.tagName == 'I' || this.tagName == 'TT' || this.tageName == 'CODE' || this.tagName == 'EM' || this.tagName == 'STRONG' || this.tagName == 'SUB' || this.tagName == 'BUTTON' || this.tagName == 'LABEL' || this.tagName == 'P' || this.tagName == 'H1' || this.tagName == 'H2' || this.tagName == 'H2' || this.tagName == 'H3' || this.tagName == 'H4' || this.tagName == 'H5' || this.tagName == 'H6' ) {
							
							$('#editContentModal #contentToEdit').redactor({
								buttons: ['html', 'bold', 'italic', 'deleted'],
								focus: true,
								plugins: ['bufferbuttons'],
								buttonSource: true,
								paragraphize: false,
								linebreaks: true
							});
							
						} else if( this.tagName == 'DIV' && $(this).hasClass('tableWrapper') ) {
							
							$('#editContentModal #contentToEdit').redactor({
								buttons: ['html', 'formatting', 'bold', 'italic', 'deleted', 'table', 'image', 'link', 'alignment'],
								focus: true,
								plugins: ['table', 'bufferbuttons'],
								buttonSource: true,
								paragraphize: false,
								linebreaks: false
							});
							
						} else {
					
							$('#editContentModal #contentToEdit').redactor({
								buttons: ['html', 'formatting', 'bold', 'italic', 'deleted', 'unorderedlist', 'orderedlist', 'outdent', 'indent', 'image', 'file', 'link', 'alignment', 'horizontalrule'],
								focus: true,
								buttonSource: true,
								paragraphize: false,
								linebreaks: false
							});
						}
						
						}

					} ).each( function(){
					
						$(this).attr('data-selector', key)
					
					} );
					
				}
							
			})
			
			
		
		} else if( $(this).val() == 'block' ) {
		
			//close style editor
			closeStyleEditor();
		
			//show all iframe covers and activate designMode
			
			$('#pageList ul .frameCover').each(function(){
			
				$(this).show();
			
			})
			
			//deactivate designmode
			
			$('#pageList ul li iframe').each(function(){
			
				
				for( var key in editableItems ) {
				
					$(this).contents().find( pageContainer + ' '+ key ).unbind('mouseenter mouseleave');
				
				}
			
				this.contentDocument.designMode = "off";
			
			})
		
		} else if( $(this).val() == 'styling' ) {
		
			//hide all iframe covers and activate designMode
			$('#pageList ul .frameCover').each(function(){
				$(this).hide();
			})
			
			
			
			//active styling mode
			$('#pageList ul li iframe').each(function(){
			
				
				//remove old click events
				$(this).contents().find( 'body ' + ' p' ).unbind('click').unbind('hover');
				
			
				for( var key in editableItems ) {
								
					$(this).contents().find( 'body' + ' '+ key ).hover( function(e){
												
						e.stopPropagation();
											
						if( $(this).closest('body').width() != $(this).width() ) {
											
							$(this).css({'outline': '2px dotted #f67828', 'cursor': 'pointer'});
						
						} else {
							
							$(this).css({'outline': '2px dotted #f67828', 'outline-offset': '-3px', 'cursor': 'pointer'});
							
						}
					
					}, function(){
											
						$(this).css({'outline': '', 'cursor': '', 'outline-offset': ''})
						
					} ).click( function(e){
					
						e.preventDefault();
						
						e.stopPropagation();
					
						styleClick(this, key)
						
					
					} ).each( function(){
					
						$(this).attr('data-selector', key)
					
					} );
				
				}				
			
			})
		
		}
	
	});
	
	
	$('button#updateContentInFrameSubmit').click(function(){
		
		
		elToUpdate.html( $('#editContentModal #contentToEdit').redactor('code.get') ).css({'outline': '', 'cursor':''});
		
		/* SANDBOX */
		
		sandboxID = hasSandbox( elToUpdate )
		
		if( sandboxID ) {
			
			elementID = elToUpdate.attr('id');
			
			$('#'+sandboxID).contents().find('#'+elementID).html( $('#editContentModal #contentToEdit').redactor('code.get') );
			
		}
		
		/* END SANDBOX */
				
		$('#editContentModal textarea').each(function(){
			
			$(this).redactor('core.destroy');
			$(this).val('');
			
		});
		
		$('#editContentModal').modal('hide');
		
		$(this).closest('body').removeClass('modal-open').attr('style', '');
		
		//reset iframe height
		heightAdjustment(elToUpdate.get(0));
		
		//element was deleted, so we've got pending changes
		setPendingChanges(true)
						
	})
	
	
	console.log("asdsadsadsadsa");
	$('#ftp_export_btn').click(function(){
		 $('#ftpform :input[isacopy]').remove();
	     $('#markupForm :input').not(':submit').clone().hide().attr('isacopy','y').appendTo('#ftpform');
	});

	//close styleEditor
	$('#styleEditor .sidetitle a.close').click(function(e){
	
		e.preventDefault();
		closeStyleEditor();
	
	})
	
	// Duplicate Block
	$('#pageList').on("click", ".frameCover > .dupBlock", function(){	

		blockToDup = $(this).closest('li');
		console.log(blockToDup.html());
		block_clone = blockToDup.clone();
		var orginal_data = blockToDup.find('iframe').contents().find(pageContainer).html();
		var sec_height = block_clone.find('.frameCover').height();
	 	block_clone.find('iframe').load(function(){
			 $(this).contents().find(pageContainer).html( orginal_data );

			temp_css = "";
			if( localStorage['css_'+$('#pageTitle span span').text()] ){
				temp_css =  JSON.parse(localStorage['css_'+$('#pageTitle span span').text()]);
				ff = $(this).contents().find('#pix_style');
				if(ff.length){
					q = ff[0].innerHTML;	
					$(this).contents().find('#pix_style')[0].innerHTML=temp_css;
				}else{
					style = document.createElement('style');
					style.type = 'text/css';
					style.id = 'pix_style';
					if (style.styleSheet){
					  style.styleSheet.cssText = temp_css;
					} else {
					  style.appendChild(document.createTextNode(temp_css));
					}
					head = $(this).contents().find('head')[0];
					head.appendChild(style);
				}
			}

			sec_height = $(this).height();
		});
		$(block_clone).height(sec_height);
		blockToDup.after(block_clone);
	});

	//delete blocks from window
	
	var blockToDelete;
	
	$('#pageList').on("click", ".frameCover > .deleteBlock", function(){
	
		$('#deleteBlock').modal('show');
		
		blockToDelete = $(this).closest('li');
	
		$('#deleteBlock').off('click', '#deleteBlockConfirm').on('click', '#deleteBlockConfirm', function(){
		
			
			/* SANDBOX */
			
			var attr = blockToDelete.find('iframe').attr('data-sandbox');
				
			if (typeof attr !== typeof undefined && attr !== false) {
		
				//has sandbox, delete it
				$('#sandboxes #'+attr).remove();
		
			}
		
			/* END SANDBOX */
			
		
			$('#deleteBlock').modal('hide');
		
			blockToDelete.fadeOut(500, function(){
			
				$(this).remove();
				
				pageEmpty();
				
				allEmpty();
				
				setPendingChanges(true)
			
			})			
		
		})
	
	});
	
	
	//reset block
	$('#pageList').on("click", ".frameCover > .resetBlock", function(){
		
		$('#resetBlock').modal('show');
		
		frameToReset = $(this).closest('li').find('iframe');
					
		$('#resetBlock').off('click', '#resetBlockConfirm').on('click', '#resetBlockConfirm', function(){
		
			$('#resetBlock').modal('hide');
		
			frameToReset.get(0).contentWindow.location.reload();
			
			/* SANDBOX */
			
			var attr = frameToReset.attr('data-sandbox');
	
			if (typeof attr !== typeof undefined && attr !== false) {
		
				//has sandbox, reset it
				document.getElementById(attr).contentDocument.location.reload(true);
		
			}
		
			/* END SANDBOX */
		
		});

		
	});
	
	
	var aceEditors = new Array();//store all ace editors
	
	
	//block source code
	$('#pageList').on("click", ".frameCover > .htmlBlock", function(){
		
		//hide the iframe
		$(this).closest('.li').find('iframe').hide();
		
		
		//disable draggable on the LI
		$(this).closest('li').parent().sortable('disable');
				
				
		//built editor element
		theEditor = $('<div class="aceEditor"></div>');
		theEditor.uniqueId();
		
		//set the editor height
		if($(this).closest('li').height() < 350){
			$(this).closest('li').height(350);
			theEditor.height(350);
		}else{
			theEditor.height( $(this).closest('li').height() );
		}

		
		$(this).closest('li').append( theEditor );
		
		theId = theEditor.attr('id');
		
		var editor = ace.edit( theId );
		
		//sandbox?
		
		var attr = $(this).closest('li').find('iframe').attr('data-sandbox');

		if (typeof attr !== typeof undefined && attr !== false) {
			
			editor.setValue( $('#sandboxes #'+attr).contents().find( pageContainer ).html() );
			
			//has sandbox, reset it
			document.getElementById(attr).contentDocument.location.reload(true);
	
		} else {
			
			editor.setValue( $(this).closest('li').find('iframe').contents().find( pageContainer ).html() );
			
		}
			
		
		editor.setTheme("ace/theme/twilight");
		editor.getSession().setMode("ace/mode/html");
		
		//buttons
		
		cancelButton = $('<button type="button" class="btn btn-danger editCancelButton btn-wide"><span class="fui-cross"></span> Cancel</button>');
		saveButton = $('<button type="button" class="btn btn-primary editSaveButton btn-wide"><span class="fui-check"></span> Save</button>');
	
		buttonWrapper = $('<div class="editorButtons"></div>');
		buttonWrapper.append( cancelButton );
		buttonWrapper.append( saveButton );
		
		$(this).closest('li').append( buttonWrapper );
		
		aceEditors[ theId ] = editor;
		
	});
	
	
	$('#pageList').on("click", "li .editorButtons .editCancelButton", function(){
		
		//theId = $(this).closest('.editorButtons').prev().attr('id');
		
		//enable draggable on the LI
		$(this).closest('li').parent().sortable('enable');
		
		$(this).parent().prev().remove();
		
		//height adjustment
		heightAdjustment( $(this).closest('li').find('iframe').attr('id'), true );

		$(this).closest('li').find('.zoomer-small iframe').fadeIn(500);
		
		$(this).parent().fadeOut(500, function(){
			
			$(this).remove();
			
		})
						
	});
	
	
	$('#pageList').on("click", "li .editorButtons .editSaveButton", function(){
		
		//enable draggable on the LI
		$(this).closest('li').parent().sortable('enable');
		
		
		theId = $(this).closest('.editorButtons').prev().attr('id');

		theContent = aceEditors[theId].getValue();
		
		theiFrame = $(this).closest('li').find('iframe');
						
		
		$(this).parent().prev().remove();
		
		
		
		//theiFrame.contents().find( pageContainer ).html( theContent );
		
		
		/* SANDBOX */
		
		var attr = $(this).closest('li').find('iframe').attr('data-sandbox');

		if (typeof attr !== typeof undefined && attr !== false) {
							
			$('#sandboxes #'+attr).contents().find( pageContainer ).html( theContent );
			
			
			$(this).closest('li').find('iframe').show().contents().find( pageContainer ).html( theContent );
						
			//do we need to execute a loader function?
			if (typeof theiFrame.attr('data-loaderfunction') !== typeof undefined && theiFrame.attr('data-loaderfunction') !== false) {
			
				var codeToExecute = "theiFrame[0].contentWindow."+theiFrame.attr('data-loaderfunction')+"()";
				var tmpFunc = new Function(codeToExecute);
				tmpFunc();
			
			}
							
		} else {
			
			$(this).closest('li').find('iframe').show().contents().find( pageContainer ).html( theContent );
			
		}
		
		/* END SANDBOX */
		
		//height adjustment
		heightAdjustment( $(this).closest('li').find('iframe').attr('id'), true );
		
		
		$(this).parent().fadeOut(500, function(){
			
			$(this).remove();
			
		})
		
		setPendingChanges(true)
						
	});
	
	
	
	//save page
	$('#savePage, #exportSave').click(function(e){
		
		savePage(e);
		
	});



//=======================================================================================================================
// This part of code is licensed to Pixfort.com (http://themeforest.net/user/PixFort) and not allowed to copy or reuse it
// Copyright PixFort 2016
// Start of Copyrighted Code

	$('#saveprojPage').click(function(e){

		$('#savePage').click();
		if (navigator.appVersion.toString().indexOf('.NET') > 0){
			 saveTextAsFile('project.pixbuilder',JSON.stringify(localStorage));
		}else{
			console.save(JSON.stringify(localStorage),'project.pixbuilder');	
		}
 		
 	});

	var section_editor = ace.edit("cssToEdit");
	section_editor.setTheme("ace/theme/monokai");
    section_editor.getSession().setMode("ace/mode/css");
    
    
    section_editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        showPrintMargin: false,
        enableLiveAutocompletion: true
    });
    $('#cssToEdit').height(0.5 * $(window).height());
	$('#open_page_css').click(function(e){
		temp_css = "";
		if( localStorage['css_'+$('#pageTitle span span').text()] ){
			temp_css =  JSON.parse(localStorage['css_'+$('#pageTitle span span').text()]);
		}
		//alert(temp_css);
		//document.getElementById("cssToEdit").value = temp_css;
		//document.getElementById("cssToEdit").innerHTML = "";
		
		section_editor.setValue(temp_css); // or session.setValue	
		section_editor.gotoLine(1);
                    

	});
	

 	$('#css_save').click(function(e){
 		//var section_editor = ace.edit("cssToEdit");
		//css = document.getElementById("cssToEdit").value+" ";
		css = section_editor.getValue()+" ";
		localStorage['css_'+$('#pageTitle span span').text()] = JSON.stringify(css);
		

		$('#pageList li:visible iframe').each(function(){
			ff = $(this).contents().find('#pix_style');
			if(ff.length){
				q = ff[0].innerHTML;	
				$(this).contents().find('#pix_style')[0].innerHTML=css;
			}else{
				style = document.createElement('style');
				style.type = 'text/css';
				 style.id = 'pix_style';
				if (style.styleSheet){
				  style.styleSheet.cssText = css;
				} else {
				  style.appendChild(document.createTextNode(css));
				}
				head = $(this).contents().find('head')[0];
				head.appendChild(style);
			}
		});
 	});

	$('#loadprojPage').click(function(e){
		var f = document.getElementById("fileinput").files[0]; 
    	if (f) {
	    	var re = confirm("*Note: after the import process all the current landing pages will be deleted!\nPress Ok to import the project and reload the builder.");
			if (re == true) {
		      var r = new FileReader();
		      r.onload = function(e) { 
			      var contents = e.target.result;
		        // alert( "Got the file.n" 
		        //       +"name: " + f.name + "n"
		        //       +"type: " + f.type + "n"
		        //       +"size: " + f.size + " bytesn"
		        //       + "starts with: " + contents.substr(1, contents.indexOf("n"))
		        // );  
		        var data = JSON.parse(contents);
				for (var key in data) {
				  localStorage[key] = data[key];
				}
				window.location.reload(false); 
		      }
		      r.readAsText(f);
		    }
	    } else { 
	      alert("Failed to load file");
		}
	 });

 	$('#pix_import').click(function(e){
 		$( "#pix_toggle" ).toggle('slow');
 	});

 	$('#loadbutton').click(function(e){
		alert($('#loadpage').val());
		// //localStorage['blocksFrame'+pageCounter] = $('#loadpage').val();
		// localStorage['blocksElement1'] = $('#loadpage').val();
		// localStorage['blocksFrame1'] = $('#loadpage2').val();
		var data = JSON.parse($('#loadpage').val());
		for (var key in data) {
		  localStorage[key] = data[key];
		}
 	});

	$( "#load" ).change(function( event ) {
		alert('asd');
	    var fr = new FileReader();
	    fr.onload = function(){
	        canvas2.loadFromJSON(this.result, canvas2.renderAll.bind(canvas2));
	    }
	    fr.readAsText(this.files[0]);    
	    alert(JSON.stringify(this.result));
	});

//=======================================================================================================================
// End of PixFor Copyrighted Code - 2016
//=======================================================================================================================
	
	
	$('#seoButton').click(function(e){
		$('#pageData_title').val("");
		$('#pageData_metaDescription').val("");
		$('#pageData_metaKeywords').val("");
		$('#pageData_headerIncludes').val("");
		temp_seo =  JSON.parse(localStorage['seo_'+$('#pageTitle span span').text()]);
		$('#pageData_title').val(temp_seo[0]);
		$('#pageData_metaDescription').val(temp_seo[1]);
		$('#pageData_metaKeywords').val(temp_seo[2]);
		$('#pageData_headerIncludes').val(temp_seo[3]);
		//alert($('#pix_seo_title'));
		var MyDiv = document.getElementById('pix_seo_title');
   		MyDiv.innerHTML = $('#pageTitle span span').text()+".html";
		//$('#pix_seo_title').innerHTML = $('#pageTitle span span').text();
	});	

	$('#seoSubmittButton').click(function(e){
		
 		var seo_arr = [$('#pageData_title').val(), 
 					$('#pageData_metaDescription').val(), 
					$('#pageData_metaKeywords').val(), 
					$('#pageData_headerIncludes').val(), 
				];
		localStorage['seo_'+$('#pageTitle span span').text()] = JSON.stringify(seo_arr);
		temp_seo =  JSON.parse(localStorage['seo_'+$('#pageTitle span span').text()]);
 	});

	//preview
	$('#previewModal').on('show.bs.modal', function (e) {
		
		$('#previewModal > form #showPreview').show('');
		
		//$('#previewModal > form #previewCancel').text('Cancel');
		
		closeStyleEditor();
	
	});
	
	

	$('#previewModal').on('shown.bs.modal', function (e) {
		
		$('#previewModal form input[type="hidden"]').remove();
		
		//grab visible page
		$('#pageList > ul:visible').each(function(){
		
			//grab the skeleton markup
			newDocMainParent = $('iframe#skeleton').contents().find( pageContainer );
			
			//empty out the skeleton
			newDocMainParent.find('*').remove();
			
			$(this).find('iframe').each(function(){
				//sandbox or regular?
				var attr = $(this).attr('data-sandbox');
				if (typeof attr !== typeof undefined && attr !== false) {
					theContents = $('#sandboxes #'+attr).contents().find( pageContainer );
				} else {
					theContents = $(this).contents().find( pageContainer );
				}
								
				//remove .frameCovers
				theContents.find('.frameCover').each(function(){
					$(this).remove();
				});
				
				//remove inline styling leftovers
				for( var key in editableItems ) {	
					theContents.find( key ).each(function(){
						$(this).removeAttr('data-selector');
						if( $(this).attr('style') == '' ) {
							$(this).removeAttr('style')
						}
					})			
				}	
				for (i=0; i<editableContent.length; ++i) {
					$(this).contents().find( editableContent[i] ).each(function(){
						$(this).removeAttr('data-selector');
					})
				}
				toAdd = theContents.html();
				//grab scripts
				scripts = $(this).contents().find( pageContainer ).find('script');
				if( scripts.size() > 0 ) {
					theIframe = document.getElementById("skeleton");
					scripts.each(function(){
						if( $(this).text() != '' ) {//script tags with content
							var script = theIframe.contentWindow.document.createElement("script");
							script.type = 'text/javascript';
							script.innerHTML = $(this).text();
							theIframe.contentWindow.document.getElementById( pageContainer.substring(1) ).appendChild(script);
						} else if( $(this).attr('src') != null ) {
							var script = theIframe.contentWindow.document.createElement("script");
							script.type = 'text/javascript';
							script.src = $(this).attr('src');
							theIframe.contentWindow.document.getElementById( pageContainer.substring(1) ).appendChild(script)
						}
					})
				}
				newDocMainParent.append( $(toAdd) );
			});
			newInput = $('<input type="hidden" name="page" value="">');
			temp_css = "";
			if( localStorage['css_'+$('#pageTitle span span').text()] ){
				temp_css =  JSON.parse(localStorage['css_'+$('#pageTitle span span').text()]);
			}	
			newStyle = $('<input type="hidden" name="customStyle" value="">');
			newStyle.val(temp_css);
			$('#previewModal form').prepend( newStyle );	
			$('#previewModal form').prepend( newInput );
			//newInput.val( "<html>"+$('iframe#skeleton').contents().find('html').html()+"</html>" )
			newInput.val($('iframe#skeleton').contents().find('body').html())
		})
		
	});
	
	$('#previewModal > form').submit(function(){
	
		$('#previewModal > form #showPreview').hide('');
		
		$('#previewModal > form #previewCancel').text('Close Window');

		if (document.getElementById("pixcheck").checked) {
			localStorage['fastpreview'] = "1";
			$('#preview').hide();
			$('#pix_preview_form').css('display', 'inline-block');
			$('#pix_preview_form').css('float', 'right');
		}
		//localStorage['fastpreview'] = "1";
	
	})
	
	
	
	$('#pix_preview_form').submit(function(){
		$('#pix_preview_form input[type="hidden"]').remove();
		//grab visible page
		$('#pageList > ul:visible').each(function(){
		
			//grab the skeleton markup
			newDocMainParent = $('iframe#skeleton').contents().find( pageContainer );
			
			//empty out the skeleton
			newDocMainParent.find('*').remove();
			
			$(this).find('iframe').each(function(){
				//sandbox or regular?
				var attr = $(this).attr('data-sandbox');
				if (typeof attr !== typeof undefined && attr !== false) {
					theContents = $('#sandboxes #'+attr).contents().find( pageContainer );
				} else {
					theContents = $(this).contents().find( pageContainer );
				}
								
				//remove .frameCovers
				theContents.find('.frameCover').each(function(){
					$(this).remove();
				});
				
				//remove inline styling leftovers
				for( var key in editableItems ) {	
					theContents.find( key ).each(function(){
						$(this).removeAttr('data-selector');
						if( $(this).attr('style') == '' ) {
							$(this).removeAttr('style')
						}
					})			
				}	
				for (i=0; i<editableContent.length; ++i) {
					$(this).contents().find( editableContent[i] ).each(function(){
						$(this).removeAttr('data-selector');
					})
				}
				toAdd = theContents.html();
				//grab scripts
				scripts = $(this).contents().find( pageContainer ).find('script');
				if( scripts.size() > 0 ) {
					theIframe = document.getElementById("skeleton");
					scripts.each(function(){
						if( $(this).text() != '' ) {//script tags with content
							var script = theIframe.contentWindow.document.createElement("script");
							script.type = 'text/javascript';
							script.innerHTML = $(this).text();
							theIframe.contentWindow.document.getElementById( pageContainer.substring(1) ).appendChild(script);
						} else if( $(this).attr('src') != null ) {
							var script = theIframe.contentWindow.document.createElement("script");
							script.type = 'text/javascript';
							script.src = $(this).attr('src');
							theIframe.contentWindow.document.getElementById( pageContainer.substring(1) ).appendChild(script)
						}
					})
				}
				newDocMainParent.append( $(toAdd) );
			});
			newInput = $('<input type="hidden" name="page" value="">');
			temp_css = "";
			if( localStorage['css_'+$('#pageTitle span span').text()] ){
				temp_css =  JSON.parse(localStorage['css_'+$('#pageTitle span span').text()]);
			}	
			newStyle = $('<input type="hidden" name="customStyle" value="">');
			newStyle.val(temp_css);
			$('#pix_preview_form').prepend( newStyle );	
			$('#pix_preview_form').prepend( newInput );
			//newInput.val( "<html>"+$('iframe#skeleton').contents().find('html').html()+"</html>" )
			newInput.val($('iframe#skeleton').contents().find('body').html())
		})
	})
	//export markup
	
	$('#exportModal').on('show.bs.modal', function (e) {

		$('#exportModal > form #exportSubmit').show('');
		
		$('#exportModal > form #exportCancel').text('Cancel & Close');
		
		closeStyleEditor();
	
	});
	
	$('#exportModal').on('shown.bs.modal', function (e) {

		

		var img_urls = [];

		//delete older hidden fields
		$('#exportModal form input[type="hidden"]').remove();
		

		//loop through all pages
		$('#pageList > ul').each(function(){
				
			//grab the skeleton markup
			newDocMainParent = $('iframe#skeleton').contents().find( pageContainer );
			
			//empty out the skeleton
			newDocMainParent.find('*').remove();
			
			//loop through page iframes and grab the body stuff
			$(this).find('iframe').each(function(){
				
				
				//sandbox or regular?
				var attr = $(this).attr('data-sandbox');
				if (typeof attr !== typeof undefined && attr !== false) {
					theContents = $('#sandboxes #'+attr).contents().find( pageContainer );
				} else {
					theContents = $(this).contents().find( pageContainer );
				}
								
				//remove .frameCovers
				theContents.find('.frameCover').each(function(){
					$(this).remove();
				});
				//firas99
				//remove inline styling leftovers
				for( var key in editableItems ) {
					//alert('Key :'+key)
					theContents.find( key ).each(function(){
						//alert( "Data before: "+ $(this).attr('data-selector') );
						$(this).removeAttr('data-selector');
						//alert( "Data after: "+ $(this).attr('data-selector') );
						if( $(this).attr('style') == '' ) {
							$(this).removeAttr('style')
						}
					})
				}	
				for (i=0; i<editableContent.length; ++i) {
					$(this).contents().find( editableContent[i] ).each(function(){
						$(this).removeAttr('data-selector');
					});
					// pix_img_scan
					$(this).contents().find( '*' ).each(function(){
						if ($(this).is('img')) {
							var img_url3 = $(this).attr('src');
							if (img_urls.indexOf(img_url3) === -1) {
								if(img_url3 && !img_url3.startsWith("http")){
									img_urls.push(img_url3);	
								}
							}
						}else{
							var backImg = $(this).css('background-image');
							if (backImg != 'none') {
								var jsSrcRegex1 = /url\(\"([\s\S]*)\"\)/; 
								var img_url1;
								if(jsSrcRegex1.exec(backImg)){
									img_url1 = jsSrcRegex1.exec(backImg)[1];	
								}
					 			if(img_url1){
					 				var jsSrcRegex2 = /([\s\S]*)\/images\/([\s\S]*)/; 
					 				if(jsSrcRegex2.exec(img_url1)){
					 					var img_url2 = jsSrcRegex2.exec(img_url1)[2];
					 				}
					 				if(img_url2){
					 					img_url2 = "images/"+img_url2;
					 					if (img_urls.indexOf(img_url2) === -1) {
											img_urls.push(img_url2);
										}
					 				}
								}
							}
						}		
					})
				}

				//alert(img_urls);
				


					
				toAdd = theContents.html();
				//grab scripts
				scripts = $(this).contents().find( pageContainer ).find('script');
				if( scripts.size() > 0 ) {
					theIframe = document.getElementById("skeleton");
					scripts.each(function(){
						if( $(this).text() != '' ) {//script tags with content
							var script = theIframe.contentWindow.document.createElement("script");
							script.type = 'text/javascript';
							script.innerHTML = $(this).text();
							theIframe.contentWindow.document.getElementById( pageContainer.substring(1) ).appendChild(script);
						} else if( $(this).attr('src') != null ) {
							var script = theIframe.contentWindow.document.createElement("script");
							script.type = 'text/javascript';
							script.src = $(this).attr('src');
							theIframe.contentWindow.document.getElementById( pageContainer.substring(1) ).appendChild(script)
						}
					})
				}
				newDocMainParent.append( $(toAdd) );
				//	alert(toAdd);
			});
			
			newInput = $('<input type="hidden" name="pages['+$('#pages li:eq('+($(this).index()+1)+') a:first').text()+']" value="">');
			new_str = "";
			css_str = "";
			//new_str = JSON.parse(localStorage['seo_'+ $('#pages li:eq('+($(this).index()+1)+') a:first').text()]);
			new_str = localStorage['seo_'+ $('#pages li:eq('+($(this).index()+1)+') a:first').text()];
			css_str = localStorage['css_'+ $('#pages li:eq('+($(this).index()+1)+') a:first').text()];

			//newInput2 = $('<input type="hidden" name="seo['+$('#pages li:eq('+($(this).index()+1)+') a:first').text()+']" value="'+ new_str + '">');
			//newInput2 = $('<input type="hidden" name="seo['+$('#pages li:eq('+($(this).index()+1)+') a:first').text()+']" >').value = new_str;;
			var newInput2 = document.createElement("input");
			newInput2.setAttribute('type', 'hidden');
			newInput2.setAttribute('name', 'seo['+$('#pages li:eq('+($(this).index()+1)+') a:first').text()+']');
			newInput2.setAttribute('value', new_str);

			var newInput3 = document.createElement("input");
			newInput3.setAttribute('type', 'hidden');
			newInput3.setAttribute('name', 'css['+$('#pages li:eq('+($(this).index()+1)+') a:first').text()+']');
			newInput3.setAttribute('value', css_str);


			
			
			$('#exportModal form').prepend( newInput3 );
			$('#exportModal form').prepend( newInput2 );
			$('#exportModal form').prepend( newInput );
			
			//firas2 = '<div id="fb-root"></div><script>(function(d, s, id) {  var js, fjs = d.getElementsByTagName(s)[0];  if (d.getElementById(id)) return;  js = d.createElement(s); js.id = id;  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";  fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script>';	
			//$('iframe#skeleton').contents().find('body').append( firas2 );
			//newInput.val( "<html>"+$('iframe#skeleton').contents().find('html').html()+"</html>" );
			newInput.val($('iframe#skeleton').contents().find('body').html());

		
		})

		var newInput4 = document.createElement("input");
		newInput4.setAttribute('type', 'hidden');
		newInput4.setAttribute('name', 'pix_export_imgs_Field');
		newInput4.setAttribute('value', JSON.stringify(img_urls));
		$('#exportModal form').prepend( newInput4 );
				
	});
	
	
	
	$('#exportModal > form').submit(function(){
	
		$('#exportModal > form #exportSubmit').hide('');
		
		$('#exportModal > form #exportCancel').text('Close Window');
	
	});


	
	//clear screen
	$('#clearScreen').click(function(){
	
		$('#deleteAll').modal('show');
		
		$('#deleteAll').on('click', '#deleteAllConfirm', function(){
		
			$('#deleteAll').modal('hide');
		
			$('#pageList ul:visible li').fadeOut(500, function(){
			
				$(this).remove();
					
				pageEmpty();
				
				allEmpty();
			
			});
			
			//remove possible sandboxes
			$('#sandboxes iframe').each(function(){
			
				$(this).remove();
			
			})
		
		})
		
		setPendingChanges(true);
	
	});
	
	
	//page menu buttons
	
	//add page
	
	$('#pages').on('blur', 'li > input', function(){
	
		if( $(this).parent().find('a.plink').size() == 0 ) {
								
			theLink = $('<a href="#'+$(this).val()+'" class="plink">'+$(this).val()+'</a>');
		
			$(this).hide();
		
			$(this).closest('li').prepend( theLink );
		
			$(this).closest('li').removeClass('edit');
			
			
			//update the page dropdown
			
			$('#internalLinksDropdown option:eq('+$(this).parent().index()+')').text( $(this).val() ).attr('value', $(this).val()+".html");
			
			$('select#internalLinksDropdown').selectpicker({style: 'btn-sm ', menuStyle: 'dropdown-inverse'})
			
		
			$(this).remove();
		
		}
	
	})
	
	
	$('#open_page_sections').live("click", function(e){ 
		e.preventDefault();
		theLIIndex = $('#pages li.active').index();
		pageName = 'page1';
		if(theLIIndex != 1){
			pageName = 'page'+theLIIndex;
		}

		sec_counter = 1;
		$('#sections_table').contents().html("");
		//toInsert = $('<tr><td class="active">'+sec_counter+'</td><td class="success">...</td><td class="info">Delete</td></tr>');
		toInsert = $('<tr><th>Order</th><th>Height</th><th>Section Name</th><th> </th></tr>');
		$('#sections_table').append( toInsert );

		$('#'+pageName).find('li').each(function(){
			//console.log(this);
			newOption = "...";
			theiFrame = $(this).find('iframe');
			frameLink = theiFrame.attr('src');
			sec_height = 0;
			sec_height = $(this).height();
			if( $(this).find('iframe').contents().find( pageContainer + " > *:first" ).attr('id') != undefined ) {
				newOption = $(this).find('iframe').contents().find( pageContainer + " > *:first" ).attr('id');	
			}
			toInsert = $('<tr><td class="active">'+sec_counter+'</td><td class="active">'+sec_height+'px</td><td class="active"><a href="'+frameLink+'" target="_blank">'+newOption+'</a></td><td class="danger"><a href="#" class="sec_delete_but" secorder="'+sec_counter+'">Delete</a></td></tr>');
			$('#sections_table').append( toInsert );
			sec_counter++;
		});
		if(sec_counter==1){
			toInsert = $('<tr><td class="warning"> </td><td class="warning"> </td><td class="warning">The Page is empty!</td><td class="warning"> </td></tr>');
			$('#sections_table').append( toInsert );
		}
	});

	$('.sec_delete_but').live("click", function(e){ 
		e.preventDefault();
		sec_order = $(this).attr('secorder');
		sec_order = sec_order -1;
		theLIIndex = $('#pages li.active').index();
		if(theLIIndex != 1){
			pageName = 'page'+theLIIndex;
		}
		jq = '#'+pageName+' li:eq('+sec_order+')';
		var re = confirm("Are sure you want to delete the section?");
		if (re == true) {
			$(jq).remove();
			$(this).parent().parent().remove();
			sec_counter = 1;
			
			$('#sections_table').contents().html("");
			toInsert = $('<tr><td class="active">'+sec_counter+'</td><td class="success">...</td><td class="info">Delete</td></tr>');
			toInsert = $('<tr><th>Order</th><th>Height</th><th>Section Name</th><th> </th></tr>');
			$('#sections_table').append( toInsert );

			$('#'+pageName).find('li').each(function(){
				newOption = "...";
				theiFrame = $(this).find('iframe');
				frameLink = theiFrame.attr('src');
				sec_height = 0;
				sec_height = $(this).height();
				if( $(this).find('iframe').contents().find( pageContainer + " > *:first" ).attr('id') != undefined ) {
					newOption = $(this).find('iframe').contents().find( pageContainer + " > *:first" ).attr('id');	
				}
				toInsert = $('<tr><td class="active">'+sec_counter+'</td><td class="active">'+sec_height+'px</td><td class="active"><a href="'+frameLink+'" target="_blank">'+newOption+'</a></td><td class="danger"><a href="#" class="sec_delete_but" secorder="'+sec_counter+'">Delete</a></td></tr>');
				//toInsert = $('<tr><td class="active">'+sec_counter+'</td><td class="active">...</td><td class="danger"><a href="#" class="sec_delete_but" secorder="'+sec_counter+'">Delete</a></td></tr>');
				$('#sections_table').append( toInsert );
				sec_counter++;
			});
			if(sec_counter==1){
				toInsert = $('<tr><td class="warning"> </td><td class="warning"> </td><td class="warning">The Page is empty!</td><td class="warning"> </td></tr>');
				$('#sections_table').append( toInsert );
			}
			if( $('#pageList ul:visible > li').size() == 0 ) {
				$('#start').show();
				$('#frameWrapper').addClass('empty');
			} 
			setPendingChanges(true);
		}
	});



	$('.pix_dupliacte').live("click", function(e){ 
		e.preventDefault();
		theLI = $(this).closest('li');
		//orginal_page = theLI.find('a:first').text();
		new_page = $('#pages li').size();
		new_page_id = 'page'+new_page;
		page_content = "";
		// if(orginal_page == 'index'){
		// 	orginal_page = 'page1';
		// }
		theLIIndex = $('#pages li.active').index();
		orginal_page = 'page1';
		orginal_name = 'index';
		if(theLIIndex != 1){
			orginal_page = 'page'+theLIIndex;
			orginal_name = 'page'+theLIIndex;
		}
		$('#addPage').click();

		if(localStorage['css_'+orginal_name]){
			temp_style =  JSON.parse(localStorage['css_'+orginal_name]);
			localStorage['css_'+new_page_id] = JSON.stringify(temp_style);	
		}
		//document.getElementById(new_page_id).innerHTML = page_content;
		has_sections = false;
		$('#'+orginal_page).find('li').each(function(){
			has_sections = true;
		 	toInsert = $("<li>"+$(this).html()+"</li>");
		 	toInsert2 = toInsert.html();
		 	toInsert = $("<li>"+toInsert2+"</li>");
		 	//toInsert = $(this).find('iframe').html();
		 	//toInsert = $("<li>"+blocksElement[y]+"</li>");
			//console.log(toInsert);
			//console.log(toInsert);
			// find('iframe').load(function(){
				
			// 	$(this).contents().find( pageContainer ).html( frameContents )
				
			// })
			var orginal_data = $(this).find('iframe').contents().find(pageContainer).html();
			var sec_height = toInsert.find('.frameCover').height();
			//console.log(orginal_data);
		 	toInsert.find('iframe').load(function(){
				 $(this).contents().find(pageContainer).html( orginal_data );
				// asdd = $(this).find(pageContainer).html();

				temp_css = "";
				if( localStorage['css_'+$('#pageTitle span span').text()] ){
					temp_css =  JSON.parse(localStorage['css_'+$('#pageTitle span span').text()]);
					ff = $(this).contents().find('#pix_style');
					if(ff.length){
						q = ff[0].innerHTML;	
						$(this).contents().find('#pix_style')[0].innerHTML=temp_css;
					}else{
						style = document.createElement('style');
						style.type = 'text/css';
						style.id = 'pix_style';
						if (style.styleSheet){
						  style.styleSheet.cssText = temp_css;
						} else {
						  style.appendChild(document.createTextNode(temp_css));
						}
						head = $(this).contents().find('head')[0];
						head.appendChild(style);
					}
				}

				sec_height = $(this).height();
				//console.log(sec_height);
			});
			$(toInsert).height(sec_height);
			$('#'+new_page_id).append( toInsert );
		 });
		if(has_sections){
			$('#start').hide();	
		}
		if(localStorage['seo_'+orginal_name]){
			temp_seo =  JSON.parse(localStorage['seo_'+orginal_name]);
			localStorage['seo_'+new_page_id] = JSON.stringify(temp_seo);	
		}
		return false;
	});
		
	$('#addPage').click(function(e){
	
		e.preventDefault();
		
		//turn inputs into links
		$('#pages li.active').each(function(){
		
			if( $(this).find('input').size() > 0 ) {
							
				theLink = $('<a href="#">'+$(this).find('input').val()+'</a>');
				
				$(this).find('input').remove();
				
				$(this).prepend( theLink );
				
			}
			
		})
		
		$('#pages li').removeClass('active');
		
		newPageLI = $('#newPageLI').clone();
		newPageLI.css('display', 'block');
		newPageLI.find('input').val( 'page'+$('#pages li').size() );
		newPageLI.attr('id', '');
		
		$('ul#pages').append( newPageLI );
		
		
		theInput = newPageLI.find('input');
		
		theInput.focus();
		
		var tmpStr = theInput.val();
		theInput.val('');
		theInput.val(tmpStr);
		
		theInput.keyup( function(){
		
			$('#pageTitle span span').text( $(this).val() )
		
		} )
		
		newPageLI.addClass('active').addClass('edit');
					
		
		//create the page structure
		
		newPageList = $('<ul></ul>');
		newPageList.css('display','block');
		newPageList.attr('id', 'page'+($('#pages li').size()-1) );
		
		$('#pageList > ul').hide();
		$('#pageList').append( newPageList );
		
		
		makeSortable( newPageList );
		
		//draggables
		makeDraggable( '#'+'page'+($('#pages li').size()-1) )
		
		
		//alter page title
		$('#pageTitle span span').text( 'page'+($('#pages li').size()-1) );
		
		$('#frameWrapper').addClass('empty')
		$('#start').fadeIn();
		
		
		//add page to page dropdown
		
		newItem = $('<option value="'+'page'+($('#pages li').size()-1)+'.html">'+'page'+($('#pages li').size()-1)+'</option>')
		
		$('#internalLinksDropdown').append( newItem );
		
		$('select#internalLinksDropdown').selectpicker({style: 'btn-sm ', menuStyle: 'dropdown-inverse'});
		
		//new page added, we've got pending changes
		setPendingChanges(true);
		
	})
	
	
	$('#pages').on('click', 'li:not(.active)', function(){
	
		$('#pageList > ul').hide();
		
		$('#pageList > ul:eq('+($(this).index()-1)+')').show();
		
		pageEmpty();
		
		//draggables
		makeDraggable( '#'+'page'+($(this).index()) )
	
		$('#pages li').removeClass('active').removeClass('edit');
		
		$(this).addClass('active');
		
		$('#pageTitle span span').text( $(this).find('a').text() );
	
	})
	
	
	$('#pages').on('click', 'li.active .fileSave', function(){
	
		//do something
		
		theLI = $(this).closest('li');
								
		if( theLI.find('input').size() > 0 ) {
					
			theLink = $('<a href="#'+theLI.find('input').val()+'">'+theLI.find('input').val()+'</a>');
			
			theLI.find('input').remove();
			
			theLI.prepend( theLink );
			
		}
		
		$('#pages li').removeClass('edit');
	
	});
	
	
	

	//edit page button
	
	$('#pages').on('click', 'li.active .fileEdit', function(){
	
		
		theLI = $(this).closest('li');
	
		newInput = $('<input type="text" value="'+theLI.find('a:first').text()+'" name="page">');
		
		theLI.find('a:first').remove();
		
		theLI.prepend( newInput );
		
		newInput.focus();
		
		var tmpStr = newInput.val();
		newInput.val('');
		newInput.val(tmpStr);
		
		newInput.keyup( function(){
		
			$('#pageTitle span span').text( $(this).val() )
		
		} )
		
		theLI.addClass('edit');
		
		//changed page title, we've got pending changes
		setPendingChanges(true);
	
	})
	
	var theLIIndex;
	
	//delete page button
	$('#pages').on('click', 'li.active .fileDel', function(){
	
		theLIIndex = $(this).parent().parent().index();
		
		$('#deletePage').modal('show');
		
		$('#deletePageCancel').click(function(){
		
			$('#deletePage').modal('hide');
		
		})
		
		$('#deletePage').off('click').on('click', '#deletePageConfirm', function(e){
		
			$('#deletePage').modal('hide');
		
			$('#pages li:eq('+theLIIndex+')').remove();
			
			$('#pageList ul:visible').remove();
			
			//localStorage['seo_'+$('#pageTitle span span').text()]
			localStorage.removeItem('seo_'+$('#pageTitle span span').text());
			//update the page dropdown list
			
			$('select#internalLinksDropdown option:eq('+theLIIndex+')').remove();
			
			$('.link_Tab .dropdown-menu li:eq('+theLIIndex+')').remove();
			
			
			//activate the first page
			
			$('#pages li:eq(1)').addClass('active');
			
			$('#pageList ul:first').show();
			
			$('#pageTitle span span').text( $('#pages li:eq(1)').find('a:first').text() )
			
			
			//draggables
			makeDraggable( '#'+'page1' )
			
			
			//show the start block?
			
			pageEmpty();
			
			allEmpty();
			
			savePage(e);
			
			//page was deleted, so we've got pending changes
			setPendingChanges(true);
			
		
		})
	
	});
	
	
	//content modal, destroy redactor when modal closes
	$('#editContentModal').on('hidden.bs.modal', function (e) {
		
		$('#editContentModal #contentToEdit').redactor('core.destroy');
		
	})
	    
})


function savePage(e) {
	
	closeStyleEditor();
	
	e.preventDefault();
	
	var pix_export = [$('select[name=form_type_export]').val(), 
 						$('input[name=recaptcha]').val(), 
 						$('input[name=to_Email]').val(), 
 						$('input[name=subject]').val(), 
 						$('input[name=MC_APIKEY]').val(), 
 						$('input[name=MC_LISTID]').val(), 
 						$('input[name=CM_APIKEY]').val(), 
 						$('input[name=CM_LISTID]').val(), 
 						$('input[name=GR_APIKEY]').val(), 
 						$('input[name=GR_CAMPAIGN]').val(), 
 						$('input[name=AW_AUTHCODE]').val(), 
 						$('input[name=AW_LISTNAME]').val(), 
				];
	
	localStorage['pix_export'] = JSON.stringify(pix_export);
	//temp_seo =  JSON.parse(localStorage['seo_'+$('#pageTitle span span').text()]);

	//delete all first
	
	for(x=0; x<=99; x++) {
		
		localStorage.removeItem("blocksElement"+x);
		localStorage.removeItem("blocksFrame"+x);
		
	}
	
	localStorage.removeItem("pageNames");
	
	pageCounter = 1;
	
	//frame stuff
	$('#pageList > ul').each(function(){
			
		theName = $(this).attr('id');
		
		var blocksElement = [];
		var blocksFrame = [];
		
		c = 0;
		
		$(this).find('li').each(function(){
			
			blocksElement[c] = $(this).html();
																			
			c++;
			
		})
		
		c = 0;
		
		$(this).find('iframe').each(function(){
			
			var attr = $(this).attr('data-sandbox');

			if (typeof attr !== typeof undefined && attr !== false) {
				
				theContents = $('#sandboxes #'+attr).contents().find( pageContainer );
			
			} else {
				
				theContents = $(this).contents().find( pageContainer );
				
			}
			
			
			//remove .frameCovers
				
			theContents.find('.frameCover').each(function(){
				$(this).remove();
			});
			
			
			//remove inline styling leftovers
			
			for( var key in editableItems ) {
				
												
				theContents.find( key ).each(function(){
					
					
					$(this).removeAttr('data-selector');
					
					if( $(this).attr('style') == '' ) {
						$(this).removeAttr('style')
					}
					
				})
								
			}	
			for (i=0; i<editableContent.length; ++i) {
				
				$(this).contents().find( editableContent[i] ).each(function(){
					
					$(this).removeAttr('data-selector');
					
				})
									
			}
							
			blocksFrame[c] = theContents.html();
																			
			c++;
			
		})
		
		//delete old
		localStorage.removeItem("blocksElement"+pageCounter);
					
		localStorage['blocksElement'+pageCounter] = JSON.stringify(blocksElement);
		localStorage['blocksFrame'+pageCounter] = JSON.stringify(blocksFrame);

		
    	// console.save(localStorage['blocksElement'+pageCounter], 'data1.json');
    	// console.save(localStorage['blocksFrame'+pageCounter], 'data2.json');
    	
    	//console.save(JSON.stringify(localStorage),'project.pixbuilder');


		
		
		pageCounter++;
	
	});
	
	//page names
	
	var pageNames = [];
	
	c = 0;
	
	$('ul#pages li:not(#newPageLI)').each(function(){
		
		pageNames[c] = $(this).find('a').text();
		
		c++;
		
	})
	
	localStorage['pageNames'] = JSON.stringify(pageNames);
	
	setPendingChanges(false)
	
}

(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)

//=======================================================================================================================
// This part of code is licensed to Pixfort.com (http://themeforest.net/user/PixFort) and not allowed to copy or reuse it
function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = $('fileinput').files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	      var contents = e.target.result;
        // alert( "Got the file.n" 
        //       +"name: " + f.name + "n"
        //       +"type: " + f.type + "n"
        //       +"size: " + f.size + " bytesn"
        //       + "starts with: " + contents.substr(1, contents.indexOf("n"))
        // );  
        var data = JSON.parse(contents);
		for (var key in data) {
		  localStorage[key] = data[key];
		}
		window.location.reload(false); 
      }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
  }
//document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
function saveTextAsFile(fileNameToSaveAs, textToWrite) {
    var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
        ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
        ieVer=(ie ? ie[1] : (ie11 ? 11 : -1));

    if (ie && ieVer<10) {
        console.log("No blobs on IE ver<10");
        return;
    }

    var textFileAsBlob = new Blob([textToWrite], {
        type: 'text/plain'
    });

    if (ie || ie11) {
        window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);
    } else {
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";

        if (window.webkitURL !== null) {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        } else {
            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }

        downloadLink.click();
    }
}