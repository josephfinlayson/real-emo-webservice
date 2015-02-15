/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Thing = require('./thing.model');

// Get list of things
exports.index = function (req, res) {

  Thing.find({
    "timestampBegin": {
      "$gte": new Date(2012)
      //"$lt": new Date(2015, 7, 15)
    }

  }, function (err, things) {
    if (err) {
      return handleError(res, err);
    }
    things.forEach(function (thing) {


    })
    return res.json(200, things);
  });
};

// Get a single thing
exports.show = function (req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.send(404);
    }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function (req, res) {
  var objectsSaved = [];
  req.body.forEach(function (emotionObject, index) {

    emotionObject.timestampBegin = new Date(emotionObject.timestampBegin)
    emotionObject.timestampEnd = new Date(emotionObject.timestampEnd)

    var momentEnd = moment(emotionObject.timestampEnd);
    var momentBegin = moment(emotionObject.timestampBegin);
    emotionObject.duration = momentBegin.diff(momentEnd)

    Thing.create(emotionObject, function (err, emotionObject) {
      if (err) {
        return handleError(res, err);
      }
      else {
        objectsSaved.push(emotionObject);
      }
      if (index === req.body.length - 1) {
        return res.json(201, objectsSaved);
      }
    });
  })

};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Thing.findById(req.params.id, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.send(404);
    }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function (req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.send(404);
    }
    thing.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
