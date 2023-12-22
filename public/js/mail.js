
async function getMsgs() {
    let response = await fetch("/api/messages");
    let msgs = await response.json();
    return msgs;
};

function addMsg(from,text,id) {
  // create a new div element
  const msg = document.createElement("div");
  msg.textContent = text;
  msg.setAttribute('class', "bubble bubble-bottom-left");
  msg.setAttribute('id', id);
  document.getElementById("message_container").appendChild(msg);
}



async function main() { 
    getMsgs().then(msgs => {
        let i = 0;
        while (i < msgs.length) {
        let myElem = document.getElementById(msgs[i].id);
        if (myElem === null) 
            {addMsg(msgs[i].from,msgs[i].msg,msgs[i].id)};
        i++;
        }
     })      
};

setInterval(main,5000);