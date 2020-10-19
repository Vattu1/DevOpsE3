const amqp = require("amqplib/callback_api");

setTimeout(() => {
    amqp.connect("amqp://rabbit:5672", (amqp_error, connection) => {
        if (amqp_error) {
            throw amqp_error;
        }

        connection.createChannel((connection_error, channel) => {
            if (connection_error) {
                throw connection_error;
            }

            const exchange = "my_topics";
            const incoming_key = "my.o";
            const outgoing_key = "my.i";
            channel.assertExchange(exchange, "topic", {
                durable: false
            });

            channel.assertQueue("", {
                exclusive: true
            }, (queue_error, queue) => {
                if (queue_error) {
                    throw queue_error;
                }

                channel.bindQueue(queue.queue, exchange, incoming_key);
                channel.consume(queue.queue, (incoming_message) => {
                    setTimeout(() => {
                        const message = "Got " + incoming_message.content.toString();
                        channel.publish(exchange, outgoing_key, Buffer.from(message));
                    }, 1000);
                }, {
                    noAck: true
                })
            });
        })
    });
}, 15000);
