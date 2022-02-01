import Quill from 'quill';

let Inline = Quill.import('blots/inline');

class AnnotationSegment extends Inline { }
AnnotationSegment.blotName = 'annotation';
AnnotationSegment.tagName = 'annotation';

export default AnnotationSegment;
