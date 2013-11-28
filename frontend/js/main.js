// Generated by CoffeeScript 1.6.2
(function() {
  require.config({
    paths: {
      jquery: 'lib/jquery-2.0.1',
      backbone: 'lib/backbone',
      underscore: 'lib/lodash.underscore',
      marionette: 'lib/backbone.marionette',
      babysitter: 'lib/backbone.babysitter',
      wreq: 'lib/backbone.wreqr',
      socketio: 'lib/socket.io',
      'backbone.iosync': 'backbone.iosync',
      'backbone.iobind': 'backbone.iobind',
      fileupload: 'lib/jquery.fileupload',
      'jquery.ui.widget': 'lib/jquery.ui.widget',
      'backbone.stickit': 'backbone.stickit',
      md5: 'lib/md5',
      hammer: 'lib/hammer',
      tween: 'lib/tween.min'
    },
    shim: {
      'backbone.stickit': {
        deps: ['backbone']
      },
      backbone: {
        exports: 'Backbone',
        deps: ['jquery', 'underscore']
      },
      'backbone.iosync': {
        exports: 'Backbone',
        deps: ['backbone', 'socketio']
      },
      'backbone.iobind': {
        exports: 'Backbone',
        deps: ['backbone.iosync']
      },
      marionette: {
        exports: 'Backbone.Marionette',
        deps: ['backbone.stickit']
      }
    }
  });

  define('main', ['collectionViews/NotiesCollectionView', 'marionette', 'router', 'socketio', 'helpers', 'backbone.iobind', 'backbone.stickit'], function(Notyfier, M, Router, io, helpers) {
    var Application;

    Application = (function() {
      function Application() {
        var App, socketAdress;

        App = new M.Application();
        App.name = 'iconmelon';
        window.App = App;
        App.addRegions({
          main: '#main-l'
        });
        this.$mainHeader = $('#js-main-header');
        this.$loadingLine = $('#js-loadin-line');
        App.$loadingLine = this.$loadingLine;
        App.$mainHeader = this.$mainHeader;
        App.$footer = $('#js-main-footer');
        App.$bodyHtml = $('body, html');
        App.$svgWrap = $('#js-svg-wrap');
        App.helpers = helpers;
        App.loadedHashes = [];
        App.iconsSelected = [];
        App.filtersSelected = [];
        socketAdress = window.location.href.match('localhost') ? 'http://localhost' : 'http://iconmelon.com';
        window.socket = io.connect(socketAdress);
        App.$window = $(window);
        this.$mainHeader = $('#js-main-header');
        App.$blinded = $('#js-blinded');
        App.$toTops = $('.js-to-top');
        App.router = new Router;
        Backbone.history.start();
        App.start();
        App.helpers.listenLinks();
        this.listenEvents();
        this.makeNotyfier();
      }

      Application.prototype.makeNotyfier = function() {
        return App.notifier = new Notyfier({
          isRender: true
        });
      };

      Application.prototype.listenEvents = function() {
        var _this = this;

        App.$window.on('scroll', function() {
          return _this.$mainHeader.toggleClass('is-convex', App.$window.scrollTop() > 0);
        });
        App.$window.on('scroll', _.throttle(function() {
          if (App.$window.scrollTop() < App.$window.outerHeight()) {
            if (!_this.istoTop) {
              return;
            }
            App.$toTops.removeClass('animated fadeInUp').addClass('animated fadeOutDown');
            return _this.istoTop = false;
          } else {
            if (_this.istoTop) {
              return;
            }
            App.$toTops.removeClass('animated fadeOutDown').addClass('animated fadeInUp');
            return _this.istoTop = true;
          }
        }, 2000));
        return App.$toTops.on('click', function() {
          return App.$bodyHtml.animate({
            'scrollTop': 300
          });
        });
      };

      return Application;

    })();
    return new Application;
  });

}).call(this);
