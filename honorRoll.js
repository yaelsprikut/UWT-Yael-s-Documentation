/* this is the honour roll part that works specifically with a CSV file */



<h1 class="red">Emerging Leaders ($1,000 to $1,199)</h1>
<hr />
<div class="honourroll"><a name="A"></a>
<h2>A</h2>
<ul id="A" class="twocolumn">&nbsp;</ul>
<h2>B</h2>
<ul id="B" class="twocolumn">&nbsp;</ul>
<h2>C</h2>
<ul id="C" class="twocolumn">&nbsp;</ul>
<script type="text/javascript">// <![CDATA[
$(document).ready(function(){
        $.get("https://test.unitedwaytoronto.org/document.doc?id=309", function(data){
		$nameList = (data);
		$nameSplit = $nameList.replace(/[0-9]/g, '');
                $honorRoll = $nameSplit.replace(new RegExp(",", "g"), '<li>');
                $honorRoll.replace(/[0-9]/g, '');
				var honorRollArray = $honorRoll.split('###'); 
		

                  document.getElementById("A").innerHTML =(honorRollArray[0])
                  document.getElementById("B").innerHTML =(honorRollArray[1])
                  document.getElementById("C").innerHTML =(honorRollArray[2])
                  console.log(honorRollArray);

		   
			
});


});
// ]]></script>
<a style="float: right; font-size: 0.75em; color: #000; text-decoration: none; font-weight: bold;" href="#top">Back to top</a><br />
<p>&nbsp;</p>
</div>









<script src="scripts/jquery.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>






<h1 class="red">Emerging Leaders ($1,000 to $1,199)</h1>
<hr />
<div class="honourroll"><a name="A"></a>
<ul id="list" class="twocolumn">&nbsp;</ul>
<script type="text/javascript">// <![CDATA[
$(document).ready(function(){
        $.get("https://test.unitedwaytoronto.org/document.doc?id=309", function(data){
		$nameList = (data);
		var nameListArray = $nameList.split(',');

		document.getElementById("list").innerHTML =(nameListArray)
		console.log(nameListArray);




		   
			
});


});
// ]]></script>
<a style="float: right; font-size: 0.75em; color: #000; text-decoration: none; font-weight: bold;" href="#top">Back to top</a><br />
<p>&nbsp;</p>
</div>





































