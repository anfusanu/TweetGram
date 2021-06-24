
const socket = io()
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('#message__area')
let sendButton = document.getElementById('sendButton')
let input = document.getElementById('textarea');
let image = document.getElementById('image');

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (e.target.value.trim() == '' || e.target.value.trim().length == 0) {
            alert('Type something');
        } else {
            let userName = document.getElementById('username').value;
            let userId = document.getElementById('userid').value;

            sendMessage(e.target.value, userName, userId, image.value)
        }
    }
})
sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value.trim() == '' || input.value.trim().length == 0) {
        alert('Type something');
    } else {
        let userName = document.getElementById('username').value;
        let userId = document.getElementById('userid').value;
        sendMessage(input.value, userName, userId, image.value)
    }
})

function sendMessage(message, userName, userId, image) {
    var dt = new Date();
    let msg = {
        user: userName,
        userId: userId,
        message: message.trim(),
        image,
        date: dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear(),
        time: dt.getHours() + ":" + dt.getMinutes()
    }
    // Append 
    appendMessage(msg, 'right')
    textarea.value = ''
    scrollToBottom()
    $('#message__area').animate({ scrollTop: $('#message__area').prop("scrollHeight") }, 500);


    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainList = document.createElement('li')
    mainList.classList.add(type)

    let markup = `
    <div class="conversation-list">
        <div class="chat-avatar">
            <img src="${msg.image}" alt="">
        </div>
        <div class="user-chat-content">
            <div class="ctext-wrap">
                <div class="ctext-wrap-content">
                    <p class="mb-0">
                        ${msg.message}
                    </p>
                    <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i>
                        <span class="align-middle">${msg.time}</span>
                    </p>
                </div>

            </div>
        </div>
    </div>
    `
    mainList.innerHTML = markup
    messageArea.appendChild(mainList)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'left')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



