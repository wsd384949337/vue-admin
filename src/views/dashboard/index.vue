<template>
  <div class="dashboard-container">
    <div class="dashboard-text">公会名： {{ name }}</div>
    <div class="dashboard-text">公会id： <span v-for="role in roles" :key="role">{{ role }}</span></div>

    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="always">
          今日流水 <p>{{123}}</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          昨日流水 <p>123</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          会员人数 <p>123</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          待审核人数 <p>123</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      list: {
        update: '编辑',
        create: '创建'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container /deep/.el-card__body{text-align: center;}
</style>
