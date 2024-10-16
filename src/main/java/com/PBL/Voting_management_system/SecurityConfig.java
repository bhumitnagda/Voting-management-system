package com.PBL.Voting_management_system;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/loginpage/**", "/castvotepage/**","/adminlogin/**").permitAll() // Allow access to login page and static resources
                        .requestMatchers("/secure/**").fullyAuthenticated() // Protect secure content
                        .anyRequest().authenticated()
                )
                .formLogin(httpSecurityFormLoginConfigurer -> {
                    httpSecurityFormLoginConfigurer.loginPage("/loginpage/index.html");
                    httpSecurityFormLoginConfigurer.loginProcessingUrl("/api/login");
                    httpSecurityFormLoginConfigurer.permitAll();
                })
                .logout(LogoutConfigurer::permitAll).csrf();
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring().anyRequest();
    }
}
