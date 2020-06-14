import { Injectable, IterableDiffers } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQty: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(item: CartItem) {
    let existingCartItem: CartItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (this.existInCart(existingCartItem)) {
      existingCartItem.incremetnQuantity();
    } else {
      this.cartItems.push(item);
    }
    this.computeCartTotals();
  }

  private computeCartTotals() {
    let tempTotalPrice: number = 0;
    let tempTotalQty: number = 0;
    for (let item of this.cartItems) {
      tempTotalPrice += item.unitPrice * item.quantity;
      tempTotalQty += item.quantity;
    }
    this.totalPrice.next(tempTotalPrice);
    this.totalQty.next(tempTotalQty);
  }

  private existInCart(item: CartItem): boolean {
    return item != undefined;
  }
}
