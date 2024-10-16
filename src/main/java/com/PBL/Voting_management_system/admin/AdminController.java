package com.PBL.Voting_management_system.admin;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginDetails, HttpSession session) {
        UUID userId = UUID.fromString(loginDetails.get("userId"));
        String password = loginDetails.get("password");

        Admin admin = adminService.loginAdmin(userId.toString(), password);
        if (admin != null) {
            session.setAttribute("admin", admin);
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/checkLoginStatus")
    public ResponseEntity<Map<String, Boolean>> checkLoginStatus(HttpSession session) {
        Admin admin = (Admin) session.getAttribute("admin");
        boolean loggedIn = (admin != null);
        return ResponseEntity.ok(Map.of("loggedIn", loggedIn));
    }

    // New Logout Endpoint
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();  // Invalidate the current session
        return ResponseEntity.ok("Logout successful");
    }
}
