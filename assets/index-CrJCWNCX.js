const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Hero3D-CePRX_F1.js","assets/vendor-three-CGICjMIm.js","assets/vendor-react-CuNqf3F1.js","assets/Hero3D-BmuS6Lq1.css","assets/EventsPage-BVjODyDz.js","assets/Team-0i6-NVnX.js","assets/vendor-ui-TJVS_mYd.js","assets/firestore-DMqwHRLi.js","assets/vendor-motion-Bhsg6psn.js","assets/Team-U3e5QIJO.css","assets/Department-r9TIEfgH.js","assets/AdminLogin-Cut3_JMI.js","assets/vendor-gsap-zy93SWW7.js","assets/AdminLayout-U70oZvMD.js","assets/Dashboard-DTRGY_XY.js","assets/HomeEvents-BfxszHp0.js","assets/storage-CbazId1Z.js","assets/DepartmentAchievements-CsWPJmFv.js","assets/EventGallery-CXvnWMZh.js","assets/TeamManagement-DQo_jfFX.js"])))=>i.map(i=>d[i]);
import{j as e,_ as w,c as Z}from"./vendor-three-CGICjMIm.js";import{b as t,u as Y,c as q,N as ee,B as te,d as H,e as g}from"./vendor-react-CuNqf3F1.js";import{g as C}from"./vendor-gsap-zy93SWW7.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))h(c);new MutationObserver(c=>{for(const r of c)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&h(o)}).observe(document,{childList:!0,subtree:!0});function l(c){const r={};return c.integrity&&(r.integrity=c.integrity),c.referrerPolicy&&(r.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?r.credentials="include":c.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function h(c){if(c.ep)return;c.ep=!0;const r=l(c);fetch(c.href,r)}})();const re=({color:s="green"})=>{const i=t.useRef(null),l=t.useRef(null);return t.useEffect(()=>{const h=i.current,c=l.current;let r=-100,o=-100,d=-100,p=-100,n,m=!1;const y=x=>{r=x.clientX,o=x.clientY,c.style.transform=`translate(${r}px, ${o}px)`},L=()=>{d+=(r-d)*.18,p+=(o-p)*.18;const x=m?1.5:1;h.style.transform=`translate(${d}px, ${p}px) scale(${x})`,n=requestAnimationFrame(L)};n=requestAnimationFrame(L);const j=()=>{m=!0},a=()=>{m=!1};window.addEventListener("mousemove",y,{passive:!0});const f=document.querySelectorAll("a, button, .interactive");return f.forEach(x=>{x.addEventListener("mouseenter",j),x.addEventListener("mouseleave",a)}),()=>{cancelAnimationFrame(n),window.removeEventListener("mousemove",y),f.forEach(x=>{x.removeEventListener("mouseenter",j),x.removeEventListener("mouseleave",a)})}},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:i,className:"custom-cursor","data-cursor-color":s}),e.jsx("div",{ref:l,className:"custom-cursor-dot","data-cursor-color":s})]})},T=[{id:"home",label:"Home"},{id:"department",label:"Department"},{id:"events",label:"Events"},{id:"team",label:"Team"}],V={"/":"home","/events":"events","/team":"team","/department":"department"},ne=()=>{const[s,i]=t.useState(()=>V[window.location.pathname]||"home"),[l,h]=t.useState(!1),[c,r]=t.useState(!1),o=t.useRef(null),d=t.useRef(null),p=t.useRef(!1),n=Y(),m=q();t.useEffect(()=>{const a=V[m.pathname]||"home";i(a)},[m.pathname]),t.useEffect(()=>{const a=()=>h(window.scrollY>80);return window.addEventListener("scroll",a),()=>window.removeEventListener("scroll",a)},[]),t.useEffect(()=>{const a=o.current,f=d.current;if(!a||!f||p.current)return;const x=a.querySelector(".navbar-menu");if(!x)return;const b=S=>{const I=S.getBoundingClientRect(),_=x.getBoundingClientRect();return I.left-_.left+(I.width-f.offsetWidth)/2},N=a.querySelector(".navbar-menu li.active button");N&&document.fonts.ready.then(()=>{C.set(f,{x:b(N)}),C.to(f,{"--active-element-show":"1",duration:.2})})},[s]);const y=a=>{a.innerHTML=`
      <svg viewBox="0 0 116 5" preserveAspectRatio="none" class="beam">
        <path d="M0.5 2.5L113 0.534929C114.099 0.515738 115 1.40113 115 2.5C115 3.59887 114.099 4.48426 113 4.46507L0.5 2.5Z" fill="url(#gradient-beam)"/>
        <defs>
          <linearGradient id="gradient-beam" x1="2" y1="2.5" x2="115" y2="2.5" gradientUnits="userSpaceOnUse">
            <stop stop-color="#08CB00ff"/>
            <stop offset="1" stop-color="white"/>
          </linearGradient>
        </defs>
      </svg>
      <div class="strike">
        <svg viewBox="0 0 114 12" preserveAspectRatio="none">
          <g fill="none" stroke="white" stroke-width="0.75" stroke-linecap="round">
            <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
            <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
            <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
          </g>
        </svg>
        <svg viewBox="0 0 114 12" preserveAspectRatio="none">
          <g fill="none" stroke="white" stroke-width="0.75" stroke-linecap="round">
            <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
            <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
            <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
          </g>
        </svg>
      </div>
    `},L=(a,f)=>{const x=o.current,b=d.current;if(!x||!b||!f||p.current)return;const N=T.findIndex(E=>E.id===s),S=T.findIndex(E=>E.id===a.id);if(N===S)return;const I=x.querySelector(".navbar-menu"),_=E=>{const B=E.getBoundingClientRect(),J=I.getBoundingClientRect();return B.left-J.left+(B.width-b.offsetWidth)/2},R=_(f),F=x.querySelector(".navbar-menu li.active button"),K=F?_(F):R,Q=Math.abs(R-K),P=S>N?"after":"before";p.current=!0,x.classList.add(P),i(a.id),C.set(b,{rotateY:P==="before"?"180deg":"0deg"}),C.to(b,{keyframes:[{"--active-element-width":`${Math.min(Q,x.offsetWidth-60)}px`,duration:.3,ease:"none",onStart:()=>{y(b),C.to(b,{"--active-element-opacity":1,duration:.1})}},{"--active-element-scale-x":"0","--active-element-scale-y":".25","--active-element-width":"0px",duration:.3,onStart:()=>{C.to(b,{"--active-element-mask-position":"40%",duration:.5}),C.to(b,{"--active-element-opacity":0,delay:.45,duration:.25})},onComplete:()=>{b.innerHTML="",x.classList.remove("before","after"),b.removeAttribute("style"),C.set(b,{x:R,"--active-element-show":"1"}),p.current=!1,a.id==="events"?n("/events"):a.id==="team"?n("/team"):a.id==="department"?n("/department"):a.id==="home"&&n("/")}}]}),C.to(b,{x:R,"--active-element-strike-x":"-50%",duration:.6,ease:"none"})},j=m.pathname==="/events"?"navbar-orange":m.pathname==="/team"||m.pathname==="/department"?"navbar-purple":"navbar-green";return e.jsx("nav",{ref:o,className:`navbar ${l?"navbar-hidden":""} ${j}`,children:e.jsxs("div",{className:"navbar-container",children:[e.jsx("div",{className:"navbar-logo",onClick:()=>n("/"),style:{cursor:"pointer"},children:e.jsx("span",{className:`navbar-logo-text ${l?"visible":""}`,children:"IETE"})}),e.jsxs("button",{className:`navbar-hamburger${c?" open":""}`,"aria-label":"Toggle menu",onClick:()=>r(a=>!a),children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]}),e.jsxs("ul",{className:`navbar-menu${c?" menu-open":""}`,children:[T.map(a=>e.jsx("li",{className:s===a.id?"active":"",children:e.jsx("button",{onClick:f=>{L(a,f.currentTarget),r(!1)},children:a.label})},a.id)),e.jsx("div",{ref:d,className:"active-element"})]})]})})},D=["President","Co-President","Technical Lead","Co-Tech Lead","Creative Head","Secretary"],u=290,v=290,z=62,k=44,W=188;function ae(){return Array.from({length:6},(s,i)=>{const l=Math.PI/3*i-Math.PI/2;return{id:i+1,x:u+W*Math.cos(l),y:v+W*Math.sin(l)}})}const M=ae(),O=["#FF6900","#f59e0b","#00c4ff","#22d3ee","#a855f7","#22c55e"],G=["3.2s","4s","3.6s","4.4s","3.8s","4.2s"],X=["0s","0.6s","1.2s","1.8s","2.4s","3s"];function ie(){const s=Y(),[i,l]=t.useState(0),[h,c]=t.useState(!0);return t.useEffect(()=>{const r=setInterval(()=>{c(!1),setTimeout(()=>{l(o=>(o+1)%D.length),c(!0)},350)},2800);return()=>clearInterval(r)},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .bc-outer {
          width: 100%;
          background: #000000;
          padding: 60px 5vw;
          box-sizing: border-box;
        }
        .bc-wrap {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          background: #F5E6D3;
          border-radius: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 70px 5vw;
          gap: 5vw;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(255,105,0,0.15),
            0 4px 20px rgba(255,105,0,0.12),
            0 12px 60px rgba(0,0,0,0.5);
        }
        .bc-wrap::before {
          content:'';
          position:absolute;inset:0;
          border-radius: 28px;
          background-image:
            linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px);
          background-size:56px 56px;
          pointer-events:none;
        }
        .bc-wrap::after {
          content:'';
          position:absolute;
          right:0; top:10%; bottom:10%; width:50%;
          border-radius: 28px;
          background: radial-gradient(ellipse 65% 65% at 60% 50%, rgba(255,105,0,0.14) 0%, transparent 70%);
          pointer-events:none;
        }
        .bc-left {
          flex: 0 0 44%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          z-index: 2;
        }
        .bc-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,105,0,0.1);
          border: 1px solid rgba(255,105,0,0.35);
          color: #cc5500;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          font-family: 'Inter',sans-serif;
          margin-bottom: 24px;
        }
        .bc-heading {
          font-family: 'Funnel Display','Inter',sans-serif;
          font-size: clamp(2.1rem, 3.5vw, 3.2rem);
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.12;
          letter-spacing: -0.025em;
          margin-bottom: 20px;
        }
        .bc-heading em {
          font-style: normal;
          background: linear-gradient(135deg, #FF6900 0%, #ff8533 40%, #ffb347 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 16px rgba(255,105,0,0.35));
        }
        .bc-sub {
          font-family: 'Inter',sans-serif;
          font-size: 1rem;
          color: rgba(40,30,20,0.6);
          line-height: 1.75;
          margin-bottom: 40px;
          max-width: 400px;
        }
        .bc-btns { display:flex; gap:14px; flex-wrap:wrap; }
        .bc-btn-primary {
          display:inline-flex; align-items:center;
          background:#FF6900; color:#fff;
          font-family:'Inter',sans-serif; font-size:14px; font-weight:700;
          padding:14px 30px; border-radius:8px; border:none;
          cursor:pointer; text-decoration:none;
          position:relative; overflow:hidden;
          transition:box-shadow 0.3s ease;
        }
        .bc-btn-primary:hover {
          box-shadow:0 6px 24px rgba(255,105,0,0.35);
        }
        .bc-btn-primary .btn-text-wrap {
          display:inline-flex;
          flex-direction:column;
          height:1.2em;
          overflow:hidden;
          line-height:1.2em;
        }
        .bc-btn-primary .btn-t {
          display:block;
          transition:transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .bc-btn-primary:hover .btn-t {
          transform:translateY(-100%);
        }
        .bc-btn-ghost {
          display:inline-flex; align-items:center; justify-content:center;
          background:transparent; color:#3d2b1a;
          font-family:'Inter',sans-serif; font-size:14px; font-weight:600;
          padding:14px 28px; border-radius:8px;
          border:1.5px solid rgba(40,30,20,0.25);
          cursor:pointer; text-decoration:none;
          position:relative; overflow:hidden; z-index:1;
          transition:color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .bc-btn-ghost::before {
          content:'';
          position:absolute; top:0; left:0;
          width:100%; height:100%;
          background:#3d2b1a;
          transform:translateX(-100%);
          transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);
          z-index:-1;
          border-radius:6px;
        }
        .bc-btn-ghost:hover::before {
          transform:translateX(0);
        }
        .bc-btn-ghost:hover {
          color:#F5E6D3;
          border-color:#3d2b1a;
          box-shadow:0 4px 18px rgba(40,30,20,0.18);
        }
        .bc-right {
          flex:1; min-width:0;
          display:flex; align-items:center; justify-content:center;
          position:relative; z-index:2;
        }
        .bc-right svg {
          width:100%; max-width:540px;
          height:auto; overflow:visible; display:block;
        }
        .bc-role-label { transition:opacity 0.35s ease; }
        .bc-role-label.hidden { opacity:0; }
        @keyframes bcf0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes bcf1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes bcf2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes bcf3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes bcf4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes bcf5 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .bcn-0{animation:bcf0 3.1s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
        .bcn-1{animation:bcf1 4.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
        .bcn-2{animation:bcf2 3.7s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
        .bcn-3{animation:bcf3 4.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
        .bcn-4{animation:bcf4 3.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
        .bcn-5{animation:bcf5 4.8s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
        @keyframes bc-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .bc-hub-dash{animation:bc-spin 20s linear infinite;transform-box:fill-box;transform-origin:center;}
        @media(max-width:860px){
          .bc-outer{padding:40px 4vw;}
          .bc-wrap{flex-direction:column;padding:50px 6vw 60px;gap:40px;border-radius:20px;}
          .bc-left{max-width:100%;align-items:center;text-align:center;}
          .bc-btns{justify-content:center;}
          .bc-right svg{max-width:400px;}
        }
        @media(max-width:480px){
          .bc-outer{padding:24px 3vw;}
          .bc-wrap{padding:40px 5vw 48px;gap:28px;border-radius:16px;}
          .bc-heading{font-size:1.8rem;}
          .bc-sub{font-size:0.9rem;}
          .bc-right svg{max-width:280px;}
          .bc-btn-primary,.bc-btn-ghost{padding:12px 22px;font-size:13px;}
        }
      `}),e.jsx("section",{className:"bc-outer",children:e.jsxs("div",{className:"bc-wrap",children:[e.jsxs("div",{className:"bc-left",children:[e.jsxs("h2",{className:"bc-heading",children:["Meet the People",e.jsx("br",{}),"Behind ",e.jsx("em",{children:"IETE"})]}),e.jsx("p",{className:"bc-sub",children:"Our leadership network — Presidents, Technical Leads, Creative Heads and more — united to drive innovation, learning, and community across India."}),e.jsx("div",{className:"bc-btns",children:e.jsx("a",{onClick:()=>s("/team"),className:"bc-btn-primary",style:{cursor:"pointer"},children:e.jsxs("span",{className:"btn-text-wrap",children:[e.jsx("span",{className:"btn-t",children:"Meet the Team →"}),e.jsx("span",{className:"btn-t",children:"Meet the Team →"})]})})})]}),e.jsx("div",{className:"bc-right",children:e.jsxs("svg",{viewBox:"0 0 580 580",xmlns:"http://www.w3.org/2000/svg",children:[e.jsxs("defs",{children:[e.jsxs("filter",{id:"bc-glow-hub",x:"-60%",y:"-60%",width:"220%",height:"220%",children:[e.jsx("feGaussianBlur",{stdDeviation:"12",result:"b"}),e.jsxs("feMerge",{children:[e.jsx("feMergeNode",{in:"b"}),e.jsx("feMergeNode",{in:"SourceGraphic"})]})]}),e.jsxs("filter",{id:"bc-glow-node",x:"-80%",y:"-80%",width:"260%",height:"260%",children:[e.jsx("feGaussianBlur",{stdDeviation:"6",result:"b"}),e.jsxs("feMerge",{children:[e.jsx("feMergeNode",{in:"b"}),e.jsx("feMergeNode",{in:"SourceGraphic"})]})]}),e.jsxs("filter",{id:"bc-glow-dot",x:"-150%",y:"-150%",width:"400%",height:"400%",children:[e.jsx("feGaussianBlur",{stdDeviation:"3",result:"b"}),e.jsxs("feMerge",{children:[e.jsx("feMergeNode",{in:"b"}),e.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),M.map((r,o)=>e.jsx("line",{x1:u,y1:v,x2:Math.round(r.x),y2:Math.round(r.y),stroke:O[o],strokeWidth:"1.4",strokeOpacity:"0.45",strokeDasharray:"6 9"},"line"+o)),M.map((r,o)=>e.jsx("circle",{r:"5",fill:O[o],filter:"url(#bc-glow-dot)",children:e.jsx("animateMotion",{path:"M"+u+","+v+" L"+Math.round(r.x)+","+Math.round(r.y),dur:G[o],begin:X[o],repeatCount:"indefinite"})},"dot"+o)),M.map((r,o)=>e.jsx("circle",{r:"2.5",fill:O[o],opacity:"0.4",children:e.jsx("animateMotion",{path:"M"+Math.round(r.x)+","+Math.round(r.y)+" L"+u+","+v,dur:G[o],begin:X[o],repeatCount:"indefinite"})},"rdot"+o)),[0,1].map(r=>e.jsxs("circle",{cx:u,cy:v,fill:"none",stroke:"#FF6900",strokeWidth:"1",strokeOpacity:"0",children:[e.jsx("animate",{attributeName:"r",from:z+2,to:z+60,dur:"2.8s",begin:r*1.4+"s",repeatCount:"indefinite"}),e.jsx("animate",{attributeName:"stroke-opacity",from:"0.6",to:"0",dur:"2.8s",begin:r*1.4+"s",repeatCount:"indefinite"})]},"pulse"+r)),e.jsx("circle",{cx:u,cy:v,r:z+18,fill:"#FF6900",fillOpacity:"0.25",filter:"url(#bc-glow-hub)"}),e.jsx("circle",{cx:u,cy:v,r:z,fill:"#FF6900"}),e.jsx("circle",{cx:u,cy:v,r:z-10,fill:"none",stroke:"rgba(255,255,255,0.35)",strokeWidth:"1.2",strokeDasharray:"5 6",className:"bc-hub-dash"}),e.jsx("text",{x:u,y:v-7,textAnchor:"middle",fill:"#fff",fontSize:"17",fontWeight:"900",fontFamily:"'Funnel Display','Inter',Arial,sans-serif",letterSpacing:"2.5",children:"IETE"}),e.jsx("rect",{x:u-22,y:v-1,width:"44",height:"1.5",fill:"rgba(255,255,255,0.6)",rx:"1"}),e.jsx("text",{x:u,y:v+15,textAnchor:"middle",fill:"rgba(255,255,255,0.7)",fontSize:"7",fontFamily:"'Inter',Arial,sans-serif",letterSpacing:"1.5",children:"EST. 1953"}),M.map((r,o)=>{const d=Math.round(r.x),p=Math.round(r.y),n=O[o],m=D[(o+i)%D.length],y=m.length*7.2+16;return e.jsxs("g",{className:"bcn-"+o,children:[e.jsx("circle",{cx:d,cy:p,r:k+14,fill:n,fillOpacity:"0.14",filter:"url(#bc-glow-node)"}),e.jsx("circle",{cx:d,cy:p,r:k,fill:"#F0DCC8",stroke:n,strokeWidth:"2.5"}),e.jsx("circle",{cx:d,cy:p,r:k-6,fill:n,fillOpacity:"0.1"}),e.jsx("circle",{cx:d,cy:p-10,r:"12",fill:n,fillOpacity:"0.8"}),e.jsx("path",{d:"M"+(d-18)+","+(p+30)+" Q"+(d-18)+","+(p+8)+" "+d+","+(p+8)+" Q"+(d+18)+","+(p+8)+" "+(d+18)+","+(p+30),fill:n,fillOpacity:"0.55"}),e.jsx("rect",{x:d-y/2,y:p+k+8,width:y,height:"20",rx:"10",fill:n,fillOpacity:"0.15",stroke:n,strokeWidth:"0.9",strokeOpacity:"0.55",className:"bc-role-label"+(h?"":" hidden")}),e.jsx("text",{x:d,y:p+k+22,textAnchor:"middle",fill:n,fontSize:"8.5",fontWeight:"700",fontFamily:"'Inter',Arial,sans-serif",className:"bc-role-label"+(h?"":" hidden"),children:m}),e.jsx("rect",{x:d-18,y:p-k-16,width:"36",height:"14",rx:"7",fill:"#e8d4be",stroke:"rgba(0,0,0,0.1)",strokeWidth:"0.8"}),e.jsx("text",{x:d,y:p-k-5,textAnchor:"middle",fill:"rgba(60,40,20,0.45)",fontSize:"6.5",fontFamily:"'Inter',Arial,sans-serif",letterSpacing:"0.5",children:"DEMO"})]},"node"+o)})]})})]})})]})}const se=t.forwardRef(function(i,l){const h=t.useRef(null),[c,r]=t.useState(!1),o=t.useRef(0),d=t.useRef([]),p=t.useRef(null);return t.useEffect(()=>{const n=new IntersectionObserver(([m])=>{m.isIntersecting&&(r(!0),n.disconnect())},{threshold:.1});return h.current&&n.observe(h.current),()=>n.disconnect()},[]),t.useEffect(()=>{const n=()=>{if(!h.current)return;const m=h.current.getBoundingClientRect(),y=window.innerHeight,L=y*.4,j=-y*.15;let a;m.top>=L?a=0:m.top<=j?a=1:a=Math.max(0,Math.min(1,1-(m.top-j)/(L-j))),o.current=a,window.__evMorphProgress=a;const f=p.current;f&&(f.style.borderRadius=`${a*50}%`,f.style.transform=`translateY(0) scale(${1-a*.15})`,a>.8?f.classList.add("morphed"):f.classList.remove("morphed"));const x=Math.max(0,1-a*1.5);for(const b of d.current)b&&(b.style.opacity=x)};return window.addEventListener("scroll",n,{passive:!0}),n(),()=>window.removeEventListener("scroll",n)},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .ev-section {
          width: 100%;
          
          background: #93C572;
          padding: 250px 9vw 250px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          border-radius: 40px;
        }

        /* Soft noise texture */
        .ev-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* Ambient light orb top-right */
        .ev-section::after {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 65%);
          top: -120px; right: -120px;
          pointer-events: none;
          z-index: 0;
          animation: ev-orb-drift 14s ease-in-out infinite alternate;
        }
        @keyframes ev-orb-drift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-50px, 70px) scale(1.12); }
        }

        .ev-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          /* No z-index here! Canvas (z-index:1) must remain ABOVE the center card
             so the 3D model renders on top of the circle, not behind it. */
        }

        /* ── Section Header ── */
        .ev-header {
          margin-bottom: 52px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .ev-visible .ev-header { opacity: 1; transform: translateY(0); }

        .ev-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(0,0,0,0.14);
          border: 1px solid rgba(0,0,0,0.18);
          color: rgba(0,0,0,0.6);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          backdrop-filter: blur(6px);
        }
        .ev-header-badge::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #0d3b30;
          box-shadow: 0 0 6px rgba(0,0,0,0.35);
          animation: ev-badge-pulse 2.2s ease-in-out infinite;
        }
        @keyframes ev-badge-pulse {
          0%, 100% { opacity:1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.65); }
        }

        .ev-header-title {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: #0d2e0d;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0;
          text-shadow:
            0 0 16px rgba(8, 203, 0, 0.7),
            0 0 36px rgba(8, 203, 0, 0.45),
            0 0 75px rgba(8, 203, 0, 0.23);
        }
        .ev-header-sub {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: rgba(0,0,0,0.42);
          font-weight: 400;
          margin: 0;
          max-width: 420px;
          line-height: 1.6;
        }


        /* ═══ Bento Grid ═══ */
        .ev-bento {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 18px;
          min-height: 520px;
          height: 520px;
          align-items: stretch;
        }

        /* ═══ Cards ═══ */
        .ev-card {
          border-radius: 28px;
          padding: 26px 22px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.7s cubic-bezier(0.22,1,0.36,1),
            transform 0.7s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        /* Shine sweep on hover */
        .ev-card::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%);
          transition: left 0.6s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
          z-index: 10;
        }
        .ev-card:hover::after {
          left: 160%;
        }
        .ev-card:not(.ev-img-card):not(.ev-card-center):hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.3);
        }
        .ev-img-card { padding: 0; }
        .ev-visible .ev-card:nth-child(1) { opacity:1; transform:translateY(0); transition-delay:0.08s; }
        .ev-visible .ev-card:nth-child(2) { opacity:1; transform:translateY(0); transition-delay:0.16s; }
        .ev-visible .ev-right-col .ev-card:nth-child(1) { opacity:1; transform:translateY(0); transition-delay:0.24s; }
        .ev-visible .ev-right-col .ev-card:nth-child(2) { opacity:1; transform:translateY(0); transition-delay:0.32s; }

        /* Card 1 — Bento style, tall left (spans 2 rows) */
        .ev-card-1 {
          grid-column: 1;
          grid-row: 1 / 3;
          background: #0d3b30;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 4px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05) inset;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px 28px 28px;
          overflow: hidden;
        }
        .ev-card-1:hover {
          box-shadow: 0 24px 70px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.08) inset;
        }

        /* Green diagonal accent patch — bottom right */
        .ev-card-1::before {
          content: '';
          position: absolute;
          bottom: 0; right: 0;
          width: 55%;
          height: 45%;
          background: #93C572;
          border-radius: 100% 0 28px 0;
          transform: translate(10%, 10%);
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
        }
        .ev-card-1:hover::before {
          transform: translate(5%, 5%);
        }
       

        /* Floating mockup */
        .ev-c1-mockup {
          position: absolute;
          bottom: 70px;
          left: 50%;
          transform: translateX(-46%) translateY(18px) rotate(-4deg);
          width: 68%;
          max-width: 230px;
          opacity: 0;
          z-index: 3;
          transition:
            transform 0.7s cubic-bezier(0.22,1,0.36,1),
            opacity 0.6s ease;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.6));
        }
        .ev-visible .ev-card-1 .ev-c1-mockup {
          opacity: 1;
          transform: translateX(-46%) translateY(0) rotate(-4deg);
          transition-delay: 0.35s;
        }
        .ev-card-1:hover .ev-c1-mockup {
          transform: translateX(-46%) translateY(-16px) rotate(-2deg);
        }

        /* Mockup inner UI */
        .ev-c1-mock-inner {
          background: #fff;
          border-radius: 18px;
          padding: 18px 16px 16px;
          font-family: 'Inter', sans-serif;
          color: #111;
          box-shadow: 0 12px 40px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.12);
          backdrop-filter: blur(12px);
        }
        .ev-c1-mock-title {
          font-size: 15px;
          font-weight: 800;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ev-c1-mock-avatar {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b1f8e, #93C572);
        }
        .ev-c1-mock-level {
          font-size: 10px;
          color: #888;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .ev-c1-mock-bar-bg {
          background: #eee;
          border-radius: 4px;
          height: 6px;
          margin-bottom: 10px;
        }
        .ev-c1-mock-bar-fill {
          background: linear-gradient(90deg, #ff6900, #ffb347);
          height: 100%;
          width: 72%;
          border-radius: 4px;
          animation: ev-bar-grow 1.2s cubic-bezier(0.22,1,0.36,1) both 0.8s;
        }
        @keyframes ev-bar-grow {
          from { width: 0; }
          to   { width: 72%; }
        }
        .ev-c1-mock-pts {
          font-size: 18px;
          font-weight: 900;
          margin-bottom: 10px;
        }
        .ev-c1-mock-pts span { color: #ff6900; margin-right: 4px; }
        .ev-c1-mock-tag {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #aaa;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .ev-c1-mock-chips {
          display: flex;
          gap: 6px;
        }
        .ev-c1-mock-chip {
          background: #3b1f8e;
          color: #fff;
          border-radius: 10px;
          padding: 7px 9px;
          font-size: 9px;
          font-weight: 700;
          line-height: 1.3;
          flex: 1;
        }

        /* Card 1 text layers */
        .ev-c1-top { position: relative; z-index: 4; }
        .ev-c1-top .ev-card-title {
          font-size: clamp(1.3rem, 2vw, 1.7rem);
          margin-bottom: 0;
          line-height: 1.2;
        }
        .ev-c1-bottom { position: relative; z-index: 4; }
        .ev-c1-sub {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0;
          opacity: 0.75;
          letter-spacing: 0.04em;
        }

        /* Card 2 — Center text card (spans 2 rows) — morphing */
        .ev-card-center {
          grid-column: 2;
          grid-row: 1 / 3;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow:
            0 0 0 1px rgba(147,197,114,0.06),
            0 8px 32px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          align-self: center;
          text-align: center;
          padding: 48px 32px;
          aspect-ratio: 1 / 1;
          width: 80%;
          max-width: 420px;
          max-height: 420px;
          margin: 0 auto;
          will-change: border-radius, transform;
          transition:
            border-radius 0.05s linear,
            transform 0.05s linear,
            box-shadow 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .ev-card-center.morphed {
          box-shadow:
            0 0 0 2px rgba(147,197,114,0.25),
            0 0 40px rgba(147,197,114,0.12),
            0 0 80px rgba(147,197,114,0.06),
            0 0 120px rgba(8,203,0,0.04),
            inset 0 0 40px rgba(147,197,114,0.03);
          border-color: rgba(147,197,114,0.2);
        }

        /* ═══ Right column wrapper ═══ */
        .ev-right-col {
          grid-column: 3;
          grid-row: 1 / 3;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Thunder border wrapper */
        .ev-thunder-wrap {
          flex: 1;
          min-height: 0;
          position: relative;
          border-radius: 28px;
          padding: 2px;
          background: transparent;
          transition: flex-grow 0.5s cubic-bezier(0.22,1,0.36,1);
          isolation: isolate;
        }
        .ev-thunder-wrap::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 30px;
          background: conic-gradient(
            from 0deg,
            #08CB00 0%,
            #93C572 15%,
            transparent 30%,
            transparent 70%,
            #ffb347 85%,
            #ff6900 100%
          );
          opacity: 0.15;
          transition: opacity 0.4s cubic-bezier(0.22,1,0.36,1);
          animation: ev-thunder-spin 3s linear infinite;
          z-index: 0;
        }
        .ev-thunder-wrap:hover::before {
          opacity: 1;
        }
       
        @keyframes ev-thunder-spin {
          to { transform: rotate(360deg); }
        }

        /* Card 3 — top bento card */
        .ev-card-3 {
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: #111827;
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 22px 20px;
          box-sizing: border-box;
          transition: box-shadow 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease, transform 0.6s ease;
        }
        .ev-card-3:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);
        }

        /* Card 4 — bottom bento card */
        .ev-card-4 {
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: #1a0a2e;
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 22px 20px;
          box-sizing: border-box;
          transition: box-shadow 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease, transform 0.6s ease;
        }
        .ev-card-4:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);
        }

        /* Grow/shrink on sibling hover */
        .ev-right-col:has(.ev-thunder-wrap:nth-child(1):hover) .ev-thunder-wrap:nth-child(1) { flex-grow: 2.5; }
        .ev-right-col:has(.ev-thunder-wrap:nth-child(1):hover) .ev-thunder-wrap:nth-child(2) { flex-grow: 0.3; }
        .ev-right-col:has(.ev-thunder-wrap:nth-child(2):hover) .ev-thunder-wrap:nth-child(2) { flex-grow: 2.5; }
        .ev-right-col:has(.ev-thunder-wrap:nth-child(2):hover) .ev-thunder-wrap:nth-child(1) { flex-grow: 0.3; }

        /* ═══ Bento card inner elements ═══ */
        .ev-bc-top { position: relative; z-index: 2; }
        .ev-bc-bottom { position: relative; z-index: 2; }

        /* Floating stats widget */
        .ev-bc-widget {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          padding: 14px 14px 12px;
          margin: 12px 0;
          font-family: 'Inter', sans-serif;
          position: relative;
          z-index: 2;
          transform: translateY(10px);
          opacity: 0;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06);
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease;
        }
        .ev-thunder-wrap:hover .ev-bc-widget {
          transform: translateY(0);
          opacity: 1;
        }
        .ev-bc-widget-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }
        .ev-bc-widget-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b1f8e, #08CB00);
          flex-shrink: 0;
        }
        .ev-bc-widget-name {
          font-size: 13px;
          font-weight: 800;
          color: #fff;
        }
        .ev-bc-widget-sub {
          font-size: 10px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 8px;
        }
        .ev-bc-bar-bg {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          height: 5px;
          margin-bottom: 10px;
          overflow: hidden;
        }
        .ev-bc-bar-fill {
          height: 100%;
          border-radius: 4px;
          width: 0;
          transition: width 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s;
        }
        .ev-thunder-wrap:hover .ev-bc-bar-fill { width: 72%; }
        .ev-bc-pts {
          font-size: 16px;
          font-weight: 900;
          color: #fff;
          margin-bottom: 8px;
        }
        .ev-bc-chips {
          display: flex;
          gap: 6px;
        }
        .ev-bc-chip {
          border-radius: 10px;
          padding: 6px 8px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          line-height: 1.4;
          flex: 1;
          backdrop-filter: blur(4px);
          transition: transform 0.2s ease;
        }
        .ev-bc-chip:hover {
          transform: translateY(-1px);
        }

        /* Hover desc fade in */
        .ev-bc-desc {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
        }
        .ev-thunder-wrap:hover .ev-bc-desc {
          opacity: 1;
          transform: translateY(0);
        }

        /* ═══ Event image card styles ═══ */
        .ev-img-card {
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        .ev-img-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .ev-img-card:hover img {
          transform: scale(1.06);
        }

        /* Static top info bar */
        .ev-img-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          padding: 18px 22px 14px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%);
          z-index: 3;
        }
        .ev-img-top .ev-card-dept {
          margin-bottom: 4px;
        }
        .ev-img-top .ev-card-title {
          font-size: clamp(1.1rem, 1.8vw, 1.4rem);
          margin-bottom: 0;
        }

        /* Hover overlay — slides up from bottom */
        .ev-img-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 22px 22px 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.88) 60%, transparent 100%);
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease;
          z-index: 3;
        }
        .ev-img-card:hover .ev-img-overlay {
          transform: translateY(0);
          opacity: 1;
        }
        .ev-img-overlay .ev-card-desc {
          color: rgba(255,255,255,0.88);
          font-size: 13.5px;
          margin-bottom: 14px;
        }
        .ev-img-overlay .ev-pill {
          margin-top: 0;
          padding: 10px 18px;
          font-size: 12px;
        }



        /* ═══ Card Typography ═══ */
        .ev-card-title {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: clamp(1.4rem, 2.2vw, 1.8rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 12px;
        }
        .ev-card-dept {
          font-family: 'Inter', sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          margin-bottom: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .ev-card-dept::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.8;
        }
        .ev-card-desc {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          line-height: 1.65;
          max-width: 320px;
        }

        /* Pill button */
        .ev-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.95);
          color: #1a1a1a;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          padding: 14px 24px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          margin-top: 24px;
          transition: background 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
          position: relative;
          overflow: hidden;
        }
        .ev-pill::after {
          content: '';
          position: absolute;
          top: 0; left: -80%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          skewX: -15deg;
          transition: left 0.5s ease;
        }
        .ev-pill:hover::after {
          left: 130%;
        }
        .ev-pill:hover {
          background: #fff;
          transform: scale(1.05) translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .ev-pill-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #3b1f8e;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 14px;
        }

        /* Dots indicator */
        .ev-dots {
          display: flex;
          gap: 6px;
          margin-top: 20px;
        }
        .ev-dot {
          width: 24px;
          height: 4px;
          border-radius: 4px;
          background: rgba(255,255,255,0.25);
        }
        .ev-dot.active { background: #fff; }

        /* ═══ Center card ═══ */
        .ev-center-heading {
          font-family: 'Funnel Display', 'Inter', sans-serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .ev-center-heading em {
          font-style: normal;
          background: linear-gradient(135deg, #FF6900, #ffb347);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ev-center-desc {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          max-width: 280px;
        }
        .ev-skel {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
          align-items: center;
        }
        .ev-skel-line {
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.04) 100%);
          background-size: 200% 100%;
          animation: ev-skel-shimmer 2s ease-in-out infinite;
        }
        @keyframes ev-skel-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* ═══ Green card bar chart ═══ */
        .ev-graphic {
          margin-top: 20px;
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .ev-graphic-bar {
          width: 28px;
          border-radius: 6px 6px 0 0;
          background: rgba(255,255,255,0.25);
          transition: background 0.3s ease, height 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.3s ease;
        }
        .ev-card:hover .ev-graphic-bar {
          background: rgba(255,255,255,0.55);
          transform: scaleY(1.08);
          transform-origin: bottom;
        }

        /* ═══ Orange card lock badge ═══ */
        .ev-lock-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.9);
          border-radius: 12px;
          padding: 14px 20px;
          margin-top: 18px;
        }
        .ev-lock-icon { font-size: 22px; }
        .ev-lock-line {
          width: 80px;
          height: 2px;
          background: rgba(0,0,0,0.12);
          border-radius: 2px;
        }

        /* ═══ Responsive ═══ */
        @media (max-width: 860px) {
          .ev-section { padding: 120px 6vw 120px; }
          .ev-bento {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            height: auto;
            min-height: unset;
          }
          .ev-card-1 { grid-column: 1; grid-row: auto; min-height: 320px; }
          .ev-card-center {
            grid-column: 2; grid-row: auto;
            width: 100%; max-width: 100%; max-height: 360px;
            aspect-ratio: 1 / 1;
          }
          .ev-right-col { grid-column: 1 / 3; grid-row: auto; min-height: 400px; }
        }
        @media (max-width: 560px) {
          .ev-section { padding: 80px 5vw 80px; }
          .ev-bento { grid-template-columns: 1fr; }
          .ev-card-1 { min-height: 280px; }
          .ev-card-center {
            grid-column: 1; width: 90%; max-width: 340px;
            margin: 0 auto; max-height: 340px;
            /* disable scroll morph on small screens */
            border-radius: 50% !important;
            transform: none !important;
          }
          .ev-right-col { grid-column: 1; min-height: 360px; }
          .ev-right-col { flex-direction: column; }
        }
      `}),e.jsx("section",{className:"ev-section  "+(c?" ev-visible":""),ref:h,children:e.jsxs("div",{className:"ev-container",children:[e.jsxs("div",{className:"ev-header",children:[e.jsx("h2",{className:"ev-header-title",children:"Events & Experiences"}),e.jsx("p",{className:"ev-header-sub",children:"Competitions, workshops, and real-world challenges — curated for every stage of your engineering journey."})]}),e.jsxs("div",{className:"ev-bento",children:[e.jsxs("div",{className:"ev-card ev-card-1",children:[e.jsx("div",{className:"ev-c1-top",children:e.jsxs("div",{className:"ev-card-title",children:["Get Rewarded",e.jsx("br",{}),"for Events",e.jsx("br",{}),"& Competitions"]})}),e.jsx("div",{className:"ev-c1-mockup",children:e.jsxs("div",{className:"ev-c1-mock-inner",children:[e.jsxs("div",{className:"ev-c1-mock-title",children:[e.jsx("div",{className:"ev-c1-mock-avatar"}),"Rewards"]}),e.jsx("div",{className:"ev-c1-mock-level",children:"Level 2  ·  Frontier"}),e.jsx("div",{className:"ev-c1-mock-bar-bg",children:e.jsx("div",{className:"ev-c1-mock-bar-fill"})}),e.jsxs("div",{className:"ev-c1-mock-pts",children:[e.jsx("span",{children:"🏆"}),"22,578 pts"]}),e.jsx("div",{className:"ev-c1-mock-tag",children:"Active bonuses   3"}),e.jsxs("div",{className:"ev-c1-mock-chips",children:[e.jsxs("div",{className:"ev-c1-mock-chip",children:["2x pts for",e.jsx("br",{}),"Hackathons",e.jsx("br",{}),e.jsx("span",{style:{fontSize:"8px",opacity:.7},children:"Season 1"})]}),e.jsxs("div",{className:"ev-c1-mock-chip",children:["50% pts",e.jsx("br",{}),"Workshops",e.jsx("br",{}),e.jsx("span",{style:{fontSize:"8px",opacity:.7},children:"Season 1"})]})]})]})}),e.jsx("div",{className:"ev-c1-bottom",children:e.jsx("div",{className:"ev-c1-sub",children:"Season 2 coming soon"})})]}),e.jsxs("div",{ref:n=>{p.current=n,l&&(l.current=n)},className:"ev-card ev-card-center",style:{borderRadius:"0%",transform:"translateY(0) scale(1)"},children:[e.jsxs("div",{ref:n=>d.current[0]=n,className:"ev-skel",style:{opacity:1},children:[e.jsx("span",{className:"ev-skel-line",style:{width:"60%"}}),e.jsx("span",{className:"ev-skel-line",style:{width:"80%"}}),e.jsx("span",{className:"ev-skel-line",style:{width:"50%"}})]}),e.jsxs("div",{ref:n=>d.current[1]=n,className:"ev-center-heading",style:{opacity:1},children:["Event ",e.jsx("br",{}),"Conducted By",e.jsx("br",{}),e.jsx("em",{children:"IETE"})]}),e.jsxs("div",{ref:n=>d.current[2]=n,className:"ev-skel",style:{opacity:1},children:[e.jsx("span",{className:"ev-skel-line",style:{width:"90%"}}),e.jsx("span",{className:"ev-skel-line",style:{width:"70%"}}),e.jsx("span",{className:"ev-skel-line",style:{width:"85%"}})]}),e.jsx("div",{ref:n=>d.current[3]=n,className:"ev-center-desc",style:{opacity:1},children:"Events, workshops, competitions — your gateway to real-world tech experience."})]}),e.jsxs("div",{className:"ev-right-col",children:[e.jsx("div",{className:"ev-thunder-wrap",children:e.jsxs("div",{className:"ev-card ev-card-3",children:[e.jsxs("div",{className:"ev-bc-top",children:[e.jsx("div",{className:"ev-card-dept",style:{color:"rgba(8,203,0,0.8)"},children:"Electronics Wing"}),e.jsxs("div",{className:"ev-card-title",style:{fontSize:"clamp(1.1rem,1.6vw,1.4rem)"},children:["CircuitCraft",e.jsx("br",{}),"Competition"]})]}),e.jsxs("div",{className:"ev-bc-widget",children:[e.jsxs("div",{className:"ev-bc-widget-header",children:[e.jsx("div",{className:"ev-bc-widget-avatar"}),e.jsx("div",{className:"ev-bc-widget-name",children:"⚡ Event Stats"})]}),e.jsx("div",{className:"ev-bc-widget-sub",children:"Season 1  ·  Electronics"}),e.jsx("div",{className:"ev-bc-bar-bg",children:e.jsx("div",{className:"ev-bc-bar-fill",style:{background:"linear-gradient(90deg,#08CB00,#93C572)"}})}),e.jsx("div",{className:"ev-bc-pts",children:"🏆  480 Participants"}),e.jsxs("div",{className:"ev-bc-chips",children:[e.jsxs("div",{className:"ev-bc-chip",style:{background:"#0d3b30"},children:["Circuit",e.jsx("br",{}),"Design",e.jsx("br",{}),e.jsx("span",{style:{opacity:.6,fontSize:"8px"},children:"Hardware"})]}),e.jsxs("div",{className:"ev-bc-chip",style:{background:"#0d3b30"},children:["2x pts",e.jsx("br",{}),"for Wins",e.jsx("br",{}),e.jsx("span",{style:{opacity:.6,fontSize:"8px"},children:"Bonus"})]})]})]}),e.jsxs("div",{className:"ev-bc-bottom",children:[e.jsx("div",{className:"ev-bc-desc",children:"Hands-on circuit design competition pushing embedded systems to the edge. Build, test, and compete."}),e.jsxs("div",{className:"ev-pill",style:{marginTop:"12px",padding:"10px 16px",fontSize:"12px",background:"rgba(8,203,0,0.15)",color:"#08CB00",border:"1px solid rgba(8,203,0,0.3)"},children:[e.jsx("span",{children:"⚡"})," Register Now"]})]})]})}),e.jsx("div",{className:"ev-thunder-wrap",children:e.jsxs("div",{className:"ev-card ev-card-4",children:[e.jsxs("div",{className:"ev-bc-top",children:[e.jsx("div",{className:"ev-card-dept",style:{color:"rgba(255,140,90,0.8)"},children:"Security Wing"}),e.jsxs("div",{className:"ev-card-title",style:{fontSize:"clamp(1.1rem,1.6vw,1.4rem)"},children:["Privacy-first:",e.jsx("br",{}),"Your Data"]})]}),e.jsxs("div",{className:"ev-bc-widget",children:[e.jsxs("div",{className:"ev-bc-widget-header",children:[e.jsx("div",{className:"ev-bc-widget-avatar",style:{background:"linear-gradient(135deg,#ff6900,#3b1f8e)"}}),e.jsx("div",{className:"ev-bc-widget-name",children:"🔒 Security Score"})]}),e.jsx("div",{className:"ev-bc-widget-sub",children:"Season 1  ·  CyberSec"}),e.jsx("div",{className:"ev-bc-bar-bg",children:e.jsx("div",{className:"ev-bc-bar-fill",style:{background:"linear-gradient(90deg,#ff6900,#ffb347)"}})}),e.jsx("div",{className:"ev-bc-pts",children:"🛡️  256-bit Secure"}),e.jsxs("div",{className:"ev-bc-chips",children:[e.jsxs("div",{className:"ev-bc-chip",style:{background:"#1a0a2e",border:"1px solid rgba(255,140,90,0.2)"},children:["Ethical",e.jsx("br",{}),"Hacking",e.jsx("br",{}),e.jsx("span",{style:{opacity:.6,fontSize:"8px"},children:"Workshop"})]}),e.jsxs("div",{className:"ev-bc-chip",style:{background:"#1a0a2e",border:"1px solid rgba(255,140,90,0.2)"},children:["Data",e.jsx("br",{}),"Privacy",e.jsx("br",{}),e.jsx("span",{style:{opacity:.6,fontSize:"8px"},children:"Certified"})]})]})]}),e.jsxs("div",{className:"ev-bc-bottom",children:[e.jsx("div",{className:"ev-bc-desc",children:"All registrations are secure per IETE data policy. Learn ethical hacking and data protection."}),e.jsxs("div",{className:"ev-pill",style:{marginTop:"12px",padding:"10px 16px",fontSize:"12px",background:"rgba(255,140,90,0.12)",color:"#ff8c5a",border:"1px solid rgba(255,140,90,0.3)"},children:[e.jsx("span",{children:"🔒"})," Learn More"]})]})]})})]})]})]})})]})}),oe=[{label:"Home",path:"/"},{label:"Events",path:"/events"},{label:"Team",path:"/team"},{label:"Department",path:"/department"}],ce=({logoRef:s})=>{const i=Y();return e.jsxs("footer",{className:"site-footer",children:[e.jsx("div",{className:"footer-top-glow"}),e.jsxs("div",{className:"footer-container",children:[e.jsxs("div",{className:"footer-brand-row",children:[e.jsx("div",{className:"footer-logo-circle",ref:s,children:e.jsx("span",{className:"footer-logo-text",children:"IETE"})}),e.jsxs("div",{className:"footer-brand-info",children:[e.jsx("h2",{className:"footer-brand-name",children:"IETE Student Forum"}),e.jsx("p",{className:"footer-brand-tagline",children:"Innovating Electronics & Computer Engineering"})]})]}),e.jsx("div",{className:"footer-divider"}),e.jsxs("div",{className:"footer-columns",children:[e.jsxs("div",{className:"footer-col",children:[e.jsx("h5",{className:"footer-col-title",children:"Navigation"}),e.jsx("ul",{className:"footer-link-list",children:oe.map(l=>e.jsx("li",{children:e.jsxs("button",{className:"footer-link-btn",onClick:()=>i(l.path),children:[e.jsx("span",{className:"footer-link-arrow",children:"→"}),l.label]})},l.path))})]}),e.jsxs("div",{className:"footer-col",children:[e.jsx("h5",{className:"footer-col-title",children:"About IETE"}),e.jsx("p",{className:"footer-col-text",children:"A student-run technical chapter under the Institution of Electronics and Telecommunication Engineers — one of India's premier professional societies. We foster innovation, learning, and leadership among engineering students."})]}),e.jsxs("div",{className:"footer-col",children:[e.jsx("h5",{className:"footer-col-title",children:"What We Do"}),e.jsx("ul",{className:"footer-link-list",children:["Technical Workshops","Hackathons","Guest Lectures","Inter-College Competitions","Project Showcases"].map(l=>e.jsx("li",{children:e.jsx("span",{className:"footer-list-item",children:l})},l))})]})]}),e.jsx("div",{className:"footer-divider"}),e.jsxs("div",{className:"footer-bottom",children:[e.jsxs("span",{children:["© ",new Date().getFullYear()," IETE MIT Student Chapter. All rights reserved."]}),e.jsxs("span",{className:"footer-credit",children:["Made with ",e.jsx("span",{className:"footer-heart",children:"♥"})," by the Aditya Brandwal"]})]})]})]})},le="admin@gmail.com",de="admin@123",A="iete_admin_session",pe=480*60*1e3;function xe(s){return btoa(JSON.stringify({email:s,exp:Date.now()+pe}))}function me(s){if(!s)return null;try{const i=JSON.parse(atob(s));return Date.now()>i.exp?(localStorage.removeItem(A),null):i}catch(i){return null}}function Ae(s,i){return s.trim()!==le||i!==de?Promise.reject(new Error("Invalid credentials")):(localStorage.setItem(A,xe(s.trim())),Promise.resolve())}function Te(){return localStorage.removeItem(A),Promise.resolve()}function fe(s){const i=localStorage.getItem(A),l=me(i);return setTimeout(()=>s(l?{email:l.email}:null),0),()=>{}}const U=t.createContext(null);function be({children:s}){const[i,l]=t.useState(void 0);return t.useEffect(()=>fe(c=>l(c!=null?c:null)),[]),e.jsx(U.Provider,{value:{user:i},children:s})}function he(){return t.useContext(U)}function ge({children:s}){const{user:i}=he();return i===void 0?e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-[#15173D]",children:e.jsx("div",{className:"w-10 h-10 border-4 border-[#982598] border-t-transparent rounded-full animate-spin"})}):i?s:e.jsx(ee,{to:"/admin/login",replace:!0})}const ue=t.lazy(()=>w(()=>import("./Hero3D-CePRX_F1.js"),__vite__mapDeps([0,1,2,3]))),ve=t.lazy(()=>w(()=>import("./EventsPage-BVjODyDz.js"),__vite__mapDeps([4,1,2]))),we=t.lazy(()=>w(()=>import("./Team-0i6-NVnX.js"),__vite__mapDeps([5,1,2,6,7,8,9]))),ye=t.lazy(()=>w(()=>import("./Department-r9TIEfgH.js"),__vite__mapDeps([10,1,2,8]))),Ce=t.lazy(()=>w(()=>import("./AdminLogin-Cut3_JMI.js"),__vite__mapDeps([11,1,2,8,6,12]))),je=t.lazy(()=>w(()=>import("./AdminLayout-U70oZvMD.js"),__vite__mapDeps([13,1,2,8,6,12]))),Le=t.lazy(()=>w(()=>import("./Dashboard-DTRGY_XY.js"),__vite__mapDeps([14,1,2,7,8,6]))),ke=t.lazy(()=>w(()=>import("./HomeEvents-BfxszHp0.js"),__vite__mapDeps([15,1,2,7,16,6,8]))),Ne=t.lazy(()=>w(()=>import("./DepartmentAchievements-CsWPJmFv.js"),__vite__mapDeps([17,1,2,7,16,6,8]))),Ee=t.lazy(()=>w(()=>import("./EventGallery-CXvnWMZh.js"),__vite__mapDeps([18,1,2,7,16,6,8]))),ze=t.lazy(()=>w(()=>import("./TeamManagement-DQo_jfFX.js"),__vite__mapDeps([19,1,2,7,16,6,8])));function Se({footerLogoRef:s}){const i=t.useRef(null);return t.useEffect(()=>{document.documentElement.style.scrollBehavior="smooth"},[]),e.jsxs(e.Fragment,{children:[e.jsx(t.Suspense,{fallback:e.jsx("div",{style:{minHeight:"100vh",background:"#0a0a0a"}}),children:e.jsx(ue,{centerCardRef:i,footerLogoRef:s})}),e.jsx(ie,{}),e.jsx(se,{ref:i})]})}function Ie(){const s=t.useRef(null);return e.jsx(te,{children:e.jsx(be,{children:e.jsxs(H,{children:[e.jsx(g,{path:"/admin/login",element:e.jsx(t.Suspense,{fallback:e.jsx($,{}),children:e.jsx(Ce,{})})}),e.jsxs(g,{path:"/admin/*",element:e.jsx(ge,{children:e.jsx(t.Suspense,{fallback:e.jsx($,{}),children:e.jsx(je,{})})}),children:[e.jsx(g,{index:!0,element:e.jsx(t.Suspense,{fallback:null,children:e.jsx(Le,{})})}),e.jsx(g,{path:"home-events",element:e.jsx(t.Suspense,{fallback:null,children:e.jsx(ke,{})})}),e.jsx(g,{path:"achievements",element:e.jsx(t.Suspense,{fallback:null,children:e.jsx(Ne,{})})}),e.jsx(g,{path:"gallery",element:e.jsx(t.Suspense,{fallback:null,children:e.jsx(Ee,{})})}),e.jsx(g,{path:"team",element:e.jsx(t.Suspense,{fallback:null,children:e.jsx(ze,{})})})]}),e.jsx(g,{path:"/*",element:e.jsxs(e.Fragment,{children:[e.jsx(_e,{}),e.jsx(ne,{}),e.jsx(t.Suspense,{fallback:e.jsx("div",{style:{minHeight:"100vh",background:"#0a0a0a"}}),children:e.jsxs(H,{children:[e.jsx(g,{path:"/",element:e.jsx(Se,{footerLogoRef:s})}),e.jsx(g,{path:"/events",element:e.jsx(ve,{})}),e.jsx(g,{path:"/team",element:e.jsx(we,{})}),e.jsx(g,{path:"/department",element:e.jsx(ye,{})})]})}),e.jsx(ce,{logoRef:s})]})})]})})})}function $(){return e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-[#15173D]",children:e.jsx("div",{className:"w-10 h-10 border-4 border-[#982598] border-t-transparent rounded-full animate-spin"})})}function _e(){const i=q().pathname==="/events"?"orange":"green";return e.jsx(re,{color:i})}Z.createRoot(document.getElementById("root")).render(e.jsx(t.StrictMode,{children:e.jsx(Ie,{})}));export{Te as a,Ae as s};
