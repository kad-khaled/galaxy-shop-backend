const Brand = require("../models/BrandModel");

const getListBrand = async (req, res) => {
  try {
    const query = req.query;
    const pageNumber = query.page * 1 || 1;
    const pageSize = query.size * 1 || 10;
    const skipedItems = (pageNumber - 1) * pageSize;

    const brands = await Brand.find({}).skip(skipedItems).limit(pageSize);

    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: brands,
      metaData: {
        pageSize: brands.length,
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

const getBrandById = async (req, res) => {
  const { id: brandId } = req.params;
  try {
    const brand = await Brand.findById({ _id: brandId });
    if (!brand) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the brand with id( ${brandId} ) not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: brand,
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
  getListBrand,
  getBrandById,
};
