var table;
$(document).ready(function () {
    table = $('#dataTables-user').DataTable({
        "responsive": true,
        "paginate": true,
        "processing": true,
        "serverSide": true,
        "searching": false,
        "ordering": false,
        "pagingType": 'full_numbers',
        "ajax": {
            "url": ctx + '/api/role/list',
            "type": 'post'
        },
        "columnDefs": [{
            "aTargets": [3],
            "mData": "download_link",
            "mRender": function (data) {
                var html = '<a class="btn btn-sm blue btn-outline filter-cancel" href="javascript:editRole(\'' + data.id + '\',\'' + data.name + '\',\'' + data.description + '\')"><i class="fa fa-edit"></i>编辑</a>\n' +
                    '<a class="btn btn-sm purple btn-outline filter-cancel" href="javascript:addRoleMenu(' + data.id + ')"><i class="fa fa-th-large"></i>菜单</a>\n' +
                    '<a class="btn btn-sm red btn-outline filter-cancel" href="javascript:deleteRole(' + data.id + ')"><i class="fa fa-remove"></i>删除</a>\n';

                return html;
            }
        }],
        "columns": [
            {"data": "name"},
            {"data": "description"},
            {
                "data": "createTime", "render": function (data) {
                    return (new Date(data)).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            {"data": null}
        ],
        "language": {
            "url": '/plugins/datatables/language-chinese.json'
        }
    });
});

function deleteRole(id) {
    commonFn.deleteData(id, ctx + "/api/role/delete", table);
}

var $form = $('#addForm');

function editRole(id, name, description) {
    $form.validate().resetForm();

    $("#id").val(id);
    $("#name").val(name);
    $("#description").val(description);
    $("#name").removeClass("error");
    $("#description").removeClass("description");
    $("#addModal").modal('show');
    $("#myModalLabel").html("编辑角色");
}

function addRoleModal() {
    $form.validate().resetForm();

    $("#id").val("");
    $("#name").val("");
    $("#description").val("");
    $("#name").removeClass("error");
    $("#description").removeClass("error");
    $("#myModalLabel").html("添加角色");
    $("#saveBtn").prop("disabled", false);
}

function addRoleMenu(id) {
    $("#roleId").val(id);

    //取消当前所有被选中节点的选中状态
    var treeObj = $.fn.zTree.getZTreeObj("menu");
    treeObj.checkAllNodes(false);
    $("#permissions").empty();
    $.post(ctx + "/api/role/listRoleMenuByRoleId", {roleId: id}, function (data) {
        var zTree = treeObj.getCheckedNodes(false);
        for (var i = 0; i < zTree.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (zTree[i].id == data[j].menuId) {
                    treeObj.expandNode(zTree[i], true); //展开选中的
                    treeObj.checkNode(zTree[i], true);
                    $.getJSON(ctx + "/api/permission/listByMenuId?menuIds=" + data[j].menuId + "&roleId=" + id, function (result) {
                        $.each(result, function (i, field) {
                            var checked = '';
                            if (field.hasPermission) {
                                checked = 'checked';
                            }
                            var html = '<li>' +
                                '<div class="form-group"> <input name="permissionIds" type="checkbox" ' + checked + ' value="' + field.id + '">' + field.menuName + "-" + field.name
                            '</div>' +
                            '</li>';

                            $("#permissions").append(html);
                        });
                    });
                }
            }
        }
    });
    $("#menuDialog").modal('show');
}

var zTree;
//初始化zTree
$.get(ctx + "/api/menu/roleTree", {}, function (treeList) {
    var zNodes = [];

    function eachMenu(treeList, items, childNodes) {
        for (var i = 0; i < treeList.length; i++) {
            obj = treeList[i];
            if (items == null) {
                var trees = {
                    id: obj.id,
                    open: true,
                    name: obj.name,
                    pId: obj.pid
                };
                zNodes.push(trees);
                var childNodes = [];
                if (obj.childTrees.length > 0) {
                    eachMenu(obj.childTrees, trees, childNodes);
                }
            } else {
                var childTree = {
                    id: obj.id,
                    open: true,
                    name: obj.name,
                    pId: obj.pid
                };
                childNodes.push(childTree);
                items.children = childNodes;
                var childNodes2 = [];
                if (obj.childTrees.length > 0) {
                    eachMenu(obj.childTrees, childTree, childNodes2);
                }
            }
        }
    }

    eachMenu(treeList, null, null);

    var setting = {
        check: {
            enable: true
        },
        callback: {
            onClick: zTreeOnClick,
            onCheck: zTreeOnClick,
        }
    };
    zTree = $.fn.zTree.init($("#menu"), setting, zNodes);
});

function zTreeOnClick(event, treeId, treeNode) {
    var checkedIds = new Array();
    $(zTree.getCheckedNodes(true)).each(function (i, node) {
        checkedIds.push(node.id);
    });
    $("#permissions").empty();
    var roleId = $("#roleId").val();
    $.getJSON(ctx + "/api/permission/listByMenuId?menuIds=" + checkedIds + "&roleId=" + roleId, function (result) {
        $.each(result, function (i, field) {
            var checked = '';
            if (field.hasPermission) {
                checked = 'checked';
            }
            var html = '<li>' +
                '<div class="form-group"> <input name="permissionIds" type="checkbox" ' + checked + ' value="' + field.id + '" >' + field.menuName + "-" + field.name
            '</div>' +
            '</li>';

            $("#permissions").append(html);
        });
    });
    $("#eq_parentId").val(treeNode.id);
    $("#rMenu").attr("menuId", "");
    table.ajax.reload();
}

//菜单和按钮保存
$("#menuModalSave").on("click", function () {
    $("#menuModalSave").showLoading();
    var checkedIds = new Array();
    $(zTree.getCheckedNodes(true)).each(function (i, node) {
        checkedIds.push(node.id);
    });
    if (checkedIds.length == 0) {
        swal({
            title: "",
            text: "请选择菜单",
            type: "error",
            closeOnConfirm: true
        });
        return;
    }
    var permissionIds = [];
    $("input[name='permissionIds']:checked").each(function (index, item) {
        permissionIds.push($(this).val());
    });

    var params = {
        roleId: $("#roleId").val(),
        menuIds: checkedIds.toString(),
        permissionIds: permissionIds.toString()
    }
    $.post(ctx + "/api/role/saveRoleMenu", params, function () {
        $("#menuDialog").modal('hide');
        swal({
            title: "保存角色菜单成功!"
        }, function () {
            $("#menuModalSave").hideLoading();
        });
    });
});

$(document).ready(function () {
    commonFn.formSubmit($form, "saveBtn", "addModal", "", function ($form) {
        addFormRule($form)
    });
});

function addFormRule($form) {
    $form.find("input[name='name']").rules("add", {required: true, messages: {required: "请输入角色名称"}});
    $form.find("input[name='description']").rules("add", {required: true, messages: {required: "请输入角色描述"}});
}
