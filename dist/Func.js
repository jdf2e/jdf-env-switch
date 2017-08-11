'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _jdfLog = require('jdf-log');

var _jdfLog2 = _interopRequireDefault(_jdfLog);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 执行环境切换的文件
 */
var extnameMap = {
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
};

exports.default = {
    beforeBuild: function beforeBuild() {
        var VFS = _config2.default.VFS;
        var jdf = _config2.default.jdf;

        var currentTag = _config2.default.buildTag;
        if (jdf.currentCommand === 'output') {
            currentTag = _config2.default.outputTag;
        }

        _jdfLog2.default.verbose('\u5F53\u524D\u6267\u884C\u73AF\u5883\u4E3A' + jdf.currentCommand + '\uFF0C\u4FDD\u7559{%env-' + currentTag + ' env%}\u5185\u5BB9\uFF0C\u5220\u9664\u5176\u4ED6{%env-xx env%}\u5185\u5BB9');
        _jdfLog2.default.info('current env: ' + jdf.currentCommand + ', current tag: {%env-' + currentTag + ' env%}');
        _jdfLog2.default.profile('clean env-switch label');

        VFS.travel(function (vfile, done) {
            var tPath = vfile.targetPath;
            var extname = _path2.default.extname(tPath).replace('.', '');
            if (!extnameMap[extname]) {
                return;
            }

            var content = vfile.originContent;
            _config2.default.tags.map(function (tag) {
                var reg = _config2.default.tagReg(tag);

                var result = reg.exec(content);
                while (result !== null) {
                    if (tag === currentTag) {
                        content = content.replace(result[0], result[1]);
                    } else {
                        content = content.replace(result[0], '');
                    }
                    result = reg.exec(content);
                }
            });
            vfile.originContent = content;
            vfile.targetContent = content;
        });
        _jdfLog2.default.profile('clean env-switch label');
    }
};