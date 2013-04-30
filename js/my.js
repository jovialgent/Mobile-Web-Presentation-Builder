var yes = 0;


      $(function(){
        
          var increase_yes = function(){
            yes++;
            jQuery('#awesome-graph').tufteBar({
              data: [
              [1.0, {label: 'No'}],
              [yes, {label: 'Yes'}],
              ],
              barWidth: 0.8,
              barLabel:  function(index) { return this[0] },
              axisLabel: function(index) { return this[1].label },
              color:     function(index) { return ['#002856', '#c50f3c'][index % 2] }
            });
          }
      });