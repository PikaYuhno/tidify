import { app, BrowserWindow } from 'electron';
import { createWindow } from './window';

let win: BrowserWindow | null = null;

app.allowRendererProcessReuse = true;

app.on('ready', async () => {
    win = await createWindow(app);
});

app.on('window-all-closed', () => {
        app.quit();
});

app.on('activate', async () => {
    if (!win) {
        win = await createWindow(app);
        win.on('closed', () => {
            win = null;
        });
    }
});
