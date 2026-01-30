package com.Project.ProfileCard.ai;// 📁 File: OpenAIController.java

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "*")
public class OpenAIController {

    @Value("${openai.api.key}")
    private String openaiApiKey;

    @PostMapping("/generate-profile")
    public ResponseEntity<String> generateProfile(@RequestBody Map<String, String> payload) {
        String prompt = payload.getOrDefault("prompt", "Generate a JSON profile for a junior software developer.");

        RestTemplate restTemplate = new RestTemplate();
        String apiUrl = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openaiApiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("max_tokens", 300);
        requestBody.put("messages", List.of(
                Map.of("role", "user", "content", "Generate a JSON profile for: " + prompt + ". Include name, job, info, phone, email, and location.")
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, Map.class);
            List choices = (List) response.getBody().get("choices");
            Map firstChoice = (Map) choices.get(0);
            Map message = (Map) firstChoice.get("message");
            return ResponseEntity.ok(message.get("content").toString());
        } catch (Exception e) {
            // 🔁 Fallback to mock data if OpenAI fails
            String mockJson = "{" +
                    "\"name\":\"Mock User\"," +
                    "\"job\":\"Junior Developer\"," +
                    "\"info\":\"This is a fallback mock profile.\"," +
                    "\"email\":\"mock@example.com\"," +
                    "\"phone\":\"+123456789\"," +
                    "\"location\":\"Mockville\"}";
            return ResponseEntity.ok(mockJson);
        }
    }

    @PostMapping("/ask-ai")
    public ResponseEntity<String> askAI(@RequestBody Map<String, String> payload) {
        String question = payload.getOrDefault("question", "What is this profile good for?");

        RestTemplate restTemplate = new RestTemplate();
        String apiUrl = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openaiApiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("max_tokens", 300);
        requestBody.put("messages", List.of(
                Map.of("role", "user", "content", question)
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, Map.class);
            List choices = (List) response.getBody().get("choices");
            Map firstChoice = (Map) choices.get(0);
            Map message = (Map) firstChoice.get("message");
            return ResponseEntity.ok(message.get("content").toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("AI Assistant Error: " + e.getMessage());
        }
    }
}