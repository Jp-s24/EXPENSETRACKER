import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard.jsx";

const RecentTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card p-4 bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Recent Transactions</h5>

        <button
          className="flex items-center gap-1 text-sm text-primary hover:underline"
          onClick={onSeeMore}
        >
          See All <LuArrowRight />
        </button>
      </div>

      <div className="mt-6">
        {transactions.length > 0 ? (
          transactions
            .slice(0, 5)
            .map((item) => (
              <TransactionInfoCard
                key={item._id}
                title={item.type === "expense" ? item.category : item.source}
                date={moment(item.date).format("Do MMM, YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
              />
            ))
        ) : (
          <p className="text-gray-500 text-sm">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
