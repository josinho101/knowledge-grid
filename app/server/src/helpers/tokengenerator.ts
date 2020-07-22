import config from "config";
import jwt, { Secret } from "jsonwebtoken";

class TokenGenerator {
  public static generate = (payload: any) => {
    const secret: Secret = config.get("auth.jwtTokenSecret");
    const expiresIn: number = config.get("auth.tokenExpiresInSeconds");

    return jwt.sign(payload, secret, { expiresIn: expiresIn });
  };

  public static decode = (token: string) => {
    return jwt.decode(token, config.get("auth.jwtTokenSecret"));
  };
}

export default TokenGenerator;
