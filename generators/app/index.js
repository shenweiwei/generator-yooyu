'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');
const prompList = require('./js/promp-list');

module.exports = class extends Generator {

    prompting() {
        // Have Yeoman greet the user.
        this.log(
            yosay(`Welcome to the cat\'s pajamas ${chalk.red('generator-yooyu')} generator!`)
        );

        return this.prompt(prompList).then((answers) => {
            this.props = answers;

            const packagejson = this.fs.readJSON(this.templatePath('public/package.json'));

            packagejson["name"] = answers.appname;

            if (answers.framework === 'Vue') {
                packagejson.dependencies["vue"] = '^2.5.17';
                packagejson.devDependencies["vue-loader"] = '^15.4.2';
                packagejson.devDependencies["vue-style-loader"] = '^4.1.2';
                packagejson.devDependencies["vue-template-compilerr"] = '^2.5.17';
                packagejson.devDependencies["vue-loader"] = '^15.4.2';
            }

            if (answers.ui === 'Framework 7') {
                packagejson.dependencies["framework7"] = '^3.5.2';
                packagejson.dependencies["framework7-icons"] = '^2.0.5';
                packagejson.dependencies["material-design-icons"] = '^3.0.1';
            }

            if (answers.ui === 'Framework 7' && answers.framework === 'Vue') {
                packagejson.dependencies["framework7-vue"] = '^2.3.0';
            }

            this.props.packagejson = packagejson;
        })
    }

    writing() {
        this.fs.copy(
            this.templatePath('dummyfile.txt'),
            this.destinationPath('dummyfile.txt')
        );
    }

    install() {
        this.installDependencies();
    }

    defaults() {
        if (path.basename(this.destinationPath()) !== this.props.appname) { //判断是否存在该目录
            this.log(
                'Your generator must be inside a folder named ' + this.props.appname + '\n' +
                'I\'ll automatically create this folder.'
            );
            mkdirp(this.props.appname); // 即 mkdir -p 创建该目录
            this.destinationRoot(this.destinationPath(this.props.appname));
        }
    }

    writing() {
        mkdirp('css'); //创建css文件夹
        mkdirp('js'); //创建js文件夹
        this.fs.copy( //调用方法将模板的内容创建到根目录
                this.templatePath('public/index.html'), //模板文件地址 
                this.destinationPath('index.html'), //创建在根目录
            ),

            this.fs.copy(
                this.templatePath('public/index.css'),
                this.destinationPath('css/index.css')
            );

        this.fs.copy(
            this.templatePath('public/index.js'),
            this.destinationPath('js/index.js')
        );

        this.fs.writeJSON('package.json', this.props.packagejson);
    };

}