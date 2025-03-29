<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import request from '@/utils/request'
import axios from 'axios';
// import { el } from 'element-plus/es/locales.mjs';
import { ElMessage } from 'element-plus'; // 手动导入 ElMessage


const dialogFormAddUser = ref(false);  // 添加用户-对话框
const dialogFromAddBread = ref(false); // 添加馒头-对话框
const createUserForm = reactive({
    //新增用户表单数据
    name: '',
    buyNumber: ''
});
const addBreadForm = reactive({
    //新增馒头表单数据
    id: -1,
    name: '',
    buyNumber: ''
});
interface User {
    // 定义 User 接口
    id: number;
    username: string;
    matchedNumber: number;
    rewardsNumber: number;
    totalNumber: number;
}
const tableData = ref<User[]>([]);  // 初始化 tableData 为一个空数组 用来装下所有用户信息
// 获取全部用户数据
const getAllUser = async () => {
    try {
        request({
            method: 'get',
            url: '/hello/getAll'
        }).then(res => {
            console.log(res.data.data);
            tableData.value = res.data.data;
        });
    } catch (error) {
        console.error('请求数据时出错:', error);
    }
};
// 添加用户
const addUser = () => {
    request({
        method: 'post',
        url: '/hello/add',
        data: {
            username: createUserForm.name,
            matchedNumber: createUserForm.buyNumber,
            rewardsNumber: 0,
            totalNumber: 0
        }
    }).then(res => {
        console.log('这里是新增', res.data.data);
        dialogFormAddUser.value = false;
        ElMessage({
            message: '提交成功！',
            type: 'success',
        });
        getAllUser();
        createUserForm.name = '';
        createUserForm.buyNumber = '';

    })
}
// 删除用户
const deleteUser = (id: number) => {
    console.log(id);
    request({
        method: 'get',
        url: `/hello/delete/${id}`
    }).then(res => {
        console.log(res.data.data);
        ElMessage({
            message: res.data.data,
            type: 'success',
        });
        getAllUser();
    })
}
// 添加馒头
const openDialogAddBread = (rowUser: User) => {
    //打开添加馒头页面
    console.log(rowUser);
    addBreadForm.name = rowUser.username;
    addBreadForm.id = rowUser.id;
    dialogFromAddBread.value = true;
}
const addBread = async () => {
    // 提交添加馒头的表单
    try {
        const response = await axios.post('http://localhost:8080/hello/addBread', null, {
            params: {
                addBreadUserid: addBreadForm.id,
                BreadNumber: addBreadForm.buyNumber
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log('馒头数量新增成功：', response.data);
        dialogFromAddBread.value = false;
        addBreadForm.buyNumber = '';
        ElMessage({
            message: response.data.data,
            type: 'success',
        });
        getAllUser();
    } catch (error) {
        console.error('馒头数量新增失败：', error);
    }
}

// 在组件挂载时调用 getAllUser 函数
onMounted(() => {
    getAllUser();
});



</script>


<template>
    <div class="header">
        <el-button type="success" style="margin-left: 10px;" @click="dialogFormAddUser = true">+ 新增客户</el-button>
    </div>

    <el-scrollbar>
        <el-table :data="tableData" border stripe style="width: 98%">
            <el-table-column prop="username" label="名字" width="180" />
            <el-table-column prop="matchedNumber" label="待匹配" width="180" />
            <el-table-column prop="rewardsNumber" label="奖励数量" width="180" />
            <el-table-column prop="totalNumber" label="共计购买数量" />
            <el-table-column label="操作">
                <template #default="scope"> <!--#default="scope"-->
                    <el-button type="primary" @click="openDialogAddBread(scope.row)">现买</el-button>
                    <el-button type="primary">修改</el-button>
                    <el-button type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogFormAddUser" title="新增用户信息" width="500">
            <el-form label-width="auto" style="max-width: 600px">
                <el-form-item label="用户姓名">
                    <el-input v-model="createUserForm.name" />
                </el-form-item>
                <el-form-item label="本次购买数量">
                    <el-input v-model="createUserForm.buyNumber" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addUser">创建</el-button>
                    <el-button @click="dialogFormAddUser = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog v-model="dialogFromAddBread" title="用户买入" width="500">
            <el-form label-width="auto" style="max-width: 600px">
                <el-form-item label="用户姓名">
                    <span>{{ addBreadForm.name }}</span>
                    <!-- <el-input v-model="form.name" /> -->
                </el-form-item>
                <el-form-item label="本次购买数量">
                    <el-input v-model="addBreadForm.buyNumber" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addBread">提交</el-button>
                    <el-button @click="dialogFormAddUser = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


    </el-scrollbar>

</template>


<style lang="scss" scoped>
.header {
    display: flex;
    margin-bottom: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1); // 边框颜色
    width: 98%;
    height: 50px;
    // justify-content: center; // 水平居中
    align-items: center; // 垂直居中
}

.el-table {
    margin-bottom: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    /* 四周阴影效果 */
    // display: flex;
    justify-content: center;
    align-items: center;
}
</style>
