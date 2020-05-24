<template>
  <div class="app-container">
    <cus-wraper>
      <cus-filter-wraper>
        <el-input  v-model="listQuery.userId" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入用户Id" style="width:200px;margin: 0 10px;" clearable></el-input>
        <el-button type="primary" @click="getList" icon="el-icon-search">查询</el-button>
        <el-button type="info" @click="reGetList" icon="el-icon-search">重置</el-button>
      </cus-filter-wraper>
      <div class="table-container">
        <el-table v-loading="listLoading" :data="list" size="mini" fit element-loading-text="Loading"
                  highlight-current-row >
          <el-table-column label="用户编号" prop="userId" align="center" width="165"></el-table-column>
          <el-table-column label="用户Code" prop="userCode" align="center" width="165"></el-table-column>
          <el-table-column label="所属公会" prop="unionName" align="center" width="165"></el-table-column>
          <el-table-column label="所属分组" prop="labelName" align="center" width="165"></el-table-column>
          <el-table-column label="昵称" prop="userName" align="center" width="265"></el-table-column>
          <el-table-column label="头像" prop="headPicture" align="center" width="165">
            <template slot-scope="scope">
              <img :src="scope.row.headPicture" class="headImg" alt="">
            </template>
          </el-table-column>
          <el-table-column  align="right" label="操作">
            <template slot-scope="scope">
<!--              <el-button size="mini" type="primary" @click="handleUpdate(scope.row)" icon="el-icon-edit" plain>-->
<!--                修改-->
<!--              </el-button>-->
<!--              <cus-del-btn @ok="handleDelete(scope.row)"/>-->
              <el-button size="mini" type="danger" @click="deleteUser(scope.row)" icon="el-icon-edit" plain>
                踢出公会
              </el-button>
              <el-button size="mini" type="primary" @click="changeLabel(scope.row)" icon="el-icon-edit" plain>
                修改分组
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <cus-pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>
      </div>

      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogVisible" width="40%" v-dialogDrag @close="handleDialogClose">
        <el-form ref="dataForm" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm">
          <el-form-item label="昵称:" prop="userName">{{form.userName}}</el-form-item>
          <el-form-item label="所属公会:" prop="unionName">{{form.unionName}}</el-form-item>
          <el-form-item label="所属分组:" prop="labelName">{{form.userId}}</el-form-item>
          <el-form-item label="设置分组:" prop="labelName">
            <el-select v-model="form.labelName" placeholder="请选择">
              <el-option
                v-for="item in labelList"
                :key="item.id"
                :label="item.labelName"
                :value="item.id">
              </el-option>
            </el-select>
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
  import { getUionUsers, saveSysUser, deleteSysUser, deleteUser, bindLabel } from '@/api/guild/member'
  import { getLabels } from '@/api/guild/sort'
  import { getUser } from '@/utils/auth'
  export default {
    data() {
      return {
        dialogVisible: false,
        list: [],
        listLoading: true,
        total: 0,
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          userId: undefined
        },
        input: '',
        form: {
          labelName: undefined, //主键ID
        },
        dialogStatus: '',
        titleMap: {
          update: '修改分组',
          create: '创建'
        },
        rules: {
          labelName: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ]
        },
        labelList:[],
      }
    },
    created() {
      this.getList()
      this.getLabels()
    },
    methods: {
      getList() {
        this.listLoading = true;
        // let user = JSON.parse(getUser())
        let addUrl = ''
        if(this.listQuery.pageNum !== 1){ addUrl += 'pageNum=' + this.listQuery.pageNum + '&'  }
        if(this.listQuery.pageSize !== 10){  addUrl += 'pageSize=' + this.listQuery.pageNum + '&'  }
        this.listQuery.userId = this.listQuery.userId===undefined?undefined:this.listQuery.userId.replace(/[^\d]/g,'')
        if(this.listQuery.userId !== undefined){  addUrl += 'userId=' + this.listQuery.userId }

        getUionUsers(addUrl).then(response => {
          // console.log(response.records)
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      reGetList(){
        this.listQuery= {
          pageNum: 1,
          pageSize: 10,
          userId: undefined
        }
      },
      getLabels(){
        getLabels().then(response => {
          // console.log(response.records)
          this.labelList = response.data.records
        })
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
        // console.log(this.form)
        let data = {
          "labelId": this.form.labelName,
          "unionUserId": this.form.id
        }
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            bindLabel(data).then(response => {
              if (response.code == 0) {
                this.getList()
                // this.submitOk(response.message)
                this.dialogVisible = false
              } else {
                this.submitFail(response.message)
              }
            }).catch(err => {
              console.log(err)
            })
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
      },
      deleteUser(data){
        let user = JSON.parse(getUser())
        let text = {
          "unionId": user.id,
          "userId": data.userId
        }
        deleteUser(text).then(response => {
          // console.log(response)
          this.getList()
        })
      },
      changeLabel(data){
        this.form = Object.assign({}, data)
        this.dialogStatus = 'update'
        this.dialogVisible = true
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
  }
  .table-container /deep/ .el-table .cell{
    display:flex;
  }
  .headImg{
    width:50px;
    border-radius: 25px;
  }
</style>
