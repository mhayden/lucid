var psychdesktop_path="./";
var psychdesktop_registration;
var psychdesktop_popupwindow;
var psychdesktop_http;
var psychdesktop_detect;
var psychdesktop_browser=navigator.appName;
var oldonload=window.onLoad;
if(typeof window.onLoad!="function"){
window.onLoad=psychdesktop_initloginform();
}else{
window.onLoad=function(){
oldonload();
psychdesktop_initloginform();
};
}
function psychdesktop_initloginform(){
var _1;
var _2;
var _3=document.getElementsByTagName("script");
for(var i=0;i<_3.length;i++){
if(_3[i].src&&_3[i].src.match(/login\.js$/)){
psychdesktop_path=_3[i].src.replace(/login\.js$/,"");
}
}
if(psychdesktop_path==""){
psychdesktop_path="./";
}
if(window.XMLHttpRequest){
psychdesktop_http=new XMLHttpRequest();
psychdesktop_http.overrideMimeType("text/plain");
}else{
if(window.ActiveXObject){
psychdesktop_http=new ActiveXObject("Microsoft.XMLHTTP");
}
}
url=psychdesktop_path+"/backend/register.php";
if(psychdesktop_browser!="Microsoft Internet Explorer"){
psychdesktop_http.onreadystatechange=function(){
if(psychdesktop_http.readyState==4){
if(psychdesktop_http.status==200){
psychdesktop_registration=psychdesktop_http.responseText;
var _5=psychdesktop_readCookie("psychdesktop_remember");
if(_5==null){
psychdesktop_home();
}else{
psychdesktop_continue();
}
setInterval("psychdesktop_detectLogout();",100);
}else{
psychdesktop_cannotconnect();
}
}else{
psychdesktop_cannotconnect();
}
};
}
psychdesktop_http.open("GET",url,true);
if(psychdesktop_browser=="Microsoft Internet Explorer"){
psychdesktop_http.onreadystatechange=function(){
if(psychdesktop_http.readyState==4){
if(psychdesktop_http.status==200){
psychdesktop_registration=psychdesktop_http.responseText;
var _6=psychdesktop_readCookie("psychdesktop_remember");
if(_6==null){
psychdesktop_home();
}else{
psychdesktop_continue();
}
setInterval("psychdesktop_detectLogout();",1000*5);
}else{
psychdesktop_cannotconnect();
}
}else{
psychdesktop_cannotconnect();
}
};
}
psychdesktop_http.send(null);
}
function psychdesktop_detectLogout(){
if(psychdesktop_popupwindow){
if(psychdesktop_popupwindow.closed){
if(psychdesktop_detect==true){
readcook=psychdesktop_readCookie("psychdesktop_remember");
if(readcook==null){
psychdesktop_home();
psychdesktop_detect=false;
}
}
}
}
}
function psychdesktop_cannotconnect(){
login="<br /><br /><span style='font-size: 20px; color: red; text-align: center;'><center>Cannot connect to server.</center></span><br /><br />";
try{
document.getElementById("psychdesktop_login").innerHTML=login;
}
catch(error){
alert("Error: "+error);
}
}
function psychdesktop_resetpass(){
username=document.getElementById("psychdesktop_resetpass_username").value;
email=document.getElementById("psychdesktop_resetpass_email").value;
if((!username&&!email)||(!username||!email)){
psychdestkop_error("Please complete all fields.");
}else{
if((email.indexOf("@")<0)||((email.charAt(email.length-5)!=".")&&(email.charAt(email.length-4)!=".")&&(email.charAt(email.length-3)!="."))){
psychdestkop_error("Please enter a valid email address.");
}else{
url=psychdesktop_path+"/backend/forgotpass.php";
if(psychdesktop_browser!="Microsoft Internet Explorer"){
psychdesktop_http.onreadystatechange=function(){
if(psychdesktop_http.readyState==4){
if(psychdesktop_http.status==200){
if(psychdesktop_http.responseText=="0"){
psychdesktop_home();
psychdestkop_error("Reset Successfull. Check your email for your new password.");
}else{
if(psychdesktop_http.responseText=="1"){
psychdestkop_error("No such user");
}else{
psychdestkop_error("Email address provided is different then the address on file");
}
}
}
}
};
}
psychdesktop_http.open("POST",url,true);
if(psychdesktop_browser=="Microsoft Internet Explorer"){
psychdesktop_http.onreadystatechange=function(){
if(psychdesktop_http.readyState==4){
if(psychdesktop_http.status==200){
if(psychdesktop_http.responseText=="0"){
psychdesktop_home();
psychdestkop_error("Reset Successfull. Check your email for your new password.");
}else{
if(psychdesktop_http.responseText=="1"){
psychdestkop_error("No such user");
}else{
psychdestkop_error("Email address provided is different then the address on file");
}
}
}
}
};
}
psychdesktop_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
psychdesktop_http.send("noop=zzz&user="+username+"&email="+email);
}
}
}
function psychdesktop_doregister(){
username=document.getElementById("psychdesktop_register_username").value;
email=document.getElementById("psychdesktop_register_email").value;
password=document.getElementById("psychdesktop_register_password").value;
password2=document.getElementById("psychdesktop_register_password2").value;
if(email&&password&&username){
if(password2==password){
if((email.indexOf("@")<0)||((email.charAt(email.length-5)!=".")&&(email.charAt(email.length-4)!=".")&&(email.charAt(email.length-3)!="."))){
psychdestkop_error("Please enter a valid email address");
}else{
url=psychdesktop_path+"/backend/register.php";
if(psychdesktop_browser!="Microsoft Internet Explorer"){
psychdesktop_http.onreadystatechange=function(){
if(psychdesktop_http.readyState==4){
if(psychdesktop_http.status==200){
if(psychdesktop_http.responseText=="0"){
psychdesktop_home();
psychdestkop_error("Registration Successfull. You may now log in.");
}else{
psychdestkop_error("Username allready taken");
}
}
}
};
}
psychdesktop_http.open("POST",url,true);
if(psychdesktop_browser=="Microsoft Internet Explorer"){
psychdesktop_http.onreadystatechange=function(){
if(psychdesktop_http.readyState==4){
if(psychdesktop_http.status==200){
if(psychdesktop_http.responseText=="0"){
psychdesktop_home();
psychdestkop_error("Registration Successfull. You may now log in.");
}else{
psychdestkop_error("Username allready taken");
}
}
}
};
}
psychdesktop_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
psychdesktop_http.send("noop=zzz&user="+username+"&pass="+password+"&email="+email);
}
}else{
psychdestkop_error("Two passwords don't match");
}
}else{
psychdestkop_error("Please fill out all fields");
}
}
function psychdesktop_continue(){
login="<div style='text-align: center; font-size: 14px;'><br /><b>You are allready logged in.</b><br /><br />";
login+="<a href='javascript:psychdesktop_login(1)'>Continue to desktop</a><br /><br />";
login+="<a href='javascript:psychdesktop_eraseCookie(\"psychdesktop_remember\"); psychdesktop_home();'>Log me out</a><br /><br />";
login+="</div>";
try{
document.getElementById("psychdesktop_login").innerHTML=login;
}
catch(error){
alert("Error: "+error);
}
}
function psychdesktop_login(_7){
if(document.getElementById("psychdesktop_loading")){
document.getElementById("psychdesktop_loading").style.display="inline";
}
if(_7==0){
username=document.getElementById("psychdesktop_username").value;
password=document.getElementById("psychdesktop_password").value;
remember=document.getElementById("psychdesktop_remember").checked;
encrypted="false";
}else{
encrypted="true";
cookie=psychdesktop_readCookie("psychdesktop_remember");
cookie=cookie.split("%2C");
username=cookie[0];
password=cookie[1];
remember="false";
}
url=psychdesktop_path+"/backend/login.php";
if(psychdesktop_browser!="Microsoft Internet Explorer"){
psychdesktop_http.onreadystatechange=function(){
if(psychdesktop_http.readyState==4){
if(psychdesktop_http.status==200){
if(psychdesktop_http.responseText=="0"){
psychdesktop_popUp();
psychdesktop_continue();
psychdesktop_detect=true;
}else{
psychdestkop_error("Incorrect username or password");
}
}
}
};
}
psychdesktop_http.open("POST",url,true);
if(psychdesktop_browser=="Microsoft Internet Explorer"){
psychdesktop_http.onreadystatechange=function(){
if(psychdesktop_http.readyState==4){
if(psychdesktop_http.status==200){
if(psychdesktop_http.responseText=="0"){
psychdesktop_popUp();
psychdesktop_continue();
psychdesktop_detect=true;
}else{
psychdestkop_error("Incorrect username or password");
}
}
}
};
}
psychdesktop_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
psychdesktop_http.send("username="+username+"&password="+password+"&remember="+remember+"&encrypted="+encrypted);
}
function psychdesktop_register(){
if(psychdesktop_registration=="yes"){
login="<table style='width: auto; height: auto; border: 0px;'><tr><td colspan='2' style='text-align: center; font-weight: bold;'>Register</td></tr>\n";
login+="<tr><td style='font-size: 14px; font-weight: bold;'>Username:</td><td><input type='text' id='psychdesktop_register_username' /></td></tr>\n";
login+="<tr><td style='font-size: 14px; font-weight: bold;'>Email:</td><td><input type='text' id='psychdesktop_register_email' /></td></tr>\n";
login+="<tr><td style='font-size: 14px; font-weight: bold;'>Password:</td><td><input type='password' id='psychdesktop_register_password' /></td></tr>\n";
login+="<tr><td style='font-size: 14px; font-weight: bold;'>Confirm Password:</td><td><input type='password' id='psychdesktop_register_password2' /></td></tr>\n";
login+="<tr><td colspan='2' style='text-align: center; color: red; font-size: 14px; font-weight: bold;' id='psychdesktop_errorbox'></td></tr>";
login+="<tr><td colspan='2'><span style='float: right'><span id='psychdesktop_loading' style='display: none;'><img src='"+psychdesktop_path+"desktop/themes/default/images/icons/loading.gif' alt='' /></span><input type='button' value='Cancel' onClick='psychdesktop_home();' /><input type='button' value='Submit' onClick='psychdestkop_error(\"\"); psychdesktop_doregister();' /></span></td></tr>";
login+="</table>";
try{
document.getElementById("psychdesktop_login").innerHTML=login;
}
catch(error){
alert("Error: "+error);
}
}
}
function psychdestkop_error(_8){
document.getElementById("psychdesktop_errorbox").innerHTML=_8;
document.getElementById("psychdesktop_loading").style.display="none";
}
function psychdesktop_popUp(){
document.getElementById("psychdesktop_loading").style.display="none";
URL=psychdesktop_path+"/desktop/";
day=new Date();
id=day.getTime();
psychdesktop_popupwindow=window.open(URL,id,"toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=1000000,height=1000000,left = 0,top = 0");
}
function psychdesktop_home(){
login="<table style='width: auto; height: auto; border: 0px;'><tr><td colspan='2' style='text-align: center; font-weight: bold;'>Sign in to desktop</td></tr>\n";
login+="<tr><td style='font-size: 14px; font-weight: bold;'>Username:</td><td><input type='text' id='psychdesktop_username' /></td></tr>\n";
login+="<tr><td style='font-size: 14px; font-weight: bold;'>Password:</td><td><input type='password' id='psychdesktop_password' /></td></tr>\n";
login+="<tr><td colspan='2' style='font-size: 14px; font-weight: bold;'><span style='float: right'><span id='psychdesktop_loading' style='display: none;'><img src='"+psychdesktop_path+"/desktop/themes/default/images/icons/loading.gif' alt='' /></span><input type='button' value='Login' onClick='psychdestkop_error(\"\"); psychdesktop_login(0);' /></span>";
login+="<b>Remember me:</b><input type='checkbox' id='psychdesktop_remember' /></td></tr>";
login+="<tr><td colspan='2' style='text-align: center; color: red; font-size: 14px; font-weight: bold;' id='psychdesktop_errorbox'></td></tr>";
login+="<tr><td colspan='2' style='font-size: 14px; text-align: center;'><a href='javascript:psychdesktop_forgotpass();'>Forgot Password?</a></td></tr>";
if(psychdesktop_registration=="yes"){
login+="<tr><td colspan='2' style='font-size: 14px; text-align: center;'><a href='javascript:psychdesktop_register();'>Don't have an account?</a></td></tr>";
}
login+="</table>";
try{
document.getElementById("psychdesktop_login").innerHTML=login;
}
catch(error){
alert("Error: "+error);
}
}
function psychdesktop_forgotpass(){
login="<table style='width: auto; height: auto; border: 0px;'><tr><td colspan='2' style='text-align: center; font-weight: bold;'>Reset your password</td></tr>\n";
login+="<tr><td style='font-size: 14px; font-weight: bold;'>Username:</td><td><input type='text' id='psychdesktop_resetpass_username' /></td></tr>\n";
login+="<tr><td style='font-size: 14px; font-weight: bold;'>Email:</td><td><input type='text' id='psychdesktop_resetpass_email' /></td></tr>\n";
login+="<tr><td colspan='2'><span style='float: right'><span id='psychdesktop_loading' style='display: none;'><img src='"+psychdesktop_path+"/desktop/themes/default/images/icons/loading.gif' alt='' /></span><input type='button' value='Cancel' onClick='psychdesktop_home();' /><input type='button' value='Submit' onClick='psychdestkop_error(\"\"); psychdesktop_resetpass();' /></span></td></tr>";
login+="<tr><td colspan='2' style='text-align: center; color: red; font-size: 14px; font-weight: bold;' id='psychdesktop_errorbox'></td></tr>";
login+="</table>";
try{
document.getElementById("psychdesktop_login").innerHTML=login;
}
catch(error){
alert("Error: "+error);
}
}
function psychdesktop_createCookie(_9,_a,_b){
if(_b){
var _c=new Date();
_c.setTime(_c.getTime()+(_b*24*60*60*1000));
var _d="; expires="+_c.toGMTString();
}else{
var _e="";
}
document.cookie=_9+"="+_a+_e+"; path=/";
}
function psychdesktop_readCookie(_f){
var _10=_f+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_10)==0){
return c.substring(_10.length,c.length);
}
}
return null;
}
function psychdesktop_eraseCookie(_14){
psychdesktop_createCookie(_14,"",-1);
}