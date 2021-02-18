<template>
  <div>
    <h2>文章列表</h2>
    <el-table :data="articlesList" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="240">
      </el-table-column>
      <el-table-column prop="parent.name" label="上级分类">
      </el-table-column>  
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteArticle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        articlesList: []
      }
    },
    created() {
      this.getArticles()
    },
    methods: {
      async getArticles() {
        // 发起请求
        const res = await this.$http.get('/rest/articles')
        this.articlesList = res.data.data
      },
      // 删除文章对话框
      deleteArticle(row) {
        this.$confirm(`您确定要删除文章 '${row.title}' 吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 发起删除请求
          const res = await this.$http.delete(`/rest/articles/${row._id}`)
          if (res.data.meta.status == 204) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getArticles()
          } else {
            this.$message.error('删除失败！')
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>