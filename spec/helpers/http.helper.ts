const testConfig = require("../../config/test.json");
const urllib = require("urllib");


export class HttpHelper {
    private options: any;
    private url: string;
    private connectorURL: string;

    constructor() {
        this.url = `${testConfig["HOST"]}:${testConfig["PORT"]}`;
        this.options = {
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json",
                Authorization: testConfig["AUTH_TOKEN"]
            },
        };
    }

    public async request(reqMethod: string, uri: string, content?: object) {
        try {
            this.options["method"] = reqMethod;
            if (reqMethod === "GET" && content) {
                this.options["data"] = content;
            } else if ((reqMethod === "POST" || reqMethod === "PUT") && content) {
                this.options["content"] = JSON.stringify(content);
            }
            const res = await urllib.request(
                this.url + uri,
                this.options
            );
            return res;
        } catch (err) {
            return err;
        }
    }
}