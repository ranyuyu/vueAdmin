<template>
    <div class="index">
       <h1>index home</h1>
    </div>
</template>

<script>
import { postApi } from '../../http/request'
export default {
    data(){
        return {

        }
    },
    created(){
        this.queryAjax();
    },
    methods:{
        queryAjax(){
               let data = {
                    doctorId:10193,
                    isOpen:1
                }
               postApi('/live-app/app/findLjDoctor', data, res => {})
        }
    },
    components:{
       
    }
}
</script>

<style scoped>

</style>