const { Kafka } = require("kafkajs");
const { v4 } = require("uuid");
const { faker } = require("@faker-js/faker");

const PRODUCER_ID = "PRODUCER_ID";

const BROKERS = ["kafka:9092"];

const TOPIC = "message-log";

const kafkaInstance = new Kafka({ clientId: PRODUCER_ID, brokers: BROKERS });

const producer = kafkaInstance.producer();

const produce = async () => {
  await producer.connect();

  setInterval(async () => {
    await producer.send({
      topic: TOPIC,
      messages: [
        {
          key: v4(),
          value: JSON.stringify({
            eventId: v4(),
            userName: faker.name.fullName(),
          }),
        },
      ],
    });
  }, 2000);
};

(() => {
  produce().catch((error) => {
    console.log(error);
  });
})();
