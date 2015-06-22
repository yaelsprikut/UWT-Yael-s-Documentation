/*
* A script to read in BBIS gift amount, display a dollar amount and message. Please add <div id="taxCalculator"></div> to DOM.
*/
taxCalculator = {
	/*
	* Inital method called to start application		
	*/
	init : function(taxrates, filelocation){
		// load json object from File
		taxCalculator.model.start(filelocation.bbisDocumentURL);
		// add the proper view to UI
		taxCalculator.addtoUI(taxCalculator.view.markup);
		// starup listeners
		taxCalculator.listeners(taxrates);
	},
	/*
	* Add applicaion markup to a custom element with id of <div id="taxCalculator"></div>
	*/
	addtoUI : function(uiElement){

		//$('#taxCalculator').append(uiElement);
		$('#taxCalculator').html(uiElement);
	},
	/*
	* Add updae UI with savings total
	*/
	updateSavings : function(dollarAmount){
		switch(dollarAmount){
			case 0:
				$('.taxSavings').text('0.00');
			break;
			default:
				$('.taxSavings').text(dollarAmount);
			break;
		}
	},
	/*
	* Add updae UI with message
	*/
	updateStatment : function(message){
		$('.taxStatment').text(message);
	},
	/*
	* Get donation amount from BBIS form inputs
	*/
	listeners : function(taxrates){
		var fieldElm, amount;
		fieldElm = $('[id*="txtAmount"]');
		/*
		* UI events trigger calculation
		*
		* return int and string
		*/
		fieldElm.on('blur', function(){
			amount = $(this).val();
			var dollarAmount = taxCalculator.calculate(taxrates, amount);
			var message = taxCalculator.message(amount);
			taxCalculator.updateSavings(dollarAmount);
			taxCalculator.updateStatment(message);
		});
	},
	/*
	* Read in a float and return a float
	*/
	calculate : function(taxrates, amount){		
		/*
		* Federal Tax Rate + Provincial Tax Rate * total amount donated = cost of gift to donor	
		*/
		// parse tax rates into Fed_max, Fed_min, Gift_ceil, Prov_max, Prov_min;
		Fed_max = taxrates.Fed_max;
		Fed_min = taxrates.Fed_min;
		Gift_ceil = taxrates.Gift_ceil;
		Prov_max = taxrates.Prov_max;
		Prov_min = taxrates.Prov_min;
		
		// Calculate Federal
		var localAmount = parseFloat(amount).toFixed(2);
		
		if( amount > Gift_ceil ){
			taxFed = (( Gift_ceil * Fed_min / 100 ) + ( amount - Gift_ceil ) * (Fed_max / 100)).toFixed(2);
		} 
		else {
			taxFed = (amount * (Fed_min / 100)).toFixed(2);
		}
		
		// Calculate Provincial
		if( amount > Gift_ceil ){
			taxProv = (( Gift_ceil * (Prov_min / 100) ) + ( amount - Gift_ceil) * (Prov_max / 100)).toFixed(2);
		}
		else{
			taxProv = (amount * (Prov_min / 100)).toFixed(2);
		}
		
		// Calculate total tax credits
		taxCreditTot = parseFloat(taxFed) + parseFloat(taxProv);
		
		// Cost of gift
		cost = (amount - taxCreditTot).toFixed(2);
		
		// do not retuen anything other than a num
		switch(cost){
			case 'NaN':
				return 0.00;
			break;
			default:
				return cost;
			break;
		}
	},
	/*
	* Read in a float int and return a string
	*/
	message : function(floatInt){
		// compare a floating point value to ranges and return a message
		var amount = parseFloat(floatInt);
		//if (undefined !== theHref && theHref.length)
			//(amount <= 0 || floatInt.length === 0)
		if(amount <= 0 || floatInt.length === 0){	
		// always return default message for NaN or negative values, I don't like to return undefined.
			return taxCalculator.model.data[0]['message'];
		}
		else{
					
			// iterate over the library		
			for(var i = 0; i < taxCalculator.model.data.length; i++){
						
			var max = parseFloat( taxCalculator.model.data[i]['rangeMax'] );
		    var min = parseFloat( taxCalculator.model.data[i]['rangeMin'] );
			
			// compare floating point value to range min and max
			if( amount >= min && amount <= max ){
			
				return taxCalculator.model.data[i]['message'];
			
			} 
		
		} 
		
		}
	
	},
	/*
	* Closely corresponds to the data found in a JSON file.
	*/
	model : {
		/*
		* Ready the JSON file and attach to window object for parsing. Erros are aleter to UI if load fails.
		*/
		start : function(fileLocation){
			/*
			* A library of messages and range values for use with taxCalculator.js Each object requires message, rangeMax, rangeMin. 
			* All range values (rangeMax and rangeMin) must be a floating point integer.
			*
			* This array of json object contains four objects where the last object range max is empty
			*/
			taxCalculator.model.load(fileLocation);	
		},
		/*
		* Ready the JSON file and attach to window object for parsing. Erros are aleter to UI if load fails. 
		* Data from file is converted to JSON and attached to the window @ givingsearch.model.data - the
		* script will continue.
		*/
		load : function(fileLocation){
			$.get(fileLocation, function(status){
				switch(status){
					case 'error':
						alert('An error occured while loading the json object. Please check path and try again.');
					break;
					case 'failed':
						alert('Failed to load json object. Please check path and try again.');
					break;
					case 'canceled':
						alert('Cancled loading the json object. Please check path and try again.');
					break;
					default:
						// Uncomment for help loading the libaray
						//alert('Loaded json object - ok to move forward.');
						window.taxCalculator.model.data = $.parseJSON(status);
						// load default message
						taxCalculator.updateStatment(taxCalculator.message(0));
					break;
				}
			});	
		}
	},
	/*
	* Add HTML to DOM.
	*/
	view : {
		markup : '<div class="taxSavings">0.00</div><div class="taxStatment"></div>'
		
	}
};