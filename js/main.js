require({
    paths: {
        //require plugins
        async: 'lib/require/plugins/async',
        font: 'lib/require/plugins/font',
        goog: 'lib/require/plugins/goog',
        image: 'lib/require/plugins/image',
        json: 'lib/require/plugins/json',
        noext: 'lib/require/plugins/noext',
        mdown: 'lib/require/plugins/mdown',
        propertyParser: 'lib/require/plugins/propertyParser',

        jquery: 'lib/jquery-2.1.1',
        underscore: 'lib/underscore-1.6.0',
        bootstrap: 'lib/bootstrap-3.2.0',
        backbone: 'lib/backbone-1.1.2'
    }
});

define(['jquery', 'underscore', 'backbone', 'CoreRouter'], function ($, _, Backbone, CoreRouter) {

    var qs = {};
    qs.router = new CoreRouter;
    Backbone.history.start();
});