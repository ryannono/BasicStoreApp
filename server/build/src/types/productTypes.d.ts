import { ProductPayload } from '@prisma/client';
/**
 * The `MutableProductPayload` type takes all the scalar properties from
 * the `ProductPayload` type. Scalar properties are the base-level information
 * or primitive values (like strings, numbers, booleans, etc.) as opposed to
 * object structures.
 *
 * This type is typically used when you want to create or manipulate a product
 * and only care about the basic product details.
 *
 * @type {object}
 */
export declare type MutableProductPayload = ProductPayload['scalars'];
