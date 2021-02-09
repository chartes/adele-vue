import React from "react";
import ReactDOM from "react-dom";
import OpenSeadragonCanvasOverlay from "mirador/dist/es/src/lib/OpenSeadragonCanvasOverlay";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

/**
 * paintAnnotationText - paint an annotation content using a context
 */
function paintAnnotationText(ctx, annotation) {
  ctx.fillStyle = "#FFD500";
  if (!annotation.svgSelector) {
    const [x, y, w, h] = annotation.fragmentSelector;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "black";
    const { widht } = ctx.measureText(annotation.chars);
    ctx.fillText(annotation.chars, x, y + h / 2, w);
  }
}

function MyComponent(props) {
  const { viewer } = props;
  let annotations = [];
  let textToDisplay = [];
  const ref = React.useRef(null);
  const overlayRef = React.useRef(null);
  if (props.hoveredAnnotationIds) {
    annotations = props.annotations
      .map(ann => ann.resources)
      .flat()
      .filter(res => props.hoveredAnnotationIds.includes(res.id));
    textToDisplay = annotations.map(res => res.chars);
  }
  const annotation = annotations[0];

  React.useEffect(() => {
    if (viewer) {
      if (!overlayRef.current) {
        overlayRef.current = new OpenSeadragonCanvasOverlay(viewer, ref);
      }
    }
  }, [viewer]);

  React.useEffect(() => {
    if (viewer && annotation) {
      const draw = () => {
        if (annotation && overlayRef.current) {
          const overlay = overlayRef.current;
          overlay.clear();
          overlay.resize();
          overlay.canvasUpdate(() => {
            paintAnnotationText(overlay.context2d, annotation);
          });
        }
      };
      draw();

      viewer.addHandler("update-viewport", draw);
      return () => {
        viewer.removeHandler("update-viewport", draw);
        overlayRef.current && overlayRef.current.clear();
      };
    }
  }, [viewer, annotation]);

  if (!viewer) {
    return null;
  }

  const portal = ReactDOM.createPortal(
    React.createElement(
      "div",
      {
        ref,
        style: {
          height: "100%",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%"
        }
      },
      React.createElement("canvas", { id: "my-beautiful-canvas" })
    ),
    viewer.canvas
  );
  return React.createElement("div", {}, [
    portal,
    React.createElement(props.TargetComponent, {
      ...props.targetProps
    })
  ]);
}

export default {
  target: "AnnotationsOverlay",
  mode: "wrap",
  component: MyComponent
};
