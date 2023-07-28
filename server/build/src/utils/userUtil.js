"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEssentialUserProps = void 0;
/**
 * Function to extract essential user properties from a User object.
 *
 * This function returns a new object containing only the `id`, `email`,
 * `firstName`, and `lastName` properties of the provided User object.
 * This can be useful for creating a payload to be encoded into a token
 * or to be sent to the client, minimizing the exposure of sensitive data.
 *
 * @param user - The User object from which to extract properties.
 *
 * @returns {TokenUserPayload} An object containing essential user properties.
 */
function getEssentialUserProps(user) {
    const { id, email, firstName, lastName } = user;
    return { id, email, firstName, lastName };
}
exports.getEssentialUserProps = getEssentialUserProps;
//# sourceMappingURL=userUtil.js.map