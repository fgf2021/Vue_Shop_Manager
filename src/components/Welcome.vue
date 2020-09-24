<template>
    <div class="welcome">
        <div class="text">
            <div>
                <p>欢迎使用电商后台管理系统</p>
                <p>Welcome to the e-commerce background management system</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
    .welcome{
        border-radius: 5px;
        height: 100%;
        background-image: url('../assets/img/welcome.jpg');
        background-size: 100%;
        .text{
            border-radius: 5px;
            height: 100%;
            background-color: rgba(0,0,0,.6);
            text-align: center;
            overflow: hidden;
            div{
                margin-top:180px ;
            }
            p:nth-of-type(1){
                font-size: 32px;
                font-weight: 700;
                line-height: 60px;
                color: #fff;
            }
            p:nth-of-type(2){
                font-size: 20px;
                font-weight: 300;
                color: #fff;
            }
        }

    }
</style>