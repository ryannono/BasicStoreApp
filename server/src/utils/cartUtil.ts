import {prisma} from '../app';
import {MutableCartItemPayload} from '../types';

export function getActionArrays(
  items: MutableCartItemPayload[],
  userCartMap: Map<string, MutableCartItemPayload>
) {
  const deletes: string[] = [];
  const updates: MutableCartItemPayload[] = [];
  const creates: MutableCartItemPayload[] = [];

  items.forEach(item => {
    if (item.productQuantity <= 0) {
      if (userCartMap.has(item.productId)) {
        deletes.push(item.productId);
      }
    } else if (userCartMap.has(item.productId)) {
      updates.push(item);
    } else {
      creates.push(item);
    }
  });

  return {deletes, updates, creates};
}

export async function deleteCartItems(cartId: string, deleteIds: string[]) {
  if (deleteIds.length > 0) {
    await prisma.cart.update({
      where: {id: cartId},
      data: {
        items: {
          deleteMany: {
            productId: {in: deleteIds},
          },
        },
      },
    });
  }
}

export async function createCartItems(
  cartId: string,
  creates: MutableCartItemPayload[]
) {
  if (creates.length > 0) {
    await prisma.cart.update({
      where: {id: cartId},
      data: {
        items: {
          createMany: {
            data: creates,
          },
        },
      },
    });
  }
}

export async function updateCartItems(
  cartId: string,
  updates: MutableCartItemPayload[]
) {
  if (updates.length > 0) {
    await Promise.all(
      updates.map(item =>
        prisma.cart.update({
          where: {id: cartId},
          data: {
            items: {
              update: {
                where: {
                  cartId_productId: {
                    cartId,
                    productId: item.productId,
                  },
                },
                data: {productQuantity: item.productQuantity},
              },
            },
          },
        })
      )
    );
  }
}
