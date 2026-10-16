var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n)),l=class{constructor(e,t){
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
this.backend=e,this.dataMover=t,this.data=/* @__PURE__ */ new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,t){this.dataIdsCount++,this.data.set(e,t)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}},u=class{refCount(e){return d(`refCount`)}incRef(e){return d(`incRef`)}timerAvailable(){return!0}time(e){return d(`time`)}read(e){return d(`read`)}readSync(e){return d(`readSync`)}readToGPU(e,t){return d(`readToGPU`)}numDataIds(){return d(`numDataIds`)}disposeData(e,t){return d(`disposeData`)}write(e,t,n){return d(`write`)}move(e,t,n,r,i){return d(`move`)}createTensorFromGPUData(e,t,n){return d(`createTensorFromGPUData`)}memory(){return d(`memory`)}floatPrecision(){return d(`floatPrecision`)}epsilon(){return this.floatPrecision()===32?1e-7:1e-4}dispose(){return d(`dispose`)}};function d(e){throw Error(`'${e}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function f(e){let t=e.length,n=0;for(;t>0;)n=Math.random()*t|0,t--,m(e,t,n)}function p(e,t,n){return Math.max(e,Math.min(t,n))}function m(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function h(e,t){if(!e)throw Error(typeof t==`string`?t:t())}function g(e,t,n=``){h(y(e,t),()=>n+` Shapes ${e} and ${t} must match`)}function _(e){h(e!=null,()=>`The input to the tensor constructor must be a non-null value.`)}function v(e){if(e.length===0)return 1;let t=e[0];for(let n=1;n<e.length;n++)t*=e[n];return t}function y(e,t){if(e===t)return!0;if(e==null||t==null||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function b(e){return e%1==0}function x(e,t){return t<=e.length?e:e+` `.repeat(t-e.length)}function S(e,t){let n=1,r=-1;for(let t=0;t<e.length;++t)if(e[t]>=0)n*=e[t];else if(e[t]===-1){if(r!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${r} and dim ${t}`);r=t}else if(e[t]<0)throw Error(`Shapes can not be < 0. Found ${e[t]} at dim ${t}`);if(r===-1){if(t>0&&t!==n)throw Error(`Size(${t}) must match the product of shape ${e}`);return e}if(n===0)throw Error(`Cannot infer the missing size in [${e}] when there are 0 elements`);if(t%n!==0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${n}`);let i=e.slice();return i[r]=t/n,i}function C(e,t){let n=t.length;return e=e==null?t.map((e,t)=>t):[].concat(e),h(e.every(e=>e>=-n&&e<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${e}`),h(e.every(e=>b(e)),()=>`All values in axis param must be integers but got axis ${e}`),e.map(e=>e<0?n+e:e)}function w(e,t){let n=[],r=[],i=t!=null&&Array.isArray(t)&&t.length===0,a=t==null||i?null:C(t,e).sort(),o=0;for(let t=0;t<e.length;++t){if(a!=null){if(a[o]===t&&e[t]!==1)throw Error(`Can't squeeze axis ${t} since its dim '${e[t]}' is not 1`);(a[o]==null||a[o]>t)&&e[t]===1&&(n.push(e[t]),r.push(t)),a[o]<=t&&o++}e[t]!==1&&(n.push(e[t]),r.push(t))}return{newShape:n,keptDims:r}}function T(e,t){return E(e,t)}function E(e,t){let n=null;if(e==null||e===`float32`)n=new Float32Array(t);else if(e===`int32`)n=new Int32Array(t);else if(e===`bool`)n=new Uint8Array(t);else if(e===`string`)n=Array(t);else throw Error(`Unknown data type ${e}`);return n}function D(e,t){for(let n=0;n<e.length;n++){let r=e[n];if(isNaN(r)||!isFinite(r))throw Error(`A tensor of type ${t} being uploaded contains ${r}.`)}}function O(e){return e===`bool`||e===`complex64`||e===`float32`||e===`int32`||e===`string`}function ee(e,t){return!(t===`complex64`||t===`float32`&&e!==`complex64`||t===`int32`&&e!==`float32`&&e!==`complex64`||t===`bool`&&e===`bool`)}function te(e){if(e===`float32`||e===`int32`)return 4;if(e===`complex64`)return 8;if(e===`bool`)return 1;throw Error(`Unknown dtype ${e}`)}function ne(e){if(e==null)return 0;let t=0;return e.forEach(e=>t+=e.length),t}function re(e){return typeof e==`string`||e instanceof String}function ie(e){return typeof e==`boolean`}function ae(e){return typeof e==`number`}function oe(e){return Array.isArray(e)?oe(e[0]):e instanceof Float32Array?`float32`:e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray?`int32`:ae(e)?`float32`:re(e)?`string`:ie(e)?`bool`:`float32`}function se(e){return!!(e&&e.constructor&&e.call&&e.apply)}function k(e){let t=e.length;if(t<2)return[];let n=Array(t-1);n[t-2]=e[t-1];for(let r=t-3;r>=0;--r)n[r]=n[r+1]*e[r+1];return n}function ce(e,t,n,r=!1){let i=[];if(t.length===1){let a=t[0]*(r?2:1);for(let t=0;t<a;t++)i[t]=n[e+t]}else{let a=t[0],o=t.slice(1),s=o.reduce((e,t)=>e*t)*(r?2:1);for(let t=0;t<a;t++)i[t]=ce(e+t*s,o,n,r)}return i}function le(e,t,n=!1){if(e.length===0)return t[0];let r=e.reduce((e,t)=>e*t)*(n?2:1);if(r===0)return[];if(r!==t.length)throw Error(`[${e}] does not match the input size ${t.length}${n?` for a complex tensor`:``}.`);return ce(0,e,t,n)}function ue(e,t){if(Array.isArray(e))return e;if(t===`float32`)return e instanceof Float32Array?e:new Float32Array(e);if(t===`int32`)return e instanceof Int32Array?e:new Int32Array(e);if(t===`bool`||t===`string`)return Uint8Array.from(new Int32Array(e));throw Error(`Unknown dtype ${t}`)}function de(e,t){let n=fe(e,t);for(let e=0;e<n.length;e++)n[e]=1;return n}function fe(e,t){if(t==null||t===`float32`||t===`complex64`)return new Float32Array(e);if(t===`int32`)return new Int32Array(e);if(t===`bool`)return new Uint8Array(e);throw Error(`Unknown data type ${t}`)}function pe(e,t){let n=e.reduce((e,t)=>e*t,1);if(t==null||t===`float32`)return le(e,new Float32Array(n));if(t===`int32`)return le(e,new Int32Array(n));if(t===`bool`)return le(e,new Uint8Array(n));throw Error(`Unknown data type ${t}`)}function me(e){e.forEach(t=>{h(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${e}].`)})}function he(e,t,n){if(t===0)return 0;if(t===1)return e[0];let r=e[e.length-1];for(let t=0;t<e.length-1;++t)r+=n[t]*e[t];return r}function ge(e,t,n){if(t===0)return[];if(t===1)return[e];let r=Array(t);for(let t=0;t<r.length-1;++t)r[t]=Math.floor(e/n[t]),e-=r[t]*n[t];return r[r.length-1]=e,r}function _e(e){return e&&e.then&&typeof e.then==`function`}
/**
* @license
* Copyright 2017 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const ve=`tfjsflags`;var ye=class{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=be,this.populateURLFlags()}setPlatform(e,t){this.platform!=null&&(A().getBool(`IS_TEST`)||A().getBool(`PROD`)||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${e}.`)),this.platformName=e,this.platform=t}registerFlag(e,t,n){if(this.flagRegistry[e]={evaluationFn:t,setHook:n},this.urlFlags[e]!=null){let t=this.urlFlags[e];A().getBool(`IS_TEST`)||A().getBool(`PROD`)||console.warn(`Setting feature override from URL ${e}: ${t}.`),this.set(e,t)}}async getAsync(e){return e in this.flags||(this.flags[e]=await this.evaluateFlag(e)),this.flags[e]}get(e){if(e in this.flags)return this.flags[e];let t=this.evaluateFlag(e);if(_e(t))throw Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=t,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getString(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,t){if(this.flagRegistry[e]==null)throw Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=t,this.flagRegistry[e].setHook!=null&&this.flagRegistry[e].setHook(t)}evaluateFlag(e){if(this.flagRegistry[e]==null)throw Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(this.global===void 0||this.global.location===void 0||this.global.location.search===void 0)return;let e=this.getQueryParams(this.global.location.search);ve in e&&e[ve].split(`,`).forEach(e=>{let[t,n]=e.split(`:`);this.urlFlags[t]=Se(t,n)})}};function be(e){let t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(e,...n)=>(xe(t,n[0],n[1]),n.join(`=`))),t}function xe(e,t,n){e[decodeURIComponent(t)]=decodeURIComponent(n||``)}function Se(e,t){let n=t.toLowerCase();return n===`true`||n===`false`?n===`true`:`${+n}`===n?+n:t}function A(){return Ce}let Ce=null;function we(e){Ce=e}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let Te;function Ee(){if(Te==null){let e;if(typeof window<`u`)e=window;else if(typeof global<`u`)e=global;else if(typeof process<`u`)e=process;else if(typeof self<`u`)e=self;else throw Error(`Could not find a global object`);Te=e}return Te}function De(){let e=Ee();return e._tfGlobals??=/* @__PURE__ */ new Map,e._tfGlobals}function Oe(e,t){let n=De();if(n.has(e))return n.get(e);{let r=t();return n.set(e,r),n.get(e)}}const ke=`Acos`,Ae=`Acosh`,je=`AddN`,Me=`ArgMax`,Ne=`ArgMin`,Pe=`Asin`,Fe=`Asinh`,Ie=`Atan`,Le=`Atanh`,Re=`Atan2`,ze=`AvgPool`,Be=`AvgPoolGrad`,Ve=`AvgPool3D`,He=`AvgPool3DGrad`,Ue=`BatchMatMul`,We=`BatchToSpaceND`,Ge=`Bincount`,Ke=`BitwiseAnd`,qe=`Cast`,Je=`Ceil`,Ye=`ClipByValue`,Xe=`Complex`,Ze=`ComplexAbs`,Qe=`Concat`,$e=`Conv2D`,et=`Conv2DBackpropFilter`,tt=`Conv2DBackpropInput`,nt=`Conv3D`,rt=`Conv3DBackpropFilterV2`,it=`Conv3DBackpropInputV2`,at=`Cosh`,ot=`Cumprod`,st=`Cumsum`,ct=`CropAndResize`,lt=`DenseBincount`,ut=`DepthwiseConv2dNative`,dt=`DepthwiseConv2dNativeBackpropFilter`,ft=`DepthwiseConv2dNativeBackpropInput`,pt=`Dilation2D`,mt=`Dilation2DBackpropInput`,ht=`Dilation2DBackpropFilter`,gt=`RealDiv`,_t=`Einsum`,vt=`EluGrad`,yt=`Equal`,bt=`ExpandDims`,xt=`Expm1`,St=`Fill`,Ct=`FlipLeftRight`,wt=`Floor`,Tt=`FloorDiv`,Et=`FusedBatchNorm`,Dt=`GatherV2`,Ot=`Greater`,kt=`GreaterEqual`,At=`Identity`,jt=`Imag`,Mt=`IsFinite`,Nt=`IsInf`,Pt=`IsNan`,Ft=`LeakyRelu`,It=`Less`,Lt=`LessEqual`,Rt=`Log1p`,zt=`LogicalAnd`,Bt=`LogicalNot`,Vt=`LogicalOr`,Ht=`LRNGrad`,Ut=`Maximum`,Wt=`MaxPool`,Gt=`MaxPoolGrad`,Kt=`MaxPool3D`,qt=`MaxPool3DGrad`,Jt=`Mean`,Yt=`Minimum`,Xt=`MirrorPad`,Zt=`Multiply`,Qt=`NotEqual`,$t=`NonMaxSuppressionV3`,en=`NonMaxSuppressionV4`,tn=`NonMaxSuppressionV5`,nn=`OnesLike`,rn=`OneHot`,an=`Pack`,on=`PadV2`,sn=`Prelu`,cn=`Prod`,ln=`Range`,un=`Real`,dn=`Reciprocal`,fn=`Relu`,pn=`Reshape`,mn=`ResizeNearestNeighbor`,hn=`ResizeNearestNeighborGrad`,gn=`ResizeBilinear`,_n=`ResizeBilinearGrad`,vn=`Relu6`,yn=`Reverse`,bn=`Round`,xn=`Rsqrt`,Sn=`Select`,Cn=`Selu`,wn=`Slice`,Tn=`Sinh`,En=`Sign`,Dn=`Sigmoid`,On=`Softplus`,kn=`Sqrt`,An=`SpaceToBatchND`,jn=`SplitV`,Mn=`Softmax`,Nn=`SquaredDifference`,Pn=`Square`,Fn=`StaticRegexReplace`,In=`Tanh`,Ln=`Tile`,Rn=`Transform`,zn=`Transpose`,Bn=`Unpack`,Vn=`UnsortedSegmentSum`,Hn=`ZerosLike`,Un=`Step`,Wn=`RotateWithOffset`,Gn=`_FusedMatMul`,Kn=`FusedConv2D`;
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function qn(...e){A().getBool(`IS_TEST`)||A().getBool(`PROD`)||console.warn(...e)}
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const Jn=Oe(`kernelRegistry`,()=>/* @__PURE__ */ new Map),Yn=Oe(`gradRegistry`,()=>/* @__PURE__ */ new Map);function Xn(e,t){let n=tr(e,t);return Jn.get(n)}function Zn(e){return Yn.get(e)}function Qn(e){let t=Jn.entries(),n=[];for(;;){let{done:r,value:i}=t.next();if(r)break;let[a,o]=i,[s]=a.split(`_`);s===e&&n.push(o)}return n}function $n(e){let{kernelName:t,backendName:n}=e,r=tr(t,n);Jn.has(r)&&qn(`The kernel '${t}' for backend '${n}' is already registered`),Jn.set(r,e)}function er(e){let{kernelName:t}=e;Yn.has(t)&&A().getBool(`DEBUG`)&&qn(`Overriding the gradient for '${t}'`),Yn.set(t,e)}function tr(e,t){return`${t}_${e}`}
/**
* @license
* Copyright 2023 Google LLC.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function nr(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray}var rr=/* @__PURE__ */ c((/* @__PURE__ */ o(((e,t)=>{t.exports=r;var n=null;try{n=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function r(e,t,n){this.low=e|0,this.high=t|0,this.unsigned=!!n}r.prototype.__isLong__,Object.defineProperty(r.prototype,"__isLong__",{value:!0});function i(e){return(e&&e.__isLong__)===!0}r.isLong=i;var a={},o={};function s(e,t){var n,r,i;return t?(e>>>=0,(i=0<=e&&e<256)&&(r=o[e],r)?r:(n=l(e,(e|0)<0?-1:0,!0),i&&(o[e]=n),n)):(e|=0,(i=-128<=e&&e<128)&&(r=a[e],r)?r:(n=l(e,e<0?-1:0,!1),i&&(a[e]=n),n))}r.fromInt=s;function c(e,t){if(isNaN(e))return t?b:y;if(t){if(e<0)return b;if(e>=g)return T}else{if(e<=-_)return E;if(e+1>=_)return w}return e<0?c(-e,t).neg():l(e%h|0,e/h|0,t)}r.fromNumber=c;function l(e,t,n){return new r(e,t,n)}r.fromBits=l;var u=Math.pow;function d(e,t,n){if(e.length===0)throw Error(`empty string`);if(e===`NaN`||e===`Infinity`||e===`+Infinity`||e===`-Infinity`)return y;if(typeof t==`number`?(n=t,t=!1):t=!!t,n||=10,n<2||36<n)throw RangeError(`radix`);var r;if((r=e.indexOf(`-`))>0)throw Error(`interior hyphen`);if(r===0)return d(e.substring(1),t,n).neg();for(var i=c(u(n,8)),a=y,o=0;o<e.length;o+=8){var s=Math.min(8,e.length-o),l=parseInt(e.substring(o,o+s),n);if(s<8){var f=c(u(n,s));a=a.mul(f).add(c(l))}else a=a.mul(i),a=a.add(c(l))}return a.unsigned=t,a}r.fromString=d;function f(e,t){return typeof e==`number`?c(e,t):typeof e==`string`?d(e,t):l(e.low,e.high,typeof t==`boolean`?t:e.unsigned)}r.fromValue=f;var p=65536,m=1<<24,h=p*p,g=h*h,_=g/2,v=s(m),y=s(0);r.ZERO=y;var b=s(0,!0);r.UZERO=b;var x=s(1);r.ONE=x;var S=s(1,!0);r.UONE=S;var C=s(-1);r.NEG_ONE=C;var w=l(-1,2147483647,!1);r.MAX_VALUE=w;var T=l(-1,-1,!0);r.MAX_UNSIGNED_VALUE=T;var E=l(0,-2147483648,!1);r.MIN_VALUE=E;var D=r.prototype;D.toInt=function(){return this.unsigned?this.low>>>0:this.low},D.toNumber=function(){return this.unsigned?(this.high>>>0)*h+(this.low>>>0):this.high*h+(this.low>>>0)},D.toString=function(e){if(e||=10,e<2||36<e)throw RangeError(`radix`);if(this.isZero())return`0`;if(this.isNegative()){if(this.eq(E)){var t=c(e),n=this.div(t),r=n.mul(t).sub(this);return n.toString(e)+r.toInt().toString(e)}return`-`+this.neg().toString(e)}for(var i=c(u(e,6),this.unsigned),a=this,o=``;;){var s=a.div(i),l=(a.sub(s.mul(i)).toInt()>>>0).toString(e);if(a=s,a.isZero())return l+o;for(;l.length<6;)l=`0`+l;o=``+l+o}},D.getHighBits=function(){return this.high},D.getHighBitsUnsigned=function(){return this.high>>>0},D.getLowBits=function(){return this.low},D.getLowBitsUnsigned=function(){return this.low>>>0},D.getNumBitsAbs=function(){if(this.isNegative())return this.eq(E)?64:this.neg().getNumBitsAbs();for(var e=this.high==0?this.low:this.high,t=31;t>0&&!(e&1<<t);t--);return this.high==0?t+1:t+33},D.isZero=function(){return this.high===0&&this.low===0},D.eqz=D.isZero,D.isNegative=function(){return!this.unsigned&&this.high<0},D.isPositive=function(){return this.unsigned||this.high>=0},D.isOdd=function(){return(this.low&1)==1},D.isEven=function(){return!(this.low&1)},D.equals=function(e){return i(e)||(e=f(e)),this.unsigned!==e.unsigned&&this.high>>>31==1&&e.high>>>31==1?!1:this.high===e.high&&this.low===e.low},D.eq=D.equals,D.notEquals=function(e){return!this.eq(e)},D.neq=D.notEquals,D.ne=D.notEquals,D.lessThan=function(e){return this.comp(e)<0},D.lt=D.lessThan,D.lessThanOrEqual=function(e){return this.comp(e)<=0},D.lte=D.lessThanOrEqual,D.le=D.lessThanOrEqual,D.greaterThan=function(e){return this.comp(e)>0},D.gt=D.greaterThan,D.greaterThanOrEqual=function(e){return this.comp(e)>=0},D.gte=D.greaterThanOrEqual,D.ge=D.greaterThanOrEqual,D.compare=function(e){if(i(e)||(e=f(e)),this.eq(e))return 0;var t=this.isNegative(),n=e.isNegative();return t&&!n?-1:!t&&n?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},D.comp=D.compare,D.negate=function(){return!this.unsigned&&this.eq(E)?E:this.not().add(x)},D.neg=D.negate,D.add=function(e){i(e)||(e=f(e));var t=this.high>>>16,n=this.high&65535,r=this.low>>>16,a=this.low&65535,o=e.high>>>16,s=e.high&65535,c=e.low>>>16,u=e.low&65535,d=0,p=0,m=0,h=0;return h+=a+u,m+=h>>>16,h&=65535,m+=r+c,p+=m>>>16,m&=65535,p+=n+s,d+=p>>>16,p&=65535,d+=t+o,d&=65535,l(m<<16|h,d<<16|p,this.unsigned)},D.subtract=function(e){return i(e)||(e=f(e)),this.add(e.neg())},D.sub=D.subtract,D.multiply=function(e){if(this.isZero())return y;if(i(e)||(e=f(e)),n)return l(n.mul(this.low,this.high,e.low,e.high),n.get_high(),this.unsigned);if(e.isZero())return y;if(this.eq(E))return e.isOdd()?E:y;if(e.eq(E))return this.isOdd()?E:y;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(v)&&e.lt(v))return c(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,r=this.high&65535,a=this.low>>>16,o=this.low&65535,s=e.high>>>16,u=e.high&65535,d=e.low>>>16,p=e.low&65535,m=0,h=0,g=0,_=0;return _+=o*p,g+=_>>>16,_&=65535,g+=a*p,h+=g>>>16,g&=65535,g+=o*d,h+=g>>>16,g&=65535,h+=r*p,m+=h>>>16,h&=65535,h+=a*d,m+=h>>>16,h&=65535,h+=o*u,m+=h>>>16,h&=65535,m+=t*p+r*d+a*u+o*s,m&=65535,l(g<<16|_,m<<16|h,this.unsigned)},D.mul=D.multiply,D.divide=function(e){if(i(e)||(e=f(e)),e.isZero())throw Error(`division by zero`);if(n)return!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1?this:l((this.unsigned?n.div_u:n.div_s)(this.low,this.high,e.low,e.high),n.get_high(),this.unsigned);if(this.isZero())return this.unsigned?b:y;var t,r,a;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return b;if(e.gt(this.shru(1)))return S;a=b}else{if(this.eq(E))return e.eq(x)||e.eq(C)?E:e.eq(E)?x:(t=this.shr(1).div(e).shl(1),t.eq(y)?e.isNegative()?x:C:(r=this.sub(e.mul(t)),a=t.add(r.div(e)),a));if(e.eq(E))return this.unsigned?b:y;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();a=y}for(r=this;r.gte(e);){t=Math.max(1,Math.floor(r.toNumber()/e.toNumber()));for(var o=Math.ceil(Math.log(t)/Math.LN2),s=o<=48?1:u(2,o-48),d=c(t),p=d.mul(e);p.isNegative()||p.gt(r);)t-=s,d=c(t,this.unsigned),p=d.mul(e);d.isZero()&&(d=x),a=a.add(d),r=r.sub(p)}return a},D.div=D.divide,D.modulo=function(e){return i(e)||(e=f(e)),n?l((this.unsigned?n.rem_u:n.rem_s)(this.low,this.high,e.low,e.high),n.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},D.mod=D.modulo,D.rem=D.modulo,D.not=function(){return l(~this.low,~this.high,this.unsigned)},D.and=function(e){return i(e)||(e=f(e)),l(this.low&e.low,this.high&e.high,this.unsigned)},D.or=function(e){return i(e)||(e=f(e)),l(this.low|e.low,this.high|e.high,this.unsigned)},D.xor=function(e){return i(e)||(e=f(e)),l(this.low^e.low,this.high^e.high,this.unsigned)},D.shiftLeft=function(e){return i(e)&&(e=e.toInt()),(e&=63)==0?this:e<32?l(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):l(0,this.low<<e-32,this.unsigned)},D.shl=D.shiftLeft,D.shiftRight=function(e){return i(e)&&(e=e.toInt()),(e&=63)==0?this:e<32?l(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):l(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},D.shr=D.shiftRight,D.shiftRightUnsigned=function(e){if(i(e)&&(e=e.toInt()),e&=63,e===0)return this;var t=this.high;if(e<32){var n=this.low;return l(n>>>e|t<<32-e,t>>>e,this.unsigned)}return l(e===32?t:t>>>e-32,0,this.unsigned)},D.shru=D.shiftRightUnsigned,D.shr_u=D.shiftRightUnsigned,D.toSigned=function(){return this.unsigned?l(this.low,this.high,!1):this},D.toUnsigned=function(){return this.unsigned?this:l(this.low,this.high,!0)},D.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},D.toBytesLE=function(){var e=this.high,t=this.low;return[t&255,t>>>8&255,t>>>16&255,t>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]},D.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,t>>>24,t>>>16&255,t>>>8&255,t&255]},r.fromBytes=function(e,t,n){return n?r.fromBytesLE(e,t):r.fromBytesBE(e,t)},r.fromBytesLE=function(e,t){return new r(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},r.fromBytesBE=function(e,t){return new r(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)}})))());
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const ir=rr.default||rr;function ar(e){return ir.fromString(e,!0,16)}const or=ar(`c3a5c85c97cb3127`),sr=ar(`b492b66fbe98f273`),cr=ar(`9ae16a3b2f90404f`);function lr(e){return e.xor(e.shru(47))}function ur(e,t,n){let r=e.slice(t,t+n);return ir.fromBytes(Array.from(r),!0,!0)}function dr(e,t){return ur(e,t,8)}function fr(e,t){return ur(e,t,4)}function pr(e,t){return t===0?e:e.shru(t).or(e.shl(64-t))}function mr(e,t,n=ar(`9ddfea08eb382d69`)){let r=e.xor(t).mul(n);r=r.xor(r.shru(47));let i=t.xor(r).mul(n);return i=i.xor(i.shru(47)),i=i.mul(n),i}function hr(e,t,n,r,i,a){i=i.add(e),a=pr(a.add(i).add(r),21);let o=i;return i=i.add(t),i=i.add(n),a=a.add(pr(i,44)),[i.add(r),a.add(o)]}function gr(e,t,n,r){return hr(dr(e,t),dr(e,t+8),dr(e,t+16),dr(e,t+24),n,r)}function _r(e,t=e.length){if(t>=8){let n=cr.add(t*2),r=dr(e,0).add(cr),i=dr(e,t-8);return mr(pr(i,37).mul(n).add(r),pr(r,25).add(i).mul(n),n)}if(t>=4){let n=cr.add(t*2);return mr(fr(e,0).shl(3).add(t),fr(e,t-4),n)}if(t>0){let n=e[0],r=e[t>>1],i=e[t-1],a=n+(r<<8),o=t+(i<<2);return lr(cr.mul(a).xor(or.mul(o))).mul(cr)}return cr}function vr(e,t=e.length){let n=cr.add(t*2),r=dr(e,0).mul(sr),i=dr(e,8),a=dr(e,t-8).mul(n),o=dr(e,t-16).mul(cr);return mr(pr(r.add(i),43).add(pr(a,30)).add(o),r.add(pr(i.add(cr),18)).add(a),n)}function yr(e,t=e.length){let n=cr.add(t*2),r=dr(e,0).mul(cr),i=dr(e,8),a=dr(e,t-8).mul(n),o=dr(e,t-16).mul(cr),s=pr(r.add(i),43).add(pr(a,30)).add(o),c=mr(s,r.add(pr(i.add(cr),18)).add(a),n),l=dr(e,16).mul(n),u=dr(e,24),d=s.add(dr(e,t-32)).mul(n),f=c.add(dr(e,t-24)).mul(n);return mr(pr(l.add(u),43).add(pr(d,30)).add(f),l.add(pr(u.add(r),18)).add(d),n)}function br(e,t=e.length){let n=ir.fromNumber(81,!0);if(t<=32)return t<=16?_r(e,t):vr(e,t);if(t<=64)return yr(e,t);let r=n,i=n.mul(sr).add(113),a=lr(i.mul(cr).add(113)).mul(cr),o=[ir.UZERO,ir.UZERO],s=[ir.UZERO,ir.UZERO];r=r.mul(cr).add(dr(e,0));let c=0,l=(t-1>>6)*64,u=l+(t-1&63)-63;do r=pr(r.add(i).add(o[0]).add(dr(e,c+8)),37).mul(sr),i=pr(i.add(o[1]).add(dr(e,c+48)),42).mul(sr),r=r.xor(s[1]),i=i.add(o[0]).add(dr(e,c+40)),a=pr(a.add(s[0]),33).mul(sr),o=gr(e,c,o[1].mul(sr),r.add(s[0])),s=gr(e,c+32,a.add(s[1]),i.add(dr(e,c+16))),[a,r]=[r,a],c+=64;while(c!==l);let d=sr.add(a.and(255).shl(1));return c=u,s[0]=s[0].add(t-1&63),o[0]=o[0].add(s[0]),s[0]=s[0].add(o[0]),r=pr(r.add(i).add(o[0]).add(dr(e,c+8)),37).mul(d),i=pr(i.add(o[1]).add(dr(e,c+48)),42).mul(d),r=r.xor(s[1].mul(9)),i=i.add(o[0].mul(9).add(dr(e,c+40))),a=pr(a.add(s[0]),33).mul(d),o=gr(e,c,o[1].mul(d),r.add(s[0])),s=gr(e,c+32,a.add(s[1]),i.add(dr(e,c+16))),[a,r]=[r,a],mr(mr(o[0],s[0],d).add(lr(i).mul(or)).add(a),mr(o[1],s[1],d).add(r),d)}
/**
* @license
* Copyright 2017 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function xr(e,t){return t===`string`?Tr(e):Cr([e],t)}function Sr(e,t){return e instanceof Float32Array&&t===`float32`||e instanceof Int32Array&&t===`int32`||e instanceof Uint8Array&&t===`bool`}function Cr(e,t){if(t===`string`)throw Error(`Cannot convert a string[] to a TypedArray`);if(Array.isArray(e)&&(e=Or(e)),A().getBool(`DEBUG`)&&D(e,t),Sr(e,t))return e;if(t==null||t===`float32`||t===`complex64`)return new Float32Array(e);if(t===`int32`)return new Int32Array(e);if(t===`bool`){let t=new Uint8Array(e.length);for(let n=0;n<t.length;++n)Math.round(e[n])!==0&&(t[n]=1);return t}throw Error(`Unknown data type ${t}`)}function wr(){return A().platform.now()}function Tr(e,t=`utf-8`){return t||=`utf-8`,A().platform.encode(e,t)}function Er(e,t=`utf-8`){return t||=`utf-8`,A().platform.decode(e,t)}function Dr(e){return A().platform.isTypedArray==null?nr(e):A().platform.isTypedArray(e)}function Or(e,t=[],n=!1){if(t??=[],typeof e==`boolean`||typeof e==`number`||typeof e==`string`||_e(e)||e==null||Dr(e)&&n)t.push(e);else if(Array.isArray(e)||Dr(e))for(let r=0;r<e.length;++r)Or(e[r],t,n);else{let r=-1;for(let t of Object.keys(e))/^([1-9]+[0-9]*|0)$/.test(t)&&(r=Math.max(r,Number(t)));for(let i=0;i<=r;i++)Or(e[i],t,n)}return t}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
var kr=class{constructor(e,t){this.backendTimer=e,this.logger=t,t??(this.logger=new jr)}profileKernel(e,t,n){let r,i=()=>{r=n()},a,o=wr();if(this.backendTimer.timerAvailable())a=this.backendTimer.time(i);else{i();for(let e of r)e.dataSync();a=Promise.resolve({kernelMs:wr()-o})}if(A().getBool(`CHECK_COMPUTATION_FOR_ERRORS`))for(let t=0;t<r.length;t++){let n=r[t];n.data().then(t=>{Ar(t,n.dtype,e)})}return{kernelName:e,outputs:r,inputs:t,timeMs:a.then(e=>e.kernelMs),extraInfo:a.then(e=>e.getExtraProfileInfo==null?``:e.getExtraProfileInfo())}}logKernelProfile(e){let{kernelName:t,outputs:n,timeMs:r,inputs:i,extraInfo:a}=e;n.forEach(e=>{Promise.all([e.data(),r,a]).then(n=>{this.logger.logKernelProfile(t,e,n[0],n[1],i,n[2])})})}};function Ar(e,t,n){if(t!==`float32`)return!1;for(let t=0;t<e.length;t++){let r=e[t];if(isNaN(r)||!isFinite(r))return console.warn(`Found ${r} in the result of '${n}'`),!0}return!1}var jr=class{logKernelProfile(e,t,n,r,i,a){let o=typeof r==`number`?x(`${r}ms`,9):r.error,s=x(e,25),c=t.rank,l=t.size,u=x(t.shape.toString(),14),d=``;for(let e in i){let n=i[e];if(n!=null){let r=n.shape||t.shape,i=r.length;d+=`${e}: ${i}D ${i>0?r:``} `}}console.log(`%c${s}\t%c${o}\t%c${c}D ${u}\t%c${l}\t%c${d}\t%c${a}`,`font-weight:bold`,`color:red`,`color:blue`,`color: orange`,`color: green`,`color: steelblue`)}};
/**
* @license
* Copyright 2017 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Mr(e,t,n){let r={},i={};for(let e=0;e<t.length;e++)r[t[e].id]=!0;for(let n=0;n<e.length;n++){let a=e[n],o=a.inputs;for(let e in o){let n=o[e],s=!1;for(let e=0;e<t.length;e++)if(r[n.id]){a.outputs.forEach(e=>r[e.id]=!0),s=!0,i[a.id]=!0;break}if(s)break}}let a={};a[n.id]=!0;let o={};for(let t=e.length-1;t>=0;t--){let n=e[t],r=n.inputs;for(let e=0;e<n.outputs.length;e++)if(a[n.outputs[e].id]){for(let e in r)a[r[e].id]=!0,o[n.id]=!0;break}}let s=[];for(let t=0;t<e.length;t++){let n=e[t];if(i[n.id]&&o[n.id]){let e={};for(let t in n.inputs){let i=n.inputs[t];r[i.id]&&(e[t]=i)}let t=Object.assign({},n);t.inputs=e,t.outputs=n.outputs,s.push(t)}}return s}function Nr(e,t,n,r){for(let i=t.length-1;i>=0;i--){let a=t[i],o=[];if(a.outputs.forEach(t=>{let n=e[t.id];n==null?o.push(null):o.push(n)}),a.gradient==null)throw Error(`Cannot compute gradient: gradient function not found for ${a.kernelName}.`);let s=a.gradient(o);for(let t in a.inputs){if(!(t in s))throw Error(`Cannot backprop through input ${t}. Available gradients found: ${Object.keys(s)}.`);let i=n(()=>s[t]());if(i.dtype!==`float32`)throw Error(`Error in gradient for op ${a.kernelName}. The gradient of input ${t} must have 'float32' dtype, but has '${i.dtype}'`);let o=a.inputs[t];if(!y(i.shape,o.shape))throw Error(`Error in gradient for op ${a.kernelName}. The gradient of input '${t}' has shape '${i.shape}', which does not match the shape of the input '${o.shape}'`);if(e[o.id]==null)e[o.id]=i;else{let t=e[o.id];e[o.id]=r(t,i),t.dispose()}}}}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Pr(e,t,n,r){let i=k(t),a=Fr(e,t,n,i),o=t.length,s=Rr(e,t,n,i,a),c=[`Tensor`];return r&&(c.push(`  dtype: ${n}`),c.push(`  rank: ${o}`),c.push(`  shape: [${t}]`),c.push(`  values:`)),c.push(s.map(e=>`    `+e).join(`
`)),c.join(`
`)}function Fr(e,t,n,r){let i=v(t),a=r[r.length-1],o=Array(a).fill(0),s=t.length,c=n===`complex64`?zr(e):e;if(s>1)for(let e=0;e<i/a;e++){let t=e*a;for(let e=0;e<a;e++)o[e]=Math.max(o[e],Ir(c[t+e],0,n).length)}return o}function Ir(e,t,n){let r;return r=Array.isArray(e)?`${parseFloat(e[0].toFixed(7))} + ${parseFloat(e[1].toFixed(7))}j`:re(e)?`'${e}'`:n===`bool`?Lr(e):parseFloat(e.toFixed(7)).toString(),x(r,t)}function Lr(e){return e===0?`false`:`true`}function Rr(e,t,n,r,i,a=!0){let o=n===`complex64`?2:1,s=t[0],c=t.length;if(c===0)return n===`complex64`?[Ir(zr(e)[0],0,n)]:n===`bool`?[Lr(e[0])]:[e[0].toString()];if(c===1){if(s>20){let t=3*o,r=Array.from(e.slice(0,t)),a=Array.from(e.slice((s-3)*o,s*o));return n===`complex64`&&(r=zr(r),a=zr(a)),[`[`+r.map((e,t)=>Ir(e,i[t],n)).join(`, `)+`, ..., `+a.map((e,t)=>Ir(e,i[s-3+t],n)).join(`, `)+`]`]}return[`[`+(n===`complex64`?zr(e):Array.from(e)).map((e,t)=>Ir(e,i[t],n)).join(`, `)+`]`]}let l=t.slice(1),u=r.slice(1),d=r[0]*o,f=[];if(s>20){for(let t=0;t<3;t++){let r=t*d,a=r+d;f.push(...Rr(e.slice(r,a),l,n,u,i,!1))}f.push(`...`);for(let t=s-3;t<s;t++){let r=t*d,a=r+d;f.push(...Rr(e.slice(r,a),l,n,u,i,t===s-1))}}else for(let t=0;t<s;t++){let r=t*d,a=r+d;f.push(...Rr(e.slice(r,a),l,n,u,i,t===s-1))}let p=c===2?`,`:``;f[0]=`[`+(s>0?f[0]+p:``);for(let e=1;e<f.length-1;e++)f[e]=` `+f[e]+p;let m=`,
`;for(let e=2;e<c;e++)m+=`
`;return f[f.length-1]=` `+f[f.length-1]+`]`+(a?``:m),f}function zr(e){let t=[];for(let n=0;n<e.length;n+=2)t.push([e[n],e[n+1]]);return t}
/**
* @license
* Copyright 2017 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
var Br=class{constructor(e,t,n){if(this.dtype=t,this.shape=e.slice(),this.size=v(e),n!=null){let e=n.length;h(e===this.size,()=>`Length of values '${e}' does not match the size inferred by the shape '${this.size}'.`)}if(t===`complex64`)throw Error(`complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).`);this.values=n||E(t,this.size),this.strides=k(e)}set(e,...t){t.length===0&&(t=[0]),h(t.length===this.rank,()=>`The number of provided coordinates (${t.length}) must match the rank (${this.rank})`);let n=this.locToIndex(t);this.values[n]=e}get(...e){e.length===0&&(e=[0]);let t=0;for(let n of e){if(n<0||n>=this.shape[t]){let t=`Requested out of range element at ${e}.   Buffer shape=${this.shape}`;throw Error(t)}t++}let n=e[e.length-1];for(let t=0;t<e.length-1;++t)n+=this.strides[t]*e[t];return this.values[n]}locToIndex(e){if(this.rank===0)return 0;if(this.rank===1)return e[0];let t=e[e.length-1];for(let n=0;n<e.length-1;++n)t+=this.strides[n]*e[n];return t}indexToLoc(e){if(this.rank===0)return[];if(this.rank===1)return[e];let t=Array(this.shape.length);for(let n=0;n<t.length-1;++n)t[n]=Math.floor(e/this.strides[n]),e-=t[n]*this.strides[n];return t[t.length-1]=e,t}get rank(){return this.shape.length}toTensor(){return Vr().makeTensor(this.values,this.shape,this.dtype)}};let Vr=null,Hr=null;function Ur(e){Vr=e}function Wr(e){Hr=e}var Gr=class{constructor(e,t,n,r){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||`float32`,this.size=v(e),this.strides=k(e),this.dataId=n,this.id=r,this.rankType=this.rank<5?this.rank.toString():`higher`}get rank(){return this.shape.length}async buffer(){let e=await this.data();return Hr.buffer(this.shape,this.dtype,e)}bufferSync(){return Hr.buffer(this.shape,this.dtype,this.dataSync())}async array(){let e=await this.data();return le(this.shape,e,this.dtype===`complex64`)}arraySync(){return le(this.shape,this.dataSync(),this.dtype===`complex64`)}async data(){this.throwIfDisposed();let e=Vr().read(this.dataId);if(this.dtype===`string`){let t=await e;try{return t.map(e=>Er(e))}catch{throw Error(`Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().`)}}return e}dataToGPU(e){return this.throwIfDisposed(),Vr().readToGPU(this.dataId,e)}dataSync(){this.throwIfDisposed();let e=Vr().readSync(this.dataId);if(this.dtype===`string`)try{return e.map(e=>Er(e))}catch{throw Error(`Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().`)}return e}async bytes(){this.throwIfDisposed();let e=await Vr().read(this.dataId);return this.dtype===`string`?e:new Uint8Array(e.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),Vr().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw Error(`Tensor is disposed.`)}print(e=!1){return Hr.print(this,e)}clone(){return this.throwIfDisposed(),Hr.clone(this)}toString(e=!1){return Pr(this.dataSync(),this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),Hr.cast(this,e)}variable(e=!0,t,n){return this.throwIfDisposed(),Vr().makeVariable(this,e,t,n)}};Object.defineProperty(Gr,Symbol.hasInstance,{value:e=>!!e&&e.data!=null&&e.dataSync!=null&&e.throwIfDisposed!=null});function Kr(){return Oe(`Tensor`,()=>Gr)}Kr();var qr=class extends Gr{constructor(e,t,n,r){super(e.shape,e.dtype,e.dataId,r),this.trainable=t,this.name=n}assign(e){if(e.dtype!==this.dtype)throw Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!y(e.shape,this.shape))throw Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);Vr().disposeTensor(this),this.dataId=e.dataId,Vr().incRef(this,null)}dispose(){Vr().disposeVariable(this),this.isDisposedInternal=!0}};Object.defineProperty(qr,Symbol.hasInstance,{value:e=>e instanceof Gr&&e.assign!=null&&e.assign instanceof Function});
/**
* @license
* Copyright 2017 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
var Jr;(function(e){e.R0=`R0`,e.R1=`R1`,e.R2=`R2`,e.R3=`R3`,e.R4=`R4`,e.R5=`R5`,e.R6=`R6`})(Jr||={});var Yr;(function(e){e.float32=`float32`,e.int32=`int32`,e.bool=`int32`,e.complex64=`complex64`})(Yr||={});var Xr;(function(e){e.float32=`float32`,e.int32=`int32`,e.bool=`bool`,e.complex64=`complex64`})(Xr||={});var Zr;(function(e){e.float32=`float32`,e.int32=`float32`,e.bool=`float32`,e.complex64=`complex64`})(Zr||={});var Qr;(function(e){e.float32=`complex64`,e.int32=`complex64`,e.bool=`complex64`,e.complex64=`complex64`})(Qr||={});const $r={float32:Zr,int32:Yr,bool:Xr,complex64:Qr};function ei(e,t){if(e===`string`||t===`string`){if(e===`string`&&t===`string`)return`string`;throw Error(`Can not upcast ${e} with ${t}`)}return $r[e][t]}function ti(e){return typeof e==`object`&&!!e&&`texture`in e&&e.texture instanceof WebGLTexture}function ni(e){return typeof GPUBuffer<`u`&&typeof e==`object`&&!!e&&`buffer`in e&&e.buffer instanceof GPUBuffer}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ri(e,t){if(e.dtype===t.dtype)return[e,t];let n=ei(e.dtype,t.dtype);return[e.cast(n),t.cast(n)]}function ii(e){let t=[];return ai(e,t,/* @__PURE__ */ new Set),t}function ai(e,t,n){if(e==null)return;if(e instanceof Gr){t.push(e);return}if(!oi(e))return;let r=e;for(let e in r){let i=r[e];n.has(i)||(n.add(i),ai(i,t,n))}}function oi(e){return Array.isArray(e)||typeof e==`object`}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function si(e){return e.kernelName!=null}var ci=class{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=/* @__PURE__ */ new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(e=>e.name)))}}}dispose(){for(let e in this.registeredVariables)this.registeredVariables[e].dispose()}},li=class e{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new ci}async ready(){if(this.pendingBackendInit!=null)return this.pendingBackendInit.then(()=>{});if(this.backendInstance!=null)return;let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let n=e[t];if(await this.initializeBackend(n).success){await this.setBackend(n);return}}throw Error(`Could not initialize any backends, all backend initializations failed.`)}get backend(){if(this.pendingBackendInit!=null)throw Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){let{name:e,asyncInit:t}=this.initializeBackendsAndReturnBest();if(t)throw Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry)){if(e in this.registryFactory){let{asyncInit:t}=this.initializeBackend(e);if(t)return null}else return null}return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,t,n=1){return e in this.registryFactory?(qn(`${e} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[e]={factory:t,priority:n},!0)}async setBackend(e){if(this.registryFactory[e]==null)throw Error(`Backend name '${e}' not found in registry`);if(this.backendName=e,this.registry[e]==null){this.backendInstance=null;let{success:t,asyncInit:n}=this.initializeBackend(e);if(!(n?await t:t))return!1}return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new kr(this.backendInstance),!0}setupRegisteredKernels(){Qn(this.backendName).forEach(e=>{e.setupFunc!=null&&e.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){Qn(e).forEach(t=>{t.disposeFunc!=null&&t.disposeFunc(this.registry[e])})}initializeBackend(e){let t=this.registryFactory[e];if(t==null)throw Error(`Cannot initialize backend ${e}, no registration found.`);try{let n=t.factory();if(n&&!(n instanceof u)&&typeof n.then==`function`){let t=++this.pendingBackendInitId,r=n.then(n=>t<this.pendingBackendInitId?!1:(this.registry[e]=n,this.pendingBackendInit=null,!0)).catch(n=>(t<this.pendingBackendInitId||(this.pendingBackendInit=null,qn(`Initialization of backend ${e} failed`),qn(n.stack||n.message)),!1));return this.pendingBackendInit=r,{success:r,asyncInit:!0}}return this.registry[e]=n,{success:!0,asyncInit:!1}}catch(t){return qn(`Initialization of backend ${e} failed`),qn(t.stack||t.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw Error(`${e} backend not found in registry`);this.backendName===e&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw Error(`No backend found in registry.`);return Object.keys(this.registryFactory).sort((e,t)=>this.registryFactory[t].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let n=e[t],{success:r,asyncInit:i}=this.initializeBackend(n);if(i||r)return{name:n,asyncInit:i}}throw Error(`Could not initialize any backends, all backend initializations failed.`)}moveData(e,t){let n=this.state.tensorInfo.get(t),r=n.backend,i=this.readSync(t),a=r.refCount(t);r.disposeData(t,!0),n.backend=e,e.move(t,i,n.shape,n.dtype,a),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,t){let n=null;if(t==null){if(typeof e!=`function`)throw Error(`Please provide a function to tidy()`);t=e}else{if(typeof e!=`string`&&!(e instanceof String))throw Error(`When calling with two arguments, the first argument to tidy() must be a string`);if(typeof t!=`function`)throw Error(`When calling with two arguments, the 2nd argument to tidy() must be a function`);n=e}let r;return this.scopedRun(()=>this.startScope(n),()=>this.endScope(r),()=>(r=t(),r instanceof Promise&&console.error(`Cannot return a Promise inside of tidy.`),r))}scopedRun(e,t,n){e();try{let e=n();return t(),e}catch(e){throw t(),e}}nextTensorId(){return e.nextTensorId++}nextVariableId(){return e.nextVariableId++}clone(e){let t=j.runKernel(At,{x:e}),n={x:e};return this.addTapeNode(this.state.activeScope.name,n,[t],e=>({x:()=>{let t={x:e};return j.runKernel(qe,t,{dtype:`float32`})}}),[],{}),t}runKernel(e,t,n){if(this.backendName??this.backend,Xn(e,this.backendName)==null)throw Error(`Kernel '${e}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:e,inputs:t,attrs:n})}shouldCheckForMemLeaks(){return this.ENV.getBool(`IS_TEST`)}checkKernelForMemLeak(e,t,n){let r=this.backend.numDataIds(),i=0;n.forEach(e=>{i+=e.dtype===`complex64`?3:1});let a=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],o=r-t-i-a;if(o>0)throw Error(`Backend '${this.backendName}' has an internal memory leak (${o} data ids) after running '${e}'`)}runKernelFunc(e){let t,n=[],r=this.isTapeOn(),i=this.state.numBytes,a=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let o;this.backendName??this.backend;let s,c=si(e)?e.kernelName:this.state.activeScope==null?``:this.state.activeScope.name;if(si(e)){let{kernelName:t,inputs:i,attrs:a}=e;this.backendName??this.backend;let c=Xn(t,this.backendName);h(c!=null,()=>`Cannot find registered kernel '${t}' for backend '${this.backendName}'`),o=()=>{let e=this.backend.numDataIds();s=c.kernelFunc({inputs:i,attrs:a,backend:this.backend});let o=Array.isArray(s)?s:[s];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(t,e,o);let l=o.map(e=>e.rank==null?this.makeTensorFromTensorInfo(e):e);if(r){let e=this.getTensorsForGradient(t,i,l);n=this.saveTensorsForBackwardMode(e)}return l}}else{let{forwardFunc:t}=e,i=e=>{r&&(n=e.map(e=>this.keep(this.clone(e))))};o=()=>{let e=this.backend.numDataIds();s=this.tidy(()=>t(this.backend,i));let n=Array.isArray(s)?s:[s];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(c,e,n),n}}let{inputs:l,attrs:u}=e,d=si(e)?null:e.backwardsFunc,f;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool(`DEBUG`)&&!this.state.profiling?t=o():(f=this.profiler.profileKernel(c,l,()=>o()),this.ENV.getBool(`DEBUG`)&&this.profiler.logKernelProfile(f),t=f.outputs)}),r&&this.addTapeNode(c,l,t,d,n,u),this.state.profiling&&this.state.activeProfile.kernels.push({name:c,bytesAdded:this.state.numBytes-i,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-a,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(l).map(e=>l[e]==null?null:l[e].shape),outputShapes:t.map(e=>e.shape),kernelTimeMs:f.timeMs,extraInfo:f.extraInfo}),Array.isArray(s)?t:t[0]}saveTensorsForBackwardMode(e){return e.map(e=>this.keep(this.clone(e)))}getTensorsForGradient(e,t,n){let r=Zn(e);if(r!=null){let e=r.inputsToSave||[],i=r.outputsToSave||[],a;r.saveAllInputs?(h(Array.isArray(t),()=>`saveAllInputs is true, expected inputs to be an array.`),a=Object.keys(t).map(e=>t[e])):a=e.map(e=>t[e]);let o=n.filter((e,t)=>i[t]);return a.concat(o)}return[]}makeTensor(e,t,n,r){if(e==null)throw Error(`Values passed to engine.makeTensor() are null`);n||=`float32`,r||=this.backend;let i=e;n===`string`&&re(e[0])&&(i=e.map(e=>Tr(e)));let a=r.write(i,t,n),o=new Gr(t,n,a,this.nextTensorId());if(this.trackTensor(o,r),n===`string`){let e=this.state.tensorInfo.get(a),t=ne(i);this.state.numBytes+=t-e.bytes,e.bytes=t}return o}makeTensorFromDataId(e,t,n,r){n||=`float32`;let i={dataId:e,shape:t,dtype:n};return this.makeTensorFromTensorInfo(i,r)}makeTensorFromTensorInfo(e,t){let{dataId:n,shape:r,dtype:i}=e,a=new Gr(r,i,n,this.nextTensorId());return this.trackTensor(a,t),a}makeVariable(e,t=!0,n,r){n||=this.nextVariableId().toString(),r!=null&&r!==e.dtype&&(e=e.cast(r));let i=new qr(e,t,n,this.nextTensorId());if(this.state.registeredVariables[i.name]!=null)throw Error(`Variable with name ${i.name} was already registered`);return this.state.registeredVariables[i.name]=i,this.incRef(i,this.backend),i}trackTensor(e,t){this.state.numTensors++,e.dtype===`string`&&this.state.numStringTensors++;let n=0;e.dtype!==`complex64`&&e.dtype!==`string`&&(n=e.size*te(e.dtype)),this.state.numBytes+=n,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:n})),e instanceof qr||this.track(e)}incRef(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)}removeDataId(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;let t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,e.dtype===`string`&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),e.dtype!==`complex64`&&e.dtype!==`string`){let t=e.size*te(e.dtype);this.state.numBytes-=t}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}disposeVariables(){for(let e in this.state.registeredVariables){let t=this.state.registeredVariables[e];this.disposeVariable(t)}}disposeVariable(e){this.disposeTensor(e),this.state.registeredVariables[e.name]!=null&&delete this.state.registeredVariables[e.name]}memory(){let e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,e.reasons??=[],e.reasons.push(`Memory usage by string tensors is approximate (2 bytes per character)`)),e}async profile(e){this.state.profiling=!0;let t=this.state.numBytes,n=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(e=>e.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-n;for(let e of this.state.activeProfile.kernels)e.kernelTimeMs=await e.kernelTimeMs,e.extraInfo=await e.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(e,t,n,r,i,a){let o={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:n,saved:i},s=Zn(e);s!=null&&(r=s.gradFunc),r!=null&&(o.gradient=e=>(e=e.map((e,t)=>{if(e==null){let e=n[t],r=fe(e.size,e.dtype);return this.makeTensor(r,e.shape,e.dtype)}return e}),r(e.length>1?e:e[0],i,a))),this.state.activeTape.push(o)}keep(e){return e.kept=!0,e}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){let t={track:[],name:`unnamed scope`,id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t}endScope(e){let t=ii(e),n=new Set(t.map(e=>e.id));for(let e=0;e<this.state.activeScope.track.length;e++){let t=this.state.activeScope.track[e];!t.kept&&!n.has(t.id)&&t.dispose()}let r=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],t.forEach(e=>{!e.kept&&e.scopeId===r.id&&this.track(e)})}gradients(e,t,n,r=!1){if(h(t.length>0,()=>`gradients() received an empty list of xs.`),n!=null&&n.dtype!==`float32`)throw Error(`dy must have 'float32' dtype, but has '${n.dtype}'`);let i=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy(`forward`,e));h(i instanceof Gr,()=>`The result y returned by f() must be a tensor.`);let a=Mr(this.state.activeTape,t,i);if(!r&&a.length===0&&t.length>0)throw Error(`Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.`);return this.tidy(`backward`,()=>{let e={};e[i.id]=n??ui(i.shape),Nr(e,a,e=>this.tidy(e),fi);let r=t.map(t=>e[t.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(e=>{for(let t of e.saved)t.dispose()}),this.state.activeTape=null),{value:i,grads:r}})}customGrad(e){return h(se(e),()=>`The f passed in customGrad(f) must be a function.`),(...t)=>{h(t.every(e=>e instanceof Gr),()=>`The args passed in customGrad(f)(x1, x2,...) must all be tensors`);let n,r={};return t.forEach((e,t)=>{r[t]=e}),this.runKernelFunc({forwardFunc:(r,i)=>(n=e(...t,i),h(n.value instanceof Gr,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),h(se(n.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),n.value),backwardsFunc:(e,r)=>{let i=n.gradFunc(e,r),a=Array.isArray(i)?i:[i];h(a.length===t.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),h(a.every(e=>e instanceof Gr),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");let o={};return a.forEach((e,t)=>{o[t]=()=>e}),o},inputs:r})}}readSync(e){return this.state.tensorInfo.get(e).backend.readSync(e)}read(e){return this.state.tensorInfo.get(e).backend.read(e)}readToGPU(e,t){return this.state.tensorInfo.get(e).backend.readToGPU(e,t)}async time(e){let t=wr(),n=await this.backend.time(e);return n.wallMs=wr()-t,n}track(e){return this.state.activeScope!=null&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new ci;for(let e in this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}};li.nextTensorId=0,li.nextVariableId=0;function ui(e){let t=de(v(e),`float32`);return j.makeTensor(t,e,`float32`)}function di(){let e=Ee();return e._tfengine??=new li(new ye(e)),we(e._tfengine.ENV),Ur(()=>e._tfengine),e._tfengine}const j=di();function fi(e,t){let n={a:e,b:t};return j.runKernel(`Add`,n)}
/**
* @license
* Copyright 2017 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function pi(){return typeof window<`u`&&window.document!=null||typeof WorkerGlobalScope<`u`}
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const mi=A();mi.registerFlag(`DEBUG`,()=>!1,e=>{e&&console.warn(`Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.`)}),mi.registerFlag(`IS_BROWSER`,()=>pi()),mi.registerFlag(`IS_NODE`,()=>typeof process<`u`&&process.versions!==void 0&&process.versions.node!==void 0),mi.registerFlag(`IS_CHROME`,()=>typeof navigator<`u`&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)),mi.registerFlag(`IS_SAFARI`,()=>typeof navigator<`u`&&navigator!=null&&navigator.userAgent!=null&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)),mi.registerFlag(`PROD`,()=>!1),mi.registerFlag(`TENSORLIKE_CHECK_SHAPE_CONSISTENCY`,()=>mi.getBool(`DEBUG`)),mi.registerFlag(`DEPRECATION_WARNINGS_ENABLED`,()=>!0),mi.registerFlag(`IS_TEST`,()=>!1),mi.registerFlag(`CHECK_COMPUTATION_FOR_ERRORS`,()=>mi.getBool(`DEBUG`)),mi.registerFlag(`WRAP_TO_IMAGEBITMAP`,()=>!1),mi.registerFlag(`CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU`,()=>!1),mi.registerFlag(`USE_SETTIMEOUTCUSTOM`,()=>!1);
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function hi(e,t){let n=e;if(Dr(e))return t===`string`?[]:[e.length];if(ti(e)){let t=e.channels||`RGBA`;return[e.height,e.width*t.length]}if(ni(e))return[e.buffer.size/(t==null?4:te(t))];if(!Array.isArray(e))return[];let r=[];for(;Array.isArray(n)||Dr(n)&&t!==`string`;)r.push(n.length),n=n[0];return Array.isArray(e)&&A().getBool(`TENSORLIKE_CHECK_SHAPE_CONSISTENCY`)&&gi(e,r,[]),r}function gi(e,t,n){if(n||=[],!Array.isArray(e)&&!Dr(e)){h(t.length===0,()=>`Element arr[${n.join(`][`)}] is a primitive, but should be an array/TypedArray of ${t[0]} elements`);return}h(t.length>0,()=>`Element arr[${n.join(`][`)}] should be a primitive, but is an array of ${e.length} elements`),h(e.length===t[0],()=>`Element arr[${n.join(`][`)}] should have ${t[0]} elements, but has ${e.length} elements`);let r=t.slice(1);for(let t=0;t<e.length;++t)gi(e[t],r,n.concat(t))}function _i(e,t,n,r){if(e!==`string_or_numeric`){if(e==null)throw Error(`Expected dtype cannot be null.`);if(e!==`numeric`&&e!==t||e===`numeric`&&t===`string`)throw Error(`Argument '${n}' passed to '${r}' must be ${e} tensor, but got ${t} tensor`)}}function M(e,t,n,r=`numeric`){if(e instanceof Kr())return _i(r,e.dtype,t,n),e;let i=oe(e);if(i!==`string`&&[`bool`,`int32`,`float32`].indexOf(r)>=0&&(i=r),_i(r,i,t,n),e==null||!Dr(e)&&!Array.isArray(e)&&typeof e!=`number`&&typeof e!=`boolean`&&typeof e!=`string`){let r=e==null?`null`:e.constructor.name;throw Error(`Argument '${t}' passed to '${n}' must be a Tensor or TensorLike, but got '${r}'`)}let a=hi(e,i);!Dr(e)&&!Array.isArray(e)&&(e=[e]);let o=i===`string`?Or(e,[],!0):Cr(e,i);return j.makeTensor(o,a,i)}function vi(e,t,n,r=`numeric`){if(!Array.isArray(e))throw Error(`Argument ${t} passed to ${n} must be a \`Tensor[]\` or \`TensorLike[]\``);return e.map((e,i)=>M(e,`${t}[${i}]`,n,r))}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function N(e){let t=Object.keys(e);if(t.length!==1)throw Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${t.length} keys.`);let n=t[0],r=e[n];n.endsWith(`_`)&&(n=n.substring(0,n.length-1)),n+=`__op`;let i=(...e)=>{j.startScope(n);try{let t=r(...e);return _e(t)&&console.error(`Cannot return a Promise inside of tidy.`),j.endScope(t),t}catch(e){throw j.endScope(null),e}};return Object.defineProperty(i,"name",{value:n,configurable:!0}),i}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function yi(e,t){let n=M(e,`real`,`complex`),r=M(t,`imag`,`complex`);g(n.shape,r.shape,`real and imag shapes, ${n.shape} and ${r.shape}, must match in call to tf.complex().`);let i={real:n,imag:r};return j.runKernel(Xe,i)}const bi=/* @__PURE__ */ N({complex_:yi});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function xi(e,t,n,r){if(r==null)r=oe(e);else if(r===`complex64`)throw Error(`Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).`);if(ni(e)||ti(e)){if(r!==`float32`&&r!==`int32`)throw Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${r}.`);return j.backend.createTensorFromGPUData(e,t||n,r)}if(!Dr(e)&&!Array.isArray(e)&&typeof e!=`number`&&typeof e!=`boolean`&&typeof e!=`string`)throw Error(`values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray`);if(t!=null){me(t);let e=v(t),r=v(n);h(e===r,()=>`Based on the provided shape, [${t}], the tensor should have ${e} values but has ${r}`);for(let e=0;e<n.length;++e){let r=n[e],i=e!==n.length-1||r!==v(t.slice(e));h(n[e]===t[e]||!i,()=>`Error creating a new Tensor. Inferred shape (${n}) does not match the provided shape (${t}). `)}}return!Dr(e)&&!Array.isArray(e)&&(e=[e]),t||=n,e=r===`string`?Or(e,[],!0):Cr(e,r),j.makeTensor(e,t,r)}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Si(e,t,n){return xi(e,t,hi(e,n),n)}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const Ci={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8};var wi=class e{static join(t){return new e(t).slice()}constructor(e){if(this.shards=[],this.previousShardIndex=0,e==null||(e instanceof Array||(e=[e]),e=e.map(e=>Dr(e)?e.buffer:e),e.length===0))return;this.bufferUniformSize=e[0].byteLength;let t=0;for(let n=0;n<e.length;n++){let r=e[n];n!==e.length-1&&r.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);let i=t+r.byteLength;this.shards.push({buffer:r,start:t,end:i}),t=i}this.shards.length===0&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(e=0,t=this.byteLength){if(this.shards.length===0||(e=isNaN(Number(e))?0:e,t=isNaN(Number(t))?0:t,e=Math.max(0,e),t=Math.min(this.byteLength,t),t<=e))return/* @__PURE__ */ new ArrayBuffer(0);let n=this.findShardForByte(e);if(n===-1)throw Error(`Could not find start shard for byte ${e}`);let r=t-e,i=new ArrayBuffer(r),a=new Uint8Array(i),o=0;for(let r=n;r<this.shards.length;r++){let n=this.shards[r],i=e+o-n.start,s=o,c=Math.min(t,n.end)-n.start,l=new Uint8Array(n.buffer,i,c-i);if(a.set(l,s),o+=l.length,t<n.end)break}return i}findShardForByte(e){if(this.shards.length===0||e<0||e>=this.byteLength)return-1;if(this.bufferUniformSize!=null)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function t(t){return e<t.start?-1:+(e>=t.end)}if(t(this.shards[this.previousShardIndex])===0)return this.previousShardIndex;let n=Ti(this.shards,t);return n===-1?-1:(this.previousShardIndex=n,this.previousShardIndex)}};function Ti(e,t){let n=0,r=e.length;for(;n<=r;){let i=Math.floor((r-n)/2)+n,a=t(e[i]);if(a===0)return i;a<0?r=i:n=i+1}return-1}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ei(){return j}function Di(){return j.memory()}function P(e,t){return j.tidy(e,t)}function F(e){ii(e).forEach(e=>e.dispose())}function Oi(e){return j.keep(e)}function ki(e){return j.setBackend(e)}function Ai(){return j.ready()}function ji(e,t,n=1){return j.registerBackend(e,t,n)}function Mi(){return j.backend}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
async function Ni(e,t){let n=[],r=[],i=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);for(let a=0;a<i.length;++a){let o=i[a],s=Array.isArray(e)?e[a].tensor:e[o];if(s.dtype!==`float32`&&s.dtype!==`int32`&&s.dtype!==`bool`&&s.dtype!==`string`&&s.dtype!==`complex64`)throw Error(`Unsupported dtype in weight '${o}': ${s.dtype}`);let c={name:o,shape:s.shape,dtype:s.dtype};if(s.dtype===`string`){let e=new Promise(async e=>{let t=await s.bytes(),n=t.reduce((e,t)=>e+t.length,0)+4*t.length,r=new Uint8Array(n),i=0;for(let e=0;e<t.length;e++){let n=t[e],a=new Uint8Array(new Uint32Array([n.length]).buffer);r.set(a,i),i+=4,r.set(n,i),i+=n.length}e(r)});r.push(e)}else r.push(s.data());t!=null&&(c.group=t),n.push(c)}return{data:Li(await Promise.all(r)),specs:n}}function Pi(e,t){let n=new wi(e),r={},i=0;for(let e of t){let t=Fi(e,(e,t)=>n.slice(i+e,i+t));r[e.name]=Ii(e,n.slice(i,i+t)),i+=t}return r}function Fi(e,t){let n=v(e.shape),r;if(`quantization`in e){let t=e.quantization;r=Ci[t.dtype]}else if(e.dtype===`string`){let e=0;for(let r=0;r<n;r++)e+=4+new Uint32Array(t(e,e+4))[0];return e}else r=Ci[e.dtype];return n*r}function Ii(e,t){let n=e.name,r=e.dtype,i=e.shape,a=v(i),o,s=0;if(`quantization`in e){let i=e.quantization;if(i.dtype===`uint8`||i.dtype===`uint16`){if(!(`min`in i&&`scale`in i))throw Error(`Weight ${e.name} with quantization ${i.dtype} doesn't have corresponding metadata min and scale.`)}else if(i.dtype===`float16`){if(r!==`float32`)throw Error(`Weight ${e.name} is quantized with ${i.dtype} which only supports weights of type float32 not ${r}.`)}else throw Error(`Weight ${e.name} has unknown quantization dtype ${i.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);let c=Ci[i.dtype],l=i.dtype===`uint8`?new Uint8Array(t):new Uint16Array(t);if(r===`float32`){if(i.dtype===`uint8`||i.dtype===`uint16`){o=new Float32Array(l.length);for(let e=0;e<l.length;e++){let t=l[e];o[e]=t*i.scale+i.min}}else if(i.dtype===`float16`)o=Zi()(l);else throw Error(`Unsupported quantization type ${i.dtype} for weight type float32.`)}else if(r===`int32`){if(i.dtype!==`uint8`&&i.dtype!==`uint16`)throw Error(`Unsupported quantization type ${i.dtype} for weight type int32.`);o=new Int32Array(l.length);for(let e=0;e<l.length;e++){let t=l[e];o[e]=Math.round(t*i.scale+i.min)}}else throw Error(`Unsupported dtype in weight '${n}': ${r}`);s+=a*c}else if(r===`string`){let n=v(e.shape);o=[];for(let e=0;e<n;e++){let e=new Uint32Array(t.slice(s,s+4))[0];s+=4;let n=new Uint8Array(t.slice(s,s+e));o.push(n),s+=e}}else{let e=Ci[r];if(r===`float32`)o=new Float32Array(t);else if(r===`int32`)o=new Int32Array(t);else if(r===`bool`)o=new Uint8Array(t);else if(r===`complex64`){o=new Float32Array(t);let e=new Float32Array(o.length/2),n=new Float32Array(o.length/2);for(let t=0;t<e.length;t++)e[t]=o[t*2],n[t]=o[t*2+1];let r=Si(e,i,`float32`),a=Si(n,i,`float32`),s=bi(r,a);return r.dispose(),a.dispose(),s}else throw Error(`Unsupported dtype in weight '${n}': ${r}`);s+=a*e}return Si(o,i,r)}function Li(e){if(e===null)throw Error(`Invalid input value: ${JSON.stringify(e)}`);let t=0,n=[];e.forEach(e=>{if(t+=e.byteLength,n.push(e.byteLength===e.buffer.byteLength?e:new e.constructor(e)),!(e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array))throw Error(`Unsupported TypedArray subtype: ${e.constructor.name}`)});let r=new Uint8Array(t),i=0;return n.forEach(e=>{r.set(new Uint8Array(e.buffer),i),i+=e.byteLength}),r.buffer}const Ri=typeof Buffer<`u`&&(typeof Blob>`u`||typeof atob>`u`||typeof btoa>`u`);function zi(e){return Ri?Buffer.byteLength(e,`utf8`):new Blob([e]).size}function Bi(e){if(Ri)return Buffer.from(e).toString(`base64`);let t=new Uint8Array(e),n=``;for(let e=0,r=t.length;e<r;e++)n+=String.fromCharCode(t[e]);return btoa(n)}function Vi(e){if(Ri){let t=Buffer.from(e,`base64`);return t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength)}let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;++e)n.set([t.charCodeAt(e)],e);return n.buffer}function Hi(e){return wi.join(e)}function Ui(e,t){let n={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:t};return e.signature!=null&&(n.signature=e.signature),e.userDefinedMetadata!=null&&(n.userDefinedMetadata=e.userDefinedMetadata),e.modelInitializer!=null&&(n.modelInitializer=e.modelInitializer),e.initializerSignature!=null&&(n.initializerSignature=e.initializerSignature),e.trainingConfig!=null&&(n.trainingConfig=e.trainingConfig),n}function Wi(e,t,n){let r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy};if(e.trainingConfig!=null&&(r.trainingConfig=e.trainingConfig),e.weightsManifest!=null){if(!t)throw Error(`modelJSON has weightsManifest but weightSpecs is null`);if(!n)throw Error(`modelJSON has weightsManifest but weightData is null`);r.weightSpecs=t,r.weightData=n}return e.signature!=null&&(r.signature=e.signature),e.userDefinedMetadata!=null&&(r.userDefinedMetadata=e.userDefinedMetadata),e.modelInitializer!=null&&(r.modelInitializer=e.modelInitializer),e.initializerSignature!=null&&(r.initializerSignature=e.initializerSignature),r}async function Gi(e,t){let n,r;return e.weightsManifest!=null&&([n,r]=await t(e.weightsManifest)),Wi(e,n,r)}function Ki(e){if(e.modelTopology instanceof ArrayBuffer)throw Error(`Expected JSON model topology, received ArrayBuffer.`);return{dateSaved:/* @__PURE__ */ new Date,modelTopologyType:`JSON`,modelTopologyBytes:e.modelTopology==null?0:zi(JSON.stringify(e.modelTopology)),weightSpecsBytes:e.weightSpecs==null?0:zi(JSON.stringify(e.weightSpecs)),weightDataBytes:e.weightData==null?0:new wi(e.weightData).byteLength}}function qi(e){let t=[];for(let n of e)t.push(...n.weights);return t}function Ji(){let e=e=>{let t=e<<13,n=0;for(;!(t&8388608);)n-=8388608,t<<=1;return t&=-8388609,n+=947912704,t|n},t=/* @__PURE__ */ new Uint32Array(2048);t[0]=0;for(let n=1;n<1024;n++)t[n]=e(n);for(let e=1024;e<2048;e++)t[e]=939524096+(e-1024<<13);return t}function Yi(){let e=/* @__PURE__ */ new Uint32Array(64);e[0]=0,e[31]=1199570944,e[32]=2147483648,e[63]=3347054592;for(let t=1;t<31;t++)e[t]=t<<23;for(let t=33;t<63;t++)e[t]=2147483648+(t-32<<23);return e}function Xi(){let e=/* @__PURE__ */ new Uint32Array(64);for(let t=0;t<64;t++)e[t]=1024;return e[0]=e[32]=0,e}function Zi(){let e=Ji(),t=Yi(),n=Xi();return r=>{let i=/* @__PURE__ */ new ArrayBuffer(4*r.length),a=new Uint32Array(i);for(let i=0;i<r.length;i++){let o=r[i],s=e[n[o>>10]+(o&1023)]+t[o>>10];a[i]=s}return new Float32Array(i)}}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
var Qi=class e{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return e.instance??=new e,e.instance}static registerSaveRouter(t){e.getInstance().saveRouters.push(t)}static registerLoadRouter(t){e.getInstance().loadRouters.push(t)}static getSaveHandlers(t){return e.getHandlers(t,`save`)}static getLoadHandlers(t,n){return e.getHandlers(t,`load`,n)}static getHandlers(t,n,r){let i=[];return(n===`load`?e.getInstance().loadRouters:e.getInstance().saveRouters).forEach(e=>{let n=e(t,r);n!==null&&i.push(n)}),i}};const $i=e=>Qi.getSaveHandlers(e),ea=(e,t)=>Qi.getLoadHandlers(e,t),ta=`tensorflowjs`,na=`models_store`,ra=`model_info_store`
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;function ia(){if(!A().getBool(`IS_BROWSER`))throw Error(`Failed to obtain IndexedDB factory because the current environmentis not a web browser.`);let e=typeof window>`u`?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(t==null)throw Error(`The current browser does not appear to support IndexedDB.`);return t}function aa(e){let t=e.result;t.createObjectStore(na,{keyPath:`modelPath`}),t.createObjectStore(ra,{keyPath:`modelPath`})}var oa=class{constructor(e){if(this.indexedDB=ia(),e==null||!e)throw Error(`For IndexedDB, modelPath must not be null, undefined or empty.`);this.modelPath=e}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error(`BrowserLocalStorage.save() does not support saving model topology in binary formats yet.`);return this.databaseAction(this.modelPath,e)}async load(){return this.databaseAction(this.modelPath)}databaseAction(e,t){return new Promise((e,n)=>{let r=this.indexedDB.open(ta,1);r.onupgradeneeded=()=>aa(r),r.onsuccess=()=>{let i=r.result;if(t==null){let t=i.transaction(na,`readonly`),r=t.objectStore(na).get(this.modelPath);r.onsuccess=()=>{if(r.result==null)return i.close(),n(/* @__PURE__ */ Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));e(r.result.modelArtifacts)},r.onerror=e=>(i.close(),n(r.error)),t.oncomplete=()=>i.close()}else{t.weightData=wi.join(t.weightData);let r=Ki(t),a=i.transaction(ra,`readwrite`),o=a.objectStore(ra),s;try{s=o.put({modelPath:this.modelPath,modelArtifactsInfo:r})}catch(e){return n(e)}let c;s.onsuccess=()=>{c=i.transaction(na,`readwrite`);let s=c.objectStore(na),l;try{l=s.put({modelPath:this.modelPath,modelArtifacts:t,modelArtifactsInfo:r})}catch(e){return n(e)}l.onsuccess=()=>e({modelArtifactsInfo:r}),l.onerror=e=>{o=a.objectStore(ra);let t=o.delete(this.modelPath);t.onsuccess=()=>(i.close(),n(l.error)),t.onerror=e=>(i.close(),n(l.error))}},s.onerror=e=>(i.close(),n(s.error)),a.oncomplete=()=>{c==null?i.close():c.oncomplete=()=>i.close()}}},r.onerror=e=>n(r.error)})}};oa.URL_SCHEME=`indexeddb://`;const sa=e=>A().getBool(`IS_BROWSER`)&&!Array.isArray(e)&&e.startsWith(oa.URL_SCHEME)?ca(e.slice(oa.URL_SCHEME.length)):null;Qi.registerSaveRouter(sa),Qi.registerLoadRouter(sa);function ca(e){return new oa(e)}function la(e){return e.startsWith(oa.URL_SCHEME)?e.slice(oa.URL_SCHEME.length):e}var ua=class{constructor(){this.indexedDB=ia()}async listModels(){return new Promise((e,t)=>{let n=this.indexedDB.open(ta,1);n.onupgradeneeded=()=>aa(n),n.onsuccess=()=>{let r=n.result,i=r.transaction(ra,`readonly`),a=i.objectStore(ra).getAll();a.onsuccess=()=>{let t={};for(let e of a.result)t[e.modelPath]=e.modelArtifactsInfo;e(t)},a.onerror=e=>(r.close(),t(a.error)),i.oncomplete=()=>r.close()},n.onerror=e=>t(n.error)})}async removeModel(e){return e=la(e),new Promise((t,n)=>{let r=this.indexedDB.open(ta,1);r.onupgradeneeded=()=>aa(r),r.onsuccess=()=>{let i=r.result,a=i.transaction(ra,`readwrite`),o=a.objectStore(ra),s=o.get(e),c;s.onsuccess=()=>{if(s.result==null)return i.close(),n(/* @__PURE__ */ Error(`Cannot find model with path '${e}' in IndexedDB.`));{let r=o.delete(e),a=()=>{c=i.transaction(na,`readwrite`);let r=c.objectStore(na).delete(e);r.onsuccess=()=>t(s.result.modelArtifactsInfo),r.onerror=e=>n(s.error)};r.onsuccess=a,r.onerror=e=>(a(),i.close(),n(s.error))}},s.onerror=e=>(i.close(),n(s.error)),a.oncomplete=()=>{c==null?i.close():c.oncomplete=()=>i.close()}},r.onerror=e=>n(r.error)})}};
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const da=`tensorflowjs_models`;function fa(e){return{info:[da,e,`info`].join(`/`),topology:[da,e,`model_topology`].join(`/`),weightSpecs:[da,e,`weight_specs`].join(`/`),weightData:[da,e,`weight_data`].join(`/`),modelMetadata:[da,e,`model_metadata`].join(`/`)}}function pa(e){for(let t of Object.values(e))window.localStorage.removeItem(t)}function ma(e){let t=e.split(`/`);if(t.length<3)throw Error(`Invalid key format: ${e}`);return t.slice(1,t.length-1).join(`/`)}function ha(e){return e.startsWith(ga.URL_SCHEME)?e.slice(ga.URL_SCHEME.length):e}var ga=class{constructor(e){if(!A().getBool(`IS_BROWSER`)||typeof window>`u`||window.localStorage===void 0)throw Error(`The current environment does not support local storage.`);if(this.LS=window.localStorage,e==null||!e)throw Error(`For local storage, modelPath must not be null, undefined or empty.`);this.modelPath=e,this.keys=fa(this.modelPath)}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error(`BrowserLocalStorage.save() does not support saving model topology in binary formats yet.`);{let t=JSON.stringify(e.modelTopology),n=JSON.stringify(e.weightSpecs),r=Ki(e),i=wi.join(e.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(r)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,n),this.LS.setItem(this.keys.weightData,Bi(i));let a={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:e.signature==null?void 0:e.signature,userDefinedMetadata:e.userDefinedMetadata==null?void 0:e.userDefinedMetadata,modelInitializer:e.modelInitializer==null?void 0:e.modelInitializer,initializerSignature:e.initializerSignature==null?void 0:e.initializerSignature,trainingConfig:e.trainingConfig==null?void 0:e.trainingConfig};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(a)),{modelArtifactsInfo:r}}catch{throw pa(this.keys),Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${r.modelTopologyBytes}, weightSpecsBytes=${r.weightSpecsBytes}, weightDataBytes=${r.weightDataBytes}.`)}}}async load(){let e=JSON.parse(this.LS.getItem(this.keys.info));if(e==null)throw Error(`In local storage, there is no model with name '${this.modelPath}'`);if(e.modelTopologyType!==`JSON`)throw Error(`BrowserLocalStorage does not support loading non-JSON model topology yet.`);let t={},n=JSON.parse(this.LS.getItem(this.keys.topology));if(n==null)throw Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);t.modelTopology=n;let r=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(r==null)throw Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);t.weightSpecs=r;let i=this.LS.getItem(this.keys.modelMetadata);if(i!=null){let e=JSON.parse(i);t.format=e.format,t.generatedBy=e.generatedBy,t.convertedBy=e.convertedBy,e.signature!=null&&(t.signature=e.signature),e.userDefinedMetadata!=null&&(t.userDefinedMetadata=e.userDefinedMetadata),e.modelInitializer!=null&&(t.modelInitializer=e.modelInitializer),e.initializerSignature!=null&&(t.initializerSignature=e.initializerSignature),e.trainingConfig!=null&&(t.trainingConfig=e.trainingConfig)}let a=this.LS.getItem(this.keys.weightData);if(a==null)throw Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return t.weightData=Vi(a),t}};ga.URL_SCHEME=`localstorage://`;const _a=e=>A().getBool(`IS_BROWSER`)&&!Array.isArray(e)&&e.startsWith(ga.URL_SCHEME)?va(e.slice(ga.URL_SCHEME.length)):null;Qi.registerSaveRouter(_a),Qi.registerLoadRouter(_a);function va(e){return new ga(e)}var ya=class{constructor(){h(A().getBool(`IS_BROWSER`),()=>`Current environment is not a web browser`),h(typeof window>`u`||window.localStorage!==void 0,()=>`Current browser does not appear to support localStorage`),this.LS=window.localStorage}async listModels(){let e={};for(let t=0;t<this.LS.length;++t){let n=this.LS.key(t);if(n.startsWith(`tensorflowjs_models/`)&&n.endsWith(`/info`)){let t=ma(n);e[t]=JSON.parse(this.LS.getItem(n))}}return e}async removeModel(e){e=ha(e);let t=fa(e);if(this.LS.getItem(t.info)==null)throw Error(`Cannot find model at path '${e}'`);let n=JSON.parse(this.LS.getItem(t.info));return pa(t),n}},ba=class e{constructor(){
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
this.managers={}}static getInstance(){return e.instance??=new e,e.instance}static registerManager(t,n){h(t!=null,()=>`scheme must not be undefined or null.`),t.endsWith(`://`)&&(t=t.slice(0,t.indexOf(`://`))),h(t.length>0,()=>`scheme must not be an empty string.`);let r=e.getInstance();h(r.managers[t]==null,()=>`A model store manager is already registered for scheme '${t}'.`),r.managers[t]=n}static getManager(t){let n=e.getInstance().managers[t];if(n==null)throw Error(`Cannot find model manager for scheme '${t}'`);return n}static getSchemes(){return Object.keys(e.getInstance().managers)}},xa=class{constructor(){
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
this.messageName=`setTimeoutCustom`,this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(e,t){return fetch(e,t)}now(){return performance.now()}encode(e,t){if(t!==`utf-8`&&t!==`utf8`)throw Error(`Browser's encoder only supports utf-8, but got ${t}`);return this.textEncoder??=new TextEncoder,this.textEncoder.encode(e)}decode(e,t){return new TextDecoder(t).decode(e)}setTimeoutCustom(e,t){typeof window>`u`||!A().getBool(`USE_SETTIMEOUTCUSTOM`)?setTimeout(e,t):(this.functionRefs.push(e),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},`*`)},t),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener(`message`,e=>{if(e.source===window&&e.data.name===this.messageName){e.stopPropagation();let t=this.functionRefs[e.data.index];t(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0)))}isTypedArray(e){return nr(e)}};if(A().get(`IS_BROWSER`)){A().setPlatform(`browser`,new xa);try{ba.registerManager(ga.URL_SCHEME,new ya)}catch{}try{ba.registerManager(oa.URL_SCHEME,new ua)}catch{}}var Sa=/* @__PURE__ */ o(((e,t)=>{t.exports={}}));
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const Ca={importFetch:()=>Sa()};let wa;var Ta=class{constructor(){this.util=Sa(),this.textEncoder=new this.util.TextEncoder}fetch(e,t){return A().global.fetch==null?(wa??=Ca.importFetch(),wa(e,t)):A().global.fetch(e,t)}now(){let e=process.hrtime();return e[0]*1e3+e[1]/1e6}encode(e,t){if(t!==`utf-8`&&t!==`utf8`)throw Error(`Node built-in encoder only supports utf-8, but got ${t}`);return this.textEncoder.encode(e)}decode(e,t){return e.length===0?``:new this.util.TextDecoder(t).decode(e)}isTypedArray(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)}};A().get(`IS_NODE`)&&!A().get(`IS_BROWSER`)&&A().setPlatform(`node`,new Ta);
/**
* @license
* Copyright 2020 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function I(e,t=`float32`,n){return t||=`float32`,me(e),new Br(e,t,n)}
/**
* @license
* Copyright 2020 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ea(e,t){let n=M(e,`x`,`cast`);if(!O(t))throw Error(`Failed to cast to unknown dtype ${t}`);if(t===`string`&&n.dtype!==`string`||t!==`string`&&n.dtype===`string`)throw Error(`Only strings can be casted to strings`);let r={x:n},i={dtype:t};return j.runKernel(qe,r,i)}const L=/* @__PURE__ */ N({cast_:Ea});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Da(e){let t={x:M(e,`x`,`clone`,`string_or_numeric`)};return j.runKernel(At,t)}const Oa=/* @__PURE__ */ N({clone_:Da});
/**
* @license
* Copyright 2020 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ka(e,t=!1){console.log(e.toString(t))}
/**
* @license
* Copyright 2020 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
di(),Wr({buffer:I,cast:L,clone:Oa,print:ka});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Aa(e,t){let n=M(e,`a`,`add`),r=M(t,`b`,`add`);[n,r]=ri(n,r);let i={a:n,b:r};return j.runKernel(`Add`,i)}const R=/* @__PURE__ */ N({add_:Aa});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ja(e,t){let n=M(e,`a`,`floorDiv`),r=M(t,`b`,`floorDiv`);[n,r]=ri(n,r);let i={a:n,b:r};return j.runKernel(Tt,i)}const Ma=/* @__PURE__ */ N({floorDiv_:ja});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Na(e,t){let n=M(e,`a`,`div`),r=M(t,`b`,`div`);if([n,r]=ri(n,r),n.dtype===`int32`&&r.dtype===`int32`)return Ma(n,r);let i={a:n,b:r};return j.runKernel(gt,i,{})}const z=/* @__PURE__ */ N({div_:Na});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Pa(e,t){let n=M(e,`a`,`mul`),r=M(t,`b`,`mul`);[n,r]=ri(n,r);let i={a:n,b:r};return j.runKernel(Zt,i)}const B=/* @__PURE__ */ N({mul_:Pa});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Fa(e){let t=M(e,`x`,`abs`);if(t.dtype===`complex64`){let e={x:t};return j.runKernel(Ze,e)}{let e={x:t};return j.runKernel(`Abs`,e)}}const Ia=/* @__PURE__ */ N({abs_:Fa});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function La(e,t=null,n=!1){let r={x:M(e,`x`,`all`,`bool`)},i={axis:t,keepDims:n};return j.runKernel(`All`,r,i)}const Ra=/* @__PURE__ */ N({all_:La});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function za(e,t=null,n=!1){let r={x:M(e,`x`,`any`,`bool`)},i={axis:t,keepDims:n};return j.runKernel(`Any`,r,i)}const Ba=/* @__PURE__ */ N({any_:za});
/**
* @license
* Copyright 2020 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Va(e,t=0){let n={x:M(e,`x`,`argMax`)},r={axis:t};return j.runKernel(Me,n,r)}const Ha=/* @__PURE__ */ N({argMax_:Va});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ua(e,t,n,r,i=`NHWC`,a){let o=e[3];return Ka(e,[...t,o],n,a,r,null,null,oo(i))}function Wa(e,t,n,r,i,a,o=`channelsLast`){let[s,c]=Za(t),l;if(o===`channelsLast`)l=[s,c,e[3],e[3]];else if(o===`channelsFirst`)l=[s,c,e[1],e[1]];else throw Error(`Unknown dataFormat ${o}`);return Ka(e,l,n,r,i,a,!1,o)}function Ga(e,t,n,r,i,a,o=`NDHWC`){let[s,c,l]=Qa(t),u,d;if(o===`NDHWC`)d=`channelsLast`,u=[s,c,l,e[4],e[4]];else if(o===`NCDHW`)d=`channelsFirst`,u=[s,c,l,e[1],e[1]];else throw Error(`Unknown dataFormat ${o}`);return qa(e,u,n,r,i,!1,d,a)}function Ka(e,t,n,r,i,a,o=!1,s=`channelsLast`){let[c,l,u,d]=[-1,-1,-1,-1];if(s===`channelsLast`)[c,l,u,d]=e;else if(s===`channelsFirst`)[c,d,l,u]=e;else throw Error(`Unknown dataFormat ${s}`);let[f,p,,m]=t,[h,g]=Za(n),[_,v]=Za(r),y=$a(f,_),b=$a(p,v),{padInfo:x,outHeight:S,outWidth:C}=eo(i,l,u,h,g,y,b,a,s),w=o?m*d:m,T;return s===`channelsFirst`?T=[c,w,S,C]:s===`channelsLast`&&(T=[c,S,C,w]),{batchSize:c,dataFormat:s,inHeight:l,inWidth:u,inChannels:d,outHeight:S,outWidth:C,outChannels:w,padInfo:x,strideHeight:h,strideWidth:g,filterHeight:f,filterWidth:p,effectiveFilterHeight:y,effectiveFilterWidth:b,dilationHeight:_,dilationWidth:v,inShape:e,outShape:T,filterShape:t}}function qa(e,t,n,r,i,a=!1,o=`channelsLast`,s){let[c,l,u,d,f]=[-1,-1,-1,-1,-1];if(o===`channelsLast`)[c,l,u,d,f]=e;else if(o===`channelsFirst`)[c,f,l,u,d]=e;else throw Error(`Unknown dataFormat ${o}`);let[p,m,h,,g]=t,[_,v,y]=Qa(n),[b,x,S]=Qa(r),C=$a(p,b),w=$a(m,x),T=$a(h,S),{padInfo:E,outDepth:D,outHeight:O,outWidth:ee}=to(i,l,u,d,_,v,y,C,w,T,s),te=a?g*f:g,ne;return o===`channelsFirst`?ne=[c,te,D,O,ee]:o===`channelsLast`&&(ne=[c,D,O,ee,te]),{batchSize:c,dataFormat:o,inDepth:l,inHeight:u,inWidth:d,inChannels:f,outDepth:D,outHeight:O,outWidth:ee,outChannels:te,padInfo:E,strideDepth:_,strideHeight:v,strideWidth:y,filterDepth:p,filterHeight:m,filterWidth:h,effectiveFilterDepth:C,effectiveFilterHeight:w,effectiveFilterWidth:T,dilationDepth:b,dilationHeight:x,dilationWidth:S,inShape:e,outShape:ne,filterShape:t}}function Ja(e,t,n,r,i){r??=Xa(e,t,n);let a=e[0],o=e[1];return[no((a-t+2*r)/n+1,i),no((o-t+2*r)/n+1,i)]}function Ya(e,t,n,r,i,a){i??=Xa(e,t[0],r[0]);let o=[0,0,0,n];for(let n=0;n<3;n++)e[n]+2*i>=t[n]&&(o[n]=no((e[n]-t[n]+2*i)/r[n]+1,a));return o}function Xa(e,t,n,r=1){let i=$a(t,r);return Math.floor((e[0]*(n-1)-n+i)/2)}function Za(e){return typeof e==`number`?[e,e,e]:e.length===2?[e[0],e[1],1]:e}function Qa(e){return typeof e==`number`?[e,e,e]:e}function $a(e,t){return t<=1?e:e+(e-1)*(t-1)}function eo(e,t,n,r,i,a,o,s,c){let l,u,d;if(typeof e==`number`){l={top:e,bottom:e,left:e,right:e,type:e===0?`VALID`:`NUMBER`};let i=Ja([t,n],a,r,e,s);u=i[0],d=i[1]}else if(e===`same`){u=Math.ceil(t/r),d=Math.ceil(n/i);let e=Math.max(0,(u-1)*r+a-t),s=Math.max(0,(d-1)*i+o-n),c=Math.floor(e/2),f=e-c,p=Math.floor(s/2);l={top:c,bottom:f,left:p,right:s-p,type:`SAME`}}else if(e===`valid`)l={top:0,bottom:0,left:0,right:0,type:`VALID`},u=Math.ceil((t-a+1)/r),d=Math.ceil((n-o+1)/i);else if(typeof e==`object`){let f=c===`channelsLast`?e[1][0]:e[2][0],p=c===`channelsLast`?e[1][1]:e[2][1],m=c===`channelsLast`?e[2][0]:e[3][0],h=c===`channelsLast`?e[2][1]:e[3][1];l={top:f,bottom:p,left:m,right:h,type:f===0&&p===0&&m===0&&h===0?`VALID`:`EXPLICIT`},u=no((t-a+f+p)/r+1,s),d=no((n-o+m+h)/i+1,s)}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:l,outHeight:u,outWidth:d}}function to(e,t,n,r,i,a,o,s,c,l,u){let d,f,p,m;if(e===`valid`&&(e=0),typeof e==`number`){d={top:e,bottom:e,left:e,right:e,front:e,back:e,type:e===0?`VALID`:`NUMBER`};let h=Ya([t,n,r,1],[s,c,l],1,[i,a,o],e,u);f=h[0],p=h[1],m=h[2]}else if(e===`same`){f=Math.ceil(t/i),p=Math.ceil(n/a),m=Math.ceil(r/o);let e=(f-1)*i+s-t,u=(p-1)*a+c-n,h=(m-1)*o+l-r,g=Math.floor(e/2),_=e-g,v=Math.floor(u/2),y=u-v,b=Math.floor(h/2);d={top:v,bottom:y,left:b,right:h-b,front:g,back:_,type:`SAME`}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:f,outHeight:p,outWidth:m}}function no(e,t){if(!t)return Math.trunc(e);switch(t){case`round`:return Math.round(e);case`ceil`:return Math.ceil(e);case`floor`:return Math.floor(e);default:throw Error(`Unknown roundingMode ${t}`)}}function ro(e){let[t,n,r]=Za(e);return t===1&&n===1&&r===1}function io(e,t){return ro(e)||ro(t)}function ao(e){return Za(e).every(e=>e>0)}function oo(e){if(e===`NHWC`)return`channelsLast`;if(e===`NCHW`)return`channelsFirst`;throw Error(`Unknown dataFormat ${e}`)}function so(e,t,n){if(n!=null){if(typeof t==`string`)throw Error(`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);if(typeof t==`number`)h(b(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);else if(typeof t==`object`)t.forEach(t=>{t.forEach(t=>{h(b(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`)})});else throw Error(`Error in ${e}: Unknown padding parameter: ${t}`)}}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function co(e,t){let n={x:M(e,`x`,`reshape`,`string_or_numeric`)},r={shape:t};return j.runKernel(pn,n,r)}const V=/* @__PURE__ */ N({reshape_:co});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function lo(e,t,n,r,i){let a=M(e,`x`,`avgPool`,`float32`);h(io(n,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${n} and dilations '1'`);let o=a,s=!1;a.rank===3&&(s=!0,o=V(a,[1,a.shape[0],a.shape[1],a.shape[2]])),h(o.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${o.rank}.`),so(`avgPool`,r,i);let c={x:o},l={filterSize:t,strides:n,pad:r,dimRoundingMode:i},u=j.runKernel(ze,c,l);return u=L(u,a.dtype),s?V(u,[u.shape[1],u.shape[2],u.shape[3]]):u}const uo=/* @__PURE__ */ N({avgPool_:lo});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function fo(e,t,n,r,i,a=`NDHWC`){let o=M(e,`x`,`avgPool3d`,`float32`),s=o,c=!1;o.rank===4&&(c=!0,s=V(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),h(s.rank===5,()=>`Error in avgPool3d: x must be rank 5 but got rank ${s.rank}.`),h(a===`NDHWC`,()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${a}`),h(typeof n==`number`&&n>0||Array.isArray(n)&&n[0]>0&&n[1]>0&&n[2]>0,()=>`Error in avgPool3d: Stride must be > 0, but got '${n}'`),so(`avgPool3d`,r,i);let l={x:s},u={filterSize:t,strides:n,pad:r,dimRoundingMode:i,dataFormat:a},d=j.runKernel(Ve,l,u);return d=L(d,s.dtype),c?V(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}const po=/* @__PURE__ */ N({avgPool3d_:fo});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function mo(e,t=0){h(e.length>=1,()=>`Pass at least one tensor to concat`);let n=vi(e,`tensors`,`concat`,`string_or_numeric`);if(n[0].dtype===`complex64`&&n.forEach(e=>{if(e.dtype!==`complex64`)throw Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${e.dtype}. `)}),n.length===1)return Oa(n[0]);let r=n,i={axis:t};return j.runKernel(Qe,r,i)}const ho=/* @__PURE__ */ N({concat_:mo});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function go(e,t,n=!1,r=!1){let i=M(e,`a`,`matMul`),a=M(t,`b`,`matMul`);[i,a]=ri(i,a);let o={a:i,b:a},s={transposeA:n,transposeB:r};return j.runKernel(Ue,o,s)}const _o=/* @__PURE__ */ N({matMul_:go});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function vo(e){let t={x:M(e,`x`,`sigmoid`,`float32`)};return j.runKernel(Dn,t)}const yo=/* @__PURE__ */ N({sigmoid_:vo});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function bo(e,t,n){let r=M(e,`x`,`slice`,`string_or_numeric`);if(r.rank===0)throw Error(`Slicing scalar is not possible`);let i={x:r},a={begin:t,size:n};return j.runKernel(wn,i,a)}const xo=/* @__PURE__ */ N({slice_:bo});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function So(e){let t={x:M(e,`x`,`tanh`,`float32`)};return j.runKernel(In,t)}const Co=/* @__PURE__ */ N({tanh_:So});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function wo(e,t,n){let r=M(e,`x`,`batchToSpaceND`),i=t.reduce((e,t)=>e*t);h(r.rank>=1+t.length,()=>`input rank is ${r.rank} but should be > than blockShape.length ${t.length}`),h(n.length===t.length,()=>`crops.length is ${n.length} but should be equal to blockShape.length  ${t.length}`),h(r.shape[0]%i===0,()=>`input tensor batch is ${r.shape[0]} but is not divisible by the product of the elements of blockShape ${t.join(` * `)} === ${i}`);let a={x:r},o={blockShape:t,crops:n};return j.runKernel(We,a,o)}const To=/* @__PURE__ */ N({batchToSpaceND_:wo});function Eo(e){let t;return t=e.rank===0||e.rank===1?V(e,[1,1,1,e.size]):e.rank===2?V(e,[1,1,e.shape[0],e.shape[1]]):e.rank===3?V(e,[1,e.shape[0],e.shape[1],e.shape[2]]):e,t}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Do(e,t,n,r,i,a){a??=.001;let o=M(e,`x`,`batchNorm`),s=M(t,`mean`,`batchNorm`),c=M(n,`variance`,`batchNorm`),l;i!=null&&(l=M(i,`scale`,`batchNorm`));let u;r!=null&&(u=M(r,`offset`,`batchNorm`)),h(s.rank===c.rank,()=>`Batch normalization gradient requires mean and variance to have equal ranks.`),h(u==null||s.rank===u.rank,()=>`Batch normalization gradient requires mean and offset to have equal ranks.`),h(l==null||s.rank===l.rank,()=>`Batch normalization gradient requires mean and scale to have equal ranks.`);let d={x:Eo(o),scale:l,offset:u,mean:s,variance:c},f={varianceEpsilon:a},p=j.runKernel(Et,d,f);return V(p,o.shape)}const Oo=/* @__PURE__ */ N({batchNorm_:Do});function ko(e,t,n,r,i,a){let o=M(e,`x`,`batchNorm`),s=M(t,`mean`,`batchNorm`),c=M(n,`variance`,`batchNorm`),l;i!=null&&(l=M(i,`scale`,`batchNorm`));let u;return r!=null&&(u=M(r,`offset`,`batchNorm`)),h(o.rank===2,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${o.rank}.`),h(s.rank===2||s.rank===1,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${s.rank}.`),h(c.rank===2||c.rank===1,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${c.rank}.`),l!=null&&h(l.rank===2||l.rank===1,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${l.rank}.`),u!=null&&h(u.rank===2||u.rank===1,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${u.rank}.`),Oo(o,s,c,u,l,a)}const Ao=/* @__PURE__ */ N({batchNorm2d_:ko});function jo(e,t,n,r,i,a){let o=M(e,`x`,`batchNorm`),s=M(t,`mean`,`batchNorm`),c=M(n,`variance`,`batchNorm`),l;i!=null&&(l=M(i,`scale`,`batchNorm`));let u;return r!=null&&(u=M(r,`offset`,`batchNorm`)),h(o.rank===3,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${o.rank}.`),h(s.rank===3||s.rank===1,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${s.rank}.`),h(c.rank===3||c.rank===1,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${c.rank}.`),l!=null&&h(l.rank===3||l.rank===1,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${l.rank}.`),u!=null&&h(u.rank===3||u.rank===1,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${u.rank}.`),Oo(o,s,c,u,l,a)}const Mo=/* @__PURE__ */ N({batchNorm3d_:jo});function No(e,t,n,r,i,a){let o=M(e,`x`,`batchNorm`),s=M(t,`mean`,`batchNorm`),c=M(n,`variance`,`batchNorm`),l;i!=null&&(l=M(i,`scale`,`batchNorm`));let u;return r!=null&&(u=M(r,`offset`,`batchNorm`)),h(o.rank===4,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${o.rank}.`),h(s.rank===4||s.rank===1,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${s.rank}.`),h(c.rank===4||c.rank===1,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${c.rank}.`),l!=null&&h(l.rank===4||l.rank===1,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${l.rank}.`),u!=null&&h(u.rank===4||u.rank===1,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${u.rank}.`),Oo(o,s,c,u,l,a)}const Po=/* @__PURE__ */ N({batchNorm4d_:No});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Fo(e,t,n){let r=M(e,`x`,`bincount`),i=M(t,`weights`,`bincount`);h(r.dtype===`int32`,()=>`Error in bincount: input dtype must be int32, but got ${r.dtype}`),h(n>=0,()=>`size must be non-negative, but got ${n}.`),h(i.size===r.size||i.size===0,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${r.shape}, weights shape: ${i.shape}.`);let a={x:r,weights:i},o={size:n};return j.runKernel(Ge,a,o)}const Io=/* @__PURE__ */ N({bincount_:Fo});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Lo(e,t){let n=M(e,`broadcastTo`,`x`),r=n.shape;if(me(t),t.length<n.rank)throw Error(`broadcastTo(): shape.length=${t.length} < input.rank=${n.rank}.`);if(t.length>n.rank){let e=n.shape.slice();for(;e.length<t.length;)e.unshift(1);n=V(n,e)}let i=n.shape,a=Array.from(t);for(let e=t.length-1;e>=0;e--)if(i[e]===t[e])a[e]=1;else if(n.shape[e]!==1)throw Error(`broadcastTo(): [${r}] cannot be broadcast to [${t}].`);if(a.map((e,t)=>e>1?t:-1).filter(e=>e>=0).length===0)return Oa(n);let o={x:n},s={reps:a};return j.runKernel(Ln,o,s)}const Ro=/* @__PURE__ */ N({broadcastTo_:Lo});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function zo(e,t,n){me(e),n||=oe(t);let r={shape:e,value:t,dtype:n};return j.runKernel(St,{},r)}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Bo(e,t,n){let r=M(e,`x`,`clipByValue`);if(h(t<=n,()=>`Error in clip: min (${t}) must be less than or equal to max (${n}).`),t===n)return zo(r.shape,t,r.dtype);let i={x:r},a={clipValueMin:t,clipValueMax:n};return j.runKernel(Ye,i,a)}const Vo=/* @__PURE__ */ N({clipByValue_:Bo});function Ho(e){return ho(e,0)}const Uo=/* @__PURE__ */ N({concat1d_:Ho});function Wo(e,t){return ho(e,t)}const Go=/* @__PURE__ */ N({concat2d_:Wo});function Ko(e,t){return ho(e,t)}const qo=/* @__PURE__ */ N({concat3d_:Ko});function Jo(e,t){return ho(e,t)}const Yo=/* @__PURE__ */ N({concat4d_:Jo});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Xo(e,t,n,r,i=`NHWC`,a=[1,1],o){let s=M(e,`x`,`conv2d`,`float32`),c=M(t,`filter`,`conv2d`,`float32`),l=s,u=!1;s.rank===3&&(u=!0,l=V(s,[1,s.shape[0],s.shape[1],s.shape[2]])),h(l.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${l.rank}.`),h(c.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${c.rank}.`),so(`conv2d`,r,o);let d=i===`NHWC`?l.shape[3]:l.shape[1];h(d===c.shape[2],()=>`Error in conv2d: depth of input (${d}) must match input depth for filter ${c.shape[2]}.`),h(io(n,a),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),h(ao(a),()=>`Error in conv2D: Dilated rates should be larger than 0.`),h(ao(n),()=>`Error in conv2D: Strides should be larger than 0.`);let f={x:l,filter:c},p={strides:n,pad:r,dataFormat:i,dilations:a,dimRoundingMode:o},m=j.runKernel($e,f,p);return u?V(m,[m.shape[1],m.shape[2],m.shape[3]]):m}const Zo=/* @__PURE__ */ N({conv2d_:Xo});function Qo(e,t,n,r,i=`NWC`,a=1,o){let s=M(e,`x`,`conv1d`),c=M(t,`filter`,`conv1d`),l=s,u=!1;s.rank===2&&(u=!0,l=V(s,[1,s.shape[0],s.shape[1]])),h(l.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${l.rank}.`),h(c.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${c.rank}.`),so(`conv1d`,r,o),h(l.shape[2]===c.shape[1],()=>`Error in conv1d: depth of input (${l.shape[2]}) must match input depth for filter ${c.shape[1]}.`),h(io(n,a),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${n} and dilation '${a}'`),h(ao(a),()=>`Error in conv1D: Dilated rates should be larger than 0.`),h(ao(n),()=>`Error in conv1D: Stride should be larger than 0.`),h(i===`NWC`,()=>`Error in conv1d: got dataFormat of ${i} but only NWC is currently supported.`);let d=V(c,[1,c.shape[0],c.shape[1],c.shape[2]]),f=V(l,[l.shape[0],1,l.shape[1],l.shape[2]]),p=Zo(f,d,[1,n],r,`NHWC`,[1,a],o);return u?V(p,[p.shape[2],p.shape[3]]):V(p,[p.shape[0],p.shape[2],p.shape[3]])}const $o=/* @__PURE__ */ N({conv1d_:Qo});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function es(e,t,n,r,i,a=`NHWC`,o){h(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let s=e,c=t,l=!1;t.rank===3&&(l=!0,c=V(t,[1,t.shape[0],t.shape[1],t.shape[2]]),s=[1,e[0],e[1],e[2]]),h(s.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${s.length}.`),h(c.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${c.rank}`),h(n.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${n.rank}`);let u=a===`NHWC`?s[3]:s[1],d=a===`NHWC`?c.shape[3]:c.shape[1];h(u===n.shape[2],()=>`Error in conv2dDerInput: depth of input (${u}) must match input depth for filter ${n.shape[2]}.`),h(d===n.shape[3],()=>`Error in conv2dDerInput: depth of output (${d}) must match output depth for filter ${n.shape[3]}.`),so(`conv2dDerInput`,i,o);let f={dy:c,filter:n},p={strides:r,pad:i,dataFormat:a,dimRoundingMode:o,inputShape:s},m=j.runKernel(tt,f,p);return l?V(m,[m.shape[1],m.shape[2],m.shape[3]]):m}const ts=/* @__PURE__ */ N({conv2DBackpropInput_:es});function ns(e,t,n,r,i,a){let o=M(e,`x`,`conv2dTranspose`),s=M(t,`filter`,`conv2dTranspose`);return ts(n,o,s,r,i,`NHWC`,a)}const rs=/* @__PURE__ */ N({conv2dTranspose_:ns});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function is(e,t,n,r,i=`NDHWC`,a=[1,1,1]){let o=M(e,`x`,`conv3d`),s=M(t,`filter`,`conv3d`),c=o,l=!1;o.rank===4&&(l=!0,c=V(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),h(c.rank===5,()=>`Error in conv3d: input must be rank 5, but got rank ${c.rank}.`),h(s.rank===5,()=>`Error in conv3d: filter must be rank 5, but got rank ${s.rank}.`),h(c.shape[4]===s.shape[3],()=>`Error in conv3d: depth of input (${c.shape[4]}) must match input depth for filter ${s.shape[3]}.`),h(io(n,a),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),h(i===`NDHWC`,()=>`Error in conv3d: got dataFormat of ${i} but only NDHWC is currently supported.`),h(ao(a),()=>`Error in conv3D: Dilated rates should be larger than 0.`),h(ao(n),()=>`Error in conv3D: Strides should be larger than 0.`);let u={x:c,filter:s},d={strides:n,pad:r,dataFormat:i,dilations:a},f=j.runKernel(nt,u,d);return l?V(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}const as=/* @__PURE__ */ N({conv3d_:is});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function os(e,t,n,r,i){h(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let a=e,o=t,s=!1;t.rank===4&&(s=!0,o=V(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),a=[1,e[0],e[1],e[2],e[3]]);let c=a[4],l=o.shape[4];h(a.length===5,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${a.length}.`),h(o.rank===5,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${o.rank}`),h(n.rank===5,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${n.rank}`),h(c===n.shape[3],()=>`Error in conv3dDerInput: depth of input (${c}) must match input depth for filter ${n.shape[3]}.`),h(l===n.shape[4],()=>`Error in conv3dDerInput: depth of output (${l}) must match output depth for filter ${n.shape[4]}.`);let u={dy:o,filter:n},d={pad:i,strides:r,inputShape:a},f=j.runKernel(it,u,d);return s?V(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}const ss=/* @__PURE__ */ N({conv3DBackpropInput_:os});function cs(e,t,n,r,i){let a=M(e,`x`,`conv3dTranspose`),o=M(t,`filter`,`conv3dTranspose`);return ss(n,a,o,r,i)}const ls=/* @__PURE__ */ N({conv3dTranspose_:cs});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function us(e){let t={x:M(e,`x`,`cos`,`float32`)};return j.runKernel(`Cos`,t)}const ds=/* @__PURE__ */ N({cos_:us});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function fs(e){let t={x:M(e,`x`,`cosh`,`float32`)};return j.runKernel(at,t)}const ps=/* @__PURE__ */ N({cosh_:fs});
/**
* @license
* Copyright 2022 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the 'License');
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an 'AS IS' BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ms(e,t=0,n=!1,r=!1){let i={x:M(e,`x`,`cumprod`)},a={axis:t,exclusive:n,reverse:r};return j.runKernel(ot,i,a)}const hs=/* @__PURE__ */ N({cumprod_:ms});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function gs(e,t=0,n=!1,r=!1){let i={x:M(e,`x`,`cumsum`)},a={axis:t,exclusive:n,reverse:r};return j.runKernel(st,i,a)}const _s=/* @__PURE__ */ N({cumsum_:gs});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function vs(e,t,n,r=!1){let i=M(e,`x`,`denseBincount`),a=M(t,`weights`,`denseBincount`);h(i.dtype===`int32`,()=>`Error in denseBincount: input dtype must be int32, but got ${i.dtype}`),h(i.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${i.rank}.`),h(n>=0,()=>`size must be non-negative, but got ${n}.`),h(a.size===i.size||a.size===0,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${i.shape}, weights shape: ${a.shape}.`);let o={x:i,weights:a},s={size:n,binaryOutput:r};return j.runKernel(lt,o,s)}const ys=/* @__PURE__ */ N({denseBincount_:vs});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function bs(e,t,n,r,i=`NHWC`,a=[1,1],o){let s=M(e,`x`,`depthwiseConv2d`,`float32`),c=M(t,`filter`,`depthwiseConv2d`,`float32`),l=s,u=!1;s.rank===3&&(u=!0,l=V(s,[1,s.shape[0],s.shape[1],s.shape[2]])),h(l.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${l.rank}.`),h(c.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${c.rank}.`);let d=i===`NHWC`?l.shape[3]:l.shape[1];h(d===c.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${d}) must match the inChannels dimension in filter ${c.shape[2]}.`),so(`depthwiseConv2d`,r,o);let f={x:l,filter:c},p={strides:n,pad:r,dataFormat:i,dilations:a,dimRoundingMode:o},m=j.runKernel(ut,f,p);return u?V(m,[m.shape[1],m.shape[2],m.shape[3]]):m}const xs=/* @__PURE__ */ N({depthwiseConv2d_:bs});
/**
* @license
* Copyright 2017 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ss(e,t){let n=e.length,r=[];for(let i=0;i<n;i++){let a=n-1-i,o=e[a]||1;(t[t.length-1-i]||1)>1&&o===1&&r.unshift(a)}return r}function Cs(e,t){let n=[];for(let r=0;r<t.length;r++){let i=e[e.length-r-1],a=t.length-r-1,o=t[a];(i==null||i===1&&o>1)&&n.unshift(a)}return n}function ws(e,t){let n=Math.max(e.length,t.length),r=Array(n);for(let i=0;i<n;i++){let a=e[e.length-i-1];a??=1;let o=t[t.length-i-1];if(o??=1,a===1)r[n-i-1]=o;else if(o===1)r[n-i-1]=a;else if(a!==o){let n=`Operands could not be broadcast together with shapes ${e} and ${t}.`;throw Error(n)}else r[n-i-1]=a}return r}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ts(e,t){let n=M(e,`a`,`equal`,`string_or_numeric`),r=M(t,`b`,`equal`,`string_or_numeric`);[n,r]=ri(n,r),ws(n.shape,r.shape);let i={a:n,b:r};return j.runKernel(yt,i)}const Es=/* @__PURE__ */ N({equal_:Ts});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ds(e,t,n){let r=M(t,`a`,`where`),i=M(n,`b`,`where`),a=M(e,`condition`,`where`,`bool`),o=ws(ws(a.shape,r.shape),i.shape),s={condition:Ro(a,o),t:Ro(r,o),e:Ro(i,o)};return j.runKernel(Sn,s)}const Os=/* @__PURE__ */ N({where_:Ds});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ks(e){let t={x:M(e,`x`,`zerosLike`)};return j.runKernel(Hn,t)}const H=/* @__PURE__ */ N({zerosLike_:ks});
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function As(e,...t){let n=t.map((e,t)=>M(e,`tensors${t}`,`einsum`)),r={equation:e};return j.runKernel(_t,n,r)}const js=/* @__PURE__ */ N({einsum_:As});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ms(e){let t={x:M(e,`x`,`elu`,`float32`)};return j.runKernel(`Elu`,t)}const Ns=/* @__PURE__ */ N({elu_:Ms});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ps(e){let t=M(e,`x`,`erf`);h(t.dtype===`int32`||t.dtype===`float32`,()=>"Input dtype must be `int32` or `float32`."),t.dtype===`int32`&&(t=L(t,`float32`));let n={x:t};return j.runKernel(`Erf`,n)}const Fs=/* @__PURE__ */ N({erf_:Ps});
/**
* @license
* Copyright 2017 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Is(e,t){for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0}function Ls(e,t,n){let r=e.length+t.length,i=[],a=0,o=0;for(let s=0;s<r;s++)n.indexOf(s)===-1?i.push(e[a++]):i.push(t[o++]);return i}function Rs(e,t){let n=[],r=e.length;for(let i=0;i<r;i++)t.indexOf(i)===-1&&n.push(e[i]);return[n,t.map(t=>e[t])]}function zs(e,t){return Ls(e,t.map(e=>1),t)}function Bs(e,t,n){h(Is(t,n),()=>`${e} supports only inner-most axes for now. Got axes ${t} and rank-${n} input.`)}function Vs(e,t){if(Is(e,t))return null;let n=[];for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);return e.forEach(e=>n.push(e)),n}function Hs(e){return e.map((e,t)=>[t,e]).sort((e,t)=>e[1]-t[1]).map(e=>e[0])}function Us(e,t){let n=[];for(let r=t-e;r<t;++r)n.push(r);return n}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ws(e,t=null,n=!1){let r={x:M(e,`x`,`max`)},i={reductionIndices:t,keepDims:n};return j.runKernel(`Max`,r,i)}const Gs=/* @__PURE__ */ N({max_:Ws});
/**
* @license
* Copyright 2020 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ks(e,t=null,n=!1){let r={x:M(e,`x`,`min`)},i={axis:t,keepDims:n};return j.runKernel(`Min`,r,i)}const qs=/* @__PURE__ */ N({min_:Ks});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Js(e,t){let n=M(e,`base`,`pow`),r=M(t,`exp`,`pow`);[n,r]=ri(n,r);let i={a:n,b:r};return j.runKernel(`Pow`,i)}const Ys=/* @__PURE__ */ N({pow_:Js});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Xs(e,t){if((Dr(e)&&t!==`string`||Array.isArray(e))&&t!==`complex64`)throw Error(`Error creating a new Scalar: value must be a primitive (number|boolean|string)`);if(t===`string`&&Dr(e)&&!(e instanceof Uint8Array))throw Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return xi(e,[],[],t)}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Zs(e){let t={x:M(e,`x`,`sqrt`,`float32`)};return j.runKernel(kn,t)}const Qs=/* @__PURE__ */ N({sqrt_:Zs});
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function $s(e){let t=M(e,`x`,`square`);return j.runKernel(`Square`,{x:t},{})}const ec=/* @__PURE__ */ N({square_:$s});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function tc(e,t=null,n=!1){let r=M(e,`x`,`sum`);r.dtype===`bool`&&(r=L(r,`int32`));let i={x:r},a={axis:t,keepDims:n};return j.runKernel(`Sum`,i,a)}const U=/* @__PURE__ */ N({sum_:tc});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function nc(e,t=`euclidean`,n=null,r=!1){e=M(e,`x`,`norm`);let i=rc(e,t,n),a=i.shape;if(r){let t=C(n,e.shape);a=zs(i.shape,t)}return V(i,a)}function rc(e,t,n=null){if(e.rank===0)return Ia(e);if(e.rank!==1&&n===null)return rc(V(e,[-1]),t,n);if(e.rank===1||typeof n==`number`||Array.isArray(n)&&n.length===1){if(t===1)return U(Ia(e),n);if(t===1/0)return Gs(Ia(e),n);if(t===-1/0)return qs(Ia(e),n);if(t===`euclidean`||t===2)return Qs(U(Ys(Ia(e),Xs(2,`int32`)),n));throw Error(`Error in norm: invalid ord value: ${t}`)}if(Array.isArray(n)&&n.length===2){if(t===1)return Gs(U(Ia(e),n[0]),n[1]-1);if(t===1/0)return Gs(U(Ia(e),n[1]),n[0]);if(t===-1/0)return qs(U(Ia(e),n[1]),n[0]);if(t===`fro`||t===`euclidean`)return Qs(U(ec(e),n));throw Error(`Error in norm: invalid ord value: ${t}`)}throw Error(`Error in norm: invalid axis: ${n}`)}const ic=/* @__PURE__ */ N({norm_:nc});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ac(e){let t={x:M(e,`x`,`exp`)};return j.runKernel(`Exp`,t)}const oc=/* @__PURE__ */ N({exp_:ac});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function sc(e,t=0){let n=M(e,`x`,`expandDims`,`string_or_numeric`);h(t<=n.rank,()=>`Axis must be <= rank of the tensor`);let r={input:n},i={dim:t};return j.runKernel(bt,r,i)}const cc=/* @__PURE__ */ N({expandDims_:sc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function lc(e,t){let n=M(e,`x`,`tile`,`string_or_numeric`);h(n.rank===t.length,()=>`Error in transpose: rank of input ${n.rank} must match length of reps ${t}.`);let r={x:n},i={reps:t};return j.runKernel(Ln,r,i)}const uc=/* @__PURE__ */ N({tile_:lc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function dc(e,t,n,r=`float32`){t??=e;let i=I([e,t],r),a=e<=t?e:t;for(let e=0;e<a;++e)i.set(1,e,e);let o=V(i.toTensor(),[e,t]);if(n==null)return o;if(n.length===1)return uc(cc(o,0),[n[0],1,1]);if(n.length===2)return uc(cc(cc(o,0),0),[n[0],n[1],1,1]);if(n.length===3)return uc(cc(cc(cc(o,0),0),0),[n[0],n[1],n[2],1,1]);throw Error(`eye() currently supports only 1D and 2D batchShapes, but received ${n.length}D.`)}const fc=/* @__PURE__ */ N({eye_:dc});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function pc(e){let t={x:M(e,`x`,`floor`,`float32`)};return j.runKernel(wt,t)}const mc=/* @__PURE__ */ N({floor_:pc});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function hc(e,t,n=0,r=0){let i={x:M(e,`x`,`gather`),indices:M(t,`indices`,`gather`,`int32`)},a={axis:n,batchDims:r};return j.runKernel(Dt,i,a)}const gc=/* @__PURE__ */ N({gather_:hc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function _c(e,t){let n=M(e,`a`,`greater`,`string_or_numeric`),r=M(t,`b`,`greater`,`string_or_numeric`);[n,r]=ri(n,r),ws(n.shape,r.shape);let i={a:n,b:r};return j.runKernel(Ot,i)}const vc=/* @__PURE__ */ N({greater_:_c});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function yc(e,t){let n=M(e,`a`,`greaterEqual`,`string_or_numeric`),r=M(t,`b`,`greaterEqual`,`string_or_numeric`);[n,r]=ri(n,r),ws(n.shape,r.shape);let i={a:n,b:r};return j.runKernel(kt,i)}const bc=/* @__PURE__ */ N({greaterEqual_:yc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function xc(e){let t={input:M(e,`input`,`imag`)};return j.runKernel(jt,t)}const Sc=/* @__PURE__ */ N({imag_:xc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Cc(e,t=.2){let n={x:M(e,`x`,`leakyRelu`)},r={alpha:t};return j.runKernel(Ft,n,r)}const wc=/* @__PURE__ */ N({leakyRelu_:Cc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Tc(e,t){let n=M(e,`a`,`less`,`string_or_numeric`),r=M(t,`b`,`less`,`string_or_numeric`);[n,r]=ri(n,r),ws(n.shape,r.shape);let i={a:n,b:r};return j.runKernel(It,i)}const Ec=/* @__PURE__ */ N({less_:Tc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Dc(e,t){let n=M(e,`a`,`lessEqual`,`string_or_numeric`),r=M(t,`b`,`lessEqual`,`string_or_numeric`);[n,r]=ri(n,r),ws(n.shape,r.shape);let i={a:n,b:r};return j.runKernel(Lt,i)}const Oc=/* @__PURE__ */ N({lessEqual_:Dc});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function kc(e){let t={x:M(e,`x`,`log`,`float32`)};return j.runKernel(`Log`,t)}const Ac=/* @__PURE__ */ N({log_:kc});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function jc(e){let t={x:M(e,`x`,`log1p`)};return j.runKernel(Rt,t)}const Mc=/* @__PURE__ */ N({log1p_:jc});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Nc(e,t){h(se(e),()=>`The f passed in variableGrads(f) must be a function`),h(t==null||Array.isArray(t)&&t.every(e=>e instanceof qr),()=>`The varList passed in variableGrads(f, varList) must be an array of variables`);let n=t!=null;if(!n){t=[];for(let e in j.registeredVariables)t.push(j.registeredVariables[e])}let r=n?t.filter(e=>!e.trainable):null,i=t.length;t=t.filter(e=>e.trainable),h(t.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${i} variables is trainable.`);let{value:a,grads:o}=j.gradients(e,t,null,!0);h(o.some(e=>e!=null),()=>`Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize().`),h(a.rank===0,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${a.rank} tensor`);let s={};return t.forEach((e,t)=>{o[t]!=null&&(s[e.name]=o[t])}),r?.forEach(e=>s[e.name]=null),{value:a,grads:s}}function Pc(e){return j.customGrad(e)}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Fc(e){let t={x:M(e,`x`,`neg`)};return j.runKernel(`Neg`,t)}const Ic=/* @__PURE__ */ N({neg_:Fc});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Lc(e){let t={x:M(e,`x`,`softplus`)};return j.runKernel(On,t)}const Rc=/* @__PURE__ */ N({softplus_:Lc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function zc(e,t){let n=M(e,`a`,`sub`),r=M(t,`b`,`sub`);[n,r]=ri(n,r);let i={a:n,b:r};return j.runKernel(`Sub`,i)}const W=/* @__PURE__ */ N({sub_:zc});
/**
* @license
* Copyright 2020 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Bc(e,t=-1){let n=M(e,`logits`,`logSoftmax`);if(t===-1&&(t=n.rank-1),t!==n.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and axis was ${t}`);return Pc((e,n)=>{let r=Gs(e,t,!0),i=W(e,r),a=W(L(i,`float32`),Ac(U(oc(i),t,!0)));return n([a]),{value:a,gradFunc:(e,n)=>{let[r]=n,i=oc(r);return W(e,B(U(e,t,!0),i))}}})(n)}const Vc=/* @__PURE__ */ N({logSoftmax_:Bc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Hc(e,t=null,n=!1){let r=M(e,`x`,`logSumExp`),i=C(t,r.shape),a=Gs(r,i,!0),o=W(r,a),s=oc(o),c=U(s,i),l=Ac(c),u=R(V(a,l.shape),l);if(n){let e=zs(u.shape,i);return V(u,e)}return u}const Uc=/* @__PURE__ */ N({logSumExp_:Hc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Wc(e,t){let n=M(e,`a`,`logicalAnd`,`bool`),r=M(t,`b`,`logicalAnd`,`bool`);ws(n.shape,r.shape);let i={a:n,b:r};return j.runKernel(zt,i)}const Gc=/* @__PURE__ */ N({logicalAnd_:Wc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Kc(e){let t={x:M(e,`x`,`logicalNot`,`bool`)};return j.runKernel(Bt,t)}const qc=/* @__PURE__ */ N({logicalNot_:Kc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Jc(e,t,n,r,i){let a=M(e,`x`,`maxPool`),o=a,s=!1;a.rank===3&&(s=!0,o=V(a,[1,a.shape[0],a.shape[1],a.shape[2]])),h(o.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${o.rank}.`),h(io(n,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${n} and dilations '1'`),so(`maxPool`,r,i);let c={x:o},l={filterSize:t,strides:n,pad:r,dimRoundingMode:i},u=j.runKernel(Wt,c,l);return s?V(u,[u.shape[1],u.shape[2],u.shape[3]]):u}const Yc=/* @__PURE__ */ N({maxPool_:Jc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Xc(e,t=[1,1,1],n,r,i,a=`NDHWC`){let o=M(e,`x`,`maxPool3d`),s=o,c=!1;o.rank===4&&(c=!0,s=V(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),h(s.rank===5,()=>`Error in maxPool3d: x must be rank 5 but got rank ${s.rank}.`),h(a===`NDHWC`,()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${a}`),so(`maxPool3d`,r,i);let l={x:s},u={filterSize:t,strides:n,pad:r,dimRoundingMode:i,dataFormat:a},d=j.runKernel(Kt,l,u);return c?V(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}const Zc=/* @__PURE__ */ N({maxPool3d_:Xc});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Qc(e,t){let n=M(e,`a`,`maximum`),r=M(t,`b`,`maximum`);[n,r]=ri(n,r),n.dtype===`bool`&&(n=L(n,`int32`),r=L(r,`int32`)),ws(n.shape,r.shape);let i={a:n,b:r};return j.runKernel(Ut,i)}const $c=/* @__PURE__ */ N({maximum_:Qc});
/**
* @license
* Copyright 2020 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function el(e,t=null,n=!1){let r={x:M(e,`x`,`mean`)},i={axis:t,keepDims:n};return j.runKernel(Jt,r,i)}const tl=/* @__PURE__ */ N({mean_:el});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function nl(e,t=`float32`){if(me(e),t===`complex64`){let t=nl(e,`float32`),n=nl(e,`float32`);return bi(t,n)}let n=fe(v(e),t);return j.makeTensor(n,e,t)}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function rl(e,t=`float32`){if(me(e),t===`complex64`){let t=rl(e,`float32`),n=nl(e,`float32`);return bi(t,n)}let n=de(v(e),t);return j.makeTensor(n,e,t)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function il(e,t){let n=M(e,`a`,`minimum`),r=M(t,`b`,`minimum`);[n,r]=ri(n,r),n.dtype===`bool`&&(n=L(n,`int32`),r=L(r,`int32`)),ws(n.shape,r.shape);let i={a:n,b:r};return j.runKernel(Yt,i)}const al=/* @__PURE__ */ N({minimum_:il});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ol(e,t=null,n=!1){e=M(e,`x`,`moments`);let r=C(t,e.shape),i=tl(e,r,n),a=i.shape;n||(a=zs(i.shape,r));let o=ec(W(L(e,`float32`),V(i,a)));return{mean:i,variance:tl(o,r,n)}}const sl=/* @__PURE__ */ N({moments_:ol});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function cl(e,t){let n=M(e,`a`,`notEqual`,`string_or_numeric`),r=M(t,`b`,`notEqual`,`string_or_numeric`);[n,r]=ri(n,r),ws(n.shape,r.shape);let i={a:n,b:r};return j.runKernel(Qt,i)}const ll=/* @__PURE__ */ N({notEqual_:cl});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ul(e,t,n=1,r=0,i=`int32`){if(t<2)throw Error(`Error in oneHot: depth must be >=2, but it is ${t}`);let a={indices:M(e,`indices`,`oneHot`,`int32`)},o={dtype:i,depth:t,onValue:n,offValue:r};return j.runKernel(rn,a,o)}const dl=/* @__PURE__ */ N({oneHot_:ul});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function fl(e){let t={x:M(e,`x`,`onesLike`)};return j.runKernel(nn,t)}const pl=/* @__PURE__ */ N({onesLike_:fl});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ml(e,t,n=0){let r=M(e,`x`,`pad`);if(r.rank===0)throw Error(`pad(scalar) is not defined. Pass non-scalar to pad`);let i={paddings:t,constantValue:n},a={x:r};return j.runKernel(on,a,i)}const hl=/* @__PURE__ */ N({pad_:ml});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function gl(e,t,n){let r=M(e,`x`,`spaceToBatchND`);h(r.rank>=1+t.length,()=>`input rank ${r.rank} should be > than [blockShape] ${t.length}`),h(n.length===t.length,()=>`paddings.shape[0] ${n.length} must be equal to [blockShape] ${t.length}`),h(r.shape.reduce((e,r,i)=>i>0&&i<=t.length?e&&(r+n[i-1][0]+n[i-1][1])%t[i-1]===0:e,!0),()=>`input spatial dimensions ${r.shape.slice(1)} with paddings ${n.toString()} must be divisible by blockShapes ${t.toString()}`);let i={x:r},a={blockShape:t,paddings:n};return j.runKernel(An,i,a)}const _l=/* @__PURE__ */ N({spaceToBatchND_:gl});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function vl(e,t){let n={x:M(e,`x`,`prelu`),alpha:M(t,`alpha`,`prelu`)};return j.runKernel(sn,n)}const yl=/* @__PURE__ */ N({prelu_:vl});var bl=/* @__PURE__ */ o(((e,t,n)=>{(function(e,t,n){function r(e){var t=this,n=o();t.next=function(){var e=2091639*t.s0+t.c*23283064365386963e-26;return t.s0=t.s1,t.s1=t.s2,t.s2=e-(t.c=e|0)},t.c=1,t.s0=n(` `),t.s1=n(` `),t.s2=n(` `),t.s0-=n(e),t.s0<0&&(t.s0+=1),t.s1-=n(e),t.s1<0&&(t.s1+=1),t.s2-=n(e),t.s2<0&&(t.s2+=1),n=null}function i(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function a(e,t){var n=new r(e),a=t&&t.state,o=n.next;return o.int32=function(){return n.next()*4294967296|0},o.double=function(){return o()+(o()*2097152|0)*11102230246251565e-32},o.quick=o,a&&(typeof a==`object`&&i(a,n),o.state=function(){return i(n,{})}),o}function o(){var e=4022871197;return function(t){t=String(t);for(var n=0;n<t.length;n++){e+=t.charCodeAt(n);var r=.02519603282416938*e;e=r>>>0,r-=e,r*=e,e=r>>>0,r-=e,e+=r*4294967296}return(e>>>0)*23283064365386963e-26}}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.alea=a})(n,typeof t==`object`&&t,typeof define==`function`&&define)})),xl=/* @__PURE__ */ o(((e,t,n)=>{(function(e,t,n){function r(e){var t=this,n=``;t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(e|0)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=n.charCodeAt(r)|0,t.next()}function i(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function a(e,t){var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(typeof a==`object`&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.xor128=a})(n,typeof t==`object`&&t,typeof define==`function`&&define)})),Sl=/* @__PURE__ */ o(((e,t,n)=>{(function(e,t,n){function r(e){var t=this,n=``;t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^(e^e<<1))|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(e|0)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=n.charCodeAt(r)|0,r==n.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function i(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function a(e,t){var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(typeof a==`object`&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.xorwow=a})(n,typeof t==`object`&&t,typeof define==`function`&&define)})),Cl=/* @__PURE__ */ o(((e,t,n)=>{(function(e,t,n){function r(e){var t=this;t.next=function(){var e=t.x,n=t.i,r=e[n],i;return r^=r>>>7,i=r^r<<24,r=e[n+1&7],i^=r^r>>>10,r=e[n+3&7],i^=r^r>>>3,r=e[n+4&7],i^=r^r<<7,r=e[n+7&7],r^=r<<13,i^=r^r<<9,e[n]=i,t.i=n+1&7,i};function n(e,t){var n,r=[];if(t===(t|0))r[0]=t;else for(t=``+t,n=0;n<t.length;++n)r[n&7]=r[n&7]<<15^t.charCodeAt(n)+r[n+1&7]<<13;for(;r.length<8;)r.push(0);for(n=0;n<8&&r[n]===0;++n);for(n==8?r[7]=-1:r[n],e.x=r,e.i=0,n=256;n>0;--n)e.next()}n(t,e)}function i(e,t){return t.x=e.x.slice(),t.i=e.i,t}function a(e,t){e??=+/* @__PURE__ */ new Date;var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(a.x&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.xorshift7=a})(n,typeof t==`object`&&t,typeof define==`function`&&define)})),wl=/* @__PURE__ */ o(((e,t,n)=>{(function(e,t,n){function r(e){var t=this;t.next=function(){var e=t.w,n=t.X,r=t.i,i,a;return t.w=e=e+1640531527|0,a=n[r+34&127],i=n[r=r+1&127],a^=a<<13,i^=i<<17,a^=a>>>15,i^=i>>>12,a=n[r]=a^i,t.i=r,a+(e^e>>>16)|0};function n(e,t){var n,r,i,a,o,s=[],c=128;for(t===(t|0)?(r=t,t=null):(t+=`\0`,r=0,c=Math.max(c,t.length)),i=0,a=-32;a<c;++a)t&&(r^=t.charCodeAt((a+32)%t.length)),a===0&&(o=r),r^=r<<10,r^=r>>>15,r^=r<<4,r^=r>>>13,a>=0&&(o=o+1640531527|0,n=s[a&127]^=r+o,i=n==0?i+1:0);for(i>=128&&(s[(t&&t.length||0)&127]=-1),i=127,a=512;a>0;--a)r=s[i+34&127],n=s[i=i+1&127],r^=r<<13,n^=n<<17,r^=r>>>15,n^=n>>>12,s[i]=r^n;e.w=o,e.X=s,e.i=i}n(t,e)}function i(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function a(e,t){e??=+/* @__PURE__ */ new Date;var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(a.X&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.xor4096=a})(n,typeof t==`object`&&t,typeof define==`function`&&define)})),Tl=/* @__PURE__ */ o(((e,t,n)=>{(function(e,t,n){function r(e){var t=this,n=``;t.next=function(){var e=t.b,n=t.c,r=t.d,i=t.a;return e=e<<25^e>>>7^n,n=n-r|0,r=r<<24^r>>>8^i,i=i-e|0,t.b=e=e<<20^e>>>12^n,t.c=n=n-r|0,t.d=r<<16^n>>>16^i,t.a=i-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=e|0):n+=e;for(var r=0;r<n.length+20;r++)t.b^=n.charCodeAt(r)|0,t.next()}function i(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function a(e,t){var n=new r(e),a=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);while(e===0);return e},o.int32=n.next,o.quick=o,a&&(typeof a==`object`&&i(a,n),o.state=function(){return i(n,{})}),o}t&&t.exports?t.exports=a:n&&n.amd?n(function(){return a}):this.tychei=a})(n,typeof t==`object`&&t,typeof define==`function`&&define)})),El=/* @__PURE__ */ o(((e,t,n)=>{(function(e,n,r){var i=256,a=6,o=52,s=`random`,c=r.pow(i,a),l=r.pow(2,o),u=l*2,d=i-1,f;function p(e,t,o){var d=[];t=t==1?{entropy:!0}:t||{};var f=_(g(t.entropy?[e,y(n)]:e??v(),3),d),p=new m(d),b=function(){for(var e=p.g(a),t=c,n=0;e<l;)e=(e+n)*i,t*=i,n=p.g(1);for(;e>=u;)e/=2,t/=2,n>>>=1;return(e+n)/t};return b.int32=function(){return p.g(4)|0},b.quick=function(){return p.g(4)/4294967296},b.double=b,_(y(p.S),n),(t.pass||o||function(e,t,n,i){return i&&(i.S&&h(i,p),e.state=function(){return h(p,{})}),n?(r[s]=e,t):e})(b,f,`global`in t?t.global:this==r,t.state)}function m(e){var t,n=e.length,r=this,a=0,o=r.i=r.j=0,s=r.S=[];for(n||(e=[n++]);a<i;)s[a]=a++;for(a=0;a<i;a++)s[a]=s[o=d&o+e[a%n]+(t=s[a])],s[o]=t;(r.g=function(e){for(var t,n=0,a=r.i,o=r.j,s=r.S;e--;)t=s[a=d&a+1],n=n*i+s[d&(s[a]=s[o=d&o+t])+(s[o]=t)];return r.i=a,r.j=o,n})(i)}function h(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function g(e,t){var n=[],r=typeof e,i;if(t&&r==`object`)for(i in e)try{n.push(g(e[i],t-1))}catch{}return n.length?n:r==`string`?e:e+`\0`}function _(e,t){for(var n=e+``,r,i=0;i<n.length;)t[d&i]=d&(r^=t[d&i]*19)+n.charCodeAt(i++);return y(t)}function v(){try{var t;return f&&(t=f.randomBytes)?t=t(i):(t=new Uint8Array(i),(e.crypto||e.msCrypto).getRandomValues(t)),y(t)}catch{var r=e.navigator,a=r&&r.plugins;return[+/* @__PURE__ */ new Date,e,a,e.screen,y(n)]}}function y(e){return String.fromCharCode.apply(0,e)}if(_(r.random(),n),typeof t==`object`&&t.exports){t.exports=p;try{f=Sa()}catch{}}else typeof define==`function`&&define.amd?define(function(){return p}):r[`seed`+s]=p})(typeof self<`u`?self:n,[],Math)})),Dl=/* @__PURE__ */ c((/* @__PURE__ */ o(((e,t)=>{var n=bl(),r=xl(),i=Sl(),a=Cl(),o=wl(),s=Tl(),c=El();c.alea=n,c.xor128=r,c.xorwow=i,c.xorshift7=a,c.xor4096=o,c.tychei=s,t.exports=c})))()),Ol=class{constructor(e,t,n,r,i){
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
this.mean=e,this.stdDev=t,this.dtype=n,this.nextVal=NaN,this.truncated=r,this.truncated&&(this.upper=this.mean+this.stdDev*2,this.lower=this.mean-this.stdDev*2);let a=i||Math.random();this.random=Dl.alea(a.toString())}nextValue(){if(!isNaN(this.nextVal)){let e=this.nextVal;return this.nextVal=NaN,e}let e,t,n=!1;for(;!n;){let r,i,a;do r=2*this.random()-1,i=2*this.random()-1,a=r*r+i*i;while(a>=1||a===0);let o=Math.sqrt(-2*Math.log(a)/a);e=this.mean+this.stdDev*r*o,t=this.mean+this.stdDev*i*o,(!this.truncated||this.isValidTruncated(e))&&(n=!0)}return(!this.truncated||this.isValidTruncated(t))&&(this.nextVal=this.convertValue(t)),this.convertValue(e)}convertValue(e){return this.dtype==null||this.dtype===`float32`?e:Math.round(e)}isValidTruncated(e){return e<=this.upper&&e>=this.lower}},kl=class{constructor(e=0,t=1,n,r){if(this.canReturnFloat=()=>this.dtype==null||this.dtype===`float32`,this.min=e,this.range=t-e,this.dtype=n,r??=Math.random(),typeof r==`number`&&(r=r.toString()),!this.canReturnFloat()&&this.range<=1)throw Error(`The difference between ${e} - ${t} <= 1 and dtype is not float`);this.random=Dl.alea(r)}convertValue(e){return this.canReturnFloat()?e:Math.round(e)}nextValue(){return this.convertValue(this.min+this.range*this.random())}};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Al(e,t=0,n=1,r,i){if(me(e),r!=null&&r===`bool`)throw Error(`Unsupported data type ${r}`);let a=new Ol(t,n,r,!1,i),o=I(e,r);for(let e=0;e<o.values.length;e++)o.values[e]=a.nextValue();return o.toTensor()}const jl=/* @__PURE__ */ N({randomNormal_:Al});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ml(e,t=0,n=1,r=`float32`,i){me(e);let a=I(e,r),o=new kl(t,n,null,i);for(let e=0;e<a.values.length;e++)a.values[e]=o.nextValue();return a.toTensor()}const Nl=/* @__PURE__ */ N({randomUniform_:Ml});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Pl(e,t,n=1,r=`float32`){if(n===0)throw Error(`Cannot have a step of zero`);let i={start:e,stop:t,step:n,dtype:r};return j.runKernel(ln,{},i)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Fl(e){let t={input:M(e,`input`,`real`)};return j.runKernel(un,t)}const Il=/* @__PURE__ */ N({real_:Fl});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ll(e){let t={x:M(e,`x`,`relu`)};return j.runKernel(fn,t)}const Rl=/* @__PURE__ */ N({relu_:Ll});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function zl(e){let t={x:M(e,`x`,`relu6`)};return j.runKernel(vn,t)}const Bl=/* @__PURE__ */ N({relu6_:zl});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Vl(e,t){let n={x:M(e,`x`,`reverse`)},r={dims:t};return j.runKernel(yn,n,r)}const Hl=/* @__PURE__ */ N({reverse_:Vl});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ul(e){let t={x:M(e,`x`,`round`)};return j.runKernel(bn,t)}const Wl=/* @__PURE__ */ N({round_:Ul});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Gl(e){let t={x:M(e,`x`,`rsqrt`,`float32`)};return j.runKernel(xn,t)}const Kl=/* @__PURE__ */ N({rsqrt_:Gl});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ql(e){let t={x:M(e,`x`,`selu`)};return j.runKernel(Cn,t)}const Jl=/* @__PURE__ */ N({selu_:ql});function Yl(e,t,n,r,i,a=[1,1],o=`NHWC`){let s=M(e,`x`,`separableConv2d`),c=M(t,`depthwiseFilter`,`separableConv2d`),l=M(n,`pointwiseFilter`,`separableConv2d`),u=s,d=!1;if(s.rank===3&&(d=!0,u=V(s,[1,s.shape[0],s.shape[1],s.shape[2]])),o===`NCHW`)throw Error(`separableConv2d currently does not support dataFormat NCHW; only NHWC is supported`);h(u.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${u.rank}.`),h(c.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${c.rank}.`),h(l.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${c.rank}.`),h(l.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${l.shape[0]}.`),h(l.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${l.shape[1]}.`);let f=c.shape[2],p=c.shape[3];h(l.shape[2]===f*p,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${f*p}, but got ${l.shape[2]}.`);let m=xs(u,c,r,i,o,a),g=Zo(m,l,1,`valid`,o);return d?V(g,[g.shape[1],g.shape[2],g.shape[3]]):g}const Xl=/* @__PURE__ */ N({separableConv2d_:Yl});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Zl(e){let t={x:M(e,`x`,`sin`,`float32`)};return j.runKernel(`Sin`,t)}const Ql=/* @__PURE__ */ N({sin_:Zl});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function $l(e){let t={x:M(e,`x`,`sinh`)};return j.runKernel(Tn,t)}const eu=/* @__PURE__ */ N({sinh_:$l});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function tu(e,t,n){let r=M(e,`x`,`slice1d`);return h(r.rank===1,()=>`slice1d expects a rank-1 tensor, but got a rank-${r.rank} tensor`),xo(r,[t],[n])}const nu=/* @__PURE__ */ N({slice1d_:tu});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ru(e,t,n){let r=M(e,`x`,`slice2d`);return h(r.rank===2,()=>`slice2d expects a rank-2 tensor, but got a rank-${r.rank} tensor`),xo(r,t,n)}const iu=/* @__PURE__ */ N({slice2d_:ru});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function au(e,t,n){let r=M(e,`x`,`slice3d`);return h(r.rank===3,()=>`slice3d expects a rank-3 tensor, but got a rank-${r.rank} tensor`),xo(r,t,n)}const ou=/* @__PURE__ */ N({slice3d_:au});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function su(e,t,n){let r=M(e,`x`,`slice4d`);return h(r.rank===4,()=>`slice4d expects a rank-4 tensor, but got a rank-${r.rank} tensor`),xo(r,t,n)}const cu=/* @__PURE__ */ N({slice4d_:su});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function lu(e,t=-1){let n=M(e,`logits`,`softmax`,`float32`);if(t===-1&&(t=n.rank-1),t!==n.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and dim was ${t}`);let r={logits:n},i={dim:t};return j.runKernel(Mn,r,i)}const uu=/* @__PURE__ */ N({softmax_:lu});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function du(e,t,n=0){let r={x:M(e,`x`,`split`)},i={numOrSizeSplits:t,axis:n};return j.runKernel(jn,r,i)}const fu=/* @__PURE__ */ N({split_:du});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function pu(e,t){let n=M(e,`x`,`squeeze`,`string_or_numeric`);return V(n,w(n.shape,t).newShape)}const mu=/* @__PURE__ */ N({squeeze_:pu});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function hu(e,t=0){let n=vi(e,`tensors`,`stack`,`string_or_numeric`);h(n.length>=1,()=>`Pass at least one tensor to tf.stack`),n.length>0&&h(t<=n[0].rank,()=>`Axis must be <= rank of the tensor`);let r=n,i={axis:t};return j.runKernel(an,r,i)}const gu=/* @__PURE__ */ N({stack_:hu});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function _u(e,t=0){let n={x:M(e,`x`,`step`)},r={alpha:t};return j.runKernel(Un,n,r)}const vu=/* @__PURE__ */ N({step_:_u});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function yu(e,t){_(e);let n=hi(e,t);if(n.length!==1)throw Error(`tensor1d() requires values to be a flat/TypedArray`);return xi(e,null,n,t)}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function bu(e,t,n){if(_(e),t!=null&&t.length!==2)throw Error(`tensor2d() requires shape to have two numbers`);let r=hi(e,n);if(r.length!==2&&r.length!==1)throw Error(`tensor2d() requires values to be number[][] or flat/TypedArray`);if(r.length===1&&t==null)throw Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return xi(e,t,r,n)}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function xu(e,t,n){if(_(e),t!=null&&t.length!==3)throw Error(`tensor3d() requires shape to have three numbers`);let r=hi(e,n);if(r.length!==3&&r.length!==1)throw Error(`tensor3d() requires values to be number[][][] or flat/TypedArray`);if(r.length===1&&t==null)throw Error("tensor3d() requires shape to be provided when `values` are a flat array");return xi(e,t,r,n)}function Su(e,t,n){let r=t.shape.length,i=r>1?t.shape[r-1]:1,a=n.length,o=1;for(let e=i;e<a;++e)o*=n[e];let s=i<1?1:i,c=v(t.shape)/s,l=[...k(n.slice(0,i)),1],u=v(n);return{sliceRank:i,numUpdates:c,sliceSize:o,strides:l,outputSize:u}}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Cu(e,t=0,n=1,r,i){if(me(e),r!=null&&r===`bool`)throw Error(`Unsupported data type $ { dtype }`);let a=new Ol(t,n,r,!0,i),o=I(e,r);for(let e=0;e<o.values.length;e++)o.values[e]=a.nextValue();return o.toTensor()}const wu=/* @__PURE__ */ N({truncatedNormal_:Cu});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Tu(e,t,n){let r=M(e,`x`,`unsortedSegmentSum`),i=M(t,`segmentIds`,`unsortedSegmentSum`,`int32`);h(b(n),()=>`numSegments must be of dtype int`);let a={x:r,segmentIds:i},o={numSegments:n};return j.runKernel(Vn,a,o)}const Eu=/* @__PURE__ */ N({unsortedSegmentSum_:Tu});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Du(e,t=0){let n=M(e,`x`,`unstack`,`string_or_numeric`);h(t>=-n.shape.length&&t<n.shape.length,()=>`Axis = ${t} is not in [-${n.shape.length}, ${n.shape.length})`);let r={value:n},i={axis:t};return j.runKernel(Bn,r,i)}const Ou=/* @__PURE__ */ N({unstack_:Du});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ku(e,t=!0,n,r){return j.makeVariable(e,t,n,r)}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Au(e,t){let n=[];for(let e=0;e<t.length;e++)t[e]&&n.push(e);let r=I(e,`int32`),i=I([n.length,e.length],`int32`);for(let t=0;t<n.length;t++){let a=r.indexToLoc(n[t]),o=t*e.length;i.values.set(a,o)}return i.toTensor()}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ju(e,t,n){let r=M(e,`x`,`transpose`);if(t??=r.shape.map((e,t)=>t).reverse(),h(r.rank===t.length,()=>`Error in transpose: rank of input ${r.rank} must match length of perm ${t}.`),t.forEach(e=>{h(e>=0&&e<r.rank,()=>`All entries in 'perm' must be between 0 and ${r.rank-1} but got ${t}`)}),r.rank<=1)return r.clone();let i={x:r},a={perm:t};return r.dtype===`complex64`?P(()=>{let e=Il(r),t=Sc(r);return e=j.runKernel(zn,{x:e},a),t=j.runKernel(zn,{x:t},a),n&&(t=Ic(t)),bi(e,t)}):j.runKernel(zn,i,a)}const G=/* @__PURE__ */ N({transpose_:ju});
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Mu(e,t){if(t==null)return e.shape.slice();if(y(e.shape,t))return t;if(e.shape.length===t.length){let n=[];for(let r=0;r<e.shape.length;r++)t[r]==null&&e.shape[r]!=null?n.push(e.shape[r]):n.push(t[r]);return n}return t}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Nu(e,t,n,r){let i=M(e,`x`,`dropout`);if(h(i.dtype===`float32`,()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${i.dtype} tensor instead.`),h(t>=0&&t<1,()=>`rate must be a float in the range [0, 1), but got ${t}.`),t===0)return e instanceof Gr?i.clone():i;let a=Mu(i,n),o=1-t,s=z(mc(R(Nl(a,0,1,`float32`,r),o)),o);return B(i,s)}const Pu=/* @__PURE__ */ N({dropout_:Nu});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Fu(e,t,n,r,i,a=`NHWC`,o){let s=e;e.rank===3&&(s=V(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let c=t;c.rank===3&&(c=V(t,[1,t.shape[0],t.shape[1],t.shape[2]])),h(s.rank===4,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${s.shape}.`),h(c.rank===4,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${c.shape}.`),h(n.length===4,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${n}.`);let l=a===`NHWC`?s.shape[3]:s.shape[1],u=a===`NHWC`?c.shape[3]:c.shape[1];h(l===n[2],()=>`Error in conv2dDerFilter: depth of input ${l}) must match input depth in filter (${n[2]}.`),h(u===n[3],()=>`Error in conv2dDerFilter: depth of dy (${u}) must match output depth for filter (${n[3]}).`),so(`conv2dDerFilter`,i,o);let d={x:s,dy:c},f={strides:r,pad:i,dataFormat:a,dimRoundingMode:o,filterShape:n};return j.runKernel(et,d,f)}const Iu=/* @__PURE__ */ N({conv2DBackpropFilter_:Fu});
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Lu(e,t,n){if(n==null||n===`linear`)return e;if(n===`relu`)return B(e,vu(t));throw Error(`Cannot compute gradient for fused activation ${n}.`)}function Ru(e,t){let n=t,r=Cs(e.shape,t.shape);return r.length>0&&(n=U(n,r)),V(n,e.shape)}function zu(e,t,n,r){if(t===`linear`)return e;if(t===`relu`)return Rl(e);if(t===`elu`)return Ns(e);if(t===`relu6`)return Bl(e);if(t===`prelu`)return yl(e,n);if(t===`leakyrelu`)return wc(e,r);if(t===`sigmoid`)return yo(e);throw Error(`Unknown fused activation ${t}.`)}const Bu=(e,t)=>!(e>0)||t===`linear`;
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Vu({x:e,filter:t,strides:n,pad:r,dataFormat:i=`NHWC`,dilations:a=[1,1],dimRoundingMode:o,bias:s,activation:c=`linear`,preluActivationWeights:l,leakyreluAlpha:u}){if(c||=`linear`,Bu(j.state.gradientDepth,c)===!1){h(i===`NHWC`,()=>`Error in fused conv2d: got dataFormat of ${i} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let d=Zo(e,t,n,r,i,a,o);return s!=null&&(d=R(d,s)),zu(d,c,l,u)}let d=M(e,`x`,`conv2d`,`float32`),f=M(t,`filter`,`conv2d`,`float32`),p=d,m=!1;d.rank===3&&(m=!0,p=V(d,[1,d.shape[0],d.shape[1],d.shape[2]])),h(p.rank===4,()=>`Error in fused conv2d: input must be rank 4, but got rank ${p.rank}.`),h(f.rank===4,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${f.rank}.`),so(`fused conv2d`,r,o);let g=i===`NHWC`?p.shape[3]:p.shape[1];h(f.shape[2]===g,()=>`Error in conv2d: depth of input (${g}) must match input depth for filter ${f.shape[2]}.`),h(io(n,a),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`);let _=Ka(p.shape,f.shape,n,a,r,o),v;s!=null&&(v=M(s,`bias`,`fused conv2d`),[v]=ri(v,d),i===`NHWC`?ws(_.outShape,v.shape):(h(v.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${v.shape.length}.`),h(v.shape.length===0||v.shape[0]===_.outChannels||v.shape[0]===1,()=>`Error in fused conv2d: bias shape (${v.shape}) is not compatible with the number of output channels (${_.outChannels})`)));let y;if(l!=null){let e=l.shape;if(h(e.length<=1||e.length===3,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${e.length}.`),e.length===1)h(e[0]===1||e[0]===_.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${e}) is not compatible with the number of output channels (${_.outChannels}).`);else if(e.length===3)try{ws(e,_.outShape)}catch{let t=`Error in fused conv2d: PReLU activation weights (${e}) is not compatible with the output shape of the conv2d (${_.outShape}).`;throw Error(t)}y=M(l,`prelu weights`,`fused conv2d`)}let b=(e,t)=>{h(i===`NHWC`,()=>`Error in gradient of fused conv2D: got dataFormat of ${i} but only NHWC is currently supported.`);let[o,s,l,u]=t,d=Lu(e,l,c);h(ro(a),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${a}'`);let f=[ts(s.shape,d,o,n,r),Iu(s,d,o.shape,n,r)];if(u!=null){let e=Ru(u,d);f.push(e)}return f},x={x:p,filter:f,bias:v,preluActivationWeights:y},S={strides:n,pad:r,dataFormat:i,dilations:a,dimRoundingMode:o,activation:c,leakyreluAlpha:u};return s==null?Pc((e,t,n)=>{let r=j.runKernel(Kn,x,S);return n([t,e,r]),m&&(r=V(r,[r.shape[1],r.shape[2],r.shape[3]])),{value:r,gradFunc:b}})(p,f):Pc((e,t,n,r)=>{let i=j.runKernel(Kn,x,S);return r([t,e,i,n]),m&&(i=V(i,[i.shape[1],i.shape[2],i.shape[3]])),{value:i,gradFunc:b}})(p,f,v)}const Hu=/* @__PURE__ */ N({fusedConv2d_:Vu});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Uu(e,t,n,r,i,a=[1,1],o){let s=e;e.rank===3&&(s=V(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let c=t;c.rank===3&&(c=V(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let l={x:s,dy:c},u={strides:r,pad:i,dimRoundingMode:o,dilations:a,filterShape:n};return j.runKernel(dt,l,u)}const Wu=N({depthwiseConv2dNativeBackpropFilter_:Uu});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Gu(e,t,n,r,i,a=[1,1],o){let s=t,c=!1;t.rank===3&&(c=!0,s=V(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let l={dy:s,filter:n},u={strides:r,pad:i,dimRoundingMode:o,dilations:a,inputShape:e},d=j.runKernel(ft,l,u);return c?V(d,[d.shape[1],d.shape[2],d.shape[3]]):d}const Ku=N({depthwiseConv2dNativeBackpropInput_:Gu});
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function qu({a:e,b:t,transposeA:n=!1,transposeB:r=!1,bias:i,activation:a=`linear`,preluActivationWeights:o,leakyreluAlpha:s=.2}){if(Bu(j.state.gradientDepth,a)===!1){let c=_o(e,t,n,r);return i!=null&&(c=R(c,i)),zu(c,a,o,s)}let c=M(e,`a`,`fused matMul`),l=M(t,`b`,`fused matMul`);[c,l]=ri(c,l);let u=n?c.shape[c.rank-2]:c.shape[c.rank-1],d=r?l.shape[l.rank-1]:l.shape[l.rank-2],f=n?c.shape[c.rank-1]:c.shape[c.rank-2],p=r?l.shape[l.rank-2]:l.shape[l.rank-1],m=c.shape.slice(0,-2),g=l.shape.slice(0,-2),_=v(m),y=v(g);h(u===d,()=>`Error in fused matMul: inner shapes (${u}) and (${d}) of Tensors with shapes ${c.shape} and ${l.shape} and transposeA=${n} and transposeB=${r} must match.`);let b=ws(c.shape.slice(0,-2),l.shape.slice(0,-2)).concat([f,p]),x=n?V(c,[_,u,f]):V(c,[_,f,u]),S=r?V(l,[y,p,d]):V(l,[y,d,p]),C;i!=null&&(C=M(i,`bias`,`fused matMul`),[C]=ri(C,c),ws(b,C.shape));let w;o!=null&&(w=M(o,`prelu weights`,`fused matMul`));let T=(e,t)=>{let[o,s,c,l]=t,u=Lu(V(e,c.shape),c,a),d,f;if(!n&&!r?(d=_o(u,s,!1,!0),f=_o(o,u,!0,!1)):!n&&r?(d=_o(u,s,!1,!1),f=_o(u,o,!0,!1)):n&&!r?(d=_o(s,u,!1,!0),f=_o(o,u,!1,!1)):(d=_o(s,u,!0,!0),f=_o(u,o,!0,!0)),i!=null){let e=Ru(l,u);return[d,f,e]}return[d,f]},E={a:x,b:S,bias:C,preluActivationWeights:w},D={transposeA:n,transposeB:r,activation:a,leakyreluAlpha:s};return i==null?Pc((e,t,n)=>{let r=j.runKernel(Gn,E,D);return n([e,t,r]),{value:V(r,b),gradFunc:T}})(x,S):Pc((e,t,n,r)=>{let i=j.runKernel(Gn,E,D);return r([e,t,i,n]),{value:V(i,b),gradFunc:T}})(x,S,C)}const Ju=/* @__PURE__ */ N({fusedMatMul_:qu});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Yu(e,t,n,r,i=`bilinear`,a=0){let o=M(e,`image`,`cropAndResize`),s=M(t,`boxes`,`cropAndResize`,`float32`),c=M(n,`boxInd`,`cropAndResize`,`int32`),l=s.shape[0];h(o.rank===4,()=>`Error in cropAndResize: image must be rank 4,but got rank ${o.rank}.`),h(s.rank===2&&s.shape[1]===4,()=>`Error in cropAndResize: boxes must be have size [${l},4] but had shape ${s.shape}.`),h(c.rank===1&&c.shape[0]===l,()=>`Error in cropAndResize: boxInd must be have size [${l}] but had shape ${s.shape}.`),h(r.length===2,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${r.length}.`),h(r[0]>=1&&r[1]>=1,()=>`cropSize must be atleast [1,1], but was ${r}`),h(i===`bilinear`||i===`nearest`,()=>`method must be bilinear or nearest, but was ${i}`);let u={image:o,boxes:s,boxInd:c},d={method:i,extrapolationValue:a,cropSize:r};return j.runKernel(ct,u,d)}const Xu=/* @__PURE__ */ N({cropAndResize_:Yu});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Zu(e){let t=M(e,`image`,`flipLeftRight`,`float32`);h(t.rank===4,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${t.rank}.`);let n={image:t};return j.runKernel(Ct,n,{})}const Qu=/* @__PURE__ */ N({flipLeftRight_:Zu});
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function $u(e){let t=M(e,`image`,`grayscaleToRGB`),n=t.rank-1,r=t.shape[n];h(t.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${t.rank}.`),h(r===1,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${r}.`);let i=Array(t.rank);return i.fill(1,0,n),i[n]=3,uc(t,i)}const ed=/* @__PURE__ */ N({grayscaleToRGB_:$u});
/**
* @license
* Copyright 2023 Google LLC.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function td(e){let t=M(e,`image`,`RGBToGrayscale`),n=t.rank-1,r=t.shape[n];h(t.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${t.rank}.`),h(r===3,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${r}.`);let i=t.dtype,a=L(t,`float32`),o=yu([.2989,.587,.114]),s;switch(t.rank){case 2:s=js(`ij,j->i`,a,o);break;case 3:s=js(`ijk,k->ij`,a,o);break;case 4:s=js(`ijkl,l->ijk`,a,o);break;case 5:s=js(`ijklm,m->ijkl`,a,o);break;case 6:s=js(`ijklmn,n->ijklm`,a,o);break;default:throw Error(`Not a valid tensor rank.`)}return s=cc(s,-1),L(s,i)}const nd=/* @__PURE__ */ N({rgbToGrayscale_:td});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function rd(e,t,n=0,r=.5){let i=M(e,`image`,`rotateWithOffset`,`float32`);h(i.rank===4,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${i.rank}.`);let a={image:i},o={radians:t,fillValue:n,center:r};return j.runKernel(Wn,a,o)}const id=/* @__PURE__ */ N({rotateWithOffset_:rd});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ad(e,t,n,r,i,a){r??=.5,i??=-1/0,a??=0;let o=e.shape[0];return n=Math.min(n,o),h(0<=r&&r<=1,()=>`iouThreshold must be in [0, 1], but was '${r}'`),h(e.rank===2,()=>`boxes must be a 2D tensor, but was of rank '${e.rank}'`),h(e.shape[1]===4,()=>`boxes must have 4 columns, but 2nd dimension was ${e.shape[1]}`),h(t.rank===1,()=>`scores must be a 1D tensor`),h(t.shape[0]===o,()=>`scores has incompatible shape with boxes. Expected ${o}, but was ${t.shape[0]}`),h(0<=a&&a<=1,()=>`softNmsSigma must be in [0, 1], but was '${a}'`),{maxOutputSize:n,iouThreshold:r,scoreThreshold:i,softNmsSigma:a}}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function od(e,t,n,r=.5,i=-1/0){let a=M(e,`boxes`,`nonMaxSuppression`,`float32`),o=M(t,`scores`,`nonMaxSuppression`,`float32`),s=ad(a,o,n,r,i);n=s.maxOutputSize,r=s.iouThreshold,i=s.scoreThreshold;let c={maxOutputSize:n,iouThreshold:r,scoreThreshold:i};return j.runKernel($t,{boxes:a,scores:o},c)}const sd=/* @__PURE__ */ N({nonMaxSuppression_:od});
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function cd(e,t,n){let r=ld(e,t,n),i=r<0?-(r+1):r;e.splice(i,0,t)}function ld(e,t,n){return dd(e,t,n||ud)}function ud(e,t){return e>t?1:e<t?-1:0}function dd(e,t,n){let r=0,i=e.length,a=0,o=!1;for(;r<i;){a=r+(i-r>>>1);let s=n(t,e[a]);s>0?r=a+1:(i=a,o=!s)}return o?r:-r-1}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function fd(e,t,n,r,i){return hd(e,t,n,r,i,0)}function pd(e,t,n,r,i,a){return hd(e,t,n,r,i,0,!1,a,!0)}function md(e,t,n,r,i,a){return hd(e,t,n,r,i,a,!0)}function hd(e,t,n,r,i,a,o=!1,s=!1,c=!1){let l=[];for(let e=0;e<t.length;e++)t[e]>i&&l.push({score:t[e],boxIndex:e,suppressBeginIndex:0});l.sort(vd);let u=a>0?-.5/a:0,d=[],f=[];for(;d.length<n&&l.length>0;){let t=l.pop(),{score:n,boxIndex:a,suppressBeginIndex:o}=t;if(n<i)break;let s=!1;for(let n=d.length-1;n>=o;--n){let o=gd(e,a,d[n]);if(o>=r){s=!0;break}if(t.score*=_d(r,u,o),t.score<=i)break}t.suppressBeginIndex=d.length,s||(t.score===n?(d.push(a),f.push(t.score)):t.score>i&&cd(l,t,vd))}let p=d.length,m=n-p;s&&m>0&&(d.push(...Array(m).fill(0)),f.push(...Array(m).fill(0)));let h={selectedIndices:d};return o&&(h.selectedScores=f),c&&(h.validOutputs=p),h}function gd(e,t,n){let r=e.subarray(t*4,t*4+4),i=e.subarray(n*4,n*4+4),a=Math.min(r[0],r[2]),o=Math.min(r[1],r[3]),s=Math.max(r[0],r[2]),c=Math.max(r[1],r[3]),l=Math.min(i[0],i[2]),u=Math.min(i[1],i[3]),d=Math.max(i[0],i[2]),f=Math.max(i[1],i[3]),p=(s-a)*(c-o),m=(d-l)*(f-u);if(p<=0||m<=0)return 0;let h=Math.max(a,l),g=Math.max(o,u),_=Math.min(s,d),v=Math.min(c,f),y=Math.max(_-h,0)*Math.max(v-g,0);return y/(p+m-y)}function _d(e,t,n){let r=Math.exp(t*n*n);return n<=e?r:0}function vd(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
async function yd(e,t,n,r=.5,i=-1/0){let a=M(e,`boxes`,`nonMaxSuppressionAsync`),o=M(t,`scores`,`nonMaxSuppressionAsync`),s=ad(a,o,n,r,i);n=s.maxOutputSize,r=s.iouThreshold,i=s.scoreThreshold;let c=await Promise.all([a.data(),o.data()]),l=c[0],u=c[1],{selectedIndices:d}=fd(l,u,n,r,i);return a!==e&&a.dispose(),o!==t&&o.dispose(),yu(d,`int32`)}const bd=yd;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function xd(e,t,n,r=.5,i=-1/0,a=0){let o=M(e,`boxes`,`nonMaxSuppression`),s=M(t,`scores`,`nonMaxSuppression`),c=ad(o,s,n,r,i,a);n=c.maxOutputSize,r=c.iouThreshold,i=c.scoreThreshold,a=c.softNmsSigma;let l={boxes:o,scores:s},u={maxOutputSize:n,iouThreshold:r,scoreThreshold:i,softNmsSigma:a},d=j.runKernel(tn,l,u);return{selectedIndices:d[0],selectedScores:d[1]}}const Sd=/* @__PURE__ */ N({nonMaxSuppressionWithScore_:xd});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
async function Cd(e,t,n,r=.5,i=-1/0,a=0){let o=M(e,`boxes`,`nonMaxSuppressionAsync`),s=M(t,`scores`,`nonMaxSuppressionAsync`),c=ad(o,s,n,r,i,a);n=c.maxOutputSize,r=c.iouThreshold,i=c.scoreThreshold,a=c.softNmsSigma;let l=await Promise.all([o.data(),s.data()]),u=l[0],d=l[1],{selectedIndices:f,selectedScores:p}=md(u,d,n,r,i,a);return o!==e&&o.dispose(),s!==t&&s.dispose(),{selectedIndices:yu(f,`int32`),selectedScores:yu(p)}}const wd=Cd;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Td(e,t,n,r=.5,i=-1/0,a=!1){let o=M(e,`boxes`,`nonMaxSuppression`),s=M(t,`scores`,`nonMaxSuppression`),c=ad(o,s,n,r,i,null),l=c.maxOutputSize,u=c.iouThreshold,d=c.scoreThreshold,f={boxes:o,scores:s},p={maxOutputSize:l,iouThreshold:u,scoreThreshold:d,padToMaxOutputSize:a},m=j.runKernel(en,f,p);return{selectedIndices:m[0],validOutputs:m[1]}}const Ed=/* @__PURE__ */ N({nonMaxSuppressionPadded_:Td});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
async function Dd(e,t,n,r=.5,i=-1/0,a=!1){let o=M(e,`boxes`,`nonMaxSuppressionAsync`),s=M(t,`scores`,`nonMaxSuppressionAsync`),c=ad(o,s,n,r,i,null),l=c.maxOutputSize,u=c.iouThreshold,d=c.scoreThreshold,[f,p]=await Promise.all([o.data(),s.data()]),{selectedIndices:m,validOutputs:h}=pd(f,p,l,u,d,a);return o!==e&&o.dispose(),s!==t&&s.dispose(),{selectedIndices:yu(m,`int32`),validOutputs:Xs(h,`int32`)}}const Od=Dd;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function kd(e,t,n=!1,r=!1){let i=M(e,`images`,`resizeBilinear`);h(i.rank===3||i.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${i.rank}.`),h(t.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${t}.`),h(r===!1||n===!1,()=>`Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.`);let a=i,o=!1;i.rank===3&&(o=!0,a=V(i,[1,i.shape[0],i.shape[1],i.shape[2]]));let[]=t,s={images:a},c={alignCorners:n,halfPixelCenters:r,size:t},l=j.runKernel(gn,s,c);return o?V(l,[l.shape[1],l.shape[2],l.shape[3]]):l}const Ad=/* @__PURE__ */ N({resizeBilinear_:kd});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function jd(e,t,n=!1,r=!1){let i=M(e,`images`,`resizeNearestNeighbor`);h(i.rank===3||i.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${i.rank}.`),h(t.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${t}.`),h(i.dtype===`float32`||i.dtype===`int32`,()=>"`images` must have `int32` or `float32` as dtype"),h(r===!1||n===!1,()=>`Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.`);let a=i,o=!1;i.rank===3&&(o=!0,a=V(i,[1,i.shape[0],i.shape[1],i.shape[2]]));let[]=t,s={images:a},c={alignCorners:n,halfPixelCenters:r,size:t},l=j.runKernel(mn,s,c);return o?V(l,[l.shape[1],l.shape[2],l.shape[3]]):l}const Md=/* @__PURE__ */ N({resizeNearestNeighbor_:jd});
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* https://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Nd(e,t=`binary`,n=!1,r=.5){let i=M(e,`image`,`threshold`),a=i.shape[0]*i.shape[1],o=B(yu([r]),255),s,c,l,u;if(h(i.rank===3,()=>`Error in threshold: image must be rank 3,but got rank ${i.rank}.`),h(i.shape[2]===3||i.shape[2]===1,()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${i.shape[2]}.`),h(i.dtype===`int32`||i.dtype===`float32`,()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${i.dtype}.`),h(t===`otsu`||t===`binary`,()=>`Method must be binary or otsu, but was ${t}`),i.shape[2]===3){[s,c,l]=fu(i,[1,1,1],-1);let e=B(s,.2989),t=B(c,.587),n=B(l,.114);u=R(R(e,t),n)}else u=e;t===`otsu`&&(o=Pd(Io(L(Wl(u),`int32`),Si([]),256),a));let d=n?Oc(u,o):vc(u,o);return L(B(d,255),`int32`)}function Pd(e,t){let n=yu([-1]),r=yu([0]),i=yu([0]),a,o,s,c,l,u;for(let d=0;d<e.size-1;d++){a=xo(e,0,d+1),o=xo(e,d+1),l=z(U(a),t),u=z(U(o),t);let f=U(B(a,Pl(0,a.size)));s=z(f,U(a));let p=zo(o.shape,a.size),m=R(Pl(0,o.size),p),h=B(o,m);c=z(U(h),U(o));let g=W(s,c),_=W(s,c),v=B(l,u);i=B(B(v,g),_);let y=vc(i,r);r=Os(y,i,r),n=Os(y,yu([d]),n)}return n}const Fd=/* @__PURE__ */ N({threshold_:Nd});
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Id(e,t,n=`nearest`,r=`constant`,i=0,a){let o=M(e,`image`,`transform`,`float32`),s=M(t,`transforms`,`transform`,`float32`);h(o.rank===4,()=>`Error in transform: image must be rank 4,but got rank ${o.rank}.`),h(s.rank===2&&(s.shape[0]===o.shape[0]||s.shape[0]===1)&&s.shape[1]===8,()=>`Error in transform: Input transform should be batch x 8 or 1 x 8`),h(a==null||a.length===2,()=>`Error in transform: outputShape must be [height, width] or null, but got ${a}.`);let c={image:o,transforms:s},l={interpolation:n,fillMode:r,fillValue:i,outputShape:a};return j.runKernel(Rn,c,l)}const Ld=/* @__PURE__ */ N({transform_:Id});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Rd(e,t,n){let r=M(e,`a`,`bandPart`);h(r.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${r.rank}.`);let i=r.shape,[a,o]=r.shape.slice(-2),s,c;typeof t==`number`?(h(t%1==0,()=>`bandPart(): numLower must be an integer, got ${t}.`),h(t<=a,()=>`bandPart(): numLower (${t}) must not be greater than the number of rows (${a}).`),s=M(t<0?a:t,`numLower`,`bandPart`)):(h(t.dtype===`int32`,()=>`bandPart(): numLower's dtype must be an int32.`),s=Os(Ec(t,0),a,al(t,a))),typeof n==`number`?(h(n%1==0,()=>`bandPart(): numUpper must be an integer, got ${n}.`),h(n<=o,()=>`bandPart(): numUpper (${n}) must not be greater than the number of columns (${o}).`),c=M(n<0?o:n,`numUpper`,`bandPart`)):(h(n.dtype===`int32`,()=>`bandPart(): numUpper's dtype must be an int32.`),c=Os(Ec(n,0),o,al(n,o)));let l=V(Pl(0,a,1,`int32`),[-1,1]),u=Pl(0,o,1,`int32`),d=W(l,u),f=Gc(Oc(d,s),bc(d,Ic(c))),p=nl([a,o],r.dtype);return V(gu(Ou(V(r,[-1,a,o])).map(e=>Os(f,e,p))),i)}const zd=/* @__PURE__ */ N({bandPart_:Rd});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Bd(e){let t;if(Array.isArray(e)){t=!1,h(e!=null&&e.length>0,()=>`Gram-Schmidt process: input must not be null, undefined, or empty`);let n=e[0].shape[0];for(let t=1;t<e.length;++t)h(e[t].shape[0]===n,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${e[t].shape[0]} vs. ${n})`)}else t=!0,e=fu(e,e.shape[0],0).map(e=>mu(e,[0]));h(e.length<=e[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${e.length}) exceeds number of dimensions (${e[0].shape[0]}).`);let n=[],r=e;for(let t=0;t<e.length;++t)n.push(j.tidy(()=>{let e=r[t];if(t>0)for(let r=0;r<t;++r){let t=B(U(B(n[r],e)),n[r]);e=W(e,t)}return z(e,ic(e,`euclidean`))}));return t?gu(n,0):n}const Vd=/* @__PURE__ */ N({gramSchmidt_:Bd});
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Hd(e,t=!1){if(h(e.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${e.rank}`),e.rank===2)return Ud(e,t);{let n=e.shape.slice(0,e.shape.length-2).reduce((e,t)=>e*t),r=Ou(V(e,[n,e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),i=[],a=[];return r.forEach(e=>{let[n,r]=Ud(e,t);i.push(n),a.push(r)}),[V(gu(i,0),e.shape),V(gu(a,0),e.shape)]}}function Ud(e,t=!1){return j.tidy(()=>{h(e.shape.length===2,()=>`qr2d() requires a 2D Tensor, but got a ${e.shape.length}D Tensor.`);let n=e.shape[0],r=e.shape[1],i=fc(n),a=Oa(e),o=bu([[1]],[1,1]),s=Oa(o),c=n>=r?r:n;for(let e=0;e<c;++e){let t=a,c=s,l=i;[s,a,i]=j.tidy(()=>{let t=xo(a,[e,e],[n-e,1]),c=ic(t),l=xo(a,[e,e],[1,1]),u=Os(vc(l,0),bu([[-1]]),bu([[1]])),d=W(l,B(u,c)),f=z(t,d);s=f.shape[0]===1?Oa(o):ho([o,xo(f,[1,0],[f.shape[0]-1,f.shape[1]])],0);let p=Ic(z(_o(u,d),c)),m=xo(a,[e,0],[n-e,r]),h=B(p,s),g=G(s);if(e===0)a=W(m,_o(h,_o(g,m)));else{let t=W(m,_o(h,_o(g,m)));a=ho([xo(a,[0,0],[e,r]),t],0)}let _=G(h),v=xo(i,[0,e],[n,i.shape[1]-e]);if(e===0)i=W(v,_o(_o(v,s),_));else{let t=W(v,_o(_o(v,s),_));i=ho([xo(i,[0,0],[n,e]),t],1)}return[s,a,i]}),F([t,c,l])}return!t&&n>r&&(i=xo(i,[0,0],[n,r]),a=xo(a,[0,0],[r,r])),[i,a]})}const Wd=/* @__PURE__ */ N({qr_:Hd}),Gd={flipLeftRight:Qu,grayscaleToRGB:ed,resizeNearestNeighbor:Md,resizeBilinear:Ad,rgbToGrayscale:nd,rotateWithOffset:id,cropAndResize:Xu,nonMaxSuppression:sd,nonMaxSuppressionAsync:bd,nonMaxSuppressionWithScore:Sd,nonMaxSuppressionWithScoreAsync:wd,nonMaxSuppressionPadded:Ed,nonMaxSuppressionPaddedAsync:Od,threshold:Fd,transform:Ld},Kd={bandPart:zd,gramSchmidt:Vd,qr:Wd},qd=/* @__PURE__ */ new Map,Jd=/* @__PURE__ */ new Map
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;var Yd=class{getClassName(){return this.constructor.className}static fromConfig(e,t){return new e(t)}},Xd=class e{constructor(){this.classNameMap={}}static getMap(){return e.instance??=new e,e.instance}static register(t){e.getMap().classNameMap[t.className]=[t,t.fromConfig]}};function K(e,t,n){h(e.className!=null,()=>`Class being registered does not have the static className property defined.`),h(typeof e.className==`string`,()=>`className is required to be a string, but got type `+typeof e.className),h(e.className.length>0,()=>`Class being registered has an empty-string as its className, which is disallowed.`),t===void 0&&(t=`Custom`),n===void 0&&(n=e.className);let r=n,i=t+`>`+r;return Xd.register(e),qd.set(i,e),Jd.set(e,i),e}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
var Zd=class extends Yd{minimize(e,t=!1,n){let{value:r,grads:i}=this.computeGradients(e,n);if(n!=null){let e=n.map(e=>({name:e.name,tensor:i[e.name]}));this.applyGradients(e)}else this.applyGradients(i);return F(i),t?r:(r.dispose(),null)}get iterations(){return this.iterations_??=0,this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(e,t){return Nc(e,t)}dispose(){this.iterations_!=null&&F(this.iterations_)}async saveIterations(){return this.iterations_??=0,{name:`iter`,tensor:Xs(this.iterations_,`int32`)}}async getWeights(){throw Error(`getWeights() is not implemented for this optimizer yet.`)}async setWeights(e){throw Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(e){return this.iterations_=(await e[0].tensor.data())[0],e.slice(1)}};Object.defineProperty(Zd,Symbol.hasInstance,{value:e=>e.minimize!=null&&e.computeGradients!=null&&e.applyGradients!=null});
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
var Qd=class extends Zd{static get className(){return`Adadelta`}constructor(e,t,n=null){super(),this.learningRate=e,this.rho=t,this.epsilon=n,this.accumulatedGrads=[],this.accumulatedUpdates=[],n??(this.epsilon=j.backend.epsilon())}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=j.registeredVariables[t];this.accumulatedGrads[n]??(this.accumulatedGrads[n]={originalName:`${t}/accum_grad`,variable:P(()=>H(r).variable(!1))}),this.accumulatedUpdates[n]??(this.accumulatedUpdates[n]={originalName:`${t}/accum_var`,variable:P(()=>H(r).variable(!1))});let i=Array.isArray(e)?e[n].tensor:e[t];if(i==null)return;let a=this.accumulatedGrads[n].variable,o=this.accumulatedUpdates[n].variable;P(()=>{let e=R(B(a,this.rho),B(ec(i),1-this.rho)),t=B(z(Qs(R(o,this.epsilon)),Qs(R(a,this.epsilon))),i),n=R(B(o,this.rho),B(ec(t),1-this.rho));a.assign(e),o.assign(n);let s=R(B(t,-this.learningRate),r);r.assign(s)})}),this.incrementIterations()}dispose(){this.accumulatedUpdates!=null&&(F(this.accumulatedGrads.map(e=>e.variable)),F(this.accumulatedUpdates.map(e=>e.variable)))}async getWeights(){let e=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=e.length/2;this.accumulatedGrads=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedUpdates=e.slice(t,t*2).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.rho,t.epsilon)}},$d=class extends Zd{static get className(){
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
return`Adagrad`}constructor(e,t=.1){super(),this.learningRate=e,this.initialAccumulatorValue=t,this.accumulatedGrads=[]}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=j.registeredVariables[t];this.accumulatedGrads[n]??(this.accumulatedGrads[n]={originalName:`${t}/accumulator`,variable:P(()=>zo(r.shape,this.initialAccumulatorValue).variable(!1))});let i=Array.isArray(e)?e[n].tensor:e[t];if(i==null)return;let a=this.accumulatedGrads[n].variable;P(()=>{let e=R(a,ec(i));a.assign(e);let t=R(B(z(i,Qs(R(e,j.backend.epsilon()))),-this.learningRate),r);r.assign(t)})}),this.incrementIterations()}dispose(){this.accumulatedGrads!=null&&F(this.accumulatedGrads.map(e=>e.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),this.accumulatedGrads=e.map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(e,t){return new e(t.learningRate,t.initialAccumulatorValue)}},ef=class extends Zd{static get className(){
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
return`Adam`}constructor(e,t,n,r=null){super(),this.learningRate=e,this.beta1=t,this.beta2=n,this.epsilon=r,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],P(()=>{this.accBeta1=Xs(t).variable(),this.accBeta2=Xs(n).variable()}),r??(this.epsilon=j.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);P(()=>{let n=W(1,this.accBeta1),r=W(1,this.accBeta2);t.forEach((t,i)=>{let a=j.registeredVariables[t];this.accumulatedFirstMoment[i]??(this.accumulatedFirstMoment[i]={originalName:`${t}/m`,variable:P(()=>H(a).variable(!1))}),this.accumulatedSecondMoment[i]??(this.accumulatedSecondMoment[i]={originalName:`${t}/v`,variable:P(()=>H(a).variable(!1))});let o=Array.isArray(e)?e[i].tensor:e[t];if(o==null)return;let s=this.accumulatedFirstMoment[i].variable,c=this.accumulatedSecondMoment[i].variable,l=R(B(s,this.beta1),B(o,1-this.beta1)),u=R(B(c,this.beta2),B(ec(o),1-this.beta2)),d=z(l,n),f=z(u,r);s.assign(l),c.assign(u);let p=R(B(z(d,R(Qs(f),this.epsilon)),-this.learningRate),a);a.assign(p)}),this.accBeta1.assign(B(this.accBeta1,this.beta1)),this.accBeta2.assign(B(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&F(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedSecondMoment!=null&&F(this.accumulatedSecondMoment.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),P(()=>{this.accBeta1.assign(Ys(this.beta1,this.iterations_+1)),this.accBeta2.assign(Ys(this.beta2,this.iterations_+1))});let t=e.length/2;this.accumulatedFirstMoment=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedSecondMoment=e.slice(t,t*2).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)}},tf=class extends Zd{static get className(){
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
return`Adamax`}constructor(e,t,n,r=null,i=0){super(),this.learningRate=e,this.beta1=t,this.beta2=n,this.epsilon=r,this.decay=i,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],P(()=>{this.iteration=Xs(0).variable(),this.accBeta1=Xs(t).variable()}),r??(this.epsilon=j.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);P(()=>{let n=W(1,this.accBeta1),r=z(-this.learningRate,R(B(this.iteration,this.decay),1));t.forEach((t,i)=>{let a=j.registeredVariables[t];this.accumulatedFirstMoment[i]??(this.accumulatedFirstMoment[i]={originalName:`${t}/m`,variable:H(a).variable(!1)}),this.accumulatedWeightedInfNorm[i]??(this.accumulatedWeightedInfNorm[i]={originalName:`${t}/v`,variable:H(a).variable(!1)});let o=Array.isArray(e)?e[i].tensor:e[t];if(o==null)return;let s=this.accumulatedFirstMoment[i].variable,c=this.accumulatedWeightedInfNorm[i].variable,l=R(B(s,this.beta1),B(o,1-this.beta1)),u=B(c,this.beta2),d=Ia(o),f=$c(u,d);s.assign(l),c.assign(f);let p=R(B(z(r,n),z(l,R(f,this.epsilon))),a);a.assign(p)}),this.iteration.assign(R(this.iteration,1)),this.accBeta1.assign(B(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&F(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedWeightedInfNorm!=null&&F(this.accumulatedWeightedInfNorm.map(e=>e.variable))}async getWeights(){throw Error(`getWeights() is not implemented for Adamax yet.`)}async setWeights(e){throw Error(`setWeights() is not implemented for Adamax yet.`)}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)}},nf=class extends Zd{static get className(){
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
return`SGD`}constructor(e){super(),this.learningRate=e,this.setLearningRate(e)}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=Array.isArray(e)?e[n].tensor:e[t];if(r==null)return;let i=j.registeredVariables[t];P(()=>{let e=R(B(this.c,r),i);i.assign(e)})}),this.incrementIterations()}setLearningRate(e){this.learningRate=e,this.c!=null&&this.c.dispose(),this.c=Oi(Xs(-e))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(e){if(e=await this.extractIterations(e),e.length!==0)throw Error(`SGD optimizer does not have settable weights.`)}getConfig(){return{learningRate:this.learningRate}}static fromConfig(e,t){return new e(t.learningRate)}},rf=class extends nf{static get className(){
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
return`Momentum`}constructor(e,t,n=!1){super(e),this.learningRate=e,this.momentum=t,this.useNesterov=n,this.accumulations=[],this.m=Xs(this.momentum)}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=j.registeredVariables[t];this.accumulations[n]??(this.accumulations[n]={originalName:`${t}/momentum`,variable:P(()=>H(r).variable(!1))});let i=this.accumulations[n].variable,a=Array.isArray(e)?e[n].tensor:e[t];a!=null&&P(()=>{let e,t=R(B(this.m,i),a);e=this.useNesterov?R(B(this.c,R(a,B(t,this.m))),r):R(B(this.c,t),r),i.assign(t),r.assign(e)})}),this.incrementIterations()}dispose(){this.m.dispose(),this.accumulations!=null&&F(this.accumulations.map(e=>e.variable))}setMomentum(e){this.momentum=e}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),this.accumulations=e.map(e=>({originalName:e.name,variable:e.tensor.variable(!1)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)}},af=class extends Zd{static get className(){
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
return`RMSProp`}constructor(e,t=.9,n=0,r=null,i=!1){if(super(),this.learningRate=e,this.decay=t,this.momentum=n,this.epsilon=r,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=i,r??(this.epsilon=j.backend.epsilon()),e==null)throw Error(`learningRate for RMSPropOptimizer must be defined.`)}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{let r=j.registeredVariables[t];this.accumulatedMeanSquares[n]??(this.accumulatedMeanSquares[n]={originalName:`${t}/rms`,variable:P(()=>H(r).variable(!1))}),this.accumulatedMoments[n]??(this.accumulatedMoments[n]={originalName:`${t}/momentum`,variable:P(()=>H(r).variable(!1))}),this.accumulatedMeanGrads[n]==null&&this.centered&&(this.accumulatedMeanGrads[n]={originalName:`${t}/mg`,variable:P(()=>H(r).variable(!1))});let i=Array.isArray(e)?e[n].tensor:e[t];if(i==null)return;let a=this.accumulatedMeanSquares[n].variable,o=this.accumulatedMoments[n].variable;P(()=>{let e=R(B(a,this.decay),B(ec(i),1-this.decay));if(this.centered){let t=this.accumulatedMeanGrads[n].variable,s=R(B(t,this.decay),B(i,1-this.decay)),c=z(B(i,this.learningRate),Qs(W(e,R(ec(s),this.epsilon)))),l=R(B(o,this.momentum),c);a.assign(e),t.assign(s),o.assign(l);let u=W(r,l);r.assign(u)}else{let e=R(B(a,this.decay),B(ec(i),1-this.decay)),t=R(B(o,this.momentum),z(B(i,this.learningRate),Qs(R(e,this.epsilon))));a.assign(e),o.assign(t);let n=W(r,t);r.assign(n)}})}),this.incrementIterations()}dispose(){this.accumulatedMeanSquares!=null&&F(this.accumulatedMeanSquares.map(e=>e.variable)),this.accumulatedMeanGrads!=null&&this.centered&&F(this.accumulatedMeanGrads.map(e=>e.variable)),this.accumulatedMoments!=null&&F(this.accumulatedMoments.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&e.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=this.centered?e.length/3:e.length/2;this.accumulatedMeanSquares=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.accumulatedMoments=e.slice(t,t*2).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})),this.centered&&(this.accumulatedMeanGrads=e.slice(t*2,t*3).map(e=>({originalName:e.name,variable:e.tensor.variable(!1)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)}};
/**
* @license
* Copyright 2022 Google LLC.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const of=[Qd,$d,ef,tf,rf,af,nf];function sf(){for(let e of of)K(e)}
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function cf(e,t,n,r){o(e),n??=0,r??=1,s(n,r);let i=0,a=a=>(a.then(a=>(t(n+ ++i/e.length*(r-n)),a)),a);function o(e){h(e!=null&&Array.isArray(e)&&e.length>0,()=>`promises must be a none empty array`)}function s(e,t){h(e>=0&&e<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${e}`),h(t>=0&&t<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${t}`),h(t>=e,()=>`startFraction must be no more than endFraction, but got startFraction ${e} and endFraction ${t}`)}return Promise.all(e.map(a))}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
async function lf(e,t){t??={};let n=t.fetchFunc==null?A().platform.fetch:t.fetchFunc,r=e.map(e=>n(e,t.requestInit,{isBinary:!0})),i=(t.onProgress==null?await Promise.all(r):await cf(r,t.onProgress,0,.5)).map(e=>e.arrayBuffer());return t.onProgress==null?await Promise.all(i):await cf(i,t.onProgress,.5,1)}function uf(e,t){var n;let r=t.fetchFunc==null?A().platform.fetch:t.fetchFunc,i=0,a;return(n=t.onProgress)==null||n.call(t,0),new ReadableStream({pull:async n=>{for(var o;i<e.length;){a||=(await r(e[i],t.requestInit,{isBinary:!0})).body.getReader();let{done:s,value:c}=await a.read();if(s)i++,a=void 0,(o=t.onProgress)==null||o.call(t,i/e.length);else{n.enqueue(c);return}}n.close()}})}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
var df=class{constructor(e,t){if(this.DEFAULT_METHOD=`POST`,t??={},this.weightPathPrefix=t.weightPathPrefix,this.weightUrlConverter=t.weightUrlConverter,t.fetchFunc==null?this.fetch=A().platform.fetch:(h(typeof t.fetchFunc==`function`,()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=t.fetchFunc),h(e!=null&&e.length>0,()=>`URL path for http must not be null, undefined or empty.`),Array.isArray(e)&&h(e.length===2,()=>`URL paths for http must have a length of 2, (actual length is ${e.length}).`),this.path=e,t.requestInit!=null&&t.requestInit.body!=null)throw Error(`requestInit is expected to have no pre-existing body, but has one.`);this.requestInit=t.requestInit||{},this.loadOptions=t}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw Error(`BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.`);let t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);t.body=new FormData;let n=Ui(e,[{paths:[`./model.weights.bin`],weights:e.weightSpecs}]);if(t.body.append(`model.json`,new Blob([JSON.stringify(n)],{type:`application/json`}),`model.json`),e.weightData!=null){let n=wi.join(e.weightData);t.body.append(`model.weights.bin`,new Blob([n],{type:`application/octet-stream`}),`model.weights.bin`)}let r=await this.fetch(this.path,t);if(r.ok)return{modelArtifactsInfo:Ki(e),responses:[r]};throw Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${r.status}.`)}async loadModelJSON(){let e=await this.fetch(this.path,this.requestInit);if(!e.ok)throw Error(`Request to ${this.path} failed with status code ${e.status}. Please verify this URL points to the model JSON of the model to load.`);let t;try{t=await e.json()}catch{let e=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(`.pb`)?e+=` Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.`:e+=` Please make sure the server is serving valid JSON for this request.`,Error(e)}let n=t.modelTopology,r=t.weightsManifest;if(n==null&&r==null)throw Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return t}async load(){return this.loadOptions.streamWeights?this.loadStream():Gi(await this.loadModelJSON(),e=>this.loadWeights(e))}async loadStream(){let e=await this.loadModelJSON(),t=await this.getWeightUrls(e.weightsManifest),n=qi(e.weightsManifest);return Object.assign(Object.assign({},e),{weightSpecs:n,getWeightStream:()=>uf(t,this.loadOptions)})}async getWeightUrls(e){let[t,n]=ff(Array.isArray(this.path)?this.path[1]:this.path),r=this.weightPathPrefix||t,i=[],a=[];for(let t of e)for(let e of t.paths)this.weightUrlConverter==null?i.push(r+e+n):a.push(this.weightUrlConverter(e));return this.weightUrlConverter&&i.push(...await Promise.all(a)),i}async loadWeights(e){let t=await this.getWeightUrls(e);return[qi(e),await lf(t,this.loadOptions)]}};df.URL_SCHEME_REGEX=/^https?:\/\//;function ff(e){let t=e.lastIndexOf(`/`),n=e.lastIndexOf(`?`),r=e.substring(0,t),i=n>t?e.substring(n):``;return[r+`/`,i]}function pf(e){return e.match(df.URL_SCHEME_REGEX)!=null}const mf=(e,t)=>{if(typeof fetch>`u`&&(t==null||t.fetchFunc==null))return null;{let n=!0;if(n=Array.isArray(e)?e.every(e=>pf(e)):pf(e),n)return hf(e,t)}return null};Qi.registerSaveRouter(mf),Qi.registerLoadRouter(mf);function hf(e,t){return new df(e,t)}function gf(e,t){return hf(e,t)}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
var _f=class{constructor(e){this.modelArtifacts=e}load(){return this.modelArtifacts}},vf=class{constructor(e){e.load&&(this.load=()=>Promise.resolve(e.load())),e.save&&(this.save=t=>Promise.resolve(e.save(t)))}};function yf(e,t,n,r){return new vf(bf(...arguments))}function bf(e,t,n,r){return arguments.length===1?e.modelTopology!=null||e.weightSpecs!=null?new _f(e):(console.warn(`Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release.`),new _f({modelTopology:e})):(console.warn(`Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release.`),new _f({modelTopology:e,weightSpecs:t,weightData:n,trainingConfig:r}))}function xf(e,t){let n=e.shape.length,r=t.shape.length;if(n<1)throw Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${n}.`);if(r<1)throw Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${r}.`);if(t.dtype!==`int32`)throw Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[r-1]>n)throw Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[r-1]} vs. ${n}`);if(v(e.shape)===0)throw Error(`Requested more than 0 entries, but input is empty. Input shape: ${e.shape}.`);let i=t.shape,a=i[i.length-1],o=1;for(let e=0;e<i.length-1;++e)o*=i[e];let s=e.shape,c=i.slice();c.pop();let l=1;for(let e=a;e<n;++e)l*=s[e],c.push(s[e]);let u=[...k(e.shape).map(e=>e/l),1].slice(0,a);return[c,o,l,u]}
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Sf(e,t,n){let r=e.shape.length;h(r===t.length,()=>`Error in slice${r}D: Length of begin ${t} must match the rank of the array (${r}).`),h(r===n.length,()=>`Error in slice${r}D: Length of size ${n} must match the rank of the array (${r}).`);for(let i=0;i<r;++i)h(t[i]+n[i]<=e.shape[i],()=>`Error in slice${r}D: begin[${i}] + size[${i}] (${t[i]+n[i]}) would overflow input.shape[${i}] (${e.shape[i]})`)}function Cf(e,t,n){let r=[];for(let i=0;i<e.length;i++)r[i]=Math.ceil((t[i]-e[i])/n[i]);return r}function wf(e,t,n){let r=n.length;for(let e=0;e<n.length;e++)if(n[e]>1){r=e;break}for(let i=r+1;i<n.length;i++)if(t[i]>0||n[i]!==e[i])return!1;return!0}function Tf(e,t){let n=e.length>0?e[e.length-1]:1;for(let r=0;r<e.length-1;r++)n+=e[r]*t[r];return n}function Ef(e,t,n){let r,i=e.shape.length;r=typeof t==`number`?[t,...Array(i-1).fill(0)]:t.length<i?t.concat(Array(i-t.length).fill(0)):t.slice(),r.forEach(e=>{h(e!==-1,()=>`slice() does not support negative begin indexing.`)});let a;return a=n==null?Array(i).fill(-1):typeof n==`number`?[n,...Array(i-1).fill(-1)]:n.length<i?n.concat(Array(i-n.length).fill(-1)):n,a=a.map((t,n)=>t>=0?t:(h(t===-1,()=>`Negative size values should be exactly -1 but got ${t} for the slice() size at index ${n}.`),e.shape[n]-r[n])),[r,a]}function Df(e,t,n,r,i,a,o,s,c){let l;if(r==null?(l=Array(t.length),l.fill(1)):l=r,o!=null&&o&o-1)throw Error(`Multiple ellipses in slice is not allowed.`);let u=!1,d={dims:l.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:n.slice(),strides:l.slice(),beginMask:i,endMask:a,ellipsisMask:o,newAxisMask:s,shrinkAxisMask:c};for(let e=0;e<d.dims;e++)u&&1<<e&s&&d.numAddAxisAfterEllipsis++,1<<e&o&&(u=!0);u||(d.ellipsisMask|=1<<d.dims,d.dims++);let f={dims:e.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};Of(d,f);let p=!0,m=!0,h=!0,g=[],_=[];for(let t=0;t<e.length;++t){if(f.strides[t]===0)throw Error(`strides[${t}] must be non-zero`);let n=!!(f.shrinkAxisMask&1<<t),r=e[t];if(r===-1){g.push(n?1:-1);continue}let i=[f.beginMask&1<<t,f.endMask&1<<t],a=[f.strides[t]>0?0:-1,f.strides[t]>0?r:r-1];if(n&&f.strides[t]<=0)throw Error(`only stride 1 allowed on non-range indexing.`);h&&=f.strides[t]===1;let o=!!(f.beginMask&1<<t&&f.endMask&1<<t);if(f.beginValid&&f.endValid){if(n){let e=f.begin[t]<0?r+f.begin[t]:f.begin[t];if(f.begin[t]=e,f.end[t]=f.begin[t]+1,e<0||e>=r)throw Error(`slice index ${f.begin[t]} of dimension ${t} out of bounds.`)}else f.begin[t]=kf(f.begin[t],0,f.strides[t],r,i,a),f.end[t]=kf(f.end[t],1,f.strides[t],r,i,a);let e=f.strides[t]===1&&f.begin[t]===0&&f.end[t]===r;p&&=e,m&&=t===0&&f.strides[t]===1||e}else p=p&&f.strides[t]===1&&o,m&&=t===0&&f.strides[t]===1||o;let s,c=!1;if(f.beginValid&&f.endValid?(s=f.end[t]-f.begin[t],c=!0):n?(s=1,c=!0):o&&r>=0&&(s=f.strides[t]<0?-r:r,c=!0),c){let e;e=s===0||s<0!=f.strides[t]<0?0:Math.trunc(s/f.strides[t])+(s%f.strides[t]===0?0:1),g.push(e)}else g.push(-1)}for(let e=0;e<f.finalShapeGatherIndices.length;++e){let t=f.finalShapeGatherIndices[e];t>=0?_.push(g[t]):t===-2&&_.push(1)}return{finalShapeSparse:_.filter((e,t)=>f.finalShapeGatherIndices[t]!==-2),finalShape:_,isIdentity:p,sliceDim0:m,isSimpleSlice:h,begin:f.begin,end:f.end,strides:f.strides}}function Of(e,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;let n=0;t.beginValid=e.begin!=null,t.endValid=e.end!=null,t.begin=Array(t.dims),t.end=Array(t.dims),t.strides=Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=Array(t.dims);for(let r=0;r<e.dims;r++)if(1<<r&e.ellipsisMask){let i=Math.min(t.dims-(e.dims-r)+1+e.numAddAxisAfterEllipsis,t.dims);for(;n<i;n++)t.begin[n]=0,t.end[n]=0,t.strides[n]=1,t.beginMask|=1<<n,t.endMask|=1<<n,t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[n]=r}else if(1<<r&e.newAxisMask)t.finalShapeGatherIndices.push(-2),t.finalShapeGatherIndicesSparse.push(-1);else{if(n===t.begin.length)throw Error(`Index out of range using input dim ${n}; input has only ${t.dims} dims, ${t.begin.length}.`);e.begin!=null&&(t.begin[n]=e.begin[r]),e.end!=null&&(t.end[n]=e.end[r]),t.strides[n]=e.strides[r],e.beginMask&1<<r&&(t.beginMask|=1<<n),e.endMask&1<<r&&(t.endMask|=1<<n),e.shrinkAxisMask&1<<r?(t.finalShapeGatherIndices.push(-1),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<n):(t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(r)),t.inputShapeGatherIndicesSparse[n]=r,n++}}function kf(e,t,n,r,i,a){if(i[t])return n>0?a[t]:a[t+1&1];{let t=e<0?r+e:e;return t<a[0]?a[0]:t>a[1]?a[1]:t}}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const Af=class{static sgd(e){return new nf(e)}static momentum(e,t,n=!1){return new rf(e,t,n)}static rmsprop(e,t=.9,n=0,r=null,i=!1){return new af(e,t,n,r,i)}static adam(e=.001,t=.9,n=.999,r=null){return new ef(e,t,n,r)}static adadelta(e=.001,t=.95,n=null){return new Qd(e,t,n)}static adamax(e=.002,t=.9,n=.999,r=null,i=0){return new tf(e,t,n,r,i)}static adagrad(e,t=.1){return new $d(e,t)}},jf=typeof requestAnimationFrame<`u`?requestAnimationFrame:typeof setImmediate<`u`?setImmediate:e=>e()
/**
* @license
* Copyright 2017 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;function Mf(){return new Promise(e=>jf(()=>e()))}
/**
* @license
* Copyright 2017 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Nf(e,t){let n=e[0].length;e.forEach((e,t)=>{h(e.length===n,()=>`Error in concat${n}D: rank of tensors[${t}] must be the same as the rank of the rest (${n})`)}),h(t>=0&&t<n,()=>`Error in concat${n}D: axis must be between 0 and ${n-1}.`);let r=e[0];e.forEach((e,i)=>{for(let a=0;a<n;a++)h(a===t||e[a]===r[a],()=>`Error in concat${n}D: Shape of tensors[${i}] (${e}) does not match the shape of the rest (${r}) along the non-concatenated axis ${i}.`)})}function Pf(e,t){let n=e[0].slice();for(let r=1;r<e.length;r++)n[t]+=e[r][t];return n}
/**
* @license
* Copyright 2022 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
var Ff;(function(e){e[e.FIRST_DIM_SIZE=0]=`FIRST_DIM_SIZE`,e[e.VALUE_ROWIDS=1]=`VALUE_ROWIDS`,e[e.ROW_LENGTHS=2]=`ROW_LENGTHS`,e[e.ROW_SPLITS=3]=`ROW_SPLITS`,e[e.ROW_LIMITS=4]=`ROW_LIMITS`,e[e.ROW_STARTS=5]=`ROW_STARTS`})(Ff||={});function If(e,t,n){let r=[];if(n==null&&t==null)return r;if(t==null)for(;r.length<e+n.length;)r.push(-1);else r=t.slice();if(n==null)return r;if(e+n.length!==r.length)throw Error(`rt input.shape and shape=${t} are incompatible: rt input.rank = ${e+n.length}, but shape.rank = ${r.length}`);for(let i=1;i<n.length;++i){let a=n[i],o=r[r.length-n.length+i],s=r[o];if(a>=0){if(s>=0){if(s!==a)throw Error(`rt input.shape and shape=${t} are incompatible: rt input.shape[${i+e}] = ${a} but shape[${i+e}] = ${s}`)}else r[o]=a}}return r}function Lf(e){let t={FIRST_DIM_SIZE:Ff.FIRST_DIM_SIZE,VALUE_ROWIDS:Ff.VALUE_ROWIDS,ROW_LENGTHS:Ff.ROW_LENGTHS,ROW_SPLITS:Ff.ROW_SPLITS,ROW_LIMITS:Ff.ROW_LIMITS,ROW_STARTS:Ff.ROW_STARTS},n=[];for(let r of e)if(r in t)n.push(t[r]);else break;return n}function Rf(e){return e.length===0?0:e[0]===Ff.FIRST_DIM_SIZE?e.length-1:e.length}function zf(e,t){if(e==null||t==null)return;let n=e.length,r=t.length;if(n>=r)throw Error(`defaultValue.shape=${e} and ragged tensor flatValues.shape=${t}, are incompatible: defaultValue.rank = ${n} must be less than ragged tensor input flatValues.rank = ${r})`);for(let i=0;i<Math.min(n,r-1);++i){let n=e[i],r=t[i+1];if(n>=0&&r>=0&&n!==1&&n!==r)throw Error(`defaultValue.shape=${e}, and ragged tensor input flatValues.shape=${t} are incompatible: defaultValue.shape[${i-e.length}] = ${n} but ragged tensor input.flatValues.shape[${i-e.length}] = ${r}`)}}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Bf(e,t,n){return[n*(typeof e==`number`?e:e[0]),t*(typeof e==`number`?e:e[1])]}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Vf(e,t,n,r=!0){let i=[];if(r)i=i.concat(t.slice(0)),i.push(e[0]/n),i=i.concat(e.slice(1));else{i=i.concat(e[0]);let n=t.length;for(let r=0;r<n;++r)i=i.concat([e[r+1]/t[r],t[r]]);i=i.concat(e.slice(n+1))}return i}function Hf(e,t,n=!0){let r=[];if(n){r.push(t);for(let n=t+1;n<e;++n)n<=2*t?(r.push(n),r.push(n-(t+1))):r.push(n)}else{let n=[],i=[];for(let r=1;r<e;++r)r>=t*2+1||r%2==1?i.push(r):n.push(r);r.push(...n),r.push(0),r.push(...i)}return r}function Uf(e,t,n,r=!0){let i=[];r?i.push(e[0]/n):i.push(e[0]*n);for(let n=1;n<e.length;++n)n<=t.length?r?i.push(t[n-1]*e[n]):i.push(e[n]/t[n-1]):i.push(e[n]);return i}function Wf(e,t){let n=[0];for(let r=0;r<t;++r)n.push(e[r][0]);return n}function Gf(e,t,n){let r=e.slice(0,1);for(let i=0;i<n;++i)r.push(e[i+1]-t[i][0]-t[i][1]);return r}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Kf(e,t){if(e.length!==t.length)throw Error(`Cannot merge real and imag arrays of different lengths. real:${e.length}, imag: ${t.length}.`);let n=new Float32Array(e.length*2);for(let r=0;r<n.length;r+=2)n[r]=e[r/2],n[r+1]=t[r/2];return n}function qf(e){let t=new Float32Array(e.length/2),n=new Float32Array(e.length/2);for(let r=0;r<e.length;r+=2)t[r/2]=e[r],n[r/2]=e[r+1];return{real:t,imag:n}}function Jf(e){let t=Math.ceil(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let t=0;t<e.length;t+=4)n[Math.floor(t/4)]=e[t],r[Math.floor(t/4)]=e[t+1];return{real:n,imag:r}}function Yf(e){let t=Math.floor(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let t=2;t<e.length;t+=4)n[Math.floor(t/4)]=e[t],r[Math.floor(t/4)]=e[t+1];return{real:n,imag:r}}function Xf(e,t){return{real:e[t*2],imag:e[t*2+1]}}function Zf(e,t,n,r){e[r*2]=t,e[r*2+1]=n}function Qf(e,t){let n=new Float32Array(e/2),r=new Float32Array(e/2);for(let i=0;i<Math.ceil(e/2);i++){let a=(t?2:-2)*Math.PI*(i/e);n[i]=Math.cos(a),r[i]=Math.sin(a)}return{real:n,imag:r}}function $f(e,t,n){let r=(n?2:-2)*Math.PI*(e/t);return{real:Math.cos(r),imag:Math.sin(r)}}
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const ep=/->/g;function tp(e,t){e=e.replace(/\s/g,``);let n=(e.length-e.replace(ep,``).length)/2;if(n<1)throw Error(`Equations without an arrow are not supported.`);if(n>1)throw Error(`Equation must contain exactly one arrow ("->").`);let[r,i]=e.split(`->`);h(r.indexOf(`...`)===-1,()=>`The ellipsis notation ("...") is not supported yet.`);let a=r.split(`,`),o=a.length;if(t!==o)throw Error(`Expected ${o} input tensors, received ${t}`);if(o>2)throw Error(`Support for more than 2 input tensors is not implemented yet.`);let s=[];for(let e=0;e<i.length;++e){let t=i[e];if(!a.some(e=>e.indexOf(t)!==-1))throw Error(`Output subscripts contain the label ${t} not present in the input subscripts.`);s.indexOf(t)===-1&&s.push(t)}for(let e=0;e<r.length;++e){let t=r[e];s.indexOf(t)===-1&&t!==`,`&&s.push(t)}let c=Array(a.length);for(let e=0;e<o;++e){if(new Set(a[e].split(``)).size!==a[e].length)throw Error(`Found duplicate axes in input component ${a[e]}. Support for duplicate axes in input is not implemented yet.`);c[e]=[];for(let t=0;t<a[e].length;++t)c[e].push(s.indexOf(a[e][t]))}let l=s.length,u=i.length,d=[];for(let e=u;e<l;++e)d.push(e);return{allDims:s,summedDims:d,idDims:c}}function np(e,t){let n=Array(e);n.fill(-1);for(let e=0;e<t.length;++e)n[t[e]]=e;let r=[];for(let t=0;t<e;++t)n[t]===-1&&r.push(t);return n=n.filter(e=>e!==-1),{permutationIndices:n,expandDims:r}}function rp(e,t,n){let r=Array(e);for(let e=0;e<n.length;++e){let i=n[e].shape;for(let n=0;n<t[e].length;++n)r[t[e][n]]===void 0?r[t[e][n]]=i[n]:h(r[t[e][n]]===i[n],()=>`Expected dimension ${r[t[e][n]]} at axis ${n} of input shaped ${JSON.stringify(i)}, but got dimension ${i[n]}`)}}function ip(e,t){let n=e,r=[],i=0;e.length===0&&n.push(-1),i=e.length+1;for(let e=0;e<i;++e)r.push([]);let a=[];for(let e=0;e<n.length;++e){let i=n[e],o=op(t,i);for(let t of o)a.indexOf(t)===-1&&(r[e].push(t),a.push(t))}return{path:n,steps:r}}function ap(e){return e.every((e,t)=>e===t)}function op(e,t){let n=[];for(let r=0;r<e.length;++r)(e[r].length===0||e[r].indexOf(t)!==-1||t===-1)&&n.push(r);return n}function sp(e,t,n=0){let r=[];if(typeof t==`number`)h(e.shape[n]%t===0,()=>`Number of splits must evenly divide the axis.`),r=Array(t).fill(e.shape[n]/t);else{h(t.reduce((e,t)=>(t===-1&&(e+=1),e),0)<=1,()=>`There should be only one negative value in split array.`);let i=t.indexOf(-1);if(i!==-1){let r=t.reduce((e,t)=>t>0?e+t:e);t[i]=e.shape[n]-r}h(e.shape[n]===t.reduce((e,t)=>e+t),()=>`The sum of sizes must match the size of the axis dimension.`),r=t}return r}
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function cp(e){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${e}`}function lp(e,t){return`indices(${e}, 0) is invalid: ${t} < 0`}function up(e,t,n){return`indices(${e}, 0) is invalid: ${t} >= ${n}`}
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function dp(e,t){return`only one output dimension may be -1, not both ${e} and ${t}`}function fp(e,t){return`size ${e} must be non-negative, not ${t}`}function pp(){return`reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero`}function mp(e,t){return`Input to reshape is a SparseTensor with ${v(e)}
  dense values, but the requested shape requires a multiple of ${v(t)}. inputShape=${e} outputShape= ${t}`}function hp(e,t){return`Input to reshape is a tensor with ${v(e)} dense values, but the requested shape has ${v(t)}. inputShape=${e} outputShape=${t}`}
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function gp(){return`segment ids must be >= 0`}function _p(){return`segment ids are not increasing`}function vp(e,t){return`Segment id ${e} out of range [0, ${t}), possibly because segmentIds input is not sorted.`}function yp(e,t,n){return`Bad: indices[${e}] == ${t} out of range [0, ${n})`}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function bp(e,t,n,r){let i=t.shape.length,a=e.shape.length;if(r!==0&&(r<-i||r>i))throw Error(`Expect batchDims in the range of [-${i}, ${i}], but got ${r}`);if(r<0&&(r+=i),r>a)throw Error(`batchDims (${r}) must be less than rank(x) (
    ${a}).`);if(n<r)throw Error(`batchDims (${r}) must be less than or equal to axis (${n}).`);for(let n=0;n<r;++n)if(e.shape[n]!==t.shape[n])throw Error(`x.shape[${n}]: ${e.shape[n]} should be equal to indices.shape[${n}]: ${t.shape[n]}.`);let o=e.shape[n],s=[],c=1,l=1,u=1;for(let t=0;t<r;++t)s.push(e.shape[t]),c*=e.shape[t];for(let t=r;t<n;t++)s.push(e.shape[t]),l*=e.shape[t];for(let e=r;e<i;e++)s.push(t.shape[e]);for(let t=n+1;t<a;t++)s.push(e.shape[t]),u*=e.shape[t];return{batchSize:c,sliceSize:u,outerSize:l,dimSize:o,outputShape:s}}
/**
* @license
* Copyright 2018 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function xp(e){try{return e.map(e=>Er(e))}catch(e){throw Error(`Failed to decode encoded string bytes into utf-8, error: ${e}`)}}function Sp(e){return e.map(e=>Tr(e))}
/**
* @license
* Copyright 2017 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
sf();
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var Cp=class e extends Error{constructor(t){super(t),Object.setPrototypeOf(this,e.prototype)}},wp=class e extends Error{constructor(t){super(t),Object.setPrototypeOf(this,e.prototype)}},q=class e extends Error{constructor(t){super(t),Object.setPrototypeOf(this,e.prototype)}},J=class e extends Error{constructor(t){super(t),Object.setPrototypeOf(this,e.prototype)}},Tp=class e extends Error{constructor(t){super(t),Object.setPrototypeOf(this,e.prototype)}},Ep=class{constructor(e){
/**
* @license
* Copyright 2022 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
this.maxEntries=e||100,this.cache=/* @__PURE__ */ new Map}get(e){let t;return this.cache.has(e)&&(t=this.cache.get(e),this.cache.delete(e),this.cache.set(e,t)),t}put(e,t){if(this.cache.has(e))this.cache.delete(e);else if(this.cache.size>=this.maxEntries){let e=this.cache.keys().next().value;this.cache.delete(e)}this.cache.set(e,t)}getMaxEntries(){return this.maxEntries}setMaxEntries(e){if(e<0)throw Error(`The maxEntries of LRU caches must be at least 0, but got ${e}.`);if(this.maxEntries>e)for(let t=0;t<this.maxEntries-e;t++){let e=this.cache.keys().next().value;this.cache.delete(e)}this.maxEntries=e}};
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Dp(e,t){if(Array.isArray(e)){let n=[];for(let r=0;r<t;r++)n=n.concat(e);return n}{let n=Array(t);return n.fill(e),n}}function Op(e,t){if(!e)throw new Tp(t)}function kp(e,t){let n=0;for(let r of e)r===t&&n++;return n}function Ap(e){return e.length===1?e[0]:e}function jp(e){return Array.isArray(e)?e:[e]}function Mp(e){let t=e.replace(/(.)([A-Z][a-z0-9]+)/g,`$1_$2`).replace(/([a-z])([A-Z])/g,`$1_$2`).toLowerCase();return t[0]===`_`?`private`+t:t}function Np(e){return e.length<=1||e.indexOf(`_`)===-1?e:e.replace(/[_]+(\w|$)/g,(e,t)=>t.toUpperCase())}let Pp={};function Fp(e){if(e==null)return null;let t={};return t.className=e.getClassName(),t.config=e.getConfig(),t}function Ip(e){if(typeof e==`object`&&e){if(Array.isArray(e))e.forEach(e=>Ip(e));else{let t=Object.keys(e);for(let n of t){let t=e[n];typeof t==`object`&&t&&(!Array.isArray(t)&&t.type===`ndarray`&&typeof t.value==`number`?e[n]=t.value:Ip(t))}}}}function Lp(e,t={},n={},r=`object`,i=!1){if(typeof e==`string`){let i=e,a;if(i in n)a=n[i];else if(i in Pp)a=Pp[i];else if(a=t[i],a==null)throw new q(`Unknown ${r}: ${e}. This may be due to one of the following reasons:\n1. The ${r} is defined in Python, in which case it needs to be ported to TensorFlow.js or your JavaScript code.\n2. The custom ${r} is defined in JavaScript, but is not registered properly with tf.serialization.registerClass().`);return a}{let a=e;if(a.className==null||a.config==null)throw new q(`${r}: Improper config format: ${JSON.stringify(a)}.\n'className' and 'config' must set.`);let o=a.className,s,c;if(o in n?[s,c]=n[o]:o in Pp?[s,c]=Pp.className:o in t&&([s,c]=t[o]),s==null)throw new q(`Unknown ${r}: ${o}. This may be due to one of the following reasons:\n1. The ${r} is defined in Python, in which case it needs to be ported to TensorFlow.js or your JavaScript code.\n2. The custom ${r} is defined in JavaScript, but is not registered properly with tf.serialization.registerClass().`);if(c!=null){let e={};for(let t of Object.keys(Pp))e[t]=Pp[t];for(let t of Object.keys(n))e[t]=n[t];let t=a.config;t.customObjects=e;let r=Object.assign({},Pp);for(let e of Object.keys(n))Pp[e]=n[e];Ip(a.config);let o=c(s,a.config,n,i);return Pp=Object.assign({},r),o}{let e=Object.assign({},Pp);for(let e of Object.keys(n))Pp[e]=n[e];let t=new s(a.config);return Pp=Object.assign({},e),t}}}function Rp(e,t){return e<t?-1:+(e>t)}function zp(e,t){return-1*Rp(e,t)}function Bp(e){if(e==null)return e;let t=[];for(let n of e)t.indexOf(n)===-1&&t.push(n);return t}function Vp(e){if(e==null)throw new q(`Invalid value in obj: ${JSON.stringify(e)}`);for(let t in e)if(e.hasOwnProperty(t))return!1;return!0}function Hp(e,t,n){if(n!=null&&e.indexOf(n)<0)throw new q(`${n} is not a valid ${t}.  Valid values are ${e} or null/undefined.`)}function Up(e,t,n=0,r=1/0){return Op(n>=0),Op(r>=n),Array.isArray(e)&&e.length>=n&&e.length<=r&&e.every(e=>typeof e===t)}function Wp(e,t){Array.isArray(e)?(h(e.length>0,()=>`${t} is unexpectedly an empty array.`),e.forEach((e,n)=>Wp(e,`element ${n+1} of ${t}`))):h(Number.isInteger(e)&&e>0,()=>`Expected ${t} to be a positive integer, but got ${Gp(e)}.`)}function Gp(e){return e===null?`null`:Array.isArray(e)?`[`+e.map(e=>Gp(e)).join(`,`)+`]`:typeof e==`string`?`"${e}"`:`${e}`}function Kp(e,t,n){let r=n==null?wr():n(),i;return(...a)=>{let o=n==null?wr():n();return o-r<t||(r=o,i=e(...a)),i}}function qp(e){return e===`relu`?`relu`:e===`linear`?`linear`:e===`elu`?`elu`:null}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
let Jp=0;function Yp(){return Jp++}const Xp={};function Zp(e=``){return e in Xp||(Xp[e]=0),Xp[e]+=1,e+Xp[e].toString()}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
const Qp=[`channelsFirst`,`channelsLast`],$p=[`nearest`,`bilinear`],em=[`valid`,`same`,`causal`],tm=[`max`,`avg`],nm=[`sum`,`mul`,`concat`,`ave`],rm=/* @__PURE__ */ new Map
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
;function im(e){Hp(Qp,`DataFormat`,e)}function am(e){Hp($p,`InterpolationFormat`,e)}function om(e){Hp(em,`PaddingMode`,e)}function sm(e){Hp(tm,`PoolMode`,e)}const cm=[];function lm(e,t){cm.push(e);try{let e=t();return cm.pop(),e}catch(e){throw cm.pop(),e}}function um(){return cm.length===0?``:cm.join(`/`)+`/`}function dm(e){if(!mm(e))throw Error(`Not a valid tensor name: '`+e+`'`);return um()+e}function fm(e){if(!mm(e))throw Error(`Not a valid tensor name: '`+e+`'`);rm.has(e)||rm.set(e,0);let t=rm.get(e);if(rm.set(e,rm.get(e)+1),t>0){let n=`${e}_${t}`;return rm.set(n,1),n}return e}const pm=/* @__PURE__ */ new RegExp(/^[A-Za-z0-9][-A-Za-z0-9\._\/]*$/);function mm(e){return!!e.match(pm)}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function hm(e){return e===parseInt(e.toString(),10)}function gm(e,t,n){t??=0,n??=e.length;let r=1;for(let i=t;i<n;++i)r*=e[i];return r}function _m(e){if(e.length===0)return NaN;let t=1/0;for(let n=0;n<e.length;n++){let r=e[n];r<t&&(t=r)}return t}function vm(e){if(e.length===0)return NaN;let t=-1/0;for(let n=0;n<e.length;n++){let r=e[n];r>t&&(t=r)}return t}function ym(e,t){if(t<e)throw new q(`end (${t}) < begin (${e}) is forbidden.`);let n=[];for(let r=e;r<t;++r)n.push(r);return n}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
let bm;function xm(){return bm??=Mi().epsilon(),bm}function Sm(){return`channelsLast`}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Cm(e,t){return L(e,t)}function wm(e,t=-1){let n=e.shape.slice();return t<0&&(t=n.length+t+1),n.splice(t,0,1),V(e,n)}function Tm(e,t){return P(()=>{if(e.shape.length!==2)throw new q(`repeat() expects a rank-2 tensor, but received a rank-${e.shape.length} tensor.`);return Nm(wm(e,1),[1,t,1])})}function Em(e){let t=[gm(e.shape)];return V(e,t)}function Dm(e){if(e.rank<=1)throw new q(`batchFlatten requires a minimum rank of 2. Got rank: ${e.rank}.`);let t=[e.shape[0],gm(e.shape,1)];return V(e,t)}function Om(e,t,n){return P(()=>{switch(e.rank){case 1:return nu(e,t,n);case 2:return iu(e,[t,0],[n,e.shape[1]]);case 3:return ou(e,[t,0,0],[n,e.shape[1],e.shape[2]]);case 4:return cu(e,[t,0,0,0],[n,e.shape[1],e.shape[2],e.shape[3]]);case 5:return xo(e,[t,0,0,0,0],[n,e.shape[1],e.shape[2],e.shape[3],e.shape[4]]);case 6:return xo(e,[t,0,0,0,0,0],[n,e.shape[1],e.shape[2],e.shape[3],e.shape[4],e.shape[5]]);default:throw new q(`sliceAlongFirstAxis() received an unsupported tensor rank: ${e.rank}`)}})}function km(e,t,n){return P(()=>{switch(e.rank){case 1:return nu(e,t,n);case 2:return iu(e,[0,t],[e.shape[0],n]);case 3:return ou(e,[0,0,t],[e.shape[0],e.shape[1],n]);case 4:return cu(e,[0,0,0,t],[e.shape[0],e.shape[1],e.shape[2],n]);default:throw new q(`sliceAlongLastAxis() received an unsupported tensor rank: ${e.rank}`)}})}function Am(e,t,n,r){return P(()=>{switch(e.rank){case 1:return nu(e,t,n);case 2:switch(r){case 1:return Om(e,t,n);case 2:return km(e,t,n);default:throw new q(`The axis is not within the rank of the tensor ${r}`)}case 3:switch(r){case 1:return Om(e,t,n);case 2:return ou(e,[0,t,0],[e.shape[0],n,e.shape[2]]);case 3:return km(e,t,n);default:throw new q(`The axis is not within the rank of the tensor ${r}`)}case 4:switch(r){case 1:return Om(e,t,n);case 2:return cu(e,[0,t,0,0],[e.shape[0],n,e.shape[2],e.shape[3]]);case 3:return cu(e,[0,0,t,0],[e.shape[0],e.shape[1],n,e.shape[3]]);case 4:return km(e,t,n);default:throw new q(`The axis is not within the rank of the tensor ${r}`)}default:throw new q(`sliceAlongLastAxis() received an unsupported tensor rank: ${e.rank}`)}})}function jm(e,t=-1){let n;return t<0&&(n=e[0].rank,t=n===0?0:n),t===e[0].rank&&(t=-1),ho(e,t)}function Mm(e,t){switch(e.rank){case 1:return Uo([e,t]);case 2:return Go([e,t],0);case 3:return qo([e,t],0);case 4:return Yo([e,t],0);default:throw new q(`concatAlongFirstAxis() received an unsupported tensor rank: ${e.rank}`)}}function Nm(e,t){if(Array.isArray(t)||(t=[t]),e.rank!==t.length)throw new q(`The length of input n (${t.length}) does not match the number of dimensions in input x (${e.rank})`);return uc(e,t)}function Pm(e,t=0,n=1,r,i){return jl(e,t,n,r,i)}function Fm(e,t,n,r){if(e.rank<2||t.rank<2)throw new J(`dot requires both inputs to be rank >= 2 but got x shape = ${e.shape} and y shape = ${t.shape}`);if(t.rank>=3&&e.shape.slice(-1)[0]!==t.shape.slice(-2)[0])throw new J(`If rank y >= 3, then the second last dim of y must equal the last dim of x but got x shape = ${e.shape} and  y shape = ${t.shape}`);if(e.rank===2&&t.rank===2)return Ju({a:e,b:t,transposeA:!1,transposeB:!1,bias:r?Rm(e.rank,r,Sm()):null,activation:n});{let i=e.shape.slice(),a=i.pop();e=V(e,[-1,a]);let o=t.shape.slice(),s=o.pop(),c=o.pop(),l=[...o,s],u=Array.from({length:t.rank},(e,n)=>n===0?t.rank-2:n<=t.rank-2?n-1:n);t=V(G(t,u),[c,-1]);let d=[...i,...l];return V(Ju({a:e,b:t,transposeA:!1,transposeB:!1,bias:r?Rm(e.rank,r,Sm()):null,activation:n}),d)}}function Im(e,t,n){return P(()=>(t=Array.isArray(t)?yu(t,`int32`):L(t,`int32`),gc(e,t,n)))}function Lm(e){return B(e,e)}function Rm(e,t,n){let r=t.shape;if(t.rank!==1&&t.rank!==e)throw new q(`Unexpected bias dimensions: ${t.rank}; expected it to be 1 or ${e}`);if(e===5){if(n===`channelsFirst`)return r.length===1?V(t,[1,r[0],1,1,1]):V(t,[1,r[3],r[0],r[1],r[2]]);if(n===`channelsLast`)return r.length===1?V(t,[1,1,1,1,r[0]]):V(t,[1].concat(r))}else if(e===4){if(n===`channelsFirst`)return r.length===1?V(t,[1,r[0],1,1]):V(t,[1,r[2],r[0],r[1]]);if(n===`channelsLast`)return r.length===1?V(t,[1,1,1,r[0]]):V(t,[1].concat(r))}else if(e===3){if(n===`channelsFirst`)return r.length===1?V(t,[1,r[0],1]):V(t,[1,r[1],r[0]]);if(n===`channelsLast`)return r.length===1?V(t,[1,1,r[0]]):V(t,[1].concat(r))}else if(e<3)return t;throw new q(`Unsupported input rank by biasAdd: ${t.rank}`)}function zm(e,t,n){return P(()=>(n??=Sm(),im(n),R(e,Rm(e.rank,t,n))))}function Bm(e,t=1){if(t!==1)throw new J(`Support for alpha values other than 1 (${t}) is not implemented yet.`);return Ns(e)}function Vm(e){return P(()=>z(e,R(Ia(e),1)))}function Hm(e,t,n,r){return P(()=>Pu(e,t,n,r))}function Um(e){return P(()=>{let t=R(.5,B(.2,e));return Vo(t,0,1)})}function Wm(e,t,n=!1){return n?e():t()}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
const Gm=[`fanIn`,`fanOut`,`fanAvg`],Km=[`normal`,`uniform`,`truncatedNormal`];
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function qm(e){Hp(Gm,`FanMode`,e)}function Jm(e){Hp(Km,`Distribution`,e)}var Ym=class extends Yd{fromConfigUsesCustomObjects(){return!1}getConfig(){return{}}},Xm=class extends Ym{apply(e,t){return nl(e,t)}};Xm.className=`Zeros`,K(Xm);var Zm=class extends Ym{apply(e,t){return rl(e,t)}};Zm.className=`Ones`,K(Zm);var Qm=class extends Ym{constructor(e){if(super(),typeof e!=`object`)throw new q(`Expected argument of type ConstantConfig but got ${e}`);if(e.value===void 0)throw new q(`config must have value set but got ${e}`);this.value=e.value}apply(e,t){return P(()=>B(Xs(this.value),rl(e,t)))}getConfig(){return{value:this.value}}};Qm.className=`Constant`,K(Qm);var $m=class extends Ym{constructor(e){super(),this.DEFAULT_MINVAL=-.05,this.DEFAULT_MAXVAL=.05,this.minval=e.minval||this.DEFAULT_MINVAL,this.maxval=e.maxval||this.DEFAULT_MAXVAL,this.seed=e.seed}apply(e,t){return Nl(e,this.minval,this.maxval,t,this.seed)}getConfig(){return{minval:this.minval,maxval:this.maxval,seed:this.seed}}};$m.className=`RandomUniform`,K($m);var eh=class extends Ym{constructor(e){super(),this.DEFAULT_MEAN=0,this.DEFAULT_STDDEV=.05,this.mean=e.mean||this.DEFAULT_MEAN,this.stddev=e.stddev||this.DEFAULT_STDDEV,this.seed=e.seed}apply(e,t){if(t||=`float32`,t!==`float32`&&t!==`int32`)throw new J(`randomNormal does not support dType ${t}.`);return Pm(e,this.mean,this.stddev,t,this.seed)}getConfig(){return{mean:this.mean,stddev:this.stddev,seed:this.seed}}};eh.className=`RandomNormal`,K(eh);var th=class extends Ym{constructor(e){super(),this.DEFAULT_MEAN=0,this.DEFAULT_STDDEV=.05,this.mean=e.mean||this.DEFAULT_MEAN,this.stddev=e.stddev||this.DEFAULT_STDDEV,this.seed=e.seed}apply(e,t){if(t||=`float32`,t!==`float32`&&t!==`int32`)throw new J(`truncatedNormal does not support dType ${t}.`);return wu(e,this.mean,this.stddev,t,this.seed)}getConfig(){return{mean:this.mean,stddev:this.stddev,seed:this.seed}}};th.className=`TruncatedNormal`,K(th);var nh=class extends Ym{constructor(e){super(),this.gain=e.gain==null?1:e.gain}apply(e,t){return P(()=>{if(e.length!==2||e[0]!==e[1])throw new q(`Identity matrix initializer can only be used for 2D square matrices.`);return B(this.gain,fc(e[0]))})}getConfig(){return{gain:this.gain}}};nh.className=`Identity`,K(nh);function rh(e,t=`channelsLast`){let n,r;if(im(t),e.length===2)n=e[0],r=e[1];else if([3,4,5].indexOf(e.length)!==-1){if(t===`channelsFirst`){let t=gm(e,2);n=e[1]*t,r=e[0]*t}else if(t===`channelsLast`){let t=gm(e,0,e.length-2);n=e[e.length-2]*t,r=e[e.length-1]*t}}else{let t=gm(e);n=Math.sqrt(t),r=Math.sqrt(t)}return[n,r]}var ih=class extends Ym{constructor(e){if(super(),e.scale<0)throw new q(`scale must be a positive float. Got: ${e.scale}`);this.scale=e.scale==null?1:e.scale,this.mode=e.mode==null?`fanIn`:e.mode,qm(this.mode),this.distribution=e.distribution==null?`normal`:e.distribution,Jm(this.distribution),this.seed=e.seed}apply(e,t){let n=rh(e),r=n[0],i=n[1],a=this.scale;if(this.mode===`fanIn`?a/=Math.max(1,r):this.mode===`fanOut`?a/=Math.max(1,i):a/=Math.max(1,(r+i)/2),this.distribution===`normal`){let n=Math.sqrt(a);if(t||=`float32`,t!==`float32`&&t!==`int32`)throw new J(`${this.getClassName()} does not support dType ${t}.`);return wu(e,0,n,t,this.seed)}{let n=Math.sqrt(3*a);return Nl(e,-n,n,t,this.seed)}}getConfig(){return{scale:this.scale,mode:this.mode,distribution:this.distribution,seed:this.seed}}};ih.className=`VarianceScaling`,K(ih);var ah=class extends ih{constructor(e){super({scale:1,mode:`fanAvg`,distribution:`uniform`,seed:e==null?null:e.seed})}getClassName(){return ih.className}};ah.className=`GlorotUniform`,K(ah);var oh=class extends ih{constructor(e){super({scale:1,mode:`fanAvg`,distribution:`normal`,seed:e==null?null:e.seed})}getClassName(){return ih.className}};oh.className=`GlorotNormal`,K(oh);var sh=class extends ih{constructor(e){super({scale:2,mode:`fanIn`,distribution:`normal`,seed:e==null?null:e.seed})}getClassName(){return ih.className}};sh.className=`HeNormal`,K(sh);var ch=class extends ih{constructor(e){super({scale:2,mode:`fanIn`,distribution:`uniform`,seed:e==null?null:e.seed})}getClassName(){return ih.className}};ch.className=`HeUniform`,K(ch);var lh=class extends ih{constructor(e){super({scale:1,mode:`fanIn`,distribution:`normal`,seed:e==null?null:e.seed})}getClassName(){return ih.className}};lh.className=`LeCunNormal`,K(lh);var uh=class extends ih{constructor(e){super({scale:1,mode:`fanIn`,distribution:`uniform`,seed:e==null?null:e.seed})}getClassName(){return ih.className}};uh.className=`LeCunUniform`,K(uh);var dh=class extends Ym{constructor(e){super(),this.DEFAULT_GAIN=1,this.ELEMENTS_WARN_SLOW=2e3,this.gain=e.gain==null?this.DEFAULT_GAIN:e.gain,this.seed=e.seed}apply(e,t){return P(()=>{if(e.length<2)throw new J(`Shape must be at least 2D.`);if(t!==`int32`&&t!==`float32`&&t!==void 0)throw TypeError(`Unsupported data type ${t}.`);t=t;let n=v(e.slice(0,-1)),r=e[e.length-1],i=n*r;i>this.ELEMENTS_WARN_SLOW&&console.warn(`Orthogonal initializer is being called on a matrix with more than ${this.ELEMENTS_WARN_SLOW} (${i}) elements: Slowness may result.`);let a=Pm([Math.max(r,n),Math.min(r,n)],0,1,t,this.seed),o=Kd.qr(a,!1),s=o[0],c=o[1].flatten().stridedSlice([0],[Math.min(r,n)*Math.min(r,n)],[Math.min(r,n)+1]);return s=B(s,c.sign()),n<r&&(s=s.transpose()),B(Xs(this.gain),s.reshape(e))})}getConfig(){return{gain:this.gain,seed:this.seed}}};dh.className=`Orthogonal`,K(dh);const fh={constant:`Constant`,glorotNormal:`GlorotNormal`,glorotUniform:`GlorotUniform`,heNormal:`HeNormal`,heUniform:`HeUniform`,identity:`Identity`,leCunNormal:`LeCunNormal`,leCunUniform:`LeCunUniform`,ones:`Ones`,orthogonal:`Orthogonal`,randomNormal:`RandomNormal`,randomUniform:`RandomUniform`,truncatedNormal:`TruncatedNormal`,varianceScaling:`VarianceScaling`,zeros:`Zeros`};function ph(e,t={}){return Lp(e,Xd.getMap().classNameMap,t,`initializer`)}function mh(e){return Fp(e)}function hh(e){if(typeof e==`string`){let t=e in fh?fh[e]:e;if(t===`GlorotNormal`)return new oh;if(t===`GlorotUniform`)return new ah;if(t===`HeNormal`)return new sh;if(t===`HeUniform`)return new ch;if(t===`LeCunNormal`)return new lh;if(t===`LeCunUniform`)return new uh;{let e={};return e.className=t,e.config={},ph(e)}}return e instanceof Ym?e:ph(e)}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function gh(e){return Array.isArray(e)&&Array.isArray(e[0])}function _h(e){return e.length===0?[]:Array.isArray(e[0])?e:[e]}function Y(e){let t;if(Array.isArray(e)){if(e.length!==1)throw new q(`Expected Tensor length to be 1; got ${e.length}`);t=e[0]}else t=e;return t}function X(e){if(Array.isArray(e)&&Array.isArray(e[0])){if(e.length===1)return e=e,e[0];throw new q(`Expected exactly 1 Shape; got ${e.length}`)}return e}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function vh(e){let t=0;for(let n of e)n.shape.length===0?t+=1:t+=n.shape.reduce((e,t)=>e*t);return t}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
const yh=`Variable`;var bh=class{constructor(e,t=`float32`,n=yh,r=!0,i=null){this.dtype=t??`float32`,this.shape=e.shape,this.id=Yp(),n??=yh,this.originalName=dm(n),this.name=fm(this.originalName),this.trainable_=r,this.constraint=i,this.val=ku(e,this.trainable_,this.name,this.dtype)}read(){return this.assertNotDisposed(),this.val}write(e){return this.assertNotDisposed(),xh(this.val,e),this.val.id!==e.id&&(this.val.assign(e),this.constraint!=null&&this.val.assign(this.constraint.apply(this.val))),this}dispose(){this.assertNotDisposed(),this.val.dispose()}assertNotDisposed(){if(this.val.isDisposed)throw Error(`LayersVariable ${this.name} is already disposed.`)}get trainable(){return this.trainable_}set trainable(e){this.trainable_=e,this.val.trainable=e}};function xh(e,t){if(e.shape.toString()!==t.shape.toString())throw Error(`Shape mismatch: `+JSON.stringify(e.shape)+` vs. `+JSON.stringify(t.shape))}function Sh(e){return e.map(e=>e.read())}function Ch(e){e.forEach(e=>{e[0].write(e[1])})}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var wh=class{constructor(e){this.dtype=e.dtype,this.shape=e.shape,this.ndim=e.shape==null?e.ndim:e.shape.length,this.maxNDim=e.maxNDim,this.minNDim=e.minNDim,this.axes=e.axes||{}}},Th=class{constructor(e,t,n,r,i,a,o){this.dtype=e,this.shape=t,this.sourceLayer=n,this.inputs=r,this.callArgs=i,this.outputTensorIndex=o,this.id=Yp(),a!=null&&(this.originalName=dm(a),this.name=fm(this.originalName)),this.rank=t.length}};let Eh=0;var Dh=class{constructor(e,t){this.callArgs=t,this.id=Eh++,this.outboundLayer=e.outboundLayer,this.inboundLayers=e.inboundLayers,this.nodeIndices=e.nodeIndices,this.tensorIndices=e.tensorIndices,this.inputTensors=e.inputTensors,this.outputTensors=e.outputTensors,this.inputMasks=e.inputMasks,this.outputMasks=e.outputMasks,this.inputShapes=e.inputShapes,this.outputShapes=e.outputShapes;for(let t of e.inboundLayers)t?.outboundNodes.push(this);e.outboundLayer.inboundNodes.push(this)}getConfig(){let e=[];for(let t of this.inboundLayers)t==null?e.push(null):e.push(t.name);return{outboundLayer:this.outboundLayer?this.outboundLayer.name:null,inboundLayers:e,nodeIndices:this.nodeIndices,tensorIndices:this.tensorIndices}}};let Oh=0;var Z=class extends Yd{constructor(e={}){super(),this._callHook=null,this._addedWeightNames=[],this._stateful=!1,this.id=Oh++,this.activityRegularizer=null,this.inputSpec=null,this.supportsMasking=!1,this._trainableWeights=[],this._nonTrainableWeights=[],this._losses=[],this._updates=[],this._built=!1,this.inboundNodes=[],this.outboundNodes=[];let t=e.name;if(!t){let e=this.getClassName();t=Mp(e)+`_`+Zp(e)}if(this.name=t,this.trainable_=e.trainable==null||e.trainable,e.inputShape!=null||e.batchInputShape!=null){let t;if(e.batchInputShape!=null)t=e.batchInputShape;else if(e.inputShape!=null){let n=null;e.batchSize!=null&&(n=e.batchSize),t=[n].concat(e.inputShape)}this.batchInputShape=t;let n=e.dtype;n??=e.inputDType,n??=`float32`,this.dtype=n}this.initialWeights=e.weights==null?null:e.weights,this._refCount=null,this.fastWeightInitDuringBuild=!1}static nodeKey(e,t){return e.name+`_ib-`+t.toString()}getNodeAtIndex(e,t){if(this.inboundNodes.length===0)throw new wp(`The layer has never been called and thus has no defined ${t}.`);if(this.inboundNodes.length<=e)throw new q(`Asked to get ${t} at node ${e}, but the layer has only ${this.inboundNodes.length} inbound nodes.`);return this.inboundNodes[e]}getInputAt(e){return Ap(this.getNodeAtIndex(e,`input`).inputTensors)}getOutputAt(e){return Ap(this.getNodeAtIndex(e,`output`).outputTensors)}get input(){if(this.inboundNodes.length>1)throw new Cp(`Layer ${this.name} has multiple inbound nodes, hence the notion of "layer input" is ill-defined. Use \`getInputAt(nodeIndex)\` instead.`);if(this.inboundNodes.length===0)throw new Cp(`Layer ${this.name} is not connected, no input to return.`);return Ap(this.getNodeAtIndex(0,`input`).inputTensors)}get output(){if(this.inboundNodes.length===0)throw new Cp(`Layer ${this.name} has no inbound nodes.`);if(this.inboundNodes.length>1)throw new Cp(`Layer ${this.name} has multiple inbound nodes, hence the notion of "layer output" is ill-defined. Use \`getOutputAt(nodeIndex)\` instead.`);return Ap(this.getNodeAtIndex(0,`output`).outputTensors)}get losses(){return this._losses}calculateLosses(){return this.losses.map(e=>e())}get updates(){return this._updates}get built(){return this._built}set built(e){this._built=e}get trainable(){return this.trainable_}set trainable(e){this._trainableWeights.forEach(t=>t.trainable=e),this.trainable_=e}get trainableWeights(){return this.trainable_?this._trainableWeights.filter(e=>e.trainable):[]}set trainableWeights(e){this._trainableWeights=e}get nonTrainableWeights(){return this.trainable?this._trainableWeights.filter(e=>!e.trainable).concat(this._nonTrainableWeights):this._trainableWeights.concat(this._nonTrainableWeights)}set nonTrainableWeights(e){this._nonTrainableWeights=e}get weights(){return this.trainableWeights.concat(this.nonTrainableWeights)}get stateful(){return this._stateful}resetStates(){if(!this.stateful)throw Error(`Cannot call the resetStates() method of a non-stateful Layer object.`)}assertInputCompatibility(e){let t=jp(e);if(this.inputSpec==null||this.inputSpec.length===0)return;let n=jp(this.inputSpec);if(t.length!==n.length)throw new q(`Layer ${this.name} expects ${n.length} inputs, but it received ${t.length} input tensors. Input received: ${e}`);for(let e=0;e<t.length;e++){let r=t[e],i=n[e];if(i==null)continue;let a=r.rank;if(i.ndim!=null&&a!==i.ndim)throw new q(`Input ${e} is incompatible with layer ${this.name}: expected ndim=${i.ndim}, found ndim=${a}`);if(i.maxNDim!=null&&a>i.maxNDim)throw new q(`Input ${e} is incompatible with layer ${this.name}: expected max_ndim=${i.maxNDim}, found ndim=${a}`);if(i.minNDim!=null&&a<i.minNDim)throw new q(`Input ${e} is incompatible with layer ${this.name}: expected min_ndim=${i.minNDim}, found ndim=${a}.`);if(i.dtype!=null&&r.dtype!==i.dtype)throw new q(`Input ${e} is incompatible with layer ${this.name} : expected dtype=${i.dtype}, found dtype=${r.dtype}.`);if(i.axes){let t=r.shape;for(let n in i.axes){let r=Number(n),a=i.axes[n],o=r>=0?t[r]:t[t.length+r];if(a!=null&&[a,null].indexOf(o)===-1)throw new q(`Input ${e} is incompatible with layer ${this.name}: expected axis ${r} of input shape to have value ${a} but got shape ${t}.`)}}if(i.shape!=null)for(let t=0;t<i.shape.length;++t){let n=i.shape[t],a=r.shape[t];if(n!=null&&a!=null&&n!==a)throw new q(`Input ${e} is incompatible with layer ${this.name}: expected shape=${i.shape}, found shape=${r.shape}.`)}}}call(e,t){return e}invokeCallHook(e,t){this._callHook!=null&&this._callHook(e,t)}setCallHook(e){this._callHook=e}clearCallHook(){this._callHook=null}apply(e,t){t||={},this.assertNotDisposed();let n=jp(e),r=Mh(e),i=Nh(e);if(r===i)throw new q(`Arguments to apply() must be all SymbolicTensors or all Tensors`);return lm(this.name,()=>{if(!this.built){this.assertInputCompatibility(e);let t=[];for(let n of jp(e))t.push(n.shape);this.build(Ap(t)),this.built=!0,this.initialWeights&&this.setWeights(this.initialWeights),this._refCount===null&&i&&(this._refCount=1)}if(this.assertInputCompatibility(e),i){let r=this.call(e,t);this.supportsMasking&&this.setMaskMetadata(e,r);let i=jp(r),a=[];for(let e of i)n.indexOf(e)!==-1&&(e=e.clone()),a.push(e);if(r=Ap(a),this.activityRegularizer!=null)throw new J(`Layer invocation in the presence of activity regularizer(s) is not supported yet.`);return r}{let n=kh(e),r=this.computeOutputShape(n),i,a=Ah(e);if(this.warnOnIncompatibleInputShape(Array.isArray(e)?n[0]:n),i=r!=null&&r.length>0&&Array.isArray(r[0])?r.map((n,r)=>new Th(a,n,this,jp(e),t,this.name,r)):new Th(a,r,this,jp(e),t,this.name),this.addInboundNode(e,i,null,null,n,r,t),this._refCount++,this.activityRegularizer!=null)throw new J(`Layer invocation in the presence of activity regularizer(s) is not supported yet.`);return i}})}warnOnIncompatibleInputShape(e){if(this.batchInputShape!=null){if(e.length!==this.batchInputShape.length)console.warn(`The rank of the input tensor provided (shape: ${JSON.stringify(e)}) does not match that of the batchInputShape (${JSON.stringify(this.batchInputShape)}) of the layer ${this.name}`);else{let t=!1;this.batchInputShape.forEach((n,r)=>{n!=null&&e[r]!=null&&e[r]!==n&&(t=!0)}),t&&console.warn(`The shape of the input tensor (${JSON.stringify(e)}) does not match the expectation of layer ${this.name}: ${JSON.stringify(this.batchInputShape)}`)}}}get outputShape(){if(this.inboundNodes==null||this.inboundNodes.length===0)throw new Cp(`The layer ${this.name} has never been called and thus has no defined output shape.`);let e=[];for(let t of this.inboundNodes){let n=JSON.stringify(t.outputShapes);e.indexOf(n)===-1&&e.push(n)}if(e.length===1){let e=this.inboundNodes[0].outputShapes;return Array.isArray(e)&&Array.isArray(e[0])&&e.length===1?e[0]:e}throw new Cp(`The layer ${this.name} has multiple inbound nodes with different output shapes. Hence the notion of "output shape" is ill-defined for the layer.`)}countParams(){if(!this.built)throw new wp(`You tried to call countParams() on ${this.name}, but the layer is not built yet. Build it first by calling build(batchInputShape).`);return vh(this.weights)}build(e){this.built=!0}getWeights(e=!1){return Sh(e?this.trainableWeights:this.weights)}setWeights(e){P(()=>{let t=this.weights;if(t.length!==e.length)throw new q(`You called setWeights(weights) on layer "${this.name}" with a weight list of length ${e.length}, but the layer was expecting ${t.length} weights. Provided weights: ${e}...`);if(t.length===0)return;let n=[],r=Sh(t);for(let i=0;i<r.length;++i){let a=r[i],o=t[i],s=e[i];if(!y(a.shape,s.shape))throw new q(`Layer weight shape ${a.shape} not compatible with provided weight shape ${s.shape}`);n.push([o,s])}Ch(n)})}addWeight(e,t,n,r,i,a,o,s){if(this._addedWeightNames.indexOf(e)!==-1)throw new q(`Duplicate weight name ${e} for layer ${this.name}`);this._addedWeightNames.push(e),n??=`float32`,this.fastWeightInitDuringBuild&&(r=s==null?hh(`zeros`):s());let c=r.apply(t,n),l=new bh(c,n,e,a,o);return c.dispose(),i!=null&&this.addLoss(()=>i.apply(l.read())),a??=!0,a?this._trainableWeights.push(l):this._nonTrainableWeights.push(l),l}setFastWeightInitDuringBuild(e){this.fastWeightInitDuringBuild=e}addLoss(e){e==null||Array.isArray(e)&&e.length===0||(e=jp(e),this._losses!==void 0&&this._losses!==null&&this.losses.push(...e))}computeOutputShape(e){return e}computeMask(e,t){if(!this.supportsMasking){if(t!=null){if(Array.isArray(t))t.forEach(e=>{if(e!=null)throw TypeError(`Layer ${this.name} does not support masking, but was passed an inputMask.`)});else throw TypeError(`Layer ${this.name} does not support masking, but was passed an inputMask.`)}return null}return t}setMaskMetadata(e,t,n){if(!this.supportsMasking)return;let r=this.computeMask(e,n),i=jp(t),a=jp(r);if(i.length!==a.length)throw Error(`${this.name} outputs ${i.length} tensors but ${i.length} masks for those tensors`);for(let e=0;e<i.length;e++)i[e].kerasMask=a[e]}addInboundNode(e,t,n,r,i,a,o=null){let s=jp(e);t=jp(t),n=jp(n),r=jp(r),i=_h(i),a=_h(a);let c=[],l=[],u=[];for(let e of s)c.push(e.sourceLayer),l.push(e.nodeIndex),u.push(e.tensorIndex);new Dh({outboundLayer:this,inboundLayers:c,nodeIndices:l,tensorIndices:u,inputTensors:s,outputTensors:t,inputMasks:n,outputMasks:r,inputShapes:i,outputShapes:a},o);for(let e=0;e<t.length;e++)t[e].sourceLayer=this,t[e].nodeIndex=this.inboundNodes.length-1,t[e].tensorIndex=e}getConfig(){let e={name:this.name,trainable:this.trainable};return this.batchInputShape!=null&&(e.batchInputShape=this.batchInputShape),this.dtype!=null&&(e.dtype=this.dtype),e}disposeWeights(){return this.weights.forEach(e=>e.dispose()),this.weights.length}assertNotDisposed(){if(this._refCount===0)throw Error(`Layer '${this.name}' is already disposed.`)}dispose(){if(!this.built)throw Error(`Cannot dispose Layer ${this.name} because it has not been built yet.`);if(this._refCount===null)throw Error(`Cannot dispose Layer ${this.name} because it has not been used yet.`);this.assertNotDisposed();let e=0;return--this._refCount===0&&(e=this.disposeWeights()),{refCountAfterDispose:this._refCount,numDisposedVariables:e}}};function kh(e){e=jp(e);let t=[];for(let n of e)t.push(n.shape);return Ap(t)}function Ah(e){return`float32`}function jh(e,t,n){if((t==null||n!=null&&n>0)&&(t=e.sourceLayer,n=e.nodeIndex),t.inboundNodes.length===0)return[e];{let e=t.inboundNodes[n];if(e.inboundLayers.length===0)return e.inputTensors;{let t=[];for(let n=0;n<e.inboundLayers.length;n++){let r=e.inputTensors[n],i=e.inboundLayers[n],a=e.nodeIndices[n],o=jh(r,i,a);for(let e of o)t.indexOf(e)===-1&&t.push(e)}return t}}}function Mh(e){let t=!0;for(let n of jp(e))if(!(n instanceof Th)){t=!1;break}return t}function Nh(e){let t=!0;for(let n of jp(e))if(n instanceof Th){t=!1;break}return t}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var Ph=class extends Z{constructor(e){if(super({dtype:e.dtype,name:e.name==null?Zp(`input`).toString():e.name}),e.batchSize??=null,e.sparse??=!1,this.trainable=!1,this.built=!0,this.sparse=e.sparse,e.inputShape!=null&&e.batchInputShape!=null)throw new q(`Only provide the inputShape OR batchInputShape argument to inputLayer, not both at the same time.`);let t=e.batchInputShape;if(t==null){if(e.inputShape==null)throw new q("An InputLayer should be passed either a `batchInputShape` or an `inputShape`.");t=[e.batchSize].concat(e.inputShape)}else if(e.batchSize!=null)throw new q(`Cannot specify batchSize if batchInputShape is specified when creating an InputLayer.`);let n=e.dtype||`float32`;this.batchInputShape=t,this.dtype=n,this.inputSpec=[{shape:t}];let r=new Th(this.dtype,this.batchInputShape,this,[],{},this.name);r.nodeIndex=0,r.tensorIndex=0,new Dh({outboundLayer:this,inboundLayers:[],nodeIndices:[],tensorIndices:[],inputTensors:[r],outputTensors:[r],inputMasks:[null],outputMasks:[null],inputShapes:[t],outputShapes:[t]})}apply(e,t){throw new q(`Cannot pass any input to an InputLayer's apply() method. InputLayer name: ${this.name}`)}dispose(){return{refCountAfterDispose:this._refCount,numDisposedVariables:0}}getConfig(){return{batchInputShape:this.batchInputShape,dtype:this.dtype,sparse:this.sparse,name:this.name}}};Ph.className=`InputLayer`,K(Ph);function Fh(e){if(e.batchShape==null&&e.shape==null)throw Error("Please provide to Input either a `shape` or a `batchShape` argument. Note that `shape` does not include the batch dimension.");if(e.batchShape!=null&&e.shape!=null)throw new q("Please provide either a `shape` or `batchShape` argument to Input, but not both.");let t=e.batchShape;e.shape!=null&&t==null&&(t=[null].concat(e.shape));let n=e.dtype;return n??=`float32`,new Ph({batchInputShape:t,name:e.name,dtype:n,sparse:e.sparse}).inboundNodes[0].outputTensors[0]}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Ih(e,t){if(e.dtype==null||e.dtype===t.dtype)return t;try{return L(t,e.dtype)}catch{throw new q(`The dtype of the feed (${t.dtype}) can not be cast to the dtype of the key '${e.name}' (${e.dtype}).`)}}var Lh=class e{constructor(t){if(this.id2Value={},this.id2Mask={},this.name2Id={},t instanceof e)for(let e in t.id2Value)this.id2Value[e]=t.id2Value[e],e in t.id2Mask&&(this.id2Mask[e]=t.id2Mask[e]);else{if(t==null)return;for(let e of t)this.add(e.key,e.value)}}add(e,t,n){if(this.id2Value[e.id]==null)this.id2Value[e.id]=Ih(e,t),this.name2Id[e.name]=e.id,n!=null&&(this.id2Mask[e.id]=n);else throw new q(`Duplicate key: name=${e.name}, id=${e.id}`);return this}addFeed(e){this.add(e.key,e.value)}hasKey(e){return this.id2Value[e.id]!=null}names(){return Object.keys(this.name2Id)}getValue(e){if(e instanceof Th){if(this.id2Value[e.id]==null)throw new q(`Nonexistent key: ${e.name}`);return this.id2Value[e.id]}{let t=this.name2Id[e];if(t==null)throw new q(`Feed dict has no SymbolicTensor name: ${e}`);return this.id2Value[t]}}getMask(e){if(e instanceof Th){if(this.id2Value[e.id]==null)throw new q(`Nonexistent key: ${e.name}`);return this.id2Mask[e.id]}{let t=this.name2Id[e];if(t==null)throw new q(`Feed dict has no SymbolicTensor name: ${e}`);return this.id2Mask[t]}}disposeMasks(){this.id2Mask!=null&&F(this.id2Mask)}};const Rh=new Ep,zh=new Ep;function Bh(e){Rh?.setMaxEntries(e),zh?.setMaxEntries(e)}function Vh(e,t,n,r){let i=n!=null&&n.training,a=Array.isArray(e),o=a?e:[e],s=o.map(e=>e.name),c=[],l=t.names();for(let e of s)l.indexOf(e)===-1?c.push(null):c.push(t.getValue(e));r!=null&&(r.maxNumTensors=-1/0,r.minNumTensors=1/0);let u=s.join(`,`)+`|`+t.names().sort().join(`,`),d=Rh.get(u),f;if(d==null){let e=Hh(o,t);d=e.sorted,f=e.recipientCounts,Rh.put(u,d),zh.put(u,f)}f={},i||Object.assign(f,zh.get(u));let p=new Lh(t);for(let e=0;e<d.length;++e){if(r!=null){let e=Di().numTensors;e>r.maxNumTensors&&(r.maxNumTensors=e),e<r.minNumTensors&&(r.minNumTensors=e)}let a=d[e],o=a.sourceLayer;if(o instanceof Ph)continue;let l=[],u=[],m=[],h=!1;for(let e of a.inputs){let n=p.getValue(e),r=p.getMask(e);l.push(n),u.push(r),r!=null&&(h=!0),i||(f[e.name]--,f[e.name]===0&&!t.hasKey(e)&&s.indexOf(e.name)===-1&&!n.isDisposed&&e.sourceLayer.stateful!==!0&&m.push(n))}h&&(n||={},n.mask=u[0]);let g=jp(o.apply(l,n)),_=null;o.supportsMasking&&(_=o.computeMask(l,u));let v=Gh(a),y=Array.isArray(v)?v:[v];for(let e=0;e<y.length;++e){p.hasKey(y[e])||p.add(y[e],g[e],Array.isArray(_)?_[0]:_);let t=s.indexOf(y[e].name);t!==-1&&(c[t]=g[e])}i||F(m)}return p.disposeMasks(),a?c:c[0]}function Hh(e,t){h(e!=null&&e.length>0,()=>`Expected at least one fetch, got none`);let n=[],r={};if(e.length===1){let i=Wh(e[0],t);n=i.sorted,r=i.recipientMap}else{let i=/* @__PURE__ */ new Set;for(let a of e){let{sorted:e,recipientMap:o}=Wh(a,t);for(let t of e)i.has(t.name)||(n.push(t),i.add(t.name));for(let e in o)r[e]??(r[e]=/* @__PURE__ */ new Set),o[e].forEach(t=>r[e].add(t))}}return{sorted:n,recipientCounts:Uh(r)}}function Uh(e){let t={};for(let n in e)t[n]=e[n].size;return t}function Wh(e,t){let n=/* @__PURE__ */ new Set,r=[],i={};for(let e of t.names())n.add(e);let a=[],o=[];for(a.push(e);a.length>0;){let e=a[a.length-1];if(n.has(e.name)){a.pop();continue}let t=o[o.length-1]===a.length-1;if(e.inputs.length===0||t)a.pop(),r.push(e),n.add(e.name),t&&o.pop();else{o.push(a.length-1);for(let t of e.inputs)i[t.name]??(i[t.name]=/* @__PURE__ */ new Set),i[t.name].add(e.name),!n.has(t.name)&&a.push(t)}}return{sorted:r,recipientMap:i}}function Gh(e){let t;if(e.sourceLayer.inboundNodes.length===1)t=e.sourceLayer.output;else{let n=null;for(let t=0;t<e.sourceLayer.inboundNodes.length;++t)for(let r of e.sourceLayer.inboundNodes[t].outputTensors)if(r.id===e.id){n=t;break}t=e.sourceLayer.getOutputAt(n)}return t}
/**
* @license
* Copyright 2022 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
A().registerFlag(`TOPOLOGICAL_SORT_CACHE_MAX_ENTRIES`,()=>100,Bh);
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const Kh={kernelName:`Abs`,inputsToSave:[`x`],gradFunc:(e,t)=>{let[n]=t;return{x:()=>B(e,vu(L(n,`float32`),-1))}}},qh={kernelName:ke,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>{let t=ec(L(n,`float32`)),r=Qs(W(Xs(1),t));return Ic(z(e,r))}}}},Jh={kernelName:Ae,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>{let t=Qs(W(ec(L(n,`float32`)),1));return z(e,t)}}}},Yh={kernelName:`Add`,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n,r]=t,i=ws(n.shape,r.shape);return{a:()=>{let t=e,r=Cs(n.shape,i);return r.length>0&&(t=U(t,r)),V(t,n.shape)},b:()=>{let t=e,n=Cs(r.shape,i);return n.length>0&&(t=U(t,n)),V(t,r.shape)}}}},Xh={kernelName:je,saveAllInputs:!0,gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let n={};return t.forEach((t,r)=>{n[r]=()=>e.clone()}),n}},Zh={kernelName:Me,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>H(n)}}},Qh={kernelName:Ne,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>H(n)}}},$h={kernelName:Pe,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>z(e,Qs(W(Xs(1),ec(L(n,`float32`)))))}}},eg={kernelName:Fe,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>{let t=Qs(R(Xs(1),ec(L(n,`float32`))));return z(e,t)}}}},tg={kernelName:Re,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n,r]=t,i=ws(n.shape,r.shape);return{a:()=>{let t=R(ec(n),ec(r)),a=B(e,z(r,t)),o=Cs(n.shape,i);return o.length>0&&(a=U(a,o)),V(a,n.shape)},b:()=>{let t=R(ec(n),ec(r)),a=Ic(B(e,z(n,t))),o=Cs(r.shape,i);return o.length>0&&(a=U(a,o)),V(a,r.shape)}}}},ng={kernelName:Ie,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>z(e,R(ec(L(n,`float32`)),1))}}},rg={kernelName:Le,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>z(e,W(Xs(1),ec(L(n,`float32`))))}}};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ig(e,t,n,r,i,a){let o=M(e,`dy`,`avgPool3dGrad`),s=M(t,`input`,`avgPool3dGrad`),c=o,l=s,u=!1;s.rank===4&&(u=!0,c=V(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]]),l=V(s,[1,s.shape[0],s.shape[1],s.shape[2],s.shape[3]])),h(c.rank===5,()=>`Error in avgPool3dGrad: dy must be rank 5 but got rank ${c.rank}.`),h(l.rank===5,()=>`Error in avgPool3dGrad: input must be rank 5 but got rank ${l.rank}.`),so(`avgPool3dGrad`,i,a);let d={dy:c,input:l},f={filterSize:n,strides:r,pad:i,dimRoundingMode:a},p=j.runKernel(He,d,f);return u?V(p,[p.shape[1],p.shape[2],p.shape[3],p.shape[4]]):p}const ag=/* @__PURE__ */ N({avgPool3dGrad_:ig}),og={kernelName:Ve,inputsToSave:[`x`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r]=t,{filterSize:i,strides:a,pad:o,dimRoundingMode:s}=n;return{x:()=>ag(e,r,i,a,o,s)}}};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function sg(e,t,n,r,i){let a=M(e,`dy`,`avgPoolGrad`),o=M(t,`input`,`avgPoolGrad`);h(o.rank===a.rank,()=>`Rank of input (${o.rank}) does not match rank of dy (${a.rank})`);let s=o,c=a,l=!1;o.rank===3&&(l=!0,s=V(o,[1,o.shape[0],o.shape[1],o.shape[2]]),c=V(a,[1,a.shape[0],a.shape[1],a.shape[2]])),h(c.rank===4,()=>`Error in avgPoolGrad: dy must be rank 4 but got rank ${c.rank}.`),h(s.rank===4,()=>`Error in avgPoolGrad: input must be rank 4 but got rank ${s.rank}.`);let u={dy:c,input:s},d={filterSize:n,strides:r,pad:i},f=j.runKernel(Be,u,d);return l?V(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const cg=/* @__PURE__ */ N({avgPoolGrad_:sg}),lg={kernelName:ze,inputsToSave:[`x`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r]=t,{filterSize:i,strides:a,pad:o}=n;return{x:()=>cg(e,r,i,a,o)}}},ug={kernelName:Ue,inputsToSave:[`a`,`b`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r,i]=t,{transposeA:a,transposeB:o}=n;return!a&&!o?{a:()=>_o(e,i,!1,!0),b:()=>_o(r,e,!0,!1)}:!a&&o?{a:()=>_o(e,i,!1,!1),b:()=>_o(e,r,!0,!1)}:a&&!o?{a:()=>_o(i,e,!1,!0),b:()=>_o(r,e,!1,!1)}:{a:()=>_o(i,e,!0,!0),b:()=>_o(e,r,!0,!0)}}},dg={kernelName:We,gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{blockShape:r,crops:i}=n;return{x:()=>_l(e,r,i)}}},fg={kernelName:`BroadcastTo`,gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let r=n,i=r.inputShape,a=r.shape,o=Array.from(a);for(let e=i.length-1;e>=0;e--)if(i[e]===a[e])o[e]=1;else if(i[e]!==1)throw Error(`broadcastTo(): [${i}] cannot be broadcast to [${a}].`);let s=[];for(let e=0;e<o.length;e++)o[e]>1&&s.push(e);return{x:()=>U(e,s,!0)}}},pg={kernelName:qe,gradFunc:e=>({x:()=>e.clone()})},mg={kernelName:Je,gradFunc:e=>({x:()=>H(e)})},hg={kernelName:Ye,inputsToSave:[`x`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r]=t,{clipValueMin:i,clipValueMax:a}=n;return{x:()=>Os(Gc(bc(r,i),Oc(r,a)),e,H(e))}}},gg={kernelName:Ze,inputsToSave:[`x`],gradFunc:Kh.gradFunc},_g={kernelName:Qe,saveAllInputs:!0,gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let r=t.map(e=>e.shape),{axis:i}=n,a=C(i,t[0].shape)[0],o=r.map(e=>e[a]);return fu(e,o,a).map(e=>()=>e)}},vg={kernelName:$e,inputsToSave:[`x`,`filter`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r,i]=t,{dilations:a,strides:o,pad:s,dataFormat:c}=n;return h(ro(a),()=>`Error in gradient of conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${a}'`),{x:()=>ts(r.shape,e,i,o,s,c),filter:()=>Iu(r,e,i.shape,o,s,c)}}},yg={kernelName:tt,inputsToSave:[`dy`,`filter`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r,i]=t,{strides:a,pad:o,dataFormat:s,dimRoundingMode:c}=n;return{dy:()=>Zo(e,i,a,o,s,1,c),filter:()=>Iu(e,r,i.shape,a,o,s,c)}}};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function bg(e,t,n,r,i){let a=e;e.rank===4&&(a=V(e,[1,e.shape[0],e.shape[1],e.shape[2],e.shape[3]]));let o=t;o.rank===4&&(o=V(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]])),h(a.rank===5,()=>`Error in conv3dDerFilter: input must be rank 5, but got shape ${a.shape}.`),h(o.rank===5,()=>`Error in conv3dDerFilter: dy must be rank 5, but got shape ${o.shape}.`),h(n.length===5,()=>`Error in conv3dDerFilter: filterShape must be length 5, but got ${n}.`),h(a.shape[4]===n[3],()=>`Error in conv3dDerFilter: depth of input ${a.shape[4]}) must match input depth in filter (${n[3]}.`),h(o.shape[4]===n[4],()=>`Error in conv3dDerFilter: depth of dy (${o.shape[4]}) must match output depth for filter (${n[4]}).`);let s={x:a,dy:o},c={strides:r,pad:i,filterShape:n};return j.runKernel(rt,s,c)}const xg=/* @__PURE__ */ N({conv3DBackpropFilter_:bg}),Sg={kernelName:nt,inputsToSave:[`x`,`filter`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{dilations:r,strides:i,pad:a}=n;h(ro(r),()=>`Error in gradient of conv3D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${r}'`);let[o,s]=t;return{x:()=>ss(o.shape,e,s,i,a),filter:()=>xg(o,e,s.shape,i,a)}}},Cg={kernelName:`Cos`,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>B(Ic(Ql(L(n,`float32`))),e)}}},wg={kernelName:at,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>B(eu(L(n,`float32`)),e)}}},Tg={kernelName:st,inputsToSave:[`x`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r]=t,{axis:i,exclusive:a,reverse:o}=n;return{x:()=>{let t=Vs([i],r.rank),n=_s(e,i,a,!o);return t!=null&&(n=G(n,t)),n}}}},Eg={kernelName:ut,inputsToSave:[`x`,`filter`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{dilations:r,strides:i,pad:a,dimRoundingMode:o}=n,s=r??[1,1];h(ro(s),()=>`Error in gradient of depthwiseConv2dNative: dilation rates greater than 1 are not yet supported. Got dilations '${s}'`);let[c,l]=t;return h(c.rank===4,()=>`Error in gradient of depthwiseConv2dNative: input must be rank 4, but got rank ${c.rank}.`),h(l.rank===4,()=>`Error in gradient of depthwiseConv2dNative: filter must be rank 4, but got rank ${l.rank}.`),h(c.shape[3]===l.shape[2],()=>`Error in gradient of depthwiseConv2d: number of input channels (${c.shape[3]}) must match the inChannels dimension in filter ${l.shape[2]}.`),h(io(i,s),()=>`Error in gradient of depthwiseConv2d: Either strides or dilations must be  1. Got strides ${i} and dilations '${s}'.`),so(`depthwiseConv2d`,a,o),{x:()=>Ku(c.shape,e,l,i,a,s,o),filter:()=>Wu(c,e,l.shape,i,a,s,o)}}},Dg={kernelName:pt,inputsToSave:[`x`,`filter`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r,i]=t,a={x:r,filter:i,dy:e},o={x:r,filter:i,dy:e};return{x:()=>j.runKernel(mt,a,n),filter:()=>j.runKernel(ht,o,n)}}},Og={kernelName:`Elu`,outputsToSave:[!0],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t,r={dy:e,y:n};return{x:()=>j.runKernel(vt,r)}}},kg={kernelName:`Erf`,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t,r=B(oc(Ic(ec(n))),2/Math.sqrt(Math.PI));return{x:()=>B(e,r)}}},Ag={kernelName:`Exp`,outputsToSave:[!0],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>B(e,n)}}},jg={kernelName:bt,inputsToSave:[`input`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{input:()=>V(e,n.shape)}}},Mg={kernelName:xt,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>B(e,oc(n))}}},Ng={kernelName:wt,gradFunc:e=>({x:()=>H(e)})},Pg={kernelName:Tt,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n,r]=t,i=ws(n.shape,r.shape);return{a:()=>{let t=z(e,L(r,`float32`)),a=Cs(n.shape,i);return a.length>0?V(U(t,a),n.shape):t},b:()=>{let t=B(e,L(n,`float32`)),a=Cs(r.shape,i);a.length>0&&(t=V(U(t,a),r.shape));let o=ec(r);return Ic(z(t,L(o,`float32`)))}}}},Fg={kernelName:Et,inputsToSave:[`x`,`mean`,`variance`,`scale`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{varianceEpsilon:r}=n,[i,a,o,s]=t,c=s??Xs(1),l=Cs(a.shape,i.shape),u=[];if(a.rank===1){for(let e=0;e<i.shape.length-1;++e)u.push(i.shape[e]);u.push(1)}let d=W(i,a),f=B(e,c),p=Kl(R(o,Xs(r))),m=B(B(B(p,p),p),Xs(-.5));return{x:()=>a.rank===1?V(B(B(e,uc(V(p,[1,1,1,a.shape[0]]),u)),c),i.shape):V(B(B(e,p),c),i.shape),mean:()=>{let e=B(B(p,Xs(-1)),f);return a.rank===1&&(e=U(e,l)),V(e,a.shape)},variance:()=>{let e=B(B(m,d),f);return a.rank===1&&(e=U(e,l)),V(e,a.shape)},scale:()=>{let t=B(d,p),n=B(e,t);return a.rank===1&&(n=U(n,l)),V(n,a.shape)},offset:()=>{let t=e;return a.rank===1&&(t=U(t,l)),V(t,a.shape)}}}},Ig={kernelName:Dt,inputsToSave:[`x`,`indices`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r,i]=t,{axis:a,batchDims:o}=n,s=C(a,r.shape)[0],c=(e,t,n)=>()=>{let r=e.shape,i=t.size,o=r.slice(0,s),c=o.length,l=r.slice(a,r.length).slice(1),u=l.length,d=Lg(0,c),f=Lg(c+1,c+1+u),p=Rg([o,[i],l]),m=V(n,p),h=V(t,[i]),g=Rg([[c],d,f]),_=G(m,g),v=Eu(_,h,e.shape[s]),y=Hs(g);return v=G(v,y),v};if(o===1){let t=r.shape[0],n=r.split(t,0);return{x:()=>gu(n.map((t,n)=>c(t,i.slice(n,1),e.slice(n,1))())).reshape(r.shape),indices:()=>i}}return{x:c(r,i,e),indices:()=>i}}};function Lg(e,t){let n=[];for(let r=e;r<t;++r)n.push(r);return n}function Rg(e){let t=[];for(let n=0;n<e.length;++n)for(let r=0;r<e[n].length;++r)t.push(e[n][r]);return t}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const zg={kernelName:kt,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{let[n,r]=t;return{a:()=>H(n),b:()=>H(r)}}},Bg={kernelName:At,gradFunc:e=>({x:()=>L(e,`float32`)})},Vg={kernelName:Mt,gradFunc:e=>({x:()=>H(e)})},Hg={kernelName:Nt,gradFunc:e=>({x:()=>H(e)})},Ug={kernelName:Pt,gradFunc:e=>({x:()=>H(e)})},Wg={kernelName:Ft,inputsToSave:[`x`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r]=t,{alpha:i}=n,a=vc(r,0);return{x:()=>Os(a,e,B(e,i))}}},Gg={kernelName:Rt,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>z(e,R(n,1))}}},Kg={kernelName:`Log`,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>z(e,L(n,`float32`))}}},qg={kernelName:`LogSoftmax`,inputsToSave:[],outputsToSave:[!0],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r]=t,{axis:i}=n;return{logits:()=>{let t=oc(r);return W(e,B(U(e,i,!0),t))}}}};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Jg(e,t,n,r=5,i=1,a=1,o=.5){let s={x:e,y:t,dy:n},c={depthRadius:r,bias:i,alpha:a,beta:o};return j.runKernel(Ht,s,c)}const Yg=N({localResponseNormalizationBackprop_:Jg}),Xg={kernelName:`LRN`,inputsToSave:[`x`],outputsToSave:[!0],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r,i]=t,{depthRadius:a,bias:o,alpha:s,beta:c}=n;return{x:()=>Yg(r,i,e,a,o,s,c)}}};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Zg(e,t,n,r){return t.rank<n.rank&&(t=V(t,zs(t.shape,r))),e.rank<n.rank&&(e=V(e,zs(e.shape,r))),{x:()=>B(e,L(Es(n,t),e.dtype))}}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const Qg={kernelName:`Max`,inputsToSave:[`x`],outputsToSave:[!0],gradFunc:(e,t,n)=>{let{reductionIndices:r}=n,i=t[0],a=t[1],o=Zg(e,a,i,C(r,i.shape));return{x:()=>o.x()}}},$g={kernelName:Ut,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n,r]=t;return{a:()=>B(e,L(bc(n,r),`float32`)),b:()=>B(e,L(Ec(n,r),`float32`))}}};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function e_(e,t,n,r,i,a,o){let s=M(e,`dy`,`maxPool3dGrad`),c=M(t,`input`,`maxPool3dGrad`),l=M(n,`output`,`maxPool3dGrad`),u=s,d=c,f=l,p=!1;c.rank===4&&(p=!0,u=V(s,[1,s.shape[0],s.shape[1],s.shape[2],s.shape[3]]),d=V(c,[1,c.shape[0],c.shape[1],c.shape[2],c.shape[3]]),f=V(l,[1,l.shape[0],l.shape[1],l.shape[2],l.shape[3]])),h(u.rank===5,()=>`Error in maxPool3dGrad: dy must be rank 5 but got rank ${u.rank}.`),h(d.rank===5,()=>`Error in maxPool3dGrad: input must be rank 5 but got rank ${d.rank}.`),h(f.rank===5,()=>`Error in maxPool3dGrad: output must be rank 5 but got rank ${f.rank}.`),so(`maxPool3dGrad`,a,o);let m={dy:u,input:d,output:f},g={filterSize:r,strides:i,pad:a,dimRoundingMode:o},_=j.runKernel(qt,m,g);return p?V(_,[_.shape[1],_.shape[2],_.shape[3],_.shape[4]]):_}const t_=/* @__PURE__ */ N({maxPool3dGrad_:e_}),n_={kernelName:Kt,inputsToSave:[`x`],outputsToSave:[!0],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r,i]=t,{filterSize:a,strides:o,pad:s,dimRoundingMode:c}=n;return{x:()=>t_(e,r,i,a,o,s,c)}}};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function r_(e,t,n,r,i,a,o){let s=M(e,`dy`,`maxPoolGrad`),c=M(t,`input`,`maxPoolGrad`),l=M(n,`output`,`maxPoolGrad`);h(c.rank===s.rank,()=>`Rank of input (${c.rank}) does not match rank of dy (${s.rank})`),h(s.rank===4,()=>`Error in maxPoolGrad: dy must be rank 4 but got rank ${s.rank}.`),h(c.rank===4,()=>`Error in maxPoolGrad: input must be rank 4 but got rank ${c.rank}.`),so(`maxPoolGrad`,a,o);let u={dy:s,input:c,output:l},d={filterSize:r,strides:i,pad:a,dimRoundingMode:o};return j.runKernel(Gt,u,d)}const i_=/* @__PURE__ */ N({maxPoolGrad_:r_}),a_={kernelName:Wt,inputsToSave:[`x`],outputsToSave:[!0],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r,i]=t,{filterSize:a,strides:o,pad:s}=n;return{x:()=>i_(e,r,i,a,o,s)}}},o_={kernelName:Jt,inputsToSave:[`x`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r]=t,{axis:i}=n,a=C(i,r.shape),o=Rs(r.shape,a)[1],s=v(o);return{x:()=>{let t=r.shape.slice();a.forEach(e=>{t[e]=1});let n=V(e,t);return z(B(n,rl(r.shape,`float32`)),s)}}}},s_={kernelName:`Min`,inputsToSave:[`x`],outputsToSave:[!0],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{axis:r}=n,[i,a]=t,o=Zg(e,a,i,C(r,i.shape));return{x:()=>o.x()}}},c_={kernelName:Yt,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n,r]=t;return{a:()=>B(e,L(Oc(n,r),`float32`)),b:()=>B(e,L(vc(n,r),`float32`))}}},l_={kernelName:Xt,inputsToSave:[`x`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let r=t[0],{paddings:i}=n,a=i.map(e=>e[0]);return{x:()=>xo(e,a,r.shape)}}},u_={kernelName:`Mod`,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n,r]=t,i=ws(n.shape,r.shape);return{a:()=>{let t=Cs(n.shape,i);return t.length>0?V(U(e,t),n.shape):e},b:()=>{let t=B(e,Ic(mc(z(n,r)))),a=Cs(r.shape,i);return a.length>0?V(U(t,a),r.shape):t}}}},d_={kernelName:Zt,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n,r]=t,i=ws(n.shape,r.shape);return{a:()=>{let t=B(e,L(r,`float32`)),a=Cs(n.shape,i);return a.length>0?V(U(t,a),n.shape):t},b:()=>{let t=B(e,L(n,`float32`)),a=Cs(r.shape,i);return a.length>0?V(U(t,a),r.shape):t}}}},f_={kernelName:`Neg`,gradFunc:e=>({x:()=>Ic(e)})},p_={kernelName:rn,inputsToSave:[`indices`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let n=t[0];return{indices:()=>nl(n.shape,`float32`)}}},m_={kernelName:nn,gradFunc:e=>({x:()=>H(e)})},h_={kernelName:an,saveAllInputs:!0,gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{axis:r}=n;return Ou(e,r).map(e=>()=>e)}},g_={kernelName:on,inputsToSave:[`x`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let r=t[0],{paddings:i}=n,a=i.map(e=>e[0]);return{x:()=>xo(e,a,r.shape)}}},__={kernelName:`Pow`,inputsToSave:[`a`,`b`],outputsToSave:[!0],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n,r,i]=t,a=n,o=r,s=ws(a.shape,o.shape);return{a:()=>{let t=L(o,`float32`),n=B(e,B(t,Ys(a,W(t,Xs(1))))),r=Cs(a.shape,s);return r.length>0&&(n=U(n,r)),V(n,a.shape)},b:()=>{let t=vc(a,0),n=Os(t,Ac(a),H(a)),r=B(e,B(i,n)),c=Cs(o.shape,s);return c.length>0&&(r=U(r,c)),V(r,o.shape)}}}},v_={kernelName:sn,inputsToSave:[`x`,`alpha`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n,r]=t,i=vc(n,0);return{x:()=>Os(i,e,B(e,r)),alpha:()=>{let t=Os(i,H(e),B(e,n)),a=Cs(r.shape,e.shape);return a.length>0&&(t=U(t,a)),V(t,r.shape)}}}};
/**
* @license
* Copyright 2022 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function y_(e,t,n){let r=e.shape.slice();r[n]=1;let i=V(t,r),a=hs(e,n,!0,!1),o=hs(e,n,!0,!0),s=B(a,o);return B(i,s)}function b_(e,t,n){let r=e.shape.length,i=r-n.length,a=Vs(n,r),o=e;a!=null&&(o=G(e,a));let s=o.shape.slice(),c=s.splice(r-n.length,n.length).reduce((e,t)=>e*t,1);s.push(c);let l=y_(o.reshape(s),t,i);if(l=l.reshape(o.shape),a!=null){let e=Hs(a);l=G(l,e)}return l}const x_={kernelName:cn,inputsToSave:[`x`],gradFunc:(e,t,n)=>{let[r]=t,{axis:i}=n,a=[];return a=i==null?r.shape.map((e,t)=>t):typeof i==`number`?[i]:i,{x:()=>b_(r,e,a)}}},S_={kernelName:gt,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n,r]=t,i=ws(n.shape,r.shape);return{a:()=>{let t=z(e,L(r,`float32`)),a=Cs(n.shape,i);return a.length>0?V(U(t,a),n.shape):t},b:()=>{let t=B(e,L(n,`float32`)),a=Cs(r.shape,i);a.length>0&&(t=V(U(t,a),r.shape));let o=ec(r);return Ic(z(t,L(o,`float32`)))}}}},C_={kernelName:dn,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>z(e,Ic(ec(n)))}}},w_={kernelName:vn,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t,r=B(Oc(n,6),vu(n));return{x:()=>B(e,L(r,`float32`))}}},T_={kernelName:fn,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>B(e,L(vu(n),`float32`))}}},E_={kernelName:pn,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>V(e,n.shape)}}},D_={kernelName:gn,inputsToSave:[`images`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r]=t,i={dy:e,images:r};return{images:()=>j.runKernel(_n,i,n)}}},O_={kernelName:mn,inputsToSave:[`images`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r]=t,i={dy:e,images:r};return{images:()=>j.runKernel(hn,i,n)}}},k_={kernelName:yn,gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{dims:r}=n,i=C(r,e.shape);return{x:()=>Hl(e,i)}}},A_={kernelName:bn,gradFunc:e=>({x:()=>H(e)})},j_={kernelName:xn,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>Ic(z(e,B(Ys(n,1.5),2)))}}},M_={kernelName:Sn,inputsToSave:[`condition`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{condition:()=>L(H(n),`float32`),t:()=>B(e,L(n,e.dtype)),e:()=>B(e,L(qc(n),e.dtype))}}},N_={kernelName:Cn,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>{let t=vc(n,Xs(0)),r=Xs(1.7580993408473768),i=Xs(1.0507009873554805),a=B(e,i),o=B(B(e,r),oc(L(n,`float32`)));return Os(t,a,o)}}}},P_={kernelName:Dn,outputsToSave:[!0],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>B(e,B(n,W(Xs(1),n)))}}},F_={kernelName:En,gradFunc:e=>({x:()=>H(e)})},I_={kernelName:`Sin`,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>B(ds(L(n,`float32`)),e)}}},L_={kernelName:Tn,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>B(ps(L(n,`float32`)),e)}}},R_={kernelName:wn,inputsToSave:[`x`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r]=t,{begin:i,size:a}=n,o=r.shape,[s,c]=Ef(r,i,a),l=[];for(let t=0;t<e.rank;t++)l.push([s[t],o[t]-s[t]-c[t]]);return{x:()=>hl(e,l)}}},z_={kernelName:Mn,outputsToSave:[!0],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r]=t,{dim:i}=n,a=B(e,r);return{logits:()=>W(a,B(U(a,[i],!0),r))}}},B_={kernelName:On,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>B(e,yo(n))}}},V_={kernelName:An,gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{blockShape:r,paddings:i}=n;return{x:()=>To(e,r,i)}}},H_={kernelName:jn,gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{axis:r}=n;return{x:()=>ho(e,r)}}},U_={kernelName:kn,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>z(e,B(Qs(L(n,`float32`)),2))}}},W_={kernelName:Pn,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>B(e,B(L(n,`float32`),2))}}},G_={kernelName:Nn,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n,r]=t,i=Xs(2);return{a:()=>B(e,B(i,W(n,r))),b:()=>B(e,B(i,W(r,n)))}}},K_={kernelName:Un,gradFunc:e=>({x:()=>H(e)})},q_={kernelName:`Sub`,inputsToSave:[`a`,`b`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n,r]=t,i=ws(n.shape,r.shape);return{a:()=>{let t=e,r=Cs(n.shape,i);return r.length>0&&(t=U(t,r)),V(t,n.shape)},b:()=>{let t=e,n=Cs(r.shape,i);return n.length>0&&(t=U(t,n)),V(Ic(t),r.shape)}}}},J_={kernelName:`Sum`,inputsToSave:[`x`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r]=t,i=r.shape.slice(),{axis:a}=n;C(a,r.shape).forEach(e=>{i[e]=1});let o=V(e,i),s=B(o,rl(r.shape,`float32`));return{x:()=>s}}},Y_={kernelName:`Tan`,inputsToSave:[`x`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>z(e,ec(ds(n)))}}},X_={kernelName:In,outputsToSave:[!0],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>B(W(Xs(1),ec(n)),e)}}},Z_={kernelName:Ln,inputsToSave:[`x`],gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[r]=t,{reps:i}=n;return{x:()=>{let t=H(r);if(r.rank===1)for(let n=0;n<i[0];++n)t=R(t,xo(e,[n*r.shape[0]],[r.shape[0]]));else if(r.rank===2)for(let n=0;n<i[0];++n)for(let a=0;a<i[1];++a)t=R(t,xo(e,[n*r.shape[0],a*r.shape[1]],[r.shape[0],r.shape[1]]));else if(r.rank===3)for(let n=0;n<i[0];++n)for(let a=0;a<i[1];++a)for(let o=0;o<i[2];++o)t=R(t,xo(e,[n*r.shape[0],a*r.shape[1],o*r.shape[2]],[r.shape[0],r.shape[1],r.shape[2]]));else if(r.rank===4)for(let n=0;n<i[0];++n)for(let a=0;a<i[1];++a)for(let o=0;o<i[2];++o)for(let s=0;s<i[3];++s)t=R(t,xo(e,[n*r.shape[0],a*r.shape[1],o*r.shape[2],s*r.shape[3]],[r.shape[0],r.shape[1],r.shape[2],r.shape[3]]));else throw Error(`Gradient for tile operation is not implemented for rank-${r.rank} tensors yet.`);return t}}}},Q_={kernelName:zn,gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{perm:r}=n,i=Hs(r);return{x:()=>G(e,i)}}},$_={kernelName:Bn,gradFunc:(e,t,n)=>{
/**
* @license
* Copyright 2020 Google Inc. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{axis:r}=n;return{value:()=>gu(e,r)}}},ev={kernelName:Vn,inputsToSave:[`segmentIds`],gradFunc:(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let[n]=t;return{x:()=>tv(e,n)}}};function tv(e,t){let n=$c(t,H(t)),r=gc(e,n),i=bc(t,Xs(0,`int32`)),a=r.rank-i.rank;for(let e=0;e<a;++e)i=cc(i,e+1);i=Gc(i,rl(r.shape,`bool`));let o=H(r);return Os(i,r,o)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const nv=[Kh,qh,Jh,Yh,Xh,Zh,Qh,$h,eg,tg,ng,rg,og,lg,ug,dg,fg,pg,mg,hg,gg,_g,yg,vg,Sg,Cg,wg,Tg,Eg,Dg,S_,Og,kg,Ag,jg,Mg,Pg,Ng,Fg,Ig,zg,Bg,Vg,Hg,Ug,Wg,Gg,Kg,qg,Xg,Qg,Qg,$g,n_,a_,o_,s_,c_,l_,u_,d_,f_,p_,m_,h_,g_,g_,__,v_,x_,C_,w_,T_,E_,D_,O_,k_,A_,j_,M_,N_,P_,F_,I_,L_,R_,z_,B_,V_,V_,H_,H_,U_,G_,W_,K_,q_,J_,Y_,X_,Z_,Q_,$_,ev,{kernelName:Hn,gradFunc:e=>({x:()=>H(e)})}];for(let e of nv)er(e);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function rv(e,t){return P(()=>Qs(U(B(e,e),t,!0)))}var iv=class extends Yd{getConfig(){return{}}},av=class extends iv{constructor(e){super(),this.defaultMaxValue=2,this.defaultAxis=0,this.maxValue=e.maxValue==null?this.defaultMaxValue:e.maxValue,this.axis=e.axis==null?this.defaultAxis:e.axis}apply(e){return P(()=>{let t=rv(e,this.axis),n=Vo(t,0,this.maxValue);return B(e,z(n,R(xm(),t)))})}getConfig(){return{maxValue:this.maxValue,axis:this.axis}}};av.className=`MaxNorm`,K(av);var ov=class extends iv{constructor(e){super(),this.defaultAxis=0,this.axis=e.axis==null?this.defaultAxis:e.axis}apply(e){return P(()=>z(e,R(xm(),rv(e,this.axis))))}getConfig(){return{axis:this.axis}}};ov.className=`UnitNorm`,K(ov);var sv=class extends iv{apply(e){return Rl(e)}};sv.className=`NonNeg`,K(sv);var cv=class extends iv{constructor(e){super(),this.defaultMinValue=0,this.defaultMaxValue=1,this.defaultRate=1,this.defaultAxis=0,this.minValue=e.minValue==null?this.defaultMinValue:e.minValue,this.maxValue=e.maxValue==null?this.defaultMaxValue:e.maxValue,this.rate=e.rate==null?this.defaultRate:e.rate,this.axis=e.axis==null?this.defaultAxis:e.axis}apply(e){return P(()=>{let t=rv(e,this.axis),n=R(B(this.rate,Vo(t,this.minValue,this.maxValue)),B(1-this.rate,t));return B(e,z(n,R(xm(),t)))})}getConfig(){return{minValue:this.minValue,maxValue:this.maxValue,rate:this.rate,axis:this.axis}}};cv.className=`MinMaxNorm`,K(cv);const lv={maxNorm:`MaxNorm`,minMaxNorm:`MinMaxNorm`,nonNeg:`NonNeg`,unitNorm:`UnitNorm`};function uv(e){return Fp(e)}function dv(e,t={}){return Lp(e,Xd.getMap().classNameMap,t,`constraint`)}function fv(e){return e==null?null:typeof e==`string`?dv({className:e in lv?lv[e]:e,config:{}}):e instanceof iv?e:dv(e)}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
async function pv(e){if(e==null)return;let t=[],n=[],r=[];for(let i in e){let a=e[i];if(typeof a!=`number`){let e=a;t.push(e.data()),n.push(i),r.push(e)}}if(t.length>0){let i=await Promise.all(t);for(let t=0;t<i.length;++t)e[n[t]]=i[t][0];F(r)}}function mv(e){if(e!=null)for(let t in e){let n=e[t];typeof n!=`number`&&n.dispose()}}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var hv;(function(e){e[e.SILENT=0]=`SILENT`,e[e.VERBOSE=1]=`VERBOSE`})(hv||={});var gv=class{constructor(){this.validationData=null}setParams(e){this.params=e}async onEpochBegin(e,t){}async onEpochEnd(e,t){}async onBatchBegin(e,t){}async onBatchEnd(e,t){}async onTrainBegin(e){}async onTrainEnd(e){}setModel(e){}},_v=class{constructor(e,t=10){e??=[],this.callbacks=e,this.queueLength=t}append(e){this.callbacks.push(e)}setParams(e){for(let t of this.callbacks)t.setParams(e)}setModel(e){for(let t of this.callbacks)t.setModel(e)}async onEpochBegin(e,t){t??={};for(let n of this.callbacks)await n.onEpochBegin(e,t)}async onEpochEnd(e,t){t??={};for(let n of this.callbacks)await n.onEpochEnd(e,t)}async onBatchBegin(e,t){t??={};for(let n of this.callbacks)await n.onBatchBegin(e,t)}async onBatchEnd(e,t){t??={};for(let n of this.callbacks)await n.onBatchEnd(e,t)}async onTrainBegin(e){e??={};for(let t of this.callbacks)await t.onTrainBegin(e)}async onTrainEnd(e){e??={};for(let t of this.callbacks)await t.onTrainEnd(e)}},vv=class extends gv{constructor(){super()}async onEpochBegin(e){this.seen=0,this.totals={}}async onBatchEnd(e,t){t??={};let n=t.size==null?0:t.size;this.seen+=n;for(let e in t){let r=t[e];if(typeof r==`number`)this.totals.hasOwnProperty(e)||(this.totals[e]=0),this.totals[e]=this.totals[e]+r*n;else{let t;e in this.totals?t=this.totals[e]:this.totals[e]=0;let i=P(()=>R(this.totals[e],B(r,n)));this.totals[e]=i,t?.dispose()}}}async onEpochEnd(e,t){if(t!=null)for(let e of this.params.metrics)this.totals[e]!=null&&(typeof this.totals[e]==`number`?t[e]=this.totals[e]/this.seen:P(()=>{let n=B(z(1,this.seen),this.totals[e]);t[e]=n,this.totals[e].dispose(),Oi(t[e])}))}},yv=class extends gv{async onTrainBegin(e){this.epoch=[],this.history={}}async onEpochEnd(e,t){t??={},this.epoch.push(e);for(let e in t)this.history[e]??(this.history[e]=[]),this.history[e].push(t[e])}async syncData(){let e=[],t=[],n=[];for(let r in this.history){let i=this.history[r];for(let a=0;a<i.length;++a)if(typeof i[a]!=`number`){let o=i[a];e.push(o.data()),t.push(r),n.push(a)}}let r=await Promise.all(e);for(let e=0;e<r.length;++e)this.history[t[e]][n[e]].dispose(),this.history[t[e]][n[e]]=r[e][0]}},bv=class extends gv{constructor(e,t){if(super(),this.currentEpoch=0,this.nowFunc=e.nowFunc,this.nextFrameFunc=e.nextFrameFunc||Mf,this.yieldEvery=t||`auto`,this.yieldEvery===`auto`&&(this.yieldEvery=125),this.yieldEvery===`never`&&e.onYield!=null)throw Error("yieldEvery is `never` but you provided an `onYield` callback. Either change `yieldEvery` or remove the callback");ae(this.yieldEvery)&&(this.maybeWait=Kp(this.maybeWait.bind(this),this.yieldEvery,this.nowFunc)),this.trainBegin=e.onTrainBegin,this.trainEnd=e.onTrainEnd,this.epochBegin=e.onEpochBegin,this.epochEnd=e.onEpochEnd,this.batchBegin=e.onBatchBegin,this.batchEnd=e.onBatchEnd,this.yield=e.onYield}async maybeWait(e,t,n){let r=[];this.yield!=null&&(await pv(n),r.push(this.yield(e,t,n))),r.push(this.nextFrameFunc()),await Promise.all(r)}async onEpochBegin(e,t){this.currentEpoch=e,this.epochBegin!=null&&(await pv(t),await this.epochBegin(e,t))}async onEpochEnd(e,t){let n=[];this.epochEnd!=null&&(await pv(t),n.push(this.epochEnd(e,t))),this.yieldEvery===`epoch`&&n.push(this.nextFrameFunc()),await Promise.all(n)}async onBatchBegin(e,t){this.batchBegin!=null&&(await pv(t),await this.batchBegin(e,t))}async onBatchEnd(e,t){let n=[];this.batchEnd!=null&&(await pv(t),n.push(this.batchEnd(e,t))),this.yieldEvery===`batch`?n.push(this.nextFrameFunc()):ae(this.yieldEvery)&&n.push(this.maybeWait(this.currentEpoch,e,t)),await Promise.all(n)}async onTrainBegin(e){this.trainBegin!=null&&(await pv(e),await this.trainBegin(e))}async onTrainEnd(e){this.trainEnd!=null&&(await pv(e),await this.trainEnd(e))}};function xv(e,t){return e??={},e instanceof gv?[e]:Array.isArray(e)&&e[0]instanceof gv?e:jp(e).map(e=>new bv(e,t))}var Sv=class e{constructor(){}static registerCallbackConstructor(t,n){h(t>=0&&Number.isInteger(t),()=>`Verbosity level is expected to be an integer >= 0, but got ${t}`),e.checkForDuplicate(n),e.constructors[t]??(e.constructors[t]=[]),e.constructors[t].push(n)}static checkForDuplicate(t){for(let n in e.constructors)e.constructors[+n].forEach(e=>{if(e===t)throw new q(`Duplicate callback constructor.`)})}static clear(){e.constructors={}}static createCallbacks(t){let n=[];for(let r in e.constructors){let i=+r;t>=i&&n.push(...e.constructors[i])}return n.map(e=>new e)}};Sv.constructors={};function Cv(e,t,n,r,i,a,o,s,c){let l=new yv,u=[new vv,...Sv.createCallbacks(t)];e!=null&&u.push(...e),u.push(l);let d=new _v(u);return d.setParams({epochs:n,initialEpoch:r,samples:i,steps:a,batchSize:o,verbose:t,doValidation:s,metrics:c}),{callbackList:d,history:l}}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function wv(e,t={},n=!1){return Lp(e,Xd.getMap().classNameMap,t,`layer`,n)}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Tv(e,t){return P(()=>{e.dtype!==`float32`&&(e=L(e,`float32`));let n=U(Lm(e),t,!0),r=zo(n.shape,xm()),i=Qs($c(n,r));return z(e,i)})}function Ev(e,t){return P(()=>tl(Lm(W(t,e)),-1))}function Dv(e,t){return P(()=>tl(Ia(W(t,e)),-1))}function Ov(e,t){return P(()=>{let n=W(e,t),r=Vo(Ia(e),xm(),Number.MAX_VALUE),i=Ia(z(n,r));return B(100,tl(i,-1))})}function kv(e,t){return P(()=>{let n=Vo(t,xm(),Number.MAX_VALUE),r=Ac(R(1,n)),i=Vo(e,xm(),Number.MAX_VALUE),a=Ac(R(1,i));return tl(Lm(W(r,a)),-1)})}function Av(e,t){return P(()=>{let n=$c(0,W(1,B(e,t)));return tl(Lm(n),-1)})}function jv(e,t){return P(()=>{let n=$c(0,W(1,B(e,t)));return tl(n,-1)})}function Mv(e,t){return P(()=>{let n=U(B(e,t),-1),r=Gs(B(W(1,e),t),-1);return $c(0,R(1,W(r,n)))})}function Nv(e,t){return P(()=>{let n=Math.log(2),r=W(t,e),i=W(R(r,Rc(B(-2,r))),n);return tl(i,-1)})}function Pv(e,t,n=!1){return P(()=>{if(n)t=uu(t);else{let e=U(t,t.shape.length-1,!0);t=z(t,e)}return t=Vo(t,xm(),1-xm()),Ic(U(B(L(e,`float32`),Ac(t)),t.shape.length-1))})}function Fv(e,t,n=!1){return P(()=>{let r=L(mc(Em(e)),`int32`);t=Vo(t,xm(),1-xm());let i=t.shape;return Pv(V(dl(r,i[i.length-1]),i),t,n)})}function Iv(e,t){if(!y(e.shape,t.shape))throw new q(`logits and labels must have the same shape, but got shapes ${JSON.stringify(e.shape)} and ${JSON.stringify(t.shape)}`);return P(()=>{let n=Rl(t),r=Ic(Ia(t));return R(W(n,B(t,e)),Mc(oc(r)))})}function Lv(e,t){return P(()=>{let n;return n=Vo(t,xm(),1-xm()),n=Ac(z(n,W(1,n))),tl(Iv(e,n),-1)})}function Rv(e,t){return P(()=>{let n=Vo(e,xm(),1),r=Vo(t,xm(),1);return U(B(e,Ac(z(n,r))),-1)})}function zv(e,t){return P(()=>{let n=Ac(R(xm(),t));return tl(W(t,B(e,n)),-1)})}function Bv(e,t){return P(()=>{let n=Tv(e,-1),r=Tv(t,-1),i=B(n,r);return Ic(U(i,-1))})}const Vv={meanSquaredError:Ev,meanAbsoluteError:Dv,meanAbsolutePercentageError:Ov,meanSquaredLogarithmicError:kv,squaredHinge:Av,hinge:jv,categoricalHinge:Mv,logcosh:Nv,categoricalCrossentropy:Pv,sparseCategoricalCrossentropy:Fv,binaryCrossentropy:Lv,kullbackLeiblerDivergence:Rv,poisson:zv,cosineProximity:Bv};function Hv(e){if(typeof e==`string`){if(e in Vv)return Vv[e];let t=`Unknown loss ${e}`;throw e.toLowerCase().includes(`softmaxcrossentropy`)&&(t=`Unknown loss ${e}. Use "categoricalCrossentropy" as the string name for tf.losses.softmaxCrossEntropy`),new q(t)}return e}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Uv(e,t){return P(()=>{let n=B(.5,pl(t)),r=Cm(vc(t,n),e.dtype);return tl(Es(e,r),-1)})}function Wv(e,t){return P(()=>Cm(Es(Ha(e,-1),Ha(t,-1)),`float32`))}function Gv(e,t){return P(()=>L(U(Gc(Es(e,1),Es(t,1))),`float32`))}function Kv(e,t){return P(()=>L(U(Gc(Es(e,0),Es(t,1))),`float32`))}function qv(e,t){return P(()=>{let n=Gv(e,t),r=Kv(e,t),i=R(n,r);return L(Os(vc(i,0),z(n,i),0),`float32`)})}function Jv(e,t){return Lv(e,t)}function Yv(e,t){return e.rank===t.rank&&(e=mu(e,[e.rank-1])),t=Ha(t,-1),t.dtype!==e.dtype&&(t=L(t,e.dtype)),L(Es(e,t),`float32`)}const Xv=Ev,Zv=Ev,Qv=Dv,$v=Dv,ey=Ov,ty=Ov,ny=Pv,ry=Bv,iy=Fv,ay={binaryAccuracy:Uv,categoricalAccuracy:Wv,precision:qv,categoricalCrossentropy:ny,sparseCategoricalCrossentropy:iy,mse:Xv,MSE:Zv,mae:Qv,MAE:$v,mape:ey,MAPE:ty,cosine:ry};function oy(e){if(typeof e==`string`&&e in ay)return ay[e];if(typeof e!=`string`&&e!=null)return e;throw new q(`Unknown metric ${e}`)}function sy(e){if(Op(e!==null,`Unknown LossOrMetricFn ${e}`),typeof e==`string`)return e;{let t;for(let n of Object.keys(Vv))if(Vv[n]===e){t=n;break}if(t!==void 0)return t;for(let n of Object.keys(ay))if(ay[n]===e){t=n;break}return t===void 0?e.name:t}}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function cy(e){let t={Adagrad:()=>Af.adagrad(.01),Adadelta:()=>Af.adadelta(1,.95,xm()),Adam:()=>Af.adam(.001,.9,.999,xm()),Adamax:()=>Af.adamax(.002,.9,.999,xm(),0),RMSProp:()=>Af.rmsprop(.001,.9,0,xm()),SGD:()=>Af.sgd(.01)};if(t.adagrad=t.Adagrad,t.adadelta=t.Adadelta,t.adam=t.Adam,t.adamax=t.Adamax,t.rmsprop=t.RMSProp,t.sgd=t.SGD,e in t)return t[e]();throw new q(`Unknown Optimizer ${e}`)}
/**
* @license
* Copyright 2019 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function ly(e,t,n=!1){if(typeof e!=`object`||!e||Object.getPrototypeOf(e)!==Object.prototype||!uy(e))throw Error(`User-defined metadata is expected to be a JSON object, but is not.`);if(n){let n=JSON.stringify(e);n.length>1048576&&console.warn(`User-defined metadata of model "${t}" is too large in size (length=${n.length} when serialized). It is not recommended to store such large objects in user-defined metadata. Please make sure its serialized length is <= 1048576.`)}}function uy(e){if(e===null)return!0;if(typeof e==`object`){if(Object.getPrototypeOf(e)===Object.prototype){let t=Object.keys(e);for(let n of t)if(typeof n!=`string`||!uy(e[n]))return!1;return!0}if(Array.isArray(e)){for(let t of e)if(!uy(t))return!1;return!0}return!1}{let t=typeof e;return t===`string`||t===`number`||t===`boolean`}}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function dy(e,t,n,r=console.log){let i=py(e),a=[`Layer (type)`,`Input Shape`,`Output shape`,`Param #`];i?(t||=90,n||=[.32,.61,.89,1]):(t||=115,n||=[.24,.48,.7,.8,1]),n[n.length-1]<=1&&(n=n.map(e=>Math.floor(t*e)));let o;if(!i){a.push(`Receives inputs`),o=[];for(let t in e.nodesByDepth)o.push(...e.nodesByDepth[t])}r(`_`.repeat(t)),my(a,n,r),r(`=`.repeat(t));let s=e.layers;for(let e=0;e<s.length;++e)i?hy(s[e],n,r):gy(s[e],n,o,r),r((e===s.length-1?`=`:`_`).repeat(t));e.checkTrainableWeightsConsistency();let c=fy(e),l=vh(e.nonTrainableWeights);r(`Total params: ${c+l}`),r(`Trainable params: ${c}`),r(`Non-trainable params: ${l}`),r(`_`.repeat(t))}function fy(e){let t;return t=e.collectedTrainableWeights==null?vh(e.trainableWeights):vh(e.collectedTrainableWeights),t}function py(e){let t=!0,n=[],r=[];for(let t in e.nodesByDepth)n.push(e.nodesByDepth[t]);for(let e of n){if(e.length>1||e.length===1&&e[0].inboundLayers.length>1){t=!1;break}r.push(...e)}if(t)for(let n of e.layers){let e=!1;for(let i of n.inboundNodes)if(r.indexOf(i)!==-1){if(e){t=!1;break}e=!0}if(!t)break}return t}function my(e,t,n=console.log){let r=``;for(let n=0;n<e.length;++n)n>0&&(r=r.slice(0,r.length-1)+` `),r+=e[n],r=r.slice(0,t[n]),r+=` `.repeat(t[n]-r.length);n(r)}function hy(e,t,n){let r,i;try{i=e.inboundNodes.map(e=>JSON.stringify(e.inputShapes)).join(`,`)}catch{i=`multiple`}try{r=JSON.stringify(e.outputShape)}catch{r=`multiple`}my([`${e.name} (${e.getClassName()})`,i,r,e.countParams().toString()],t,n)}function gy(e,t,n,r){let i,a;try{a=e.inboundNodes.map(e=>JSON.stringify(e.inputShapes)).join(`,`)}catch{a=`multiple`}try{i=JSON.stringify(e.outputShape)}catch{i=`multiple`}let o=[];for(let t of e.inboundNodes)if(!(n!=null&&n.length>0&&n.indexOf(t)===-1))for(let e=0;e<t.inboundLayers.length;++e){let n=t.inboundLayers[e].name,r=t.nodeIndices[e],i=t.tensorIndices[e];o.push(`${n}[${r}][${i}]`)}let s=e.name,c=e.getClassName(),l=o.length===0?``:o[0];my([`${s} (${c})`,a,i,e.countParams().toString(),l],t,r);for(let e=1;e<o.length;++e)my([``,``,``,``,o[e]],t,r)}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function _y(e,t,n){return(e===`inboundNodes`||e===`outputLayers`||e===`inputLayers`)&&t===0&&typeof n==`string`}function vy(e,t){if(e===null)return null;if(typeof e==`string`)return Np(e);if(typeof e==`number`||typeof e==`boolean`)return e;if(e instanceof Array){let n=[],r=e.length;for(let i=0;i<r;++i){let r=e[i];_y(t,i,r)?n.push(r):n.push(vy(r,t))}return n}{let t={};for(let n of Object.keys(e)){let r=e[n];if(n===`name`&&typeof r==`string`)t[n]=r;else{let e=Np(n);t[e]=vy(r,e)}}return t}}function yy(e,t){if(e==null)return null;if(typeof e==`string`)return Mp(e);if(typeof e==`number`||typeof e==`boolean`)return e;if(e instanceof Array){let n=[],r=e.length;for(let i=0;i<r;++i){let r=e[i];_y(t,i,r)?n.push(r):n.push(yy(r,t))}return n}{let t={};for(let n of Object.keys(e)){let r=e[n],i=Mp(n);t[i]=(n===`name`||n===`className`)&&typeof r==`string`?r:yy(r,n)}return t}}
/** @license See the LICENSE file. */
const by=`4.22.0`,xy=e=>{
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
let t=Object.keys(e);if(t.length===0)return!1;let n=t[0].split(`/`);return!isNaN(parseInt(n[n.length-1],10))};var Sy=class e extends Z{constructor(t){if(super({}),this.containerNodes=/* @__PURE__ */ new Set,this.name=t.name,this.name==null){let e=this.getClassName().toLowerCase();this.name=Zp(e)}if(this.supportsMasking=!1,this.trainable_=!0,this.inputs=Array.isArray(t.inputs)?t.inputs.slice():[t.inputs],this.outputs=Array.isArray(t.outputs)?t.outputs.slice():[t.outputs],Bp(this.inputs).length!==this.inputs.length)throw new q(`The list of inputs passed to the model is redundant. All inputs should only appear once. Found: ${this.inputs.map(e=>e.name)}`);Bp(this.outputs).length!==this.outputs.length&&console.warn(`The list of outputs passed to the model is redundant. All outputs should only appear once. Found: ${this.outputs.map(e=>e.name)}`),this.inputLayers=[],this.inputLayersNodeIndices=[],this.inputLayersTensorIndices=[],this.outputLayers=[],this.outputLayersNodeIndices=[],this.outputLayersTensorIndices=[],this.layers=[],this.internalContainerRefs=[];for(let e of this.outputs){let t=e.sourceLayer,n=e.nodeIndex,r=e.tensorIndex;this.outputLayers.push(t),this.outputLayersNodeIndices.push(n),this.outputLayersTensorIndices.push(r)}for(let e of this.inputs){let t=e.sourceLayer,n=e.nodeIndex,r=e.tensorIndex;Op(n===0,`input layer has >1 nodes`),Op(r===0,`input layer has >1 tensors`),this.inputLayers.push(t),this.inputLayersNodeIndices.push(n),this.inputLayersTensorIndices.push(r)}this.inputNames=[],this.outputNames=[],this.feedInputShapes=[],this.feedInputNames=[],this.feedOutputNames=[];for(let e=0;e<this.inputLayers.length;e++){let n=this.inputLayers[e];if(!(n instanceof Ph))throw TypeError(`Input layers to a LayersModel must be InputLayer objects. Received inputs: ${t.inputs}. Input ${e} (0-based) originates from layer type ${n.getClassName()}.`);this.inputNames.push(n.name),this.feedInputShapes.push(n.batchInputShape),this.feedInputNames.push(n.name)}for(let e of this.outputLayers)this.outputNames.push(e.name);this.internalInputShapes=this.inputs.map(e=>e.shape),this.internalOutputShapes=this.outputs.map(e=>e.shape);let n={},r={},i={},a={},o={},s=[],c=(t,n,r,i,a,l)=>{(i==null||a==null||l==null)&&(i=t.sourceLayer,a=t.nodeIndex,l=t.tensorIndex);let u=i.inboundNodes[a];if(r.indexOf(u)!==-1)throw new wp(`The tensor ${t.name} at layer "${i.name}" is part of a cycle.`);if(n.indexOf(u)!==-1)return;this.containerNodes.add(e.nodeKey(i,a)),i.id in o||(o[i.id]=Object.keys(o).length),r.indexOf(u)===-1&&r.push(u);let d=u.inboundLayers.length;for(let e=0;e<d;e++){let t=u.inputTensors[e],i=u.inboundLayers[e],a=u.nodeIndices[e],o=u.tensorIndices[e];c(t,n,r,i,a,o)}for(n.push(u);r.indexOf(u)>=0;)r.splice(r.indexOf(u),1);s.push(u)},l=[],u=[];for(let e of this.outputs)c(e,l,u);let d=s.slice().reverse();for(let e of d){r[e.id]=e,e.id in n||(n[e.id]=0);let t=n[e.id],o=i[e.outboundLayer.id]==null?0:i[e.outboundLayer.id];t=Math.max(t,o),i[e.outboundLayer.id]=t,a[e.outboundLayer.id]=e.outboundLayer,n[e.id]=t;for(let i=0;i<e.inboundLayers.length;i++){let a=e.inboundLayers[i],o=e.nodeIndices[i],s=a.inboundNodes[o],c=n[s.id]==null?0:n[s.id];n[s.id]=Math.max(t+1,c),r[s.id]=s}}let f={};for(let e in n){let t=n[e];t in f||(f[t]=[]),f[t].push(r[e])}let p={};for(let e in i){let t=i[e];t in p||(p[t]=[]),p[t].push(a[e])}let m=Object.keys(p).map(e=>parseInt(e,10)).sort(zp);this.layers=[];for(let t of m){let n=p[t];n.sort((e,t)=>{let n=o[e.id],r=o[t.id];return n<r?-1:+(n>r)});for(let t of n)t instanceof e&&this.internalContainerRefs.push(t),this.layers.push(t)}this.layersByDepth=p,m=Object.keys(f).map(e=>parseInt(e,10)).sort(zp);let h=this.inputs.slice(),g=[];for(let e of m)for(let t of f[e]){let e=t.outboundLayer;if(e!=null){for(let n of t.inputTensors)if(h.indexOf(n)===-1)throw new wp(`Graph disconnected: cannot obtain value for tensor ${n} at layer "${e.name}". The following previous layers were accessed without issue: ${g}`);for(let e of t.outputTensors)h.push(e);g.push(e.name)}}this.nodesByDepth=f;let _=this.layers.map(e=>e.name);for(let e of _){let t=_.filter(t=>t===e).length;if(t!==1)throw new wp(`The name "${e}" is used ${t} times in the model. All layer names should be unique. Layer names: `+JSON.stringify(_))}this.outboundNodes=[],this.inboundNodes=[],new Dh({outboundLayer:this,inboundLayers:[],nodeIndices:[],tensorIndices:[],inputTensors:this.inputs,outputTensors:this.outputs,inputMasks:this.inputs.map(e=>null),outputMasks:this.outputs.map(e=>null),inputShapes:this.inputs.map(e=>e.shape),outputShapes:this.outputs.map(e=>e.shape)}),this.built=!0,this._refCount=1}assertNotDisposed(){if(this._refCount===0)throw Error(`Container '${this.name}' is already disposed.`)}dispose(){this.assertNotDisposed();let e={refCountAfterDispose:null,numDisposedVariables:0};if(--this._refCount===0){for(let t of this.layers)e.numDisposedVariables+=t.dispose().numDisposedVariables;for(let t of this.internalContainerRefs)e.numDisposedVariables+=t.dispose().numDisposedVariables}return e.refCountAfterDispose=this._refCount,e}get trainable(){return this.trainable_}set trainable(e){this.layers.forEach(t=>{t._trainableWeights.forEach(t=>t.trainable=e)}),this.trainable_=e}get trainableWeights(){if(this._trainableWeights.length>0)throw new q(`Container instance unexpectedly contains _trainableWeights.The trainable weights of a Container are a union of the trainable weights of its consituent Layers. Its own _trainableWeights must remain an empty Array.`);if(!this.trainable)return[];let e=[];for(let t of this.layers)e=e.concat(t.trainableWeights);return e}get nonTrainableWeights(){let e=[];for(let t of this.layers)e.push(...t.nonTrainableWeights);if(!this.trainable){let t=[];for(let e of this.layers)t.push(...e.trainableWeights);return t.concat(e)}return e}get weights(){return this.trainableWeights.concat(this.nonTrainableWeights)}loadWeights(e,t=!0){let n={},r=0,i=xy(e);i&&this.parseWeights(e);for(let e of this.layers)for(let[t,a]of e.weights.entries()){let e=i?`${a.name.split(`/`).slice(0,-1).join(`/`)+`/`}${t}`:a.originalName;if(n[e]!=null)throw new q(`Duplicate weight name: ${e}`);n[e]=a,r++}let a=[];for(let r in e){let i=r;if(n[r]==null){let e=r.split(`/`);i=e.slice(0,-2).concat([e[e.length-1]]).join(`/`)}if(n[i]!=null)a.push([n[i],e[r]]);else if(t)throw new q(`Provided weight data has no target variable: ${r}`);delete n[i]}if(t){let e=[];for(let t in n)e.push(t);if(e.length>0)throw new q(`${e.length} of ${r} weights are not set: ${e}`)}Ch(a)}parseWeights(e){for(let t in Object.keys(e)){let n=t.split(`/`),r=[`vars`,`layer_checkpoint_dependencies`],i=n.map(e=>e.startsWith(`_`)?e.slice(1):e).filter(e=>!r.includes(e)).join(`/`);i!==t&&(e[i]=e[t],delete e[t])}}updatedConfig(){let e=this.getConfig(),t={};return t.className=this.getClassName(),t.config=e,t.kerasVersion=`tfjs-layers ${by}`,t.backend=`TensorFlow.js`,t}toJSON(e,t=!0){let n=yy(this.updatedConfig());return t?JSON.stringify(n):n}call(e,t){return P(()=>{e=jp(e);let n=new Lh;for(let t=0;t<this.inputs.length;++t)n.add(this.inputs[t],e[t]);return Vh(this.outputs,n,t)})}computeMask(e,t){return P(()=>{e=jp(e);let n;return n=t==null?Dp(null,e.length):jp(t),this.runInternalGraph(e,n)[1]})}computeOutputShape(e){let t=_h(e);if(t.length!==this.inputLayers.length)throw new q(`Invalid inputShape argument ${e}: model has ${this.inputLayers.length} tensor inputs.`);let n={};for(let e=0;e<t.length;e++){let r=this.inputLayers[e],i=t[e],a=r.name+`_0_0`;n[a]=i}let r=Object.keys(this.nodesByDepth).map(e=>parseInt(e,10)).sort(zp);if(r.length>1)for(let e of r){let t=this.nodesByDepth[e];for(let e of t){let t=e.outboundLayer;if(this.inputLayers.map(e=>e.id).indexOf(t.id)!==-1)continue;let r=[];for(let t=0;t<e.inboundLayers.length;t++){let i=e.inboundLayers[t],a=e.nodeIndices[t],o=e.tensorIndices[t],s=n[`${i.name}_${a}_${o}`];r.push(s)}let i=_h(t.computeOutputShape(Ap(r))),a=t.inboundNodes.indexOf(e);for(let e=0;e<i.length;e++){let r=`${t.name}_${a}_${e}`;n[r]=i[e]}}}let i=[],a=[];for(let e=0;e<this.outputLayers.length;e++){let t=this.outputLayers[e],n=this.outputLayersNodeIndices[e],r=this.outputLayersTensorIndices[e],i=`${t.name}_${n}_${r}`;a.push(i)}for(let e=0;e<a.length;e++){let t=a[e];Op(t in n),i.push(n[t])}return Ap(i)}runInternalGraph(e,t){t??=Dp(null,e.length);let n={};for(let r=0;r<this.inputs.length;++r){let i=this.inputs[r],a=e[r],o=t[r];n[i.id]=[a,o]}let r=Object.keys(this.nodesByDepth).map(e=>parseInt(e,10)).sort(zp);for(let e of r){let t=this.nodesByDepth[e];for(let e of t){let t=e.outboundLayer,r=e.inputTensors,i=e.outputTensors,a=[];for(let e of r)e.id in n&&a.push(n[e.id]);if(a.length===r.length){let r={},o,s,c,l;if(e.callArgs!=null&&(r=e.callArgs),a.length===1){let[e,n]=a[0];r.mask??(r.mask=n),c=jp(t.call(e,r)),l=jp(t.computeMask(e,n)),o=[e],s=[n]}else o=a.map(e=>e[0]),s=a.map(e=>e[1]),r.mask??(r.mask=s),c=jp(t.call(o,r)),l=jp(t.computeMask(o,s));if(t.activityRegularizer)throw new J(`LayersModel invocation with concrete Tensor value(s) in the presence of activity regularizer(s) is not supported yet.`);for(let e=0;e<i.length;++e){let t=i[e],r=c[e],a=l[e];n[t.id]=[r,a]}}}}let i=[],a=[],o=[];for(let e of this.outputs){Op(e.id in n,`Could not compute output ${e.name} : ${e.id}`);let[t,r]=n[e.id];o.push(t.shape),i.push(t),a.push(r)}return[i,a,o]}buildNodeConversionMap(t){let n={},r;for(let t of this.layers){r=+(t instanceof e);for(let i=0;i<t.inboundNodes.length;i++){let a=e.nodeKey(t,i);this.containerNodes.has(a)&&(n[a]=r,r+=1)}}return n}getLayer(e,t){if(t!=null)return this.findLayer(t);if(e==null)throw new q(`Provide either a layer name or layer index`);if(typeof e==`number`)return this.findLayer(e);for(let t of this.layers)if(t.name===e)return t;throw new q(`No such layer: ${e}`)}findLayer(e){if(this.layers.length<=e)throw new q(`Was asked to retrieve layer at index ${e}, but model only has ${this.layers.length} layer(s).`);return this.layers[e]}calculateLosses(){return P(()=>{let t=[];for(let n of this.layers)for(let r=0;r<n.inboundNodes.length;++r){let i=e.nodeKey(n,r);this.containerNodes.has(i)&&t.push(...n.calculateLosses())}return t})}getConfig(){let t={name:this.name},n=this.buildNodeConversionMap(this.layers),r=[];for(let t of this.layers){let i=t.getClassName(),a=t.getConfig(),o=[];for(let r=0;r<t.inboundNodes.length;r++){let i=t.inboundNodes[r],a=e.nodeKey(t,r),s={};if(this.containerNodes.has(a)){if(i.callArgs)try{JSON.stringify(i.callArgs),s=i.callArgs}catch{console.warn(`Layer ${t.name} was passed non-serializable keyword arguments: ${i.callArgs}. They will not be included in the serialized model (and thus will be missing at deserialization time).`),s={}}if(i.inboundLayers.length>0){let t=[];for(let r=0;r<i.inboundLayers.length;r++){let a=i.inboundLayers[r],o=i.nodeIndices[r],c=i.tensorIndices[r],l=n[e.nodeKey(a,o)];l??=0,t.push([a.name,l,c,s])}o.push(t)}}}let s={};s.name=t.name,s.className=i,s.config=a,s.inboundNodes=o,r.push(s)}t.layers=r;let i=[];for(let t=0;t<this.inputLayers.length;t++){let r=this.inputLayers[t],a=this.inputLayersNodeIndices[t],o=e.nodeKey(r,a);if(!this.containerNodes.has(o))continue;let s=n[o];s??=0;let c=this.inputLayersTensorIndices[t];i.push([r.name,s,c])}t.inputLayers=i;let a=[];for(let t=0;t<this.outputLayers.length;t++){let r=this.outputLayers[t],i=this.outputLayersNodeIndices[t],o=e.nodeKey(r,i);if(!this.containerNodes.has(o))continue;let s=n[o];s??=0;let c=this.outputLayersTensorIndices[t];a.push([r.name,s,c])}return t.outputLayers=a,t}static fromConfig(e,t,n={},r=!1){let i={},a={};function o(e,t){e.name in a?a[e.name].push(t):a[e.name]=[t]}function s(e,t){let n=[],r;for(let a of t){let s=a[0],c=a[1],l=a[2];if(r=a[3]==null?{}:a[3],!(s in i)){o(e,t);return}let u=i[s];if(u.inboundNodes.length<=c){o(e,t);return}let d=u.inboundNodes[c];n.push(d.outputTensors[l])}n.length>0&&e.apply(Ap(n),r)}function c(e){let n=e.name,a=wv(e,t.customObjects==null?{}:t.customObjects);a.setFastWeightInitDuringBuild(r),i[n]=a,e.inboundNodes.forEach(e=>{if(!(e instanceof Array))throw new q(`Corrupted configuration, expected array for nodeData: ${e}`);o(a,e)})}let l=t.name,u=t.layers;for(let e of u)c(e);for(;!Vp(a);)for(let e of u){let t=i[e.name];if(t.name in a){let e=a[t.name];delete a[t.name];for(let n of e)s(t,n)}}let d=[],f=[],p=t.inputLayers;for(let e of p){let t=e[0],n=e[1],r=e[2];Op(t in i);let a=i[t].inboundNodes[n].outputTensors;d.push(a[r])}let m=t.outputLayers;for(let e of m){let t=e[0],n=e[1],r=e[2];Op(t in i);let a=i[t].inboundNodes[n].outputTensors;f.push(a[r])}return new e({inputs:d,outputs:f,name:l})}get stateful(){if(this._stateful)throw new q(`Container instance unexpectedly has _stateful = true. The statefulness of a Container is determined by the Layers it contains. Its _stateful property must remain the default false.`);for(let e of this.layers)if(e.stateful)return!0;return!1}resetStates(){P(()=>{this.layers.forEach(e=>{e.stateful&&e.resetStates()})})}};
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Cy(e,t,n){let r=t.length;if(e==null||Array.isArray(e)&&e.length===0)return t.map(e=>null);if(r===1)return Array.isArray(e)&&e.length===1?e:typeof e==`object`&&t[0]in e?[e[t[0]]]:[e];if(Array.isArray(e)){if(e.length!==r)throw Error(`Provided ${n} is an array of ${e.length} element(s), but the model has ${r} outputs. Make sure a set of weights is provided for each model output.`);return e}if(typeof e==`object`&&Object.keys(e).length>0&&typeof e[Object.keys(e)[0]]==`object`){let n=[];return t.forEach(t=>{t in e?n.push(e[t]):n.push(null)}),n}throw Error(`The model has multiple (${r}) outputs, so ${n} must be either an array with ${r} elements or an object with ${t} keys. Provided ${n} not understood: ${JSON.stringify(e)}`)}function wy(e,t){return Cy(e,t,`classWeight`)}async function Ty(e,t,n,r){if(t!=null||r!=null)throw Error(`Support sampleWeight is not implemented yet`);if(n!=null){let t=P(()=>{if(e.shape.length===1)return Oa(e);if(e.shape.length===2){if(e.shape[1]>1)return Ha(e,1);if(e.shape[1]===1)return V(e,[e.shape[0]]);throw Error(`Encountered unexpected last-dimension size (${e.shape[1]}) during handling of class weights. The size is expected to be >= 1.`)}throw Error(`Unexpected rank of target (y) tensor (${e.rank}) during handling of class weights. The rank is expected to be 1 or 2.`)}),r=Array.from(await t.data());F(t);let i=[];return r.forEach(e=>{if(n[e]==null)throw Error(`classWeight must contain all classes in the training data. The class ${e} exists in the data but not in classWeight`);i.push(n[e])}),yu(i,`float32`)}return null}function Ey(e,t){return B(e,t)}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Dy(e,t){let n,r,i=t;n=i.xs,r=i.ys,h(n!=null&&r!=null,()=>`A Dataset iterator for fitDataset() is expected to generate objects of the form \`{xs: xVal, ys: yVal}\`, where the two values may be \`tf.Tensor\`, an array of Tensors, or a map of string to Tensor.  The provided Dataset instead generates ${t}`);let a=Oy(`input`,e.inputNames,n),o=Oy(`output`,e.outputNames,r),s=a[0].shape[0];h(a.length===e.inputs.length,()=>`LayersModel has ${e.inputs.length} inputs, but the dataset provides ${a.length} inputs.  (Expected input keys: ${JSON.stringify(e.inputNames)})`),h(o.length===e.outputs.length,()=>`LayersModel has ${e.outputs.length} outputs, but the dataset provides ${o.length} outputs.  (Expected output keys: ${JSON.stringify(e.outputNames)})`);for(let t=0;t<a.length;t++)h(a[t].shape[0]===s,()=>`Batch size mismatch: input ${e.inputNames[t]} has ${a[t].shape[0]}; expected  ${s} based on input ${e.inputNames[0]}.`);for(let t=0;t<o.length;t++)h(o[t].shape[0]===s,()=>`Batch size mismatch: output ${e.outputNames[t]} has ${o[t].shape[0]}; expected  ${s} based on input ${e.inputNames[0]}.`);return{xs:a,ys:o}}function Oy(e,t,n){if(n instanceof Gr)return[n];if(Array.isArray(n))return h(n.length===t.length,()=>`Received an array of ${n.length} Tensors, but expected ${t.length} to match the ${e} keys ${t}.`),n;{let r=[];for(let i of t){if(n[i]==null)throw new q(`The feature data generated by the dataset lacks the required ${e} key '${i}'.`);r.push(n[i])}return r}}function ky(e){if(e.length===3)throw new J(`Validation with sample weights is not implemented yet.`);return{xs:e[0],ys:e[1]}}async function Ay(e,t,n){let r=n.batchesPerEpoch!=null;if(h(e.optimizer!=null,()=>`You must compile a model before training/testing. Use LayersModel.compile(modelCompileConfig).`),h(n!=null,()=>`For fitDataset(), the 2nd argument (config) is required, but it is not provided in this call.`),h(n.epochs!=null&&n.epochs>0&&Number.isInteger(n.epochs),()=>`For fitDataset(), config.epochs is expected to be a positive integer, but got ${n.epochs}`),h(!r||n.batchesPerEpoch>0&&Number.isInteger(n.batchesPerEpoch),()=>`For fitDataset(), config.batchesPerEpoch is expected to be a positive integer if specified, but got ${n.batchesPerEpoch}`),h(n.validationSplit==null,()=>"`validationSplit` is not supported by `fitDataset()`. Use validationData instead."),e.isTraining)throw Error(`Cannot start training because another fit() call is ongoing.`);e.isTraining=!0;try{let i=n.validationData!=null,a,o;if(i){if(My(n.validationData))h(n.validationBatches==null||n.validationBatches>0&&Number.isInteger(n.validationBatches),()=>`For fitDataset() with dataset-based validation, config.validationBatches is expected not to be provided, or to be a positive integer, but got ${n.validationBatches}`);else{let e=ky(n.validationData);a=e.xs,o=e.ys}}let s=e.makeTrainFunction(),c=e.getDedupedMetricsNames(),l;l=i?c.slice().concat(c.map(e=>`val_`+e)):c.slice();let{callbackList:u,history:d}=Cv(xv(n.callbacks,n.yieldEvery),n.verbose==null?1:n.verbose,n.epochs,null,null,jy(t,n),null,i,l);u.setModel(e),e.history=d,await u.onTrainBegin(),e.stopTraining_=!1;let f=n.initialEpoch==null?0:n.initialEpoch,p=await t.iterator();for(;f<n.epochs;){let l={};await u.onEpochBegin(f);let d=0,m=0;for(r||(p=await t.iterator());!r||d<n.batchesPerEpoch;){let t=await p.next();if(r&&t.done){console.warn(`You provided \`batchesPerEpoch\` as ${n.batchesPerEpoch}, but your dataset iterator ran out of data after ${d} batches; interrupting training. Make sure that your dataset can generate at least \`batchesPerEpoch * epochs\` batches (in this case, ${n.batchesPerEpoch*n.epochs} batches). You may need to use the repeat() function when building your dataset.`);break}if(t.value!=null){let{xs:r,ys:i}=Dy(e,t.value),a={};a.batch=m,a.size=r[0].shape[0],await u.onBatchBegin(m,a);let o=[];if(n.classWeight!=null){let t=wy(n.classWeight,e.outputNames);for(let e=0;e<t.length;++e)o.push(await Ty(i[e],null,t[e]))}let l=r.concat(i).concat(o),f=s(l);F(l);for(let e=0;e<c.length;++e){let t=c[e],n=f[e];a[t]=n,Oi(n)}await u.onBatchEnd(m,a),mv(a),m++,d++}if(r?d>=n.batchesPerEpoch:t.done){if(i){let t;t=My(n.validationData)?jp(await e.evaluateDataset(n.validationData,{batches:n.validationBatches})):jp(e.evaluate(a,o,{batchSize:n.validationBatchSize==null?32:n.validationBatchSize,verbose:0}));for(let n=0;n<e.metricsNames.length;++n)l[`val_${e.metricsNames[n]}`]=t[n]}break}if(e.stopTraining_)break}if(await u.onEpochEnd(f,l),f++,e.stopTraining_)break}return await u.onTrainEnd(),await e.history.syncData(),e.history}finally{e.isTraining=!1}}function jy(e,t){let n=null;return t.batchesPerEpoch==null?Number.isFinite(e.size)&&(n=e.size):n=t.batchesPerEpoch,n}function My(e){return typeof e.iterator==`function`}function Ny(e){return typeof e.next==`function`}async function Py(e,t,n){n||={};let r=n.batches!=null,i=e.testFunction,a=[];if(n.verbose>0)throw new J(`Verbose mode is not implemented yet.`);h(!r||n.batches>0&&Number.isInteger(n.batches),()=>`Test loop expects \`batches\` to be a positive integer, but received ${JSON.stringify(n.batches)}`);let o=Ny(t)?t:await t.iterator(),s=0,c=0;for(;!r||c<n.batches;){let t=await o.next();if(a=P(()=>{if(t.value){let{xs:n,ys:r}=Dy(e,t.value),o=n.concat(r),l=P(()=>i(o));if(F(o),c===0)for(let e=0;e<l.length;++e)a.push(Xs(0));let u=o[0].shape[0];for(let e=0;e<l.length;++e){let t=l[e],n=a[e];a[e]=P(()=>R(a[e],B(u,t))),c>0&&F(n)}F(l),s+=u,++c}return a}),t.done){r&&console.warn(`Your dataset iterator ran out of data during evaluateDataset(). Interrupting evalution. Make sure that your dataset can generate at least \`batches\` batches (in this case, ${n.batches} batches). You may need to use the repeat() function when building your dataset.`);break}}for(let e=0;e<a.length;++e){let t=a[e];a[e]=z(a[e],s),F(t)}return Ap(a)}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Fy(e){h(e>0&&Number.isInteger(e),()=>`batchSize is required to be a positive integer, but got ${e}`)}function Iy(e,t,n){return e==null?[null]:Array.isArray(e)?e.map(e=>Om(e,t,n-t)):Om(e,t,n-t)}function Ly(e,t){return P(()=>e==null?null:Array.isArray(e)?e.map(e=>Ly(e,t)):Im(e,t.dtype===`int32`?t:L(t,`int32`)))}function Ry(e,t){let n=[],r=0,i=null;for(;r<e;)i=r+t,i>=e&&(i=e),n.push([r,i]),r=i;return n}function zy(e){let t=[];e instanceof Gr&&(e=[e]);for(let n=0;n<e.length;++n){let r=e[n];if(r.rank===1)t.push(wm(r,1));else if(r.rank===0)throw Error(`Expected tensor to be at least 1D, but received a 0D tensor (scalar).`);else t.push(r)}return t}function By(e,t){if(e==null)return;let n=[];if(t instanceof Gr)n.push(t.id);else if(Array.isArray(t))t.forEach(e=>n.push(e.id));else if(t!=null)for(let e in t){let r=t[e];n.push(r.id)}let r=[];if(e instanceof Gr)n.indexOf(e.id)===-1&&r.push(e);else if(Array.isArray(e))e.forEach(e=>{n.indexOf(e.id)===-1&&r.push(e)});else if(e!=null)for(let t in e){let i=e[t];n.indexOf(i.id)===-1&&r.push(i)}r.forEach(e=>{e.isDisposed||e.dispose()})}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Vy(e){return e instanceof Gr}function Hy(e){return Array.isArray(e)}function Uy(e){return!Vy(e)&&!Hy(e)}function Wy(e,t,n,r=!0,i=``){if(t==null||t.length===0){if(e!=null){let t=!1;if(Hy(e)&&e.length>0)t=!0;else if(Uy(e)){for(let n in e)if(e.hasOwnProperty(n)){t=!0;break}}else t=!0;if(t)throw new q(`Error when checking model ${i} expected no data, but got ${e}`)}return[]}if(e==null)return t.map(e=>null);let a;if(Uy(e)){e=e,a=[];for(let n of t){if(e[n]==null)throw new q(`No data provided for "${n}". Need data for each key in: ${t}`);a.push(e[n])}}else if(Hy(e)){if(e=e,e.length!==t.length)throw new q(`Error when checking model ${i}: the Array of Tensors that you are passing to your model is not the size the model expected. Expected to see ${t.length} Tensor(s), but instead got the following list of Tensor(s): ${e}`);a=e}else{if(e=e,t.length>1)throw new q(`The model ${i} expects ${t.length} Tensor(s), but only received one Tensor. Found: Tensor with shape ${e.shape}`);a=[e]}if(a=zy(a),n!=null)for(let e=0;e<t.length;++e){if(n[e]==null)continue;let o=a[e];if(o.shape.length!==n[e].length)throw new q(`Error when checking ${i}: expected ${t[e]} to have ${n[e].length} dimension(s). but got array with shape ${o.shape}`);for(let t=0;t<n[e].length;++t){if(t===0&&!r)continue;let a=o.shape[t],s=n[e][t];if(s!=null&&s>=0&&a!==s)throw new q(`${i} expected a batch of elements where each example has shape [${n[e].slice(1,n[e].length)}] (i.e.,tensor shape [*,${n[e].slice(1,n[e].length)}]) but the ${i} received an input with ${o.shape[0]} examples, each with shape [${o.shape.slice(1,o.shape.length)}] (tensor shape [${o.shape}])`)}}return a}function Gy(e,t,n){let r=Bp(e.map(e=>e.shape[0]));r.sort();let i=Bp(t.map(e=>e.shape[0]));if(i.sort(),r.length>1)throw new q(`All input Tensors (x) should have the same number of samples. Got array shapes: ${JSON.stringify(e.map(e=>e.shape))}`);if(i.length>1)throw new q(`All target Tensors (y) should have the same number of samples. Got array shapes: ${JSON.stringify(t.map(e=>e.shape))}`);if(r.length>0&&i.length>0&&!y(r,i))throw new q(`Input Tensors should have the same number of samples as target Tensors. Found ${r[0]} input sample(s) and ${i[0]} target sample(s).`)}function Ky(e,t,n){let r=[Ev,Lv,Pv];for(let i=0;i<e.length;++i){let a=e[i],o=t[i],s=n[i];if(o!=null){if(o===Pv&&a.shape[a.shape.length-1]===1)throw new q(`You are passing a target array of shape ${a.shape} while using a loss 'categorical_crossentropy'. 'categorical_crossentropy'expects targets to be binary matrices (1s and 0s) of shape [samples, classes].`);if(r.indexOf(o)!==-1){let e=a.shape.slice(1),t=s.slice(1);for(let n=0;n<e.length;++n){let r=e[n],i=t[n];if(i!=null&&r!==i)throw new q(`A target Tensor with shape ${a.shape} was passed for an output of shape ${s}, while using a loss function that expects targets to have the same shape as the output.`)}}}}}function qy(e,t,n,r=!0,i=``){let a;if(Array.isArray(e)){if(e.length!==t.length)throw new q(`Error when checking model ${i}: the Array of Tensors that you are passing to your model is not the size the the model expected. Expected to see ${t.length} Tensor(s), but instead got ${e.length} Tensors(s).`);a=e}else{if(t.length>1)throw new q(`The model expects ${t.length} ${i} Tensors, but only received one Tensor. Found: array with shape ${JSON.stringify(e.shape)}.`);a=[e]}if(n!=null)for(let e=0;e<t.length;++e){if(n[e]==null)continue;let o=a[e];if(o.shape.length!==n[e].length)throw new q(`Error when checking ${i}: expected ${t[e]} to have ${n[e].length} dimension(s), but got array with shape ${JSON.stringify(o.shape)}`);for(let a=0;a<n[e].length;++a){if(a===0&&!r)continue;let s=o.shape[a],c=n[e][a];if(c!=null&&c!==s)throw new q(`Error when checking ${i}: expected ${t[e]} to have shape ${JSON.stringify(n[e])} but got array with shape ${JSON.stringify(o.shape)}.`)}}}function Jy(e,t){if(e==null||Array.isArray(e)&&e.length===0)return t.map(e=>[]);let n;if(typeof e==`string`||typeof e==`function`)n=[e];else if(Array.isArray(e)||typeof e==`object`)n=e;else throw TypeError(`Type of metrics argument not understood. Expected an string,function, Array, or Object, found: ${e}`);if(Array.isArray(n))return t.map(e=>n);{let e=[];for(let r of t){let t=n.hasOwnProperty(r)?n[r]:[];Array.isArray(t)||(t=[t]),e.push(t)}return e}}var Yy=class extends Sy{constructor(e){super(e),this.isTraining=!1}summary(e,t,n=console.log){if(!this.built)throw new q(`This model has never been called, thus its weights have not been created yet. So no summary can be displayed. Build the model first (e.g., by calling it on some test data).`);dy(this,e,t,n)}compile(e){if(e.loss??=[],this.loss=e.loss,typeof e.optimizer==`string`)this.optimizer_=cy(e.optimizer),this.isOptimizerOwned=!0;else{if(!(e.optimizer instanceof Zd))throw new q(`User-defined optimizer must be an instance of tf.Optimizer.`);this.optimizer_=e.optimizer,this.isOptimizerOwned=!1}let t=[];if(!Array.isArray(e.loss)&&typeof e.loss!=`string`&&typeof e.loss!=`function`){e.loss=e.loss;for(let t in e.loss)if(this.outputNames.indexOf(t)===-1)throw new q(`Unknown entry in loss dictionary: "${t}". Only expected the following keys: ${this.outputNames}`);for(let n of this.outputNames)e.loss[n]??console.warn(`Output "${n}" is missing from loss dictionary. We assume this was done on purpose, and we will not be expecting data to be passed to ${n} during training`),t.push(Hv(e.loss[n]))}else if(Array.isArray(e.loss)){if(e.loss.length!==this.outputs.length)throw new q(`When passing an Array as loss, it should have one entry per model output. The model has ${this.outputs.length} output(s), but you passed loss=${e.loss}.`);t=e.loss.map(e=>Hv(e))}else{let n=Hv(e.loss);this.outputs.forEach(e=>{t.push(n)})}this.lossFunctions=t,this.feedOutputNames=[],this.feedOutputShapes=[],this.feedLossFns=[];for(let e=0;e<this.outputs.length;++e){let t=this.internalOutputShapes[e],n=this.outputNames[e];this.feedOutputNames.push(n),this.feedOutputShapes.push(t),this.feedLossFns.push(this.lossFunctions[e])}let n=[];this.metrics=e.metrics,this.metricsNames=[`loss`],this.metricsTensors=[],lm(`loss`,()=>{for(let e=0;e<this.outputs.length;++e){if(n.indexOf(e)!==-1)continue;let t=this.lossFunctions[e];this.outputs.length>1&&(this.metricsTensors.push([t,e]),this.metricsNames.push(this.outputNames[e]+`_loss`))}});let r=Jy(e.metrics,this.outputNames),i=(e,t,n)=>{this.outputNames.length>1&&(t=this.outputNames[e]+`_`+t),this.metricsNames.push(t),this.metricsTensors.push([n,e])};lm(`metric`,()=>{for(let e=0;e<this.outputs.length;++e)n.indexOf(e)===-1&&(t=>{let n,r,a;for(let o of t){if(typeof o==`string`&&[`accuracy`,`acc`,`crossentropy`,`ce`].indexOf(o)!==-1){let t=this.internalOutputShapes[e];t[t.length-1]===1||this.lossFunctions[e]===Lv?[`accuracy`,`acc`].indexOf(o)===-1?[`crossentropy`,`ce`].indexOf(o)!==-1&&(r=Jv):r=Uv:this.lossFunctions[e]===Fv?[`accuracy`,`acc`].indexOf(o)===-1?[`crossentropy`,`ce`].indexOf(o)!==-1&&(r=iy):r=Yv:[`accuracy`,`acc`].indexOf(o)===-1?[`crossentropy`,`ce`].indexOf(o)!==-1&&(r=ny):r=Wv;let i;[`accuracy`,`acc`].indexOf(o)===-1?[`crossentropy`,`ce`].indexOf(o)!==-1&&(i=`ce`):i=`acc`,a=r,n=``+i}else a=oy(o),n=``+sy(o);let t;lm(n,()=>{t=a}),i(e,n,t)}})(r[e])}),this.collectedTrainableWeights=this.trainableWeights}checkTrainableWeightsConsistency(){this.collectedTrainableWeights!=null&&this.trainableWeights.length!==this.collectedTrainableWeights.length&&console.warn("Discrepancy between trainableweights and collected trainable weights. Did you set `model.trainable` without calling `model.compile()` afterwards?")}evaluate(e,t,n={}){let r=n.batchSize==null?32:n.batchSize;Fy(r);let i=this.standardizeUserDataXY(e,t,!0,r);try{let e=i[0].concat(i[1]);this.makeTestFunction();let t=this.testFunction;return Ap(this.testLoop(t,e,r,n.verbose,n.steps))}finally{By(i[0],e),By(i[1],t)}}async evaluateDataset(e,t){return this.makeTestFunction(),Py(this,e,t)}checkNumSamples(e,t,n,r=`steps`){let i;if(n!=null){if(i=null,t!=null)throw new q(`If ${r} is set, batchSize must be null or undefined.Got batchSize = ${t}`)}else if(e!=null)i=Array.isArray(e)?e[0].shape[0]:e.shape[0];else throw new q(`Either the input data should have a defined shape, or ${r} shoud be specified.`);return i}execute(e,t){if(Array.isArray(t)&&t.length===0)throw new q("`outputs` is an empty Array, which is not allowed.");let n=Array.isArray(t),r=n?t:[t],i=this.retrieveSymbolicTensors(r),a=new Lh;if(e instanceof Gr&&(e=[e]),Array.isArray(e)){if(e.length!==this.inputs.length)throw new q(`The number of inputs provided (${e.length}) does not match the number of inputs of this model (${this.inputs.length}).`);for(let t=0;t<this.inputs.length;++t)a.add(this.inputs[t],e[t])}else for(let t of this.inputs){let n=e[t.name];if(n==null)throw new q(`No value is provided for the model's input ${t.name}`);a.add(t,n)}let o=Vh(i,a);return n?o:o[0]}retrieveSymbolicTensors(e){let t=Dp(null,e.length),n=e.length;for(let r of this.layers){let i=Array.isArray(r.output)?r.output:[r.output],a=i.map(e=>e.name);for(let r=0;r<e.length;++r){let o=a.indexOf(e[r]);if(o!==-1&&(t[r]=i[o],n--),n===0)break}if(n===0)break}if(n>0){let n=[];throw t.forEach((t,r)=>{t??n.push(e[r])}),new q(`Cannot find SymbolicTensors for output name(s): ${JSON.stringify(n)}`)}return t}predictLoop(e,t=32,n=!1){return P(()=>{let r=this.checkNumSamples(e);if(n)throw new J(`Verbose predictLoop() is not implemented yet.`);let i=Ry(r,t),a=this.outputs.map(e=>[]);for(let t=0;t<i.length;++t)P(()=>{let n=i[t][0],r=i[t][1],a=Iy(e,n,r),o=[];if(Array.isArray(a))for(let e=0;e<a.length;++e)o.push({key:this.inputs[e],value:a[e]});else o.push({key:this.inputs[0],value:a});let s=new Lh(o);return Vh(this.outputs,s)}).forEach((e,t)=>a[t].push(e));return Ap(a.map(e=>ho(e,0)))})}predict(e,t={}){let n=zy(e);qy(n,this.inputNames,this.feedInputShapes,!1);try{let e=t.batchSize==null?32:t.batchSize;return Fy(e),this.predictLoop(n,e)}finally{By(n,e)}}predictOnBatch(e){qy(e,this.inputNames,this.feedInputShapes,!0);let t=(Array.isArray(e)?e[0]:e).shape[0];return this.predictLoop(e,t)}standardizeUserDataXY(e,t,n=!0,r){if(this.optimizer_==null)throw new wp(`You must compile a model before training/testing. Use LayersModel.compile(modelCompileArgs).`);let i=[];for(let e=0;e<this.feedOutputShapes.length;++e){let t=this.feedOutputShapes[e];this.feedLossFns[e]===Fv?i.push(t.slice(0,t.length-1).concat([1])):i.push(t)}if(e=Wy(e,this.feedInputNames,this.feedInputShapes,!1,`input`),t=Wy(t,this.feedOutputNames,i,!1,`target`),Gy(e,t,null),Ky(t,this.feedLossFns,this.feedOutputShapes),this.stateful&&r!=null&&r>0&&e[0].shape[0]%r!==0)throw new q(`In a stateful network, you should only pass inputs with a number of samples that is divisible by the batch size ${r}. Found: ${e[0].shape[0]} sample(s).`);return[e,t]}async standardizeUserData(e,t,n,r,i=!0,a){let[o,s]=this.standardizeUserDataXY(e,t,i,a);if(n!=null)throw Error(`sample weight is not supported yet.`);let c=null;if(r!=null){let e=wy(r,this.outputNames);c=[];for(let t=0;t<e.length;++t)c.push(await Ty(s[t],null,e[t]))}return[o,s,c]}testLoop(e,t,n,r=0,i){return P(()=>{let a=this.checkNumSamples(t,n,i,`steps`),o=[];if(r>0)throw new J(`Verbose mode is not implemented yet.`);if(i!=null)throw new J(`steps mode in testLoop() is not implemented yet`);{let r=Ry(a,n),i=yu(ym(0,a));for(let n=0;n<r.length;++n){let a=r[n][0],s=r[n][1],c=e(Ly(t,Om(i,a,s-a)));if(n===0)for(let e=0;e<c.length;++e)o.push(Xs(0));for(let e=0;e<c.length;++e){let t=c[e];o[e]=R(o[e],B(s-a,t))}}for(let e=0;e<o.length;++e)o[e]=z(o[e],a)}return o})}getDedupedMetricsNames(){let e=this.metricsNames,t=[];for(let n=0;n<e.length;++n){let r=e[n],i=r;if(kp(e,r)>1){let t=kp(e.slice(0,n),r);i+=`_${t}`}t.push(i)}return t}makeTrainFunction(){return e=>{let t=[],n=e.slice(0,this.inputs.length),r=e.slice(this.inputs.length,this.inputs.length+this.outputs.length),i=e.slice(this.inputs.length+this.outputs.length,this.inputs.length+this.outputs.length*2),a=[],o=()=>{let e=[];for(let t=0;t<this.inputs.length;++t)e.push({key:this.inputs[t],value:n[t]});let o=new Lh(e),s=Vh(this.outputs,o,{training:!0}),c;for(let e=0;e<this.lossFunctions.length;++e){let n=this.lossFunctions[e],a=n(r[e],s[e]);i[e]!=null&&(a=Ey(a,i[e]));let o=tl(a);t.push(o),c=e===0?a:R(c,a)}for(let e=0;e<this.metricsTensors.length;++e){let n;if(this.outputs.length>1&&e<this.outputs.length)n=t[e];else{let t=this.metricsTensors[e][0],i=this.metricsTensors[e][1];n=tl(t(r[i],s[i]))}Oi(n),a.push(n)}return c=tl(c),this.calculateLosses().forEach(e=>{c=R(c,e)}),c},s=this.collectedTrainableWeights.map(e=>e.read());return[this.optimizer_.minimize(o,!0,s)].concat(a)}}makeTestFunction(){this.testFunction=e=>P(()=>{let t=[],n,r=e.slice(0,this.inputs.length),i=e.slice(this.inputs.length,this.inputs.length+this.outputs.length),a=[];for(let e=0;e<this.inputs.length;++e)a.push({key:this.inputs[e],value:r[e]});let o=new Lh(a),s=Vh(this.outputs,o);for(let e=0;e<this.lossFunctions.length;++e){let r=this.lossFunctions[e],a=tl(r(i[e],s[e]));n=e===0?a:R(n,a),t.push(n)}for(let e=0;e<this.metricsTensors.length;++e){let n=this.metricsTensors[e][0],r=this.metricsTensors[e][1],a=tl(n(i[r],s[r]));t.push(a)}return t})}async fit(e,t,n={}){if(this.isTraining)throw Error(`Cannot start training because another fit() call is ongoing.`);this.isTraining=!0;let r,i,a,o,s,c,l,u,d;try{let f=n.batchSize==null?32:n.batchSize;Fy(f);let p=await this.standardizeUserData(e,t,n.sampleWeight,n.classWeight,!1,f);r=p[0],i=p[1],d=p[2];let m=!1,h;if(n.validationData!=null&&n.validationData.length>0){if(m=!0,n.validationData.length===2)s=n.validationData[0],c=n.validationData[1];else if(n.validationData.length===3)throw new J(`validationData including sample weights is not supported yet.`);else throw new q(`When passing validation data, it must contain 2 (valX, valY) or 3 (valX, valY, valSampleWeight) items; ${n.validationData} is invalid.`);let e=await this.standardizeUserData(s,c,null,null,!0,f);l=e[0],u=e[1],h=l.concat(u)}else if(n.validationSplit!=null&&n.validationSplit>0&&n.validationSplit<1){m=!0;let e=Math.floor(r[0].shape[0]*(1-n.validationSplit)),t=r[0].shape[0];l=Iy(r,e,t),a=r,r=Iy(r,0,e),u=Iy(i,e,t),o=i,i=Iy(i,0,e),h=l.concat(u)}else n.validationSteps!=null&&(m=!0);let g=r.concat(i).concat(d);this.checkTrainableWeightsConsistency();let _=this.makeTrainFunction(),v=this.getDedupedMetricsNames(),y,b;m?(this.makeTestFunction(),y=this.testFunction,b=v.slice().concat(v.map(e=>`val_`+e))):(y=null,h=[],b=v.slice());let x=xv(n.callbacks,n.yieldEvery);return await this.fitLoop(_,g,v,f,n.epochs,n.verbose,x,y,h,n.shuffle,b,n.initialEpoch,null,null)}finally{this.isTraining=!1,By(r,e),By(i,t),By(a,e),By(o,t),By(l,s),By(u,c),d!=null&&F(d)}}async fitLoop(e,t,n,r,i,a,o,s,c,l,u,d,p,m){r??=32,i??=1,l??=!0,d??=0;let h=!1;if(s!=null&&c!=null&&(h=!0),m!=null&&(h=!0,p==null))throw new q("Can only use `validationSteps` when doing step-wise training, i.e., `stepsPerEpoch` must be set.");let g=this.checkNumSamples(t,r,p,`steps_per_epoch`),_;g!=null&&(_=ym(0,g)),a??=1;let{callbackList:v,history:y}=Cv(o,a,i,d,g,p,r,h,u);v.setModel(this),this.history=y,await v.onTrainBegin(),this.stopTraining_=!1;for(let a=d;a<i;++a){await v.onEpochBegin(a);let i={};if(p!=null)throw new J(`stepsPerEpoch mode is not implemented yet.`);{if(l===`batch`)throw new J(`batch shuffling is not implemneted yet`);l&&f(_);let a=yu(_),o=Ry(g,r);for(let l=0;l<o.length;++l){let u={};if(await v.onBatchBegin(l,u),P(()=>{let d=o[l][0],f=o[l][1],p=Om(a,d,f-d);u.batch=l,u.size=f-d;let m=e(Ly(t,p));for(let e=0;e<n.length;++e){let t=n[e],r=m[e];u[t]=r,Oi(r)}if(l===o.length-1&&h){let e=this.testLoop(s,c,r);for(let t=0;t<n.length;++t){let r=n[t],a=e[t];Oi(a),i[`val_`+r]=a}}}),await v.onBatchEnd(l,u),mv(u),this.stopTraining_)break}a.dispose()}if(await v.onEpochEnd(a,i),this.stopTraining_)break}return await v.onTrainEnd(),await this.history.syncData(),this.history}async fitDataset(e,t){return Ay(this,e,t)}async trainOnBatch(e,t){let n=await this.standardizeUserData(e,t),r=n[0],i=n[1],a=this.makeTrainFunction()(r.concat(i)),o=[];for(let e of a){let t=await e.data();o.push(t[0])}return F(a),By(n[0],e),By(n[1],t),Ap(o)}getNamedWeights(e){let t=[],n=e!=null&&e.trainableOnly,r=n?this.trainableWeights:this.weights,i=this.getWeights(n);for(let e=0;e<r.length;++e)(!n||r[e].trainable)&&t.push({name:r[e].originalName,tensor:i[e]});return t}set stopTraining(e){this.stopTraining_=e}get stopTraining(){return this.stopTraining_}get optimizer(){return this.optimizer_}set optimizer(e){this.optimizer_!==e&&(this.optimizer_=e,this.isOptimizerOwned=!1)}dispose(){let e=super.dispose();if(e.refCountAfterDispose===0&&this.optimizer!=null&&this.isOptimizerOwned){let t=Di().numTensors;this.optimizer_.dispose(),e.numDisposedVariables+=t-Di().numTensors}return e}getLossIdentifiers(){let e;if(typeof this.loss==`string`)e=Mp(this.loss);else if(Array.isArray(this.loss)){for(let e of this.loss)if(typeof e!=`string`)throw Error(`Serialization of non-string loss is not supported.`);e=this.loss.map(e=>Mp(e))}else{let t=Object.keys(this.loss);e={};let n=this.loss;for(let r of t)if(typeof n[r]==`string`)e[r]=Mp(n[r]);else throw Error(`Serialization of non-string loss is not supported.`)}return e}getMetricIdentifiers(){if(typeof this.metrics==`string`||typeof this.metrics==`function`)return[Mp(sy(this.metrics))];if(Array.isArray(this.metrics))return this.metrics.map(e=>Mp(sy(e)));{let e={};for(let t in this.metrics)e[t]=Mp(sy(this.metrics[t]));return e}}getTrainingConfig(){return{loss:this.getLossIdentifiers(),metrics:this.getMetricIdentifiers(),optimizer_config:{class_name:this.optimizer.getClassName(),config:this.optimizer.getConfig()}}}loadTrainingConfig(e){if(e.weighted_metrics!=null)throw Error(`Loading weight_metrics is not supported yet.`);if(e.loss_weights!=null)throw Error(`Loading loss_weights is not supported yet.`);if(e.sample_weight_mode!=null)throw Error(`Loading sample_weight_mode is not supported yet.`);let t=wv(vy(e.optimizer_config)),n;if(typeof e.loss==`string`)n=Np(e.loss);else if(Array.isArray(e.loss))n=e.loss.map(e=>Np(e));else if(e.loss!=null){n={};for(let t in e.loss)n[t]=Np(e.loss[t])}let r;if(Array.isArray(e.metrics))r=e.metrics.map(e=>Np(e));else if(e.metrics!=null){r={};for(let t in e.metrics)r[t]=Np(e.metrics[t])}this.compile({loss:n,metrics:r,optimizer:t})}async save(e,t){if(typeof e==`string`){let t=$i(e);if(t.length===0)throw new q(`Cannot find any save handlers for URL '${e}'`);if(t.length>1)throw new q(`Found more than one (${t.length}) save handlers for URL '${e}'`);e=t[0]}if(e.save==null)throw new q("LayersModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");let n=await Ni(this.getNamedWeights(t)),r={modelTopology:this.toJSON(null,!1),format:`layers-model`,generatedBy:`TensorFlow.js tfjs-layers v${by}`,convertedBy:null};if(t!=null&&t.includeOptimizer&&this.optimizer!=null){r.trainingConfig=this.getTrainingConfig();let{data:e,specs:t}=await Ni(await this.optimizer.getWeights(),`optimizer`);n.specs.push(...t),n.data=Hi([n.data,e])}return this.userDefinedMetadata!=null&&(ly(this.userDefinedMetadata,this.name,!0),r.userDefinedMetadata=this.userDefinedMetadata),r.weightData=n.data,r.weightSpecs=n.specs,e.save(r)}setUserDefinedMetadata(e){ly(e,this.name),this.userDefinedMetadata=e}getUserDefinedMetadata(){return this.userDefinedMetadata}};Yy.className=`Model`,K(Yy);var Xy=class extends Yy{};Xy.className=`Functional`,K(Xy);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
async function Zy(e,t){if(t??={},typeof e==`string`){let n=ea(e,t);if(n.length===0)n.push(gf(e,t));else if(n.length>1)throw new q(`Found more than one (${n.length}) load handlers for URL '${e}'`);e=n[0]}return Qy(e,void 0,t)}async function Qy(e,t,n){if(n??={},e.load==null)throw new q("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");let r=await e.load(),i=r.modelTopology;i.model_config!=null&&(i=i.model_config);let a=n.strict==null||n.strict,o=r.weightData!=null&&r.weightSpecs!=null&&a,s=wv(vy(i),t,o),c=r.trainingConfig;if(c!=null&&s.loadTrainingConfig(c),r.userDefinedMetadata!=null&&s.setUserDefinedMetadata(r.userDefinedMetadata),r.weightData!=null){if(r.weightSpecs==null)throw new q(`LayersModel artifacts contains weight data, but not weight specs. Therefore loading of weights cannot proceed.`);let{modelWeights:e,optimizerWeights:t}=$y(r.weightData,r.weightSpecs);s.loadWeights(e,a),s.optimizer!=null&&t.length>0&&await s.optimizer.setWeights(t),F(e),F(t.map(e=>e.tensor))}return s}function $y(e,t){let n=Pi(e,t),r={},i=[];return t.forEach(e=>{e.group===`optimizer`?i.push({name:e.name,tensor:n[e.name]}):r[e.name]=n[e.name]}),{modelWeights:r,optimizerWeights:i}}var eb=class e extends Yy{constructor(e){if(super({inputs:[],outputs:[]}),e||={},this.trainable=!0,this.built=!1,this.name=e.name==null?Zp(`sequential_`):e.name,e.layers!=null)for(let t of e.layers)this.add(t)}checkShape(e){if(e.inboundNodes[0].outputTensors[0].shape.some(e=>e<0))throw new q(`Negative dimension size caused by adding layer ${e.name} with input shape [${e.inboundNodes[0].inputTensors[0].shape}]`)}add(t){let n=t instanceof e||t instanceof Yy,r;if(n){if(r=t,r.outputs.length!==1)throw new q(`All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.`);if(r.inputs.length!==1)throw new q(`All layers in a Sequential model should have a single input tensor. For multi-input layers, use the functional API.`)}if(this.outputs.length===0){if(t.inboundNodes.length===0){if(t.batchInputShape==null)throw new q("The first layer in a Sequential model must get an `inputShape` or `batchInputShape` argument.");let e=Fh({batchShape:t.batchInputShape,dtype:t.dtype,name:t.name+`_input`});t.apply(e)}if(n)this.outputs=r.outputs,this.inputs=r.inputs;else{if(t.inboundNodes.length!==1)throw new q(`A layer added to a Sequential model must not already be connected somewhere else. LayersModel received layer ${t.name} which has ${t.inboundNodes.length} pre-existing inbound connections.`);if(t.inboundNodes[0].outputTensors.length!==1)throw new q(`All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.`);this.checkShape(t),this.outputs=[t.inboundNodes[0].outputTensors[0]],this.inputs=jh(this.outputs[0])}this.inboundNodes=[],new Dh({outboundLayer:this,inboundLayers:[],nodeIndices:[],tensorIndices:[],inputTensors:this.inputs,outputTensors:this.outputs,inputMasks:Dp(null,this.inputs.length),outputMasks:[null],inputShapes:this.inputs.map(e=>e.shape),outputShapes:this.outputs[0].shape})}else{let e=t.apply(this.outputs[0]);if(Array.isArray(e))throw TypeError(`All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.`);this.checkShape(t),this.outputs=[e],this.inboundNodes[0].outputTensors=this.outputs,this.inboundNodes[0].outputShapes=[this.outputs[0].shape]}this.layers.push(t),this.built=!1}pop(){if(this.layers.length===0)throw TypeError(`There are no layers in the model.`);if(this.layers.pop(),this.layers.length===0)this.outputs=[],this.inboundNodes=[],this.outboundNodes=[];else{let e=this.layers.length-1;this.layers[e].outboundNodes=[],this.outputs=[this.layers[e].output],this.inboundNodes[0].outputTensors=this.outputs,this.inboundNodes[0].outputShapes=[this.outputs[0].shape]}}call(e,t){return this.model??this.build(),this.model.call(e,t)}build(e){if(X(e),this.inputs.length===0||this.outputs.length===0)throw TypeError(`Sequential model cannot be built: model is empty. Add some layers first.`);this.model=new Yy({inputs:this.inputs,outputs:this.outputs[0],name:this.name+`_model`}),this.model.trainable=this.trainable,this.supportsMasking=this.model.supportsMasking,this.inputLayers=this.model.inputLayers,this.inputLayersNodeIndices=this.model.inputLayersNodeIndices,this.inputLayersTensorIndices=this.model.inputLayersTensorIndices,this.outputLayers=this.model.outputLayers,this.outputLayersNodeIndices=this.model.outputLayersNodeIndices,this.outputLayersTensorIndices=this.model.outputLayersTensorIndices,this.nodesByDepth=this.model.nodesByDepth,this.containerNodes=this.model.containerNodes,this.outputNames=this.model.outputNames,this.inputNames=this.model.inputNames,this.built=!0}countParams(){return this.built||this.build(),super.countParams()}summary(e,t,n=console.log){this.built||this.build(),super.summary(e,t,n)}setWeights(e){this.model??this.build(),this.model.setWeights(e)}evaluate(e,t,n={}){if(!this.built)throw new wp(`The model needs to be compiled before being used.`);return this.model.evaluate(e,t,n)}async evaluateDataset(e,t){if(!this.built)throw new wp(`The model needs to be compiled before being used.`);return this.model.evaluateDataset(e,t)}predict(e,t={}){return this.model??this.build(),this.model.predict(e,t)}predictOnBatch(e){return this.model??this.build(),this.model.predictOnBatch(e)}compile(e){this.build(),this.model.compile(e),this.optimizer_=this.model.optimizer,this.isOptimizerOwned=this.model.isOptimizerOwned,this.loss=this.model.loss,this.metrics=this.model.metrics,this.metricsTensors=this.model.metricsTensors,this.metricsNames=this.model.metricsNames}get optimizer(){return this.model==null?void 0:this.model.optimizer}set optimizer(e){this.model.optimizer=e}async fit(e,t,n={}){if(!this.built)throw new wp(`The model needs to be compiled before being used.`);return this.model.fit(e,t,n)}async fitDataset(e,t){if(!this.built)throw new wp(`The model needs to be compiled before being used.`);return this.model.fitDataset(e,t)}async trainOnBatch(e,t){return this.model.trainOnBatch(e,t)}static fromConfig(t,n,r={},i=!1){let a,o={};if(n instanceof Array){if(n[0].className==null||n[0].className===`Merge`)throw new q(`Legacy serialization format not supported yet.`);a=n}else h(n.layers!=null,()=>`When the config data for a Sequential model is not an Array, it must be an Object that contains the 'layers' field.`),a=n.layers,delete n.layers,o=n;let s=new t(o);if(!(s instanceof e))throw new J(`Sequential.fromConfig called on non-Sequential input: ${s}`);for(let e of a){let t=wv(e,void 0,i);i&&t.setFastWeightInitDuringBuild(!0),s.add(t)}return s}set stopTraining(e){if(this.model==null)throw new q(`Cannot set the stopTraining property of a sequential model before it is compiled.`);this.model.stopTraining=e}get stopTraining(){if(this.model==null)throw new q(`Cannot get the stopTraining property of a sequential model before it is compiled.`);return this.model.stopTraining}getConfig(){let e=[];for(let t of this.layers){let n={};n.className=t.getClassName(),n.config=t.getConfig(),e.push(n)}return{name:this.name,layers:e}}};eb.className=`Sequential`,K(eb);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var tb=class extends Yd{getConfig(){return{}}},nb=class extends tb{apply(e,t=1){return Bm(e,t)}};nb.className=`elu`,K(nb);var rb=class extends tb{apply(e){return Jl(e)}};rb.className=`selu`,K(rb);var ib=class extends tb{apply(e){return Rl(e)}};ib.className=`relu`,K(ib);var ab=class extends tb{apply(e){return P(()=>al(6,Rl(e)))}};ab.className=`relu6`,K(ab);var ob=class extends tb{apply(e){return e}};ob.className=`linear`,K(ob);var sb=class extends tb{apply(e){return yo(e)}};sb.className=`sigmoid`,K(sb);var cb=class extends tb{apply(e){return Um(e)}};cb.className=`hardSigmoid`,K(cb);var lb=class extends tb{apply(e){return Rc(e)}};lb.className=`softplus`,K(lb);var ub=class extends tb{apply(e){return Vm(e)}};ub.className=`softsign`,K(ub);var db=class extends tb{apply(e){return Co(e)}};db.className=`tanh`,K(db);var fb=class extends tb{apply(e,t=-1){return uu(e,t)}};fb.className=`softmax`,K(fb);var pb=class extends tb{apply(e,t=-1){return Vc(e,t)}};pb.className=`logSoftmax`,K(pb);var mb=class extends tb{apply(e){return P(()=>P(()=>{let t=B(.5,R(1,Fs(z(e,Math.sqrt(2)))));return B(e,t)}))}};mb.className=`gelu`,K(mb);var hb=class extends tb{apply(e){return P(()=>B(.5,B(e,R(1,Co(B(Qs(z(2,Math.PI)),R(e,B(.044715,Ys(e,3)))))))))}};hb.className=`gelu_new`,K(hb);var gb=class extends tb{apply(e){return P(()=>B(e,Co(Rc(e))))}};gb.className=`mish`,K(gb);var _b=class extends tb{apply(e,t=1){return P(()=>B(yo(B(e,t)),e))}};_b.className=`swish`,K(_b);function vb(e){return e.getClassName()}function yb(e,t={}){return Lp(e,Xd.getMap().classNameMap,t,`activation`)}function bb(e){if(e==null){let e={};return e.className=`linear`,e.config={},yb(e)}if(typeof e==`string`){let t={};return t.className=e,t.config={},yb(t)}return e instanceof tb?e:yb(e)}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function xb(e){if(e!=null&&typeof e!=`object`)throw Error(`Argument to L1L2 regularizer's constructor is expected to be an object, but received: ${e}`)}var Sb=class extends Yd{},Cb=class extends Sb{constructor(e){super(),xb(e),this.l1=e==null||e.l1==null?.01:e.l1,this.l2=e==null||e.l2==null?.01:e.l2,this.hasL1=this.l1!==0,this.hasL2=this.l2!==0}apply(e){return P(()=>{let t=nl([1]);return this.hasL1&&(t=R(t,U(B(this.l1,Ia(e))))),this.hasL2&&(t=R(t,U(B(this.l2,Lm(e))))),V(t,[])})}getConfig(){return{l1:this.l1,l2:this.l2}}static fromConfig(e,t){return new e({l1:t.l1,l2:t.l2})}};Cb.className=`L1L2`,K(Cb);const wb={l1l2:`L1L2`};function Tb(e){return Fp(e)}function Eb(e,t={}){return Lp(e,Xd.getMap().classNameMap,t,`regularizer`)}function Db(e){return e==null?null:typeof e==`string`?Eb({className:e in wb?wb[e]:e,config:{}}):e instanceof Sb?e:Eb(e)}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var Ob=class extends Z{constructor(e){super(e??{}),this.supportsMasking=!0,e!=null&&(this.maxValue=e.maxValue)}call(e,t){e=Y(e);let n=Rl(e);return this.maxValue!=null&&(n=Vo(n,0,this.maxValue)),n}computeOutputShape(e){return e}getConfig(){let e={maxValue:this.maxValue},t=super.getConfig();return Object.assign(e,t),e}};Ob.className=`ReLU`,K(Ob);var kb=class extends Z{constructor(e){super(e??{}),this.DEFAULT_ALPHA=.3,e??={},this.alpha=e.alpha==null?this.DEFAULT_ALPHA:e.alpha}call(e,t){let n=Y(e);return wc(n,this.alpha)}computeOutputShape(e){return e}getConfig(){let e={alpha:this.alpha},t=super.getConfig();return Object.assign(e,t),e}};kb.className=`LeakyReLU`,K(kb);var Ab=class extends Z{constructor(e){if(super(e??{}),this.DEFAULT_ALPHA_INITIALIZER=`zeros`,e??={},this.supportsMasking=!0,this.alphaInitializer=hh(e.alphaInitializer||this.DEFAULT_ALPHA_INITIALIZER),this.alphaRegularizer=Db(e.alphaRegularizer),this.alphaConstraint=fv(e.alphaConstraint),e.sharedAxes==null)this.sharedAxes=null;else if(Array.isArray(e.sharedAxes))this.sharedAxes=e.sharedAxes;else if(typeof e.sharedAxes==`number`)this.sharedAxes=[e.sharedAxes];else throw new q(`Expected sharedAxes to be a number or an array of numbers, but got ${e.sharedAxes}`)}build(e){e=X(e);let t=e.slice(1);if(this.sharedAxes!=null)for(let e of this.sharedAxes)t[e-1]=1;this.alpha=this.addWeight(`alpha`,t,`float32`,this.alphaInitializer,this.alphaRegularizer,!0,this.alphaConstraint);let n={};if(this.sharedAxes!=null)for(let t=1;t<e.length;++t)n[t]=e[t];this.inputSpec=[new wh({ndim:e.length,axes:n})],this.built=!0}call(e,t){return e=Y(e),yl(e,this.alpha.read())}getConfig(){let e={alphaInitializer:mh(this.alphaInitializer),alphaRegularizer:Tb(this.alphaRegularizer),alphaConstraint:uv(this.alphaConstraint),sharedAxes:this.sharedAxes},t=super.getConfig();return Object.assign(e,t),e}};Ab.className=`PReLU`,K(Ab);var jb=class extends Z{constructor(e){if(super(e??{}),this.DEFAULT_ALPHA=1,e??={},e.alpha!=null&&e.alpha!==this.DEFAULT_ALPHA)throw new J(`Non-default alpha value (${e.alpha}) is not supported by the ELU layer yet.`);this.alpha=e.alpha==null?this.DEFAULT_ALPHA:e.alpha}call(e,t){let n=Y(e);return Ns(n)}computeOutputShape(e){return e}getConfig(){let e={alpha:this.alpha},t=super.getConfig();return Object.assign(e,t),e}};jb.className=`ELU`,K(jb);var Mb=class extends Z{constructor(e){super(e??{}),this.DEFAULT_THETA=1,e??={},this.theta=e.theta==null?this.DEFAULT_THETA:e.theta}call(e,t){let n=Y(e);return B(n,L(vc(n,this.theta),`float32`))}computeOutputShape(e){return e}getConfig(){let e={theta:this.theta},t=super.getConfig();return Object.assign(e,t),e}};Mb.className=`ThresholdedReLU`,K(Mb);var Nb=class extends Z{constructor(e){super(e??{}),this.DEFAULT_AXIS=1,e??={},this.softmax=new fb().apply,this.axis=e.axis==null?this.DEFAULT_AXIS:e.axis}call(e,t){return P(()=>{let n=Y(e),r=t.mask;if(r!=null){let e=B(W(rl(n.shape),L(r,n.dtype)),Xs(-1e9));n=R(n,e)}return this.axis instanceof Array?this.axis.length>1?oc(W(n,Uc(n,this.axis,!0))):this.softmax(n,this.axis[0]):this.softmax(n,this.axis)})}computeOutputShape(e){return e}getConfig(){let e={axis:this.axis},t=super.getConfig();return Object.assign(e,t),e}};Nb.className=`Softmax`,K(Nb);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Pb(e,t,n){if(typeof e==`number`)return Dp(e,t);if(e.length!==t)throw new q(`The ${n} argument must be an integer or tuple of ${t} integers. Received: ${e.length} elements.`);for(let r=0;r<t;++r){let i=e[r];if(!hm(i))throw new q(`The ${n} argument must be an integer or tuple of ${t} integers. Received: ${JSON.stringify(e)} including a non-integer number ${i}`)}return e}function Fb(e,t,n,r,i=1){if(e==null)return e;let a=t+(t-1)*(i-1),o;return o=n===`same`?e:e-a+1,Math.floor((o+r-1)/r)}function Ib(e,t,n,r){if(e==null)return null;if(r===`valid`)e=e*t+vm([n-t,0]);else if(r===`same`)e*=t;else throw new q(`Unsupport padding mode: ${r}.`);return e}
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Lb(e,t){return P(()=>(im(t),t===`channelsFirst`?G(e,[0,2,3,1]):e))}function Rb(e,t){return P(()=>(im(t),t===`channelsFirst`?G(e,[0,2,3,4,1]):e))}function zb(e,t,n,r=1,i=`valid`,a,o=1){return P(()=>{if(a??=Sm(),im(a),e.shape.length!==3)throw new q(`The input of a conv1dWithBias operation should be 3, but is ${e.shape.length} instead.`);if(t.shape.length!==3)throw new q(`The kernel for a conv1dWithBias operation should be 3, but is ${t.shape.length} instead`);if(n!=null&&n.shape.length!==1)throw new q(`The bias for a conv1dWithBias operation should be 1, but is ${n.shape.length} instead`);if(a===`channelsFirst`&&(e=G(e,[0,2,1])),i===`causal`)throw new J(`The support for CAUSAL padding mode in conv1dWithBias is not implemented yet.`);let s=$o(e,t,r,i===`same`?`same`:`valid`,`NWC`,o);return n!=null&&(s=zm(s,n)),s})}function Bb(e,t,n,r=[1,1],i=`valid`,a,o,s=null){return P(()=>{if(a??=Sm(),im(a),e.rank!==3&&e.rank!==4)throw new q(`conv2dWithBiasActivation expects input to be of rank 3 or 4, but received ${e.rank}.`);if(t.rank!==3&&t.rank!==4)throw new q(`conv2dWithBiasActivation expects kernel to be of rank 3 or 4, but received ${e.rank}.`);let c=Lb(e,a);if(i===`causal`)throw new J(`The support for CAUSAL padding mode in conv1dWithBias is not implemented yet.`);return c=Hu({x:c,filter:t,strides:r,pad:i===`same`?`same`:`valid`,dilations:o,dataFormat:`NHWC`,bias:n,activation:s}),a===`channelsFirst`&&(c=G(c,[0,3,1,2])),c})}function Vb(e,t,n,r=[1,1,1],i=`valid`,a,o){return P(()=>{if(a??=Sm(),im(a),e.rank!==4&&e.rank!==5)throw new q(`conv3dWithBias expects input to be of rank 4 or 5, but received ${e.rank}.`);if(t.rank!==4&&t.rank!==5)throw new q(`conv3dWithBias expects kernel to be of rank 4 or 5, but received ${e.rank}.`);let s=Rb(e,a);if(i===`causal`)throw new J(`The support for CAUSAL padding mode in conv3dWithBias is not implemented yet.`);return s=as(s,t,r,i===`same`?`same`:`valid`,`NDHWC`,o),n!=null&&(s=zm(s,n)),a===`channelsFirst`&&(s=G(s,[0,4,1,2,3])),s})}var Hb=class e extends Z{constructor(t,n){if(super(n),this.bias=null,this.DEFAULT_KERNEL_INITIALIZER=`glorotNormal`,this.DEFAULT_BIAS_INITIALIZER=`zeros`,e.verifyArgs(n),this.rank=t,Wp(this.rank,`rank`),this.rank!==1&&this.rank!==2&&this.rank!==3)throw new J(`Convolution layer for rank other than 1, 2, or 3 (${this.rank}) is not implemented yet.`);if(this.kernelSize=Pb(n.kernelSize,t,`kernelSize`),this.strides=Pb(n.strides==null?1:n.strides,t,`strides`),this.padding=n.padding==null?`valid`:n.padding,om(this.padding),this.dataFormat=n.dataFormat==null?`channelsLast`:n.dataFormat,im(this.dataFormat),this.activation=bb(n.activation),this.useBias=n.useBias==null||n.useBias,this.biasInitializer=hh(n.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.biasConstraint=fv(n.biasConstraint),this.biasRegularizer=Db(n.biasRegularizer),this.activityRegularizer=Db(n.activityRegularizer),this.dilationRate=Pb(n.dilationRate==null?1:n.dilationRate,t,`dilationRate`),this.rank===1&&Array.isArray(this.dilationRate)&&this.dilationRate.length!==1)throw new q(`dilationRate must be a number or an array of a single number for 1D convolution, but received ${JSON.stringify(this.dilationRate)}`);if(this.rank===2){if(typeof this.dilationRate==`number`)this.dilationRate=[this.dilationRate,this.dilationRate];else if(this.dilationRate.length!==2)throw new q(`dilationRate must be a number or array of two numbers for 2D convolution, but received ${JSON.stringify(this.dilationRate)}`)}else if(this.rank===3){if(typeof this.dilationRate==`number`)this.dilationRate=[this.dilationRate,this.dilationRate,this.dilationRate];else if(this.dilationRate.length!==3)throw new q(`dilationRate must be a number or array of three numbers for 3D convolution, but received ${JSON.stringify(this.dilationRate)}`)}}static verifyArgs(e){if(Op(`kernelSize`in e,`required key 'kernelSize' not in config`),typeof e.kernelSize!=`number`&&!Up(e.kernelSize,`number`,1,3))throw new q(`BaseConv expects config.kernelSize to be number or number[] with length 1, 2, or 3, but received ${JSON.stringify(e.kernelSize)}.`)}getConfig(){let e={kernelSize:this.kernelSize,strides:this.strides,padding:this.padding,dataFormat:this.dataFormat,dilationRate:this.dilationRate,activation:vb(this.activation),useBias:this.useBias,biasInitializer:mh(this.biasInitializer),biasRegularizer:Tb(this.biasRegularizer),activityRegularizer:Tb(this.activityRegularizer),biasConstraint:uv(this.biasConstraint)},t=super.getConfig();return Object.assign(e,t),e}},Ub=class e extends Hb{constructor(t,n){super(t,n),this.kernel=null,e.verifyArgs(n),this.filters=n.filters,Wp(this.filters,`filters`),this.kernelInitializer=hh(n.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.kernelConstraint=fv(n.kernelConstraint),this.kernelRegularizer=Db(n.kernelRegularizer)}build(e){e=X(e);let t=this.dataFormat===`channelsFirst`?1:e.length-1;if(e[t]==null)throw new q(`The channel dimension of the input should be defined. Found ${e[t]}`);let n=e[t],r=this.kernelSize.concat([n,this.filters]);this.kernel=this.addWeight(`kernel`,r,null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight(`bias`,[this.filters],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint)),this.inputSpec=[{ndim:this.rank+2,axes:{[t]:n}}],this.built=!0}call(e,t){return P(()=>{e=Y(e);let t,n=this.bias==null?null:this.bias.read(),r=qp(this.activation.getClassName());if(r!=null&&this.rank===2)t=Bb(e,this.kernel.read(),n,this.strides,this.padding,this.dataFormat,this.dilationRate,r);else{if(this.rank===1)t=zb(e,this.kernel.read(),n,this.strides[0],this.padding,this.dataFormat,this.dilationRate[0]);else if(this.rank===2)t=Bb(e,this.kernel.read(),n,this.strides,this.padding,this.dataFormat,this.dilationRate);else if(this.rank===3)t=Vb(e,this.kernel.read(),n,this.strides,this.padding,this.dataFormat,this.dilationRate);else throw new J(`convolutions greater than 3D are not implemented yet.`);this.activation!=null&&(t=this.activation.apply(t))}return t})}computeOutputShape(e){e=X(e);let t=[],n=this.dataFormat===`channelsLast`?e.slice(1,e.length-1):e.slice(2);for(let e=0;e<n.length;++e){let r=Fb(n[e],this.kernelSize[e],this.padding,this.strides[e],typeof this.dilationRate==`number`?this.dilationRate:this.dilationRate[e]);t.push(r)}let r=[e[0]];return this.dataFormat===`channelsLast`?(r=r.concat(t),r.push(this.filters)):(r.push(this.filters),r=r.concat(t)),r}getConfig(){let e={filters:this.filters,kernelInitializer:mh(this.kernelInitializer),kernelRegularizer:Tb(this.kernelRegularizer),kernelConstraint:uv(this.kernelConstraint)},t=super.getConfig();return Object.assign(e,t),e}static verifyArgs(e){if(!(`filters`in e)||typeof e.filters!=`number`||e.filters<1)throw new q(`Convolution layer expected config.filters to be a 'number' > 0 but got ${JSON.stringify(e.filters)}`)}},Wb=class e extends Ub{constructor(t){super(2,t),e.verifyArgs(t)}getConfig(){let e=super.getConfig();return delete e.rank,e}static verifyArgs(e){if(typeof e.kernelSize!=`number`&&!Up(e.kernelSize,`number`,1,2))throw new q(`Conv2D expects config.kernelSize to be number or number[] with length 1 or 2, but received ${JSON.stringify(e.kernelSize)}.`)}};Wb.className=`Conv2D`,K(Wb);var Gb=class e extends Ub{constructor(t){super(3,t),e.verifyArgs(t)}getConfig(){let e=super.getConfig();return delete e.rank,e}static verifyArgs(e){if(typeof e.kernelSize!=`number`&&(!Array.isArray(e.kernelSize)||e.kernelSize.length!==1&&e.kernelSize.length!==3))throw new q(`Conv3D expects config.kernelSize to be number or [number, number, number], but received ${JSON.stringify(e.kernelSize)}.`)}};Gb.className=`Conv3D`,K(Gb);var Kb=class extends Wb{constructor(e){if(super(e),this.inputSpec=[new wh({ndim:4})],this.padding!==`same`&&this.padding!==`valid`)throw new q(`Conv2DTranspose currently supports only padding modes 'same' and 'valid', but received padding mode ${this.padding}`)}build(e){if(e=X(e),e.length!==4)throw new q(`Input should have rank 4; Received input shape: `+JSON.stringify(e));let t=this.dataFormat===`channelsFirst`?1:e.length-1;if(e[t]==null)throw new q("The channel dimension of the inputs should be defined. Found `None`.");let n=e[t],r=this.kernelSize.concat([this.filters,n]);this.kernel=this.addWeight(`kernel`,r,`float32`,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight(`bias`,[this.filters],`float32`,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint)),this.inputSpec=[new wh({ndim:4,axes:{[t]:n}})],this.built=!0}call(e,t){return P(()=>{let t=Y(e);if(t.shape.length!==4)throw new q(`Conv2DTranspose.call() expects input tensor to be rank-4, but received a tensor of rank-${t.shape.length}`);let n=t.shape,r=n[0],i,a;this.dataFormat===`channelsFirst`?(i=2,a=3):(i=1,a=2);let o=n[i],s=n[a],c=this.kernelSize[0],l=this.kernelSize[1],u=this.strides[0],d=this.strides[1],f=[r,Ib(o,u,c,this.padding),Ib(s,d,l,this.padding),this.filters];this.dataFormat!==`channelsLast`&&(t=G(t,[0,2,3,1]));let p=rs(t,this.kernel.read(),f,this.strides,this.padding);return this.dataFormat!==`channelsLast`&&(p=G(p,[0,3,1,2])),this.bias!=null&&(p=zm(p,this.bias.read(),this.dataFormat)),this.activation!=null&&(p=this.activation.apply(p)),p})}computeOutputShape(e){e=X(e);let t=e.slice(),n,r,i;this.dataFormat===`channelsFirst`?(n=1,r=2,i=3):(n=3,r=1,i=2);let a=this.kernelSize[0],o=this.kernelSize[1],s=this.strides[0],c=this.strides[1];return t[n]=this.filters,t[r]=Ib(t[r],s,a,this.padding),t[i]=Ib(t[i],c,o,this.padding),t}getConfig(){let e=super.getConfig();return delete e.dilationRate,e}};Kb.className=`Conv2DTranspose`,K(Kb);var qb=class extends Gb{constructor(e){if(super(e),this.inputSpec=[new wh({ndim:5})],this.padding!==`same`&&this.padding!==`valid`)throw new q(`Conv3DTranspose currently supports only padding modes 'same' and 'valid', but received padding mode ${this.padding}`)}build(e){if(e=X(e),e.length!==5)throw new q(`Input should have rank 5; Received input shape: `+JSON.stringify(e));let t=this.dataFormat===`channelsFirst`?1:e.length-1;if(e[t]==null)throw new q("The channel dimension of the inputs should be defined. Found `None`.");let n=e[t],r=this.kernelSize.concat([this.filters,n]);this.kernel=this.addWeight(`kernel`,r,`float32`,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight(`bias`,[this.filters],`float32`,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint)),this.inputSpec=[new wh({ndim:5,axes:{[t]:n}})],this.built=!0}call(e,t){return P(()=>{let t=Y(e);if(t.shape.length!==5)throw new q(`Conv3DTranspose.call() expects input tensor to be rank-4, but received a tensor of rank-${t.shape.length}`);let n=t.shape,r=n[0],i,a,o;this.dataFormat===`channelsFirst`?(o=2,i=3,a=4):(o=1,i=2,a=3);let s=n[o],c=n[i],l=n[a],u=this.kernelSize[0],d=this.kernelSize[1],f=this.kernelSize[2],p=this.strides[0],m=this.strides[1],h=this.strides[2],g=[r,Ib(s,p,u,this.padding),Ib(c,m,d,this.padding),Ib(l,h,f,this.padding),this.filters];this.dataFormat!==`channelsLast`&&(t=G(t,[0,2,3,4,1]));let _=ls(t,this.kernel.read(),g,this.strides,this.padding);return this.dataFormat!==`channelsLast`&&(_=G(_,[0,4,1,2,3])),this.bias!==null&&(_=zm(_,this.bias.read(),this.dataFormat)),this.activation!==null&&(_=this.activation.apply(_)),_})}computeOutputShape(e){e=X(e);let t=e.slice(),n,r,i,a;this.dataFormat===`channelsFirst`?(n=1,r=2,i=3,a=4):(n=4,r=1,i=2,a=3);let o=this.kernelSize[0],s=this.kernelSize[1],c=this.kernelSize[2],l=this.strides[0],u=this.strides[1],d=this.strides[2];return t[n]=this.filters,t[r]=Ib(t[r],l,o,this.padding),t[i]=Ib(t[i],u,s,this.padding),t[a]=Ib(t[a],d,c,this.padding),t}getConfig(){let e=super.getConfig();return delete e.dilationRate,e}};qb.className=`Conv3DTranspose`,K(qb);var Jb=class extends Ub{constructor(e,t){if(super(e,t),this.DEFAULT_DEPTHWISE_INITIALIZER=`glorotUniform`,this.DEFAULT_POINTWISE_INITIALIZER=`glorotUniform`,this.depthwiseKernel=null,this.pointwiseKernel=null,t.filters==null)throw new q("The `filters` configuration field is required by SeparableConv, but is unspecified.");if(t.kernelInitializer!=null||t.kernelRegularizer!=null||t.kernelConstraint!=null)throw new q(`Fields kernelInitializer, kernelRegularizer and kernelConstraint are invalid for SeparableConv2D. Use depthwiseInitializer, depthwiseRegularizer, depthwiseConstraint, pointwiseInitializer, pointwiseRegularizer and pointwiseConstraint instead.`);if(t.padding!=null&&t.padding!==`same`&&t.padding!==`valid`)throw new q(`SeparableConv${this.rank}D supports only padding modes: 'same' and 'valid', but received ${JSON.stringify(t.padding)}`);this.depthMultiplier=t.depthMultiplier==null?1:t.depthMultiplier,this.depthwiseInitializer=hh(t.depthwiseInitializer||this.DEFAULT_DEPTHWISE_INITIALIZER),this.depthwiseRegularizer=Db(t.depthwiseRegularizer),this.depthwiseConstraint=fv(t.depthwiseConstraint),this.pointwiseInitializer=hh(t.depthwiseInitializer||this.DEFAULT_POINTWISE_INITIALIZER),this.pointwiseRegularizer=Db(t.pointwiseRegularizer),this.pointwiseConstraint=fv(t.pointwiseConstraint)}build(e){if(e=X(e),e.length<this.rank+2)throw new q(`Inputs to SeparableConv${this.rank}D should have rank ${this.rank+2}, but received input shape: ${JSON.stringify(e)}`);let t=this.dataFormat===`channelsFirst`?1:e.length-1;if(e[t]==null||e[t]<0)throw new q(`The channel dimension of the inputs should be defined, but found ${JSON.stringify(e[t])}`);let n=e[t],r=this.kernelSize.concat([n,this.depthMultiplier]),i=[];for(let e=0;e<this.rank;++e)i.push(1);i.push(n*this.depthMultiplier,this.filters),this.depthwiseKernel=this.addWeight(`depthwise_kernel`,r,`float32`,this.depthwiseInitializer,this.depthwiseRegularizer,!0,this.depthwiseConstraint),this.pointwiseKernel=this.addWeight(`pointwise_kernel`,i,`float32`,this.pointwiseInitializer,this.pointwiseRegularizer,!0,this.pointwiseConstraint),this.bias=this.useBias?this.addWeight(`bias`,[this.filters],`float32`,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):null,this.inputSpec=[new wh({ndim:this.rank+2,axes:{[t]:n}})],this.built=!0}call(e,t){return P(()=>{e=Y(e);let t;if(this.rank===1)throw new J(`1D separable convolution is not implemented yet.`);return this.rank===2&&(this.dataFormat===`channelsFirst`&&(e=G(e,[0,2,3,1])),t=Xl(e,this.depthwiseKernel.read(),this.pointwiseKernel.read(),this.strides,this.padding,this.dilationRate,`NHWC`)),this.useBias&&(t=zm(t,this.bias.read(),this.dataFormat)),this.activation!=null&&(t=this.activation.apply(t)),this.dataFormat===`channelsFirst`&&(t=G(t,[0,3,1,2])),t})}getConfig(){let e=super.getConfig();return delete e.rank,delete e.kernelInitializer,delete e.kernelRegularizer,delete e.kernelConstraint,e.depthwiseInitializer=mh(this.depthwiseInitializer),e.pointwiseInitializer=mh(this.pointwiseInitializer),e.depthwiseRegularizer=Tb(this.depthwiseRegularizer),e.pointwiseRegularizer=Tb(this.pointwiseRegularizer),e.depthwiseConstraint=uv(this.depthwiseConstraint),e.pointwiseConstraint=uv(this.pointwiseConstraint),e}};Jb.className=`SeparableConv`;var Yb=class extends Jb{constructor(e){super(2,e)}};Yb.className=`SeparableConv2D`,K(Yb);var Xb=class e extends Ub{constructor(t){super(1,t),e.verifyArgs(t),this.inputSpec=[{ndim:3}]}getConfig(){let e=super.getConfig();return delete e.rank,delete e.dataFormat,e}static verifyArgs(e){if(typeof e.kernelSize!=`number`&&!Up(e.kernelSize,`number`,1,1))throw new q(`Conv1D expects config.kernelSize to be number or number[] with length 1, but received ${JSON.stringify(e.kernelSize)}.`)}};Xb.className=`Conv1D`,K(Xb);var Zb=class extends Z{constructor(e){super(e),this.cropping=typeof e.cropping==`number`?[[e.cropping,e.cropping],[e.cropping,e.cropping]]:typeof e.cropping[0]==`number`?[[e.cropping[0],e.cropping[0]],[e.cropping[1],e.cropping[1]]]:e.cropping,this.dataFormat=e.dataFormat===void 0?`channelsLast`:e.dataFormat,this.inputSpec=[{ndim:4}]}computeOutputShape(e){return this.dataFormat===`channelsFirst`?[e[0],e[1],e[2]-this.cropping[0][0]-this.cropping[0][1],e[3]-this.cropping[1][0]-this.cropping[1][1]]:[e[0],e[1]-this.cropping[0][0]-this.cropping[0][1],e[2]-this.cropping[1][0]-this.cropping[1][1],e[3]]}call(e,t){return P(()=>(e=Y(e),this.dataFormat===`channelsLast`?Am(Am(e,this.cropping[0][0],e.shape[1]-this.cropping[0][0]-this.cropping[0][1],2),this.cropping[1][0],e.shape[2]-this.cropping[1][1]-this.cropping[1][0],3):Am(Am(e,this.cropping[0][0],e.shape[2]-this.cropping[0][0]-this.cropping[0][1],3),this.cropping[1][0],e.shape[3]-this.cropping[1][1]-this.cropping[1][0],4)))}getConfig(){let e={cropping:this.cropping,dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}};Zb.className=`Cropping2D`,K(Zb);var Qb=class extends Z{constructor(e){super(e),this.DEFAULT_SIZE=[2,2],this.inputSpec=[{ndim:4}],this.size=e.size==null?this.DEFAULT_SIZE:e.size,this.dataFormat=e.dataFormat==null?`channelsLast`:e.dataFormat,im(this.dataFormat),this.interpolation=e.interpolation==null?`nearest`:e.interpolation,am(this.interpolation)}computeOutputShape(e){if(this.dataFormat===`channelsFirst`){let t=e[2]==null?null:this.size[0]*e[2],n=e[3]==null?null:this.size[1]*e[3];return[e[0],e[1],t,n]}{let t=e[1]==null?null:this.size[0]*e[1],n=e[2]==null?null:this.size[1]*e[2];return[e[0],t,n,e[3]]}}call(e,t){return P(()=>{let t=Y(e),n=t.shape;if(this.dataFormat===`channelsFirst`){t=G(t,[0,2,3,1]);let e=this.size[0]*n[2],r=this.size[1]*n[3],i=this.interpolation===`nearest`?Gd.resizeNearestNeighbor(t,[e,r]):Gd.resizeBilinear(t,[e,r]);return G(i,[0,3,1,2])}{let e=this.size[0]*n[1],r=this.size[1]*n[2];return this.interpolation===`nearest`?Gd.resizeNearestNeighbor(t,[e,r]):Gd.resizeBilinear(t,[e,r])}})}getConfig(){let e={size:this.size,dataFormat:this.dataFormat,interpolation:this.interpolation},t=super.getConfig();return Object.assign(e,t),e}};Qb.className=`UpSampling2D`,K(Qb);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function $b(e,t,n=[1,1],r=`valid`,i,a){return P(()=>{i??=Sm(),im(i);let o=Lb(e,i);if(e.rank!==4)throw new q(`Input for depthwiseConv2d is required to be 4-D, but is instead ${e.rank}-D`);if(t.rank!==4)throw new q(`depthwiseKernel is required to be 4-D, but is instead ${t.rank}-D`);return o=xs(o,t,n,r===`same`?`same`:`valid`,`NHWC`,a),i===`channelsFirst`&&(o=G(o,[0,3,1,2])),o})}var ex=class extends Hb{constructor(e){super(2,e),this.depthwiseKernel=null,this.depthMultiplier=e.depthMultiplier==null?1:e.depthMultiplier,this.depthwiseInitializer=hh(e.depthwiseInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.depthwiseConstraint=fv(e.depthwiseConstraint),this.depthwiseRegularizer=Db(e.depthwiseRegularizer)}build(e){if(e=X(e),e.length<4)throw new q(`Inputs to DepthwiseConv2D should have rank 4. Received input shape: ${JSON.stringify(e)}.`);let t=this.dataFormat===`channelsFirst`?1:3;if(e[t]==null||e[t]<0)throw new q(`The channel dimension of the inputs to DepthwiseConv2D should be defined, but is not (${e[t]}).`);let n=e[t],r=[this.kernelSize[0],this.kernelSize[1],n,this.depthMultiplier];this.depthwiseKernel=this.addWeight(`depthwise_kernel`,r,null,this.depthwiseInitializer,this.depthwiseRegularizer,!0,this.depthwiseConstraint),this.bias=this.useBias?this.addWeight(`bias`,[n*this.depthMultiplier],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):null,this.built=!0}call(e,t){return P(()=>{e=Y(e);let t=$b(e,this.depthwiseKernel.read(),this.strides,this.padding,this.dataFormat,null);return this.useBias&&(t=zm(t,this.bias.read(),this.dataFormat)),this.activation!=null&&(t=this.activation.apply(t)),t})}computeOutputShape(e){e=X(e);let t=this.dataFormat===`channelsFirst`?e[2]:e[1],n=this.dataFormat===`channelsFirst`?e[3]:e[2],r=this.dataFormat===`channelsFirst`?e[1]*this.depthMultiplier:e[3]*this.depthMultiplier,i=Fb(t,this.kernelSize[0],this.padding,this.strides[0]),a=Fb(n,this.kernelSize[1],this.padding,this.strides[1]);return this.dataFormat===`channelsFirst`?[e[0],r,i,a]:[e[0],i,a,r]}getConfig(){let e=super.getConfig();return e.depthMultiplier=this.depthMultiplier,e.depthwiseInitializer=mh(this.depthwiseInitializer),e.depthwiseRegularizer=Tb(this.depthwiseRegularizer),e.depthwiseConstraint=uv(this.depthwiseRegularizer),e}};ex.className=`DepthwiseConv2D`,K(ex);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function tx(e,t,n,r){if(Array.isArray(e)){if(t!=null||n!=null)throw new q(`When inputs is an array, neither initialState or constants should be provided`);r!=null&&(n=e.slice(e.length-r,e.length),e=e.slice(0,e.length-r)),e.length>1&&(t=e.slice(1,e.length)),e=e[0]}function i(e){return e==null||Array.isArray(e)?e:[e]}return t=i(t),n=i(n),{inputs:e,initialState:t,constants:n}}function nx(e,t,n,r=!1,i,a,o=!1,s=!1){return P(()=>{let c=t.shape.length;if(c<3)throw new q(`Input should be at least 3D, but is ${c}D.`);let l=[1,0].concat(ym(2,c));if(t=G(t,l),a!=null)throw new J(`The rnn() functoin of the deeplearn.js backend does not support constants yet.`);o&&console.warn(`Backend rnn(): the unroll = true option is not applicable to the imperative deeplearn.js backend.`),i!=null&&(i=L(L(i,`bool`),`float32`),i.rank===c-1&&(i=cc(i,-1)),i=G(i,l)),r&&(t=Hl(t,0),i!=null&&(i=Hl(i,0)));let u=[],d,f=n,p=t.shape[0],m=Ou(t),h;i!=null&&(h=Ou(i));for(let t=0;t<p;++t){let n=m[t],r=P(()=>e(n,f));if(i==null)d=r[0],f=r[1];else{let e=P(()=>{let e=h[t],n=W(pl(e),e);return{output:R(B(r[0],e),B(f[0],n)),newStates:f.map((t,i)=>R(B(r[1][i],e),B(t,n)))}});d=e.output,f=e.newStates}s&&u.push(d)}let g;return s&&(g=gu(u,1)),[d,g,f]})}var rx=class e extends Z{constructor(e){super(e);let t;if(e.cell==null)throw new q(`cell property is missing for the constructor of RNN.`);if(t=Array.isArray(e.cell)?new dx({cells:e.cell}):e.cell,t.stateSize==null)throw new q("The RNN cell should have an attribute `stateSize` (tuple of integers, one integer per RNN state).");this.cell=t,this.returnSequences=e.returnSequences!=null&&e.returnSequences,this.returnState=e.returnState!=null&&e.returnState,this.goBackwards=e.goBackwards!=null&&e.goBackwards,this._stateful=e.stateful!=null&&e.stateful,this.unroll=e.unroll!=null&&e.unroll,this.supportsMasking=!0,this.inputSpec=[new wh({ndim:3})],this.stateSpec=null,this.states_=null,this.numConstants=null,this.keptStates=[]}getStates(){return this.states_==null?ym(0,Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1).map(e=>null):this.states_}setStates(e){this.states_=e}computeOutputShape(e){gh(e)&&(e=e[0]),e=e;let t=this.cell.stateSize;Array.isArray(t)||(t=[t]);let n=t[0],r;if(r=this.returnSequences?[e[0],e[1],n]:[e[0],n],this.returnState){let n=[];for(let r of t)n.push([e[0],r]);return[r].concat(n)}return r}computeMask(e,t){return P(()=>{Array.isArray(t)&&(t=t[0]);let e=this.returnSequences?t:null;if(this.returnState){let t=this.states.map(e=>null);return[e].concat(t)}return e})}get states(){if(this.states_==null){let e=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1,t=[];for(let n=0;n<e;++n)t.push(null);return t}return this.states_}set states(e){this.states_=e}build(e){if(this.numConstants!=null)throw new J(`Constants support is not implemented in RNN yet.`);gh(e)&&(e=e[0]),e=e;let t=this.stateful?e[0]:null,n=e.slice(2);this.inputSpec[0]=new wh({shape:[t,null,...n]});let r=[e[0]].concat(e.slice(2));this.cell.build(r);let i;if(i=Array.isArray(this.cell.stateSize)?this.cell.stateSize:[this.cell.stateSize],this.stateSpec!=null){if(!y(this.stateSpec.map(e=>e.shape[e.shape.length-1]),i))throw new q(`An initialState was passed that is not compatible with cell.stateSize. Received stateSpec=${this.stateSpec}; However cell.stateSize is ${this.cell.stateSize}`)}else this.stateSpec=i.map(e=>new wh({shape:[null,e]}));this.stateful&&this.resetStates()}resetStates(e,t=!1){P(()=>{if(!this.stateful)throw new Cp(`Cannot call resetStates() on an RNN Layer that is not stateful.`);let n=this.inputSpec[0].shape[0];if(n==null)throw new q("If an RNN is stateful, it needs to know its batch size. Specify the batch size of your input tensors: \n- If using a Sequential model, specify the batch size by passing a `batchInputShape` option to your first layer.\n- If using the functional API, specify the batch size by passing a `batchShape` option to your Input layer.");if(this.states_==null)this.states_=Array.isArray(this.cell.stateSize)?this.cell.stateSize.map(e=>nl([n,e])):[nl([n,this.cell.stateSize])];else if(e==null)F(this.states_),this.keptStates!=null&&(F(this.keptStates),this.keptStates=[]),Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(e=>nl([n,e])):this.states_[0]=nl([n,this.cell.stateSize]);else{if(Array.isArray(e)||(e=[e]),e.length!==this.states_.length)throw new q(`Layer ${this.name} expects ${this.states_.length} state(s), but it received ${e.length} state value(s). Input received: ${e}`);t===!0?this.keptStates.push(this.states_.slice()):F(this.states_);for(let t=0;t<this.states_.length;++t){let r=e[t],i=[n,Array.isArray(this.cell.stateSize)?this.cell.stateSize[t]:this.cell.stateSize];if(!y(r.shape,i))throw new q(`State ${t} is incompatible with layer ${this.name}: expected shape=${i}, received shape=${r.shape}`);this.states_[t]=r}}this.states_=this.states_.map(e=>Oi(e.clone()))})}apply(e,t){let n=t==null?null:t.initialState,r=t==null?null:t.constants;t??={};let i=tx(e,n,r,this.numConstants);e=i.inputs,n=i.initialState,r=i.constants;let a=[],o=[];if(n!=null){t.initialState=n,a=a.concat(n),this.stateSpec=[];for(let e of n)this.stateSpec.push(new wh({shape:e.shape}));o=o.concat(this.stateSpec)}if(r!=null&&(t.constants=r,a=a.concat(r),this.numConstants=r.length),a[0]instanceof Th){let n=[e].concat(a),r=this.inputSpec.concat(o),i=this.inputSpec;this.inputSpec=r;let s=super.apply(n,t);return this.inputSpec=i,s}return super.apply(e,t)}call(e,t){return P(()=>{let n=t==null?null:t.mask,r=t==null?null:t.training,i=t==null?null:t.initialState;e=Y(e),i??=this.stateful?this.states_:this.getInitialState(e);let a=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1;if(i.length!==a)throw new q(`RNN Layer has ${a} state(s) but was passed ${i.length} initial state(s).`);this.unroll&&console.warn(`Ignoring unroll = true for RNN layer, due to imperative backend.`);let o={training:r},s=nx((e,t)=>{let n=this.cell.call([e].concat(t),o);return[n[0],n.slice(1)]},e,i,this.goBackwards,n,null,this.unroll,this.returnSequences),c=s[0],l=s[1],u=s[2];this.stateful&&this.resetStates(u,r);let d=this.returnSequences?l:c;return this.returnState?[d].concat(u):d})}getInitialState(e){return P(()=>{let t=nl(e.shape);return t=U(t,[1,2]),t=wm(t),Array.isArray(this.cell.stateSize)?this.cell.stateSize.map(e=>e>1?Nm(t,[1,e]):t):this.cell.stateSize>1?[Nm(t,[1,this.cell.stateSize])]:[t]})}get trainableWeights(){return this.trainable?this.cell.trainableWeights:[]}get nonTrainableWeights(){return this.trainable?this.cell.nonTrainableWeights:this.cell.weights}setFastWeightInitDuringBuild(e){super.setFastWeightInitDuringBuild(e),this.cell!=null&&this.cell.setFastWeightInitDuringBuild(e)}getConfig(){let t=super.getConfig(),n={returnSequences:this.returnSequences,returnState:this.returnState,goBackwards:this.goBackwards,stateful:this.stateful,unroll:this.unroll};this.numConstants!=null&&(n.numConstants=this.numConstants);let r=this.cell.getConfig();return this.getClassName()===e.className&&(n.cell={className:this.cell.getClassName(),config:r}),Object.assign(Object.assign(Object.assign({},r),t),n)}static fromConfig(e,t,n={}){let r=t.cell,i=wv(r,n);return new e(Object.assign(t,{cell:i}))}};rx.className=`RNN`,K(rx);var ix=class extends Z{},ax=class extends ix{constructor(e){super(e),this.DEFAULT_ACTIVATION=`tanh`,this.DEFAULT_KERNEL_INITIALIZER=`glorotNormal`,this.DEFAULT_RECURRENT_INITIALIZER=`orthogonal`,this.DEFAULT_BIAS_INITIALIZER=`zeros`,this.units=e.units,Wp(this.units,`units`),this.activation=bb(e.activation==null?this.DEFAULT_ACTIVATION:e.activation),this.useBias=e.useBias==null||e.useBias,this.kernelInitializer=hh(e.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=hh(e.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=hh(e.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelRegularizer=Db(e.kernelRegularizer),this.recurrentRegularizer=Db(e.recurrentRegularizer),this.biasRegularizer=Db(e.biasRegularizer),this.kernelConstraint=fv(e.kernelConstraint),this.recurrentConstraint=fv(e.recurrentConstraint),this.biasConstraint=fv(e.biasConstraint),this.dropout=_m([1,vm([0,e.dropout==null?0:e.dropout])]),this.recurrentDropout=_m([1,vm([0,e.recurrentDropout==null?0:e.recurrentDropout])]),this.dropoutFunc=e.dropoutFunc,this.stateSize=this.units,this.dropoutMask=null,this.recurrentDropoutMask=null}build(e){e=X(e),this.kernel=this.addWeight(`kernel`,[e[e.length-1],this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight(`recurrent_kernel`,[this.units,this.units],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.bias=this.useBias?this.addWeight(`bias`,[this.units],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):null,this.built=!0}call(e,t){return P(()=>{if(e=e,e.length!==2)throw new q(`SimpleRNNCell expects 2 input Tensors, got ${e.length}.`);let n=e[1];e=e[0];let r=t.training!=null&&t.training;0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=fx({ones:()=>pl(e),rate:this.dropout,training:r,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=fx({ones:()=>pl(n),rate:this.recurrentDropout,training:r,dropoutFunc:this.dropoutFunc}));let i,a=this.dropoutMask,o=this.recurrentDropoutMask;i=Fm(a==null?e:B(e,a),this.kernel.read()),this.bias!=null&&(i=zm(i,this.bias.read())),o!=null&&(n=B(n,o));let s=R(i,Fm(n,this.recurrentKernel.read()));return this.activation!=null&&(s=this.activation.apply(s)),[s,s]})}getConfig(){let e=super.getConfig(),t={units:this.units,activation:vb(this.activation),useBias:this.useBias,kernelInitializer:mh(this.kernelInitializer),recurrentInitializer:mh(this.recurrentInitializer),biasInitializer:mh(this.biasInitializer),kernelRegularizer:Tb(this.kernelRegularizer),recurrentRegularizer:Tb(this.recurrentRegularizer),biasRegularizer:Tb(this.biasRegularizer),activityRegularizer:Tb(this.activityRegularizer),kernelConstraint:uv(this.kernelConstraint),recurrentConstraint:uv(this.recurrentConstraint),biasConstraint:uv(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout};return Object.assign(Object.assign({},e),t)}};ax.className=`SimpleRNNCell`,K(ax);var ox=class extends rx{constructor(e){e.cell=new ax(e),super(e)}call(e,t){return P(()=>{this.cell.dropoutMask!=null&&(F(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(F(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);let n=t==null?null:t.mask,r=t==null?null:t.training,i=t==null?null:t.initialState;return super.call(e,{mask:n,training:r,initialState:i})})}static fromConfig(e,t){return new e(t)}};ox.className=`SimpleRNN`,K(ox);var sx=class extends ix{constructor(e){if(super(e),this.DEFAULT_ACTIVATION=`tanh`,this.DEFAULT_RECURRENT_ACTIVATION=`hardSigmoid`,this.DEFAULT_KERNEL_INITIALIZER=`glorotNormal`,this.DEFAULT_RECURRENT_INITIALIZER=`orthogonal`,this.DEFAULT_BIAS_INITIALIZER=`zeros`,e.resetAfter)throw new q(`GRUCell does not support reset_after parameter set to true.`);this.units=e.units,Wp(this.units,`units`),this.activation=bb(e.activation===void 0?this.DEFAULT_ACTIVATION:e.activation),this.recurrentActivation=bb(e.recurrentActivation===void 0?this.DEFAULT_RECURRENT_ACTIVATION:e.recurrentActivation),this.useBias=e.useBias==null||e.useBias,this.kernelInitializer=hh(e.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=hh(e.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=hh(e.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelRegularizer=Db(e.kernelRegularizer),this.recurrentRegularizer=Db(e.recurrentRegularizer),this.biasRegularizer=Db(e.biasRegularizer),this.kernelConstraint=fv(e.kernelConstraint),this.recurrentConstraint=fv(e.recurrentConstraint),this.biasConstraint=fv(e.biasConstraint),this.dropout=_m([1,vm([0,e.dropout==null?0:e.dropout])]),this.recurrentDropout=_m([1,vm([0,e.recurrentDropout==null?0:e.recurrentDropout])]),this.dropoutFunc=e.dropoutFunc,this.implementation=e.implementation,this.stateSize=this.units,this.dropoutMask=null,this.recurrentDropoutMask=null}build(e){e=X(e);let t=e[e.length-1];this.kernel=this.addWeight(`kernel`,[t,this.units*3],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight(`recurrent_kernel`,[this.units,this.units*3],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.bias=this.useBias?this.addWeight(`bias`,[this.units*3],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):null,this.built=!0}call(e,t){return P(()=>{if(e=e,e.length!==2)throw new q(`GRUCell expects 2 input Tensors (inputs, h, c), got ${e.length}.`);let n=t.training!=null&&t.training,r=e[1];e=e[0],0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=fx({ones:()=>pl(e),rate:this.dropout,training:n,count:3,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=fx({ones:()=>pl(r),rate:this.recurrentDropout,training:n,count:3,dropoutFunc:this.dropoutFunc}));let i=this.dropoutMask,a=this.recurrentDropoutMask,o,s,c;0<this.dropout&&this.dropout<1&&(e=B(e,i[0]));let l=Fm(e,this.kernel.read());this.useBias&&(l=zm(l,this.bias.read())),0<this.recurrentDropout&&this.recurrentDropout<1&&(r=B(r,a[0]));let u=this.recurrentKernel.read(),[d,f]=fu(u,[2*this.units,this.units],u.rank-1),p=Fm(r,d),[m,h,g]=fu(l,3,l.rank-1),[_,v]=fu(p,2,p.rank-1);o=this.recurrentActivation.apply(R(m,_)),s=this.recurrentActivation.apply(R(h,v));let y=Fm(B(s,r),f);c=this.activation.apply(R(g,y));let b=R(B(o,r),B(R(1,Ic(o)),c));return[b,b]})}getConfig(){let e=super.getConfig(),t={units:this.units,activation:vb(this.activation),recurrentActivation:vb(this.recurrentActivation),useBias:this.useBias,kernelInitializer:mh(this.kernelInitializer),recurrentInitializer:mh(this.recurrentInitializer),biasInitializer:mh(this.biasInitializer),kernelRegularizer:Tb(this.kernelRegularizer),recurrentRegularizer:Tb(this.recurrentRegularizer),biasRegularizer:Tb(this.biasRegularizer),activityRegularizer:Tb(this.activityRegularizer),kernelConstraint:uv(this.kernelConstraint),recurrentConstraint:uv(this.recurrentConstraint),biasConstraint:uv(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout,implementation:this.implementation,resetAfter:!1};return Object.assign(Object.assign({},e),t)}};sx.className=`GRUCell`,K(sx);var cx=class extends rx{constructor(e){e.implementation===0&&console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."),e.cell=new sx(e),super(e)}call(e,t){return P(()=>{this.cell.dropoutMask!=null&&(F(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(F(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);let n=t==null?null:t.mask,r=t==null?null:t.training,i=t==null?null:t.initialState;return super.call(e,{mask:n,training:r,initialState:i})})}static fromConfig(e,t){return t.implmentation===0&&(t.implementation=1),new e(t)}};cx.className=`GRU`,K(cx);var lx=class extends ix{constructor(e){super(e),this.DEFAULT_ACTIVATION=`tanh`,this.DEFAULT_RECURRENT_ACTIVATION=`hardSigmoid`,this.DEFAULT_KERNEL_INITIALIZER=`glorotNormal`,this.DEFAULT_RECURRENT_INITIALIZER=`orthogonal`,this.DEFAULT_BIAS_INITIALIZER=`zeros`,this.units=e.units,Wp(this.units,`units`),this.activation=bb(e.activation===void 0?this.DEFAULT_ACTIVATION:e.activation),this.recurrentActivation=bb(e.recurrentActivation===void 0?this.DEFAULT_RECURRENT_ACTIVATION:e.recurrentActivation),this.useBias=e.useBias==null||e.useBias,this.kernelInitializer=hh(e.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=hh(e.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=hh(e.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.unitForgetBias=e.unitForgetBias,this.kernelRegularizer=Db(e.kernelRegularizer),this.recurrentRegularizer=Db(e.recurrentRegularizer),this.biasRegularizer=Db(e.biasRegularizer),this.kernelConstraint=fv(e.kernelConstraint),this.recurrentConstraint=fv(e.recurrentConstraint),this.biasConstraint=fv(e.biasConstraint),this.dropout=_m([1,vm([0,e.dropout==null?0:e.dropout])]),this.recurrentDropout=_m([1,vm([0,e.recurrentDropout==null?0:e.recurrentDropout])]),this.dropoutFunc=e.dropoutFunc,this.implementation=e.implementation,this.stateSize=[this.units,this.units],this.dropoutMask=null,this.recurrentDropoutMask=null}build(e){var t;e=X(e);let n=e[e.length-1];this.kernel=this.addWeight(`kernel`,[n,this.units*4],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight(`recurrent_kernel`,[this.units,this.units*4],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint);let r;if(this.useBias){if(this.unitForgetBias){let e=this.biasInitializer,n=this.units;r=new(t=class extends Ym{apply(t,r){let i=e.apply([n]),a=new Zm().apply([n]),o=e.apply([n*2]);return Mm(Mm(i,a),o)}},t.className=`CustomInit`,t)}else r=this.biasInitializer;this.bias=this.addWeight(`bias`,[this.units*4],null,r,this.biasRegularizer,!0,this.biasConstraint)}else this.bias=null;this.built=!0}call(e,t){return P(()=>{let n=t.training!=null&&t.training;if(e=e,e.length!==3)throw new q(`LSTMCell expects 3 input Tensors (inputs, h, c), got ${e.length}.`);let r=e[1],i=e[2];e=e[0],0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=fx({ones:()=>pl(e),rate:this.dropout,training:n,count:4,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=fx({ones:()=>pl(r),rate:this.recurrentDropout,training:n,count:4,dropoutFunc:this.dropoutFunc}));let a=this.dropoutMask,o=this.recurrentDropoutMask,s,c,l,u;0<this.dropout&&this.dropout<1&&(e=B(e,a[0]));let d=Fm(e,this.kernel.read());0<this.recurrentDropout&&this.recurrentDropout<1&&(r=B(r,o[0])),d=R(d,Fm(r,this.recurrentKernel.read())),this.useBias&&(d=zm(d,this.bias.read()));let[f,p,m,h]=fu(d,4,d.rank-1);s=this.recurrentActivation.apply(f),c=this.recurrentActivation.apply(p),l=R(B(c,i),B(s,this.activation.apply(m))),u=this.recurrentActivation.apply(h);let g=B(u,this.activation.apply(l));return[g,g,l]})}getConfig(){let e=super.getConfig(),t={units:this.units,activation:vb(this.activation),recurrentActivation:vb(this.recurrentActivation),useBias:this.useBias,kernelInitializer:mh(this.kernelInitializer),recurrentInitializer:mh(this.recurrentInitializer),biasInitializer:mh(this.biasInitializer),unitForgetBias:this.unitForgetBias,kernelRegularizer:Tb(this.kernelRegularizer),recurrentRegularizer:Tb(this.recurrentRegularizer),biasRegularizer:Tb(this.biasRegularizer),activityRegularizer:Tb(this.activityRegularizer),kernelConstraint:uv(this.kernelConstraint),recurrentConstraint:uv(this.recurrentConstraint),biasConstraint:uv(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout,implementation:this.implementation};return Object.assign(Object.assign({},e),t)}};lx.className=`LSTMCell`,K(lx);var ux=class extends rx{constructor(e){e.implementation===0&&console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."),e.cell=new lx(e),super(e)}call(e,t){return P(()=>{this.cell.dropoutMask!=null&&(F(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(F(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);let n=t==null?null:t.mask,r=t==null?null:t.training,i=t==null?null:t.initialState;return super.call(e,{mask:n,training:r,initialState:i})})}static fromConfig(e,t){return t.implmentation===0&&(t.implementation=1),new e(t)}};ux.className=`LSTM`,K(ux);var dx=class extends ix{constructor(e){super(e),this.cells=e.cells}get stateSize(){let e=[];for(let t of this.cells.slice().reverse())Array.isArray(t.stateSize)?e.push(...t.stateSize):e.push(t.stateSize);return e}call(e,t){return P(()=>{e=e;let n=e.slice(1),r=[];for(let e of this.cells.slice().reverse())Array.isArray(e.stateSize)?r.push(n.splice(0,e.stateSize.length)):r.push(n.splice(0,1));r.reverse();let i=[],a;for(let o=0;o<this.cells.length;++o){let s=this.cells[o];n=r[o],a=o===0?[e[0]].concat(n):[a[0]].concat(n),a=s.call(a,t),i.push(a.slice(1))}n=[];for(let e of i.slice().reverse())n.push(...e);return[a[0]].concat(n)})}build(e){gh(e)&&(e=e[0]),e=e;let t;this.cells.forEach((n,r)=>{lm(`RNNCell_${r}`,()=>{n.build(e),t=Array.isArray(n.stateSize)?n.stateSize[0]:n.stateSize,e=[e[0],t]})}),this.built=!0}getConfig(){let e=super.getConfig(),t={cells:this.cells.map(e=>({className:e.getClassName(),config:e.getConfig()}))};return Object.assign(Object.assign({},e),t)}static fromConfig(e,t,n={}){let r=[];for(let e of t.cells)r.push(wv(e,n));return new e({cells:r})}get trainableWeights(){if(!this.trainable)return[];let e=[];for(let t of this.cells)e.push(...t.trainableWeights);return e}get nonTrainableWeights(){let e=[];for(let t of this.cells)e.push(...t.nonTrainableWeights);if(!this.trainable){let t=[];for(let e of this.cells)t.push(...e.trainableWeights);return t.concat(e)}return e}getWeights(){let e=[];for(let t of this.cells)e.push(...t.weights);return Sh(e)}setWeights(e){let t=[];for(let n of this.cells){let r=n.weights.length,i=e.splice(r);for(let e=0;e<n.weights.length;++e)t.push([n.weights[e],i[e]])}Ch(t)}};dx.className=`StackedRNNCells`,K(dx);function fx(e){let{ones:t,rate:n,training:r=!1,count:i=1,dropoutFunc:a}=e,o=()=>a==null?Hm(t(),n):a(t(),n),s=()=>Wm(o,t,r);return!i||i<=1?Oi(s().clone()):Array(i).fill(void 0).map(s).map(e=>Oi(e.clone()))}
/**
* @license
* Copyright 2020 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var px=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols==`function`)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n},mx=class extends rx{constructor(e){if(e.unroll)throw new J(`Unrolling is not possible with convolutional RNNs.`);if(Array.isArray(e.cell))throw new J(`It is not possible at the moment to stack convolutional cells.`);super(e),this.inputSpec=[new wh({ndim:5})]}call(e,t){return P(()=>{if(this.cell.dropoutMask!=null&&(F(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(F(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null),t&&t.constants)throw new q(`ConvRNN2D cell does not support constants`);let n=t==null?null:t.mask,r=t==null?null:t.training,i=t==null?null:t.initialState;return super.call(e,{mask:n,training:r,initialState:i})})}computeOutputShape(e){let t=this.computeSingleOutputShape(e);return this.returnSequences||(t=[t[0],...t.slice(2)]),this.returnState&&(t=[t,...[,,].fill([e[0],...t.slice(-3)])]),t}getInitialState(e){return P(()=>{let{stateSize:t}=this.cell,n=e.shape,r=this.computeSingleOutputShape(n),i=nl([r[0],...r.slice(2)]);return Array.isArray(t)?Array(t.length).fill(i):[i]})}resetStates(e,t=!1){P(()=>{if(!this.stateful)throw new Cp(`Cannot call resetStates() on an RNN Layer that is not stateful.`);let n=this.inputSpec[0].shape,r=this.computeSingleOutputShape(n),i=[r[0],...r.slice(2)];if(n[0]==null)throw new q("If an RNN is stateful, it needs to know its batch size. Specify the batch size of your input tensors: \n- If using a Sequential model, specify the batch size by passing a `batchInputShape` option to your first layer.\n- If using the functional API, specify the batch size by passing a `batchShape` option to your Input layer.");if(this.getStates()==null)this.states_=Array.isArray(this.cell.stateSize)?this.cell.stateSize.map(()=>nl(i)):[nl(i)];else if(e==null)F(this.states_),this.keptStates!=null&&(F(this.keptStates),this.keptStates=[]),Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(()=>nl(i)):this.states_[0]=nl(i);else{if(Array.isArray(e)||(e=[e]),e.length!==this.states_.length)throw new q(`Layer ${this.name} expects ${this.states_.length} state(s), but it received ${e.length} state value(s). Input received: ${e}`);t?this.keptStates.push(this.states_.slice()):F(this.states_);for(let t=0;t<this.states_.length;++t){let n=e[t],r=i;if(!y(n.shape,r))throw new q(`State ${t} is incompatible with layer ${this.name}: expected shape=${r}, received shape=${n.shape}`);this.states_[t]=n}}this.states_=this.states_.map(e=>Oi(e.clone()))})}computeSingleOutputShape(e){let{dataFormat:t,filters:n,kernelSize:r,padding:i,strides:a,dilationRate:o}=this.cell,s=t===`channelsFirst`,c=e[s?3:2],l=e[s?4:3],u=Fb(c,r[0],i,a[0],o[0]),d=Fb(l,r[1],i,a[1],o[1]);return[...e.slice(0,2),...s?[n,u,d]:[u,d,n]]}};mx.className=`ConvRNN2D`;var hx=class extends lx{constructor(e){let{filters:t,kernelSize:n,strides:r,padding:i,dataFormat:a,dilationRate:o}=e;super(Object.assign(Object.assign({},e),{units:t})),this.filters=t,Wp(this.filters,`filters`),this.kernelSize=Pb(n,2,`kernelSize`),this.kernelSize.forEach(e=>Wp(e,`kernelSize`)),this.strides=Pb(r||1,2,`strides`),this.strides.forEach(e=>Wp(e,`strides`)),this.padding=i||`valid`,om(this.padding),this.dataFormat=a||`channelsLast`,im(this.dataFormat),this.dilationRate=Pb(o||1,2,`dilationRate`),this.dilationRate.forEach(e=>Wp(e,`dilationRate`))}build(e){var t;e=X(e);let n=this.dataFormat===`channelsFirst`?1:e.length-1;if(e[n]==null)throw new q(`The channel dimension of the input should be defined. Found ${e[n]}`);let r=e[n],i=this.kernelSize.concat([r,this.filters*4]);this.kernel=this.addWeight(`kernel`,i,null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint);let a=this.kernelSize.concat([this.filters,this.filters*4]);if(this.recurrentKernel=this.addWeight(`recurrent_kernel`,a,null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias){let e;if(this.unitForgetBias){let n=this.biasInitializer,r=this.filters;e=new(t=class extends Ym{apply(e,t){return jm([n.apply([r]),rl([r]),n.apply([r*2])])}},t.className=`CustomInit`,t)}else e=this.biasInitializer;this.bias=this.addWeight(`bias`,[this.filters*4],null,e,this.biasRegularizer,!0,this.biasConstraint)}this.built=!0}call(e,t){return P(()=>{if(e.length!==3)throw new q(`ConvLSTM2DCell expects 3 input Tensors (inputs, h, c), got ${e.length}.`);let n=t.training||!1,r=e[0],i=e[1],a=e[2];0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=fx({ones:()=>pl(r),rate:this.dropout,training:n,count:4,dropoutFunc:this.dropoutFunc}));let o=this.dropoutMask,s=(e,t,n)=>!t||!t[n]?e:B(t[n],e),c=s(r,o,0),l=s(r,o,1),u=s(r,o,2),d=s(r,o,3);0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=fx({ones:()=>pl(i),rate:this.recurrentDropout,training:n,count:4,dropoutFunc:this.dropoutFunc}));let f=this.recurrentDropoutMask,p=s(i,f,0),m=s(i,f,1),h=s(i,f,2),g=s(i,f,3),[_,v,y,b]=fu(this.kernel.read(),4,3),[x,S,C,w]=this.useBias?fu(this.bias.read(),4):[null,null,null,null];c=this.inputConv(c,_,x,this.padding),l=this.inputConv(l,v,S,this.padding),u=this.inputConv(u,y,C,this.padding),d=this.inputConv(d,b,w,this.padding);let[T,E,D,O]=fu(this.recurrentKernel.read(),4,3);p=this.recurrentConv(p,T),m=this.recurrentConv(m,E),h=this.recurrentConv(h,D),g=this.recurrentConv(g,O);let ee=this.recurrentActivation.apply(R(c,p)),te=this.recurrentActivation.apply(R(l,m)),ne=R(B(te,a),B(ee,this.activation.apply(R(u,h)))),re=B(this.recurrentActivation.apply(R(d,g)),this.activation.apply(ne));return[re,re,ne]})}getConfig(){let e=super.getConfig(),{units:t}=e,n=px(e,[`units`]),r={filters:this.filters,kernelSize:this.kernelSize,padding:this.padding,dataFormat:this.dataFormat,dilationRate:this.dilationRate,strides:this.strides};return Object.assign(Object.assign({},n),r)}inputConv(e,t,n,r){let i=Zo(e,t,this.strides,r||`valid`,this.dataFormat===`channelsFirst`?`NCHW`:`NHWC`,this.dilationRate);return n?zm(i,n,this.dataFormat):i}recurrentConv(e,t){return Zo(e,t,1,`same`,this.dataFormat===`channelsFirst`?`NCHW`:`NHWC`)}};hx.className=`ConvLSTM2DCell`,K(hx);var gx=class extends mx{constructor(e){let t=new hx(e);super(Object.assign(Object.assign({},e),{cell:t}))}static fromConfig(e,t){return new e(t)}};gx.className=`ConvLSTM2D`,K(gx);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var _x=class extends Z{constructor(e){super(e),this.rate=Math.max(Math.min(e.rate,1),0),this.noiseShape=e.noiseShape,this.seed=e.seed,this.supportsMasking=!0}getNoiseShape(e){if(this.noiseShape==null)return this.noiseShape;let t=e.shape,n=[];for(let e=0;e<this.noiseShape.length;++e)n.push(this.noiseShape[e]==null?t[e]:this.noiseShape[e]);return n}call(e,t){return P(()=>{this.invokeCallHook(e,t);let n=Y(e);if(0<this.rate&&this.rate<1){let e=t.training!=null&&t.training,r=this.getNoiseShape(n);return Wm(()=>Hm(n,this.rate,r,this.seed),()=>n,e)}return e})}getConfig(){let e={rate:this.rate,noiseShape:this.noiseShape,seed:this.seed},t=super.getConfig();return Object.assign(e,t),e}dispose(){return super.dispose()}};_x.className=`Dropout`,K(_x);var vx=class extends _x{constructor(e){super(e),this.inputSpec=[{ndim:3}]}getNoiseShape(e){let t=e.shape;return[t[0],1,t[2]]}};vx.className=`SpatialDropout1D`,K(vx);var yx=class extends Z{constructor(e){if(super(e),this.activation=null,this.useBias=!0,this.kernel=null,this.bias=null,this.DEFAULT_KERNEL_INITIALIZER=`glorotNormal`,this.DEFAULT_BIAS_INITIALIZER=`zeros`,e.batchInputShape==null&&e.inputShape==null&&e.inputDim!=null){let t=null;e.batchSize!=null&&(t=e.batchSize),this.batchInputShape=[t,e.inputDim]}this.units=e.units,Wp(this.units,`units`),this.activation=bb(e.activation),e.useBias!=null&&(this.useBias=e.useBias),this.kernelInitializer=hh(e.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.biasInitializer=hh(e.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelConstraint=fv(e.kernelConstraint),this.biasConstraint=fv(e.biasConstraint),this.kernelRegularizer=Db(e.kernelRegularizer),this.biasRegularizer=Db(e.biasRegularizer),this.activityRegularizer=Db(e.activityRegularizer),this.supportsMasking=!0,this.inputSpec=[{minNDim:2}]}build(e){e=X(e);let t=e[e.length-1];this.kernel??(this.kernel=this.addWeight(`kernel`,[t,this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight(`bias`,[this.units],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint))),this.inputSpec=[{minNDim:2,axes:{[-1]:t}}],this.built=!0}computeOutputShape(e){e=X(e);let t=e.slice();return t[t.length-1]=this.units,t}call(e,t){return P(()=>{this.invokeCallHook(e,t);let n=Y(e),r=qp(this.activation.getClassName()),i;return r==null?(i=Fm(n,this.kernel.read()),this.bias!=null&&(i=zm(i,this.bias.read())),this.activation!=null&&(i=this.activation.apply(i))):i=Fm(n,this.kernel.read(),r,this.bias?this.bias.read():null),i})}getConfig(){let e={units:this.units,activation:vb(this.activation),useBias:this.useBias,kernelInitializer:mh(this.kernelInitializer),biasInitializer:mh(this.biasInitializer),kernelRegularizer:Tb(this.kernelRegularizer),biasRegularizer:Tb(this.biasRegularizer),activityRegularizer:Tb(this.activityRegularizer),kernelConstraint:uv(this.kernelConstraint),biasConstraint:uv(this.biasConstraint)},t=super.getConfig();return Object.assign(e,t),e}};yx.className=`Dense`,K(yx);var bx=class extends Z{constructor(e){e||={},super(e),this.inputSpec=[{minNDim:3}],this.dataFormat=e.dataFormat}computeOutputShape(e){e=X(e);for(let t of e.slice(1))if(t==null)throw new q(`The shape of the input to "Flatten" is not fully defined (got ${e.slice(1)}). Make sure to pass a complete "input_shape" or "batch_input_shape" argument to the first layer in your model.`);return[e[0],gm(e,1)]}call(e,t){return P(()=>{this.invokeCallHook(e,t);let n=Y(e);if(this.dataFormat===`channelsFirst`&&n.rank>1){let e=[0];for(let t=2;t<n.rank;++t)e.push(t);e.push(1),n=G(n,e)}return Dm(n)})}getConfig(){let e={};this.dataFormat!=null&&(e.dataFormat=this.dataFormat);let t=super.getConfig();return Object.assign(e,t),e}};bx.className=`Flatten`,K(bx);var xx=class extends Z{constructor(e){super(e),this.supportsMasking=!0,this.activation=bb(e.activation)}call(e,t){return P(()=>{this.invokeCallHook(e,t);let n=Y(e);return this.activation.apply(n)})}getConfig(){let e={activation:vb(this.activation)},t=super.getConfig();return Object.assign(e,t),e}};xx.className=`Activation`,K(xx);var Sx=class extends Z{constructor(e){super(e),this.n=e.n,this.inputSpec=[{ndim:2}]}computeOutputShape(e){return[e[0],this.n,e[1]]}call(e,t){return P(()=>(e=Y(e),Tm(e,this.n)))}getConfig(){let e={n:this.n},t=super.getConfig();return Object.assign(e,t),e}};Sx.className=`RepeatVector`,K(Sx);var Cx=class extends Z{constructor(e){super(e),this.targetShape=e.targetShape;for(let e=0;e<this.targetShape.length;++e)this.isUnknown(this.targetShape[e])&&(this.targetShape[e]=null)}isUnknown(e){return e<0||e==null}fixUnknownDimension(e,t){let n=`Total size of new array must be unchanged.`,r=t.slice(),i=1,a=null;for(let e=0;e<r.length;++e){let t=r[e];if(this.isUnknown(t)){if(a===null)a=e;else throw new q(`Can only specifiy one unknown dimension.`)}else i*=t}let o=gm(e);if(a!==null){if(i===0||o%i!==0)throw new q(n);r[a]=o/i}else if(o!==i)throw new q(n);return r}computeOutputShape(e){let t=!1;for(let n=0;n<e.length;++n)if(this.isUnknown(e[n])){t=!0;break}return t?e.slice(0,1).concat(this.targetShape):e.slice(0,1).concat(this.fixUnknownDimension(e.slice(1),this.targetShape))}call(e,t){return P(()=>{this.invokeCallHook(e,t);let n=Y(e),r=n.shape,i=r.slice(0,1).concat(this.fixUnknownDimension(r.slice(1),this.targetShape));return V(n,i)})}getConfig(){let e={targetShape:this.targetShape},t=super.getConfig();return Object.assign(e,t),e}};Cx.className=`Reshape`,K(Cx);var wx=class extends Z{constructor(e){if(super(e),e.dims==null)throw Error("Required configuration field `dims` is missing during Permute constructor call.");if(!Array.isArray(e.dims))throw Error(`Permute constructor requires \`dims\` to be an Array, but received ${e.dims} instead.`);let t=ym(1,e.dims.length+1);if(!y(e.dims.slice().sort(),t))throw Error("Invalid permutation `dims`: "+JSON.stringify(e.dims)+" `dims` must contain consecutive integers starting from 1.");this.dims=e.dims,this.dimsIncludingBatch=[0].concat(this.dims),this.inputSpec=[new wh({ndim:this.dims.length+1})]}computeOutputShape(e){e=X(e);let t=e.slice();return this.dims.forEach((n,r)=>{t[r+1]=e[n]}),t}call(e,t){return G(Y(e),this.dimsIncludingBatch)}getConfig(){let e={dims:this.dims},t=super.getConfig();return Object.assign(e,t),e}};wx.className=`Permute`,K(wx);var Tx=class extends Z{constructor(e){super(e??{}),this.supportsMasking=!0,this.maskValue=e==null||e.maskValue==null?0:e.maskValue}computeOutputShape(e){return e}getConfig(){let e=super.getConfig(),t={maskValue:this.maskValue};return Object.assign(t,e),t}computeMask(e,t){let n=Y(e);return Ba(ll(n,this.maskValue),-1)}call(e,t){return P(()=>{this.invokeCallHook(e,t);let n=Y(e),r=Ba(ll(n,this.maskValue),-1,!0);return B(n,L(r,n.dtype))})}};Tx.className=`Masking`,K(Tx);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var Ex=class extends Z{constructor(e){if(super(e),this.embeddings=null,this.DEFAULT_EMBEDDINGS_INITIALIZER=`randomUniform`,e.batchInputShape==null&&e.inputShape==null){let t=null;e.batchSize!=null&&(t=e.batchSize),this.batchInputShape=e.inputLength==null?[t,null]:[t].concat(jp(e.inputLength))}this.inputDim=e.inputDim,Wp(this.inputDim,`inputDim`),this.outputDim=e.outputDim,Wp(this.outputDim,`outputDim`),this.embeddingsInitializer=hh(e.embeddingsInitializer||this.DEFAULT_EMBEDDINGS_INITIALIZER),this.embeddingsRegularizer=Db(e.embeddingsRegularizer),this.activityRegularizer=Db(e.activityRegularizer),this.embeddingsConstraint=fv(e.embeddingsConstraint),this.maskZero=e.maskZero,this.supportsMasking=e.maskZero,this.inputLength=e.inputLength}build(e){this.embeddings=this.addWeight(`embeddings`,[this.inputDim,this.outputDim],this.dtype,this.embeddingsInitializer,this.embeddingsRegularizer,!0,this.embeddingsConstraint),this.built=!0}warnOnIncompatibleInputShape(e){}computeMask(e,t){return P(()=>this.maskZero?(e=Y(e),ll(e,H(e))):null)}computeOutputShape(e){if(e=X(e),this.inputLength==null)return[...e,this.outputDim];let t=jp(this.inputLength);if(t.length!==e.length-1)throw new q(`"inputLength" is ${this.inputLength}, but received input shape has shape ${e}`);{let n=0;for(let r=0;r<t.length;++r){let i=t[r],a=e[r+1];if(i!=null&&a!=null&&i!==a)throw new q(`"inputLength" is ${this.inputLength}, but received input shape has shape ${e}`);i??(t[n]=a),n++}}return[e[0],...t,this.outputDim]}call(e,t){return P(()=>{this.invokeCallHook(e,t);let n=Y(e);n.dtype!==`int32`&&(n=Cm(n,`int32`));let r=Im(this.embeddings.read(),V(n,[n.size]));return V(r,X(this.computeOutputShape(n.shape)))})}getConfig(){let e={inputDim:this.inputDim,outputDim:this.outputDim,embeddingsInitializer:mh(this.embeddingsInitializer),embeddingsRegularizer:Tb(this.embeddingsRegularizer),activityRegularizer:Tb(this.activityRegularizer),embeddingsConstraint:uv(this.embeddingsConstraint),maskZero:this.maskZero,inputLength:this.inputLength},t=super.getConfig();return Object.assign(e,t),e}};Ex.className=`Embedding`,K(Ex);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var Dx=class extends Z{constructor(e){super(e||{}),this.supportsMasking=!0}mergeFunction(e){throw new J}computeElementwiseOpOutputShape(e,t){if(e==null||t==null)return null;if(e.length<t.length)return this.computeElementwiseOpOutputShape(t,e);if(t.length===0)return e;let n=e.slice(0,e.length-t.length);for(let r=0;r<t.length;++r){let i=e[e.length-t.length+r],a=t[r];if(i==null||a==null||i<0||a<0)n.push(null);else if(i===1)n.push(a);else if(a===1)n.push(i);else{if(i!==a)throw new q(`Operands could not be broadcast together with shapes `+JSON.stringify(e)+` `+JSON.stringify(t));n.push(i)}}return n}build(e){if(Array.isArray(e)&&!Array.isArray(e[0])&&(e=[X(e)]),e=e,e.length<2)throw new q(`A merge layer should be called on an Array of at least 2 inputs. Got ${e.length} input(s).`);let t=[];for(let n of e)n!=null&&n[0]!==null&&t.push(n[0]);if(t=Bp(t),t.length>1)throw new q(`Can not merge tensors with different batch sizes. Got tensors with shapes: ${JSON.stringify(e)}.`);let n=e[0]==null?null:e[0].slice(1);for(let t=1;t<e.length;++t){let r=e[t]==null?null:e[t].slice(1);n=this.computeElementwiseOpOutputShape(n,r)}let r=e.map(e=>e.length);this.reshapeRequired=e.indexOf(null)!==-1||Bp(r).length!==1}call(e,t){return P(()=>{if(e=e,this.reshapeRequired){let t=[],n=e.map(e=>e.rank);if(n.indexOf(null)===-1){let r=vm(n);for(let n of e){let e=n.rank;for(let t=0;t<r-e;++t)n=wm(n,1);t.push(n)}return this.mergeFunction(t)}{let n=!1;for(let r of e){let e=r.rank;if(e==null){let e=r.shape,i=e[0],a=e.slice(1).concat([i]),o=V(r,[i].concat(gm(e.slice(1))));o=G(o,[1,0]),o=V(o,a),t.push(o),n=!0}else if(e>1){let i=ym(1,e).concat([0]);t.push(G(r,i)),n=!0}else t.push(r)}let r=this.mergeFunction(t),i=r.rank;if(n){if(i==null){let e=r.shape,t=e[e.length-1],n=[t].concat(e.slice(0,e.length-1));r=V(G(V(r,[-1,t]),[1,0]),n)}else if(i>1){let e=[i-1].concat(ym(0,i-1));r=G(r,e)}}return r}}return this.mergeFunction(e)})}computeOutputShape(e){e=e;let t;t=e[0]==null?null:e[0].slice(1);for(let n=1;n<e.length;++n){let r=e[n]==null?null:e[n].slice(1);t=this.computeElementwiseOpOutputShape(t,r)}let n=[];for(let t of e)t!=null&&t[0]!==null&&n.push(t[0]);return n=Bp(n),t=n.length===1?n.concat(t):[null].concat(t),t}computeMask(e,t){return P(()=>{if(t==null)return null;if(!Array.isArray(t))throw new q("`mask` should be an Array");if(!Array.isArray(e))throw new q("`inputs` should be an Array");if(t.length!==e.length)throw new q(`The Array 'inputs' and 'mask' are expected to have the same length, but have different lengths (${e.length} vs ${t.length})`);if(t.every(e=>e==null))return null;t=t.map(e=>e==null?e:cc(e,0));let n=t[0];for(let e=1;e<t.length-1;++e)n=Gc(n,t[e]);return n})}},Ox=class extends Dx{constructor(e){super(e)}mergeFunction(e){return P(()=>{let t=e[0].clone();for(let n=1;n<e.length;++n)t=R(t,e[n]);return t})}};Ox.className=`Add`,K(Ox);var kx=class extends Dx{constructor(e){super(e)}mergeFunction(e){return P(()=>{let t=e[0].clone();for(let n=1;n<e.length;++n)t=B(t,e[n]);return t})}};kx.className=`Multiply`,K(kx);var Ax=class extends Dx{constructor(e){super(e)}mergeFunction(e){return P(()=>{let t=e[0].clone();for(let n=1;n<e.length;++n)t=R(t,e[n]);return B(1/e.length,t)})}};Ax.className=`Average`,K(Ax);var jx=class extends Dx{constructor(e){super(e)}mergeFunction(e){return P(()=>{let t=e[0];for(let n=1;n<e.length;++n)t=$c(t,e[n]);return t})}};jx.className=`Maximum`,K(jx);var Mx=class extends Dx{constructor(e){super(e)}mergeFunction(e){return P(()=>{let t=e[0];for(let n=1;n<e.length;++n)t=al(t,e[n]);return t})}};Mx.className=`Minimum`,K(Mx);var Nx=class extends Dx{constructor(e){super(e),this.DEFAULT_AXIS=-1,e??={},this.axis=e.axis==null?this.DEFAULT_AXIS:e.axis,this.supportsMasking=!0,this.reshapeRequired=!1}build(e){if(!(Array.isArray(e)&&Array.isArray(e[0]))||e.length===1)throw new q("A `Concatenate` layer should be called on a list of at least 2 inputs");e=e;let t=!0;for(let n of e)if(n!=null){t=!1;break}if(t)return;let n=[];for(let t=0;t<e.length;++t){let r=e[t].slice();r.splice(this.axis,1);let i=!1;for(let e of n)if(y(e,r)){i=!0;break}i||n.push(r)}if(n.length>1)throw new q("A `Concatenate` layer requires inputs with matching shapes except for the concat axis. Got input shapes: "+JSON.stringify(e))}mergeFunction(e){return P(()=>jm(e,this.axis))}computeOutputShape(e){if(!(Array.isArray(e)&&Array.isArray(e[0])))throw new q("A `Concatenate` layer should be called on a list of inputs.");let t=e,n=t[0].slice(),r=this.axis<0?n.length+this.axis:this.axis;for(let e of t.slice(1)){if(n[r]==null||e[r]==null){n[r]=null;break}n[r]+=e[r]}return n}computeMask(e,t){if(t==null)return null;if(!Array.isArray(t))throw new q("`mask` should be an array for Concatenate");if(!Array.isArray(e))throw new q("`inputs` should be an array for Concatenate");if(t.length!==e.length)throw new q(`Mismatch in the length of mask (${t.length}) and the legnth of inputs (${e.length})`);return P(()=>{let n=!0;if(t.forEach(e=>{e!=null&&(n=!1)}),n)return null;let r=[];for(let n=0;n<e.length;++n)t[n]==null?r.push(L(pl(e[n]),`bool`)):t[n].rank<e[n].rank?r.push(cc(t[n],-1)):r.push(t[n]);let i=ho(r,this.axis);return Ra(i,-1,!1)})}getConfig(){let e={axis:this.axis},t=super.getConfig();return Object.assign(e,t),e}};Nx.className=`Concatenate`,K(Nx);function Px(e,t){for(;e<0;)e+=t;return e}function Fx(e,t,n){if(e.shape.length>3||t.shape.length>3)throw new J(`batchDot is not implemented for tensors of 4D or higher rank yet`);if(h(e.shape.length>=2,()=>`batchDot requires the rank of x to be >= 2, but got ${e.shape.length}`),h(e.shape.length>=2,()=>`batchDot requires the rank of y to be >= 2, but got ${t.shape.length}`),typeof n==`number`&&(n=[n,n]),e.dtype===`complex64`||t.dtype===`complex64`)throw new J(`batchDot is not implemented for complex64-type Tensors yet.`);let r=e.shape.length,i=t.shape.length;n??=[r-1,i-2];let a=n;return P(()=>{let n;if(r>i){n=r-i;let e=[];for(let t=0;t<n;++t)e.push(1);t=V(t,t.shape.concat(e))}else if(i>r){n=i-r;let t=[];for(let e=0;e<n;++e)t.push(1);e=V(e,e.shape.concat(t))}else n=0;let o;if(e.shape.length===2&&t.shape.length===2)o=a[0]===a[1]?U(B(e,t),a[0]):U(B(G(e,[1,0]),t),a[1]);else{let n=a[0]!==e.shape.length-1,r=a[1]===t.shape.length-1;o=_o(e,t,n,r)}if(n>0){let e;e=r>i?r+i-3:r-1;let t=[];for(let r=e;r<e+n;++r)t.push(r);o=mu(o,t)}return o.shape.length===1&&(o=cc(o,1)),o})}var Ix=class extends Dx{constructor(e){super(e),this.axes=e.axes,this.normalize=e.normalize!=null&&e.normalize,this.supportsMasking=!0,this.reshapeRequired=!1}build(e){h(Array.isArray(e)&&e.length===2&&Array.isArray(e[0])&&Array.isArray(e[1]),()=>"A `Dot` layer should be called on a list of exactly 2 inputs.");let t=e[0],n=e[1];if(t.length>3||n.length>3)throw new J(`Dot layer does not support tensors of 4D or higher rank yet.`);let r=this.interpretAxes(t,n);if(t[r[0]]!==n[r[1]])throw new q(`Dimension incompatibility: ${t[r[0]]} !== ${n[r[1]]}`)}mergeFunction(e){if(e.length!==2)throw new q(`A \`Dot\` layer must be called on exactly 2 inputs, but received ${e.length} input(s).`);let t=e[0],n=e[1],r;return r=Array.isArray(this.axes)?this.axes.map((t,n)=>Px(t,e[n].shape.length)):[Px(this.axes,t.shape.length),Px(this.axes,n.shape.length)],this.normalize&&(t=Tv(t,r[0]),n=Tv(n,r[1])),Fx(t,n,r)}interpretAxes(e,t){let n;return n=Array.isArray(this.axes)?this.axes:[Px(this.axes,e.length),Px(this.axes,t.length)],n}computeOutputShape(e){h(Array.isArray(e)&&e.length===2&&Array.isArray(e[0])&&Array.isArray(e[1]),()=>"A `Dot` layer should be called on a list of exactly 2 inputs.");let t=e[0].slice(),n=e[1].slice();if(t.length>3||n.length>3)throw new J(`Dot layer does not support tensors of 4D or higher rank yet.`);let r=this.interpretAxes(t,n);t.splice(r[0],1),n.splice(r[1],1),n.splice(0,1);let i=t.concat(n);return i.length===1&&i.push(1),i}computeMask(e,t){return null}getConfig(){let e={axes:this.axes,normalize:this.normalize},t=super.getConfig();return Object.assign(e,t),e}};Ix.className=`Dot`,K(Ix);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var Lx=class extends Z{constructor(e){super(e),this.supportsMasking=!0,this.stddev=e.stddev}computeOutputShape(e){return e}getConfig(){let e=super.getConfig(),t={stddev:this.stddev};return Object.assign(t,e),t}call(e,t){return P(()=>{this.invokeCallHook(e,t);let n=Y(e);return Wm(()=>R(Pm(n.shape,0,this.stddev),n),()=>n,t.training||!1)})}};Lx.className=`GaussianNoise`,K(Lx);var Rx=class extends Z{constructor(e){super(e),this.supportsMasking=!0,this.rate=e.rate}computeOutputShape(e){return e}getConfig(){let e=super.getConfig(),t={rate:this.rate};return Object.assign(t,e),t}call(e,t){return P(()=>{this.invokeCallHook(e,t);let n=Y(e);return this.rate>0&&this.rate<1?Wm(()=>{let e=Math.sqrt(this.rate/(1-this.rate));return B(n,Pm(n.shape,1,e))},()=>n,t.training||!1):n})}};Rx.className=`GaussianDropout`,K(Rx);var zx=class extends Z{constructor(e){super(e),this.supportsMasking=!0,this.rate=e.rate,this.noiseShape=e.noiseShape}_getNoiseShape(e){return this.noiseShape||Y(e).shape}computeOutputShape(e){return e}getConfig(){let e=super.getConfig(),t={rate:this.rate};return Object.assign(t,e),t}call(e,t){return P(()=>{if(this.rate<1&&this.rate>0){let n=this._getNoiseShape(e);return Wm(()=>{let t=Y(e),r=-1.7580993408473766,i=bc(Nl(n),this.rate);i=Cm(i,`float32`);let a=((1-this.rate)*(1+this.rate*r**2))**-.5,o=-a*r*this.rate,s=R(B(t,i),B(R(i,-1),r));return R(B(s,a),o)},()=>Y(e),t.training||!1)}return e})}};zx.className=`AlphaDropout`,K(zx);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Bx(e,t,n,r,i,a=.001){let o;if(e.rank===2)o=Ao(e,t,n,r,i,a);else if(e.rank===3)o=Mo(e,t,n,r,i,a);else if(e.rank===4)o=Po(e,t,n,r,i,a);else throw new J(`batchNormalization is not implemented for array of rank ${e.rank} yet`);return o}function Vx(e,t,n,r,i=.001){return P(()=>{let a=sl(e,r),o=a.mean,s=a.variance;return[Bx(e,o,s,n,t,i),o,s]})}function Hx(e,t,n,r,i=.001){return P(()=>{let a=sl(e,r),o=a.mean,s=a.variance,c=[];for(let t of ym(0,e.rank))r.indexOf(t)===-1?c.push(e.shape[t]):c.push(1);let l=V(o,c),u=V(s,c),d=t==null?null:V(t,c);return[Bx(e,l,u,n==null?null:V(n,c),d,i),o,s]})}function Ux(e,t,n,r,i=.001){return y(r.slice().sort(),ym(0,e.rank-1))?Vx(e,t,n,r,i):Hx(e,t,n,r,i)}var Wx=class extends Z{constructor(e){e??={},super(e),this.supportsMasking=!0,this.axis=e.axis==null?-1:e.axis,this.momentum=e.momentum==null?.99:e.momentum,this.epsilon=e.epsilon==null?.001:e.epsilon,this.center=e.center==null||e.center,this.scale=e.scale==null||e.scale,this.betaInitializer=hh(e.betaInitializer||`zeros`),this.gammaInitializer=hh(e.gammaInitializer||`ones`),this.movingMeanInitializer=hh(e.movingMeanInitializer||`zeros`),this.movingVarianceInitializer=hh(e.movingVarianceInitializer||`ones`),this.betaConstraint=fv(e.betaConstraint),this.gammaConstraint=fv(e.gammaConstraint),this.betaRegularizer=Db(e.betaRegularizer),this.gammaRegularizer=Db(e.gammaRegularizer)}build(e){e=X(e);let t=this.axis>=0?this.axis:this.axis+e.length,n=e[t];if(n==null)throw new q(`Axis ${t} of input tensor should have a defined dimension but the layer received an input with shape ${JSON.stringify(e)}.`);this.inputSpec=[new wh({ndim:e.length,axes:{[t]:n}})];let r=[n];this.scale&&(this.gamma=this.addWeight(`gamma`,r,null,this.gammaInitializer,this.gammaRegularizer,!0,this.gammaConstraint)),this.center&&(this.beta=this.addWeight(`beta`,r,null,this.betaInitializer,this.betaRegularizer,!0,this.betaConstraint)),this.movingMean=this.addWeight(`moving_mean`,r,null,this.movingMeanInitializer,null,!1),this.movingVariance=this.addWeight(`moving_variance`,r,null,this.movingVarianceInitializer,null,!1),this.built=!0}call(e,t){return P(()=>{let n=t.training!=null&&t.training,r=Y(e),i=r.shape,a=i.length,o=ym(0,a),s=this.axis>=0?this.axis:this.axis+a;o.splice(s,1);let c=Dp(1,a);c[s]=i[s];let l=o.slice();l.sort();let u=!y(l,ym(0,a).slice(0,a-1)),d=()=>{if(u){let e=V(this.movingMean.read(),c),t=V(this.movingVariance.read(),c),n=this.center?V(this.beta.read(),c):null,i=this.scale?V(this.gamma.read(),c):null;return Bx(r,e,t,n,i,this.epsilon)}return Bx(r,this.movingMean.read(),this.movingVariance.read(),this.beta==null?null:this.beta.read(),this.gamma==null?null:this.gamma.read(),this.epsilon)};if(!n)return d();let[f,p,m]=Ux(r,this.gamma.read(),this.beta.read(),o,this.epsilon),h=(e,t,n)=>{P(()=>{let r=1-n,i=e.read(),a=B(W(i,t),r);e.write(W(i,a))})};return h(this.movingMean,p,this.momentum),h(this.movingVariance,m,this.momentum),f})}getConfig(){let e={axis:this.axis,momentum:this.momentum,epsilon:this.epsilon,center:this.center,scale:this.scale,betaInitializer:mh(this.betaInitializer),gammaInitializer:mh(this.gammaInitializer),movingMeanInitializer:mh(this.movingMeanInitializer),movingVarianceInitializer:mh(this.movingVarianceInitializer),betaRegularizer:Tb(this.betaRegularizer),gammaRegularizer:Tb(this.gammaRegularizer),betaConstraint:uv(this.betaConstraint),gammaConstraint:uv(this.gammaConstraint)},t=super.getConfig();return Object.assign(e,t),e}};Wx.className=`BatchNormalization`,K(Wx);var Gx=class extends Z{constructor(e){if(e??={},super(e),this.axis=e.axis==null?-1:e.axis,typeof this.axis==`number`){if(!Number.isInteger(this.axis))throw Error(`Expected axis to be an integer, but received ${this.axis}`)}else if(Array.isArray(this.axis)){for(let e of this.axis)if(!Number.isInteger(e))throw Error(`Expected axis to be an array of integers, but received ${JSON.stringify(this.axis)}`)}else throw Error(`Expected axis to be an integer or an array of integers, but received ${JSON.stringify(this.axis)}`);this.epsilon=e.epsilon==null?.001:e.epsilon,this.center=e.center==null||e.center,this.scale=e.scale==null||e.scale,this.betaInitializer=hh(e.betaInitializer||`zeros`),this.gammaInitializer=hh(e.gammaInitializer||`ones`),this.betaRegularizer=Db(e.betaRegularizer),this.gammaRegularizer=Db(e.gammaRegularizer),this.supportsMasking=!0}build(e){e=X(e);let t=e.length;typeof this.axis==`number`&&(this.axis=[this.axis]);for(let e=0;e<this.axis.length;++e)this.axis[e]<0&&(this.axis[e]+=t);for(let e of this.axis)if(e<0||e>=t)throw Error(`Invalid axis: ${e}`);if(this.axis.length!==Bp(this.axis).length)throw Error(`Found duplicate axes in: ${this.axis}`);let n=this.axis.map(t=>e[t]);this.gamma=this.scale?this.addWeight(`gamma`,n,`float32`,this.gammaInitializer,this.gammaRegularizer,!0):null,this.beta=this.center?this.addWeight(`beta`,n,`float32`,this.betaInitializer,this.betaRegularizer,!0):null,this.built=!0}call(e,t){let n=Y(e),r=n.shape,i=r.length;return P(()=>{let{mean:e,variance:t}=sl(n,this.axis,!0),a=Dp(1,i);for(let e of this.axis)a[e]=r[e];let o=e=>e!=null&&e.shape.length!==i?V(e,a):e,s=this.scale?o(this.gamma.read()):null,c=this.center?o(this.beta.read()):null,l=[],u=[];for(let e=0;e<i;++e)this.axis.indexOf(e)===-1?(l.push(1),u.push(r[e])):(l.push(r[e]),u.push(1));return e=uc(e,l),t=uc(t,l),s!=null&&(s=uc(s,u)),c!=null&&(c=uc(c,u)),Bx(n,e,t,c,s,this.epsilon)})}getConfig(){let e={axis:this.axis,epsilon:this.epsilon,center:this.center,scale:this.scale,betaInitializer:mh(this.betaInitializer),gammaInitializer:mh(this.gammaInitializer),betaRegularizer:Tb(this.betaRegularizer),gammaRegularizer:Tb(this.gammaRegularizer)},t=super.getConfig();return Object.assign(e,t),e}};Gx.className=`LayerNormalization`,K(Gx);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Kx(e,t,n){return P(()=>{if(e.rank!==4)throw new q(`temporalPadding expects input tensor to be 4-D, but received a ${e.rank}-D tensor.`);if(t??=[[1,1],[1,1]],t.length!==2||t[0].length!==2||t[1].length!==2)throw new q("spatial2dPadding expects `padding` to be an Array of two Arrays, each of which is an Array of two integers.");if(n??=Sm(),n!==`channelsLast`&&n!==`channelsFirst`)throw new q(`Unknown data format: ${n}. Supported data formats are 'channelsLast' and 'channelsFirst.`);let r;return r=n===`channelsFirst`?[[0,0],[0,0],t[0],t[1]]:[[0,0],t[0],t[1],[0,0]],hl(e,r)})}var qx=class extends Z{constructor(e){if(e??={},super(e),this.dataFormat=e.dataFormat==null?Sm():e.dataFormat,e.padding==null)this.padding=[[1,1],[1,1]];else if(typeof e.padding==`number`)this.padding=[[e.padding,e.padding],[e.padding,e.padding]];else{if(e.padding=e.padding,e.padding.length!==2)throw new q(`ZeroPadding2D expects padding to be a length-2 array, but received a length-${e.padding.length} array.`);let t,n;if(typeof e.padding[0]==`number`)t=[e.padding[0],e.padding[0]],n=[e.padding[1],e.padding[1]];else{if(e.padding=e.padding,e.padding[0].length!==2)throw new q(`ZeroPadding2D expects height padding to be a length-2 array, but received a length-${e.padding[0].length} array.`);if(t=e.padding[0],e.padding[1].length!==2)throw new q(`ZeroPadding2D expects width padding to be a length-2 array, but received a length-${e.padding[1].length} array.`);n=e.padding[1]}this.padding=[t,n]}this.inputSpec=[new wh({ndim:4})]}computeOutputShape(e){e=X(e);let t,n;return this.dataFormat===`channelsFirst`?(t=e[2]!=null&&e[2]>=0?e[2]+this.padding[0][0]+this.padding[0][1]:null,n=e[3]!=null&&e[3]>=0?e[3]+this.padding[1][0]+this.padding[1][1]:null,[e[0],e[1],t,n]):(t=e[1]!=null&&e[1]>=0?e[1]+this.padding[0][0]+this.padding[0][1]:null,n=e[2]!=null&&e[2]>=0?e[2]+this.padding[1][0]+this.padding[1][1]:null,[e[0],t,n,e[3]])}call(e,t){return P(()=>Kx(Y(e),this.padding,this.dataFormat))}getConfig(){let e={padding:this.padding,dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}};qx.className=`ZeroPadding2D`,K(qx);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function Jx(e,t,n,r,i,a){return P(()=>{im(i),sm(a),om(r),n??=[1,1],r??=`valid`,i??=Sm(),a??=`max`,e=Lb(e,i);let o,s=r===`same`?`same`:`valid`;return o=a===`max`?Yc(e,t,n,s):uo(e,t,n,s),i===`channelsFirst`&&(o=G(o,[0,3,1,2])),o})}function Yx(e,t,n,r,i,a){return P(()=>{im(i),sm(a),om(r),n??=[1,1,1],r??=`valid`,i??=Sm(),a??=`max`,e=Rb(e,i);let o,s=r===`same`?`same`:`valid`;return o=a===`max`?Zc(e,t,n,s):po(e,t,n,s),i===`channelsFirst`&&(o=G(o,[0,4,1,2,3])),o})}var Xx=class extends Z{constructor(e){if(e.poolSize??=2,super(e),typeof e.poolSize==`number`)this.poolSize=[e.poolSize];else if(Array.isArray(e.poolSize)&&e.poolSize.length===1&&typeof e.poolSize[0]==`number`)this.poolSize=e.poolSize;else throw new q(`poolSize for 1D convolutional layer must be a number or an Array of a single number, but received ${JSON.stringify(e.poolSize)}`);if(Wp(this.poolSize,`poolSize`),e.strides==null)this.strides=this.poolSize;else if(typeof e.strides==`number`)this.strides=[e.strides];else if(Array.isArray(e.strides)&&e.strides.length===1&&typeof e.strides[0]==`number`)this.strides=e.strides;else throw new q(`strides for 1D convolutional layer must be a number or an Array of a single number, but received ${JSON.stringify(e.strides)}`);Wp(this.strides,`strides`),this.padding=e.padding==null?`valid`:e.padding,om(this.padding),this.inputSpec=[new wh({ndim:3})]}computeOutputShape(e){e=X(e);let t=Fb(e[1],this.poolSize[0],this.padding,this.strides[0]);return[e[0],t,e[2]]}call(e,t){return P(()=>{this.invokeCallHook(e,t),e=wm(Y(e),2);let n=this.poolingFunction(Y(e),[this.poolSize[0],1],[this.strides[0],1],this.padding,`channelsLast`);return mu(n,[2])})}getConfig(){let e={poolSize:this.poolSize,padding:this.padding,strides:this.strides},t=super.getConfig();return Object.assign(e,t),e}},Zx=class extends Xx{constructor(e){super(e)}poolingFunction(e,t,n,r,i){return im(i),om(r),Jx(e,t,n,r,i,`max`)}};Zx.className=`MaxPooling1D`,K(Zx);var Qx=class extends Xx{constructor(e){super(e)}poolingFunction(e,t,n,r,i){return im(i),om(r),Jx(e,t,n,r,i,`avg`)}};Qx.className=`AveragePooling1D`,K(Qx);var $x=class extends Z{constructor(e){if(e.poolSize??=[2,2],super(e),this.poolSize=Array.isArray(e.poolSize)?e.poolSize:[e.poolSize,e.poolSize],e.strides==null)this.strides=this.poolSize;else if(Array.isArray(e.strides)){if(e.strides.length!==2)throw new q(`If the strides property of a 2D pooling layer is an Array, it is expected to have a length of 2, but received length ${e.strides.length}.`);this.strides=e.strides}else this.strides=[e.strides,e.strides];Wp(this.poolSize,`poolSize`),Wp(this.strides,`strides`),this.padding=e.padding==null?`valid`:e.padding,this.dataFormat=e.dataFormat==null?`channelsLast`:e.dataFormat,im(this.dataFormat),om(this.padding),this.inputSpec=[new wh({ndim:4})]}computeOutputShape(e){e=X(e);let t=this.dataFormat===`channelsFirst`?e[2]:e[1],n=this.dataFormat===`channelsFirst`?e[3]:e[2];return t=Fb(t,this.poolSize[0],this.padding,this.strides[0]),n=Fb(n,this.poolSize[1],this.padding,this.strides[1]),this.dataFormat===`channelsFirst`?[e[0],e[1],t,n]:[e[0],t,n,e[3]]}call(e,t){return P(()=>(this.invokeCallHook(e,t),this.poolingFunction(Y(e),this.poolSize,this.strides,this.padding,this.dataFormat)))}getConfig(){let e={poolSize:this.poolSize,padding:this.padding,strides:this.strides,dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}},eS=class extends $x{constructor(e){super(e)}poolingFunction(e,t,n,r,i){return im(i),om(r),Jx(e,t,n,r,i,`max`)}};eS.className=`MaxPooling2D`,K(eS);var tS=class extends $x{constructor(e){super(e)}poolingFunction(e,t,n,r,i){return im(i),om(r),Jx(e,t,n,r,i,`avg`)}};tS.className=`AveragePooling2D`,K(tS);var nS=class extends Z{constructor(e){if(e.poolSize??=[2,2,2],super(e),this.poolSize=Array.isArray(e.poolSize)?e.poolSize:[e.poolSize,e.poolSize,e.poolSize],e.strides==null)this.strides=this.poolSize;else if(Array.isArray(e.strides)){if(e.strides.length!==3)throw new q(`If the strides property of a 3D pooling layer is an Array, it is expected to have a length of 3, but received length ${e.strides.length}.`);this.strides=e.strides}else this.strides=[e.strides,e.strides,e.strides];Wp(this.poolSize,`poolSize`),Wp(this.strides,`strides`),this.padding=e.padding==null?`valid`:e.padding,this.dataFormat=e.dataFormat==null?`channelsLast`:e.dataFormat,im(this.dataFormat),om(this.padding),this.inputSpec=[new wh({ndim:5})]}computeOutputShape(e){e=X(e);let t=this.dataFormat===`channelsFirst`?e[2]:e[1],n=this.dataFormat===`channelsFirst`?e[3]:e[2],r=this.dataFormat===`channelsFirst`?e[4]:e[3];return t=Fb(t,this.poolSize[0],this.padding,this.strides[0]),n=Fb(n,this.poolSize[1],this.padding,this.strides[1]),r=Fb(r,this.poolSize[2],this.padding,this.strides[2]),this.dataFormat===`channelsFirst`?[e[0],e[1],t,n,r]:[e[0],t,n,r,e[4]]}call(e,t){return P(()=>(this.invokeCallHook(e,t),this.poolingFunction(Y(e),this.poolSize,this.strides,this.padding,this.dataFormat)))}getConfig(){let e={poolSize:this.poolSize,padding:this.padding,strides:this.strides,dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}},rS=class extends nS{constructor(e){super(e)}poolingFunction(e,t,n,r,i){return im(i),om(r),Yx(e,t,n,r,i,`max`)}};rS.className=`MaxPooling3D`,K(rS);var iS=class extends nS{constructor(e){super(e)}poolingFunction(e,t,n,r,i){return im(i),om(r),Yx(e,t,n,r,i,`avg`)}};iS.className=`AveragePooling3D`,K(iS);var aS=class extends Z{constructor(e){super(e),this.inputSpec=[new wh({ndim:3})]}computeOutputShape(e){return[e[0],e[2]]}call(e,t){throw new J}},oS=class extends aS{constructor(e){super(e||{})}call(e,t){return P(()=>{let t=Y(e);return tl(t,1)})}};oS.className=`GlobalAveragePooling1D`,K(oS);var sS=class extends aS{constructor(e){super(e||{})}call(e,t){return P(()=>{let t=Y(e);return Gs(t,1)})}};sS.className=`GlobalMaxPooling1D`,K(sS);var cS=class extends Z{constructor(e){super(e),this.dataFormat=e.dataFormat==null?`channelsLast`:e.dataFormat,im(this.dataFormat),this.inputSpec=[new wh({ndim:4})]}computeOutputShape(e){return e=e,this.dataFormat===`channelsLast`?[e[0],e[3]]:[e[0],e[1]]}call(e,t){throw new J}getConfig(){let e={dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}},lS=class extends cS{call(e,t){return P(()=>{let t=Y(e);return this.dataFormat===`channelsLast`?tl(t,[1,2]):tl(t,[2,3])})}};lS.className=`GlobalAveragePooling2D`,K(lS);var uS=class extends cS{call(e,t){return P(()=>{let t=Y(e);return this.dataFormat===`channelsLast`?Gs(t,[1,2]):Gs(t,[2,3])})}};uS.className=`GlobalMaxPooling2D`,K(uS);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var dS=class extends Z{constructor(e){super(e),this.layer=e.layer}build(e){this.built=!0}get trainable(){return this.layer!=null&&this.layer.trainable}set trainable(e){this.layer!=null&&(this.layer.trainable=e)}get trainableWeights(){return this.layer.trainableWeights}get nonTrainableWeights(){return this.layer.nonTrainableWeights}get updates(){return this.layer._updates}get losses(){return this.layer.losses}getWeights(){return this.layer.getWeights()}setWeights(e){this.layer.setWeights(e)}getConfig(){let e={layer:{className:this.layer.getClassName(),config:this.layer.getConfig()}},t=super.getConfig();return Object.assign(e,t),e}setFastWeightInitDuringBuild(e){super.setFastWeightInitDuringBuild(e),this.layer!=null&&this.layer.setFastWeightInitDuringBuild(e)}static fromConfig(e,t,n={}){let r=t.layer,i=wv(r,n);delete t.layer;let a={layer:i};return Object.assign(a,t),new e(a)}},fS=class extends dS{constructor(e){super(e),this.supportsMasking=!0}build(e){if(e=X(e),e.length<3)throw new q(`TimeDistributed layer expects an input shape >= 3D, but received input shape ${JSON.stringify(e)}`);this.inputSpec=[{shape:e}];let t=[e[0]].concat(e.slice(2));this.layer.built||(this.layer.build(t),this.layer.built=!0),super.build(e)}computeOutputShape(e){e=X(e);let t=[e[0]].concat(e.slice(2)),n=this.layer.computeOutputShape(t),r=e[1];return[n[0],r].concat(n.slice(1))}call(e,t){return P(()=>(e=Y(e),nx((e,n)=>[Y(this.layer.call(e,t)),[]],e,[],!1,null,null,!1,!0)[1]))}};fS.className=`TimeDistributed`,K(fS);function pS(e){Hp(nm,`BidirectionalMergeMode`,e)}var mS=class extends dS{constructor(e){super(e);let t=e.layer.getConfig(),n={};n.className=e.layer.getClassName(),n.config=t,this.forwardLayer=wv(n),t.goBackwards=t.goBackwards!==!0;let r={};if(r.className=e.layer.getClassName(),r.config=t,this.backwardLayer=wv(r),this.forwardLayer.name=`forward_`+this.forwardLayer.name,this.backwardLayer.name=`backward_`+this.backwardLayer.name,this.mergeMode=e.mergeMode===void 0?`concat`:e.mergeMode,pS(this.mergeMode),e.weights)throw new J(`weights support is not implemented for Bidirectional layer yet.`);this._stateful=e.layer.stateful,this.returnSequences=e.layer.returnSequences,this.returnState=e.layer.returnState,this.supportsMasking=!0,this._trainable=!0,this.inputSpec=e.layer.inputSpec,this.numConstants=null}get trainable(){return this._trainable}set trainable(e){this._trainable=e,this.forwardLayer!=null&&(this.forwardLayer.trainable=e),this.backwardLayer!=null&&(this.backwardLayer.trainable=e)}getWeights(){return this.forwardLayer.getWeights().concat(this.backwardLayer.getWeights())}setWeights(e){let t=e.length,n=Math.floor(t/2);this.forwardLayer.setWeights(e.slice(0,n)),this.backwardLayer.setWeights(e.slice(n))}computeOutputShape(e){let t=this.forwardLayer.computeOutputShape(e);Array.isArray(t)&&Array.isArray(t[0])||(t=[t]),t=t;let n,r,i;return this.returnState&&(i=t.slice(1)),n=t[0],n=n,this.mergeMode===`concat`?(n[n.length-1]*=2,r=[n]):r=this.mergeMode==null?[n,n.slice()]:[n],this.returnState?this.mergeMode==null?r.concat(i).concat(i.slice()):[n].concat(i,i.slice()):Ap(r)}apply(e,t){let n=t==null?null:t.initialState,r=t==null?null:t.constants;t??={};let i=tx(e,n,r,this.numConstants);if(e=i.inputs,n=i.initialState,r=i.constants,Array.isArray(e)&&(n=e.slice(1),e=e[0]),(n==null||n.length===0)&&r==null)return super.apply(e,t);let a=[],o=[];if(n!=null){let e=n.length;if(e%2>0)throw new q("When passing `initialState` to a Bidrectional RNN, the state should be an Array containing the states of the underlying RNNs.");t.initialState=n,a.push(...n);let r=n.map(e=>new wh({shape:e.shape}));this.forwardLayer.stateSpec=r.slice(0,e/2),this.backwardLayer.stateSpec=r.slice(e/2),o.push(...r)}if(r!=null)throw new J(`Support for constants in Bidirectional layers is not implemented yet.`);let s=a[0]instanceof Th;for(let e of a)if(e instanceof Th!==s)throw new q(`The initial state of a Bidirectional layer cannot be specified as a mix of symbolic and non-symbolic tensors`);if(s){let n=[e].concat(a),r=this.inputSpec.concat(o),i=this.inputSpec;this.inputSpec=r;let s=super.apply(n,t);return this.inputSpec=i,s}return super.apply(e,t)}call(e,t){return P(()=>{let n=t.initialState,r,i;if(n==null)r=this.forwardLayer.call(e,t),i=this.backwardLayer.call(e,t);else{let a=n.slice(0,n.length/2),o=n.slice(n.length/2);r=this.forwardLayer.call(e,Object.assign(t,{initialState:a})),i=this.backwardLayer.call(e,Object.assign(t,{initialState:o}))}let a;this.returnState&&(Array.isArray(r)&&(a=r.slice(1).concat(i.slice(1))),r=r[0],i=i[0]),this.returnSequences&&(i=Hl(i,1));let o;return this.mergeMode===`concat`?o=jm([r,i]):this.mergeMode===`sum`?o=R(r,i):this.mergeMode===`ave`?o=B(.5,R(r,i)):this.mergeMode===`mul`?o=B(r,i):this.mergeMode??(o=[r,i]),this.returnState?this.mergeMode==null?o.concat(a):[o].concat(a):o})}resetStates(e){this.forwardLayer.resetStates(),this.backwardLayer.resetStates()}build(e){lm(this.forwardLayer.name,()=>{this.forwardLayer.build(e)}),lm(this.backwardLayer.name,()=>{this.backwardLayer.build(e)}),this.built=!0}computeMask(e,t){Array.isArray(t)&&(t=t[0]);let n;if(n=this.returnSequences?this.mergeMode==null?[t,t]:t:this.mergeMode==null?[null,null]:null,this.returnState){let e=this.forwardLayer.states.map(e=>null);return Array.isArray(n)?n.concat(e).concat(e):[n].concat(e,e)}return n}get trainableWeights(){return this.forwardLayer.trainableWeights.concat(this.backwardLayer.trainableWeights)}get nonTrainableWeights(){return this.forwardLayer.nonTrainableWeights.concat(this.backwardLayer.nonTrainableWeights)}setFastWeightInitDuringBuild(e){super.setFastWeightInitDuringBuild(e),this.forwardLayer!=null&&this.forwardLayer.setFastWeightInitDuringBuild(e),this.backwardLayer!=null&&this.backwardLayer.setFastWeightInitDuringBuild(e)}getConfig(){let e={mergeMode:this.mergeMode},t=super.getConfig();return Object.assign(e,t),e}static fromConfig(e,t){let n=wv(t.layer);if(delete t.layer,t.numConstants!=null)throw new J(`Deserialization of a Bidirectional layer with numConstants present is not supported yet.`);let r=t;return r.layer=n,new e(r)}};mS.className=`Bidirectional`,K(mS);
/**
* @license
* Copyright 2022 CodeSmith LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var hS=class extends Z{constructor(e){super(e),this.scale=e.scale,this.offset=e.offset?e.offset:0}getConfig(){let e={scale:this.scale,offset:this.offset},t=super.getConfig();return Object.assign(e,t),e}call(e,t){return P(()=>(e=Y(e),e.dtype!==`float32`&&(e=Cm(e,`float32`)),R(B(e,this.scale),this.offset)))}};hS.className=`Rescaling`,K(hS);
/**
* @license
* Copyright 2022 CodeSmith LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
const{resizeBilinear:gS,cropAndResize:_S}=Gd;var vS=class extends Z{constructor(e){super(e),this.height=e.height,this.width=e.width}centerCrop(e,t,n,r,i,a,o,s){return P(()=>{let c,l=!1,u=[t/a,n/o,(r+t)/a,(i+n)/o],d=[];e.rank===3?(l=!0,c=gu([e])):c=e;for(let e=0;e<c.shape[0];e++)d.push(u);let f=Si(d,[d.length,4]),p=Pl(0,d.length,1,`int32`),m=_S(c,f,p,[r,i],`nearest`);return Cm(l?Y(Ou(m)):m,s)})}upsize(e,t,n,r){return P(()=>Cm(gS(e,[t,n]),r))}call(e,t){return P(()=>{let t=Y(e),n=t.dtype,r=t.shape,i=r[r.length-3],a=r[r.length-2],o=0;i!==this.height&&(o=Math.floor((i-this.height)/2));let s=0;return a!==this.width&&(s=Math.floor((a-this.width)/2),s===0&&(s=1)),o>=0&&s>=0?this.centerCrop(t,o,s,this.height,this.width,i,a,n):this.upsize(e,this.height,this.width,n)})}getConfig(){let e={height:this.height,width:this.width},t=super.getConfig();return Object.assign(e,t),e}computeOutputShape(e){e=X(e);let t=e.length-3,n=e.length-2;return e[t]=this.height,e[n]=this.width,e}};vS.className=`CenterCrop`,K(vS);
/**
* @license
* Copyright 2022 CodeSmith LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
function yS(e,t,n,r){let i=Y(e);if(i.dtype!==`int32`&&(i=Cm(i,`int32`)),t===`int`)return i;let a=i.shape;if(i.rank===0&&(i=cc(i,-1)),t===`oneHot`&&i.shape[i.shape.length-1]!==1&&(i=cc(i,-1)),i.rank>2)throw new q(`When outputMode is not int, maximum output rank is 2 Received outputMode ${t} and input shape ${a} which would result in output rank ${i.rank}.`);let o=[`multiHot`,`oneHot`].includes(t),s=i,c;if(c=r!==void 0&&t===`count`?ys(s,r,n,o):ys(s,[],n,o),t!==`tfIdf`)return c;if(r)return B(c,r);throw new q(`When outputMode is 'tfIdf', weights must be provided.`)}
/**
* @license
* Copyright 2022 CodeSmith LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var bS=class extends Z{constructor(e){super(e),this.numTokens=e.numTokens,this.outputMode=e.outputMode?e.outputMode:`multiHot`}getConfig(){let e={numTokens:this.numTokens,outputMode:this.outputMode},t=super.getConfig();return Object.assign(e,t),e}computeOutputShape(e){return e=X(e),e==null?[this.numTokens]:this.outputMode===`oneHot`&&e[e.length-1]!==1?(e.push(this.numTokens),e):(e[e.length-1]=this.numTokens,e)}call(e,t){return P(()=>{e=Y(e),e.dtype!==`int32`&&(e=Cm(e,`int32`));let n;if(t.countWeights!==void 0){if(this.outputMode!==`count`)throw new q(`countWeights is not used when outputMode !== count.
              Received countWeights=${t.countWeights}`);n=Y(t.countWeights)}let r=Gs(e),i=qs(e),a=vc(this.numTokens,r).bufferSync().get(0),o=bc(i,0).bufferSync().get(0);if(!(a&&o))throw new q(`Input values must be between 0 < values <= numTokens with numTokens=${this.numTokens}`);return yS(e,this.outputMode,this.numTokens,n)})}};bS.className=`CategoryEncoding`,K(bS);
/**
* @license
* Copyright 2022 CodeSmith LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
const xS=/* @__PURE__ */ new Set([`bilinear`,`nearest`]);var SS=class extends Z{constructor(e){if(super(e),this.height=e.height,this.width=e.width,e.interpolation){if(xS.has(e.interpolation))this.interpolation=e.interpolation;else throw new q(`Invalid interpolation parameter: ${e.interpolation} is not implemented`)}else this.interpolation=`bilinear`;this.cropToAspectRatio=!!e.cropToAspectRatio}computeOutputShape(e){e=X(e);let t=e[2];return[this.height,this.width,t]}getConfig(){let e={height:this.height,width:this.width,interpolation:this.interpolation,cropToAspectRatio:this.cropToAspectRatio},t=super.getConfig();return Object.assign(e,t),e}call(e,t){return P(()=>{let t=[this.height,this.width];if(this.interpolation===`bilinear`)return Gd.resizeBilinear(e,t,!this.cropToAspectRatio);if(this.interpolation===`nearest`)return Gd.resizeNearestNeighbor(e,t,!this.cropToAspectRatio);throw Error(`Interpolation is ${this.interpolation} but only ${[...xS]} are supported`)})}};SS.className=`Resizing`,K(SS);
/**
* @license
* Copyright 2023 CodeSmith LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var CS=class{constructor(e){this.seed=e}next(){if(this.seed!==void 0)return this.seed++}};CS.className=`RandomSeed`;
/**
* @license
* Copyright 2023 CodeSmith LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
var wS=class extends Z{constructor(e){super(e),this.randomGenerator=new CS(e.seed)}getConfig(){let e={seed:this.randomGenerator.seed},t=super.getConfig();return Object.assign(e,t),e}};wS.className=`BaseRandomLayer`
/**
* @license
* Copyright 2023 CodeSmith LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
;const TS=/* @__PURE__ */ new Set([`bilinear`,`nearest`]);var ES=class extends wS{constructor(e){super(e);let{factor:t,interpolation:n=`bilinear`}=e;if(this.factor=t,Array.isArray(this.factor)&&this.factor.length===2)this.widthLower=this.factor[0],this.widthUpper=this.factor[1];else if(!Array.isArray(this.factor)&&this.factor>0)this.widthLower=-this.factor,this.widthUpper=this.factor;else throw new q(`Invalid factor: ${this.factor}. Must be positive number or tuple of 2 numbers`);if(this.widthLower<-1||this.widthUpper<-1)throw new q(`factor must have values larger than -1. Got: ${this.factor}`);if(this.widthUpper<this.widthLower)throw new q(`factor cannot have upper bound less than lower bound.
        Got upper bound: ${this.widthUpper}.
        Got lower bound: ${this.widthLower}
      `);if(n){if(TS.has(n))this.interpolation=n;else throw new q(`Invalid interpolation parameter: ${n} is not implemented`)}}getConfig(){let e={factor:this.factor,interpolation:this.interpolation},t=super.getConfig();return Object.assign(e,t),e}computeOutputShape(e){e=X(e);let t=e[2];return[this.imgHeight,-1,t]}call(e,t){return P(()=>{let t=Y(e);this.imgHeight=t.shape[t.shape.length-3];let n=t.shape[t.shape.length-2];this.widthFactor=Nl([1],1+this.widthLower,1+this.widthUpper,`float32`,this.randomGenerator.next());let r=this.widthFactor.dataSync()[0]*n;r=Math.round(r);let i=[this.imgHeight,r];switch(this.interpolation){case`bilinear`:return Gd.resizeBilinear(e,i);case`nearest`:return Gd.resizeNearestNeighbor(e,i);default:throw Error(`Interpolation is ${this.interpolation}
          but only ${[...TS]} are supported`)}})}};ES.className=`RandomWidth`,K(ES);
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
/**
* @license
* Copyright 2018 Google LLC
*
* Use of this source code is governed by an MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
* =============================================================================
*/
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Q(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{e!=null&&h(e.dtype!==`complex64`,()=>`${t} does not support complex64 tensors in the CPU backend.`)})}
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const DS=Au;var OS=class e extends u{nextDataId(){return e.nextDataId++}constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new l(this,Ei())}write(e,t,n){this.firstUse&&(this.firstUse=!1,A().get(`IS_NODE`)&&qn(`
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================`));let r={id:this.nextDataId()};return this.data.set(r,{values:e,dtype:n,refCount:1}),r}makeTensorInfo(e,t,n){let r;if(t===`string`&&n!=null&&n.length>0&&re(n[0])){let i=n.map(e=>Tr(e));r=this.write(i,e,t)}else r=this.write(n,e,t);return{dataId:r,shape:e,dtype:t}}refCount(e){return this.data.has(e)?this.data.get(e).refCount:0}incRef(e){let t=this.data.get(e);t.refCount++}decRef(e){if(this.data.has(e)){let t=this.data.get(e);t.refCount--}}move(e,t,n,r,i){this.data.set(e,{values:t,dtype:r,refCount:i})}numDataIds(){return this.data.numDataIds()}async read(e){return this.readSync(e)}readSync(e){let{dtype:t,complexTensorInfos:n}=this.data.get(e);return t===`complex64`?Kf(this.readSync(n.real.dataId),this.readSync(n.imag.dataId)):ue(this.data.get(e).values,t)}bufferSync(e){let t=this.readSync(e.dataId);if(e.dtype===`string`)try{let n=t.map(e=>Er(e));return I(e.shape,e.dtype,n)}catch{throw Error(`Failed to decode encoded string bytes into utf-8`)}return I(e.shape,e.dtype,t)}makeOutput(e,t,n){return Ei().makeTensorFromTensorInfo(this.makeTensorInfo(t,n,e),this)}disposeData(e,t=!1){if(this.data.has(e)){if(this.data.get(e).refCount--,!t&&this.data.get(e).refCount>0)return!1;let{complexTensorInfos:n}=this.data.get(e);n!=null&&(this.disposeData(n.real.dataId,!0),this.disposeData(n.imag.dataId,!0)),this.data.delete(e)}return!0}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}async time(e){let t=wr();return e(),{kernelMs:wr()-t}}memory(){return{unreliable:!0,reasons:[`The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less.`]}}where(e){Q([e],`where`);let t=this.readSync(e.dataId);return DS(e.shape,t)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}};OS.nextDataId=0;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function kS(e){let t=new Float32Array(e.length);for(let n=0;n<e.length;++n)t[n]=Math.abs(e[n]);return t}const AS={kernelName:`Abs`,backendName:`cpu`,kernelFunc:e=>{let{x:t}=e.inputs,n=e.backend;Q(t,`abs`);let r=new Float32Array(v(t.shape)),i=n.data.get(t.dataId).values;return r=kS(i),n.makeOutput(r,t.shape,t.dtype)}};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function jS(e){return(t,n,r,i,a)=>{let o=ws(t,n),s=o.length,c=k(o),l=T(a,v(o)),u=t.length,d=n.length,f=k(t),p=k(n),m=Ss(t,o),h=Ss(n,o);if(m.length+h.length===0)for(let t=0;t<l.length;++t)l[t]=e(r[t%r.length],i[t%i.length]);else for(let t=0;t<l.length;++t){let n=ge(t,s,c),a=n.slice(-u);m.forEach(e=>a[e]=0);let o=he(a,u,f),g=n.slice(-d);h.forEach(e=>g[e]=0);let _=he(g,d,p);l[t]=e(r[o],i[_])}return[l,o]}}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function MS(e){let{inputs:t,backend:n}=e,{real:r,imag:i}=t,a=n.data.get(r.dataId).values,o=n.data.get(i.dataId).values,s=n.makeTensorInfo(r.shape,`complex64`),c=n.data.get(s.dataId);return c.complexTensorInfos={real:n.makeTensorInfo(r.shape,`float32`,a),imag:n.makeTensorInfo(i.shape,`float32`,o)},s}const NS={kernelName:Xe,backendName:`cpu`,kernelFunc:MS};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function PS(e,t,n=`float32`){if(n===`complex64`)return MS({inputs:{real:PS(e,t,`float32`),imag:PS(e,t,`float32`)},backend:e});let r=fe(v(t),n);return e.makeTensorInfo(t,n,r)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function FS(e){let{inputs:t,backend:n}=e,{x:r}=t;return n.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}const IS={kernelName:At,backendName:`cpu`,kernelFunc:FS};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function LS(e){let{inputs:t,backend:n}=e,{input:r}=t,i=n.data.get(r.dataId).complexTensorInfos.real,a=n.data.get(i.dataId).values;return n.makeTensorInfo(i.shape,i.dtype,a)}const RS={kernelName:un,backendName:`cpu`,kernelFunc:LS};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function zS(e,t,n,r){if(r===`int32`)return[t,`int32`,Int32Array.from(e)];if(r===`bool`){let r=Cr([0],n),[i,a]=jS((e,t)=>e===t?0:1)(t,[],e,r,`bool`);return[a,`bool`,i]}throw Error(`Error in Cast: failed to cast ${n} to ${r}`)}function BS(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{dtype:a}=r;if(a===`complex64`){if(i.dtype===`complex64`)return FS({inputs:{x:i},backend:n});let e=PS(n,i.shape,i.dtype),t=BS({inputs:{x:i},backend:n,attrs:{dtype:`float32`}}),r=MS({inputs:{real:t,imag:e},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),r}if(i.dtype===`complex64`){let e=LS({inputs:{input:i},backend:n}),t=BS({inputs:{x:e},backend:n,attrs:{dtype:a}});return n.disposeIntermediateTensorInfo(e),t}if(!ee(i.dtype,a)){let e=FS({inputs:{x:i},backend:n});return{dataId:e.dataId,shape:e.shape,dtype:a}}let o=n.data.get(i.dataId).values,[s,c,l]=zS(o,i.shape,i.dtype,a);return n.makeTensorInfo(s,c,l)}const VS={kernelName:qe,backendName:`cpu`,kernelFunc:BS};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function HS(e,t,n,r){return n==null?({inputs:n,backend:i})=>{let{a,b:o}=n,s=i;Q([a,o],e);let c=s.data.get(a.dataId).values,l=s.data.get(o.dataId).values,u=a.dtype===`string`?xp(c):c,d=a.dtype===`string`?xp(l):l,f=r||a.dtype,[p,m]=t(a.shape,o.shape,u,d,f);return s.makeTensorInfo(m,f,p)}:({inputs:e,backend:i})=>{let{a,b:o}=e,s=i;if(a.dtype===`complex64`||o.dtype===`complex64`){let e=BS({inputs:{x:a},backend:s,attrs:{dtype:`complex64`}}),t=s.data.get(e.dataId),r=t.complexTensorInfos.real,i=t.complexTensorInfos.imag,c=s.data.get(r.dataId).values,l=s.data.get(i.dataId).values,u=BS({inputs:{x:o},backend:s,attrs:{dtype:`complex64`}}),d=s.data.get(u.dataId),f=d.complexTensorInfos.real,p=d.complexTensorInfos.imag,m=s.data.get(f.dataId).values,h=s.data.get(p.dataId).values,[g,_,v]=n(a.shape,o.shape,c,l,m,h),y=s.makeTensorInfo(v,`float32`,g),b=s.makeTensorInfo(v,`float32`,_),x=MS({inputs:{real:y,imag:b},backend:s});return s.disposeIntermediateTensorInfo(e),s.disposeIntermediateTensorInfo(u),s.disposeIntermediateTensorInfo(y),s.disposeIntermediateTensorInfo(b),x}{let e=s.data.get(a.dataId).values,n=s.data.get(o.dataId).values,i=r||a.dtype,[c,l]=t(a.shape,o.shape,e,n,i);return s.makeTensorInfo(l,i,c)}}}function US(e){return(t,n,r,i,a,o)=>{let s=ws(t,n),c=v(s),l=s.length,u=k(s),d=T(`float32`,c),f=T(`float32`,c),p=Ss(t,s),m=Ss(n,s),h=Kf(r,i),g=Kf(a,o),_=t.length,y=k(t),b=n.length,x=k(n);if(p.length+m.length===0)for(let t=0;t<d.length;t++){let n=t%h.length,r=t%g.length,i=e(h[n*2],h[n*2+1],g[r*2],g[r*2+1]);d[t]=i.real,f[t]=i.imag}else for(let t=0;t<d.length;t++){let n=ge(t,l,u),r=n.slice(-_);p.forEach(e=>r[e]=0);let i=he(r,_,y),a=n.slice(-b);m.forEach(e=>a[e]=0);let o=he(a,b,x),s=e(h[i*2],h[i*2+1],g[o*2],g[o*2+1]);d[t]=s.real,f[t]=s.imag}return[d,f,s]}}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const WS=HS(`Add`,jS(((e,t)=>e+t)),US(((e,t,n,r)=>({real:e+n,imag:t+r})))),GS={kernelName:`Add`,backendName:`cpu`,kernelFunc:WS};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function KS(e,t,n,r,i){let a=v(r),o=fe(i,n);for(let n=0;n<e.length;n++){let r=e[n];if(r<0)throw Error(`Input x must be non-negative!`);r>=i||(a>0?o[r]+=t[n]:o[r]+=1)}return o}function qS(e,t,n,r=!1){let i=e.shape[0],a=e.shape[1],o=I([i,n],t.dtype);for(let s=0;s<i;s++)for(let i=0;i<a;i++){let a=e.get(s,i);if(a<0)throw Error(`Input x must be non-negative!`);a>=n||(r?o.set(1,s,a):t.size>0?o.set(o.get(s,a)+t.get(s,i),s,a):o.set(o.get(s,a)+1,s,a))}return o}
/**
* @license
* Copyright 2023 Google LLC.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const JS={kernelName:Ke,backendName:`cpu`,kernelFunc:HS(Ke,jS(((e,t)=>e&t)))};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function YS(e){return(t,n,r)=>{let i=E(n,t.length);for(let n=0;n<t.length;++n)i[n]=e(t[n],r);return i}}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function $(e,t,n){return XS(e,YS(t),n)}function XS(e,t,n){return({inputs:r,attrs:i,backend:a})=>{let{x:o}=r;Q(o,e);let s=a,c=s.data.get(o.dataId).values,l;if(o.dtype===`string`){if(!Array.isArray(c))throw Error(`String tensor's value was not an instance of Array`);l=xp(c)}else l=c;let u=n||o.dtype,d=t(l,u,i);return s.makeTensorInfo(o.shape,u,d)}}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const ZS={kernelName:Je,backendName:`cpu`,kernelFunc:XS(Je,YS(e=>Math.ceil(e)))};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function QS(e,t,n,r){let i=E(n,v(t));if(r&&n!==`string`){let t=0;e.forEach(e=>{let n=v(e.shape);i.set(e.vals,t),t+=n})}else{let r=0;e.forEach(e=>{let a=n===`string`?xp(e.vals):e.vals,o=0;for(let n=0;n<e.shape[0];++n){let s=n*t[1]+r;for(let t=0;t<e.shape[1];++t)i[s+t]=a[o++]}r+=e.shape[1]})}return i}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const $S=HS(yt,jS((e,t)=>+(e===t)),null,`bool`),eC={kernelName:yt,backendName:`cpu`,kernelFunc:$S},tC=XS(`Exp`,YS(e=>Math.exp(e)),`float32`),nC={kernelName:`Exp`,backendName:`cpu`,kernelFunc:tC},rC={kernelName:xt,backendName:`cpu`,kernelFunc:XS(xt,YS(e=>Math.expm1(e)))},iC={kernelName:wt,backendName:`cpu`,kernelFunc:XS(wt,YS(e=>Math.floor(e)))},aC={kernelName:Tt,backendName:`cpu`,kernelFunc:HS(Tt,jS((e,t)=>Math.floor(e/t)),null,`int32`)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function oC(e,t,n,r,i,a,o,s,c){let l=I([r,a],n);for(let n=0;n<r;n++){let r=[],u=0;for(let t=0;t<i;t++){let a=e[n*i+t];u+=a*o[t],r.push(a)}if(u<0||u>=c/a)throw Error(`Invalid indices: ${r} does not index into ${s}`);for(let e=0;e<a;e++)l.values[n*a+e]=t.get(...t.indexToLoc(u*a+e))}return l}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function sC(e,t,n){let r=I(n,e.dtype);for(let n=0;n<r.size;++n){let i=r.indexToLoc(n).slice(),a=i[0],o=i[2],s=t.locToIndex([a,o]);i[2]=t.values[s];let c=e.locToIndex(i);0<=c&&c<e.values.length&&(r.values[n]=e.values[c])}return r}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const cC={kernelName:Ot,backendName:`cpu`,kernelFunc:HS(Ot,jS((e,t)=>+(e>t)),null,`bool`)},lC={kernelName:kt,backendName:`cpu`,kernelFunc:HS(kt,jS((e,t)=>+(e>=t)),null,`bool`)},uC={kernelName:It,backendName:`cpu`,kernelFunc:HS(It,jS((e,t)=>+(e<t)),null,`bool`)},dC={kernelName:Lt,backendName:`cpu`,kernelFunc:HS(Lt,jS((e,t)=>+(e<=t)),null,`bool`)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function fC(e,t,n){let r=(t-e)/(n-1),i=fe(n,`float32`);i[0]=e;for(let e=1;e<i.length;e++)i[e]=i[e-1]+r;return i}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const pC={kernelName:`Log`,backendName:`cpu`,kernelFunc:XS(`Log`,YS(e=>Math.log(e)))};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function mC(e,t,n,r){let i=T(r,v(n));for(let n=0;n<i.length;++n){let r=n*t,a=e[r];for(let n=0;n<t;++n){let t=e[r+n];(Number.isNaN(t)||t>a)&&(a=t)}i[n]=a}return i}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const hC={kernelName:Ut,backendName:`cpu`,kernelFunc:HS(Ut,jS(((e,t)=>Math.max(e,t))))},gC={kernelName:Yt,backendName:`cpu`,kernelFunc:HS(Yt,jS(((e,t)=>Math.min(e,t))))},_C=jS(((e,t)=>e*t)),vC=HS(Zt,_C,US(((e,t,n,r)=>({real:e*n-t*r,imag:e*r+t*n})))),yC={kernelName:Zt,backendName:`cpu`,kernelFunc:vC}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function bC(e,t,n){let r=xr(-1,n);return _C([],t,r,e,n)}function xC(e){let{inputs:t,backend:n}=e,{x:r}=t;Q(r,`neg`);let i=n.data.get(r.dataId).values,[a,o]=bC(i,r.shape,r.dtype);return n.makeTensorInfo(o,r.dtype,a)}const SC={kernelName:`Neg`,backendName:`cpu`,kernelFunc:xC},CC={kernelName:Qt,backendName:`cpu`,kernelFunc:HS(Qt,jS(((e,t)=>e===t?0:1)),null,`bool`)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function wC(e,t,n,r,i){let a=t.length,o=v(t),s=k(t),c=k(i),l=T(n,v(i));for(let t=0;t<o;++t){let n=ge(t,a,s),i=Array(n.length);for(let e=0;e<i.length;e++)i[e]=n[r[e]];let o=he(i,a,c);l[o]=e[t]}return l}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function TC(e){let{inputs:t,attrs:n,backend:r}=e,{x:i}=t,{perm:a}=n;Q(i,`transpose`);let o=i.shape.length,s=Array(o);for(let e=0;e<s.length;e++)s[e]=i.shape[a[e]];let c=r.data.get(i.dataId).values,l=wC(c,i.shape,i.dtype,a,s);return{dataId:r.write(l,s,i.dtype),shape:s,dtype:i.dtype}}const EC={kernelName:zn,backendName:`cpu`,kernelFunc:TC};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function DC(e,t,n,r){let[i,a]=Rs(e,r),o=ei(t,`int32`),s=fe(v(i),o),c=v(a);for(let e=0;e<s.length;++e){let t=e*c,r=1;for(let e=0;e<c;++e)r*=n[t+e];s[e]=r}return{outVals:s,outShape:i,outDtype:o}}function OC(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;Q(i,`prod`);let s=i.shape.length,c=C(a,i.shape),l=Vs(c,s),u=c,d=i,f=[];l!=null&&(d=TC({inputs:{x:i},backend:n,attrs:{perm:l}}),f.push(d),u=Us(u.length,s));let p=n.data.get(d.dataId).values,{outVals:m,outShape:h,outDtype:g}=DC(d.shape,d.dtype,p,u),_=h;return o&&(_=zs(h,c)),f.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.makeTensorInfo(_,g,m)}const kC={kernelName:cn,backendName:`cpu`,kernelFunc:OC};
/**
* @license
* Copyright 2022 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function AC(e,t,n){e.forEach((e,r)=>{if(e<0||e>=n){let i=ge(r,t.length,k(t)).join(`,`);throw Error(`indices[${i}] = ${e} is not in [0, ${n})`)}})}function jC(e,t){for(let n=0;n<e.length;++n){let r=e[n],i=n===e.length-1?t:e[n+1].length;if(r.length===0)throw Error(`Ragged splits may not be empty`);if(r[0]<0)throw Error(`Ragged splits must be non-negative`);if(r[r.length-1]>i)throw Error(`Ragged splits must not point past values`);for(let e=1;e<r.length;++e)if(r[e-1]>r[e])throw Error(`Ragged splits must be sorted in ascending order`)}}function MC(e,t,n,r){let i=[],a=0,o=t.length-1+n.length,s=Array(o).fill(null).map(()=>[0]);jC(n,r);let c=1;for(let e=0;e<t.length-1;++e){c*=t[e];let n=t[e+1];for(let t=1;t<c+1;++t)s[e].push(t*n)}for(let r=0;r<e.length;++r){let o=e[r],c=e[r]+1;for(let e=0;e<n.length;++e){let r=n[e],i=e+t.length-1;if(i>=0){let e=s[i],t=e[e.length-1]-r[o];for(let e=o;e<c;++e)s[i].push(r[e+1]+t)}o=r[o],c=r[c]}c!==o&&(i.push([o,c]),a+=c-o)}return{outSplits:s,valueSlices:i,numValues:a}}function NC(e){let t=[];for(let n=0;n<e.length;++n){let r=e[n].length,i=E(`int32`,r);t.push(i),e[n].forEach((e,t)=>i[t]=e)}return t}function PC(e,t){let n=e.slice(0,t);for(;n.length<t;)n.push(1);for(let r=t;r<e.length;r++)n[t-1]*=e[r];return n}function FC(e,t,n,r,i,a){let o=PC(t,2)[1],s=PC(a,2)[1],c=0;for(let t of n)for(let n=t[0];n<t[1];++n){for(let t=0;t<r;++t)i[c*s+t]=e[n*o+t];++c}}function IC(e,t,n,r,i){let a=t.slice();a[0]=i;let o=E(n,v(a)),s=e.length;return FC(e,t,r,s===0?0:s/t[0],o,a),[o,a]}function LC(e,t,n,r,i,a,o,s){if(e.length===0)throw Error(`paramsNestedSplits must be non empty`);if(t[0].length===0)throw Error(`Split tensors must not be scalars`);if(AC(a,o,t[0][0]-1),r.length===0)throw Error(`params.rank must be nonzero`);let c=r[0],{outSplits:l,valueSlices:u,numValues:d}=MC(a,o,e,c),f=NC(l),p=IC(n,r,i,u,d);return[f,p[0],p[1]]}
/**
* @license
* Copyright 2022 Google LLC.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const RC=2147483647;function zC(e,t,n,r,i,a,o){if(t.length>1)throw Error(`starts must be a scalar or vector`);if(i.length>1)throw Error(`limits must be a scalar or vector`);if(o.length>1)throw Error(`deltas must be a scalar or vector`);let s=t.length===0,c=i.length===0,l=o.length===0,u=[];s||u.push(t[0]),c||u.push(i[0]),l||u.push(o[0]);for(let e=1;e<u.length;++e)if(u[e]!==u[e-1])throw Error(`starts, limits, and deltas must have the same shape`);let d=u.length===0?1:u[0],f=E(`int32`,d+1);f[0]=0;for(let t=0;t<d;++t){let n=s?e[0]:e[t],i=c?r[0]:r[t],o=l?a[0]:a[t];if(o===0)throw Error(`Requires delta != 0`);let u;if(o>0&&i<n||o<0&&i>n)u=0;else if(u=Math.ceil(Math.abs((i-n)/o)),u>RC)throw Error(`Requires ((limit - start) / delta) <= ${RC}`);f[t+1]=f[t]+u}let p=f[d],m=E(n,p),h=0;for(let t=0;t<d;++t){let n=f[t+1]-f[t],r=s?e[0]:e[t],i=l?a[0]:a[t];for(let e=0;e<n;++e)m[h++]=r,r+=i}return[f,m]}
/**
* @license
* Copyright 2022 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
var BC=Ff,VC=class e{constructor(e,t,n,r,i,a,o,s,c,l){this.shape=e,this.shapeShape=t,this.values=n,this.valuesShape=r,this.valuesDType=i,this.defaultValue=a,this.defaultValueShape=o,this.rowPartitionValues=s,this.rowPartitionValuesShapes=c,this.rowPartitionTypes=Lf(l),this.raggedRank=Rf(this.rowPartitionTypes)}getRowPartitionTypeByDimension(e){return this.rowPartitionTypes[0]===BC.FIRST_DIM_SIZE?this.rowPartitionTypes[e+1]:this.rowPartitionTypes[e]}getRowPartitionTensor(e){return this.rowPartitionTypes[0]===BC.FIRST_DIM_SIZE?this.rowPartitionValues[e+1]:this.rowPartitionValues[e]}getMaxWidth(t){let n=this.getRowPartitionTensor(t-1);switch(this.getRowPartitionTypeByDimension(t-1)){case BC.VALUE_ROWIDS:return e.getMaxWidthValueRowID(n);case BC.ROW_SPLITS:return e.getMaxWidthRowSplit(n);default:throw Error(`Cannot handle partition type ${BC[this.getRowPartitionTypeByDimension(t-1)]}`)}}static getMaxWidthRowSplit(e){let t=e.length;if(t===0||t===1)return 0;let n=0;for(let r=0;r<t-1;++r){let t=e[r+1]-e[r];t>n&&(n=t)}return n}static getMaxWidthValueRowID(e){let t=e.length;if(t===0)return 0;let n=0,r=e[0],i=0;for(let a=1;a<t;++a){let t=e[a];t!==r&&(r=t,i=Math.max(a-n,i),n=a)}return Math.max(t-n,i)}tensorShapeFromTensor(e,t,n=!0){if(t.length===0){if(e[0]===-1)return[];throw Error(`The only valid scalar shape tensor is the fully unknown shape specified as -1.`)}return UC(e,n)}calculateOutputSize(e){let t=this.valuesShape,n=this.defaultValueShape;zf(n,t);let r=this.tensorShapeFromTensor(this.shape,this.shapeShape),i=If(this.raggedRank,r,t);i[0]<0&&(i[0]=e);for(let e=1;e<=this.raggedRank;++e)i[e]<0&&(i[e]=this.getMaxWidth(e));return i}calculateFirstParentOutputIndex(e,t,n){let r=Math.min(e,n),i=[],a=0;for(let e=0;e<r;++e,a+=t)i.push(a);for(let t=r;t<e;++t)i.push(-1);return h(i.length===e,()=>`Final length of result must be equal to firstDimension.`),i}calculateOutputIndexRowSplit(e,t,n,r){let i=e.length,a=[];for(let o=0;o<i-1;++o){let i=e[o+1]-e[o],s=Math.min(r,i),c=t[o];c===-1&&(s=0);for(let e=0;e<s;++e)a.push(c),c+=n;for(let e=0;e<i-s;++e)a.push(-1)}if(i>0&&a.length!==e[i-1])throw Error(`Invalid row split size.`);return a}calculateOutputIndexValueRowID(e,t,n,r){let i=e.length,a=[];if(i===0)return[];let o=0,s=e[0];if(s>=t.length)throw Error(`Got currentValueRowId=${s}, which is not less than ${t.length}`);let c=t[s];a.push(c);for(let l=1;l<i;++l){let i=e[l];if(i===s)c>=0&&(++o,o<r?c+=n:c=-1);else{if(o=0,s=i,i>=t.length)throw Error(`Got nextValueRowId=${i} which is not less than ${t.length}`);c=t[i]}a.push(c)}if(a.length!==e.length)throw Error(`Invalid row ids.`);return a}calculateOutputIndex(e,t,n,r){let i=this.getRowPartitionTensor(e),a=this.getRowPartitionTypeByDimension(e);switch(a){case BC.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(i,t,n,r);case BC.ROW_SPLITS:if(i.length-1>t.length)throw Error(`Row partition size is greater than output size: ${i.length-1} > ${t.length}`);return this.calculateOutputIndexRowSplit(i,t,n,r);default:throw Error(`Unsupported partition type: ${BC[a]}`)}}getFirstDimensionSize(){let e=this.rowPartitionValues[0];if(this.rowPartitionTypes.length===0)throw Error(`No row_partition_types given.`);let t=this.rowPartitionTypes[0];switch(t){case BC.FIRST_DIM_SIZE:return e[0];case BC.VALUE_ROWIDS:throw Error(`Cannot handle VALUE_ROWIDS in first dimension.`);case BC.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw Error(`Cannot handle type ${BC[t]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw Error(`Invalid first partition input. Tensor requires at least one element.`);let e=this.getFirstDimensionSize(),t=this.calculateOutputSize(e),n=Array(this.raggedRank+1);n[n.length-1]=1;for(let e=n.length-2;e>=0;--e)n[e]=n[e+1]*t[e+1];let r=UC(t,!1),i=E(this.valuesDType,v(r));if(n[0]*t[0]>0){let a=this.calculateFirstParentOutputIndex(e,n[0],t[0]);for(let e=1;e<=this.raggedRank;++e)a=this.calculateOutputIndex(e-1,a,n[e],t[e]);this.setOutput(this.raggedRank,a,i,r)}return[r,i]}setOutput(e,t,n,r){if(n.length===0)return;let i=this.values,a=n,o=r.slice();o=o.slice(e+1);let s=v(o),c=t.length,l=this.defaultValue;if(l.length!==s&&l.length!==1){let e=this.defaultValueShape;P(()=>{let t=V(l,e);l=Ro(t,o).dataSync()})}let u=0,d=0,f=0;for(let e=0;e<=c;++e){let r=e<c?t[e]:-1;if(r===f)++f;else{if(d<f){let e=i.subarray(u*s);HC(a.subarray(d*s),e,(f-d)*s)}if(e>=c){let e=n.length;r=Math.floor(e/s)}if(r>f){if(this.defaultValue.length===1)a.subarray(f*s,r*s).fill(this.defaultValue[0]),f=r;else for(;r>f;)HC(a.slice(f*s),l,s),++f}r<0?(u=e+1,d=f):(u=e,d=f,f=d+1)}}}};function HC(e,t,n){for(let r=0;r<n;r++)e[r]=t[r]}function UC(e,t){let n=[];for(let r of e){if(r<0){if(!t)throw Error(`Dimension ${r} must be >= 0`);if(r<-1)throw Error(`Dimension ${r} must be >= -1`);r=-1}n.push(r)}return n}function WC(e,t,n,r,i,a,o,s,c,l){return new VC(e,t,n,r,i,a,o,s,c,l).compute()}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function GC(e,t,n,r){if(e===t||e<t&&n<0||t<e&&n>1)return fe(0,r);let i=fe(Math.abs(Math.ceil((t-e)/n)),r);t<e&&n===1&&(n=-1),i[0]=e;for(let e=1;e<i.length;e++)i[e]=i[e-1]+n;return i}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const KC={kernelName:xn,backendName:`cpu`,kernelFunc:XS(xn,YS(e=>1/Math.sqrt(e)))};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function qC(e,t,n,r,i,a,o,s,c,l){let u=[r/i,i],d=e.values,f=t.values;if(r===0)return I(n,t.dtype);let p=c instanceof Br?c:I(u,t.dtype);typeof c==`string`||typeof c==`number`?p.values.fill(c):typeof c==`boolean`&&p.values.fill(+c);for(let e=0;e<a;e++){let a=[],c=0;for(let t=0;t<o;t++){let n=d[e*o+t];a.push(n),c+=n*s[t]}if(c<0||c>=r/i)throw Error(`Invalid indices: ${a} does not index into ${n}`);for(let n=0;n<i;n++)l?p.values[c*i+n]+=f[e*i+n]:p.values[c*i+n]=t.rank===0?f[0]:f[e*i+n]}return p}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const JC=$(Dn,e=>1/(1+Math.exp(-e))),YC={kernelName:Dn,backendName:`cpu`,kernelFunc:JC};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function XC(e,t,n,r,i){let a=wf(r,t,n),o=v(n),s=k(r);if(a){let n=Tf(t,s);return i===`string`?e.slice(n,n+o):e.subarray(n,n+o)}let c=I(r,i,i===`string`?xp(e):e),l=I(n,i);for(let e=0;e<l.size;++e){let n=l.indexToLoc(e),r=n.map((e,n)=>e+t[n]);l.set(c.get(...r),...n)}return i===`string`?Sp(l.values):l.values}function ZC(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{begin:a,size:o}=r;Q(i,`slice`);let[s,c]=Ef(i,a,o);Sf(i,s,c);let l=n.data.get(i.dataId).values,u=XC(l,s,c,i.shape,i.dtype);return n.makeTensorInfo(c,i.dtype,u)}const QC={kernelName:wn,backendName:`cpu`,kernelFunc:ZC};
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function $C(e,t,n,r,i,a,o){let s=t[0],c=a[0],l=Array(c),u=Array(s),d=t[1];if(c===0){if(s!==0)throw Error(cp(s));let e=E(n,0),t=E(i,0);return[e,[0,d],t,l,u]}let f=!0,p=0,m=Array(c).fill(0);for(let t=0;t<s;++t){let n=e[t*d];if(n<0)throw Error(lp(t,n));if(n>=c)throw Error(up(t,n,c));++m[n],f&&=n>=p,p=n}let h=!0;for(let e=0;e<c;++e){let t=m[e]===0;l[e]=t,h&&=!t,m[e]=Math.max(m[e],1),e>0&&(m[e]+=m[e-1])}if(h&&f){let t=e,n=r;for(let e=0;e<s;++e)u[e]=e;return[t,[s,d],n,l,u]}{let t=m[c-1],a=E(n,t*d),f=E(i,t),p=Array(c).fill(0);for(let t=0;t<s;++t){let n=e[t*d],i=p[n],o=(n===0?0:m[n-1])+i;p[n]++;for(let n=0;n<d;++n)a[o*d+n]=e[t*d+n];f[o]=r[t],u[t]=o}for(let e=0;e<c;++e)if(p[e]===0){let t=e===0?0:m[e-1];a[t*d+0]=e;for(let e=1;e<d;++e)a[t*d+e]=0;f[t]=o}return[a,[t,d],f,l,u]}}
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ew(e,t,n,r,i){let a=v(r),o=t[0],s=i.length,c=[],l=1,u=-1;for(let e=0;e<s;++e){let t=i[e];if(t===-1){if(u!==-1)throw Error(dp(u,e));u=e,c.push(1)}else{if(t<0)throw Error(fp(e,t));l*=t,c.push(t)}}if(u!==-1){if(l<=0)throw Error(pp());let e=Math.trunc(a/l);if(l*e!==a)throw Error(mp(r,c));c[u]=e}if(v(c)!==a)throw Error(hp(r,c));let d=r.length,f=[];if(d>0){f[d-1]=1;for(let e=d-2;e>=0;--e)f[e]=f[e+1]*r[e+1]}let p=[];if(s>0){p[s-1]=1;for(let e=s-2;e>=0;--e)p[e]=p[e+1]*c[e+1]}let m=E(n,o*s);for(let t=0;t<o;++t){let n=0;for(let r=0;r<d;++r)n+=e[t*d+r]*f[r];for(let e=0;e<s;++e)m[t*s+e]=Math.trunc(n/p[e]),n%=p[e]}return[m,[o,s],c]}
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function tw(e,t,n,r,i,a=!1,o=0){let s=r.length,c=[t[0],e.length/t[0]],l=c[1],u=s>0?i[s-1]+1:0;if(u<0)throw Error(gp());let d=t.slice();d[0]=u;let f=E(n,d.reduce((e,t)=>e*t,1));if(s===0)return u>0&&f.fill(o),[f,d];if(u<=0)throw Error(gp());let p=0,m=1,h=0,g=i[p];for(;;){let t=0;if(m<s){if(t=i[m],g===t){++m;continue}if(g>=t)throw Error(_p())}if(g<0||g>=u)throw Error(vp(g,u));g>h&&f.fill(o,h*l,g*l);for(let t=p;t<m;++t){let n=r[t];if(n<0||n>=c[0])throw Error(yp(t,r[t],c[0]));for(let t=0;t<l;t++)f[g*l+t]+=e[n*l+t]}if(a)for(let e=0;e<l;e++)f[g*l+e]/=m-p;if(p=m,++m,h=g+1,g=t,m>s)break}return h<u&&f.fill(o,h*l,u*l),[f,d]}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const nw={kernelName:kn,backendName:`cpu`,kernelFunc:$(kn,e=>Math.sqrt(e))},rw={kernelName:Nn,backendName:`cpu`,kernelFunc:HS(Nn,jS(((e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let n=e-t;return n*n})))},iw={kernelName:Fn,backendName:`cpu`,kernelFunc:XS(Fn,YS((e,t)=>{
/**
* @license
* Copyright 2023 Google LLC.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{pattern:n,replaceGlobal:r,rewrite:i}=t;return e.replace(new RegExp(n,r?`g`:``),i)}))};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function aw(e,t,n,r){let i=I(e,t.dtype);for(let e=0;e<i.size;e++){let a=i.indexToLoc(e),o=Array(a.length);for(let e=0;e<o.length;e++)o[e]=a[e]*n[e]+r[e];i.set(t.get(...o),...a)}return i}
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
var ow=class{constructor(e,t,n,r,i,a){this.separator=Tr(e),this.nGramWidths=t,this.leftPad=Tr(n),this.rightPad=Tr(r),this.padWidth=i,this.preserveShort=a}getPadWidth(e){return Math.min(this.padWidth<0?e-1:this.padWidth,e-1)}getNumNGrams(e,t){let n=this.getPadWidth(t);return Math.max(0,e+2*n-t+1)}createNGrams(e,t,n,r,i,a){for(let o=0;o<i;++o){let s=this.getPadWidth(a),c=Math.max(0,s-o),l=Math.max(0,s-(i-(o+1))),u=a-(c+l),d=t+(c>0?0:o-s),f=0;f+=c*this.leftPad.length;for(let t=0;t<u;++t)f+=e[d+t].length;f+=l*this.rightPad.length;let p=c+l+u-1;f+=p*this.separator.length,n[r+o]=new Uint8Array(f);let m=n[r+o],h=0,g=e=>e.forEach(e=>m[h++]=e);for(let e=0;e<c;++e)g(this.leftPad),g(this.separator);for(let t=0;t<u-1;++t)g(e[d+t]),g(this.separator);if(u>0){g(e[d+u-1]);for(let e=0;e<l;++e)g(this.separator),g(this.rightPad)}else{for(let e=0;e<l-1;++e)g(this.rightPad),g(this.separator);g(this.rightPad)}}}compute(e,t){let n=e.length,r=t.length;if(r>0){let e=t[0];if(e!==0)throw Error(`First split value must be 0, got ${e}`);for(let i=1;i<r;++i){let r=t[i]>=e;if(r&&=t[i]<=n,!r)throw Error(`Invalid split value ${t[i]}, must be in [${e}, ${n}]`);e=t[i]}if(e!==n)throw Error(`Last split value must be data size. Expected ${n}, got ${e}`)}let i=r-1,a=E(`int32`,r);if(n===0||r===0){let e=Array(n);for(let e=0;e<=i;++e)a[e]=0;return[e,a]}a[0]=0;for(let e=1;e<=i;++e){let n=t[e]-t[e-1],r=0;this.nGramWidths.forEach(e=>{r+=this.getNumNGrams(n,e)}),this.preserveShort&&n>0&&r===0&&(r=1),a[e]=a[e-1]+r}let o=Array(a[i]);for(let n=0;n<i;++n){let r=t[n],i=a[n];if(this.nGramWidths.forEach(a=>{let s=t[n+1]-t[n],c=this.getNumNGrams(s,a);this.createNGrams(e,r,o,i,c,a),i+=c}),this.preserveShort&&i===a[n]){let a=t[n+1]-t[n];if(a===0)continue;let s=a+2*this.padWidth;this.createNGrams(e,r,o,i,1,s)}}return[o,a]}};function sw(e,t,n,r,i,a,o,s){return new ow(n,r,i,a,o,s).compute(e,t)}
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function cw(e,t,n,r){if(!e.length)return;if(t.length===0){for(let t=0;t<e.length;++t)r.push(e.subarray(t,t+1));return}if(t.length===1){let i=t[0],a=e.indexOf(i);for(;a!==-1;){let t=e.subarray(0,a);(!n||t.length!==0)&&r.push(t),e=e.subarray(a+1),a=e.indexOf(i)}(!n||e.length!==0)&&r.push(e);return}let i=0;for(let a=0;a<e.length+1;a++)if(a===e.length||t.indexOf(e[a])!==-1){let t=e.subarray(i,a);(!n||t.length!==0)&&r.push(t),i=a+1}}function lw(e,t,n){let r=e.length,i=[],a=0,o=0,s=Array(r);for(let c=0;c<r;++c){let r=i.length;cw(e[c],t,n,i);let l=i.length-r;s[c]=l,a+=l,o=Math.max(o,l)}let c=E(`int32`,a*2),l=Array(a),u=[r,o],d=0;for(let e=0;e<r;++e)for(let t=0;t<s[e];++t)c[d*2]=e,c[d*2+1]=t,l[d]=i[d],++d;return[c,l,u]}
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function uw(e,t){let n=E(`int32`,e.length);for(let r=0;r<e.length;++r)n[r]=br(e[r]).modulo(t).getLowBitsUnsigned();return n}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const dw=HS(`Sub`,jS(((e,t)=>e-t)),US(((e,t,n,r)=>({real:e-n,imag:t-r})))),fw={kernelName:`Sub`,backendName:`cpu`,kernelFunc:dw};
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function pw(e,t){let n=Array(e.rank);for(let r=0;r<n.length;r++)n[r]=e.shape[r]*t[r];let r=I(n,e.dtype);for(let t=0;t<r.values.length;++t){let n=r.indexToLoc(t),i=Array(e.rank);for(let t=0;t<i.length;t++)i[t]=n[t]%e.shape[t];let a=e.locToIndex(i);r.values[t]=e.values[a]}return r}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const mw=(e,t)=>{let n=t.value-e.value;return n===0?e.index-t.index:n};function hw(e,t,n=0,r=e.length-1){for(;r>n;){if(r-n>600){let i=r-n+1,a=t-n+1,o=Math.log(i),s=.5*Math.exp(2*o/3),c=.5*Math.sqrt(o*s*(i-s)/i)*Math.sign(a-i/2);hw(e,t,Math.max(n,Math.floor(t-a*s/i+c)),Math.min(r,Math.floor(t+(i-a)*s/i+c)))}let i=e[t],a=n,o=r;for(m(e,n,t),mw(e[r],i)>0&&m(e,n,r);a<o;){for(m(e,a,o),a++,o--;mw(e[a],i)<0;)a+=1;for(;mw(e[o],i)>0;)--o}mw(e[n],i)===0?m(e,n,o):(o+=1,m(e,o,r)),o<=t&&(n=o+1),t<=o&&(r=o-1)}}function gw(e,t,n,r,i){let a=t[t.length-1],[o,s]=[e.length/a,a],c=T(n,o*r),l=T(`int32`,o*r);for(let t=0;t<o;t++){let n=t*s,a=e.subarray(n,n+s),o=Array(a.length);a.forEach((e,t)=>o[t]={value:e,index:t}),r<o.length&&(hw(o,r),o=o.slice(0,r)),i&&o.sort(mw);let u=t*r,d=c.subarray(u,u+r),f=l.subarray(u,u+r);for(let e=0;e<r;e++)d[e]=o[e].value,f[e]=o[e].index}let u=t.slice();return u[u.length-1]=r,[I(u,n,c),I(u,`int32`,l)]}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function _w(e,t,n,r){let i=C(t,n)[0],a=[1,n[0],1];for(let e=0;e<i;e++)a[0]*=n[e];a[1]=n[i];for(let e=i+1;e<n.length;e++)a[2]*=n[e];let o=/* @__PURE__ */ new Map,s=new Int32Array(n[i]),c=new Br(a,r,e),l=[],u=a[0]===1&&a[2]===1;for(let t=0;t<n[i];t++){let n;if(u)n=e[t].toString();else{let e=[];for(let n=0;n<a[0];n++)for(let r=0;r<a[2];r++)e.push(c.get(n,t,r));n=e.join(`,`)}let r=o.get(n);if(r!=null)s[t]=r;else{let e=o.size;o.set(n,e),s[t]=e,l.push(t)}}let d=a.slice();d[1]=o.size;let f=new Br(d,r);l.forEach((e,t)=>{for(let n=0;n<a[0];n++)for(let r=0;r<a[2];r++)f.set(c.get(n,e,r),n,t,r)});let p=n.slice();return p[i]=d[1],{outputValues:f.values,outputShape:p,indices:s}}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
ji(`cpu`,()=>new OS,1);
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const vw=$(`Elu`,e=>e>=0?e:Math.exp(e)-1),yw={kernelName:`Elu`,backendName:`cpu`,kernelFunc:vw};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function bw(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{alpha:a}=r;Q([i],`leakyRelu`);let o=v(i.shape),s=n.data.get(i.dataId).values,c=T(`float32`,o);for(let e=0;e<s.length;e++)c[e]=s[e]<0?a*s[e]:s[e];return n.makeTensorInfo(i.shape,`float32`,c)}const xw={kernelName:Ft,backendName:`cpu`,kernelFunc:bw},Sw=jS((e,t)=>e<0?t*e:e)
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;function Cw(e){let{inputs:t,backend:n}=e,{x:r,alpha:i}=t;Q([r,i],`prelu`);let a=n.data.get(r.dataId).values,o=n.data.get(i.dataId).values,[s,c]=Sw(r.shape,i.shape,a,o,`float32`);return n.makeTensorInfo(c,`float32`,s)}const ww={kernelName:sn,backendName:`cpu`,kernelFunc:Cw},Tw=$(fn,e=>Math.max(0,e)),Ew={kernelName:fn,backendName:`cpu`,kernelFunc:Tw},Dw=$(vn,e=>Math.min(Math.max(0,e),6)),Ow={kernelName:vn,backendName:`cpu`,kernelFunc:Dw}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function kw(e,t,n,r,i){if(n===`linear`)return FS({inputs:{x:t},backend:e});if(n===`relu`)return Tw({inputs:{x:t},backend:e});if(n===`elu`)return vw({inputs:{x:t},backend:e});if(n===`relu6`)return Dw({inputs:{x:t},backend:e});if(n===`prelu`)return Cw({inputs:{x:t,alpha:r},backend:e});if(n===`leakyrelu`)return bw({inputs:{x:t},backend:e,attrs:{alpha:i}});if(n===`sigmoid`)return JC({inputs:{x:t},backend:e});throw Error(`Activation ${n} has not been implemented for the CPU backend.`)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Aw(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{shape:a}=r,o=v(i.shape),s=S(a,o),c=v(s);h(o===c,()=>`The new shape (${s}) has ${c} elements and the old shape (${i.shape}) has ${o} elements. The new shape and old shape must have the same number of elements.`),n.incRef(i.dataId);let l=n.data.get(i.dataId);if(l.complexTensorInfos!=null){let e=l.complexTensorInfos.real,t=l.complexTensorInfos.imag;e.shape=s,t.shape=s}return{dataId:i.dataId,shape:s,dtype:i.dtype}}const jw={kernelName:pn,backendName:`cpu`,kernelFunc:Aw};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Mw(e){let{inputs:t,backend:n,attrs:r}=e,{a:i,b:a}=t,{transposeA:o,transposeB:s}=r;Q([i,a],`matMul`);let c=i.shape.length,l=a.shape.length,u=o?i.shape[c-2]:i.shape[c-1],d=s?a.shape[l-1]:a.shape[l-2],f=o?i.shape[c-1]:i.shape[c-2],p=s?a.shape[l-2]:a.shape[l-1],m=i.shape.slice(0,-2),g=a.shape.slice(0,-2),_=v(m),y=v(g),b=ws(i.shape.slice(0,-2),a.shape.slice(0,-2)).concat([f,p]);h(u===d,()=>`Error in matMul: inner shapes (${u}) and (${d}) of Tensors with shapes ${i.shape} and ${a.shape} and transposeA=${o} and transposeB=${s} must match.`);let x=o?[_,u,f]:[_,f,u],S=s?[y,p,d]:[y,d,p],C=Aw({inputs:{x:i},backend:n,attrs:{shape:x}}),w=Aw({inputs:{x:a},backend:n,attrs:{shape:S}}),T=o?C.shape[1]:C.shape[2],E=o?C.shape[2]:C.shape[1],D=s?w.shape[1]:w.shape[2],O=Math.max(_,y),ee=n.data.get(C.dataId).values,te=n.data.get(w.dataId).values,ne=k(C.shape),re=k(w.shape),[ie,ae,oe]=o?[ne[0],1,ne[1]]:[ne[0],ne[1],1],[se,ce,le]=s?[1,re[1],re[0]]:[re[1],1,re[0]],ue=E*D,de=I([O,E,D],C.dtype),fe=de.values,pe=n.blockSize;for(let e=0;e<O;e++){let t=e%_,n=e%y;for(let r=0;r<E;r+=pe){let i=Math.min(r+pe,E);for(let a=0;a<D;a+=pe){let o=Math.min(a+pe,D);for(let s=0;s<T;s+=pe){let c=Math.min(s+pe,T);for(let l=r;l<i;l++)for(let r=a;r<o;r++){let i=0;for(let e=s;e<c;e++){let a=ee[t*ie+l*ae+e*oe],o=te[e*se+r*ce+n*le];i+=a*o}fe[e*ue+(l*D+r)]+=i}}}}}return n.disposeIntermediateTensorInfo(C),n.disposeIntermediateTensorInfo(w),n.makeTensorInfo(b,de.dtype,de.values)}const Nw={kernelName:Ue,backendName:`cpu`,kernelFunc:Mw};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Pw(e){let{inputs:t,backend:n,attrs:r}=e,{a:i,b:a,bias:o,preluActivationWeights:s}=t,{transposeA:c,transposeB:l,activation:u,leakyreluAlpha:d}=r,f,p,m,h=[];f=Mw({inputs:{a:i,b:a},attrs:{transposeA:c,transposeB:l},backend:n}),o&&(p=WS({inputs:{a:f,b:o},backend:n}),h.push(f),f=p),u&&(m=kw(n,f,u,s,d),h.push(f),f=m);for(let e of h)n.disposeIntermediateTensorInfo(e);return f}const Fw={kernelName:Gn,backendName:`cpu`,kernelFunc:Pw},Iw={kernelName:ke,backendName:`cpu`,kernelFunc:$(ke,e=>Math.acos(e))},Lw={kernelName:Ae,backendName:`cpu`,kernelFunc:$(Ae,e=>Math.acosh(e))}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Rw(e){let{inputs:t,backend:n}=e,r=t;Q(t,`addN`);let i=r.map(e=>n.data.get(e.dataId).values),a=I(r[0].shape,r[0].dtype),o=a.values;for(let e=0;e<r.length;e++){let t=i[e];for(let e=0;e<o.length;e++)o[e]+=t[e]}return n.makeTensorInfo(a.shape,a.dtype,a.values)}const zw={kernelName:je,backendName:`cpu`,kernelFunc:Rw};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Bw(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;Q(i,`all`);let s=C(a,i.shape),c=s,l=Vs(c,i.shape.length),u=i;l!=null&&(u=TC({inputs:{x:i},backend:n,attrs:{perm:l}}),c=Us(c.length,i.shape.length)),Bs(`all`,c,u.shape.length);let[d,f]=Rs(u.shape,c),p=v(f),m=fe(v(d),u.dtype),h=n.data.get(u.dataId).values;for(let e=0;e<m.length;++e){let t=e*p,n=h[t];for(let e=0;e<p;++e){let r=h[t+e];n&&=r}m[e]=n}l!=null&&n.disposeIntermediateTensorInfo(u);let g=n.makeTensorInfo(d,u.dtype,m);if(o){let e=zs(d,s),t=Aw({inputs:{x:g},backend:n,attrs:{shape:e}});return n.disposeIntermediateTensorInfo(g),t}return g}const Vw={kernelName:`All`,backendName:`cpu`,kernelFunc:Bw};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Hw(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;Q(i,`any`);let s=C(a,i.shape),c=s,l=Vs(c,i.shape.length),u=i;l!=null&&(u=TC({inputs:{x:i},backend:n,attrs:{perm:l}}),c=Us(c.length,i.shape.length)),Bs(`any`,c,u.shape.length);let[d,f]=Rs(u.shape,c),p=v(f),m=fe(v(d),u.dtype),h=n.data.get(u.dataId).values;for(let e=0;e<m.length;++e){let t=e*p,n=h[t];for(let e=0;e<p;++e){let r=h[t+e];n||=r}m[e]=n}l!=null&&n.disposeIntermediateTensorInfo(u);let g=n.makeTensorInfo(d,u.dtype,m);if(o){let e=zs(d,s),t=Aw({inputs:{x:g},backend:n,attrs:{shape:e}});return n.disposeIntermediateTensorInfo(g),t}return g}const Uw={kernelName:`Any`,backendName:`cpu`,kernelFunc:Hw};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Ww(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a}=r;Q(i,`argMax`);let o=C(a,i.shape),s=Vs(o,i.shape.length),c=i,l=[];s!=null&&(c=TC({inputs:{x:i},backend:n,attrs:{perm:s}}),l.push(c),o=Us(o.length,c.shape.length)),o=[o[0]],Bs(`argMax`,o,c.shape.length);let[u,d]=Rs(c.shape,o),f=fe(v(u),`int32`),p=v(d),m=n.data.get(c.dataId).values;for(let e=0;e<f.length;++e){let t=e*p,n=m[t],r=0;for(let e=0;e<p;++e){let i=m[t+e];i>n&&(n=i,r=e)}f[e]=r}return l.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.makeTensorInfo(u,`int32`,f)}const Gw={kernelName:Me,backendName:`cpu`,kernelFunc:Ww};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function Kw(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a}=r;Q(i,`argMin`);let o=C(a,i.shape),s=Vs(o,i.shape.length),c=i,l=[];s!=null&&(c=TC({inputs:{x:i},backend:n,attrs:{perm:s}}),l.push(c),o=Us(o.length,c.shape.length)),o=[o[0]],Bs(`argMin`,o,c.shape.length);let[u,d]=Rs(c.shape,o),f=fe(v(u),`int32`),p=v(d),m=n.data.get(c.dataId).values;for(let e=0;e<f.length;++e){let t=e*p,n=m[t],r=0;for(let e=0;e<p;++e){let i=m[t+e];i<n&&(n=i,r=e)}f[e]=r}return l.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.makeTensorInfo(u,`int32`,f)}const qw={kernelName:Ne,backendName:`cpu`,kernelFunc:Kw},Jw={kernelName:Pe,backendName:`cpu`,kernelFunc:$(Pe,e=>Math.asin(e))},Yw={kernelName:Fe,backendName:`cpu`,kernelFunc:$(Fe,e=>Math.asinh(e))},Xw={kernelName:Ie,backendName:`cpu`,kernelFunc:$(Ie,e=>Math.atan(e))},Zw={kernelName:Re,backendName:`cpu`,kernelFunc:HS(Re,jS((e,t)=>Math.atan2(e,t)))},Qw={kernelName:Le,backendName:`cpu`,kernelFunc:$(Le,e=>Math.atanh(e))}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function $w(e,t,n,r,i,a){let o=i.strideHeight,s=i.strideWidth,c=i.dilationHeight,l=i.dilationWidth,u=i.effectiveFilterHeight,d=i.effectiveFilterWidth,f=i.padInfo.top,p=i.padInfo.left,m=a===`max`?-1/0:1/0,h=I(i.outShape,n),g=h.values,_=i.outShape[1]*i.outShape[2]*i.outShape[3],v=i.outShape[2]*i.outShape[3],y=i.outShape[3];for(let t=0;t<i.batchSize;++t){let n=t*_,h=t*r[0];for(let t=0;t<i.inChannels;++t)for(let _=0;_<i.outHeight;++_){let b=_*o-f,x=Math.max(0,b),S=Math.min(i.inHeight,u+b),C=n+_*v;for(let n=0;n<i.outWidth;++n){let o=n*s-p,u=Math.max(0,o),f=Math.min(i.inWidth,d+o),_=m,v=0,b=0;for(let n=x;n<S;n+=c){let i=h+n*r[1];for(let n=u;n<f;n+=l){let o=e[i+n*r[2]+t];a===`max`&&o>_?_=o:a===`avg`&&(v+=o,b++)}if(isNaN(_))break}let w=C+n*y+t;g[w]=a===`avg`?v/b:_}}}return h}function eT(e,t,n,r,i=!1,a=!1){let o=I(r.outShape,`int32`),s=r.strideHeight,c=r.strideWidth,l=r.dilationHeight,u=r.dilationWidth,d=r.effectiveFilterHeight,f=r.effectiveFilterWidth,p=r.padInfo.top,m=r.padInfo.left,h=I(t,n,e);for(let e=0;e<r.batchSize;++e)for(let t=0;t<r.inChannels;++t)for(let n=0;n<r.outHeight;++n){let g=n*s-p,_=g;for(;_<0;)_+=l;let v=Math.min(r.inHeight,d+g);for(let s=0;s<r.outWidth;++s){let d=s*c-m,p=d;for(;p<0;)p+=u;let y=Math.min(r.inWidth,f+d),b=-1/0,x=-1;for(let n=_;n<v;n+=l){let o=n-g;for(let s=p;s<y;s+=u){let c=s-d,l=h.get(e,n,s,t);l>b&&(b=l,x=i?a?((e*r.inHeight+n)*r.inWidth+s)*r.inChannels+t:(n*r.inWidth+s)*r.inChannels+t:o*f+c)}}o.set(x,e,n,s,t)}}return o}function tT(e,t,n,r,i,a){let o=i.strideDepth,s=i.strideHeight,c=i.strideWidth,l=i.dilationDepth,u=i.dilationHeight,d=i.dilationWidth,f=i.effectiveFilterDepth,p=i.effectiveFilterHeight,m=i.effectiveFilterWidth,h=i.padInfo.front,g=i.padInfo.top,_=i.padInfo.left,v=a===`max`?-1/0:1/0,y=I(i.outShape,n),b=y.values,x=i.outShape[1]*i.outShape[2]*i.outShape[3]*i.outShape[4],S=i.outShape[2]*i.outShape[3]*i.outShape[4],C=i.outShape[3]*i.outShape[4],w=i.outShape[4];for(let t=0;t<i.batchSize;++t){let n=t*x,y=t*r[0];for(let t=0;t<i.inChannels;++t)for(let x=0;x<i.outDepth;++x){let T=x*o-h,E=T;for(;E<0;)E+=l;let D=Math.min(i.inDepth,f+T),O=n+x*S;for(let n=0;n<i.outHeight;++n){let o=n*s-g,f=o;for(;f<0;)f+=u;let h=Math.min(i.inHeight,p+o),x=O+n*C;for(let n=0;n<i.outWidth;++n){let o=n*c-_,s=o;for(;s<0;)s+=d;let p=Math.min(i.inWidth,m+o),g=x+n*w,S=v,C=0,T=0;for(let n=E;n<D;n+=l){let i=y+n*r[1];for(let n=f;n<h;n+=u){let o=i+n*r[2];for(let n=s;n<p;n+=d){let i=e[o+n*r[3]+t];if(a===`max`&&i>S?S=i:a===`avg`&&(C+=i,T++),isNaN(S))break}if(isNaN(S))break}if(isNaN(S))break}let O=g+t;b[O]=a===`avg`?C/Math.max(T,1):S}}}}return y}function nT(e,t){let n=I(t.outShape,`int32`),r=t.strideDepth,i=t.strideHeight,a=t.strideWidth,o=t.dilationDepth,s=t.dilationHeight,c=t.dilationWidth,l=t.effectiveFilterDepth,u=t.effectiveFilterHeight,d=t.effectiveFilterWidth,f=t.padInfo.front,p=t.padInfo.top,m=t.padInfo.left;for(let h=0;h<t.batchSize;++h)for(let g=0;g<t.inChannels;++g)for(let _=0;_<t.outDepth;++_){let v=_*r-f,y=v;for(;y<0;)y+=o;let b=Math.min(t.inDepth,l+v);for(let r=0;r<t.outHeight;++r){let l=r*i-p,f=l;for(;f<0;)f+=s;let x=Math.min(t.inHeight,u+l);for(let i=0;i<t.outWidth;++i){let p=i*a-m,S=p;for(;S<0;)S+=c;let C=Math.min(t.inWidth,d+p),w=-1/0,T=-1;for(let t=y;t<b;t+=o){let n=t-v;for(let r=f;r<x;r+=s){let i=r-l;for(let a=S;a<C;a+=c){let o=a-p,s=e.get(h,t,r,a,g);s>=w&&(w=s,T=n*u*d+i*u+o)}}}n.set(T,h,_,r,i,g)}}}return n}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function rT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t;Q(i,`avgPool`);let{filterSize:a,strides:o,pad:s,dimRoundingMode:c}=r;h(io(o,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${o} and dilations '1'`);let l=Wa(i.shape,a,o,1,s,c),u;if(l.filterWidth===1&&l.filterHeight===1&&y(l.inShape,l.outShape))u=FS({inputs:{x:i},backend:n});else{let e=n.data.get(i.dataId).values,t=k(i.shape),r=$w(e,i.shape,i.dtype,t,l,`avg`);u=n.makeTensorInfo(l.outShape,i.dtype,r.values)}return u}const iT={kernelName:ze,backendName:`cpu`,kernelFunc:rT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function aT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{filterSize:a,strides:o,pad:s,dimRoundingMode:c,dataFormat:l}=r;Q(i,`avgPool3d`);let u=Ga(i.shape,a,o,1,s,c,l),d=n.data.get(i.dataId).values,f=tT(d,i.shape,i.dtype,k(i.shape),u,`avg`);return n.makeTensorInfo(f.shape,`float32`,f.values)}const oT={kernelName:Ve,backendName:`cpu`,kernelFunc:aT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function sT(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,{filterSize:o,strides:s,pad:c,dimRoundingMode:l}=r;Q([i,a],`avgPool3DGrad`);let u=Ga(a.shape,o,s,1,c,l),d=u.strideDepth,f=u.strideHeight,p=u.strideWidth,m=u.filterDepth,h=u.filterHeight,g=u.filterWidth,_=u.dilationDepth,v=u.dilationHeight,y=u.dilationWidth,b=u.effectiveFilterDepth,x=u.effectiveFilterHeight,S=u.effectiveFilterWidth,C=b-1-u.padInfo.front,w=S-1-u.padInfo.left,T=x-1-u.padInfo.top,E=I(a.shape,`float32`),D=1/(m*h*g),O=n.bufferSync(i);for(let e=0;e<u.batchSize;++e)for(let t=0;t<u.inChannels;++t)for(let n=0;n<u.inDepth;++n)for(let r=0;r<u.inHeight;++r)for(let i=0;i<u.inWidth;++i){let a=n-C,o=r-T,s=i-w,c=0;for(let n=0;n<b;n+=_){let r=(a+n)/d;if(!(r<0||r>=u.outDepth||Math.floor(r)!==r))for(let n=0;n<x;n+=v){let i=(o+n)/f;if(!(i<0||i>=u.outHeight||Math.floor(i)!==i))for(let n=0;n<S;n+=y){let a=(s+n)/p;if(a<0||a>=u.outWidth||Math.floor(a)!==a)continue;let o=O.get(e,r,i,a,t);c+=o}}}E.set(c*D,e,n,r,i,t)}return n.makeTensorInfo(E.shape,E.dtype,E.values)}const cT={kernelName:He,backendName:`cpu`,kernelFunc:sT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function lT(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,o=a;Q([i,a],`avgPoolGrad`);let{filterSize:s,strides:c,pad:l}=r,u=Wa(o.shape,s,c,1,l),d=u.strideHeight,f=u.strideWidth,p=u.filterHeight,m=u.filterWidth,h=u.dilationHeight,g=u.dilationWidth,_=u.effectiveFilterHeight,v=u.effectiveFilterWidth,y=v-1-u.padInfo.left,b=_-1-u.padInfo.top,x=I(o.shape,`float32`),S=1/(p*m),C=n.data.get(i.dataId).values,w=I(i.shape,`float32`,C);for(let e=0;e<u.batchSize;++e)for(let t=0;t<u.inChannels;++t)for(let n=0;n<u.inHeight;++n)for(let r=0;r<u.inWidth;++r){let i=n-b,a=r-y,o=0;for(let n=0;n<_;n+=h){let r=(i+n)/d;if(!(r<0||r>=u.outHeight||Math.floor(r)!==r))for(let n=0;n<v;n+=g){let i=(a+n)/f;if(i<0||i>=u.outWidth||Math.floor(i)!==i)continue;let s=w.get(e,r,i,t);o+=s}}x.set(o*S,e,n,r,t)}return n.makeTensorInfo(x.shape,x.dtype,x.values)}const uT={kernelName:Be,backendName:`cpu`,kernelFunc:lT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function dT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,scale:a,offset:o,mean:s,variance:c}=t;h(s.shape.length===c.shape.length,()=>`Batch normalization gradient requires mean and variance to have equal ranks.`),h(o==null||s.shape.length===o.shape.length,()=>`Batch normalization gradient requires mean and offset to have equal ranks.`),h(a==null||s.shape.length===a.shape.length,()=>`Batch normalization gradient requires mean and scale to have equal ranks.`),Q([i,s,c,a,o],`batchNorm`);let{varianceEpsilon:l}=r;l??=.001;let u=n.data.get(i.dataId).values,d=n.data.get(s.dataId).values,f=n.data.get(c.dataId).values,p=a?n.data.get(a.dataId).values:new Float32Array([1]),m=o?n.data.get(o.dataId).values:new Float32Array([0]),g=new Float32Array(u.length),_=m.length,v=p.length,y=f.length,b=d.length,x=0,S=0,C=0,w=0;for(let e=0;e<u.length;++e)g[e]=m[x++]+(u[e]-d[S++])*p[C++]/Math.sqrt(f[w++]+l),x>=_&&(x=0),S>=b&&(S=0),C>=v&&(C=0),w>=y&&(w=0);return n.makeTensorInfo(i.shape,i.dtype,g)}const fT={kernelName:Et,backendName:`cpu`,kernelFunc:dT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function pT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockShape:a,crops:o}=r;Q([i],`batchToSpaceND`);let s=a.reduce((e,t)=>e*t),c=Vf(i.shape,a,s),l=Hf(c.length,a.length),u=Uf(i.shape,a,s),d=Wf(o,a.length),f=Gf(u,o,a.length),p=Aw({inputs:{x:i},backend:n,attrs:{shape:c}}),m=TC({inputs:{x:p},backend:n,attrs:{perm:l}}),h=Aw({inputs:{x:m},backend:n,attrs:{shape:u}}),g=ZC({inputs:{x:h},backend:n,attrs:{begin:d,size:f}});return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(h),g}const mT={kernelName:We,backendName:`cpu`,kernelFunc:pT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function hT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,weights:a}=t,{size:o}=r,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,l=KS(s,c,a.dtype,a.shape,o);return n.makeTensorInfo([o],a.dtype,l)}const gT={kernelName:Ge,backendName:`cpu`,kernelFunc:hT};
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function _T(e){let{inputs:t,backend:n}=e,{s0:r,s1:i}=t,a=n.data.get(r.dataId).values,o=n.data.get(i.dataId).values,s=ws(Array.from(a),Array.from(o));return n.makeTensorInfo([s.length],`int32`,Int32Array.from(s))}const vT={kernelName:`BroadcastArgs`,backendName:`cpu`,kernelFunc:_T},yT={kernelName:Ye,backendName:`cpu`,kernelFunc:$(Ye,(e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let n=t;return e>n.clipValueMax?n.clipValueMax:e<n.clipValueMin?n.clipValueMin:e})},bT={kernelName:Ze,backendName:`cpu`,kernelFunc:e=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{x:t}=e.inputs,n=e.backend,r=new Float32Array(v(t.shape)),i=n.data.get(t.dataId),a=i.complexTensorInfos.real,o=i.complexTensorInfos.imag,s=n.data.get(a.dataId).values,c=n.data.get(o.dataId).values;for(let e=0;e<s.length;e++){let t=s[e],n=c[e];r[e]=Math.hypot(t,n)}return n.makeOutput(r,t.shape,`float32`)}};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function xT(e){let{inputs:t,backend:n}=e,{input:r}=t,i=n.data.get(r.dataId).complexTensorInfos.imag,a=n.data.get(i.dataId).values;return n.makeTensorInfo(i.shape,i.dtype,a)}const ST={kernelName:jt,backendName:`cpu`,kernelFunc:xT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function CT(e){let{inputs:t,backend:n,attrs:r}=e,{axis:i}=r,a=C(i,t[0].shape)[0];Nf(t.map(e=>e.shape),a);let o=Pf(t.map(e=>e.shape),a);if(v(o)===0)return n.makeTensorInfo(o,t[0].dtype,[]);let s=t.filter(e=>v(e.shape)>0);if(s.length===1)return FS({inputs:{x:s[0]},backend:n});if(s[0].dtype===`complex64`){let e=s.map(e=>LS({inputs:{input:e},backend:n})),t=s.map(e=>xT({inputs:{input:e},backend:n})),r=CT({inputs:e,backend:n,attrs:{axis:a}}),i=CT({inputs:t,backend:n,attrs:{axis:a}}),o=MS({inputs:{real:r,imag:i},backend:n});return e.forEach(e=>n.disposeIntermediateTensorInfo(e)),t.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.disposeIntermediateTensorInfo(r),n.disposeIntermediateTensorInfo(i),o}let c=s.map(e=>{let t=[-1,v(e.shape.slice(a))];return Aw({inputs:{x:e},backend:n,attrs:{shape:t}})}),l=c.map(e=>({vals:n.data.get(e.dataId).values,shape:e.shape}));o=Pf(c.map(e=>e.shape),1);let u=c[0].shape[0]===1,d=QS(l,o,t[0].dtype,u),f=Pf(s.map(e=>e.shape),a),p=n.makeTensorInfo(f,t[0].dtype,d);return c.forEach(e=>n.disposeIntermediateTensorInfo(e)),p}const wT={kernelName:Qe,backendName:`cpu`,kernelFunc:CT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function TT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dataFormat:c,dilations:l,dimRoundingMode:u}=r;Q([i,a],`conv2d`);let d=oo(c),f=Ka(i.shape,a.shape,o,l,s,u,!1,d),p=f.filterHeight,m=f.filterWidth,h=f.dilationHeight,g=f.dilationWidth,_=f.padInfo.left,v=f.padInfo.top,y=f.dataFormat===`channelsLast`,b=new Br(f.outShape,i.dtype),x=k(i.shape),S=k(a.shape),C=x[0],w=y?x[1]:x[2],T=y?x[2]:1,E=y?1:x[1],D=b.strides[0],O=y?b.strides[1]:b.strides[2],ee=y?b.strides[2]:1,te=y?1:b.strides[1],ne=n.data.get(i.dataId).values,re=n.data.get(a.dataId).values,ie=b.values;for(let e=0;e<f.batchSize;++e){let t=e*C,n=e*D;for(let e=0;e<f.outHeight;++e){let r=n+e*O,i=e*f.strideHeight-v;for(let e=0;e<p;++e){let n=i+e*h;if(n<0||n>=f.inHeight)continue;let a=e*S[0],o=t+n*w;for(let e=0;e<f.outWidth;++e){let t=r+e*ee,n=e*f.strideWidth-_;for(let e=0;e<m;++e){let r=n+e*g;if(r<0||r>=f.inWidth)continue;let i=a+e*S[1],s=o+r*T,c=i;for(let e=0;e<f.inChannels;++e){let n=ne[s+e*E];for(let e=0;e<f.outChannels;++e)ie[t+e*te]+=n*re[c+e];c+=f.outChannels}}}}}}return n.makeTensorInfo(b.shape,b.dtype,ie)}const ET={kernelName:$e,backendName:`cpu`,kernelFunc:TT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function DT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,pad:s,dataFormat:c,dimRoundingMode:l,filterShape:u}=r;Q([i,a],`conv2dBackpropFilter`);let d=oo(c),f=Ka(i.shape,u,o,1,s,l,!1,d),{strideHeight:p,strideWidth:m,filterHeight:h,filterWidth:g}=f,_=f.dataFormat===`channelsLast`,v=new Br(f.filterShape,`float32`),y=f.padInfo.left,b=f.padInfo.top,x=n.data.get(i.dataId).values,S=n.data.get(a.dataId).values,C=new Br(i.shape,i.dtype,x),w=new Br(a.shape,a.dtype,S);for(let e=0;e<h;++e){let t=Math.max(0,Math.ceil((b-e)/p)),n=Math.min(f.outHeight,(f.inHeight+b-e)/p);for(let r=0;r<g;++r){let i=Math.max(0,Math.ceil((y-r)/m)),a=Math.min(f.outWidth,(f.inWidth+y-r)/m);for(let o=0;o<f.inChannels;++o)for(let s=0;s<f.outChannels;++s){let c=0;for(let l=0;l<f.batchSize;++l)for(let u=t;u<n;++u){let t=e+u*p-b;for(let e=i;e<a;++e){let n=r+e*m-y;c+=_?C.get(l,t,n,o)*w.get(l,u,e,s):C.get(l,o,t,n)*w.get(l,s,u,e)}}v.set(c,e,r,o,s)}}}return n.makeTensorInfo(v.shape,v.dtype,v.values)}const OT={kernelName:et,backendName:`cpu`,kernelFunc:DT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function kT(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{inputShape:o,strides:s,pad:c,dataFormat:l,dimRoundingMode:u}=r;Q([i,a],`conv2dBackpropInput`);let d=k(a.shape),f=k(i.shape),p=oo(l),m=Ka(o,a.shape,s,1,c,u,!1,p),h=new Br(m.inShape,`float32`),g=h.values,_=n.data.get(i.dataId).values,v=n.data.get(a.dataId).values,[y,b,x]=d,{batchSize:S,filterHeight:C,filterWidth:w,inChannels:T,inHeight:E,inWidth:D,outChannels:O,outHeight:ee,outWidth:te,strideHeight:ne,strideWidth:re}=m;p=m.dataFormat;let ie=C-1-m.padInfo.top,ae=w-1-m.padInfo.left,oe=p===`channelsLast`,se=h.strides[0],ce=oe?h.strides[1]:h.strides[2],le=oe?h.strides[2]:1,ue=oe?1:h.strides[1],de=f[0],fe=oe?f[1]:f[2],pe=oe?f[2]:1,me=oe?1:f[1];for(let e=0;e<S;++e)for(let t=0;t<T;++t)for(let n=0;n<E;++n){let r=n-ie,i=Math.max(0,Math.ceil(r/ne)),a=Math.min(ee,(C+r)/ne);for(let o=0;o<D;++o){let s=o-ae,c=Math.max(0,Math.ceil(s/re)),l=Math.min(te,(w+s)/re),u=0;for(let n=i;n<a;++n){let i=n*ne-r;for(let r=c;r<l;++r){let a=r*re-s,o=de*e+fe*n+pe*r,c=y*(C-1-i)+b*(w-1-a)+x*t;for(let e=0;e<O;++e){let t=_[o+me*e],n=v[c+e];u+=t*n}}}let d=se*e+ce*n+le*o+ue*t;g[d]=u}}return n.makeTensorInfo(h.shape,h.dtype,h.values)}const AT={kernelName:tt,backendName:`cpu`,kernelFunc:kT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function jT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c}=r;Q([i,a],`conv3d`);let l=qa(i.shape,a.shape,o,c,s),{filterDepth:u,filterHeight:d,filterWidth:f,dilationDepth:p,dilationHeight:m,dilationWidth:h,padInfo:g}=l,_=g.front,v=g.left,y=g.top,b=new Br(l.outShape,i.dtype),x=n.data.get(i.dataId).values,S=n.data.get(a.dataId).values,C=b.values,w=k(i.shape),T=k(a.shape);for(let e=0;e<l.batchSize;++e){let t=e*w[0],n=e*b.strides[0];for(let e=0;e<l.outDepth;++e){let r=n+e*b.strides[1],i=e*l.strideDepth-_;for(let e=0;e<u;++e){let n=i+e*p;if(n<0||n>=l.inDepth)continue;let a=e*T[0],o=t+n*w[1];for(let e=0;e<l.outHeight;++e){let t=r+e*b.strides[2],n=e*l.strideHeight-y;for(let e=0;e<d;++e){let r=n+e*m;if(r<0||r>=l.inHeight)continue;let i=a+e*T[1],s=o+r*w[2];for(let e=0;e<l.outWidth;++e){let n=t+e*l.outChannels,r=e*l.strideWidth-v;for(let e=0;e<f;++e){let t=r+e*h;if(t<0||t>=l.inWidth)continue;let a=i+e*T[2],o=s+t*l.inChannels,c=a;for(let e=0;e<l.inChannels;++e){let t=x[o+e];for(let e=0;e<l.outChannels;++e)C[n+e]+=t*S[c+e];c+=l.outChannels}}}}}}}}return n.makeTensorInfo(b.shape,b.dtype,b.values)}const MT={kernelName:nt,backendName:`cpu`,kernelFunc:jT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function NT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,pad:s,filterShape:c}=r;Q([i,a],`conv3dBackpropFilterV2`);let l=k(i.shape),u=k(a.shape),d=qa(i.shape,c,o,1,s),f=d.strideDepth,p=d.strideHeight,m=d.strideWidth,h=d.filterDepth,g=d.filterHeight,_=d.filterWidth,v=new Br(d.filterShape,`float32`),y=v.values,[b,x,S,C]=v.strides,w=n.data.get(a.dataId).values,[T,E,D,O]=u,ee=n.data.get(i.dataId).values,[te,ne,re,ie]=l,ae=d.padInfo.front,oe=d.padInfo.left,se=d.padInfo.top;for(let e=0;e<h;++e){let t=Math.max(0,Math.ceil((ae-e)/f)),n=Math.min(d.outDepth,(d.inDepth+ae-e)/f),r=e*b;for(let i=0;i<g;++i){let a=Math.max(0,Math.ceil((se-i)/p)),o=Math.min(d.outHeight,(d.inHeight+se-i)/p),s=i*x+r;for(let r=0;r<_;++r){let c=Math.max(0,Math.ceil((oe-r)/m)),l=Math.min(d.outWidth,(d.inWidth+oe-r)/m),u=r*S+s;for(let s=0;s<d.inChannels;++s){let h=s*C+u;for(let u=0;u<d.outChannels;++u){let g=0;for(let h=0;h<d.batchSize;++h){let d=h*te,_=h*T;for(let h=t;h<n;++h){let t=(e+h*f-ae)*ne+d,n=h*E+_;for(let e=a;e<o;++e){let a=(i+e*p-se)*re+t,o=e*D+n;for(let e=c;e<l;++e){let t=(r+e*m-oe)*ie+a,n=e*O+o;g+=ee[t+s]*w[n+u]}}}}y[h+u]=g}}}}}return n.makeTensorInfo(v.shape,v.dtype,v.values)}const PT={kernelName:rt,backendName:`cpu`,kernelFunc:NT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function FT(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{pad:o,strides:s,inputShape:c}=r;Q([i],`conv3dBackpropInputV2`);let l=k(i.shape),u=k(a.shape),d=qa(c,a.shape,s,1,o),f=new Br(d.inShape,`float32`),p=f.values,[m,h,g,_]=f.strides,v=n.data.get(i.dataId).values,[y,b,x,S]=l,C=n.data.get(a.dataId).values,[w,T,E,D]=u,{batchSize:O,filterDepth:ee,filterHeight:te,filterWidth:ne,inChannels:re,inDepth:ie,inHeight:ae,inWidth:oe,outChannels:se,outDepth:ce,outHeight:le,outWidth:ue,strideDepth:de,strideHeight:fe,strideWidth:pe}=d,me=ee-1-d.padInfo.front,he=te-1-d.padInfo.top,ge=ne-1-d.padInfo.left;for(let e=0;e<O;++e)for(let t=0;t<re;++t)for(let n=0;n<ie;++n){let r=n-me,i=Math.max(0,Math.ceil(r/de)),a=Math.min(ce,(ee+r)/de);for(let o=0;o<ae;++o){let s=o-he,c=Math.max(0,Math.ceil(s/fe)),l=Math.min(le,(te+s)/fe);for(let u=0;u<oe;++u){let d=u-ge,f=Math.max(0,Math.ceil(d/pe)),O=Math.min(ue,(ne+d)/pe),re=0;for(let n=i;n<a;++n){let i=n*de-r;for(let r=c;r<l;++r){let a=r*fe-s;for(let o=f;o<O;++o){let s=o*pe-d,c=y*e+b*n+x*r+S*o,l=w*(ee-1-i)+T*(te-1-a)+E*(ne-1-s)+D*t;for(let e=0;e<se;++e){let t=v[c+e],n=C[l+e];re+=t*n}}}}p[m*e+h*n+g*o+_*u+t]=re}}}return n.makeTensorInfo(f.shape,f.dtype,f.values)}const IT={kernelName:it,backendName:`cpu`,kernelFunc:FT},LT={kernelName:`Cos`,backendName:`cpu`,kernelFunc:$(`Cos`,e=>Math.cos(e))},RT={kernelName:at,backendName:`cpu`,kernelFunc:$(at,e=>Math.cosh(e))}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function zT(e){let{inputs:t,backend:n,attrs:r}=e,{image:i,boxes:a,boxInd:o}=t,{cropSize:s,method:c,extrapolationValue:l}=r,[u,d,f,p]=i.shape,m=a.shape[0],[h,g]=s,_=I([m,h,g,p],`float32`),v=n.data.get(a.dataId).values,y=n.data.get(o.dataId).values,b=n.data.get(i.dataId).values,x=k(i.shape),S=k(_.shape);for(let e=0;e<m;e++){let t=e*4,n=v[t],r=v[t+1],i=v[t+2],a=v[t+3],o=y[e];if(o>=u)continue;let s=h>1?(i-n)*(d-1)/(h-1):0,m=g>1?(a-r)*(f-1)/(g-1):0;for(let t=0;t<h;t++){let u=h>1?n*(d-1)+t*s:.5*(n+i)*(d-1);if(u<0||u>d-1)for(let n=0;n<g;n++)for(let r=0;r<p;r++){let i=r+n*S[2]+t*S[1]+e*S[0];_.values[i]=l}else if(c===`bilinear`){let n=Math.floor(u),i=Math.ceil(u),s=u-n;for(let c=0;c<g;c++){let u=g>1?r*(f-1)+c*m:.5*(r+a)*(f-1);if(u<0||u>f-1){for(let n=0;n<p;n++){let r=n+c*S[2]+t*S[1]+e*S[0];_.values[r]=l}continue}let d=Math.floor(u),h=Math.ceil(u),v=u-d;for(let r=0;r<p;r++){let a=r+d*x[2]+n*x[1]+o*x[0],l=b[a];a=r+h*x[2]+n*x[1]+o*x[0];let u=b[a];a=r+d*x[2]+i*x[1]+o*x[0];let f=b[a];a=r+h*x[2]+i*x[1]+o*x[0];let p=b[a],m=l+(u-l)*v,g=f+(p-f)*v;a=r+c*S[2]+t*S[1]+e*S[0],_.values[a]=m+(g-m)*s}}}else for(let n=0;n<g;++n){let i=g>1?r*(f-1)+n*m:.5*(r+a)*(f-1);if(i<0||i>f-1){for(let r=0;r<p;r++){let i=r+n*S[2]+t*S[1]+e*S[0];_.values[i]=l}continue}let s=Math.round(i),c=Math.round(u);for(let r=0;r<p;r++){let i=r+s*x[2]+c*x[1]+o*x[0],a=r+n*S[2]+t*S[1]+e*S[0];_.values[a]=b[i]}}}}return n.makeTensorInfo(_.shape,_.dtype,_.values)}const BT={kernelName:ct,backendName:`cpu`,kernelFunc:zT};
/**
* @license
* Copyright 2022 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function VT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,exclusive:o,reverse:s}=r;Q(i,`cumprod`);let c=Vs([a],i.shape.length),l=i;c!=null&&(l=TC({inputs:{x:i},backend:n,attrs:{perm:c}}));let u=Us(1,i.shape.length)[0];if(u!==l.shape.length-1)throw Error(`backend.cumprod in CPU expects an inner-most axis=${l.shape.length-1} but got axis=${u}`);let d=ei(l.dtype,`int32`),f=de(v(l.shape),d),p=n.data.get(l.dataId).values,m=l.shape[l.shape.length-1],h=s?(e,t)=>e+m-t-1:(e,t)=>e+t;for(let e=0;e<p.length;e+=m)for(let t=0;t<m;t++){let n=h(e,t);if(t===0)f[n]=o?1:p[n];else{let r=h(e,t-1);f[n]=o?p[r]*f[r]:p[n]*f[r]}}let g=n.makeTensorInfo(l.shape,d,f);if(c!=null){let e=Hs(c),t=TC({inputs:{x:g},backend:n,attrs:{perm:e}});return n.disposeIntermediateTensorInfo(g),n.disposeIntermediateTensorInfo(l),t}return g}const HT={kernelName:ot,backendName:`cpu`,kernelFunc:VT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function UT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,exclusive:o,reverse:s}=r;Q(i,`cumsum`);let c=Vs([a],i.shape.length),l=i;c!=null&&(l=TC({inputs:{x:i},backend:n,attrs:{perm:c}}));let u=Us(1,i.shape.length)[0];if(u!==l.shape.length-1)throw Error(`backend.cumsum in CPU expects an inner-most axis=${l.shape.length-1} but got axis=${u}`);let d=ei(l.dtype,`int32`),f=fe(v(l.shape),d),p=n.data.get(l.dataId).values,m=l.shape[l.shape.length-1],h=s?(e,t)=>e+m-t-1:(e,t)=>e+t;for(let e=0;e<p.length;e+=m)for(let t=0;t<m;t++){let n=h(e,t);if(t===0)f[n]=o?0:p[n];else{let r=h(e,t-1);f[n]=o?p[r]+f[r]:p[n]+f[r]}}let g=n.makeTensorInfo(l.shape,d,f);if(c!=null){let e=Hs(c),t=TC({inputs:{x:g},backend:n,attrs:{perm:e}});return n.disposeIntermediateTensorInfo(g),n.disposeIntermediateTensorInfo(l),t}return g}const WT={kernelName:st,backendName:`cpu`,kernelFunc:UT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function GT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,weights:a}=t,{size:o,binaryOutput:s}=r;if(i.shape.length===1){let e=n.data.get(i.dataId).values,t=n.data.get(a.dataId).values,r=KS(e,t,a.dtype,a.shape,o);return n.makeTensorInfo([o],a.dtype,r)}if(i.shape.length===2){let e=qS(n.bufferSync(i),n.bufferSync(a),o,s);return n.makeTensorInfo(e.shape,a.dtype,e.values)}throw Error(`Error in denseBincount: input must be at most rank 2, but got rank${i.shape.length}.`)}const KT={kernelName:lt,backendName:`cpu`,kernelFunc:GT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function qT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockSize:a,dataFormat:o}=r;h(o===`NHWC`,()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${o}`);let s=i.shape[0],c=i.shape[1],l=i.shape[2],u=i.shape[3],d=c*a,f=l*a,p=u/(a*a),m=n.data.get(i.dataId).values,g=new Float32Array(s*d*f*p),_=0;for(let e=0;e<s;++e)for(let t=0;t<d;++t){let n=Math.floor(t/a),r=t%a;for(let t=0;t<f;++t){let i=Math.floor(t/a),o=t%a,s=(r*a+o)*p;for(let t=0;t<p;++t){let r=t+s+u*(i+l*(n+c*e));g[_++]=m[r]}}}return n.makeTensorInfo([s,d,f,p],i.dtype,g)}const JT={kernelName:`DepthToSpace`,backendName:`cpu`,kernelFunc:qT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function YT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a}=t,{strides:o,pad:s,dilations:c,dimRoundingMode:l}=r;Q([i,a],`depthwiseConv2DNative`);let u=k(i.shape),d=k(a.shape),f=c;f??=[1,1],h(io(o,f),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${o} and dilations '${f}'`);let p=Ka(i.shape,a.shape,o,f,s,l,!0),{filterHeight:m,filterWidth:g,dilationHeight:_,dilationWidth:v,padInfo:y}=p,b=y.left,x=y.top,S=p.outChannels/p.inChannels,C=new Br(p.outShape,i.dtype),w=n.data.get(i.dataId).values,T=n.data.get(a.dataId).values,E=C.values;for(let e=0;e<p.batchSize;++e){let t=e*u[0],n=e*C.strides[0];for(let e=0;e<p.outHeight;++e){let r=n+e*C.strides[1],i=e*p.strideHeight-x;for(let e=0;e<m;++e){let n=i+e*_;if(n<0||n>=p.inHeight)continue;let a=e*d[0],o=t+n*u[1];for(let e=0;e<p.outWidth;++e){let t=r+e*C.strides[2],n=e*p.strideWidth-b;for(let e=0;e<g;++e){let r=n+e*v;if(r<0||r>=p.inWidth)continue;let i=a+e*d[1],s=o+r*p.inChannels,c=t,l=i;for(let e=0;e<p.inChannels;++e){let t=w[s+e];for(let e=0;e<S;++e)E[c+e]+=t*T[l+e];c+=S,l+=S}}}}}}return n.makeTensorInfo(C.shape,C.dtype,C.values)}const XT={kernelName:ut,backendName:`cpu`,kernelFunc:YT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ZT(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,dy:a}=t,{strides:o,dilations:s,pad:c,dimRoundingMode:l,filterShape:u}=r;Q([i,a],`depthwiseConv2dNativeBackpropFilter`);let d=Ka(i.shape,u,o,s,c,l,!0),{strideHeight:f,strideWidth:p,filterHeight:m,filterWidth:h}=d,g=new Br(d.filterShape,`float32`),_=d.padInfo.left,v=d.padInfo.top,y=d.outChannels/d.inChannels,b=n.data.get(i.dataId).values,x=new Br(i.shape,i.dtype,b),S=n.data.get(a.dataId).values,C=new Br(a.shape,a.dtype,S);for(let e=0;e<m;++e){let t=Math.max(0,Math.ceil((v-e)/f)),n=Math.min(d.outHeight,(d.inHeight+v-e)/f);for(let r=0;r<h;++r){let i=Math.max(0,Math.ceil((_-r)/p)),a=Math.min(d.outWidth,(d.inWidth+_-r)/p);for(let o=0;o<d.outChannels;++o){let s=Math.trunc(o/y),c=o%y,l=0;for(let c=0;c<d.batchSize;++c)for(let u=t;u<n;++u){let t=e+u*f-v;for(let e=i;e<a;++e){let n=r+e*p-_;l+=x.get(c,t,n,s)*C.get(c,u,e,o)}}g.set(l,e,r,s,c)}}}return n.makeTensorInfo(g.shape,g.dtype,g.values)}const QT={kernelName:dt,backendName:`cpu`,kernelFunc:ZT};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function $T(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,filter:a}=t,{strides:o,dilations:s,pad:c,dimRoundingMode:l,inputShape:u}=r;Q([i,a],`depthwiseConv2DNativeBackpropInput`);let d=k(i.shape),f=k(a.shape),p=Ka(u,a.shape,o,s,c,l,!0),m=new Br(p.inShape,`float32`),h=m.values,[g,_,v]=m.strides,y=n.data.get(i.dataId).values,[b,x,S]=d,C=n.data.get(a.dataId).values,[w,T,E]=f,{batchSize:D,filterHeight:O,filterWidth:ee,inChannels:te,inHeight:ne,inWidth:re,outChannels:ie,outHeight:ae,outWidth:oe,strideHeight:se,strideWidth:ce}=p,le=O-1-p.padInfo.top,ue=ee-1-p.padInfo.left,de=ie/te;for(let e=0;e<D;++e)for(let t=0;t<te;++t)for(let n=0;n<ne;++n){let r=n-le,i=Math.max(0,Math.ceil(r/se)),a=Math.min(ae,(O+r)/se);for(let o=0;o<re;++o){let s=o-ue,c=Math.max(0,Math.ceil(s/ce)),l=Math.min(oe,(ee+s)/ce),u=0;for(let n=i;n<a;++n){let i=n*se-r;for(let r=c;r<l;++r){let a=r*ce-s,o=b*e+x*n+S*r,c=w*(O-1-i)+T*(ee-1-a)+E*t;for(let e=0;e<de;++e){let n=y[o+(t*de+e)],r=C[c+e];u+=n*r}}}h[g*e+_*n+v*o+t]=u}}return n.makeTensorInfo(m.shape,m.dtype,m.values)}const eE={kernelName:ft,backendName:`cpu`,kernelFunc:$T};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function tE(e){let{inputs:t,backend:n}=e,{x:r}=t,i=v(r.shape),a=n.data.get(r.dataId).values,o=I([i,i],r.dtype),s=o.values;for(let e=0;e<a.length;e++)s[e*i+e]=a[e];let c=[...r.shape,...r.shape];return n.makeTensorInfo(c,o.dtype,o.values)}const nE={kernelName:`Diag`,backendName:`cpu`,kernelFunc:tE},rE={kernelName:pt,backendName:`cpu`,kernelFunc:({inputs:e,backend:t,attrs:n})=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{x:r,filter:i}=e,{strides:a,pad:o,dilations:s}=n,c=t,l=c.data.get(r.dataId).values,u=r.shape.length,d=c.data.get(i.dataId).values,f=i.shape.length,{batchSize:p,inHeight:m,inWidth:h,inChannels:g,outHeight:_,outWidth:y,padInfo:b,strideHeight:x,strideWidth:S,filterHeight:C,filterWidth:w,dilationHeight:T,dilationWidth:D,outShape:O}=Ua(r.shape,i.shape,a,o,`NHWC`,s),ee=v(O),te=O.length,ne=E(r.dtype,ee);for(let e=0;e<p;++e)for(let t=0;t<_;++t){let n=t*x-b.top;for(let a=0;a<y;++a){let o=a*S-b.left;for(let s=0;s<g;++s){let c=-(2**53-1);for(let t=0;t<C;++t){let a=n+t*T;if(a>=0&&a<m)for(let n=0;n<w;++n){let p=o+n*D;if(p>=0&&p<h){let o=he([e,a,p,s],u,k(r.shape)),m=he([t,n,s],f,k(i.shape)),h=l[o]+d[m];h>c&&(c=h)}}}let p=he([e,t,a,s],te,k(O));ne[p]=c}}}return{dataId:c.write(Cr(ne,r.dtype),O,r.dtype),shape:O,dtype:r.dtype}}},iE={kernelName:ht,backendName:`cpu`,kernelFunc:({inputs:e,backend:t,attrs:n})=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{x:r,filter:i,dy:a}=e,{strides:o,pad:s,dilations:c}=n,l=t,u=le(r.shape,l.data.get(r.dataId).values),d=le(i.shape,l.data.get(i.dataId).values),{batchSize:f,inHeight:p,inWidth:m,inChannels:g,outHeight:_,outWidth:v,padInfo:y,strideHeight:b,strideWidth:x,filterHeight:S,filterWidth:C,dilationHeight:w,dilationWidth:T,outShape:E}=Ua(r.shape,i.shape,o,s,`NHWC`,c);h(a.rank===E.length,()=>`Error in ${ht}, dy must have the same rank as output ${E.length}, but got ${a.rank}`);let D=le(E,l.data.get(a.dataId).values),O=pe(i.shape,i.dtype);for(let e=0;e<f;++e)for(let t=0;t<_;++t){let n=t*b-y.top;for(let r=0;r<v;++r){let i=r*x-y.left;for(let a=0;a<g;++a){let o=-(2**53-1),s=0,c=0;for(let t=0;t<S;++t){let r=n+t*w;if(r>=0&&r<p)for(let n=0;n<C;++n){let l=i+n*T;if(l>=0&&l<m){let i=u[e][r][l][a]+d[t][n][a];i>o&&(o=i,s=t,c=n)}}}O[s][c][a]+=D[e][t][r][a]}}}return{dataId:l.write(Cr(O,r.dtype),i.shape,i.dtype),shape:i.shape,dtype:i.dtype}}},aE={kernelName:mt,backendName:`cpu`,kernelFunc:({inputs:e,backend:t,attrs:n})=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{x:r,filter:i,dy:a}=e,{strides:o,pad:s,dilations:c}=n,l=t,u=le(r.shape,l.data.get(r.dataId).values),d=le(i.shape,l.data.get(i.dataId).values),{batchSize:f,inHeight:p,inWidth:m,inChannels:g,outHeight:_,outWidth:v,padInfo:y,strideHeight:b,strideWidth:x,filterHeight:S,filterWidth:C,dilationHeight:w,dilationWidth:T,outShape:E}=Ua(r.shape,i.shape,o,s,`NHWC`,c);h(a.rank===E.length,()=>`Error in ${mt}, dy must have the same rank as output ${E.length}, but got ${a.rank}`);let D=le(E,l.data.get(a.dataId).values),O=pe(r.shape,r.dtype);for(let e=0;e<f;++e)for(let t=0;t<_;++t){let n=t*b-y.top;for(let r=0;r<v;++r){let i=r*x-y.left;for(let a=0;a<g;++a){let o=-(2**53-1),s=n<0?0:n,c=i<0?0:i;for(let t=0;t<S;++t){let r=n+t*w;if(r>=0&&r<p)for(let n=0;n<C;++n){let l=i+n*T;if(l>=0&&l<m){let i=u[e][r][l][a]+d[t][n][a];i>o&&(o=i,s=r,c=l)}}}O[e][s][c][a]+=D[e][t][r][a]}}}return{dataId:l.write(Cr(O,r.dtype),r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};
/**
* @license
* Copyright 2023 Google LLC.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function oE(e){let{inputs:t,backend:n,attrs:r}=e,{image:i}=t,{canvas:a,options:o}=r,{contextOptions:s,imageOptions:c}=o||{},l=c?.alpha||1,u=s?.contextType||`2d`;if(u!==`2d`)throw Error(`Context type ${s.contextType} is not supported by the CPU backend.`);let d=a.getContext(u,s?.contextAttributes||{});if(d==null)throw Error(`Could not get the context with ${u} type.`);let[f,p]=i.shape.slice(0,2),m=i.shape.length===2?1:i.shape[2],h=n.data.get(i.dataId).values,g=i.dtype===`float32`?255:1,_=new Uint8ClampedArray(p*f*4);for(let e=0;e<f*p;++e){let t=[0,0,0,255*l];for(let n=0;n<m;n++){let r=h[e*m+n];if(i.dtype===`float32`){if(r<0||r>1)throw Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${r}.`)}else if(i.dtype===`int32`&&(r<0||r>255))throw Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${r}.`);m===1?(t[0]=r*g,t[1]=r*g,t[2]=r*g):t[n]=r*g}let n=e*4;_[n+0]=Math.round(t[0]),_[n+1]=Math.round(t[1]),_[n+2]=Math.round(t[2]),_[n+3]=Math.round(t[3])}a.width=p,a.height=f;let v=new ImageData(_,p,f);return d.putImageData(v,0,0),i}const sE={kernelName:`Draw`,backendName:`cpu`,kernelFunc:oE};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function cE(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;Q(i,`sum`);let s;s=i.dtype===`bool`?BS({inputs:{x:i},backend:n,attrs:{dtype:`int32`}}):FS({inputs:{x:i},backend:n});let c=s.shape.length,l=C(a,s.shape),u=Vs(l,c),d=l,f=s;u!=null&&(f=TC({inputs:{x:s},backend:n,attrs:{perm:u}}),d=Us(d.length,c)),Bs(`sum`,d,f.shape.length);let[p,m]=Rs(f.shape,d),h=PS(n,p,ei(f.dtype,`int32`)),g=v(m),_=n.data.get(h.dataId).values,y=n.data.get(f.dataId).values;for(let e=0;e<_.length;++e){let t=e*g,n=0;for(let e=0;e<g;++e)n+=y[t+e];_[e]=n}if(o){let e=zs(h.shape,l),t=h;h=Aw({inputs:{x:h},backend:n,attrs:{shape:e}}),n.disposeIntermediateTensorInfo(t)}return n.disposeIntermediateTensorInfo(s),u!=null&&n.disposeIntermediateTensorInfo(f),h}const lE={kernelName:`Sum`,backendName:`cpu`,kernelFunc:cE};
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function uE(e){let{inputs:t,backend:n,attrs:r}=e,{equation:i}=r,a=t,{allDims:o,summedDims:s,idDims:c}=tp(i,a.length);rp(o.length,c,a);let{path:l,steps:u}=ip(s,c),d=u.length,f=null,p=o.length,m=[];for(let e=0;e<d;++e){for(let t of u[e]){let{permutationIndices:e,expandDims:r}=np(p,c[t]),i;ap(e)?i=a[t]:(i=TC({inputs:{x:a[t]},backend:n,attrs:{perm:e}}),m.push(i));let o=i.shape.slice();for(let e=0;e<r.length;++e)o.splice(r[e],0,1);y(i.shape,o)||(i=Aw({inputs:{x:i},backend:n,attrs:{shape:o}}),m.push(i)),f===null?f=i:(f=vC({inputs:{a:i,b:f},backend:n}),m.push(f))}e<d-1&&(l[e]>=0&&(f=cE({inputs:{x:f},backend:n,attrs:{axis:l[e]-(o.length-p),keepDims:!1}}),m.push(f)),p--)}for(let e of m)e!==f&&n.disposeIntermediateTensorInfo(e);return f}const dE={kernelName:_t,backendName:`cpu`,kernelFunc:uE};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function fE(e){let{inputs:t,backend:n}=e,{dy:r,y:i}=t;Q([r,i],`eluGrad`);let a=new Float32Array(v(i.shape)),o=n.data.get(i.dataId).values,s=n.data.get(r.dataId).values;for(let e=0;e<o.length;++e){let t=o[e];t>=0?a[e]=s[e]:a[e]=s[e]*(t+1)}return n.makeTensorInfo(i.shape,`float32`,a)}const pE={kernelName:vt,backendName:`cpu`,kernelFunc:fE},mE={kernelName:`Erf`,backendName:`cpu`,kernelFunc:$(`Erf`,e=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let t=Math.sign(e),n=Math.abs(e),r=1/(1+.3275911*n);return t*(1-((((1.061405429*r+-1.453152027)*r+1.421413741)*r+-.284496736)*r+.254829592)*r*Math.exp(-n*n))})};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function hE(e){let{inputs:t,backend:n,attrs:r}=e,{input:i}=t,{dim:a}=r,o=i.shape.length,s=i.shape.slice(),c=a;return a<0&&(h(-(o+1)<=a,()=>`Axis must be in the interval [${-(o+1)}, ${o}]`),c=o+a+1),s.splice(c,0,1),Aw({inputs:{x:i},backend:n,attrs:{shape:s}})}const gE={kernelName:bt,backendName:`cpu`,kernelFunc:hE},_E=HS(gt,jS((e,t)=>e/t)),vE={kernelName:gt,backendName:`cpu`,kernelFunc:_E}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function yE(e,t,n){let r=e.shape,i=r[0],a=r[1],o=n.data.get(e.dataId),s=o.complexTensorInfos.real,c=o.complexTensorInfos.imag,l=[i,a],u=v(l),d=T(`float32`,u),f=T(`float32`,u);for(let e=0;e<i;e++){let r=ZC({inputs:{x:s},backend:n,attrs:{begin:[e,0],size:[1,a]}}),i=ZC({inputs:{x:c},backend:n,attrs:{begin:[e,0],size:[1,a]}}),o=MS({inputs:{real:r,imag:i},backend:n}),{real:l,imag:u}=bE(o,t,n),p=Kf(l,u);for(let t=0;t<a;t++){let n=Xf(p,t);d[e*a+t]=n.real,f[e*a+t]=n.imag}n.disposeIntermediateTensorInfo(r),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(o)}let p=n.makeTensorInfo(l,`float32`,d),m=n.makeTensorInfo(l,`float32`,f),h=MS({inputs:{real:p,imag:m},backend:n});return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),h}function bE(e,t,n){let r=v(e.shape),i=n.data.get(e.dataId),a=n.data.get(i.complexTensorInfos.real.dataId).values,o=n.data.get(i.complexTensorInfos.imag.dataId).values;if(xE(r)){let i=SE(a,o,r,t,n),s=[e.shape[0],e.shape[1]];if(t){let e=n.makeTensorInfo(s,`float32`,i.real),t=n.makeTensorInfo(s,`float32`,i.imag),a=n.makeTensorInfo([],`float32`,xr(r,`float32`)),o=FS({inputs:{x:a},backend:n}),c=vE.kernelFunc({inputs:{a:e,b:a},backend:n}),l=vE.kernelFunc({inputs:{a:t,b:o},backend:n}),u=n.data.get(c.dataId).values,d=n.data.get(l.dataId).values;return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(a),n.disposeIntermediateTensorInfo(o),n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(l),{real:u,imag:d}}return i}return qf(CE(Kf(a,o),r,t))}function xE(e){return!(e&e-1)}function SE(e,t,n,r,i){if(n===1)return{real:e,imag:t};let a=Kf(e,t),o=n/2,s=Jf(a),c=s.real,l=s.imag,u=[c.length],d=i.makeTensorInfo(u,`float32`,c),f=i.makeTensorInfo(u,`float32`,l),p=MS({inputs:{real:d,imag:f},backend:i}),m=Yf(a),h=m.real,g=m.imag,_=[h.length],v=i.makeTensorInfo(_,`float32`,h),y=i.makeTensorInfo(_,`float32`,g),b=MS({inputs:{real:v,imag:y},backend:i}),x=SE(c,l,o,r,i),S=x.real,C=x.imag,w=[S.length],T=i.makeTensorInfo(w,`float32`,S),E=i.makeTensorInfo(w,`float32`,C),D=MS({inputs:{real:T,imag:E},backend:i}),O=SE(h,g,o,r,i),ee=O.real,te=O.imag,ne=[ee.length],re=i.makeTensorInfo(ne,`float32`,ee),ie=i.makeTensorInfo(ne,`float32`,te),ae=MS({inputs:{real:re,imag:ie},backend:i}),oe=Qf(n,r),se=[oe.real.length],k=i.makeTensorInfo(se,`float32`,oe.real),ce=i.makeTensorInfo(se,`float32`,oe.imag),le=MS({inputs:{real:k,imag:ce},backend:i}),ue=vC({inputs:{a:le,b:ae},backend:i}),de=WS({inputs:{a:D,b:ue},backend:i}),fe=dw({inputs:{a:D,b:ue},backend:i}),pe=LS({inputs:{input:de},backend:i}),me=LS({inputs:{input:fe},backend:i}),he=xT({inputs:{input:de},backend:i}),ge=xT({inputs:{input:fe},backend:i}),_e=CT({inputs:[pe,me],backend:i,attrs:{axis:0}}),ve=CT({inputs:[he,ge],backend:i,attrs:{axis:0}}),ye=i.data.get(_e.dataId).values,be=i.data.get(ve.dataId).values;return i.disposeIntermediateTensorInfo(d),i.disposeIntermediateTensorInfo(f),i.disposeIntermediateTensorInfo(p),i.disposeIntermediateTensorInfo(v),i.disposeIntermediateTensorInfo(y),i.disposeIntermediateTensorInfo(b),i.disposeIntermediateTensorInfo(T),i.disposeIntermediateTensorInfo(E),i.disposeIntermediateTensorInfo(D),i.disposeIntermediateTensorInfo(re),i.disposeIntermediateTensorInfo(ie),i.disposeIntermediateTensorInfo(ae),i.disposeIntermediateTensorInfo(k),i.disposeIntermediateTensorInfo(ce),i.disposeIntermediateTensorInfo(le),i.disposeIntermediateTensorInfo(ue),i.disposeIntermediateTensorInfo(de),i.disposeIntermediateTensorInfo(fe),i.disposeIntermediateTensorInfo(pe),i.disposeIntermediateTensorInfo(he),i.disposeIntermediateTensorInfo(me),i.disposeIntermediateTensorInfo(ge),i.disposeIntermediateTensorInfo(_e),i.disposeIntermediateTensorInfo(ve),{real:ye,imag:be}}function CE(e,t,n){let r=new Float32Array(t*2);for(let i=0;i<t;i++){let a=0,o=0;for(let r=0;r<t;r++){let s=$f(i*r,t,n),c=Xf(e,r);a+=c.real*s.real-c.imag*s.imag,o+=c.real*s.imag+c.imag*s.real}n&&(a/=t,o/=t),Zf(r,a,o,i)}return r}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function wE(e){let{inputs:t,backend:n}=e,{input:r}=t,i=v(r.shape),a=r.shape[r.shape.length-1],o=i/a,s=Aw({inputs:{x:r},backend:n,attrs:{shape:[o,a]}}),c=yE(s,!1,n),l=Aw({inputs:{x:c},backend:n,attrs:{shape:r.shape}});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(c),l}const TE={kernelName:`FFT`,backendName:`cpu`,kernelFunc:wE};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function EE(e){let{backend:t,attrs:n}=e,{shape:r,value:i,dtype:a}=n,o=a||oe(i),s=E(o,v(r));return OE(s,i,o),t.makeTensorInfo(r,o,s)}const DE={kernelName:St,backendName:`cpu`,kernelFunc:EE};function OE(e,t,n){e.fill(t)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const kE={kernelName:Ct,backendName:`cpu`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{image:r}=e,i=n,a=T(r.dtype,v(r.shape)),[o,s,c,l]=r.shape,u=i.data.get(r.dataId).values;for(let e=0;e<o;e++){let t=e*c*s*l;for(let e=0;e<s;e++){let n=c*l*e;for(let e=0;e<c;e++){let r=e*l;for(let i=0;i<l;i++){let o=Math.round(c-e-1),s=t+n+r+i,d=u[s];if(o>=0&&o<c){let e=o*l;d=u[t+n+e+i]}a[s]=d}}}}return{dataId:i.write(a,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function AE(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a,bias:o,preluActivationWeights:s}=t,{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f,activation:p,leakyreluAlpha:m}=r,h=TT({inputs:{x:i,filter:a},backend:n,attrs:{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f}});if(o){let e=h;if(u===`NCHW`&&o.shape.length===1&&o.shape[0]!==1){let e=Aw({inputs:{x:o},backend:n,attrs:{shape:[o.shape[0],1,1]}});h=WS({inputs:{a:h,b:e},backend:n}),n.disposeIntermediateTensorInfo(e)}else h=WS({inputs:{a:h,b:o},backend:n});n.disposeIntermediateTensorInfo(e)}if(p){let e=h;if(u===`NCHW`&&p===`prelu`&&s.shape.length===1&&s.shape[0]!==1){let e=Aw({inputs:{x:s},backend:n,attrs:{shape:[s.shape[0],1,1]}});h=kw(n,h,p,e,m),n.disposeIntermediateTensorInfo(e)}else h=kw(n,h,p,s,m);n.disposeIntermediateTensorInfo(e)}return h}const jE={kernelName:Kn,backendName:`cpu`,kernelFunc:AE};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ME(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,filter:a,bias:o,preluActivationWeights:s}=t,{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f,activation:p,leakyreluAlpha:m}=r,h=YT({inputs:{x:i,filter:a},backend:n,attrs:{strides:c,pad:l,dataFormat:u,dilations:d,dimRoundingMode:f}});if(o){let e=h;h=WS({inputs:{a:h,b:o},backend:n}),n.disposeIntermediateTensorInfo(e)}if(p){let e=h;h=kw(n,h,p,s,m),n.disposeIntermediateTensorInfo(e)}return h}const NE={kernelName:`FusedDepthwiseConv2D`,backendName:`cpu`,kernelFunc:ME};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function PE(e){let{inputs:t,backend:n}=e,{params:r,indices:i}=t,a=v(r.shape),o=i.shape,s=o[o.length-1],[c,l,u,d]=xf(r,i);if(l===0)return n.makeTensorInfo(c,r.dtype,[]);let f=n.data.get(i.dataId).values,p=oC(f,n.bufferSync(r),r.dtype,l,s,u,d,r.shape,a);return n.makeTensorInfo(c,r.dtype,p.values)}const FE={kernelName:`GatherNd`,backendName:`cpu`,kernelFunc:PE};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function IE(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,indices:a}=t,{axis:o,batchDims:s}=r;Q([i,a],`gatherV2`);let c=C(o,i.shape)[0],l=n.data.get(a.dataId).values,u=i.shape[c];for(let e=0;e<l.length;++e){let t=l[e];h(t<=u-1&&t>=0,()=>`GatherV2: the index value ${t} is not in [0, ${u-1}]`)}let d=s;s??(d=0);let f=v(a.shape),p=bp(i,a,c,d),m=Aw({inputs:{x:i},backend:n,attrs:{shape:[p.batchSize,p.outerSize,p.dimSize,p.sliceSize]}}),g=Aw({inputs:{x:a},backend:n,attrs:{shape:[p.batchSize,f/p.batchSize]}}),_=[p.batchSize,p.outerSize,f/p.batchSize,p.sliceSize],y=n.bufferSync(g),b=sC(n.bufferSync(m),y,_);return n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(g),n.makeTensorInfo(p.outputShape,b.dtype,b.values)}const LE={kernelName:Dt,backendName:`cpu`,kernelFunc:IE};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function RE(e){let{inputs:t,backend:n}=e,{input:r}=t,i=v(r.shape),a=r.shape[r.shape.length-1],o=i/a,s=Aw({inputs:{x:r},backend:n,attrs:{shape:[o,a]}}),c=yE(s,!0,n),l=Aw({inputs:{x:c},backend:n,attrs:{shape:r.shape}});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(c),l}const zE={kernelName:`IFFT`,backendName:`cpu`,kernelFunc:RE},BE={kernelName:Mt,backendName:`cpu`,kernelFunc:$(Mt,e=>+!!Number.isFinite(e),`bool`)},VE={kernelName:Nt,backendName:`cpu`,kernelFunc:$(Nt,e=>+(Math.abs(e)===1/0),`bool`)},HE={kernelName:Pt,backendName:`cpu`,kernelFunc:$(Pt,e=>+!!Number.isNaN(e),`bool`)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function UE(e){let{backend:t,attrs:n}=e,{start:r,stop:i,num:a}=n,o=fC(r,i,a);return t.makeTensorInfo([o.length],`float32`,o)}const WE={kernelName:`LinSpace`,backendName:`cpu`,kernelFunc:UE},GE={kernelName:Rt,backendName:`cpu`,kernelFunc:$(Rt,e=>Math.log1p(e))},KE={kernelName:zt,backendName:`cpu`,kernelFunc:HS(zt,jS((e,t)=>e&&t),null,`bool`)},qE={kernelName:Bt,backendName:`cpu`,kernelFunc:$(Bt,e=>+!e,`bool`)},JE={kernelName:Vt,backendName:`cpu`,kernelFunc:HS(Vt,jS((e,t)=>e||t),null,`bool`)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function YE(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{depthRadius:a,bias:o,alpha:s,beta:c}=r;Q(i,`LRN`);let l=i.shape[3],u=l-1,d=n.data.get(i.dataId).values,f=v(i.shape),p=new Float32Array(f);function m(e){let t=e%l,n=e-t+Math.max(0,t-a),r=e-t+Math.min(t+a,u),i=0;for(;n<=r;n++){let e=d[n];i+=e*e}return i}for(let e=0;e<f;e++){let t=m(e),n=d[e]*(o+s*t)**+-c;p[e]=n}return n.makeTensorInfo(i.shape,i.dtype,p)}const XE={kernelName:`LRN`,backendName:`cpu`,kernelFunc:YE};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ZE(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,y:a,dy:o}=t,{depthRadius:s,bias:c,alpha:l,beta:u}=r;Q(o,`LRNGrad`);let d=v(o.shape),f=o.shape[3],p=n.data.get(o.dataId).values,m=n.data.get(i.dataId).values,h=n.data.get(a.dataId).values,g=new Float32Array(d),_=d;for(let e=0;e<_;e++){let t=e%f,n=e-t+Math.max(0,t-s),r=e-t+Math.min(f,t+s+1),i=0;for(let e=n;e<r;e++)i+=m[e]**2;i=l*i+c;for(let t=n;t<r;t++){let n=-2*l*u*m[t]*h[e]/i;e===t&&(n+=i**+-u),n*=p[e],g[t]+=n}}return n.makeTensorInfo(o.shape,i.dtype,g)}const QE={kernelName:Ht,backendName:`cpu`,kernelFunc:ZE};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function $E(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{reductionIndices:a,keepDims:o}=r,s=n,c=i.shape,l=c.length,u=C(a,c),d=u,f=Vs(d,l),p=s.data.get(i.dataId).values;if(f!=null){let e=Array(l);for(let t=0;t<e.length;t++)e[t]=c[f[t]];p=wC(p,c,i.dtype,f,e),d=Us(d.length,l),c=e}Q(i,`max`),Bs(`max`,d,l);let[m,h]=Rs(c,d),g=v(h),_=mC(p,g,m,i.dtype),y=s.write(_,m,i.dtype),b=m;return o&&(b=zs(m,u)),{dataId:y,shape:b,dtype:i.dtype}}const eD={kernelName:`Max`,backendName:`cpu`,kernelFunc:$E};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function tD(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t;Q(i,`maxPool`);let{filterSize:a,strides:o,pad:s,dimRoundingMode:c}=r;h(io(o,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${o} and dilations '1'`);let l=Wa(i.shape,a,o,1,s,c),u;if(l.filterWidth===1&&l.filterHeight===1&&y(l.inShape,l.outShape))u=FS({inputs:{x:i},backend:n});else{let e=n.data.get(i.dataId).values,t=k(i.shape),r=$w(e,i.shape,i.dtype,t,l,`max`);u=n.makeTensorInfo(l.outShape,i.dtype,r.values)}return u}const nD={kernelName:Wt,backendName:`cpu`,kernelFunc:tD};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function rD(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{filterSize:a,strides:o,pad:s,dimRoundingMode:c,dataFormat:l}=r;Q(i,`maxPool3d`);let u=Ga(i.shape,a,o,1,s,c,l),d=n.data.get(i.dataId).values,f=tT(d,i.shape,i.dtype,k(i.shape),u,`max`);return n.makeTensorInfo(f.shape,`float32`,f.values)}const iD={kernelName:Kt,backendName:`cpu`,kernelFunc:rD};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function aD(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a}=t,{filterSize:o,strides:s,pad:c,dimRoundingMode:l}=r;Q([i,a],`maxPool3DGrad`);let u=Ga(a.shape,o,s,1,c,l),d=nT(n.bufferSync(a),u),f=u.strideDepth,p=u.strideHeight,m=u.strideWidth,h=u.dilationDepth,g=u.dilationHeight,_=u.dilationWidth,v=u.effectiveFilterDepth,y=u.effectiveFilterHeight,b=u.effectiveFilterWidth,x=v-1-u.padInfo.front,S=b-1-u.padInfo.left,C=y-1-u.padInfo.top,w=I(a.shape,`float32`),T=n.bufferSync(i);for(let e=0;e<u.batchSize;++e)for(let t=0;t<u.inChannels;++t)for(let n=0;n<u.inDepth;++n)for(let r=0;r<u.inHeight;++r)for(let i=0;i<u.inWidth;++i){let a=n-x,o=r-C,s=i-S,c=0;for(let n=0;n<v;n+=h){let r=(a+n)/f;if(!(r<0||r>=u.outDepth||Math.floor(r)!==r))for(let i=0;i<y;i+=g){let a=(o+i)/p;if(!(a<0||a>=u.outHeight||Math.floor(a)!==a))for(let o=0;o<b;o+=_){let l=(s+o)/m;if(l<0||l>=u.outWidth||Math.floor(l)!==l)continue;let f=+(v*y*b-1-d.get(e,r,a,l,t)===n*y*b+i*b+o);if(f===0)continue;let p=T.get(e,r,a,l,t);c+=p*f}}}w.set(c,e,n,r,i,t)}return n.makeTensorInfo(w.shape,w.dtype,w.values)}const oD={kernelName:qt,backendName:`cpu`,kernelFunc:aD};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function sD(e){let{inputs:t,backend:n,attrs:r}=e,{dy:i,input:a,output:o}=t,s=a;Q([a,o],`maxPoolGrad`);let{filterSize:c,strides:l,pad:u,dimRoundingMode:d}=r,f=Wa(s.shape,c,l,1,u,d),p=n.data.get(s.dataId).values,m=I(f.outShape,s.dtype,eT(p,s.shape,s.dtype,f).values),h=f.strideHeight,g=f.strideWidth,_=f.dilationHeight,v=f.dilationWidth,y=f.effectiveFilterHeight,b=f.effectiveFilterWidth,x=b-1-f.padInfo.left,S=y-1-f.padInfo.top,C=I(s.shape,`float32`),w=n.data.get(i.dataId).values,T=I(i.shape,`float32`,w);for(let e=0;e<f.batchSize;++e)for(let t=0;t<f.inChannels;++t)for(let n=0;n<f.inHeight;++n)for(let r=0;r<f.inWidth;++r){let i=n-S,a=r-x,o=0;for(let n=0;n<y;n+=_){let r=(i+n)/h;if(!(r<0||r>=f.outHeight||Math.floor(r)!==r))for(let i=0;i<b;i+=v){let s=(a+i)/g;if(s<0||s>=f.outWidth||Math.floor(s)!==s)continue;let c=+(y*b-1-m.get(e,r,s,t)===n*b+i);if(c===0)continue;let l=T.get(e,r,s,t);o+=l*c}}C.set(o,e,n,r,t)}return n.makeTensorInfo(C.shape,C.dtype,C.values)}const cD={kernelName:Gt,backendName:`cpu`,kernelFunc:sD};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function lD(e,t,n,r,i){let a=$w(e,t,n,k(t),i,`max`),o=eT(e,t,n,i,!0,r);return[a.values,o.values]}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const uD={kernelName:`MaxPoolWithArgmax`,backendName:`cpu`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{let{x:r}=e,{filterSize:i,strides:a,pad:o,includeBatchInIndex:s}=t,c=n;Q(r,`MaxPoolWithArgmax`);let l=c.data.get(r.dataId).values,u=Wa(r.shape,i,a,[1,1],o),[d,f]=lD(l,r.shape,r.dtype,s,u),p=c.write(d,u.outShape,r.dtype),m=c.write(f,u.outShape,r.dtype);return[{dataId:p,shape:u.outShape,dtype:r.dtype},{dataId:m,shape:u.outShape,dtype:`int32`}]}};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function dD(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r,s=C(a,i.shape),c=Rs(i.shape,s)[1],l=v(c),u=[],d=n.makeTensorInfo([],`float32`,new Float32Array([l]));u.push(d);let f=BS({inputs:{x:i},backend:n,attrs:{dtype:`float32`}});u.push(f);let p=_E({inputs:{a:f,b:d},backend:n});u.push(p);let m=cE({inputs:{x:p},backend:n,attrs:{axis:a,keepDims:o}});return u.forEach(e=>n.disposeIntermediateTensorInfo(e)),m}const fD={kernelName:Jt,backendName:`cpu`,kernelFunc:dD};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function pD(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{axis:a,keepDims:o}=r;Q(i,`min`);let s=C(a,i.shape),c=s,l=Vs(c,i.shape.length),u=i;l!=null&&(u=TC({inputs:{x:i},backend:n,attrs:{perm:l}}),c=Us(c.length,i.shape.length)),Bs(`min`,c,u.shape.length);let[d,f]=Rs(u.shape,c),p=v(f),m=fe(v(d),u.dtype),h=n.data.get(u.dataId).values;for(let e=0;e<m.length;++e){let t=e*p,n=h[t];for(let e=0;e<p;++e){let r=h[t+e];(Number.isNaN(r)||r<n)&&(n=r)}m[e]=n}l!=null&&n.disposeIntermediateTensorInfo(u);let g=n.makeTensorInfo(d,u.dtype,m);if(o){let e=zs(d,s),t=Aw({inputs:{x:g},backend:n,attrs:{shape:e}});return n.disposeIntermediateTensorInfo(g),t}return g}const mD={kernelName:`Min`,backendName:`cpu`,kernelFunc:pD};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function hD(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{paddings:a,mode:o}=r;Q(i,`mirrorPad`);let s=a.map((e,t)=>e[0]+i.shape[t]+e[1]),c=a.map(e=>e[0]),l=a.map((e,t)=>e[0]+i.shape[t]),u=o===`reflect`?0:1,d=n.data.get(i.dataId).values,f=i.shape.length,p=k(i.shape),m=v(s),h=s.length,g=k(s),_=T(i.dtype,m);for(let e=0;e<m;e++){let t=ge(e,h,g);for(let e=0;e<h;e++)t[e]<c[e]?t[e]=c[e]*2-t[e]-u:t[e]>=l[e]&&(t[e]=(l[e]-1)*2-t[e]+u);t=t.map((e,t)=>e-c[t]);let n=he(t,f,p);_[e]=d[n]}return{dataId:n.write(_,s,i.dtype),shape:s,dtype:i.dtype}}const gD={kernelName:Xt,backendName:`cpu`,kernelFunc:hD},_D={kernelName:`Mod`,backendName:`cpu`,kernelFunc:HS(`Mod`,jS(((e,t)=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let n=e%t;return e<0&&t<0||e>=0&&t>=0?n:(n+t)%t})))};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function vD(e){let{inputs:t,backend:n,attrs:r}=e,{logits:i}=t,{dim:a}=r,o=i.shape.length,s=a;if(s===-1&&(s=o-1),s!==o-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${o} and dim was ${s}`);let c=C([s],i.shape),l=$E({inputs:{x:i},backend:n,attrs:{reductionIndices:c,keepDims:!1}}),u=zs(l.shape,c),d=Aw({inputs:{x:l},backend:n,attrs:{shape:u}}),f=dw({inputs:{a:i,b:d},backend:n}),p=tC({inputs:{x:f},backend:n}),m=cE({inputs:{x:p},backend:n,attrs:{axis:c,keepDims:!1}}),h=Aw({inputs:{x:m},backend:n,attrs:{shape:u}}),g=_E({inputs:{a:p,b:h},backend:n});return n.disposeIntermediateTensorInfo(l),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(h),g}const yD={kernelName:Mn,backendName:`cpu`,kernelFunc:vD};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function bD(e){let{inputs:t,backend:n,attrs:r}=e,{logits:i}=t,{numSamples:a,seed:o,normalized:s}=r;Q(i,`multinomial`);let c=s?i:vD({inputs:{logits:i},backend:n,attrs:{dim:-1}}),l=c.shape[0],u=c.shape[1],d=n.data.get(c.dataId).values,f=[l,a],p=fe(v(f),`int32`);for(let e=0;e<l;++e){let t=e*u,n=new Float32Array(u-1);n[0]=d[t];for(let e=1;e<n.length;++e)n[e]=n[e-1]+d[t+e];let r=Dl.alea(o.toString()),i=e*a;for(let e=0;e<a;++e){let t=r();p[i+e]=n.length;for(let r=0;r<n.length;r++)if(t<n[r]){p[i+e]=r;break}}}return s||n.disposeIntermediateTensorInfo(c),n.makeTensorInfo(f,`int32`,p)}const xD={kernelName:`Multinomial`,backendName:`cpu`,kernelFunc:bD},SD=fd
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;function CD(e){let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c}=r;Q(i,`NonMaxSuppression`);let l=n.data.get(i.dataId).values,u=n.data.get(a.dataId).values,{selectedIndices:d}=SD(l,u,o,s,c);return n.makeTensorInfo([d.length],`int32`,new Int32Array(d))}const wD={kernelName:$t,backendName:`cpu`,kernelFunc:CD},TD=pd
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;function ED(e){let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c,padToMaxOutputSize:l}=r;Q(i,`NonMaxSuppressionPadded`);let u=n.data.get(i.dataId).values,d=n.data.get(a.dataId).values,{selectedIndices:f,validOutputs:p}=TD(u,d,o,s,c,l);return[n.makeTensorInfo([f.length],`int32`,new Int32Array(f)),n.makeTensorInfo([],`int32`,new Int32Array([p]))]}const DD={kernelName:en,backendName:`cpu`,kernelFunc:ED},OD=md
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;function kD(e){let{inputs:t,backend:n,attrs:r}=e,{boxes:i,scores:a}=t,{maxOutputSize:o,iouThreshold:s,scoreThreshold:c,softNmsSigma:l}=r;Q(i,`NonMaxSuppressionWithScore`);let u=n.data.get(i.dataId).values,d=n.data.get(a.dataId).values,{selectedIndices:f,selectedScores:p}=OD(u,d,o,s,c,l);return[n.makeTensorInfo([f.length],`int32`,new Int32Array(f)),n.makeTensorInfo([p.length],`float32`,new Float32Array(p))]}const AD={kernelName:tn,backendName:`cpu`,kernelFunc:kD};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function jD(e){let{inputs:t,backend:n,attrs:r}=e,{indices:i}=t,{dtype:a,depth:o,onValue:s,offValue:c}=r;Q(i,`oneHot`);let l=v(i.shape),u=new Float32Array(l*o);u.fill(c);let d=n.data.get(i.dataId).values;for(let e=0;e<l;++e)d[e]>=0&&d[e]<o&&(u[e*o+d[e]]=s);return n.makeTensorInfo([...i.shape,o],a,u)}const MD={kernelName:rn,backendName:`cpu`,kernelFunc:jD};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ND(e){let{inputs:t,backend:n}=e,{x:r}=t;if(r.dtype===`string`)throw Error(`zerosLike is not supported for string tensors`);if(r.dtype===`complex64`){let e=LS({inputs:{input:r},backend:n}),t=ND({inputs:{x:e},backend:n}),i=xT({inputs:{input:r},backend:n}),a=ND({inputs:{x:i},backend:n}),o=MS({inputs:{real:t,imag:a},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(a),o}return EE({backend:n,attrs:{shape:r.shape,value:0,dtype:r.dtype}})}const PD={kernelName:Hn,backendName:`cpu`,kernelFunc:ND};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function FD(e){let{inputs:t,backend:n}=e,{x:r}=t;if(r.dtype===`string`)throw Error(`onesLike is not supported for string tensors`);if(r.dtype===`complex64`){let e=LS({inputs:{input:r},backend:n}),t=FD({inputs:{x:e},backend:n}),i=xT({inputs:{input:r},backend:n}),a=ND({inputs:{x:i},backend:n}),o=MS({inputs:{real:t,imag:a},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(a),o}return EE({backend:n,attrs:{shape:r.shape,value:1,dtype:r.dtype}})}const ID={kernelName:nn,backendName:`cpu`,kernelFunc:FD};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function LD(e){let{inputs:t,backend:n,attrs:r}=e,{axis:i}=r;if(t.length===1)return hE({inputs:{input:t[0]},backend:n,attrs:{dim:i}});let a=t[0].shape,o=t[0].dtype;t.forEach(e=>{g(a,e.shape,`All tensors passed to stack must have matching shapes`),h(o===e.dtype,()=>`All tensors passed to stack must have matching dtypes`)});let s=[],c=CT({inputs:t.map(e=>{let t=hE({inputs:{input:e},backend:n,attrs:{dim:i}});return s.push(t),t}),backend:n,attrs:{axis:i}});return s.forEach(e=>n.disposeIntermediateTensorInfo(e)),c}const RD={kernelName:an,backendName:`cpu`,kernelFunc:LD};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function zD(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{paddings:a,constantValue:o}=r;Q(i,`pad`);let s=a.map((e,t)=>e[0]+i.shape[t]+e[1]),c=a.map(e=>e[0]),l=n.data.get(i.dataId).values,u=v(i.shape),d=i.shape.length,f=k(i.shape),p=v(s),m=s.length,h=k(s),g=T(i.dtype,p);o!==0&&g.fill(o);for(let e=0;e<u;e++){let t=he(ge(e,d,f).map((e,t)=>e+c[t]),m,h);g[t]=l[e]}return{dataId:n.write(g,s,i.dtype),shape:s,dtype:i.dtype}}const BD={kernelName:on,backendName:`cpu`,kernelFunc:zD},VD={kernelName:`Pow`,backendName:`cpu`,kernelFunc:HS(`Pow`,jS((e,t)=>e**+t))}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2022 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function HD(e){let{inputs:t,backend:n,attrs:r}=e,{paramsNestedSplits:i,paramsDenseValues:a,indices:o}=t,{outputRaggedRank:s}=r,c=i.map(e=>n.data.get(e.dataId).values),l=i.map(e=>e.shape),u=n.data.get(a.dataId).values,d=n.data.get(o.dataId).values,[f,p,m]=LC(c,l,u,a.shape,a.dtype,d,o.shape,s),h=f.map(e=>n.makeTensorInfo([e.length],`int32`,e)),g=n.makeTensorInfo(m,a.dtype,p);return h.concat([g])}const UD={kernelName:`RaggedGather`,backendName:`cpu`,kernelFunc:HD};
/**
* @license
* Copyright 2022 Google LLC.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function WD(e){let{inputs:t,backend:n}=e,{starts:r,limits:i,deltas:a}=t,o=n.data.get(r.dataId).values,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,[l,u]=zC(o,r.shape,r.dtype,s,i.shape,c,a.shape);return[n.makeTensorInfo([l.length],`int32`,l),n.makeTensorInfo([u.length],r.dtype,u)]}const GD={kernelName:`RaggedRange`,backendName:`cpu`,kernelFunc:WD};
/**
* @license
* Copyright 2022 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function KD(e){let{inputs:t,backend:n,attrs:r}=e,{shape:i,values:a,defaultValue:o,rowPartitionTensors:s}=t,{rowPartitionTypes:c}=r,l=n.data.get(i.dataId).values,u=n.data.get(a.dataId).values,d=n.data.get(o.dataId).values,f=s.map(e=>n.data.get(e.dataId).values),p=s.map(e=>e.shape),[m,h]=WC(l,i.shape,u,a.shape,a.dtype,d,o.shape,f,p,c);return n.makeTensorInfo(m,a.dtype,h)}const qD={kernelName:`RaggedTensorToTensor`,backendName:`cpu`,kernelFunc:KD};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function JD(e){let{backend:t,attrs:n}=e,{start:r,stop:i,dtype:a,step:o}=n,s=GC(r,i,o,a);return t.makeTensorInfo([s.length],a,s)}const YD={kernelName:ln,backendName:`cpu`,kernelFunc:JD},XD={kernelName:dn,backendName:`cpu`,kernelFunc:$(dn,e=>1/e)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ZD(e){let{inputs:t,backend:n,attrs:r}=e,{images:i}=t,{alignCorners:a,halfPixelCenters:o,size:s}=r;Q(i,`resizeBilinear`);let c=k(i.shape),[l,u]=s,[d,f,p,m]=i.shape,h=n.data.get(i.dataId).values,g=new Float32Array(v([d,l,u,m])),_=[a&&l>1?f-1:f,a&&u>1?p-1:p],y=[a&&l>1?l-1:l,a&&u>1?u-1:u],b=0,x=_[0]/y[0],S=_[1]/y[1];for(let e=0;e<d;e++)for(let t=0;t<l;t++){let n;n=o?x*(t+.5)-.5:x*t;let r=Math.max(0,Math.floor(n)),i=n-r,a=Math.min(f-1,Math.ceil(n)),s=e*c[0]+r*c[1],l=e*c[0]+a*c[1];for(let e=0;e<u;e++){let t;t=o?S*(e+.5)-.5:S*e;let n=Math.max(0,Math.floor(t)),r=t-n,a=Math.min(p-1,Math.ceil(t)),u=s+n*c[2],d=l+n*c[2],f=s+a*c[2],_=l+a*c[2];for(let e=0;e<m;e++){let t=h[u+e],n=h[d+e],a=h[f+e],o=h[_+e],s=t+(a-t)*r,c=s+(n+(o-n)*r-s)*i;g[b++]=c}}}return n.makeTensorInfo([d,l,u,m],`float32`,g)}const QD={kernelName:gn,backendName:`cpu`,kernelFunc:ZD};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function $D(e){let{inputs:t,backend:n,attrs:r}=e,{images:i,dy:a}=t,{alignCorners:o}=r;Q([a,i],`resizeBilinearGrad`);let s=k(i.shape),[c,l,u,d]=i.shape,[,f,p]=a.shape,m=new Float32Array(c*l*u*d),h=[o&&f>1?l-1:l,o&&p>1?u-1:u],g=[o&&f>1?f-1:f,o&&p>1?p-1:p],_=h[0]/g[0],v=h[1]/g[1],y=n.data.get(a.dataId).values,b=0;for(let e=0;e<c;e++){let t=e*s[0];for(let e=0;e<f;e++){let n=e*_,r=Math.floor(n),i=Math.min(Math.ceil(n),l-1),a=t+r*s[1],o=t+i*s[1],c=n-r,f=1-c;for(let e=0;e<p;e++){let t=e*v,n=Math.floor(t),r=Math.min(Math.ceil(t),u-1),i=t-n,l=1-i,p=a+n*s[2],h=a+r*s[2],g=o+n*s[2],_=o+r*s[2],x=f*l,S=f*i,C=c*l,w=c*i;for(let e=0;e<d;e++){let t=y[b++];m[p+e]+=t*x,m[h+e]+=t*S,m[g+e]+=t*C,m[_+e]+=t*w}}}}return n.makeTensorInfo([c,u,l,d],`float32`,m)}const eO={kernelName:_n,backendName:`cpu`,kernelFunc:$D};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function tO(e){let{inputs:t,backend:n,attrs:r}=e,{images:i}=t,{alignCorners:a,halfPixelCenters:o,size:s}=r;Q(i,`resizeNearestNeighbor`);let c=k(i.shape),[l,u]=s,[d,f,p,m]=i.shape,h=n.data.get(i.dataId).values,g=new Float32Array(d*l*u*m),_=[a&&l>1?f-1:f,a&&u>1?p-1:p],v=[a&&l>1?l-1:l,a&&u>1?u-1:u],y=_[0]/v[0],b=_[1]/v[1],x=0;for(let e=0;e<d;e++){let t=e*c[0];for(let e=0;e<l;e++){let n=o?y*(e+.5):y*e,r=Math.min(f-1,a?Math.round(n):Math.floor(n));o&&(r=Math.max(0,r));let i=t+r*c[1];for(let e=0;e<u;e++){let t=o?b*(e+.5):b*e,n=Math.min(p-1,a?Math.round(t):Math.floor(t));o&&(n=Math.max(0,n));let r=i+n*c[2];for(let e=0;e<m;e++){let t=h[r+e];g[x++]=t}}}}return n.makeTensorInfo([d,l,u,m],i.dtype,g)}const nO={kernelName:mn,backendName:`cpu`,kernelFunc:tO};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function rO(e){let{inputs:t,backend:n,attrs:r}=e,{images:i,dy:a}=t,{alignCorners:o}=r;Q([a,i],`resizeNearestNeighborGrad`);let s=k(i.shape),c=k(a.shape),[l,u,d,f]=i.shape,[,p,m]=a.shape,h=new Float32Array(l*u*d*f),g=n.data.get(a.dataId).values,_=[o&&p>1?u-1:u,o&&m>1?d-1:d],v=[o&&p>1?p-1:p,o&&m>1?m-1:m],y=_[0]/v[0],b=_[1]/v[1],x=1/y,S=1/b,C=Math.ceil(x)*2+2,w=Math.ceil(S)*2+2;for(let e=0;e<l;e++){let t=e*s[0];for(let e=0;e<u;e++){let n=t+e*s[1],r=Math.floor(e*x),i=Math.floor(r-C/2);for(let r=0;r<d;r++){let a=n+r*s[2],l=Math.floor(r*S),_=Math.floor(l-w/2);for(let n=0;n<f;n++){let s=0;for(let a=0;a<C;a++){let l=a+i;if(l<0||l>=p)continue;let f=t+l*c[1],h=l*y,v=Math.min(u-1,o?Math.round(h):Math.floor(h));if(e===v)for(let e=0;e<w;e++){let t=e+_;if(t<0||t>=m)continue;let i=f+t*c[2],a=t*b,l=Math.min(d-1,o?Math.round(a):Math.floor(a));r===l&&(s+=g[i+n])}}h[a+n]=s}}}}return n.makeTensorInfo(i.shape,i.dtype,h)}const iO={kernelName:hn,backendName:`cpu`,kernelFunc:rO};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function aO(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{dims:a}=r;Q(i,`reverse`);let o=i.shape.length,s=C(a,i.shape);if(o===0)return FS({inputs:{x:i},backend:n});let c=new Br(i.shape,i.dtype),l=n.bufferSync(i);for(let e=0;e<c.size;e++){let t=c.indexToLoc(e),n=t.slice();s.forEach(e=>n[e]=i.shape[e]-1-n[e]),c.set(l.get(...n),...t)}return n.makeTensorInfo(c.shape,c.dtype,c.values)}const oO={kernelName:yn,backendName:`cpu`,kernelFunc:aO},sO={kernelName:Wn,backendName:`cpu`,kernelFunc:({inputs:e,attrs:t,backend:n})=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{image:r}=e,{radians:i,fillValue:a,center:o}=t,s=n,c=T(r.dtype,v(r.shape)),[l,u,d,f]=r.shape,[p,m]=Bf(o,u,d),h=Math.sin(i),g=Math.cos(i),_=s.data.get(r.dataId).values;for(let e=0;e<l;e++){let t=e*d*u*f;for(let e=0;e<u;e++){let n=d*f*e;for(let r=0;r<d;r++){let i=r*f;for(let o=0;o<f;o++){let s=[l,e,r,o],v=s[2],y=s[1],b=(v-p)*g-(y-m)*h,x=(v-p)*h+(y-m)*g;b=Math.round(b+p),x=Math.round(x+m);let S=a;if(typeof a!=`number`&&(S=o===3?255:a[o]),b>=0&&b<d&&x>=0&&x<u){let e=d*f*x,n=b*f;S=_[t+e+n+o]}let C=t+n+i+o;c[C]=S}}}}return{dataId:s.write(c,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}},cO={kernelName:bn,backendName:`cpu`,kernelFunc:$(bn,e=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let t=Math.floor(e);return e-t<.5?Math.floor(e):e-t>.5?Math.ceil(e):t%2==0?t:t+1})};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function lO(e){let{inputs:t,backend:n,attrs:r}=e,{indices:i,updates:a}=t,{shape:o}=r,{sliceRank:s,numUpdates:c,sliceSize:l,strides:u,outputSize:d}=Su(a,i,o),f=qC(n.bufferSync(i),n.bufferSync(a),o,d,l,c,s,u,0,!0);return n.makeTensorInfo(o,f.dtype,f.values)}const uO={kernelName:`ScatterNd`,backendName:`cpu`,kernelFunc:lO};
/**
* @license
* Copyright 2022 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function dO(e,t){let n=0,r=e.length,i=0;for(;n<r;)i=Math.floor((n+r)/2),e[i]<t?n=i+1:r=i;return r}function fO(e,t){let n=0,r=e.length,i=0;for(;n<r;)i=Math.floor((n+r)/2),e[i]<=t?n=i+1:r=i;return r}function pO(e,t,n,r,i,a){let o=E(`int32`,n*i);for(let s=0;s<n;++s){let n=e.slice(s*r,(s+1)*r),c=s*i;for(let e=0;e<i;++e)o[c+e]=a===`left`?dO(n,t[e+c]):fO(n,t[e+c])}return o}
/**
* @license
* Copyright 2022 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function mO(e){let{inputs:t,backend:n,attrs:r}=e,{sortedSequence:i,values:a}=t,{side:o}=r,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,l=pO(s,c,i.shape[0],i.shape[1],a.shape[1],o);return n.makeTensorInfo(a.shape,`int32`,l)}const hO={kernelName:`SearchSorted`,backendName:`cpu`,kernelFunc:mO};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function gO(e){let{inputs:t,backend:n}=e,{condition:r,t:i,e:a}=t;Q([r,i,a],`select`);let o=r.shape.length,s=n.data.get(r.dataId).values,c=n.data.get(i.dataId).values,l=n.data.get(a.dataId).values,u=ei(i.dtype,a.dtype),d=fe(v(i.shape),u),f=0,p=o===0||o>1||i.shape.length===1?1:v(i.shape.slice(1));for(let e=0;e<s.length;e++)for(let t=0;t<p;t++)s[e]===1?d[f++]=c[e]:d[f++]=l[e];return n.makeTensorInfo(i.shape,u,d)}const _O={kernelName:Sn,backendName:`cpu`,kernelFunc:gO},vO={kernelName:Cn,backendName:`cpu`,kernelFunc:$(Cn,e=>e>=0?1.0507009873554805*e:1.7580993408473768*(Math.exp(e)-1))},yO={kernelName:En,backendName:`cpu`,kernelFunc:$(En,e=>e<0?-1:+(e>0))},bO={kernelName:`Sin`,backendName:`cpu`,kernelFunc:$(`Sin`,e=>Math.sin(e))},xO={kernelName:Tn,backendName:`cpu`,kernelFunc:$(Tn,e=>Math.sinh(e))},SO=Math.log(1.1920928955078125e-7)+2,CO={kernelName:On,backendName:`cpu`,kernelFunc:$(On,e=>{
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let t=e>-SO,n=e<SO,r=Math.exp(e),i;return i=n?r:t?e:Math.log(1+r),i})};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function wO(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{blockShape:a,paddings:o}=r;Q([i],`spaceToBatchND`);let s=v(a),c=[[0,0]];c.push(...o);for(let e=1+a.length;e<i.shape.length;++e)c.push([0,0]);let l=BD.kernelFunc({inputs:{x:i},backend:n,attrs:{paddings:c,constantValue:0}}),u=Vf(l.shape,a,s,!1),d=Hf(u.length,a.length,!1),f=Uf(l.shape,a,s,!1),p=Aw({inputs:{x:l},backend:n,attrs:{shape:u}}),m=TC({inputs:{x:p},backend:n,attrs:{perm:d}}),h=Aw({inputs:{x:m},backend:n,attrs:{shape:f}});return n.disposeIntermediateTensorInfo(l),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),h}const TO={kernelName:An,backendName:`cpu`,kernelFunc:wO};
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function EO(e){let{inputs:t,backend:n}=e,{indices:r,values:i,denseShape:a,defaultValue:o}=t;if(a.shape.length!==1)throw Error(`Dense shape must be a vector, saw:
        ${a.shape}`);if(r.shape.length!==2)throw Error(`Indices must be a matrix, saw:
        ${r.shape}`);if(i.shape.length!==1)throw Error(`Values must be a vector, saw:
        ${i.shape}`);if(o.shape.length!==0)throw Error(`Default value must be a scalar, saw:
        ${o.shape}`);let s=n.data.get(r.dataId).values,c=n.data.get(i.dataId).values,l=n.data.get(a.dataId).values,u=n.data.get(o.dataId).values[0],[d,f,p,m,h]=$C(s,r.shape,r.dtype,c,i.dtype,l,u);return[n.makeTensorInfo(f,r.dtype,d),n.makeTensorInfo([f[0]],i.dtype,p),n.makeTensorInfo([m.length],`bool`,new Uint8Array(m.map(e=>Number(e)))),n.makeTensorInfo([h.length],r.dtype,new Int32Array(h))]}const DO={kernelName:`SparseFillEmptyRows`,backendName:`cpu`,kernelFunc:EO};
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function OO(e){let{inputs:t,backend:n}=e,{inputIndices:r,inputShape:i,newShape:a}=t;if(r.shape.length!==2)throw Error(`Input indices should be a matrix but received shape
        ${r.shape}`);if(i.shape.length!==1)throw Error(`Input shape should be a vector but received shape
        ${i.shape}`);if(a.shape.length!==1)throw Error(`Target shape should be a vector but received shape ${a.shape}`);let o=Array.from(n.data.get(i.dataId).values),s=n.data.get(r.dataId).values,c=Array.from(n.data.get(a.dataId).values),[l,u,d]=ew(s,r.shape,r.dtype,o,c);return[n.makeTensorInfo(u,r.dtype,l),n.makeTensorInfo([d.length],a.dtype,new Int32Array(d))]}const kO={kernelName:`SparseReshape`,backendName:`cpu`,kernelFunc:OO};
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function AO(e){let{inputs:t,backend:n}=e,{data:r,indices:i,segmentIds:a}=t;if(r.shape.length<1)throw Error(`Data should be at least 1 dimensional but received scalar`);if(i.shape.length!==1)throw Error(`Indices should be a vector but received shape
          ${i.shape}`);if(a.shape.length!==1)throw Error(`Segment ids should be a vector but received shape
          ${a.shape}`);if(i.shape[0]!==a.shape[0])throw Error(`segmentIds and indices should have same size.`);let o=n.data.get(r.dataId).values,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,[l,u]=tw(o,r.shape,r.dtype,s,c,!0);return n.makeTensorInfo(u,r.dtype,l)}const jO={kernelName:`SparseSegmentMean`,backendName:`cpu`,kernelFunc:AO};
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function MO(e){let{inputs:t,backend:n}=e,{data:r,indices:i,segmentIds:a}=t;if(r.shape.length<1)throw Error(`Data should be at least 1 dimensional but received scalar`);if(i.shape.length!==1)throw Error(`Indices should be a vector but received shape
         ${i.shape}`);if(a.shape.length!==1)throw Error(`Segment ids should be a vector but received shape
         ${a.shape}`);if(i.shape[0]!==a.shape[0])throw Error(`segmentIds and indices should have same size.`);let o=n.data.get(r.dataId).values,s=n.data.get(i.dataId).values,c=n.data.get(a.dataId).values,[l,u]=tw(o,r.shape,r.dtype,s,c);return n.makeTensorInfo(u,r.dtype,l)}const NO={kernelName:`SparseSegmentSum`,backendName:`cpu`,kernelFunc:MO};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function PO(e){let{inputs:t,backend:n,attrs:r}=e,{sparseIndices:i,sparseValues:a,defaultValue:o}=t,{outputShape:s}=r,{sliceRank:c,numUpdates:l,sliceSize:u,strides:d,outputSize:f}=Su(a,i,s),p=n.bufferSync(i),m;switch(a.dtype){case`bool`:m=qC(p,n.bufferSync(a),s,f,u,l,c,d,!!n.data.get(o.dataId).values[0],!1);break;case`float32`:{let e=n.bufferSync(a),t=n.data.get(o.dataId).values[0];m=qC(p,e,s,f,u,l,c,d,t,!1);break}case`int32`:{let e=n.bufferSync(a),t=n.data.get(o.dataId).values[0];m=qC(p,e,s,f,u,l,c,d,t,!1);break}case`string`:m=qC(p,n.bufferSync(a),s,f,u,l,c,d,Er(n.data.get(o.dataId).values[0]),!1);break;default:throw Error(`Unsupported type ${a.dtype}`)}return n.makeTensorInfo(s,m.dtype,m.values)}const FO={kernelName:`SparseToDense`,backendName:`cpu`,kernelFunc:PO};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function IO(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{numOrSizeSplits:a,axis:o}=r,s=C(o,i.shape)[0],c=sp(i,a,s),l=Array(i.shape.length).fill(0),u=i.shape.slice();return c.map(e=>{let t=[...u];t[s]=e;let r=ZC({inputs:{x:i},backend:n,attrs:{begin:l,size:t}});return l[s]+=e,r})}const LO={kernelName:jn,backendName:`cpu`,kernelFunc:IO},RO={kernelName:Pn,backendName:`cpu`,kernelFunc:({inputs:e,backend:t})=>{
/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
let{x:n}=e,r=t;Q(n,`square`);let i=r.data.get(n.dataId).values,a=new Float32Array(i.length);for(let e=0;e<i.length;++e){let t=i[e];a[e]=t*t}return{dataId:r.write(a,n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}},zO={kernelName:Un,backendName:`cpu`,kernelFunc:$(Un,(e,t)=>isNaN(e)?NaN:e>0?1:t.alpha)}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function BO(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{begin:a,end:o,strides:s,beginMask:c,endMask:l,ellipsisMask:u,newAxisMask:d,shrinkAxisMask:f}=r;Q(i,`stridedSlice`);let{finalShapeSparse:p,finalShape:m,isIdentity:g,sliceDim0:_,isSimpleSlice:v,begin:y,end:b,strides:x}=Df(i.shape,a,o,s,c,l,u,d,f),S;if(g)S=Aw({inputs:{x:i},backend:n,attrs:{shape:m}});else if(_||v){h(i.shape.length>=1,()=>`Input must have rank at least 1, got: ${i.shape.length}`);let e=Cf(y,b,x),t=ZC({inputs:{x:i},backend:n,attrs:{begin:y,size:e}});S=Aw({inputs:{x:t},backend:n,attrs:{shape:m}}),n.disposeIntermediateTensorInfo(t)}else{let e=aw(p,n.bufferSync(i),x,y);S=n.makeTensorInfo(m,e.dtype,e.values)}return S}const VO={kernelName:`StridedSlice`,backendName:`cpu`,kernelFunc:BO};
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function HO(e){let{inputs:t,backend:n,attrs:r}=e,{separator:i,nGramWidths:a,leftPad:o,rightPad:s,padWidth:c,preserveShortSequences:l}=r,{data:u,dataSplits:d}=t,f=n.data.get(u.dataId).values,p=n.data.get(d.dataId).values,[m,h]=sw(f,p,i,a,o,s,c,l);return[n.makeTensorInfo([m.length],`string`,m),n.makeTensorInfo(d.shape,`int32`,h)]}const UO={kernelName:`StringNGrams`,backendName:`cpu`,kernelFunc:HO};
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function WO(e){let{inputs:t,backend:n,attrs:r}=e,{skipEmpty:i}=r,{input:a,delimiter:o}=t;if(a.dtype!==`string`)throw Error(`Input must be of datatype string`);if(a.shape.length!==1)throw Error(`Input must be a vector, got shape: ${a.shape}`);if(o.shape.length!==0)throw Error(`Delimiter must be a scalar, got shape: ${o.shape}`);let s=n.data.get(a.dataId).values,c=n.data.get(o.dataId).values[0],[l,u,d]=lw(s,c,i),f=u.length;return[n.makeTensorInfo([f,2],`int32`,l),n.makeTensorInfo([f],`string`,u),n.makeTensorInfo([2],`int32`,new Int32Array(d))]}const GO={kernelName:`StringSplit`,backendName:`cpu`,kernelFunc:WO};
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function KO(e){let{inputs:t,backend:n,attrs:r}=e,{numBuckets:i}=r,{input:a}=t;if(a.dtype!==`string`)throw Error(`Input must be of datatype string`);if(i<=0)throw Error(`Number of buckets must be at least 1`);let o=n.data.get(a.dataId).values,s=uw(o,i);return n.makeTensorInfo(a.shape,`int32`,s)}const qO={kernelName:`StringToHashBucketFast`,backendName:`cpu`,kernelFunc:KO},JO={kernelName:`Tan`,backendName:`cpu`,kernelFunc:$(`Tan`,e=>Math.tan(e))},YO={kernelName:In,backendName:`cpu`,kernelFunc:$(In,e=>Math.tanh(e))}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;
/**
* @license
* Copyright 2022 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function XO(e){let{inputs:t,backend:n}=e,{tensor:r,indices:i,updates:a}=t,{sliceRank:o,numUpdates:s,sliceSize:c,strides:l,outputSize:u}=Su(a,i,r.shape),d=n.bufferSync(i),f=n.bufferSync(a),p=n.bufferSync(r),m=qC(d,f,r.shape,u,c,s,o,l,p,!1);return n.makeTensorInfo(r.shape,m.dtype,m.values)}const ZO={kernelName:`TensorScatterUpdate`,backendName:`cpu`,kernelFunc:XO};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function QO(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{reps:a}=r;Q(i,`tile`);let o=pw(n.bufferSync(i),a);return n.makeTensorInfo(o.shape,o.dtype,o.values)}const $O={kernelName:Ln,backendName:`cpu`,kernelFunc:QO};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function ek(e){let{inputs:t,backend:n,attrs:r}=e,{x:i}=t,{k:a,sorted:o}=r;Q(i,`topk`);let s=n.data.get(i.dataId).values,[c,l]=gw(s,i.shape,i.dtype,a,o);return[n.makeTensorInfo(c.shape,c.dtype,c.values),n.makeTensorInfo(l.shape,l.dtype,l.values)]}const tk={kernelName:`TopK`,backendName:`cpu`,kernelFunc:ek};
/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function nk(e){let{inputs:t,attrs:n,backend:r}=e,{image:i,transforms:a}=t,{interpolation:o,fillMode:s,fillValue:c,outputShape:l}=n,[u,d,f,p]=i.shape,[m,h]=l??[d,f],g=[u,m,h,p],_=k(i.shape),y=_[0],b=_[1],x=_[2],S=k(g),C=S[0],w=S[1],E=S[2],D=T(i.dtype,v(g));D.fill(c);let O=r.data.get(i.dataId).values,ee=r.data.get(a.dataId).values;for(let e=0;e<u;++e){let t=a.shape[0]===1?ee:ee.subarray(e*8,e*8+8);for(let n=0;n<m;++n)for(let r=0;r<h;++r)for(let i=0;i<p;++i){let a,l=t[6]*r+t[7]*n+1;if(l===0)continue;let u=(t[0]*r+t[1]*n+t[2])/l,p=(t[3]*r+t[4]*n+t[5])/l,m=ik(u,f,s),h=ik(p,d,s);switch(o){case`nearest`:a=uk(O,d,f,y,b,x,e,h,m,i,c);break;case`bilinear`:a=dk(O,d,f,y,b,x,e,h,m,i,c);break;default:throw Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${o}`)}let g=e*C+n*w+r*E+i;D[g]=a}return r.makeTensorInfo(g,i.dtype,D)}return{dataId:r.write(D,g,i.dtype),shape:i.shape,dtype:i.dtype}}const rk={kernelName:Rn,backendName:`cpu`,kernelFunc:nk};function ik(e,t,n){switch(n){case`reflect`:return ak(e,t);case`wrap`:return ok(e,t);case`nearest`:return ck(e,t);default:return sk(e,t)}}function ak(e,t){let n=e;if(n<0){if(t<=1)n=0;else{let e=2*t;n<e&&(n=e*Math.trunc(-n/e)+n),n=n<-t?n+e:-n-1}}else if(n>t-1){if(t<=1)n=0;else{let e=2*t;n-=e*Math.trunc(n/e),n>=t&&(n=e-n-1)}}return p(0,n,t-1)}function ok(e,t){let n=e;if(n<0){if(t<=1)n=0;else{let e=t-1;n+=t*(Math.trunc(-n/e)+1)}}else if(n>t-1){if(t<=1)n=0;else{let e=t-1;n-=t*Math.trunc(n/e)}}return p(0,n,t-1)}function sk(e,t){return e}function ck(e,t){return p(0,e,t-1)}function lk(e,t,n,r,i,a,o,s,c,l,u){let d=o*r+s*i+c*a+l;return 0<=s&&s<t&&0<=c&&c<n?e[d]:u}function uk(e,t,n,r,i,a,o,s,c,l,u){return lk(e,t,n,r,i,a,o,Math.round(s),Math.round(c),l,u)}function dk(e,t,n,r,i,a,o,s,c,l,u){let d=Math.floor(s),f=Math.floor(c),p=d+1,m=f+1,h=(m-c)*lk(e,t,n,r,i,a,o,d,f,l,u)+(c-f)*lk(e,t,n,r,i,a,o,d,m,l,u),g=(m-c)*lk(e,t,n,r,i,a,o,p,f,l,u)+(c-f)*lk(e,t,n,r,i,a,o,p,m,l,u);return(p-s)*h+(s-d)*g}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the License);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an AS IS BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function fk(e){let{inputs:t,attrs:n,backend:r}=e,{axis:i}=n,{x:a}=t;Q(a,`unique`);let o=r.data.get(a.dataId).values,{outputValues:s,outputShape:c,indices:l}=_w(o,i,a.shape,a.dtype);return[r.makeTensorInfo(c,a.dtype,s),r.makeTensorInfo([l.length],`int32`,l)]}const pk={kernelName:`Unique`,backendName:`cpu`,kernelFunc:fk};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function mk(e){let{inputs:t,backend:n,attrs:r}=e,{value:i}=t,{axis:a}=r;a<0&&(a+=i.shape.length);let o=i.shape.length,s=i.shape[a],c=Array(o-1),l=0;for(let e=0;e<o;e++)e!==a&&(c[l++]=i.shape[e]);let u=Array(o).fill(0),d=i.shape.slice();d[a]=1;let f=Array(s);for(let e=0;e<f.length;e++){u[a]=e;let t=ZC({inputs:{x:i},backend:n,attrs:{begin:u,size:d}});f[e]=Aw({inputs:{x:t},backend:n,attrs:{shape:c}}),n.disposeIntermediateTensorInfo(t)}return f}const hk={kernelName:Bn,backendName:`cpu`,kernelFunc:mk};
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
function gk(e){let{inputs:t,backend:n,attrs:r}=e,{x:i,segmentIds:a}=t,{numSegments:o}=r;Q(i,`unsortedSegmentSum`);let s=i.shape.length,c=a.shape.length,l=[],u=[],d=s-c,f=a;for(let e=0;e<d;++e){let t=hE({inputs:{input:f},backend:n,attrs:{dim:e+1}});f=t,u.push(t)}for(let e=0;e<o;++e){let t=xr(e,`int32`),r=n.makeTensorInfo([],`int32`,t),a=$S({inputs:{a:r,b:f},backend:n}),o=BS({inputs:{x:a},backend:n,attrs:{dtype:`float32`}}),s=vC({inputs:{a:o,b:i},backend:n}),c=cE({inputs:{x:s},backend:n,attrs:{axis:0,keepDims:!1}});l.push(c),u.push(r),u.push(a),u.push(o),u.push(s),u.push(c)}let p=LD({inputs:l,backend:n,attrs:{axis:0}});return u.forEach(e=>n.disposeIntermediateTensorInfo(e)),p}
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
const _k=[Fw,AS,Iw,Lw,GS,zw,Vw,Uw,Gw,qw,Jw,Yw,Xw,Zw,Qw,iT,oT,cT,uT,Nw,fT,mT,gT,JS,vT,VS,ZS,yT,NS,bT,wT,ET,OT,AT,MT,PT,IT,LT,RT,BT,HT,WT,KT,JT,XT,QT,eE,nE,rE,iE,aE,sE,dE,yw,pE,eC,mE,nC,gE,rC,TE,DE,kE,iC,aC,jE,NE,FE,LE,cC,lC,IS,zE,ST,BE,VE,HE,xw,uC,dC,WE,pC,GE,KE,qE,JE,XE,QE,eD,hC,nD,iD,oD,cD,uD,fD,mD,gC,gD,_D,xD,yC,SC,wD,DD,AD,CC,MD,ID,RD,BD,VD,ww,kC,UD,GD,qD,YD,RS,vE,XD,Ew,Ow,jw,QD,eO,nO,iO,oO,sO,cO,KC,uO,hO,_O,vO,YC,yO,bO,xO,QC,yD,CO,TO,DO,kO,jO,NO,FO,LO,nw,RO,rw,iw,zO,VO,UO,GO,qO,fw,lE,JO,YO,ZO,$O,tk,rk,EC,pk,hk,{kernelName:Vn,backendName:`cpu`,kernelFunc:gk},PD];for(let e of _k)$n(e)
/**
* @license
* Copyright 2020 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*/
;function vk(e){if(!Array.isArray(e)||e.length<100||e.length>1e4)throw Error(`Supply 100–10,000 consecutive samples.`);return e.forEach((e,t)=>{if(!Array.isArray(e)||e.length!==6||e.some(e=>!Number.isFinite(e)||Math.abs(e)>1e6))throw Error(`Sample ${t+1} must contain six finite numbers within ±1,000,000.`)}),e}function yk(e,t=25,n=0,r=e){if(![e,t,n,r].every(Number.isInteger)||e<100||t<1||t>100||n<0||r>e||r<n)throw Error(`Invalid window bounds or stride (1–100).`);let i=[];for(let e=n;e+100<=r;e+=t)i.push(e);return i}async function bk(e,t=fetch){let n=await t(new URL(`model.json`,e));if(!n.ok)throw Error(`Model metadata could not be loaded. Serve the app with its model folder.`);let r=await n.json(),i=r.weightsManifest;if(i.length!==1||i[0].paths.length!==1||i[0].paths[0]!==`group1-shard1of1.bin`)throw Error(`Unexpected model manifest.`);let a=await t(new URL(i[0].paths[0],e));if(!a.ok)throw Error(`Model weights could not be loaded.`);let o=await a.arrayBuffer();if([...new Uint8Array(await crypto.subtle.digest(`SHA-256`,o))].map(e=>e.toString(16).padStart(2,`0`)).join(``)!==`3c2e40c6054c6359ca445d33894a4e374891630119f881f4b93644429396c76f`)throw Error(`Weight fingerprint does not match the original artifact.`);let s=structuredClone(r.modelTopology);delete s.training_config,await ki(`cpu`),await Ai();let c=await Zy(yf({modelTopology:s,weightSpecs:i[0].weights,weightData:o}));if(JSON.stringify(c.inputs[0].shape.slice(1))!==`[100,6]`||c.outputs[0].shape.at(-1)!==1)throw c.dispose(),Error(`Expected 100 × 6 input and one output.`);return c}async function xk(e,t,n,r=()=>{}){vk(t);let i=yk(t.length,n),a=[];for(let n of i){let o=xu([t.slice(n,n+100)],[1,100,6]),s;try{s=e.predict(o);let t=(await s.data())[0];if(!Number.isFinite(t)||t<0||t>1)throw Error(`Model returned an invalid score.`);a.push({start:n,score:t})}finally{o.dispose(),s?.dispose()}r(a.length,i.length)}return a}self.onmessage=async({data:e})=>{let t;try{t=await bk(e.base);let n=await xk(t,e.rows,e.stride,(e,t)=>self.postMessage({kind:`progress`,done:e,total:t}));self.postMessage({kind:`result`,predictions:n,parameters:t.countParams(),fingerprint:`3c2e40c6054c6359ca445d33894a4e374891630119f881f4b93644429396c76f`})}catch(e){self.postMessage({kind:`error`,message:e.message||`Inference failed.`})}finally{t?.dispose()}};