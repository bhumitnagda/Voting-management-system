package com.PBL.Voting_management_system.emailverif;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
public class VerificationController {

    // In-memory storage for verification codes and status
    private final Map<String, String> emailVerificationCodes = new HashMap<>();

    @Autowired
    private EmailService emailService;

    @GetMapping("/sendVerification")
    public String sendVerification(@RequestParam String email) {
        String verificationCode = generateVerificationCode();
        emailService.sendEmail(email, "Email Verification", "Your verification code is: " + verificationCode);
        emailVerificationCodes.put(email, verificationCode); // Store the verification code
        return "Verification email sent to " + email;
    }

    @GetMapping("/verifyCode")
    public String verifyCode(@RequestParam String email, @RequestParam String code) {
        String storedCode = emailVerificationCodes.get(email);
        if (storedCode != null && storedCode.equals(code)) {
            return "Email verified successfully!";
        } else {
            return "Invalid verification code.";
        }
    }

    private String generateVerificationCode() {
        // Generate a random verification code
        return UUID.randomUUID().toString();
    }
}
