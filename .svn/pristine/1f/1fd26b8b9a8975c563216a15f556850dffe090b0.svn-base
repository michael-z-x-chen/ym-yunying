package com.hmn.ym.manager.web.view;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

/**
 * 首页管理
 */
@Controller
public class IndexController {
    private static final Logger logger = LoggerFactory.getLogger(IndexController.class);

    @GetMapping(value = "/")
    public String index(Model model) {
        System.out.println("=============================访问首页=============================");
        return "index";
    }

    @GetMapping(value = "/login")
    public String logout(Model model) {
        Subject user = SecurityUtils.getSubject();
        if (user != null) {
            if (user.getSession() != null) {
                Object loginFailedMsg = user.getSession().getAttribute("loginFailed");
                if (loginFailedMsg != null) {
                    model.addAttribute("userInfo", "用户验证失败-" + loginFailedMsg.toString());
                } else if (user.getSession().getAttribute("registerResult") != null) {
                    model.addAttribute("userInfo", user.getSession().getAttribute("registerResult"));
                }
            }
            user.logout();
        }
        return "login";
    }

    @PostMapping(value = "/login")
    public String login(String userName, String password) {
        Subject user = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken();
        token.setUsername(userName);
        token.setPassword(password.toCharArray());
        token.setRememberMe(true);
        try {
            user.login(token);
            return "redirect:/";
        } catch (AuthenticationException e) {
            token.clear();
            logger.error("用户登录异常 " + e.getMessage(), e);
        }
        return "redirect:/login";
    }
}