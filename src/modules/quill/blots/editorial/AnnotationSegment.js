import Quill from 'quill';

let Inline = Quill.import('blots/inline');

class AnnotationSegment extends Inline {

  static create(data) {
    let node = super.create();
    if (data.new){
    node.setAttribute('new', true)
    } else {
      node.setAttribute('manifest-url', data.manifest_url)
      node.setAttribute('canvas-idx', data.canvas_idx)
      node.setAttribute('img-idx', data.img_idx)
      node.setAttribute('zone-id', data.zone_id)
    }
    return node;
  }

  static formats(domNode) {
    if (domNode.getAttribute('new')) {
      return {
        new: true,
      }
    }
    return {
      manifest_url: domNode.getAttribute('manifest-url'),
      canvas_idx: domNode.getAttribute('canvas-idx'),
      img_idx: domNode.getAttribute('img-idx'),
      zone_id: domNode.getAttribute('zone-id'),
    }
  }

  format(name, data) {
    if (name === 'adele-annotation' && data) {
      if (data.new){
        this.domNode.setAttribute('new', true)
      } else {
        this.domNode.setAttribute('manifest-url', data.manifest_url)
        this.domNode.setAttribute('canvas-idx', data.canvas_idx)
        this.domNode.setAttribute('img-idx', data.img_idx)
        this.domNode.setAttribute('zone-id', data.zone_id)
      }
    } else {
      super.format(name, data);
    }
  }

  formats() {
    let formats = super.formats();
    formats['annotation'] = AnnotationSegment.formats(this.domNode);
    return formats;
  }
}
AnnotationSegment.blotName = 'annotation';
AnnotationSegment.tagName = 'adele-annotation';

export default AnnotationSegment;
