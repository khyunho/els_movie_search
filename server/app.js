const express = require('express');
const fs = require('fs')
const app = express();
const port = 4000;

const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
    hosts: ["https://elastic:aY6T+PXzt78pCuN8V8he@localhost:9200"]
    // node: 'https://172:9200',
    // auth: {
    //     username: 'elastic',
    //     password: 'aY6T+PXzt78pCuN8V8he'
    // },
    // tls: {
    //     ca: fs.readFileSync('/Users/gimhyeonho/http_ca.crt'),
    //     rejectUnauthorized: false
    // }
    // hosts: ["http://localhost:9200"]
  //프로토콜이 https이고 elasticsearch에 id, password가 있다면
  //hosts: ["https://es_id:es_pass@localhost:9200"]
});

app.get('/api/search', async (req, res) => {
    // res.send("Hello World!");
    const result = await client.search({
        index: 'movie-data-nn',
        body: {
            size: 10000,
            query: {
                match: {
                    "movie.name.nori": req.query.apple
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

