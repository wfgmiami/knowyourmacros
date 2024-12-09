import React from 'react';

export default function withDelayedRender(time) {
  return function composer(ComposedComponent) {
    class WrappedComponent extends React.Component {
      state = {
        visible: false
      }

      componentWillMount() {
        this.visibleTimer = setTimeout(() => {
          this.setState({ visible: true });
        }, time);
      }

      componentWillUnmount() {
        clearTimeout(this.visibleTimer);
      }

      visibleTimer = null;

      render() {
        return (
          <div style={{ opacity: this.state.opacity }}>
            {this.state.visible && <ComposedComponent {...this.props} />}
          </div>
        );
      }
    }
    return WrappedComponent;
  };
}
