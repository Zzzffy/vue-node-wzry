<template>
  <div>
    <h2>{{id ? '修改' : '添加'}}文章</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="请选择分类">
        <el-select v-model="form.parent" multiple>
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="form.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    VueEditor
  } from "vue2-editor";
  export default {
    props: {
      id: {}
    },
    components: {
      VueEditor
    },
    data() {
      return {
        form: {
          title: '',
          content: '',
          // 选中的分类id
          parent: []
        },
        // 父级分类
        parents: [],
      }
    },
    created() {
      this.id && this.getArticles(),
        this.getParentsCategories()
    },
    methods: {
      // 保存或更新分类信息
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`/rest/articles/${this.id}`, this.form)
        } else {
          res = await this.$http.post('/rest/articles', this.form)
        }
        if (res.data.meta.status == 201) {
          this.$message({
            message: '保存成功！',
            type: 'success'
          });
          this.$router.push('/articles/list')
        } else {
          this.$message.error('保存失败！')
        }
      },
      // 获取文章信息
      async getArticles() {
        const res = await this.$http.get(`/rest/articles/${this.id}`)
        this.form = res.data.data
      },
      // 获取所有父级分类
      async getParentsCategories() {
        const res = await this.$http.get('/rest/categories')
        this.parents = res.data.data
        console.log(this.parents);
      },
      // 自定义富文本编辑器中的图片上传事件
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await this.$http.post('/upload', formData)
        let url = res.data.url;
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();

      }
    }
  }
</script>

<style scoped>

</style>