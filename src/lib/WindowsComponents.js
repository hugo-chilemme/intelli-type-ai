

const options = new Map();


options.set('promptInput', {
	width: 375,
	height: 70,
	resizable: false,
	webPreferences: {
		nodeIntegration: true,
		contextIsolation: false,
		enableRemoteModule: false,
	},
	titleBarStyle: 'hidden',
	borderRadius: '35px',
	transparent: true,
	alwaysOnTop: false
})


options.set('tokenInput', {
	width: 500,
	height: 600,
	resizable: false,
	webPreferences: {
		nodeIntegration: true,
		contextIsolation: false,
		enableRemoteModule: false,
	},
	titleBarStyle: 'hidden',
	alwaysOnTop: false
})

module.exports = options;