package com.dummyoauth.examplespring;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

  @GetMapping("/")
  public String home(@AuthenticationPrincipal OidcUser user, Model model) {
    if (user != null) {
      model.addAttribute("email", user.getEmail());
      model.addAttribute("sub", user.getSubject());
    }
    model.addAttribute(
        "redirectHint",
        System.getenv().getOrDefault("EXAMPLE_APP_ORIGIN", "http://localhost:3011") + "/login/oauth2/code/dummyoauth");
    return "home";
  }
}
