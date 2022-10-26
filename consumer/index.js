const { Kafka } = require("kafkajs");

const PRODUCER_ID = "PRODUCER_ID";

const elastic = require("elasticsearch");

const BROKERS = ["kafka:9092"];

const TOPIC = "message-log";

const kafkaInstance = new Kafka({ groupId: PRODUCER_ID, brokers: BROKERS });

const consumer = kafkaInstance.consumer({ groupId: PRODUCER_ID });

const elasticClient = elastic.Client({
  host: "http://elastic_search:9200",
});

const create = async ({ name, eventId, age }) => {
  console.log("chegou aqui", { name, eventId, age });
  return await elasticClient
    .index({
      index: "person",
      body: {
        name,
        eventId,
        age,
      },
    })
    .then(() => {
      console.log({ message: "PERSON_CREATED" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const consume = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value);
      console.table(data);
      create(data);
    },
  });
};

(() => {
  consume().catch((error) => {
    console.table(error);
  });
})();
