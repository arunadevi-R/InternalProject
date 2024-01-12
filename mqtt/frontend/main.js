const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
let mainWindow;
ipcMain.on('window-resize', (event, size) => {
  mainWindow.webContents.send('window-resize', size);
});
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 750,
    height: 450,
    resizable: true,
    frame: true,
    roundedCorners: true,
    cornerRadius: 50,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
ipcMain.on("saveData", (sender, data) => {
  let dataArray = [];
  try {
    if (fs.existsSync("data.json")) {
      let dt = fs.readFileSync("data.json");
      dataArray = JSON.parse(dt);
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  } 
       const conn = data.flat();
       dataArray.push(conn);
  console.log('saved successfully');
  fs.writeFileSync("data.json", JSON.stringify(dataArray, null, 2));
});


ipcMain.on("updateConnection", (event, updatedConnection) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.log('An error occurred while updating the connection:', err);
      return;
    }
    let dataArray = JSON.parse(data);
    const conn = dataArray.flat();
    const index = conn.findIndex(connection => connection.connection.name === updatedConnection.connection.name);
    console.log(index);
    if (index !== -1) { 
      if (conn[index].connection.name !== updatedConnection.connection.name) {
      
        conn.splice(index, 1);
        console.log(updatedConnection.connection.name);
      }
      conn[index] = updatedConnection;

      const newData = JSON.stringify(conn,null,2);
      
      fs.writeFile('data.json', newData, 'utf8', (err) => {
        if (err) {
          console.log('An error occurred while saving the data:', err);
        }
      });
    } 
  });
});


ipcMain.on('deleteConnection', (event, connectionName) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }
    let connectionData = JSON.parse(data);
    let conn = connectionData.flat();
    const index = conn.findIndex((connection) => connection.connection && connection.connection.name === connectionName);
    console.log(index);
    if (index !== -1) {
      conn.splice(index, 1);
     
      fs.writeFile('data.json', JSON.stringify(conn, null, 2), 'utf-8', (err) => {
        if (err) {
          console.error('Error writing JSON file:', err);
          return;
        }
        event.sender.send('connectionDeleted', connectionName);
      });
    }
  });
});


app.on('ready', createWindow);

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
