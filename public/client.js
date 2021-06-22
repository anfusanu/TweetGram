window.addEventListener('onload', () => {
    scrollToBottom()
})

const socket = io()
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (textarea.value == '') {
            alert('No more');
        } else {
            let userName = document.getElementById('username').value;
            let userId = document.getElementById('userid').value;
            sendMessage(e.target.value, userName, userId)
        }
    }
})

function sendMessage(message, userName, userId) {
    let msg = {
        user: userName,
        userId: userId,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



