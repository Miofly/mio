`wx161b6221791a7340` `1024微应用`

`wx2de5f627b0461a70` `only` 

`wx1fcf825366c41614` `小招`

`wx8adbdb6a661538f6` `AiCamera Photo`

`wx8e25bd4ee4bff7e9` `实用功能大全`

`wx3ae32d7fae071a15` `还没想好做啥`

yarn 安装 

**npm install -g yarn**

**yarn config set registry https://registry.npm.taobao.org**

**yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass**

cnpm install @vue/cli -g 

publicPath 不支持，如果需要配置，请在 manifest.json->h5->router->base 中配置，参考文档：h5-router
outputDir 不支持
assetsDir 固定 static
pages 不支持
runtimeCompiler 固定 false
productionSourceMap 固定 false
css.extract H5 平台固定 false，其他平台固定 true
parallel 固定 false使用示例
