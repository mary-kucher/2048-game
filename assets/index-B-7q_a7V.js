(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();document.querySelector("#app").innerHTML=`
    <div class="best-score">
      <p>Best Score:</p>
      <span class="score game-best-score">0</span>
    </div>
    <div class="container">
      <div class="game-header">
        <h1 class="game-name">2048</h1>
        <div class="score-info">
          Score: <span class="score game-score">0</span>
        </div>
        <button class="button start">Start</button>
      </div>

      <table class="game-field">
        <tbody>
          <tr class="field-row">
            <td class="field-cell"></td>
            <td class="field-cell"></td>
            <td class="field-cell"></td>
            <td class="field-cell"></td>
          </tr>

          <tr class="field-row">
            <td class="field-cell"></td>
            <td class="field-cell"></td>
            <td class="field-cell"></td>
            <td class="field-cell"></td>
          </tr>


          <tr class="field-row">
            <td class="field-cell"></td>
            <td class="field-cell"></td>
            <td class="field-cell"></td>
            <td class="field-cell"></td>
          </tr>


          <tr class="field-row">
            <td class="field-cell"></td>
            <td class="field-cell"></td>
            <td class="field-cell"></td>
            <td class="field-cell"></td>
          </tr>
        </tbody>
      </table>

      <div class="tile-container"></div>

      <div class="message-container">
        <p class="message message-lose hidden">Oh no... You lose! <br/> Restart the game?</p>
        <p class="message message-win hidden">Winner! Congrats! You did it!</p>
        <p class="message message-start">Press "Start" to begin the game.<br/> Good luck!</p>
      </div>
    </div>
    <div class="change-theme">
      <p>Change Theme:</p>
      <div class="theme-options">
        <label style="color: #dddf00;">
          <input type="radio" name="theme" value="moss" checked>
          Moss
        </label>
        <label style="color: #ff69b4;">
          <input type="radio" name="theme" value="rose">
          Rose
        </label>
        <label style="color: #ff8c00;">
          <input type="radio" name="theme" value="sun">
          Sun
        </label>
        <label style="color: #00acc1;">
          <input type="radio" name="theme" value="ocean">
          Ocean
        </label>
      </div>
    </div>
`;class d{constructor(e,t){this.value=Math.random()<.9?2:4,this.tileHTML=document.createElement("div"),this.position={row:e,cell:t,indexArr:e*4+t}}setNewPosition(e,t){this.position={row:e,cell:t,indexArr:e*4+t}}merge(e){this.value+=e.value,e.setNewPosition(this.position.row,this.position.cell),this.tileHTML.style.zIndex="2",e.tileHTML.style.zIndex="1",e.render(),setTimeout(()=>e.tileHTML.remove(),300)}render(){const e=document.querySelectorAll(".field-cell");this.tileHTML.textContent=`${this.value}`,this.tileHTML.className=`tile tile--${this.value}`;const{top:t,left:i}=e[this.position.indexArr].getBoundingClientRect();this.tileHTML.style.top=`${t}px`,this.tileHTML.style.left=`${i}px`}addTileToView(){document.querySelector(".tile-container").append(this.tileHTML)}}class m{constructor(){this.matrix=[[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]],this.wasMove=!1,this.maxTileValue=2048,this.wasMerge=!1,this.mergedTilesSum=0,this.win=!1,this.addTile(),this.addTile(),this.updated()}coordsEmptyTiles(){return this.matrix.map((e,t)=>e.map((i,s)=>{if(i==null)return{x:t,y:s}})).flat().filter(e=>e)}addTile(){const e=this.coordsEmptyTiles();let t=Math.floor(Math.random()*e.length),{x:i,y:s}=e[t];this.matrix[i][s]=new d(i,s),this.matrix[i][s].addTileToView()}updated(){for(let e=0;e<this.matrix.length;e++)for(let t=0;t<this.matrix.length;t++)this.matrix[e][t]&&(this.matrix[e][t].setNewPosition(e,t),this.matrix[e][t].render())}clear(){this.matrix.flat().filter(e=>e).forEach(e=>{e.tileHTML.remove()})}moveLeft(){this.cleanMoveMerge(),this.shift(!1)}moveRight(){this.cleanMoveMerge(),this.shift()}moveUp(){this.cleanMoveMerge(),this.shiftUpDown(!1)}moveDown(){this.cleanMoveMerge(),this.shiftUpDown()}swapTiles(e,t,i,s){let l=this.matrix[e][t];this.matrix[e][t]=this.matrix[i][s],this.matrix[i][s]=l,this.wasMove=!0}shift(e=!0){for(let t=0;t<this.matrix.length;t++){let i=e?this.matrix.length-1:0,s=e?i-1:1,l=e?-1:1;for(;s<this.matrix.length&&s>=0;)this.matrix[t][s]?this.matrix[t][i]?this.matrix[t][i].value===this.matrix[t][s].value?(this.matrix[t][i].setNewPosition(t,i),this.mergeTiles(t,s,t,i),i+=l,s+=l):(i+=l,i===s&&(s+=l)):(this.swapTiles(t,i,t,s),s+=l):s+=l}}shiftUpDown(e=!0){for(let t=0;t<this.matrix.length;t++){let i=e?this.matrix.length-1:0,s=e?i-1:1,l=e?-1:1;for(;s<this.matrix.length&&s>=0;)this.matrix[s][t]?this.matrix[i][t]?this.matrix[i][t].value===this.matrix[s][t].value?(this.matrix[i][t].setNewPosition(i,t),this.mergeTiles(s,t,i,t),i+=l,s+=l):(i+=l,i===s&&(s+=l)):(this.swapTiles(i,t,s,t),s+=l):s+=l}}mergeTiles(e,t,i,s){this.wasMerge=!0;let l=this.matrix[e][t].value;this.mergedTilesSum+=l*2,this.matrix[i][s].merge(this.matrix[e][t]),this.matrix[e][t]=null,this.matrix[i][s].value===this.maxTileValue&&(this.win=!0)}cleanMoveMerge(){this.wasMove=!1,this.wasMerge=!1}isMergePossible(){return this.matrix.flat().some((e,t,i)=>{let s=e.value;return(t+1)%4!==0&&s===i[t+1].value?!0:t+4<=i.length-1&&s===i[t+4].value})}}class u{constructor(){this.score=0,this.bestScore=0,this.table=new m,this.listenerArrows=this.handleArrowsButtonPressing.bind(this),this.touchStartListener=this.handleTouchStart.bind(this),this.touchEndListener=this.handleTouchEnd.bind(this),this.gameField=document.querySelector(".game-field"),this.bestScoreElement=document.querySelector(".game-best-score"),this.endGame=document.querySelector(".message-lose"),this.addScore=document.querySelector(".game-score"),this.winGame=document.querySelector(".message-win"),this.arrows=["ArrowLeft","ArrowUp","ArrowRight","ArrowDown"],document.addEventListener("keydown",this.listenerArrows),this.x1=null,this.y1=null,this.gameField.addEventListener("touchstart",this.touchStartListener),this.gameField.addEventListener("touchmove",this.touchEndListener),this.initBestScore()}handleTouchStart(e){e.preventDefault();const t=e.touches[0];this.x1=t.clientX,this.y1=t.clientY}handleTouchEnd(e){if(e.preventDefault(),!this.x1||!this.y1)return!1;const t=e.touches[0].clientX,i=e.touches[0].clientY,s=t-this.x1,l=i-this.y1;Math.abs(s)>Math.abs(l)?s>0?this.table.moveRight():this.table.moveLeft():l>0?this.table.moveDown():this.table.moveUp(),this.x1=null,this.y1=null,this.allChecks()}handleArrowsButtonPressing(e){if(this.arrows.includes(e.key)){switch(e.preventDefault(),e.key){case"ArrowLeft":this.table.moveLeft();break;case"ArrowUp":this.table.moveUp();break;case"ArrowRight":this.table.moveRight();break;case"ArrowDown":this.table.moveDown();break}this.allChecks()}}allChecks(){(this.table.wasMove||this.table.wasMerge)&&this.table.addTile(),this.table.updated(),this.table.wasMerge&&(this.score+=this.table.mergedTilesSum,this.table.mergedTilesSum=0),this.addScore.textContent=this.score,this.table.coordsEmptyTiles().length<1&&!this.table.isMergePossible()?(this.updateBestScore(),setTimeout(()=>this.endGame.classList.remove("hidden"),1e3)):this.table.win&&(this.updateBestScore(),this.winGame.classList.remove("hidden"))}stop(){document.removeEventListener("keydown",this.listenerArrows),this.gameField.removeEventListener("touchstart",this.touchStartListener),this.gameField.removeEventListener("touchmove",this.touchEndListener),this.table.clear(),this.endGame.classList.add("hidden"),this.winGame.classList.add("hidden"),this.score=0,this.addScore.textContent="0",this.updateBestScore()}initBestScore(){const e=localStorage.getItem("bestScore");this.bestScore=e?parseInt(e,10):0,this.bestScoreElement&&(this.bestScoreElement.textContent=this.bestScore)}updateBestScore(){this.score>this.bestScore&&(swal({title:"Congratulations!",text:"New best score!",icon:"success",button:"Cool :)"}),this.bestScore=this.score,localStorage.setItem("bestScore",this.bestScore),this.bestScoreElement&&(this.bestScoreElement.textContent=this.bestScore))}}const a=document.querySelector("button");let n;a.addEventListener("click",r=>{const e=document.querySelector(".message-start");n&&n.stop(),e.classList.add("hidden"),n=new u,a.classList.remove("start"),a.classList.add("restart"),a.textContent="Restart"});const f=document.querySelectorAll('input[name="theme"]'),h=localStorage.getItem("theme")||"moss";document.documentElement.setAttribute("data-theme",h);f.forEach(r=>{r.value===h&&(r.checked=!0),r.addEventListener("change",e=>{const t=e.target.value;document.documentElement.setAttribute("data-theme",t),localStorage.setItem("theme",t)})});const c=localStorage.getItem("bestScore");c&&(document.querySelector(".game-best-score").textContent=c);
