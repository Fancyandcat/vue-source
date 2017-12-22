function defineReacttive(data, key, val) {
	observer(val) // 递归
	let dep = new Dep()
	Object.defineProperty(data, key, {
		enumerable: true,
		configurable: true,
		get: function() {
			if (Dep.target) {
				dep.addSub(Dep.target)
			}
			return val
		},
		set: function(newVal) {
			if (newVal === val) {
				return
			}
			val = newVal
			dep.untify()
		}
	})
}
Dep.target = null
function observer(data) {
	if (!data || typeof data !== 'object') {
		return
	}
	Object.keys(data).forEach((key) => {
		defineReacttive(data, key, data[key])
	})
}
function Dep() {
	this.subs = []
}
Dep.prototype = {
	addSub: function(sub) {
		this.subs.push(sub)
	},
	untify: function() {
		this.subs.forEach(function(sub) {
			sub.update()
		})
	}
}