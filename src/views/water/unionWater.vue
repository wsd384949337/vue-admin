<template>
  <div class="app-container">
    <div v-if="isRoomId && unionType === 0">暂无流水</div>
    <div v-else>
      <cus-wraper>
        <cus-filter-wraper>
          <div v-if="unionType === 0">
                <el-button type="primary" @click="changeType(0)" icon="el-icon-search">按天统计</el-button>
                <el-button type="primary" @click="changeType(1)" icon="el-icon-search">按周统计</el-button>
                <el-button type="primary" @click="changeType(2)" icon="el-icon-search">按月统计</el-button>
          </div>
        </cus-filter-wraper>
        <div class="table-container">
          <el-table v-if="unionType === 0" v-loading="listLoading" :data="list" size="mini" fit element-loading-text="Loading" stripe
                    highlight-current-row >
            <el-table-column label="房主ID" prop="user_code" align="center"></el-table-column>
            <el-table-column label="房间ID" prop="room_id" align="center"></el-table-column>
            <el-table-column label="房间名称" prop="room_name" align="center"></el-table-column>
            <el-table-column label="流水" prop="number" align="center"></el-table-column>
            <el-table-column label="时间" prop="group_time_text" align="center"></el-table-column>
          </el-table>
          <el-table v-if="unionType === 1" v-loading="listLoading" :data="list" size="mini" fit element-loading-text="Loading" stripe
                    highlight-current-row >
            <el-table-column label="起始时间" prop="beginDate" align="center"></el-table-column>
            <el-table-column label="结束时间" prop="endDate" align="center"></el-table-column>
            <el-table-column label="公会id" prop="unionId" align="center"></el-table-column>
            <el-table-column label="公会名称" prop="unionName" align="center"></el-table-column>
            <el-table-column label="收益" prop="profit" align="center"></el-table-column>
          </el-table>
          <!-- 分页 -->
          <cus-pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>
        </div>
      </cus-wraper>
    </div>
  </div>
</template>

<script>
  import { getUnionWater, getUnionWaterYL } from '@/api/water/unionWater'
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
          type: 0
        },
        input: '',
        isRoomId: '',
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
        unionType:'',
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
    mounted() {
      let user = JSON.parse(getUser())
      this.unionType = user.type   // 娱乐0  派单1
      this.isRoomId = user.roomId === undefined

      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        if(this.unionType === 0){
          getUnionWaterYL(this.listQuery).then(response => {
            this.list = response.data.list
            this.total = response.data.total
            this.listLoading = false
          })
        }else{
          getUnionWater(this.listQuery).then(response => {
            this.list = response.data.records
            this.total = response.data.total
            this.listLoading = false
          })
        }

      },
      changeType(type){
        this.listQuery.type =type
        this.getList()
      },
      reGetList(){
        this.listQuery= {
          pageNum: 1,
          pageSize: 10,
          unionNum: undefined
        }
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
