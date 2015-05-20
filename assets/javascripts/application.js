$(document).ready(function(){
  var cats = new AngryCats([
    new AngryCat({ name: 'Wet Cat', image_path: 'assets/images/cat2.jpg' }),
    new AngryCat({ name: 'Bitey Cat', image_path: 'assets/images/cat1.jpg' }),
    new AngryCat({ name: 'Surprised Cat', image_path: 'assets/images/cat3.jpg' })
  ]);
 
	MyApp.start({cats: cats});
});

MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
  mainRegion: "#content"
});

MyApp.addInitializer(function(options) {
  var angryCatsView = new AngryCatsView({
    collection: options.cats
  });
  MyApp.mainRegion.show(angryCatsView);
});

AngryCat = Backbone.Model.extend({});

AngryCats = Backbone.Collection.extend({
  model: AngryCat,

  initialize: function(cats){
	  var rank = 1;
	  _.each(cats, function(cat) {
	    cat.set('rank', rank);
	    ++rank;
	  });
	}

});

AngryCatView = Backbone.Marionette.ItemView.extend({
  template: "#angry_cat-template",
  tagName: 'tr',
  className: 'angry_cat',

  events: {
    'click .rank_up img': 'rankUp',
    'click .rank_down img': 'rankDown'
  },
   
  rankUp: function(){
    console.log('rank up');
  },
   
  rankDown: function(){
    console.log('rank down');
  }
});

AngryCatsView = Backbone.Marionette.CompositeView.extend({
  tagName: "table",
  id: "angry_cats",
  className: "table-striped table-bordered",
  template: "#angry_cats-template",
  itemView: AngryCatView,

  initialize: function() {
    //this.listenTo(this.collection, "sort", this.renderCollection);
  },

  appendHtml: function(collectionView, itemView) {
    collectionView.$("tbody").append(itemView.el);
  }
});