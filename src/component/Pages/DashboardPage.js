import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmMessage from "../../messages/ConfirmMessage";
//rscp

const DashboardPage = ({ isConfirmed }) => (
  <div>{!isConfirmed && <ConfirmMessage />}</div>
);

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed

    // !! convert text to boolean
  };
}

export default connect(mapStateToProps)(DashboardPage);
