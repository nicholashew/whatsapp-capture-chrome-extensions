class whatsAppLogger {
    constructor() {
        //private property
        this.storeKey = 'WhatsAppMessageLogger';
    }

    start() {
        alert('start');
        document.querySelector('#main').addEventListener('DOMSubtreeModified', function () {
            const msg = document.querySelectorAll('#main .message-in');
            const lastMsg = msg[msg.length - 1];
            const from = lastMsg.querySelector('[data-pre-plain-text]').getAttribute('data-pre-plain-text')
            const body = lastMsg.querySelector('.selectable-text').innerText;
            const key = btoa(unescape(encodeURIComponent(from + body)));

            const data = { key, from, body };
            let messageData = JSON.parse(localStorage.getItem(this.storeKey)) || [];

            const found = messageData.find(function (element) {
                return element.key === key;
            });

            if (!found) {
                console.log(`${from}: ${body}`);
                messageData.push(data);
                localStorage.setItem(this.storeKey, JSON.stringify(messageData));
            }
        }, false);
    }

    list() {
        alert('list');
        const jsonData = JSON.parse(localStorage.getItem(this.storeKey)) || [];
        const allMessage  = jsonData.map(m => m.from + m.body).join('\n');
        alert(allMessage); 
    }

    clear() {
        alert('clear');
        localStorage.setItem(this.storeKey, []);
    }
};