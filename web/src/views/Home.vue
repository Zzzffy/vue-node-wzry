<template>
  <div>
    <!-- 轮播图 -->
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" class="w-100">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/ddc8c8922cbb694dfb73c86bb03fce22.jpeg" class="w-100">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" class="w-100">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- 精灵图片 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class=" d-flex flex-wrap">
        <div class="nav-item mb-2" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- 卡片 -->
    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link tag="div" :to="`/articles/${news._id}`" class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

  </div>
</template>

<script>
  import dayjs from 'dayjs'
  export default {
    filters: {
      date(val) {
        return dayjs(val).format('MM/DD')
      }
    },
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.pagination-home',
            clickable: true,
          },
          autoplay: {
            delay: 2000,
          },
          loop: true
        },
        newsCats: [],
      }
    },
    created() {
      this.getNewsCategories()
    },
    methods: {
      async getNewsCategories() {
        const {
          data: res
        } = await this.$http.get('/news/list')
        console.log(res);
        this.newsCats = res
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/_variables';

  .pagination-home {
    .swiper-pagination-bullet {
      border-radius: 0.1538rem;
      background: map-get($colors, 'white');
    }
  }

  .nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;

    .nav-item {
      width: 25%;
      border-right: 1px solid $border-color;
    }

    &:nth-child(4n) {
      border-right: none;
    }
  }
</style>