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
          <el-table-column label="用户Id" prop="userId" align="center"></el-table-column>
          <el-table-column label="所属公会" prop="unionName" align="center"></el-table-column>
          <el-table-column label="头像" prop="headPicture" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.headPicture" class="headImg" alt="">
            </template>
          </el-table-column>
          <el-table-column label="性别" prop="userName" align="center"></el-table-column>
          <el-table-column label="类型" prop="applyType" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.applyType === 0?'申请加入':'申请退出'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间" prop="createdTime" align="center"></el-table-column>
          <el-table-column label="申请状态" prop="state" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.state === 0?'审核中':scope.row.state === 1?'通过':'拒绝'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="原因" prop="remarks" align="center"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <cus-pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>
      </div>

    </cus-wraper>
  </div>
</template>

<script>
  import { getUionUsers } from '@/api/guild/record'
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
    },
    methods: {
      getList() {
        this.listLoading = true;
        // let user = JSON.parse(getUser())
        let addUrl = ''
        if(this.listQuery.pageNum !== 1){ addUrl += 'pageNum=' + this.listQuery.pageNum + '&'  }
        if(this.listQuery.pageSize !== 10){  addUrl += 'pageSize=' + this.listQuery.pageNum + '&'  }
        this.listQuery.userId = this.listQuery.userId===undefined?undefined:this.listQuery.userId.replace(/[^\d]/g,'')
        if(this.listQuery.userId !== undefined){  addUrl += 'userId=' + this.listQuery.userId  }

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
