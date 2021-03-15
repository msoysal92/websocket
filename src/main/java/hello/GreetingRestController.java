package hello;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "greeting", produces = "application/json; charset=UTF-8")
public class GreetingRestController {
	
	@Autowired
	private SimpMessagingTemplate template;
	
	@PostMapping("/time")
	public Greeting initGantt(GanttRequest request) {
		LocalDateTime startTime = request.getStartTime();
		LocalDateTime endTime = request.getEndTime();
		
		/**
		 * some work
		 */
		
		
		Greeting greeting = new Greeting("Hello Websocket");
		this.template.convertAndSend("/topic/greetings", greeting);
		return greeting;
	}
	
}
