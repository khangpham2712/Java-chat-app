<!DOCTYPE html>
<html>
<head>
    <title>Hello WebSocket</title>
    <script src="/webjars/jquery/dist/jquery.min.js"></script>
    <script src="/webjars/sockjs-client/sockjs.min.js"></script>
    <script src="/webjars/stomp-websocket/stomp.min.js"></script>
    <script src="app.js"></script>
</head>
<body>
<div id="main-content">
    <div>
        <div>
            <label>What is your username?</label>
            <input type="text" id="username" placeholder="Your username here...">
        </div>
        <button id="connect" type="submit">Connect</button>
        <form>
            <div>
                <label>User will received message</label>
                <input type="text" id="name" placeholder="User will receive the message...">
            </div>
            <button id="send" type="submit">Send</button>
        </form>
    </div>
</div>
<div>
    <label>Message from someone: </label><span id="message"></span>
</div>
</body>
</html>