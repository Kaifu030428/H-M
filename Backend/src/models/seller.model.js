const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const sellerSchema = new mongoose.Schema(
  {
    sellerName: {
      type: String,
      required: true,
    },

    sellerPhone: {
      type: String,
      required: true,
      maxLength: 10,
      minLength: 10,
    },

    sellerPassword: {
      type: String,
      required: true,
    },

    sellerEmail: {
      type: String,
      required: true,
      unique: true,
    },

    sellerAdhaar: {
      type: String,
      required: true,
      unique: true,
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

sellerSchema.pre("save", async function (next) {
  if (!this.isModified("sellerPassword")) return next();

  const hashedPass = await bcrypt.hash(this.sellerPassword, 10);
  this.sellerPassword = hashedPass;
  next();
});

sellerSchema.methods.comparePass = async function (password) {
  return await bcrypt.compare(password, this.sellerPassword);
};

const sellerModel = mongoose.model("seller", sellerSchema);

module.exports = sellerModel;