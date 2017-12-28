// Generated by CoffeeScript 1.9.3
(function() {
  var NamespaceListEntryView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.NamespaceList = (function(superClass) {
    extend(NamespaceList, superClass);

    function NamespaceList() {
      return NamespaceList.__super__.constructor.apply(this, arguments);
    }

    NamespaceList.prototype.url = "/";

    return NamespaceList;

  })(Backbone.Model);

  window.Config = (function(superClass) {
    extend(Config, superClass);

    function Config() {
      this.url = bind(this.url, this);
      return Config.__super__.constructor.apply(this, arguments);
    }

    Config.prototype.url = function() {
      return "/config?name=" + this.get('name');
    };

    return Config;

  })(Backbone.Model);

  NamespaceListEntryView = (function(superClass) {
    extend(NamespaceListEntryView, superClass);

    function NamespaceListEntryView() {
      return NamespaceListEntryView.__super__.constructor.apply(this, arguments);
    }

    NamespaceListEntryView.prototype.tagName = "tr";

    NamespaceListEntryView.prototype.template = _.template("<td>\n    <a href=\"#config/<%= name %>\">\n        <span class=\"label label-inverse\"><%= name %></span>\n    </a>\n</td>");

    NamespaceListEntryView.prototype.render = function() {
      this.$el.html(this.template({
        name: this.model
      }));
      return this;
    };

    return NamespaceListEntryView;

  })(ClickableListEntry);

  window.NamespaceListView = (function(superClass) {
    extend(NamespaceListView, superClass);

    function NamespaceListView() {
      this.render = bind(this.render, this);
      this.initialize = bind(this.initialize, this);
      return NamespaceListView.__super__.constructor.apply(this, arguments);
    }

    NamespaceListView.prototype.initialize = function(options) {
      return this.listenTo(this.model, "sync", this.render);
    };

    NamespaceListView.prototype.tagName = "div";

    NamespaceListView.prototype.className = "span8";

    NamespaceListView.prototype.template = _.template("<h1>\n    <i class=\"icon-wrench icon-white\"></i>\n    Configuration Namespaces\n</h1>\n<div class=\"outline-block\">\n<table class=\"table table-hover table-outline\">\n  <thead class=\"header\">\n    <tr>\n      <th>Name</th>\n    </tr>\n  </thead>\n  <tbody>\n  </tbody>\n</table>\n</div>");

    NamespaceListView.prototype.render = function() {
      var entry, name;
      this.$el.html(this.template());
      entry = function(name) {
        return new NamespaceListEntryView({
          model: name
        }).render().el;
      };
      this.$('tbody').append((function() {
        var i, len, ref, results;
        ref = this.model.get('namespaces');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          name = ref[i];
          results.push(entry(name));
        }
        return results;
      }).call(this));
      return this;
    };

    return NamespaceListView;

  })(Backbone.View);

  window.ConfigView = (function(superClass) {
    extend(ConfigView, superClass);

    function ConfigView() {
      this.render = bind(this.render, this);
      this.initialize = bind(this.initialize, this);
      return ConfigView.__super__.constructor.apply(this, arguments);
    }

    ConfigView.prototype.initialize = function(options) {
      return this.listenTo(this.model, "change", this.render);
    };

    ConfigView.prototype.tagName = "div";

    ConfigView.prototype.className = "span12";

    ConfigView.prototype.template = _.template("<h1><small>Config</small> <%= name %></h1>\n<div class=\"outline-block\"><div class=\"border-top\">\n    <textarea class=\"config-block\"><%= config %></textarea>\n</div></div>");

    ConfigView.prototype.render = function() {
      this.$el.html(this.template(this.model.attributes));
      CodeMirror.fromTextArea(this.$('textarea').get(0), {
        readOnly: true
      });
      return this;
    };

    return ConfigView;

  })(Backbone.View);

}).call(this);
