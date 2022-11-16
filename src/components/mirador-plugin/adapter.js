import { http } from '../../modules/http-common';


export default class AdeleStorageAdapter {
    /** */
    constructor(editable, manifestOriginUrl, documentId, canvasId) {
        this.editable = editable
        this.manifestOriginUrl = manifestOriginUrl;
        console.log("storage adapter", manifestOriginUrl)
        this.documentId = documentId;
        this.canvasId = canvasId.match(/canvas\/f(\d*)$/)[1] - 1;
        console.log(this.canvasId);
        this.annotationPageId = `${process.env.VUE_APP_API_URL}/iiif/${this.documentId}/list/commenting-${this.canvasId}`;
    }
  
    /** */
    async create(annotation) {
      if (!this.editable)
        return await this.all();

      let fragment = null;
      let svg = null;
      /*
      const emptyAnnoPage = {
        id: 0,
        items: [],
        type: 'AnnotationPage',
      };
      const annotationPage = emptyAnnoPage;
      annotationPage.items.push(annotation);
      */
      const fragmentSelector = annotation.target.selector.find(({type}) => type === "FragmentSelector");
      if (fragmentSelector) {
        fragment = fragmentSelector.value.match(/xywh=(.*)$/)[1];
      }
      const svgSelector = annotation.target.selector.find(({type}) => type === "SvgSelector");
      if (svgSelector) {
        svg = svgSelector.value;
      }

      const annotationFacsim = document.querySelector('adele-annotation[new="true"]')

      let newAnno = {
        manifest_url: this.manifestOriginUrl,
        canvas_idx: this.canvasId,
        // In case there are multiple images on a canvas, optionnal, default is 0
        img_idx: 0,
        fragment: fragment,
        svg: svg,

      }
      if (annotationFacsim) {
        newAnno['zone_type_id'] = 1
      } else {
        newAnno['zone_type_id'] = 2
        newAnno['note'] =annotation.body.value
      }

      const response = await http.post(`iiif/${this.documentId}/annotations`, newAnno);
      document.dispatchEvent(new CustomEvent('annotation-created', {detail: response.data.data}));

      return await this.all();
    }
  
    /** */
    async update(annotation) {
      if (!this.editable)
        return await this.all();

      const zone_id = parseInt(annotation.id.split('/').pop())
      console.log("lets update this", annotation, zone_id)
      let fragment = null;
      let svg = null;

      const fragmentSelector = annotation.target.selector.find(({type}) => type === "FragmentSelector");
      if (fragmentSelector) {
        fragment = fragmentSelector.value.match(/xywh=(.*)$/)[1];
      }
      const svgSelector = annotation.target.selector.find(({type}) => type === "SvgSelector");
      if (svgSelector) {
        svg = svgSelector.value;
      }

      const newAnnotationFacsim = document.querySelector('adele-annotation[new="true"]')
      if (newAnnotationFacsim) {
        alert('Le texte de l\'annotation ne peut pas être modifié, veuillez supprimer celle-ci puis la recréer.')
        document.dispatchEvent(new CustomEvent('annotation-changed'))

        return await this.all();
      }

      const ptrStartInput = document.querySelector('#ptr-start')
      const ptrEndInput = document.querySelector('#ptr-end')


      let anno = {
        manifest_url: this.manifestOriginUrl,
        canvas_idx: this.canvasId,
        // In case there are multiple images on a canvas, optionnal, default is 0
        img_idx: 0,
        fragment: fragment,
        svg: svg,
      }
      if (ptrStartInput && ptrEndInput && ptrStartInput.value && ptrEndInput.value) {
        anno['ptr_start'] = ptrStartInput.value
        anno['ptr_end'] = ptrEndInput.value
        anno['zone_type_id'] = 1
      } else {
        anno['zone_type_id'] = 2
        anno['note'] =annotation.body.value
      }

      await http.put(`iiif/${this.documentId}/annotation/${zone_id}`, anno);
      document.dispatchEvent(new CustomEvent('annotation-changed'))

      return await this.all();
    }
  
    /** */
    async delete(annoId) {
      if (!this.editable)
        return await this.all();

      const zoneId = annoId.split('/').pop()
      await http.delete(`iiif/${this.documentId}/annotation/${zoneId}`)
      document.dispatchEvent(new CustomEvent('annotation-changed'))

      return await this.all();
    }
  
    /** */
    async get(annoId) {
        return http.get(`iiif/${this.documentId}/annotation/${annoId}`).then((response) => response.data);
    }

    /** */
    async all() {
      return http.get(`iiif/${this.documentId}/list/commenting-${this.canvasId}`)
        .then((response) => (this.createAnnotationPage(response.data.resources)));
    }

  /** Creates an AnnotationPage from a list of V2 annotations */
  createAnnotationPage(v2annos) {
    if (Array.isArray(v2annos)) {
      const v3annos = v2annos.map((a) => AdeleStorageAdapter.createV3Anno(a));
      return {
        id: `commenting-${this.canvasId}`,
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
      motivation: 'sc:painting',
      type: 'oa:Annotation',
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
          type: 'sc:Manifest',
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
