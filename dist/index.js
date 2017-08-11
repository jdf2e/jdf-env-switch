'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Plugin = undefined;

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Func = require('./Func');

var _Func2 = _interopRequireDefault(_Func);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Plugin = exports.Plugin = function Plugin() {
    return {
        setConfig: function setConfig(option) {
            Object.assign(_config2.default, option || {});

            if (_config2.default.pluginConfig) {
                // 合并buildTags
                _config2.default.buildTag = _config2.default.pluginConfig.buildTag || _config2.default.buildTag;
                // 合并outputTags
                _config2.default.outputTag = _config2.default.pluginConfig.outputTag || _config2.default.outputTag;
                // 合并tags
                if (_config2.default.pluginConfig.tags && _config2.default.pluginConfig.tags.length > 1) {
                    _config2.default.tags = _config2.default.tags.concat(_config2.default.pluginConfig.tags);
                    _config2.default.tags = _config2.default.tags.filter(function (item, idx, tags) {
                        var firstIdx = tags.indexOf(item);
                        return firstIdx === idx;
                    });
                }
            }
        },

        beforeBuild: function beforeBuild() {
            return _Func2.default.beforeBuild();
        },

        afterBuild: function afterBuild() {},

        beforeTplRender: function beforeTplRender(tpl, widgetInfo) {
            return tpl;
        },

        beforeTplInsert: function beforeTplInsert(tpl, widgetInfo) {
            return tpl;
        }
    };
};