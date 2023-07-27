/**
 * This is a constant that represents the number of milliseconds in a minute.
 * It is commonly used when setting durations or intervals in functions that
 * operate with time in milliseconds, such as setTimeout or setInterval.
 *
 * @type {number}
 */
export const MINUTE = 1000;

/**
 * This constant represents the number of milliseconds in an hour.
 * It is calculated by multiplying the number of milliseconds in a minute by 60.
 * It can be used for similar purposes as the `MINUTE` constant, but for longer time spans.
 *
 * @type {number}
 */
export const HOUR: number = 60 * MINUTE;

/**
 * This constant represents the number of milliseconds in a day.
 * It is calculated by multiplying the number of milliseconds in an hour by 24.
 * It can be used when you need to set a duration or delay of a day.
 *
 * @type {number}
 */
export const DAY: number = 24 * HOUR;
