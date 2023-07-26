import {Response} from 'express';

function isError(unknownCatch: unknown): unknownCatch is Error {
  return unknownCatch instanceof Error;
}

export function handle500Error(res: Response, err: unknown) {
  res
    .status(500)
    .json({error: isError(err) ? err.message : 'An unknown error occurred.'});
}
