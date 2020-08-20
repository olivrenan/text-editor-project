import _ from "lodash";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React, { PureComponent } from "react";
import RGL, { WidthProvider } from "react-grid-layout";

import RenderTodos from "./RenderTodos";
import { setElementPosition } from "../services/positions/actions";

const ReactGridLayout = WidthProvider(RGL);

class Grid extends PureComponent {
  static defaultProps = {
    isDraggable: true,
    isResizable: true,
    autoSize: true,
    rowHeight: 60,
    onLayoutChange: function() {},
    cols: 12
  };

  constructor(props) {
    super(props);

    this.onResizeStop = this.onResizeStop.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
  }

  generateDOM() {
    // Generate items with properties from the layout, rather than pass the layout directly
    const layout = this.generateLayout();
    const { todos } = this.props;

    return todos.map((todo, i) => {
      return (
        <div key={i} data-grid={layout[i]}>
          <RenderTodos todo={todo} />
        </div>
      );
    });
  }

  generateLayout() {
    const previousPositions = JSON.parse(
      window.localStorage.getItem("positions")
    );

    if (previousPositions) {
      return previousPositions;
    }

    const p = this.props;
    const { todos } = this.props;

    const layout = _.map(new Array(todos.length), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: 4,
        i: i.toString()
      };
    });

    return layout;
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  onResizeStop(event) {
    this.props.setElementPosition(event);
  }

  onDragStop(event) {
    this.props.setElementPosition(event);
  }

  render() {
    return (
      <ReactGridLayout
        onLayoutChange={this.onLayoutChange}
        onResizeStop={this.onResizeStop}
        onDragStop={this.onDragStop}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}

const mapStateToProps = ({ positions }) => ({
  positions: positions.positions
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setElementPosition }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
