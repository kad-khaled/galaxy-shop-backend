const Product = require("../models/ProductModel");
const slugify = require("slugify");

const getListProduct = async (req, res) => {
  try {
    const query = req.query;
    const pageNumber = query.page * 1 || 1;
    const pageSize = query.size * 1 || 10;
    const skipedItems = (pageNumber - 1) * pageSize;

    const products = await Product.find({})
      .skip(skipedItems)
      .limit(pageSize)
      .select("-__v")
      .populate({
        path: "subCategoryID",
        select: "-__v",
        populate: {
          path: "categoryID",
          select: "-__v",
        },
      })
      .populate({
        path: "brandID",
        select: "-__v",
      });

    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: products,
      metaData: {
        pageSize: products.length || 0,
        pagenumber: pageNumber,
      },
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const getProductById = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const product = await Product.findById({ _id: productId })
      .select("-__v")
      .populate({
        path: "subCategoryID",
        select: "-__v",
        populate: {
          path: "categoryID",
          select: "-__v",
        },
      })
      .populate({
        path: "brandID",
        select: "-__v",
      });

    if (!product) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the product with id( ${productId} ) not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const deleteProductById = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const deletedProduct = await Product.findOneAndDelete(
      { _id: productId },
      { new: true }
    )
      .select("-__v")
      .populate({
        path: "subCategoryID",
        select: "-__v",
        populate: {
          path: "categoryID",
          select: "-__v",
        },
      })
      .populate({
        path: "brandID",
        select: "-__v",
      });

    if (!deletedProduct) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the brand with id( ${productId} ) not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: deletedProduct,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const createNewProduct = async (req, res) => {
  const productInfo = req.body;
  const slug = slugify(productInfo.name);
  const product = Product({ ...productInfo, slug: slug });

  try {
    const newProduct = await product.save();

    if (!newProduct) {
      res.status(404).json({
        state: "failed",
        stateCode: 400,
        message: `Failed to create a new brand with name ${productInfo.name}.`,
      });
      return;
    }
    const p = await Product.findById({ _id: newProduct._id })
      .select("-__v")
      .populate({
        path: "subCategoryID",
        select: "-__v",
        populate: {
          path: "categoryID",
          select: "-__v",
        },
      })
      .populate({
        path: "brandID",
        select: "-__v",
      });

    res.status(200).json({
      state: "success",
      stateCode: 201,
      data: p,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const updateProductById = async (req, res) => {
  let productInfo = req.body;
  const { id: productId } = req.params;

  if (productInfo.name) {
    productInfo = { ...productInfo, slug: slugify(productInfo.name) };
  }
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      productInfo,
      { new: true }
    )
      .select("-__v")
      .populate({
        path: "subCategoryID",
        select: "-__v",
        populate: {
          path: "categoryID",
          select: "-__v",
        },
      })
      .populate({
        path: "brandID",
        select: "-__v",
      });

    if (!updatedProduct) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the brand with id( ${productId} ) not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

module.exports = {
  getListProduct,
  getProductById,
  deleteProductById,
  createNewProduct,
  updateProductById,
};
