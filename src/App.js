import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spreadsheet from "react-spreadsheet";



// function App() {
//   return (
//     <div className="App">
//     <p>Hello world</p>
//     <div>
//       <Spreadsheet data={data} onChange={setData} />
//     </div>
//     </div>
//   );
// }

// const App = () => {
//   const data = [
//     [{ value: "Vanilla" }, { value: "Chocolate" }],
//     [{ value: "Strawberry" }, { value: "Cookies" }],
//   ];
//   return <Spreadsheet data={data} />;
// };

var unprocessedChanges = false

function App () {
  // var [data, setData] = useState([
  //   [{ value: "Vanilla" }, { value: num}],
  //   [{ value: "Strawberry" }, { value: "Cookies" }],
  // ]);
  var [vals, setVals] = useState([{}])
  var [idxs, setIdxs] = useState([])
  var [cols, setCols] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/test')
      .then(res => {
        setVals(res.data.vals)
        setIdxs(res.data.idxs)
        setCols(res.data.cols)
      })
  }, []);

  const handleChanges = (data) => {
    setVals(data);
    unprocessedChanges = true
  }

  const finishedEditingCell = (mode) => {
    if (mode == 'view' && unprocessedChanges == true) {
      console.log("Made change to cell. Validate and do stuff")
      unprocessedChanges = false
    }
  }
  const lostFocus = () => {
    if (unprocessedChanges == true) {
      console.log("Made changes and then lost focus")
      unprocessedChanges = false
    }
  }

  var printVals = () => {
    console.log(unprocessedChanges)
    console.log(vals)
  };

  return (
    <div className="main">
      <button onClick={printVals}>Press me</button>
      <p>Hello world</p>
      <Spreadsheet
        data={vals}
        onChange={handleChanges}
        onModeChange={finishedEditingCell}
        onBlur={lostFocus}
        rowLabels={idxs}
        columnLabels={cols}
      />
    </div>
  )
}

export default App;
