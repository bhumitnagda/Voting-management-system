package com.PBL.Voting_management_system;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomePageController {
    @RequestMapping("/")
    public String index() {
        return "redirect:/loginpage/index.html";
    }

    @RequestMapping("/adminlogin")
    public String adminlogin() {
        return "redirect:/adminlogin/adminlogin.html";
    }
}