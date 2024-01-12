
let connectionData = [];
let existingConnection = false;
let connectionId;
fetch('data.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    connectionData = data.flat();
    connectionData.forEach(function(connection) {
      addNewConnectionList(connection.connection.name);
    });
  })
  .catch(function(error) {
    console.log(error);
  });
function addNewConnectionList(connectionName) {
 
  let newConnection = document.createElement("li");
  newConnection.classList.add("flex", "items-center", "text-center", "px-5", "justify-between", "py-2", "hover:bg-yellow-100",);
  newConnection.innerHTML = `
    <span class="truncate text-sm text-gray-600 cursor-pointer con_name">${connectionName}</span>
    <button class="del_list  text-orange-400 text-xs hover:text-orange-500" onclick="deleteConnectionList(event)">
      <i class="fas fa-trash"></i>
    </button>
  `;
  let connectionList = document.getElementById("connectionList");
  connectionList.appendChild(newConnection);

  newConnection.onclick = function newclick () {
    const connection = connectionData.find(function(conn) {
      return conn.connection.name === connectionName;
    });
    if(connection){
      document.getElementById("name").value = connection.connection.name;

      if (connection.connection.name === connectionName) {
        existingConnection = true;
      }
    
      let connectionNameInput = document.getElementById("name");
      console.log(existingConnection);
      if (existingConnection) {
        connectionNameInput.disabled = true;
      } else {
        connectionNameInput.disabled = false;
      }
      document.getElementById("clientId").value = connection.connection.clientId;
      document.getElementById("pro").value = connection.connection.protocol;
      document.getElementById("host").value = connection.connection.host;
      document.getElementById("port").value = connection.connection.port;
      document.getElementById("user").value = connection.connection.username;
      document.getElementById("passw").value = connection.connection.password;
      const topics = connection.connection.topics;
      const topicsList = document.getElementById("topics-list");
      topicsList.innerHTML = "";
      
        topics.forEach(function (topic) {
        const topicItem = document.createElement("li");
        topicItem.textContent = topic;
      
          const deleteButton = document.createElement("button");
          deleteButton.innerHTML = '<i class="text-xs text-[#FF9800] fas fa-trash justify-end"></i>';
          deleteButton.classList.add('float-right', 'ml-2',  'cursor-pointer','text-xs');

          deleteButton.classList.add('delete-topic');
          deleteButton.addEventListener("click", function() {
            deleteTopic(topic);
          });
      
          topicItem.appendChild(deleteButton);
          topicsList.appendChild(topicItem);
        });
      }
  
      
      const certificates = connection.connection.certificates;

      if (certificates) {
        document.getElementById("file-name1").textContent = certificates.serverCertificate;
        document.getElementById("file-name2").textContent = certificates.clientCertificate;
        document.getElementById("file-name3").textContent = certificates.clientKey;
      }
     
      document.getElementById("cert").checked = connection.connection.validateCertificate;
      document.getElementById("encrypt").checked = connection.connection.encryption;


      const sidebar = document.getElementById('side');
    if (sidebar) {
      sidebar.classList.add('hidden'); 
    }
    }
  };
  

function deleteConnectionList(event) {
  event.stopPropagation();

  const confirmDelete = confirm('Are you sure you want to delete the connection?');

  if (confirmDelete) {
    const connectionListElement = event.target.parentNode.parentNode;
    const connectionNameElement = connectionListElement.querySelector('.truncate');

    if (connectionNameElement) {
      const connectionName = connectionNameElement.textContent;
      const index = connectionData.findIndex(connection => connection.connection.name === connectionName);
      if (index !== -1) {
        window.Bridge.deleteConnection(connectionName);
        connectionData.splice(index, 1);
        connectionListElement.remove();
      }
      toastr.success('Deleted Successfully');
    }
  } else {
    toastr.info('Deletion cancelled.', 'Info');
  }
}
const plusButton = document.getElementById('plus-button');
plusButton.addEventListener('click', function() {

const Input = document.querySelectorAll('input[name="connection-name"]')[0];
 Input.value ='';
 Input.placeholder = 'New Connection';
 document.getElementById("clientId").value = '';
 
 document.getElementById("clientId").disabled = true;
document.querySelectorAll('input[name="host"]')[0].value = '';
document.querySelectorAll('input[name="port"]')[0].value = '';
document.querySelectorAll('input[name="validate-cert"]')[0].checked = false;
document.querySelectorAll('input[name="encrypt"]')[0].checked = false;
document.querySelectorAll('input[name="user"]')[0].value = '';
document.querySelectorAll('input[name="pass"]')[0].value = '';
const topicsList = document.getElementById("topics-list");
topicsList.innerHTML = '';
document.getElementById('file-name1').textContent = '';
document.getElementById('file-name2').textContent = '';
document.getElementById('file-name3').textContent = '';
existingConnection = false;
console.log(existingConnection);
   Input.disabled = false;
});
function toggleBox() {
    var box = document.getElementById("myBox");
    let certificateButton = document.getElementById("certificateButton");
    
    if (box.style.display === "block") {
      box.style.display = "none";
      certificateButton.innerText = "Certificates";
      certificateButton.innerHTML = '<i class="fas fa-award  mr-2"></i>Certificates';
    } else {
      box.style.display = "block";
      certificateButton.innerText = "Advanced";
      certificateButton.innerHTML = '<i class="fas fa-code mr-2"></i>Advanced';
   
    }
  }
    function updateFileName(fileNameId, fileId, deleteIconId) {
    const fileInput = document.getElementById(fileId);
  
    const fileName = fileInput.value.split(/\\|\//).pop();
    const fileSize = fileInput.files[0].size / 1024; 
    if (fileSize > 200) {
      alert("File size must be less than or equal to 200 KB");
      fileInput.value = "";
      document.getElementById(fileNameId).textContent = "";
      document.getElementById(deleteIconId).classList.add("hidden");
      return;
    }
    document.getElementById(fileNameId).textContent = fileName;
    document.getElementById(deleteIconId).classList.remove("hidden");
  }
    function deleteFile(fileNameId, fileId, deleteIconId) {
      document.getElementById(fileNameId).textContent = "";
      document.getElementById(fileId).value = "";
      document.getElementById(deleteIconId).classList.add("hidden");
    }
    let topics = [];
    function addTopic() {
      let topic = document.getElementById("topic-input").value;
      if (topic !== "") {
        topics.push(topic);
        updateTopics();
      }
      document.getElementById("topic-input").value = "";
    }
    
    function deleteTopic(index) {
      topics.splice(index, 1);
      updateTopics();
    }   
    function updateTopics() {
      let topicsList = document.getElementById("topics-list");
      topicsList.innerHTML = "";    
      topics.forEach(function (topic) {
        let li = document.createElement("li");
        li.textContent = topic;
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add(
          "text-orange-400",
          "hover:text-orange-500",
          "float-right",
          "ml-2",
          "cursor-pointer",
          "text-xs"
        );
        deleteButton.addEventListener("click", function () {
          deleteTopic(topic);
        });
        li.appendChild(deleteButton);
        topicsList.appendChild(li);
      });
    }
    updateTopics();
    function toggleSidebar() {
      const sidebar = document.getElementById('side');
      sidebar.classList.toggle('hidden');
    }
  
    document.getElementById('drop-down').addEventListener('click', toggleSidebar);
  
    document.addEventListener('click', (event) => {
      const sidebar = document.getElementById('side');
      const dropdown = document.getElementById('drop-down');
  
      if (!dropdown.contains(event.target) && !sidebar.contains(event.target)) {
        sidebar.classList.add('hidden');
      }
    });
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('passw');
const passwordIcon = document.getElementById('passwordIcon');

togglePassword.addEventListener('click', function () {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordIcon.classList.remove('fa-eye-slash');
    passwordIcon.classList.add('fa-eye');
  } else {
    passwordInput.type = 'password';
    passwordIcon.classList.remove('fa-eye');
    passwordIcon.classList.add('fa-eye-slash');
  }
});
function generateUniqueId() {
  return "HF-" + Math.random().toString(16).slice(2);
}

const saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', function () {
  let connectionId = document.getElementById("clientId").value;
  const isNewConnection = (connectionId === "" || connectionId === null);

  if (isNewConnection) {
    connectionId = generateUniqueId();
    document.getElementById("clientId").value = connectionId;
  }
  
  const connectionName = document.querySelectorAll('input[name="connection-name"]')[0].value;
  const protocol = document.querySelectorAll('select[name="protocol"]')[0].value;
  const host = document.querySelectorAll('input[name="host"]')[0].value;
  const port = document.querySelectorAll('input[name="port"]')[0].value;
  const validateCertificate = document.querySelectorAll('input[name="validate-cert"]')[0].checked;
  const encryption = document.querySelectorAll('input[name="encrypt"]')[0].checked;
  const username = document.querySelectorAll('input[name="user"]')[0].value;
  const password = document.querySelectorAll('input[name="pass"]')[0].value;
  const topics = getTopics(); 
  const serverCertificateFile = document.getElementById('certificate-file1').files[0]?.path;
  const clientCertificateFile = document.getElementById('certificate-file2').files[0]?.path;
  const clientKeyFile = document.getElementById('certificate-file3').files[0]?.path;

  function getTopics() {
    let topicsList = document.getElementById("topics-list");
    let topics = [];
    for (let i = 0; i < topicsList.children.length; i++) {
      let topic = topicsList.children[i].textContent;
      topics.push(topic);
    }
    return topics;
  }
  if (connectionName == "" || connectionName == null) {
    toastr.error("Connection Name must be filled out");
    return false;
  }
  if(connectionId ==="" || connectionId === null )
  {
     document.getElementById("clientId").disabled = true; 
  }
 
  const connection = {
    clientId: connectionId,
    name: connectionName,
    protocol: protocol,
    host: host,
    port: port,
    validateCertificate: validateCertificate,
    encryption: encryption,
    username: username,
    password: password,
    topics: topics,
    certificates: {
      serverCertificate: serverCertificateFile,
      clientCertificate: clientCertificateFile,
      clientKey: clientKeyFile 
    }
  };
 
    const existingConnectionIndex = connectionData.findIndex(function(conn) {
    return conn.connection.name === connectionName;
  });
  console.log(existingConnectionIndex);
  
  if (existingConnectionIndex !== -1) {
    
    connectionData[existingConnectionIndex].connection = connection;
    console.log(connection);
    window.Bridge.updateConnection(connection);
  toastr.success("Updated Successfully");
  } else { 
    
    window.Bridge.saveData(connection);
    toastr.success("Connection Saved Successfully");  
  }
   
});


const connectButton = document.getElementById('connect-btn');

connectButton.addEventListener('click', () => {
  const username = document.querySelectorAll('input[name="user"]')[0].value;
  const password = document.querySelectorAll('input[name="pass"]')[0].value;
  const protocol = document.querySelectorAll('select[name="protocol"]')[0].value;
  const host = document.querySelectorAll('input[name="host"]')[0].value;
  const port = document.querySelectorAll('input[name="port"]')[0].value;

  const brokerURL = `${protocol}://${host}:${port}/`;

  const topicsList = document.getElementById("topics-list");
  const topics = Array.from(topicsList.children).map((topicItem) => topicItem.textContent);

  fetch('http://localhost:3000/connect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ brokerURL, topics, username, password }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error connecting to MQTT server');
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error connecting to MQTT server:', error);
    });
});
