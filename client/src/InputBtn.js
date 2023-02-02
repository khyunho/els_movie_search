import axios from 'axios'
import React, { useState } from 'react'

function InputBtn () {
  const [text, setText] = useState('')
  const [searchResult, setSearchResult] = useState([])
  // const [answer, setAnswer] = useState('')

  const onChangeText = (e) => {
    setText(e.target.value)
  }

  const onReset = () => {
    setText('')
  }

  const sendRequest = async () => {
    const result = await axios.get('/api/search',
      { params: { apple: text } }
    )
    const Arr = result.data
    const ArrMovieName = []
    // console.log(Arr)
    Arr.forEach((e, index) => {
      // console.log('foreach 도는중 : ' + index + e._source.movie.name)
      ArrMovieName[index] = e._source.movie.name
    })
    setSearchResult(ArrMovieName)
    // console.log(searchResult)
    // setSearchResult(result)
    // console.log(searchResult._source)
  }

  return (
      <div>
      <input onChange={onChangeText} value={text} />
        <button onClick={sendRequest}>전송</button>
        <button onClick={onReset}>초기화</button>
        <div>
          <b>검색 값: {text}</b>
        </div>
      <div id="result">
        {searchResult.map((a, i) => (
          <div key={i}> {a}</div>
        ))}
      </div>
    </div>
  )
}

export default InputBtn
