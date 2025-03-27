<script setup lang="ts">
import { isCollapse } from "./isCollapse.ts";
// const isCollapse = ref(false) // 控制菜单的折叠
</script>


<template>
    <el-aside>
        <el-scrollbar> <!-- el-scrollbar标签 表示滚动条 -->
            <el-menu router unique-opened :collapse="isCollapse">
                <!--router 表示路由跳转   unique-opened 表示二级标签默认不展开,自动关闭    collapse 表示折叠  -->
                <a href="/" class="logo">
                    <img src="@/assets/logo.svg" alt="" />
                    <h1>SysTemplate</h1>
                </a>
                <el-sub-menu index="1"> <!--el-sub-menu 标签表示有二级标签  -->
                    <template #title>
                        <el-icon>
                            <IEpSetting />
                        </el-icon> <span> 权限设置 </span>
                    </template>

                    <el-menu-item index="/menus">
                        <el-icon>
                            <IEpSetting />
                        </el-icon> <span> 菜单列表 </span>
                    </el-menu-item>

                    <el-menu-item index="/resources">
                        <el-icon>
                            <IEpSetting />
                        </el-icon> <span> 资源列表 </span>
                    </el-menu-item>

                    <el-menu-item index="/roles">
                        <el-icon>
                            <IEpSetting />
                        </el-icon> <span> 角色列表 </span>
                    </el-menu-item>

                </el-sub-menu>

                <el-menu-item index="/stm_tb">
                    <el-icon>
                        <IEpSetting />
                    </el-icon> <span> 馒头用户管理 </span>
                </el-menu-item>

                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <IEpSetting />
                        </el-icon> <span> 广告管理 </span>
                    </template>

                    <el-menu-item index="/ads">
                        <el-icon>
                            <IEpSetting />
                        </el-icon> <span> 广告列表 </span>
                    </el-menu-item>

                    <el-menu-item index="/ad_spaces">
                        <el-icon>
                            <IEpSetting />
                        </el-icon> <span> 广告位置列表 </span>
                    </el-menu-item>

                </el-sub-menu>

                <el-menu-item index="/about">
                    <el-icon>
                        <IEpSetting />
                    </el-icon> <span> 关于 </span>
                </el-menu-item>

            </el-menu>
        </el-scrollbar>

    </el-aside>
</template>


<style lang="scss" scoped>
// scoped 表示局部样式   lang="scss" 表示使用scss语法

.el-aside {
    background-color: rgb(232.8, 233.4, 234.6);
    height: 100vh;
    width: auto;
}

.el-menu {
    width: 200px;
    background-color: rgb(232.8, 233.4, 234.6);
    border-right: none;

    &.el-menu--collapse {
        width: 60px;

        & h1 {
            display: none;
        }
    }

    .logo {
        display: flex; // 弹性布局,水平并排显示
        justify-content: center;
        align-items: center;
        height: 60px;
        text-decoration: none;
        color: #000;

        img {
            width: 32px;
            height: 32px;
        }
    }
}
</style>
