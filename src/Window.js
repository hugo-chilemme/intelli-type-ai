

const Windows = new Map();
const WindowsComponents = require('./lib/WindowsComponents');
const { BrowserWindow } = require('electron')

function getWindow(_id)
{

	return Windows.get(_id);

}


function createWindow({_id, position})
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

		return window;
	
	}

	throw new Error('Window not found: ' + _id);

}


module.exports = { createWindow, getWindow }