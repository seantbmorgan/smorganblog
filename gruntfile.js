module.exports = function(grunt) {
    // Do grunt-related things in here
	'use strict';

	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-mocha-test');

    // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		eslint: {
			target: ['_es6/main.js']
		},

		mochaTest: {
		  test: {
		    options: {
		      reporter: 'spec',
		      require: 'babel-register'
		    },
		    src: ['_es6/**/*.js']
		  }
		},

		babel: {
				options: {
						sourceMap: true,
						presets: ['es2015']
				},
				dist: {
		        files: [
		            {
		                expand: true,
		                cwd: '_es6/',
		                src: ['*.js'],
		                dest: '_js/'
		            }
		        ]
		    }
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> */\n',
				unused: false
			},
			app: {
				src: '_js/*.js',
        dest: 'js/<%= pkg.name %>.min.js'
			},
			/*
			plugins: {
				src: 'public/js/plugins.js',
        dest: 'public/js/plugins.min.js'
			}
			*/
		},

		compass: {
    	dev: {
				options: {
					sassDir: ['_sass'],
					cssDir: ['_tmp'],
					//sourcemap: false,
					environment: 'development',
          outputStyle: 'compact',
					debugInfo:false,
					noLineComments:true
				}
			},
		},

		copy: {
		  main: {
		    files: [
		      // includes files within path
		      {expand: true, src: ['_tmp/*'], dest: '', filter: 'isFile'},

		      // includes files within path and its sub-directories
		      //{expand: true, src: ['path/**'], dest: 'dest/'},

		      // makes all src relative to cwd
		      //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

		      // flattens results to a single level
		      //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
		    ],
		  },
		},

		postcss: {
				options: {
						map: false,
						processors: [
								require('autoprefixer')
						]
				},
				dist: {
						src: '_tmp/*.css',
						dest: 'style.css',
						//src: '*.css'
				}
		},

		/*
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: '_tmp',
		      src: ['*.css', '!*.min.css'],
		      dest: '',
		      ext: '.css'
		    }]
		  }
		},
		*/

		clean: ['_tmp','_js'],

		watch: {
			scripts: {
					files : ['_es6/*.js'],
					tasks: ['eslint','babel','uglify', 'clean'],
					options: {
						livereload: true
					}
			},
			css: {
				files: ['_sass/*.scss'],
				//tasks: ['compass','copy','postcss','cssmin','clean'],
				tasks: ['compass', 'postcss', 'clean'],
				options: {
					spawn: false,
					livereload: true
				}
			}
		}
	});

  //grunt.registerTask('prod', ['compass:dev', 'jshint', 'concat']);
  //grunt.registerTask('default', ['babel', 'uglify', 'compass:dev', 'copy', 'postcss', 'cssmin', 'clean', 'watch']);
	grunt.registerTask('default', ['eslint', 'babel', 'uglify', 'compass:dev', 'postcss', 'clean', 'watch']);
};
