import { App, BrowserWindow } from 'electron';

export const createWindow = async (app: App) => {

    const win = new BrowserWindow({
        width: 1280,
        height: 720,
    });

    win.loadURL("http://localhost:3000");

    win.removeMenu();

    return win;
};
