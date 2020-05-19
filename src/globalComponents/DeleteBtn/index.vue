<template>
<!--  <el-popover v-model="visible" placement="top" width="270">-->
<!--    <div style="display:flex;">-->
<!--      <i class="el-icon-warning" style="color:#FAAD14;line-height: 3.3;margin-right: 10px;"></i>-->
<!--      <p>确定删除此条数据吗？</p>-->
<!--    </div>-->
<!--    <p><span style="color:#F04134;margin-left: 26px;">删除后不可恢复</span> <span style="color:#ACACAC;">，你还要继续吗？</span></p>-->
<!--    <div style="text-align: right; margin: 0">-->
<!--      <el-button size="mini" @click="visible = false">取消</el-button>-->
<!--      <el-button type="primary" size="mini" @click="handleClick">确定</el-button>-->
<!--    </div>-->
<!--    <el-button size="mini" type="danger" slot="reference" icon="el-icon-delete" style="margin-left: 10px" plain>{{ $t('table.delete') }}</el-button>-->
<!--  </el-popover>-->
  <div class="detDialog">
    <el-button size="mini" type="danger" slot="reference" icon="el-icon-delete" style="margin-left: 10px" plain @click="visible = true">删除</el-button>
    <el-dialog
      :visible.sync="visible"
      width="30%"
      :show-close="false">
      <div style="display:flex;">
        <i class="el-icon-warning" style="color:#FAAD14;line-height: 3.3;margin-right: 10px;"></i>
        <p>确定删除此条数据吗？</p>
      </div>
      <p><span style="color:#F04134;margin-left: 26px;">删除后不可恢复</span> <span style="color:#ACACAC;">，你还要继续吗？</span></p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="handleClick">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'DelBtn',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('ok');
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .detDialog /deep/ .el-dialog__body{
    border:none;
    padding: 10px 20px 0;
  }
  .detDialog /deep/ .el-dialog__header{
    display:none;
  }
</style>
