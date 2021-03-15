var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('http://localhost:8085/tams-task-manager/ws/gantt');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/gantt-tasks-topic', function (greeting) {
            showGreeting(JSON.parse(greeting.body).resources);
        });
        stompClient.subscribe('/topic/text-notification-topic', function (greeting) {
            showGreeting(JSON.parse(greeting.body).resources);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

function showGreeting(message) {
	Object.entries(message).forEach(([key,value]) => {
		var taskNames = '';
		Object.entries(value.tasks).forEach(([key,value]) => {
			taskNames = taskNames + "  -  " + value.name
		})
		
		$("#greetings").append("<tr><td>" + key + taskNames + "</td></tr>");
	})
	
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

