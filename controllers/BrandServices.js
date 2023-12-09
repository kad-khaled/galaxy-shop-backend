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

module.exports = {
  getListBrand,
};
