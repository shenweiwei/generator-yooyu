'use strict';

module.exports = function(yo, mkdirp) {

    // 创建src文件夹
    mkdirp('src');

    mkdirp('config');

    mkdirp('dist');

    mkdirp('asserts');

    // 创建public文件夹
    mkdirp('src/public');

    // 创建app文件夹
    mkdirp('src/app');

    // index.html
    yo.fs.copy(
        yo.templatePath('public/index.html'), //模板文件地址 
        yo.destinationPath('src/index.html'), //创建在根目录
    );

    // index.css
    yo.fs.copy(
        yo.templatePath('public/index.css'),
        yo.destinationPath('src/index.css')
    );

    // index.js
    yo.fs.copy(
        yo.templatePath('public/index.js'),
        yo.destinationPath('src/index.js')
    );

    // package.json
    yo.fs.writeJSON('package.json', yo.props.packagejson);

    // babel
    yo.fs.copy(
        yo.templatePath('public/.babelrc'), //模板文件地址 
        yo.destinationPath('.babelrc'), //创建在根目录
    );
};