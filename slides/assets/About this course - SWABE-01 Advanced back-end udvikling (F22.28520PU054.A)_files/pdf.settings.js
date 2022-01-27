/* globals PDFJS */

'use strict';

if (typeof PDFJS === 'undefined') {
  (typeof window !== 'undefined' ? window : this).PDFJS = {};
}

// These settings are verified to work with pdf.js version 1.2.109

PDFJS.workerSrc = 'https://s.brightspace.com/lib/pdf.js/1.2.109/pdf.worker.js';
