// Generated by CoffeeScript 1.9.3
(function() {
  var ActionRunHistorySliderModel, module,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.modules = window.modules || {};

  module = window.modules.actionrun = {};

  module.ActionRun = (function(superClass) {
    extend(ActionRun, superClass);

    function ActionRun() {
      this.parse = bind(this.parse, this);
      this.url = bind(this.url, this);
      this.initialize = bind(this.initialize, this);
      return ActionRun.__super__.constructor.apply(this, arguments);
    }

    ActionRun.prototype.initialize = function(options) {
      ActionRun.__super__.initialize.call(this, options);
      options = options || {};
      return this.refreshModel = options.refreshModel;
    };

    ActionRun.prototype.idAttribute = "action_name";

    ActionRun.prototype.urlRoot = function() {
      return "/jobs/" + (this.get('job_name')) + "/" + (this.get('run_num')) + "/";
    };

    ActionRun.prototype.urlArgs = "?include_stdout=1&include_stderr=1&num_lines=0";

    ActionRun.prototype.url = function() {
      return ActionRun.__super__.url.call(this) + this.urlArgs;
    };

    ActionRun.prototype.parse = function(resp, options) {
      resp['job_url'] = "#job/" + (this.get('job_name'));
      resp['job_run_url'] = resp['job_url'] + "/" + (this.get('run_num'));
      resp['url'] = resp['job_run_url'] + "/" + (this.get('action_name'));
      return resp;
    };

    return ActionRun;

  })(Backbone.Model);

  module.ActionRunHistoryEntry = (function(superClass) {
    extend(ActionRunHistoryEntry, superClass);

    function ActionRunHistoryEntry() {
      this.parse = bind(this.parse, this);
      return ActionRunHistoryEntry.__super__.constructor.apply(this, arguments);
    }

    ActionRunHistoryEntry.prototype.idAttribute = "id";

    ActionRunHistoryEntry.prototype.parse = function(resp, options) {
      return resp;
    };

    return ActionRunHistoryEntry;

  })(module.ActionRun);

  module.ActionRunHistory = (function(superClass) {
    extend(ActionRunHistory, superClass);

    function ActionRunHistory() {
      this.add = bind(this.add, this);
      this.reset = bind(this.reset, this);
      this.parse = bind(this.parse, this);
      this.url = bind(this.url, this);
      this.initialize = bind(this.initialize, this);
      return ActionRunHistory.__super__.constructor.apply(this, arguments);
    }

    ActionRunHistory.prototype.initialize = function(models, options) {
      options = options || {};
      this.job_name = options.job_name;
      return this.action_name = options.action_name;
    };

    ActionRunHistory.prototype.model = module.ActionRunHistoryEntry;

    ActionRunHistory.prototype.url = function() {
      return "/jobs/" + this.job_name + "/" + this.action_name + "/";
    };

    ActionRunHistory.prototype.parse = function(resp, options) {
      return resp;
    };

    ActionRunHistory.prototype.reset = function(models, options) {
      return ActionRunHistory.__super__.reset.call(this, models, options);
    };

    ActionRunHistory.prototype.add = function(models, options) {
      return ActionRunHistory.__super__.add.call(this, models, options);
    };

    return ActionRunHistory;

  })(Backbone.Collection);

  module.ActionRunHistoryListEntryView = (function(superClass) {
    extend(ActionRunHistoryListEntryView, superClass);

    function ActionRunHistoryListEntryView() {
      return ActionRunHistoryListEntryView.__super__.constructor.apply(this, arguments);
    }

    ActionRunHistoryListEntryView.prototype.tagName = "tr";

    ActionRunHistoryListEntryView.prototype.template = _.template("<td>\n    <a href=\"#job/<%= job_name %>/<%= run_num %>/<%= action_name %>\">\n    <%= run_num %></a></td>\n<td><%= formatState(state) %></td>\n<td><%= displayNode(node) %></td>\n<td><%= modules.actionrun.formatExit(exit_status) %></td>\n<td><%= dateFromNow(start_time, \"None\") %></td>\n<td><%= dateFromNow(end_time, \"\") %></td>");

    ActionRunHistoryListEntryView.prototype.render = function() {
      this.$el.html(this.template(this.model.attributes));
      makeTooltips(this.$el);
      return this;
    };

    return ActionRunHistoryListEntryView;

  })(ClickableListEntry);

  module.ActionRunTimelineEntry = (function() {
    function ActionRunTimelineEntry(actionRun, maxDate) {
      this.actionRun = actionRun;
      this.maxDate = maxDate;
      this.getEnd = bind(this.getEnd, this);
      this.getStart = bind(this.getStart, this);
      this.getBarClass = bind(this.getBarClass, this);
      this.getYAxisText = bind(this.getYAxisText, this);
      this.getYAxisLink = bind(this.getYAxisLink, this);
      this.toString = bind(this.toString, this);
    }

    ActionRunTimelineEntry.prototype.toString = function() {
      return this.actionRun.action_name;
    };

    ActionRunTimelineEntry.prototype.getYAxisLink = function() {
      return "#job/" + this.actionRun.job_name + "/" + this.actionRun.run_num + "/" + this.actionRun.action_name;
    };

    ActionRunTimelineEntry.prototype.getYAxisText = function() {
      return this.actionRun.action_name;
    };

    ActionRunTimelineEntry.prototype.getBarClass = function() {
      return this.actionRun.state;
    };

    ActionRunTimelineEntry.prototype.getStart = function() {
      return this.getDate(this.actionRun.start_time);
    };

    ActionRunTimelineEntry.prototype.getEnd = function() {
      return this.getDate(this.actionRun.end_time);
    };

    ActionRunTimelineEntry.prototype.getDate = function(date) {
      if (date) {
        return new Date(date);
      } else {
        return this.maxDate;
      }
    };

    return ActionRunTimelineEntry;

  })();

  module.ActionRunListEntryView = (function(superClass) {
    extend(ActionRunListEntryView, superClass);

    function ActionRunListEntryView() {
      this.initialize = bind(this.initialize, this);
      return ActionRunListEntryView.__super__.constructor.apply(this, arguments);
    }

    ActionRunListEntryView.prototype.initialize = function(options) {
      return this.listenTo(this.model, "change", this.render);
    };

    ActionRunListEntryView.prototype.tagName = "tr";

    ActionRunListEntryView.prototype.template = _.template("<td>\n    <a href=\"#job/<%= job_name %>/<%= run_num %>/<%= action_name %>\">\n    <%= formatName(action_name) %></a></td>\n<td><%= formatState(state) %></td>\n<td><code class=\"command\"><%= command || raw_command %></code></td>\n<td><%= displayNode(node) %></td>\n<td><%= dateFromNow(start_time, \"None\") %></td>\n<td><%= dateFromNow(end_time, \"\") %></td>");

    ActionRunListEntryView.prototype.render = function() {
      this.$el.html(this.template(this.model.attributes));
      makeTooltips(this.$el);
      return this;
    };

    return ActionRunListEntryView;

  })(ClickableListEntry);

  module.formatExit = function(exit) {
    var template;
    if ((exit == null) || exit === '') {
      return '';
    }
    template = _.template("<span class=\"badge badge-<%= type %>\"><%= exit %></span>");
    return template({
      exit: exit,
      type: !exit ? "success" : "important"
    });
  };

  module.ActionRunView = (function(superClass) {
    extend(ActionRunView, superClass);

    function ActionRunView() {
      this.initialize = bind(this.initialize, this);
      return ActionRunView.__super__.constructor.apply(this, arguments);
    }

    ActionRunView.prototype.initialize = function(options) {
      var historyCollection;
      this.listenTo(this.model, "change", this.render);
      this.refreshView = new RefreshToggleView({
        model: this.model.refreshModel
      });
      historyCollection = options.history;
      this.historyView = new module.ActionRunHistoryView({
        model: historyCollection
      });
      this.listenTo(this.refreshView, 'refreshView', (function(_this) {
        return function() {
          return _this.model.fetch();
        };
      })(this));
      return this.listenTo(this.refreshView, 'refreshView', (function(_this) {
        return function() {
          return historyCollection.fetch();
        };
      })(this));
    };

    ActionRunView.prototype.tagName = "div";

    ActionRunView.prototype.template = _.template("<div class=\"span12\">\n    <h1>\n        <small>Action Run</small>\n        <a href=\"<%= job_url %>\"><%= formatName(job_name) %></a>.\n        <a href=\"<%= job_run_url %>\"><%= run_num %></a>.\n        <%= formatName(action_name) %>\n        <span id=\"refresh\"></span>\n    </h1>\n</div>\n<div class=\"span12 outline-block\">\n    <h2>Details</h2>\n    <div>\n    <table class=\"table details\">\n        <tbody>\n        <tr><td class=\"span2\">State</td>\n            <td><%= formatState(state) %></td></tr>\n        <tr><td>Node</td>\n            <td><%= displayNode(node) %></td></tr>\n        <tr><td>Raw command</td>\n            <td><code class=\"command\"><%= raw_command %></code></td></tr>\n        <% if (command) { %>\n        <tr><td>Command</td>\n            <td><code class=\"command\"><%= command %></code></td></tr>\n        <% } %>\n        <tr><td>Exit code</td>\n            <td><%= modules.actionrun.formatExit(exit_status) %></td></tr>\n        <tr><td>Start time</td>\n            <td><% print(dateFromNow(start_time, ''))  %></td></tr>\n        <tr><td>End time</td>\n            <td><%= dateFromNow(end_time, 'Unknown') %></td></tr>\n        <tr><td>Duration</td>\n            <td><%= formatDuration(duration) %>\n            </td></tr>\n        </tbody>\n    </table>\n    </div>\n</div>\n<div class=\"span12 outline-block\">\n    <h2>stdout</h2>\n    <pre class=\"stdout\"><%= stdout.join('\\n') %></pre>\n</div>\n<div class=\"span12 outline-block\">\n    <h2>stderr</h2>\n    <pre class=\"stderr\"><%= stderr.join('\\n') %></pre>\n</div>\n\n<div id=\"action-run-history\">\n</div>");

    ActionRunView.prototype.render = function() {
      this.$el.html(this.template(this.model.attributes));
      this.$('#refresh').html(this.refreshView.render().el);
      this.$('#action-run-history').html(this.historyView.render().el);
      makeTooltips(this.$el);
      modules.views.makeHeaderToggle(this.$el);
      return this;
    };

    return ActionRunView;

  })(Backbone.View);

  ActionRunHistorySliderModel = (function() {
    function ActionRunHistorySliderModel(model1) {
      this.model = model1;
      this.length = bind(this.length, this);
    }

    ActionRunHistorySliderModel.prototype.length = function() {
      return this.model.models.length;
    };

    return ActionRunHistorySliderModel;

  })();

  module.ActionRunHistoryView = (function(superClass) {
    extend(ActionRunHistoryView, superClass);

    function ActionRunHistoryView() {
      this.render = bind(this.render, this);
      this.renderList = bind(this.renderList, this);
      this.initialize = bind(this.initialize, this);
      return ActionRunHistoryView.__super__.constructor.apply(this, arguments);
    }

    ActionRunHistoryView.prototype.initialize = function(options) {
      var sliderModel;
      this.listenTo(this.model, "sync", this.render);
      sliderModel = new ActionRunHistorySliderModel(this.model);
      this.sliderView = new modules.views.SliderView({
        model: sliderModel
      });
      return this.listenTo(this.sliderView, "slider:change", this.renderList);
    };

    ActionRunHistoryView.prototype.tagName = "div";

    ActionRunHistoryView.prototype.className = "span12 outline-block";

    ActionRunHistoryView.prototype.template = _.template("<h2>History</h2>\n<div>\n<div id=\"slider\"></div>\n<table class=\"table table-hover table-outline table-striped\">\n  <thead class=\"sub-header\">\n    <tr>\n      <th class=\"span1\">Run</th>\n      <th>State</th>\n      <th>Node</th>\n      <th>Exit</th>\n      <th>Start</th>\n      <th>End</th>\n    </tr>\n  </thead>\n  <tbody>\n  </tbody>\n</table>\n</div>");

    ActionRunHistoryView.prototype.renderList = function() {
      var model, models, view;
      view = function(model) {
        return new module.ActionRunHistoryListEntryView({
          model: model
        }).render().el;
      };
      models = this.model.models.slice(0, this.sliderView.displayCount);
      return this.$('tbody').html((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = models.length; i < len; i++) {
          model = models[i];
          results.push(view(model));
        }
        return results;
      })());
    };

    ActionRunHistoryView.prototype.render = function() {
      this.$el.html(this.template());
      this.renderList();
      if (this.model.models.length) {
        this.$('#slider').html(this.sliderView.render().el);
      }
      modules.views.makeHeaderToggle(this.$el.parent());
      return this;
    };

    return ActionRunHistoryView;

  })(Backbone.View);

}).call(this);
