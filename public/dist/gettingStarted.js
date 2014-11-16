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
var Vue = require("./../../../../../bower_components/vue/dist/vue.js");

Vue.filter('fbUserImageFilter', function (id) {
    return "http://graph.facebook.com/" + id + "/picture?type=square";
});
},{"./../../../../../bower_components/vue/dist/vue.js":1}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90ZWppdGFrL2Rldi9ob2JieS9sdW5jaGFwcC9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdGVqaXRhay9kZXYvaG9iYnkvbHVuY2hhcHAvYm93ZXJfY29tcG9uZW50cy92dWUvZGlzdC92dWUuanMiLCIvVXNlcnMvdGVqaXRhay9kZXYvaG9iYnkvbHVuY2hhcHAvcHVibGljL2pzL3RlamkvbHVuY2gvY29tcG9uZW50L2xvZ2luLmpzIiwiL1VzZXJzL3Rlaml0YWsvZGV2L2hvYmJ5L2x1bmNoYXBwL3B1YmxpYy9qcy90ZWppL2x1bmNoL2Zha2VfOTkzNWYwNDcuanMiLCIvVXNlcnMvdGVqaXRhay9kZXYvaG9iYnkvbHVuY2hhcHAvcHVibGljL2pzL3RlamkvbHVuY2gvZmlsdGVyL2ZpbHRlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxMk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBWdWUuanMgdjAuMTEuMFxuICogKGMpIDIwMTQgRXZhbiBZb3VcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlZ1ZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJWdWVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fSxcbi8qKioqKiovIFx0XHRcdGlkOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2Vcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgZXh0ZW5kID0gXy5leHRlbmRcblxuXHQvKipcblx0ICogVGhlIGV4cG9zZWQgVnVlIGNvbnN0cnVjdG9yLlxuXHQgKlxuXHQgKiBBUEkgY29udmVudGlvbnM6XG5cdCAqIC0gcHVibGljIEFQSSBtZXRob2RzL3Byb3BlcnRpZXMgYXJlIHByZWZpZXhlZCB3aXRoIGAkYFxuXHQgKiAtIGludGVybmFsIG1ldGhvZHMvcHJvcGVydGllcyBhcmUgcHJlZml4ZWQgd2l0aCBgX2Bcblx0ICogLSBub24tcHJlZml4ZWQgcHJvcGVydGllcyBhcmUgYXNzdW1lZCB0byBiZSBwcm94aWVkIHVzZXJcblx0ICogICBkYXRhLlxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuXHQgKiBAcHVibGljXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIFZ1ZSAob3B0aW9ucykge1xuXHQgIHRoaXMuX2luaXQob3B0aW9ucylcblx0fVxuXG5cdC8qKlxuXHQgKiBNaXhpbiBnbG9iYWwgQVBJXG5cdCAqL1xuXG5cdGV4dGVuZChWdWUsIF9fd2VicGFja19yZXF1aXJlX18oMikpXG5cblx0LyoqXG5cdCAqIFZ1ZSBhbmQgZXZlcnkgY29uc3RydWN0b3IgdGhhdCBleHRlbmRzIFZ1ZSBoYXMgYW5cblx0ICogYXNzb2NpYXRlZCBvcHRpb25zIG9iamVjdCwgd2hpY2ggY2FuIGJlIGFjY2Vzc2VkIGR1cmluZ1xuXHQgKiBjb21waWxhdGlvbiBzdGVwcyBhcyBgdGhpcy5jb25zdHJ1Y3Rvci5vcHRpb25zYC5cblx0ICpcblx0ICogVGhlc2UgY2FuIGJlIHNlZW4gYXMgdGhlIGRlZmF1bHQgb3B0aW9ucyBvZiBldmVyeVxuXHQgKiBWdWUgaW5zdGFuY2UuXG5cdCAqL1xuXG5cdFZ1ZS5vcHRpb25zID0ge1xuXHQgIGRpcmVjdGl2ZXMgIDogX193ZWJwYWNrX3JlcXVpcmVfXyg4KSxcblx0ICBmaWx0ZXJzICAgICA6IF9fd2VicGFja19yZXF1aXJlX18oOSksXG5cdCAgcGFydGlhbHMgICAgOiB7fSxcblx0ICB0cmFuc2l0aW9ucyA6IHt9LFxuXHQgIGNvbXBvbmVudHMgIDoge31cblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZCB1cCB0aGUgcHJvdG90eXBlXG5cdCAqL1xuXG5cdHZhciBwID0gVnVlLnByb3RvdHlwZVxuXG5cdC8qKlxuXHQgKiAkZGF0YSBoYXMgYSBzZXR0ZXIgd2hpY2ggZG9lcyBhIGJ1bmNoIG9mXG5cdCAqIHRlYXJkb3duL3NldHVwIHdvcmtcblx0ICovXG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHAsICckZGF0YScsIHtcblx0ICBnZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiB0aGlzLl9kYXRhXG5cdCAgfSxcblx0ICBzZXQ6IGZ1bmN0aW9uIChuZXdEYXRhKSB7XG5cdCAgICB0aGlzLl9zZXREYXRhKG5ld0RhdGEpXG5cdCAgfVxuXHR9KVxuXG5cdC8qKlxuXHQgKiBNaXhpbiBpbnRlcm5hbCBpbnN0YW5jZSBtZXRob2RzXG5cdCAqL1xuXG5cdGV4dGVuZChwLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKSlcblx0ZXh0ZW5kKHAsIF9fd2VicGFja19yZXF1aXJlX18oMTEpKVxuXHRleHRlbmQocCwgX193ZWJwYWNrX3JlcXVpcmVfXygxMikpXG5cdGV4dGVuZChwLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKSlcblxuXHQvKipcblx0ICogTWl4aW4gcHVibGljIEFQSSBtZXRob2RzXG5cdCAqL1xuXG5cdGV4dGVuZChwLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpKVxuXHRleHRlbmQocCwgX193ZWJwYWNrX3JlcXVpcmVfXyg0KSlcblx0ZXh0ZW5kKHAsIF9fd2VicGFja19yZXF1aXJlX18oNSkpXG5cdGV4dGVuZChwLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpKVxuXHRleHRlbmQocCwgX193ZWJwYWNrX3JlcXVpcmVfXyg3KSlcblxuXHRtb2R1bGUuZXhwb3J0cyA9IF8uVnVlID0gVnVlXG5cbi8qKiovIH0sXG4vKiAxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgbGFuZyAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNClcblx0dmFyIGV4dGVuZCA9IGxhbmcuZXh0ZW5kXG5cblx0ZXh0ZW5kKGV4cG9ydHMsIGxhbmcpXG5cdGV4dGVuZChleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDM1KSlcblx0ZXh0ZW5kKGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18oMzYpKVxuXHRleHRlbmQoZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXygzNykpXG5cdGV4dGVuZChleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDM4KSlcblxuLyoqKi8gfSxcbi8qIDIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgbWVyZ2VPcHRpb25zID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNClcblxuXHQvKipcblx0ICogRXhwb3NlIHVzZWZ1bCBpbnRlcm5hbHNcblx0ICovXG5cblx0ZXhwb3J0cy51dGlsICAgICAgID0gX1xuXHRleHBvcnRzLm5leHRUaWNrICAgPSBfLm5leHRUaWNrXG5cdGV4cG9ydHMuY29uZmlnICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG5cblx0LyoqXG5cdCAqIEVhY2ggaW5zdGFuY2UgY29uc3RydWN0b3IsIGluY2x1ZGluZyBWdWUsIGhhcyBhIHVuaXF1ZVxuXHQgKiBjaWQuIFRoaXMgZW5hYmxlcyB1cyB0byBjcmVhdGUgd3JhcHBlZCBcImNoaWxkXG5cdCAqIGNvbnN0cnVjdG9yc1wiIGZvciBwcm90b3R5cGFsIGluaGVyaXRhbmNlIGFuZCBjYWNoZSB0aGVtLlxuXHQgKi9cblxuXHRleHBvcnRzLmNpZCA9IDBcblx0dmFyIGNpZCA9IDFcblxuXHQvKipcblx0ICogQ2xhc3MgaW5laHJpdGFuY2Vcblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IGV4dGVuZE9wdGlvbnNcblx0ICovXG5cblx0ZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbiAoZXh0ZW5kT3B0aW9ucykge1xuXHQgIGV4dGVuZE9wdGlvbnMgPSBleHRlbmRPcHRpb25zIHx8IHt9XG5cdCAgdmFyIFN1cGVyID0gdGhpc1xuXHQgIHZhciBTdWIgPSBjcmVhdGVDbGFzcyhleHRlbmRPcHRpb25zLm5hbWUgfHwgJ1Z1ZUNvbXBvbmVudCcpXG5cdCAgU3ViLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VwZXIucHJvdG90eXBlKVxuXHQgIFN1Yi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdWJcblx0ICBTdWIuY2lkID0gY2lkKytcblx0ICBTdWIub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhcblx0ICAgIFN1cGVyLm9wdGlvbnMsXG5cdCAgICBleHRlbmRPcHRpb25zXG5cdCAgKVxuXHQgIFN1Ylsnc3VwZXInXSA9IFN1cGVyXG5cdCAgLy8gYWxsb3cgZnVydGhlciBleHRlbnNpb25cblx0ICBTdWIuZXh0ZW5kID0gU3VwZXIuZXh0ZW5kXG5cdCAgLy8gY3JlYXRlIGFzc2V0IHJlZ2lzdGVycywgc28gZXh0ZW5kZWQgY2xhc3Nlc1xuXHQgIC8vIGNhbiBoYXZlIHRoZWlyIHByaXZhdGUgYXNzZXRzIHRvby5cblx0ICBjcmVhdGVBc3NldFJlZ2lzdGVycyhTdWIpXG5cdCAgcmV0dXJuIFN1YlxuXHR9XG5cblx0LyoqXG5cdCAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgc3ViLWNsYXNzIGNvbnN0cnVjdG9yIHdpdGggdGhlXG5cdCAqIGdpdmVuIG5hbWUuIFRoaXMgZ2l2ZXMgdXMgbXVjaCBuaWNlciBvdXRwdXQgd2hlblxuXHQgKiBsb2dnaW5nIGluc3RhbmNlcyBpbiB0aGUgY29uc29sZS5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcblx0ICogQHJldHVybiB7RnVuY3Rpb259XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZUNsYXNzIChuYW1lKSB7XG5cdCAgcmV0dXJuIG5ldyBGdW5jdGlvbihcblx0ICAgICdyZXR1cm4gZnVuY3Rpb24gJyArIF8uY2FtZWxpemUobmFtZSkgK1xuXHQgICAgJyAob3B0aW9ucykgeyB0aGlzLl9pbml0KG9wdGlvbnMpIH0nXG5cdCAgKSgpXG5cdH1cblxuXHQvKipcblx0ICogUGx1Z2luIHN5c3RlbVxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luXG5cdCAqL1xuXG5cdGV4cG9ydHMudXNlID0gZnVuY3Rpb24gKHBsdWdpbikge1xuXHQgIC8vIGFkZGl0aW9uYWwgcGFyYW1ldGVyc1xuXHQgIHZhciBhcmdzID0gXy50b0FycmF5KGFyZ3VtZW50cywgMSlcblx0ICBhcmdzLnVuc2hpZnQodGhpcylcblx0ICBpZiAodHlwZW9mIHBsdWdpbi5pbnN0YWxsID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICBwbHVnaW4uaW5zdGFsbC5hcHBseShwbHVnaW4sIGFyZ3MpXG5cdCAgfSBlbHNlIHtcblx0ICAgIHBsdWdpbi5hcHBseShudWxsLCBhcmdzKVxuXHQgIH1cblx0ICByZXR1cm4gdGhpc1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZSBhc3NldCByZWdpc3RyYXRpb24gbWV0aG9kcyBvbiBhIGNvbnN0cnVjdG9yLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBDb25zdHJ1Y3RvclxuXHQgKi9cblxuXHR2YXIgYXNzZXRUeXBlcyA9IFtcblx0ICAnZGlyZWN0aXZlJyxcblx0ICAnZmlsdGVyJyxcblx0ICAncGFydGlhbCcsXG5cdCAgJ3RyYW5zaXRpb24nXG5cdF1cblxuXHRmdW5jdGlvbiBjcmVhdGVBc3NldFJlZ2lzdGVycyAoQ29uc3RydWN0b3IpIHtcblxuXHQgIC8qIEFzc2V0IHJlZ2lzdHJhdGlvbiBtZXRob2RzIHNoYXJlIHRoZSBzYW1lIHNpZ25hdHVyZTpcblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuXHQgICAqIEBwYXJhbSB7Kn0gZGVmaW5pdGlvblxuXHQgICAqL1xuXG5cdCAgYXNzZXRUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG5cdCAgICBDb25zdHJ1Y3Rvclt0eXBlXSA9IGZ1bmN0aW9uIChpZCwgZGVmaW5pdGlvbikge1xuXHQgICAgICBpZiAoIWRlZmluaXRpb24pIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zW3R5cGUgKyAncyddW2lkXVxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMub3B0aW9uc1t0eXBlICsgJ3MnXVtpZF0gPSBkZWZpbml0aW9uXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9KVxuXG5cdCAgLyoqXG5cdCAgICogQ29tcG9uZW50IHJlZ2lzdHJhdGlvbiBuZWVkcyB0byBhdXRvbWF0aWNhbGx5IGludm9rZVxuXHQgICAqIFZ1ZS5leHRlbmQgb24gb2JqZWN0IHZhbHVlcy5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuXHQgICAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSBkZWZpbml0aW9uXG5cdCAgICovXG5cblx0ICBDb25zdHJ1Y3Rvci5jb21wb25lbnQgPSBmdW5jdGlvbiAoaWQsIGRlZmluaXRpb24pIHtcblx0ICAgIGlmICghZGVmaW5pdGlvbikge1xuXHQgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNvbXBvbmVudHNbaWRdXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBpZiAoXy5pc1BsYWluT2JqZWN0KGRlZmluaXRpb24pKSB7XG5cdCAgICAgICAgZGVmaW5pdGlvbi5uYW1lID0gaWRcblx0ICAgICAgICBkZWZpbml0aW9uID0gXy5WdWUuZXh0ZW5kKGRlZmluaXRpb24pXG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5vcHRpb25zLmNvbXBvbmVudHNbaWRdID0gZGVmaW5pdGlvblxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdGNyZWF0ZUFzc2V0UmVnaXN0ZXJzKGV4cG9ydHMpXG5cbi8qKiovIH0sXG4vKiAzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIFdhdGNoZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KVxuXHR2YXIgdGV4dFBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpXG5cdHZhciBkaXJQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKVxuXHR2YXIgZXhwUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MSlcblx0dmFyIGZpbHRlclJFID0gL1tefF1cXHxbXnxdL1xuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIHZhbHVlIGZyb20gYW4gZXhwcmVzc2lvbiBvbiB0aGlzIHZtLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG5cdCAqIEByZXR1cm4geyp9XG5cdCAqL1xuXG5cdGV4cG9ydHMuJGdldCA9IGZ1bmN0aW9uIChleHApIHtcblx0ICB2YXIgcmVzID0gZXhwUGFyc2VyLnBhcnNlKGV4cClcblx0ICBpZiAocmVzKSB7XG5cdCAgICByZXR1cm4gcmVzLmdldC5jYWxsKHRoaXMsIHRoaXMpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgdmFsdWUgZnJvbSBhbiBleHByZXNzaW9uIG9uIHRoaXMgdm0uXG5cdCAqIFRoZSBleHByZXNzaW9uIG11c3QgYmUgYSB2YWxpZCBsZWZ0LWhhbmRcblx0ICogZXhwcmVzc2lvbiBpbiBhbiBhc3NpZ25tZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZXhwXG5cdCAqIEBwYXJhbSB7Kn0gdmFsXG5cdCAqL1xuXG5cdGV4cG9ydHMuJHNldCA9IGZ1bmN0aW9uIChleHAsIHZhbCkge1xuXHQgIHZhciByZXMgPSBleHBQYXJzZXIucGFyc2UoZXhwLCB0cnVlKVxuXHQgIGlmIChyZXMgJiYgcmVzLnNldCkge1xuXHQgICAgcmVzLnNldC5jYWxsKHRoaXMsIHRoaXMsIHZhbClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQWRkIGEgcHJvcGVydHkgb24gdGhlIFZNXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICogQHBhcmFtIHsqfSB2YWxcblx0ICovXG5cblx0ZXhwb3J0cy4kYWRkID0gZnVuY3Rpb24gKGtleSwgdmFsKSB7XG5cdCAgdGhpcy5fZGF0YS4kYWRkKGtleSwgdmFsKVxuXHR9XG5cblx0LyoqXG5cdCAqIERlbGV0ZSBhIHByb3BlcnR5IG9uIHRoZSBWTVxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqL1xuXG5cdGV4cG9ydHMuJGRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcblx0ICB0aGlzLl9kYXRhLiRkZWxldGUoa2V5KVxuXHR9XG5cblx0LyoqXG5cdCAqIFdhdGNoIGFuIGV4cHJlc3Npb24sIHRyaWdnZXIgY2FsbGJhY2sgd2hlbiBpdHNcblx0ICogdmFsdWUgY2hhbmdlcy5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtkZWVwXVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtpbW1lZGlhdGVdXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufSAtIHVud2F0Y2hGblxuXHQgKi9cblxuXHRleHBvcnRzLiR3YXRjaCA9IGZ1bmN0aW9uIChleHAsIGNiLCBkZWVwLCBpbW1lZGlhdGUpIHtcblx0ICB2YXIgdm0gPSB0aGlzXG5cdCAgdmFyIGtleSA9IGRlZXAgPyBleHAgKyAnKipkZWVwKionIDogZXhwXG5cdCAgdmFyIHdhdGNoZXIgPSB2bS5fdXNlcldhdGNoZXJzW2tleV1cblx0ICB2YXIgd3JhcHBlZENiID0gZnVuY3Rpb24gKHZhbCwgb2xkVmFsKSB7XG5cdCAgICBjYi5jYWxsKHZtLCB2YWwsIG9sZFZhbClcblx0ICB9XG5cdCAgaWYgKCF3YXRjaGVyKSB7XG5cdCAgICB3YXRjaGVyID0gdm0uX3VzZXJXYXRjaGVyc1trZXldID1cblx0ICAgICAgbmV3IFdhdGNoZXIodm0sIGV4cCwgd3JhcHBlZENiLCBudWxsLCBmYWxzZSwgZGVlcClcblx0ICB9IGVsc2Uge1xuXHQgICAgd2F0Y2hlci5hZGRDYih3cmFwcGVkQ2IpXG5cdCAgfVxuXHQgIGlmIChpbW1lZGlhdGUpIHtcblx0ICAgIHdyYXBwZWRDYih3YXRjaGVyLnZhbHVlKVxuXHQgIH1cblx0ICByZXR1cm4gZnVuY3Rpb24gdW53YXRjaEZuICgpIHtcblx0ICAgIHdhdGNoZXIucmVtb3ZlQ2Iod3JhcHBlZENiKVxuXHQgICAgaWYgKCF3YXRjaGVyLmFjdGl2ZSkge1xuXHQgICAgICB2bS5fdXNlcldhdGNoZXJzW2tleV0gPSBudWxsXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEV2YWx1YXRlIGEgdGV4dCBkaXJlY3RpdmUsIGluY2x1ZGluZyBmaWx0ZXJzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdGV4cG9ydHMuJGV2YWwgPSBmdW5jdGlvbiAodGV4dCkge1xuXHQgIC8vIGNoZWNrIGZvciBmaWx0ZXJzLlxuXHQgIGlmIChmaWx0ZXJSRS50ZXN0KHRleHQpKSB7XG5cdCAgICB2YXIgZGlyID0gZGlyUGFyc2VyLnBhcnNlKHRleHQpWzBdXG5cdCAgICAvLyB0aGUgZmlsdGVyIHJlZ2V4IGNoZWNrIG1pZ2h0IGdpdmUgZmFsc2UgcG9zaXRpdmVcblx0ICAgIC8vIGZvciBwaXBlcyBpbnNpZGUgc3RyaW5ncywgc28gaXQncyBwb3NzaWJsZSB0aGF0XG5cdCAgICAvLyB3ZSBkb24ndCBnZXQgYW55IGZpbHRlcnMgaGVyZVxuXHQgICAgcmV0dXJuIGRpci5maWx0ZXJzXG5cdCAgICAgID8gXy5hcHBseUZpbHRlcnMoXG5cdCAgICAgICAgICB0aGlzLiRnZXQoZGlyLmV4cHJlc3Npb24pLFxuXHQgICAgICAgICAgXy5yZXNvbHZlRmlsdGVycyh0aGlzLCBkaXIuZmlsdGVycykucmVhZCxcblx0ICAgICAgICAgIHRoaXNcblx0ICAgICAgICApXG5cdCAgICAgIDogdGhpcy4kZ2V0KGRpci5leHByZXNzaW9uKVxuXHQgIH0gZWxzZSB7XG5cdCAgICAvLyBubyBmaWx0ZXJcblx0ICAgIHJldHVybiB0aGlzLiRnZXQodGV4dClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogSW50ZXJwb2xhdGUgYSBwaWVjZSBvZiB0ZW1wbGF0ZSB0ZXh0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdGV4cG9ydHMuJGludGVycG9sYXRlID0gZnVuY3Rpb24gKHRleHQpIHtcblx0ICB2YXIgdG9rZW5zID0gdGV4dFBhcnNlci5wYXJzZSh0ZXh0KVxuXHQgIHZhciB2bSA9IHRoaXNcblx0ICBpZiAodG9rZW5zKSB7XG5cdCAgICByZXR1cm4gdG9rZW5zLmxlbmd0aCA9PT0gMVxuXHQgICAgICA/IHZtLiRldmFsKHRva2Vuc1swXS52YWx1ZSlcblx0ICAgICAgOiB0b2tlbnMubWFwKGZ1bmN0aW9uICh0b2tlbikge1xuXHQgICAgICAgICAgcmV0dXJuIHRva2VuLnRhZ1xuXHQgICAgICAgICAgICA/IHZtLiRldmFsKHRva2VuLnZhbHVlKVxuXHQgICAgICAgICAgICA6IHRva2VuLnZhbHVlXG5cdCAgICAgICAgfSkuam9pbignJylcblx0ICB9IGVsc2Uge1xuXHQgICAgcmV0dXJuIHRleHRcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogTG9nIGluc3RhbmNlIGRhdGEgYXMgYSBwbGFpbiBKUyBvYmplY3Rcblx0ICogc28gdGhhdCBpdCBpcyBlYXNpZXIgdG8gaW5zcGVjdCBpbiBjb25zb2xlLlxuXHQgKiBUaGlzIG1ldGhvZCBhc3N1bWVzIGNvbnNvbGUgaXMgYXZhaWxhYmxlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gW2tleV1cblx0ICovXG5cblx0ZXhwb3J0cy4kbG9nID0gZnVuY3Rpb24gKGtleSkge1xuXHQgIHZhciBkYXRhID0gdGhpc1trZXkgfHwgJ19kYXRhJ11cblx0ICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKSlcblx0fVxuXG4vKioqLyB9LFxuLyogNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciB0cmFuc2l0aW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MilcblxuXHQvKipcblx0ICogQXBwZW5kIGluc3RhbmNlIHRvIHRhcmdldFxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpdGhUcmFuc2l0aW9uXSAtIGRlZmF1bHRzIHRvIHRydWVcblx0ICovXG5cblx0ZXhwb3J0cy4kYXBwZW5kVG8gPSBmdW5jdGlvbiAodGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24pIHtcblx0ICB0YXJnZXQgPSBxdWVyeSh0YXJnZXQpXG5cdCAgdmFyIHRhcmdldElzRGV0YWNoZWQgPSAhXy5pbkRvYyh0YXJnZXQpXG5cdCAgdmFyIG9wID0gd2l0aFRyYW5zaXRpb24gPT09IGZhbHNlIHx8IHRhcmdldElzRGV0YWNoZWRcblx0ICAgID8gYXBwZW5kXG5cdCAgICA6IHRyYW5zaXRpb24uYXBwZW5kXG5cdCAgaW5zZXJ0KHRoaXMsIHRhcmdldCwgb3AsIHRhcmdldElzRGV0YWNoZWQsIGNiKVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogUHJlcGVuZCBpbnN0YW5jZSB0byB0YXJnZXRcblx0ICpcblx0ICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFt3aXRoVHJhbnNpdGlvbl0gLSBkZWZhdWx0cyB0byB0cnVlXG5cdCAqL1xuXG5cdGV4cG9ydHMuJHByZXBlbmRUbyA9IGZ1bmN0aW9uICh0YXJnZXQsIGNiLCB3aXRoVHJhbnNpdGlvbikge1xuXHQgIHRhcmdldCA9IHF1ZXJ5KHRhcmdldClcblx0ICBpZiAodGFyZ2V0Lmhhc0NoaWxkTm9kZXMoKSkge1xuXHQgICAgdGhpcy4kYmVmb3JlKHRhcmdldC5maXJzdENoaWxkLCBjYiwgd2l0aFRyYW5zaXRpb24pXG5cdCAgfSBlbHNlIHtcblx0ICAgIHRoaXMuJGFwcGVuZFRvKHRhcmdldCwgY2IsIHdpdGhUcmFuc2l0aW9uKVxuXHQgIH1cblx0ICByZXR1cm4gdGhpc1xuXHR9XG5cblx0LyoqXG5cdCAqIEluc2VydCBpbnN0YW5jZSBiZWZvcmUgdGFyZ2V0XG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICogQHBhcmFtIHtCb29sZWFufSBbd2l0aFRyYW5zaXRpb25dIC0gZGVmYXVsdHMgdG8gdHJ1ZVxuXHQgKi9cblxuXHRleHBvcnRzLiRiZWZvcmUgPSBmdW5jdGlvbiAodGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24pIHtcblx0ICB0YXJnZXQgPSBxdWVyeSh0YXJnZXQpXG5cdCAgdmFyIHRhcmdldElzRGV0YWNoZWQgPSAhXy5pbkRvYyh0YXJnZXQpXG5cdCAgdmFyIG9wID0gd2l0aFRyYW5zaXRpb24gPT09IGZhbHNlIHx8IHRhcmdldElzRGV0YWNoZWRcblx0ICAgID8gYmVmb3JlXG5cdCAgICA6IHRyYW5zaXRpb24uYmVmb3JlXG5cdCAgaW5zZXJ0KHRoaXMsIHRhcmdldCwgb3AsIHRhcmdldElzRGV0YWNoZWQsIGNiKVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogSW5zZXJ0IGluc3RhbmNlIGFmdGVyIHRhcmdldFxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpdGhUcmFuc2l0aW9uXSAtIGRlZmF1bHRzIHRvIHRydWVcblx0ICovXG5cblx0ZXhwb3J0cy4kYWZ0ZXIgPSBmdW5jdGlvbiAodGFyZ2V0LCBjYiwgd2l0aFRyYW5zaXRpb24pIHtcblx0ICB0YXJnZXQgPSBxdWVyeSh0YXJnZXQpXG5cdCAgaWYgKHRhcmdldC5uZXh0U2libGluZykge1xuXHQgICAgdGhpcy4kYmVmb3JlKHRhcmdldC5uZXh0U2libGluZywgY2IsIHdpdGhUcmFuc2l0aW9uKVxuXHQgIH0gZWxzZSB7XG5cdCAgICB0aGlzLiRhcHBlbmRUbyh0YXJnZXQucGFyZW50Tm9kZSwgY2IsIHdpdGhUcmFuc2l0aW9uKVxuXHQgIH1cblx0ICByZXR1cm4gdGhpc1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBpbnN0YW5jZSBmcm9tIERPTVxuXHQgKlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dpdGhUcmFuc2l0aW9uXSAtIGRlZmF1bHRzIHRvIHRydWVcblx0ICovXG5cblx0ZXhwb3J0cy4kcmVtb3ZlID0gZnVuY3Rpb24gKGNiLCB3aXRoVHJhbnNpdGlvbikge1xuXHQgIHZhciBpbkRvYyA9IHRoaXMuX2lzQXR0YWNoZWQgJiYgXy5pbkRvYyh0aGlzLiRlbClcblx0ICAvLyBpZiB3ZSBhcmUgbm90IGluIGRvY3VtZW50LCBubyBuZWVkIHRvIGNoZWNrXG5cdCAgLy8gZm9yIHRyYW5zaXRpb25zXG5cdCAgaWYgKCFpbkRvYykgd2l0aFRyYW5zaXRpb24gPSBmYWxzZVxuXHQgIHZhciBvcFxuXHQgIHZhciBzZWxmID0gdGhpc1xuXHQgIHZhciByZWFsQ2IgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICBpZiAoaW5Eb2MpIHNlbGYuX2NhbGxIb29rKCdkZXRhY2hlZCcpXG5cdCAgICBpZiAoY2IpIGNiKClcblx0ICB9XG5cdCAgaWYgKFxuXHQgICAgdGhpcy5faXNCbG9jayAmJlxuXHQgICAgIXRoaXMuX2Jsb2NrRnJhZ21lbnQuaGFzQ2hpbGROb2RlcygpXG5cdCAgKSB7XG5cdCAgICBvcCA9IHdpdGhUcmFuc2l0aW9uID09PSBmYWxzZVxuXHQgICAgICA/IGFwcGVuZFxuXHQgICAgICA6IHRyYW5zaXRpb24ucmVtb3ZlVGhlbkFwcGVuZCBcblx0ICAgIGJsb2NrT3AodGhpcywgdGhpcy5fYmxvY2tGcmFnbWVudCwgb3AsIHJlYWxDYilcblx0ICB9IGVsc2Uge1xuXHQgICAgb3AgPSB3aXRoVHJhbnNpdGlvbiA9PT0gZmFsc2Vcblx0ICAgICAgPyByZW1vdmVcblx0ICAgICAgOiB0cmFuc2l0aW9uLnJlbW92ZVxuXHQgICAgb3AodGhpcy4kZWwsIHRoaXMsIHJlYWxDYilcblx0ICB9XG5cdCAgcmV0dXJuIHRoaXNcblx0fVxuXG5cdC8qKlxuXHQgKiBTaGFyZWQgRE9NIGluc2VydGlvbiBmdW5jdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IG9wXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gdGFyZ2V0SXNEZXRhY2hlZFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGluc2VydCAodm0sIHRhcmdldCwgb3AsIHRhcmdldElzRGV0YWNoZWQsIGNiKSB7XG5cdCAgdmFyIHNob3VsZENhbGxIb29rID1cblx0ICAgICF0YXJnZXRJc0RldGFjaGVkICYmXG5cdCAgICAhdm0uX2lzQXR0YWNoZWQgJiZcblx0ICAgICFfLmluRG9jKHZtLiRlbClcblx0ICBpZiAodm0uX2lzQmxvY2spIHtcblx0ICAgIGJsb2NrT3Aodm0sIHRhcmdldCwgb3AsIGNiKVxuXHQgIH0gZWxzZSB7XG5cdCAgICBvcCh2bS4kZWwsIHRhcmdldCwgdm0sIGNiKVxuXHQgIH1cblx0ICBpZiAoc2hvdWxkQ2FsbEhvb2spIHtcblx0ICAgIHZtLl9jYWxsSG9vaygnYXR0YWNoZWQnKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBFeGVjdXRlIGEgdHJhbnNpdGlvbiBvcGVyYXRpb24gb24gYSBibG9jayBpbnN0YW5jZSxcblx0ICogaXRlcmF0aW5nIHRocm91Z2ggYWxsIGl0cyBibG9jayBub2Rlcy5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IG9wXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGJsb2NrT3AgKHZtLCB0YXJnZXQsIG9wLCBjYikge1xuXHQgIHZhciBjdXJyZW50ID0gdm0uX2Jsb2NrU3RhcnRcblx0ICB2YXIgZW5kID0gdm0uX2Jsb2NrRW5kXG5cdCAgdmFyIG5leHRcblx0ICB3aGlsZSAobmV4dCAhPT0gZW5kKSB7XG5cdCAgICBuZXh0ID0gY3VycmVudC5uZXh0U2libGluZ1xuXHQgICAgb3AoY3VycmVudCwgdGFyZ2V0LCB2bSlcblx0ICAgIGN1cnJlbnQgPSBuZXh0XG5cdCAgfVxuXHQgIG9wKGVuZCwgdGFyZ2V0LCB2bSwgY2IpXG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgZm9yIHNlbGVjdG9yc1xuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ3xFbGVtZW50fSBlbFxuXHQgKi9cblxuXHRmdW5jdGlvbiBxdWVyeSAoZWwpIHtcblx0ICByZXR1cm4gdHlwZW9mIGVsID09PSAnc3RyaW5nJ1xuXHQgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuXHQgICAgOiBlbFxuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGVuZCBvcGVyYXRpb24gdGhhdCB0YWtlcyBhIGNhbGxiYWNrLlxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IGVsXG5cdCAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7VnVlfSB2bSAtIHVudXNlZFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGFwcGVuZCAoZWwsIHRhcmdldCwgdm0sIGNiKSB7XG5cdCAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsKVxuXHQgIGlmIChjYikgY2IoKVxuXHR9XG5cblx0LyoqXG5cdCAqIEluc2VydEJlZm9yZSBvcGVyYXRpb24gdGhhdCB0YWtlcyBhIGNhbGxiYWNrLlxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IGVsXG5cdCAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7VnVlfSB2bSAtIHVudXNlZFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGJlZm9yZSAoZWwsIHRhcmdldCwgdm0sIGNiKSB7XG5cdCAgXy5iZWZvcmUoZWwsIHRhcmdldClcblx0ICBpZiAoY2IpIGNiKClcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgb3BlcmF0aW9uIHRoYXQgdGFrZXMgYSBjYWxsYmFjay5cblx0ICpcblx0ICogQHBhcmFtIHtOb2RlfSBlbFxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm0gLSB1bnVzZWRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuXHQgKi9cblxuXHRmdW5jdGlvbiByZW1vdmUgKGVsLCB2bSwgY2IpIHtcblx0ICBfLnJlbW92ZShlbClcblx0ICBpZiAoY2IpIGNiKClcblx0fVxuXG4vKioqLyB9LFxuLyogNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cblx0LyoqXG5cdCAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuXHQgKi9cblxuXHRleHBvcnRzLiRvbiA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcblx0ICAodGhpcy5fZXZlbnRzW2V2ZW50XSB8fCAodGhpcy5fZXZlbnRzW2V2ZW50XSA9IFtdKSlcblx0ICAgIC5wdXNoKGZuKVxuXHQgIG1vZGlmeUxpc3RlbmVyQ291bnQodGhpcywgZXZlbnQsIDEpXG5cdCAgcmV0dXJuIHRoaXNcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcblx0ICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG5cdCAqL1xuXG5cdGV4cG9ydHMuJG9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG5cdCAgdmFyIHNlbGYgPSB0aGlzXG5cdCAgZnVuY3Rpb24gb24gKCkge1xuXHQgICAgc2VsZi4kb2ZmKGV2ZW50LCBvbilcblx0ICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblx0ICB9XG5cdCAgb24uZm4gPSBmblxuXHQgIHRoaXMuJG9uKGV2ZW50LCBvbilcblx0ICByZXR1cm4gdGhpc1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXG5cdCAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cblx0ICovXG5cblx0ZXhwb3J0cy4kb2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuXHQgIHZhciBjYnNcblx0ICAvLyBhbGxcblx0ICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcblx0ICAgIGlmICh0aGlzLiRwYXJlbnQpIHtcblx0ICAgICAgZm9yIChldmVudCBpbiB0aGlzLl9ldmVudHMpIHtcblx0ICAgICAgICBjYnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG5cdCAgICAgICAgaWYgKGNicykge1xuXHQgICAgICAgICAgbW9kaWZ5TGlzdGVuZXJDb3VudCh0aGlzLCBldmVudCwgLWNicy5sZW5ndGgpXG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICB0aGlzLl9ldmVudHMgPSB7fVxuXHQgICAgcmV0dXJuIHRoaXNcblx0ICB9XG5cdCAgLy8gc3BlY2lmaWMgZXZlbnRcblx0ICBjYnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG5cdCAgaWYgKCFjYnMpIHtcblx0ICAgIHJldHVybiB0aGlzXG5cdCAgfVxuXHQgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdCAgICBtb2RpZnlMaXN0ZW5lckNvdW50KHRoaXMsIGV2ZW50LCAtY2JzLmxlbmd0aClcblx0ICAgIHRoaXMuX2V2ZW50c1tldmVudF0gPSBudWxsXG5cdCAgICByZXR1cm4gdGhpc1xuXHQgIH1cblx0ICAvLyBzcGVjaWZpYyBoYW5kbGVyXG5cdCAgdmFyIGNiXG5cdCAgdmFyIGkgPSBjYnMubGVuZ3RoXG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAgY2IgPSBjYnNbaV1cblx0ICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG5cdCAgICAgIG1vZGlmeUxpc3RlbmVyQ291bnQodGhpcywgZXZlbnQsIC0xKVxuXHQgICAgICBjYnMuc3BsaWNlKGksIDEpXG5cdCAgICAgIGJyZWFrXG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogVHJpZ2dlciBhbiBldmVudCBvbiBzZWxmLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcblx0ICovXG5cblx0ZXhwb3J0cy4kZW1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHQgIHRoaXMuX2V2ZW50Q2FuY2VsbGVkID0gZmFsc2Vcblx0ICB2YXIgY2JzID0gdGhpcy5fZXZlbnRzW2V2ZW50XVxuXHQgIGlmIChjYnMpIHtcblx0ICAgIC8vIGF2b2lkIGxlYWtpbmcgYXJndW1lbnRzOlxuXHQgICAgLy8gaHR0cDovL2pzcGVyZi5jb20vY2xvc3VyZS13aXRoLWFyZ3VtZW50c1xuXHQgICAgdmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMVxuXHQgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoaSlcblx0ICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV1cblx0ICAgIH1cblx0ICAgIGkgPSAwXG5cdCAgICBjYnMgPSBjYnMubGVuZ3RoID4gMVxuXHQgICAgICA/IF8udG9BcnJheShjYnMpXG5cdCAgICAgIDogY2JzXG5cdCAgICBmb3IgKHZhciBsID0gY2JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgICBpZiAoY2JzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpID09PSBmYWxzZSkge1xuXHQgICAgICAgIHRoaXMuX2V2ZW50Q2FuY2VsbGVkID0gdHJ1ZVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogUmVjdXJzaXZlbHkgYnJvYWRjYXN0IGFuIGV2ZW50IHRvIGFsbCBjaGlsZHJlbiBpbnN0YW5jZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgKiBAcGFyYW0gey4uLip9IGFkZGl0aW9uYWwgYXJndW1lbnRzXG5cdCAqL1xuXG5cdGV4cG9ydHMuJGJyb2FkY2FzdCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHQgIC8vIGlmIG5vIGNoaWxkIGhhcyByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LFxuXHQgIC8vIHRoZW4gdGhlcmUncyBubyBuZWVkIHRvIGJyb2FkY2FzdC5cblx0ICBpZiAoIXRoaXMuX2V2ZW50c0NvdW50W2V2ZW50XSkgcmV0dXJuXG5cdCAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW5cblx0ICBpZiAoY2hpbGRyZW4pIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG5cdCAgICAgIGNoaWxkLiRlbWl0LmFwcGx5KGNoaWxkLCBhcmd1bWVudHMpXG5cdCAgICAgIGlmICghY2hpbGQuX2V2ZW50Q2FuY2VsbGVkKSB7XG5cdCAgICAgICAgY2hpbGQuJGJyb2FkY2FzdC5hcHBseShjaGlsZCwgYXJndW1lbnRzKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogUmVjdXJzaXZlbHkgcHJvcGFnYXRlIGFuIGV2ZW50IHVwIHRoZSBwYXJlbnQgY2hhaW4uXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgKiBAcGFyYW0gey4uLip9IGFkZGl0aW9uYWwgYXJndW1lbnRzXG5cdCAqL1xuXG5cdGV4cG9ydHMuJGRpc3BhdGNoID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnRcblx0ICB3aGlsZSAocGFyZW50KSB7XG5cdCAgICBwYXJlbnQuJGVtaXQuYXBwbHkocGFyZW50LCBhcmd1bWVudHMpXG5cdCAgICBwYXJlbnQgPSBwYXJlbnQuX2V2ZW50Q2FuY2VsbGVkXG5cdCAgICAgID8gbnVsbFxuXHQgICAgICA6IHBhcmVudC4kcGFyZW50XG5cdCAgfVxuXHQgIHJldHVybiB0aGlzXG5cdH1cblxuXHQvKipcblx0ICogTW9kaWZ5IHRoZSBsaXN0ZW5lciBjb3VudHMgb24gYWxsIHBhcmVudHMuXG5cdCAqIFRoaXMgYm9va2tlZXBpbmcgYWxsb3dzICRicm9hZGNhc3QgdG8gcmV0dXJuIGVhcmx5IHdoZW5cblx0ICogbm8gY2hpbGQgaGFzIGxpc3RlbmVkIHRvIGEgY2VydGFpbiBldmVudC5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgKiBAcGFyYW0ge051bWJlcn0gY291bnRcblx0ICovXG5cblx0dmFyIGhvb2tSRSA9IC9eaG9vazovXG5cdGZ1bmN0aW9uIG1vZGlmeUxpc3RlbmVyQ291bnQgKHZtLCBldmVudCwgY291bnQpIHtcblx0ICB2YXIgcGFyZW50ID0gdm0uJHBhcmVudFxuXHQgIC8vIGhvb2tzIGRvIG5vdCBnZXQgYnJvYWRjYXN0ZWQgc28gbm8gbmVlZFxuXHQgIC8vIHRvIGRvIGJvb2trZWVwaW5nIGZvciB0aGVtXG5cdCAgaWYgKCFwYXJlbnQgfHwgIWNvdW50IHx8IGhvb2tSRS50ZXN0KGV2ZW50KSkgcmV0dXJuXG5cdCAgd2hpbGUgKHBhcmVudCkge1xuXHQgICAgcGFyZW50Ll9ldmVudHNDb3VudFtldmVudF0gPVxuXHQgICAgICAocGFyZW50Ll9ldmVudHNDb3VudFtldmVudF0gfHwgMCkgKyBjb3VudFxuXHQgICAgcGFyZW50ID0gcGFyZW50LiRwYXJlbnRcblx0ICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBjaGlsZCBpbnN0YW5jZSB0aGF0IHByb3RvdHlwYWxseSBpbmVocml0c1xuXHQgKiBkYXRhIG9uIHBhcmVudC4gVG8gYWNoaWV2ZSB0aGF0IHdlIGNyZWF0ZSBhbiBpbnRlcm1lZGlhdGVcblx0ICogY29uc3RydWN0b3Igd2l0aCBpdHMgcHJvdG90eXBlIHBvaW50aW5nIHRvIHBhcmVudC5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdHNcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW0Jhc2VDdG9yXVxuXHQgKiBAcmV0dXJuIHtWdWV9XG5cdCAqIEBwdWJsaWNcblx0ICovXG5cblx0ZXhwb3J0cy4kYWRkQ2hpbGQgPSBmdW5jdGlvbiAob3B0cywgQmFzZUN0b3IpIHtcblx0ICBCYXNlQ3RvciA9IEJhc2VDdG9yIHx8IF8uVnVlXG5cdCAgb3B0cyA9IG9wdHMgfHwge31cblx0ICB2YXIgcGFyZW50ID0gdGhpc1xuXHQgIHZhciBDaGlsZFZ1ZVxuXHQgIHZhciBpbmhlcml0ID0gb3B0cy5pbmhlcml0ICE9PSB1bmRlZmluZWRcblx0ICAgID8gb3B0cy5pbmhlcml0XG5cdCAgICA6IEJhc2VDdG9yLm9wdGlvbnMuaW5oZXJpdFxuXHQgIGlmIChpbmhlcml0KSB7XG5cdCAgICB2YXIgY3RvcnMgPSBwYXJlbnQuX2NoaWxkQ3RvcnNcblx0ICAgIGlmICghY3RvcnMpIHtcblx0ICAgICAgY3RvcnMgPSBwYXJlbnQuX2NoaWxkQ3RvcnMgPSB7fVxuXHQgICAgfVxuXHQgICAgQ2hpbGRWdWUgPSBjdG9yc1tCYXNlQ3Rvci5jaWRdXG5cdCAgICBpZiAoIUNoaWxkVnVlKSB7XG5cdCAgICAgIHZhciBjbGFzc05hbWUgPSBCYXNlQ3Rvci5uYW1lIHx8ICdWdWVDb21wb25lbnQnXG5cdCAgICAgIENoaWxkVnVlID0gbmV3IEZ1bmN0aW9uKFxuXHQgICAgICAgICdyZXR1cm4gZnVuY3Rpb24gJyArIGNsYXNzTmFtZSArICcgKG9wdGlvbnMpIHsnICtcblx0ICAgICAgICAndGhpcy5jb25zdHJ1Y3RvciA9ICcgKyBjbGFzc05hbWUgKyAnOycgK1xuXHQgICAgICAgICd0aGlzLl9pbml0KG9wdGlvbnMpIH0nXG5cdCAgICAgICkoKVxuXHQgICAgICBDaGlsZFZ1ZS5vcHRpb25zID0gQmFzZUN0b3Iub3B0aW9uc1xuXHQgICAgICBDaGlsZFZ1ZS5wcm90b3R5cGUgPSB0aGlzXG5cdCAgICAgIGN0b3JzW0Jhc2VDdG9yLmNpZF0gPSBDaGlsZFZ1ZVxuXHQgICAgfVxuXHQgIH0gZWxzZSB7XG5cdCAgICBDaGlsZFZ1ZSA9IEJhc2VDdG9yXG5cdCAgfVxuXHQgIG9wdHMuX3BhcmVudCA9IHBhcmVudFxuXHQgIG9wdHMuX3Jvb3QgPSBwYXJlbnQuJHJvb3Rcblx0ICB2YXIgY2hpbGQgPSBuZXcgQ2hpbGRWdWUob3B0cylcblx0ICBpZiAoIXRoaXMuX2NoaWxkcmVuKSB7XG5cdCAgICB0aGlzLl9jaGlsZHJlbiA9IFtdXG5cdCAgfVxuXHQgIHRoaXMuX2NoaWxkcmVuLnB1c2goY2hpbGQpXG5cdCAgcmV0dXJuIGNoaWxkXG5cdH1cblxuLyoqKi8gfSxcbi8qIDcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgY29tcGlsZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDMpXG5cblx0LyoqXG5cdCAqIFNldCBpbnN0YW5jZSB0YXJnZXQgZWxlbWVudCBhbmQga2ljayBvZmYgdGhlIGNvbXBpbGF0aW9uXG5cdCAqIHByb2Nlc3MuIFRoZSBwYXNzZWQgaW4gYGVsYCBjYW4gYmUgYSBzZWxlY3RvciBzdHJpbmcsIGFuXG5cdCAqIGV4aXN0aW5nIEVsZW1lbnQsIG9yIGEgRG9jdW1lbnRGcmFnbWVudCAoZm9yIGJsb2NrXG5cdCAqIGluc3RhbmNlcykuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fHN0cmluZ30gZWxcblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHRleHBvcnRzLiRtb3VudCA9IGZ1bmN0aW9uIChlbCkge1xuXHQgIGlmICh0aGlzLl9pc0NvbXBpbGVkKSB7XG5cdCAgICBfLndhcm4oJyRtb3VudCgpIHNob3VsZCBiZSBjYWxsZWQgb25seSBvbmNlLicpXG5cdCAgICByZXR1cm5cblx0ICB9XG5cdCAgaWYgKCFlbCkge1xuXHQgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHQgIH0gZWxzZSBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuXHQgICAgdmFyIHNlbGVjdG9yID0gZWxcblx0ICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcblx0ICAgIGlmICghZWwpIHtcblx0ICAgICAgXy53YXJuKCdDYW5ub3QgZmluZCBlbGVtZW50OiAnICsgc2VsZWN0b3IpXG5cdCAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgIH1cblx0ICB0aGlzLl9jb21waWxlKGVsKVxuXHQgIHRoaXMuX2lzQ29tcGlsZWQgPSB0cnVlXG5cdCAgdGhpcy5fY2FsbEhvb2soJ2NvbXBpbGVkJylcblx0ICBpZiAoXy5pbkRvYyh0aGlzLiRlbCkpIHtcblx0ICAgIHRoaXMuX2NhbGxIb29rKCdhdHRhY2hlZCcpXG5cdCAgICB0aGlzLl9pbml0RE9NSG9va3MoKVxuXHQgICAgcmVhZHkuY2FsbCh0aGlzKVxuXHQgIH0gZWxzZSB7XG5cdCAgICB0aGlzLl9pbml0RE9NSG9va3MoKVxuXHQgICAgdGhpcy4kb25jZSgnaG9vazphdHRhY2hlZCcsIHJlYWR5KVxuXHQgIH1cblx0ICByZXR1cm4gdGhpc1xuXHR9XG5cblx0LyoqXG5cdCAqIE1hcmsgYW4gaW5zdGFuY2UgYXMgcmVhZHkuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHJlYWR5ICgpIHtcblx0ICB0aGlzLl9pc0F0dGFjaGVkID0gdHJ1ZVxuXHQgIHRoaXMuX2lzUmVhZHkgPSB0cnVlXG5cdCAgdGhpcy5fY2FsbEhvb2soJ3JlYWR5Jylcblx0fVxuXG5cdC8qKlxuXHQgKiBUZWFyZG93biBhbiBpbnN0YW5jZSwgdW5vYnNlcnZlcyB0aGUgZGF0YSwgdW5iaW5kIGFsbCB0aGVcblx0ICogZGlyZWN0aXZlcywgdHVybiBvZmYgYWxsIHRoZSBldmVudCBsaXN0ZW5lcnMsIGV0Yy5cblx0ICpcblx0ICogQHBhcmFtIHtCb29sZWFufSByZW1vdmUgLSB3aGV0aGVyIHRvIHJlbW92ZSB0aGUgRE9NIG5vZGUuXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cblx0ZXhwb3J0cy4kZGVzdHJveSA9IGZ1bmN0aW9uIChyZW1vdmUpIHtcblx0ICBpZiAodGhpcy5faXNEZXN0cm95ZWQpIHtcblx0ICAgIHJldHVyblxuXHQgIH1cblx0ICB0aGlzLl9jYWxsSG9vaygnYmVmb3JlRGVzdHJveScpXG5cdCAgdGhpcy5faXNCZWluZ0Rlc3Ryb3llZCA9IHRydWVcblx0ICAvLyByZW1vdmUgRE9NIGVsZW1lbnRcblx0ICBpZiAocmVtb3ZlICYmIHRoaXMuJGVsKSB7XG5cdCAgICB0aGlzLiRyZW1vdmUoKVxuXHQgIH1cblx0ICB2YXIgaVxuXHQgIC8vIHJlbW92ZSBzZWxmIGZyb20gcGFyZW50LiBvbmx5IG5lY2Vzc2FyeVxuXHQgIC8vIGlmIHBhcmVudCBpcyBub3QgYmVpbmcgZGVzdHJveWVkIGFzIHdlbGwuXG5cdCAgdmFyIHBhcmVudCA9IHRoaXMuJHBhcmVudFxuXHQgIGlmIChwYXJlbnQgJiYgIXBhcmVudC5faXNCZWluZ0Rlc3Ryb3llZCkge1xuXHQgICAgaSA9IHBhcmVudC5fY2hpbGRyZW4uaW5kZXhPZih0aGlzKVxuXHQgICAgcGFyZW50Ll9jaGlsZHJlbi5zcGxpY2UoaSwgMSlcblx0ICB9XG5cdCAgLy8gZGVzdHJveSBhbGwgY2hpbGRyZW4uXG5cdCAgaWYgKHRoaXMuX2NoaWxkcmVuKSB7XG5cdCAgICBpID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoXG5cdCAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgIHRoaXMuX2NoaWxkcmVuW2ldLiRkZXN0cm95KClcblx0ICAgIH1cblx0ICB9XG5cdCAgLy8gdGVhcmRvd24gYWxsIGRpcmVjdGl2ZXMuIHRoaXMgYWxzbyB0ZWFyc2Rvd24gYWxsXG5cdCAgLy8gZGlyZWN0aXZlLW93bmVkIHdhdGNoZXJzLlxuXHQgIGkgPSB0aGlzLl9kaXJlY3RpdmVzLmxlbmd0aFxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIHRoaXMuX2RpcmVjdGl2ZXNbaV0uX3RlYXJkb3duKClcblx0ICB9XG5cdCAgLy8gdGVhcmRvd24gYWxsIHVzZXIgd2F0Y2hlcnMuXG5cdCAgZm9yIChpIGluIHRoaXMuX3VzZXJXYXRjaGVycykge1xuXHQgICAgdGhpcy5fdXNlcldhdGNoZXJzW2ldLnRlYXJkb3duKClcblx0ICB9XG5cdCAgLy8gY2xlYW4gdXBcblx0ICBpZiAodGhpcy4kZWwpIHtcblx0ICAgIHRoaXMuJGVsLl9fdnVlX18gPSBudWxsXG5cdCAgfVxuXHQgIC8vIHJlbW92ZSByZWZlcmVuY2UgZnJvbSBkYXRhIG9iXG5cdCAgdGhpcy5fZGF0YS5fX29iX18ucmVtb3ZlVm0odGhpcylcblx0ICB0aGlzLl9kYXRhID1cblx0ICB0aGlzLl93YXRjaGVycyA9XG5cdCAgdGhpcy5fdXNlcldhdGNoZXJzID1cblx0ICB0aGlzLl93YXRjaGVyTGlzdCA9XG5cdCAgdGhpcy4kZWwgPVxuXHQgIHRoaXMuJHBhcmVudCA9XG5cdCAgdGhpcy4kcm9vdCA9XG5cdCAgdGhpcy5fY2hpbGRyZW4gPVxuXHQgIHRoaXMuX2JpbmRpbmdzID1cblx0ICB0aGlzLl9kaXJlY3RpdmVzID0gbnVsbFxuXHQgIC8vIGNhbGwgdGhlIGxhc3QgaG9vay4uLlxuXHQgIHRoaXMuX2lzRGVzdHJveWVkID0gdHJ1ZVxuXHQgIHRoaXMuX2NhbGxIb29rKCdkZXN0cm95ZWQnKVxuXHQgIC8vIHR1cm4gb2ZmIGFsbCBpbnN0YW5jZSBsaXN0ZW5lcnMuXG5cdCAgdGhpcy4kb2ZmKClcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXJ0aWFsbHkgY29tcGlsZSBhIHBpZWNlIG9mIERPTSBhbmQgcmV0dXJuIGFcblx0ICogZGVjb21waWxlIGZ1bmN0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gZWxcblx0ICogQHJldHVybiB7RnVuY3Rpb259XG5cdCAqL1xuXG5cdGV4cG9ydHMuJGNvbXBpbGUgPSBmdW5jdGlvbiAoZWwpIHtcblx0ICByZXR1cm4gY29tcGlsZShlbCwgdGhpcy4kb3B0aW9ucywgdHJ1ZSkodGhpcywgZWwpXG5cdH1cblxuLyoqKi8gfSxcbi8qIDggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8vIG1hbmlwdWxhdGlvbiBkaXJlY3RpdmVzXG5cdGV4cG9ydHMudGV4dCAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpXG5cdGV4cG9ydHMuaHRtbCAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpXG5cdGV4cG9ydHMuYXR0ciAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpXG5cdGV4cG9ydHMuc2hvdyAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjApXG5cdGV4cG9ydHNbJ2NsYXNzJ10gICA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpXG5cdGV4cG9ydHMuZWwgICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpXG5cdGV4cG9ydHMucmVmICAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpXG5cdGV4cG9ydHMuY2xvYWsgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpXG5cdGV4cG9ydHMuc3R5bGUgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpXG5cdGV4cG9ydHMucGFydGlhbCAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjYpXG5cdGV4cG9ydHMudHJhbnNpdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMjcpXG5cblx0Ly8gZXZlbnQgbGlzdGVuZXIgZGlyZWN0aXZlc1xuXHRleHBvcnRzLm9uICAgICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KVxuXHRleHBvcnRzLm1vZGVsICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ0KVxuXG5cdC8vIGNoaWxkIHZtIGRpcmVjdGl2ZXNcblx0ZXhwb3J0cy5jb21wb25lbnQgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOSlcblx0ZXhwb3J0cy5yZXBlYXQgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMClcblx0ZXhwb3J0c1snaWYnXSAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMSlcblx0ZXhwb3J0c1snd2l0aCddICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMilcblxuLyoqKi8gfSxcbi8qIDkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdC8qKlxuXHQgKiBTdHJpbmdpZnkgdmFsdWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBpbmRlbnRcblx0ICovXG5cblx0ZXhwb3J0cy5qc29uID0gZnVuY3Rpb24gKHZhbHVlLCBpbmRlbnQpIHtcblx0ICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIE51bWJlcihpbmRlbnQpIHx8IDIpXG5cdH1cblxuXHQvKipcblx0ICogJ2FiYycgPT4gJ0FiYydcblx0ICovXG5cblx0ZXhwb3J0cy5jYXBpdGFsaXplID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkgcmV0dXJuICcnXG5cdCAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpXG5cdCAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSlcblx0fVxuXG5cdC8qKlxuXHQgKiAnYWJjJyA9PiAnQUJDJ1xuXHQgKi9cblxuXHRleHBvcnRzLnVwcGVyY2FzZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgIHJldHVybiAodmFsdWUgfHwgdmFsdWUgPT09IDApXG5cdCAgICA/IHZhbHVlLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKVxuXHQgICAgOiAnJ1xuXHR9XG5cblx0LyoqXG5cdCAqICdBYkMnID0+ICdhYmMnXG5cdCAqL1xuXG5cdGV4cG9ydHMubG93ZXJjYXNlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgcmV0dXJuICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMClcblx0ICAgID8gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpXG5cdCAgICA6ICcnXG5cdH1cblxuXHQvKipcblx0ICogMTIzNDUgPT4gJDEyLDM0NS4wMFxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc2lnblxuXHQgKi9cblxuXHR2YXIgZGlnaXRzUkUgPSAvKFxcZHszfSkoPz1cXGQpL2dcblxuXHRleHBvcnRzLmN1cnJlbmN5ID0gZnVuY3Rpb24gKHZhbHVlLCBzaWduKSB7XG5cdCAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKVxuXHQgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHJldHVybiAnJ1xuXHQgIHNpZ24gPSBzaWduIHx8ICckJ1xuXHQgIHZhciBzID0gTWF0aC5mbG9vcih2YWx1ZSkudG9TdHJpbmcoKSxcblx0ICAgIGkgPSBzLmxlbmd0aCAlIDMsXG5cdCAgICBoID0gaSA+IDBcblx0ICAgICAgPyAocy5zbGljZSgwLCBpKSArIChzLmxlbmd0aCA+IDMgPyAnLCcgOiAnJykpXG5cdCAgICAgIDogJycsXG5cdCAgICBmID0gJy4nICsgdmFsdWUudG9GaXhlZCgyKS5zbGljZSgtMilcblx0ICByZXR1cm4gc2lnbiArIGggKyBzLnNsaWNlKGkpLnJlcGxhY2UoZGlnaXRzUkUsICckMSwnKSArIGZcblx0fVxuXG5cdC8qKlxuXHQgKiAnaXRlbScgPT4gJ2l0ZW1zJ1xuXHQgKlxuXHQgKiBAcGFyYW1zXG5cdCAqICBhbiBhcnJheSBvZiBzdHJpbmdzIGNvcnJlc3BvbmRpbmcgdG9cblx0ICogIHRoZSBzaW5nbGUsIGRvdWJsZSwgdHJpcGxlIC4uLiBmb3JtcyBvZiB0aGUgd29yZCB0b1xuXHQgKiAgYmUgcGx1cmFsaXplZC4gV2hlbiB0aGUgbnVtYmVyIHRvIGJlIHBsdXJhbGl6ZWRcblx0ICogIGV4Y2VlZHMgdGhlIGxlbmd0aCBvZiB0aGUgYXJncywgaXQgd2lsbCB1c2UgdGhlIGxhc3Rcblx0ICogIGVudHJ5IGluIHRoZSBhcnJheS5cblx0ICpcblx0ICogIGUuZy4gWydzaW5nbGUnLCAnZG91YmxlJywgJ3RyaXBsZScsICdtdWx0aXBsZSddXG5cdCAqL1xuXG5cdGV4cG9ydHMucGx1cmFsaXplID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgdmFyIGFyZ3MgPSBfLnRvQXJyYXkoYXJndW1lbnRzLCAxKVxuXHQgIHJldHVybiBhcmdzLmxlbmd0aCA+IDFcblx0ICAgID8gKGFyZ3NbdmFsdWUgJSAxMCAtIDFdIHx8IGFyZ3NbYXJncy5sZW5ndGggLSAxXSlcblx0ICAgIDogKGFyZ3NbMF0gKyAodmFsdWUgPT09IDEgPyAnJyA6ICdzJykpXG5cdH1cblxuXHQvKipcblx0ICogQSBzcGVjaWFsIGZpbHRlciB0aGF0IHRha2VzIGEgaGFuZGxlciBmdW5jdGlvbixcblx0ICogd3JhcHMgaXQgc28gaXQgb25seSBnZXRzIHRyaWdnZXJlZCBvbiBzcGVjaWZpY1xuXHQgKiBrZXlwcmVzc2VzLiB2LW9uIG9ubHkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICovXG5cblx0dmFyIGtleUNvZGVzID0ge1xuXHQgIGVudGVyICAgIDogMTMsXG5cdCAgdGFiICAgICAgOiA5LFxuXHQgICdkZWxldGUnIDogNDYsXG5cdCAgdXAgICAgICAgOiAzOCxcblx0ICBsZWZ0ICAgICA6IDM3LFxuXHQgIHJpZ2h0ICAgIDogMzksXG5cdCAgZG93biAgICAgOiA0MCxcblx0ICBlc2MgICAgICA6IDI3XG5cdH1cblxuXHRleHBvcnRzLmtleSA9IGZ1bmN0aW9uIChoYW5kbGVyLCBrZXkpIHtcblx0ICBpZiAoIWhhbmRsZXIpIHJldHVyblxuXHQgIHZhciBjb2RlID0ga2V5Q29kZXNba2V5XVxuXHQgIGlmICghY29kZSkge1xuXHQgICAgY29kZSA9IHBhcnNlSW50KGtleSwgMTApXG5cdCAgfVxuXHQgIHJldHVybiBmdW5jdGlvbiAoZSkge1xuXHQgICAgaWYgKGUua2V5Q29kZSA9PT0gY29kZSkge1xuXHQgICAgICByZXR1cm4gaGFuZGxlci5jYWxsKHRoaXMsIGUpXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEluc3RhbGwgc3BlY2lhbCBhcnJheSBmaWx0ZXJzXG5cdCAqL1xuXG5cdF8uZXh0ZW5kKGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18oMzMpKVxuXG4vKioqLyB9LFxuLyogMTAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBtZXJnZU9wdGlvbnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KVxuXG5cdC8qKlxuXHQgKiBUaGUgbWFpbiBpbml0IHNlcXVlbmNlLiBUaGlzIGlzIGNhbGxlZCBmb3IgZXZlcnlcblx0ICogaW5zdGFuY2UsIGluY2x1ZGluZyBvbmVzIHRoYXQgYXJlIGNyZWF0ZWQgZnJvbSBleHRlbmRlZFxuXHQgKiBjb25zdHJ1Y3RvcnMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhpcyBvcHRpb25zIG9iamVjdCBzaG91bGQgYmVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgcmVzdWx0IG9mIG1lcmdpbmcgY2xhc3Ncblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zIGFuZCB0aGUgb3B0aW9ucyBwYXNzZWRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICBpbiB0byB0aGUgY29uc3RydWN0b3IuXG5cdCAqL1xuXG5cdGV4cG9ydHMuX2luaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXG5cdCAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuXHQgIHRoaXMuJGVsICAgICAgICAgICA9IG51bGxcblx0ICB0aGlzLiRwYXJlbnQgICAgICAgPSBvcHRpb25zLl9wYXJlbnRcblx0ICB0aGlzLiRyb290ICAgICAgICAgPSBvcHRpb25zLl9yb290IHx8IHRoaXNcblx0ICB0aGlzLiQgICAgICAgICAgICAgPSB7fSAvLyBjaGlsZCB2bSByZWZlcmVuY2VzXG5cdCAgdGhpcy4kJCAgICAgICAgICAgID0ge30gLy8gZWxlbWVudCByZWZlcmVuY2VzXG5cdCAgdGhpcy5fd2F0Y2hlckxpc3QgID0gW10gLy8gYWxsIHdhdGNoZXJzIGFzIGFuIGFycmF5XG5cdCAgdGhpcy5fd2F0Y2hlcnMgICAgID0ge30gLy8gaW50ZXJuYWwgd2F0Y2hlcnMgYXMgYSBoYXNoXG5cdCAgdGhpcy5fdXNlcldhdGNoZXJzID0ge30gLy8gdXNlciB3YXRjaGVycyBhcyBhIGhhc2hcblx0ICB0aGlzLl9kaXJlY3RpdmVzICAgPSBbXSAvLyBhbGwgZGlyZWN0aXZlc1xuXG5cdCAgLy8gYSBmbGFnIHRvIGF2b2lkIHRoaXMgYmVpbmcgb2JzZXJ2ZWRcblx0ICB0aGlzLl9pc1Z1ZSA9IHRydWVcblxuXHQgIC8vIGV2ZW50cyBib29ra2VlcGluZ1xuXHQgIHRoaXMuX2V2ZW50cyAgICAgICAgID0ge30gICAgLy8gcmVnaXN0ZXJlZCBjYWxsYmFja3Ncblx0ICB0aGlzLl9ldmVudHNDb3VudCAgICA9IHt9ICAgIC8vIGZvciAkYnJvYWRjYXN0IG9wdGltaXphdGlvblxuXHQgIHRoaXMuX2V2ZW50Q2FuY2VsbGVkID0gZmFsc2UgLy8gZm9yIGV2ZW50IGNhbmNlbGxhdGlvblxuXG5cdCAgLy8gYmxvY2sgaW5zdGFuY2UgcHJvcGVydGllc1xuXHQgIHRoaXMuX2lzQmxvY2sgICAgID0gZmFsc2Vcblx0ICB0aGlzLl9ibG9ja1N0YXJ0ICA9ICAgICAgICAgIC8vIEB0eXBlIHtDb21tZW50Tm9kZX1cblx0ICB0aGlzLl9ibG9ja0VuZCAgICA9IG51bGwgICAgIC8vIEB0eXBlIHtDb21tZW50Tm9kZX1cblxuXHQgIC8vIGxpZmVjeWNsZSBzdGF0ZVxuXHQgIHRoaXMuX2lzQ29tcGlsZWQgID1cblx0ICB0aGlzLl9pc0Rlc3Ryb3llZCA9XG5cdCAgdGhpcy5faXNSZWFkeSAgICAgPVxuXHQgIHRoaXMuX2lzQXR0YWNoZWQgID1cblx0ICB0aGlzLl9pc0JlaW5nRGVzdHJveWVkID0gZmFsc2VcblxuXHQgIC8vIGNoaWxkcmVuXG5cdCAgdGhpcy5fY2hpbGRyZW4gPSAgICAgICAgIC8vIEB0eXBlIHtBcnJheX1cblx0ICB0aGlzLl9jaGlsZEN0b3JzID0gbnVsbCAgLy8gQHR5cGUge09iamVjdH0gLSBoYXNoIHRvIGNhY2hlXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoaWxkIGNvbnN0cnVjdG9yc1xuXG5cdCAgLy8gbWVyZ2Ugb3B0aW9ucy5cblx0ICBvcHRpb25zID0gdGhpcy4kb3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhcblx0ICAgIHRoaXMuY29uc3RydWN0b3Iub3B0aW9ucyxcblx0ICAgIG9wdGlvbnMsXG5cdCAgICB0aGlzXG5cdCAgKVxuXG5cdCAgLy8gc2V0IGRhdGEgYWZ0ZXIgbWVyZ2UuXG5cdCAgdGhpcy5fZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fVxuXG5cdCAgLy8gaW5pdGlhbGl6ZSBkYXRhIG9ic2VydmF0aW9uIGFuZCBzY29wZSBpbmhlcml0YW5jZS5cblx0ICB0aGlzLl9pbml0U2NvcGUoKVxuXG5cdCAgLy8gc2V0dXAgZXZlbnQgc3lzdGVtIGFuZCBvcHRpb24gZXZlbnRzLlxuXHQgIHRoaXMuX2luaXRFdmVudHMoKVxuXG5cdCAgLy8gY2FsbCBjcmVhdGVkIGhvb2tcblx0ICB0aGlzLl9jYWxsSG9vaygnY3JlYXRlZCcpXG5cblx0ICAvLyBpZiBgZWxgIG9wdGlvbiBpcyBwYXNzZWQsIHN0YXJ0IGNvbXBpbGF0aW9uLlxuXHQgIGlmIChvcHRpb25zLmVsKSB7XG5cdCAgICB0aGlzLiRtb3VudChvcHRpb25zLmVsKVxuXHQgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogMTEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgaW5Eb2MgPSBfLmluRG9jXG5cblx0LyoqXG5cdCAqIFNldHVwIHRoZSBpbnN0YW5jZSdzIG9wdGlvbiBldmVudHMgJiB3YXRjaGVycy5cblx0ICogSWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLCB3ZSBwdWxsIGl0IGZyb20gdGhlXG5cdCAqIGluc3RhbmNlJ3MgbWV0aG9kcyBieSBuYW1lLlxuXHQgKi9cblxuXHRleHBvcnRzLl9pbml0RXZlbnRzID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBvcHRpb25zID0gdGhpcy4kb3B0aW9uc1xuXHQgIHJlZ2lzdGVyQ2FsbGJhY2tzKHRoaXMsICckb24nLCBvcHRpb25zLmV2ZW50cylcblx0ICByZWdpc3RlckNhbGxiYWNrcyh0aGlzLCAnJHdhdGNoJywgb3B0aW9ucy53YXRjaClcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWdpc3RlciBjYWxsYmFja3MgZm9yIG9wdGlvbiBldmVudHMgYW5kIHdhdGNoZXJzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvblxuXHQgKiBAcGFyYW0ge09iamVjdH0gaGFzaFxuXHQgKi9cblxuXHRmdW5jdGlvbiByZWdpc3RlckNhbGxiYWNrcyAodm0sIGFjdGlvbiwgaGFzaCkge1xuXHQgIGlmICghaGFzaCkgcmV0dXJuXG5cdCAgdmFyIGhhbmRsZXJzLCBrZXksIGksIGpcblx0ICBmb3IgKGtleSBpbiBoYXNoKSB7XG5cdCAgICBoYW5kbGVycyA9IGhhc2hba2V5XVxuXHQgICAgaWYgKF8uaXNBcnJheShoYW5kbGVycykpIHtcblx0ICAgICAgZm9yIChpID0gMCwgaiA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHQgICAgICAgIHJlZ2lzdGVyKHZtLCBhY3Rpb24sIGtleSwgaGFuZGxlcnNbaV0pXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHJlZ2lzdGVyKHZtLCBhY3Rpb24sIGtleSwgaGFuZGxlcnMpXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlciB0byByZWdpc3RlciBhbiBldmVudC93YXRjaCBjYWxsYmFjay5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25cblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleVxuXHQgKiBAcGFyYW0geyp9IGhhbmRsZXJcblx0ICovXG5cblx0ZnVuY3Rpb24gcmVnaXN0ZXIgKHZtLCBhY3Rpb24sIGtleSwgaGFuZGxlcikge1xuXHQgIHZhciB0eXBlID0gdHlwZW9mIGhhbmRsZXJcblx0ICBpZiAodHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgdm1bYWN0aW9uXShrZXksIGhhbmRsZXIpXG5cdCAgfSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuXHQgICAgdmFyIG1ldGhvZHMgPSB2bS4kb3B0aW9ucy5tZXRob2RzXG5cdCAgICB2YXIgbWV0aG9kID0gbWV0aG9kcyAmJiBtZXRob2RzW2hhbmRsZXJdXG5cdCAgICBpZiAobWV0aG9kKSB7XG5cdCAgICAgIHZtW2FjdGlvbl0oa2V5LCBtZXRob2QpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBfLndhcm4oXG5cdCAgICAgICAgJ1Vua25vd24gbWV0aG9kOiBcIicgKyBoYW5kbGVyICsgJ1wiIHdoZW4gJyArXG5cdCAgICAgICAgJ3JlZ2lzdGVyaW5nIGNhbGxiYWNrIGZvciAnICsgYWN0aW9uICtcblx0ICAgICAgICAnOiBcIicgKyBrZXkgKyAnXCIuJ1xuXHQgICAgICApXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldHVwIHJlY3Vyc2l2ZSBhdHRhY2hlZC9kZXRhY2hlZCBjYWxsc1xuXHQgKi9cblxuXHRleHBvcnRzLl9pbml0RE9NSG9va3MgPSBmdW5jdGlvbiAoKSB7XG5cdCAgdGhpcy4kb24oJ2hvb2s6YXR0YWNoZWQnLCBvbkF0dGFjaGVkKVxuXHQgIHRoaXMuJG9uKCdob29rOmRldGFjaGVkJywgb25EZXRhY2hlZClcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsYmFjayB0byByZWN1cnNpdmVseSBjYWxsIGF0dGFjaGVkIGhvb2sgb24gY2hpbGRyZW5cblx0ICovXG5cblx0ZnVuY3Rpb24gb25BdHRhY2hlZCAoKSB7XG5cdCAgdGhpcy5faXNBdHRhY2hlZCA9IHRydWVcblx0ICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlblxuXHQgIGlmICghY2hpbGRyZW4pIHJldHVyblxuXHQgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuXHQgICAgaWYgKCFjaGlsZC5faXNBdHRhY2hlZCAmJiBpbkRvYyhjaGlsZC4kZWwpKSB7XG5cdCAgICAgIGNoaWxkLl9jYWxsSG9vaygnYXR0YWNoZWQnKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsYmFjayB0byByZWN1cnNpdmVseSBjYWxsIGRldGFjaGVkIGhvb2sgb24gY2hpbGRyZW5cblx0ICovXG5cblx0ZnVuY3Rpb24gb25EZXRhY2hlZCAoKSB7XG5cdCAgdGhpcy5faXNBdHRhY2hlZCA9IGZhbHNlXG5cdCAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW5cblx0ICBpZiAoIWNoaWxkcmVuKSByZXR1cm5cblx0ICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV1cblx0ICAgIGlmIChjaGlsZC5faXNBdHRhY2hlZCAmJiAhaW5Eb2MoY2hpbGQuJGVsKSkge1xuXHQgICAgICBjaGlsZC5fY2FsbEhvb2soJ2RldGFjaGVkJylcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogVHJpZ2dlciBhbGwgaGFuZGxlcnMgZm9yIGEgaG9va1xuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaG9va1xuXHQgKi9cblxuXHRleHBvcnRzLl9jYWxsSG9vayA9IGZ1bmN0aW9uIChob29rKSB7XG5cdCAgdmFyIGhhbmRsZXJzID0gdGhpcy4kb3B0aW9uc1tob29rXVxuXHQgIGlmIChoYW5kbGVycykge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGogPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0ICAgICAgaGFuZGxlcnNbaV0uY2FsbCh0aGlzKVxuXHQgICAgfVxuXHQgIH1cblx0ICB0aGlzLiRlbWl0KCdob29rOicgKyBob29rKVxuXHR9XG5cbi8qKiovIH0sXG4vKiAxMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBPYnNlcnZlciA9IF9fd2VicGFja19yZXF1aXJlX18oNDgpXG5cdHZhciBCaW5kaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NylcblxuXHQvKipcblx0ICogU2V0dXAgdGhlIHNjb3BlIG9mIGFuIGluc3RhbmNlLCB3aGljaCBjb250YWluczpcblx0ICogLSBvYnNlcnZlZCBkYXRhXG5cdCAqIC0gY29tcHV0ZWQgcHJvcGVydGllc1xuXHQgKiAtIHVzZXIgbWV0aG9kc1xuXHQgKiAtIG1ldGEgcHJvcGVydGllc1xuXHQgKi9cblxuXHRleHBvcnRzLl9pbml0U2NvcGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgdGhpcy5faW5pdERhdGEoKVxuXHQgIHRoaXMuX2luaXRDb21wdXRlZCgpXG5cdCAgdGhpcy5faW5pdE1ldGhvZHMoKVxuXHQgIHRoaXMuX2luaXRNZXRhKClcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBkYXRhLiBcblx0ICovXG5cblx0ZXhwb3J0cy5faW5pdERhdGEgPSBmdW5jdGlvbiAoKSB7XG5cdCAgLy8gcHJveHkgZGF0YSBvbiBpbnN0YW5jZVxuXHQgIHZhciBkYXRhID0gdGhpcy5fZGF0YVxuXHQgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSlcblx0ICB2YXIgaSA9IGtleXMubGVuZ3RoXG5cdCAgdmFyIGtleVxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIGtleSA9IGtleXNbaV1cblx0ICAgIGlmICghXy5pc1Jlc2VydmVkKGtleSkpIHtcblx0ICAgICAgdGhpcy5fcHJveHkoa2V5KVxuXHQgICAgfVxuXHQgIH1cblx0ICAvLyBvYnNlcnZlIGRhdGFcblx0ICBPYnNlcnZlci5jcmVhdGUoZGF0YSkuYWRkVm0odGhpcylcblx0fVxuXG5cdC8qKlxuXHQgKiBTd2FwIHRoZSBpc250YW5jZSdzICRkYXRhLiBDYWxsZWQgaW4gJGRhdGEncyBzZXR0ZXIuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBuZXdEYXRhXG5cdCAqL1xuXG5cdGV4cG9ydHMuX3NldERhdGEgPSBmdW5jdGlvbiAobmV3RGF0YSkge1xuXHQgIG5ld0RhdGEgPSBuZXdEYXRhIHx8IHt9XG5cdCAgdmFyIG9sZERhdGEgPSB0aGlzLl9kYXRhXG5cdCAgdGhpcy5fZGF0YSA9IG5ld0RhdGFcblx0ICB2YXIga2V5cywga2V5LCBpXG5cdCAgLy8gdW5wcm94eSBrZXlzIG5vdCBwcmVzZW50IGluIG5ldyBkYXRhXG5cdCAga2V5cyA9IE9iamVjdC5rZXlzKG9sZERhdGEpXG5cdCAgaSA9IGtleXMubGVuZ3RoXG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAga2V5ID0ga2V5c1tpXVxuXHQgICAgaWYgKCFfLmlzUmVzZXJ2ZWQoa2V5KSAmJiAhKGtleSBpbiBuZXdEYXRhKSkge1xuXHQgICAgICB0aGlzLl91bnByb3h5KGtleSlcblx0ICAgIH1cblx0ICB9XG5cdCAgLy8gcHJveHkga2V5cyBub3QgYWxyZWFkeSBwcm94aWVkLFxuXHQgIC8vIGFuZCB0cmlnZ2VyIGNoYW5nZSBmb3IgY2hhbmdlZCB2YWx1ZXNcblx0ICBrZXlzID0gT2JqZWN0LmtleXMobmV3RGF0YSlcblx0ICBpID0ga2V5cy5sZW5ndGhcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICBrZXkgPSBrZXlzW2ldXG5cdCAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhXy5pc1Jlc2VydmVkKGtleSkpIHtcblx0ICAgICAgLy8gbmV3IHByb3BlcnR5XG5cdCAgICAgIHRoaXMuX3Byb3h5KGtleSlcblx0ICAgIH1cblx0ICB9XG5cdCAgb2xkRGF0YS5fX29iX18ucmVtb3ZlVm0odGhpcylcblx0ICBPYnNlcnZlci5jcmVhdGUobmV3RGF0YSkuYWRkVm0odGhpcylcblx0ICB0aGlzLl9kaWdlc3QoKVxuXHR9XG5cblx0LyoqXG5cdCAqIFByb3h5IGEgcHJvcGVydHksIHNvIHRoYXRcblx0ICogdm0ucHJvcCA9PT0gdm0uX2RhdGEucHJvcFxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqL1xuXG5cdGV4cG9ydHMuX3Byb3h5ID0gZnVuY3Rpb24gKGtleSkge1xuXHQgIC8vIG5lZWQgdG8gc3RvcmUgcmVmIHRvIHNlbGYgaGVyZVxuXHQgIC8vIGJlY2F1c2UgdGhlc2UgZ2V0dGVyL3NldHRlcnMgbWlnaHRcblx0ICAvLyBiZSBjYWxsZWQgYnkgY2hpbGQgaW5zdGFuY2VzIVxuXHQgIHZhciBzZWxmID0gdGhpc1xuXHQgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCBrZXksIHtcblx0ICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0ICAgIGVudW1lcmFibGU6IHRydWUsXG5cdCAgICBnZXQ6IGZ1bmN0aW9uIHByb3h5R2V0dGVyICgpIHtcblx0ICAgICAgcmV0dXJuIHNlbGYuX2RhdGFba2V5XVxuXHQgICAgfSxcblx0ICAgIHNldDogZnVuY3Rpb24gcHJveHlTZXR0ZXIgKHZhbCkge1xuXHQgICAgICBzZWxmLl9kYXRhW2tleV0gPSB2YWxcblx0ICAgIH1cblx0ICB9KVxuXHR9XG5cblx0LyoqXG5cdCAqIFVucHJveHkgYSBwcm9wZXJ0eS5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleVxuXHQgKi9cblxuXHRleHBvcnRzLl91bnByb3h5ID0gZnVuY3Rpb24gKGtleSkge1xuXHQgIGRlbGV0ZSB0aGlzW2tleV1cblx0fVxuXG5cdC8qKlxuXHQgKiBGb3JjZSB1cGRhdGUgb24gZXZlcnkgd2F0Y2hlciBpbiBzY29wZS5cblx0ICovXG5cblx0ZXhwb3J0cy5fZGlnZXN0ID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBpID0gdGhpcy5fd2F0Y2hlckxpc3QubGVuZ3RoXG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAgdGhpcy5fd2F0Y2hlckxpc3RbaV0udXBkYXRlKClcblx0ICB9XG5cdCAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW5cblx0ICB2YXIgY2hpbGRcblx0ICBpZiAoY2hpbGRyZW4pIHtcblx0ICAgIGkgPSBjaGlsZHJlbi5sZW5ndGhcblx0ICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXVxuXHQgICAgICBpZiAoY2hpbGQuJG9wdGlvbnMuaW5oZXJpdCkge1xuXHQgICAgICAgIGNoaWxkLl9kaWdlc3QoKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldHVwIGNvbXB1dGVkIHByb3BlcnRpZXMuIFRoZXkgYXJlIGVzc2VudGlhbGx5XG5cdCAqIHNwZWNpYWwgZ2V0dGVyL3NldHRlcnNcblx0ICovXG5cblx0ZnVuY3Rpb24gbm9vcCAoKSB7fVxuXHRleHBvcnRzLl9pbml0Q29tcHV0ZWQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgdmFyIGNvbXB1dGVkID0gdGhpcy4kb3B0aW9ucy5jb21wdXRlZFxuXHQgIGlmIChjb21wdXRlZCkge1xuXHQgICAgZm9yICh2YXIga2V5IGluIGNvbXB1dGVkKSB7XG5cdCAgICAgIHZhciB1c2VyRGVmID0gY29tcHV0ZWRba2V5XVxuXHQgICAgICB2YXIgZGVmID0ge1xuXHQgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG5cdCAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG5cdCAgICAgIH1cblx0ICAgICAgaWYgKHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgZGVmLmdldCA9IF8uYmluZCh1c2VyRGVmLCB0aGlzKVxuXHQgICAgICAgIGRlZi5zZXQgPSBub29wXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgZGVmLmdldCA9IHVzZXJEZWYuZ2V0XG5cdCAgICAgICAgICA/IF8uYmluZCh1c2VyRGVmLmdldCwgdGhpcylcblx0ICAgICAgICAgIDogbm9vcFxuXHQgICAgICAgIGRlZi5zZXQgPSB1c2VyRGVmLnNldFxuXHQgICAgICAgICAgPyBfLmJpbmQodXNlckRlZi5zZXQsIHRoaXMpXG5cdCAgICAgICAgICA6IG5vb3Bcblx0ICAgICAgfVxuXHQgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCBkZWYpXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldHVwIGluc3RhbmNlIG1ldGhvZHMuIE1ldGhvZHMgbXVzdCBiZSBib3VuZCB0byB0aGVcblx0ICogaW5zdGFuY2Ugc2luY2UgdGhleSBtaWdodCBiZSBjYWxsZWQgYnkgY2hpbGRyZW5cblx0ICogaW5oZXJpdGluZyB0aGVtLlxuXHQgKi9cblxuXHRleHBvcnRzLl9pbml0TWV0aG9kcyA9IGZ1bmN0aW9uICgpIHtcblx0ICB2YXIgbWV0aG9kcyA9IHRoaXMuJG9wdGlvbnMubWV0aG9kc1xuXHQgIGlmIChtZXRob2RzKSB7XG5cdCAgICBmb3IgKHZhciBrZXkgaW4gbWV0aG9kcykge1xuXHQgICAgICB0aGlzW2tleV0gPSBfLmJpbmQobWV0aG9kc1trZXldLCB0aGlzKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIG1ldGEgaW5mb3JtYXRpb24gbGlrZSAkaW5kZXgsICRrZXkgJiAkdmFsdWUuXG5cdCAqL1xuXG5cdGV4cG9ydHMuX2luaXRNZXRhID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBtZXRhcyA9IHRoaXMuJG9wdGlvbnMuX21ldGFcblx0ICBpZiAobWV0YXMpIHtcblx0ICAgIGZvciAodmFyIGtleSBpbiBtZXRhcykge1xuXHQgICAgICB0aGlzLl9kZWZpbmVNZXRhKGtleSwgbWV0YXNba2V5XSlcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lIGEgbWV0YSBwcm9wZXJ0eSwgZS5nICRpbmRleCwgJGtleSwgJHZhbHVlXG5cdCAqIHdoaWNoIG9ubHkgZXhpc3RzIG9uIHRoZSB2bSBpbnN0YW5jZSBidXQgbm90IGluICRkYXRhLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcblx0ICovXG5cblx0ZXhwb3J0cy5fZGVmaW5lTWV0YSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdCAgdmFyIGJpbmRpbmcgPSBuZXcgQmluZGluZygpXG5cdCAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwge1xuXHQgICAgZW51bWVyYWJsZTogdHJ1ZSxcblx0ICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0ICAgIGdldDogZnVuY3Rpb24gbWV0YUdldHRlciAoKSB7XG5cdCAgICAgIGlmIChPYnNlcnZlci50YXJnZXQpIHtcblx0ICAgICAgICBPYnNlcnZlci50YXJnZXQuYWRkRGVwKGJpbmRpbmcpXG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIHZhbHVlXG5cdCAgICB9LFxuXHQgICAgc2V0OiBmdW5jdGlvbiBtZXRhU2V0dGVyICh2YWwpIHtcblx0ICAgICAgaWYgKHZhbCAhPT0gdmFsdWUpIHtcblx0ICAgICAgICB2YWx1ZSA9IHZhbFxuXHQgICAgICAgIGJpbmRpbmcubm90aWZ5KClcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0pXG5cdH1cblxuLyoqKi8gfSxcbi8qIDEzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIERpcmVjdGl2ZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDUpXG5cdHZhciBjb21waWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Mylcblx0dmFyIHRyYW5zY2x1ZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ2KVxuXG5cdC8qKlxuXHQgKiBUcmFuc2NsdWRlLCBjb21waWxlIGFuZCBsaW5rIGVsZW1lbnQuXG5cdCAqXG5cdCAqIElmIGEgcHJlLWNvbXBpbGVkIGxpbmtlciBpcyBhdmFpbGFibGUsIHRoYXQgbWVhbnMgdGhlXG5cdCAqIHBhc3NlZCBpbiBlbGVtZW50IHdpbGwgYmUgcHJlLXRyYW5zY2x1ZGVkIGFuZCBjb21waWxlZFxuXHQgKiBhcyB3ZWxsIC0gYWxsIHdlIG5lZWQgdG8gZG8gaXMgdG8gY2FsbCB0aGUgbGlua2VyLlxuXHQgKlxuXHQgKiBPdGhlcndpc2Ugd2UgbmVlZCB0byBjYWxsIHRyYW5zY2x1ZGUvY29tcGlsZS9saW5rIGhlcmUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHJldHVybiB7RWxlbWVudH1cblx0ICovXG5cblx0ZXhwb3J0cy5fY29tcGlsZSA9IGZ1bmN0aW9uIChlbCkge1xuXHQgIHZhciBvcHRpb25zID0gdGhpcy4kb3B0aW9uc1xuXHQgIGlmIChvcHRpb25zLl9saW5rZXIpIHtcblx0ICAgIHRoaXMuX2luaXRFbGVtZW50KGVsKVxuXHQgICAgb3B0aW9ucy5fbGlua2VyKHRoaXMsIGVsKVxuXHQgIH0gZWxzZSB7XG5cdCAgICB2YXIgcmF3ID0gZWxcblx0ICAgIGVsID0gdHJhbnNjbHVkZShlbCwgb3B0aW9ucylcblx0ICAgIHRoaXMuX2luaXRFbGVtZW50KGVsKVxuXHQgICAgdmFyIGxpbmtlciA9IGNvbXBpbGUoZWwsIG9wdGlvbnMpXG5cdCAgICBsaW5rZXIodGhpcywgZWwpXG5cdCAgICBpZiAob3B0aW9ucy5yZXBsYWNlKSB7XG5cdCAgICAgIF8ucmVwbGFjZShyYXcsIGVsKVxuXHQgICAgfVxuXHQgIH1cblx0ICByZXR1cm4gZWxcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIGluc3RhbmNlIGVsZW1lbnQuIENhbGxlZCBpbiB0aGUgcHVibGljXG5cdCAqICRtb3VudCgpIG1ldGhvZC5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKi9cblxuXHRleHBvcnRzLl9pbml0RWxlbWVudCA9IGZ1bmN0aW9uIChlbCkge1xuXHQgIGlmIChlbCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcblx0ICAgIHRoaXMuX2lzQmxvY2sgPSB0cnVlXG5cdCAgICB0aGlzLiRlbCA9IHRoaXMuX2Jsb2NrU3RhcnQgPSBlbC5maXJzdENoaWxkXG5cdCAgICB0aGlzLl9ibG9ja0VuZCA9IGVsLmxhc3RDaGlsZFxuXHQgICAgdGhpcy5fYmxvY2tGcmFnbWVudCA9IGVsXG5cdCAgfSBlbHNlIHtcblx0ICAgIHRoaXMuJGVsID0gZWxcblx0ICB9XG5cdCAgdGhpcy4kZWwuX192dWVfXyA9IHRoaXNcblx0ICB0aGlzLl9jYWxsSG9vaygnYmVmb3JlQ29tcGlsZScpXG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGFuZCBiaW5kIGEgZGlyZWN0aXZlIHRvIGFuIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gZGlyZWN0aXZlIG5hbWVcblx0ICogQHBhcmFtIHtOb2RlfSBub2RlICAgLSB0YXJnZXQgbm9kZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGVzYyAtIHBhcnNlZCBkaXJlY3RpdmUgZGVzY3JpcHRvclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGVmICAtIGRpcmVjdGl2ZSBkZWZpbml0aW9uIG9iamVjdFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbbGlua2VyXSAtIHByZS1jb21waWxlZCBsaW5rZXIgZm5cblx0ICovXG5cblx0ZXhwb3J0cy5fYmluZERpciA9IGZ1bmN0aW9uIChuYW1lLCBub2RlLCBkZXNjLCBkZWYsIGxpbmtlcikge1xuXHQgIHRoaXMuX2RpcmVjdGl2ZXMucHVzaChcblx0ICAgIG5ldyBEaXJlY3RpdmUobmFtZSwgbm9kZSwgdGhpcywgZGVzYywgZGVmLCBsaW5rZXIpXG5cdCAgKVxuXHR9XG5cbi8qKiovIH0sXG4vKiAxNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBleHRlbmQgPSBfLmV4dGVuZFxuXG5cdC8qKlxuXHQgKiBPcHRpb24gb3ZlcndyaXRpbmcgc3RyYXRlZ2llcyBhcmUgZnVuY3Rpb25zIHRoYXQgaGFuZGxlXG5cdCAqIGhvdyB0byBtZXJnZSBhIHBhcmVudCBvcHRpb24gdmFsdWUgYW5kIGEgY2hpbGQgb3B0aW9uXG5cdCAqIHZhbHVlIGludG8gdGhlIGZpbmFsIHZhbHVlLlxuXHQgKlxuXHQgKiBBbGwgc3RyYXRlZ3kgZnVuY3Rpb25zIGZvbGxvdyB0aGUgc2FtZSBzaWduYXR1cmU6XG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gcGFyZW50VmFsXG5cdCAqIEBwYXJhbSB7Kn0gY2hpbGRWYWxcblx0ICogQHBhcmFtIHtWdWV9IFt2bV1cblx0ICovXG5cblx0dmFyIHN0cmF0cyA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuXHQvKipcblx0ICogRGF0YVxuXHQgKi9cblxuXHRzdHJhdHMuZGF0YSA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsLCB2bSkge1xuXHQgIC8vIGluIGEgY2xhc3MgbWVyZ2UsIGJvdGggc2hvdWxkIGJlIGZ1bmN0aW9uc1xuXHQgIC8vIHNvIHdlIGp1c3QgcmV0dXJuIGNoaWxkIGlmIGl0IGV4aXN0c1xuXHQgIGlmICghdm0pIHtcblx0ICAgIGlmIChjaGlsZFZhbCAmJiB0eXBlb2YgY2hpbGRWYWwgIT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgXy53YXJuKFxuXHQgICAgICAgICdUaGUgXCJkYXRhXCIgb3B0aW9uIHNob3VsZCBiZSBhIGZ1bmN0aW9uICcgK1xuXHQgICAgICAgICd0aGF0IHJldHVybnMgYSBwZXItaW5zdGFuY2UgdmFsdWUgaW4gY29tcG9uZW50ICcgK1xuXHQgICAgICAgICdkZWZpbml0aW9ucy4nXG5cdCAgICAgIClcblx0ICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICByZXR1cm4gY2hpbGRWYWwgfHwgcGFyZW50VmFsXG5cdCAgfVxuXHQgIHZhciBpbnN0YW5jZURhdGEgPSB0eXBlb2YgY2hpbGRWYWwgPT09ICdmdW5jdGlvbidcblx0ICAgID8gY2hpbGRWYWwuY2FsbCh2bSlcblx0ICAgIDogY2hpbGRWYWxcblx0ICB2YXIgZGVmYXVsdERhdGEgPSB0eXBlb2YgcGFyZW50VmFsID09PSAnZnVuY3Rpb24nXG5cdCAgICA/IHBhcmVudFZhbC5jYWxsKHZtKVxuXHQgICAgOiB1bmRlZmluZWRcblx0ICBpZiAoaW5zdGFuY2VEYXRhKSB7XG5cdCAgICAvLyBtaXggZGVmYXVsdCBkYXRhIGludG8gaW5zdGFuY2UgZGF0YVxuXHQgICAgZm9yICh2YXIga2V5IGluIGRlZmF1bHREYXRhKSB7XG5cdCAgICAgIGlmICghaW5zdGFuY2VEYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0ICAgICAgICBpbnN0YW5jZURhdGEuJGFkZChrZXksIGRlZmF1bHREYXRhW2tleV0pXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBpbnN0YW5jZURhdGFcblx0ICB9IGVsc2Uge1xuXHQgICAgcmV0dXJuIGRlZmF1bHREYXRhXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEVsXG5cdCAqL1xuXG5cdHN0cmF0cy5lbCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsLCB2bSkge1xuXHQgIGlmICghdm0gJiYgY2hpbGRWYWwgJiYgdHlwZW9mIGNoaWxkVmFsICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICBfLndhcm4oXG5cdCAgICAgICdUaGUgXCJlbFwiIG9wdGlvbiBzaG91bGQgYmUgYSBmdW5jdGlvbiAnICtcblx0ICAgICAgJ3RoYXQgcmV0dXJucyBhIHBlci1pbnN0YW5jZSB2YWx1ZSBpbiBjb21wb25lbnQgJyArXG5cdCAgICAgICdkZWZpbml0aW9ucy4nXG5cdCAgICApXG5cdCAgICByZXR1cm5cblx0ICB9XG5cdCAgdmFyIHJldCA9IGNoaWxkVmFsIHx8IHBhcmVudFZhbFxuXHQgIC8vIGludm9rZSB0aGUgZWxlbWVudCBmYWN0b3J5IGlmIHRoaXMgaXMgaW5zdGFuY2UgbWVyZ2Vcblx0ICByZXR1cm4gdm0gJiYgdHlwZW9mIHJldCA9PT0gJ2Z1bmN0aW9uJ1xuXHQgICAgPyByZXQuY2FsbCh2bSlcblx0ICAgIDogcmV0XG5cdH1cblxuXHQvKipcblx0ICogSG9va3MgYW5kIHBhcmFtIGF0dHJpYnV0ZXMgYXJlIG1lcmdlZCBhcyBhcnJheXMuXG5cdCAqL1xuXG5cdHN0cmF0cy5jcmVhdGVkID1cblx0c3RyYXRzLnJlYWR5ID1cblx0c3RyYXRzLmF0dGFjaGVkID1cblx0c3RyYXRzLmRldGFjaGVkID1cblx0c3RyYXRzLmJlZm9yZUNvbXBpbGUgPVxuXHRzdHJhdHMuY29tcGlsZWQgPVxuXHRzdHJhdHMuYmVmb3JlRGVzdHJveSA9XG5cdHN0cmF0cy5kZXN0cm95ZWQgPVxuXHRzdHJhdHMucGFyYW1BdHRyaWJ1dGVzID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcblx0ICByZXR1cm4gY2hpbGRWYWxcblx0ICAgID8gcGFyZW50VmFsXG5cdCAgICAgID8gcGFyZW50VmFsLmNvbmNhdChjaGlsZFZhbClcblx0ICAgICAgOiBfLmlzQXJyYXkoY2hpbGRWYWwpXG5cdCAgICAgICAgPyBjaGlsZFZhbFxuXHQgICAgICAgIDogW2NoaWxkVmFsXVxuXHQgICAgOiBwYXJlbnRWYWxcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NldHNcblx0ICpcblx0ICogV2hlbiBhIHZtIGlzIHByZXNlbnQgKGluc3RhbmNlIGNyZWF0aW9uKSwgd2UgbmVlZCB0byBkb1xuXHQgKiBhIHRocmVlLXdheSBtZXJnZSBiZXR3ZWVuIGNvbnN0cnVjdG9yIG9wdGlvbnMsIGluc3RhbmNlXG5cdCAqIG9wdGlvbnMgYW5kIHBhcmVudCBvcHRpb25zLlxuXHQgKi9cblxuXHRzdHJhdHMuZGlyZWN0aXZlcyA9XG5cdHN0cmF0cy5maWx0ZXJzID1cblx0c3RyYXRzLnBhcnRpYWxzID1cblx0c3RyYXRzLnRyYW5zaXRpb25zID1cblx0c3RyYXRzLmNvbXBvbmVudHMgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCwgdm0sIGtleSkge1xuXHQgIHZhciByZXQgPSBPYmplY3QuY3JlYXRlKFxuXHQgICAgdm0gJiYgdm0uJHBhcmVudFxuXHQgICAgICA/IHZtLiRwYXJlbnQuJG9wdGlvbnNba2V5XVxuXHQgICAgICA6IF8uVnVlLm9wdGlvbnNba2V5XVxuXHQgIClcblx0ICBpZiAocGFyZW50VmFsKSB7XG5cdCAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHBhcmVudFZhbClcblx0ICAgIHZhciBpID0ga2V5cy5sZW5ndGhcblx0ICAgIHZhciBmaWVsZFxuXHQgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICBmaWVsZCA9IGtleXNbaV1cblx0ICAgICAgcmV0W2ZpZWxkXSA9IHBhcmVudFZhbFtmaWVsZF1cblx0ICAgIH1cblx0ICB9XG5cdCAgaWYgKGNoaWxkVmFsKSBleHRlbmQocmV0LCBjaGlsZFZhbClcblx0ICByZXR1cm4gcmV0XG5cdH1cblxuXHQvKipcblx0ICogRXZlbnRzICYgV2F0Y2hlcnMuXG5cdCAqXG5cdCAqIEV2ZW50cyAmIHdhdGNoZXJzIGhhc2hlcyBzaG91bGQgbm90IG92ZXJ3cml0ZSBvbmVcblx0ICogYW5vdGhlciwgc28gd2UgbWVyZ2UgdGhlbSBhcyBhcnJheXMuXG5cdCAqL1xuXG5cdHN0cmF0cy53YXRjaCA9XG5cdHN0cmF0cy5ldmVudHMgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuXHQgIGlmICghY2hpbGRWYWwpIHJldHVybiBwYXJlbnRWYWxcblx0ICBpZiAoIXBhcmVudFZhbCkgcmV0dXJuIGNoaWxkVmFsXG5cdCAgdmFyIHJldCA9IHt9XG5cdCAgZXh0ZW5kKHJldCwgcGFyZW50VmFsKVxuXHQgIGZvciAodmFyIGtleSBpbiBjaGlsZFZhbCkge1xuXHQgICAgdmFyIHBhcmVudCA9IHJldFtrZXldXG5cdCAgICB2YXIgY2hpbGQgPSBjaGlsZFZhbFtrZXldXG5cdCAgICByZXRba2V5XSA9IHBhcmVudFxuXHQgICAgICA/IHBhcmVudC5jb25jYXQoY2hpbGQpXG5cdCAgICAgIDogW2NoaWxkXVxuXHQgIH1cblx0ICByZXR1cm4gcmV0XG5cdH1cblxuXHQvKipcblx0ICogT3RoZXIgb2JqZWN0IGhhc2hlcy5cblx0ICovXG5cblx0c3RyYXRzLm1ldGhvZHMgPVxuXHRzdHJhdHMuY29tcHV0ZWQgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuXHQgIGlmICghY2hpbGRWYWwpIHJldHVybiBwYXJlbnRWYWxcblx0ICBpZiAoIXBhcmVudFZhbCkgcmV0dXJuIGNoaWxkVmFsXG5cdCAgdmFyIHJldCA9IE9iamVjdC5jcmVhdGUocGFyZW50VmFsKVxuXHQgIGV4dGVuZChyZXQsIGNoaWxkVmFsKVxuXHQgIHJldHVybiByZXRcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZhdWx0IHN0cmF0ZWd5LlxuXHQgKi9cblxuXHR2YXIgZGVmYXVsdFN0cmF0ID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcblx0ICByZXR1cm4gY2hpbGRWYWwgPT09IHVuZGVmaW5lZFxuXHQgICAgPyBwYXJlbnRWYWxcblx0ICAgIDogY2hpbGRWYWxcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlIHN1cmUgY29tcG9uZW50IG9wdGlvbnMgZ2V0IGNvbnZlcnRlZCB0byBhY3R1YWxcblx0ICogY29uc3RydWN0b3JzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50c1xuXHQgKi9cblxuXHRmdW5jdGlvbiBndWFyZENvbXBvbmVudHMgKGNvbXBvbmVudHMpIHtcblx0ICBpZiAoY29tcG9uZW50cykge1xuXHQgICAgdmFyIGRlZlxuXHQgICAgZm9yICh2YXIga2V5IGluIGNvbXBvbmVudHMpIHtcblx0ICAgICAgZGVmID0gY29tcG9uZW50c1trZXldXG5cdCAgICAgIGlmIChfLmlzUGxhaW5PYmplY3QoZGVmKSkge1xuXHQgICAgICAgIGRlZi5uYW1lID0ga2V5XG5cdCAgICAgICAgY29tcG9uZW50c1trZXldID0gXy5WdWUuZXh0ZW5kKGRlZilcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBNZXJnZSB0d28gb3B0aW9uIG9iamVjdHMgaW50byBhIG5ldyBvbmUuXG5cdCAqIENvcmUgdXRpbGl0eSB1c2VkIGluIGJvdGggaW5zdGFudGlhdGlvbiBhbmQgaW5oZXJpdGFuY2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRcblx0ICogQHBhcmFtIHtPYmplY3R9IGNoaWxkXG5cdCAqIEBwYXJhbSB7VnVlfSBbdm1dIC0gaWYgdm0gaXMgcHJlc2VudCwgaW5kaWNhdGVzIHRoaXMgaXNcblx0ICogICAgICAgICAgICAgICAgICAgICBhbiBpbnN0YW50aWF0aW9uIG1lcmdlLlxuXHQgKi9cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyAocGFyZW50LCBjaGlsZCwgdm0pIHtcblx0ICBndWFyZENvbXBvbmVudHMoY2hpbGQuY29tcG9uZW50cylcblx0ICB2YXIgb3B0aW9ucyA9IHt9XG5cdCAgdmFyIGtleVxuXHQgIGZvciAoa2V5IGluIHBhcmVudCkge1xuXHQgICAgbWVyZ2UocGFyZW50W2tleV0sIGNoaWxkW2tleV0sIGtleSlcblx0ICB9XG5cdCAgZm9yIChrZXkgaW4gY2hpbGQpIHtcblx0ICAgIGlmICghKHBhcmVudC5oYXNPd25Qcm9wZXJ0eShrZXkpKSkge1xuXHQgICAgICBtZXJnZShwYXJlbnRba2V5XSwgY2hpbGRba2V5XSwga2V5KVxuXHQgICAgfVxuXHQgIH1cblx0ICB2YXIgbWl4aW5zID0gY2hpbGQubWl4aW5zXG5cdCAgaWYgKG1peGlucykge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBtaXhpbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIGZvciAoa2V5IGluIG1peGluc1tpXSkge1xuXHQgICAgICAgIG1lcmdlKG9wdGlvbnNba2V5XSwgbWl4aW5zW2ldW2tleV0sIGtleSlcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0ICBmdW5jdGlvbiBtZXJnZSAocGFyZW50VmFsLCBjaGlsZFZhbCwga2V5KSB7XG5cdCAgICB2YXIgc3RyYXQgPSBzdHJhdHNba2V5XSB8fCBkZWZhdWx0U3RyYXRcblx0ICAgIG9wdGlvbnNba2V5XSA9IHN0cmF0KHBhcmVudFZhbCwgY2hpbGRWYWwsIHZtLCBrZXkpXG5cdCAgfVxuXHQgIHJldHVybiBvcHRpb25zXG5cdH1cblxuLyoqKi8gfSxcbi8qIDE1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIC8qKlxuXHQgICAqIFRoZSBwcmVmaXggdG8gbG9vayBmb3Igd2hlbiBwYXJzaW5nIGRpcmVjdGl2ZXMuXG5cdCAgICpcblx0ICAgKiBAdHlwZSB7U3RyaW5nfVxuXHQgICAqL1xuXG5cdCAgcHJlZml4OiAndi0nLFxuXG5cdCAgLyoqXG5cdCAgICogV2hldGhlciB0byBwcmludCBkZWJ1ZyBtZXNzYWdlcy5cblx0ICAgKiBBbHNvIGVuYWJsZXMgc3RhY2sgdHJhY2UgZm9yIHdhcm5pbmdzLlxuXHQgICAqXG5cdCAgICogQHR5cGUge0Jvb2xlYW59XG5cdCAgICovXG5cblx0ICBkZWJ1ZzogZmFsc2UsXG5cblx0ICAvKipcblx0ICAgKiBXaGV0aGVyIHRvIHN1cHByZXNzIHdhcm5pbmdzLlxuXHQgICAqXG5cdCAgICogQHR5cGUge0Jvb2xlYW59XG5cdCAgICovXG5cblx0ICBzaWxlbnQ6IGZhbHNlLFxuXG5cdCAgLyoqXG5cdCAgICogV2hldGhlciBhbGxvdyBvYnNlcnZlciB0byBhbHRlciBkYXRhIG9iamVjdHMnXG5cdCAgICogX19wcm90b19fLlxuXHQgICAqXG5cdCAgICogQHR5cGUge0Jvb2xlYW59XG5cdCAgICovXG5cblx0ICBwcm90bzogdHJ1ZSxcblxuXHQgIC8qKlxuXHQgICAqIFdoZXRoZXIgdG8gcGFyc2UgbXVzdGFjaGUgdGFncyBpbiB0ZW1wbGF0ZXMuXG5cdCAgICpcblx0ICAgKiBAdHlwZSB7Qm9vbGVhbn1cblx0ICAgKi9cblxuXHQgIGludGVycG9sYXRlOiB0cnVlLFxuXG5cdCAgLyoqXG5cdCAgICogV2hldGhlciB0byB1c2UgYXN5bmMgcmVuZGVyaW5nLlxuXHQgICAqL1xuXG5cdCAgYXN5bmM6IHRydWUsXG5cblx0ICAvKipcblx0ICAgKiBJbnRlcm5hbCBmbGFnIHRvIGluZGljYXRlIHRoZSBkZWxpbWl0ZXJzIGhhdmUgYmVlblxuXHQgICAqIGNoYW5nZWQuXG5cdCAgICpcblx0ICAgKiBAdHlwZSB7Qm9vbGVhbn1cblx0ICAgKi9cblxuXHQgIF9kZWxpbWl0ZXJzQ2hhbmdlZDogdHJ1ZVxuXG5cdH1cblxuXHQvKipcblx0ICogSW50ZXJwb2xhdGlvbiBkZWxpbWl0ZXJzLlxuXHQgKiBXZSBuZWVkIHRvIG1hcmsgdGhlIGNoYW5nZWQgZmxhZyBzbyB0aGF0IHRoZSB0ZXh0IHBhcnNlclxuXHQgKiBrbm93cyBpdCBuZWVkcyB0byByZWNvbXBpbGUgdGhlIHJlZ2V4LlxuXHQgKlxuXHQgKiBAdHlwZSB7QXJyYXk8U3RyaW5nPn1cblx0ICovXG5cblx0dmFyIGRlbGltaXRlcnMgPSBbJ3t7JywgJ319J11cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZS5leHBvcnRzLCAnZGVsaW1pdGVycycsIHtcblx0ICBnZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiBkZWxpbWl0ZXJzXG5cdCAgfSxcblx0ICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgIGRlbGltaXRlcnMgPSB2YWxcblx0ICAgIHRoaXMuX2RlbGltaXRlcnNDaGFuZ2VkID0gdHJ1ZVxuXHQgIH1cblx0fSlcblxuLyoqKi8gfSxcbi8qIDE2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGNvbmZpZyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG5cdHZhciBPYnNlcnZlciA9IF9fd2VicGFja19yZXF1aXJlX18oNDgpXG5cdHZhciBleHBQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQxKVxuXHR2YXIgQmF0Y2hlciA9IF9fd2VicGFja19yZXF1aXJlX18oNDkpXG5cblx0dmFyIGJhdGNoZXIgPSBuZXcgQmF0Y2hlcigpXG5cdHZhciB1aWQgPSAwXG5cblx0LyoqXG5cdCAqIEEgd2F0Y2hlciBwYXJzZXMgYW4gZXhwcmVzc2lvbiwgY29sbGVjdHMgZGVwZW5kZW5jaWVzLFxuXHQgKiBhbmQgZmlyZXMgY2FsbGJhY2sgd2hlbiB0aGUgZXhwcmVzc2lvbiB2YWx1ZSBjaGFuZ2VzLlxuXHQgKiBUaGlzIGlzIHVzZWQgZm9yIGJvdGggdGhlICR3YXRjaCgpIGFwaSBhbmQgZGlyZWN0aXZlcy5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBleHByZXNzaW9uXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG5cdCAqIEBwYXJhbSB7QXJyYXl9IFtmaWx0ZXJzXVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtuZWVkU2V0XVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtkZWVwXVxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cblx0ZnVuY3Rpb24gV2F0Y2hlciAodm0sIGV4cHJlc3Npb24sIGNiLCBmaWx0ZXJzLCBuZWVkU2V0LCBkZWVwKSB7XG5cdCAgdGhpcy52bSA9IHZtXG5cdCAgdm0uX3dhdGNoZXJMaXN0LnB1c2godGhpcylcblx0ICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uXG5cdCAgdGhpcy5jYnMgPSBbY2JdXG5cdCAgdGhpcy5pZCA9ICsrdWlkIC8vIHVpZCBmb3IgYmF0Y2hpbmdcblx0ICB0aGlzLmFjdGl2ZSA9IHRydWVcblx0ICB0aGlzLmRlZXAgPSBkZWVwXG5cdCAgdGhpcy5kZXBzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXHQgIC8vIHNldHVwIGZpbHRlcnMgaWYgYW55LlxuXHQgIC8vIFdlIGRlbGVnYXRlIGRpcmVjdGl2ZSBmaWx0ZXJzIGhlcmUgdG8gdGhlIHdhdGNoZXJcblx0ICAvLyBiZWNhdXNlIHRoZXkgbmVlZCB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZGVwZW5kZW5jeVxuXHQgIC8vIGNvbGxlY3Rpb24gcHJvY2Vzcy5cblx0ICB0aGlzLnJlYWRGaWx0ZXJzID0gZmlsdGVycyAmJiBmaWx0ZXJzLnJlYWRcblx0ICB0aGlzLndyaXRlRmlsdGVycyA9IGZpbHRlcnMgJiYgZmlsdGVycy53cml0ZVxuXHQgIC8vIHBhcnNlIGV4cHJlc3Npb24gZm9yIGdldHRlci9zZXR0ZXJcblx0ICB2YXIgcmVzID0gZXhwUGFyc2VyLnBhcnNlKGV4cHJlc3Npb24sIG5lZWRTZXQpXG5cdCAgdGhpcy5nZXR0ZXIgPSByZXMuZ2V0XG5cdCAgdGhpcy5zZXR0ZXIgPSByZXMuc2V0XG5cdCAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0KClcblx0fVxuXG5cdHZhciBwID0gV2F0Y2hlci5wcm90b3R5cGVcblxuXHQvKipcblx0ICogQWRkIGEgYmluZGluZyBkZXBlbmRlbmN5IHRvIHRoaXMgZGlyZWN0aXZlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0JpbmRpbmd9IGJpbmRpbmdcblx0ICovXG5cblx0cC5hZGREZXAgPSBmdW5jdGlvbiAoYmluZGluZykge1xuXHQgIHZhciBpZCA9IGJpbmRpbmcuaWRcblx0ICBpZiAoIXRoaXMubmV3RGVwc1tpZF0pIHtcblx0ICAgIHRoaXMubmV3RGVwc1tpZF0gPSBiaW5kaW5nXG5cdCAgICBpZiAoIXRoaXMuZGVwc1tpZF0pIHtcblx0ICAgICAgdGhpcy5kZXBzW2lkXSA9IGJpbmRpbmdcblx0ICAgICAgYmluZGluZy5hZGRTdWIodGhpcylcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogRXZhbHVhdGUgdGhlIGdldHRlciwgYW5kIHJlLWNvbGxlY3QgZGVwZW5kZW5jaWVzLlxuXHQgKi9cblxuXHRwLmdldCA9IGZ1bmN0aW9uICgpIHtcblx0ICB0aGlzLmJlZm9yZUdldCgpXG5cdCAgdmFyIHZtID0gdGhpcy52bVxuXHQgIHZhciB2YWx1ZVxuXHQgIHRyeSB7XG5cdCAgICB2YWx1ZSA9IHRoaXMuZ2V0dGVyLmNhbGwodm0sIHZtKVxuXHQgIH0gY2F0Y2ggKGUpIHt9XG5cdCAgLy8gdXNlIEpTT04uc3RyaW5naWZ5IHRvIFwidG91Y2hcIiBldmVyeSBwcm9wZXJ0eVxuXHQgIC8vIHNvIHRoZXkgYXJlIGFsbCB0cmFja2VkIGFzIGRlcGVuZGVuY2llcyBmb3Jcblx0ICAvLyBkZWVwIHdhdGNoaW5nXG5cdCAgaWYgKHRoaXMuZGVlcCkgSlNPTi5zdHJpbmdpZnkodmFsdWUpXG5cdCAgdmFsdWUgPSBfLmFwcGx5RmlsdGVycyh2YWx1ZSwgdGhpcy5yZWFkRmlsdGVycywgdm0pXG5cdCAgdGhpcy5hZnRlckdldCgpXG5cdCAgcmV0dXJuIHZhbHVlXG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIHdpdGggdGhlIHNldHRlci5cblx0ICpcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxuXHQgKi9cblxuXHRwLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgIHZhciB2bSA9IHRoaXMudm1cblx0ICB2YWx1ZSA9IF8uYXBwbHlGaWx0ZXJzKFxuXHQgICAgdmFsdWUsIHRoaXMud3JpdGVGaWx0ZXJzLCB2bSwgdGhpcy52YWx1ZVxuXHQgIClcblx0ICB0cnkge1xuXHQgICAgdGhpcy5zZXR0ZXIuY2FsbCh2bSwgdm0sIHZhbHVlKVxuXHQgIH0gY2F0Y2ggKGUpIHt9XG5cdH1cblxuXHQvKipcblx0ICogUHJlcGFyZSBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuXHQgKi9cblxuXHRwLmJlZm9yZUdldCA9IGZ1bmN0aW9uICgpIHtcblx0ICBPYnNlcnZlci50YXJnZXQgPSB0aGlzXG5cdCAgdGhpcy5uZXdEZXBzID0ge31cblx0fVxuXG5cdC8qKlxuXHQgKiBDbGVhbiB1cCBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuXHQgKi9cblxuXHRwLmFmdGVyR2V0ID0gZnVuY3Rpb24gKCkge1xuXHQgIE9ic2VydmVyLnRhcmdldCA9IG51bGxcblx0ICBmb3IgKHZhciBpZCBpbiB0aGlzLmRlcHMpIHtcblx0ICAgIGlmICghdGhpcy5uZXdEZXBzW2lkXSkge1xuXHQgICAgICB0aGlzLmRlcHNbaWRdLnJlbW92ZVN1Yih0aGlzKVxuXHQgICAgfVxuXHQgIH1cblx0ICB0aGlzLmRlcHMgPSB0aGlzLm5ld0RlcHNcblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJzY3JpYmVyIGludGVyZmFjZS5cblx0ICogV2lsbCBiZSBjYWxsZWQgd2hlbiBhIGRlcGVuZGVuY3kgY2hhbmdlcy5cblx0ICovXG5cblx0cC51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgaWYgKGNvbmZpZy5hc3luYykge1xuXHQgICAgYmF0Y2hlci5wdXNoKHRoaXMpXG5cdCAgfSBlbHNlIHtcblx0ICAgIHRoaXMucnVuKClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQmF0Y2hlciBqb2IgaW50ZXJmYWNlLlxuXHQgKiBXaWxsIGJlIGNhbGxlZCBieSB0aGUgYmF0Y2hlci5cblx0ICovXG5cblx0cC5ydW4gPSBmdW5jdGlvbiAoKSB7XG5cdCAgaWYgKHRoaXMuYWN0aXZlKSB7XG5cdCAgICB2YXIgdmFsdWUgPSB0aGlzLmdldCgpXG5cdCAgICBpZiAoXG5cdCAgICAgICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsKSB8fFxuXHQgICAgICB2YWx1ZSAhPT0gdGhpcy52YWx1ZVxuXHQgICAgKSB7XG5cdCAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWVcblx0ICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXG5cdCAgICAgIHZhciBjYnMgPSB0aGlzLmNic1xuXHQgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNicy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgICAgICBjYnNbaV0odmFsdWUsIG9sZFZhbHVlKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBhIGNhbGxiYWNrLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuXHQgKi9cblxuXHRwLmFkZENiID0gZnVuY3Rpb24gKGNiKSB7XG5cdCAgdGhpcy5jYnMucHVzaChjYilcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYSBjYWxsYmFjay5cblx0ICpcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2Jcblx0ICovXG5cblx0cC5yZW1vdmVDYiA9IGZ1bmN0aW9uIChjYikge1xuXHQgIHZhciBjYnMgPSB0aGlzLmNic1xuXHQgIGlmIChjYnMubGVuZ3RoID4gMSkge1xuXHQgICAgdmFyIGkgPSBjYnMuaW5kZXhPZihjYilcblx0ICAgIGlmIChpID4gLTEpIHtcblx0ICAgICAgY2JzLnNwbGljZShpLCAxKVxuXHQgICAgfVxuXHQgIH0gZWxzZSBpZiAoY2IgPT09IGNic1swXSkge1xuXHQgICAgdGhpcy50ZWFyZG93bigpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBzZWxmIGZyb20gYWxsIGRlcGVuZGVuY2llcycgc3ViY3JpYmVyIGxpc3QuXG5cdCAqL1xuXG5cdHAudGVhcmRvd24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgaWYgKHRoaXMuYWN0aXZlKSB7XG5cdCAgICAvLyByZW1vdmUgc2VsZiBmcm9tIHZtJ3Mgd2F0Y2hlciBsaXN0XG5cdCAgICAvLyB3ZSBjYW4gc2tpcCB0aGlzIGlmIHRoZSB2bSBpZiBiZWluZyBkZXN0cm95ZWRcblx0ICAgIC8vIHdoaWNoIGNhbiBpbXByb3ZlIHRlYXJkb3duIHBlcmZvcm1hbmNlLlxuXHQgICAgaWYgKCF0aGlzLnZtLl9pc0JlaW5nRGVzdHJveWVkKSB7XG5cdCAgICAgIHZhciBsaXN0ID0gdGhpcy52bS5fd2F0Y2hlckxpc3Rcblx0ICAgICAgbGlzdC5zcGxpY2UobGlzdC5pbmRleE9mKHRoaXMpKVxuXHQgICAgfVxuXHQgICAgZm9yICh2YXIgaWQgaW4gdGhpcy5kZXBzKSB7XG5cdCAgICAgIHRoaXMuZGVwc1tpZF0ucmVtb3ZlU3ViKHRoaXMpXG5cdCAgICB9XG5cdCAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG5cdCAgICB0aGlzLnZtID0gdGhpcy5jYnMgPSB0aGlzLnZhbHVlID0gbnVsbFxuXHQgIH1cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gV2F0Y2hlclxuXG4vKioqLyB9LFxuLyogMTcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdGhpcy5hdHRyID0gdGhpcy5lbC5ub2RlVHlwZSA9PT0gM1xuXHQgICAgICA/ICdub2RlVmFsdWUnXG5cdCAgICAgIDogJ3RleHRDb250ZW50J1xuXHQgIH0sXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgdGhpcy5lbFt0aGlzLmF0dHJdID0gXy50b1N0cmluZyh2YWx1ZSlcblx0ICB9XG5cdCAgXG5cdH1cblxuLyoqKi8gfSxcbi8qIDE4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIHRlbXBsYXRlUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MClcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIC8vIGEgY29tbWVudCBub2RlIG1lYW5zIHRoaXMgaXMgYSBiaW5kaW5nIGZvclxuXHQgICAgLy8ge3t7IGlubGluZSB1bmVzY2FwZWQgaHRtbCB9fX1cblx0ICAgIGlmICh0aGlzLmVsLm5vZGVUeXBlID09PSA4KSB7XG5cdCAgICAgIC8vIGhvbGQgbm9kZXNcblx0ICAgICAgdGhpcy5ub2RlcyA9IFtdXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICB2YWx1ZSA9IF8udG9TdHJpbmcodmFsdWUpXG5cdCAgICBpZiAodGhpcy5ub2Rlcykge1xuXHQgICAgICB0aGlzLnN3YXAodmFsdWUpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLmVsLmlubmVySFRNTCA9IHZhbHVlXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHN3YXA6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgLy8gcmVtb3ZlIG9sZCBub2Rlc1xuXHQgICAgdmFyIGkgPSB0aGlzLm5vZGVzLmxlbmd0aFxuXHQgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICBfLnJlbW92ZSh0aGlzLm5vZGVzW2ldKVxuXHQgICAgfVxuXHQgICAgLy8gY29udmVydCBuZXcgdmFsdWUgdG8gYSBmcmFnbWVudFxuXHQgICAgdmFyIGZyYWcgPSB0ZW1wbGF0ZVBhcnNlci5wYXJzZSh2YWx1ZSwgdHJ1ZSlcblx0ICAgIC8vIHNhdmUgYSByZWZlcmVuY2UgdG8gdGhlc2Ugbm9kZXMgc28gd2UgY2FuIHJlbW92ZSBsYXRlclxuXHQgICAgdGhpcy5ub2RlcyA9IF8udG9BcnJheShmcmFnLmNoaWxkTm9kZXMpXG5cdCAgICBfLmJlZm9yZShmcmFnLCB0aGlzLmVsKVxuXHQgIH1cblxuXHR9XG5cbi8qKiovIH0sXG4vKiAxOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Ly8geGxpbmtcblx0dmFyIHhsaW5rTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaydcblx0dmFyIHhsaW5rUkUgPSAvXnhsaW5rOi9cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIHByaW9yaXR5OiA4NTAsXG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgbmFtZSA9IHRoaXMuYXJnXG5cdCAgICB0aGlzLnVwZGF0ZSA9IHhsaW5rUkUudGVzdChuYW1lKVxuXHQgICAgICA/IHhsaW5rSGFuZGxlclxuXHQgICAgICA6IGRlZmF1bHRIYW5kbGVyXG5cdCAgfVxuXG5cdH1cblxuXHRmdW5jdGlvbiBkZWZhdWx0SGFuZGxlciAodmFsdWUpIHtcblx0ICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDApIHtcblx0ICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKHRoaXMuYXJnLCB2YWx1ZSlcblx0ICB9IGVsc2Uge1xuXHQgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUodGhpcy5hcmcpXG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24geGxpbmtIYW5kbGVyICh2YWx1ZSkge1xuXHQgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG5cdCAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZU5TKHhsaW5rTlMsIHRoaXMuYXJnLCB2YWx1ZSlcblx0ICB9IGVsc2Uge1xuXHQgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGVOUyh4bGlua05TLCAnaHJlZicpXG5cdCAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiAyMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHRyYW5zaXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQyKVxuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgdmFyIGVsID0gdGhpcy5lbFxuXHQgIHRyYW5zaXRpb24uYXBwbHkoZWwsIHZhbHVlID8gMSA6IC0xLCBmdW5jdGlvbiAoKSB7XG5cdCAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJ1xuXHQgIH0sIHRoaXMudm0pXG5cdH1cblxuLyoqKi8gfSxcbi8qIDIxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGhhc0NsYXNzTGlzdCA9XG5cdCAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJlxuXHQgICdjbGFzc0xpc3QnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuXG5cdC8qKlxuXHQgKiBhZGQgY2xhc3MgZm9yIElFOVxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7U3Ryb25nfSBjbHNcblx0ICovXG5cblx0dmFyIGFkZENsYXNzID0gaGFzQ2xhc3NMaXN0XG5cdCAgPyBmdW5jdGlvbiAoZWwsIGNscykge1xuXHQgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNscylcblx0ICAgIH1cblx0ICA6IF8uYWRkQ2xhc3NcblxuXHQvKipcblx0ICogcmVtb3ZlIGNsYXNzIGZvciBJRTlcblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge1N0cm9uZ30gY2xzXG5cdCAqL1xuXG5cdHZhciByZW1vdmVDbGFzcyA9IGhhc0NsYXNzTGlzdFxuXHQgID8gZnVuY3Rpb24gKGVsLCBjbHMpIHtcblx0ICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpXG5cdCAgICB9XG5cdCAgOiBfLnJlbW92ZUNsYXNzXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICBpZiAodGhpcy5hcmcpIHtcblx0ICAgIHZhciBtZXRob2QgPSB2YWx1ZSA/IGFkZENsYXNzIDogcmVtb3ZlQ2xhc3Ncblx0ICAgIG1ldGhvZCh0aGlzLmVsLCB0aGlzLmFyZylcblx0ICB9IGVsc2Uge1xuXHQgICAgaWYgKHRoaXMubGFzdFZhbCkge1xuXHQgICAgICByZW1vdmVDbGFzcyh0aGlzLmVsLCB0aGlzLmxhc3RWYWwpXG5cdCAgICB9XG5cdCAgICBpZiAodmFsdWUpIHtcblx0ICAgICAgYWRkQ2xhc3ModGhpcy5lbCwgdmFsdWUpXG5cdCAgICAgIHRoaXMubGFzdFZhbCA9IHZhbHVlXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiAyMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBpc0xpdGVyYWw6IHRydWUsXG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB0aGlzLnZtLiQkW3RoaXMuZXhwcmVzc2lvbl0gPSB0aGlzLmVsXG5cdCAgfSxcblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgZGVsZXRlIHRoaXMudm0uJCRbdGhpcy5leHByZXNzaW9uXVxuXHQgIH1cblx0ICBcblx0fVxuXG4vKioqLyB9LFxuLyogMjMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgaXNMaXRlcmFsOiB0cnVlLFxuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgaWYgKHRoaXMuZWwgIT09IHRoaXMudm0uJGVsKSB7XG5cdCAgICAgIF8ud2Fybihcblx0ICAgICAgICAndi1yZWYgc2hvdWxkIG9ubHkgYmUgdXNlZCBvbiBpbnN0YW5jZSByb290IG5vZGVzLidcblx0ICAgICAgKVxuXHQgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIHRoaXMub3duZXIgPSB0aGlzLnZtLiRwYXJlbnRcblx0ICAgIHRoaXMub3duZXIuJFt0aGlzLmV4cHJlc3Npb25dID0gdGhpcy52bVxuXHQgIH0sXG5cblx0ICB1bmJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIGRlbGV0ZSB0aGlzLm93bmVyLiRbdGhpcy5leHByZXNzaW9uXVxuXHQgIH1cblx0ICBcblx0fVxuXG4vKioqLyB9LFxuLyogMjQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBjb25maWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIGVsID0gdGhpcy5lbFxuXHQgICAgdGhpcy52bS4kb25jZSgnaG9vazpjb21waWxlZCcsIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGNvbmZpZy5wcmVmaXggKyAnY2xvYWsnKVxuXHQgICAgfSlcblx0ICB9XG5cblx0fVxuXG4vKioqLyB9LFxuLyogMjUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBwcmVmaXhlcyA9IFsnLXdlYmtpdC0nLCAnLW1vei0nLCAnLW1zLSddXG5cdHZhciBpbXBvcnRhbnRSRSA9IC8haW1wb3J0YW50Oz8kL1xuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIHByb3AgPSB0aGlzLmFyZ1xuXHQgICAgaWYgKCFwcm9wKSByZXR1cm5cblx0ICAgIGlmIChwcm9wLmNoYXJBdCgwKSA9PT0gJyQnKSB7XG5cdCAgICAgIC8vIHByb3BlcnRpZXMgdGhhdCBzdGFydCB3aXRoICQgd2lsbCBiZSBhdXRvLXByZWZpeGVkXG5cdCAgICAgIHByb3AgPSBwcm9wLnNsaWNlKDEpXG5cdCAgICAgIHRoaXMucHJlZml4ZWQgPSB0cnVlXG5cdCAgICB9XG5cdCAgICB0aGlzLnByb3AgPSBwcm9wXG5cdCAgfSxcblxuXHQgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICB2YXIgcHJvcCA9IHRoaXMucHJvcFxuXHQgICAgLy8gY2FzdCBwb3NzaWJsZSBudW1iZXJzL2Jvb2xlYW5zIGludG8gc3RyaW5nc1xuXHQgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcblx0ICAgICAgdmFsdWUgKz0gJydcblx0ICAgIH1cblx0ICAgIGlmIChwcm9wKSB7XG5cdCAgICAgIHZhciBpc0ltcG9ydGFudCA9IGltcG9ydGFudFJFLnRlc3QodmFsdWUpXG5cdCAgICAgICAgPyAnaW1wb3J0YW50J1xuXHQgICAgICAgIDogJydcblx0ICAgICAgaWYgKGlzSW1wb3J0YW50KSB7XG5cdCAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKGltcG9ydGFudFJFLCAnJykudHJpbSgpXG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5lbC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wLCB2YWx1ZSwgaXNJbXBvcnRhbnQpXG5cdCAgICAgIGlmICh0aGlzLnByZWZpeGVkKSB7XG5cdCAgICAgICAgdmFyIGkgPSBwcmVmaXhlcy5sZW5ndGhcblx0ICAgICAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgICAgICB0aGlzLmVsLnN0eWxlLnNldFByb3BlcnR5KFxuXHQgICAgICAgICAgICBwcmVmaXhlc1tpXSArIHByb3AsXG5cdCAgICAgICAgICAgIHZhbHVlLFxuXHQgICAgICAgICAgICBpc0ltcG9ydGFudFxuXHQgICAgICAgICAgKVxuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5lbC5zdHlsZS5jc3NUZXh0ID0gdmFsdWVcblx0ICAgIH1cblx0ICB9XG5cblx0fVxuXG4vKioqLyB9LFxuLyogMjYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgdGVtcGxhdGVQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUwKVxuXHR2YXIgdHJhbnNpdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNDIpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBpc0xpdGVyYWw6IHRydWUsXG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgZWwgPSB0aGlzLmVsXG5cdCAgICB0aGlzLnN0YXJ0ID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgndi1wYXJ0aWFsLXN0YXJ0Jylcblx0ICAgIHRoaXMuZW5kID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgndi1wYXJ0aWFsLWVuZCcpXG5cdCAgICBpZiAoZWwubm9kZVR5cGUgIT09IDgpIHtcblx0ICAgICAgZWwuaW5uZXJIVE1MID0gJydcblx0ICAgIH1cblx0ICAgIGlmIChlbC50YWdOYW1lID09PSAnVEVNUExBVEUnIHx8IGVsLm5vZGVUeXBlID09PSA4KSB7XG5cdCAgICAgIF8ucmVwbGFjZShlbCwgdGhpcy5lbmQpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBlbC5hcHBlbmRDaGlsZCh0aGlzLmVuZClcblx0ICAgIH1cblx0ICAgIF8uYmVmb3JlKHRoaXMuc3RhcnQsIHRoaXMuZW5kKVxuXHQgICAgaWYgKCF0aGlzLl9pc0R5bmFtaWNMaXRlcmFsKSB7XG5cdCAgICAgIHRoaXMuY29tcGlsZSh0aGlzLmV4cHJlc3Npb24pXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHVwZGF0ZTogZnVuY3Rpb24gKGlkKSB7XG5cdCAgICB0aGlzLnRlYXJkb3duKClcblx0ICAgIHRoaXMuY29tcGlsZShpZClcblx0ICB9LFxuXG5cdCAgY29tcGlsZTogZnVuY3Rpb24gKGlkKSB7XG5cdCAgICB2YXIgcGFydGlhbCA9IHRoaXMudm0uJG9wdGlvbnMucGFydGlhbHNbaWRdXG5cdCAgICBfLmFzc2VydEFzc2V0KHBhcnRpYWwsICdwYXJ0aWFsJywgaWQpXG5cdCAgICBpZiAoIXBhcnRpYWwpIHtcblx0ICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICB2YXIgdm0gPSB0aGlzLnZtXG5cdCAgICB2YXIgZnJhZyA9IHRlbXBsYXRlUGFyc2VyLnBhcnNlKHBhcnRpYWwsIHRydWUpXG5cdCAgICB2YXIgZGVjb21waWxlID0gdm0uJGNvbXBpbGUoZnJhZylcblx0ICAgIHRoaXMuZGVjb21waWxlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICBkZWNvbXBpbGUoKVxuXHQgICAgICB0cmFuc2l0aW9uLmJsb2NrUmVtb3ZlKHRoaXMuc3RhcnQsIHRoaXMuZW5kLCB2bSlcblx0ICAgIH1cblx0ICAgIHRyYW5zaXRpb24uYmxvY2tBcHBlbmQoZnJhZywgdGhpcy5lbmQsIHZtKVxuXHQgIH0sXG5cblx0ICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuXHQgICAgaWYgKHRoaXMuZGVjb21waWxlKSB7XG5cdCAgICAgIHRoaXMuZGVjb21waWxlKClcblx0ICAgICAgdGhpcy5kZWNvbXBpbGUgPSBudWxsXG5cdCAgICB9XG5cdCAgfVxuXG5cdH1cblxuLyoqKi8gfSxcbi8qIDI3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIHByaW9yaXR5OiAxMDAwLFxuXHQgIGlzTGl0ZXJhbDogdHJ1ZSxcblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHRoaXMuZWwuX192X3RyYW5zID0ge1xuXHQgICAgICBpZDogdGhpcy5leHByZXNzaW9uXG5cdCAgICB9XG5cdCAgfVxuXG5cdH1cblxuLyoqKi8gfSxcbi8qIDI4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIGFjY2VwdFN0YXRlbWVudDogdHJ1ZSxcblx0ICBwcmlvcml0eTogNzAwLFxuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gZGVhbCB3aXRoIGlmcmFtZXNcblx0ICAgIGlmIChcblx0ICAgICAgdGhpcy5lbC50YWdOYW1lID09PSAnSUZSQU1FJyAmJlxuXHQgICAgICB0aGlzLmFyZyAhPT0gJ2xvYWQnXG5cdCAgICApIHtcblx0ICAgICAgdmFyIHNlbGYgPSB0aGlzXG5cdCAgICAgIHRoaXMuaWZyYW1lQmluZCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBfLm9uKHNlbGYuZWwuY29udGVudFdpbmRvdywgc2VsZi5hcmcsIHNlbGYuaGFuZGxlcilcblx0ICAgICAgfVxuXHQgICAgICBfLm9uKHRoaXMuZWwsICdsb2FkJywgdGhpcy5pZnJhbWVCaW5kKVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG5cdCAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgXy53YXJuKFxuXHQgICAgICAgICdEaXJlY3RpdmUgXCJ2LW9uOicgKyB0aGlzLmV4cHJlc3Npb24gKyAnXCIgJyArXG5cdCAgICAgICAgJ2V4cGVjdHMgYSBmdW5jdGlvbiB2YWx1ZS4nXG5cdCAgICAgIClcblx0ICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICB0aGlzLnJlc2V0KClcblx0ICAgIHZhciB2bSA9IHRoaXMudm1cblx0ICAgIHRoaXMuaGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG5cdCAgICAgIGUudGFyZ2V0Vk0gPSB2bVxuXHQgICAgICB2bS4kZXZlbnQgPSBlXG5cdCAgICAgIHZhciByZXMgPSBoYW5kbGVyKGUpXG5cdCAgICAgIHZtLiRldmVudCA9IG51bGxcblx0ICAgICAgcmV0dXJuIHJlc1xuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMuaWZyYW1lQmluZCkge1xuXHQgICAgICB0aGlzLmlmcmFtZUJpbmQoKVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgXy5vbih0aGlzLmVsLCB0aGlzLmFyZywgdGhpcy5oYW5kbGVyKVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIGVsID0gdGhpcy5pZnJhbWVCaW5kXG5cdCAgICAgID8gdGhpcy5lbC5jb250ZW50V2luZG93XG5cdCAgICAgIDogdGhpcy5lbFxuXHQgICAgaWYgKHRoaXMuaGFuZGxlcikge1xuXHQgICAgICBfLm9mZihlbCwgdGhpcy5hcmcsIHRoaXMuaGFuZGxlcilcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgdW5iaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB0aGlzLnJlc2V0KClcblx0ICAgIF8ub2ZmKHRoaXMuZWwsICdsb2FkJywgdGhpcy5pZnJhbWVCaW5kKVxuXHQgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogMjkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgdGVtcGxhdGVQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUwKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgaXNMaXRlcmFsOiB0cnVlLFxuXG5cdCAgLyoqXG5cdCAgICogU2V0dXAuIFR3byBwb3NzaWJsZSB1c2FnZXM6XG5cdCAgICpcblx0ICAgKiAtIHN0YXRpYzpcblx0ICAgKiAgIHYtY29tcG9uZW50PVwiY29tcFwiXG5cdCAgICpcblx0ICAgKiAtIGR5bmFtaWM6XG5cdCAgICogICB2LWNvbXBvbmVudD1cInt7Y3VycmVudFZpZXd9fVwiXG5cdCAgICovXG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICBpZiAoIXRoaXMuZWwuX192dWVfXykge1xuXHQgICAgICAvLyBjcmVhdGUgYSByZWYgYW5jaG9yXG5cdCAgICAgIHRoaXMucmVmID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgndi1jb21wb25lbnQnKVxuXHQgICAgICBfLnJlcGxhY2UodGhpcy5lbCwgdGhpcy5yZWYpXG5cdCAgICAgIC8vIGNoZWNrIGtlZXAtYWxpdmUgb3B0aW9uc1xuXHQgICAgICB0aGlzLmNoZWNrS2VlcEFsaXZlKClcblx0ICAgICAgLy8gY2hlY2sgcGFyZW50IGRpcmVjdGl2ZXNcblx0ICAgICAgdGhpcy5wYXJlbnRMaW5rZXIgPSB0aGlzLmVsLl9wYXJlbnRMaW5rZXJcblx0ICAgICAgLy8gaWYgc3RhdGljLCBidWlsZCByaWdodCBub3cuXG5cdCAgICAgIGlmICghdGhpcy5faXNEeW5hbWljTGl0ZXJhbCkge1xuXHQgICAgICAgIHRoaXMucmVzb2x2ZUN0b3IodGhpcy5leHByZXNzaW9uKVxuXHQgICAgICAgIHRoaXMuYnVpbGQoKVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBfLndhcm4oXG5cdCAgICAgICAgJ3YtY29tcG9uZW50PVwiJyArIHRoaXMuZXhwcmVzc2lvbiArICdcIiBjYW5ub3QgYmUgJyArXG5cdCAgICAgICAgJ3VzZWQgb24gYW4gYWxyZWFkeSBtb3VudGVkIGluc3RhbmNlLidcblx0ICAgICAgKVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBDaGVjayBpZiB0aGUgXCJrZWVwLWFsaXZlXCIgZmxhZyBpcyBwcmVzZW50LlxuXHQgICAqIElmIHllcywgaW5zdGVhZCBvZiBkZXN0cm95aW5nIHRoZSBhY3RpdmUgdm0gd2hlblxuXHQgICAqIGhpZGluZyAodi1pZikgb3Igc3dpdGNoaW5nIChkeW5hbWljIGxpdGVyYWwpIGl0LFxuXHQgICAqIHdlIHNpbXBseSByZW1vdmUgaXQgZnJvbSB0aGUgRE9NIGFuZCBzYXZlIGl0IGluIGFcblx0ICAgKiBjYWNoZSBvYmplY3QsIHdpdGggaXRzIGNvbnN0cnVjdG9yIGlkIGFzIHRoZSBrZXkuXG5cdCAgICovXG5cblx0ICBjaGVja0tlZXBBbGl2ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gY2hlY2sga2VlcC1hbGl2ZSBmbGFnXG5cdCAgICB0aGlzLmtlZXBBbGl2ZSA9IHRoaXMuZWwuaGFzQXR0cmlidXRlKCdrZWVwLWFsaXZlJylcblx0ICAgIGlmICh0aGlzLmtlZXBBbGl2ZSkge1xuXHQgICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSgna2VlcC1hbGl2ZScpXG5cdCAgICAgIHRoaXMuY2FjaGUgPSB7fVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBSZXNvbHZlIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgdG8gdXNlIHdoZW4gY3JlYXRpbmdcblx0ICAgKiB0aGUgY2hpbGQgdm0uXG5cdCAgICovXG5cblx0ICByZXNvbHZlQ3RvcjogZnVuY3Rpb24gKGlkKSB7XG5cdCAgICB0aGlzLmN0b3JJZCA9IGlkXG5cdCAgICB0aGlzLkN0b3IgPSB0aGlzLnZtLiRvcHRpb25zLmNvbXBvbmVudHNbaWRdXG5cdCAgICBfLmFzc2VydEFzc2V0KHRoaXMuQ3RvciwgJ2NvbXBvbmVudCcsIGlkKVxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBJbnN0YW50aWF0ZS9pbnNlcnQgYSBuZXcgY2hpbGQgdm0uXG5cdCAgICogSWYga2VlcCBhbGl2ZSBhbmQgaGFzIGNhY2hlZCBpbnN0YW5jZSwgaW5zZXJ0IHRoYXRcblx0ICAgKiBpbnN0YW5jZTsgb3RoZXJ3aXNlIGJ1aWxkIGEgbmV3IG9uZSBhbmQgY2FjaGUgaXQuXG5cdCAgICovXG5cblx0ICBidWlsZDogZnVuY3Rpb24gKCkge1xuXHQgICAgaWYgKHRoaXMua2VlcEFsaXZlKSB7XG5cdCAgICAgIHZhciBjYWNoZWQgPSB0aGlzLmNhY2hlW3RoaXMuY3RvcklkXVxuXHQgICAgICBpZiAoY2FjaGVkKSB7XG5cdCAgICAgICAgdGhpcy5jaGlsZFZNID0gY2FjaGVkXG5cdCAgICAgICAgY2FjaGVkLiRiZWZvcmUodGhpcy5yZWYpXG5cdCAgICAgICAgcmV0dXJuXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIHZhciB2bSA9IHRoaXMudm1cblx0ICAgIGlmICh0aGlzLkN0b3IgJiYgIXRoaXMuY2hpbGRWTSkge1xuXHQgICAgICB0aGlzLmNoaWxkVk0gPSB2bS4kYWRkQ2hpbGQoe1xuXHQgICAgICAgIGVsOiB0ZW1wbGF0ZVBhcnNlci5jbG9uZSh0aGlzLmVsKVxuXHQgICAgICB9LCB0aGlzLkN0b3IpXG5cdCAgICAgIGlmICh0aGlzLnBhcmVudExpbmtlcikge1xuXHQgICAgICAgIHZhciBkaXJDb3VudCA9IHZtLl9kaXJlY3RpdmVzLmxlbmd0aFxuXHQgICAgICAgIHZhciB0YXJnZXRWTSA9IHRoaXMuY2hpbGRWTS4kb3B0aW9ucy5pbmhlcml0XG5cdCAgICAgICAgICA/IHRoaXMuY2hpbGRWTVxuXHQgICAgICAgICAgOiB2bVxuXHQgICAgICAgIHRoaXMucGFyZW50TGlua2VyKHRhcmdldFZNLCB0aGlzLmNoaWxkVk0uJGVsKVxuXHQgICAgICAgIHRoaXMucGFyZW50RGlycyA9IHZtLl9kaXJlY3RpdmVzLnNsaWNlKGRpckNvdW50KVxuXHQgICAgICB9XG5cdCAgICAgIGlmICh0aGlzLmtlZXBBbGl2ZSkge1xuXHQgICAgICAgIHRoaXMuY2FjaGVbdGhpcy5jdG9ySWRdID0gdGhpcy5jaGlsZFZNXG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5jaGlsZFZNLiRiZWZvcmUodGhpcy5yZWYpXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIFRlYXJkb3duIHRoZSBhY3RpdmUgdm0uXG5cdCAgICogSWYga2VlcCBhbGl2ZSwgc2ltcGx5IHJlbW92ZSBpdDsgb3RoZXJ3aXNlIGRlc3Ryb3kgaXQuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbW92ZVxuXHQgICAqL1xuXG5cdCAgdW5idWlsZDogZnVuY3Rpb24gKHJlbW92ZSkge1xuXHQgICAgaWYgKCF0aGlzLmNoaWxkVk0pIHtcblx0ICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5rZWVwQWxpdmUpIHtcblx0ICAgICAgaWYgKHJlbW92ZSkge1xuXHQgICAgICAgIHRoaXMuY2hpbGRWTS4kcmVtb3ZlKClcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5jaGlsZFZNLiRkZXN0cm95KHJlbW92ZSlcblx0ICAgICAgaWYgKHRoaXMucGFyZW50RGlycykge1xuXHQgICAgICAgIHZhciBpID0gdGhpcy5wYXJlbnREaXJzLmxlbmd0aFxuXHQgICAgICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgICAgIHRoaXMucGFyZW50RGlyc1tpXS5fdGVhcmRvd24oKVxuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgdGhpcy5jaGlsZFZNID0gbnVsbFxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBVcGRhdGUgY2FsbGJhY2sgZm9yIHRoZSBkeW5hbWljIGxpdGVyYWwgc2NlbmFyaW8sXG5cdCAgICogZS5nLiB2LWNvbXBvbmVudD1cInt7dmlld319XCJcblx0ICAgKi9cblxuXHQgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICB0aGlzLnVuYnVpbGQodHJ1ZSlcblx0ICAgIGlmICh2YWx1ZSkge1xuXHQgICAgICB0aGlzLnJlc29sdmVDdG9yKHZhbHVlKVxuXHQgICAgICB0aGlzLmJ1aWxkKClcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogVW5iaW5kLlxuXHQgICAqIE1ha2Ugc3VyZSBrZWVwQWxpdmUgaXMgc2V0IHRvIGZhbHNlIHNvIHRoYXQgdGhlXG5cdCAgICogaW5zdGFuY2UgaXMgYWx3YXlzIGRlc3Ryb3llZC5cblx0ICAgKi9cblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdGhpcy5rZWVwQWxpdmUgPSBmYWxzZVxuXHQgICAgdGhpcy51bmJ1aWxkKClcblx0ICB9XG5cblx0fVxuXG4vKioqLyB9LFxuLyogMzAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgaXNPYmplY3QgPSBfLmlzT2JqZWN0XG5cdHZhciB0ZXh0UGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOSlcblx0dmFyIGV4cFBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNDEpXG5cdHZhciB0ZW1wbGF0ZVBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNTApXG5cdHZhciBjb21waWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Mylcblx0dmFyIHRyYW5zY2x1ZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ2KVxuXHR2YXIgbWVyZ2VPcHRpb25zID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNClcblx0dmFyIHVpZCA9IDBcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIC8qKlxuXHQgICAqIFNldHVwLlxuXHQgICAqL1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gdWlkIGFzIGEgY2FjaGUgaWRlbnRpZmllclxuXHQgICAgdGhpcy5pZCA9ICdfX3ZfcmVwZWF0XycgKyAoKyt1aWQpXG5cdCAgICAvLyB3ZSBuZWVkIHRvIGluc2VydCB0aGUgb2JqVG9BcnJheSBjb252ZXJ0ZXJcblx0ICAgIC8vIGFzIHRoZSBmaXJzdCByZWFkIGZpbHRlci5cblx0ICAgIGlmICghdGhpcy5maWx0ZXJzKSB7XG5cdCAgICAgIHRoaXMuZmlsdGVycyA9IHt9XG5cdCAgICB9XG5cdCAgICAvLyBhZGQgdGhlIG9iamVjdCAtPiBhcnJheSBjb252ZXJ0IGZpbHRlclxuXHQgICAgdmFyIG9iamVjdENvbnZlcnRlciA9IF8uYmluZChvYmpUb0FycmF5LCB0aGlzKVxuXHQgICAgaWYgKCF0aGlzLmZpbHRlcnMucmVhZCkge1xuXHQgICAgICB0aGlzLmZpbHRlcnMucmVhZCA9IFtvYmplY3RDb252ZXJ0ZXJdXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLmZpbHRlcnMucmVhZC51bnNoaWZ0KG9iamVjdENvbnZlcnRlcilcblx0ICAgIH1cblx0ICAgIC8vIHNldHVwIHJlZiBub2RlXG5cdCAgICB0aGlzLnJlZiA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3YtcmVwZWF0Jylcblx0ICAgIF8ucmVwbGFjZSh0aGlzLmVsLCB0aGlzLnJlZilcblx0ICAgIC8vIGNoZWNrIGlmIHRoaXMgaXMgYSBibG9jayByZXBlYXRcblx0ICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLmVsLnRhZ05hbWUgPT09ICdURU1QTEFURSdcblx0ICAgICAgPyB0ZW1wbGF0ZVBhcnNlci5wYXJzZSh0aGlzLmVsLCB0cnVlKVxuXHQgICAgICA6IHRoaXMuZWxcblx0ICAgIC8vIGNoZWNrIG90aGVyIGRpcmVjdGl2ZXMgdGhhdCBuZWVkIHRvIGJlIGhhbmRsZWRcblx0ICAgIC8vIGF0IHYtcmVwZWF0IGxldmVsXG5cdCAgICB0aGlzLmNoZWNrSWYoKVxuXHQgICAgdGhpcy5jaGVja1JlZigpXG5cdCAgICB0aGlzLmNoZWNrVHJhY2tCeUlkKClcblx0ICAgIHRoaXMuY2hlY2tDb21wb25lbnQoKVxuXHQgICAgLy8gY2FjaGUgZm9yIHByaW1pdGl2ZSB2YWx1ZSBpbnN0YW5jZXNcblx0ICAgIHRoaXMuY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIFdhcm4gYWdhaW5zdCB2LWlmIHVzYWdlLlxuXHQgICAqL1xuXG5cdCAgY2hlY2tJZjogZnVuY3Rpb24gKCkge1xuXHQgICAgaWYgKF8uYXR0cih0aGlzLmVsLCAnaWYnKSAhPT0gbnVsbCkge1xuXHQgICAgICBfLndhcm4oXG5cdCAgICAgICAgJ0RvblxcJ3QgdXNlIHYtaWYgd2l0aCB2LXJlcGVhdC4gJyArXG5cdCAgICAgICAgJ1VzZSB2LXNob3cgb3IgdGhlIFwiZmlsdGVyQnlcIiBmaWx0ZXIgaW5zdGVhZC4nXG5cdCAgICAgIClcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogQ2hlY2sgaWYgdi1yZWYvIHYtZWwgaXMgYWxzbyBwcmVzZW50LlxuXHQgICAqL1xuXG5cdCAgY2hlY2tSZWY6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBjaGlsZElkID0gXy5hdHRyKHRoaXMuZWwsICdyZWYnKVxuXHQgICAgdGhpcy5jaGlsZElkID0gY2hpbGRJZFxuXHQgICAgICA/IHRoaXMudm0uJGludGVycG9sYXRlKGNoaWxkSWQpXG5cdCAgICAgIDogbnVsbFxuXHQgICAgdmFyIGVsSWQgPSBfLmF0dHIodGhpcy5lbCwgJ2VsJylcblx0ICAgIHRoaXMuZWxJZCA9IGVsSWRcblx0ICAgICAgPyB0aGlzLnZtLiRpbnRlcnBvbGF0ZShlbElkKVxuXHQgICAgICA6IG51bGxcblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogQ2hlY2sgZm9yIGEgdHJhY2stYnkgSUQsIHdoaWNoIGFsbG93cyB1cyB0byBpZGVudGlmeVxuXHQgICAqIGEgcGllY2Ugb2YgZGF0YSBhbmQgaXRzIGFzc29jaWF0ZWQgaW5zdGFuY2UgYnkgaXRzXG5cdCAgICogdW5pcXVlIGlkLlxuXHQgICAqL1xuXG5cdCAgY2hlY2tUcmFja0J5SWQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHRoaXMuaWRLZXkgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZSgndHJhY2tieScpXG5cdCAgICBpZiAodGhpcy5pZEtleSAhPT0gbnVsbCkge1xuXHQgICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSgndHJhY2tieScpXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIENoZWNrIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgdG8gdXNlIGZvciByZXBlYXRlZFxuXHQgICAqIGluc3RhbmNlcy4gSWYgc3RhdGljIHdlIHJlc29sdmUgaXQgbm93LCBvdGhlcndpc2UgaXRcblx0ICAgKiBuZWVkcyB0byBiZSByZXNvbHZlZCBhdCBidWlsZCB0aW1lIHdpdGggYWN0dWFsIGRhdGEuXG5cdCAgICovXG5cblx0ICBjaGVja0NvbXBvbmVudDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIGlkID0gXy5hdHRyKHRoaXMuZWwsICdjb21wb25lbnQnKVxuXHQgICAgdmFyIG9wdGlvbnMgPSB0aGlzLnZtLiRvcHRpb25zXG5cdCAgICBpZiAoIWlkKSB7XG5cdCAgICAgIHRoaXMuQ3RvciA9IF8uVnVlIC8vIGRlZmF1bHQgY29uc3RydWN0b3Jcblx0ICAgICAgdGhpcy5pbmhlcml0ID0gdHJ1ZSAvLyBpbmxpbmUgcmVwZWF0cyBzaG91bGQgaW5oZXJpdFxuXHQgICAgICAvLyBpbXBvcnRhbnQ6IHRyYW5zY2x1ZGUgd2l0aCBubyBvcHRpb25zLCBqdXN0XG5cdCAgICAgIC8vIHRvIGVuc3VyZSBibG9jayBzdGFydCBhbmQgYmxvY2sgZW5kXG5cdCAgICAgIHRoaXMudGVtcGxhdGUgPSB0cmFuc2NsdWRlKHRoaXMudGVtcGxhdGUpXG5cdCAgICAgIHRoaXMuX2xpbmtlciA9IGNvbXBpbGUodGhpcy50ZW1wbGF0ZSwgb3B0aW9ucylcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHZhciB0b2tlbnMgPSB0ZXh0UGFyc2VyLnBhcnNlKGlkKVxuXHQgICAgICBpZiAoIXRva2VucykgeyAvLyBzdGF0aWMgY29tcG9uZW50XG5cdCAgICAgICAgdmFyIEN0b3IgPSB0aGlzLkN0b3IgPSBvcHRpb25zLmNvbXBvbmVudHNbaWRdXG5cdCAgICAgICAgXy5hc3NlcnRBc3NldChDdG9yLCAnY29tcG9uZW50JywgaWQpXG5cdCAgICAgICAgaWYgKEN0b3IpIHtcblx0ICAgICAgICAgIC8vIG1lcmdlIGFuIGVtcHR5IG9iamVjdCB3aXRoIG93bmVyIHZtIGFzIHBhcmVudFxuXHQgICAgICAgICAgLy8gc28gY2hpbGQgdm1zIGNhbiBhY2Nlc3MgcGFyZW50IGFzc2V0cy5cblx0ICAgICAgICAgIHZhciBtZXJnZWQgPSBtZXJnZU9wdGlvbnMoXG5cdCAgICAgICAgICAgIEN0b3Iub3B0aW9ucyxcblx0ICAgICAgICAgICAge30sXG5cdCAgICAgICAgICAgIHsgJHBhcmVudDogdGhpcy52bSB9XG5cdCAgICAgICAgICApXG5cdCAgICAgICAgICB0aGlzLnRlbXBsYXRlID0gdHJhbnNjbHVkZSh0aGlzLnRlbXBsYXRlLCBtZXJnZWQpXG5cdCAgICAgICAgICB0aGlzLl9saW5rZXIgPSBjb21waWxlKHRoaXMudGVtcGxhdGUsIG1lcmdlZClcblx0ICAgICAgICB9XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgLy8gdG8gYmUgcmVzb2x2ZWQgbGF0ZXJcblx0ICAgICAgICB2YXIgY3RvckV4cCA9IHRleHRQYXJzZXIudG9rZW5zVG9FeHAodG9rZW5zKVxuXHQgICAgICAgIHRoaXMuY3RvckdldHRlciA9IGV4cFBhcnNlci5wYXJzZShjdG9yRXhwKS5nZXRcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBVcGRhdGUuXG5cdCAgICogVGhpcyBpcyBjYWxsZWQgd2hlbmV2ZXIgdGhlIEFycmF5IG11dGF0ZXMuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhXG5cdCAgICovXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdudW1iZXInKSB7XG5cdCAgICAgIGRhdGEgPSByYW5nZShkYXRhKVxuXHQgICAgfVxuXHQgICAgdGhpcy52bXMgPSB0aGlzLmRpZmYoZGF0YSB8fCBbXSwgdGhpcy52bXMpXG5cdCAgICAvLyB1cGRhdGUgdi1yZWZcblx0ICAgIGlmICh0aGlzLmNoaWxkSWQpIHtcblx0ICAgICAgdGhpcy52bS4kW3RoaXMuY2hpbGRJZF0gPSB0aGlzLnZtc1xuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMuZWxJZCkge1xuXHQgICAgICB0aGlzLnZtLiQkW3RoaXMuZWxJZF0gPSB0aGlzLnZtcy5tYXAoZnVuY3Rpb24gKHZtKSB7XG5cdCAgICAgICAgcmV0dXJuIHZtLiRlbFxuXHQgICAgICB9KVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBEaWZmLCBiYXNlZCBvbiBuZXcgZGF0YSBhbmQgb2xkIGRhdGEsIGRldGVybWluZSB0aGVcblx0ICAgKiBtaW5pbXVtIGFtb3VudCBvZiBET00gbWFuaXB1bGF0aW9ucyBuZWVkZWQgdG8gbWFrZSB0aGVcblx0ICAgKiBET00gcmVmbGVjdCB0aGUgbmV3IGRhdGEgQXJyYXkuXG5cdCAgICpcblx0ICAgKiBUaGUgYWxnb3JpdGhtIGRpZmZzIHRoZSBuZXcgZGF0YSBBcnJheSBieSBzdG9yaW5nIGFcblx0ICAgKiBoaWRkZW4gcmVmZXJlbmNlIHRvIGFuIG93bmVyIHZtIGluc3RhbmNlIG9uIHByZXZpb3VzbHlcblx0ICAgKiBzZWVuIGRhdGEuIFRoaXMgYWxsb3dzIHVzIHRvIGFjaGlldmUgTyhuKSB3aGljaCBpc1xuXHQgICAqIGJldHRlciB0aGFuIGEgbGV2ZW5zaHRlaW4gZGlzdGFuY2UgYmFzZWQgYWxnb3JpdGhtLFxuXHQgICAqIHdoaWNoIGlzIE8obSAqIG4pLlxuXHQgICAqXG5cdCAgICogQHBhcmFtIHtBcnJheX0gZGF0YVxuXHQgICAqIEBwYXJhbSB7QXJyYXl9IG9sZFZtc1xuXHQgICAqIEByZXR1cm4ge0FycmF5fVxuXHQgICAqL1xuXG5cdCAgZGlmZjogZnVuY3Rpb24gKGRhdGEsIG9sZFZtcykge1xuXHQgICAgdmFyIGlkS2V5ID0gdGhpcy5pZEtleVxuXHQgICAgdmFyIGNvbnZlcnRlZCA9IHRoaXMuY29udmVydGVkXG5cdCAgICB2YXIgcmVmID0gdGhpcy5yZWZcblx0ICAgIHZhciBhbGlhcyA9IHRoaXMuYXJnXG5cdCAgICB2YXIgaW5pdCA9ICFvbGRWbXNcblx0ICAgIHZhciB2bXMgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgpXG5cdCAgICB2YXIgb2JqLCByYXcsIHZtLCBpLCBsXG5cdCAgICAvLyBGaXJzdCBwYXNzLCBnbyB0aHJvdWdoIHRoZSBuZXcgQXJyYXkgYW5kIGZpbGwgdXBcblx0ICAgIC8vIHRoZSBuZXcgdm1zIGFycmF5LiBJZiBhIHBpZWNlIG9mIGRhdGEgaGFzIGEgY2FjaGVkXG5cdCAgICAvLyBpbnN0YW5jZSBmb3IgaXQsIHdlIHJldXNlIGl0LiBPdGhlcndpc2UgYnVpbGQgYSBuZXdcblx0ICAgIC8vIGluc3RhbmNlLlxuXHQgICAgZm9yIChpID0gMCwgbCA9IGRhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIG9iaiA9IGRhdGFbaV1cblx0ICAgICAgcmF3ID0gY29udmVydGVkID8gb2JqLnZhbHVlIDogb2JqXG5cdCAgICAgIHZtID0gIWluaXQgJiYgdGhpcy5nZXRWbShyYXcpXG5cdCAgICAgIGlmICh2bSkgeyAvLyByZXVzYWJsZSBpbnN0YW5jZVxuXHQgICAgICAgIHZtLl9yZXVzZWQgPSB0cnVlXG5cdCAgICAgICAgdm0uJGluZGV4ID0gaSAvLyB1cGRhdGUgJGluZGV4XG5cdCAgICAgICAgaWYgKGNvbnZlcnRlZCkge1xuXHQgICAgICAgICAgdm0uJGtleSA9IG9iai5rZXkgLy8gdXBkYXRlICRrZXlcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGlkS2V5KSB7IC8vIHN3YXAgdHJhY2sgYnkgaWQgZGF0YVxuXHQgICAgICAgICAgaWYgKGFsaWFzKSB7XG5cdCAgICAgICAgICAgIHZtW2FsaWFzXSA9IHJhd1xuXHQgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgdm0uX3NldERhdGEocmF3KVxuXHQgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgfSBlbHNlIHsgLy8gbmV3IGluc3RhbmNlXG5cdCAgICAgICAgdm0gPSB0aGlzLmJ1aWxkKG9iaiwgaSlcblx0ICAgICAgICB2bS5fbmV3ID0gdHJ1ZVxuXHQgICAgICB9XG5cdCAgICAgIHZtc1tpXSA9IHZtXG5cdCAgICAgIC8vIGluc2VydCBpZiB0aGlzIGlzIGZpcnN0IHJ1blxuXHQgICAgICBpZiAoaW5pdCkge1xuXHQgICAgICAgIHZtLiRiZWZvcmUocmVmKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICAvLyBpZiB0aGlzIGlzIHRoZSBmaXJzdCBydW4sIHdlJ3JlIGRvbmUuXG5cdCAgICBpZiAoaW5pdCkge1xuXHQgICAgICByZXR1cm4gdm1zXG5cdCAgICB9XG5cdCAgICAvLyBTZWNvbmQgcGFzcywgZ28gdGhyb3VnaCB0aGUgb2xkIHZtIGluc3RhbmNlcyBhbmRcblx0ICAgIC8vIGRlc3Ryb3kgdGhvc2Ugd2hvIGFyZSBub3QgcmV1c2VkIChhbmQgcmVtb3ZlIHRoZW1cblx0ICAgIC8vIGZyb20gY2FjaGUpXG5cdCAgICBmb3IgKGkgPSAwLCBsID0gb2xkVm1zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgICB2bSA9IG9sZFZtc1tpXVxuXHQgICAgICBpZiAoIXZtLl9yZXVzZWQpIHtcblx0ICAgICAgICB0aGlzLnVuY2FjaGVWbSh2bSlcblx0ICAgICAgICB2bS4kZGVzdHJveSh0cnVlKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICAvLyBmaW5hbCBwYXNzLCBtb3ZlL2luc2VydCBuZXcgaW5zdGFuY2VzIGludG8gdGhlXG5cdCAgICAvLyByaWdodCBwbGFjZS4gV2UncmUgZ29pbmcgaW4gcmV2ZXJzZSBoZXJlIGJlY2F1c2Vcblx0ICAgIC8vIGluc2VydEJlZm9yZSByZWxpZXMgb24gdGhlIG5leHQgc2libGluZyB0byBiZVxuXHQgICAgLy8gcmVzb2x2ZWQuXG5cdCAgICB2YXIgdGFyZ2V0TmV4dCwgY3VycmVudE5leHRcblx0ICAgIGkgPSB2bXMubGVuZ3RoXG5cdCAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgIHZtID0gdm1zW2ldXG5cdCAgICAgIC8vIHRoaXMgaXMgdGhlIHZtIHRoYXQgd2Ugc2hvdWxkIGJlIGluIGZyb250IG9mXG5cdCAgICAgIHRhcmdldE5leHQgPSB2bXNbaSArIDFdXG5cdCAgICAgIGlmICghdGFyZ2V0TmV4dCkge1xuXHQgICAgICAgIC8vIFRoaXMgaXMgdGhlIGxhc3QgaXRlbS4gSWYgaXQncyByZXVzZWQgdGhlblxuXHQgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZWxzZSB3aWxsIGV2ZW50dWFsbHkgYmUgaW4gdGhlIHJpZ2h0XG5cdCAgICAgICAgLy8gcGxhY2UsIHNvIG5vIG5lZWQgdG8gdG91Y2ggaXQuIE90aGVyd2lzZSwgaW5zZXJ0XG5cdCAgICAgICAgLy8gaXQuXG5cdCAgICAgICAgaWYgKCF2bS5fcmV1c2VkKSB7XG5cdCAgICAgICAgICB2bS4kYmVmb3JlKHJlZilcblx0ICAgICAgICB9XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgaWYgKHZtLl9yZXVzZWQpIHtcblx0ICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHZtIHdlIGFyZSBhY3R1YWxseSBpbiBmcm9udCBvZlxuXHQgICAgICAgICAgY3VycmVudE5leHQgPSBmaW5kTmV4dFZtKHZtLCByZWYpXG5cdCAgICAgICAgICAvLyB3ZSBvbmx5IG5lZWQgdG8gbW92ZSBpZiB3ZSBhcmUgbm90IGluIHRoZSByaWdodFxuXHQgICAgICAgICAgLy8gcGxhY2UgYWxyZWFkeS5cblx0ICAgICAgICAgIGlmIChjdXJyZW50TmV4dCAhPT0gdGFyZ2V0TmV4dCkge1xuXHQgICAgICAgICAgICB2bS4kYmVmb3JlKHRhcmdldE5leHQuJGVsLCBudWxsLCBmYWxzZSlcblx0ICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgLy8gbmV3IGluc3RhbmNlLCBpbnNlcnQgdG8gZXhpc3RpbmcgbmV4dFxuXHQgICAgICAgICAgdm0uJGJlZm9yZSh0YXJnZXROZXh0LiRlbClcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgICAgdm0uX25ldyA9IGZhbHNlXG5cdCAgICAgIHZtLl9yZXVzZWQgPSBmYWxzZVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHZtc1xuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBCdWlsZCBhIG5ldyBpbnN0YW5jZSBhbmQgY2FjaGUgaXQuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuXHQgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuXHQgICAqL1xuXG5cdCAgYnVpbGQ6IGZ1bmN0aW9uIChkYXRhLCBpbmRleCkge1xuXHQgICAgdmFyIG9yaWdpbmFsID0gZGF0YVxuXHQgICAgdmFyIG1ldGEgPSB7ICRpbmRleDogaW5kZXggfVxuXHQgICAgaWYgKHRoaXMuY29udmVydGVkKSB7XG5cdCAgICAgIG1ldGEuJGtleSA9IG9yaWdpbmFsLmtleVxuXHQgICAgfVxuXHQgICAgdmFyIHJhdyA9IHRoaXMuY29udmVydGVkID8gZGF0YS52YWx1ZSA6IGRhdGFcblx0ICAgIHZhciBhbGlhcyA9IHRoaXMuYXJnXG5cdCAgICB2YXIgaGFzQWxpYXMgPSAhaXNPYmplY3QocmF3KSB8fCBhbGlhc1xuXHQgICAgLy8gd3JhcCB0aGUgcmF3IGRhdGEgd2l0aCBhbGlhc1xuXHQgICAgZGF0YSA9IGhhc0FsaWFzID8ge30gOiByYXdcblx0ICAgIGlmIChhbGlhcykge1xuXHQgICAgICBkYXRhW2FsaWFzXSA9IHJhd1xuXHQgICAgfSBlbHNlIGlmIChoYXNBbGlhcykge1xuXHQgICAgICBtZXRhLiR2YWx1ZSA9IHJhd1xuXHQgICAgfVxuXHQgICAgLy8gcmVzb2x2ZSBjb25zdHJ1Y3RvclxuXHQgICAgdmFyIEN0b3IgPSB0aGlzLkN0b3IgfHwgdGhpcy5yZXNvbHZlQ3RvcihkYXRhLCBtZXRhKVxuXHQgICAgdmFyIHZtID0gdGhpcy52bS4kYWRkQ2hpbGQoe1xuXHQgICAgICBlbDogdGVtcGxhdGVQYXJzZXIuY2xvbmUodGhpcy50ZW1wbGF0ZSksXG5cdCAgICAgIF9saW5rZXI6IHRoaXMuX2xpbmtlcixcblx0ICAgICAgX21ldGE6IG1ldGEsXG5cdCAgICAgIGRhdGE6IGRhdGEsXG5cdCAgICAgIGluaGVyaXQ6IHRoaXMuaW5oZXJpdFxuXHQgICAgfSwgQ3Rvcilcblx0ICAgIC8vIGNhY2hlIGluc3RhbmNlXG5cdCAgICB0aGlzLmNhY2hlVm0ocmF3LCB2bSlcblx0ICAgIHJldHVybiB2bVxuXHQgIH0sXG5cblx0ICAvKipcblx0ICAgKiBSZXNvbHZlIGEgY29udHJ1Y3RvciB0byB1c2UgZm9yIGFuIGluc3RhbmNlLlxuXHQgICAqIFRoZSB0cmlja3kgcGFydCBoZXJlIGlzIHRoYXQgdGhlcmUgY291bGQgYmUgZHluYW1pY1xuXHQgICAqIGNvbXBvbmVudHMgZGVwZW5kaW5nIG9uIGluc3RhbmNlIGRhdGEuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuXHQgICAqIEBwYXJhbSB7T2JqZWN0fSBtZXRhXG5cdCAgICogQHJldHVybiB7RnVuY3Rpb259XG5cdCAgICovXG5cblx0ICByZXNvbHZlQ3RvcjogZnVuY3Rpb24gKGRhdGEsIG1ldGEpIHtcblx0ICAgIC8vIGNyZWF0ZSBhIHRlbXBvcmFyeSBjb250ZXh0IG9iamVjdCBhbmQgY29weSBkYXRhXG5cdCAgICAvLyBhbmQgbWV0YSBwcm9wZXJ0aWVzIG9udG8gaXQuXG5cdCAgICAvLyB1c2UgXy5kZWZpbmUgdG8gYXZvaWQgYWNjaWRlbnRhbGx5IG92ZXJ3cml0aW5nIHNjb3BlXG5cdCAgICAvLyBwcm9wZXJ0aWVzLlxuXHQgICAgdmFyIGNvbnRleHQgPSBPYmplY3QuY3JlYXRlKHRoaXMudm0pXG5cdCAgICB2YXIga2V5XG5cdCAgICBmb3IgKGtleSBpbiBkYXRhKSB7XG5cdCAgICAgIF8uZGVmaW5lKGNvbnRleHQsIGtleSwgZGF0YVtrZXldKVxuXHQgICAgfVxuXHQgICAgZm9yIChrZXkgaW4gbWV0YSkge1xuXHQgICAgICBfLmRlZmluZShjb250ZXh0LCBrZXksIG1ldGFba2V5XSlcblx0ICAgIH1cblx0ICAgIHZhciBpZCA9IHRoaXMuY3RvckdldHRlci5jYWxsKGNvbnRleHQsIGNvbnRleHQpXG5cdCAgICB2YXIgQ3RvciA9IHRoaXMudm0uJG9wdGlvbnMuY29tcG9uZW50c1tpZF1cblx0ICAgIF8uYXNzZXJ0QXNzZXQoQ3RvciwgJ2NvbXBvbmVudCcsIGlkKVxuXHQgICAgcmV0dXJuIEN0b3Jcblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogVW5iaW5kLCB0ZWFyZG93biBldmVyeXRoaW5nXG5cdCAgICovXG5cblx0ICB1bmJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIGlmICh0aGlzLmNoaWxkSWQpIHtcblx0ICAgICAgZGVsZXRlIHRoaXMudm0uJFt0aGlzLmNoaWxkSWRdXG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy52bXMpIHtcblx0ICAgICAgdmFyIGkgPSB0aGlzLnZtcy5sZW5ndGhcblx0ICAgICAgdmFyIHZtXG5cdCAgICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgICB2bSA9IHRoaXMudm1zW2ldXG5cdCAgICAgICAgdGhpcy51bmNhY2hlVm0odm0pXG5cdCAgICAgICAgdm0uJGRlc3Ryb3koKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIENhY2hlIGEgdm0gaW5zdGFuY2UgYmFzZWQgb24gaXRzIGRhdGEuXG5cdCAgICpcblx0ICAgKiBJZiB0aGUgZGF0YSBpcyBhbiBvYmplY3QsIHdlIHNhdmUgdGhlIHZtJ3MgcmVmZXJlbmNlIG9uXG5cdCAgICogdGhlIGRhdGEgb2JqZWN0IGFzIGEgaGlkZGVuIHByb3BlcnR5LiBPdGhlcndpc2Ugd2Vcblx0ICAgKiBjYWNoZSB0aGVtIGluIGFuIG9iamVjdCBhbmQgZm9yIGVhY2ggcHJpbWl0aXZlIHZhbHVlXG5cdCAgICogdGhlcmUgaXMgYW4gYXJyYXkgaW4gY2FzZSB0aGVyZSBhcmUgZHVwbGljYXRlcy5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG5cdCAgICogQHBhcmFtIHtWdWV9IHZtXG5cdCAgICovXG5cblx0ICBjYWNoZVZtOiBmdW5jdGlvbiAoZGF0YSwgdm0pIHtcblx0ICAgIHZhciBpZEtleSA9IHRoaXMuaWRLZXlcblx0ICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGVcblx0ICAgIHZhciBpZFxuXHQgICAgaWYgKGlkS2V5KSB7XG5cdCAgICAgIGlkID0gZGF0YVtpZEtleV1cblx0ICAgICAgaWYgKCFjYWNoZVtpZF0pIHtcblx0ICAgICAgICBjYWNoZVtpZF0gPSB2bVxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIF8ud2FybignRHVwbGljYXRlIElEIGluIHYtcmVwZWF0OiAnICsgaWQpXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoZGF0YSkpIHtcblx0ICAgICAgaWQgPSB0aGlzLmlkXG5cdCAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGlkKSkge1xuXHQgICAgICAgIGlmIChkYXRhW2lkXSA9PT0gbnVsbCkge1xuXHQgICAgICAgICAgZGF0YVtpZF0gPSB2bVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICBfLndhcm4oXG5cdCAgICAgICAgICAgICdEdXBsaWNhdGUgb2JqZWN0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiB2LXJlcGVhdC4nXG5cdCAgICAgICAgICApXG5cdCAgICAgICAgfVxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIF8uZGVmaW5lKGRhdGEsIHRoaXMuaWQsIHZtKVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBpZiAoIWNhY2hlW2RhdGFdKSB7XG5cdCAgICAgICAgY2FjaGVbZGF0YV0gPSBbdm1dXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgY2FjaGVbZGF0YV0ucHVzaCh2bSlcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgdm0uX3JhdyA9IGRhdGFcblx0ICB9LFxuXG5cdCAgLyoqXG5cdCAgICogVHJ5IHRvIGdldCBhIGNhY2hlZCBpbnN0YW5jZSBmcm9tIGEgcGllY2Ugb2YgZGF0YS5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG5cdCAgICogQHJldHVybiB7VnVlfHVuZGVmaW5lZH1cblx0ICAgKi9cblxuXHQgIGdldFZtOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgaWYgKHRoaXMuaWRLZXkpIHtcblx0ICAgICAgcmV0dXJuIHRoaXMuY2FjaGVbZGF0YVt0aGlzLmlkS2V5XV1cblx0ICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoZGF0YSkpIHtcblx0ICAgICAgcmV0dXJuIGRhdGFbdGhpcy5pZF1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHZhciBjYWNoZWQgPSB0aGlzLmNhY2hlW2RhdGFdXG5cdCAgICAgIGlmIChjYWNoZWQpIHtcblx0ICAgICAgICB2YXIgaSA9IDBcblx0ICAgICAgICB2YXIgdm0gPSBjYWNoZWRbaV1cblx0ICAgICAgICAvLyBzaW5jZSBkdXBsaWNhdGVkIHZtIGluc3RhbmNlcyBtaWdodCBiZSBhIHJldXNlZFxuXHQgICAgICAgIC8vIG9uZSBPUiBhIG5ld2x5IGNyZWF0ZWQgb25lLCB3ZSBuZWVkIHRvIHJldHVybiB0aGVcblx0ICAgICAgICAvLyBmaXJzdCBpbnN0YW5jZSB0aGF0IGlzIG5laXRoZXIgb2YgdGhlc2UuXG5cdCAgICAgICAgd2hpbGUgKHZtICYmICh2bS5fcmV1c2VkIHx8IHZtLl9uZXcpKSB7XG5cdCAgICAgICAgICB2bSA9IGNhY2hlZFsrK2ldXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB2bVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIC8qKlxuXHQgICAqIERlbGV0ZSBhIGNhY2hlZCB2bSBpbnN0YW5jZS5cblx0ICAgKlxuXHQgICAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgICAqL1xuXG5cdCAgdW5jYWNoZVZtOiBmdW5jdGlvbiAodm0pIHtcblx0ICAgIHZhciBkYXRhID0gdm0uX3Jhd1xuXHQgICAgaWYgKHRoaXMuaWRLZXkpIHtcblx0ICAgICAgdGhpcy5jYWNoZVtkYXRhW3RoaXMuaWRLZXldXSA9IG51bGxcblx0ICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoZGF0YSkpIHtcblx0ICAgICAgZGF0YVt0aGlzLmlkXSA9IG51bGxcblx0ICAgICAgdm0uX3JhdyA9IG51bGxcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuY2FjaGVbZGF0YV0ucG9wKClcblx0ICAgIH1cblx0ICB9XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBIZWxwZXIgdG8gZmluZCB0aGUgbmV4dCBlbGVtZW50IHRoYXQgaXMgYW4gaW5zdGFuY2Vcblx0ICogcm9vdCBub2RlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIGEgZGVzdHJveWVkIHZtJ3Ncblx0ICogZWxlbWVudCBjb3VsZCBzdGlsbCBiZSBsaW5nZXJpbmcgaW4gdGhlIERPTSBiZWZvcmUgaXRzXG5cdCAqIGxlYXZpbmcgdHJhbnNpdGlvbiBmaW5pc2hlcywgYnV0IGl0cyBfX3Z1ZV9fIHJlZmVyZW5jZVxuXHQgKiBzaG91bGQgaGF2ZSBiZWVuIHJlbW92ZWQgc28gd2UgY2FuIHNraXAgdGhlbS5cblx0ICpcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7Q29tbWVudE5vZGV9IHJlZlxuXHQgKiBAcmV0dXJuIHtWdWV9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGZpbmROZXh0Vm0gKHZtLCByZWYpIHtcblx0ICB2YXIgZWwgPSAodm0uX2Jsb2NrRW5kIHx8IHZtLiRlbCkubmV4dFNpYmxpbmdcblx0ICB3aGlsZSAoIWVsLl9fdnVlX18gJiYgZWwgIT09IHJlZikge1xuXHQgICAgZWwgPSBlbC5uZXh0U2libGluZ1xuXHQgIH1cblx0ICByZXR1cm4gZWwuX192dWVfX1xuXHR9XG5cblx0LyoqXG5cdCAqIEF0dGVtcHQgdG8gY29udmVydCBub24tQXJyYXkgb2JqZWN0cyB0byBhcnJheS5cblx0ICogVGhpcyBpcyB0aGUgZGVmYXVsdCBmaWx0ZXIgaW5zdGFsbGVkIHRvIGV2ZXJ5IHYtcmVwZWF0XG5cdCAqIGRpcmVjdGl2ZS5cblx0ICpcblx0ICogSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCAqKnRoZSBkaXJlY3RpdmUqKiBhcyBgdGhpc2Bcblx0ICogY29udGV4dCBzbyB0aGF0IHdlIGNhbiBtYXJrIHRoZSByZXBlYXQgYXJyYXkgYXMgY29udmVydGVkXG5cdCAqIGZyb20gYW4gb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IG9ialxuXHQgKiBAcmV0dXJuIHtBcnJheX1cblx0ICogQHByaXZhdGVcblx0ICovXG5cblx0ZnVuY3Rpb24gb2JqVG9BcnJheSAob2JqKSB7XG5cdCAgaWYgKCFfLmlzUGxhaW5PYmplY3Qob2JqKSkge1xuXHQgICAgcmV0dXJuIG9ialxuXHQgIH1cblx0ICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iailcblx0ICB2YXIgaSA9IGtleXMubGVuZ3RoXG5cdCAgdmFyIHJlcyA9IG5ldyBBcnJheShpKVxuXHQgIHZhciBrZXlcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICBrZXkgPSBrZXlzW2ldXG5cdCAgICByZXNbaV0gPSB7XG5cdCAgICAgIGtleToga2V5LFxuXHQgICAgICB2YWx1ZTogb2JqW2tleV1cblx0ICAgIH1cblx0ICB9XG5cdCAgLy8gYHRoaXNgIHBvaW50cyB0byB0aGUgcmVwZWF0IGRpcmVjdGl2ZSBpbnN0YW5jZVxuXHQgIHRoaXMuY29udmVydGVkID0gdHJ1ZVxuXHQgIHJldHVybiByZXNcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSByYW5nZSBhcnJheSBmcm9tIGdpdmVuIG51bWJlci5cblx0ICpcblx0ICogQHBhcmFtIHtOdW1iZXJ9IG5cblx0ICogQHJldHVybiB7QXJyYXl9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHJhbmdlIChuKSB7XG5cdCAgdmFyIGkgPSAtMVxuXHQgIHZhciByZXQgPSBuZXcgQXJyYXkobilcblx0ICB3aGlsZSAoKytpIDwgbikge1xuXHQgICAgcmV0W2ldID0gaVxuXHQgIH1cblx0ICByZXR1cm4gcmV0XG5cdH1cblxuLyoqKi8gfSxcbi8qIDMxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGNvbXBpbGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQzKVxuXHR2YXIgdGVtcGxhdGVQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUwKVxuXHR2YXIgdHJhbnNpdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNDIpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0ICBiaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgZWwgPSB0aGlzLmVsXG5cdCAgICBpZiAoIWVsLl9fdnVlX18pIHtcblx0ICAgICAgdGhpcy5zdGFydCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3YtaWYtc3RhcnQnKVxuXHQgICAgICB0aGlzLmVuZCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ3YtaWYtZW5kJylcblx0ICAgICAgXy5yZXBsYWNlKGVsLCB0aGlzLmVuZClcblx0ICAgICAgXy5iZWZvcmUodGhpcy5zdGFydCwgdGhpcy5lbmQpXG5cdCAgICAgIGlmIChlbC50YWdOYW1lID09PSAnVEVNUExBVEUnKSB7XG5cdCAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlUGFyc2VyLnBhcnNlKGVsLCB0cnVlKVxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0ICAgICAgICB0aGlzLnRlbXBsYXRlLmFwcGVuZENoaWxkKGVsKVxuXHQgICAgICB9XG5cdCAgICAgIC8vIGNvbXBpbGUgdGhlIG5lc3RlZCBwYXJ0aWFsXG5cdCAgICAgIHRoaXMubGlua2VyID0gY29tcGlsZShcblx0ICAgICAgICB0aGlzLnRlbXBsYXRlLFxuXHQgICAgICAgIHRoaXMudm0uJG9wdGlvbnMsXG5cdCAgICAgICAgdHJ1ZVxuXHQgICAgICApXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLmludmFsaWQgPSB0cnVlXG5cdCAgICAgIF8ud2Fybihcblx0ICAgICAgICAndi1pZj1cIicgKyB0aGlzLmV4cHJlc3Npb24gKyAnXCIgY2Fubm90IGJlICcgK1xuXHQgICAgICAgICd1c2VkIG9uIGFuIGFscmVhZHkgbW91bnRlZCBpbnN0YW5jZS4nXG5cdCAgICAgIClcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgdXBkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgIGlmICh0aGlzLmludmFsaWQpIHJldHVyblxuXHQgICAgaWYgKHZhbHVlKSB7XG5cdCAgICAgIHRoaXMuaW5zZXJ0KClcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMudGVhcmRvd24oKVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBpbnNlcnQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciB2bSA9IHRoaXMudm1cblx0ICAgIHZhciBmcmFnID0gdGVtcGxhdGVQYXJzZXIuY2xvbmUodGhpcy50ZW1wbGF0ZSlcblx0ICAgIHZhciBkZWNvbXBpbGUgPSB0aGlzLmxpbmtlcih2bSwgZnJhZylcblx0ICAgIHRoaXMuZGVjb21waWxlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICBkZWNvbXBpbGUoKVxuXHQgICAgICB0cmFuc2l0aW9uLmJsb2NrUmVtb3ZlKHRoaXMuc3RhcnQsIHRoaXMuZW5kLCB2bSlcblx0ICAgIH1cblx0ICAgIHRyYW5zaXRpb24uYmxvY2tBcHBlbmQoZnJhZywgdGhpcy5lbmQsIHZtKVxuXHQgIH0sXG5cblx0ICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuXHQgICAgaWYgKHRoaXMuZGVjb21waWxlKSB7XG5cdCAgICAgIHRoaXMuZGVjb21waWxlKClcblx0ICAgICAgdGhpcy5kZWNvbXBpbGUgPSBudWxsXG5cdCAgICB9XG5cdCAgfVxuXG5cdH1cblxuLyoqKi8gfSxcbi8qIDMyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIFdhdGNoZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgcHJpb3JpdHk6IDkwMCxcblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciB2bSA9IHRoaXMudm1cblx0ICAgIGlmICh0aGlzLmVsICE9PSB2bS4kZWwpIHtcblx0ICAgICAgXy53YXJuKFxuXHQgICAgICAgICd2LXdpdGggY2FuIG9ubHkgYmUgdXNlZCBvbiBpbnN0YW5jZSByb290IGVsZW1lbnRzLidcblx0ICAgICAgKVxuXHQgICAgfSBlbHNlIGlmICghdm0uJHBhcmVudCkge1xuXHQgICAgICBfLndhcm4oXG5cdCAgICAgICAgJ3Ytd2l0aCBtdXN0IGJlIHVzZWQgb24gYW4gaW5zdGFuY2Ugd2l0aCBhIHBhcmVudC4nXG5cdCAgICAgIClcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHZhciBrZXkgPSB0aGlzLmFyZ1xuXHQgICAgICB0aGlzLndhdGNoZXIgPSBuZXcgV2F0Y2hlcihcblx0ICAgICAgICB2bS4kcGFyZW50LFxuXHQgICAgICAgIHRoaXMuZXhwcmVzc2lvbixcblx0ICAgICAgICBrZXlcblx0ICAgICAgICAgID8gZnVuY3Rpb24gKHZhbCkge1xuXHQgICAgICAgICAgICAgIHZtLiRzZXQoa2V5LCB2YWwpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgIDogZnVuY3Rpb24gKHZhbCkge1xuXHQgICAgICAgICAgICAgIHZtLiRkYXRhID0gdmFsXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgKVxuXHQgICAgICAvLyBpbml0aWFsIHNldFxuXHQgICAgICB2YXIgaW5pdGlhbFZhbCA9IHRoaXMud2F0Y2hlci52YWx1ZVxuXHQgICAgICBpZiAoa2V5KSB7XG5cdCAgICAgICAgdm0uJHNldChrZXksIGluaXRpYWxWYWwpXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdm0uJGRhdGEgPSBpbml0aWFsVmFsXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgdW5iaW5kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICBpZiAodGhpcy53YXRjaGVyKSB7XG5cdCAgICAgIHRoaXMud2F0Y2hlci50ZWFyZG93bigpXG5cdCAgICB9XG5cdCAgfVxuXG5cdH1cblxuLyoqKi8gfSxcbi8qIDMzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUxKVxuXG5cdC8qKlxuXHQgKiBGaWx0ZXIgZmlsdGVyIGZvciB2LXJlcGVhdFxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoS2V5XG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBbZGVsaW1pdGVyXVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZGF0YUtleVxuXHQgKi9cblxuXHRleHBvcnRzLmZpbHRlckJ5ID0gZnVuY3Rpb24gKGFyciwgc2VhcmNoS2V5LCBkZWxpbWl0ZXIsIGRhdGFLZXkpIHtcblx0ICAvLyBhbGxvdyBvcHRpb25hbCBgaW5gIGRlbGltaXRlclxuXHQgIC8vIGJlY2F1c2Ugd2h5IG5vdFxuXHQgIGlmIChkZWxpbWl0ZXIgJiYgZGVsaW1pdGVyICE9PSAnaW4nKSB7XG5cdCAgICBkYXRhS2V5ID0gZGVsaW1pdGVyXG5cdCAgfVxuXHQgIC8vIGdldCB0aGUgc2VhcmNoIHN0cmluZ1xuXHQgIHZhciBzZWFyY2ggPVxuXHQgICAgXy5zdHJpcFF1b3RlcyhzZWFyY2hLZXkpIHx8XG5cdCAgICB0aGlzLiRnZXQoc2VhcmNoS2V5KVxuXHQgIGlmICghc2VhcmNoKSB7XG5cdCAgICByZXR1cm4gYXJyXG5cdCAgfVxuXHQgIHNlYXJjaCA9IHNlYXJjaC50b0xvd2VyQ2FzZSgpXG5cdCAgLy8gZ2V0IHRoZSBvcHRpb25hbCBkYXRhS2V5XG5cdCAgZGF0YUtleSA9XG5cdCAgICBkYXRhS2V5ICYmXG5cdCAgICAoXy5zdHJpcFF1b3RlcyhkYXRhS2V5KSB8fCB0aGlzLiRnZXQoZGF0YUtleSkpXG5cdCAgcmV0dXJuIGFyci5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcblx0ICAgIHJldHVybiBkYXRhS2V5XG5cdCAgICAgID8gY29udGFpbnMoUGF0aC5nZXQoaXRlbSwgZGF0YUtleSksIHNlYXJjaClcblx0ICAgICAgOiBjb250YWlucyhpdGVtLCBzZWFyY2gpXG5cdCAgfSlcblx0fVxuXG5cdC8qKlxuXHQgKiBGaWx0ZXIgZmlsdGVyIGZvciB2LXJlcGVhdFxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc29ydEtleVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gcmV2ZXJzZUtleVxuXHQgKi9cblxuXHRleHBvcnRzLm9yZGVyQnkgPSBmdW5jdGlvbiAoYXJyLCBzb3J0S2V5LCByZXZlcnNlS2V5KSB7XG5cdCAgdmFyIGtleSA9XG5cdCAgICBfLnN0cmlwUXVvdGVzKHNvcnRLZXkpIHx8XG5cdCAgICB0aGlzLiRnZXQoc29ydEtleSlcblx0ICBpZiAoIWtleSkge1xuXHQgICAgcmV0dXJuIGFyclxuXHQgIH1cblx0ICB2YXIgb3JkZXIgPSAxXG5cdCAgaWYgKHJldmVyc2VLZXkpIHtcblx0ICAgIGlmIChyZXZlcnNlS2V5ID09PSAnLTEnKSB7XG5cdCAgICAgIG9yZGVyID0gLTFcblx0ICAgIH0gZWxzZSBpZiAocmV2ZXJzZUtleS5jaGFyQ29kZUF0KDApID09PSAweDIxKSB7IC8vICFcblx0ICAgICAgcmV2ZXJzZUtleSA9IHJldmVyc2VLZXkuc2xpY2UoMSlcblx0ICAgICAgb3JkZXIgPSB0aGlzLiRnZXQocmV2ZXJzZUtleSkgPyAxIDogLTFcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIG9yZGVyID0gdGhpcy4kZ2V0KHJldmVyc2VLZXkpID8gLTEgOiAxXG5cdCAgICB9XG5cdCAgfVxuXHQgIC8vIHNvcnQgb24gYSBjb3B5IHRvIGF2b2lkIG11dGF0aW5nIG9yaWdpbmFsIGFycmF5XG5cdCAgcmV0dXJuIGFyci5zbGljZSgpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcblx0ICAgIGEgPSBQYXRoLmdldChhLCBrZXkpXG5cdCAgICBiID0gUGF0aC5nZXQoYiwga2V5KVxuXHQgICAgcmV0dXJuIGEgPT09IGIgPyAwIDogYSA+IGIgPyBvcmRlciA6IC1vcmRlclxuXHQgIH0pXG5cdH1cblxuXHQvKipcblx0ICogU3RyaW5nIGNvbnRhaW4gaGVscGVyXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gdmFsXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hcblx0ICovXG5cblx0ZnVuY3Rpb24gY29udGFpbnMgKHZhbCwgc2VhcmNoKSB7XG5cdCAgaWYgKF8uaXNPYmplY3QodmFsKSkge1xuXHQgICAgZm9yICh2YXIga2V5IGluIHZhbCkge1xuXHQgICAgICBpZiAoY29udGFpbnModmFsW2tleV0sIHNlYXJjaCkpIHtcblx0ICAgICAgICByZXR1cm4gdHJ1ZVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSBlbHNlIGlmICh2YWwgIT0gbnVsbCkge1xuXHQgICAgcmV0dXJuIHZhbC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2gpID4gLTFcblx0ICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDM0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKipcblx0ICogQ2hlY2sgaXMgYSBzdHJpbmcgc3RhcnRzIHdpdGggJCBvciBfXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcblx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0ICovXG5cblx0ZXhwb3J0cy5pc1Jlc2VydmVkID0gZnVuY3Rpb24gKHN0cikge1xuXHQgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoMClcblx0ICByZXR1cm4gYyA9PT0gMHgyNCB8fCBjID09PSAweDVGXG5cdH1cblxuXHQvKipcblx0ICogR3VhcmQgdGV4dCBvdXRwdXQsIG1ha2Ugc3VyZSB1bmRlZmluZWQgb3V0cHV0c1xuXHQgKiBlbXB0eSBzdHJpbmdcblx0ICpcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdGV4cG9ydHMudG9TdHJpbmcgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICByZXR1cm4gdmFsdWUgPT0gbnVsbFxuXHQgICAgPyAnJ1xuXHQgICAgOiB2YWx1ZS50b1N0cmluZygpXG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgYW5kIGNvbnZlcnQgcG9zc2libGUgbnVtZXJpYyBudW1iZXJzIGJlZm9yZVxuXHQgKiBzZXR0aW5nIGJhY2sgdG8gZGF0YVxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAqIEByZXR1cm4geyp8TnVtYmVyfVxuXHQgKi9cblxuXHRleHBvcnRzLnRvTnVtYmVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgcmV0dXJuIChcblx0ICAgIGlzTmFOKHZhbHVlKSB8fFxuXHQgICAgdmFsdWUgPT09IG51bGwgfHxcblx0ICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nXG5cdCAgKSA/IHZhbHVlXG5cdCAgICA6IE51bWJlcih2YWx1ZSlcblx0fVxuXG5cdC8qKlxuXHQgKiBTdHJpcCBxdW90ZXMgZnJvbSBhIHN0cmluZ1xuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG5cdCAqIEByZXR1cm4ge1N0cmluZyB8IGZhbHNlfVxuXHQgKi9cblxuXHRleHBvcnRzLnN0cmlwUXVvdGVzID0gZnVuY3Rpb24gKHN0cikge1xuXHQgIHZhciBhID0gc3RyLmNoYXJDb2RlQXQoMClcblx0ICB2YXIgYiA9IHN0ci5jaGFyQ29kZUF0KHN0ci5sZW5ndGggLSAxKVxuXHQgIHJldHVybiBhID09PSBiICYmIChhID09PSAweDIyIHx8IGEgPT09IDB4MjcpXG5cdCAgICA/IHN0ci5zbGljZSgxLCAtMSlcblx0ICAgIDogZmFsc2Vcblx0fVxuXG5cdC8qKlxuXHQgKiBDYW1lbGl6ZSBhIGh5cGhlbi1kZWxtaXRlZCBzdHJpbmcuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcblx0ICogQHJldHVybiB7U3RyaW5nfVxuXHQgKi9cblxuXHR2YXIgY2FtZWxSRSA9IC8oPzpefFstX10pKFxcdykvZ1xuXHRleHBvcnRzLmNhbWVsaXplID0gZnVuY3Rpb24gKHN0cikge1xuXHQgIHJldHVybiBzdHIucmVwbGFjZSAoY2FtZWxSRSwgZnVuY3Rpb24gKF8sIGMpIHtcblx0ICAgIHJldHVybiBjID8gYy50b1VwcGVyQ2FzZSAoKSA6ICcnO1xuXHQgIH0pXG5cdH1cblxuXHQvKipcblx0ICogU2ltcGxlIGJpbmQsIGZhc3RlciB0aGFuIG5hdGl2ZVxuXHQgKlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuXHQgKiBAcGFyYW0ge09iamVjdH0gY3R4XG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuXHQgKi9cblxuXHRleHBvcnRzLmJpbmQgPSBmdW5jdGlvbiAoZm4sIGN0eCkge1xuXHQgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICByZXR1cm4gZm4uYXBwbHkoY3R4LCBhcmd1bWVudHMpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnQgYW4gQXJyYXktbGlrZSBvYmplY3QgdG8gYSByZWFsIEFycmF5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5LWxpa2V9IGxpc3Rcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtzdGFydF0gLSBzdGFydCBpbmRleFxuXHQgKiBAcmV0dXJuIHtBcnJheX1cblx0ICovXG5cblx0ZXhwb3J0cy50b0FycmF5ID0gZnVuY3Rpb24gKGxpc3QsIHN0YXJ0KSB7XG5cdCAgc3RhcnQgPSBzdGFydCB8fCAwXG5cdCAgdmFyIGkgPSBsaXN0Lmxlbmd0aCAtIHN0YXJ0XG5cdCAgdmFyIHJldCA9IG5ldyBBcnJheShpKVxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIHJldFtpXSA9IGxpc3RbaSArIHN0YXJ0XVxuXHQgIH1cblx0ICByZXR1cm4gcmV0XG5cdH1cblxuXHQvKipcblx0ICogTWl4IHByb3BlcnRpZXMgaW50byB0YXJnZXQgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdG9cblx0ICogQHBhcmFtIHtPYmplY3R9IGZyb21cblx0ICovXG5cblx0ZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbiAodG8sIGZyb20pIHtcblx0ICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHQgICAgdG9ba2V5XSA9IGZyb21ba2V5XVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBRdWljayBvYmplY3QgY2hlY2sgLSB0aGlzIGlzIHByaW1hcmlseSB1c2VkIHRvIHRlbGxcblx0ICogT2JqZWN0cyBmcm9tIHByaW1pdGl2ZSB2YWx1ZXMgd2hlbiB3ZSBrbm93IHRoZSB2YWx1ZVxuXHQgKiBpcyBhIEpTT04tY29tcGxpYW50IHR5cGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gb2JqXG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCAqL1xuXG5cdGV4cG9ydHMuaXNPYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG5cdCAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xuXHR9XG5cblx0LyoqXG5cdCAqIFN0cmljdCBvYmplY3QgdHlwZSBjaGVjay4gT25seSByZXR1cm5zIHRydWVcblx0ICogZm9yIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0cy5cblx0ICpcblx0ICogQHBhcmFtIHsqfSBvYmpcblx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0ICovXG5cblx0dmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXHRleHBvcnRzLmlzUGxhaW5PYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG5cdCAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcblx0fVxuXG5cdC8qKlxuXHQgKiBBcnJheSB0eXBlIGNoZWNrLlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IG9ialxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblxuXHRleHBvcnRzLmlzQXJyYXkgPSBmdW5jdGlvbiAob2JqKSB7XG5cdCAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKVxuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZSBhIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5XG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleVxuXHQgKiBAcGFyYW0geyp9IHZhbFxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtlbnVtZXJhYmxlXVxuXHQgKi9cblxuXHRleHBvcnRzLmRlZmluZSA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsLCBlbnVtZXJhYmxlKSB7XG5cdCAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG5cdCAgICB2YWx1ZSAgICAgICAgOiB2YWwsXG5cdCAgICBlbnVtZXJhYmxlICAgOiAhIWVudW1lcmFibGUsXG5cdCAgICB3cml0YWJsZSAgICAgOiB0cnVlLFxuXHQgICAgY29uZmlndXJhYmxlIDogdHJ1ZVxuXHQgIH0pXG5cdH1cblxuLyoqKi8gfSxcbi8qIDM1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKipcblx0ICogQ2FuIHdlIHVzZSBfX3Byb3RvX18/XG5cdCAqXG5cdCAqIEB0eXBlIHtCb29sZWFufVxuXHQgKi9cblxuXHRleHBvcnRzLmhhc1Byb3RvID0gJ19fcHJvdG9fXycgaW4ge31cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdlIGhhdmUgYSB3aW5kb3dcblx0ICpcblx0ICogQHR5cGUge0Jvb2xlYW59XG5cdCAqL1xuXG5cdHZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblx0dmFyIGluQnJvd3NlciA9IGV4cG9ydHMuaW5Ccm93c2VyID1cblx0ICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuXHQgIHRvU3RyaW5nLmNhbGwod2luZG93KSAhPT0gJ1tvYmplY3QgT2JqZWN0XSdcblxuXHQvKipcblx0ICogRGVmZXIgYSB0YXNrIHRvIHRoZSBzdGFydCBvZiB0aGUgbmV4dCBldmVudCBsb29wXG5cdCAqXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBjdHhcblx0ICovXG5cblx0dmFyIGRlZmVyID0gaW5Ccm93c2VyXG5cdCAgPyAod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHQgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHQgICAgc2V0VGltZW91dClcblx0ICA6IHNldFRpbWVvdXRcblxuXHRleHBvcnRzLm5leHRUaWNrID0gZnVuY3Rpb24gKGNiLCBjdHgpIHtcblx0ICBpZiAoY3R4KSB7XG5cdCAgICBkZWZlcihmdW5jdGlvbiAoKSB7IGNiLmNhbGwoY3R4KSB9LCAwKVxuXHQgIH0gZWxzZSB7XG5cdCAgICBkZWZlcihjYiwgMClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogRGV0ZWN0IGlmIHdlIGFyZSBpbiBJRTkuLi5cblx0ICpcblx0ICogQHR5cGUge0Jvb2xlYW59XG5cdCAqL1xuXG5cdGV4cG9ydHMuaXNJRTkgPVxuXHQgIGluQnJvd3NlciAmJlxuXHQgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTVNJRSA5LjAnKSA+IDBcblxuXHQvKipcblx0ICogU25pZmYgdHJhbnNpdGlvbi9hbmltYXRpb24gZXZlbnRzXG5cdCAqL1xuXG5cdGlmIChpbkJyb3dzZXIgJiYgIWV4cG9ydHMuaXNJRTkpIHtcblx0ICB2YXIgaXNXZWJraXRUcmFucyA9XG5cdCAgICB3aW5kb3cub250cmFuc2l0aW9uZW5kID09PSB1bmRlZmluZWQgJiZcblx0ICAgIHdpbmRvdy5vbndlYmtpdHRyYW5zaXRpb25lbmQgIT09IHVuZGVmaW5lZFxuXHQgIHZhciBpc1dlYmtpdEFuaW0gPVxuXHQgICAgd2luZG93Lm9uYW5pbWF0aW9uZW5kID09PSB1bmRlZmluZWQgJiZcblx0ICAgIHdpbmRvdy5vbndlYmtpdGFuaW1hdGlvbmVuZCAhPT0gdW5kZWZpbmVkXG5cdCAgZXhwb3J0cy50cmFuc2l0aW9uUHJvcCA9IGlzV2Via2l0VHJhbnNcblx0ICAgID8gJ1dlYmtpdFRyYW5zaXRpb24nXG5cdCAgICA6ICd0cmFuc2l0aW9uJ1xuXHQgIGV4cG9ydHMudHJhbnNpdGlvbkVuZEV2ZW50ID0gaXNXZWJraXRUcmFuc1xuXHQgICAgPyAnd2Via2l0VHJhbnNpdGlvbkVuZCdcblx0ICAgIDogJ3RyYW5zaXRpb25lbmQnXG5cdCAgZXhwb3J0cy5hbmltYXRpb25Qcm9wID0gaXNXZWJraXRBbmltXG5cdCAgICA/ICdXZWJraXRBbmltYXRpb24nXG5cdCAgICA6ICdhbmltYXRpb24nXG5cdCAgZXhwb3J0cy5hbmltYXRpb25FbmRFdmVudCA9IGlzV2Via2l0QW5pbVxuXHQgICAgPyAnd2Via2l0QW5pbWF0aW9uRW5kJ1xuXHQgICAgOiAnYW5pbWF0aW9uZW5kJ1xuXHR9XG5cbi8qKiovIH0sXG4vKiAzNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIGNvbmZpZyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIGEgbm9kZSBpcyBpbiB0aGUgZG9jdW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblxuXHR2YXIgZG9jID1cblx0ICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmXG5cdCAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG5cblx0ZXhwb3J0cy5pbkRvYyA9IGZ1bmN0aW9uIChub2RlKSB7XG5cdCAgcmV0dXJuIGRvYyAmJiBkb2MuY29udGFpbnMobm9kZSlcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHRyYWN0IGFuIGF0dHJpYnV0ZSBmcm9tIGEgbm9kZS5cblx0ICpcblx0ICogQHBhcmFtIHtOb2RlfSBub2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyXG5cdCAqL1xuXG5cdGV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIChub2RlLCBhdHRyKSB7XG5cdCAgYXR0ciA9IGNvbmZpZy5wcmVmaXggKyBhdHRyXG5cdCAgdmFyIHZhbCA9IG5vZGUuZ2V0QXR0cmlidXRlKGF0dHIpXG5cdCAgaWYgKHZhbCAhPT0gbnVsbCkge1xuXHQgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cilcblx0ICB9XG5cdCAgcmV0dXJuIHZhbFxuXHR9XG5cblx0LyoqXG5cdCAqIEluc2VydCBlbCBiZWZvcmUgdGFyZ2V0XG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgXG5cdCAqL1xuXG5cdGV4cG9ydHMuYmVmb3JlID0gZnVuY3Rpb24gKGVsLCB0YXJnZXQpIHtcblx0ICB0YXJnZXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIHRhcmdldClcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnNlcnQgZWwgYWZ0ZXIgdGFyZ2V0XG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgXG5cdCAqL1xuXG5cdGV4cG9ydHMuYWZ0ZXIgPSBmdW5jdGlvbiAoZWwsIHRhcmdldCkge1xuXHQgIGlmICh0YXJnZXQubmV4dFNpYmxpbmcpIHtcblx0ICAgIGV4cG9ydHMuYmVmb3JlKGVsLCB0YXJnZXQubmV4dFNpYmxpbmcpXG5cdCAgfSBlbHNlIHtcblx0ICAgIHRhcmdldC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGVsKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgZWwgZnJvbSBET01cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKi9cblxuXHRleHBvcnRzLnJlbW92ZSA9IGZ1bmN0aW9uIChlbCkge1xuXHQgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpXG5cdH1cblxuXHQvKipcblx0ICogUHJlcGVuZCBlbCB0byB0YXJnZXRcblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCBcblx0ICovXG5cblx0ZXhwb3J0cy5wcmVwZW5kID0gZnVuY3Rpb24gKGVsLCB0YXJnZXQpIHtcblx0ICBpZiAodGFyZ2V0LmZpcnN0Q2hpbGQpIHtcblx0ICAgIGV4cG9ydHMuYmVmb3JlKGVsLCB0YXJnZXQuZmlyc3RDaGlsZClcblx0ICB9IGVsc2Uge1xuXHQgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXBsYWNlIHRhcmdldCB3aXRoIGVsXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICovXG5cblx0ZXhwb3J0cy5yZXBsYWNlID0gZnVuY3Rpb24gKHRhcmdldCwgZWwpIHtcblx0ICB2YXIgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGVcblx0ICBpZiAocGFyZW50KSB7XG5cdCAgICBwYXJlbnQucmVwbGFjZUNoaWxkKGVsLCB0YXJnZXQpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENvcHkgYXR0cmlidXRlcyBmcm9tIG9uZSBlbGVtZW50IHRvIGFub3RoZXIuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZnJvbVxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IHRvXG5cdCAqL1xuXG5cdGV4cG9ydHMuY29weUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcblx0ICBpZiAoZnJvbS5oYXNBdHRyaWJ1dGVzKCkpIHtcblx0ICAgIHZhciBhdHRycyA9IGZyb20uYXR0cmlidXRlc1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhdHRycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgICAgdmFyIGF0dHIgPSBhdHRyc1tpXVxuXHQgICAgICB0by5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgZXZlbnQgbGlzdGVuZXIgc2hvcnRoYW5kLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuXHQgKi9cblxuXHRleHBvcnRzLm9uID0gZnVuY3Rpb24gKGVsLCBldmVudCwgY2IpIHtcblx0ICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYilcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXIgc2hvcnRoYW5kLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuXHQgKi9cblxuXHRleHBvcnRzLm9mZiA9IGZ1bmN0aW9uIChlbCwgZXZlbnQsIGNiKSB7XG5cdCAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgY2IpXG5cdH1cblxuXHQvKipcblx0ICogQ29tcGF0aWJpbGl0eSBhZGQgY2xhc3MgZm9yIElFOVxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7U3Ryb25nfSBjbHNcblx0ICovXG5cblx0ZXhwb3J0cy5hZGRDbGFzcyA9IGZ1bmN0aW9uIChlbCwgY2xzKSB7XG5cdCAgdmFyIGN1ciA9ICcgJyArIGVsLmNsYXNzTmFtZSArICcgJ1xuXHQgIGlmIChjdXIuaW5kZXhPZignICcgKyBjbHMgKyAnICcpIDwgMCkge1xuXHQgICAgZWwuY2xhc3NOYW1lID0gKGN1ciArIGNscykudHJpbSgpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhdGliaWxpdHkgcmVtb3ZlIGNsYXNzIGZvciBJRTlcblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge1N0cm9uZ30gY2xzXG5cdCAqL1xuXG5cdGV4cG9ydHMucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiAoZWwsIGNscykge1xuXHQgIHZhciBjdXIgPSAnICcgKyBlbC5jbGFzc05hbWUgKyAnICdcblx0ICB2YXIgdGFyID0gJyAnICsgY2xzICsgJyAnXG5cdCAgd2hpbGUgKGN1ci5pbmRleE9mKHRhcikgPj0gMCkge1xuXHQgICAgY3VyID0gY3VyLnJlcGxhY2UodGFyLCAnICcpXG5cdCAgfVxuXHQgIGVsLmNsYXNzTmFtZSA9IGN1ci50cmltKClcblx0fVxuXG4vKioqLyB9LFxuLyogMzcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOClcblxuXHQvKipcblx0ICogUmVzb2x2ZSByZWFkICYgd3JpdGUgZmlsdGVycyBmb3IgYSB2bSBpbnN0YW5jZS4gVGhlXG5cdCAqIGZpbHRlcnMgZGVzY3JpcHRvciBBcnJheSBjb21lcyBmcm9tIHRoZSBkaXJlY3RpdmUgcGFyc2VyLlxuXHQgKlxuXHQgKiBUaGlzIGlzIGV4dHJhY3RlZCBpbnRvIGl0cyBvd24gdXRpbGl0eSBzbyBpdCBjYW5cblx0ICogYmUgdXNlZCBpbiBtdWx0aXBsZSBzY2VuYXJpb3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGZpbHRlcnNcblx0ICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdXG5cdCAqIEByZXR1cm4ge09iamVjdH1cblx0ICovXG5cblx0ZXhwb3J0cy5yZXNvbHZlRmlsdGVycyA9IGZ1bmN0aW9uICh2bSwgZmlsdGVycywgdGFyZ2V0KSB7XG5cdCAgaWYgKCFmaWx0ZXJzKSB7XG5cdCAgICByZXR1cm5cblx0ICB9XG5cdCAgdmFyIHJlcyA9IHRhcmdldCB8fCB7fVxuXHQgIC8vIHZhciByZWdpc3RyeSA9IHZtLiRvcHRpb25zLmZpbHRlcnNcblx0ICBmaWx0ZXJzLmZvckVhY2goZnVuY3Rpb24gKGYpIHtcblx0ICAgIHZhciBkZWYgPSB2bS4kb3B0aW9ucy5maWx0ZXJzW2YubmFtZV1cblx0ICAgIF8uYXNzZXJ0QXNzZXQoZGVmLCAnZmlsdGVyJywgZi5uYW1lKVxuXHQgICAgaWYgKCFkZWYpIHJldHVyblxuXHQgICAgdmFyIGFyZ3MgPSBmLmFyZ3Ncblx0ICAgIHZhciByZWFkZXIsIHdyaXRlclxuXHQgICAgaWYgKHR5cGVvZiBkZWYgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgcmVhZGVyID0gZGVmXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICByZWFkZXIgPSBkZWYucmVhZFxuXHQgICAgICB3cml0ZXIgPSBkZWYud3JpdGVcblx0ICAgIH1cblx0ICAgIGlmIChyZWFkZXIpIHtcblx0ICAgICAgaWYgKCFyZXMucmVhZCkgcmVzLnJlYWQgPSBbXVxuXHQgICAgICByZXMucmVhZC5wdXNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgICAgIHJldHVybiBhcmdzXG5cdCAgICAgICAgICA/IHJlYWRlci5hcHBseSh2bSwgW3ZhbHVlXS5jb25jYXQoYXJncykpXG5cdCAgICAgICAgICA6IHJlYWRlci5jYWxsKHZtLCB2YWx1ZSlcblx0ICAgICAgfSlcblx0ICAgIH1cblx0ICAgIGlmICh3cml0ZXIpIHtcblx0ICAgICAgaWYgKCFyZXMud3JpdGUpIHJlcy53cml0ZSA9IFtdXG5cdCAgICAgIHJlcy53cml0ZS5wdXNoKGZ1bmN0aW9uICh2YWx1ZSwgb2xkVmFsKSB7XG5cdCAgICAgICAgcmV0dXJuIGFyZ3Ncblx0ICAgICAgICAgID8gd3JpdGVyLmFwcGx5KHZtLCBbdmFsdWUsIG9sZFZhbF0uY29uY2F0KGFyZ3MpKVxuXHQgICAgICAgICAgOiB3cml0ZXIuY2FsbCh2bSwgdmFsdWUsIG9sZFZhbClcblx0ICAgICAgfSlcblx0ICAgIH1cblx0ICB9KVxuXHQgIHJldHVybiByZXNcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBseSBmaWx0ZXJzIHRvIGEgdmFsdWVcblx0ICpcblx0ICogQHBhcmFtIHsqfSB2YWx1ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXJzXG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKiBAcGFyYW0geyp9IG9sZFZhbFxuXHQgKiBAcmV0dXJuIHsqfVxuXHQgKi9cblxuXHRleHBvcnRzLmFwcGx5RmlsdGVycyA9IGZ1bmN0aW9uICh2YWx1ZSwgZmlsdGVycywgdm0sIG9sZFZhbCkge1xuXHQgIGlmICghZmlsdGVycykge1xuXHQgICAgcmV0dXJuIHZhbHVlXG5cdCAgfVxuXHQgIGZvciAodmFyIGkgPSAwLCBsID0gZmlsdGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgIHZhbHVlID0gZmlsdGVyc1tpXS5jYWxsKHZtLCB2YWx1ZSwgb2xkVmFsKVxuXHQgIH1cblx0ICByZXR1cm4gdmFsdWVcblx0fVxuXG4vKioqLyB9LFxuLyogMzggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBjb25maWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KVxuXG5cdC8qKlxuXHQgKiBFbmFibGUgZGVidWcgdXRpbGl0aWVzLiBUaGUgZW5hYmxlRGVidWcoKSBmdW5jdGlvbiBhbmRcblx0ICogYWxsIF8ubG9nKCkgJiBfLndhcm4oKSBjYWxscyB3aWxsIGJlIGRyb3BwZWQgaW4gdGhlXG5cdCAqIG1pbmlmaWVkIHByb2R1Y3Rpb24gYnVpbGQuXG5cdCAqL1xuXG5cdGVuYWJsZURlYnVnKClcblxuXHRmdW5jdGlvbiBlbmFibGVEZWJ1ZyAoKSB7XG5cdCAgdmFyIGhhc0NvbnNvbGUgPSB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCdcblx0ICBcblx0ICAvKipcblx0ICAgKiBMb2cgYSBtZXNzYWdlLlxuXHQgICAqXG5cdCAgICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuXHQgICAqL1xuXG5cdCAgZXhwb3J0cy5sb2cgPSBmdW5jdGlvbiAobXNnKSB7XG5cdCAgICBpZiAoaGFzQ29uc29sZSAmJiBjb25maWcuZGVidWcpIHtcblx0ICAgICAgY29uc29sZS5sb2coJ1tWdWUgaW5mb106ICcgKyBtc2cpXG5cdCAgICB9XG5cdCAgfVxuXG5cdCAgLyoqXG5cdCAgICogV2UndmUgZ290IGEgcHJvYmxlbSBoZXJlLlxuXHQgICAqXG5cdCAgICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuXHQgICAqL1xuXG5cdCAgZXhwb3J0cy53YXJuID0gZnVuY3Rpb24gKG1zZykge1xuXHQgICAgaWYgKGhhc0NvbnNvbGUgJiYgIWNvbmZpZy5zaWxlbnQpIHtcblx0ICAgICAgY29uc29sZS53YXJuKCdbVnVlIHdhcm5dOiAnICsgbXNnKVxuXHQgICAgICBpZiAoY29uZmlnLmRlYnVnICYmIGNvbnNvbGUudHJhY2UpIHtcblx0ICAgICAgICBjb25zb2xlLnRyYWNlKClcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblxuXHQgIC8qKlxuXHQgICAqIEFzc2VydCBhc3NldCBleGlzdHNcblx0ICAgKi9cblxuXHQgIGV4cG9ydHMuYXNzZXJ0QXNzZXQgPSBmdW5jdGlvbiAodmFsLCB0eXBlLCBpZCkge1xuXHQgICAgaWYgKCF2YWwpIHtcblx0ICAgICAgZXhwb3J0cy53YXJuKCdGYWlsZWQgdG8gcmVzb2x2ZSAnICsgdHlwZSArICc6ICcgKyBpZClcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDM5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgQ2FjaGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUyKVxuXHR2YXIgY29uZmlnID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSlcblx0dmFyIHJlZ2V4RXNjYXBlUkUgPSAvWy0uKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nXG5cdHZhciBjYWNoZSwgdGFnUkUsIGh0bWxSRSwgZmlyc3RDaGFyLCBsYXN0Q2hhclxuXG5cdC8qKlxuXHQgKiBFc2NhcGUgYSBzdHJpbmcgc28gaXQgY2FuIGJlIHVzZWQgaW4gYSBSZWdFeHBcblx0ICogY29uc3RydWN0b3IuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcblx0ICovXG5cblx0ZnVuY3Rpb24gZXNjYXBlUmVnZXggKHN0cikge1xuXHQgIHJldHVybiBzdHIucmVwbGFjZShyZWdleEVzY2FwZVJFLCAnXFxcXCQmJylcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21waWxlIHRoZSBpbnRlcnBvbGF0aW9uIHRhZyByZWdleC5cblx0ICpcblx0ICogQHJldHVybiB7UmVnRXhwfVxuXHQgKi9cblxuXHRmdW5jdGlvbiBjb21waWxlUmVnZXggKCkge1xuXHQgIGNvbmZpZy5fZGVsaW1pdGVyc0NoYW5nZWQgPSBmYWxzZVxuXHQgIHZhciBvcGVuID0gY29uZmlnLmRlbGltaXRlcnNbMF1cblx0ICB2YXIgY2xvc2UgPSBjb25maWcuZGVsaW1pdGVyc1sxXVxuXHQgIGZpcnN0Q2hhciA9IG9wZW4uY2hhckF0KDApXG5cdCAgbGFzdENoYXIgPSBjbG9zZS5jaGFyQXQoY2xvc2UubGVuZ3RoIC0gMSlcblx0ICB2YXIgZmlyc3RDaGFyUkUgPSBlc2NhcGVSZWdleChmaXJzdENoYXIpXG5cdCAgdmFyIGxhc3RDaGFyUkUgPSBlc2NhcGVSZWdleChsYXN0Q2hhcilcblx0ICB2YXIgb3BlblJFID0gZXNjYXBlUmVnZXgob3Blbilcblx0ICB2YXIgY2xvc2VSRSA9IGVzY2FwZVJlZ2V4KGNsb3NlKVxuXHQgIHRhZ1JFID0gbmV3IFJlZ0V4cChcblx0ICAgIGZpcnN0Q2hhclJFICsgJz8nICsgb3BlblJFICtcblx0ICAgICcoLis/KScgK1xuXHQgICAgY2xvc2VSRSArIGxhc3RDaGFyUkUgKyAnPycsXG5cdCAgICAnZydcblx0ICApXG5cdCAgaHRtbFJFID0gbmV3IFJlZ0V4cChcblx0ICAgICdeJyArIGZpcnN0Q2hhclJFICsgb3BlblJFICtcblx0ICAgICcuKicgK1xuXHQgICAgY2xvc2VSRSArIGxhc3RDaGFyUkUgKyAnJCdcblx0ICApXG5cdCAgLy8gcmVzZXQgY2FjaGVcblx0ICBjYWNoZSA9IG5ldyBDYWNoZSgxMDAwKVxuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlIGEgdGVtcGxhdGUgdGV4dCBzdHJpbmcgaW50byBhbiBhcnJheSBvZiB0b2tlbnMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG5cdCAqIEByZXR1cm4ge0FycmF5PE9iamVjdD4gfCBudWxsfVxuXHQgKiAgICAgICAgICAgICAgIC0ge1N0cmluZ30gdHlwZVxuXHQgKiAgICAgICAgICAgICAgIC0ge1N0cmluZ30gdmFsdWVcblx0ICogICAgICAgICAgICAgICAtIHtCb29sZWFufSBbaHRtbF1cblx0ICogICAgICAgICAgICAgICAtIHtCb29sZWFufSBbb25lVGltZV1cblx0ICovXG5cblx0ZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uICh0ZXh0KSB7XG5cdCAgaWYgKGNvbmZpZy5fZGVsaW1pdGVyc0NoYW5nZWQpIHtcblx0ICAgIGNvbXBpbGVSZWdleCgpXG5cdCAgfVxuXHQgIHZhciBoaXQgPSBjYWNoZS5nZXQodGV4dClcblx0ICBpZiAoaGl0KSB7XG5cdCAgICByZXR1cm4gaGl0XG5cdCAgfVxuXHQgIGlmICghdGFnUkUudGVzdCh0ZXh0KSkge1xuXHQgICAgcmV0dXJuIG51bGxcblx0ICB9XG5cdCAgdmFyIHRva2VucyA9IFtdXG5cdCAgdmFyIGxhc3RJbmRleCA9IHRhZ1JFLmxhc3RJbmRleCA9IDBcblx0ICB2YXIgbWF0Y2gsIGluZGV4LCB2YWx1ZSwgZmlyc3QsIG9uZVRpbWUsIHBhcnRpYWxcblx0ICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cdCAgd2hpbGUgKG1hdGNoID0gdGFnUkUuZXhlYyh0ZXh0KSkge1xuXHQgICAgaW5kZXggPSBtYXRjaC5pbmRleFxuXHQgICAgLy8gcHVzaCB0ZXh0IHRva2VuXG5cdCAgICBpZiAoaW5kZXggPiBsYXN0SW5kZXgpIHtcblx0ICAgICAgdG9rZW5zLnB1c2goe1xuXHQgICAgICAgIHZhbHVlOiB0ZXh0LnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpXG5cdCAgICAgIH0pXG5cdCAgICB9XG5cdCAgICAvLyB0YWcgdG9rZW5cblx0ICAgIGZpcnN0ID0gbWF0Y2hbMV0uY2hhckNvZGVBdCgwKVxuXHQgICAgb25lVGltZSA9IGZpcnN0ID09PSAweDJBIC8vICpcblx0ICAgIHBhcnRpYWwgPSBmaXJzdCA9PT0gMHgzRSAvLyA+XG5cdCAgICB2YWx1ZSA9IChvbmVUaW1lIHx8IHBhcnRpYWwpXG5cdCAgICAgID8gbWF0Y2hbMV0uc2xpY2UoMSlcblx0ICAgICAgOiBtYXRjaFsxXVxuXHQgICAgdG9rZW5zLnB1c2goe1xuXHQgICAgICB0YWc6IHRydWUsXG5cdCAgICAgIHZhbHVlOiB2YWx1ZS50cmltKCksXG5cdCAgICAgIGh0bWw6IGh0bWxSRS50ZXN0KG1hdGNoWzBdKSxcblx0ICAgICAgb25lVGltZTogb25lVGltZSxcblx0ICAgICAgcGFydGlhbDogcGFydGlhbFxuXHQgICAgfSlcblx0ICAgIGxhc3RJbmRleCA9IGluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoXG5cdCAgfVxuXHQgIGlmIChsYXN0SW5kZXggPCB0ZXh0Lmxlbmd0aCkge1xuXHQgICAgdG9rZW5zLnB1c2goe1xuXHQgICAgICB2YWx1ZTogdGV4dC5zbGljZShsYXN0SW5kZXgpXG5cdCAgICB9KVxuXHQgIH1cblx0ICBjYWNoZS5wdXQodGV4dCwgdG9rZW5zKVxuXHQgIHJldHVybiB0b2tlbnNcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3JtYXQgYSBsaXN0IG9mIHRva2VucyBpbnRvIGFuIGV4cHJlc3Npb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXl9IHRva2Vuc1xuXHQgKiBAcGFyYW0ge1Z1ZX0gW3ZtXVxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdGV4cG9ydHMudG9rZW5zVG9FeHAgPSBmdW5jdGlvbiAodG9rZW5zLCB2bSkge1xuXHQgIHJldHVybiB0b2tlbnMubGVuZ3RoID4gMVxuXHQgICAgPyB0b2tlbnMubWFwKGZ1bmN0aW9uICh0b2tlbikge1xuXHQgICAgICByZXR1cm4gZm9ybWF0VG9rZW4odG9rZW4sIHZtKVxuXHQgICAgfSkuam9pbignKycpXG5cdCAgICA6IGZvcm1hdFRva2VuKHRva2Vuc1swXSwgdm0pXG5cdH1cblxuXHQvKipcblx0ICogRm9ybWF0IGEgc2luZ2xlIHRva2VuLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdG9rZW5cblx0ICogQHBhcmFtIHtWdWV9IFt2bV1cblx0ICogQHJldHVybiB7U3RyaW5nfVxuXHQgKi9cblxuXHRmdW5jdGlvbiBmb3JtYXRUb2tlbiAodG9rZW4sIHZtKSB7XG5cdCAgcmV0dXJuIHRva2VuLnRhZ1xuXHQgICAgPyB2bSAmJiB0b2tlbi5vbmVUaW1lXG5cdCAgICAgID8gJ1wiJyArIHZtLiRnZXQodG9rZW4udmFsdWUpICsgJ1wiJ1xuXHQgICAgICA6ICcoJyArIHRva2VuLnZhbHVlICsgJyknXG5cdCAgICA6ICdcIicgKyB0b2tlbi52YWx1ZSArICdcIidcblx0fVxuXG4vKioqLyB9LFxuLyogNDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgQ2FjaGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUyKVxuXHR2YXIgY2FjaGUgPSBuZXcgQ2FjaGUoMTAwMClcblx0dmFyIGFyZ1JFID0gL15bXlxce1xcP10rJHxeJ1teJ10qJyR8XlwiW15cIl0qXCIkL1xuXHR2YXIgZmlsdGVyVG9rZW5SRSA9IC9bXlxccydcIl0rfCdbXiddKyd8XCJbXlwiXStcIi9nXG5cblx0LyoqXG5cdCAqIFBhcnNlciBzdGF0ZVxuXHQgKi9cblxuXHR2YXIgc3RyXG5cdHZhciBjLCBpLCBsXG5cdHZhciBpblNpbmdsZVxuXHR2YXIgaW5Eb3VibGVcblx0dmFyIGN1cmx5XG5cdHZhciBzcXVhcmVcblx0dmFyIHBhcmVuXG5cdHZhciBiZWdpblxuXHR2YXIgYXJnSW5kZXhcblx0dmFyIGRpcnNcblx0dmFyIGRpclxuXHR2YXIgbGFzdEZpbHRlckluZGV4XG5cdHZhciBhcmdcblxuXHQvKipcblx0ICogUHVzaCBhIGRpcmVjdGl2ZSBvYmplY3QgaW50byB0aGUgcmVzdWx0IEFycmF5XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHB1c2hEaXIgKCkge1xuXHQgIGRpci5yYXcgPSBzdHIuc2xpY2UoYmVnaW4sIGkpLnRyaW0oKVxuXHQgIGlmIChkaXIuZXhwcmVzc2lvbiA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICBkaXIuZXhwcmVzc2lvbiA9IHN0ci5zbGljZShhcmdJbmRleCwgaSkudHJpbSgpXG5cdCAgfSBlbHNlIGlmIChsYXN0RmlsdGVySW5kZXggIT09IGJlZ2luKSB7XG5cdCAgICBwdXNoRmlsdGVyKClcblx0ICB9XG5cdCAgaWYgKGkgPT09IDAgfHwgZGlyLmV4cHJlc3Npb24pIHtcblx0ICAgIGRpcnMucHVzaChkaXIpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFB1c2ggYSBmaWx0ZXIgdG8gdGhlIGN1cnJlbnQgZGlyZWN0aXZlIG9iamVjdFxuXHQgKi9cblxuXHRmdW5jdGlvbiBwdXNoRmlsdGVyICgpIHtcblx0ICB2YXIgZXhwID0gc3RyLnNsaWNlKGxhc3RGaWx0ZXJJbmRleCwgaSkudHJpbSgpXG5cdCAgdmFyIGZpbHRlclxuXHQgIGlmIChleHApIHtcblx0ICAgIGZpbHRlciA9IHt9XG5cdCAgICB2YXIgdG9rZW5zID0gZXhwLm1hdGNoKGZpbHRlclRva2VuUkUpXG5cdCAgICBmaWx0ZXIubmFtZSA9IHRva2Vuc1swXVxuXHQgICAgZmlsdGVyLmFyZ3MgPSB0b2tlbnMubGVuZ3RoID4gMSA/IHRva2Vucy5zbGljZSgxKSA6IG51bGxcblx0ICB9XG5cdCAgaWYgKGZpbHRlcikge1xuXHQgICAgKGRpci5maWx0ZXJzID0gZGlyLmZpbHRlcnMgfHwgW10pLnB1c2goZmlsdGVyKVxuXHQgIH1cblx0ICBsYXN0RmlsdGVySW5kZXggPSBpICsgMVxuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlIGEgZGlyZWN0aXZlIHN0cmluZyBpbnRvIGFuIEFycmF5IG9mIEFTVC1saWtlXG5cdCAqIG9iamVjdHMgcmVwcmVzZW50aW5nIGRpcmVjdGl2ZXMuXG5cdCAqXG5cdCAqIEV4YW1wbGU6XG5cdCAqXG5cdCAqIFwiY2xpY2s6IGEgPSBhICsgMSB8IHVwcGVyY2FzZVwiIHdpbGwgeWllbGQ6XG5cdCAqIHtcblx0ICogICBhcmc6ICdjbGljaycsXG5cdCAqICAgZXhwcmVzc2lvbjogJ2EgPSBhICsgMScsXG5cdCAqICAgZmlsdGVyczogW1xuXHQgKiAgICAgeyBuYW1lOiAndXBwZXJjYXNlJywgYXJnczogbnVsbCB9XG5cdCAqICAgXVxuXHQgKiB9XG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcblx0ICogQHJldHVybiB7QXJyYXk8T2JqZWN0Pn1cblx0ICovXG5cblx0ZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uIChzKSB7XG5cblx0ICB2YXIgaGl0ID0gY2FjaGUuZ2V0KHMpXG5cdCAgaWYgKGhpdCkge1xuXHQgICAgcmV0dXJuIGhpdFxuXHQgIH1cblxuXHQgIC8vIHJlc2V0IHBhcnNlciBzdGF0ZVxuXHQgIHN0ciA9IHNcblx0ICBpblNpbmdsZSA9IGluRG91YmxlID0gZmFsc2Vcblx0ICBjdXJseSA9IHNxdWFyZSA9IHBhcmVuID0gYmVnaW4gPSBhcmdJbmRleCA9IDBcblx0ICBsYXN0RmlsdGVySW5kZXggPSAwXG5cdCAgZGlycyA9IFtdXG5cdCAgZGlyID0ge31cblx0ICBhcmcgPSBudWxsXG5cblx0ICBmb3IgKGkgPSAwLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG5cdCAgICBpZiAoaW5TaW5nbGUpIHtcblx0ICAgICAgLy8gY2hlY2sgc2luZ2xlIHF1b3RlXG5cdCAgICAgIGlmIChjID09PSAweDI3KSBpblNpbmdsZSA9ICFpblNpbmdsZVxuXHQgICAgfSBlbHNlIGlmIChpbkRvdWJsZSkge1xuXHQgICAgICAvLyBjaGVjayBkb3VibGUgcXVvdGVcblx0ICAgICAgaWYgKGMgPT09IDB4MjIpIGluRG91YmxlID0gIWluRG91YmxlXG5cdCAgICB9IGVsc2UgaWYgKFxuXHQgICAgICBjID09PSAweDJDICYmIC8vIGNvbW1hXG5cdCAgICAgICFwYXJlbiAmJiAhY3VybHkgJiYgIXNxdWFyZVxuXHQgICAgKSB7XG5cdCAgICAgIC8vIHJlYWNoZWQgdGhlIGVuZCBvZiBhIGRpcmVjdGl2ZVxuXHQgICAgICBwdXNoRGlyKClcblx0ICAgICAgLy8gcmVzZXQgJiBza2lwIHRoZSBjb21tYVxuXHQgICAgICBkaXIgPSB7fVxuXHQgICAgICBiZWdpbiA9IGFyZ0luZGV4ID0gbGFzdEZpbHRlckluZGV4ID0gaSArIDFcblx0ICAgIH0gZWxzZSBpZiAoXG5cdCAgICAgIGMgPT09IDB4M0EgJiYgLy8gY29sb25cblx0ICAgICAgIWRpci5leHByZXNzaW9uICYmXG5cdCAgICAgICFkaXIuYXJnXG5cdCAgICApIHtcblx0ICAgICAgLy8gYXJndW1lbnRcblx0ICAgICAgYXJnID0gc3RyLnNsaWNlKGJlZ2luLCBpKS50cmltKClcblx0ICAgICAgLy8gdGVzdCBmb3IgdmFsaWQgYXJndW1lbnQgaGVyZVxuXHQgICAgICAvLyBzaW5jZSB3ZSBtYXkgaGF2ZSBjYXVnaHQgc3R1ZmYgbGlrZSBmaXJzdCBoYWxmIG9mXG5cdCAgICAgIC8vIGFuIG9iamVjdCBsaXRlcmFsIG9yIGEgdGVybmFyeSBleHByZXNzaW9uLlxuXHQgICAgICBpZiAoYXJnUkUudGVzdChhcmcpKSB7XG5cdCAgICAgICAgYXJnSW5kZXggPSBpICsgMVxuXHQgICAgICAgIGRpci5hcmcgPSBfLnN0cmlwUXVvdGVzKGFyZykgfHwgYXJnXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSBpZiAoXG5cdCAgICAgIGMgPT09IDB4N0MgJiYgLy8gcGlwZVxuXHQgICAgICBzdHIuY2hhckNvZGVBdChpICsgMSkgIT09IDB4N0MgJiZcblx0ICAgICAgc3RyLmNoYXJDb2RlQXQoaSAtIDEpICE9PSAweDdDXG5cdCAgICApIHtcblx0ICAgICAgaWYgKGRpci5leHByZXNzaW9uID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAvLyBmaXJzdCBmaWx0ZXIsIGVuZCBvZiBleHByZXNzaW9uXG5cdCAgICAgICAgbGFzdEZpbHRlckluZGV4ID0gaSArIDFcblx0ICAgICAgICBkaXIuZXhwcmVzc2lvbiA9IHN0ci5zbGljZShhcmdJbmRleCwgaSkudHJpbSgpXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgLy8gYWxyZWFkeSBoYXMgZmlsdGVyXG5cdCAgICAgICAgcHVzaEZpbHRlcigpXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHN3aXRjaCAoYykge1xuXHQgICAgICAgIGNhc2UgMHgyMjogaW5Eb3VibGUgPSB0cnVlOyBicmVhayAvLyBcIlxuXHQgICAgICAgIGNhc2UgMHgyNzogaW5TaW5nbGUgPSB0cnVlOyBicmVhayAvLyAnXG5cdCAgICAgICAgY2FzZSAweDI4OiBwYXJlbisrOyBicmVhayAgICAgICAgIC8vIChcblx0ICAgICAgICBjYXNlIDB4Mjk6IHBhcmVuLS07IGJyZWFrICAgICAgICAgLy8gKVxuXHQgICAgICAgIGNhc2UgMHg1Qjogc3F1YXJlKys7IGJyZWFrICAgICAgICAvLyBbXG5cdCAgICAgICAgY2FzZSAweDVEOiBzcXVhcmUtLTsgYnJlYWsgICAgICAgIC8vIF1cblx0ICAgICAgICBjYXNlIDB4N0I6IGN1cmx5Kys7IGJyZWFrICAgICAgICAgLy8ge1xuXHQgICAgICAgIGNhc2UgMHg3RDogY3VybHktLTsgYnJlYWsgICAgICAgICAvLyB9XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cblx0ICBpZiAoaSA9PT0gMCB8fCBiZWdpbiAhPT0gaSkge1xuXHQgICAgcHVzaERpcigpXG5cdCAgfVxuXG5cdCAgY2FjaGUucHV0KHMsIGRpcnMpXG5cdCAgcmV0dXJuIGRpcnNcblx0fVxuXG4vKioqLyB9LFxuLyogNDEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgUGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18oNTEpXG5cdHZhciBDYWNoZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTIpXG5cdHZhciBleHByZXNzaW9uQ2FjaGUgPSBuZXcgQ2FjaGUoMTAwMClcblxuXHR2YXIga2V5d29yZHMgPVxuXHQgICdNYXRoLGJyZWFrLGNhc2UsY2F0Y2gsY29udGludWUsZGVidWdnZXIsZGVmYXVsdCwnICtcblx0ICAnZGVsZXRlLGRvLGVsc2UsZmFsc2UsZmluYWxseSxmb3IsZnVuY3Rpb24saWYsaW4sJyArXG5cdCAgJ2luc3RhbmNlb2YsbmV3LG51bGwscmV0dXJuLHN3aXRjaCx0aGlzLHRocm93LHRydWUsdHJ5LCcgK1xuXHQgICd0eXBlb2YsdmFyLHZvaWQsd2hpbGUsd2l0aCx1bmRlZmluZWQsYWJzdHJhY3QsYm9vbGVhbiwnICtcblx0ICAnYnl0ZSxjaGFyLGNsYXNzLGNvbnN0LGRvdWJsZSxlbnVtLGV4cG9ydCxleHRlbmRzLCcgK1xuXHQgICdmaW5hbCxmbG9hdCxnb3RvLGltcGxlbWVudHMsaW1wb3J0LGludCxpbnRlcmZhY2UsbG9uZywnICtcblx0ICAnbmF0aXZlLHBhY2thZ2UscHJpdmF0ZSxwcm90ZWN0ZWQscHVibGljLHNob3J0LHN0YXRpYywnICtcblx0ICAnc3VwZXIsc3luY2hyb25pemVkLHRocm93cyx0cmFuc2llbnQsdm9sYXRpbGUsJyArXG5cdCAgJ2FyZ3VtZW50cyxsZXQseWllbGQnXG5cblx0dmFyIHdzUkUgPSAvXFxzL2dcblx0dmFyIG5ld2xpbmVSRSA9IC9cXG4vZ1xuXHR2YXIgc2F2ZVJFID0gL1tcXHssXVxccypbXFx3XFwkX10rXFxzKjp8J1teJ10qJ3xcIlteXCJdKlwiL2dcblx0dmFyIHJlc3RvcmVSRSA9IC9cIihcXGQrKVwiL2dcblx0dmFyIHBhdGhUZXN0UkUgPSAvXltBLVphLXpfJF1bXFx3JF0qKFxcLltBLVphLXpfJF1bXFx3JF0qfFxcWycuKj8nXFxdfFxcW1wiLio/XCJcXF0pKiQvXG5cdHZhciBwYXRoUmVwbGFjZVJFID0gL1teXFx3JFxcLl0oW0EtWmEtel8kXVtcXHckXSooXFwuW0EtWmEtel8kXVtcXHckXSp8XFxbJy4qPydcXF18XFxbXCIuKj9cIlxcXSkqKS9nXG5cdHZhciBrZXl3b3Jkc1JFID0gbmV3IFJlZ0V4cCgnXignICsga2V5d29yZHMucmVwbGFjZSgvLC9nLCAnXFxcXGJ8JykgKyAnXFxcXGIpJylcblxuXHQvKipcblx0ICogU2F2ZSAvIFJld3JpdGUgLyBSZXN0b3JlXG5cdCAqXG5cdCAqIFdoZW4gcmV3cml0aW5nIHBhdGhzIGZvdW5kIGluIGFuIGV4cHJlc3Npb24sIGl0IGlzXG5cdCAqIHBvc3NpYmxlIGZvciB0aGUgc2FtZSBsZXR0ZXIgc2VxdWVuY2VzIHRvIGJlIGZvdW5kIGluXG5cdCAqIHN0cmluZ3MgYW5kIE9iamVjdCBsaXRlcmFsIHByb3BlcnR5IGtleXMuIFRoZXJlZm9yZSB3ZVxuXHQgKiByZW1vdmUgYW5kIHN0b3JlIHRoZXNlIHBhcnRzIGluIGEgdGVtcG9yYXJ5IGFycmF5LCBhbmRcblx0ICogcmVzdG9yZSB0aGVtIGFmdGVyIHRoZSBwYXRoIHJld3JpdGUuXG5cdCAqL1xuXG5cdHZhciBzYXZlZCA9IFtdXG5cblx0LyoqXG5cdCAqIFNhdmUgcmVwbGFjZXJcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0clxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gcGxhY2Vob2xkZXIgd2l0aCBpbmRleFxuXHQgKi9cblxuXHRmdW5jdGlvbiBzYXZlIChzdHIpIHtcblx0ICB2YXIgaSA9IHNhdmVkLmxlbmd0aFxuXHQgIHNhdmVkW2ldID0gc3RyLnJlcGxhY2UobmV3bGluZVJFLCAnXFxcXG4nKVxuXHQgIHJldHVybiAnXCInICsgaSArICdcIidcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXRoIHJld3JpdGUgcmVwbGFjZXJcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHJhd1xuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHJld3JpdGUgKHJhdykge1xuXHQgIHZhciBjID0gcmF3LmNoYXJBdCgwKVxuXHQgIHZhciBwYXRoID0gcmF3LnNsaWNlKDEpXG5cdCAgaWYgKGtleXdvcmRzUkUudGVzdChwYXRoKSkge1xuXHQgICAgcmV0dXJuIHJhd1xuXHQgIH0gZWxzZSB7XG5cdCAgICBwYXRoID0gcGF0aC5pbmRleE9mKCdcIicpID4gLTFcblx0ICAgICAgPyBwYXRoLnJlcGxhY2UocmVzdG9yZVJFLCByZXN0b3JlKVxuXHQgICAgICA6IHBhdGhcblx0ICAgIHJldHVybiBjICsgJ3Njb3BlLicgKyBwYXRoXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlc3RvcmUgcmVwbGFjZXJcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0clxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaSAtIG1hdGNoZWQgc2F2ZSBpbmRleFxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHJlc3RvcmUgKHN0ciwgaSkge1xuXHQgIHJldHVybiBzYXZlZFtpXVxuXHR9XG5cblx0LyoqXG5cdCAqIFJld3JpdGUgYW4gZXhwcmVzc2lvbiwgcHJlZml4aW5nIGFsbCBwYXRoIGFjY2Vzc29ycyB3aXRoXG5cdCAqIGBzY29wZS5gIGFuZCBnZW5lcmF0ZSBnZXR0ZXIvc2V0dGVyIGZ1bmN0aW9ucy5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV4cFxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG5lZWRTZXRcblx0ICogQHJldHVybiB7RnVuY3Rpb259XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNvbXBpbGVFeHBGbnMgKGV4cCwgbmVlZFNldCkge1xuXHQgIC8vIHJlc2V0IHN0YXRlXG5cdCAgc2F2ZWQubGVuZ3RoID0gMFxuXHQgIC8vIHNhdmUgc3RyaW5ncyBhbmQgb2JqZWN0IGxpdGVyYWwga2V5c1xuXHQgIHZhciBib2R5ID0gZXhwXG5cdCAgICAucmVwbGFjZShzYXZlUkUsIHNhdmUpXG5cdCAgICAucmVwbGFjZSh3c1JFLCAnJylcblx0ICAvLyByZXdyaXRlIGFsbCBwYXRoc1xuXHQgIC8vIHBhZCAxIHNwYWNlIGhlcmUgYmVjYXVlIHRoZSByZWdleCBtYXRjaGVzIDEgZXh0cmEgY2hhclxuXHQgIGJvZHkgPSAoJyAnICsgYm9keSlcblx0ICAgIC5yZXBsYWNlKHBhdGhSZXBsYWNlUkUsIHJld3JpdGUpXG5cdCAgICAucmVwbGFjZShyZXN0b3JlUkUsIHJlc3RvcmUpXG5cdCAgdmFyIGdldHRlciA9IG1ha2VHZXR0ZXIoYm9keSlcblx0ICBpZiAoZ2V0dGVyKSB7XG5cdCAgICByZXR1cm4ge1xuXHQgICAgICBnZXQ6IGdldHRlcixcblx0ICAgICAgYm9keTogYm9keSxcblx0ICAgICAgc2V0OiBuZWVkU2V0XG5cdCAgICAgICAgPyBtYWtlU2V0dGVyKGJvZHkpXG5cdCAgICAgICAgOiBudWxsXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBpbGUgZ2V0dGVyIHNldHRlcnMgZm9yIGEgc2ltcGxlIHBhdGguXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBleHBcblx0ICogQHJldHVybiB7RnVuY3Rpb259XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGNvbXBpbGVQYXRoRm5zIChleHApIHtcblx0ICB2YXIgZ2V0dGVyLCBwYXRoXG5cdCAgaWYgKGV4cC5pbmRleE9mKCdbJykgPCAwKSB7XG5cdCAgICAvLyByZWFsbHkgc2ltcGxlIHBhdGhcblx0ICAgIHBhdGggPSBleHAuc3BsaXQoJy4nKVxuXHQgICAgZ2V0dGVyID0gUGF0aC5jb21waWxlR2V0dGVyKHBhdGgpXG5cdCAgfSBlbHNlIHtcblx0ICAgIC8vIGRvIHRoZSByZWFsIHBhcnNpbmdcblx0ICAgIHBhdGggPSBQYXRoLnBhcnNlKGV4cClcblx0ICAgIGdldHRlciA9IHBhdGguZ2V0XG5cdCAgfVxuXHQgIHJldHVybiB7XG5cdCAgICBnZXQ6IGdldHRlcixcblx0ICAgIC8vIGFsd2F5cyBnZW5lcmF0ZSBzZXR0ZXIgZm9yIHNpbXBsZSBwYXRoc1xuXHQgICAgc2V0OiBmdW5jdGlvbiAob2JqLCB2YWwpIHtcblx0ICAgICAgUGF0aC5zZXQob2JqLCBwYXRoLCB2YWwpXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIGEgZ2V0dGVyIGZ1bmN0aW9uLiBSZXF1aXJlcyBldmFsLlxuXHQgKlxuXHQgKiBXZSBpc29sYXRlIHRoZSB0cnkvY2F0Y2ggc28gaXQgZG9lc24ndCBhZmZlY3QgdGhlXG5cdCAqIG9wdGltaXphdGlvbiBvZiB0aGUgcGFyc2UgZnVuY3Rpb24gd2hlbiBpdCBpcyBub3QgY2FsbGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gYm9keVxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbnx1bmRlZmluZWR9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIG1ha2VHZXR0ZXIgKGJvZHkpIHtcblx0ICB0cnkge1xuXHQgICAgcmV0dXJuIG5ldyBGdW5jdGlvbignc2NvcGUnLCAncmV0dXJuICcgKyBib2R5ICsgJzsnKVxuXHQgIH0gY2F0Y2ggKGUpIHtcblx0ICAgIF8ud2Fybihcblx0ICAgICAgJ0ludmFsaWQgZXhwcmVzc2lvbi4gJyArIFxuXHQgICAgICAnR2VuZXJhdGVkIGZ1bmN0aW9uIGJvZHk6ICcgKyBib2R5XG5cdCAgICApXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIGEgc2V0dGVyIGZ1bmN0aW9uLlxuXHQgKlxuXHQgKiBUaGlzIGlzIG9ubHkgbmVlZGVkIGluIHJhcmUgc2l0dWF0aW9ucyBsaWtlIFwiYVtiXVwiIHdoZXJlXG5cdCAqIGEgc2V0dGFibGUgcGF0aCByZXF1aXJlcyBkeW5hbWljIGV2YWx1YXRpb24uXG5cdCAqXG5cdCAqIFRoaXMgc2V0dGVyIGZ1bmN0aW9uIG1heSB0aHJvdyBlcnJvciB3aGVuIGNhbGxlZCBpZiB0aGVcblx0ICogZXhwcmVzc2lvbiBib2R5IGlzIG5vdCBhIHZhbGlkIGxlZnQtaGFuZCBleHByZXNzaW9uIGluXG5cdCAqIGFzc2lnbm1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBib2R5XG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufHVuZGVmaW5lZH1cblx0ICovXG5cblx0ZnVuY3Rpb24gbWFrZVNldHRlciAoYm9keSkge1xuXHQgIHRyeSB7XG5cdCAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdzY29wZScsICd2YWx1ZScsIGJvZHkgKyAnPXZhbHVlOycpXG5cdCAgfSBjYXRjaCAoZSkge1xuXHQgICAgXy53YXJuKCdJbnZhbGlkIHNldHRlciBmdW5jdGlvbiBib2R5OiAnICsgYm9keSlcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgZm9yIHNldHRlciBleGlzdGVuY2Ugb24gYSBjYWNoZSBoaXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGhpdFxuXHQgKi9cblxuXHRmdW5jdGlvbiBjaGVja1NldHRlciAoaGl0KSB7XG5cdCAgaWYgKCFoaXQuc2V0KSB7XG5cdCAgICBoaXQuc2V0ID0gbWFrZVNldHRlcihoaXQuYm9keSlcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogUGFyc2UgYW4gZXhwcmVzc2lvbiBpbnRvIHJlLXdyaXR0ZW4gZ2V0dGVyL3NldHRlcnMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBleHBcblx0ICogQHBhcmFtIHtCb29sZWFufSBuZWVkU2V0XG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuXHQgKi9cblxuXHRleHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKGV4cCwgbmVlZFNldCkge1xuXHQgIGV4cCA9IGV4cC50cmltKClcblx0ICAvLyB0cnkgY2FjaGVcblx0ICB2YXIgaGl0ID0gZXhwcmVzc2lvbkNhY2hlLmdldChleHApXG5cdCAgaWYgKGhpdCkge1xuXHQgICAgaWYgKG5lZWRTZXQpIHtcblx0ICAgICAgY2hlY2tTZXR0ZXIoaGl0KVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGhpdFxuXHQgIH1cblx0ICAvLyB3ZSBkbyBhIHNpbXBsZSBwYXRoIGNoZWNrIHRvIG9wdGltaXplIGZvciB0aGVtLlxuXHQgIC8vIHRoZSBjaGVjayBmYWlscyB2YWxpZCBwYXRocyB3aXRoIHVudXNhbCB3aGl0ZXNwYWNlcyxcblx0ICAvLyBidXQgdGhhdCdzIHRvbyByYXJlIGFuZCB3ZSBkb24ndCBjYXJlLlxuXHQgIHZhciByZXMgPSBwYXRoVGVzdFJFLnRlc3QoZXhwKVxuXHQgICAgPyBjb21waWxlUGF0aEZucyhleHApXG5cdCAgICA6IGNvbXBpbGVFeHBGbnMoZXhwLCBuZWVkU2V0KVxuXHQgIGV4cHJlc3Npb25DYWNoZS5wdXQoZXhwLCByZXMpXG5cdCAgcmV0dXJuIHJlc1xuXHR9XG5cblx0Ly8gRXhwb3J0IHRoZSBwYXRoUmVnZXggZm9yIGV4dGVybmFsIHVzZVxuXHRleHBvcnRzLnBhdGhUZXN0UkUgPSBwYXRoVGVzdFJFXG5cbi8qKiovIH0sXG4vKiA0MiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBhcHBseUNTU1RyYW5zaXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUzKVxuXHR2YXIgYXBwbHlKU1RyYW5zaXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU0KVxuXG5cdC8qKlxuXHQgKiBBcHBlbmQgd2l0aCB0cmFuc2l0aW9uLlxuXHQgKlxuXHQgKiBAb2FyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqL1xuXG5cdGV4cG9ydHMuYXBwZW5kID0gZnVuY3Rpb24gKGVsLCB0YXJnZXQsIHZtLCBjYikge1xuXHQgIGFwcGx5KGVsLCAxLCBmdW5jdGlvbiAoKSB7XG5cdCAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoZWwpXG5cdCAgfSwgdm0sIGNiKVxuXHR9XG5cblx0LyoqXG5cdCAqIEluc2VydEJlZm9yZSB3aXRoIHRyYW5zaXRpb24uXG5cdCAqXG5cdCAqIEBvYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICovXG5cblx0ZXhwb3J0cy5iZWZvcmUgPSBmdW5jdGlvbiAoZWwsIHRhcmdldCwgdm0sIGNiKSB7XG5cdCAgYXBwbHkoZWwsIDEsIGZ1bmN0aW9uICgpIHtcblx0ICAgIF8uYmVmb3JlKGVsLCB0YXJnZXQpXG5cdCAgfSwgdm0sIGNiKVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSB3aXRoIHRyYW5zaXRpb24uXG5cdCAqXG5cdCAqIEBvYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICovXG5cblx0ZXhwb3J0cy5yZW1vdmUgPSBmdW5jdGlvbiAoZWwsIHZtLCBjYikge1xuXHQgIGFwcGx5KGVsLCAtMSwgZnVuY3Rpb24gKCkge1xuXHQgICAgXy5yZW1vdmUoZWwpXG5cdCAgfSwgdm0sIGNiKVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBieSBhcHBlbmRpbmcgdG8gYW5vdGhlciBwYXJlbnQgd2l0aCB0cmFuc2l0aW9uLlxuXHQgKiBUaGlzIGlzIG9ubHkgdXNlZCBpbiBibG9jayBvcGVyYXRpb25zLlxuXHQgKlxuXHQgKiBAb2FyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG5cdCAqL1xuXG5cdGV4cG9ydHMucmVtb3ZlVGhlbkFwcGVuZCA9IGZ1bmN0aW9uIChlbCwgdGFyZ2V0LCB2bSwgY2IpIHtcblx0ICBhcHBseShlbCwgLTEsIGZ1bmN0aW9uICgpIHtcblx0ICAgIHRhcmdldC5hcHBlbmRDaGlsZChlbClcblx0ICB9LCB2bSwgY2IpXG5cdH1cblxuXHQvKipcblx0ICogQXBwZW5kIHRoZSBjaGlsZE5vZGVzIG9mIGEgZnJhZ21lbnQgdG8gdGFyZ2V0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IGJsb2NrXG5cdCAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKi9cblxuXHRleHBvcnRzLmJsb2NrQXBwZW5kID0gZnVuY3Rpb24gKGJsb2NrLCB0YXJnZXQsIHZtKSB7XG5cdCAgdmFyIG5vZGVzID0gXy50b0FycmF5KGJsb2NrLmNoaWxkTm9kZXMpXG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSBub2Rlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgIGV4cG9ydHMuYmVmb3JlKG5vZGVzW2ldLCB0YXJnZXQsIHZtKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYSBibG9jayBvZiBub2RlcyBiZXR3ZWVuIHR3byBlZGdlIG5vZGVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IHN0YXJ0XG5cdCAqIEBwYXJhbSB7Tm9kZX0gZW5kXG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKi9cblxuXHRleHBvcnRzLmJsb2NrUmVtb3ZlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIHZtKSB7XG5cdCAgdmFyIG5vZGUgPSBzdGFydC5uZXh0U2libGluZ1xuXHQgIHZhciBuZXh0XG5cdCAgd2hpbGUgKG5vZGUgIT09IGVuZCkge1xuXHQgICAgbmV4dCA9IG5vZGUubmV4dFNpYmxpbmdcblx0ICAgIGV4cG9ydHMucmVtb3ZlKG5vZGUsIHZtKVxuXHQgICAgbm9kZSA9IG5leHRcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQXBwbHkgdHJhbnNpdGlvbnMgd2l0aCBhbiBvcGVyYXRpb24gY2FsbGJhY2suXG5cdCAqXG5cdCAqIEBvYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpcmVjdGlvblxuXHQgKiAgICAgICAgICAgICAgICAgIDE6IGVudGVyXG5cdCAqICAgICAgICAgICAgICAgICAtMTogbGVhdmVcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gb3AgLSB0aGUgYWN0dWFsIERPTSBvcGVyYXRpb25cblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl1cblx0ICovXG5cblx0dmFyIGFwcGx5ID0gZXhwb3J0cy5hcHBseSA9IGZ1bmN0aW9uIChlbCwgZGlyZWN0aW9uLCBvcCwgdm0sIGNiKSB7XG5cdCAgdmFyIHRyYW5zRGF0YSA9IGVsLl9fdl90cmFuc1xuXHQgIGlmIChcblx0ICAgICF0cmFuc0RhdGEgfHxcblx0ICAgICF2bS5faXNDb21waWxlZCB8fFxuXHQgICAgLy8gaWYgdGhlIHZtIGlzIGJlaW5nIG1hbmlwdWxhdGVkIGJ5IGEgcGFyZW50IGRpcmVjdGl2ZVxuXHQgICAgLy8gZHVyaW5nIHRoZSBwYXJlbnQncyBjb21waWxhdGlvbiBwaGFzZSwgc2tpcCB0aGVcblx0ICAgIC8vIGFuaW1hdGlvbi5cblx0ICAgICh2bS4kcGFyZW50ICYmICF2bS4kcGFyZW50Ll9pc0NvbXBpbGVkKVxuXHQgICkge1xuXHQgICAgb3AoKVxuXHQgICAgaWYgKGNiKSBjYigpXG5cdCAgICByZXR1cm5cblx0ICB9XG5cdCAgLy8gZGV0ZXJtaW5lIHRoZSB0cmFuc2l0aW9uIHR5cGUgb24gdGhlIGVsZW1lbnRcblx0ICB2YXIganNUcmFuc2l0aW9uID0gdm0uJG9wdGlvbnMudHJhbnNpdGlvbnNbdHJhbnNEYXRhLmlkXVxuXHQgIGlmIChqc1RyYW5zaXRpb24pIHtcblx0ICAgIC8vIGpzXG5cdCAgICBhcHBseUpTVHJhbnNpdGlvbihcblx0ICAgICAgZWwsXG5cdCAgICAgIGRpcmVjdGlvbixcblx0ICAgICAgb3AsXG5cdCAgICAgIHRyYW5zRGF0YSxcblx0ICAgICAganNUcmFuc2l0aW9uLFxuXHQgICAgICBjYlxuXHQgICAgKVxuXHQgIH0gZWxzZSBpZiAoXy50cmFuc2l0aW9uRW5kRXZlbnQpIHtcblx0ICAgIC8vIGNzc1xuXHQgICAgYXBwbHlDU1NUcmFuc2l0aW9uKFxuXHQgICAgICBlbCxcblx0ICAgICAgZGlyZWN0aW9uLFxuXHQgICAgICBvcCxcblx0ICAgICAgdHJhbnNEYXRhLFxuXHQgICAgICBjYlxuXHQgICAgKVxuXHQgIH0gZWxzZSB7XG5cdCAgICAvLyBub3QgYXBwbGljYWJsZVxuXHQgICAgb3AoKVxuXHQgICAgaWYgKGNiKSBjYigpXG5cdCAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiA0MyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBjb25maWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KVxuXHR2YXIgdGV4dFBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpXG5cdHZhciBkaXJQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKVxuXHR2YXIgdGVtcGxhdGVQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUwKVxuXG5cdC8qKlxuXHQgKiBDb21waWxlIGEgdGVtcGxhdGUgYW5kIHJldHVybiBhIHJldXNhYmxlIGNvbXBvc2l0ZSBsaW5rXG5cdCAqIGZ1bmN0aW9uLCB3aGljaCByZWN1cnNpdmVseSBjb250YWlucyBtb3JlIGxpbmsgZnVuY3Rpb25zXG5cdCAqIGluc2lkZS4gVGhpcyB0b3AgbGV2ZWwgY29tcGlsZSBmdW5jdGlvbiBzaG91bGQgb25seSBiZVxuXHQgKiBjYWxsZWQgb24gaW5zdGFuY2Ugcm9vdCBub2Rlcy5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9IGVsXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gcGFydGlhbFxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn1cblx0ICovXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21waWxlIChlbCwgb3B0aW9ucywgcGFydGlhbCkge1xuXHQgIHZhciBwYXJhbXMgPSAhcGFydGlhbCAmJiBvcHRpb25zLnBhcmFtQXR0cmlidXRlc1xuXHQgIHZhciBwYXJhbXNMaW5rRm4gPSBwYXJhbXNcblx0ICAgID8gY29tcGlsZVBhcmFtQXR0cmlidXRlcyhlbCwgcGFyYW1zLCBvcHRpb25zKVxuXHQgICAgOiBudWxsXG5cdCAgdmFyIG5vZGVMaW5rRm4gPSBlbCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnRcblx0ICAgID8gbnVsbFxuXHQgICAgOiBjb21waWxlTm9kZShlbCwgb3B0aW9ucylcblx0ICB2YXIgY2hpbGRMaW5rRm4gPVxuXHQgICAgKCFub2RlTGlua0ZuIHx8ICFub2RlTGlua0ZuLnRlcm1pbmFsKSAmJlxuXHQgICAgZWwuaGFzQ2hpbGROb2RlcygpXG5cdCAgICAgID8gY29tcGlsZU5vZGVMaXN0KGVsLmNoaWxkTm9kZXMsIG9wdGlvbnMpXG5cdCAgICAgIDogbnVsbFxuXG5cdCAgLyoqXG5cdCAgICogQSBsaW5rZXIgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGEgYWxyZWFkeSBjb21waWxlZFxuXHQgICAqIHBpZWNlIG9mIERPTSwgd2hpY2ggaW5zdGFudGlhdGVzIGFsbCBkaXJlY3RpdmVcblx0ICAgKiBpbnN0YW5jZXMuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge1Z1ZX0gdm1cblx0ICAgKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gZWxcblx0ICAgKiBAcmV0dXJuIHtGdW5jdGlvbnx1bmRlZmluZWR9XG5cdCAgICovXG5cblx0ICByZXR1cm4gZnVuY3Rpb24gbGluayAodm0sIGVsKSB7XG5cdCAgICB2YXIgb3JpZ2luYWxEaXJDb3VudCA9IHZtLl9kaXJlY3RpdmVzLmxlbmd0aFxuXHQgICAgaWYgKHBhcmFtc0xpbmtGbikgcGFyYW1zTGlua0ZuKHZtLCBlbClcblx0ICAgIGlmIChub2RlTGlua0ZuKSBub2RlTGlua0ZuKHZtLCBlbClcblx0ICAgIGlmIChjaGlsZExpbmtGbikgY2hpbGRMaW5rRm4odm0sIGVsLmNoaWxkTm9kZXMpXG5cblx0ICAgIC8qKlxuXHQgICAgICogSWYgdGhpcyBpcyBhIHBhcnRpYWwgY29tcGlsZSwgdGhlIGxpbmtlciBmdW5jdGlvblxuXHQgICAgICogcmV0dXJucyBhbiB1bmxpbmsgZnVuY3Rpb24gdGhhdCB0ZWFyc2Rvd24gYWxsXG5cdCAgICAgKiBkaXJlY3RpdmVzIGluc3RhbmNlcyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBwYXJ0aWFsXG5cdCAgICAgKiBsaW5raW5nLlxuXHQgICAgICovXG5cblx0ICAgIGlmIChwYXJ0aWFsKSB7XG5cdCAgICAgIHZhciBkaXJzID0gdm0uX2RpcmVjdGl2ZXMuc2xpY2Uob3JpZ2luYWxEaXJDb3VudClcblx0ICAgICAgcmV0dXJuIGZ1bmN0aW9uIHVubGluayAoKSB7XG5cdCAgICAgICAgdmFyIGkgPSBkaXJzLmxlbmd0aFxuXHQgICAgICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgICAgIGRpcnNbaV0uX3RlYXJkb3duKClcblx0ICAgICAgICB9XG5cdCAgICAgICAgaSA9IHZtLl9kaXJlY3RpdmVzLmluZGV4T2YoZGlyc1swXSlcblx0ICAgICAgICB2bS5fZGlyZWN0aXZlcy5zcGxpY2UoaSwgZGlycy5sZW5ndGgpXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGlsZSBhIG5vZGUgYW5kIHJldHVybiBhIG5vZGVMaW5rRm4gYmFzZWQgb24gdGhlXG5cdCAqIG5vZGUgdHlwZS5cblx0ICpcblx0ICogQHBhcmFtIHtOb2RlfSBub2RlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufHVuZGVmaW5lZH1cblx0ICovXG5cblx0ZnVuY3Rpb24gY29tcGlsZU5vZGUgKG5vZGUsIG9wdGlvbnMpIHtcblx0ICB2YXIgdHlwZSA9IG5vZGUubm9kZVR5cGVcblx0ICBpZiAodHlwZSA9PT0gMSAmJiBub2RlLnRhZ05hbWUgIT09ICdTQ1JJUFQnKSB7XG5cdCAgICByZXR1cm4gY29tcGlsZUVsZW1lbnQobm9kZSwgb3B0aW9ucylcblx0ICB9IGVsc2UgaWYgKHR5cGUgPT09IDMgJiYgY29uZmlnLmludGVycG9sYXRlKSB7XG5cdCAgICByZXR1cm4gY29tcGlsZVRleHROb2RlKG5vZGUsIG9wdGlvbnMpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBpbGUgYW4gZWxlbWVudCBhbmQgcmV0dXJuIGEgbm9kZUxpbmtGbi5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbFxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbnxudWxsfVxuXHQgKi9cblxuXHRmdW5jdGlvbiBjb21waWxlRWxlbWVudCAoZWwsIG9wdGlvbnMpIHtcblx0ICB2YXIgbGlua0ZuLCB0YWcsIGNvbXBvbmVudFxuXHQgIC8vIGNoZWNrIGN1c3RvbSBlbGVtZW50IGNvbXBvbmVudCwgYnV0IG9ubHkgb24gbm9uLXJvb3Rcblx0ICBpZiAoIWVsLl9fdnVlX18pIHtcblx0ICAgIHRhZyA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuXHQgICAgY29tcG9uZW50ID1cblx0ICAgICAgdGFnLmluZGV4T2YoJy0nKSA+IDAgJiZcblx0ICAgICAgb3B0aW9ucy5jb21wb25lbnRzW3RhZ11cblx0ICAgIGlmIChjb21wb25lbnQpIHtcblx0ICAgICAgZWwuc2V0QXR0cmlidXRlKGNvbmZpZy5wcmVmaXggKyAnY29tcG9uZW50JywgdGFnKVxuXHQgICAgfVxuXHQgIH1cblx0ICBpZiAoY29tcG9uZW50IHx8IGVsLmhhc0F0dHJpYnV0ZXMoKSkge1xuXHQgICAgLy8gY2hlY2sgdGVybWluYWwgZGlyZWNpdHZlc1xuXHQgICAgbGlua0ZuID0gY2hlY2tUZXJtaW5hbERpcmVjdGl2ZXMoZWwsIG9wdGlvbnMpXG5cdCAgICAvLyBpZiBub3QgdGVybWluYWwsIGJ1aWxkIG5vcm1hbCBsaW5rIGZ1bmN0aW9uXG5cdCAgICBpZiAoIWxpbmtGbikge1xuXHQgICAgICB2YXIgZGlyZWN0aXZlcyA9IGNvbGxlY3REaXJlY3RpdmVzKGVsLCBvcHRpb25zKVxuXHQgICAgICBsaW5rRm4gPSBkaXJlY3RpdmVzLmxlbmd0aFxuXHQgICAgICAgID8gbWFrZURpcmVjdGl2ZXNMaW5rRm4oZGlyZWN0aXZlcylcblx0ICAgICAgICA6IG51bGxcblx0ICAgIH1cblx0ICB9XG5cdCAgLy8gaWYgdGhlIGVsZW1lbnQgaXMgYSB0ZXh0YXJlYSwgd2UgbmVlZCB0byBpbnRlcnBvbGF0ZVxuXHQgIC8vIGl0cyBjb250ZW50IG9uIGluaXRpYWwgcmVuZGVyLlxuXHQgIGlmIChlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG5cdCAgICB2YXIgcmVhbExpbmtGbiA9IGxpbmtGblxuXHQgICAgbGlua0ZuID0gZnVuY3Rpb24gKHZtLCBlbCkge1xuXHQgICAgICBlbC52YWx1ZSA9IHZtLiRpbnRlcnBvbGF0ZShlbC52YWx1ZSlcblx0ICAgICAgaWYgKHJlYWxMaW5rRm4pIHJlYWxMaW5rRm4odm0sIGVsKSAgICAgIFxuXHQgICAgfVxuXHQgICAgbGlua0ZuLnRlcm1pbmFsID0gdHJ1ZVxuXHQgIH1cblx0ICByZXR1cm4gbGlua0ZuXG5cdH1cblxuXHQvKipcblx0ICogQnVpbGQgYSBtdWx0aS1kaXJlY3RpdmUgbGluayBmdW5jdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheX0gZGlyZWN0aXZlc1xuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn0gZGlyZWN0aXZlc0xpbmtGblxuXHQgKi9cblxuXHRmdW5jdGlvbiBtYWtlRGlyZWN0aXZlc0xpbmtGbiAoZGlyZWN0aXZlcykge1xuXHQgIHJldHVybiBmdW5jdGlvbiBkaXJlY3RpdmVzTGlua0ZuICh2bSwgZWwpIHtcblx0ICAgIC8vIHJldmVyc2UgYXBwbHkgYmVjYXVzZSBpdCdzIHNvcnRlZCBsb3cgdG8gaGlnaFxuXHQgICAgdmFyIGkgPSBkaXJlY3RpdmVzLmxlbmd0aFxuXHQgICAgdmFyIGRpciwgaiwga1xuXHQgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICBkaXIgPSBkaXJlY3RpdmVzW2ldXG5cdCAgICAgIGlmIChkaXIuX2xpbmspIHtcblx0ICAgICAgICAvLyBjdXN0b20gbGluayBmblxuXHQgICAgICAgIGRpci5fbGluayh2bSwgZWwpXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgayA9IGRpci5kZXNjcmlwdG9ycy5sZW5ndGhcblx0ICAgICAgICBmb3IgKGogPSAwOyBqIDwgazsgaisrKSB7XG5cdCAgICAgICAgICB2bS5fYmluZERpcihkaXIubmFtZSwgZWwsXG5cdCAgICAgICAgICAgICAgICAgICAgICBkaXIuZGVzY3JpcHRvcnNbal0sIGRpci5kZWYpXG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBpbGUgYSB0ZXh0Tm9kZSBhbmQgcmV0dXJuIGEgbm9kZUxpbmtGbi5cblx0ICpcblx0ICogQHBhcmFtIHtUZXh0Tm9kZX0gbm9kZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbnxudWxsfSB0ZXh0Tm9kZUxpbmtGblxuXHQgKi9cblxuXHRmdW5jdGlvbiBjb21waWxlVGV4dE5vZGUgKG5vZGUsIG9wdGlvbnMpIHtcblx0ICB2YXIgdG9rZW5zID0gdGV4dFBhcnNlci5wYXJzZShub2RlLm5vZGVWYWx1ZSlcblx0ICBpZiAoIXRva2Vucykge1xuXHQgICAgcmV0dXJuIG51bGxcblx0ICB9XG5cdCAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0ICB2YXIgZGlycyA9IG9wdGlvbnMuZGlyZWN0aXZlc1xuXHQgIHZhciBlbCwgdG9rZW4sIHZhbHVlXG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICB0b2tlbiA9IHRva2Vuc1tpXVxuXHQgICAgdmFsdWUgPSB0b2tlbi52YWx1ZVxuXHQgICAgaWYgKHRva2VuLnRhZykge1xuXHQgICAgICBpZiAodG9rZW4ub25lVGltZSkge1xuXHQgICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUpXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgaWYgKHRva2VuLmh0bWwpIHtcblx0ICAgICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgndi1odG1sJylcblx0ICAgICAgICAgIHRva2VuLnR5cGUgPSAnaHRtbCdcblx0ICAgICAgICAgIHRva2VuLmRlZiA9IGRpcnMuaHRtbFxuXHQgICAgICAgICAgdG9rZW4uZGVzY3JpcHRvciA9IGRpclBhcnNlci5wYXJzZSh2YWx1ZSlbMF1cblx0ICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnBhcnRpYWwpIHtcblx0ICAgICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgndi1wYXJ0aWFsJylcblx0ICAgICAgICAgIHRva2VuLnR5cGUgPSAncGFydGlhbCdcblx0ICAgICAgICAgIHRva2VuLmRlZiA9IGRpcnMucGFydGlhbFxuXHQgICAgICAgICAgdG9rZW4uZGVzY3JpcHRvciA9IGRpclBhcnNlci5wYXJzZSh2YWx1ZSlbMF1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgLy8gSUUgd2lsbCBjbGVhbiB1cCBlbXB0eSB0ZXh0Tm9kZXMgZHVyaW5nXG5cdCAgICAgICAgICAvLyBmcmFnLmNsb25lTm9kZSh0cnVlKSwgc28gd2UgaGF2ZSB0byBnaXZlIGl0XG5cdCAgICAgICAgICAvLyBzb21ldGhpbmcgaGVyZS4uLlxuXHQgICAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnICcpXG5cdCAgICAgICAgICB0b2tlbi50eXBlID0gJ3RleHQnXG5cdCAgICAgICAgICB0b2tlbi5kZWYgPSBkaXJzLnRleHRcblx0ICAgICAgICAgIHRva2VuLmRlc2NyaXB0b3IgPSBkaXJQYXJzZXIucGFyc2UodmFsdWUpWzBdXG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlKVxuXHQgICAgfVxuXHQgICAgZnJhZy5hcHBlbmRDaGlsZChlbClcblx0ICB9XG5cdCAgcmV0dXJuIG1ha2VUZXh0Tm9kZUxpbmtGbih0b2tlbnMsIGZyYWcsIG9wdGlvbnMpXG5cdH1cblxuXHQvKipcblx0ICogQnVpbGQgYSBmdW5jdGlvbiB0aGF0IHByb2Nlc3NlcyBhIHRleHROb2RlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IHRva2Vuc1xuXHQgKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdcblx0ICovXG5cblx0ZnVuY3Rpb24gbWFrZVRleHROb2RlTGlua0ZuICh0b2tlbnMsIGZyYWcpIHtcblx0ICByZXR1cm4gZnVuY3Rpb24gdGV4dE5vZGVMaW5rRm4gKHZtLCBlbCkge1xuXHQgICAgdmFyIGZyYWdDbG9uZSA9IGZyYWcuY2xvbmVOb2RlKHRydWUpXG5cdCAgICB2YXIgY2hpbGROb2RlcyA9IF8udG9BcnJheShmcmFnQ2xvbmUuY2hpbGROb2Rlcylcblx0ICAgIHZhciB0b2tlbiwgdmFsdWUsIG5vZGVcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsID0gdG9rZW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgICB0b2tlbiA9IHRva2Vuc1tpXVxuXHQgICAgICB2YWx1ZSA9IHRva2VuLnZhbHVlXG5cdCAgICAgIGlmICh0b2tlbi50YWcpIHtcblx0ICAgICAgICBub2RlID0gY2hpbGROb2Rlc1tpXVxuXHQgICAgICAgIGlmICh0b2tlbi5vbmVUaW1lKSB7XG5cdCAgICAgICAgICB2YWx1ZSA9IHZtLiRldmFsKHZhbHVlKVxuXHQgICAgICAgICAgaWYgKHRva2VuLmh0bWwpIHtcblx0ICAgICAgICAgICAgXy5yZXBsYWNlKG5vZGUsIHRlbXBsYXRlUGFyc2VyLnBhcnNlKHZhbHVlLCB0cnVlKSlcblx0ICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIG5vZGUubm9kZVZhbHVlID0gdmFsdWVcblx0ICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgdm0uX2JpbmREaXIodG9rZW4udHlwZSwgbm9kZSxcblx0ICAgICAgICAgICAgICAgICAgICAgIHRva2VuLmRlc2NyaXB0b3IsIHRva2VuLmRlZilcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIF8ucmVwbGFjZShlbCwgZnJhZ0Nsb25lKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb21waWxlIGEgbm9kZSBsaXN0IGFuZCByZXR1cm4gYSBjaGlsZExpbmtGbi5cblx0ICpcblx0ICogQHBhcmFtIHtOb2RlTGlzdH0gbm9kZUxpc3Rcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHJldHVybiB7RnVuY3Rpb258dW5kZWZpbmVkfVxuXHQgKi9cblxuXHRmdW5jdGlvbiBjb21waWxlTm9kZUxpc3QgKG5vZGVMaXN0LCBvcHRpb25zKSB7XG5cdCAgdmFyIGxpbmtGbnMgPSBbXVxuXHQgIHZhciBub2RlTGlua0ZuLCBjaGlsZExpbmtGbiwgbm9kZVxuXHQgIGZvciAodmFyIGkgPSAwLCBsID0gbm9kZUxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICBub2RlID0gbm9kZUxpc3RbaV1cblx0ICAgIG5vZGVMaW5rRm4gPSBjb21waWxlTm9kZShub2RlLCBvcHRpb25zKVxuXHQgICAgY2hpbGRMaW5rRm4gPVxuXHQgICAgICAoIW5vZGVMaW5rRm4gfHwgIW5vZGVMaW5rRm4udGVybWluYWwpICYmXG5cdCAgICAgIG5vZGUuaGFzQ2hpbGROb2RlcygpXG5cdCAgICAgICAgPyBjb21waWxlTm9kZUxpc3Qobm9kZS5jaGlsZE5vZGVzLCBvcHRpb25zKVxuXHQgICAgICAgIDogbnVsbFxuXHQgICAgbGlua0Zucy5wdXNoKG5vZGVMaW5rRm4sIGNoaWxkTGlua0ZuKVxuXHQgIH1cblx0ICByZXR1cm4gbGlua0Zucy5sZW5ndGhcblx0ICAgID8gbWFrZUNoaWxkTGlua0ZuKGxpbmtGbnMpXG5cdCAgICA6IG51bGxcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlIGEgY2hpbGQgbGluayBmdW5jdGlvbiBmb3IgYSBub2RlJ3MgY2hpbGROb2Rlcy5cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheTxGdW5jdGlvbj59IGxpbmtGbnNcblx0ICogQHJldHVybiB7RnVuY3Rpb259IGNoaWxkTGlua0ZuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIG1ha2VDaGlsZExpbmtGbiAobGlua0Zucykge1xuXHQgIHJldHVybiBmdW5jdGlvbiBjaGlsZExpbmtGbiAodm0sIG5vZGVzKSB7XG5cdCAgICAvLyBzdGFibGl6ZSBub2Rlc1xuXHQgICAgbm9kZXMgPSBfLnRvQXJyYXkobm9kZXMpXG5cdCAgICB2YXIgbm9kZSwgbm9kZUxpbmtGbiwgY2hpbGRyZW5MaW5rRm5cblx0ICAgIGZvciAodmFyIGkgPSAwLCBuID0gMCwgbCA9IGxpbmtGbnMubGVuZ3RoOyBpIDwgbDsgbisrKSB7XG5cdCAgICAgIG5vZGUgPSBub2Rlc1tuXVxuXHQgICAgICBub2RlTGlua0ZuID0gbGlua0Zuc1tpKytdXG5cdCAgICAgIGNoaWxkcmVuTGlua0ZuID0gbGlua0Zuc1tpKytdXG5cdCAgICAgIGlmIChub2RlTGlua0ZuKSB7XG5cdCAgICAgICAgbm9kZUxpbmtGbih2bSwgbm9kZSlcblx0ICAgICAgfVxuXHQgICAgICBpZiAoY2hpbGRyZW5MaW5rRm4pIHtcblx0ICAgICAgICBjaGlsZHJlbkxpbmtGbih2bSwgbm9kZS5jaGlsZE5vZGVzKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBpbGUgcGFyYW0gYXR0cmlidXRlcyBvbiBhIHJvb3QgZWxlbWVudCBhbmQgcmV0dXJuXG5cdCAqIGEgcGFyYW1BdHRyaWJ1dGVzIGxpbmsgZnVuY3Rpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtBcnJheX0gYXR0cnNcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHJldHVybiB7RnVuY3Rpb259IHBhcmFtc0xpbmtGblxuXHQgKi9cblxuXHRmdW5jdGlvbiBjb21waWxlUGFyYW1BdHRyaWJ1dGVzIChlbCwgYXR0cnMsIG9wdGlvbnMpIHtcblx0ICB2YXIgcGFyYW1zID0gW11cblx0ICB2YXIgaSA9IGF0dHJzLmxlbmd0aFxuXHQgIHZhciBuYW1lLCB2YWx1ZSwgcGFyYW1cblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICBuYW1lID0gYXR0cnNbaV1cblx0ICAgIHZhbHVlID0gZWwuZ2V0QXR0cmlidXRlKG5hbWUpXG5cdCAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcblx0ICAgICAgcGFyYW0gPSB7XG5cdCAgICAgICAgbmFtZTogbmFtZSxcblx0ICAgICAgICB2YWx1ZTogdmFsdWVcblx0ICAgICAgfVxuXHQgICAgICB2YXIgdG9rZW5zID0gdGV4dFBhcnNlci5wYXJzZSh2YWx1ZSlcblx0ICAgICAgaWYgKHRva2Vucykge1xuXHQgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKVxuXHQgICAgICAgIGlmICh0b2tlbnMubGVuZ3RoID4gMSkge1xuXHQgICAgICAgICAgXy53YXJuKFxuXHQgICAgICAgICAgICAnSW52YWxpZCBwYXJhbSBhdHRyaWJ1dGUgYmluZGluZzogXCInICtcblx0ICAgICAgICAgICAgbmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInICtcblx0ICAgICAgICAgICAgJ1xcbkRvblxcJ3QgbWl4IGJpbmRpbmcgdGFncyB3aXRoIHBsYWluIHRleHQgJyArXG5cdCAgICAgICAgICAgICdpbiBwYXJhbSBhdHRyaWJ1dGUgYmluZGluZ3MuJ1xuXHQgICAgICAgICAgKVxuXHQgICAgICAgICAgY29udGludWVcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgcGFyYW0uZHluYW1pYyA9IHRydWVcblx0ICAgICAgICAgIHBhcmFtLnZhbHVlID0gdG9rZW5zWzBdLnZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICAgIHBhcmFtcy5wdXNoKHBhcmFtKVxuXHQgICAgfVxuXHQgIH1cblx0ICByZXR1cm4gbWFrZVBhcmFtc0xpbmtGbihwYXJhbXMsIG9wdGlvbnMpXG5cdH1cblxuXHQvKipcblx0ICogQnVpbGQgYSBmdW5jdGlvbiB0aGF0IGFwcGxpZXMgcGFyYW0gYXR0cmlidXRlcyB0byBhIHZtLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXNcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHJldHVybiB7RnVuY3Rpb259IHBhcmFtc0xpbmtGblxuXHQgKi9cblxuXHRmdW5jdGlvbiBtYWtlUGFyYW1zTGlua0ZuIChwYXJhbXMsIG9wdGlvbnMpIHtcblx0ICB2YXIgZGVmID0gb3B0aW9ucy5kaXJlY3RpdmVzWyd3aXRoJ11cblx0ICByZXR1cm4gZnVuY3Rpb24gcGFyYW1zTGlua0ZuICh2bSwgZWwpIHtcblx0ICAgIHZhciBpID0gcGFyYW1zLmxlbmd0aFxuXHQgICAgdmFyIHBhcmFtXG5cdCAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgIHBhcmFtID0gcGFyYW1zW2ldXG5cdCAgICAgIGlmIChwYXJhbS5keW5hbWljKSB7XG5cdCAgICAgICAgLy8gZHluYW1pYyBwYXJhbSBhdHRyaWJ0dWVzIGFyZSBib3VuZCBhcyB2LXdpdGguXG5cdCAgICAgICAgLy8gd2UgY2FuIGRpcmVjdGx5IGR1Y2sgdGhlIGRlc2NyaXB0b3IgaGVyZSBiZWFjdXNlXG5cdCAgICAgICAgLy8gcGFyYW0gYXR0cmlidXRlcyBjYW5ub3QgdXNlIGV4cHJlc3Npb25zIG9yXG5cdCAgICAgICAgLy8gZmlsdGVycy5cblx0ICAgICAgICB2bS5fYmluZERpcignd2l0aCcsIGVsLCB7XG5cdCAgICAgICAgICBhcmc6IHBhcmFtLm5hbWUsXG5cdCAgICAgICAgICBleHByZXNzaW9uOiBwYXJhbS52YWx1ZVxuXHQgICAgICAgIH0sIGRlZilcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAvLyBqdXN0IHNldCBvbmNlXG5cdCAgICAgICAgdm0uJHNldChwYXJhbS5uYW1lLCBwYXJhbS52YWx1ZSlcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayBhbiBlbGVtZW50IGZvciB0ZXJtaW5hbCBkaXJlY3RpdmVzIGluIGZpeGVkIG9yZGVyLlxuXHQgKiBJZiBpdCBmaW5kcyBvbmUsIHJldHVybiBhIHRlcm1pbmFsIGxpbmsgZnVuY3Rpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHJldHVybiB7RnVuY3Rpb259IHRlcm1pbmFsTGlua0ZuXG5cdCAqL1xuXG5cdHZhciB0ZXJtaW5hbERpcmVjdGl2ZXMgPSBbXG5cdCAgJ3JlcGVhdCcsXG5cdCAgJ2lmJyxcblx0ICAnY29tcG9uZW50J1xuXHRdXG5cblx0ZnVuY3Rpb24gc2tpcCAoKSB7fVxuXHRza2lwLnRlcm1pbmFsID0gdHJ1ZVxuXG5cdGZ1bmN0aW9uIGNoZWNrVGVybWluYWxEaXJlY3RpdmVzIChlbCwgb3B0aW9ucykge1xuXHQgIGlmIChfLmF0dHIoZWwsICdwcmUnKSAhPT0gbnVsbCkge1xuXHQgICAgcmV0dXJuIHNraXBcblx0ICB9XG5cdCAgdmFyIHZhbHVlLCBkaXJOYW1lXG5cdCAgLyoganNoaW50IGJvc3M6IHRydWUgKi9cblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXHQgICAgZGlyTmFtZSA9IHRlcm1pbmFsRGlyZWN0aXZlc1tpXVxuXHQgICAgaWYgKHZhbHVlID0gXy5hdHRyKGVsLCBkaXJOYW1lKSkge1xuXHQgICAgICByZXR1cm4gbWFrZVRlcmltaW5hbExpbmtGbihlbCwgZGlyTmFtZSwgdmFsdWUsIG9wdGlvbnMpXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIGEgbGluayBmdW5jdGlvbiBmb3IgYSB0ZXJtaW5hbCBkaXJlY3RpdmUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRpck5hbWVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufSB0ZXJtaW5hbExpbmtGblxuXHQgKi9cblxuXHRmdW5jdGlvbiBtYWtlVGVyaW1pbmFsTGlua0ZuIChlbCwgZGlyTmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcblx0ICB2YXIgZGVzY3JpcHRvciA9IGRpclBhcnNlci5wYXJzZSh2YWx1ZSlbMF1cblx0ICB2YXIgZGVmID0gb3B0aW9ucy5kaXJlY3RpdmVzW2Rpck5hbWVdXG5cdCAgLy8gc3BlY2lhbCBjYXNlOiB3ZSBuZWVkIHRvIGNvbGxlY3QgZGlyZWN0aXZlcyBmb3VuZFxuXHQgIC8vIG9uIGEgY29tcG9uZW50IHJvb3Qgbm9kZSwgYnV0IGRlZmluZWQgaW4gdGhlIHBhcmVudFxuXHQgIC8vIHRlbXBsYXRlLiBUaGVzZSBkaXJlY3RpdmVzIG5lZWQgdG8gYmUgY29tcGlsZWQgaW5cblx0ICAvLyB0aGUgcGFyZW50IHNjb3BlLlxuXHQgIGlmIChkaXJOYW1lID09PSAnY29tcG9uZW50Jykge1xuXHQgICAgdmFyIGRpcnMgPSBjb2xsZWN0RGlyZWN0aXZlcyhlbCwgb3B0aW9ucywgdHJ1ZSlcblx0ICAgIGVsLl9wYXJlbnRMaW5rZXIgPSBkaXJzLmxlbmd0aFxuXHQgICAgICA/IG1ha2VEaXJlY3RpdmVzTGlua0ZuKGRpcnMpXG5cdCAgICAgIDogbnVsbFxuXHQgIH1cblx0ICB2YXIgdGVybWluYWxMaW5rRm4gPSBmdW5jdGlvbiAodm0sIGVsKSB7XG5cdCAgICB2bS5fYmluZERpcihkaXJOYW1lLCBlbCwgZGVzY3JpcHRvciwgZGVmKVxuXHQgIH1cblx0ICB0ZXJtaW5hbExpbmtGbi50ZXJtaW5hbCA9IHRydWVcblx0ICByZXR1cm4gdGVybWluYWxMaW5rRm5cblx0fVxuXG5cdC8qKlxuXHQgKiBDb2xsZWN0IHRoZSBkaXJlY3RpdmVzIG9uIGFuIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHBhcmFtIHtCb29sZWFufSBhc1BhcmVudFxuXHQgKiBAcmV0dXJuIHtBcnJheX1cblx0ICovXG5cblx0ZnVuY3Rpb24gY29sbGVjdERpcmVjdGl2ZXMgKGVsLCBvcHRpb25zLCBhc1BhcmVudCkge1xuXHQgIHZhciBhdHRycyA9IF8udG9BcnJheShlbC5hdHRyaWJ1dGVzKVxuXHQgIHZhciBpID0gYXR0cnMubGVuZ3RoXG5cdCAgdmFyIGRpcnMgPSBbXVxuXHQgIHZhciBhdHRyLCBhdHRyTmFtZSwgZGlyLCBkaXJOYW1lLCBkaXJEZWZcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICBhdHRyID0gYXR0cnNbaV1cblx0ICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lXG5cdCAgICBpZiAoYXR0ck5hbWUuaW5kZXhPZihjb25maWcucHJlZml4KSA9PT0gMCkge1xuXHQgICAgICBkaXJOYW1lID0gYXR0ck5hbWUuc2xpY2UoY29uZmlnLnByZWZpeC5sZW5ndGgpXG5cdCAgICAgIGlmIChcblx0ICAgICAgICBhc1BhcmVudCAmJlxuXHQgICAgICAgIChkaXJOYW1lID09PSAnd2l0aCcgfHwgZGlyTmFtZSA9PT0gJ3JlZicpXG5cdCAgICAgICkge1xuXHQgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgIH1cblx0ICAgICAgZGlyRGVmID0gb3B0aW9ucy5kaXJlY3RpdmVzW2Rpck5hbWVdXG5cdCAgICAgIF8uYXNzZXJ0QXNzZXQoZGlyRGVmLCAnZGlyZWN0aXZlJywgZGlyTmFtZSlcblx0ICAgICAgaWYgKGRpckRlZikge1xuXHQgICAgICAgIGRpcnMucHVzaCh7XG5cdCAgICAgICAgICBuYW1lOiBkaXJOYW1lLFxuXHQgICAgICAgICAgZGVzY3JpcHRvcnM6IGRpclBhcnNlci5wYXJzZShhdHRyLnZhbHVlKSxcblx0ICAgICAgICAgIGRlZjogZGlyRGVmXG5cdCAgICAgICAgfSlcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIGlmIChjb25maWcuaW50ZXJwb2xhdGUpIHtcblx0ICAgICAgZGlyID0gY29sbGVjdEF0dHJEaXJlY3RpdmUoZWwsIGF0dHJOYW1lLCBhdHRyLnZhbHVlLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zKVxuXHQgICAgICBpZiAoZGlyKSB7XG5cdCAgICAgICAgZGlycy5wdXNoKGRpcilcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0ICAvLyBzb3J0IGJ5IHByaW9yaXR5LCBMT1cgdG8gSElHSFxuXHQgIGRpcnMuc29ydChkaXJlY3RpdmVDb21wYXJhdG9yKVxuXHQgIHJldHVybiBkaXJzXG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgYW4gYXR0cmlidXRlIGZvciBwb3RlbnRpYWwgZHluYW1pYyBiaW5kaW5ncyxcblx0ICogYW5kIHJldHVybiBhIGRpcmVjdGl2ZSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqIEByZXR1cm4ge09iamVjdH1cblx0ICovXG5cblx0ZnVuY3Rpb24gY29sbGVjdEF0dHJEaXJlY3RpdmUgKGVsLCBuYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuXHQgIHZhciB0b2tlbnMgPSB0ZXh0UGFyc2VyLnBhcnNlKHZhbHVlKVxuXHQgIGlmICh0b2tlbnMpIHtcblx0ICAgIHZhciBkZWYgPSBvcHRpb25zLmRpcmVjdGl2ZXMuYXR0clxuXHQgICAgdmFyIGkgPSB0b2tlbnMubGVuZ3RoXG5cdCAgICB2YXIgYWxsT25lVGltZSA9IHRydWVcblx0ICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cdCAgICAgIGlmICh0b2tlbi50YWcgJiYgIXRva2VuLm9uZVRpbWUpIHtcblx0ICAgICAgICBhbGxPbmVUaW1lID0gZmFsc2Vcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHtcblx0ICAgICAgZGVmOiBkZWYsXG5cdCAgICAgIF9saW5rOiBhbGxPbmVUaW1lXG5cdCAgICAgICAgPyBmdW5jdGlvbiAodm0sIGVsKSB7XG5cdCAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2bS4kaW50ZXJwb2xhdGUodmFsdWUpKVxuXHQgICAgICAgICAgfVxuXHQgICAgICAgIDogZnVuY3Rpb24gKHZtLCBlbCkge1xuXHQgICAgICAgICAgICB2YXIgdmFsdWUgPSB0ZXh0UGFyc2VyLnRva2Vuc1RvRXhwKHRva2Vucywgdm0pXG5cdCAgICAgICAgICAgIHZhciBkZXNjID0gZGlyUGFyc2VyLnBhcnNlKG5hbWUgKyAnOicgKyB2YWx1ZSlbMF1cblx0ICAgICAgICAgICAgdm0uX2JpbmREaXIoJ2F0dHInLCBlbCwgZGVzYywgZGVmKVxuXHQgICAgICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBEaXJlY3RpdmUgcHJpb3JpdHkgc29ydCBjb21wYXJhdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBhXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBiXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGRpcmVjdGl2ZUNvbXBhcmF0b3IgKGEsIGIpIHtcblx0ICBhID0gYS5kZWYucHJpb3JpdHkgfHwgMFxuXHQgIGIgPSBiLmRlZi5wcmlvcml0eSB8fCAwXG5cdCAgcmV0dXJuIGEgPiBiID8gMSA6IC0xXG5cdH1cblxuLyoqKi8gfSxcbi8qIDQ0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblxuXHR2YXIgaGFuZGxlcnMgPSB7XG5cdCAgdGV4dDogX193ZWJwYWNrX3JlcXVpcmVfXyg1NSksXG5cdCAgcmFkaW86IF9fd2VicGFja19yZXF1aXJlX18oNTYpLFxuXHQgIHNlbGVjdDogX193ZWJwYWNrX3JlcXVpcmVfXyg1NyksXG5cdCAgY2hlY2tib3g6IF9fd2VicGFja19yZXF1aXJlX18oNTgpXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIHByaW9yaXR5OiA4MDAsXG5cdCAgdHdvV2F5OiB0cnVlLFxuXHQgIGhhbmRsZXJzOiBoYW5kbGVycyxcblxuXHQgIC8qKlxuXHQgICAqIFBvc3NpYmxlIGVsZW1lbnRzOlxuXHQgICAqICAgPHNlbGVjdD5cblx0ICAgKiAgIDx0ZXh0YXJlYT5cblx0ICAgKiAgIDxpbnB1dCB0eXBlPVwiKlwiPlxuXHQgICAqICAgICAtIHRleHRcblx0ICAgKiAgICAgLSBjaGVja2JveFxuXHQgICAqICAgICAtIHJhZGlvXG5cdCAgICogICAgIC0gbnVtYmVyXG5cdCAgICogICAgIC0gVE9ETzogbW9yZSB0eXBlcyBtYXkgYmUgc3VwcGxpZWQgYXMgYSBwbHVnaW5cblx0ICAgKi9cblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBlbCA9IHRoaXMuZWxcblx0ICAgIHZhciB0YWcgPSBlbC50YWdOYW1lXG5cdCAgICB2YXIgaGFuZGxlclxuXHQgICAgaWYgKHRhZyA9PT0gJ0lOUFVUJykge1xuXHQgICAgICBoYW5kbGVyID0gaGFuZGxlcnNbZWwudHlwZV0gfHwgaGFuZGxlcnMudGV4dFxuXHQgICAgfSBlbHNlIGlmICh0YWcgPT09ICdTRUxFQ1QnKSB7XG5cdCAgICAgIGhhbmRsZXIgPSBoYW5kbGVycy5zZWxlY3Rcblx0ICAgIH0gZWxzZSBpZiAodGFnID09PSAnVEVYVEFSRUEnKSB7XG5cdCAgICAgIGhhbmRsZXIgPSBoYW5kbGVycy50ZXh0XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBfLndhcm4oXCJ2LW1vZGVsIGRvZXNuJ3Qgc3VwcG9ydCBlbGVtZW50IHR5cGU6IFwiICsgdGFnKVxuXHQgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIGhhbmRsZXIuYmluZC5jYWxsKHRoaXMpXG5cdCAgICB0aGlzLnVwZGF0ZSA9IGhhbmRsZXIudXBkYXRlXG5cdCAgICB0aGlzLnVuYmluZCA9IGhhbmRsZXIudW5iaW5kXG5cdCAgfVxuXG5cdH1cblxuLyoqKi8gfSxcbi8qIDQ1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGNvbmZpZyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG5cdHZhciBXYXRjaGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNilcblx0dmFyIHRleHRQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5KVxuXHR2YXIgZXhwUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MSlcblxuXHQvKipcblx0ICogQSBkaXJlY3RpdmUgbGlua3MgYSBET00gZWxlbWVudCB3aXRoIGEgcGllY2Ugb2YgZGF0YSxcblx0ICogd2hpY2ggaXMgdGhlIHJlc3VsdCBvZiBldmFsdWF0aW5nIGFuIGV4cHJlc3Npb24uXG5cdCAqIEl0IHJlZ2lzdGVycyBhIHdhdGNoZXIgd2l0aCB0aGUgZXhwcmVzc2lvbiBhbmQgY2FsbHNcblx0ICogdGhlIERPTSB1cGRhdGUgZnVuY3Rpb24gd2hlbiBhIGNoYW5nZSBpcyB0cmlnZ2VyZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG5cdCAqIEBwYXJhbSB7Tm9kZX0gZWxcblx0ICogQHBhcmFtIHtWdWV9IHZtXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkZXNjcmlwdG9yXG5cdCAqICAgICAgICAgICAgICAgICAtIHtTdHJpbmd9IGV4cHJlc3Npb25cblx0ICogICAgICAgICAgICAgICAgIC0ge1N0cmluZ30gW2FyZ11cblx0ICogICAgICAgICAgICAgICAgIC0ge0FycmF5PE9iamVjdD59IFtmaWx0ZXJzXVxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGVmIC0gZGlyZWN0aXZlIGRlZmluaXRpb24gb2JqZWN0XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtsaW5rZXJdIC0gcHJlLWNvbXBpbGVkIGxpbmtlciBmdW5jdGlvblxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cblx0ZnVuY3Rpb24gRGlyZWN0aXZlIChuYW1lLCBlbCwgdm0sIGRlc2NyaXB0b3IsIGRlZiwgbGlua2VyKSB7XG5cdCAgLy8gcHVibGljXG5cdCAgdGhpcy5uYW1lID0gbmFtZVxuXHQgIHRoaXMuZWwgPSBlbFxuXHQgIHRoaXMudm0gPSB2bVxuXHQgIC8vIGNvcHkgZGVzY3JpcHRvciBwcm9wc1xuXHQgIHRoaXMucmF3ID0gZGVzY3JpcHRvci5yYXdcblx0ICB0aGlzLmV4cHJlc3Npb24gPSBkZXNjcmlwdG9yLmV4cHJlc3Npb25cblx0ICB0aGlzLmFyZyA9IGRlc2NyaXB0b3IuYXJnXG5cdCAgdGhpcy5maWx0ZXJzID0gXy5yZXNvbHZlRmlsdGVycyh2bSwgZGVzY3JpcHRvci5maWx0ZXJzKVxuXHQgIC8vIHByaXZhdGVcblx0ICB0aGlzLl9saW5rZXIgPSBsaW5rZXJcblx0ICB0aGlzLl9sb2NrZWQgPSBmYWxzZVxuXHQgIHRoaXMuX2JvdW5kID0gZmFsc2Vcblx0ICAvLyBpbml0XG5cdCAgdGhpcy5fYmluZChkZWYpXG5cdH1cblxuXHR2YXIgcCA9IERpcmVjdGl2ZS5wcm90b3R5cGVcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgZGlyZWN0aXZlLCBtaXhpbiBkZWZpbml0aW9uIHByb3BlcnRpZXMsXG5cdCAqIHNldHVwIHRoZSB3YXRjaGVyLCBjYWxsIGRlZmluaXRpb24gYmluZCgpIGFuZCB1cGRhdGUoKVxuXHQgKiBpZiBwcmVzZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGVmXG5cdCAqL1xuXG5cdHAuX2JpbmQgPSBmdW5jdGlvbiAoZGVmKSB7XG5cdCAgaWYgKHRoaXMubmFtZSAhPT0gJ2Nsb2FrJyAmJiB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSkge1xuXHQgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoY29uZmlnLnByZWZpeCArIHRoaXMubmFtZSlcblx0ICB9XG5cdCAgaWYgKHR5cGVvZiBkZWYgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgIHRoaXMudXBkYXRlID0gZGVmXG5cdCAgfSBlbHNlIHtcblx0ICAgIF8uZXh0ZW5kKHRoaXMsIGRlZilcblx0ICB9XG5cdCAgdGhpcy5fd2F0Y2hlckV4cCA9IHRoaXMuZXhwcmVzc2lvblxuXHQgIHRoaXMuX2NoZWNrRHluYW1pY0xpdGVyYWwoKVxuXHQgIGlmICh0aGlzLmJpbmQpIHtcblx0ICAgIHRoaXMuYmluZCgpXG5cdCAgfVxuXHQgIGlmIChcblx0ICAgIHRoaXMudXBkYXRlICYmIHRoaXMuX3dhdGNoZXJFeHAgJiZcblx0ICAgICghdGhpcy5pc0xpdGVyYWwgfHwgdGhpcy5faXNEeW5hbWljTGl0ZXJhbCkgJiZcblx0ICAgICF0aGlzLl9jaGVja1N0YXRlbWVudCgpXG5cdCAgKSB7XG5cdCAgICAvLyB1c2UgcmF3IGV4cHJlc3Npb24gYXMgaWRlbnRpZmllciBiZWNhdXNlIGZpbHRlcnNcblx0ICAgIC8vIG1ha2UgdGhlbSBkaWZmZXJlbnQgd2F0Y2hlcnNcblx0ICAgIHZhciB3YXRjaGVyID0gdGhpcy52bS5fd2F0Y2hlcnNbdGhpcy5yYXddXG5cdCAgICAvLyB3cmFwcGVkIHVwZGF0ZXIgZm9yIGNvbnRleHRcblx0ICAgIHZhciBkaXIgPSB0aGlzXG5cdCAgICB2YXIgdXBkYXRlID0gdGhpcy5fdXBkYXRlID0gZnVuY3Rpb24gKHZhbCwgb2xkVmFsKSB7XG5cdCAgICAgIGlmICghZGlyLl9sb2NrZWQpIHtcblx0ICAgICAgICBkaXIudXBkYXRlKHZhbCwgb2xkVmFsKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICBpZiAoIXdhdGNoZXIpIHtcblx0ICAgICAgd2F0Y2hlciA9IHRoaXMudm0uX3dhdGNoZXJzW3RoaXMucmF3XSA9IG5ldyBXYXRjaGVyKFxuXHQgICAgICAgIHRoaXMudm0sXG5cdCAgICAgICAgdGhpcy5fd2F0Y2hlckV4cCxcblx0ICAgICAgICB1cGRhdGUsIC8vIGNhbGxiYWNrXG5cdCAgICAgICAgdGhpcy5maWx0ZXJzLFxuXHQgICAgICAgIHRoaXMudHdvV2F5IC8vIG5lZWQgc2V0dGVyXG5cdCAgICAgIClcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHdhdGNoZXIuYWRkQ2IodXBkYXRlKVxuXHQgICAgfVxuXHQgICAgdGhpcy5fd2F0Y2hlciA9IHdhdGNoZXJcblx0ICAgIGlmICh0aGlzLl9pbml0VmFsdWUgIT0gbnVsbCkge1xuXHQgICAgICB3YXRjaGVyLnNldCh0aGlzLl9pbml0VmFsdWUpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLnVwZGF0ZSh3YXRjaGVyLnZhbHVlKVxuXHQgICAgfVxuXHQgIH1cblx0ICB0aGlzLl9ib3VuZCA9IHRydWVcblx0fVxuXG5cdC8qKlxuXHQgKiBjaGVjayBpZiB0aGlzIGlzIGEgZHluYW1pYyBsaXRlcmFsIGJpbmRpbmcuXG5cdCAqXG5cdCAqIGUuZy4gdi1jb21wb25lbnQ9XCJ7e2N1cnJlbnRWaWV3fX1cIlxuXHQgKi9cblxuXHRwLl9jaGVja0R5bmFtaWNMaXRlcmFsID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBleHByZXNzaW9uID0gdGhpcy5leHByZXNzaW9uXG5cdCAgaWYgKGV4cHJlc3Npb24gJiYgdGhpcy5pc0xpdGVyYWwpIHtcblx0ICAgIHZhciB0b2tlbnMgPSB0ZXh0UGFyc2VyLnBhcnNlKGV4cHJlc3Npb24pXG5cdCAgICBpZiAodG9rZW5zKSB7XG5cdCAgICAgIHZhciBleHAgPSB0ZXh0UGFyc2VyLnRva2Vuc1RvRXhwKHRva2Vucylcblx0ICAgICAgdGhpcy5leHByZXNzaW9uID0gdGhpcy52bS4kZ2V0KGV4cClcblx0ICAgICAgdGhpcy5fd2F0Y2hlckV4cCA9IGV4cFxuXHQgICAgICB0aGlzLl9pc0R5bmFtaWNMaXRlcmFsID0gdHJ1ZVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayBpZiB0aGUgZGlyZWN0aXZlIGlzIGEgZnVuY3Rpb24gY2FsbGVyXG5cdCAqIGFuZCBpZiB0aGUgZXhwcmVzc2lvbiBpcyBhIGNhbGxhYmxlIG9uZS4gSWYgYm90aCB0cnVlLFxuXHQgKiB3ZSB3cmFwIHVwIHRoZSBleHByZXNzaW9uIGFuZCB1c2UgaXQgYXMgdGhlIGV2ZW50XG5cdCAqIGhhbmRsZXIuXG5cdCAqXG5cdCAqIGUuZy4gdi1vbj1cImNsaWNrOiBhKytcIlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblxuXHRwLl9jaGVja1N0YXRlbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0ICB2YXIgZXhwcmVzc2lvbiA9IHRoaXMuZXhwcmVzc2lvblxuXHQgIGlmIChcblx0ICAgIGV4cHJlc3Npb24gJiYgdGhpcy5hY2NlcHRTdGF0ZW1lbnQgJiZcblx0ICAgICFleHBQYXJzZXIucGF0aFRlc3RSRS50ZXN0KGV4cHJlc3Npb24pXG5cdCAgKSB7XG5cdCAgICB2YXIgZm4gPSBleHBQYXJzZXIucGFyc2UoZXhwcmVzc2lvbikuZ2V0XG5cdCAgICB2YXIgdm0gPSB0aGlzLnZtXG5cdCAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgZm4uY2FsbCh2bSwgdm0pXG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5maWx0ZXJzKSB7XG5cdCAgICAgIGhhbmRsZXIgPSBfLmFwcGx5RmlsdGVycyhcblx0ICAgICAgICBoYW5kbGVyLFxuXHQgICAgICAgIHRoaXMuZmlsdGVycy5yZWFkLFxuXHQgICAgICAgIHZtXG5cdCAgICAgIClcblx0ICAgIH1cblx0ICAgIHRoaXMudXBkYXRlKGhhbmRsZXIpXG5cdCAgICByZXR1cm4gdHJ1ZVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBUZWFyZG93biB0aGUgd2F0Y2hlciBhbmQgY2FsbCB1bmJpbmQuXG5cdCAqL1xuXG5cdHAuX3RlYXJkb3duID0gZnVuY3Rpb24gKCkge1xuXHQgIGlmICh0aGlzLl9ib3VuZCkge1xuXHQgICAgaWYgKHRoaXMudW5iaW5kKSB7XG5cdCAgICAgIHRoaXMudW5iaW5kKClcblx0ICAgIH1cblx0ICAgIHZhciB3YXRjaGVyID0gdGhpcy5fd2F0Y2hlclxuXHQgICAgaWYgKHdhdGNoZXIgJiYgd2F0Y2hlci5hY3RpdmUpIHtcblx0ICAgICAgd2F0Y2hlci5yZW1vdmVDYih0aGlzLl91cGRhdGUpXG5cdCAgICAgIGlmICghd2F0Y2hlci5hY3RpdmUpIHtcblx0ICAgICAgICB0aGlzLnZtLl93YXRjaGVyc1t0aGlzLnJhd10gPSBudWxsXG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIHRoaXMuX2JvdW5kID0gZmFsc2Vcblx0ICAgIHRoaXMudm0gPSB0aGlzLmVsID0gdGhpcy5fd2F0Y2hlciA9IG51bGxcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIHdpdGggdGhlIHNldHRlci5cblx0ICogVGhpcyBzaG91bGQgb25seSBiZSB1c2VkIGluIHR3by13YXkgZGlyZWN0aXZlc1xuXHQgKiBlLmcuIHYtbW9kZWwuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcblx0ICogQHBhcmFtIHtCb29sZWFufSBsb2NrIC0gcHJldmVudCB3cnRpZSB0cmlnZ2VyaW5nIHVwZGF0ZS5cblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHRwLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSwgbG9jaykge1xuXHQgIGlmICh0aGlzLnR3b1dheSkge1xuXHQgICAgaWYgKGxvY2spIHtcblx0ICAgICAgdGhpcy5fbG9ja2VkID0gdHJ1ZVxuXHQgICAgfVxuXHQgICAgdGhpcy5fd2F0Y2hlci5zZXQodmFsdWUpXG5cdCAgICBpZiAobG9jaykge1xuXHQgICAgICB2YXIgc2VsZiA9IHRoaXNcblx0ICAgICAgXy5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgc2VsZi5fbG9ja2VkID0gZmFsc2UgICAgICAgIFxuXHQgICAgICB9KVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gRGlyZWN0aXZlXG5cbi8qKiovIH0sXG4vKiA0NiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciB0ZW1wbGF0ZVBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNTApXG5cblx0LyoqXG5cdCAqIFByb2Nlc3MgYW4gZWxlbWVudCBvciBhIERvY3VtZW50RnJhZ21lbnQgYmFzZWQgb24gYVxuXHQgKiBpbnN0YW5jZSBvcHRpb24gb2JqZWN0LiBUaGlzIGFsbG93cyB1cyB0byB0cmFuc2NsdWRlXG5cdCAqIGEgdGVtcGxhdGUgbm9kZS9mcmFnbWVudCBiZWZvcmUgdGhlIGluc3RhbmNlIGlzIGNyZWF0ZWQsXG5cdCAqIHNvIHRoZSBwcm9jZXNzZWQgZnJhZ21lbnQgY2FuIHRoZW4gYmUgY2xvbmVkIGFuZCByZXVzZWRcblx0ICogaW4gdi1yZXBlYXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0ICogQHJldHVybiB7RWxlbWVudHxEb2N1bWVudEZyYWdtZW50fVxuXHQgKi9cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zY2x1ZGUgKGVsLCBvcHRpb25zKSB7XG5cdCAgLy8gZm9yIHRlbXBsYXRlIHRhZ3MsIHdoYXQgd2Ugd2FudCBpcyBpdHMgY29udGVudCBhc1xuXHQgIC8vIGEgZG9jdW1lbnRGcmFnbWVudCAoZm9yIGJsb2NrIGluc3RhbmNlcylcblx0ICBpZiAoZWwudGFnTmFtZSA9PT0gJ1RFTVBMQVRFJykge1xuXHQgICAgZWwgPSB0ZW1wbGF0ZVBhcnNlci5wYXJzZShlbClcblx0ICB9XG5cdCAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy50ZW1wbGF0ZSkge1xuXHQgICAgZWwgPSB0cmFuc2NsdWRlVGVtcGxhdGUoZWwsIG9wdGlvbnMpXG5cdCAgfVxuXHQgIGlmIChlbCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcblx0ICAgIF8ucHJlcGVuZChkb2N1bWVudC5jcmVhdGVDb21tZW50KCd2LXN0YXJ0JyksIGVsKVxuXHQgICAgZWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgndi1lbmQnKSlcblx0ICB9XG5cdCAgcmV0dXJuIGVsXG5cdH1cblxuXHQvKipcblx0ICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgb3B0aW9uLlxuXHQgKiBJZiB0aGUgcmVwbGFjZSBvcHRpb24gaXMgdHJ1ZSB0aGlzIHdpbGwgc3dhcCB0aGUgJGVsLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqIEByZXR1cm4ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH1cblx0ICovXG5cblx0ZnVuY3Rpb24gdHJhbnNjbHVkZVRlbXBsYXRlIChlbCwgb3B0aW9ucykge1xuXHQgIHZhciB0ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGVcblx0ICB2YXIgZnJhZyA9IHRlbXBsYXRlUGFyc2VyLnBhcnNlKHRlbXBsYXRlLCB0cnVlKVxuXHQgIGlmICghZnJhZykge1xuXHQgICAgXy53YXJuKCdJbnZhbGlkIHRlbXBsYXRlIG9wdGlvbjogJyArIHRlbXBsYXRlKVxuXHQgIH0gZWxzZSB7XG5cdCAgICBjb2xsZWN0UmF3Q29udGVudChlbClcblx0ICAgIGlmIChvcHRpb25zLnJlcGxhY2UpIHtcblx0ICAgICAgaWYgKGZyYWcuY2hpbGROb2Rlcy5sZW5ndGggPiAxKSB7XG5cdCAgICAgICAgdHJhbnNjbHVkZUNvbnRlbnQoZnJhZylcblx0ICAgICAgICByZXR1cm4gZnJhZ1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHZhciByZXBsYWNlciA9IGZyYWcuZmlyc3RDaGlsZFxuXHQgICAgICAgIF8uY29weUF0dHJpYnV0ZXMoZWwsIHJlcGxhY2VyKVxuXHQgICAgICAgIHRyYW5zY2x1ZGVDb250ZW50KHJlcGxhY2VyKVxuXHQgICAgICAgIHJldHVybiByZXBsYWNlclxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBlbC5hcHBlbmRDaGlsZChmcmFnKVxuXHQgICAgICB0cmFuc2NsdWRlQ29udGVudChlbClcblx0ICAgICAgcmV0dXJuIGVsXG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbGxlY3QgcmF3IGNvbnRlbnQgaW5zaWRlICRlbCBiZWZvcmUgdGhleSBhcmVcblx0ICogcmVwbGFjZWQgYnkgdGVtcGxhdGUgY29udGVudC5cblx0ICovXG5cblx0dmFyIHJhd0NvbnRlbnRcblx0ZnVuY3Rpb24gY29sbGVjdFJhd0NvbnRlbnQgKGVsKSB7XG5cdCAgdmFyIGNoaWxkXG5cdCAgcmF3Q29udGVudCA9IG51bGxcblx0ICBpZiAoZWwuaGFzQ2hpbGROb2RlcygpKSB7XG5cdCAgICByYXdDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0ICAgIC8qIGpzaGludCBib3NzOnRydWUgKi9cblx0ICAgIHdoaWxlIChjaGlsZCA9IGVsLmZpcnN0Q2hpbGQpIHtcblx0ICAgICAgcmF3Q29udGVudC5hcHBlbmRDaGlsZChjaGlsZClcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogUmVzb2x2ZSA8Y29udGVudD4gaW5zZXJ0aW9uIHBvaW50cyBtaW1pY2tpbmcgdGhlIGJlaGF2aW9yXG5cdCAqIG9mIHRoZSBTaGFkb3cgRE9NIHNwZWM6XG5cdCAqXG5cdCAqICAgaHR0cDovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL3NoYWRvdy8jaW5zZXJ0aW9uLXBvaW50c1xuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gZWxcblx0ICovXG5cblx0ZnVuY3Rpb24gdHJhbnNjbHVkZUNvbnRlbnQgKGVsKSB7XG5cdCAgdmFyIG91dGxldHMgPSBnZXRPdXRsZXRzKGVsKVxuXHQgIHZhciBpID0gb3V0bGV0cy5sZW5ndGhcblx0ICBpZiAoIWkpIHJldHVyblxuXHQgIHZhciBvdXRsZXQsIHNlbGVjdCwgaiwgbWFpblxuXHQgIC8vIGZpcnN0IHBhc3MsIGNvbGxlY3QgY29ycmVzcG9uZGluZyBjb250ZW50XG5cdCAgLy8gZm9yIGVhY2ggb3V0bGV0LlxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIG91dGxldCA9IG91dGxldHNbaV1cblx0ICAgIGlmIChyYXdDb250ZW50KSB7XG5cdCAgICAgIHNlbGVjdCA9IG91dGxldC5nZXRBdHRyaWJ1dGUoJ3NlbGVjdCcpXG5cdCAgICAgIGlmIChzZWxlY3QpIHsgIC8vIHNlbGVjdCBjb250ZW50XG5cdCAgICAgICAgb3V0bGV0LmNvbnRlbnQgPSBfLnRvQXJyYXkoXG5cdCAgICAgICAgICByYXdDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0KVxuXHQgICAgICAgIClcblx0ICAgICAgfSBlbHNlIHsgLy8gZGVmYXVsdCBjb250ZW50XG5cdCAgICAgICAgbWFpbiA9IG91dGxldFxuXHQgICAgICB9XG5cdCAgICB9IGVsc2UgeyAvLyBmYWxsYmFjayBjb250ZW50XG5cdCAgICAgIG91dGxldC5jb250ZW50ID0gXy50b0FycmF5KG91dGxldC5jaGlsZE5vZGVzKVxuXHQgICAgfVxuXHQgIH1cblx0ICAvLyBzZWNvbmQgcGFzcywgYWN0dWFsbHkgaW5zZXJ0IHRoZSBjb250ZW50c1xuXHQgIGZvciAoaSA9IDAsIGogPSBvdXRsZXRzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHQgICAgb3V0bGV0ID0gb3V0bGV0c1tpXVxuXHQgICAgaWYgKG91dGxldCAhPT0gbWFpbikge1xuXHQgICAgICBpbnNlcnRDb250ZW50QXQob3V0bGV0LCBvdXRsZXQuY29udGVudClcblx0ICAgIH1cblx0ICB9XG5cdCAgLy8gZmluYWxseSBpbnNlcnQgdGhlIG1haW4gY29udGVudFxuXHQgIGlmIChtYWluKSB7XG5cdCAgICBpbnNlcnRDb250ZW50QXQobWFpbiwgXy50b0FycmF5KHJhd0NvbnRlbnQuY2hpbGROb2RlcykpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCA8Y29udGVudD4gb3V0bGV0cyBmcm9tIHRoZSBlbGVtZW50L2xpc3Rcblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fEFycmF5fSBlbFxuXHQgKiBAcmV0dXJuIHtBcnJheX1cblx0ICovXG5cblx0dmFyIGNvbmNhdCA9IFtdLmNvbmNhdFxuXHRmdW5jdGlvbiBnZXRPdXRsZXRzIChlbCkge1xuXHQgIHJldHVybiBfLmlzQXJyYXkoZWwpXG5cdCAgICA/IGNvbmNhdC5hcHBseShbXSwgZWwubWFwKGdldE91dGxldHMpKVxuXHQgICAgOiBlbC5xdWVyeVNlbGVjdG9yQWxsXG5cdCAgICAgID8gXy50b0FycmF5KGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvbnRlbnQnKSlcblx0ICAgICAgOiBbXVxuXHR9XG5cblx0LyoqXG5cdCAqIEluc2VydCBhbiBhcnJheSBvZiBub2RlcyBhdCBvdXRsZXQsXG5cdCAqIHRoZW4gcmVtb3ZlIHRoZSBvdXRsZXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gb3V0bGV0XG5cdCAqIEBwYXJhbSB7QXJyYXl9IGNvbnRlbnRzXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGluc2VydENvbnRlbnRBdCAob3V0bGV0LCBjb250ZW50cykge1xuXHQgIC8vIG5vdCB1c2luZyB1dGlsIERPTSBtZXRob2RzIGhlcmUgYmVjYXVzZVxuXHQgIC8vIHBhcmVudE5vZGUgY2FuIGJlIGNhY2hlZFxuXHQgIHZhciBwYXJlbnQgPSBvdXRsZXQucGFyZW50Tm9kZVxuXHQgIGZvciAodmFyIGkgPSAwLCBqID0gY29udGVudHMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdCAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNvbnRlbnRzW2ldLCBvdXRsZXQpXG5cdCAgfVxuXHQgIHBhcmVudC5yZW1vdmVDaGlsZChvdXRsZXQpXG5cdH1cblxuLyoqKi8gfSxcbi8qIDQ3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgdWlkID0gMFxuXG5cdC8qKlxuXHQgKiBBIGJpbmRpbmcgaXMgYW4gb2JzZXJ2YWJsZSB0aGF0IGNhbiBoYXZlIG11bHRpcGxlXG5cdCAqIGRpcmVjdGl2ZXMgc3Vic2NyaWJpbmcgdG8gaXQuXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblxuXHRmdW5jdGlvbiBCaW5kaW5nICgpIHtcblx0ICB0aGlzLmlkID0gKyt1aWRcblx0ICB0aGlzLnN1YnMgPSBbXVxuXHR9XG5cblx0dmFyIHAgPSBCaW5kaW5nLnByb3RvdHlwZVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBkaXJlY3RpdmUgc3Vic2NyaWJlci5cblx0ICpcblx0ICogQHBhcmFtIHtEaXJlY3RpdmV9IHN1YlxuXHQgKi9cblxuXHRwLmFkZFN1YiA9IGZ1bmN0aW9uIChzdWIpIHtcblx0ICB0aGlzLnN1YnMucHVzaChzdWIpXG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIGEgZGlyZWN0aXZlIHN1YnNjcmliZXIuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RGlyZWN0aXZlfSBzdWJcblx0ICovXG5cblx0cC5yZW1vdmVTdWIgPSBmdW5jdGlvbiAoc3ViKSB7XG5cdCAgaWYgKHRoaXMuc3Vicy5sZW5ndGgpIHtcblx0ICAgIHZhciBpID0gdGhpcy5zdWJzLmluZGV4T2Yoc3ViKVxuXHQgICAgaWYgKGkgPiAtMSkgdGhpcy5zdWJzLnNwbGljZShpLCAxKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBOb3RpZnkgYWxsIHN1YnNjcmliZXJzIG9mIGEgbmV3IHZhbHVlLlxuXHQgKi9cblxuXHRwLm5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcblx0ICB2YXIgaSA9IHRoaXMuc3Vicy5sZW5ndGhcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICB0aGlzLnN1YnNbaV0udXBkYXRlKClcblx0ICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IEJpbmRpbmdcblxuLyoqKi8gfSxcbi8qIDQ4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIGNvbmZpZyA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpXG5cdHZhciBCaW5kaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Nylcblx0dmFyIGFycmF5TWV0aG9kcyA9IF9fd2VicGFja19yZXF1aXJlX18oNTkpXG5cdHZhciBhcnJheUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcnJheU1ldGhvZHMpXG5cdF9fd2VicGFja19yZXF1aXJlX18oNjApXG5cblx0dmFyIHVpZCA9IDBcblxuXHQvKipcblx0ICogVHlwZSBlbnVtc1xuXHQgKi9cblxuXHR2YXIgQVJSQVkgID0gMFxuXHR2YXIgT0JKRUNUID0gMVxuXG5cdC8qKlxuXHQgKiBBdWdtZW50IGFuIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgaW50ZXJjZXB0aW5nXG5cdCAqIHRoZSBwcm90b3R5cGUgY2hhaW4gdXNpbmcgX19wcm90b19fXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSB0YXJnZXRcblx0ICogQHBhcmFtIHtPYmplY3R9IHByb3RvXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHByb3RvQXVnbWVudCAodGFyZ2V0LCBzcmMpIHtcblx0ICB0YXJnZXQuX19wcm90b19fID0gc3JjXG5cdH1cblxuXHQvKipcblx0ICogQXVnbWVudCBhbiB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGRlZmluaW5nXG5cdCAqIGhpZGRlbiBwcm9wZXJ0aWVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b1xuXHQgKi9cblxuXHRmdW5jdGlvbiBjb3B5QXVnbWVudCAodGFyZ2V0LCBzcmMsIGtleXMpIHtcblx0ICB2YXIgaSA9IGtleXMubGVuZ3RoXG5cdCAgdmFyIGtleVxuXHQgIHdoaWxlIChpLS0pIHtcblx0ICAgIGtleSA9IGtleXNbaV1cblx0ICAgIF8uZGVmaW5lKHRhcmdldCwga2V5LCBzcmNba2V5XSlcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogT2JzZXJ2ZXIgY2xhc3MgdGhhdCBhcmUgYXR0YWNoZWQgdG8gZWFjaCBvYnNlcnZlZFxuXHQgKiBvYmplY3QuIE9uY2UgYXR0YWNoZWQsIHRoZSBvYnNlcnZlciBjb252ZXJ0cyB0YXJnZXRcblx0ICogb2JqZWN0J3MgcHJvcGVydHkga2V5cyBpbnRvIGdldHRlci9zZXR0ZXJzIHRoYXRcblx0ICogY29sbGVjdCBkZXBlbmRlbmNpZXMgYW5kIGRpc3BhdGNoZXMgdXBkYXRlcy5cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheXxPYmplY3R9IHZhbHVlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblxuXHRmdW5jdGlvbiBPYnNlcnZlciAodmFsdWUsIHR5cGUpIHtcblx0ICB0aGlzLmlkID0gKyt1aWRcblx0ICB0aGlzLnZhbHVlID0gdmFsdWVcblx0ICB0aGlzLmFjdGl2ZSA9IHRydWVcblx0ICB0aGlzLmJpbmRpbmdzID0gW11cblx0ICBfLmRlZmluZSh2YWx1ZSwgJ19fb2JfXycsIHRoaXMpXG5cdCAgaWYgKHR5cGUgPT09IEFSUkFZKSB7XG5cdCAgICB2YXIgYXVnbWVudCA9IGNvbmZpZy5wcm90byAmJiBfLmhhc1Byb3RvXG5cdCAgICAgID8gcHJvdG9BdWdtZW50XG5cdCAgICAgIDogY29weUF1Z21lbnRcblx0ICAgIGF1Z21lbnQodmFsdWUsIGFycmF5TWV0aG9kcywgYXJyYXlLZXlzKVxuXHQgICAgdGhpcy5vYnNlcnZlQXJyYXkodmFsdWUpXG5cdCAgfSBlbHNlIGlmICh0eXBlID09PSBPQkpFQ1QpIHtcblx0ICAgIHRoaXMud2Fsayh2YWx1ZSlcblx0ICB9XG5cdH1cblxuXHRPYnNlcnZlci50YXJnZXQgPSBudWxsXG5cblx0dmFyIHAgPSBPYnNlcnZlci5wcm90b3R5cGVcblxuXHQvKipcblx0ICogQXR0ZW1wdCB0byBjcmVhdGUgYW4gb2JzZXJ2ZXIgaW5zdGFuY2UgZm9yIGEgdmFsdWUsXG5cdCAqIHJldHVybnMgdGhlIG5ldyBvYnNlcnZlciBpZiBzdWNjZXNzZnVsbHkgb2JzZXJ2ZWQsXG5cdCAqIG9yIHRoZSBleGlzdGluZyBvYnNlcnZlciBpZiB0aGUgdmFsdWUgYWxyZWFkeSBoYXMgb25lLlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAqIEByZXR1cm4ge09ic2VydmVyfHVuZGVmaW5lZH1cblx0ICogQHN0YXRpY1xuXHQgKi9cblxuXHRPYnNlcnZlci5jcmVhdGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICBpZiAoXG5cdCAgICB2YWx1ZSAmJlxuXHQgICAgdmFsdWUuaGFzT3duUHJvcGVydHkoJ19fb2JfXycpICYmXG5cdCAgICB2YWx1ZS5fX29iX18gaW5zdGFuY2VvZiBPYnNlcnZlclxuXHQgICkge1xuXHQgICAgcmV0dXJuIHZhbHVlLl9fb2JfX1xuXHQgIH0gZWxzZSBpZiAoXy5pc0FycmF5KHZhbHVlKSkge1xuXHQgICAgcmV0dXJuIG5ldyBPYnNlcnZlcih2YWx1ZSwgQVJSQVkpXG5cdCAgfSBlbHNlIGlmIChcblx0ICAgIF8uaXNQbGFpbk9iamVjdCh2YWx1ZSkgJiZcblx0ICAgICF2YWx1ZS5faXNWdWUgLy8gYXZvaWQgVnVlIGluc3RhbmNlXG5cdCAgKSB7XG5cdCAgICByZXR1cm4gbmV3IE9ic2VydmVyKHZhbHVlLCBPQkpFQ1QpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFdhbGsgdGhyb3VnaCBlYWNoIHByb3BlcnR5IGFuZCBjb252ZXJ0IHRoZW0gaW50b1xuXHQgKiBnZXR0ZXIvc2V0dGVycy4gVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIHdoZW5cblx0ICogdmFsdWUgdHlwZSBpcyBPYmplY3QuIFByb3BlcnRpZXMgcHJlZml4ZWQgd2l0aCBgJGAgb3IgYF9gXG5cdCAqIGFuZCBhY2Nlc3NvciBwcm9wZXJ0aWVzIGFyZSBpZ25vcmVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqXG5cdCAqL1xuXG5cdHAud2FsayA9IGZ1bmN0aW9uIChvYmopIHtcblx0ICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iailcblx0ICB2YXIgaSA9IGtleXMubGVuZ3RoXG5cdCAgdmFyIGtleSwgcHJlZml4XG5cdCAgd2hpbGUgKGktLSkge1xuXHQgICAga2V5ID0ga2V5c1tpXVxuXHQgICAgcHJlZml4ID0ga2V5LmNoYXJDb2RlQXQoMClcblx0ICAgIGlmIChwcmVmaXggIT09IDB4MjQgJiYgcHJlZml4ICE9PSAweDVGKSB7IC8vIHNraXAgJCBvciBfXG5cdCAgICAgIHRoaXMuY29udmVydChrZXksIG9ialtrZXldKVxuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBUcnkgdG8gY2FyZXRlIGFuIG9ic2VydmVyIGZvciBhIGNoaWxkIHZhbHVlLFxuXHQgKiBhbmQgaWYgdmFsdWUgaXMgYXJyYXksIGxpbmsgYmluZGluZyB0byB0aGUgYXJyYXkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gdmFsXG5cdCAqIEByZXR1cm4ge0JpbmRpbmd8dW5kZWZpbmVkfVxuXHQgKi9cblxuXHRwLm9ic2VydmUgPSBmdW5jdGlvbiAodmFsKSB7XG5cdCAgcmV0dXJuIE9ic2VydmVyLmNyZWF0ZSh2YWwpXG5cdH1cblxuXHQvKipcblx0ICogT2JzZXJ2ZSBhIGxpc3Qgb2YgQXJyYXkgaXRlbXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zXG5cdCAqL1xuXG5cdHAub2JzZXJ2ZUFycmF5ID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG5cdCAgdmFyIGkgPSBpdGVtcy5sZW5ndGhcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICB0aGlzLm9ic2VydmUoaXRlbXNbaV0pXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnQgYSBwcm9wZXJ0eSBpbnRvIGdldHRlci9zZXR0ZXIgc28gd2UgY2FuIGVtaXRcblx0ICogdGhlIGV2ZW50cyB3aGVuIHRoZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZC9jaGFuZ2VkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqIEBwYXJhbSB7Kn0gdmFsXG5cdCAqL1xuXG5cdHAuY29udmVydCA9IGZ1bmN0aW9uIChrZXksIHZhbCkge1xuXHQgIHZhciBvYiA9IHRoaXNcblx0ICB2YXIgY2hpbGRPYiA9IG9iLm9ic2VydmUodmFsKVxuXHQgIHZhciBiaW5kaW5nID0gbmV3IEJpbmRpbmcoKVxuXHQgIGlmIChjaGlsZE9iKSB7XG5cdCAgICBjaGlsZE9iLmJpbmRpbmdzLnB1c2goYmluZGluZylcblx0ICB9XG5cdCAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iLnZhbHVlLCBrZXksIHtcblx0ICAgIGVudW1lcmFibGU6IHRydWUsXG5cdCAgICBjb25maWd1cmFibGU6IHRydWUsXG5cdCAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgLy8gT2JzZXJ2ZXIudGFyZ2V0IGlzIGEgd2F0Y2hlciB3aG9zZSBnZXR0ZXIgaXNcblx0ICAgICAgLy8gY3VycmVudGx5IGJlaW5nIGV2YWx1YXRlZC5cblx0ICAgICAgaWYgKG9iLmFjdGl2ZSAmJiBPYnNlcnZlci50YXJnZXQpIHtcblx0ICAgICAgICBPYnNlcnZlci50YXJnZXQuYWRkRGVwKGJpbmRpbmcpXG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIHZhbFxuXHQgICAgfSxcblx0ICAgIHNldDogZnVuY3Rpb24gKG5ld1ZhbCkge1xuXHQgICAgICBpZiAobmV3VmFsID09PSB2YWwpIHJldHVyblxuXHQgICAgICAvLyByZW1vdmUgYmluZGluZyBmcm9tIG9sZCB2YWx1ZVxuXHQgICAgICB2YXIgb2xkQ2hpbGRPYiA9IHZhbCAmJiB2YWwuX19vYl9fXG5cdCAgICAgIGlmIChvbGRDaGlsZE9iKSB7XG5cdCAgICAgICAgdmFyIG9sZEJpbmRpbmdzID0gb2xkQ2hpbGRPYi5iaW5kaW5nc1xuXHQgICAgICAgIG9sZEJpbmRpbmdzLnNwbGljZShvbGRCaW5kaW5ncy5pbmRleE9mKGJpbmRpbmcpKVxuXHQgICAgICB9XG5cdCAgICAgIHZhbCA9IG5ld1ZhbFxuXHQgICAgICAvLyBhZGQgYmluZGluZyB0byBuZXcgdmFsdWVcblx0ICAgICAgdmFyIG5ld0NoaWxkT2IgPSBvYi5vYnNlcnZlKG5ld1ZhbClcblx0ICAgICAgaWYgKG5ld0NoaWxkT2IpIHtcblx0ICAgICAgICBuZXdDaGlsZE9iLmJpbmRpbmdzLnB1c2goYmluZGluZylcblx0ICAgICAgfVxuXHQgICAgICBiaW5kaW5nLm5vdGlmeSgpXG5cdCAgICB9XG5cdCAgfSlcblx0fVxuXG5cdC8qKlxuXHQgKiBOb3RpZnkgY2hhbmdlIG9uIGFsbCBzZWxmIGJpbmRpbmdzIG9uIGFuIG9ic2VydmVyLlxuXHQgKiBUaGlzIGlzIGNhbGxlZCB3aGVuIGEgbXV0YWJsZSB2YWx1ZSBtdXRhdGVzLiBlLmcuXG5cdCAqIHdoZW4gYW4gQXJyYXkncyBtdXRhdGluZyBtZXRob2RzIGFyZSBjYWxsZWQsIG9yIGFuXG5cdCAqIE9iamVjdCdzICRhZGQvJGRlbGV0ZSBhcmUgY2FsbGVkLlxuXHQgKi9cblxuXHRwLm5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcblx0ICB2YXIgYmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzXG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSBiaW5kaW5ncy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgIGJpbmRpbmdzW2ldLm5vdGlmeSgpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBhbiBvd25lciB2bSwgc28gdGhhdCB3aGVuICRhZGQvJGRlbGV0ZSBtdXRhdGlvbnNcblx0ICogaGFwcGVuIHdlIGNhbiBub3RpZnkgb3duZXIgdm1zIHRvIHByb3h5IHRoZSBrZXlzIGFuZFxuXHQgKiBkaWdlc3QgdGhlIHdhdGNoZXJzLiBUaGlzIGlzIG9ubHkgY2FsbGVkIHdoZW4gdGhlIG9iamVjdFxuXHQgKiBpcyBvYnNlcnZlZCBhcyBhbiBpbnN0YW5jZSdzIHJvb3QgJGRhdGEuXG5cdCAqXG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKi9cblxuXHRwLmFkZFZtID0gZnVuY3Rpb24gKHZtKSB7XG5cdCAgKHRoaXMudm1zID0gdGhpcy52bXMgfHwgW10pLnB1c2godm0pXG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIGFuIG93bmVyIHZtLiBUaGlzIGlzIGNhbGxlZCB3aGVuIHRoZSBvYmplY3QgaXNcblx0ICogc3dhcHBlZCBvdXQgYXMgYW4gaW5zdGFuY2UncyAkZGF0YSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7VnVlfSB2bVxuXHQgKi9cblxuXHRwLnJlbW92ZVZtID0gZnVuY3Rpb24gKHZtKSB7XG5cdCAgdGhpcy52bXMuc3BsaWNlKHRoaXMudm1zLmluZGV4T2Yodm0pLCAxKVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBPYnNlcnZlclxuXG4vKioqLyB9LFxuLyogNDkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdC8qKlxuXHQgKiBUaGUgQmF0Y2hlciBtYWludGFpbnMgYSBqb2IgcXVldWUgdG8gYmUgcnVuXG5cdCAqIGFzeW5jIG9uIHRoZSBuZXh0IGV2ZW50IGxvb3AuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIEJhdGNoZXIgKCkge1xuXHQgIHRoaXMucmVzZXQoKVxuXHR9XG5cblx0dmFyIHAgPSBCYXRjaGVyLnByb3RvdHlwZVxuXG5cdC8qKlxuXHQgKiBQdXNoIGEgam9iIGludG8gdGhlIGpvYiBxdWV1ZS5cblx0ICogSm9icyB3aXRoIGR1cGxpY2F0ZSBJRHMgd2lsbCBiZSBza2lwcGVkLCBob3dldmVyIHdlIGNhblxuXHQgKiB1c2UgdGhlIGBvdmVycmlkZWAgb3B0aW9uIHRvIG92ZXJyaWRlIGV4aXN0aW5nIGpvYnMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBqb2Jcblx0ICogICBwcm9wZXJ0aWVzOlxuXHQgKiAgIC0ge1N0cmluZ3xOdW1iZXJ9IGlkXG5cdCAqICAgLSB7Qm9vbGVhbn0gICAgICAgb3ZlcnJpZGVcblx0ICogICAtIHtGdW5jdGlvbn0gICAgICBydW5cblx0ICovXG5cblx0cC5wdXNoID0gZnVuY3Rpb24gKGpvYikge1xuXHQgIGlmICgham9iLmlkIHx8ICF0aGlzLmhhc1tqb2IuaWRdKSB7XG5cdCAgICB0aGlzLnF1ZXVlLnB1c2goam9iKVxuXHQgICAgdGhpcy5oYXNbam9iLmlkXSA9IGpvYlxuXHQgICAgaWYgKCF0aGlzLndhaXRpbmcpIHtcblx0ICAgICAgdGhpcy53YWl0aW5nID0gdHJ1ZVxuXHQgICAgICBfLm5leHRUaWNrKHRoaXMuZmx1c2gsIHRoaXMpXG5cdCAgICB9XG5cdCAgfSBlbHNlIGlmIChqb2Iub3ZlcnJpZGUpIHtcblx0ICAgIHZhciBvbGRKb2IgPSB0aGlzLmhhc1tqb2IuaWRdXG5cdCAgICBvbGRKb2IuY2FuY2VsbGVkID0gdHJ1ZVxuXHQgICAgdGhpcy5xdWV1ZS5wdXNoKGpvYilcblx0ICAgIHRoaXMuaGFzW2pvYi5pZF0gPSBqb2Jcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogRmx1c2ggdGhlIHF1ZXVlIGFuZCBydW4gdGhlIGpvYnMuXG5cdCAqIFdpbGwgY2FsbCBhIHByZUZsdXNoIGhvb2sgaWYgaGFzIG9uZS5cblx0ICovXG5cblx0cC5mbHVzaCA9IGZ1bmN0aW9uICgpIHtcblx0ICAvLyBkbyBub3QgY2FjaGUgbGVuZ3RoIGJlY2F1c2UgbW9yZSBqb2JzIG1pZ2h0IGJlIHB1c2hlZFxuXHQgIC8vIGFzIHdlIHJ1biBleGlzdGluZyBqb2JzXG5cdCAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXVlLmxlbmd0aDsgaSsrKSB7XG5cdCAgICB2YXIgam9iID0gdGhpcy5xdWV1ZVtpXVxuXHQgICAgaWYgKCFqb2IuY2FuY2VsbGVkKSB7XG5cdCAgICAgIGpvYi5ydW4oKVxuXHQgICAgfVxuXHQgIH1cblx0ICB0aGlzLnJlc2V0KClcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXNldCB0aGUgYmF0Y2hlcidzIHN0YXRlLlxuXHQgKi9cblxuXHRwLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuXHQgIHRoaXMuaGFzID0ge31cblx0ICB0aGlzLnF1ZXVlID0gW11cblx0ICB0aGlzLndhaXRpbmcgPSBmYWxzZVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBCYXRjaGVyXG5cbi8qKiovIH0sXG4vKiA1MCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIENhY2hlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Milcblx0dmFyIHRlbXBsYXRlQ2FjaGUgPSBuZXcgQ2FjaGUoMTAwKVxuXG5cdC8qKlxuXHQgKiBUZXN0IGZvciB0aGUgcHJlc2VuY2Ugb2YgdGhlIFNhZmFyaSB0ZW1wbGF0ZSBjbG9uaW5nIGJ1Z1xuXHQgKiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM3NzU1XG5cdCAqL1xuXG5cdHZhciBoYXNCcm9rZW5UZW1wbGF0ZSA9IChmdW5jdGlvbiAoKSB7XG5cdCAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHQgIGEuaW5uZXJIVE1MID0gJzx0ZW1wbGF0ZT4xPC90ZW1wbGF0ZT4nXG5cdCAgcmV0dXJuICFhLmNsb25lTm9kZSh0cnVlKS5maXJzdENoaWxkLmlubmVySFRNTFxuXHR9KSgpXG5cblx0dmFyIG1hcCA9IHtcblx0ICBfZGVmYXVsdCA6IFswLCAnJywgJyddLFxuXHQgIGxlZ2VuZCAgIDogWzEsICc8ZmllbGRzZXQ+JywgJzwvZmllbGRzZXQ+J10sXG5cdCAgdHIgICAgICAgOiBbMiwgJzx0YWJsZT48dGJvZHk+JywgJzwvdGJvZHk+PC90YWJsZT4nXSxcblx0ICBjb2wgICAgICA6IFtcblx0ICAgIDIsXG5cdCAgICAnPHRhYmxlPjx0Ym9keT48L3Rib2R5Pjxjb2xncm91cD4nLFxuXHQgICAgJzwvY29sZ3JvdXA+PC90YWJsZT4nXG5cdCAgXVxuXHR9XG5cblx0bWFwLnRkID1cblx0bWFwLnRoID0gW1xuXHQgIDMsXG5cdCAgJzx0YWJsZT48dGJvZHk+PHRyPicsXG5cdCAgJzwvdHI+PC90Ym9keT48L3RhYmxlPidcblx0XVxuXG5cdG1hcC5vcHRpb24gPVxuXHRtYXAub3B0Z3JvdXAgPSBbXG5cdCAgMSxcblx0ICAnPHNlbGVjdCBtdWx0aXBsZT1cIm11bHRpcGxlXCI+Jyxcblx0ICAnPC9zZWxlY3Q+J1xuXHRdXG5cblx0bWFwLnRoZWFkID1cblx0bWFwLnRib2R5ID1cblx0bWFwLmNvbGdyb3VwID1cblx0bWFwLmNhcHRpb24gPVxuXHRtYXAudGZvb3QgPSBbMSwgJzx0YWJsZT4nLCAnPC90YWJsZT4nXVxuXG5cdG1hcC5nID1cblx0bWFwLmRlZnMgPVxuXHRtYXAuc3ltYm9sID1cblx0bWFwLnVzZSA9XG5cdG1hcC5pbWFnZSA9XG5cdG1hcC50ZXh0ID1cblx0bWFwLmNpcmNsZSA9XG5cdG1hcC5lbGxpcHNlID1cblx0bWFwLmxpbmUgPVxuXHRtYXAucGF0aCA9XG5cdG1hcC5wb2x5Z29uID1cblx0bWFwLnBvbHlsaW5lID1cblx0bWFwLnJlY3QgPSBbXG5cdCAgMSxcblx0ICAnPHN2ZyAnICtcblx0ICAgICd4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgJyArXG5cdCAgICAneG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgJyArXG5cdCAgICAneG1sbnM6ZXY9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHNcIicgK1xuXHQgICAgJ3ZlcnNpb249XCIxLjFcIj4nLFxuXHQgICc8L3N2Zz4nXG5cdF1cblxuXHR2YXIgVEFHX1JFID0gLzwoW1xcdzpdKykvXG5cblx0LyoqXG5cdCAqIENvbnZlcnQgYSBzdHJpbmcgdGVtcGxhdGUgdG8gYSBEb2N1bWVudEZyYWdtZW50LlxuXHQgKiBEZXRlcm1pbmVzIGNvcnJlY3Qgd3JhcHBpbmcgYnkgdGFnIHR5cGVzLiBXcmFwcGluZ1xuXHQgKiBzdHJhdGVneSBmb3VuZCBpbiBqUXVlcnkgJiBjb21wb25lbnQvZG9taWZ5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdGVtcGxhdGVTdHJpbmdcblx0ICogQHJldHVybiB7RG9jdW1lbnRGcmFnbWVudH1cblx0ICovXG5cblx0ZnVuY3Rpb24gc3RyaW5nVG9GcmFnbWVudCAodGVtcGxhdGVTdHJpbmcpIHtcblx0ICAvLyB0cnkgYSBjYWNoZSBoaXQgZmlyc3Rcblx0ICB2YXIgaGl0ID0gdGVtcGxhdGVDYWNoZS5nZXQodGVtcGxhdGVTdHJpbmcpXG5cdCAgaWYgKGhpdCkge1xuXHQgICAgcmV0dXJuIGhpdFxuXHQgIH1cblxuXHQgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG5cdCAgdmFyIHRhZ01hdGNoID0gVEFHX1JFLmV4ZWModGVtcGxhdGVTdHJpbmcpXG5cblx0ICBpZiAoIXRhZ01hdGNoKSB7XG5cdCAgICAvLyB0ZXh0IG9ubHksIHJldHVybiBhIHNpbmdsZSB0ZXh0IG5vZGUuXG5cdCAgICBmcmFnLmFwcGVuZENoaWxkKFxuXHQgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZW1wbGF0ZVN0cmluZylcblx0ICAgIClcblx0ICB9IGVsc2Uge1xuXG5cdCAgICB2YXIgdGFnICAgID0gdGFnTWF0Y2hbMV1cblx0ICAgIHZhciB3cmFwICAgPSBtYXBbdGFnXSB8fCBtYXAuX2RlZmF1bHRcblx0ICAgIHZhciBkZXB0aCAgPSB3cmFwWzBdXG5cdCAgICB2YXIgcHJlZml4ID0gd3JhcFsxXVxuXHQgICAgdmFyIHN1ZmZpeCA9IHdyYXBbMl1cblx0ICAgIHZhciBub2RlICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG5cdCAgICBub2RlLmlubmVySFRNTCA9IHByZWZpeCArIHRlbXBsYXRlU3RyaW5nLnRyaW0oKSArIHN1ZmZpeFxuXHQgICAgd2hpbGUgKGRlcHRoLS0pIHtcblx0ICAgICAgbm9kZSA9IG5vZGUubGFzdENoaWxkXG5cdCAgICB9XG5cblx0ICAgIHZhciBjaGlsZFxuXHQgICAgLyoganNoaW50IGJvc3M6dHJ1ZSAqL1xuXHQgICAgd2hpbGUgKGNoaWxkID0gbm9kZS5maXJzdENoaWxkKSB7XG5cdCAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoY2hpbGQpXG5cdCAgICB9XG5cdCAgfVxuXG5cdCAgdGVtcGxhdGVDYWNoZS5wdXQodGVtcGxhdGVTdHJpbmcsIGZyYWcpXG5cdCAgcmV0dXJuIGZyYWdcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0IGEgdGVtcGxhdGUgbm9kZSB0byBhIERvY3VtZW50RnJhZ21lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuXHQgKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fVxuXHQgKi9cblxuXHRmdW5jdGlvbiBub2RlVG9GcmFnbWVudCAobm9kZSkge1xuXHQgIHZhciB0YWcgPSBub2RlLnRhZ05hbWVcblx0ICAvLyBpZiBpdHMgYSB0ZW1wbGF0ZSB0YWcgYW5kIHRoZSBicm93c2VyIHN1cHBvcnRzIGl0LFxuXHQgIC8vIGl0cyBjb250ZW50IGlzIGFscmVhZHkgYSBkb2N1bWVudCBmcmFnbWVudC5cblx0ICBpZiAoXG5cdCAgICB0YWcgPT09ICdURU1QTEFURScgJiZcblx0ICAgIG5vZGUuY29udGVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnRcblx0ICApIHtcblx0ICAgIHJldHVybiBub2RlLmNvbnRlbnRcblx0ICB9XG5cdCAgcmV0dXJuIHRhZyA9PT0gJ1NDUklQVCdcblx0ICAgID8gc3RyaW5nVG9GcmFnbWVudChub2RlLnRleHRDb250ZW50KVxuXHQgICAgOiBzdHJpbmdUb0ZyYWdtZW50KG5vZGUuaW5uZXJIVE1MKVxuXHR9XG5cblx0LyoqXG5cdCAqIERlYWwgd2l0aCBTYWZhcmkgY2xvbmluZyBuZXN0ZWQgPHRlbXBsYXRlPiBidWcgYnlcblx0ICogbWFudWFsbHkgY2xvbmluZyBhbGwgdGVtcGxhdGUgaW5zdGFuY2VzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gbm9kZVxuXHQgKiBAcmV0dXJuIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9XG5cdCAqL1xuXG5cdGV4cG9ydHMuY2xvbmUgPSBmdW5jdGlvbiAobm9kZSkge1xuXHQgIHZhciByZXMgPSBub2RlLmNsb25lTm9kZSh0cnVlKVxuXHQgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuXHQgIGlmIChoYXNCcm9rZW5UZW1wbGF0ZSkge1xuXHQgICAgdmFyIHRlbXBsYXRlcyA9IG5vZGUucXVlcnlTZWxlY3RvckFsbCgndGVtcGxhdGUnKVxuXHQgICAgaWYgKHRlbXBsYXRlcy5sZW5ndGgpIHtcblx0ICAgICAgdmFyIGNsb25lZCA9IHJlcy5xdWVyeVNlbGVjdG9yQWxsKCd0ZW1wbGF0ZScpXG5cdCAgICAgIHZhciBpID0gY2xvbmVkLmxlbmd0aFxuXHQgICAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgICAgY2xvbmVkW2ldLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKFxuXHQgICAgICAgICAgdGVtcGxhdGVzW2ldLmNsb25lTm9kZSh0cnVlKSxcblx0ICAgICAgICAgIGNsb25lZFtpXVxuXHQgICAgICAgIClcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0ICByZXR1cm4gcmVzXG5cdH1cblxuXHQvKipcblx0ICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgb3B0aW9uIGFuZCBub3JtYWxpemVzIGl0IGludG8gYVxuXHQgKiBhIERvY3VtZW50RnJhZ21lbnQgdGhhdCBjYW4gYmUgdXNlZCBhcyBhIHBhcnRpYWwgb3IgYVxuXHQgKiBpbnN0YW5jZSB0ZW1wbGF0ZS5cblx0ICpcblx0ICogQHBhcmFtIHsqfSB0ZW1wbGF0ZVxuXHQgKiAgICBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTpcblx0ICogICAgLSBEb2N1bWVudEZyYWdtZW50IG9iamVjdFxuXHQgKiAgICAtIE5vZGUgb2JqZWN0IG9mIHR5cGUgVGVtcGxhdGVcblx0ICogICAgLSBpZCBzZWxlY3RvcjogJyNzb21lLXRlbXBsYXRlLWlkJ1xuXHQgKiAgICAtIHRlbXBsYXRlIHN0cmluZzogJzxkaXY+PHNwYW4+e3ttc2d9fTwvc3Bhbj48L2Rpdj4nXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gY2xvbmVcblx0ICogQHJldHVybiB7RG9jdW1lbnRGcmFnbWVudHx1bmRlZmluZWR9XG5cdCAqL1xuXG5cdGV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAodGVtcGxhdGUsIGNsb25lKSB7XG5cdCAgdmFyIG5vZGUsIGZyYWdcblxuXHQgIC8vIGlmIHRoZSB0ZW1wbGF0ZSBpcyBhbHJlYWR5IGEgZG9jdW1lbnQgZnJhZ21lbnQsXG5cdCAgLy8gZG8gbm90aGluZ1xuXHQgIGlmICh0ZW1wbGF0ZSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcblx0ICAgIHJldHVybiBjbG9uZVxuXHQgICAgICA/IHRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKVxuXHQgICAgICA6IHRlbXBsYXRlXG5cdCAgfVxuXG5cdCAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcblx0ICAgIC8vIGlkIHNlbGVjdG9yXG5cdCAgICBpZiAodGVtcGxhdGUuY2hhckF0KDApID09PSAnIycpIHtcblx0ICAgICAgLy8gaWQgc2VsZWN0b3IgY2FuIGJlIGNhY2hlZCB0b29cblx0ICAgICAgZnJhZyA9IHRlbXBsYXRlQ2FjaGUuZ2V0KHRlbXBsYXRlKVxuXHQgICAgICBpZiAoIWZyYWcpIHtcblx0ICAgICAgICBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGUuc2xpY2UoMSkpXG5cdCAgICAgICAgaWYgKG5vZGUpIHtcblx0ICAgICAgICAgIGZyYWcgPSBub2RlVG9GcmFnbWVudChub2RlKVxuXHQgICAgICAgICAgLy8gc2F2ZSBzZWxlY3RvciB0byBjYWNoZVxuXHQgICAgICAgICAgdGVtcGxhdGVDYWNoZS5wdXQodGVtcGxhdGUsIGZyYWcpXG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAvLyBub3JtYWwgc3RyaW5nIHRlbXBsYXRlXG5cdCAgICAgIGZyYWcgPSBzdHJpbmdUb0ZyYWdtZW50KHRlbXBsYXRlKVxuXHQgICAgfVxuXHQgIH0gZWxzZSBpZiAodGVtcGxhdGUubm9kZVR5cGUpIHtcblx0ICAgIC8vIGEgZGlyZWN0IG5vZGVcblx0ICAgIGZyYWcgPSBub2RlVG9GcmFnbWVudCh0ZW1wbGF0ZSlcblx0ICB9XG5cblx0ICByZXR1cm4gZnJhZyAmJiBjbG9uZVxuXHQgICAgPyBleHBvcnRzLmNsb25lKGZyYWcpXG5cdCAgICA6IGZyYWdcblx0fVxuXG4vKioqLyB9LFxuLyogNTEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgQ2FjaGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUyKVxuXHR2YXIgcGF0aENhY2hlID0gbmV3IENhY2hlKDEwMDApXG5cdHZhciBpZGVudFJFID0gL15bJF9hLXpBLVpdK1tcXHckXSokL1xuXG5cdC8qKlxuXHQgKiBQYXRoLXBhcnNpbmcgYWxnb3JpdGhtIHNjb29wZWQgZnJvbSBQb2x5bWVyL29ic2VydmUtanNcblx0ICovXG5cblx0dmFyIHBhdGhTdGF0ZU1hY2hpbmUgPSB7XG5cdCAgJ2JlZm9yZVBhdGgnOiB7XG5cdCAgICAnd3MnOiBbJ2JlZm9yZVBhdGgnXSxcblx0ICAgICdpZGVudCc6IFsnaW5JZGVudCcsICdhcHBlbmQnXSxcblx0ICAgICdbJzogWydiZWZvcmVFbGVtZW50J10sXG5cdCAgICAnZW9mJzogWydhZnRlclBhdGgnXVxuXHQgIH0sXG5cblx0ICAnaW5QYXRoJzoge1xuXHQgICAgJ3dzJzogWydpblBhdGgnXSxcblx0ICAgICcuJzogWydiZWZvcmVJZGVudCddLFxuXHQgICAgJ1snOiBbJ2JlZm9yZUVsZW1lbnQnXSxcblx0ICAgICdlb2YnOiBbJ2FmdGVyUGF0aCddXG5cdCAgfSxcblxuXHQgICdiZWZvcmVJZGVudCc6IHtcblx0ICAgICd3cyc6IFsnYmVmb3JlSWRlbnQnXSxcblx0ICAgICdpZGVudCc6IFsnaW5JZGVudCcsICdhcHBlbmQnXVxuXHQgIH0sXG5cblx0ICAnaW5JZGVudCc6IHtcblx0ICAgICdpZGVudCc6IFsnaW5JZGVudCcsICdhcHBlbmQnXSxcblx0ICAgICcwJzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuXHQgICAgJ251bWJlcic6IFsnaW5JZGVudCcsICdhcHBlbmQnXSxcblx0ICAgICd3cyc6IFsnaW5QYXRoJywgJ3B1c2gnXSxcblx0ICAgICcuJzogWydiZWZvcmVJZGVudCcsICdwdXNoJ10sXG5cdCAgICAnWyc6IFsnYmVmb3JlRWxlbWVudCcsICdwdXNoJ10sXG5cdCAgICAnZW9mJzogWydhZnRlclBhdGgnLCAncHVzaCddXG5cdCAgfSxcblxuXHQgICdiZWZvcmVFbGVtZW50Jzoge1xuXHQgICAgJ3dzJzogWydiZWZvcmVFbGVtZW50J10sXG5cdCAgICAnMCc6IFsnYWZ0ZXJaZXJvJywgJ2FwcGVuZCddLFxuXHQgICAgJ251bWJlcic6IFsnaW5JbmRleCcsICdhcHBlbmQnXSxcblx0ICAgIFwiJ1wiOiBbJ2luU2luZ2xlUXVvdGUnLCAnYXBwZW5kJywgJyddLFxuXHQgICAgJ1wiJzogWydpbkRvdWJsZVF1b3RlJywgJ2FwcGVuZCcsICcnXVxuXHQgIH0sXG5cblx0ICAnYWZ0ZXJaZXJvJzoge1xuXHQgICAgJ3dzJzogWydhZnRlckVsZW1lbnQnLCAncHVzaCddLFxuXHQgICAgJ10nOiBbJ2luUGF0aCcsICdwdXNoJ11cblx0ICB9LFxuXG5cdCAgJ2luSW5kZXgnOiB7XG5cdCAgICAnMCc6IFsnaW5JbmRleCcsICdhcHBlbmQnXSxcblx0ICAgICdudW1iZXInOiBbJ2luSW5kZXgnLCAnYXBwZW5kJ10sXG5cdCAgICAnd3MnOiBbJ2FmdGVyRWxlbWVudCddLFxuXHQgICAgJ10nOiBbJ2luUGF0aCcsICdwdXNoJ11cblx0ICB9LFxuXG5cdCAgJ2luU2luZ2xlUXVvdGUnOiB7XG5cdCAgICBcIidcIjogWydhZnRlckVsZW1lbnQnXSxcblx0ICAgICdlb2YnOiAnZXJyb3InLFxuXHQgICAgJ2Vsc2UnOiBbJ2luU2luZ2xlUXVvdGUnLCAnYXBwZW5kJ11cblx0ICB9LFxuXG5cdCAgJ2luRG91YmxlUXVvdGUnOiB7XG5cdCAgICAnXCInOiBbJ2FmdGVyRWxlbWVudCddLFxuXHQgICAgJ2VvZic6ICdlcnJvcicsXG5cdCAgICAnZWxzZSc6IFsnaW5Eb3VibGVRdW90ZScsICdhcHBlbmQnXVxuXHQgIH0sXG5cblx0ICAnYWZ0ZXJFbGVtZW50Jzoge1xuXHQgICAgJ3dzJzogWydhZnRlckVsZW1lbnQnXSxcblx0ICAgICddJzogWydpblBhdGgnLCAncHVzaCddXG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gbm9vcCAoKSB7fVxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmUgdGhlIHR5cGUgb2YgYSBjaGFyYWN0ZXIgaW4gYSBrZXlwYXRoLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0NoYXJ9IGNoYXJcblx0ICogQHJldHVybiB7U3RyaW5nfSB0eXBlXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGdldFBhdGhDaGFyVHlwZSAoY2hhcikge1xuXHQgIGlmIChjaGFyID09PSB1bmRlZmluZWQpIHtcblx0ICAgIHJldHVybiAnZW9mJ1xuXHQgIH1cblxuXHQgIHZhciBjb2RlID0gY2hhci5jaGFyQ29kZUF0KDApXG5cblx0ICBzd2l0Y2goY29kZSkge1xuXHQgICAgY2FzZSAweDVCOiAvLyBbXG5cdCAgICBjYXNlIDB4NUQ6IC8vIF1cblx0ICAgIGNhc2UgMHgyRTogLy8gLlxuXHQgICAgY2FzZSAweDIyOiAvLyBcIlxuXHQgICAgY2FzZSAweDI3OiAvLyAnXG5cdCAgICBjYXNlIDB4MzA6IC8vIDBcblx0ICAgICAgcmV0dXJuIGNoYXJcblxuXHQgICAgY2FzZSAweDVGOiAvLyBfXG5cdCAgICBjYXNlIDB4MjQ6IC8vICRcblx0ICAgICAgcmV0dXJuICdpZGVudCdcblxuXHQgICAgY2FzZSAweDIwOiAvLyBTcGFjZVxuXHQgICAgY2FzZSAweDA5OiAvLyBUYWJcblx0ICAgIGNhc2UgMHgwQTogLy8gTmV3bGluZVxuXHQgICAgY2FzZSAweDBEOiAvLyBSZXR1cm5cblx0ICAgIGNhc2UgMHhBMDogIC8vIE5vLWJyZWFrIHNwYWNlXG5cdCAgICBjYXNlIDB4RkVGRjogIC8vIEJ5dGUgT3JkZXIgTWFya1xuXHQgICAgY2FzZSAweDIwMjg6ICAvLyBMaW5lIFNlcGFyYXRvclxuXHQgICAgY2FzZSAweDIwMjk6ICAvLyBQYXJhZ3JhcGggU2VwYXJhdG9yXG5cdCAgICAgIHJldHVybiAnd3MnXG5cdCAgfVxuXG5cdCAgLy8gYS16LCBBLVpcblx0ICBpZiAoKDB4NjEgPD0gY29kZSAmJiBjb2RlIDw9IDB4N0EpIHx8XG5cdCAgICAgICgweDQxIDw9IGNvZGUgJiYgY29kZSA8PSAweDVBKSkge1xuXHQgICAgcmV0dXJuICdpZGVudCdcblx0ICB9XG5cblx0ICAvLyAxLTlcblx0ICBpZiAoMHgzMSA8PSBjb2RlICYmIGNvZGUgPD0gMHgzOSkge1xuXHQgICAgcmV0dXJuICdudW1iZXInXG5cdCAgfVxuXG5cdCAgcmV0dXJuICdlbHNlJ1xuXHR9XG5cblx0LyoqXG5cdCAqIFBhcnNlIGEgc3RyaW5nIHBhdGggaW50byBhbiBhcnJheSBvZiBzZWdtZW50c1xuXHQgKiBUb2RvIGltcGxlbWVudCBjYWNoZVxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuXHQgKiBAcmV0dXJuIHtBcnJheXx1bmRlZmluZWR9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHBhcnNlUGF0aCAocGF0aCkge1xuXHQgIHZhciBrZXlzID0gW11cblx0ICB2YXIgaW5kZXggPSAtMVxuXHQgIHZhciBtb2RlID0gJ2JlZm9yZVBhdGgnXG5cdCAgdmFyIGMsIG5ld0NoYXIsIGtleSwgdHlwZSwgdHJhbnNpdGlvbiwgYWN0aW9uLCB0eXBlTWFwXG5cblx0ICB2YXIgYWN0aW9ucyA9IHtcblx0ICAgIHB1c2g6IGZ1bmN0aW9uKCkge1xuXHQgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICByZXR1cm5cblx0ICAgICAgfVxuXHQgICAgICBrZXlzLnB1c2goa2V5KVxuXHQgICAgICBrZXkgPSB1bmRlZmluZWRcblx0ICAgIH0sXG5cdCAgICBhcHBlbmQ6IGZ1bmN0aW9uKCkge1xuXHQgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICBrZXkgPSBuZXdDaGFyXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAga2V5ICs9IG5ld0NoYXJcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblxuXHQgIGZ1bmN0aW9uIG1heWJlVW5lc2NhcGVRdW90ZSAoKSB7XG5cdCAgICB2YXIgbmV4dENoYXIgPSBwYXRoW2luZGV4ICsgMV1cblx0ICAgIGlmICgobW9kZSA9PT0gJ2luU2luZ2xlUXVvdGUnICYmIG5leHRDaGFyID09PSBcIidcIikgfHxcblx0ICAgICAgICAobW9kZSA9PT0gJ2luRG91YmxlUXVvdGUnICYmIG5leHRDaGFyID09PSAnXCInKSkge1xuXHQgICAgICBpbmRleCsrXG5cdCAgICAgIG5ld0NoYXIgPSBuZXh0Q2hhclxuXHQgICAgICBhY3Rpb25zLmFwcGVuZCgpXG5cdCAgICAgIHJldHVybiB0cnVlXG5cdCAgICB9XG5cdCAgfVxuXG5cdCAgd2hpbGUgKG1vZGUpIHtcblx0ICAgIGluZGV4Kytcblx0ICAgIGMgPSBwYXRoW2luZGV4XVxuXG5cdCAgICBpZiAoYyA9PT0gJ1xcXFwnICYmIG1heWJlVW5lc2NhcGVRdW90ZSgpKSB7XG5cdCAgICAgIGNvbnRpbnVlXG5cdCAgICB9XG5cblx0ICAgIHR5cGUgPSBnZXRQYXRoQ2hhclR5cGUoYylcblx0ICAgIHR5cGVNYXAgPSBwYXRoU3RhdGVNYWNoaW5lW21vZGVdXG5cdCAgICB0cmFuc2l0aW9uID0gdHlwZU1hcFt0eXBlXSB8fCB0eXBlTWFwWydlbHNlJ10gfHwgJ2Vycm9yJ1xuXG5cdCAgICBpZiAodHJhbnNpdGlvbiA9PT0gJ2Vycm9yJykge1xuXHQgICAgICByZXR1cm4gLy8gcGFyc2UgZXJyb3Jcblx0ICAgIH1cblxuXHQgICAgbW9kZSA9IHRyYW5zaXRpb25bMF1cblx0ICAgIGFjdGlvbiA9IGFjdGlvbnNbdHJhbnNpdGlvblsxXV0gfHwgbm9vcFxuXHQgICAgbmV3Q2hhciA9IHRyYW5zaXRpb25bMl0gPT09IHVuZGVmaW5lZFxuXHQgICAgICA/IGNcblx0ICAgICAgOiB0cmFuc2l0aW9uWzJdXG5cdCAgICBhY3Rpb24oKVxuXG5cdCAgICBpZiAobW9kZSA9PT0gJ2FmdGVyUGF0aCcpIHtcblx0ICAgICAgcmV0dXJuIGtleXNcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogRm9ybWF0IGEgYWNjZXNzb3Igc2VnbWVudCBiYXNlZCBvbiBpdHMgdHlwZS5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGtleVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblxuXHRmdW5jdGlvbiBmb3JtYXRBY2Nlc3NvcihrZXkpIHtcblx0ICBpZiAoaWRlbnRSRS50ZXN0KGtleSkpIHsgLy8gaWRlbnRpZmllclxuXHQgICAgcmV0dXJuICcuJyArIGtleVxuXHQgIH0gZWxzZSBpZiAoK2tleSA9PT0ga2V5ID4+PiAwKSB7IC8vIGJyYWNrZXQgaW5kZXhcblx0ICAgIHJldHVybiAnWycgKyBrZXkgKyAnXSc7XG5cdCAgfSBlbHNlIHsgLy8gYnJhY2tldCBzdHJpbmdcblx0ICAgIHJldHVybiAnW1wiJyArIGtleS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdJztcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGlsZXMgYSBnZXR0ZXIgZnVuY3Rpb24gd2l0aCBhIGZpeGVkIHBhdGguXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXl9IHBhdGhcblx0ICogQHJldHVybiB7RnVuY3Rpb259XG5cdCAqL1xuXG5cdGV4cG9ydHMuY29tcGlsZUdldHRlciA9IGZ1bmN0aW9uIChwYXRoKSB7XG5cdCAgdmFyIGJvZHkgPVxuXHQgICAgJ3RyeXtyZXR1cm4gbycgK1xuXHQgICAgcGF0aC5tYXAoZm9ybWF0QWNjZXNzb3IpLmpvaW4oJycpICtcblx0ICAgICd9Y2F0Y2goZSl7fTsnXG5cdCAgcmV0dXJuIG5ldyBGdW5jdGlvbignbycsIGJvZHkpXG5cdH1cblxuXHQvKipcblx0ICogRXh0ZXJuYWwgcGFyc2UgdGhhdCBjaGVjayBmb3IgYSBjYWNoZSBoaXQgZmlyc3Rcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcblx0ICogQHJldHVybiB7QXJyYXl8dW5kZWZpbmVkfVxuXHQgKi9cblxuXHRleHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHBhdGgpIHtcblx0ICB2YXIgaGl0ID0gcGF0aENhY2hlLmdldChwYXRoKVxuXHQgIGlmICghaGl0KSB7XG5cdCAgICBoaXQgPSBwYXJzZVBhdGgocGF0aClcblx0ICAgIGlmIChoaXQpIHtcblx0ICAgICAgaGl0LmdldCA9IGV4cG9ydHMuY29tcGlsZUdldHRlcihoaXQpXG5cdCAgICAgIHBhdGhDYWNoZS5wdXQocGF0aCwgaGl0KVxuXHQgICAgfVxuXHQgIH1cblx0ICByZXR1cm4gaGl0XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGZyb20gYW4gb2JqZWN0IGZyb20gYSBwYXRoIHN0cmluZ1xuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG5cdCAqL1xuXG5cdGV4cG9ydHMuZ2V0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCkge1xuXHQgIHBhdGggPSBleHBvcnRzLnBhcnNlKHBhdGgpXG5cdCAgaWYgKHBhdGgpIHtcblx0ICAgIHJldHVybiBwYXRoLmdldChvYmopXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBvbiBhbiBvYmplY3QgZnJvbSBhIHBhdGhcblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IG9ialxuXHQgKiBAcGFyYW0ge1N0cmluZyB8IEFycmF5fSBwYXRoXG5cdCAqIEBwYXJhbSB7Kn0gdmFsXG5cdCAqL1xuXG5cdGV4cG9ydHMuc2V0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsKSB7XG5cdCAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuXHQgICAgcGF0aCA9IGV4cG9ydHMucGFyc2UocGF0aClcblx0ICB9XG5cdCAgaWYgKCFwYXRoIHx8ICFfLmlzT2JqZWN0KG9iaikpIHtcblx0ICAgIHJldHVybiBmYWxzZVxuXHQgIH1cblx0ICB2YXIgbGFzdCwga2V5XG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPCBsOyBpKyspIHtcblx0ICAgIGxhc3QgPSBvYmpcblx0ICAgIGtleSA9IHBhdGhbaV1cblx0ICAgIG9iaiA9IG9ialtrZXldXG5cdCAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkge1xuXHQgICAgICBvYmogPSB7fVxuXHQgICAgICBsYXN0LiRhZGQoa2V5LCBvYmopXG5cdCAgICB9XG5cdCAgfVxuXHQgIGtleSA9IHBhdGhbaV1cblx0ICBpZiAoa2V5IGluIG9iaikge1xuXHQgICAgb2JqW2tleV0gPSB2YWxcblx0ICB9IGVsc2Uge1xuXHQgICAgb2JqLiRhZGQoa2V5LCB2YWwpXG5cdCAgfVxuXHQgIHJldHVybiB0cnVlXG5cdH1cblxuLyoqKi8gfSxcbi8qIDUyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKipcblx0ICogQSBkb3VibHkgbGlua2VkIGxpc3QtYmFzZWQgTGVhc3QgUmVjZW50bHkgVXNlZCAoTFJVKVxuXHQgKiBjYWNoZS4gV2lsbCBrZWVwIG1vc3QgcmVjZW50bHkgdXNlZCBpdGVtcyB3aGlsZVxuXHQgKiBkaXNjYXJkaW5nIGxlYXN0IHJlY2VudGx5IHVzZWQgaXRlbXMgd2hlbiBpdHMgbGltaXQgaXNcblx0ICogcmVhY2hlZC4gVGhpcyBpcyBhIGJhcmUtYm9uZSB2ZXJzaW9uIG9mXG5cdCAqIFJhc211cyBBbmRlcnNzb24ncyBqcy1scnU6XG5cdCAqXG5cdCAqICAgaHR0cHM6Ly9naXRodWIuY29tL3JzbXMvanMtbHJ1XG5cdCAqXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBsaW1pdFxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cblx0ZnVuY3Rpb24gQ2FjaGUgKGxpbWl0KSB7XG5cdCAgdGhpcy5zaXplID0gMFxuXHQgIHRoaXMubGltaXQgPSBsaW1pdFxuXHQgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IHVuZGVmaW5lZFxuXHQgIHRoaXMuX2tleW1hcCA9IHt9XG5cdH1cblxuXHR2YXIgcCA9IENhY2hlLnByb3RvdHlwZVxuXG5cdC8qKlxuXHQgKiBQdXQgPHZhbHVlPiBpbnRvIHRoZSBjYWNoZSBhc3NvY2lhdGVkIHdpdGggPGtleT4uXG5cdCAqIFJldHVybnMgdGhlIGVudHJ5IHdoaWNoIHdhcyByZW1vdmVkIHRvIG1ha2Ugcm9vbSBmb3Jcblx0ICogdGhlIG5ldyBlbnRyeS4gT3RoZXJ3aXNlIHVuZGVmaW5lZCBpcyByZXR1cm5lZC5cblx0ICogKGkuZS4gaWYgdGhlcmUgd2FzIGVub3VnaCByb29tIGFscmVhZHkpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcblx0ICogQHJldHVybiB7RW50cnl8dW5kZWZpbmVkfVxuXHQgKi9cblxuXHRwLnB1dCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdCAgdmFyIGVudHJ5ID0ge1xuXHQgICAga2V5OmtleSxcblx0ICAgIHZhbHVlOnZhbHVlXG5cdCAgfVxuXHQgIHRoaXMuX2tleW1hcFtrZXldID0gZW50cnlcblx0ICBpZiAodGhpcy50YWlsKSB7XG5cdCAgICB0aGlzLnRhaWwubmV3ZXIgPSBlbnRyeVxuXHQgICAgZW50cnkub2xkZXIgPSB0aGlzLnRhaWxcblx0ICB9IGVsc2Uge1xuXHQgICAgdGhpcy5oZWFkID0gZW50cnlcblx0ICB9XG5cdCAgdGhpcy50YWlsID0gZW50cnlcblx0ICBpZiAodGhpcy5zaXplID09PSB0aGlzLmxpbWl0KSB7XG5cdCAgICByZXR1cm4gdGhpcy5zaGlmdCgpXG5cdCAgfSBlbHNlIHtcblx0ICAgIHRoaXMuc2l6ZSsrXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIFB1cmdlIHRoZSBsZWFzdCByZWNlbnRseSB1c2VkIChvbGRlc3QpIGVudHJ5IGZyb20gdGhlXG5cdCAqIGNhY2hlLiBSZXR1cm5zIHRoZSByZW1vdmVkIGVudHJ5IG9yIHVuZGVmaW5lZCBpZiB0aGVcblx0ICogY2FjaGUgd2FzIGVtcHR5LlxuXHQgKi9cblxuXHRwLnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xuXHQgIHZhciBlbnRyeSA9IHRoaXMuaGVhZFxuXHQgIGlmIChlbnRyeSkge1xuXHQgICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLm5ld2VyXG5cdCAgICB0aGlzLmhlYWQub2xkZXIgPSB1bmRlZmluZWRcblx0ICAgIGVudHJ5Lm5ld2VyID0gZW50cnkub2xkZXIgPSB1bmRlZmluZWRcblx0ICAgIHRoaXMuX2tleW1hcFtlbnRyeS5rZXldID0gdW5kZWZpbmVkXG5cdCAgfVxuXHQgIHJldHVybiBlbnRyeVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhbmQgcmVnaXN0ZXIgcmVjZW50IHVzZSBvZiA8a2V5Pi4gUmV0dXJucyB0aGUgdmFsdWVcblx0ICogYXNzb2NpYXRlZCB3aXRoIDxrZXk+IG9yIHVuZGVmaW5lZCBpZiBub3QgaW4gY2FjaGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICogQHBhcmFtIHtCb29sZWFufSByZXR1cm5FbnRyeVxuXHQgKiBAcmV0dXJuIHtFbnRyeXwqfVxuXHQgKi9cblxuXHRwLmdldCA9IGZ1bmN0aW9uIChrZXksIHJldHVybkVudHJ5KSB7XG5cdCAgdmFyIGVudHJ5ID0gdGhpcy5fa2V5bWFwW2tleV1cblx0ICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkgcmV0dXJuXG5cdCAgaWYgKGVudHJ5ID09PSB0aGlzLnRhaWwpIHtcblx0ICAgIHJldHVybiByZXR1cm5FbnRyeVxuXHQgICAgICA/IGVudHJ5XG5cdCAgICAgIDogZW50cnkudmFsdWVcblx0ICB9XG5cdCAgLy8gSEVBRC0tLS0tLS0tLS0tLS0tVEFJTFxuXHQgIC8vICAgPC5vbGRlciAgIC5uZXdlcj5cblx0ICAvLyAgPC0tLSBhZGQgZGlyZWN0aW9uIC0tXG5cdCAgLy8gICBBICBCICBDICA8RD4gIEVcblx0ICBpZiAoZW50cnkubmV3ZXIpIHtcblx0ICAgIGlmIChlbnRyeSA9PT0gdGhpcy5oZWFkKSB7XG5cdCAgICAgIHRoaXMuaGVhZCA9IGVudHJ5Lm5ld2VyXG5cdCAgICB9XG5cdCAgICBlbnRyeS5uZXdlci5vbGRlciA9IGVudHJ5Lm9sZGVyIC8vIEMgPC0tIEUuXG5cdCAgfVxuXHQgIGlmIChlbnRyeS5vbGRlcikge1xuXHQgICAgZW50cnkub2xkZXIubmV3ZXIgPSBlbnRyeS5uZXdlciAvLyBDLiAtLT4gRVxuXHQgIH1cblx0ICBlbnRyeS5uZXdlciA9IHVuZGVmaW5lZCAvLyBEIC0teFxuXHQgIGVudHJ5Lm9sZGVyID0gdGhpcy50YWlsIC8vIEQuIC0tPiBFXG5cdCAgaWYgKHRoaXMudGFpbCkge1xuXHQgICAgdGhpcy50YWlsLm5ld2VyID0gZW50cnkgLy8gRS4gPC0tIERcblx0ICB9XG5cdCAgdGhpcy50YWlsID0gZW50cnlcblx0ICByZXR1cm4gcmV0dXJuRW50cnlcblx0ICAgID8gZW50cnlcblx0ICAgIDogZW50cnkudmFsdWVcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gQ2FjaGVcblxuLyoqKi8gfSxcbi8qIDUzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIHRyYW5zRHVyYXRpb25Qcm9wID0gXy50cmFuc2l0aW9uUHJvcCArICdEdXJhdGlvbidcblx0dmFyIGFuaW1EdXJhdGlvblByb3AgPSBfLmFuaW1hdGlvblByb3AgKyAnRHVyYXRpb24nXG5cblx0dmFyIHF1ZXVlID0gW11cblx0dmFyIHF1ZXVlZCA9IGZhbHNlXG5cblx0LyoqXG5cdCAqIFB1c2ggYSBqb2IgaW50byB0aGUgdHJhbnNpdGlvbiBxdWV1ZSwgd2hpY2ggaXMgdG8gYmVcblx0ICogZXhlY3V0ZWQgb24gbmV4dCBmcmFtZS5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbCAgICAtIHRhcmdldCBlbGVtZW50XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkaXIgICAgLSAxOiBlbnRlciwgLTE6IGxlYXZlXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IG9wICAgLSB0aGUgYWN0dWFsIGRvbSBvcGVyYXRpb25cblx0ICogQHBhcmFtIHtTdHJpbmd9IGNscyAgICAtIHRoZSBjbGFzc05hbWUgdG8gcmVtb3ZlIHdoZW4gdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uIGlzIGRvbmUuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl0gLSB1c2VyIHN1cHBsaWVkIGNhbGxiYWNrLlxuXHQgKi9cblxuXHRmdW5jdGlvbiBwdXNoIChlbCwgZGlyLCBvcCwgY2xzLCBjYikge1xuXHQgIHF1ZXVlLnB1c2goe1xuXHQgICAgZWwgIDogZWwsXG5cdCAgICBkaXIgOiBkaXIsXG5cdCAgICBjYiAgOiBjYixcblx0ICAgIGNscyA6IGNscyxcblx0ICAgIG9wICA6IG9wXG5cdCAgfSlcblx0ICBpZiAoIXF1ZXVlZCkge1xuXHQgICAgcXVldWVkID0gdHJ1ZVxuXHQgICAgXy5uZXh0VGljayhmbHVzaClcblx0ICB9XG5cdH1cblxuXHQvKipcblx0ICogRmx1c2ggdGhlIHF1ZXVlLCBhbmQgZG8gb25lIGZvcmNlZCByZWZsb3cgYmVmb3JlXG5cdCAqIHRyaWdnZXJpbmcgdHJhbnNpdGlvbnMuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGZsdXNoICgpIHtcblx0ICAvKiBqc2hpbnQgdW51c2VkOiBmYWxzZSAqL1xuXHQgIHZhciBmID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodFxuXHQgIHF1ZXVlLmZvckVhY2gocnVuKVxuXHQgIHF1ZXVlID0gW11cblx0ICBxdWV1ZWQgPSBmYWxzZVxuXHR9XG5cblx0LyoqXG5cdCAqIFJ1biBhIHRyYW5zaXRpb24gam9iLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gam9iXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHJ1biAoam9iKSB7XG5cblx0ICB2YXIgZWwgPSBqb2IuZWxcblx0ICB2YXIgY2xhc3NMaXN0ID0gZWwuY2xhc3NMaXN0XG5cdCAgdmFyIGRhdGEgPSBlbC5fX3ZfdHJhbnNcblx0ICB2YXIgY2xzID0gam9iLmNsc1xuXHQgIHZhciBjYiA9IGpvYi5jYlxuXHQgIHZhciBvcCA9IGpvYi5vcFxuXHQgIHZhciB0cmFuc2l0aW9uVHlwZSA9IGdldFRyYW5zaXRpb25UeXBlKGVsLCBkYXRhLCBjbHMpXG5cblx0ICBpZiAoam9iLmRpciA+IDApIHsgLy8gRU5URVJcblx0ICAgIGlmICh0cmFuc2l0aW9uVHlwZSA9PT0gMSkge1xuXHQgICAgICAvLyB0cmlnZ2VyIHRyYW5zaXRpb24gYnkgcmVtb3ZpbmcgZW50ZXIgY2xhc3Ncblx0ICAgICAgY2xhc3NMaXN0LnJlbW92ZShjbHMpXG5cdCAgICAgIC8vIG9ubHkgbmVlZCB0byBsaXN0ZW4gZm9yIHRyYW5zaXRpb25lbmQgaWYgdGhlcmUnc1xuXHQgICAgICAvLyBhIHVzZXIgY2FsbGJhY2tcblx0ICAgICAgaWYgKGNiKSBzZXR1cFRyYW5zaXRpb25DYihfLnRyYW5zaXRpb25FbmRFdmVudClcblx0ICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvblR5cGUgPT09IDIpIHtcblx0ICAgICAgLy8gYW5pbWF0aW9ucyBhcmUgdHJpZ2dlcmVkIHdoZW4gY2xhc3MgaXMgYWRkZWRcblx0ICAgICAgLy8gc28gd2UganVzdCBsaXN0ZW4gZm9yIGFuaW1hdGlvbmVuZCB0byByZW1vdmUgaXQuXG5cdCAgICAgIHNldHVwVHJhbnNpdGlvbkNiKF8uYW5pbWF0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKGNscylcblx0ICAgICAgfSlcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIG5vIHRyYW5zaXRpb24gYXBwbGljYWJsZVxuXHQgICAgICBjbGFzc0xpc3QucmVtb3ZlKGNscylcblx0ICAgICAgaWYgKGNiKSBjYigpXG5cdCAgICB9XG5cdCAgfSBlbHNlIHsgLy8gTEVBVkVcblx0ICAgIGlmICh0cmFuc2l0aW9uVHlwZSkge1xuXHQgICAgICAvLyBsZWF2ZSB0cmFuc2l0aW9ucy9hbmltYXRpb25zIGFyZSBib3RoIHRyaWdnZXJlZFxuXHQgICAgICAvLyBieSBhZGRpbmcgdGhlIGNsYXNzLCBqdXN0IHJlbW92ZSBpdCBvbiBlbmQgZXZlbnQuXG5cdCAgICAgIHZhciBldmVudCA9IHRyYW5zaXRpb25UeXBlID09PSAxXG5cdCAgICAgICAgPyBfLnRyYW5zaXRpb25FbmRFdmVudFxuXHQgICAgICAgIDogXy5hbmltYXRpb25FbmRFdmVudFxuXHQgICAgICBzZXR1cFRyYW5zaXRpb25DYihldmVudCwgZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIG9wKClcblx0ICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKGNscylcblx0ICAgICAgfSlcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIG9wKClcblx0ICAgICAgY2xhc3NMaXN0LnJlbW92ZShjbHMpXG5cdCAgICAgIGlmIChjYikgY2IoKVxuXHQgICAgfVxuXHQgIH1cblxuXHQgIC8qKlxuXHQgICAqIFNldCB1cCBhIHRyYW5zaXRpb24gZW5kIGNhbGxiYWNrLCBzdG9yZSB0aGUgY2FsbGJhY2tcblx0ICAgKiBvbiB0aGUgZWxlbWVudCdzIF9fdl90cmFucyBkYXRhIG9iamVjdCwgc28gd2UgY2FuXG5cdCAgICogY2xlYW4gaXQgdXAgaWYgYW5vdGhlciB0cmFuc2l0aW9uIGlzIHRyaWdnZXJlZCBiZWZvcmVcblx0ICAgKiB0aGUgY2FsbGJhY2sgaXMgZmlyZWQuXG5cdCAgICpcblx0ICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcblx0ICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2xlYW51cEZuXVxuXHQgICAqL1xuXG5cdCAgZnVuY3Rpb24gc2V0dXBUcmFuc2l0aW9uQ2IgKGV2ZW50LCBjbGVhbnVwRm4pIHtcblx0ICAgIGRhdGEuZXZlbnQgPSBldmVudFxuXHQgICAgdmFyIG9uRW5kID0gZGF0YS5jYWxsYmFjayA9IGZ1bmN0aW9uIHRyYW5zaXRpb25DYiAoZSkge1xuXHQgICAgICBpZiAoZS50YXJnZXQgPT09IGVsKSB7XG5cdCAgICAgICAgXy5vZmYoZWwsIGV2ZW50LCBvbkVuZClcblx0ICAgICAgICBkYXRhLmV2ZW50ID0gZGF0YS5jYWxsYmFjayA9IG51bGxcblx0ICAgICAgICBpZiAoY2xlYW51cEZuKSBjbGVhbnVwRm4oKVxuXHQgICAgICAgIGlmIChjYikgY2IoKVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICBfLm9uKGVsLCBldmVudCwgb25FbmQpXG5cdCAgfVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhbiBlbGVtZW50J3MgdHJhbnNpdGlvbiB0eXBlIGJhc2VkIG9uIHRoZVxuXHQgKiBjYWxjdWxhdGVkIHN0eWxlc1xuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWVcblx0ICogQHJldHVybiB7TnVtYmVyfVxuXHQgKiAgICAgICAgIDEgLSB0cmFuc2l0aW9uXG5cdCAqICAgICAgICAgMiAtIGFuaW1hdGlvblxuXHQgKi9cblxuXHRmdW5jdGlvbiBnZXRUcmFuc2l0aW9uVHlwZSAoZWwsIGRhdGEsIGNsYXNzTmFtZSkge1xuXHQgIHZhciB0eXBlID0gZGF0YS5jYWNoZSAmJiBkYXRhLmNhY2hlW2NsYXNzTmFtZV1cblx0ICBpZiAodHlwZSkgcmV0dXJuIHR5cGVcblx0ICB2YXIgaW5saW5lU3R5bGVzID0gZWwuc3R5bGVcblx0ICB2YXIgY29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbClcblx0ICB2YXIgdHJhbnNEdXJhdGlvbiA9XG5cdCAgICBpbmxpbmVTdHlsZXNbdHJhbnNEdXJhdGlvblByb3BdIHx8XG5cdCAgICBjb21wdXRlZFN0eWxlc1t0cmFuc0R1cmF0aW9uUHJvcF1cblx0ICBpZiAodHJhbnNEdXJhdGlvbiAmJiB0cmFuc0R1cmF0aW9uICE9PSAnMHMnKSB7XG5cdCAgICB0eXBlID0gMVxuXHQgIH0gZWxzZSB7XG5cdCAgICB2YXIgYW5pbUR1cmF0aW9uID1cblx0ICAgICAgaW5saW5lU3R5bGVzW2FuaW1EdXJhdGlvblByb3BdIHx8XG5cdCAgICAgIGNvbXB1dGVkU3R5bGVzW2FuaW1EdXJhdGlvblByb3BdXG5cdCAgICBpZiAoYW5pbUR1cmF0aW9uICYmIGFuaW1EdXJhdGlvbiAhPT0gJzBzJykge1xuXHQgICAgICB0eXBlID0gMlxuXHQgICAgfVxuXHQgIH1cblx0ICBpZiAodHlwZSkge1xuXHQgICAgaWYgKCFkYXRhLmNhY2hlKSBkYXRhLmNhY2hlID0ge31cblx0ICAgIGRhdGEuY2FjaGVbY2xhc3NOYW1lXSA9IHR5cGVcblx0ICB9XG5cdCAgcmV0dXJuIHR5cGVcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBseSBDU1MgdHJhbnNpdGlvbiB0byBhbiBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkaXJlY3Rpb24gLSAxOiBlbnRlciwgLTE6IGxlYXZlXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IG9wIC0gdGhlIGFjdHVhbCBET00gb3BlcmF0aW9uXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGFyZ2V0IGVsZW1lbnQncyB0cmFuc2l0aW9uIGRhdGFcblx0ICovXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWwsIGRpcmVjdGlvbiwgb3AsIGRhdGEsIGNiKSB7XG5cdCAgdmFyIGNsYXNzTGlzdCA9IGVsLmNsYXNzTGlzdFxuXHQgIHZhciBwcmVmaXggPSBkYXRhLmlkIHx8ICd2J1xuXHQgIHZhciBlbnRlckNsYXNzID0gcHJlZml4ICsgJy1lbnRlcidcblx0ICB2YXIgbGVhdmVDbGFzcyA9IHByZWZpeCArICctbGVhdmUnXG5cdCAgLy8gY2xlYW4gdXAgcG90ZW50aWFsIHByZXZpb3VzIHVuZmluaXNoZWQgdHJhbnNpdGlvblxuXHQgIGlmIChkYXRhLmNhbGxiYWNrKSB7XG5cdCAgICBfLm9mZihlbCwgZGF0YS5ldmVudCwgZGF0YS5jYWxsYmFjaylcblx0ICAgIGNsYXNzTGlzdC5yZW1vdmUoZW50ZXJDbGFzcylcblx0ICAgIGNsYXNzTGlzdC5yZW1vdmUobGVhdmVDbGFzcylcblx0ICAgIGRhdGEuZXZlbnQgPSBkYXRhLmNhbGxiYWNrID0gbnVsbFxuXHQgIH1cblx0ICBpZiAoZGlyZWN0aW9uID4gMCkgeyAvLyBlbnRlclxuXHQgICAgY2xhc3NMaXN0LmFkZChlbnRlckNsYXNzKVxuXHQgICAgb3AoKVxuXHQgICAgcHVzaChlbCwgZGlyZWN0aW9uLCBudWxsLCBlbnRlckNsYXNzLCBjYilcblx0ICB9IGVsc2UgeyAvLyBsZWF2ZVxuXHQgICAgY2xhc3NMaXN0LmFkZChsZWF2ZUNsYXNzKVxuXHQgICAgcHVzaChlbCwgZGlyZWN0aW9uLCBvcCwgbGVhdmVDbGFzcywgY2IpXG5cdCAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiA1NCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyoqXG5cdCAqIEFwcGx5IEphdmFTY3JpcHQgZW50ZXIvbGVhdmUgZnVuY3Rpb25zLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkaXJlY3Rpb24gLSAxOiBlbnRlciwgLTE6IGxlYXZlXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IG9wIC0gdGhlIGFjdHVhbCBET00gb3BlcmF0aW9uXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGFyZ2V0IGVsZW1lbnQncyB0cmFuc2l0aW9uIGRhdGFcblx0ICogQHBhcmFtIHtPYmplY3R9IGRlZiAtIHRyYW5zaXRpb24gZGVmaW5pdGlvbiBvYmplY3Rcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXVxuXHQgKi9cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbCwgZGlyZWN0aW9uLCBvcCwgZGF0YSwgZGVmLCBjYikge1xuXHQgIGlmIChkYXRhLmNhbmNlbCkge1xuXHQgICAgZGF0YS5jYW5jZWwoKVxuXHQgICAgZGF0YS5jYW5jZWwgPSBudWxsXG5cdCAgfVxuXHQgIGlmIChkaXJlY3Rpb24gPiAwKSB7IC8vIGVudGVyXG5cdCAgICBpZiAoZGVmLmJlZm9yZUVudGVyKSB7XG5cdCAgICAgIGRlZi5iZWZvcmVFbnRlcihlbClcblx0ICAgIH1cblx0ICAgIG9wKClcblx0ICAgIGlmIChkZWYuZW50ZXIpIHtcblx0ICAgICAgZGF0YS5jYW5jZWwgPSBkZWYuZW50ZXIoZWwsIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBkYXRhLmNhbmNlbCA9IG51bGxcblx0ICAgICAgICBpZiAoY2IpIGNiKClcblx0ICAgICAgfSlcblx0ICAgIH0gZWxzZSBpZiAoY2IpIHtcblx0ICAgICAgY2IoKVxuXHQgICAgfVxuXHQgIH0gZWxzZSB7IC8vIGxlYXZlXG5cdCAgICBpZiAoZGVmLmxlYXZlKSB7XG5cdCAgICAgIGRhdGEuY2FuY2VsID0gZGVmLmxlYXZlKGVsLCBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZGF0YS5jYW5jZWwgPSBudWxsXG5cdCAgICAgICAgb3AoKVxuXHQgICAgICAgIGlmIChjYikgY2IoKVxuXHQgICAgICB9KVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgb3AoKVxuXHQgICAgICBpZiAoY2IpIGNiKClcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDU1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBzZWxmID0gdGhpc1xuXHQgICAgdmFyIGVsID0gdGhpcy5lbFxuXG5cdCAgICAvLyBjaGVjayBwYXJhbXNcblx0ICAgIC8vIC0gbGF6eTogdXBkYXRlIG1vZGVsIG9uIFwiY2hhbmdlXCIgaW5zdGVhZCBvZiBcImlucHV0XCJcblx0ICAgIHZhciBsYXp5ID0gZWwuaGFzQXR0cmlidXRlKCdsYXp5Jylcblx0ICAgIGlmIChsYXp5KSB7XG5cdCAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnbGF6eScpXG5cdCAgICB9XG5cdCAgICAvLyAtIG51bWJlcjogY2FzdCB2YWx1ZSBpbnRvIG51bWJlciB3aGVuIHVwZGF0aW5nIG1vZGVsLlxuXHQgICAgdmFyIG51bWJlciA9XG5cdCAgICAgIGVsLmhhc0F0dHJpYnV0ZSgnbnVtYmVyJykgfHxcblx0ICAgICAgZWwudHlwZSA9PT0gJ251bWJlcidcblx0ICAgIGlmIChudW1iZXIpIHtcblx0ICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdudW1iZXInKVxuXHQgICAgfVxuXG5cdCAgICAvLyBoYW5kbGUgY29tcG9zaXRpb24gZXZlbnRzLlxuXHQgICAgLy8gaHR0cDovL2Jsb2cuZXZhbnlvdS5tZS8yMDE0LzAxLzAzL2NvbXBvc2l0aW9uLWV2ZW50L1xuXHQgICAgdmFyIGNwTG9ja2VkID0gZmFsc2Vcblx0ICAgIHRoaXMuY3BMb2NrID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICBjcExvY2tlZCA9IHRydWVcblx0ICAgIH1cblx0ICAgIHRoaXMuY3BVbmxvY2sgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIGNwTG9ja2VkID0gZmFsc2Vcblx0ICAgICAgLy8gaW4gSUUxMSB0aGUgXCJjb21wb3NpdGlvbmVuZFwiIGV2ZW50IGZpcmVzIEFGVEVSXG5cdCAgICAgIC8vIHRoZSBcImlucHV0XCIgZXZlbnQsIHNvIHRoZSBpbnB1dCBoYW5kbGVyIGlzIGJsb2NrZWRcblx0ICAgICAgLy8gYXQgdGhlIGVuZC4uLiBoYXZlIHRvIGNhbGwgaXQgaGVyZS5cblx0ICAgICAgc2V0KClcblx0ICAgIH1cblx0ICAgIF8ub24oZWwsJ2NvbXBvc2l0aW9uc3RhcnQnLCB0aGlzLmNwTG9jaylcblx0ICAgIF8ub24oZWwsJ2NvbXBvc2l0aW9uZW5kJywgdGhpcy5jcFVubG9jaylcblxuXHQgICAgLy8gc2hhcmVkIHNldHRlclxuXHQgICAgZnVuY3Rpb24gc2V0ICgpIHtcblx0ICAgICAgc2VsZi5zZXQoXG5cdCAgICAgICAgbnVtYmVyID8gXy50b051bWJlcihlbC52YWx1ZSkgOiBlbC52YWx1ZSxcblx0ICAgICAgICB0cnVlXG5cdCAgICAgIClcblx0ICAgIH1cblxuXHQgICAgLy8gaWYgdGhlIGRpcmVjdGl2ZSBoYXMgZmlsdGVycywgd2UgbmVlZCB0b1xuXHQgICAgLy8gcmVjb3JkIGN1cnNvciBwb3NpdGlvbiBhbmQgcmVzdG9yZSBpdCBhZnRlciB1cGRhdGluZ1xuXHQgICAgLy8gdGhlIGlucHV0IHdpdGggdGhlIGZpbHRlcmVkIHZhbHVlLlxuXHQgICAgdGhpcy5saXN0ZW5lciA9IGZ1bmN0aW9uIHRleHRJbnB1dExpc3RlbmVyICgpIHtcblx0ICAgICAgaWYgKGNwTG9ja2VkKSByZXR1cm5cblx0ICAgICAgdmFyIGNoYXJzT2Zmc2V0XG5cdCAgICAgIC8vIHNvbWUgSFRNTDUgaW5wdXQgdHlwZXMgdGhyb3cgZXJyb3IgaGVyZVxuXHQgICAgICB0cnkge1xuXHQgICAgICAgIC8vIHJlY29yZCBob3cgbWFueSBjaGFycyBmcm9tIHRoZSBlbmQgb2YgaW5wdXRcblx0ICAgICAgICAvLyB0aGUgY3Vyc29yIHdhcyBhdFxuXHQgICAgICAgIGNoYXJzT2Zmc2V0ID0gZWwudmFsdWUubGVuZ3RoIC0gZWwuc2VsZWN0aW9uU3RhcnRcblx0ICAgICAgfSBjYXRjaCAoZSkge31cblx0ICAgICAgc2V0KClcblx0ICAgICAgLy8gZm9yY2UgYSB2YWx1ZSB1cGRhdGUsIGJlY2F1c2UgaW5cblx0ICAgICAgLy8gY2VydGFpbiBjYXNlcyB0aGUgd3JpdGUgZmlsdGVycyBvdXRwdXQgdGhlIHNhbWVcblx0ICAgICAgLy8gcmVzdWx0IGZvciBkaWZmZXJlbnQgaW5wdXQgdmFsdWVzLCBhbmQgdGhlIE9ic2VydmVyXG5cdCAgICAgIC8vIHNldCBldmVudHMgd29uJ3QgYmUgdHJpZ2dlcmVkLlxuXHQgICAgICBfLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbmV3VmFsID0gc2VsZi5fd2F0Y2hlci52YWx1ZVxuXHQgICAgICAgIHNlbGYudXBkYXRlKG5ld1ZhbClcblx0ICAgICAgICBpZiAoY2hhcnNPZmZzZXQgIT0gbnVsbCkge1xuXHQgICAgICAgICAgdmFyIGN1cnNvclBvcyA9XG5cdCAgICAgICAgICAgIF8udG9TdHJpbmcobmV3VmFsKS5sZW5ndGggLSBjaGFyc09mZnNldFxuXHQgICAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yUG9zLCBjdXJzb3JQb3MpXG5cdCAgICAgICAgfVxuXHQgICAgICB9KVxuXHQgICAgfVxuXHQgICAgdGhpcy5ldmVudCA9IGxhenkgPyAnY2hhbmdlJyA6ICdpbnB1dCdcblx0ICAgIF8ub24oZWwsIHRoaXMuZXZlbnQsIHRoaXMubGlzdGVuZXIpXG5cblx0ICAgIC8vIElFOSBkb2Vzbid0IGZpcmUgaW5wdXQgZXZlbnQgb24gYmFja3NwYWNlL2RlbC9jdXRcblx0ICAgIGlmICghbGF6eSAmJiBfLmlzSUU5KSB7XG5cdCAgICAgIHRoaXMub25DdXQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgXy5uZXh0VGljayhzZWxmLmxpc3RlbmVyKVxuXHQgICAgICB9XG5cdCAgICAgIHRoaXMub25EZWwgPSBmdW5jdGlvbiAoZSkge1xuXHQgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDQ2IHx8IGUua2V5Q29kZSA9PT0gOCkge1xuXHQgICAgICAgICAgc2VsZi5saXN0ZW5lcigpXG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICAgIF8ub24oZWwsICdjdXQnLCB0aGlzLm9uQ3V0KVxuXHQgICAgICBfLm9uKGVsLCAna2V5dXAnLCB0aGlzLm9uRGVsKVxuXHQgICAgfVxuXG5cdCAgICAvLyBzZXQgaW5pdGlhbCB2YWx1ZSBpZiBwcmVzZW50XG5cdCAgICBpZiAoXG5cdCAgICAgIGVsLmhhc0F0dHJpYnV0ZSgndmFsdWUnKSB8fFxuXHQgICAgICAoZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJyAmJiBlbC52YWx1ZS50cmltKCkpXG5cdCAgICApIHtcblx0ICAgICAgdGhpcy5faW5pdFZhbHVlID0gZWwudmFsdWVcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgdXBkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgIHRoaXMuZWwudmFsdWUgPSBfLnRvU3RyaW5nKHZhbHVlKVxuXHQgIH0sXG5cblx0ICB1bmJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBlbCA9IHRoaXMuZWxcblx0ICAgIF8ub2ZmKGVsLCB0aGlzLmV2ZW50LCB0aGlzLmxpc3RlbmVyKVxuXHQgICAgXy5vZmYoZWwsJ2NvbXBvc2l0aW9uc3RhcnQnLCB0aGlzLmNwTG9jaylcblx0ICAgIF8ub2ZmKGVsLCdjb21wb3NpdGlvbmVuZCcsIHRoaXMuY3BVbmxvY2spXG5cdCAgICBpZiAodGhpcy5vbkN1dCkge1xuXHQgICAgICBfLm9mZihlbCwnY3V0JywgdGhpcy5vbkN1dClcblx0ICAgICAgXy5vZmYoZWwsJ2tleXVwJywgdGhpcy5vbkRlbClcblx0ICAgIH1cblx0ICB9XG5cblx0fVxuXG4vKioqLyB9LFxuLyogNTYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIHNlbGYgPSB0aGlzXG5cdCAgICB2YXIgZWwgPSB0aGlzLmVsXG5cdCAgICB0aGlzLmxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICBzZWxmLnNldChlbC52YWx1ZSwgdHJ1ZSlcblx0ICAgIH1cblx0ICAgIF8ub24oZWwsICdjaGFuZ2UnLCB0aGlzLmxpc3RlbmVyKVxuXHQgICAgaWYgKGVsLmNoZWNrZWQpIHtcblx0ICAgICAgdGhpcy5faW5pdFZhbHVlID0gZWwudmFsdWVcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgdXBkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgIC8qIGpzaGludCBlcWVxZXE6IGZhbHNlICovXG5cdCAgICB0aGlzLmVsLmNoZWNrZWQgPSB2YWx1ZSA9PSB0aGlzLmVsLnZhbHVlXG5cdCAgfSxcblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgXy5vZmYodGhpcy5lbCwgJ2NoYW5nZScsIHRoaXMubGlzdGVuZXIpXG5cdCAgfVxuXG5cdH1cblxuLyoqKi8gfSxcbi8qIDU3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIFdhdGNoZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXG5cdCAgYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIHNlbGYgPSB0aGlzXG5cdCAgICB2YXIgZWwgPSB0aGlzLmVsXG5cdCAgICAvLyBjaGVjayBvcHRpb25zIHBhcmFtXG5cdCAgICB2YXIgb3B0aW9uc1BhcmFtID0gZWwuZ2V0QXR0cmlidXRlKCdvcHRpb25zJylcblx0ICAgIGlmIChvcHRpb25zUGFyYW0pIHtcblx0ICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdvcHRpb25zJylcblx0ICAgICAgaW5pdE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zUGFyYW0pXG5cdCAgICB9XG5cdCAgICB0aGlzLm11bHRpcGxlID0gZWwuaGFzQXR0cmlidXRlKCdtdWx0aXBsZScpXG5cdCAgICB0aGlzLmxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICB2YXIgdmFsdWUgPSBzZWxmLm11bHRpcGxlXG5cdCAgICAgICAgPyBnZXRNdWx0aVZhbHVlKGVsKVxuXHQgICAgICAgIDogZWwudmFsdWVcblx0ICAgICAgc2VsZi5zZXQodmFsdWUsIHRydWUpXG5cdCAgICB9XG5cdCAgICBfLm9uKGVsLCAnY2hhbmdlJywgdGhpcy5saXN0ZW5lcilcblx0ICAgIGNoZWNrSW5pdGlhbFZhbHVlLmNhbGwodGhpcylcblx0ICB9LFxuXG5cdCAgdXBkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcblx0ICAgIC8qIGpzaGludCBlcWVxZXE6IGZhbHNlICovXG5cdCAgICB2YXIgZWwgPSB0aGlzLmVsXG5cdCAgICBlbC5zZWxlY3RlZEluZGV4ID0gLTFcblx0ICAgIHZhciBtdWx0aSA9IHRoaXMubXVsdGlwbGUgJiYgXy5pc0FycmF5KHZhbHVlKVxuXHQgICAgdmFyIG9wdGlvbnMgPSBlbC5vcHRpb25zXG5cdCAgICB2YXIgaSA9IG9wdGlvbnMubGVuZ3RoXG5cdCAgICB2YXIgb3B0aW9uXG5cdCAgICB3aGlsZSAoaS0tKSB7XG5cdCAgICAgIG9wdGlvbiA9IG9wdGlvbnNbaV1cblx0ICAgICAgb3B0aW9uLnNlbGVjdGVkID0gbXVsdGlcblx0ICAgICAgICA/IGluZGV4T2YodmFsdWUsIG9wdGlvbi52YWx1ZSkgPiAtMVxuXHQgICAgICAgIDogdmFsdWUgPT0gb3B0aW9uLnZhbHVlXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHVuYmluZDogZnVuY3Rpb24gKCkge1xuXHQgICAgXy5vZmYodGhpcy5lbCwgJ2NoYW5nZScsIHRoaXMubGlzdGVuZXIpXG5cdCAgICBpZiAodGhpcy5vcHRpb25XYXRjaGVyKSB7XG5cdCAgICAgIHRoaXMub3B0aW9uV2F0Y2hlci50ZWFyZG93bigpXG5cdCAgICB9XG5cdCAgfVxuXG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgb3B0aW9uIGxpc3QgZnJvbSB0aGUgcGFyYW0uXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBleHByZXNzaW9uXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGluaXRPcHRpb25zIChleHByZXNzaW9uKSB7XG5cdCAgdmFyIHNlbGYgPSB0aGlzXG5cdCAgZnVuY3Rpb24gb3B0aW9uVXBkYXRlV2F0Y2hlciAodmFsdWUpIHtcblx0ICAgIGlmIChfLmlzQXJyYXkodmFsdWUpKSB7XG5cdCAgICAgIHNlbGYuZWwuaW5uZXJIVE1MID0gJydcblx0ICAgICAgYnVpbGRPcHRpb25zKHNlbGYuZWwsIHZhbHVlKVxuXHQgICAgICBpZiAoc2VsZi5fd2F0Y2hlcikge1xuXHQgICAgICAgIHNlbGYudXBkYXRlKHNlbGYuX3dhdGNoZXIudmFsdWUpXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIF8ud2FybignSW52YWxpZCBvcHRpb25zIHZhbHVlIGZvciB2LW1vZGVsOiAnICsgdmFsdWUpXG5cdCAgICB9XG5cdCAgfVxuXHQgIHRoaXMub3B0aW9uV2F0Y2hlciA9IG5ldyBXYXRjaGVyKFxuXHQgICAgdGhpcy52bSxcblx0ICAgIGV4cHJlc3Npb24sXG5cdCAgICBvcHRpb25VcGRhdGVXYXRjaGVyXG5cdCAgKVxuXHQgIC8vIHVwZGF0ZSB3aXRoIGluaXRpYWwgdmFsdWVcblx0ICBvcHRpb25VcGRhdGVXYXRjaGVyKHRoaXMub3B0aW9uV2F0Y2hlci52YWx1ZSlcblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZCB1cCBvcHRpb24gZWxlbWVudHMuIElFOSBkb2Vzbid0IGNyZWF0ZSBvcHRpb25zXG5cdCAqIHdoZW4gc2V0dGluZyBpbm5lckhUTUwgb24gPHNlbGVjdD4gZWxlbWVudHMsIHNvIHdlIGhhdmVcblx0ICogdG8gdXNlIERPTSBBUEkgaGVyZS5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBwYXJlbnQgLSBhIDxzZWxlY3Q+IG9yIGFuIDxvcHRncm91cD5cblx0ICogQHBhcmFtIHtBcnJheX0gb3B0aW9uc1xuXHQgKi9cblxuXHRmdW5jdGlvbiBidWlsZE9wdGlvbnMgKHBhcmVudCwgb3B0aW9ucykge1xuXHQgIHZhciBvcCwgZWxcblx0ICBmb3IgKHZhciBpID0gMCwgbCA9IG9wdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICBvcCA9IG9wdGlvbnNbaV1cblx0ICAgIGlmICghb3Aub3B0aW9ucykge1xuXHQgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG5cdCAgICAgIGlmICh0eXBlb2Ygb3AgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgZWwudGV4dCA9IGVsLnZhbHVlID0gb3Bcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBlbC50ZXh0ID0gb3AudGV4dFxuXHQgICAgICAgIGVsLnZhbHVlID0gb3AudmFsdWVcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRncm91cCcpXG5cdCAgICAgIGVsLmxhYmVsID0gb3AubGFiZWxcblx0ICAgICAgYnVpbGRPcHRpb25zKGVsLCBvcC5vcHRpb25zKVxuXHQgICAgfVxuXHQgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsKVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayB0aGUgaW5pdGlhbCB2YWx1ZSBmb3Igc2VsZWN0ZWQgb3B0aW9ucy5cblx0ICovXG5cblx0ZnVuY3Rpb24gY2hlY2tJbml0aWFsVmFsdWUgKCkge1xuXHQgIHZhciBpbml0VmFsdWVcblx0ICB2YXIgb3B0aW9ucyA9IHRoaXMuZWwub3B0aW9uc1xuXHQgIGZvciAodmFyIGkgPSAwLCBsID0gb3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgIGlmIChvcHRpb25zW2ldLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSkge1xuXHQgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuXHQgICAgICAgIChpbml0VmFsdWUgfHwgKGluaXRWYWx1ZSA9IFtdKSlcblx0ICAgICAgICAgIC5wdXNoKG9wdGlvbnNbaV0udmFsdWUpXG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgaW5pdFZhbHVlID0gb3B0aW9uc1tpXS52YWx1ZVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHQgIGlmIChpbml0VmFsdWUpIHtcblx0ICAgIHRoaXMuX2luaXRWYWx1ZSA9IGluaXRWYWx1ZVxuXHQgIH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIZWxwZXIgdG8gZXh0cmFjdCBhIHZhbHVlIGFycmF5IGZvciBzZWxlY3RbbXVsdGlwbGVdXG5cdCAqXG5cdCAqIEBwYXJhbSB7U2VsZWN0RWxlbWVudH0gZWxcblx0ICogQHJldHVybiB7QXJyYXl9XG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGdldE11bHRpVmFsdWUgKGVsKSB7XG5cdCAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5maWx0ZXJcblx0ICAgIC5jYWxsKGVsLm9wdGlvbnMsIGZpbHRlclNlbGVjdGVkKVxuXHQgICAgLm1hcChnZXRPcHRpb25WYWx1ZSlcblx0fVxuXG5cdGZ1bmN0aW9uIGZpbHRlclNlbGVjdGVkIChvcCkge1xuXHQgIHJldHVybiBvcC5zZWxlY3RlZFxuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0T3B0aW9uVmFsdWUgKG9wKSB7XG5cdCAgcmV0dXJuIG9wLnZhbHVlIHx8IG9wLnRleHRcblx0fVxuXG5cdC8qKlxuXHQgKiBOYXRpdmUgQXJyYXkuaW5kZXhPZiB1c2VzIHN0cmljdCBlcXVhbCwgYnV0IGluIHRoaXNcblx0ICogY2FzZSB3ZSBuZWVkIHRvIG1hdGNoIHN0cmluZy9udW1iZXJzIHdpdGggc29mdCBlcXVhbC5cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheX0gYXJyXG5cdCAqIEBwYXJhbSB7Kn0gdmFsXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGluZGV4T2YgKGFyciwgdmFsKSB7XG5cdCAgLyoganNoaW50IGVxZXFlcTogZmFsc2UgKi9cblx0ICB2YXIgaSA9IGFyci5sZW5ndGhcblx0ICB3aGlsZSAoaS0tKSB7XG5cdCAgICBpZiAoYXJyW2ldID09IHZhbCkgcmV0dXJuIGlcblx0ICB9XG5cdCAgcmV0dXJuIC0xXG5cdH1cblxuLyoqKi8gfSxcbi8qIDU4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBzZWxmID0gdGhpc1xuXHQgICAgdmFyIGVsID0gdGhpcy5lbFxuXHQgICAgdGhpcy5saXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgc2VsZi5zZXQoZWwuY2hlY2tlZCwgdHJ1ZSlcblx0ICAgIH1cblx0ICAgIF8ub24oZWwsICdjaGFuZ2UnLCB0aGlzLmxpc3RlbmVyKVxuXHQgICAgaWYgKGVsLmNoZWNrZWQpIHtcblx0ICAgICAgdGhpcy5faW5pdFZhbHVlID0gZWwuY2hlY2tlZFxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICB1cGRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgdGhpcy5lbC5jaGVja2VkID0gISF2YWx1ZVxuXHQgIH0sXG5cblx0ICB1bmJpbmQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgIF8ub2ZmKHRoaXMuZWwsICdjaGFuZ2UnLCB0aGlzLmxpc3RlbmVyKVxuXHQgIH1cblxuXHR9XG5cbi8qKiovIH0sXG4vKiA1OSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlXG5cdHZhciBhcnJheU1ldGhvZHMgPSBPYmplY3QuY3JlYXRlKGFycmF5UHJvdG8pXG5cblx0LyoqXG5cdCAqIEludGVyY2VwdCBtdXRhdGluZyBtZXRob2RzIGFuZCBlbWl0IGV2ZW50c1xuXHQgKi9cblxuXHQ7W1xuXHQgICdwdXNoJyxcblx0ICAncG9wJyxcblx0ICAnc2hpZnQnLFxuXHQgICd1bnNoaWZ0Jyxcblx0ICAnc3BsaWNlJyxcblx0ICAnc29ydCcsXG5cdCAgJ3JldmVyc2UnXG5cdF1cblx0LmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuXHQgIC8vIGNhY2hlIG9yaWdpbmFsIG1ldGhvZFxuXHQgIHZhciBvcmlnaW5hbCA9IGFycmF5UHJvdG9bbWV0aG9kXVxuXHQgIF8uZGVmaW5lKGFycmF5TWV0aG9kcywgbWV0aG9kLCBmdW5jdGlvbiBtdXRhdG9yICgpIHtcblx0ICAgIC8vIGF2b2lkIGxlYWtpbmcgYXJndW1lbnRzOlxuXHQgICAgLy8gaHR0cDovL2pzcGVyZi5jb20vY2xvc3VyZS13aXRoLWFyZ3VtZW50c1xuXHQgICAgdmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoXG5cdCAgICB2YXIgYXJncyA9IG5ldyBBcnJheShpKVxuXHQgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldXG5cdCAgICB9XG5cdCAgICB2YXIgcmVzdWx0ID0gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncylcblx0ICAgIHZhciBvYiA9IHRoaXMuX19vYl9fXG5cdCAgICB2YXIgaW5zZXJ0ZWRcblx0ICAgIHN3aXRjaCAobWV0aG9kKSB7XG5cdCAgICAgIGNhc2UgJ3B1c2gnOlxuXHQgICAgICAgIGluc2VydGVkID0gYXJnc1xuXHQgICAgICAgIGJyZWFrXG5cdCAgICAgIGNhc2UgJ3Vuc2hpZnQnOlxuXHQgICAgICAgIGluc2VydGVkID0gYXJnc1xuXHQgICAgICAgIGJyZWFrXG5cdCAgICAgIGNhc2UgJ3NwbGljZSc6XG5cdCAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzLnNsaWNlKDIpXG5cdCAgICAgICAgYnJlYWtcblx0ICAgIH1cblx0ICAgIGlmIChpbnNlcnRlZCkgb2Iub2JzZXJ2ZUFycmF5KGluc2VydGVkKVxuXHQgICAgLy8gbm90aWZ5IGNoYW5nZVxuXHQgICAgb2Iubm90aWZ5KClcblx0ICAgIHJldHVybiByZXN1bHRcblx0ICB9KVxuXHR9KVxuXG5cdC8qKlxuXHQgKiBTd2FwIHRoZSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleCB3aXRoIGEgbmV3IHZhbHVlXG5cdCAqIGFuZCBlbWl0cyBjb3JyZXNwb25kaW5nIGV2ZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcblx0ICogQHBhcmFtIHsqfSB2YWxcblx0ICogQHJldHVybiB7Kn0gLSByZXBsYWNlZCBlbGVtZW50XG5cdCAqL1xuXG5cdF8uZGVmaW5lKFxuXHQgIGFycmF5UHJvdG8sXG5cdCAgJyRzZXQnLFxuXHQgIGZ1bmN0aW9uICRzZXQgKGluZGV4LCB2YWwpIHtcblx0ICAgIGlmIChpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xuXHQgICAgICB0aGlzLmxlbmd0aCA9IGluZGV4ICsgMVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHRoaXMuc3BsaWNlKGluZGV4LCAxLCB2YWwpWzBdXG5cdCAgfVxuXHQpXG5cblx0LyoqXG5cdCAqIENvbnZlbmllbmNlIG1ldGhvZCB0byByZW1vdmUgdGhlIGVsZW1lbnQgYXQgZ2l2ZW4gaW5kZXguXG5cdCAqXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuXHQgKiBAcGFyYW0geyp9IHZhbFxuXHQgKi9cblxuXHRfLmRlZmluZShcblx0ICBhcnJheVByb3RvLFxuXHQgICckcmVtb3ZlJyxcblx0ICBmdW5jdGlvbiAkcmVtb3ZlIChpbmRleCkge1xuXHQgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHtcblx0ICAgICAgaW5kZXggPSB0aGlzLmluZGV4T2YoaW5kZXgpXG5cdCAgICB9XG5cdCAgICBpZiAoaW5kZXggPiAtMSkge1xuXHQgICAgICByZXR1cm4gdGhpcy5zcGxpY2UoaW5kZXgsIDEpWzBdXG5cdCAgICB9XG5cdCAgfVxuXHQpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBhcnJheU1ldGhvZHNcblxuLyoqKi8gfSxcbi8qIDYwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIG9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBuZXcgcHJvcGVydHkgdG8gYW4gb2JzZXJ2ZWQgb2JqZWN0XG5cdCAqIGFuZCBlbWl0cyBjb3JyZXNwb25kaW5nIGV2ZW50XG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcblx0ICogQHBhcmFtIHsqfSB2YWxcblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHRfLmRlZmluZShcblx0ICBvYmpQcm90byxcblx0ICAnJGFkZCcsXG5cdCAgZnVuY3Rpb24gJGFkZCAoa2V5LCB2YWwpIHtcblx0ICAgIHZhciBvYiA9IHRoaXMuX19vYl9fXG5cdCAgICBpZiAoIW9iKSB7XG5cdCAgICAgIHRoaXNba2V5XSA9IHZhbFxuXHQgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIGlmIChfLmlzUmVzZXJ2ZWQoa2V5KSkge1xuXHQgICAgICBfLndhcm4oJ1JlZnVzZWQgdG8gJGFkZCByZXNlcnZlZCBrZXk6ICcgKyBrZXkpXG5cdCAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkgcmV0dXJuXG5cdCAgICBvYi5jb252ZXJ0KGtleSwgdmFsKVxuXHQgICAgaWYgKG9iLnZtcykge1xuXHQgICAgICB2YXIgaSA9IG9iLnZtcy5sZW5ndGhcblx0ICAgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICAgIHZhciB2bSA9IG9iLnZtc1tpXVxuXHQgICAgICAgIHZtLl9wcm94eShrZXkpXG5cdCAgICAgICAgdm0uX2RpZ2VzdCgpXG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIG9iLm5vdGlmeSgpXG5cdCAgICB9XG5cdCAgfVxuXHQpXG5cblx0LyoqXG5cdCAqIERlbGV0ZXMgYSBwcm9wZXJ0eSBmcm9tIGFuIG9ic2VydmVkIG9iamVjdFxuXHQgKiBhbmQgZW1pdHMgY29ycmVzcG9uZGluZyBldmVudFxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG5cdCAqIEBwdWJsaWNcblx0ICovXG5cblx0Xy5kZWZpbmUoXG5cdCAgb2JqUHJvdG8sXG5cdCAgJyRkZWxldGUnLFxuXHQgIGZ1bmN0aW9uICRkZWxldGUgKGtleSkge1xuXHQgICAgdmFyIG9iID0gdGhpcy5fX29iX19cblx0ICAgIGlmICghb2IpIHtcblx0ICAgICAgZGVsZXRlIHRoaXNba2V5XVxuXHQgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIGlmIChfLmlzUmVzZXJ2ZWQoa2V5KSkge1xuXHQgICAgICBfLndhcm4oJ1JlZnVzZWQgdG8gJGFkZCByZXNlcnZlZCBrZXk6ICcgKyBrZXkpXG5cdCAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgICAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHJldHVyblxuXHQgICAgZGVsZXRlIHRoaXNba2V5XVxuXHQgICAgaWYgKG9iLnZtcykge1xuXHQgICAgICB2YXIgaSA9IG9iLnZtcy5sZW5ndGhcblx0ICAgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICAgIHZhciB2bSA9IG9iLnZtc1tpXVxuXHQgICAgICAgIHZtLl91bnByb3h5KGtleSlcblx0ICAgICAgICB2bS5fZGlnZXN0KClcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgb2Iubm90aWZ5KClcblx0ICAgIH1cblx0ICB9XG5cdClcblxuLyoqKi8gfVxuLyoqKioqKi8gXSlcbn0pO1xuIiwiLyoqXG4gKiBGYWNlYm9vayBsb2dpbiBvbiBoZWFkZXJcbiAqL1xudmFyIFZ1ZSA9IHJlcXVpcmUoXCIuLy4uLy4uLy4uLy4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvdnVlL2Rpc3QvdnVlLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZ1ZS5leHRlbmQoe1xuXG4gICAgdGVtcGxhdGU6IFwiI2x1bmNoLWxvZ2luLXRtcGxcIixcblxuICAgIGRhdGE6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmYlBhcmFtOiB7XG4gICAgICAgICAgICAgICAgYXBwSWQgICAgICA6ICcxNDM3NDgxMDMzMTc2Njk0JyxcbiAgICAgICAgICAgICAgICB4ZmJtbCAgICAgIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uICAgIDogJ3YyLjEnXG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIGluaXRpYWxpemVkOiBmYWxzZSxcbiAgICAgICAgICAgIGxvZ2dlZEluOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBjcmVhdGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLiRvbihcImZiUmVhZHlcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIEZCLmluaXQodGhpcy5mYlBhcmFtKTtcbiAgICAgICAgICAgIEZCLmdldExvZ2luU3RhdHVzKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5zdGF0dXNDaGFuZ2VDYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgdGhhdC5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgbG9naW46IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICBGQi5sb2dpbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICAgICAgdGhhdC5zdGF0dXNDaGFuZ2VDYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICAgICAgICB9LCB7c2NvcGU6ICdwdWJsaWNfcHJvZmlsZSx1c2VyX2ZyaWVuZHMnfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9nb3V0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgRkIubG9nb3V0KGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5zdGF0dXNDaGFuZ2VDYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBzdGF0dXNDaGFuZ2VDYWxsYmFjazogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcpe1xuICAgICAgICAgICAgICAgIEZCLmFwaSgnL21lJywgZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJHBhcmVudC5tZSA9IHJlcztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LiRwYXJlbnQuYWNjZXNzVG9rZW4gPSByZXNwb25zZS5hdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW47XG4gICAgICAgICAgICAgICAgdGhhdC4kcGFyZW50Lm1lID0ge2lkOiByZXNwb25zZS5hdXRoUmVzcG9uc2UudXNlcklEfTtcbiAgICAgICAgICAgICAgICB0aGF0LmxvZ2dlZEluID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGF0LiRkaXNwYXRjaChcImZiT25Mb2dpblwiLCByZXNwb25zZSk7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoYXQubG9nZ2VkSW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGF0LiRkaXNwYXRjaChcImZiT25Mb2dvdXRcIiwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7IiwiLyoqXG4gKiBnZXR0aW5nIHN0YXJ0ZWRcbiAqL1xuKGZ1bmN0aW9uKGdsb2JhbCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIFxuICAgIHZhciBWdWUgPSByZXF1aXJlKFwiLi8uLi8uLi8uLi8uLi9ib3dlcl9jb21wb25lbnRzL3Z1ZS9kaXN0L3Z1ZS5qc1wiKTtcbiAgICB2YXIgdnVlRmlsdGVycyA9IHJlcXVpcmUoXCIuL2ZpbHRlci9maWx0ZXJzXCIpO1xuICAgIHZhciBsb2dpbkNvbXBvbmVudCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudC9sb2dpblwiKTtcblxuICAgIHZhciBhcHAgPSBtb2R1bGUuZXhwb3J0cyA9IG5ldyBWdWUoe1xuXG4gICAgICAgIGVsOiAnI2FwcCcsXG5cbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbWU6IG51bGwsXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbjogbnVsbCxcbiAgICAgICAgICAgIG1haW5QYW5lbDogXCJcIlxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIFwibHVuY2gtbG9naW5cIjogbG9naW5Db21wb25lbnRcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuJG9uKFwiZmJPbkxvZ2luXCIsIGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJG9uKFwiZmJPbkxvZ291dFwiLCBmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBnbG9iYWwuZmJBc3luY0luaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgYXBwLiRicm9hZGNhc3QoXCJmYlJlYWR5XCIpO1xuICAgIH07XG59KSh3aW5kb3cpOyIsIi8qKlxuICogRmlsdGVyc1xuICovXG52YXIgVnVlID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vLi4vLi4vYm93ZXJfY29tcG9uZW50cy92dWUvZGlzdC92dWUuanNcIik7XG5cblZ1ZS5maWx0ZXIoJ2ZiVXNlckltYWdlRmlsdGVyJywgZnVuY3Rpb24gKGlkKSB7XG4gICAgcmV0dXJuIFwiaHR0cDovL2dyYXBoLmZhY2Vib29rLmNvbS9cIiArIGlkICsgXCIvcGljdHVyZT90eXBlPXNxdWFyZVwiO1xufSk7Il19
