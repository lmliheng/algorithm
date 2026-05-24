<script setup>
import { ref, onMounted } from 'vue'
import { requestPermissionList } from '../../composables/useRequest';

const permissionList = ref([])
const tableLayout = ref('fixed')
const loading = ref(false)
const getPermissionList = async () => {
    loading.value = true
    const res = await requestPermissionList()
    permissionList.value = res.data
    loading.value = false
                                                                   
}



const tableData = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ],
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
]



onMounted(() => {
    getPermissionList()
})



</script>

<!-- [
    {
        "id": "1",
        "permissionName": "员工管理",
        "permissionMark": "userManage",
        "permissionDesc": "员工管理菜单",
        "children": [
            {
                "id": "1-1",
                "permissionName": "分配角色",
                "permissionMark": "distributeRole",
                "permissionDesc": "为员工分配角色"
            },
            {
                "id": "1-2",
                "permissionName": "导入员工",
                "permissionMark": "importUser",
                "permissionDesc": "通过 excel 导入员工"
            },
            {
                "id": "1-3",
                "permissionName": "删除员工",
                "permissionMark": "removeUser",
                "permissionDesc": "删除员工"
            }
        ]
    },
    {
        "id": "2",
        "permissionName": "角色列表",
        "permissionMark": "roleList",
        "permissionDesc": "角色列表菜单",
        "children": [
            {
                "id": "2-1",
                "permissionName": "分配权限",
                "permissionMark": "distributePermission",
                "permissionDesc": "为角色分配权限"
            }
        ]
    },
    {
        "id": "3",
        "permissionName": "权限列表",
        "permissionMark": "permissionList",
        "permissionDesc": "权限列表菜单",
        "children": []
    },
    {
        "id": "4",
        "permissionName": "文章排名",
        "permissionMark": "articleRanking",
        "permissionDesc": "文章排名菜单",
        "children": []
    },
    {
        "id": "5",
        "permissionName": "创建文章",
        "permissionMark": "articleCreate",
        "permissionDesc": "创建文章页面",
        "children": []
    }
] -->
<template>
    <el-table
      :data="permissionList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :table-layout="tableLayout"
      v-loading="loading"
      :tree-props="{ children: 'children' }"
      
    >
      <el-table-column prop="id" :label="$t('permission_id')" sortable />
      <el-table-column align="center" prop="permissionName" :label="$t('permission_name')" sortable />
      <el-table-column align="center" prop="permissionMark" :label="$t('permission_mark')" sortable />
      <el-table-column align="center" prop="permissionDesc" :label="$t('permission_description')" sortable />
    </el-table>
</template>