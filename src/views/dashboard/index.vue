<template>
  <div class="dashboard-container">
    <div class="dashboard-text">公会名： {{ user.unionName }}</div>
    <div class="dashboard-text">公会id： {{ user.unionNum }}</div>

    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="always">
          今日流水 <p>{{list.today}}</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          昨日流水 <p>{{list.yesterday}}</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          会员人数 <p>{{list.unionMembers}}</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          待审核人数 <p>{{list.unionApplys}}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getUser } from '@/utils/auth'
  import { getUnionMemberCount } from '@/api/user'

  export default {
  name: 'Dashboard',
  computed: {
  },
  data() {
    return {
      user: {},
      list: {}
    }
  },
  mounted() {
    let user = JSON.parse(getUser())
    this.user = user
    getUnionMemberCount(user.id).then(response => {
      this.list = response.data
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 18px;
    line-height: 46px;
  }
}
.dashboard-container /deep/.el-card__body{text-align: center;}
</style>
