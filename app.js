
/**
 * Module dependencies.
 */

// app.js
 
// A.1
var express = require('express'),
    app = express();
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
 
// A.2
app.configure(function() {
    app.use(express.static(__dirname + '/'));
});
 
// A.3
server.listen(3000);

var connect_count = 0;
var yes = 1;
var no = 1;
var slide = 0;
var section = 0;

//All the variables and tests for the mySql module
var _mysql   = require('mysql')
, HOST     = 'localhost'
, USERNAME = 'root'
, PASSWORD = 'root'
, DATABASE = 'test'
, QUESTION_TABLE    = 'Question Database'
, CHATTABLE = 'chat_log';

//Starts the mysql database
var mysql = _mysql.createConnection({
  host: HOST,
  port: 8889,
  user: USERNAME,
  password: PASSWORD
});



io.sockets.on('connection', function(socket){

  socket.on('reset', function(data){
    yes = 1;
    no = 1;
    io.sockets.emit('update_graph', yes, no);
    io.sockets.emit('voted');
    io.sockets.emit('begin');
    io.sockets.emit('reset_points');
  });

  socket.on('change_graph', function(){
    io.sockets.emit('update_graph');

  });

  socket.on('send_message', function(content, username_, department_){

    console.log("IN THE SERVER:  Message: " + content + " USERNAME: " + username_ + " DEPARTMENT: " + department_ );
    io.sockets.emit('receive_message', content, username_, department_);
  });

  socket.on('set_max_slides', function(max_slides){
    io.sockets.emit('send_max_slides', max_slides);
  });

  socket.on('request_for_time', function(){

    io.sockets.emit('wait');

  });

  socket.on('send_trainer_evaluation', function(trainer){
    io.sockets.emit('get_trainer_evaluation', trainer);

  });

  socket.on("ask_later", function(username, department, content){
    io.sockets.emit("ask_later_sent", username, department, content);
  });

  socket.on('go_to_slide', function(current_section, current_slide){
    slide = current_slide;
    section = current_section;
    io.sockets.emit('change_slide', current_section, current_slide);
  });

  socket.on('send_content_evaluation', function(content){
    io.sockets.emit("get_content_evaluation", content);

  });

  socket.on('send_question', function(question){

    io.sockets.emit('set_question', question);

  });

  socket.on('browse', function(current_section, current_slide){
    socket.emit('change_slide', current_section, current_slide);
  });

  socket.on('yes', function(){
    yes++;
    
    io.sockets.emit('update_graph', yes, no);

  })

  socket.on('no', function(){
    no++;
    
    io.sockets.emit('update_graph', yes, no);

  })

  socket.on('request_time', function(){
    io.sockets.emit('wait');

  });

  socket.on('send_slide_title', function(current_title, next_title){

    io.sockets.emit('get_slide_title', current_title, next_title);

  });

});