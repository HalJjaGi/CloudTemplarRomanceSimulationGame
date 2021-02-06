function as () {
    var request = new XMLHttpRequest();
    request.open('POST', './script.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                console.log(request.responseText);
            }
        }
    }
}