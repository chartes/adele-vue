import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

function MyComponent(props) {
  let textToDisplay = [];
  if (props.hoveredAnnotationIds) {
    console.log(props.hoveredAnnotationIds);
    textToDisplay = props.annotations
      .map(ann => ann.resources)
      .flat()
      .filter(res => props.hoveredAnnotationIds.includes(res.id))
      .map(res => res.chars);
  }
  return React.createElement("div", {}, [
    React.createElement(Paper, {elevation: 0, style: {position: "absolute", top: 0, width: "100%"}}, 
      textToDisplay.map(text => React.createElement(Typography, {variant: "h2", align: "center"}, [text]))
    ),
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
