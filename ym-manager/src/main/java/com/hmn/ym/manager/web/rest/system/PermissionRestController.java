package com.hmn.ym.manager.web.rest.system;

import com.hmn.ym.common.model.BaseResp;
import com.hmn.ym.dao.entities.vo.DataTablePage;
import com.hmn.ym.dao.entities.vo.system.PermissionPageVo;
import com.hmn.ym.dao.entities.vo.system.PermissionVo;
import com.hmn.ym.manager.service.system.IPermissionService;
import com.hmn.ym.manager.utils.RespUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/permission")
public class PermissionRestController {
    @Autowired
    private IPermissionService permissionService;

    @RequestMapping(value = "/list")
    public DataTablePage<PermissionVo> list(PermissionPageVo vo) {
        return permissionService.page(vo);
    }

    @RequestMapping(value = "/listByMenuId")
    public List<PermissionVo> listByMenuId(String menuIds, Integer roleId) {
        return permissionService.listByMenuId(menuIds, roleId);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<BaseResp> save(PermissionVo vo) {
        permissionService.save(vo);
        return RespUtil.success();
    }

    @PostMapping(value = "/delete")
    public ResponseEntity<BaseResp> delete(Integer id) {
        permissionService.delete(id);
        return RespUtil.success();
    }
}
