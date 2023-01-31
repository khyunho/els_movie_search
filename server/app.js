const express = require('express');
const app = express();
const port = 4000;

const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
  hosts: ["http://localhost:9200"]
  //프로토콜이 https이고 elasticsearch에 id, password가 있다면
  //hosts: ["https://es_id:es_pass@localhost:9200"]
});

app.get('/', async (req, res) => {

    // res.send("Hello World!");
    const result = await client.search({
        index: 'movie-data-nn',
        body: {
            query: {
                match: {
                    "movie.name": "해리"
                }
            }
        }
    });
    res.send(result.hits.hits);
    console.log(result.hits.hits);
})

app.listen(port, () => {
    console.log(port);
});



// async function test() {
//   try {
//     const rs =  await client.search({
//       index: 'movie-data-nn',
//         query: {
//           match_all : { }
//       }
//     });
//     console.log(rs);
//   } catch (err) {
//     console.error(err);
//   }
// }
// test();
