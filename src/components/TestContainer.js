import React from 'react';
class TestContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div>
                <div className="wrapper">

                    <div className="sidebar" data-color="purple" data-image="../assets/img/sidebar-1.jpg">
                        <div className="logo">
                            <a href="http://www.creative-tim.com" className="simple-text">
                                Creative Tim
                            </a>
                        </div>

                        <div className="sidebar-wrapper">
                            <ul className="nav">
                                <li className="active">
                                    <a href="dashboard.html">
                                        <i className="material-icons">dashboard</i>
                                        <p>Dashboard</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="user.html">
                                        <i className="material-icons">person</i>
                                        <p>User Profile</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="table.html">
                                        <i className="material-icons">content_paste</i>
                                        <p>Table List</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="typography.html">
                                        <i className="material-icons">library_books</i>
                                        <p>Typography</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="icons.html">
                                        <i className="material-icons">bubble_chart</i>
                                        <p>Icons</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="maps.html">
                                        <i className="material-icons">location_on</i>
                                        <p>Maps</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="notifications.html">
                                        <i className="material-icons text-gray">notifications</i>
                                        <p>Notifications</p>
                                    </a>
                                </li>
                                <li className="active-pro">
                                    <a href="upgrade.html">
                                        <i className="material-icons">unarchive</i>
                                        <p>Upgrade to PRO</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="main-panel">
                        <nav className="navbar navbar-transparent navbar-absolute">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                    <a className="navbar-brand" href="#">Material Dashboard</a>
                                </div>
                                <div className="collapse navbar-collapse">
                                    <ul className="nav navbar-nav navbar-right">
                                        <li>
                                            <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
                                                <i className="material-icons">dashboard</i>
                                                <p className="hidden-lg hidden-md">Dashboard</p>
                                            </a>
                                        </li>
                                        <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                                <i className="material-icons">notifications</i>
                                                <span className="notification">5</span>
                                                <p className="hidden-lg hidden-md">Notifications</p>
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li><a href="#">Mike John responded to your email</a></li>
                                                <li><a href="#">You have 5 new tasks</a></li>
                                                <li><a href="#">You're now friend with Andrew</a></li>
                                                <li><a href="#">Another Notification</a></li>
                                                <li><a href="#">Another One</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
                                                <i className="material-icons">person</i>
                                                <p className="hidden-lg hidden-md">Profile</p>
                                            </a>
                                        </li>
                                    </ul>

                                    <form className="navbar-form navbar-right" role="search">
                                        <div className="form-group  is-empty">
                                            <input type="text" className="form-control" placeholder="Search"/>
                                            <span className="material-input">
                                                </span>
                                        </div>
                                        <button type="submit" className="btn btn-white btn-round btn-just-icon">
                                            <i className="material-icons">search</i>
                                            <div className="ripple-container"></div>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </nav>

                        <div className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="card card-stats">
                                            <div className="card-header" data-background-color="orange">
                                                <i className="material-icons">content_copy</i>
                                            </div>
                                            <div className="card-content">
                                                <p className="category">Used Space</p>
                                                <h3 className="title">49/50
                                                    <small>GB</small>
                                                </h3>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons text-danger">warning</i> <a
                                                    href="#pablo">Get More Space...</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="card card-stats">
                                            <div className="card-header" data-background-color="green">
                                                <i className="material-icons">store</i>
                                            </div>
                                            <div className="card-content">
                                                <p className="category">Revenue</p>
                                                <h3 className="title">$34,245</h3>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">date_range</i> Last 24 Hours
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="card card-stats">
                                            <div className="card-header" data-background-color="red">
                                                <i className="material-icons">info_outline</i>
                                            </div>
                                            <div className="card-content">
                                                <p className="category">Fixed Issues</p>
                                                <h3 className="title">75</h3>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">local_offer</i> Tracked from Github
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="card card-stats">
                                            <div className="card-header" data-background-color="blue">
                                                <i className="fa fa-twitter"></i>
                                            </div>
                                            <div className="card-content">
                                                <p className="category">Followers</p>
                                                <h3 className="title">+245</h3>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">update</i> Just Updated
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header card-chart" data-background-color="green">
                                                <div className="ct-chart" id="dailySalesChart"></div>
                                            </div>
                                            <div className="card-content">
                                                <h4 className="title">Daily Sales</h4>
                                                <p className="category"><span className="text-success"><i
                                                    className="fa fa-long-arrow-up"></i> 55%  </span> increase in today
                                                    sales.</p>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">access_time</i> updated 4 minutes ago
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header card-chart" data-background-color="orange">
                                                <div className="ct-chart" id="emailsSubscriptionChart"></div>
                                            </div>
                                            <div className="card-content">
                                                <h4 className="title">Email Subscriptions</h4>
                                                <p className="category">Last Campaign Performance</p>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">access_time</i> campaign sent 2 days
                                                    ago
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header card-chart" data-background-color="red">
                                                <div className="ct-chart" id="completedTasksChart"></div>
                                            </div>
                                            <div className="card-content">
                                                <h4 className="title">Completed Tasks</h4>
                                                <p className="category">Last Campaign Performance</p>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">access_time</i> campaign sent 2 days
                                                    ago
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        <div className="card card-nav-tabs">
                                            <div className="card-header" data-background-color="purple">
                                                <div className="nav-tabs-navigation">
                                                    <div className="nav-tabs-wrapper">
                                                        <span className="nav-tabs-title">Tasks:</span>
                                                        <ul className="nav nav-tabs" data-tabs="tabs">
                                                            <li className="active">
                                                                <a href="#profile" data-toggle="tab">
                                                                    <i className="material-icons">bug_report</i>
                                                                    Bugs
                                                                    <div className="ripple-container"></div>
                                                                </a>
                                                            </li>
                                                            <li className="">
                                                                <a href="#messages" data-toggle="tab">
                                                                    <i className="material-icons">code</i>
                                                                    Website
                                                                    <div className="ripple-container"></div>
                                                                </a>
                                                            </li>
                                                            <li className="">
                                                                <a href="#settings" data-toggle="tab">
                                                                    <i className="material-icons">cloud</i>
                                                                    Server
                                                                    <div className="ripple-container"></div>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-content">
                                                <div className="tab-content">
                                                    <div className="tab-pane active" id="profile">
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox"
                                                                                   name="optionsCheckboxes" checked/>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>Sign contract for "What are conference organizers
                                                                    afraid of?"
                                                                </td>
                                                                <td className="td-actions text-right">
                                                                    <button type="button" rel="tooltip"
                                                                            title="Edit Task"
                                                                            className="btn btn-primary btn-simple btn-xs">
                                                                        <i className="material-icons">edit</i>
                                                                    </button>
                                                                    <button type="button" rel="tooltip" title="Remove"
                                                                            className="btn btn-danger btn-simple btn-xs">
                                                                        <i className="material-icons">close</i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox"
                                                                                   name="optionsCheckboxes"/>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>Lines From Great Russian Literature? Or E-mails From
                                                                    My Boss?
                                                                </td>
                                                                <td className="td-actions text-right">
                                                                    <button type="button" rel="tooltip"
                                                                            title="Edit Task"
                                                                            className="btn btn-primary btn-simple btn-xs">
                                                                        <i className="material-icons">edit</i>
                                                                    </button>
                                                                    <button type="button" rel="tooltip" title="Remove"
                                                                            className="btn btn-danger btn-simple btn-xs">
                                                                        <i className="material-icons">close</i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox"
                                                                                   name="optionsCheckboxes"/>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>Flooded: One year later, assessing what was lost and
                                                                    what was found when a ravaging rain swept through
                                                                    metro Detroit
                                                                </td>
                                                                <td className="td-actions text-right">
                                                                    <button type="button" rel="tooltip"
                                                                            title="Edit Task"
                                                                            className="btn btn-primary btn-simple btn-xs">
                                                                        <i className="material-icons">edit</i>
                                                                    </button>
                                                                    <button type="button" rel="tooltip" title="Remove"
                                                                            className="btn btn-danger btn-simple btn-xs">
                                                                        <i className="material-icons">close</i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox"
                                                                                   name="optionsCheckboxes" checked/>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>Create 4 Invisible User Experiences you Never Knew
                                                                    About
                                                                </td>
                                                                <td className="td-actions text-right">
                                                                    <button type="button" rel="tooltip"
                                                                            title="Edit Task"
                                                                            className="btn btn-primary btn-simple btn-xs">
                                                                        <i className="material-icons">edit</i>
                                                                    </button>
                                                                    <button type="button" rel="tooltip" title="Remove"
                                                                            className="btn btn-danger btn-simple btn-xs">
                                                                        <i className="material-icons">close</i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="tab-pane" id="messages">
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox"
                                                                                   name="optionsCheckboxes" checked/>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>Flooded: One year later, assessing what was lost and
                                                                    what was found when a ravaging rain swept through
                                                                    metro Detroit
                                                                </td>
                                                                <td className="td-actions text-right">
                                                                    <button type="button" rel="tooltip"
                                                                            title="Edit Task"
                                                                            className="btn btn-primary btn-simple btn-xs">
                                                                        <i className="material-icons">edit</i>
                                                                    </button>
                                                                    <button type="button" rel="tooltip" title="Remove"
                                                                            className="btn btn-danger btn-simple btn-xs">
                                                                        <i className="material-icons">close</i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox"
                                                                                   name="optionsCheckboxes"/>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>Sign contract for "What are conference organizers
                                                                    afraid of?"
                                                                </td>
                                                                <td className="td-actions text-right">
                                                                    <button type="button" rel="tooltip"
                                                                            title="Edit Task"
                                                                            className="btn btn-primary btn-simple btn-xs">
                                                                        <i className="material-icons">edit</i>
                                                                    </button>
                                                                    <button type="button" rel="tooltip" title="Remove"
                                                                            className="btn btn-danger btn-simple btn-xs">
                                                                        <i className="material-icons">close</i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="tab-pane" id="settings">
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox"
                                                                                   name="optionsCheckboxes"/>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>Lines From Great Russian Literature? Or E-mails From
                                                                    My Boss?
                                                                </td>
                                                                <td className="td-actions text-right">
                                                                    <button type="button" rel="tooltip"
                                                                            title="Edit Task"
                                                                            className="btn btn-primary btn-simple btn-xs">
                                                                        <i className="material-icons">edit</i>
                                                                    </button>
                                                                    <button type="button" rel="tooltip" title="Remove"
                                                                            className="btn btn-danger btn-simple btn-xs">
                                                                        <i className="material-icons">close</i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox"
                                                                                   name="optionsCheckboxes" checked/>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>Flooded: One year later, assessing what was lost and
                                                                    what was found when a ravaging rain swept through
                                                                    metro Detroit
                                                                </td>
                                                                <td className="td-actions text-right">
                                                                    <button type="button" rel="tooltip"
                                                                            title="Edit Task"
                                                                            className="btn btn-primary btn-simple btn-xs">
                                                                        <i className="material-icons">edit</i>
                                                                    </button>
                                                                    <button type="button" rel="tooltip" title="Remove"
                                                                            className="btn btn-danger btn-simple btn-xs">
                                                                        <i className="material-icons">close</i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox"
                                                                                   name="optionsCheckboxes"/>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>Sign contract for "What are conference organizers
                                                                    afraid of?"
                                                                </td>
                                                                <td className="td-actions text-right">
                                                                    <button type="button" rel="tooltip"
                                                                            title="Edit Task"
                                                                            className="btn btn-primary btn-simple btn-xs">
                                                                        <i className="material-icons">edit</i>
                                                                    </button>
                                                                    <button type="button" rel="tooltip" title="Remove"
                                                                            className="btn btn-danger btn-simple btn-xs">
                                                                        <i className="material-icons">close</i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className="card">
                                            <div className="card-header" data-background-color="orange">
                                                <h4 className="title">Employees Stats</h4>
                                                <p className="category">New employees on 15th September, 2016</p>
                                            </div>
                                            <div className="card-content table-responsive">
                                                <table className="table table-hover">
                                                    <thead className="text-warning">
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Salary</th>
                                                    <th>Country</th>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Dakota Rice</td>
                                                        <td>$36,738</td>
                                                        <td>Niger</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Minerva Hooper</td>
                                                        <td>$23,789</td>
                                                        <td>Curaçao</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>Sage Rodriguez</td>
                                                        <td>$56,142</td>
                                                        <td>Netherlands</td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>Philip Chaney</td>
                                                        <td>$38,735</td>
                                                        <td>Korea, South</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer className="footer">
                            <div className="container-fluid">
                                <nav className="pull-left">
                                    <ul>
                                        <li>
                                            <a href="#">
                                                Home
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                Company
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                Portfolio
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                Blog
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                                <p className="copyright pull-right">
                                    &copy;
                                    <script>document.write(new Date().getFullYear())</script>
                                    <a href="http://www.creative-tim.com">Creative Tim</a>, made with love for a better
                                    web
                                </p>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

TestContainer.propTypes = {
    // myProp: PropTypes.string.isRequired
};

export default TestContainer;