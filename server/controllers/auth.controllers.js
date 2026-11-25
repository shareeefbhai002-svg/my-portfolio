export const testingAPI = async (req, res) => {
  try {
    res.json({
      message: "API running"
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: error.message
    });
  }
};