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
            distDir: 'public/dist',
            namespace: 'teji/lunch'
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
                tasks: ['jshint', 'requirejs:main', 'requirejs:admin'],
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
        requirejs: {
            main: {
                options: {
                    baseUrl: '<%=constants.baseDir%>',
                    name: '<%=constants.namespace%>/main',
                    mainConfigFile: '<%=constants.baseDir%>/<%=constants.namespace%>/main.js',
                    out: '<%=constants.distDir%>/teji.lunch.main.js',
                    optimize: 'none'
                }
            },
            main_compressed: {
                options: {
                    baseUrl: '<%=constants.baseDir%>',
                    name: '<%=constants.namespace%>/main',
                    mainConfigFile: '<%=constants.baseDir%>/<%=constants.namespace%>/main.js',
                    out: '<%=constants.distDir%>/teji.lunch.main.js',
                }
            },
            admin: {
                options: {
                    baseUrl: '<%=constants.baseDir%>',
                    name: '<%=constants.namespace%>/admin',
                    mainConfigFile: '<%=constants.baseDir%>/<%=constants.namespace%>/admin.js',
                    out: '<%=constants.distDir%>/teji.lunch.admin.js',
                    optimize: 'none'
                }
            },
            admin_compressed: {
                options: {
                    baseUrl: '<%=constants.baseDir%>',
                    name: '<%=constants.namespace%>/admin',
                    mainConfigFile: '<%=constants.baseDir%>/<%=constants.namespace%>/admin.js',
                    out: '<%=constants.distDir%>/teji.lunch.admin.js',
                }
            }
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'requirejs:main',
        'requirejs:admin',
        'watch'
    ]);

    grunt.registerTask('server', [
        'shell:start'
    ]);

    grunt.registerTask('product', [
        'bower:install',
        'jshint',
        'requirejs:main_compressed',
        'requirejs:admin_compressed'
    ]);

    grunt.registerTask('test', [
        'shell:test'
    ]);
};
