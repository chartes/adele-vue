import { http } from '../../modules/http-common';


export default class AdeleStorageAdapter {
    /** */
    constructor(manifestUrl, documentId) {
        this.manifestUrl = manifestUrl;
        this.documentId = documentId;
    }
  
    /** */
    async create(annotation) {
      let fragment = null;
      let svg = null;
      const emptyAnnoPage = {
        id: 0,
        items: [],
        type: 'AnnotationPage',
      };
      const annotationPage = emptyAnnoPage;
      annotationPage.items.push(annotation);
      const fragmentSelector = annotation.target.selector.find(({type}) => type === "FragmentSelector");
      if (fragmentSelector) {
        fragment = fragmentSelector.value.match(/xywh=(.*)$/)[1];
      }
      const svgSelector = annotation.target.selector.find(({type}) => type === "SvgSelector");
      if (svgSelector) {
        svg = svgSelector.value;
      }
      http.post(`iiif/${this.documentId}/annotations`,
        {
            manifest_url: this.manifestUrl,
            canvas_idx: 0,
            // In case there are multiple images on a canvas, optionnal, default is 0
            img_idx: 0,
            zone_type_id: 2,
            fragment: fragment,
            svg: svg,
    
            // in case of a COMMENTING motivation, the text content is embedded within the annotation,
            // optionnal, default is none
            note: annotation.body.value
        }
      );
      //localStorage.setItem(this.annotationPageId, JSON.stringify(annotationPage));
      return annotationPage;
    }
  
    /** */
    async update(annotation) {
      return await this.all();
    }
  
    /** */
    async delete(annoId) {
      const annotationPage = await this.all();
      return annotationPage;
    }
  
    /** */
    async get(annoId) {
        return http.get(`iiif/${this.documentId}/annotation/${annoId}`).then((response) => response.data);
    }

    /** */
    async all() {
      return http.get(`iiif/${this.documentId}/list/commenting-0`)
        .then((response) => (this.createAnnotationPage(response.data.resources)));
    }

  /** Creates an AnnotationPage from a list of V2 annotations */
  createAnnotationPage(v2annos) {
    if (Array.isArray(v2annos)) {
      const v3annos = v2annos.map((a) => AdeleStorageAdapter.createV3Anno(a));
      return {
        id: "commenting-0",
        items: v3annos,
        type: 'AnnotationPage',
      };
    }
    return v2annos;
  }

  /** Creates a V3 annotation from a V2 annotation */
  static createV3Anno(v2anno) {
    const v3anno = {
      id: v2anno.resource['@id'],
      motivation: 'commenting',
      type: 'Annotation',
    };
    if (Array.isArray(v2anno.resource)) {
      v3anno.body = v2anno.resource.map((b) => this.createV3AnnoBody(b));
    } else {
      v3anno.body = this.createV3AnnoBody(v2anno.resource);
    }
    let v2target = v2anno.on;
    if (Array.isArray(v2target)) {
      [v2target] = v2target;
    }
    v3anno.target = {
      selector: this.createV3AnnoSelector(v2target.selector),
      source: v2target.full,
    };
    if (v2target.within) {
      v3anno.target.source = {
        id: v2target.full,
        partOf: {
          id: v2target.within['@id'],
          type: 'Manifest',
        },
        type: 'Canvas',
      };
    }
    return v3anno;
  }

  /** */
  static createV3AnnoBody(v2body) {
    const v3body = {
      type: 'TextualBody',
      value: v2body.chars,
    };
    if (v2body.format) {
      v3body.format = v2body.format;
    }
    if (v2body.language) {
      v3body.language = v2body.language;
    }
    if (v2body['@type'] === 'oa:Tag') {
      v3body.purpose = 'tagging';
    }
    return v3body;
  }

  /** */
  static createV3AnnoSelector(v2selector) {
    switch (v2selector['@type']) {
      case 'oa:SvgSelector':
        return {
          type: 'SvgSelector',
          value: v2selector.value,
        };
      case 'oa:FragmentSelector':
        return {
          type: 'FragmentSelector',
          value: v2selector.value,
        };
      case 'oa:Choice':
        /* create alternate selectors */
        return [
          this.createV3AnnoSelector(v2selector.default),
          this.createV3AnnoSelector(v2selector.item),
        ];
      default:
        return null;
    }
  }
}
