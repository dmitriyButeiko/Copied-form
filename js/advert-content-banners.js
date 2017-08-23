(function(){

var defaults = {
  offset: 1000,
  haveToBeAtLeast: 500,
  method: 'sspScroll',
  callback: null
};

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

var isDevelopment = window.location.hash.indexOf('development=1') !== -1;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function objectAssign(target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
}

function buildRootSelector(root, nodes) {
  var parts = [];
  for (var i in nodes) {
    var tag = nodes[i];
    parts.push(root + ' > ' + tag);
  }

  return parts.join(', ');
}

function getNodesLength(nodes, index) {
  var result = 0;
  for (var i = index; i < nodes.length; i++) {
    var node = nodes[i];
    result += (node && node.innerText ? node.innerText.length : 0);
  }

  return result;
}

function getNodeLength(node) {
  return node && node.innerText ? node.innerText.length : 0;
}

function isApproved(node) {
  return node.nodeName === 'P';
}

function isApprovedByPrevious(nodes, index, place, floats, media) {
  var node = nodes[index - 1];
  if (!node) {
    return true;
  }

  return !isNodeInList(node, floats);
}

function isApprovedByNext(nodes, index, place, floats, media) {
  var length = 0;
  for (var i = index + 1; i < nodes.length; i++) {
    var node = nodes[i];
    if (isNodeInList(node, media)) {
      return false;
    }
    if (node.nodeName === 'P') {
      length += getNodeLength(node);
      if (length >= place.haveToBeAtLeast) {
        return true;
      }
    } else {
      return false;
    }
  }

  return false;
}

function isNodeInList(node, list) {
  for (var i in list) {
    if (list[i] === node) {
      return true;
    }
  }

  return false;
}

function getAdfoxCallSettings(id, place) {
  var methodArguments;
  switch (place.method) {
    case 'show':
    case 'showRich':
    case 'showScroll':
      methodArguments = [id, place.bannerOptions, place.className];
      break;
    case 'show_b':
    case 'showScroll_b':
    case 'ssp':
    case 'sspScroll':
    case 'sspRich':
      methodArguments = [id, place.bannerOptions, place.begunOptions, place.className];
      break;
  }

  return { name: place.method, arguments: methodArguments };
}

function makeCallback(callback) {
  return function (a) {
    callback(a);
  }
}

function fillPlaces(nodes, places, floats, media) {
  var index = 0;
  var stdout = '';
  for (var i in places) {
    var place = places[i];
    for (var ii = index; ii < nodes.length; ii++) {
      var node = nodes[ii];
      var text = node.innerText;
      index = ii;

      if (text) {
        stdout += text;

        // get flags
        var isTooLong = stdout.length > place.offset;
        var isAllowedByLength = place.haveToBeAtLeast
          ? getNodesLength(nodes, ii) > place.haveToBeAtLeast : true;

        // append mock if needed
        if (isTooLong
          && isAllowedByLength
          && isApproved(nodes[ii])
          && isApprovedByPrevious(nodes, ii, place, floats, media)
          && isApprovedByNext(nodes, ii, place, floats, media)
        ) {
          stdout = '';
          index = ii + 1;

          // append mock for the place
          var id = 'content-banner-' + i;
          node.insertAdjacentHTML('afterEnd', '<div id="' + id + '"></div>');

          // draw the banner
          var callback = getAdfoxCallSettings(id, place);
          var method = window.Adf.banner[callback.name];

          var result = method.apply(method, callback.arguments);
          if (place.callback) {
            result.then(
              makeCallback(place.callback)
            );
          }

          // log banner configuration if needed
          if (isDevelopment) {
            console.log('[content-banners] Banner #' + id + ' has been called.', callback.name, callback.arguments);
          }

          break;
        }
      }
    }
  }
}

function validateProperty(source, path, type) {
  var value = source;
  var parts = path.split('.');
  for (var i in parts) {
    var key = parts[i];
    value = value[key];
  }

  var valid = type === 'array' ? value instanceof Array : typeof value === type;
  if (!valid) {
    throw new Error('Property "' + path + '" of options have to be: ' + type + '.');
  }
}

function deduplicate(array) {
  var result = [];
  var cache = {};
  for (var i in array) {
    var value = array[i];
    if (!cache[value]) {
      result.push(value);
      cache[value] = true;
    }
  }

  cache = null;
  return result;
}

window.initAdvertContentBanners = function(options) {
  validateProperty(options, 'root', 'string');
  validateProperty(options, 'places', 'array');
  validateProperty(options, 'nodes', 'array');
  validateProperty(options, 'floats', 'array');
  validateProperty(options, 'media', 'array');

  var places = [];
  for (var i = 0; i < options.places.length; i++) {
    var place = objectAssign({}, defaults, options.places[i], { index: i });
    validateProperty(place, 'offset', 'number');
    validateProperty(place, 'haveToBeAtLeast', 'number');
    validateProperty(place, 'className', 'string');
    validateProperty(place, 'method', 'string');
    validateProperty(place, 'bannerOptions', 'object');
    places.push(place);
  }

  // merge and deduplicate selectors
  var floatsSelectors = options.floats;
  var mediaSelectors = options.media;
  var nodesSelectors = deduplicate(options.nodes.concat(floatsSelectors).concat(mediaSelectors));

  // get nodes lists
  var nodesList = document.querySelectorAll(buildRootSelector(options.root, nodesSelectors));
  var floatsList = document.querySelectorAll(buildRootSelector(options.root, floatsSelectors));
  var mediaList = document.querySelectorAll(buildRootSelector(options.root, mediaSelectors));

  // convert lists to the arrays
  var nodes = Array.prototype.slice.call(nodesList);
  var floats = Array.prototype.slice.call(floatsList);
  var media = Array.prototype.slice.call(mediaList);

  // fill the places
  fillPlaces(nodes, places, floats, media);
};

})();
