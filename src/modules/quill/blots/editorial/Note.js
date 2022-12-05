import Quill from 'quill';

let Inline = Quill.import('blots/inline');

class NoteBlot extends Inline {

  static create(data) {
    let node = super.create();
    const {id} = data;
    if (typeof(id) === 'number'){
      node.setAttribute('id', id)
    }
    return node;
  }

  static formats(domNode) {
    return {
      id: Number.parseInt(domNode.getAttribute('id'))
    }
  }



  format(name, data) {
    if (name === 'adele-note' && data) {
      const {id} = data;
      this.domNode.setAttribute('id', id);
    } else {
      super.format(name, data);
    }
  }

  formats() {
    let formats = super.formats();
    formats['note'] = NoteBlot.formats(this.domNode);
    return formats;
  }
}
NoteBlot.blotName = 'note';
NoteBlot.tagName = 'adele-note';

export default NoteBlot;
