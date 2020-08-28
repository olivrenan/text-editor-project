import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";

import RenderTodos from "./RenderTodos";
import { updatePosition } from "../services/todos/actions";

const ReactGridLayout = WidthProvider(RGL);

// class Grid extends PureComponent {
//   static defaultProps = {
//     isDraggable: true,
//     isResizable: true,
//     autoSize: true,
//     rowHeight: 60,
//     onLayoutChange: function() {},
//     cols: 12
//   };

//   constructor(props) {
//     super(props);

//     this.onResizeStop = this.onResizeStop.bind(this);
//     this.onDragStop = this.onDragStop.bind(this);
//   }

//   UNSAFE_componentWillMount() {
//     console.log("mounted");
//   }

//   generateDOM() {
//     // Generate items with properties from the layout, rather than pass the layout directly
//     const layout = this.generateLayout();

//     return this.props.todos.map((todo, i) => (
//       <div key={todo[0]._id} data-grid={layout[i]}>
//         <RenderTodos todo={todo} />
//       </div>
//     ));
//   }

//   generateLayout() {
//     const layout = this.props.todos.map((item, i) => {
//       const y = _.result(this.props.p, "y") || Math.ceil(Math.random() * 4) + 1;

//       const previousPositions = {
//         ...item[0].positions,
//         i: item[0]._id
//       };

//       return {
//         x: previousPositions?.x || (i * 2) % 12,
//         y: previousPositions?.y || Math.floor(i / 6) * y,
//         w: previousPositions?.w || 2,
//         h: previousPositions?.h || 4,
//         i: previousPositions.i
//       };
//     });

//     return layout;
//   }

//   onResizeStop(arrayPos, gridItem) {
//     arrayPos.forEach(item => {
//       if (item.i === gridItem.i) {
//         this.props.updatePosition(item);
//       }
//     });
//   }

//   onDragStop(arrayPos, gridItem) {
//     arrayPos.forEach(item => {
//       if (item.i === gridItem.i) {
//         this.props.updatePosition(item);
//       }
//     });
//   }

//   render() {
//     return (
//       <ReactGridLayout
//         onResizeStop={this.onResizeStop}
//         onDragStop={this.onDragStop}
//         {...this.props}
//       >
//         {this.generateDOM()}
//       </ReactGridLayout>
//     );
//   }
// }

const Grid = props => {
  const generateLayout = () => {
    const layout = props.todos.map((item, i) => {
      const y = Math.ceil(Math.random() * 4) + 1;

      const previousPositions = {
        ...item[0].positions,
        i: item[0]._id
      };

      console.log(previousPositions);

      return {
        x: previousPositions.x || (i * 2) % 12,
        y: previousPositions.y || Math.floor(i / 6) * y,
        w: previousPositions.w || 2,
        h: previousPositions.h || 4,
        i: previousPositions.i
      };
    });

    return layout;
  };

  const generateDOM = () => {
    const layout = generateLayout();

    return props.todos.map((todo, i) => (
      <div key={todo[0]._id} data-grid={layout[i]}>
        <RenderTodos todo={todo} />
      </div>
    ));
  };

  const layoutChangeHandler = (arrayPos, gridItem) => {
    arrayPos.forEach(item => {
      if (item.i === gridItem.i) {
        props.updatePosition(item);
      }
    });
  };

  return (
    <ReactGridLayout
      measureBeforeMount
      onResizeStop={(arrayPos, gridItem) =>
        layoutChangeHandler(arrayPos, gridItem)
      }
      onDragStop={(arrayPos, gridItem) =>
        layoutChangeHandler(arrayPos, gridItem)
      }
      {...props}
    >
      {generateDOM()}
    </ReactGridLayout>
  );
};

const mapStateToProps = ({ todos }) => ({ todos: todos.todos });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updatePosition }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
