import React from "react";

function MyComponent(props) {
  console.log(props.selectedAnnotationId);
  const resource = props.annotations
    .map(ann => ann.resources)
    .flat()
    .filter(res => props.selectedAnnotationId === res.id)[0];
  if (resource !== undefined) {
    console.log(resource.chars);
  }
  return React.createElement(props.TargetComponent, {
    ...props.targetProps
  });
}

export default {
  target: "AnnotationsOverlay",
  mode: "wrap",
  component: MyComponent
};
