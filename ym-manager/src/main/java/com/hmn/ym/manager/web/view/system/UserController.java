package com.hmn.ym.manager.web.view.system;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/user")
public class UserController {

    @GetMapping(value = "/list")
    public String list() {
        return "/system/user-list";
    }
}
