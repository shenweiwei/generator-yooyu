'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {

    initPrompList() {
        const project = {
            type: 'input',
            name: 'appname',
            message: 'input your project name',
            default: this.appname,
            store: true
        };

        const framework = {
            type: 'list',
            name: 'framework',
            message: 'select your frontend framework',
            default: 'Vue',
            choices: [
                'Angular',
                'Vue',
                'Flutter',
                'React'
            ],
            store: true
        };

        let ui_framework = {
            type: 'list',
            name: 'ui',
            message: 'select your frontend ui framework',
            choices: [],
            when: function(answers) { // 当watch为true的时候才会提问当前问题
                answers.watch = true;

                if (answers.framework === 'Vue') {
                    ui_framework.choices.push('Framework 7');
                    ui_framework.choices.push('Element-ui');
                } else if (answers.framework === 'Angular') {
                    ui_framework.choices.push('OpenWMS');
                } else {
                    answers.watch = false;
                }

                return answers.watch
            },
            store: true
        };

        return [project, framework, ui_framework, ];
    }

    prompting() {
        // Have Yeoman greet the user.
        this.log(
            yosay(`Welcome to the cat\'s pajamas ${chalk.red('generator-yooyu')} generator!`)
        );

        return this.prompt(this.initPrompList()).then((answers) => {
            this.props = answers;
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
    };

}