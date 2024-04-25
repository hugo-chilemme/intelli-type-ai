const win = require('active-win');
const { app, BrowserWindow, globalShortcut, screen, ipcMain } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const openai = require('openai');
const { generateResponse } = require('./src/openai');
require('dotenv').config();

const ncp = require('copy-paste');
const Window = require('./src/Window');

let startTyping = false;
let valueTyping = '';
let promptWindow;

ipcMain.on('setToken', (event, token) => {
    fs.writeFileSync(path.join(__dirname, '.env'), `OPENAI_API_KEY=${token}`);
    require('dotenv').config();
    process.env.OPENAI_API_KEY = token;

    const win = Window.getWindow('tokenInput');

    handleStart();
    win.close();

    // Continue with your application logic...
});


ipcMain.on('sentResearch', async (event, data) => {
    console.log(data);
    generateResponse(data);
    return data;

});

ipcMain.on('close-prompt', function (event, data) {
    const win = Window.getWindow('promptInput');
    win.hide();
    return true;
});

async function handleStart()
{

    if (process.env.OPENAI_API_KEY === undefined)
    {

        return Window.createWindow({_id: 'tokenInput'});

    }



	globalShortcut.register('Alt+i', async () => {
		const activeWin = await win();

		if (activeWin && activeWin.title !== 'intelli-type-ai') {

            exec(__dirname + '/src/exe/copyClipboard.exe', (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
           
                const position = screen.getCursorScreenPoint();
                position.x = 0;
                position.y = 0;


                let win = Window.getWindow('promptInput');

                if (win)
                {
                    win.show();
                    win.focus();
                    win.webContents.send('onReady', stdout.trim());
                    return;
                }

                win = Window.createWindow({ _id: 'promptInput', position, data: { text: stdout.trim() } });

                win.focus();
            });

©

		}
	});

	
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});

}


app.whenReady().then(handleStart);
