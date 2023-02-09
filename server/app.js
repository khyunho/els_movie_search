const express = require('express');
// const fs = require('fs')
const app = express();
const port = 4000;

const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
    hosts: ["https://elastic:q1w2e3@localhost:9200"]
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
                match_phrase: {
                    "movie.name.name_jamo": req.query.apple
                }
            }
        }
    });
    res.send(result.hits.hits);
    console.log(result.hits.hits);
})

app.get('/api/jamo', async (req, res) => {
    // res.send("Hello World!");
    const result = await client.search({
        index: 'movie-data-nn',
        body: {
            "suggest": {
                "name_suggest": {
                    "text": req.query.apple,
                    "term": {
                        "field": "movie.name.jamo",
                        "max_edits": 2
                    }
                }
            }
        }
    });
    res.send(result);
    console.log(result);
})

app.get('/api/nameJamo', async (req, res) => {
    // res.send("Hello World!");
    const result = await client.search({
        index: 'movie-data-nn',
        body: {
            "suggest": {
                "name_suggest": {
                "text": req.query.apple,
                "term": {
                    "field": "movie.name.name_jamo",
                    "max_edits": 2
                    }
                }
            }
        }
    });
    res.send(result.suggest.name_suggest);
    console.log(result.suggest.name_suggest);
})

app.listen(port, () => {
    console.log(port);
});

