import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

class FavoriteToggle extends React.Component {
  constructor(props) {
    super();
    props.input.onChange(props.isFavorite);
  }

  onClick = (ev) => {
    ev.stopPropagation();
    this.props.input.onChange(!this.props.input.value);
    this.props.handleFavorite();
  }

  render() {
    const { isFavorite } = this.props;
    return (
      <span title="Add to Favorites">
        <FontAwesome
          name="heart"
          height="20"
          width="20"
          style={{ color: isFavorite ? 'rgb(85,136,170)' : 'rgba(0, 0, 0, 0.2)', cursor: 'pointer' }}
          strokeWidth="7"
          stroke="hsl(204,33.3%,35%)"
          onClick={this.onClick}
        />
      </span>
    );
  }
}

FavoriteToggle.propTypes = {
  input: PropTypes.object,
  isFavorite: PropTypes.bool,
  handleFavorite: PropTypes.func
};

export default FavoriteToggle;
