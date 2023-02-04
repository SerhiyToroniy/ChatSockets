$(function () {
    var protocol = location.protocol === "https:" ? "wss:" : "ws:";
    var wsUri = protocol + "//" + window.location.host;
    var socket = new WebSocket(wsUri);
    socket.onopen = e => {
        console.log("socket opened", e);
    };

    socket.onclose = function (e) {
        console.log("socket closed", e);
    };

    socket.onmessage = function (e) {
        console.log(e);
        const p = document.createElement("p");
        p.setAttribute("class", "one-msg")
        const node = document.createTextNode(`${e.data}`);
        p.appendChild(node);

        const element = document.getElementById("msgs");
        element.appendChild(p);
    };

    socket.onerror = function (e) {
        console.error(e.data);
    };

    $('#MessageField').keypress(function (e) {
        if (e.which != 13) {
            return;
        }

        e.preventDefault();
        var userName = document.getElementById("UsernameField").value;
        console.log(userName);
        var message = userName + ": " + $('#MessageField').val();
        socket.send(message);
        $('#MessageField').val('');
    });
});