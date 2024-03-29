import React from "react";
import ReactDOM from "react-dom";
import { Point } from "openseadragon";

function cleanAnnoText(s) {
  s = s.replace(/persName/gi, 'persName-disabled')
  s = s.replace(/placeName/gi, 'placeName-disabled')
  return s
}

function MyComponent(props) {
  const { viewer } = props;
  const [ annotationStyle, setAnnotationStyle ] = React.useState(null);  // if not null: {left: number, top: number}
  let annotations = [];
  if (props.hoveredAnnotationIds) {
    annotations = props.annotations
      .map(ann => ann.resources)
      .flat()
      .filter(res => props.hoveredAnnotationIds.includes(res.id));
  }
  const annotation = annotations[0];

  React.useEffect(() => {
    if (viewer && annotation) {
      const draw = () => {
        if (annotation && annotation.chars) {
          let x, y, width, height;
          if (annotation.svgSelector) {
            const divSvg = document.createElement("div");
            divSvg.innerHTML = annotation.svgSelector.value;
            document.body.appendChild(divSvg);
            ({x, y, height, width} = divSvg.children[0].getBBox());
            divSvg.remove();
          } else {
            [x, y, width, height] = annotation.fragmentSelector;
          }
          const point = viewer.viewport.pixelFromPoint(new Point(x, y + height));
          setAnnotationStyle({left: point.x, top: point.y});
        }
      };
      draw();

      viewer.addHandler("update-viewport", draw);
      return () => {
        viewer.removeHandler("update-viewport", draw);
        setAnnotationStyle(null);
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
        style: {
          height: "100%",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%"
        },
      },
      annotationStyle && annotation ?
        React.createElement(
          "div",
          {
            style: {
              position: "sticky",
              left: annotationStyle.left + "px",
              top: annotationStyle.top + "px",
              display: 'inline-block',
              maxWidth: '90%',
              //color: "#EFEF88",
              //textShadow: "1px 0 1px black, -1px 0px 1px black,0px 1px 1px black, 0px -1px 1px black",
              color: "#FD4040",
              backgroundColor: '#FEFEFE',
              fontSize: "22px",
            },
            dangerouslySetInnerHTML: {__html: cleanAnnoText(annotation.chars)}
          },
        ) : null
    ),
    viewer.canvas
  );
  return React.createElement("div", {}, [
    portal,
    React.createElement(props.TargetComponent, {
      key: "annotation_plugin",
      ...props.targetProps
    })
  ]);
}

export default {
  target: "AnnotationsOverlay",
  mode: "wrap",
  component: MyComponent
};
