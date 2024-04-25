const win = require('active-win');
const { app, BrowserWindow, globalShortcut, screen, ipcMain } = require('electron');
const { exec } = require('child_process');
require('dotenv').config()

const ncp = require('copy-paste');
const Window = require('./src/Window');

let startTyping = false;
let valueTyping = '';
let promptWindow;


ipcMain.handle('sentResearch', function (event, data) {
    console.log(data);
    return data;
});

ipcMain.on('close-prompt', function (event, data) {
    const win = Window.getWindow('promptInput');
    win.close();
    return true;
});

async function handleStart()
{

    if (process.env.CHATGPT_TOKEN === undefined)
    {

        return Window.createWindow({_id: 'tokenInput'});

    }



	globalShortcut.register('Super+C', async () => {
		const activeWin = await win();

		if (activeWin && activeWin.title !== 'intelli-type-ai') {
			if (promptWindow) {
				promptWindow.close();
			}

            exec(__dirname + '/src/exe/copyClipboard.exe', (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
           
                const position = screen.getCursorScreenPoint();
                position.x = 0;
                position.y = 0;

                const win = Window.createWindow({ _id: 'promptInput', position, data: { text: stdout.trim() } });

                win.focus();
            });



		}
	});

	
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});

}


app.whenReady().then(handleStart);
	
// Quit app when all windows are closed
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
