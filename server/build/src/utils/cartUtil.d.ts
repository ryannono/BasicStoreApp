import { MutableCartItemPayload } from '../types';
export declare function getActionArrays(items: MutableCartItemPayload[], userCartMap: Map<string, MutableCartItemPayload>): {
    deletes: string[];
    updates: MutableCartItemPayload[];
    creates: MutableCartItemPayload[];
};
export declare function deleteCartItems(cartId: string, deleteIds: string[]): Promise<void>;
export declare function createCartItems(cartId: string, creates: MutableCartItemPayload[]): Promise<void>;
export declare function updateCartItems(cartId: string, updates: MutableCartItemPayload[]): Promise<void>;
