const root = document.documentElement;
const form = document.querySelector('form[name="appearance"]');

// Слайдер
let hueRange = () => {
	let _this = {
		input: document.querySelector('.range__slider#hue'),
		hueDefault: getComputedStyle(root).getPropertyValue('--hue'),
		setHue: () => {
			root.style.setProperty('--hue', _this.input.value);
		},
		setDefault: () => {
			_this.input.value = _this.hueDefault;
			_this.setHue();
		}
	}

	_this.input.addEventListener('input', function(){
		_this.setHue();
	});

	return _this;
}

// Переключение темы
let themeSwitcher = () => {
	let _this = {
		options: document.querySelectorAll('input[name="theme"]'),
		themeDefault: root.dataset.theme,
		setTheme: (theme) => {
			root.dataset.theme = theme;
		},
		setDefault: () => {
			console.log('default theme is' + _this.themeDefault);
			root.querySelector('input[name="theme"][value="'+_this.themeDefault+'"]').checked = true;
			_this.setTheme(_this.themeDefault);
		}
	}

	if(_this.options) {
		_this.options.forEach(option => {
			option.addEventListener('change', () => {
				if(option.checked) _this.setTheme(option.value);
			});
		});
	}

	return _this;
}

// Переключение округлости
let roundnessSwitcher = () => {
	let _this = {
		options: document.querySelectorAll('input[name="roundness"]'),
		roundnessDefault: root.dataset.roundness,
		setRoundness: (roundness) => {
			root.dataset.roundness = roundness;
		},
		setDefault: () => {
			root.querySelector('input[name="roundness"][value="'+_this.roundnessDefault+'"]').checked = true;
			_this.setRoundness(_this.roundnessDefault);
		}
	}

	if(_this.options) {
		_this.options.forEach(option => {
			option.addEventListener('change', () => {
				if(option.checked) _this.setRoundness(option.value);
			});
		});
	}

	return _this;
}

if(form) {
	let hueControl = hueRange();
	let themeControl = themeSwitcher();
	let roundnessControl = roundnessSwitcher();

	console.log(roundnessControl);

	document.addEventListener('DOMContentLoaded', () => {
		hueControl.setDefault();
		themeControl.setDefault();
		roundnessControl.setDefault();
	});

	form.addEventListener('reset', (e) => {
		e.preventDefault();
		hueControl.setDefault();
		themeControl.setDefault();
		roundnessControl.setDefault();
	});
}