const mqtt = require('mqtt');
const express = require('express');

const app = express();
app.use(express.json());

app.post('/connect', (req, res) => {
  const brokerUrl = req.body.brokerURL;
  const username = req.body.username;
  const password = req.body.password;
  const topics = req.body.topics;
  
  const options = {
    username: username,
    password: password,
  };
 
  const client = mqtt.connect(brokerUrl, options);
  
  client.on('connect', () => {
    console.log('Connected to MQTT broker');
   
      client.subscribe(topics, { qos: 0 }, (err) => {
        if (err) {
          console.error('Error while subscribing:', err);
        } else {
          console.log('Subscribed to topic:', topics);
        }
      });
  

    res.send('Connected to MQTT broker');
  });
  console.log(brokerUrl);
  console.log(options);
  console.log(topics);

  client.on('message', (topic, message) => {
    const topicParts = topic.split('/');
    const receivedTopic = topicParts[topicParts.length - 1];
    console.log('Received message on topic', receivedTopic, ':', message.toString());
  });

  client.on('error', (error) => {
    console.error('MQTT error:', error);
  });

  client.on('close', () => {
    console.log('Connection closed');
    client.end();
  });
});

app.listen(3000, () => {
  console.log('Server running ');
});
