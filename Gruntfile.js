module.exports = function (grunt) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        shell: {
            start: {
                command: 'npm start'
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'public/js/lib',
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
                files: ['./**/*.html', './**/*.js']
            }
        },
        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                ignores: []
            },
            all: [
                'Gruntfile.js',
                'public/js/{,*/}*.js'
            ]
        },
        requirejs: {
            main: {
                options: {
                    baseUrl: 'public/js',
                    name: 'teji/lunch/main',
                    mainConfigFile: 'public/js/teji/lunch/main.js',
                    out: 'public/dist/teji.lunch.main.js',
                    optimize: 'none'
                }
            },
            main_compressed: {
                options: {
                    baseUrl: 'public/js',
                    name: 'teji/lunch/main',
                    mainConfigFile: 'public/js/teji/lunch/main.js',
                    out: 'public/dist/teji.lunch.main.js'
                }
            },
            admin: {
                options: {
                    baseUrl: 'public/js',
                    name: 'teji/lunch/admin',
                    mainConfigFile: 'public/js/teji/lunch/admin.js',
                    out: 'public/dist/teji.lunch.admin.js',
                    optimize: 'none'
                }
            },
            admin_compressed: {
                options: {
                    baseUrl: 'public/js',
                    name: 'teji/lunch/admin',
                    mainConfigFile: 'public/js/teji/lunch/admin.js',
                    out: 'public/dist/teji.lunch.admin.js',
                }
            }
        }
    });

    grunt.registerTask('default', ['watch']);

    grunt.registerTask('serve', [
        'bower:install',
        'jshint',
        'requirejs:main',
        'requirejs:admin',
        'shell:start'
    ]);

    grunt.registerTask('product', [
        'bower:install',
        'jshint',
        'requirejs:main_compressed',
        'requirejs:admin_compressed'
    ]);
};
