<template>
    <div id="login" class="m-bgImage" style="width: 100%; height: 100vH;">

        <div class="m-cover">
            <div style="padding: 6em; box-sizing: border-box; text-align: center;">
                <h1 style="font-size: 3.8em;font-weight: 400;color: #FFF;">五溪水协会智慧水价信息管理平台</h1>
            </div>

            <div style="box-sizing: border-box; text-align: center; ">
                <div style=" max-width: 500px; width: 100%; text-align: left; display: inline-block;  background-color: rgba(255, 255, 255, 0.85); padding: 50px 30px 30px 30px; box-sizing: border-box; border-radius: 2px;">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="账号">
                            <el-input v-model="form.acc" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.pwd" type="password" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-right" @click="RouterLink" :loading="loading" style="margin-left:228px;width:130px;">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <p style="font-size: 12px; color: #fff; margin: 2em; text-align: center;">2023 © 五溪水协会智慧水价信息管理平台 版权所有</p>
        </div>

    </div>

</template>


<script>
    export default {
        name:"LoginYuejin",
        components: {
        },
        props: {
            sys: {},
        },
        data() {
            return {
                loading: false,
                form: {
                    sys: '',
                    acc: '',
                    pwd: '',
                    remember: true,
                },
                 responseResult:'',
            }
        },
        mounted: function () {
            
        },
        methods: {
            RouterLink() {
                if (this.form.acc=='') {
                   this.$message({
                      message: '帐号不能为空!',
                      type: 'warning'
                    }); 
                }else
                if (this.form.pwd==''||this.form.pwd.length<4) {
                    this.$message({
                      message: '密码不能为空，且长度不小于4!',
                      type: 'warning'
                    });
                }else{
                    this.axios.get('/'+this.$WarmTable+'/waterprice/checkloginname',{params:{loginname:this.form.acc,loginpass:this.form.pwd,showsign:"WX"}}).then((res)=>{
                        if (res.data.checksign == "no") {
                            this.$message({
                              message: res.data.warning,
                              type: 'warning'
                            });
                        }else{
                            this.Cook.set("username",this.form.acc);
                            this.Cook.set("channelcode","V102000000");
                            this.Cook.set("channelname","五溪干渠");
                            this.Cook.set("usertype","WX");
                            this.Cook.set("title","五溪水协会");
                            this.Cook.set("loginurl",'/loginwuxi');
                            this.$router.push({path: '/home'});
                        }
                    });
                }
            }
        }


    }
</script>

<style type="text/css">
    * {
        margin: 0;
        padding: 0;
    }
    #login{
        background-image:url(../assets/gglogin.jpg);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    .m-cover {
        background-color: rgba(74, 74, 74, 0.4);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding-top:60px;
    }

    .el-icon-upload {
        width: 48px;
        height: 48px;
    }

    .appicon {
        width: 65px;
        height: 65px;
        /*border: 1px solid white;*/
        position: relative;
        top: 2%;
        left: 2%;
        text-align: center;
        cursor: pointer;
    }

    .appicon:hover {
        border: 1px solid white;
    }

    .appicon:hover .el-icon-upload {
        color: white;
    }

    .appname {
        font-size: 12px;
        position: relative;
        top: 0%;

    }

    .el-icon-upload {
        font-size: 48px;
        position: relative;
        top: 10%;
    }
</style>
