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
Date: August 20, 2015 (Test Environment)
**********************************************/

BBI = {
	UWT: {
		bbis: {
			pageLoad: function() {},
			paneRefresh: function() {
				//BBI.UWT.bbis.orderQuery();
				BBI.UWT.bbis.siteMap();
				BBI.UWT.bbis.commPreference();
				BBI.UWT.bbis.administration.fixAdminMenuPos(); 
				BBI.UWT.bbis.foundation.overrideFoundation(); 
				BBI.UWT.bbis.foundation.fixFoundation(); 
				BBI.UWT.bbis.foundation.orbitSlideshow(); 
				BBI.UWT.bbis.foundation.FoundationAccordion();
				BBI.UWT.bbis.parts.quickSearch();
				BBI.UWT.bbis.parts.donationForm.init();
				BBI.UWT.bbis.parts.showPartTitle();
				BBI.UWT.bbis.parts.eventRegistration();
				BBI.UWT.bbis.parts.documents(); //responsible for the news release part 
				BBI.UWT.bbis.smartMenus();
				BBI.UWT.bbis.clone.sidebar();				
			},

			siteMap: function() {
				//append Full Menu part to body
				var $siteMapURL = location.pathname;
				if ($siteMapURL == '/site-map'){
					//alert("You are in site map!");
					$('#landingcontent ul, #landingcontent li').removeClass();

				}
				
			},
			orderQuery: function() {
				//get all the search value results and sort them alphabetically
				var $queryTable = $(".BBDesignationSearchResult").text();
				//console.log(queryTable);
		
				 var $queryTableArray = [];
					//put all HTML elements into an array
					 (function(){
						 var $queryTable = $(".BBDesignationSearchResult");//this will affect the CSV container part
						 for (var i = 0; i < $queryTable.length; i++) {
							 $queryTableArray.push($queryTable[i].innerText + "<br><br>");
						 }
					 })();
					 $queryTableArray.sort();
					 //sorts the query by last name
					 function compare(a, b) {
							var splitA = a.split(" ");
							var splitB = b.split(" ");
							var lastA = splitA[splitA.length - 1];
							var lastB = splitB[splitB.length - 1];

							if (lastA < lastB) return -1;
							if (lastA > lastB) return 1;
							return 0;
						}

						var $sorted = $queryTableArray.sort(compare);
					  //console.log($sorted);
					 //console.log($queryTableArray);
					 $(".BBDesignationSearchResult").remove();
					 $(".BBDesignationSearchResultContainer").append($queryTableArray);			

	
			},
			commPreference: function() {
				//hide Global Opt Out 
				$('div[id *= "S1_GLOBALOPTOUTPREFERENCE_commPrefs_cont"]').hide();
				$('input[id$="S1_GENERALCORRESPONDENCE_commPrefs_rptPrefs_cbOptIn_0"]').attr('style', '-webkit-transform: scale(2); -ms-transform: scale(2);-moz-transform: scale(2);');
				$('input[id$="S1_APPEALPREFERENCE_M_600ed16ef3594bdf89d8f6b3b2bd5329_commPrefs_rptPrefs_cbOptIn_0"]').attr('style', '-webkit-transform: scale(2); -ms-transform: scale(2);-moz-transform: scale(2);');
				$('div[id$="header"]').attr('style', 'padding-bottom: 30px; font-weight:bold');
				
				//check General checkbox if unchecked
				if($("#S1_GENERALCORRESPONDENCE_commPrefs_rptPrefs_cbOptIn_0").prop('checked') == false){
					document.getElementById("S1_GENERALCORRESPONDENCE_commPrefs_rptPrefs_cbOptIn_0").checked = true;
				}
				
				$(window).resize(function(){
					if ($(window).width() <= 800){	
						//$('div[id$="Column1Div"]').remove();
						$unsubscribeMe = $('span[id *= "S1_GENERALCORRESPONDENCE_commPrefs_rptPrefs_lblCommunication"]');
						$yourAddress = $('span[id *= "S1_GENERALCORRESPONDENCE_commPrefs_rptPrefs_lblSendTo"]');
						$unsubscribeMe.hide();
						$yourAddress.hide();
						
						$labelA = $('label[for$="S1_GENERALCORRESPONDENCE_commPrefs_rptPrefs_cbOptIn_0"]');
						$labelB = $('select[id$="S1_GENERALCORRESPONDENCE_commPrefs_rptPrefs_ddDeliveryMethod_0"]');
						$submitBtn = $('input[id$="PC4005_ctl00_L_F1_W_finishWizardButton"]');
						
						$labelA.attr('style','position: relative;right: 25px;font-weight: bold;font-size: 13pt;');
						$labelB.attr('style','position: relative;top: 35px;right: 402px;width: 120%;');
						$submitBtn.attr('style', 'position: relative; top: 20px; right: 400px;font-size: large;');
						
						//DM comm preference
						$labelC = $('label[for$="S1_APPEALPREFERENCE_M_600ed16ef3594bdf89d8f6b3b2bd5329_commPrefs_rptPrefs_cbOptIn_0"]');
						$labelD = $('select[id$="S1_APPEALPREFERENCE_M_600ed16ef3594bdf89d8f6b3b2bd5329_commPrefs_rptPrefs_ddDeliveryMethod_0"]');
						$submitBtnTwo = $('input[id$="PC4057_ctl00_L_F1_W_finishWizardButton"]');
						
						$labelC.attr('style','position: relative;right: 25px;font-weight: bold;font-size: 13pt;');
						$labelD.attr('style','position: relative;top: 35px;right: 402px;width: 120%;');
						$submitBtnTwo.attr('style', 'position: relative; top: 20px; right: 400px;font-size: large;');
						var linebreak = document.createElement("br");
						$('.bbformbuilder-form-part').append(linebreak);
						
						
					}	
				});
				
			},
			administration: {
				// Fix positioning of the part menus 
				fixAdminMenuPos: function() {
					
					$('div[id *= "_panelPopup"]').appendTo('body');
					//$("tr.pane11_ctl01_trInsertAfter").removeAttr(".donatebtn a");
					$('div[id *= "_designPaneCloak"]').css({
						"top": "0px",
						"left": "0px"
					});
					$('.DesignPane').css("position", "relative");
					//$('.DesignPane').addClass("DesignMenuTable");
					//pane12_ctl01_tbdPartMenu	
					
					/*
					$('div[id *= "pane18_ctl01_panelPopup"]').appendTo('footer');
					$('div[id *= "pane19_ctl01_panelPopup"]').appendTo('footer');
					$('div[id *= "pane20_ctl01_panelPopup"]').appendTo('footer');
					$('div[id *= "pane21_ctl01_panelPopup"]').appendTo('footer');
					*/
					
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
							$('td.BBListingHeading').append('<hr class="underline" />');/*block element hr for headings yaelsprikut*/
							$('td.DonationRequiredFieldMarker, td.DonationCaptureRequiredFieldMarker').closest('tr').addClass('hasRequired');
							$('label[for$="DonationCapture1_AddressCtl_dd_StateUS"]').closest('tr').addClass('hasRequired'); //this changes the state class 						
							$('span.DonationFormTable_DonationPanel_SymbolLabel').closest('tr').addClass('hasRequired');//this changes the amount class
							$('label[for$="DonationCapture1_cboMonth"]').closest('tr').removeClass('DonationCaptureRequiredFieldMarker');
							$('td.DonationFieldControlCell:first-child').attr('width', '300'); //expands the first td in the radio button donation cells yaelsprikut
							$('input[id$="PC3975_txtAmount"]').attr('style', 'width: 78px');
							$('input[id$="PC4143_txtAmount"]').attr('style', 'width: 100px');
							var $URL = location.pathname;
							if ($URL == '/wggdonate'){								
									$('td.vaBottom').attr('style', 'color:black');								
								}	
							if($URL == '/makemygift'){
									$('input[id$="PC4143_btnNext"]').attr('value', 'Submit Donation');
							}
							//attach new image to security code png
							var oldSrc = 'images/help-32_1.gif';
							var newSrc = 'http://test.unitedwaytoronto.org/image/mainwebsite/x_common/logos-and-icons/Question-mark-Icon-2.png';
							$('img[src="' + oldSrc + '"]').attr('src', newSrc);
							$('img[src="' + newSrc + '"]').attr('style', 'padding-top: 5px;border: 0;');
							
							//$('label[for$="DonationCapture1_cboMonth"]').closest('tr').addClass('hasRequiredNarrow');
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
						$('td.BBListingHeading').append('<hr class="underline" />');/*block element hr for headings yaelsprikut*/
						$('hr.underline').attr('style', 'position:relative; bottom:30px');
						$('td.DonationCaptureFieldControlCell, td.DonationCaptureFieldCaption').closest('tr').addClass('hasRequired');
						$('td.EventItemRegistrantControlCell').closest('tr').addClass('hasRequired');
						//EventItemRegistrantSelectList
						$('select.EventItemRegistrantSelectList').closest('tr').addClass('hasRequired');
						//DonationCaptureFieldControlCellAmount remove required over the amount 
						$('td.DonationCaptureFieldControlCellAmount').closest('tr').removeClass('hasRequired');
						$('.EventTable .BBFormSubmitButton').parent().closest('table').addClass('buttonsTable');
						
						//attach new image to security code png
							var oldSrc = 'images/help-32_1.gif';
							var newSrc = 'https://test.unitedwaytoronto.org/image/mainwebsite/x_common/logos-and-icons/Question-mark-Icon-2.png';
							$('img[src="' + oldSrc + '"]').attr('src', newSrc);
							$('img[src="' + newSrc + '"]').attr('style', 'padding-top: 5px;border: 0;');
					}
				},
				// modify the quick search part
				quickSearch: function() {
					// Do we have a quick serach part on the page?
					if ($('.QuickSearchFormTable').length >= 1) {
						
						// Make the quick search look nice!
						$('.QuickSearchTextbox').attr('placeholder', 'Search');
						
							 $('input,textarea').focus(function(){
   							 $(this).removeAttr('placeholder');
							 });
							 //make the placeholder reappear when click away
							 $('input,textarea').blur(function(){
   							 $('.QuickSearchTextbox').attr('placeholder', 'Search');
							 });
						
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
				$(".selected").removeAttr("href"); //this prevents the page for re-loading 
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