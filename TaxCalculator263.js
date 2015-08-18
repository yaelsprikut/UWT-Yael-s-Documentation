/*
* A script to read in BBIS gift amount and display a message. Please add <div id="impactStatment"></div> to DOM.
*/
impactStatment = {
	/*
	* Inital method called to start application		
	*/
	init : function(language, filelocation){
		// load json object from File
		impactStatment.model.start(language, filelocation.bbisDocumentURL);
		// starup listeners
		impactStatment.listeners();
	},
	/*
	* Add applicaion markup to a custom element with id of <div id="impactStatment"></div>
	*/
	addtoUI : function(uiElement){
		$('#impactStatment').html(uiElement);
	},
	/*
	* Add update UI with savings total
	*/
	updateSavings : function(dollarAmount){
		switch(dollarAmount){
			case 0:
				$('.impactAmount').text('0.00');
			break;
			default:
				$('.impactAmount').text(dollarAmount);
			break;
		}
	},
	/*
	* Add update UI with message
	*/
	updateStatment : function(message){
		$('.impactMessage').text(message);
	},
	/*
	* Get donation amount from BBIS form inputs
	*/
	listeners : function(){
		var fieldElm, amount;
		fieldElm = $('[id*="txtAmount"]');
		/*
		* UI events trigger calculation
		*
		* return int and string
		*/
		fieldElm.on('blur', function(){
			amount = $(this).val();
			var dollarAmount = impactStatment.calculate(amount);
			var message = impactStatment.message(amount);
			impactStatment.updateSavings(dollarAmount);
			impactStatment.updateStatment(message);
		});
	},
	/*
	* Read in a int and return a float as string
	*/
	calculate : function(amount){		
		
		var needle = parseFloat(amount);
		// do not return anything other than float as a string
		switch(isNaN(parseFloat(amount)))
		{
			case true :
				return String('0.00');
			break;
			default:
				return String( parseFloat(amount).toFixed(2));
			break;	
		} 
	},
	/*
	* Read in a float int and return a string
	*/
	message : function(floatInt){
		// compare a floating point value to ranges and return a message
		var amount = parseFloat(floatInt);

		//$(".currencySymbol").css( "font-size", "20px" );
		//increase or decrease the size of the number yaelsprikut

		 if(floatInt.length > 2 && floatInt.length <= 4){
			$(".currencySymbol").css( "font-size", "35px" );
			$(".impactAmount").css( "font-size", "35px" );
			$(".taxSavings").css( "font-size", "35px" );
			
		 }else if(floatInt.length >= 5){
			$(".currencySymbol").css( "font-size", "25px" );
			$(".impactAmount").css( "font-size", "25px" ); 
			$(".taxSavings").css( "font-size", "25px" );
		 }else{
			 $(".currencySymbol").css( "font-size", "45px" );
			 $(".impactAmount").css( "font-size", "45px" );
			 $(".taxSavings").css( "font-size", "45px" );
		 }

		
		
		// always return default message for NaN or negative values, I don't like to return undefined.
		if(amount <= 0 || floatInt.length == 0){	
			return impactStatment.model.data[0]['message'];
		}
		else{
					
			// iterate over the library		
			for(var i = 0; i < impactStatment.model.data.length; i++){
						
			var max = parseFloat( impactStatment.model.data[i]['rangeMax'] );
		    var min = parseFloat( impactStatment.model.data[i]['rangeMin'] );			
			
			// compare floating point value to range min and max
			if( amount >= min && amount <= max ){
			
				return impactStatment.model.data[i]['message'];
			
			} 
		
		} 
		
		}
	
	},
	/*
	* Closely corresponds to the data found in a JSON file and Language passed at runtime.
	*/
	model : {
		/*
		* Ready the JSON file and attach to window object for parsing. Erros are aleter to UI if load fails.
		*/
		start : function(language, fileLocation){
			/*
			* A library of messages and range values for use with impactStatment.js Each object requires message, rangeMax, rangeMin. 
			* All range values (rangeMax and rangeMin) must be a floating point integer.
			*
			* This array of json object contains four objects where the last object range max is empty
			*/
			impactStatment.model.load(fileLocation);
			
			/*
			* An object passed at runtime to the start method and used to provide langauge options to impactStatment.js 
			* All options (language) are attached to the window object for use.
			*
			* The language options are in the window.impactStatment.language.<langage.need>
			*/	
			impactStatment.model.language(language);
		},
		/*
		* Ready the language options, please and thank you.
		*/
		language : function(language){
			//The language options are in the window.impactStatment.language.<langage.need>	
			impactStatment.language = impactStatment.language || {};
			
			// Add options
			impactStatment.language = language;
			
			// Langauge ready, call view
			impactStatment.view.init();
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
						window.impactStatment.model.data = $.parseJSON(status);
						// load default message
						impactStatment.updateStatment(impactStatment.message(0));
					break;
				}
			});	
		}
	},
	/*
	* Add HTML to DOM.
	*/
	view : {
		/*
		* Initial method called to after start application and languages added to window object.	
		*/
		init : function(){
			// Var to hold the fisrt view, only one view.
			var view = impactStatment.view.build();
			// add the proper view to UI
			impactStatment.addtoUI(view);
		},
		/*
		* Join the data from the model (langages) with the markup ( aka HTML).
		*/
		build : function(){
			var markup = '<div class="impactHeading">'+window.impactStatment.language.heading+'</div><div class="impactAmountContainer"><span class="currencySymbol">'+window.impactStatment.language.currencySymbol+'</span><span class="impactAmount">0.00</span></div><div class="impactMessage"></div>';
			return markup;	
		}
	}
};