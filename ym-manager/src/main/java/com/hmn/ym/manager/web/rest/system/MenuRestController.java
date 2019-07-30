package com.hmn.ym.manager.web.rest.system;

import com.hmn.ym.common.model.BaseResp;
import com.hmn.ym.dao.entities.po.system.Menu;
import com.hmn.ym.dao.entities.vo.DataTablePage;
import com.hmn.ym.dao.entities.vo.system.MenuPageVo;
import com.hmn.ym.dao.entities.vo.system.MenuVo;
import com.hmn.ym.dao.entities.vo.system.TreeModel;
import com.hmn.ym.manager.service.system.IMenuService;
import com.hmn.ym.manager.utils.RespUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/menu")
public class MenuRestController {
    @Autowired
    private IMenuService menuService;

    @RequestMapping(value = "/list")
    public DataTablePage<MenuVo> list(MenuPageVo vo) {
        return menuService.page(vo);
    }

    @RequestMapping(value = "/tree")
    public List<TreeModel> tree(MenuPageVo vo) {
        return menuService.tree(vo);
    }

    @RequestMapping(value = "/getById")
    public Menu getById(Integer id) {
        return menuService.getById(id);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<BaseResp> save(MenuVo vo) {
        menuService.save(vo);

        return RespUtil.success();
    }

    @PostMapping(value = "/delete")
    public ResponseEntity<BaseResp> delete(Integer id) {
        menuService.delete(id);

        return RespUtil.success();
    }
}
