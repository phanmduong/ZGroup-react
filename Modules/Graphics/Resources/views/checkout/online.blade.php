<div v-if="payment == 'Thanh toán online'" style="margin-top: 5px">
    <select v-model="onlinePurchase" v-on:change="changeOnlinePurchase" class="form-control " id="sel1">
        <option value="ATM_ONLINE">Thanh toán bằng thẻ ATM</option>
        <option value="VISA">Thanh toán bằng thẻ Visa/ Master
        </option>
    </select>
    {{--Lưu ý: Bạn cần đăng ký Internet-Banking hoặc dịch vụ thanh toán trực tuyến tại ngân hàng trước khi thực hiện--}}
    <div v-if="onlinePurchase == 'ATM_ONLINE'" style="margin-top: 5px">
        <select v-model="bank_code" class="form-control " id="sel1">
            <option value="BIDV">BIDV - Ngân hàng TMCP Đầu tư &amp; Phát triển Việt Nam</option>
            <option value="VCB">Vietcombank - Ngân hàng TMCP Ngoại Thương Việt Nam</option>
            <option value="DAB">DAB - Ngân hàng Đông Á</option>
            <option value="TCB">TCB - Ngân hàng Kỹ Thương</option>
            <option value="MB">MB - Ngân hàng Quân Đội</option>
            <option value="VIB">VIB - Ngân hàng Quốc tế</option>
            <option value="ICB">ICB - Ngân hàng Công Thương Việt Nam</option>
            <option value="EXB">EximBank - Ngân hàng Xuất Nhập Khẩu</option>
            <option value="ACB">ACB - Ngân hàng Á Châu</option>
            <option value="HDB">HDB - Ngân hàng Phát triển Nhà TPHCM</option>
            <option value="MSB">MSB - Ngân hàng Hàng Hải</option>
            <option value="NVB">NVB - Ngân hàng Nam Việt</option>
            <option value="VAB">VAB - Ngân hàng Việt Á</option>
            <option value="VPB">VPBank - Ngân Hàng Việt Nam Thịnh Vượng</option>
            <option value="SCB">SCB - Ngân hàng Sài Gòn Thương tín</option>
            <option value="PGB">PGB - Ngân hàng Xăng dầu Petrolimex</option>
            <option value="GPB">GPB - Ngân hàng TMCP Dầu khí Toàn Cầu</option>
            <option value="AGB">Agribank - Ngân hàng Nông nghiệp &amp; Phát triển nông thôn</option>
            <option value="SGB">Ngân hàng Sài Gòn Công Thương</option>
            <option value="BAB">BAB - Ngân hàng Bắc Á</option>
            <option value="TPB">TPBank - Tiền phong bank</option>
            <option value="NAB">NAB - Ngân hàng Nam Á</option>
            <option value="SHB">SHB - Ngân hàng TMCP Sài Gòn - Hà Nội (SHB)</option>
            <option value="OJB">OJB - Ngân hàng TMCP Đại Dương (OceanBank)</option>
        </select>
    </div>

    <div v-if="onlinePurchase == 'VISA'" style="margin-top: 5px">
        <select class="form-control" v-model="bank_code">
            <option value="VISA">VISA</option>
            <option value="MASTER">MASTER</option>
        </select>
    </div>
</div>