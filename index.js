const win = require('active-win');
const { app, BrowserWindow, globalShortcut, screen, ipcMain } = require('electron');
const { exec } = require('child_process');
require('dotenv').config()

const Window = require('./src/Window');

console.log(process.env);

let startTyping = false;
let valueTyping = '';
let promptWindow;


ipcMain.handle('sentResearch', function (event, data) {
    console.log(data);
    return data;
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
            exec('python3 ./worker.py', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing worker.py: ${error}`);
                    return;
                }



                const position = screen.getCursorScreenPoint();
                position.x += 30;
                position.y += 80;

                const win = Window.createWindow({ _id: 'promptInput', position});
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
