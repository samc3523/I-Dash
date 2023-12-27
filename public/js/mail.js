function getMsgs(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/messages');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var msgs = JSON.parse(xhr.responseText);
          callback(null, msgs);
        } else {
          var error = new Error('Error: ' + xhr.status + ' - ' + xhr.statusText);
          callback(error, null);
        }
      }
    };
  
    xhr.onerror = function() {
      var error = new Error('Network error occurred');
      callback(error, null);
    };
  
    xhr.send();
  }
  
  function addMsg(from, text, id) {
    var msgContainer = document.getElementById("messages_container");
    //create individual message with bubble and from field
    var msgWhole = document.createElement("div");
    msgWhole.className = "message_whole";
    // create bubble with msg contents
    var msg = document.createElement("div");
    msg.className = "bubble bubble-bottom-left";
    msg.textContent = text;
    msg.id = id; 
    // to remove duplicates
    // create "from" field
    var fromWho = document.createElement("p");
    fromWho.textContent = from;
    fromWho.className = "from";
    //place items
    msgContainer.appendChild(msgWhole);
    msgWhole.appendChild(msg);
    msgWhole.appendChild(fromWho);
  }


  function scrollToBottom() {
    var scrollableDiv = document.getElementById('messages_container');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
  }
  
  function main() {
    scrollToBottom();
    getMsgs(function(error, msgs) {
      if (!error && msgs) {
        for (var i = 0; i < msgs.length; i++) {
          var myElem = document.getElementById(msgs[i].id);
          if (myElem === null) {
            addMsg(msgs[i].from, msgs[i].msg, msgs[i].id);
          }
        }
      } else {
        console.error('Error fetching messages:', error.message);
      }
    });
  }
  
  setInterval(main, 5000);
  
  