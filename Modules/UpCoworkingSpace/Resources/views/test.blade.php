<html>
<body>
<script language="javascript" type="text/javascript">
    <!--
    function ajaxFunction(){
        var ajaxRequest;  // Khai bao mot bien
        try{

            // Voi cac trinh duyet hien dai: Opera 8.0+, Firefox, Safari
            ajaxRequest = new XMLHttpRequest();
        }catch (e){

            // Voi trinh duyet IE
            try{
                ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
            }catch (e) {

                try{
                    ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }catch (e){

                    // Thong bao khi xay ra loi
                    alert("Co loi xay ra voi trinh duyet cua ban!");
                    return false;
                }
            }
        }

        // Tao mot ham de nhan du lieu duoc gui tu Server
        // va sau do se update the div trong page
        ajaxRequest.onreadystatechange = function(){

            if(ajaxRequest.readyState == 4){
                var ajaxDisplay = document.getElementById('ajaxDiv');
                ajaxDisplay.innerHTML = ajaxRequest.responseText;
            }
        }

        // Bay gio, lay gia tri da nhap tu user va truyen no toi server script

        var age = document.getElementById('age').value;
        var wpm = document.getElementById('wpm').value;
        var sex = document.getElementById('sex').value;
        var queryString = "?age=" + age ;

        queryString +=  "&wpm=" + wpm + "&sex=" + sex;
        ajaxRequest.open("GET", "ajax-example.php" + queryString, true);
        ajaxRequest.send(null);
    }
    //-->
</script>

<form name='myForm'>

    Max Age: <input type='text' id='age' /> <br />
    Max WPM: <input type='text' id='wpm' /> <br />
    Sex:
    <select id='sex'>
        <option value="m">m</option>
        <option value="f">f</option>
    </select>
    <input type='button' onclick='ajaxFunction()' value='Query MySQL'/>

</form>
<div id='ajaxDiv'>Hien thi ket qua</div>
</body>
</html>


