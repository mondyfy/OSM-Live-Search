jQuery(document).ready(function($) {
  var searchSel = $('#search');
  $(document).on('keyup', '#search', function() {
    var value = searchSel.val();
    var apiUrl =
      'https://nominatim.openstreetmap.org/search?q=' + value + '&format=json';
    if (value.trim().length === 0) {
      var resultSel = $('.osm-location-picker-result');
      resultSel.remove();
    } else {
      $.ajax({
        url: apiUrl,
        type: 'get',
        contentType: 'application/json',
        success: function(resp) {
          removeResult();
          var value = searchSel.val();
          if (value.trim().length > 0 && resp.length > 0) {
            handleDataResp(resp);
          }
        }
      });
    }
  });

  $(document).on('click', '.map-list-item', function() {
    var text = $(this).data('text');
    searchSel.val(text);
    removeResult();
  });

  function removeResult() {
    var resultSel = $('.osm-location-picker-result');
    resultSel.remove();
  }

  function handleDataResp(data) {
    var listHtml = '';
    if (data && data.length > 0) {
      data.forEach(function(d) {
        var iconHtml = '⚐&nbsp;';

        listHtml +=
          '<li class="map-list-item" data-text="' +
          d.display_name +
          '">' +
          iconHtml +
          d.display_name +
          '</li>';
      });
    }
    var finalHtml = '<ul class="map-list">' + listHtml + '</ul>';

    searchSel.after('<div class="osm-location-picker-result"></div>');
    var resultSel = $('.osm-location-picker-result');
    resultSel.html(finalHtml);
  }
});
