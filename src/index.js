import config from './config'
import Func from './Func'

export const Plugin = function () {
    return {
        setConfig: function (option) {
            Object.assign(config, option || {})
            
            if (config.pluginConfig) {
                config.prefix = config.pluginConfig.prefix || config.prefix
            }
        },

        beforeBuild: function () {
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