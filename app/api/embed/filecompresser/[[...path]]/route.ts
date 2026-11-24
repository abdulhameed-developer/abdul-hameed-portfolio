import { NextRequest, NextResponse } from 'next/server';

const UPSTREAM_ORIGIN = 'https://filecompresser.com';
const PROXY_PREFIX = '/api/embed/filecompresser';

function decodeCfEmail(hex: string): string {
  try {
    const key = parseInt(hex.slice(0, 2), 16);
    let email = '';
    for (let i = 2; i < hex.length; i += 2) {
      email += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ key);
    }
    return email;
  } catch {
    return 'info@filecompresser.com';
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  try {
    const resolvedParams = await context.params;
    const segments = resolvedParams.path ?? [];
    const subpath = segments.join('/');
    const cleanPath = subpath ? `/${subpath}` : '/';

    const upstreamUrl = new URL(cleanPath, UPSTREAM_ORIGIN);
    upstreamUrl.search = req.nextUrl.search;

    const upstreamRes = await fetch(upstreamUrl.toString(), {
      headers: {
        'User-Agent':
          req.headers.get('user-agent') ||
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Accept: req.headers.get('accept') || '*/*',
        ...(req.headers.get('rsc') ? { RSC: req.headers.get('rsc')! } : {}),
        ...(req.headers.get('next-router-prefetch')
          ? { 'Next-Router-Prefetch': req.headers.get('next-router-prefetch')! }
          : {}),
        ...(req.headers.get('next-router-state-tree')
          ? {
              'Next-Router-State-Tree': req.headers.get(
                'next-router-state-tree'
              )!,
            }
          : {}),
        ...(req.headers.get('next-url')
          ? { 'Next-Url': req.headers.get('next-url')! }
          : {}),
      },
      redirect: 'follow',
    });

    const contentType =
      upstreamRes.headers.get('content-type') || 'application/octet-stream';
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', contentType);
    responseHeaders.set('Cache-Control', 'no-store');
    responseHeaders.set('Access-Control-Allow-Origin', '*');

    if (contentType.includes('text/html')) {
      let html = await upstreamRes.text();

      // 1. Decode Cloudflare email obfuscation back to original React SSR markup so React hydration (#418) matches 100%
      html = html
        .replace(
          /<a([^>]*?)href="\/cdn-cgi\/l\/email-protection#([a-f0-9]+)"([^>]*)><span class="__cf_email__" data-cfemail="([a-f0-9]+)">\[email&#160;protected\]<\/span><\/a>/gi,
          (_match, before, _hrefHex, after, spanHex) => {
            const decoded = decodeCfEmail(spanHex);
            return `<a${before}href="mailto:${decoded}"${after}>${decoded}</a>`;
          }
        )
        .replace(
          /<span class="__cf_email__" data-cfemail="([a-f0-9]+)">\[email&#160;protected\]<\/span>/gi,
          (_match, spanHex) => decodeCfEmail(spanHex)
        )
        .replace(
          /href="\/cdn-cgi\/l\/email-protection#([a-f0-9]+)"/gi,
          (_match, hrefHex) => `href="mailto:${decodeCfEmail(hrefHex)}"`
        );

      // 2. Strip external Cloudflare email-decode/beacon script tags
      html = html
        .replace(
          /<script[^>]*src="\/cdn-cgi\/[^"]+"[^>]*><\/script>/gi,
          ''
        )
        .replace(
          /<script[^>]*cloudflareinsights\.com[^>]*><\/script>/gi,
          ''
        );

      const bridgeHead = `<script>(function(){
var O=window.location.origin;
var U="https://filecompresser.com";
var P=${JSON.stringify(PROXY_PREFIX)};
var C=${JSON.stringify(cleanPath)};
try{history.replaceState(history.state,"",O+C+window.location.search+window.location.hash);}catch(e){}
var HP=history.pushState,HR=history.replaceState;
function normHist(u){
  if(typeof u!=="string")return u;
  if(u.startsWith(U))return O+(u.slice(U.length)||"/");
  if(u.startsWith("/"))return O+u;
  return u;
}
history.pushState=function(s,t,u){return HP.call(this,s,t,normHist(u));};
history.replaceState=function(s,t,u){return HR.call(this,s,t,normHist(u));};
function ensureBase(){
  if(!document.head)return;
  var b=document.head.querySelector("base");
  if(!b){
    b=document.createElement("base");
    b.href=U+"/";
    document.head.insertBefore(b,document.head.firstChild);
  }
}
ensureBase();
if(typeof MutationObserver!=="undefined"&&document.head){
  new MutationObserver(ensureBase).observe(document.head,{childList:true});
}
if(navigator.sendBeacon){var SB=navigator.sendBeacon;navigator.sendBeacon=function(u,d){if(typeof u==="string"&&u.indexOf("cdn-cgi")!==-1)return true;return SB.call(this,u,d);};}
var F=window.fetch;
if(F){window.fetch=function(u,i){
  try{
    var s=typeof u==="string"?u:(u instanceof URL?u.href:(u&&u.url?u.url:""));
    if(s.indexOf("/cdn-cgi/")!==-1){return Promise.resolve(new Response(null,{status:204}));}
    var pathAfterOrigin=null;
    if(s.startsWith(U+"/")){pathAfterOrigin=s.slice(U.length);}
    else if(s.startsWith(O+"/")){pathAfterOrigin=s.slice(O.length);}
    else if(s.startsWith("/")){pathAfterOrigin=s;}
    if(pathAfterOrigin&&!pathAfterOrigin.startsWith("/_next/static/")&&!pathAfterOrigin.startsWith(P)){
      var proxiedUrl=O+P+(pathAfterOrigin==="/"?"":pathAfterOrigin);
      if(typeof u==="object"&&!(u instanceof URL)&&typeof Request!=="undefined"&&u instanceof Request){
        return F.call(this,new Request(proxiedUrl,u),i);
      }
      return F.call(this,proxiedUrl,i);
    }
  }catch(e){}
  return F.call(this,u,i);
};}
document.addEventListener("click",function(e){
  var a=e.target&&e.target.closest?e.target.closest("a"):null;
  if(!a)return;
  var h=a.getAttribute("href");
  if(!h||h.startsWith("#")||h.startsWith("mailto:")||h.startsWith("tel:"))return;
  try{
    var u=new URL(h,U);
    if(u.hostname==="filecompresser.com"||u.hostname==="www.filecompresser.com"||u.origin===O){
      e.preventDefault();
      e.stopPropagation();
      var path=u.pathname.startsWith(P)?u.pathname:P+(u.pathname==="/"?"":u.pathname);
      window.location.assign(O+path+u.search+u.hash);
    }
  }catch(err){}
},true);
})();</script><base href="${UPSTREAM_ORIGIN}/">`;

      if (html.includes('<head>')) {
        html = html.replace('<head>', `<head>${bridgeHead}`);
      } else {
        html = `${bridgeHead}${html}`;
      }

      return new NextResponse(html, {
        status: upstreamRes.status,
        headers: responseHeaders,
      });
    }

    const buffer = await upstreamRes.arrayBuffer();
    return new NextResponse(buffer, {
      status: upstreamRes.status,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.redirect(UPSTREAM_ORIGIN);
  }
}
