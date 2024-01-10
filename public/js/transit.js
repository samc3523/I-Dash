  function fetchTransit(stop, callback) {
    var xhr = new XMLHttpRequest();
    var url = '/api/transit/' + stop;
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var transit = JSON.parse(xhr.responseText);
          if (stop === 'place-harvd') {
            callback(transit, 'hvd-in', 'hvd-out');
          } else if (stop === 'place-grigg') {
            callback(transit, 'grig-in', 'grig-out');
          }
        }
      }
    };
    xhr.send();
  }

  function updateTransit(transit, inboundElementId, outboundElementId) {
    var inbound = transit[0];
    var outbound = transit[1];
    document.getElementById(inboundElementId).innerHTML = inbound;
    document.getElementById(outboundElementId).innerHTML = outbound;
  }

  function main() {
    fetchTransit('place-harvd', updateTransit);
    fetchTransit('place-grigg', updateTransit);
  }

setInterval(main, 1000);

