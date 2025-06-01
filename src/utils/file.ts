// @ts-expect-error
import { File as UndiciFile } from 'undici';

if (typeof globalThis.File === 'undefined') {
  globalThis.File = UndiciFile;
}
