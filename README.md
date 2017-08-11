# jdf环境切换插件
是否烦恼在交付后端时需要切换url？是否烦恼html中引用的img标签本地开发和线上路径不一致？

环境切换插件帮你在`jdf output`时不再手动切换这些配置，一条命令，直接交付

## 语法示例
```
{%env-dev 
window.location.href = '/html/print.html';
env%}
{%env-prod
window.location.href = '/manage/print';    
env%}  
```

## 配置项
`config.json`的plugin属性里提供三个配置项:

tags指明工程中使用那些标签: `{%env-tag code here env%}`.

buildTag配置在`jdf build`阶段使用哪个tag

outputTag配置在`jdf output`阶段使用哪个tag

### 注意点
每个tag代表一个编译环境，因此所有tag都是互斥的，编译其中一个tag，其他tag里的内容将会清空


```
{
"name": "jdf-env-switch",
"tags": ["dev", "prod", "dev1"],
"buildTag": "dev",
"outputTag": "prod"
}
```

## 支持环境切换的文件
* html, htm, xhtml
* vm, smarty, tpl, jade,
* js, babel, es6
* json, yml

## 真实示例
* 切换html、vm、smarty文件里的url路径
``` html
手动切换：
<div class="talent-nav"><a href="/html/search-result.html?type=deptCard">部门人才简历</a></div>
<!-- <div class="talent-nav"><a href="/manage/search-result?type=deptCard">部门人才简历</a></div> -->

自动编译：
{%env-dev
<div class="talent-nav"><a href="/html/search-result.html?type=deptCard">部门人才简历</a></div>
env%}
{%env-prod
 <div class="talent-nav"><a href="/manage/search-result?type=deptCard">部门人才简历</a></div> 
env%}
```

* 切换js文件里的路径
``` js
手动切换：
window.location.href = '/html/print.html';
// window.location.href = '/manage/print';   

自动编译：
{%env-dev 
window.location.href = '/html/print.html';
env%}
{%env-prod
window.location.href = '/manage/print';    
env%}  
```
