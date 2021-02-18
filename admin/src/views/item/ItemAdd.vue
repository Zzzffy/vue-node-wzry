<template>
  <div>
    <h2>{{id ? '修改' : '添加'}}物品</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="物品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="物品图标">
        <el-upload class="avatar-uploader" :action="uploadURL" :headers="getAuthHeaders()"
          :on-success="handleAvatarSuccess" :show-file-list="false">
          <img v-if="form.icon" :src="form.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
          name: '',
          icon: ''
        },
      }
    },
    created() {
      this.id && this.getItem()
    },
    methods: {
      // 保存或更新分类信息
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`/rest/items/${this.id}`, this.form)
        } else {
          res = await this.$http.post('/rest/items', this.form)
        }
        if (res.data.meta.status == 201) {
          this.$message({
            message: '保存成功！',
            type: 'success'
          });
          this.$router.push('/items/list')
        } else {
          this.$message.error('保存失败！')
        }
      },
      // 获取分类信息
      async getItem() {
        const res = await this.$http.get(`/rest/items/${this.id}`)
        this.form = res.data.data
      },
      // 上传图片后
      handleAvatarSuccess(res, file) {
        this.form.icon = res.url
      },
    }

  }
</script>

<style scoped>
</style>