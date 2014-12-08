'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
    articles = require('../../app/controllers/articles');

module.exports = function(app) {
    // Article Routes
    app.route('/articles')
        .post(users.requiresLogin, articles.create)
        .get(articles.list)

    app.route('/articles/:articleId')
        .get(articles.read)
        .put(users.requiresLogin, articles.hasAuthorization, articles.update)
        .delete(users.requiresLogin, articles.hasAuthorization, articles.delete);
    var counter = 0
    app.route('/a')
        .get(function(req, res) {
            res.send(counter++ +"hi")
        }, function(req, res) {
            res.send(counter++ +"bye")
        }, function(req, res) {
            res.send(counter++ +"3")
        }, function(req, res) {
            res.send(counter++ +"4")
        })


    // Finish by binding the article middleware
    app.param('articleId', articles.articleByID);
};
