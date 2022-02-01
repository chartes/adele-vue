import Vue from 'vue';
import ToolTip from '@/components/ui/ToolTip';

const toolTipClass =  Vue.extend(ToolTip)

export default function addToolTip(target, content, title = null, options = {}) {
    const t = new toolTipClass({propsData: {
        element: target.outerHTML ,
        content: `
          <span>
            <div class="tt-header">
              <div class="tt-icon ${options.contentType || 'none'}"></div>
            </div>
            ${title ? `<div class="tt-title">${title}</div>`:  ''} 
            <div class="tt-content">${content || ""}</div>
          </span>
        `,
        ...options
      }})
    t.$mount(target)
}