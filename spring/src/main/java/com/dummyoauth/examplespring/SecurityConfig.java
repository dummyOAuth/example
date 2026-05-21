package com.dummyoauth.examplespring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(auth -> auth.requestMatchers("/", "/error").permitAll().anyRequest().authenticated())
        .oauth2Login(oauth -> oauth.defaultSuccessUrl("/", true))
        .logout(logout -> logout.logoutSuccessUrl("/"));
    return http.build();
  }
}
