import React from "react";
import "./SummaryWidgets.css";

const SummaryWidgets = () => {
  const widgets = [
    { title: "Appointments", value: 5 },
    { title: "Reports", value: 2 },
    { title: "Health Score", value: "85%" },
  ];

  return (
    <div className="widgets-container">
      {widgets.map((widget, index) => (
        <div key={index} className="widget-card">
          <h3>{widget.title}</h3>
          <p>{widget.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryWidgets;
