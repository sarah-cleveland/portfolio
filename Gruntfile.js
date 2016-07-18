/*global module:false*/
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        uglify: {
            dist: {
                src: ['<%= pkg.directory_source %>/js/vendor/jquery-2.1.4.min.js', '<%= pkg.directory_source %>/js/PageContent.js'],
                dest: '<%= pkg.directory_source %>/js/main.min.js'
            }
        },
        concat: {
            dist: {
                src:['<%= pkg.directory_source %>/js/vendor/jquery-2.1.4.min.js', '<%= pkg.directory_source %>/js/PageContent.js'],
                dest: '<%= pkg.directory_source %>/js/main.min.js'
            }
        },
        clean: ['<%= pkg.directory_build %>'],
        sass: {
          dist: {
            options: {
              style: 'expanded',
              lineNumbers: true,
              noCache: true
            },
            files: {
              '<%= pkg.directory_source %>/css/main.css': '<%= pkg.directory_source %>/sass/main.scss'
            }
          }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;*/\n ' + '/* Build: <%= grunt.template.today("mm/dd/yy - h:MM:ss TT") %> */\n',
            },
            minify: {
                expand: true,
                cwd: '<%= pkg.directory_source %>/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= pkg.directory_build %>/css/',
                ext: '.min.css'
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.directory_source %>',
                    src: ['img/*', 'js/main.min.js', 'content/*'],
                    dest: '<%= pkg.directory_build %>'
                }]
            }
        },
        processhtml: {
            dist: {
                files: {
                    '<%= pkg.directory_build %>/index.html': ['<%= pkg.directory_source %>/index.html']
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: '<%= pkg.directory_deploy %>/' + '<%= pkg.name %>' + '_' + '<%= grunt.template.today("mm-dd-yyyy_h-MM-TT") %>' + '.zip' 
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.directory_build %>/',
                    src: ['**/*']
                }]
            }
        },
        watch: {
            files: ['<%= pkg.directory_source %>/js/*.js', '<%= pkg.directory_source %>/sass/**/*.scss'],
            tasks: ['uglify', 'concat', 'sass', 'cssmin']
        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['clean', 'concat', 'sass', 'cssmin', 'copy', 'processhtml', 'compress']);
};