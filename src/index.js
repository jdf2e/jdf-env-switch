import config from './config'
import Func from './Func'

export const Plugin = function () {
    return {
        setConfig: function (option) {
            Object.assign(config, option || {})
            
            if (config.pluginConfig) {
                // 合并buildTags
                config.buildTag = config.pluginConfig.buildTag || config.buildTag
                // 合并outputTags
                config.outputTag = config.pluginConfig.outputTag || config.outputTag
                // 合并tags
                if (config.pluginConfig.tags && config.pluginConfig.tags.length > 1) {
                    config.tags = config.tags.concat(config.pluginConfig.tags)
                    config.tags = config.tags.filter((item, idx, tags) => {
                        var firstIdx = tags.indexOf(item)
                        return firstIdx === idx
                    })
                }
            }
        },

        beforeBuild: function () {
            return Func.beforeBuild()
        },

        afterBuild: function () {
        },

        beforeTplRender: function (tpl, widgetInfo) {
            return tpl
        },

        beforeTplInsert: function (tpl, widgetInfo) {
            return tpl
        }
    }
}