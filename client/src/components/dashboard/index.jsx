import React from "react";
import DashboardLayout from "../../hoc/ dashboardLayout";
import HistoryBlock from "../../utils/historyBlock";

const UserDashboard = ({ user }) => {
  return (
    <DashboardLayout title="Overview">
      <div className="user_nfo_panel">
        <div>
          <span>{user.data.firstname}</span>
          <span>{user.data.lastname}</span>
          <span>{user.data.email}</span>
        </div>
        {user.data.history.length > 0 ? (
          <div className="user_nfo_panel">
            <h1>History of purchases</h1>
            <div className="user_product_block_wrapper">
              <HistoryBlock history={user.data.history} />
            </div>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
