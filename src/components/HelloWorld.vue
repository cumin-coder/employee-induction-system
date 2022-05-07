<template>
  <div class="common-layout">
    <el-container>
      <el-header>员工入职系统</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            text-color="#57606f"
            active-text-color="#dfe4ea"
            background-color="#2f3542"
            class="el-menu-vertical-demo"
            :default-active="$route.path"
            @open="handleOpen"
            @close="handleClose"
            router
          >
            <el-menu-item index="/empregister">员工入职</el-menu-item>
            <el-sub-menu index="1">
              <template #title>
                <span>员工信息</span>
              </template>
              <el-menu-item index="/empdata">已入职员工信息</el-menu-item>
              <el-menu-item index="/serive">客服组</el-menu-item>
              <el-menu-item index="/security">保安组</el-menu-item>
              <el-menu-item index="/engineering">工程组</el-menu-item>
              <el-menu-item index="/cleaning">保洁组</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- <keep-alive>
              <router-view></router-view>
            </keep-alive> -->

          <router-view v-slot="{ Component }">
            <!-- 
              Props：
                include - string | RegExp | Array。只有名称匹配的组件会被缓存。
                exclude - string | RegExp | Array。任何名称匹配的组件都不会被缓存。
                max - number | string。最多可以缓存多少组件实例。
             -->
            <keep-alive
              exclude="CreateNewUser,UserData,Department,Security,Serive,Engineering,Cleaning"
            >
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const handleOpen = (key: string, keyPath: string[]) => {
      // console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
      // console.log(key, keyPath);
    };

    return {
      handleOpen,
      handleClose,
    };
  },
};
</script>


<style lang="scss" scoped>

.el-menu .el-menu-vertical-demo {
  height: 100% !important;
}

.common-layout .el-header {
  background-color: #2f3542;
  color: $cumin-Size-Color;
  height: 80px;
  line-height: 80px;
  font-size: .18rem;
}
.common-layout .el-aside {
  color: var(--el-text-color-primary);
  text-align: center;
  background-color: #2f3542;
}

.common-layout .el-main {
  color: var(--el-text-color-primary);
  text-align: center;
}

</style>