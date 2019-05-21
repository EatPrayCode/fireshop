import {initializeApp} from 'firebase-admin';

initializeApp();

// Triggers
export {userCreated} from './triggers/user-created';
export {userDeleted} from './triggers/user-deleted';
export {fileCreated} from './triggers/file-created';
export {fileDeleted} from './triggers/file-deleted';
export {customerDeleted} from './triggers/customer-deleted';
export {productDeletedEn} from './triggers/single-product-deleted';
export {productDeletedHr} from './triggers/single-product-deleted';

// Rest
export {exportData} from './rest/export-data';
export {importData} from './rest/import-data';
export {similarProducts} from './rest/similar-products';
export {stripe} from './rest/stripe';
export {instagram} from './rest/instagram-authorization';

export {ssr} from './ssr';
