package com.hmn.ym.manager.web.view.system;

import com.hmn.ym.manager.service.system.IMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/menu")
public class MenuController {
    @Autowired
    private IMenuService menuService;

    @GetMapping(value = "/list")
    public String list(Model model, Integer projectId) {
        model.addAttribute("menus", menuService.listByProjectId(projectId));

        return "/system/menu-list";
    }
}
