export default {
    VFS: null,
    jdf: null,
    tags: ['dev', 'prod'],
    buildTag: 'dev',
    outputTag: 'prod',
    pluginConfig: null,
    projRoot: process.cwd(),
    tagReg: function (tag) {
        return new RegExp(`{%env-${tag}\\s+([\\s\\S]*?)env%}`, 'im')
    }
}