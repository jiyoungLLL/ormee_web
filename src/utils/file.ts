export async function polyfillFileIfNeeded() {
  if (typeof globalThis.File === 'undefined') {
    const undici = await import('undici');
    // @ts-expect-error: 런타임엔 존재함
    globalThis.File = undici.File;
  }
}
