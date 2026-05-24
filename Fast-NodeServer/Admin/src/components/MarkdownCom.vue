<script setup>
    import { ref,onMounted } from 'vue'

    import Editor from '@toast-ui/editor';
   import '@toast-ui/editor/dist/toastui-editor.css';
   import '@toast-ui/editor/dist/toastui-editor.css';
    import '@toast-ui/editor/dist/i18n/zh-cn';
//    import 'tui-color-picker/dist/tui-color-picker.css';
//    import '@toast-ui/editor/dist/toastui-editor-icons.css';
    
    onMounted(() => {
        const editor = new Editor({
        el: document.querySelector('#editor-container'),
        lang: 'zh-CN',
        height: '500px',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        initialValue: '# 欢迎使用 tui.editor'
           
});
       
    })
</script>
<template>
   <div  id="editor-container" style="width: 100%; height: 500px; margin-bottom: 20px;"></div>
</template>
