let tag = 'dev'
let reg = new RegExp(`{%env-${tag}\\s+([\\s\\S]*?)env%}`, 'igm')

let str = `{%env-dev <div class="talent-nav"><a href="/html/search-result.html?type=deptCard">部门人才简历</a></div> env%}
{%env-prod
 <div class="talent-nav"><a href="/manage/search-result?type=deptCard">部门人才简历</a></div> 
env%}
{%env-dev <div class="talent-nav"></div> env%}`

let result = reg.exec(str)
str = str.replace(result[0], result[1])
result = reg.exec(str)
str = str.replace(result[0], result[1])
console.log(str)

// result = reg.exec(str)
// console.log(result)

// console.log(str.replace(reg, ''))