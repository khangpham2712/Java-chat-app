var stompClient = null;

function connect(username) {
    var socket = new SockJS('/hello');
    stompClient = Stomp.over(socket);
    stompClient.connect({ username: username, }, function() {
        console.log('Web Socket is connected');
        stompClient.subscribe('/users/queue/messages', function(message) {
            appendNguoiNhan(message.body)
        });
    });
}

$(function() {
    $("form").on('submit', function(e) {
        e.preventDefault();
    });
    $("#connect").click(function() {
        connect($("#username").val());
    });
    $("#send").click(function() {
        stompClient.send("/app/hello/"+$("#idnguoinhan").val(), {}, $("#name").val());
        append()
        $("#name").val().text('')
    });
});

function appendNguoiNhan(message) {
    var tinhan = ' <div class="chat-msg receiver" >' +
        '<div class="chat-msg-profile">' +
        '<img class="chat-msg-img" src="image/avatar.jpg"/>' +
        '</div>' +
        '<div class="chat-msg-content">' +
        '<div class="chat-msg-text nguoinhan">' + message + '</div>' +
        '</div>' +
        '</div>';
    document.getElementById('noidungchats').innerHTML += tinhan;
    var scroll_to_bottom = document.getElementById('scroll-to-bottom');
    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
}

function append() {
    var tinhan = ' <div class="chat-msg owner" >' +
        '<div class="chat-msg-profile">' +
        '<img class="chat-msg-img" src="image/avatar.jpg"/>' +
        '</div>' +
        '<div class="chat-msg-content">' +
        '<div class="chat-msg-text">' + $("#name").val() + '</div>' +
        '</div>' +
        '</div>';
    document.getElementById('noidungchats').innerHTML += tinhan;
    var scroll_to_bottom = document.getElementById('scroll-to-bottom');
    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
    ele.value = "";
}