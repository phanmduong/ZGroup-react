@extends('upcoworkingspace::layouts.en-master')


@section('en-content')
    <style>
        .banner {
            background: url("http://up-co.vn/wp-content/uploads/2016/06/alleydesks2.jpg");
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
        .green-text {
            color: #96d21f;
        }
    </style>
    <div class="banner flexbox-centering">
        <div class="text-uppercase text-center white-text">
            <h3>UP CO-WORKING space</h3>
            <h2>jobs and vacancies </h2>
        </div>
    </div>
    <br/>
    <br/>

    <div class="container">
        <h2 class="text-center font-weight-bold text-uppercase">
                JOIN OUR TEAM!
        </h2>
        <br/>
        <p class="text-center">
                Are you looking for a Startup career in Vietnam? Be part of the team that’s spearheading Vietnam’s largest community of startups, freelancers, entrepreneurs, creatives and techies. Check out our job openings and learn more about the epic work we do.
        </p>
        <br/><br/>
        <div class="row">
            <div class="col-md-6">
                <h3 class="text-uppercase font-weight-bold">
                        JOB & VACANCIES
                </h3>
                <br/>
                <p class="font-weight-bold">
                        Space & Event Intern
                </p>
                <br/>
                <p>
                        <span class="font-weight-bold">Availability</span>: August 2016
                </p>
                <p class="font-weight-bold">
                        1.Overall running, maintenance and improvement of the space
                </p>
                <ul>
                    <li>
                            Regular inventory checks and purchase of the required inventory (stationery, printing supplies, pantry supplies etc.)
                    </li>
                    <li>
                            Displaying space signs as per requirement for notices, announcements or instructions
                    </li>
                    <li>
                            Purchasing food and drinks for Community events
                    </li>
                    <li>
                            Providing logistics support to the Events team for space setup prior to events
                    </li>
                    <li>
                            Sorting of delivered mails and updating of pigeonholes labels
                    </li>
                    <li>
                            Printing of collaterals for the Team/space/events
                    </li>
                    <li>
                            Assisting the Community Manager with locker allocations to members and updating of records
                    </li>
                    <li>
                            Preparing the Community Events Update for the upcoming week and displaying them around the space
                    </li>
                    <li>
                            Managing the maintenance and Janitorial team
                    </li>
                    <li>
                            Running ad-hoc errands.
                    </li>
                </ul>
                <p class="font-weight-bold">
                        2. Ensuring a well-stocked, organized, clean and inspiring space
                        <br/>
                        3. Hosting members and visitors at UP host table whenever required
                        <br/>
                        <br/>
                        REQUIREMENTS
                </p>
                <ul>
                        <li>
                                Can adapt well to a flexible, dynamic and changing environment
                        </li>
                        <li>
                                Comfortable working in a coworking space and startup environment
                        </li>
                        <li>
                                Enjoys team work while also being able to work independently
                        </li>
                        <li>
                                Organised and meticulous
                        </li>
                        <li>
                                Positive attitude towards our members, partners and public
                        </li>
                        <li>
                                Can relate, adapt and engage with very diverse people in terms of their culture and professional background
                        </li>
                </ul>
            </div>
            <div class="col-md-6">
                <h3 class="font-weight-bold">
                        Are you a good fit? Awesome, we want to hear from you!
                </h3>
                <br/>
                <p>Oops! We could not locate your form.</p>
            </div>
        </div>
    </div>
@endsection