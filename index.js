function SelfVue(data, el, exp) {
	let self = this
	this.data = data
	Object.keys(data).forEach(function(key) {
		self.proyKeys(key)
	})
	observer(data)
	el.innerHTML = this.data[exp]
	new Watcher(this, exp, function(value, oldVal) {
		console.log(6, value, oldVal)
		el.innerHTML = value
	})
	return this
}
SelfVue.prototype = {
	proyKeys: function(key) {
		let self = this
		Object.defineProperty(this, key, {
			enumerable: false,
			configurable: true,
			get: function proxyGetter() {
				return self.data[key]
			},
			set: function proxySetter(newVal) {
				self.data[key] = newVal
			}
		})
	}
}