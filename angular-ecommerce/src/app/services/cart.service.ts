import { Injectable, IterableDiffers } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQty: Subject<number> = new Subject<number>();

  constructor() { }

  incrementQuantity(item: CartItem) {
    this.addToCart(item);
  }

  addToCart(item: CartItem) {
    let existingCartItem: CartItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (this.existInCart(existingCartItem)) {
      existingCartItem.incremetnQuantity();
    } else {
      this.cartItems.push(item);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let tempTotalPrice: number = 0;
    let tempTotalQty: number = 0;
    for (let item of this.cartItems) {
      tempTotalPrice += item.unitPrice * item.quantity;
      tempTotalQty += item.quantity;
    }
    this.totalPrice.next(tempTotalPrice);
    this.totalQty.next(tempTotalQty);
  }

  decrementQuantity(item: CartItem) {
    item.decrementQuantity();
    if (item.quantity === 0) {
      this.removeFromCart(item)
    } else {
      this.computeCartTotals();
    }
  }

  removeFromCart(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(item => item.id === cartItem.id);
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

  private existInCart(item: CartItem): boolean {
    return item != undefined;
  }
}
