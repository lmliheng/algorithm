<script setup>
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const go_driver = () => {
  const driverObj = driver({
    showProgress: true,
    closeBtnText: "关闭",
    nextBtnText: "下一步",
    prevBtnText: "上一步",
    doneBtnText: "完成",

    steps: [{
        element: "#header-driver",
        popover: { title: '引导', description: '点击引导按钮，开始引导', side: "left", align: 'start' }
      },
      {
        element: "#header-fullscreen",
        popover: { title: '放大', description: '点击放大按钮，放大页面', side: "left", align: 'start' }
      },
      {
        element: "#header-i18n",
        popover: { title: '国际化', description: '点击国际化按钮，切换语言', side: "left", align: 'start' }
      },
      {
        element: "#header-breadcrumb",
        popover: { title: '面包屑', description: '点击面包屑按钮，返回上一级', side: "left", align: 'start' }
      },{
        element: "#header-left-2",
        popover: { title: '标签', description: '点击标签，切换标签，右键可唤起菜单操作标签', side: "left", align: 'start' }
      },{
        element: "#aside",
        popover: { title: '侧边栏', description: '点击侧边栏，切换侧边栏', side: "left", align: 'start' }
      }
    ],
  });

  driverObj.drive();
}
</script>
<template>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="引导"
        placement="bottom"
      >
        <svg width="20px" @click="go_driver" t="1777910225870" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5596" ><path d="M284.928 281.6H184.832V100.352A100.352 100.352 0 0 1 284.928 0h233.984a100.096 100.096 0 0 1 100.096 100.096v177.664h-100.096V100.352h-233.984z m233.984 335.616h100.096v307.2A100.096 100.096 0 0 1 518.912 1024h-233.984a100.352 100.352 0 0 1-100.096-99.84V614.4h100.096m233.984 409.6" p-id="5597"></path><path d="M804.608 627.2H99.84A100.096 100.096 0 0 1 0 527.36v-234.24a100.096 100.096 0 0 1 99.84-99.84h704.768a51.2 51.2 0 0 1 35.072 14.336l168.96 167.168a49.664 49.664 0 0 1 0 70.912l-168.96 167.168a51.2 51.2 0 0 1-35.072 14.336zM99.84 527.36h684.032l118.528-117.76-118.528-117.248H99.84v235.008z m0 0" p-id="5598"></path><path d="M668.416 458.752H224.256a51.2 51.2 0 1 1 0-100.096h444.16a51.2 51.2 0 0 1 0 100.096z m0 0" p-id="5599"></path></svg>
    </el-tooltip>
</template>
