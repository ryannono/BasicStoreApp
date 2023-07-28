"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TO_CENTS_MULTIPLIER = exports.DAY = exports.HOUR = exports.MINUTE = exports.SECOND = void 0;
/**
 * This is a constant that represents the number of milliseconds in a second.
 * It is commonly used when setting durations or intervals in functions that
 * operate with time in milliseconds, such as setTimeout or setInterval.
 *
 * @type {number}
 */
exports.SECOND = 1000;
/**
 * This is a constant that represents the number of milliseconds in a minute.
 * It is commonly used when setting durations or intervals in functions that
 * operate with time in milliseconds, such as setTimeout or setInterval.
 *
 * @type {number}
 */
exports.MINUTE = 60 * exports.SECOND;
/**
 * This constant represents the number of milliseconds in an hour.
 * It is calculated by multiplying the number of milliseconds in a minute by 60.
 * It can be used for similar purposes as the `MINUTE` constant, but for longer time spans.
 *
 * @type {number}
 */
exports.HOUR = 60 * exports.MINUTE;
/**
 * This constant represents the number of milliseconds in a day.
 * It is calculated by multiplying the number of milliseconds in an hour by 24.
 * It can be used when you need to set a duration or delay of a day.
 *
 * @type {number}
 */
exports.DAY = 24 * exports.HOUR;
exports.TO_CENTS_MULTIPLIER = 100;
//# sourceMappingURL=constants.js.map