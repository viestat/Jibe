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
            'client/lib/**/*.js'
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
            'client/**/*.js'    // client files
          ],
          tasks: ['local']
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
      'shell:delsrc',
      'cssmin'
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