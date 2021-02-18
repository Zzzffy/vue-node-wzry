<template>
  <div>
    <h2>{{id ? '修改' : '添加'}}广告位</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="primary" @click="form.items.push({})" size="small"><i class="el-icon-plus"></i>添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, index) in form.items" :key="index">
            <el-form-item label="URL" style="margin-bottom: 8px">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload class="avatar-uploader" :action="uploadURL" :headers="getAuthHeaders()"
                :on-success="res => $set(item, 'image', res.url)" :show-file-list="false">
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="small" @click="form.items.splice(index, 1)"
                style="margin-left: 78px; margin-bottom: 16px">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
          items: []
        },

      }
    },
    created() {
      this.id && this.getAds()
    },
    methods: {
      // 保存或更新广告信息
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`/rest/ads/${this.id}`, this.form)
        } else {
          res = await this.$http.post('/rest/ads', this.form)
        }
        if (res.data.meta.status == 201) {
          this.$message({
            message: '保存成功！',
            type: 'success'
          });
          this.$router.push('/ads/list')
        } else {
          this.$message.error('保存失败！')
        }
      },
      // 获取广告信息
      async getAds() {
        const res = await this.$http.get(`/rest/ads/${this.id}`)
        this.form = Object.assign({}, this.form, res.data.data)
      }
    }
  }
</script>

<style scoped>
  .el-form-item__content {
    margin-left: 20px !important;
  }
</style>