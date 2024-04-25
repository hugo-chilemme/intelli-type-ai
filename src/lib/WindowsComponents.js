

const options = new Map();


options.set('promptInput', {
	width: '100%',
	height: '100%',
	resizable: false,
	webPreferences: {
		nodeIntegration: true,
		contextIsolation: false,
		enableRemoteModule: false,
	},
	titleBarStyle: 'hidden',
	borderRadius: '35px',
	transparent: true,
	alwaysOnTop: true,
	fullscreen: true
});

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