@extends('upcoworkingspace::layouts.en-master')



@section('en-content')
    <style>
        .banner {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/back2.jpg");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            height: 400px;
        }

        .flexbox-centering {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .white-text {
            color: #fff;
        }
    </style>
    <div class="banner flexbox-centering">
        <div class="text-uppercase text-center white-text">
            <h3>UP CO-WORKING space</h3>
            <h2>ĐỐI TÁC TRUYỀN THÔNG</h2>
        </div>
    </div>
    <br/>
    <br/>
    <div class="container">
        <h3 class="text-center text-uppercase font-weight-bold">
                FREQUENTLY ASKED QUESTIONS
        </h3>
        <br/>
        <p class="text-center">
            You have questions about UP Co-working Space? We are here to address your concerns.
            <br/>
            Below are our most frequently asked questions. Simply click on the question for the answer to drop down.
            <br/>
            If the question you are looking for is not listed, please contact our Community Manager:  <a style="color: #96d21f;"
                                                                                               href="#" target="_blank">anhnn@up-co.vn</a>
        </p>
        <br/><br/>
        <div id="accordion">
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse1"
                                aria-expanded="true" aria-controls="collapse1">
                                What are the benefits of UP members?
                        </button>
                    </h5>
                </div>

                <div id="collapse1" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            Work in a modern, well-equipped and professional environment.
                        <ul>
                            <li>
                                    Modern meeting room 24/7
                            </li>
                            <li>
                                    Free use: 86 inch Led-screen TV, 3D Projector, Apple TV
                            </li>
                            <li>
                                    Free tea and coffee
                            </li>
                            <li>
                                    Free parking
                            </li>
                            <li>
                                    Connect and widen network with freelancers, developers, designers and startups coming from a variety of areas at UP
                            </li>
                            <li>
                                    Free entrance to all events held by UP
                            </li>
                            <li>
                                    Business Registration and Consultation Support
                            </li>
                            <li>
                                    Learn and connect with high-profile speakers, thought leaders, industry experts in events at UP
                            </li>
                            <li>
                                    Get advice on business regulations, design, etc from credible parnters of UP
                            </li>
                            <li>
                                    Gain chance to expose, pitch to investor network
                            </li>
                        </ul>
                        And enjoy several benefits wit UP Membership:
                        <ul>
                            <li>
                                    Free play at Dóo (Level 6, 7 at HNCC building)
                            </li>
                            <li>
                                    Voucher from Edoctor and Uber
                            </li>
                            <li>
                                    15% discount when register at Swequity Gym (Level 10 at HNCC Building)
                            </li>
                            <li>
                                    10% discount at Boo cafe (Level 1 at HNCC Building)
                            </li>
                            <li>
                                    15% discount at Kohsamui (183 Giang Vo, 34A Quang Trung)
                            </li>
                            <li>
                                    10% discount at Cong cafe (15 Truc Bach, 101B1 Tran Huy Lieu, 101 Van Phuc, Cong Ma May)
                            </li>
                            <li>
                                    10% discount for charity trip at VEO (<a style="color: #96d21f;"
                                                         href="http://www.volunteerforeducation.org" target="_blank">http://www.volunteerforeducation.org</a>)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse2"
                                aria-expanded="false" aria-controls="collapse2">
                                How can I get access to the space?
                        </button>
                    </h5>
                </div>
                <div id="collapse2" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            If you are a member of UP, you can get in by membership card. If you are a visitor, you can ring the bell and register at reception desk.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse3"
                                aria-expanded="false" aria-controls="collapse3">
                                What are open and close times at UP?
                        </button>
                    </h5>
                </div>
                <div id="collapse3" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            Up opens 24/7. If you want to work through the night, you need to register at receptionist no later than 8:00PM
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse4"
                                aria-expanded="false" aria-controls="collapse4">
                                What membership packages UP provides?
                        </button>
                    </h5>
                </div>
                <div id="collapse4" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            UP is providing 2 main membership packages: Flexible Membership and Full-time Membership with many priorities for long-term membership. Moreover, UP also have virtual office package and meeting room booking.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse5"
                                aria-expanded="false" aria-controls="collapse5">
                                Can I pay by month if I register for Full-time membership (1,000,000VND/month)?
                        </button>
                    </h5>
                </div>
                <div id="collapse5" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            No, promotion applies only to one-time payment
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse6"
                                aria-expanded="false" aria-controls="collapse6">
                                How can I change membership type? For example, how can I change from Flexible Membership to Full-time membership?
                        </button>
                    </h5>
                </div>
                <div id="collapse6" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            You only need to pay 1,300,000VND and your Full-time membership will be activated from the day you pay and activate your Flexible membership.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse7"
                                aria-expanded="false" aria-controls="collapse7">
                                How to become UP member?
                        </button>
                    </h5>
                </div>
                <div id="collapse7" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            You can go to receptionist to register and make payment or sent your request to our email: <a style="color: #96d21f;"
                                                                                                                                                     href="#" target="_blank">info@up-co.vn</a> and we will get back to you.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse8"
                                aria-expanded="false" aria-controls="collapse8">
                                When being UP member, can I use meeting room?
                        </button>
                    </h5>
                </div>
                <div id="collapse8" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            Yes, you are free to use meeting room when being UP member, except advanced booking hours.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse9"
                                aria-expanded="false" aria-controls="collapse9">
                                Can I invite my guests to UP?
                        </button>
                    </h5>
                </div>
                <div id="collapse9" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            Yes, if you are Full-time member, you can invite maximum of 04 guests at once. The meetings should not exceed 02 hours and not consecutive. If you are Flexible member, you can invite maximum of 02 guests at once. The meetings should not exceed 01 hour and not consecutive.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse10"
                                aria-expanded="false" aria-controls="collapse10">
                                Where can I have Skype call?
                        </button>
                    </h5>
                </div>
                <div id="collapse10" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            UP is equipped with 02 private phone booths for Skype meetings
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse11"
                                aria-expanded="false" aria-controls="collapse11">
                                Can I store my belongings at UP?
                        </button>
                    </h5>
                </div>
                <div id="collapse11" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            Yes, UP members can store their belongings according to their membership types.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse12"
                                aria-expanded="false" aria-controls="collapse12">
                                Can I use mail service at UP?
                        </button>
                    </h5>
                </div>
                <div id="collapse12" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            Yes, mail service belongs to virtual office package of UP
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse13"
                                aria-expanded="false" aria-controls="collapse13">
                                Can I have a fixed phone number at UP?
                        </button>
                    </h5>
                </div>
                <div id="collapse13" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            Yes, you can have a fixed phone number when register virtual office package at UP
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse14"
                                aria-expanded="false" aria-controls="collapse14">
                                What’s special about the space and the furniture?
                        </button>
                    </h5>
                </div>
                <div id="collapse14" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            UP’s design is inspired by working space of well-known firms such as Facebook or Google, carrying an open, modern, vibrant and friendly environment.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse15"
                                aria-expanded="false" aria-controls="collapse15">
                                What is Up's internet like?
                        </button>
                    </h5>
                </div>
                <div id="collapse15" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            The Internet at UP is very fast, catering for high working demands of all UP members.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse16"
                                aria-expanded="false" aria-controls="collapse16">
                                Are there any quiet areas for working?
                        </button>
                    </h5>
                </div>
                <div id="collapse16" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            Yes, there are plenty of private and quiet corners such as green space with trees and great views for those who needs concentration.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse17"
                                aria-expanded="false" aria-controls="collapse17">
                                How do we help UP members connect to each other?

                        </button>
                    </h5>
                </div>
                <div id="collapse17" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            UP frequently hosts networking and monthly programs to bring UP member closer to each other.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse18"
                                aria-expanded="false" aria-controls="collapse18">
                                How do UP members get informed of events happening at UP?
                        </button>
                    </h5>
                </div>
                <div id="collapse18" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            All UP members receive invitation ticket and be kept in touch with updated information about events and programs at UP through Email and Facebook.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse19"
                                aria-expanded="false" aria-controls="collapse19">
                                How do we support UP member's professional growth?
                        </button>
                    </h5>
                </div>
                <div id="collapse19" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            UP supports member’s professional growth through mentorship and connection with partners, investors of UP’s network.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse20"
                                aria-expanded="false" aria-controls="collapse20">
                                Do we run networking events?
                        </button>
                    </h5>
                </div>
                <div id="collapse20" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                            Yes, every events hosted by UP includes a networking part for members to build relationship with each other and with guest speakers to get inspired, learn technical knowledge and widen their networks.
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

@endsection
