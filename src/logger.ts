import pino from 'pino';
import childProcess from 'child_process';
import stream from 'stream';
import fs from 'fs';
const cwd = process.cwd();
const { env } = process;

const logPath = `${cwd}/logs`;
const getDate = () => {
  const date = new Date();
  const dateTimeFormat = new Intl.DateTimeFormat("en", { year: "numeric", month: "numeric", day: "2-digit" });
  const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date);
  return `${day}-${month}-${year}`;
};

if (!fs.existsSync(logPath)){
    fs.mkdirSync(logPath);
}
// Environment variables
// Create a stream where the logs will be written
const logThrough = new stream.PassThrough();
export const logger = pino({ name: 'project' }, logThrough);

// Log to multiple files using a separate process
const child = childProcess.spawn(process.execPath, [
  require.resolve('pino-tee'),
  'warn', `${logPath}/${getDate()}.log`,
  'info', `${logPath}/${getDate()}.log`,
  'error', `${logPath}/${getDate()}.log`,
  'fatal', `${logPath}/${getDate()}.log`
], { cwd, env });

logThrough.pipe(child.stdin);
