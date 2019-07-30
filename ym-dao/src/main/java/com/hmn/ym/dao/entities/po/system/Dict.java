package com.hmn.ym.dao.entities.po.system;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

import lombok.Data;
@Table(name = "t_sys_dict")
@Data
public class Dict implements Serializable {
    /**
     * 字典主键ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 字典类型
     */
    @Column(name = "dict_key")
    private String dictKey;

    /**
     * 字典的code
     */
    @Column(name = "dict_code")
    private String dictCode;

    /**
     * 字典的name
     */
    @Column(name = "dict_name")
    private String dictName;

    /**
     * 字典的顺序 从0开始计数
     */
    @Column(name = "dict_sort")
    private Integer dictSort;

    /**
     * 字典状态 0有效 1无效
     */
    private String status;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 备注
     */
    private String comment;

    private static final long serialVersionUID = 1L;

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", dictKey=").append(dictKey);
        sb.append(", dictCode=").append(dictCode);
        sb.append(", dictName=").append(dictName);
        sb.append(", dictSort=").append(dictSort);
        sb.append(", status=").append(status);
        sb.append(", createTime=").append(createTime);
        sb.append(", comment=").append(comment);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        Dict other = (Dict) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getDictKey() == null ? other.getDictKey() == null : this.getDictKey().equals(other.getDictKey()))
            && (this.getDictCode() == null ? other.getDictCode() == null : this.getDictCode().equals(other.getDictCode()))
            && (this.getDictName() == null ? other.getDictName() == null : this.getDictName().equals(other.getDictName()))
            && (this.getDictSort() == null ? other.getDictSort() == null : this.getDictSort().equals(other.getDictSort()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getCreateTime() == null ? other.getCreateTime() == null : this.getCreateTime().equals(other.getCreateTime()))
            && (this.getComment() == null ? other.getComment() == null : this.getComment().equals(other.getComment()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getDictKey() == null) ? 0 : getDictKey().hashCode());
        result = prime * result + ((getDictCode() == null) ? 0 : getDictCode().hashCode());
        result = prime * result + ((getDictName() == null) ? 0 : getDictName().hashCode());
        result = prime * result + ((getDictSort() == null) ? 0 : getDictSort().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getCreateTime() == null) ? 0 : getCreateTime().hashCode());
        result = prime * result + ((getComment() == null) ? 0 : getComment().hashCode());
        return result;
    }
}