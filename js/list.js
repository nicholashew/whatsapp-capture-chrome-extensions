(function () {
    const storeKey = 'WhatsAppMessageLogger';
    const jsonData = JSON.parse(localStorage.getItem(storeKey)) || [];
    const allMessage = jsonData.map(m => {
        let msg = '<p>' + m.from + m.body + '</p>';
        if (m.imgs) {
            msg += '<p>';
            msg += m.imgs.map(src => `<img src="${src}" style="max-height:300px;width:auto;"/>`);
            msg += '</p>';
        }
        msg += '<hr/>'
        return msg;
    });
    $('#WhatsAppMessageLoggerDialog').remove();
    $(`
        <div 
            id="WhatsAppMessageLoggerDialog"
            style="padding:20px;overflow:auto;position:absolute;z-index:999;width:70%;background:#000;height:95%;color:#fff"
        >
            ${allMessage}
        </div>`
    ).appendTo(document.body);
})();