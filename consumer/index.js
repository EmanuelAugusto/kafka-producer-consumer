const { Kafka } = require("kafkajs");

const PRODUCER_ID = "PRODUCER_ID";

const BROKERS = ["kafka:9092"];

const TOPIC = "message-log";

const kafkaInstance = new Kafka({ groupId: PRODUCER_ID, brokers: BROKERS });

const consumer = kafkaInstance.consumer({ groupId: PRODUCER_ID });

const consume = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC });
  await consumer.run({
    eachMessage: ({ message }) => {
      console.log(`received message: ${message.value}`);
    },
  });
};

(() => {
  consume().catch((error) => {
    console.log(error);
  });
})();
