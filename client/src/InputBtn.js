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
    console.log(result)
    setSearchResult(result.data._source.movie.name)
    console.log(searchResult)
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
        <b>결과 : {searchResult[0]}</b>
      </div>
    </div>
  )
}

export default InputBtn
