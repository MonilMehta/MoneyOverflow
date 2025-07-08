const healthCheckController = async (req, res) => {
  try {
    res.status(200).json({ status: "UP" });
  } catch (error) {
    res.status(500).json({ status: "DOWN", error: error.message });
  }
}

export { healthCheckController };