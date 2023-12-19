(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function s(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(o){if(o.ep)return;o.ep=!0;const d=s(o);fetch(o.href,d)}})();const v=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a id="all" class="selected filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a id="pending" class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a id="completed" class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let f;const C=new Uint8Array(16);function L(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(C)}const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));function S(e,t=0){return n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:E};function A(e,t,s){if(w.randomUUID&&!t&&!e)return w.randomUUID();e=e||{};const i=e.random||(e.rng||L)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){s=s||0;for(let o=0;o<16;++o)t[s+o]=i[o];return t}return S(i)}class P{constructor(t){this.id=A(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"Completed",Pending:"Pending"},l={todo:[],filter:"all"},U=()=>{T(),console.log("InitStore")},T=()=>{if(!localStorage.getItem("state"))return;const{todo:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));l.todo=e,l.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(l))},k=(e=a.All)=>{switch(e){case a.All:return[...l.todo];case a.Completed:return l.todo.filter(t=>t.done);case a.Pending:return l.todo.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},D=e=>{if(!e)throw new Error("Description is required");l.todo.push(new P(e)),g()},O=e=>{l.todo=l.todo.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},q=e=>{l.todo=l.todo.filter(t=>t.id!==e),g()},x=()=>{l.todo=l.todo.filter(e=>!e.done),g()},I=(e=a.All)=>{l.filter=e,g()},M=()=>l.filter,c={addTodo:D,deleteCompleted:x,deleteTodo:q,getCurrentFilter:M,getTodos:k,initStore:U,loadStore:T,setFilter:I,toggleTodo:O};let y;const F=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=c.getTodos(a.Pending).length},H=e=>{if(!e)throw new Error("A TODO object is required");const t=`<div class="view">
            <input class="toggle" type="checkbox" ${e.done?"checked":""}>
            <label>${e.description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">`,s=document.createElement("li");return s.innerHTML=t,s.setAttribute("data-id",e.id),e.done&&s.classList.add("completed"),s};let h;const V=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(s=>{h.append(H(s))})},m={ClearCompleted:".clear-completed",TodoList:".todo-list",newTodo:"#new-todo-input",button:".filtro",pendingCount:"#pending-count"},R=e=>{const t=()=>{const r=c.getTodos(c.getCurrentFilter());V(m.TodoList,r),s()},s=()=>{F(m.pendingCount)};(()=>{const r=document.createElement("div");r.innerHTML=v,document.querySelector(e).append(r),t()})();const i=document.querySelector(m.newTodo),o=document.querySelector(m.TodoList),d=document.querySelector(m.ClearCompleted),u=document.querySelectorAll(m.button);i.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(c.addTodo(r.target.value),t(),r.target.value="")}),o.addEventListener("click",r=>{const p=r.target.closest("[data-id]");c.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",r=>{const p=r.target.closest("[data-id]");if(r.target.classList.contains("destroy"))c.deleteTodo(p.getAttribute("data-id")),t();else return}),d.addEventListener("click",()=>{c.deleteCompleted(),t()}),u.forEach(r=>{r.addEventListener("click",p=>{switch(u.forEach(b=>b.classList.remove("selected")),p.target.classList.add("selected"),p.target.id){case"all":c.setFilter(a.All);break;case"pending":c.setFilter(a.Pending);break;case"completed":c.setFilter(a.Completed);break}t()})})};c.initStore();R("#app");
