import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddExpenses from './AddExpenses';
import EditExpenses from './EditExpenses';

class WalletForm extends Component {
  render() {
    const { isEdit } = this.props;
    return (
      <div>
        {isEdit ? <EditExpenses /> : <AddExpenses />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isEdit: state.wallet.isEdit,
});

WalletForm.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
