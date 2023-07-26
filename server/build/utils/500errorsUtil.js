"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle500Error = void 0;
function isError(unknownCatch) {
    return unknownCatch instanceof Error;
}
function handle500Error(res, err) {
    res
        .status(500)
        .json({ error: isError(err) ? err.message : 'An unknown error occurred.' });
}
exports.handle500Error = handle500Error;
//# sourceMappingURL=500errorsUtil.js.map