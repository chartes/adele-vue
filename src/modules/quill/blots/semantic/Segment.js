/*
 Segment
 Blot : embed
 Utilisation : transcription, traduction (indique le début d'un segment de traduction pour l'alignement)
*/

import Quill from 'quill'
const Parchment = Quill.import('parchment')

class SegmentBlot extends Parchment.Embed { }

SegmentBlot.blotName = 'segment';
SegmentBlot.tagName = 'adele-segment';

export default SegmentBlot;

