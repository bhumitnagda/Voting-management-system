package com.PBL.Voting_management_system.Candidates;



import com.PBL.Voting_management_system.admin.Admin;
import com.PBL.Voting_management_system.admin.AdminService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidates")
public class CandidatesController {

    @Autowired
    private CandidatesService candidateService;

    @Autowired
    private AdminService adminService;

    @GetMapping
    public List<Candidates> getAllCandidates() {
        return candidateService.getAllCandidates();
    }

    @PostMapping
    public Candidates addOrUpdateCandidate(@RequestBody Candidates candidate, HttpSession session) {
        checkIfAdmin(session); // Pass the session to check if the admin is logged in
        return candidateService.addOrUpdateCandidate(candidate);
    }

    @DeleteMapping("/{id}")
    public void deleteCandidate(@PathVariable Long id, HttpSession session) {
        checkIfAdmin(session); // Pass the session to check if the admin is logged in
        candidateService.deleteCandidate(id);
    }

    private void checkIfAdmin(HttpSession session) {
        Admin admin = (Admin) session.getAttribute("admin");
        if (admin == null) {
            throw new SecurityException("Not authorized to perform this action");
        }
    }
}

