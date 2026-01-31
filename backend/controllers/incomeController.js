const User = require("../models/User");
const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user._id;

    try {
      const { icon, source, amount, date } = req.body;

      //validation: Check for missing fields
      if (!source || !amount || !date) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const newIncome = new Income({
        userId,
        icon,
        source,
        amount,
        date: new Date(date),
      });

      await newIncome.save();
      res.status(200).json(newIncome);
    } 
    
    catch (error) {
        console.error("ADD INCOME ERROR:", error); // 👈 see real issue
        res.status(500).json({ message: "Server Error", error: error.message });
        }

}

// Get All Income Source
exports.getAllIncome = async (req, res) => {};

// Delete Income Source
exports.deleteIncome = async (req, res) => {};

// Download Excel of Income Sources
exports.downloadIncomeExcel = async (req, res) => {};
