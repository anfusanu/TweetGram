window.addEventListener('onload', () => {
    scrollToBottom()
})

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
            sendMessage(e.target.value, userName, userId)
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
        sendMessage(input.value, userName, userId)
    }
})

function sendMessage(message, userName, userId) {
    let msg = {
        user: userName,
        userId: userId,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'right')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainList = document.createElement('li')
    mainList.classList.add(type)
    var currentdate = new Date();

    let markup = `
    <div class="conversation-list">
        <div class="chat-avatar">
            <img src="${image.value}" alt="">
        </div>
        <div class="user-chat-content">
            <div class="ctext-wrap">
                <div class="ctext-wrap-content">
                    <p class="mb-0">
                        ${msg.message}
                    </p>
                    <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i>
                        <span class="align-middle">${currentdate.getHours() + ":" + currentdate.getMinutes()}</span>
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



