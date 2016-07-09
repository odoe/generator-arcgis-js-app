var chromedriver = require('chromedriver');

module.exports = function (grunt) {
  'use strict';
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('intern');
  // config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    clean: {
      dist: {
        src: [
          'dist/*',
          '!dist/dmodel/**',
          '!dist/esri/**',
          '!dist/dojo/**',
          '!dist/dijit/**',
          '!dist/dojox/**',
          '!dist/put-selector/**',
          '!dist/xstyle/**',
          '!dist/dgrid/**',
          '!dist/dstore/**',
          '!dist/util/**',
          '!dist/moment/**'
        ]
      },
      built: {
        src: [
          'built'
        ]
      },
      release: {
        src: [
          'release'
        ]
      }
    },
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      target: [
        'src/app/main.js',
        'src/app/router.js',
        'src/app/components/**/*.js',
        'src/app/helpers/**/*.js',
        'src/app/templates/**/*.js'
      ]
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-es2015-modules-amd']
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'src/app',
          src: [
            '*.js', '**/*.js', '**/**/*.js',
            '!dmodel/*',
            '!app.profile.js',
            '!app/**/**/nls/*.js',
            '!dojoConfig.js', '!**/*Spec.js', '!**/**/*Spec.js'
          ],
          dest: 'dist/app'
        }]
      }
    },<% if (stylus) { %>
    stylus: {
      dev: {
        options: {
          compress: false,
        },
        files: {
          'dist/app/styles/main.css': [
            'src/app/styles/*.styl',
            'src/app/components/**/css/*.styl'
          ]
        }
      },
      build: {
        options: {
          compress: false
        },
        files: {
          'built/app/styles/main.css': [
            'dist/app/styles/*.css'
          ]
        }
      }
    },<% } else if (sass) { %>
    sass: {
      dev: {
        options: {
          includePaths: [
          ],
          sourceMap: true,
          compress: false
        },
        files: {
          './dist/app/styles/main.css': './src/app/styles/main.scss'
        }
      },
      build: {
        options: {
          includePaths: [
          ],
          sourceMap: false,
          compress: true
        },
        files: {
          './built/app/styles/main.css': './dist/app/styles/main.css'
        }
      }
    },<% } %>
    copy: {
      dev: {
        cwd: 'src/',  // set working folder / root to copy
        src: [
          'dojoConfig.js', 'index.html', 'app/dmodel/**/*',
          'robots.txt', 'crossdomain.xml',
          'app/app.profile.js', 'app/package.json',
          'app/templates/*.html', 'app/components/**/templates/*.html',
          'app/**/**/nls/*.js'
        ],
        dest: 'dist/',    // destination folder
        expand: true           // required when using cwd
      },
      build: {
        cwd: 'dist/',  // set working folder / root to copy
        src: [
          'index.html', 'robots.txt', 'crossdomain.xml',
        ],
        dest: 'built/',    // destination folder
        expand: true           // required when using cwd
      },
      release: {
        cwd: 'built/',
        src: [
          'index.html',
          'robots.txt', 'crossdomain.xml',
          'resources/**',
          'app.css',
        ],
        dest: 'release/',
        expand: true
      },
      releasevtiles: {
        src: 'built/esri/layers/vector-tile.js',
        dest: 'release/vector-tile.js'
      },
      releaseapp: {
        src: 'built/dojo/dojo.js',
        dest: 'release/app.js'
      },
      releaseconfig: {
        src: 'dist/app/config.js',
        dest: 'release/config.js'
      },
      // need this because it's in dojo code, not css
      releaseblank: {
        src: 'built/dojo/resources/blank.gif',
        dest: 'release/resources/blank.gif'
      }
    },
    processhtml: {
      dist: {
        files: {
          'built/index.html': 'dist/index.html'
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
    cacheBust: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 16,
        deleteOriginals: true
      },
      assets: {
        files: [{
          src: ['release/index.html']
        }]
      }
    },
    watch: {
      styles: {
        files: [
          'src/app/styles/*.styl',
          'src/app/components/**/css/*.styl'
        ],
        tasks: ['stylus:dev'],
        options: {
          livereload: true,
        }
      },
      js: {
        files: [
          'src/app/*.js', 'src/app/**/*.js',
          'src/app/**/**/*.js',
          'tests/*.js', 'tests/unit/*.js',
          'tests/support/*.js', 'tests/functional/*.js'
        ],
        tasks: ['babel'],
        options: {
          livereload: true,
        }
      },
      dev: {
        files: [
          'src/dojoConfig.js', 'src/index.html', 'src/app/dmodel/**/*',
          'src/app/templates/*.html', 'src/app/components/**/*.html'
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

  grunt.registerTask('chromedriver', 'start/stop chromedriver', function() {
    var args = [
      '--port=4444',
      '--url-base=wd/hub'
    ];
    if (arguments.length === 0) {
      grunt.verbose.writeln('starting chromedriver');
      chromedriver.start(args);
    } else {
      // called w/ :stop
      grunt.verbose.writeln('stopping chromedriver');
      chromedriver.stop();
    }
  });

  grunt.registerTask('e2e', [
    'chromedriver',
    'intern',
    'chromedriver:stop'
  ]);

  grunt.registerTask('dev', ['http-server', 'watch']);
  grunt.registerTask('release', [
    'default', 'clean:release', 'clean:built', 'copy:build',
    'dojo', 'processhtml', 'cssurlcopy',
    'copy:release', 'copy:releaseapp', 'copy:releasevtiles',
    'copy:releaseblank', 'copy:releaseconfig',
    'cacheBust']);
  grunt.registerTask('build', ['default', 'clean:built', 'copy:build', 'dojo', 'processhtml']);
  grunt.registerTask('initialize', ['default']);
  grunt.registerTask('default', ['clean:dist', 'eslint', 'babel:dev', <% if (stylus) { %>'stylus:dev'<% } else if (sass) { %>'sass:dev'<% } %>, 'copy:dev']);
};
