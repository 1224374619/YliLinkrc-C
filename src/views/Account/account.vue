<template>
  <div :span="24" class="main">
      <aside class='menu-expanded'>
        <!--导航菜单-->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          unique-opened
          style = 'height:600px;border: 1px solid rgba(246,246,246,1);box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.06);'
          v-if="!isCollapse"
          router
          background-color="#FFFFFF"
          active-text-color="#327cf3"
          :collapse="isCollapse"
        >
          <template v-for="(item,index) in $router.options.routes" v-if="item.item === 5">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title" >
                  <div style="text-align:left">
                    <i :class="item.iconCls"></i>
                    <span style='margin:0 100px 0 0;'>{{item.name}}</span>
                    </div>
              </template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden"><i :class="child.iconCls"></i>{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
          </template>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <div class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
						<!-- <el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb> -->
          </div>
          <div class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
    };
  },
  computed: {
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 4
      };
    }
  },
  methods: {},
  created() {
  }
};
</script>


<style lang="stylus" scoped>
.main {
    display: flex;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    width: 1280px;
    margin: 96px auto 0;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
      background: #FAFAFA;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      flex: 1;
      overflow-y: hidden;
      padding: 20px;
      background: #ffffff;
      margin 0 0 0 20px
      .breadcrumb-container {
        .title {
          width: 200px;
          color: #475669;
          
        }
        .breadcrumb-inner {
          margin: 0 0 0 5px;
          line-height:30px
        }
      }
      .content-wrapper {
        box-sizing: border-box;
      }
    }
  }
</style>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
</style>
