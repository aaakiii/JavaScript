const inputs = document.querySelectorAll('.controls input');
function hadleUpdate() {
	const suffix = this.dataset.sizing || '';
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
	

}

inputs.forEach(inout => inout.addEventListener('change', hadleUpdate));
inputs.forEach(inout => inout.addEventListener('mousemove', hadleUpdate));