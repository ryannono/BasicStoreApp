// eslint-disable-next-line node/no-extraneous-import
import {CartItem} from '@prisma/client';
import axios from '../axios';

/**
 * The `scrollToElement` function scrolls the webpage to a specific HTML element
 * on the page. It uses the HTMLElement.scrollIntoView() method which scrolls
 * the element's parent container such that the element on which
 * scrollIntoView() is called is visible to the user.
 *
 * @function
 * @param {HTMLElement | null} element - The HTML element to scroll to.
 * If not provided or null, the function will not perform any operation.
 */
export function scrollToElement(element: HTMLElement | null) {
  if (element) {
    element.scrollIntoView({behavior: 'smooth'});
  }
}
