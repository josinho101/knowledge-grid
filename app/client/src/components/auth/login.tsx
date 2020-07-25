import React, { useEffect } from "react";

const Login: React.FunctionComponent = () => {
  useEffect(() => {
    document.body.classList.add("bg-gradient-grey");
    return () => {
      document.body.classList.remove("bg-gradient-grey");
    };
  });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg ml-5 mt-7 mx-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Login to Sentinel
                      </h1>
                    </div>
                    <div className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="username"
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="password"
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Login
                      </a>
                      <div className="form-group mb-0 mt-2">
                        <div className="small error-display">
                          <label>Invalid username or password.</label>
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
    </div>
  );
};

export default Login;
