

var input_types = {
	'yes_or_no' : function(question){
		 $('#input_type').text('');
		 $('#input_type').append('<a id="yes" data-role="button" href="#page2" data-icon="check">Yes</a>');
		 $('#input_type').append('<a id="no" data-role="button" href="#page2" data-icon="delete">No</a>');
		 $('#yes').button();
		 $('#no').button();
		 
		 $('#yes').bind('click', function(){

                if(!voted && check_if_filled()){
                    console.log('YES SENT');
                    voted = true;
                    socket.emit("yes");
                    $('#submit_vote').popup('open');
                }

            });
		 $('#no').bind('click', function(){

                if(!voted && check_if_filled()){
                    console.log('NO SENT');
                    voted = true;
                    socket.emit("no");
                    $('#submit_vote').popup('open');
                }

            });
	},
	'text_input' : function(question){
		$('#input_type').text('');
		$('#input_type').append('<input name="" id="text_input" placeholder="Enter your submission here" value="" type="text" />');
		$('#input_type').append('<a id="submit_text" data-role="button" href="#page2" data-icon="check">Submit</a>');
		$('#text_input').textinput();
		$('#submit_text').button();
		
		$('#submit_text').bind('click', function(){

                
                     if(!voted && check_if_filled()){
                    voted = true;
                    var text_sent = $('#text_input').val();
                    socket.emit("send_text_input", text_sent);
                    $('#text_input').val('');
                    $('#submit_vote').popup('open');
                }
                

            });

	},

	'regular' : function(question){
		$('#input_type').text('');
	}
}

function check_if_filled(){
                return (typeof username == 'string' && typeof department == 'string' && username != '' && department != '' && username != null && department != null); 
            }