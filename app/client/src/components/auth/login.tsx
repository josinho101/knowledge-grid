import * as enums from "../../enums";
import * as KeyCode from "keycode-js";
import { connect } from "react-redux";
import Anchor from "../common/anchor";
import Spinner from "../common/spinner";
import Textbox from "../common/textbox";
import Checkbox from "../common/checkbox";
import { useSelector } from "react-redux";
import { AppState } from "../../reducers";
import { login } from "../../actions/auth";
import React, { useEffect, useState } from "react";
import localeHelper from "../../utils/localehelper";

interface Props {
  login: (email: string, password: string) => void;
}

const Login: React.FunctionComponent<Props> = (props) => {
  const error = useSelector((state: AppState) => state.auth.error);
  const status = useSelector((state: AppState) => state.auth.status);
  const [email, setEmail] = useState("");
  const [passwrod, setPassword] = useState("");

  useEffect(() => {
    document.body.classList.add("bg-gradient-grey");
    return () => {
      document.body.classList.remove("bg-gradient-grey");
    };
  });

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onLoginClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    login();
  };

  const onKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === KeyCode.KEY_RETURN) {
      login();
    }
  };

  const login = () => {
    props.login(email, passwrod);
  };

  const renderAuthStatus = () => {
    let component = null;
    switch (status) {
      case enums.AuthStatus.failed:
        component = <label>{error}</label>;
        break;
      case enums.AuthStatus.initiated:
        component = <Spinner color="blue" size="small" id="login-spinner" />;
        break;
    }

    return component;
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg ml-5 mt-7 mx-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                <div className="col-lg-6">
                  <div className="p-5" onKeyDown={onKeydown}>
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        {localeHelper.translate("login.title")}
                      </h1>
                    </div>
                    <div className="form-group">
                      <Textbox
                        id="email"
                        type="email"
                        placeholder={localeHelper.translate(
                          "login.controls.email-field"
                        )}
                        onChange={onEmailChange}
                        className="form-control form-control-user"
                      />
                    </div>
                    <div className="form-group">
                      <Textbox
                        id="password"
                        type="password"
                        placeholder={localeHelper.translate(
                          "login.controls.password-field"
                        )}
                        onChange={onPasswordChange}
                        className="form-control form-control-user"
                      />
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox small">
                        <Checkbox
                          id="rememberMe"
                          label={localeHelper.translate(
                            "login.controls.remember-me"
                          )}
                          className="custom-control-input"
                          labelClassName="custom-control-label"
                        />
                      </div>
                    </div>
                    <Anchor
                      href="#"
                      id="login"
                      text={localeHelper.translate(
                        "login.controls.login-button"
                      )}
                      onClick={onLoginClick}
                      className="btn btn-primary btn-user btn-block"
                    />
                    <div className="form-group mb-0 mt-2">
                      <div className="small error-display">
                        {renderAuthStatus()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  login,
};

export default connect(null, mapDispatchToProps)(Login);
