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
            const key = "my.o";
            channel.assertExchange(exchange, "topic", {
                durable: false
            });

            setTimeout(() => {
                for (let i = 1; i < 4; ++i) {
                    const message = "MSG_" + i;
                    setTimeout(() => {
                        channel.publish(exchange, key, Buffer.from(message));
                    }, i*3000);
                }
            }, 3000);
        })
    });
}, 15000);
