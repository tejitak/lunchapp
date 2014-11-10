(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Vue.js v0.11.0
 * (c) 2014 Evan You
 * Released under the MIT License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Vue"] = factory();
	else
		root["Vue"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var extend = _.extend

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefiexed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue (options) {
	  this._init(options)
	}

	/**
	 * Mixin global API
	 */

	extend(Vue, __webpack_require__(2))

	/**
	 * Vue and every constructor that extends Vue has an
	 * associated options object, which can be accessed during
	 * compilation steps as `this.constructor.options`.
	 *
	 * These can be seen as the default options of every
	 * Vue instance.
	 */

	Vue.options = {
	  directives  : __webpack_require__(8),
	  filters     : __webpack_require__(9),
	  partials    : {},
	  transitions : {},
	  components  : {}
	}

	/**
	 * Build up the prototype
	 */

	var p = Vue.prototype

	/**
	 * $data has a setter which does a bunch of
	 * teardown/setup work
	 */

	Object.defineProperty(p, '$data', {
	  get: function () {
	    return this._data
	  },
	  set: function (newData) {
	    this._setData(newData)
	  }
	})

	/**
	 * Mixin internal instance methods
	 */

	extend(p, __webpack_require__(10))
	extend(p, __webpack_require__(11))
	extend(p, __webpack_require__(12))
	extend(p, __webpack_require__(13))

	/**
	 * Mixin public API methods
	 */

	extend(p, __webpack_require__(3))
	extend(p, __webpack_require__(4))
	extend(p, __webpack_require__(5))
	extend(p, __webpack_require__(6))
	extend(p, __webpack_require__(7))

	module.exports = _.Vue = Vue

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var lang   = __webpack_require__(14)
	var extend = lang.extend

	extend(exports, lang)
	extend(exports, __webpack_require__(15))
	extend(exports, __webpack_require__(16))
	extend(exports, __webpack_require__(17))
	extend(exports, __webpack_require__(18))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var mergeOptions = __webpack_require__(19)

	/**
	 * Expose useful internals
	 */

	exports.util       = _
	exports.nextTick   = _.nextTick
	exports.config     = __webpack_require__(20)

	/**
	 * Each instance constructor, including Vue, has a unique
	 * cid. This enables us to create wrapped "child
	 * constructors" for prototypal inheritance and cache them.
	 */

	exports.cid = 0
	var cid = 1

	/**
	 * Class inehritance
	 *
	 * @param {Object} extendOptions
	 */

	exports.extend = function (extendOptions) {
	  extendOptions = extendOptions || {}
	  var Super = this
	  var Sub = createClass(extendOptions.name || 'VueComponent')
	  Sub.prototype = Object.create(Super.prototype)
	  Sub.prototype.constructor = Sub
	  Sub.cid = cid++
	  Sub.options = mergeOptions(
	    Super.options,
	    extendOptions
	  )
	  Sub['super'] = Super
	  // allow further extension
	  Sub.extend = Super.extend
	  // create asset registers, so extended classes
	  // can have their private assets too.
	  createAssetRegisters(Sub)
	  return Sub
	}

	/**
	 * A function that returns a sub-class constructor with the
	 * given name. This gives us much nicer output when
	 * logging instances in the console.
	 *
	 * @param {String} name
	 * @return {Function}
	 */

	function createClass (name) {
	  return new Function(
	    'return function ' + _.camelize(name, true) +
	    ' (options) { this._init(options) }'
	  )()
	}

	/**
	 * Plugin system
	 *
	 * @param {Object} plugin
	 */

	exports.use = function (plugin) {
	  // additional parameters
	  var args = _.toArray(arguments, 1)
	  args.unshift(this)
	  if (typeof plugin.install === 'function') {
	    plugin.install.apply(plugin, args)
	  } else {
	    plugin.apply(null, args)
	  }
	  return this
	}

	/**
	 * Define asset registration methods on a constructor.
	 *
	 * @param {Function} Constructor
	 */

	var assetTypes = [
	  'directive',
	  'filter',
	  'partial',
	  'transition'
	]

	function createAssetRegisters (Constructor) {

	  /* Asset registration methods share the same signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  assetTypes.forEach(function (type) {
	    Constructor[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        this.options[type + 's'][id] = definition
	      }
	    }
	  })

	  /**
	   * Component registration needs to automatically invoke
	   * Vue.extend on object values.
	   *
	   * @param {String} id
	   * @param {Object|Function} definition
	   */

	  Constructor.component = function (id, definition) {
	    if (!definition) {
	      return this.options.components[id]
	    } else {
	      if (_.isPlainObject(definition)) {
	        definition.name = id
	        definition = _.Vue.extend(definition)
	      }
	      this.options.components[id] = definition
	    }
	  }
	}

	createAssetRegisters(exports)

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var Watcher = __webpack_require__(21)
	var Path = __webpack_require__(41)
	var textParser = __webpack_require__(42)
	var dirParser = __webpack_require__(43)
	var expParser = __webpack_require__(44)
	var filterRE = /[^|]\|[^|]/

	/**
	 * Get the value from an expression on this vm.
	 *
	 * @param {String} exp
	 * @return {*}
	 */

	exports.$get = function (exp) {
	  var res = expParser.parse(exp)
	  if (res) {
	    return res.get.call(this, this)
	  }
	}

	/**
	 * Set the value from an expression on this vm.
	 * The expression must be a valid left-hand
	 * expression in an assignment.
	 *
	 * @param {String} exp
	 * @param {*} val
	 */

	exports.$set = function (exp, val) {
	  var res = expParser.parse(exp, true)
	  if (res && res.set) {
	    res.set.call(this, this, val)
	  }
	}

	/**
	 * Add a property on the VM
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	exports.$add = function (key, val) {
	  this._data.$add(key, val)
	}

	/**
	 * Delete a property on the VM
	 *
	 * @param {String} key
	 */

	exports.$delete = function (key) {
	  this._data.$delete(key)
	}

	/**
	 * Watch an expression, trigger callback when its
	 * value changes.
	 *
	 * @param {String} exp
	 * @param {Function} cb
	 * @param {Boolean} [deep]
	 * @param {Boolean} [immediate]
	 * @return {Function} - unwatchFn
	 */

	exports.$watch = function (exp, cb, deep, immediate) {
	  var vm = this
	  var key = deep ? exp + '**deep**' : exp
	  var watcher = vm._userWatchers[key]
	  var wrappedCb = function (val, oldVal) {
	    cb.call(vm, val, oldVal)
	  }
	  if (!watcher) {
	    watcher = vm._userWatchers[key] =
	      new Watcher(vm, exp, wrappedCb, null, false, deep)
	  } else {
	    watcher.addCb(wrappedCb)
	  }
	  if (immediate) {
	    wrappedCb(watcher.value)
	  }
	  return function unwatchFn () {
	    watcher.removeCb(wrappedCb)
	    if (!watcher.active) {
	      vm._userWatchers[key] = null
	    }
	  }
	}

	/**
	 * Evaluate a text directive, including filters.
	 *
	 * @param {String} text
	 * @return {String}
	 */

	exports.$eval = function (text) {
	  // check for filters.
	  if (filterRE.test(text)) {
	    var dir = dirParser.parse(text)[0]
	    // the filter regex check might give false positive
	    // for pipes inside strings, so it's possible that
	    // we don't get any filters here
	    return dir.filters
	      ? _.applyFilters(
	          this.$get(dir.expression),
	          _.resolveFilters(this, dir.filters).read,
	          this
	        )
	      : this.$get(dir.expression)
	  } else {
	    // no filter
	    return this.$get(text)
	  }
	}

	/**
	 * Interpolate a piece of template text.
	 *
	 * @param {String} text
	 * @return {String}
	 */

	exports.$interpolate = function (text) {
	  var tokens = textParser.parse(text)
	  var vm = this
	  if (tokens) {
	    return tokens.length === 1
	      ? vm.$eval(tokens[0].value)
	      : tokens.map(function (token) {
	          return token.tag
	            ? vm.$eval(token.value)
	            : token.value
	        }).join('')
	  } else {
	    return text
	  }
	}

	/**
	 * Log instance data as a plain JS object
	 * so that it is easier to inspect in console.
	 * This method assumes console is available.
	 *
	 * @param {String} [path]
	 */

	exports.$log = function (path) {
	  var data = path
	    ? Path.get(this, path)
	    : this._data
	  console.log(JSON.parse(JSON.stringify(data)))
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var transition = __webpack_require__(45)

	/**
	 * Append instance to target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$appendTo = function (target, cb, withTransition) {
	  target = query(target)
	  var targetIsDetached = !_.inDoc(target)
	  var op = withTransition === false || targetIsDetached
	    ? append
	    : transition.append
	  insert(this, target, op, targetIsDetached, cb)
	  return this
	}

	/**
	 * Prepend instance to target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$prependTo = function (target, cb, withTransition) {
	  target = query(target)
	  if (target.hasChildNodes()) {
	    this.$before(target.firstChild, cb, withTransition)
	  } else {
	    this.$appendTo(target, cb, withTransition)
	  }
	  return this
	}

	/**
	 * Insert instance before target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$before = function (target, cb, withTransition) {
	  target = query(target)
	  var targetIsDetached = !_.inDoc(target)
	  var op = withTransition === false || targetIsDetached
	    ? before
	    : transition.before
	  insert(this, target, op, targetIsDetached, cb)
	  return this
	}

	/**
	 * Insert instance after target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$after = function (target, cb, withTransition) {
	  target = query(target)
	  if (target.nextSibling) {
	    this.$before(target.nextSibling, cb, withTransition)
	  } else {
	    this.$appendTo(target.parentNode, cb, withTransition)
	  }
	  return this
	}

	/**
	 * Remove instance from DOM
	 *
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$remove = function (cb, withTransition) {
	  var inDoc = this._isAttached && _.inDoc(this.$el)
	  // if we are not in document, no need to check
	  // for transitions
	  if (!inDoc) withTransition = false
	  var op
	  var self = this
	  var realCb = function () {
	    if (inDoc) self._callHook('detached')
	    if (cb) cb()
	  }
	  if (
	    this._isBlock &&
	    !this._blockFragment.hasChildNodes()
	  ) {
	    op = withTransition === false
	      ? append
	      : transition.removeThenAppend 
	    blockOp(this, this._blockFragment, op, realCb)
	  } else {
	    op = withTransition === false
	      ? remove
	      : transition.remove
	    op(this.$el, this, realCb)
	  }
	  return this
	}

	/**
	 * Shared DOM insertion function.
	 *
	 * @param {Vue} vm
	 * @param {Element} target
	 * @param {Function} op
	 * @param {Boolean} targetIsDetached
	 * @param {Function} [cb]
	 */

	function insert (vm, target, op, targetIsDetached, cb) {
	  var shouldCallHook =
	    !targetIsDetached &&
	    !vm._isAttached &&
	    !_.inDoc(vm.$el)
	  if (vm._isBlock) {
	    blockOp(vm, target, op, cb)
	  } else {
	    op(vm.$el, target, vm, cb)
	  }
	  if (shouldCallHook) {
	    vm._callHook('attached')
	  }
	}

	/**
	 * Execute a transition operation on a block instance,
	 * iterating through all its block nodes.
	 *
	 * @param {Vue} vm
	 * @param {Node} target
	 * @param {Function} op
	 * @param {Function} cb
	 */

	function blockOp (vm, target, op, cb) {
	  var current = vm._blockStart
	  var end = vm._blockEnd
	  var next
	  while (next !== end) {
	    next = current.nextSibling
	    op(current, target, vm)
	    current = next
	  }
	  op(end, target, vm, cb)
	}

	/**
	 * Check for selectors
	 *
	 * @param {String|Element} el
	 */

	function query (el) {
	  return typeof el === 'string'
	    ? document.querySelector(el)
	    : el
	}

	/**
	 * Append operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Node} target
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */

	function append (el, target, vm, cb) {
	  target.appendChild(el)
	  if (cb) cb()
	}

	/**
	 * InsertBefore operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Node} target
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */

	function before (el, target, vm, cb) {
	  _.before(el, target)
	  if (cb) cb()
	}

	/**
	 * Remove operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */

	function remove (el, vm, cb) {
	  _.remove(el)
	  if (cb) cb()
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */

	exports.$on = function (event, fn) {
	  (this._events[event] || (this._events[event] = []))
	    .push(fn)
	  modifyListenerCount(this, event, 1)
	  return this
	}

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */

	exports.$once = function (event, fn) {
	  var self = this
	  function on () {
	    self.$off(event, on)
	    fn.apply(this, arguments)
	  }
	  on.fn = fn
	  this.$on(event, on)
	  return this
	}

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */

	exports.$off = function (event, fn) {
	  var cbs
	  // all
	  if (!arguments.length) {
	    if (this.$parent) {
	      for (event in this._events) {
	        cbs = this._events[event]
	        if (cbs) {
	          modifyListenerCount(this, event, -cbs.length)
	        }
	      }
	    }
	    this._events = {}
	    return this
	  }
	  // specific event
	  cbs = this._events[event]
	  if (!cbs) {
	    return this
	  }
	  if (arguments.length === 1) {
	    modifyListenerCount(this, event, -cbs.length)
	    this._events[event] = null
	    return this
	  }
	  // specific handler
	  var cb
	  var i = cbs.length
	  while (i--) {
	    cb = cbs[i]
	    if (cb === fn || cb.fn === fn) {
	      modifyListenerCount(this, event, -1)
	      cbs.splice(i, 1)
	      break
	    }
	  }
	  return this
	}

	/**
	 * Trigger an event on self.
	 *
	 * @param {String} event
	 */

	exports.$emit = function (event) {
	  this._eventCancelled = false
	  var cbs = this._events[event]
	  if (cbs) {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length - 1
	    var args = new Array(i)
	    while (i--) {
	      args[i] = arguments[i + 1]
	    }
	    i = 0
	    cbs = cbs.length > 1
	      ? _.toArray(cbs)
	      : cbs
	    for (var l = cbs.length; i < l; i++) {
	      if (cbs[i].apply(this, args) === false) {
	        this._eventCancelled = true
	      }
	    }
	  }
	  return this
	}

	/**
	 * Recursively broadcast an event to all children instances.
	 *
	 * @param {String} event
	 * @param {...*} additional arguments
	 */

	exports.$broadcast = function (event) {
	  // if no child has registered for this event,
	  // then there's no need to broadcast.
	  if (!this._eventsCount[event]) return
	  var children = this._children
	  if (children) {
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i]
	      child.$emit.apply(child, arguments)
	      if (!child._eventCancelled) {
	        child.$broadcast.apply(child, arguments)
	      }
	    }
	  }
	  return this
	}

	/**
	 * Recursively propagate an event up the parent chain.
	 *
	 * @param {String} event
	 * @param {...*} additional arguments
	 */

	exports.$dispatch = function () {
	  var parent = this.$parent
	  while (parent) {
	    parent.$emit.apply(parent, arguments)
	    parent = parent._eventCancelled
	      ? null
	      : parent.$parent
	  }
	  return this
	}

	/**
	 * Modify the listener counts on all parents.
	 * This bookkeeping allows $broadcast to return early when
	 * no child has listened to a certain event.
	 *
	 * @param {Vue} vm
	 * @param {String} event
	 * @param {Number} count
	 */

	var hookRE = /^hook:/
	function modifyListenerCount (vm, event, count) {
	  var parent = vm.$parent
	  // hooks do not get broadcasted so no need
	  // to do bookkeeping for them
	  if (!parent || !count || hookRE.test(event)) return
	  while (parent) {
	    parent._eventsCount[event] =
	      (parent._eventsCount[event] || 0) + count
	    parent = parent.$parent
	  }
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)

	/**
	 * Create a child instance that prototypally inehrits
	 * data on parent. To achieve that we create an intermediate
	 * constructor with its prototype pointing to parent.
	 *
	 * @param {Object} opts
	 * @param {Function} [BaseCtor]
	 * @return {Vue}
	 * @public
	 */

	exports.$addChild = function (opts, BaseCtor) {
	  BaseCtor = BaseCtor || _.Vue
	  opts = opts || {}
	  var parent = this
	  var ChildVue
	  var inherit = opts.inherit !== undefined
	    ? opts.inherit
	    : BaseCtor.options.inherit
	  if (inherit) {
	    var ctors = parent._childCtors
	    if (!ctors) {
	      ctors = parent._childCtors = {}
	    }
	    ChildVue = ctors[BaseCtor.cid]
	    if (!ChildVue) {
	      var optionName = BaseCtor.options.name
	      var className = optionName
	        ? _.camelize(optionName, true)
	        : 'VueComponent'
	      ChildVue = new Function(
	        'return function ' + className + ' (options) {' +
	        'this.constructor = ' + className + ';' +
	        'this._init(options) }'
	      )()
	      ChildVue.options = BaseCtor.options
	      ChildVue.prototype = this
	      ctors[BaseCtor.cid] = ChildVue
	    }
	  } else {
	    ChildVue = BaseCtor
	  }
	  opts._parent = parent
	  opts._root = parent.$root
	  var child = new ChildVue(opts)
	  if (!this._children) {
	    this._children = []
	  }
	  this._children.push(child)
	  return child
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var compile = __webpack_require__(46)

	/**
	 * Set instance target element and kick off the compilation
	 * process. The passed in `el` can be a selector string, an
	 * existing Element, or a DocumentFragment (for block
	 * instances).
	 *
	 * @param {Element|DocumentFragment|string} el
	 * @public
	 */

	exports.$mount = function (el) {
	  if (this._isCompiled) {
	    _.warn('$mount() should be called only once.')
	    return
	  }
	  if (!el) {
	    el = document.createElement('div')
	  } else if (typeof el === 'string') {
	    var selector = el
	    el = document.querySelector(el)
	    if (!el) {
	      _.warn('Cannot find element: ' + selector)
	      return
	    }
	  }
	  this._compile(el)
	  this._isCompiled = true
	  this._callHook('compiled')
	  if (_.inDoc(this.$el)) {
	    this._callHook('attached')
	    this._initDOMHooks()
	    ready.call(this)
	  } else {
	    this._initDOMHooks()
	    this.$once('hook:attached', ready)
	  }
	  return this
	}

	/**
	 * Mark an instance as ready.
	 */

	function ready () {
	  this._isAttached = true
	  this._isReady = true
	  this._callHook('ready')
	}

	/**
	 * Teardown an instance, unobserves the data, unbind all the
	 * directives, turn off all the event listeners, etc.
	 *
	 * @param {Boolean} remove - whether to remove the DOM node.
	 * @public
	 */

	exports.$destroy = function (remove) {
	  if (this._isBeingDestroyed) {
	    return
	  }
	  this._callHook('beforeDestroy')
	  this._isBeingDestroyed = true
	  var i
	  // remove self from parent. only necessary
	  // if parent is not being destroyed as well.
	  var parent = this.$parent
	  if (parent && !parent._isBeingDestroyed) {
	    i = parent._children.indexOf(this)
	    parent._children.splice(i, 1)
	  }
	  // destroy all children.
	  if (this._children) {
	    i = this._children.length
	    while (i--) {
	      this._children[i].$destroy()
	    }
	  }
	  // teardown all directives. this also tearsdown all
	  // directive-owned watchers.
	  i = this._directives.length
	  while (i--) {
	    this._directives[i]._teardown()
	  }
	  // teardown all user watchers.
	  for (i in this._userWatchers) {
	    this._userWatchers[i].teardown()
	  }
	  // remove reference to self on $el
	  if (this.$el) {
	    this.$el.__vue__ = null
	  }
	  // remove DOM element
	  var self = this
	  if (remove && this.$el) {
	    this.$remove(function () {
	      cleanup(self)
	    })
	  } else {
	    cleanup(self)
	  }
	}

	/**
	 * Clean up to ensure garbage collection.
	 * This is called after the leave transition if there
	 * is any.
	 *
	 * @param {Vue} vm
	 */

	function cleanup (vm) {
	  // remove reference from data ob
	  vm._data.__ob__.removeVm(vm)
	  vm._data =
	  vm._watchers =
	  vm._userWatchers =
	  vm._watcherList =
	  vm.$el =
	  vm.$parent =
	  vm.$root =
	  vm._children =
	  vm._bindings =
	  vm._directives = null
	  // call the last hook...
	  vm._isDestroyed = true
	  vm._callHook('destroyed')
	  // turn off all instance listeners.
	  vm.$off() 
	}

	/**
	 * Partially compile a piece of DOM and return a
	 * decompile function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @return {Function}
	 */

	exports.$compile = function (el) {
	  return compile(el, this.$options, true)(this, el)
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// manipulation directives
	exports.text       = __webpack_require__(22)
	exports.html       = __webpack_require__(23)
	exports.attr       = __webpack_require__(24)
	exports.show       = __webpack_require__(25)
	exports['class']   = __webpack_require__(26)
	exports.el         = __webpack_require__(27)
	exports.ref        = __webpack_require__(28)
	exports.cloak      = __webpack_require__(29)
	exports.style      = __webpack_require__(30)
	exports.partial    = __webpack_require__(31)
	exports.transition = __webpack_require__(32)

	// event listener directives
	exports.on         = __webpack_require__(33)
	exports.model      = __webpack_require__(48)

	// child vm directives
	exports.component  = __webpack_require__(34)
	exports.repeat     = __webpack_require__(35)
	exports['if']      = __webpack_require__(36)
	exports['with']    = __webpack_require__(37)

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)

	/**
	 * Stringify value.
	 *
	 * @param {Number} indent
	 */

	exports.json = function (value, indent) {
	  return JSON.stringify(value, null, Number(indent) || 2)
	}

	/**
	 * 'abc' => 'Abc'
	 */

	exports.capitalize = function (value) {
	  if (!value && value !== 0) return ''
	  value = value.toString()
	  return value.charAt(0).toUpperCase() + value.slice(1)
	}

	/**
	 * 'abc' => 'ABC'
	 */

	exports.uppercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toUpperCase()
	    : ''
	}

	/**
	 * 'AbC' => 'abc'
	 */

	exports.lowercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toLowerCase()
	    : ''
	}

	/**
	 * 12345 => $12,345.00
	 *
	 * @param {String} sign
	 */

	var digitsRE = /(\d{3})(?=\d)/g

	exports.currency = function (value, sign) {
	  value = parseFloat(value)
	  if (!value && value !== 0) return ''
	  sign = sign || '$'
	  var s = Math.floor(Math.abs(value)).toString(),
	    i = s.length % 3,
	    h = i > 0
	      ? (s.slice(0, i) + (s.length > 3 ? ',' : ''))
	      : '',
	    f = '.' + value.toFixed(2).slice(-2)
	  return (value < 0 ? '-' : '') +
	    sign + h + s.slice(i).replace(digitsRE, '$1,') + f
	}

	/**
	 * 'item' => 'items'
	 *
	 * @params
	 *  an array of strings corresponding to
	 *  the single, double, triple ... forms of the word to
	 *  be pluralized. When the number to be pluralized
	 *  exceeds the length of the args, it will use the last
	 *  entry in the array.
	 *
	 *  e.g. ['single', 'double', 'triple', 'multiple']
	 */

	exports.pluralize = function (value) {
	  var args = _.toArray(arguments, 1)
	  return args.length > 1
	    ? (args[value % 10 - 1] || args[args.length - 1])
	    : (args[0] + (value === 1 ? '' : 's'))
	}

	/**
	 * A special filter that takes a handler function,
	 * wraps it so it only gets triggered on specific
	 * keypresses. v-on only.
	 *
	 * @param {String} key
	 */

	var keyCodes = {
	  enter    : 13,
	  tab      : 9,
	  'delete' : 46,
	  up       : 38,
	  left     : 37,
	  right    : 39,
	  down     : 40,
	  esc      : 27
	}

	exports.key = function (handler, key) {
	  if (!handler) return
	  var code = keyCodes[key]
	  if (!code) {
	    code = parseInt(key, 10)
	  }
	  return function (e) {
	    if (e.keyCode === code) {
	      return handler.call(this, e)
	    }
	  }
	}

	/**
	 * Install special array filters
	 */

	_.extend(exports, __webpack_require__(38))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var mergeOptions = __webpack_require__(19)

	/**
	 * The main init sequence. This is called for every
	 * instance, including ones that are created from extended
	 * constructors.
	 *
	 * @param {Object} options - this options object should be
	 *                           the result of merging class
	 *                           options and the options passed
	 *                           in to the constructor.
	 */

	exports._init = function (options) {

	  options = options || {}

	  this.$el           = null
	  this.$parent       = options._parent
	  this.$root         = options._root || this
	  this.$             = {} // child vm references
	  this.$$            = {} // element references
	  this._watcherList  = [] // all watchers as an array
	  this._watchers     = {} // internal watchers as a hash
	  this._userWatchers = {} // user watchers as a hash
	  this._directives   = [] // all directives

	  // a flag to avoid this being observed
	  this._isVue = true

	  // events bookkeeping
	  this._events         = {}    // registered callbacks
	  this._eventsCount    = {}    // for $broadcast optimization
	  this._eventCancelled = false // for event cancellation

	  // block instance properties
	  this._isBlock     = false
	  this._blockStart  =          // @type {CommentNode}
	  this._blockEnd    = null     // @type {CommentNode}

	  // lifecycle state
	  this._isCompiled  =
	  this._isDestroyed =
	  this._isReady     =
	  this._isAttached  =
	  this._isBeingDestroyed = false

	  // children
	  this._children =         // @type {Array}
	  this._childCtors = null  // @type {Object} - hash to cache
	                           // child constructors

	  // merge options.
	  options = this.$options = mergeOptions(
	    this.constructor.options,
	    options,
	    this
	  )

	  // set data after merge.
	  this._data = options.data || {}

	  // initialize data observation and scope inheritance.
	  this._initScope()

	  // setup event system and option events.
	  this._initEvents()

	  // call created hook
	  this._callHook('created')

	  // if `el` option is passed, start compilation.
	  if (options.el) {
	    this.$mount(options.el)
	  }
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var inDoc = _.inDoc

	/**
	 * Setup the instance's option events & watchers.
	 * If the value is a string, we pull it from the
	 * instance's methods by name.
	 */

	exports._initEvents = function () {
	  var options = this.$options
	  registerCallbacks(this, '$on', options.events)
	  registerCallbacks(this, '$watch', options.watch)
	}

	/**
	 * Register callbacks for option events and watchers.
	 *
	 * @param {Vue} vm
	 * @param {String} action
	 * @param {Object} hash
	 */

	function registerCallbacks (vm, action, hash) {
	  if (!hash) return
	  var handlers, key, i, j
	  for (key in hash) {
	    handlers = hash[key]
	    if (_.isArray(handlers)) {
	      for (i = 0, j = handlers.length; i < j; i++) {
	        register(vm, action, key, handlers[i])
	      }
	    } else {
	      register(vm, action, key, handlers)
	    }
	  }
	}

	/**
	 * Helper to register an event/watch callback.
	 *
	 * @param {Vue} vm
	 * @param {String} action
	 * @param {String} key
	 * @param {*} handler
	 */

	function register (vm, action, key, handler) {
	  var type = typeof handler
	  if (type === 'function') {
	    vm[action](key, handler)
	  } else if (type === 'string') {
	    var methods = vm.$options.methods
	    var method = methods && methods[handler]
	    if (method) {
	      vm[action](key, method)
	    } else {
	      _.warn(
	        'Unknown method: "' + handler + '" when ' +
	        'registering callback for ' + action +
	        ': "' + key + '".'
	      )
	    }
	  }
	}

	/**
	 * Setup recursive attached/detached calls
	 */

	exports._initDOMHooks = function () {
	  this.$on('hook:attached', onAttached)
	  this.$on('hook:detached', onDetached)
	}

	/**
	 * Callback to recursively call attached hook on children
	 */

	function onAttached () {
	  this._isAttached = true
	  var children = this._children
	  if (!children) return
	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i]
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached')
	    }
	  }
	}

	/**
	 * Callback to recursively call detached hook on children
	 */

	function onDetached () {
	  this._isAttached = false
	  var children = this._children
	  if (!children) return
	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i]
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached')
	    }
	  }
	}

	/**
	 * Trigger all handlers for a hook
	 *
	 * @param {String} hook
	 */

	exports._callHook = function (hook) {
	  var handlers = this.$options[hook]
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(this)
	    }
	  }
	  this.$emit('hook:' + hook)
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var Observer = __webpack_require__(49)
	var Binding = __webpack_require__(39)

	/**
	 * Setup the scope of an instance, which contains:
	 * - observed data
	 * - computed properties
	 * - user methods
	 * - meta properties
	 */

	exports._initScope = function () {
	  this._initData()
	  this._initComputed()
	  this._initMethods()
	  this._initMeta()
	}

	/**
	 * Initialize the data. 
	 */

	exports._initData = function () {
	  // proxy data on instance
	  var data = this._data
	  var keys = Object.keys(data)
	  var i = keys.length
	  var key
	  while (i--) {
	    key = keys[i]
	    if (!_.isReserved(key)) {
	      this._proxy(key)
	    }
	  }
	  // observe data
	  Observer.create(data).addVm(this)
	}

	/**
	 * Swap the isntance's $data. Called in $data's setter.
	 *
	 * @param {Object} newData
	 */

	exports._setData = function (newData) {
	  newData = newData || {}
	  var oldData = this._data
	  this._data = newData
	  var keys, key, i
	  // unproxy keys not present in new data
	  keys = Object.keys(oldData)
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    if (!_.isReserved(key) && !(key in newData)) {
	      this._unproxy(key)
	    }
	  }
	  // proxy keys not already proxied,
	  // and trigger change for changed values
	  keys = Object.keys(newData)
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    if (!this.hasOwnProperty(key) && !_.isReserved(key)) {
	      // new property
	      this._proxy(key)
	    }
	  }
	  oldData.__ob__.removeVm(this)
	  Observer.create(newData).addVm(this)
	  this._digest()
	}

	/**
	 * Proxy a property, so that
	 * vm.prop === vm._data.prop
	 *
	 * @param {String} key
	 */

	exports._proxy = function (key) {
	  // need to store ref to self here
	  // because these getter/setters might
	  // be called by child instances!
	  var self = this
	  Object.defineProperty(self, key, {
	    configurable: true,
	    enumerable: true,
	    get: function proxyGetter () {
	      return self._data[key]
	    },
	    set: function proxySetter (val) {
	      self._data[key] = val
	    }
	  })
	}

	/**
	 * Unproxy a property.
	 *
	 * @param {String} key
	 */

	exports._unproxy = function (key) {
	  delete this[key]
	}

	/**
	 * Force update on every watcher in scope.
	 */

	exports._digest = function () {
	  var i = this._watcherList.length
	  while (i--) {
	    this._watcherList[i].update()
	  }
	  var children = this._children
	  var child
	  if (children) {
	    i = children.length
	    while (i--) {
	      child = children[i]
	      if (child.$options.inherit) {
	        child._digest()
	      }
	    }
	  }
	}

	/**
	 * Setup computed properties. They are essentially
	 * special getter/setters
	 */

	function noop () {}
	exports._initComputed = function () {
	  var computed = this.$options.computed
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key]
	      var def = {
	        enumerable: true,
	        configurable: true
	      }
	      if (typeof userDef === 'function') {
	        def.get = _.bind(userDef, this)
	        def.set = noop
	      } else {
	        def.get = userDef.get
	          ? _.bind(userDef.get, this)
	          : noop
	        def.set = userDef.set
	          ? _.bind(userDef.set, this)
	          : noop
	      }
	      Object.defineProperty(this, key, def)
	    }
	  }
	}

	/**
	 * Setup instance methods. Methods must be bound to the
	 * instance since they might be called by children
	 * inheriting them.
	 */

	exports._initMethods = function () {
	  var methods = this.$options.methods
	  if (methods) {
	    for (var key in methods) {
	      this[key] = _.bind(methods[key], this)
	    }
	  }
	}

	/**
	 * Initialize meta information like $index, $key & $value.
	 */

	exports._initMeta = function () {
	  var metas = this.$options._meta
	  if (metas) {
	    for (var key in metas) {
	      this._defineMeta(key, metas[key])
	    }
	  }
	}

	/**
	 * Define a meta property, e.g $index, $key, $value
	 * which only exists on the vm instance but not in $data.
	 *
	 * @param {String} key
	 * @param {*} value
	 */

	exports._defineMeta = function (key, value) {
	  var binding = new Binding()
	  Object.defineProperty(this, key, {
	    enumerable: true,
	    configurable: true,
	    get: function metaGetter () {
	      if (Observer.target) {
	        Observer.target.addDep(binding)
	      }
	      return value
	    },
	    set: function metaSetter (val) {
	      if (val !== value) {
	        value = val
	        binding.notify()
	      }
	    }
	  })
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var Directive = __webpack_require__(40)
	var compile = __webpack_require__(46)
	var transclude = __webpack_require__(47)

	/**
	 * Transclude, compile and link element.
	 *
	 * If a pre-compiled linker is available, that means the
	 * passed in element will be pre-transcluded and compiled
	 * as well - all we need to do is to call the linker.
	 *
	 * Otherwise we need to call transclude/compile/link here.
	 *
	 * @param {Element} el
	 * @return {Element}
	 */

	exports._compile = function (el) {
	  var options = this.$options
	  if (options._linker) {
	    this._initElement(el)
	    options._linker(this, el)
	  } else {
	    var raw = el
	    el = transclude(el, options)
	    this._initElement(el)
	    var linker = compile(el, options)
	    linker(this, el)
	    if (options.replace) {
	      _.replace(raw, el)
	    }
	  }
	  return el
	}

	/**
	 * Initialize instance element. Called in the public
	 * $mount() method.
	 *
	 * @param {Element} el
	 */

	exports._initElement = function (el) {
	  if (el instanceof DocumentFragment) {
	    this._isBlock = true
	    this.$el = this._blockStart = el.firstChild
	    this._blockEnd = el.lastChild
	    this._blockFragment = el
	  } else {
	    this.$el = el
	  }
	  this.$el.__vue__ = this
	  this._callHook('beforeCompile')
	}

	/**
	 * Create and bind a directive to an element.
	 *
	 * @param {String} name - directive name
	 * @param {Node} node   - target node
	 * @param {Object} desc - parsed directive descriptor
	 * @param {Object} def  - directive definition object
	 * @param {Function} [linker] - pre-compiled linker fn
	 */

	exports._bindDir = function (name, node, desc, def, linker) {
	  this._directives.push(
	    new Directive(name, node, this, desc, def, linker)
	  )
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Check is a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	exports.isReserved = function (str) {
	  var c = str.charCodeAt(0)
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	exports.toString = function (value) {
	  return value == null
	    ? ''
	    : value.toString()
	}

	/**
	 * Check and convert possible numeric numbers before
	 * setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	exports.toNumber = function (value) {
	  return (
	    isNaN(value) ||
	    value === null ||
	    typeof value === 'boolean'
	  ) ? value
	    : Number(value)
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	exports.stripQuotes = function (str) {
	  var a = str.charCodeAt(0)
	  var b = str.charCodeAt(str.length - 1)
	  return a === b && (a === 0x22 || a === 0x27)
	    ? str.slice(1, -1)
	    : false
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelRE = /[-_](\w)/g
	var capitalCamelRE = /(?:^|[-_])(\w)/g

	exports.camelize = function (str, cap) {
	  var RE = cap ? capitalCamelRE : camelRE
	  return str.replace(RE, function (_, c) {
	    return c ? c.toUpperCase () : '';
	  })
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	exports.bind = function (fn, ctx) {
	  return function () {
	    return fn.apply(ctx, arguments)
	  }
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	exports.toArray = function (list, start) {
	  start = start || 0
	  var i = list.length - start
	  var ret = new Array(i)
	  while (i--) {
	    ret[i] = list[i + start]
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	exports.extend = function (to, from) {
	  for (var key in from) {
	    to[key] = from[key]
	  }
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	exports.isObject = function (obj) {
	  return obj && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString
	exports.isPlainObject = function (obj) {
	  return toString.call(obj) === '[object Object]'
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	exports.isArray = function (obj) {
	  return Array.isArray(obj)
	}

	/**
	 * Define a non-enumerable property
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	exports.define = function (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value        : val,
	    enumerable   : !!enumerable,
	    writable     : true,
	    configurable : true
	  })
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Can we use __proto__?
	 *
	 * @type {Boolean}
	 */

	exports.hasProto = '__proto__' in {}

	/**
	 * Indicates we have a window
	 *
	 * @type {Boolean}
	 */

	var toString = Object.prototype.toString
	var inBrowser = exports.inBrowser =
	  typeof window !== 'undefined' &&
	  toString.call(window) !== '[object Object]'

	/**
	 * Defer a task to the start of the next event loop
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var defer = inBrowser
	  ? (window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    setTimeout)
	  : setTimeout

	exports.nextTick = function (cb, ctx) {
	  if (ctx) {
	    defer(function () { cb.call(ctx) }, 0)
	  } else {
	    defer(cb, 0)
	  }
	}

	/**
	 * Detect if we are in IE9...
	 *
	 * @type {Boolean}
	 */

	exports.isIE9 =
	  inBrowser &&
	  navigator.userAgent.indexOf('MSIE 9.0') > 0

	/**
	 * Sniff transition/animation events
	 */

	if (inBrowser && !exports.isIE9) {
	  var isWebkitTrans =
	    window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined
	  var isWebkitAnim =
	    window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined
	  exports.transitionProp = isWebkitTrans
	    ? 'WebkitTransition'
	    : 'transition'
	  exports.transitionEndEvent = isWebkitTrans
	    ? 'webkitTransitionEnd'
	    : 'transitionend'
	  exports.animationProp = isWebkitAnim
	    ? 'WebkitAnimation'
	    : 'animation'
	  exports.animationEndEvent = isWebkitAnim
	    ? 'webkitAnimationEnd'
	    : 'animationend'
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(20)

	/**
	 * Check if a node is in the document.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	var doc =
	  typeof document !== 'undefined' &&
	  document.documentElement

	exports.inDoc = function (node) {
	  return doc && doc.contains(node)
	}

	/**
	 * Extract an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} attr
	 */

	exports.attr = function (node, attr) {
	  attr = config.prefix + attr
	  var val = node.getAttribute(attr)
	  if (val !== null) {
	    node.removeAttribute(attr)
	  }
	  return val
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target 
	 */

	exports.before = function (el, target) {
	  target.parentNode.insertBefore(el, target)
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target 
	 */

	exports.after = function (el, target) {
	  if (target.nextSibling) {
	    exports.before(el, target.nextSibling)
	  } else {
	    target.parentNode.appendChild(el)
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	exports.remove = function (el) {
	  el.parentNode.removeChild(el)
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target 
	 */

	exports.prepend = function (el, target) {
	  if (target.firstChild) {
	    exports.before(el, target.firstChild)
	  } else {
	    target.appendChild(el)
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	exports.replace = function (target, el) {
	  var parent = target.parentNode
	  if (parent) {
	    parent.replaceChild(el, target)
	  }
	}

	/**
	 * Copy attributes from one element to another.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	exports.copyAttributes = function (from, to) {
	  if (from.hasAttributes()) {
	    var attrs = from.attributes
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var attr = attrs[i]
	      to.setAttribute(attr.name, attr.value)
	    }
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	exports.on = function (el, event, cb) {
	  el.addEventListener(event, cb)
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	exports.off = function (el, event, cb) {
	  el.removeEventListener(event, cb)
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	exports.addClass = function (el, cls) {
	  if (el.classList) {
	    el.classList.add(cls)
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' '
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim())
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	exports.removeClass = function (el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls)
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' '
	    var tar = ' ' + cls + ' '
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ')
	    }
	    el.setAttribute('class', cur.trim())
	  }
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(18)

	/**
	 * Resolve read & write filters for a vm instance. The
	 * filters descriptor Array comes from the directive parser.
	 *
	 * This is extracted into its own utility so it can
	 * be used in multiple scenarios.
	 *
	 * @param {Vue} vm
	 * @param {Array<Object>} filters
	 * @param {Object} [target]
	 * @return {Object}
	 */

	exports.resolveFilters = function (vm, filters, target) {
	  if (!filters) {
	    return
	  }
	  var res = target || {}
	  // var registry = vm.$options.filters
	  filters.forEach(function (f) {
	    var def = vm.$options.filters[f.name]
	    _.assertAsset(def, 'filter', f.name)
	    if (!def) return
	    var args = f.args
	    var reader, writer
	    if (typeof def === 'function') {
	      reader = def
	    } else {
	      reader = def.read
	      writer = def.write
	    }
	    if (reader) {
	      if (!res.read) res.read = []
	      res.read.push(function (value) {
	        return args
	          ? reader.apply(vm, [value].concat(args))
	          : reader.call(vm, value)
	      })
	    }
	    if (writer) {
	      if (!res.write) res.write = []
	      res.write.push(function (value, oldVal) {
	        return args
	          ? writer.apply(vm, [value, oldVal].concat(args))
	          : writer.call(vm, value, oldVal)
	      })
	    }
	  })
	  return res
	}

	/**
	 * Apply filters to a value
	 *
	 * @param {*} value
	 * @param {Array} filters
	 * @param {Vue} vm
	 * @param {*} oldVal
	 * @return {*}
	 */

	exports.applyFilters = function (value, filters, vm, oldVal) {
	  if (!filters) {
	    return value
	  }
	  for (var i = 0, l = filters.length; i < l; i++) {
	    value = filters[i].call(vm, value, oldVal)
	  }
	  return value
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(20)

	/**
	 * Enable debug utilities. The enableDebug() function and
	 * all _.log() & _.warn() calls will be dropped in the
	 * minified production build.
	 */

	enableDebug()

	function enableDebug () {
	  var hasConsole = typeof console !== 'undefined'
	  
	  /**
	   * Log a message.
	   *
	   * @param {String} msg
	   */

	  exports.log = function (msg) {
	    if (hasConsole && config.debug) {
	      console.log('[Vue info]: ' + msg)
	    }
	  }

	  /**
	   * We've got a problem here.
	   *
	   * @param {String} msg
	   */

	  exports.warn = function (msg) {
	    if (hasConsole && !config.silent) {
	      console.warn('[Vue warn]: ' + msg)
	      if (config.debug && console.trace) {
	        console.trace()
	      }
	    }
	  }

	  /**
	   * Assert asset exists
	   */

	  exports.assertAsset = function (val, type, id) {
	    if (!val) {
	      exports.warn('Failed to resolve ' + type + ': ' + id)
	    }
	  }
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var extend = _.extend

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = Object.create(null)

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  // in a class merge, both should be functions
	  // so we just return child if it exists
	  if (!vm) {
	    if (childVal && typeof childVal !== 'function') {
	      _.warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.'
	      )
	      return
	    }
	    return childVal || parentVal
	  }
	  var instanceData = typeof childVal === 'function'
	    ? childVal.call(vm)
	    : childVal
	  var defaultData = typeof parentVal === 'function'
	    ? parentVal.call(vm)
	    : undefined
	  if (instanceData) {
	    // mix default data into instance data
	    for (var key in defaultData) {
	      if (!instanceData.hasOwnProperty(key)) {
	        instanceData.$add(key, defaultData[key])
	      }
	    }
	    return instanceData
	  } else {
	    return defaultData
	  }
	}

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    _.warn(
	      'The "el" option should be a function ' +
	      'that returns a per-instance value in component ' +
	      'definitions.'
	    )
	    return
	  }
	  var ret = childVal || parentVal
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function'
	    ? ret.call(vm)
	    : ret
	}

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.created =
	strats.ready =
	strats.attached =
	strats.detached =
	strats.beforeCompile =
	strats.compiled =
	strats.beforeDestroy =
	strats.destroyed =
	strats.paramAttributes = function (parentVal, childVal) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : _.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	strats.directives =
	strats.filters =
	strats.partials =
	strats.transitions =
	strats.components = function (parentVal, childVal, vm, key) {
	  var ret = Object.create(
	    vm && vm.$parent
	      ? vm.$parent.$options[key]
	      : _.Vue.options[key]
	  )
	  if (parentVal) {
	    var keys = Object.keys(parentVal)
	    var i = keys.length
	    var field
	    while (i--) {
	      field = keys[i]
	      ret[field] = parentVal[field]
	    }
	  }
	  if (childVal) extend(ret, childVal)
	  return ret
	}

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch =
	strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal
	  if (!parentVal) return childVal
	  var ret = {}
	  extend(ret, parentVal)
	  for (var key in childVal) {
	    var parent = ret[key]
	    var child = childVal[key]
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child]
	  }
	  return ret
	}

	/**
	 * Other object hashes.
	 */

	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal
	  if (!parentVal) return childVal
	  var ret = Object.create(parentVal)
	  extend(ret, childVal)
	  return ret
	}

	/**
	 * Default strategy.
	 */

	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	}

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} components
	 */

	function guardComponents (components) {
	  if (components) {
	    var def
	    for (var key in components) {
	      def = components[key]
	      if (_.isPlainObject(def)) {
	        def.name = key
	        components[key] = _.Vue.extend(def)
	      }
	    }
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	module.exports = function mergeOptions (parent, child, vm) {
	  guardComponents(child.components)
	  var options = {}
	  var key
	  for (key in parent) {
	    merge(parent[key], child[key], key)
	  }
	  for (key in child) {
	    if (!(parent.hasOwnProperty(key))) {
	      merge(parent[key], child[key], key)
	    }
	  }
	  var mixins = child.mixins
	  if (mixins) {
	    for (var i = 0, l = mixins.length; i < l; i++) {
	      for (key in mixins[i]) {
	        merge(options[key], mixins[i][key], key)
	      }
	    }
	  }
	  function merge (parentVal, childVal, key) {
	    var strat = strats[key] || defaultStrat
	    options[key] = strat(parentVal, childVal, vm, key)
	  }
	  return options
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	  /**
	   * The prefix to look for when parsing directives.
	   *
	   * @type {String}
	   */

	  prefix: 'v-',

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether allow observer to alter data objects'
	   * __proto__.
	   *
	   * @type {Boolean}
	   */

	  proto: true,

	  /**
	   * Whether to parse mustache tags in templates.
	   *
	   * @type {Boolean}
	   */

	  interpolate: true,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true

	}

	/**
	 * Interpolation delimiters.
	 * We need to mark the changed flag so that the text parser
	 * knows it needs to recompile the regex.
	 *
	 * @type {Array<String>}
	 */

	var delimiters = ['{{', '}}']
	Object.defineProperty(module.exports, 'delimiters', {
	  get: function () {
	    return delimiters
	  },
	  set: function (val) {
	    delimiters = val
	    this._delimitersChanged = true
	  }
	})

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var config = __webpack_require__(20)
	var Observer = __webpack_require__(49)
	var expParser = __webpack_require__(44)
	var Batcher = __webpack_require__(50)

	var batcher = new Batcher()
	var uid = 0

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Array} [filters]
	 * @param {Boolean} [needSet]
	 * @param {Boolean} [deep]
	 * @constructor
	 */

	function Watcher (vm, expression, cb, filters, needSet, deep) {
	  this.vm = vm
	  vm._watcherList.push(this)
	  this.expression = expression
	  this.cbs = [cb]
	  this.id = ++uid // uid for batching
	  this.active = true
	  this.deep = deep
	  this.deps = Object.create(null)
	  // setup filters if any.
	  // We delegate directive filters here to the watcher
	  // because they need to be included in the dependency
	  // collection process.
	  this.readFilters = filters && filters.read
	  this.writeFilters = filters && filters.write
	  // parse expression for getter/setter
	  var res = expParser.parse(expression, needSet)
	  this.getter = res.get
	  this.setter = res.set
	  this.value = this.get()
	}

	var p = Watcher.prototype

	/**
	 * Add a binding dependency to this directive.
	 *
	 * @param {Binding} binding
	 */

	p.addDep = function (binding) {
	  var id = binding.id
	  if (!this.newDeps[id]) {
	    this.newDeps[id] = binding
	    if (!this.deps[id]) {
	      this.deps[id] = binding
	      binding.addSub(this)
	    }
	  }
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	p.get = function () {
	  this.beforeGet()
	  var vm = this.vm
	  var value
	  try {
	    value = this.getter.call(vm, vm)
	  } catch (e) {}
	  // use JSON.stringify to "touch" every property
	  // so they are all tracked as dependencies for
	  // deep watching
	  if (this.deep) JSON.stringify(value)
	  value = _.applyFilters(value, this.readFilters, vm)
	  this.afterGet()
	  return value
	}

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	p.set = function (value) {
	  var vm = this.vm
	  value = _.applyFilters(
	    value, this.writeFilters, vm, this.value
	  )
	  try {
	    this.setter.call(vm, vm, value)
	  } catch (e) {}
	}

	/**
	 * Prepare for dependency collection.
	 */

	p.beforeGet = function () {
	  Observer.target = this
	  this.newDeps = {}
	}

	/**
	 * Clean up for dependency collection.
	 */

	p.afterGet = function () {
	  Observer.target = null
	  for (var id in this.deps) {
	    if (!this.newDeps[id]) {
	      this.deps[id].removeSub(this)
	    }
	  }
	  this.deps = this.newDeps
	}

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */

	p.update = function () {
	  if (config.async) {
	    batcher.push(this)
	  } else {
	    this.run()
	  }
	}

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	p.run = function () {
	  if (this.active) {
	    var value = this.get()
	    if (
	      (typeof value === 'object' && value !== null) ||
	      value !== this.value
	    ) {
	      var oldValue = this.value
	      this.value = value
	      var cbs = this.cbs
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i](value, oldValue)
	        // if a callback also removed other callbacks,
	        // we need to adjust the loop accordingly.
	        var removed = l - cbs.length
	        if (removed) {
	          i -= removed
	          l -= removed
	        }
	      }
	    }
	  }
	}

	/**
	 * Add a callback.
	 *
	 * @param {Function} cb
	 */

	p.addCb = function (cb) {
	  this.cbs.push(cb)
	}

	/**
	 * Remove a callback.
	 *
	 * @param {Function} cb
	 */

	p.removeCb = function (cb) {
	  var cbs = this.cbs
	  if (cbs.length > 1) {
	    var i = cbs.indexOf(cb)
	    if (i > -1) {
	      cbs.splice(i, 1)
	    }
	  } else if (cb === cbs[0]) {
	    this.teardown()
	  }
	}

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	p.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // we can skip this if the vm if being destroyed
	    // which can improve teardown performance.
	    if (!this.vm._isBeingDestroyed) {
	      var list = this.vm._watcherList
	      list.splice(list.indexOf(this))
	    }
	    for (var id in this.deps) {
	      this.deps[id].removeSub(this)
	    }
	    this.active = false
	    this.vm = this.cbs = this.value = null
	  }
	}

	module.exports = Watcher

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)

	module.exports = {

	  bind: function () {
	    this.attr = this.el.nodeType === 3
	      ? 'nodeValue'
	      : 'textContent'
	  },

	  update: function (value) {
	    this.el[this.attr] = _.toString(value)
	  }
	  
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var templateParser = __webpack_require__(51)

	module.exports = {

	  bind: function () {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = []
	    }
	  },

	  update: function (value) {
	    value = _.toString(value)
	    if (this.nodes) {
	      this.swap(value)
	    } else {
	      this.el.innerHTML = value
	    }
	  },

	  swap: function (value) {
	    // remove old nodes
	    var i = this.nodes.length
	    while (i--) {
	      _.remove(this.nodes[i])
	    }
	    // convert new value to a fragment
	    var frag = templateParser.parse(value, true)
	    // save a reference to these nodes so we can remove later
	    this.nodes = _.toArray(frag.childNodes)
	    _.before(frag, this.el)
	  }

	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink'
	var xlinkRE = /^xlink:/

	module.exports = {

	  priority: 850,

	  bind: function () {
	    var name = this.arg
	    this.update = xlinkRE.test(name)
	      ? xlinkHandler
	      : defaultHandler
	  }

	}

	function defaultHandler (value) {
	  if (value || value === 0) {
	    this.el.setAttribute(this.arg, value)
	  } else {
	    this.el.removeAttribute(this.arg)
	  }
	}

	function xlinkHandler (value) {
	  if (value != null) {
	    this.el.setAttributeNS(xlinkNS, this.arg, value)
	  } else {
	    this.el.removeAttributeNS(xlinkNS, 'href')
	  }
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var transition = __webpack_require__(45)

	module.exports = function (value) {
	  var el = this.el
	  transition.apply(el, value ? 1 : -1, function () {
	    el.style.display = value ? '' : 'none'
	  }, this.vm)
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var addClass = _.addClass
	var removeClass = _.removeClass

	module.exports = function (value) {
	  if (this.arg) {
	    var method = value ? addClass : removeClass
	    method(this.el, this.arg)
	  } else {
	    if (this.lastVal) {
	      removeClass(this.el, this.lastVal)
	    }
	    if (value) {
	      addClass(this.el, value)
	      this.lastVal = value
	    }
	  }
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	  isLiteral: true,

	  bind: function () {
	    this.vm.$$[this.expression] = this.el
	  },

	  unbind: function () {
	    delete this.vm.$$[this.expression]
	  }
	  
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)

	module.exports = {

	  isLiteral: true,

	  bind: function () {
	    if (this.el !== this.vm.$el) {
	      _.warn(
	        'v-ref should only be used on instance root nodes.'
	      )
	      return
	    }
	    this.owner = this.vm.$parent
	    this.owner.$[this.expression] = this.vm
	  },

	  unbind: function () {
	    if (this.owner.$[this.expression] === this.vm) {
	      delete this.owner.$[this.expression]
	    }
	  }
	  
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(20)

	module.exports = {

	  bind: function () {
	    var el = this.el
	    this.vm.$once('hook:compiled', function () {
	      el.removeAttribute(config.prefix + 'cloak')
	    })
	  }

	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var prefixes = ['-webkit-', '-moz-', '-ms-']
	var importantRE = /!important;?$/

	module.exports = {

	  bind: function () {
	    var prop = this.arg
	    if (!prop) return
	    if (prop.charAt(0) === '$') {
	      // properties that start with $ will be auto-prefixed
	      prop = prop.slice(1)
	      this.prefixed = true
	    }
	    this.prop = prop
	  },

	  update: function (value) {
	    var prop = this.prop
	    // cast possible numbers/booleans into strings
	    if (value != null) {
	      value += ''
	    }
	    if (prop) {
	      var isImportant = importantRE.test(value)
	        ? 'important'
	        : ''
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim()
	      }
	      this.el.style.setProperty(prop, value, isImportant)
	      if (this.prefixed) {
	        var i = prefixes.length
	        while (i--) {
	          this.el.style.setProperty(
	            prefixes[i] + prop,
	            value,
	            isImportant
	          )
	        }
	      }
	    } else {
	      this.el.style.cssText = value
	    }
	  }

	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var templateParser = __webpack_require__(51)
	var transition = __webpack_require__(45)

	module.exports = {

	  isLiteral: true,

	  bind: function () {
	    var el = this.el
	    this.start = document.createComment('v-partial-start')
	    this.end = document.createComment('v-partial-end')
	    if (el.nodeType !== 8) {
	      el.innerHTML = ''
	    }
	    if (el.tagName === 'TEMPLATE' || el.nodeType === 8) {
	      _.replace(el, this.end)
	    } else {
	      el.appendChild(this.end)
	    }
	    _.before(this.start, this.end)
	    if (!this._isDynamicLiteral) {
	      this.compile(this.expression)
	    }
	  },

	  update: function (id) {
	    this.teardown()
	    this.compile(id)
	  },

	  compile: function (id) {
	    var partial = this.vm.$options.partials[id]
	    _.assertAsset(partial, 'partial', id)
	    if (!partial) {
	      return
	    }
	    var vm = this.vm
	    var frag = templateParser.parse(partial, true)
	    var decompile = vm.$compile(frag)
	    this.decompile = function () {
	      decompile()
	      transition.blockRemove(this.start, this.end, vm)
	    }
	    transition.blockAppend(frag, this.end, vm)
	  },

	  teardown: function () {
	    if (this.decompile) {
	      this.decompile()
	      this.decompile = null
	    }
	  }

	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	  priority: 1000,
	  isLiteral: true,

	  bind: function () {
	    this.el.__v_trans = {
	      id: this.expression
	    }
	  }

	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)

	module.exports = {

	  acceptStatement: true,
	  priority: 700,

	  bind: function () {
	    // deal with iframes
	    if (
	      this.el.tagName === 'IFRAME' &&
	      this.arg !== 'load'
	    ) {
	      var self = this
	      this.iframeBind = function () {
	        _.on(self.el.contentWindow, self.arg, self.handler)
	      }
	      _.on(this.el, 'load', this.iframeBind)
	    }
	  },

	  update: function (handler) {
	    if (typeof handler !== 'function') {
	      _.warn(
	        'Directive "v-on:' + this.expression + '" ' +
	        'expects a function value.'
	      )
	      return
	    }
	    this.reset()
	    var vm = this.vm
	    this.handler = function (e) {
	      e.targetVM = vm
	      vm.$event = e
	      var res = handler(e)
	      vm.$event = null
	      return res
	    }
	    if (this.iframeBind) {
	      this.iframeBind()
	    } else {
	      _.on(this.el, this.arg, this.handler)
	    }
	  },

	  reset: function () {
	    var el = this.iframeBind
	      ? this.el.contentWindow
	      : this.el
	    if (this.handler) {
	      _.off(el, this.arg, this.handler)
	    }
	  },

	  unbind: function () {
	    this.reset()
	    _.off(this.el, 'load', this.iframeBind)
	  }
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var templateParser = __webpack_require__(51)

	module.exports = {

	  isLiteral: true,

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   v-component="comp"
	   *
	   * - dynamic:
	   *   v-component="{{currentView}}"
	   */

	  bind: function () {
	    if (!this.el.__vue__) {
	      // create a ref anchor
	      this.ref = document.createComment('v-component')
	      _.replace(this.el, this.ref)
	      // check keep-alive options
	      this.checkKeepAlive()
	      // check parent directives
	      this.parentLinker = this.el._parentLinker
	      // if static, build right now.
	      if (!this._isDynamicLiteral) {
	        this.resolveCtor(this.expression)
	        this.build()
	      }
	    } else {
	      _.warn(
	        'v-component="' + this.expression + '" cannot be ' +
	        'used on an already mounted instance.'
	      )
	    }
	  },

	  /**
	   * Check if the "keep-alive" flag is present.
	   * If yes, instead of destroying the active vm when
	   * hiding (v-if) or switching (dynamic literal) it,
	   * we simply remove it from the DOM and save it in a
	   * cache object, with its constructor id as the key.
	   */

	  checkKeepAlive: function () {
	    // check keep-alive flag
	    this.keepAlive = this.el.hasAttribute('keep-alive')
	    if (this.keepAlive) {
	      this.el.removeAttribute('keep-alive')
	      this.cache = {}
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   */

	  resolveCtor: function (id) {
	    this.ctorId = id
	    this.Ctor = this.vm.$options.components[id]
	    _.assertAsset(this.Ctor, 'component', id)
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   */

	  build: function () {
	    if (this.keepAlive) {
	      var cached = this.cache[this.ctorId]
	      if (cached) {
	        this.childVM = cached
	        cached.$before(this.ref)
	        return
	      }
	    }
	    var vm = this.vm
	    if (this.Ctor && !this.childVM) {
	      this.childVM = vm.$addChild({
	        el: templateParser.clone(this.el)
	      }, this.Ctor)
	      if (this.parentLinker) {
	        var dirCount = vm._directives.length
	        var targetVM = this.childVM.$options.inherit
	          ? this.childVM
	          : vm
	        this.parentLinker(targetVM, this.childVM.$el)
	        this.parentDirs = vm._directives.slice(dirCount)
	      }
	      if (this.keepAlive) {
	        this.cache[this.ctorId] = this.childVM
	      }
	      this.childVM.$before(this.ref)
	    }
	  },

	  /**
	   * Teardown the active vm.
	   * If keep alive, simply remove it; otherwise destroy it.
	   *
	   * @param {Boolean} remove
	   */

	  unbuild: function (remove) {
	    var child = this.childVM
	    if (!child) {
	      return
	    }
	    if (this.keepAlive) {
	      if (remove) {
	        child.$remove()
	      }
	    } else {
	      child.$destroy(remove)
	      var parentDirs = this.parentDirs
	      if (parentDirs) {
	        var i = parentDirs.length
	        while (i--) {
	          parentDirs[i]._teardown()
	        }
	      }
	    }
	    this.childVM = null
	  },

	  /**
	   * Update callback for the dynamic literal scenario,
	   * e.g. v-component="{{view}}"
	   */

	  update: function (value) {
	    this.unbuild(true)
	    if (value) {
	      this.resolveCtor(value)
	      this.build()
	    }
	  },

	  /**
	   * Unbind.
	   * Make sure keepAlive is set to false so that the
	   * instance is always destroyed.
	   */

	  unbind: function () {
	    this.keepAlive = false
	    this.unbuild()
	  }

	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var isObject = _.isObject
	var textParser = __webpack_require__(42)
	var expParser = __webpack_require__(44)
	var templateParser = __webpack_require__(51)
	var compile = __webpack_require__(46)
	var transclude = __webpack_require__(47)
	var mergeOptions = __webpack_require__(19)
	var uid = 0

	module.exports = {

	  /**
	   * Setup.
	   */

	  bind: function () {
	    // uid as a cache identifier
	    this.id = '__v_repeat_' + (++uid)
	    // we need to insert the objToArray converter
	    // as the first read filter.
	    if (!this.filters) {
	      this.filters = {}
	    }
	    // add the object -> array convert filter
	    var objectConverter = _.bind(objToArray, this)
	    if (!this.filters.read) {
	      this.filters.read = [objectConverter]
	    } else {
	      this.filters.read.unshift(objectConverter)
	    }
	    // setup ref node
	    this.ref = document.createComment('v-repeat')
	    _.replace(this.el, this.ref)
	    // check if this is a block repeat
	    this.template = this.el.tagName === 'TEMPLATE'
	      ? templateParser.parse(this.el, true)
	      : this.el
	    // check other directives that need to be handled
	    // at v-repeat level
	    this.checkIf()
	    this.checkRef()
	    this.checkTrackById()
	    this.checkComponent()
	    // cache for primitive value instances
	    this.cache = Object.create(null)
	  },

	  /**
	   * Warn against v-if usage.
	   */

	  checkIf: function () {
	    if (_.attr(this.el, 'if') !== null) {
	      _.warn(
	        'Don\'t use v-if with v-repeat. ' +
	        'Use v-show or the "filterBy" filter instead.'
	      )
	    }
	  },

	  /**
	   * Check if v-ref/ v-el is also present.
	   */

	  checkRef: function () {
	    var childId = _.attr(this.el, 'ref')
	    this.childId = childId
	      ? this.vm.$interpolate(childId)
	      : null
	    var elId = _.attr(this.el, 'el')
	    this.elId = elId
	      ? this.vm.$interpolate(elId)
	      : null
	  },

	  /**
	   * Check for a track-by ID, which allows us to identify
	   * a piece of data and its associated instance by its
	   * unique id.
	   */

	  checkTrackById: function () {
	    this.idKey = this.el.getAttribute('trackby')
	    if (this.idKey !== null) {
	      this.el.removeAttribute('trackby')
	    }
	  },

	  /**
	   * Check the component constructor to use for repeated
	   * instances. If static we resolve it now, otherwise it
	   * needs to be resolved at build time with actual data.
	   */

	  checkComponent: function () {
	    var id = _.attr(this.el, 'component')
	    var options = this.vm.$options
	    if (!id) {
	      this.Ctor = _.Vue // default constructor
	      this.inherit = true // inline repeats should inherit
	      // important: transclude with no options, just
	      // to ensure block start and block end
	      this.template = transclude(this.template)
	      this._linker = compile(this.template, options)
	    } else {
	      var tokens = textParser.parse(id)
	      if (!tokens) { // static component
	        var Ctor = this.Ctor = options.components[id]
	        _.assertAsset(Ctor, 'component', id)
	        if (Ctor) {
	          // merge an empty object with owner vm as parent
	          // so child vms can access parent assets.
	          var merged = mergeOptions(
	            Ctor.options,
	            {},
	            { $parent: this.vm }
	          )
	          this.template = transclude(this.template, merged)
	          this._linker = compile(this.template, merged)
	        }
	      } else {
	        // to be resolved later
	        var ctorExp = textParser.tokensToExp(tokens)
	        this.ctorGetter = expParser.parse(ctorExp).get
	      }
	    }
	  },

	  /**
	   * Update.
	   * This is called whenever the Array mutates.
	   *
	   * @param {Array} data
	   */

	  update: function (data) {
	    if (typeof data === 'number') {
	      data = range(data)
	    }
	    this.vms = this.diff(data || [], this.vms)
	    // update v-ref
	    if (this.childId) {
	      this.vm.$[this.childId] = this.vms
	    }
	    if (this.elId) {
	      this.vm.$$[this.elId] = this.vms.map(function (vm) {
	        return vm.$el
	      })
	    }
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   * @param {Array} oldVms
	   * @return {Array}
	   */

	  diff: function (data, oldVms) {
	    var idKey = this.idKey
	    var converted = this.converted
	    var ref = this.ref
	    var alias = this.arg
	    var init = !oldVms
	    var vms = new Array(data.length)
	    var obj, raw, vm, i, l
	    // First pass, go through the new Array and fill up
	    // the new vms array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      obj = data[i]
	      raw = converted ? obj.value : obj
	      vm = !init && this.getVm(raw)
	      if (vm) { // reusable instance
	        vm._reused = true
	        vm.$index = i // update $index
	        if (converted) {
	          vm.$key = obj.key // update $key
	        }
	        if (idKey) { // swap track by id data
	          if (alias) {
	            vm[alias] = raw
	          } else {
	            vm._setData(raw)
	          }
	        }
	      } else { // new instance
	        vm = this.build(obj, i)
	        vm._new = true
	      }
	      vms[i] = vm
	      // insert if this is first run
	      if (init) {
	        vm.$before(ref)
	      }
	    }
	    // if this is the first run, we're done.
	    if (init) {
	      return vms
	    }
	    // Second pass, go through the old vm instances and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    for (i = 0, l = oldVms.length; i < l; i++) {
	      vm = oldVms[i]
	      if (!vm._reused) {
	        this.uncacheVm(vm)
	        vm.$destroy(true)
	      }
	    }
	    // final pass, move/insert new instances into the
	    // right place. We're going in reverse here because
	    // insertBefore relies on the next sibling to be
	    // resolved.
	    var targetNext, currentNext
	    i = vms.length
	    while (i--) {
	      vm = vms[i]
	      // this is the vm that we should be in front of
	      targetNext = vms[i + 1]
	      if (!targetNext) {
	        // This is the last item. If it's reused then
	        // everything else will eventually be in the right
	        // place, so no need to touch it. Otherwise, insert
	        // it.
	        if (!vm._reused) {
	          vm.$before(ref)
	        }
	      } else {
	        if (vm._reused) {
	          // this is the vm we are actually in front of
	          currentNext = findNextVm(vm, ref)
	          // we only need to move if we are not in the right
	          // place already.
	          if (currentNext !== targetNext) {
	            vm.$before(targetNext.$el, null, false)
	          }
	        } else {
	          // new instance, insert to existing next
	          vm.$before(targetNext.$el)
	        }
	      }
	      vm._new = false
	      vm._reused = false
	    }
	    return vms
	  },

	  /**
	   * Build a new instance and cache it.
	   *
	   * @param {Object} data
	   * @param {Number} index
	   */

	  build: function (data, index) {
	    var original = data
	    var meta = { $index: index }
	    if (this.converted) {
	      meta.$key = original.key
	    }
	    var raw = this.converted ? data.value : data
	    var alias = this.arg
	    var hasAlias = !isObject(raw) || alias
	    // wrap the raw data with alias
	    data = hasAlias ? {} : raw
	    if (alias) {
	      data[alias] = raw
	    } else if (hasAlias) {
	      meta.$value = raw
	    }
	    // resolve constructor
	    var Ctor = this.Ctor || this.resolveCtor(data, meta)
	    var vm = this.vm.$addChild({
	      el: templateParser.clone(this.template),
	      _linker: this._linker,
	      _meta: meta,
	      data: data,
	      inherit: this.inherit
	    }, Ctor)
	    // cache instance
	    this.cacheVm(raw, vm)
	    return vm
	  },

	  /**
	   * Resolve a contructor to use for an instance.
	   * The tricky part here is that there could be dynamic
	   * components depending on instance data.
	   *
	   * @param {Object} data
	   * @param {Object} meta
	   * @return {Function}
	   */

	  resolveCtor: function (data, meta) {
	    // create a temporary context object and copy data
	    // and meta properties onto it.
	    // use _.define to avoid accidentally overwriting scope
	    // properties.
	    var context = Object.create(this.vm)
	    var key
	    for (key in data) {
	      _.define(context, key, data[key])
	    }
	    for (key in meta) {
	      _.define(context, key, meta[key])
	    }
	    var id = this.ctorGetter.call(context, context)
	    var Ctor = this.vm.$options.components[id]
	    _.assertAsset(Ctor, 'component', id)
	    return Ctor
	  },

	  /**
	   * Unbind, teardown everything
	   */

	  unbind: function () {
	    if (this.childId) {
	      delete this.vm.$[this.childId]
	    }
	    if (this.vms) {
	      var i = this.vms.length
	      var vm
	      while (i--) {
	        vm = this.vms[i]
	        this.uncacheVm(vm)
	        vm.$destroy()
	      }
	    }
	  },

	  /**
	   * Cache a vm instance based on its data.
	   *
	   * If the data is an object, we save the vm's reference on
	   * the data object as a hidden property. Otherwise we
	   * cache them in an object and for each primitive value
	   * there is an array in case there are duplicates.
	   *
	   * @param {Object} data
	   * @param {Vue} vm
	   */

	  cacheVm: function (data, vm) {
	    var idKey = this.idKey
	    var cache = this.cache
	    var id
	    if (idKey) {
	      id = data[idKey]
	      if (!cache[id]) {
	        cache[id] = vm
	      } else {
	        _.warn('Duplicate ID in v-repeat: ' + id)
	      }
	    } else if (isObject(data)) {
	      id = this.id
	      if (data.hasOwnProperty(id)) {
	        if (data[id] === null) {
	          data[id] = vm
	        } else {
	          _.warn(
	            'Duplicate objects are not supported in v-repeat.'
	          )
	        }
	      } else {
	        _.define(data, this.id, vm)
	      }
	    } else {
	      if (!cache[data]) {
	        cache[data] = [vm]
	      } else {
	        cache[data].push(vm)
	      }
	    }
	    vm._raw = data
	  },

	  /**
	   * Try to get a cached instance from a piece of data.
	   *
	   * @param {Object} data
	   * @return {Vue|undefined}
	   */

	  getVm: function (data) {
	    if (this.idKey) {
	      return this.cache[data[this.idKey]]
	    } else if (isObject(data)) {
	      return data[this.id]
	    } else {
	      var cached = this.cache[data]
	      if (cached) {
	        var i = 0
	        var vm = cached[i]
	        // since duplicated vm instances might be a reused
	        // one OR a newly created one, we need to return the
	        // first instance that is neither of these.
	        while (vm && (vm._reused || vm._new)) {
	          vm = cached[++i]
	        }
	        return vm
	      }
	    }
	  },

	  /**
	   * Delete a cached vm instance.
	   *
	   * @param {Vue} vm
	   */

	  uncacheVm: function (vm) {
	    var data = vm._raw
	    if (this.idKey) {
	      this.cache[data[this.idKey]] = null
	    } else if (isObject(data)) {
	      data[this.id] = null
	      vm._raw = null
	    } else {
	      this.cache[data].pop()
	    }
	  }

	}

	/**
	 * Helper to find the next element that is an instance
	 * root node. This is necessary because a destroyed vm's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its __vue__ reference
	 * should have been removed so we can skip them.
	 *
	 * @param {Vue} vm
	 * @param {CommentNode} ref
	 * @return {Vue}
	 */

	function findNextVm (vm, ref) {
	  var el = (vm._blockEnd || vm.$el).nextSibling
	  while (!el.__vue__ && el !== ref) {
	    el = el.nextSibling
	  }
	  return el.__vue__
	}

	/**
	 * Attempt to convert non-Array objects to array.
	 * This is the default filter installed to every v-repeat
	 * directive.
	 *
	 * It will be called with **the directive** as `this`
	 * context so that we can mark the repeat array as converted
	 * from an object.
	 *
	 * @param {*} obj
	 * @return {Array}
	 * @private
	 */

	function objToArray (obj) {
	  if (!_.isPlainObject(obj)) {
	    return obj
	  }
	  var keys = Object.keys(obj)
	  var i = keys.length
	  var res = new Array(i)
	  var key
	  while (i--) {
	    key = keys[i]
	    res[i] = {
	      key: key,
	      value: obj[key]
	    }
	  }
	  // `this` points to the repeat directive instance
	  this.converted = true
	  return res
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range (n) {
	  var i = -1
	  var ret = new Array(n)
	  while (++i < n) {
	    ret[i] = i
	  }
	  return ret
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var compile = __webpack_require__(46)
	var templateParser = __webpack_require__(51)
	var transition = __webpack_require__(45)

	module.exports = {

	  bind: function () {
	    var el = this.el
	    if (!el.__vue__) {
	      this.start = document.createComment('v-if-start')
	      this.end = document.createComment('v-if-end')
	      _.replace(el, this.end)
	      _.before(this.start, this.end)
	      if (el.tagName === 'TEMPLATE') {
	        this.template = templateParser.parse(el, true)
	      } else {
	        this.template = document.createDocumentFragment()
	        this.template.appendChild(el)
	      }
	      // compile the nested partial
	      this.linker = compile(
	        this.template,
	        this.vm.$options,
	        true
	      )
	    } else {
	      this.invalid = true
	      _.warn(
	        'v-if="' + this.expression + '" cannot be ' +
	        'used on an already mounted instance.'
	      )
	    }
	  },

	  update: function (value) {
	    if (this.invalid) return
	    if (value) {
	      this.insert()
	    } else {
	      this.teardown()
	    }
	  },

	  insert: function () {
	    // avoid duplicate inserts, since update() can be
	    // called with different truthy values
	    if (this.decompile) {
	      return
	    }
	    var vm = this.vm
	    var frag = templateParser.clone(this.template)
	    var decompile = this.linker(vm, frag)
	    this.decompile = function () {
	      decompile()
	      transition.blockRemove(this.start, this.end, vm)
	    }
	    transition.blockAppend(frag, this.end, vm)
	  },

	  teardown: function () {
	    if (this.decompile) {
	      this.decompile()
	      this.decompile = null
	    }
	  }

	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var Watcher = __webpack_require__(21)

	module.exports = {

	  priority: 900,

	  bind: function () {
	    var vm = this.vm
	    if (this.el !== vm.$el) {
	      _.warn(
	        'v-with can only be used on instance root elements.'
	      )
	    } else if (!vm.$parent) {
	      _.warn(
	        'v-with must be used on an instance with a parent.'
	      )
	    } else {
	      var key = this.arg
	      this.watcher = new Watcher(
	        vm.$parent,
	        this.expression,
	        key
	          ? function (val) {
	              vm.$set(key, val)
	            }
	          : function (val) {
	              vm.$data = val
	            }
	      )
	      // initial set
	      var initialVal = this.watcher.value
	      if (key) {
	        vm.$set(key, initialVal)
	      } else {
	        vm.$data = initialVal
	      }
	    }
	  },

	  unbind: function () {
	    if (this.watcher) {
	      this.watcher.teardown()
	    }
	  }

	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var Path = __webpack_require__(41)

	/**
	 * Filter filter for v-repeat
	 *
	 * @param {String} searchKey
	 * @param {String} [delimiter]
	 * @param {String} dataKey
	 */

	exports.filterBy = function (arr, searchKey, delimiter, dataKey) {
	  // allow optional `in` delimiter
	  // because why not
	  if (delimiter && delimiter !== 'in') {
	    dataKey = delimiter
	  }
	  // get the search string
	  var search =
	    _.stripQuotes(searchKey) ||
	    this.$get(searchKey)
	  if (!search) {
	    return arr
	  }
	  search = search.toLowerCase()
	  // get the optional dataKey
	  dataKey =
	    dataKey &&
	    (_.stripQuotes(dataKey) || this.$get(dataKey))
	  return arr.filter(function (item) {
	    return dataKey
	      ? contains(Path.get(item, dataKey), search)
	      : contains(item, search)
	  })
	}

	/**
	 * Filter filter for v-repeat
	 *
	 * @param {String} sortKey
	 * @param {String} reverseKey
	 */

	exports.orderBy = function (arr, sortKey, reverseKey) {
	  var key =
	    _.stripQuotes(sortKey) ||
	    this.$get(sortKey)
	  if (!key) {
	    return arr
	  }
	  var order = 1
	  if (reverseKey) {
	    if (reverseKey === '-1') {
	      order = -1
	    } else if (reverseKey.charCodeAt(0) === 0x21) { // !
	      reverseKey = reverseKey.slice(1)
	      order = this.$get(reverseKey) ? 1 : -1
	    } else {
	      order = this.$get(reverseKey) ? -1 : 1
	    }
	  }
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    a = Path.get(a, key)
	    b = Path.get(b, key)
	    return a === b ? 0 : a > b ? order : -order
	  })
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains (val, search) {
	  if (_.isObject(val)) {
	    for (var key in val) {
	      if (contains(val[key], search)) {
	        return true
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1
	  }
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var uid = 0

	/**
	 * A binding is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */

	function Binding () {
	  this.id = ++uid
	  this.subs = []
	}

	var p = Binding.prototype

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	p.addSub = function (sub) {
	  this.subs.push(sub)
	}

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	p.removeSub = function (sub) {
	  if (this.subs.length) {
	    var i = this.subs.indexOf(sub)
	    if (i > -1) this.subs.splice(i, 1)
	  }
	}

	/**
	 * Notify all subscribers of a new value.
	 */

	p.notify = function () {
	  for (var i = 0, l = this.subs.length; i < l; i++) {
	    this.subs[i].update()
	  }
	}

	module.exports = Binding

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var config = __webpack_require__(20)
	var Watcher = __webpack_require__(21)
	var textParser = __webpack_require__(42)
	var expParser = __webpack_require__(44)

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {String} name
	 * @param {Node} el
	 * @param {Vue} vm
	 * @param {Object} descriptor
	 *                 - {String} expression
	 *                 - {String} [arg]
	 *                 - {Array<Object>} [filters]
	 * @param {Object} def - directive definition object
	 * @param {Function} [linker] - pre-compiled linker function
	 * @constructor
	 */

	function Directive (name, el, vm, descriptor, def, linker) {
	  // public
	  this.name = name
	  this.el = el
	  this.vm = vm
	  // copy descriptor props
	  this.raw = descriptor.raw
	  this.expression = descriptor.expression
	  this.arg = descriptor.arg
	  this.filters = _.resolveFilters(vm, descriptor.filters)
	  // private
	  this._linker = linker
	  this._locked = false
	  this._bound = false
	  // init
	  this._bind(def)
	}

	var p = Directive.prototype

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */

	p._bind = function (def) {
	  if (this.name !== 'cloak' && this.el.removeAttribute) {
	    this.el.removeAttribute(config.prefix + this.name)
	  }
	  if (typeof def === 'function') {
	    this.update = def
	  } else {
	    _.extend(this, def)
	  }
	  this._watcherExp = this.expression
	  this._checkDynamicLiteral()
	  if (this.bind) {
	    this.bind()
	  }
	  if (
	    this.update && this._watcherExp &&
	    (!this.isLiteral || this._isDynamicLiteral) &&
	    !this._checkStatement()
	  ) {
	    // use raw expression as identifier because filters
	    // make them different watchers
	    var watcher = this.vm._watchers[this.raw]
	    // wrapped updater for context
	    var dir = this
	    var update = this._update = function (val, oldVal) {
	      if (!dir._locked) {
	        dir.update(val, oldVal)
	      }
	    }
	    if (!watcher) {
	      watcher = this.vm._watchers[this.raw] = new Watcher(
	        this.vm,
	        this._watcherExp,
	        update, // callback
	        this.filters,
	        this.twoWay // need setter
	      )
	    } else {
	      watcher.addCb(update)
	    }
	    this._watcher = watcher
	    if (this._initValue != null) {
	      watcher.set(this._initValue)
	    } else {
	      this.update(watcher.value)
	    }
	  }
	  this._bound = true
	}

	/**
	 * check if this is a dynamic literal binding.
	 *
	 * e.g. v-component="{{currentView}}"
	 */

	p._checkDynamicLiteral = function () {
	  var expression = this.expression
	  if (expression && this.isLiteral) {
	    var tokens = textParser.parse(expression)
	    if (tokens) {
	      var exp = textParser.tokensToExp(tokens)
	      this.expression = this.vm.$get(exp)
	      this._watcherExp = exp
	      this._isDynamicLiteral = true
	    }
	  }
	}

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. v-on="click: a++"
	 *
	 * @return {Boolean}
	 */

	p._checkStatement = function () {
	  var expression = this.expression
	  if (
	    expression && this.acceptStatement &&
	    !expParser.pathTestRE.test(expression)
	  ) {
	    var fn = expParser.parse(expression).get
	    var vm = this.vm
	    var handler = function () {
	      fn.call(vm, vm)
	    }
	    if (this.filters) {
	      handler = _.applyFilters(
	        handler,
	        this.filters.read,
	        vm
	      )
	    }
	    this.update(handler)
	    return true
	  }
	}

	/**
	 * Teardown the watcher and call unbind.
	 */

	p._teardown = function () {
	  if (this._bound) {
	    if (this.unbind) {
	      this.unbind()
	    }
	    var watcher = this._watcher
	    if (watcher && watcher.active) {
	      watcher.removeCb(this._update)
	      if (!watcher.active) {
	        this.vm._watchers[this.raw] = null
	      }
	    }
	    this._bound = false
	    this.vm = this.el = this._watcher = null
	  }
	}

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @param {Boolean} lock - prevent wrtie triggering update.
	 * @public
	 */

	p.set = function (value, lock) {
	  if (this.twoWay) {
	    if (lock) {
	      this._locked = true
	    }
	    this._watcher.set(value)
	    if (lock) {
	      var self = this
	      _.nextTick(function () {
	        self._locked = false        
	      })
	    }
	  }
	}

	module.exports = Directive

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var Cache = __webpack_require__(52)
	var pathCache = new Cache(1000)
	var identRE = /^[$_a-zA-Z]+[\w$]*$/

	/**
	 * Path-parsing algorithm scooped from Polymer/observe-js
	 */

	var pathStateMachine = {
	  'beforePath': {
	    'ws': ['beforePath'],
	    'ident': ['inIdent', 'append'],
	    '[': ['beforeElement'],
	    'eof': ['afterPath']
	  },

	  'inPath': {
	    'ws': ['inPath'],
	    '.': ['beforeIdent'],
	    '[': ['beforeElement'],
	    'eof': ['afterPath']
	  },

	  'beforeIdent': {
	    'ws': ['beforeIdent'],
	    'ident': ['inIdent', 'append']
	  },

	  'inIdent': {
	    'ident': ['inIdent', 'append'],
	    '0': ['inIdent', 'append'],
	    'number': ['inIdent', 'append'],
	    'ws': ['inPath', 'push'],
	    '.': ['beforeIdent', 'push'],
	    '[': ['beforeElement', 'push'],
	    'eof': ['afterPath', 'push']
	  },

	  'beforeElement': {
	    'ws': ['beforeElement'],
	    '0': ['afterZero', 'append'],
	    'number': ['inIndex', 'append'],
	    "'": ['inSingleQuote', 'append', ''],
	    '"': ['inDoubleQuote', 'append', '']
	  },

	  'afterZero': {
	    'ws': ['afterElement', 'push'],
	    ']': ['inPath', 'push']
	  },

	  'inIndex': {
	    '0': ['inIndex', 'append'],
	    'number': ['inIndex', 'append'],
	    'ws': ['afterElement'],
	    ']': ['inPath', 'push']
	  },

	  'inSingleQuote': {
	    "'": ['afterElement'],
	    'eof': 'error',
	    'else': ['inSingleQuote', 'append']
	  },

	  'inDoubleQuote': {
	    '"': ['afterElement'],
	    'eof': 'error',
	    'else': ['inDoubleQuote', 'append']
	  },

	  'afterElement': {
	    'ws': ['afterElement'],
	    ']': ['inPath', 'push']
	  }
	}

	function noop () {}

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} char
	 * @return {String} type
	 */

	function getPathCharType (char) {
	  if (char === undefined) {
	    return 'eof'
	  }

	  var code = char.charCodeAt(0)

	  switch(code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30: // 0
	      return char

	    case 0x5F: // _
	    case 0x24: // $
	      return 'ident'

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0:  // No-break space
	    case 0xFEFF:  // Byte Order Mark
	    case 0x2028:  // Line Separator
	    case 0x2029:  // Paragraph Separator
	      return 'ws'
	  }

	  // a-z, A-Z
	  if ((0x61 <= code && code <= 0x7A) ||
	      (0x41 <= code && code <= 0x5A)) {
	    return 'ident'
	  }

	  // 1-9
	  if (0x31 <= code && code <= 0x39) {
	    return 'number'
	  }

	  return 'else'
	}

	/**
	 * Parse a string path into an array of segments
	 * Todo implement cache
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath (path) {
	  var keys = []
	  var index = -1
	  var mode = 'beforePath'
	  var c, newChar, key, type, transition, action, typeMap

	  var actions = {
	    push: function() {
	      if (key === undefined) {
	        return
	      }
	      keys.push(key)
	      key = undefined
	    },
	    append: function() {
	      if (key === undefined) {
	        key = newChar
	      } else {
	        key += newChar
	      }
	    }
	  }

	  function maybeUnescapeQuote () {
	    var nextChar = path[index + 1]
	    if ((mode === 'inSingleQuote' && nextChar === "'") ||
	        (mode === 'inDoubleQuote' && nextChar === '"')) {
	      index++
	      newChar = nextChar
	      actions.append()
	      return true
	    }
	  }

	  while (mode) {
	    index++
	    c = path[index]

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue
	    }

	    type = getPathCharType(c)
	    typeMap = pathStateMachine[mode]
	    transition = typeMap[type] || typeMap['else'] || 'error'

	    if (transition === 'error') {
	      return // parse error
	    }

	    mode = transition[0]
	    action = actions[transition[1]] || noop
	    newChar = transition[2] === undefined
	      ? c
	      : transition[2]
	    action()

	    if (mode === 'afterPath') {
	      return keys
	    }
	  }
	}

	/**
	 * Format a accessor segment based on its type.
	 *
	 * @param {String} key
	 * @return {Boolean}
	 */

	function formatAccessor(key) {
	  if (identRE.test(key)) { // identifier
	    return '.' + key
	  } else if (+key === key >>> 0) { // bracket index
	    return '[' + key + ']';
	  } else { // bracket string
	    return '["' + key.replace(/"/g, '\\"') + '"]';
	  }
	}

	/**
	 * Compiles a getter function with a fixed path.
	 *
	 * @param {Array} path
	 * @return {Function}
	 */

	exports.compileGetter = function (path) {
	  var body =
	    'try{return o' +
	    path.map(formatAccessor).join('') +
	    '}catch(e){};'
	  return new Function('o', body)
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	exports.parse = function (path) {
	  var hit = pathCache.get(path)
	  if (!hit) {
	    hit = parsePath(path)
	    if (hit) {
	      hit.get = exports.compileGetter(hit)
	      pathCache.put(path, hit)
	    }
	  }
	  return hit
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	exports.get = function (obj, path) {
	  path = exports.parse(path)
	  if (path) {
	    return path.get(obj)
	  }
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	exports.set = function (obj, path, val) {
	  if (typeof path === 'string') {
	    path = exports.parse(path)
	  }
	  if (!path || !_.isObject(obj)) {
	    return false
	  }
	  var last, key
	  for (var i = 0, l = path.length - 1; i < l; i++) {
	    last = obj
	    key = path[i]
	    obj = obj[key]
	    if (!_.isObject(obj)) {
	      obj = {}
	      last.$add(key, obj)
	    }
	  }
	  key = path[i]
	  if (key in obj) {
	    obj[key] = val
	  } else {
	    obj.$add(key, val)
	  }
	  return true
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(52)
	var config = __webpack_require__(20)
	var dirParser = __webpack_require__(43)
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g
	var cache, tagRE, htmlRE, firstChar, lastChar

	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex (str) {
	  return str.replace(regexEscapeRE, '\\$&')
	}

	/**
	 * Compile the interpolation tag regex.
	 *
	 * @return {RegExp}
	 */

	function compileRegex () {
	  config._delimitersChanged = false
	  var open = config.delimiters[0]
	  var close = config.delimiters[1]
	  firstChar = open.charAt(0)
	  lastChar = close.charAt(close.length - 1)
	  var firstCharRE = escapeRegex(firstChar)
	  var lastCharRE = escapeRegex(lastChar)
	  var openRE = escapeRegex(open)
	  var closeRE = escapeRegex(close)
	  tagRE = new RegExp(
	    firstCharRE + '?' + openRE +
	    '(.+?)' +
	    closeRE + lastCharRE + '?',
	    'g'
	  )
	  htmlRE = new RegExp(
	    '^' + firstCharRE + openRE +
	    '.*' +
	    closeRE + lastCharRE + '$'
	  )
	  // reset cache
	  cache = new Cache(1000)
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	exports.parse = function (text) {
	  if (config._delimitersChanged) {
	    compileRegex()
	  }
	  var hit = cache.get(text)
	  if (hit) {
	    return hit
	  }
	  if (!tagRE.test(text)) {
	    return null
	  }
	  var tokens = []
	  var lastIndex = tagRE.lastIndex = 0
	  var match, index, value, first, oneTime, partial
	  /* jshint boss:true */
	  while (match = tagRE.exec(text)) {
	    index = match.index
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      })
	    }
	    // tag token
	    first = match[1].charCodeAt(0)
	    oneTime = first === 0x2A // *
	    partial = first === 0x3E // >
	    value = (oneTime || partial)
	      ? match[1].slice(1)
	      : match[1]
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: htmlRE.test(match[0]),
	      oneTime: oneTime,
	      partial: partial
	    })
	    lastIndex = index + match[0].length
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    })
	  }
	  cache.put(text, tokens)
	  return tokens
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	exports.tokensToExp = function (tokens, vm) {
	  return tokens.length > 1
	    ? tokens.map(function (token) {
	        return formatToken(token, vm)
	      }).join('+')
	    : formatToken(tokens[0], vm, true)
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} single
	 * @return {String}
	 */

	function formatToken (token, vm, single) {
	  return token.tag
	    ? vm && token.oneTime
	      ? '"' + vm.$eval(token.value) + '"'
	      : single
	        ? token.value
	        : inlineFilters(token.value)
	    : '"' + token.value + '"'
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/
	function inlineFilters (exp) {
	  if (!filterRE.test(exp)) {
	    return '(' + exp + ')'
	  } else {
	    var dir = dirParser.parse(exp)[0]
	    if (!dir.filters) {
	      return '(' + exp + ')'
	    } else {
	      exp = dir.expression
	      for (var i = 0, l = dir.filters.length; i < l; i++) {
	        var filter = dir.filters[i]
	        var args = filter.args
	          ? ',"' + filter.args.join('","') + '"'
	          : ''
	        exp = 'this.$options.filters["' + filter.name + '"]' +
	          '.apply(this,[' + exp + args + '])'
	      }
	      return exp
	    }
	  }
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var Cache = __webpack_require__(52)
	var cache = new Cache(1000)
	var argRE = /^[^\{\?]+$|^'[^']*'$|^"[^"]*"$/
	var filterTokenRE = /[^\s'"]+|'[^']+'|"[^"]+"/g

	/**
	 * Parser state
	 */

	var str
	var c, i, l
	var inSingle
	var inDouble
	var curly
	var square
	var paren
	var begin
	var argIndex
	var dirs
	var dir
	var lastFilterIndex
	var arg

	/**
	 * Push a directive object into the result Array
	 */

	function pushDir () {
	  dir.raw = str.slice(begin, i).trim()
	  if (dir.expression === undefined) {
	    dir.expression = str.slice(argIndex, i).trim()
	  } else if (lastFilterIndex !== begin) {
	    pushFilter()
	  }
	  if (i === 0 || dir.expression) {
	    dirs.push(dir)
	  }
	}

	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter () {
	  var exp = str.slice(lastFilterIndex, i).trim()
	  var filter
	  if (exp) {
	    filter = {}
	    var tokens = exp.match(filterTokenRE)
	    filter.name = tokens[0]
	    filter.args = tokens.length > 1 ? tokens.slice(1) : null
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter)
	  }
	  lastFilterIndex = i + 1
	}

	/**
	 * Parse a directive string into an Array of AST-like
	 * objects representing directives.
	 *
	 * Example:
	 *
	 * "click: a = a + 1 | uppercase" will yield:
	 * {
	 *   arg: 'click',
	 *   expression: 'a = a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Array<Object>}
	 */

	exports.parse = function (s) {

	  var hit = cache.get(s)
	  if (hit) {
	    return hit
	  }

	  // reset parser state
	  str = s
	  inSingle = inDouble = false
	  curly = square = paren = begin = argIndex = 0
	  lastFilterIndex = 0
	  dirs = []
	  dir = {}
	  arg = null

	  for (i = 0, l = str.length; i < l; i++) {
	    c = str.charCodeAt(i)
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27) inSingle = !inSingle
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22) inDouble = !inDouble
	    } else if (
	      c === 0x2C && // comma
	      !paren && !curly && !square
	    ) {
	      // reached the end of a directive
	      pushDir()
	      // reset & skip the comma
	      dir = {}
	      begin = argIndex = lastFilterIndex = i + 1
	    } else if (
	      c === 0x3A && // colon
	      !dir.expression &&
	      !dir.arg
	    ) {
	      // argument
	      arg = str.slice(begin, i).trim()
	      // test for valid argument here
	      // since we may have caught stuff like first half of
	      // an object literal or a ternary expression.
	      if (argRE.test(arg)) {
	        argIndex = i + 1
	        dir.arg = _.stripQuotes(arg) || arg
	      }
	    } else if (
	      c === 0x7C && // pipe
	      str.charCodeAt(i + 1) !== 0x7C &&
	      str.charCodeAt(i - 1) !== 0x7C
	    ) {
	      if (dir.expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1
	        dir.expression = str.slice(argIndex, i).trim()
	      } else {
	        // already has filter
	        pushFilter()
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break // "
	        case 0x27: inSingle = true; break // '
	        case 0x28: paren++; break         // (
	        case 0x29: paren--; break         // )
	        case 0x5B: square++; break        // [
	        case 0x5D: square--; break        // ]
	        case 0x7B: curly++; break         // {
	        case 0x7D: curly--; break         // }
	      }
	    }
	  }

	  if (i === 0 || begin !== i) {
	    pushDir()
	  }

	  cache.put(s, dirs)
	  return dirs
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var Path = __webpack_require__(41)
	var Cache = __webpack_require__(52)
	var expressionCache = new Cache(1000)

	var keywords =
	  'Math,break,case,catch,continue,debugger,default,' +
	  'delete,do,else,false,finally,for,function,if,in,' +
	  'instanceof,new,null,return,switch,this,throw,true,try,' +
	  'typeof,var,void,while,with,undefined,abstract,boolean,' +
	  'byte,char,class,const,double,enum,export,extends,' +
	  'final,float,goto,implements,import,int,interface,long,' +
	  'native,package,private,protected,public,short,static,' +
	  'super,synchronized,throws,transient,volatile,' +
	  'arguments,let,yield'

	var wsRE = /\s/g
	var newlineRE = /\n/g
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|'[^']*'|"[^"]*"/g
	var restoreRE = /"(\d+)"/g
	var pathTestRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\])*$/
	var pathReplaceRE = /[^\w$\.]([A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\])*)/g
	var keywordsRE = new RegExp('^(' + keywords.replace(/,/g, '\\b|') + '\\b)')

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = []

	/**
	 * Save replacer
	 *
	 * @param {String} str
	 * @return {String} - placeholder with index
	 */

	function save (str) {
	  var i = saved.length
	  saved[i] = str.replace(newlineRE, '\\n')
	  return '"' + i + '"'
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite (raw) {
	  var c = raw.charAt(0)
	  var path = raw.slice(1)
	  if (keywordsRE.test(path)) {
	    return raw
	  } else {
	    path = path.indexOf('"') > -1
	      ? path.replace(restoreRE, restore)
	      : path
	    return c + 'scope.' + path
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore (str, i) {
	  return saved[i]
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function compileExpFns (exp, needSet) {
	  // reset state
	  saved.length = 0
	  // save strings and object literal keys
	  var body = exp
	    .replace(saveRE, save)
	    .replace(wsRE, '')
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body)
	    .replace(pathReplaceRE, rewrite)
	    .replace(restoreRE, restore)
	  var getter = makeGetter(body)
	  if (getter) {
	    return {
	      get: getter,
	      body: body,
	      set: needSet
	        ? makeSetter(body)
	        : null
	    }
	  }
	}

	/**
	 * Compile getter setters for a simple path.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compilePathFns (exp) {
	  var getter, path
	  if (exp.indexOf('[') < 0) {
	    // really simple path
	    path = exp.split('.')
	    getter = Path.compileGetter(path)
	  } else {
	    // do the real parsing
	    path = Path.parse(exp)
	    getter = path.get
	  }
	  return {
	    get: getter,
	    // always generate setter for simple paths
	    set: function (obj, val) {
	      Path.set(obj, path, val)
	    }
	  }
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetter (body) {
	  try {
	    return new Function('scope', 'return ' + body + ';')
	  } catch (e) {
	    _.warn(
	      'Invalid expression. ' + 
	      'Generated function body: ' + body
	    )
	  }
	}

	/**
	 * Build a setter function.
	 *
	 * This is only needed in rare situations like "a[b]" where
	 * a settable path requires dynamic evaluation.
	 *
	 * This setter function may throw error when called if the
	 * expression body is not a valid left-hand expression in
	 * assignment.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeSetter (body) {
	  try {
	    return new Function('scope', 'value', body + '=value;')
	  } catch (e) {
	    _.warn('Invalid setter function body: ' + body)
	  }
	}

	/**
	 * Check for setter existence on a cache hit.
	 *
	 * @param {Function} hit
	 */

	function checkSetter (hit) {
	  if (!hit.set) {
	    hit.set = makeSetter(hit.body)
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	exports.parse = function (exp, needSet) {
	  exp = exp.trim()
	  // try cache
	  var hit = expressionCache.get(exp)
	  if (hit) {
	    if (needSet) {
	      checkSetter(hit)
	    }
	    return hit
	  }
	  // we do a simple path check to optimize for them.
	  // the check fails valid paths with unusal whitespaces,
	  // but that's too rare and we don't care.
	  var res = pathTestRE.test(exp)
	    ? compilePathFns(exp)
	    : compileExpFns(exp, needSet)
	  expressionCache.put(exp, res)
	  return res
	}

	// Export the pathRegex for external use
	exports.pathTestRE = pathTestRE

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var applyCSSTransition = __webpack_require__(53)
	var applyJSTransition = __webpack_require__(54)

	/**
	 * Append with transition.
	 *
	 * @oaram {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.append = function (el, target, vm, cb) {
	  apply(el, 1, function () {
	    target.appendChild(el)
	  }, vm, cb)
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @oaram {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.before = function (el, target, vm, cb) {
	  apply(el, 1, function () {
	    _.before(el, target)
	  }, vm, cb)
	}

	/**
	 * Remove with transition.
	 *
	 * @oaram {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.remove = function (el, vm, cb) {
	  apply(el, -1, function () {
	    _.remove(el)
	  }, vm, cb)
	}

	/**
	 * Remove by appending to another parent with transition.
	 * This is only used in block operations.
	 *
	 * @oaram {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.removeThenAppend = function (el, target, vm, cb) {
	  apply(el, -1, function () {
	    target.appendChild(el)
	  }, vm, cb)
	}

	/**
	 * Append the childNodes of a fragment to target.
	 *
	 * @param {DocumentFragment} block
	 * @param {Node} target
	 * @param {Vue} vm
	 */

	exports.blockAppend = function (block, target, vm) {
	  var nodes = _.toArray(block.childNodes)
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    exports.before(nodes[i], target, vm)
	  }
	}

	/**
	 * Remove a block of nodes between two edge nodes.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 */

	exports.blockRemove = function (start, end, vm) {
	  var node = start.nextSibling
	  var next
	  while (node !== end) {
	    next = node.nextSibling
	    exports.remove(node, vm)
	    node = next
	  }
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @oaram {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	var apply = exports.apply = function (el, direction, op, vm, cb) {
	  var transData = el.__v_trans
	  if (
	    !transData ||
	    !vm._isCompiled ||
	    // if the vm is being manipulated by a parent directive
	    // during the parent's compilation phase, skip the
	    // animation.
	    (vm.$parent && !vm.$parent._isCompiled)
	  ) {
	    op()
	    if (cb) cb()
	    return
	  }
	  // determine the transition type on the element
	  var jsTransition = vm.$options.transitions[transData.id]
	  if (jsTransition) {
	    // js
	    applyJSTransition(
	      el,
	      direction,
	      op,
	      transData,
	      jsTransition,
	      vm,
	      cb
	    )
	  } else if (_.transitionEndEvent) {
	    // css
	    applyCSSTransition(
	      el,
	      direction,
	      op,
	      transData,
	      cb
	    )
	  } else {
	    // not applicable
	    op()
	    if (cb) cb()
	  }
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var config = __webpack_require__(20)
	var textParser = __webpack_require__(42)
	var dirParser = __webpack_require__(43)
	var templateParser = __webpack_require__(51)

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function should only be
	 * called on instance root nodes.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	module.exports = function compile (el, options, partial) {
	  var params = !partial && options.paramAttributes
	  var paramsLinkFn = params
	    ? compileParamAttributes(el, params, options)
	    : null
	  var nodeLinkFn = el instanceof DocumentFragment
	    ? null
	    : compileNode(el, options)
	  var childLinkFn =
	    (!nodeLinkFn || !nodeLinkFn.terminal) &&
	    el.hasChildNodes()
	      ? compileNodeList(el.childNodes, options)
	      : null

	  /**
	   * A linker function to be called on a already compiled
	   * piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @return {Function|undefined}
	   */

	  return function link (vm, el) {
	    var originalDirCount = vm._directives.length
	    if (paramsLinkFn) paramsLinkFn(vm, el)
	    if (nodeLinkFn) nodeLinkFn(vm, el)
	    if (childLinkFn) childLinkFn(vm, el.childNodes)

	    /**
	     * If this is a partial compile, the linker function
	     * returns an unlink function that tearsdown all
	     * directives instances generated during the partial
	     * linking.
	     */

	    if (partial) {
	      var dirs = vm._directives.slice(originalDirCount)
	      return function unlink () {
	        var i = dirs.length
	        while (i--) {
	          dirs[i]._teardown()
	        }
	        i = vm._directives.indexOf(dirs[0])
	        vm._directives.splice(i, dirs.length)
	      }
	    }
	  }
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNode (node, options) {
	  var type = node.nodeType
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options)
	  } else if (type === 3 && config.interpolate) {
	    return compileTextNode(node, options)
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement (el, options) {
	  var linkFn, tag, component
	  // check custom element component, but only on non-root
	  if (!el.__vue__) {
	    tag = el.tagName.toLowerCase()
	    component =
	      tag.indexOf('-') > 0 &&
	      options.components[tag]
	    if (component) {
	      el.setAttribute(config.prefix + 'component', tag)
	    }
	  }
	  if (component || el.hasAttributes()) {
	    // check terminal direcitves
	    linkFn = checkTerminalDirectives(el, options)
	    // if not terminal, build normal link function
	    if (!linkFn) {
	      var directives = collectDirectives(el, options)
	      linkFn = directives.length
	        ? makeDirectivesLinkFn(directives)
	        : null
	    }
	  }
	  // if the element is a textarea, we need to interpolate
	  // its content on initial render.
	  if (el.tagName === 'TEXTAREA') {
	    var realLinkFn = linkFn
	    linkFn = function (vm, el) {
	      el.value = vm.$interpolate(el.value)
	      if (realLinkFn) realLinkFn(vm, el)      
	    }
	    linkFn.terminal = true
	  }
	  return linkFn
	}

	/**
	 * Build a multi-directive link function.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeDirectivesLinkFn (directives) {
	  return function directivesLinkFn (vm, el) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length
	    var dir, j, k
	    while (i--) {
	      dir = directives[i]
	      if (dir._link) {
	        // custom link fn
	        dir._link(vm, el)
	      } else {
	        k = dir.descriptors.length
	        for (j = 0; j < k; j++) {
	          vm._bindDir(dir.name, el,
	                      dir.descriptors[j], dir.def)
	        }
	      }
	    }
	  }
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode (node, options) {
	  var tokens = textParser.parse(node.nodeValue)
	  if (!tokens) {
	    return null
	  }
	  var frag = document.createDocumentFragment()
	  var dirs = options.directives
	  var el, token, value
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i]
	    value = token.value
	    if (token.tag) {
	      if (token.oneTime) {
	        el = document.createTextNode(value)
	      } else {
	        if (token.html) {
	          el = document.createComment('v-html')
	          token.type = 'html'
	          token.def = dirs.html
	          token.descriptor = dirParser.parse(value)[0]
	        } else if (token.partial) {
	          el = document.createComment('v-partial')
	          token.type = 'partial'
	          token.def = dirs.partial
	          token.descriptor = dirParser.parse(value)[0]
	        } else {
	          // IE will clean up empty textNodes during
	          // frag.cloneNode(true), so we have to give it
	          // something here...
	          el = document.createTextNode(' ')
	          token.type = 'text'
	          token.def = dirs.text
	          token.descriptor = dirParser.parse(value)[0]
	        }
	      }
	    } else {
	      el = document.createTextNode(value)
	    }
	    frag.appendChild(el)
	  }
	  return makeTextNodeLinkFn(tokens, frag, options)
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn (tokens, frag) {
	  return function textNodeLinkFn (vm, el) {
	    var fragClone = frag.cloneNode(true)
	    var childNodes = _.toArray(fragClone.childNodes)
	    var token, value, node
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i]
	      value = token.value
	      if (token.tag) {
	        node = childNodes[i]
	        if (token.oneTime) {
	          value = vm.$eval(value)
	          if (token.html) {
	            _.replace(node, templateParser.parse(value, true))
	          } else {
	            node.nodeValue = value
	          }
	        } else {
	          vm._bindDir(token.type, node,
	                      token.descriptor, token.def)
	        }
	      }
	    }
	    _.replace(el, fragClone)
	  }
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList (nodeList, options) {
	  var linkFns = []
	  var nodeLinkFn, childLinkFn, node
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i]
	    nodeLinkFn = compileNode(node, options)
	    childLinkFn =
	      (!nodeLinkFn || !nodeLinkFn.terminal) &&
	      node.hasChildNodes()
	        ? compileNodeList(node.childNodes, options)
	        : null
	    linkFns.push(nodeLinkFn, childLinkFn)
	  }
	  return linkFns.length
	    ? makeChildLinkFn(linkFns)
	    : null
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn (linkFns) {
	  return function childLinkFn (vm, nodes) {
	    // stablize nodes
	    nodes = _.toArray(nodes)
	    var node, nodeLinkFn, childrenLinkFn
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n]
	      nodeLinkFn = linkFns[i++]
	      childrenLinkFn = linkFns[i++]
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node)
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, node.childNodes)
	      }
	    }
	  }
	}

	/**
	 * Compile param attributes on a root element and return
	 * a paramAttributes link function.
	 *
	 * @param {Element} el
	 * @param {Array} attrs
	 * @param {Object} options
	 * @return {Function} paramsLinkFn
	 */

	function compileParamAttributes (el, attrs, options) {
	  var params = []
	  var i = attrs.length
	  var name, value, param
	  while (i--) {
	    name = attrs[i]
	    value = el.getAttribute(name)
	    if (value !== null) {
	      param = {
	        name: name,
	        value: value
	      }
	      var tokens = textParser.parse(value)
	      if (tokens) {
	        el.removeAttribute(name)
	        if (tokens.length > 1) {
	          _.warn(
	            'Invalid param attribute binding: "' +
	            name + '="' + value + '"' +
	            '\nDon\'t mix binding tags with plain text ' +
	            'in param attribute bindings.'
	          )
	          continue
	        } else {
	          param.dynamic = true
	          param.value = tokens[0].value
	        }
	      }
	      params.push(param)
	    }
	  }
	  return makeParamsLinkFn(params, options)
	}

	/**
	 * Build a function that applies param attributes to a vm.
	 *
	 * @param {Array} params
	 * @param {Object} options
	 * @return {Function} paramsLinkFn
	 */

	var dataAttrRE = /^data-/

	function makeParamsLinkFn (params, options) {
	  var def = options.directives['with']
	  return function paramsLinkFn (vm, el) {
	    var i = params.length
	    var param, path
	    while (i--) {
	      param = params[i]
	      // params could contain dashes, which will be
	      // interpreted as minus calculations by the parser
	      // so we need to wrap the path here
	      path = _.camelize(param.name.replace(dataAttrRE, ''))
	      if (param.dynamic) {
	        // dynamic param attribtues are bound as v-with.
	        // we can directly duck the descriptor here beacuse
	        // param attributes cannot use expressions or
	        // filters.
	        vm._bindDir('with', el, {
	          arg: path,
	          expression: param.value
	        }, def)
	      } else {
	        // just set once
	        vm.$set(path, param.value)
	      }
	    }
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	var terminalDirectives = [
	  'repeat',
	  'if',
	  'component'
	]

	function skip () {}
	skip.terminal = true

	function checkTerminalDirectives (el, options) {
	  if (_.attr(el, 'pre') !== null) {
	    return skip
	  }
	  var value, dirName
	  /* jshint boss: true */
	  for (var i = 0; i < 3; i++) {
	    dirName = terminalDirectives[i]
	    if (value = _.attr(el, dirName)) {
	      return makeTeriminalLinkFn(el, dirName, value, options)
	    }
	  }
	}

	/**
	 * Build a link function for a terminal directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function makeTeriminalLinkFn (el, dirName, value, options) {
	  var descriptor = dirParser.parse(value)[0]
	  var def = options.directives[dirName]
	  // special case: we need to collect directives found
	  // on a component root node, but defined in the parent
	  // template. These directives need to be compiled in
	  // the parent scope.
	  if (dirName === 'component') {
	    var dirs = collectDirectives(el, options, true)
	    el._parentLinker = dirs.length
	      ? makeDirectivesLinkFn(dirs)
	      : null
	  }
	  var terminalLinkFn = function (vm, el) {
	    vm._bindDir(dirName, el, descriptor, def)
	  }
	  terminalLinkFn.terminal = true
	  return terminalLinkFn
	}

	/**
	 * Collect the directives on an element.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Boolean} asParent
	 * @return {Array}
	 */

	function collectDirectives (el, options, asParent) {
	  var attrs = _.toArray(el.attributes)
	  var i = attrs.length
	  var dirs = []
	  var attr, attrName, dir, dirName, dirDef
	  while (i--) {
	    attr = attrs[i]
	    attrName = attr.name
	    if (attrName.indexOf(config.prefix) === 0) {
	      dirName = attrName.slice(config.prefix.length)
	      if (
	        asParent &&
	        (dirName === 'with' || dirName === 'ref')
	      ) {
	        continue
	      }
	      dirDef = options.directives[dirName]
	      _.assertAsset(dirDef, 'directive', dirName)
	      if (dirDef) {
	        dirs.push({
	          name: dirName,
	          descriptors: dirParser.parse(attr.value),
	          def: dirDef
	        })
	      }
	    } else if (config.interpolate) {
	      dir = collectAttrDirective(el, attrName, attr.value,
	                                 options)
	      if (dir) {
	        dirs.push(dir)
	      }
	    }
	  }
	  // sort by priority, LOW to HIGH
	  dirs.sort(directiveComparator)
	  return dirs
	}

	/**
	 * Check an attribute for potential dynamic bindings,
	 * and return a directive object.
	 *
	 * @param {Element} el
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @return {Object}
	 */

	function collectAttrDirective (el, name, value, options) {
	  var tokens = textParser.parse(value)
	  if (tokens) {
	    var def = options.directives.attr
	    var i = tokens.length
	    var allOneTime = true
	    while (i--) {
	      var token = tokens[i]
	      if (token.tag && !token.oneTime) {
	        allOneTime = false
	      }
	    }
	    return {
	      def: def,
	      _link: allOneTime
	        ? function (vm, el) {
	            el.setAttribute(name, vm.$interpolate(value))
	          }
	        : function (vm, el) {
	            var value = textParser.tokensToExp(tokens, vm)
	            var desc = dirParser.parse(name + ':' + value)[0]
	            vm._bindDir('attr', el, desc, def)
	          }
	    }
	  }
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator (a, b) {
	  a = a.def.priority || 0
	  b = b.def.priority || 0
	  return a > b ? 1 : -1
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var templateParser = __webpack_require__(51)

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-repeat.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	module.exports = function transclude (el, options) {
	  // for template tags, what we want is its content as
	  // a documentFragment (for block instances)
	  if (el.tagName === 'TEMPLATE') {
	    el = templateParser.parse(el)
	  }
	  if (options && options.template) {
	    el = transcludeTemplate(el, options)
	  }
	  if (el instanceof DocumentFragment) {
	    _.prepend(document.createComment('v-start'), el)
	    el.appendChild(document.createComment('v-end'))
	  }
	  return el
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate (el, options) {
	  var template = options.template
	  var frag = templateParser.parse(template, true)
	  if (!frag) {
	    _.warn('Invalid template option: ' + template)
	  } else {
	    collectRawContent(el)
	    if (options.replace) {
	      if (frag.childNodes.length > 1) {
	        transcludeContent(frag)
	        return frag
	      } else {
	        var replacer = frag.firstChild
	        _.copyAttributes(el, replacer)
	        transcludeContent(replacer)
	        return replacer
	      }
	    } else {
	      el.appendChild(frag)
	      transcludeContent(el)
	      return el
	    }
	  }
	}

	/**
	 * Collect raw content inside $el before they are
	 * replaced by template content.
	 */

	var rawContent
	function collectRawContent (el) {
	  var child
	  rawContent = null
	  if (el.hasChildNodes()) {
	    rawContent = document.createElement('div')
	    /* jshint boss:true */
	    while (child = el.firstChild) {
	      rawContent.appendChild(child)
	    }
	  }
	}

	/**
	 * Resolve <content> insertion points mimicking the behavior
	 * of the Shadow DOM spec:
	 *
	 *   http://w3c.github.io/webcomponents/spec/shadow/#insertion-points
	 *
	 * @param {Element|DocumentFragment} el
	 */

	function transcludeContent (el) {
	  var outlets = getOutlets(el)
	  var i = outlets.length
	  if (!i) return
	  var outlet, select, selected, j, main
	  // first pass, collect corresponding content
	  // for each outlet.
	  while (i--) {
	    outlet = outlets[i]
	    if (rawContent) {
	      select = outlet.getAttribute('select')
	      if (select) {  // select content
	        selected = rawContent.querySelectorAll(select)
	        outlet.content = _.toArray(
	          selected.length
	            ? selected
	            : outlet.childNodes
	        )
	      } else { // default content
	        main = outlet
	      }
	    } else { // fallback content
	      outlet.content = _.toArray(outlet.childNodes)
	    }
	  }
	  // second pass, actually insert the contents
	  for (i = 0, j = outlets.length; i < j; i++) {
	    outlet = outlets[i]
	    if (outlet !== main) {
	      insertContentAt(outlet, outlet.content)
	    }
	  }
	  // finally insert the main content
	  if (main) {
	    insertContentAt(main, _.toArray(rawContent.childNodes))
	  }
	}

	/**
	 * Get <content> outlets from the element/list
	 *
	 * @param {Element|Array} el
	 * @return {Array}
	 */

	var concat = [].concat
	function getOutlets (el) {
	  return _.isArray(el)
	    ? concat.apply([], el.map(getOutlets))
	    : el.querySelectorAll
	      ? _.toArray(el.querySelectorAll('content'))
	      : []
	}

	/**
	 * Insert an array of nodes at outlet,
	 * then remove the outlet.
	 *
	 * @param {Element} outlet
	 * @param {Array} contents
	 */

	function insertContentAt (outlet, contents) {
	  // not using util DOM methods here because
	  // parentNode can be cached
	  var parent = outlet.parentNode
	  for (var i = 0, j = contents.length; i < j; i++) {
	    parent.insertBefore(contents[i], outlet)
	  }
	  parent.removeChild(outlet)
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)

	var handlers = {
	  _default: __webpack_require__(55),
	  radio: __webpack_require__(56),
	  select: __webpack_require__(57),
	  checkbox: __webpack_require__(58)
	}

	module.exports = {

	  priority: 800,
	  twoWay: true,
	  handlers: handlers,

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   *     - TODO: more types may be supplied as a plugin
	   */

	  bind: function () {
	    // friendly warning...
	    var filters = this.filters
	    if (filters && filters.read && !filters.write) {
	      _.warn(
	        'It seems you are using a read-only filter with ' +
	        'v-model. You might want to use a two-way filter ' +
	        'to ensure correct behavior.'
	      )
	    }
	    var el = this.el
	    var tag = el.tagName
	    var handler
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers._default
	    } else if (tag === 'SELECT') {
	      handler = handlers.select
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers._default
	    } else {
	      _.warn("v-model doesn't support element type: " + tag)
	      return
	    }
	    handler.bind.call(this)
	    this.update = handler.update
	    this.unbind = handler.unbind
	  }

	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var config = __webpack_require__(20)
	var Binding = __webpack_require__(39)
	var arrayMethods = __webpack_require__(59)
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods)
	__webpack_require__(60)

	var uid = 0

	/**
	 * Type enums
	 */

	var ARRAY  = 0
	var OBJECT = 1

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function protoAugment (target, src) {
	  target.__proto__ = src
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment (target, src, keys) {
	  var i = keys.length
	  var key
	  while (i--) {
	    key = keys[i]
	    _.define(target, key, src[key])
	  }
	}

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @param {Number} type
	 * @constructor
	 */

	function Observer (value, type) {
	  this.id = ++uid
	  this.value = value
	  this.active = true
	  this.bindings = []
	  _.define(value, '__ob__', this)
	  if (type === ARRAY) {
	    var augment = config.proto && _.hasProto
	      ? protoAugment
	      : copyAugment
	    augment(value, arrayMethods, arrayKeys)
	    this.observeArray(value)
	  } else if (type === OBJECT) {
	    this.walk(value)
	  }
	}

	Observer.target = null

	var p = Observer.prototype

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @return {Observer|undefined}
	 * @static
	 */

	Observer.create = function (value) {
	  if (
	    value &&
	    value.hasOwnProperty('__ob__') &&
	    value.__ob__ instanceof Observer
	  ) {
	    return value.__ob__
	  } else if (_.isArray(value)) {
	    return new Observer(value, ARRAY)
	  } else if (
	    _.isPlainObject(value) &&
	    !value._isVue // avoid Vue instance
	  ) {
	    return new Observer(value, OBJECT)
	  }
	}

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object. Properties prefixed with `$` or `_`
	 * and accessor properties are ignored.
	 *
	 * @param {Object} obj
	 */

	p.walk = function (obj) {
	  var keys = Object.keys(obj)
	  var i = keys.length
	  var key, prefix
	  while (i--) {
	    key = keys[i]
	    prefix = key.charCodeAt(0)
	    if (prefix !== 0x24 && prefix !== 0x5F) { // skip $ or _
	      this.convert(key, obj[key])
	    }
	  }
	}

	/**
	 * Try to carete an observer for a child value,
	 * and if value is array, link binding to the array.
	 *
	 * @param {*} val
	 * @return {Binding|undefined}
	 */

	p.observe = function (val) {
	  return Observer.create(val)
	}

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	p.observeArray = function (items) {
	  var i = items.length
	  while (i--) {
	    this.observe(items[i])
	  }
	}

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	p.convert = function (key, val) {
	  var ob = this
	  var childOb = ob.observe(val)
	  var binding = new Binding()
	  if (childOb) {
	    childOb.bindings.push(binding)
	  }
	  Object.defineProperty(ob.value, key, {
	    enumerable: true,
	    configurable: true,
	    get: function () {
	      // Observer.target is a watcher whose getter is
	      // currently being evaluated.
	      if (ob.active && Observer.target) {
	        Observer.target.addDep(binding)
	      }
	      return val
	    },
	    set: function (newVal) {
	      if (newVal === val) return
	      // remove binding from old value
	      var oldChildOb = val && val.__ob__
	      if (oldChildOb) {
	        var oldBindings = oldChildOb.bindings
	        oldBindings.splice(oldBindings.indexOf(binding), 1)
	      }
	      val = newVal
	      // add binding to new value
	      var newChildOb = ob.observe(newVal)
	      if (newChildOb) {
	        newChildOb.bindings.push(binding)
	      }
	      binding.notify()
	    }
	  })
	}

	/**
	 * Notify change on all self bindings on an observer.
	 * This is called when a mutable value mutates. e.g.
	 * when an Array's mutating methods are called, or an
	 * Object's $add/$delete are called.
	 */

	p.notify = function () {
	  var bindings = this.bindings
	  for (var i = 0, l = bindings.length; i < l; i++) {
	    bindings[i].notify()
	  }
	}

	/**
	 * Add an owner vm, so that when $add/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	p.addVm = function (vm) {
	  (this.vms = this.vms || []).push(vm)
	}

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	p.removeVm = function (vm) {
	  this.vms.splice(this.vms.indexOf(vm), 1)
	}

	module.exports = Observer


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)

	/**
	 * The Batcher maintains a job queue to be run
	 * async on the next event loop.
	 */

	function Batcher () {
	  this.reset()
	}

	var p = Batcher.prototype

	/**
	 * Push a job into the job queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Object} job
	 *   properties:
	 *   - {String|Number} id
	 *   - {Function}      run
	 */

	p.push = function (job) {
	  if (!job.id || !this.has[job.id] || this.flushing) {
	    this.queue.push(job)
	    this.has[job.id] = job
	    if (!this.waiting) {
	      this.waiting = true
	      _.nextTick(this.flush, this)
	    }
	  }
	}

	/**
	 * Flush the queue and run the jobs.
	 * Will call a preFlush hook if has one.
	 */

	p.flush = function () {
	  this.flushing = true
	  // do not cache length because more jobs might be pushed
	  // as we run existing jobs
	  for (var i = 0; i < this.queue.length; i++) {
	    var job = this.queue[i]
	    if (!job.cancelled) {
	      job.run()
	    }
	  }
	  this.reset()
	}

	/**
	 * Reset the batcher's state.
	 */

	p.reset = function () {
	  this.has = {}
	  this.queue = []
	  this.waiting = false
	  this.flushing = false
	}

	module.exports = Batcher

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var Cache = __webpack_require__(52)
	var templateCache = new Cache(100)

	/**
	 * Test for the presence of the Safari template cloning bug
	 * https://bugs.webkit.org/show_bug.cgi?id=137755
	 */

	var hasBrokenTemplate = _.inBrowser
	  ? (function () {
	      var a = document.createElement('div')
	      a.innerHTML = '<template>1</template>'
	      return !a.cloneNode(true).firstChild.innerHTML
	    })()
	  : false

	var map = {
	  _default : [0, '', ''],
	  legend   : [1, '<fieldset>', '</fieldset>'],
	  tr       : [2, '<table><tbody>', '</tbody></table>'],
	  col      : [
	    2,
	    '<table><tbody></tbody><colgroup>',
	    '</colgroup></table>'
	  ]
	}

	map.td =
	map.th = [
	  3,
	  '<table><tbody><tr>',
	  '</tr></tbody></table>'
	]

	map.option =
	map.optgroup = [
	  1,
	  '<select multiple="multiple">',
	  '</select>'
	]

	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>']

	map.g =
	map.defs =
	map.symbol =
	map.use =
	map.image =
	map.text =
	map.circle =
	map.ellipse =
	map.line =
	map.path =
	map.polygon =
	map.polyline =
	map.rect = [
	  1,
	  '<svg ' +
	    'xmlns="http://www.w3.org/2000/svg" ' +
	    'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
	    'xmlns:ev="http://www.w3.org/2001/xml-events"' +
	    'version="1.1">',
	  '</svg>'
	]

	var TAG_RE = /<([\w:]+)/

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @return {DocumentFragment}
	 */

	function stringToFragment (templateString) {
	  // try a cache hit first
	  var hit = templateCache.get(templateString)
	  if (hit) {
	    return hit
	  }

	  var frag = document.createDocumentFragment()
	  var tagMatch = TAG_RE.exec(templateString)

	  if (!tagMatch) {
	    // text only, return a single text node.
	    frag.appendChild(
	      document.createTextNode(templateString)
	    )
	  } else {

	    var tag    = tagMatch[1]
	    var wrap   = map[tag] || map._default
	    var depth  = wrap[0]
	    var prefix = wrap[1]
	    var suffix = wrap[2]
	    var node   = document.createElement('div')

	    node.innerHTML = prefix + templateString.trim() + suffix
	    while (depth--) {
	      node = node.lastChild
	    }

	    var child
	    /* jshint boss:true */
	    while (child = node.firstChild) {
	      frag.appendChild(child)
	    }
	  }

	  templateCache.put(templateString, frag)
	  return frag
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment (node) {
	  var tag = node.tagName
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (
	    tag === 'TEMPLATE' &&
	    node.content instanceof DocumentFragment
	  ) {
	    return node.content
	  }
	  return tag === 'SCRIPT'
	    ? stringToFragment(node.textContent)
	    : stringToFragment(node.innerHTML)
	}

	/**
	 * Deal with Safari cloning nested <template> bug by
	 * manually cloning all template instances.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	exports.clone = function (node) {
	  var res = node.cloneNode(true)
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var templates = node.querySelectorAll('template')
	    if (templates.length) {
	      var cloned = res.querySelectorAll('template')
	      var i = cloned.length
	      while (i--) {
	        cloned[i].parentNode.replaceChild(
	          templates[i].cloneNode(true),
	          cloned[i]
	        )
	      }
	    }
	  }
	  return res
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *    Possible values include:
	 *    - DocumentFragment object
	 *    - Node object of type Template
	 *    - id selector: '#some-template-id'
	 *    - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} clone
	 * @return {DocumentFragment|undefined}
	 */

	exports.parse = function (template, clone) {
	  var node, frag

	  // if the template is already a document fragment,
	  // do nothing
	  if (template instanceof DocumentFragment) {
	    return clone
	      ? template.cloneNode(true)
	      : template
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = templateCache.get(template)
	      if (!frag) {
	        node = document.getElementById(template.slice(1))
	        if (node) {
	          frag = nodeToFragment(node)
	          // save selector to cache
	          templateCache.put(template, frag)
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template)
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template)
	  }

	  return frag && clone
	    ? exports.clone(frag)
	    : frag
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A doubly linked list-based Least Recently Used (LRU)
	 * cache. Will keep most recently used items while
	 * discarding least recently used items when its limit is
	 * reached. This is a bare-bone version of
	 * Rasmus Andersson's js-lru:
	 *
	 *   https://github.com/rsms/js-lru
	 *
	 * @param {Number} limit
	 * @constructor
	 */

	function Cache (limit) {
	  this.size = 0
	  this.limit = limit
	  this.head = this.tail = undefined
	  this._keymap = {}
	}

	var p = Cache.prototype

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var entry = {
	    key:key,
	    value:value
	  }
	  this._keymap[key] = entry
	  if (this.tail) {
	    this.tail.newer = entry
	    entry.older = this.tail
	  } else {
	    this.head = entry
	  }
	  this.tail = entry
	  if (this.size === this.limit) {
	    return this.shift()
	  } else {
	    this.size++
	  }
	}

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head
	  if (entry) {
	    this.head = this.head.newer
	    this.head.older = undefined
	    entry.newer = entry.older = undefined
	    this._keymap[entry.key] = undefined
	  }
	  return entry
	}

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key]
	  if (entry === undefined) return
	  if (entry === this.tail) {
	    return returnEntry
	      ? entry
	      : entry.value
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer
	    }
	    entry.newer.older = entry.older // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer // C. --> E
	  }
	  entry.newer = undefined // D --x
	  entry.older = this.tail // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry // E. <-- D
	  }
	  this.tail = entry
	  return returnEntry
	    ? entry
	    : entry.value
	}

	module.exports = Cache

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var addClass = _.addClass
	var removeClass = _.removeClass
	var transDurationProp = _.transitionProp + 'Duration'
	var animDurationProp = _.animationProp + 'Duration'

	var queue = []
	var queued = false

	/**
	 * Push a job into the transition queue, which is to be
	 * executed on next frame.
	 *
	 * @param {Element} el    - target element
	 * @param {Number} dir    - 1: enter, -1: leave
	 * @param {Function} op   - the actual dom operation
	 * @param {String} cls    - the className to remove when the
	 *                          transition is done.
	 * @param {Function} [cb] - user supplied callback.
	 */

	function push (el, dir, op, cls, cb) {
	  queue.push({
	    el  : el,
	    dir : dir,
	    cb  : cb,
	    cls : cls,
	    op  : op
	  })
	  if (!queued) {
	    queued = true
	    _.nextTick(flush)
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush () {
	  /* jshint unused: false */
	  var f = document.documentElement.offsetHeight
	  queue.forEach(run)
	  queue = []
	  queued = false
	}

	/**
	 * Run a transition job.
	 *
	 * @param {Object} job
	 */

	function run (job) {

	  var el = job.el
	  var data = el.__v_trans
	  var cls = job.cls
	  var cb = job.cb
	  var op = job.op
	  var transitionType = getTransitionType(el, data, cls)

	  if (job.dir > 0) { // ENTER
	    if (transitionType === 1) {
	      // trigger transition by removing enter class
	      removeClass(el, cls)
	      // only need to listen for transitionend if there's
	      // a user callback
	      if (cb) setupTransitionCb(_.transitionEndEvent)
	    } else if (transitionType === 2) {
	      // animations are triggered when class is added
	      // so we just listen for animationend to remove it.
	      setupTransitionCb(_.animationEndEvent, function () {
	        removeClass(el, cls)
	      })
	    } else {
	      // no transition applicable
	      removeClass(el, cls)
	      if (cb) cb()
	    }
	  } else { // LEAVE
	    if (transitionType) {
	      // leave transitions/animations are both triggered
	      // by adding the class, just remove it on end event.
	      var event = transitionType === 1
	        ? _.transitionEndEvent
	        : _.animationEndEvent
	      setupTransitionCb(event, function () {
	        op()
	        removeClass(el, cls)
	      })
	    } else {
	      op()
	      removeClass(el, cls)
	      if (cb) cb()
	    }
	  }

	  /**
	   * Set up a transition end callback, store the callback
	   * on the element's __v_trans data object, so we can
	   * clean it up if another transition is triggered before
	   * the callback is fired.
	   *
	   * @param {String} event
	   * @param {Function} [cleanupFn]
	   */

	  function setupTransitionCb (event, cleanupFn) {
	    data.event = event
	    var onEnd = data.callback = function transitionCb (e) {
	      if (e.target === el) {
	        _.off(el, event, onEnd)
	        data.event = data.callback = null
	        if (cleanupFn) cleanupFn()
	        if (cb) cb()
	      }
	    }
	    _.on(el, event, onEnd)
	  }
	}

	/**
	 * Get an element's transition type based on the
	 * calculated styles
	 *
	 * @param {Element} el
	 * @param {Object} data
	 * @param {String} className
	 * @return {Number}
	 *         1 - transition
	 *         2 - animation
	 */

	function getTransitionType (el, data, className) {
	  var type = data.cache && data.cache[className]
	  if (type) return type
	  var inlineStyles = el.style
	  var computedStyles = window.getComputedStyle(el)
	  var transDuration =
	    inlineStyles[transDurationProp] ||
	    computedStyles[transDurationProp]
	  if (transDuration && transDuration !== '0s') {
	    type = 1
	  } else {
	    var animDuration =
	      inlineStyles[animDurationProp] ||
	      computedStyles[animDurationProp]
	    if (animDuration && animDuration !== '0s') {
	      type = 2
	    }
	  }
	  if (type) {
	    if (!data.cache) data.cache = {}
	    data.cache[className] = type
	  }
	  return type
	}

	/**
	 * Apply CSS transition to an element.
	 *
	 * @param {Element} el
	 * @param {Number} direction - 1: enter, -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Object} data - target element's transition data
	 */

	module.exports = function (el, direction, op, data, cb) {
	  var prefix = data.id || 'v'
	  var enterClass = prefix + '-enter'
	  var leaveClass = prefix + '-leave'
	  // clean up potential previous unfinished transition
	  if (data.callback) {
	    _.off(el, data.event, data.callback)
	    removeClass(el, enterClass)
	    removeClass(el, leaveClass)
	    data.event = data.callback = null
	  }
	  if (direction > 0) { // enter
	    addClass(el, enterClass)
	    op()
	    push(el, direction, null, enterClass, cb)
	  } else { // leave
	    addClass(el, leaveClass)
	    push(el, direction, op, leaveClass, cb)
	  }
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Apply JavaScript enter/leave functions.
	 *
	 * @param {Element} el
	 * @param {Number} direction - 1: enter, -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Object} data - target element's transition data
	 * @param {Object} def - transition definition object
	 * @param {Vue} vm - the owner vm of the element
	 * @param {Function} [cb]
	 */

	module.exports = function (el, direction, op, data, def, vm, cb) {
	  if (data.cancel) {
	    data.cancel()
	    data.cancel = null
	  }
	  if (direction > 0) { // enter
	    if (def.beforeEnter) {
	      def.beforeEnter.call(vm, el)
	    }
	    op()
	    if (def.enter) {
	      data.cancel = def.enter.call(vm, el, function () {
	        data.cancel = null
	        if (cb) cb()
	      })
	    } else if (cb) {
	      cb()
	    }
	  } else { // leave
	    if (def.leave) {
	      data.cancel = def.leave.call(vm, el, function () {
	        data.cancel = null
	        op()
	        if (cb) cb()
	      })
	    } else {
	      op()
	      if (cb) cb()
	    }
	  }
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el

	    // check params
	    // - lazy: update model on "change" instead of "input"
	    var lazy = el.hasAttribute('lazy')
	    if (lazy) {
	      el.removeAttribute('lazy')
	    }
	    // - number: cast value into number when updating model.
	    var number =
	      el.hasAttribute('number') ||
	      el.type === 'number'
	    if (number) {
	      el.removeAttribute('number')
	    }

	    // handle composition events.
	    // http://blog.evanyou.me/2014/01/03/composition-event/
	    var cpLocked = false
	    this.cpLock = function () {
	      cpLocked = true
	    }
	    this.cpUnlock = function () {
	      cpLocked = false
	      // in IE11 the "compositionend" event fires AFTER
	      // the "input" event, so the input handler is blocked
	      // at the end... have to call it here.
	      set()
	    }
	    _.on(el,'compositionstart', this.cpLock)
	    _.on(el,'compositionend', this.cpUnlock)

	    // shared setter
	    function set () {
	      self.set(
	        number ? _.toNumber(el.value) : el.value,
	        true
	      )
	    }

	    // if the directive has filters, we need to
	    // record cursor position and restore it after updating
	    // the input with the filtered value.
	    this.listener = function textInputListener () {
	      if (cpLocked) return
	      var charsOffset
	      // some HTML5 input types throw error here
	      try {
	        // record how many chars from the end of input
	        // the cursor was at
	        charsOffset = el.value.length - el.selectionStart
	      } catch (e) {}
	      set()
	      // force a value update, because in
	      // certain cases the write filters output the same
	      // result for different input values, and the Observer
	      // set events won't be triggered.
	      _.nextTick(function () {
	        var newVal = self._watcher.value
	        self.update(newVal)
	        if (charsOffset != null) {
	          var cursorPos =
	            _.toString(newVal).length - charsOffset
	          el.setSelectionRange(cursorPos, cursorPos)
	        }
	      })
	    }
	    this.event = lazy ? 'change' : 'input'
	    _.on(el, this.event, this.listener)

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && _.isIE9) {
	      this.onCut = function () {
	        _.nextTick(self.listener)
	      }
	      this.onDel = function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener()
	        }
	      }
	      _.on(el, 'cut', this.onCut)
	      _.on(el, 'keyup', this.onDel)
	    }

	    // set initial value if present
	    if (
	      el.hasAttribute('value') ||
	      (el.tagName === 'TEXTAREA' && el.value.trim())
	    ) {
	      this._initValue = number
	        ? _.toNumber(el.value)
	        : el.value
	    }
	  },

	  update: function (value) {
	    this.el.value = _.toString(value)
	  },

	  unbind: function () {
	    var el = this.el
	    _.off(el, this.event, this.listener)
	    _.off(el,'compositionstart', this.cpLock)
	    _.off(el,'compositionend', this.cpUnlock)
	    if (this.onCut) {
	      _.off(el,'cut', this.onCut)
	      _.off(el,'keyup', this.onDel)
	    }
	  }

	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el
	    this.listener = function () {
	      self.set(el.value, true)
	    }
	    _.on(el, 'change', this.listener)
	    if (el.checked) {
	      this._initValue = el.value
	    }
	  },

	  update: function (value) {
	    /* jshint eqeqeq: false */
	    this.el.checked = value == this.el.value
	  },

	  unbind: function () {
	    _.off(this.el, 'change', this.listener)
	  }

	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var Watcher = __webpack_require__(21)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el
	    // check options param
	    var optionsParam = el.getAttribute('options')
	    if (optionsParam) {
	      el.removeAttribute('options')
	      initOptions.call(this, optionsParam)
	    }
	    this.multiple = el.hasAttribute('multiple')
	    this.listener = function () {
	      var value = self.multiple
	        ? getMultiValue(el)
	        : el.value
	      self.set(value, true)
	    }
	    _.on(el, 'change', this.listener)
	    checkInitialValue.call(this)
	  },

	  update: function (value) {
	    /* jshint eqeqeq: false */
	    var el = this.el
	    el.selectedIndex = -1
	    var multi = this.multiple && _.isArray(value)
	    var options = el.options
	    var i = options.length
	    var option
	    while (i--) {
	      option = options[i]
	      option.selected = multi
	        ? indexOf(value, option.value) > -1
	        : value == option.value
	    }
	  },

	  unbind: function () {
	    _.off(this.el, 'change', this.listener)
	    if (this.optionWatcher) {
	      this.optionWatcher.teardown()
	    }
	  }

	}

	/**
	 * Initialize the option list from the param.
	 *
	 * @param {String} expression
	 */

	function initOptions (expression) {
	  var self = this
	  function optionUpdateWatcher (value) {
	    if (_.isArray(value)) {
	      self.el.innerHTML = ''
	      buildOptions(self.el, value)
	      if (self._watcher) {
	        self.update(self._watcher.value)
	      }
	    } else {
	      _.warn('Invalid options value for v-model: ' + value)
	    }
	  }
	  this.optionWatcher = new Watcher(
	    this.vm,
	    expression,
	    optionUpdateWatcher
	  )
	  // update with initial value
	  optionUpdateWatcher(this.optionWatcher.value)
	}

	/**
	 * Build up option elements. IE9 doesn't create options
	 * when setting innerHTML on <select> elements, so we have
	 * to use DOM API here.
	 *
	 * @param {Element} parent - a <select> or an <optgroup>
	 * @param {Array} options
	 */

	function buildOptions (parent, options) {
	  var op, el
	  for (var i = 0, l = options.length; i < l; i++) {
	    op = options[i]
	    if (!op.options) {
	      el = document.createElement('option')
	      if (typeof op === 'string') {
	        el.text = el.value = op
	      } else {
	        el.text = op.text
	        el.value = op.value
	      }
	    } else {
	      el = document.createElement('optgroup')
	      el.label = op.label
	      buildOptions(el, op.options)
	    }
	    parent.appendChild(el)
	  }
	}

	/**
	 * Check the initial value for selected options.
	 */

	function checkInitialValue () {
	  var initValue
	  var options = this.el.options
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (options[i].hasAttribute('selected')) {
	      if (this.multiple) {
	        (initValue || (initValue = []))
	          .push(options[i].value)
	      } else {
	        initValue = options[i].value
	      }
	    }
	  }
	  if (initValue) {
	    this._initValue = initValue
	  }
	}

	/**
	 * Helper to extract a value array for select[multiple]
	 *
	 * @param {SelectElement} el
	 * @return {Array}
	 */

	function getMultiValue (el) {
	  return Array.prototype.filter
	    .call(el.options, filterSelected)
	    .map(getOptionValue)
	}

	function filterSelected (op) {
	  return op.selected
	}

	function getOptionValue (op) {
	  return op.value || op.text
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with soft equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf (arr, val) {
	  /* jshint eqeqeq: false */
	  var i = arr.length
	  while (i--) {
	    if (arr[i] == val) return i
	  }
	  return -1
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el
	    this.listener = function () {
	      self.set(el.checked, true)
	    }
	    _.on(el, 'change', this.listener)
	    if (el.checked) {
	      this._initValue = el.checked
	    }
	  },

	  update: function (value) {
	    this.el.checked = !!value
	  },

	  unbind: function () {
	    _.off(this.el, 'change', this.listener)
	  }

	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var arrayProto = Array.prototype
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method]
	  _.define(arrayMethods, method, function mutator () {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length
	    var args = new Array(i)
	    while (i--) {
	      args[i] = arguments[i]
	    }
	    var result = original.apply(this, args)
	    var ob = this.__ob__
	    var inserted
	    switch (method) {
	      case 'push':
	        inserted = args
	        break
	      case 'unshift':
	        inserted = args
	        break
	      case 'splice':
	        inserted = args.slice(2)
	        break
	    }
	    if (inserted) ob.observeArray(inserted)
	    // notify change
	    ob.notify()
	    return result
	  })
	})

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	_.define(
	  arrayProto,
	  '$set',
	  function $set (index, val) {
	    if (index >= this.length) {
	      this.length = index + 1
	    }
	    return this.splice(index, 1, val)[0]
	  }
	)

	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */

	_.define(
	  arrayProto,
	  '$remove',
	  function $remove (index) {
	    if (typeof index !== 'number') {
	      index = this.indexOf(index)
	    }
	    if (index > -1) {
	      return this.splice(index, 1)[0]
	    }
	  }
	)

	module.exports = arrayMethods

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var objProto = Object.prototype

	/**
	 * Add a new property to an observed object
	 * and emits corresponding event
	 *
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */

	_.define(
	  objProto,
	  '$add',
	  function $add (key, val) {
	    var ob = this.__ob__
	    if (!ob) {
	      this[key] = val
	      return
	    }
	    if (_.isReserved(key)) {
	      _.warn('Refused to $add reserved key: ' + key)
	      return
	    }
	    if (this.hasOwnProperty(key)) return
	    ob.convert(key, val)
	    if (ob.vms) {
	      var i = ob.vms.length
	      while (i--) {
	        var vm = ob.vms[i]
	        vm._proxy(key)
	        vm._digest()
	      }
	    } else {
	      ob.notify()
	    }
	  }
	)

	/**
	 * Deletes a property from an observed object
	 * and emits corresponding event
	 *
	 * @param {String} key
	 * @public
	 */

	_.define(
	  objProto,
	  '$delete',
	  function $delete (key) {
	    var ob = this.__ob__
	    if (!ob) {
	      delete this[key]
	      return
	    }
	    if (_.isReserved(key)) {
	      _.warn('Refused to $add reserved key: ' + key)
	      return
	    }
	    if (!this.hasOwnProperty(key)) return
	    delete this[key]
	    if (ob.vms) {
	      var i = ob.vms.length
	      while (i--) {
	        var vm = ob.vms[i]
	        vm._unproxy(key)
	        vm._digest()
	      }
	    } else {
	      ob.notify()
	    }
	  }
	)

/***/ }
/******/ ])
});

},{}],2:[function(require,module,exports){
/**
 * Facebook login on header
 */
(function(global) {
    "use strict";

    var Vue = require("./../../../../../bower_components/vue/dist/vue.js");

    module.exports = Vue.extend({

        template: "#lunch-login-tmpl",

        data: function(){
            return {
                fbParam: {
                    appId      : '1437481033176694',
                    xfbml      : true,
                    version    : 'v2.1'
                }, 
                initialized: false,
                loggedIn: false
            };
        },

        created: function() {
            var that = this;
            this.$on("fbReady", function(){
                FB.init(this.fbParam);
                FB.getLoginStatus(function(response) {
                    that.statusChangeCallback(response);
                    that.initialized = true;
                });
            });
        },

        methods: {
            login: function(){
                var that = this;
                FB.login(function(response){
                    that.statusChangeCallback(response);
                }, {scope: 'public_profile,user_friends'});
            },

            logout: function(){
                var that = this;
                FB.logout(function(response) {
                    that.statusChangeCallback(response);
                });
            },

            statusChangeCallback: function(response) {
                var that = this;
                if(response.status === 'connected'){
                    FB.api('/me', function(res) {
                        that.$parent.me = res;
                    });
                    that.$parent.accessToken = response.authResponse.accessToken;
                    that.$parent.me = {id: response.authResponse.userID};
                    that.loggedIn = true;
                    that.$dispatch("fbOnLogin", response);                    
                }else{
                    that.loggedIn = false;
                    that.$dispatch("fbOnLogout", response);
                }
            }
        }
    });

})(window);
},{"./../../../../../bower_components/vue/dist/vue.js":1}],3:[function(require,module,exports){
/**
 * getting started
 */
(function(global) {
    "use strict";
    
    var Vue = require("./../../../../bower_components/vue/dist/vue.js");
    var vueFilters = require("./filter/filters");
    var loginComponent = require("./component/login");

    var app = module.exports = new Vue({

        el: '#app',

        data: {
            me: null,
            accessToken: null,
            mainPanel: ""
        },

        components: {
            "lunch-login": loginComponent
        },

        created: function() {
            this.$on("fbOnLogin", function(res){
            });
            this.$on("fbOnLogout", function(res){
            });
        },

        methods: {
        }
    });

    global.fbAsyncInit = function() {
        app.$broadcast("fbReady");
    };
})(window);
},{"./../../../../bower_components/vue/dist/vue.js":1,"./component/login":2,"./filter/filters":4}],4:[function(require,module,exports){
/**
 * Filters
 */
(function(global) {
    "use strict";

    var Vue = require("./../../../../../bower_components/vue/dist/vue.js");

    Vue.filter('fbUserImageFilter', function (id) {
        return "http://graph.facebook.com/" + id + "/picture?type=square";
    });

})(window);
},{"./../../../../../bower_components/vue/dist/vue.js":1}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9KUDExNzA3L2Rldi9ob2JieS9sdW5jaGFwcC9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvSlAxMTcwNy9kZXYvaG9iYnkvbHVuY2hhcHAvYm93ZXJfY29tcG9uZW50cy92dWUvZGlzdC92dWUuanMiLCIvVXNlcnMvSlAxMTcwNy9kZXYvaG9iYnkvbHVuY2hhcHAvcHVibGljL2pzL3RlamkvbHVuY2gvY29tcG9uZW50L2xvZ2luLmpzIiwiL1VzZXJzL0pQMTE3MDcvZGV2L2hvYmJ5L2x1bmNoYXBwL3B1YmxpYy9qcy90ZWppL2x1bmNoL2Zha2VfZjg1ZDc3ZDYuanMiLCIvVXNlcnMvSlAxMTcwNy9kZXYvaG9iYnkvbHVuY2hhcHAvcHVibGljL2pzL3RlamkvbHVuY2gvZmlsdGVyL2ZpbHRlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy83T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogVnVlLmpzIHYwLjExLjBcbiAqIChjKSAyMDE0IEV2YW4gWW91XG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJWdWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiVnVlXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGV4dGVuZCA9IF8uZXh0ZW5kXG5cblx0LyoqXG5cdCAqIFRoZSBleHBvc2VkIFZ1ZSBjb25zdHJ1Y3Rvci5cblx0ICpcblx0ICogQVBJIGNvbnZlbnRpb25zOlxuXHQgKiAtIHB1YmxpYyBBUEkgbWV0aG9kcy9wcm9wZXJ0aWVzIGFyZSBwcmVmaWV4ZWQgd2l0aCBgJGBcblx0ICogLSBpbnRlcm5hbCBtZXRob2RzL3Byb3BlcnRpZXMgYXJlIHByZWZpeGVkIHdpdGggYF9gXG5cdCAqIC0gbm9uLXByZWZpeGVkIHByb3BlcnRpZXMgYXJlIGFzc3VtZWQgdG8gYmUgcHJveGllZCB1c2VyXG5cdCAqICAgZGF0YS5cblx0ICpcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHRmdW5jdGlvbiBWdWUgKG9wdGlvbnMpIHtcblx0ICB0aGlzLl9pbml0KG9wdGlvbnMpXG5cdH1cblxuXHQvKipcblx0ICogTWl4aW4gZ2xvYmFsIEFQSVxuXHQgKi9cblxuXHRleHRlbmQoVnVlLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpKVxuXG5cdC8qKlxuXHQgKiBWdWUgYW5kIGV2ZXJ5IGNvbnN0cnVjdG9yIHRoYXQgZXh0ZW5kcyBWdWUgaGFzIGFuXG5cdCAqIGFzc29jaWF0ZWQgb3B0aW9ucyBvYmplY3QsIHdoaWNoIGNhbiBiZSBhY2Nlc3NlZCBkdXJpbmdcblx0ICogY29tcGlsYXRpb24gc3RlcHMgYXMgYHRoaXMuY29uc3RydWN0b3Iub3B0aW9uc2AuXG5cdCAqXG5cdCAqIFRoZXNlIGNhbiBiZSBzZWVuIGFzIHRoZSBkZWZhdWx0IG9wdGlvbnMgb2YgZXZlcnlcblx0ICogVnVlIGluc3RhbmNlLlxuXHQgKi9cblxuXHRWdWUub3B0aW9ucyA9IHtcblx0ICBkaXJlY3RpdmVzICA6IF9fd2VicGFja19yZXF1aXJlX18oOCksXG5cdCAgZmlsdGVycyAgICAgOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpLFxuXHQgIHBhcnRpYWxzICAgIDoge30sXG5cdCAgdHJhbnNpdGlvbnMgOiB7fSxcblx0ICBjb21wb25lbnRzICA6IHt9XG5cdH1cblxuXHQvKipcblx0ICogQnVpbGQgdXAgdGhlIHByb3RvdHlwZVxuXHQgKi9cblxuXHR2YXIgcCA9IFZ1ZS5wcm90b3R5cGVcblxuXHQvKipcblx0ICogJGRhdGEgaGFzIGEgc2V0dGVyIHdoaWNoIGRvZXMgYSBidW5jaCBvZlxuXHQgKiB0ZWFyZG93bi9zZXR1cCB3b3JrXG5cdCAqL1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwLCAnJGRhdGEnLCB7XG5cdCAgZ2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICByZXR1cm4gdGhpcy5fZGF0YVxuXHQgIH0sXG5cdCAgc2V0OiBmdW5jdGlvbiAobmV3RGF0YSkge1xuXHQgICAgdGhpcy5fc2V0RGF0YShuZXdEYXRhKVxuXHQgIH1cblx0fSlcblxuXHQvKipcblx0ICogTWl4aW4gaW50ZXJuYWwgaW5zdGFuY2UgbWV0aG9kc1xuXHQgKi9cblxuXHRleHRlbmQocCwgX193ZWJwYWNrX3JlcXVpcmVfXygxMCkpXG5cdGV4dGVuZChwLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKSlcblx0ZXh0ZW5kKHAsIF9fd2VicGFja19yZXF1aXJlX18oMTIpKVxuXHRleHRlbmQocCwgX193ZWJwYWNrX3JlcXVpcmVfXygxMykpXG5cblx0LyoqXG5cdCAqIE1peGluIHB1YmxpYyBBUEkgbWV0aG9kc1xuXHQgKi9cblxuXHRleHRlbmQocCwgX193ZWJwYWNrX3JlcXVpcmVfXygzKSlcblx0ZXh0ZW5kKHAsIF9fd2VicGFja19yZXF1aXJlX18oNCkpXG5cdGV4dGVuZChwLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpKVxuXHRleHRlbmQocCwgX193ZWJwYWNrX3JlcXVpcmVfXyg2KSlcblx0ZXh0ZW5kKHAsIF9fd2VicGFja19yZXF1aXJlX18oNykpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBfLlZ1ZSA9IFZ1ZVxuXG4vKioqLyB9LFxuLyogMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIGxhbmcgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpXG5cdHZhciBleHRlbmQgPSBsYW5nLmV4dGVuZFxuXG5cdGV4dGVuZChleHBvcnRzLCBsYW5nKVxuXHRleHRlbmQoZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXygxNSkpXG5cdGV4dGVuZChleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KSlcblx0ZXh0ZW5kKGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18oMTcpKVxuXHRleHRlbmQoZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXygxOCkpXG5cbi8qKiovIH0sXG4vKiAyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIG1lcmdlT3B0aW9ucyA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpXG5cblx0LyoqXG5cdCAqIEV4cG9zZSB1c2VmdWwgaW50ZXJuYWxzXG5cdCAqL1xuXG5cdGV4cG9ydHMudXRpbCAgICAgICA9IF9cblx0ZXhwb3J0cy5uZXh0VGljayAgID0gXy5uZXh0VGlja1xuXHRleHBvcnRzLmNvbmZpZyAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuXG5cdC8qKlxuXHQgKiBFYWNoIGluc3RhbmNlIGNvbnN0cnVjdG9yLCBpbmNsdWRpbmcgVnVlLCBoYXMgYSB1bmlxdWVcblx0ICogY2lkLiBUaGlzIGVuYWJsZXMgdXMgdG8gY3JlYXRlIHdyYXBwZWQgXCJjaGlsZFxuXHQgKiBjb25zdHJ1Y3RvcnNcIiBmb3IgcHJvdG90eXBhbCBpbmhlcml0YW5jZSBhbmQgY2FjaGUgdGhlbS5cblx0ICovXG5cblx0ZXhwb3J0cy5jaWQgPSAwXG5cdHZhciBjaWQgPSAxXG5cblx0LyoqXG5cdCAqIENsYXNzIGluZWhyaXRhbmNlXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbmRPcHRpb25zXG5cdCAqL1xuXG5cdGV4cG9ydHMuZXh0ZW5kID0gZnVuY3Rpb24gKGV4dGVuZE9wdGlvbnMpIHtcblx0ICBleHRlbmRPcHRpb25zID0gZXh0ZW5kT3B0aW9ucyB8fCB7fVxuXHQgIHZhciBTdXBlciA9IHRoaXNcblx0ICB2YXIgU3ViID0gY3JlYXRlQ2xhc3MoZXh0ZW5kT3B0aW9ucy5uYW1lIHx8ICdWdWVDb21wb25lbnQnKVxuXHQgIFN1Yi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cGVyLnByb3RvdHlwZSlcblx0ICBTdWIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3ViXG5cdCAgU3ViLmNpZCA9IGNpZCsrXG5cdCAgU3ViLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoXG5cdCAgICBTdXBlci5vcHRpb25zLFxuXHQgICAgZXh0ZW5kT3B0aW9uc1xuXHQgIClcblx0ICBTdWJbJ3N1cGVyJ10gPSBTdXBlclxuXHQgIC8vIGFsbG93IGZ1cnRoZXIgZXh0ZW5zaW9uXG5cdCAgU3ViLmV4dGVuZCA9IFN1cGVyLmV4dGVuZFxuXHQgIC8vIGNyZWF0ZSBhc3NldCByZWdpc3RlcnMsIHNvIGV4dGVuZGVkIGNsYXNzZXNcblx0ICAvLyBjYW4gaGF2ZSB0aGVpciBwcml2YXRlIGFzc2V0cyB0b28uXG5cdCAgY3JlYXRlQXNzZXRSZWdpc3RlcnMoU3ViKVxuXHQgIHJldHVybiBTdWJcblx0fVxuXG5cdC8qKlxuXHQgKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHN1Yi1jbGFzcyBjb25zdHJ1Y3RvciB3aXRoIHRoZVxuXHQgKiBnaXZlbiBuYW1lLiBUaGlzIGdpdmVzIHVzIG11Y2ggbmljZXIgb3V0cHV0IHdoZW5cblx0ICogbG9nZ2luZyBpbnN0YW5jZXMgaW4gdGhlIGNvbnNvbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuXHQgKi9cblxuXHRmdW5jdGlvbiBjcmVhdGVDbGFzcyAobmFtZSkge1xuXHQgIHJldHVybiBuZXcgRnVuY3Rpb24oXG5cdCAgICAncmV0dXJuIGZ1bmN0aW9uICcgKyBfLmNhbWVsaXplKG5hbWUsIHRydWUpICtcblx0ICAgICcgKG9wdGlvbnMpIHsgdGhpcy5faW5pdChvcHRpb25zKSB9J1xuXHQgICkoKVxuXHR9XG5cblx0LyoqXG5cdCAqIFBsdWdpbiBzeXN0ZW1cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHBsdWdpblxuXHQgKi9cblxuXHRleHBvcnRzLnVzZSA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcblx0ICAvLyBhZGRpdGlvbmFsIHBhcmFtZXRlcnNcblx0ICB2YXIgYXJncyA9IF8udG9BcnJheShhcmd1bWVudHMsIDEpXG5cdCAgYXJncy51bnNoaWZ0KHRoaXMpXG5cdCAgaWYgKHR5cGVvZiBwbHVnaW4uaW5zdGFsbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgcGx1Z2luLmluc3RhbGwuYXBwbHkocGx1Z2luLCBhcmdzKVxuXHQgIH0gZWxzZSB7XG5cdCAgICBwbHVnaW4uYXBwbHkobnVsbCwgYXJncylcblx0ICB9XG5cdCAgcmV0dXJuIHRoaXNcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmUgYXNzZXQgcmVnaXN0cmF0aW9uIG1ldGhvZHMgb24gYSBjb25zdHJ1Y3Rvci5cblx0ICpcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gQ29uc3RydWN0b3Jcblx0ICovXG5cblx0dmFyIGFzc2V0VHlwZXMgPSBbXG5cdCAgJ2RpcmVjdGl2ZScsXG5cdCAgJ2ZpbHRlcicsXG5cdCAgJ3BhcnRpYWwnLFxuXHQgICd0cmFuc2l0aW9uJ1xuXHRdXG5cblx0ZnVuY3Rpb24gY3JlYXRlQXNzZXRSZWdpc3RlcnMgKENvbnN0cnVjdG9yKSB7XG5cblx0ICAvKiBBc3NldCByZWdpc3RyYXRpb24gbWV0aG9kcyBzaGFyZSB0aGUgc2FtZSBzaWduYXR1cmU6XG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcblx0ICAgKiBAcGFyYW0geyp9IGRlZmluaXRpb25cblx0ICAgKi9cblxuXHQgIGFzc2V0VHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuXHQgICAgQ29uc3RydWN0b3JbdHlwZV0gPSBmdW5jdGlvbiAoaWQsIGRlZmluaXRpb24pIHtcblx0ICAgICAgaWYgKCFkZWZpbml0aW9uKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc1t0eXBlICsgJ3MnXVtpZF1cblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICB0aGlzLm9wdGlvbnNbdHlwZSArICdzJ11baWRdID0gZGVmaW5pdGlvblxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSlcblxuXHQgIC8qKlxuXHQgICAqIENvbXBvbmVudCByZWdpc3RyYXRpb24gbmVlZHMgdG8gYXV0b21hdGljYWxseSBpbnZva2Vcblx0ICAgKiBWdWUuZXh0ZW5kIG9uIG9iamVjdCB2YWx1ZXMuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcblx0ICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gZGVmaW5pdGlvblxuXHQgICAqL1xuXG5cdCAgQ29uc3RydWN0b3IuY29tcG9uZW50ID0gZnVuY3Rpb24gKGlkLCBkZWZpbml0aW9uKSB7XG5cdCAgICBpZiAoIWRlZmluaXRpb24pIHtcblx0ICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jb21wb25lbnRzW2lkXVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgaWYgKF8uaXNQbGFpbk9iamVjdChkZWZpbml0aW9uKSkge1xuXHQgICAgICAgIGRlZmluaXRpb24ubmFtZSA9IGlkXG5cdCAgICAgICAgZGVmaW5pdGlvbiA9IF8uVnVlLmV4dGVuZChkZWZpbml0aW9uKVxuXHQgICAgICB9XG5cdCAgICAgIHRoaXMub3B0aW9ucy5jb21wb25lbnRzW2lkXSA9IGRlZmluaXRpb25cblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHRjcmVhdGVBc3NldFJlZ2lzdGVycyhleHBvcnRzKVxuXG4vKioqLyB9LFxuLyogMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBXYXRjaGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSlcblx0dmFyIFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQxKVxuXHR2YXIgdGV4dFBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNDIpXG5cdHZhciBkaXJQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQzKVxuXHR2YXIgZXhwUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NClcblx0dmFyIGZpbHRlclJFID0gL1tefF1cXHxbXnxdL1xuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIHZhbHVlIGZyb20gYW4gZXhwcmVzc2lvbiBvbiB0aGlzIHZtLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG5cdCAqIEByZXR1cm4geyp9XG5cdCAqL1xuXG5cdGV4cG9ydHMuJGdldCA9IGZ1bmN0aW9uIChleHApIHtcblx0ICB2YXIgcmVzID0gZXhwUGFyc2VyLnBhcnNlKGV4cClcblx0ICBpZiAocmVzKSB7XG5cdCAgICByZXR1cm4gcmVzLmdldC5jYWxsKHRoaXMsIHRoaXMpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgdmFsdWUgZnJvbSBhbiBleHByZXNzaW9uIG9uIHRoaXMgdm0uXG5cdCAqIFRoZSBleHByZXNzaW9uIG11c3QgYmUgYSB2YWxpZCBsZWZ0LWhhbmRcblx0ICogZXhwcmVzc2lvbiBpbiBhbiBhc3NpZ25tZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG5cdCAqIEBwYXJhbSB7Kn0gdmFsXG5cdCAqL1xuXG5cdGV4cG9ydHMuJHNldCA9IGZ1bmN0aW9uIChleHAsIHZhbCkge1xuXHQgIHZhciByZXMgPSBleHBQYXJzZXIucGFyc2UoZXhwLCB0cnVlKVxuXHQgIGlmIChyZXMgJiYgcmVzLnNldCkge1xuXHQgICAgcmVzLnNldC5jYWxsKHRoaXMsIHRoaXMsIHZhbClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQWRkIGEgcHJvcGVydHkgb24gdGhlIFZNXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICogQHBhcmFtIHsqfSB2YWxcblx0ICovXG5cblx0ZXhwb3J0cy4kYWRkID0gZnVuY3Rpb24gKGtleSwgdmFsKSB7XG5cdCAgdGhpcy5fZGF0YS4kYWRkKGtleSwgdmFsKVxuXHR9XG5cblx0LyoqXG5cdCAqIERlbGV0ZSBhIHByb3BlcnR5IG9uIHRoZSBWTVxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqL1xuXG5cdGV4cG9ydHMuJGRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcblx0ICB0aGlzLl9kYXRhLiRkZWxldGUoa2V5KVxuXHR9XG5cblx0LyoqXG5cdCAqIFdhdGNoIGFuIGV4cHJlc3Npb24sIHRyaWdnZXIgY2FsbGJhY2sgd2hlbiBpdHNcblx0ICogdmFsdWUgY2hhbmdlcy5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtkZWVwXVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtpbW1lZGlhdGVdXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufSAtIHVud2F0Y2hGblxuXHQgKi9cblxuXHRleHBvcnRzLiR3YXRjaCA9IGZ1bmN0aW9uIChleHAsIGNiLCBkZWVwLCBpbW1lZGlhdGUpIHtcblx0ICB2YXIgdm0gPSB0aGlzXG5cdCAgdmFyIGtleSA9IGRlZXAgPyBleHAgKyAnKipkZWVwKionIDogZXhwXG5cdCAgdmFyIHdhdGNoZXIgPSB2bS5fdXNlcldhdGNoZXJzW2tleV1cblx0ICB2YXIgd3JhcHBlZENiID0gZnVuY3Rpb24gKHZhbCwgb2xkVmFsKSB7XG5cdCAgICBjYi5jYWxsKHZtLCB2YWwsIG9sZFZhbClcblx0ICB9XG5cdCAgaWYgKCF3YXRjaGVyKSB7XG5cdCAgICB3YXRjaGVyID0gdm0uX3VzZXJXYXRjaGVyc1trZXldID1cblx0ICAgICAgbmV3IFdhdGNoZXIodm0sIGV4cCwgd3JhcHBlZENiLCBudWxsLCBmYWxzZSwgZGVlcClcblx0ICB9IGVsc2Uge1xuXHQgICAgd2F0Y2hlci5hZGRDYih3cmFwcGVkQ2IpXG5cdCAgfVxuXHQgIGlmIChpbW1lZGlhdGUpIHtcblx0ICAgIHdyYXBwZWRDYih3YXRjaGVyLnZhbHVlKVxuXHQgIH1cblx0ICByZXR1cm4gZnVuY3Rpb24gdW53YXRjaEZuICgpIHtcblx0ICAgIHdhdGNoZXIucmVtb3ZlQ2Iod3JhcHBlZENiKVxuXHQgICAgaWYgKCF3YXRjaGVyLmFjdGl2ZSkge1xuXHQgICAgICB2bS5fdXNlcldhdGNoZXJzW2tleV0gPSBudWxsXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEV2YWx1YXRlIGEgdGV4dCBkaXJlY3RpdmUsIGluY2x1ZGluZyBmaWx0ZXJzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdGV4cG9ydHMuJGV2YWwgPSBmdW5jdGlvbiAodGV4dCkge1xuXHQgIC8vIGNoZWNrIGZvciBmaWx0ZXJzLlxuXHQgIGlmIChmaWx0ZXJSRS50ZXN0KHRleHQpKSB7XG5cdCAgICB2YXIgZGlyID0gZGlyUGFyc2VyLnBhcnNlKHRleHQpWzBdXG5cdCAgICAvLyB0aGUgZmlsdGVyIHJlZ2V4IGNoZWNrIG1pZ2h0IGdpdmUgZmFsc2UgcG9zaXRpdmVcblx0ICAgIC8vIGZvciBwaXBlcyBpbnNpZGUgc3RyaW5ncywgc28gaXQncyBwb3NzaWJsZSB0aGF0XG5cdCAgICAvLyB3ZSBkb24ndCBnZXQgYW55IGZpbHRlcnMgaGVyZVxuXHQgICAgcmV0dXJuIGRpci5maWx0ZXJzXG5cdCAgICAgID8gXy5hcHBseUZpbHRlcnMoXG5cdCAgICAgICAgICB0aGlzLiRnZXQoZGlyLmV4cHJlc3Npb24pLFxuXHQgICAgICAgICAgXy5yZXNvbHZlRmlsdGVycyh0aGlzLCBkaXIuZmlsdGVycykucmVhZCxcblx0ICAgICAgICAgIHRoaXNcblx0ICAgICAgICApXG5cdCAgICAgIDogdGhpcy4kZ2V0KGRpci5leHByZXNzaW9uKVxuXHQgIH0gZWxzZSB7XG5cdCAgICAvLyBubyBmaWx0ZXJcblx0ICAgIHJldHVybiB0aGlzLiRnZXQodGV4dClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogSW50ZXJwb2xhdGUgYSBwaWVjZSBvZiB0ZW1wbGF0ZSB0ZXh0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdGV4cG9ydHMuJGludGVycG9sYXRlID0gZnVuY3Rpb24gKHRleHQpIHtcblx0ICB2YXIgdG9rZW5zID0gdGV4dFBhcnNlci5wYXJzZSh0ZXh0KVxuXHQgIHZhciB2bSA9IHRoaXNcblx0ICBpZiAodG9rZW5zKSB7XG5cdCAgICByZXR1cm4gdG9rZW5zLmxlbmd0aCA9PT0gMVxuXHQgICAgICA/IHZtLiRldmFsKHRva2Vuc1swXS52YWx1ZSlcblx0ICAgICAgOiB0b2tlbnMubWFwKGZ1bmN0aW9uICh0b2tlbikge1xuXHQgICAgICAgICAgcmV0dXJuIHRva2VuLnRhZ1xuXHQgICAgICAgICAgICA/IHZtLiRldmFsKHRva2VuLnZhbHVlKVxuXHQgICAgICAgICAgICA6IHRva2VuLnZhbHVlXG5cdCAgICAgICAgfSkuam9pbignJylcblx0ICB9IGVsc2Uge1xuXHQgICAgcmV0dXJuIHRleHRcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogTG9nIGluc3RhbmNlIGRhdGEgYXMgYSBwbGFpbiBKUyBvYmplY3Rcblx0ICogc28gdGhhdCBpdCBpcyBlYXNpZXIgdG8gaW5zcGVjdCBpbiBjb25zb2xlLlxuXHQgKiBUaGlzIG1ldGhvZCBhc3N1bWVzIGNvbnNvbGUgaXMgYXZhaWxhYmxlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gW3BhdGhdXG5cdCAqL1xuXG5cdGV4cG9ydHMuJGxvZyA9IGZ1bmN0aW9uIChwYXRoKSB7XG5cdCAgdmFyIGRhdGEgPSBwYXRoXG5cdCAgICA/IFBhdGguZ2V0KHRoaXMsIHBhdGgpXG5cdCAgICA6IHRoaXMuX2RhdGFcblx0ICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKSlcblx0fVxuXG4vKioqLyB9LFxuLyogNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciB0cmFuc2l0aW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NSlcblxuXHQvKipcblx0ICogQXBwZW5kIGluc3RhbmNlIHRvIHRhcmdldFxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpdGhUcmFuc2l0aW9uXSAtIGRlZmF1bHRzIHRvIHRydWVcblx0ICovXG5cblx0ZXhwb3J0cy4kYXBwZW5kVG8gPSBmdW5jdGlvbiAodGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24pIHtcblx0ICB0YXJnZXQgPSBxdWVyeSh0YXJnZXQpXG5cdCAgdmFyIHRhcmdldElzRGV0YWNoZWQgPSAhXy5pbkRvYyh0YXJnZXQpXG5cdCAgdmFyIG9wID0gd2l0aFRyYW5zaXRpb24gPT09IGZhbHNlIHx8IHRhcmdldElzRGV0YWNoZWRcblx0ICAgID8gYXBwZW5kXG5cdCAgICA6IHRyYW5zaXRpb24uYXBwZW5kXG5cdCAgaW5zZXJ0KHRoaXMsIHRhcmdldCwgb3AsIHRhcmdldElzRGV0YWNoZWQsIGNiKVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogUHJlcGVuZCBpbnN0YW5jZSB0byB0YXJnZXRcblx0ICpcblx0ICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFt3aXRoVHJhbnNpdGlvbl0gLSBkZWZhdWx0cyB0byB0cnVlXG5cdCAqL1xuXG5cdGV4cG9ydHMuJHByZXBlbmRUbyA9IGZ1bmN0aW9uICh0YXJnZXQsIGNiLCB3aXRoVHJhbnNpdGlvbikge1xuXHQgIHRhcmdldCA9IHF1ZXJ5KHRhcmdldClcblx0ICBpZiAodGFyZ2V0Lmhhc0NoaWxkTm9kZXMoKSkge1xuXHQgICAgdGhpcy4kYmVmb3JlKHRhcmdldC5maXJzdENoaWxkLCBjYiwgd2l0aFRyYW5zaXRpb24pXG5cdCAgfSBlbHNlIHtcblx0ICAgIHRoaXMuJGFwcGVuZFRvKHRhcmdldCwgY2IsIHdpdGhUcmFuc2l0aW9uKVxuXHQgIH1cblx0ICByZXR1cm4gdGhpc1xuXHR9XG5cblx0LyoqXG5cdCAqIEluc2VydCBpbnN0YW5jZSBiZWZvcmUgdGFyZ2V0XG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICogQHBhcmFtIHtCb29sZWFufSBbd2l0aFRyYW5zaXRpb25dIC0gZGVmYXVsdHMgdG8gdHJ1ZVxuXHQgKi9cblxuXHRleHBvcnRzLiRiZWZvcmUgPSBmdW5jdGlvbiAodGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24pIHtcblx0ICB0YXJnZXQgPSBxdWVyeSh0YXJnZXQpXG5cdCAgdmFyIHRhcmdldElzRGV0YWNoZWQgPSAhXy5pbkRvYyh0YXJnZXQpXG5cdCAgdmFyIG9wID0gd2l0aFRyYW5zaXRpb24gPT09IGZhbHNlIHx8IHRhcmdldElzRGV0YWNoZWRcblx0ICAgID8gYmVmb3JlXG5cdCAgICA6IHRyYW5zaXRpb24uYmVmb3JlXG5cdCAgaW5zZXJ0KHRoaXMsIHRhcmdldCwgb3AsIHRhcmdldElzRGV0YWNoZWQsIGNiKVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogSW5zZXJ0IGluc3RhbmNlIGFmdGVyIHRhcmdldFxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpdGhUcmFuc2l0aW9uXSAtIGRlZmF1bHRzIHRvIHRydWVcblx0ICovXG5cblx0ZXhwb3J0cy4kYWZ0ZXIgPSBmdW5jdGlvbiAodGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24pIHtcblx0ICB0YXJnZXQgPSBxdWVyeSh0YXJnZXQpXG5cdCAgaWYgKHRhcmdldC5uZXh0U2libGluZykge1xuXHQgICAgdGhpcy4kYmVmb3JlKHRhcmdldC5uZXh0U2libGluZywgY2IsIHdpdGhUcmFuc2l0aW9uKVxuXHQgIH0gZWxzZSB7XG5cdCAgICB0aGlzLiRhcHBlbmRUbyh0YXJnZXQucGFyZW50Tm9kZSwgY2IsIHdpdGhUcmFuc2l0aW9uKVxuXHQgIH1cblx0ICByZXR1cm4gdGhpc1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBpbnN0YW5jZSBmcm9tIERPTVxuXHQgKlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpdGhUcmFuc2l0aW9uXSAtIGRlZmF1bHRzIHRvIHRydWVcblx0ICovXG5cblx0ZXhwb3J0cy4kcmVtb3ZlID0gZnVuY3Rpb24gKGNiLCB3aXRoVHJhbnNpdGlvbikge1xuXHQgIHZhciBpbkRvYyA9IHRoaXMuX2lzQXR0YWNoZWQgJiYgXy5pbkRvYyh0aGlzLiRlbClcblx0ICAvLyBpZiB3ZSBhcmUgbm90IGluIGRvY3VtZW50LCBubyBuZWVkIHRvIGNoZWNrXG5cdCAgLy8gZm9yIHRyYW5zaXRpb25zXG5cdCAgaWYgKCFpbkRvYykgd2l0aFRyYW5zaXRpb24gPSBmYWxzZVxuXHQgIHZhciBvcFxuXHQgIHZhciBzZWxmID0gdGhpc1xuXHQgIHZhciByZWFsQ2IgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICBpZiAoaW5Eb2MpIHNlbGYuX2NhbGxIb29rKCdkZXRhY2hlZCcpXG5cdCAgICBpZiAoY2IpIGNiKClcblx0ICB9XG5cdCAgaWYgKFxuXHQgICAgdGhpcy5faXNCbG9jayAmJlxuXHQgICAgIXRoaXMuX2Jsb2NrRnJhZ21lbnQuaGFzQ2hpbGROb2RlcygpXG5cdCAgKSB7XG5cdCAgICBvcCA9IHdpdGhUcmFuc2l0aW9uID09PSBmYWxzZVxuXHQgICAgICA/IGFwcGVuZFxuXHQgICAgICA6IHRyYW5zaXRpb24ucmVtb3ZlVGhlbkFwcGVuZCBcblx0ICAgIGJsb2NrT3AodGhpcywgdGhpcy5fYmxvY2tGcmFnbWVudCwgb3AsIHJlYWxDYilcblx0ICB9IGVsc2Uge1xuXHQgICAgb3AgPSB3aXRoVHJhbnNpdGlvbiA9PT0gZmFsc2Vcblx0ICAgICAgPyByZW1vdmVcblx0ICAgICAgOiB0cmFuc2l0aW9uLnJlbW92ZVxuXHQgICAgb3AodGhpcy4kZWwsIHRoaXMsIHJlYWxDYilcblx0ICB9XG5cdCAgcmV0dXJuIHRoaXNcblx0fVxuXG5cdC8qKlxuXHQgKiBTaGFyZWQgRE9NIGluc2VydGlvbiBmdW5jdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IG9wXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gdGFyZ2V0SXNEZXRhY2hlZFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGluc2VydCAodm0sIHRhcmdldCwgb3AsIHRhcmdldElzRGV0YWNoZWQsIGNiKSB7XG5cdCAgdmFyIHNob3VsZENhbGxIb29rID1cblx0ICAgICF0YXJnZXRJc0RldGFjaGVkICYmXG5cdCAgICAhdm0uX2lzQXR0YWNoZWQgJiZcblx0ICAgICFfLmluRG9jKHZtLiRlbClcblx0ICBpZiAodm0uX2lzQmxvY2spIHtcblx0ICAgIGJsb2NrT3Aodm0sIHRhcmdldCwgb3AsIGNiKVxuXHQgIH0gZWxzZSB7XG5cdCAgICBvcCh2bS4kZWwsIHRhcmdldCwgdm0sIGNiKVxuXHQgIH1cblx0ICBpZiAoc2hvdWxkQ2FsbEhvb2spIHtcblx0ICAgIHZtLl9jYWxsSG9vaygnYXR0YWNoZWQnKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBFeGVjdXRlIGEgdHJhbnNpdGlvbiBvcGVyYXRpb24gb24gYSBibG9jayBpbnN0YW5jZSxcblx0ICogaXRlcmF0aW5nIHRocm91Z2ggYWxsIGl0cyBibG9jayBub2Rlcy5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IG9wXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGJsb2NrT3AgKHZtLCB0YXJnZXQsIG9wLCBjYikge1xuXHQgIHZhciBjdXJyZW50ID0gdm0uX2Jsb2NrU3RhcnRcblx0ICB2YXIgZW5kID0gdm0uX2Jsb2NrRW5kXG5cdCAgdmFyIG5leHRcblx0ICB3aGlsZSAobmV4dCAhPT0gZW5kKSB7XG5cdCAgICBuZXh0ID0gY3VycmVudC5uZXh0U2libGluZ1xuXHQgICAgb3AoY3VycmVudCwgdGFyZ2V0LCB2bSlcblx0ICAgIGN1cnJlbnQgPSBuZXh0XG5cdCAgfVxuXHQgIG9wKGVuZCwgdGFyZ2V0LCB2bSwgY2IpXG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgZm9yIHNlbGVjdG9yc1xuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fSBlbFxuXHQgKi9cblxuXHRmdW5jdGlvbiBxdWVyeSAoZWwpIHtcblx0ICByZXR1cm4gdHlwZW9mIGVsID09PSAnc3RyaW5nJ1xuXHQgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuXHQgICAgOiBlbFxuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGVuZCBvcGVyYXRpb24gdGhhdCB0YWtlcyBhIGNhbGxiYWNrLlxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IGVsXG5cdCAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7VnVlfSB2bSAtIHVudXNlZFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGFwcGVuZCAoZWwsIHRhcmdldCwgdm0sIGNiKSB7XG5cdCAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsKVxuXHQgIGlmIChjYikgY2IoKVxuXHR9XG5cblx0LyoqXG5cdCAqIEluc2VydEJlZm9yZSBvcGVyYXRpb24gdGhhdCB0YWtlcyBhIGNhbGxiYWNrLlxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IGVsXG5cdCAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7VnVlfSB2bSAtIHVudXNlZFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGJlZm9yZSAoZWwsIHRhcmdldCwgdm0sIGNiKSB7XG5cdCAgXy5iZWZvcmUoZWwsIHRhcmdldClcblx0ICBpZiAoY2IpIGNiKClcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgb3BlcmF0aW9uIHRoYXQgdGFrZXMgYSBjYWxsYmFjay5cblx0ICpcblx0ICogQHBhcmFtIHtOb2RlfSBlbFxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm0gLSB1bnVzZWRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuXHQgKi9cblxuXHRmdW5jdGlvbiByZW1vdmUgKGVsLCB2bSwgY2IpIHtcblx0ICBfLnJlbW92ZShlbClcblx0ICBpZiAoY2IpIGNiKClcblx0fVxuXG4vKioqLyB9LFxuLyogNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cblx0LyoqXG5cdCAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuXHQgKi9cblxuXHRleHBvcnRzLiRvbiA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcblx0ICAodGhpcy5fZXZlbnRzW2V2ZW50XSB8fCAodGhpcy5fZXZlbnRzW2V2ZW50XSA9IFtdKSlcblx0ICAgIC5wdXNoKGZuKVxuXHQgIG1vZGlmeUxpc3RlbmVyQ291bnQodGhpcywgZXZlbnQsIDEpXG5cdCAgcmV0dXJuIHRoaXNcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcblx0ICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG5cdCAqL1xuXG5cdGV4cG9ydHMuJG9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG5cdCAgdmFyIHNlbGYgPSB0aGlzXG5cdCAgZnVuY3Rpb24gb24gKCkge1xuXHQgICAgc2VsZi4kb2ZmKGV2ZW50LCBvbilcblx0ICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblx0ICB9XG5cdCAgb24uZm4gPSBmblxuXHQgIHRoaXMuJG9uKGV2ZW50LCBvbilcblx0ICByZXR1cm4gdGhpc1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXG5cdCAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cblx0ICovXG5cblx0ZXhwb3J0cy4kb2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuXHQgIHZhciBjYnNcblx0ICAvLyBhbGxcblx0ICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcblx0ICAgIGlmICh0aGlzLiRwYXJlbnQpIHtcblx0ICAgICAgZm9yIChldmVudCBpbiB0aGlzLl9ldmVudHMpIHtcblx0ICAgICAgICBjYnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG5cdCAgICAgICAgaWYgKGNicykge1xuXHQgICAgICAgICAgbW9kaWZ5TGlzdGVuZXJDb3VudCh0aGlzLCBldmVudCwgLWNicy5sZW5ndGgpXG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICB0aGlzLl9ldmVudHMgPSB7fVxuXHQgICAgcmV0dXJuIHRoaXNcblx0ICB9XG5cdCAgLy8gc3BlY2lmaWMgZXZlbnRcblx0ICBjYnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG5cdCAgaWYgKCFjYnMpIHtcblx0ICAgIHJldHVybiB0aGlzXG5cdCAgfVxuXHQgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdCAgICBtb2RpZnlMaXN0ZW5lckNvdW50KHRoaXMsIGV2ZW50LCAtY2JzLmxlbmd0aClcblx0ICAgIHRoaXMuX2V2ZW50c1tldmVudF0gPSBudWxsXG5cdCAgICByZXR1cm4gdGhpc1xuXHQgIH1cblx0ICAvLyBzcGVjaWZpYyBoYW5kbGVyXG5cdCAgdmFyIGNiXG5cdCAgdmFyIGkgPSBjYnMubGVuZ3RoXG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAgY2IgPSBjYnNbaV1cblx0ICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG5cdCAgICAgIG1vZGlmeUxpc3RlbmVyQ291bnQodGhpcywgZXZlbnQsIC0xKVxuXHQgICAgICBjYnMuc3BsaWNlKGksIDEpXG5cdCAgICAgIGJyZWFrXG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogVHJpZ2dlciBhbiBldmVudCBvbiBzZWxmLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcblx0ICovXG5cblx0ZXhwb3J0cy4kZW1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHQgIHRoaXMuX2V2ZW50Q2FuY2VsbGVkID0gZmFsc2Vcblx0ICB2YXIgY2JzID0gdGhpcy5fZXZlbnRzW2V2ZW50XVxuXHQgIGlmIChjYnMpIHtcblx0ICAgIC8vIGF2b2lkIGxlYWtpbmcgYXJndW1lbnRzOlxuXHQgICAgLy8gaHR0cDovL2pzcGVyZi5jb20vY2xvc3VyZS13aXRoLWFyZ3VtZW50c1xuXHQgICAgdmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMVxuXHQgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoaSlcblx0ICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV1cblx0ICAgIH1cblx0ICAgIGkgPSAwXG5cdCAgICBjYnMgPSBjYnMubGVuZ3RoID4gMVxuXHQgICAgICA/IF8udG9BcnJheShjYnMpXG5cdCAgICAgIDogY2JzXG5cdCAgICBmb3IgKHZhciBsID0gY2JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgICBpZiAoY2JzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpID09PSBmYWxzZSkge1xuXHQgICAgICAgIHRoaXMuX2V2ZW50Q2FuY2VsbGVkID0gdHJ1ZVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogUmVjdXJzaXZlbHkgYnJvYWRjYXN0IGFuIGV2ZW50IHRvIGFsbCBjaGlsZHJlbiBpbnN0YW5jZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgKiBAcGFyYW0gey4uLip9IGFkZGl0aW9uYWwgYXJndW1lbnRzXG5cdCAqL1xuXG5cdGV4cG9ydHMuJGJyb2FkY2FzdCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHQgIC8vIGlmIG5vIGNoaWxkIGhhcyByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LFxuXHQgIC8vIHRoZW4gdGhlcmUncyBubyBuZWVkIHRvIGJyb2FkY2FzdC5cblx0ICBpZiAoIXRoaXMuX2V2ZW50c0NvdW50W2V2ZW50XSkgcmV0dXJuXG5cdCAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW5cblx0ICBpZiAoY2hpbGRyZW4pIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG5cdCAgICAgIGNoaWxkLiRlbWl0LmFwcGx5KGNoaWxkLCBhcmd1bWVudHMpXG5cdCAgICAgIGlmICghY2hpbGQuX2V2ZW50Q2FuY2VsbGVkKSB7XG5cdCAgICAgICAgY2hpbGQuJGJyb2FkY2FzdC5hcHBseShjaGlsZCwgYXJndW1lbnRzKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogUmVjdXJzaXZlbHkgcHJvcGFnYXRlIGFuIGV2ZW50IHVwIHRoZSBwYXJlbnQgY2hhaW4uXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgKiBAcGFyYW0gey4uLip9IGFkZGl0aW9uYWwgYXJndW1lbnRzXG5cdCAqL1xuXG5cdGV4cG9ydHMuJGRpc3BhdGNoID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnRcblx0ICB3aGlsZSAocGFyZW50KSB7XG5cdCAgICBwYXJlbnQuJGVtaXQuYXBwbHkocGFyZW50LCBhcmd1bWVudHMpXG5cdCAgICBwYXJlbnQgPSBwYXJlbnQuX2V2ZW50Q2FuY2VsbGVkXG5cdCAgICAgID8gbnVsbFxuXHQgICAgICA6IHBhcmVudC4kcGFyZW50XG5cdCAgfVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogTW9kaWZ5IHRoZSBsaXN0ZW5lciBjb3VudHMgb24gYWxsIHBhcmVudHMuXG5cdCAqIFRoaXMgYm9va2tlZXBpbmcgYWxsb3dzICRicm9hZGNhc3QgdG8gcmV0dXJuIGVhcmx5IHdoZW5cblx0ICogbm8gY2hpbGQgaGFzIGxpc3RlbmVkIHRvIGEgY2VydGFpbiBldmVudC5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgKiBAcGFyYW0ge051bWJlcn0gY291bnRcblx0ICovXG5cblx0dmFyIGhvb2tSRSA9IC9eaG9vazovXG5cdGZ1bmN0aW9uIG1vZGlmeUxpc3RlbmVyQ291bnQgKHZtLCBldmVudCwgY291bnQpIHtcblx0ICB2YXIgcGFyZW50ID0gdm0uJHBhcmVudFxuXHQgIC8vIGhvb2tzIGRvIG5vdCBnZXQgYnJvYWRjYXN0ZWQgc28gbm8gbmVlZFxuXHQgIC8vIHRvIGRvIGJvb2trZWVwaW5nIGZvciB0aGVtXG5cdCAgaWYgKCFwYXJlbnQgfHwgIWNvdW50IHx8IGhvb2tSRS50ZXN0KGV2ZW50KSkgcmV0dXJuXG5cdCAgd2hpbGUgKHBhcmVudCkge1xuXHQgICAgcGFyZW50Ll9ldmVudHNDb3VudFtldmVudF0gPVxuXHQgICAgICAocGFyZW50Ll9ldmVudHNDb3VudFtldmVudF0gfHwgMCkgKyBjb3VudFxuXHQgICAgcGFyZW50ID0gcGFyZW50LiRwYXJlbnRcblx0ICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBjaGlsZCBpbnN0YW5jZSB0aGF0IHByb3RvdHlwYWxseSBpbmVocml0c1xuXHQgKiBkYXRhIG9uIHBhcmVudC4gVG8gYWNoaWV2ZSB0aGF0IHdlIGNyZWF0ZSBhbiBpbnRlcm1lZGlhdGVcblx0ICogY29uc3RydWN0b3Igd2l0aCBpdHMgcHJvdG90eXBlIHBvaW50aW5nIHRvIHBhcmVudC5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdHNcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW0Jhc2VDdG9yXVxuXHQgKiBAcmV0dXJuIHtWdWV9XG5cdCAqIEBwdWJsaWNcblx0ICovXG5cblx0ZXhwb3J0cy4kYWRkQ2hpbGQgPSBmdW5jdGlvbiAob3B0cywgQmFzZUN0b3IpIHtcblx0ICBCYXNlQ3RvciA9IEJhc2VDdG9yIHx8IF8uVnVlXG5cdCAgb3B0cyA9IG9wdHMgfHwge31cblx0ICB2YXIgcGFyZW50ID0gdGhpc1xuXHQgIHZhciBDaGlsZFZ1ZVxuXHQgIHZhciBpbmhlcml0ID0gb3B0cy5pbmhlcml0ICE9PSB1bmRlZmluZWRcblx0ICAgID8gb3B0cy5pbmhlcml0XG5cdCAgICA6IEJhc2VDdG9yLm9wdGlvbnMuaW5oZXJpdFxuXHQgIGlmIChpbmhlcml0KSB7XG5cdCAgICB2YXIgY3RvcnMgPSBwYXJlbnQuX2NoaWxkQ3RvcnNcblx0ICAgIGlmICghY3RvcnMpIHtcblx0ICAgICAgY3RvcnMgPSBwYXJlbnQuX2NoaWxkQ3RvcnMgPSB7fVxuXHQgICAgfVxuXHQgICAgQ2hpbGRWdWUgPSBjdG9yc1tCYXNlQ3Rvci5jaWRdXG5cdCAgICBpZiAoIUNoaWxkVnVlKSB7XG5cdCAgICAgIHZhciBvcHRpb25OYW1lID0gQmFzZUN0b3Iub3B0aW9ucy5uYW1lXG5cdCAgICAgIHZhciBjbGFzc05hbWUgPSBvcHRpb25OYW1lXG5cdCAgICAgICAgPyBfLmNhbWVsaXplKG9wdGlvbk5hbWUsIHRydWUpXG5cdCAgICAgICAgOiAnVnVlQ29tcG9uZW50J1xuXHQgICAgICBDaGlsZFZ1ZSA9IG5ldyBGdW5jdGlvbihcblx0ICAgICAgICAncmV0dXJuIGZ1bmN0aW9uICcgKyBjbGFzc05hbWUgKyAnIChvcHRpb25zKSB7JyArXG5cdCAgICAgICAgJ3RoaXMuY29uc3RydWN0b3IgPSAnICsgY2xhc3NOYW1lICsgJzsnICtcblx0ICAgICAgICAndGhpcy5faW5pdChvcHRpb25zKSB9J1xuXHQgICAgICApKClcblx0ICAgICAgQ2hpbGRWdWUub3B0aW9ucyA9IEJhc2VDdG9yLm9wdGlvbnNcblx0ICAgICAgQ2hpbGRWdWUucHJvdG90eXBlID0gdGhpc1xuXHQgICAgICBjdG9yc1tCYXNlQ3Rvci5jaWRdID0gQ2hpbGRWdWVcblx0ICAgIH1cblx0ICB9IGVsc2Uge1xuXHQgICAgQ2hpbGRWdWUgPSBCYXNlQ3RvclxuXHQgIH1cblx0ICBvcHRzLl9wYXJlbnQgPSBwYXJlbnRcblx0ICBvcHRzLl9yb290ID0gcGFyZW50LiRyb290XG5cdCAgdmFyIGNoaWxkID0gbmV3IENoaWxkVnVlKG9wdHMpXG5cdCAgaWYgKCF0aGlzLl9jaGlsZHJlbikge1xuXHQgICAgdGhpcy5fY2hpbGRyZW4gPSBbXVxuXHQgIH1cblx0ICB0aGlzLl9jaGlsZHJlbi5wdXNoKGNoaWxkKVxuXHQgIHJldHVybiBjaGlsZFxuXHR9XG5cbi8qKiovIH0sXG4vKiA3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGNvbXBpbGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ2KVxuXG5cdC8qKlxuXHQgKiBTZXQgaW5zdGFuY2UgdGFyZ2V0IGVsZW1lbnQgYW5kIGtpY2sgb2ZmIHRoZSBjb21waWxhdGlvblxuXHQgKiBwcm9jZXNzLiBUaGUgcGFzc2VkIGluIGBlbGAgY2FuIGJlIGEgc2VsZWN0b3Igc3RyaW5nLCBhblxuXHQgKiBleGlzdGluZyBFbGVtZW50LCBvciBhIERvY3VtZW50RnJhZ21lbnQgKGZvciBibG9ja1xuXHQgKiBpbnN0YW5jZXMpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudHxzdHJpbmd9IGVsXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cblx0ZXhwb3J0cy4kbW91bnQgPSBmdW5jdGlvbiAoZWwpIHtcblx0ICBpZiAodGhpcy5faXNDb21waWxlZCkge1xuXHQgICAgXy53YXJuKCckbW91bnQoKSBzaG91bGQgYmUgY2FsbGVkIG9ubHkgb25jZS4nKVxuXHQgICAgcmV0dXJuXG5cdCAgfVxuXHQgIGlmICghZWwpIHtcblx0ICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0ICB9IGVsc2UgaWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcblx0ICAgIHZhciBzZWxlY3RvciA9IGVsXG5cdCAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG5cdCAgICBpZiAoIWVsKSB7XG5cdCAgICAgIF8ud2FybignQ2Fubm90IGZpbmQgZWxlbWVudDogJyArIHNlbGVjdG9yKVxuXHQgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICB9XG5cdCAgdGhpcy5fY29tcGlsZShlbClcblx0ICB0aGlzLl9pc0NvbXBpbGVkID0gdHJ1ZVxuXHQgIHRoaXMuX2NhbGxIb29rKCdjb21waWxlZCcpXG5cdCAgaWYgKF8uaW5Eb2ModGhpcy4kZWwpKSB7XG5cdCAgICB0aGlzLl9jYWxsSG9vaygnYXR0YWNoZWQnKVxuXHQgICAgdGhpcy5faW5pdERPTUhvb2tzKClcblx0ICAgIHJlYWR5LmNhbGwodGhpcylcblx0ICB9IGVsc2Uge1xuXHQgICAgdGhpcy5faW5pdERPTUhvb2tzKClcblx0ICAgIHRoaXMuJG9uY2UoJ2hvb2s6YXR0YWNoZWQnLCByZWFkeSlcblx0ICB9XG5cdCAgcmV0dXJuIHRoaXNcblx0fVxuXG5cdC8qKlxuXHQgKiBNYXJrIGFuIGluc3RhbmNlIGFzIHJlYWR5LlxuXHQgKi9cblxuXHRmdW5jdGlvbiByZWFkeSAoKSB7XG5cdCAgdGhpcy5faXNBdHRhY2hlZCA9IHRydWVcblx0ICB0aGlzLl9pc1JlYWR5ID0gdHJ1ZVxuXHQgIHRoaXMuX2NhbGxIb29rKCdyZWFkeScpXG5cdH1cblxuXHQvKipcblx0ICogVGVhcmRvd24gYW4gaW5zdGFuY2UsIHVub2JzZXJ2ZXMgdGhlIGRhdGEsIHVuYmluZCBhbGwgdGhlXG5cdCAqIGRpcmVjdGl2ZXMsIHR1cm4gb2ZmIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzLCBldGMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVtb3ZlIC0gd2hldGhlciB0byByZW1vdmUgdGhlIERPTSBub2RlLlxuXHQgKiBAcHVibGljXG5cdCAqL1xuXG5cdGV4cG9ydHMuJGRlc3Ryb3kgPSBmdW5jdGlvbiAocmVtb3ZlKSB7XG5cdCAgaWYgKHRoaXMuX2lzQmVpbmdEZXN0cm95ZWQpIHtcblx0ICAgIHJldHVyblxuXHQgIH1cblx0ICB0aGlzLl9jYWxsSG9vaygnYmVmb3JlRGVzdHJveScpXG5cdCAgdGhpcy5faXNCZWluZ0Rlc3Ryb3llZCA9IHRydWVcblx0ICB2YXIgaVxuXHQgIC8vIHJlbW92ZSBzZWxmIGZyb20gcGFyZW50LiBvbmx5IG5lY2Vzc2FyeVxuXHQgIC8vIGlmIHBhcmVudCBpcyBub3QgYmVpbmcgZGVzdHJveWVkIGFzIHdlbGwuXG5cdCAgdmFyIHBhcmVudCA9IHRoaXMuJHBhcmVudFxuXHQgIGlmIChwYXJlbnQgJiYgIXBhcmVudC5faXNCZWluZ0Rlc3Ryb3llZCkge1xuXHQgICAgaSA9IHBhcmVudC5fY2hpbGRyZW4uaW5kZXhPZih0aGlzKVxuXHQgICAgcGFyZW50Ll9jaGlsZHJlbi5zcGxpY2UoaSwgMSlcblx0ICB9XG5cdCAgLy8gZGVzdHJveSBhbGwgY2hpbGRyZW4uXG5cdCAgaWYgKHRoaXMuX2NoaWxkcmVuKSB7XG5cdCAgICBpID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoXG5cdCAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgIHRoaXMuX2NoaWxkcmVuW2ldLiRkZXN0cm95KClcblx0ICAgIH1cblx0ICB9XG5cdCAgLy8gdGVhcmRvd24gYWxsIGRpcmVjdGl2ZXMuIHRoaXMgYWxzbyB0ZWFyc2Rvd24gYWxsXG5cdCAgLy8gZGlyZWN0aXZlLW93bmVkIHdhdGNoZXJzLlxuXHQgIGkgPSB0aGlzLl9kaXJlY3RpdmVzLmxlbmd0aFxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIHRoaXMuX2RpcmVjdGl2ZXNbaV0uX3RlYXJkb3duKClcblx0ICB9XG5cdCAgLy8gdGVhcmRvd24gYWxsIHVzZXIgd2F0Y2hlcnMuXG5cdCAgZm9yIChpIGluIHRoaXMuX3VzZXJXYXRjaGVycykge1xuXHQgICAgdGhpcy5fdXNlcldhdGNoZXJzW2ldLnRlYXJkb3duKClcblx0ICB9XG5cdCAgLy8gcmVtb3ZlIHJlZmVyZW5jZSB0byBzZWxmIG9uICRlbFxuXHQgIGlmICh0aGlzLiRlbCkge1xuXHQgICAgdGhpcy4kZWwuX192dWVfXyA9IG51bGxcblx0ICB9XG5cdCAgLy8gcmVtb3ZlIERPTSBlbGVtZW50XG5cdCAgdmFyIHNlbGYgPSB0aGlzXG5cdCAgaWYgKHJlbW92ZSAmJiB0aGlzLiRlbCkge1xuXHQgICAgdGhpcy4kcmVtb3ZlKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgY2xlYW51cChzZWxmKVxuXHQgICAgfSlcblx0ICB9IGVsc2Uge1xuXHQgICAgY2xlYW51cChzZWxmKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbGVhbiB1cCB0byBlbnN1cmUgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuXHQgKiBUaGlzIGlzIGNhbGxlZCBhZnRlciB0aGUgbGVhdmUgdHJhbnNpdGlvbiBpZiB0aGVyZVxuXHQgKiBpcyBhbnkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKi9cblxuXHRmdW5jdGlvbiBjbGVhbnVwICh2bSkge1xuXHQgIC8vIHJlbW92ZSByZWZlcmVuY2UgZnJvbSBkYXRhIG9iXG5cdCAgdm0uX2RhdGEuX19vYl9fLnJlbW92ZVZtKHZtKVxuXHQgIHZtLl9kYXRhID1cblx0ICB2bS5fd2F0Y2hlcnMgPVxuXHQgIHZtLl91c2VyV2F0Y2hlcnMgPVxuXHQgIHZtLl93YXRjaGVyTGlzdCA9XG5cdCAgdm0uJGVsID1cblx0ICB2bS4kcGFyZW50ID1cblx0ICB2bS4kcm9vdCA9XG5cdCAgdm0uX2NoaWxkcmVuID1cblx0ICB2bS5fYmluZGluZ3MgPVxuXHQgIHZtLl9kaXJlY3RpdmVzID0gbnVsbFxuXHQgIC8vIGNhbGwgdGhlIGxhc3QgaG9vay4uLlxuXHQgIHZtLl9pc0Rlc3Ryb3llZCA9IHRydWVcblx0ICB2bS5fY2FsbEhvb2soJ2Rlc3Ryb3llZCcpXG5cdCAgLy8gdHVybiBvZmYgYWxsIGluc3RhbmNlIGxpc3RlbmVycy5cblx0ICB2bS4kb2ZmKCkgXG5cdH1cblxuXHQvKipcblx0ICogUGFydGlhbGx5IGNvbXBpbGUgYSBwaWVjZSBvZiBET00gYW5kIHJldHVybiBhXG5cdCAqIGRlY29tcGlsZSBmdW5jdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9IGVsXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuXHQgKi9cblxuXHRleHBvcnRzLiRjb21waWxlID0gZnVuY3Rpb24gKGVsKSB7XG5cdCAgcmV0dXJuIGNvbXBpbGUoZWwsIHRoaXMuJG9wdGlvbnMsIHRydWUpKHRoaXMsIGVsKVxuXHR9XG5cbi8qKiovIH0sXG4vKiA4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvLyBtYW5pcHVsYXRpb24gZGlyZWN0aXZlc1xuXHRleHBvcnRzLnRleHQgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKVxuXHRleHBvcnRzLmh0bWwgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKVxuXHRleHBvcnRzLmF0dHIgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KVxuXHRleHBvcnRzLnNob3cgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KVxuXHRleHBvcnRzWydjbGFzcyddICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI2KVxuXHRleHBvcnRzLmVsICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI3KVxuXHRleHBvcnRzLnJlZiAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KVxuXHRleHBvcnRzLmNsb2FrICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI5KVxuXHRleHBvcnRzLnN0eWxlICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMwKVxuXHRleHBvcnRzLnBhcnRpYWwgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMxKVxuXHRleHBvcnRzLnRyYW5zaXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMyKVxuXG5cdC8vIGV2ZW50IGxpc3RlbmVyIGRpcmVjdGl2ZXNcblx0ZXhwb3J0cy5vbiAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMylcblx0ZXhwb3J0cy5tb2RlbCAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OClcblxuXHQvLyBjaGlsZCB2bSBkaXJlY3RpdmVzXG5cdGV4cG9ydHMuY29tcG9uZW50ICA9IF9fd2VicGFja19yZXF1aXJlX18oMzQpXG5cdGV4cG9ydHMucmVwZWF0ICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzUpXG5cdGV4cG9ydHNbJ2lmJ10gICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzYpXG5cdGV4cG9ydHNbJ3dpdGgnXSAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpXG5cbi8qKiovIH0sXG4vKiA5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblxuXHQvKipcblx0ICogU3RyaW5naWZ5IHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge051bWJlcn0gaW5kZW50XG5cdCAqL1xuXG5cdGV4cG9ydHMuanNvbiA9IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZW50KSB7XG5cdCAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlLCBudWxsLCBOdW1iZXIoaW5kZW50KSB8fCAyKVxuXHR9XG5cblx0LyoqXG5cdCAqICdhYmMnID0+ICdBYmMnXG5cdCAqL1xuXG5cdGV4cG9ydHMuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHJldHVybiAnJ1xuXHQgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKVxuXHQgIHJldHVybiB2YWx1ZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhbHVlLnNsaWNlKDEpXG5cdH1cblxuXHQvKipcblx0ICogJ2FiYycgPT4gJ0FCQydcblx0ICovXG5cblx0ZXhwb3J0cy51cHBlcmNhc2UgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICByZXR1cm4gKHZhbHVlIHx8IHZhbHVlID09PSAwKVxuXHQgICAgPyB2YWx1ZS50b1N0cmluZygpLnRvVXBwZXJDYXNlKClcblx0ICAgIDogJydcblx0fVxuXG5cdC8qKlxuXHQgKiAnQWJDJyA9PiAnYWJjJ1xuXHQgKi9cblxuXHRleHBvcnRzLmxvd2VyY2FzZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgIHJldHVybiAodmFsdWUgfHwgdmFsdWUgPT09IDApXG5cdCAgICA/IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKVxuXHQgICAgOiAnJ1xuXHR9XG5cblx0LyoqXG5cdCAqIDEyMzQ1ID0+ICQxMiwzNDUuMDBcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHNpZ25cblx0ICovXG5cblx0dmFyIGRpZ2l0c1JFID0gLyhcXGR7M30pKD89XFxkKS9nXG5cblx0ZXhwb3J0cy5jdXJyZW5jeSA9IGZ1bmN0aW9uICh2YWx1ZSwgc2lnbikge1xuXHQgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSlcblx0ICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSByZXR1cm4gJydcblx0ICBzaWduID0gc2lnbiB8fCAnJCdcblx0ICB2YXIgcyA9IE1hdGguZmxvb3IoTWF0aC5hYnModmFsdWUpKS50b1N0cmluZygpLFxuXHQgICAgaSA9IHMubGVuZ3RoICUgMyxcblx0ICAgIGggPSBpID4gMFxuXHQgICAgICA/IChzLnNsaWNlKDAsIGkpICsgKHMubGVuZ3RoID4gMyA/ICcsJyA6ICcnKSlcblx0ICAgICAgOiAnJyxcblx0ICAgIGYgPSAnLicgKyB2YWx1ZS50b0ZpeGVkKDIpLnNsaWNlKC0yKVxuXHQgIHJldHVybiAodmFsdWUgPCAwID8gJy0nIDogJycpICtcblx0ICAgIHNpZ24gKyBoICsgcy5zbGljZShpKS5yZXBsYWNlKGRpZ2l0c1JFLCAnJDEsJykgKyBmXG5cdH1cblxuXHQvKipcblx0ICogJ2l0ZW0nID0+ICdpdGVtcydcblx0ICpcblx0ICogQHBhcmFtc1xuXHQgKiAgYW4gYXJyYXkgb2Ygc3RyaW5ncyBjb3JyZXNwb25kaW5nIHRvXG5cdCAqICB0aGUgc2luZ2xlLCBkb3VibGUsIHRyaXBsZSAuLi4gZm9ybXMgb2YgdGhlIHdvcmQgdG9cblx0ICogIGJlIHBsdXJhbGl6ZWQuIFdoZW4gdGhlIG51bWJlciB0byBiZSBwbHVyYWxpemVkXG5cdCAqICBleGNlZWRzIHRoZSBsZW5ndGggb2YgdGhlIGFyZ3MsIGl0IHdpbGwgdXNlIHRoZSBsYXN0XG5cdCAqICBlbnRyeSBpbiB0aGUgYXJyYXkuXG5cdCAqXG5cdCAqICBlLmcuIFsnc2luZ2xlJywgJ2RvdWJsZScsICd0cmlwbGUnLCAnbXVsdGlwbGUnXVxuXHQgKi9cblxuXHRleHBvcnRzLnBsdXJhbGl6ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgIHZhciBhcmdzID0gXy50b0FycmF5KGFyZ3VtZW50cywgMSlcblx0ICByZXR1cm4gYXJncy5sZW5ndGggPiAxXG5cdCAgICA/IChhcmdzW3ZhbHVlICUgMTAgLSAxXSB8fCBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pXG5cdCAgICA6IChhcmdzWzBdICsgKHZhbHVlID09PSAxID8gJycgOiAncycpKVxuXHR9XG5cblx0LyoqXG5cdCAqIEEgc3BlY2lhbCBmaWx0ZXIgdGhhdCB0YWtlcyBhIGhhbmRsZXIgZnVuY3Rpb24sXG5cdCAqIHdyYXBzIGl0IHNvIGl0IG9ubHkgZ2V0cyB0cmlnZ2VyZWQgb24gc3BlY2lmaWNcblx0ICoga2V5cHJlc3Nlcy4gdi1vbiBvbmx5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqL1xuXG5cdHZhciBrZXlDb2RlcyA9IHtcblx0ICBlbnRlciAgICA6IDEzLFxuXHQgIHRhYiAgICAgIDogOSxcblx0ICAnZGVsZXRlJyA6IDQ2LFxuXHQgIHVwICAgICAgIDogMzgsXG5cdCAgbGVmdCAgICAgOiAzNyxcblx0ICByaWdodCAgICA6IDM5LFxuXHQgIGRvd24gICAgIDogNDAsXG5cdCAgZXNjICAgICAgOiAyN1xuXHR9XG5cblx0ZXhwb3J0cy5rZXkgPSBmdW5jdGlvbiAoaGFuZGxlciwga2V5KSB7XG5cdCAgaWYgKCFoYW5kbGVyKSByZXR1cm5cblx0ICB2YXIgY29kZSA9IGtleUNvZGVzW2tleV1cblx0ICBpZiAoIWNvZGUpIHtcblx0ICAgIGNvZGUgPSBwYXJzZUludChrZXksIDEwKVxuXHQgIH1cblx0ICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcblx0ICAgIGlmIChlLmtleUNvZGUgPT09IGNvZGUpIHtcblx0ICAgICAgcmV0dXJuIGhhbmRsZXIuY2FsbCh0aGlzLCBlKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBJbnN0YWxsIHNwZWNpYWwgYXJyYXkgZmlsdGVyc1xuXHQgKi9cblxuXHRfLmV4dGVuZChleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDM4KSlcblxuLyoqKi8gfSxcbi8qIDEwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgbWVyZ2VPcHRpb25zID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSlcblxuXHQvKipcblx0ICogVGhlIG1haW4gaW5pdCBzZXF1ZW5jZS4gVGhpcyBpcyBjYWxsZWQgZm9yIGV2ZXJ5XG5cdCAqIGluc3RhbmNlLCBpbmNsdWRpbmcgb25lcyB0aGF0IGFyZSBjcmVhdGVkIGZyb20gZXh0ZW5kZWRcblx0ICogY29uc3RydWN0b3JzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoaXMgb3B0aW9ucyBvYmplY3Qgc2hvdWxkIGJlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHJlc3VsdCBvZiBtZXJnaW5nIGNsYXNzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyBhbmQgdGhlIG9wdGlvbnMgcGFzc2VkXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gdG8gdGhlIGNvbnN0cnVjdG9yLlxuXHQgKi9cblxuXHRleHBvcnRzLl9pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuXHQgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cblx0ICB0aGlzLiRlbCAgICAgICAgICAgPSBudWxsXG5cdCAgdGhpcy4kcGFyZW50ICAgICAgID0gb3B0aW9ucy5fcGFyZW50XG5cdCAgdGhpcy4kcm9vdCAgICAgICAgID0gb3B0aW9ucy5fcm9vdCB8fCB0aGlzXG5cdCAgdGhpcy4kICAgICAgICAgICAgID0ge30gLy8gY2hpbGQgdm0gcmVmZXJlbmNlc1xuXHQgIHRoaXMuJCQgICAgICAgICAgICA9IHt9IC8vIGVsZW1lbnQgcmVmZXJlbmNlc1xuXHQgIHRoaXMuX3dhdGNoZXJMaXN0ICA9IFtdIC8vIGFsbCB3YXRjaGVycyBhcyBhbiBhcnJheVxuXHQgIHRoaXMuX3dhdGNoZXJzICAgICA9IHt9IC8vIGludGVybmFsIHdhdGNoZXJzIGFzIGEgaGFzaFxuXHQgIHRoaXMuX3VzZXJXYXRjaGVycyA9IHt9IC8vIHVzZXIgd2F0Y2hlcnMgYXMgYSBoYXNoXG5cdCAgdGhpcy5fZGlyZWN0aXZlcyAgID0gW10gLy8gYWxsIGRpcmVjdGl2ZXNcblxuXHQgIC8vIGEgZmxhZyB0byBhdm9pZCB0aGlzIGJlaW5nIG9ic2VydmVkXG5cdCAgdGhpcy5faXNWdWUgPSB0cnVlXG5cblx0ICAvLyBldmVudHMgYm9va2tlZXBpbmdcblx0ICB0aGlzLl9ldmVudHMgICAgICAgICA9IHt9ICAgIC8vIHJlZ2lzdGVyZWQgY2FsbGJhY2tzXG5cdCAgdGhpcy5fZXZlbnRzQ291bnQgICAgPSB7fSAgICAvLyBmb3IgJGJyb2FkY2FzdCBvcHRpbWl6YXRpb25cblx0ICB0aGlzLl9ldmVudENhbmNlbGxlZCA9IGZhbHNlIC8vIGZvciBldmVudCBjYW5jZWxsYXRpb25cblxuXHQgIC8vIGJsb2NrIGluc3RhbmNlIHByb3BlcnRpZXNcblx0ICB0aGlzLl9pc0Jsb2NrICAgICA9IGZhbHNlXG5cdCAgdGhpcy5fYmxvY2tTdGFydCAgPSAgICAgICAgICAvLyBAdHlwZSB7Q29tbWVudE5vZGV9XG5cdCAgdGhpcy5fYmxvY2tFbmQgICAgPSBudWxsICAgICAvLyBAdHlwZSB7Q29tbWVudE5vZGV9XG5cblx0ICAvLyBsaWZlY3ljbGUgc3RhdGVcblx0ICB0aGlzLl9pc0NvbXBpbGVkICA9XG5cdCAgdGhpcy5faXNEZXN0cm95ZWQgPVxuXHQgIHRoaXMuX2lzUmVhZHkgICAgID1cblx0ICB0aGlzLl9pc0F0dGFjaGVkICA9XG5cdCAgdGhpcy5faXNCZWluZ0Rlc3Ryb3llZCA9IGZhbHNlXG5cblx0ICAvLyBjaGlsZHJlblxuXHQgIHRoaXMuX2NoaWxkcmVuID0gICAgICAgICAvLyBAdHlwZSB7QXJyYXl9XG5cdCAgdGhpcy5fY2hpbGRDdG9ycyA9IG51bGwgIC8vIEB0eXBlIHtPYmplY3R9IC0gaGFzaCB0byBjYWNoZVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGlsZCBjb25zdHJ1Y3RvcnNcblxuXHQgIC8vIG1lcmdlIG9wdGlvbnMuXG5cdCAgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoXG5cdCAgICB0aGlzLmNvbnN0cnVjdG9yLm9wdGlvbnMsXG5cdCAgICBvcHRpb25zLFxuXHQgICAgdGhpc1xuXHQgIClcblxuXHQgIC8vIHNldCBkYXRhIGFmdGVyIG1lcmdlLlxuXHQgIHRoaXMuX2RhdGEgPSBvcHRpb25zLmRhdGEgfHwge31cblxuXHQgIC8vIGluaXRpYWxpemUgZGF0YSBvYnNlcnZhdGlvbiBhbmQgc2NvcGUgaW5oZXJpdGFuY2UuXG5cdCAgdGhpcy5faW5pdFNjb3BlKClcblxuXHQgIC8vIHNldHVwIGV2ZW50IHN5c3RlbSBhbmQgb3B0aW9uIGV2ZW50cy5cblx0ICB0aGlzLl9pbml0RXZlbnRzKClcblxuXHQgIC8vIGNhbGwgY3JlYXRlZCBob29rXG5cdCAgdGhpcy5fY2FsbEhvb2soJ2NyZWF0ZWQnKVxuXG5cdCAgLy8gaWYgYGVsYCBvcHRpb24gaXMgcGFzc2VkLCBzdGFydCBjb21waWxhdGlvbi5cblx0ICBpZiAob3B0aW9ucy5lbCkge1xuXHQgICAgdGhpcy4kbW91bnQob3B0aW9ucy5lbClcblx0ICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDExICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGluRG9jID0gXy5pbkRvY1xuXG5cdC8qKlxuXHQgKiBTZXR1cCB0aGUgaW5zdGFuY2UncyBvcHRpb24gZXZlbnRzICYgd2F0Y2hlcnMuXG5cdCAqIElmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZywgd2UgcHVsbCBpdCBmcm9tIHRoZVxuXHQgKiBpbnN0YW5jZSdzIG1ldGhvZHMgYnkgbmFtZS5cblx0ICovXG5cblx0ZXhwb3J0cy5faW5pdEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0ICB2YXIgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnNcblx0ICByZWdpc3RlckNhbGxiYWNrcyh0aGlzLCAnJG9uJywgb3B0aW9ucy5ldmVudHMpXG5cdCAgcmVnaXN0ZXJDYWxsYmFja3ModGhpcywgJyR3YXRjaCcsIG9wdGlvbnMud2F0Y2gpXG5cdH1cblxuXHQvKipcblx0ICogUmVnaXN0ZXIgY2FsbGJhY2tzIGZvciBvcHRpb24gZXZlbnRzIGFuZCB3YXRjaGVycy5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25cblx0ICogQHBhcmFtIHtPYmplY3R9IGhhc2hcblx0ICovXG5cblx0ZnVuY3Rpb24gcmVnaXN0ZXJDYWxsYmFja3MgKHZtLCBhY3Rpb24sIGhhc2gpIHtcblx0ICBpZiAoIWhhc2gpIHJldHVyblxuXHQgIHZhciBoYW5kbGVycywga2V5LCBpLCBqXG5cdCAgZm9yIChrZXkgaW4gaGFzaCkge1xuXHQgICAgaGFuZGxlcnMgPSBoYXNoW2tleV1cblx0ICAgIGlmIChfLmlzQXJyYXkoaGFuZGxlcnMpKSB7XG5cdCAgICAgIGZvciAoaSA9IDAsIGogPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0ICAgICAgICByZWdpc3Rlcih2bSwgYWN0aW9uLCBrZXksIGhhbmRsZXJzW2ldKVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICByZWdpc3Rlcih2bSwgYWN0aW9uLCBrZXksIGhhbmRsZXJzKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIZWxwZXIgdG8gcmVnaXN0ZXIgYW4gZXZlbnQvd2F0Y2ggY2FsbGJhY2suXG5cdCAqXG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICogQHBhcmFtIHsqfSBoYW5kbGVyXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHJlZ2lzdGVyICh2bSwgYWN0aW9uLCBrZXksIGhhbmRsZXIpIHtcblx0ICB2YXIgdHlwZSA9IHR5cGVvZiBoYW5kbGVyXG5cdCAgaWYgKHR5cGUgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgIHZtW2FjdGlvbl0oa2V5LCBoYW5kbGVyKVxuXHQgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcblx0ICAgIHZhciBtZXRob2RzID0gdm0uJG9wdGlvbnMubWV0aG9kc1xuXHQgICAgdmFyIG1ldGhvZCA9IG1ldGhvZHMgJiYgbWV0aG9kc1toYW5kbGVyXVxuXHQgICAgaWYgKG1ldGhvZCkge1xuXHQgICAgICB2bVthY3Rpb25dKGtleSwgbWV0aG9kKVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgXy53YXJuKFxuXHQgICAgICAgICdVbmtub3duIG1ldGhvZDogXCInICsgaGFuZGxlciArICdcIiB3aGVuICcgK1xuXHQgICAgICAgICdyZWdpc3RlcmluZyBjYWxsYmFjayBmb3IgJyArIGFjdGlvbiArXG5cdCAgICAgICAgJzogXCInICsga2V5ICsgJ1wiLidcblx0ICAgICAgKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXR1cCByZWN1cnNpdmUgYXR0YWNoZWQvZGV0YWNoZWQgY2FsbHNcblx0ICovXG5cblx0ZXhwb3J0cy5faW5pdERPTUhvb2tzID0gZnVuY3Rpb24gKCkge1xuXHQgIHRoaXMuJG9uKCdob29rOmF0dGFjaGVkJywgb25BdHRhY2hlZClcblx0ICB0aGlzLiRvbignaG9vazpkZXRhY2hlZCcsIG9uRGV0YWNoZWQpXG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGJhY2sgdG8gcmVjdXJzaXZlbHkgY2FsbCBhdHRhY2hlZCBob29rIG9uIGNoaWxkcmVuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIG9uQXR0YWNoZWQgKCkge1xuXHQgIHRoaXMuX2lzQXR0YWNoZWQgPSB0cnVlXG5cdCAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW5cblx0ICBpZiAoIWNoaWxkcmVuKSByZXR1cm5cblx0ICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV1cblx0ICAgIGlmICghY2hpbGQuX2lzQXR0YWNoZWQgJiYgaW5Eb2MoY2hpbGQuJGVsKSkge1xuXHQgICAgICBjaGlsZC5fY2FsbEhvb2soJ2F0dGFjaGVkJylcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGJhY2sgdG8gcmVjdXJzaXZlbHkgY2FsbCBkZXRhY2hlZCBob29rIG9uIGNoaWxkcmVuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIG9uRGV0YWNoZWQgKCkge1xuXHQgIHRoaXMuX2lzQXR0YWNoZWQgPSBmYWxzZVxuXHQgIHZhciBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuXG5cdCAgaWYgKCFjaGlsZHJlbikgcmV0dXJuXG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG5cdCAgICBpZiAoY2hpbGQuX2lzQXR0YWNoZWQgJiYgIWluRG9jKGNoaWxkLiRlbCkpIHtcblx0ICAgICAgY2hpbGQuX2NhbGxIb29rKCdkZXRhY2hlZCcpXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFRyaWdnZXIgYWxsIGhhbmRsZXJzIGZvciBhIGhvb2tcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGhvb2tcblx0ICovXG5cblx0ZXhwb3J0cy5fY2FsbEhvb2sgPSBmdW5jdGlvbiAoaG9vaykge1xuXHQgIHZhciBoYW5kbGVycyA9IHRoaXMuJG9wdGlvbnNbaG9va11cblx0ICBpZiAoaGFuZGxlcnMpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBqID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdCAgICAgIGhhbmRsZXJzW2ldLmNhbGwodGhpcylcblx0ICAgIH1cblx0ICB9XG5cdCAgdGhpcy4kZW1pdCgnaG9vazonICsgaG9vaylcblx0fVxuXG4vKioqLyB9LFxuLyogMTIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgT2JzZXJ2ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ5KVxuXHR2YXIgQmluZGluZyA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpXG5cblx0LyoqXG5cdCAqIFNldHVwIHRoZSBzY29wZSBvZiBhbiBpbnN0YW5jZSwgd2hpY2ggY29udGFpbnM6XG5cdCAqIC0gb2JzZXJ2ZWQgZGF0YVxuXHQgKiAtIGNvbXB1dGVkIHByb3BlcnRpZXNcblx0ICogLSB1c2VyIG1ldGhvZHNcblx0ICogLSBtZXRhIHByb3BlcnRpZXNcblx0ICovXG5cblx0ZXhwb3J0cy5faW5pdFNjb3BlID0gZnVuY3Rpb24gKCkge1xuXHQgIHRoaXMuX2luaXREYXRhKClcblx0ICB0aGlzLl9pbml0Q29tcHV0ZWQoKVxuXHQgIHRoaXMuX2luaXRNZXRob2RzKClcblx0ICB0aGlzLl9pbml0TWV0YSgpXG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgZGF0YS4gXG5cdCAqL1xuXG5cdGV4cG9ydHMuX2luaXREYXRhID0gZnVuY3Rpb24gKCkge1xuXHQgIC8vIHByb3h5IGRhdGEgb24gaW5zdGFuY2Vcblx0ICB2YXIgZGF0YSA9IHRoaXMuX2RhdGFcblx0ICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpXG5cdCAgdmFyIGkgPSBrZXlzLmxlbmd0aFxuXHQgIHZhciBrZXlcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICBrZXkgPSBrZXlzW2ldXG5cdCAgICBpZiAoIV8uaXNSZXNlcnZlZChrZXkpKSB7XG5cdCAgICAgIHRoaXMuX3Byb3h5KGtleSlcblx0ICAgIH1cblx0ICB9XG5cdCAgLy8gb2JzZXJ2ZSBkYXRhXG5cdCAgT2JzZXJ2ZXIuY3JlYXRlKGRhdGEpLmFkZFZtKHRoaXMpXG5cdH1cblxuXHQvKipcblx0ICogU3dhcCB0aGUgaXNudGFuY2UncyAkZGF0YS4gQ2FsbGVkIGluICRkYXRhJ3Mgc2V0dGVyLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gbmV3RGF0YVxuXHQgKi9cblxuXHRleHBvcnRzLl9zZXREYXRhID0gZnVuY3Rpb24gKG5ld0RhdGEpIHtcblx0ICBuZXdEYXRhID0gbmV3RGF0YSB8fCB7fVxuXHQgIHZhciBvbGREYXRhID0gdGhpcy5fZGF0YVxuXHQgIHRoaXMuX2RhdGEgPSBuZXdEYXRhXG5cdCAgdmFyIGtleXMsIGtleSwgaVxuXHQgIC8vIHVucHJveHkga2V5cyBub3QgcHJlc2VudCBpbiBuZXcgZGF0YVxuXHQgIGtleXMgPSBPYmplY3Qua2V5cyhvbGREYXRhKVxuXHQgIGkgPSBrZXlzLmxlbmd0aFxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIGtleSA9IGtleXNbaV1cblx0ICAgIGlmICghXy5pc1Jlc2VydmVkKGtleSkgJiYgIShrZXkgaW4gbmV3RGF0YSkpIHtcblx0ICAgICAgdGhpcy5fdW5wcm94eShrZXkpXG5cdCAgICB9XG5cdCAgfVxuXHQgIC8vIHByb3h5IGtleXMgbm90IGFscmVhZHkgcHJveGllZCxcblx0ICAvLyBhbmQgdHJpZ2dlciBjaGFuZ2UgZm9yIGNoYW5nZWQgdmFsdWVzXG5cdCAga2V5cyA9IE9iamVjdC5rZXlzKG5ld0RhdGEpXG5cdCAgaSA9IGtleXMubGVuZ3RoXG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAga2V5ID0ga2V5c1tpXVxuXHQgICAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KGtleSkgJiYgIV8uaXNSZXNlcnZlZChrZXkpKSB7XG5cdCAgICAgIC8vIG5ldyBwcm9wZXJ0eVxuXHQgICAgICB0aGlzLl9wcm94eShrZXkpXG5cdCAgICB9XG5cdCAgfVxuXHQgIG9sZERhdGEuX19vYl9fLnJlbW92ZVZtKHRoaXMpXG5cdCAgT2JzZXJ2ZXIuY3JlYXRlKG5ld0RhdGEpLmFkZFZtKHRoaXMpXG5cdCAgdGhpcy5fZGlnZXN0KClcblx0fVxuXG5cdC8qKlxuXHQgKiBQcm94eSBhIHByb3BlcnR5LCBzbyB0aGF0XG5cdCAqIHZtLnByb3AgPT09IHZtLl9kYXRhLnByb3Bcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleVxuXHQgKi9cblxuXHRleHBvcnRzLl9wcm94eSA9IGZ1bmN0aW9uIChrZXkpIHtcblx0ICAvLyBuZWVkIHRvIHN0b3JlIHJlZiB0byBzZWxmIGhlcmVcblx0ICAvLyBiZWNhdXNlIHRoZXNlIGdldHRlci9zZXR0ZXJzIG1pZ2h0XG5cdCAgLy8gYmUgY2FsbGVkIGJ5IGNoaWxkIGluc3RhbmNlcyFcblx0ICB2YXIgc2VsZiA9IHRoaXNcblx0ICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwga2V5LCB7XG5cdCAgICBjb25maWd1cmFibGU6IHRydWUsXG5cdCAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXHQgICAgZ2V0OiBmdW5jdGlvbiBwcm94eUdldHRlciAoKSB7XG5cdCAgICAgIHJldHVybiBzZWxmLl9kYXRhW2tleV1cblx0ICAgIH0sXG5cdCAgICBzZXQ6IGZ1bmN0aW9uIHByb3h5U2V0dGVyICh2YWwpIHtcblx0ICAgICAgc2VsZi5fZGF0YVtrZXldID0gdmFsXG5cdCAgICB9XG5cdCAgfSlcblx0fVxuXG5cdC8qKlxuXHQgKiBVbnByb3h5IGEgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICovXG5cblx0ZXhwb3J0cy5fdW5wcm94eSA9IGZ1bmN0aW9uIChrZXkpIHtcblx0ICBkZWxldGUgdGhpc1trZXldXG5cdH1cblxuXHQvKipcblx0ICogRm9yY2UgdXBkYXRlIG9uIGV2ZXJ5IHdhdGNoZXIgaW4gc2NvcGUuXG5cdCAqL1xuXG5cdGV4cG9ydHMuX2RpZ2VzdCA9IGZ1bmN0aW9uICgpIHtcblx0ICB2YXIgaSA9IHRoaXMuX3dhdGNoZXJMaXN0Lmxlbmd0aFxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIHRoaXMuX3dhdGNoZXJMaXN0W2ldLnVwZGF0ZSgpXG5cdCAgfVxuXHQgIHZhciBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuXG5cdCAgdmFyIGNoaWxkXG5cdCAgaWYgKGNoaWxkcmVuKSB7XG5cdCAgICBpID0gY2hpbGRyZW4ubGVuZ3RoXG5cdCAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgIGNoaWxkID0gY2hpbGRyZW5baV1cblx0ICAgICAgaWYgKGNoaWxkLiRvcHRpb25zLmluaGVyaXQpIHtcblx0ICAgICAgICBjaGlsZC5fZGlnZXN0KClcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXR1cCBjb21wdXRlZCBwcm9wZXJ0aWVzLiBUaGV5IGFyZSBlc3NlbnRpYWxseVxuXHQgKiBzcGVjaWFsIGdldHRlci9zZXR0ZXJzXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIG5vb3AgKCkge31cblx0ZXhwb3J0cy5faW5pdENvbXB1dGVkID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBjb21wdXRlZCA9IHRoaXMuJG9wdGlvbnMuY29tcHV0ZWRcblx0ICBpZiAoY29tcHV0ZWQpIHtcblx0ICAgIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuXHQgICAgICB2YXIgdXNlckRlZiA9IGNvbXB1dGVkW2tleV1cblx0ICAgICAgdmFyIGRlZiA9IHtcblx0ICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXHQgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHQgICAgICB9XG5cdCAgICAgIGlmICh0eXBlb2YgdXNlckRlZiA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIGRlZi5nZXQgPSBfLmJpbmQodXNlckRlZiwgdGhpcylcblx0ICAgICAgICBkZWYuc2V0ID0gbm9vcFxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIGRlZi5nZXQgPSB1c2VyRGVmLmdldFxuXHQgICAgICAgICAgPyBfLmJpbmQodXNlckRlZi5nZXQsIHRoaXMpXG5cdCAgICAgICAgICA6IG5vb3Bcblx0ICAgICAgICBkZWYuc2V0ID0gdXNlckRlZi5zZXRcblx0ICAgICAgICAgID8gXy5iaW5kKHVzZXJEZWYuc2V0LCB0aGlzKVxuXHQgICAgICAgICAgOiBub29wXG5cdCAgICAgIH1cblx0ICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwgZGVmKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXR1cCBpbnN0YW5jZSBtZXRob2RzLiBNZXRob2RzIG11c3QgYmUgYm91bmQgdG8gdGhlXG5cdCAqIGluc3RhbmNlIHNpbmNlIHRoZXkgbWlnaHQgYmUgY2FsbGVkIGJ5IGNoaWxkcmVuXG5cdCAqIGluaGVyaXRpbmcgdGhlbS5cblx0ICovXG5cblx0ZXhwb3J0cy5faW5pdE1ldGhvZHMgPSBmdW5jdGlvbiAoKSB7XG5cdCAgdmFyIG1ldGhvZHMgPSB0aGlzLiRvcHRpb25zLm1ldGhvZHNcblx0ICBpZiAobWV0aG9kcykge1xuXHQgICAgZm9yICh2YXIga2V5IGluIG1ldGhvZHMpIHtcblx0ICAgICAgdGhpc1trZXldID0gXy5iaW5kKG1ldGhvZHNba2V5XSwgdGhpcylcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSBtZXRhIGluZm9ybWF0aW9uIGxpa2UgJGluZGV4LCAka2V5ICYgJHZhbHVlLlxuXHQgKi9cblxuXHRleHBvcnRzLl9pbml0TWV0YSA9IGZ1bmN0aW9uICgpIHtcblx0ICB2YXIgbWV0YXMgPSB0aGlzLiRvcHRpb25zLl9tZXRhXG5cdCAgaWYgKG1ldGFzKSB7XG5cdCAgICBmb3IgKHZhciBrZXkgaW4gbWV0YXMpIHtcblx0ICAgICAgdGhpcy5fZGVmaW5lTWV0YShrZXksIG1ldGFzW2tleV0pXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZSBhIG1ldGEgcHJvcGVydHksIGUuZyAkaW5kZXgsICRrZXksICR2YWx1ZVxuXHQgKiB3aGljaCBvbmx5IGV4aXN0cyBvbiB0aGUgdm0gaW5zdGFuY2UgYnV0IG5vdCBpbiAkZGF0YS5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleVxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAqL1xuXG5cdGV4cG9ydHMuX2RlZmluZU1ldGEgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHQgIHZhciBiaW5kaW5nID0gbmV3IEJpbmRpbmcoKVxuXHQgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIHtcblx0ICAgIGVudW1lcmFibGU6IHRydWUsXG5cdCAgICBjb25maWd1cmFibGU6IHRydWUsXG5cdCAgICBnZXQ6IGZ1bmN0aW9uIG1ldGFHZXR0ZXIgKCkge1xuXHQgICAgICBpZiAoT2JzZXJ2ZXIudGFyZ2V0KSB7XG5cdCAgICAgICAgT2JzZXJ2ZXIudGFyZ2V0LmFkZERlcChiaW5kaW5nKVxuXHQgICAgICB9XG5cdCAgICAgIHJldHVybiB2YWx1ZVxuXHQgICAgfSxcblx0ICAgIHNldDogZnVuY3Rpb24gbWV0YVNldHRlciAodmFsKSB7XG5cdCAgICAgIGlmICh2YWwgIT09IHZhbHVlKSB7XG5cdCAgICAgICAgdmFsdWUgPSB2YWxcblx0ICAgICAgICBiaW5kaW5nLm5vdGlmeSgpXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9KVxuXHR9XG5cbi8qKiovIH0sXG4vKiAxMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBEaXJlY3RpdmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKVxuXHR2YXIgY29tcGlsZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDYpXG5cdHZhciB0cmFuc2NsdWRlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NylcblxuXHQvKipcblx0ICogVHJhbnNjbHVkZSwgY29tcGlsZSBhbmQgbGluayBlbGVtZW50LlxuXHQgKlxuXHQgKiBJZiBhIHByZS1jb21waWxlZCBsaW5rZXIgaXMgYXZhaWxhYmxlLCB0aGF0IG1lYW5zIHRoZVxuXHQgKiBwYXNzZWQgaW4gZWxlbWVudCB3aWxsIGJlIHByZS10cmFuc2NsdWRlZCBhbmQgY29tcGlsZWRcblx0ICogYXMgd2VsbCAtIGFsbCB3ZSBuZWVkIHRvIGRvIGlzIHRvIGNhbGwgdGhlIGxpbmtlci5cblx0ICpcblx0ICogT3RoZXJ3aXNlIHdlIG5lZWQgdG8gY2FsbCB0cmFuc2NsdWRlL2NvbXBpbGUvbGluayBoZXJlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEByZXR1cm4ge0VsZW1lbnR9XG5cdCAqL1xuXG5cdGV4cG9ydHMuX2NvbXBpbGUgPSBmdW5jdGlvbiAoZWwpIHtcblx0ICB2YXIgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnNcblx0ICBpZiAob3B0aW9ucy5fbGlua2VyKSB7XG5cdCAgICB0aGlzLl9pbml0RWxlbWVudChlbClcblx0ICAgIG9wdGlvbnMuX2xpbmtlcih0aGlzLCBlbClcblx0ICB9IGVsc2Uge1xuXHQgICAgdmFyIHJhdyA9IGVsXG5cdCAgICBlbCA9IHRyYW5zY2x1ZGUoZWwsIG9wdGlvbnMpXG5cdCAgICB0aGlzLl9pbml0RWxlbWVudChlbClcblx0ICAgIHZhciBsaW5rZXIgPSBjb21waWxlKGVsLCBvcHRpb25zKVxuXHQgICAgbGlua2VyKHRoaXMsIGVsKVxuXHQgICAgaWYgKG9wdGlvbnMucmVwbGFjZSkge1xuXHQgICAgICBfLnJlcGxhY2UocmF3LCBlbClcblx0ICAgIH1cblx0ICB9XG5cdCAgcmV0dXJuIGVsXG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSBpbnN0YW5jZSBlbGVtZW50LiBDYWxsZWQgaW4gdGhlIHB1YmxpY1xuXHQgKiAkbW91bnQoKSBtZXRob2QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICovXG5cblx0ZXhwb3J0cy5faW5pdEVsZW1lbnQgPSBmdW5jdGlvbiAoZWwpIHtcblx0ICBpZiAoZWwgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG5cdCAgICB0aGlzLl9pc0Jsb2NrID0gdHJ1ZVxuXHQgICAgdGhpcy4kZWwgPSB0aGlzLl9ibG9ja1N0YXJ0ID0gZWwuZmlyc3RDaGlsZFxuXHQgICAgdGhpcy5fYmxvY2tFbmQgPSBlbC5sYXN0Q2hpbGRcblx0ICAgIHRoaXMuX2Jsb2NrRnJhZ21lbnQgPSBlbFxuXHQgIH0gZWxzZSB7XG5cdCAgICB0aGlzLiRlbCA9IGVsXG5cdCAgfVxuXHQgIHRoaXMuJGVsLl9fdnVlX18gPSB0aGlzXG5cdCAgdGhpcy5fY2FsbEhvb2soJ2JlZm9yZUNvbXBpbGUnKVxuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbmQgYmluZCBhIGRpcmVjdGl2ZSB0byBhbiBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIGRpcmVjdGl2ZSBuYW1lXG5cdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAgIC0gdGFyZ2V0IG5vZGVcblx0ICogQHBhcmFtIHtPYmplY3R9IGRlc2MgLSBwYXJzZWQgZGlyZWN0aXZlIGRlc2NyaXB0b3Jcblx0ICogQHBhcmFtIHtPYmplY3R9IGRlZiAgLSBkaXJlY3RpdmUgZGVmaW5pdGlvbiBvYmplY3Rcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW2xpbmtlcl0gLSBwcmUtY29tcGlsZWQgbGlua2VyIGZuXG5cdCAqL1xuXG5cdGV4cG9ydHMuX2JpbmREaXIgPSBmdW5jdGlvbiAobmFtZSwgbm9kZSwgZGVzYywgZGVmLCBsaW5rZXIpIHtcblx0ICB0aGlzLl9kaXJlY3RpdmVzLnB1c2goXG5cdCAgICBuZXcgRGlyZWN0aXZlKG5hbWUsIG5vZGUsIHRoaXMsIGRlc2MsIGRlZiwgbGlua2VyKVxuXHQgIClcblx0fVxuXG4vKioqLyB9LFxuLyogMTQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qKlxuXHQgKiBDaGVjayBpcyBhIHN0cmluZyBzdGFydHMgd2l0aCAkIG9yIF9cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0clxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblxuXHRleHBvcnRzLmlzUmVzZXJ2ZWQgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdCAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdCgwKVxuXHQgIHJldHVybiBjID09PSAweDI0IHx8IGMgPT09IDB4NUZcblx0fVxuXG5cdC8qKlxuXHQgKiBHdWFyZCB0ZXh0IG91dHB1dCwgbWFrZSBzdXJlIHVuZGVmaW5lZCBvdXRwdXRzXG5cdCAqIGVtcHR5IHN0cmluZ1xuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAqIEByZXR1cm4ge1N0cmluZ31cblx0ICovXG5cblx0ZXhwb3J0cy50b1N0cmluZyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgIHJldHVybiB2YWx1ZSA9PSBudWxsXG5cdCAgICA/ICcnXG5cdCAgICA6IHZhbHVlLnRvU3RyaW5nKClcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayBhbmQgY29udmVydCBwb3NzaWJsZSBudW1lcmljIG51bWJlcnMgYmVmb3JlXG5cdCAqIHNldHRpbmcgYmFjayB0byBkYXRhXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcblx0ICogQHJldHVybiB7KnxOdW1iZXJ9XG5cdCAqL1xuXG5cdGV4cG9ydHMudG9OdW1iZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICByZXR1cm4gKFxuXHQgICAgaXNOYU4odmFsdWUpIHx8XG5cdCAgICB2YWx1ZSA9PT0gbnVsbCB8fFxuXHQgICAgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbidcblx0ICApID8gdmFsdWVcblx0ICAgIDogTnVtYmVyKHZhbHVlKVxuXHR9XG5cblx0LyoqXG5cdCAqIFN0cmlwIHF1b3RlcyBmcm9tIGEgc3RyaW5nXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcblx0ICogQHJldHVybiB7U3RyaW5nIHwgZmFsc2V9XG5cdCAqL1xuXG5cdGV4cG9ydHMuc3RyaXBRdW90ZXMgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdCAgdmFyIGEgPSBzdHIuY2hhckNvZGVBdCgwKVxuXHQgIHZhciBiID0gc3RyLmNoYXJDb2RlQXQoc3RyLmxlbmd0aCAtIDEpXG5cdCAgcmV0dXJuIGEgPT09IGIgJiYgKGEgPT09IDB4MjIgfHwgYSA9PT0gMHgyNylcblx0ICAgID8gc3RyLnNsaWNlKDEsIC0xKVxuXHQgICAgOiBmYWxzZVxuXHR9XG5cblx0LyoqXG5cdCAqIENhbWVsaXplIGEgaHlwaGVuLWRlbG1pdGVkIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0clxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdHZhciBjYW1lbFJFID0gL1stX10oXFx3KS9nXG5cdHZhciBjYXBpdGFsQ2FtZWxSRSA9IC8oPzpefFstX10pKFxcdykvZ1xuXG5cdGV4cG9ydHMuY2FtZWxpemUgPSBmdW5jdGlvbiAoc3RyLCBjYXApIHtcblx0ICB2YXIgUkUgPSBjYXAgPyBjYXBpdGFsQ2FtZWxSRSA6IGNhbWVsUkVcblx0ICByZXR1cm4gc3RyLnJlcGxhY2UoUkUsIGZ1bmN0aW9uIChfLCBjKSB7XG5cdCAgICByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UgKCkgOiAnJztcblx0ICB9KVxuXHR9XG5cblx0LyoqXG5cdCAqIFNpbXBsZSBiaW5kLCBmYXN0ZXIgdGhhbiBuYXRpdmVcblx0ICpcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cblx0ICogQHBhcmFtIHtPYmplY3R9IGN0eFxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn1cblx0ICovXG5cblx0ZXhwb3J0cy5iaW5kID0gZnVuY3Rpb24gKGZuLCBjdHgpIHtcblx0ICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXHQgICAgcmV0dXJuIGZuLmFwcGx5KGN0eCwgYXJndW1lbnRzKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0IGFuIEFycmF5LWxpa2Ugb2JqZWN0IHRvIGEgcmVhbCBBcnJheS5cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheS1saWtlfSBsaXN0XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbc3RhcnRdIC0gc3RhcnQgaW5kZXhcblx0ICogQHJldHVybiB7QXJyYXl9XG5cdCAqL1xuXG5cdGV4cG9ydHMudG9BcnJheSA9IGZ1bmN0aW9uIChsaXN0LCBzdGFydCkge1xuXHQgIHN0YXJ0ID0gc3RhcnQgfHwgMFxuXHQgIHZhciBpID0gbGlzdC5sZW5ndGggLSBzdGFydFxuXHQgIHZhciByZXQgPSBuZXcgQXJyYXkoaSlcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICByZXRbaV0gPSBsaXN0W2kgKyBzdGFydF1cblx0ICB9XG5cdCAgcmV0dXJuIHJldFxuXHR9XG5cblx0LyoqXG5cdCAqIE1peCBwcm9wZXJ0aWVzIGludG8gdGFyZ2V0IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHRvXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBmcm9tXG5cdCAqL1xuXG5cdGV4cG9ydHMuZXh0ZW5kID0gZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG5cdCAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0ICAgIHRvW2tleV0gPSBmcm9tW2tleV1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogUXVpY2sgb2JqZWN0IGNoZWNrIC0gdGhpcyBpcyBwcmltYXJpbHkgdXNlZCB0byB0ZWxsXG5cdCAqIE9iamVjdHMgZnJvbSBwcmltaXRpdmUgdmFsdWVzIHdoZW4gd2Uga25vdyB0aGUgdmFsdWVcblx0ICogaXMgYSBKU09OLWNvbXBsaWFudCB0eXBlLlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IG9ialxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblxuXHRleHBvcnRzLmlzT2JqZWN0ID0gZnVuY3Rpb24gKG9iaikge1xuXHQgIHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcblx0fVxuXG5cdC8qKlxuXHQgKiBTdHJpY3Qgb2JqZWN0IHR5cGUgY2hlY2suIE9ubHkgcmV0dXJucyB0cnVlXG5cdCAqIGZvciBwbGFpbiBKYXZhU2NyaXB0IG9iamVjdHMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gb2JqXG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCAqL1xuXG5cdHZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblx0ZXhwb3J0cy5pc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gKG9iaikge1xuXHQgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE9iamVjdF0nXG5cdH1cblxuXHQvKipcblx0ICogQXJyYXkgdHlwZSBjaGVjay5cblx0ICpcblx0ICogQHBhcmFtIHsqfSBvYmpcblx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0ICovXG5cblx0ZXhwb3J0cy5pc0FycmF5ID0gZnVuY3Rpb24gKG9iaikge1xuXHQgIHJldHVybiBBcnJheS5pc0FycmF5KG9iailcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmUgYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eVxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICogQHBhcmFtIHsqfSB2YWxcblx0ICogQHBhcmFtIHtCb29sZWFufSBbZW51bWVyYWJsZV1cblx0ICovXG5cblx0ZXhwb3J0cy5kZWZpbmUgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbCwgZW51bWVyYWJsZSkge1xuXHQgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuXHQgICAgdmFsdWUgICAgICAgIDogdmFsLFxuXHQgICAgZW51bWVyYWJsZSAgIDogISFlbnVtZXJhYmxlLFxuXHQgICAgd3JpdGFibGUgICAgIDogdHJ1ZSxcblx0ICAgIGNvbmZpZ3VyYWJsZSA6IHRydWVcblx0ICB9KVxuXHR9XG5cbi8qKiovIH0sXG4vKiAxNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyoqXG5cdCAqIENhbiB3ZSB1c2UgX19wcm90b19fP1xuXHQgKlxuXHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0ICovXG5cblx0ZXhwb3J0cy5oYXNQcm90byA9ICdfX3Byb3RvX18nIGluIHt9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3ZSBoYXZlIGEgd2luZG93XG5cdCAqXG5cdCAqIEB0eXBlIHtCb29sZWFufVxuXHQgKi9cblxuXHR2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cdHZhciBpbkJyb3dzZXIgPSBleHBvcnRzLmluQnJvd3NlciA9XG5cdCAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcblx0ICB0b1N0cmluZy5jYWxsKHdpbmRvdykgIT09ICdbb2JqZWN0IE9iamVjdF0nXG5cblx0LyoqXG5cdCAqIERlZmVyIGEgdGFzayB0byB0aGUgc3RhcnQgb2YgdGhlIG5leHQgZXZlbnQgbG9vcFxuXHQgKlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuXHQgKiBAcGFyYW0ge09iamVjdH0gY3R4XG5cdCAqL1xuXG5cdHZhciBkZWZlciA9IGluQnJvd3NlclxuXHQgID8gKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0ICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0ICAgIHNldFRpbWVvdXQpXG5cdCAgOiBzZXRUaW1lb3V0XG5cblx0ZXhwb3J0cy5uZXh0VGljayA9IGZ1bmN0aW9uIChjYiwgY3R4KSB7XG5cdCAgaWYgKGN0eCkge1xuXHQgICAgZGVmZXIoZnVuY3Rpb24gKCkgeyBjYi5jYWxsKGN0eCkgfSwgMClcblx0ICB9IGVsc2Uge1xuXHQgICAgZGVmZXIoY2IsIDApXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIERldGVjdCBpZiB3ZSBhcmUgaW4gSUU5Li4uXG5cdCAqXG5cdCAqIEB0eXBlIHtCb29sZWFufVxuXHQgKi9cblxuXHRleHBvcnRzLmlzSUU5ID1cblx0ICBpbkJyb3dzZXIgJiZcblx0ICBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ01TSUUgOS4wJykgPiAwXG5cblx0LyoqXG5cdCAqIFNuaWZmIHRyYW5zaXRpb24vYW5pbWF0aW9uIGV2ZW50c1xuXHQgKi9cblxuXHRpZiAoaW5Ccm93c2VyICYmICFleHBvcnRzLmlzSUU5KSB7XG5cdCAgdmFyIGlzV2Via2l0VHJhbnMgPVxuXHQgICAgd2luZG93Lm9udHJhbnNpdGlvbmVuZCA9PT0gdW5kZWZpbmVkICYmXG5cdCAgICB3aW5kb3cub253ZWJraXR0cmFuc2l0aW9uZW5kICE9PSB1bmRlZmluZWRcblx0ICB2YXIgaXNXZWJraXRBbmltID1cblx0ICAgIHdpbmRvdy5vbmFuaW1hdGlvbmVuZCA9PT0gdW5kZWZpbmVkICYmXG5cdCAgICB3aW5kb3cub253ZWJraXRhbmltYXRpb25lbmQgIT09IHVuZGVmaW5lZFxuXHQgIGV4cG9ydHMudHJhbnNpdGlvblByb3AgPSBpc1dlYmtpdFRyYW5zXG5cdCAgICA/ICdXZWJraXRUcmFuc2l0aW9uJ1xuXHQgICAgOiAndHJhbnNpdGlvbidcblx0ICBleHBvcnRzLnRyYW5zaXRpb25FbmRFdmVudCA9IGlzV2Via2l0VHJhbnNcblx0ICAgID8gJ3dlYmtpdFRyYW5zaXRpb25FbmQnXG5cdCAgICA6ICd0cmFuc2l0aW9uZW5kJ1xuXHQgIGV4cG9ydHMuYW5pbWF0aW9uUHJvcCA9IGlzV2Via2l0QW5pbVxuXHQgICAgPyAnV2Via2l0QW5pbWF0aW9uJ1xuXHQgICAgOiAnYW5pbWF0aW9uJ1xuXHQgIGV4cG9ydHMuYW5pbWF0aW9uRW5kRXZlbnQgPSBpc1dlYmtpdEFuaW1cblx0ICAgID8gJ3dlYmtpdEFuaW1hdGlvbkVuZCdcblx0ICAgIDogJ2FuaW1hdGlvbmVuZCdcblx0fVxuXG4vKioqLyB9LFxuLyogMTYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBjb25maWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuXG5cdC8qKlxuXHQgKiBDaGVjayBpZiBhIG5vZGUgaXMgaW4gdGhlIGRvY3VtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IG5vZGVcblx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0ICovXG5cblx0dmFyIGRvYyA9XG5cdCAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJlxuXHQgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuXG5cdGV4cG9ydHMuaW5Eb2MgPSBmdW5jdGlvbiAobm9kZSkge1xuXHQgIHJldHVybiBkb2MgJiYgZG9jLmNvbnRhaW5zKG5vZGUpXG5cdH1cblxuXHQvKipcblx0ICogRXh0cmFjdCBhbiBhdHRyaWJ1dGUgZnJvbSBhIG5vZGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gYXR0clxuXHQgKi9cblxuXHRleHBvcnRzLmF0dHIgPSBmdW5jdGlvbiAobm9kZSwgYXR0cikge1xuXHQgIGF0dHIgPSBjb25maWcucHJlZml4ICsgYXR0clxuXHQgIHZhciB2YWwgPSBub2RlLmdldEF0dHJpYnV0ZShhdHRyKVxuXHQgIGlmICh2YWwgIT09IG51bGwpIHtcblx0ICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHIpXG5cdCAgfVxuXHQgIHJldHVybiB2YWxcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnNlcnQgZWwgYmVmb3JlIHRhcmdldFxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IFxuXHQgKi9cblxuXHRleHBvcnRzLmJlZm9yZSA9IGZ1bmN0aW9uIChlbCwgdGFyZ2V0KSB7XG5cdCAgdGFyZ2V0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCB0YXJnZXQpXG5cdH1cblxuXHQvKipcblx0ICogSW5zZXJ0IGVsIGFmdGVyIHRhcmdldFxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IFxuXHQgKi9cblxuXHRleHBvcnRzLmFmdGVyID0gZnVuY3Rpb24gKGVsLCB0YXJnZXQpIHtcblx0ICBpZiAodGFyZ2V0Lm5leHRTaWJsaW5nKSB7XG5cdCAgICBleHBvcnRzLmJlZm9yZShlbCwgdGFyZ2V0Lm5leHRTaWJsaW5nKVxuXHQgIH0gZWxzZSB7XG5cdCAgICB0YXJnZXQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChlbClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIGVsIGZyb20gRE9NXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICovXG5cblx0ZXhwb3J0cy5yZW1vdmUgPSBmdW5jdGlvbiAoZWwpIHtcblx0ICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKVxuXHR9XG5cblx0LyoqXG5cdCAqIFByZXBlbmQgZWwgdG8gdGFyZ2V0XG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgXG5cdCAqL1xuXG5cdGV4cG9ydHMucHJlcGVuZCA9IGZ1bmN0aW9uIChlbCwgdGFyZ2V0KSB7XG5cdCAgaWYgKHRhcmdldC5maXJzdENoaWxkKSB7XG5cdCAgICBleHBvcnRzLmJlZm9yZShlbCwgdGFyZ2V0LmZpcnN0Q2hpbGQpXG5cdCAgfSBlbHNlIHtcblx0ICAgIHRhcmdldC5hcHBlbmRDaGlsZChlbClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogUmVwbGFjZSB0YXJnZXQgd2l0aCBlbFxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldFxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqL1xuXG5cdGV4cG9ydHMucmVwbGFjZSA9IGZ1bmN0aW9uICh0YXJnZXQsIGVsKSB7XG5cdCAgdmFyIHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlXG5cdCAgaWYgKHBhcmVudCkge1xuXHQgICAgcGFyZW50LnJlcGxhY2VDaGlsZChlbCwgdGFyZ2V0KVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb3B5IGF0dHJpYnV0ZXMgZnJvbSBvbmUgZWxlbWVudCB0byBhbm90aGVyLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGZyb21cblx0ICogQHBhcmFtIHtFbGVtZW50fSB0b1xuXHQgKi9cblxuXHRleHBvcnRzLmNvcHlBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKGZyb20sIHRvKSB7XG5cdCAgaWYgKGZyb20uaGFzQXR0cmlidXRlcygpKSB7XG5cdCAgICB2YXIgYXR0cnMgPSBmcm9tLmF0dHJpYnV0ZXNcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXR0cnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIHZhciBhdHRyID0gYXR0cnNbaV1cblx0ICAgICAgdG8uc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSlcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQWRkIGV2ZW50IGxpc3RlbmVyIHNob3J0aGFuZC5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2Jcblx0ICovXG5cblx0ZXhwb3J0cy5vbiA9IGZ1bmN0aW9uIChlbCwgZXZlbnQsIGNiKSB7XG5cdCAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2IpXG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIGV2ZW50IGxpc3RlbmVyIHNob3J0aGFuZC5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2Jcblx0ICovXG5cblx0ZXhwb3J0cy5vZmYgPSBmdW5jdGlvbiAoZWwsIGV2ZW50LCBjYikge1xuXHQgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGNiKVxuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBjbGFzcyB3aXRoIGNvbXBhdGliaWxpdHkgZm9yIElFICYgU1ZHXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtTdHJvbmd9IGNsc1xuXHQgKi9cblxuXHRleHBvcnRzLmFkZENsYXNzID0gZnVuY3Rpb24gKGVsLCBjbHMpIHtcblx0ICBpZiAoZWwuY2xhc3NMaXN0KSB7XG5cdCAgICBlbC5jbGFzc0xpc3QuYWRkKGNscylcblx0ICB9IGVsc2Uge1xuXHQgICAgdmFyIGN1ciA9ICcgJyArIChlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJycpICsgJyAnXG5cdCAgICBpZiAoY3VyLmluZGV4T2YoJyAnICsgY2xzICsgJyAnKSA8IDApIHtcblx0ICAgICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIChjdXIgKyBjbHMpLnRyaW0oKSlcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIGNsYXNzIHdpdGggY29tcGF0aWJpbGl0eSBmb3IgSUUgJiBTVkdcblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge1N0cm9uZ30gY2xzXG5cdCAqL1xuXG5cdGV4cG9ydHMucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiAoZWwsIGNscykge1xuXHQgIGlmIChlbC5jbGFzc0xpc3QpIHtcblx0ICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKVxuXHQgIH0gZWxzZSB7XG5cdCAgICB2YXIgY3VyID0gJyAnICsgKGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJykgKyAnICdcblx0ICAgIHZhciB0YXIgPSAnICcgKyBjbHMgKyAnICdcblx0ICAgIHdoaWxlIChjdXIuaW5kZXhPZih0YXIpID49IDApIHtcblx0ICAgICAgY3VyID0gY3VyLnJlcGxhY2UodGFyLCAnICcpXG5cdCAgICB9XG5cdCAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY3VyLnRyaW0oKSlcblx0ICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDE3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpXG5cblx0LyoqXG5cdCAqIFJlc29sdmUgcmVhZCAmIHdyaXRlIGZpbHRlcnMgZm9yIGEgdm0gaW5zdGFuY2UuIFRoZVxuXHQgKiBmaWx0ZXJzIGRlc2NyaXB0b3IgQXJyYXkgY29tZXMgZnJvbSB0aGUgZGlyZWN0aXZlIHBhcnNlci5cblx0ICpcblx0ICogVGhpcyBpcyBleHRyYWN0ZWQgaW50byBpdHMgb3duIHV0aWxpdHkgc28gaXQgY2FuXG5cdCAqIGJlIHVzZWQgaW4gbXVsdGlwbGUgc2NlbmFyaW9zLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBmaWx0ZXJzXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XVxuXHQgKiBAcmV0dXJuIHtPYmplY3R9XG5cdCAqL1xuXG5cdGV4cG9ydHMucmVzb2x2ZUZpbHRlcnMgPSBmdW5jdGlvbiAodm0sIGZpbHRlcnMsIHRhcmdldCkge1xuXHQgIGlmICghZmlsdGVycykge1xuXHQgICAgcmV0dXJuXG5cdCAgfVxuXHQgIHZhciByZXMgPSB0YXJnZXQgfHwge31cblx0ICAvLyB2YXIgcmVnaXN0cnkgPSB2bS4kb3B0aW9ucy5maWx0ZXJzXG5cdCAgZmlsdGVycy5mb3JFYWNoKGZ1bmN0aW9uIChmKSB7XG5cdCAgICB2YXIgZGVmID0gdm0uJG9wdGlvbnMuZmlsdGVyc1tmLm5hbWVdXG5cdCAgICBfLmFzc2VydEFzc2V0KGRlZiwgJ2ZpbHRlcicsIGYubmFtZSlcblx0ICAgIGlmICghZGVmKSByZXR1cm5cblx0ICAgIHZhciBhcmdzID0gZi5hcmdzXG5cdCAgICB2YXIgcmVhZGVyLCB3cml0ZXJcblx0ICAgIGlmICh0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgIHJlYWRlciA9IGRlZlxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgcmVhZGVyID0gZGVmLnJlYWRcblx0ICAgICAgd3JpdGVyID0gZGVmLndyaXRlXG5cdCAgICB9XG5cdCAgICBpZiAocmVhZGVyKSB7XG5cdCAgICAgIGlmICghcmVzLnJlYWQpIHJlcy5yZWFkID0gW11cblx0ICAgICAgcmVzLnJlYWQucHVzaChmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgICAgICByZXR1cm4gYXJnc1xuXHQgICAgICAgICAgPyByZWFkZXIuYXBwbHkodm0sIFt2YWx1ZV0uY29uY2F0KGFyZ3MpKVxuXHQgICAgICAgICAgOiByZWFkZXIuY2FsbCh2bSwgdmFsdWUpXG5cdCAgICAgIH0pXG5cdCAgICB9XG5cdCAgICBpZiAod3JpdGVyKSB7XG5cdCAgICAgIGlmICghcmVzLndyaXRlKSByZXMud3JpdGUgPSBbXVxuXHQgICAgICByZXMud3JpdGUucHVzaChmdW5jdGlvbiAodmFsdWUsIG9sZFZhbCkge1xuXHQgICAgICAgIHJldHVybiBhcmdzXG5cdCAgICAgICAgICA/IHdyaXRlci5hcHBseSh2bSwgW3ZhbHVlLCBvbGRWYWxdLmNvbmNhdChhcmdzKSlcblx0ICAgICAgICAgIDogd3JpdGVyLmNhbGwodm0sIHZhbHVlLCBvbGRWYWwpXG5cdCAgICAgIH0pXG5cdCAgICB9XG5cdCAgfSlcblx0ICByZXR1cm4gcmVzXG5cdH1cblxuXHQvKipcblx0ICogQXBwbHkgZmlsdGVycyB0byBhIHZhbHVlXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcblx0ICogQHBhcmFtIHtBcnJheX0gZmlsdGVyc1xuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICogQHBhcmFtIHsqfSBvbGRWYWxcblx0ICogQHJldHVybiB7Kn1cblx0ICovXG5cblx0ZXhwb3J0cy5hcHBseUZpbHRlcnMgPSBmdW5jdGlvbiAodmFsdWUsIGZpbHRlcnMsIHZtLCBvbGRWYWwpIHtcblx0ICBpZiAoIWZpbHRlcnMpIHtcblx0ICAgIHJldHVybiB2YWx1ZVxuXHQgIH1cblx0ICBmb3IgKHZhciBpID0gMCwgbCA9IGZpbHRlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICB2YWx1ZSA9IGZpbHRlcnNbaV0uY2FsbCh2bSwgdmFsdWUsIG9sZFZhbClcblx0ICB9XG5cdCAgcmV0dXJuIHZhbHVlXG5cdH1cblxuLyoqKi8gfSxcbi8qIDE4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgY29uZmlnID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMClcblxuXHQvKipcblx0ICogRW5hYmxlIGRlYnVnIHV0aWxpdGllcy4gVGhlIGVuYWJsZURlYnVnKCkgZnVuY3Rpb24gYW5kXG5cdCAqIGFsbCBfLmxvZygpICYgXy53YXJuKCkgY2FsbHMgd2lsbCBiZSBkcm9wcGVkIGluIHRoZVxuXHQgKiBtaW5pZmllZCBwcm9kdWN0aW9uIGJ1aWxkLlxuXHQgKi9cblxuXHRlbmFibGVEZWJ1ZygpXG5cblx0ZnVuY3Rpb24gZW5hYmxlRGVidWcgKCkge1xuXHQgIHZhciBoYXNDb25zb2xlID0gdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnXG5cdCAgXG5cdCAgLyoqXG5cdCAgICogTG9nIGEgbWVzc2FnZS5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7U3RyaW5nfSBtc2dcblx0ICAgKi9cblxuXHQgIGV4cG9ydHMubG9nID0gZnVuY3Rpb24gKG1zZykge1xuXHQgICAgaWYgKGhhc0NvbnNvbGUgJiYgY29uZmlnLmRlYnVnKSB7XG5cdCAgICAgIGNvbnNvbGUubG9nKCdbVnVlIGluZm9dOiAnICsgbXNnKVxuXHQgICAgfVxuXHQgIH1cblxuXHQgIC8qKlxuXHQgICAqIFdlJ3ZlIGdvdCBhIHByb2JsZW0gaGVyZS5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7U3RyaW5nfSBtc2dcblx0ICAgKi9cblxuXHQgIGV4cG9ydHMud2FybiA9IGZ1bmN0aW9uIChtc2cpIHtcblx0ICAgIGlmIChoYXNDb25zb2xlICYmICFjb25maWcuc2lsZW50KSB7XG5cdCAgICAgIGNvbnNvbGUud2FybignW1Z1ZSB3YXJuXTogJyArIG1zZylcblx0ICAgICAgaWYgKGNvbmZpZy5kZWJ1ZyAmJiBjb25zb2xlLnRyYWNlKSB7XG5cdCAgICAgICAgY29uc29sZS50cmFjZSgpXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cblx0ICAvKipcblx0ICAgKiBBc3NlcnQgYXNzZXQgZXhpc3RzXG5cdCAgICovXG5cblx0ICBleHBvcnRzLmFzc2VydEFzc2V0ID0gZnVuY3Rpb24gKHZhbCwgdHlwZSwgaWQpIHtcblx0ICAgIGlmICghdmFsKSB7XG5cdCAgICAgIGV4cG9ydHMud2FybignRmFpbGVkIHRvIHJlc29sdmUgJyArIHR5cGUgKyAnOiAnICsgaWQpXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiAxOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBleHRlbmQgPSBfLmV4dGVuZFxuXG5cdC8qKlxuXHQgKiBPcHRpb24gb3ZlcndyaXRpbmcgc3RyYXRlZ2llcyBhcmUgZnVuY3Rpb25zIHRoYXQgaGFuZGxlXG5cdCAqIGhvdyB0byBtZXJnZSBhIHBhcmVudCBvcHRpb24gdmFsdWUgYW5kIGEgY2hpbGQgb3B0aW9uXG5cdCAqIHZhbHVlIGludG8gdGhlIGZpbmFsIHZhbHVlLlxuXHQgKlxuXHQgKiBBbGwgc3RyYXRlZ3kgZnVuY3Rpb25zIGZvbGxvdyB0aGUgc2FtZSBzaWduYXR1cmU6XG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gcGFyZW50VmFsXG5cdCAqIEBwYXJhbSB7Kn0gY2hpbGRWYWxcblx0ICogQHBhcmFtIHtWdWV9IFt2bV1cblx0ICovXG5cblx0dmFyIHN0cmF0cyA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuXHQvKipcblx0ICogRGF0YVxuXHQgKi9cblxuXHRzdHJhdHMuZGF0YSA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsLCB2bSkge1xuXHQgIC8vIGluIGEgY2xhc3MgbWVyZ2UsIGJvdGggc2hvdWxkIGJlIGZ1bmN0aW9uc1xuXHQgIC8vIHNvIHdlIGp1c3QgcmV0dXJuIGNoaWxkIGlmIGl0IGV4aXN0c1xuXHQgIGlmICghdm0pIHtcblx0ICAgIGlmIChjaGlsZFZhbCAmJiB0eXBlb2YgY2hpbGRWYWwgIT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgXy53YXJuKFxuXHQgICAgICAgICdUaGUgXCJkYXRhXCIgb3B0aW9uIHNob3VsZCBiZSBhIGZ1bmN0aW9uICcgK1xuXHQgICAgICAgICd0aGF0IHJldHVybnMgYSBwZXItaW5zdGFuY2UgdmFsdWUgaW4gY29tcG9uZW50ICcgK1xuXHQgICAgICAgICdkZWZpbml0aW9ucy4nXG5cdCAgICAgIClcblx0ICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICByZXR1cm4gY2hpbGRWYWwgfHwgcGFyZW50VmFsXG5cdCAgfVxuXHQgIHZhciBpbnN0YW5jZURhdGEgPSB0eXBlb2YgY2hpbGRWYWwgPT09ICdmdW5jdGlvbidcblx0ICAgID8gY2hpbGRWYWwuY2FsbCh2bSlcblx0ICAgIDogY2hpbGRWYWxcblx0ICB2YXIgZGVmYXVsdERhdGEgPSB0eXBlb2YgcGFyZW50VmFsID09PSAnZnVuY3Rpb24nXG5cdCAgICA/IHBhcmVudFZhbC5jYWxsKHZtKVxuXHQgICAgOiB1bmRlZmluZWRcblx0ICBpZiAoaW5zdGFuY2VEYXRhKSB7XG5cdCAgICAvLyBtaXggZGVmYXVsdCBkYXRhIGludG8gaW5zdGFuY2UgZGF0YVxuXHQgICAgZm9yICh2YXIga2V5IGluIGRlZmF1bHREYXRhKSB7XG5cdCAgICAgIGlmICghaW5zdGFuY2VEYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0ICAgICAgICBpbnN0YW5jZURhdGEuJGFkZChrZXksIGRlZmF1bHREYXRhW2tleV0pXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBpbnN0YW5jZURhdGFcblx0ICB9IGVsc2Uge1xuXHQgICAgcmV0dXJuIGRlZmF1bHREYXRhXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEVsXG5cdCAqL1xuXG5cdHN0cmF0cy5lbCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsLCB2bSkge1xuXHQgIGlmICghdm0gJiYgY2hpbGRWYWwgJiYgdHlwZW9mIGNoaWxkVmFsICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICBfLndhcm4oXG5cdCAgICAgICdUaGUgXCJlbFwiIG9wdGlvbiBzaG91bGQgYmUgYSBmdW5jdGlvbiAnICtcblx0ICAgICAgJ3RoYXQgcmV0dXJucyBhIHBlci1pbnN0YW5jZSB2YWx1ZSBpbiBjb21wb25lbnQgJyArXG5cdCAgICAgICdkZWZpbml0aW9ucy4nXG5cdCAgICApXG5cdCAgICByZXR1cm5cblx0ICB9XG5cdCAgdmFyIHJldCA9IGNoaWxkVmFsIHx8IHBhcmVudFZhbFxuXHQgIC8vIGludm9rZSB0aGUgZWxlbWVudCBmYWN0b3J5IGlmIHRoaXMgaXMgaW5zdGFuY2UgbWVyZ2Vcblx0ICByZXR1cm4gdm0gJiYgdHlwZW9mIHJldCA9PT0gJ2Z1bmN0aW9uJ1xuXHQgICAgPyByZXQuY2FsbCh2bSlcblx0ICAgIDogcmV0XG5cdH1cblxuXHQvKipcblx0ICogSG9va3MgYW5kIHBhcmFtIGF0dHJpYnV0ZXMgYXJlIG1lcmdlZCBhcyBhcnJheXMuXG5cdCAqL1xuXG5cdHN0cmF0cy5jcmVhdGVkID1cblx0c3RyYXRzLnJlYWR5ID1cblx0c3RyYXRzLmF0dGFjaGVkID1cblx0c3RyYXRzLmRldGFjaGVkID1cblx0c3RyYXRzLmJlZm9yZUNvbXBpbGUgPVxuXHRzdHJhdHMuY29tcGlsZWQgPVxuXHRzdHJhdHMuYmVmb3JlRGVzdHJveSA9XG5cdHN0cmF0cy5kZXN0cm95ZWQgPVxuXHRzdHJhdHMucGFyYW1BdHRyaWJ1dGVzID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcblx0ICByZXR1cm4gY2hpbGRWYWxcblx0ICAgID8gcGFyZW50VmFsXG5cdCAgICAgID8gcGFyZW50VmFsLmNvbmNhdChjaGlsZFZhbClcblx0ICAgICAgOiBfLmlzQXJyYXkoY2hpbGRWYWwpXG5cdCAgICAgICAgPyBjaGlsZFZhbFxuXHQgICAgICAgIDogW2NoaWxkVmFsXVxuXHQgICAgOiBwYXJlbnRWYWxcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NldHNcblx0ICpcblx0ICogV2hlbiBhIHZtIGlzIHByZXNlbnQgKGluc3RhbmNlIGNyZWF0aW9uKSwgd2UgbmVlZCB0byBkb1xuXHQgKiBhIHRocmVlLXdheSBtZXJnZSBiZXR3ZWVuIGNvbnN0cnVjdG9yIG9wdGlvbnMsIGluc3RhbmNlXG5cdCAqIG9wdGlvbnMgYW5kIHBhcmVudCBvcHRpb25zLlxuXHQgKi9cblxuXHRzdHJhdHMuZGlyZWN0aXZlcyA9XG5cdHN0cmF0cy5maWx0ZXJzID1cblx0c3RyYXRzLnBhcnRpYWxzID1cblx0c3RyYXRzLnRyYW5zaXRpb25zID1cblx0c3RyYXRzLmNvbXBvbmVudHMgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCwgdm0sIGtleSkge1xuXHQgIHZhciByZXQgPSBPYmplY3QuY3JlYXRlKFxuXHQgICAgdm0gJiYgdm0uJHBhcmVudFxuXHQgICAgICA/IHZtLiRwYXJlbnQuJG9wdGlvbnNba2V5XVxuXHQgICAgICA6IF8uVnVlLm9wdGlvbnNba2V5XVxuXHQgIClcblx0ICBpZiAocGFyZW50VmFsKSB7XG5cdCAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHBhcmVudFZhbClcblx0ICAgIHZhciBpID0ga2V5cy5sZW5ndGhcblx0ICAgIHZhciBmaWVsZFxuXHQgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICBmaWVsZCA9IGtleXNbaV1cblx0ICAgICAgcmV0W2ZpZWxkXSA9IHBhcmVudFZhbFtmaWVsZF1cblx0ICAgIH1cblx0ICB9XG5cdCAgaWYgKGNoaWxkVmFsKSBleHRlbmQocmV0LCBjaGlsZFZhbClcblx0ICByZXR1cm4gcmV0XG5cdH1cblxuXHQvKipcblx0ICogRXZlbnRzICYgV2F0Y2hlcnMuXG5cdCAqXG5cdCAqIEV2ZW50cyAmIHdhdGNoZXJzIGhhc2hlcyBzaG91bGQgbm90IG92ZXJ3cml0ZSBvbmVcblx0ICogYW5vdGhlciwgc28gd2UgbWVyZ2UgdGhlbSBhcyBhcnJheXMuXG5cdCAqL1xuXG5cdHN0cmF0cy53YXRjaCA9XG5cdHN0cmF0cy5ldmVudHMgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuXHQgIGlmICghY2hpbGRWYWwpIHJldHVybiBwYXJlbnRWYWxcblx0ICBpZiAoIXBhcmVudFZhbCkgcmV0dXJuIGNoaWxkVmFsXG5cdCAgdmFyIHJldCA9IHt9XG5cdCAgZXh0ZW5kKHJldCwgcGFyZW50VmFsKVxuXHQgIGZvciAodmFyIGtleSBpbiBjaGlsZFZhbCkge1xuXHQgICAgdmFyIHBhcmVudCA9IHJldFtrZXldXG5cdCAgICB2YXIgY2hpbGQgPSBjaGlsZFZhbFtrZXldXG5cdCAgICByZXRba2V5XSA9IHBhcmVudFxuXHQgICAgICA/IHBhcmVudC5jb25jYXQoY2hpbGQpXG5cdCAgICAgIDogW2NoaWxkXVxuXHQgIH1cblx0ICByZXR1cm4gcmV0XG5cdH1cblxuXHQvKipcblx0ICogT3RoZXIgb2JqZWN0IGhhc2hlcy5cblx0ICovXG5cblx0c3RyYXRzLm1ldGhvZHMgPVxuXHRzdHJhdHMuY29tcHV0ZWQgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuXHQgIGlmICghY2hpbGRWYWwpIHJldHVybiBwYXJlbnRWYWxcblx0ICBpZiAoIXBhcmVudFZhbCkgcmV0dXJuIGNoaWxkVmFsXG5cdCAgdmFyIHJldCA9IE9iamVjdC5jcmVhdGUocGFyZW50VmFsKVxuXHQgIGV4dGVuZChyZXQsIGNoaWxkVmFsKVxuXHQgIHJldHVybiByZXRcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZhdWx0IHN0cmF0ZWd5LlxuXHQgKi9cblxuXHR2YXIgZGVmYXVsdFN0cmF0ID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcblx0ICByZXR1cm4gY2hpbGRWYWwgPT09IHVuZGVmaW5lZFxuXHQgICAgPyBwYXJlbnRWYWxcblx0ICAgIDogY2hpbGRWYWxcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlIHN1cmUgY29tcG9uZW50IG9wdGlvbnMgZ2V0IGNvbnZlcnRlZCB0byBhY3R1YWxcblx0ICogY29uc3RydWN0b3JzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50c1xuXHQgKi9cblxuXHRmdW5jdGlvbiBndWFyZENvbXBvbmVudHMgKGNvbXBvbmVudHMpIHtcblx0ICBpZiAoY29tcG9uZW50cykge1xuXHQgICAgdmFyIGRlZlxuXHQgICAgZm9yICh2YXIga2V5IGluIGNvbXBvbmVudHMpIHtcblx0ICAgICAgZGVmID0gY29tcG9uZW50c1trZXldXG5cdCAgICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZGVmKSkge1xuXHQgICAgICAgIGRlZi5uYW1lID0ga2V5XG5cdCAgICAgICAgY29tcG9uZW50c1trZXldID0gXy5WdWUuZXh0ZW5kKGRlZilcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBNZXJnZSB0d28gb3B0aW9uIG9iamVjdHMgaW50byBhIG5ldyBvbmUuXG5cdCAqIENvcmUgdXRpbGl0eSB1c2VkIGluIGJvdGggaW5zdGFudGlhdGlvbiBhbmQgaW5oZXJpdGFuY2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRcblx0ICogQHBhcmFtIHtPYmplY3R9IGNoaWxkXG5cdCAqIEBwYXJhbSB7VnVlfSBbdm1dIC0gaWYgdm0gaXMgcHJlc2VudCwgaW5kaWNhdGVzIHRoaXMgaXNcblx0ICogICAgICAgICAgICAgICAgICAgICBhbiBpbnN0YW50aWF0aW9uIG1lcmdlLlxuXHQgKi9cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyAocGFyZW50LCBjaGlsZCwgdm0pIHtcblx0ICBndWFyZENvbXBvbmVudHMoY2hpbGQuY29tcG9uZW50cylcblx0ICB2YXIgb3B0aW9ucyA9IHt9XG5cdCAgdmFyIGtleVxuXHQgIGZvciAoa2V5IGluIHBhcmVudCkge1xuXHQgICAgbWVyZ2UocGFyZW50W2tleV0sIGNoaWxkW2tleV0sIGtleSlcblx0ICB9XG5cdCAgZm9yIChrZXkgaW4gY2hpbGQpIHtcblx0ICAgIGlmICghKHBhcmVudC5oYXNPd25Qcm9wZXJ0eShrZXkpKSkge1xuXHQgICAgICBtZXJnZShwYXJlbnRba2V5XSwgY2hpbGRba2V5XSwga2V5KVxuXHQgICAgfVxuXHQgIH1cblx0ICB2YXIgbWl4aW5zID0gY2hpbGQubWl4aW5zXG5cdCAgaWYgKG1peGlucykge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBtaXhpbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIGZvciAoa2V5IGluIG1peGluc1tpXSkge1xuXHQgICAgICAgIG1lcmdlKG9wdGlvbnNba2V5XSwgbWl4aW5zW2ldW2tleV0sIGtleSlcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0ICBmdW5jdGlvbiBtZXJnZSAocGFyZW50VmFsLCBjaGlsZFZhbCwga2V5KSB7XG5cdCAgICB2YXIgc3RyYXQgPSBzdHJhdHNba2V5XSB8fCBkZWZhdWx0U3RyYXRcblx0ICAgIG9wdGlvbnNba2V5XSA9IHN0cmF0KHBhcmVudFZhbCwgY2hpbGRWYWwsIHZtLCBrZXkpXG5cdCAgfVxuXHQgIHJldHVybiBvcHRpb25zXG5cdH1cblxuLyoqKi8gfSxcbi8qIDIwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIC8qKlxuXHQgICAqIFRoZSBwcmVmaXggdG8gbG9vayBmb3Igd2hlbiBwYXJzaW5nIGRpcmVjdGl2ZXMuXG5cdCAgICpcblx0ICAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICAqL1xuXG5cdCAgcHJlZml4OiAndi0nLFxuXG5cdCAgLyoqXG5cdCAgICogV2hldGhlciB0byBwcmludCBkZWJ1ZyBtZXNzYWdlcy5cblx0ICAgKiBBbHNvIGVuYWJsZXMgc3RhY2sgdHJhY2UgZm9yIHdhcm5pbmdzLlxuXHQgICAqXG5cdCAgICogQHR5cGUge0Jvb2xlYW59XG5cdCAgICovXG5cblx0ICBkZWJ1ZzogZmFsc2UsXG5cblx0ICAvKipcblx0ICAgKiBXaGV0aGVyIHRvIHN1cHByZXNzIHdhcm5pbmdzLlxuXHQgICAqXG5cdCAgICogQHR5cGUge0Jvb2xlYW59XG5cdCAgICovXG5cblx0ICBzaWxlbnQ6IGZhbHNlLFxuXG5cdCAgLyoqXG5cdCAgICogV2hldGhlciBhbGxvdyBvYnNlcnZlciB0byBhbHRlciBkYXRhIG9iamVjdHMnXG5cdCAgICogX19wcm90b19fLlxuXHQgICAqXG5cdCAgICogQHR5cGUge0Jvb2xlYW59XG5cdCAgICovXG5cblx0ICBwcm90bzogdHJ1ZSxcblxuXHQgIC8qKlxuXHQgICAqIFdoZXRoZXIgdG8gcGFyc2UgbXVzdGFjaGUgdGFncyBpbiB0ZW1wbGF0ZXMuXG5cdCAgICpcblx0ICAgKiBAdHlwZSB7Qm9vbGVhbn1cblx0ICAgKi9cblxuXHQgIGludGVycG9sYXRlOiB0cnVlLFxuXG5cdCAgLyoqXG5cdCAgICogV2hldGhlciB0byB1c2UgYXN5bmMgcmVuZGVyaW5nLlxuXHQgICAqL1xuXG5cdCAgYXN5bmM6IHRydWUsXG5cblx0ICAvKipcblx0ICAgKiBJbnRlcm5hbCBmbGFnIHRvIGluZGljYXRlIHRoZSBkZWxpbWl0ZXJzIGhhdmUgYmVlblxuXHQgICAqIGNoYW5nZWQuXG5cdCAgICpcblx0ICAgKiBAdHlwZSB7Qm9vbGVhbn1cblx0ICAgKi9cblxuXHQgIF9kZWxpbWl0ZXJzQ2hhbmdlZDogdHJ1ZVxuXG5cdH1cblxuXHQvKipcblx0ICogSW50ZXJwb2xhdGlvbiBkZWxpbWl0ZXJzLlxuXHQgKiBXZSBuZWVkIHRvIG1hcmsgdGhlIGNoYW5nZWQgZmxhZyBzbyB0aGF0IHRoZSB0ZXh0IHBhcnNlclxuXHQgKiBrbm93cyBpdCBuZWVkcyB0byByZWNvbXBpbGUgdGhlIHJlZ2V4LlxuXHQgKlxuXHQgKiBAdHlwZSB7QXJyYXk8U3RyaW5nPn1cblx0ICovXG5cblx0dmFyIGRlbGltaXRlcnMgPSBbJ3t7JywgJ319J11cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZS5leHBvcnRzLCAnZGVsaW1pdGVycycsIHtcblx0ICBnZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiBkZWxpbWl0ZXJzXG5cdCAgfSxcblx0ICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgIGRlbGltaXRlcnMgPSB2YWxcblx0ICAgIHRoaXMuX2RlbGltaXRlcnNDaGFuZ2VkID0gdHJ1ZVxuXHQgIH1cblx0fSlcblxuLyoqKi8gfSxcbi8qIDIxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGNvbmZpZyA9IF9fd2VicGFja19yZXF1aXJlX18oMjApXG5cdHZhciBPYnNlcnZlciA9IF9fd2VicGFja19yZXF1aXJlX18oNDkpXG5cdHZhciBleHBQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ0KVxuXHR2YXIgQmF0Y2hlciA9IF9fd2VicGFja19yZXF1aXJlX18oNTApXG5cblx0dmFyIGJhdGNoZXIgPSBuZXcgQmF0Y2hlcigpXG5cdHZhciB1aWQgPSAwXG5cblx0LyoqXG5cdCAqIEEgd2F0Y2hlciBwYXJzZXMgYW4gZXhwcmVzc2lvbiwgY29sbGVjdHMgZGVwZW5kZW5jaWVzLFxuXHQgKiBhbmQgZmlyZXMgY2FsbGJhY2sgd2hlbiB0aGUgZXhwcmVzc2lvbiB2YWx1ZSBjaGFuZ2VzLlxuXHQgKiBUaGlzIGlzIHVzZWQgZm9yIGJvdGggdGhlICR3YXRjaCgpIGFwaSBhbmQgZGlyZWN0aXZlcy5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBleHByZXNzaW9uXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG5cdCAqIEBwYXJhbSB7QXJyYXl9IFtmaWx0ZXJzXVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtuZWVkU2V0XVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtkZWVwXVxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cblx0ZnVuY3Rpb24gV2F0Y2hlciAodm0sIGV4cHJlc3Npb24sIGNiLCBmaWx0ZXJzLCBuZWVkU2V0LCBkZWVwKSB7XG5cdCAgdGhpcy52bSA9IHZtXG5cdCAgdm0uX3dhdGNoZXJMaXN0LnB1c2godGhpcylcblx0ICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uXG5cdCAgdGhpcy5jYnMgPSBbY2JdXG5cdCAgdGhpcy5pZCA9ICsrdWlkIC8vIHVpZCBmb3IgYmF0Y2hpbmdcblx0ICB0aGlzLmFjdGl2ZSA9IHRydWVcblx0ICB0aGlzLmRlZXAgPSBkZWVwXG5cdCAgdGhpcy5kZXBzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXHQgIC8vIHNldHVwIGZpbHRlcnMgaWYgYW55LlxuXHQgIC8vIFdlIGRlbGVnYXRlIGRpcmVjdGl2ZSBmaWx0ZXJzIGhlcmUgdG8gdGhlIHdhdGNoZXJcblx0ICAvLyBiZWNhdXNlIHRoZXkgbmVlZCB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZGVwZW5kZW5jeVxuXHQgIC8vIGNvbGxlY3Rpb24gcHJvY2Vzcy5cblx0ICB0aGlzLnJlYWRGaWx0ZXJzID0gZmlsdGVycyAmJiBmaWx0ZXJzLnJlYWRcblx0ICB0aGlzLndyaXRlRmlsdGVycyA9IGZpbHRlcnMgJiYgZmlsdGVycy53cml0ZVxuXHQgIC8vIHBhcnNlIGV4cHJlc3Npb24gZm9yIGdldHRlci9zZXR0ZXJcblx0ICB2YXIgcmVzID0gZXhwUGFyc2VyLnBhcnNlKGV4cHJlc3Npb24sIG5lZWRTZXQpXG5cdCAgdGhpcy5nZXR0ZXIgPSByZXMuZ2V0XG5cdCAgdGhpcy5zZXR0ZXIgPSByZXMuc2V0XG5cdCAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0KClcblx0fVxuXG5cdHZhciBwID0gV2F0Y2hlci5wcm90b3R5cGVcblxuXHQvKipcblx0ICogQWRkIGEgYmluZGluZyBkZXBlbmRlbmN5IHRvIHRoaXMgZGlyZWN0aXZlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0JpbmRpbmd9IGJpbmRpbmdcblx0ICovXG5cblx0cC5hZGREZXAgPSBmdW5jdGlvbiAoYmluZGluZykge1xuXHQgIHZhciBpZCA9IGJpbmRpbmcuaWRcblx0ICBpZiAoIXRoaXMubmV3RGVwc1tpZF0pIHtcblx0ICAgIHRoaXMubmV3RGVwc1tpZF0gPSBiaW5kaW5nXG5cdCAgICBpZiAoIXRoaXMuZGVwc1tpZF0pIHtcblx0ICAgICAgdGhpcy5kZXBzW2lkXSA9IGJpbmRpbmdcblx0ICAgICAgYmluZGluZy5hZGRTdWIodGhpcylcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogRXZhbHVhdGUgdGhlIGdldHRlciwgYW5kIHJlLWNvbGxlY3QgZGVwZW5kZW5jaWVzLlxuXHQgKi9cblxuXHRwLmdldCA9IGZ1bmN0aW9uICgpIHtcblx0ICB0aGlzLmJlZm9yZUdldCgpXG5cdCAgdmFyIHZtID0gdGhpcy52bVxuXHQgIHZhciB2YWx1ZVxuXHQgIHRyeSB7XG5cdCAgICB2YWx1ZSA9IHRoaXMuZ2V0dGVyLmNhbGwodm0sIHZtKVxuXHQgIH0gY2F0Y2ggKGUpIHt9XG5cdCAgLy8gdXNlIEpTT04uc3RyaW5naWZ5IHRvIFwidG91Y2hcIiBldmVyeSBwcm9wZXJ0eVxuXHQgIC8vIHNvIHRoZXkgYXJlIGFsbCB0cmFja2VkIGFzIGRlcGVuZGVuY2llcyBmb3Jcblx0ICAvLyBkZWVwIHdhdGNoaW5nXG5cdCAgaWYgKHRoaXMuZGVlcCkgSlNPTi5zdHJpbmdpZnkodmFsdWUpXG5cdCAgdmFsdWUgPSBfLmFwcGx5RmlsdGVycyh2YWx1ZSwgdGhpcy5yZWFkRmlsdGVycywgdm0pXG5cdCAgdGhpcy5hZnRlckdldCgpXG5cdCAgcmV0dXJuIHZhbHVlXG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIHdpdGggdGhlIHNldHRlci5cblx0ICpcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxuXHQgKi9cblxuXHRwLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgIHZhciB2bSA9IHRoaXMudm1cblx0ICB2YWx1ZSA9IF8uYXBwbHlGaWx0ZXJzKFxuXHQgICAgdmFsdWUsIHRoaXMud3JpdGVGaWx0ZXJzLCB2bSwgdGhpcy52YWx1ZVxuXHQgIClcblx0ICB0cnkge1xuXHQgICAgdGhpcy5zZXR0ZXIuY2FsbCh2bSwgdm0sIHZhbHVlKVxuXHQgIH0gY2F0Y2ggKGUpIHt9XG5cdH1cblxuXHQvKipcblx0ICogUHJlcGFyZSBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuXHQgKi9cblxuXHRwLmJlZm9yZUdldCA9IGZ1bmN0aW9uICgpIHtcblx0ICBPYnNlcnZlci50YXJnZXQgPSB0aGlzXG5cdCAgdGhpcy5uZXdEZXBzID0ge31cblx0fVxuXG5cdC8qKlxuXHQgKiBDbGVhbiB1cCBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuXHQgKi9cblxuXHRwLmFmdGVyR2V0ID0gZnVuY3Rpb24gKCkge1xuXHQgIE9ic2VydmVyLnRhcmdldCA9IG51bGxcblx0ICBmb3IgKHZhciBpZCBpbiB0aGlzLmRlcHMpIHtcblx0ICAgIGlmICghdGhpcy5uZXdEZXBzW2lkXSkge1xuXHQgICAgICB0aGlzLmRlcHNbaWRdLnJlbW92ZVN1Yih0aGlzKVxuXHQgICAgfVxuXHQgIH1cblx0ICB0aGlzLmRlcHMgPSB0aGlzLm5ld0RlcHNcblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJzY3JpYmVyIGludGVyZmFjZS5cblx0ICogV2lsbCBiZSBjYWxsZWQgd2hlbiBhIGRlcGVuZGVuY3kgY2hhbmdlcy5cblx0ICovXG5cblx0cC51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgaWYgKGNvbmZpZy5hc3luYykge1xuXHQgICAgYmF0Y2hlci5wdXNoKHRoaXMpXG5cdCAgfSBlbHNlIHtcblx0ICAgIHRoaXMucnVuKClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQmF0Y2hlciBqb2IgaW50ZXJmYWNlLlxuXHQgKiBXaWxsIGJlIGNhbGxlZCBieSB0aGUgYmF0Y2hlci5cblx0ICovXG5cblx0cC5ydW4gPSBmdW5jdGlvbiAoKSB7XG5cdCAgaWYgKHRoaXMuYWN0aXZlKSB7XG5cdCAgICB2YXIgdmFsdWUgPSB0aGlzLmdldCgpXG5cdCAgICBpZiAoXG5cdCAgICAgICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsKSB8fFxuXHQgICAgICB2YWx1ZSAhPT0gdGhpcy52YWx1ZVxuXHQgICAgKSB7XG5cdCAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWVcblx0ICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXG5cdCAgICAgIHZhciBjYnMgPSB0aGlzLmNic1xuXHQgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNicy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgICAgICBjYnNbaV0odmFsdWUsIG9sZFZhbHVlKVxuXHQgICAgICAgIC8vIGlmIGEgY2FsbGJhY2sgYWxzbyByZW1vdmVkIG90aGVyIGNhbGxiYWNrcyxcblx0ICAgICAgICAvLyB3ZSBuZWVkIHRvIGFkanVzdCB0aGUgbG9vcCBhY2NvcmRpbmdseS5cblx0ICAgICAgICB2YXIgcmVtb3ZlZCA9IGwgLSBjYnMubGVuZ3RoXG5cdCAgICAgICAgaWYgKHJlbW92ZWQpIHtcblx0ICAgICAgICAgIGkgLT0gcmVtb3ZlZFxuXHQgICAgICAgICAgbCAtPSByZW1vdmVkXG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBhIGNhbGxiYWNrLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuXHQgKi9cblxuXHRwLmFkZENiID0gZnVuY3Rpb24gKGNiKSB7XG5cdCAgdGhpcy5jYnMucHVzaChjYilcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYSBjYWxsYmFjay5cblx0ICpcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2Jcblx0ICovXG5cblx0cC5yZW1vdmVDYiA9IGZ1bmN0aW9uIChjYikge1xuXHQgIHZhciBjYnMgPSB0aGlzLmNic1xuXHQgIGlmIChjYnMubGVuZ3RoID4gMSkge1xuXHQgICAgdmFyIGkgPSBjYnMuaW5kZXhPZihjYilcblx0ICAgIGlmIChpID4gLTEpIHtcblx0ICAgICAgY2JzLnNwbGljZShpLCAxKVxuXHQgICAgfVxuXHQgIH0gZWxzZSBpZiAoY2IgPT09IGNic1swXSkge1xuXHQgICAgdGhpcy50ZWFyZG93bigpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBzZWxmIGZyb20gYWxsIGRlcGVuZGVuY2llcycgc3ViY3JpYmVyIGxpc3QuXG5cdCAqL1xuXG5cdHAudGVhcmRvd24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgaWYgKHRoaXMuYWN0aXZlKSB7XG5cdCAgICAvLyByZW1vdmUgc2VsZiBmcm9tIHZtJ3Mgd2F0Y2hlciBsaXN0XG5cdCAgICAvLyB3ZSBjYW4gc2tpcCB0aGlzIGlmIHRoZSB2bSBpZiBiZWluZyBkZXN0cm95ZWRcblx0ICAgIC8vIHdoaWNoIGNhbiBpbXByb3ZlIHRlYXJkb3duIHBlcmZvcm1hbmNlLlxuXHQgICAgaWYgKCF0aGlzLnZtLl9pc0JlaW5nRGVzdHJveWVkKSB7XG5cdCAgICAgIHZhciBsaXN0ID0gdGhpcy52bS5fd2F0Y2hlckxpc3Rcblx0ICAgICAgbGlzdC5zcGxpY2UobGlzdC5pbmRleE9mKHRoaXMpKVxuXHQgICAgfVxuXHQgICAgZm9yICh2YXIgaWQgaW4gdGhpcy5kZXBzKSB7XG5cdCAgICAgIHRoaXMuZGVwc1tpZF0ucmVtb3ZlU3ViKHRoaXMpXG5cdCAgICB9XG5cdCAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG5cdCAgICB0aGlzLnZtID0gdGhpcy5jYnMgPSB0aGlzLnZhbHVlID0gbnVsbFxuXHQgIH1cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gV2F0Y2hlclxuXG4vKioqLyB9LFxuLyogMjIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdGhpcy5hdHRyID0gdGhpcy5lbC5ub2RlVHlwZSA9PT0gM1xuXHQgICAgICA/ICdub2RlVmFsdWUnXG5cdCAgICAgIDogJ3RleHRDb250ZW50J1xuXHQgIH0sXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgdGhpcy5lbFt0aGlzLmF0dHJdID0gXy50b1N0cmluZyh2YWx1ZSlcblx0ICB9XG5cdCAgXG5cdH1cblxuLyoqKi8gfSxcbi8qIDIzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIHRlbXBsYXRlUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MSlcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIGEgY29tbWVudCBub2RlIG1lYW5zIHRoaXMgaXMgYSBiaW5kaW5nIGZvclxuXHQgICAgLy8ge3t7IGlubGluZSB1bmVzY2FwZWQgaHRtbCB9fX1cblx0ICAgIGlmICh0aGlzLmVsLm5vZGVUeXBlID09PSA4KSB7XG5cdCAgICAgIC8vIGhvbGQgbm9kZXNcblx0ICAgICAgdGhpcy5ub2RlcyA9IFtdXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICB2YWx1ZSA9IF8udG9TdHJpbmcodmFsdWUpXG5cdCAgICBpZiAodGhpcy5ub2Rlcykge1xuXHQgICAgICB0aGlzLnN3YXAodmFsdWUpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLmVsLmlubmVySFRNTCA9IHZhbHVlXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHN3YXA6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgLy8gcmVtb3ZlIG9sZCBub2Rlc1xuXHQgICAgdmFyIGkgPSB0aGlzLm5vZGVzLmxlbmd0aFxuXHQgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICBfLnJlbW92ZSh0aGlzLm5vZGVzW2ldKVxuXHQgICAgfVxuXHQgICAgLy8gY29udmVydCBuZXcgdmFsdWUgdG8gYSBmcmFnbWVudFxuXHQgICAgdmFyIGZyYWcgPSB0ZW1wbGF0ZVBhcnNlci5wYXJzZSh2YWx1ZSwgdHJ1ZSlcblx0ICAgIC8vIHNhdmUgYSByZWZlcmVuY2UgdG8gdGhlc2Ugbm9kZXMgc28gd2UgY2FuIHJlbW92ZSBsYXRlclxuXHQgICAgdGhpcy5ub2RlcyA9IF8udG9BcnJheShmcmFnLmNoaWxkTm9kZXMpXG5cdCAgICBfLmJlZm9yZShmcmFnLCB0aGlzLmVsKVxuXHQgIH1cblxuXHR9XG5cbi8qKiovIH0sXG4vKiAyNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Ly8geGxpbmtcblx0dmFyIHhsaW5rTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaydcblx0dmFyIHhsaW5rUkUgPSAvXnhsaW5rOi9cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIHByaW9yaXR5OiA4NTAsXG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgbmFtZSA9IHRoaXMuYXJnXG5cdCAgICB0aGlzLnVwZGF0ZSA9IHhsaW5rUkUudGVzdChuYW1lKVxuXHQgICAgICA/IHhsaW5rSGFuZGxlclxuXHQgICAgICA6IGRlZmF1bHRIYW5kbGVyXG5cdCAgfVxuXG5cdH1cblxuXHRmdW5jdGlvbiBkZWZhdWx0SGFuZGxlciAodmFsdWUpIHtcblx0ICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDApIHtcblx0ICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKHRoaXMuYXJnLCB2YWx1ZSlcblx0ICB9IGVsc2Uge1xuXHQgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUodGhpcy5hcmcpXG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24geGxpbmtIYW5kbGVyICh2YWx1ZSkge1xuXHQgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG5cdCAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZU5TKHhsaW5rTlMsIHRoaXMuYXJnLCB2YWx1ZSlcblx0ICB9IGVsc2Uge1xuXHQgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGVOUyh4bGlua05TLCAnaHJlZicpXG5cdCAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiAyNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHRyYW5zaXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ1KVxuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgdmFyIGVsID0gdGhpcy5lbFxuXHQgIHRyYW5zaXRpb24uYXBwbHkoZWwsIHZhbHVlID8gMSA6IC0xLCBmdW5jdGlvbiAoKSB7XG5cdCAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJ1xuXHQgIH0sIHRoaXMudm0pXG5cdH1cblxuLyoqKi8gfSxcbi8qIDI2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGFkZENsYXNzID0gXy5hZGRDbGFzc1xuXHR2YXIgcmVtb3ZlQ2xhc3MgPSBfLnJlbW92ZUNsYXNzXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICBpZiAodGhpcy5hcmcpIHtcblx0ICAgIHZhciBtZXRob2QgPSB2YWx1ZSA/IGFkZENsYXNzIDogcmVtb3ZlQ2xhc3Ncblx0ICAgIG1ldGhvZCh0aGlzLmVsLCB0aGlzLmFyZylcblx0ICB9IGVsc2Uge1xuXHQgICAgaWYgKHRoaXMubGFzdFZhbCkge1xuXHQgICAgICByZW1vdmVDbGFzcyh0aGlzLmVsLCB0aGlzLmxhc3RWYWwpXG5cdCAgICB9XG5cdCAgICBpZiAodmFsdWUpIHtcblx0ICAgICAgYWRkQ2xhc3ModGhpcy5lbCwgdmFsdWUpXG5cdCAgICAgIHRoaXMubGFzdFZhbCA9IHZhbHVlXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiAyNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBpc0xpdGVyYWw6IHRydWUsXG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB0aGlzLnZtLiQkW3RoaXMuZXhwcmVzc2lvbl0gPSB0aGlzLmVsXG5cdCAgfSxcblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgZGVsZXRlIHRoaXMudm0uJCRbdGhpcy5leHByZXNzaW9uXVxuXHQgIH1cblx0ICBcblx0fVxuXG4vKioqLyB9LFxuLyogMjggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgaXNMaXRlcmFsOiB0cnVlLFxuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgaWYgKHRoaXMuZWwgIT09IHRoaXMudm0uJGVsKSB7XG5cdCAgICAgIF8ud2Fybihcblx0ICAgICAgICAndi1yZWYgc2hvdWxkIG9ubHkgYmUgdXNlZCBvbiBpbnN0YW5jZSByb290IG5vZGVzLidcblx0ICAgICAgKVxuXHQgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIHRoaXMub3duZXIgPSB0aGlzLnZtLiRwYXJlbnRcblx0ICAgIHRoaXMub3duZXIuJFt0aGlzLmV4cHJlc3Npb25dID0gdGhpcy52bVxuXHQgIH0sXG5cblx0ICB1bmJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIGlmICh0aGlzLm93bmVyLiRbdGhpcy5leHByZXNzaW9uXSA9PT0gdGhpcy52bSkge1xuXHQgICAgICBkZWxldGUgdGhpcy5vd25lci4kW3RoaXMuZXhwcmVzc2lvbl1cblx0ICAgIH1cblx0ICB9XG5cdCAgXG5cdH1cblxuLyoqKi8gfSxcbi8qIDI5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgY29uZmlnID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMClcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBlbCA9IHRoaXMuZWxcblx0ICAgIHRoaXMudm0uJG9uY2UoJ2hvb2s6Y29tcGlsZWQnLCBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShjb25maWcucHJlZml4ICsgJ2Nsb2FrJylcblx0ICAgIH0pXG5cdCAgfVxuXG5cdH1cblxuLyoqKi8gfSxcbi8qIDMwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgcHJlZml4ZXMgPSBbJy13ZWJraXQtJywgJy1tb3otJywgJy1tcy0nXVxuXHR2YXIgaW1wb3J0YW50UkUgPSAvIWltcG9ydGFudDs/JC9cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBwcm9wID0gdGhpcy5hcmdcblx0ICAgIGlmICghcHJvcCkgcmV0dXJuXG5cdCAgICBpZiAocHJvcC5jaGFyQXQoMCkgPT09ICckJykge1xuXHQgICAgICAvLyBwcm9wZXJ0aWVzIHRoYXQgc3RhcnQgd2l0aCAkIHdpbGwgYmUgYXV0by1wcmVmaXhlZFxuXHQgICAgICBwcm9wID0gcHJvcC5zbGljZSgxKVxuXHQgICAgICB0aGlzLnByZWZpeGVkID0gdHJ1ZVxuXHQgICAgfVxuXHQgICAgdGhpcy5wcm9wID0gcHJvcFxuXHQgIH0sXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgdmFyIHByb3AgPSB0aGlzLnByb3Bcblx0ICAgIC8vIGNhc3QgcG9zc2libGUgbnVtYmVycy9ib29sZWFucyBpbnRvIHN0cmluZ3Ncblx0ICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG5cdCAgICAgIHZhbHVlICs9ICcnXG5cdCAgICB9XG5cdCAgICBpZiAocHJvcCkge1xuXHQgICAgICB2YXIgaXNJbXBvcnRhbnQgPSBpbXBvcnRhbnRSRS50ZXN0KHZhbHVlKVxuXHQgICAgICAgID8gJ2ltcG9ydGFudCdcblx0ICAgICAgICA6ICcnXG5cdCAgICAgIGlmIChpc0ltcG9ydGFudCkge1xuXHQgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShpbXBvcnRhbnRSRSwgJycpLnRyaW0oKVxuXHQgICAgICB9XG5cdCAgICAgIHRoaXMuZWwuc3R5bGUuc2V0UHJvcGVydHkocHJvcCwgdmFsdWUsIGlzSW1wb3J0YW50KVxuXHQgICAgICBpZiAodGhpcy5wcmVmaXhlZCkge1xuXHQgICAgICAgIHZhciBpID0gcHJlZml4ZXMubGVuZ3RoXG5cdCAgICAgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICAgICAgdGhpcy5lbC5zdHlsZS5zZXRQcm9wZXJ0eShcblx0ICAgICAgICAgICAgcHJlZml4ZXNbaV0gKyBwcm9wLFxuXHQgICAgICAgICAgICB2YWx1ZSxcblx0ICAgICAgICAgICAgaXNJbXBvcnRhbnRcblx0ICAgICAgICAgIClcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuZWwuc3R5bGUuY3NzVGV4dCA9IHZhbHVlXG5cdCAgICB9XG5cdCAgfVxuXG5cdH1cblxuLyoqKi8gfSxcbi8qIDMxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIHRlbXBsYXRlUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MSlcblx0dmFyIHRyYW5zaXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ1KVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgaXNMaXRlcmFsOiB0cnVlLFxuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIGVsID0gdGhpcy5lbFxuXHQgICAgdGhpcy5zdGFydCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3YtcGFydGlhbC1zdGFydCcpXG5cdCAgICB0aGlzLmVuZCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3YtcGFydGlhbC1lbmQnKVxuXHQgICAgaWYgKGVsLm5vZGVUeXBlICE9PSA4KSB7XG5cdCAgICAgIGVsLmlubmVySFRNTCA9ICcnXG5cdCAgICB9XG5cdCAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ1RFTVBMQVRFJyB8fCBlbC5ub2RlVHlwZSA9PT0gOCkge1xuXHQgICAgICBfLnJlcGxhY2UoZWwsIHRoaXMuZW5kKVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgZWwuYXBwZW5kQ2hpbGQodGhpcy5lbmQpXG5cdCAgICB9XG5cdCAgICBfLmJlZm9yZSh0aGlzLnN0YXJ0LCB0aGlzLmVuZClcblx0ICAgIGlmICghdGhpcy5faXNEeW5hbWljTGl0ZXJhbCkge1xuXHQgICAgICB0aGlzLmNvbXBpbGUodGhpcy5leHByZXNzaW9uKVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uIChpZCkge1xuXHQgICAgdGhpcy50ZWFyZG93bigpXG5cdCAgICB0aGlzLmNvbXBpbGUoaWQpXG5cdCAgfSxcblxuXHQgIGNvbXBpbGU6IGZ1bmN0aW9uIChpZCkge1xuXHQgICAgdmFyIHBhcnRpYWwgPSB0aGlzLnZtLiRvcHRpb25zLnBhcnRpYWxzW2lkXVxuXHQgICAgXy5hc3NlcnRBc3NldChwYXJ0aWFsLCAncGFydGlhbCcsIGlkKVxuXHQgICAgaWYgKCFwYXJ0aWFsKSB7XG5cdCAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgICAgdmFyIHZtID0gdGhpcy52bVxuXHQgICAgdmFyIGZyYWcgPSB0ZW1wbGF0ZVBhcnNlci5wYXJzZShwYXJ0aWFsLCB0cnVlKVxuXHQgICAgdmFyIGRlY29tcGlsZSA9IHZtLiRjb21waWxlKGZyYWcpXG5cdCAgICB0aGlzLmRlY29tcGlsZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgZGVjb21waWxlKClcblx0ICAgICAgdHJhbnNpdGlvbi5ibG9ja1JlbW92ZSh0aGlzLnN0YXJ0LCB0aGlzLmVuZCwgdm0pXG5cdCAgICB9XG5cdCAgICB0cmFuc2l0aW9uLmJsb2NrQXBwZW5kKGZyYWcsIHRoaXMuZW5kLCB2bSlcblx0ICB9LFxuXG5cdCAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcblx0ICAgIGlmICh0aGlzLmRlY29tcGlsZSkge1xuXHQgICAgICB0aGlzLmRlY29tcGlsZSgpXG5cdCAgICAgIHRoaXMuZGVjb21waWxlID0gbnVsbFxuXHQgICAgfVxuXHQgIH1cblxuXHR9XG5cbi8qKiovIH0sXG4vKiAzMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBwcmlvcml0eTogMTAwMCxcblx0ICBpc0xpdGVyYWw6IHRydWUsXG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB0aGlzLmVsLl9fdl90cmFucyA9IHtcblx0ICAgICAgaWQ6IHRoaXMuZXhwcmVzc2lvblxuXHQgICAgfVxuXHQgIH1cblxuXHR9XG5cbi8qKiovIH0sXG4vKiAzMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBhY2NlcHRTdGF0ZW1lbnQ6IHRydWUsXG5cdCAgcHJpb3JpdHk6IDcwMCxcblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIGRlYWwgd2l0aCBpZnJhbWVzXG5cdCAgICBpZiAoXG5cdCAgICAgIHRoaXMuZWwudGFnTmFtZSA9PT0gJ0lGUkFNRScgJiZcblx0ICAgICAgdGhpcy5hcmcgIT09ICdsb2FkJ1xuXHQgICAgKSB7XG5cdCAgICAgIHZhciBzZWxmID0gdGhpc1xuXHQgICAgICB0aGlzLmlmcmFtZUJpbmQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgXy5vbihzZWxmLmVsLmNvbnRlbnRXaW5kb3csIHNlbGYuYXJnLCBzZWxmLmhhbmRsZXIpXG5cdCAgICAgIH1cblx0ICAgICAgXy5vbih0aGlzLmVsLCAnbG9hZCcsIHRoaXMuaWZyYW1lQmluZClcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgdXBkYXRlOiBmdW5jdGlvbiAoaGFuZGxlcikge1xuXHQgICAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgIF8ud2Fybihcblx0ICAgICAgICAnRGlyZWN0aXZlIFwidi1vbjonICsgdGhpcy5leHByZXNzaW9uICsgJ1wiICcgK1xuXHQgICAgICAgICdleHBlY3RzIGEgZnVuY3Rpb24gdmFsdWUuJ1xuXHQgICAgICApXG5cdCAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgICAgdGhpcy5yZXNldCgpXG5cdCAgICB2YXIgdm0gPSB0aGlzLnZtXG5cdCAgICB0aGlzLmhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuXHQgICAgICBlLnRhcmdldFZNID0gdm1cblx0ICAgICAgdm0uJGV2ZW50ID0gZVxuXHQgICAgICB2YXIgcmVzID0gaGFuZGxlcihlKVxuXHQgICAgICB2bS4kZXZlbnQgPSBudWxsXG5cdCAgICAgIHJldHVybiByZXNcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLmlmcmFtZUJpbmQpIHtcblx0ICAgICAgdGhpcy5pZnJhbWVCaW5kKClcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIF8ub24odGhpcy5lbCwgdGhpcy5hcmcsIHRoaXMuaGFuZGxlcilcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBlbCA9IHRoaXMuaWZyYW1lQmluZFxuXHQgICAgICA/IHRoaXMuZWwuY29udGVudFdpbmRvd1xuXHQgICAgICA6IHRoaXMuZWxcblx0ICAgIGlmICh0aGlzLmhhbmRsZXIpIHtcblx0ICAgICAgXy5vZmYoZWwsIHRoaXMuYXJnLCB0aGlzLmhhbmRsZXIpXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdGhpcy5yZXNldCgpXG5cdCAgICBfLm9mZih0aGlzLmVsLCAnbG9hZCcsIHRoaXMuaWZyYW1lQmluZClcblx0ICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDM0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIHRlbXBsYXRlUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MSlcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIGlzTGl0ZXJhbDogdHJ1ZSxcblxuXHQgIC8qKlxuXHQgICAqIFNldHVwLiBUd28gcG9zc2libGUgdXNhZ2VzOlxuXHQgICAqXG5cdCAgICogLSBzdGF0aWM6XG5cdCAgICogICB2LWNvbXBvbmVudD1cImNvbXBcIlxuXHQgICAqXG5cdCAgICogLSBkeW5hbWljOlxuXHQgICAqICAgdi1jb21wb25lbnQ9XCJ7e2N1cnJlbnRWaWV3fX1cIlxuXHQgICAqL1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgaWYgKCF0aGlzLmVsLl9fdnVlX18pIHtcblx0ICAgICAgLy8gY3JlYXRlIGEgcmVmIGFuY2hvclxuXHQgICAgICB0aGlzLnJlZiA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3YtY29tcG9uZW50Jylcblx0ICAgICAgXy5yZXBsYWNlKHRoaXMuZWwsIHRoaXMucmVmKVxuXHQgICAgICAvLyBjaGVjayBrZWVwLWFsaXZlIG9wdGlvbnNcblx0ICAgICAgdGhpcy5jaGVja0tlZXBBbGl2ZSgpXG5cdCAgICAgIC8vIGNoZWNrIHBhcmVudCBkaXJlY3RpdmVzXG5cdCAgICAgIHRoaXMucGFyZW50TGlua2VyID0gdGhpcy5lbC5fcGFyZW50TGlua2VyXG5cdCAgICAgIC8vIGlmIHN0YXRpYywgYnVpbGQgcmlnaHQgbm93LlxuXHQgICAgICBpZiAoIXRoaXMuX2lzRHluYW1pY0xpdGVyYWwpIHtcblx0ICAgICAgICB0aGlzLnJlc29sdmVDdG9yKHRoaXMuZXhwcmVzc2lvbilcblx0ICAgICAgICB0aGlzLmJ1aWxkKClcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgXy53YXJuKFxuXHQgICAgICAgICd2LWNvbXBvbmVudD1cIicgKyB0aGlzLmV4cHJlc3Npb24gKyAnXCIgY2Fubm90IGJlICcgK1xuXHQgICAgICAgICd1c2VkIG9uIGFuIGFscmVhZHkgbW91bnRlZCBpbnN0YW5jZS4nXG5cdCAgICAgIClcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogQ2hlY2sgaWYgdGhlIFwia2VlcC1hbGl2ZVwiIGZsYWcgaXMgcHJlc2VudC5cblx0ICAgKiBJZiB5ZXMsIGluc3RlYWQgb2YgZGVzdHJveWluZyB0aGUgYWN0aXZlIHZtIHdoZW5cblx0ICAgKiBoaWRpbmcgKHYtaWYpIG9yIHN3aXRjaGluZyAoZHluYW1pYyBsaXRlcmFsKSBpdCxcblx0ICAgKiB3ZSBzaW1wbHkgcmVtb3ZlIGl0IGZyb20gdGhlIERPTSBhbmQgc2F2ZSBpdCBpbiBhXG5cdCAgICogY2FjaGUgb2JqZWN0LCB3aXRoIGl0cyBjb25zdHJ1Y3RvciBpZCBhcyB0aGUga2V5LlxuXHQgICAqL1xuXG5cdCAgY2hlY2tLZWVwQWxpdmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIGNoZWNrIGtlZXAtYWxpdmUgZmxhZ1xuXHQgICAgdGhpcy5rZWVwQWxpdmUgPSB0aGlzLmVsLmhhc0F0dHJpYnV0ZSgna2VlcC1hbGl2ZScpXG5cdCAgICBpZiAodGhpcy5rZWVwQWxpdmUpIHtcblx0ICAgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoJ2tlZXAtYWxpdmUnKVxuXHQgICAgICB0aGlzLmNhY2hlID0ge31cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogUmVzb2x2ZSB0aGUgY29tcG9uZW50IGNvbnN0cnVjdG9yIHRvIHVzZSB3aGVuIGNyZWF0aW5nXG5cdCAgICogdGhlIGNoaWxkIHZtLlxuXHQgICAqL1xuXG5cdCAgcmVzb2x2ZUN0b3I6IGZ1bmN0aW9uIChpZCkge1xuXHQgICAgdGhpcy5jdG9ySWQgPSBpZFxuXHQgICAgdGhpcy5DdG9yID0gdGhpcy52bS4kb3B0aW9ucy5jb21wb25lbnRzW2lkXVxuXHQgICAgXy5hc3NlcnRBc3NldCh0aGlzLkN0b3IsICdjb21wb25lbnQnLCBpZClcblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogSW5zdGFudGlhdGUvaW5zZXJ0IGEgbmV3IGNoaWxkIHZtLlxuXHQgICAqIElmIGtlZXAgYWxpdmUgYW5kIGhhcyBjYWNoZWQgaW5zdGFuY2UsIGluc2VydCB0aGF0XG5cdCAgICogaW5zdGFuY2U7IG90aGVyd2lzZSBidWlsZCBhIG5ldyBvbmUgYW5kIGNhY2hlIGl0LlxuXHQgICAqL1xuXG5cdCAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIGlmICh0aGlzLmtlZXBBbGl2ZSkge1xuXHQgICAgICB2YXIgY2FjaGVkID0gdGhpcy5jYWNoZVt0aGlzLmN0b3JJZF1cblx0ICAgICAgaWYgKGNhY2hlZCkge1xuXHQgICAgICAgIHRoaXMuY2hpbGRWTSA9IGNhY2hlZFxuXHQgICAgICAgIGNhY2hlZC4kYmVmb3JlKHRoaXMucmVmKVxuXHQgICAgICAgIHJldHVyblxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICB2YXIgdm0gPSB0aGlzLnZtXG5cdCAgICBpZiAodGhpcy5DdG9yICYmICF0aGlzLmNoaWxkVk0pIHtcblx0ICAgICAgdGhpcy5jaGlsZFZNID0gdm0uJGFkZENoaWxkKHtcblx0ICAgICAgICBlbDogdGVtcGxhdGVQYXJzZXIuY2xvbmUodGhpcy5lbClcblx0ICAgICAgfSwgdGhpcy5DdG9yKVxuXHQgICAgICBpZiAodGhpcy5wYXJlbnRMaW5rZXIpIHtcblx0ICAgICAgICB2YXIgZGlyQ291bnQgPSB2bS5fZGlyZWN0aXZlcy5sZW5ndGhcblx0ICAgICAgICB2YXIgdGFyZ2V0Vk0gPSB0aGlzLmNoaWxkVk0uJG9wdGlvbnMuaW5oZXJpdFxuXHQgICAgICAgICAgPyB0aGlzLmNoaWxkVk1cblx0ICAgICAgICAgIDogdm1cblx0ICAgICAgICB0aGlzLnBhcmVudExpbmtlcih0YXJnZXRWTSwgdGhpcy5jaGlsZFZNLiRlbClcblx0ICAgICAgICB0aGlzLnBhcmVudERpcnMgPSB2bS5fZGlyZWN0aXZlcy5zbGljZShkaXJDb3VudClcblx0ICAgICAgfVxuXHQgICAgICBpZiAodGhpcy5rZWVwQWxpdmUpIHtcblx0ICAgICAgICB0aGlzLmNhY2hlW3RoaXMuY3RvcklkXSA9IHRoaXMuY2hpbGRWTVxuXHQgICAgICB9XG5cdCAgICAgIHRoaXMuY2hpbGRWTS4kYmVmb3JlKHRoaXMucmVmKVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBUZWFyZG93biB0aGUgYWN0aXZlIHZtLlxuXHQgICAqIElmIGtlZXAgYWxpdmUsIHNpbXBseSByZW1vdmUgaXQ7IG90aGVyd2lzZSBkZXN0cm95IGl0LlxuXHQgICAqXG5cdCAgICogQHBhcmFtIHtCb29sZWFufSByZW1vdmVcblx0ICAgKi9cblxuXHQgIHVuYnVpbGQ6IGZ1bmN0aW9uIChyZW1vdmUpIHtcblx0ICAgIHZhciBjaGlsZCA9IHRoaXMuY2hpbGRWTVxuXHQgICAgaWYgKCFjaGlsZCkge1xuXHQgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLmtlZXBBbGl2ZSkge1xuXHQgICAgICBpZiAocmVtb3ZlKSB7XG5cdCAgICAgICAgY2hpbGQuJHJlbW92ZSgpXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGNoaWxkLiRkZXN0cm95KHJlbW92ZSlcblx0ICAgICAgdmFyIHBhcmVudERpcnMgPSB0aGlzLnBhcmVudERpcnNcblx0ICAgICAgaWYgKHBhcmVudERpcnMpIHtcblx0ICAgICAgICB2YXIgaSA9IHBhcmVudERpcnMubGVuZ3RoXG5cdCAgICAgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICAgICAgcGFyZW50RGlyc1tpXS5fdGVhcmRvd24oKVxuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgdGhpcy5jaGlsZFZNID0gbnVsbFxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBVcGRhdGUgY2FsbGJhY2sgZm9yIHRoZSBkeW5hbWljIGxpdGVyYWwgc2NlbmFyaW8sXG5cdCAgICogZS5nLiB2LWNvbXBvbmVudD1cInt7dmlld319XCJcblx0ICAgKi9cblxuXHQgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICB0aGlzLnVuYnVpbGQodHJ1ZSlcblx0ICAgIGlmICh2YWx1ZSkge1xuXHQgICAgICB0aGlzLnJlc29sdmVDdG9yKHZhbHVlKVxuXHQgICAgICB0aGlzLmJ1aWxkKClcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogVW5iaW5kLlxuXHQgICAqIE1ha2Ugc3VyZSBrZWVwQWxpdmUgaXMgc2V0IHRvIGZhbHNlIHNvIHRoYXQgdGhlXG5cdCAgICogaW5zdGFuY2UgaXMgYWx3YXlzIGRlc3Ryb3llZC5cblx0ICAgKi9cblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdGhpcy5rZWVwQWxpdmUgPSBmYWxzZVxuXHQgICAgdGhpcy51bmJ1aWxkKClcblx0ICB9XG5cblx0fVxuXG4vKioqLyB9LFxuLyogMzUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgaXNPYmplY3QgPSBfLmlzT2JqZWN0XG5cdHZhciB0ZXh0UGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Milcblx0dmFyIGV4cFBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNDQpXG5cdHZhciB0ZW1wbGF0ZVBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNTEpXG5cdHZhciBjb21waWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Nilcblx0dmFyIHRyYW5zY2x1ZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ3KVxuXHR2YXIgbWVyZ2VPcHRpb25zID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSlcblx0dmFyIHVpZCA9IDBcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIC8qKlxuXHQgICAqIFNldHVwLlxuXHQgICAqL1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gdWlkIGFzIGEgY2FjaGUgaWRlbnRpZmllclxuXHQgICAgdGhpcy5pZCA9ICdfX3ZfcmVwZWF0XycgKyAoKyt1aWQpXG5cdCAgICAvLyB3ZSBuZWVkIHRvIGluc2VydCB0aGUgb2JqVG9BcnJheSBjb252ZXJ0ZXJcblx0ICAgIC8vIGFzIHRoZSBmaXJzdCByZWFkIGZpbHRlci5cblx0ICAgIGlmICghdGhpcy5maWx0ZXJzKSB7XG5cdCAgICAgIHRoaXMuZmlsdGVycyA9IHt9XG5cdCAgICB9XG5cdCAgICAvLyBhZGQgdGhlIG9iamVjdCAtPiBhcnJheSBjb252ZXJ0IGZpbHRlclxuXHQgICAgdmFyIG9iamVjdENvbnZlcnRlciA9IF8uYmluZChvYmpUb0FycmF5LCB0aGlzKVxuXHQgICAgaWYgKCF0aGlzLmZpbHRlcnMucmVhZCkge1xuXHQgICAgICB0aGlzLmZpbHRlcnMucmVhZCA9IFtvYmplY3RDb252ZXJ0ZXJdXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLmZpbHRlcnMucmVhZC51bnNoaWZ0KG9iamVjdENvbnZlcnRlcilcblx0ICAgIH1cblx0ICAgIC8vIHNldHVwIHJlZiBub2RlXG5cdCAgICB0aGlzLnJlZiA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3YtcmVwZWF0Jylcblx0ICAgIF8ucmVwbGFjZSh0aGlzLmVsLCB0aGlzLnJlZilcblx0ICAgIC8vIGNoZWNrIGlmIHRoaXMgaXMgYSBibG9jayByZXBlYXRcblx0ICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLmVsLnRhZ05hbWUgPT09ICdURU1QTEFURSdcblx0ICAgICAgPyB0ZW1wbGF0ZVBhcnNlci5wYXJzZSh0aGlzLmVsLCB0cnVlKVxuXHQgICAgICA6IHRoaXMuZWxcblx0ICAgIC8vIGNoZWNrIG90aGVyIGRpcmVjdGl2ZXMgdGhhdCBuZWVkIHRvIGJlIGhhbmRsZWRcblx0ICAgIC8vIGF0IHYtcmVwZWF0IGxldmVsXG5cdCAgICB0aGlzLmNoZWNrSWYoKVxuXHQgICAgdGhpcy5jaGVja1JlZigpXG5cdCAgICB0aGlzLmNoZWNrVHJhY2tCeUlkKClcblx0ICAgIHRoaXMuY2hlY2tDb21wb25lbnQoKVxuXHQgICAgLy8gY2FjaGUgZm9yIHByaW1pdGl2ZSB2YWx1ZSBpbnN0YW5jZXNcblx0ICAgIHRoaXMuY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIFdhcm4gYWdhaW5zdCB2LWlmIHVzYWdlLlxuXHQgICAqL1xuXG5cdCAgY2hlY2tJZjogZnVuY3Rpb24gKCkge1xuXHQgICAgaWYgKF8uYXR0cih0aGlzLmVsLCAnaWYnKSAhPT0gbnVsbCkge1xuXHQgICAgICBfLndhcm4oXG5cdCAgICAgICAgJ0RvblxcJ3QgdXNlIHYtaWYgd2l0aCB2LXJlcGVhdC4gJyArXG5cdCAgICAgICAgJ1VzZSB2LXNob3cgb3IgdGhlIFwiZmlsdGVyQnlcIiBmaWx0ZXIgaW5zdGVhZC4nXG5cdCAgICAgIClcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogQ2hlY2sgaWYgdi1yZWYvIHYtZWwgaXMgYWxzbyBwcmVzZW50LlxuXHQgICAqL1xuXG5cdCAgY2hlY2tSZWY6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBjaGlsZElkID0gXy5hdHRyKHRoaXMuZWwsICdyZWYnKVxuXHQgICAgdGhpcy5jaGlsZElkID0gY2hpbGRJZFxuXHQgICAgICA/IHRoaXMudm0uJGludGVycG9sYXRlKGNoaWxkSWQpXG5cdCAgICAgIDogbnVsbFxuXHQgICAgdmFyIGVsSWQgPSBfLmF0dHIodGhpcy5lbCwgJ2VsJylcblx0ICAgIHRoaXMuZWxJZCA9IGVsSWRcblx0ICAgICAgPyB0aGlzLnZtLiRpbnRlcnBvbGF0ZShlbElkKVxuXHQgICAgICA6IG51bGxcblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogQ2hlY2sgZm9yIGEgdHJhY2stYnkgSUQsIHdoaWNoIGFsbG93cyB1cyB0byBpZGVudGlmeVxuXHQgICAqIGEgcGllY2Ugb2YgZGF0YSBhbmQgaXRzIGFzc29jaWF0ZWQgaW5zdGFuY2UgYnkgaXRzXG5cdCAgICogdW5pcXVlIGlkLlxuXHQgICAqL1xuXG5cdCAgY2hlY2tUcmFja0J5SWQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHRoaXMuaWRLZXkgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZSgndHJhY2tieScpXG5cdCAgICBpZiAodGhpcy5pZEtleSAhPT0gbnVsbCkge1xuXHQgICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSgndHJhY2tieScpXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIENoZWNrIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgdG8gdXNlIGZvciByZXBlYXRlZFxuXHQgICAqIGluc3RhbmNlcy4gSWYgc3RhdGljIHdlIHJlc29sdmUgaXQgbm93LCBvdGhlcndpc2UgaXRcblx0ICAgKiBuZWVkcyB0byBiZSByZXNvbHZlZCBhdCBidWlsZCB0aW1lIHdpdGggYWN0dWFsIGRhdGEuXG5cdCAgICovXG5cblx0ICBjaGVja0NvbXBvbmVudDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIGlkID0gXy5hdHRyKHRoaXMuZWwsICdjb21wb25lbnQnKVxuXHQgICAgdmFyIG9wdGlvbnMgPSB0aGlzLnZtLiRvcHRpb25zXG5cdCAgICBpZiAoIWlkKSB7XG5cdCAgICAgIHRoaXMuQ3RvciA9IF8uVnVlIC8vIGRlZmF1bHQgY29uc3RydWN0b3Jcblx0ICAgICAgdGhpcy5pbmhlcml0ID0gdHJ1ZSAvLyBpbmxpbmUgcmVwZWF0cyBzaG91bGQgaW5oZXJpdFxuXHQgICAgICAvLyBpbXBvcnRhbnQ6IHRyYW5zY2x1ZGUgd2l0aCBubyBvcHRpb25zLCBqdXN0XG5cdCAgICAgIC8vIHRvIGVuc3VyZSBibG9jayBzdGFydCBhbmQgYmxvY2sgZW5kXG5cdCAgICAgIHRoaXMudGVtcGxhdGUgPSB0cmFuc2NsdWRlKHRoaXMudGVtcGxhdGUpXG5cdCAgICAgIHRoaXMuX2xpbmtlciA9IGNvbXBpbGUodGhpcy50ZW1wbGF0ZSwgb3B0aW9ucylcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHZhciB0b2tlbnMgPSB0ZXh0UGFyc2VyLnBhcnNlKGlkKVxuXHQgICAgICBpZiAoIXRva2VucykgeyAvLyBzdGF0aWMgY29tcG9uZW50XG5cdCAgICAgICAgdmFyIEN0b3IgPSB0aGlzLkN0b3IgPSBvcHRpb25zLmNvbXBvbmVudHNbaWRdXG5cdCAgICAgICAgXy5hc3NlcnRBc3NldChDdG9yLCAnY29tcG9uZW50JywgaWQpXG5cdCAgICAgICAgaWYgKEN0b3IpIHtcblx0ICAgICAgICAgIC8vIG1lcmdlIGFuIGVtcHR5IG9iamVjdCB3aXRoIG93bmVyIHZtIGFzIHBhcmVudFxuXHQgICAgICAgICAgLy8gc28gY2hpbGQgdm1zIGNhbiBhY2Nlc3MgcGFyZW50IGFzc2V0cy5cblx0ICAgICAgICAgIHZhciBtZXJnZWQgPSBtZXJnZU9wdGlvbnMoXG5cdCAgICAgICAgICAgIEN0b3Iub3B0aW9ucyxcblx0ICAgICAgICAgICAge30sXG5cdCAgICAgICAgICAgIHsgJHBhcmVudDogdGhpcy52bSB9XG5cdCAgICAgICAgICApXG5cdCAgICAgICAgICB0aGlzLnRlbXBsYXRlID0gdHJhbnNjbHVkZSh0aGlzLnRlbXBsYXRlLCBtZXJnZWQpXG5cdCAgICAgICAgICB0aGlzLl9saW5rZXIgPSBjb21waWxlKHRoaXMudGVtcGxhdGUsIG1lcmdlZClcblx0ICAgICAgICB9XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgLy8gdG8gYmUgcmVzb2x2ZWQgbGF0ZXJcblx0ICAgICAgICB2YXIgY3RvckV4cCA9IHRleHRQYXJzZXIudG9rZW5zVG9FeHAodG9rZW5zKVxuXHQgICAgICAgIHRoaXMuY3RvckdldHRlciA9IGV4cFBhcnNlci5wYXJzZShjdG9yRXhwKS5nZXRcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBVcGRhdGUuXG5cdCAgICogVGhpcyBpcyBjYWxsZWQgd2hlbmV2ZXIgdGhlIEFycmF5IG11dGF0ZXMuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhXG5cdCAgICovXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdudW1iZXInKSB7XG5cdCAgICAgIGRhdGEgPSByYW5nZShkYXRhKVxuXHQgICAgfVxuXHQgICAgdGhpcy52bXMgPSB0aGlzLmRpZmYoZGF0YSB8fCBbXSwgdGhpcy52bXMpXG5cdCAgICAvLyB1cGRhdGUgdi1yZWZcblx0ICAgIGlmICh0aGlzLmNoaWxkSWQpIHtcblx0ICAgICAgdGhpcy52bS4kW3RoaXMuY2hpbGRJZF0gPSB0aGlzLnZtc1xuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMuZWxJZCkge1xuXHQgICAgICB0aGlzLnZtLiQkW3RoaXMuZWxJZF0gPSB0aGlzLnZtcy5tYXAoZnVuY3Rpb24gKHZtKSB7XG5cdCAgICAgICAgcmV0dXJuIHZtLiRlbFxuXHQgICAgICB9KVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBEaWZmLCBiYXNlZCBvbiBuZXcgZGF0YSBhbmQgb2xkIGRhdGEsIGRldGVybWluZSB0aGVcblx0ICAgKiBtaW5pbXVtIGFtb3VudCBvZiBET00gbWFuaXB1bGF0aW9ucyBuZWVkZWQgdG8gbWFrZSB0aGVcblx0ICAgKiBET00gcmVmbGVjdCB0aGUgbmV3IGRhdGEgQXJyYXkuXG5cdCAgICpcblx0ICAgKiBUaGUgYWxnb3JpdGhtIGRpZmZzIHRoZSBuZXcgZGF0YSBBcnJheSBieSBzdG9yaW5nIGFcblx0ICAgKiBoaWRkZW4gcmVmZXJlbmNlIHRvIGFuIG93bmVyIHZtIGluc3RhbmNlIG9uIHByZXZpb3VzbHlcblx0ICAgKiBzZWVuIGRhdGEuIFRoaXMgYWxsb3dzIHVzIHRvIGFjaGlldmUgTyhuKSB3aGljaCBpc1xuXHQgICAqIGJldHRlciB0aGFuIGEgbGV2ZW5zaHRlaW4gZGlzdGFuY2UgYmFzZWQgYWxnb3JpdGhtLFxuXHQgICAqIHdoaWNoIGlzIE8obSAqIG4pLlxuXHQgICAqXG5cdCAgICogQHBhcmFtIHtBcnJheX0gZGF0YVxuXHQgICAqIEBwYXJhbSB7QXJyYXl9IG9sZFZtc1xuXHQgICAqIEByZXR1cm4ge0FycmF5fVxuXHQgICAqL1xuXG5cdCAgZGlmZjogZnVuY3Rpb24gKGRhdGEsIG9sZFZtcykge1xuXHQgICAgdmFyIGlkS2V5ID0gdGhpcy5pZEtleVxuXHQgICAgdmFyIGNvbnZlcnRlZCA9IHRoaXMuY29udmVydGVkXG5cdCAgICB2YXIgcmVmID0gdGhpcy5yZWZcblx0ICAgIHZhciBhbGlhcyA9IHRoaXMuYXJnXG5cdCAgICB2YXIgaW5pdCA9ICFvbGRWbXNcblx0ICAgIHZhciB2bXMgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgpXG5cdCAgICB2YXIgb2JqLCByYXcsIHZtLCBpLCBsXG5cdCAgICAvLyBGaXJzdCBwYXNzLCBnbyB0aHJvdWdoIHRoZSBuZXcgQXJyYXkgYW5kIGZpbGwgdXBcblx0ICAgIC8vIHRoZSBuZXcgdm1zIGFycmF5LiBJZiBhIHBpZWNlIG9mIGRhdGEgaGFzIGEgY2FjaGVkXG5cdCAgICAvLyBpbnN0YW5jZSBmb3IgaXQsIHdlIHJldXNlIGl0LiBPdGhlcndpc2UgYnVpbGQgYSBuZXdcblx0ICAgIC8vIGluc3RhbmNlLlxuXHQgICAgZm9yIChpID0gMCwgbCA9IGRhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIG9iaiA9IGRhdGFbaV1cblx0ICAgICAgcmF3ID0gY29udmVydGVkID8gb2JqLnZhbHVlIDogb2JqXG5cdCAgICAgIHZtID0gIWluaXQgJiYgdGhpcy5nZXRWbShyYXcpXG5cdCAgICAgIGlmICh2bSkgeyAvLyByZXVzYWJsZSBpbnN0YW5jZVxuXHQgICAgICAgIHZtLl9yZXVzZWQgPSB0cnVlXG5cdCAgICAgICAgdm0uJGluZGV4ID0gaSAvLyB1cGRhdGUgJGluZGV4XG5cdCAgICAgICAgaWYgKGNvbnZlcnRlZCkge1xuXHQgICAgICAgICAgdm0uJGtleSA9IG9iai5rZXkgLy8gdXBkYXRlICRrZXlcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGlkS2V5KSB7IC8vIHN3YXAgdHJhY2sgYnkgaWQgZGF0YVxuXHQgICAgICAgICAgaWYgKGFsaWFzKSB7XG5cdCAgICAgICAgICAgIHZtW2FsaWFzXSA9IHJhd1xuXHQgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgdm0uX3NldERhdGEocmF3KVxuXHQgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgfSBlbHNlIHsgLy8gbmV3IGluc3RhbmNlXG5cdCAgICAgICAgdm0gPSB0aGlzLmJ1aWxkKG9iaiwgaSlcblx0ICAgICAgICB2bS5fbmV3ID0gdHJ1ZVxuXHQgICAgICB9XG5cdCAgICAgIHZtc1tpXSA9IHZtXG5cdCAgICAgIC8vIGluc2VydCBpZiB0aGlzIGlzIGZpcnN0IHJ1blxuXHQgICAgICBpZiAoaW5pdCkge1xuXHQgICAgICAgIHZtLiRiZWZvcmUocmVmKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICAvLyBpZiB0aGlzIGlzIHRoZSBmaXJzdCBydW4sIHdlJ3JlIGRvbmUuXG5cdCAgICBpZiAoaW5pdCkge1xuXHQgICAgICByZXR1cm4gdm1zXG5cdCAgICB9XG5cdCAgICAvLyBTZWNvbmQgcGFzcywgZ28gdGhyb3VnaCB0aGUgb2xkIHZtIGluc3RhbmNlcyBhbmRcblx0ICAgIC8vIGRlc3Ryb3kgdGhvc2Ugd2hvIGFyZSBub3QgcmV1c2VkIChhbmQgcmVtb3ZlIHRoZW1cblx0ICAgIC8vIGZyb20gY2FjaGUpXG5cdCAgICBmb3IgKGkgPSAwLCBsID0gb2xkVm1zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgICB2bSA9IG9sZFZtc1tpXVxuXHQgICAgICBpZiAoIXZtLl9yZXVzZWQpIHtcblx0ICAgICAgICB0aGlzLnVuY2FjaGVWbSh2bSlcblx0ICAgICAgICB2bS4kZGVzdHJveSh0cnVlKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICAvLyBmaW5hbCBwYXNzLCBtb3ZlL2luc2VydCBuZXcgaW5zdGFuY2VzIGludG8gdGhlXG5cdCAgICAvLyByaWdodCBwbGFjZS4gV2UncmUgZ29pbmcgaW4gcmV2ZXJzZSBoZXJlIGJlY2F1c2Vcblx0ICAgIC8vIGluc2VydEJlZm9yZSByZWxpZXMgb24gdGhlIG5leHQgc2libGluZyB0byBiZVxuXHQgICAgLy8gcmVzb2x2ZWQuXG5cdCAgICB2YXIgdGFyZ2V0TmV4dCwgY3VycmVudE5leHRcblx0ICAgIGkgPSB2bXMubGVuZ3RoXG5cdCAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgIHZtID0gdm1zW2ldXG5cdCAgICAgIC8vIHRoaXMgaXMgdGhlIHZtIHRoYXQgd2Ugc2hvdWxkIGJlIGluIGZyb250IG9mXG5cdCAgICAgIHRhcmdldE5leHQgPSB2bXNbaSArIDFdXG5cdCAgICAgIGlmICghdGFyZ2V0TmV4dCkge1xuXHQgICAgICAgIC8vIFRoaXMgaXMgdGhlIGxhc3QgaXRlbS4gSWYgaXQncyByZXVzZWQgdGhlblxuXHQgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZWxzZSB3aWxsIGV2ZW50dWFsbHkgYmUgaW4gdGhlIHJpZ2h0XG5cdCAgICAgICAgLy8gcGxhY2UsIHNvIG5vIG5lZWQgdG8gdG91Y2ggaXQuIE90aGVyd2lzZSwgaW5zZXJ0XG5cdCAgICAgICAgLy8gaXQuXG5cdCAgICAgICAgaWYgKCF2bS5fcmV1c2VkKSB7XG5cdCAgICAgICAgICB2bS4kYmVmb3JlKHJlZilcblx0ICAgICAgICB9XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgaWYgKHZtLl9yZXVzZWQpIHtcblx0ICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHZtIHdlIGFyZSBhY3R1YWxseSBpbiBmcm9udCBvZlxuXHQgICAgICAgICAgY3VycmVudE5leHQgPSBmaW5kTmV4dFZtKHZtLCByZWYpXG5cdCAgICAgICAgICAvLyB3ZSBvbmx5IG5lZWQgdG8gbW92ZSBpZiB3ZSBhcmUgbm90IGluIHRoZSByaWdodFxuXHQgICAgICAgICAgLy8gcGxhY2UgYWxyZWFkeS5cblx0ICAgICAgICAgIGlmIChjdXJyZW50TmV4dCAhPT0gdGFyZ2V0TmV4dCkge1xuXHQgICAgICAgICAgICB2bS4kYmVmb3JlKHRhcmdldE5leHQuJGVsLCBudWxsLCBmYWxzZSlcblx0ICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgLy8gbmV3IGluc3RhbmNlLCBpbnNlcnQgdG8gZXhpc3RpbmcgbmV4dFxuXHQgICAgICAgICAgdm0uJGJlZm9yZSh0YXJnZXROZXh0LiRlbClcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgICAgdm0uX25ldyA9IGZhbHNlXG5cdCAgICAgIHZtLl9yZXVzZWQgPSBmYWxzZVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHZtc1xuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBCdWlsZCBhIG5ldyBpbnN0YW5jZSBhbmQgY2FjaGUgaXQuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuXHQgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuXHQgICAqL1xuXG5cdCAgYnVpbGQ6IGZ1bmN0aW9uIChkYXRhLCBpbmRleCkge1xuXHQgICAgdmFyIG9yaWdpbmFsID0gZGF0YVxuXHQgICAgdmFyIG1ldGEgPSB7ICRpbmRleDogaW5kZXggfVxuXHQgICAgaWYgKHRoaXMuY29udmVydGVkKSB7XG5cdCAgICAgIG1ldGEuJGtleSA9IG9yaWdpbmFsLmtleVxuXHQgICAgfVxuXHQgICAgdmFyIHJhdyA9IHRoaXMuY29udmVydGVkID8gZGF0YS52YWx1ZSA6IGRhdGFcblx0ICAgIHZhciBhbGlhcyA9IHRoaXMuYXJnXG5cdCAgICB2YXIgaGFzQWxpYXMgPSAhaXNPYmplY3QocmF3KSB8fCBhbGlhc1xuXHQgICAgLy8gd3JhcCB0aGUgcmF3IGRhdGEgd2l0aCBhbGlhc1xuXHQgICAgZGF0YSA9IGhhc0FsaWFzID8ge30gOiByYXdcblx0ICAgIGlmIChhbGlhcykge1xuXHQgICAgICBkYXRhW2FsaWFzXSA9IHJhd1xuXHQgICAgfSBlbHNlIGlmIChoYXNBbGlhcykge1xuXHQgICAgICBtZXRhLiR2YWx1ZSA9IHJhd1xuXHQgICAgfVxuXHQgICAgLy8gcmVzb2x2ZSBjb25zdHJ1Y3RvclxuXHQgICAgdmFyIEN0b3IgPSB0aGlzLkN0b3IgfHwgdGhpcy5yZXNvbHZlQ3RvcihkYXRhLCBtZXRhKVxuXHQgICAgdmFyIHZtID0gdGhpcy52bS4kYWRkQ2hpbGQoe1xuXHQgICAgICBlbDogdGVtcGxhdGVQYXJzZXIuY2xvbmUodGhpcy50ZW1wbGF0ZSksXG5cdCAgICAgIF9saW5rZXI6IHRoaXMuX2xpbmtlcixcblx0ICAgICAgX21ldGE6IG1ldGEsXG5cdCAgICAgIGRhdGE6IGRhdGEsXG5cdCAgICAgIGluaGVyaXQ6IHRoaXMuaW5oZXJpdFxuXHQgICAgfSwgQ3Rvcilcblx0ICAgIC8vIGNhY2hlIGluc3RhbmNlXG5cdCAgICB0aGlzLmNhY2hlVm0ocmF3LCB2bSlcblx0ICAgIHJldHVybiB2bVxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBSZXNvbHZlIGEgY29udHJ1Y3RvciB0byB1c2UgZm9yIGFuIGluc3RhbmNlLlxuXHQgICAqIFRoZSB0cmlja3kgcGFydCBoZXJlIGlzIHRoYXQgdGhlcmUgY291bGQgYmUgZHluYW1pY1xuXHQgICAqIGNvbXBvbmVudHMgZGVwZW5kaW5nIG9uIGluc3RhbmNlIGRhdGEuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuXHQgICAqIEBwYXJhbSB7T2JqZWN0fSBtZXRhXG5cdCAgICogQHJldHVybiB7RnVuY3Rpb259XG5cdCAgICovXG5cblx0ICByZXNvbHZlQ3RvcjogZnVuY3Rpb24gKGRhdGEsIG1ldGEpIHtcblx0ICAgIC8vIGNyZWF0ZSBhIHRlbXBvcmFyeSBjb250ZXh0IG9iamVjdCBhbmQgY29weSBkYXRhXG5cdCAgICAvLyBhbmQgbWV0YSBwcm9wZXJ0aWVzIG9udG8gaXQuXG5cdCAgICAvLyB1c2UgXy5kZWZpbmUgdG8gYXZvaWQgYWNjaWRlbnRhbGx5IG92ZXJ3cml0aW5nIHNjb3BlXG5cdCAgICAvLyBwcm9wZXJ0aWVzLlxuXHQgICAgdmFyIGNvbnRleHQgPSBPYmplY3QuY3JlYXRlKHRoaXMudm0pXG5cdCAgICB2YXIga2V5XG5cdCAgICBmb3IgKGtleSBpbiBkYXRhKSB7XG5cdCAgICAgIF8uZGVmaW5lKGNvbnRleHQsIGtleSwgZGF0YVtrZXldKVxuXHQgICAgfVxuXHQgICAgZm9yIChrZXkgaW4gbWV0YSkge1xuXHQgICAgICBfLmRlZmluZShjb250ZXh0LCBrZXksIG1ldGFba2V5XSlcblx0ICAgIH1cblx0ICAgIHZhciBpZCA9IHRoaXMuY3RvckdldHRlci5jYWxsKGNvbnRleHQsIGNvbnRleHQpXG5cdCAgICB2YXIgQ3RvciA9IHRoaXMudm0uJG9wdGlvbnMuY29tcG9uZW50c1tpZF1cblx0ICAgIF8uYXNzZXJ0QXNzZXQoQ3RvciwgJ2NvbXBvbmVudCcsIGlkKVxuXHQgICAgcmV0dXJuIEN0b3Jcblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogVW5iaW5kLCB0ZWFyZG93biBldmVyeXRoaW5nXG5cdCAgICovXG5cblx0ICB1bmJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIGlmICh0aGlzLmNoaWxkSWQpIHtcblx0ICAgICAgZGVsZXRlIHRoaXMudm0uJFt0aGlzLmNoaWxkSWRdXG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy52bXMpIHtcblx0ICAgICAgdmFyIGkgPSB0aGlzLnZtcy5sZW5ndGhcblx0ICAgICAgdmFyIHZtXG5cdCAgICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgICB2bSA9IHRoaXMudm1zW2ldXG5cdCAgICAgICAgdGhpcy51bmNhY2hlVm0odm0pXG5cdCAgICAgICAgdm0uJGRlc3Ryb3koKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIENhY2hlIGEgdm0gaW5zdGFuY2UgYmFzZWQgb24gaXRzIGRhdGEuXG5cdCAgICpcblx0ICAgKiBJZiB0aGUgZGF0YSBpcyBhbiBvYmplY3QsIHdlIHNhdmUgdGhlIHZtJ3MgcmVmZXJlbmNlIG9uXG5cdCAgICogdGhlIGRhdGEgb2JqZWN0IGFzIGEgaGlkZGVuIHByb3BlcnR5LiBPdGhlcndpc2Ugd2Vcblx0ICAgKiBjYWNoZSB0aGVtIGluIGFuIG9iamVjdCBhbmQgZm9yIGVhY2ggcHJpbWl0aXZlIHZhbHVlXG5cdCAgICogdGhlcmUgaXMgYW4gYXJyYXkgaW4gY2FzZSB0aGVyZSBhcmUgZHVwbGljYXRlcy5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG5cdCAgICogQHBhcmFtIHtWdWV9IHZtXG5cdCAgICovXG5cblx0ICBjYWNoZVZtOiBmdW5jdGlvbiAoZGF0YSwgdm0pIHtcblx0ICAgIHZhciBpZEtleSA9IHRoaXMuaWRLZXlcblx0ICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGVcblx0ICAgIHZhciBpZFxuXHQgICAgaWYgKGlkS2V5KSB7XG5cdCAgICAgIGlkID0gZGF0YVtpZEtleV1cblx0ICAgICAgaWYgKCFjYWNoZVtpZF0pIHtcblx0ICAgICAgICBjYWNoZVtpZF0gPSB2bVxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIF8ud2FybignRHVwbGljYXRlIElEIGluIHYtcmVwZWF0OiAnICsgaWQpXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoZGF0YSkpIHtcblx0ICAgICAgaWQgPSB0aGlzLmlkXG5cdCAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGlkKSkge1xuXHQgICAgICAgIGlmIChkYXRhW2lkXSA9PT0gbnVsbCkge1xuXHQgICAgICAgICAgZGF0YVtpZF0gPSB2bVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICBfLndhcm4oXG5cdCAgICAgICAgICAgICdEdXBsaWNhdGUgb2JqZWN0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiB2LXJlcGVhdC4nXG5cdCAgICAgICAgICApXG5cdCAgICAgICAgfVxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIF8uZGVmaW5lKGRhdGEsIHRoaXMuaWQsIHZtKVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBpZiAoIWNhY2hlW2RhdGFdKSB7XG5cdCAgICAgICAgY2FjaGVbZGF0YV0gPSBbdm1dXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgY2FjaGVbZGF0YV0ucHVzaCh2bSlcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgdm0uX3JhdyA9IGRhdGFcblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogVHJ5IHRvIGdldCBhIGNhY2hlZCBpbnN0YW5jZSBmcm9tIGEgcGllY2Ugb2YgZGF0YS5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG5cdCAgICogQHJldHVybiB7VnVlfHVuZGVmaW5lZH1cblx0ICAgKi9cblxuXHQgIGdldFZtOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgaWYgKHRoaXMuaWRLZXkpIHtcblx0ICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbZGF0YVt0aGlzLmlkS2V5XV1cblx0ICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoZGF0YSkpIHtcblx0ICAgICAgcmV0dXJuIGRhdGFbdGhpcy5pZF1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHZhciBjYWNoZWQgPSB0aGlzLmNhY2hlW2RhdGFdXG5cdCAgICAgIGlmIChjYWNoZWQpIHtcblx0ICAgICAgICB2YXIgaSA9IDBcblx0ICAgICAgICB2YXIgdm0gPSBjYWNoZWRbaV1cblx0ICAgICAgICAvLyBzaW5jZSBkdXBsaWNhdGVkIHZtIGluc3RhbmNlcyBtaWdodCBiZSBhIHJldXNlZFxuXHQgICAgICAgIC8vIG9uZSBPUiBhIG5ld2x5IGNyZWF0ZWQgb25lLCB3ZSBuZWVkIHRvIHJldHVybiB0aGVcblx0ICAgICAgICAvLyBmaXJzdCBpbnN0YW5jZSB0aGF0IGlzIG5laXRoZXIgb2YgdGhlc2UuXG5cdCAgICAgICAgd2hpbGUgKHZtICYmICh2bS5fcmV1c2VkIHx8IHZtLl9uZXcpKSB7XG5cdCAgICAgICAgICB2bSA9IGNhY2hlZFsrK2ldXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB2bVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIERlbGV0ZSBhIGNhY2hlZCB2bSBpbnN0YW5jZS5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgICAqL1xuXG5cdCAgdW5jYWNoZVZtOiBmdW5jdGlvbiAodm0pIHtcblx0ICAgIHZhciBkYXRhID0gdm0uX3Jhd1xuXHQgICAgaWYgKHRoaXMuaWRLZXkpIHtcblx0ICAgICAgdGhpcy5jYWNoZVtkYXRhW3RoaXMuaWRLZXldXSA9IG51bGxcblx0ICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoZGF0YSkpIHtcblx0ICAgICAgZGF0YVt0aGlzLmlkXSA9IG51bGxcblx0ICAgICAgdm0uX3JhdyA9IG51bGxcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuY2FjaGVbZGF0YV0ucG9wKClcblx0ICAgIH1cblx0ICB9XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBIZWxwZXIgdG8gZmluZCB0aGUgbmV4dCBlbGVtZW50IHRoYXQgaXMgYW4gaW5zdGFuY2Vcblx0ICogcm9vdCBub2RlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIGEgZGVzdHJveWVkIHZtJ3Ncblx0ICogZWxlbWVudCBjb3VsZCBzdGlsbCBiZSBsaW5nZXJpbmcgaW4gdGhlIERPTSBiZWZvcmUgaXRzXG5cdCAqIGxlYXZpbmcgdHJhbnNpdGlvbiBmaW5pc2hlcywgYnV0IGl0cyBfX3Z1ZV9fIHJlZmVyZW5jZVxuXHQgKiBzaG91bGQgaGF2ZSBiZWVuIHJlbW92ZWQgc28gd2UgY2FuIHNraXAgdGhlbS5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7Q29tbWVudE5vZGV9IHJlZlxuXHQgKiBAcmV0dXJuIHtWdWV9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGZpbmROZXh0Vm0gKHZtLCByZWYpIHtcblx0ICB2YXIgZWwgPSAodm0uX2Jsb2NrRW5kIHx8IHZtLiRlbCkubmV4dFNpYmxpbmdcblx0ICB3aGlsZSAoIWVsLl9fdnVlX18gJiYgZWwgIT09IHJlZikge1xuXHQgICAgZWwgPSBlbC5uZXh0U2libGluZ1xuXHQgIH1cblx0ICByZXR1cm4gZWwuX192dWVfX1xuXHR9XG5cblx0LyoqXG5cdCAqIEF0dGVtcHQgdG8gY29udmVydCBub24tQXJyYXkgb2JqZWN0cyB0byBhcnJheS5cblx0ICogVGhpcyBpcyB0aGUgZGVmYXVsdCBmaWx0ZXIgaW5zdGFsbGVkIHRvIGV2ZXJ5IHYtcmVwZWF0XG5cdCAqIGRpcmVjdGl2ZS5cblx0ICpcblx0ICogSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCAqKnRoZSBkaXJlY3RpdmUqKiBhcyBgdGhpc2Bcblx0ICogY29udGV4dCBzbyB0aGF0IHdlIGNhbiBtYXJrIHRoZSByZXBlYXQgYXJyYXkgYXMgY29udmVydGVkXG5cdCAqIGZyb20gYW4gb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IG9ialxuXHQgKiBAcmV0dXJuIHtBcnJheX1cblx0ICogQHByaXZhdGVcblx0ICovXG5cblx0ZnVuY3Rpb24gb2JqVG9BcnJheSAob2JqKSB7XG5cdCAgaWYgKCFfLmlzUGxhaW5PYmplY3Qob2JqKSkge1xuXHQgICAgcmV0dXJuIG9ialxuXHQgIH1cblx0ICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iailcblx0ICB2YXIgaSA9IGtleXMubGVuZ3RoXG5cdCAgdmFyIHJlcyA9IG5ldyBBcnJheShpKVxuXHQgIHZhciBrZXlcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICBrZXkgPSBrZXlzW2ldXG5cdCAgICByZXNbaV0gPSB7XG5cdCAgICAgIGtleToga2V5LFxuXHQgICAgICB2YWx1ZTogb2JqW2tleV1cblx0ICAgIH1cblx0ICB9XG5cdCAgLy8gYHRoaXNgIHBvaW50cyB0byB0aGUgcmVwZWF0IGRpcmVjdGl2ZSBpbnN0YW5jZVxuXHQgIHRoaXMuY29udmVydGVkID0gdHJ1ZVxuXHQgIHJldHVybiByZXNcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSByYW5nZSBhcnJheSBmcm9tIGdpdmVuIG51bWJlci5cblx0ICpcblx0ICogQHBhcmFtIHtOdW1iZXJ9IG5cblx0ICogQHJldHVybiB7QXJyYXl9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHJhbmdlIChuKSB7XG5cdCAgdmFyIGkgPSAtMVxuXHQgIHZhciByZXQgPSBuZXcgQXJyYXkobilcblx0ICB3aGlsZSAoKytpIDwgbikge1xuXHQgICAgcmV0W2ldID0gaVxuXHQgIH1cblx0ICByZXR1cm4gcmV0XG5cdH1cblxuLyoqKi8gfSxcbi8qIDM2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGNvbXBpbGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ2KVxuXHR2YXIgdGVtcGxhdGVQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUxKVxuXHR2YXIgdHJhbnNpdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNDUpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgZWwgPSB0aGlzLmVsXG5cdCAgICBpZiAoIWVsLl9fdnVlX18pIHtcblx0ICAgICAgdGhpcy5zdGFydCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3YtaWYtc3RhcnQnKVxuXHQgICAgICB0aGlzLmVuZCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3YtaWYtZW5kJylcblx0ICAgICAgXy5yZXBsYWNlKGVsLCB0aGlzLmVuZClcblx0ICAgICAgXy5iZWZvcmUodGhpcy5zdGFydCwgdGhpcy5lbmQpXG5cdCAgICAgIGlmIChlbC50YWdOYW1lID09PSAnVEVNUExBVEUnKSB7XG5cdCAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlUGFyc2VyLnBhcnNlKGVsLCB0cnVlKVxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0ICAgICAgICB0aGlzLnRlbXBsYXRlLmFwcGVuZENoaWxkKGVsKVxuXHQgICAgICB9XG5cdCAgICAgIC8vIGNvbXBpbGUgdGhlIG5lc3RlZCBwYXJ0aWFsXG5cdCAgICAgIHRoaXMubGlua2VyID0gY29tcGlsZShcblx0ICAgICAgICB0aGlzLnRlbXBsYXRlLFxuXHQgICAgICAgIHRoaXMudm0uJG9wdGlvbnMsXG5cdCAgICAgICAgdHJ1ZVxuXHQgICAgICApXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLmludmFsaWQgPSB0cnVlXG5cdCAgICAgIF8ud2Fybihcblx0ICAgICAgICAndi1pZj1cIicgKyB0aGlzLmV4cHJlc3Npb24gKyAnXCIgY2Fubm90IGJlICcgK1xuXHQgICAgICAgICd1c2VkIG9uIGFuIGFscmVhZHkgbW91bnRlZCBpbnN0YW5jZS4nXG5cdCAgICAgIClcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgdXBkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgIGlmICh0aGlzLmludmFsaWQpIHJldHVyblxuXHQgICAgaWYgKHZhbHVlKSB7XG5cdCAgICAgIHRoaXMuaW5zZXJ0KClcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMudGVhcmRvd24oKVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBpbnNlcnQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIGF2b2lkIGR1cGxpY2F0ZSBpbnNlcnRzLCBzaW5jZSB1cGRhdGUoKSBjYW4gYmVcblx0ICAgIC8vIGNhbGxlZCB3aXRoIGRpZmZlcmVudCB0cnV0aHkgdmFsdWVzXG5cdCAgICBpZiAodGhpcy5kZWNvbXBpbGUpIHtcblx0ICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICB2YXIgdm0gPSB0aGlzLnZtXG5cdCAgICB2YXIgZnJhZyA9IHRlbXBsYXRlUGFyc2VyLmNsb25lKHRoaXMudGVtcGxhdGUpXG5cdCAgICB2YXIgZGVjb21waWxlID0gdGhpcy5saW5rZXIodm0sIGZyYWcpXG5cdCAgICB0aGlzLmRlY29tcGlsZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgZGVjb21waWxlKClcblx0ICAgICAgdHJhbnNpdGlvbi5ibG9ja1JlbW92ZSh0aGlzLnN0YXJ0LCB0aGlzLmVuZCwgdm0pXG5cdCAgICB9XG5cdCAgICB0cmFuc2l0aW9uLmJsb2NrQXBwZW5kKGZyYWcsIHRoaXMuZW5kLCB2bSlcblx0ICB9LFxuXG5cdCAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcblx0ICAgIGlmICh0aGlzLmRlY29tcGlsZSkge1xuXHQgICAgICB0aGlzLmRlY29tcGlsZSgpXG5cdCAgICAgIHRoaXMuZGVjb21waWxlID0gbnVsbFxuXHQgICAgfVxuXHQgIH1cblxuXHR9XG5cbi8qKiovIH0sXG4vKiAzNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBXYXRjaGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSlcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIHByaW9yaXR5OiA5MDAsXG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgdm0gPSB0aGlzLnZtXG5cdCAgICBpZiAodGhpcy5lbCAhPT0gdm0uJGVsKSB7XG5cdCAgICAgIF8ud2Fybihcblx0ICAgICAgICAndi13aXRoIGNhbiBvbmx5IGJlIHVzZWQgb24gaW5zdGFuY2Ugcm9vdCBlbGVtZW50cy4nXG5cdCAgICAgIClcblx0ICAgIH0gZWxzZSBpZiAoIXZtLiRwYXJlbnQpIHtcblx0ICAgICAgXy53YXJuKFxuXHQgICAgICAgICd2LXdpdGggbXVzdCBiZSB1c2VkIG9uIGFuIGluc3RhbmNlIHdpdGggYSBwYXJlbnQuJ1xuXHQgICAgICApXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB2YXIga2V5ID0gdGhpcy5hcmdcblx0ICAgICAgdGhpcy53YXRjaGVyID0gbmV3IFdhdGNoZXIoXG5cdCAgICAgICAgdm0uJHBhcmVudCxcblx0ICAgICAgICB0aGlzLmV4cHJlc3Npb24sXG5cdCAgICAgICAga2V5XG5cdCAgICAgICAgICA/IGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgICAgICAgICAgICB2bS4kc2V0KGtleSwgdmFsKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICA6IGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgICAgICAgICAgICB2bS4kZGF0YSA9IHZhbFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgIClcblx0ICAgICAgLy8gaW5pdGlhbCBzZXRcblx0ICAgICAgdmFyIGluaXRpYWxWYWwgPSB0aGlzLndhdGNoZXIudmFsdWVcblx0ICAgICAgaWYgKGtleSkge1xuXHQgICAgICAgIHZtLiRzZXQoa2V5LCBpbml0aWFsVmFsKVxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHZtLiRkYXRhID0gaW5pdGlhbFZhbFxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgaWYgKHRoaXMud2F0Y2hlcikge1xuXHQgICAgICB0aGlzLndhdGNoZXIudGVhcmRvd24oKVxuXHQgICAgfVxuXHQgIH1cblxuXHR9XG5cbi8qKiovIH0sXG4vKiAzOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MSlcblxuXHQvKipcblx0ICogRmlsdGVyIGZpbHRlciBmb3Igdi1yZXBlYXRcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaEtleVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gW2RlbGltaXRlcl1cblx0ICogQHBhcmFtIHtTdHJpbmd9IGRhdGFLZXlcblx0ICovXG5cblx0ZXhwb3J0cy5maWx0ZXJCeSA9IGZ1bmN0aW9uIChhcnIsIHNlYXJjaEtleSwgZGVsaW1pdGVyLCBkYXRhS2V5KSB7XG5cdCAgLy8gYWxsb3cgb3B0aW9uYWwgYGluYCBkZWxpbWl0ZXJcblx0ICAvLyBiZWNhdXNlIHdoeSBub3Rcblx0ICBpZiAoZGVsaW1pdGVyICYmIGRlbGltaXRlciAhPT0gJ2luJykge1xuXHQgICAgZGF0YUtleSA9IGRlbGltaXRlclxuXHQgIH1cblx0ICAvLyBnZXQgdGhlIHNlYXJjaCBzdHJpbmdcblx0ICB2YXIgc2VhcmNoID1cblx0ICAgIF8uc3RyaXBRdW90ZXMoc2VhcmNoS2V5KSB8fFxuXHQgICAgdGhpcy4kZ2V0KHNlYXJjaEtleSlcblx0ICBpZiAoIXNlYXJjaCkge1xuXHQgICAgcmV0dXJuIGFyclxuXHQgIH1cblx0ICBzZWFyY2ggPSBzZWFyY2gudG9Mb3dlckNhc2UoKVxuXHQgIC8vIGdldCB0aGUgb3B0aW9uYWwgZGF0YUtleVxuXHQgIGRhdGFLZXkgPVxuXHQgICAgZGF0YUtleSAmJlxuXHQgICAgKF8uc3RyaXBRdW90ZXMoZGF0YUtleSkgfHwgdGhpcy4kZ2V0KGRhdGFLZXkpKVxuXHQgIHJldHVybiBhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG5cdCAgICByZXR1cm4gZGF0YUtleVxuXHQgICAgICA/IGNvbnRhaW5zKFBhdGguZ2V0KGl0ZW0sIGRhdGFLZXkpLCBzZWFyY2gpXG5cdCAgICAgIDogY29udGFpbnMoaXRlbSwgc2VhcmNoKVxuXHQgIH0pXG5cdH1cblxuXHQvKipcblx0ICogRmlsdGVyIGZpbHRlciBmb3Igdi1yZXBlYXRcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHNvcnRLZXlcblx0ICogQHBhcmFtIHtTdHJpbmd9IHJldmVyc2VLZXlcblx0ICovXG5cblx0ZXhwb3J0cy5vcmRlckJ5ID0gZnVuY3Rpb24gKGFyciwgc29ydEtleSwgcmV2ZXJzZUtleSkge1xuXHQgIHZhciBrZXkgPVxuXHQgICAgXy5zdHJpcFF1b3Rlcyhzb3J0S2V5KSB8fFxuXHQgICAgdGhpcy4kZ2V0KHNvcnRLZXkpXG5cdCAgaWYgKCFrZXkpIHtcblx0ICAgIHJldHVybiBhcnJcblx0ICB9XG5cdCAgdmFyIG9yZGVyID0gMVxuXHQgIGlmIChyZXZlcnNlS2V5KSB7XG5cdCAgICBpZiAocmV2ZXJzZUtleSA9PT0gJy0xJykge1xuXHQgICAgICBvcmRlciA9IC0xXG5cdCAgICB9IGVsc2UgaWYgKHJldmVyc2VLZXkuY2hhckNvZGVBdCgwKSA9PT0gMHgyMSkgeyAvLyAhXG5cdCAgICAgIHJldmVyc2VLZXkgPSByZXZlcnNlS2V5LnNsaWNlKDEpXG5cdCAgICAgIG9yZGVyID0gdGhpcy4kZ2V0KHJldmVyc2VLZXkpID8gMSA6IC0xXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBvcmRlciA9IHRoaXMuJGdldChyZXZlcnNlS2V5KSA/IC0xIDogMVxuXHQgICAgfVxuXHQgIH1cblx0ICAvLyBzb3J0IG9uIGEgY29weSB0byBhdm9pZCBtdXRhdGluZyBvcmlnaW5hbCBhcnJheVxuXHQgIHJldHVybiBhcnIuc2xpY2UoKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdCAgICBhID0gUGF0aC5nZXQoYSwga2V5KVxuXHQgICAgYiA9IFBhdGguZ2V0KGIsIGtleSlcblx0ICAgIHJldHVybiBhID09PSBiID8gMCA6IGEgPiBiID8gb3JkZXIgOiAtb3JkZXJcblx0ICB9KVxuXHR9XG5cblx0LyoqXG5cdCAqIFN0cmluZyBjb250YWluIGhlbHBlclxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHZhbFxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNvbnRhaW5zICh2YWwsIHNlYXJjaCkge1xuXHQgIGlmIChfLmlzT2JqZWN0KHZhbCkpIHtcblx0ICAgIGZvciAodmFyIGtleSBpbiB2YWwpIHtcblx0ICAgICAgaWYgKGNvbnRhaW5zKHZhbFtrZXldLCBzZWFyY2gpKSB7XG5cdCAgICAgICAgcmV0dXJuIHRydWVcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0gZWxzZSBpZiAodmFsICE9IG51bGwpIHtcblx0ICAgIHJldHVybiB2YWwudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoKSA+IC0xXG5cdCAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiAzOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHVpZCA9IDBcblxuXHQvKipcblx0ICogQSBiaW5kaW5nIGlzIGFuIG9ic2VydmFibGUgdGhhdCBjYW4gaGF2ZSBtdWx0aXBsZVxuXHQgKiBkaXJlY3RpdmVzIHN1YnNjcmliaW5nIHRvIGl0LlxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cblx0ZnVuY3Rpb24gQmluZGluZyAoKSB7XG5cdCAgdGhpcy5pZCA9ICsrdWlkXG5cdCAgdGhpcy5zdWJzID0gW11cblx0fVxuXG5cdHZhciBwID0gQmluZGluZy5wcm90b3R5cGVcblxuXHQvKipcblx0ICogQWRkIGEgZGlyZWN0aXZlIHN1YnNjcmliZXIuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RGlyZWN0aXZlfSBzdWJcblx0ICovXG5cblx0cC5hZGRTdWIgPSBmdW5jdGlvbiAoc3ViKSB7XG5cdCAgdGhpcy5zdWJzLnB1c2goc3ViKVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhIGRpcmVjdGl2ZSBzdWJzY3JpYmVyLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RpcmVjdGl2ZX0gc3ViXG5cdCAqL1xuXG5cdHAucmVtb3ZlU3ViID0gZnVuY3Rpb24gKHN1Yikge1xuXHQgIGlmICh0aGlzLnN1YnMubGVuZ3RoKSB7XG5cdCAgICB2YXIgaSA9IHRoaXMuc3Vicy5pbmRleE9mKHN1Yilcblx0ICAgIGlmIChpID4gLTEpIHRoaXMuc3Vicy5zcGxpY2UoaSwgMSlcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogTm90aWZ5IGFsbCBzdWJzY3JpYmVycyBvZiBhIG5ldyB2YWx1ZS5cblx0ICovXG5cblx0cC5ub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLnN1YnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICB0aGlzLnN1YnNbaV0udXBkYXRlKClcblx0ICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IEJpbmRpbmdcblxuLyoqKi8gfSxcbi8qIDQwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGNvbmZpZyA9IF9fd2VicGFja19yZXF1aXJlX18oMjApXG5cdHZhciBXYXRjaGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSlcblx0dmFyIHRleHRQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQyKVxuXHR2YXIgZXhwUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NClcblxuXHQvKipcblx0ICogQSBkaXJlY3RpdmUgbGlua3MgYSBET00gZWxlbWVudCB3aXRoIGEgcGllY2Ugb2YgZGF0YSxcblx0ICogd2hpY2ggaXMgdGhlIHJlc3VsdCBvZiBldmFsdWF0aW5nIGFuIGV4cHJlc3Npb24uXG5cdCAqIEl0IHJlZ2lzdGVycyBhIHdhdGNoZXIgd2l0aCB0aGUgZXhwcmVzc2lvbiBhbmQgY2FsbHNcblx0ICogdGhlIERPTSB1cGRhdGUgZnVuY3Rpb24gd2hlbiBhIGNoYW5nZSBpcyB0cmlnZ2VyZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG5cdCAqIEBwYXJhbSB7Tm9kZX0gZWxcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkZXNjcmlwdG9yXG5cdCAqICAgICAgICAgICAgICAgICAtIHtTdHJpbmd9IGV4cHJlc3Npb25cblx0ICogICAgICAgICAgICAgICAgIC0ge1N0cmluZ30gW2FyZ11cblx0ICogICAgICAgICAgICAgICAgIC0ge0FycmF5PE9iamVjdD59IFtmaWx0ZXJzXVxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGVmIC0gZGlyZWN0aXZlIGRlZmluaXRpb24gb2JqZWN0XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtsaW5rZXJdIC0gcHJlLWNvbXBpbGVkIGxpbmtlciBmdW5jdGlvblxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cblx0ZnVuY3Rpb24gRGlyZWN0aXZlIChuYW1lLCBlbCwgdm0sIGRlc2NyaXB0b3IsIGRlZiwgbGlua2VyKSB7XG5cdCAgLy8gcHVibGljXG5cdCAgdGhpcy5uYW1lID0gbmFtZVxuXHQgIHRoaXMuZWwgPSBlbFxuXHQgIHRoaXMudm0gPSB2bVxuXHQgIC8vIGNvcHkgZGVzY3JpcHRvciBwcm9wc1xuXHQgIHRoaXMucmF3ID0gZGVzY3JpcHRvci5yYXdcblx0ICB0aGlzLmV4cHJlc3Npb24gPSBkZXNjcmlwdG9yLmV4cHJlc3Npb25cblx0ICB0aGlzLmFyZyA9IGRlc2NyaXB0b3IuYXJnXG5cdCAgdGhpcy5maWx0ZXJzID0gXy5yZXNvbHZlRmlsdGVycyh2bSwgZGVzY3JpcHRvci5maWx0ZXJzKVxuXHQgIC8vIHByaXZhdGVcblx0ICB0aGlzLl9saW5rZXIgPSBsaW5rZXJcblx0ICB0aGlzLl9sb2NrZWQgPSBmYWxzZVxuXHQgIHRoaXMuX2JvdW5kID0gZmFsc2Vcblx0ICAvLyBpbml0XG5cdCAgdGhpcy5fYmluZChkZWYpXG5cdH1cblxuXHR2YXIgcCA9IERpcmVjdGl2ZS5wcm90b3R5cGVcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgZGlyZWN0aXZlLCBtaXhpbiBkZWZpbml0aW9uIHByb3BlcnRpZXMsXG5cdCAqIHNldHVwIHRoZSB3YXRjaGVyLCBjYWxsIGRlZmluaXRpb24gYmluZCgpIGFuZCB1cGRhdGUoKVxuXHQgKiBpZiBwcmVzZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGVmXG5cdCAqL1xuXG5cdHAuX2JpbmQgPSBmdW5jdGlvbiAoZGVmKSB7XG5cdCAgaWYgKHRoaXMubmFtZSAhPT0gJ2Nsb2FrJyAmJiB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSkge1xuXHQgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoY29uZmlnLnByZWZpeCArIHRoaXMubmFtZSlcblx0ICB9XG5cdCAgaWYgKHR5cGVvZiBkZWYgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgIHRoaXMudXBkYXRlID0gZGVmXG5cdCAgfSBlbHNlIHtcblx0ICAgIF8uZXh0ZW5kKHRoaXMsIGRlZilcblx0ICB9XG5cdCAgdGhpcy5fd2F0Y2hlckV4cCA9IHRoaXMuZXhwcmVzc2lvblxuXHQgIHRoaXMuX2NoZWNrRHluYW1pY0xpdGVyYWwoKVxuXHQgIGlmICh0aGlzLmJpbmQpIHtcblx0ICAgIHRoaXMuYmluZCgpXG5cdCAgfVxuXHQgIGlmIChcblx0ICAgIHRoaXMudXBkYXRlICYmIHRoaXMuX3dhdGNoZXJFeHAgJiZcblx0ICAgICghdGhpcy5pc0xpdGVyYWwgfHwgdGhpcy5faXNEeW5hbWljTGl0ZXJhbCkgJiZcblx0ICAgICF0aGlzLl9jaGVja1N0YXRlbWVudCgpXG5cdCAgKSB7XG5cdCAgICAvLyB1c2UgcmF3IGV4cHJlc3Npb24gYXMgaWRlbnRpZmllciBiZWNhdXNlIGZpbHRlcnNcblx0ICAgIC8vIG1ha2UgdGhlbSBkaWZmZXJlbnQgd2F0Y2hlcnNcblx0ICAgIHZhciB3YXRjaGVyID0gdGhpcy52bS5fd2F0Y2hlcnNbdGhpcy5yYXddXG5cdCAgICAvLyB3cmFwcGVkIHVwZGF0ZXIgZm9yIGNvbnRleHRcblx0ICAgIHZhciBkaXIgPSB0aGlzXG5cdCAgICB2YXIgdXBkYXRlID0gdGhpcy5fdXBkYXRlID0gZnVuY3Rpb24gKHZhbCwgb2xkVmFsKSB7XG5cdCAgICAgIGlmICghZGlyLl9sb2NrZWQpIHtcblx0ICAgICAgICBkaXIudXBkYXRlKHZhbCwgb2xkVmFsKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICBpZiAoIXdhdGNoZXIpIHtcblx0ICAgICAgd2F0Y2hlciA9IHRoaXMudm0uX3dhdGNoZXJzW3RoaXMucmF3XSA9IG5ldyBXYXRjaGVyKFxuXHQgICAgICAgIHRoaXMudm0sXG5cdCAgICAgICAgdGhpcy5fd2F0Y2hlckV4cCxcblx0ICAgICAgICB1cGRhdGUsIC8vIGNhbGxiYWNrXG5cdCAgICAgICAgdGhpcy5maWx0ZXJzLFxuXHQgICAgICAgIHRoaXMudHdvV2F5IC8vIG5lZWQgc2V0dGVyXG5cdCAgICAgIClcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHdhdGNoZXIuYWRkQ2IodXBkYXRlKVxuXHQgICAgfVxuXHQgICAgdGhpcy5fd2F0Y2hlciA9IHdhdGNoZXJcblx0ICAgIGlmICh0aGlzLl9pbml0VmFsdWUgIT0gbnVsbCkge1xuXHQgICAgICB3YXRjaGVyLnNldCh0aGlzLl9pbml0VmFsdWUpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLnVwZGF0ZSh3YXRjaGVyLnZhbHVlKVxuXHQgICAgfVxuXHQgIH1cblx0ICB0aGlzLl9ib3VuZCA9IHRydWVcblx0fVxuXG5cdC8qKlxuXHQgKiBjaGVjayBpZiB0aGlzIGlzIGEgZHluYW1pYyBsaXRlcmFsIGJpbmRpbmcuXG5cdCAqXG5cdCAqIGUuZy4gdi1jb21wb25lbnQ9XCJ7e2N1cnJlbnRWaWV3fX1cIlxuXHQgKi9cblxuXHRwLl9jaGVja0R5bmFtaWNMaXRlcmFsID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBleHByZXNzaW9uID0gdGhpcy5leHByZXNzaW9uXG5cdCAgaWYgKGV4cHJlc3Npb24gJiYgdGhpcy5pc0xpdGVyYWwpIHtcblx0ICAgIHZhciB0b2tlbnMgPSB0ZXh0UGFyc2VyLnBhcnNlKGV4cHJlc3Npb24pXG5cdCAgICBpZiAodG9rZW5zKSB7XG5cdCAgICAgIHZhciBleHAgPSB0ZXh0UGFyc2VyLnRva2Vuc1RvRXhwKHRva2Vucylcblx0ICAgICAgdGhpcy5leHByZXNzaW9uID0gdGhpcy52bS4kZ2V0KGV4cClcblx0ICAgICAgdGhpcy5fd2F0Y2hlckV4cCA9IGV4cFxuXHQgICAgICB0aGlzLl9pc0R5bmFtaWNMaXRlcmFsID0gdHJ1ZVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayBpZiB0aGUgZGlyZWN0aXZlIGlzIGEgZnVuY3Rpb24gY2FsbGVyXG5cdCAqIGFuZCBpZiB0aGUgZXhwcmVzc2lvbiBpcyBhIGNhbGxhYmxlIG9uZS4gSWYgYm90aCB0cnVlLFxuXHQgKiB3ZSB3cmFwIHVwIHRoZSBleHByZXNzaW9uIGFuZCB1c2UgaXQgYXMgdGhlIGV2ZW50XG5cdCAqIGhhbmRsZXIuXG5cdCAqXG5cdCAqIGUuZy4gdi1vbj1cImNsaWNrOiBhKytcIlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblxuXHRwLl9jaGVja1N0YXRlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICB2YXIgZXhwcmVzc2lvbiA9IHRoaXMuZXhwcmVzc2lvblxuXHQgIGlmIChcblx0ICAgIGV4cHJlc3Npb24gJiYgdGhpcy5hY2NlcHRTdGF0ZW1lbnQgJiZcblx0ICAgICFleHBQYXJzZXIucGF0aFRlc3RSRS50ZXN0KGV4cHJlc3Npb24pXG5cdCAgKSB7XG5cdCAgICB2YXIgZm4gPSBleHBQYXJzZXIucGFyc2UoZXhwcmVzc2lvbikuZ2V0XG5cdCAgICB2YXIgdm0gPSB0aGlzLnZtXG5cdCAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgZm4uY2FsbCh2bSwgdm0pXG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5maWx0ZXJzKSB7XG5cdCAgICAgIGhhbmRsZXIgPSBfLmFwcGx5RmlsdGVycyhcblx0ICAgICAgICBoYW5kbGVyLFxuXHQgICAgICAgIHRoaXMuZmlsdGVycy5yZWFkLFxuXHQgICAgICAgIHZtXG5cdCAgICAgIClcblx0ICAgIH1cblx0ICAgIHRoaXMudXBkYXRlKGhhbmRsZXIpXG5cdCAgICByZXR1cm4gdHJ1ZVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBUZWFyZG93biB0aGUgd2F0Y2hlciBhbmQgY2FsbCB1bmJpbmQuXG5cdCAqL1xuXG5cdHAuX3RlYXJkb3duID0gZnVuY3Rpb24gKCkge1xuXHQgIGlmICh0aGlzLl9ib3VuZCkge1xuXHQgICAgaWYgKHRoaXMudW5iaW5kKSB7XG5cdCAgICAgIHRoaXMudW5iaW5kKClcblx0ICAgIH1cblx0ICAgIHZhciB3YXRjaGVyID0gdGhpcy5fd2F0Y2hlclxuXHQgICAgaWYgKHdhdGNoZXIgJiYgd2F0Y2hlci5hY3RpdmUpIHtcblx0ICAgICAgd2F0Y2hlci5yZW1vdmVDYih0aGlzLl91cGRhdGUpXG5cdCAgICAgIGlmICghd2F0Y2hlci5hY3RpdmUpIHtcblx0ICAgICAgICB0aGlzLnZtLl93YXRjaGVyc1t0aGlzLnJhd10gPSBudWxsXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIHRoaXMuX2JvdW5kID0gZmFsc2Vcblx0ICAgIHRoaXMudm0gPSB0aGlzLmVsID0gdGhpcy5fd2F0Y2hlciA9IG51bGxcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIHdpdGggdGhlIHNldHRlci5cblx0ICogVGhpcyBzaG91bGQgb25seSBiZSB1c2VkIGluIHR3by13YXkgZGlyZWN0aXZlc1xuXHQgKiBlLmcuIHYtbW9kZWwuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcblx0ICogQHBhcmFtIHtCb29sZWFufSBsb2NrIC0gcHJldmVudCB3cnRpZSB0cmlnZ2VyaW5nIHVwZGF0ZS5cblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHRwLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSwgbG9jaykge1xuXHQgIGlmICh0aGlzLnR3b1dheSkge1xuXHQgICAgaWYgKGxvY2spIHtcblx0ICAgICAgdGhpcy5fbG9ja2VkID0gdHJ1ZVxuXHQgICAgfVxuXHQgICAgdGhpcy5fd2F0Y2hlci5zZXQodmFsdWUpXG5cdCAgICBpZiAobG9jaykge1xuXHQgICAgICB2YXIgc2VsZiA9IHRoaXNcblx0ICAgICAgXy5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgc2VsZi5fbG9ja2VkID0gZmFsc2UgICAgICAgIFxuXHQgICAgICB9KVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gRGlyZWN0aXZlXG5cbi8qKiovIH0sXG4vKiA0MSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBDYWNoZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTIpXG5cdHZhciBwYXRoQ2FjaGUgPSBuZXcgQ2FjaGUoMTAwMClcblx0dmFyIGlkZW50UkUgPSAvXlskX2EtekEtWl0rW1xcdyRdKiQvXG5cblx0LyoqXG5cdCAqIFBhdGgtcGFyc2luZyBhbGdvcml0aG0gc2Nvb3BlZCBmcm9tIFBvbHltZXIvb2JzZXJ2ZS1qc1xuXHQgKi9cblxuXHR2YXIgcGF0aFN0YXRlTWFjaGluZSA9IHtcblx0ICAnYmVmb3JlUGF0aCc6IHtcblx0ICAgICd3cyc6IFsnYmVmb3JlUGF0aCddLFxuXHQgICAgJ2lkZW50JzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuXHQgICAgJ1snOiBbJ2JlZm9yZUVsZW1lbnQnXSxcblx0ICAgICdlb2YnOiBbJ2FmdGVyUGF0aCddXG5cdCAgfSxcblxuXHQgICdpblBhdGgnOiB7XG5cdCAgICAnd3MnOiBbJ2luUGF0aCddLFxuXHQgICAgJy4nOiBbJ2JlZm9yZUlkZW50J10sXG5cdCAgICAnWyc6IFsnYmVmb3JlRWxlbWVudCddLFxuXHQgICAgJ2VvZic6IFsnYWZ0ZXJQYXRoJ11cblx0ICB9LFxuXG5cdCAgJ2JlZm9yZUlkZW50Jzoge1xuXHQgICAgJ3dzJzogWydiZWZvcmVJZGVudCddLFxuXHQgICAgJ2lkZW50JzogWydpbklkZW50JywgJ2FwcGVuZCddXG5cdCAgfSxcblxuXHQgICdpbklkZW50Jzoge1xuXHQgICAgJ2lkZW50JzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuXHQgICAgJzAnOiBbJ2luSWRlbnQnLCAnYXBwZW5kJ10sXG5cdCAgICAnbnVtYmVyJzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuXHQgICAgJ3dzJzogWydpblBhdGgnLCAncHVzaCddLFxuXHQgICAgJy4nOiBbJ2JlZm9yZUlkZW50JywgJ3B1c2gnXSxcblx0ICAgICdbJzogWydiZWZvcmVFbGVtZW50JywgJ3B1c2gnXSxcblx0ICAgICdlb2YnOiBbJ2FmdGVyUGF0aCcsICdwdXNoJ11cblx0ICB9LFxuXG5cdCAgJ2JlZm9yZUVsZW1lbnQnOiB7XG5cdCAgICAnd3MnOiBbJ2JlZm9yZUVsZW1lbnQnXSxcblx0ICAgICcwJzogWydhZnRlclplcm8nLCAnYXBwZW5kJ10sXG5cdCAgICAnbnVtYmVyJzogWydpbkluZGV4JywgJ2FwcGVuZCddLFxuXHQgICAgXCInXCI6IFsnaW5TaW5nbGVRdW90ZScsICdhcHBlbmQnLCAnJ10sXG5cdCAgICAnXCInOiBbJ2luRG91YmxlUXVvdGUnLCAnYXBwZW5kJywgJyddXG5cdCAgfSxcblxuXHQgICdhZnRlclplcm8nOiB7XG5cdCAgICAnd3MnOiBbJ2FmdGVyRWxlbWVudCcsICdwdXNoJ10sXG5cdCAgICAnXSc6IFsnaW5QYXRoJywgJ3B1c2gnXVxuXHQgIH0sXG5cblx0ICAnaW5JbmRleCc6IHtcblx0ICAgICcwJzogWydpbkluZGV4JywgJ2FwcGVuZCddLFxuXHQgICAgJ251bWJlcic6IFsnaW5JbmRleCcsICdhcHBlbmQnXSxcblx0ICAgICd3cyc6IFsnYWZ0ZXJFbGVtZW50J10sXG5cdCAgICAnXSc6IFsnaW5QYXRoJywgJ3B1c2gnXVxuXHQgIH0sXG5cblx0ICAnaW5TaW5nbGVRdW90ZSc6IHtcblx0ICAgIFwiJ1wiOiBbJ2FmdGVyRWxlbWVudCddLFxuXHQgICAgJ2VvZic6ICdlcnJvcicsXG5cdCAgICAnZWxzZSc6IFsnaW5TaW5nbGVRdW90ZScsICdhcHBlbmQnXVxuXHQgIH0sXG5cblx0ICAnaW5Eb3VibGVRdW90ZSc6IHtcblx0ICAgICdcIic6IFsnYWZ0ZXJFbGVtZW50J10sXG5cdCAgICAnZW9mJzogJ2Vycm9yJyxcblx0ICAgICdlbHNlJzogWydpbkRvdWJsZVF1b3RlJywgJ2FwcGVuZCddXG5cdCAgfSxcblxuXHQgICdhZnRlckVsZW1lbnQnOiB7XG5cdCAgICAnd3MnOiBbJ2FmdGVyRWxlbWVudCddLFxuXHQgICAgJ10nOiBbJ2luUGF0aCcsICdwdXNoJ11cblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiBub29wICgpIHt9XG5cblx0LyoqXG5cdCAqIERldGVybWluZSB0aGUgdHlwZSBvZiBhIGNoYXJhY3RlciBpbiBhIGtleXBhdGguXG5cdCAqXG5cdCAqIEBwYXJhbSB7Q2hhcn0gY2hhclxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IHR5cGVcblx0ICovXG5cblx0ZnVuY3Rpb24gZ2V0UGF0aENoYXJUeXBlIChjaGFyKSB7XG5cdCAgaWYgKGNoYXIgPT09IHVuZGVmaW5lZCkge1xuXHQgICAgcmV0dXJuICdlb2YnXG5cdCAgfVxuXG5cdCAgdmFyIGNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMClcblxuXHQgIHN3aXRjaChjb2RlKSB7XG5cdCAgICBjYXNlIDB4NUI6IC8vIFtcblx0ICAgIGNhc2UgMHg1RDogLy8gXVxuXHQgICAgY2FzZSAweDJFOiAvLyAuXG5cdCAgICBjYXNlIDB4MjI6IC8vIFwiXG5cdCAgICBjYXNlIDB4Mjc6IC8vICdcblx0ICAgIGNhc2UgMHgzMDogLy8gMFxuXHQgICAgICByZXR1cm4gY2hhclxuXG5cdCAgICBjYXNlIDB4NUY6IC8vIF9cblx0ICAgIGNhc2UgMHgyNDogLy8gJFxuXHQgICAgICByZXR1cm4gJ2lkZW50J1xuXG5cdCAgICBjYXNlIDB4MjA6IC8vIFNwYWNlXG5cdCAgICBjYXNlIDB4MDk6IC8vIFRhYlxuXHQgICAgY2FzZSAweDBBOiAvLyBOZXdsaW5lXG5cdCAgICBjYXNlIDB4MEQ6IC8vIFJldHVyblxuXHQgICAgY2FzZSAweEEwOiAgLy8gTm8tYnJlYWsgc3BhY2Vcblx0ICAgIGNhc2UgMHhGRUZGOiAgLy8gQnl0ZSBPcmRlciBNYXJrXG5cdCAgICBjYXNlIDB4MjAyODogIC8vIExpbmUgU2VwYXJhdG9yXG5cdCAgICBjYXNlIDB4MjAyOTogIC8vIFBhcmFncmFwaCBTZXBhcmF0b3Jcblx0ICAgICAgcmV0dXJuICd3cydcblx0ICB9XG5cblx0ICAvLyBhLXosIEEtWlxuXHQgIGlmICgoMHg2MSA8PSBjb2RlICYmIGNvZGUgPD0gMHg3QSkgfHxcblx0ICAgICAgKDB4NDEgPD0gY29kZSAmJiBjb2RlIDw9IDB4NUEpKSB7XG5cdCAgICByZXR1cm4gJ2lkZW50J1xuXHQgIH1cblxuXHQgIC8vIDEtOVxuXHQgIGlmICgweDMxIDw9IGNvZGUgJiYgY29kZSA8PSAweDM5KSB7XG5cdCAgICByZXR1cm4gJ251bWJlcidcblx0ICB9XG5cblx0ICByZXR1cm4gJ2Vsc2UnXG5cdH1cblxuXHQvKipcblx0ICogUGFyc2UgYSBzdHJpbmcgcGF0aCBpbnRvIGFuIGFycmF5IG9mIHNlZ21lbnRzXG5cdCAqIFRvZG8gaW1wbGVtZW50IGNhY2hlXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG5cdCAqIEByZXR1cm4ge0FycmF5fHVuZGVmaW5lZH1cblx0ICovXG5cblx0ZnVuY3Rpb24gcGFyc2VQYXRoIChwYXRoKSB7XG5cdCAgdmFyIGtleXMgPSBbXVxuXHQgIHZhciBpbmRleCA9IC0xXG5cdCAgdmFyIG1vZGUgPSAnYmVmb3JlUGF0aCdcblx0ICB2YXIgYywgbmV3Q2hhciwga2V5LCB0eXBlLCB0cmFuc2l0aW9uLCBhY3Rpb24sIHR5cGVNYXBcblxuXHQgIHZhciBhY3Rpb25zID0ge1xuXHQgICAgcHVzaDogZnVuY3Rpb24oKSB7XG5cdCAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgIHJldHVyblxuXHQgICAgICB9XG5cdCAgICAgIGtleXMucHVzaChrZXkpXG5cdCAgICAgIGtleSA9IHVuZGVmaW5lZFxuXHQgICAgfSxcblx0ICAgIGFwcGVuZDogZnVuY3Rpb24oKSB7XG5cdCAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgIGtleSA9IG5ld0NoYXJcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBrZXkgKz0gbmV3Q2hhclxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXG5cdCAgZnVuY3Rpb24gbWF5YmVVbmVzY2FwZVF1b3RlICgpIHtcblx0ICAgIHZhciBuZXh0Q2hhciA9IHBhdGhbaW5kZXggKyAxXVxuXHQgICAgaWYgKChtb2RlID09PSAnaW5TaW5nbGVRdW90ZScgJiYgbmV4dENoYXIgPT09IFwiJ1wiKSB8fFxuXHQgICAgICAgIChtb2RlID09PSAnaW5Eb3VibGVRdW90ZScgJiYgbmV4dENoYXIgPT09ICdcIicpKSB7XG5cdCAgICAgIGluZGV4Kytcblx0ICAgICAgbmV3Q2hhciA9IG5leHRDaGFyXG5cdCAgICAgIGFjdGlvbnMuYXBwZW5kKClcblx0ICAgICAgcmV0dXJuIHRydWVcblx0ICAgIH1cblx0ICB9XG5cblx0ICB3aGlsZSAobW9kZSkge1xuXHQgICAgaW5kZXgrK1xuXHQgICAgYyA9IHBhdGhbaW5kZXhdXG5cblx0ICAgIGlmIChjID09PSAnXFxcXCcgJiYgbWF5YmVVbmVzY2FwZVF1b3RlKCkpIHtcblx0ICAgICAgY29udGludWVcblx0ICAgIH1cblxuXHQgICAgdHlwZSA9IGdldFBhdGhDaGFyVHlwZShjKVxuXHQgICAgdHlwZU1hcCA9IHBhdGhTdGF0ZU1hY2hpbmVbbW9kZV1cblx0ICAgIHRyYW5zaXRpb24gPSB0eXBlTWFwW3R5cGVdIHx8IHR5cGVNYXBbJ2Vsc2UnXSB8fCAnZXJyb3InXG5cblx0ICAgIGlmICh0cmFuc2l0aW9uID09PSAnZXJyb3InKSB7XG5cdCAgICAgIHJldHVybiAvLyBwYXJzZSBlcnJvclxuXHQgICAgfVxuXG5cdCAgICBtb2RlID0gdHJhbnNpdGlvblswXVxuXHQgICAgYWN0aW9uID0gYWN0aW9uc1t0cmFuc2l0aW9uWzFdXSB8fCBub29wXG5cdCAgICBuZXdDaGFyID0gdHJhbnNpdGlvblsyXSA9PT0gdW5kZWZpbmVkXG5cdCAgICAgID8gY1xuXHQgICAgICA6IHRyYW5zaXRpb25bMl1cblx0ICAgIGFjdGlvbigpXG5cblx0ICAgIGlmIChtb2RlID09PSAnYWZ0ZXJQYXRoJykge1xuXHQgICAgICByZXR1cm4ga2V5c1xuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGb3JtYXQgYSBhY2Nlc3NvciBzZWdtZW50IGJhc2VkIG9uIGl0cyB0eXBlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGZvcm1hdEFjY2Vzc29yKGtleSkge1xuXHQgIGlmIChpZGVudFJFLnRlc3Qoa2V5KSkgeyAvLyBpZGVudGlmaWVyXG5cdCAgICByZXR1cm4gJy4nICsga2V5XG5cdCAgfSBlbHNlIGlmICgra2V5ID09PSBrZXkgPj4+IDApIHsgLy8gYnJhY2tldCBpbmRleFxuXHQgICAgcmV0dXJuICdbJyArIGtleSArICddJztcblx0ICB9IGVsc2UgeyAvLyBicmFja2V0IHN0cmluZ1xuXHQgICAgcmV0dXJuICdbXCInICsga2V5LnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl0nO1xuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb21waWxlcyBhIGdldHRlciBmdW5jdGlvbiB3aXRoIGEgZml4ZWQgcGF0aC5cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheX0gcGF0aFxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn1cblx0ICovXG5cblx0ZXhwb3J0cy5jb21waWxlR2V0dGVyID0gZnVuY3Rpb24gKHBhdGgpIHtcblx0ICB2YXIgYm9keSA9XG5cdCAgICAndHJ5e3JldHVybiBvJyArXG5cdCAgICBwYXRoLm1hcChmb3JtYXRBY2Nlc3Nvcikuam9pbignJykgK1xuXHQgICAgJ31jYXRjaChlKXt9Oydcblx0ICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdvJywgYm9keSlcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHRlcm5hbCBwYXJzZSB0aGF0IGNoZWNrIGZvciBhIGNhY2hlIGhpdCBmaXJzdFxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuXHQgKiBAcmV0dXJuIHtBcnJheXx1bmRlZmluZWR9XG5cdCAqL1xuXG5cdGV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAocGF0aCkge1xuXHQgIHZhciBoaXQgPSBwYXRoQ2FjaGUuZ2V0KHBhdGgpXG5cdCAgaWYgKCFoaXQpIHtcblx0ICAgIGhpdCA9IHBhcnNlUGF0aChwYXRoKVxuXHQgICAgaWYgKGhpdCkge1xuXHQgICAgICBoaXQuZ2V0ID0gZXhwb3J0cy5jb21waWxlR2V0dGVyKGhpdClcblx0ICAgICAgcGF0aENhY2hlLnB1dChwYXRoLCBoaXQpXG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiBoaXRcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgZnJvbSBhbiBvYmplY3QgZnJvbSBhIHBhdGggc3RyaW5nXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcblx0ICovXG5cblx0ZXhwb3J0cy5nZXQgPSBmdW5jdGlvbiAob2JqLCBwYXRoKSB7XG5cdCAgcGF0aCA9IGV4cG9ydHMucGFyc2UocGF0aClcblx0ICBpZiAocGF0aCkge1xuXHQgICAgcmV0dXJuIHBhdGguZ2V0KG9iailcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogU2V0IG9uIGFuIG9iamVjdCBmcm9tIGEgcGF0aFxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqXG5cdCAqIEBwYXJhbSB7U3RyaW5nIHwgQXJyYXl9IHBhdGhcblx0ICogQHBhcmFtIHsqfSB2YWxcblx0ICovXG5cblx0ZXhwb3J0cy5zZXQgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCB2YWwpIHtcblx0ICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG5cdCAgICBwYXRoID0gZXhwb3J0cy5wYXJzZShwYXRoKVxuXHQgIH1cblx0ICBpZiAoIXBhdGggfHwgIV8uaXNPYmplY3Qob2JqKSkge1xuXHQgICAgcmV0dXJuIGZhbHNlXG5cdCAgfVxuXHQgIHZhciBsYXN0LCBrZXlcblx0ICBmb3IgKHZhciBpID0gMCwgbCA9IHBhdGgubGVuZ3RoIC0gMTsgaSA8IGw7IGkrKykge1xuXHQgICAgbGFzdCA9IG9ialxuXHQgICAga2V5ID0gcGF0aFtpXVxuXHQgICAgb2JqID0gb2JqW2tleV1cblx0ICAgIGlmICghXy5pc09iamVjdChvYmopKSB7XG5cdCAgICAgIG9iaiA9IHt9XG5cdCAgICAgIGxhc3QuJGFkZChrZXksIG9iailcblx0ICAgIH1cblx0ICB9XG5cdCAga2V5ID0gcGF0aFtpXVxuXHQgIGlmIChrZXkgaW4gb2JqKSB7XG5cdCAgICBvYmpba2V5XSA9IHZhbFxuXHQgIH0gZWxzZSB7XG5cdCAgICBvYmouJGFkZChrZXksIHZhbClcblx0ICB9XG5cdCAgcmV0dXJuIHRydWVcblx0fVxuXG4vKioqLyB9LFxuLyogNDIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBDYWNoZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTIpXG5cdHZhciBjb25maWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuXHR2YXIgZGlyUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Mylcblx0dmFyIHJlZ2V4RXNjYXBlUkUgPSAvWy0uKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nXG5cdHZhciBjYWNoZSwgdGFnUkUsIGh0bWxSRSwgZmlyc3RDaGFyLCBsYXN0Q2hhclxuXG5cdC8qKlxuXHQgKiBFc2NhcGUgYSBzdHJpbmcgc28gaXQgY2FuIGJlIHVzZWQgaW4gYSBSZWdFeHBcblx0ICogY29uc3RydWN0b3IuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcblx0ICovXG5cblx0ZnVuY3Rpb24gZXNjYXBlUmVnZXggKHN0cikge1xuXHQgIHJldHVybiBzdHIucmVwbGFjZShyZWdleEVzY2FwZVJFLCAnXFxcXCQmJylcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21waWxlIHRoZSBpbnRlcnBvbGF0aW9uIHRhZyByZWdleC5cblx0ICpcblx0ICogQHJldHVybiB7UmVnRXhwfVxuXHQgKi9cblxuXHRmdW5jdGlvbiBjb21waWxlUmVnZXggKCkge1xuXHQgIGNvbmZpZy5fZGVsaW1pdGVyc0NoYW5nZWQgPSBmYWxzZVxuXHQgIHZhciBvcGVuID0gY29uZmlnLmRlbGltaXRlcnNbMF1cblx0ICB2YXIgY2xvc2UgPSBjb25maWcuZGVsaW1pdGVyc1sxXVxuXHQgIGZpcnN0Q2hhciA9IG9wZW4uY2hhckF0KDApXG5cdCAgbGFzdENoYXIgPSBjbG9zZS5jaGFyQXQoY2xvc2UubGVuZ3RoIC0gMSlcblx0ICB2YXIgZmlyc3RDaGFyUkUgPSBlc2NhcGVSZWdleChmaXJzdENoYXIpXG5cdCAgdmFyIGxhc3RDaGFyUkUgPSBlc2NhcGVSZWdleChsYXN0Q2hhcilcblx0ICB2YXIgb3BlblJFID0gZXNjYXBlUmVnZXgob3Blbilcblx0ICB2YXIgY2xvc2VSRSA9IGVzY2FwZVJlZ2V4KGNsb3NlKVxuXHQgIHRhZ1JFID0gbmV3IFJlZ0V4cChcblx0ICAgIGZpcnN0Q2hhclJFICsgJz8nICsgb3BlblJFICtcblx0ICAgICcoLis/KScgK1xuXHQgICAgY2xvc2VSRSArIGxhc3RDaGFyUkUgKyAnPycsXG5cdCAgICAnZydcblx0ICApXG5cdCAgaHRtbFJFID0gbmV3IFJlZ0V4cChcblx0ICAgICdeJyArIGZpcnN0Q2hhclJFICsgb3BlblJFICtcblx0ICAgICcuKicgK1xuXHQgICAgY2xvc2VSRSArIGxhc3RDaGFyUkUgKyAnJCdcblx0ICApXG5cdCAgLy8gcmVzZXQgY2FjaGVcblx0ICBjYWNoZSA9IG5ldyBDYWNoZSgxMDAwKVxuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlIGEgdGVtcGxhdGUgdGV4dCBzdHJpbmcgaW50byBhbiBhcnJheSBvZiB0b2tlbnMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG5cdCAqIEByZXR1cm4ge0FycmF5PE9iamVjdD4gfCBudWxsfVxuXHQgKiAgICAgICAgICAgICAgIC0ge1N0cmluZ30gdHlwZVxuXHQgKiAgICAgICAgICAgICAgIC0ge1N0cmluZ30gdmFsdWVcblx0ICogICAgICAgICAgICAgICAtIHtCb29sZWFufSBbaHRtbF1cblx0ICogICAgICAgICAgICAgICAtIHtCb29sZWFufSBbb25lVGltZV1cblx0ICovXG5cblx0ZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uICh0ZXh0KSB7XG5cdCAgaWYgKGNvbmZpZy5fZGVsaW1pdGVyc0NoYW5nZWQpIHtcblx0ICAgIGNvbXBpbGVSZWdleCgpXG5cdCAgfVxuXHQgIHZhciBoaXQgPSBjYWNoZS5nZXQodGV4dClcblx0ICBpZiAoaGl0KSB7XG5cdCAgICByZXR1cm4gaGl0XG5cdCAgfVxuXHQgIGlmICghdGFnUkUudGVzdCh0ZXh0KSkge1xuXHQgICAgcmV0dXJuIG51bGxcblx0ICB9XG5cdCAgdmFyIHRva2VucyA9IFtdXG5cdCAgdmFyIGxhc3RJbmRleCA9IHRhZ1JFLmxhc3RJbmRleCA9IDBcblx0ICB2YXIgbWF0Y2gsIGluZGV4LCB2YWx1ZSwgZmlyc3QsIG9uZVRpbWUsIHBhcnRpYWxcblx0ICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cdCAgd2hpbGUgKG1hdGNoID0gdGFnUkUuZXhlYyh0ZXh0KSkge1xuXHQgICAgaW5kZXggPSBtYXRjaC5pbmRleFxuXHQgICAgLy8gcHVzaCB0ZXh0IHRva2VuXG5cdCAgICBpZiAoaW5kZXggPiBsYXN0SW5kZXgpIHtcblx0ICAgICAgdG9rZW5zLnB1c2goe1xuXHQgICAgICAgIHZhbHVlOiB0ZXh0LnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpXG5cdCAgICAgIH0pXG5cdCAgICB9XG5cdCAgICAvLyB0YWcgdG9rZW5cblx0ICAgIGZpcnN0ID0gbWF0Y2hbMV0uY2hhckNvZGVBdCgwKVxuXHQgICAgb25lVGltZSA9IGZpcnN0ID09PSAweDJBIC8vICpcblx0ICAgIHBhcnRpYWwgPSBmaXJzdCA9PT0gMHgzRSAvLyA+XG5cdCAgICB2YWx1ZSA9IChvbmVUaW1lIHx8IHBhcnRpYWwpXG5cdCAgICAgID8gbWF0Y2hbMV0uc2xpY2UoMSlcblx0ICAgICAgOiBtYXRjaFsxXVxuXHQgICAgdG9rZW5zLnB1c2goe1xuXHQgICAgICB0YWc6IHRydWUsXG5cdCAgICAgIHZhbHVlOiB2YWx1ZS50cmltKCksXG5cdCAgICAgIGh0bWw6IGh0bWxSRS50ZXN0KG1hdGNoWzBdKSxcblx0ICAgICAgb25lVGltZTogb25lVGltZSxcblx0ICAgICAgcGFydGlhbDogcGFydGlhbFxuXHQgICAgfSlcblx0ICAgIGxhc3RJbmRleCA9IGluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoXG5cdCAgfVxuXHQgIGlmIChsYXN0SW5kZXggPCB0ZXh0Lmxlbmd0aCkge1xuXHQgICAgdG9rZW5zLnB1c2goe1xuXHQgICAgICB2YWx1ZTogdGV4dC5zbGljZShsYXN0SW5kZXgpXG5cdCAgICB9KVxuXHQgIH1cblx0ICBjYWNoZS5wdXQodGV4dCwgdG9rZW5zKVxuXHQgIHJldHVybiB0b2tlbnNcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3JtYXQgYSBsaXN0IG9mIHRva2VucyBpbnRvIGFuIGV4cHJlc3Npb24uXG5cdCAqIGUuZy4gdG9rZW5zIHBhcnNlZCBmcm9tICdhIHt7Yn19IGMnIGNhbiBiZSBzZXJpYWxpemVkXG5cdCAqIGludG8gb25lIHNpbmdsZSBleHByZXNzaW9uIGFzICdcImEgXCIgKyBiICsgXCIgY1wiJy5cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheX0gdG9rZW5zXG5cdCAqIEBwYXJhbSB7VnVlfSBbdm1dXG5cdCAqIEByZXR1cm4ge1N0cmluZ31cblx0ICovXG5cblx0ZXhwb3J0cy50b2tlbnNUb0V4cCA9IGZ1bmN0aW9uICh0b2tlbnMsIHZtKSB7XG5cdCAgcmV0dXJuIHRva2Vucy5sZW5ndGggPiAxXG5cdCAgICA/IHRva2Vucy5tYXAoZnVuY3Rpb24gKHRva2VuKSB7XG5cdCAgICAgICAgcmV0dXJuIGZvcm1hdFRva2VuKHRva2VuLCB2bSlcblx0ICAgICAgfSkuam9pbignKycpXG5cdCAgICA6IGZvcm1hdFRva2VuKHRva2Vuc1swXSwgdm0sIHRydWUpXG5cdH1cblxuXHQvKipcblx0ICogRm9ybWF0IGEgc2luZ2xlIHRva2VuLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdG9rZW5cblx0ICogQHBhcmFtIHtWdWV9IFt2bV1cblx0ICogQHBhcmFtIHtCb29sZWFufSBzaW5nbGVcblx0ICogQHJldHVybiB7U3RyaW5nfVxuXHQgKi9cblxuXHRmdW5jdGlvbiBmb3JtYXRUb2tlbiAodG9rZW4sIHZtLCBzaW5nbGUpIHtcblx0ICByZXR1cm4gdG9rZW4udGFnXG5cdCAgICA/IHZtICYmIHRva2VuLm9uZVRpbWVcblx0ICAgICAgPyAnXCInICsgdm0uJGV2YWwodG9rZW4udmFsdWUpICsgJ1wiJ1xuXHQgICAgICA6IHNpbmdsZVxuXHQgICAgICAgID8gdG9rZW4udmFsdWVcblx0ICAgICAgICA6IGlubGluZUZpbHRlcnModG9rZW4udmFsdWUpXG5cdCAgICA6ICdcIicgKyB0b2tlbi52YWx1ZSArICdcIidcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3IgYW4gYXR0cmlidXRlIHdpdGggbXVsdGlwbGUgaW50ZXJwb2xhdGlvbiB0YWdzLFxuXHQgKiBlLmcuIGF0dHI9XCJzb21lLXt7dGhpbmcgfCBmaWx0ZXJ9fVwiLCBpbiBvcmRlciB0byBjb21iaW5lXG5cdCAqIHRoZSB3aG9sZSB0aGluZyBpbnRvIGEgc2luZ2xlIHdhdGNoYWJsZSBleHByZXNzaW9uLCB3ZVxuXHQgKiBoYXZlIHRvIGlubGluZSB0aG9zZSBmaWx0ZXJzLiBUaGlzIGZ1bmN0aW9uIGRvZXMgZXhhY3RseVxuXHQgKiB0aGF0LiBUaGlzIGlzIGEgYml0IGhhY2t5IGJ1dCBpdCBhdm9pZHMgaGVhdnkgY2hhbmdlc1xuXHQgKiB0byBkaXJlY3RpdmUgcGFyc2VyIGFuZCB3YXRjaGVyIG1lY2hhbmlzbS5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdHZhciBmaWx0ZXJSRSA9IC9bXnxdXFx8W158XS9cblx0ZnVuY3Rpb24gaW5saW5lRmlsdGVycyAoZXhwKSB7XG5cdCAgaWYgKCFmaWx0ZXJSRS50ZXN0KGV4cCkpIHtcblx0ICAgIHJldHVybiAnKCcgKyBleHAgKyAnKSdcblx0ICB9IGVsc2Uge1xuXHQgICAgdmFyIGRpciA9IGRpclBhcnNlci5wYXJzZShleHApWzBdXG5cdCAgICBpZiAoIWRpci5maWx0ZXJzKSB7XG5cdCAgICAgIHJldHVybiAnKCcgKyBleHAgKyAnKSdcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGV4cCA9IGRpci5leHByZXNzaW9uXG5cdCAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZGlyLmZpbHRlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgICAgdmFyIGZpbHRlciA9IGRpci5maWx0ZXJzW2ldXG5cdCAgICAgICAgdmFyIGFyZ3MgPSBmaWx0ZXIuYXJnc1xuXHQgICAgICAgICAgPyAnLFwiJyArIGZpbHRlci5hcmdzLmpvaW4oJ1wiLFwiJykgKyAnXCInXG5cdCAgICAgICAgICA6ICcnXG5cdCAgICAgICAgZXhwID0gJ3RoaXMuJG9wdGlvbnMuZmlsdGVyc1tcIicgKyBmaWx0ZXIubmFtZSArICdcIl0nICtcblx0ICAgICAgICAgICcuYXBwbHkodGhpcyxbJyArIGV4cCArIGFyZ3MgKyAnXSknXG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIGV4cFxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogNDMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgQ2FjaGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUyKVxuXHR2YXIgY2FjaGUgPSBuZXcgQ2FjaGUoMTAwMClcblx0dmFyIGFyZ1JFID0gL15bXlxce1xcP10rJHxeJ1teJ10qJyR8XlwiW15cIl0qXCIkL1xuXHR2YXIgZmlsdGVyVG9rZW5SRSA9IC9bXlxccydcIl0rfCdbXiddKyd8XCJbXlwiXStcIi9nXG5cblx0LyoqXG5cdCAqIFBhcnNlciBzdGF0ZVxuXHQgKi9cblxuXHR2YXIgc3RyXG5cdHZhciBjLCBpLCBsXG5cdHZhciBpblNpbmdsZVxuXHR2YXIgaW5Eb3VibGVcblx0dmFyIGN1cmx5XG5cdHZhciBzcXVhcmVcblx0dmFyIHBhcmVuXG5cdHZhciBiZWdpblxuXHR2YXIgYXJnSW5kZXhcblx0dmFyIGRpcnNcblx0dmFyIGRpclxuXHR2YXIgbGFzdEZpbHRlckluZGV4XG5cdHZhciBhcmdcblxuXHQvKipcblx0ICogUHVzaCBhIGRpcmVjdGl2ZSBvYmplY3QgaW50byB0aGUgcmVzdWx0IEFycmF5XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHB1c2hEaXIgKCkge1xuXHQgIGRpci5yYXcgPSBzdHIuc2xpY2UoYmVnaW4sIGkpLnRyaW0oKVxuXHQgIGlmIChkaXIuZXhwcmVzc2lvbiA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICBkaXIuZXhwcmVzc2lvbiA9IHN0ci5zbGljZShhcmdJbmRleCwgaSkudHJpbSgpXG5cdCAgfSBlbHNlIGlmIChsYXN0RmlsdGVySW5kZXggIT09IGJlZ2luKSB7XG5cdCAgICBwdXNoRmlsdGVyKClcblx0ICB9XG5cdCAgaWYgKGkgPT09IDAgfHwgZGlyLmV4cHJlc3Npb24pIHtcblx0ICAgIGRpcnMucHVzaChkaXIpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFB1c2ggYSBmaWx0ZXIgdG8gdGhlIGN1cnJlbnQgZGlyZWN0aXZlIG9iamVjdFxuXHQgKi9cblxuXHRmdW5jdGlvbiBwdXNoRmlsdGVyICgpIHtcblx0ICB2YXIgZXhwID0gc3RyLnNsaWNlKGxhc3RGaWx0ZXJJbmRleCwgaSkudHJpbSgpXG5cdCAgdmFyIGZpbHRlclxuXHQgIGlmIChleHApIHtcblx0ICAgIGZpbHRlciA9IHt9XG5cdCAgICB2YXIgdG9rZW5zID0gZXhwLm1hdGNoKGZpbHRlclRva2VuUkUpXG5cdCAgICBmaWx0ZXIubmFtZSA9IHRva2Vuc1swXVxuXHQgICAgZmlsdGVyLmFyZ3MgPSB0b2tlbnMubGVuZ3RoID4gMSA/IHRva2Vucy5zbGljZSgxKSA6IG51bGxcblx0ICB9XG5cdCAgaWYgKGZpbHRlcikge1xuXHQgICAgKGRpci5maWx0ZXJzID0gZGlyLmZpbHRlcnMgfHwgW10pLnB1c2goZmlsdGVyKVxuXHQgIH1cblx0ICBsYXN0RmlsdGVySW5kZXggPSBpICsgMVxuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlIGEgZGlyZWN0aXZlIHN0cmluZyBpbnRvIGFuIEFycmF5IG9mIEFTVC1saWtlXG5cdCAqIG9iamVjdHMgcmVwcmVzZW50aW5nIGRpcmVjdGl2ZXMuXG5cdCAqXG5cdCAqIEV4YW1wbGU6XG5cdCAqXG5cdCAqIFwiY2xpY2s6IGEgPSBhICsgMSB8IHVwcGVyY2FzZVwiIHdpbGwgeWllbGQ6XG5cdCAqIHtcblx0ICogICBhcmc6ICdjbGljaycsXG5cdCAqICAgZXhwcmVzc2lvbjogJ2EgPSBhICsgMScsXG5cdCAqICAgZmlsdGVyczogW1xuXHQgKiAgICAgeyBuYW1lOiAndXBwZXJjYXNlJywgYXJnczogbnVsbCB9XG5cdCAqICAgXVxuXHQgKiB9XG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcblx0ICogQHJldHVybiB7QXJyYXk8T2JqZWN0Pn1cblx0ICovXG5cblx0ZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uIChzKSB7XG5cblx0ICB2YXIgaGl0ID0gY2FjaGUuZ2V0KHMpXG5cdCAgaWYgKGhpdCkge1xuXHQgICAgcmV0dXJuIGhpdFxuXHQgIH1cblxuXHQgIC8vIHJlc2V0IHBhcnNlciBzdGF0ZVxuXHQgIHN0ciA9IHNcblx0ICBpblNpbmdsZSA9IGluRG91YmxlID0gZmFsc2Vcblx0ICBjdXJseSA9IHNxdWFyZSA9IHBhcmVuID0gYmVnaW4gPSBhcmdJbmRleCA9IDBcblx0ICBsYXN0RmlsdGVySW5kZXggPSAwXG5cdCAgZGlycyA9IFtdXG5cdCAgZGlyID0ge31cblx0ICBhcmcgPSBudWxsXG5cblx0ICBmb3IgKGkgPSAwLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG5cdCAgICBpZiAoaW5TaW5nbGUpIHtcblx0ICAgICAgLy8gY2hlY2sgc2luZ2xlIHF1b3RlXG5cdCAgICAgIGlmIChjID09PSAweDI3KSBpblNpbmdsZSA9ICFpblNpbmdsZVxuXHQgICAgfSBlbHNlIGlmIChpbkRvdWJsZSkge1xuXHQgICAgICAvLyBjaGVjayBkb3VibGUgcXVvdGVcblx0ICAgICAgaWYgKGMgPT09IDB4MjIpIGluRG91YmxlID0gIWluRG91YmxlXG5cdCAgICB9IGVsc2UgaWYgKFxuXHQgICAgICBjID09PSAweDJDICYmIC8vIGNvbW1hXG5cdCAgICAgICFwYXJlbiAmJiAhY3VybHkgJiYgIXNxdWFyZVxuXHQgICAgKSB7XG5cdCAgICAgIC8vIHJlYWNoZWQgdGhlIGVuZCBvZiBhIGRpcmVjdGl2ZVxuXHQgICAgICBwdXNoRGlyKClcblx0ICAgICAgLy8gcmVzZXQgJiBza2lwIHRoZSBjb21tYVxuXHQgICAgICBkaXIgPSB7fVxuXHQgICAgICBiZWdpbiA9IGFyZ0luZGV4ID0gbGFzdEZpbHRlckluZGV4ID0gaSArIDFcblx0ICAgIH0gZWxzZSBpZiAoXG5cdCAgICAgIGMgPT09IDB4M0EgJiYgLy8gY29sb25cblx0ICAgICAgIWRpci5leHByZXNzaW9uICYmXG5cdCAgICAgICFkaXIuYXJnXG5cdCAgICApIHtcblx0ICAgICAgLy8gYXJndW1lbnRcblx0ICAgICAgYXJnID0gc3RyLnNsaWNlKGJlZ2luLCBpKS50cmltKClcblx0ICAgICAgLy8gdGVzdCBmb3IgdmFsaWQgYXJndW1lbnQgaGVyZVxuXHQgICAgICAvLyBzaW5jZSB3ZSBtYXkgaGF2ZSBjYXVnaHQgc3R1ZmYgbGlrZSBmaXJzdCBoYWxmIG9mXG5cdCAgICAgIC8vIGFuIG9iamVjdCBsaXRlcmFsIG9yIGEgdGVybmFyeSBleHByZXNzaW9uLlxuXHQgICAgICBpZiAoYXJnUkUudGVzdChhcmcpKSB7XG5cdCAgICAgICAgYXJnSW5kZXggPSBpICsgMVxuXHQgICAgICAgIGRpci5hcmcgPSBfLnN0cmlwUXVvdGVzKGFyZykgfHwgYXJnXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSBpZiAoXG5cdCAgICAgIGMgPT09IDB4N0MgJiYgLy8gcGlwZVxuXHQgICAgICBzdHIuY2hhckNvZGVBdChpICsgMSkgIT09IDB4N0MgJiZcblx0ICAgICAgc3RyLmNoYXJDb2RlQXQoaSAtIDEpICE9PSAweDdDXG5cdCAgICApIHtcblx0ICAgICAgaWYgKGRpci5leHByZXNzaW9uID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAvLyBmaXJzdCBmaWx0ZXIsIGVuZCBvZiBleHByZXNzaW9uXG5cdCAgICAgICAgbGFzdEZpbHRlckluZGV4ID0gaSArIDFcblx0ICAgICAgICBkaXIuZXhwcmVzc2lvbiA9IHN0ci5zbGljZShhcmdJbmRleCwgaSkudHJpbSgpXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgLy8gYWxyZWFkeSBoYXMgZmlsdGVyXG5cdCAgICAgICAgcHVzaEZpbHRlcigpXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHN3aXRjaCAoYykge1xuXHQgICAgICAgIGNhc2UgMHgyMjogaW5Eb3VibGUgPSB0cnVlOyBicmVhayAvLyBcIlxuXHQgICAgICAgIGNhc2UgMHgyNzogaW5TaW5nbGUgPSB0cnVlOyBicmVhayAvLyAnXG5cdCAgICAgICAgY2FzZSAweDI4OiBwYXJlbisrOyBicmVhayAgICAgICAgIC8vIChcblx0ICAgICAgICBjYXNlIDB4Mjk6IHBhcmVuLS07IGJyZWFrICAgICAgICAgLy8gKVxuXHQgICAgICAgIGNhc2UgMHg1Qjogc3F1YXJlKys7IGJyZWFrICAgICAgICAvLyBbXG5cdCAgICAgICAgY2FzZSAweDVEOiBzcXVhcmUtLTsgYnJlYWsgICAgICAgIC8vIF1cblx0ICAgICAgICBjYXNlIDB4N0I6IGN1cmx5Kys7IGJyZWFrICAgICAgICAgLy8ge1xuXHQgICAgICAgIGNhc2UgMHg3RDogY3VybHktLTsgYnJlYWsgICAgICAgICAvLyB9XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cblx0ICBpZiAoaSA9PT0gMCB8fCBiZWdpbiAhPT0gaSkge1xuXHQgICAgcHVzaERpcigpXG5cdCAgfVxuXG5cdCAgY2FjaGUucHV0KHMsIGRpcnMpXG5cdCAgcmV0dXJuIGRpcnNcblx0fVxuXG4vKioqLyB9LFxuLyogNDQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgUGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18oNDEpXG5cdHZhciBDYWNoZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTIpXG5cdHZhciBleHByZXNzaW9uQ2FjaGUgPSBuZXcgQ2FjaGUoMTAwMClcblxuXHR2YXIga2V5d29yZHMgPVxuXHQgICdNYXRoLGJyZWFrLGNhc2UsY2F0Y2gsY29udGludWUsZGVidWdnZXIsZGVmYXVsdCwnICtcblx0ICAnZGVsZXRlLGRvLGVsc2UsZmFsc2UsZmluYWxseSxmb3IsZnVuY3Rpb24saWYsaW4sJyArXG5cdCAgJ2luc3RhbmNlb2YsbmV3LG51bGwscmV0dXJuLHN3aXRjaCx0aGlzLHRocm93LHRydWUsdHJ5LCcgK1xuXHQgICd0eXBlb2YsdmFyLHZvaWQsd2hpbGUsd2l0aCx1bmRlZmluZWQsYWJzdHJhY3QsYm9vbGVhbiwnICtcblx0ICAnYnl0ZSxjaGFyLGNsYXNzLGNvbnN0LGRvdWJsZSxlbnVtLGV4cG9ydCxleHRlbmRzLCcgK1xuXHQgICdmaW5hbCxmbG9hdCxnb3RvLGltcGxlbWVudHMsaW1wb3J0LGludCxpbnRlcmZhY2UsbG9uZywnICtcblx0ICAnbmF0aXZlLHBhY2thZ2UscHJpdmF0ZSxwcm90ZWN0ZWQscHVibGljLHNob3J0LHN0YXRpYywnICtcblx0ICAnc3VwZXIsc3luY2hyb25pemVkLHRocm93cyx0cmFuc2llbnQsdm9sYXRpbGUsJyArXG5cdCAgJ2FyZ3VtZW50cyxsZXQseWllbGQnXG5cblx0dmFyIHdzUkUgPSAvXFxzL2dcblx0dmFyIG5ld2xpbmVSRSA9IC9cXG4vZ1xuXHR2YXIgc2F2ZVJFID0gL1tcXHssXVxccypbXFx3XFwkX10rXFxzKjp8J1teJ10qJ3xcIlteXCJdKlwiL2dcblx0dmFyIHJlc3RvcmVSRSA9IC9cIihcXGQrKVwiL2dcblx0dmFyIHBhdGhUZXN0UkUgPSAvXltBLVphLXpfJF1bXFx3JF0qKFxcLltBLVphLXpfJF1bXFx3JF0qfFxcWycuKj8nXFxdfFxcW1wiLio/XCJcXF0pKiQvXG5cdHZhciBwYXRoUmVwbGFjZVJFID0gL1teXFx3JFxcLl0oW0EtWmEtel8kXVtcXHckXSooXFwuW0EtWmEtel8kXVtcXHckXSp8XFxbJy4qPydcXF18XFxbXCIuKj9cIlxcXSkqKS9nXG5cdHZhciBrZXl3b3Jkc1JFID0gbmV3IFJlZ0V4cCgnXignICsga2V5d29yZHMucmVwbGFjZSgvLC9nLCAnXFxcXGJ8JykgKyAnXFxcXGIpJylcblxuXHQvKipcblx0ICogU2F2ZSAvIFJld3JpdGUgLyBSZXN0b3JlXG5cdCAqXG5cdCAqIFdoZW4gcmV3cml0aW5nIHBhdGhzIGZvdW5kIGluIGFuIGV4cHJlc3Npb24sIGl0IGlzXG5cdCAqIHBvc3NpYmxlIGZvciB0aGUgc2FtZSBsZXR0ZXIgc2VxdWVuY2VzIHRvIGJlIGZvdW5kIGluXG5cdCAqIHN0cmluZ3MgYW5kIE9iamVjdCBsaXRlcmFsIHByb3BlcnR5IGtleXMuIFRoZXJlZm9yZSB3ZVxuXHQgKiByZW1vdmUgYW5kIHN0b3JlIHRoZXNlIHBhcnRzIGluIGEgdGVtcG9yYXJ5IGFycmF5LCBhbmRcblx0ICogcmVzdG9yZSB0aGVtIGFmdGVyIHRoZSBwYXRoIHJld3JpdGUuXG5cdCAqL1xuXG5cdHZhciBzYXZlZCA9IFtdXG5cblx0LyoqXG5cdCAqIFNhdmUgcmVwbGFjZXJcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0clxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gcGxhY2Vob2xkZXIgd2l0aCBpbmRleFxuXHQgKi9cblxuXHRmdW5jdGlvbiBzYXZlIChzdHIpIHtcblx0ICB2YXIgaSA9IHNhdmVkLmxlbmd0aFxuXHQgIHNhdmVkW2ldID0gc3RyLnJlcGxhY2UobmV3bGluZVJFLCAnXFxcXG4nKVxuXHQgIHJldHVybiAnXCInICsgaSArICdcIidcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXRoIHJld3JpdGUgcmVwbGFjZXJcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHJhd1xuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHJld3JpdGUgKHJhdykge1xuXHQgIHZhciBjID0gcmF3LmNoYXJBdCgwKVxuXHQgIHZhciBwYXRoID0gcmF3LnNsaWNlKDEpXG5cdCAgaWYgKGtleXdvcmRzUkUudGVzdChwYXRoKSkge1xuXHQgICAgcmV0dXJuIHJhd1xuXHQgIH0gZWxzZSB7XG5cdCAgICBwYXRoID0gcGF0aC5pbmRleE9mKCdcIicpID4gLTFcblx0ICAgICAgPyBwYXRoLnJlcGxhY2UocmVzdG9yZVJFLCByZXN0b3JlKVxuXHQgICAgICA6IHBhdGhcblx0ICAgIHJldHVybiBjICsgJ3Njb3BlLicgKyBwYXRoXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlc3RvcmUgcmVwbGFjZXJcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0clxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaSAtIG1hdGNoZWQgc2F2ZSBpbmRleFxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHJlc3RvcmUgKHN0ciwgaSkge1xuXHQgIHJldHVybiBzYXZlZFtpXVxuXHR9XG5cblx0LyoqXG5cdCAqIFJld3JpdGUgYW4gZXhwcmVzc2lvbiwgcHJlZml4aW5nIGFsbCBwYXRoIGFjY2Vzc29ycyB3aXRoXG5cdCAqIGBzY29wZS5gIGFuZCBnZW5lcmF0ZSBnZXR0ZXIvc2V0dGVyIGZ1bmN0aW9ucy5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG5lZWRTZXRcblx0ICogQHJldHVybiB7RnVuY3Rpb259XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNvbXBpbGVFeHBGbnMgKGV4cCwgbmVlZFNldCkge1xuXHQgIC8vIHJlc2V0IHN0YXRlXG5cdCAgc2F2ZWQubGVuZ3RoID0gMFxuXHQgIC8vIHNhdmUgc3RyaW5ncyBhbmQgb2JqZWN0IGxpdGVyYWwga2V5c1xuXHQgIHZhciBib2R5ID0gZXhwXG5cdCAgICAucmVwbGFjZShzYXZlUkUsIHNhdmUpXG5cdCAgICAucmVwbGFjZSh3c1JFLCAnJylcblx0ICAvLyByZXdyaXRlIGFsbCBwYXRoc1xuXHQgIC8vIHBhZCAxIHNwYWNlIGhlcmUgYmVjYXVlIHRoZSByZWdleCBtYXRjaGVzIDEgZXh0cmEgY2hhclxuXHQgIGJvZHkgPSAoJyAnICsgYm9keSlcblx0ICAgIC5yZXBsYWNlKHBhdGhSZXBsYWNlUkUsIHJld3JpdGUpXG5cdCAgICAucmVwbGFjZShyZXN0b3JlUkUsIHJlc3RvcmUpXG5cdCAgdmFyIGdldHRlciA9IG1ha2VHZXR0ZXIoYm9keSlcblx0ICBpZiAoZ2V0dGVyKSB7XG5cdCAgICByZXR1cm4ge1xuXHQgICAgICBnZXQ6IGdldHRlcixcblx0ICAgICAgYm9keTogYm9keSxcblx0ICAgICAgc2V0OiBuZWVkU2V0XG5cdCAgICAgICAgPyBtYWtlU2V0dGVyKGJvZHkpXG5cdCAgICAgICAgOiBudWxsXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBpbGUgZ2V0dGVyIHNldHRlcnMgZm9yIGEgc2ltcGxlIHBhdGguXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBleHBcblx0ICogQHJldHVybiB7RnVuY3Rpb259XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNvbXBpbGVQYXRoRm5zIChleHApIHtcblx0ICB2YXIgZ2V0dGVyLCBwYXRoXG5cdCAgaWYgKGV4cC5pbmRleE9mKCdbJykgPCAwKSB7XG5cdCAgICAvLyByZWFsbHkgc2ltcGxlIHBhdGhcblx0ICAgIHBhdGggPSBleHAuc3BsaXQoJy4nKVxuXHQgICAgZ2V0dGVyID0gUGF0aC5jb21waWxlR2V0dGVyKHBhdGgpXG5cdCAgfSBlbHNlIHtcblx0ICAgIC8vIGRvIHRoZSByZWFsIHBhcnNpbmdcblx0ICAgIHBhdGggPSBQYXRoLnBhcnNlKGV4cClcblx0ICAgIGdldHRlciA9IHBhdGguZ2V0XG5cdCAgfVxuXHQgIHJldHVybiB7XG5cdCAgICBnZXQ6IGdldHRlcixcblx0ICAgIC8vIGFsd2F5cyBnZW5lcmF0ZSBzZXR0ZXIgZm9yIHNpbXBsZSBwYXRoc1xuXHQgICAgc2V0OiBmdW5jdGlvbiAob2JqLCB2YWwpIHtcblx0ICAgICAgUGF0aC5zZXQob2JqLCBwYXRoLCB2YWwpXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIGEgZ2V0dGVyIGZ1bmN0aW9uLiBSZXF1aXJlcyBldmFsLlxuXHQgKlxuXHQgKiBXZSBpc29sYXRlIHRoZSB0cnkvY2F0Y2ggc28gaXQgZG9lc24ndCBhZmZlY3QgdGhlXG5cdCAqIG9wdGltaXphdGlvbiBvZiB0aGUgcGFyc2UgZnVuY3Rpb24gd2hlbiBpdCBpcyBub3QgY2FsbGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gYm9keVxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbnx1bmRlZmluZWR9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIG1ha2VHZXR0ZXIgKGJvZHkpIHtcblx0ICB0cnkge1xuXHQgICAgcmV0dXJuIG5ldyBGdW5jdGlvbignc2NvcGUnLCAncmV0dXJuICcgKyBib2R5ICsgJzsnKVxuXHQgIH0gY2F0Y2ggKGUpIHtcblx0ICAgIF8ud2Fybihcblx0ICAgICAgJ0ludmFsaWQgZXhwcmVzc2lvbi4gJyArIFxuXHQgICAgICAnR2VuZXJhdGVkIGZ1bmN0aW9uIGJvZHk6ICcgKyBib2R5XG5cdCAgICApXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIGEgc2V0dGVyIGZ1bmN0aW9uLlxuXHQgKlxuXHQgKiBUaGlzIGlzIG9ubHkgbmVlZGVkIGluIHJhcmUgc2l0dWF0aW9ucyBsaWtlIFwiYVtiXVwiIHdoZXJlXG5cdCAqIGEgc2V0dGFibGUgcGF0aCByZXF1aXJlcyBkeW5hbWljIGV2YWx1YXRpb24uXG5cdCAqXG5cdCAqIFRoaXMgc2V0dGVyIGZ1bmN0aW9uIG1heSB0aHJvdyBlcnJvciB3aGVuIGNhbGxlZCBpZiB0aGVcblx0ICogZXhwcmVzc2lvbiBib2R5IGlzIG5vdCBhIHZhbGlkIGxlZnQtaGFuZCBleHByZXNzaW9uIGluXG5cdCAqIGFzc2lnbm1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBib2R5XG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufHVuZGVmaW5lZH1cblx0ICovXG5cblx0ZnVuY3Rpb24gbWFrZVNldHRlciAoYm9keSkge1xuXHQgIHRyeSB7XG5cdCAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdzY29wZScsICd2YWx1ZScsIGJvZHkgKyAnPXZhbHVlOycpXG5cdCAgfSBjYXRjaCAoZSkge1xuXHQgICAgXy53YXJuKCdJbnZhbGlkIHNldHRlciBmdW5jdGlvbiBib2R5OiAnICsgYm9keSlcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgZm9yIHNldHRlciBleGlzdGVuY2Ugb24gYSBjYWNoZSBoaXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGhpdFxuXHQgKi9cblxuXHRmdW5jdGlvbiBjaGVja1NldHRlciAoaGl0KSB7XG5cdCAgaWYgKCFoaXQuc2V0KSB7XG5cdCAgICBoaXQuc2V0ID0gbWFrZVNldHRlcihoaXQuYm9keSlcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogUGFyc2UgYW4gZXhwcmVzc2lvbiBpbnRvIHJlLXdyaXR0ZW4gZ2V0dGVyL3NldHRlcnMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBleHBcblx0ICogQHBhcmFtIHtCb29sZWFufSBuZWVkU2V0XG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuXHQgKi9cblxuXHRleHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKGV4cCwgbmVlZFNldCkge1xuXHQgIGV4cCA9IGV4cC50cmltKClcblx0ICAvLyB0cnkgY2FjaGVcblx0ICB2YXIgaGl0ID0gZXhwcmVzc2lvbkNhY2hlLmdldChleHApXG5cdCAgaWYgKGhpdCkge1xuXHQgICAgaWYgKG5lZWRTZXQpIHtcblx0ICAgICAgY2hlY2tTZXR0ZXIoaGl0KVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGhpdFxuXHQgIH1cblx0ICAvLyB3ZSBkbyBhIHNpbXBsZSBwYXRoIGNoZWNrIHRvIG9wdGltaXplIGZvciB0aGVtLlxuXHQgIC8vIHRoZSBjaGVjayBmYWlscyB2YWxpZCBwYXRocyB3aXRoIHVudXNhbCB3aGl0ZXNwYWNlcyxcblx0ICAvLyBidXQgdGhhdCdzIHRvbyByYXJlIGFuZCB3ZSBkb24ndCBjYXJlLlxuXHQgIHZhciByZXMgPSBwYXRoVGVzdFJFLnRlc3QoZXhwKVxuXHQgICAgPyBjb21waWxlUGF0aEZucyhleHApXG5cdCAgICA6IGNvbXBpbGVFeHBGbnMoZXhwLCBuZWVkU2V0KVxuXHQgIGV4cHJlc3Npb25DYWNoZS5wdXQoZXhwLCByZXMpXG5cdCAgcmV0dXJuIHJlc1xuXHR9XG5cblx0Ly8gRXhwb3J0IHRoZSBwYXRoUmVnZXggZm9yIGV4dGVybmFsIHVzZVxuXHRleHBvcnRzLnBhdGhUZXN0UkUgPSBwYXRoVGVzdFJFXG5cbi8qKiovIH0sXG4vKiA0NSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBhcHBseUNTU1RyYW5zaXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUzKVxuXHR2YXIgYXBwbHlKU1RyYW5zaXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU0KVxuXG5cdC8qKlxuXHQgKiBBcHBlbmQgd2l0aCB0cmFuc2l0aW9uLlxuXHQgKlxuXHQgKiBAb2FyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqL1xuXG5cdGV4cG9ydHMuYXBwZW5kID0gZnVuY3Rpb24gKGVsLCB0YXJnZXQsIHZtLCBjYikge1xuXHQgIGFwcGx5KGVsLCAxLCBmdW5jdGlvbiAoKSB7XG5cdCAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoZWwpXG5cdCAgfSwgdm0sIGNiKVxuXHR9XG5cblx0LyoqXG5cdCAqIEluc2VydEJlZm9yZSB3aXRoIHRyYW5zaXRpb24uXG5cdCAqXG5cdCAqIEBvYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICovXG5cblx0ZXhwb3J0cy5iZWZvcmUgPSBmdW5jdGlvbiAoZWwsIHRhcmdldCwgdm0sIGNiKSB7XG5cdCAgYXBwbHkoZWwsIDEsIGZ1bmN0aW9uICgpIHtcblx0ICAgIF8uYmVmb3JlKGVsLCB0YXJnZXQpXG5cdCAgfSwgdm0sIGNiKVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSB3aXRoIHRyYW5zaXRpb24uXG5cdCAqXG5cdCAqIEBvYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICovXG5cblx0ZXhwb3J0cy5yZW1vdmUgPSBmdW5jdGlvbiAoZWwsIHZtLCBjYikge1xuXHQgIGFwcGx5KGVsLCAtMSwgZnVuY3Rpb24gKCkge1xuXHQgICAgXy5yZW1vdmUoZWwpXG5cdCAgfSwgdm0sIGNiKVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBieSBhcHBlbmRpbmcgdG8gYW5vdGhlciBwYXJlbnQgd2l0aCB0cmFuc2l0aW9uLlxuXHQgKiBUaGlzIGlzIG9ubHkgdXNlZCBpbiBibG9jayBvcGVyYXRpb25zLlxuXHQgKlxuXHQgKiBAb2FyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqL1xuXG5cdGV4cG9ydHMucmVtb3ZlVGhlbkFwcGVuZCA9IGZ1bmN0aW9uIChlbCwgdGFyZ2V0LCB2bSwgY2IpIHtcblx0ICBhcHBseShlbCwgLTEsIGZ1bmN0aW9uICgpIHtcblx0ICAgIHRhcmdldC5hcHBlbmRDaGlsZChlbClcblx0ICB9LCB2bSwgY2IpXG5cdH1cblxuXHQvKipcblx0ICogQXBwZW5kIHRoZSBjaGlsZE5vZGVzIG9mIGEgZnJhZ21lbnQgdG8gdGFyZ2V0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IGJsb2NrXG5cdCAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKi9cblxuXHRleHBvcnRzLmJsb2NrQXBwZW5kID0gZnVuY3Rpb24gKGJsb2NrLCB0YXJnZXQsIHZtKSB7XG5cdCAgdmFyIG5vZGVzID0gXy50b0FycmF5KGJsb2NrLmNoaWxkTm9kZXMpXG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSBub2Rlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgIGV4cG9ydHMuYmVmb3JlKG5vZGVzW2ldLCB0YXJnZXQsIHZtKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYSBibG9jayBvZiBub2RlcyBiZXR3ZWVuIHR3byBlZGdlIG5vZGVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IHN0YXJ0XG5cdCAqIEBwYXJhbSB7Tm9kZX0gZW5kXG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKi9cblxuXHRleHBvcnRzLmJsb2NrUmVtb3ZlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIHZtKSB7XG5cdCAgdmFyIG5vZGUgPSBzdGFydC5uZXh0U2libGluZ1xuXHQgIHZhciBuZXh0XG5cdCAgd2hpbGUgKG5vZGUgIT09IGVuZCkge1xuXHQgICAgbmV4dCA9IG5vZGUubmV4dFNpYmxpbmdcblx0ICAgIGV4cG9ydHMucmVtb3ZlKG5vZGUsIHZtKVxuXHQgICAgbm9kZSA9IG5leHRcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQXBwbHkgdHJhbnNpdGlvbnMgd2l0aCBhbiBvcGVyYXRpb24gY2FsbGJhY2suXG5cdCAqXG5cdCAqIEBvYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpcmVjdGlvblxuXHQgKiAgICAgICAgICAgICAgICAgIDE6IGVudGVyXG5cdCAqICAgICAgICAgICAgICAgICAtMTogbGVhdmVcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gb3AgLSB0aGUgYWN0dWFsIERPTSBvcGVyYXRpb25cblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICovXG5cblx0dmFyIGFwcGx5ID0gZXhwb3J0cy5hcHBseSA9IGZ1bmN0aW9uIChlbCwgZGlyZWN0aW9uLCBvcCwgdm0sIGNiKSB7XG5cdCAgdmFyIHRyYW5zRGF0YSA9IGVsLl9fdl90cmFuc1xuXHQgIGlmIChcblx0ICAgICF0cmFuc0RhdGEgfHxcblx0ICAgICF2bS5faXNDb21waWxlZCB8fFxuXHQgICAgLy8gaWYgdGhlIHZtIGlzIGJlaW5nIG1hbmlwdWxhdGVkIGJ5IGEgcGFyZW50IGRpcmVjdGl2ZVxuXHQgICAgLy8gZHVyaW5nIHRoZSBwYXJlbnQncyBjb21waWxhdGlvbiBwaGFzZSwgc2tpcCB0aGVcblx0ICAgIC8vIGFuaW1hdGlvbi5cblx0ICAgICh2bS4kcGFyZW50ICYmICF2bS4kcGFyZW50Ll9pc0NvbXBpbGVkKVxuXHQgICkge1xuXHQgICAgb3AoKVxuXHQgICAgaWYgKGNiKSBjYigpXG5cdCAgICByZXR1cm5cblx0ICB9XG5cdCAgLy8gZGV0ZXJtaW5lIHRoZSB0cmFuc2l0aW9uIHR5cGUgb24gdGhlIGVsZW1lbnRcblx0ICB2YXIganNUcmFuc2l0aW9uID0gdm0uJG9wdGlvbnMudHJhbnNpdGlvbnNbdHJhbnNEYXRhLmlkXVxuXHQgIGlmIChqc1RyYW5zaXRpb24pIHtcblx0ICAgIC8vIGpzXG5cdCAgICBhcHBseUpTVHJhbnNpdGlvbihcblx0ICAgICAgZWwsXG5cdCAgICAgIGRpcmVjdGlvbixcblx0ICAgICAgb3AsXG5cdCAgICAgIHRyYW5zRGF0YSxcblx0ICAgICAganNUcmFuc2l0aW9uLFxuXHQgICAgICB2bSxcblx0ICAgICAgY2Jcblx0ICAgIClcblx0ICB9IGVsc2UgaWYgKF8udHJhbnNpdGlvbkVuZEV2ZW50KSB7XG5cdCAgICAvLyBjc3Ncblx0ICAgIGFwcGx5Q1NTVHJhbnNpdGlvbihcblx0ICAgICAgZWwsXG5cdCAgICAgIGRpcmVjdGlvbixcblx0ICAgICAgb3AsXG5cdCAgICAgIHRyYW5zRGF0YSxcblx0ICAgICAgY2Jcblx0ICAgIClcblx0ICB9IGVsc2Uge1xuXHQgICAgLy8gbm90IGFwcGxpY2FibGVcblx0ICAgIG9wKClcblx0ICAgIGlmIChjYikgY2IoKVxuXHQgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogNDYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgY29uZmlnID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMClcblx0dmFyIHRleHRQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQyKVxuXHR2YXIgZGlyUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Mylcblx0dmFyIHRlbXBsYXRlUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MSlcblxuXHQvKipcblx0ICogQ29tcGlsZSBhIHRlbXBsYXRlIGFuZCByZXR1cm4gYSByZXVzYWJsZSBjb21wb3NpdGUgbGlua1xuXHQgKiBmdW5jdGlvbiwgd2hpY2ggcmVjdXJzaXZlbHkgY29udGFpbnMgbW9yZSBsaW5rIGZ1bmN0aW9uc1xuXHQgKiBpbnNpZGUuIFRoaXMgdG9wIGxldmVsIGNvbXBpbGUgZnVuY3Rpb24gc2hvdWxkIG9ubHkgYmVcblx0ICogY2FsbGVkIG9uIGluc3RhbmNlIHJvb3Qgbm9kZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSBlbFxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IHBhcnRpYWxcblx0ICogQHJldHVybiB7RnVuY3Rpb259XG5cdCAqL1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tcGlsZSAoZWwsIG9wdGlvbnMsIHBhcnRpYWwpIHtcblx0ICB2YXIgcGFyYW1zID0gIXBhcnRpYWwgJiYgb3B0aW9ucy5wYXJhbUF0dHJpYnV0ZXNcblx0ICB2YXIgcGFyYW1zTGlua0ZuID0gcGFyYW1zXG5cdCAgICA/IGNvbXBpbGVQYXJhbUF0dHJpYnV0ZXMoZWwsIHBhcmFtcywgb3B0aW9ucylcblx0ICAgIDogbnVsbFxuXHQgIHZhciBub2RlTGlua0ZuID0gZWwgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50XG5cdCAgICA/IG51bGxcblx0ICAgIDogY29tcGlsZU5vZGUoZWwsIG9wdGlvbnMpXG5cdCAgdmFyIGNoaWxkTGlua0ZuID1cblx0ICAgICghbm9kZUxpbmtGbiB8fCAhbm9kZUxpbmtGbi50ZXJtaW5hbCkgJiZcblx0ICAgIGVsLmhhc0NoaWxkTm9kZXMoKVxuXHQgICAgICA/IGNvbXBpbGVOb2RlTGlzdChlbC5jaGlsZE5vZGVzLCBvcHRpb25zKVxuXHQgICAgICA6IG51bGxcblxuXHQgIC8qKlxuXHQgICAqIEEgbGlua2VyIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBhIGFscmVhZHkgY29tcGlsZWRcblx0ICAgKiBwaWVjZSBvZiBET00sIHdoaWNoIGluc3RhbnRpYXRlcyBhbGwgZGlyZWN0aXZlXG5cdCAgICogaW5zdGFuY2VzLlxuXHQgICAqXG5cdCAgICogQHBhcmFtIHtWdWV9IHZtXG5cdCAgICogQHBhcmFtIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9IGVsXG5cdCAgICogQHJldHVybiB7RnVuY3Rpb258dW5kZWZpbmVkfVxuXHQgICAqL1xuXG5cdCAgcmV0dXJuIGZ1bmN0aW9uIGxpbmsgKHZtLCBlbCkge1xuXHQgICAgdmFyIG9yaWdpbmFsRGlyQ291bnQgPSB2bS5fZGlyZWN0aXZlcy5sZW5ndGhcblx0ICAgIGlmIChwYXJhbXNMaW5rRm4pIHBhcmFtc0xpbmtGbih2bSwgZWwpXG5cdCAgICBpZiAobm9kZUxpbmtGbikgbm9kZUxpbmtGbih2bSwgZWwpXG5cdCAgICBpZiAoY2hpbGRMaW5rRm4pIGNoaWxkTGlua0ZuKHZtLCBlbC5jaGlsZE5vZGVzKVxuXG5cdCAgICAvKipcblx0ICAgICAqIElmIHRoaXMgaXMgYSBwYXJ0aWFsIGNvbXBpbGUsIHRoZSBsaW5rZXIgZnVuY3Rpb25cblx0ICAgICAqIHJldHVybnMgYW4gdW5saW5rIGZ1bmN0aW9uIHRoYXQgdGVhcnNkb3duIGFsbFxuXHQgICAgICogZGlyZWN0aXZlcyBpbnN0YW5jZXMgZ2VuZXJhdGVkIGR1cmluZyB0aGUgcGFydGlhbFxuXHQgICAgICogbGlua2luZy5cblx0ICAgICAqL1xuXG5cdCAgICBpZiAocGFydGlhbCkge1xuXHQgICAgICB2YXIgZGlycyA9IHZtLl9kaXJlY3RpdmVzLnNsaWNlKG9yaWdpbmFsRGlyQ291bnQpXG5cdCAgICAgIHJldHVybiBmdW5jdGlvbiB1bmxpbmsgKCkge1xuXHQgICAgICAgIHZhciBpID0gZGlycy5sZW5ndGhcblx0ICAgICAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgICAgICBkaXJzW2ldLl90ZWFyZG93bigpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGkgPSB2bS5fZGlyZWN0aXZlcy5pbmRleE9mKGRpcnNbMF0pXG5cdCAgICAgICAgdm0uX2RpcmVjdGl2ZXMuc3BsaWNlKGksIGRpcnMubGVuZ3RoKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBpbGUgYSBub2RlIGFuZCByZXR1cm4gYSBub2RlTGlua0ZuIGJhc2VkIG9uIHRoZVxuXHQgKiBub2RlIHR5cGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbnx1bmRlZmluZWR9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNvbXBpbGVOb2RlIChub2RlLCBvcHRpb25zKSB7XG5cdCAgdmFyIHR5cGUgPSBub2RlLm5vZGVUeXBlXG5cdCAgaWYgKHR5cGUgPT09IDEgJiYgbm9kZS50YWdOYW1lICE9PSAnU0NSSVBUJykge1xuXHQgICAgcmV0dXJuIGNvbXBpbGVFbGVtZW50KG5vZGUsIG9wdGlvbnMpXG5cdCAgfSBlbHNlIGlmICh0eXBlID09PSAzICYmIGNvbmZpZy5pbnRlcnBvbGF0ZSkge1xuXHQgICAgcmV0dXJuIGNvbXBpbGVUZXh0Tm9kZShub2RlLCBvcHRpb25zKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb21waWxlIGFuIGVsZW1lbnQgYW5kIHJldHVybiBhIG5vZGVMaW5rRm4uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHJldHVybiB7RnVuY3Rpb258bnVsbH1cblx0ICovXG5cblx0ZnVuY3Rpb24gY29tcGlsZUVsZW1lbnQgKGVsLCBvcHRpb25zKSB7XG5cdCAgdmFyIGxpbmtGbiwgdGFnLCBjb21wb25lbnRcblx0ICAvLyBjaGVjayBjdXN0b20gZWxlbWVudCBjb21wb25lbnQsIGJ1dCBvbmx5IG9uIG5vbi1yb290XG5cdCAgaWYgKCFlbC5fX3Z1ZV9fKSB7XG5cdCAgICB0YWcgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKClcblx0ICAgIGNvbXBvbmVudCA9XG5cdCAgICAgIHRhZy5pbmRleE9mKCctJykgPiAwICYmXG5cdCAgICAgIG9wdGlvbnMuY29tcG9uZW50c1t0YWddXG5cdCAgICBpZiAoY29tcG9uZW50KSB7XG5cdCAgICAgIGVsLnNldEF0dHJpYnV0ZShjb25maWcucHJlZml4ICsgJ2NvbXBvbmVudCcsIHRhZylcblx0ICAgIH1cblx0ICB9XG5cdCAgaWYgKGNvbXBvbmVudCB8fCBlbC5oYXNBdHRyaWJ1dGVzKCkpIHtcblx0ICAgIC8vIGNoZWNrIHRlcm1pbmFsIGRpcmVjaXR2ZXNcblx0ICAgIGxpbmtGbiA9IGNoZWNrVGVybWluYWxEaXJlY3RpdmVzKGVsLCBvcHRpb25zKVxuXHQgICAgLy8gaWYgbm90IHRlcm1pbmFsLCBidWlsZCBub3JtYWwgbGluayBmdW5jdGlvblxuXHQgICAgaWYgKCFsaW5rRm4pIHtcblx0ICAgICAgdmFyIGRpcmVjdGl2ZXMgPSBjb2xsZWN0RGlyZWN0aXZlcyhlbCwgb3B0aW9ucylcblx0ICAgICAgbGlua0ZuID0gZGlyZWN0aXZlcy5sZW5ndGhcblx0ICAgICAgICA/IG1ha2VEaXJlY3RpdmVzTGlua0ZuKGRpcmVjdGl2ZXMpXG5cdCAgICAgICAgOiBudWxsXG5cdCAgICB9XG5cdCAgfVxuXHQgIC8vIGlmIHRoZSBlbGVtZW50IGlzIGEgdGV4dGFyZWEsIHdlIG5lZWQgdG8gaW50ZXJwb2xhdGVcblx0ICAvLyBpdHMgY29udGVudCBvbiBpbml0aWFsIHJlbmRlci5cblx0ICBpZiAoZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuXHQgICAgdmFyIHJlYWxMaW5rRm4gPSBsaW5rRm5cblx0ICAgIGxpbmtGbiA9IGZ1bmN0aW9uICh2bSwgZWwpIHtcblx0ICAgICAgZWwudmFsdWUgPSB2bS4kaW50ZXJwb2xhdGUoZWwudmFsdWUpXG5cdCAgICAgIGlmIChyZWFsTGlua0ZuKSByZWFsTGlua0ZuKHZtLCBlbCkgICAgICBcblx0ICAgIH1cblx0ICAgIGxpbmtGbi50ZXJtaW5hbCA9IHRydWVcblx0ICB9XG5cdCAgcmV0dXJuIGxpbmtGblxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIGEgbXVsdGktZGlyZWN0aXZlIGxpbmsgZnVuY3Rpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGRpcmVjdGl2ZXNcblx0ICogQHJldHVybiB7RnVuY3Rpb259IGRpcmVjdGl2ZXNMaW5rRm5cblx0ICovXG5cblx0ZnVuY3Rpb24gbWFrZURpcmVjdGl2ZXNMaW5rRm4gKGRpcmVjdGl2ZXMpIHtcblx0ICByZXR1cm4gZnVuY3Rpb24gZGlyZWN0aXZlc0xpbmtGbiAodm0sIGVsKSB7XG5cdCAgICAvLyByZXZlcnNlIGFwcGx5IGJlY2F1c2UgaXQncyBzb3J0ZWQgbG93IHRvIGhpZ2hcblx0ICAgIHZhciBpID0gZGlyZWN0aXZlcy5sZW5ndGhcblx0ICAgIHZhciBkaXIsIGosIGtcblx0ICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgZGlyID0gZGlyZWN0aXZlc1tpXVxuXHQgICAgICBpZiAoZGlyLl9saW5rKSB7XG5cdCAgICAgICAgLy8gY3VzdG9tIGxpbmsgZm5cblx0ICAgICAgICBkaXIuX2xpbmsodm0sIGVsKVxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIGsgPSBkaXIuZGVzY3JpcHRvcnMubGVuZ3RoXG5cdCAgICAgICAgZm9yIChqID0gMDsgaiA8IGs7IGorKykge1xuXHQgICAgICAgICAgdm0uX2JpbmREaXIoZGlyLm5hbWUsIGVsLFxuXHQgICAgICAgICAgICAgICAgICAgICAgZGlyLmRlc2NyaXB0b3JzW2pdLCBkaXIuZGVmKVxuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb21waWxlIGEgdGV4dE5vZGUgYW5kIHJldHVybiBhIG5vZGVMaW5rRm4uXG5cdCAqXG5cdCAqIEBwYXJhbSB7VGV4dE5vZGV9IG5vZGVcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHJldHVybiB7RnVuY3Rpb258bnVsbH0gdGV4dE5vZGVMaW5rRm5cblx0ICovXG5cblx0ZnVuY3Rpb24gY29tcGlsZVRleHROb2RlIChub2RlLCBvcHRpb25zKSB7XG5cdCAgdmFyIHRva2VucyA9IHRleHRQYXJzZXIucGFyc2Uobm9kZS5ub2RlVmFsdWUpXG5cdCAgaWYgKCF0b2tlbnMpIHtcblx0ICAgIHJldHVybiBudWxsXG5cdCAgfVxuXHQgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG5cdCAgdmFyIGRpcnMgPSBvcHRpb25zLmRpcmVjdGl2ZXNcblx0ICB2YXIgZWwsIHRva2VuLCB2YWx1ZVxuXHQgIGZvciAodmFyIGkgPSAwLCBsID0gdG9rZW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgdG9rZW4gPSB0b2tlbnNbaV1cblx0ICAgIHZhbHVlID0gdG9rZW4udmFsdWVcblx0ICAgIGlmICh0b2tlbi50YWcpIHtcblx0ICAgICAgaWYgKHRva2VuLm9uZVRpbWUpIHtcblx0ICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlKVxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIGlmICh0b2tlbi5odG1sKSB7XG5cdCAgICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3YtaHRtbCcpXG5cdCAgICAgICAgICB0b2tlbi50eXBlID0gJ2h0bWwnXG5cdCAgICAgICAgICB0b2tlbi5kZWYgPSBkaXJzLmh0bWxcblx0ICAgICAgICAgIHRva2VuLmRlc2NyaXB0b3IgPSBkaXJQYXJzZXIucGFyc2UodmFsdWUpWzBdXG5cdCAgICAgICAgfSBlbHNlIGlmICh0b2tlbi5wYXJ0aWFsKSB7XG5cdCAgICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3YtcGFydGlhbCcpXG5cdCAgICAgICAgICB0b2tlbi50eXBlID0gJ3BhcnRpYWwnXG5cdCAgICAgICAgICB0b2tlbi5kZWYgPSBkaXJzLnBhcnRpYWxcblx0ICAgICAgICAgIHRva2VuLmRlc2NyaXB0b3IgPSBkaXJQYXJzZXIucGFyc2UodmFsdWUpWzBdXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgIC8vIElFIHdpbGwgY2xlYW4gdXAgZW1wdHkgdGV4dE5vZGVzIGR1cmluZ1xuXHQgICAgICAgICAgLy8gZnJhZy5jbG9uZU5vZGUodHJ1ZSksIHNvIHdlIGhhdmUgdG8gZ2l2ZSBpdFxuXHQgICAgICAgICAgLy8gc29tZXRoaW5nIGhlcmUuLi5cblx0ICAgICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyAnKVxuXHQgICAgICAgICAgdG9rZW4udHlwZSA9ICd0ZXh0J1xuXHQgICAgICAgICAgdG9rZW4uZGVmID0gZGlycy50ZXh0XG5cdCAgICAgICAgICB0b2tlbi5kZXNjcmlwdG9yID0gZGlyUGFyc2VyLnBhcnNlKHZhbHVlKVswXVxuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSlcblx0ICAgIH1cblx0ICAgIGZyYWcuYXBwZW5kQ2hpbGQoZWwpXG5cdCAgfVxuXHQgIHJldHVybiBtYWtlVGV4dE5vZGVMaW5rRm4odG9rZW5zLCBmcmFnLCBvcHRpb25zKVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIGEgZnVuY3Rpb24gdGhhdCBwcm9jZXNzZXMgYSB0ZXh0Tm9kZS5cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSB0b2tlbnNcblx0ICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIG1ha2VUZXh0Tm9kZUxpbmtGbiAodG9rZW5zLCBmcmFnKSB7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uIHRleHROb2RlTGlua0ZuICh2bSwgZWwpIHtcblx0ICAgIHZhciBmcmFnQ2xvbmUgPSBmcmFnLmNsb25lTm9kZSh0cnVlKVxuXHQgICAgdmFyIGNoaWxkTm9kZXMgPSBfLnRvQXJyYXkoZnJhZ0Nsb25lLmNoaWxkTm9kZXMpXG5cdCAgICB2YXIgdG9rZW4sIHZhbHVlLCBub2RlXG5cdCAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRva2Vucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgICAgdG9rZW4gPSB0b2tlbnNbaV1cblx0ICAgICAgdmFsdWUgPSB0b2tlbi52YWx1ZVxuXHQgICAgICBpZiAodG9rZW4udGFnKSB7XG5cdCAgICAgICAgbm9kZSA9IGNoaWxkTm9kZXNbaV1cblx0ICAgICAgICBpZiAodG9rZW4ub25lVGltZSkge1xuXHQgICAgICAgICAgdmFsdWUgPSB2bS4kZXZhbCh2YWx1ZSlcblx0ICAgICAgICAgIGlmICh0b2tlbi5odG1sKSB7XG5cdCAgICAgICAgICAgIF8ucmVwbGFjZShub2RlLCB0ZW1wbGF0ZVBhcnNlci5wYXJzZSh2YWx1ZSwgdHJ1ZSkpXG5cdCAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBub2RlLm5vZGVWYWx1ZSA9IHZhbHVlXG5cdCAgICAgICAgICB9XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgIHZtLl9iaW5kRGlyKHRva2VuLnR5cGUsIG5vZGUsXG5cdCAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5kZXNjcmlwdG9yLCB0b2tlbi5kZWYpXG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICBfLnJlcGxhY2UoZWwsIGZyYWdDbG9uZSlcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGlsZSBhIG5vZGUgbGlzdCBhbmQgcmV0dXJuIGEgY2hpbGRMaW5rRm4uXG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZUxpc3R9IG5vZGVMaXN0XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufHVuZGVmaW5lZH1cblx0ICovXG5cblx0ZnVuY3Rpb24gY29tcGlsZU5vZGVMaXN0IChub2RlTGlzdCwgb3B0aW9ucykge1xuXHQgIHZhciBsaW5rRm5zID0gW11cblx0ICB2YXIgbm9kZUxpbmtGbiwgY2hpbGRMaW5rRm4sIG5vZGVcblx0ICBmb3IgKHZhciBpID0gMCwgbCA9IG5vZGVMaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgbm9kZSA9IG5vZGVMaXN0W2ldXG5cdCAgICBub2RlTGlua0ZuID0gY29tcGlsZU5vZGUobm9kZSwgb3B0aW9ucylcblx0ICAgIGNoaWxkTGlua0ZuID1cblx0ICAgICAgKCFub2RlTGlua0ZuIHx8ICFub2RlTGlua0ZuLnRlcm1pbmFsKSAmJlxuXHQgICAgICBub2RlLmhhc0NoaWxkTm9kZXMoKVxuXHQgICAgICAgID8gY29tcGlsZU5vZGVMaXN0KG5vZGUuY2hpbGROb2Rlcywgb3B0aW9ucylcblx0ICAgICAgICA6IG51bGxcblx0ICAgIGxpbmtGbnMucHVzaChub2RlTGlua0ZuLCBjaGlsZExpbmtGbilcblx0ICB9XG5cdCAgcmV0dXJuIGxpbmtGbnMubGVuZ3RoXG5cdCAgICA/IG1ha2VDaGlsZExpbmtGbihsaW5rRm5zKVxuXHQgICAgOiBudWxsXG5cdH1cblxuXHQvKipcblx0ICogTWFrZSBhIGNoaWxkIGxpbmsgZnVuY3Rpb24gZm9yIGEgbm9kZSdzIGNoaWxkTm9kZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXk8RnVuY3Rpb24+fSBsaW5rRm5zXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufSBjaGlsZExpbmtGblxuXHQgKi9cblxuXHRmdW5jdGlvbiBtYWtlQ2hpbGRMaW5rRm4gKGxpbmtGbnMpIHtcblx0ICByZXR1cm4gZnVuY3Rpb24gY2hpbGRMaW5rRm4gKHZtLCBub2Rlcykge1xuXHQgICAgLy8gc3RhYmxpemUgbm9kZXNcblx0ICAgIG5vZGVzID0gXy50b0FycmF5KG5vZGVzKVxuXHQgICAgdmFyIG5vZGUsIG5vZGVMaW5rRm4sIGNoaWxkcmVuTGlua0ZuXG5cdCAgICBmb3IgKHZhciBpID0gMCwgbiA9IDAsIGwgPSBsaW5rRm5zLmxlbmd0aDsgaSA8IGw7IG4rKykge1xuXHQgICAgICBub2RlID0gbm9kZXNbbl1cblx0ICAgICAgbm9kZUxpbmtGbiA9IGxpbmtGbnNbaSsrXVxuXHQgICAgICBjaGlsZHJlbkxpbmtGbiA9IGxpbmtGbnNbaSsrXVxuXHQgICAgICBpZiAobm9kZUxpbmtGbikge1xuXHQgICAgICAgIG5vZGVMaW5rRm4odm0sIG5vZGUpXG5cdCAgICAgIH1cblx0ICAgICAgaWYgKGNoaWxkcmVuTGlua0ZuKSB7XG5cdCAgICAgICAgY2hpbGRyZW5MaW5rRm4odm0sIG5vZGUuY2hpbGROb2Rlcylcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb21waWxlIHBhcmFtIGF0dHJpYnV0ZXMgb24gYSByb290IGVsZW1lbnQgYW5kIHJldHVyblxuXHQgKiBhIHBhcmFtQXR0cmlidXRlcyBsaW5rIGZ1bmN0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGF0dHJzXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufSBwYXJhbXNMaW5rRm5cblx0ICovXG5cblx0ZnVuY3Rpb24gY29tcGlsZVBhcmFtQXR0cmlidXRlcyAoZWwsIGF0dHJzLCBvcHRpb25zKSB7XG5cdCAgdmFyIHBhcmFtcyA9IFtdXG5cdCAgdmFyIGkgPSBhdHRycy5sZW5ndGhcblx0ICB2YXIgbmFtZSwgdmFsdWUsIHBhcmFtXG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAgbmFtZSA9IGF0dHJzW2ldXG5cdCAgICB2YWx1ZSA9IGVsLmdldEF0dHJpYnV0ZShuYW1lKVxuXHQgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG5cdCAgICAgIHBhcmFtID0ge1xuXHQgICAgICAgIG5hbWU6IG5hbWUsXG5cdCAgICAgICAgdmFsdWU6IHZhbHVlXG5cdCAgICAgIH1cblx0ICAgICAgdmFyIHRva2VucyA9IHRleHRQYXJzZXIucGFyc2UodmFsdWUpXG5cdCAgICAgIGlmICh0b2tlbnMpIHtcblx0ICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSlcblx0ICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCA+IDEpIHtcblx0ICAgICAgICAgIF8ud2Fybihcblx0ICAgICAgICAgICAgJ0ludmFsaWQgcGFyYW0gYXR0cmlidXRlIGJpbmRpbmc6IFwiJyArXG5cdCAgICAgICAgICAgIG5hbWUgKyAnPVwiJyArIHZhbHVlICsgJ1wiJyArXG5cdCAgICAgICAgICAgICdcXG5Eb25cXCd0IG1peCBiaW5kaW5nIHRhZ3Mgd2l0aCBwbGFpbiB0ZXh0ICcgK1xuXHQgICAgICAgICAgICAnaW4gcGFyYW0gYXR0cmlidXRlIGJpbmRpbmdzLidcblx0ICAgICAgICAgIClcblx0ICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgIHBhcmFtLmR5bmFtaWMgPSB0cnVlXG5cdCAgICAgICAgICBwYXJhbS52YWx1ZSA9IHRva2Vuc1swXS52YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgICBwYXJhbXMucHVzaChwYXJhbSlcblx0ICAgIH1cblx0ICB9XG5cdCAgcmV0dXJuIG1ha2VQYXJhbXNMaW5rRm4ocGFyYW1zLCBvcHRpb25zKVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIGEgZnVuY3Rpb24gdGhhdCBhcHBsaWVzIHBhcmFtIGF0dHJpYnV0ZXMgdG8gYSB2bS5cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheX0gcGFyYW1zXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufSBwYXJhbXNMaW5rRm5cblx0ICovXG5cblx0dmFyIGRhdGFBdHRyUkUgPSAvXmRhdGEtL1xuXG5cdGZ1bmN0aW9uIG1ha2VQYXJhbXNMaW5rRm4gKHBhcmFtcywgb3B0aW9ucykge1xuXHQgIHZhciBkZWYgPSBvcHRpb25zLmRpcmVjdGl2ZXNbJ3dpdGgnXVxuXHQgIHJldHVybiBmdW5jdGlvbiBwYXJhbXNMaW5rRm4gKHZtLCBlbCkge1xuXHQgICAgdmFyIGkgPSBwYXJhbXMubGVuZ3RoXG5cdCAgICB2YXIgcGFyYW0sIHBhdGhcblx0ICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgcGFyYW0gPSBwYXJhbXNbaV1cblx0ICAgICAgLy8gcGFyYW1zIGNvdWxkIGNvbnRhaW4gZGFzaGVzLCB3aGljaCB3aWxsIGJlXG5cdCAgICAgIC8vIGludGVycHJldGVkIGFzIG1pbnVzIGNhbGN1bGF0aW9ucyBieSB0aGUgcGFyc2VyXG5cdCAgICAgIC8vIHNvIHdlIG5lZWQgdG8gd3JhcCB0aGUgcGF0aCBoZXJlXG5cdCAgICAgIHBhdGggPSBfLmNhbWVsaXplKHBhcmFtLm5hbWUucmVwbGFjZShkYXRhQXR0clJFLCAnJykpXG5cdCAgICAgIGlmIChwYXJhbS5keW5hbWljKSB7XG5cdCAgICAgICAgLy8gZHluYW1pYyBwYXJhbSBhdHRyaWJ0dWVzIGFyZSBib3VuZCBhcyB2LXdpdGguXG5cdCAgICAgICAgLy8gd2UgY2FuIGRpcmVjdGx5IGR1Y2sgdGhlIGRlc2NyaXB0b3IgaGVyZSBiZWFjdXNlXG5cdCAgICAgICAgLy8gcGFyYW0gYXR0cmlidXRlcyBjYW5ub3QgdXNlIGV4cHJlc3Npb25zIG9yXG5cdCAgICAgICAgLy8gZmlsdGVycy5cblx0ICAgICAgICB2bS5fYmluZERpcignd2l0aCcsIGVsLCB7XG5cdCAgICAgICAgICBhcmc6IHBhdGgsXG5cdCAgICAgICAgICBleHByZXNzaW9uOiBwYXJhbS52YWx1ZVxuXHQgICAgICAgIH0sIGRlZilcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAvLyBqdXN0IHNldCBvbmNlXG5cdCAgICAgICAgdm0uJHNldChwYXRoLCBwYXJhbS52YWx1ZSlcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayBhbiBlbGVtZW50IGZvciB0ZXJtaW5hbCBkaXJlY3RpdmVzIGluIGZpeGVkIG9yZGVyLlxuXHQgKiBJZiBpdCBmaW5kcyBvbmUsIHJldHVybiBhIHRlcm1pbmFsIGxpbmsgZnVuY3Rpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHJldHVybiB7RnVuY3Rpb259IHRlcm1pbmFsTGlua0ZuXG5cdCAqL1xuXG5cdHZhciB0ZXJtaW5hbERpcmVjdGl2ZXMgPSBbXG5cdCAgJ3JlcGVhdCcsXG5cdCAgJ2lmJyxcblx0ICAnY29tcG9uZW50J1xuXHRdXG5cblx0ZnVuY3Rpb24gc2tpcCAoKSB7fVxuXHRza2lwLnRlcm1pbmFsID0gdHJ1ZVxuXG5cdGZ1bmN0aW9uIGNoZWNrVGVybWluYWxEaXJlY3RpdmVzIChlbCwgb3B0aW9ucykge1xuXHQgIGlmIChfLmF0dHIoZWwsICdwcmUnKSAhPT0gbnVsbCkge1xuXHQgICAgcmV0dXJuIHNraXBcblx0ICB9XG5cdCAgdmFyIHZhbHVlLCBkaXJOYW1lXG5cdCAgLyoganNoaW50IGJvc3M6IHRydWUgKi9cblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXHQgICAgZGlyTmFtZSA9IHRlcm1pbmFsRGlyZWN0aXZlc1tpXVxuXHQgICAgaWYgKHZhbHVlID0gXy5hdHRyKGVsLCBkaXJOYW1lKSkge1xuXHQgICAgICByZXR1cm4gbWFrZVRlcmltaW5hbExpbmtGbihlbCwgZGlyTmFtZSwgdmFsdWUsIG9wdGlvbnMpXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIGEgbGluayBmdW5jdGlvbiBmb3IgYSB0ZXJtaW5hbCBkaXJlY3RpdmUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRpck5hbWVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufSB0ZXJtaW5hbExpbmtGblxuXHQgKi9cblxuXHRmdW5jdGlvbiBtYWtlVGVyaW1pbmFsTGlua0ZuIChlbCwgZGlyTmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcblx0ICB2YXIgZGVzY3JpcHRvciA9IGRpclBhcnNlci5wYXJzZSh2YWx1ZSlbMF1cblx0ICB2YXIgZGVmID0gb3B0aW9ucy5kaXJlY3RpdmVzW2Rpck5hbWVdXG5cdCAgLy8gc3BlY2lhbCBjYXNlOiB3ZSBuZWVkIHRvIGNvbGxlY3QgZGlyZWN0aXZlcyBmb3VuZFxuXHQgIC8vIG9uIGEgY29tcG9uZW50IHJvb3Qgbm9kZSwgYnV0IGRlZmluZWQgaW4gdGhlIHBhcmVudFxuXHQgIC8vIHRlbXBsYXRlLiBUaGVzZSBkaXJlY3RpdmVzIG5lZWQgdG8gYmUgY29tcGlsZWQgaW5cblx0ICAvLyB0aGUgcGFyZW50IHNjb3BlLlxuXHQgIGlmIChkaXJOYW1lID09PSAnY29tcG9uZW50Jykge1xuXHQgICAgdmFyIGRpcnMgPSBjb2xsZWN0RGlyZWN0aXZlcyhlbCwgb3B0aW9ucywgdHJ1ZSlcblx0ICAgIGVsLl9wYXJlbnRMaW5rZXIgPSBkaXJzLmxlbmd0aFxuXHQgICAgICA/IG1ha2VEaXJlY3RpdmVzTGlua0ZuKGRpcnMpXG5cdCAgICAgIDogbnVsbFxuXHQgIH1cblx0ICB2YXIgdGVybWluYWxMaW5rRm4gPSBmdW5jdGlvbiAodm0sIGVsKSB7XG5cdCAgICB2bS5fYmluZERpcihkaXJOYW1lLCBlbCwgZGVzY3JpcHRvciwgZGVmKVxuXHQgIH1cblx0ICB0ZXJtaW5hbExpbmtGbi50ZXJtaW5hbCA9IHRydWVcblx0ICByZXR1cm4gdGVybWluYWxMaW5rRm5cblx0fVxuXG5cdC8qKlxuXHQgKiBDb2xsZWN0IHRoZSBkaXJlY3RpdmVzIG9uIGFuIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHBhcmFtIHtCb29sZWFufSBhc1BhcmVudFxuXHQgKiBAcmV0dXJuIHtBcnJheX1cblx0ICovXG5cblx0ZnVuY3Rpb24gY29sbGVjdERpcmVjdGl2ZXMgKGVsLCBvcHRpb25zLCBhc1BhcmVudCkge1xuXHQgIHZhciBhdHRycyA9IF8udG9BcnJheShlbC5hdHRyaWJ1dGVzKVxuXHQgIHZhciBpID0gYXR0cnMubGVuZ3RoXG5cdCAgdmFyIGRpcnMgPSBbXVxuXHQgIHZhciBhdHRyLCBhdHRyTmFtZSwgZGlyLCBkaXJOYW1lLCBkaXJEZWZcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICBhdHRyID0gYXR0cnNbaV1cblx0ICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lXG5cdCAgICBpZiAoYXR0ck5hbWUuaW5kZXhPZihjb25maWcucHJlZml4KSA9PT0gMCkge1xuXHQgICAgICBkaXJOYW1lID0gYXR0ck5hbWUuc2xpY2UoY29uZmlnLnByZWZpeC5sZW5ndGgpXG5cdCAgICAgIGlmIChcblx0ICAgICAgICBhc1BhcmVudCAmJlxuXHQgICAgICAgIChkaXJOYW1lID09PSAnd2l0aCcgfHwgZGlyTmFtZSA9PT0gJ3JlZicpXG5cdCAgICAgICkge1xuXHQgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgIH1cblx0ICAgICAgZGlyRGVmID0gb3B0aW9ucy5kaXJlY3RpdmVzW2Rpck5hbWVdXG5cdCAgICAgIF8uYXNzZXJ0QXNzZXQoZGlyRGVmLCAnZGlyZWN0aXZlJywgZGlyTmFtZSlcblx0ICAgICAgaWYgKGRpckRlZikge1xuXHQgICAgICAgIGRpcnMucHVzaCh7XG5cdCAgICAgICAgICBuYW1lOiBkaXJOYW1lLFxuXHQgICAgICAgICAgZGVzY3JpcHRvcnM6IGRpclBhcnNlci5wYXJzZShhdHRyLnZhbHVlKSxcblx0ICAgICAgICAgIGRlZjogZGlyRGVmXG5cdCAgICAgICAgfSlcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIGlmIChjb25maWcuaW50ZXJwb2xhdGUpIHtcblx0ICAgICAgZGlyID0gY29sbGVjdEF0dHJEaXJlY3RpdmUoZWwsIGF0dHJOYW1lLCBhdHRyLnZhbHVlLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zKVxuXHQgICAgICBpZiAoZGlyKSB7XG5cdCAgICAgICAgZGlycy5wdXNoKGRpcilcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0ICAvLyBzb3J0IGJ5IHByaW9yaXR5LCBMT1cgdG8gSElHSFxuXHQgIGRpcnMuc29ydChkaXJlY3RpdmVDb21wYXJhdG9yKVxuXHQgIHJldHVybiBkaXJzXG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgYW4gYXR0cmlidXRlIGZvciBwb3RlbnRpYWwgZHluYW1pYyBiaW5kaW5ncyxcblx0ICogYW5kIHJldHVybiBhIGRpcmVjdGl2ZSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqIEByZXR1cm4ge09iamVjdH1cblx0ICovXG5cblx0ZnVuY3Rpb24gY29sbGVjdEF0dHJEaXJlY3RpdmUgKGVsLCBuYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuXHQgIHZhciB0b2tlbnMgPSB0ZXh0UGFyc2VyLnBhcnNlKHZhbHVlKVxuXHQgIGlmICh0b2tlbnMpIHtcblx0ICAgIHZhciBkZWYgPSBvcHRpb25zLmRpcmVjdGl2ZXMuYXR0clxuXHQgICAgdmFyIGkgPSB0b2tlbnMubGVuZ3RoXG5cdCAgICB2YXIgYWxsT25lVGltZSA9IHRydWVcblx0ICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cdCAgICAgIGlmICh0b2tlbi50YWcgJiYgIXRva2VuLm9uZVRpbWUpIHtcblx0ICAgICAgICBhbGxPbmVUaW1lID0gZmFsc2Vcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHtcblx0ICAgICAgZGVmOiBkZWYsXG5cdCAgICAgIF9saW5rOiBhbGxPbmVUaW1lXG5cdCAgICAgICAgPyBmdW5jdGlvbiAodm0sIGVsKSB7XG5cdCAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2bS4kaW50ZXJwb2xhdGUodmFsdWUpKVxuXHQgICAgICAgICAgfVxuXHQgICAgICAgIDogZnVuY3Rpb24gKHZtLCBlbCkge1xuXHQgICAgICAgICAgICB2YXIgdmFsdWUgPSB0ZXh0UGFyc2VyLnRva2Vuc1RvRXhwKHRva2Vucywgdm0pXG5cdCAgICAgICAgICAgIHZhciBkZXNjID0gZGlyUGFyc2VyLnBhcnNlKG5hbWUgKyAnOicgKyB2YWx1ZSlbMF1cblx0ICAgICAgICAgICAgdm0uX2JpbmREaXIoJ2F0dHInLCBlbCwgZGVzYywgZGVmKVxuXHQgICAgICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBEaXJlY3RpdmUgcHJpb3JpdHkgc29ydCBjb21wYXJhdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBhXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBiXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGRpcmVjdGl2ZUNvbXBhcmF0b3IgKGEsIGIpIHtcblx0ICBhID0gYS5kZWYucHJpb3JpdHkgfHwgMFxuXHQgIGIgPSBiLmRlZi5wcmlvcml0eSB8fCAwXG5cdCAgcmV0dXJuIGEgPiBiID8gMSA6IC0xXG5cdH1cblxuLyoqKi8gfSxcbi8qIDQ3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIHRlbXBsYXRlUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MSlcblxuXHQvKipcblx0ICogUHJvY2VzcyBhbiBlbGVtZW50IG9yIGEgRG9jdW1lbnRGcmFnbWVudCBiYXNlZCBvbiBhXG5cdCAqIGluc3RhbmNlIG9wdGlvbiBvYmplY3QuIFRoaXMgYWxsb3dzIHVzIHRvIHRyYW5zY2x1ZGVcblx0ICogYSB0ZW1wbGF0ZSBub2RlL2ZyYWdtZW50IGJlZm9yZSB0aGUgaW5zdGFuY2UgaXMgY3JlYXRlZCxcblx0ICogc28gdGhlIHByb2Nlc3NlZCBmcmFnbWVudCBjYW4gdGhlbiBiZSBjbG9uZWQgYW5kIHJldXNlZFxuXHQgKiBpbiB2LXJlcGVhdC5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcmV0dXJuIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9XG5cdCAqL1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNjbHVkZSAoZWwsIG9wdGlvbnMpIHtcblx0ICAvLyBmb3IgdGVtcGxhdGUgdGFncywgd2hhdCB3ZSB3YW50IGlzIGl0cyBjb250ZW50IGFzXG5cdCAgLy8gYSBkb2N1bWVudEZyYWdtZW50IChmb3IgYmxvY2sgaW5zdGFuY2VzKVxuXHQgIGlmIChlbC50YWdOYW1lID09PSAnVEVNUExBVEUnKSB7XG5cdCAgICBlbCA9IHRlbXBsYXRlUGFyc2VyLnBhcnNlKGVsKVxuXHQgIH1cblx0ICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnRlbXBsYXRlKSB7XG5cdCAgICBlbCA9IHRyYW5zY2x1ZGVUZW1wbGF0ZShlbCwgb3B0aW9ucylcblx0ICB9XG5cdCAgaWYgKGVsIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuXHQgICAgXy5wcmVwZW5kKGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3Ytc3RhcnQnKSwgZWwpXG5cdCAgICBlbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVDb21tZW50KCd2LWVuZCcpKVxuXHQgIH1cblx0ICByZXR1cm4gZWxcblx0fVxuXG5cdC8qKlxuXHQgKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSBvcHRpb24uXG5cdCAqIElmIHRoZSByZXBsYWNlIG9wdGlvbiBpcyB0cnVlIHRoaXMgd2lsbCBzd2FwIHRoZSAkZWwuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHJldHVybiB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fVxuXHQgKi9cblxuXHRmdW5jdGlvbiB0cmFuc2NsdWRlVGVtcGxhdGUgKGVsLCBvcHRpb25zKSB7XG5cdCAgdmFyIHRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZVxuXHQgIHZhciBmcmFnID0gdGVtcGxhdGVQYXJzZXIucGFyc2UodGVtcGxhdGUsIHRydWUpXG5cdCAgaWYgKCFmcmFnKSB7XG5cdCAgICBfLndhcm4oJ0ludmFsaWQgdGVtcGxhdGUgb3B0aW9uOiAnICsgdGVtcGxhdGUpXG5cdCAgfSBlbHNlIHtcblx0ICAgIGNvbGxlY3RSYXdDb250ZW50KGVsKVxuXHQgICAgaWYgKG9wdGlvbnMucmVwbGFjZSkge1xuXHQgICAgICBpZiAoZnJhZy5jaGlsZE5vZGVzLmxlbmd0aCA+IDEpIHtcblx0ICAgICAgICB0cmFuc2NsdWRlQ29udGVudChmcmFnKVxuXHQgICAgICAgIHJldHVybiBmcmFnXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdmFyIHJlcGxhY2VyID0gZnJhZy5maXJzdENoaWxkXG5cdCAgICAgICAgXy5jb3B5QXR0cmlidXRlcyhlbCwgcmVwbGFjZXIpXG5cdCAgICAgICAgdHJhbnNjbHVkZUNvbnRlbnQocmVwbGFjZXIpXG5cdCAgICAgICAgcmV0dXJuIHJlcGxhY2VyXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGVsLmFwcGVuZENoaWxkKGZyYWcpXG5cdCAgICAgIHRyYW5zY2x1ZGVDb250ZW50KGVsKVxuXHQgICAgICByZXR1cm4gZWxcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ29sbGVjdCByYXcgY29udGVudCBpbnNpZGUgJGVsIGJlZm9yZSB0aGV5IGFyZVxuXHQgKiByZXBsYWNlZCBieSB0ZW1wbGF0ZSBjb250ZW50LlxuXHQgKi9cblxuXHR2YXIgcmF3Q29udGVudFxuXHRmdW5jdGlvbiBjb2xsZWN0UmF3Q29udGVudCAoZWwpIHtcblx0ICB2YXIgY2hpbGRcblx0ICByYXdDb250ZW50ID0gbnVsbFxuXHQgIGlmIChlbC5oYXNDaGlsZE5vZGVzKCkpIHtcblx0ICAgIHJhd0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHQgICAgLyoganNoaW50IGJvc3M6dHJ1ZSAqL1xuXHQgICAgd2hpbGUgKGNoaWxkID0gZWwuZmlyc3RDaGlsZCkge1xuXHQgICAgICByYXdDb250ZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXNvbHZlIDxjb250ZW50PiBpbnNlcnRpb24gcG9pbnRzIG1pbWlja2luZyB0aGUgYmVoYXZpb3Jcblx0ICogb2YgdGhlIFNoYWRvdyBET00gc3BlYzpcblx0ICpcblx0ICogICBodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJjb21wb25lbnRzL3NwZWMvc2hhZG93LyNpbnNlcnRpb24tcG9pbnRzXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSBlbFxuXHQgKi9cblxuXHRmdW5jdGlvbiB0cmFuc2NsdWRlQ29udGVudCAoZWwpIHtcblx0ICB2YXIgb3V0bGV0cyA9IGdldE91dGxldHMoZWwpXG5cdCAgdmFyIGkgPSBvdXRsZXRzLmxlbmd0aFxuXHQgIGlmICghaSkgcmV0dXJuXG5cdCAgdmFyIG91dGxldCwgc2VsZWN0LCBzZWxlY3RlZCwgaiwgbWFpblxuXHQgIC8vIGZpcnN0IHBhc3MsIGNvbGxlY3QgY29ycmVzcG9uZGluZyBjb250ZW50XG5cdCAgLy8gZm9yIGVhY2ggb3V0bGV0LlxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIG91dGxldCA9IG91dGxldHNbaV1cblx0ICAgIGlmIChyYXdDb250ZW50KSB7XG5cdCAgICAgIHNlbGVjdCA9IG91dGxldC5nZXRBdHRyaWJ1dGUoJ3NlbGVjdCcpXG5cdCAgICAgIGlmIChzZWxlY3QpIHsgIC8vIHNlbGVjdCBjb250ZW50XG5cdCAgICAgICAgc2VsZWN0ZWQgPSByYXdDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0KVxuXHQgICAgICAgIG91dGxldC5jb250ZW50ID0gXy50b0FycmF5KFxuXHQgICAgICAgICAgc2VsZWN0ZWQubGVuZ3RoXG5cdCAgICAgICAgICAgID8gc2VsZWN0ZWRcblx0ICAgICAgICAgICAgOiBvdXRsZXQuY2hpbGROb2Rlc1xuXHQgICAgICAgIClcblx0ICAgICAgfSBlbHNlIHsgLy8gZGVmYXVsdCBjb250ZW50XG5cdCAgICAgICAgbWFpbiA9IG91dGxldFxuXHQgICAgICB9XG5cdCAgICB9IGVsc2UgeyAvLyBmYWxsYmFjayBjb250ZW50XG5cdCAgICAgIG91dGxldC5jb250ZW50ID0gXy50b0FycmF5KG91dGxldC5jaGlsZE5vZGVzKVxuXHQgICAgfVxuXHQgIH1cblx0ICAvLyBzZWNvbmQgcGFzcywgYWN0dWFsbHkgaW5zZXJ0IHRoZSBjb250ZW50c1xuXHQgIGZvciAoaSA9IDAsIGogPSBvdXRsZXRzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHQgICAgb3V0bGV0ID0gb3V0bGV0c1tpXVxuXHQgICAgaWYgKG91dGxldCAhPT0gbWFpbikge1xuXHQgICAgICBpbnNlcnRDb250ZW50QXQob3V0bGV0LCBvdXRsZXQuY29udGVudClcblx0ICAgIH1cblx0ICB9XG5cdCAgLy8gZmluYWxseSBpbnNlcnQgdGhlIG1haW4gY29udGVudFxuXHQgIGlmIChtYWluKSB7XG5cdCAgICBpbnNlcnRDb250ZW50QXQobWFpbiwgXy50b0FycmF5KHJhd0NvbnRlbnQuY2hpbGROb2RlcykpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCA8Y29udGVudD4gb3V0bGV0cyBmcm9tIHRoZSBlbGVtZW50L2xpc3Rcblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fEFycmF5fSBlbFxuXHQgKiBAcmV0dXJuIHtBcnJheX1cblx0ICovXG5cblx0dmFyIGNvbmNhdCA9IFtdLmNvbmNhdFxuXHRmdW5jdGlvbiBnZXRPdXRsZXRzIChlbCkge1xuXHQgIHJldHVybiBfLmlzQXJyYXkoZWwpXG5cdCAgICA/IGNvbmNhdC5hcHBseShbXSwgZWwubWFwKGdldE91dGxldHMpKVxuXHQgICAgOiBlbC5xdWVyeVNlbGVjdG9yQWxsXG5cdCAgICAgID8gXy50b0FycmF5KGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvbnRlbnQnKSlcblx0ICAgICAgOiBbXVxuXHR9XG5cblx0LyoqXG5cdCAqIEluc2VydCBhbiBhcnJheSBvZiBub2RlcyBhdCBvdXRsZXQsXG5cdCAqIHRoZW4gcmVtb3ZlIHRoZSBvdXRsZXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gb3V0bGV0XG5cdCAqIEBwYXJhbSB7QXJyYXl9IGNvbnRlbnRzXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGluc2VydENvbnRlbnRBdCAob3V0bGV0LCBjb250ZW50cykge1xuXHQgIC8vIG5vdCB1c2luZyB1dGlsIERPTSBtZXRob2RzIGhlcmUgYmVjYXVzZVxuXHQgIC8vIHBhcmVudE5vZGUgY2FuIGJlIGNhY2hlZFxuXHQgIHZhciBwYXJlbnQgPSBvdXRsZXQucGFyZW50Tm9kZVxuXHQgIGZvciAodmFyIGkgPSAwLCBqID0gY29udGVudHMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdCAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNvbnRlbnRzW2ldLCBvdXRsZXQpXG5cdCAgfVxuXHQgIHBhcmVudC5yZW1vdmVDaGlsZChvdXRsZXQpXG5cdH1cblxuLyoqKi8gfSxcbi8qIDQ4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblxuXHR2YXIgaGFuZGxlcnMgPSB7XG5cdCAgX2RlZmF1bHQ6IF9fd2VicGFja19yZXF1aXJlX18oNTUpLFxuXHQgIHJhZGlvOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDU2KSxcblx0ICBzZWxlY3Q6IF9fd2VicGFja19yZXF1aXJlX18oNTcpLFxuXHQgIGNoZWNrYm94OiBfX3dlYnBhY2tfcmVxdWlyZV9fKDU4KVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBwcmlvcml0eTogODAwLFxuXHQgIHR3b1dheTogdHJ1ZSxcblx0ICBoYW5kbGVyczogaGFuZGxlcnMsXG5cblx0ICAvKipcblx0ICAgKiBQb3NzaWJsZSBlbGVtZW50czpcblx0ICAgKiAgIDxzZWxlY3Q+XG5cdCAgICogICA8dGV4dGFyZWE+XG5cdCAgICogICA8aW5wdXQgdHlwZT1cIipcIj5cblx0ICAgKiAgICAgLSB0ZXh0XG5cdCAgICogICAgIC0gY2hlY2tib3hcblx0ICAgKiAgICAgLSByYWRpb1xuXHQgICAqICAgICAtIG51bWJlclxuXHQgICAqICAgICAtIFRPRE86IG1vcmUgdHlwZXMgbWF5IGJlIHN1cHBsaWVkIGFzIGEgcGx1Z2luXG5cdCAgICovXG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBmcmllbmRseSB3YXJuaW5nLi4uXG5cdCAgICB2YXIgZmlsdGVycyA9IHRoaXMuZmlsdGVyc1xuXHQgICAgaWYgKGZpbHRlcnMgJiYgZmlsdGVycy5yZWFkICYmICFmaWx0ZXJzLndyaXRlKSB7XG5cdCAgICAgIF8ud2Fybihcblx0ICAgICAgICAnSXQgc2VlbXMgeW91IGFyZSB1c2luZyBhIHJlYWQtb25seSBmaWx0ZXIgd2l0aCAnICtcblx0ICAgICAgICAndi1tb2RlbC4gWW91IG1pZ2h0IHdhbnQgdG8gdXNlIGEgdHdvLXdheSBmaWx0ZXIgJyArXG5cdCAgICAgICAgJ3RvIGVuc3VyZSBjb3JyZWN0IGJlaGF2aW9yLidcblx0ICAgICAgKVxuXHQgICAgfVxuXHQgICAgdmFyIGVsID0gdGhpcy5lbFxuXHQgICAgdmFyIHRhZyA9IGVsLnRhZ05hbWVcblx0ICAgIHZhciBoYW5kbGVyXG5cdCAgICBpZiAodGFnID09PSAnSU5QVVQnKSB7XG5cdCAgICAgIGhhbmRsZXIgPSBoYW5kbGVyc1tlbC50eXBlXSB8fCBoYW5kbGVycy5fZGVmYXVsdFxuXHQgICAgfSBlbHNlIGlmICh0YWcgPT09ICdTRUxFQ1QnKSB7XG5cdCAgICAgIGhhbmRsZXIgPSBoYW5kbGVycy5zZWxlY3Rcblx0ICAgIH0gZWxzZSBpZiAodGFnID09PSAnVEVYVEFSRUEnKSB7XG5cdCAgICAgIGhhbmRsZXIgPSBoYW5kbGVycy5fZGVmYXVsdFxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgXy53YXJuKFwidi1tb2RlbCBkb2Vzbid0IHN1cHBvcnQgZWxlbWVudCB0eXBlOiBcIiArIHRhZylcblx0ICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICBoYW5kbGVyLmJpbmQuY2FsbCh0aGlzKVxuXHQgICAgdGhpcy51cGRhdGUgPSBoYW5kbGVyLnVwZGF0ZVxuXHQgICAgdGhpcy51bmJpbmQgPSBoYW5kbGVyLnVuYmluZFxuXHQgIH1cblxuXHR9XG5cbi8qKiovIH0sXG4vKiA0OSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBjb25maWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuXHR2YXIgQmluZGluZyA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpXG5cdHZhciBhcnJheU1ldGhvZHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU5KVxuXHR2YXIgYXJyYXlLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJyYXlNZXRob2RzKVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDYwKVxuXG5cdHZhciB1aWQgPSAwXG5cblx0LyoqXG5cdCAqIFR5cGUgZW51bXNcblx0ICovXG5cblx0dmFyIEFSUkFZICA9IDBcblx0dmFyIE9CSkVDVCA9IDFcblxuXHQvKipcblx0ICogQXVnbWVudCBhbiB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGludGVyY2VwdGluZ1xuXHQgKiB0aGUgcHJvdG90eXBlIGNoYWluIHVzaW5nIF9fcHJvdG9fX1xuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b1xuXHQgKi9cblxuXHRmdW5jdGlvbiBwcm90b0F1Z21lbnQgKHRhcmdldCwgc3JjKSB7XG5cdCAgdGFyZ2V0Ll9fcHJvdG9fXyA9IHNyY1xuXHR9XG5cblx0LyoqXG5cdCAqIEF1Z21lbnQgYW4gdGFyZ2V0IE9iamVjdCBvciBBcnJheSBieSBkZWZpbmluZ1xuXHQgKiBoaWRkZW4gcHJvcGVydGllcy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IHRhcmdldFxuXHQgKiBAcGFyYW0ge09iamVjdH0gcHJvdG9cblx0ICovXG5cblx0ZnVuY3Rpb24gY29weUF1Z21lbnQgKHRhcmdldCwgc3JjLCBrZXlzKSB7XG5cdCAgdmFyIGkgPSBrZXlzLmxlbmd0aFxuXHQgIHZhciBrZXlcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICBrZXkgPSBrZXlzW2ldXG5cdCAgICBfLmRlZmluZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIE9ic2VydmVyIGNsYXNzIHRoYXQgYXJlIGF0dGFjaGVkIHRvIGVhY2ggb2JzZXJ2ZWRcblx0ICogb2JqZWN0LiBPbmNlIGF0dGFjaGVkLCB0aGUgb2JzZXJ2ZXIgY29udmVydHMgdGFyZ2V0XG5cdCAqIG9iamVjdCdzIHByb3BlcnR5IGtleXMgaW50byBnZXR0ZXIvc2V0dGVycyB0aGF0XG5cdCAqIGNvbGxlY3QgZGVwZW5kZW5jaWVzIGFuZCBkaXNwYXRjaGVzIHVwZGF0ZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSB2YWx1ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gdHlwZVxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cblx0ZnVuY3Rpb24gT2JzZXJ2ZXIgKHZhbHVlLCB0eXBlKSB7XG5cdCAgdGhpcy5pZCA9ICsrdWlkXG5cdCAgdGhpcy52YWx1ZSA9IHZhbHVlXG5cdCAgdGhpcy5hY3RpdmUgPSB0cnVlXG5cdCAgdGhpcy5iaW5kaW5ncyA9IFtdXG5cdCAgXy5kZWZpbmUodmFsdWUsICdfX29iX18nLCB0aGlzKVxuXHQgIGlmICh0eXBlID09PSBBUlJBWSkge1xuXHQgICAgdmFyIGF1Z21lbnQgPSBjb25maWcucHJvdG8gJiYgXy5oYXNQcm90b1xuXHQgICAgICA/IHByb3RvQXVnbWVudFxuXHQgICAgICA6IGNvcHlBdWdtZW50XG5cdCAgICBhdWdtZW50KHZhbHVlLCBhcnJheU1ldGhvZHMsIGFycmF5S2V5cylcblx0ICAgIHRoaXMub2JzZXJ2ZUFycmF5KHZhbHVlKVxuXHQgIH0gZWxzZSBpZiAodHlwZSA9PT0gT0JKRUNUKSB7XG5cdCAgICB0aGlzLndhbGsodmFsdWUpXG5cdCAgfVxuXHR9XG5cblx0T2JzZXJ2ZXIudGFyZ2V0ID0gbnVsbFxuXG5cdHZhciBwID0gT2JzZXJ2ZXIucHJvdG90eXBlXG5cblx0LyoqXG5cdCAqIEF0dGVtcHQgdG8gY3JlYXRlIGFuIG9ic2VydmVyIGluc3RhbmNlIGZvciBhIHZhbHVlLFxuXHQgKiByZXR1cm5zIHRoZSBuZXcgb2JzZXJ2ZXIgaWYgc3VjY2Vzc2Z1bGx5IG9ic2VydmVkLFxuXHQgKiBvciB0aGUgZXhpc3Rpbmcgb2JzZXJ2ZXIgaWYgdGhlIHZhbHVlIGFscmVhZHkgaGFzIG9uZS5cblx0ICpcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxuXHQgKiBAcmV0dXJuIHtPYnNlcnZlcnx1bmRlZmluZWR9XG5cdCAqIEBzdGF0aWNcblx0ICovXG5cblx0T2JzZXJ2ZXIuY3JlYXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgaWYgKFxuXHQgICAgdmFsdWUgJiZcblx0ICAgIHZhbHVlLmhhc093blByb3BlcnR5KCdfX29iX18nKSAmJlxuXHQgICAgdmFsdWUuX19vYl9fIGluc3RhbmNlb2YgT2JzZXJ2ZXJcblx0ICApIHtcblx0ICAgIHJldHVybiB2YWx1ZS5fX29iX19cblx0ICB9IGVsc2UgaWYgKF8uaXNBcnJheSh2YWx1ZSkpIHtcblx0ICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIodmFsdWUsIEFSUkFZKVxuXHQgIH0gZWxzZSBpZiAoXG5cdCAgICBfLmlzUGxhaW5PYmplY3QodmFsdWUpICYmXG5cdCAgICAhdmFsdWUuX2lzVnVlIC8vIGF2b2lkIFZ1ZSBpbnN0YW5jZVxuXHQgICkge1xuXHQgICAgcmV0dXJuIG5ldyBPYnNlcnZlcih2YWx1ZSwgT0JKRUNUKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBXYWxrIHRocm91Z2ggZWFjaCBwcm9wZXJ0eSBhbmQgY29udmVydCB0aGVtIGludG9cblx0ICogZ2V0dGVyL3NldHRlcnMuIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGNhbGxlZCB3aGVuXG5cdCAqIHZhbHVlIHR5cGUgaXMgT2JqZWN0LiBQcm9wZXJ0aWVzIHByZWZpeGVkIHdpdGggYCRgIG9yIGBfYFxuXHQgKiBhbmQgYWNjZXNzb3IgcHJvcGVydGllcyBhcmUgaWdub3JlZC5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IG9ialxuXHQgKi9cblxuXHRwLndhbGsgPSBmdW5jdGlvbiAob2JqKSB7XG5cdCAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopXG5cdCAgdmFyIGkgPSBrZXlzLmxlbmd0aFxuXHQgIHZhciBrZXksIHByZWZpeFxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIGtleSA9IGtleXNbaV1cblx0ICAgIHByZWZpeCA9IGtleS5jaGFyQ29kZUF0KDApXG5cdCAgICBpZiAocHJlZml4ICE9PSAweDI0ICYmIHByZWZpeCAhPT0gMHg1RikgeyAvLyBza2lwICQgb3IgX1xuXHQgICAgICB0aGlzLmNvbnZlcnQoa2V5LCBvYmpba2V5XSlcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogVHJ5IHRvIGNhcmV0ZSBhbiBvYnNlcnZlciBmb3IgYSBjaGlsZCB2YWx1ZSxcblx0ICogYW5kIGlmIHZhbHVlIGlzIGFycmF5LCBsaW5rIGJpbmRpbmcgdG8gdGhlIGFycmF5LlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHZhbFxuXHQgKiBAcmV0dXJuIHtCaW5kaW5nfHVuZGVmaW5lZH1cblx0ICovXG5cblx0cC5vYnNlcnZlID0gZnVuY3Rpb24gKHZhbCkge1xuXHQgIHJldHVybiBPYnNlcnZlci5jcmVhdGUodmFsKVxuXHR9XG5cblx0LyoqXG5cdCAqIE9ic2VydmUgYSBsaXN0IG9mIEFycmF5IGl0ZW1zLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5fSBpdGVtc1xuXHQgKi9cblxuXHRwLm9ic2VydmVBcnJheSA9IGZ1bmN0aW9uIChpdGVtcykge1xuXHQgIHZhciBpID0gaXRlbXMubGVuZ3RoXG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAgdGhpcy5vYnNlcnZlKGl0ZW1zW2ldKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0IGEgcHJvcGVydHkgaW50byBnZXR0ZXIvc2V0dGVyIHNvIHdlIGNhbiBlbWl0XG5cdCAqIHRoZSBldmVudHMgd2hlbiB0aGUgcHJvcGVydHkgaXMgYWNjZXNzZWQvY2hhbmdlZC5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleVxuXHQgKiBAcGFyYW0geyp9IHZhbFxuXHQgKi9cblxuXHRwLmNvbnZlcnQgPSBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0ICB2YXIgb2IgPSB0aGlzXG5cdCAgdmFyIGNoaWxkT2IgPSBvYi5vYnNlcnZlKHZhbClcblx0ICB2YXIgYmluZGluZyA9IG5ldyBCaW5kaW5nKClcblx0ICBpZiAoY2hpbGRPYikge1xuXHQgICAgY2hpbGRPYi5iaW5kaW5ncy5wdXNoKGJpbmRpbmcpXG5cdCAgfVxuXHQgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYi52YWx1ZSwga2V5LCB7XG5cdCAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXHQgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuXHQgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIC8vIE9ic2VydmVyLnRhcmdldCBpcyBhIHdhdGNoZXIgd2hvc2UgZ2V0dGVyIGlzXG5cdCAgICAgIC8vIGN1cnJlbnRseSBiZWluZyBldmFsdWF0ZWQuXG5cdCAgICAgIGlmIChvYi5hY3RpdmUgJiYgT2JzZXJ2ZXIudGFyZ2V0KSB7XG5cdCAgICAgICAgT2JzZXJ2ZXIudGFyZ2V0LmFkZERlcChiaW5kaW5nKVxuXHQgICAgICB9XG5cdCAgICAgIHJldHVybiB2YWxcblx0ICAgIH0sXG5cdCAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWwpIHtcblx0ICAgICAgaWYgKG5ld1ZhbCA9PT0gdmFsKSByZXR1cm5cblx0ICAgICAgLy8gcmVtb3ZlIGJpbmRpbmcgZnJvbSBvbGQgdmFsdWVcblx0ICAgICAgdmFyIG9sZENoaWxkT2IgPSB2YWwgJiYgdmFsLl9fb2JfX1xuXHQgICAgICBpZiAob2xkQ2hpbGRPYikge1xuXHQgICAgICAgIHZhciBvbGRCaW5kaW5ncyA9IG9sZENoaWxkT2IuYmluZGluZ3Ncblx0ICAgICAgICBvbGRCaW5kaW5ncy5zcGxpY2Uob2xkQmluZGluZ3MuaW5kZXhPZihiaW5kaW5nKSwgMSlcblx0ICAgICAgfVxuXHQgICAgICB2YWwgPSBuZXdWYWxcblx0ICAgICAgLy8gYWRkIGJpbmRpbmcgdG8gbmV3IHZhbHVlXG5cdCAgICAgIHZhciBuZXdDaGlsZE9iID0gb2Iub2JzZXJ2ZShuZXdWYWwpXG5cdCAgICAgIGlmIChuZXdDaGlsZE9iKSB7XG5cdCAgICAgICAgbmV3Q2hpbGRPYi5iaW5kaW5ncy5wdXNoKGJpbmRpbmcpXG5cdCAgICAgIH1cblx0ICAgICAgYmluZGluZy5ub3RpZnkoKVxuXHQgICAgfVxuXHQgIH0pXG5cdH1cblxuXHQvKipcblx0ICogTm90aWZ5IGNoYW5nZSBvbiBhbGwgc2VsZiBiaW5kaW5ncyBvbiBhbiBvYnNlcnZlci5cblx0ICogVGhpcyBpcyBjYWxsZWQgd2hlbiBhIG11dGFibGUgdmFsdWUgbXV0YXRlcy4gZS5nLlxuXHQgKiB3aGVuIGFuIEFycmF5J3MgbXV0YXRpbmcgbWV0aG9kcyBhcmUgY2FsbGVkLCBvciBhblxuXHQgKiBPYmplY3QncyAkYWRkLyRkZWxldGUgYXJlIGNhbGxlZC5cblx0ICovXG5cblx0cC5ub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG5cdCAgdmFyIGJpbmRpbmdzID0gdGhpcy5iaW5kaW5nc1xuXHQgIGZvciAodmFyIGkgPSAwLCBsID0gYmluZGluZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICBiaW5kaW5nc1tpXS5ub3RpZnkoKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgYW4gb3duZXIgdm0sIHNvIHRoYXQgd2hlbiAkYWRkLyRkZWxldGUgbXV0YXRpb25zXG5cdCAqIGhhcHBlbiB3ZSBjYW4gbm90aWZ5IG93bmVyIHZtcyB0byBwcm94eSB0aGUga2V5cyBhbmRcblx0ICogZGlnZXN0IHRoZSB3YXRjaGVycy4gVGhpcyBpcyBvbmx5IGNhbGxlZCB3aGVuIHRoZSBvYmplY3Rcblx0ICogaXMgb2JzZXJ2ZWQgYXMgYW4gaW5zdGFuY2UncyByb290ICRkYXRhLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICovXG5cblx0cC5hZGRWbSA9IGZ1bmN0aW9uICh2bSkge1xuXHQgICh0aGlzLnZtcyA9IHRoaXMudm1zIHx8IFtdKS5wdXNoKHZtKVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbiBvd25lciB2bS4gVGhpcyBpcyBjYWxsZWQgd2hlbiB0aGUgb2JqZWN0IGlzXG5cdCAqIHN3YXBwZWQgb3V0IGFzIGFuIGluc3RhbmNlJ3MgJGRhdGEgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICovXG5cblx0cC5yZW1vdmVWbSA9IGZ1bmN0aW9uICh2bSkge1xuXHQgIHRoaXMudm1zLnNwbGljZSh0aGlzLnZtcy5pbmRleE9mKHZtKSwgMSlcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gT2JzZXJ2ZXJcblxuXG4vKioqLyB9LFxuLyogNTAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdC8qKlxuXHQgKiBUaGUgQmF0Y2hlciBtYWludGFpbnMgYSBqb2IgcXVldWUgdG8gYmUgcnVuXG5cdCAqIGFzeW5jIG9uIHRoZSBuZXh0IGV2ZW50IGxvb3AuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIEJhdGNoZXIgKCkge1xuXHQgIHRoaXMucmVzZXQoKVxuXHR9XG5cblx0dmFyIHAgPSBCYXRjaGVyLnByb3RvdHlwZVxuXG5cdC8qKlxuXHQgKiBQdXNoIGEgam9iIGludG8gdGhlIGpvYiBxdWV1ZS5cblx0ICogSm9icyB3aXRoIGR1cGxpY2F0ZSBJRHMgd2lsbCBiZSBza2lwcGVkIHVubGVzcyBpdCdzXG5cdCAqIHB1c2hlZCB3aGVuIHRoZSBxdWV1ZSBpcyBiZWluZyBmbHVzaGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gam9iXG5cdCAqICAgcHJvcGVydGllczpcblx0ICogICAtIHtTdHJpbmd8TnVtYmVyfSBpZFxuXHQgKiAgIC0ge0Z1bmN0aW9ufSAgICAgIHJ1blxuXHQgKi9cblxuXHRwLnB1c2ggPSBmdW5jdGlvbiAoam9iKSB7XG5cdCAgaWYgKCFqb2IuaWQgfHwgIXRoaXMuaGFzW2pvYi5pZF0gfHwgdGhpcy5mbHVzaGluZykge1xuXHQgICAgdGhpcy5xdWV1ZS5wdXNoKGpvYilcblx0ICAgIHRoaXMuaGFzW2pvYi5pZF0gPSBqb2Jcblx0ICAgIGlmICghdGhpcy53YWl0aW5nKSB7XG5cdCAgICAgIHRoaXMud2FpdGluZyA9IHRydWVcblx0ICAgICAgXy5uZXh0VGljayh0aGlzLmZsdXNoLCB0aGlzKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGbHVzaCB0aGUgcXVldWUgYW5kIHJ1biB0aGUgam9icy5cblx0ICogV2lsbCBjYWxsIGEgcHJlRmx1c2ggaG9vayBpZiBoYXMgb25lLlxuXHQgKi9cblxuXHRwLmZsdXNoID0gZnVuY3Rpb24gKCkge1xuXHQgIHRoaXMuZmx1c2hpbmcgPSB0cnVlXG5cdCAgLy8gZG8gbm90IGNhY2hlIGxlbmd0aCBiZWNhdXNlIG1vcmUgam9icyBtaWdodCBiZSBwdXNoZWRcblx0ICAvLyBhcyB3ZSBydW4gZXhpc3Rpbmcgam9ic1xuXHQgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWV1ZS5sZW5ndGg7IGkrKykge1xuXHQgICAgdmFyIGpvYiA9IHRoaXMucXVldWVbaV1cblx0ICAgIGlmICgham9iLmNhbmNlbGxlZCkge1xuXHQgICAgICBqb2IucnVuKClcblx0ICAgIH1cblx0ICB9XG5cdCAgdGhpcy5yZXNldCgpXG5cdH1cblxuXHQvKipcblx0ICogUmVzZXQgdGhlIGJhdGNoZXIncyBzdGF0ZS5cblx0ICovXG5cblx0cC5yZXNldCA9IGZ1bmN0aW9uICgpIHtcblx0ICB0aGlzLmhhcyA9IHt9XG5cdCAgdGhpcy5xdWV1ZSA9IFtdXG5cdCAgdGhpcy53YWl0aW5nID0gZmFsc2Vcblx0ICB0aGlzLmZsdXNoaW5nID0gZmFsc2Vcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gQmF0Y2hlclxuXG4vKioqLyB9LFxuLyogNTEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgQ2FjaGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUyKVxuXHR2YXIgdGVtcGxhdGVDYWNoZSA9IG5ldyBDYWNoZSgxMDApXG5cblx0LyoqXG5cdCAqIFRlc3QgZm9yIHRoZSBwcmVzZW5jZSBvZiB0aGUgU2FmYXJpIHRlbXBsYXRlIGNsb25pbmcgYnVnXG5cdCAqIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzc3NTVcblx0ICovXG5cblx0dmFyIGhhc0Jyb2tlblRlbXBsYXRlID0gXy5pbkJyb3dzZXJcblx0ICA/IChmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0ICAgICAgYS5pbm5lckhUTUwgPSAnPHRlbXBsYXRlPjE8L3RlbXBsYXRlPidcblx0ICAgICAgcmV0dXJuICFhLmNsb25lTm9kZSh0cnVlKS5maXJzdENoaWxkLmlubmVySFRNTFxuXHQgICAgfSkoKVxuXHQgIDogZmFsc2VcblxuXHR2YXIgbWFwID0ge1xuXHQgIF9kZWZhdWx0IDogWzAsICcnLCAnJ10sXG5cdCAgbGVnZW5kICAgOiBbMSwgJzxmaWVsZHNldD4nLCAnPC9maWVsZHNldD4nXSxcblx0ICB0ciAgICAgICA6IFsyLCAnPHRhYmxlPjx0Ym9keT4nLCAnPC90Ym9keT48L3RhYmxlPiddLFxuXHQgIGNvbCAgICAgIDogW1xuXHQgICAgMixcblx0ICAgICc8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPicsXG5cdCAgICAnPC9jb2xncm91cD48L3RhYmxlPidcblx0ICBdXG5cdH1cblxuXHRtYXAudGQgPVxuXHRtYXAudGggPSBbXG5cdCAgMyxcblx0ICAnPHRhYmxlPjx0Ym9keT48dHI+Jyxcblx0ICAnPC90cj48L3Rib2R5PjwvdGFibGU+J1xuXHRdXG5cblx0bWFwLm9wdGlvbiA9XG5cdG1hcC5vcHRncm91cCA9IFtcblx0ICAxLFxuXHQgICc8c2VsZWN0IG11bHRpcGxlPVwibXVsdGlwbGVcIj4nLFxuXHQgICc8L3NlbGVjdD4nXG5cdF1cblxuXHRtYXAudGhlYWQgPVxuXHRtYXAudGJvZHkgPVxuXHRtYXAuY29sZ3JvdXAgPVxuXHRtYXAuY2FwdGlvbiA9XG5cdG1hcC50Zm9vdCA9IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddXG5cblx0bWFwLmcgPVxuXHRtYXAuZGVmcyA9XG5cdG1hcC5zeW1ib2wgPVxuXHRtYXAudXNlID1cblx0bWFwLmltYWdlID1cblx0bWFwLnRleHQgPVxuXHRtYXAuY2lyY2xlID1cblx0bWFwLmVsbGlwc2UgPVxuXHRtYXAubGluZSA9XG5cdG1hcC5wYXRoID1cblx0bWFwLnBvbHlnb24gPVxuXHRtYXAucG9seWxpbmUgPVxuXHRtYXAucmVjdCA9IFtcblx0ICAxLFxuXHQgICc8c3ZnICcgK1xuXHQgICAgJ3htbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiAnICtcblx0ICAgICd4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiAnICtcblx0ICAgICd4bWxuczpldj1cImh0dHA6Ly93d3cudzMub3JnLzIwMDEveG1sLWV2ZW50c1wiJyArXG5cdCAgICAndmVyc2lvbj1cIjEuMVwiPicsXG5cdCAgJzwvc3ZnPidcblx0XVxuXG5cdHZhciBUQUdfUkUgPSAvPChbXFx3Ol0rKS9cblxuXHQvKipcblx0ICogQ29udmVydCBhIHN0cmluZyB0ZW1wbGF0ZSB0byBhIERvY3VtZW50RnJhZ21lbnQuXG5cdCAqIERldGVybWluZXMgY29ycmVjdCB3cmFwcGluZyBieSB0YWcgdHlwZXMuIFdyYXBwaW5nXG5cdCAqIHN0cmF0ZWd5IGZvdW5kIGluIGpRdWVyeSAmIGNvbXBvbmVudC9kb21pZnkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZW1wbGF0ZVN0cmluZ1xuXHQgKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fVxuXHQgKi9cblxuXHRmdW5jdGlvbiBzdHJpbmdUb0ZyYWdtZW50ICh0ZW1wbGF0ZVN0cmluZykge1xuXHQgIC8vIHRyeSBhIGNhY2hlIGhpdCBmaXJzdFxuXHQgIHZhciBoaXQgPSB0ZW1wbGF0ZUNhY2hlLmdldCh0ZW1wbGF0ZVN0cmluZylcblx0ICBpZiAoaGl0KSB7XG5cdCAgICByZXR1cm4gaGl0XG5cdCAgfVxuXG5cdCAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0ICB2YXIgdGFnTWF0Y2ggPSBUQUdfUkUuZXhlYyh0ZW1wbGF0ZVN0cmluZylcblxuXHQgIGlmICghdGFnTWF0Y2gpIHtcblx0ICAgIC8vIHRleHQgb25seSwgcmV0dXJuIGEgc2luZ2xlIHRleHQgbm9kZS5cblx0ICAgIGZyYWcuYXBwZW5kQ2hpbGQoXG5cdCAgICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRlbXBsYXRlU3RyaW5nKVxuXHQgICAgKVxuXHQgIH0gZWxzZSB7XG5cblx0ICAgIHZhciB0YWcgICAgPSB0YWdNYXRjaFsxXVxuXHQgICAgdmFyIHdyYXAgICA9IG1hcFt0YWddIHx8IG1hcC5fZGVmYXVsdFxuXHQgICAgdmFyIGRlcHRoICA9IHdyYXBbMF1cblx0ICAgIHZhciBwcmVmaXggPSB3cmFwWzFdXG5cdCAgICB2YXIgc3VmZml4ID0gd3JhcFsyXVxuXHQgICAgdmFyIG5vZGUgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cblx0ICAgIG5vZGUuaW5uZXJIVE1MID0gcHJlZml4ICsgdGVtcGxhdGVTdHJpbmcudHJpbSgpICsgc3VmZml4XG5cdCAgICB3aGlsZSAoZGVwdGgtLSkge1xuXHQgICAgICBub2RlID0gbm9kZS5sYXN0Q2hpbGRcblx0ICAgIH1cblxuXHQgICAgdmFyIGNoaWxkXG5cdCAgICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cdCAgICB3aGlsZSAoY2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQpIHtcblx0ICAgICAgZnJhZy5hcHBlbmRDaGlsZChjaGlsZClcblx0ICAgIH1cblx0ICB9XG5cblx0ICB0ZW1wbGF0ZUNhY2hlLnB1dCh0ZW1wbGF0ZVN0cmluZywgZnJhZylcblx0ICByZXR1cm4gZnJhZ1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnQgYSB0ZW1wbGF0ZSBub2RlIHRvIGEgRG9jdW1lbnRGcmFnbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtOb2RlfSBub2RlXG5cdCAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIG5vZGVUb0ZyYWdtZW50IChub2RlKSB7XG5cdCAgdmFyIHRhZyA9IG5vZGUudGFnTmFtZVxuXHQgIC8vIGlmIGl0cyBhIHRlbXBsYXRlIHRhZyBhbmQgdGhlIGJyb3dzZXIgc3VwcG9ydHMgaXQsXG5cdCAgLy8gaXRzIGNvbnRlbnQgaXMgYWxyZWFkeSBhIGRvY3VtZW50IGZyYWdtZW50LlxuXHQgIGlmIChcblx0ICAgIHRhZyA9PT0gJ1RFTVBMQVRFJyAmJlxuXHQgICAgbm9kZS5jb250ZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudFxuXHQgICkge1xuXHQgICAgcmV0dXJuIG5vZGUuY29udGVudFxuXHQgIH1cblx0ICByZXR1cm4gdGFnID09PSAnU0NSSVBUJ1xuXHQgICAgPyBzdHJpbmdUb0ZyYWdtZW50KG5vZGUudGV4dENvbnRlbnQpXG5cdCAgICA6IHN0cmluZ1RvRnJhZ21lbnQobm9kZS5pbm5lckhUTUwpXG5cdH1cblxuXHQvKipcblx0ICogRGVhbCB3aXRoIFNhZmFyaSBjbG9uaW5nIG5lc3RlZCA8dGVtcGxhdGU+IGJ1ZyBieVxuXHQgKiBtYW51YWxseSBjbG9uaW5nIGFsbCB0ZW1wbGF0ZSBpbnN0YW5jZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSBub2RlXG5cdCAqIEByZXR1cm4ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH1cblx0ICovXG5cblx0ZXhwb3J0cy5jbG9uZSA9IGZ1bmN0aW9uIChub2RlKSB7XG5cdCAgdmFyIHJlcyA9IG5vZGUuY2xvbmVOb2RlKHRydWUpXG5cdCAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5cdCAgaWYgKGhhc0Jyb2tlblRlbXBsYXRlKSB7XG5cdCAgICB2YXIgdGVtcGxhdGVzID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKCd0ZW1wbGF0ZScpXG5cdCAgICBpZiAodGVtcGxhdGVzLmxlbmd0aCkge1xuXHQgICAgICB2YXIgY2xvbmVkID0gcmVzLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RlbXBsYXRlJylcblx0ICAgICAgdmFyIGkgPSBjbG9uZWQubGVuZ3RoXG5cdCAgICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgICBjbG9uZWRbaV0ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoXG5cdCAgICAgICAgICB0ZW1wbGF0ZXNbaV0uY2xvbmVOb2RlKHRydWUpLFxuXHQgICAgICAgICAgY2xvbmVkW2ldXG5cdCAgICAgICAgKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiByZXNcblx0fVxuXG5cdC8qKlxuXHQgKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSBvcHRpb24gYW5kIG5vcm1hbGl6ZXMgaXQgaW50byBhXG5cdCAqIGEgRG9jdW1lbnRGcmFnbWVudCB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgcGFydGlhbCBvciBhXG5cdCAqIGluc3RhbmNlIHRlbXBsYXRlLlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHRlbXBsYXRlXG5cdCAqICAgIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOlxuXHQgKiAgICAtIERvY3VtZW50RnJhZ21lbnQgb2JqZWN0XG5cdCAqICAgIC0gTm9kZSBvYmplY3Qgb2YgdHlwZSBUZW1wbGF0ZVxuXHQgKiAgICAtIGlkIHNlbGVjdG9yOiAnI3NvbWUtdGVtcGxhdGUtaWQnXG5cdCAqICAgIC0gdGVtcGxhdGUgc3RyaW5nOiAnPGRpdj48c3Bhbj57e21zZ319PC9zcGFuPjwvZGl2Pidcblx0ICogQHBhcmFtIHtCb29sZWFufSBjbG9uZVxuXHQgKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fHVuZGVmaW5lZH1cblx0ICovXG5cblx0ZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgY2xvbmUpIHtcblx0ICB2YXIgbm9kZSwgZnJhZ1xuXG5cdCAgLy8gaWYgdGhlIHRlbXBsYXRlIGlzIGFscmVhZHkgYSBkb2N1bWVudCBmcmFnbWVudCxcblx0ICAvLyBkbyBub3RoaW5nXG5cdCAgaWYgKHRlbXBsYXRlIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuXHQgICAgcmV0dXJuIGNsb25lXG5cdCAgICAgID8gdGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpXG5cdCAgICAgIDogdGVtcGxhdGVcblx0ICB9XG5cblx0ICBpZiAodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJykge1xuXHQgICAgLy8gaWQgc2VsZWN0b3Jcblx0ICAgIGlmICh0ZW1wbGF0ZS5jaGFyQXQoMCkgPT09ICcjJykge1xuXHQgICAgICAvLyBpZCBzZWxlY3RvciBjYW4gYmUgY2FjaGVkIHRvb1xuXHQgICAgICBmcmFnID0gdGVtcGxhdGVDYWNoZS5nZXQodGVtcGxhdGUpXG5cdCAgICAgIGlmICghZnJhZykge1xuXHQgICAgICAgIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZS5zbGljZSgxKSlcblx0ICAgICAgICBpZiAobm9kZSkge1xuXHQgICAgICAgICAgZnJhZyA9IG5vZGVUb0ZyYWdtZW50KG5vZGUpXG5cdCAgICAgICAgICAvLyBzYXZlIHNlbGVjdG9yIHRvIGNhY2hlXG5cdCAgICAgICAgICB0ZW1wbGF0ZUNhY2hlLnB1dCh0ZW1wbGF0ZSwgZnJhZylcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIG5vcm1hbCBzdHJpbmcgdGVtcGxhdGVcblx0ICAgICAgZnJhZyA9IHN0cmluZ1RvRnJhZ21lbnQodGVtcGxhdGUpXG5cdCAgICB9XG5cdCAgfSBlbHNlIGlmICh0ZW1wbGF0ZS5ub2RlVHlwZSkge1xuXHQgICAgLy8gYSBkaXJlY3Qgbm9kZVxuXHQgICAgZnJhZyA9IG5vZGVUb0ZyYWdtZW50KHRlbXBsYXRlKVxuXHQgIH1cblxuXHQgIHJldHVybiBmcmFnICYmIGNsb25lXG5cdCAgICA/IGV4cG9ydHMuY2xvbmUoZnJhZylcblx0ICAgIDogZnJhZ1xuXHR9XG5cbi8qKiovIH0sXG4vKiA1MiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyoqXG5cdCAqIEEgZG91Ymx5IGxpbmtlZCBsaXN0LWJhc2VkIExlYXN0IFJlY2VudGx5IFVzZWQgKExSVSlcblx0ICogY2FjaGUuIFdpbGwga2VlcCBtb3N0IHJlY2VudGx5IHVzZWQgaXRlbXMgd2hpbGVcblx0ICogZGlzY2FyZGluZyBsZWFzdCByZWNlbnRseSB1c2VkIGl0ZW1zIHdoZW4gaXRzIGxpbWl0IGlzXG5cdCAqIHJlYWNoZWQuIFRoaXMgaXMgYSBiYXJlLWJvbmUgdmVyc2lvbiBvZlxuXHQgKiBSYXNtdXMgQW5kZXJzc29uJ3MganMtbHJ1OlxuXHQgKlxuXHQgKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS9yc21zL2pzLWxydVxuXHQgKlxuXHQgKiBAcGFyYW0ge051bWJlcn0gbGltaXRcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIENhY2hlIChsaW1pdCkge1xuXHQgIHRoaXMuc2l6ZSA9IDBcblx0ICB0aGlzLmxpbWl0ID0gbGltaXRcblx0ICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSB1bmRlZmluZWRcblx0ICB0aGlzLl9rZXltYXAgPSB7fVxuXHR9XG5cblx0dmFyIHAgPSBDYWNoZS5wcm90b3R5cGVcblxuXHQvKipcblx0ICogUHV0IDx2YWx1ZT4gaW50byB0aGUgY2FjaGUgYXNzb2NpYXRlZCB3aXRoIDxrZXk+LlxuXHQgKiBSZXR1cm5zIHRoZSBlbnRyeSB3aGljaCB3YXMgcmVtb3ZlZCB0byBtYWtlIHJvb20gZm9yXG5cdCAqIHRoZSBuZXcgZW50cnkuIE90aGVyd2lzZSB1bmRlZmluZWQgaXMgcmV0dXJuZWQuXG5cdCAqIChpLmUuIGlmIHRoZXJlIHdhcyBlbm91Z2ggcm9vbSBhbHJlYWR5KS5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleVxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAqIEByZXR1cm4ge0VudHJ5fHVuZGVmaW5lZH1cblx0ICovXG5cblx0cC5wdXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHQgIHZhciBlbnRyeSA9IHtcblx0ICAgIGtleTprZXksXG5cdCAgICB2YWx1ZTp2YWx1ZVxuXHQgIH1cblx0ICB0aGlzLl9rZXltYXBba2V5XSA9IGVudHJ5XG5cdCAgaWYgKHRoaXMudGFpbCkge1xuXHQgICAgdGhpcy50YWlsLm5ld2VyID0gZW50cnlcblx0ICAgIGVudHJ5Lm9sZGVyID0gdGhpcy50YWlsXG5cdCAgfSBlbHNlIHtcblx0ICAgIHRoaXMuaGVhZCA9IGVudHJ5XG5cdCAgfVxuXHQgIHRoaXMudGFpbCA9IGVudHJ5XG5cdCAgaWYgKHRoaXMuc2l6ZSA9PT0gdGhpcy5saW1pdCkge1xuXHQgICAgcmV0dXJuIHRoaXMuc2hpZnQoKVxuXHQgIH0gZWxzZSB7XG5cdCAgICB0aGlzLnNpemUrK1xuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBQdXJnZSB0aGUgbGVhc3QgcmVjZW50bHkgdXNlZCAob2xkZXN0KSBlbnRyeSBmcm9tIHRoZVxuXHQgKiBjYWNoZS4gUmV0dXJucyB0aGUgcmVtb3ZlZCBlbnRyeSBvciB1bmRlZmluZWQgaWYgdGhlXG5cdCAqIGNhY2hlIHdhcyBlbXB0eS5cblx0ICovXG5cblx0cC5zaGlmdCA9IGZ1bmN0aW9uICgpIHtcblx0ICB2YXIgZW50cnkgPSB0aGlzLmhlYWRcblx0ICBpZiAoZW50cnkpIHtcblx0ICAgIHRoaXMuaGVhZCA9IHRoaXMuaGVhZC5uZXdlclxuXHQgICAgdGhpcy5oZWFkLm9sZGVyID0gdW5kZWZpbmVkXG5cdCAgICBlbnRyeS5uZXdlciA9IGVudHJ5Lm9sZGVyID0gdW5kZWZpbmVkXG5cdCAgICB0aGlzLl9rZXltYXBbZW50cnkua2V5XSA9IHVuZGVmaW5lZFxuXHQgIH1cblx0ICByZXR1cm4gZW50cnlcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYW5kIHJlZ2lzdGVyIHJlY2VudCB1c2Ugb2YgPGtleT4uIFJldHVybnMgdGhlIHZhbHVlXG5cdCAqIGFzc29jaWF0ZWQgd2l0aCA8a2V5PiBvciB1bmRlZmluZWQgaWYgbm90IGluIGNhY2hlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gcmV0dXJuRW50cnlcblx0ICogQHJldHVybiB7RW50cnl8Kn1cblx0ICovXG5cblx0cC5nZXQgPSBmdW5jdGlvbiAoa2V5LCByZXR1cm5FbnRyeSkge1xuXHQgIHZhciBlbnRyeSA9IHRoaXMuX2tleW1hcFtrZXldXG5cdCAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHJldHVyblxuXHQgIGlmIChlbnRyeSA9PT0gdGhpcy50YWlsKSB7XG5cdCAgICByZXR1cm4gcmV0dXJuRW50cnlcblx0ICAgICAgPyBlbnRyeVxuXHQgICAgICA6IGVudHJ5LnZhbHVlXG5cdCAgfVxuXHQgIC8vIEhFQUQtLS0tLS0tLS0tLS0tLVRBSUxcblx0ICAvLyAgIDwub2xkZXIgICAubmV3ZXI+XG5cdCAgLy8gIDwtLS0gYWRkIGRpcmVjdGlvbiAtLVxuXHQgIC8vICAgQSAgQiAgQyAgPEQ+ICBFXG5cdCAgaWYgKGVudHJ5Lm5ld2VyKSB7XG5cdCAgICBpZiAoZW50cnkgPT09IHRoaXMuaGVhZCkge1xuXHQgICAgICB0aGlzLmhlYWQgPSBlbnRyeS5uZXdlclxuXHQgICAgfVxuXHQgICAgZW50cnkubmV3ZXIub2xkZXIgPSBlbnRyeS5vbGRlciAvLyBDIDwtLSBFLlxuXHQgIH1cblx0ICBpZiAoZW50cnkub2xkZXIpIHtcblx0ICAgIGVudHJ5Lm9sZGVyLm5ld2VyID0gZW50cnkubmV3ZXIgLy8gQy4gLS0+IEVcblx0ICB9XG5cdCAgZW50cnkubmV3ZXIgPSB1bmRlZmluZWQgLy8gRCAtLXhcblx0ICBlbnRyeS5vbGRlciA9IHRoaXMudGFpbCAvLyBELiAtLT4gRVxuXHQgIGlmICh0aGlzLnRhaWwpIHtcblx0ICAgIHRoaXMudGFpbC5uZXdlciA9IGVudHJ5IC8vIEUuIDwtLSBEXG5cdCAgfVxuXHQgIHRoaXMudGFpbCA9IGVudHJ5XG5cdCAgcmV0dXJuIHJldHVybkVudHJ5XG5cdCAgICA/IGVudHJ5XG5cdCAgICA6IGVudHJ5LnZhbHVlXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IENhY2hlXG5cbi8qKiovIH0sXG4vKiA1MyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBhZGRDbGFzcyA9IF8uYWRkQ2xhc3Ncblx0dmFyIHJlbW92ZUNsYXNzID0gXy5yZW1vdmVDbGFzc1xuXHR2YXIgdHJhbnNEdXJhdGlvblByb3AgPSBfLnRyYW5zaXRpb25Qcm9wICsgJ0R1cmF0aW9uJ1xuXHR2YXIgYW5pbUR1cmF0aW9uUHJvcCA9IF8uYW5pbWF0aW9uUHJvcCArICdEdXJhdGlvbidcblxuXHR2YXIgcXVldWUgPSBbXVxuXHR2YXIgcXVldWVkID0gZmFsc2VcblxuXHQvKipcblx0ICogUHVzaCBhIGpvYiBpbnRvIHRoZSB0cmFuc2l0aW9uIHF1ZXVlLCB3aGljaCBpcyB0byBiZVxuXHQgKiBleGVjdXRlZCBvbiBuZXh0IGZyYW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsICAgIC0gdGFyZ2V0IGVsZW1lbnRcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpciAgICAtIDE6IGVudGVyLCAtMTogbGVhdmVcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gb3AgICAtIHRoZSBhY3R1YWwgZG9tIG9wZXJhdGlvblxuXHQgKiBAcGFyYW0ge1N0cmluZ30gY2xzICAgIC0gdGhlIGNsYXNzTmFtZSB0byByZW1vdmUgd2hlbiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24gaXMgZG9uZS5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSAtIHVzZXIgc3VwcGxpZWQgY2FsbGJhY2suXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHB1c2ggKGVsLCBkaXIsIG9wLCBjbHMsIGNiKSB7XG5cdCAgcXVldWUucHVzaCh7XG5cdCAgICBlbCAgOiBlbCxcblx0ICAgIGRpciA6IGRpcixcblx0ICAgIGNiICA6IGNiLFxuXHQgICAgY2xzIDogY2xzLFxuXHQgICAgb3AgIDogb3Bcblx0ICB9KVxuXHQgIGlmICghcXVldWVkKSB7XG5cdCAgICBxdWV1ZWQgPSB0cnVlXG5cdCAgICBfLm5leHRUaWNrKGZsdXNoKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGbHVzaCB0aGUgcXVldWUsIGFuZCBkbyBvbmUgZm9yY2VkIHJlZmxvdyBiZWZvcmVcblx0ICogdHJpZ2dlcmluZyB0cmFuc2l0aW9ucy5cblx0ICovXG5cblx0ZnVuY3Rpb24gZmx1c2ggKCkge1xuXHQgIC8qIGpzaGludCB1bnVzZWQ6IGZhbHNlICovXG5cdCAgdmFyIGYgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0XG5cdCAgcXVldWUuZm9yRWFjaChydW4pXG5cdCAgcXVldWUgPSBbXVxuXHQgIHF1ZXVlZCA9IGZhbHNlXG5cdH1cblxuXHQvKipcblx0ICogUnVuIGEgdHJhbnNpdGlvbiBqb2IuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBqb2Jcblx0ICovXG5cblx0ZnVuY3Rpb24gcnVuIChqb2IpIHtcblxuXHQgIHZhciBlbCA9IGpvYi5lbFxuXHQgIHZhciBkYXRhID0gZWwuX192X3RyYW5zXG5cdCAgdmFyIGNscyA9IGpvYi5jbHNcblx0ICB2YXIgY2IgPSBqb2IuY2Jcblx0ICB2YXIgb3AgPSBqb2Iub3Bcblx0ICB2YXIgdHJhbnNpdGlvblR5cGUgPSBnZXRUcmFuc2l0aW9uVHlwZShlbCwgZGF0YSwgY2xzKVxuXG5cdCAgaWYgKGpvYi5kaXIgPiAwKSB7IC8vIEVOVEVSXG5cdCAgICBpZiAodHJhbnNpdGlvblR5cGUgPT09IDEpIHtcblx0ICAgICAgLy8gdHJpZ2dlciB0cmFuc2l0aW9uIGJ5IHJlbW92aW5nIGVudGVyIGNsYXNzXG5cdCAgICAgIHJlbW92ZUNsYXNzKGVsLCBjbHMpXG5cdCAgICAgIC8vIG9ubHkgbmVlZCB0byBsaXN0ZW4gZm9yIHRyYW5zaXRpb25lbmQgaWYgdGhlcmUnc1xuXHQgICAgICAvLyBhIHVzZXIgY2FsbGJhY2tcblx0ICAgICAgaWYgKGNiKSBzZXR1cFRyYW5zaXRpb25DYihfLnRyYW5zaXRpb25FbmRFdmVudClcblx0ICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvblR5cGUgPT09IDIpIHtcblx0ICAgICAgLy8gYW5pbWF0aW9ucyBhcmUgdHJpZ2dlcmVkIHdoZW4gY2xhc3MgaXMgYWRkZWRcblx0ICAgICAgLy8gc28gd2UganVzdCBsaXN0ZW4gZm9yIGFuaW1hdGlvbmVuZCB0byByZW1vdmUgaXQuXG5cdCAgICAgIHNldHVwVHJhbnNpdGlvbkNiKF8uYW5pbWF0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZW1vdmVDbGFzcyhlbCwgY2xzKVxuXHQgICAgICB9KVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gbm8gdHJhbnNpdGlvbiBhcHBsaWNhYmxlXG5cdCAgICAgIHJlbW92ZUNsYXNzKGVsLCBjbHMpXG5cdCAgICAgIGlmIChjYikgY2IoKVxuXHQgICAgfVxuXHQgIH0gZWxzZSB7IC8vIExFQVZFXG5cdCAgICBpZiAodHJhbnNpdGlvblR5cGUpIHtcblx0ICAgICAgLy8gbGVhdmUgdHJhbnNpdGlvbnMvYW5pbWF0aW9ucyBhcmUgYm90aCB0cmlnZ2VyZWRcblx0ICAgICAgLy8gYnkgYWRkaW5nIHRoZSBjbGFzcywganVzdCByZW1vdmUgaXQgb24gZW5kIGV2ZW50LlxuXHQgICAgICB2YXIgZXZlbnQgPSB0cmFuc2l0aW9uVHlwZSA9PT0gMVxuXHQgICAgICAgID8gXy50cmFuc2l0aW9uRW5kRXZlbnRcblx0ICAgICAgICA6IF8uYW5pbWF0aW9uRW5kRXZlbnRcblx0ICAgICAgc2V0dXBUcmFuc2l0aW9uQ2IoZXZlbnQsIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBvcCgpXG5cdCAgICAgICAgcmVtb3ZlQ2xhc3MoZWwsIGNscylcblx0ICAgICAgfSlcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIG9wKClcblx0ICAgICAgcmVtb3ZlQ2xhc3MoZWwsIGNscylcblx0ICAgICAgaWYgKGNiKSBjYigpXG5cdCAgICB9XG5cdCAgfVxuXG5cdCAgLyoqXG5cdCAgICogU2V0IHVwIGEgdHJhbnNpdGlvbiBlbmQgY2FsbGJhY2ssIHN0b3JlIHRoZSBjYWxsYmFja1xuXHQgICAqIG9uIHRoZSBlbGVtZW50J3MgX192X3RyYW5zIGRhdGEgb2JqZWN0LCBzbyB3ZSBjYW5cblx0ICAgKiBjbGVhbiBpdCB1cCBpZiBhbm90aGVyIHRyYW5zaXRpb24gaXMgdHJpZ2dlcmVkIGJlZm9yZVxuXHQgICAqIHRoZSBjYWxsYmFjayBpcyBmaXJlZC5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjbGVhbnVwRm5dXG5cdCAgICovXG5cblx0ICBmdW5jdGlvbiBzZXR1cFRyYW5zaXRpb25DYiAoZXZlbnQsIGNsZWFudXBGbikge1xuXHQgICAgZGF0YS5ldmVudCA9IGV2ZW50XG5cdCAgICB2YXIgb25FbmQgPSBkYXRhLmNhbGxiYWNrID0gZnVuY3Rpb24gdHJhbnNpdGlvbkNiIChlKSB7XG5cdCAgICAgIGlmIChlLnRhcmdldCA9PT0gZWwpIHtcblx0ICAgICAgICBfLm9mZihlbCwgZXZlbnQsIG9uRW5kKVxuXHQgICAgICAgIGRhdGEuZXZlbnQgPSBkYXRhLmNhbGxiYWNrID0gbnVsbFxuXHQgICAgICAgIGlmIChjbGVhbnVwRm4pIGNsZWFudXBGbigpXG5cdCAgICAgICAgaWYgKGNiKSBjYigpXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIF8ub24oZWwsIGV2ZW50LCBvbkVuZClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGFuIGVsZW1lbnQncyB0cmFuc2l0aW9uIHR5cGUgYmFzZWQgb24gdGhlXG5cdCAqIGNhbGN1bGF0ZWQgc3R5bGVzXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGFcblx0ICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ9XG5cdCAqICAgICAgICAgMSAtIHRyYW5zaXRpb25cblx0ICogICAgICAgICAyIC0gYW5pbWF0aW9uXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGdldFRyYW5zaXRpb25UeXBlIChlbCwgZGF0YSwgY2xhc3NOYW1lKSB7XG5cdCAgdmFyIHR5cGUgPSBkYXRhLmNhY2hlICYmIGRhdGEuY2FjaGVbY2xhc3NOYW1lXVxuXHQgIGlmICh0eXBlKSByZXR1cm4gdHlwZVxuXHQgIHZhciBpbmxpbmVTdHlsZXMgPSBlbC5zdHlsZVxuXHQgIHZhciBjb21wdXRlZFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVxuXHQgIHZhciB0cmFuc0R1cmF0aW9uID1cblx0ICAgIGlubGluZVN0eWxlc1t0cmFuc0R1cmF0aW9uUHJvcF0gfHxcblx0ICAgIGNvbXB1dGVkU3R5bGVzW3RyYW5zRHVyYXRpb25Qcm9wXVxuXHQgIGlmICh0cmFuc0R1cmF0aW9uICYmIHRyYW5zRHVyYXRpb24gIT09ICcwcycpIHtcblx0ICAgIHR5cGUgPSAxXG5cdCAgfSBlbHNlIHtcblx0ICAgIHZhciBhbmltRHVyYXRpb24gPVxuXHQgICAgICBpbmxpbmVTdHlsZXNbYW5pbUR1cmF0aW9uUHJvcF0gfHxcblx0ICAgICAgY29tcHV0ZWRTdHlsZXNbYW5pbUR1cmF0aW9uUHJvcF1cblx0ICAgIGlmIChhbmltRHVyYXRpb24gJiYgYW5pbUR1cmF0aW9uICE9PSAnMHMnKSB7XG5cdCAgICAgIHR5cGUgPSAyXG5cdCAgICB9XG5cdCAgfVxuXHQgIGlmICh0eXBlKSB7XG5cdCAgICBpZiAoIWRhdGEuY2FjaGUpIGRhdGEuY2FjaGUgPSB7fVxuXHQgICAgZGF0YS5jYWNoZVtjbGFzc05hbWVdID0gdHlwZVxuXHQgIH1cblx0ICByZXR1cm4gdHlwZVxuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGx5IENTUyB0cmFuc2l0aW9uIHRvIGFuIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpcmVjdGlvbiAtIDE6IGVudGVyLCAtMTogbGVhdmVcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gb3AgLSB0aGUgYWN0dWFsIERPTSBvcGVyYXRpb25cblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0YXJnZXQgZWxlbWVudCdzIHRyYW5zaXRpb24gZGF0YVxuXHQgKi9cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbCwgZGlyZWN0aW9uLCBvcCwgZGF0YSwgY2IpIHtcblx0ICB2YXIgcHJlZml4ID0gZGF0YS5pZCB8fCAndidcblx0ICB2YXIgZW50ZXJDbGFzcyA9IHByZWZpeCArICctZW50ZXInXG5cdCAgdmFyIGxlYXZlQ2xhc3MgPSBwcmVmaXggKyAnLWxlYXZlJ1xuXHQgIC8vIGNsZWFuIHVwIHBvdGVudGlhbCBwcmV2aW91cyB1bmZpbmlzaGVkIHRyYW5zaXRpb25cblx0ICBpZiAoZGF0YS5jYWxsYmFjaykge1xuXHQgICAgXy5vZmYoZWwsIGRhdGEuZXZlbnQsIGRhdGEuY2FsbGJhY2spXG5cdCAgICByZW1vdmVDbGFzcyhlbCwgZW50ZXJDbGFzcylcblx0ICAgIHJlbW92ZUNsYXNzKGVsLCBsZWF2ZUNsYXNzKVxuXHQgICAgZGF0YS5ldmVudCA9IGRhdGEuY2FsbGJhY2sgPSBudWxsXG5cdCAgfVxuXHQgIGlmIChkaXJlY3Rpb24gPiAwKSB7IC8vIGVudGVyXG5cdCAgICBhZGRDbGFzcyhlbCwgZW50ZXJDbGFzcylcblx0ICAgIG9wKClcblx0ICAgIHB1c2goZWwsIGRpcmVjdGlvbiwgbnVsbCwgZW50ZXJDbGFzcywgY2IpXG5cdCAgfSBlbHNlIHsgLy8gbGVhdmVcblx0ICAgIGFkZENsYXNzKGVsLCBsZWF2ZUNsYXNzKVxuXHQgICAgcHVzaChlbCwgZGlyZWN0aW9uLCBvcCwgbGVhdmVDbGFzcywgY2IpXG5cdCAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiA1NCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyoqXG5cdCAqIEFwcGx5IEphdmFTY3JpcHQgZW50ZXIvbGVhdmUgZnVuY3Rpb25zLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkaXJlY3Rpb24gLSAxOiBlbnRlciwgLTE6IGxlYXZlXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IG9wIC0gdGhlIGFjdHVhbCBET00gb3BlcmF0aW9uXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGFyZ2V0IGVsZW1lbnQncyB0cmFuc2l0aW9uIGRhdGFcblx0ICogQHBhcmFtIHtPYmplY3R9IGRlZiAtIHRyYW5zaXRpb24gZGVmaW5pdGlvbiBvYmplY3Rcblx0ICogQHBhcmFtIHtWdWV9IHZtIC0gdGhlIG93bmVyIHZtIG9mIHRoZSBlbGVtZW50XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICovXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWwsIGRpcmVjdGlvbiwgb3AsIGRhdGEsIGRlZiwgdm0sIGNiKSB7XG5cdCAgaWYgKGRhdGEuY2FuY2VsKSB7XG5cdCAgICBkYXRhLmNhbmNlbCgpXG5cdCAgICBkYXRhLmNhbmNlbCA9IG51bGxcblx0ICB9XG5cdCAgaWYgKGRpcmVjdGlvbiA+IDApIHsgLy8gZW50ZXJcblx0ICAgIGlmIChkZWYuYmVmb3JlRW50ZXIpIHtcblx0ICAgICAgZGVmLmJlZm9yZUVudGVyLmNhbGwodm0sIGVsKVxuXHQgICAgfVxuXHQgICAgb3AoKVxuXHQgICAgaWYgKGRlZi5lbnRlcikge1xuXHQgICAgICBkYXRhLmNhbmNlbCA9IGRlZi5lbnRlci5jYWxsKHZtLCBlbCwgZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGRhdGEuY2FuY2VsID0gbnVsbFxuXHQgICAgICAgIGlmIChjYikgY2IoKVxuXHQgICAgICB9KVxuXHQgICAgfSBlbHNlIGlmIChjYikge1xuXHQgICAgICBjYigpXG5cdCAgICB9XG5cdCAgfSBlbHNlIHsgLy8gbGVhdmVcblx0ICAgIGlmIChkZWYubGVhdmUpIHtcblx0ICAgICAgZGF0YS5jYW5jZWwgPSBkZWYubGVhdmUuY2FsbCh2bSwgZWwsIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBkYXRhLmNhbmNlbCA9IG51bGxcblx0ICAgICAgICBvcCgpXG5cdCAgICAgICAgaWYgKGNiKSBjYigpXG5cdCAgICAgIH0pXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBvcCgpXG5cdCAgICAgIGlmIChjYikgY2IoKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogNTUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIHNlbGYgPSB0aGlzXG5cdCAgICB2YXIgZWwgPSB0aGlzLmVsXG5cblx0ICAgIC8vIGNoZWNrIHBhcmFtc1xuXHQgICAgLy8gLSBsYXp5OiB1cGRhdGUgbW9kZWwgb24gXCJjaGFuZ2VcIiBpbnN0ZWFkIG9mIFwiaW5wdXRcIlxuXHQgICAgdmFyIGxhenkgPSBlbC5oYXNBdHRyaWJ1dGUoJ2xhenknKVxuXHQgICAgaWYgKGxhenkpIHtcblx0ICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdsYXp5Jylcblx0ICAgIH1cblx0ICAgIC8vIC0gbnVtYmVyOiBjYXN0IHZhbHVlIGludG8gbnVtYmVyIHdoZW4gdXBkYXRpbmcgbW9kZWwuXG5cdCAgICB2YXIgbnVtYmVyID1cblx0ICAgICAgZWwuaGFzQXR0cmlidXRlKCdudW1iZXInKSB8fFxuXHQgICAgICBlbC50eXBlID09PSAnbnVtYmVyJ1xuXHQgICAgaWYgKG51bWJlcikge1xuXHQgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ251bWJlcicpXG5cdCAgICB9XG5cblx0ICAgIC8vIGhhbmRsZSBjb21wb3NpdGlvbiBldmVudHMuXG5cdCAgICAvLyBodHRwOi8vYmxvZy5ldmFueW91Lm1lLzIwMTQvMDEvMDMvY29tcG9zaXRpb24tZXZlbnQvXG5cdCAgICB2YXIgY3BMb2NrZWQgPSBmYWxzZVxuXHQgICAgdGhpcy5jcExvY2sgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIGNwTG9ja2VkID0gdHJ1ZVxuXHQgICAgfVxuXHQgICAgdGhpcy5jcFVubG9jayA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgY3BMb2NrZWQgPSBmYWxzZVxuXHQgICAgICAvLyBpbiBJRTExIHRoZSBcImNvbXBvc2l0aW9uZW5kXCIgZXZlbnQgZmlyZXMgQUZURVJcblx0ICAgICAgLy8gdGhlIFwiaW5wdXRcIiBldmVudCwgc28gdGhlIGlucHV0IGhhbmRsZXIgaXMgYmxvY2tlZFxuXHQgICAgICAvLyBhdCB0aGUgZW5kLi4uIGhhdmUgdG8gY2FsbCBpdCBoZXJlLlxuXHQgICAgICBzZXQoKVxuXHQgICAgfVxuXHQgICAgXy5vbihlbCwnY29tcG9zaXRpb25zdGFydCcsIHRoaXMuY3BMb2NrKVxuXHQgICAgXy5vbihlbCwnY29tcG9zaXRpb25lbmQnLCB0aGlzLmNwVW5sb2NrKVxuXG5cdCAgICAvLyBzaGFyZWQgc2V0dGVyXG5cdCAgICBmdW5jdGlvbiBzZXQgKCkge1xuXHQgICAgICBzZWxmLnNldChcblx0ICAgICAgICBudW1iZXIgPyBfLnRvTnVtYmVyKGVsLnZhbHVlKSA6IGVsLnZhbHVlLFxuXHQgICAgICAgIHRydWVcblx0ICAgICAgKVxuXHQgICAgfVxuXG5cdCAgICAvLyBpZiB0aGUgZGlyZWN0aXZlIGhhcyBmaWx0ZXJzLCB3ZSBuZWVkIHRvXG5cdCAgICAvLyByZWNvcmQgY3Vyc29yIHBvc2l0aW9uIGFuZCByZXN0b3JlIGl0IGFmdGVyIHVwZGF0aW5nXG5cdCAgICAvLyB0aGUgaW5wdXQgd2l0aCB0aGUgZmlsdGVyZWQgdmFsdWUuXG5cdCAgICB0aGlzLmxpc3RlbmVyID0gZnVuY3Rpb24gdGV4dElucHV0TGlzdGVuZXIgKCkge1xuXHQgICAgICBpZiAoY3BMb2NrZWQpIHJldHVyblxuXHQgICAgICB2YXIgY2hhcnNPZmZzZXRcblx0ICAgICAgLy8gc29tZSBIVE1MNSBpbnB1dCB0eXBlcyB0aHJvdyBlcnJvciBoZXJlXG5cdCAgICAgIHRyeSB7XG5cdCAgICAgICAgLy8gcmVjb3JkIGhvdyBtYW55IGNoYXJzIGZyb20gdGhlIGVuZCBvZiBpbnB1dFxuXHQgICAgICAgIC8vIHRoZSBjdXJzb3Igd2FzIGF0XG5cdCAgICAgICAgY2hhcnNPZmZzZXQgPSBlbC52YWx1ZS5sZW5ndGggLSBlbC5zZWxlY3Rpb25TdGFydFxuXHQgICAgICB9IGNhdGNoIChlKSB7fVxuXHQgICAgICBzZXQoKVxuXHQgICAgICAvLyBmb3JjZSBhIHZhbHVlIHVwZGF0ZSwgYmVjYXVzZSBpblxuXHQgICAgICAvLyBjZXJ0YWluIGNhc2VzIHRoZSB3cml0ZSBmaWx0ZXJzIG91dHB1dCB0aGUgc2FtZVxuXHQgICAgICAvLyByZXN1bHQgZm9yIGRpZmZlcmVudCBpbnB1dCB2YWx1ZXMsIGFuZCB0aGUgT2JzZXJ2ZXJcblx0ICAgICAgLy8gc2V0IGV2ZW50cyB3b24ndCBiZSB0cmlnZ2VyZWQuXG5cdCAgICAgIF8ubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBuZXdWYWwgPSBzZWxmLl93YXRjaGVyLnZhbHVlXG5cdCAgICAgICAgc2VsZi51cGRhdGUobmV3VmFsKVxuXHQgICAgICAgIGlmIChjaGFyc09mZnNldCAhPSBudWxsKSB7XG5cdCAgICAgICAgICB2YXIgY3Vyc29yUG9zID1cblx0ICAgICAgICAgICAgXy50b1N0cmluZyhuZXdWYWwpLmxlbmd0aCAtIGNoYXJzT2Zmc2V0XG5cdCAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3JQb3MsIGN1cnNvclBvcylcblx0ICAgICAgICB9XG5cdCAgICAgIH0pXG5cdCAgICB9XG5cdCAgICB0aGlzLmV2ZW50ID0gbGF6eSA/ICdjaGFuZ2UnIDogJ2lucHV0J1xuXHQgICAgXy5vbihlbCwgdGhpcy5ldmVudCwgdGhpcy5saXN0ZW5lcilcblxuXHQgICAgLy8gSUU5IGRvZXNuJ3QgZmlyZSBpbnB1dCBldmVudCBvbiBiYWNrc3BhY2UvZGVsL2N1dFxuXHQgICAgaWYgKCFsYXp5ICYmIF8uaXNJRTkpIHtcblx0ICAgICAgdGhpcy5vbkN1dCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBfLm5leHRUaWNrKHNlbGYubGlzdGVuZXIpXG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5vbkRlbCA9IGZ1bmN0aW9uIChlKSB7XG5cdCAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gNDYgfHwgZS5rZXlDb2RlID09PSA4KSB7XG5cdCAgICAgICAgICBzZWxmLmxpc3RlbmVyKClcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgICAgXy5vbihlbCwgJ2N1dCcsIHRoaXMub25DdXQpXG5cdCAgICAgIF8ub24oZWwsICdrZXl1cCcsIHRoaXMub25EZWwpXG5cdCAgICB9XG5cblx0ICAgIC8vIHNldCBpbml0aWFsIHZhbHVlIGlmIHByZXNlbnRcblx0ICAgIGlmIChcblx0ICAgICAgZWwuaGFzQXR0cmlidXRlKCd2YWx1ZScpIHx8XG5cdCAgICAgIChlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnICYmIGVsLnZhbHVlLnRyaW0oKSlcblx0ICAgICkge1xuXHQgICAgICB0aGlzLl9pbml0VmFsdWUgPSBudW1iZXJcblx0ICAgICAgICA/IF8udG9OdW1iZXIoZWwudmFsdWUpXG5cdCAgICAgICAgOiBlbC52YWx1ZVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgdGhpcy5lbC52YWx1ZSA9IF8udG9TdHJpbmcodmFsdWUpXG5cdCAgfSxcblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIGVsID0gdGhpcy5lbFxuXHQgICAgXy5vZmYoZWwsIHRoaXMuZXZlbnQsIHRoaXMubGlzdGVuZXIpXG5cdCAgICBfLm9mZihlbCwnY29tcG9zaXRpb25zdGFydCcsIHRoaXMuY3BMb2NrKVxuXHQgICAgXy5vZmYoZWwsJ2NvbXBvc2l0aW9uZW5kJywgdGhpcy5jcFVubG9jaylcblx0ICAgIGlmICh0aGlzLm9uQ3V0KSB7XG5cdCAgICAgIF8ub2ZmKGVsLCdjdXQnLCB0aGlzLm9uQ3V0KVxuXHQgICAgICBfLm9mZihlbCwna2V5dXAnLCB0aGlzLm9uRGVsKVxuXHQgICAgfVxuXHQgIH1cblxuXHR9XG5cbi8qKiovIH0sXG4vKiA1NiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgc2VsZiA9IHRoaXNcblx0ICAgIHZhciBlbCA9IHRoaXMuZWxcblx0ICAgIHRoaXMubGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHNlbGYuc2V0KGVsLnZhbHVlLCB0cnVlKVxuXHQgICAgfVxuXHQgICAgXy5vbihlbCwgJ2NoYW5nZScsIHRoaXMubGlzdGVuZXIpXG5cdCAgICBpZiAoZWwuY2hlY2tlZCkge1xuXHQgICAgICB0aGlzLl9pbml0VmFsdWUgPSBlbC52YWx1ZVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgLyoganNoaW50IGVxZXFlcTogZmFsc2UgKi9cblx0ICAgIHRoaXMuZWwuY2hlY2tlZCA9IHZhbHVlID09IHRoaXMuZWwudmFsdWVcblx0ICB9LFxuXG5cdCAgdW5iaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICBfLm9mZih0aGlzLmVsLCAnY2hhbmdlJywgdGhpcy5saXN0ZW5lcilcblx0ICB9XG5cblx0fVxuXG4vKioqLyB9LFxuLyogNTcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgV2F0Y2hlciA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgc2VsZiA9IHRoaXNcblx0ICAgIHZhciBlbCA9IHRoaXMuZWxcblx0ICAgIC8vIGNoZWNrIG9wdGlvbnMgcGFyYW1cblx0ICAgIHZhciBvcHRpb25zUGFyYW0gPSBlbC5nZXRBdHRyaWJ1dGUoJ29wdGlvbnMnKVxuXHQgICAgaWYgKG9wdGlvbnNQYXJhbSkge1xuXHQgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ29wdGlvbnMnKVxuXHQgICAgICBpbml0T3B0aW9ucy5jYWxsKHRoaXMsIG9wdGlvbnNQYXJhbSlcblx0ICAgIH1cblx0ICAgIHRoaXMubXVsdGlwbGUgPSBlbC5oYXNBdHRyaWJ1dGUoJ211bHRpcGxlJylcblx0ICAgIHRoaXMubGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHZhciB2YWx1ZSA9IHNlbGYubXVsdGlwbGVcblx0ICAgICAgICA/IGdldE11bHRpVmFsdWUoZWwpXG5cdCAgICAgICAgOiBlbC52YWx1ZVxuXHQgICAgICBzZWxmLnNldCh2YWx1ZSwgdHJ1ZSlcblx0ICAgIH1cblx0ICAgIF8ub24oZWwsICdjaGFuZ2UnLCB0aGlzLmxpc3RlbmVyKVxuXHQgICAgY2hlY2tJbml0aWFsVmFsdWUuY2FsbCh0aGlzKVxuXHQgIH0sXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgLyoganNoaW50IGVxZXFlcTogZmFsc2UgKi9cblx0ICAgIHZhciBlbCA9IHRoaXMuZWxcblx0ICAgIGVsLnNlbGVjdGVkSW5kZXggPSAtMVxuXHQgICAgdmFyIG11bHRpID0gdGhpcy5tdWx0aXBsZSAmJiBfLmlzQXJyYXkodmFsdWUpXG5cdCAgICB2YXIgb3B0aW9ucyA9IGVsLm9wdGlvbnNcblx0ICAgIHZhciBpID0gb3B0aW9ucy5sZW5ndGhcblx0ICAgIHZhciBvcHRpb25cblx0ICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgb3B0aW9uID0gb3B0aW9uc1tpXVxuXHQgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBtdWx0aVxuXHQgICAgICAgID8gaW5kZXhPZih2YWx1ZSwgb3B0aW9uLnZhbHVlKSA+IC0xXG5cdCAgICAgICAgOiB2YWx1ZSA9PSBvcHRpb24udmFsdWVcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgdW5iaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICBfLm9mZih0aGlzLmVsLCAnY2hhbmdlJywgdGhpcy5saXN0ZW5lcilcblx0ICAgIGlmICh0aGlzLm9wdGlvbldhdGNoZXIpIHtcblx0ICAgICAgdGhpcy5vcHRpb25XYXRjaGVyLnRlYXJkb3duKClcblx0ICAgIH1cblx0ICB9XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBvcHRpb24gbGlzdCBmcm9tIHRoZSBwYXJhbS5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV4cHJlc3Npb25cblx0ICovXG5cblx0ZnVuY3Rpb24gaW5pdE9wdGlvbnMgKGV4cHJlc3Npb24pIHtcblx0ICB2YXIgc2VsZiA9IHRoaXNcblx0ICBmdW5jdGlvbiBvcHRpb25VcGRhdGVXYXRjaGVyICh2YWx1ZSkge1xuXHQgICAgaWYgKF8uaXNBcnJheSh2YWx1ZSkpIHtcblx0ICAgICAgc2VsZi5lbC5pbm5lckhUTUwgPSAnJ1xuXHQgICAgICBidWlsZE9wdGlvbnMoc2VsZi5lbCwgdmFsdWUpXG5cdCAgICAgIGlmIChzZWxmLl93YXRjaGVyKSB7XG5cdCAgICAgICAgc2VsZi51cGRhdGUoc2VsZi5fd2F0Y2hlci52YWx1ZSlcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgXy53YXJuKCdJbnZhbGlkIG9wdGlvbnMgdmFsdWUgZm9yIHYtbW9kZWw6ICcgKyB2YWx1ZSlcblx0ICAgIH1cblx0ICB9XG5cdCAgdGhpcy5vcHRpb25XYXRjaGVyID0gbmV3IFdhdGNoZXIoXG5cdCAgICB0aGlzLnZtLFxuXHQgICAgZXhwcmVzc2lvbixcblx0ICAgIG9wdGlvblVwZGF0ZVdhdGNoZXJcblx0ICApXG5cdCAgLy8gdXBkYXRlIHdpdGggaW5pdGlhbCB2YWx1ZVxuXHQgIG9wdGlvblVwZGF0ZVdhdGNoZXIodGhpcy5vcHRpb25XYXRjaGVyLnZhbHVlKVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIHVwIG9wdGlvbiBlbGVtZW50cy4gSUU5IGRvZXNuJ3QgY3JlYXRlIG9wdGlvbnNcblx0ICogd2hlbiBzZXR0aW5nIGlubmVySFRNTCBvbiA8c2VsZWN0PiBlbGVtZW50cywgc28gd2UgaGF2ZVxuXHQgKiB0byB1c2UgRE9NIEFQSSBoZXJlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IHBhcmVudCAtIGEgPHNlbGVjdD4gb3IgYW4gPG9wdGdyb3VwPlxuXHQgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGJ1aWxkT3B0aW9ucyAocGFyZW50LCBvcHRpb25zKSB7XG5cdCAgdmFyIG9wLCBlbFxuXHQgIGZvciAodmFyIGkgPSAwLCBsID0gb3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgIG9wID0gb3B0aW9uc1tpXVxuXHQgICAgaWYgKCFvcC5vcHRpb25zKSB7XG5cdCAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcblx0ICAgICAgaWYgKHR5cGVvZiBvcCA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICBlbC50ZXh0ID0gZWwudmFsdWUgPSBvcFxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIGVsLnRleHQgPSBvcC50ZXh0XG5cdCAgICAgICAgZWwudmFsdWUgPSBvcC52YWx1ZVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGdyb3VwJylcblx0ICAgICAgZWwubGFiZWwgPSBvcC5sYWJlbFxuXHQgICAgICBidWlsZE9wdGlvbnMoZWwsIG9wLm9wdGlvbnMpXG5cdCAgICB9XG5cdCAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIHRoZSBpbml0aWFsIHZhbHVlIGZvciBzZWxlY3RlZCBvcHRpb25zLlxuXHQgKi9cblxuXHRmdW5jdGlvbiBjaGVja0luaXRpYWxWYWx1ZSAoKSB7XG5cdCAgdmFyIGluaXRWYWx1ZVxuXHQgIHZhciBvcHRpb25zID0gdGhpcy5lbC5vcHRpb25zXG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSBvcHRpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgaWYgKG9wdGlvbnNbaV0uaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpKSB7XG5cdCAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG5cdCAgICAgICAgKGluaXRWYWx1ZSB8fCAoaW5pdFZhbHVlID0gW10pKVxuXHQgICAgICAgICAgLnB1c2gob3B0aW9uc1tpXS52YWx1ZSlcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBpbml0VmFsdWUgPSBvcHRpb25zW2ldLnZhbHVlXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cdCAgaWYgKGluaXRWYWx1ZSkge1xuXHQgICAgdGhpcy5faW5pdFZhbHVlID0gaW5pdFZhbHVlXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlciB0byBleHRyYWN0IGEgdmFsdWUgYXJyYXkgZm9yIHNlbGVjdFttdWx0aXBsZV1cblx0ICpcblx0ICogQHBhcmFtIHtTZWxlY3RFbGVtZW50fSBlbFxuXHQgKiBAcmV0dXJuIHtBcnJheX1cblx0ICovXG5cblx0ZnVuY3Rpb24gZ2V0TXVsdGlWYWx1ZSAoZWwpIHtcblx0ICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlclxuXHQgICAgLmNhbGwoZWwub3B0aW9ucywgZmlsdGVyU2VsZWN0ZWQpXG5cdCAgICAubWFwKGdldE9wdGlvblZhbHVlKVxuXHR9XG5cblx0ZnVuY3Rpb24gZmlsdGVyU2VsZWN0ZWQgKG9wKSB7XG5cdCAgcmV0dXJuIG9wLnNlbGVjdGVkXG5cdH1cblxuXHRmdW5jdGlvbiBnZXRPcHRpb25WYWx1ZSAob3ApIHtcblx0ICByZXR1cm4gb3AudmFsdWUgfHwgb3AudGV4dFxuXHR9XG5cblx0LyoqXG5cdCAqIE5hdGl2ZSBBcnJheS5pbmRleE9mIHVzZXMgc3RyaWN0IGVxdWFsLCBidXQgaW4gdGhpc1xuXHQgKiBjYXNlIHdlIG5lZWQgdG8gbWF0Y2ggc3RyaW5nL251bWJlcnMgd2l0aCBzb2Z0IGVxdWFsLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5fSBhcnJcblx0ICogQHBhcmFtIHsqfSB2YWxcblx0ICovXG5cblx0ZnVuY3Rpb24gaW5kZXhPZiAoYXJyLCB2YWwpIHtcblx0ICAvKiBqc2hpbnQgZXFlcWVxOiBmYWxzZSAqL1xuXHQgIHZhciBpID0gYXJyLmxlbmd0aFxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIGlmIChhcnJbaV0gPT0gdmFsKSByZXR1cm4gaVxuXHQgIH1cblx0ICByZXR1cm4gLTFcblx0fVxuXG4vKioqLyB9LFxuLyogNTggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIHNlbGYgPSB0aGlzXG5cdCAgICB2YXIgZWwgPSB0aGlzLmVsXG5cdCAgICB0aGlzLmxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICBzZWxmLnNldChlbC5jaGVja2VkLCB0cnVlKVxuXHQgICAgfVxuXHQgICAgXy5vbihlbCwgJ2NoYW5nZScsIHRoaXMubGlzdGVuZXIpXG5cdCAgICBpZiAoZWwuY2hlY2tlZCkge1xuXHQgICAgICB0aGlzLl9pbml0VmFsdWUgPSBlbC5jaGVja2VkXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICB0aGlzLmVsLmNoZWNrZWQgPSAhIXZhbHVlXG5cdCAgfSxcblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgXy5vZmYodGhpcy5lbCwgJ2NoYW5nZScsIHRoaXMubGlzdGVuZXIpXG5cdCAgfVxuXG5cdH1cblxuLyoqKi8gfSxcbi8qIDU5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGVcblx0dmFyIGFycmF5TWV0aG9kcyA9IE9iamVjdC5jcmVhdGUoYXJyYXlQcm90bylcblxuXHQvKipcblx0ICogSW50ZXJjZXB0IG11dGF0aW5nIG1ldGhvZHMgYW5kIGVtaXQgZXZlbnRzXG5cdCAqL1xuXG5cdDtbXG5cdCAgJ3B1c2gnLFxuXHQgICdwb3AnLFxuXHQgICdzaGlmdCcsXG5cdCAgJ3Vuc2hpZnQnLFxuXHQgICdzcGxpY2UnLFxuXHQgICdzb3J0Jyxcblx0ICAncmV2ZXJzZSdcblx0XVxuXHQuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG5cdCAgLy8gY2FjaGUgb3JpZ2luYWwgbWV0aG9kXG5cdCAgdmFyIG9yaWdpbmFsID0gYXJyYXlQcm90b1ttZXRob2RdXG5cdCAgXy5kZWZpbmUoYXJyYXlNZXRob2RzLCBtZXRob2QsIGZ1bmN0aW9uIG11dGF0b3IgKCkge1xuXHQgICAgLy8gYXZvaWQgbGVha2luZyBhcmd1bWVudHM6XG5cdCAgICAvLyBodHRwOi8vanNwZXJmLmNvbS9jbG9zdXJlLXdpdGgtYXJndW1lbnRzXG5cdCAgICB2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGhcblx0ICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGkpXG5cdCAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV1cblx0ICAgIH1cblx0ICAgIHZhciByZXN1bHQgPSBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKVxuXHQgICAgdmFyIG9iID0gdGhpcy5fX29iX19cblx0ICAgIHZhciBpbnNlcnRlZFxuXHQgICAgc3dpdGNoIChtZXRob2QpIHtcblx0ICAgICAgY2FzZSAncHVzaCc6XG5cdCAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzXG5cdCAgICAgICAgYnJlYWtcblx0ICAgICAgY2FzZSAndW5zaGlmdCc6XG5cdCAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzXG5cdCAgICAgICAgYnJlYWtcblx0ICAgICAgY2FzZSAnc3BsaWNlJzpcblx0ICAgICAgICBpbnNlcnRlZCA9IGFyZ3Muc2xpY2UoMilcblx0ICAgICAgICBicmVha1xuXHQgICAgfVxuXHQgICAgaWYgKGluc2VydGVkKSBvYi5vYnNlcnZlQXJyYXkoaW5zZXJ0ZWQpXG5cdCAgICAvLyBub3RpZnkgY2hhbmdlXG5cdCAgICBvYi5ub3RpZnkoKVxuXHQgICAgcmV0dXJuIHJlc3VsdFxuXHQgIH0pXG5cdH0pXG5cblx0LyoqXG5cdCAqIFN3YXAgdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IHdpdGggYSBuZXcgdmFsdWVcblx0ICogYW5kIGVtaXRzIGNvcnJlc3BvbmRpbmcgZXZlbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuXHQgKiBAcGFyYW0geyp9IHZhbFxuXHQgKiBAcmV0dXJuIHsqfSAtIHJlcGxhY2VkIGVsZW1lbnRcblx0ICovXG5cblx0Xy5kZWZpbmUoXG5cdCAgYXJyYXlQcm90byxcblx0ICAnJHNldCcsXG5cdCAgZnVuY3Rpb24gJHNldCAoaW5kZXgsIHZhbCkge1xuXHQgICAgaWYgKGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XG5cdCAgICAgIHRoaXMubGVuZ3RoID0gaW5kZXggKyAxXG5cdCAgICB9XG5cdCAgICByZXR1cm4gdGhpcy5zcGxpY2UoaW5kZXgsIDEsIHZhbClbMF1cblx0ICB9XG5cdClcblxuXHQvKipcblx0ICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHJlbW92ZSB0aGUgZWxlbWVudCBhdCBnaXZlbiBpbmRleC5cblx0ICpcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG5cdCAqIEBwYXJhbSB7Kn0gdmFsXG5cdCAqL1xuXG5cdF8uZGVmaW5lKFxuXHQgIGFycmF5UHJvdG8sXG5cdCAgJyRyZW1vdmUnLFxuXHQgIGZ1bmN0aW9uICRyZW1vdmUgKGluZGV4KSB7XG5cdCAgICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykge1xuXHQgICAgICBpbmRleCA9IHRoaXMuaW5kZXhPZihpbmRleClcblx0ICAgIH1cblx0ICAgIGlmIChpbmRleCA+IC0xKSB7XG5cdCAgICAgIHJldHVybiB0aGlzLnNwbGljZShpbmRleCwgMSlbMF1cblx0ICAgIH1cblx0ICB9XG5cdClcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGFycmF5TWV0aG9kc1xuXG4vKioqLyB9LFxuLyogNjAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgb2JqUHJvdG8gPSBPYmplY3QucHJvdG90eXBlXG5cblx0LyoqXG5cdCAqIEFkZCBhIG5ldyBwcm9wZXJ0eSB0byBhbiBvYnNlcnZlZCBvYmplY3Rcblx0ICogYW5kIGVtaXRzIGNvcnJlc3BvbmRpbmcgZXZlbnRcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleVxuXHQgKiBAcGFyYW0geyp9IHZhbFxuXHQgKiBAcHVibGljXG5cdCAqL1xuXG5cdF8uZGVmaW5lKFxuXHQgIG9ialByb3RvLFxuXHQgICckYWRkJyxcblx0ICBmdW5jdGlvbiAkYWRkIChrZXksIHZhbCkge1xuXHQgICAgdmFyIG9iID0gdGhpcy5fX29iX19cblx0ICAgIGlmICghb2IpIHtcblx0ICAgICAgdGhpc1trZXldID0gdmFsXG5cdCAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgICAgaWYgKF8uaXNSZXNlcnZlZChrZXkpKSB7XG5cdCAgICAgIF8ud2FybignUmVmdXNlZCB0byAkYWRkIHJlc2VydmVkIGtleTogJyArIGtleSlcblx0ICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSByZXR1cm5cblx0ICAgIG9iLmNvbnZlcnQoa2V5LCB2YWwpXG5cdCAgICBpZiAob2Iudm1zKSB7XG5cdCAgICAgIHZhciBpID0gb2Iudm1zLmxlbmd0aFxuXHQgICAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgICAgdmFyIHZtID0gb2Iudm1zW2ldXG5cdCAgICAgICAgdm0uX3Byb3h5KGtleSlcblx0ICAgICAgICB2bS5fZGlnZXN0KClcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgb2Iubm90aWZ5KClcblx0ICAgIH1cblx0ICB9XG5cdClcblxuXHQvKipcblx0ICogRGVsZXRlcyBhIHByb3BlcnR5IGZyb20gYW4gb2JzZXJ2ZWQgb2JqZWN0XG5cdCAqIGFuZCBlbWl0cyBjb3JyZXNwb25kaW5nIGV2ZW50XG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHRfLmRlZmluZShcblx0ICBvYmpQcm90byxcblx0ICAnJGRlbGV0ZScsXG5cdCAgZnVuY3Rpb24gJGRlbGV0ZSAoa2V5KSB7XG5cdCAgICB2YXIgb2IgPSB0aGlzLl9fb2JfX1xuXHQgICAgaWYgKCFvYikge1xuXHQgICAgICBkZWxldGUgdGhpc1trZXldXG5cdCAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgICAgaWYgKF8uaXNSZXNlcnZlZChrZXkpKSB7XG5cdCAgICAgIF8ud2FybignUmVmdXNlZCB0byAkYWRkIHJlc2VydmVkIGtleTogJyArIGtleSlcblx0ICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkgcmV0dXJuXG5cdCAgICBkZWxldGUgdGhpc1trZXldXG5cdCAgICBpZiAob2Iudm1zKSB7XG5cdCAgICAgIHZhciBpID0gb2Iudm1zLmxlbmd0aFxuXHQgICAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgICAgdmFyIHZtID0gb2Iudm1zW2ldXG5cdCAgICAgICAgdm0uX3VucHJveHkoa2V5KVxuXHQgICAgICAgIHZtLl9kaWdlc3QoKVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBvYi5ub3RpZnkoKVxuXHQgICAgfVxuXHQgIH1cblx0KVxuXG4vKioqLyB9XG4vKioqKioqLyBdKVxufSk7XG4iLCIvKipcbiAqIEZhY2Vib29rIGxvZ2luIG9uIGhlYWRlclxuICovXG4oZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgVnVlID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vLi4vLi4vYm93ZXJfY29tcG9uZW50cy92dWUvZGlzdC92dWUuanNcIik7XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IFZ1ZS5leHRlbmQoe1xuXG4gICAgICAgIHRlbXBsYXRlOiBcIiNsdW5jaC1sb2dpbi10bXBsXCIsXG5cbiAgICAgICAgZGF0YTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmJQYXJhbToge1xuICAgICAgICAgICAgICAgICAgICBhcHBJZCAgICAgIDogJzE0Mzc0ODEwMzMxNzY2OTQnLFxuICAgICAgICAgICAgICAgICAgICB4ZmJtbCAgICAgIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiAgICA6ICd2Mi4xJ1xuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIGluaXRpYWxpemVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsb2dnZWRJbjogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLiRvbihcImZiUmVhZHlcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBGQi5pbml0KHRoaXMuZmJQYXJhbSk7XG4gICAgICAgICAgICAgICAgRkIuZ2V0TG9naW5TdGF0dXMoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGF0dXNDaGFuZ2VDYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgbG9naW46IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIEZCLmxvZ2luKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGF0dXNDaGFuZ2VDYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSwge3Njb3BlOiAncHVibGljX3Byb2ZpbGUsdXNlcl9mcmllbmRzJ30pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgbG9nb3V0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICBGQi5sb2dvdXQoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGF0dXNDaGFuZ2VDYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdGF0dXNDaGFuZ2VDYWxsYmFjazogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAnY29ubmVjdGVkJyl7XG4gICAgICAgICAgICAgICAgICAgIEZCLmFwaSgnL21lJywgZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRwYXJlbnQubWUgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LiRwYXJlbnQuYWNjZXNzVG9rZW4gPSByZXNwb25zZS5hdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW47XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJHBhcmVudC5tZSA9IHtpZDogcmVzcG9uc2UuYXV0aFJlc3BvbnNlLnVzZXJJRH07XG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9nZ2VkSW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LiRkaXNwYXRjaChcImZiT25Mb2dpblwiLCByZXNwb25zZSk7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2dnZWRJbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LiRkaXNwYXRjaChcImZiT25Mb2dvdXRcIiwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSh3aW5kb3cpOyIsIi8qKlxuICogZ2V0dGluZyBzdGFydGVkXG4gKi9cbihmdW5jdGlvbihnbG9iYWwpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBcbiAgICB2YXIgVnVlID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vLi4vYm93ZXJfY29tcG9uZW50cy92dWUvZGlzdC92dWUuanNcIik7XG4gICAgdmFyIHZ1ZUZpbHRlcnMgPSByZXF1aXJlKFwiLi9maWx0ZXIvZmlsdGVyc1wiKTtcbiAgICB2YXIgbG9naW5Db21wb25lbnQgPSByZXF1aXJlKFwiLi9jb21wb25lbnQvbG9naW5cIik7XG5cbiAgICB2YXIgYXBwID0gbW9kdWxlLmV4cG9ydHMgPSBuZXcgVnVlKHtcblxuICAgICAgICBlbDogJyNhcHAnLFxuXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG1lOiBudWxsLFxuICAgICAgICAgICAgYWNjZXNzVG9rZW46IG51bGwsXG4gICAgICAgICAgICBtYWluUGFuZWw6IFwiXCJcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICBcImx1bmNoLWxvZ2luXCI6IGxvZ2luQ29tcG9uZW50XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLiRvbihcImZiT25Mb2dpblwiLCBmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRvbihcImZiT25Mb2dvdXRcIiwgZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZ2xvYmFsLmZiQXN5bmNJbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGFwcC4kYnJvYWRjYXN0KFwiZmJSZWFkeVwiKTtcbiAgICB9O1xufSkod2luZG93KTsiLCIvKipcbiAqIEZpbHRlcnNcbiAqL1xuKGZ1bmN0aW9uKGdsb2JhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIFZ1ZSA9IHJlcXVpcmUoXCIuLy4uLy4uLy4uLy4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvdnVlL2Rpc3QvdnVlLmpzXCIpO1xuXG4gICAgVnVlLmZpbHRlcignZmJVc2VySW1hZ2VGaWx0ZXInLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIFwiaHR0cDovL2dyYXBoLmZhY2Vib29rLmNvbS9cIiArIGlkICsgXCIvcGljdHVyZT90eXBlPXNxdWFyZVwiO1xuICAgIH0pO1xuXG59KSh3aW5kb3cpOyJdfQ==
