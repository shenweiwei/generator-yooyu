'use strict';

module.exports = (function() {

    const project = {
        type: 'input',
        name: 'appname',
        message: 'input your project name',
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
            'Flutter'
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
                ui_framework.choices.push('Framework 7');
                ui_framework.choices.push('OpenWMS');
            } else {
                answers.watch = false;
            }

            return answers.watch
        },
        store: true
    };

    return [project, framework, ui_framework];
}());