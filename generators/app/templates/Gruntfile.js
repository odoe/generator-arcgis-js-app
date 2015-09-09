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
          reporters: ['Pretty']
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
      },
      built: {
        src: [
          '<%= project.built %>'
        ]
      },
      release: {
        src: [
          '<%= project.release %>'
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
            '!app/**/**/nls/*.js',
            '!dojoConfig.js', '!**/*Spec.js', '!**/**/*Spec.js'
          ],
          dest: '<%= project.dist %>/app'
        }]
      }
    },
    stylus: {
      dev: {
        options: {
          compress: false,
        },
        files: {
          '<%= project.dist %>/app/styles/main.css': [
            '<%= project.src %>/app/styles/*.styl',
            '<%= project.src %>/app/components/**/css/*.styl'
          ]
        }
      },
      build: {
        options: {
          compress: false
        },
        files: {
          '<%= project.built %>/app/styles/main.css': [
            '<%= project.dist %>/app/styles/*.css'
          ]
        }
      }
    },
    copy: {
      dev: {
        cwd: '<%= project.src %>/',  // set working folder / root to copy
        src: [
          'dojoConfig.js', 'index.html', 'app/dmodel/**/*',
          'app/app.profile.js', 'app/package.json',
          'app/templates/*.html', 'app/components/**/templates/*.html',
          'app/**/**/nls/*.js'
        ],
        dest: '<%= project.dist %>/',    // destination folder
        expand: true           // required when using cwd
      },
      build: {
        cwd: '<%= project.dist %>/',  // set working folder / root to copy
        src: [
          'index.html'
        ],
        dest: '<%= project.built %>/',    // destination folder
        expand: true           // required when using cwd
      },
      release: {
        cwd: '<%= project.built %>/',
        src: [
          'index.html',
          'resources/**',
          'app.css'
        ],
        dest: '<%= project.release %>/',
        expand: true
      },
      releaseapp: {
        src: '<%= project.built %>/dojo/dojo.js',
        dest: '<%= project.release %>/app.js'
      }
    },
    inject: {
      single: {
        scriptSrc: 'scripts/livereload.js',
        files: {
          'dist/index.html': 'src/index.html'
        }
      },
      multiple: {
        scriptSrc: ['./scripts/**.js'],
        files: [{
          expand: true,
          cwd: 'src',
          src: ['index.html'],
          dest: 'dist'
        }]
      }
    },
    processhtml: {
      dist: {
        files: {
          '<%= project.built %>/index.html': '<%= project.dist %>/index.html'
        }
      }
    },
    staticinline: {
        main: {
            files: {
                '<%= project.built %>/index.html': '<%= project.release %>/index.html',
            }
        }
    },
    cssurlcopy: {
      options: {
        root: 'built',
        dest: 'built/app.css'
      },
      main: {
        files: [{
        src: [
          'built/app/styles/main.css'
        ]
      }]
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
        tasks: ['babel'],
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
        cssOptimize: false,
        dojo: 'dist/dojo/dojo.js', // Path to dojo.js file in dojo source
        load: 'build', // Optional: Utility to bootstrap (Default: 'build')
        // profiles: [], // Optional: Array of Profiles for build
        // appConfigFile: '', // Optional: Config file for dojox/app
        // package: '', // Optional: Location to search package.json (Default: nothing)
        // packages: [], // Optional: Array of locations of package.json (Default: nothing)
        // require: '', // Optional: Module to require for the build (Default: nothing)
        // requires: [], // Optional: Array of modules to require for the build (Default: nothing)
        releaseDir: '../built', // Optional: release dir rel to basePath (Default: 'release')
        cwd: './' // Directory to execute build within
        // dojoConfig: '', // Optional: Location of dojoConfig (Default: null),
        // Optional: Base Path to pass at the command line
        // Takes precedence over other basePaths
        // Default: null
        // basePath: './dist'
      }
    },
  });

  grunt.registerTask('e2e', [
    'run:webdriver',
    'intern',
    'stop:webdriver'
  ]);

  grunt.registerTask('dev', ['inject:single', 'http-server', 'watch']);
  grunt.registerTask('release', ['default', 'clean:release', 'clean:built', 'copy:build', 'dojo', 'processhtml', 'cssurlcopy', 'copy:release', 'copy:releaseapp']);
  grunt.registerTask('build', ['default', 'clean:built', 'copy:build', 'dojo', 'processhtml']);
  grunt.registerTask('initialize', ['esri_slurp', 'default']);
  grunt.registerTask('default', ['clean:dist', 'eslint', 'babel:dev', 'stylus:dev', 'copy:dev', 'inject:single']);
};
