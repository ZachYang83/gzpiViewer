"use strict";(self.webpackChunkRemoteClient=self.webpackChunkRemoteClient||[]).push([[7091],{38581:(e,t,r)=>{r.d(t,{aX:()=>O});var n=r(68773),o=r(20102),s=r(92604),i=r(70586),a=r(17332),u=r(58901),c=r(73913),l=r(8744),f=r(40488),d=(r(66577),r(3172)),h=r(17452),p=r(33955);const y=s.Z.getLogger("esri.geometry.support.normalizeUtils");function m(e){return"polygon"===e[0].type}function g(e){return"polyline"===e[0].type}function S(e,t,r){if(t){const t=function(e,t){if(!(e instanceof u.Z||e instanceof a.Z)){const e="straightLineDensify: the input geometry is neither polyline nor polygon";throw y.error(e),new o.Z(e)}const r=(0,c.x3)(e),n=[];for(const e of r){const r=[];n.push(r),r.push([e[0][0],e[0][1]]);for(let n=0;n<e.length-1;n++){const o=e[n][0],s=e[n][1],i=e[n+1][0],a=e[n+1][1],u=Math.sqrt((i-o)*(i-o)+(a-s)*(a-s)),c=(a-s)/u,l=(i-o)/u,f=u/t;if(f>1){for(let e=1;e<=f-1;e++){const n=e*t,i=l*n+o,a=c*n+s;r.push([i,a])}const e=(u+Math.floor(f-1)*t)/2,n=l*e+o,i=c*e+s;r.push([n,i])}r.push([i,a])}}return function(e){return"polygon"===e.type}(e)?new a.Z({rings:n,spatialReference:e.spatialReference}):new u.Z({paths:n,spatialReference:e.spatialReference})}(e,1e6);e=(0,f.Sx)(t,!0)}return r&&(e=(0,c.Sy)(e,r)),e}function b(e,t,r){if(Array.isArray(e)){const n=e[0];if(n>t){const r=(0,c.XZ)(n,t);e[0]=n+r*(-2*t)}else if(n<r){const t=(0,c.XZ)(n,r);e[0]=n+t*(-2*r)}}else{const n=e.x;if(n>t){const r=(0,c.XZ)(n,t);e=e.clone().offset(r*(-2*t),0)}else if(n<r){const t=(0,c.XZ)(n,r);e=e.clone().offset(t*(-2*r),0)}}return e}function x(e,t){let r=-1;for(let n=0;n<t.cutIndexes.length;n++){const o=t.cutIndexes[n],s=t.geometries[n],i=(0,c.x3)(s);for(let e=0;e<i.length;e++){const t=i[e];t.some((r=>{if(r[0]<180)return!0;{let r=0;for(let e=0;e<t.length;e++){const n=t[e][0];r=n>r?n:r}r=Number(r.toFixed(9));const n=-360*(0,c.XZ)(r,180);for(let r=0;r<t.length;r++){const t=s.getPoint(e,r);s.setPoint(e,r,t.clone().offset(n,0))}return!0}}))}if(o===r){if(m(e))for(const t of(0,c.x3)(s))e[o]=e[o].addRing(t);else if(g(e))for(const t of(0,c.x3)(s))e[o]=e[o].addPath(t)}else r=o,e[o]=s}return e}async function O(e,t,r){var o;if(!Array.isArray(e))return O([e],t);const s=null!=(o=null==t?void 0:t.url)?o:n.Z.geometryServiceUrl;let y,m,g,F,C,Z,R,j,w=0;const P=[],q=[];for(const t of e)if((0,i.Wi)(t))q.push(t);else if(y||(y=t.spatialReference,m=(0,l.C5)(y),g=y.isWebMercator,Z=g?102100:4326,F=c.UZ[Z].maxX,C=c.UZ[Z].minX,R=c.UZ[Z].plus180Line,j=c.UZ[Z].minus180Line),m)if("mesh"===t.type)q.push(t);else if("point"===t.type)q.push(b(t.clone(),F,C));else if("multipoint"===t.type){const e=t.clone();e.points=e.points.map((e=>b(e,F,C))),q.push(e)}else if("extent"===t.type){const e=t.clone()._normalize(!1,!1,m);q.push(e.rings?new a.Z(e):e)}else if(t.extent){const e=t.extent,r=(0,c.XZ)(e.xmin,C)*(2*F);let n=0===r?t.clone():(0,c.Sy)(t.clone(),r);e.offset(r,0),e.intersects(R)&&e.xmax!==F?(w=e.xmax>w?e.xmax:w,n=S(n,g),P.push(n),q.push("cut")):e.intersects(j)&&e.xmin!==C?(w=e.xmax*(2*F)>w?e.xmax*(2*F):w,n=S(n,g,360),P.push(n),q.push("cut")):q.push(n)}else q.push(t.clone());else q.push(t);let v=(0,c.XZ)(w,F),D=-90;const I=v,N=new u.Z;for(;v>0;){const e=360*v-180;N.addPath([[e,D],[e,-1*D]]),D*=-1,v--}if(P.length>0&&I>0){const t=x(P,await async function(e,t,r,n){const o="string"==typeof e?(0,h.mN)(e):e,s=t[0].spatialReference,i={...n,query:{...o.query,f:"json",sr:JSON.stringify(s),target:JSON.stringify({geometryType:(0,p.Ji)(t[0]),geometries:t}),cutter:JSON.stringify(r)}},a=await(0,d.default)(o.path+"/cut",i),{cutIndexes:u,geometries:c=[]}=a.data;return{cutIndexes:u,geometries:c.map((e=>{const t=(0,p.im)(e);return t.spatialReference=s,t}))}}(s,P,N,r)),n=[],o=[];for(let r=0;r<q.length;r++){const s=q[r];if("cut"!==s)o.push(s);else{const s=t.shift(),a=e[r];(0,i.pC)(a)&&"polygon"===a.type&&a.rings&&a.rings.length>1&&s.rings.length>=a.rings.length?(n.push(s),o.push("simplify")):o.push(g?(0,f.$)(s):s)}}if(!n.length)return o;const a=await async function(e,t,r){const n="string"==typeof e?(0,h.mN)(e):e,o=t[0].spatialReference,s=(0,p.Ji)(t[0]),i={...r,query:{...n.query,f:"json",sr:o.wkid?o.wkid:JSON.stringify(o),geometries:JSON.stringify((a=t,{geometryType:(0,p.Ji)(a[0]),geometries:a.map((e=>e.toJSON()))}))}};var a;return function(e,t,r){const n=(0,p.q9)(t);return e.map((e=>{const t=n.fromJSON(e);return t.spatialReference=r,t}))}((await(0,d.default)(n.path+"/simplify",i)).data,s,o)}(s,n,r),u=[];for(let e=0;e<o.length;e++){const t=o[e];"simplify"!==t?u.push(t):u.push(g?(0,f.$)(a.shift()):a.shift())}return u}const G=[];for(let e=0;e<q.length;e++){const t=q[e];if("cut"!==t)G.push(t);else{const e=P.shift();G.push(!0===g?(0,f.$)(e):e)}}return Promise.resolve(G)}},73913:(e,t,r)=>{r.d(t,{UZ:()=>i,x3:()=>c,XZ:()=>a,Sy:()=>u});var n=r(58901),o=r(82971),s=r(33955);const i={102100:{maxX:20037508.342788905,minX:-20037508.342788905,plus180Line:new n.Z({paths:[[[20037508.342788905,-20037508.342788905],[20037508.342788905,20037508.342788905]]],spatialReference:o.Z.WebMercator}),minus180Line:new n.Z({paths:[[[-20037508.342788905,-20037508.342788905],[-20037508.342788905,20037508.342788905]]],spatialReference:o.Z.WebMercator})},4326:{maxX:180,minX:-180,plus180Line:new n.Z({paths:[[[180,-180],[180,180]]],spatialReference:o.Z.WGS84}),minus180Line:new n.Z({paths:[[[-180,-180],[-180,180]]],spatialReference:o.Z.WGS84})}};function a(e,t){return Math.ceil((e-t)/(2*t))}function u(e,t){const r=c(e);for(const e of r)for(const r of e)r[0]+=t;return e}function c(e){return(0,s.oU)(e)?e.rings:e.paths}},30540:(e,t,r)=>{r.d(t,{X:()=>l,O:()=>c});var n=r(40330),o=r(3172),s=r(17452),i=r(98326),a=r(99306);function u(e){const t=e.toJSON();return t.attachmentTypes&&(t.attachmentTypes=t.attachmentTypes.join(",")),t.keywords&&(t.keywords=t.keywords.join(",")),t.globalIds&&(t.globalIds=t.globalIds.join(",")),t.objectIds&&(t.objectIds=t.objectIds.join(",")),t.size&&(t.size=t.size.join(",")),t}function c(e,t){const r={};for(const o of e){const{parentObjectId:e,parentGlobalId:a,attachmentInfos:u}=o;for(const o of u){const{id:u}=o,c=(0,s.qg)((0,n.Dp)(`${t}/${e}/attachments/${u}`)),l=i.Z.fromJSON(o);l.set({url:c,parentObjectId:e,parentGlobalId:a}),r[e]?r[e].push(l):r[e]=[l]}}return r}function l(e,t,r){let n={query:(0,a.A)({...e.query,f:"json",...u(t)})};return r&&(n={...r,...n,query:{...r.query,...n.query}}),(0,o.default)(e.path+"/queryAttachments",n)}},27091:(e,t,r)=>{r.d(t,{Z:()=>U});var n=r(43697),o=r(20102),s=r(80442),i=r(70586),a=r(95330),u=r(5600),c=(r(67676),r(75215),r(52011)),l=r(10158),f=r(11282),d=r(30540),h=r(56545),p=r(41818),y=(r(66577),r(34599)),m=r(57444),g=r(6570),S=r(5396),b=r(4967),x=r(74085),O=r(69285),F=r(98732);function C(e,t){return t}function Z(e,t,r,n){switch(r){case 0:return P(e,t+n,0);case 1:return"lowerLeft"===e.originPosition?P(e,t+n,1):function({translate:e,scale:t},r,n){return e[n]-r*t[n]}(e,t+n,1)}}function R(e,t,r,n){return 2===r?P(e,t,2):Z(e,t,r,n)}function j(e,t,r,n){return 2===r?P(e,t,3):Z(e,t,r,n)}function w(e,t,r,n){return 3===r?P(e,t,3):R(e,t,r,n)}function P({translate:e,scale:t},r,n){return e[n]+r*t[n]}class q{constructor(e){this.options=e,this.geometryTypes=["esriGeometryPoint","esriGeometryMultipoint","esriGeometryPolyline","esriGeometryPolygon"],this.previousCoordinate=[0,0],this.transform=null,this.applyTransform=C,this.lengths=[],this.currentLengthIndex=0,this.toAddInCurrentPath=0,this.vertexDimension=0,this.coordinateBuffer=null,this.coordinateBufferPtr=0,this.AttributesConstructor=function(){}}createFeatureResult(){return{fields:[],features:[]}}finishFeatureResult(e){if(this.options.applyTransform&&(e.transform=null),this.AttributesConstructor=function(){},this.coordinateBuffer=null,this.lengths.length=0,!e.hasZ)return;const t=(0,O.k)(e.geometryType,this.options.sourceSpatialReference,e.spatialReference);if(!(0,i.Wi)(t))for(const r of e.features)t(r.geometry)}createSpatialReference(){return{}}addField(e,t){e.fields.push(t);const r=e.fields.map((e=>e.name));this.AttributesConstructor=function(){for(const e of r)this[e]=null}}addFeature(e,t){e.features.push(t)}prepareFeatures(e){switch(this.transform=e.transform,this.options.applyTransform&&e.transform&&(this.applyTransform=this.deriveApplyTransform(e)),this.vertexDimension=2,e.hasZ&&this.vertexDimension++,e.hasM&&this.vertexDimension++,e.geometryType){case"esriGeometryPoint":this.addCoordinate=(e,t,r)=>this.addCoordinatePoint(e,t,r),this.createGeometry=e=>this.createPointGeometry(e);break;case"esriGeometryPolygon":this.addCoordinate=(e,t,r)=>this.addCoordinatePolygon(e,t,r),this.createGeometry=e=>this.createPolygonGeometry(e);break;case"esriGeometryPolyline":this.addCoordinate=(e,t,r)=>this.addCoordinatePolyline(e,t,r),this.createGeometry=e=>this.createPolylineGeometry(e);break;case"esriGeometryMultipoint":this.addCoordinate=(e,t,r)=>this.addCoordinateMultipoint(e,t,r),this.createGeometry=e=>this.createMultipointGeometry(e);break;default:(0,x.Bg)(e.geometryType)}}createFeature(){return this.lengths.length=0,this.currentLengthIndex=0,this.previousCoordinate[0]=0,this.previousCoordinate[1]=0,this.coordinateBuffer=null,this.coordinateBufferPtr=0,{attributes:new this.AttributesConstructor}}allocateCoordinates(){}addLength(e,t,r){0===this.lengths.length&&(this.toAddInCurrentPath=t),this.lengths.push(t)}addQueryGeometry(e,t){const{queryGeometry:r,queryGeometryType:n}=t,o=(0,F.$g)(r.clone(),r,!1,!1,this.transform),s=(0,F.di)(o,n,!1,!1);e.queryGeometryType=n,e.queryGeometry={...s}}createPointGeometry(e){const t={x:0,y:0,spatialReference:e.spatialReference};return e.hasZ&&(t.z=0),e.hasM&&(t.m=0),t}addCoordinatePoint(e,t,r){switch(t=this.applyTransform(this.transform,t,r,0),r){case 0:e.x=t;break;case 1:e.y=t;break;case 2:"z"in e?e.z=t:e.m=t;break;case 3:e.m=t}}transformPathLikeValue(e,t){let r=0;return t<=1&&(r=this.previousCoordinate[t],this.previousCoordinate[t]+=e),this.applyTransform(this.transform,e,t,r)}addCoordinatePolyline(e,t,r){this.dehydratedAddPointsCoordinate(e.paths,t,r)}addCoordinatePolygon(e,t,r){this.dehydratedAddPointsCoordinate(e.rings,t,r)}addCoordinateMultipoint(e,t,r){0===r&&e.points.push([]);const n=this.transformPathLikeValue(t,r);e.points[e.points.length-1].push(n)}createPolygonGeometry(e){return{rings:[[]],spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM}}createPolylineGeometry(e){return{paths:[[]],spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM}}createMultipointGeometry(e){return{points:[],spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM}}dehydratedAddPointsCoordinate(e,t,r){0===r&&0==this.toAddInCurrentPath--&&(e.push([]),this.toAddInCurrentPath=this.lengths[++this.currentLengthIndex]-1,this.previousCoordinate[0]=0,this.previousCoordinate[1]=0);const n=this.transformPathLikeValue(t,r),o=e[e.length-1];0===r&&(this.coordinateBufferPtr=0,this.coordinateBuffer=new Array(this.vertexDimension),o.push(this.coordinateBuffer)),this.coordinateBuffer[this.coordinateBufferPtr++]=n}deriveApplyTransform(e){const{hasZ:t,hasM:r}=e;return t&&r?w:t?R:r?j:Z}}var v=r(74889);async function D(e,t,r){const n=(0,f.en)(e),o={...r},s=m.Z.from(t),i=!s.quantizationParameters,{data:a}=await(0,y.executeQueryPBF)(n,s,new q({sourceSpatialReference:s.sourceSpatialReference,applyTransform:i}),o);return a}var I=r(3172),N=r(99306);function G(e,t){const r=e.toJSON();return r.objectIds&&(r.objectIds=r.objectIds.join(",")),r.orderByFields&&(r.orderByFields=r.orderByFields.join(",")),!r.outFields||null!=t&&t.returnCountOnly?delete r.outFields:-1!==r.outFields.indexOf("*")?r.outFields="*":r.outFields=r.outFields.join(","),r.outSpatialReference&&(r.outSR=r.outSR.wkid||JSON.stringify(r.outSR.toJSON()),delete r.outSpatialReference),r.dynamicDataSource&&(r.layer=JSON.stringify({source:r.dynamicDataSource}),delete r.dynamicDataSource),r}async function J(e,t,r={},n){const o=(0,N.A)({...e.query,f:"json",...n,...G(t,n)});return(0,I.default)(e.path+"/queryRelatedRecords",{...r,query:{...r.query,...o}})}var T=r(75935);var _=r(17452),k=r(33955),A=r(38581),B=r(28694);const M="Layer does not support extent calculation.";function X(e,t){var r,n;const o=e.geometry,s=e.toJSON(),a=s;if((0,i.pC)(o)&&(a.geometry=JSON.stringify(o),a.geometryType=(0,k.Ji)(o),a.inSR=o.spatialReference.wkid||JSON.stringify(o.spatialReference)),null!=(r=s.topFilter)&&r.groupByFields&&(a.topFilter.groupByFields=s.topFilter.groupByFields.join(",")),null!=(n=s.topFilter)&&n.orderByFields&&(a.topFilter.orderByFields=s.topFilter.orderByFields.join(",")),s.topFilter&&(a.topFilter=JSON.stringify(a.topFilter)),s.objectIds&&(a.objectIds=s.objectIds.join(",")),s.orderByFields&&(a.orderByFields=s.orderByFields.join(",")),s.outFields&&!(null!=t&&t.returnCountOnly||null!=t&&t.returnExtentOnly||null!=t&&t.returnIdsOnly)?-1!==s.outFields.indexOf("*")?a.outFields="*":a.outFields=s.outFields.join(","):delete a.outFields,s.outSR?a.outSR=s.outSR.wkid||JSON.stringify(s.outSR):o&&s.returnGeometry&&(a.outSR=a.inSR),s.returnGeometry&&delete s.returnGeometry,s.timeExtent){const e=s.timeExtent,{start:t,end:r}=e;null==t&&null==r||(a.time=t===r?t:`${null==t?"null":t},${null==r?"null":r}`),delete s.timeExtent}return a}function E(e,t,r,n={},o={}){const s="string"==typeof e?(0,_.mN)(e):e,a=t.geometry?[t.geometry]:[];return n.responseType="pbf"===r?"array-buffer":"json",(0,A.aX)(a,null,n).then((e=>{const a=e&&e[0];(0,i.pC)(a)&&((t=t.clone()).geometry=a);const u=(0,N.A)({...s.query,f:r,...o,...X(t,o)});return(0,I.default)((0,_.v_)(s.path,"queryTopFeatures"),{...n,query:{...u,...n.query}})}))}var z=r(28141);var L=r(59633);let V=class extends L.Z{constructor(e){super(e),this.dynamicDataSource=null,this.fieldsIndex=null,this.format="json",this.gdbVersion=null,this.infoFor3D=null,this.sourceSpatialReference=null}execute(e,t){return this.executeJSON(e,t).then((r=>this.featureSetFromJSON(e,r,t)))}async executeJSON(e,t){var r;const n={...this.requestOptions,...t},o=this._normalizeQuery(e),i=null!=(null==(r=e.outStatistics)?void 0:r[0]),a=(0,s.Z)("featurelayer-pbf-statistics"),u=!i||a;let c;if("pbf"===this.format&&u)try{c=await D(this.url,o,n)}catch(e){if("query:parsing-pbf"!==e.name)throw e;this.format="json"}return"json"!==this.format&&u||(c=await(0,b.F)(this.url,o,n)),this._normalizeFields(c.fields),c}async featureSetFromJSON(e,t,n){if(!(this._queryIs3DObjectFormat(e)&&(0,i.pC)(this.infoFor3D)&&t.features&&t.features.length))return v.default.fromJSON(t);const{meshFeatureSetFromJSON:o}=await(0,a.Hl)(Promise.all([r.e(411),r.e(6481),r.e(6459),r.e(1387)]).then(r.bind(r,31387)),n);return o(e,this.infoFor3D,t)}executeForCount(e,t){const r={...this.requestOptions,...t},n=this._normalizeQuery(e);return(0,p.P)(this.url,n,r)}executeForExtent(e,t){const r={...this.requestOptions,...t},n=this._normalizeQuery(e);return async function(e,t,r){const n=(0,f.en)(e);return(0,y.executeQueryForExtent)(n,m.Z.from(t),{...r}).then((e=>({count:e.data.count,extent:g.Z.fromJSON(e.data.extent)})))}(this.url,n,r)}executeForIds(e,t){const r={...this.requestOptions,...t},n=this._normalizeQuery(e);return(0,S.G)(this.url,n,r)}executeRelationshipQuery(e,t){e=T.Z.from(e);const r={...this.requestOptions,...t};return(this.gdbVersion||this.dynamicDataSource)&&((e=e.clone()).gdbVersion=e.gdbVersion||this.gdbVersion,e.dynamicDataSource=e.dynamicDataSource||this.dynamicDataSource),async function(e,t,r){return t=T.Z.from(t),async function(e,t,r){const n=await J(e,t,r),o=n.data,s=o.geometryType,i=o.spatialReference,a={};for(const e of o.relatedRecordGroups){const t={fields:void 0,objectIdFieldName:void 0,geometryType:s,spatialReference:i,hasZ:!!o.hasZ,hasM:!!o.hasM,features:e.relatedRecords};if(null!=e.objectId)a[e.objectId]=t;else for(const r in e)e.hasOwnProperty(r)&&"relatedRecords"!==r&&(a[e[r]]=t)}return{...n,data:a}}((0,f.en)(e),t,r).then((e=>{const t=e.data,r={};return Object.keys(t).forEach((e=>r[e]=v.default.fromJSON(t[e]))),r}))}(this.url,e,r)}executeRelationshipQueryForCount(e,t){e=T.Z.from(e);const r={...this.requestOptions,...t};return(this.gdbVersion||this.dynamicDataSource)&&((e=e.clone()).gdbVersion=e.gdbVersion||this.gdbVersion,e.dynamicDataSource=e.dynamicDataSource||this.dynamicDataSource),async function(e,t,r){return t=T.Z.from(t),async function(e,t,r){const n=await J(e,t,r,{returnCountOnly:!0}),o=n.data,s={};for(const e of o.relatedRecordGroups)null!=e.objectId&&(s[e.objectId]=e.count);return{...n,data:s}}((0,f.en)(e),t,{...r}).then((e=>e.data))}(this.url,e,r)}executeAttachmentQuery(e,t){const r={...this.requestOptions,...t};return async function(e,t,r){const n=(0,f.en)(e);return(0,d.X)(n,h.Z.from(t),{...r}).then((e=>(0,d.O)(e.data.attachmentGroups,n.path)))}(this.url,e,r)}executeTopFeaturesQuery(e,t){const r={...this.requestOptions,...t};return async function(e,t,r,n){const o=(0,f.en)(e),s={...n},{data:i}=await async function(e,t,r,n){const o=await E(e,t,"json",n);return(0,B.p)(t,r,o.data),o}(o,z.Z.from(t),r,s);return v.default.fromJSON(i)}(this.parsedUrl,e,this.sourceSpatialReference,r)}executeForTopIds(e,t){const r={...this.requestOptions,...t};return async function(e,t,r){const n=(0,f.en)(e);return(await async function(e,t,r){return(0,i.pC)(t.timeExtent)&&t.timeExtent.isEmpty?Promise.resolve({data:{objectIds:[]}}):E(e,t,"json",r,{returnIdsOnly:!0})}(n,z.Z.from(t),{...r})).data.objectIds}(this.parsedUrl,e,r)}executeForTopExtents(e,t){const r={...this.requestOptions,...t};return async function(e,t,r){const n=(0,f.en)(e),o=await async function(e,t,r){return(0,i.pC)(t.timeExtent)&&t.timeExtent.isEmpty?Promise.resolve({data:{count:0,extent:null}}):E(e,t,"json",r,{returnExtentOnly:!0,returnCountOnly:!0}).then((e=>{const t=e.data;if(t.hasOwnProperty("extent"))return e;if(t.features)throw new Error(M);if(t.hasOwnProperty("count"))throw new Error(M);return e}))}(n,z.Z.from(t),{...r});return{count:o.data.count,extent:g.Z.fromJSON(o.data.extent)}}(this.parsedUrl,e,r)}executeForTopCount(e,t){const r={...this.requestOptions,...t};return async function(e,t,r){const n=(0,f.en)(e);return(await function(e,t,r){return(0,i.pC)(t.timeExtent)&&t.timeExtent.isEmpty?Promise.resolve({data:{count:0}}):E(e,t,"json",r,{returnIdsOnly:!0,returnCountOnly:!0})}(n,z.Z.from(t),{...r})).data.count}(this.parsedUrl,e,r)}_normalizeQuery(e){let t=m.Z.from(e);if(t.sourceSpatialReference=t.sourceSpatialReference||this.sourceSpatialReference,(this.gdbVersion||this.dynamicDataSource)&&(t=t===e?t.clone():t,t.gdbVersion=e.gdbVersion||this.gdbVersion,t.dynamicDataSource=e.dynamicDataSource?l.n.from(e.dynamicDataSource):this.dynamicDataSource),(0,i.pC)(this.infoFor3D)&&this._queryIs3DObjectFormat(e)){t=t===e?t.clone():t,t.formatOf3DObjects=null;for(const e of this.infoFor3D.queryFormats){if("3D_glb"===e.id){t.formatOf3DObjects=e.id;break}"3D_gltf"!==e.id||t.formatOf3DObjects||(t.formatOf3DObjects=e.id)}if(!t.formatOf3DObjects)throw new o.Z("query:unsupported-3d-query-formats","Could not find any supported 3D object query format. Only supported formats are 3D_glb and 3D_gltf");if((0,i.Wi)(t.outFields)||!t.outFields.includes("*")){t=t===e?t.clone():t,(0,i.Wi)(t.outFields)&&(t.outFields=[]);const{originX:r,originY:n,originZ:o,translationX:s,translationY:a,translationZ:u,scaleX:c,scaleY:l,scaleZ:f,rotationX:d,rotationY:h,rotationZ:p,rotationDeg:y}=this.infoFor3D.transformFieldRoles;t.outFields.push(r,n,o,s,a,u,c,l,f,d,h,p,y)}}return t}_normalizeFields(e){if((0,i.pC)(this.fieldsIndex)&&(0,i.pC)(e))for(const t of e){const e=this.fieldsIndex.get(t.name);e&&Object.assign(t,e.toJSON())}}_queryIs3DObjectFormat(e){return(0,i.pC)(this.infoFor3D)&&e.returnGeometry&&"xyFootprint"!==e.multipatchOption&&!e.outStatistics}};(0,n._)([(0,u.Cb)({type:l.n})],V.prototype,"dynamicDataSource",void 0),(0,n._)([(0,u.Cb)()],V.prototype,"fieldsIndex",void 0),(0,n._)([(0,u.Cb)()],V.prototype,"format",void 0),(0,n._)([(0,u.Cb)()],V.prototype,"gdbVersion",void 0),(0,n._)([(0,u.Cb)()],V.prototype,"infoFor3D",void 0),(0,n._)([(0,u.Cb)()],V.prototype,"sourceSpatialReference",void 0),V=(0,n._)([(0,c.j)("esri.tasks.QueryTask")],V);const U=V},59633:(e,t,r)=>{r.d(t,{Z:()=>c});var n=r(43697),o=r(15923),s=r(17452),i=r(5600),a=(r(67676),r(80442),r(75215),r(52011));let u=class extends o.Z{constructor(...e){super(...e),this.requestOptions=null,this.url=null}normalizeCtorArgs(e,t){return"string"!=typeof e?e:{url:e,...t}}get parsedUrl(){return this._parseUrl(this.url)}_parseUrl(e){return e?(0,s.mN)(e):null}_encode(e,t,r){const n={};for(const o in e){if("declaredClass"===o)continue;const s=e[o];if(null!=s&&"function"!=typeof s)if(Array.isArray(s)){n[o]=[];for(let e=0;e<s.length;e++)n[o][e]=this._encode(s[e])}else if("object"==typeof s)if(s.toJSON){const e=s.toJSON(r&&r[o]);n[o]=t?e:JSON.stringify(e)}else n[o]=t?s:JSON.stringify(s);else n[o]=s}return n}};(0,n._)([(0,i.Cb)({readOnly:!0})],u.prototype,"parsedUrl",null),(0,n._)([(0,i.Cb)()],u.prototype,"requestOptions",void 0),(0,n._)([(0,i.Cb)({type:String})],u.prototype,"url",void 0),u=(0,n._)([(0,a.j)("esri.tasks.Task")],u);const c=u}}]);