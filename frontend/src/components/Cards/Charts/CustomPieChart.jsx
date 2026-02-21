import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import CustomTooltip from "./CustomTooltip.jsx";
import CustomLegend from "./CustomLegend.jsx";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}

          {/* Center Label */}
          {showTextAnchor && (
            <Label
              value={`${totalAmount}`}
              position="center"
              className="recharts-label"
              content={() => (
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  fill="#333"
                  fontSize={24}
                  fontWeight="700"
                >
                  {totalAmount}
                  <tspan x="50%" dy="-30" fontSize={18} fill="#666">
                    {label}
                  </tspan>
                </text>
              )}
            />
          )}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
