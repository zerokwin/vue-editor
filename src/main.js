import Vue from 'vue'
import VEditor from './VEditor'

new Vue({
    el: '#app',
    template: '<v-editor width="800px" height="300px" placeholder="请输入内容..." :toolsbar.sync="toolsbar" v-model="text" />',
    components: { VEditor },
    data: {
        text: '',
        toolsbar: []
    },
    watch: {
        text() {
            // console.log(this.text);
        }
    }
})
