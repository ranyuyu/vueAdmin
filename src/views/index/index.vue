<template>
    <div class="index">
        <!-- <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in dbLsit"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
            </el-option>
        </el-select> -->
        <el-button type="primary" @click="addModal">新增key</el-button>
         <el-button type="primary" @click="addModalx">新增行</el-button>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisiblex"
            width="30%"
            :before-close="handleClose">
            <div>
                <div>key 名字</div>
                <el-input v-model="fieldName" placeholder="请输入内容"></el-input>
            </div>
            <div>
                <div>类型</div>
               <el-input v-model="fieldValue" placeholder="请输入内容"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisiblex = false">取 消</el-button>
                <el-button type="primary" @click="handleSumitFile">确 定</el-button>
            </span>
            </el-dialog>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div>
                <div>key 名字</div>
                <el-input v-model="keyValue" placeholder="请输入内容"></el-input>
            </div>
            <div>
                <div>类型</div>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSumit">确 定</el-button>
            </span>
            </el-dialog>

        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :title="index" :name="index"  v-for="(item,index) in totalNumber" :key="index">
                <div class="item-index">
                     <div>
                         <div v-for="(items,idx) in keysList" :key="idx" @click="onChange(items)">{{ items }}</div>
                     </div>
                    <div class="item-view" v-if="selectKeysType == 'hash'">
                        <el-table
                        :data="tableData"
                        style="width:1400px">
                            <el-table-column
                                prop="name"
                                label="日期"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="key"
                                label="日期"
                                >
                            </el-table-column>

                              <el-table-column
                                prop="key"
                                label="操作"
                                
                                >
                                <template slot-scope="scope">
                                    <el-row>
                                        <el-button type="primary" icon="el-icon-edit" circle @click="handleDetails"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"></el-button>
                                    </el-row>
                                </template>
                                
                            </el-table-column>
                        </el-table>
                    </div>
                    
                    <div v-if="selectKeysType == 'string'" >
                        <h1>addString</h1>
                        <el-input v-model="valueString" placeholder="请输入内容"></el-input>
                         <el-button type="danger" icon="el-icon-delete" circle @click="handleString()">保存</el-button>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import { postApi } from '../../http/request'
import { MessageBox, Message } from 'element-ui'
export default {
    data(){
        return {
            valueString:"",
            fieldName:"",
            fieldValue:"",
             dialogVisiblex:false,
            dialogVisible:false,
            tableData:[
                
            ],
             host:"www.qyap.tech",
             password:"Qyap88",
             port:"6379",
             activeNames:[],
             totalNumber:"",
             keysList:[],
             keyValue:"",
             options: [{
                value: 'hash',
                label: 'hash'
                }, {
                value: 'string',
                label: 'string'
            }],
            value: '',
            selectKeysType:"",
            fileTypeName:""
        }
    },
    created(){
        this.queryAjax();
    },
    methods:{
        handleString(){
            // valueString
            this.value = "string"
          this.handleSumit()
        },
        handleSumitFile(){
              const { host , port , password ,fieldName , fieldValue , fileTypeName } = this
             let length = this.activeNames.length
                let db = this.activeNames[length-1]
            let formdata = new FormData();
                formdata.append('host',host);
                formdata.append('port',port);
                formdata.append('password',password);
                formdata.append('db',db);
                formdata.append('key',fileTypeName);
                formdata.append('value',fieldValue);
                formdata.append('field', fieldName );
                      postApi('/api/addHash',formdata, res => {
                        this.queryAjax()
                        this.onChange();
                        this.dialogVisiblex = false
                    })
        },
        handleDelete(val){
            console.log(val)
            const { host , port , password ,fieldValue , fieldName , fileTypeName} = this
            let length = this.activeNames.length
            let db = this.activeNames[length-1]
            let formdata = new FormData();
                formdata.append('host',host);
                formdata.append('port',port);
                formdata.append('password',password);
                formdata.append('db',db);
                formdata.append('key',fileTypeName);
              formdata.append('field',val.name);
                      postApi('/api/delHashField',formdata, res => {
                        // this.$message.sussage("删除成功")
                          Message({
                message:"删除成功",
                type: 'delHashField',
                duration: 5*1000
            })
            this.onChange()
                        this.queryAjax()
                        this.dialogVisiblex = false
                    })
        },
        handleDetails(){
                this.dialogVisiblex = true
        },
        handleSumit(){
            const { host , port , password ,value , fileTypeName } = this
             let length = this.activeNames.length
                let db = this.activeNames[length-1]
            let formdata = new FormData();
                formdata.append('host',host);
                formdata.append('port',port);
                formdata.append('password',password);
                formdata.append('db',db);
                formdata.append('key',keyValue);
                formdata.append('value',value);
                if(this.value == 'string'){
                     postApi('/api/addString',formdata, res => {
                        this.queryAjax()
                        this.dialogVisible = false
                    })
                } else {
                     formdata.append('field',keyValue);
                      postApi('/api/addHash',formdata, res => {
                        this.queryAjax()
                        this.dialogVisible = false
                    })
                }
               
        },
        addModal(){
            this.dialogVisible = true
        },
        addModalx(){
            this.dialogVisiblex = true
        },
        handleChange(val){
           const { host , port , password } = this
                let length = this.activeNames.length
                let db = this.activeNames[length-1]
                let formdata = new FormData();
                formdata.append('host',host);
                formdata.append('port',port);
                formdata.append('password',password);
                formdata.append('db',db);
            this.querydb(formdata);
        },
        removeClick(){

        },
        addClick(){

        },
        queryAjax(){
                const { host , port , password } = this
                  let formdata = new FormData();
                  formdata.append('host',host);
                  formdata.append('port',port);
                  formdata.append('password',password);
                  postApi('/api/getDbNum',formdata, res => {
                         this.totalNumber =  Number(res.db_num)
                        //  let data = formdata
                        //  data.db = res.db_num 
                        this.querydb(data);
                 })
        },
        querydb(data){
             postApi('/api/getKeys',data, res => {
                this.keysList = res.keys
            })
        },
        onChange(val){
                const { host , port , password , fileTypeName } = this
                if(val){
                     this.fileTypeName = val;
                }
                let length = this.activeNames.length
                let db = this.activeNames[length-1]
                let formdata = new FormData();
                formdata.append('host',host);
                formdata.append('port',port);
                formdata.append('password',password);
                formdata.append('db',db);
                formdata.append('key',val);
                
                postApi('/api/getValue',formdata, res => {
                    console.log(res,'formdata');
                    this.selectKeysType = res.value.type
                    if(res.value.type == 'hash'){
                        var arr = []
                        for(let i =0;i<res.value.value.length;i++){
                            let obj = {
                                name:res.value.value[i][0],    
                                key:res.value.value[i][1], 
                            }
                            arr.push(obj)
                        }
                        this.tableData =  arr
                    } else {

                    }
                })
        }
    },
    components:{
       
    }
}
</script>

<style scoped>
    .index{
        padding:20px;
    }
    .index .item-index{
        display:flex;
    }
    .index .item-index .item-view{
        margin-left:20px;
    }
</style>