(function () {
    alert('stopping');

    document.querySelector('#main').removeEventListener('DOMSubtreeModified', function () {
        alert('stop');
    }, false);
})();