import React from "react";


import API_URL from "../../util/env"
import { signInLabels } from "../../util/labels/labels";
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
    fetch(API_URL + "signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    }).then((response) => {
      if (response.status === 200) {
        var token = response.headers.get("token");
        var tokenExpiration = response.headers.get("token-expiration");
        document.cookie = `token=${token}; expires=${tokenExpiration}; SameSite=Strict`;
        this.props.setLogIn(true);
      } else {
        alert(this.state.labels[this.props.interfaceLanguage].error);
      }
    });
  };

  render() {
    // labels
    const { title, email, password, signIn } =
      this.state.labels[this.props.interfaceLanguage];

    return (
      <article className="br3 ba b--black-10 pa3-ns mv2 mv4-ns w-80 w-50-l mw8 mw6-ns shadow-5 center signinBox">
        <main className="pa3 pt2 pa4-ns pv2-ns center black-60">
          <h1 className="mv3 f3 f2-ns fw6">{title}</h1>
          <form className="measure" onSubmit={this.onSubmitSignIn}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <div className="mt3-ns">
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
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 f5-ns"
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
