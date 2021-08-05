import { replace } from "lodash";
import { JwtHelper } from "../@common/helper/jwt.helper";

export async function authorization(req, res, next): Promise<any> {
  const bearerToken: string = req.headers["authorization"];
  if (!bearerToken) {
    return res.status(401).send("You must sign in first");
  }
  try {
    const token = replace(bearerToken, "Bearer ", "");
    const userInfo: any = JwtHelper.decode(token);
    req["raw"]["user"] = userInfo;


  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }

  // req["req"]["user"] = userInfo;
  // next();
  // res.status(401).send("Your token is invalid or has expired");
  // // return res;
}
export async function commonMiddleware(req, res, next): Promise<void> {
  try {
    if ('url' in req["raw"]) {
      const originalUrl = req["raw"]["url"];
      if (originalUrl.includes("/signup")) {
        return;
      }


      else {
        await authorization(req, res, next);
      }
    }
  } catch (err) {
    res.status(400).send("You must sign in first");
    // return res;
  }
}
