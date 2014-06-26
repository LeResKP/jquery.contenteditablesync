'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('contenteditablesync.jquery.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
    },
    connect: {
      server: {
        options: {
          port: 9999,
          base: '.'
        }
      }
    },
    'saucelabs-qunit': {
      all: {
        options: {
          build: process.env.TRAVIS_JOB_ID,
          concurrency: 10,
          urls: ['http://127.0.0.1:9999/test/contenteditablesync.html'],
          testname: "jquery.contenteditablesync qunit tests",
          browsers: [
            {
                browserName: "iphone",
                version: "7.1",
                platform: "OS X 10.9"
            },
            {
                browserName: "android",
                version: "4.3",
                platform: "Linux"
            },
            {
                browserName: "internet explorer",
                version: "11",
                platform: "Windows 8.1"
            },
            {
                browserName: "internet explorer",
                version: "10",
                platform: "Windows 8"
            },
            {
                browserName: "firefox",
                version: "30",
                platform: "Windows 8"
            },
            {
                browserName: "chrome",
                version: "35",
                platform: "Windows 8"
            },
            {
                browserName: "internet explorer",
                version: "9",
                platform: "Windows 7"
            },
            {
                browserName: "internet explorer",
                version: "8",
                platform: "Windows 7"
            },
            {
                browserName: "safari",
                version: "5",
                platform: "OS X 10.6"
            },
            {
                browserName: "safari",
                version: "6",
                platform: "OS X 10.8"
            },
            {
                browserName: "safari",
                version: "7",
                platform: "OS X 10.9"
            },
            {
                browserName: "firefox",
                version: "30",
                platform: "Linux"
            },
            {
                browserName: "chrome",
                version: "35",
                platform: "Linux"
            }
          ]
        }
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-saucelabs');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'concat', 'uglify']);
  grunt.registerTask("test", ["connect", "saucelabs-qunit"]);
  grunt.registerTask("dev", ["connect", "watch"]);


};
