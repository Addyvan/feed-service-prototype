var amqp = require('amqplib/callback_api');

function sendMessageToRabbitMQ(queueName, msg) {
  amqp.connect('amqp://user:bitnami@localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {

      ch.assertQueue(queueName, {durable: false});
      ch.sendToQueue(queueName, Buffer.from(msg));
      console.log(" [x] Sent %s", msg, " to RabbitMQ");

    });
    setTimeout(function() { conn.close(); }, 500);
  });
}

module.exports = sendMessageToRabbitMQ;