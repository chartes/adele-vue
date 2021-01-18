import jsdom from 'jsdom';
import {
  convertLinebreakTEIToQuill,
  convertLinebreakQuillToTEI,
  TEIToQuill,
  quillToTEI,
  computeQuillPointersFromTEIPointers,
  getRelevantSegmentsIndices,
  insertSegments,
  insertSpeechparts,
  sanitizeHtmlWithNotesForSave,
  stripNotes,
  stripSegments,
  stripSpeechparts,
  insertNotesAndSegments,
  computeSpeechpartsPointers
} from '../MarkupUtils'

const dom = new jsdom.JSDOM(); 
global.window = dom.window;
global.document = dom.window.document;
/*
console.log("getselection",  global.document)
require('mutationobserver-shim');
// spec/javascripts/helpers/jest-env.js
// window.getSelection isn't in jsdom
// https://github.com/tmpvar/jsdom/issues/937
global.window.getSelection = global.document.getSelection = function() {
  return {
    addRange: function() {},
    removeAllRanges:function() {}
  };
};
global.window.getRangeAt = global.document.getRangeAt = function() {
  return {
    addRange: function() {},
    removeAllRanges:function() {}
  };
};
*/

global.MutationObserver = window.MutationObserver;

const htmlWithNotes = '<p><note id="1156">Om<ex>n</ex>ib<ex>u</ex></note><ex>s</ex> p<ex>r</ex><note id="1157"><ex>e</ex>sentes</note> litt<ex>e</ex><note id="1158"><ex>r</ex>as insp<ex>e</ex>cturis, . . offic<ex>ia</ex></note><ex>lis</ex> Belvacen<ex>sis</ex>, sal<ex>u</ex>t<ex>em</ex> in D<ex>om</ex>in<ex>o</ex>avo, die 1248, le lune post Jubilat<ex>e</ex>.</p>';
const htmlWithNotesSanitized = '<p><note id="1156">Om<ex>n</ex>ib<ex>u</note>s</ex> p<ex>r<note id="1157">e</ex>sentes</note> litt<ex>e<note id="1158">r</ex>as insp<ex>e</ex>cturis, . . offic<ex>ia</note>lis</ex> Belvacen<ex>sis</ex>, sal<ex>u</ex>t<ex>em</ex> in D<ex>om</ex>in<ex>o</ex>avo, die 1248, le lune post Jubilat<ex>e</ex>.</p>';
const testHtmlWithoutNotes = '<p>Om<ex>n</ex>ib<ex>us</ex> p<ex>re</ex>sentes litt<ex>er</ex>as insp<ex>e</ex>cturis</p>';
const testNotes = [
  {
    "ptr_start": 3,
    "ptr_end": 22,
    "id": 1156,
    "user_id": 4,
    "content": "<p>qssdqd</p>",
    "note_type": {
      "id": 0,
      "label": "TERM"
    }
  },
  {
    "ptr_start": 57,
    "ptr_end": 69,
    "id": 1157,
    "user_id": 4,
    "content": "<p>qdsqd</p>",
    "note_type": {
      "id": 0,
      "label": "TERM"
    }
  }
] 


describe('MarkupUtils', () => {

  test('convertLinebreakTEIToQuill', () => {
    let input = '<lb></lb> <lb/>'
    let ok = '<lb><span class="br"></span><span class="segment-bullet"></span></lb> <lb><span class="br"></span><span class="segment-bullet"></span></lb>'
    expect(convertLinebreakTEIToQuill(input)).toBe(ok)
  })
  test('convertLinebreakQuillToTEI', () => {
    let input = '<lb><span class="br"></span><span class="segment-bullet"></span></lb> <lb><span class="br"></span><span class="segment-bullet"></span></lb>'
    let ok = '<lb/> <lb/>'
    expect(convertLinebreakQuillToTEI(input)).toBe(ok)
  })
  test('getRelevantSegmentsIndices', () => {
    const transcription = '<p>Om<ex>n</ex>ib<ex>us</ex> p<ex>re</ex>sentes litt<ex>er</ex>as insp<ex>e</ex>cturis, . . offic<ex>ialis</ex> Belvacen<ex>sis</ex>, sal<ex>u</ex>t<ex>em</ex> in D<ex>om</ex>in<ex>o</ex>.<lb/>Nov<ex>er</ex>int univ<ex>er</ex>si q<ex>uo</ex>d i<ex>n</ex> n<ex>ost</ex>ra constituti p<ex>re</ex>sentia Ricardus d<ex>i</ex>c<ex>t</ex>us de Gres de S<ex>an</ex>c<ex>t</ex>o Felice <ex>et</ex> Aya ejus uxor</p><p><ex>et</ex> Eufemia eor<ex>um</ex> filia recognov<ex>er</ex>unt se imp<ex>er</ex>petuum vendidisse p<ex>ro</ex> co<ex>m</ex>muni eor<ex>um</ex> utilitate ac necessitate</p><p>abbati <ex>et</ex> conventui S<ex>an</ex>c<ex>t</ex>i G<ex>er</ex>emari Flaviacen<ex>sis</ex> q<ex>u</ex>amdam peciam t<ex>er</ex>re s<ex>em</ex>entis q<ex>u</ex>am h<ex>ab</ex>ebant ex caduco Asceline de Amuchi, matertere dicti Ricardi</p>';
    const translation = '<p>A tous ceux qui verront les présentes lettres, . . l’official de Beauvais, salut dans le Seigneur. <lb/>Sachent tous que constitués en notre présence Richard dit de Grez, de Saint-Félix, Aye son épouse</p><p>et Euphémie leur fille ont reconnu qu’ils ont vendu à perpétuité pour leur commune utilité et leur commun</p><p>besoin à l’abbé et au convent de Saint-Germer de Fly une pièce de terre arable qu’ils avaient de l’héritage d’Asceline d’Amuchy, tante maternelle dudit Richard</p>';
    const incoming = [
      [0, 88, 0, 50],
      [88, 188, 50, 102],
      [188, 301, 102, 153],
      [301, 407, 153, 208],
      [407, 498, 208, 265],
      [498, 582, 265, 320],
      [582, 679, 320, 376],
      [679, 771, 376, 431],
      [771, 825, 431, 486],
    ]
    const transcriptionOk = [ 88, 301, 498, 679, 771 ]
    const translationOk = [ 50,  153, 265, 376, 431 ]
    expect(getRelevantSegmentsIndices(transcription, incoming, 'transcription')).toEqual(transcriptionOk)
    expect(getRelevantSegmentsIndices(translation, incoming, 'translation')).toEqual(translationOk)

  })

  test('insertSegments', () => {
    const transcription = '<p>Om<ex>n</ex>ib<ex>us</ex> p<ex>re</ex>sentes litt<ex>er</ex>as insp<ex>e</ex>cturis, . . offic<ex>ialis</ex> Belvacen<ex>sis</ex>, sal<ex>u</ex>t<ex>em</ex> in D<ex>om</ex>in<ex>o</ex>.<lb/>Nov<ex>er</ex>int univ<ex>er</ex>si q<ex>uo</ex>d i<ex>n</ex> n<ex>ost</ex>ra constituti p<ex>re</ex>sentia Ricardus d<ex>i</ex>c<ex>t</ex>us de Gres de S<ex>an</ex>c<ex>t</ex>o Felice <ex>et</ex> Aya ejus uxor</p><p><ex>et</ex> Eufemia eor<ex>um</ex> filia recognov<ex>er</ex>unt se imp<ex>er</ex>petuum vendidisse p<ex>ro</ex> co<ex>m</ex>muni eor<ex>um</ex> utilitate ac necessitate</p><p>abbati <ex>et</ex> conventui S<ex>an</ex>c<ex>t</ex>i G<ex>er</ex>emari Flaviacen<ex>sis</ex> q<ex>u</ex>amdam peciam t<ex>er</ex>re s<ex>em</ex>entis q<ex>u</ex>am h<ex>ab</ex>ebant ex caduco Asceline de Amuchi, matertere dicti Ricardi</p>';
    const translation = '<p>A tous ceux qui verront les présentes lettres, . . l’official de Beauvais, salut dans le Seigneur. <lb/>Sachent tous que constitués en notre présence Richard dit de Grez, de Saint-Félix, Aye son épouse</p><p>et Euphémie leur fille ont reconnu qu’ils ont vendu à perpétuité pour leur commune utilité et leur commun</p><p>besoin à l’abbé et au convent de Saint-Germer de Fly une pièce de terre arable qu’ils avaient de l’héritage d’Asceline d’Amuchy, tante maternelle dudit Richard</p>';
    const ptrs = [
      [0, 88, 0, 50],
      [88, 188, 50, 102],
      [188, 301, 102, 153],
      [301, 407, 153, 208],
      [407, 498, 208, 265],
      [498, 582, 265, 320],
      [582, 679, 320, 376],
      [679, 771, 376, 431],
      [771, 825, 431, 486],
    ]
    //TODO : réaligner les données de test correctement
    const transcriptionOk = '<p>Om<ex>n</ex>ib<ex>us</ex> p<ex>re</ex>sentes litt<ex>er</ex>as insp<ex>e</ex>cturis, <segment></segment>. . offic<ex>ialis</ex> Belvacen<ex>sis</ex>, sal<ex>u</ex>t<ex>em</ex> in D<ex>om</ex>in<ex>o</ex>.<lb/>Nov<ex>er</ex>int univ<ex>er</ex>si q<ex>uo</ex>d i<ex>n</ex> n<ex>ost</ex>ra constituti p<ex>re</ex>sentia <segment></segment>Ricardus d<ex>i</ex>c<ex>t</ex>us de Gres de S<ex>an</ex>c<ex>t</ex>o Felice <ex>et</ex> Aya ejus uxor</p><p><ex>et</ex> Eufemia eor<ex>um</ex> filia recognov<ex>er</ex>unt se imp<ex>er</ex>petuum <segment></segment>vendidisse p<ex>ro</ex> co<ex>m</ex>muni eor<ex>um</ex> utilitate ac necessitate</p><p>abbati <ex>et</ex> conventui S<ex>an</ex>c<ex>t</ex>i G<ex>er</ex>emari Flaviacen<ex>sis</ex> <segment></segment>q<ex>u</ex>amdam peciam t<ex>er</ex>re s<ex>em</ex>entis q<ex>u</ex>am h<ex>ab</ex>ebant ex <segment></segment>caduco Asceline de Amuchi, matertere dicti Ricardi</p>'
    const translationOk = '<p>A tous ceux qui verront les présentes lettres, <segment></segment>. . l’official de Beauvais, salut dans le Seigneur. <lb/>Sachent tous que constitués en notre présence <segment></segment>Richard dit de Grez, de Saint-Félix, Aye son épouse</p><p>et Euphémie leur fille ont reconnu qu’ils ont vendu à <segment></segment>perpétuité pour leur commune utilité et leur commun</p><p>besoin à l’abbé et au convent de Saint-Germer de Fly <segment></segment>une pièce de terre arable qu’ils avaient de l’héritage <segment></segment>d’Asceline d’Amuchy, tante maternelle dudit Richard</p>'

    let transcriptionPtrs = ptrs.map(e => [e[0], e[1]]).flat()
    transcriptionPtrs.shift()
    transcriptionPtrs.pop()
    transcriptionPtrs = Array.from(new Set(transcriptionPtrs))

    let translationPtrs = ptrs.map(e => [e[2], e[3]]).flat()
    translationPtrs.shift()
    translationPtrs.pop()

    expect(insertSegments(transcription, transcriptionPtrs)).toEqual(transcriptionOk)
    expect(insertSegments(translation, translationPtrs)).toEqual(translationOk)

  })
  test('TEIToQuill', () => {
    //test <hi> to quill
    let TEIData = '<p><hi rend="i"><ex>Chrismon</ex></hi> Au nom de Dieu. Moi la dame enfante <hi rend="i">Urraka</hi>, confirme <hi rend="i"><ex>seing</ex></hi>.</p>';
    let QUILLData = '<p><i><ex>Chrismon</ex></i> Au nom de Dieu. Moi la dame enfante <i>Urraka</i>, confirme <i><ex>seing</ex></i>.</p>'
    expect(TEIToQuill(TEIData)).toBe(QUILLData)

    //test persname with <ex> inside
    TEIData = '<p><hi rend="i"><ex>Chrismon</ex></hi> Au nom de <persName ref="Personne Sainte">Dieu</persName>. Moi la dame enfante <persName ref="Urraka"><hi rend="i">Urraka</hi></persName>, confirme <hi rend="i"><ex>seing</ex></hi>. <persName>Ro<ex>b</ex>ert</persName></p>';
    QUILLData = '<p><i><ex>Chrismon</ex></i> Au nom de <persname ref="Personne Sainte">Dieu</persname>. Moi la dame enfante <persname ref="Urraka"><i>Urraka</i></persname>, confirme <i><ex>seing</ex></i>. <persname>Ro<ex>b</ex>ert</persname></p>'
    expect(TEIToQuill(TEIData)).toBe(QUILLData)
  })
  test('QuillToTEI', () => {
    const TEIData = '<p><hi rend="i"><ex>Chrismon</ex></hi> Au nom de Dieu. Moi la dame enfante <hi rend="i">Urraka</hi>, confirme <hi rend="i"><ex>seing</ex></hi>.</p>';
    const QUILLData = '<p><i><ex>Chrismon</ex></i> Au nom de Dieu. Moi la dame enfante <i>Urraka</i>, confirme <i><ex>seing</ex></i>.</p>'
    expect(quillToTEI(QUILLData)).toBe(TEIData)
  })
  test('computeQuillPointersFromTEIPointers', () => {
    const TEIData = '<p><hi rend="i"><ex>Chrismon</ex></hi> Au nom de Dieu. Moi la dame enfante <hi rend="i">Urraka</hi>, confirme <hi rend="i"><ex>seing</ex></hi>.</p>';
    const TEIPointers = [
      {ptr_start: 59, ptr_end: 66}, // la dame
      {ptr_start: 75, ptr_end: 99}, // <hi rend="i">Urraka</hi>
      {ptr_start: 123, ptr_end: 137} // <ex>seing</ex>
    ]
    const ExpectedQUILLPointers = [
      {ptr_start: 29, ptr_end: 36}, // la dame
      {ptr_start: 45, ptr_end: 51}, // Urraka
      {ptr_start: 62, ptr_end: 67} // seing
    ]
    // compute
    const QuillData = TEIToQuill(TEIData)

    // pointers on the sanitized quill content
    const sanitizedQuillPointers = computeQuillPointersFromTEIPointers(QuillData, TEIPointers, true)
    expect(sanitizedQuillPointers).toEqual(ExpectedQUILLPointers)

    // pointers on the quill html content
    const QuillPointers = computeQuillPointersFromTEIPointers(QuillData, TEIPointers, false)
    //expect(sanitizedQuillPointers).toEqual(ExpectedQUILLPointers)
    // TODO
  })
  test('computeSpeechpartsPointers', () => {
    const trWithSp = `<p>Ceci n'e<speechpart type="1" id="900008">st pas un <hi rend="u">contenu</hi> <hi rend="b">simple</hi>. Il est vrai que cela <hi rend="b">pourra</hi></speechpart><hi rend="b">it</hi> être <hi rend="sc">intéressant</hi>.</p><p>Peut-être la <hi rend="b">gestion</hi> des <hi rend="sc">paragraphes </hi>!</p>`
    const expectedSp = [
      {id: 900008, ptr_start: 11, ptr_end: 113}
    ]
    const speechparts = computeSpeechpartsPointers(trWithSp)
    expect(speechparts).toEqual(expectedSp)
  })
  test('insertSpeechparts', () => {
    const tr = '<p>Adresse, souscription </p><p>Salut et notification</p>'
    const speechparts = {
      3 : {id: 0, note: null, ptr_end: 10, ptr_start: 3, speech_part_type: {id: 1}},
      12: {id: 9, note: null, ptr_end: 24, ptr_start: 12, speech_part_type: {id: 2}},
      25: {id: 300, note: null, ptr_end: 37, ptr_start: 32, speech_part_type: {id: 3}},
      34: {id: 400, note: null, ptr_end: 53, ptr_start: 41, speech_part_type: {id: 4}}
    }
    const expectedTr = `<p><speechpart id="0" type="1">Adresse</speechpart>, <speechpart id="9" type="2">souscription</speechpart> </p><p><speechpart id="300" type="3">Salut</speechpart> et <speechpart id="400" type="4">notification</speechpart></p>`
    const trWithSp = insertSpeechparts(tr, speechparts)
    expect(trWithSp).toEqual(expectedTr)
  })
  test('insertNotesAndSegments', () => {
    const tr = '<p><strong>hello</strong></p><p>!</p><p><i>woooo</i></p><p><i>oorld</i></p>'
    const notesTEI = [
      {
        id: 1,
        content: "<p>whouhouou</p>",
        note_type: {
          id: 0,
          label: "TERM"
        },
        ptr_start: 41,
        ptr_end: 64
      }
    ]
    const expectedTrWithNotes = '<p><strong>hello</strong></p><p>!</p><p><note id="1"><i>woooo</i></note></p><p><i>oorld</i></p>'
    const trWithNotes = insertNotesAndSegments(tr, notesTEI, [], 'transcription')
    console.log("insertNotesAndSegments", trWithNotes)
    expect(trWithNotes).toEqual(expectedTrWithNotes)
  })
  // TODO
  /*
  test('changeElementName', () => {
    expect(true).toBe(false)
  })
  test('copyEltContent', () => {
    expect(true).toBe(false)
  })
  test('copyEltAttributes', () => {
    expect(true).toBe(false)
  })
  test('recurChange', () => {
    expect(true).toBe(false)
  })
  test('insertNotes', () => {
    expect(true).toBe(false)
  })
  test('insertFacsimileZones', () => {
    expect(true).toBe(false)
  })
  test('insertNotesAndSegments', () => {
    expect(true).toBe(false)
  })
  test('insertSpeechparts', () => {
    expect(true).toBe(false)
  })
  test('computeQuillPointersFromTEIPointers', () => {
    expect(true).toBe(false)
  })
  test('computeAlignmentPointers', () => {
    expect(true).toBe(false)
  })
  test('computeAlignmentPointers', () => {
    expect(true).toBe(false)
  })
  test('computeSpeechpartsPointers', () => {
    expect(true).toBe(false)
  })
  test('computeImageAlignmentsPointers', () => {
    expect(true).toBe(false)
  })
  */
  test('stripSegments', () => {
    const int = '<p>Om<ex>n</ex>ib<ex>us</ex> p<ex>re</ex>sentes litt<ex>er</ex>as insp<ex>e</ex>cturis, . . <segment></segment>offic<ex>ialis</ex> Belvacen<ex>sis</ex>, sal<ex>u</ex>t<ex>em</ex> in D<ex>om</ex>in<ex>o</ex>avo, die 1248, le lune post Jubilat<ex>e</ex>.</p>'
    const ok = '<p>Om<ex>n</ex>ib<ex>us</ex> p<ex>re</ex>sentes litt<ex>er</ex>as insp<ex>e</ex>cturis, . . offic<ex>ialis</ex> Belvacen<ex>sis</ex>, sal<ex>u</ex>t<ex>em</ex> in D<ex>om</ex>in<ex>o</ex>avo, die 1248, le lune post Jubilat<ex>e</ex>.</p>'
    expect(stripSegments(int)).toBe(ok)
  })
  test('stripNotes', () => {
    let int = '<p><note id="1156">Om<ex>n</ex>ib<ex>u</note>s</ex> p<ex>re</ex>se<note id="1157">ntes litt<ex>e</note>r</ex>as insp<ex>e</ex>cturis</p>'
    let ok = '<p>Om<ex>n</ex>ib<ex>us</ex> p<ex>re</ex>sentes litt<ex>er</ex>as insp<ex>e</ex>cturis</p>'
    expect(stripNotes(int)).toBe(ok)
  })
  test('stripSpeechparts', () => {
    let int = '<p><speechpart id="1156">Om<ex>n</ex>ib<ex>u</speechpart>s</ex> p<ex>re</ex>se<speechpart id="1157">ntes litt<ex>e</speechpart>r</ex>as insp<ex>e</ex>cturis</p>'
    let ok = '<p>Om<ex>n</ex>ib<ex>us</ex> p<ex>re</ex>sentes litt<ex>er</ex>as insp<ex>e</ex>cturis</p>'
    expect(stripSpeechparts(int)).toBe(ok)
  })
  test('sanitizeHtmlWithNotesForSave', () => {
    expect(sanitizeHtmlWithNotesForSave(htmlWithNotes)).toBe(htmlWithNotesSanitized)
  })

})
