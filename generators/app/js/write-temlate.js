'use strict';

module.exports = function(yo, mkdirp) {

    //创建css文件夹
    mkdirp('css');

    //创建js文件夹
    mkdirp('js');

    // index.html
    yo.fs.copy(
        yo.templatePath('public/index.html'), //模板文件地址 
        yo.destinationPath('index.html'), //创建在根目录
    );

    // index.css
    yo.fs.copy(
        yo.templatePath('public/index.css'),
        yo.destinationPath('css/index.css')
    );

    // index.js
    yo.fs.copy(
        yo.templatePath('public/index.js'),
        yo.destinationPath('js/index.js')
    );

    // package.json
    yo.fs.writeJSON('package.json', yo.props.packagejson);

    // babel
    yo.fs.copy(
        yo.templatePath('public/.babelrc'), //模板文件地址 
        yo.destinationPath('.babelrc'), //创建在根目录
    );
};