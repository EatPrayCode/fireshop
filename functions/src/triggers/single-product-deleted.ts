import * as firebase from 'firebase';
import * as functions from 'firebase-functions';

async function productDeleted(product) {
  console.log('product', product);
  product.gallery.forEach(image => {
    firebase
      .storage()
      .refFromURL(image)
      .delete();
  });
}

export const productDeletedEn = functions.firestore
  .document('product-en/{id}')
  .onDelete(productDeleted);

export const productDeletedHr = functions.firestore
  .document('product-hr/{id}')
  .onDelete(productDeleted);
