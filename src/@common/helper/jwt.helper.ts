import * as jwt from "jsonwebtoken";

export class JwtHelper {
  private static readonly secret = "Use anything random";

  public static sign(payload: string | object | Buffer): string {
    const token = jwt.sign(payload, this.secret, { expiresIn: "100d" });
    return token;
  }

  public static decode(token: string) {
    return jwt.decode(token);
  }
  public static verify(token: string) {
    return jwt.verify(token, this.secret, { complete: true });
  }
}
