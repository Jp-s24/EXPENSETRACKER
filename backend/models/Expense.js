const mongoose = require("mongoose");
// const { use } = require("react");

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    icon: { type: String },
    category: { type: String, required: true }, //example food, transport, e.t.c
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Expense", ExpenseSchema);
