<template>
  <div>
    <h2>管理员列表</h2>
    <el-table :data="usersList" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="240">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/admin_user/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        usersList: []
      }
    },
    created() {
      this.getUsers()
    },
    methods: {
      async getUsers() {
        // 发起请求
        const res = await this.$http.get('/rest/admin_user')
        this.usersList = res.data.data
      },
      // 删除分类对话框
      deleteUser(row) {
        this.$confirm(`您确定要删除管理员用户 '${row.name}' 吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 发起删除请求
          const res = await this.$http.delete(`/rest/admin_user/${row._id}`)
          if (res.data.meta.status == 204) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getUsers()
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