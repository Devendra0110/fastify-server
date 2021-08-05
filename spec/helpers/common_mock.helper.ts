export class MockServer {
    public log = {
        info() {
            console.log("info Log");
        },
        error() {
            console.log("info Log");
        },
        // success() {
        //     console.log("info Log");
        // }
    };
}

// tslint:disable-next-line:max-classes-per-file
export class MockReply {
    public send(data) {
        return data;
    }
}