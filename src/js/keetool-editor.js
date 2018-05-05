// var head = document.getElementsByTagName('head')[0];
// var fa = document.createElement('link');
// fa.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
// fa.setAttribute('rel', 'stylesheet');
// fa.setAttribute('type', 'text/css');
// head.appendChild(fa);

var MinEditor;
    export default MinEditor = {
    init: function (id) {
        var content = `
<style>
    .min-k-caret {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 2px;
        vertical-align: middle;
        border-top: 4px dashed;
        border-top: 4px solid;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
    }
    #min-text-color {
        display: block;
    }
    #min-bg-color {
        display: none
    }
    #min-text {
        float: left;
        width: 50%;
        height: 40px;
        border-bottom: none;
        border-top: 0.7px solid gray;
        border-left: 0.7px solid gray;
        border-right: 0.7px solid gray;
        text-align: center;
        font-size: 13px;
        display: inline-block;
        background-color: white;
        color: black;
        border-radius: 5px 5px 0px 0px;
    }
    #min-background {
        float: right;
        width: 50%;
        height: 40px;
        border: none;
        border-bottom: 0.7px solid gray;
        text-align: center;
        font-size: 13px;
        display: inline-block;
        background-color: white;
        color: gray;
        border-radius: 5px 5px 0px 0px;
    }
    #min-text:hover {
        cursor: pointer;
        background-color: #dce0e8;
    }
    #min-background:hover {
        cursor: pointer;
        background-color: #dce0e8
    }
    #min-text:focus {
        outline: none;
    }
    #min-background:focus {
        outline: none;
    }
    .min-tool-icon {
        width: 38px;
        height: 38px;
        display: inline-block;
        line-height: 38px;
        /* font-size: 15px; */
        text-align: center;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background: #fff;
        margin: 0;
    }
    .min-tool-icon:hover {
        background-color: #eff1f4
    }
    .min-tool-icon:focus {
        outline: none;
        background-color: #dce0e8;
    }
    .min-tool-icon:focus i {
        color: black
    }
    .min-tool-icon i {
        color: #aaaaaa;
    }
    .min-tool-icon:hover i {
        color: #414141;
    }
    .min-tool-icon button {
        color: #c9c9c9;
    }
    .min-tool-icon button:hover {
        color: #414141;
    }
    .min-tools {
        display: inline-block;
        border-right: 1px solid #ebebeb;
        /* padding: 0 5px 0 0; */
    }
    /* //////////////// */
    #min-cal1 {
        position: absolute;
        height: 0px;
        width: 0px;
        top: 100px;
        left: 100px;
        overflow: none;
        z-index: -100;
    }
    #min-cal2 {
        position: absolute;
        height: 0px;
        width: 0px;
        top: 0px;
        left: 0px;
        overflow: none;
        z-index: -100;
    }
    #min-editor:focus {
        outline: none;
    }
    .min-color-item {
        cursor: pointer;
        height: 18px;
        width: 18px;
        color: black;
        /* padding: 12px 16px; */
        text-decoration: none;
        display: block;
        margin-left: -1px;
        border-radius: 50%;
        margin: 5px;
    }
    .min-color-item:hover {
        width: 22px;
        height: 22px;
        margin: 1px;
        cursor: pointer;
        border: none;
    }
    #min-shortTools {
        /* margin-left: 15px;
        margin-right: 15px; */
    }
    div.min-shortTool.min-tools {
        border: none;
        margin-right: 10px;
        transition: ease-in-out 1s;
        /* display: block; */
        padding: 0;
    }
    #min-kee-tool {
        border-radius: 10px;
        padding: 10px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 7px 0px;
        background: rgb(255, 255, 255);
        z-index: 1;
    }
    .min-modal {
        display: none;
        /* Hidden by default */
        position: fixed;
        /* Stay in place */
        z-index: 1 !important;
        /* Sit on top */
        padding-top: 100px !important;
        /* Location of the box */
        left: 0;
        top: 0;
        width: 100%;
        /* Full width */
        height: 100%;
        /* Full height */
        overflow: auto;
        /* Enable scroll if needed */
        background-color: rgb(0, 0, 0) !important;
        /* Fallback color */
        background-color: rgba(0, 0, 0, 0.3) !important;
        /* Black w/ opacity */
    }
    /* Modal Content */
    .min-k-modal-content {
        font-family: 'Montserrat', sans-serif;
        border-radius: 10px;
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        width: 80%;
        max-width: 500px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        -webkit-animation-name: min-animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: min-animatetop;
        animation-duration: 0.4s
    }
    /* Add Animation */
    @-webkit-keyframes min-animatetop {
        from {
            opacity: 0
        }
        to {
            opacity: 1
        }
    }
    @keyframes min-animatetop {
        from {
            opacity: 0
        }
        to {
            opacity: 1
        }
    }
    /* The Close Button */
    .min-k-modal-header {
        padding: 20px 16px;
    }
    .min-k-modal-body {
        padding: 2px 16px;
    }
    .min-k-modal-footer {
        padding: 2px 16px;
    }
    .min-k-modal-button {
        padding: 10px;
        margin: 10px 0 10px 10px;
        outline: none;
        border: none;
        cursor: pointer;
        border-radius: 5px;
    }
    .min-k-button-green {
        background: #4CAF50;
        color: white;
    }
    .min-k-button-green:hover {
        background: #009933;
    }
    .min-k-button-gray {
        background: #888888;
        color: white;
    }
    .min-k-button-gray:hover {
        background: #AAAAAA;
    }
    .min-editor-button {
        padding: 10px 20px;
        border-radius: 5px;
        margin: 0 3px 0 0;
        border: none;
        color: #aaaaaa;
        background: none;
    }
    .min-editor-button:hover {
        background: #cccccc;
        color: #666666;
        cursor: pointer;
    }
    .min-dropdown-font-family a,
    .min-dropdown-paragraph-format a {
        color: black;
        padding: 5px 12px;
        text-decoration: none;
        display: block;
    }
    .min-dropdown-font-size a,
    .min-dropdown-align a {
        color: black;
        padding: 0px;
        text-decoration: none;
        display: block;
    }
    .min-dropdown-font-family a:hover,
    .min-dropdown-paragraph-format a:hover,
    .min-dropdown-font-size a:hover,
    .min-dropdown-align a:hover {
        background: #ececec;
    }
    .min-dropdown-font-family,
    .min-dropdown-paragraph-format,
    .min-dropdown-font-size,
    .min-dropdown-align {
        display: none;
        border-radius: 0px;
        position: absolute;
        padding: 0px;
        background-color: #f9f9f9;
        box-shadow: 0px 4px 20px 3px rgba(0, 0, 0, 0.15);
        z-index: 1;
        border-radius: 5px;
    }
    .min-dropdown-font-family {
        top: 48px;
        left: 11px;
        min-width: 100px;
    }
    .min-dropdown-paragraph-format {
        top: 48px;
        left: 52.5px;
        min-width: 200px;
    }
    .min-dropdown-font-size {
        top: 48px;
        left: 136.5px;
        padding: 0px;
        min-width: 80px;
    }
    .min-dropdown-align {
        top: 48px;
        left: 178.5px;
        padding: 0px;
        min-width: 80px;
    }
    .min-dropdown-color {
        border-radius: 5px;
        display: none;
        position: absolute;
        background: #fff;
        z-index: 1;
        top: 48px;
        left: 95px;
        box-shadow: 0px 2px 20px 3px rgba(0, 0, 0, 0.2);
    }
    .min-video-responsive {
        padding-top: 0;
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 56.25%;
        position: relative;
    }
    .min-video-responsive iframe {
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        position: absolute;
    }
    .min-reset-button {
        background: none;
        color: black !important;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }
    #MinEditor {
        z-index: 1000;
    }
</style>
<div id="MinEditor" style="width: 100%; height: auto">
    <div id="min-editor" onblur="onDivBlur();" onmousedown="return cancelEvent(event);" onclick="return cancelEvent(event);"
        contentEditable="true" onmouseup="saveSelection();" onkeyup="saveSelection();" onfocus="restoreSelection();">
        <p>MinEditor from KEETOOL</p>
    </div>
    <div style="position:absolute;display:none;" id="min-kee-tool">
        <div class="min-tool-icon" title="Font Family">
            <div>
                <button style="outline:none;" class="min-tool-icon" type="button" id='button-font-family'>
                    <i class="fa fa-font" style="fontsize:5px; display: inline">
                        <span class="min-k-caret"></span>
                    </i>
                </button>
                <div class="min-dropdown-font-family">
                    <div onclick="formatDoc('fontname','Arial')">
                        <button class="min-reset-button" style="font-family: Arial">Arial</button>
                    </div>
                    <div onclick="formatDoc('fontname','Arial Black')">
                        <button class="min-reset-button" style="font-family: Georgia">Arial Black</button>
                    </div>
                    <div onclick="formatDoc('fontname','Courier New')">
                        <button class="min-reset-button" style="font-family: Courier New">Courier New</button>
                    </div>
                    <div onclick="formatDoc('fontname','Time New Roman')">
                        <button class="min-reset-button" style="font-family: Time New Roman">Time New Roman</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="min-tool-icon" title="Paragraph Format">
            <div>
                <button class="min-tool-icon" type="button" id='button-paragraph-format'>
                    <i class="fa fa-paragraph" style='display:inline'>
                        <span class="min-k-caret"></span>
                    </i>
                </button>
                <div class="min-dropdown-paragraph-format">
                    <div onclick="formatDoc('p')">
                        <button class="min-reset-button" title="Paragraph">
                            <p>Normal</p>
                        </button>
                    </div>
                    <div onclick="formatDoc('h1')">
                        <button class="min-reset-button" title="Heading 1">
                            <h1>Heading 1</h1>
                        </button>
                    </div>
                    <div onclick="formatDoc('h2')">
                        <button class="min-reset-button" title="Heading 2">
                            <h2>Heading 2</h2>
                        </button>
                    </div>
                    <div onclick="formatDoc('h3')">
                        <button class="min-reset-button" title="Heading 3">
                            <h3>Heading 3</h3>
                        </button>
                    </div>
                    <div onclick="formatDoc('h4')">
                        <button class="min-reset-button" title="Heading 4">
                            <h4>Heading 4</h4>
                        </button>
                    </div>
                    <div onclick="formatDoc('h5')">
                        <button class="min-reset-button" title="Heading 5">
                            <h5>Heading 5</h5>
                        </button>
                    </div>
                    <div onclick="formatDoc('h6')">
                        <button class="min-reset-button" title="Heading 6">
                            <h6>Heading 6</h6>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="min-tool-icon" title="Color">
            <button style="outline:none; " class="min-tool-icon" id="button-color" type="button">
                <i style='display:inline' class="fa fa-tint">
                    <span class="min-k-caret"></span>
                </i>
            </button>
            <div class=" min-dropdown-color">
                <div>
                    <button id='min-text' onclick='textColor()'>
                        <b>Text Color</b>
                    </button>
                    <button id='min-background' onclick='backgroundColor()'>
                        <b>Background</b>
                    </button>
                </div>
                <div id="min-text-color" class="">
                    <table>
                        <tr>
                            <td>
                                <button onclick="formatDoc('forecolor','indigo')" class='min-color-item' style="background-color: indigo" title="indigo"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','firebrick')" class="min-color-item" style="background-color:firebrick" title="firebrick"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','maroon')" class='min-color-item' style="background-color: maroon" title="maroon"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','darkslategray')" class='min-color-item' style="background-color:darkslategray" title="darkslategray"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','darkgreen')" class='min-color-item' style="background-color: darkgreen" title="darkgreen"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','mediumblue')" class='min-color-item' style="background-color: mediumblue" title="mediumblue"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','navy')" class='min-color-item' style="background-color: navy" title="navy"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','black')" class='min-color-item' style="background-color: black" title="black"></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onclick="formatDoc('forecolor','rebeccapurple')" class='min-color-item' style="background-color: rebeccapurple" title=" rebeccapurple"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','red')" class='min-color-item' style="background-color: red" title="red"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','chocolate')" class='min-color-item' style="background-color: chocolate" title="chocolate"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','olive')" class='min-color-item' style="background-color: olive" title="olive"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','green')" class='min-color-item' style="background-color: green" title="green"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','teal')" class='min-color-item' style="background-color: teal" title="teal"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','blue')" class='min-color-item' style="background-color: blue" title="blue"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','gray')" class='min-color-item' style="background-color: gray" title="gray"></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onclick="formatDoc('forecolor','mediumorchid')" class='min-color-item' style="background-color: mediumorchid" title="mediumorchid"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','deeppink')" class='min-color-item' style="background-color: deeppink" title="deeppink"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','darkorange')" class='min-color-item' style="background-color: darkorange" title=" darkorange"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','greenyellow')" class='min-color-item' style="background-color: greenyellow" title="greenyellow"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','mediumseagreen')" class='min-color-item' style="background-color: mediumseagreen" title="mediumseagreen"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','mediumturquoise')" class='min-color-item' style="background-color: mediumturquoise" title="mediumturquoise"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','royalblue')" class='min-color-item' style="background-color: royalblue" title="royalblue"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','lightslategrey')" class='min-color-item' style="background-color: lightslategrey" title="lightslategrey"></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onclick="formatDoc('forecolor','violet')" class='min-color-item' style="background-color: violet" title="violet"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','orchid')" class='min-color-item' style="background-color: orchid" title="orchid"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','gold')" class='min-color-item' style="background-color: gold" title="gold"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','yellow')" class='min-color-item' style="background-color: yellow" title="yellow"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','lime')" class='min-color-item' style="background-color: lime" title="lime"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','aqua')" class='min-color-item' style="background-color: aqua" title="aqua"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','skyblue')" class='min-color-item' style="background-color: skyblue " title="skyblue"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','lightgray')" class='min-color-item' style="background-color: lightgray" title="lightgray"></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onclick="formatDoc('forecolor','plum')" class='min-color-item' style="background-color: plum" title="plum"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','pink')" class='min-color-item' style="background-color: pink" title="pink"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','peachpuff')" class='min-color-item' style="background-color: peachpuff" title="peachpuff"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','khaki')" class='min-color-item' style="background-color: khaki" title="khaki"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','palegreen')" class='min-color-item' style="background-color: palegreen" title="palegreen"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','paleturquoise')" class='min-color-item' style="background-color: paleturquoise" title="paleturquoise"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','powderblue')" class='min-color-item' style="background-color: powderblue" title="powderblue"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','white')" class='min-color-item' style="background-color: #f4f8ff" title="white"></button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="min-bg-color" class="">
                    <table>
                        <tr>
                            <td>
                                <button onclick="formatDoc('backcolor','indigo')" class='min-color-item' style="background-color: indigo " title="indigo"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','firebrick')" class="min-color-item" style="background-color:firebrick" title="firebrick"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','maroon')" class='min-color-item' style="background-color: maroon" title="maroon"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','darkslategray')" class='min-color-item' style="background-color:darkslategray" title="darkslategray"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','darkgreen')" class='min-color-item' style="background-color: darkgreen" title="darkgreen"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','mediumblue')" class='min-color-item' style="background-color: mediumblue" title="mediumblue"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','navy')" class='min-color-item' style="background-color: navy" title="navy"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','black')" class='min-color-item' style="background-color: black" title="black"></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onclick="formatDoc('backcolor','rebeccapurple')" class='min-color-item' style="background-color: rebeccapurple" title=" rebeccapurple"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','red')" class='min-color-item' style="background-color: red" title="red"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','chocolate')" class='min-color-item' style="background-color: chocolate" title="chocolate"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','olive')" class='min-color-item' style="background-color: olive" title="olive"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','green')" class='min-color-item' style="background-color: green" title="green"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','teal')" class='min-color-item' style="background-color: teal" title="teal"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','blue')" class='min-color-item' style="background-color: blue" title="blue"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','gray')" class='min-color-item' style="background-color: gray" title="gray"></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onclick="formatDoc('backcolor','mediumorchid')" class='min-color-item' style="background-color: mediumorchid" title="mediumorchid"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','deeppink')" class='min-color-item' style="background-color: deeppink" title="deeppink"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','darkorange')" class='min-color-item' style="background-color: darkorange" title=" darkorange"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','greenyellow')" class='min-color-item' style="background-color: greenyellow" title="greenyellow"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','mediumseagreen')" class='min-color-item' style="background-color: mediumseagreen" title="mediumseagreen"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','mediumturquoise')" class='min-color-item' style="background-color: mediumturquoise" title="mediumturquoise"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','royalblue')" class='min-color-item' style="background-color: royalblue" title="royalblue"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','lightslategrey')" class='min-color-item' style="background-color: lightslategrey" title="lightslategrey"></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onclick="formatDoc('backcolor','violet')" class='min-color-item' style="background-color: violet" title="violet"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','orchid')" class='min-color-item' style="background-color: orchid" title="orchid"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','gold')" class='min-color-item' style="background-color: gold" title="gold"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','yellow')" class='min-color-item' style="background-color: yellow" title="yellow"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','lime')" class='min-color-item' style="background-color: lime" title="lime"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','aqua')" class='min-color-item' style="background-color: aqua" title="aqua"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','skyblue')" class='min-color-item' style="background-color: skyblue " title="skyblue"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('forecolor','lightgray')" class='min-color-item' style="background-color: lightgray" title="lightgray"></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onclick="formatDoc('backcolor','plum')" class='min-color-item' style="background-color: plum" title="plum"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','pink')" class='min-color-item' style="background-color: pink" title="pink"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','peachpuff')" class='min-color-item' style="background-color: peachpuff" title="peachpuff"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','khaki')" class='min-color-item' style="background-color: khaki" title="khaki"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','palegreen')" class='min-color-item' style="background-color: palegreen" title="palegreen"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','paleturquoise')" class='min-color-item' style="background-color: paleturquoise" title="paleturquoise"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','powderblue')" class='min-color-item' style="background-color: powderblue" title="powderblue"></button>
                            </td>
                            <td>
                                <button onclick="formatDoc('backcolor','white')" class='min-color-item' style="background-color: #f4f8ff" title="white"></button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="min-tool-icon" title="Font Size">
            <div>
                <button class=" min-tool-icon" type="button" id='button-font-size'>
                    <i class="fa fa-text-height" style='display:inline'>
                        <span class="min-k-caret"></span>
                    </i>
                </button>
                <div class="min-dropdown-font-size" style="overflow-y: auto; height:200px;">
                    <div onclick="formatDoc('fontsize','1')">
                        <button class="min-reset-button">1</button>
                    </div>
                    <div onclick="formatDoc('fontsize','2')">
                        <button class="min-reset-button">2</button>
                    </div>
                    <div onclick="formatDoc('fontsize','3')">
                        <button class="min-reset-button">3</button>
                    </div>
                    <div onclick="formatDoc('fontsize','4')">
                        <button class="min-reset-button">4</button>
                    </div>
                    <div onclick="formatDoc('fontsize','5')">
                        <button class="min-reset-button">5</button>
                    </div>
                    <div onclick="formatDoc('fontsize','6')">
                        <button class="min-reset-button">6</button>
                    </div>
                    <div onclick="formatDoc('fontsize','7')">
                        <button class="min-reset-button">7</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="min-tool-icon" title="Align" id="min-talign">
            <div>
                <button class="min-tool-icon" type="button" id='button-align'>
                    <i class="fa fa-align-center" style='display:inline'>
                        <span class="min-k-caret"></span>
                    </i>
                </button>
                <div class="min-dropdown-align">
                    <div onclick="formatDoc('justifyLeft')">
                        <button class="min-reset-button" title="Align left">
                            <i style='color:black' class="fa fa-align-left" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div onclick="formatDoc('justifyCenter')">
                        <button class="min-reset-button" title="Align center">
                            <i style='color:black' class="fa fa-align-center" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div onclick="formatDoc('justifyRight')">
                        <button class="min-reset-button" title="Align right">
                            <i style='color:black' class="fa fa-align-right" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div onclick="formatDoc('justifyFull')">
                        <button class="min-reset-button" title="Align justify">
                            <i style='color:black' class="fa fa-align-justify" aria-hidden="true"></i>
                            </>
                    </div>
                </div>
            </div>
        </div>
        <button class="min-tool-icon" title="Show More" id="show" onclick="showmore()">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
        <div id="sub-tools">
            <button class="min-tool-icon" title="Ordered List" onclick="formatDoc('insertUnorderedList')">
                <i class='fa fa-list-ul'></i>
            </button>
            <button class="min-tool-icon" title="Unordered List" onclick="formatDoc('insertOrderedList')">
                <i class='fa fa-list-ol'></i>
            </button>
            <button class="min-tool-icon" title="Decrease Indent (Ctrl+Z)" onclick="formatDoc('outdent')">
                <i class='fa fa-outdent'></i>
            </button>
            <button class="min-tool-icon" title="Increase Indent (Tab)" onclick="formatDoc('indent')">
                <i class='fa fa-indent'></i>
            </button>
            <button class="min-tool-icon" title="Hide" onclick="showoff()">
                <i class="fa fa-minus" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    <div id="min-shortTools" class="row">
        <div class="min-tools min-shortTool">
            <button id="myBtnImg" type="button" class="min-editor-button" style="display: flex; outline: none;">
                <i class="fa fa-camera" aria-hidden="true"></i>
            </button>
        </div>
        <div class="min-tools min-shortTool">
            <button id="myBtnVid" type="button" class="min-editor-button" style="display: flex; outline: none; ">
                <i class="fa fa-video-camera" aria-hidden="true"></i>
            </button>
        </div>
        <div class="min-tools min-shortTool">
            <button id="myBtnLink" type="button" class="min-editor-button" style="display: flex; outline: none;">
                <i class="fa fa-link" aria-hidden="true"></i>
            </button>
        </div>
        <div class="min-tools min-shortTool">
            <button id="showCode" type="button" class="min-editor-button" data-toggle="modal" style="display: flex; outline: none;">
                <i class="fa fa-code" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    <div id="myModalImg" class="min-modal">
        <div class="min-k-modal-content">
            <div class="min-k-modal-header">
                <button type="button" class="close k-close-modal" data-dismiss="modal">&times;</button>
                <h3>Chèn ảnh</h3>
            </div>
            <div class="min-k-modal-body">
                <div style="border:solid 1px #dfdfdf; padding:10px;">
                    <input id="data-img" type="text" placeholder="URL" style=" outline:none; border:none; width:100%" />
                </div>
            </div>
            <div class="min-k-modal-footer">
                <div style="display:none;" id="percent" class="form-group">
                    <div style="height:20px;width:100%;margin:0 auto;" class="progress">
                        <div class="progress-bar progress-bar-success myprogress" role="progressbar" style="width:0%;font-size:10px;line-height:20px;background: green">0%</div>
                    </div>
                </div>
                <div style="display:flex;flex-direction:row-reverse">
                    <input onchange="uploadImg()" type="file" id="myFile" name="myFile" style="display:none">
                    <button onclick='insertImg()' class="min-k-modal-button min-k-button-green">Ok</button>
                    <button onclick="document.getElementById('myFile').click()" class="min-k-modal-button min-k-button-gray">Upload</button>
                </div>
            </div>
        </div>
    </div>
    <div id="myModalVid" class="min-modal">
        <div class="min-k-modal-content">
            <div class="min-k-modal-header">
                <button type="button" class="close k-close-modal" data-dismiss="modal">&times;</button>
                <h3>Chèn Video</h3>
            </div>
            <div class="min-k-modal-body">
                <div style="border:solid 1px #dfdfdf; padding:10px;">
                    <input id="data-video" type="text" placeholder="URL" style=" outline:none; border:none; width:100%" />
                </div>
            </div>
            <div class="min-k-modal-footer">
                <div style="display:flex;flex-direction:row-reverse">
                    <button onclick="insertVideo()" class="min-k-modal-button min-k-button-green">Ok</button>
                </div>
            </div>
        </div>
    </div>
    <div id="myModalLink" class="min-modal">
        <div class="min-k-modal-content">
            <div class="min-k-modal-header">
                <button type="button" class="close k-close-modal" data-dismiss="modal">&times;</button>
                <h3>Chèn Link</h3>
            </div>
            <div class="min-k-modal-body">
                <div style="border:solid 1px #dfdfdf; padding:10px;">
                    <input id="data-link" type="text" placeholder="URL" style=" outline:none; border:none; width:100%" />
                </div>
            </div>
            <div class="min-k-modal-footer">
                <div style="display:flex;flex-direction:row-reverse">
                    <button onclick="formatDoc('createLink')" class="min-k-modal-button min-k-button-green">Ok</button>
                </div>
            </div>
        </div>
    </div>
    <div id="min-cal1">&nbsp;</div>
    <div id="min-cal2">&nbsp;</div>
</div>`;


        var editor = document.getElementById(id);
        editor.innerHTML += content;

        //Set cursor at the end
        function setEndOfContenteditable(contentEditableElement) {
            var range, selection;
            if (document.createRange) //Firefox, Chrome, Opera, Safari, IE 9+
            {
                range = document.createRange(); //Create a range (a range is a like the selection but invisible)
                range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
                range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
                selection = window.getSelection(); //get the selection object (allows you to change selection)
                selection.removeAllRanges(); //remove any selections already made
                selection.addRange(range); //make the range you have just created the visible selection
            } else if (document.selection) //IE 8 and lower
            {
                range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
                range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
                range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
                range.select(); //Select the range (make it the visible selection
            }
        }



        //Insert function
        window.formatDoc = function (sCmd, sValue) {
            // console.log("1");
            if (sCmd == 'h1' || sCmd == 'h2' || sCmd == 'h3' || sCmd == 'h4' || sCmd == 'h5' || sCmd == 'h6' || sCmd ==
                'p') {
                document.execCommand('formatBlock', false, sCmd);

            } else if (sCmd == 'createLink') {
                setEndOfContenteditable(elem);
                var data = document.getElementById('data-link').value;
                document.execCommand(sCmd, true, data);
                document.getElementById.value = "";
                // $('#min-kee-tool').css('dislay', 'none');
                document.getElementById('min-kee-tool').style.display = "none";

            } else if (sCmd === 'backcolor' || sCmd === 'forecolor') {
                // console.log(1);
                // console.log(sCmd);
                // console.log(sValue);
                document.execCommand(sCmd, true, sValue);
            } else {
                if (document.queryCommandSupported(sCmd) == false) {
                    alert('The command ' + sCmd + ' is not support your browser');
                    // console.log('hello');
                } else {
                    document.getElementsByClassName('min-dropdown-font-family')[0].style.display = "none";
                    document.getElementsByClassName('min-dropdown-paragraph-format')[0].style.display = "none";
                    document.getElementsByClassName('min-dropdown-color')[0].style.display = "none";
                    document.getElementsByClassName('min-dropdown-font-size')[0].style.display = "none";
                    document.getElementsByClassName('min-dropdown-align')[0].style.display = "none";
                    ele.style.display = 'none';
                    // console.log(1);
                    document.execCommand(sCmd, false, sValue);
                    // console.log('hello22');
                    // console.log(document.queryCommandSupported(sCmd));
                }
            }
            selectingText();

        }


        //Insert Images
        window.insertImg = function (img) {
            elem = document.getElementById('min-editor'); //This is the element that you want to move the caret to the end of
            setEndOfContenteditable(elem);
            var url = document.getElementById('data-img').value;
            var inputUrl = url;
            // url = "<img class=\"child\" src=\"" + inputUrl + "\" width=100% height=auto>";
            url = "<img class=\"child\" src=\"" + inputUrl + "\">";
            console.log("url:" + inputUrl);
            if (inputUrl) {
                document.execCommand("insertHTML", false, url);
                document.getElementById('data-img').value = "";
            }
        }



        //Insert Video
        window.insertVideo = function () {
            elem = document.getElementById('min-editor'); //This is the element that you want to move the caret to the end of
            setEndOfContenteditable(elem);
            sVideo = document.getElementById('data-video').value;
            var inputVideoURL = sVideo;
            console.log("url: " + inputVideoURL);
            // sVideo = prompt('Link here');
            var check = sVideo.substr(1, 6);
            // console.log(sVideo);
            // console.log(check);
            if (inputVideoURL) {
                if (check === "iframe") {
                    sVideo = "<div class=\"min-video-responsive\">" + sVideo + "</div>";
                    document.execCommand("insertHTML", false, sVideo);
                    document.getElementById('data-video').value = "";
                    setEndOfContenteditable(elem);
                    document.getElementById('min-editor').appendChild(document.createElement('br'));
                } else {
                    var idVideo = sVideo.substr(32, sVideo.length - 1);
                    stringVideo = "https://www.youtube.com/embed/" + idVideo;
                    var widthVideo = document.getElementById('min-editor').offsetWidth;
                    var heightVideo = 0.5625 * widthVideo;
                    sVideo = "<div class=\"min-video-responsive\"><iframe width=" + widthVideo + "\" height=" + heightVideo + " src=\"" + stringVideo + "\" frameborder=\"0\" webkitallowfullscreen=\"\" mozallowfullscreen=\"\" allowfullscreen=\"\" __idm_id__=\"189403137\"></iframe></div>"
                    // console.log(sVideo);
                    document.execCommand("insertHTML", false, sVideo);
                    document.getElementById('data-video').value = "";
                    setEndOfContenteditable(elem);
                    document.getElementById('min-editor').appendChild(document.createElement('br'));
                }
            }
        }

        //Remove parent div of video
        window.addEventListener('keyup', function () {
            // var data = $('.embed-container').html();
            var data = document.getElementsByClassName('min-video-responsive');
            // console.log(data);
            for (let i = 0; i < data.length; i++) {
                if (data[i].innerText === "\n") {
                    // console.log(2);
                    // $(this).remove();
                    data[i].parentNode.removeChild(data[i]);
                }
            }
        })

        // https://www.youtube.com/watch?v=ew1TpesH-jw
        // <iframe width="560" height="315" src="https://www.youtube.com/embed/ew1TpesH-jw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        // 56.25
        // height = 56.25% width


        //Paste as plain text
        var ed = document.querySelector("#min-editor");
        // console.log(ed);
        ed.addEventListener("paste", function (e) {
            // console.log(1);
            e.preventDefault();
            var text = e.clipboardData.getData("text/plain");
            // console.log(text);
            document.execCommand("insertHTML", false, text);
        });


        //Show code
        var flag = 1;
        var data = document.getElementById('min-editor');
        // console.log(data.innerHTML);
        // $('#showCode').click(function (e) {
        //     e.preventDefault();
        //     if (flag === 1) {
        //         document.getElementById('min-editor').innerText = data.innerHTML.trim();
        //         flag = 0;
        //     } else {
        //         document.getElementById('min-editor').innerHTML = data.innerText.trim();
        //         flag = 1;
        //     }
        // });

        document.getElementById('showCode').addEventListener('click', function (e) {
            e.preventDefault();
            if (flag === 1) {
                document.getElementById('min-editor').innerText = data.innerHTML.trim();
                flag = 0;
            } else {
                document.getElementById('min-editor').innerHTML = data.innerText.trim();
                flag = 1;
            }
        })

        function getSelected() {
            if (window.getSelection) {
                console.log('selected');
                return window.getSelection();
            } else if (document.getSelection) {
                console.log('selected');
                return document.getSelection();
            } else {
                var selection = document.selection && document.selection.createRange();
                if (selection.text) {
                    console.log('selected');
                    return selection.text;
                }
                return false;
            }
            return false;
        }

        //Selection text
        var ele = document.getElementById('min-kee-tool');
        var sel = window.getSelection();
        var rel1 = document.createRange();
        rel1.selectNode(document.getElementById('min-cal1'));
        var rel2 = document.createRange();
        rel2.selectNode(document.getElementById('min-cal2'));
        document.getElementById('min-editor').addEventListener('mouseup', function (event) {
            event.stopPropagation();
            if (!sel.isCollapsed) {
                //debugger;
                var r = sel.getRangeAt(0).getBoundingClientRect();
                var rb1 = rel1.getBoundingClientRect();
                var rb2 = rel2.getBoundingClientRect();
                ele.style.top = (r.bottom - rb2.top) * 100 / (rb1.top - rb2.top) + 'px'; //this will place ele below the selection
                ele.style.left = ((r.left - rb2.left + 10) * 100 / (rb1.left - rb2.left)) + 'px'; //this will align the right edges together
                //code to set content

                ele.style.display = 'block';
            }
        });

        // $(window).resize(function () {
        //     ele.style.display = 'none';
        // });
        window.onresize = function (e) {
            ele.style.display = "none";
        }


        // $('body').mousedown(function () {
        //     $('#min-kee-tool').hover(function () {
        //         // over

        //     }, function () {
        //         $('.min-dropdown-font-family').hide();
        //         $('.min-dropdown-paragraph-format').hide();
        //         $('.min-dropdown-color').hide();
        //         $('.min-dropdown-font-size').hide();
        //         $('.min-dropdown-align').hide();

        //         ele.style.display = 'none';
        //     });
        // });

        if (window.addEventListener) {
            document.getElementsByTagName('body')[0].addEventListener('click', function (e) {
                e.preventDefault;
                document.getElementById('min-kee-tool').addEventListener('mouseleave', function (e) {

                    // e.preventDefault;
                    document.getElementsByClassName('min-dropdown-font-family')[0].style.display = "none";
                    document.getElementsByClassName('min-dropdown-paragraph-format')[0].style.display = "none";
                    document.getElementsByClassName('min-dropdown-color')[0].style.display = "none";
                    document.getElementsByClassName('min-dropdown-font-size')[0].style.display = "none";
                    document.getElementsByClassName('min-dropdown-align')[0].style.display = "none";
                    // console.log(1);
                    ele.style.display = 'none';
                })
            })
        } else if (window.attachEvent) {
            document.getElementsByTagName('body').attachEvent('onclick', function (e) {
                e.preventDefault;
                document.getElementById('min-kee-tool').addEventListener('onmouseleave', function () {
                    document.getElementsByClassName('min-dropdown-font-family')[0].style.display = "none";
                    document.getElementsByClassName('min-dropdown-paragraph-format')[0].style.display = "none";
                    document.getElementsByClassName('min-dropdown-color')[0].style.display = "none";
                    document.getElementsByClassName('min-dropdown-font-size')[0].style.display = "none";
                    document.getElementsByClassName('min-dropdown-align')[0].style.display = "none";
                    // console.log(1);
                    ele.style.display = 'none';
                })
            })
        }


        function selectingText() {
            if (!sel.isCollapsed) {
                //debugger;
                var r = sel.getRangeAt(0).getBoundingClientRect();
                var rb1 = rel1.getBoundingClientRect();
                var rb2 = rel2.getBoundingClientRect();
                ele.style.top = (r.bottom - rb2.top) * 100 / (rb1.top - rb2.top) + 'px'; //this will place ele below the selection
                ele.style.left = ((r.left - rb2.left + 10) * 100 / (rb1.left - rb2.left)) + 'px'; //this will align the right edges together
                //code to set content

                ele.style.display = 'block';
            }
        }


        // $('body').mousedown(function (e) {
        //     if (e.which == 1) {
        //         console.log(e.pageX + " / " + e.pageY);
        //     }
        // });

        document.getElementsByTagName('body')[0].addEventListener('mousedown', function (e) {
            if (e.which == 1) {
                console.log(e.pageX + " / " + e.pageY);
            }
        })


        // //Set cursor position
        // $.fn.setCursorPosition = function (pos) {
        //     this.each(function (index, elem) {
        //         if (elem.setSelectionRange) {
        //             elem.setSelectionRange(pos, pos);
        //         } else if (elem.createTextRange) {
        //             var range = elem.createTextRange();
        //             range.collapse(true);
        //             range.moveEnd('character', pos);
        //             range.moveStart('character', pos);
        //             range.select();
        //         }
        //     });
        //     return this;
        // };


        // $(document).ready(function () {
        //     $("#sub-tools").hide();
        //     $("#min-talign").hide();
        // });

        document.getElementById('sub-tools').style.display = 'none';
        document.getElementById('min-talign').style.display = 'none';



        window.showmore = function (event) {
            document.getElementsByClassName('min-dropdown-font-family')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-paragraph-format')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-color')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-font-size')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-align')[0].style.display = "none";


            // console.log(1);
            // $("#sub-tools").show();
            // $("#show").hide();
            // $("#min-talign").show();
            document.getElementById('sub-tools').style.display = "block";
            document.getElementById('min-talign').style.display = "inline-block";
            document.getElementById('show').style.display = "none";

        };

        window.showoff = function (event) {
            document.getElementsByClassName('min-dropdown-font-family')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-paragraph-format')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-color')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-font-size')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-align')[0].style.display = "none";

            // console.log(1);
            // $("#sub-tools").show();
            // $("#show").hide();
            // $("#min-talign").show();
            document.getElementById('sub-tools').style.display = "none";
            document.getElementById('min-talign').style.display = "block";
            document.getElementById('show').style.display = "block";
        };

        // $(document).ready(function () {
        //     $('#min-editor').focus();
        // });


        // $(window).on('load', function () {
        //     var elem = document.getElementById('min-editor'); //This is the element that you want to move the caret to the end of
        //     setEndOfContenteditable(elem);
        // });


        // window.onload = function(){
        //     var elem = document.getElementById('min-editor'); //This is the element that you want to move the caret to the end of
        //     setEndOfContenteditable(elem);
        // }



        //editor always has cursor if null data
        // $('#min-editor').keydown(function (e) {
        //     // console.log(1);
        //     var elem = document.getElementById('min-editor');
        //     var data = document.getElementById('min-editor').innerText;
        //     if (data === "\n") {
        //         setEndOfContenteditable(elem);
        //         console.log(1);
        //         $('#min-editor').hover(function () {
        //             setEndOfContenteditable(elem);
        //         });
        //     }
        // });
        document.getElementById('min-editor').addEventListener('keydown', function () {
            var elem = document.getElementById('min-editor');
            var data = document.getElementById('min-editor').innerText;
            if (data === "\n") {
                setEndOfContenteditable(elem);
                // console.log(1);
                document.getElementById('min-editor').addEventListener('mouseover', function () {
                    setEndOfContenteditable(elem);
                })
                // $('#min-editor').hover(function () {
                //     setEndOfContenteditable(elem);
                // });
            }
        })
        // // Something else
        // function setCaret(line, col) {
        //     var ele = document.getElementById("editable");
        //     var rng = document.createRange();
        //     var sel = window.getSelection();
        //     rng.setStart(ele.childNodes[line], col);
        //     rng.collapse(true);
        //     sel.removeAllRanges();
        //     sel.addRange(range);
        //     ele.focus();
        // }

        // //Press tab button
        // function insertTab() {
        //     if (!window.getSelection) return;
        //     const sel = window.getSelection();
        //     if (!sel.rangeCount) return;
        //     const range = sel.getRangeAt(0);
        //     range.collapse(true);
        //     const span = document.createElement('span');
        //     span.appendChild(document.createTextNode('\t'));
        //     span.style.whiteSpace = 'pre';
        //     range.insertNode(span);
        //     // Move the min-k-caret immediately after the inserted span
        //     range.setStartAfter(span);
        //     range.collapse(true);
        //     sel.removeAllRanges();
        //     sel.addRange(range);
        // }

        // $(document).on('keydown', '#min-editor', function (e) {
        //     if (e.keyCode == 9) {
        //         // alert(1);
        //         insertTab();
        //         e.preventDefault()
        //     }
        // });




        // $('#min-text-color a').click(function (e) {
        //     e.preventDefault();
        //     $('.min-dropdown-color').hide();
        // });
        var eleColor = document.getElementsByClassName("min-dropdown-color")[0].querySelectorAll("a");
        for (let i = 0; i < eleColor.length; i++) {
            eleColor[i].addEventListener('click', function (e) {
                e.preventDefault();
                // $('.min-dropdown-color').hide();
                document.getElementsByClassName('min-dropdown-color')[0].style.display = "";
                ele.style.display = 'none';
            })
        }


        // Get the modal
        var modalImg = document.getElementById('myModalImg');

        // Get the button that opens the modal
        var btnImg = document.getElementById("myBtnImg");

        // Get the <span> element that closes the modal

        btnImg.onclick = function () {
            modalImg.style.display = "block";
        }





        // Get the modal
        var modalVid = document.getElementById('myModalVid');

        // Get the button that opens the modal
        var btnVid = document.getElementById("myBtnVid");

        // Get the <span> element that closes the modal

        btnVid.onclick = function () {
            modalVid.style.display = "block";
        }


        // Get the modal
        var modalLink = document.getElementById('myModalLink');

        // Get the button that opens the modal
        var btnLnk = document.getElementById("myBtnLink");

        // Get the <span> element that closes the modal

        btnLnk.onclick = function () {
            modalLink.style.display = "block";
        }




        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modalImg) {
                modalImg.style.display = "none";
            }
            if (event.target == modalVid) {
                modalVid.style.display = "none";
            }
            if (event.target == modalLink) {
                modalLink.style.display = "none";
            }
        }
        //esc

        document.addEventListener('keyup', function (e) {
            if (e.keyCode == 27) {
                modalVid.style.display = "none";
                modalImg.style.display = "none";
                modalLink.style.display = "none";
            } // esc
        })

        // $(document).keyup(function (e) {
        //     if (e.keyCode == 27) {
        //         modalVid.style.display = "none";
        //         modalImg.style.display = "none";
        //         modalLink.style.display = "none";
        //     } // esc
        // });

        var close = document.getElementsByClassName('k-close-modal');
        var accept = document.getElementsByClassName('min-k-button-green');

        for (let i = 0; i < close.length; i++) {
            close[i].addEventListener('click', function (e) {
                e.preventDefault();
                modalVid.style.display = "none";
                modalImg.style.display = "none";
                modalLink.style.display = "none";
            })
        }

        for (let i = 0; i < accept.length; i++) {
            accept[i].addEventListener('click', function (e) {
                e.preventDefault();
                modalVid.style.display = "none";
                modalImg.style.display = "none";
                modalLink.style.display = "none";
            })
        }

        function fadeIn(el) {
            el.style.opacity = 0;

            var last = +new Date();
            var tick = function () {
                el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
                last = +new Date();

                if (+el.style.opacity < 1) {
                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                }
            };

            tick();
        }


        window.backgroundColor = function () {
            document.getElementById('min-text-color').style.display = "none";
            document.getElementById('min-bg-color').style.display = "block";

            fadeIn(document.getElementById('min-bg-color'));

            document.getElementById('min-text').style.border = "none";
            document.getElementById('min-text').style.borderBottom = "0.7px solid gray";
            document.getElementById('min-text').style.color = "gray";

            document.getElementById('min-background').style.border = "none";
            document.getElementById('min-background').style.borderTop = "0.7px solid gray";
            document.getElementById('min-background').style.borderRight = "0.7px solid gray";
            document.getElementById('min-background').style.borderLeft = "0.7px solid gray";
            document.getElementById('min-background').style.color = "black";
        }


        window.textColor = function () {
            document.getElementById('min-bg-color').style.display = "none";
            document.getElementById('min-text-color').style.display = "block";

            fadeIn(document.getElementById('min-text-color'));

            document.getElementById('min-background').style.border = "none";
            document.getElementById('min-background').style.borderBottom = "0.7px solid gray";
            document.getElementById('min-background').style.color = "black";

            document.getElementById('min-text').style.border = "none";
            document.getElementById('min-text').style.borderTop = "0.7px solid gray";
            document.getElementById('min-text').style.borderRight = "0.7px solid gray";
            document.getElementById('min-text').style.borderLeft = "0.7px solid gray";
            document.getElementById('min-text').style.color = "gray";
        }



        // window.buttonColor = function () {
        //     $('#font-family').css('display', 'none');
        //     $('.paragraph-format').css('display', 'none');
        // }


        document.getElementById('button-font-family').addEventListener('click', function () {
            // console.log(1);
            if (getComputedStyle(document.getElementsByClassName('min-dropdown-font-family')[0])["display"] == "none") {
                document.getElementsByClassName('min-dropdown-font-family')[0].style.display = "block";
            } else {
                document.getElementsByClassName('min-dropdown-font-family')[0].style.display = "none";
            }
            document.getElementsByClassName('min-dropdown-paragraph-format')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-color')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-font-size')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-align')[0].style.display = "none";
        });


        document.getElementById('button-paragraph-format').addEventListener('click', function () {
            document.getElementsByClassName('min-dropdown-font-family')[0].style.display = "none";
            if (getComputedStyle(document.getElementsByClassName('min-dropdown-paragraph-format')[0])["display"] == "none") {
                document.getElementsByClassName('min-dropdown-paragraph-format')[0].style.display = "block";
            } else {
                document.getElementsByClassName('min-dropdown-paragraph-format')[0].style.display = "none";
            }
            document.getElementsByClassName('min-dropdown-color')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-font-size')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-align')[0].style.display = "none";
        });


        document.getElementById('button-color').addEventListener('click', function () {
            document.getElementsByClassName('min-dropdown-font-family')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-paragraph-format')[0].style.display = "none";
            if (getComputedStyle(document.getElementsByClassName('min-dropdown-color')[0])["display"] == "none") {
                document.getElementsByClassName('min-dropdown-color')[0].style.display = "block";
            } else {
                document.getElementsByClassName('min-dropdown-color')[0].style.display = "none";
            }
            document.getElementsByClassName('min-dropdown-font-size')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-align')[0].style.display = "none";
        });

        document.getElementById('button-font-size').addEventListener('click', function () {
            document.getElementsByClassName('min-dropdown-font-family')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-paragraph-format')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-color')[0].style.display = "none";
            if (getComputedStyle(document.getElementsByClassName('min-dropdown-font-size')[0])["display"] == "none") {
                document.getElementsByClassName('min-dropdown-font-size')[0].style.display = "block";
            } else {
                document.getElementsByClassName('min-dropdown-font-size')[0].style.display = "none";
            }
            document.getElementsByClassName('min-dropdown-align')[0].style.display = "none";
        });


        document.getElementById('button-align').addEventListener('click', function () {
            document.getElementsByClassName('min-dropdown-font-family')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-paragraph-format')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-color')[0].style.display = "none";
            document.getElementsByClassName('min-dropdown-font-size')[0].style.display = "none";
            if (getComputedStyle(document.getElementsByClassName('min-dropdown-align')[0])["display"] == "none") {
                document.getElementsByClassName('min-dropdown-align')[0].style.display = "block";
            } else {
                document.getElementsByClassName('min-dropdown-align')[0].style.display = "none";
            }
        });






        //insert <p></p> if content null
        var editable = document.getElementById('min-editor');
        editable.addEventListener('input', function () {
            // console.log(1);
            var data = document.getElementById('min-editor').innerHTML;
            if (data == "") {
                document.getElementById('min-editor').innerHTML = "<p><br/></p>"
            }
        });

        //Upload local img
        window.uploadImg = function () {
            var image = new FormData();
            var file = document.getElementById('myFile').files[0];
            console.log("x", file);
            image.append('image', file);
            console.log(image);

            var request = new XMLHttpRequest();
            request.open('POST', 'http://keetool.xyz/api/v3/upload-image-public', true);

            request.upload.onprogress = function (e) {
                // $('#percent').show();
                document.getElementById('percent').style.display = "block";
                if (e.lengthComputable) {
                    var percentComplete = e.loaded / e.total;
                    percentComplete = parseInt(percentComplete * 100);
                    // console.log(document.getElementsByClassName("myprogress")[0].textContent);
                    document.getElementsByClassName("myprogress")[0].textContent = percentComplete + "%";
                    // $('.myprogress').text(percentComplete + '%');
                    document.getElementsByClassName("myprogress")[0].style.width = percentComplete + "%";
                    // $('.myprogress').css('width', percentComplete + '%');
                    // console.log(document.getElementsByClassName("myprogress")[0].style.width);
                }
            };

            request.onload = function () {
                if (this.status == 200) {
                    var data = JSON.parse(this.response);
                    console.log('Server got:', data.link);
                    // $('#percent').hide();
                    document.getElementById('percent').style.display = "none";
                    modalVid.style.display = "none";
                    modalImg.style.display = "none";
                    modalLink.style.display = "none";
                    // console.log(data);
                    elem = document.getElementById('min-editor'); //This is the element that you want to move the caret to the end of
                    setEndOfContenteditable(elem);
                    var url = "<div><img src=\"" + data.link + "\" width=100% height=auto></div>";
                    // console.log(url);
                    // console.log(data.link);
                    document.execCommand('insertHTML', false, url.trim());
                };
            };
            request.send(image);



            // $.ajax({
            //     type: 'POST',
            //     url: "http://keetool.xyz/api/v3/upload-image-public",
            //     data: image,
            //     cache: false,
            //     contentType: false,
            //     processData: false,
            //     dataType: "json",
            //     //progress bar
            //     xhr: function () {
            //         $('#percent').show();
            //         var xhr = new window.XMLHttpRequest();
            //         xhr.upload.addEventListener("progress", function (evt) {
            //             if (evt.lengthComputable) {
            //                 var percentComplete = evt.loaded / evt.total;
            //                 percentComplete = parseInt(percentComplete * 100);
            //                 $('.myprogress').text(percentComplete + '%');
            //                 $('.myprogress').css('width', percentComplete + '%');
            //             }
            //         }, false);
            //         return xhr;
            //     },
            //     success: function (data) {
            //         $('#percent').hide();
            //         modalVid.style.display = "none";
            //         modalImg.style.display = "none";
            //         modalLink.style.display = "none";
            //         console.log("success");
            //         // console.log(data);
            //         var i = document.getElementById("min-editor");
            //         elem = document.getElementById('min-editor'); //This is the element that you want to move the caret to the end of
            //         setEndOfContenteditable(elem);
            //         var url = "<div><img src=\"" + data.link + "\" width=100% height=auto></div>";
            //         // console.log(url);
            //         // console.log(data.link);
            //         document.execCommand('insertHTML', false, url.trim());
            //     },
            //     error: function (data) {
            //         console.log("error");
            //         console.log(data);
            //     }
            // });

        }

        // Restore selection when insert image, video, etc.
        var savedRange, isInFocus;
        window.saveSelection = function () {
            if (window.getSelection) //non IE Browsers
            {
                savedRange = window.getSelection().getRangeAt(0);
            } else if (document.selection) //IE
            {
                savedRange = document.selection.createRange();
            }
        }

        window.restoreSelection = function () {
            isInFocus = true;
            document.getElementById("min-editor").focus();
            if (savedRange != null) {
                if (window.getSelection) //non IE and there is already a selection
                {
                    var s = window.getSelection();
                    if (s.rangeCount > 0)
                        s.removeAllRanges();
                    s.addRange(savedRange);
                } else if (document.createRange) //non IE and no selection
                {
                    window.getSelection().addRange(savedRange);
                } else if (document.selection) //IE
                {
                    savedRange.select();
                }
            }
        }
        //this part onwards is only needed if you want to restore selection onclick
        var isInFocus = false;
        window.onDivBlur = function () {
            isInFocus = false;
        }

        window.cancelEvent = function (e) {
            if (isInFocus == false && savedRange != null) {
                if (e && e.preventDefault) {
                    //alert("FF");
                    e.stopPropagation(); // DOM style (return false doesn't always work in FF)
                    e.preventDefault();
                } else {
                    window.event.cancelBubble = true; //IE stopPropagation
                }
                restoreSelection();
                return false; // false = IE style
            }
        }

        var editable = document.getElementById('min-editor');
        var that = this;
        // console.log(this.getContent());
        // this.data = editable.innerHTML;
        this.data = editable.innerHTML.trim();;
        editable.addEventListener('input', function() {
            // console.log(this.innerHTML);
            // console.log(editable);
            // console.log(that);
            that.data = editable.innerHTML.trim();
            // console.log(that.getContent());
        });

    },
    data: "",
    getContent: function () {
        return this.data;
    }
}