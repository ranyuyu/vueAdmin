<template>
    <div class="man">
        <el-button type="primary" @click="addModal" class="cx-but">打开日志</el-button>

           <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div>
                <div style="margin-bottom:20px">路径</div>
                <el-input v-model="pathValue" placeholder="请输入内容"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleSumit">确 定</el-button>
            </span>
            </el-dialog>

            
        <div class="left">
            left
        </div>
        <div class="right">
            rightContent
        </div>
    </div>
</template>

 <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
<script>

export default {
    data(){
        return {    
            dialogVisible:false,
            pathValue:""
        }
    },
    created(){
        this.queryAjax();
    },
    mounted(){
        this.$socket.emit('connect', 1);
    },
    sockets:{
        connect() {
            console.log('socket connected');
        },
        response(data){
            console.log("接收数据", data);
        },
        reconnect(data){
            console.log("重新连接", data);
            this.$socket.emit('connect', 1);
        },
        disconnect(data){
            console.log("断开连接", data);
            this.$socket.emit('leave', {});
        }
    },
    methods:{
        addModal(){
            this.dialogVisible = true
        },
         queryAjax(){
            $(document).ready(function () {
            var namespace = '/fileTail';
            var log_file = '/root/test/1.log';
            var socket = io.connect('http://' + document.domain + ':' + 8080 + namespace);
            socket.emit('client', {'log_file':log_});
            socket.on('response', function (res) {
                $('#terminal').append('<div>' + res.text + '</div>');
                $(document).scrollTop($(document).height()); // 将滚动条滚到最下方
                console.log(res.text);
            });

            $(window).bind('beforeunload', function () {    // 离开页面前关闭tail
                    socket.emit('leave', {});
                }
            );

        });
        }
    }
}
</script>

<style scoped>
    .man{
        width:100%;
        position: relative;
    }
    .man .cx-but{
        position: absolute;
        right:30px;
        top:20px;
    }
</style>