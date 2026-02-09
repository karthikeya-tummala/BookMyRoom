import type { Request, Response, NextFunction } from 'express';

export const apiLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = process.hrtime.bigint();
  const startTime = new Date();

  const formatTime = (date: Date): string => {
    return date.toTimeString().split(' ')[0]; // HH:mm:ss
  };

  const method = req.method;
  const path = req.originalUrl;

  // REQ log
  console.log(
    `${formatTime(startTime)} REQ ${method} ${path}`
  );

  let responseSize = 0;

  const originalWrite = res.write.bind(res);
  const originalEnd = res.end.bind(res);

  res.write = (
    chunk: any,
    ...args: any[]
  ): boolean => {
    if (chunk) {
      responseSize += Buffer.isBuffer(chunk)
        ? chunk.length
        : Buffer.byteLength(String(chunk));
    }
    return originalWrite(chunk, ...args);
  };

  res.end = (
    chunk?: any,
    ...args: any[]
  ): Response => {
    if (chunk) {
      responseSize += Buffer.isBuffer(chunk)
        ? chunk.length
        : Buffer.byteLength(String(chunk));
    }
    return originalEnd(chunk, ...args);
  };

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1e6;

    const time = formatTime(new Date());
    const status = res.statusCode;

    const size =
      responseSize < 1024
        ? `${responseSize}b`
        : `${(responseSize / 1024).toFixed(1)}kb`;

    const perf = durationMs > 500 ? ' perf=slow' : '';

    console.log(
      `${time} RES ${method} ${path} status=${status} ${size} ${Math.round(durationMs)}ms${perf}`
    );
  });

  next();
};
