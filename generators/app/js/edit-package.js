'use strict';

module.exports = function(answers, packagejson) {
    packagejson["name"] = answers.appname;

    if (answers.framework === 'Vue') {
        packagejson.dependencies["vue"] = '^2.5.17';
        packagejson.devDependencies["vue-loader"] = '^15.4.2';
        packagejson.devDependencies["vue-style-loader"] = '^4.1.2';
        packagejson.devDependencies["vue-template-compilerr"] = '^2.5.17';
        packagejson.devDependencies["babel-helper-vue-jsx-merge-props"] = '^2.0.3';
        packagejson.devDependencies["babel-plugin-transform-vue-jsx"] = '^4.0.1';
    }

    if (answers.ui === 'Framework 7') {
        packagejson.dependencies["framework7"] = '^3.5.2';
        packagejson.dependencies["framework7-icons"] = '^2.0.5';
        packagejson.dependencies["material-design-icons"] = '^3.0.1';
    }

    if (answers.ui === 'Framework 7' && answers.framework === 'Vue') {
        packagejson.dependencies["framework7-vue"] = '^2.3.0';
    }

    return packagejson;

};