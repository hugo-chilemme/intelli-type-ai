

const Windows = new Map();
const WindowsComponents = require('./lib/WindowsComponents');
const { BrowserWindow } = require('electron')

function getWindow(_id)
{

	return Windows.get(_id);

}


function createWindow({_id, position, data})
{

	if (WindowsComponents.has(_id))
	{

		const window = new BrowserWindow(WindowsComponents.get(_id));
		
		if (position)
		{

			window.setPosition(position.x, position.y);

		}

		Windows.set(_id, window);

		window.loadFile(`./src/uxs/${_id}.html`);

		if (data)
		{
			window.webContents.once('did-finish-load', () => {
				window.webContents.send('onReady', data);
				window.focus();
				window.maximize();
			});
		}


		return window;
	
	}

	throw new Error('Window not found: ' + _id);

}


module.exports = { createWindow, getWindow }