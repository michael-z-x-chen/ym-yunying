var table;
$(document).ready(function () {
    table = $('#dataTables-menu').DataTable({
        "responsive": true,
        "paginate": true,
        "processing": true,
        "serverSide": true,
        "searching": false,
        "ordering": false,
        "pagingType": 'full_numbers',
        "ajax": {
            "url": ctx + '/api/permission/list',
            "type": 'post',
            "data": function (data) {
                var parentId = $("#eq_parentId").val();
                var projectId = $("#eq_projectId").val();

                data.menuId = parentId;
                data.projectId = projectId;
            }
        },
        "columnDefs": [{
            "aTargets": [4],
            "mData": "download_link",
            "mRender": function (data) {
                var html = '<a class="btn btn-sm blue btn-outline filter-cancel" ' +
                    'href="javascript:editPermission(\'' + data.id + '\',\'' + data.code + '\',\'' + data.name + '\',\'' + data.url + '\',\'' + data.menuId + '\')">' +
                    '<i class="fa fa-edit"></i>编辑</a>\n' +
                    '<a class="btn btn-sm red btn-outline filter-cancel" href="javascript:deletePermission(' + data.id + ')"><i class="fa fa-remove"></i>删除</a>\n';

                return html;
            }
        }],
        "columns": [
            {"data": "name"},
            {"data": "code"},
            {"data": "url"},
            {"data": "menuName"},
            {"data": null}
        ],
        "language": {
            "url": ctx + '/static/plugins/datatables/language-chinese.json'
        }
    });
});


//初始化zTree
$.get(ctx + "/api/menu/tree", {projectId: projectId}, function (treeList) {
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
            enable: false
        },
        callback: {
            onClick: zTreeOnClick,
            onRightClick: onRightClick,
        }
    };
    zTree = $.fn.zTree.init($("#menu"), setting, zNodes);
});


function zTreeOnClick(event, treeId, treeNode) {
    $("#eq_parentId").val(treeNode.id);
    $("#rMenu").attr("menuId", "");
    table.ajax.reload();
}

var rMenu = $("#rMenu");

// 在ztree上的右击事件
function onRightClick(event, treeId, treeNode) {
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        showRightMenu("root", event.clientX, event.clientY);
    } else if (treeNode && !treeNode.noR) {
        showRightMenu("node", event.clientX, event.clientY);
        $("#rMenu").attr("menuId", treeNode.id);
    }
}

//显示右键菜单
function showRightMenu(type, x, y) {
    $("#rMenu ul").show();
    rMenu.css({"top": y - 50 + "px", "left": x + 30 + "px", "visibility": "visible"}); //设置右键菜单的位置、可见
    $("body").bind("mousedown", onBodyMouseDown);
}

//鼠标按下事件
function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        rMenu.css({"visibility": "hidden"});
    }
}

var $form = $('#addMenuForm');
var $form2 = $('#addPermissionForm');

function addMenuModal() {
    $form.validate().resetForm();
    commonFn.emptyVal();
    commonFn.removeClass();

    $("#projectId").val($("#eq_projectId").val());
    $("#parentId").val($("#rMenu").attr("menuId"));
    $("#addMenuModalLabel").html("添加菜单");
    $("#saveMenuBtn").prop("disabled", false);
}

function deleteMenu() {
    var id = $("#rMenu").attr("menuId");
    commonFn.deleteData(id, ctx + "/api/menu/delete", table);
}

function editMenu() {
    $form.validate().resetForm();
    commonFn.removeClass();

    var id = $("#rMenu").attr("menuId");
    $.getJSON(ctx + "/api/menu/getById?id=" + id, function (result) {
        $("#id").val(result.id);
        $("#code").val(result.code);
        $("#name").val(result.name);
        $("#action").val(result.action);
        $("#parentId").val(result.parentId);
        $("#sort").val(result.sort);
    });
    $("#addMenuModal").modal('show');
    $("#addMenuModalLabel").html("编辑菜单");
}


function addPermissionModal() {
    $form.validate().resetForm();
    commonFn.emptyVal();
    commonFn.removeClass();
    $("#menuId").val($("#eq_parentId").val());
    $("#addMenuModalLabel").html("添加菜单");
    $("#saveMenuBtn").prop("disabled", false);
}

function editPermission(id, code, name, url, menuId) {
    $form.validate().resetForm();
    commonFn.removeClass();

    $("#permissionId").val(id);
    $("#permissionCode").val(code);
    $("#permissionName").val(name);
    $("#url").val(url);
    $("#menuId").val(menuId);

    $("#addPermissionModal").modal('show');
    $("#addPermissionLabel").html("编辑按钮");
}

function deletePermission(id) {
    commonFn.deleteData(id, ctx + "/api/permission/delete", table);
}

$(document).ready(function () {
    commonFn.formSubmit($form, "saveMenuBtn", "addMenuModal", "", function ($form) {
        addFormRule($form)
    });

    commonFn.formSubmit($form2, "savePermissionBtn", "addPermissionModal", "", function ($form2) {
        addFormRule2($form2)
    });
});

function addFormRule($form) {
    $form.find("input[name='code']").rules("add", {required: true, messages: {required: "请输入菜单编码"}});
    $form.find("input[name='name']").rules("add", {required: true, messages: {required: "请输入菜单名称"}});
    $form.find("input[name='action']").rules("add", {required: true, messages: {required: "请输入菜单URL"}});
}

function addFormRule2($form) {
    $form.find("input[name='code']").rules("add", {required: true, messages: {required: "请输入按钮编码"}});
    $form.find("input[name='name']").rules("add", {required: true, messages: {required: "请输入按钮名称"}});
}



