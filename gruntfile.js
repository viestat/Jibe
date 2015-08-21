  module.exports = function(grunt) {

    grunt.initConfig({
      //-----------------------------------------------------
      jshint: {     // Validate .js file syntax
        all: [
          'server/**/*.js',   // server files
          'client/**/*.js'    // client files
        ],
        options: {
          force: 'true',
          jshintrc: '.jshintrc',
          ignores: [
            'client/lib/**/*.js',
            'client/dist/**/*.js',
            'server/playlists/**/*',
            'server/songs/**/*',
            'server/users/**/*'
          ]
        }
      },
      //-----------------------------------------------------
      mochaTest: {  // Run spec tests
        test: {
          options: {
            reporter: 'spec'
          },
          src: ['test/**/*.js']
        }
      },
      //-----------------------------------------------------
      concat: {     // Join .js files
        src: {      
          src: 'client/app/**/*.js', // client angular files
          dest: 'client/dist/src.js'
        },
        lib: {      
          src: [  // sourced libraries
            'client/lib/jquery/dist/jquery.min.js',
            'client/lib/angular/angular.min.js',
            'client/lib/angular-ui-router/release/angular-ui-router.min.js',
            'client/lib/bootstrap/dist/js/bootstrap.min.js',
            'client/lib/underscore/underscore-min.js',
            'client/lib/angular-ui-select/dist/select.min.js',
            'client/lib/ng-table/dist/ng-table.min.js',
            'client/lib/angular-sanitize/angular-sanitize.min.js'

          ], 
          dest: 'client/dist/lib.min.js'
        }
      },
      //-----------------------------------------------------
      uglify: {     // Minify .js files
        options: {
            mangle: false
          },
          js_files: {
            files: {
              'client/dist/src.min.js': ['client/dist/src.js']
            }
          }
      },
      //-----------------------------------------------------
      nodemon: {    // Start server
        dev: {
          script: 'server/server.js'
        }
      },
      //-----------------------------------------------------
      shell: {
        delsrc: {
          command: 'rm ./client/dist/src.js'
        },
        herokud: {
          command: 'git push heroku master'
        },
        installD:{
          command: ['npm install',
                    'bower install'
                    ].join('&&')
        }
      },
      //-----------------------------------------------------
      watch: {
        scripts: {
          files: [
            'server/**/*.js',   // server files
            'client/**/*.js',    // client files
            '!client/dist/*.js'    // client files
          ],
          tasks: ['build']
        }
      }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('server-dev', function (target) {
      // Running nodejs in a different process and displaying output on the main console
      var nodemon = grunt.util.spawn({
           cmd: 'grunt',
           grunt: true,
           args: 'nodemon'
      });
      nodemon.stdout.pipe(process.stdout);
      nodemon.stderr.pipe(process.stderr);

      grunt.task.run(['watch']);
    });

    ////////////////////////////////////////////////////
    // Main grunt tasks
    ////////////////////////////////////////////////////

    grunt.registerTask('test', [
      'jshint',
      'mochaTest'
    ]);

    grunt.registerTask('build', [
      'test',
      'concat',
      'uglify',
      'shell:delsrc'//,
      //'cssmin'
    ]);

    grunt.registerTask('deploy', [
      'test',
      'shell:herokud'
      ]);
    grunt.registerTask('local', [
        'test',
        'shell:installD'
      ]);
    grunt.registerTask('default', [
        'test'
      ]);

    // grunt.registerTask('upload', function(n) {
    //   if(grunt.option('git')) {
    //     // add support for git push
    //   } else {
    //     grunt.task.run([ 'server-dev' ]);
    //   }
    // });

    // grunt.registerTask('deploy', [
    //     'build',
    //     'upload'
    // ]);
  };