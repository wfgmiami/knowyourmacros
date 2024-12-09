import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import H3 from 'components/H3';
import Modal from 'components/Modal';
import { browserHistory } from 'react-router';
import UpdateAccountInfoForm from './containers/form';
import { makeSelectUser } from '../../selectors';
import { updateAccountInfo } from '../../actions';

class UpdateAccountInfo extends React.Component {
  render() {
    const { user, updateUser } = this.props;
    return (
      <Modal onOverlayClick={() => browserHistory.push('/profile')}>
        <H3 centered>Update Account Info</H3>
        <UpdateAccountInfoForm onSubmit={updateUser} initialValues={user} />
      </Modal>
    );
  }
}

UpdateAccountInfo.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser()
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (formData) => dispatch(updateAccountInfo(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccountInfo);
