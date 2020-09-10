import Quill from 'quill';

let Inline = Quill.import('blots/inline');

class SpeechpartBlot extends Inline {
	static create(value) {
		let node = super.create();
		console.log('speechpart create,', value)
		if (typeof(value) === 'string'){
      const h = value.split(',')
      node.setAttribute('id', h[0]);
      node.setAttribute('type', h[1]);
    }

		return node;
	}
  static formats(domNode) {
    // hash value
    return `${domNode.getAttribute('id')},${domNode.getAttribute('type')}`
  }
  format(name, value) {
    if (name === 'speechpart' && value) {
      const h = value.split(',')
      console.log("speechpart value", h[0],  h[1])
      this.domNode.setAttribute('id', h[0]);
      this.domNode.setAttribute('type', h[1]);

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
SpeechpartBlot.tagName = 'speechpart';

export default SpeechpartBlot;
