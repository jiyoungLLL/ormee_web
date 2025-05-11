export default async function initMsw() {
  if (typeof window === 'undefined') {
    const { server } = await import('@/mock/server');
    server.listen();
  } else {
    const { worker } = await import('@/mock/browser');
    await worker.start();
  }
}
