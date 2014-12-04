(function ($) {
	AjaxSolr.TagcloudWidget = AjaxSolr.AbstractFacetWidget.extend({
		afterRequest: function () {
			if (this.manager.response.facet_counts === undefined || this.manager.response.facet_counts.facet_fields[this.field] === undefined) {
				$(this.target).html(AjaxSolr.theme('no_items_found'));
				return;
			}

			var maxCount = 0;
			var objectedItems = [];
			for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
				var count = parseInt(this.manager.response.facet_counts.facet_fields[this.field][facet]);
				if (count > maxCount) {
					maxCount = count;
				}
				objectedItems.push({ facet: facet, count: count });

			}
			objectedItems.sort(function (a, b) {
				return a.facet < b.facet ? -1 : 1;
			});

			var self = this;
			$(this.target).empty();

			var jWord = [];
			var jCount = [];
			var category = [];
			category.push(this.target);

			var wordScale = d3.scale.linear().domain([0,75]).range([10,170]);

			for (var i = 1, l = objectedItems.length; i < l; i++) {
				var facet = objectedItems[i].facet;
				
			
				//console.log("this.target=="+this.target);
				//console.log("facet="+facet);
				console.log("count="+objectedItems[i].count);

				jWord.push(facet);
				jCount.push(objectedItems[i].count);
				

			
								//$(this.target).append(AjaxSolr.theme('tag', facet, parseInt(objectedItems[i].count / maxCount * 10), self.clickHandler(facet)));
					
			}
			//console.log("AFTER objects legnth="+objectedItems.length);

			//console.log("AFTER words lenght="+jWord.length);

			//console.log("AFTER words="+jWord.toString());
			


			var fill = d3.scale.category20();

		 	d3.layout.cloud().size([400, 400])
		      .words(d3.zip(jWord, jCount).map(function(d) {
  				//console.log("here="+d);
  				return {text: d[0], size: d[1]};
				}))
		      .padding(2)
		      //.rotate(function() { return ~~(Math.random() * 2) * 90; })
		      .font("Impact")
		      .fontSize(function(d) { return wordScale(d.size); /*return d.size;*/ })
		      .rotate(function() { return ~~(Math.random() * 2) * 90; })
		      .on("end", draw)
		      .start();


		   //console.log("idclass=="+this.target);
		      
		  function draw(words) {
		  	//console.log("idvinod=="+this.target);
		  	//console.log("AFTER category ="+category.toString());
		    d3.select(category.toString()).append("svg")
		        .attr("width", 400)
		        .attr("height", 400)
		      .append("g")
		        .attr("transform", "translate(200,200)")
		      .selectAll("text")
		        .data(words)
		      .enter().append("text")
		        .style("font-size", function(d) { return d.size + "px"; })
		        .style("font-family", "Impact")
		        .style("fill", function(d, i) { return fill(i); })
		        .attr("text-anchor", "middle")
		        .transition()
            	.duration(1000)
		        .attr("transform", function(d) {
		          return "translate(" + [d.x, d.y] +")";+ ")rotate(" + d.rotate + ")";
		        })
		        .text(function(d) { return d.text; });
		  }

		
			


			//

			





		}
		
	});
})(jQuery);

