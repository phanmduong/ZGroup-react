@extends('upcoworkingspace::layouts.en-master')




@section('en-content')
    <style>
        .banner{
            background: url("http://up-co.vn/wp-content/uploads/2016/08/back2.jpg");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center center;
            height: 400px;
        }
        .flexbox-centering {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .white-text{
            color: #fff;
        }
        #co-1{
            background: url("http://up-co.vn/wp-content/uploads/2016/07/image1-2.jpg");
            background-position: 50% 50%;
            background-size: cover;
            height: 500px;
        }
        #co-2{
            background: url("http://up-co.vn/wp-content/uploads/2016/07/10255509_10152836081949046_5649044726019190139_n-e1470199685922.jpg");
            background-position: 50% 50%;
            background-size: cover;
            height: 500px;
        }
        #co-3{
            background: url("http://up-co.vn/wp-content/uploads/2016/07/13918396_10153551255295771_612429366_o-e1470198264130-781x1024.jpg");
            background-position: 50% 50%;
            background-size: cover;
            height: 500px;
        }
    </style>

    <div class="banner flexbox-centering">
        <div class="text-uppercase text-center white-text">
            <h3>UP CO-WORKING space</h3>
            <h2>mission - vision - core values</h2>
        </div>
    </div>

    <div style="background: #fff;" class="container-fluid">
        <div class="container" style="color: #000;">
            <br/>
            <h3 class="text-uppercase font-weight-bold text-center">
                UP'S STORY
            </h3>
            <br/><br/>
            <div class="row">
                <div class="col-md-4">
                    <img width="100%" height="auto" src="http://up-co.vn/wp-content/uploads/2016/07/10380516_10152836081949046_5649044726019190139_o-500x500.jpg" alt="">
                </div>
                <div class="col-md-8">
                    <p style="text-align: justify;">
                        UP was launched in March 2016, however, the dream about UP Co-Working space was cherished for so long ago. Building UP with other Co – Founders, Mr Do Hoai Nam – Father of Emotiv Systems with the product “mind-reading device” and SeeSpace with “InAir” the interactive TV experience, has travelled a lot of places and witnessed the significant development of many million dollar Start-ups in Silicon Valley. After researching and investing in many business models supporting Start-up, he found that the main reason why so many Start-ups have been gone, especially the young Start-ups is because of extremely high sunk cost. It makes them losing their market competitiveness and also delaying their development. Therefore, we create UP and believe now it is time for the Start-up in Vietnam to get good supports which they deserve when they have invested so much in their times, efforts to produce amazing products. The support from the UP is an integration of a lot of resources. Along a common workspace at UP offices, Start-ups are provided all conditions to work, learn, expand relationships, raising capital and being consulted with the best price in the current market. This is what the UP is committed to lead, nurture and support the Startups Vietnam.
                    </p>
                </div>
            </div>
        </div>
        <br/><br/>
        <br/><br/>
    </div>


    <div class="container-fluid">
        <br/>
        <div class="container">
            <h3 class="text-center text-uppercase font-weight-bold">
                VISION - MISSION - CORE VALUES
            </h3>
            <div class="row">
                <div class="col-md-4">
                    <h3 class="text-center text-uppercase font-weight-bold">
                        VISION
                    </h3>
                    <div class="text-justify">
                        Building and developing the strongest Vietnamese Start-Up community in Southeast Asia. Bringing dramatically, positively and sustainability changes for the country’s economy and the whole region.
                    </div>
                </div>
                <div class="col-md-4">
                    <h3 class="text-center text-uppercase font-weight-bold">
                        mission
                    </h3>
                    <div class="text-justify">
                        UP’s mission is to support and provide any opportunity for Start-Up Vietnam, help them to develop and reach their targeted goals as soon as possible through the best package in the market and network connection in investment, business and technology communities.
                    </div>
                </div>
                <div class="col-md-4">
                    <h3 class="text-center text-uppercase font-weight-bold">
                        core values
                    </h3>
                    <div class="text-justify">
                        UP allows you to work in a well equiped office with the best price, brings you to Start-up communities, network connection with the most active investors and support everything you need to fullfill your dreams.
                    </div>
                </div>
            </div>
        </div>
        <br/><br/>
    </div>

    <div style="background: #fff;" class="container-fluid">
        <div class="container" style="color: #000;">
            <br/>
            <h3 class="text-uppercase font-weight-bold text-center">
                UP'S FOUNDERS
            </h3>
            <br/>
            <p class="text-center">
                We desire to build a creative community of startups where the core value is not only a co-working space but also an oppotunity for startup community to make their ambition to change the world come true.
            </p>
            <br/><br/>
            <div class="row">
                <div class="col-md-4" style="overflow: hidden">
                    <div id="co-1">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br/>
                        <b>Phan Minh Tuấn</b>
                        <br/>
                        <br/>
                        <b>Co-Founder/CEO </b>
                        <br/>
                        MSc. Real Estate Management - Greenwich University
                    </p>
                </div>
                <div class="col-md-4" style="overflow: hidden">
                    <div id="co-2">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br/>
                        <b>Đỗ Hoài Nam</b>
                        <br/>
                        <br/>
                        <b>Co-Founder/Chairman </b>
                        <br/>
                        Founder/ Former CEO - Emotive
                        <br/>
                        Founder/CEO - Seespace
                    </p>
                </div>
                <div class="col-md-4" style="overflow: hidden">
                    <div id="co-3">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br/>
                        <b>Bùi Cẩm Vân</b>
                        <br/>
                        <br/>
                        <b>COO </b>
                        <br/>
                        Strategy Consultant - Deloitte UK
                        <br/>
                        BSc. Management - LSE
                    </p>
                </div>
            </div>
        </div>
        <br/><br/>
        <br/><br/>
    </div>
@endsection
