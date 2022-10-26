const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: 'http://localhost:9200' });

client.sql
  .query({
    body: {
      query: "SELECT * FROM \"person\" WHERE name like '%Ms.%'",
    },
  })

  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err.body);
  });
