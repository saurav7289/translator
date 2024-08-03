import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [language, setLanguage] = useState([]);
  const [data, setData] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [translateLang, setTranslateLang] = useState("");
  const [error, setError] = useState("");

  const callLang = async () => {
    try {
      const res = await axios.get("https://libretranslate.com/languages");
      const result = await res.data;
      setLanguage(result);
    } catch (error) {
      setError("Translation failed, Please try after some time");
    }
  };

  const handleSubmit = async () => {
    if (sourceLang === "" || targetLang === "") {
      alert("Please select language");
      return;
    }
    try {
      const res = await axios.get(
        "https://translate.googleapis.com/translate_a/single",
        {
          params: {
            client: "gtx",
            sl: sourceLang,
            tl: targetLang,
            dt: "t",
            q: data,
          },
        }
      );

      let translatedText = "";
      for (let i = 0; i < res.data[0].length; i++) {
        translatedText += res.data[0][i][0];
        console.log(translatedText);
      }
      setTranslateLang(translatedText);
    } catch (error) {
      setError("Translation failed, Please try after some time");
    }
  };

  useEffect(() => {
    callLang();
  }, []);

  return (
    <div className="App">
      <div className="heading">
        <h1>Baghel Translator</h1>
      </div>
      <div className="selectLang">
        <div className="from">
          From:
          <select onChange={(e) => setSourceLang(e.target.value)}>
            <option value="">select Language</option>
            {language.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div className="to">
          To:
          <select onChange={(e) => setTargetLang(e.target.value)}>
            <option value="">select Language</option>
            {language.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="textarea">
        <div>
          <textarea

            onChange={(e) => setData(e.target.value)}
            placeholder="Enter text to translate"
          />
        </div>
        <div>
          <textarea
          
            value={translateLang}
            readOnly
            placeholder="Translated text will appear here"
          />
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="btn">
        <button onClick={handleSubmit}>Translate</button>
      </div>
    </div>

  );
}

export default App;
