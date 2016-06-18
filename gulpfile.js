var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');

var browserifyOptions = {
    paths: ['config']
};

elixir(function (mix) {
    mix
      .sass('app.scss')
      .browserify('app.js', null, null, browserifyOptions)
      .version([
          'js/app.js'
      ]);
});
