<template>
  <div class="app-container">
    <cus-wraper>
      <!--      <cus-filter-wraper>-->
      <!--        <el-button type="primary" @click="handleCreate" icon="el-icon-plus">添加</el-button>-->
      <!--      </cus-filter-wraper>-->
      <div class="table-container">
        <el-table v-loading="listLoading" :data="list" size="mini" fit element-loading-text="Loading"
                  highlight-current-row >
          <el-table-column label="用户编号" prop="userCode" align="center" width="165"></el-table-column>
          <el-table-column label="所属公会" prop="unionName" align="center" width="165"></el-table-column>
          <el-table-column label="昵称" prop="userName" align="center" width="165"></el-table-column>
          <el-table-column label="申请时间" prop="createdTime" align="center" width="165"></el-table-column>
          <el-table-column label="申请状态" prop="state" align="center" width="165">
            <template slot-scope="scope">
              {{ scope.row.state == 0 ?'申请中':scope.row.state == 1?'通过':'驳回' }}
            </template>
          </el-table-column>
          <el-table-column  align="right" label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.state === 0" size="mini" type="primary" @click="successRow(scope.row, 1)" icon="el-icon-success" plain>
                同意
              </el-button>
              <el-button v-if="scope.row.state === 0" size="mini" type="danger" @click="changerow = scope.row;dialogVisible = true" icon="el-icon-error" plain>
                拒绝
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <cus-pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
      </div>

      <el-dialog title="拒绝理由" :visible.sync="dialogVisible" width="600px" v-dialogDrag @close="handleDialogClose">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="submitForm"> 确定 </el-button>
        </span>
      </el-dialog>

    </cus-wraper>
  </div>
</template>

<script>
  import { getUnionApplys, addLabel, audit, removeLabel } from '@/api/guild/join'

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
          unionName: undefined, //主键ID
          labelName: undefined, //主键ID
          remarks: undefined, //主键ID
        },
        changerow:{},
        dialogStatus: '',
        titleMap: {
          update: '编辑',
          create: '创建'
        },
        rules: {
          labelName: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ]
        },
        options: [{
          value: '1',
          label: '拒绝理由1'
        }, {
          value: '2',
          label: '拒绝理由2'
        }, {
          value: '3',
          label: '拒绝理由3'
        }, {
          value: '4',
          label: '拒绝理由4'
        }, {
          value: '5',
          label: '拒绝理由5'
        }],
        value: ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        getUnionApplys(1).then(response => {
          console.log(response.records)
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleCreate() {
        this.resetForm()
        this.dialogStatus = 'create'
        this.dialogVisible = true
      },
      handleUpdate(row) {
        //updateLabel
        this.form = Object.assign({}, row)
        this.dialogStatus = 'update'
        this.dialogVisible = true
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
      successRow(row, type){
        console.log(row)
        let data = {
          "unionApplyId": row.id,
          "state": type,
          "remarks": type === 2?this.value:""
        }
        audit(data).then(response => {
          console.log(response)
          this.getList()
        })
      },
      submitForm(){
        this.dialogVisible = false
        this.successRow(this.changerow, 2)
      },
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
