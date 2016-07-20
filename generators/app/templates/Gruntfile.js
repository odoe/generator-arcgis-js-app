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
    <% if (v4) { %>
      releasevtiles: {
        src: 'built/esri/views/2d/layers/vector-tile.js',
        dest: 'release/vector-tile.js'
      },
    <% } else if (v3) { %>
      releasevtiles: {
        src: 'built/esri/layers/vector-tile.js',
        dest: 'release/vector-tile.js'
      },
    <% } %>
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
      },
    <% if (v4) { %>
      // need these images for basemaptoggle
      releasetopo: {
        src: 'built/esri/images/basemap/topo.jpg',
        dest: 'release/resources/esri/images/basemap/topo.jpg'
      },
      releasehybrid: {
        src: 'built/esri/images/basemap/hybrid.jpg',
        dest: 'release/resources/esri/images/basemap/hybrid.jpg'
      },
      // search widget images
      // Use this same pattern if you come across other
      // cases where images are loaded via require.toUrl() method
      releasesearch: {
        src: 'built/esri/widgets/Search/images/search-symbol-32.png',
        dest: 'release/resources/esri/images/search-symbol-32.png'
      },
    <% } %>
      moment: {
        cwd: 'built/',
        src: [
          'moment/*.js',
          'moment/locale/*.js',
          '!moment/*.uncompressed.js',
          '!moment/locale/*.uncompressed.js'
        ],
        dest: 'release/',
        expand: true
      }
    },
    <% if (v4) { %>
    // This is getting hardcore to change where images come from
    // for basemap toggle
    'string-replace': {
      dist: {
        files: {
          'release/app.js': 'built/dojo/dojo.js'
        },
        options: {
          replacements: [
            // basemap toggle widget
            {
              pattern: '../images/basemap/hybrid.jpg',
              replacement: 'resources/esri/images/basemap/hybrid.jpg'
            },
            {
              pattern: '../images/basemap/topo.jpg',
              replacement: 'resources/esri/images/basemap/topo.jpg'
            },
            // Search widget
            {
              pattern: './images/search-symbol-32.png',
              replacement: 'resources/esri/images/search-symbol-32.png'
            }
          ]
        }
      }
    },
    <% } %>
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
        baseDir: 'release',
        deleteOriginals: true,
        assets: 'app.{js,css}'
      },
      release: {
        files: [{
          src: ['release/index.html']
        }]
      }
    },
    watch: {
      <% if (stylus) { %>
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
      <% } else if (sass) { %>
      styles: {
        files: [
          'src/app/styles/*.scss'
        ],
        tasks: ['sass:dev'],
        options: {
          livereload: true,
        }
      },
      <% } %>
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
    shell: {
      dojo: {
        command: 'node dist/dojo/dojo.js load=build --profile profiles/build.profile.js --cwd "./" --releaseDir ../built'
      }
    }
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
    'shell:dojo', 'processhtml', 'cssurlcopy',
    'copy:release', 'copy:releaseapp', 'copy:releasevtiles',
    'copy:releaseblank', 'copy:releaseconfig',
    <% if (v4) { %>
    'copy:releasetopo', 'copy:releasehybrid', 'copy:releasesearch',
    'string-replace',
    <% } %>
    'cacheBust', 'copy:moment']);
  grunt.registerTask('build', ['default', 'clean:built', 'copy:build', 'shell:dojo', 'processhtml']);
  grunt.registerTask('initialize', ['default']);
  grunt.registerTask('default', ['clean:dist', 'eslint', 'babel:dev', <% if (stylus) { %>'stylus:dev'<% } else if (sass) { %>'sass:dev'<% } %>, 'copy:dev']);
};
