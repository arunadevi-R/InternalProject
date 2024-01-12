const { contextBridge, ipcRenderer } = require('electron');


let dataArray = [];

let saveData = (connection) => {
  let data = {connection};

  if (!dataArray) {
    dataArray = [];
  }
  dataArray.push(data);
  ipcRenderer.send("saveData", dataArray);
};
let deleteConnection = (connectionName) => {
  ipcRenderer.send("deleteConnection", connectionName);
};
let updateConnection = (updatedConnection) => {
  ipcRenderer.send("updateConnection", { connection: updatedConnection });
};

let bridge = {
  saveData,
   deleteConnection,
   updateConnection
};


contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
contextBridge.exposeInMainWorld("Bridge", bridge);
