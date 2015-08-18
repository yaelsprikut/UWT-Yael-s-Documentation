<h2>A</h2>
<p><a name="A"></a></p>
<ul id="A" class="small-block-grid-1 medium-block-grid-2 large-block-grid-2"></ul>
<h2>B</h2>
<p><a name="B"></a></p>
<ul id="B" class="small-block-grid-1 medium-block-grid-2 large-block-grid-2"></ul>
<h2>C</h2>
<p><a name="C"></a></p>
<ul id="C" class="small-block-grid-1 medium-block-grid-2 large-block-grid-2"></ul>
<script type="text/javascript">// <![CDATA[
$(document).ready(function(){
        $.get("https://test.unitedwaytoronto.org/document.doc?id=311", function(data){
		$agencies = (data);
				  				  				  				  
				  var agencyGroupArray = $agencies.split('###,,,,,,');//split agencies by alphabet
				  var agencyArrayA = (agencyGroupArray[0]).split('%');
				  var text = "";
				  for (i = 0; i < agencyArrayA.length; i++) { 
								text += '<li>' + agencyArrayA[i];
									}
				  document.getElementById("A").innerHTML =(agencyArrayA)
				  document.getElementById("B").innerHTML =(agencyGroupArray[1])
				  document.getElementById("C").innerHTML =(agencyGroupArray[2])
				  
                  console.log(text);
		   
			
});


});
// ]]></script>