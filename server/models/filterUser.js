const { Schema, model } = require('mongoose');

const UserScheme = Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [1],
      maxLength: [20],
    },

    email: {
      type: String,
      required: true,
      minLength: [1],
      maxLength: [20],
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    product: [{ type: Schema.ObjectId, ref: 'product' }],
  },
  { timestamps: true }
);

// Document MiddleWare:
filterSchema.pre('save', function (next) {
  console.log('DO -> BEFORE CREATING');
  next();
});
filterSchema.post('save', function (doc, next) {
  console.log('DO -> AFTER CREATING');
  next();
});

// Query MiddleWare:
filterSchema.pre(['find', 'findOne'], function (next) {

  this.curtime = Date.now();
  console.log(' STARTED AT ', this.curtime);
  next();
});

filterSchema.post(['find', 'findOne'], function (doc, next) {

  let timedif = Date.now() - this.curtime;
  console.log('milliseconds dif: ', timedif);
  next();
});

const Filter = mongoose.model('filter', filterSchema);
Filter.createIndexes();
module.exports = Filter;
