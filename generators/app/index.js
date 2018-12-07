'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');

const prompList = require('./js/promp-list');
const editPackage = require('./js/edit-package');
const writeTemlate = require('./js/write-temlate');

module.exports = class extends Generator {

    prompting() {
        // Have Yeoman greet the user.
        this.log(
            yosay(`Welcome to the cat\'s pajamas ${chalk.red('generator-yooyu')} generator!`)
        );

        return this.prompt(prompList).then((answers) => {
            this.props = answers;

            this.props.packagejson = editPackage(answers, this.fs.readJSON(this.templatePath('public/package.json')));
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
        writeTemlate(this, mkdirp);
    };

}