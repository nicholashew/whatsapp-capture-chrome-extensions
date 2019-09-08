// this is the code which will be injected into a given page...
(function () {

	alert('inject!');
	/*var dialogImage = document.querySelector('div[role="dialog"] img[srcset]');

	if (dialogImage) {
		var srcset = dialogImage.getAttribute("srcset").split(",");
		var largeSrc = srcset.find(function (element) {
			return element.indexOf("1080w") > 1;
		});

		if (largeSrc) {
			var url = largeSrc.substring(0, largeSrc.length - 6);
			var isoNow = new Date().toISOString();
			var filename = isoNow.substring(0, isoNow.indexOf(".")) + ".jpg";

			window.open(url, '_blank');
		}
	} */
})();