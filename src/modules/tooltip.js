import Vue from 'vue';
import ToolTip from '@/components/ui/ToolTip';

const toolTipClass =  Vue.extend(ToolTip)

export default function addToolTip(target, content, title = null, options = {}) {
    console.log("ADD TOOLTIP");

    const t = new toolTipClass({propsData: {
        element: target.outerHTML ,
        content: `
          <span>
            ${title ? `<span class="tt-title">${title}</span>`:  ''} 
            <span class="tt-content">${content || ""}</span>
          </span>
        `,
        ...options
      }})
    t.$mount(target)
}