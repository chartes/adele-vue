/*
 Segment
 Blot : embed
 Utilisation : transcription, traduction (indique le début d'un segment de traduction pour l'alignement)
*/
import Quill from 'quill';
let Embed = Quill.import('blots/embed');

const GUARD_TEXT = '\uFEFF';

class SegmentBlot extends Embed {
/*
  constructor(scroll, node) {
    super(scroll, node);
    
    this.contentNode = document.createElement('span');
    this.contentNode.setAttribute('contenteditable', false);
    Array.from(this.domNode.childNodes).forEach(childNode => {
      this.contentNode.appendChild(childNode);
    });
   
    this.leftGuard = document.createTextNode(GUARD_TEXT);
    this.rightGuard = document.createTextNode(GUARD_TEXT);
    this.domNode.appendChild(this.leftGuard);
    this.domNode.appendChild(this.contentNode);
    this.domNode.appendChild(this.rightGuard);
  }
*/
  static create(value) {
    let node = super.create();
    return node;
  }

}
SegmentBlot.blotName = 'segment';
SegmentBlot.tagName = 'adele-segment';

export default SegmentBlot;

