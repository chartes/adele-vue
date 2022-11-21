import Quill from 'quill';

let Inline = Quill.import('blots/inline');

class SpeechpartBlot extends Inline {
  static create(value) {
    const node = super.create();
    const {type_id, note} = value;
    if (typeof(type_id) === 'number' && typeof(note) === 'string'){
      node.setAttribute('type_id', type_id);
      node.setAttribute('note', note)
    }
    return node;
  }
  static formats(domNode) {
    // hash value
    return {type_id: Number.parseInt(domNode.getAttribute('type_id')), note: domNode.getAttribute('note')}
  }
  format(name, value) {
    if (name === 'speechpart' && value) {
      const {type_id, note} = value;
      this.domNode.setAttribute('type_id', type_id);
      this.domNode.setAttribute('note', note)
    } else {
      super.format(name, value);
    }
  }

  formats() {
    let formats = super.formats();
    formats['speechpart'] = SpeechpartBlot.formats(this.domNode);
    return formats;
  }
}
SpeechpartBlot.blotName = 'speechpart';
SpeechpartBlot.tagName = 'adele-speechpart';

export default SpeechpartBlot;
