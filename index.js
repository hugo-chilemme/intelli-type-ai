const win = require('active-win');
const { app, BrowserWindow, globalShortcut, screen, ipcMain } = require('electron');
const { exec } = require('child_process');

let startTyping = false;
let valueTyping = '';
let promptWindow;


ipcMain.handle('sentResearch', function (event, data) {
    console.log(data);
    return data;
});


function createWindow({ x, y }) {
    promptWindow = new BrowserWindow({
        width: 375,
        height: 70,
        resizable: false, // Lock resize
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: false,
        },
        titleBarStyle: 'hidden',
        borderRadius: '35px',
        transparent: true,
        alwaysOnTop: true,
        // focusable: false,
    });


    promptWindow.setPosition(x - 30, y - 80);

    promptWindow.loadFile('./src/uxs/index.html');

    // promptWindow.openDevTools();

    function closeWindow() {
        startTyping = false;
        valueTyping = '';
        promptWindow.close();
    }

    // promptWindow.on('blur', closeWindow);

    globalShortcut.register('Esc', closeWindow);
}

console.log(global);
app.whenReady().then(() => {
	// Register global shortcut for Windows + C
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
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                createWindow(screen.getCursorScreenPoint());
            });
            
			// Use the cursor position as needed
		}
	});

	
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit app when all windows are closed
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
