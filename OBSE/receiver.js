const amqp = require("amqplib/callback_api");
const fs = require("fs");

setTimeout(() => {
    fs.unlink("../data/data.txt", (error) => {
        // Deletes old data if it exists
        amqp.connect("amqp://rabbit:5672", (amqp_error, connection) => {
            if (amqp_error) {
                throw amqp_error;
            }

            connection.createChannel((connection_error, channel) => {
                if (connection_error) {
                    throw connection_error;
                }

                const exchange = "my_topics";
                channel.assertExchange(exchange, "topic", {
                    durable: false
                });

                channel.assertQueue("", {
                    exclusive: true
                }, (queue_error, queue) => {
                    if (queue_error) {
                        throw queue_error;
                    }

                    channel.bindQueue(queue.queue, exchange, "my.i");
                    channel.bindQueue(queue.queue, exchange, "my.o");
                    channel.consume(queue.queue, (message) => {
                        const date = new Date();
                        const text = date.toISOString() + " Topic " + message.fields.routingKey
                            + ": " + message.content.toString() + "\n";
                        fs.appendFile("../data/data.txt", text, (write_error) => {
                            if (write_error) {
                                throw write_error;
                            }
                        });
                    }, {
                        noAck: true
                    })
                });
            })
        });
    });
}, 15000);
