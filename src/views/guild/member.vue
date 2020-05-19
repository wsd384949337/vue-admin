<template>
  <div class="app-container">
    <cus-wraper>
      <cus-filter-wraper>
        <el-button type="primary" @click="handleCreate" icon="el-icon-plus">添加</el-button>
      </cus-filter-wraper>
      <div class="table-container">
        <el-table v-loading="listLoading" :data="list" size="mini" fit element-loading-text="Loading"
                  highlight-current-row >
          <el-table-column label="序号" prop="id" align="center" width="65"></el-table-column>
          <el-table-column label="名称" prop="labelName" align="center" width="85"></el-table-column>
          <el-table-column  align="right" :label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleUpdate(scope.row)" icon="el-icon-edit" plain>
                修改
              </el-button>
              <cus-del-btn @ok="handleDelete(scope.row)"/>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <cus-pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
      </div>

      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogVisible" width="40%" v-dialogDrag @close="handleDialogClose">
        <el-form ref="dataForm" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
          <el-form-item label="名称:" prop="labelName">
            <el-input v-model="form.labelName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="submitForm"> 确定 </el-button>
        </span>
      </el-dialog>
    </cus-wraper>
  </div>
</template>

<script>
  // import { getRoomPage, saveSysUser, deleteSysUser } from '@/api/dictionaries/label'

  export default {
    data() {
      return {
        dialogVisible: false,
        list: [],
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          labelName: undefined
        },
        input: '',
        form: {
          labelName: undefined, //主键ID
        },
        dialogStatus: '',
        titleMap: {
          update: '编辑',
          create: '创建'
        },
        rules: {
          labelName: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        // this.listLoading = true;
        // getRoomPage(this.listQuery).then(response => {
        //   // console.log(response)
        //   this.list = response.data.records
        //   this.total = response.data.total
          this.listLoading = false
        // })
      },
      handleCreate() {
        this.resetForm()
        this.dialogStatus = 'create'
        this.dialogVisible = true
      },
      handleUpdate(row) {
        this.form = Object.assign({}, row)
        this.dialogStatus = 'update'
        this.dialogVisible = true
      },
      handleDelete(row) {
        let id = [row.id]
        // deleteSysUser(id).then(response => {
        //   if (response.code == 0) {
        //     this.getList()
        //     this.submitOk(response.message)
        //   } else {
        //     this.submitFail(response.message)
        //   }
        // })
      },
      submitForm() {
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            // saveSysUser(this.form).then(response => {
            //   if (response.code == 0) {
            //     this.getList()
            //     this.submitOk(response.message)
            //     this.dialogVisible = false
            //   } else {
            //     this.submitFail(response.message)
            //   }
            // }).catch(err => {
            //   console.log(err)
            // })
          }
        })
      },
      resetForm() {
        this.form = {
          id: undefined, //主键ID
        }
      },
      // 监听dialog关闭时的处理事件
      handleDialogClose() {
        if (this.$refs['dataForm']) {
          this.$refs['dataForm'].clearValidate() // 清除整个表单的校验
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .search-line{
    margin-bottom: 10px;
    padding: 10px;
    background: white;
  }
  .filter-wraper{
    display: flex;
    flex-direction: row-reverse;
  }
  .table-container /deep/ .el-table .cell{
    display:flex;
  }
</style>
