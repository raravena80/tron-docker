// Generated by CoffeeScript 1.9.3
(function() {
  var NodeInlineView, NodeModel, NodePoolInlineView, NodePoolModel,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  NodeModel = (function(superClass) {
    extend(NodeModel, superClass);

    function NodeModel() {
      return NodeModel.__super__.constructor.apply(this, arguments);
    }

    return NodeModel;

  })(Backbone.Model);

  NodePoolModel = (function(superClass) {
    extend(NodePoolModel, superClass);

    function NodePoolModel() {
      return NodePoolModel.__super__.constructor.apply(this, arguments);
    }

    return NodePoolModel;

  })(Backbone.Model);

  NodeInlineView = (function(superClass) {
    extend(NodeInlineView, superClass);

    function NodeInlineView() {
      this.render = bind(this.render, this);
      return NodeInlineView.__super__.constructor.apply(this, arguments);
    }

    NodeInlineView.prototype.tagName = "span";

    NodeInlineView.prototype.template = _.template("<span class=\"tt-enable\" title=\"<%= username %>@<%= hostname %>:<%= port %>\">\n    <%= name %>\n</span>");

    NodeInlineView.prototype.render = function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    };

    return NodeInlineView;

  })(Backbone.View);

  NodePoolInlineView = (function(superClass) {
    extend(NodePoolInlineView, superClass);

    function NodePoolInlineView() {
      this.render = bind(this.render, this);
      return NodePoolInlineView.__super__.constructor.apply(this, arguments);
    }

    NodePoolInlineView.prototype.tagName = "span";

    NodePoolInlineView.prototype.template = _.template("<span class=\"tt-enable\" title=\"<%= nodes.length %> node(s)\">\n    <%= name %>\n</span>");

    NodePoolInlineView.prototype.render = function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    };

    return NodePoolInlineView;

  })(Backbone.View);

  window.displayNode = function(node) {
    return new NodeInlineView({
      model: new NodeModel(node)
    }).render().$el.html();
  };

  window.displayNodePool = function(pool) {
    return new NodePoolInlineView({
      model: new NodePoolModel(pool)
    }).render().$el.html();
  };

}).call(this);
