<template>
  <div class="app-container">
    <div style="font-size: 20px;padding-bottom:50px; ">修改密码</div>
    <el-form ref="dataForm" :model="form" :rules="rules" label-width="130px" class="demo-ruleForm">
      <el-form-item label="旧密码:" prop="oldPassword">
        <el-input v-model="form.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword">
        <el-input v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="再次输入新密码:" prop="rePassword">
        <el-input v-model="form.rePassword"></el-input>
      </el-form-item>
    </el-form>
    <el-button size="mini" type="primary" @click="changePw" icon="el-icon-edit" plain>
      重置密码
    </el-button>
    <el-button size="mini" type="primary" @click="noChange" icon="el-icon-edit" plain>
      取消重置
    </el-button>

  </div>
</template>

<script>
  import { UnionChangePasswordDTO, addLabel, updateLabel, removeLabel } from '@/api/password'
  import { getUser, removeToken, removeName } from '@/utils/auth'
  export default {
    data() {
      return {
        form:{
          oldPassword:'',
          newPassword:'',
          rePassword:'',
        },
        rules: {
          oldPassword: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            { min: 6, message: '最少6个字符', trigger: 'blur' }
          ],
          newPassword: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            { min: 6, message: '最少6个字符', trigger: 'blur' }
          ],
          rePassword: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            { min: 6, message: '最少6个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      changePw(){
        let that = this
        if(this.form.newPassword !== this.form.rePassword){return}

        this.$refs.dataForm.validate(valid => {
          if (valid) {
            let user = JSON.parse(getUser())[0]
            let data = {
              unionId : user.id,
              oldPassword : this.form.oldPassword,
              newPassword : this.form.newPassword,
            }
            UnionChangePasswordDTO(data).then(response => {
              console.log(response)
              if(response.code === 0){
                that.logout()
              }else{
                this.$message.error(response.msg);
              }
            })
          }})
      },
      logout(){
        removeToken('vue_admin_template_token')
        removeName('vue_admin_template_name')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },

      noChange(){
        this.form.password=''
        this.form.newPassword=''
        this.form.rePassword=''
      },
    }
  }
</script>
<style lang="scss" scoped>
  .app-container /deep/ .el-input__inner{
    width: 300px;
  }
  .demo-ruleForm{margin-bottom: 100px;}
</style>
