<template>
  <div class="app-container">
    <cus-wraper>
      <cus-filter-wraper>
        <div>
          <el-input  v-model="listQuery.unionNum" placeholder="请输入公会ID" style="width:200px;margin: 0 10px;" clearable></el-input>
          <el-button type="primary" @click="getList" icon="el-icon-search">查询</el-button>
          <el-button type="info" @click="reGetList" icon="el-icon-search">重置</el-button>
        </div>
        <el-button type="primary" @click="handleCreate" icon="el-icon-search">创建公会</el-button>
      </cus-filter-wraper>
      <div class="table-container">
        <el-table v-loading="listLoading" :data="list" size="mini" fit element-loading-text="Loading"
                  highlight-current-row >
          <el-table-column label="公会名称" prop="unionName" align="center" width="165"></el-table-column>
          <el-table-column label="公会ID" prop="unionNum" align="center" width="165"></el-table-column>
          <el-table-column label="会长昵称" prop="userName" align="center" width="165"></el-table-column>
          <el-table-column label="会长头像" prop="headPicture" align="center" width="165">
            <template slot-scope="scope">
              <img :src="scope.row.headPicture" style="width: 50px;border-radius: 25px;" alt="">
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createdTime" align="center" width="165"></el-table-column>
          <el-table-column  align="right" :label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleUpdate(scope.row)" icon="el-icon-edit" plain>
                解散公会
              </el-button>
<!--              <cus-del-btn @ok="handleDelete(scope.row)"/>-->
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <cus-pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
      </div>

      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogVisible" width="40%" v-dialogDrag @close="handleDialogClose">
        <el-form ref="dataForm" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="公会名称:" prop="unionId">
            <el-input v-model="form.unionId"></el-input>
          </el-form-item>
          <el-form-item label="公会类型:" prop="type">
            <el-radio v-model="form.type" label="0">娱乐</el-radio>
            <el-radio v-model="form.type" label="1">派单</el-radio>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="form.password"></el-input>
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
  import { getUnions, addLabel, updateLabel, removeLabel } from '@/api/guild/turnover'
  import { getUser } from '@/utils/auth'
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
          unionNum: undefined
        },
        input: '',
        form: {
          unionId: undefined, //主键ID
          type: '0', //主键ID
          password: undefined, //主键ID
        },
        dialogStatus: '',
        titleMap: {
          update: '编辑',
          create: '创建'
        },
        rules: {
          unionId: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
          type: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        let addUrl = ''
        if(this.listQuery.page !== 1){ addUrl = 'pageNum=' + this.listQuery.page + '&'  }
        if(this.listQuery.limit !== 10){  addUrl = 'pageSize=' + this.listQuery.page + '&'  }
        if(this.listQuery.unionNum !== undefined){  addUrl = 'unionNum=' + this.listQuery.unionNum + '&'  }
        getUnions(addUrl).then(response => {
          this.list = [response.data.records[0]]
          this.total = response.data.total
          this.listLoading = false
        })
      },
      reGetList(){
        this.listQuery= {
          page: 1,
          limit: 10,
          unionNum: undefined
        }
      },
      handleCreate() {
        this.resetForm()
        this.dialogStatus = 'create'
        this.dialogVisible = true
      },
      handleUpdate(row) {
        //updateLabel
        // this.form = Object.assign({}, row)
        // this.dialogStatus = 'update'
        // this.dialogVisible = true
      },
      handleDelete(row) {
        let data = {'id' : row.id}
        removeLabel(data).then(response => {
          if (response.code == 0) {
            this.getList()
            // this.submitOk(response.message)
          } else {
            // this.submitFail(response.message)
          }
        })
      },
      submitForm() {
        let user = JSON.parse(getUser())
        this.form.userId = user.id
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            addLabel(this.form).then(response => {
              if (response.code == 0) {
                this.getList()
                // this.submitOk(response.message)
                this.dialogVisible = false
              } else {
                // this.submitFail(response.message)
              }
            }).catch(err => {
              console.log(err)
            })

          }
        })
      },
      resetForm() {
        this.form = {
          unionId: undefined, //主键ID
          type: '0', //主键ID
          password: undefined, //主键ID
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
    justify-content: space-between;
  }
  .table-container /deep/ .el-table .cell{
    display:flex;
  }
</style>
