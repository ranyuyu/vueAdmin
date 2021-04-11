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
               console.log('queryAjax');
               let data = {

               }
               postApi('getDbNum', data, res => {})
        }
    },
    components:{
       
    }
}
</script>

<style scoped>

</style>