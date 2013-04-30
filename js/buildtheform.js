var socket = io.connect('http://mscd118o:3002');
var slide_type = {
	"text_slide" : function(slide_num, question){
		var temp = "";

		
		temp += "<h2 id='"+slide_num+"'>"+question+"</h2> <br>";
		temp += "<table id='results"+slide_num+"'>";
		temp += "</table>";
		temp += "</section>";


		return temp
	},
	"yes_or_no_slide" : function(slide_num, question){
		var temp = "";

		
		temp += "<h2 id='"+slide_num+"'>"+question+"</h2> <br>";
		temp += "<div class='graph' id='awesome-graph"+slide_num+"'  style='padding-left: 300px'></div>";
		temp += "</section>";
		socket.emit('initialize_graphs', slide_num);


		return temp
	}
}

var make_slide = {
			"header" : function(slide_num, slide_title){
				var slide_title_filled = slide_title != "" && typeof slide_title != 'undefined';
				if(slide_title_filled){
					return "<h2 id='" + slide_num + "'>"+slide_title+"</h2> <br>";
				} else {
					return "";
				}
			},
			"slide_text" : function(text){
				if(text != "" && typeof text != 'undefined'){
					return "<div>"+text+"</div>";
				} else {
					return "";
				}
			},
			"make_bulletlist" : function(list){
				if(list.length >= 1){
					var list_html = "<ul>";
					for(var i = 0; i < list.length; i++){
						list_html += "<li>" + list[i] + "</li>";
					}
					list_html += "</ul>";
					return list_html;
				}
				else{
					return "";
				}
			},
			"make_numbered_list" : function(list){
				if(list.length >= 1){
					var list_html = "<ol>";
					for(var i = 0; i < list.length; i++){
						list_html += "<li>" + list[i] + "</li>";
					}
					list_html += "</ol>";
					return list_html;
				}
				else{
					return "";
				}
			},
			"image" : function(image){
				if(image != "" && typeof image != 'undefined'){
					return "<img src='" + image + "'/>";

				}
				else{
					return "";
				}
			},

			"youtube" : function(link){
				if(link != "" && typeof link != 'undefined'){
					return '<object width="420" height="315"><param name="movie" value="http://www.youtube.com/v/'+link+'?h1=en_US&amp;version=3"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/'+link+'?h1=en_US&amp;version=3" type="application/x-shockwave-flash" width="420" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>';
				}
				else{
					return "";
				}
			}


		}



$(document).ready(function(){

	$('.slides').text('');

	
	
	var jqxhr = $.ajax( "js/maker.json" )
	.done(function(data) { 
		var html = '';

		

		var temp = data.data;
		var initialize = temp.initialize;
		$('.slides').append('<section><section><h1>'+initialize["presentation_title"]+'</h1></section></section>');


		for(x in temp){	
			
			if(x == 'initialize'){}
				else {
					html += '<section>';
					var slides = temp[x];
					for(y in slides){
						html +='<section>';
						if(slides[y]['slide_type']=='regular'){

						var header = slides[y]['header'];
						var text = slides[y]['text'];
						var unordered_list = slides[y]['unordered_lists'];
						var ordered_list = slides[y]['ordered_lists'];
						var img = slides[y]['img'];
						var video = slides[y]['video'];

						html += make_slide.header(y, header);
						html += make_slide.slide_text(text);
						html += make_slide.make_bulletlist(unordered_list);
						html += make_slide.make_numbered_list(ordered_list);
						html += make_slide.image(img);
						html += make_slide.youtube(video);
						html += '</section>'
					} else if(slides[y]['slide_type']=='text'){

						var header = slides[y]['header'];
						html += slide_type.text_slide(y, header);
					} else if(slides[y]['slide_type']=='yes_or_no'){
						console.log("Got to this");

						var header = slides[y]['header'];
						html += slide_type.yes_or_no_slide(y, header);
					}



						

					}
					html += '</section>';
				}
			}

			
			$('.slides').append(html);


		})
.fail(function(data){
	console.log("failure");
});
});