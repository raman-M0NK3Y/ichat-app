const socket = io()



let name;

let msgArea = document.querySelector('.message__area')

$(document).ready(function() {
    $("#textarea").emojioneArea({
        pickerPosition: "top",
        events:{
            keyup:function(editor, event){
                
                //sendMessage(event.target.value)
                //event.preventDefault();
                if(event.which == 13){
                    //sendMessage(this.getText().trim());
                    //this.setText('');
                    sendMessage($('textarea').data("emojioneArea").getText().trim());
                    $('#textarea').data("emojioneArea").setText('');
                    //event.preventDefault();
                }
            }
        }
    })
})

do {
    name = prompt('Please enter your name: ')
}while(!name)

// $(document).ready(function() {
//     $('#textarea').emojioneArea({
//         pickerPosition: "top",
//         events:{
//             keyup: function(editor, event){
//                 //event.preventDefault();
//                 if (event.which == 13){
                    
//                     //alert('enter key was pressed!')
//                     sendMessage(event.target.value)
//                     event.preventDefault();
//                 }
//             }
//         }
//     })
// })



function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    addMessage(msg, 'outgoing')
    scrollDown()

    // sending to server
    socket.emit('msg', msg)
}

function addMessage(msg, type) {
    let mDiv = document.createElement('div')
    let msgType = type

    mDiv.classList.add(msgType, 'message')

    let text = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mDiv.innerHTML = text
    msgArea.appendChild(mDiv)
}

// receiving msg's

socket.on('msg', (msg) => {
    addMessage(msg, 'incoming')
    scrollDown()
})

function scrollDown() {
    msgArea.scrollTop = msgArea.scrollHeight
}
