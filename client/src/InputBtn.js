import axios from 'axios'
import React, { useState } from 'react'

function InputBtn () {
  const [text, setText] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [searchResultJamo, setSearchResultJamo] = useState('')
  const [jamoSuggest, setJamoSuggest] = useState('')

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
    Arr.forEach((e, index) => {
      ArrMovieName[index] = e._source.movie.name
    })
    setSearchResult(ArrMovieName)
    console.log(searchResult)
  }

  const sendJamo = async () => {
    console.log('wlsdlq')
    const result = await axios.get('/api/jamo',
      { params: { apple: text } }
    )
    setSearchResultJamo(result.data.suggest.name_suggest[0].text)
    if (result.data.suggest.name_suggest[0].options[0] === undefined) {
      setJamoSuggest('없음')
    } else {
      setJamoSuggest(result.data.suggest.name_suggest[0].options[0].text)
    }
    // const d1 = document.getElementById('jamo')
    // d1.innerText = jamoSuggest
  }

  return (
      <div>
      <input onChange={onChangeText} value={text} />
      <button onClick={sendRequest}>전송</button>
      <button id="jamo" onClick={sendJamo}>분리</button>
      <button onClick={onReset}>초기화</button>
      <div>
        <b>검색 값: {text}</b>
      </div>
      <div id="jamo">
        <p>분리: {searchResultJamo}</p>
      </div>
      <div id="suggest">
        <p>추천: {jamoSuggest}</p>
      </div>
      <div id="result">
        <span id="s1">
        {searchResult.map((a, i) => (
          <div key={i}> {a}</div>
        ))}
        </span>
      </div>
    </div>
  )
}

export default InputBtn
