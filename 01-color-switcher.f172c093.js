const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.querySelector("body")};let e=!1,s=0;function o(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}function n(t){return`position: absolute; top: 50%; left: ${t}%; transform: translate(-50%, -50%); font-weight: 700; font-size: 1.2rem; border-radius: 5px;`}function r(t){return`${n(t)} background-color: ${o()}; color: ${o()}; border: 2px solid ${o()};`}function a(t){return`${r(t)} opacity: 0.5; cursor: not-allowed;`}t.startBtn.style.cssText=n(45),t.stopBtn.style.cssText=`${n(55)} opacity: 0.5; cursor: not-allowed;`,t.stopBtn.disabled=!0,t.startBtn.addEventListener("click",(function(){e=!0,s=setInterval((()=>{t.body.style.backgroundColor=o(),t.startBtn.style.cssText=a(45),t.stopBtn.style.cssText=r(55)}),1e3),e&&(t.startBtn.disabled=!0,t.stopBtn.disabled=!1,t.startBtn.style.cssText=a(45))})),t.stopBtn.addEventListener("click",(function(){e&&(t.startBtn.disabled=!1,t.stopBtn.disabled=!0,t.startBtn.style.cssText=r(45),t.stopBtn.style.cssText=a(55));clearInterval(s)}));
//# sourceMappingURL=01-color-switcher.f172c093.js.map
