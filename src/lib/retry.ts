// src/lib/retry.ts
/**
 * Utility to retry an async function with exponential backoff.
 * @param fn Async function to execute.
 * @param attempts Number of attempts (default 3).
 * @param delayMs Initial delay in ms (default 500).
 */
export async function retryAsync<T>(fn: () => Promise<T>, attempts: number = 3, delayMs: number = 500): Promise<T> {
    let lastError: any;
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
            if (i < attempts - 1) {
                // exponential backoff
                const wait = delayMs * Math.pow(2, i);
                await new Promise(res => setTimeout(res, wait));
            }
        }
    }
    throw lastError;
}
