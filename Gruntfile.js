module.exports = function (grunt) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        constants: {
            baseDir: 'public/js',
            distDir: 'public/dist'
        },
        shell: {
            start: {
                command: 'npm start'
            },
            test: {
                command: 'npm test'
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: '<%=constants.baseDir%>/lib',
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: false
                }
            }
        },
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            src: {
                options: {
                   livereload: true
                },
                tasks: ['jshint', 'concat'],
                files: ['public/**/*.html', 'public/**/*.js']
            }
        },
        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                ignores: []
            },
            all: ['Gruntfile.js', 'public/js/{,*/}*.js']
        },
        concat: {
            main: {
                dest: '<%=constants.distDir%>/teji.lunch.main.js',
                src: [
                    "<%=constants.baseDir%>/lib/vue/vue.js",
                    "<%=constants.baseDir%>/lib/director/director.js",
                    "<%=constants.baseDir%>/lib/jquery/jquery.js",
                    "<%=constants.baseDir%>/lib/flipsnap/flipsnap.js",
                    "<%=constants.baseDir%>/lib/moment/moment.js",
                    "<%=constants.baseDir%>/teji/lunch/getPackage.js",
                    "<%=constants.baseDir%>/teji/lunch/util.js",
                    "<%=constants.baseDir%>/teji/lunch/listShops.js",
                    "<%=constants.baseDir%>/teji/lunch/login.js",
                    "<%=constants.baseDir%>/teji/lunch/main.js"
                ]
            }
        },
        uglify: {
            options: {
                preserveComments: "some"
            },
            target: {
                files: {
                    "<%=constants.distDir%>/min/teji.lunch.main.js": ["<%= concat.main.dest %>"]
                }
            }
        }
    });

    grunt.registerTask('default', [
        'bower:install',
        'jshint',
        'concat',
        'watch'
    ]);

    grunt.registerTask('server', [
        'shell:start'
    ]);

    grunt.registerTask('product', [
        'bower:install',
        'jshint',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('test', [
        'shell:test'
    ]);
};
