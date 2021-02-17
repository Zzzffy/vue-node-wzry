<template>
  <div>
    <h2>{{id ? '修改' : '添加'}}分类</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="请选择分类">
        <el-select v-model="form.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="form.name"></el-input>
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
          // 选中的分类id
          parent: ''
        },
        // 父级分类
        parents: [],
      }
    },
    created() {
      this.id && this.getCategory(),
        this.getParentsCategories()
    },
    methods: {
      // 保存或更新分类信息
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`/rest/categories/${this.id}`, this.form)
        } else {
          res = await this.$http.post('/rest/categories', this.form)
        }
        if (res.data.meta.status == 201) {
          this.$message({
            message: '保存成功！',
            type: 'success'
          });
          this.$router.push('/categories/list')
        } else {
          this.$message.error('保存失败！')
        }
      },
      // 获取分类信息
      async getCategory() {
        const res = await this.$http.get(`/rest/categories/${this.id}`)
        this.form = res.data.data
      },
      // 获取所有父级分类
      async getParentsCategories() {
        const res = await this.$http.get('/rest/categories')
        this.parents = res.data.data
        console.log(this.parents);
      }
    }

  }
</script>

<style scoped>

</style>