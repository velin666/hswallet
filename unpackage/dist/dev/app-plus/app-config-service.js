
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/main/main","pages/application/application","pages/my/my","pages/assets/assets","pages/assetsDetail/assetsDetail","pages/home/home","pages/safetyTips/safetyTips","pages/importMnemonic/importMnemonic","pages/createMnemonic/createMnemonic","pages/setPw/setPw","pages/transfer/transfer","pages/transfer/address","pages/transfer/newAddress","pages/management/management","pages/usingSetting/usingSetting","pages/receipt/receipt","pages/about/about","pages/log/log"],"window":{"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#000","backgroundColor":"#000","background":"#000","animationType":"slide-in-right"},"tabBar":{"color":"#919293","selectedColor":"#2bffe7","backgroundColor":"#000","borderStyle":"black","list":[{"pagePath":"pages/main/main","text":"钱包","iconPath":"static/main/wallet.png","selectedIconPath":"static/main/wallet_active.png"},{"pagePath":"pages/application/application","text":"应用","iconPath":"static/main/application.png","selectedIconPath":"static/main/application_active.png"},{"pagePath":"pages/my/my","text":"我的","iconPath":"static/main/my.png","selectedIconPath":"static/main/my_active.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"HSWallet","compilerVersion":"2.8.13","entryPagePath":"pages/main/main","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/main/main","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"钱包"}},{"path":"/pages/application/application","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"应用"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/assets/assets","meta":{},"window":{}},{"path":"/pages/assetsDetail/assetsDetail","meta":{},"window":{"navigationBarTitleText":"详情"}},{"path":"/pages/home/home","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/safetyTips/safetyTips","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/importMnemonic/importMnemonic","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/createMnemonic/createMnemonic","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/setPw/setPw","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/transfer/transfer","meta":{},"window":{"navigationBarTitleText":"转账","titleNView":{"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"22px","color":"#FFFFFF"}]}}},{"path":"/pages/transfer/address","meta":{},"window":{"navigationBarTitleText":"地址本","titleNView":{"buttons":[{"text":"+","fontSize":"27px","color":"#FFFFFF"}]}}},{"path":"/pages/transfer/newAddress","meta":{},"window":{"navigationBarTitleText":"新建地址","titleNView":{"buttons":[{"text":"保存","fontSize":"16px","color":"#FFFFFF","width":"44px"}]}}},{"path":"/pages/management/management","meta":{},"window":{"navigationBarTitleText":"管理"}},{"path":"/pages/usingSetting/usingSetting","meta":{},"window":{"navigationBarTitleText":"使用设置"}},{"path":"/pages/receipt/receipt","meta":{},"window":{"navigationBarTitleText":"收款"}},{"path":"/pages/about/about","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/log/log","meta":{},"window":{"navigationBarTitleText":"版本日志"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
