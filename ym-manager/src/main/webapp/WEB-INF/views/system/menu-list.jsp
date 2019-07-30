<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <link href="${ctx}/static/metronic/assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css" rel="stylesheet" type="text/css"/>
    <link href="${ctx}/static/metronic/assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css" rel="stylesheet" type="text/css"/>
    <!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="${ctx}/static/metronic/assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js" type="text/javascript"></script>
    <script src="${ctx}/static/metronic/assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js" type="text/javascript"></script>
    <script src="${ctx}/static/metronic/assets/pages/scripts/ui-extended-modals.min.js" type="text/javascript"></script>
    <!-- DataTables CSS -->
    <link href="${ctx}/static/plugins/datatables-plugins/dataTables.bootstrap.css" rel="stylesheet">
    <!-- DataTables Responsive CSS -->
    <link href="${ctx}/static/plugins/datatables-responsive/dataTables.responsive.css" rel="stylesheet">
    <!-- jstree-3.3.5 -->
    <link href="${ctx}/static/plugins/zTree_v3/css/metroStyle/metroStyle.css" rel="stylesheet" type="text/css">
    <link href="${ctx}/static/plugins/zTree_v3/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css">
    <!-- DataTables JavaScript -->
    <script src="${ctx}/static/plugins/datatables/js/jquery.dataTables.min.js"></script>
    <script src="${ctx}/static/plugins/datatables-plugins/dataTables.bootstrap.min.js"></script>
    <script src="${ctx}/static/plugins/datatables-responsive/dataTables.responsive.js"></script>
    <!-- validation JavaScript -->
    <script src="${ctx}/static/plugins/jquery-validation-1.14.0/dist/jquery.validate.min.js"></script>
    <script src="${ctx}/static/plugins/jquery-validation-1.14.0/dist/localization/messages_zh.js"></script>
    <!-- jquery.form JavaScript -->
    <script src="${ctx}/static/plugins/jquery/jquery.form.js"></script>
    <script src="${ctx}/static/plugins/jquery/formateDate.js"></script>
    <script src="${ctx}/static/plugins/zTree_v3/js/jquery.ztree.all.js"></script>
    <script src="${ctx}/static/js/see-admin-common.js"></script>
    <script>
        var ctx = '${ctx}';
        var projectId='${param.projectId}';
    </script>
    <style type="text/css">
        div#rMenu {
            width: 100px;
            position: absolute;
            visibility: hidden;
            top: 0;
            background-color: #dbdbdb;
            text-align: left;
            padding: 1px;
            z-index: 100
        }

        div#rMenu a {
            cursor: pointer;
            width: 100px;
            list-style: none outside none;
            color: #fff;
            margin-left: 0;
            border-bottom: 1px solid #0a98a5;
        }

        div#rMenu .fa-edit {
            font-size: 18px;
            color: #fff;
        }

        div#rMenu .fa-remove {
            font-size: 18px;
            color: #fff;
        }
    </style>
</head>
<body>

<div class="row">
    <div id="rMenu" menuId="">
        <div class="btn-group">
            <a class="btn green" data-toggle="modal" href="#addMenuModal" onclick="addMenuModal()"><i class="glyphicon glyphicon-plus"></i>添加菜单</a>
            <a class="btn green" href="javascript:editMenu()"><i class="fa fa-edit"></i>编辑菜单</a>
            <a class="btn green" href="javascript:deleteMenu()"><i class="fa fa-remove"></i>删除菜单</a>
        </div>
    </div>

    <div class="col-md-3">
        <div class="portlet light bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="icon-settings font-green"></i>
                    <span class="caption-subject font-green sbold uppercase">菜单列表</span>
                </div>
            </div>
            <div class="portlet-body">
                <ul id="menu" name="menus" class="ztree" style="width: 300px;"></ul>
            </div>
        </div>
    </div>

    <div class="col-md-9">
        <div class="portlet light bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="icon-settings font-green"></i>
                    <span class="caption-subject font-green sbold uppercase">按钮列表</span>
                </div>
                <div class="actions">
                    <div class="btn-group">
                        <a class="btn green" data-toggle="modal" href="#addPermissionModal" onclick="addPermissionModal()"><i class="glyphicon glyphicon-plus"></i>添加</a>
                    </div>
                </div>
            </div>
            <input id="eq_parentId" name="eq_parentId" type="hidden" value="1">
            <input id="eq_projectId" name="projectId" type="hidden" value="${param.projectId}">
            <div class="portlet-body">
                <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-menu">
                    <thead>
                    <tr>
                        <th>按钮名称</th>
                        <th>按钮编码</th>
                        <th>按钮URL</th>
                        <th>所属菜单</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="modal fade" id="addMenuModal" tabindex="-1" role="dialog" aria-labelledby="addMenuModalLabel" aria-hidden="true">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="addMenuModalLabel">添加菜单</h4>
            </div>
            <div class="modal-body">
                <form role="form" id="addMenuForm" action="${ctx}/api/menu/save" method="post">
                    <input id="id" name="id" type="hidden">
                    <input id="projectId" name="projectId" value="${param.projectId}" type="hidden">
                    <div class="form-group">
                        <label>菜单编码</label>
                        <input id="code" name="code" class="form-control" placeholder="菜单编码">
                    </div>
                    <div class="form-group">
                        <label>菜单名</label>
                        <input id="name" name="name" class="form-control" placeholder="菜单名">
                    </div>
                    <div class="form-group">
                        <label>菜单URL</label>
                        <input id="action" name="action" class="form-control" placeholder="菜单URL">
                    </div>
                    <div class="form-group">
                        <label>排序</label>
                        <input id="sort" name="sort" class="form-control" placeholder="排序">
                    </div>
                    <div class="form-group" id="parentDiv">
                        <label>父菜单</label>
                        <select class="form-control" id="parentId" name="parentId">
                            <option value="">请选择父菜单</option>
                            <c:forEach items="${menus}" var="menu">
                                <option value="${menu.id}">${menu.name}</option>
                            </c:forEach>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" id="saveMenuBtn">保存</button>
            </div>
        </div>
    </div>

    <div class="modal fade" id="addPermissionModal" tabindex="-1" role="dialog" aria-labelledby="addPermissionLabel" aria-hidden="true">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="addPermissionLabel">添加按钮</h4>
            </div>
            <div class="modal-body">
                <form role="form" id="addPermissionForm" action="${ctx}/api/permission/save" method="post">
                    <input id="permissionId" name="id" type="hidden">
                    <div class="form-group">
                        <label>按钮名称</label>
                        <input id="permissionName" name="name" class="form-control" placeholder="按钮名称">
                    </div>
                    <div class="form-group">
                        <label>按钮编码</label>
                        <input id="permissionCode" name="code" class="form-control" placeholder="按钮编码">
                    </div>
                    <div class="form-group">
                        <label>按钮url</label>
                        <input id="url" name="url" class="form-control" placeholder="按钮url">
                    </div>
                    <div class="form-group" id="menuDiv">
                        <label>菜单</label>
                        <select class="form-control" id="menuId" name="menuId">
                            <option value="">请选择菜单</option>
                            <c:forEach items="${menus}" var="menu">
                                <option value="${menu.id}">${menu.name}</option>
                            </c:forEach>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" id="savePermissionBtn">保存</button>
            </div>
        </div>
    </div>
</div>
<script src="${ctx}/static/js/system/menu-list.js"></script>
</body>
</html>
