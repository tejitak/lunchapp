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

	var lang   = __webpack_require__(34)
	var extend = lang.extend

	extend(exports, lang)
	extend(exports, __webpack_require__(35))
	extend(exports, __webpack_require__(36))
	extend(exports, __webpack_require__(37))
	extend(exports, __webpack_require__(38))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var mergeOptions = __webpack_require__(14)

	/**
	 * Expose useful internals
	 */

	exports.util       = _
	exports.nextTick   = _.nextTick
	exports.config     = __webpack_require__(15)

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
	    'return function ' + _.camelize(name) +
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
	var Watcher = __webpack_require__(16)
	var textParser = __webpack_require__(39)
	var dirParser = __webpack_require__(40)
	var expParser = __webpack_require__(41)
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
	 * @param {String} [key]
	 */

	exports.$log = function (key) {
	  var data = this[key || '_data']
	  console.log(JSON.parse(JSON.stringify(data)))
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var transition = __webpack_require__(42)

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
	      var className = BaseCtor.name || 'VueComponent'
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
	var compile = __webpack_require__(43)

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
	  if (this._isDestroyed) {
	    return
	  }
	  this._callHook('beforeDestroy')
	  this._isBeingDestroyed = true
	  // remove DOM element
	  if (remove && this.$el) {
	    this.$remove()
	  }
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
	  // clean up
	  if (this.$el) {
	    this.$el.__vue__ = null
	  }
	  // remove reference from data ob
	  this._data.__ob__.removeVm(this)
	  this._data =
	  this._watchers =
	  this._userWatchers =
	  this._watcherList =
	  this.$el =
	  this.$parent =
	  this.$root =
	  this._children =
	  this._bindings =
	  this._directives = null
	  // call the last hook...
	  this._isDestroyed = true
	  this._callHook('destroyed')
	  // turn off all instance listeners.
	  this.$off()
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
	exports.text       = __webpack_require__(17)
	exports.html       = __webpack_require__(18)
	exports.attr       = __webpack_require__(19)
	exports.show       = __webpack_require__(20)
	exports['class']   = __webpack_require__(21)
	exports.el         = __webpack_require__(22)
	exports.ref        = __webpack_require__(23)
	exports.cloak      = __webpack_require__(24)
	exports.style      = __webpack_require__(25)
	exports.partial    = __webpack_require__(26)
	exports.transition = __webpack_require__(27)

	// event listener directives
	exports.on         = __webpack_require__(28)
	exports.model      = __webpack_require__(44)

	// child vm directives
	exports.component  = __webpack_require__(29)
	exports.repeat     = __webpack_require__(30)
	exports['if']      = __webpack_require__(31)
	exports['with']    = __webpack_require__(32)

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
	  var s = Math.floor(value).toString(),
	    i = s.length % 3,
	    h = i > 0
	      ? (s.slice(0, i) + (s.length > 3 ? ',' : ''))
	      : '',
	    f = '.' + value.toFixed(2).slice(-2)
	  return sign + h + s.slice(i).replace(digitsRE, '$1,') + f
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

	_.extend(exports, __webpack_require__(33))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var mergeOptions = __webpack_require__(14)

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
	var Observer = __webpack_require__(48)
	var Binding = __webpack_require__(47)

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
	var Directive = __webpack_require__(45)
	var compile = __webpack_require__(43)
	var transclude = __webpack_require__(46)

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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var config = __webpack_require__(15)
	var Observer = __webpack_require__(48)
	var expParser = __webpack_require__(41)
	var Batcher = __webpack_require__(49)

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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var templateParser = __webpack_require__(50)

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
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var transition = __webpack_require__(42)

	module.exports = function (value) {
	  var el = this.el
	  transition.apply(el, value ? 1 : -1, function () {
	    el.style.display = value ? '' : 'none'
	  }, this.vm)
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var hasClassList =
	  typeof document !== 'undefined' &&
	  'classList' in document.documentElement

	/**
	 * add class for IE9
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	var addClass = hasClassList
	  ? function (el, cls) {
	      el.classList.add(cls)
	    }
	  : _.addClass

	/**
	 * remove class for IE9
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	var removeClass = hasClassList
	  ? function (el, cls) {
	      el.classList.remove(cls)
	    }
	  : _.removeClass

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
/* 22 */
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
/* 23 */
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
	    delete this.owner.$[this.expression]
	  }
	  
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(15)

	module.exports = {

	  bind: function () {
	    var el = this.el
	    this.vm.$once('hook:compiled', function () {
	      el.removeAttribute(config.prefix + 'cloak')
	    })
	  }

	}

/***/ },
/* 25 */
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var templateParser = __webpack_require__(50)
	var transition = __webpack_require__(42)

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
/* 27 */
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
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var templateParser = __webpack_require__(50)

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
	    if (!this.childVM) {
	      return
	    }
	    if (this.keepAlive) {
	      if (remove) {
	        this.childVM.$remove()
	      }
	    } else {
	      this.childVM.$destroy(remove)
	      if (this.parentDirs) {
	        var i = this.parentDirs.length
	        while (i--) {
	          this.parentDirs[i]._teardown()
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var isObject = _.isObject
	var textParser = __webpack_require__(39)
	var expParser = __webpack_require__(41)
	var templateParser = __webpack_require__(50)
	var compile = __webpack_require__(43)
	var transclude = __webpack_require__(46)
	var mergeOptions = __webpack_require__(14)
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var compile = __webpack_require__(43)
	var templateParser = __webpack_require__(50)
	var transition = __webpack_require__(42)

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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var Watcher = __webpack_require__(16)

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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var Path = __webpack_require__(51)

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
/* 34 */
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

	var camelRE = /(?:^|[-_])(\w)/g
	exports.camelize = function (str) {
	  return str.replace (camelRE, function (_, c) {
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
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(15)

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
	 * Compatibility add class for IE9
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	exports.addClass = function (el, cls) {
	  var cur = ' ' + el.className + ' '
	  if (cur.indexOf(' ' + cls + ' ') < 0) {
	    el.className = (cur + cls).trim()
	  }
	}

	/**
	 * Compatibility remove class for IE9
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	exports.removeClass = function (el, cls) {
	  var cur = ' ' + el.className + ' '
	  var tar = ' ' + cls + ' '
	  while (cur.indexOf(tar) >= 0) {
	    cur = cur.replace(tar, ' ')
	  }
	  el.className = cur.trim()
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(38)

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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(15)

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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(52)
	var config = __webpack_require__(15)
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
	    : formatToken(tokens[0], vm)
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	function formatToken (token, vm) {
	  return token.tag
	    ? vm && token.oneTime
	      ? '"' + vm.$get(token.value) + '"'
	      : '(' + token.value + ')'
	    : '"' + token.value + '"'
	}

/***/ },
/* 40 */
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var Path = __webpack_require__(51)
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
/* 42 */
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var config = __webpack_require__(15)
	var textParser = __webpack_require__(39)
	var dirParser = __webpack_require__(40)
	var templateParser = __webpack_require__(50)

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

	function makeParamsLinkFn (params, options) {
	  var def = options.directives['with']
	  return function paramsLinkFn (vm, el) {
	    var i = params.length
	    var param
	    while (i--) {
	      param = params[i]
	      if (param.dynamic) {
	        // dynamic param attribtues are bound as v-with.
	        // we can directly duck the descriptor here beacuse
	        // param attributes cannot use expressions or
	        // filters.
	        vm._bindDir('with', el, {
	          arg: param.name,
	          expression: param.value
	        }, def)
	      } else {
	        // just set once
	        vm.$set(param.name, param.value)
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)

	var handlers = {
	  text: __webpack_require__(55),
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
	    var el = this.el
	    var tag = el.tagName
	    var handler
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text
	    } else if (tag === 'SELECT') {
	      handler = handlers.select
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var config = __webpack_require__(15)
	var Watcher = __webpack_require__(16)
	var textParser = __webpack_require__(39)
	var expParser = __webpack_require__(41)

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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var templateParser = __webpack_require__(50)

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
	  var outlet, select, j, main
	  // first pass, collect corresponding content
	  // for each outlet.
	  while (i--) {
	    outlet = outlets[i]
	    if (rawContent) {
	      select = outlet.getAttribute('select')
	      if (select) {  // select content
	        outlet.content = _.toArray(
	          rawContent.querySelectorAll(select)
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
/* 47 */
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
	  var i = this.subs.length
	  while (i--) {
	    this.subs[i].update()
	  }
	}

	module.exports = Binding

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1)
	var config = __webpack_require__(15)
	var Binding = __webpack_require__(47)
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
	        oldBindings.splice(oldBindings.indexOf(binding))
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
/* 49 */
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
	 * Jobs with duplicate IDs will be skipped, however we can
	 * use the `override` option to override existing jobs.
	 *
	 * @param {Object} job
	 *   properties:
	 *   - {String|Number} id
	 *   - {Boolean}       override
	 *   - {Function}      run
	 */

	p.push = function (job) {
	  if (!job.id || !this.has[job.id]) {
	    this.queue.push(job)
	    this.has[job.id] = job
	    if (!this.waiting) {
	      this.waiting = true
	      _.nextTick(this.flush, this)
	    }
	  } else if (job.override) {
	    var oldJob = this.has[job.id]
	    oldJob.cancelled = true
	    this.queue.push(job)
	    this.has[job.id] = job
	  }
	}

	/**
	 * Flush the queue and run the jobs.
	 * Will call a preFlush hook if has one.
	 */

	p.flush = function () {
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
	}

	module.exports = Batcher

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(52)
	var templateCache = new Cache(100)

	/**
	 * Test for the presence of the Safari template cloning bug
	 * https://bugs.webkit.org/show_bug.cgi?id=137755
	 */

	var hasBrokenTemplate = (function () {
	  var a = document.createElement('div')
	  a.innerHTML = '<template>1</template>'
	  return !a.cloneNode(true).firstChild.innerHTML
	})()

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
/* 51 */
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
	  var classList = el.classList
	  var data = el.__v_trans
	  var cls = job.cls
	  var cb = job.cb
	  var op = job.op
	  var transitionType = getTransitionType(el, data, cls)

	  if (job.dir > 0) { // ENTER
	    if (transitionType === 1) {
	      // trigger transition by removing enter class
	      classList.remove(cls)
	      // only need to listen for transitionend if there's
	      // a user callback
	      if (cb) setupTransitionCb(_.transitionEndEvent)
	    } else if (transitionType === 2) {
	      // animations are triggered when class is added
	      // so we just listen for animationend to remove it.
	      setupTransitionCb(_.animationEndEvent, function () {
	        classList.remove(cls)
	      })
	    } else {
	      // no transition applicable
	      classList.remove(cls)
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
	        classList.remove(cls)
	      })
	    } else {
	      op()
	      classList.remove(cls)
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
	  var classList = el.classList
	  var prefix = data.id || 'v'
	  var enterClass = prefix + '-enter'
	  var leaveClass = prefix + '-leave'
	  // clean up potential previous unfinished transition
	  if (data.callback) {
	    _.off(el, data.event, data.callback)
	    classList.remove(enterClass)
	    classList.remove(leaveClass)
	    data.event = data.callback = null
	  }
	  if (direction > 0) { // enter
	    classList.add(enterClass)
	    op()
	    push(el, direction, null, enterClass, cb)
	  } else { // leave
	    classList.add(leaveClass)
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
	 * @param {Function} [cb]
	 */

	module.exports = function (el, direction, op, data, def, cb) {
	  if (data.cancel) {
	    data.cancel()
	    data.cancel = null
	  }
	  if (direction > 0) { // enter
	    if (def.beforeEnter) {
	      def.beforeEnter(el)
	    }
	    op()
	    if (def.enter) {
	      data.cancel = def.enter(el, function () {
	        data.cancel = null
	        if (cb) cb()
	      })
	    } else if (cb) {
	      cb()
	    }
	  } else { // leave
	    if (def.leave) {
	      data.cancel = def.leave(el, function () {
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
	      this._initValue = el.value
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
	var Watcher = __webpack_require__(16)

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90ZWppdGFrL2Rldi9ob2JieS9sdW5jaGFwcC9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdGVqaXRhay9kZXYvaG9iYnkvbHVuY2hhcHAvYm93ZXJfY29tcG9uZW50cy92dWUvZGlzdC92dWUuanMiLCIvVXNlcnMvdGVqaXRhay9kZXYvaG9iYnkvbHVuY2hhcHAvcHVibGljL2pzL3RlamkvbHVuY2gvY29tcG9uZW50L2xvZ2luLmpzIiwiL1VzZXJzL3Rlaml0YWsvZGV2L2hvYmJ5L2x1bmNoYXBwL3B1YmxpYy9qcy90ZWppL2x1bmNoL2Zha2VfODg4NDJlNWEuanMiLCIvVXNlcnMvdGVqaXRhay9kZXYvaG9iYnkvbHVuY2hhcHAvcHVibGljL2pzL3RlamkvbHVuY2gvZmlsdGVyL2ZpbHRlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxMk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIFZ1ZS5qcyB2MC4xMS4wXG4gKiAoYykgMjAxNCBFdmFuIFlvdVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiVnVlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlZ1ZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBleHRlbmQgPSBfLmV4dGVuZFxuXG5cdC8qKlxuXHQgKiBUaGUgZXhwb3NlZCBWdWUgY29uc3RydWN0b3IuXG5cdCAqXG5cdCAqIEFQSSBjb252ZW50aW9uczpcblx0ICogLSBwdWJsaWMgQVBJIG1ldGhvZHMvcHJvcGVydGllcyBhcmUgcHJlZmlleGVkIHdpdGggYCRgXG5cdCAqIC0gaW50ZXJuYWwgbWV0aG9kcy9wcm9wZXJ0aWVzIGFyZSBwcmVmaXhlZCB3aXRoIGBfYFxuXHQgKiAtIG5vbi1wcmVmaXhlZCBwcm9wZXJ0aWVzIGFyZSBhc3N1bWVkIHRvIGJlIHByb3hpZWQgdXNlclxuXHQgKiAgIGRhdGEuXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cblx0ZnVuY3Rpb24gVnVlIChvcHRpb25zKSB7XG5cdCAgdGhpcy5faW5pdChvcHRpb25zKVxuXHR9XG5cblx0LyoqXG5cdCAqIE1peGluIGdsb2JhbCBBUElcblx0ICovXG5cblx0ZXh0ZW5kKFZ1ZSwgX193ZWJwYWNrX3JlcXVpcmVfXygyKSlcblxuXHQvKipcblx0ICogVnVlIGFuZCBldmVyeSBjb25zdHJ1Y3RvciB0aGF0IGV4dGVuZHMgVnVlIGhhcyBhblxuXHQgKiBhc3NvY2lhdGVkIG9wdGlvbnMgb2JqZWN0LCB3aGljaCBjYW4gYmUgYWNjZXNzZWQgZHVyaW5nXG5cdCAqIGNvbXBpbGF0aW9uIHN0ZXBzIGFzIGB0aGlzLmNvbnN0cnVjdG9yLm9wdGlvbnNgLlxuXHQgKlxuXHQgKiBUaGVzZSBjYW4gYmUgc2VlbiBhcyB0aGUgZGVmYXVsdCBvcHRpb25zIG9mIGV2ZXJ5XG5cdCAqIFZ1ZSBpbnN0YW5jZS5cblx0ICovXG5cblx0VnVlLm9wdGlvbnMgPSB7XG5cdCAgZGlyZWN0aXZlcyAgOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLFxuXHQgIGZpbHRlcnMgICAgIDogX193ZWJwYWNrX3JlcXVpcmVfXyg5KSxcblx0ICBwYXJ0aWFscyAgICA6IHt9LFxuXHQgIHRyYW5zaXRpb25zIDoge30sXG5cdCAgY29tcG9uZW50cyAgOiB7fVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIHVwIHRoZSBwcm90b3R5cGVcblx0ICovXG5cblx0dmFyIHAgPSBWdWUucHJvdG90eXBlXG5cblx0LyoqXG5cdCAqICRkYXRhIGhhcyBhIHNldHRlciB3aGljaCBkb2VzIGEgYnVuY2ggb2Zcblx0ICogdGVhcmRvd24vc2V0dXAgd29ya1xuXHQgKi9cblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkocCwgJyRkYXRhJywge1xuXHQgIGdldDogZnVuY3Rpb24gKCkge1xuXHQgICAgcmV0dXJuIHRoaXMuX2RhdGFcblx0ICB9LFxuXHQgIHNldDogZnVuY3Rpb24gKG5ld0RhdGEpIHtcblx0ICAgIHRoaXMuX3NldERhdGEobmV3RGF0YSlcblx0ICB9XG5cdH0pXG5cblx0LyoqXG5cdCAqIE1peGluIGludGVybmFsIGluc3RhbmNlIG1ldGhvZHNcblx0ICovXG5cblx0ZXh0ZW5kKHAsIF9fd2VicGFja19yZXF1aXJlX18oMTApKVxuXHRleHRlbmQocCwgX193ZWJwYWNrX3JlcXVpcmVfXygxMSkpXG5cdGV4dGVuZChwLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKSlcblx0ZXh0ZW5kKHAsIF9fd2VicGFja19yZXF1aXJlX18oMTMpKVxuXG5cdC8qKlxuXHQgKiBNaXhpbiBwdWJsaWMgQVBJIG1ldGhvZHNcblx0ICovXG5cblx0ZXh0ZW5kKHAsIF9fd2VicGFja19yZXF1aXJlX18oMykpXG5cdGV4dGVuZChwLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpKVxuXHRleHRlbmQocCwgX193ZWJwYWNrX3JlcXVpcmVfXyg1KSlcblx0ZXh0ZW5kKHAsIF9fd2VicGFja19yZXF1aXJlX18oNikpXG5cdGV4dGVuZChwLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpKVxuXG5cdG1vZHVsZS5leHBvcnRzID0gXy5WdWUgPSBWdWVcblxuLyoqKi8gfSxcbi8qIDEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBsYW5nICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KVxuXHR2YXIgZXh0ZW5kID0gbGFuZy5leHRlbmRcblxuXHRleHRlbmQoZXhwb3J0cywgbGFuZylcblx0ZXh0ZW5kKGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18oMzUpKVxuXHRleHRlbmQoZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXygzNikpXG5cdGV4dGVuZChleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KSlcblx0ZXh0ZW5kKGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18oMzgpKVxuXG4vKioqLyB9LFxuLyogMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBtZXJnZU9wdGlvbnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KVxuXG5cdC8qKlxuXHQgKiBFeHBvc2UgdXNlZnVsIGludGVybmFsc1xuXHQgKi9cblxuXHRleHBvcnRzLnV0aWwgICAgICAgPSBfXG5cdGV4cG9ydHMubmV4dFRpY2sgICA9IF8ubmV4dFRpY2tcblx0ZXhwb3J0cy5jb25maWcgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSlcblxuXHQvKipcblx0ICogRWFjaCBpbnN0YW5jZSBjb25zdHJ1Y3RvciwgaW5jbHVkaW5nIFZ1ZSwgaGFzIGEgdW5pcXVlXG5cdCAqIGNpZC4gVGhpcyBlbmFibGVzIHVzIHRvIGNyZWF0ZSB3cmFwcGVkIFwiY2hpbGRcblx0ICogY29uc3RydWN0b3JzXCIgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UgYW5kIGNhY2hlIHRoZW0uXG5cdCAqL1xuXG5cdGV4cG9ydHMuY2lkID0gMFxuXHR2YXIgY2lkID0gMVxuXG5cdC8qKlxuXHQgKiBDbGFzcyBpbmVocml0YW5jZVxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5kT3B0aW9uc1xuXHQgKi9cblxuXHRleHBvcnRzLmV4dGVuZCA9IGZ1bmN0aW9uIChleHRlbmRPcHRpb25zKSB7XG5cdCAgZXh0ZW5kT3B0aW9ucyA9IGV4dGVuZE9wdGlvbnMgfHwge31cblx0ICB2YXIgU3VwZXIgPSB0aGlzXG5cdCAgdmFyIFN1YiA9IGNyZWF0ZUNsYXNzKGV4dGVuZE9wdGlvbnMubmFtZSB8fCAnVnVlQ29tcG9uZW50Jylcblx0ICBTdWIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlci5wcm90b3R5cGUpXG5cdCAgU3ViLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN1YlxuXHQgIFN1Yi5jaWQgPSBjaWQrK1xuXHQgIFN1Yi5vcHRpb25zID0gbWVyZ2VPcHRpb25zKFxuXHQgICAgU3VwZXIub3B0aW9ucyxcblx0ICAgIGV4dGVuZE9wdGlvbnNcblx0ICApXG5cdCAgU3ViWydzdXBlciddID0gU3VwZXJcblx0ICAvLyBhbGxvdyBmdXJ0aGVyIGV4dGVuc2lvblxuXHQgIFN1Yi5leHRlbmQgPSBTdXBlci5leHRlbmRcblx0ICAvLyBjcmVhdGUgYXNzZXQgcmVnaXN0ZXJzLCBzbyBleHRlbmRlZCBjbGFzc2VzXG5cdCAgLy8gY2FuIGhhdmUgdGhlaXIgcHJpdmF0ZSBhc3NldHMgdG9vLlxuXHQgIGNyZWF0ZUFzc2V0UmVnaXN0ZXJzKFN1Yilcblx0ICByZXR1cm4gU3ViXG5cdH1cblxuXHQvKipcblx0ICogQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBzdWItY2xhc3MgY29uc3RydWN0b3Igd2l0aCB0aGVcblx0ICogZ2l2ZW4gbmFtZS4gVGhpcyBnaXZlcyB1cyBtdWNoIG5pY2VyIG91dHB1dCB3aGVuXG5cdCAqIGxvZ2dpbmcgaW5zdGFuY2VzIGluIHRoZSBjb25zb2xlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn1cblx0ICovXG5cblx0ZnVuY3Rpb24gY3JlYXRlQ2xhc3MgKG5hbWUpIHtcblx0ICByZXR1cm4gbmV3IEZ1bmN0aW9uKFxuXHQgICAgJ3JldHVybiBmdW5jdGlvbiAnICsgXy5jYW1lbGl6ZShuYW1lKSArXG5cdCAgICAnIChvcHRpb25zKSB7IHRoaXMuX2luaXQob3B0aW9ucykgfSdcblx0ICApKClcblx0fVxuXG5cdC8qKlxuXHQgKiBQbHVnaW4gc3lzdGVtXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW5cblx0ICovXG5cblx0ZXhwb3J0cy51c2UgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG5cdCAgLy8gYWRkaXRpb25hbCBwYXJhbWV0ZXJzXG5cdCAgdmFyIGFyZ3MgPSBfLnRvQXJyYXkoYXJndW1lbnRzLCAxKVxuXHQgIGFyZ3MudW5zaGlmdCh0aGlzKVxuXHQgIGlmICh0eXBlb2YgcGx1Z2luLmluc3RhbGwgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgIHBsdWdpbi5pbnN0YWxsLmFwcGx5KHBsdWdpbiwgYXJncylcblx0ICB9IGVsc2Uge1xuXHQgICAgcGx1Z2luLmFwcGx5KG51bGwsIGFyZ3MpXG5cdCAgfVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lIGFzc2V0IHJlZ2lzdHJhdGlvbiBtZXRob2RzIG9uIGEgY29uc3RydWN0b3IuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IENvbnN0cnVjdG9yXG5cdCAqL1xuXG5cdHZhciBhc3NldFR5cGVzID0gW1xuXHQgICdkaXJlY3RpdmUnLFxuXHQgICdmaWx0ZXInLFxuXHQgICdwYXJ0aWFsJyxcblx0ICAndHJhbnNpdGlvbidcblx0XVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZUFzc2V0UmVnaXN0ZXJzIChDb25zdHJ1Y3Rvcikge1xuXG5cdCAgLyogQXNzZXQgcmVnaXN0cmF0aW9uIG1ldGhvZHMgc2hhcmUgdGhlIHNhbWUgc2lnbmF0dXJlOlxuXHQgICAqXG5cdCAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG5cdCAgICogQHBhcmFtIHsqfSBkZWZpbml0aW9uXG5cdCAgICovXG5cblx0ICBhc3NldFR5cGVzLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcblx0ICAgIENvbnN0cnVjdG9yW3R5cGVdID0gZnVuY3Rpb24gKGlkLCBkZWZpbml0aW9uKSB7XG5cdCAgICAgIGlmICghZGVmaW5pdGlvbikge1xuXHQgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbdHlwZSArICdzJ11baWRdXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5vcHRpb25zW3R5cGUgKyAncyddW2lkXSA9IGRlZmluaXRpb25cblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0pXG5cblx0ICAvKipcblx0ICAgKiBDb21wb25lbnQgcmVnaXN0cmF0aW9uIG5lZWRzIHRvIGF1dG9tYXRpY2FsbHkgaW52b2tlXG5cdCAgICogVnVlLmV4dGVuZCBvbiBvYmplY3QgdmFsdWVzLlxuXHQgICAqXG5cdCAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG5cdCAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IGRlZmluaXRpb25cblx0ICAgKi9cblxuXHQgIENvbnN0cnVjdG9yLmNvbXBvbmVudCA9IGZ1bmN0aW9uIChpZCwgZGVmaW5pdGlvbikge1xuXHQgICAgaWYgKCFkZWZpbml0aW9uKSB7XG5cdCAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY29tcG9uZW50c1tpZF1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZGVmaW5pdGlvbikpIHtcblx0ICAgICAgICBkZWZpbml0aW9uLm5hbWUgPSBpZFxuXHQgICAgICAgIGRlZmluaXRpb24gPSBfLlZ1ZS5leHRlbmQoZGVmaW5pdGlvbilcblx0ICAgICAgfVxuXHQgICAgICB0aGlzLm9wdGlvbnMuY29tcG9uZW50c1tpZF0gPSBkZWZpbml0aW9uXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0Y3JlYXRlQXNzZXRSZWdpc3RlcnMoZXhwb3J0cylcblxuLyoqKi8gfSxcbi8qIDMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgV2F0Y2hlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpXG5cdHZhciB0ZXh0UGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOSlcblx0dmFyIGRpclBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNDApXG5cdHZhciBleHBQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQxKVxuXHR2YXIgZmlsdGVyUkUgPSAvW158XVxcfFtefF0vXG5cblx0LyoqXG5cdCAqIEdldCB0aGUgdmFsdWUgZnJvbSBhbiBleHByZXNzaW9uIG9uIHRoaXMgdm0uXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBleHBcblx0ICogQHJldHVybiB7Kn1cblx0ICovXG5cblx0ZXhwb3J0cy4kZ2V0ID0gZnVuY3Rpb24gKGV4cCkge1xuXHQgIHZhciByZXMgPSBleHBQYXJzZXIucGFyc2UoZXhwKVxuXHQgIGlmIChyZXMpIHtcblx0ICAgIHJldHVybiByZXMuZ2V0LmNhbGwodGhpcywgdGhpcylcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSB2YWx1ZSBmcm9tIGFuIGV4cHJlc3Npb24gb24gdGhpcyB2bS5cblx0ICogVGhlIGV4cHJlc3Npb24gbXVzdCBiZSBhIHZhbGlkIGxlZnQtaGFuZFxuXHQgKiBleHByZXNzaW9uIGluIGFuIGFzc2lnbm1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBleHBcblx0ICogQHBhcmFtIHsqfSB2YWxcblx0ICovXG5cblx0ZXhwb3J0cy4kc2V0ID0gZnVuY3Rpb24gKGV4cCwgdmFsKSB7XG5cdCAgdmFyIHJlcyA9IGV4cFBhcnNlci5wYXJzZShleHAsIHRydWUpXG5cdCAgaWYgKHJlcyAmJiByZXMuc2V0KSB7XG5cdCAgICByZXMuc2V0LmNhbGwodGhpcywgdGhpcywgdmFsKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBwcm9wZXJ0eSBvbiB0aGUgVk1cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleVxuXHQgKiBAcGFyYW0geyp9IHZhbFxuXHQgKi9cblxuXHRleHBvcnRzLiRhZGQgPSBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0ICB0aGlzLl9kYXRhLiRhZGQoa2V5LCB2YWwpXG5cdH1cblxuXHQvKipcblx0ICogRGVsZXRlIGEgcHJvcGVydHkgb24gdGhlIFZNXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICovXG5cblx0ZXhwb3J0cy4kZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xuXHQgIHRoaXMuX2RhdGEuJGRlbGV0ZShrZXkpXG5cdH1cblxuXHQvKipcblx0ICogV2F0Y2ggYW4gZXhwcmVzc2lvbiwgdHJpZ2dlciBjYWxsYmFjayB3aGVuIGl0c1xuXHQgKiB2YWx1ZSBjaGFuZ2VzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW2RlZXBdXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ltbWVkaWF0ZV1cblx0ICogQHJldHVybiB7RnVuY3Rpb259IC0gdW53YXRjaEZuXG5cdCAqL1xuXG5cdGV4cG9ydHMuJHdhdGNoID0gZnVuY3Rpb24gKGV4cCwgY2IsIGRlZXAsIGltbWVkaWF0ZSkge1xuXHQgIHZhciB2bSA9IHRoaXNcblx0ICB2YXIga2V5ID0gZGVlcCA/IGV4cCArICcqKmRlZXAqKicgOiBleHBcblx0ICB2YXIgd2F0Y2hlciA9IHZtLl91c2VyV2F0Y2hlcnNba2V5XVxuXHQgIHZhciB3cmFwcGVkQ2IgPSBmdW5jdGlvbiAodmFsLCBvbGRWYWwpIHtcblx0ICAgIGNiLmNhbGwodm0sIHZhbCwgb2xkVmFsKVxuXHQgIH1cblx0ICBpZiAoIXdhdGNoZXIpIHtcblx0ICAgIHdhdGNoZXIgPSB2bS5fdXNlcldhdGNoZXJzW2tleV0gPVxuXHQgICAgICBuZXcgV2F0Y2hlcih2bSwgZXhwLCB3cmFwcGVkQ2IsIG51bGwsIGZhbHNlLCBkZWVwKVxuXHQgIH0gZWxzZSB7XG5cdCAgICB3YXRjaGVyLmFkZENiKHdyYXBwZWRDYilcblx0ICB9XG5cdCAgaWYgKGltbWVkaWF0ZSkge1xuXHQgICAgd3JhcHBlZENiKHdhdGNoZXIudmFsdWUpXG5cdCAgfVxuXHQgIHJldHVybiBmdW5jdGlvbiB1bndhdGNoRm4gKCkge1xuXHQgICAgd2F0Y2hlci5yZW1vdmVDYih3cmFwcGVkQ2IpXG5cdCAgICBpZiAoIXdhdGNoZXIuYWN0aXZlKSB7XG5cdCAgICAgIHZtLl91c2VyV2F0Y2hlcnNba2V5XSA9IG51bGxcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogRXZhbHVhdGUgYSB0ZXh0IGRpcmVjdGl2ZSwgaW5jbHVkaW5nIGZpbHRlcnMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG5cdCAqIEByZXR1cm4ge1N0cmluZ31cblx0ICovXG5cblx0ZXhwb3J0cy4kZXZhbCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG5cdCAgLy8gY2hlY2sgZm9yIGZpbHRlcnMuXG5cdCAgaWYgKGZpbHRlclJFLnRlc3QodGV4dCkpIHtcblx0ICAgIHZhciBkaXIgPSBkaXJQYXJzZXIucGFyc2UodGV4dClbMF1cblx0ICAgIC8vIHRoZSBmaWx0ZXIgcmVnZXggY2hlY2sgbWlnaHQgZ2l2ZSBmYWxzZSBwb3NpdGl2ZVxuXHQgICAgLy8gZm9yIHBpcGVzIGluc2lkZSBzdHJpbmdzLCBzbyBpdCdzIHBvc3NpYmxlIHRoYXRcblx0ICAgIC8vIHdlIGRvbid0IGdldCBhbnkgZmlsdGVycyBoZXJlXG5cdCAgICByZXR1cm4gZGlyLmZpbHRlcnNcblx0ICAgICAgPyBfLmFwcGx5RmlsdGVycyhcblx0ICAgICAgICAgIHRoaXMuJGdldChkaXIuZXhwcmVzc2lvbiksXG5cdCAgICAgICAgICBfLnJlc29sdmVGaWx0ZXJzKHRoaXMsIGRpci5maWx0ZXJzKS5yZWFkLFxuXHQgICAgICAgICAgdGhpc1xuXHQgICAgICAgIClcblx0ICAgICAgOiB0aGlzLiRnZXQoZGlyLmV4cHJlc3Npb24pXG5cdCAgfSBlbHNlIHtcblx0ICAgIC8vIG5vIGZpbHRlclxuXHQgICAgcmV0dXJuIHRoaXMuJGdldCh0ZXh0KVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBJbnRlcnBvbGF0ZSBhIHBpZWNlIG9mIHRlbXBsYXRlIHRleHQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG5cdCAqIEByZXR1cm4ge1N0cmluZ31cblx0ICovXG5cblx0ZXhwb3J0cy4kaW50ZXJwb2xhdGUgPSBmdW5jdGlvbiAodGV4dCkge1xuXHQgIHZhciB0b2tlbnMgPSB0ZXh0UGFyc2VyLnBhcnNlKHRleHQpXG5cdCAgdmFyIHZtID0gdGhpc1xuXHQgIGlmICh0b2tlbnMpIHtcblx0ICAgIHJldHVybiB0b2tlbnMubGVuZ3RoID09PSAxXG5cdCAgICAgID8gdm0uJGV2YWwodG9rZW5zWzBdLnZhbHVlKVxuXHQgICAgICA6IHRva2Vucy5tYXAoZnVuY3Rpb24gKHRva2VuKSB7XG5cdCAgICAgICAgICByZXR1cm4gdG9rZW4udGFnXG5cdCAgICAgICAgICAgID8gdm0uJGV2YWwodG9rZW4udmFsdWUpXG5cdCAgICAgICAgICAgIDogdG9rZW4udmFsdWVcblx0ICAgICAgICB9KS5qb2luKCcnKVxuXHQgIH0gZWxzZSB7XG5cdCAgICByZXR1cm4gdGV4dFxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBMb2cgaW5zdGFuY2UgZGF0YSBhcyBhIHBsYWluIEpTIG9iamVjdFxuXHQgKiBzbyB0aGF0IGl0IGlzIGVhc2llciB0byBpbnNwZWN0IGluIGNvbnNvbGUuXG5cdCAqIFRoaXMgbWV0aG9kIGFzc3VtZXMgY29uc29sZSBpcyBhdmFpbGFibGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBba2V5XVxuXHQgKi9cblxuXHRleHBvcnRzLiRsb2cgPSBmdW5jdGlvbiAoa2V5KSB7XG5cdCAgdmFyIGRhdGEgPSB0aGlzW2tleSB8fCAnX2RhdGEnXVxuXHQgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpKVxuXHR9XG5cbi8qKiovIH0sXG4vKiA0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIHRyYW5zaXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQyKVxuXG5cdC8qKlxuXHQgKiBBcHBlbmQgaW5zdGFuY2UgdG8gdGFyZ2V0XG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICogQHBhcmFtIHtCb29sZWFufSBbd2l0aFRyYW5zaXRpb25dIC0gZGVmYXVsdHMgdG8gdHJ1ZVxuXHQgKi9cblxuXHRleHBvcnRzLiRhcHBlbmRUbyA9IGZ1bmN0aW9uICh0YXJnZXQsIGNiLCB3aXRoVHJhbnNpdGlvbikge1xuXHQgIHRhcmdldCA9IHF1ZXJ5KHRhcmdldClcblx0ICB2YXIgdGFyZ2V0SXNEZXRhY2hlZCA9ICFfLmluRG9jKHRhcmdldClcblx0ICB2YXIgb3AgPSB3aXRoVHJhbnNpdGlvbiA9PT0gZmFsc2UgfHwgdGFyZ2V0SXNEZXRhY2hlZFxuXHQgICAgPyBhcHBlbmRcblx0ICAgIDogdHJhbnNpdGlvbi5hcHBlbmRcblx0ICBpbnNlcnQodGhpcywgdGFyZ2V0LCBvcCwgdGFyZ2V0SXNEZXRhY2hlZCwgY2IpXG5cdCAgcmV0dXJuIHRoaXNcblx0fVxuXG5cdC8qKlxuXHQgKiBQcmVwZW5kIGluc3RhbmNlIHRvIHRhcmdldFxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpdGhUcmFuc2l0aW9uXSAtIGRlZmF1bHRzIHRvIHRydWVcblx0ICovXG5cblx0ZXhwb3J0cy4kcHJlcGVuZFRvID0gZnVuY3Rpb24gKHRhcmdldCwgY2IsIHdpdGhUcmFuc2l0aW9uKSB7XG5cdCAgdGFyZ2V0ID0gcXVlcnkodGFyZ2V0KVxuXHQgIGlmICh0YXJnZXQuaGFzQ2hpbGROb2RlcygpKSB7XG5cdCAgICB0aGlzLiRiZWZvcmUodGFyZ2V0LmZpcnN0Q2hpbGQsIGNiLCB3aXRoVHJhbnNpdGlvbilcblx0ICB9IGVsc2Uge1xuXHQgICAgdGhpcy4kYXBwZW5kVG8odGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24pXG5cdCAgfVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogSW5zZXJ0IGluc3RhbmNlIGJlZm9yZSB0YXJnZXRcblx0ICpcblx0ICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFt3aXRoVHJhbnNpdGlvbl0gLSBkZWZhdWx0cyB0byB0cnVlXG5cdCAqL1xuXG5cdGV4cG9ydHMuJGJlZm9yZSA9IGZ1bmN0aW9uICh0YXJnZXQsIGNiLCB3aXRoVHJhbnNpdGlvbikge1xuXHQgIHRhcmdldCA9IHF1ZXJ5KHRhcmdldClcblx0ICB2YXIgdGFyZ2V0SXNEZXRhY2hlZCA9ICFfLmluRG9jKHRhcmdldClcblx0ICB2YXIgb3AgPSB3aXRoVHJhbnNpdGlvbiA9PT0gZmFsc2UgfHwgdGFyZ2V0SXNEZXRhY2hlZFxuXHQgICAgPyBiZWZvcmVcblx0ICAgIDogdHJhbnNpdGlvbi5iZWZvcmVcblx0ICBpbnNlcnQodGhpcywgdGFyZ2V0LCBvcCwgdGFyZ2V0SXNEZXRhY2hlZCwgY2IpXG5cdCAgcmV0dXJuIHRoaXNcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnNlcnQgaW5zdGFuY2UgYWZ0ZXIgdGFyZ2V0XG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICogQHBhcmFtIHtCb29sZWFufSBbd2l0aFRyYW5zaXRpb25dIC0gZGVmYXVsdHMgdG8gdHJ1ZVxuXHQgKi9cblxuXHRleHBvcnRzLiRhZnRlciA9IGZ1bmN0aW9uICh0YXJnZXQsIGNiLCB3aXRoVHJhbnNpdGlvbikge1xuXHQgIHRhcmdldCA9IHF1ZXJ5KHRhcmdldClcblx0ICBpZiAodGFyZ2V0Lm5leHRTaWJsaW5nKSB7XG5cdCAgICB0aGlzLiRiZWZvcmUodGFyZ2V0Lm5leHRTaWJsaW5nLCBjYiwgd2l0aFRyYW5zaXRpb24pXG5cdCAgfSBlbHNlIHtcblx0ICAgIHRoaXMuJGFwcGVuZFRvKHRhcmdldC5wYXJlbnROb2RlLCBjYiwgd2l0aFRyYW5zaXRpb24pXG5cdCAgfVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIGluc3RhbmNlIGZyb20gRE9NXG5cdCAqXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICogQHBhcmFtIHtCb29sZWFufSBbd2l0aFRyYW5zaXRpb25dIC0gZGVmYXVsdHMgdG8gdHJ1ZVxuXHQgKi9cblxuXHRleHBvcnRzLiRyZW1vdmUgPSBmdW5jdGlvbiAoY2IsIHdpdGhUcmFuc2l0aW9uKSB7XG5cdCAgdmFyIGluRG9jID0gdGhpcy5faXNBdHRhY2hlZCAmJiBfLmluRG9jKHRoaXMuJGVsKVxuXHQgIC8vIGlmIHdlIGFyZSBub3QgaW4gZG9jdW1lbnQsIG5vIG5lZWQgdG8gY2hlY2tcblx0ICAvLyBmb3IgdHJhbnNpdGlvbnNcblx0ICBpZiAoIWluRG9jKSB3aXRoVHJhbnNpdGlvbiA9IGZhbHNlXG5cdCAgdmFyIG9wXG5cdCAgdmFyIHNlbGYgPSB0aGlzXG5cdCAgdmFyIHJlYWxDYiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgIGlmIChpbkRvYykgc2VsZi5fY2FsbEhvb2soJ2RldGFjaGVkJylcblx0ICAgIGlmIChjYikgY2IoKVxuXHQgIH1cblx0ICBpZiAoXG5cdCAgICB0aGlzLl9pc0Jsb2NrICYmXG5cdCAgICAhdGhpcy5fYmxvY2tGcmFnbWVudC5oYXNDaGlsZE5vZGVzKClcblx0ICApIHtcblx0ICAgIG9wID0gd2l0aFRyYW5zaXRpb24gPT09IGZhbHNlXG5cdCAgICAgID8gYXBwZW5kXG5cdCAgICAgIDogdHJhbnNpdGlvbi5yZW1vdmVUaGVuQXBwZW5kIFxuXHQgICAgYmxvY2tPcCh0aGlzLCB0aGlzLl9ibG9ja0ZyYWdtZW50LCBvcCwgcmVhbENiKVxuXHQgIH0gZWxzZSB7XG5cdCAgICBvcCA9IHdpdGhUcmFuc2l0aW9uID09PSBmYWxzZVxuXHQgICAgICA/IHJlbW92ZVxuXHQgICAgICA6IHRyYW5zaXRpb24ucmVtb3ZlXG5cdCAgICBvcCh0aGlzLiRlbCwgdGhpcywgcmVhbENiKVxuXHQgIH1cblx0ICByZXR1cm4gdGhpc1xuXHR9XG5cblx0LyoqXG5cdCAqIFNoYXJlZCBET00gaW5zZXJ0aW9uIGZ1bmN0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gb3Bcblx0ICogQHBhcmFtIHtCb29sZWFufSB0YXJnZXRJc0RldGFjaGVkXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICovXG5cblx0ZnVuY3Rpb24gaW5zZXJ0ICh2bSwgdGFyZ2V0LCBvcCwgdGFyZ2V0SXNEZXRhY2hlZCwgY2IpIHtcblx0ICB2YXIgc2hvdWxkQ2FsbEhvb2sgPVxuXHQgICAgIXRhcmdldElzRGV0YWNoZWQgJiZcblx0ICAgICF2bS5faXNBdHRhY2hlZCAmJlxuXHQgICAgIV8uaW5Eb2Modm0uJGVsKVxuXHQgIGlmICh2bS5faXNCbG9jaykge1xuXHQgICAgYmxvY2tPcCh2bSwgdGFyZ2V0LCBvcCwgY2IpXG5cdCAgfSBlbHNlIHtcblx0ICAgIG9wKHZtLiRlbCwgdGFyZ2V0LCB2bSwgY2IpXG5cdCAgfVxuXHQgIGlmIChzaG91bGRDYWxsSG9vaykge1xuXHQgICAgdm0uX2NhbGxIb29rKCdhdHRhY2hlZCcpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEV4ZWN1dGUgYSB0cmFuc2l0aW9uIG9wZXJhdGlvbiBvbiBhIGJsb2NrIGluc3RhbmNlLFxuXHQgKiBpdGVyYXRpbmcgdGhyb3VnaCBhbGwgaXRzIGJsb2NrIG5vZGVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gb3Bcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2Jcblx0ICovXG5cblx0ZnVuY3Rpb24gYmxvY2tPcCAodm0sIHRhcmdldCwgb3AsIGNiKSB7XG5cdCAgdmFyIGN1cnJlbnQgPSB2bS5fYmxvY2tTdGFydFxuXHQgIHZhciBlbmQgPSB2bS5fYmxvY2tFbmRcblx0ICB2YXIgbmV4dFxuXHQgIHdoaWxlIChuZXh0ICE9PSBlbmQpIHtcblx0ICAgIG5leHQgPSBjdXJyZW50Lm5leHRTaWJsaW5nXG5cdCAgICBvcChjdXJyZW50LCB0YXJnZXQsIHZtKVxuXHQgICAgY3VycmVudCA9IG5leHRcblx0ICB9XG5cdCAgb3AoZW5kLCB0YXJnZXQsIHZtLCBjYilcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayBmb3Igc2VsZWN0b3JzXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR9IGVsXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHF1ZXJ5IChlbCkge1xuXHQgIHJldHVybiB0eXBlb2YgZWwgPT09ICdzdHJpbmcnXG5cdCAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG5cdCAgICA6IGVsXG5cdH1cblxuXHQvKipcblx0ICogQXBwZW5kIG9wZXJhdGlvbiB0aGF0IHRha2VzIGEgY2FsbGJhY2suXG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gZWxcblx0ICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcblx0ICogQHBhcmFtIHtWdWV9IHZtIC0gdW51c2VkXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICovXG5cblx0ZnVuY3Rpb24gYXBwZW5kIChlbCwgdGFyZ2V0LCB2bSwgY2IpIHtcblx0ICB0YXJnZXQuYXBwZW5kQ2hpbGQoZWwpXG5cdCAgaWYgKGNiKSBjYigpXG5cdH1cblxuXHQvKipcblx0ICogSW5zZXJ0QmVmb3JlIG9wZXJhdGlvbiB0aGF0IHRha2VzIGEgY2FsbGJhY2suXG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gZWxcblx0ICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcblx0ICogQHBhcmFtIHtWdWV9IHZtIC0gdW51c2VkXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICovXG5cblx0ZnVuY3Rpb24gYmVmb3JlIChlbCwgdGFyZ2V0LCB2bSwgY2IpIHtcblx0ICBfLmJlZm9yZShlbCwgdGFyZ2V0KVxuXHQgIGlmIChjYikgY2IoKVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBvcGVyYXRpb24gdGhhdCB0YWtlcyBhIGNhbGxiYWNrLlxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IGVsXG5cdCAqIEBwYXJhbSB7VnVlfSB2bSAtIHVudXNlZFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHJlbW92ZSAoZWwsIHZtLCBjYikge1xuXHQgIF8ucmVtb3ZlKGVsKVxuXHQgIGlmIChjYikgY2IoKVxuXHR9XG5cbi8qKiovIH0sXG4vKiA1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblxuXHQvKipcblx0ICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG5cdCAqL1xuXG5cdGV4cG9ydHMuJG9uID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuXHQgICh0aGlzLl9ldmVudHNbZXZlbnRdIHx8ICh0aGlzLl9ldmVudHNbZXZlbnRdID0gW10pKVxuXHQgICAgLnB1c2goZm4pXG5cdCAgbW9kaWZ5TGlzdGVuZXJDb3VudCh0aGlzLCBldmVudCwgMSlcblx0ICByZXR1cm4gdGhpc1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuXHQgKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cblx0ICovXG5cblx0ZXhwb3J0cy4kb25jZSA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcblx0ICB2YXIgc2VsZiA9IHRoaXNcblx0ICBmdW5jdGlvbiBvbiAoKSB7XG5cdCAgICBzZWxmLiRvZmYoZXZlbnQsIG9uKVxuXHQgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuXHQgIH1cblx0ICBvbi5mbiA9IGZuXG5cdCAgdGhpcy4kb24oZXZlbnQsIG9uKVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcblx0ICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuXHQgKi9cblxuXHRleHBvcnRzLiRvZmYgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG5cdCAgdmFyIGNic1xuXHQgIC8vIGFsbFxuXHQgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuXHQgICAgaWYgKHRoaXMuJHBhcmVudCkge1xuXHQgICAgICBmb3IgKGV2ZW50IGluIHRoaXMuX2V2ZW50cykge1xuXHQgICAgICAgIGNicyA9IHRoaXMuX2V2ZW50c1tldmVudF1cblx0ICAgICAgICBpZiAoY2JzKSB7XG5cdCAgICAgICAgICBtb2RpZnlMaXN0ZW5lckNvdW50KHRoaXMsIGV2ZW50LCAtY2JzLmxlbmd0aClcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIHRoaXMuX2V2ZW50cyA9IHt9XG5cdCAgICByZXR1cm4gdGhpc1xuXHQgIH1cblx0ICAvLyBzcGVjaWZpYyBldmVudFxuXHQgIGNicyA9IHRoaXMuX2V2ZW50c1tldmVudF1cblx0ICBpZiAoIWNicykge1xuXHQgICAgcmV0dXJuIHRoaXNcblx0ICB9XG5cdCAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0ICAgIG1vZGlmeUxpc3RlbmVyQ291bnQodGhpcywgZXZlbnQsIC1jYnMubGVuZ3RoKVxuXHQgICAgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IG51bGxcblx0ICAgIHJldHVybiB0aGlzXG5cdCAgfVxuXHQgIC8vIHNwZWNpZmljIGhhbmRsZXJcblx0ICB2YXIgY2Jcblx0ICB2YXIgaSA9IGNicy5sZW5ndGhcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICBjYiA9IGNic1tpXVxuXHQgICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcblx0ICAgICAgbW9kaWZ5TGlzdGVuZXJDb3VudCh0aGlzLCBldmVudCwgLTEpXG5cdCAgICAgIGNicy5zcGxpY2UoaSwgMSlcblx0ICAgICAgYnJlYWtcblx0ICAgIH1cblx0ICB9XG5cdCAgcmV0dXJuIHRoaXNcblx0fVxuXG5cdC8qKlxuXHQgKiBUcmlnZ2VyIGFuIGV2ZW50IG9uIHNlbGYuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgKi9cblxuXHRleHBvcnRzLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdCAgdGhpcy5fZXZlbnRDYW5jZWxsZWQgPSBmYWxzZVxuXHQgIHZhciBjYnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG5cdCAgaWYgKGNicykge1xuXHQgICAgLy8gYXZvaWQgbGVha2luZyBhcmd1bWVudHM6XG5cdCAgICAvLyBodHRwOi8vanNwZXJmLmNvbS9jbG9zdXJlLXdpdGgtYXJndW1lbnRzXG5cdCAgICB2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxXG5cdCAgICB2YXIgYXJncyA9IG5ldyBBcnJheShpKVxuXHQgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXVxuXHQgICAgfVxuXHQgICAgaSA9IDBcblx0ICAgIGNicyA9IGNicy5sZW5ndGggPiAxXG5cdCAgICAgID8gXy50b0FycmF5KGNicylcblx0ICAgICAgOiBjYnNcblx0ICAgIGZvciAodmFyIGwgPSBjYnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIGlmIChjYnNbaV0uYXBwbHkodGhpcywgYXJncykgPT09IGZhbHNlKSB7XG5cdCAgICAgICAgdGhpcy5fZXZlbnRDYW5jZWxsZWQgPSB0cnVlXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cdCAgcmV0dXJuIHRoaXNcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWN1cnNpdmVseSBicm9hZGNhc3QgYW4gZXZlbnQgdG8gYWxsIGNoaWxkcmVuIGluc3RhbmNlcy5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG5cdCAqIEBwYXJhbSB7Li4uKn0gYWRkaXRpb25hbCBhcmd1bWVudHNcblx0ICovXG5cblx0ZXhwb3J0cy4kYnJvYWRjYXN0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdCAgLy8gaWYgbm8gY2hpbGQgaGFzIHJlZ2lzdGVyZWQgZm9yIHRoaXMgZXZlbnQsXG5cdCAgLy8gdGhlbiB0aGVyZSdzIG5vIG5lZWQgdG8gYnJvYWRjYXN0LlxuXHQgIGlmICghdGhpcy5fZXZlbnRzQ291bnRbZXZlbnRdKSByZXR1cm5cblx0ICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlblxuXHQgIGlmIChjaGlsZHJlbikge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV1cblx0ICAgICAgY2hpbGQuJGVtaXQuYXBwbHkoY2hpbGQsIGFyZ3VtZW50cylcblx0ICAgICAgaWYgKCFjaGlsZC5fZXZlbnRDYW5jZWxsZWQpIHtcblx0ICAgICAgICBjaGlsZC4kYnJvYWRjYXN0LmFwcGx5KGNoaWxkLCBhcmd1bWVudHMpXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cdCAgcmV0dXJuIHRoaXNcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWN1cnNpdmVseSBwcm9wYWdhdGUgYW4gZXZlbnQgdXAgdGhlIHBhcmVudCBjaGFpbi5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG5cdCAqIEBwYXJhbSB7Li4uKn0gYWRkaXRpb25hbCBhcmd1bWVudHNcblx0ICovXG5cblx0ZXhwb3J0cy4kZGlzcGF0Y2ggPSBmdW5jdGlvbiAoKSB7XG5cdCAgdmFyIHBhcmVudCA9IHRoaXMuJHBhcmVudFxuXHQgIHdoaWxlIChwYXJlbnQpIHtcblx0ICAgIHBhcmVudC4kZW1pdC5hcHBseShwYXJlbnQsIGFyZ3VtZW50cylcblx0ICAgIHBhcmVudCA9IHBhcmVudC5fZXZlbnRDYW5jZWxsZWRcblx0ICAgICAgPyBudWxsXG5cdCAgICAgIDogcGFyZW50LiRwYXJlbnRcblx0ICB9XG5cdCAgcmV0dXJuIHRoaXNcblx0fVxuXG5cdC8qKlxuXHQgKiBNb2RpZnkgdGhlIGxpc3RlbmVyIGNvdW50cyBvbiBhbGwgcGFyZW50cy5cblx0ICogVGhpcyBib29ra2VlcGluZyBhbGxvd3MgJGJyb2FkY2FzdCB0byByZXR1cm4gZWFybHkgd2hlblxuXHQgKiBubyBjaGlsZCBoYXMgbGlzdGVuZWQgdG8gYSBjZXJ0YWluIGV2ZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudFxuXHQgKi9cblxuXHR2YXIgaG9va1JFID0gL15ob29rOi9cblx0ZnVuY3Rpb24gbW9kaWZ5TGlzdGVuZXJDb3VudCAodm0sIGV2ZW50LCBjb3VudCkge1xuXHQgIHZhciBwYXJlbnQgPSB2bS4kcGFyZW50XG5cdCAgLy8gaG9va3MgZG8gbm90IGdldCBicm9hZGNhc3RlZCBzbyBubyBuZWVkXG5cdCAgLy8gdG8gZG8gYm9va2tlZXBpbmcgZm9yIHRoZW1cblx0ICBpZiAoIXBhcmVudCB8fCAhY291bnQgfHwgaG9va1JFLnRlc3QoZXZlbnQpKSByZXR1cm5cblx0ICB3aGlsZSAocGFyZW50KSB7XG5cdCAgICBwYXJlbnQuX2V2ZW50c0NvdW50W2V2ZW50XSA9XG5cdCAgICAgIChwYXJlbnQuX2V2ZW50c0NvdW50W2V2ZW50XSB8fCAwKSArIGNvdW50XG5cdCAgICBwYXJlbnQgPSBwYXJlbnQuJHBhcmVudFxuXHQgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIGNoaWxkIGluc3RhbmNlIHRoYXQgcHJvdG90eXBhbGx5IGluZWhyaXRzXG5cdCAqIGRhdGEgb24gcGFyZW50LiBUbyBhY2hpZXZlIHRoYXQgd2UgY3JlYXRlIGFuIGludGVybWVkaWF0ZVxuXHQgKiBjb25zdHJ1Y3RvciB3aXRoIGl0cyBwcm90b3R5cGUgcG9pbnRpbmcgdG8gcGFyZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbQmFzZUN0b3JdXG5cdCAqIEByZXR1cm4ge1Z1ZX1cblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHRleHBvcnRzLiRhZGRDaGlsZCA9IGZ1bmN0aW9uIChvcHRzLCBCYXNlQ3Rvcikge1xuXHQgIEJhc2VDdG9yID0gQmFzZUN0b3IgfHwgXy5WdWVcblx0ICBvcHRzID0gb3B0cyB8fCB7fVxuXHQgIHZhciBwYXJlbnQgPSB0aGlzXG5cdCAgdmFyIENoaWxkVnVlXG5cdCAgdmFyIGluaGVyaXQgPSBvcHRzLmluaGVyaXQgIT09IHVuZGVmaW5lZFxuXHQgICAgPyBvcHRzLmluaGVyaXRcblx0ICAgIDogQmFzZUN0b3Iub3B0aW9ucy5pbmhlcml0XG5cdCAgaWYgKGluaGVyaXQpIHtcblx0ICAgIHZhciBjdG9ycyA9IHBhcmVudC5fY2hpbGRDdG9yc1xuXHQgICAgaWYgKCFjdG9ycykge1xuXHQgICAgICBjdG9ycyA9IHBhcmVudC5fY2hpbGRDdG9ycyA9IHt9XG5cdCAgICB9XG5cdCAgICBDaGlsZFZ1ZSA9IGN0b3JzW0Jhc2VDdG9yLmNpZF1cblx0ICAgIGlmICghQ2hpbGRWdWUpIHtcblx0ICAgICAgdmFyIGNsYXNzTmFtZSA9IEJhc2VDdG9yLm5hbWUgfHwgJ1Z1ZUNvbXBvbmVudCdcblx0ICAgICAgQ2hpbGRWdWUgPSBuZXcgRnVuY3Rpb24oXG5cdCAgICAgICAgJ3JldHVybiBmdW5jdGlvbiAnICsgY2xhc3NOYW1lICsgJyAob3B0aW9ucykgeycgK1xuXHQgICAgICAgICd0aGlzLmNvbnN0cnVjdG9yID0gJyArIGNsYXNzTmFtZSArICc7JyArXG5cdCAgICAgICAgJ3RoaXMuX2luaXQob3B0aW9ucykgfSdcblx0ICAgICAgKSgpXG5cdCAgICAgIENoaWxkVnVlLm9wdGlvbnMgPSBCYXNlQ3Rvci5vcHRpb25zXG5cdCAgICAgIENoaWxkVnVlLnByb3RvdHlwZSA9IHRoaXNcblx0ICAgICAgY3RvcnNbQmFzZUN0b3IuY2lkXSA9IENoaWxkVnVlXG5cdCAgICB9XG5cdCAgfSBlbHNlIHtcblx0ICAgIENoaWxkVnVlID0gQmFzZUN0b3Jcblx0ICB9XG5cdCAgb3B0cy5fcGFyZW50ID0gcGFyZW50XG5cdCAgb3B0cy5fcm9vdCA9IHBhcmVudC4kcm9vdFxuXHQgIHZhciBjaGlsZCA9IG5ldyBDaGlsZFZ1ZShvcHRzKVxuXHQgIGlmICghdGhpcy5fY2hpbGRyZW4pIHtcblx0ICAgIHRoaXMuX2NoaWxkcmVuID0gW11cblx0ICB9XG5cdCAgdGhpcy5fY2hpbGRyZW4ucHVzaChjaGlsZClcblx0ICByZXR1cm4gY2hpbGRcblx0fVxuXG4vKioqLyB9LFxuLyogNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBjb21waWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MylcblxuXHQvKipcblx0ICogU2V0IGluc3RhbmNlIHRhcmdldCBlbGVtZW50IGFuZCBraWNrIG9mZiB0aGUgY29tcGlsYXRpb25cblx0ICogcHJvY2Vzcy4gVGhlIHBhc3NlZCBpbiBgZWxgIGNhbiBiZSBhIHNlbGVjdG9yIHN0cmluZywgYW5cblx0ICogZXhpc3RpbmcgRWxlbWVudCwgb3IgYSBEb2N1bWVudEZyYWdtZW50IChmb3IgYmxvY2tcblx0ICogaW5zdGFuY2VzKS5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR8c3RyaW5nfSBlbFxuXHQgKiBAcHVibGljXG5cdCAqL1xuXG5cdGV4cG9ydHMuJG1vdW50ID0gZnVuY3Rpb24gKGVsKSB7XG5cdCAgaWYgKHRoaXMuX2lzQ29tcGlsZWQpIHtcblx0ICAgIF8ud2FybignJG1vdW50KCkgc2hvdWxkIGJlIGNhbGxlZCBvbmx5IG9uY2UuJylcblx0ICAgIHJldHVyblxuXHQgIH1cblx0ICBpZiAoIWVsKSB7XG5cdCAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdCAgfSBlbHNlIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSB7XG5cdCAgICB2YXIgc2VsZWN0b3IgPSBlbFxuXHQgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuXHQgICAgaWYgKCFlbCkge1xuXHQgICAgICBfLndhcm4oJ0Nhbm5vdCBmaW5kIGVsZW1lbnQ6ICcgKyBzZWxlY3Rvcilcblx0ICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgfVxuXHQgIHRoaXMuX2NvbXBpbGUoZWwpXG5cdCAgdGhpcy5faXNDb21waWxlZCA9IHRydWVcblx0ICB0aGlzLl9jYWxsSG9vaygnY29tcGlsZWQnKVxuXHQgIGlmIChfLmluRG9jKHRoaXMuJGVsKSkge1xuXHQgICAgdGhpcy5fY2FsbEhvb2soJ2F0dGFjaGVkJylcblx0ICAgIHRoaXMuX2luaXRET01Ib29rcygpXG5cdCAgICByZWFkeS5jYWxsKHRoaXMpXG5cdCAgfSBlbHNlIHtcblx0ICAgIHRoaXMuX2luaXRET01Ib29rcygpXG5cdCAgICB0aGlzLiRvbmNlKCdob29rOmF0dGFjaGVkJywgcmVhZHkpXG5cdCAgfVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogTWFyayBhbiBpbnN0YW5jZSBhcyByZWFkeS5cblx0ICovXG5cblx0ZnVuY3Rpb24gcmVhZHkgKCkge1xuXHQgIHRoaXMuX2lzQXR0YWNoZWQgPSB0cnVlXG5cdCAgdGhpcy5faXNSZWFkeSA9IHRydWVcblx0ICB0aGlzLl9jYWxsSG9vaygncmVhZHknKVxuXHR9XG5cblx0LyoqXG5cdCAqIFRlYXJkb3duIGFuIGluc3RhbmNlLCB1bm9ic2VydmVzIHRoZSBkYXRhLCB1bmJpbmQgYWxsIHRoZVxuXHQgKiBkaXJlY3RpdmVzLCB0dXJuIG9mZiBhbGwgdGhlIGV2ZW50IGxpc3RlbmVycywgZXRjLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbW92ZSAtIHdoZXRoZXIgdG8gcmVtb3ZlIHRoZSBET00gbm9kZS5cblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHRleHBvcnRzLiRkZXN0cm95ID0gZnVuY3Rpb24gKHJlbW92ZSkge1xuXHQgIGlmICh0aGlzLl9pc0Rlc3Ryb3llZCkge1xuXHQgICAgcmV0dXJuXG5cdCAgfVxuXHQgIHRoaXMuX2NhbGxIb29rKCdiZWZvcmVEZXN0cm95Jylcblx0ICB0aGlzLl9pc0JlaW5nRGVzdHJveWVkID0gdHJ1ZVxuXHQgIC8vIHJlbW92ZSBET00gZWxlbWVudFxuXHQgIGlmIChyZW1vdmUgJiYgdGhpcy4kZWwpIHtcblx0ICAgIHRoaXMuJHJlbW92ZSgpXG5cdCAgfVxuXHQgIHZhciBpXG5cdCAgLy8gcmVtb3ZlIHNlbGYgZnJvbSBwYXJlbnQuIG9ubHkgbmVjZXNzYXJ5XG5cdCAgLy8gaWYgcGFyZW50IGlzIG5vdCBiZWluZyBkZXN0cm95ZWQgYXMgd2VsbC5cblx0ICB2YXIgcGFyZW50ID0gdGhpcy4kcGFyZW50XG5cdCAgaWYgKHBhcmVudCAmJiAhcGFyZW50Ll9pc0JlaW5nRGVzdHJveWVkKSB7XG5cdCAgICBpID0gcGFyZW50Ll9jaGlsZHJlbi5pbmRleE9mKHRoaXMpXG5cdCAgICBwYXJlbnQuX2NoaWxkcmVuLnNwbGljZShpLCAxKVxuXHQgIH1cblx0ICAvLyBkZXN0cm95IGFsbCBjaGlsZHJlbi5cblx0ICBpZiAodGhpcy5fY2hpbGRyZW4pIHtcblx0ICAgIGkgPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGhcblx0ICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgdGhpcy5fY2hpbGRyZW5baV0uJGRlc3Ryb3koKVxuXHQgICAgfVxuXHQgIH1cblx0ICAvLyB0ZWFyZG93biBhbGwgZGlyZWN0aXZlcy4gdGhpcyBhbHNvIHRlYXJzZG93biBhbGxcblx0ICAvLyBkaXJlY3RpdmUtb3duZWQgd2F0Y2hlcnMuXG5cdCAgaSA9IHRoaXMuX2RpcmVjdGl2ZXMubGVuZ3RoXG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAgdGhpcy5fZGlyZWN0aXZlc1tpXS5fdGVhcmRvd24oKVxuXHQgIH1cblx0ICAvLyB0ZWFyZG93biBhbGwgdXNlciB3YXRjaGVycy5cblx0ICBmb3IgKGkgaW4gdGhpcy5fdXNlcldhdGNoZXJzKSB7XG5cdCAgICB0aGlzLl91c2VyV2F0Y2hlcnNbaV0udGVhcmRvd24oKVxuXHQgIH1cblx0ICAvLyBjbGVhbiB1cFxuXHQgIGlmICh0aGlzLiRlbCkge1xuXHQgICAgdGhpcy4kZWwuX192dWVfXyA9IG51bGxcblx0ICB9XG5cdCAgLy8gcmVtb3ZlIHJlZmVyZW5jZSBmcm9tIGRhdGEgb2Jcblx0ICB0aGlzLl9kYXRhLl9fb2JfXy5yZW1vdmVWbSh0aGlzKVxuXHQgIHRoaXMuX2RhdGEgPVxuXHQgIHRoaXMuX3dhdGNoZXJzID1cblx0ICB0aGlzLl91c2VyV2F0Y2hlcnMgPVxuXHQgIHRoaXMuX3dhdGNoZXJMaXN0ID1cblx0ICB0aGlzLiRlbCA9XG5cdCAgdGhpcy4kcGFyZW50ID1cblx0ICB0aGlzLiRyb290ID1cblx0ICB0aGlzLl9jaGlsZHJlbiA9XG5cdCAgdGhpcy5fYmluZGluZ3MgPVxuXHQgIHRoaXMuX2RpcmVjdGl2ZXMgPSBudWxsXG5cdCAgLy8gY2FsbCB0aGUgbGFzdCBob29rLi4uXG5cdCAgdGhpcy5faXNEZXN0cm95ZWQgPSB0cnVlXG5cdCAgdGhpcy5fY2FsbEhvb2soJ2Rlc3Ryb3llZCcpXG5cdCAgLy8gdHVybiBvZmYgYWxsIGluc3RhbmNlIGxpc3RlbmVycy5cblx0ICB0aGlzLiRvZmYoKVxuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnRpYWxseSBjb21waWxlIGEgcGllY2Ugb2YgRE9NIGFuZCByZXR1cm4gYVxuXHQgKiBkZWNvbXBpbGUgZnVuY3Rpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSBlbFxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn1cblx0ICovXG5cblx0ZXhwb3J0cy4kY29tcGlsZSA9IGZ1bmN0aW9uIChlbCkge1xuXHQgIHJldHVybiBjb21waWxlKGVsLCB0aGlzLiRvcHRpb25zLCB0cnVlKSh0aGlzLCBlbClcblx0fVxuXG4vKioqLyB9LFxuLyogOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Ly8gbWFuaXB1bGF0aW9uIGRpcmVjdGl2ZXNcblx0ZXhwb3J0cy50ZXh0ICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNylcblx0ZXhwb3J0cy5odG1sICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOClcblx0ZXhwb3J0cy5hdHRyICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSlcblx0ZXhwb3J0cy5zaG93ICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMClcblx0ZXhwb3J0c1snY2xhc3MnXSAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSlcblx0ZXhwb3J0cy5lbCAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMilcblx0ZXhwb3J0cy5yZWYgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMylcblx0ZXhwb3J0cy5jbG9hayAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNClcblx0ZXhwb3J0cy5zdHlsZSAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSlcblx0ZXhwb3J0cy5wYXJ0aWFsICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNilcblx0ZXhwb3J0cy50cmFuc2l0aW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNylcblxuXHQvLyBldmVudCBsaXN0ZW5lciBkaXJlY3RpdmVzXG5cdGV4cG9ydHMub24gICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjgpXG5cdGV4cG9ydHMubW9kZWwgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNDQpXG5cblx0Ly8gY2hpbGQgdm0gZGlyZWN0aXZlc1xuXHRleHBvcnRzLmNvbXBvbmVudCAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI5KVxuXHRleHBvcnRzLnJlcGVhdCAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMwKVxuXHRleHBvcnRzWydpZiddICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMxKVxuXHRleHBvcnRzWyd3aXRoJ10gICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMyKVxuXG4vKioqLyB9LFxuLyogOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cblx0LyoqXG5cdCAqIFN0cmluZ2lmeSB2YWx1ZS5cblx0ICpcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGluZGVudFxuXHQgKi9cblxuXHRleHBvcnRzLmpzb24gPSBmdW5jdGlvbiAodmFsdWUsIGluZGVudCkge1xuXHQgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgbnVsbCwgTnVtYmVyKGluZGVudCkgfHwgMilcblx0fVxuXG5cdC8qKlxuXHQgKiAnYWJjJyA9PiAnQWJjJ1xuXHQgKi9cblxuXHRleHBvcnRzLmNhcGl0YWxpemUgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSByZXR1cm4gJydcblx0ICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKClcblx0ICByZXR1cm4gdmFsdWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB2YWx1ZS5zbGljZSgxKVxuXHR9XG5cblx0LyoqXG5cdCAqICdhYmMnID0+ICdBQkMnXG5cdCAqL1xuXG5cdGV4cG9ydHMudXBwZXJjYXNlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgcmV0dXJuICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMClcblx0ICAgID8gdmFsdWUudG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpXG5cdCAgICA6ICcnXG5cdH1cblxuXHQvKipcblx0ICogJ0FiQycgPT4gJ2FiYydcblx0ICovXG5cblx0ZXhwb3J0cy5sb3dlcmNhc2UgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICByZXR1cm4gKHZhbHVlIHx8IHZhbHVlID09PSAwKVxuXHQgICAgPyB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKClcblx0ICAgIDogJydcblx0fVxuXG5cdC8qKlxuXHQgKiAxMjM0NSA9PiAkMTIsMzQ1LjAwXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzaWduXG5cdCAqL1xuXG5cdHZhciBkaWdpdHNSRSA9IC8oXFxkezN9KSg/PVxcZCkvZ1xuXG5cdGV4cG9ydHMuY3VycmVuY3kgPSBmdW5jdGlvbiAodmFsdWUsIHNpZ24pIHtcblx0ICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpXG5cdCAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkgcmV0dXJuICcnXG5cdCAgc2lnbiA9IHNpZ24gfHwgJyQnXG5cdCAgdmFyIHMgPSBNYXRoLmZsb29yKHZhbHVlKS50b1N0cmluZygpLFxuXHQgICAgaSA9IHMubGVuZ3RoICUgMyxcblx0ICAgIGggPSBpID4gMFxuXHQgICAgICA/IChzLnNsaWNlKDAsIGkpICsgKHMubGVuZ3RoID4gMyA/ICcsJyA6ICcnKSlcblx0ICAgICAgOiAnJyxcblx0ICAgIGYgPSAnLicgKyB2YWx1ZS50b0ZpeGVkKDIpLnNsaWNlKC0yKVxuXHQgIHJldHVybiBzaWduICsgaCArIHMuc2xpY2UoaSkucmVwbGFjZShkaWdpdHNSRSwgJyQxLCcpICsgZlxuXHR9XG5cblx0LyoqXG5cdCAqICdpdGVtJyA9PiAnaXRlbXMnXG5cdCAqXG5cdCAqIEBwYXJhbXNcblx0ICogIGFuIGFycmF5IG9mIHN0cmluZ3MgY29ycmVzcG9uZGluZyB0b1xuXHQgKiAgdGhlIHNpbmdsZSwgZG91YmxlLCB0cmlwbGUgLi4uIGZvcm1zIG9mIHRoZSB3b3JkIHRvXG5cdCAqICBiZSBwbHVyYWxpemVkLiBXaGVuIHRoZSBudW1iZXIgdG8gYmUgcGx1cmFsaXplZFxuXHQgKiAgZXhjZWVkcyB0aGUgbGVuZ3RoIG9mIHRoZSBhcmdzLCBpdCB3aWxsIHVzZSB0aGUgbGFzdFxuXHQgKiAgZW50cnkgaW4gdGhlIGFycmF5LlxuXHQgKlxuXHQgKiAgZS5nLiBbJ3NpbmdsZScsICdkb3VibGUnLCAndHJpcGxlJywgJ211bHRpcGxlJ11cblx0ICovXG5cblx0ZXhwb3J0cy5wbHVyYWxpemUgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICB2YXIgYXJncyA9IF8udG9BcnJheShhcmd1bWVudHMsIDEpXG5cdCAgcmV0dXJuIGFyZ3MubGVuZ3RoID4gMVxuXHQgICAgPyAoYXJnc1t2YWx1ZSAlIDEwIC0gMV0gfHwgYXJnc1thcmdzLmxlbmd0aCAtIDFdKVxuXHQgICAgOiAoYXJnc1swXSArICh2YWx1ZSA9PT0gMSA/ICcnIDogJ3MnKSlcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHNwZWNpYWwgZmlsdGVyIHRoYXQgdGFrZXMgYSBoYW5kbGVyIGZ1bmN0aW9uLFxuXHQgKiB3cmFwcyBpdCBzbyBpdCBvbmx5IGdldHMgdHJpZ2dlcmVkIG9uIHNwZWNpZmljXG5cdCAqIGtleXByZXNzZXMuIHYtb24gb25seS5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleVxuXHQgKi9cblxuXHR2YXIga2V5Q29kZXMgPSB7XG5cdCAgZW50ZXIgICAgOiAxMyxcblx0ICB0YWIgICAgICA6IDksXG5cdCAgJ2RlbGV0ZScgOiA0Nixcblx0ICB1cCAgICAgICA6IDM4LFxuXHQgIGxlZnQgICAgIDogMzcsXG5cdCAgcmlnaHQgICAgOiAzOSxcblx0ICBkb3duICAgICA6IDQwLFxuXHQgIGVzYyAgICAgIDogMjdcblx0fVxuXG5cdGV4cG9ydHMua2V5ID0gZnVuY3Rpb24gKGhhbmRsZXIsIGtleSkge1xuXHQgIGlmICghaGFuZGxlcikgcmV0dXJuXG5cdCAgdmFyIGNvZGUgPSBrZXlDb2Rlc1trZXldXG5cdCAgaWYgKCFjb2RlKSB7XG5cdCAgICBjb2RlID0gcGFyc2VJbnQoa2V5LCAxMClcblx0ICB9XG5cdCAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7XG5cdCAgICBpZiAoZS5rZXlDb2RlID09PSBjb2RlKSB7XG5cdCAgICAgIHJldHVybiBoYW5kbGVyLmNhbGwodGhpcywgZSlcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogSW5zdGFsbCBzcGVjaWFsIGFycmF5IGZpbHRlcnNcblx0ICovXG5cblx0Xy5leHRlbmQoZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXygzMykpXG5cbi8qKiovIH0sXG4vKiAxMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIG1lcmdlT3B0aW9ucyA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpXG5cblx0LyoqXG5cdCAqIFRoZSBtYWluIGluaXQgc2VxdWVuY2UuIFRoaXMgaXMgY2FsbGVkIGZvciBldmVyeVxuXHQgKiBpbnN0YW5jZSwgaW5jbHVkaW5nIG9uZXMgdGhhdCBhcmUgY3JlYXRlZCBmcm9tIGV4dGVuZGVkXG5cdCAqIGNvbnN0cnVjdG9ycy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGlzIG9wdGlvbnMgb2JqZWN0IHNob3VsZCBiZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSByZXN1bHQgb2YgbWVyZ2luZyBjbGFzc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgYW5kIHRoZSBvcHRpb25zIHBhc3NlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIHRvIHRoZSBjb25zdHJ1Y3Rvci5cblx0ICovXG5cblx0ZXhwb3J0cy5faW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cblx0ICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG5cdCAgdGhpcy4kZWwgICAgICAgICAgID0gbnVsbFxuXHQgIHRoaXMuJHBhcmVudCAgICAgICA9IG9wdGlvbnMuX3BhcmVudFxuXHQgIHRoaXMuJHJvb3QgICAgICAgICA9IG9wdGlvbnMuX3Jvb3QgfHwgdGhpc1xuXHQgIHRoaXMuJCAgICAgICAgICAgICA9IHt9IC8vIGNoaWxkIHZtIHJlZmVyZW5jZXNcblx0ICB0aGlzLiQkICAgICAgICAgICAgPSB7fSAvLyBlbGVtZW50IHJlZmVyZW5jZXNcblx0ICB0aGlzLl93YXRjaGVyTGlzdCAgPSBbXSAvLyBhbGwgd2F0Y2hlcnMgYXMgYW4gYXJyYXlcblx0ICB0aGlzLl93YXRjaGVycyAgICAgPSB7fSAvLyBpbnRlcm5hbCB3YXRjaGVycyBhcyBhIGhhc2hcblx0ICB0aGlzLl91c2VyV2F0Y2hlcnMgPSB7fSAvLyB1c2VyIHdhdGNoZXJzIGFzIGEgaGFzaFxuXHQgIHRoaXMuX2RpcmVjdGl2ZXMgICA9IFtdIC8vIGFsbCBkaXJlY3RpdmVzXG5cblx0ICAvLyBhIGZsYWcgdG8gYXZvaWQgdGhpcyBiZWluZyBvYnNlcnZlZFxuXHQgIHRoaXMuX2lzVnVlID0gdHJ1ZVxuXG5cdCAgLy8gZXZlbnRzIGJvb2trZWVwaW5nXG5cdCAgdGhpcy5fZXZlbnRzICAgICAgICAgPSB7fSAgICAvLyByZWdpc3RlcmVkIGNhbGxiYWNrc1xuXHQgIHRoaXMuX2V2ZW50c0NvdW50ICAgID0ge30gICAgLy8gZm9yICRicm9hZGNhc3Qgb3B0aW1pemF0aW9uXG5cdCAgdGhpcy5fZXZlbnRDYW5jZWxsZWQgPSBmYWxzZSAvLyBmb3IgZXZlbnQgY2FuY2VsbGF0aW9uXG5cblx0ICAvLyBibG9jayBpbnN0YW5jZSBwcm9wZXJ0aWVzXG5cdCAgdGhpcy5faXNCbG9jayAgICAgPSBmYWxzZVxuXHQgIHRoaXMuX2Jsb2NrU3RhcnQgID0gICAgICAgICAgLy8gQHR5cGUge0NvbW1lbnROb2RlfVxuXHQgIHRoaXMuX2Jsb2NrRW5kICAgID0gbnVsbCAgICAgLy8gQHR5cGUge0NvbW1lbnROb2RlfVxuXG5cdCAgLy8gbGlmZWN5Y2xlIHN0YXRlXG5cdCAgdGhpcy5faXNDb21waWxlZCAgPVxuXHQgIHRoaXMuX2lzRGVzdHJveWVkID1cblx0ICB0aGlzLl9pc1JlYWR5ICAgICA9XG5cdCAgdGhpcy5faXNBdHRhY2hlZCAgPVxuXHQgIHRoaXMuX2lzQmVpbmdEZXN0cm95ZWQgPSBmYWxzZVxuXG5cdCAgLy8gY2hpbGRyZW5cblx0ICB0aGlzLl9jaGlsZHJlbiA9ICAgICAgICAgLy8gQHR5cGUge0FycmF5fVxuXHQgIHRoaXMuX2NoaWxkQ3RvcnMgPSBudWxsICAvLyBAdHlwZSB7T2JqZWN0fSAtIGhhc2ggdG8gY2FjaGVcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hpbGQgY29uc3RydWN0b3JzXG5cblx0ICAvLyBtZXJnZSBvcHRpb25zLlxuXHQgIG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zID0gbWVyZ2VPcHRpb25zKFxuXHQgICAgdGhpcy5jb25zdHJ1Y3Rvci5vcHRpb25zLFxuXHQgICAgb3B0aW9ucyxcblx0ICAgIHRoaXNcblx0ICApXG5cblx0ICAvLyBzZXQgZGF0YSBhZnRlciBtZXJnZS5cblx0ICB0aGlzLl9kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9XG5cblx0ICAvLyBpbml0aWFsaXplIGRhdGEgb2JzZXJ2YXRpb24gYW5kIHNjb3BlIGluaGVyaXRhbmNlLlxuXHQgIHRoaXMuX2luaXRTY29wZSgpXG5cblx0ICAvLyBzZXR1cCBldmVudCBzeXN0ZW0gYW5kIG9wdGlvbiBldmVudHMuXG5cdCAgdGhpcy5faW5pdEV2ZW50cygpXG5cblx0ICAvLyBjYWxsIGNyZWF0ZWQgaG9va1xuXHQgIHRoaXMuX2NhbGxIb29rKCdjcmVhdGVkJylcblxuXHQgIC8vIGlmIGBlbGAgb3B0aW9uIGlzIHBhc3NlZCwgc3RhcnQgY29tcGlsYXRpb24uXG5cdCAgaWYgKG9wdGlvbnMuZWwpIHtcblx0ICAgIHRoaXMuJG1vdW50KG9wdGlvbnMuZWwpXG5cdCAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiAxMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBpbkRvYyA9IF8uaW5Eb2NcblxuXHQvKipcblx0ICogU2V0dXAgdGhlIGluc3RhbmNlJ3Mgb3B0aW9uIGV2ZW50cyAmIHdhdGNoZXJzLlxuXHQgKiBJZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcsIHdlIHB1bGwgaXQgZnJvbSB0aGVcblx0ICogaW5zdGFuY2UncyBtZXRob2RzIGJ5IG5hbWUuXG5cdCAqL1xuXG5cdGV4cG9ydHMuX2luaXRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdCAgdmFyIG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zXG5cdCAgcmVnaXN0ZXJDYWxsYmFja3ModGhpcywgJyRvbicsIG9wdGlvbnMuZXZlbnRzKVxuXHQgIHJlZ2lzdGVyQ2FsbGJhY2tzKHRoaXMsICckd2F0Y2gnLCBvcHRpb25zLndhdGNoKVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVyIGNhbGxiYWNrcyBmb3Igb3B0aW9uIGV2ZW50cyBhbmQgd2F0Y2hlcnMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHJlZ2lzdGVyQ2FsbGJhY2tzICh2bSwgYWN0aW9uLCBoYXNoKSB7XG5cdCAgaWYgKCFoYXNoKSByZXR1cm5cblx0ICB2YXIgaGFuZGxlcnMsIGtleSwgaSwgalxuXHQgIGZvciAoa2V5IGluIGhhc2gpIHtcblx0ICAgIGhhbmRsZXJzID0gaGFzaFtrZXldXG5cdCAgICBpZiAoXy5pc0FycmF5KGhhbmRsZXJzKSkge1xuXHQgICAgICBmb3IgKGkgPSAwLCBqID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdCAgICAgICAgcmVnaXN0ZXIodm0sIGFjdGlvbiwga2V5LCBoYW5kbGVyc1tpXSlcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgcmVnaXN0ZXIodm0sIGFjdGlvbiwga2V5LCBoYW5kbGVycylcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogSGVscGVyIHRvIHJlZ2lzdGVyIGFuIGV2ZW50L3dhdGNoIGNhbGxiYWNrLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvblxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqIEBwYXJhbSB7Kn0gaGFuZGxlclxuXHQgKi9cblxuXHRmdW5jdGlvbiByZWdpc3RlciAodm0sIGFjdGlvbiwga2V5LCBoYW5kbGVyKSB7XG5cdCAgdmFyIHR5cGUgPSB0eXBlb2YgaGFuZGxlclxuXHQgIGlmICh0eXBlID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICB2bVthY3Rpb25dKGtleSwgaGFuZGxlcilcblx0ICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG5cdCAgICB2YXIgbWV0aG9kcyA9IHZtLiRvcHRpb25zLm1ldGhvZHNcblx0ICAgIHZhciBtZXRob2QgPSBtZXRob2RzICYmIG1ldGhvZHNbaGFuZGxlcl1cblx0ICAgIGlmIChtZXRob2QpIHtcblx0ICAgICAgdm1bYWN0aW9uXShrZXksIG1ldGhvZClcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIF8ud2Fybihcblx0ICAgICAgICAnVW5rbm93biBtZXRob2Q6IFwiJyArIGhhbmRsZXIgKyAnXCIgd2hlbiAnICtcblx0ICAgICAgICAncmVnaXN0ZXJpbmcgY2FsbGJhY2sgZm9yICcgKyBhY3Rpb24gK1xuXHQgICAgICAgICc6IFwiJyArIGtleSArICdcIi4nXG5cdCAgICAgIClcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogU2V0dXAgcmVjdXJzaXZlIGF0dGFjaGVkL2RldGFjaGVkIGNhbGxzXG5cdCAqL1xuXG5cdGV4cG9ydHMuX2luaXRET01Ib29rcyA9IGZ1bmN0aW9uICgpIHtcblx0ICB0aGlzLiRvbignaG9vazphdHRhY2hlZCcsIG9uQXR0YWNoZWQpXG5cdCAgdGhpcy4kb24oJ2hvb2s6ZGV0YWNoZWQnLCBvbkRldGFjaGVkKVxuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxiYWNrIHRvIHJlY3Vyc2l2ZWx5IGNhbGwgYXR0YWNoZWQgaG9vayBvbiBjaGlsZHJlblxuXHQgKi9cblxuXHRmdW5jdGlvbiBvbkF0dGFjaGVkICgpIHtcblx0ICB0aGlzLl9pc0F0dGFjaGVkID0gdHJ1ZVxuXHQgIHZhciBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuXG5cdCAgaWYgKCFjaGlsZHJlbikgcmV0dXJuXG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG5cdCAgICBpZiAoIWNoaWxkLl9pc0F0dGFjaGVkICYmIGluRG9jKGNoaWxkLiRlbCkpIHtcblx0ICAgICAgY2hpbGQuX2NhbGxIb29rKCdhdHRhY2hlZCcpXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxiYWNrIHRvIHJlY3Vyc2l2ZWx5IGNhbGwgZGV0YWNoZWQgaG9vayBvbiBjaGlsZHJlblxuXHQgKi9cblxuXHRmdW5jdGlvbiBvbkRldGFjaGVkICgpIHtcblx0ICB0aGlzLl9pc0F0dGFjaGVkID0gZmFsc2Vcblx0ICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlblxuXHQgIGlmICghY2hpbGRyZW4pIHJldHVyblxuXHQgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuXHQgICAgaWYgKGNoaWxkLl9pc0F0dGFjaGVkICYmICFpbkRvYyhjaGlsZC4kZWwpKSB7XG5cdCAgICAgIGNoaWxkLl9jYWxsSG9vaygnZGV0YWNoZWQnKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBUcmlnZ2VyIGFsbCBoYW5kbGVycyBmb3IgYSBob29rXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBob29rXG5cdCAqL1xuXG5cdGV4cG9ydHMuX2NhbGxIb29rID0gZnVuY3Rpb24gKGhvb2spIHtcblx0ICB2YXIgaGFuZGxlcnMgPSB0aGlzLiRvcHRpb25zW2hvb2tdXG5cdCAgaWYgKGhhbmRsZXJzKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgaiA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHQgICAgICBoYW5kbGVyc1tpXS5jYWxsKHRoaXMpXG5cdCAgICB9XG5cdCAgfVxuXHQgIHRoaXMuJGVtaXQoJ2hvb2s6JyArIGhvb2spXG5cdH1cblxuLyoqKi8gfSxcbi8qIDEyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIE9ic2VydmVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OClcblx0dmFyIEJpbmRpbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ3KVxuXG5cdC8qKlxuXHQgKiBTZXR1cCB0aGUgc2NvcGUgb2YgYW4gaW5zdGFuY2UsIHdoaWNoIGNvbnRhaW5zOlxuXHQgKiAtIG9ic2VydmVkIGRhdGFcblx0ICogLSBjb21wdXRlZCBwcm9wZXJ0aWVzXG5cdCAqIC0gdXNlciBtZXRob2RzXG5cdCAqIC0gbWV0YSBwcm9wZXJ0aWVzXG5cdCAqL1xuXG5cdGV4cG9ydHMuX2luaXRTY29wZSA9IGZ1bmN0aW9uICgpIHtcblx0ICB0aGlzLl9pbml0RGF0YSgpXG5cdCAgdGhpcy5faW5pdENvbXB1dGVkKClcblx0ICB0aGlzLl9pbml0TWV0aG9kcygpXG5cdCAgdGhpcy5faW5pdE1ldGEoKVxuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIGRhdGEuIFxuXHQgKi9cblxuXHRleHBvcnRzLl9pbml0RGF0YSA9IGZ1bmN0aW9uICgpIHtcblx0ICAvLyBwcm94eSBkYXRhIG9uIGluc3RhbmNlXG5cdCAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhXG5cdCAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKVxuXHQgIHZhciBpID0ga2V5cy5sZW5ndGhcblx0ICB2YXIga2V5XG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAga2V5ID0ga2V5c1tpXVxuXHQgICAgaWYgKCFfLmlzUmVzZXJ2ZWQoa2V5KSkge1xuXHQgICAgICB0aGlzLl9wcm94eShrZXkpXG5cdCAgICB9XG5cdCAgfVxuXHQgIC8vIG9ic2VydmUgZGF0YVxuXHQgIE9ic2VydmVyLmNyZWF0ZShkYXRhKS5hZGRWbSh0aGlzKVxuXHR9XG5cblx0LyoqXG5cdCAqIFN3YXAgdGhlIGlzbnRhbmNlJ3MgJGRhdGEuIENhbGxlZCBpbiAkZGF0YSdzIHNldHRlci5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IG5ld0RhdGFcblx0ICovXG5cblx0ZXhwb3J0cy5fc2V0RGF0YSA9IGZ1bmN0aW9uIChuZXdEYXRhKSB7XG5cdCAgbmV3RGF0YSA9IG5ld0RhdGEgfHwge31cblx0ICB2YXIgb2xkRGF0YSA9IHRoaXMuX2RhdGFcblx0ICB0aGlzLl9kYXRhID0gbmV3RGF0YVxuXHQgIHZhciBrZXlzLCBrZXksIGlcblx0ICAvLyB1bnByb3h5IGtleXMgbm90IHByZXNlbnQgaW4gbmV3IGRhdGFcblx0ICBrZXlzID0gT2JqZWN0LmtleXMob2xkRGF0YSlcblx0ICBpID0ga2V5cy5sZW5ndGhcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICBrZXkgPSBrZXlzW2ldXG5cdCAgICBpZiAoIV8uaXNSZXNlcnZlZChrZXkpICYmICEoa2V5IGluIG5ld0RhdGEpKSB7XG5cdCAgICAgIHRoaXMuX3VucHJveHkoa2V5KVxuXHQgICAgfVxuXHQgIH1cblx0ICAvLyBwcm94eSBrZXlzIG5vdCBhbHJlYWR5IHByb3hpZWQsXG5cdCAgLy8gYW5kIHRyaWdnZXIgY2hhbmdlIGZvciBjaGFuZ2VkIHZhbHVlc1xuXHQgIGtleXMgPSBPYmplY3Qua2V5cyhuZXdEYXRhKVxuXHQgIGkgPSBrZXlzLmxlbmd0aFxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIGtleSA9IGtleXNbaV1cblx0ICAgIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICFfLmlzUmVzZXJ2ZWQoa2V5KSkge1xuXHQgICAgICAvLyBuZXcgcHJvcGVydHlcblx0ICAgICAgdGhpcy5fcHJveHkoa2V5KVxuXHQgICAgfVxuXHQgIH1cblx0ICBvbGREYXRhLl9fb2JfXy5yZW1vdmVWbSh0aGlzKVxuXHQgIE9ic2VydmVyLmNyZWF0ZShuZXdEYXRhKS5hZGRWbSh0aGlzKVxuXHQgIHRoaXMuX2RpZ2VzdCgpXG5cdH1cblxuXHQvKipcblx0ICogUHJveHkgYSBwcm9wZXJ0eSwgc28gdGhhdFxuXHQgKiB2bS5wcm9wID09PSB2bS5fZGF0YS5wcm9wXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICovXG5cblx0ZXhwb3J0cy5fcHJveHkgPSBmdW5jdGlvbiAoa2V5KSB7XG5cdCAgLy8gbmVlZCB0byBzdG9yZSByZWYgdG8gc2VsZiBoZXJlXG5cdCAgLy8gYmVjYXVzZSB0aGVzZSBnZXR0ZXIvc2V0dGVycyBtaWdodFxuXHQgIC8vIGJlIGNhbGxlZCBieSBjaGlsZCBpbnN0YW5jZXMhXG5cdCAgdmFyIHNlbGYgPSB0aGlzXG5cdCAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIGtleSwge1xuXHQgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuXHQgICAgZW51bWVyYWJsZTogdHJ1ZSxcblx0ICAgIGdldDogZnVuY3Rpb24gcHJveHlHZXR0ZXIgKCkge1xuXHQgICAgICByZXR1cm4gc2VsZi5fZGF0YVtrZXldXG5cdCAgICB9LFxuXHQgICAgc2V0OiBmdW5jdGlvbiBwcm94eVNldHRlciAodmFsKSB7XG5cdCAgICAgIHNlbGYuX2RhdGFba2V5XSA9IHZhbFxuXHQgICAgfVxuXHQgIH0pXG5cdH1cblxuXHQvKipcblx0ICogVW5wcm94eSBhIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqL1xuXG5cdGV4cG9ydHMuX3VucHJveHkgPSBmdW5jdGlvbiAoa2V5KSB7XG5cdCAgZGVsZXRlIHRoaXNba2V5XVxuXHR9XG5cblx0LyoqXG5cdCAqIEZvcmNlIHVwZGF0ZSBvbiBldmVyeSB3YXRjaGVyIGluIHNjb3BlLlxuXHQgKi9cblxuXHRleHBvcnRzLl9kaWdlc3QgPSBmdW5jdGlvbiAoKSB7XG5cdCAgdmFyIGkgPSB0aGlzLl93YXRjaGVyTGlzdC5sZW5ndGhcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICB0aGlzLl93YXRjaGVyTGlzdFtpXS51cGRhdGUoKVxuXHQgIH1cblx0ICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlblxuXHQgIHZhciBjaGlsZFxuXHQgIGlmIChjaGlsZHJlbikge1xuXHQgICAgaSA9IGNoaWxkcmVuLmxlbmd0aFxuXHQgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldXG5cdCAgICAgIGlmIChjaGlsZC4kb3B0aW9ucy5pbmhlcml0KSB7XG5cdCAgICAgICAgY2hpbGQuX2RpZ2VzdCgpXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogU2V0dXAgY29tcHV0ZWQgcHJvcGVydGllcy4gVGhleSBhcmUgZXNzZW50aWFsbHlcblx0ICogc3BlY2lhbCBnZXR0ZXIvc2V0dGVyc1xuXHQgKi9cblxuXHRmdW5jdGlvbiBub29wICgpIHt9XG5cdGV4cG9ydHMuX2luaXRDb21wdXRlZCA9IGZ1bmN0aW9uICgpIHtcblx0ICB2YXIgY29tcHV0ZWQgPSB0aGlzLiRvcHRpb25zLmNvbXB1dGVkXG5cdCAgaWYgKGNvbXB1dGVkKSB7XG5cdCAgICBmb3IgKHZhciBrZXkgaW4gY29tcHV0ZWQpIHtcblx0ICAgICAgdmFyIHVzZXJEZWYgPSBjb21wdXRlZFtrZXldXG5cdCAgICAgIHZhciBkZWYgPSB7XG5cdCAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcblx0ICAgICAgICBjb25maWd1cmFibGU6IHRydWVcblx0ICAgICAgfVxuXHQgICAgICBpZiAodHlwZW9mIHVzZXJEZWYgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICBkZWYuZ2V0ID0gXy5iaW5kKHVzZXJEZWYsIHRoaXMpXG5cdCAgICAgICAgZGVmLnNldCA9IG5vb3Bcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBkZWYuZ2V0ID0gdXNlckRlZi5nZXRcblx0ICAgICAgICAgID8gXy5iaW5kKHVzZXJEZWYuZ2V0LCB0aGlzKVxuXHQgICAgICAgICAgOiBub29wXG5cdCAgICAgICAgZGVmLnNldCA9IHVzZXJEZWYuc2V0XG5cdCAgICAgICAgICA/IF8uYmluZCh1c2VyRGVmLnNldCwgdGhpcylcblx0ICAgICAgICAgIDogbm9vcFxuXHQgICAgICB9XG5cdCAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIGRlZilcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogU2V0dXAgaW5zdGFuY2UgbWV0aG9kcy4gTWV0aG9kcyBtdXN0IGJlIGJvdW5kIHRvIHRoZVxuXHQgKiBpbnN0YW5jZSBzaW5jZSB0aGV5IG1pZ2h0IGJlIGNhbGxlZCBieSBjaGlsZHJlblxuXHQgKiBpbmhlcml0aW5nIHRoZW0uXG5cdCAqL1xuXG5cdGV4cG9ydHMuX2luaXRNZXRob2RzID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBtZXRob2RzID0gdGhpcy4kb3B0aW9ucy5tZXRob2RzXG5cdCAgaWYgKG1ldGhvZHMpIHtcblx0ICAgIGZvciAodmFyIGtleSBpbiBtZXRob2RzKSB7XG5cdCAgICAgIHRoaXNba2V5XSA9IF8uYmluZChtZXRob2RzW2tleV0sIHRoaXMpXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgbWV0YSBpbmZvcm1hdGlvbiBsaWtlICRpbmRleCwgJGtleSAmICR2YWx1ZS5cblx0ICovXG5cblx0ZXhwb3J0cy5faW5pdE1ldGEgPSBmdW5jdGlvbiAoKSB7XG5cdCAgdmFyIG1ldGFzID0gdGhpcy4kb3B0aW9ucy5fbWV0YVxuXHQgIGlmIChtZXRhcykge1xuXHQgICAgZm9yICh2YXIga2V5IGluIG1ldGFzKSB7XG5cdCAgICAgIHRoaXMuX2RlZmluZU1ldGEoa2V5LCBtZXRhc1trZXldKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmUgYSBtZXRhIHByb3BlcnR5LCBlLmcgJGluZGV4LCAka2V5LCAkdmFsdWVcblx0ICogd2hpY2ggb25seSBleGlzdHMgb24gdGhlIHZtIGluc3RhbmNlIGJ1dCBub3QgaW4gJGRhdGEuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxuXHQgKi9cblxuXHRleHBvcnRzLl9kZWZpbmVNZXRhID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0ICB2YXIgYmluZGluZyA9IG5ldyBCaW5kaW5nKClcblx0ICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XG5cdCAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXHQgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuXHQgICAgZ2V0OiBmdW5jdGlvbiBtZXRhR2V0dGVyICgpIHtcblx0ICAgICAgaWYgKE9ic2VydmVyLnRhcmdldCkge1xuXHQgICAgICAgIE9ic2VydmVyLnRhcmdldC5hZGREZXAoYmluZGluZylcblx0ICAgICAgfVxuXHQgICAgICByZXR1cm4gdmFsdWVcblx0ICAgIH0sXG5cdCAgICBzZXQ6IGZ1bmN0aW9uIG1ldGFTZXR0ZXIgKHZhbCkge1xuXHQgICAgICBpZiAodmFsICE9PSB2YWx1ZSkge1xuXHQgICAgICAgIHZhbHVlID0gdmFsXG5cdCAgICAgICAgYmluZGluZy5ub3RpZnkoKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSlcblx0fVxuXG4vKioqLyB9LFxuLyogMTMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgRGlyZWN0aXZlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NSlcblx0dmFyIGNvbXBpbGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQzKVxuXHR2YXIgdHJhbnNjbHVkZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDYpXG5cblx0LyoqXG5cdCAqIFRyYW5zY2x1ZGUsIGNvbXBpbGUgYW5kIGxpbmsgZWxlbWVudC5cblx0ICpcblx0ICogSWYgYSBwcmUtY29tcGlsZWQgbGlua2VyIGlzIGF2YWlsYWJsZSwgdGhhdCBtZWFucyB0aGVcblx0ICogcGFzc2VkIGluIGVsZW1lbnQgd2lsbCBiZSBwcmUtdHJhbnNjbHVkZWQgYW5kIGNvbXBpbGVkXG5cdCAqIGFzIHdlbGwgLSBhbGwgd2UgbmVlZCB0byBkbyBpcyB0byBjYWxsIHRoZSBsaW5rZXIuXG5cdCAqXG5cdCAqIE90aGVyd2lzZSB3ZSBuZWVkIHRvIGNhbGwgdHJhbnNjbHVkZS9jb21waWxlL2xpbmsgaGVyZS5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcmV0dXJuIHtFbGVtZW50fVxuXHQgKi9cblxuXHRleHBvcnRzLl9jb21waWxlID0gZnVuY3Rpb24gKGVsKSB7XG5cdCAgdmFyIG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zXG5cdCAgaWYgKG9wdGlvbnMuX2xpbmtlcikge1xuXHQgICAgdGhpcy5faW5pdEVsZW1lbnQoZWwpXG5cdCAgICBvcHRpb25zLl9saW5rZXIodGhpcywgZWwpXG5cdCAgfSBlbHNlIHtcblx0ICAgIHZhciByYXcgPSBlbFxuXHQgICAgZWwgPSB0cmFuc2NsdWRlKGVsLCBvcHRpb25zKVxuXHQgICAgdGhpcy5faW5pdEVsZW1lbnQoZWwpXG5cdCAgICB2YXIgbGlua2VyID0gY29tcGlsZShlbCwgb3B0aW9ucylcblx0ICAgIGxpbmtlcih0aGlzLCBlbClcblx0ICAgIGlmIChvcHRpb25zLnJlcGxhY2UpIHtcblx0ICAgICAgXy5yZXBsYWNlKHJhdywgZWwpXG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiBlbFxuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgaW5zdGFuY2UgZWxlbWVudC4gQ2FsbGVkIGluIHRoZSBwdWJsaWNcblx0ICogJG1vdW50KCkgbWV0aG9kLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqL1xuXG5cdGV4cG9ydHMuX2luaXRFbGVtZW50ID0gZnVuY3Rpb24gKGVsKSB7XG5cdCAgaWYgKGVsIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuXHQgICAgdGhpcy5faXNCbG9jayA9IHRydWVcblx0ICAgIHRoaXMuJGVsID0gdGhpcy5fYmxvY2tTdGFydCA9IGVsLmZpcnN0Q2hpbGRcblx0ICAgIHRoaXMuX2Jsb2NrRW5kID0gZWwubGFzdENoaWxkXG5cdCAgICB0aGlzLl9ibG9ja0ZyYWdtZW50ID0gZWxcblx0ICB9IGVsc2Uge1xuXHQgICAgdGhpcy4kZWwgPSBlbFxuXHQgIH1cblx0ICB0aGlzLiRlbC5fX3Z1ZV9fID0gdGhpc1xuXHQgIHRoaXMuX2NhbGxIb29rKCdiZWZvcmVDb21waWxlJylcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYW5kIGJpbmQgYSBkaXJlY3RpdmUgdG8gYW4gZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBkaXJlY3RpdmUgbmFtZVxuXHQgKiBAcGFyYW0ge05vZGV9IG5vZGUgICAtIHRhcmdldCBub2RlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkZXNjIC0gcGFyc2VkIGRpcmVjdGl2ZSBkZXNjcmlwdG9yXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkZWYgIC0gZGlyZWN0aXZlIGRlZmluaXRpb24gb2JqZWN0XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtsaW5rZXJdIC0gcHJlLWNvbXBpbGVkIGxpbmtlciBmblxuXHQgKi9cblxuXHRleHBvcnRzLl9iaW5kRGlyID0gZnVuY3Rpb24gKG5hbWUsIG5vZGUsIGRlc2MsIGRlZiwgbGlua2VyKSB7XG5cdCAgdGhpcy5fZGlyZWN0aXZlcy5wdXNoKFxuXHQgICAgbmV3IERpcmVjdGl2ZShuYW1lLCBub2RlLCB0aGlzLCBkZXNjLCBkZWYsIGxpbmtlcilcblx0ICApXG5cdH1cblxuLyoqKi8gfSxcbi8qIDE0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGV4dGVuZCA9IF8uZXh0ZW5kXG5cblx0LyoqXG5cdCAqIE9wdGlvbiBvdmVyd3JpdGluZyBzdHJhdGVnaWVzIGFyZSBmdW5jdGlvbnMgdGhhdCBoYW5kbGVcblx0ICogaG93IHRvIG1lcmdlIGEgcGFyZW50IG9wdGlvbiB2YWx1ZSBhbmQgYSBjaGlsZCBvcHRpb25cblx0ICogdmFsdWUgaW50byB0aGUgZmluYWwgdmFsdWUuXG5cdCAqXG5cdCAqIEFsbCBzdHJhdGVneSBmdW5jdGlvbnMgZm9sbG93IHRoZSBzYW1lIHNpZ25hdHVyZTpcblx0ICpcblx0ICogQHBhcmFtIHsqfSBwYXJlbnRWYWxcblx0ICogQHBhcmFtIHsqfSBjaGlsZFZhbFxuXHQgKiBAcGFyYW0ge1Z1ZX0gW3ZtXVxuXHQgKi9cblxuXHR2YXIgc3RyYXRzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG5cdC8qKlxuXHQgKiBEYXRhXG5cdCAqL1xuXG5cdHN0cmF0cy5kYXRhID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwsIHZtKSB7XG5cdCAgLy8gaW4gYSBjbGFzcyBtZXJnZSwgYm90aCBzaG91bGQgYmUgZnVuY3Rpb25zXG5cdCAgLy8gc28gd2UganVzdCByZXR1cm4gY2hpbGQgaWYgaXQgZXhpc3RzXG5cdCAgaWYgKCF2bSkge1xuXHQgICAgaWYgKGNoaWxkVmFsICYmIHR5cGVvZiBjaGlsZFZhbCAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICBfLndhcm4oXG5cdCAgICAgICAgJ1RoZSBcImRhdGFcIiBvcHRpb24gc2hvdWxkIGJlIGEgZnVuY3Rpb24gJyArXG5cdCAgICAgICAgJ3RoYXQgcmV0dXJucyBhIHBlci1pbnN0YW5jZSB2YWx1ZSBpbiBjb21wb25lbnQgJyArXG5cdCAgICAgICAgJ2RlZmluaXRpb25zLidcblx0ICAgICAgKVxuXHQgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIHJldHVybiBjaGlsZFZhbCB8fCBwYXJlbnRWYWxcblx0ICB9XG5cdCAgdmFyIGluc3RhbmNlRGF0YSA9IHR5cGVvZiBjaGlsZFZhbCA9PT0gJ2Z1bmN0aW9uJ1xuXHQgICAgPyBjaGlsZFZhbC5jYWxsKHZtKVxuXHQgICAgOiBjaGlsZFZhbFxuXHQgIHZhciBkZWZhdWx0RGF0YSA9IHR5cGVvZiBwYXJlbnRWYWwgPT09ICdmdW5jdGlvbidcblx0ICAgID8gcGFyZW50VmFsLmNhbGwodm0pXG5cdCAgICA6IHVuZGVmaW5lZFxuXHQgIGlmIChpbnN0YW5jZURhdGEpIHtcblx0ICAgIC8vIG1peCBkZWZhdWx0IGRhdGEgaW50byBpbnN0YW5jZSBkYXRhXG5cdCAgICBmb3IgKHZhciBrZXkgaW4gZGVmYXVsdERhdGEpIHtcblx0ICAgICAgaWYgKCFpbnN0YW5jZURhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHQgICAgICAgIGluc3RhbmNlRGF0YS4kYWRkKGtleSwgZGVmYXVsdERhdGFba2V5XSlcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGluc3RhbmNlRGF0YVxuXHQgIH0gZWxzZSB7XG5cdCAgICByZXR1cm4gZGVmYXVsdERhdGFcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogRWxcblx0ICovXG5cblx0c3RyYXRzLmVsID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwsIHZtKSB7XG5cdCAgaWYgKCF2bSAmJiBjaGlsZFZhbCAmJiB0eXBlb2YgY2hpbGRWYWwgIT09ICdmdW5jdGlvbicpIHtcblx0ICAgIF8ud2Fybihcblx0ICAgICAgJ1RoZSBcImVsXCIgb3B0aW9uIHNob3VsZCBiZSBhIGZ1bmN0aW9uICcgK1xuXHQgICAgICAndGhhdCByZXR1cm5zIGEgcGVyLWluc3RhbmNlIHZhbHVlIGluIGNvbXBvbmVudCAnICtcblx0ICAgICAgJ2RlZmluaXRpb25zLidcblx0ICAgIClcblx0ICAgIHJldHVyblxuXHQgIH1cblx0ICB2YXIgcmV0ID0gY2hpbGRWYWwgfHwgcGFyZW50VmFsXG5cdCAgLy8gaW52b2tlIHRoZSBlbGVtZW50IGZhY3RvcnkgaWYgdGhpcyBpcyBpbnN0YW5jZSBtZXJnZVxuXHQgIHJldHVybiB2bSAmJiB0eXBlb2YgcmV0ID09PSAnZnVuY3Rpb24nXG5cdCAgICA/IHJldC5jYWxsKHZtKVxuXHQgICAgOiByZXRcblx0fVxuXG5cdC8qKlxuXHQgKiBIb29rcyBhbmQgcGFyYW0gYXR0cmlidXRlcyBhcmUgbWVyZ2VkIGFzIGFycmF5cy5cblx0ICovXG5cblx0c3RyYXRzLmNyZWF0ZWQgPVxuXHRzdHJhdHMucmVhZHkgPVxuXHRzdHJhdHMuYXR0YWNoZWQgPVxuXHRzdHJhdHMuZGV0YWNoZWQgPVxuXHRzdHJhdHMuYmVmb3JlQ29tcGlsZSA9XG5cdHN0cmF0cy5jb21waWxlZCA9XG5cdHN0cmF0cy5iZWZvcmVEZXN0cm95ID1cblx0c3RyYXRzLmRlc3Ryb3llZCA9XG5cdHN0cmF0cy5wYXJhbUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuXHQgIHJldHVybiBjaGlsZFZhbFxuXHQgICAgPyBwYXJlbnRWYWxcblx0ICAgICAgPyBwYXJlbnRWYWwuY29uY2F0KGNoaWxkVmFsKVxuXHQgICAgICA6IF8uaXNBcnJheShjaGlsZFZhbClcblx0ICAgICAgICA/IGNoaWxkVmFsXG5cdCAgICAgICAgOiBbY2hpbGRWYWxdXG5cdCAgICA6IHBhcmVudFZhbFxuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2V0c1xuXHQgKlxuXHQgKiBXaGVuIGEgdm0gaXMgcHJlc2VudCAoaW5zdGFuY2UgY3JlYXRpb24pLCB3ZSBuZWVkIHRvIGRvXG5cdCAqIGEgdGhyZWUtd2F5IG1lcmdlIGJldHdlZW4gY29uc3RydWN0b3Igb3B0aW9ucywgaW5zdGFuY2Vcblx0ICogb3B0aW9ucyBhbmQgcGFyZW50IG9wdGlvbnMuXG5cdCAqL1xuXG5cdHN0cmF0cy5kaXJlY3RpdmVzID1cblx0c3RyYXRzLmZpbHRlcnMgPVxuXHRzdHJhdHMucGFydGlhbHMgPVxuXHRzdHJhdHMudHJhbnNpdGlvbnMgPVxuXHRzdHJhdHMuY29tcG9uZW50cyA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsLCB2bSwga2V5KSB7XG5cdCAgdmFyIHJldCA9IE9iamVjdC5jcmVhdGUoXG5cdCAgICB2bSAmJiB2bS4kcGFyZW50XG5cdCAgICAgID8gdm0uJHBhcmVudC4kb3B0aW9uc1trZXldXG5cdCAgICAgIDogXy5WdWUub3B0aW9uc1trZXldXG5cdCAgKVxuXHQgIGlmIChwYXJlbnRWYWwpIHtcblx0ICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocGFyZW50VmFsKVxuXHQgICAgdmFyIGkgPSBrZXlzLmxlbmd0aFxuXHQgICAgdmFyIGZpZWxkXG5cdCAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgIGZpZWxkID0ga2V5c1tpXVxuXHQgICAgICByZXRbZmllbGRdID0gcGFyZW50VmFsW2ZpZWxkXVxuXHQgICAgfVxuXHQgIH1cblx0ICBpZiAoY2hpbGRWYWwpIGV4dGVuZChyZXQsIGNoaWxkVmFsKVxuXHQgIHJldHVybiByZXRcblx0fVxuXG5cdC8qKlxuXHQgKiBFdmVudHMgJiBXYXRjaGVycy5cblx0ICpcblx0ICogRXZlbnRzICYgd2F0Y2hlcnMgaGFzaGVzIHNob3VsZCBub3Qgb3ZlcndyaXRlIG9uZVxuXHQgKiBhbm90aGVyLCBzbyB3ZSBtZXJnZSB0aGVtIGFzIGFycmF5cy5cblx0ICovXG5cblx0c3RyYXRzLndhdGNoID1cblx0c3RyYXRzLmV2ZW50cyA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG5cdCAgaWYgKCFjaGlsZFZhbCkgcmV0dXJuIHBhcmVudFZhbFxuXHQgIGlmICghcGFyZW50VmFsKSByZXR1cm4gY2hpbGRWYWxcblx0ICB2YXIgcmV0ID0ge31cblx0ICBleHRlbmQocmV0LCBwYXJlbnRWYWwpXG5cdCAgZm9yICh2YXIga2V5IGluIGNoaWxkVmFsKSB7XG5cdCAgICB2YXIgcGFyZW50ID0gcmV0W2tleV1cblx0ICAgIHZhciBjaGlsZCA9IGNoaWxkVmFsW2tleV1cblx0ICAgIHJldFtrZXldID0gcGFyZW50XG5cdCAgICAgID8gcGFyZW50LmNvbmNhdChjaGlsZClcblx0ICAgICAgOiBbY2hpbGRdXG5cdCAgfVxuXHQgIHJldHVybiByZXRcblx0fVxuXG5cdC8qKlxuXHQgKiBPdGhlciBvYmplY3QgaGFzaGVzLlxuXHQgKi9cblxuXHRzdHJhdHMubWV0aG9kcyA9XG5cdHN0cmF0cy5jb21wdXRlZCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG5cdCAgaWYgKCFjaGlsZFZhbCkgcmV0dXJuIHBhcmVudFZhbFxuXHQgIGlmICghcGFyZW50VmFsKSByZXR1cm4gY2hpbGRWYWxcblx0ICB2YXIgcmV0ID0gT2JqZWN0LmNyZWF0ZShwYXJlbnRWYWwpXG5cdCAgZXh0ZW5kKHJldCwgY2hpbGRWYWwpXG5cdCAgcmV0dXJuIHJldFxuXHR9XG5cblx0LyoqXG5cdCAqIERlZmF1bHQgc3RyYXRlZ3kuXG5cdCAqL1xuXG5cdHZhciBkZWZhdWx0U3RyYXQgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuXHQgIHJldHVybiBjaGlsZFZhbCA9PT0gdW5kZWZpbmVkXG5cdCAgICA/IHBhcmVudFZhbFxuXHQgICAgOiBjaGlsZFZhbFxuXHR9XG5cblx0LyoqXG5cdCAqIE1ha2Ugc3VyZSBjb21wb25lbnQgb3B0aW9ucyBnZXQgY29udmVydGVkIHRvIGFjdHVhbFxuXHQgKiBjb25zdHJ1Y3RvcnMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnRzXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGd1YXJkQ29tcG9uZW50cyAoY29tcG9uZW50cykge1xuXHQgIGlmIChjb21wb25lbnRzKSB7XG5cdCAgICB2YXIgZGVmXG5cdCAgICBmb3IgKHZhciBrZXkgaW4gY29tcG9uZW50cykge1xuXHQgICAgICBkZWYgPSBjb21wb25lbnRzW2tleV1cblx0ICAgICAgaWYgKF8uaXNQbGFpbk9iamVjdChkZWYpKSB7XG5cdCAgICAgICAgZGVmLm5hbWUgPSBrZXlcblx0ICAgICAgICBjb21wb25lbnRzW2tleV0gPSBfLlZ1ZS5leHRlbmQoZGVmKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIE1lcmdlIHR3byBvcHRpb24gb2JqZWN0cyBpbnRvIGEgbmV3IG9uZS5cblx0ICogQ29yZSB1dGlsaXR5IHVzZWQgaW4gYm90aCBpbnN0YW50aWF0aW9uIGFuZCBpbmhlcml0YW5jZS5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHBhcmVudFxuXHQgKiBAcGFyYW0ge09iamVjdH0gY2hpbGRcblx0ICogQHBhcmFtIHtWdWV9IFt2bV0gLSBpZiB2bSBpcyBwcmVzZW50LCBpbmRpY2F0ZXMgdGhpcyBpc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgIGFuIGluc3RhbnRpYXRpb24gbWVyZ2UuXG5cdCAqL1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VPcHRpb25zIChwYXJlbnQsIGNoaWxkLCB2bSkge1xuXHQgIGd1YXJkQ29tcG9uZW50cyhjaGlsZC5jb21wb25lbnRzKVxuXHQgIHZhciBvcHRpb25zID0ge31cblx0ICB2YXIga2V5XG5cdCAgZm9yIChrZXkgaW4gcGFyZW50KSB7XG5cdCAgICBtZXJnZShwYXJlbnRba2V5XSwgY2hpbGRba2V5XSwga2V5KVxuXHQgIH1cblx0ICBmb3IgKGtleSBpbiBjaGlsZCkge1xuXHQgICAgaWYgKCEocGFyZW50Lmhhc093blByb3BlcnR5KGtleSkpKSB7XG5cdCAgICAgIG1lcmdlKHBhcmVudFtrZXldLCBjaGlsZFtrZXldLCBrZXkpXG5cdCAgICB9XG5cdCAgfVxuXHQgIHZhciBtaXhpbnMgPSBjaGlsZC5taXhpbnNcblx0ICBpZiAobWl4aW5zKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgbCA9IG1peGlucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgICAgZm9yIChrZXkgaW4gbWl4aW5zW2ldKSB7XG5cdCAgICAgICAgbWVyZ2Uob3B0aW9uc1trZXldLCBtaXhpbnNbaV1ba2V5XSwga2V5KVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHQgIGZ1bmN0aW9uIG1lcmdlIChwYXJlbnRWYWwsIGNoaWxkVmFsLCBrZXkpIHtcblx0ICAgIHZhciBzdHJhdCA9IHN0cmF0c1trZXldIHx8IGRlZmF1bHRTdHJhdFxuXHQgICAgb3B0aW9uc1trZXldID0gc3RyYXQocGFyZW50VmFsLCBjaGlsZFZhbCwgdm0sIGtleSlcblx0ICB9XG5cdCAgcmV0dXJuIG9wdGlvbnNcblx0fVxuXG4vKioqLyB9LFxuLyogMTUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgLyoqXG5cdCAgICogVGhlIHByZWZpeCB0byBsb29rIGZvciB3aGVuIHBhcnNpbmcgZGlyZWN0aXZlcy5cblx0ICAgKlxuXHQgICAqIEB0eXBlIHtTdHJpbmd9XG5cdCAgICovXG5cblx0ICBwcmVmaXg6ICd2LScsXG5cblx0ICAvKipcblx0ICAgKiBXaGV0aGVyIHRvIHByaW50IGRlYnVnIG1lc3NhZ2VzLlxuXHQgICAqIEFsc28gZW5hYmxlcyBzdGFjayB0cmFjZSBmb3Igd2FybmluZ3MuXG5cdCAgICpcblx0ICAgKiBAdHlwZSB7Qm9vbGVhbn1cblx0ICAgKi9cblxuXHQgIGRlYnVnOiBmYWxzZSxcblxuXHQgIC8qKlxuXHQgICAqIFdoZXRoZXIgdG8gc3VwcHJlc3Mgd2FybmluZ3MuXG5cdCAgICpcblx0ICAgKiBAdHlwZSB7Qm9vbGVhbn1cblx0ICAgKi9cblxuXHQgIHNpbGVudDogZmFsc2UsXG5cblx0ICAvKipcblx0ICAgKiBXaGV0aGVyIGFsbG93IG9ic2VydmVyIHRvIGFsdGVyIGRhdGEgb2JqZWN0cydcblx0ICAgKiBfX3Byb3RvX18uXG5cdCAgICpcblx0ICAgKiBAdHlwZSB7Qm9vbGVhbn1cblx0ICAgKi9cblxuXHQgIHByb3RvOiB0cnVlLFxuXG5cdCAgLyoqXG5cdCAgICogV2hldGhlciB0byBwYXJzZSBtdXN0YWNoZSB0YWdzIGluIHRlbXBsYXRlcy5cblx0ICAgKlxuXHQgICAqIEB0eXBlIHtCb29sZWFufVxuXHQgICAqL1xuXG5cdCAgaW50ZXJwb2xhdGU6IHRydWUsXG5cblx0ICAvKipcblx0ICAgKiBXaGV0aGVyIHRvIHVzZSBhc3luYyByZW5kZXJpbmcuXG5cdCAgICovXG5cblx0ICBhc3luYzogdHJ1ZSxcblxuXHQgIC8qKlxuXHQgICAqIEludGVybmFsIGZsYWcgdG8gaW5kaWNhdGUgdGhlIGRlbGltaXRlcnMgaGF2ZSBiZWVuXG5cdCAgICogY2hhbmdlZC5cblx0ICAgKlxuXHQgICAqIEB0eXBlIHtCb29sZWFufVxuXHQgICAqL1xuXG5cdCAgX2RlbGltaXRlcnNDaGFuZ2VkOiB0cnVlXG5cblx0fVxuXG5cdC8qKlxuXHQgKiBJbnRlcnBvbGF0aW9uIGRlbGltaXRlcnMuXG5cdCAqIFdlIG5lZWQgdG8gbWFyayB0aGUgY2hhbmdlZCBmbGFnIHNvIHRoYXQgdGhlIHRleHQgcGFyc2VyXG5cdCAqIGtub3dzIGl0IG5lZWRzIHRvIHJlY29tcGlsZSB0aGUgcmVnZXguXG5cdCAqXG5cdCAqIEB0eXBlIHtBcnJheTxTdHJpbmc+fVxuXHQgKi9cblxuXHR2YXIgZGVsaW1pdGVycyA9IFsne3snLCAnfX0nXVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLmV4cG9ydHMsICdkZWxpbWl0ZXJzJywge1xuXHQgIGdldDogZnVuY3Rpb24gKCkge1xuXHQgICAgcmV0dXJuIGRlbGltaXRlcnNcblx0ICB9LFxuXHQgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuXHQgICAgZGVsaW1pdGVycyA9IHZhbFxuXHQgICAgdGhpcy5fZGVsaW1pdGVyc0NoYW5nZWQgPSB0cnVlXG5cdCAgfVxuXHR9KVxuXG4vKioqLyB9LFxuLyogMTYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgY29uZmlnID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSlcblx0dmFyIE9ic2VydmVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OClcblx0dmFyIGV4cFBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNDEpXG5cdHZhciBCYXRjaGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OSlcblxuXHR2YXIgYmF0Y2hlciA9IG5ldyBCYXRjaGVyKClcblx0dmFyIHVpZCA9IDBcblxuXHQvKipcblx0ICogQSB3YXRjaGVyIHBhcnNlcyBhbiBleHByZXNzaW9uLCBjb2xsZWN0cyBkZXBlbmRlbmNpZXMsXG5cdCAqIGFuZCBmaXJlcyBjYWxsYmFjayB3aGVuIHRoZSBleHByZXNzaW9uIHZhbHVlIGNoYW5nZXMuXG5cdCAqIFRoaXMgaXMgdXNlZCBmb3IgYm90aCB0aGUgJHdhdGNoKCkgYXBpIGFuZCBkaXJlY3RpdmVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICogQHBhcmFtIHtTdHJpbmd9IGV4cHJlc3Npb25cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2Jcblx0ICogQHBhcmFtIHtBcnJheX0gW2ZpbHRlcnNdXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW25lZWRTZXRdXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW2RlZXBdXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblxuXHRmdW5jdGlvbiBXYXRjaGVyICh2bSwgZXhwcmVzc2lvbiwgY2IsIGZpbHRlcnMsIG5lZWRTZXQsIGRlZXApIHtcblx0ICB0aGlzLnZtID0gdm1cblx0ICB2bS5fd2F0Y2hlckxpc3QucHVzaCh0aGlzKVxuXHQgIHRoaXMuZXhwcmVzc2lvbiA9IGV4cHJlc3Npb25cblx0ICB0aGlzLmNicyA9IFtjYl1cblx0ICB0aGlzLmlkID0gKyt1aWQgLy8gdWlkIGZvciBiYXRjaGluZ1xuXHQgIHRoaXMuYWN0aXZlID0gdHJ1ZVxuXHQgIHRoaXMuZGVlcCA9IGRlZXBcblx0ICB0aGlzLmRlcHMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cdCAgLy8gc2V0dXAgZmlsdGVycyBpZiBhbnkuXG5cdCAgLy8gV2UgZGVsZWdhdGUgZGlyZWN0aXZlIGZpbHRlcnMgaGVyZSB0byB0aGUgd2F0Y2hlclxuXHQgIC8vIGJlY2F1c2UgdGhleSBuZWVkIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBkZXBlbmRlbmN5XG5cdCAgLy8gY29sbGVjdGlvbiBwcm9jZXNzLlxuXHQgIHRoaXMucmVhZEZpbHRlcnMgPSBmaWx0ZXJzICYmIGZpbHRlcnMucmVhZFxuXHQgIHRoaXMud3JpdGVGaWx0ZXJzID0gZmlsdGVycyAmJiBmaWx0ZXJzLndyaXRlXG5cdCAgLy8gcGFyc2UgZXhwcmVzc2lvbiBmb3IgZ2V0dGVyL3NldHRlclxuXHQgIHZhciByZXMgPSBleHBQYXJzZXIucGFyc2UoZXhwcmVzc2lvbiwgbmVlZFNldClcblx0ICB0aGlzLmdldHRlciA9IHJlcy5nZXRcblx0ICB0aGlzLnNldHRlciA9IHJlcy5zZXRcblx0ICB0aGlzLnZhbHVlID0gdGhpcy5nZXQoKVxuXHR9XG5cblx0dmFyIHAgPSBXYXRjaGVyLnByb3RvdHlwZVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBiaW5kaW5nIGRlcGVuZGVuY3kgdG8gdGhpcyBkaXJlY3RpdmUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7QmluZGluZ30gYmluZGluZ1xuXHQgKi9cblxuXHRwLmFkZERlcCA9IGZ1bmN0aW9uIChiaW5kaW5nKSB7XG5cdCAgdmFyIGlkID0gYmluZGluZy5pZFxuXHQgIGlmICghdGhpcy5uZXdEZXBzW2lkXSkge1xuXHQgICAgdGhpcy5uZXdEZXBzW2lkXSA9IGJpbmRpbmdcblx0ICAgIGlmICghdGhpcy5kZXBzW2lkXSkge1xuXHQgICAgICB0aGlzLmRlcHNbaWRdID0gYmluZGluZ1xuXHQgICAgICBiaW5kaW5nLmFkZFN1Yih0aGlzKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBFdmFsdWF0ZSB0aGUgZ2V0dGVyLCBhbmQgcmUtY29sbGVjdCBkZXBlbmRlbmNpZXMuXG5cdCAqL1xuXG5cdHAuZ2V0ID0gZnVuY3Rpb24gKCkge1xuXHQgIHRoaXMuYmVmb3JlR2V0KClcblx0ICB2YXIgdm0gPSB0aGlzLnZtXG5cdCAgdmFyIHZhbHVlXG5cdCAgdHJ5IHtcblx0ICAgIHZhbHVlID0gdGhpcy5nZXR0ZXIuY2FsbCh2bSwgdm0pXG5cdCAgfSBjYXRjaCAoZSkge31cblx0ICAvLyB1c2UgSlNPTi5zdHJpbmdpZnkgdG8gXCJ0b3VjaFwiIGV2ZXJ5IHByb3BlcnR5XG5cdCAgLy8gc28gdGhleSBhcmUgYWxsIHRyYWNrZWQgYXMgZGVwZW5kZW5jaWVzIGZvclxuXHQgIC8vIGRlZXAgd2F0Y2hpbmdcblx0ICBpZiAodGhpcy5kZWVwKSBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcblx0ICB2YWx1ZSA9IF8uYXBwbHlGaWx0ZXJzKHZhbHVlLCB0aGlzLnJlYWRGaWx0ZXJzLCB2bSlcblx0ICB0aGlzLmFmdGVyR2V0KClcblx0ICByZXR1cm4gdmFsdWVcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgd2l0aCB0aGUgc2V0dGVyLlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAqL1xuXG5cdHAuc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgdmFyIHZtID0gdGhpcy52bVxuXHQgIHZhbHVlID0gXy5hcHBseUZpbHRlcnMoXG5cdCAgICB2YWx1ZSwgdGhpcy53cml0ZUZpbHRlcnMsIHZtLCB0aGlzLnZhbHVlXG5cdCAgKVxuXHQgIHRyeSB7XG5cdCAgICB0aGlzLnNldHRlci5jYWxsKHZtLCB2bSwgdmFsdWUpXG5cdCAgfSBjYXRjaCAoZSkge31cblx0fVxuXG5cdC8qKlxuXHQgKiBQcmVwYXJlIGZvciBkZXBlbmRlbmN5IGNvbGxlY3Rpb24uXG5cdCAqL1xuXG5cdHAuYmVmb3JlR2V0ID0gZnVuY3Rpb24gKCkge1xuXHQgIE9ic2VydmVyLnRhcmdldCA9IHRoaXNcblx0ICB0aGlzLm5ld0RlcHMgPSB7fVxuXHR9XG5cblx0LyoqXG5cdCAqIENsZWFuIHVwIGZvciBkZXBlbmRlbmN5IGNvbGxlY3Rpb24uXG5cdCAqL1xuXG5cdHAuYWZ0ZXJHZXQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgT2JzZXJ2ZXIudGFyZ2V0ID0gbnVsbFxuXHQgIGZvciAodmFyIGlkIGluIHRoaXMuZGVwcykge1xuXHQgICAgaWYgKCF0aGlzLm5ld0RlcHNbaWRdKSB7XG5cdCAgICAgIHRoaXMuZGVwc1tpZF0ucmVtb3ZlU3ViKHRoaXMpXG5cdCAgICB9XG5cdCAgfVxuXHQgIHRoaXMuZGVwcyA9IHRoaXMubmV3RGVwc1xuXHR9XG5cblx0LyoqXG5cdCAqIFN1YnNjcmliZXIgaW50ZXJmYWNlLlxuXHQgKiBXaWxsIGJlIGNhbGxlZCB3aGVuIGEgZGVwZW5kZW5jeSBjaGFuZ2VzLlxuXHQgKi9cblxuXHRwLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0ICBpZiAoY29uZmlnLmFzeW5jKSB7XG5cdCAgICBiYXRjaGVyLnB1c2godGhpcylcblx0ICB9IGVsc2Uge1xuXHQgICAgdGhpcy5ydW4oKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBCYXRjaGVyIGpvYiBpbnRlcmZhY2UuXG5cdCAqIFdpbGwgYmUgY2FsbGVkIGJ5IHRoZSBiYXRjaGVyLlxuXHQgKi9cblxuXHRwLnJ1biA9IGZ1bmN0aW9uICgpIHtcblx0ICBpZiAodGhpcy5hY3RpdmUpIHtcblx0ICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0KClcblx0ICAgIGlmIChcblx0ICAgICAgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGwpIHx8XG5cdCAgICAgIHZhbHVlICE9PSB0aGlzLnZhbHVlXG5cdCAgICApIHtcblx0ICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZVxuXHQgICAgICB0aGlzLnZhbHVlID0gdmFsdWVcblx0ICAgICAgdmFyIGNicyA9IHRoaXMuY2JzXG5cdCAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgICAgIGNic1tpXSh2YWx1ZSwgb2xkVmFsdWUpXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQWRkIGEgY2FsbGJhY2suXG5cdCAqXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG5cdCAqL1xuXG5cdHAuYWRkQ2IgPSBmdW5jdGlvbiAoY2IpIHtcblx0ICB0aGlzLmNicy5wdXNoKGNiKVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhIGNhbGxiYWNrLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuXHQgKi9cblxuXHRwLnJlbW92ZUNiID0gZnVuY3Rpb24gKGNiKSB7XG5cdCAgdmFyIGNicyA9IHRoaXMuY2JzXG5cdCAgaWYgKGNicy5sZW5ndGggPiAxKSB7XG5cdCAgICB2YXIgaSA9IGNicy5pbmRleE9mKGNiKVxuXHQgICAgaWYgKGkgPiAtMSkge1xuXHQgICAgICBjYnMuc3BsaWNlKGksIDEpXG5cdCAgICB9XG5cdCAgfSBlbHNlIGlmIChjYiA9PT0gY2JzWzBdKSB7XG5cdCAgICB0aGlzLnRlYXJkb3duKClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIHNlbGYgZnJvbSBhbGwgZGVwZW5kZW5jaWVzJyBzdWJjcmliZXIgbGlzdC5cblx0ICovXG5cblx0cC50ZWFyZG93biA9IGZ1bmN0aW9uICgpIHtcblx0ICBpZiAodGhpcy5hY3RpdmUpIHtcblx0ICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gdm0ncyB3YXRjaGVyIGxpc3Rcblx0ICAgIC8vIHdlIGNhbiBza2lwIHRoaXMgaWYgdGhlIHZtIGlmIGJlaW5nIGRlc3Ryb3llZFxuXHQgICAgLy8gd2hpY2ggY2FuIGltcHJvdmUgdGVhcmRvd24gcGVyZm9ybWFuY2UuXG5cdCAgICBpZiAoIXRoaXMudm0uX2lzQmVpbmdEZXN0cm95ZWQpIHtcblx0ICAgICAgdmFyIGxpc3QgPSB0aGlzLnZtLl93YXRjaGVyTGlzdFxuXHQgICAgICBsaXN0LnNwbGljZShsaXN0LmluZGV4T2YodGhpcykpXG5cdCAgICB9XG5cdCAgICBmb3IgKHZhciBpZCBpbiB0aGlzLmRlcHMpIHtcblx0ICAgICAgdGhpcy5kZXBzW2lkXS5yZW1vdmVTdWIodGhpcylcblx0ICAgIH1cblx0ICAgIHRoaXMuYWN0aXZlID0gZmFsc2Vcblx0ICAgIHRoaXMudm0gPSB0aGlzLmNicyA9IHRoaXMudmFsdWUgPSBudWxsXG5cdCAgfVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBXYXRjaGVyXG5cbi8qKiovIH0sXG4vKiAxNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB0aGlzLmF0dHIgPSB0aGlzLmVsLm5vZGVUeXBlID09PSAzXG5cdCAgICAgID8gJ25vZGVWYWx1ZSdcblx0ICAgICAgOiAndGV4dENvbnRlbnQnXG5cdCAgfSxcblxuXHQgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICB0aGlzLmVsW3RoaXMuYXR0cl0gPSBfLnRvU3RyaW5nKHZhbHVlKVxuXHQgIH1cblx0ICBcblx0fVxuXG4vKioqLyB9LFxuLyogMTggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgdGVtcGxhdGVQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUwKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gYSBjb21tZW50IG5vZGUgbWVhbnMgdGhpcyBpcyBhIGJpbmRpbmcgZm9yXG5cdCAgICAvLyB7e3sgaW5saW5lIHVuZXNjYXBlZCBodG1sIH19fVxuXHQgICAgaWYgKHRoaXMuZWwubm9kZVR5cGUgPT09IDgpIHtcblx0ICAgICAgLy8gaG9sZCBub2Rlc1xuXHQgICAgICB0aGlzLm5vZGVzID0gW11cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgdXBkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgIHZhbHVlID0gXy50b1N0cmluZyh2YWx1ZSlcblx0ICAgIGlmICh0aGlzLm5vZGVzKSB7XG5cdCAgICAgIHRoaXMuc3dhcCh2YWx1ZSlcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gdmFsdWVcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgc3dhcDogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICAvLyByZW1vdmUgb2xkIG5vZGVzXG5cdCAgICB2YXIgaSA9IHRoaXMubm9kZXMubGVuZ3RoXG5cdCAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgIF8ucmVtb3ZlKHRoaXMubm9kZXNbaV0pXG5cdCAgICB9XG5cdCAgICAvLyBjb252ZXJ0IG5ldyB2YWx1ZSB0byBhIGZyYWdtZW50XG5cdCAgICB2YXIgZnJhZyA9IHRlbXBsYXRlUGFyc2VyLnBhcnNlKHZhbHVlLCB0cnVlKVxuXHQgICAgLy8gc2F2ZSBhIHJlZmVyZW5jZSB0byB0aGVzZSBub2RlcyBzbyB3ZSBjYW4gcmVtb3ZlIGxhdGVyXG5cdCAgICB0aGlzLm5vZGVzID0gXy50b0FycmF5KGZyYWcuY2hpbGROb2Rlcylcblx0ICAgIF8uYmVmb3JlKGZyYWcsIHRoaXMuZWwpXG5cdCAgfVxuXG5cdH1cblxuLyoqKi8gfSxcbi8qIDE5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvLyB4bGlua1xuXHR2YXIgeGxpbmtOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJ1xuXHR2YXIgeGxpbmtSRSA9IC9eeGxpbms6L1xuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgcHJpb3JpdHk6IDg1MCxcblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBuYW1lID0gdGhpcy5hcmdcblx0ICAgIHRoaXMudXBkYXRlID0geGxpbmtSRS50ZXN0KG5hbWUpXG5cdCAgICAgID8geGxpbmtIYW5kbGVyXG5cdCAgICAgIDogZGVmYXVsdEhhbmRsZXJcblx0ICB9XG5cblx0fVxuXG5cdGZ1bmN0aW9uIGRlZmF1bHRIYW5kbGVyICh2YWx1ZSkge1xuXHQgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkge1xuXHQgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUodGhpcy5hcmcsIHZhbHVlKVxuXHQgIH0gZWxzZSB7XG5cdCAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLmFyZylcblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiB4bGlua0hhbmRsZXIgKHZhbHVlKSB7XG5cdCAgaWYgKHZhbHVlICE9IG51bGwpIHtcblx0ICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlTlMoeGxpbmtOUywgdGhpcy5hcmcsIHZhbHVlKVxuXHQgIH0gZWxzZSB7XG5cdCAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZU5TKHhsaW5rTlMsICdocmVmJylcblx0ICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDIwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgdHJhbnNpdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNDIpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICB2YXIgZWwgPSB0aGlzLmVsXG5cdCAgdHJhbnNpdGlvbi5hcHBseShlbCwgdmFsdWUgPyAxIDogLTEsIGZ1bmN0aW9uICgpIHtcblx0ICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnXG5cdCAgfSwgdGhpcy52bSlcblx0fVxuXG4vKioqLyB9LFxuLyogMjEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgaGFzQ2xhc3NMaXN0ID1cblx0ICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmXG5cdCAgJ2NsYXNzTGlzdCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG5cblx0LyoqXG5cdCAqIGFkZCBjbGFzcyBmb3IgSUU5XG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtTdHJvbmd9IGNsc1xuXHQgKi9cblxuXHR2YXIgYWRkQ2xhc3MgPSBoYXNDbGFzc0xpc3Rcblx0ICA/IGZ1bmN0aW9uIChlbCwgY2xzKSB7XG5cdCAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xzKVxuXHQgICAgfVxuXHQgIDogXy5hZGRDbGFzc1xuXG5cdC8qKlxuXHQgKiByZW1vdmUgY2xhc3MgZm9yIElFOVxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7U3Ryb25nfSBjbHNcblx0ICovXG5cblx0dmFyIHJlbW92ZUNsYXNzID0gaGFzQ2xhc3NMaXN0XG5cdCAgPyBmdW5jdGlvbiAoZWwsIGNscykge1xuXHQgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNscylcblx0ICAgIH1cblx0ICA6IF8ucmVtb3ZlQ2xhc3NcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgIGlmICh0aGlzLmFyZykge1xuXHQgICAgdmFyIG1ldGhvZCA9IHZhbHVlID8gYWRkQ2xhc3MgOiByZW1vdmVDbGFzc1xuXHQgICAgbWV0aG9kKHRoaXMuZWwsIHRoaXMuYXJnKVxuXHQgIH0gZWxzZSB7XG5cdCAgICBpZiAodGhpcy5sYXN0VmFsKSB7XG5cdCAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWwsIHRoaXMubGFzdFZhbClcblx0ICAgIH1cblx0ICAgIGlmICh2YWx1ZSkge1xuXHQgICAgICBhZGRDbGFzcyh0aGlzLmVsLCB2YWx1ZSlcblx0ICAgICAgdGhpcy5sYXN0VmFsID0gdmFsdWVcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDIyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIGlzTGl0ZXJhbDogdHJ1ZSxcblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHRoaXMudm0uJCRbdGhpcy5leHByZXNzaW9uXSA9IHRoaXMuZWxcblx0ICB9LFxuXG5cdCAgdW5iaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICBkZWxldGUgdGhpcy52bS4kJFt0aGlzLmV4cHJlc3Npb25dXG5cdCAgfVxuXHQgIFxuXHR9XG5cbi8qKiovIH0sXG4vKiAyMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBpc0xpdGVyYWw6IHRydWUsXG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICBpZiAodGhpcy5lbCAhPT0gdGhpcy52bS4kZWwpIHtcblx0ICAgICAgXy53YXJuKFxuXHQgICAgICAgICd2LXJlZiBzaG91bGQgb25seSBiZSB1c2VkIG9uIGluc3RhbmNlIHJvb3Qgbm9kZXMuJ1xuXHQgICAgICApXG5cdCAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgICAgdGhpcy5vd25lciA9IHRoaXMudm0uJHBhcmVudFxuXHQgICAgdGhpcy5vd25lci4kW3RoaXMuZXhwcmVzc2lvbl0gPSB0aGlzLnZtXG5cdCAgfSxcblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgZGVsZXRlIHRoaXMub3duZXIuJFt0aGlzLmV4cHJlc3Npb25dXG5cdCAgfVxuXHQgIFxuXHR9XG5cbi8qKiovIH0sXG4vKiAyNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIGNvbmZpZyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgZWwgPSB0aGlzLmVsXG5cdCAgICB0aGlzLnZtLiRvbmNlKCdob29rOmNvbXBpbGVkJywgZnVuY3Rpb24gKCkge1xuXHQgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoY29uZmlnLnByZWZpeCArICdjbG9haycpXG5cdCAgICB9KVxuXHQgIH1cblxuXHR9XG5cbi8qKiovIH0sXG4vKiAyNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHByZWZpeGVzID0gWyctd2Via2l0LScsICctbW96LScsICctbXMtJ11cblx0dmFyIGltcG9ydGFudFJFID0gLyFpbXBvcnRhbnQ7PyQvXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgcHJvcCA9IHRoaXMuYXJnXG5cdCAgICBpZiAoIXByb3ApIHJldHVyblxuXHQgICAgaWYgKHByb3AuY2hhckF0KDApID09PSAnJCcpIHtcblx0ICAgICAgLy8gcHJvcGVydGllcyB0aGF0IHN0YXJ0IHdpdGggJCB3aWxsIGJlIGF1dG8tcHJlZml4ZWRcblx0ICAgICAgcHJvcCA9IHByb3Auc2xpY2UoMSlcblx0ICAgICAgdGhpcy5wcmVmaXhlZCA9IHRydWVcblx0ICAgIH1cblx0ICAgIHRoaXMucHJvcCA9IHByb3Bcblx0ICB9LFxuXG5cdCAgdXBkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgIHZhciBwcm9wID0gdGhpcy5wcm9wXG5cdCAgICAvLyBjYXN0IHBvc3NpYmxlIG51bWJlcnMvYm9vbGVhbnMgaW50byBzdHJpbmdzXG5cdCAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuXHQgICAgICB2YWx1ZSArPSAnJ1xuXHQgICAgfVxuXHQgICAgaWYgKHByb3ApIHtcblx0ICAgICAgdmFyIGlzSW1wb3J0YW50ID0gaW1wb3J0YW50UkUudGVzdCh2YWx1ZSlcblx0ICAgICAgICA/ICdpbXBvcnRhbnQnXG5cdCAgICAgICAgOiAnJ1xuXHQgICAgICBpZiAoaXNJbXBvcnRhbnQpIHtcblx0ICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoaW1wb3J0YW50UkUsICcnKS50cmltKClcblx0ICAgICAgfVxuXHQgICAgICB0aGlzLmVsLnN0eWxlLnNldFByb3BlcnR5KHByb3AsIHZhbHVlLCBpc0ltcG9ydGFudClcblx0ICAgICAgaWYgKHRoaXMucHJlZml4ZWQpIHtcblx0ICAgICAgICB2YXIgaSA9IHByZWZpeGVzLmxlbmd0aFxuXHQgICAgICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgICAgIHRoaXMuZWwuc3R5bGUuc2V0UHJvcGVydHkoXG5cdCAgICAgICAgICAgIHByZWZpeGVzW2ldICsgcHJvcCxcblx0ICAgICAgICAgICAgdmFsdWUsXG5cdCAgICAgICAgICAgIGlzSW1wb3J0YW50XG5cdCAgICAgICAgICApXG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLmVsLnN0eWxlLmNzc1RleHQgPSB2YWx1ZVxuXHQgICAgfVxuXHQgIH1cblxuXHR9XG5cbi8qKiovIH0sXG4vKiAyNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciB0ZW1wbGF0ZVBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNTApXG5cdHZhciB0cmFuc2l0aW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MilcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIGlzTGl0ZXJhbDogdHJ1ZSxcblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBlbCA9IHRoaXMuZWxcblx0ICAgIHRoaXMuc3RhcnQgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCd2LXBhcnRpYWwtc3RhcnQnKVxuXHQgICAgdGhpcy5lbmQgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCd2LXBhcnRpYWwtZW5kJylcblx0ICAgIGlmIChlbC5ub2RlVHlwZSAhPT0gOCkge1xuXHQgICAgICBlbC5pbm5lckhUTUwgPSAnJ1xuXHQgICAgfVxuXHQgICAgaWYgKGVsLnRhZ05hbWUgPT09ICdURU1QTEFURScgfHwgZWwubm9kZVR5cGUgPT09IDgpIHtcblx0ICAgICAgXy5yZXBsYWNlKGVsLCB0aGlzLmVuZClcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuZW5kKVxuXHQgICAgfVxuXHQgICAgXy5iZWZvcmUodGhpcy5zdGFydCwgdGhpcy5lbmQpXG5cdCAgICBpZiAoIXRoaXMuX2lzRHluYW1pY0xpdGVyYWwpIHtcblx0ICAgICAgdGhpcy5jb21waWxlKHRoaXMuZXhwcmVzc2lvbilcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgdXBkYXRlOiBmdW5jdGlvbiAoaWQpIHtcblx0ICAgIHRoaXMudGVhcmRvd24oKVxuXHQgICAgdGhpcy5jb21waWxlKGlkKVxuXHQgIH0sXG5cblx0ICBjb21waWxlOiBmdW5jdGlvbiAoaWQpIHtcblx0ICAgIHZhciBwYXJ0aWFsID0gdGhpcy52bS4kb3B0aW9ucy5wYXJ0aWFsc1tpZF1cblx0ICAgIF8uYXNzZXJ0QXNzZXQocGFydGlhbCwgJ3BhcnRpYWwnLCBpZClcblx0ICAgIGlmICghcGFydGlhbCkge1xuXHQgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIHZhciB2bSA9IHRoaXMudm1cblx0ICAgIHZhciBmcmFnID0gdGVtcGxhdGVQYXJzZXIucGFyc2UocGFydGlhbCwgdHJ1ZSlcblx0ICAgIHZhciBkZWNvbXBpbGUgPSB2bS4kY29tcGlsZShmcmFnKVxuXHQgICAgdGhpcy5kZWNvbXBpbGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIGRlY29tcGlsZSgpXG5cdCAgICAgIHRyYW5zaXRpb24uYmxvY2tSZW1vdmUodGhpcy5zdGFydCwgdGhpcy5lbmQsIHZtKVxuXHQgICAgfVxuXHQgICAgdHJhbnNpdGlvbi5ibG9ja0FwcGVuZChmcmFnLCB0aGlzLmVuZCwgdm0pXG5cdCAgfSxcblxuXHQgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG5cdCAgICBpZiAodGhpcy5kZWNvbXBpbGUpIHtcblx0ICAgICAgdGhpcy5kZWNvbXBpbGUoKVxuXHQgICAgICB0aGlzLmRlY29tcGlsZSA9IG51bGxcblx0ICAgIH1cblx0ICB9XG5cblx0fVxuXG4vKioqLyB9LFxuLyogMjcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgcHJpb3JpdHk6IDEwMDAsXG5cdCAgaXNMaXRlcmFsOiB0cnVlLFxuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdGhpcy5lbC5fX3ZfdHJhbnMgPSB7XG5cdCAgICAgIGlkOiB0aGlzLmV4cHJlc3Npb25cblx0ICAgIH1cblx0ICB9XG5cblx0fVxuXG4vKioqLyB9LFxuLyogMjggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgYWNjZXB0U3RhdGVtZW50OiB0cnVlLFxuXHQgIHByaW9yaXR5OiA3MDAsXG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBkZWFsIHdpdGggaWZyYW1lc1xuXHQgICAgaWYgKFxuXHQgICAgICB0aGlzLmVsLnRhZ05hbWUgPT09ICdJRlJBTUUnICYmXG5cdCAgICAgIHRoaXMuYXJnICE9PSAnbG9hZCdcblx0ICAgICkge1xuXHQgICAgICB2YXIgc2VsZiA9IHRoaXNcblx0ICAgICAgdGhpcy5pZnJhbWVCaW5kID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIF8ub24oc2VsZi5lbC5jb250ZW50V2luZG93LCBzZWxmLmFyZywgc2VsZi5oYW5kbGVyKVxuXHQgICAgICB9XG5cdCAgICAgIF8ub24odGhpcy5lbCwgJ2xvYWQnLCB0aGlzLmlmcmFtZUJpbmQpXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHVwZGF0ZTogZnVuY3Rpb24gKGhhbmRsZXIpIHtcblx0ICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICBfLndhcm4oXG5cdCAgICAgICAgJ0RpcmVjdGl2ZSBcInYtb246JyArIHRoaXMuZXhwcmVzc2lvbiArICdcIiAnICtcblx0ICAgICAgICAnZXhwZWN0cyBhIGZ1bmN0aW9uIHZhbHVlLidcblx0ICAgICAgKVxuXHQgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIHRoaXMucmVzZXQoKVxuXHQgICAgdmFyIHZtID0gdGhpcy52bVxuXHQgICAgdGhpcy5oYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcblx0ICAgICAgZS50YXJnZXRWTSA9IHZtXG5cdCAgICAgIHZtLiRldmVudCA9IGVcblx0ICAgICAgdmFyIHJlcyA9IGhhbmRsZXIoZSlcblx0ICAgICAgdm0uJGV2ZW50ID0gbnVsbFxuXHQgICAgICByZXR1cm4gcmVzXG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5pZnJhbWVCaW5kKSB7XG5cdCAgICAgIHRoaXMuaWZyYW1lQmluZCgpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBfLm9uKHRoaXMuZWwsIHRoaXMuYXJnLCB0aGlzLmhhbmRsZXIpXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgZWwgPSB0aGlzLmlmcmFtZUJpbmRcblx0ICAgICAgPyB0aGlzLmVsLmNvbnRlbnRXaW5kb3dcblx0ICAgICAgOiB0aGlzLmVsXG5cdCAgICBpZiAodGhpcy5oYW5kbGVyKSB7XG5cdCAgICAgIF8ub2ZmKGVsLCB0aGlzLmFyZywgdGhpcy5oYW5kbGVyKVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICB1bmJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHRoaXMucmVzZXQoKVxuXHQgICAgXy5vZmYodGhpcy5lbCwgJ2xvYWQnLCB0aGlzLmlmcmFtZUJpbmQpXG5cdCAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiAyOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciB0ZW1wbGF0ZVBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNTApXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBpc0xpdGVyYWw6IHRydWUsXG5cblx0ICAvKipcblx0ICAgKiBTZXR1cC4gVHdvIHBvc3NpYmxlIHVzYWdlczpcblx0ICAgKlxuXHQgICAqIC0gc3RhdGljOlxuXHQgICAqICAgdi1jb21wb25lbnQ9XCJjb21wXCJcblx0ICAgKlxuXHQgICAqIC0gZHluYW1pYzpcblx0ICAgKiAgIHYtY29tcG9uZW50PVwie3tjdXJyZW50Vmlld319XCJcblx0ICAgKi9cblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIGlmICghdGhpcy5lbC5fX3Z1ZV9fKSB7XG5cdCAgICAgIC8vIGNyZWF0ZSBhIHJlZiBhbmNob3Jcblx0ICAgICAgdGhpcy5yZWYgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCd2LWNvbXBvbmVudCcpXG5cdCAgICAgIF8ucmVwbGFjZSh0aGlzLmVsLCB0aGlzLnJlZilcblx0ICAgICAgLy8gY2hlY2sga2VlcC1hbGl2ZSBvcHRpb25zXG5cdCAgICAgIHRoaXMuY2hlY2tLZWVwQWxpdmUoKVxuXHQgICAgICAvLyBjaGVjayBwYXJlbnQgZGlyZWN0aXZlc1xuXHQgICAgICB0aGlzLnBhcmVudExpbmtlciA9IHRoaXMuZWwuX3BhcmVudExpbmtlclxuXHQgICAgICAvLyBpZiBzdGF0aWMsIGJ1aWxkIHJpZ2h0IG5vdy5cblx0ICAgICAgaWYgKCF0aGlzLl9pc0R5bmFtaWNMaXRlcmFsKSB7XG5cdCAgICAgICAgdGhpcy5yZXNvbHZlQ3Rvcih0aGlzLmV4cHJlc3Npb24pXG5cdCAgICAgICAgdGhpcy5idWlsZCgpXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIF8ud2Fybihcblx0ICAgICAgICAndi1jb21wb25lbnQ9XCInICsgdGhpcy5leHByZXNzaW9uICsgJ1wiIGNhbm5vdCBiZSAnICtcblx0ICAgICAgICAndXNlZCBvbiBhbiBhbHJlYWR5IG1vdW50ZWQgaW5zdGFuY2UuJ1xuXHQgICAgICApXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIENoZWNrIGlmIHRoZSBcImtlZXAtYWxpdmVcIiBmbGFnIGlzIHByZXNlbnQuXG5cdCAgICogSWYgeWVzLCBpbnN0ZWFkIG9mIGRlc3Ryb3lpbmcgdGhlIGFjdGl2ZSB2bSB3aGVuXG5cdCAgICogaGlkaW5nICh2LWlmKSBvciBzd2l0Y2hpbmcgKGR5bmFtaWMgbGl0ZXJhbCkgaXQsXG5cdCAgICogd2Ugc2ltcGx5IHJlbW92ZSBpdCBmcm9tIHRoZSBET00gYW5kIHNhdmUgaXQgaW4gYVxuXHQgICAqIGNhY2hlIG9iamVjdCwgd2l0aCBpdHMgY29uc3RydWN0b3IgaWQgYXMgdGhlIGtleS5cblx0ICAgKi9cblxuXHQgIGNoZWNrS2VlcEFsaXZlOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBjaGVjayBrZWVwLWFsaXZlIGZsYWdcblx0ICAgIHRoaXMua2VlcEFsaXZlID0gdGhpcy5lbC5oYXNBdHRyaWJ1dGUoJ2tlZXAtYWxpdmUnKVxuXHQgICAgaWYgKHRoaXMua2VlcEFsaXZlKSB7XG5cdCAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKCdrZWVwLWFsaXZlJylcblx0ICAgICAgdGhpcy5jYWNoZSA9IHt9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIFJlc29sdmUgdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3RvciB0byB1c2Ugd2hlbiBjcmVhdGluZ1xuXHQgICAqIHRoZSBjaGlsZCB2bS5cblx0ICAgKi9cblxuXHQgIHJlc29sdmVDdG9yOiBmdW5jdGlvbiAoaWQpIHtcblx0ICAgIHRoaXMuY3RvcklkID0gaWRcblx0ICAgIHRoaXMuQ3RvciA9IHRoaXMudm0uJG9wdGlvbnMuY29tcG9uZW50c1tpZF1cblx0ICAgIF8uYXNzZXJ0QXNzZXQodGhpcy5DdG9yLCAnY29tcG9uZW50JywgaWQpXG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIEluc3RhbnRpYXRlL2luc2VydCBhIG5ldyBjaGlsZCB2bS5cblx0ICAgKiBJZiBrZWVwIGFsaXZlIGFuZCBoYXMgY2FjaGVkIGluc3RhbmNlLCBpbnNlcnQgdGhhdFxuXHQgICAqIGluc3RhbmNlOyBvdGhlcndpc2UgYnVpbGQgYSBuZXcgb25lIGFuZCBjYWNoZSBpdC5cblx0ICAgKi9cblxuXHQgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XG5cdCAgICBpZiAodGhpcy5rZWVwQWxpdmUpIHtcblx0ICAgICAgdmFyIGNhY2hlZCA9IHRoaXMuY2FjaGVbdGhpcy5jdG9ySWRdXG5cdCAgICAgIGlmIChjYWNoZWQpIHtcblx0ICAgICAgICB0aGlzLmNoaWxkVk0gPSBjYWNoZWRcblx0ICAgICAgICBjYWNoZWQuJGJlZm9yZSh0aGlzLnJlZilcblx0ICAgICAgICByZXR1cm5cblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgdmFyIHZtID0gdGhpcy52bVxuXHQgICAgaWYgKHRoaXMuQ3RvciAmJiAhdGhpcy5jaGlsZFZNKSB7XG5cdCAgICAgIHRoaXMuY2hpbGRWTSA9IHZtLiRhZGRDaGlsZCh7XG5cdCAgICAgICAgZWw6IHRlbXBsYXRlUGFyc2VyLmNsb25lKHRoaXMuZWwpXG5cdCAgICAgIH0sIHRoaXMuQ3Rvcilcblx0ICAgICAgaWYgKHRoaXMucGFyZW50TGlua2VyKSB7XG5cdCAgICAgICAgdmFyIGRpckNvdW50ID0gdm0uX2RpcmVjdGl2ZXMubGVuZ3RoXG5cdCAgICAgICAgdmFyIHRhcmdldFZNID0gdGhpcy5jaGlsZFZNLiRvcHRpb25zLmluaGVyaXRcblx0ICAgICAgICAgID8gdGhpcy5jaGlsZFZNXG5cdCAgICAgICAgICA6IHZtXG5cdCAgICAgICAgdGhpcy5wYXJlbnRMaW5rZXIodGFyZ2V0Vk0sIHRoaXMuY2hpbGRWTS4kZWwpXG5cdCAgICAgICAgdGhpcy5wYXJlbnREaXJzID0gdm0uX2RpcmVjdGl2ZXMuc2xpY2UoZGlyQ291bnQpXG5cdCAgICAgIH1cblx0ICAgICAgaWYgKHRoaXMua2VlcEFsaXZlKSB7XG5cdCAgICAgICAgdGhpcy5jYWNoZVt0aGlzLmN0b3JJZF0gPSB0aGlzLmNoaWxkVk1cblx0ICAgICAgfVxuXHQgICAgICB0aGlzLmNoaWxkVk0uJGJlZm9yZSh0aGlzLnJlZilcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogVGVhcmRvd24gdGhlIGFjdGl2ZSB2bS5cblx0ICAgKiBJZiBrZWVwIGFsaXZlLCBzaW1wbHkgcmVtb3ZlIGl0OyBvdGhlcndpc2UgZGVzdHJveSBpdC5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVtb3ZlXG5cdCAgICovXG5cblx0ICB1bmJ1aWxkOiBmdW5jdGlvbiAocmVtb3ZlKSB7XG5cdCAgICBpZiAoIXRoaXMuY2hpbGRWTSkge1xuXHQgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLmtlZXBBbGl2ZSkge1xuXHQgICAgICBpZiAocmVtb3ZlKSB7XG5cdCAgICAgICAgdGhpcy5jaGlsZFZNLiRyZW1vdmUoKVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLmNoaWxkVk0uJGRlc3Ryb3kocmVtb3ZlKVxuXHQgICAgICBpZiAodGhpcy5wYXJlbnREaXJzKSB7XG5cdCAgICAgICAgdmFyIGkgPSB0aGlzLnBhcmVudERpcnMubGVuZ3RoXG5cdCAgICAgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICAgICAgdGhpcy5wYXJlbnREaXJzW2ldLl90ZWFyZG93bigpXG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICB0aGlzLmNoaWxkVk0gPSBudWxsXG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIFVwZGF0ZSBjYWxsYmFjayBmb3IgdGhlIGR5bmFtaWMgbGl0ZXJhbCBzY2VuYXJpbyxcblx0ICAgKiBlLmcuIHYtY29tcG9uZW50PVwie3t2aWV3fX1cIlxuXHQgICAqL1xuXG5cdCAgdXBkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgIHRoaXMudW5idWlsZCh0cnVlKVxuXHQgICAgaWYgKHZhbHVlKSB7XG5cdCAgICAgIHRoaXMucmVzb2x2ZUN0b3IodmFsdWUpXG5cdCAgICAgIHRoaXMuYnVpbGQoKVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBVbmJpbmQuXG5cdCAgICogTWFrZSBzdXJlIGtlZXBBbGl2ZSBpcyBzZXQgdG8gZmFsc2Ugc28gdGhhdCB0aGVcblx0ICAgKiBpbnN0YW5jZSBpcyBhbHdheXMgZGVzdHJveWVkLlxuXHQgICAqL1xuXG5cdCAgdW5iaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB0aGlzLmtlZXBBbGl2ZSA9IGZhbHNlXG5cdCAgICB0aGlzLnVuYnVpbGQoKVxuXHQgIH1cblxuXHR9XG5cbi8qKiovIH0sXG4vKiAzMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBpc09iamVjdCA9IF8uaXNPYmplY3Rcblx0dmFyIHRleHRQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5KVxuXHR2YXIgZXhwUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MSlcblx0dmFyIHRlbXBsYXRlUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MClcblx0dmFyIGNvbXBpbGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQzKVxuXHR2YXIgdHJhbnNjbHVkZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDYpXG5cdHZhciBtZXJnZU9wdGlvbnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KVxuXHR2YXIgdWlkID0gMFxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgLyoqXG5cdCAgICogU2V0dXAuXG5cdCAgICovXG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyB1aWQgYXMgYSBjYWNoZSBpZGVudGlmaWVyXG5cdCAgICB0aGlzLmlkID0gJ19fdl9yZXBlYXRfJyArICgrK3VpZClcblx0ICAgIC8vIHdlIG5lZWQgdG8gaW5zZXJ0IHRoZSBvYmpUb0FycmF5IGNvbnZlcnRlclxuXHQgICAgLy8gYXMgdGhlIGZpcnN0IHJlYWQgZmlsdGVyLlxuXHQgICAgaWYgKCF0aGlzLmZpbHRlcnMpIHtcblx0ICAgICAgdGhpcy5maWx0ZXJzID0ge31cblx0ICAgIH1cblx0ICAgIC8vIGFkZCB0aGUgb2JqZWN0IC0+IGFycmF5IGNvbnZlcnQgZmlsdGVyXG5cdCAgICB2YXIgb2JqZWN0Q29udmVydGVyID0gXy5iaW5kKG9ialRvQXJyYXksIHRoaXMpXG5cdCAgICBpZiAoIXRoaXMuZmlsdGVycy5yZWFkKSB7XG5cdCAgICAgIHRoaXMuZmlsdGVycy5yZWFkID0gW29iamVjdENvbnZlcnRlcl1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuZmlsdGVycy5yZWFkLnVuc2hpZnQob2JqZWN0Q29udmVydGVyKVxuXHQgICAgfVxuXHQgICAgLy8gc2V0dXAgcmVmIG5vZGVcblx0ICAgIHRoaXMucmVmID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgndi1yZXBlYXQnKVxuXHQgICAgXy5yZXBsYWNlKHRoaXMuZWwsIHRoaXMucmVmKVxuXHQgICAgLy8gY2hlY2sgaWYgdGhpcyBpcyBhIGJsb2NrIHJlcGVhdFxuXHQgICAgdGhpcy50ZW1wbGF0ZSA9IHRoaXMuZWwudGFnTmFtZSA9PT0gJ1RFTVBMQVRFJ1xuXHQgICAgICA/IHRlbXBsYXRlUGFyc2VyLnBhcnNlKHRoaXMuZWwsIHRydWUpXG5cdCAgICAgIDogdGhpcy5lbFxuXHQgICAgLy8gY2hlY2sgb3RoZXIgZGlyZWN0aXZlcyB0aGF0IG5lZWQgdG8gYmUgaGFuZGxlZFxuXHQgICAgLy8gYXQgdi1yZXBlYXQgbGV2ZWxcblx0ICAgIHRoaXMuY2hlY2tJZigpXG5cdCAgICB0aGlzLmNoZWNrUmVmKClcblx0ICAgIHRoaXMuY2hlY2tUcmFja0J5SWQoKVxuXHQgICAgdGhpcy5jaGVja0NvbXBvbmVudCgpXG5cdCAgICAvLyBjYWNoZSBmb3IgcHJpbWl0aXZlIHZhbHVlIGluc3RhbmNlc1xuXHQgICAgdGhpcy5jYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbClcblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogV2FybiBhZ2FpbnN0IHYtaWYgdXNhZ2UuXG5cdCAgICovXG5cblx0ICBjaGVja0lmOiBmdW5jdGlvbiAoKSB7XG5cdCAgICBpZiAoXy5hdHRyKHRoaXMuZWwsICdpZicpICE9PSBudWxsKSB7XG5cdCAgICAgIF8ud2Fybihcblx0ICAgICAgICAnRG9uXFwndCB1c2Ugdi1pZiB3aXRoIHYtcmVwZWF0LiAnICtcblx0ICAgICAgICAnVXNlIHYtc2hvdyBvciB0aGUgXCJmaWx0ZXJCeVwiIGZpbHRlciBpbnN0ZWFkLidcblx0ICAgICAgKVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBDaGVjayBpZiB2LXJlZi8gdi1lbCBpcyBhbHNvIHByZXNlbnQuXG5cdCAgICovXG5cblx0ICBjaGVja1JlZjogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIGNoaWxkSWQgPSBfLmF0dHIodGhpcy5lbCwgJ3JlZicpXG5cdCAgICB0aGlzLmNoaWxkSWQgPSBjaGlsZElkXG5cdCAgICAgID8gdGhpcy52bS4kaW50ZXJwb2xhdGUoY2hpbGRJZClcblx0ICAgICAgOiBudWxsXG5cdCAgICB2YXIgZWxJZCA9IF8uYXR0cih0aGlzLmVsLCAnZWwnKVxuXHQgICAgdGhpcy5lbElkID0gZWxJZFxuXHQgICAgICA/IHRoaXMudm0uJGludGVycG9sYXRlKGVsSWQpXG5cdCAgICAgIDogbnVsbFxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBDaGVjayBmb3IgYSB0cmFjay1ieSBJRCwgd2hpY2ggYWxsb3dzIHVzIHRvIGlkZW50aWZ5XG5cdCAgICogYSBwaWVjZSBvZiBkYXRhIGFuZCBpdHMgYXNzb2NpYXRlZCBpbnN0YW5jZSBieSBpdHNcblx0ICAgKiB1bmlxdWUgaWQuXG5cdCAgICovXG5cblx0ICBjaGVja1RyYWNrQnlJZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdGhpcy5pZEtleSA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKCd0cmFja2J5Jylcblx0ICAgIGlmICh0aGlzLmlkS2V5ICE9PSBudWxsKSB7XG5cdCAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKCd0cmFja2J5Jylcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogQ2hlY2sgdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3RvciB0byB1c2UgZm9yIHJlcGVhdGVkXG5cdCAgICogaW5zdGFuY2VzLiBJZiBzdGF0aWMgd2UgcmVzb2x2ZSBpdCBub3csIG90aGVyd2lzZSBpdFxuXHQgICAqIG5lZWRzIHRvIGJlIHJlc29sdmVkIGF0IGJ1aWxkIHRpbWUgd2l0aCBhY3R1YWwgZGF0YS5cblx0ICAgKi9cblxuXHQgIGNoZWNrQ29tcG9uZW50OiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgaWQgPSBfLmF0dHIodGhpcy5lbCwgJ2NvbXBvbmVudCcpXG5cdCAgICB2YXIgb3B0aW9ucyA9IHRoaXMudm0uJG9wdGlvbnNcblx0ICAgIGlmICghaWQpIHtcblx0ICAgICAgdGhpcy5DdG9yID0gXy5WdWUgLy8gZGVmYXVsdCBjb25zdHJ1Y3RvclxuXHQgICAgICB0aGlzLmluaGVyaXQgPSB0cnVlIC8vIGlubGluZSByZXBlYXRzIHNob3VsZCBpbmhlcml0XG5cdCAgICAgIC8vIGltcG9ydGFudDogdHJhbnNjbHVkZSB3aXRoIG5vIG9wdGlvbnMsIGp1c3Rcblx0ICAgICAgLy8gdG8gZW5zdXJlIGJsb2NrIHN0YXJ0IGFuZCBibG9jayBlbmRcblx0ICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRyYW5zY2x1ZGUodGhpcy50ZW1wbGF0ZSlcblx0ICAgICAgdGhpcy5fbGlua2VyID0gY29tcGlsZSh0aGlzLnRlbXBsYXRlLCBvcHRpb25zKVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdmFyIHRva2VucyA9IHRleHRQYXJzZXIucGFyc2UoaWQpXG5cdCAgICAgIGlmICghdG9rZW5zKSB7IC8vIHN0YXRpYyBjb21wb25lbnRcblx0ICAgICAgICB2YXIgQ3RvciA9IHRoaXMuQ3RvciA9IG9wdGlvbnMuY29tcG9uZW50c1tpZF1cblx0ICAgICAgICBfLmFzc2VydEFzc2V0KEN0b3IsICdjb21wb25lbnQnLCBpZClcblx0ICAgICAgICBpZiAoQ3Rvcikge1xuXHQgICAgICAgICAgLy8gbWVyZ2UgYW4gZW1wdHkgb2JqZWN0IHdpdGggb3duZXIgdm0gYXMgcGFyZW50XG5cdCAgICAgICAgICAvLyBzbyBjaGlsZCB2bXMgY2FuIGFjY2VzcyBwYXJlbnQgYXNzZXRzLlxuXHQgICAgICAgICAgdmFyIG1lcmdlZCA9IG1lcmdlT3B0aW9ucyhcblx0ICAgICAgICAgICAgQ3Rvci5vcHRpb25zLFxuXHQgICAgICAgICAgICB7fSxcblx0ICAgICAgICAgICAgeyAkcGFyZW50OiB0aGlzLnZtIH1cblx0ICAgICAgICAgIClcblx0ICAgICAgICAgIHRoaXMudGVtcGxhdGUgPSB0cmFuc2NsdWRlKHRoaXMudGVtcGxhdGUsIG1lcmdlZClcblx0ICAgICAgICAgIHRoaXMuX2xpbmtlciA9IGNvbXBpbGUodGhpcy50ZW1wbGF0ZSwgbWVyZ2VkKVxuXHQgICAgICAgIH1cblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAvLyB0byBiZSByZXNvbHZlZCBsYXRlclxuXHQgICAgICAgIHZhciBjdG9yRXhwID0gdGV4dFBhcnNlci50b2tlbnNUb0V4cCh0b2tlbnMpXG5cdCAgICAgICAgdGhpcy5jdG9yR2V0dGVyID0gZXhwUGFyc2VyLnBhcnNlKGN0b3JFeHApLmdldFxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIFVwZGF0ZS5cblx0ICAgKiBUaGlzIGlzIGNhbGxlZCB3aGVuZXZlciB0aGUgQXJyYXkgbXV0YXRlcy5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7QXJyYXl9IGRhdGFcblx0ICAgKi9cblxuXHQgIHVwZGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicpIHtcblx0ICAgICAgZGF0YSA9IHJhbmdlKGRhdGEpXG5cdCAgICB9XG5cdCAgICB0aGlzLnZtcyA9IHRoaXMuZGlmZihkYXRhIHx8IFtdLCB0aGlzLnZtcylcblx0ICAgIC8vIHVwZGF0ZSB2LXJlZlxuXHQgICAgaWYgKHRoaXMuY2hpbGRJZCkge1xuXHQgICAgICB0aGlzLnZtLiRbdGhpcy5jaGlsZElkXSA9IHRoaXMudm1zXG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5lbElkKSB7XG5cdCAgICAgIHRoaXMudm0uJCRbdGhpcy5lbElkXSA9IHRoaXMudm1zLm1hcChmdW5jdGlvbiAodm0pIHtcblx0ICAgICAgICByZXR1cm4gdm0uJGVsXG5cdCAgICAgIH0pXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIERpZmYsIGJhc2VkIG9uIG5ldyBkYXRhIGFuZCBvbGQgZGF0YSwgZGV0ZXJtaW5lIHRoZVxuXHQgICAqIG1pbmltdW0gYW1vdW50IG9mIERPTSBtYW5pcHVsYXRpb25zIG5lZWRlZCB0byBtYWtlIHRoZVxuXHQgICAqIERPTSByZWZsZWN0IHRoZSBuZXcgZGF0YSBBcnJheS5cblx0ICAgKlxuXHQgICAqIFRoZSBhbGdvcml0aG0gZGlmZnMgdGhlIG5ldyBkYXRhIEFycmF5IGJ5IHN0b3JpbmcgYVxuXHQgICAqIGhpZGRlbiByZWZlcmVuY2UgdG8gYW4gb3duZXIgdm0gaW5zdGFuY2Ugb24gcHJldmlvdXNseVxuXHQgICAqIHNlZW4gZGF0YS4gVGhpcyBhbGxvd3MgdXMgdG8gYWNoaWV2ZSBPKG4pIHdoaWNoIGlzXG5cdCAgICogYmV0dGVyIHRoYW4gYSBsZXZlbnNodGVpbiBkaXN0YW5jZSBiYXNlZCBhbGdvcml0aG0sXG5cdCAgICogd2hpY2ggaXMgTyhtICogbikuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhXG5cdCAgICogQHBhcmFtIHtBcnJheX0gb2xkVm1zXG5cdCAgICogQHJldHVybiB7QXJyYXl9XG5cdCAgICovXG5cblx0ICBkaWZmOiBmdW5jdGlvbiAoZGF0YSwgb2xkVm1zKSB7XG5cdCAgICB2YXIgaWRLZXkgPSB0aGlzLmlkS2V5XG5cdCAgICB2YXIgY29udmVydGVkID0gdGhpcy5jb252ZXJ0ZWRcblx0ICAgIHZhciByZWYgPSB0aGlzLnJlZlxuXHQgICAgdmFyIGFsaWFzID0gdGhpcy5hcmdcblx0ICAgIHZhciBpbml0ID0gIW9sZFZtc1xuXHQgICAgdmFyIHZtcyA9IG5ldyBBcnJheShkYXRhLmxlbmd0aClcblx0ICAgIHZhciBvYmosIHJhdywgdm0sIGksIGxcblx0ICAgIC8vIEZpcnN0IHBhc3MsIGdvIHRocm91Z2ggdGhlIG5ldyBBcnJheSBhbmQgZmlsbCB1cFxuXHQgICAgLy8gdGhlIG5ldyB2bXMgYXJyYXkuIElmIGEgcGllY2Ugb2YgZGF0YSBoYXMgYSBjYWNoZWRcblx0ICAgIC8vIGluc3RhbmNlIGZvciBpdCwgd2UgcmV1c2UgaXQuIE90aGVyd2lzZSBidWlsZCBhIG5ld1xuXHQgICAgLy8gaW5zdGFuY2UuXG5cdCAgICBmb3IgKGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgICAgb2JqID0gZGF0YVtpXVxuXHQgICAgICByYXcgPSBjb252ZXJ0ZWQgPyBvYmoudmFsdWUgOiBvYmpcblx0ICAgICAgdm0gPSAhaW5pdCAmJiB0aGlzLmdldFZtKHJhdylcblx0ICAgICAgaWYgKHZtKSB7IC8vIHJldXNhYmxlIGluc3RhbmNlXG5cdCAgICAgICAgdm0uX3JldXNlZCA9IHRydWVcblx0ICAgICAgICB2bS4kaW5kZXggPSBpIC8vIHVwZGF0ZSAkaW5kZXhcblx0ICAgICAgICBpZiAoY29udmVydGVkKSB7XG5cdCAgICAgICAgICB2bS4ka2V5ID0gb2JqLmtleSAvLyB1cGRhdGUgJGtleVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoaWRLZXkpIHsgLy8gc3dhcCB0cmFjayBieSBpZCBkYXRhXG5cdCAgICAgICAgICBpZiAoYWxpYXMpIHtcblx0ICAgICAgICAgICAgdm1bYWxpYXNdID0gcmF3XG5cdCAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB2bS5fc2V0RGF0YShyYXcpXG5cdCAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICB9IGVsc2UgeyAvLyBuZXcgaW5zdGFuY2Vcblx0ICAgICAgICB2bSA9IHRoaXMuYnVpbGQob2JqLCBpKVxuXHQgICAgICAgIHZtLl9uZXcgPSB0cnVlXG5cdCAgICAgIH1cblx0ICAgICAgdm1zW2ldID0gdm1cblx0ICAgICAgLy8gaW5zZXJ0IGlmIHRoaXMgaXMgZmlyc3QgcnVuXG5cdCAgICAgIGlmIChpbml0KSB7XG5cdCAgICAgICAgdm0uJGJlZm9yZShyZWYpXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIC8vIGlmIHRoaXMgaXMgdGhlIGZpcnN0IHJ1biwgd2UncmUgZG9uZS5cblx0ICAgIGlmIChpbml0KSB7XG5cdCAgICAgIHJldHVybiB2bXNcblx0ICAgIH1cblx0ICAgIC8vIFNlY29uZCBwYXNzLCBnbyB0aHJvdWdoIHRoZSBvbGQgdm0gaW5zdGFuY2VzIGFuZFxuXHQgICAgLy8gZGVzdHJveSB0aG9zZSB3aG8gYXJlIG5vdCByZXVzZWQgKGFuZCByZW1vdmUgdGhlbVxuXHQgICAgLy8gZnJvbSBjYWNoZSlcblx0ICAgIGZvciAoaSA9IDAsIGwgPSBvbGRWbXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIHZtID0gb2xkVm1zW2ldXG5cdCAgICAgIGlmICghdm0uX3JldXNlZCkge1xuXHQgICAgICAgIHRoaXMudW5jYWNoZVZtKHZtKVxuXHQgICAgICAgIHZtLiRkZXN0cm95KHRydWUpXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIC8vIGZpbmFsIHBhc3MsIG1vdmUvaW5zZXJ0IG5ldyBpbnN0YW5jZXMgaW50byB0aGVcblx0ICAgIC8vIHJpZ2h0IHBsYWNlLiBXZSdyZSBnb2luZyBpbiByZXZlcnNlIGhlcmUgYmVjYXVzZVxuXHQgICAgLy8gaW5zZXJ0QmVmb3JlIHJlbGllcyBvbiB0aGUgbmV4dCBzaWJsaW5nIHRvIGJlXG5cdCAgICAvLyByZXNvbHZlZC5cblx0ICAgIHZhciB0YXJnZXROZXh0LCBjdXJyZW50TmV4dFxuXHQgICAgaSA9IHZtcy5sZW5ndGhcblx0ICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgdm0gPSB2bXNbaV1cblx0ICAgICAgLy8gdGhpcyBpcyB0aGUgdm0gdGhhdCB3ZSBzaG91bGQgYmUgaW4gZnJvbnQgb2Zcblx0ICAgICAgdGFyZ2V0TmV4dCA9IHZtc1tpICsgMV1cblx0ICAgICAgaWYgKCF0YXJnZXROZXh0KSB7XG5cdCAgICAgICAgLy8gVGhpcyBpcyB0aGUgbGFzdCBpdGVtLiBJZiBpdCdzIHJldXNlZCB0aGVuXG5cdCAgICAgICAgLy8gZXZlcnl0aGluZyBlbHNlIHdpbGwgZXZlbnR1YWxseSBiZSBpbiB0aGUgcmlnaHRcblx0ICAgICAgICAvLyBwbGFjZSwgc28gbm8gbmVlZCB0byB0b3VjaCBpdC4gT3RoZXJ3aXNlLCBpbnNlcnRcblx0ICAgICAgICAvLyBpdC5cblx0ICAgICAgICBpZiAoIXZtLl9yZXVzZWQpIHtcblx0ICAgICAgICAgIHZtLiRiZWZvcmUocmVmKVxuXHQgICAgICAgIH1cblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBpZiAodm0uX3JldXNlZCkge1xuXHQgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgdm0gd2UgYXJlIGFjdHVhbGx5IGluIGZyb250IG9mXG5cdCAgICAgICAgICBjdXJyZW50TmV4dCA9IGZpbmROZXh0Vm0odm0sIHJlZilcblx0ICAgICAgICAgIC8vIHdlIG9ubHkgbmVlZCB0byBtb3ZlIGlmIHdlIGFyZSBub3QgaW4gdGhlIHJpZ2h0XG5cdCAgICAgICAgICAvLyBwbGFjZSBhbHJlYWR5LlxuXHQgICAgICAgICAgaWYgKGN1cnJlbnROZXh0ICE9PSB0YXJnZXROZXh0KSB7XG5cdCAgICAgICAgICAgIHZtLiRiZWZvcmUodGFyZ2V0TmV4dC4kZWwsIG51bGwsIGZhbHNlKVxuXHQgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAvLyBuZXcgaW5zdGFuY2UsIGluc2VydCB0byBleGlzdGluZyBuZXh0XG5cdCAgICAgICAgICB2bS4kYmVmb3JlKHRhcmdldE5leHQuJGVsKVxuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgICB2bS5fbmV3ID0gZmFsc2Vcblx0ICAgICAgdm0uX3JldXNlZCA9IGZhbHNlXG5cdCAgICB9XG5cdCAgICByZXR1cm4gdm1zXG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIEJ1aWxkIGEgbmV3IGluc3RhbmNlIGFuZCBjYWNoZSBpdC5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG5cdCAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG5cdCAgICovXG5cblx0ICBidWlsZDogZnVuY3Rpb24gKGRhdGEsIGluZGV4KSB7XG5cdCAgICB2YXIgb3JpZ2luYWwgPSBkYXRhXG5cdCAgICB2YXIgbWV0YSA9IHsgJGluZGV4OiBpbmRleCB9XG5cdCAgICBpZiAodGhpcy5jb252ZXJ0ZWQpIHtcblx0ICAgICAgbWV0YS4ka2V5ID0gb3JpZ2luYWwua2V5XG5cdCAgICB9XG5cdCAgICB2YXIgcmF3ID0gdGhpcy5jb252ZXJ0ZWQgPyBkYXRhLnZhbHVlIDogZGF0YVxuXHQgICAgdmFyIGFsaWFzID0gdGhpcy5hcmdcblx0ICAgIHZhciBoYXNBbGlhcyA9ICFpc09iamVjdChyYXcpIHx8IGFsaWFzXG5cdCAgICAvLyB3cmFwIHRoZSByYXcgZGF0YSB3aXRoIGFsaWFzXG5cdCAgICBkYXRhID0gaGFzQWxpYXMgPyB7fSA6IHJhd1xuXHQgICAgaWYgKGFsaWFzKSB7XG5cdCAgICAgIGRhdGFbYWxpYXNdID0gcmF3XG5cdCAgICB9IGVsc2UgaWYgKGhhc0FsaWFzKSB7XG5cdCAgICAgIG1ldGEuJHZhbHVlID0gcmF3XG5cdCAgICB9XG5cdCAgICAvLyByZXNvbHZlIGNvbnN0cnVjdG9yXG5cdCAgICB2YXIgQ3RvciA9IHRoaXMuQ3RvciB8fCB0aGlzLnJlc29sdmVDdG9yKGRhdGEsIG1ldGEpXG5cdCAgICB2YXIgdm0gPSB0aGlzLnZtLiRhZGRDaGlsZCh7XG5cdCAgICAgIGVsOiB0ZW1wbGF0ZVBhcnNlci5jbG9uZSh0aGlzLnRlbXBsYXRlKSxcblx0ICAgICAgX2xpbmtlcjogdGhpcy5fbGlua2VyLFxuXHQgICAgICBfbWV0YTogbWV0YSxcblx0ICAgICAgZGF0YTogZGF0YSxcblx0ICAgICAgaW5oZXJpdDogdGhpcy5pbmhlcml0XG5cdCAgICB9LCBDdG9yKVxuXHQgICAgLy8gY2FjaGUgaW5zdGFuY2Vcblx0ICAgIHRoaXMuY2FjaGVWbShyYXcsIHZtKVxuXHQgICAgcmV0dXJuIHZtXG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIFJlc29sdmUgYSBjb250cnVjdG9yIHRvIHVzZSBmb3IgYW4gaW5zdGFuY2UuXG5cdCAgICogVGhlIHRyaWNreSBwYXJ0IGhlcmUgaXMgdGhhdCB0aGVyZSBjb3VsZCBiZSBkeW5hbWljXG5cdCAgICogY29tcG9uZW50cyBkZXBlbmRpbmcgb24gaW5zdGFuY2UgZGF0YS5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG5cdCAgICogQHBhcmFtIHtPYmplY3R9IG1ldGFcblx0ICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cblx0ICAgKi9cblxuXHQgIHJlc29sdmVDdG9yOiBmdW5jdGlvbiAoZGF0YSwgbWV0YSkge1xuXHQgICAgLy8gY3JlYXRlIGEgdGVtcG9yYXJ5IGNvbnRleHQgb2JqZWN0IGFuZCBjb3B5IGRhdGFcblx0ICAgIC8vIGFuZCBtZXRhIHByb3BlcnRpZXMgb250byBpdC5cblx0ICAgIC8vIHVzZSBfLmRlZmluZSB0byBhdm9pZCBhY2NpZGVudGFsbHkgb3ZlcndyaXRpbmcgc2NvcGVcblx0ICAgIC8vIHByb3BlcnRpZXMuXG5cdCAgICB2YXIgY29udGV4dCA9IE9iamVjdC5jcmVhdGUodGhpcy52bSlcblx0ICAgIHZhciBrZXlcblx0ICAgIGZvciAoa2V5IGluIGRhdGEpIHtcblx0ICAgICAgXy5kZWZpbmUoY29udGV4dCwga2V5LCBkYXRhW2tleV0pXG5cdCAgICB9XG5cdCAgICBmb3IgKGtleSBpbiBtZXRhKSB7XG5cdCAgICAgIF8uZGVmaW5lKGNvbnRleHQsIGtleSwgbWV0YVtrZXldKVxuXHQgICAgfVxuXHQgICAgdmFyIGlkID0gdGhpcy5jdG9yR2V0dGVyLmNhbGwoY29udGV4dCwgY29udGV4dClcblx0ICAgIHZhciBDdG9yID0gdGhpcy52bS4kb3B0aW9ucy5jb21wb25lbnRzW2lkXVxuXHQgICAgXy5hc3NlcnRBc3NldChDdG9yLCAnY29tcG9uZW50JywgaWQpXG5cdCAgICByZXR1cm4gQ3RvclxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBVbmJpbmQsIHRlYXJkb3duIGV2ZXJ5dGhpbmdcblx0ICAgKi9cblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgaWYgKHRoaXMuY2hpbGRJZCkge1xuXHQgICAgICBkZWxldGUgdGhpcy52bS4kW3RoaXMuY2hpbGRJZF1cblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLnZtcykge1xuXHQgICAgICB2YXIgaSA9IHRoaXMudm1zLmxlbmd0aFxuXHQgICAgICB2YXIgdm1cblx0ICAgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICAgIHZtID0gdGhpcy52bXNbaV1cblx0ICAgICAgICB0aGlzLnVuY2FjaGVWbSh2bSlcblx0ICAgICAgICB2bS4kZGVzdHJveSgpXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogQ2FjaGUgYSB2bSBpbnN0YW5jZSBiYXNlZCBvbiBpdHMgZGF0YS5cblx0ICAgKlxuXHQgICAqIElmIHRoZSBkYXRhIGlzIGFuIG9iamVjdCwgd2Ugc2F2ZSB0aGUgdm0ncyByZWZlcmVuY2Ugb25cblx0ICAgKiB0aGUgZGF0YSBvYmplY3QgYXMgYSBoaWRkZW4gcHJvcGVydHkuIE90aGVyd2lzZSB3ZVxuXHQgICAqIGNhY2hlIHRoZW0gaW4gYW4gb2JqZWN0IGFuZCBmb3IgZWFjaCBwcmltaXRpdmUgdmFsdWVcblx0ICAgKiB0aGVyZSBpcyBhbiBhcnJheSBpbiBjYXNlIHRoZXJlIGFyZSBkdXBsaWNhdGVzLlxuXHQgICAqXG5cdCAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcblx0ICAgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICAgKi9cblxuXHQgIGNhY2hlVm06IGZ1bmN0aW9uIChkYXRhLCB2bSkge1xuXHQgICAgdmFyIGlkS2V5ID0gdGhpcy5pZEtleVxuXHQgICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZVxuXHQgICAgdmFyIGlkXG5cdCAgICBpZiAoaWRLZXkpIHtcblx0ICAgICAgaWQgPSBkYXRhW2lkS2V5XVxuXHQgICAgICBpZiAoIWNhY2hlW2lkXSkge1xuXHQgICAgICAgIGNhY2hlW2lkXSA9IHZtXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgXy53YXJuKCdEdXBsaWNhdGUgSUQgaW4gdi1yZXBlYXQ6ICcgKyBpZClcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIGlmIChpc09iamVjdChkYXRhKSkge1xuXHQgICAgICBpZCA9IHRoaXMuaWRcblx0ICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cdCAgICAgICAgaWYgKGRhdGFbaWRdID09PSBudWxsKSB7XG5cdCAgICAgICAgICBkYXRhW2lkXSA9IHZtXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgIF8ud2Fybihcblx0ICAgICAgICAgICAgJ0R1cGxpY2F0ZSBvYmplY3RzIGFyZSBub3Qgc3VwcG9ydGVkIGluIHYtcmVwZWF0Lidcblx0ICAgICAgICAgIClcblx0ICAgICAgICB9XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgXy5kZWZpbmUoZGF0YSwgdGhpcy5pZCwgdm0pXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGlmICghY2FjaGVbZGF0YV0pIHtcblx0ICAgICAgICBjYWNoZVtkYXRhXSA9IFt2bV1cblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBjYWNoZVtkYXRhXS5wdXNoKHZtKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICB2bS5fcmF3ID0gZGF0YVxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBUcnkgdG8gZ2V0IGEgY2FjaGVkIGluc3RhbmNlIGZyb20gYSBwaWVjZSBvZiBkYXRhLlxuXHQgICAqXG5cdCAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcblx0ICAgKiBAcmV0dXJuIHtWdWV8dW5kZWZpbmVkfVxuXHQgICAqL1xuXG5cdCAgZ2V0Vm06IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICBpZiAodGhpcy5pZEtleSkge1xuXHQgICAgICByZXR1cm4gdGhpcy5jYWNoZVtkYXRhW3RoaXMuaWRLZXldXVxuXHQgICAgfSBlbHNlIGlmIChpc09iamVjdChkYXRhKSkge1xuXHQgICAgICByZXR1cm4gZGF0YVt0aGlzLmlkXVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdmFyIGNhY2hlZCA9IHRoaXMuY2FjaGVbZGF0YV1cblx0ICAgICAgaWYgKGNhY2hlZCkge1xuXHQgICAgICAgIHZhciBpID0gMFxuXHQgICAgICAgIHZhciB2bSA9IGNhY2hlZFtpXVxuXHQgICAgICAgIC8vIHNpbmNlIGR1cGxpY2F0ZWQgdm0gaW5zdGFuY2VzIG1pZ2h0IGJlIGEgcmV1c2VkXG5cdCAgICAgICAgLy8gb25lIE9SIGEgbmV3bHkgY3JlYXRlZCBvbmUsIHdlIG5lZWQgdG8gcmV0dXJuIHRoZVxuXHQgICAgICAgIC8vIGZpcnN0IGluc3RhbmNlIHRoYXQgaXMgbmVpdGhlciBvZiB0aGVzZS5cblx0ICAgICAgICB3aGlsZSAodm0gJiYgKHZtLl9yZXVzZWQgfHwgdm0uX25ldykpIHtcblx0ICAgICAgICAgIHZtID0gY2FjaGVkWysraV1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHZtXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogRGVsZXRlIGEgY2FjaGVkIHZtIGluc3RhbmNlLlxuXHQgICAqXG5cdCAgICogQHBhcmFtIHtWdWV9IHZtXG5cdCAgICovXG5cblx0ICB1bmNhY2hlVm06IGZ1bmN0aW9uICh2bSkge1xuXHQgICAgdmFyIGRhdGEgPSB2bS5fcmF3XG5cdCAgICBpZiAodGhpcy5pZEtleSkge1xuXHQgICAgICB0aGlzLmNhY2hlW2RhdGFbdGhpcy5pZEtleV1dID0gbnVsbFxuXHQgICAgfSBlbHNlIGlmIChpc09iamVjdChkYXRhKSkge1xuXHQgICAgICBkYXRhW3RoaXMuaWRdID0gbnVsbFxuXHQgICAgICB2bS5fcmF3ID0gbnVsbFxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5jYWNoZVtkYXRhXS5wb3AoKVxuXHQgICAgfVxuXHQgIH1cblxuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlciB0byBmaW5kIHRoZSBuZXh0IGVsZW1lbnQgdGhhdCBpcyBhbiBpbnN0YW5jZVxuXHQgKiByb290IG5vZGUuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYSBkZXN0cm95ZWQgdm0nc1xuXHQgKiBlbGVtZW50IGNvdWxkIHN0aWxsIGJlIGxpbmdlcmluZyBpbiB0aGUgRE9NIGJlZm9yZSBpdHNcblx0ICogbGVhdmluZyB0cmFuc2l0aW9uIGZpbmlzaGVzLCBidXQgaXRzIF9fdnVlX18gcmVmZXJlbmNlXG5cdCAqIHNob3VsZCBoYXZlIGJlZW4gcmVtb3ZlZCBzbyB3ZSBjYW4gc2tpcCB0aGVtLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICogQHBhcmFtIHtDb21tZW50Tm9kZX0gcmVmXG5cdCAqIEByZXR1cm4ge1Z1ZX1cblx0ICovXG5cblx0ZnVuY3Rpb24gZmluZE5leHRWbSAodm0sIHJlZikge1xuXHQgIHZhciBlbCA9ICh2bS5fYmxvY2tFbmQgfHwgdm0uJGVsKS5uZXh0U2libGluZ1xuXHQgIHdoaWxlICghZWwuX192dWVfXyAmJiBlbCAhPT0gcmVmKSB7XG5cdCAgICBlbCA9IGVsLm5leHRTaWJsaW5nXG5cdCAgfVxuXHQgIHJldHVybiBlbC5fX3Z1ZV9fXG5cdH1cblxuXHQvKipcblx0ICogQXR0ZW1wdCB0byBjb252ZXJ0IG5vbi1BcnJheSBvYmplY3RzIHRvIGFycmF5LlxuXHQgKiBUaGlzIGlzIHRoZSBkZWZhdWx0IGZpbHRlciBpbnN0YWxsZWQgdG8gZXZlcnkgdi1yZXBlYXRcblx0ICogZGlyZWN0aXZlLlxuXHQgKlxuXHQgKiBJdCB3aWxsIGJlIGNhbGxlZCB3aXRoICoqdGhlIGRpcmVjdGl2ZSoqIGFzIGB0aGlzYFxuXHQgKiBjb250ZXh0IHNvIHRoYXQgd2UgY2FuIG1hcmsgdGhlIHJlcGVhdCBhcnJheSBhcyBjb252ZXJ0ZWRcblx0ICogZnJvbSBhbiBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gb2JqXG5cdCAqIEByZXR1cm4ge0FycmF5fVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblxuXHRmdW5jdGlvbiBvYmpUb0FycmF5IChvYmopIHtcblx0ICBpZiAoIV8uaXNQbGFpbk9iamVjdChvYmopKSB7XG5cdCAgICByZXR1cm4gb2JqXG5cdCAgfVxuXHQgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKVxuXHQgIHZhciBpID0ga2V5cy5sZW5ndGhcblx0ICB2YXIgcmVzID0gbmV3IEFycmF5KGkpXG5cdCAgdmFyIGtleVxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIGtleSA9IGtleXNbaV1cblx0ICAgIHJlc1tpXSA9IHtcblx0ICAgICAga2V5OiBrZXksXG5cdCAgICAgIHZhbHVlOiBvYmpba2V5XVxuXHQgICAgfVxuXHQgIH1cblx0ICAvLyBgdGhpc2AgcG9pbnRzIHRvIHRoZSByZXBlYXQgZGlyZWN0aXZlIGluc3RhbmNlXG5cdCAgdGhpcy5jb252ZXJ0ZWQgPSB0cnVlXG5cdCAgcmV0dXJuIHJlc1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIHJhbmdlIGFycmF5IGZyb20gZ2l2ZW4gbnVtYmVyLlxuXHQgKlxuXHQgKiBAcGFyYW0ge051bWJlcn0gblxuXHQgKiBAcmV0dXJuIHtBcnJheX1cblx0ICovXG5cblx0ZnVuY3Rpb24gcmFuZ2UgKG4pIHtcblx0ICB2YXIgaSA9IC0xXG5cdCAgdmFyIHJldCA9IG5ldyBBcnJheShuKVxuXHQgIHdoaWxlICgrK2kgPCBuKSB7XG5cdCAgICByZXRbaV0gPSBpXG5cdCAgfVxuXHQgIHJldHVybiByZXRcblx0fVxuXG4vKioqLyB9LFxuLyogMzEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgY29tcGlsZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDMpXG5cdHZhciB0ZW1wbGF0ZVBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNTApXG5cdHZhciB0cmFuc2l0aW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MilcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBlbCA9IHRoaXMuZWxcblx0ICAgIGlmICghZWwuX192dWVfXykge1xuXHQgICAgICB0aGlzLnN0YXJ0ID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgndi1pZi1zdGFydCcpXG5cdCAgICAgIHRoaXMuZW5kID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgndi1pZi1lbmQnKVxuXHQgICAgICBfLnJlcGxhY2UoZWwsIHRoaXMuZW5kKVxuXHQgICAgICBfLmJlZm9yZSh0aGlzLnN0YXJ0LCB0aGlzLmVuZClcblx0ICAgICAgaWYgKGVsLnRhZ05hbWUgPT09ICdURU1QTEFURScpIHtcblx0ICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGVQYXJzZXIucGFyc2UoZWwsIHRydWUpXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXHQgICAgICAgIHRoaXMudGVtcGxhdGUuYXBwZW5kQ2hpbGQoZWwpXG5cdCAgICAgIH1cblx0ICAgICAgLy8gY29tcGlsZSB0aGUgbmVzdGVkIHBhcnRpYWxcblx0ICAgICAgdGhpcy5saW5rZXIgPSBjb21waWxlKFxuXHQgICAgICAgIHRoaXMudGVtcGxhdGUsXG5cdCAgICAgICAgdGhpcy52bS4kb3B0aW9ucyxcblx0ICAgICAgICB0cnVlXG5cdCAgICAgIClcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuaW52YWxpZCA9IHRydWVcblx0ICAgICAgXy53YXJuKFxuXHQgICAgICAgICd2LWlmPVwiJyArIHRoaXMuZXhwcmVzc2lvbiArICdcIiBjYW5ub3QgYmUgJyArXG5cdCAgICAgICAgJ3VzZWQgb24gYW4gYWxyZWFkeSBtb3VudGVkIGluc3RhbmNlLidcblx0ICAgICAgKVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgaWYgKHRoaXMuaW52YWxpZCkgcmV0dXJuXG5cdCAgICBpZiAodmFsdWUpIHtcblx0ICAgICAgdGhpcy5pbnNlcnQoKVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy50ZWFyZG93bigpXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIGluc2VydDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIHZtID0gdGhpcy52bVxuXHQgICAgdmFyIGZyYWcgPSB0ZW1wbGF0ZVBhcnNlci5jbG9uZSh0aGlzLnRlbXBsYXRlKVxuXHQgICAgdmFyIGRlY29tcGlsZSA9IHRoaXMubGlua2VyKHZtLCBmcmFnKVxuXHQgICAgdGhpcy5kZWNvbXBpbGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIGRlY29tcGlsZSgpXG5cdCAgICAgIHRyYW5zaXRpb24uYmxvY2tSZW1vdmUodGhpcy5zdGFydCwgdGhpcy5lbmQsIHZtKVxuXHQgICAgfVxuXHQgICAgdHJhbnNpdGlvbi5ibG9ja0FwcGVuZChmcmFnLCB0aGlzLmVuZCwgdm0pXG5cdCAgfSxcblxuXHQgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG5cdCAgICBpZiAodGhpcy5kZWNvbXBpbGUpIHtcblx0ICAgICAgdGhpcy5kZWNvbXBpbGUoKVxuXHQgICAgICB0aGlzLmRlY29tcGlsZSA9IG51bGxcblx0ICAgIH1cblx0ICB9XG5cblx0fVxuXG4vKioqLyB9LFxuLyogMzIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgV2F0Y2hlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBwcmlvcml0eTogOTAwLFxuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIHZtID0gdGhpcy52bVxuXHQgICAgaWYgKHRoaXMuZWwgIT09IHZtLiRlbCkge1xuXHQgICAgICBfLndhcm4oXG5cdCAgICAgICAgJ3Ytd2l0aCBjYW4gb25seSBiZSB1c2VkIG9uIGluc3RhbmNlIHJvb3QgZWxlbWVudHMuJ1xuXHQgICAgICApXG5cdCAgICB9IGVsc2UgaWYgKCF2bS4kcGFyZW50KSB7XG5cdCAgICAgIF8ud2Fybihcblx0ICAgICAgICAndi13aXRoIG11c3QgYmUgdXNlZCBvbiBhbiBpbnN0YW5jZSB3aXRoIGEgcGFyZW50Lidcblx0ICAgICAgKVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdmFyIGtleSA9IHRoaXMuYXJnXG5cdCAgICAgIHRoaXMud2F0Y2hlciA9IG5ldyBXYXRjaGVyKFxuXHQgICAgICAgIHZtLiRwYXJlbnQsXG5cdCAgICAgICAgdGhpcy5leHByZXNzaW9uLFxuXHQgICAgICAgIGtleVxuXHQgICAgICAgICAgPyBmdW5jdGlvbiAodmFsKSB7XG5cdCAgICAgICAgICAgICAgdm0uJHNldChrZXksIHZhbClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgOiBmdW5jdGlvbiAodmFsKSB7XG5cdCAgICAgICAgICAgICAgdm0uJGRhdGEgPSB2YWxcblx0ICAgICAgICAgICAgfVxuXHQgICAgICApXG5cdCAgICAgIC8vIGluaXRpYWwgc2V0XG5cdCAgICAgIHZhciBpbml0aWFsVmFsID0gdGhpcy53YXRjaGVyLnZhbHVlXG5cdCAgICAgIGlmIChrZXkpIHtcblx0ICAgICAgICB2bS4kc2V0KGtleSwgaW5pdGlhbFZhbClcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICB2bS4kZGF0YSA9IGluaXRpYWxWYWxcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICB1bmJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIGlmICh0aGlzLndhdGNoZXIpIHtcblx0ICAgICAgdGhpcy53YXRjaGVyLnRlYXJkb3duKClcblx0ICAgIH1cblx0ICB9XG5cblx0fVxuXG4vKioqLyB9LFxuLyogMzMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgUGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18oNTEpXG5cblx0LyoqXG5cdCAqIEZpbHRlciBmaWx0ZXIgZm9yIHYtcmVwZWF0XG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hLZXlcblx0ICogQHBhcmFtIHtTdHJpbmd9IFtkZWxpbWl0ZXJdXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhS2V5XG5cdCAqL1xuXG5cdGV4cG9ydHMuZmlsdGVyQnkgPSBmdW5jdGlvbiAoYXJyLCBzZWFyY2hLZXksIGRlbGltaXRlciwgZGF0YUtleSkge1xuXHQgIC8vIGFsbG93IG9wdGlvbmFsIGBpbmAgZGVsaW1pdGVyXG5cdCAgLy8gYmVjYXVzZSB3aHkgbm90XG5cdCAgaWYgKGRlbGltaXRlciAmJiBkZWxpbWl0ZXIgIT09ICdpbicpIHtcblx0ICAgIGRhdGFLZXkgPSBkZWxpbWl0ZXJcblx0ICB9XG5cdCAgLy8gZ2V0IHRoZSBzZWFyY2ggc3RyaW5nXG5cdCAgdmFyIHNlYXJjaCA9XG5cdCAgICBfLnN0cmlwUXVvdGVzKHNlYXJjaEtleSkgfHxcblx0ICAgIHRoaXMuJGdldChzZWFyY2hLZXkpXG5cdCAgaWYgKCFzZWFyY2gpIHtcblx0ICAgIHJldHVybiBhcnJcblx0ICB9XG5cdCAgc2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKClcblx0ICAvLyBnZXQgdGhlIG9wdGlvbmFsIGRhdGFLZXlcblx0ICBkYXRhS2V5ID1cblx0ICAgIGRhdGFLZXkgJiZcblx0ICAgIChfLnN0cmlwUXVvdGVzKGRhdGFLZXkpIHx8IHRoaXMuJGdldChkYXRhS2V5KSlcblx0ICByZXR1cm4gYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuXHQgICAgcmV0dXJuIGRhdGFLZXlcblx0ICAgICAgPyBjb250YWlucyhQYXRoLmdldChpdGVtLCBkYXRhS2V5KSwgc2VhcmNoKVxuXHQgICAgICA6IGNvbnRhaW5zKGl0ZW0sIHNlYXJjaClcblx0ICB9KVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpbHRlciBmaWx0ZXIgZm9yIHYtcmVwZWF0XG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzb3J0S2V5XG5cdCAqIEBwYXJhbSB7U3RyaW5nfSByZXZlcnNlS2V5XG5cdCAqL1xuXG5cdGV4cG9ydHMub3JkZXJCeSA9IGZ1bmN0aW9uIChhcnIsIHNvcnRLZXksIHJldmVyc2VLZXkpIHtcblx0ICB2YXIga2V5ID1cblx0ICAgIF8uc3RyaXBRdW90ZXMoc29ydEtleSkgfHxcblx0ICAgIHRoaXMuJGdldChzb3J0S2V5KVxuXHQgIGlmICgha2V5KSB7XG5cdCAgICByZXR1cm4gYXJyXG5cdCAgfVxuXHQgIHZhciBvcmRlciA9IDFcblx0ICBpZiAocmV2ZXJzZUtleSkge1xuXHQgICAgaWYgKHJldmVyc2VLZXkgPT09ICctMScpIHtcblx0ICAgICAgb3JkZXIgPSAtMVxuXHQgICAgfSBlbHNlIGlmIChyZXZlcnNlS2V5LmNoYXJDb2RlQXQoMCkgPT09IDB4MjEpIHsgLy8gIVxuXHQgICAgICByZXZlcnNlS2V5ID0gcmV2ZXJzZUtleS5zbGljZSgxKVxuXHQgICAgICBvcmRlciA9IHRoaXMuJGdldChyZXZlcnNlS2V5KSA/IDEgOiAtMVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgb3JkZXIgPSB0aGlzLiRnZXQocmV2ZXJzZUtleSkgPyAtMSA6IDFcblx0ICAgIH1cblx0ICB9XG5cdCAgLy8gc29ydCBvbiBhIGNvcHkgdG8gYXZvaWQgbXV0YXRpbmcgb3JpZ2luYWwgYXJyYXlcblx0ICByZXR1cm4gYXJyLnNsaWNlKCkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHQgICAgYSA9IFBhdGguZ2V0KGEsIGtleSlcblx0ICAgIGIgPSBQYXRoLmdldChiLCBrZXkpXG5cdCAgICByZXR1cm4gYSA9PT0gYiA/IDAgOiBhID4gYiA/IG9yZGVyIDogLW9yZGVyXG5cdCAgfSlcblx0fVxuXG5cdC8qKlxuXHQgKiBTdHJpbmcgY29udGFpbiBoZWxwZXJcblx0ICpcblx0ICogQHBhcmFtIHsqfSB2YWxcblx0ICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFxuXHQgKi9cblxuXHRmdW5jdGlvbiBjb250YWlucyAodmFsLCBzZWFyY2gpIHtcblx0ICBpZiAoXy5pc09iamVjdCh2YWwpKSB7XG5cdCAgICBmb3IgKHZhciBrZXkgaW4gdmFsKSB7XG5cdCAgICAgIGlmIChjb250YWlucyh2YWxba2V5XSwgc2VhcmNoKSkge1xuXHQgICAgICAgIHJldHVybiB0cnVlXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9IGVsc2UgaWYgKHZhbCAhPSBudWxsKSB7XG5cdCAgICByZXR1cm4gdmFsLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaCkgPiAtMVxuXHQgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogMzQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qKlxuXHQgKiBDaGVjayBpcyBhIHN0cmluZyBzdGFydHMgd2l0aCAkIG9yIF9cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0clxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblxuXHRleHBvcnRzLmlzUmVzZXJ2ZWQgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdCAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdCgwKVxuXHQgIHJldHVybiBjID09PSAweDI0IHx8IGMgPT09IDB4NUZcblx0fVxuXG5cdC8qKlxuXHQgKiBHdWFyZCB0ZXh0IG91dHB1dCwgbWFrZSBzdXJlIHVuZGVmaW5lZCBvdXRwdXRzXG5cdCAqIGVtcHR5IHN0cmluZ1xuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAqIEByZXR1cm4ge1N0cmluZ31cblx0ICovXG5cblx0ZXhwb3J0cy50b1N0cmluZyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgIHJldHVybiB2YWx1ZSA9PSBudWxsXG5cdCAgICA/ICcnXG5cdCAgICA6IHZhbHVlLnRvU3RyaW5nKClcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayBhbmQgY29udmVydCBwb3NzaWJsZSBudW1lcmljIG51bWJlcnMgYmVmb3JlXG5cdCAqIHNldHRpbmcgYmFjayB0byBkYXRhXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcblx0ICogQHJldHVybiB7KnxOdW1iZXJ9XG5cdCAqL1xuXG5cdGV4cG9ydHMudG9OdW1iZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICByZXR1cm4gKFxuXHQgICAgaXNOYU4odmFsdWUpIHx8XG5cdCAgICB2YWx1ZSA9PT0gbnVsbCB8fFxuXHQgICAgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbidcblx0ICApID8gdmFsdWVcblx0ICAgIDogTnVtYmVyKHZhbHVlKVxuXHR9XG5cblx0LyoqXG5cdCAqIFN0cmlwIHF1b3RlcyBmcm9tIGEgc3RyaW5nXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcblx0ICogQHJldHVybiB7U3RyaW5nIHwgZmFsc2V9XG5cdCAqL1xuXG5cdGV4cG9ydHMuc3RyaXBRdW90ZXMgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdCAgdmFyIGEgPSBzdHIuY2hhckNvZGVBdCgwKVxuXHQgIHZhciBiID0gc3RyLmNoYXJDb2RlQXQoc3RyLmxlbmd0aCAtIDEpXG5cdCAgcmV0dXJuIGEgPT09IGIgJiYgKGEgPT09IDB4MjIgfHwgYSA9PT0gMHgyNylcblx0ICAgID8gc3RyLnNsaWNlKDEsIC0xKVxuXHQgICAgOiBmYWxzZVxuXHR9XG5cblx0LyoqXG5cdCAqIENhbWVsaXplIGEgaHlwaGVuLWRlbG1pdGVkIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0clxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdHZhciBjYW1lbFJFID0gLyg/Ol58Wy1fXSkoXFx3KS9nXG5cdGV4cG9ydHMuY2FtZWxpemUgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdCAgcmV0dXJuIHN0ci5yZXBsYWNlIChjYW1lbFJFLCBmdW5jdGlvbiAoXywgYykge1xuXHQgICAgcmV0dXJuIGMgPyBjLnRvVXBwZXJDYXNlICgpIDogJyc7XG5cdCAgfSlcblx0fVxuXG5cdC8qKlxuXHQgKiBTaW1wbGUgYmluZCwgZmFzdGVyIHRoYW4gbmF0aXZlXG5cdCAqXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBjdHhcblx0ICogQHJldHVybiB7RnVuY3Rpb259XG5cdCAqL1xuXG5cdGV4cG9ydHMuYmluZCA9IGZ1bmN0aW9uIChmbiwgY3R4KSB7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiBmbi5hcHBseShjdHgsIGFyZ3VtZW50cylcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydCBhbiBBcnJheS1saWtlIG9iamVjdCB0byBhIHJlYWwgQXJyYXkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXktbGlrZX0gbGlzdFxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3N0YXJ0XSAtIHN0YXJ0IGluZGV4XG5cdCAqIEByZXR1cm4ge0FycmF5fVxuXHQgKi9cblxuXHRleHBvcnRzLnRvQXJyYXkgPSBmdW5jdGlvbiAobGlzdCwgc3RhcnQpIHtcblx0ICBzdGFydCA9IHN0YXJ0IHx8IDBcblx0ICB2YXIgaSA9IGxpc3QubGVuZ3RoIC0gc3RhcnRcblx0ICB2YXIgcmV0ID0gbmV3IEFycmF5KGkpXG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAgcmV0W2ldID0gbGlzdFtpICsgc3RhcnRdXG5cdCAgfVxuXHQgIHJldHVybiByZXRcblx0fVxuXG5cdC8qKlxuXHQgKiBNaXggcHJvcGVydGllcyBpbnRvIHRhcmdldCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB0b1xuXHQgKiBAcGFyYW0ge09iamVjdH0gZnJvbVxuXHQgKi9cblxuXHRleHBvcnRzLmV4dGVuZCA9IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuXHQgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdCAgICB0b1trZXldID0gZnJvbVtrZXldXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFF1aWNrIG9iamVjdCBjaGVjayAtIHRoaXMgaXMgcHJpbWFyaWx5IHVzZWQgdG8gdGVsbFxuXHQgKiBPYmplY3RzIGZyb20gcHJpbWl0aXZlIHZhbHVlcyB3aGVuIHdlIGtub3cgdGhlIHZhbHVlXG5cdCAqIGlzIGEgSlNPTi1jb21wbGlhbnQgdHlwZS5cblx0ICpcblx0ICogQHBhcmFtIHsqfSBvYmpcblx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0ICovXG5cblx0ZXhwb3J0cy5pc09iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcblx0ICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG5cdH1cblxuXHQvKipcblx0ICogU3RyaWN0IG9iamVjdCB0eXBlIGNoZWNrLiBPbmx5IHJldHVybnMgdHJ1ZVxuXHQgKiBmb3IgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3RzLlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IG9ialxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblxuXHR2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cdGV4cG9ydHMuaXNQbGFpbk9iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcblx0ICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJ1xuXHR9XG5cblx0LyoqXG5cdCAqIEFycmF5IHR5cGUgY2hlY2suXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gb2JqXG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCAqL1xuXG5cdGV4cG9ydHMuaXNBcnJheSA9IGZ1bmN0aW9uIChvYmopIHtcblx0ICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopXG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHlcblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IG9ialxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqIEBwYXJhbSB7Kn0gdmFsXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW2VudW1lcmFibGVdXG5cdCAqL1xuXG5cdGV4cG9ydHMuZGVmaW5lID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWwsIGVudW1lcmFibGUpIHtcblx0ICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcblx0ICAgIHZhbHVlICAgICAgICA6IHZhbCxcblx0ICAgIGVudW1lcmFibGUgICA6ICEhZW51bWVyYWJsZSxcblx0ICAgIHdyaXRhYmxlICAgICA6IHRydWUsXG5cdCAgICBjb25maWd1cmFibGUgOiB0cnVlXG5cdCAgfSlcblx0fVxuXG4vKioqLyB9LFxuLyogMzUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qKlxuXHQgKiBDYW4gd2UgdXNlIF9fcHJvdG9fXz9cblx0ICpcblx0ICogQHR5cGUge0Jvb2xlYW59XG5cdCAqL1xuXG5cdGV4cG9ydHMuaGFzUHJvdG8gPSAnX19wcm90b19fJyBpbiB7fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2UgaGF2ZSBhIHdpbmRvd1xuXHQgKlxuXHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0ICovXG5cblx0dmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXHR2YXIgaW5Ccm93c2VyID0gZXhwb3J0cy5pbkJyb3dzZXIgPVxuXHQgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG5cdCAgdG9TdHJpbmcuY2FsbCh3aW5kb3cpICE9PSAnW29iamVjdCBPYmplY3RdJ1xuXG5cdC8qKlxuXHQgKiBEZWZlciBhIHRhc2sgdG8gdGhlIHN0YXJ0IG9mIHRoZSBuZXh0IGV2ZW50IGxvb3Bcblx0ICpcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2Jcblx0ICogQHBhcmFtIHtPYmplY3R9IGN0eFxuXHQgKi9cblxuXHR2YXIgZGVmZXIgPSBpbkJyb3dzZXJcblx0ICA/ICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdCAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdCAgICBzZXRUaW1lb3V0KVxuXHQgIDogc2V0VGltZW91dFxuXG5cdGV4cG9ydHMubmV4dFRpY2sgPSBmdW5jdGlvbiAoY2IsIGN0eCkge1xuXHQgIGlmIChjdHgpIHtcblx0ICAgIGRlZmVyKGZ1bmN0aW9uICgpIHsgY2IuY2FsbChjdHgpIH0sIDApXG5cdCAgfSBlbHNlIHtcblx0ICAgIGRlZmVyKGNiLCAwKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBEZXRlY3QgaWYgd2UgYXJlIGluIElFOS4uLlxuXHQgKlxuXHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0ICovXG5cblx0ZXhwb3J0cy5pc0lFOSA9XG5cdCAgaW5Ccm93c2VyICYmXG5cdCAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdNU0lFIDkuMCcpID4gMFxuXG5cdC8qKlxuXHQgKiBTbmlmZiB0cmFuc2l0aW9uL2FuaW1hdGlvbiBldmVudHNcblx0ICovXG5cblx0aWYgKGluQnJvd3NlciAmJiAhZXhwb3J0cy5pc0lFOSkge1xuXHQgIHZhciBpc1dlYmtpdFRyYW5zID1cblx0ICAgIHdpbmRvdy5vbnRyYW5zaXRpb25lbmQgPT09IHVuZGVmaW5lZCAmJlxuXHQgICAgd2luZG93Lm9ud2Via2l0dHJhbnNpdGlvbmVuZCAhPT0gdW5kZWZpbmVkXG5cdCAgdmFyIGlzV2Via2l0QW5pbSA9XG5cdCAgICB3aW5kb3cub25hbmltYXRpb25lbmQgPT09IHVuZGVmaW5lZCAmJlxuXHQgICAgd2luZG93Lm9ud2Via2l0YW5pbWF0aW9uZW5kICE9PSB1bmRlZmluZWRcblx0ICBleHBvcnRzLnRyYW5zaXRpb25Qcm9wID0gaXNXZWJraXRUcmFuc1xuXHQgICAgPyAnV2Via2l0VHJhbnNpdGlvbidcblx0ICAgIDogJ3RyYW5zaXRpb24nXG5cdCAgZXhwb3J0cy50cmFuc2l0aW9uRW5kRXZlbnQgPSBpc1dlYmtpdFRyYW5zXG5cdCAgICA/ICd3ZWJraXRUcmFuc2l0aW9uRW5kJ1xuXHQgICAgOiAndHJhbnNpdGlvbmVuZCdcblx0ICBleHBvcnRzLmFuaW1hdGlvblByb3AgPSBpc1dlYmtpdEFuaW1cblx0ICAgID8gJ1dlYmtpdEFuaW1hdGlvbidcblx0ICAgIDogJ2FuaW1hdGlvbidcblx0ICBleHBvcnRzLmFuaW1hdGlvbkVuZEV2ZW50ID0gaXNXZWJraXRBbmltXG5cdCAgICA/ICd3ZWJraXRBbmltYXRpb25FbmQnXG5cdCAgICA6ICdhbmltYXRpb25lbmQnXG5cdH1cblxuLyoqKi8gfSxcbi8qIDM2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgY29uZmlnID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSlcblxuXHQvKipcblx0ICogQ2hlY2sgaWYgYSBub2RlIGlzIGluIHRoZSBkb2N1bWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtOb2RlfSBub2RlXG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCAqL1xuXG5cdHZhciBkb2MgPVxuXHQgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiZcblx0ICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcblxuXHRleHBvcnRzLmluRG9jID0gZnVuY3Rpb24gKG5vZGUpIHtcblx0ICByZXR1cm4gZG9jICYmIGRvYy5jb250YWlucyhub2RlKVxuXHR9XG5cblx0LyoqXG5cdCAqIEV4dHJhY3QgYW4gYXR0cmlidXRlIGZyb20gYSBub2RlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IG5vZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGF0dHJcblx0ICovXG5cblx0ZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gKG5vZGUsIGF0dHIpIHtcblx0ICBhdHRyID0gY29uZmlnLnByZWZpeCArIGF0dHJcblx0ICB2YXIgdmFsID0gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cilcblx0ICBpZiAodmFsICE9PSBudWxsKSB7XG5cdCAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyKVxuXHQgIH1cblx0ICByZXR1cm4gdmFsXG5cdH1cblxuXHQvKipcblx0ICogSW5zZXJ0IGVsIGJlZm9yZSB0YXJnZXRcblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCBcblx0ICovXG5cblx0ZXhwb3J0cy5iZWZvcmUgPSBmdW5jdGlvbiAoZWwsIHRhcmdldCkge1xuXHQgIHRhcmdldC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgdGFyZ2V0KVxuXHR9XG5cblx0LyoqXG5cdCAqIEluc2VydCBlbCBhZnRlciB0YXJnZXRcblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCBcblx0ICovXG5cblx0ZXhwb3J0cy5hZnRlciA9IGZ1bmN0aW9uIChlbCwgdGFyZ2V0KSB7XG5cdCAgaWYgKHRhcmdldC5uZXh0U2libGluZykge1xuXHQgICAgZXhwb3J0cy5iZWZvcmUoZWwsIHRhcmdldC5uZXh0U2libGluZylcblx0ICB9IGVsc2Uge1xuXHQgICAgdGFyZ2V0LnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZWwpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBlbCBmcm9tIERPTVxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqL1xuXG5cdGV4cG9ydHMucmVtb3ZlID0gZnVuY3Rpb24gKGVsKSB7XG5cdCAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbClcblx0fVxuXG5cdC8qKlxuXHQgKiBQcmVwZW5kIGVsIHRvIHRhcmdldFxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IFxuXHQgKi9cblxuXHRleHBvcnRzLnByZXBlbmQgPSBmdW5jdGlvbiAoZWwsIHRhcmdldCkge1xuXHQgIGlmICh0YXJnZXQuZmlyc3RDaGlsZCkge1xuXHQgICAgZXhwb3J0cy5iZWZvcmUoZWwsIHRhcmdldC5maXJzdENoaWxkKVxuXHQgIH0gZWxzZSB7XG5cdCAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoZWwpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlcGxhY2UgdGFyZ2V0IHdpdGggZWxcblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKi9cblxuXHRleHBvcnRzLnJlcGxhY2UgPSBmdW5jdGlvbiAodGFyZ2V0LCBlbCkge1xuXHQgIHZhciBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZVxuXHQgIGlmIChwYXJlbnQpIHtcblx0ICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoZWwsIHRhcmdldClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ29weSBhdHRyaWJ1dGVzIGZyb20gb25lIGVsZW1lbnQgdG8gYW5vdGhlci5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBmcm9tXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gdG9cblx0ICovXG5cblx0ZXhwb3J0cy5jb3B5QXR0cmlidXRlcyA9IGZ1bmN0aW9uIChmcm9tLCB0bykge1xuXHQgIGlmIChmcm9tLmhhc0F0dHJpYnV0ZXMoKSkge1xuXHQgICAgdmFyIGF0dHJzID0gZnJvbS5hdHRyaWJ1dGVzXG5cdCAgICBmb3IgKHZhciBpID0gMCwgbCA9IGF0dHJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgICB2YXIgYXR0ciA9IGF0dHJzW2ldXG5cdCAgICAgIHRvLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBldmVudCBsaXN0ZW5lciBzaG9ydGhhbmQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG5cdCAqL1xuXG5cdGV4cG9ydHMub24gPSBmdW5jdGlvbiAoZWwsIGV2ZW50LCBjYikge1xuXHQgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNiKVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBldmVudCBsaXN0ZW5lciBzaG9ydGhhbmQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG5cdCAqL1xuXG5cdGV4cG9ydHMub2ZmID0gZnVuY3Rpb24gKGVsLCBldmVudCwgY2IpIHtcblx0ICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBjYilcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wYXRpYmlsaXR5IGFkZCBjbGFzcyBmb3IgSUU5XG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtTdHJvbmd9IGNsc1xuXHQgKi9cblxuXHRleHBvcnRzLmFkZENsYXNzID0gZnVuY3Rpb24gKGVsLCBjbHMpIHtcblx0ICB2YXIgY3VyID0gJyAnICsgZWwuY2xhc3NOYW1lICsgJyAnXG5cdCAgaWYgKGN1ci5pbmRleE9mKCcgJyArIGNscyArICcgJykgPCAwKSB7XG5cdCAgICBlbC5jbGFzc05hbWUgPSAoY3VyICsgY2xzKS50cmltKClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGF0aWJpbGl0eSByZW1vdmUgY2xhc3MgZm9yIElFOVxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7U3Ryb25nfSBjbHNcblx0ICovXG5cblx0ZXhwb3J0cy5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChlbCwgY2xzKSB7XG5cdCAgdmFyIGN1ciA9ICcgJyArIGVsLmNsYXNzTmFtZSArICcgJ1xuXHQgIHZhciB0YXIgPSAnICcgKyBjbHMgKyAnICdcblx0ICB3aGlsZSAoY3VyLmluZGV4T2YodGFyKSA+PSAwKSB7XG5cdCAgICBjdXIgPSBjdXIucmVwbGFjZSh0YXIsICcgJylcblx0ICB9XG5cdCAgZWwuY2xhc3NOYW1lID0gY3VyLnRyaW0oKVxuXHR9XG5cbi8qKiovIH0sXG4vKiAzNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM4KVxuXG5cdC8qKlxuXHQgKiBSZXNvbHZlIHJlYWQgJiB3cml0ZSBmaWx0ZXJzIGZvciBhIHZtIGluc3RhbmNlLiBUaGVcblx0ICogZmlsdGVycyBkZXNjcmlwdG9yIEFycmF5IGNvbWVzIGZyb20gdGhlIGRpcmVjdGl2ZSBwYXJzZXIuXG5cdCAqXG5cdCAqIFRoaXMgaXMgZXh0cmFjdGVkIGludG8gaXRzIG93biB1dGlsaXR5IHNvIGl0IGNhblxuXHQgKiBiZSB1c2VkIGluIG11bHRpcGxlIHNjZW5hcmlvcy5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZmlsdGVyc1xuXHQgKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF1cblx0ICogQHJldHVybiB7T2JqZWN0fVxuXHQgKi9cblxuXHRleHBvcnRzLnJlc29sdmVGaWx0ZXJzID0gZnVuY3Rpb24gKHZtLCBmaWx0ZXJzLCB0YXJnZXQpIHtcblx0ICBpZiAoIWZpbHRlcnMpIHtcblx0ICAgIHJldHVyblxuXHQgIH1cblx0ICB2YXIgcmVzID0gdGFyZ2V0IHx8IHt9XG5cdCAgLy8gdmFyIHJlZ2lzdHJ5ID0gdm0uJG9wdGlvbnMuZmlsdGVyc1xuXHQgIGZpbHRlcnMuZm9yRWFjaChmdW5jdGlvbiAoZikge1xuXHQgICAgdmFyIGRlZiA9IHZtLiRvcHRpb25zLmZpbHRlcnNbZi5uYW1lXVxuXHQgICAgXy5hc3NlcnRBc3NldChkZWYsICdmaWx0ZXInLCBmLm5hbWUpXG5cdCAgICBpZiAoIWRlZikgcmV0dXJuXG5cdCAgICB2YXIgYXJncyA9IGYuYXJnc1xuXHQgICAgdmFyIHJlYWRlciwgd3JpdGVyXG5cdCAgICBpZiAodHlwZW9mIGRlZiA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICByZWFkZXIgPSBkZWZcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHJlYWRlciA9IGRlZi5yZWFkXG5cdCAgICAgIHdyaXRlciA9IGRlZi53cml0ZVxuXHQgICAgfVxuXHQgICAgaWYgKHJlYWRlcikge1xuXHQgICAgICBpZiAoIXJlcy5yZWFkKSByZXMucmVhZCA9IFtdXG5cdCAgICAgIHJlcy5yZWFkLnB1c2goZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICAgICAgcmV0dXJuIGFyZ3Ncblx0ICAgICAgICAgID8gcmVhZGVyLmFwcGx5KHZtLCBbdmFsdWVdLmNvbmNhdChhcmdzKSlcblx0ICAgICAgICAgIDogcmVhZGVyLmNhbGwodm0sIHZhbHVlKVxuXHQgICAgICB9KVxuXHQgICAgfVxuXHQgICAgaWYgKHdyaXRlcikge1xuXHQgICAgICBpZiAoIXJlcy53cml0ZSkgcmVzLndyaXRlID0gW11cblx0ICAgICAgcmVzLndyaXRlLnB1c2goZnVuY3Rpb24gKHZhbHVlLCBvbGRWYWwpIHtcblx0ICAgICAgICByZXR1cm4gYXJnc1xuXHQgICAgICAgICAgPyB3cml0ZXIuYXBwbHkodm0sIFt2YWx1ZSwgb2xkVmFsXS5jb25jYXQoYXJncykpXG5cdCAgICAgICAgICA6IHdyaXRlci5jYWxsKHZtLCB2YWx1ZSwgb2xkVmFsKVxuXHQgICAgICB9KVxuXHQgICAgfVxuXHQgIH0pXG5cdCAgcmV0dXJuIHJlc1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGx5IGZpbHRlcnMgdG8gYSB2YWx1ZVxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGZpbHRlcnNcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7Kn0gb2xkVmFsXG5cdCAqIEByZXR1cm4geyp9XG5cdCAqL1xuXG5cdGV4cG9ydHMuYXBwbHlGaWx0ZXJzID0gZnVuY3Rpb24gKHZhbHVlLCBmaWx0ZXJzLCB2bSwgb2xkVmFsKSB7XG5cdCAgaWYgKCFmaWx0ZXJzKSB7XG5cdCAgICByZXR1cm4gdmFsdWVcblx0ICB9XG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSBmaWx0ZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgdmFsdWUgPSBmaWx0ZXJzW2ldLmNhbGwodm0sIHZhbHVlLCBvbGRWYWwpXG5cdCAgfVxuXHQgIHJldHVybiB2YWx1ZVxuXHR9XG5cbi8qKiovIH0sXG4vKiAzOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIGNvbmZpZyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG5cblx0LyoqXG5cdCAqIEVuYWJsZSBkZWJ1ZyB1dGlsaXRpZXMuIFRoZSBlbmFibGVEZWJ1ZygpIGZ1bmN0aW9uIGFuZFxuXHQgKiBhbGwgXy5sb2coKSAmIF8ud2FybigpIGNhbGxzIHdpbGwgYmUgZHJvcHBlZCBpbiB0aGVcblx0ICogbWluaWZpZWQgcHJvZHVjdGlvbiBidWlsZC5cblx0ICovXG5cblx0ZW5hYmxlRGVidWcoKVxuXG5cdGZ1bmN0aW9uIGVuYWJsZURlYnVnICgpIHtcblx0ICB2YXIgaGFzQ29uc29sZSA9IHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJ1xuXHQgIFxuXHQgIC8qKlxuXHQgICAqIExvZyBhIG1lc3NhZ2UuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnXG5cdCAgICovXG5cblx0ICBleHBvcnRzLmxvZyA9IGZ1bmN0aW9uIChtc2cpIHtcblx0ICAgIGlmIChoYXNDb25zb2xlICYmIGNvbmZpZy5kZWJ1Zykge1xuXHQgICAgICBjb25zb2xlLmxvZygnW1Z1ZSBpbmZvXTogJyArIG1zZylcblx0ICAgIH1cblx0ICB9XG5cblx0ICAvKipcblx0ICAgKiBXZSd2ZSBnb3QgYSBwcm9ibGVtIGhlcmUuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnXG5cdCAgICovXG5cblx0ICBleHBvcnRzLndhcm4gPSBmdW5jdGlvbiAobXNnKSB7XG5cdCAgICBpZiAoaGFzQ29uc29sZSAmJiAhY29uZmlnLnNpbGVudCkge1xuXHQgICAgICBjb25zb2xlLndhcm4oJ1tWdWUgd2Fybl06ICcgKyBtc2cpXG5cdCAgICAgIGlmIChjb25maWcuZGVidWcgJiYgY29uc29sZS50cmFjZSkge1xuXHQgICAgICAgIGNvbnNvbGUudHJhY2UoKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXG5cdCAgLyoqXG5cdCAgICogQXNzZXJ0IGFzc2V0IGV4aXN0c1xuXHQgICAqL1xuXG5cdCAgZXhwb3J0cy5hc3NlcnRBc3NldCA9IGZ1bmN0aW9uICh2YWwsIHR5cGUsIGlkKSB7XG5cdCAgICBpZiAoIXZhbCkge1xuXHQgICAgICBleHBvcnRzLndhcm4oJ0ZhaWxlZCB0byByZXNvbHZlICcgKyB0eXBlICsgJzogJyArIGlkKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogMzkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBDYWNoZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTIpXG5cdHZhciBjb25maWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KVxuXHR2YXIgcmVnZXhFc2NhcGVSRSA9IC9bLS4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2dcblx0dmFyIGNhY2hlLCB0YWdSRSwgaHRtbFJFLCBmaXJzdENoYXIsIGxhc3RDaGFyXG5cblx0LyoqXG5cdCAqIEVzY2FwZSBhIHN0cmluZyBzbyBpdCBjYW4gYmUgdXNlZCBpbiBhIFJlZ0V4cFxuXHQgKiBjb25zdHJ1Y3Rvci5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0clxuXHQgKi9cblxuXHRmdW5jdGlvbiBlc2NhcGVSZWdleCAoc3RyKSB7XG5cdCAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZ2V4RXNjYXBlUkUsICdcXFxcJCYnKVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBpbGUgdGhlIGludGVycG9sYXRpb24gdGFnIHJlZ2V4LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtSZWdFeHB9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNvbXBpbGVSZWdleCAoKSB7XG5cdCAgY29uZmlnLl9kZWxpbWl0ZXJzQ2hhbmdlZCA9IGZhbHNlXG5cdCAgdmFyIG9wZW4gPSBjb25maWcuZGVsaW1pdGVyc1swXVxuXHQgIHZhciBjbG9zZSA9IGNvbmZpZy5kZWxpbWl0ZXJzWzFdXG5cdCAgZmlyc3RDaGFyID0gb3Blbi5jaGFyQXQoMClcblx0ICBsYXN0Q2hhciA9IGNsb3NlLmNoYXJBdChjbG9zZS5sZW5ndGggLSAxKVxuXHQgIHZhciBmaXJzdENoYXJSRSA9IGVzY2FwZVJlZ2V4KGZpcnN0Q2hhcilcblx0ICB2YXIgbGFzdENoYXJSRSA9IGVzY2FwZVJlZ2V4KGxhc3RDaGFyKVxuXHQgIHZhciBvcGVuUkUgPSBlc2NhcGVSZWdleChvcGVuKVxuXHQgIHZhciBjbG9zZVJFID0gZXNjYXBlUmVnZXgoY2xvc2UpXG5cdCAgdGFnUkUgPSBuZXcgUmVnRXhwKFxuXHQgICAgZmlyc3RDaGFyUkUgKyAnPycgKyBvcGVuUkUgK1xuXHQgICAgJyguKz8pJyArXG5cdCAgICBjbG9zZVJFICsgbGFzdENoYXJSRSArICc/Jyxcblx0ICAgICdnJ1xuXHQgIClcblx0ICBodG1sUkUgPSBuZXcgUmVnRXhwKFxuXHQgICAgJ14nICsgZmlyc3RDaGFyUkUgKyBvcGVuUkUgK1xuXHQgICAgJy4qJyArXG5cdCAgICBjbG9zZVJFICsgbGFzdENoYXJSRSArICckJ1xuXHQgIClcblx0ICAvLyByZXNldCBjYWNoZVxuXHQgIGNhY2hlID0gbmV3IENhY2hlKDEwMDApXG5cdH1cblxuXHQvKipcblx0ICogUGFyc2UgYSB0ZW1wbGF0ZSB0ZXh0IHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIHRva2Vucy5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHRleHRcblx0ICogQHJldHVybiB7QXJyYXk8T2JqZWN0PiB8IG51bGx9XG5cdCAqICAgICAgICAgICAgICAgLSB7U3RyaW5nfSB0eXBlXG5cdCAqICAgICAgICAgICAgICAgLSB7U3RyaW5nfSB2YWx1ZVxuXHQgKiAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IFtodG1sXVxuXHQgKiAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IFtvbmVUaW1lXVxuXHQgKi9cblxuXHRleHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHRleHQpIHtcblx0ICBpZiAoY29uZmlnLl9kZWxpbWl0ZXJzQ2hhbmdlZCkge1xuXHQgICAgY29tcGlsZVJlZ2V4KClcblx0ICB9XG5cdCAgdmFyIGhpdCA9IGNhY2hlLmdldCh0ZXh0KVxuXHQgIGlmIChoaXQpIHtcblx0ICAgIHJldHVybiBoaXRcblx0ICB9XG5cdCAgaWYgKCF0YWdSRS50ZXN0KHRleHQpKSB7XG5cdCAgICByZXR1cm4gbnVsbFxuXHQgIH1cblx0ICB2YXIgdG9rZW5zID0gW11cblx0ICB2YXIgbGFzdEluZGV4ID0gdGFnUkUubGFzdEluZGV4ID0gMFxuXHQgIHZhciBtYXRjaCwgaW5kZXgsIHZhbHVlLCBmaXJzdCwgb25lVGltZSwgcGFydGlhbFxuXHQgIC8qIGpzaGludCBib3NzOnRydWUgKi9cblx0ICB3aGlsZSAobWF0Y2ggPSB0YWdSRS5leGVjKHRleHQpKSB7XG5cdCAgICBpbmRleCA9IG1hdGNoLmluZGV4XG5cdCAgICAvLyBwdXNoIHRleHQgdG9rZW5cblx0ICAgIGlmIChpbmRleCA+IGxhc3RJbmRleCkge1xuXHQgICAgICB0b2tlbnMucHVzaCh7XG5cdCAgICAgICAgdmFsdWU6IHRleHQuc2xpY2UobGFzdEluZGV4LCBpbmRleClcblx0ICAgICAgfSlcblx0ICAgIH1cblx0ICAgIC8vIHRhZyB0b2tlblxuXHQgICAgZmlyc3QgPSBtYXRjaFsxXS5jaGFyQ29kZUF0KDApXG5cdCAgICBvbmVUaW1lID0gZmlyc3QgPT09IDB4MkEgLy8gKlxuXHQgICAgcGFydGlhbCA9IGZpcnN0ID09PSAweDNFIC8vID5cblx0ICAgIHZhbHVlID0gKG9uZVRpbWUgfHwgcGFydGlhbClcblx0ICAgICAgPyBtYXRjaFsxXS5zbGljZSgxKVxuXHQgICAgICA6IG1hdGNoWzFdXG5cdCAgICB0b2tlbnMucHVzaCh7XG5cdCAgICAgIHRhZzogdHJ1ZSxcblx0ICAgICAgdmFsdWU6IHZhbHVlLnRyaW0oKSxcblx0ICAgICAgaHRtbDogaHRtbFJFLnRlc3QobWF0Y2hbMF0pLFxuXHQgICAgICBvbmVUaW1lOiBvbmVUaW1lLFxuXHQgICAgICBwYXJ0aWFsOiBwYXJ0aWFsXG5cdCAgICB9KVxuXHQgICAgbGFzdEluZGV4ID0gaW5kZXggKyBtYXRjaFswXS5sZW5ndGhcblx0ICB9XG5cdCAgaWYgKGxhc3RJbmRleCA8IHRleHQubGVuZ3RoKSB7XG5cdCAgICB0b2tlbnMucHVzaCh7XG5cdCAgICAgIHZhbHVlOiB0ZXh0LnNsaWNlKGxhc3RJbmRleClcblx0ICAgIH0pXG5cdCAgfVxuXHQgIGNhY2hlLnB1dCh0ZXh0LCB0b2tlbnMpXG5cdCAgcmV0dXJuIHRva2Vuc1xuXHR9XG5cblx0LyoqXG5cdCAqIEZvcm1hdCBhIGxpc3Qgb2YgdG9rZW5zIGludG8gYW4gZXhwcmVzc2lvbi5cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheX0gdG9rZW5zXG5cdCAqIEBwYXJhbSB7VnVlfSBbdm1dXG5cdCAqIEByZXR1cm4ge1N0cmluZ31cblx0ICovXG5cblx0ZXhwb3J0cy50b2tlbnNUb0V4cCA9IGZ1bmN0aW9uICh0b2tlbnMsIHZtKSB7XG5cdCAgcmV0dXJuIHRva2Vucy5sZW5ndGggPiAxXG5cdCAgICA/IHRva2Vucy5tYXAoZnVuY3Rpb24gKHRva2VuKSB7XG5cdCAgICAgIHJldHVybiBmb3JtYXRUb2tlbih0b2tlbiwgdm0pXG5cdCAgICB9KS5qb2luKCcrJylcblx0ICAgIDogZm9ybWF0VG9rZW4odG9rZW5zWzBdLCB2bSlcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3JtYXQgYSBzaW5nbGUgdG9rZW4uXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlblxuXHQgKiBAcGFyYW0ge1Z1ZX0gW3ZtXVxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGZvcm1hdFRva2VuICh0b2tlbiwgdm0pIHtcblx0ICByZXR1cm4gdG9rZW4udGFnXG5cdCAgICA/IHZtICYmIHRva2VuLm9uZVRpbWVcblx0ICAgICAgPyAnXCInICsgdm0uJGdldCh0b2tlbi52YWx1ZSkgKyAnXCInXG5cdCAgICAgIDogJygnICsgdG9rZW4udmFsdWUgKyAnKSdcblx0ICAgIDogJ1wiJyArIHRva2VuLnZhbHVlICsgJ1wiJ1xuXHR9XG5cbi8qKiovIH0sXG4vKiA0MCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBDYWNoZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTIpXG5cdHZhciBjYWNoZSA9IG5ldyBDYWNoZSgxMDAwKVxuXHR2YXIgYXJnUkUgPSAvXlteXFx7XFw/XSskfF4nW14nXSonJHxeXCJbXlwiXSpcIiQvXG5cdHZhciBmaWx0ZXJUb2tlblJFID0gL1teXFxzJ1wiXSt8J1teJ10rJ3xcIlteXCJdK1wiL2dcblxuXHQvKipcblx0ICogUGFyc2VyIHN0YXRlXG5cdCAqL1xuXG5cdHZhciBzdHJcblx0dmFyIGMsIGksIGxcblx0dmFyIGluU2luZ2xlXG5cdHZhciBpbkRvdWJsZVxuXHR2YXIgY3VybHlcblx0dmFyIHNxdWFyZVxuXHR2YXIgcGFyZW5cblx0dmFyIGJlZ2luXG5cdHZhciBhcmdJbmRleFxuXHR2YXIgZGlyc1xuXHR2YXIgZGlyXG5cdHZhciBsYXN0RmlsdGVySW5kZXhcblx0dmFyIGFyZ1xuXG5cdC8qKlxuXHQgKiBQdXNoIGEgZGlyZWN0aXZlIG9iamVjdCBpbnRvIHRoZSByZXN1bHQgQXJyYXlcblx0ICovXG5cblx0ZnVuY3Rpb24gcHVzaERpciAoKSB7XG5cdCAgZGlyLnJhdyA9IHN0ci5zbGljZShiZWdpbiwgaSkudHJpbSgpXG5cdCAgaWYgKGRpci5leHByZXNzaW9uID09PSB1bmRlZmluZWQpIHtcblx0ICAgIGRpci5leHByZXNzaW9uID0gc3RyLnNsaWNlKGFyZ0luZGV4LCBpKS50cmltKClcblx0ICB9IGVsc2UgaWYgKGxhc3RGaWx0ZXJJbmRleCAhPT0gYmVnaW4pIHtcblx0ICAgIHB1c2hGaWx0ZXIoKVxuXHQgIH1cblx0ICBpZiAoaSA9PT0gMCB8fCBkaXIuZXhwcmVzc2lvbikge1xuXHQgICAgZGlycy5wdXNoKGRpcilcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogUHVzaCBhIGZpbHRlciB0byB0aGUgY3VycmVudCBkaXJlY3RpdmUgb2JqZWN0XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHB1c2hGaWx0ZXIgKCkge1xuXHQgIHZhciBleHAgPSBzdHIuc2xpY2UobGFzdEZpbHRlckluZGV4LCBpKS50cmltKClcblx0ICB2YXIgZmlsdGVyXG5cdCAgaWYgKGV4cCkge1xuXHQgICAgZmlsdGVyID0ge31cblx0ICAgIHZhciB0b2tlbnMgPSBleHAubWF0Y2goZmlsdGVyVG9rZW5SRSlcblx0ICAgIGZpbHRlci5uYW1lID0gdG9rZW5zWzBdXG5cdCAgICBmaWx0ZXIuYXJncyA9IHRva2Vucy5sZW5ndGggPiAxID8gdG9rZW5zLnNsaWNlKDEpIDogbnVsbFxuXHQgIH1cblx0ICBpZiAoZmlsdGVyKSB7XG5cdCAgICAoZGlyLmZpbHRlcnMgPSBkaXIuZmlsdGVycyB8fCBbXSkucHVzaChmaWx0ZXIpXG5cdCAgfVxuXHQgIGxhc3RGaWx0ZXJJbmRleCA9IGkgKyAxXG5cdH1cblxuXHQvKipcblx0ICogUGFyc2UgYSBkaXJlY3RpdmUgc3RyaW5nIGludG8gYW4gQXJyYXkgb2YgQVNULWxpa2Vcblx0ICogb2JqZWN0cyByZXByZXNlbnRpbmcgZGlyZWN0aXZlcy5cblx0ICpcblx0ICogRXhhbXBsZTpcblx0ICpcblx0ICogXCJjbGljazogYSA9IGEgKyAxIHwgdXBwZXJjYXNlXCIgd2lsbCB5aWVsZDpcblx0ICoge1xuXHQgKiAgIGFyZzogJ2NsaWNrJyxcblx0ICogICBleHByZXNzaW9uOiAnYSA9IGEgKyAxJyxcblx0ICogICBmaWx0ZXJzOiBbXG5cdCAqICAgICB7IG5hbWU6ICd1cHBlcmNhc2UnLCBhcmdzOiBudWxsIH1cblx0ICogICBdXG5cdCAqIH1cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0clxuXHQgKiBAcmV0dXJuIHtBcnJheTxPYmplY3Q+fVxuXHQgKi9cblxuXHRleHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHMpIHtcblxuXHQgIHZhciBoaXQgPSBjYWNoZS5nZXQocylcblx0ICBpZiAoaGl0KSB7XG5cdCAgICByZXR1cm4gaGl0XG5cdCAgfVxuXG5cdCAgLy8gcmVzZXQgcGFyc2VyIHN0YXRlXG5cdCAgc3RyID0gc1xuXHQgIGluU2luZ2xlID0gaW5Eb3VibGUgPSBmYWxzZVxuXHQgIGN1cmx5ID0gc3F1YXJlID0gcGFyZW4gPSBiZWdpbiA9IGFyZ0luZGV4ID0gMFxuXHQgIGxhc3RGaWx0ZXJJbmRleCA9IDBcblx0ICBkaXJzID0gW11cblx0ICBkaXIgPSB7fVxuXHQgIGFyZyA9IG51bGxcblxuXHQgIGZvciAoaSA9IDAsIGwgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcblx0ICAgIGlmIChpblNpbmdsZSkge1xuXHQgICAgICAvLyBjaGVjayBzaW5nbGUgcXVvdGVcblx0ICAgICAgaWYgKGMgPT09IDB4MjcpIGluU2luZ2xlID0gIWluU2luZ2xlXG5cdCAgICB9IGVsc2UgaWYgKGluRG91YmxlKSB7XG5cdCAgICAgIC8vIGNoZWNrIGRvdWJsZSBxdW90ZVxuXHQgICAgICBpZiAoYyA9PT0gMHgyMikgaW5Eb3VibGUgPSAhaW5Eb3VibGVcblx0ICAgIH0gZWxzZSBpZiAoXG5cdCAgICAgIGMgPT09IDB4MkMgJiYgLy8gY29tbWFcblx0ICAgICAgIXBhcmVuICYmICFjdXJseSAmJiAhc3F1YXJlXG5cdCAgICApIHtcblx0ICAgICAgLy8gcmVhY2hlZCB0aGUgZW5kIG9mIGEgZGlyZWN0aXZlXG5cdCAgICAgIHB1c2hEaXIoKVxuXHQgICAgICAvLyByZXNldCAmIHNraXAgdGhlIGNvbW1hXG5cdCAgICAgIGRpciA9IHt9XG5cdCAgICAgIGJlZ2luID0gYXJnSW5kZXggPSBsYXN0RmlsdGVySW5kZXggPSBpICsgMVxuXHQgICAgfSBlbHNlIGlmIChcblx0ICAgICAgYyA9PT0gMHgzQSAmJiAvLyBjb2xvblxuXHQgICAgICAhZGlyLmV4cHJlc3Npb24gJiZcblx0ICAgICAgIWRpci5hcmdcblx0ICAgICkge1xuXHQgICAgICAvLyBhcmd1bWVudFxuXHQgICAgICBhcmcgPSBzdHIuc2xpY2UoYmVnaW4sIGkpLnRyaW0oKVxuXHQgICAgICAvLyB0ZXN0IGZvciB2YWxpZCBhcmd1bWVudCBoZXJlXG5cdCAgICAgIC8vIHNpbmNlIHdlIG1heSBoYXZlIGNhdWdodCBzdHVmZiBsaWtlIGZpcnN0IGhhbGYgb2Zcblx0ICAgICAgLy8gYW4gb2JqZWN0IGxpdGVyYWwgb3IgYSB0ZXJuYXJ5IGV4cHJlc3Npb24uXG5cdCAgICAgIGlmIChhcmdSRS50ZXN0KGFyZykpIHtcblx0ICAgICAgICBhcmdJbmRleCA9IGkgKyAxXG5cdCAgICAgICAgZGlyLmFyZyA9IF8uc3RyaXBRdW90ZXMoYXJnKSB8fCBhcmdcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIGlmIChcblx0ICAgICAgYyA9PT0gMHg3QyAmJiAvLyBwaXBlXG5cdCAgICAgIHN0ci5jaGFyQ29kZUF0KGkgKyAxKSAhPT0gMHg3QyAmJlxuXHQgICAgICBzdHIuY2hhckNvZGVBdChpIC0gMSkgIT09IDB4N0Ncblx0ICAgICkge1xuXHQgICAgICBpZiAoZGlyLmV4cHJlc3Npb24gPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgIC8vIGZpcnN0IGZpbHRlciwgZW5kIG9mIGV4cHJlc3Npb25cblx0ICAgICAgICBsYXN0RmlsdGVySW5kZXggPSBpICsgMVxuXHQgICAgICAgIGRpci5leHByZXNzaW9uID0gc3RyLnNsaWNlKGFyZ0luZGV4LCBpKS50cmltKClcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAvLyBhbHJlYWR5IGhhcyBmaWx0ZXJcblx0ICAgICAgICBwdXNoRmlsdGVyKClcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgc3dpdGNoIChjKSB7XG5cdCAgICAgICAgY2FzZSAweDIyOiBpbkRvdWJsZSA9IHRydWU7IGJyZWFrIC8vIFwiXG5cdCAgICAgICAgY2FzZSAweDI3OiBpblNpbmdsZSA9IHRydWU7IGJyZWFrIC8vICdcblx0ICAgICAgICBjYXNlIDB4Mjg6IHBhcmVuKys7IGJyZWFrICAgICAgICAgLy8gKFxuXHQgICAgICAgIGNhc2UgMHgyOTogcGFyZW4tLTsgYnJlYWsgICAgICAgICAvLyApXG5cdCAgICAgICAgY2FzZSAweDVCOiBzcXVhcmUrKzsgYnJlYWsgICAgICAgIC8vIFtcblx0ICAgICAgICBjYXNlIDB4NUQ6IHNxdWFyZS0tOyBicmVhayAgICAgICAgLy8gXVxuXHQgICAgICAgIGNhc2UgMHg3QjogY3VybHkrKzsgYnJlYWsgICAgICAgICAvLyB7XG5cdCAgICAgICAgY2FzZSAweDdEOiBjdXJseS0tOyBicmVhayAgICAgICAgIC8vIH1cblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblxuXHQgIGlmIChpID09PSAwIHx8IGJlZ2luICE9PSBpKSB7XG5cdCAgICBwdXNoRGlyKClcblx0ICB9XG5cblx0ICBjYWNoZS5wdXQocywgZGlycylcblx0ICByZXR1cm4gZGlyc1xuXHR9XG5cbi8qKiovIH0sXG4vKiA0MSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MSlcblx0dmFyIENhY2hlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Milcblx0dmFyIGV4cHJlc3Npb25DYWNoZSA9IG5ldyBDYWNoZSgxMDAwKVxuXG5cdHZhciBrZXl3b3JkcyA9XG5cdCAgJ01hdGgsYnJlYWssY2FzZSxjYXRjaCxjb250aW51ZSxkZWJ1Z2dlcixkZWZhdWx0LCcgK1xuXHQgICdkZWxldGUsZG8sZWxzZSxmYWxzZSxmaW5hbGx5LGZvcixmdW5jdGlvbixpZixpbiwnICtcblx0ICAnaW5zdGFuY2VvZixuZXcsbnVsbCxyZXR1cm4sc3dpdGNoLHRoaXMsdGhyb3csdHJ1ZSx0cnksJyArXG5cdCAgJ3R5cGVvZix2YXIsdm9pZCx3aGlsZSx3aXRoLHVuZGVmaW5lZCxhYnN0cmFjdCxib29sZWFuLCcgK1xuXHQgICdieXRlLGNoYXIsY2xhc3MsY29uc3QsZG91YmxlLGVudW0sZXhwb3J0LGV4dGVuZHMsJyArXG5cdCAgJ2ZpbmFsLGZsb2F0LGdvdG8saW1wbGVtZW50cyxpbXBvcnQsaW50LGludGVyZmFjZSxsb25nLCcgK1xuXHQgICduYXRpdmUscGFja2FnZSxwcml2YXRlLHByb3RlY3RlZCxwdWJsaWMsc2hvcnQsc3RhdGljLCcgK1xuXHQgICdzdXBlcixzeW5jaHJvbml6ZWQsdGhyb3dzLHRyYW5zaWVudCx2b2xhdGlsZSwnICtcblx0ICAnYXJndW1lbnRzLGxldCx5aWVsZCdcblxuXHR2YXIgd3NSRSA9IC9cXHMvZ1xuXHR2YXIgbmV3bGluZVJFID0gL1xcbi9nXG5cdHZhciBzYXZlUkUgPSAvW1xceyxdXFxzKltcXHdcXCRfXStcXHMqOnwnW14nXSonfFwiW15cIl0qXCIvZ1xuXHR2YXIgcmVzdG9yZVJFID0gL1wiKFxcZCspXCIvZ1xuXHR2YXIgcGF0aFRlc3RSRSA9IC9eW0EtWmEtel8kXVtcXHckXSooXFwuW0EtWmEtel8kXVtcXHckXSp8XFxbJy4qPydcXF18XFxbXCIuKj9cIlxcXSkqJC9cblx0dmFyIHBhdGhSZXBsYWNlUkUgPSAvW15cXHckXFwuXShbQS1aYS16XyRdW1xcdyRdKihcXC5bQS1aYS16XyRdW1xcdyRdKnxcXFsnLio/J1xcXXxcXFtcIi4qP1wiXFxdKSopL2dcblx0dmFyIGtleXdvcmRzUkUgPSBuZXcgUmVnRXhwKCdeKCcgKyBrZXl3b3Jkcy5yZXBsYWNlKC8sL2csICdcXFxcYnwnKSArICdcXFxcYiknKVxuXG5cdC8qKlxuXHQgKiBTYXZlIC8gUmV3cml0ZSAvIFJlc3RvcmVcblx0ICpcblx0ICogV2hlbiByZXdyaXRpbmcgcGF0aHMgZm91bmQgaW4gYW4gZXhwcmVzc2lvbiwgaXQgaXNcblx0ICogcG9zc2libGUgZm9yIHRoZSBzYW1lIGxldHRlciBzZXF1ZW5jZXMgdG8gYmUgZm91bmQgaW5cblx0ICogc3RyaW5ncyBhbmQgT2JqZWN0IGxpdGVyYWwgcHJvcGVydHkga2V5cy4gVGhlcmVmb3JlIHdlXG5cdCAqIHJlbW92ZSBhbmQgc3RvcmUgdGhlc2UgcGFydHMgaW4gYSB0ZW1wb3JhcnkgYXJyYXksIGFuZFxuXHQgKiByZXN0b3JlIHRoZW0gYWZ0ZXIgdGhlIHBhdGggcmV3cml0ZS5cblx0ICovXG5cblx0dmFyIHNhdmVkID0gW11cblxuXHQvKipcblx0ICogU2F2ZSByZXBsYWNlclxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gLSBwbGFjZWhvbGRlciB3aXRoIGluZGV4XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHNhdmUgKHN0cikge1xuXHQgIHZhciBpID0gc2F2ZWQubGVuZ3RoXG5cdCAgc2F2ZWRbaV0gPSBzdHIucmVwbGFjZShuZXdsaW5lUkUsICdcXFxcbicpXG5cdCAgcmV0dXJuICdcIicgKyBpICsgJ1wiJ1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhdGggcmV3cml0ZSByZXBsYWNlclxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gcmF3XG5cdCAqIEByZXR1cm4ge1N0cmluZ31cblx0ICovXG5cblx0ZnVuY3Rpb24gcmV3cml0ZSAocmF3KSB7XG5cdCAgdmFyIGMgPSByYXcuY2hhckF0KDApXG5cdCAgdmFyIHBhdGggPSByYXcuc2xpY2UoMSlcblx0ICBpZiAoa2V5d29yZHNSRS50ZXN0KHBhdGgpKSB7XG5cdCAgICByZXR1cm4gcmF3XG5cdCAgfSBlbHNlIHtcblx0ICAgIHBhdGggPSBwYXRoLmluZGV4T2YoJ1wiJykgPiAtMVxuXHQgICAgICA/IHBhdGgucmVwbGFjZShyZXN0b3JlUkUsIHJlc3RvcmUpXG5cdCAgICAgIDogcGF0aFxuXHQgICAgcmV0dXJuIGMgKyAnc2NvcGUuJyArIHBhdGhcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogUmVzdG9yZSByZXBsYWNlclxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpIC0gbWF0Y2hlZCBzYXZlIGluZGV4XG5cdCAqIEByZXR1cm4ge1N0cmluZ31cblx0ICovXG5cblx0ZnVuY3Rpb24gcmVzdG9yZSAoc3RyLCBpKSB7XG5cdCAgcmV0dXJuIHNhdmVkW2ldXG5cdH1cblxuXHQvKipcblx0ICogUmV3cml0ZSBhbiBleHByZXNzaW9uLCBwcmVmaXhpbmcgYWxsIHBhdGggYWNjZXNzb3JzIHdpdGhcblx0ICogYHNjb3BlLmAgYW5kIGdlbmVyYXRlIGdldHRlci9zZXR0ZXIgZnVuY3Rpb25zLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gbmVlZFNldFxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn1cblx0ICovXG5cblx0ZnVuY3Rpb24gY29tcGlsZUV4cEZucyAoZXhwLCBuZWVkU2V0KSB7XG5cdCAgLy8gcmVzZXQgc3RhdGVcblx0ICBzYXZlZC5sZW5ndGggPSAwXG5cdCAgLy8gc2F2ZSBzdHJpbmdzIGFuZCBvYmplY3QgbGl0ZXJhbCBrZXlzXG5cdCAgdmFyIGJvZHkgPSBleHBcblx0ICAgIC5yZXBsYWNlKHNhdmVSRSwgc2F2ZSlcblx0ICAgIC5yZXBsYWNlKHdzUkUsICcnKVxuXHQgIC8vIHJld3JpdGUgYWxsIHBhdGhzXG5cdCAgLy8gcGFkIDEgc3BhY2UgaGVyZSBiZWNhdWUgdGhlIHJlZ2V4IG1hdGNoZXMgMSBleHRyYSBjaGFyXG5cdCAgYm9keSA9ICgnICcgKyBib2R5KVxuXHQgICAgLnJlcGxhY2UocGF0aFJlcGxhY2VSRSwgcmV3cml0ZSlcblx0ICAgIC5yZXBsYWNlKHJlc3RvcmVSRSwgcmVzdG9yZSlcblx0ICB2YXIgZ2V0dGVyID0gbWFrZUdldHRlcihib2R5KVxuXHQgIGlmIChnZXR0ZXIpIHtcblx0ICAgIHJldHVybiB7XG5cdCAgICAgIGdldDogZ2V0dGVyLFxuXHQgICAgICBib2R5OiBib2R5LFxuXHQgICAgICBzZXQ6IG5lZWRTZXRcblx0ICAgICAgICA/IG1ha2VTZXR0ZXIoYm9keSlcblx0ICAgICAgICA6IG51bGxcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGlsZSBnZXR0ZXIgc2V0dGVycyBmb3IgYSBzaW1wbGUgcGF0aC5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn1cblx0ICovXG5cblx0ZnVuY3Rpb24gY29tcGlsZVBhdGhGbnMgKGV4cCkge1xuXHQgIHZhciBnZXR0ZXIsIHBhdGhcblx0ICBpZiAoZXhwLmluZGV4T2YoJ1snKSA8IDApIHtcblx0ICAgIC8vIHJlYWxseSBzaW1wbGUgcGF0aFxuXHQgICAgcGF0aCA9IGV4cC5zcGxpdCgnLicpXG5cdCAgICBnZXR0ZXIgPSBQYXRoLmNvbXBpbGVHZXR0ZXIocGF0aClcblx0ICB9IGVsc2Uge1xuXHQgICAgLy8gZG8gdGhlIHJlYWwgcGFyc2luZ1xuXHQgICAgcGF0aCA9IFBhdGgucGFyc2UoZXhwKVxuXHQgICAgZ2V0dGVyID0gcGF0aC5nZXRcblx0ICB9XG5cdCAgcmV0dXJuIHtcblx0ICAgIGdldDogZ2V0dGVyLFxuXHQgICAgLy8gYWx3YXlzIGdlbmVyYXRlIHNldHRlciBmb3Igc2ltcGxlIHBhdGhzXG5cdCAgICBzZXQ6IGZ1bmN0aW9uIChvYmosIHZhbCkge1xuXHQgICAgICBQYXRoLnNldChvYmosIHBhdGgsIHZhbClcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQnVpbGQgYSBnZXR0ZXIgZnVuY3Rpb24uIFJlcXVpcmVzIGV2YWwuXG5cdCAqXG5cdCAqIFdlIGlzb2xhdGUgdGhlIHRyeS9jYXRjaCBzbyBpdCBkb2Vzbid0IGFmZmVjdCB0aGVcblx0ICogb3B0aW1pemF0aW9uIG9mIHRoZSBwYXJzZSBmdW5jdGlvbiB3aGVuIGl0IGlzIG5vdCBjYWxsZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBib2R5XG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufHVuZGVmaW5lZH1cblx0ICovXG5cblx0ZnVuY3Rpb24gbWFrZUdldHRlciAoYm9keSkge1xuXHQgIHRyeSB7XG5cdCAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdzY29wZScsICdyZXR1cm4gJyArIGJvZHkgKyAnOycpXG5cdCAgfSBjYXRjaCAoZSkge1xuXHQgICAgXy53YXJuKFxuXHQgICAgICAnSW52YWxpZCBleHByZXNzaW9uLiAnICsgXG5cdCAgICAgICdHZW5lcmF0ZWQgZnVuY3Rpb24gYm9keTogJyArIGJvZHlcblx0ICAgIClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQnVpbGQgYSBzZXR0ZXIgZnVuY3Rpb24uXG5cdCAqXG5cdCAqIFRoaXMgaXMgb25seSBuZWVkZWQgaW4gcmFyZSBzaXR1YXRpb25zIGxpa2UgXCJhW2JdXCIgd2hlcmVcblx0ICogYSBzZXR0YWJsZSBwYXRoIHJlcXVpcmVzIGR5bmFtaWMgZXZhbHVhdGlvbi5cblx0ICpcblx0ICogVGhpcyBzZXR0ZXIgZnVuY3Rpb24gbWF5IHRocm93IGVycm9yIHdoZW4gY2FsbGVkIGlmIHRoZVxuXHQgKiBleHByZXNzaW9uIGJvZHkgaXMgbm90IGEgdmFsaWQgbGVmdC1oYW5kIGV4cHJlc3Npb24gaW5cblx0ICogYXNzaWdubWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGJvZHlcblx0ICogQHJldHVybiB7RnVuY3Rpb258dW5kZWZpbmVkfVxuXHQgKi9cblxuXHRmdW5jdGlvbiBtYWtlU2V0dGVyIChib2R5KSB7XG5cdCAgdHJ5IHtcblx0ICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ3Njb3BlJywgJ3ZhbHVlJywgYm9keSArICc9dmFsdWU7Jylcblx0ICB9IGNhdGNoIChlKSB7XG5cdCAgICBfLndhcm4oJ0ludmFsaWQgc2V0dGVyIGZ1bmN0aW9uIGJvZHk6ICcgKyBib2R5KVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayBmb3Igc2V0dGVyIGV4aXN0ZW5jZSBvbiBhIGNhY2hlIGhpdC5cblx0ICpcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gaGl0XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNoZWNrU2V0dGVyIChoaXQpIHtcblx0ICBpZiAoIWhpdC5zZXQpIHtcblx0ICAgIGhpdC5zZXQgPSBtYWtlU2V0dGVyKGhpdC5ib2R5KVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBQYXJzZSBhbiBleHByZXNzaW9uIGludG8gcmUtd3JpdHRlbiBnZXR0ZXIvc2V0dGVycy5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG5lZWRTZXRcblx0ICogQHJldHVybiB7RnVuY3Rpb259XG5cdCAqL1xuXG5cdGV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAoZXhwLCBuZWVkU2V0KSB7XG5cdCAgZXhwID0gZXhwLnRyaW0oKVxuXHQgIC8vIHRyeSBjYWNoZVxuXHQgIHZhciBoaXQgPSBleHByZXNzaW9uQ2FjaGUuZ2V0KGV4cClcblx0ICBpZiAoaGl0KSB7XG5cdCAgICBpZiAobmVlZFNldCkge1xuXHQgICAgICBjaGVja1NldHRlcihoaXQpXG5cdCAgICB9XG5cdCAgICByZXR1cm4gaGl0XG5cdCAgfVxuXHQgIC8vIHdlIGRvIGEgc2ltcGxlIHBhdGggY2hlY2sgdG8gb3B0aW1pemUgZm9yIHRoZW0uXG5cdCAgLy8gdGhlIGNoZWNrIGZhaWxzIHZhbGlkIHBhdGhzIHdpdGggdW51c2FsIHdoaXRlc3BhY2VzLFxuXHQgIC8vIGJ1dCB0aGF0J3MgdG9vIHJhcmUgYW5kIHdlIGRvbid0IGNhcmUuXG5cdCAgdmFyIHJlcyA9IHBhdGhUZXN0UkUudGVzdChleHApXG5cdCAgICA/IGNvbXBpbGVQYXRoRm5zKGV4cClcblx0ICAgIDogY29tcGlsZUV4cEZucyhleHAsIG5lZWRTZXQpXG5cdCAgZXhwcmVzc2lvbkNhY2hlLnB1dChleHAsIHJlcylcblx0ICByZXR1cm4gcmVzXG5cdH1cblxuXHQvLyBFeHBvcnQgdGhlIHBhdGhSZWdleCBmb3IgZXh0ZXJuYWwgdXNlXG5cdGV4cG9ydHMucGF0aFRlc3RSRSA9IHBhdGhUZXN0UkVcblxuLyoqKi8gfSxcbi8qIDQyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGFwcGx5Q1NTVHJhbnNpdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNTMpXG5cdHZhciBhcHBseUpTVHJhbnNpdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNTQpXG5cblx0LyoqXG5cdCAqIEFwcGVuZCB3aXRoIHRyYW5zaXRpb24uXG5cdCAqXG5cdCAqIEBvYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICovXG5cblx0ZXhwb3J0cy5hcHBlbmQgPSBmdW5jdGlvbiAoZWwsIHRhcmdldCwgdm0sIGNiKSB7XG5cdCAgYXBwbHkoZWwsIDEsIGZ1bmN0aW9uICgpIHtcblx0ICAgIHRhcmdldC5hcHBlbmRDaGlsZChlbClcblx0ICB9LCB2bSwgY2IpXG5cdH1cblxuXHQvKipcblx0ICogSW5zZXJ0QmVmb3JlIHdpdGggdHJhbnNpdGlvbi5cblx0ICpcblx0ICogQG9hcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldFxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuXHQgKi9cblxuXHRleHBvcnRzLmJlZm9yZSA9IGZ1bmN0aW9uIChlbCwgdGFyZ2V0LCB2bSwgY2IpIHtcblx0ICBhcHBseShlbCwgMSwgZnVuY3Rpb24gKCkge1xuXHQgICAgXy5iZWZvcmUoZWwsIHRhcmdldClcblx0ICB9LCB2bSwgY2IpXG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIHdpdGggdHJhbnNpdGlvbi5cblx0ICpcblx0ICogQG9hcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuXHQgKi9cblxuXHRleHBvcnRzLnJlbW92ZSA9IGZ1bmN0aW9uIChlbCwgdm0sIGNiKSB7XG5cdCAgYXBwbHkoZWwsIC0xLCBmdW5jdGlvbiAoKSB7XG5cdCAgICBfLnJlbW92ZShlbClcblx0ICB9LCB2bSwgY2IpXG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIGJ5IGFwcGVuZGluZyB0byBhbm90aGVyIHBhcmVudCB3aXRoIHRyYW5zaXRpb24uXG5cdCAqIFRoaXMgaXMgb25seSB1c2VkIGluIGJsb2NrIG9wZXJhdGlvbnMuXG5cdCAqXG5cdCAqIEBvYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICovXG5cblx0ZXhwb3J0cy5yZW1vdmVUaGVuQXBwZW5kID0gZnVuY3Rpb24gKGVsLCB0YXJnZXQsIHZtLCBjYikge1xuXHQgIGFwcGx5KGVsLCAtMSwgZnVuY3Rpb24gKCkge1xuXHQgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsKVxuXHQgIH0sIHZtLCBjYilcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBlbmQgdGhlIGNoaWxkTm9kZXMgb2YgYSBmcmFnbWVudCB0byB0YXJnZXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gYmxvY2tcblx0ICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqL1xuXG5cdGV4cG9ydHMuYmxvY2tBcHBlbmQgPSBmdW5jdGlvbiAoYmxvY2ssIHRhcmdldCwgdm0pIHtcblx0ICB2YXIgbm9kZXMgPSBfLnRvQXJyYXkoYmxvY2suY2hpbGROb2Rlcylcblx0ICBmb3IgKHZhciBpID0gMCwgbCA9IG5vZGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgZXhwb3J0cy5iZWZvcmUobm9kZXNbaV0sIHRhcmdldCwgdm0pXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhIGJsb2NrIG9mIG5vZGVzIGJldHdlZW4gdHdvIGVkZ2Ugbm9kZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gc3RhcnRcblx0ICogQHBhcmFtIHtOb2RlfSBlbmRcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqL1xuXG5cdGV4cG9ydHMuYmxvY2tSZW1vdmUgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgdm0pIHtcblx0ICB2YXIgbm9kZSA9IHN0YXJ0Lm5leHRTaWJsaW5nXG5cdCAgdmFyIG5leHRcblx0ICB3aGlsZSAobm9kZSAhPT0gZW5kKSB7XG5cdCAgICBuZXh0ID0gbm9kZS5uZXh0U2libGluZ1xuXHQgICAgZXhwb3J0cy5yZW1vdmUobm9kZSwgdm0pXG5cdCAgICBub2RlID0gbmV4dFxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBseSB0cmFuc2l0aW9ucyB3aXRoIGFuIG9wZXJhdGlvbiBjYWxsYmFjay5cblx0ICpcblx0ICogQG9hcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGlyZWN0aW9uXG5cdCAqICAgICAgICAgICAgICAgICAgMTogZW50ZXJcblx0ICogICAgICAgICAgICAgICAgIC0xOiBsZWF2ZVxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcCAtIHRoZSBhY3R1YWwgRE9NIG9wZXJhdGlvblxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuXHQgKi9cblxuXHR2YXIgYXBwbHkgPSBleHBvcnRzLmFwcGx5ID0gZnVuY3Rpb24gKGVsLCBkaXJlY3Rpb24sIG9wLCB2bSwgY2IpIHtcblx0ICB2YXIgdHJhbnNEYXRhID0gZWwuX192X3RyYW5zXG5cdCAgaWYgKFxuXHQgICAgIXRyYW5zRGF0YSB8fFxuXHQgICAgIXZtLl9pc0NvbXBpbGVkIHx8XG5cdCAgICAvLyBpZiB0aGUgdm0gaXMgYmVpbmcgbWFuaXB1bGF0ZWQgYnkgYSBwYXJlbnQgZGlyZWN0aXZlXG5cdCAgICAvLyBkdXJpbmcgdGhlIHBhcmVudCdzIGNvbXBpbGF0aW9uIHBoYXNlLCBza2lwIHRoZVxuXHQgICAgLy8gYW5pbWF0aW9uLlxuXHQgICAgKHZtLiRwYXJlbnQgJiYgIXZtLiRwYXJlbnQuX2lzQ29tcGlsZWQpXG5cdCAgKSB7XG5cdCAgICBvcCgpXG5cdCAgICBpZiAoY2IpIGNiKClcblx0ICAgIHJldHVyblxuXHQgIH1cblx0ICAvLyBkZXRlcm1pbmUgdGhlIHRyYW5zaXRpb24gdHlwZSBvbiB0aGUgZWxlbWVudFxuXHQgIHZhciBqc1RyYW5zaXRpb24gPSB2bS4kb3B0aW9ucy50cmFuc2l0aW9uc1t0cmFuc0RhdGEuaWRdXG5cdCAgaWYgKGpzVHJhbnNpdGlvbikge1xuXHQgICAgLy8ganNcblx0ICAgIGFwcGx5SlNUcmFuc2l0aW9uKFxuXHQgICAgICBlbCxcblx0ICAgICAgZGlyZWN0aW9uLFxuXHQgICAgICBvcCxcblx0ICAgICAgdHJhbnNEYXRhLFxuXHQgICAgICBqc1RyYW5zaXRpb24sXG5cdCAgICAgIGNiXG5cdCAgICApXG5cdCAgfSBlbHNlIGlmIChfLnRyYW5zaXRpb25FbmRFdmVudCkge1xuXHQgICAgLy8gY3NzXG5cdCAgICBhcHBseUNTU1RyYW5zaXRpb24oXG5cdCAgICAgIGVsLFxuXHQgICAgICBkaXJlY3Rpb24sXG5cdCAgICAgIG9wLFxuXHQgICAgICB0cmFuc0RhdGEsXG5cdCAgICAgIGNiXG5cdCAgICApXG5cdCAgfSBlbHNlIHtcblx0ICAgIC8vIG5vdCBhcHBsaWNhYmxlXG5cdCAgICBvcCgpXG5cdCAgICBpZiAoY2IpIGNiKClcblx0ICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDQzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGNvbmZpZyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG5cdHZhciB0ZXh0UGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOSlcblx0dmFyIGRpclBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNDApXG5cdHZhciB0ZW1wbGF0ZVBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNTApXG5cblx0LyoqXG5cdCAqIENvbXBpbGUgYSB0ZW1wbGF0ZSBhbmQgcmV0dXJuIGEgcmV1c2FibGUgY29tcG9zaXRlIGxpbmtcblx0ICogZnVuY3Rpb24sIHdoaWNoIHJlY3Vyc2l2ZWx5IGNvbnRhaW5zIG1vcmUgbGluayBmdW5jdGlvbnNcblx0ICogaW5zaWRlLiBUaGlzIHRvcCBsZXZlbCBjb21waWxlIGZ1bmN0aW9uIHNob3VsZCBvbmx5IGJlXG5cdCAqIGNhbGxlZCBvbiBpbnN0YW5jZSByb290IG5vZGVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gZWxcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHBhcmFtIHtCb29sZWFufSBwYXJ0aWFsXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuXHQgKi9cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbXBpbGUgKGVsLCBvcHRpb25zLCBwYXJ0aWFsKSB7XG5cdCAgdmFyIHBhcmFtcyA9ICFwYXJ0aWFsICYmIG9wdGlvbnMucGFyYW1BdHRyaWJ1dGVzXG5cdCAgdmFyIHBhcmFtc0xpbmtGbiA9IHBhcmFtc1xuXHQgICAgPyBjb21waWxlUGFyYW1BdHRyaWJ1dGVzKGVsLCBwYXJhbXMsIG9wdGlvbnMpXG5cdCAgICA6IG51bGxcblx0ICB2YXIgbm9kZUxpbmtGbiA9IGVsIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudFxuXHQgICAgPyBudWxsXG5cdCAgICA6IGNvbXBpbGVOb2RlKGVsLCBvcHRpb25zKVxuXHQgIHZhciBjaGlsZExpbmtGbiA9XG5cdCAgICAoIW5vZGVMaW5rRm4gfHwgIW5vZGVMaW5rRm4udGVybWluYWwpICYmXG5cdCAgICBlbC5oYXNDaGlsZE5vZGVzKClcblx0ICAgICAgPyBjb21waWxlTm9kZUxpc3QoZWwuY2hpbGROb2Rlcywgb3B0aW9ucylcblx0ICAgICAgOiBudWxsXG5cblx0ICAvKipcblx0ICAgKiBBIGxpbmtlciBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gYSBhbHJlYWR5IGNvbXBpbGVkXG5cdCAgICogcGllY2Ugb2YgRE9NLCB3aGljaCBpbnN0YW50aWF0ZXMgYWxsIGRpcmVjdGl2ZVxuXHQgICAqIGluc3RhbmNlcy5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgICAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSBlbFxuXHQgICAqIEByZXR1cm4ge0Z1bmN0aW9ufHVuZGVmaW5lZH1cblx0ICAgKi9cblxuXHQgIHJldHVybiBmdW5jdGlvbiBsaW5rICh2bSwgZWwpIHtcblx0ICAgIHZhciBvcmlnaW5hbERpckNvdW50ID0gdm0uX2RpcmVjdGl2ZXMubGVuZ3RoXG5cdCAgICBpZiAocGFyYW1zTGlua0ZuKSBwYXJhbXNMaW5rRm4odm0sIGVsKVxuXHQgICAgaWYgKG5vZGVMaW5rRm4pIG5vZGVMaW5rRm4odm0sIGVsKVxuXHQgICAgaWYgKGNoaWxkTGlua0ZuKSBjaGlsZExpbmtGbih2bSwgZWwuY2hpbGROb2RlcylcblxuXHQgICAgLyoqXG5cdCAgICAgKiBJZiB0aGlzIGlzIGEgcGFydGlhbCBjb21waWxlLCB0aGUgbGlua2VyIGZ1bmN0aW9uXG5cdCAgICAgKiByZXR1cm5zIGFuIHVubGluayBmdW5jdGlvbiB0aGF0IHRlYXJzZG93biBhbGxcblx0ICAgICAqIGRpcmVjdGl2ZXMgaW5zdGFuY2VzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIHBhcnRpYWxcblx0ICAgICAqIGxpbmtpbmcuXG5cdCAgICAgKi9cblxuXHQgICAgaWYgKHBhcnRpYWwpIHtcblx0ICAgICAgdmFyIGRpcnMgPSB2bS5fZGlyZWN0aXZlcy5zbGljZShvcmlnaW5hbERpckNvdW50KVxuXHQgICAgICByZXR1cm4gZnVuY3Rpb24gdW5saW5rICgpIHtcblx0ICAgICAgICB2YXIgaSA9IGRpcnMubGVuZ3RoXG5cdCAgICAgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICAgICAgZGlyc1tpXS5fdGVhcmRvd24oKVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpID0gdm0uX2RpcmVjdGl2ZXMuaW5kZXhPZihkaXJzWzBdKVxuXHQgICAgICAgIHZtLl9kaXJlY3RpdmVzLnNwbGljZShpLCBkaXJzLmxlbmd0aClcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb21waWxlIGEgbm9kZSBhbmQgcmV0dXJuIGEgbm9kZUxpbmtGbiBiYXNlZCBvbiB0aGVcblx0ICogbm9kZSB0eXBlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IG5vZGVcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHJldHVybiB7RnVuY3Rpb258dW5kZWZpbmVkfVxuXHQgKi9cblxuXHRmdW5jdGlvbiBjb21waWxlTm9kZSAobm9kZSwgb3B0aW9ucykge1xuXHQgIHZhciB0eXBlID0gbm9kZS5ub2RlVHlwZVxuXHQgIGlmICh0eXBlID09PSAxICYmIG5vZGUudGFnTmFtZSAhPT0gJ1NDUklQVCcpIHtcblx0ICAgIHJldHVybiBjb21waWxlRWxlbWVudChub2RlLCBvcHRpb25zKVxuXHQgIH0gZWxzZSBpZiAodHlwZSA9PT0gMyAmJiBjb25maWcuaW50ZXJwb2xhdGUpIHtcblx0ICAgIHJldHVybiBjb21waWxlVGV4dE5vZGUobm9kZSwgb3B0aW9ucylcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGlsZSBhbiBlbGVtZW50IGFuZCByZXR1cm4gYSBub2RlTGlua0ZuLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufG51bGx9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNvbXBpbGVFbGVtZW50IChlbCwgb3B0aW9ucykge1xuXHQgIHZhciBsaW5rRm4sIHRhZywgY29tcG9uZW50XG5cdCAgLy8gY2hlY2sgY3VzdG9tIGVsZW1lbnQgY29tcG9uZW50LCBidXQgb25seSBvbiBub24tcm9vdFxuXHQgIGlmICghZWwuX192dWVfXykge1xuXHQgICAgdGFnID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG5cdCAgICBjb21wb25lbnQgPVxuXHQgICAgICB0YWcuaW5kZXhPZignLScpID4gMCAmJlxuXHQgICAgICBvcHRpb25zLmNvbXBvbmVudHNbdGFnXVxuXHQgICAgaWYgKGNvbXBvbmVudCkge1xuXHQgICAgICBlbC5zZXRBdHRyaWJ1dGUoY29uZmlnLnByZWZpeCArICdjb21wb25lbnQnLCB0YWcpXG5cdCAgICB9XG5cdCAgfVxuXHQgIGlmIChjb21wb25lbnQgfHwgZWwuaGFzQXR0cmlidXRlcygpKSB7XG5cdCAgICAvLyBjaGVjayB0ZXJtaW5hbCBkaXJlY2l0dmVzXG5cdCAgICBsaW5rRm4gPSBjaGVja1Rlcm1pbmFsRGlyZWN0aXZlcyhlbCwgb3B0aW9ucylcblx0ICAgIC8vIGlmIG5vdCB0ZXJtaW5hbCwgYnVpbGQgbm9ybWFsIGxpbmsgZnVuY3Rpb25cblx0ICAgIGlmICghbGlua0ZuKSB7XG5cdCAgICAgIHZhciBkaXJlY3RpdmVzID0gY29sbGVjdERpcmVjdGl2ZXMoZWwsIG9wdGlvbnMpXG5cdCAgICAgIGxpbmtGbiA9IGRpcmVjdGl2ZXMubGVuZ3RoXG5cdCAgICAgICAgPyBtYWtlRGlyZWN0aXZlc0xpbmtGbihkaXJlY3RpdmVzKVxuXHQgICAgICAgIDogbnVsbFxuXHQgICAgfVxuXHQgIH1cblx0ICAvLyBpZiB0aGUgZWxlbWVudCBpcyBhIHRleHRhcmVhLCB3ZSBuZWVkIHRvIGludGVycG9sYXRlXG5cdCAgLy8gaXRzIGNvbnRlbnQgb24gaW5pdGlhbCByZW5kZXIuXG5cdCAgaWYgKGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcblx0ICAgIHZhciByZWFsTGlua0ZuID0gbGlua0ZuXG5cdCAgICBsaW5rRm4gPSBmdW5jdGlvbiAodm0sIGVsKSB7XG5cdCAgICAgIGVsLnZhbHVlID0gdm0uJGludGVycG9sYXRlKGVsLnZhbHVlKVxuXHQgICAgICBpZiAocmVhbExpbmtGbikgcmVhbExpbmtGbih2bSwgZWwpICAgICAgXG5cdCAgICB9XG5cdCAgICBsaW5rRm4udGVybWluYWwgPSB0cnVlXG5cdCAgfVxuXHQgIHJldHVybiBsaW5rRm5cblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZCBhIG11bHRpLWRpcmVjdGl2ZSBsaW5rIGZ1bmN0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5fSBkaXJlY3RpdmVzXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufSBkaXJlY3RpdmVzTGlua0ZuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIG1ha2VEaXJlY3RpdmVzTGlua0ZuIChkaXJlY3RpdmVzKSB7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uIGRpcmVjdGl2ZXNMaW5rRm4gKHZtLCBlbCkge1xuXHQgICAgLy8gcmV2ZXJzZSBhcHBseSBiZWNhdXNlIGl0J3Mgc29ydGVkIGxvdyB0byBoaWdoXG5cdCAgICB2YXIgaSA9IGRpcmVjdGl2ZXMubGVuZ3RoXG5cdCAgICB2YXIgZGlyLCBqLCBrXG5cdCAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgIGRpciA9IGRpcmVjdGl2ZXNbaV1cblx0ICAgICAgaWYgKGRpci5fbGluaykge1xuXHQgICAgICAgIC8vIGN1c3RvbSBsaW5rIGZuXG5cdCAgICAgICAgZGlyLl9saW5rKHZtLCBlbClcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBrID0gZGlyLmRlc2NyaXB0b3JzLmxlbmd0aFxuXHQgICAgICAgIGZvciAoaiA9IDA7IGogPCBrOyBqKyspIHtcblx0ICAgICAgICAgIHZtLl9iaW5kRGlyKGRpci5uYW1lLCBlbCxcblx0ICAgICAgICAgICAgICAgICAgICAgIGRpci5kZXNjcmlwdG9yc1tqXSwgZGlyLmRlZilcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGlsZSBhIHRleHROb2RlIGFuZCByZXR1cm4gYSBub2RlTGlua0ZuLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1RleHROb2RlfSBub2RlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufG51bGx9IHRleHROb2RlTGlua0ZuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNvbXBpbGVUZXh0Tm9kZSAobm9kZSwgb3B0aW9ucykge1xuXHQgIHZhciB0b2tlbnMgPSB0ZXh0UGFyc2VyLnBhcnNlKG5vZGUubm9kZVZhbHVlKVxuXHQgIGlmICghdG9rZW5zKSB7XG5cdCAgICByZXR1cm4gbnVsbFxuXHQgIH1cblx0ICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXHQgIHZhciBkaXJzID0gb3B0aW9ucy5kaXJlY3RpdmVzXG5cdCAgdmFyIGVsLCB0b2tlbiwgdmFsdWVcblx0ICBmb3IgKHZhciBpID0gMCwgbCA9IHRva2Vucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgIHRva2VuID0gdG9rZW5zW2ldXG5cdCAgICB2YWx1ZSA9IHRva2VuLnZhbHVlXG5cdCAgICBpZiAodG9rZW4udGFnKSB7XG5cdCAgICAgIGlmICh0b2tlbi5vbmVUaW1lKSB7XG5cdCAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSlcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBpZiAodG9rZW4uaHRtbCkge1xuXHQgICAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCd2LWh0bWwnKVxuXHQgICAgICAgICAgdG9rZW4udHlwZSA9ICdodG1sJ1xuXHQgICAgICAgICAgdG9rZW4uZGVmID0gZGlycy5odG1sXG5cdCAgICAgICAgICB0b2tlbi5kZXNjcmlwdG9yID0gZGlyUGFyc2VyLnBhcnNlKHZhbHVlKVswXVxuXHQgICAgICAgIH0gZWxzZSBpZiAodG9rZW4ucGFydGlhbCkge1xuXHQgICAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCd2LXBhcnRpYWwnKVxuXHQgICAgICAgICAgdG9rZW4udHlwZSA9ICdwYXJ0aWFsJ1xuXHQgICAgICAgICAgdG9rZW4uZGVmID0gZGlycy5wYXJ0aWFsXG5cdCAgICAgICAgICB0b2tlbi5kZXNjcmlwdG9yID0gZGlyUGFyc2VyLnBhcnNlKHZhbHVlKVswXVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAvLyBJRSB3aWxsIGNsZWFuIHVwIGVtcHR5IHRleHROb2RlcyBkdXJpbmdcblx0ICAgICAgICAgIC8vIGZyYWcuY2xvbmVOb2RlKHRydWUpLCBzbyB3ZSBoYXZlIHRvIGdpdmUgaXRcblx0ICAgICAgICAgIC8vIHNvbWV0aGluZyBoZXJlLi4uXG5cdCAgICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgJylcblx0ICAgICAgICAgIHRva2VuLnR5cGUgPSAndGV4dCdcblx0ICAgICAgICAgIHRva2VuLmRlZiA9IGRpcnMudGV4dFxuXHQgICAgICAgICAgdG9rZW4uZGVzY3JpcHRvciA9IGRpclBhcnNlci5wYXJzZSh2YWx1ZSlbMF1cblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUpXG5cdCAgICB9XG5cdCAgICBmcmFnLmFwcGVuZENoaWxkKGVsKVxuXHQgIH1cblx0ICByZXR1cm4gbWFrZVRleHROb2RlTGlua0ZuKHRva2VucywgZnJhZywgb3B0aW9ucylcblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZCBhIGZ1bmN0aW9uIHRoYXQgcHJvY2Vzc2VzIGEgdGV4dE5vZGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gdG9rZW5zXG5cdCAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gZnJhZ1xuXHQgKi9cblxuXHRmdW5jdGlvbiBtYWtlVGV4dE5vZGVMaW5rRm4gKHRva2VucywgZnJhZykge1xuXHQgIHJldHVybiBmdW5jdGlvbiB0ZXh0Tm9kZUxpbmtGbiAodm0sIGVsKSB7XG5cdCAgICB2YXIgZnJhZ0Nsb25lID0gZnJhZy5jbG9uZU5vZGUodHJ1ZSlcblx0ICAgIHZhciBjaGlsZE5vZGVzID0gXy50b0FycmF5KGZyYWdDbG9uZS5jaGlsZE5vZGVzKVxuXHQgICAgdmFyIHRva2VuLCB2YWx1ZSwgbm9kZVxuXHQgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIHRva2VuID0gdG9rZW5zW2ldXG5cdCAgICAgIHZhbHVlID0gdG9rZW4udmFsdWVcblx0ICAgICAgaWYgKHRva2VuLnRhZykge1xuXHQgICAgICAgIG5vZGUgPSBjaGlsZE5vZGVzW2ldXG5cdCAgICAgICAgaWYgKHRva2VuLm9uZVRpbWUpIHtcblx0ICAgICAgICAgIHZhbHVlID0gdm0uJGV2YWwodmFsdWUpXG5cdCAgICAgICAgICBpZiAodG9rZW4uaHRtbCkge1xuXHQgICAgICAgICAgICBfLnJlcGxhY2Uobm9kZSwgdGVtcGxhdGVQYXJzZXIucGFyc2UodmFsdWUsIHRydWUpKVxuXHQgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgbm9kZS5ub2RlVmFsdWUgPSB2YWx1ZVxuXHQgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICB2bS5fYmluZERpcih0b2tlbi50eXBlLCBub2RlLFxuXHQgICAgICAgICAgICAgICAgICAgICAgdG9rZW4uZGVzY3JpcHRvciwgdG9rZW4uZGVmKVxuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgXy5yZXBsYWNlKGVsLCBmcmFnQ2xvbmUpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBpbGUgYSBub2RlIGxpc3QgYW5kIHJldHVybiBhIGNoaWxkTGlua0ZuLlxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGVMaXN0fSBub2RlTGlzdFxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbnx1bmRlZmluZWR9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNvbXBpbGVOb2RlTGlzdCAobm9kZUxpc3QsIG9wdGlvbnMpIHtcblx0ICB2YXIgbGlua0ZucyA9IFtdXG5cdCAgdmFyIG5vZGVMaW5rRm4sIGNoaWxkTGlua0ZuLCBub2RlXG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSBub2RlTGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgIG5vZGUgPSBub2RlTGlzdFtpXVxuXHQgICAgbm9kZUxpbmtGbiA9IGNvbXBpbGVOb2RlKG5vZGUsIG9wdGlvbnMpXG5cdCAgICBjaGlsZExpbmtGbiA9XG5cdCAgICAgICghbm9kZUxpbmtGbiB8fCAhbm9kZUxpbmtGbi50ZXJtaW5hbCkgJiZcblx0ICAgICAgbm9kZS5oYXNDaGlsZE5vZGVzKClcblx0ICAgICAgICA/IGNvbXBpbGVOb2RlTGlzdChub2RlLmNoaWxkTm9kZXMsIG9wdGlvbnMpXG5cdCAgICAgICAgOiBudWxsXG5cdCAgICBsaW5rRm5zLnB1c2gobm9kZUxpbmtGbiwgY2hpbGRMaW5rRm4pXG5cdCAgfVxuXHQgIHJldHVybiBsaW5rRm5zLmxlbmd0aFxuXHQgICAgPyBtYWtlQ2hpbGRMaW5rRm4obGlua0Zucylcblx0ICAgIDogbnVsbFxuXHR9XG5cblx0LyoqXG5cdCAqIE1ha2UgYSBjaGlsZCBsaW5rIGZ1bmN0aW9uIGZvciBhIG5vZGUncyBjaGlsZE5vZGVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5PEZ1bmN0aW9uPn0gbGlua0Zuc1xuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn0gY2hpbGRMaW5rRm5cblx0ICovXG5cblx0ZnVuY3Rpb24gbWFrZUNoaWxkTGlua0ZuIChsaW5rRm5zKSB7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uIGNoaWxkTGlua0ZuICh2bSwgbm9kZXMpIHtcblx0ICAgIC8vIHN0YWJsaXplIG5vZGVzXG5cdCAgICBub2RlcyA9IF8udG9BcnJheShub2Rlcylcblx0ICAgIHZhciBub2RlLCBub2RlTGlua0ZuLCBjaGlsZHJlbkxpbmtGblxuXHQgICAgZm9yICh2YXIgaSA9IDAsIG4gPSAwLCBsID0gbGlua0Zucy5sZW5ndGg7IGkgPCBsOyBuKyspIHtcblx0ICAgICAgbm9kZSA9IG5vZGVzW25dXG5cdCAgICAgIG5vZGVMaW5rRm4gPSBsaW5rRm5zW2krK11cblx0ICAgICAgY2hpbGRyZW5MaW5rRm4gPSBsaW5rRm5zW2krK11cblx0ICAgICAgaWYgKG5vZGVMaW5rRm4pIHtcblx0ICAgICAgICBub2RlTGlua0ZuKHZtLCBub2RlKVxuXHQgICAgICB9XG5cdCAgICAgIGlmIChjaGlsZHJlbkxpbmtGbikge1xuXHQgICAgICAgIGNoaWxkcmVuTGlua0ZuKHZtLCBub2RlLmNoaWxkTm9kZXMpXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGlsZSBwYXJhbSBhdHRyaWJ1dGVzIG9uIGEgcm9vdCBlbGVtZW50IGFuZCByZXR1cm5cblx0ICogYSBwYXJhbUF0dHJpYnV0ZXMgbGluayBmdW5jdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge0FycmF5fSBhdHRyc1xuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn0gcGFyYW1zTGlua0ZuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNvbXBpbGVQYXJhbUF0dHJpYnV0ZXMgKGVsLCBhdHRycywgb3B0aW9ucykge1xuXHQgIHZhciBwYXJhbXMgPSBbXVxuXHQgIHZhciBpID0gYXR0cnMubGVuZ3RoXG5cdCAgdmFyIG5hbWUsIHZhbHVlLCBwYXJhbVxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIG5hbWUgPSBhdHRyc1tpXVxuXHQgICAgdmFsdWUgPSBlbC5nZXRBdHRyaWJ1dGUobmFtZSlcblx0ICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xuXHQgICAgICBwYXJhbSA9IHtcblx0ICAgICAgICBuYW1lOiBuYW1lLFxuXHQgICAgICAgIHZhbHVlOiB2YWx1ZVxuXHQgICAgICB9XG5cdCAgICAgIHZhciB0b2tlbnMgPSB0ZXh0UGFyc2VyLnBhcnNlKHZhbHVlKVxuXHQgICAgICBpZiAodG9rZW5zKSB7XG5cdCAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpXG5cdCAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggPiAxKSB7XG5cdCAgICAgICAgICBfLndhcm4oXG5cdCAgICAgICAgICAgICdJbnZhbGlkIHBhcmFtIGF0dHJpYnV0ZSBiaW5kaW5nOiBcIicgK1xuXHQgICAgICAgICAgICBuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicgK1xuXHQgICAgICAgICAgICAnXFxuRG9uXFwndCBtaXggYmluZGluZyB0YWdzIHdpdGggcGxhaW4gdGV4dCAnICtcblx0ICAgICAgICAgICAgJ2luIHBhcmFtIGF0dHJpYnV0ZSBiaW5kaW5ncy4nXG5cdCAgICAgICAgICApXG5cdCAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICBwYXJhbS5keW5hbWljID0gdHJ1ZVxuXHQgICAgICAgICAgcGFyYW0udmFsdWUgPSB0b2tlbnNbMF0udmFsdWVcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgICAgcGFyYW1zLnB1c2gocGFyYW0pXG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiBtYWtlUGFyYW1zTGlua0ZuKHBhcmFtcywgb3B0aW9ucylcblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZCBhIGZ1bmN0aW9uIHRoYXQgYXBwbGllcyBwYXJhbSBhdHRyaWJ1dGVzIHRvIGEgdm0uXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtc1xuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn0gcGFyYW1zTGlua0ZuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIG1ha2VQYXJhbXNMaW5rRm4gKHBhcmFtcywgb3B0aW9ucykge1xuXHQgIHZhciBkZWYgPSBvcHRpb25zLmRpcmVjdGl2ZXNbJ3dpdGgnXVxuXHQgIHJldHVybiBmdW5jdGlvbiBwYXJhbXNMaW5rRm4gKHZtLCBlbCkge1xuXHQgICAgdmFyIGkgPSBwYXJhbXMubGVuZ3RoXG5cdCAgICB2YXIgcGFyYW1cblx0ICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgcGFyYW0gPSBwYXJhbXNbaV1cblx0ICAgICAgaWYgKHBhcmFtLmR5bmFtaWMpIHtcblx0ICAgICAgICAvLyBkeW5hbWljIHBhcmFtIGF0dHJpYnR1ZXMgYXJlIGJvdW5kIGFzIHYtd2l0aC5cblx0ICAgICAgICAvLyB3ZSBjYW4gZGlyZWN0bHkgZHVjayB0aGUgZGVzY3JpcHRvciBoZXJlIGJlYWN1c2Vcblx0ICAgICAgICAvLyBwYXJhbSBhdHRyaWJ1dGVzIGNhbm5vdCB1c2UgZXhwcmVzc2lvbnMgb3Jcblx0ICAgICAgICAvLyBmaWx0ZXJzLlxuXHQgICAgICAgIHZtLl9iaW5kRGlyKCd3aXRoJywgZWwsIHtcblx0ICAgICAgICAgIGFyZzogcGFyYW0ubmFtZSxcblx0ICAgICAgICAgIGV4cHJlc3Npb246IHBhcmFtLnZhbHVlXG5cdCAgICAgICAgfSwgZGVmKVxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIC8vIGp1c3Qgc2V0IG9uY2Vcblx0ICAgICAgICB2bS4kc2V0KHBhcmFtLm5hbWUsIHBhcmFtLnZhbHVlKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIGFuIGVsZW1lbnQgZm9yIHRlcm1pbmFsIGRpcmVjdGl2ZXMgaW4gZml4ZWQgb3JkZXIuXG5cdCAqIElmIGl0IGZpbmRzIG9uZSwgcmV0dXJuIGEgdGVybWluYWwgbGluayBmdW5jdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn0gdGVybWluYWxMaW5rRm5cblx0ICovXG5cblx0dmFyIHRlcm1pbmFsRGlyZWN0aXZlcyA9IFtcblx0ICAncmVwZWF0Jyxcblx0ICAnaWYnLFxuXHQgICdjb21wb25lbnQnXG5cdF1cblxuXHRmdW5jdGlvbiBza2lwICgpIHt9XG5cdHNraXAudGVybWluYWwgPSB0cnVlXG5cblx0ZnVuY3Rpb24gY2hlY2tUZXJtaW5hbERpcmVjdGl2ZXMgKGVsLCBvcHRpb25zKSB7XG5cdCAgaWYgKF8uYXR0cihlbCwgJ3ByZScpICE9PSBudWxsKSB7XG5cdCAgICByZXR1cm4gc2tpcFxuXHQgIH1cblx0ICB2YXIgdmFsdWUsIGRpck5hbWVcblx0ICAvKiBqc2hpbnQgYm9zczogdHJ1ZSAqL1xuXHQgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdCAgICBkaXJOYW1lID0gdGVybWluYWxEaXJlY3RpdmVzW2ldXG5cdCAgICBpZiAodmFsdWUgPSBfLmF0dHIoZWwsIGRpck5hbWUpKSB7XG5cdCAgICAgIHJldHVybiBtYWtlVGVyaW1pbmFsTGlua0ZuKGVsLCBkaXJOYW1lLCB2YWx1ZSwgb3B0aW9ucylcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQnVpbGQgYSBsaW5rIGZ1bmN0aW9uIGZvciBhIHRlcm1pbmFsIGRpcmVjdGl2ZS5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZGlyTmFtZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHJldHVybiB7RnVuY3Rpb259IHRlcm1pbmFsTGlua0ZuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIG1ha2VUZXJpbWluYWxMaW5rRm4gKGVsLCBkaXJOYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuXHQgIHZhciBkZXNjcmlwdG9yID0gZGlyUGFyc2VyLnBhcnNlKHZhbHVlKVswXVxuXHQgIHZhciBkZWYgPSBvcHRpb25zLmRpcmVjdGl2ZXNbZGlyTmFtZV1cblx0ICAvLyBzcGVjaWFsIGNhc2U6IHdlIG5lZWQgdG8gY29sbGVjdCBkaXJlY3RpdmVzIGZvdW5kXG5cdCAgLy8gb24gYSBjb21wb25lbnQgcm9vdCBub2RlLCBidXQgZGVmaW5lZCBpbiB0aGUgcGFyZW50XG5cdCAgLy8gdGVtcGxhdGUuIFRoZXNlIGRpcmVjdGl2ZXMgbmVlZCB0byBiZSBjb21waWxlZCBpblxuXHQgIC8vIHRoZSBwYXJlbnQgc2NvcGUuXG5cdCAgaWYgKGRpck5hbWUgPT09ICdjb21wb25lbnQnKSB7XG5cdCAgICB2YXIgZGlycyA9IGNvbGxlY3REaXJlY3RpdmVzKGVsLCBvcHRpb25zLCB0cnVlKVxuXHQgICAgZWwuX3BhcmVudExpbmtlciA9IGRpcnMubGVuZ3RoXG5cdCAgICAgID8gbWFrZURpcmVjdGl2ZXNMaW5rRm4oZGlycylcblx0ICAgICAgOiBudWxsXG5cdCAgfVxuXHQgIHZhciB0ZXJtaW5hbExpbmtGbiA9IGZ1bmN0aW9uICh2bSwgZWwpIHtcblx0ICAgIHZtLl9iaW5kRGlyKGRpck5hbWUsIGVsLCBkZXNjcmlwdG9yLCBkZWYpXG5cdCAgfVxuXHQgIHRlcm1pbmFsTGlua0ZuLnRlcm1pbmFsID0gdHJ1ZVxuXHQgIHJldHVybiB0ZXJtaW5hbExpbmtGblxuXHR9XG5cblx0LyoqXG5cdCAqIENvbGxlY3QgdGhlIGRpcmVjdGl2ZXMgb24gYW4gZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGFzUGFyZW50XG5cdCAqIEByZXR1cm4ge0FycmF5fVxuXHQgKi9cblxuXHRmdW5jdGlvbiBjb2xsZWN0RGlyZWN0aXZlcyAoZWwsIG9wdGlvbnMsIGFzUGFyZW50KSB7XG5cdCAgdmFyIGF0dHJzID0gXy50b0FycmF5KGVsLmF0dHJpYnV0ZXMpXG5cdCAgdmFyIGkgPSBhdHRycy5sZW5ndGhcblx0ICB2YXIgZGlycyA9IFtdXG5cdCAgdmFyIGF0dHIsIGF0dHJOYW1lLCBkaXIsIGRpck5hbWUsIGRpckRlZlxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIGF0dHIgPSBhdHRyc1tpXVxuXHQgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWVcblx0ICAgIGlmIChhdHRyTmFtZS5pbmRleE9mKGNvbmZpZy5wcmVmaXgpID09PSAwKSB7XG5cdCAgICAgIGRpck5hbWUgPSBhdHRyTmFtZS5zbGljZShjb25maWcucHJlZml4Lmxlbmd0aClcblx0ICAgICAgaWYgKFxuXHQgICAgICAgIGFzUGFyZW50ICYmXG5cdCAgICAgICAgKGRpck5hbWUgPT09ICd3aXRoJyB8fCBkaXJOYW1lID09PSAncmVmJylcblx0ICAgICAgKSB7XG5cdCAgICAgICAgY29udGludWVcblx0ICAgICAgfVxuXHQgICAgICBkaXJEZWYgPSBvcHRpb25zLmRpcmVjdGl2ZXNbZGlyTmFtZV1cblx0ICAgICAgXy5hc3NlcnRBc3NldChkaXJEZWYsICdkaXJlY3RpdmUnLCBkaXJOYW1lKVxuXHQgICAgICBpZiAoZGlyRGVmKSB7XG5cdCAgICAgICAgZGlycy5wdXNoKHtcblx0ICAgICAgICAgIG5hbWU6IGRpck5hbWUsXG5cdCAgICAgICAgICBkZXNjcmlwdG9yczogZGlyUGFyc2VyLnBhcnNlKGF0dHIudmFsdWUpLFxuXHQgICAgICAgICAgZGVmOiBkaXJEZWZcblx0ICAgICAgICB9KVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2UgaWYgKGNvbmZpZy5pbnRlcnBvbGF0ZSkge1xuXHQgICAgICBkaXIgPSBjb2xsZWN0QXR0ckRpcmVjdGl2ZShlbCwgYXR0ck5hbWUsIGF0dHIudmFsdWUsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMpXG5cdCAgICAgIGlmIChkaXIpIHtcblx0ICAgICAgICBkaXJzLnB1c2goZGlyKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHQgIC8vIHNvcnQgYnkgcHJpb3JpdHksIExPVyB0byBISUdIXG5cdCAgZGlycy5zb3J0KGRpcmVjdGl2ZUNvbXBhcmF0b3IpXG5cdCAgcmV0dXJuIGRpcnNcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayBhbiBhdHRyaWJ1dGUgZm9yIHBvdGVudGlhbCBkeW5hbWljIGJpbmRpbmdzLFxuXHQgKiBhbmQgcmV0dXJuIGEgZGlyZWN0aXZlIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHJldHVybiB7T2JqZWN0fVxuXHQgKi9cblxuXHRmdW5jdGlvbiBjb2xsZWN0QXR0ckRpcmVjdGl2ZSAoZWwsIG5hbWUsIHZhbHVlLCBvcHRpb25zKSB7XG5cdCAgdmFyIHRva2VucyA9IHRleHRQYXJzZXIucGFyc2UodmFsdWUpXG5cdCAgaWYgKHRva2Vucykge1xuXHQgICAgdmFyIGRlZiA9IG9wdGlvbnMuZGlyZWN0aXZlcy5hdHRyXG5cdCAgICB2YXIgaSA9IHRva2Vucy5sZW5ndGhcblx0ICAgIHZhciBhbGxPbmVUaW1lID0gdHJ1ZVxuXHQgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV1cblx0ICAgICAgaWYgKHRva2VuLnRhZyAmJiAhdG9rZW4ub25lVGltZSkge1xuXHQgICAgICAgIGFsbE9uZVRpbWUgPSBmYWxzZVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4ge1xuXHQgICAgICBkZWY6IGRlZixcblx0ICAgICAgX2xpbms6IGFsbE9uZVRpbWVcblx0ICAgICAgICA/IGZ1bmN0aW9uICh2bSwgZWwpIHtcblx0ICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZtLiRpbnRlcnBvbGF0ZSh2YWx1ZSkpXG5cdCAgICAgICAgICB9XG5cdCAgICAgICAgOiBmdW5jdGlvbiAodm0sIGVsKSB7XG5cdCAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRleHRQYXJzZXIudG9rZW5zVG9FeHAodG9rZW5zLCB2bSlcblx0ICAgICAgICAgICAgdmFyIGRlc2MgPSBkaXJQYXJzZXIucGFyc2UobmFtZSArICc6JyArIHZhbHVlKVswXVxuXHQgICAgICAgICAgICB2bS5fYmluZERpcignYXR0cicsIGVsLCBkZXNjLCBkZWYpXG5cdCAgICAgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIERpcmVjdGl2ZSBwcmlvcml0eSBzb3J0IGNvbXBhcmF0b3Jcblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IGFcblx0ICogQHBhcmFtIHtPYmplY3R9IGJcblx0ICovXG5cblx0ZnVuY3Rpb24gZGlyZWN0aXZlQ29tcGFyYXRvciAoYSwgYikge1xuXHQgIGEgPSBhLmRlZi5wcmlvcml0eSB8fCAwXG5cdCAgYiA9IGIuZGVmLnByaW9yaXR5IHx8IDBcblx0ICByZXR1cm4gYSA+IGIgPyAxIDogLTFcblx0fVxuXG4vKioqLyB9LFxuLyogNDQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdHZhciBoYW5kbGVycyA9IHtcblx0ICB0ZXh0OiBfX3dlYnBhY2tfcmVxdWlyZV9fKDU1KSxcblx0ICByYWRpbzogX193ZWJwYWNrX3JlcXVpcmVfXyg1NiksXG5cdCAgc2VsZWN0OiBfX3dlYnBhY2tfcmVxdWlyZV9fKDU3KSxcblx0ICBjaGVja2JveDogX193ZWJwYWNrX3JlcXVpcmVfXyg1OClcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgcHJpb3JpdHk6IDgwMCxcblx0ICB0d29XYXk6IHRydWUsXG5cdCAgaGFuZGxlcnM6IGhhbmRsZXJzLFxuXG5cdCAgLyoqXG5cdCAgICogUG9zc2libGUgZWxlbWVudHM6XG5cdCAgICogICA8c2VsZWN0PlxuXHQgICAqICAgPHRleHRhcmVhPlxuXHQgICAqICAgPGlucHV0IHR5cGU9XCIqXCI+XG5cdCAgICogICAgIC0gdGV4dFxuXHQgICAqICAgICAtIGNoZWNrYm94XG5cdCAgICogICAgIC0gcmFkaW9cblx0ICAgKiAgICAgLSBudW1iZXJcblx0ICAgKiAgICAgLSBUT0RPOiBtb3JlIHR5cGVzIG1heSBiZSBzdXBwbGllZCBhcyBhIHBsdWdpblxuXHQgICAqL1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIGVsID0gdGhpcy5lbFxuXHQgICAgdmFyIHRhZyA9IGVsLnRhZ05hbWVcblx0ICAgIHZhciBoYW5kbGVyXG5cdCAgICBpZiAodGFnID09PSAnSU5QVVQnKSB7XG5cdCAgICAgIGhhbmRsZXIgPSBoYW5kbGVyc1tlbC50eXBlXSB8fCBoYW5kbGVycy50ZXh0XG5cdCAgICB9IGVsc2UgaWYgKHRhZyA9PT0gJ1NFTEVDVCcpIHtcblx0ICAgICAgaGFuZGxlciA9IGhhbmRsZXJzLnNlbGVjdFxuXHQgICAgfSBlbHNlIGlmICh0YWcgPT09ICdURVhUQVJFQScpIHtcblx0ICAgICAgaGFuZGxlciA9IGhhbmRsZXJzLnRleHRcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIF8ud2FybihcInYtbW9kZWwgZG9lc24ndCBzdXBwb3J0IGVsZW1lbnQgdHlwZTogXCIgKyB0YWcpXG5cdCAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgICAgaGFuZGxlci5iaW5kLmNhbGwodGhpcylcblx0ICAgIHRoaXMudXBkYXRlID0gaGFuZGxlci51cGRhdGVcblx0ICAgIHRoaXMudW5iaW5kID0gaGFuZGxlci51bmJpbmRcblx0ICB9XG5cblx0fVxuXG4vKioqLyB9LFxuLyogNDUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgY29uZmlnID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSlcblx0dmFyIFdhdGNoZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KVxuXHR2YXIgdGV4dFBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpXG5cdHZhciBleHBQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQxKVxuXG5cdC8qKlxuXHQgKiBBIGRpcmVjdGl2ZSBsaW5rcyBhIERPTSBlbGVtZW50IHdpdGggYSBwaWVjZSBvZiBkYXRhLFxuXHQgKiB3aGljaCBpcyB0aGUgcmVzdWx0IG9mIGV2YWx1YXRpbmcgYW4gZXhwcmVzc2lvbi5cblx0ICogSXQgcmVnaXN0ZXJzIGEgd2F0Y2hlciB3aXRoIHRoZSBleHByZXNzaW9uIGFuZCBjYWxsc1xuXHQgKiB0aGUgRE9NIHVwZGF0ZSBmdW5jdGlvbiB3aGVuIGEgY2hhbmdlIGlzIHRyaWdnZXJlZC5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcblx0ICogQHBhcmFtIHtOb2RlfSBlbFxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICogQHBhcmFtIHtPYmplY3R9IGRlc2NyaXB0b3Jcblx0ICogICAgICAgICAgICAgICAgIC0ge1N0cmluZ30gZXhwcmVzc2lvblxuXHQgKiAgICAgICAgICAgICAgICAgLSB7U3RyaW5nfSBbYXJnXVxuXHQgKiAgICAgICAgICAgICAgICAgLSB7QXJyYXk8T2JqZWN0Pn0gW2ZpbHRlcnNdXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkZWYgLSBkaXJlY3RpdmUgZGVmaW5pdGlvbiBvYmplY3Rcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW2xpbmtlcl0gLSBwcmUtY29tcGlsZWQgbGlua2VyIGZ1bmN0aW9uXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblxuXHRmdW5jdGlvbiBEaXJlY3RpdmUgKG5hbWUsIGVsLCB2bSwgZGVzY3JpcHRvciwgZGVmLCBsaW5rZXIpIHtcblx0ICAvLyBwdWJsaWNcblx0ICB0aGlzLm5hbWUgPSBuYW1lXG5cdCAgdGhpcy5lbCA9IGVsXG5cdCAgdGhpcy52bSA9IHZtXG5cdCAgLy8gY29weSBkZXNjcmlwdG9yIHByb3BzXG5cdCAgdGhpcy5yYXcgPSBkZXNjcmlwdG9yLnJhd1xuXHQgIHRoaXMuZXhwcmVzc2lvbiA9IGRlc2NyaXB0b3IuZXhwcmVzc2lvblxuXHQgIHRoaXMuYXJnID0gZGVzY3JpcHRvci5hcmdcblx0ICB0aGlzLmZpbHRlcnMgPSBfLnJlc29sdmVGaWx0ZXJzKHZtLCBkZXNjcmlwdG9yLmZpbHRlcnMpXG5cdCAgLy8gcHJpdmF0ZVxuXHQgIHRoaXMuX2xpbmtlciA9IGxpbmtlclxuXHQgIHRoaXMuX2xvY2tlZCA9IGZhbHNlXG5cdCAgdGhpcy5fYm91bmQgPSBmYWxzZVxuXHQgIC8vIGluaXRcblx0ICB0aGlzLl9iaW5kKGRlZilcblx0fVxuXG5cdHZhciBwID0gRGlyZWN0aXZlLnByb3RvdHlwZVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBkaXJlY3RpdmUsIG1peGluIGRlZmluaXRpb24gcHJvcGVydGllcyxcblx0ICogc2V0dXAgdGhlIHdhdGNoZXIsIGNhbGwgZGVmaW5pdGlvbiBiaW5kKCkgYW5kIHVwZGF0ZSgpXG5cdCAqIGlmIHByZXNlbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkZWZcblx0ICovXG5cblx0cC5fYmluZCA9IGZ1bmN0aW9uIChkZWYpIHtcblx0ICBpZiAodGhpcy5uYW1lICE9PSAnY2xvYWsnICYmIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKSB7XG5cdCAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZShjb25maWcucHJlZml4ICsgdGhpcy5uYW1lKVxuXHQgIH1cblx0ICBpZiAodHlwZW9mIGRlZiA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgdGhpcy51cGRhdGUgPSBkZWZcblx0ICB9IGVsc2Uge1xuXHQgICAgXy5leHRlbmQodGhpcywgZGVmKVxuXHQgIH1cblx0ICB0aGlzLl93YXRjaGVyRXhwID0gdGhpcy5leHByZXNzaW9uXG5cdCAgdGhpcy5fY2hlY2tEeW5hbWljTGl0ZXJhbCgpXG5cdCAgaWYgKHRoaXMuYmluZCkge1xuXHQgICAgdGhpcy5iaW5kKClcblx0ICB9XG5cdCAgaWYgKFxuXHQgICAgdGhpcy51cGRhdGUgJiYgdGhpcy5fd2F0Y2hlckV4cCAmJlxuXHQgICAgKCF0aGlzLmlzTGl0ZXJhbCB8fCB0aGlzLl9pc0R5bmFtaWNMaXRlcmFsKSAmJlxuXHQgICAgIXRoaXMuX2NoZWNrU3RhdGVtZW50KClcblx0ICApIHtcblx0ICAgIC8vIHVzZSByYXcgZXhwcmVzc2lvbiBhcyBpZGVudGlmaWVyIGJlY2F1c2UgZmlsdGVyc1xuXHQgICAgLy8gbWFrZSB0aGVtIGRpZmZlcmVudCB3YXRjaGVyc1xuXHQgICAgdmFyIHdhdGNoZXIgPSB0aGlzLnZtLl93YXRjaGVyc1t0aGlzLnJhd11cblx0ICAgIC8vIHdyYXBwZWQgdXBkYXRlciBmb3IgY29udGV4dFxuXHQgICAgdmFyIGRpciA9IHRoaXNcblx0ICAgIHZhciB1cGRhdGUgPSB0aGlzLl91cGRhdGUgPSBmdW5jdGlvbiAodmFsLCBvbGRWYWwpIHtcblx0ICAgICAgaWYgKCFkaXIuX2xvY2tlZCkge1xuXHQgICAgICAgIGRpci51cGRhdGUodmFsLCBvbGRWYWwpXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIGlmICghd2F0Y2hlcikge1xuXHQgICAgICB3YXRjaGVyID0gdGhpcy52bS5fd2F0Y2hlcnNbdGhpcy5yYXddID0gbmV3IFdhdGNoZXIoXG5cdCAgICAgICAgdGhpcy52bSxcblx0ICAgICAgICB0aGlzLl93YXRjaGVyRXhwLFxuXHQgICAgICAgIHVwZGF0ZSwgLy8gY2FsbGJhY2tcblx0ICAgICAgICB0aGlzLmZpbHRlcnMsXG5cdCAgICAgICAgdGhpcy50d29XYXkgLy8gbmVlZCBzZXR0ZXJcblx0ICAgICAgKVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgd2F0Y2hlci5hZGRDYih1cGRhdGUpXG5cdCAgICB9XG5cdCAgICB0aGlzLl93YXRjaGVyID0gd2F0Y2hlclxuXHQgICAgaWYgKHRoaXMuX2luaXRWYWx1ZSAhPSBudWxsKSB7XG5cdCAgICAgIHdhdGNoZXIuc2V0KHRoaXMuX2luaXRWYWx1ZSlcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMudXBkYXRlKHdhdGNoZXIudmFsdWUpXG5cdCAgICB9XG5cdCAgfVxuXHQgIHRoaXMuX2JvdW5kID0gdHJ1ZVxuXHR9XG5cblx0LyoqXG5cdCAqIGNoZWNrIGlmIHRoaXMgaXMgYSBkeW5hbWljIGxpdGVyYWwgYmluZGluZy5cblx0ICpcblx0ICogZS5nLiB2LWNvbXBvbmVudD1cInt7Y3VycmVudFZpZXd9fVwiXG5cdCAqL1xuXG5cdHAuX2NoZWNrRHluYW1pY0xpdGVyYWwgPSBmdW5jdGlvbiAoKSB7XG5cdCAgdmFyIGV4cHJlc3Npb24gPSB0aGlzLmV4cHJlc3Npb25cblx0ICBpZiAoZXhwcmVzc2lvbiAmJiB0aGlzLmlzTGl0ZXJhbCkge1xuXHQgICAgdmFyIHRva2VucyA9IHRleHRQYXJzZXIucGFyc2UoZXhwcmVzc2lvbilcblx0ICAgIGlmICh0b2tlbnMpIHtcblx0ICAgICAgdmFyIGV4cCA9IHRleHRQYXJzZXIudG9rZW5zVG9FeHAodG9rZW5zKVxuXHQgICAgICB0aGlzLmV4cHJlc3Npb24gPSB0aGlzLnZtLiRnZXQoZXhwKVxuXHQgICAgICB0aGlzLl93YXRjaGVyRXhwID0gZXhwXG5cdCAgICAgIHRoaXMuX2lzRHluYW1pY0xpdGVyYWwgPSB0cnVlXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIHRoZSBkaXJlY3RpdmUgaXMgYSBmdW5jdGlvbiBjYWxsZXJcblx0ICogYW5kIGlmIHRoZSBleHByZXNzaW9uIGlzIGEgY2FsbGFibGUgb25lLiBJZiBib3RoIHRydWUsXG5cdCAqIHdlIHdyYXAgdXAgdGhlIGV4cHJlc3Npb24gYW5kIHVzZSBpdCBhcyB0aGUgZXZlbnRcblx0ICogaGFuZGxlci5cblx0ICpcblx0ICogZS5nLiB2LW9uPVwiY2xpY2s6IGErK1wiXG5cdCAqXG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCAqL1xuXG5cdHAuX2NoZWNrU3RhdGVtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBleHByZXNzaW9uID0gdGhpcy5leHByZXNzaW9uXG5cdCAgaWYgKFxuXHQgICAgZXhwcmVzc2lvbiAmJiB0aGlzLmFjY2VwdFN0YXRlbWVudCAmJlxuXHQgICAgIWV4cFBhcnNlci5wYXRoVGVzdFJFLnRlc3QoZXhwcmVzc2lvbilcblx0ICApIHtcblx0ICAgIHZhciBmbiA9IGV4cFBhcnNlci5wYXJzZShleHByZXNzaW9uKS5nZXRcblx0ICAgIHZhciB2bSA9IHRoaXMudm1cblx0ICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICBmbi5jYWxsKHZtLCB2bSlcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLmZpbHRlcnMpIHtcblx0ICAgICAgaGFuZGxlciA9IF8uYXBwbHlGaWx0ZXJzKFxuXHQgICAgICAgIGhhbmRsZXIsXG5cdCAgICAgICAgdGhpcy5maWx0ZXJzLnJlYWQsXG5cdCAgICAgICAgdm1cblx0ICAgICAgKVxuXHQgICAgfVxuXHQgICAgdGhpcy51cGRhdGUoaGFuZGxlcilcblx0ICAgIHJldHVybiB0cnVlXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFRlYXJkb3duIHRoZSB3YXRjaGVyIGFuZCBjYWxsIHVuYmluZC5cblx0ICovXG5cblx0cC5fdGVhcmRvd24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgaWYgKHRoaXMuX2JvdW5kKSB7XG5cdCAgICBpZiAodGhpcy51bmJpbmQpIHtcblx0ICAgICAgdGhpcy51bmJpbmQoKVxuXHQgICAgfVxuXHQgICAgdmFyIHdhdGNoZXIgPSB0aGlzLl93YXRjaGVyXG5cdCAgICBpZiAod2F0Y2hlciAmJiB3YXRjaGVyLmFjdGl2ZSkge1xuXHQgICAgICB3YXRjaGVyLnJlbW92ZUNiKHRoaXMuX3VwZGF0ZSlcblx0ICAgICAgaWYgKCF3YXRjaGVyLmFjdGl2ZSkge1xuXHQgICAgICAgIHRoaXMudm0uX3dhdGNoZXJzW3RoaXMucmF3XSA9IG51bGxcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgdGhpcy5fYm91bmQgPSBmYWxzZVxuXHQgICAgdGhpcy52bSA9IHRoaXMuZWwgPSB0aGlzLl93YXRjaGVyID0gbnVsbFxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgd2l0aCB0aGUgc2V0dGVyLlxuXHQgKiBUaGlzIHNob3VsZCBvbmx5IGJlIHVzZWQgaW4gdHdvLXdheSBkaXJlY3RpdmVzXG5cdCAqIGUuZy4gdi1tb2RlbC5cblx0ICpcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGxvY2sgLSBwcmV2ZW50IHdydGllIHRyaWdnZXJpbmcgdXBkYXRlLlxuXHQgKiBAcHVibGljXG5cdCAqL1xuXG5cdHAuc2V0ID0gZnVuY3Rpb24gKHZhbHVlLCBsb2NrKSB7XG5cdCAgaWYgKHRoaXMudHdvV2F5KSB7XG5cdCAgICBpZiAobG9jaykge1xuXHQgICAgICB0aGlzLl9sb2NrZWQgPSB0cnVlXG5cdCAgICB9XG5cdCAgICB0aGlzLl93YXRjaGVyLnNldCh2YWx1ZSlcblx0ICAgIGlmIChsb2NrKSB7XG5cdCAgICAgIHZhciBzZWxmID0gdGhpc1xuXHQgICAgICBfLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBzZWxmLl9sb2NrZWQgPSBmYWxzZSAgICAgICAgXG5cdCAgICAgIH0pXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBEaXJlY3RpdmVcblxuLyoqKi8gfSxcbi8qIDQ2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIHRlbXBsYXRlUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MClcblxuXHQvKipcblx0ICogUHJvY2VzcyBhbiBlbGVtZW50IG9yIGEgRG9jdW1lbnRGcmFnbWVudCBiYXNlZCBvbiBhXG5cdCAqIGluc3RhbmNlIG9wdGlvbiBvYmplY3QuIFRoaXMgYWxsb3dzIHVzIHRvIHRyYW5zY2x1ZGVcblx0ICogYSB0ZW1wbGF0ZSBub2RlL2ZyYWdtZW50IGJlZm9yZSB0aGUgaW5zdGFuY2UgaXMgY3JlYXRlZCxcblx0ICogc28gdGhlIHByb2Nlc3NlZCBmcmFnbWVudCBjYW4gdGhlbiBiZSBjbG9uZWQgYW5kIHJldXNlZFxuXHQgKiBpbiB2LXJlcGVhdC5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcmV0dXJuIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9XG5cdCAqL1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNjbHVkZSAoZWwsIG9wdGlvbnMpIHtcblx0ICAvLyBmb3IgdGVtcGxhdGUgdGFncywgd2hhdCB3ZSB3YW50IGlzIGl0cyBjb250ZW50IGFzXG5cdCAgLy8gYSBkb2N1bWVudEZyYWdtZW50IChmb3IgYmxvY2sgaW5zdGFuY2VzKVxuXHQgIGlmIChlbC50YWdOYW1lID09PSAnVEVNUExBVEUnKSB7XG5cdCAgICBlbCA9IHRlbXBsYXRlUGFyc2VyLnBhcnNlKGVsKVxuXHQgIH1cblx0ICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnRlbXBsYXRlKSB7XG5cdCAgICBlbCA9IHRyYW5zY2x1ZGVUZW1wbGF0ZShlbCwgb3B0aW9ucylcblx0ICB9XG5cdCAgaWYgKGVsIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuXHQgICAgXy5wcmVwZW5kKGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3Ytc3RhcnQnKSwgZWwpXG5cdCAgICBlbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVDb21tZW50KCd2LWVuZCcpKVxuXHQgIH1cblx0ICByZXR1cm4gZWxcblx0fVxuXG5cdC8qKlxuXHQgKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSBvcHRpb24uXG5cdCAqIElmIHRoZSByZXBsYWNlIG9wdGlvbiBpcyB0cnVlIHRoaXMgd2lsbCBzd2FwIHRoZSAkZWwuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHJldHVybiB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fVxuXHQgKi9cblxuXHRmdW5jdGlvbiB0cmFuc2NsdWRlVGVtcGxhdGUgKGVsLCBvcHRpb25zKSB7XG5cdCAgdmFyIHRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZVxuXHQgIHZhciBmcmFnID0gdGVtcGxhdGVQYXJzZXIucGFyc2UodGVtcGxhdGUsIHRydWUpXG5cdCAgaWYgKCFmcmFnKSB7XG5cdCAgICBfLndhcm4oJ0ludmFsaWQgdGVtcGxhdGUgb3B0aW9uOiAnICsgdGVtcGxhdGUpXG5cdCAgfSBlbHNlIHtcblx0ICAgIGNvbGxlY3RSYXdDb250ZW50KGVsKVxuXHQgICAgaWYgKG9wdGlvbnMucmVwbGFjZSkge1xuXHQgICAgICBpZiAoZnJhZy5jaGlsZE5vZGVzLmxlbmd0aCA+IDEpIHtcblx0ICAgICAgICB0cmFuc2NsdWRlQ29udGVudChmcmFnKVxuXHQgICAgICAgIHJldHVybiBmcmFnXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdmFyIHJlcGxhY2VyID0gZnJhZy5maXJzdENoaWxkXG5cdCAgICAgICAgXy5jb3B5QXR0cmlidXRlcyhlbCwgcmVwbGFjZXIpXG5cdCAgICAgICAgdHJhbnNjbHVkZUNvbnRlbnQocmVwbGFjZXIpXG5cdCAgICAgICAgcmV0dXJuIHJlcGxhY2VyXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGVsLmFwcGVuZENoaWxkKGZyYWcpXG5cdCAgICAgIHRyYW5zY2x1ZGVDb250ZW50KGVsKVxuXHQgICAgICByZXR1cm4gZWxcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ29sbGVjdCByYXcgY29udGVudCBpbnNpZGUgJGVsIGJlZm9yZSB0aGV5IGFyZVxuXHQgKiByZXBsYWNlZCBieSB0ZW1wbGF0ZSBjb250ZW50LlxuXHQgKi9cblxuXHR2YXIgcmF3Q29udGVudFxuXHRmdW5jdGlvbiBjb2xsZWN0UmF3Q29udGVudCAoZWwpIHtcblx0ICB2YXIgY2hpbGRcblx0ICByYXdDb250ZW50ID0gbnVsbFxuXHQgIGlmIChlbC5oYXNDaGlsZE5vZGVzKCkpIHtcblx0ICAgIHJhd0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHQgICAgLyoganNoaW50IGJvc3M6dHJ1ZSAqL1xuXHQgICAgd2hpbGUgKGNoaWxkID0gZWwuZmlyc3RDaGlsZCkge1xuXHQgICAgICByYXdDb250ZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXNvbHZlIDxjb250ZW50PiBpbnNlcnRpb24gcG9pbnRzIG1pbWlja2luZyB0aGUgYmVoYXZpb3Jcblx0ICogb2YgdGhlIFNoYWRvdyBET00gc3BlYzpcblx0ICpcblx0ICogICBodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJjb21wb25lbnRzL3NwZWMvc2hhZG93LyNpbnNlcnRpb24tcG9pbnRzXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSBlbFxuXHQgKi9cblxuXHRmdW5jdGlvbiB0cmFuc2NsdWRlQ29udGVudCAoZWwpIHtcblx0ICB2YXIgb3V0bGV0cyA9IGdldE91dGxldHMoZWwpXG5cdCAgdmFyIGkgPSBvdXRsZXRzLmxlbmd0aFxuXHQgIGlmICghaSkgcmV0dXJuXG5cdCAgdmFyIG91dGxldCwgc2VsZWN0LCBqLCBtYWluXG5cdCAgLy8gZmlyc3QgcGFzcywgY29sbGVjdCBjb3JyZXNwb25kaW5nIGNvbnRlbnRcblx0ICAvLyBmb3IgZWFjaCBvdXRsZXQuXG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAgb3V0bGV0ID0gb3V0bGV0c1tpXVxuXHQgICAgaWYgKHJhd0NvbnRlbnQpIHtcblx0ICAgICAgc2VsZWN0ID0gb3V0bGV0LmdldEF0dHJpYnV0ZSgnc2VsZWN0Jylcblx0ICAgICAgaWYgKHNlbGVjdCkgeyAgLy8gc2VsZWN0IGNvbnRlbnRcblx0ICAgICAgICBvdXRsZXQuY29udGVudCA9IF8udG9BcnJheShcblx0ICAgICAgICAgIHJhd0NvbnRlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3QpXG5cdCAgICAgICAgKVxuXHQgICAgICB9IGVsc2UgeyAvLyBkZWZhdWx0IGNvbnRlbnRcblx0ICAgICAgICBtYWluID0gb3V0bGV0XG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7IC8vIGZhbGxiYWNrIGNvbnRlbnRcblx0ICAgICAgb3V0bGV0LmNvbnRlbnQgPSBfLnRvQXJyYXkob3V0bGV0LmNoaWxkTm9kZXMpXG5cdCAgICB9XG5cdCAgfVxuXHQgIC8vIHNlY29uZCBwYXNzLCBhY3R1YWxseSBpbnNlcnQgdGhlIGNvbnRlbnRzXG5cdCAgZm9yIChpID0gMCwgaiA9IG91dGxldHMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdCAgICBvdXRsZXQgPSBvdXRsZXRzW2ldXG5cdCAgICBpZiAob3V0bGV0ICE9PSBtYWluKSB7XG5cdCAgICAgIGluc2VydENvbnRlbnRBdChvdXRsZXQsIG91dGxldC5jb250ZW50KVxuXHQgICAgfVxuXHQgIH1cblx0ICAvLyBmaW5hbGx5IGluc2VydCB0aGUgbWFpbiBjb250ZW50XG5cdCAgaWYgKG1haW4pIHtcblx0ICAgIGluc2VydENvbnRlbnRBdChtYWluLCBfLnRvQXJyYXkocmF3Q29udGVudC5jaGlsZE5vZGVzKSlcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IDxjb250ZW50PiBvdXRsZXRzIGZyb20gdGhlIGVsZW1lbnQvbGlzdFxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR8QXJyYXl9IGVsXG5cdCAqIEByZXR1cm4ge0FycmF5fVxuXHQgKi9cblxuXHR2YXIgY29uY2F0ID0gW10uY29uY2F0XG5cdGZ1bmN0aW9uIGdldE91dGxldHMgKGVsKSB7XG5cdCAgcmV0dXJuIF8uaXNBcnJheShlbClcblx0ICAgID8gY29uY2F0LmFwcGx5KFtdLCBlbC5tYXAoZ2V0T3V0bGV0cykpXG5cdCAgICA6IGVsLnF1ZXJ5U2VsZWN0b3JBbGxcblx0ICAgICAgPyBfLnRvQXJyYXkoZWwucXVlcnlTZWxlY3RvckFsbCgnY29udGVudCcpKVxuXHQgICAgICA6IFtdXG5cdH1cblxuXHQvKipcblx0ICogSW5zZXJ0IGFuIGFycmF5IG9mIG5vZGVzIGF0IG91dGxldCxcblx0ICogdGhlbiByZW1vdmUgdGhlIG91dGxldC5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBvdXRsZXRcblx0ICogQHBhcmFtIHtBcnJheX0gY29udGVudHNcblx0ICovXG5cblx0ZnVuY3Rpb24gaW5zZXJ0Q29udGVudEF0IChvdXRsZXQsIGNvbnRlbnRzKSB7XG5cdCAgLy8gbm90IHVzaW5nIHV0aWwgRE9NIG1ldGhvZHMgaGVyZSBiZWNhdXNlXG5cdCAgLy8gcGFyZW50Tm9kZSBjYW4gYmUgY2FjaGVkXG5cdCAgdmFyIHBhcmVudCA9IG91dGxldC5wYXJlbnROb2RlXG5cdCAgZm9yICh2YXIgaSA9IDAsIGogPSBjb250ZW50cy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0ICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoY29udGVudHNbaV0sIG91dGxldClcblx0ICB9XG5cdCAgcGFyZW50LnJlbW92ZUNoaWxkKG91dGxldClcblx0fVxuXG4vKioqLyB9LFxuLyogNDcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciB1aWQgPSAwXG5cblx0LyoqXG5cdCAqIEEgYmluZGluZyBpcyBhbiBvYnNlcnZhYmxlIHRoYXQgY2FuIGhhdmUgbXVsdGlwbGVcblx0ICogZGlyZWN0aXZlcyBzdWJzY3JpYmluZyB0byBpdC5cblx0ICpcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIEJpbmRpbmcgKCkge1xuXHQgIHRoaXMuaWQgPSArK3VpZFxuXHQgIHRoaXMuc3VicyA9IFtdXG5cdH1cblxuXHR2YXIgcCA9IEJpbmRpbmcucHJvdG90eXBlXG5cblx0LyoqXG5cdCAqIEFkZCBhIGRpcmVjdGl2ZSBzdWJzY3JpYmVyLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RpcmVjdGl2ZX0gc3ViXG5cdCAqL1xuXG5cdHAuYWRkU3ViID0gZnVuY3Rpb24gKHN1Yikge1xuXHQgIHRoaXMuc3Vicy5wdXNoKHN1Yilcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYSBkaXJlY3RpdmUgc3Vic2NyaWJlci5cblx0ICpcblx0ICogQHBhcmFtIHtEaXJlY3RpdmV9IHN1YlxuXHQgKi9cblxuXHRwLnJlbW92ZVN1YiA9IGZ1bmN0aW9uIChzdWIpIHtcblx0ICBpZiAodGhpcy5zdWJzLmxlbmd0aCkge1xuXHQgICAgdmFyIGkgPSB0aGlzLnN1YnMuaW5kZXhPZihzdWIpXG5cdCAgICBpZiAoaSA+IC0xKSB0aGlzLnN1YnMuc3BsaWNlKGksIDEpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIE5vdGlmeSBhbGwgc3Vic2NyaWJlcnMgb2YgYSBuZXcgdmFsdWUuXG5cdCAqL1xuXG5cdHAubm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBpID0gdGhpcy5zdWJzLmxlbmd0aFxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIHRoaXMuc3Vic1tpXS51cGRhdGUoKVxuXHQgIH1cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gQmluZGluZ1xuXG4vKioqLyB9LFxuLyogNDggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgY29uZmlnID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSlcblx0dmFyIEJpbmRpbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ3KVxuXHR2YXIgYXJyYXlNZXRob2RzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1OSlcblx0dmFyIGFycmF5S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFycmF5TWV0aG9kcylcblx0X193ZWJwYWNrX3JlcXVpcmVfXyg2MClcblxuXHR2YXIgdWlkID0gMFxuXG5cdC8qKlxuXHQgKiBUeXBlIGVudW1zXG5cdCAqL1xuXG5cdHZhciBBUlJBWSAgPSAwXG5cdHZhciBPQkpFQ1QgPSAxXG5cblx0LyoqXG5cdCAqIEF1Z21lbnQgYW4gdGFyZ2V0IE9iamVjdCBvciBBcnJheSBieSBpbnRlcmNlcHRpbmdcblx0ICogdGhlIHByb3RvdHlwZSBjaGFpbiB1c2luZyBfX3Byb3RvX19cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IHRhcmdldFxuXHQgKiBAcGFyYW0ge09iamVjdH0gcHJvdG9cblx0ICovXG5cblx0ZnVuY3Rpb24gcHJvdG9BdWdtZW50ICh0YXJnZXQsIHNyYykge1xuXHQgIHRhcmdldC5fX3Byb3RvX18gPSBzcmNcblx0fVxuXG5cdC8qKlxuXHQgKiBBdWdtZW50IGFuIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgZGVmaW5pbmdcblx0ICogaGlkZGVuIHByb3BlcnRpZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSB0YXJnZXRcblx0ICogQHBhcmFtIHtPYmplY3R9IHByb3RvXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNvcHlBdWdtZW50ICh0YXJnZXQsIHNyYywga2V5cykge1xuXHQgIHZhciBpID0ga2V5cy5sZW5ndGhcblx0ICB2YXIga2V5XG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAga2V5ID0ga2V5c1tpXVxuXHQgICAgXy5kZWZpbmUodGFyZ2V0LCBrZXksIHNyY1trZXldKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBPYnNlcnZlciBjbGFzcyB0aGF0IGFyZSBhdHRhY2hlZCB0byBlYWNoIG9ic2VydmVkXG5cdCAqIG9iamVjdC4gT25jZSBhdHRhY2hlZCwgdGhlIG9ic2VydmVyIGNvbnZlcnRzIHRhcmdldFxuXHQgKiBvYmplY3QncyBwcm9wZXJ0eSBrZXlzIGludG8gZ2V0dGVyL3NldHRlcnMgdGhhdFxuXHQgKiBjb2xsZWN0IGRlcGVuZGVuY2llcyBhbmQgZGlzcGF0Y2hlcyB1cGRhdGVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gdmFsdWVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHR5cGVcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIE9ic2VydmVyICh2YWx1ZSwgdHlwZSkge1xuXHQgIHRoaXMuaWQgPSArK3VpZFxuXHQgIHRoaXMudmFsdWUgPSB2YWx1ZVxuXHQgIHRoaXMuYWN0aXZlID0gdHJ1ZVxuXHQgIHRoaXMuYmluZGluZ3MgPSBbXVxuXHQgIF8uZGVmaW5lKHZhbHVlLCAnX19vYl9fJywgdGhpcylcblx0ICBpZiAodHlwZSA9PT0gQVJSQVkpIHtcblx0ICAgIHZhciBhdWdtZW50ID0gY29uZmlnLnByb3RvICYmIF8uaGFzUHJvdG9cblx0ICAgICAgPyBwcm90b0F1Z21lbnRcblx0ICAgICAgOiBjb3B5QXVnbWVudFxuXHQgICAgYXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpXG5cdCAgICB0aGlzLm9ic2VydmVBcnJheSh2YWx1ZSlcblx0ICB9IGVsc2UgaWYgKHR5cGUgPT09IE9CSkVDVCkge1xuXHQgICAgdGhpcy53YWxrKHZhbHVlKVxuXHQgIH1cblx0fVxuXG5cdE9ic2VydmVyLnRhcmdldCA9IG51bGxcblxuXHR2YXIgcCA9IE9ic2VydmVyLnByb3RvdHlwZVxuXG5cdC8qKlxuXHQgKiBBdHRlbXB0IHRvIGNyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZSBmb3IgYSB2YWx1ZSxcblx0ICogcmV0dXJucyB0aGUgbmV3IG9ic2VydmVyIGlmIHN1Y2Nlc3NmdWxseSBvYnNlcnZlZCxcblx0ICogb3IgdGhlIGV4aXN0aW5nIG9ic2VydmVyIGlmIHRoZSB2YWx1ZSBhbHJlYWR5IGhhcyBvbmUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcblx0ICogQHJldHVybiB7T2JzZXJ2ZXJ8dW5kZWZpbmVkfVxuXHQgKiBAc3RhdGljXG5cdCAqL1xuXG5cdE9ic2VydmVyLmNyZWF0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgIGlmIChcblx0ICAgIHZhbHVlICYmXG5cdCAgICB2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnX19vYl9fJykgJiZcblx0ICAgIHZhbHVlLl9fb2JfXyBpbnN0YW5jZW9mIE9ic2VydmVyXG5cdCAgKSB7XG5cdCAgICByZXR1cm4gdmFsdWUuX19vYl9fXG5cdCAgfSBlbHNlIGlmIChfLmlzQXJyYXkodmFsdWUpKSB7XG5cdCAgICByZXR1cm4gbmV3IE9ic2VydmVyKHZhbHVlLCBBUlJBWSlcblx0ICB9IGVsc2UgaWYgKFxuXHQgICAgXy5pc1BsYWluT2JqZWN0KHZhbHVlKSAmJlxuXHQgICAgIXZhbHVlLl9pc1Z1ZSAvLyBhdm9pZCBWdWUgaW5zdGFuY2Vcblx0ICApIHtcblx0ICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIodmFsdWUsIE9CSkVDVClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogV2FsayB0aHJvdWdoIGVhY2ggcHJvcGVydHkgYW5kIGNvbnZlcnQgdGhlbSBpbnRvXG5cdCAqIGdldHRlci9zZXR0ZXJzLiBUaGlzIG1ldGhvZCBzaG91bGQgb25seSBiZSBjYWxsZWQgd2hlblxuXHQgKiB2YWx1ZSB0eXBlIGlzIE9iamVjdC4gUHJvcGVydGllcyBwcmVmaXhlZCB3aXRoIGAkYCBvciBgX2Bcblx0ICogYW5kIGFjY2Vzc29yIHByb3BlcnRpZXMgYXJlIGlnbm9yZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcblx0ICovXG5cblx0cC53YWxrID0gZnVuY3Rpb24gKG9iaikge1xuXHQgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKVxuXHQgIHZhciBpID0ga2V5cy5sZW5ndGhcblx0ICB2YXIga2V5LCBwcmVmaXhcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICBrZXkgPSBrZXlzW2ldXG5cdCAgICBwcmVmaXggPSBrZXkuY2hhckNvZGVBdCgwKVxuXHQgICAgaWYgKHByZWZpeCAhPT0gMHgyNCAmJiBwcmVmaXggIT09IDB4NUYpIHsgLy8gc2tpcCAkIG9yIF9cblx0ICAgICAgdGhpcy5jb252ZXJ0KGtleSwgb2JqW2tleV0pXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFRyeSB0byBjYXJldGUgYW4gb2JzZXJ2ZXIgZm9yIGEgY2hpbGQgdmFsdWUsXG5cdCAqIGFuZCBpZiB2YWx1ZSBpcyBhcnJheSwgbGluayBiaW5kaW5nIHRvIHRoZSBhcnJheS5cblx0ICpcblx0ICogQHBhcmFtIHsqfSB2YWxcblx0ICogQHJldHVybiB7QmluZGluZ3x1bmRlZmluZWR9XG5cdCAqL1xuXG5cdHAub2JzZXJ2ZSA9IGZ1bmN0aW9uICh2YWwpIHtcblx0ICByZXR1cm4gT2JzZXJ2ZXIuY3JlYXRlKHZhbClcblx0fVxuXG5cdC8qKlxuXHQgKiBPYnNlcnZlIGEgbGlzdCBvZiBBcnJheSBpdGVtcy5cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheX0gaXRlbXNcblx0ICovXG5cblx0cC5vYnNlcnZlQXJyYXkgPSBmdW5jdGlvbiAoaXRlbXMpIHtcblx0ICB2YXIgaSA9IGl0ZW1zLmxlbmd0aFxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIHRoaXMub2JzZXJ2ZShpdGVtc1tpXSlcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydCBhIHByb3BlcnR5IGludG8gZ2V0dGVyL3NldHRlciBzbyB3ZSBjYW4gZW1pdFxuXHQgKiB0aGUgZXZlbnRzIHdoZW4gdGhlIHByb3BlcnR5IGlzIGFjY2Vzc2VkL2NoYW5nZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICogQHBhcmFtIHsqfSB2YWxcblx0ICovXG5cblx0cC5jb252ZXJ0ID0gZnVuY3Rpb24gKGtleSwgdmFsKSB7XG5cdCAgdmFyIG9iID0gdGhpc1xuXHQgIHZhciBjaGlsZE9iID0gb2Iub2JzZXJ2ZSh2YWwpXG5cdCAgdmFyIGJpbmRpbmcgPSBuZXcgQmluZGluZygpXG5cdCAgaWYgKGNoaWxkT2IpIHtcblx0ICAgIGNoaWxkT2IuYmluZGluZ3MucHVzaChiaW5kaW5nKVxuXHQgIH1cblx0ICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2IudmFsdWUsIGtleSwge1xuXHQgICAgZW51bWVyYWJsZTogdHJ1ZSxcblx0ICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0ICAgIGdldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAvLyBPYnNlcnZlci50YXJnZXQgaXMgYSB3YXRjaGVyIHdob3NlIGdldHRlciBpc1xuXHQgICAgICAvLyBjdXJyZW50bHkgYmVpbmcgZXZhbHVhdGVkLlxuXHQgICAgICBpZiAob2IuYWN0aXZlICYmIE9ic2VydmVyLnRhcmdldCkge1xuXHQgICAgICAgIE9ic2VydmVyLnRhcmdldC5hZGREZXAoYmluZGluZylcblx0ICAgICAgfVxuXHQgICAgICByZXR1cm4gdmFsXG5cdCAgICB9LFxuXHQgICAgc2V0OiBmdW5jdGlvbiAobmV3VmFsKSB7XG5cdCAgICAgIGlmIChuZXdWYWwgPT09IHZhbCkgcmV0dXJuXG5cdCAgICAgIC8vIHJlbW92ZSBiaW5kaW5nIGZyb20gb2xkIHZhbHVlXG5cdCAgICAgIHZhciBvbGRDaGlsZE9iID0gdmFsICYmIHZhbC5fX29iX19cblx0ICAgICAgaWYgKG9sZENoaWxkT2IpIHtcblx0ICAgICAgICB2YXIgb2xkQmluZGluZ3MgPSBvbGRDaGlsZE9iLmJpbmRpbmdzXG5cdCAgICAgICAgb2xkQmluZGluZ3Muc3BsaWNlKG9sZEJpbmRpbmdzLmluZGV4T2YoYmluZGluZykpXG5cdCAgICAgIH1cblx0ICAgICAgdmFsID0gbmV3VmFsXG5cdCAgICAgIC8vIGFkZCBiaW5kaW5nIHRvIG5ldyB2YWx1ZVxuXHQgICAgICB2YXIgbmV3Q2hpbGRPYiA9IG9iLm9ic2VydmUobmV3VmFsKVxuXHQgICAgICBpZiAobmV3Q2hpbGRPYikge1xuXHQgICAgICAgIG5ld0NoaWxkT2IuYmluZGluZ3MucHVzaChiaW5kaW5nKVxuXHQgICAgICB9XG5cdCAgICAgIGJpbmRpbmcubm90aWZ5KClcblx0ICAgIH1cblx0ICB9KVxuXHR9XG5cblx0LyoqXG5cdCAqIE5vdGlmeSBjaGFuZ2Ugb24gYWxsIHNlbGYgYmluZGluZ3Mgb24gYW4gb2JzZXJ2ZXIuXG5cdCAqIFRoaXMgaXMgY2FsbGVkIHdoZW4gYSBtdXRhYmxlIHZhbHVlIG11dGF0ZXMuIGUuZy5cblx0ICogd2hlbiBhbiBBcnJheSdzIG11dGF0aW5nIG1ldGhvZHMgYXJlIGNhbGxlZCwgb3IgYW5cblx0ICogT2JqZWN0J3MgJGFkZC8kZGVsZXRlIGFyZSBjYWxsZWQuXG5cdCAqL1xuXG5cdHAubm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBiaW5kaW5ncyA9IHRoaXMuYmluZGluZ3Ncblx0ICBmb3IgKHZhciBpID0gMCwgbCA9IGJpbmRpbmdzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgYmluZGluZ3NbaV0ubm90aWZ5KClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQWRkIGFuIG93bmVyIHZtLCBzbyB0aGF0IHdoZW4gJGFkZC8kZGVsZXRlIG11dGF0aW9uc1xuXHQgKiBoYXBwZW4gd2UgY2FuIG5vdGlmeSBvd25lciB2bXMgdG8gcHJveHkgdGhlIGtleXMgYW5kXG5cdCAqIGRpZ2VzdCB0aGUgd2F0Y2hlcnMuIFRoaXMgaXMgb25seSBjYWxsZWQgd2hlbiB0aGUgb2JqZWN0XG5cdCAqIGlzIG9ic2VydmVkIGFzIGFuIGluc3RhbmNlJ3Mgcm9vdCAkZGF0YS5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqL1xuXG5cdHAuYWRkVm0gPSBmdW5jdGlvbiAodm0pIHtcblx0ICAodGhpcy52bXMgPSB0aGlzLnZtcyB8fCBbXSkucHVzaCh2bSlcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYW4gb3duZXIgdm0uIFRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIG9iamVjdCBpc1xuXHQgKiBzd2FwcGVkIG91dCBhcyBhbiBpbnN0YW5jZSdzICRkYXRhIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqL1xuXG5cdHAucmVtb3ZlVm0gPSBmdW5jdGlvbiAodm0pIHtcblx0ICB0aGlzLnZtcy5zcGxpY2UodGhpcy52bXMuaW5kZXhPZih2bSksIDEpXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IE9ic2VydmVyXG5cbi8qKiovIH0sXG4vKiA0OSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cblx0LyoqXG5cdCAqIFRoZSBCYXRjaGVyIG1haW50YWlucyBhIGpvYiBxdWV1ZSB0byBiZSBydW5cblx0ICogYXN5bmMgb24gdGhlIG5leHQgZXZlbnQgbG9vcC5cblx0ICovXG5cblx0ZnVuY3Rpb24gQmF0Y2hlciAoKSB7XG5cdCAgdGhpcy5yZXNldCgpXG5cdH1cblxuXHR2YXIgcCA9IEJhdGNoZXIucHJvdG90eXBlXG5cblx0LyoqXG5cdCAqIFB1c2ggYSBqb2IgaW50byB0aGUgam9iIHF1ZXVlLlxuXHQgKiBKb2JzIHdpdGggZHVwbGljYXRlIElEcyB3aWxsIGJlIHNraXBwZWQsIGhvd2V2ZXIgd2UgY2FuXG5cdCAqIHVzZSB0aGUgYG92ZXJyaWRlYCBvcHRpb24gdG8gb3ZlcnJpZGUgZXhpc3Rpbmcgam9icy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IGpvYlxuXHQgKiAgIHByb3BlcnRpZXM6XG5cdCAqICAgLSB7U3RyaW5nfE51bWJlcn0gaWRcblx0ICogICAtIHtCb29sZWFufSAgICAgICBvdmVycmlkZVxuXHQgKiAgIC0ge0Z1bmN0aW9ufSAgICAgIHJ1blxuXHQgKi9cblxuXHRwLnB1c2ggPSBmdW5jdGlvbiAoam9iKSB7XG5cdCAgaWYgKCFqb2IuaWQgfHwgIXRoaXMuaGFzW2pvYi5pZF0pIHtcblx0ICAgIHRoaXMucXVldWUucHVzaChqb2IpXG5cdCAgICB0aGlzLmhhc1tqb2IuaWRdID0gam9iXG5cdCAgICBpZiAoIXRoaXMud2FpdGluZykge1xuXHQgICAgICB0aGlzLndhaXRpbmcgPSB0cnVlXG5cdCAgICAgIF8ubmV4dFRpY2sodGhpcy5mbHVzaCwgdGhpcylcblx0ICAgIH1cblx0ICB9IGVsc2UgaWYgKGpvYi5vdmVycmlkZSkge1xuXHQgICAgdmFyIG9sZEpvYiA9IHRoaXMuaGFzW2pvYi5pZF1cblx0ICAgIG9sZEpvYi5jYW5jZWxsZWQgPSB0cnVlXG5cdCAgICB0aGlzLnF1ZXVlLnB1c2goam9iKVxuXHQgICAgdGhpcy5oYXNbam9iLmlkXSA9IGpvYlxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGbHVzaCB0aGUgcXVldWUgYW5kIHJ1biB0aGUgam9icy5cblx0ICogV2lsbCBjYWxsIGEgcHJlRmx1c2ggaG9vayBpZiBoYXMgb25lLlxuXHQgKi9cblxuXHRwLmZsdXNoID0gZnVuY3Rpb24gKCkge1xuXHQgIC8vIGRvIG5vdCBjYWNoZSBsZW5ndGggYmVjYXVzZSBtb3JlIGpvYnMgbWlnaHQgYmUgcHVzaGVkXG5cdCAgLy8gYXMgd2UgcnVuIGV4aXN0aW5nIGpvYnNcblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVldWUubGVuZ3RoOyBpKyspIHtcblx0ICAgIHZhciBqb2IgPSB0aGlzLnF1ZXVlW2ldXG5cdCAgICBpZiAoIWpvYi5jYW5jZWxsZWQpIHtcblx0ICAgICAgam9iLnJ1bigpXG5cdCAgICB9XG5cdCAgfVxuXHQgIHRoaXMucmVzZXQoKVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlc2V0IHRoZSBiYXRjaGVyJ3Mgc3RhdGUuXG5cdCAqL1xuXG5cdHAucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgdGhpcy5oYXMgPSB7fVxuXHQgIHRoaXMucXVldWUgPSBbXVxuXHQgIHRoaXMud2FpdGluZyA9IGZhbHNlXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IEJhdGNoZXJcblxuLyoqKi8gfSxcbi8qIDUwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgQ2FjaGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUyKVxuXHR2YXIgdGVtcGxhdGVDYWNoZSA9IG5ldyBDYWNoZSgxMDApXG5cblx0LyoqXG5cdCAqIFRlc3QgZm9yIHRoZSBwcmVzZW5jZSBvZiB0aGUgU2FmYXJpIHRlbXBsYXRlIGNsb25pbmcgYnVnXG5cdCAqIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzc3NTVcblx0ICovXG5cblx0dmFyIGhhc0Jyb2tlblRlbXBsYXRlID0gKGZ1bmN0aW9uICgpIHtcblx0ICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdCAgYS5pbm5lckhUTUwgPSAnPHRlbXBsYXRlPjE8L3RlbXBsYXRlPidcblx0ICByZXR1cm4gIWEuY2xvbmVOb2RlKHRydWUpLmZpcnN0Q2hpbGQuaW5uZXJIVE1MXG5cdH0pKClcblxuXHR2YXIgbWFwID0ge1xuXHQgIF9kZWZhdWx0IDogWzAsICcnLCAnJ10sXG5cdCAgbGVnZW5kICAgOiBbMSwgJzxmaWVsZHNldD4nLCAnPC9maWVsZHNldD4nXSxcblx0ICB0ciAgICAgICA6IFsyLCAnPHRhYmxlPjx0Ym9keT4nLCAnPC90Ym9keT48L3RhYmxlPiddLFxuXHQgIGNvbCAgICAgIDogW1xuXHQgICAgMixcblx0ICAgICc8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPicsXG5cdCAgICAnPC9jb2xncm91cD48L3RhYmxlPidcblx0ICBdXG5cdH1cblxuXHRtYXAudGQgPVxuXHRtYXAudGggPSBbXG5cdCAgMyxcblx0ICAnPHRhYmxlPjx0Ym9keT48dHI+Jyxcblx0ICAnPC90cj48L3Rib2R5PjwvdGFibGU+J1xuXHRdXG5cblx0bWFwLm9wdGlvbiA9XG5cdG1hcC5vcHRncm91cCA9IFtcblx0ICAxLFxuXHQgICc8c2VsZWN0IG11bHRpcGxlPVwibXVsdGlwbGVcIj4nLFxuXHQgICc8L3NlbGVjdD4nXG5cdF1cblxuXHRtYXAudGhlYWQgPVxuXHRtYXAudGJvZHkgPVxuXHRtYXAuY29sZ3JvdXAgPVxuXHRtYXAuY2FwdGlvbiA9XG5cdG1hcC50Zm9vdCA9IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddXG5cblx0bWFwLmcgPVxuXHRtYXAuZGVmcyA9XG5cdG1hcC5zeW1ib2wgPVxuXHRtYXAudXNlID1cblx0bWFwLmltYWdlID1cblx0bWFwLnRleHQgPVxuXHRtYXAuY2lyY2xlID1cblx0bWFwLmVsbGlwc2UgPVxuXHRtYXAubGluZSA9XG5cdG1hcC5wYXRoID1cblx0bWFwLnBvbHlnb24gPVxuXHRtYXAucG9seWxpbmUgPVxuXHRtYXAucmVjdCA9IFtcblx0ICAxLFxuXHQgICc8c3ZnICcgK1xuXHQgICAgJ3htbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiAnICtcblx0ICAgICd4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiAnICtcblx0ICAgICd4bWxuczpldj1cImh0dHA6Ly93d3cudzMub3JnLzIwMDEveG1sLWV2ZW50c1wiJyArXG5cdCAgICAndmVyc2lvbj1cIjEuMVwiPicsXG5cdCAgJzwvc3ZnPidcblx0XVxuXG5cdHZhciBUQUdfUkUgPSAvPChbXFx3Ol0rKS9cblxuXHQvKipcblx0ICogQ29udmVydCBhIHN0cmluZyB0ZW1wbGF0ZSB0byBhIERvY3VtZW50RnJhZ21lbnQuXG5cdCAqIERldGVybWluZXMgY29ycmVjdCB3cmFwcGluZyBieSB0YWcgdHlwZXMuIFdyYXBwaW5nXG5cdCAqIHN0cmF0ZWd5IGZvdW5kIGluIGpRdWVyeSAmIGNvbXBvbmVudC9kb21pZnkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZW1wbGF0ZVN0cmluZ1xuXHQgKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fVxuXHQgKi9cblxuXHRmdW5jdGlvbiBzdHJpbmdUb0ZyYWdtZW50ICh0ZW1wbGF0ZVN0cmluZykge1xuXHQgIC8vIHRyeSBhIGNhY2hlIGhpdCBmaXJzdFxuXHQgIHZhciBoaXQgPSB0ZW1wbGF0ZUNhY2hlLmdldCh0ZW1wbGF0ZVN0cmluZylcblx0ICBpZiAoaGl0KSB7XG5cdCAgICByZXR1cm4gaGl0XG5cdCAgfVxuXG5cdCAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0ICB2YXIgdGFnTWF0Y2ggPSBUQUdfUkUuZXhlYyh0ZW1wbGF0ZVN0cmluZylcblxuXHQgIGlmICghdGFnTWF0Y2gpIHtcblx0ICAgIC8vIHRleHQgb25seSwgcmV0dXJuIGEgc2luZ2xlIHRleHQgbm9kZS5cblx0ICAgIGZyYWcuYXBwZW5kQ2hpbGQoXG5cdCAgICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRlbXBsYXRlU3RyaW5nKVxuXHQgICAgKVxuXHQgIH0gZWxzZSB7XG5cblx0ICAgIHZhciB0YWcgICAgPSB0YWdNYXRjaFsxXVxuXHQgICAgdmFyIHdyYXAgICA9IG1hcFt0YWddIHx8IG1hcC5fZGVmYXVsdFxuXHQgICAgdmFyIGRlcHRoICA9IHdyYXBbMF1cblx0ICAgIHZhciBwcmVmaXggPSB3cmFwWzFdXG5cdCAgICB2YXIgc3VmZml4ID0gd3JhcFsyXVxuXHQgICAgdmFyIG5vZGUgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cblx0ICAgIG5vZGUuaW5uZXJIVE1MID0gcHJlZml4ICsgdGVtcGxhdGVTdHJpbmcudHJpbSgpICsgc3VmZml4XG5cdCAgICB3aGlsZSAoZGVwdGgtLSkge1xuXHQgICAgICBub2RlID0gbm9kZS5sYXN0Q2hpbGRcblx0ICAgIH1cblxuXHQgICAgdmFyIGNoaWxkXG5cdCAgICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cdCAgICB3aGlsZSAoY2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQpIHtcblx0ICAgICAgZnJhZy5hcHBlbmRDaGlsZChjaGlsZClcblx0ICAgIH1cblx0ICB9XG5cblx0ICB0ZW1wbGF0ZUNhY2hlLnB1dCh0ZW1wbGF0ZVN0cmluZywgZnJhZylcblx0ICByZXR1cm4gZnJhZ1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnQgYSB0ZW1wbGF0ZSBub2RlIHRvIGEgRG9jdW1lbnRGcmFnbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtOb2RlfSBub2RlXG5cdCAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIG5vZGVUb0ZyYWdtZW50IChub2RlKSB7XG5cdCAgdmFyIHRhZyA9IG5vZGUudGFnTmFtZVxuXHQgIC8vIGlmIGl0cyBhIHRlbXBsYXRlIHRhZyBhbmQgdGhlIGJyb3dzZXIgc3VwcG9ydHMgaXQsXG5cdCAgLy8gaXRzIGNvbnRlbnQgaXMgYWxyZWFkeSBhIGRvY3VtZW50IGZyYWdtZW50LlxuXHQgIGlmIChcblx0ICAgIHRhZyA9PT0gJ1RFTVBMQVRFJyAmJlxuXHQgICAgbm9kZS5jb250ZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudFxuXHQgICkge1xuXHQgICAgcmV0dXJuIG5vZGUuY29udGVudFxuXHQgIH1cblx0ICByZXR1cm4gdGFnID09PSAnU0NSSVBUJ1xuXHQgICAgPyBzdHJpbmdUb0ZyYWdtZW50KG5vZGUudGV4dENvbnRlbnQpXG5cdCAgICA6IHN0cmluZ1RvRnJhZ21lbnQobm9kZS5pbm5lckhUTUwpXG5cdH1cblxuXHQvKipcblx0ICogRGVhbCB3aXRoIFNhZmFyaSBjbG9uaW5nIG5lc3RlZCA8dGVtcGxhdGU+IGJ1ZyBieVxuXHQgKiBtYW51YWxseSBjbG9uaW5nIGFsbCB0ZW1wbGF0ZSBpbnN0YW5jZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fSBub2RlXG5cdCAqIEByZXR1cm4ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH1cblx0ICovXG5cblx0ZXhwb3J0cy5jbG9uZSA9IGZ1bmN0aW9uIChub2RlKSB7XG5cdCAgdmFyIHJlcyA9IG5vZGUuY2xvbmVOb2RlKHRydWUpXG5cdCAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5cdCAgaWYgKGhhc0Jyb2tlblRlbXBsYXRlKSB7XG5cdCAgICB2YXIgdGVtcGxhdGVzID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKCd0ZW1wbGF0ZScpXG5cdCAgICBpZiAodGVtcGxhdGVzLmxlbmd0aCkge1xuXHQgICAgICB2YXIgY2xvbmVkID0gcmVzLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RlbXBsYXRlJylcblx0ICAgICAgdmFyIGkgPSBjbG9uZWQubGVuZ3RoXG5cdCAgICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgICBjbG9uZWRbaV0ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoXG5cdCAgICAgICAgICB0ZW1wbGF0ZXNbaV0uY2xvbmVOb2RlKHRydWUpLFxuXHQgICAgICAgICAgY2xvbmVkW2ldXG5cdCAgICAgICAgKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiByZXNcblx0fVxuXG5cdC8qKlxuXHQgKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSBvcHRpb24gYW5kIG5vcm1hbGl6ZXMgaXQgaW50byBhXG5cdCAqIGEgRG9jdW1lbnRGcmFnbWVudCB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgcGFydGlhbCBvciBhXG5cdCAqIGluc3RhbmNlIHRlbXBsYXRlLlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHRlbXBsYXRlXG5cdCAqICAgIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOlxuXHQgKiAgICAtIERvY3VtZW50RnJhZ21lbnQgb2JqZWN0XG5cdCAqICAgIC0gTm9kZSBvYmplY3Qgb2YgdHlwZSBUZW1wbGF0ZVxuXHQgKiAgICAtIGlkIHNlbGVjdG9yOiAnI3NvbWUtdGVtcGxhdGUtaWQnXG5cdCAqICAgIC0gdGVtcGxhdGUgc3RyaW5nOiAnPGRpdj48c3Bhbj57e21zZ319PC9zcGFuPjwvZGl2Pidcblx0ICogQHBhcmFtIHtCb29sZWFufSBjbG9uZVxuXHQgKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fHVuZGVmaW5lZH1cblx0ICovXG5cblx0ZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgY2xvbmUpIHtcblx0ICB2YXIgbm9kZSwgZnJhZ1xuXG5cdCAgLy8gaWYgdGhlIHRlbXBsYXRlIGlzIGFscmVhZHkgYSBkb2N1bWVudCBmcmFnbWVudCxcblx0ICAvLyBkbyBub3RoaW5nXG5cdCAgaWYgKHRlbXBsYXRlIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuXHQgICAgcmV0dXJuIGNsb25lXG5cdCAgICAgID8gdGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpXG5cdCAgICAgIDogdGVtcGxhdGVcblx0ICB9XG5cblx0ICBpZiAodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJykge1xuXHQgICAgLy8gaWQgc2VsZWN0b3Jcblx0ICAgIGlmICh0ZW1wbGF0ZS5jaGFyQXQoMCkgPT09ICcjJykge1xuXHQgICAgICAvLyBpZCBzZWxlY3RvciBjYW4gYmUgY2FjaGVkIHRvb1xuXHQgICAgICBmcmFnID0gdGVtcGxhdGVDYWNoZS5nZXQodGVtcGxhdGUpXG5cdCAgICAgIGlmICghZnJhZykge1xuXHQgICAgICAgIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZS5zbGljZSgxKSlcblx0ICAgICAgICBpZiAobm9kZSkge1xuXHQgICAgICAgICAgZnJhZyA9IG5vZGVUb0ZyYWdtZW50KG5vZGUpXG5cdCAgICAgICAgICAvLyBzYXZlIHNlbGVjdG9yIHRvIGNhY2hlXG5cdCAgICAgICAgICB0ZW1wbGF0ZUNhY2hlLnB1dCh0ZW1wbGF0ZSwgZnJhZylcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIG5vcm1hbCBzdHJpbmcgdGVtcGxhdGVcblx0ICAgICAgZnJhZyA9IHN0cmluZ1RvRnJhZ21lbnQodGVtcGxhdGUpXG5cdCAgICB9XG5cdCAgfSBlbHNlIGlmICh0ZW1wbGF0ZS5ub2RlVHlwZSkge1xuXHQgICAgLy8gYSBkaXJlY3Qgbm9kZVxuXHQgICAgZnJhZyA9IG5vZGVUb0ZyYWdtZW50KHRlbXBsYXRlKVxuXHQgIH1cblxuXHQgIHJldHVybiBmcmFnICYmIGNsb25lXG5cdCAgICA/IGV4cG9ydHMuY2xvbmUoZnJhZylcblx0ICAgIDogZnJhZ1xuXHR9XG5cbi8qKiovIH0sXG4vKiA1MSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBDYWNoZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTIpXG5cdHZhciBwYXRoQ2FjaGUgPSBuZXcgQ2FjaGUoMTAwMClcblx0dmFyIGlkZW50UkUgPSAvXlskX2EtekEtWl0rW1xcdyRdKiQvXG5cblx0LyoqXG5cdCAqIFBhdGgtcGFyc2luZyBhbGdvcml0aG0gc2Nvb3BlZCBmcm9tIFBvbHltZXIvb2JzZXJ2ZS1qc1xuXHQgKi9cblxuXHR2YXIgcGF0aFN0YXRlTWFjaGluZSA9IHtcblx0ICAnYmVmb3JlUGF0aCc6IHtcblx0ICAgICd3cyc6IFsnYmVmb3JlUGF0aCddLFxuXHQgICAgJ2lkZW50JzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuXHQgICAgJ1snOiBbJ2JlZm9yZUVsZW1lbnQnXSxcblx0ICAgICdlb2YnOiBbJ2FmdGVyUGF0aCddXG5cdCAgfSxcblxuXHQgICdpblBhdGgnOiB7XG5cdCAgICAnd3MnOiBbJ2luUGF0aCddLFxuXHQgICAgJy4nOiBbJ2JlZm9yZUlkZW50J10sXG5cdCAgICAnWyc6IFsnYmVmb3JlRWxlbWVudCddLFxuXHQgICAgJ2VvZic6IFsnYWZ0ZXJQYXRoJ11cblx0ICB9LFxuXG5cdCAgJ2JlZm9yZUlkZW50Jzoge1xuXHQgICAgJ3dzJzogWydiZWZvcmVJZGVudCddLFxuXHQgICAgJ2lkZW50JzogWydpbklkZW50JywgJ2FwcGVuZCddXG5cdCAgfSxcblxuXHQgICdpbklkZW50Jzoge1xuXHQgICAgJ2lkZW50JzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuXHQgICAgJzAnOiBbJ2luSWRlbnQnLCAnYXBwZW5kJ10sXG5cdCAgICAnbnVtYmVyJzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuXHQgICAgJ3dzJzogWydpblBhdGgnLCAncHVzaCddLFxuXHQgICAgJy4nOiBbJ2JlZm9yZUlkZW50JywgJ3B1c2gnXSxcblx0ICAgICdbJzogWydiZWZvcmVFbGVtZW50JywgJ3B1c2gnXSxcblx0ICAgICdlb2YnOiBbJ2FmdGVyUGF0aCcsICdwdXNoJ11cblx0ICB9LFxuXG5cdCAgJ2JlZm9yZUVsZW1lbnQnOiB7XG5cdCAgICAnd3MnOiBbJ2JlZm9yZUVsZW1lbnQnXSxcblx0ICAgICcwJzogWydhZnRlclplcm8nLCAnYXBwZW5kJ10sXG5cdCAgICAnbnVtYmVyJzogWydpbkluZGV4JywgJ2FwcGVuZCddLFxuXHQgICAgXCInXCI6IFsnaW5TaW5nbGVRdW90ZScsICdhcHBlbmQnLCAnJ10sXG5cdCAgICAnXCInOiBbJ2luRG91YmxlUXVvdGUnLCAnYXBwZW5kJywgJyddXG5cdCAgfSxcblxuXHQgICdhZnRlclplcm8nOiB7XG5cdCAgICAnd3MnOiBbJ2FmdGVyRWxlbWVudCcsICdwdXNoJ10sXG5cdCAgICAnXSc6IFsnaW5QYXRoJywgJ3B1c2gnXVxuXHQgIH0sXG5cblx0ICAnaW5JbmRleCc6IHtcblx0ICAgICcwJzogWydpbkluZGV4JywgJ2FwcGVuZCddLFxuXHQgICAgJ251bWJlcic6IFsnaW5JbmRleCcsICdhcHBlbmQnXSxcblx0ICAgICd3cyc6IFsnYWZ0ZXJFbGVtZW50J10sXG5cdCAgICAnXSc6IFsnaW5QYXRoJywgJ3B1c2gnXVxuXHQgIH0sXG5cblx0ICAnaW5TaW5nbGVRdW90ZSc6IHtcblx0ICAgIFwiJ1wiOiBbJ2FmdGVyRWxlbWVudCddLFxuXHQgICAgJ2VvZic6ICdlcnJvcicsXG5cdCAgICAnZWxzZSc6IFsnaW5TaW5nbGVRdW90ZScsICdhcHBlbmQnXVxuXHQgIH0sXG5cblx0ICAnaW5Eb3VibGVRdW90ZSc6IHtcblx0ICAgICdcIic6IFsnYWZ0ZXJFbGVtZW50J10sXG5cdCAgICAnZW9mJzogJ2Vycm9yJyxcblx0ICAgICdlbHNlJzogWydpbkRvdWJsZVF1b3RlJywgJ2FwcGVuZCddXG5cdCAgfSxcblxuXHQgICdhZnRlckVsZW1lbnQnOiB7XG5cdCAgICAnd3MnOiBbJ2FmdGVyRWxlbWVudCddLFxuXHQgICAgJ10nOiBbJ2luUGF0aCcsICdwdXNoJ11cblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiBub29wICgpIHt9XG5cblx0LyoqXG5cdCAqIERldGVybWluZSB0aGUgdHlwZSBvZiBhIGNoYXJhY3RlciBpbiBhIGtleXBhdGguXG5cdCAqXG5cdCAqIEBwYXJhbSB7Q2hhcn0gY2hhclxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IHR5cGVcblx0ICovXG5cblx0ZnVuY3Rpb24gZ2V0UGF0aENoYXJUeXBlIChjaGFyKSB7XG5cdCAgaWYgKGNoYXIgPT09IHVuZGVmaW5lZCkge1xuXHQgICAgcmV0dXJuICdlb2YnXG5cdCAgfVxuXG5cdCAgdmFyIGNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMClcblxuXHQgIHN3aXRjaChjb2RlKSB7XG5cdCAgICBjYXNlIDB4NUI6IC8vIFtcblx0ICAgIGNhc2UgMHg1RDogLy8gXVxuXHQgICAgY2FzZSAweDJFOiAvLyAuXG5cdCAgICBjYXNlIDB4MjI6IC8vIFwiXG5cdCAgICBjYXNlIDB4Mjc6IC8vICdcblx0ICAgIGNhc2UgMHgzMDogLy8gMFxuXHQgICAgICByZXR1cm4gY2hhclxuXG5cdCAgICBjYXNlIDB4NUY6IC8vIF9cblx0ICAgIGNhc2UgMHgyNDogLy8gJFxuXHQgICAgICByZXR1cm4gJ2lkZW50J1xuXG5cdCAgICBjYXNlIDB4MjA6IC8vIFNwYWNlXG5cdCAgICBjYXNlIDB4MDk6IC8vIFRhYlxuXHQgICAgY2FzZSAweDBBOiAvLyBOZXdsaW5lXG5cdCAgICBjYXNlIDB4MEQ6IC8vIFJldHVyblxuXHQgICAgY2FzZSAweEEwOiAgLy8gTm8tYnJlYWsgc3BhY2Vcblx0ICAgIGNhc2UgMHhGRUZGOiAgLy8gQnl0ZSBPcmRlciBNYXJrXG5cdCAgICBjYXNlIDB4MjAyODogIC8vIExpbmUgU2VwYXJhdG9yXG5cdCAgICBjYXNlIDB4MjAyOTogIC8vIFBhcmFncmFwaCBTZXBhcmF0b3Jcblx0ICAgICAgcmV0dXJuICd3cydcblx0ICB9XG5cblx0ICAvLyBhLXosIEEtWlxuXHQgIGlmICgoMHg2MSA8PSBjb2RlICYmIGNvZGUgPD0gMHg3QSkgfHxcblx0ICAgICAgKDB4NDEgPD0gY29kZSAmJiBjb2RlIDw9IDB4NUEpKSB7XG5cdCAgICByZXR1cm4gJ2lkZW50J1xuXHQgIH1cblxuXHQgIC8vIDEtOVxuXHQgIGlmICgweDMxIDw9IGNvZGUgJiYgY29kZSA8PSAweDM5KSB7XG5cdCAgICByZXR1cm4gJ251bWJlcidcblx0ICB9XG5cblx0ICByZXR1cm4gJ2Vsc2UnXG5cdH1cblxuXHQvKipcblx0ICogUGFyc2UgYSBzdHJpbmcgcGF0aCBpbnRvIGFuIGFycmF5IG9mIHNlZ21lbnRzXG5cdCAqIFRvZG8gaW1wbGVtZW50IGNhY2hlXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG5cdCAqIEByZXR1cm4ge0FycmF5fHVuZGVmaW5lZH1cblx0ICovXG5cblx0ZnVuY3Rpb24gcGFyc2VQYXRoIChwYXRoKSB7XG5cdCAgdmFyIGtleXMgPSBbXVxuXHQgIHZhciBpbmRleCA9IC0xXG5cdCAgdmFyIG1vZGUgPSAnYmVmb3JlUGF0aCdcblx0ICB2YXIgYywgbmV3Q2hhciwga2V5LCB0eXBlLCB0cmFuc2l0aW9uLCBhY3Rpb24sIHR5cGVNYXBcblxuXHQgIHZhciBhY3Rpb25zID0ge1xuXHQgICAgcHVzaDogZnVuY3Rpb24oKSB7XG5cdCAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgIHJldHVyblxuXHQgICAgICB9XG5cdCAgICAgIGtleXMucHVzaChrZXkpXG5cdCAgICAgIGtleSA9IHVuZGVmaW5lZFxuXHQgICAgfSxcblx0ICAgIGFwcGVuZDogZnVuY3Rpb24oKSB7XG5cdCAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgIGtleSA9IG5ld0NoYXJcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBrZXkgKz0gbmV3Q2hhclxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXG5cdCAgZnVuY3Rpb24gbWF5YmVVbmVzY2FwZVF1b3RlICgpIHtcblx0ICAgIHZhciBuZXh0Q2hhciA9IHBhdGhbaW5kZXggKyAxXVxuXHQgICAgaWYgKChtb2RlID09PSAnaW5TaW5nbGVRdW90ZScgJiYgbmV4dENoYXIgPT09IFwiJ1wiKSB8fFxuXHQgICAgICAgIChtb2RlID09PSAnaW5Eb3VibGVRdW90ZScgJiYgbmV4dENoYXIgPT09ICdcIicpKSB7XG5cdCAgICAgIGluZGV4Kytcblx0ICAgICAgbmV3Q2hhciA9IG5leHRDaGFyXG5cdCAgICAgIGFjdGlvbnMuYXBwZW5kKClcblx0ICAgICAgcmV0dXJuIHRydWVcblx0ICAgIH1cblx0ICB9XG5cblx0ICB3aGlsZSAobW9kZSkge1xuXHQgICAgaW5kZXgrK1xuXHQgICAgYyA9IHBhdGhbaW5kZXhdXG5cblx0ICAgIGlmIChjID09PSAnXFxcXCcgJiYgbWF5YmVVbmVzY2FwZVF1b3RlKCkpIHtcblx0ICAgICAgY29udGludWVcblx0ICAgIH1cblxuXHQgICAgdHlwZSA9IGdldFBhdGhDaGFyVHlwZShjKVxuXHQgICAgdHlwZU1hcCA9IHBhdGhTdGF0ZU1hY2hpbmVbbW9kZV1cblx0ICAgIHRyYW5zaXRpb24gPSB0eXBlTWFwW3R5cGVdIHx8IHR5cGVNYXBbJ2Vsc2UnXSB8fCAnZXJyb3InXG5cblx0ICAgIGlmICh0cmFuc2l0aW9uID09PSAnZXJyb3InKSB7XG5cdCAgICAgIHJldHVybiAvLyBwYXJzZSBlcnJvclxuXHQgICAgfVxuXG5cdCAgICBtb2RlID0gdHJhbnNpdGlvblswXVxuXHQgICAgYWN0aW9uID0gYWN0aW9uc1t0cmFuc2l0aW9uWzFdXSB8fCBub29wXG5cdCAgICBuZXdDaGFyID0gdHJhbnNpdGlvblsyXSA9PT0gdW5kZWZpbmVkXG5cdCAgICAgID8gY1xuXHQgICAgICA6IHRyYW5zaXRpb25bMl1cblx0ICAgIGFjdGlvbigpXG5cblx0ICAgIGlmIChtb2RlID09PSAnYWZ0ZXJQYXRoJykge1xuXHQgICAgICByZXR1cm4ga2V5c1xuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGb3JtYXQgYSBhY2Nlc3NvciBzZWdtZW50IGJhc2VkIG9uIGl0cyB0eXBlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGZvcm1hdEFjY2Vzc29yKGtleSkge1xuXHQgIGlmIChpZGVudFJFLnRlc3Qoa2V5KSkgeyAvLyBpZGVudGlmaWVyXG5cdCAgICByZXR1cm4gJy4nICsga2V5XG5cdCAgfSBlbHNlIGlmICgra2V5ID09PSBrZXkgPj4+IDApIHsgLy8gYnJhY2tldCBpbmRleFxuXHQgICAgcmV0dXJuICdbJyArIGtleSArICddJztcblx0ICB9IGVsc2UgeyAvLyBicmFja2V0IHN0cmluZ1xuXHQgICAgcmV0dXJuICdbXCInICsga2V5LnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl0nO1xuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb21waWxlcyBhIGdldHRlciBmdW5jdGlvbiB3aXRoIGEgZml4ZWQgcGF0aC5cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheX0gcGF0aFxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn1cblx0ICovXG5cblx0ZXhwb3J0cy5jb21waWxlR2V0dGVyID0gZnVuY3Rpb24gKHBhdGgpIHtcblx0ICB2YXIgYm9keSA9XG5cdCAgICAndHJ5e3JldHVybiBvJyArXG5cdCAgICBwYXRoLm1hcChmb3JtYXRBY2Nlc3Nvcikuam9pbignJykgK1xuXHQgICAgJ31jYXRjaChlKXt9Oydcblx0ICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdvJywgYm9keSlcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHRlcm5hbCBwYXJzZSB0aGF0IGNoZWNrIGZvciBhIGNhY2hlIGhpdCBmaXJzdFxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuXHQgKiBAcmV0dXJuIHtBcnJheXx1bmRlZmluZWR9XG5cdCAqL1xuXG5cdGV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAocGF0aCkge1xuXHQgIHZhciBoaXQgPSBwYXRoQ2FjaGUuZ2V0KHBhdGgpXG5cdCAgaWYgKCFoaXQpIHtcblx0ICAgIGhpdCA9IHBhcnNlUGF0aChwYXRoKVxuXHQgICAgaWYgKGhpdCkge1xuXHQgICAgICBoaXQuZ2V0ID0gZXhwb3J0cy5jb21waWxlR2V0dGVyKGhpdClcblx0ICAgICAgcGF0aENhY2hlLnB1dChwYXRoLCBoaXQpXG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiBoaXRcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgZnJvbSBhbiBvYmplY3QgZnJvbSBhIHBhdGggc3RyaW5nXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcblx0ICovXG5cblx0ZXhwb3J0cy5nZXQgPSBmdW5jdGlvbiAob2JqLCBwYXRoKSB7XG5cdCAgcGF0aCA9IGV4cG9ydHMucGFyc2UocGF0aClcblx0ICBpZiAocGF0aCkge1xuXHQgICAgcmV0dXJuIHBhdGguZ2V0KG9iailcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogU2V0IG9uIGFuIG9iamVjdCBmcm9tIGEgcGF0aFxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqXG5cdCAqIEBwYXJhbSB7U3RyaW5nIHwgQXJyYXl9IHBhdGhcblx0ICogQHBhcmFtIHsqfSB2YWxcblx0ICovXG5cblx0ZXhwb3J0cy5zZXQgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCB2YWwpIHtcblx0ICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG5cdCAgICBwYXRoID0gZXhwb3J0cy5wYXJzZShwYXRoKVxuXHQgIH1cblx0ICBpZiAoIXBhdGggfHwgIV8uaXNPYmplY3Qob2JqKSkge1xuXHQgICAgcmV0dXJuIGZhbHNlXG5cdCAgfVxuXHQgIHZhciBsYXN0LCBrZXlcblx0ICBmb3IgKHZhciBpID0gMCwgbCA9IHBhdGgubGVuZ3RoIC0gMTsgaSA8IGw7IGkrKykge1xuXHQgICAgbGFzdCA9IG9ialxuXHQgICAga2V5ID0gcGF0aFtpXVxuXHQgICAgb2JqID0gb2JqW2tleV1cblx0ICAgIGlmICghXy5pc09iamVjdChvYmopKSB7XG5cdCAgICAgIG9iaiA9IHt9XG5cdCAgICAgIGxhc3QuJGFkZChrZXksIG9iailcblx0ICAgIH1cblx0ICB9XG5cdCAga2V5ID0gcGF0aFtpXVxuXHQgIGlmIChrZXkgaW4gb2JqKSB7XG5cdCAgICBvYmpba2V5XSA9IHZhbFxuXHQgIH0gZWxzZSB7XG5cdCAgICBvYmouJGFkZChrZXksIHZhbClcblx0ICB9XG5cdCAgcmV0dXJuIHRydWVcblx0fVxuXG4vKioqLyB9LFxuLyogNTIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qKlxuXHQgKiBBIGRvdWJseSBsaW5rZWQgbGlzdC1iYXNlZCBMZWFzdCBSZWNlbnRseSBVc2VkIChMUlUpXG5cdCAqIGNhY2hlLiBXaWxsIGtlZXAgbW9zdCByZWNlbnRseSB1c2VkIGl0ZW1zIHdoaWxlXG5cdCAqIGRpc2NhcmRpbmcgbGVhc3QgcmVjZW50bHkgdXNlZCBpdGVtcyB3aGVuIGl0cyBsaW1pdCBpc1xuXHQgKiByZWFjaGVkLiBUaGlzIGlzIGEgYmFyZS1ib25lIHZlcnNpb24gb2Zcblx0ICogUmFzbXVzIEFuZGVyc3NvbidzIGpzLWxydTpcblx0ICpcblx0ICogICBodHRwczovL2dpdGh1Yi5jb20vcnNtcy9qcy1scnVcblx0ICpcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGxpbWl0XG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblxuXHRmdW5jdGlvbiBDYWNoZSAobGltaXQpIHtcblx0ICB0aGlzLnNpemUgPSAwXG5cdCAgdGhpcy5saW1pdCA9IGxpbWl0XG5cdCAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gdW5kZWZpbmVkXG5cdCAgdGhpcy5fa2V5bWFwID0ge31cblx0fVxuXG5cdHZhciBwID0gQ2FjaGUucHJvdG90eXBlXG5cblx0LyoqXG5cdCAqIFB1dCA8dmFsdWU+IGludG8gdGhlIGNhY2hlIGFzc29jaWF0ZWQgd2l0aCA8a2V5Pi5cblx0ICogUmV0dXJucyB0aGUgZW50cnkgd2hpY2ggd2FzIHJlbW92ZWQgdG8gbWFrZSByb29tIGZvclxuXHQgKiB0aGUgbmV3IGVudHJ5LiBPdGhlcndpc2UgdW5kZWZpbmVkIGlzIHJldHVybmVkLlxuXHQgKiAoaS5lLiBpZiB0aGVyZSB3YXMgZW5vdWdoIHJvb20gYWxyZWFkeSkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxuXHQgKiBAcmV0dXJuIHtFbnRyeXx1bmRlZmluZWR9XG5cdCAqL1xuXG5cdHAucHV0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0ICB2YXIgZW50cnkgPSB7XG5cdCAgICBrZXk6a2V5LFxuXHQgICAgdmFsdWU6dmFsdWVcblx0ICB9XG5cdCAgdGhpcy5fa2V5bWFwW2tleV0gPSBlbnRyeVxuXHQgIGlmICh0aGlzLnRhaWwpIHtcblx0ICAgIHRoaXMudGFpbC5uZXdlciA9IGVudHJ5XG5cdCAgICBlbnRyeS5vbGRlciA9IHRoaXMudGFpbFxuXHQgIH0gZWxzZSB7XG5cdCAgICB0aGlzLmhlYWQgPSBlbnRyeVxuXHQgIH1cblx0ICB0aGlzLnRhaWwgPSBlbnRyeVxuXHQgIGlmICh0aGlzLnNpemUgPT09IHRoaXMubGltaXQpIHtcblx0ICAgIHJldHVybiB0aGlzLnNoaWZ0KClcblx0ICB9IGVsc2Uge1xuXHQgICAgdGhpcy5zaXplKytcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogUHVyZ2UgdGhlIGxlYXN0IHJlY2VudGx5IHVzZWQgKG9sZGVzdCkgZW50cnkgZnJvbSB0aGVcblx0ICogY2FjaGUuIFJldHVybnMgdGhlIHJlbW92ZWQgZW50cnkgb3IgdW5kZWZpbmVkIGlmIHRoZVxuXHQgKiBjYWNoZSB3YXMgZW1wdHkuXG5cdCAqL1xuXG5cdHAuc2hpZnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgdmFyIGVudHJ5ID0gdGhpcy5oZWFkXG5cdCAgaWYgKGVudHJ5KSB7XG5cdCAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQubmV3ZXJcblx0ICAgIHRoaXMuaGVhZC5vbGRlciA9IHVuZGVmaW5lZFxuXHQgICAgZW50cnkubmV3ZXIgPSBlbnRyeS5vbGRlciA9IHVuZGVmaW5lZFxuXHQgICAgdGhpcy5fa2V5bWFwW2VudHJ5LmtleV0gPSB1bmRlZmluZWRcblx0ICB9XG5cdCAgcmV0dXJuIGVudHJ5XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGFuZCByZWdpc3RlciByZWNlbnQgdXNlIG9mIDxrZXk+LiBSZXR1cm5zIHRoZSB2YWx1ZVxuXHQgKiBhc3NvY2lhdGVkIHdpdGggPGtleT4gb3IgdW5kZWZpbmVkIGlmIG5vdCBpbiBjYWNoZS5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IHJldHVybkVudHJ5XG5cdCAqIEByZXR1cm4ge0VudHJ5fCp9XG5cdCAqL1xuXG5cdHAuZ2V0ID0gZnVuY3Rpb24gKGtleSwgcmV0dXJuRW50cnkpIHtcblx0ICB2YXIgZW50cnkgPSB0aGlzLl9rZXltYXBba2V5XVxuXHQgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSByZXR1cm5cblx0ICBpZiAoZW50cnkgPT09IHRoaXMudGFpbCkge1xuXHQgICAgcmV0dXJuIHJldHVybkVudHJ5XG5cdCAgICAgID8gZW50cnlcblx0ICAgICAgOiBlbnRyeS52YWx1ZVxuXHQgIH1cblx0ICAvLyBIRUFELS0tLS0tLS0tLS0tLS1UQUlMXG5cdCAgLy8gICA8Lm9sZGVyICAgLm5ld2VyPlxuXHQgIC8vICA8LS0tIGFkZCBkaXJlY3Rpb24gLS1cblx0ICAvLyAgIEEgIEIgIEMgIDxEPiAgRVxuXHQgIGlmIChlbnRyeS5uZXdlcikge1xuXHQgICAgaWYgKGVudHJ5ID09PSB0aGlzLmhlYWQpIHtcblx0ICAgICAgdGhpcy5oZWFkID0gZW50cnkubmV3ZXJcblx0ICAgIH1cblx0ICAgIGVudHJ5Lm5ld2VyLm9sZGVyID0gZW50cnkub2xkZXIgLy8gQyA8LS0gRS5cblx0ICB9XG5cdCAgaWYgKGVudHJ5Lm9sZGVyKSB7XG5cdCAgICBlbnRyeS5vbGRlci5uZXdlciA9IGVudHJ5Lm5ld2VyIC8vIEMuIC0tPiBFXG5cdCAgfVxuXHQgIGVudHJ5Lm5ld2VyID0gdW5kZWZpbmVkIC8vIEQgLS14XG5cdCAgZW50cnkub2xkZXIgPSB0aGlzLnRhaWwgLy8gRC4gLS0+IEVcblx0ICBpZiAodGhpcy50YWlsKSB7XG5cdCAgICB0aGlzLnRhaWwubmV3ZXIgPSBlbnRyeSAvLyBFLiA8LS0gRFxuXHQgIH1cblx0ICB0aGlzLnRhaWwgPSBlbnRyeVxuXHQgIHJldHVybiByZXR1cm5FbnRyeVxuXHQgICAgPyBlbnRyeVxuXHQgICAgOiBlbnRyeS52YWx1ZVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBDYWNoZVxuXG4vKioqLyB9LFxuLyogNTMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgdHJhbnNEdXJhdGlvblByb3AgPSBfLnRyYW5zaXRpb25Qcm9wICsgJ0R1cmF0aW9uJ1xuXHR2YXIgYW5pbUR1cmF0aW9uUHJvcCA9IF8uYW5pbWF0aW9uUHJvcCArICdEdXJhdGlvbidcblxuXHR2YXIgcXVldWUgPSBbXVxuXHR2YXIgcXVldWVkID0gZmFsc2VcblxuXHQvKipcblx0ICogUHVzaCBhIGpvYiBpbnRvIHRoZSB0cmFuc2l0aW9uIHF1ZXVlLCB3aGljaCBpcyB0byBiZVxuXHQgKiBleGVjdXRlZCBvbiBuZXh0IGZyYW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsICAgIC0gdGFyZ2V0IGVsZW1lbnRcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpciAgICAtIDE6IGVudGVyLCAtMTogbGVhdmVcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gb3AgICAtIHRoZSBhY3R1YWwgZG9tIG9wZXJhdGlvblxuXHQgKiBAcGFyYW0ge1N0cmluZ30gY2xzICAgIC0gdGhlIGNsYXNzTmFtZSB0byByZW1vdmUgd2hlbiB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24gaXMgZG9uZS5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSAtIHVzZXIgc3VwcGxpZWQgY2FsbGJhY2suXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHB1c2ggKGVsLCBkaXIsIG9wLCBjbHMsIGNiKSB7XG5cdCAgcXVldWUucHVzaCh7XG5cdCAgICBlbCAgOiBlbCxcblx0ICAgIGRpciA6IGRpcixcblx0ICAgIGNiICA6IGNiLFxuXHQgICAgY2xzIDogY2xzLFxuXHQgICAgb3AgIDogb3Bcblx0ICB9KVxuXHQgIGlmICghcXVldWVkKSB7XG5cdCAgICBxdWV1ZWQgPSB0cnVlXG5cdCAgICBfLm5leHRUaWNrKGZsdXNoKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGbHVzaCB0aGUgcXVldWUsIGFuZCBkbyBvbmUgZm9yY2VkIHJlZmxvdyBiZWZvcmVcblx0ICogdHJpZ2dlcmluZyB0cmFuc2l0aW9ucy5cblx0ICovXG5cblx0ZnVuY3Rpb24gZmx1c2ggKCkge1xuXHQgIC8qIGpzaGludCB1bnVzZWQ6IGZhbHNlICovXG5cdCAgdmFyIGYgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0XG5cdCAgcXVldWUuZm9yRWFjaChydW4pXG5cdCAgcXVldWUgPSBbXVxuXHQgIHF1ZXVlZCA9IGZhbHNlXG5cdH1cblxuXHQvKipcblx0ICogUnVuIGEgdHJhbnNpdGlvbiBqb2IuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBqb2Jcblx0ICovXG5cblx0ZnVuY3Rpb24gcnVuIChqb2IpIHtcblxuXHQgIHZhciBlbCA9IGpvYi5lbFxuXHQgIHZhciBjbGFzc0xpc3QgPSBlbC5jbGFzc0xpc3Rcblx0ICB2YXIgZGF0YSA9IGVsLl9fdl90cmFuc1xuXHQgIHZhciBjbHMgPSBqb2IuY2xzXG5cdCAgdmFyIGNiID0gam9iLmNiXG5cdCAgdmFyIG9wID0gam9iLm9wXG5cdCAgdmFyIHRyYW5zaXRpb25UeXBlID0gZ2V0VHJhbnNpdGlvblR5cGUoZWwsIGRhdGEsIGNscylcblxuXHQgIGlmIChqb2IuZGlyID4gMCkgeyAvLyBFTlRFUlxuXHQgICAgaWYgKHRyYW5zaXRpb25UeXBlID09PSAxKSB7XG5cdCAgICAgIC8vIHRyaWdnZXIgdHJhbnNpdGlvbiBieSByZW1vdmluZyBlbnRlciBjbGFzc1xuXHQgICAgICBjbGFzc0xpc3QucmVtb3ZlKGNscylcblx0ICAgICAgLy8gb25seSBuZWVkIHRvIGxpc3RlbiBmb3IgdHJhbnNpdGlvbmVuZCBpZiB0aGVyZSdzXG5cdCAgICAgIC8vIGEgdXNlciBjYWxsYmFja1xuXHQgICAgICBpZiAoY2IpIHNldHVwVHJhbnNpdGlvbkNiKF8udHJhbnNpdGlvbkVuZEV2ZW50KVxuXHQgICAgfSBlbHNlIGlmICh0cmFuc2l0aW9uVHlwZSA9PT0gMikge1xuXHQgICAgICAvLyBhbmltYXRpb25zIGFyZSB0cmlnZ2VyZWQgd2hlbiBjbGFzcyBpcyBhZGRlZFxuXHQgICAgICAvLyBzbyB3ZSBqdXN0IGxpc3RlbiBmb3IgYW5pbWF0aW9uZW5kIHRvIHJlbW92ZSBpdC5cblx0ICAgICAgc2V0dXBUcmFuc2l0aW9uQ2IoXy5hbmltYXRpb25FbmRFdmVudCwgZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoY2xzKVxuXHQgICAgICB9KVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gbm8gdHJhbnNpdGlvbiBhcHBsaWNhYmxlXG5cdCAgICAgIGNsYXNzTGlzdC5yZW1vdmUoY2xzKVxuXHQgICAgICBpZiAoY2IpIGNiKClcblx0ICAgIH1cblx0ICB9IGVsc2UgeyAvLyBMRUFWRVxuXHQgICAgaWYgKHRyYW5zaXRpb25UeXBlKSB7XG5cdCAgICAgIC8vIGxlYXZlIHRyYW5zaXRpb25zL2FuaW1hdGlvbnMgYXJlIGJvdGggdHJpZ2dlcmVkXG5cdCAgICAgIC8vIGJ5IGFkZGluZyB0aGUgY2xhc3MsIGp1c3QgcmVtb3ZlIGl0IG9uIGVuZCBldmVudC5cblx0ICAgICAgdmFyIGV2ZW50ID0gdHJhbnNpdGlvblR5cGUgPT09IDFcblx0ICAgICAgICA/IF8udHJhbnNpdGlvbkVuZEV2ZW50XG5cdCAgICAgICAgOiBfLmFuaW1hdGlvbkVuZEV2ZW50XG5cdCAgICAgIHNldHVwVHJhbnNpdGlvbkNiKGV2ZW50LCBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgb3AoKVxuXHQgICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoY2xzKVxuXHQgICAgICB9KVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgb3AoKVxuXHQgICAgICBjbGFzc0xpc3QucmVtb3ZlKGNscylcblx0ICAgICAgaWYgKGNiKSBjYigpXG5cdCAgICB9XG5cdCAgfVxuXG5cdCAgLyoqXG5cdCAgICogU2V0IHVwIGEgdHJhbnNpdGlvbiBlbmQgY2FsbGJhY2ssIHN0b3JlIHRoZSBjYWxsYmFja1xuXHQgICAqIG9uIHRoZSBlbGVtZW50J3MgX192X3RyYW5zIGRhdGEgb2JqZWN0LCBzbyB3ZSBjYW5cblx0ICAgKiBjbGVhbiBpdCB1cCBpZiBhbm90aGVyIHRyYW5zaXRpb24gaXMgdHJpZ2dlcmVkIGJlZm9yZVxuXHQgICAqIHRoZSBjYWxsYmFjayBpcyBmaXJlZC5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjbGVhbnVwRm5dXG5cdCAgICovXG5cblx0ICBmdW5jdGlvbiBzZXR1cFRyYW5zaXRpb25DYiAoZXZlbnQsIGNsZWFudXBGbikge1xuXHQgICAgZGF0YS5ldmVudCA9IGV2ZW50XG5cdCAgICB2YXIgb25FbmQgPSBkYXRhLmNhbGxiYWNrID0gZnVuY3Rpb24gdHJhbnNpdGlvbkNiIChlKSB7XG5cdCAgICAgIGlmIChlLnRhcmdldCA9PT0gZWwpIHtcblx0ICAgICAgICBfLm9mZihlbCwgZXZlbnQsIG9uRW5kKVxuXHQgICAgICAgIGRhdGEuZXZlbnQgPSBkYXRhLmNhbGxiYWNrID0gbnVsbFxuXHQgICAgICAgIGlmIChjbGVhbnVwRm4pIGNsZWFudXBGbigpXG5cdCAgICAgICAgaWYgKGNiKSBjYigpXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIF8ub24oZWwsIGV2ZW50LCBvbkVuZClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGFuIGVsZW1lbnQncyB0cmFuc2l0aW9uIHR5cGUgYmFzZWQgb24gdGhlXG5cdCAqIGNhbGN1bGF0ZWQgc3R5bGVzXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGFcblx0ICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ9XG5cdCAqICAgICAgICAgMSAtIHRyYW5zaXRpb25cblx0ICogICAgICAgICAyIC0gYW5pbWF0aW9uXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGdldFRyYW5zaXRpb25UeXBlIChlbCwgZGF0YSwgY2xhc3NOYW1lKSB7XG5cdCAgdmFyIHR5cGUgPSBkYXRhLmNhY2hlICYmIGRhdGEuY2FjaGVbY2xhc3NOYW1lXVxuXHQgIGlmICh0eXBlKSByZXR1cm4gdHlwZVxuXHQgIHZhciBpbmxpbmVTdHlsZXMgPSBlbC5zdHlsZVxuXHQgIHZhciBjb21wdXRlZFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVxuXHQgIHZhciB0cmFuc0R1cmF0aW9uID1cblx0ICAgIGlubGluZVN0eWxlc1t0cmFuc0R1cmF0aW9uUHJvcF0gfHxcblx0ICAgIGNvbXB1dGVkU3R5bGVzW3RyYW5zRHVyYXRpb25Qcm9wXVxuXHQgIGlmICh0cmFuc0R1cmF0aW9uICYmIHRyYW5zRHVyYXRpb24gIT09ICcwcycpIHtcblx0ICAgIHR5cGUgPSAxXG5cdCAgfSBlbHNlIHtcblx0ICAgIHZhciBhbmltRHVyYXRpb24gPVxuXHQgICAgICBpbmxpbmVTdHlsZXNbYW5pbUR1cmF0aW9uUHJvcF0gfHxcblx0ICAgICAgY29tcHV0ZWRTdHlsZXNbYW5pbUR1cmF0aW9uUHJvcF1cblx0ICAgIGlmIChhbmltRHVyYXRpb24gJiYgYW5pbUR1cmF0aW9uICE9PSAnMHMnKSB7XG5cdCAgICAgIHR5cGUgPSAyXG5cdCAgICB9XG5cdCAgfVxuXHQgIGlmICh0eXBlKSB7XG5cdCAgICBpZiAoIWRhdGEuY2FjaGUpIGRhdGEuY2FjaGUgPSB7fVxuXHQgICAgZGF0YS5jYWNoZVtjbGFzc05hbWVdID0gdHlwZVxuXHQgIH1cblx0ICByZXR1cm4gdHlwZVxuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGx5IENTUyB0cmFuc2l0aW9uIHRvIGFuIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpcmVjdGlvbiAtIDE6IGVudGVyLCAtMTogbGVhdmVcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gb3AgLSB0aGUgYWN0dWFsIERPTSBvcGVyYXRpb25cblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0YXJnZXQgZWxlbWVudCdzIHRyYW5zaXRpb24gZGF0YVxuXHQgKi9cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbCwgZGlyZWN0aW9uLCBvcCwgZGF0YSwgY2IpIHtcblx0ICB2YXIgY2xhc3NMaXN0ID0gZWwuY2xhc3NMaXN0XG5cdCAgdmFyIHByZWZpeCA9IGRhdGEuaWQgfHwgJ3YnXG5cdCAgdmFyIGVudGVyQ2xhc3MgPSBwcmVmaXggKyAnLWVudGVyJ1xuXHQgIHZhciBsZWF2ZUNsYXNzID0gcHJlZml4ICsgJy1sZWF2ZSdcblx0ICAvLyBjbGVhbiB1cCBwb3RlbnRpYWwgcHJldmlvdXMgdW5maW5pc2hlZCB0cmFuc2l0aW9uXG5cdCAgaWYgKGRhdGEuY2FsbGJhY2spIHtcblx0ICAgIF8ub2ZmKGVsLCBkYXRhLmV2ZW50LCBkYXRhLmNhbGxiYWNrKVxuXHQgICAgY2xhc3NMaXN0LnJlbW92ZShlbnRlckNsYXNzKVxuXHQgICAgY2xhc3NMaXN0LnJlbW92ZShsZWF2ZUNsYXNzKVxuXHQgICAgZGF0YS5ldmVudCA9IGRhdGEuY2FsbGJhY2sgPSBudWxsXG5cdCAgfVxuXHQgIGlmIChkaXJlY3Rpb24gPiAwKSB7IC8vIGVudGVyXG5cdCAgICBjbGFzc0xpc3QuYWRkKGVudGVyQ2xhc3MpXG5cdCAgICBvcCgpXG5cdCAgICBwdXNoKGVsLCBkaXJlY3Rpb24sIG51bGwsIGVudGVyQ2xhc3MsIGNiKVxuXHQgIH0gZWxzZSB7IC8vIGxlYXZlXG5cdCAgICBjbGFzc0xpc3QuYWRkKGxlYXZlQ2xhc3MpXG5cdCAgICBwdXNoKGVsLCBkaXJlY3Rpb24sIG9wLCBsZWF2ZUNsYXNzLCBjYilcblx0ICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDU0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKipcblx0ICogQXBwbHkgSmF2YVNjcmlwdCBlbnRlci9sZWF2ZSBmdW5jdGlvbnMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpcmVjdGlvbiAtIDE6IGVudGVyLCAtMTogbGVhdmVcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gb3AgLSB0aGUgYWN0dWFsIERPTSBvcGVyYXRpb25cblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0YXJnZXQgZWxlbWVudCdzIHRyYW5zaXRpb24gZGF0YVxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGVmIC0gdHJhbnNpdGlvbiBkZWZpbml0aW9uIG9iamVjdFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqL1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsLCBkaXJlY3Rpb24sIG9wLCBkYXRhLCBkZWYsIGNiKSB7XG5cdCAgaWYgKGRhdGEuY2FuY2VsKSB7XG5cdCAgICBkYXRhLmNhbmNlbCgpXG5cdCAgICBkYXRhLmNhbmNlbCA9IG51bGxcblx0ICB9XG5cdCAgaWYgKGRpcmVjdGlvbiA+IDApIHsgLy8gZW50ZXJcblx0ICAgIGlmIChkZWYuYmVmb3JlRW50ZXIpIHtcblx0ICAgICAgZGVmLmJlZm9yZUVudGVyKGVsKVxuXHQgICAgfVxuXHQgICAgb3AoKVxuXHQgICAgaWYgKGRlZi5lbnRlcikge1xuXHQgICAgICBkYXRhLmNhbmNlbCA9IGRlZi5lbnRlcihlbCwgZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGRhdGEuY2FuY2VsID0gbnVsbFxuXHQgICAgICAgIGlmIChjYikgY2IoKVxuXHQgICAgICB9KVxuXHQgICAgfSBlbHNlIGlmIChjYikge1xuXHQgICAgICBjYigpXG5cdCAgICB9XG5cdCAgfSBlbHNlIHsgLy8gbGVhdmVcblx0ICAgIGlmIChkZWYubGVhdmUpIHtcblx0ICAgICAgZGF0YS5jYW5jZWwgPSBkZWYubGVhdmUoZWwsIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBkYXRhLmNhbmNlbCA9IG51bGxcblx0ICAgICAgICBvcCgpXG5cdCAgICAgICAgaWYgKGNiKSBjYigpXG5cdCAgICAgIH0pXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBvcCgpXG5cdCAgICAgIGlmIChjYikgY2IoKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogNTUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIHNlbGYgPSB0aGlzXG5cdCAgICB2YXIgZWwgPSB0aGlzLmVsXG5cblx0ICAgIC8vIGNoZWNrIHBhcmFtc1xuXHQgICAgLy8gLSBsYXp5OiB1cGRhdGUgbW9kZWwgb24gXCJjaGFuZ2VcIiBpbnN0ZWFkIG9mIFwiaW5wdXRcIlxuXHQgICAgdmFyIGxhenkgPSBlbC5oYXNBdHRyaWJ1dGUoJ2xhenknKVxuXHQgICAgaWYgKGxhenkpIHtcblx0ICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdsYXp5Jylcblx0ICAgIH1cblx0ICAgIC8vIC0gbnVtYmVyOiBjYXN0IHZhbHVlIGludG8gbnVtYmVyIHdoZW4gdXBkYXRpbmcgbW9kZWwuXG5cdCAgICB2YXIgbnVtYmVyID1cblx0ICAgICAgZWwuaGFzQXR0cmlidXRlKCdudW1iZXInKSB8fFxuXHQgICAgICBlbC50eXBlID09PSAnbnVtYmVyJ1xuXHQgICAgaWYgKG51bWJlcikge1xuXHQgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ251bWJlcicpXG5cdCAgICB9XG5cblx0ICAgIC8vIGhhbmRsZSBjb21wb3NpdGlvbiBldmVudHMuXG5cdCAgICAvLyBodHRwOi8vYmxvZy5ldmFueW91Lm1lLzIwMTQvMDEvMDMvY29tcG9zaXRpb24tZXZlbnQvXG5cdCAgICB2YXIgY3BMb2NrZWQgPSBmYWxzZVxuXHQgICAgdGhpcy5jcExvY2sgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIGNwTG9ja2VkID0gdHJ1ZVxuXHQgICAgfVxuXHQgICAgdGhpcy5jcFVubG9jayA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgY3BMb2NrZWQgPSBmYWxzZVxuXHQgICAgICAvLyBpbiBJRTExIHRoZSBcImNvbXBvc2l0aW9uZW5kXCIgZXZlbnQgZmlyZXMgQUZURVJcblx0ICAgICAgLy8gdGhlIFwiaW5wdXRcIiBldmVudCwgc28gdGhlIGlucHV0IGhhbmRsZXIgaXMgYmxvY2tlZFxuXHQgICAgICAvLyBhdCB0aGUgZW5kLi4uIGhhdmUgdG8gY2FsbCBpdCBoZXJlLlxuXHQgICAgICBzZXQoKVxuXHQgICAgfVxuXHQgICAgXy5vbihlbCwnY29tcG9zaXRpb25zdGFydCcsIHRoaXMuY3BMb2NrKVxuXHQgICAgXy5vbihlbCwnY29tcG9zaXRpb25lbmQnLCB0aGlzLmNwVW5sb2NrKVxuXG5cdCAgICAvLyBzaGFyZWQgc2V0dGVyXG5cdCAgICBmdW5jdGlvbiBzZXQgKCkge1xuXHQgICAgICBzZWxmLnNldChcblx0ICAgICAgICBudW1iZXIgPyBfLnRvTnVtYmVyKGVsLnZhbHVlKSA6IGVsLnZhbHVlLFxuXHQgICAgICAgIHRydWVcblx0ICAgICAgKVxuXHQgICAgfVxuXG5cdCAgICAvLyBpZiB0aGUgZGlyZWN0aXZlIGhhcyBmaWx0ZXJzLCB3ZSBuZWVkIHRvXG5cdCAgICAvLyByZWNvcmQgY3Vyc29yIHBvc2l0aW9uIGFuZCByZXN0b3JlIGl0IGFmdGVyIHVwZGF0aW5nXG5cdCAgICAvLyB0aGUgaW5wdXQgd2l0aCB0aGUgZmlsdGVyZWQgdmFsdWUuXG5cdCAgICB0aGlzLmxpc3RlbmVyID0gZnVuY3Rpb24gdGV4dElucHV0TGlzdGVuZXIgKCkge1xuXHQgICAgICBpZiAoY3BMb2NrZWQpIHJldHVyblxuXHQgICAgICB2YXIgY2hhcnNPZmZzZXRcblx0ICAgICAgLy8gc29tZSBIVE1MNSBpbnB1dCB0eXBlcyB0aHJvdyBlcnJvciBoZXJlXG5cdCAgICAgIHRyeSB7XG5cdCAgICAgICAgLy8gcmVjb3JkIGhvdyBtYW55IGNoYXJzIGZyb20gdGhlIGVuZCBvZiBpbnB1dFxuXHQgICAgICAgIC8vIHRoZSBjdXJzb3Igd2FzIGF0XG5cdCAgICAgICAgY2hhcnNPZmZzZXQgPSBlbC52YWx1ZS5sZW5ndGggLSBlbC5zZWxlY3Rpb25TdGFydFxuXHQgICAgICB9IGNhdGNoIChlKSB7fVxuXHQgICAgICBzZXQoKVxuXHQgICAgICAvLyBmb3JjZSBhIHZhbHVlIHVwZGF0ZSwgYmVjYXVzZSBpblxuXHQgICAgICAvLyBjZXJ0YWluIGNhc2VzIHRoZSB3cml0ZSBmaWx0ZXJzIG91dHB1dCB0aGUgc2FtZVxuXHQgICAgICAvLyByZXN1bHQgZm9yIGRpZmZlcmVudCBpbnB1dCB2YWx1ZXMsIGFuZCB0aGUgT2JzZXJ2ZXJcblx0ICAgICAgLy8gc2V0IGV2ZW50cyB3b24ndCBiZSB0cmlnZ2VyZWQuXG5cdCAgICAgIF8ubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBuZXdWYWwgPSBzZWxmLl93YXRjaGVyLnZhbHVlXG5cdCAgICAgICAgc2VsZi51cGRhdGUobmV3VmFsKVxuXHQgICAgICAgIGlmIChjaGFyc09mZnNldCAhPSBudWxsKSB7XG5cdCAgICAgICAgICB2YXIgY3Vyc29yUG9zID1cblx0ICAgICAgICAgICAgXy50b1N0cmluZyhuZXdWYWwpLmxlbmd0aCAtIGNoYXJzT2Zmc2V0XG5cdCAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3JQb3MsIGN1cnNvclBvcylcblx0ICAgICAgICB9XG5cdCAgICAgIH0pXG5cdCAgICB9XG5cdCAgICB0aGlzLmV2ZW50ID0gbGF6eSA/ICdjaGFuZ2UnIDogJ2lucHV0J1xuXHQgICAgXy5vbihlbCwgdGhpcy5ldmVudCwgdGhpcy5saXN0ZW5lcilcblxuXHQgICAgLy8gSUU5IGRvZXNuJ3QgZmlyZSBpbnB1dCBldmVudCBvbiBiYWNrc3BhY2UvZGVsL2N1dFxuXHQgICAgaWYgKCFsYXp5ICYmIF8uaXNJRTkpIHtcblx0ICAgICAgdGhpcy5vbkN1dCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBfLm5leHRUaWNrKHNlbGYubGlzdGVuZXIpXG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5vbkRlbCA9IGZ1bmN0aW9uIChlKSB7XG5cdCAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gNDYgfHwgZS5rZXlDb2RlID09PSA4KSB7XG5cdCAgICAgICAgICBzZWxmLmxpc3RlbmVyKClcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgICAgXy5vbihlbCwgJ2N1dCcsIHRoaXMub25DdXQpXG5cdCAgICAgIF8ub24oZWwsICdrZXl1cCcsIHRoaXMub25EZWwpXG5cdCAgICB9XG5cblx0ICAgIC8vIHNldCBpbml0aWFsIHZhbHVlIGlmIHByZXNlbnRcblx0ICAgIGlmIChcblx0ICAgICAgZWwuaGFzQXR0cmlidXRlKCd2YWx1ZScpIHx8XG5cdCAgICAgIChlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnICYmIGVsLnZhbHVlLnRyaW0oKSlcblx0ICAgICkge1xuXHQgICAgICB0aGlzLl9pbml0VmFsdWUgPSBlbC52YWx1ZVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgdGhpcy5lbC52YWx1ZSA9IF8udG9TdHJpbmcodmFsdWUpXG5cdCAgfSxcblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIGVsID0gdGhpcy5lbFxuXHQgICAgXy5vZmYoZWwsIHRoaXMuZXZlbnQsIHRoaXMubGlzdGVuZXIpXG5cdCAgICBfLm9mZihlbCwnY29tcG9zaXRpb25zdGFydCcsIHRoaXMuY3BMb2NrKVxuXHQgICAgXy5vZmYoZWwsJ2NvbXBvc2l0aW9uZW5kJywgdGhpcy5jcFVubG9jaylcblx0ICAgIGlmICh0aGlzLm9uQ3V0KSB7XG5cdCAgICAgIF8ub2ZmKGVsLCdjdXQnLCB0aGlzLm9uQ3V0KVxuXHQgICAgICBfLm9mZihlbCwna2V5dXAnLCB0aGlzLm9uRGVsKVxuXHQgICAgfVxuXHQgIH1cblxuXHR9XG5cbi8qKiovIH0sXG4vKiA1NiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgc2VsZiA9IHRoaXNcblx0ICAgIHZhciBlbCA9IHRoaXMuZWxcblx0ICAgIHRoaXMubGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHNlbGYuc2V0KGVsLnZhbHVlLCB0cnVlKVxuXHQgICAgfVxuXHQgICAgXy5vbihlbCwgJ2NoYW5nZScsIHRoaXMubGlzdGVuZXIpXG5cdCAgICBpZiAoZWwuY2hlY2tlZCkge1xuXHQgICAgICB0aGlzLl9pbml0VmFsdWUgPSBlbC52YWx1ZVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgLyoganNoaW50IGVxZXFlcTogZmFsc2UgKi9cblx0ICAgIHRoaXMuZWwuY2hlY2tlZCA9IHZhbHVlID09IHRoaXMuZWwudmFsdWVcblx0ICB9LFxuXG5cdCAgdW5iaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICBfLm9mZih0aGlzLmVsLCAnY2hhbmdlJywgdGhpcy5saXN0ZW5lcilcblx0ICB9XG5cblx0fVxuXG4vKioqLyB9LFxuLyogNTcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgV2F0Y2hlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgc2VsZiA9IHRoaXNcblx0ICAgIHZhciBlbCA9IHRoaXMuZWxcblx0ICAgIC8vIGNoZWNrIG9wdGlvbnMgcGFyYW1cblx0ICAgIHZhciBvcHRpb25zUGFyYW0gPSBlbC5nZXRBdHRyaWJ1dGUoJ29wdGlvbnMnKVxuXHQgICAgaWYgKG9wdGlvbnNQYXJhbSkge1xuXHQgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ29wdGlvbnMnKVxuXHQgICAgICBpbml0T3B0aW9ucy5jYWxsKHRoaXMsIG9wdGlvbnNQYXJhbSlcblx0ICAgIH1cblx0ICAgIHRoaXMubXVsdGlwbGUgPSBlbC5oYXNBdHRyaWJ1dGUoJ211bHRpcGxlJylcblx0ICAgIHRoaXMubGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHZhciB2YWx1ZSA9IHNlbGYubXVsdGlwbGVcblx0ICAgICAgICA/IGdldE11bHRpVmFsdWUoZWwpXG5cdCAgICAgICAgOiBlbC52YWx1ZVxuXHQgICAgICBzZWxmLnNldCh2YWx1ZSwgdHJ1ZSlcblx0ICAgIH1cblx0ICAgIF8ub24oZWwsICdjaGFuZ2UnLCB0aGlzLmxpc3RlbmVyKVxuXHQgICAgY2hlY2tJbml0aWFsVmFsdWUuY2FsbCh0aGlzKVxuXHQgIH0sXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgLyoganNoaW50IGVxZXFlcTogZmFsc2UgKi9cblx0ICAgIHZhciBlbCA9IHRoaXMuZWxcblx0ICAgIGVsLnNlbGVjdGVkSW5kZXggPSAtMVxuXHQgICAgdmFyIG11bHRpID0gdGhpcy5tdWx0aXBsZSAmJiBfLmlzQXJyYXkodmFsdWUpXG5cdCAgICB2YXIgb3B0aW9ucyA9IGVsLm9wdGlvbnNcblx0ICAgIHZhciBpID0gb3B0aW9ucy5sZW5ndGhcblx0ICAgIHZhciBvcHRpb25cblx0ICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgb3B0aW9uID0gb3B0aW9uc1tpXVxuXHQgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBtdWx0aVxuXHQgICAgICAgID8gaW5kZXhPZih2YWx1ZSwgb3B0aW9uLnZhbHVlKSA+IC0xXG5cdCAgICAgICAgOiB2YWx1ZSA9PSBvcHRpb24udmFsdWVcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgdW5iaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICBfLm9mZih0aGlzLmVsLCAnY2hhbmdlJywgdGhpcy5saXN0ZW5lcilcblx0ICAgIGlmICh0aGlzLm9wdGlvbldhdGNoZXIpIHtcblx0ICAgICAgdGhpcy5vcHRpb25XYXRjaGVyLnRlYXJkb3duKClcblx0ICAgIH1cblx0ICB9XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBvcHRpb24gbGlzdCBmcm9tIHRoZSBwYXJhbS5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV4cHJlc3Npb25cblx0ICovXG5cblx0ZnVuY3Rpb24gaW5pdE9wdGlvbnMgKGV4cHJlc3Npb24pIHtcblx0ICB2YXIgc2VsZiA9IHRoaXNcblx0ICBmdW5jdGlvbiBvcHRpb25VcGRhdGVXYXRjaGVyICh2YWx1ZSkge1xuXHQgICAgaWYgKF8uaXNBcnJheSh2YWx1ZSkpIHtcblx0ICAgICAgc2VsZi5lbC5pbm5lckhUTUwgPSAnJ1xuXHQgICAgICBidWlsZE9wdGlvbnMoc2VsZi5lbCwgdmFsdWUpXG5cdCAgICAgIGlmIChzZWxmLl93YXRjaGVyKSB7XG5cdCAgICAgICAgc2VsZi51cGRhdGUoc2VsZi5fd2F0Y2hlci52YWx1ZSlcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgXy53YXJuKCdJbnZhbGlkIG9wdGlvbnMgdmFsdWUgZm9yIHYtbW9kZWw6ICcgKyB2YWx1ZSlcblx0ICAgIH1cblx0ICB9XG5cdCAgdGhpcy5vcHRpb25XYXRjaGVyID0gbmV3IFdhdGNoZXIoXG5cdCAgICB0aGlzLnZtLFxuXHQgICAgZXhwcmVzc2lvbixcblx0ICAgIG9wdGlvblVwZGF0ZVdhdGNoZXJcblx0ICApXG5cdCAgLy8gdXBkYXRlIHdpdGggaW5pdGlhbCB2YWx1ZVxuXHQgIG9wdGlvblVwZGF0ZVdhdGNoZXIodGhpcy5vcHRpb25XYXRjaGVyLnZhbHVlKVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIHVwIG9wdGlvbiBlbGVtZW50cy4gSUU5IGRvZXNuJ3QgY3JlYXRlIG9wdGlvbnNcblx0ICogd2hlbiBzZXR0aW5nIGlubmVySFRNTCBvbiA8c2VsZWN0PiBlbGVtZW50cywgc28gd2UgaGF2ZVxuXHQgKiB0byB1c2UgRE9NIEFQSSBoZXJlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IHBhcmVudCAtIGEgPHNlbGVjdD4gb3IgYW4gPG9wdGdyb3VwPlxuXHQgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGJ1aWxkT3B0aW9ucyAocGFyZW50LCBvcHRpb25zKSB7XG5cdCAgdmFyIG9wLCBlbFxuXHQgIGZvciAodmFyIGkgPSAwLCBsID0gb3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgIG9wID0gb3B0aW9uc1tpXVxuXHQgICAgaWYgKCFvcC5vcHRpb25zKSB7XG5cdCAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcblx0ICAgICAgaWYgKHR5cGVvZiBvcCA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICBlbC50ZXh0ID0gZWwudmFsdWUgPSBvcFxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIGVsLnRleHQgPSBvcC50ZXh0XG5cdCAgICAgICAgZWwudmFsdWUgPSBvcC52YWx1ZVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGdyb3VwJylcblx0ICAgICAgZWwubGFiZWwgPSBvcC5sYWJlbFxuXHQgICAgICBidWlsZE9wdGlvbnMoZWwsIG9wLm9wdGlvbnMpXG5cdCAgICB9XG5cdCAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIHRoZSBpbml0aWFsIHZhbHVlIGZvciBzZWxlY3RlZCBvcHRpb25zLlxuXHQgKi9cblxuXHRmdW5jdGlvbiBjaGVja0luaXRpYWxWYWx1ZSAoKSB7XG5cdCAgdmFyIGluaXRWYWx1ZVxuXHQgIHZhciBvcHRpb25zID0gdGhpcy5lbC5vcHRpb25zXG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSBvcHRpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgaWYgKG9wdGlvbnNbaV0uaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpKSB7XG5cdCAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG5cdCAgICAgICAgKGluaXRWYWx1ZSB8fCAoaW5pdFZhbHVlID0gW10pKVxuXHQgICAgICAgICAgLnB1c2gob3B0aW9uc1tpXS52YWx1ZSlcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBpbml0VmFsdWUgPSBvcHRpb25zW2ldLnZhbHVlXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cdCAgaWYgKGluaXRWYWx1ZSkge1xuXHQgICAgdGhpcy5faW5pdFZhbHVlID0gaW5pdFZhbHVlXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlciB0byBleHRyYWN0IGEgdmFsdWUgYXJyYXkgZm9yIHNlbGVjdFttdWx0aXBsZV1cblx0ICpcblx0ICogQHBhcmFtIHtTZWxlY3RFbGVtZW50fSBlbFxuXHQgKiBAcmV0dXJuIHtBcnJheX1cblx0ICovXG5cblx0ZnVuY3Rpb24gZ2V0TXVsdGlWYWx1ZSAoZWwpIHtcblx0ICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlclxuXHQgICAgLmNhbGwoZWwub3B0aW9ucywgZmlsdGVyU2VsZWN0ZWQpXG5cdCAgICAubWFwKGdldE9wdGlvblZhbHVlKVxuXHR9XG5cblx0ZnVuY3Rpb24gZmlsdGVyU2VsZWN0ZWQgKG9wKSB7XG5cdCAgcmV0dXJuIG9wLnNlbGVjdGVkXG5cdH1cblxuXHRmdW5jdGlvbiBnZXRPcHRpb25WYWx1ZSAob3ApIHtcblx0ICByZXR1cm4gb3AudmFsdWUgfHwgb3AudGV4dFxuXHR9XG5cblx0LyoqXG5cdCAqIE5hdGl2ZSBBcnJheS5pbmRleE9mIHVzZXMgc3RyaWN0IGVxdWFsLCBidXQgaW4gdGhpc1xuXHQgKiBjYXNlIHdlIG5lZWQgdG8gbWF0Y2ggc3RyaW5nL251bWJlcnMgd2l0aCBzb2Z0IGVxdWFsLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5fSBhcnJcblx0ICogQHBhcmFtIHsqfSB2YWxcblx0ICovXG5cblx0ZnVuY3Rpb24gaW5kZXhPZiAoYXJyLCB2YWwpIHtcblx0ICAvKiBqc2hpbnQgZXFlcWVxOiBmYWxzZSAqL1xuXHQgIHZhciBpID0gYXJyLmxlbmd0aFxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIGlmIChhcnJbaV0gPT0gdmFsKSByZXR1cm4gaVxuXHQgIH1cblx0ICByZXR1cm4gLTFcblx0fVxuXG4vKioqLyB9LFxuLyogNTggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIHNlbGYgPSB0aGlzXG5cdCAgICB2YXIgZWwgPSB0aGlzLmVsXG5cdCAgICB0aGlzLmxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICBzZWxmLnNldChlbC5jaGVja2VkLCB0cnVlKVxuXHQgICAgfVxuXHQgICAgXy5vbihlbCwgJ2NoYW5nZScsIHRoaXMubGlzdGVuZXIpXG5cdCAgICBpZiAoZWwuY2hlY2tlZCkge1xuXHQgICAgICB0aGlzLl9pbml0VmFsdWUgPSBlbC5jaGVja2VkXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICB0aGlzLmVsLmNoZWNrZWQgPSAhIXZhbHVlXG5cdCAgfSxcblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgXy5vZmYodGhpcy5lbCwgJ2NoYW5nZScsIHRoaXMubGlzdGVuZXIpXG5cdCAgfVxuXG5cdH1cblxuLyoqKi8gfSxcbi8qIDU5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGVcblx0dmFyIGFycmF5TWV0aG9kcyA9IE9iamVjdC5jcmVhdGUoYXJyYXlQcm90bylcblxuXHQvKipcblx0ICogSW50ZXJjZXB0IG11dGF0aW5nIG1ldGhvZHMgYW5kIGVtaXQgZXZlbnRzXG5cdCAqL1xuXG5cdDtbXG5cdCAgJ3B1c2gnLFxuXHQgICdwb3AnLFxuXHQgICdzaGlmdCcsXG5cdCAgJ3Vuc2hpZnQnLFxuXHQgICdzcGxpY2UnLFxuXHQgICdzb3J0Jyxcblx0ICAncmV2ZXJzZSdcblx0XVxuXHQuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG5cdCAgLy8gY2FjaGUgb3JpZ2luYWwgbWV0aG9kXG5cdCAgdmFyIG9yaWdpbmFsID0gYXJyYXlQcm90b1ttZXRob2RdXG5cdCAgXy5kZWZpbmUoYXJyYXlNZXRob2RzLCBtZXRob2QsIGZ1bmN0aW9uIG11dGF0b3IgKCkge1xuXHQgICAgLy8gYXZvaWQgbGVha2luZyBhcmd1bWVudHM6XG5cdCAgICAvLyBodHRwOi8vanNwZXJmLmNvbS9jbG9zdXJlLXdpdGgtYXJndW1lbnRzXG5cdCAgICB2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGhcblx0ICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGkpXG5cdCAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV1cblx0ICAgIH1cblx0ICAgIHZhciByZXN1bHQgPSBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKVxuXHQgICAgdmFyIG9iID0gdGhpcy5fX29iX19cblx0ICAgIHZhciBpbnNlcnRlZFxuXHQgICAgc3dpdGNoIChtZXRob2QpIHtcblx0ICAgICAgY2FzZSAncHVzaCc6XG5cdCAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzXG5cdCAgICAgICAgYnJlYWtcblx0ICAgICAgY2FzZSAndW5zaGlmdCc6XG5cdCAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzXG5cdCAgICAgICAgYnJlYWtcblx0ICAgICAgY2FzZSAnc3BsaWNlJzpcblx0ICAgICAgICBpbnNlcnRlZCA9IGFyZ3Muc2xpY2UoMilcblx0ICAgICAgICBicmVha1xuXHQgICAgfVxuXHQgICAgaWYgKGluc2VydGVkKSBvYi5vYnNlcnZlQXJyYXkoaW5zZXJ0ZWQpXG5cdCAgICAvLyBub3RpZnkgY2hhbmdlXG5cdCAgICBvYi5ub3RpZnkoKVxuXHQgICAgcmV0dXJuIHJlc3VsdFxuXHQgIH0pXG5cdH0pXG5cblx0LyoqXG5cdCAqIFN3YXAgdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IHdpdGggYSBuZXcgdmFsdWVcblx0ICogYW5kIGVtaXRzIGNvcnJlc3BvbmRpbmcgZXZlbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuXHQgKiBAcGFyYW0geyp9IHZhbFxuXHQgKiBAcmV0dXJuIHsqfSAtIHJlcGxhY2VkIGVsZW1lbnRcblx0ICovXG5cblx0Xy5kZWZpbmUoXG5cdCAgYXJyYXlQcm90byxcblx0ICAnJHNldCcsXG5cdCAgZnVuY3Rpb24gJHNldCAoaW5kZXgsIHZhbCkge1xuXHQgICAgaWYgKGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XG5cdCAgICAgIHRoaXMubGVuZ3RoID0gaW5kZXggKyAxXG5cdCAgICB9XG5cdCAgICByZXR1cm4gdGhpcy5zcGxpY2UoaW5kZXgsIDEsIHZhbClbMF1cblx0ICB9XG5cdClcblxuXHQvKipcblx0ICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHJlbW92ZSB0aGUgZWxlbWVudCBhdCBnaXZlbiBpbmRleC5cblx0ICpcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG5cdCAqIEBwYXJhbSB7Kn0gdmFsXG5cdCAqL1xuXG5cdF8uZGVmaW5lKFxuXHQgIGFycmF5UHJvdG8sXG5cdCAgJyRyZW1vdmUnLFxuXHQgIGZ1bmN0aW9uICRyZW1vdmUgKGluZGV4KSB7XG5cdCAgICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykge1xuXHQgICAgICBpbmRleCA9IHRoaXMuaW5kZXhPZihpbmRleClcblx0ICAgIH1cblx0ICAgIGlmIChpbmRleCA+IC0xKSB7XG5cdCAgICAgIHJldHVybiB0aGlzLnNwbGljZShpbmRleCwgMSlbMF1cblx0ICAgIH1cblx0ICB9XG5cdClcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGFycmF5TWV0aG9kc1xuXG4vKioqLyB9LFxuLyogNjAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgb2JqUHJvdG8gPSBPYmplY3QucHJvdG90eXBlXG5cblx0LyoqXG5cdCAqIEFkZCBhIG5ldyBwcm9wZXJ0eSB0byBhbiBvYnNlcnZlZCBvYmplY3Rcblx0ICogYW5kIGVtaXRzIGNvcnJlc3BvbmRpbmcgZXZlbnRcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleVxuXHQgKiBAcGFyYW0geyp9IHZhbFxuXHQgKiBAcHVibGljXG5cdCAqL1xuXG5cdF8uZGVmaW5lKFxuXHQgIG9ialByb3RvLFxuXHQgICckYWRkJyxcblx0ICBmdW5jdGlvbiAkYWRkIChrZXksIHZhbCkge1xuXHQgICAgdmFyIG9iID0gdGhpcy5fX29iX19cblx0ICAgIGlmICghb2IpIHtcblx0ICAgICAgdGhpc1trZXldID0gdmFsXG5cdCAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgICAgaWYgKF8uaXNSZXNlcnZlZChrZXkpKSB7XG5cdCAgICAgIF8ud2FybignUmVmdXNlZCB0byAkYWRkIHJlc2VydmVkIGtleTogJyArIGtleSlcblx0ICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSByZXR1cm5cblx0ICAgIG9iLmNvbnZlcnQoa2V5LCB2YWwpXG5cdCAgICBpZiAob2Iudm1zKSB7XG5cdCAgICAgIHZhciBpID0gb2Iudm1zLmxlbmd0aFxuXHQgICAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgICAgdmFyIHZtID0gb2Iudm1zW2ldXG5cdCAgICAgICAgdm0uX3Byb3h5KGtleSlcblx0ICAgICAgICB2bS5fZGlnZXN0KClcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgb2Iubm90aWZ5KClcblx0ICAgIH1cblx0ICB9XG5cdClcblxuXHQvKipcblx0ICogRGVsZXRlcyBhIHByb3BlcnR5IGZyb20gYW4gb2JzZXJ2ZWQgb2JqZWN0XG5cdCAqIGFuZCBlbWl0cyBjb3JyZXNwb25kaW5nIGV2ZW50XG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHRfLmRlZmluZShcblx0ICBvYmpQcm90byxcblx0ICAnJGRlbGV0ZScsXG5cdCAgZnVuY3Rpb24gJGRlbGV0ZSAoa2V5KSB7XG5cdCAgICB2YXIgb2IgPSB0aGlzLl9fb2JfX1xuXHQgICAgaWYgKCFvYikge1xuXHQgICAgICBkZWxldGUgdGhpc1trZXldXG5cdCAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgICAgaWYgKF8uaXNSZXNlcnZlZChrZXkpKSB7XG5cdCAgICAgIF8ud2FybignUmVmdXNlZCB0byAkYWRkIHJlc2VydmVkIGtleTogJyArIGtleSlcblx0ICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkgcmV0dXJuXG5cdCAgICBkZWxldGUgdGhpc1trZXldXG5cdCAgICBpZiAob2Iudm1zKSB7XG5cdCAgICAgIHZhciBpID0gb2Iudm1zLmxlbmd0aFxuXHQgICAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgICAgdmFyIHZtID0gb2Iudm1zW2ldXG5cdCAgICAgICAgdm0uX3VucHJveHkoa2V5KVxuXHQgICAgICAgIHZtLl9kaWdlc3QoKVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBvYi5ub3RpZnkoKVxuXHQgICAgfVxuXHQgIH1cblx0KVxuXG4vKioqLyB9XG4vKioqKioqLyBdKVxufSk7XG4iLCIvKipcbiAqIEZhY2Vib29rIGxvZ2luIG9uIGhlYWRlclxuICovXG4oZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgVnVlID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vLi4vLi4vYm93ZXJfY29tcG9uZW50cy92dWUvZGlzdC92dWUuanNcIik7XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IFZ1ZS5leHRlbmQoe1xuXG4gICAgICAgIHRlbXBsYXRlOiBcIiNsdW5jaC1sb2dpbi10bXBsXCIsXG5cbiAgICAgICAgZGF0YTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmJQYXJhbToge1xuICAgICAgICAgICAgICAgICAgICBhcHBJZCAgICAgIDogJzE0Mzc0ODEwMzMxNzY2OTQnLFxuICAgICAgICAgICAgICAgICAgICB4ZmJtbCAgICAgIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiAgICA6ICd2Mi4xJ1xuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIGluaXRpYWxpemVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsb2dnZWRJbjogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLiRvbihcImZiUmVhZHlcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBGQi5pbml0KHRoaXMuZmJQYXJhbSk7XG4gICAgICAgICAgICAgICAgRkIuZ2V0TG9naW5TdGF0dXMoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGF0dXNDaGFuZ2VDYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgbG9naW46IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIEZCLmxvZ2luKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGF0dXNDaGFuZ2VDYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSwge3Njb3BlOiAncHVibGljX3Byb2ZpbGUsdXNlcl9mcmllbmRzJ30pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgbG9nb3V0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICBGQi5sb2dvdXQoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGF0dXNDaGFuZ2VDYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdGF0dXNDaGFuZ2VDYWxsYmFjazogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzID09PSAnY29ubmVjdGVkJyl7XG4gICAgICAgICAgICAgICAgICAgIEZCLmFwaSgnL21lJywgZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRwYXJlbnQubWUgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LiRwYXJlbnQuYWNjZXNzVG9rZW4gPSByZXNwb25zZS5hdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW47XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJHBhcmVudC5tZSA9IHtpZDogcmVzcG9uc2UuYXV0aFJlc3BvbnNlLnVzZXJJRH07XG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9nZ2VkSW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LiRkaXNwYXRjaChcImZiT25Mb2dpblwiLCByZXNwb25zZSk7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2dnZWRJbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LiRkaXNwYXRjaChcImZiT25Mb2dvdXRcIiwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59KSh3aW5kb3cpOyIsIi8qKlxuICogZ2V0dGluZyBzdGFydGVkXG4gKi9cbihmdW5jdGlvbihnbG9iYWwpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBcbiAgICB2YXIgVnVlID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vLi4vYm93ZXJfY29tcG9uZW50cy92dWUvZGlzdC92dWUuanNcIik7XG4gICAgdmFyIHZ1ZUZpbHRlcnMgPSByZXF1aXJlKFwiLi9maWx0ZXIvZmlsdGVyc1wiKTtcbiAgICB2YXIgbG9naW5Db21wb25lbnQgPSByZXF1aXJlKFwiLi9jb21wb25lbnQvbG9naW5cIik7XG5cbiAgICB2YXIgYXBwID0gbW9kdWxlLmV4cG9ydHMgPSBuZXcgVnVlKHtcblxuICAgICAgICBlbDogJyNhcHAnLFxuXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG1lOiBudWxsLFxuICAgICAgICAgICAgYWNjZXNzVG9rZW46IG51bGwsXG4gICAgICAgICAgICBtYWluUGFuZWw6IFwiXCJcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICBcImx1bmNoLWxvZ2luXCI6IGxvZ2luQ29tcG9uZW50XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLiRvbihcImZiT25Mb2dpblwiLCBmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRvbihcImZiT25Mb2dvdXRcIiwgZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZ2xvYmFsLmZiQXN5bmNJbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGFwcC4kYnJvYWRjYXN0KFwiZmJSZWFkeVwiKTtcbiAgICB9O1xufSkod2luZG93KTsiLCIvKipcbiAqIEZpbHRlcnNcbiAqL1xuKGZ1bmN0aW9uKGdsb2JhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIFZ1ZSA9IHJlcXVpcmUoXCIuLy4uLy4uLy4uLy4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvdnVlL2Rpc3QvdnVlLmpzXCIpO1xuXG4gICAgVnVlLmZpbHRlcignZmJVc2VySW1hZ2VGaWx0ZXInLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIFwiaHR0cDovL2dyYXBoLmZhY2Vib29rLmNvbS9cIiArIGlkICsgXCIvcGljdHVyZT90eXBlPXNxdWFyZVwiO1xuICAgIH0pO1xuXG59KSh3aW5kb3cpOyJdfQ==
