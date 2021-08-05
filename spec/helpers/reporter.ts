import { DisplayProcessor, SpecReporter, StacktraceOption } from "jasmine-spec-reporter";
const reporters = require("jasmine-reporters");
import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return `TypeScript ${log}`;
    }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
        displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor],
}));

const junitReporter = new reporters.JUnitXmlReporter({
    savePath: "./testReport",
    consolidateAll: false
});
jasmine.getEnv().addReporter(junitReporter);