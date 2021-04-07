import './App.css';
import {useState} from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  
  function save(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file',file);
    formData.append('test', text);
    fetch ('http://localhost:8888/fileserver/index.php',
      {
        method: 'POST',
        body: formData
      }
    )
    .then((res) => res.json())
    .then ((result) => {
      console.log(result);
    })
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <div className="container">
      <form onSubmit={save}>
        <div>
          <label>Image:</label>
          <input type="file" name="file" onChange={handleChange}></input>
          {file != null ?  (
            <>
              <p>Filename: {file.name}</p>
              <p>Filetype: {file.type}</p>
              <p>Filesize: {file.size}</p>
            </>
          ) : (
            <p>File is not selected</p>
          )}
        </div>
        <div>
          <label>Text:</label>
          <input type="text" name="text" value={text} onChange={e => setText(e.target.value)} />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
}

export default App;
