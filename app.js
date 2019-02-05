(function() {
  var searchSel;
  $.fn.OsmLiveSearch = function() {
    searchSel = this;
    searchSel.addClass('osm-location-picker');
    $(document).on('keyup', searchSel, function() {
      var value = searchSel.val();
      var apiUrl =
        'https://nominatim.openstreetmap.org/search?q=' +
        value +
        '&format=json';
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
              handleDataResp(resp, value);
            }
          }
        });
      }
    });
  };

  $(document).on('click', '.map-list-item', function() {
    var text = $(this).data('text');
    searchSel.val(text);
    removeResult();
  });

  function removeResult() {
    var resultSel = $('.osm-location-picker-result');
    resultSel.remove();
  }

  function handleDataResp(data, searchText) {
    var listHtml = '';
    if (data && data.length > 0) {
      data.forEach(function(d) {
        var finalText = formatResultText(d.display_name, searchText);
        if (finalText) {
          var iconHtml = '⚐&nbsp;';

          listHtml +=
            '<li class="map-list-item" data-text="' +
            d.display_name +
            '">' +
            iconHtml +
            finalText +
            '</li>';
        }
      });
    }
    var finalHtml = '<ul class="map-list">' + listHtml + '</ul>';

    searchSel.after('<div class="osm-location-picker-result"></div>');
    var resultSel = $('.osm-location-picker-result');
    resultSel.html(finalHtml);
  }

  function formatResultText(text, searchText) {
    var textArr = text
      .replace(/,/g, ' ')
      .split(/\s/g)
      .filter(function(t) {
        return t.trim() != '';
      });
    var finalTextArr = [];
    console.log(textArr);
    textArr.forEach(function(word) {
      var wordArr = word
        .trim()
        .toLowerCase()
        .split(searchText);
      var boldText = wordArr.join('<b>' + searchText + '</b>');
      finalTextArr.push('<span class="result-text">' + boldText + '</span>');
    });
    if (finalTextArr.length === 0) {
      return null;
    }
    return finalTextArr.join(', ');
  }
})();
