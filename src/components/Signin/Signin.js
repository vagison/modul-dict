import React from "react";
import {signInLabels} from "../../util/labels/labels";
import "./Signin.css";

const initialState = {
  labels: signInLabels,
  signInEmail: "",
  signInPassword: "",
};

class Signin extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = (event) => {
    event.preventDefault();
    fetch("https://modul-dictionary-api.herokuapp.com/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
    .then((response) => {
      if (response.status === 200) {
        this.props.setLogIn(true);
      } 
      else {
        alert(this.state.labels[this.props.interfaceLanguage].error);
      }
    });
  };

  render() {

    const { title, email, password, signIn } =
      this.state.labels[this.props.interfaceLanguage];

    return (
      <article className="br3 pa3 ba b--black-10 mv2 mv4-m mv4-l w-80 w-50-l mw8 mw6-m mw6-l shadow-5 center signinBox">
        <main className="pa4 mw6 center black-60">
          <h1 className="f2 f1-m f1-l fw6">{title}</h1>
          <form className="measure" onSubmit={this.onSubmitSignIn}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  {email}
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  {password}
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent w-100"
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value={signIn}
              />
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Signin;
