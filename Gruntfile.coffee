'use strict'

module.exports = (grunt) ->
  require('jit-grunt') grunt
  require('time-grunt') grunt
  grunt.file.defaultEncoding = 'utf8'
  grunt.initConfig
    qunit:
      all:
        options:
          urls: [
            'http://localhost:8000/test/index.html'
          ]

    connect:
      server:
        options:
          port: 8000
          base: '.'

  grunt.registerTask 'default', [
    'connect'
    'qunit'
  ]

  grunt.registerTask 'test', [
    'default'
  ]

  return
