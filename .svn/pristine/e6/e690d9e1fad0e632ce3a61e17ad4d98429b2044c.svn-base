package com.hmn.ym.manager.service.system.impl;

import com.hmn.ym.dao.entities.po.system.Dict;
import com.hmn.ym.dao.mapper.system.DictMapper;
import com.hmn.ym.manager.service.BaseServiceImpl;
import com.hmn.ym.manager.service.system.IDictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import java.util.List;

@Service
public class DictServiceImpl extends BaseServiceImpl<Dict, DictMapper> implements IDictService {
    @Autowired
    private DictMapper dictMapper;

    @Override
    public List<Dict> getByDictKey(String dictKey) {
        Example example = new Example(Dict.class);
        example.createCriteria().andEqualTo("dictKey", dictKey);
        return dictMapper.selectByExample(example);
    }

    @Override
    public List<Dict> getByDictName(String dictName) {
        Example example = new Example(Dict.class);
        example.createCriteria().andEqualTo("dictName", dictName);
        return dictMapper.selectByExample(example);
    }

    @Override
    public Dict getByDictCode(String dictCode) {
        Example example = new Example(Dict.class);
        example.createCriteria().andEqualTo("dictCode", dictCode);
        return dictMapper.selectOneByExample(example);
    }

    @Override
    public Dict getByDictKeyAndDictCode(String dictKey, String dictCode) {
        Example example = new Example(Dict.class);
        example.createCriteria().andEqualTo("dictKey", dictKey).andEqualTo("dictCode", dictCode);
        return dictMapper.selectOneByExample(example);
    }
}