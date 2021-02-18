<template>
  <div>
    <h2>{{id ? '修改' : '添加'}}管理员</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    created() {
      this.id && this.getUsers()
    },
    methods: {
      // 保存或更新分类信息
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`/rest/admin_user/${this.id}`, this.form)
        } else {
          res = await this.$http.post('/rest/admin_user', this.form)
        }
        if (res.data.meta.status == 201) {
          this.$message({
            message: '保存成功！',
            type: 'success'
          });
          this.$router.push('/admin_user/list')
        } else {
          this.$message.error('保存失败！')
        }
      },
      // 获取分类信息
      async getUsers() {
        const res = await this.$http.get(`/rest/admin_user/${this.id}`)
        this.form = res.data.data
      }
    }

  }
</script>

<style scoped>

</style>