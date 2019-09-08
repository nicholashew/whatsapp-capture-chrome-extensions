(function () {
    const storeKey = 'WhatsAppMessageLogger';
    const container = document.querySelector('#main');

    if (!container || window._whatsAppLoggerInited === true)
        return;

    window._whatsAppLoggerInited = true;
    console.log('WhatsAppMessageLogger start');

    var getDataUrl = function (img) {
        var c = document.createElement('canvas');
        c.height = img.naturalHeight;
        c.width = img.naturalWidth;
        var ctx = c.getContext('2d');

        ctx.drawImage(img, 0, 0, c.width, c.height);
        var base64String = c.toDataURL();
        return base64String;
    }

    container.addEventListener('DOMSubtreeModified', function () {
        const msg = document.querySelectorAll('#main .message-in');
        const lastMsg = msg[msg.length - 1];

        const imgElements = lastMsg.querySelectorAll('img');
        const imgs = [];
        if (imgElements) {
            imgElements.forEach(img => {
                var dataUrl = getDataUrl(img);
                imgs.push(dataUrl);
                //console.log(dataUrl);
            });
        }

        const fromElement = lastMsg.querySelector('[data-pre-plain-text]');
        const from = fromElement !== null ? fromElement.getAttribute('data-pre-plain-text') : '';

        const bodyElement = lastMsg.querySelector('.selectable-text');
        const body = bodyElement !== null ? bodyElement.innerText : '';

        let keyStr = from + body;
        if (keyStr === '') keyStr = lastMsg.innerText;
        const key = btoa(unescape(encodeURIComponent(keyStr)));

        const data = { key, imgs, from, body };
        let messageData = JSON.parse(localStorage.getItem(storeKey)) || [];

        const found = messageData.find(function (element) {
            return element.key === key;
        });

        if (!found) {
            console.log(`${from}: ${body}`);
            messageData.push(data);
            localStorage.setItem(storeKey, JSON.stringify(messageData));
        }
    }, false);
})();