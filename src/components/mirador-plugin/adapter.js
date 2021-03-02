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
      return JSON.parse(localStorage.getItem(this.documentId));
      //return http.get(`iiif/${this.documentId}/list/commenting-0`).then((response) => response.data);
    }
}
