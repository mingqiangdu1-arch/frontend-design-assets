// Original documentation graphics; deterministic, no packages or network.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const read = p => JSON.parse(readFileSync(new URL(p,root),'utf8'));
function createVisuals(input) {
  const esc = s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  const R=(x,y,w,h,f,rx=0,s="none",sw=1)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" stroke="${s}" stroke-width="${sw}"/>`;
  const C=(x,y,r,f,s="none",sw=1)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="${s}" stroke-width="${sw}"/>`;
  const L=(x1,y1,x2,y2,s,sw=1)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${s}" stroke-width="${sw}" fill="none"/>`;
  const P=(d,f,s="none",sw=1)=>`<path d="${d}" fill="${f}" stroke="${s}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const E=(x,y,rx,ry,f,s="none",sw=1)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" stroke="${s}" stroke-width="${sw}"/>`;
  const T=(x,y,s,size,f,weight=400,font="system-ui,Arial,sans-serif",extra="")=>`<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${f}" ${extra}>${esc(s)}</text>`;
  const group=(x,y,body)=>`<g transform="translate(${x} ${y})">${body}</g>`;
  const svg=(w,h,title,desc,body)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>${body}</svg>\n`;
  const ink="#E6EBE7", muted="#AAB8B0", accent="#C6FA86";
  let cover=R(0,0,1200,380,"#141C1A",20)+R(20,20,1160,340,"none",14,"#35443E");
  cover+=T(52,64,"FRONTEND / DESIGN LIBRARY",15,accent,650,"ui-monospace,monospace",'letter-spacing="2"')+T(48,147,"Design assets",64,ink,750)+T(48,211,"with direction.",64,ink,750)+T(52,263,"Explore styles. Inspect source. Adapt with intent.",22,muted)+T(52,333,"SOURCE  /  STYLE  /  INTERACTION  /  AGENT WORKFLOWS",13,accent,500,"ui-monospace,monospace");
  cover+=L(675,44,675,336,"#35443E");
  const tiles=[
    [702,44,218,136,"#E8E4D8","Editorial",R(15,16,188,104,"#F7F3E7",2)+T(25,51,"Aa",37,"#222C26",700,"Georgia,serif")+R(25,67,125,4,"#6E8173")+R(25,78,148,4,"#A2AD9D")+R(25,89,92,4,"#A2AD9D")],
    [932,44,218,136,"#C6FA86","Geometry",P("M16 108L60 21L104 108Z","#1D2923")+C(153,63,42,"#1D2923")+R(126,36,54,54,"#C6FA86",4)],
    [702,192,218,140,"#253731","Systems",R(12,13,194,114,"#131F1B",6,"#527565")+R(25,26,36,88,"#314C40",4)+R(72,26,119,12,"#B9EAC0",3)+R(72,48,119,25,"#354C42",4)+R(72,81,53,33,"#527565",4)+R(132,81,59,33,"#6B9F79",4)],
    [932,192,218,140,"#B8B0E9","Pattern",Array.from({length:7},(_,i)=>E(109,70,28+i*11,18+i*6,"none","#37324F",1.6)).join("")+C(109,70,7,"#37324F")]
  ];
  for(const [x,y,w,h,bg,label,art] of tiles){cover+=group(x,y,R(0,0,w,h,bg,9)+art+T(14,h-9,label.toUpperCase(),10,bg==="#253731"?"#C6FA86":"#202A25",700,"ui-monospace,monospace"));}
  function specimen(id,c) {
    const bg=c.canvas, sf=c.surface, up=c.surfaceRaised??c.selected, line=c.border, fg=c.text, sub=c.textSecondary, a=c.accent, at=c.accentText??"#FFFFFF", sel=c.selected;
    let out=R(0,0,350,142,bg,9,line);
    const rr=(x,y,w,h,f=sf,rx=4,s="none",sw=1)=>R(x,y,w,h,f,rx,s,sw);
    const tx=(x,y,s,z=12,color=fg,weight=500,font)=>T(x,y,s,z,color,weight,font);
    const hline=(x,y,w,col=sub)=>rr(x,y,w,3,col,1.5);
    const btn=(x,y,w,s)=>rr(x,y,w,21,a,5)+tx(x+7,y+14,s,10,at,650);
    if(id==="refined-light-saas"||id==="precision-dark"){
      const dark=id==="precision-dark";out+=rr(1,1,70,140,c.sidebar,8)+tx(10,18,dark?"CONSOLE":"Workspace",10,fg,700)+[34,51,68,85].map((y,i)=>rr(9,y,51,11,i===1?sel:c.sidebar,3)+hline(14,y+4,29,sub)).join("")+tx(83,20,dark?"Signal monitor":"Projects",16,fg,650)+btn(267,7,70,dark?"Inspect":"New item")+rr(83,34,254,97,sf,5,line);
      for(let i=0;i<4;i++){let y=45+i*20;out+=hline(95,y+5,70-i*6)+hline(188,y+5,39,line)+C(262,y+6,3,i===2?a:c.success)+hline(272,y+5,38,sub)+L(92,y+16,328,y+16,line,.7);}
      if(dark)out+=P("M99 118 L120 105 L143 115 L163 91 L182 99","none",a,2);
    }else if(id==="editorial-warm"){
      out+=tx(20,19,"THE JOURNAL",10,sub,600)+L(20,26,329,26,line)+tx(20,65,"A quieter",31,fg,600,"Georgia,serif")+tx(20,97,"kind of web.",31,fg,600,"Georgia,serif")+rr(237,40,92,88,up,1)+E(283,77,27,30,a)+hline(20,112,173)+hline(20,122,149,line);
    }else if(id==="playful-pop"){
      out+=rr(92,7,166,128,sf,13,line)+tx(106,24,"LEVEL 03",11,sub,800)+rr(107,30,136,8,sel,4)+rr(107,30,98,8,c.lime,4)+tx(106,58,"Pick a path!",17,fg,800)+[0,1].map(i=>rr(107+i*73,67,64,32,i?c.blue:c.lime,9)+C(139+i*73,82,7,fg)).join("")+btn(107,108,136,"Continue")+C(47,40,18,c.blue)+C(304,97,26,c.lime);
    }else if(id==="neo-brutalist"){
      out+=rr(18,23,310,104,fg)+rr(13,17,310,104,up,0,fg,2)+tx(25,37,"INDEPENDENT / 01",10,fg,800)+tx(22,77,"BOLD.",43,fg,900)+rr(190,26,118,81,c.pink,0,fg,2)+P("M201 96L250 32L298 96Z",c.blue,fg,2)+rr(26,92,93,18,a,0,fg,2)+tx(32,104,"EXPLORE →",10,fg,800);
    }else if(id==="commerce-atelier"){
      out+=tx(15,19,"ATELIER",13,fg,750)+tx(268,19,"Shop / 02",10,sub)+[0,1,2].map(i=>{let x=15+i*109;return rr(x,29,100,75,[c.productIvory,c.productSage,c.productStone][i],3)+E(x+50,82,24,6,up)+rr(x+35,46,30,37,a,10)+tx(x,118,["Vase","Vessel","Object"][i],12,fg,600)+tx(x,131,["$48","$64","$72"][i],10,sub);}).join("");
    }else if(id==="pixel-arcade"){
      out+=tx(12,18,"WORLD 01",12,a,700,"monospace")+tx(248,18,"HP  ■■■",11,a,700,"monospace")+Array.from({length:21},(_,i)=>rr(i*17,117-(i%4)*4,17,25+(i%4)*4, i%3===0?c.success:c.selected)).join("")+Array.from({length:8},(_,i)=>rr(38+i*17,47+(i%3)*17,17,17,up)).join("")+rr(161,69,17,17,a)+rr(144,86,51,17,a)+rr(161,103,17,17,a)+tx(15,38,"CHOOSE YOUR ROUTE",10,fg,600,"monospace");
    }else if(id==="signal-noir"){
      out+=tx(12,20,"SIGNAL / 08",11,a,700,"monospace")+[18,32,46].map(v=>C(100,79,v,"none",line)).join("")+L(48,79,152,79,line)+L(100,27,100,131,line)+P("M100 79 L135 47 A46 46 0 0 1 144 91 Z",sel,a)+C(124,59,4,a)+rr(175,28,158,101,sf,4,line)+tx(187,47,"TELEMETRY",10,sub,700,"monospace")+P("M188 82L207 70L225 91L246 55L269 76L288 64L319 88","none",a,2)+hline(188,108,94,sub);
    }else if(id==="paper-rebellion"){
      out+=`<g transform="rotate(-5 116 75)">${rr(22,21,194,108,sf,1,line)+tx(33,48,"ISSUE 09",11,sub,700,"monospace")+tx(33,81,"MAKE",36,fg,900,"Georgia,serif")+tx(33,112,"A MARK.",29,a,900,"Georgia,serif")}</g>`+`<g transform="rotate(8 269 73)">${rr(213,21,111,104,up,1,line)+P("M225 107L244 38L313 106Z",a)+C(283,52,20,sel,fg)}</g>`;
    }else if(id==="aether-orbit"){
      out+=tx(12,19,"AETHER / SCENE",10,a,600)+[22,37,52].map((v,i)=>E(235,75,v*1.45,v,"none",i===1?a:line)).join("")+C(235,75,23,up,a)+C(274,46,5,a)+tx(19,65,"Beyond",29,fg,500,"Georgia,serif")+tx(19,95,"the horizon",24,fg,500,"Georgia,serif")+hline(20,112,113,sub);
    }else if(id==="liquid-layer"){
      out+=C(70,63,46,sel)+C(296,100,54,sel)+rr(62,10,226,123,up,15,line)+rr(76,22,197,71,sf,11,line)+tx(89,46,"Layered space",19,fg,650)+hline(89,57,120)+rr(89,68,64,14,sel,7)+rr(113,100,124,23,sf,11,line)+[129,155,181,207].map((x,i)=>C(x,111,5,i===1?a:line)).join("");
    }else if(id==="shape-expressive"){
      out+=rr(17,15,151,111,sel,26)+tx(30,42,"YOUR",23,fg,850)+tx(30,68,"NEXT",23,fg,850)+tx(30,94,"MOVE",23,a,850)+C(251,55,40,a)+P("M223 55 L244 77 L282 35","none",at,7)+rr(188,99,139,27,up,13,line)+tx(200,116,"Choose a task",12,fg,700);
    }else if(id==="type-led-minimal"){
      out+=tx(19,18,"INDEX / 13",10,sub,600,"monospace")+L(19,24,331,24,line)+tx(15,76,"Less.",53,fg,850)+tx(15,122,"But better.",41,fg,850)+rr(297,42,33,80,a)+T(314,112,"↗",20,at,700,"system-ui",'text-anchor="middle"');
    }else if(id==="organic-tactile"){
      out+=rr(16,13,160,116,sf,19,line)+P("M183 112Q177 42 236 27Q307 3 330 75Q339 123 289 129Z",up)+P("M211 109Q191 82 226 53Q266 20 299 65Q318 91 289 114Z",sel)+P("M237 111Q218 83 252 63Q275 49 285 82Q287 106 269 118Z",a)+tx(28,47,"Made for",19,fg,600,"Georgia,serif")+tx(28,70,"human hands.",19,fg,600,"Georgia,serif")+btn(28,89,111,"Find your feel");
    }else if(id==="swiss-blueprint"){
      out+=[42,84,126,168,210,252,294].map(x=>L(x,8,x,134,line,.35)).join("")+[34,68,102].map(y=>L(8,y,342,y,line,.35)).join("")+rr(14,12,208,118,sf,2,line,1.2)+rr(34,36,168,74,up,1,fg,1.4)+C(92,73,23,bg,fg,1.4)+C(92,73,11,"none",a,1.2)+[134,146,158,170,182].map(x=>L(x,46,x,100,sub,1.3)).join("")+L(34,24,202,24,a,1.2)+L(34,19,34,32,a,1)+L(202,19,202,32,a,1)+rr(230,12,106,118,c.sidebar,2,line,1.2)+tx(239,28,"DWG 15-A",10,a,750,"ui-monospace,monospace")+L(230,36,336,36,line,1)+tx(239,53,"SCALE 1:1",9,sub,600,"ui-monospace,monospace")+hline(239,65,78,fg)+hline(239,77,64,sub)+hline(239,89,72,line)+rr(239,103,86,18,a,2)+tx(248,115,"SPEC LEDGER",9,at,750,"ui-monospace,monospace");
    }else throw Error("Unknown style "+id+"; add an explicit specimen");
    return out;
  }
  const w=1200, rows=Math.ceil(input.length/3), h=100+rows*216+48;
  let atlas=R(0,0,w,h,"#121A18",20)+T(28,42,"VISUAL ATLAS / "+String(input.length).padStart(2,"0")+" INDEPENDENT DIRECTIONS",16,accent,700,"ui-monospace,monospace")+T(28,73,"Token-based illustrations · not rendered screenshots",22,ink,650);
  input.forEach((s,i)=>{let x=24+(i%3)*388,y=96+Math.floor(i/3)*216,c=s.colors;for(const k of ["canvas","surface","border","text","textSecondary","accent","selected"])if(!/^#[0-9a-f]{6}$/i.test(c[k]??""))throw Error("Missing color "+s.id+" "+k);
    const swatches=[c.canvas,c.surface,c.text,c.accent,c.selected];
    atlas+=group(x,y,R(0,0,376,202,"#1C2924",12,"#35443E")+group(13,12,specimen(s.id,c))+T(13,174,s.label.split(" / ")[0],16,ink,650)+T(13,190,s.id,10,muted,400,"ui-monospace,monospace")+swatches.map((col,j)=>R(254+j*22,169,18,18,col,3,"#53655A")).join(""));
  });
  atlas+=T(28,h-19,"Palettes derived from the registered semantic color tokens. Layouts are illustrative; inspect the linked demos for actual behavior.",14,muted);
  return {"cover.svg":svg(1200,380,"Frontend Design Assets","A design-library cover with four abstract editorial, geometric, interface and pattern motifs.",cover),"style-atlas.svg":svg(w,h,"Visual atlas of "+input.length+" independent styles",input.map(s=>s.id).join(", ")+". Original static illustrations using registered color tokens, not runtime screenshots.",atlas)};
}
const input = read('registry/styles.json').styles.map(s=>({id:s.id,label:s.label,colors:read(s.tokens.json).colors}));
const output = new URL('docs/media/',root);
mkdirSync(output,{recursive:true});
for(const [name,body] of Object.entries(createVisuals(input))) writeFileSync(new URL(name,output),body);
