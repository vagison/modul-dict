import React from "react";
import { aboutUsLabels } from "../../util/labels/labels";
import "./AboutUs.css";

class AboutUs extends React.Component {
  constructor(props) {
    super();
    this.state = {
      labels: aboutUsLabels,
    };
  }

  render() {
    const {
      aboutUsTitle,
      aboutUsContent,
      aboutProjectTitle,
      aboutProjectContent,
    } = this.state.labels[this.props.interfaceLanguage];

    return (
      <article className="br3 ba b--black-10 pa0 pa3-ns mv2 w-90 w-80-m w-60-l mw7 shadow-5 center aboutUsBox">
        <main className="pa3 pa4-ns center black-60">
          <div className="pb3 contentBox">
            <h2 className="f1-ns f3 fw6">{aboutProjectTitle}</h2>
            <p className="content">{aboutProjectContent}</p>
          </div>
          <div className="contentBox">
            <h1 className="f2-ns f3 fw6">{aboutUsTitle}</h1>
            <p className="content">{aboutUsContent}</p>
          </div>
        </main>
      </article>
    );
  }
}

export default AboutUs;
