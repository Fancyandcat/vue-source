// new SelfVue({
// 	name: 'hello world'
// }, ele, 'name')
// function SelfVue(data, el, exp)
// new Watcher(this, exp, function(value) {
// 	el.innerHTML = value
// })
function Watcher(vm, exp, cb){
	this.cb = cb
	this.vm = vm
	this.exp = exp
	this.value = this.get()
}
Watcher.prototype = {
	update: function() {
		this.run()
	},
	run: function() {
		let value = this.vm.data[this.exp]
		let oldVal = this.value
		if (value !== oldVal) {
			this.value = value
			this.cb.call(this.vm, value, oldVal)
		}
	},
	get: function() {
		Dep.target = this
		let value = this.vm.data[this.exp]
		Dep.target = null
		return value
	}
}