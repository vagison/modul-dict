import React from "react";
// import "./EditWord.css";

class EditWord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newWord: "",
      labels: {
        ENG: {
          editWord: "Edit word here",
          oldWord: "Old word: ",
          newWord: "New word: ",
          updateWord: "Change",
        },
        ARM: {
          editWord: "Խմբագրել բառը այստեղ",
          oldWord: "Հին բառը՝ ",
          newWord: "Նոր բառը՝ ",
          updateWord: "Փոխել",
        },
      },
    };
  }

  onWordChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onEdit = (editWord) => {
    editWord();
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.searchedWord !== prevProps.searchedWord) {
      console.log(this.props.searchedWord);
    }
  }

  render() {
    const { editWord, oldWord, newWord, updateWord } =
      this.state.labels[this.props.interfaceLanguage];

    var label = "";
    var id = "";

    if (this.props.direction === 0) {
      label = "armenianWord";
      id = "armenianWordId";
    } else if (this.props.direction === 1) {
      label = "englishWord";
      id = "englishWordId";
    }
    console.log("mmm", this.props.searchedWord);

    return (
      <article className="br3 ba b--black-10 mv2 w-100 w-50-m w-40-l mw8 shadow-5 center translationsBox">
        <main className="pa4 mw6 center black-60">
          <h1 className="f2 fw6">{editWord}</h1>

          {this.props.searchedWord["value"].map((word, index) => (
            <div className="eachTranslationBox" key={index}>
              <hr />
              <div>
                <p>
                  <b>{oldWord}</b>
                  {word[label]}
                </p>
                <p>
                  <b>{newWord}</b>
                </p>
                <input
                  className="pa2 input-reset ba bg-transparent w-100"
                  type="text"
                  name={"newWord".concat(index)}
                  id={"newWord".concat(index)}
                  onChange={this.onWordChange}
                />
              </div>

              <div className="buttonBox ma2">
                <button
                  className="b ph3 pv2 input-reset ba b--black-10 bg-transparent bg-light-green grow pointer f5 dib"
                  type="button"
                  onClick={() => {
                    this.onEdit(() => {
                      fetch("http://localhost:3000/edit-word", {
                        method: "post",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          direction: this.props.direction,
                          id: word[id],
                          newWord: this.state["newWord".concat(index)],
                        }),
                      });
                    });
                  }}
                >
                  {updateWord}
                </button>
              </div>
            </div>
          ))}
        </main>
      </article>
    );
  }
}

export default EditWord;
