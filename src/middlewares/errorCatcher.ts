// biome-ignore lint/suspicious/noExplicitAny: ignore any
export function withErrorCatcher(callback: (...args: any) => Promise<void>) {
  console.log("");
  // biome-ignore lint/suspicious/noExplicitAny: ignore any
  return async (...args: any) => {
    try {
      await callback(...args);
    } catch (error) {
      console.error(error);

      process.exit(0);
    }
  };
}
