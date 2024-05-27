(this["webpackJsonpwaves-music-player"]=this["webpackJsonpwaves-music-player"]||[]).push([[0],{11:function(e,t,s){},15:function(e,t,s){"use strict";s.r(t);var i=s(2),n=s.n(i),a=s(6),r=s.n(a),c=(s(11),s(0));const o=e=>{let{currentSong:t,songInfo:s}=e;const i={transform:"rotate(".concat(10*s.currentTime,"deg)")};return Object(c.jsxs)("div",{className:"song_container",children:[Object(c.jsx)("img",{src:t.cover,alt:t.name,style:i}),Object(c.jsx)("h2",{children:t.name}),Object(c.jsx)("h3",{children:t.artist})]})};var l=Object(i.memo)(o),u=s(4),d=s(3);const m=e=>{let{currentSong:t,isPlaying:s,setIsPlaying:n,audioRef:a,songInfo:r,setSongInfo:o,songs:l,setCurrentSong:m,setSongs:b}=e;const g=e=>{const t=l.map((t=>t.id===e.id?{...t,active:!0}:{...t,active:!1}));b(t)},h=e=>Math.floor(e/60)+":"+("0"+Math.floor(e%60)).slice(-2),j=async e=>{let i=l.findIndex((e=>e.id===t.id));"forward"===e&&(await m(l[(i+1)%l.length]),g(l[(i+1)%l.length])),"backward"===e&&(0===i?(await m(l[l.length-1]),g(l[l.length-1])):(await m(l[i-1]),g(l[i-1]))),s&&a.current.play()},p={transform:"translateX(".concat(r.animationPercentage,"%)")},[y,O]=Object(i.useState)(50),[S,f]=Object(i.useState)(!1),[v,x]=Object(i.useState)(y);return Object(c.jsxs)("div",{className:"player",children:[Object(c.jsxs)("div",{className:"time_control",children:[Object(c.jsx)("p",{children:h(r.currentTime)}),Object(c.jsxs)("div",{style:{background:"linear-gradient(to right, ".concat(t.color[0],", ").concat(t.color[1],")")},className:"track",children:[Object(c.jsx)("input",{min:0,max:r.duration||0,value:r.currentTime,onChange:e=>{a.current.currentTime=e.target.value,o({...r,currentTime:e.target.value})},type:"range"}),Object(c.jsx)("div",{style:p,className:"animate_track"})]}),Object(c.jsx)("p",{children:r.duration?h(r.duration):"0:00"})]}),Object(c.jsxs)("div",{className:"play_volume_wrapper",children:[Object(c.jsxs)("div",{className:"play_control",children:[Object(c.jsx)(u.a,{onClick:()=>j("backward"),className:"btn_control skip_backward",size:"2x",icon:d.a}),Object(c.jsx)(u.a,{onClick:()=>{s?(a.current.pause(),n(!s)):(a.current.play(),n(!s))},className:"btn_control play",size:"2x",icon:s?d.e:d.f}),Object(c.jsx)(u.a,{onClick:()=>j("forward"),className:"btn_control skip_forward",size:"2x",icon:d.b})]}),Object(c.jsxs)("div",{className:"volume_control",children:[Object(c.jsxs)("div",{className:"track_volume",style:{background:"linear-gradient(to right, ".concat(t.color[0],", ").concat(t.color[1],")")},children:[Object(c.jsx)("input",{type:"range",min:0,max:100,onChange:e=>{const t=e.target.value/100;a.current.volume=t,O(e.target.value)},value:y}),Object(c.jsx)("div",{className:"animate_volume",style:{transform:"translateX(".concat(y,"%)")}})]}),Object(c.jsx)(u.a,{onClick:()=>{S?(a.current.volume=v/100,O(v),f(!1)):(a.current.volume=0,f(!0),O(0),x(y))},className:"volume_icon",icon:S?d.h:d.i})]})]})]})};var b=Object(i.memo)(m);function g(e){let{song:t,songs:s,setSongs:n,currentSong:a,setCurrentSong:r,listQueue:o,setListQueue:l,id:m,audioRef:b,isPlaying:g,typeOfButton:h}=e;Object(i.useEffect)((()=>{void 0!==o&&o.map((e=>{const t=s.find((t=>t.name===e.name));t&&(e.active=t.active)}))}),[s]);return Object(c.jsxs)("div",{onClick:async()=>{await r(t);const e=s.map((e=>e.id===m?{...e,active:!0}:{...e,active:!1}));n(e),g&&b.current.play()},className:"library_song ".concat(t.active?"selected_song":""),children:[Object(c.jsx)("img",{src:t.cover,alt:t.name}),Object(c.jsxs)("div",{className:"song_description",children:[Object(c.jsx)("h4",{children:t.name}),Object(c.jsx)("h6",{children:t.artist})]}),h&&Object(c.jsx)("button",{onClick:"faPlus"===h?e=>{o.some((e=>e.id===t.id))||l([...o,{...t,active:!1}]),e.stopPropagation()}:e=>{if(void 0!==o){const e=o.filter((e=>e.id!==t.id));l(e)}e.stopPropagation()},children:Object(c.jsx)(u.a,{id:"icon",icon:"faPlus"===h?d.g:d.c})})]})}function h(e){let{songs:t,setSongs:s,setCurrentSong:i,audioRef:n,isPlaying:a,libraryStatus:r,listQueue:o,setListQueue:l,typeOfButton:u}=e;return Object(c.jsxs)("div",{className:"library ".concat(r?"active_library":""),children:[Object(c.jsx)("h2",{children:"Library"}),Object(c.jsx)("div",{className:"library_songs",children:t.map((e=>Object(c.jsx)(g,{setCurrentSong:i,song:e,setSongs:s,songs:t,id:e.id,isPlaying:a,audioRef:n,listQueue:o,setListQueue:l,typeOfButton:u},e.id)))})]})}function j(e){let{songs:t,setSongs:s,currentSong:i,setCurrentSong:n,audioRef:a,isPlaying:r,listQueue:o,setListQueue:l,listRecommend:u,setListRecommend:d}=e;return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("h2",{children:"Queue"}),Object(c.jsx)("div",{className:"list_songs",style:0==o.length?{display:"flex",justifyContent:"center",alignItems:"center"}:null,children:0!==o.length?o.map((e=>Object(c.jsx)(g,{listQueue:o,setListQueue:l,currentSong:i,setCurrentSong:n,song:e,setSongs:s,songs:t,id:e.id,isPlaying:r,audioRef:a,typeOfButton:"faMinus"},e.id))):Object(c.jsx)("p",{style:{color:"gray"},children:"You haven't add any songs yet to queue"})})]})}const p=e=>{let{songs:t,setSongs:s,currentSong:n,setCurrentSong:a,audioRef:r,isPlaying:o,listQueue:l,setListQueue:u,typeOfButton:d}=e,m=t;console.log("M\u1ea3ng copy (arrtemp) t\u1eeb m\u1ea3ng data g\u1ed1c (songs): ",m);const[b,h]=Object(i.useState)([]);function j(e){return new Set(["genre","artist","album"].map((t=>e[t])))}console.log("Danh s\xe1ch b\xe0i h\xe1t g\u1ed1c (songs): ",t),console.log("Danh s\xe1ch c\xe1c b\xe0i hi\u1ec7n c\xf3 trong h\xe0ng ch\u1edd (listQueue): ",l),console.log("Danh s\xe1ch c\xe1c b\xe0i \u0111\u01b0\u1ee3c g\u1ee3i \xfd (recommendedSongs): ",b);class p{constructor(e,t){this.queue=e,this.allSongs=t,this.queueAttributeSets=e.map(j),this.allSongsAttributeSets=t.map(j),this.jaccardSimMatrix=this.allSongsAttributeSets.map(((e,t)=>this.queueAttributeSets.map(((s,i)=>{const n=function(e,t){const s=new Set([...e].filter((e=>t.has(e)))),i=new Set([...e,...t]);return s.size/i.size}(s,e);return console.log("Jaccard similarity between ".concat(this.allSongs[t].name," and ").concat(this.queue[i].name,": ").concat(n)),n}))))}getTopRecommendations(){return this.jaccardSimMatrix.map(((e,t)=>({song:this.allSongs[t],totalScore:e.reduce(((e,t)=>e+t),0),matchesArtist:this.queue.some((e=>e.artist===this.allSongs[t].artist))}))).filter((e=>{let{song:t}=e;return!this.queue.some((e=>e.id===t.id))})).sort(((e,t)=>t.totalScore-e.totalScore||(t.matchesArtist?1:-1))).slice(0,3).map((e=>{let{song:t}=e;return t}))}}return Object(i.useEffect)((()=>{if(0===l.length&&h([]),l.length>0){const e=new p(l,m).getTopRecommendations();console.log("Top Recommended Songs: ",e),h(e)}}),[l,m]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("h2",{children:"Recommend"}),Object(c.jsx)("div",{className:"list_songs",style:0===b.length?{display:"flex",justifyContent:"center",alignItems:"center"}:null,children:0!==b.length?b.map((e=>Object(c.jsx)(g,{setCurrentSong:a,song:e,setSongs:s,songs:t,id:e.id,isPlaying:o,audioRef:r,typeOfButton:d,listQueue:l,setListQueue:u},e.id))):Object(c.jsx)("p",{style:{color:"gray"},children:"There are no suitable songs to recommend"})})]})};var y=Object(i.memo)(p);function O(e){let{songs:t,setSongs:s,currentSong:i,setCurrentSong:n,audioRef:a,isPlaying:r,listStatus:o,listQueue:l,setListQueue:u,listRecommend:d,setListRecommend:m,typeOfButton:b}=e;return Object(c.jsxs)("div",{className:"list ".concat(o?"active_list":""),children:[Object(c.jsx)(j,{songs:t,setSongs:s,currentSong:i,setCurrentSong:n,audioRef:a,isPlaying:r,listQueue:l,setListQueue:u,listRecommend:d,setListRecommend:m}),Object(c.jsx)(y,{songs:t,setSongs:s,currentSong:i,setCurrentSong:n,audioRef:a,isPlaying:r,listQueue:l,setListQueue:u,listRecommend:d,setListRecommend:m,typeOfButton:b})]})}const S=e=>{let{libraryStatus:t,setLibraryStatus:s,listStatus:i,setListStatus:n,darkThemeHandler:a}=e;return Object(c.jsxs)("nav",{children:[Object(c.jsx)("h1",{children:"Waves"}),Object(c.jsxs)("button",{onClick:()=>{s(!t),n(!1)},className:t?"active_library_btn":"",children:["Library ",Object(c.jsx)(u.a,{icon:d.d})]}),Object(c.jsxs)("button",{onClick:()=>{n(!i),s(!1)},className:i?"active_list_btn":"",children:["List ",Object(c.jsx)(u.a,{icon:d.d})]}),Object(c.jsxs)("div",{className:"switch",id:"switch",children:[Object(c.jsx)("input",{type:"checkbox",name:"switch",className:"switch-checkbox",id:"myswitch",onChange:a}),Object(c.jsxs)("label",{className:"switch-label",htmlFor:"myswitch",children:[Object(c.jsx)("span",{className:"switch-inner"}),Object(c.jsx)("span",{className:"switch-switch"})]})]})]})};var f=Object(i.memo)(S),v=s(17);var x=function(){return[{name:"Kill Bill",cover:"https://i1.sndcdn.com/artworks-L1qZHQcUl4fpjOya-gpaSLQ-t500x500.jpg",artist:"SZA",audio:"https://github.com/q113pt/MusicLibrary/blob/main/SZA%20-%20Kill%20Bill.mp3?raw=true",color:["#0076d1","#180070"],id:Object(v.a)(),active:!0,lyric:.4,mood:.6,energy:.5,genre:"R&B",album:"SOS",explicit:!1},{name:"BLUE",cover:"https://github.com/q113pt/MusicLibrary/blob/main/Cover/Hit%20me%20hard%20and%20soft%20(Billie).png?raw=true",artist:"Billie Eilish",audio:"https://github.com/q113pt/MusicLibrary/blob/main/Billie%20Eilish%20-%20BLUE.mp3?raw=true",color:["#180070","#00081f"],id:Object(v.a)(),active:!1,lyric:"0.65",mood:"0.3",energy:"0.35",genre:"Pop",album:"Hit me hard and soft",explicit:!1},{name:"Blank Space",cover:"https://github.com/q113pt/MusicLibrary/blob/main/Cover/1989%20(%20Blank%20Space%20).png?raw=true",artist:"Taylor Swift",audio:"https://github.com/q113pt/MusicLibrary/blob/main/Taylor%20Swift%20-%20Blank%20Space.mp3?raw=true",color:["#ffaddd","#ff007b"],id:Object(v.a)(),active:!1,lyric:"0.73",mood:"0.8",energy:"0.85",genre:"Pop",album:"1989",explicit:!1},{name:"Blinding Lights",cover:"https://github.com/q113pt/MusicLibrary/blob/main/Cover/After%20Hours%20The%20Weeknd.jpg?raw=true",artist:"The Weekend",audio:"https://github.com/q113pt/MusicLibrary/blob/main/The%20Weeknd%20-%20Blinding%20Lights.mp3?raw=true",color:["#CD607D","#c94043"],id:Object(v.a)(),active:!1,lyric:"0.33",mood:"1.0",energy:"0.95",genre:"R&B",album:"Afterhour",explicit:!1},{name:"Ticking",cover:"https://github.com/q113pt/MusicLibrary/blob/main/Cover/Zach%20Bryan.png?raw=true",artist:"Zach Bryan",audio:"https://github.com/q113pt/MusicLibrary/blob/main/Zach%20Bryan%20-%20Ticking.mp3?raw=true",color:["#205950","#2ab3bf"],id:Object(v.a)(),active:!1,lyric:"0.77",mood:"0.1",energy:"0.45",genre:"Country",album:"Zach Bryan",explicit:!1},{name:"CHIHIRO",cover:"https://github.com/q113pt/MusicLibrary/blob/main/Cover/Hit%20me%20hard%20and%20soft%20(Billie).png?raw=true",artist:"Billie Eilish",audio:"https://github.com/q113pt/MusicLibrary/blob/main/Billie%20Eilish%20-%20CHIHIRO.mp3?raw=true",color:["#180070","#00081f"],id:Object(v.a)(),active:!1,lyric:"0.51",mood:"0.5",energy:"0.65",genre:"Pop",album:"Hit me hard and soft",explicit:!1},{name:"Love Story",cover:"https://github.com/q113pt/MusicLibrary/blob/main/Cover/Fearless%20(%20Love%20Story%20).png?raw=true",artist:"Taylor Swift",audio:"https://github.com/q113pt/MusicLibrary/blob/main/Taylor%20Swift%20-%20Love%20Story.mp3?raw=true",color:["#ffaddd","#ff007b"],id:Object(v.a)(),active:!1,lyric:"0.68",mood:"0.75",energy:"0.85",genre:"Country",album:"Fearless",explicit:!1},{name:"Save Your Tears",cover:"https://github.com/q113pt/MusicLibrary/blob/main/Cover/After%20Hours%20The%20Weeknd.jpg?raw=true",artist:"The Weekend",audio:"https://github.com/q113pt/MusicLibrary/blob/main/The%20Weeknd%20-%20Save%20Your%20Tears.mp3?raw=true",color:["#EF8EA9","#ab417f"],id:Object(v.a)(),active:!1,lyric:"0.44",mood:"0.55",energy:"0.75",genre:"R&B",album:"Afterhour",explicit:!1},{name:"SKINNY",cover:"https://github.com/q113pt/MusicLibrary/blob/main/Cover/Hit%20me%20hard%20and%20soft%20(Billie).png?raw=true",artist:"Billie Eilish",audio:"https://github.com/q113pt/MusicLibrary/blob/main/Billie%20Eilish%20-%20SKINNY.mp3?raw=true",color:["#180070","#00081f"],id:Object(v.a)(),active:!1,lyric:"0.64",mood:"0.25",energy:"0.53",genre:"Pop",album:"Hit me hard and soft",explicit:!1},{name:"Peter",cover:"https://github.com/q113pt/MusicLibrary/blob/main/Cover/the%20ttpd%20(%20Peter%20).png?raw=true",artist:"Taylor Swift",audio:"https://github.com/q113pt/MusicLibrary/blob/main/Taylor%20Swift%20-%20Peter.mp3?raw=true",color:["#ffaddd","#ff007b"],id:Object(v.a)(),active:!1,lyric:"0.84",mood:"0.28",energy:"0.73",genre:"Folk",album:"The Tortured Poets Department",explicit:!1}]};var w=function(){const[e,t]=Object(i.useState)(x()),[s,n]=Object(i.useState)(e[0]),[a,r]=Object(i.useState)(!1),[o,u]=Object(i.useState)(!1),[d,m]=Object(i.useState)(!1),[g,j]=Object(i.useState)([]),[p,y]=Object(i.useState)([]),[S,v]=Object(i.useState)({currentTime:0,duration:0,animationPercentage:0}),[w,L]=Object(i.useState)(!1),C=Object(i.useRef)(null),k=e=>{const t=e.target.currentTime,s=e.target.duration,i=Math.round(t),n=Math.round(s),a=Math.round(i/n*100);v({...S,currentTime:t,duration:s,animationPercentage:a})},B=s=>{const i=e.map((e=>e.id===s.id?{...e,active:!0}:{...e,active:!1}));t(i)};return Object(c.jsxs)("div",{className:"App \n                        ".concat(o?"library_active":""," \n                        ").concat(w?"dark":"","\n                        ").concat(d?"list_active":""),children:[Object(c.jsx)(f,{libraryStatus:o,setLibraryStatus:u,listStatus:d,setListStatus:m,darkTheme:w,setDarkTheme:L,darkThemeHandler:()=>{L(!1===w)}}),Object(c.jsx)(l,{currentSong:s,songInfo:S}),Object(c.jsx)(b,{isPlaying:a,setIsPlaying:r,currentSong:s,audioRef:C,songInfo:S,setSongInfo:v,songs:e,setCurrentSong:n,setSongs:t}),Object(c.jsx)(h,{libraryStatus:o,isPlaying:a,setCurrentSong:n,audioRef:C,songs:e,setSongs:t,listQueue:g,setListQueue:j,typeOfButton:"faPlus"}),Object(c.jsx)(O,{listStatus:d,isPlaying:a,currentSong:s,setCurrentSong:n,audioRef:C,songs:e,setSongs:t,listQueue:g,setListQueue:j,listRecommend:p,setListRecommend:y,typeOfButton:"faPlus"}),Object(c.jsx)("audio",{onTimeUpdate:k,onLoadedMetadata:k,ref:C,src:s.audio,onEnded:async()=>{if(0!==g.length){let e=g.findIndex((e=>e.id===s.id));await n(g[(e+1)%g.length]),B(g[(e+1)%g.length])}else{let t=e.findIndex((e=>e.id===s.id));await n(e[(t+1)%e.length]),B(e[(t+1)%e.length])}a&&C.current.play()}})]})};r.a.render(Object(c.jsx)(n.a.StrictMode,{children:Object(c.jsx)(w,{})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.539614f0.chunk.js.map