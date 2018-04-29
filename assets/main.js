var Delaunay;!function(){"use strict";function a(a){var b,c,d,e,f,g,h=Number.POSITIVE_INFINITY,i=Number.POSITIVE_INFINITY,j=Number.NEGATIVE_INFINITY,k=Number.NEGATIVE_INFINITY;for(b=a.length;b--;)a[b][0]<h&&(h=a[b][0]),a[b][0]>j&&(j=a[b][0]),a[b][1]<i&&(i=a[b][1]),a[b][1]>k&&(k=a[b][1]);return c=j-h,d=k-i,e=Math.max(c,d),f=h+.5*c,g=i+.5*d,[[f-20*e,g-e],[f,g+20*e],[f+20*e,g-e]]}function b(a,b,c,e){var f,g,h,i,j,k,l,m,n,o,p=a[b][0],q=a[b][1],r=a[c][0],s=a[c][1],t=a[e][0],u=a[e][1],v=Math.abs(q-s),w=Math.abs(s-u);if(d>v&&d>w)throw new Error("Eek! Coincident points!");return d>v?(i=-((t-r)/(u-s)),k=(r+t)/2,m=(s+u)/2,f=(r+p)/2,g=i*(f-k)+m):d>w?(h=-((r-p)/(s-q)),j=(p+r)/2,l=(q+s)/2,f=(t+r)/2,g=h*(f-j)+l):(h=-((r-p)/(s-q)),i=-((t-r)/(u-s)),j=(p+r)/2,k=(r+t)/2,l=(q+s)/2,m=(s+u)/2,f=(h*j-i*k+m-l)/(h-i),g=v>w?h*(f-j)+l:i*(f-k)+m),n=r-f,o=s-g,{i:b,j:c,k:e,x:f,y:g,r:n*n+o*o}}function c(a){var b,c,d,e,f,g;for(c=a.length;c;)for(e=a[--c],d=a[--c],b=c;b;)if(g=a[--b],f=a[--b],d===f&&e===g||d===g&&e===f){a.splice(c,2),a.splice(b,2);break}}var d=1/1048576;Delaunay={triangulate:function(e,f){var g,h,i,j,k,l,m,n,o,p,q,r,s=e.length;if(3>s)return[];if(e=e.slice(0),f)for(g=s;g--;)e[g]=e[g][f];for(i=new Array(s),g=s;g--;)i[g]=g;for(i.sort(function(a,b){return e[b][0]-e[a][0]}),j=a(e),e.push(j[0],j[1],j[2]),k=[b(e,s+0,s+1,s+2)],l=[],m=[],g=i.length;g--;m.length=0){for(r=i[g],h=k.length;h--;)n=e[r][0]-k[h].x,n>0&&n*n>k[h].r?(l.push(k[h]),k.splice(h,1)):(o=e[r][1]-k[h].y,n*n+o*o-k[h].r>d||(m.push(k[h].i,k[h].j,k[h].j,k[h].k,k[h].k,k[h].i),k.splice(h,1)));for(c(m),h=m.length;h;)q=m[--h],p=m[--h],k.push(b(e,p,q,r))}for(g=k.length;g--;)l.push(k[g]);for(k.length=0,g=l.length;g--;)l[g].i<s&&l[g].j<s&&l[g].k<s&&k.push(l[g].i,l[g].j,l[g].k);return k},contains:function(a,b){if(b[0]<a[0][0]&&b[0]<a[1][0]&&b[0]<a[2][0]||b[0]>a[0][0]&&b[0]>a[1][0]&&b[0]>a[2][0]||b[1]<a[0][1]&&b[1]<a[1][1]&&b[1]<a[2][1]||b[1]>a[0][1]&&b[1]>a[1][1]&&b[1]>a[2][1])return null;var c=a[1][0]-a[0][0],d=a[2][0]-a[0][0],e=a[1][1]-a[0][1],f=a[2][1]-a[0][1],g=c*f-d*e;if(0===g)return null;var h=(f*(b[0]-a[0][0])-d*(b[1]-a[0][1]))/g,i=(c*(b[1]-a[0][1])-e*(b[0]-a[0][0]))/g;return 0>h||0>i||h+i>1?null:[h,i]}},"undefined"!=typeof module&&(module.exports=Delaunay)}();var Sketch={rezizeTimer:null,init:function(){var a=this;this.canvas=document.getElementById("c"),this.setViewport(),window.onresize=function(){clearTimeout(a.rezizeTimer),a.rezizeTimer=setTimeout(function(){a.setViewport.call(a),a.createVertices.call(a),a.render.call(a)},200)},this.createVertices(),this.render()},createVertices:function(){var a,b,c,d;for(this.vertices=new Array(~~(window.innerHeight/window.innerWidth*64)),a=this.vertices.length;a--;){do b=Math.random()-.5,c=Math.random()-.5,d={color:Math.random()-.5>0?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"};while(b*b+c*c>.25);b=(2.96875*b+.5)*this.canvas.width,c=(2.96875*c+.5)*this.canvas.height,this.vertices[a]=[b,c,d]}},render:function(){var a=this.canvas.getContext("2d");a.clearRect(0,0,this.canvas.width,this.canvas.height);var b=Delaunay.triangulate(this.vertices);for(i=b.length;i;){a.beginPath();var c=this.vertices[b[--i]][0],d=this.vertices[b[i]][1],e=this.vertices[b[--i]][0],f=this.vertices[b[i]][1],g=this.vertices[b[--i]][0],h=this.vertices[b[i]][1];a.moveTo(c,d),a.lineTo(e,f),a.lineTo(g,h);var j=a.createLinearGradient(c,d,e,h);j.addColorStop(0,this.vertices[b[i]][2].color),j.addColorStop(1,"transparent"),a.closePath(),a.fillStyle=j,a.fill()}},setViewport:function(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}};Sketch.init();