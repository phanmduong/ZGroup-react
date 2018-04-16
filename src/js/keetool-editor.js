// var head = document.getElementsByTagName('head')[0];
// var fa = document.createElement('link');
// fa.setAttribute('href','https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
// fa.setAttribute('rel','stylesheet');
// fa.setAttribute('type','text/css');
// head.appendChild(fa);
//
// export function init(id) {
//     var content = `
// <style>
//     .k-caret {
//         display: inline-block;
//         width: 0;
//         height: 0;
//         margin-left: 2px;
//         vertical-align: middle;
//         border-top: 4px dashed;
//         border-top: 4px solid ;
//         border-right: 4px solid transparent;
//         border-left: 4px solid transparent;
//     }
//
//     #text-color{display: block;}
//     #bg-color{display: none}
//
//
//     #text{
//         float:left;
//         width:50%;
//         height: 40px; border-bottom: none;
//         border-top: 0.7px solid gray;
//         border-left: 0.7px solid gray;
//         border-right: 0.7px solid gray;
//         text-align:center;
//         font-size:13px;
//         display: inline-block;
//         background-color: white;
//         color: black;
//         border-radius: 5px 5px 0px 0px;
//     }
//     #background{
//         float:right;
//         width:50%;
//         height: 40px;
//         border: none; border-bottom: 0.7px solid gray;
//         text-align:center;
//         font-size:13px;
//         display: inline-block;
//         background-color: white;
//         color: gray;
//         border-radius: 5px 5px 0px 0px;
//     }
//     #text:hover{  cursor: pointer;  background-color:  #dce0e8 ; }
//     #background:hover{ cursor: pointer; background-color: #dce0e8  }
//     #text:focus{ outline:none;  }
//     #background:focus{ outline:none;  }
//
//     .tool-icon {
//         width: 38px;
//         height: 38px;
//         display: inline-block;
//         line-height: 38px;
//         /* font-size: 15px; */
//         text-align: center;
//         cursor: pointer;
//         border: none;
//         border-radius: 5px;
//         background: #fff;
//         margin: 0;
//     }
//     .tool-icon:hover{background-color:  #eff1f4}
//     .tool-icon:focus{outline: none; background-color: #dce0e8;}
//     .tool-icon:focus i{color: black}
//     .tool-icon i {
//         color: #aaaaaa;
//     }
//
//     .tool-icon:hover i{
//         color: #414141;
//     }
//     .tool-icon button{
//         color: #c9c9c9;
//     }
//
//     .tool-icon button:hover{
//         color: #414141;
//     }
//
//
//     .tools {
//         display: inline-block;
//         border-right: 1px solid #ebebeb;
//         /* padding: 0 5px 0 0; */
//     }
//
//
//
//
//     /* //////////////// */
//
//     .btn-grp {
//         border: 2px solid #efefef;
//         display: inline-block;
//     }
//
//
//
//
//
//     #align a:hover {
//         background: #aeb0b2;
//     }
//
//     .dropbtn {
//         padding: 10px;
//         background-color: transparent;
//         color: black;
//         font-size: 16px;
//         border: 1px solid transparent;
//     }
//
//     .dropdown-cont {
//         display: none;
//         position: absolute;
//         background-color: #f9f9f9;
//         min-width: 160px;
//         box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
//         z-index: 1;
//     }
//
//     .dropdown-cont a {
//         color: black;
//         padding: 12px 16px;
//         text-decoration: none;
//         display: block;
//     }
//
//     .abcd {
//         display: none;
//     }
//
//     .dropdown:hover .abcd {
//         display: block;
//     }
//
//     .dropdown:hover .dropbtn {
//         border: 1px solid silver;
//         background-color: white;
//     }
//
//     hr {
//         border-top: 1px solid #000;
//         width: 98%;
//     }
//
//
//
//     #quote-place {
//         position: absolute;
//     }
//
//     #cal1 {
//         position: absolute;
//         height: 0px;
//         width: 0px;
//         top: 100px;
//         left: 100px;
//         overflow: none;
//         z-index: -100;
//     }
//
//     #cal2 {
//         position: absolute;
//         height: 0px;
//         width: 0px;
//         top: 0px;
//         left: 0px;
//         overflow: none;
//         z-index: -100;
//     }
//
//     #Image,
//     #Video,
//     #Table {
//         width: 120px;
//         height: 38px;
//         display: inline-block;
//         line-height: 38px;
//         text-align: center;
//         cursor: pointer;
//     }
//
//
//     #editor-doc:focus {
//         outline: none;
//     }
//
//
//
//     .color-item {
//         cursor: pointer;
//         height: 18px;
//         width: 18px;
//         color: black;
//         /* padding: 12px 16px; */
//         text-decoration: none;
//         display: block;
//         margin-left: -1px;
//         border-radius: 50%;
//         margin: 5px;
//     }
//
//     .color-item:hover {
//         width: 22px;
//         height: 22px;
//         margin: 1px;
//         cursor: pointer;
//         border: none;
//     }
//
//     .color-box {
//         width: 297px;
//         height: auto;
//     }
//
//     .modal-title {
//         font-weight: 700;
//         font-size: 24px;
//         color: #333;
//     }
//
//     #row-content {
//         width: 100%;
//         margin: 0;
//     }
//
//     #shortTools {
//         /* margin-left: 15px;
//         margin-right: 15px; */
//     }
//
//     div.shortTool.tools {
//         border: none;
//         margin-right: 10px;
//         transition: ease-in-out 1s;
//         /* display: block; */
//         padding: 0;
//     }
//
//     .close-btn {
//         border: none;
//         background-color: #4bf442;
//         color: #fff;
//         padding-top: 12px;
//         padding-bottom: 12px;
//         padding-left: 12px;
//         padding-right: 12px;
//         cursor: pointer;
//     }
//
//     .close-btn:hover,
//     .close-btn:focus {
//         background-color: #4CAF50;
//     }
//
//     .tri-btns {
//         border: none;
//         color: #919191;
//     }
//
//     #kee-tool {
//         border-radius: 10px;
//         padding: 10px;
//         box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 7px 0px;
//         background: rgb(255, 255, 255);
//         z-index: 1;
//     }
//
//     .modal {
//         display: none; /* Hidden by default */
//         position: fixed; /* Stay in place */
//         z-index: 1!important; /* Sit on top */
//         padding-top: 100px!important; /* Location of the box */
//         left: 0;
//         top: 0;
//         width: 100%; /* Full width */
//         height: 100%; /* Full height */
//         overflow: auto; /* Enable scroll if needed */
//         background-color: rgb(0,0,0)!important; /* Fallback color */
//         background-color: rgba(0,0,0,0.3)!important; /* Black w/ opacity */
//     }
//
//     /* Modal Content */
//     .k-modal-content {
//         font-family: 'Montserrat', sans-serif;
//         border-radius:10px;
//         position: relative;
//         background-color: #fefefe;
//         margin: auto;
//         padding: 0;
//         width: 80%;
//         max-width:500px;
//         box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
//         -webkit-animation-name: animatetop;
//         -webkit-animation-duration: 0.4s;
//         animation-name: animatetop;
//         animation-duration: 0.4s
//     }
//
//     /* Add Animation */
//     @-webkit-keyframes animatetop {
//         from {opacity:0}
//         to {opacity:1}
//     }
//
//     @keyframes animatetop {
//         from {opacity:0}
//         to {opacity:1}
//     }
//
//     /* The Close Button */
//     .k-close {
//         color: black;
//         float: right;
//         font-size: 28px;
//         font-weight: bold;
//     }
//
//     .k-close:hover,
//     .k-close:focus {
//         color: #000;
//         text-decoration: none;
//         cursor: pointer;
//     }
//
//     .k-modal-header {
//         padding: 20px 16px;
//     }
//
//     .k-modal-body {
//         padding: 2px 16px;
//     }
//
//     .k-modal-footer {
//         padding: 2px 16px;
//     }
//     .k-modal-button {
//         padding:10px;
//         margin:10px 0 10px 10px;
//         outline:none;
//         border:none;
//         cursor:pointer;
//         border-radius:5px;
//     }
//
//     .k-button-green {
//         background:#4CAF50;
//         color:white;
//     }
//     .k-button-green:hover {
//         background: #009933;
//     }
//
//     .k-button-gray {
//         background:#888888;
//         color:white;
//     }
//     .k-button-gray:hover {
//         background: #AAAAAA;
//     }
//
//     .editor-button{
//         padding:10px 20px;
//         border-radius: 5px;
//         margin:0 3px 0 0;
//         border:none;
//         color:#aaaaaa;
//         background: none;
//     }
//     .editor-button:hover{
//         background: #cccccc;
//         color: #666666;
//         cursor: pointer;
//     }
//     .dropdown-font-family a,
//     .dropdown-paragraph-format a {
//         color: black;
//         padding: 5px 12px;
//         text-decoration: none;
//         display: block;
//     }
//
//
//
//     .dropdown-font-size a,
//     .dropdown-align a{
//         color: black;
//         padding: 0px;
//         text-decoration: none;
//         display: block;
//     }
//
//     .dropdown-font-family a:hover,
//     .dropdown-paragraph-format a:hover,
//     .dropdown-font-size a:hover,
//     .dropdown-align a:hover {
//         background: #ececec;
//     }
//
//
//     .dropdown-font-family,
//     .dropdown-paragraph-format,
//     .dropdown-font-size,
//     .dropdown-align {
//         display: none;
//         border-radius: 0px;
//         position: absolute;
//         padding: 0px;
//         background-color: #f9f9f9;
//         box-shadow:0px 4px 20px 3px rgba(0,0,0,0.15);
//         z-index: 1;
//         border-radius: 5px;
//     }
//
//
//
//
//     .dropdown-font-family {
//         top: 48px;
//         left:11px;
//         min-width: 100px;
//     }
//
//     .dropdown-paragraph-format {
//         top: 48px;
//         left:52.5px;
//         width: 290px;
//     }
//
//     .dropdown-font-size {
//         top: 48px;
//         left:136.5px;
//         padding: 0px;
//         min-width: 80px;
//     }
//
//
//     .dropdown-align {
//         top: 48px;
//         left:178.5px;
//         padding: 0px;
//         min-width: 80px;
//     }
//
//     .dropdown-color {
//         border-radius: 5px;
//         display: none;
//         position: absolute;
//         background: #fff;
//         z-index: 1;
//         top: 48px;
//         left: 95px;
//         box-shadow:0px 2px 20px 3px rgba(0,0,0,0.2);
//     }
//     .ui-resizable-ne,
//     .ui-resizable-se,
//     .ui-resizable-nw,
//     .ui-resizable-sw
//     {
//         background: white;
//         border: 1px solid black;
//         width: 9px !important;
//         height: 9px !important;
//     }
//     .ui-resizable-se
//     {
//         background-image: none !important;
//         right: -5px !important;
//         bottom: -5px !important;
//     }
//     .video-responsive{
//         // overflow:hidden;
//         padding-top: 0;
//         padding-left: 0;
//         padding-right: 0;
//         padding-bottom:56.25%;
//         position:relative;
//         // height:0;
//
//     }
//     .video-responsive iframe{
//         left:0;
//         top:0;
//         height:100%;
//         width:100%;
//         position:absolute;
//     }
// </style>
// <div width: 100%; height: auto'>
//         <div id="heading-editor">
//             <div id="editor-doc" onblur="onDivBlur();" onmousedown="return cancelEvent(event);" onclick="return cancelEvent(event);" contentEditable="true" onmouseup="saveSelection();" onkeyup="saveSelection();" onfocus="restoreSelection();">
//                    <p style="fontsize:20px">Keetool</p>
//             </div>
//             <div style="position:absolute;display:none;" id="kee-tool">
//                      <div class="tool-icon" title="Font Family" style = "z-index:2">
//                         <div>
//                             <button style="outline:none;" class="tool-icon" type="button" id='button-font-family' >
//                                 <i class="fa fa-font" style="fontsize:5px; display: inline"><span class="k-caret"></span></i>
//                             </button>
//                             <div class="dropdown-font-family">
//                                 <div onclick="formatDoc('fontname','Arial')">
//                                     <button style="font-family: Arial">Arial</button>
//                                 </div>
//                                 <div onclick="formatDoc('fontname','Arial Black')">
//                                     <button style="font-family: Georgia">Arial Black</button>
//                                 </div>
//                                 <div onclick="formatDoc('fontname','Courier New')">
//                                     <button style="font-family: Courier New">Courier New</button>
//                                 </div>
//                                 <div onclick="formatDoc('fontname','Time New Roman')">
//                                     <button style="font-family: Time New Roman">Time New Roman</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="tool-icon" title="Paragraph Format">
//                         <div          >
//                             <button class=" tool-icon" type="button" id='button-paragraph-format'>
//                                 <i class="fa fa-paragraph" style='display:inline'><span class="k-caret"></span></i>
//                             </button>
//                             <div class="dropdown-paragraph-format" >
//                                 <div onclick="formatDoc('p')">
//                                     <a href="#" title="Paragraph">
//                                         <p>Normal</p>
//                                     </a>
//                                 </div>
//                                 <div onclick="formatDoc('h1')">
//                                     <a href="#" title="Heading 1">
//                                         <h1>Heading 1</h1>
//                                     </a>
//                                 </div>
//                                 <div onclick="formatDoc('h2')">
//                                     <a href="#" title="Heading 2">
//                                         <h2>Heading 2</h2>
//                                     </a>
//                                 </div>
//                                 <div onclick="formatDoc('h3')">
//                                     <a href="#" title="Heading 3">
//                                         <h3>Heading 3</h3>
//                                     </a>
//                                 </div>
//                                 <div onclick="formatDoc('h4')">
//                                     <a href="#" title="Heading 4">
//                                         <h4>Heading 4</h4>
//                                     </a>
//                                 </div>
//                                 <div onclick="formatDoc('h5')">
//                                     <a href="#" title="Heading 5">
//                                         <h5>Heading 5</h5>
//                                     </a>
//                                 </div>
//                                 <div onclick="formatDoc('h6')">
//                                     <a href="#" title="Heading 6">
//                                         <h6>Heading 6</h6>
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div class="tool-icon" title="Color">
//                         <button style="outline:none; " class="tool-icon" id="button-color" type="button"><i style='display:inline' class="fa fa-tint"><span class="k-caret"></span></i></button>
//                         <div class=" dropdown-color">
//                             <div>
//                                 <button id='text' onclick='textColor()'> <b>Text Color</b></button>
//                                  <button id='background'  onclick='backgroundColor()'><b>Background</b></button>
//                             </div>
//
//
//                                 <div id="text-color" class="" >
//                                     <table>
//                                         <tr>
//                                         <td><a href="#" onclick="formatDoc('forecolor','indigo')" class='color-item' style="background-color: indigo" title="indigo"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','firebrick')" class="color-item" style="background-color:firebrick" title="firebrick"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','maroon')" class='color-item' style="background-color: maroon" title="maroon"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','darkslategray')" class='color-item' style="background-color:darkslategray" title="darkslategray"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','darkgreen')" class='color-item' style="background-color: darkgreen" title="darkgreen"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','mediumblue')" class='color-item' style="background-color: mediumblue" title="mediumblue"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','navy')" class='color-item' style="background-color: navy" title="navy"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','black')" class='color-item' style="background-color: black" title="black"></a></td>
//                                         </tr>
//                                         <tr>
//                                         <td><a href="#" onclick="formatDoc('forecolor','rebeccapurple')" class='color-item' style="background-color: rebeccapurple" title=" rebeccapurple"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','red')" class='color-item' style="background-color: red" title="red"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','chocolate')" class='color-item' style="background-color: chocolate" title="chocolate"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','olive')" class='color-item' style="background-color: olive" title="olive"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','green')" class='color-item' style="background-color: green" title="green"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','teal')" class='color-item' style="background-color: teal" title="teal"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','blue')" class='color-item' style="background-color: blue" title="blue"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','gray')" class='color-item' style="background-color: gray" title="gray"></a></td>
//                                         </tr>
//                                         <tr>
//                                         <td><a href="#" onclick="formatDoc('forecolor','mediumorchid')" class='color-item' style="background-color: mediumorchid" title="mediumorchid"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','deeppink')" class='color-item' style="background-color: deeppink" title="deeppink"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','darkorange')" class='color-item' style="background-color: darkorange" title=" darkorange"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','greenyellow')" class='color-item' style="background-color: greenyellow" title="greenyellow"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','mediumseagreen')" class='color-item' style="background-color: mediumseagreen" title="mediumseagreen"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','mediumturquoise')" class='color-item' style="background-color: mediumturquoise" title="mediumturquoise"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','royalblue')" class='color-item' style="background-color: royalblue" title="royalblue"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','lightslategrey')" class='color-item' style="background-color: lightslategrey" title="lightslategrey"></a></td>
//                                         </tr>
//                                         <tr>
//                                         <td><a href="#" onclick="formatDoc('forecolor','violet')" class='color-item' style="background-color: violet" title="violet"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','orchid')" class='color-item' style="background-color: orchid" title="orchid"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','gold')" class='color-item' style="background-color: gold" title="gold"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','yellow')" class='color-item' style="background-color: yellow" title="yellow"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','lime')" class='color-item' style="background-color: lime" title="lime"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','aqua')" class='color-item' style="background-color: aqua" title="aqua"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','skyblue')" class='color-item' style="background-color: skyblue " title="skyblue"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','lightgray')" class='color-item' style="background-color: lightgray" title="lightgray"></a></td>
//                                         </tr>
//                                         <tr>
//                                         <td><a href="#" onclick="formatDoc('forecolor','plum')" class='color-item' style="background-color: plum" title="plum"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','pink')" class='color-item' style="background-color: pink" title="pink"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','peachpuff')" class='color-item' style="background-color: peachpuff" title="peachpuff"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','khaki')" class='color-item' style="background-color: khaki" title="khaki"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','palegreen')" class='color-item' style="background-color: palegreen" title="palegreen"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','paleturquoise')" class='color-item' style="background-color: paleturquoise" title="paleturquoise"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','powderblue')" class='color-item' style="background-color: powderblue" title="powderblue"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','white')" class='color-item' style="background-color: #f4f8ff" title="white"></a></td>
//                                         </tr>
//                                     </table>
//                                 </div>
//                                 <div id="bg-color" class="">
//                                     <table>
//                                         <tr>
//                                         <td><a href="#" onclick="formatDoc('backcolor','indigo')" class='color-item' style="background-color: indigo " title="indigo"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','firebrick')" class="color-item" style="background-color:firebrick" title="firebrick"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','maroon')" class='color-item' style="background-color: maroon" title="maroon"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','darkslategray')" class='color-item' style="background-color:darkslategray" title="darkslategray"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','darkgreen')" class='color-item' style="background-color: darkgreen" title="darkgreen"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','mediumblue')" class='color-item' style="background-color: mediumblue" title="mediumblue"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','navy')" class='color-item' style="background-color: navy" title="navy"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','black')" class='color-item' style="background-color: black" title="black"></a></td>
//                                         </tr>
//                                         <tr>
//                                         <td><a href="#" onclick="formatDoc('backcolor','rebeccapurple')" class='color-item' style="background-color: rebeccapurple" title=" rebeccapurple"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','red')" class='color-item' style="background-color: red" title="red"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','chocolate')" class='color-item' style="background-color: chocolate" title="chocolate"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','olive')" class='color-item' style="background-color: olive" title="olive"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','green')" class='color-item' style="background-color: green" title="green"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','teal')" class='color-item' style="background-color: teal" title="teal"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','blue')" class='color-item' style="background-color: blue" title="blue"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','gray')" class='color-item' style="background-color: gray" title="gray"></a></td>
//                                         </tr>
//                                         <tr>
//                                         <td><a href="#" onclick="formatDoc('backcolor','mediumorchid')" class='color-item' style="background-color: mediumorchid" title="mediumorchid"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','deeppink')" class='color-item' style="background-color: deeppink" title="deeppink"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','darkorange')" class='color-item' style="background-color: darkorange" title=" darkorange"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','greenyellow')" class='color-item' style="background-color: greenyellow" title="greenyellow"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','mediumseagreen')" class='color-item' style="background-color: mediumseagreen" title="mediumseagreen"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','mediumturquoise')" class='color-item' style="background-color: mediumturquoise" title="mediumturquoise"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','royalblue')" class='color-item' style="background-color: royalblue" title="royalblue"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','lightslategrey')" class='color-item' style="background-color: lightslategrey" title="lightslategrey"></a></td>
//                                         </tr>
//                                         <tr>
//                                         <td><a href="#" onclick="formatDoc('backcolor','violet')" class='color-item' style="background-color: violet" title="violet"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','orchid')" class='color-item' style="background-color: orchid" title="orchid"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','gold')" class='color-item' style="background-color: gold" title="gold"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','yellow')" class='color-item' style="background-color: yellow" title="yellow"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','lime')" class='color-item' style="background-color: lime" title="lime"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','aqua')" class='color-item' style="background-color: aqua" title="aqua"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','skyblue')" class='color-item' style="background-color: skyblue " title="skyblue"></a></td>
//                                         <td><a href="#" onclick="formatDoc('forecolor','lightgray')" class='color-item' style="background-color: lightgray" title="lightgray"></a></td>
//                                         </tr>
//                                         <tr>
//                                         <td><a href="#" onclick="formatDoc('backcolor','plum')" class='color-item' style="background-color: plum" title="plum"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','pink')" class='color-item' style="background-color: pink" title="pink"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','peachpuff')" class='color-item' style="background-color: peachpuff" title="peachpuff"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','khaki')" class='color-item' style="background-color: khaki" title="khaki"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','palegreen')" class='color-item' style="background-color: palegreen" title="palegreen"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','paleturquoise')" class='color-item' style="background-color: paleturquoise" title="paleturquoise"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','powderblue')" class='color-item' style="background-color: powderblue" title="powderblue"></a></td>
//                                         <td><a href="#" onclick="formatDoc('backcolor','white')" class='color-item' style="background-color: #f4f8ff" title="white"></a></td>
//                                         </tr>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//
//
//
//                     <div class="tool-icon" title="Font Size">
//                         <div>
//                             <button class=" tool-icon" type="button" id='button-font-size'>
//                                 <i class="fa fa-text-height" style='display:inline'><span class="k-caret"></span></i>
//                             </button>
//                             <div class="dropdown-font-size" style="overflow-y: auto; height:200px;">
//                                 <div onclick="formatDoc('fontsize','1')">
//                                     <a href="#">1</a>
//                                 </div>
//                                 <div onclick="formatDoc('fontsize','2')">
//                                     <a href="#">2</a>
//                                 </div>
//                                 <div onclick="formatDoc('fontsize','3')">
//                                     <a href="#">3</a>
//                                 </div>
//                                 <div onclick="formatDoc('fontsize','4')">
//                                     <a href="#">4</a>
//                                 </div>
//                                 <div onclick="formatDoc('fontsize','5')">
//                                     <a href="#">5</a>
//                                 </div>
//                                 <div onclick="formatDoc('fontsize','6')">
//                                     <a href="#">6</a>
//                                 </div>
//                                 <div onclick="formatDoc('fontsize','7')">
//                                     <a href="#">7</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="tool-icon" title="Align" id="talign">
//                         <div>
//                             <button class="tool-icon" type="button"  id='button-align'>
//                                 <i class="fa fa-align-center" style='display:inline'><span class="k-caret"></span></i>
//                             </button>
//                             <div class="dropdown-align" >
//                                 <div onclick="formatDoc('justifyLeft')">
//                                     <a href="#" title="Align left">
//                                         <i  style='color:black' class="fa fa-align-left"  aria-hidden="true"></i>
//                                     </a>
//                                 </div>
//                                 <div onclick="formatDoc('justifyCenter')">
//                                     <a href="#" title="Align center">
//                                         <i style='color:black' class="fa fa-align-center" aria-hidden="true"></i>
//                                     </a>
//                                 </div>
//                                 <div onclick="formatDoc('justifyRight')">
//                                     <a href="#" title="Align right">
//                                         <i style='color:black' class="fa fa-align-right" aria-hidden="true"></i>
//                                     </a>
//                                 </div>
//                                 <div onclick="formatDoc('justifyFull')">
//                                     <a href="#" title="Align justify">
//                                         <i style='color:black' class="fa fa-align-justify" aria-hidden="true"></i>
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     <button class="tool-icon" title="Show More" id="show" onclick="showmore()">
//
//                             <i class="fa fa-plus" aria-hidden="true"></i>
//
//                     </button>
//
//                     <div id="sub-tools">
//
//                         <button class="tool-icon" title="Ordered List" onclick="formatDoc('insertUnorderedList')">
//
//                                 <i class='fa fa-list-ul'></i>
//
//                         </button>
//                         <button class="tool-icon" title="Unordered List" onclick="formatDoc('insertOrderedList')">
//
//                                 <i class='fa fa-list-ol'></i>
//
//                         </button>
//                         <button class="tool-icon" title="Decrease Indent (Ctrl+Z)" onclick="formatDoc('outdent')">
//
//                                 <i class='fa fa-outdent'></i>
//
//                         </button>
//                         <button class="tool-icon" title="Increase Indent (Tab)" onclick="formatDoc('indent')">
//
//                                 <i class='fa fa-indent'></i>
//
//                         </button>
//                         <button class="tool-icon" title="Hide" onclick="showoff()">
//
//                                 <i class="fa fa-minus" aria-hidden="true"></i>
//
//                         </button>
//                     </div>
//             </div>
//         </div>
//         <div id="shortTools" class="row">
//             <div class="tools shortTool" >
//
//               <button id="myBtnImg" type="button" class="editor-button" style="display: flex; outline: none;">
//                 <i class="fa fa-camera"  aria-hidden="true"></i>
//
//               </button>
//
//             </div>
//             <div class="tools shortTool">
//
//               <button  id="myBtnVid"  type="button"  class="editor-button" style="display: flex; outline: none; ">
//                     <i class="fa fa-video-camera" aria-hidden="true"></i>
//
//               </button>
//
//             </div>
//             <div class="tools shortTool">
//               <button id="myBtnLink"  type="button"  class="editor-button" style="display: flex; outline: none;">
//                 <i class="fa fa-link" aria-hidden="true"></i>
//               </button>
//
//             </div>
//             <div class="tools shortTool">
//                 <button id="showCode" type="button"  class="editor-button" data-toggle="modal" style="display: flex; outline: none;">
//                    <i class="fa fa-code" aria-hidden="true"></i>
//
//
//                   </button>
//             </div>
//         </div>
//           </div>
//     </div>
//     <div id="myModalImg" class="modal">
//     <div class="k-modal-content">
//         <div class="k-modal-header">
//             <button type="button" class="close k-close-modal" data-dismiss="modal">&times;</button>
//             <h3>Chèn ảnh</h3>
//         </div>
//         <div class="k-modal-body">
//             <div style="border:solid 1px #dfdfdf; padding:10px;">
//                 <input id="data-img" type="text" placeholder="URL" style=" outline:none; border:none; width:100%"/>
//             </div>
//         </div>
//         <div class="k-modal-footer">
//             <div style="display:none;" id="percent" class="form-group">
//                 <div style="height:20px;width:100%;margin:0 auto;" class="progress">
//                     <div class="progress-bar progress-bar-success myprogress" role="progressbar" style="width:0%;font-size:10px;line-height:20px;background: green">0%</div>
//                 </div>
//             </div>
//             <div style="display:flex;flex-direction:row-reverse">
//                 <input onchange="uploadImg()" type="file" id="myFile" name="myFile" style="display:none">
//                 <button onclick='insertImg()' class="k-modal-button k-button-green">Ok</button>
//                 <button onclick="document.getElementById('myFile').click()" class="k-modal-button k-button-gray">Upload</button>
//             </div>
//         </div>
//     </div>
// </div>
// <div id="myModalVid" class="modal">
//     <div class="k-modal-content">
//         <div class="k-modal-header">
//             <button type="button" class="close k-close-modal" data-dismiss="modal">&times;</button>
//             <h3>Chèn Video</h3>
//         </div>
//         <div class="k-modal-body">
//             <div style="border:solid 1px #dfdfdf; padding:10px;">
//                 <input id="data-video" type="text" placeholder="URL" style=" outline:none; border:none; width:100%"/>
//             </div>
//         </div>
//         <div class="k-modal-footer">
//             <div style="display:flex;flex-direction:row-reverse">
//                 <button onclick="insertVideo()" class="k-modal-button k-button-green">Ok</button>
//             </div>
//         </div>
//     </div>
// </div>
// <div id="myModalLink" class="modal">
//     <div class="k-modal-content">
//         <div class="k-modal-header">
//             <button type="button" class="close k-close-modal" data-dismiss="modal">&times;</button>
//             <h3>Chèn Link</h3>
//         </div>
//         <div class="k-modal-body">
//             <div style="border:solid 1px #dfdfdf; padding:10px;">
//                 <input id="data-link" type="text" placeholder="URL" style=" outline:none; border:none; width:100%"/>
//             </div>
//         </div>
//         <div class="k-modal-footer">
//             <div style="display:flex;flex-direction:row-reverse">
//                 <button onclick="formatDoc('createLink')" class="k-modal-button k-button-green">Ok</button>
//             </div>
//         </div>
//     </div>
// </div>
//     <div id="cal1">&nbsp;</div>
//     <div id="cal2">&nbsp;</div>
// `;
//
//
//     var editor = document.getElementById(id);
//     editor.innerHTML += content;
//
//     //Set cursor at the end
//     var elem = document.getElementById("editor-doc");
//     function setEndOfContenteditable(contentEditableElement) {
//         var range, selection;
//         if (document.createRange) //Firefox, Chrome, Opera, Safari, IE 9+
//         {
//             range = document.createRange(); //Create a range (a range is a like the selection but invisible)
//             range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
//             range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
//             selection = window.getSelection(); //get the selection object (allows you to change selection)
//             selection.removeAllRanges(); //remove any selections already made
//             selection.addRange(range); //make the range you have just created the visible selection
//         } else if (document.selection) //IE 8 and lower
//         {
//             range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
//             range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
//             range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
//             range.select(); //Select the range (make it the visible selection
//         }
//     }
//
//
//
//     //Insert function
//     window.formatDoc = function (sCmd, sValue) {
//         // console.log("1");
//         if (sCmd == 'h1' || sCmd == 'h2' || sCmd == 'h3' || sCmd == 'h4' || sCmd == 'h5' || sCmd == 'h6' || sCmd ==
//             'p') {
//             document.execCommand('formatBlock', false, sCmd);
//
//         } else if (sCmd == 'createLink') {
//             setEndOfContenteditable(elem);
//             var data = document.getElementById('data-link').value;
//             document.execCommand(sCmd, true, data);
//             document.getElementById.value = "";
//             // $('#kee-tool').css('dislay', 'none');
//             document.getElementById('kee-tool').style.display = "none";
//
//         } else if (sCmd === 'backcolor' || sCmd === 'forecolor') {
//             // console.log(1);
//             // console.log(sCmd);
//             // console.log(sValue);
//             document.execCommand(sCmd, true, sValue);
//         } else {
//             if (document.queryCommandSupported(sCmd) == false) {
//                 alert('The command ' + sCmd + ' is not support your browser');
//                 // console.log('hello');
//             } else {
//                 document.getElementsByClassName('dropdown-font-family')[0].style.display = "none";
//                 document.getElementsByClassName('dropdown-paragraph-format')[0].style.display = "none";
//                 document.getElementsByClassName('dropdown-color')[0].style.display = "none";
//                 document.getElementsByClassName('dropdown-font-size')[0].style.display = "none";
//                 document.getElementsByClassName('dropdown-align')[0].style.display = "none";
//                 ele.style.display = 'none';
//                 // console.log(1);
//                 document.execCommand(sCmd, false, sValue);
//                 // console.log('hello22');
//                 // console.log(document.queryCommandSupported(sCmd));
//             }
//         }
//         selectingText();
//
//     }
//
//
//     //Insert Images
//     window.insertImg = function (img) {
//         elem = document.getElementById('editor-doc'); //This is the element that you want to move the caret to the end of
//         setEndOfContenteditable(elem);
//         var url = document.getElementById('data-img').value;
//         var inputUrl = url;
//         // url = "<img class=\"child\" src=\"" + inputUrl + "\" width=100% height=auto>";
//         url = "<img class=\"child\" src=\"" + inputUrl + "\">";
//         console.log("url:" + inputUrl);
//         if (inputUrl) {
//             document.execCommand("insertHTML", false, url);
//             document.getElementById('data-img').value = "";
//         }
//     }
//
//
//
//     //Insert Video
//     window.insertVideo = function () {
//         elem = document.getElementById('editor-doc'); //This is the element that you want to move the caret to the end of
//         setEndOfContenteditable(elem);
//         sVideo = document.getElementById('data-video').value;
//         var inputVideoURL = sVideo;
//         console.log("url: " + inputVideoURL);
//         // sVideo = prompt('Link here');
//         var check = sVideo.substr(1, 6);
//         // console.log(sVideo);
//         // console.log(check);
//         if (inputVideoURL) {
//             if (check === "iframe") {
//                 sVideo = "<div class=\"video-responsive\">" + sVideo + "</div>";
//                 document.execCommand("insertHTML", false, sVideo);
//                 document.getElementById('data-video').value = "";
//                 setEndOfContenteditable(elem);
//                 document.getElementById('editor-doc').appendChild(document.createElement('br'));
//             } else {
//                 var idVideo = sVideo.substr(32, sVideo.length - 1);
//                 stringVideo = "https://www.youtube.com/embed/" + idVideo;
//                 var widthVideo = document.getElementById('editor-doc').offsetWidth;
//                 var heightVideo = 0.5625 * widthVideo;
//                 sVideo = "<div class=\"video-responsive\"><iframe width=" + widthVideo + "\" height=" + heightVideo + " src=\"" + stringVideo + "\" frameborder=\"0\" webkitallowfullscreen=\"\" mozallowfullscreen=\"\" allowfullscreen=\"\" __idm_id__=\"189403137\"></iframe></div>"
//                 // console.log(sVideo);
//                 document.execCommand("insertHTML", false, sVideo);
//                 document.getElementById('data-video').value = "";
//                 setEndOfContenteditable(elem);
//                 document.getElementById('editor-doc').appendChild(document.createElement('br'));
//             }
//         }
//     }
//
//     //Remove parent div of video
//     window.addEventListener('keyup',function(){
//         // var data = $('.embed-container').html();
//         var data = document.getElementsByClassName('video-responsive');
//         console.log(data);
//         for(let i = 0; i < data.length; i++){
//             if (data[i].innerText === "\n") {
//                 console.log(2);
//                 // $(this).remove();
//                 data[i].parentNode.removeChild(data[i]);
//             }
//         }
//     })
//
//     // https://www.youtube.com/watch?v=ew1TpesH-jw
//     // <iframe width="560" height="315" src="https://www.youtube.com/embed/ew1TpesH-jw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
//     // 56.25
//     // height = 56.25% width
//
//
//     //Paste as plain text
//     var ed = document.querySelector("#editor-doc");
//     // console.log(ed);
//     ed.addEventListener("paste", function (e) {
//         // console.log(1);
//         e.preventDefault();
//         var text = e.clipboardData.getData("text/plain");
//         // console.log(text);
//         document.execCommand("insertHTML", false, text);
//     });
//
//
//     //Show code
//     var flag = 1;
//     var data = document.getElementById('editor-doc');
//     // console.log(data.innerHTML);
//     // $('#showCode').click(function (e) {
//     //     e.preventDefault();
//     //     if (flag === 1) {
//     //         document.getElementById('editor-doc').innerText = data.innerHTML.trim();
//     //         flag = 0;
//     //     } else {
//     //         document.getElementById('editor-doc').innerHTML = data.innerText.trim();
//     //         flag = 1;
//     //     }
//     // });
//
//     document.getElementById('showCode').addEventListener('click', function(e){
//         e.preventDefault();
//         if (flag === 1) {
//             document.getElementById('editor-doc').innerText = data.innerHTML.trim();
//             flag = 0;
//         } else {
//             document.getElementById('editor-doc').innerHTML = data.innerText.trim();
//             flag = 1;
//         }
//     })
//
//     function getSelected() {
//         if (window.getSelection) {
//             console.log('selected');
//             return window.getSelection();
//         } else if (document.getSelection) {
//             console.log('selected');
//             return document.getSelection();
//         } else {
//             var selection = document.selection && document.selection.createRange();
//             if (selection.text) {
//                 console.log('selected');
//                 return selection.text;
//             }
//             return false;
//         }
//         return false;
//     }
//
//     //Selection text
//     var ele = document.getElementById('kee-tool');
//     var sel = window.getSelection();
//     var rel1 = document.createRange();
//     rel1.selectNode(document.getElementById('cal1'));
//     var rel2 = document.createRange();
//     rel2.selectNode(document.getElementById('cal2'));
//     document.getElementById('editor-doc').addEventListener('mouseup', function (event) {
//         event.stopPropagation();
//         if (!sel.isCollapsed) {
//             //debugger;
//             var r = sel.getRangeAt(0).getBoundingClientRect();
//             var rb1 = rel1.getBoundingClientRect();
//             var rb2 = rel2.getBoundingClientRect();
//             ele.style.top = (r.bottom - rb2.top) * 100 / (rb1.top - rb2.top) + 'px'; //this will place ele below the selection
//             ele.style.left = ((r.left - rb2.left + 10) * 100 / (rb1.left - rb2.left)) + 'px'; //this will align the right edges together
//             //code to set content
//
//             ele.style.display = 'block';
//         }
//     });
//
//     // $(window).resize(function () {
//     //     ele.style.display = 'none';
//     // });
//     window.onresize = function (e) {
//         ele.style.display = "none";
//     }
//
//
//     // $('body').mousedown(function () {
//     //     $('#kee-tool').hover(function () {
//     //         // over
//
//     //     }, function () {
//     //         $('.dropdown-font-family').hide();
//     //         $('.dropdown-paragraph-format').hide();
//     //         $('.dropdown-color').hide();
//     //         $('.dropdown-font-size').hide();
//     //         $('.dropdown-align').hide();
//
//     //         ele.style.display = 'none';
//     //     });
//     // });
//
//     if(window.addEventListener) {
//         document.getElementsByTagName('body')[0].addEventListener('click',function(e){
//             e.preventDefault;
//             document.getElementById('kee-tool').addEventListener('mouseleave', function(e){
//
//                 // e.preventDefault;
//                 document.getElementsByClassName('dropdown-font-family')[0].style.display = "none";
//                 document.getElementsByClassName('dropdown-paragraph-format')[0].style.display = "none";
//                 document.getElementsByClassName('dropdown-color')[0].style.display = "none";
//                 document.getElementsByClassName('dropdown-font-size')[0].style.display = "none";
//                 document.getElementsByClassName('dropdown-align')[0].style.display = "none";
//                 // console.log(1);
//                 ele.style.display = 'none';
//             })
//         })
//     }
//     else if(window.attachEvent) {
//         document.getElementsByTagName('body').attachEvent('onclick',function(e){
//             e.preventDefault;
//             document.getElementById('kee-tool').addEventListener('onmouseleave', function(){
//                 document.getElementsByClassName('dropdown-font-family')[0].style.display = "none";
//                 document.getElementsByClassName('dropdown-paragraph-format')[0].style.display = "none";
//                 document.getElementsByClassName('dropdown-color')[0].style.display = "none";
//                 document.getElementsByClassName('dropdown-font-size')[0].style.display = "none";
//                 document.getElementsByClassName('dropdown-align')[0].style.display = "none";
//                 // console.log(1);
//                 ele.style.display = 'none';
//             })
//         })
//     }
//
//
//     function selectingText() {
//         if (!sel.isCollapsed) {
//             //debugger;
//             var r = sel.getRangeAt(0).getBoundingClientRect();
//             var rb1 = rel1.getBoundingClientRect();
//             var rb2 = rel2.getBoundingClientRect();
//             ele.style.top = (r.bottom - rb2.top) * 100 / (rb1.top - rb2.top) + 'px'; //this will place ele below the selection
//             ele.style.left = ((r.left - rb2.left + 10) * 100 / (rb1.left - rb2.left)) + 'px'; //this will align the right edges together
//             //code to set content
//
//             ele.style.display = 'block';
//         }
//     }
//
//
//     // $('body').mousedown(function (e) {
//     //     if (e.which == 1) {
//     //         console.log(e.pageX + " / " + e.pageY);
//     //     }
//     // });
//
//     document.getElementsByTagName('body')[0].addEventListener('mousedown', function (e) {
//         if (e.which == 1) {
//             console.log(e.pageX + " / " + e.pageY);
//         }
//     })
//
//
//     // //Set cursor position
//     // $.fn.setCursorPosition = function (pos) {
//     //     this.each(function (index, elem) {
//     //         if (elem.setSelectionRange) {
//     //             elem.setSelectionRange(pos, pos);
//     //         } else if (elem.createTextRange) {
//     //             var range = elem.createTextRange();
//     //             range.collapse(true);
//     //             range.moveEnd('character', pos);
//     //             range.moveStart('character', pos);
//     //             range.select();
//     //         }
//     //     });
//     //     return this;
//     // };
//
//
//     // $(document).ready(function () {
//     //     $("#sub-tools").hide();
//     //     $("#talign").hide();
//     // });
//
//     document.getElementById('sub-tools').style.display = 'none';
//     document.getElementById('talign').style.display = 'none';
//
//
//
//     window.showmore = function (event) {
//         document.getElementsByClassName('dropdown-font-family')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-paragraph-format')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-color')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-font-size')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-align')[0].style.display = "none";
//
//
//         // console.log(1);
//         // $("#sub-tools").show();
//         // $("#show").hide();
//         // $("#talign").show();
//         document.getElementById('sub-tools').style.display = "block";
//         document.getElementById('talign').style.display = "inline-block";
//         document.getElementById('show').style.display = "none";
//
//     };
//
//     window.showoff = function (event) {
//         document.getElementsByClassName('dropdown-font-family')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-paragraph-format')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-color')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-font-size')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-align')[0].style.display = "none";
//
//         // console.log(1);
//         // $("#sub-tools").show();
//         // $("#show").hide();
//         // $("#talign").show();
//         document.getElementById('sub-tools').style.display = "none";
//         document.getElementById('talign').style.display = "block";
//         document.getElementById('show').style.display = "block";
//     };
//
//     // $(document).ready(function () {
//     //     $('#editor-doc').focus();
//     // });
//
//
//     // $(window).on('load', function () {
//     //     var elem = document.getElementById('editor-doc'); //This is the element that you want to move the caret to the end of
//     //     setEndOfContenteditable(elem);
//     // });
//
//
//     // window.onload = function(){
//     //     var elem = document.getElementById('editor-doc'); //This is the element that you want to move the caret to the end of
//     //     setEndOfContenteditable(elem);
//     // }
//
//
//
//     //editor always has cursor if null data
//     // $('#editor-doc').keydown(function (e) {
//     //     // console.log(1);
//     //     var elem = document.getElementById('editor-doc');
//     //     var data = document.getElementById('editor-doc').innerText;
//     //     if (data === "\n") {
//     //         setEndOfContenteditable(elem);
//     //         console.log(1);
//     //         $('#editor-doc').hover(function () {
//     //             setEndOfContenteditable(elem);
//     //         });
//     //     }
//     // });
//     document.getElementById('editor-doc').addEventListener('keydown', function(){
//         var elem = document.getElementById('editor-doc');
//         var data = document.getElementById('editor-doc').innerText;
//         if (data === "\n") {
//             setEndOfContenteditable(elem);
//             console.log(1);
//             document.getElementById('editor-doc').addEventListener('mouseover', function(){
//                 setEndOfContenteditable(elem);
//             })
//             // $('#editor-doc').hover(function () {
//             //     setEndOfContenteditable(elem);
//             // });
//         }
//     })
//     // // Something else
//     // function setCaret(line, col) {
//     //     var ele = document.getElementById("editable");
//     //     var rng = document.createRange();
//     //     var sel = window.getSelection();
//     //     rng.setStart(ele.childNodes[line], col);
//     //     rng.collapse(true);
//     //     sel.removeAllRanges();
//     //     sel.addRange(range);
//     //     ele.focus();
//     // }
//
//     // //Press tab button
//     // function insertTab() {
//     //     if (!window.getSelection) return;
//     //     const sel = window.getSelection();
//     //     if (!sel.rangeCount) return;
//     //     const range = sel.getRangeAt(0);
//     //     range.collapse(true);
//     //     const span = document.createElement('span');
//     //     span.appendChild(document.createTextNode('\t'));
//     //     span.style.whiteSpace = 'pre';
//     //     range.insertNode(span);
//     //     // Move the k-caret immediately after the inserted span
//     //     range.setStartAfter(span);
//     //     range.collapse(true);
//     //     sel.removeAllRanges();
//     //     sel.addRange(range);
//     // }
//
//     // $(document).on('keydown', '#editor-doc', function (e) {
//     //     if (e.keyCode == 9) {
//     //         // alert(1);
//     //         insertTab();
//     //         e.preventDefault()
//     //     }
//     // });
//
//
//
//
//     // $('#text-color a').click(function (e) {
//     //     e.preventDefault();
//     //     $('.dropdown-color').hide();
//     // });
//     var eleColor = document.getElementsByClassName("dropdown-color")[0].querySelectorAll("a");
//     for(let i = 0; i < eleColor.length; i++){
//         eleColor[i].addEventListener('click', function(e){
//             e.preventDefault();
//             // $('.dropdown-color').hide();
//             document.getElementsByClassName('dropdown-color')[0].style.display = "";
//             ele.style.display = 'none';
//         })
//     }
//
//
//     // Get the modal
//     var modalImg = document.getElementById('myModalImg');
//
//     // Get the button that opens the modal
//     var btnImg = document.getElementById("myBtnImg");
//
//     // Get the <span> element that closes the modal
//
//     btnImg.onclick = function () {
//         modalImg.style.display = "block";
//     }
//
//
//
//
//
//     // Get the modal
//     var modalVid = document.getElementById('myModalVid');
//
//     // Get the button that opens the modal
//     var btnVid = document.getElementById("myBtnVid");
//
//     // Get the <span> element that closes the modal
//
//     btnVid.onclick = function () {
//         modalVid.style.display = "block";
//     }
//
//
//     // Get the modal
//     var modalLink = document.getElementById('myModalLink');
//
//     // Get the button that opens the modal
//     var btnLnk = document.getElementById("myBtnLink");
//
//     // Get the <span> element that closes the modal
//
//     btnLnk.onclick = function () {
//         modalLink.style.display = "block";
//     }
//
//
//
//
//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function (event) {
//         if (event.target == modalImg) {
//             modalImg.style.display = "none";
//         }
//         if (event.target == modalVid) {
//             modalVid.style.display = "none";
//         }
//         if (event.target == modalLink) {
//             modalLink.style.display = "none";
//         }
//     }
//     //esc
//
//     document.addEventListener('keyup', function (e) {
//         if (e.keyCode == 27) {
//             modalVid.style.display = "none";
//             modalImg.style.display = "none";
//             modalLink.style.display = "none";
//         } // esc
//     })
//
//     // $(document).keyup(function (e) {
//     //     if (e.keyCode == 27) {
//     //         modalVid.style.display = "none";
//     //         modalImg.style.display = "none";
//     //         modalLink.style.display = "none";
//     //     } // esc
//     // });
//
//     var close = document.getElementsByClassName('k-close-modal');
//     var accept = document.getElementsByClassName('k-button-green');
//
//     for(let i = 0; i < close.length; i++){
//         close[i].addEventListener('click', function(e){
//             e.preventDefault();
//             modalVid.style.display = "none";
//             modalImg.style.display = "none";
//             modalLink.style.display = "none";
//         })
//     }
//
//     for(let i = 0; i < accept.length; i++){
//         accept[i].addEventListener('click', function (e) {
//             e.preventDefault();
//             modalVid.style.display = "none";
//             modalImg.style.display = "none";
//             modalLink.style.display = "none";
//         })
//     }
//
//     function fadeIn(el) {
//         el.style.opacity = 0;
//
//         var last = +new Date();
//         var tick = function() {
//             el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
//             last = +new Date();
//
//             if (+el.style.opacity < 1) {
//                 (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
//             }
//         };
//
//         tick();
//     }
//
//
//     window.backgroundColor = function () {
//         // $('#text-color').css('display', 'none');
//         document.getElementById('text-color').style.display = "";
//         fadeIn(document.getElementById('bg-color'));
//         // $('#bg-color').fadeIn();
//         document.getElementById('background').style.border = "none";
//         document.getElementById('background').style.borderTop = "0.7px solid gray";
//         document.getElementById('background').style.borderRight = "0.7px solid gray";
//         document.getElementById('background').style.borderLeft = "0.7px solid gray";
//         document.getElementById('background').style.color = "black";
//         // $('#background').css({
//         //     'border': 'none',
//         //     'border-top': '0.7px solid gray',
//         //     'border-right': '0.7px solid gray',
//         //     'border-left': '0.7px solid gray',
//         //     'color': 'black'
//         // });
//
//         document.getElementById('text').style.border = "none";
//         document.getElementById('text').style.borderBottom = "0.7px solid gray";
//         document.getElementById('text').style.color = "gray";
//         // $('#text').css({
//         //     'border': 'none',
//         //     'border-bottom': '0.7px solid gray',
//         //     'color': 'gray'
//         // });
//     }
//
//
//     window.textColor = function () {
//         // $('#text-color').fadeIn();
//         // $('#bg-color').css('display', 'none');
//         // $('#text').css({
//         //     'border': 'none',
//         //     'border-top': '0.7px solid gray',
//         //     'border-right': '0.7px solid gray',
//         //     'border-left': '0.7px solid gray',
//         //     'color': 'black'
//         // });
//         // $('#background').css({
//         //     'border': 'none',
//         //     'border-bottom': '0.7px solid gray',
//         //     'color': 'gray'
//         // });
//         document.getElementById('background').style.display = "";
//         fadeIn(document.getElementById('text-color'));
//         // $('#bg-color').fadeIn();
//         document.getElementById('background').style.border = "none";
//         document.getElementById('background').style.borderBottom = "0.7px solid gray";
//         document.getElementById('background').style.color = "black";
//
//         document.getElementById('text').style.border = "none";
//         document.getElementById('text').style.borderTop = "0.7px solid gray";
//         document.getElementById('text').style.borderRight = "0.7px solid gray";
//         document.getElementById('text').style.borderLeft = "0.7px solid gray";
//         document.getElementById('text').style.color = "gray";
//     }
//
//
//
//     // window.buttonColor = function () {
//     //     $('#font-family').css('display', 'none');
//     //     $('.paragraph-format').css('display', 'none');
//     // }
//
//
//     document.getElementById('button-font-family').addEventListener('click', function () {
//         console.log(1);
//         if(getComputedStyle(document.getElementsByClassName('dropdown-font-family')[0])["display"] == "none"){
//             document.getElementsByClassName('dropdown-font-family')[0].style.display = "block";
//         }else{
//             document.getElementsByClassName('dropdown-font-family')[0].style.display = "none";
//         }
//         document.getElementsByClassName('dropdown-paragraph-format')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-color')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-font-size')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-align')[0].style.display = "none";
//     });
//
//
//     document.getElementById('button-paragraph-format').addEventListener('click', function () {
//         document.getElementsByClassName('dropdown-font-family')[0].style.display = "none";
//         if(getComputedStyle(document.getElementsByClassName('dropdown-paragraph-format')[0])["display"] == "none"){
//             document.getElementsByClassName('dropdown-paragraph-format')[0].style.display = "block";
//         }else{
//             document.getElementsByClassName('dropdown-paragraph-format')[0].style.display = "none";
//         }
//         document.getElementsByClassName('dropdown-color')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-font-size')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-align')[0].style.display = "none";
//     });
//
//
//     document.getElementById('button-color').addEventListener('click', function () {
//         document.getElementsByClassName('dropdown-font-family')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-paragraph-format')[0].style.display = "none";
//         if(getComputedStyle(document.getElementsByClassName('dropdown-color')[0])["display"] == "none"){
//             document.getElementsByClassName('dropdown-color')[0].style.display = "block";
//         }else{
//             document.getElementsByClassName('dropdown-color')[0].style.display = "none";
//         }
//         document.getElementsByClassName('dropdown-font-size')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-align')[0].style.display = "none";
//     });
//
//     document.getElementById('button-font-size').addEventListener('click', function () {
//         document.getElementsByClassName('dropdown-font-family')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-paragraph-format')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-color')[0].style.display = "none";
//         if(getComputedStyle(document.getElementsByClassName('dropdown-font-size')[0])["display"] == "none"){
//             document.getElementsByClassName('dropdown-font-size')[0].style.display = "block";
//         }else{
//             document.getElementsByClassName('dropdown-font-size')[0].style.display = "none";
//         }
//         document.getElementsByClassName('dropdown-align')[0].style.display = "none";
//     });
//
//
//     document.getElementById('button-align').addEventListener('click', function () {
//         document.getElementsByClassName('dropdown-font-family')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-paragraph-format')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-color')[0].style.display = "none";
//         document.getElementsByClassName('dropdown-font-size')[0].style.display = "none";
//         if(getComputedStyle(document.getElementsByClassName('dropdown-align')[0])["display"] == "none"){
//             document.getElementsByClassName('dropdown-align')[0].style.display = "block";
//         }else{
//             document.getElementsByClassName('dropdown-align')[0].style.display = "none";
//         }
//     });
//
//
//
//
//
//
//     //insert <p></p> if content null
//     var editable = document.getElementById('editor-doc');
//     editable.addEventListener('input', function () {
//         // console.log(1);
//         var data = document.getElementById('editor-doc').innerHTML;
//         if (data == "") {
//             document.getElementById('editor-doc').innerHTML = "<p><br/></p>"
//         }
//     });
//
//     //Upload local img
//     window.uploadImg = function () {
//         var image = new FormData();
//         var file = document.getElementById('myFile').files[0];
//         console.log("x", file);
//         image.append('image', file);
//         console.log(image);
//
//         var request = new XMLHttpRequest();
//         request.open('POST', 'http://keetool.xyz/api/v3/upload-image-public', true);
//
//         request.upload.onprogress = function(e) {
//             // $('#percent').show();
//             document.getElementById('percent').style.display = "block";
//             if (e.lengthComputable) {
//                 var percentComplete = e.loaded / e.total;
//                 percentComplete = parseInt(percentComplete * 100);
//                 // console.log(document.getElementsByClassName("myprogress")[0].textContent);
//                 document.getElementsByClassName("myprogress")[0].textContent = percentComplete + "%";
//                 // $('.myprogress').text(percentComplete + '%');
//                 document.getElementsByClassName("myprogress")[0].style.width = percentComplete + "%";
//                 // $('.myprogress').css('width', percentComplete + '%');
//                 // console.log(document.getElementsByClassName("myprogress")[0].style.width);
//             }
//         };
//
//         request.onload = function() {
//             if (this.status == 200) {
//                 var data = JSON.parse(this.response);
//                 console.log('Server got:', data.link);
//                 // $('#percent').hide();
//                 document.getElementById('percent').style.display = "none";
//                 modalVid.style.display = "none";
//                 modalImg.style.display = "none";
//                 modalLink.style.display = "none";
//                 // console.log(data);
//                 elem = document.getElementById('editor-doc'); //This is the element that you want to move the caret to the end of
//                 setEndOfContenteditable(elem);
//                 var url = "<div><img src=\"" + data.link + "\" width=100% height=auto></div>";
//                 // console.log(url);
//                 // console.log(data.link);
//                 document.execCommand('insertHTML', false, url.trim());
//             };
//         };
//         request.send(image);
//
//
//
//         // $.ajax({
//         //     type: 'POST',
//         //     url: "http://keetool.xyz/api/v3/upload-image-public",
//         //     data: image,
//         //     cache: false,
//         //     contentType: false,
//         //     processData: false,
//         //     dataType: "json",
//         //     //progress bar
//         //     xhr: function () {
//         //         $('#percent').show();
//         //         var xhr = new window.XMLHttpRequest();
//         //         xhr.upload.addEventListener("progress", function (evt) {
//         //             if (evt.lengthComputable) {
//         //                 var percentComplete = evt.loaded / evt.total;
//         //                 percentComplete = parseInt(percentComplete * 100);
//         //                 $('.myprogress').text(percentComplete + '%');
//         //                 $('.myprogress').css('width', percentComplete + '%');
//         //             }
//         //         }, false);
//         //         return xhr;
//         //     },
//         //     success: function (data) {
//         //         $('#percent').hide();
//         //         modalVid.style.display = "none";
//         //         modalImg.style.display = "none";
//         //         modalLink.style.display = "none";
//         //         console.log("success");
//         //         // console.log(data);
//         //         var i = document.getElementById("editor-doc");
//         //         elem = document.getElementById('editor-doc'); //This is the element that you want to move the caret to the end of
//         //         setEndOfContenteditable(elem);
//         //         var url = "<div><img src=\"" + data.link + "\" width=100% height=auto></div>";
//         //         // console.log(url);
//         //         // console.log(data.link);
//         //         document.execCommand('insertHTML', false, url.trim());
//         //     },
//         //     error: function (data) {
//         //         console.log("error");
//         //         console.log(data);
//         //     }
//         // });
//
//     }
//
//     // Return cursor when insert image, video, etc.
//
//     var savedRange, isInFocus;
//     window.saveSelection = function () {
//         if (window.getSelection) //non IE Browsers
//         {
//             savedRange = window.getSelection().getRangeAt(0);
//         } else if (document.selection) //IE
//         {
//             savedRange = document.selection.createRange();
//         }
//     }
//
//     window.restoreSelection = function () {
//         isInFocus = true;
//         document.getElementById("editor-doc").focus();
//         if (savedRange != null) {
//             if (window.getSelection) //non IE and there is already a selection
//             {
//                 var s = window.getSelection();
//                 if (s.rangeCount > 0)
//                     s.removeAllRanges();
//                 s.addRange(savedRange);
//             } else if (document.createRange) //non IE and no selection
//             {
//                 window.getSelection().addRange(savedRange);
//             } else if (document.selection) //IE
//             {
//                 savedRange.select();
//             }
//         }
//     }
//     //this part onwards is only needed if you want to restore selection onclick
//     var isInFocus = false;
//     window.onDivBlur = function () {
//         isInFocus = false;
//     }
//
//     window.cancelEvent = function (e) {
//         if (isInFocus == false && savedRange != null) {
//             if (e && e.preventDefault) {
//                 //alert("FF");
//                 e.stopPropagation(); // DOM style (return false doesn't always work in FF)
//                 e.preventDefault();
//             } else {
//                 window.event.cancelBubble = true; //IE stopPropagation
//             }
//             restoreSelection();
//             return false; // false = IE style
//         }
//     }
//
//
// }