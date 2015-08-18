<p>CSV Query Part Goes Here</p>
<table id="query"></table>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script type="text/javascript">// <![CDATA[
$(document).ready(function(){
        $.get("https://test.unitedwaytoronto.org/document.doc?id=305", function(data){
		$nameList = (data);
		
		$nameSplit = $nameList.replace(new RegExp(",", "g"), '<br><br>');
         document.getElementById("query").innerHTML =($nameSplit);
		   
			
});


});
// ]]></script>


var list = 'item1,item2,item3,item4';
list = list.split(',');
list.sort(function() { return 0.5 - Math.random() });
var html = '<ul>';

 for(var i=0; i<list.length; i++) {
    html += '<li>' + list[i] + '</li>';
  }

html += '</ul>';



// New CSV Query Part
<h1 class="red">Emerging Leaders ($1,000 to $1,199)</h1>
<table id="query"></table>

<script type="text/javascript">// <![CDATA[
$(document).ready(function(){
        $.get("https://test.unitedwaytoronto.org/document.doc?id=309", function(data){
		$nameList = (data);
		$nameSplit = $nameList.replace(/[0-9]/g, '');
		var array = $nameSplit.split(',');

		 //$nameSplit = $nameList.replace(/[0-9]/g, '');
		 //$honorRoll = $nameSplit.replace(new RegExp(",", "g"), '<br><br>');
		
			//document.getElementById("query").innerHTML =($honorRoll)
			document.getElementById("query").innerHTML =(array)		
		   
			
});


});
// ]]></script>