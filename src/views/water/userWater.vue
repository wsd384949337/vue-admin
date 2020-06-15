<template>
  <div class="app-container">
    <div v-if="isRoomId">暂无流水</div>
    <div v-else>
      <cus-wraper>
        <cus-filter-wraper>
          <div>
            <el-input v-model="listQuery.userId" placeholder="请输入用户Id" class="topInput" clearable style="margin-right: 10px;width: 200px;"></el-input>
            <el-button type="primary" @click="getList" icon="el-icon-search">查询</el-button>
            <el-button type="info" @click="reGetList" icon="el-icon-search">重置</el-button>
          </div>
        </cus-filter-wraper>
        <div class="table-container">
          <el-table v-loading="listLoading" :data="list" size="mini" fit element-loading-text="Loading" stripe
                    highlight-current-row >
            <el-table-column label="起始时间" prop="beginDate" align="center"></el-table-column>
            <el-table-column label="结束时间" prop="endDate" align="center"></el-table-column>
            <el-table-column label="公会Id" prop="unionId" align="center"></el-table-column>
            <el-table-column label="公会名称" prop="unionName" align="center"></el-table-column>
            <el-table-column label="用户Id" prop="userId" align="center"></el-table-column>
            <el-table-column label="用户昵称" prop="userName" align="center"></el-table-column>
            <el-table-column label="单数" prop="weekOrderCount" align="center"></el-table-column>
            <el-table-column label="收益" prop="weekOrderMoney" align="center"></el-table-column>
          </el-table>
          <!-- 分页 -->
          <cus-pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>
        </div>
      </cus-wraper>
    </div>
  </div>
</template>

<script>
  import { getUnionWater } from '@/api/water/userWater'
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
        isRoomId: false,
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
    mounted() {
      let user = JSON.parse(getUser())
      this.isRoomId = user.type === 0
    },
    methods: {
      getList() {
        this.listLoading = true;
        getUnionWater(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      changeType(type){
        this.listQuery.type =type
        this.getList()
      },
      reGetList(){
        this.listQuery= {
          pageNum: 1,
          pageSize: 10,
          userId: undefined
        }
        this.getList()
      },
      handleCreate() {
        // this.resetForm()
        // this.dialogStatus = 'create'
        // this.dialogVisible = true
      },
      handleUpdate(row) {
        //updateLabel
        // this.form = Object.assign({}, row)
        // this.dialogStatus = 'update'
        // this.dialogVisible = true
      },


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
