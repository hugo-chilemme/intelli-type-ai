

const options = new Map();
const { screen, app } = require('electron')

let screenWidth = 1920;
let screenHeight = 1080;

app.whenReady().then(() => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	screenWidth = width;
	screenHeight = height;
});


options.set('promptInput', {
	width: screenWidth + 'px',
	height: screenHeight + 'px',
	resizable: true,
	webPreferences: {
		nodeIntegration: true,
		contextIsolation: false,
		enableRemoteModule: false,
	},
	titleBarStyle: 'hidden',
	borderRadius: '35px',
	transparent: true,
	alwaysOnTop: false,
	fullscreen: false
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