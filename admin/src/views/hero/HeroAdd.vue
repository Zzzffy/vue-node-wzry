<template>
  <div>
    <h2>{{id ? '修改' : '添加'}}英雄</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="info">
        <el-tab-pane label="基本信息" name="info">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="avatar-uploader" :action="uploadURL"
              :on-success="handleAvatarSuccess" :headers="getAuthHeaders()" :show-file-list="false">
              <img v-if="form.avatar" :src="form.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="form.categories" multiple>
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="form.scores.difficult" :max="9" show-score style="margin-top: 0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="form.scores.skills" :max="9" show-score style="margin-top: 0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="form.scores.attack" :max="9" show-score style="margin-top: 0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="form.scores.survive" :max="9" show-score style="margin-top: 0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="form.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="form.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="form.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="form.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="form.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skill">
          <el-button type="primary" @click="form.skills.push({})" size="small"><i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, index) in form.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload class="avatar-uploader" :action="$http.defaults.baseURL+'/upload'"
                  :on-success="res => $set(item, 'icon', res.url)" :show-file-list="false">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="form.skills.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-tab-pane>

      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="margin-top: 1rem">保存</el-button>
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
          avatar: '',
          title: '',
          categories: '',
          scores: {
            difficult: 0,
            skills: 0,
            attack: 0,
            survive: 0,
          },
          items1: [],
          items2: [],
          usageTips: '',
          battleTips: '',
          teamTips: '',
          skills: []
        },
        categories: [], //英雄所属分类列表
        items: [] // 出装的物品列表
      }
    },
    created() {
      this.id && this.getHero(),
        this.getCategories(),
        this.getItems()
    },
    methods: {
      // 保存或更新分类信息
      async save() {
        let res
        if (this.id) {
          res = await this.$http.put(`/rest/heroes/${this.id}`, this.form)
        } else {
          res = await this.$http.post('/rest/heroes', this.form)
        }
        if (res.data.meta.status == 201) {
          this.$message({
            message: '保存成功！',
            type: 'success'
          });
          this.$router.push('/heroes/list')
        } else {
          this.$message.error('保存失败！')
        }
      },
      // 获取英雄信息
      async getHero() {
        const res = await this.$http.get(`/rest/heroes/${this.id}`)
        // this.form = res.data.data
        this.form = Object.assign({}, this.form, res.data.data)
      },
      // 上传图片后
      handleAvatarSuccess(res, file) {
        this.form.avatar = res.url
      },
      // 获取分类信息
      async getCategories() {
        const res = await this.$http.get('/rest/categories')
        this.categories = res.data.data
      },
      // 获取物品信息
      async getItems() {
        const res = await this.$http.get('/rest/items')
        this.items = res.data.data
      }
    }

  }
</script>

<style scoped>
  
</style>