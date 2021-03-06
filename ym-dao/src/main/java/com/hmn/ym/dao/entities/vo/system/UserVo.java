package com.hmn.ym.dao.entities.vo.system;

import com.hmn.ym.dao.entities.vo.BaseVo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * <p>
 * 用户表
 * </p>
 *
 * @author xfz
 * @since 2018-05-28
 */
@Getter
@Setter
public class UserVo extends BaseVo {
    /**
     * 用户名称
     */
    private String name;
    /**
     * 密码
     */
    private String password;
    /**
     * 手机号码
     */
    private String mobile;
    /**
     * 邮箱帐号
     */
    private String email;
    /**
     * 用户类型（1：管理员，2：普通用户）
     */
    private Integer type;
    /**
     * 授权环境
     */
    private String gantEnvs;

    /**
     * 授权环境名称
     */
    private String gantEnvNames;

    /**
     * 授权项目
     */
    private String gantProject;

    /**
     * 授权项目名称
     */
    private String gantProjectName;

    /**
     * 状态( 0：禁用  1：启用 )
     */
    private Integer status;
    /**
     * 用户角色
     */
    private List<RoleVo> userRoles;
    /**
     * 用户角色名称
     */
    private String roleNames;
    /**
     * 用户角色ids
     */
    private String roleIds;
}
