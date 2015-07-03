/**********************************************
Blackbaud Design Custom JavaScript
***********************************************
Client: United Way Toronto
Author(s): Harrison DeStefano
Product(s): BBIS
Created: Feb 18, 2014
Updated:
***********************************************
CHANGE LOG
***********************************************
May 14, 2014
Linda Brennan
Added Fotorama image slider plugin
Used in Annual Report microsite  photo essays

EDIT: Yael Sprikut
Date: June 9, 2015
**********************************************/

BBI = {
	UWT: {
		bbis: {
			pageLoad: function() {},
			paneRefresh: function() {
				BBI.UWT.bbis.createFooter();
				//BBI.UWT.bbis.administration.fixAdminMenuPos(); 
				BBI.UWT.bbis.foundation.overrideFoundation(); 
				BBI.UWT.bbis.foundation.fixFoundation(); 
				BBI.UWT.bbis.foundation.orbitSlideshow(); 
				BBI.UWT.bbis.foundation.FoundationAccordion();
				BBI.UWT.bbis.parts.emailSignup();
				BBI.UWT.bbis.parts.quickSearch();
				BBI.UWT.bbis.parts.donationForm.init();
				BBI.UWT.bbis.parts.showPartTitle();
				BBI.UWT.bbis.parts.eventRegistration();
				BBI.UWT.bbis.parts.documents();
				BBI.UWT.bbis.smartMenus();
				BBI.UWT.bbis.clone.sidebar();				
			},
			createFooter: function() {
				//alert("Hello! createFooter works!");
				//var scripts = document.getElementsByTagName("script");
				//console.log(scripts);
				//var footer = document.createElement("footer");
				//$('<div>footer</div>').appendTo('body');
				//console.log(footer);
				//$('body').append(footer);
				//$('html').append(footer);
				//$( ".bb_mainMenu" ).remove();	
				
			},
			administration: {
				// Fix positioning of the part menus
				//this function seems to position the part menus in the corner of the webpage because it specifies the position as 0px for both top and left 
				fixAdminMenuPos: function() {
					$('div[id *= "_panelPopup"]').appendTo('body');
					$('div[id *= "_designPaneCloak"]').css({
						"top": "0px",
						"left": "0px"
					});
					$('.DesignPane').css("position", "relative");
				}
			},
			clone: {
				// create copy of the sidebar content for mobile
				sidebar: function() {
					// vars to store our goodies
					var dropSpot, elms;
					// get append location and elms
					dropSpot = $('#landingcontent');
					elms = $('.sidebar .hide-for-small-only').not('#leftnav').children();
					if (elms.length > 0 && dropSpot.length == 1) {
						// iterate over elms and append
						elms.each(function() {
							var html = $(this).html();
							$('<div class="show-for-small-only small-12 columns cloned">' + html + '</div>').appendTo(dropSpot);
						});
					}
				}
			},
			foundation: {
				// Add missing dom elms
				fixFoundation: function() {
					// Add html5 elm
					$('.smallnav').wrap('<aside class="left-off-canvas-menu show-for-medium-down"></aside>');
					// Add off-canvase close
					$('<a class="exit-off-canvas"></a>').insertAfter($('#footer2'));
					// trigger off-canvas
					$('#menubtn, .exit-off-canvas').click(function() {
						// Toggle css class to display the menu
						$('.off-canvas-wrap').toggleClass('move-right');
					});
					// Toggle off canvas for IE
					if (navigator.userAgent.indexOf('MSIE') != -1) {
						// toggle class to hide / show off camvas
						$('.left-off-canvas-toggle').on('click', function() {
							// aside
							$('.left-off-canvas-menu').toggleClass('left-off-canvas-toggle-IE');
							// page wrap
							$('.left-off-canvas-menu').siblings().toggleClass('left-off-canvas-toggle-inner-IE');
						});
						// do we need to add the fix on load?
						if (viewport <= 1024 && !$('body').hasClass(fix)) {
							// add class to body
							$('body').addClass(fix);
						}
						window.onresize = function(event) {
							var viewport = $(window).width();
							var breakPoint = 1024;
							var fix = 'ie-foundation-fix';
							if (viewport <= breakPoint && !$('body').hasClass(fix)) {
								// add class to body
								$('body').addClass(fix);
							} else if (viewport > breakPoint && $('body').hasClass(fix)) {
								// add class to body
								$('body').removeClass(fix);
							}
						}
					}
				},
				// make an orbit slideshow
				orbitSlideshow: function() {
					// run obrbit with our jquery no-conflict eg., $$
					if ($$('#slideshow ul li img').length > 0) {
						Foundation.libs.orbit.init();
					}
					// trigger resize event forcing orbit to recalculate
					$(window).triggerHandler('resize');
				},
				// make an Accordion
				FoundationAccordion: function() {
					$(".selected").removeAttr("href"); //this prevents the page for re-loading 
					//$("a.selected.has-submenu").attr("href", "");
					//$("a.selected.has-submenu.highlighted").attr("href", "");

					
					$(document).foundation({
					  accordion: {
					    // specify the class used for active (or open) accordion panels
					    active_class: 'active',
					    // allow multiple accordion panels to be active at the same time
					    multi_expand: false,
					    // allow accordion panels to be closed by clicking on their headers
					    // setting to false only closes accordion panels when another is opened
					    toggleable: true
						
					  }
					});

				},
				// Remove foundation classes in edit view
				overrideFoundation: function() {
					if (window.location.href.match('templatedesigner') || window.location.href.match('pagedesign')) {
						$('.pagecontainer div').each(function() {
							// Remove hide for medium
							if ($(this).hasClass('hide-for-medium-only')) {
								$(this).removeClass('hide-for-medium-only');
							}
							// Remove hide for medium down
							if ($(this).hasClass('hide-for-medium-down')) {
								$(this).removeClass('hide-for-medium-down');
							}
							// Remove show for large up
							if ($(this).hasClass('show-for-large-up')) {
								$(this).removeClass('show-for-large-up');
							}
							// Remove hide for small only
							if ($(this).hasClass('hide-for-small-only')) {
								$(this).removeClass('hide-for-small-only');
							}
							// Remove hide medium
							if ($(this).hasClass('hide-for-medium-down')) {
								$(this).removeClass('hide-for-medium-down');
							}
						});
					}
				}
			},
			parts: {
				// modify the documents part
				documents: function() {
					if ( $('.BBDocumentFormTable').length >= 1) {
						if (window.location.href.match('pagedesign') === null) {	
							// Hide creator name and date
							$('[id*="pnlDocList"] .BBDocumentFormTable tr:gt(2) td').each( function(){
								var item = $(this);
								var index = item.index();
								// iterate over collection 
								if( index === 1 || index === 2){
									// do not modify required empty td
									if( item.text().length !== 0)
									{
										item.addClass('adminInfo');
									}
								}	
							});
							// Check for admin by searching for delete option
							if($('[id*="rpFileList_btnDelete"]').length >= 1){
								$('.BBDocumentFormTable').addClass('admin');	
							}
						}
						// Show the documents part
						$('.BBDocumentFormTable').addClass('complete');	

						//place for the document update timestamp	
						var timestamp = document.createElement("label");
						timestamp.textContent = "Last updated: " + document.lastModified;
						$('.BBDocumentFormTable').append(timestamp);
					}
				},
				// modify donation form
				donationForm: {
					// run donation form methods if form on page
					init: function() {
						// Do we have a donation form part on the page?
						if ($('.DonationFormTable').length >= 1) {
							// what to run
							BBI.UWT.bbis.parts.donationForm.requiredFieldMarkers();
							BBI.UWT.bbis.parts.donationForm.olderCustomizaionScript();
						}
					},
					// add for class for required fields makers, used with small device media query
					requiredFieldMarkers: function() {
						// Do we have a donation form part on the page?
						if ($('.DonationFormTable').length >= 1) {
							// add a class to all mandatory tr
							$('td.DonationRequiredFieldMarker, td.DonationCaptureRequiredFieldMarker').closest('tr').addClass('hasRequired');
							$('label[for$="DonationCapture1_AddressCtl_dd_StateUS"]').closest('tr').addClass('hasRequired'); //this changes the state class 						
							$('span.DonationFormTable_DonationPanel_SymbolLabel').closest('tr').addClass('hasRequired');//this changes the amount class
							$('label[for$="DonationCapture1_cboMonth"]').closest('tr').removeClass('DonationCaptureRequiredFieldMarker');
							//document.getElementById("divModalPage").css( "position", "fixed" );
			
							//$('label[for$="DonationCapture1_cboMonth"]').closest('tr').addClass('hasRequiredNarrow');
							//$('td.DonationCaptureSelectListNarrow').closest('tr').addClass('hasRequired');
							//$('td.DonationCaptureFieldControlCell').closest('tr').addClass('hasRequired'); //this causes all the fields to be required but also changes state
							//$('label[for$="txtAmount"]').closest('tr').addClass('hasRequired');
						}
					},
					// add custom text to donation by passing the text, lable and method. The label text must be an exact match
					olderCustomizaionScript: function() {
						//===Form element re-order
						var $targetRow = $('label[for$="txtCSC"]').closest('tr');
						var $privacy = $('label[id$="529"]').closest('tr');
						var $reminder = $('label[id$="523"]').closest('tr');
						var $annualReminder = $('label[id$="576"]').closest('tr');
						var $howRecognized = $('label[id$="558"]').closest('tr');
						var $company = $('label[id$="577"]').closest('tr');
						var $recognizedOption = $('label[id$="571"]').closest('tr');
						$targetRow.after($privacy);
						$targetRow.after($company);
						$targetRow.after($annualReminder);
						$targetRow.after($reminder);
						$targetRow.after($howRecognized);
						$targetRow.after($recognizedOption);
						//Add class to each row
						($privacy).addClass('attributeBlock');
						($company).addClass('attributeBlock');
						($reminder).addClass('attributeBlock');
						($annualReminder).addClass('attributeBlock');
						($howRecognized).addClass('attributeBlock Duo2');
						($recognizedOption).addClass('attributeBlock Duo1');
						//Break custom attributes out of form for special styling
						$('.DonationFormTable').after('<table class="formSubmit" />');
						$('.DonationFormTable tbody:last').appendTo('.formSubmit');
						$('.formSubmit').before('<table class="attributeBlockTable"><tbody></tbody></table>');
						$('.attributeBlock').each(function() {
							$(this).appendTo('.attributeBlockTable');
						});
						//Convert new tables to divs
						$('table.attributeBlockTable').each(function() {
							$(this).replaceWith($(this).html().replace(/<tbody/gi, "<div class='BBFormGroup'").replace(/<tr/gi, "<div").replace(/<th/gi, "<div").replace(/<td/gi, "<div").replace(/<\/th>/gi, "</div>").replace(/<\/td>/gi, "</div>").replace(/<\/tr>/gi, "</div>").replace(/<\/tbody/gi, "<\/div"));
						});
						//Setting select values to YES
						$('.attributeBlock select.LoginFormSelectList').val('Yes');
						$('select[id$="571"]').val(' ');
						//Overiding forms that place a 'please select' option as first option
						$('select[id$="571"] option:first').val(' ');
						$('select[id$="571"] option:first').text(' ');
						//Defaulting country selection to Canada
						//$("select[id$='dd_Country'] option").removeAttr("selected");
						//$("select[id$='dd_Country'] option[value='Canada']").attr("selected","selected");
						//$("select[id$='dd_Country']").change();
						//function blurEffect() {
						//$('textarea[id$="AddressLine"]').blur();
						//}
						//var timeoutID = window.setTimeout(blurEffect, 500);
						//Input long labels and style inputs
						$('label[id$="571"]').before($('.leadershipDonorText').html());
						$('input[id$="1563"]').closest('td').css('paddingTop', '50px');
						$('label[id$="577"]').before($('.companyCampaign').html());
						$('input[id$="577"]').closest('td').css('paddingTop', '65px');
						$('select[id$="576"]').closest('td').css('paddingTop', '20px');
						$('select[id$="529"]').closest('td').css('paddingTop', '20px');
						$('label[id$="523"]').html($('.corpPreferences').html());
						//Show long label FTI part in edit mode
						if (window.location.href.match('edit=')) {
							$('donationFormLongText').css('display', 'block');
						}
					},
				},
				// modify the event reg
				eventRegistration: function() {
					if ($('.EventTable').length >= 1) {
						// add classes to make styling easy, please (added Required Field YS)
						// table that contains prev and next buttons
						$('td.DonationCaptureFieldControlCell, td.DonationCaptureFieldCaption').closest('tr').addClass('hasRequired');
						$('td.EventItemRegistrantControlCell').closest('tr').addClass('hasRequired');
						//EventItemRegistrantSelectList
						$('select.EventItemRegistrantSelectList').closest('tr').addClass('hasRequired');
						//DonationCaptureFieldControlCellAmount remove required over the amount 
						$('td.DonationCaptureFieldControlCellAmount').closest('tr').removeClass('hasRequired');
						$('.EventTable .BBFormSubmitButton').parent().closest('table').addClass('buttonsTable');
					}
				},
				emailSignup: function(){
					//alert("this function runs!");
					
				},
				// modify the quick search part
				quickSearch: function() {
					// Do we have a quick serach part on the page?
					if ($('.QuickSearchFormTable').length >= 1) {
						
						// Make the quick search look nice!
						$('.QuickSearchTextbox').attr('placeholder', 'Search');
						
						// if($('input, textarea').focus()){
							// $(this).removeAttr('placeholder');
						// } else if ($('input, textarea').blur()){
							// $(this).attr('placeholder');
						// }
							 $('input,textarea').focus(function(){
   							 $(this).removeAttr('placeholder');
							 });
							 //make the placeholder reappear when click away
							 $('input,textarea').blur(function(){
   							 $('.QuickSearchTextbox').attr('placeholder', 'Search');
							 });
							
							
							
							// $('input,textarea').blur(function(){
   							// $(this).attr('placeholder');
							// });
						
						$('table.QuickSearchFormTable').attr('cellspacing', '0');
					}
				},
				// display a part title in admin
				showPartTitle: function() {
					// Inform the user that Javascript code is present,
					// Must include "javascript" in the part title:
					if (window.location.href.match('pagedesign') !== null) {
						$('td[id$="tdPartName"]:Contains("customization")').each(function() {
							var uniqueID = $(this).attr("id");
							uniqueID = uniqueID.slice(0, uniqueID.length - 11);
							var partName = $(this).html();
							var contentPane = $('div[id*="' + uniqueID + '_pnlPart"]');
							contentPane.append('<div class="jsPartLabel" style="padding:0 4px 0 24px;background:#000;color:#fff;font-size:11px;">' + partName + '</div>');
						});
					}
				}
			},
			smartMenus: function() {
				if ($('.main-menu').length >= 1) {
					$('.main-menu').smartmenus();
				}
				// Trigger click events to show selected menu items (mobile)
				//$('#menubtn').click( function(){
				// setTimeout(function(){ $('.smallnav .main-menu li.parent.selected:first a.has-submenu').click();}, 200);
				//});
				// Trigger client event to show selected menu items (left nav)
				setTimeout(function() {
					$('#leftnav ul li.parent.selected').children('a').click();
				}, 200);
			}
		}
	} // end UWT
}; // end BBI
/*
===================================================
Run Global Functions
---------------------------------------------------
Default load methods to be used inside BBNC:
* Sys.WebForms
Event raised after all content on the page is
refreshed or loaded after postback. Can be
add_pageLoaded () or remove_pageLoade();

Alternative load methods to be used outside BBNC:
* $(window).load();
Triggered after the window is loaded

* $(document).ready();
Triggered after all assets completely received.
---------------------------------------------------
*/
// Functions to run each time the page loads
$(document).ready(function() {
	BBI.UWT.bbis.pageLoad();
});
// Functions to run each time the pane is refreshed
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function() {
	BBI.UWT.bbis.paneRefresh();
});
/*
===================================================
CLIENT PLUGINS

---------------------------------------------------
Plugin Name: jQuery 1.11.0
Description: put jQuery in no-conflict mode immediately
URI: http://jquery.com/
---------------------------------------------------
*/
document.write('<script src="document.doc?id=17"></script>');
var $$ = jQuery.noConflict();
/*---------------------------------------------------
Plugin Name: Foundation
Description: Foundation Responsive Framework
URI: foundation.zurb.com/
---------------------------------------------------
*/
document.write('<script src="document.doc?id=19"></script>');
/*

---------------------------------------------------
Plugin Name: SmartMenus
Description: jQuery plugin for responsive menu
URI: http://www.smartmenus.org/
---------------------------------------------------
*/
document.write('<script src="document.doc?id=26"></script>');
/*
---------------------------------------------------
Plugin Name: Respond.js
Description: JavaScript polyfill for IE8 to use media queries
URI: https://github.com/scottjehl/Respond
---------------------------------------------------
*/
document.write('<script src="document.doc?id=21"></script>');
/*
---------------------------------------------------
Plugin Name: REM.js
Description: JavaScript polyfill for IE8 to use REM units
URI: https://github.com/chuckcarpenter/REM-unit-polyfill
---------------------------------------------------
*/	
document.write('<script src="document.doc?id=20"></script>');
/*
---------------------------------------------------
Plugin Name: Fotorama
Description: jQuery plug-in image slideshow with thumbnails
URI: http://fotorama.io/
---------------------------------------------------
*/
document.write('<script src="document.doc?id=41"></script>');
/*
---------------------------------------------------
Plugin Name: Foundaiton 5 Accordion
Description: Foundaiton plug-in for accordion
URI: http://foundation.zurb.com/docs/components/accordion.html
---------------------------------------------------
*/
document.write('<script src="document.doc?id=33"></script>');

// Case insensitive version of ':contains()'
jQuery.expr[':'].Contains = function(a, i, m) {
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};