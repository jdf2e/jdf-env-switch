'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    VFS: null,
    jdf: null,
    tags: ['dev', 'prod'],
    buildTag: 'dev',
    outputTag: 'prod',
    pluginConfig: null,
    projRoot: process.cwd(),
    tagReg: function tagReg(tag) {
        return new RegExp('{%env-' + tag + '\\s+([\\s\\S]*?)env%}', 'im');
    }
};