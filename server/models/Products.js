const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
  filterType: {
    type: String,
    required: true,
  },

});

// Schema validator for product
const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true],
      unique: [true],
      minLength: [2],
      maxLength: [40],
      trim: true,
    },
   
    productFilters: {
      type: [filterSchema],
      required: [true],
    },

    productCost: { type: Number, required: [true] },

    productInventory: {
      type: Number,
      required: [true],
      min: 0,
      default: 0,
    },

   
    productStatus: {
      type: [String],
      required: [
        true,
      ],

      enum: {
        values: ['active', 'inactive', 'deleted'],
        message: 'Status must be one of: active, inactive, deleted',
      },

      default: 'active',
    },

    productModified: {
      type: [Date],
    },
  },
  
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


// Document MiddleWare
productSchema.pre('save', function (next) {
  console.log('DO BEFORE CREATING');

  this.productModified = Date.now();
  next();
});

productSchema.post('save', function (doc, next) {
  console.log('DO AFTER CREATING');
  next();
});

// Query MiddleWare:
productSchema.pre(['find', 'findOne'], function (next) {

  this.curtime = Date.now();
  console.log(' STARTED AT ', this.curtime);
  next();
});

productSchema.post(['find', 'findOne'], function (doc, next) {

  let timedif = Date.now() - this.curtime;
  console.log('milliseconds dif: ', timedif);
  next();
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;
