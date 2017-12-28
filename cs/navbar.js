// Generated by CoffeeScript 1.9.3
(function() {
  var Typeahead, module,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.modules = window.modules || {};

  module = window.modules.navbar = {};

  module.NavView = (function(superClass) {
    extend(NavView, superClass);

    function NavView() {
      this.setActive = bind(this.setActive, this);
      this.renderTypeahead = bind(this.renderTypeahead, this);
      this.highlighter = bind(this.highlighter, this);
      this.source = bind(this.source, this);
      this.updater = bind(this.updater, this);
      this.render = bind(this.render, this);
      return NavView.__super__.constructor.apply(this, arguments);
    }

    NavView.prototype.initialize = function(options) {};

    NavView.prototype.tagName = "div";

    NavView.prototype.className = "navbar navbar-static-top";

    NavView.prototype.attributes = {
      id: "menu"
    };

    NavView.prototype.events = {
      ".search-query click": "handleClick"
    };

    NavView.prototype.handleClick = function(event) {
      return console.log(event);
    };

    NavView.prototype.template = "<div class=\"navbar-inner\">\n  <div class=\"container\">\n  <ul class=\"nav\">\n    <li class=\"brand\">tron<span>web</span></li>\n    <li><a href=\"#home\">\n      <i class=\"icon-th\"></i>Dashboard</a>\n    </li>\n    <li><a href=\"#jobs\">\n      <i class=\"icon-time\"></i>Scheduled Jobs</a>\n    </li>\n    <li><a href=\"#services\">\n      <i class=\"icon-repeat\"></i>Services</a>\n    </li>\n    <li><a href=\"#configs\">\n      <i class=\"icon-wrench\"></i>Config</a>\n    </li>\n  </ul>\n\n  <form class=\"navbar-search pull-right\">\n  </form>\n\n  </div>\n</div>";

    NavView.prototype.typeaheadTemplate = "<input type=\"text\" class=\"input-medium search-query typeahead\"\n    placeholder=\"Search\"\n    autocomplete=\"off\"\n    data-provide=\"typeahead\">\n<div class=\"icon-search\"></div>";

    NavView.prototype.render = function() {
      this.$el.html(this.template);
      this.renderTypeahead();
      return this;
    };

    NavView.prototype.updater = function(item) {
      var entry;
      entry = this.model.get(item);
      routes.navigate(entry.getUrl(), {
        trigger: true
      });
      return entry.name;
    };

    NavView.prototype.source = function(query, process) {
      var _, entry, ref, results;
      ref = this.model.attributes;
      results = [];
      for (_ in ref) {
        entry = ref[_];
        results.push(entry.name);
      }
      return results;
    };

    NavView.prototype.highlighter = function(item) {
      var entry, name, typeahead;
      typeahead = this.$('.typeahead').data().typeahead;
      name = module.typeahead_hl.call(typeahead, item);
      entry = this.model.get(item);
      return "<small>" + entry.type + "</small> " + name;
    };

    NavView.prototype.sorter = function(items) {
      var containsQuery, i, item, len, lengthSort, query, ref, startsWithQuery, uncasedItem;
      ref = [[], []], startsWithQuery = ref[0], containsQuery = ref[1];
      query = this.query.toLowerCase();
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        uncasedItem = item.toLowerCase();
        if (_.str.startsWith(uncasedItem, query)) {
          startsWithQuery.push(item);
        } else if (_.str.include(uncasedItem, query)) {
          containsQuery.push(item);
        }
      }
      lengthSort = function(item) {
        return item.length;
      };
      return _.sortBy(startsWithQuery, lengthSort).concat(_.sortBy(containsQuery, lengthSort));
    };

    NavView.prototype.renderTypeahead = function() {
      this.$('.navbar-search').html(this.typeaheadTemplate);
      this.$('.typeahead').typeahead({
        source: this.source,
        updater: this.updater,
        highlighter: this.highlighter,
        sorter: this.sorter
      });
      return this;
    };

    NavView.prototype.setActive = function() {
      var params, path, ref;
      this.$('li').removeClass('active');
      ref = modules.routes.getLocationParams(), path = ref[0], params = ref[1];
      path = path.split('/')[0];
      return this.$("a[href=" + path + "]").parent('li').addClass('active');
    };

    return NavView;

  })(Backbone.View);

  Typeahead = $.fn.typeahead.Constructor.prototype;

  Typeahead.show = function() {
    var top;
    top = this.$element.position().top + this.$element[0].offsetHeight + 1;
    this.$menu.insertAfter(this.$element).css({
      top: top
    }).show();
    this.shown = true;
    return this;
  };

  module.typeahead_hl = $.fn.typeahead.Constructor.prototype.highlighter;

}).call(this);