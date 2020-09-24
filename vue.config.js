
module.exports = {
     chainWebpack:config =>{
        config.when(process.env.NODE_ENV === 'production',config=>{
            config.entry('app').clear().add('./src/main-prod.js')
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                lodash: '_',
                echarts: 'echarts',
                nprogress: 'NProgress',
                'vue-quill-editor': 'VueQuillEditor'
              })
        })
        config.when(process.env.NODE_ENV==='development',config=>{
            config.entry('app').clear().add('./src/main-dev.js')
        })
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
   
}