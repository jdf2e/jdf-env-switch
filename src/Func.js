import config from './config'
import logger from 'jdf-log'
import path from 'path'

/**
 * 执行环境切换的文件
 */
const extnameMap = {
    html: true,
    htm: true,
    xhtml: true,
    vm: true,
    smarty: true,
    tpl: true,
    jade: true,
    js: true,
    babel: true,
    es6: true,
    json: true,
    yml: true
}

export default {
    beforeBuild: function () {
        let VFS = config.VFS
        let jdf = config.jdf

        let currentTag = config.buildTag
        if (jdf.currentCommand === 'output') {
            currentTag = config.outputTag
        }

        logger.verbose(`当前执行环境为${jdf.currentCommand}，保留{%env-${currentTag} env%}内容，删除其他{%env-xx env%}内容`)
        logger.info(`current env: ${jdf.currentCommand}, current tag: {%env-${currentTag} env%}`)
        logger.profile(`clean env-switch label`)

        VFS.travel((vfile, done) => {
            let tPath = vfile.targetPath
            let extname = path.extname(tPath).replace('.', '')
            if (!extnameMap[extname]) {
                return;
            }

            let content = vfile.originContent
            config.tags.map(tag => {
                let reg = config.tagReg(tag)

                let result = reg.exec(content)
                while(result !== null) {
                    if (tag === currentTag) {
                        content = content.replace(result[0], result[1])
                    }
                    else {
                        content = content.replace(result[0], '')
                    }
                    result = reg.exec(content)
                }
            })
            vfile.originContent = content
            vfile.targetContent = content
        })
        logger.profile(`clean env-switch label`)
    }
}