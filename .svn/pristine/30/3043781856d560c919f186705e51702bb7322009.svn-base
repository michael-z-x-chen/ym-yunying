package com.hmn.ym.manager.service.system;

import com.hmn.ym.dao.entities.po.system.Dict;
import com.hmn.ym.manager.service.BaseService;

import java.util.List;

public interface IDictService extends BaseService<Dict> {

    List<Dict> getByDictKey(String dictKey);

    List<Dict> getByDictName(String dictName);

    Dict getByDictCode(String dictCode);

    Dict getByDictKeyAndDictCode(String dictKey, String dictCode);
}