jQuery(document).ready(function($){
var resultSel = $('#result');
var searchSel = $('#search');
$(document).on('keyup', '#search', function(){
  var value = searchSel.val();
  var apiUrl = "https://nominatim.openstreetmap.org/search?q="+ value +"&format=json"
  if(value.trim().length > 3){
    $.ajax({
      url: apiUrl,
      type: 'get',
      contentType: "application/json",
      success: function(resp){
        handleDataResp(resp);
      }
    });
  }
});

$(document).on('click', '.map-list-item', function(){
	var text = $(this).text();
  searchSel.val(text);
});

function handleDataResp(data){
	var listHtml = "";
	if(data && data.length > 0){
  	data.forEach(function(d){
    	listHtml += '<li class="map-list-item">'+ d.display_name +'</li>';
    });
  }
  var finalHtml = '<ul class="map-list">'+ listHtml +'</ul>';
  resultSel.html(finalHtml);
  }
});