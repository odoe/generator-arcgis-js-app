module.exports = function (grunt) {
  'use strict';
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('intern');
  // config
  var projectConfig = grunt.file.readJSON('gruntconfig.json');
  grunt.initConfig({
    project: projectConfig,
    pkg: grunt.file.readJSON('package.json'),
    esri_slurp: {
      options: {
        version: '<%= project.esriapi %>'
      },
      dev: {
        options: {
          beautify: false
        },
        dest: '<%= project.dist %>/esri'
      },
      travis: {
        dest: '<%= project.dist %>/esri'
      }
    },
    intern: {
      dev: {
        options: {
          runType: 'runner',
          config: 'tests/intern',
          reporters: ['pretty']
        }
      }
    },
    'http-server': {
      dev: {
        root: '.',
        runInBackground: true
      }
    },
    run: {
      options: {
        wait: false
      },
      webdriver: {
        cmd: 'java',
        args: [
          '-jar',
          'tests/lib/selenium-server-standalone-2.46.0.jar',
          '-Dwebdriver.chrome.driver=node_modules/chromedriver/bin/chromedriver'
        ]
      }
    },
    clean: {
      dist: {
        src: [
          '<%= project.dist %>/*',
          '!<%= project.dist %>/dmodel/**',
          '!<%= project.dist %>/esri/**',
          '!<%= project.dist %>/dojo/**',
          '!<%= project.dist %>/dijit/**',
          '!<%= project.dist %>/dojox/**',
          '!<%= project.dist %>/put-selector/**',
          '!<%= project.dist %>/xstyle/**',
          '!<%= project.dist %>/dgrid/**',
          '!<%= project.dist %>/dstore/**',
          '!<%= project.dist %>/util/**',
          '!<%= project.dist %>/dgauges/**'
        ]
      }
    },
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      target: [
        '<%= project.src %>/app/main.js',
        '<%= project.src %>/app/router.js',
        '<%= project.src %>/app/components/**/*.js',
        '<%= project.src %>/app/helpers/**/*.js',
        '<%= project.src %>/app/templates/**/*.js'
      ]
    },
    babel: {
      options: {
        sourceMap: true,
        // experimental: true,
        modules: 'amd'
      },
      dev: {
        files: [{
          expand: true,
          cwd: '<%= project.src %>/app',
          src: [
            '*.js', '**/*.js', '**/**/*.js',
            '!dmodel/*',
            '!app.profile.js',
            '!dojoConfig.js', '!**/*Spec.js', '!**/**/*Spec.js'
          ],
          dest: '<%= project.dist %>/app'
        }]
      }
    },
    stylus: {
      dev: {
        files: {
          '<%= project.dist %>/app/styles/main.css': [
            '<%= project.src %>/app/styles/*.styl',
            '<%= project.src %>/app/components/**/css/*.styl'
          ]
        }
      }
    },
    copy: {
      main: {
        cwd: '<%= project.src %>/',  // set working folder / root to copy
        src: [
          'dojoConfig.js', 'index.html', 'app/dmodel/**/*',
          'app/app.profile.js', 'app/package.json',
          'app/templates/*.html', 'app/components/**/*.html'
        ],
        dest: '<%= project.dist %>/',    // destination folder
        expand: true           // required when using cwd
      }
    },
    watch: {
      styles: {
        files: [
          '<%= project.src %>/app/styles/*.styl',
          '<%= project.src %>/app/components/**/css/*.styl'
        ],
        tasks: ['stylus:dev'],
        options: {
          livereload: true,
        }
      },
      js: {
       files: [
          '<%= project.src %>/app/*.js', '<%= project.src %>/app/**/*.js',
          '<%= project.src %>/app/**/**/*.js',
          'tests/*.js', 'tests/unit/*.js',
          'tests/support/*.js', 'tests/functional/*.js'
        ],
        tasks: ['babel:dev'],
        options: {
          livereload: true,
        }
      },
      others: {
        files: [
          '<%= project.src %>/dojoConfig.js', '<%= project.src %>/index.html', '<%= project.src %>/app/dmodel/**/*',
          '<%= project.src %>/app/templates/*.html', '<%= project.src %>/app/components/**/*.html'
        ],
        tasks: ['copy:dev'],
        options: {
          livereload: true,
        }
      }
    },
    dojo: {
      dist: {
        options: {
          profile: 'profiles/build.profile.js', // Profile for build
        }
      },
      options: {
        dojo: 'dist/dojo/dojo.js', // Path to dojo.js file in dojo source
        load: 'build', // Optional: Utility to bootstrap (Default: 'build')
        // profiles: [], // Optional: Array of Profiles for build
        // appConfigFile: '', // Optional: Config file for dojox/app
        // package: '', // Optional: Location to search package.json (Default: nothing)
        // packages: [], // Optional: Array of locations of package.json (Default: nothing)
        // require: '', // Optional: Module to require for the build (Default: nothing)
        // requires: [], // Optional: Array of modules to require for the build (Default: nothing)
        releaseDir: '../release', // Optional: release dir rel to basePath (Default: 'release')
        cwd: './', // Directory to execute build within
        // dojoConfig: '', // Optional: Location of dojoConfig (Default: null),
        // Optional: Base Path to pass at the command line
        // Takes precedence over other basePaths
        // Default: null
        basePath: './dist'
      }
    },
  });

  grunt.registerTask('e2e', [
    'run:webdriver',
    'intern',
    'stop:webdriver'
  ]);

  grunt.registerTask('dev', ['http-server', 'watch']);
  grunt.registerTask('build', ['default', 'dojo']);
  grunt.registerTask('default', ['clean', 'eslint', 'babel:dev', 'stylus:dev', 'copy']);
};
