import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <Link className="navbar-brand" to="/">color ME </Link>
          </div>

          <ul className="nav navbar-right top-nav">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-envelope"/> <b
                className="caret"/></a>
              <ul className="dropdown-menu message-dropdown">
                <li className="message-preview">
                  <a href="#">
                    <div className="media">
                                    <span className="pull-left">
                                        <img className="media-object" src="http://placehold.it/50x50" alt=""/>
                                    </span>
                      <div className="media-body">
                        <h5 className="media-heading"><strong>John Smith</strong>
                        </h5>
                        <p className="small text-muted"><i className="fa fa-clock-o"/> Yesterday at 4:32 PM</p>
                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="message-preview">
                  <a href="#">
                    <div className="media">
                                    <span className="pull-left">
                                        <img className="media-object" src="http://placehold.it/50x50" alt=""/>
                                    </span>
                      <div className="media-body">
                        <h5 className="media-heading"><strong>John Smith</strong>
                        </h5>
                        <p className="small text-muted"><i className="fa fa-clock-o"/>Yesterday at 4:32 PM</p>
                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="message-preview">
                  <a href="#">
                    <div className="media">
                                    <span className="pull-left">
                                        <img className="media-object" src="http://placehold.it/50x50" alt=""/>
                                    </span>
                      <div className="media-body">
                        <h5 className="media-heading"><strong>John Smith</strong>
                        </h5>
                        <p className="small text-muted"><i className="fa fa-clock-o"/>Yesterday at 4:32 PM</p>
                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="message-footer">
                  <a href="#">Read All New Messages</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-bell"/><b
                className="caret"/></a>
              <ul className="dropdown-menu alert-dropdown">
                <li>
                  <a href="#">Alert Name <span className="label label-default">Alert Badge</span></a>
                </li>
                <li>
                  <a href="#">Alert Name <span className="label label-primary">Alert Badge</span></a>
                </li>
                <li>
                  <a href="#">Alert Name <span className="label label-success">Alert Badge</span></a>
                </li>
                <li>
                  <a href="#">Alert Name <span className="label label-info">Alert Badge</span></a>
                </li>
                <li>
                  <a href="#">Alert Name <span className="label label-warning">Alert Badge</span></a>
                </li>
                <li>
                  <a href="#">Alert Name <span className="label label-danger">Alert Badge</span></a>
                </li>
                <li className="divider"/>
                <li>
                  <a href="#">View All</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user"/>John Smith
                <b className="caret"/></a>
              <ul className="dropdown-menu">
                <li>
                  <a href="#"><i className="fa fa-fw fa-user"/>Profile</a>
                </li>
                <li>
                  <a href="#"><i className="fa fa-fw fa-envelope"/>Inbox</a>
                </li>
                <li>
                  <a href="#"><i className="fa fa-fw fa-gear"/>Settings</a>
                </li>
                <li className="divider"/>
                <li>
                  <a href="#"><i className="fa fa-fw fa-power-off"/>Log Out</a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="collapse navbar-collapse navbar-ex1-collapse">
            <ul className="nav navbar-nav side-nav">
              <li>
                <IndexLink to="/" activeClassName="active"><i className="fa fa-fw fa-dashboard"/>Trang chủ</IndexLink>
              </li>
              <li>
                <a href="javascript:;" data-toggle="collapse" data-target="#demo1"><i className="fa fa-fw fa-edit"/>Quản
                  lý tài chính <i className="fa fa-fw fa-caret-down"/></a>
                <ul id="demo1" className="collapse">
                  <li>
                    <Link to="collect-money" activeClassName="active">Thu tiền học</Link>
                  </li>
                  <li>
                    <Link to="/" activeClassName="active">Dropdown Item</Link>
                  </li>
                </ul>
              </li>
              <li>
                <a href="charts.html"><i className="fa fa-fw fa-bar-chart-o"/>Charts</a>
              </li>
              <li>
                <a href="tables.html"><i className="fa fa-fw fa-table"/>Tables</a>
              </li>
              <li>
                <a href="forms.html"><i className="fa fa-fw fa-edit"/>Forms</a>
              </li>
              <li>
                <a href="bootstrap-elements.html"><i className="fa fa-fw fa-desktop"/>Bootstrap Elements</a>
              </li>
              <li>
                <a href="bootstrap-grid.html"><i className="fa fa-fw fa-wrench"/>Bootstrap Grid</a>
              </li>
              <li>
                <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i className="fa fa-fw fa-arrows-v"/>Dropdown
                  <i className="fa fa-fw fa-caret-down"/></a>
                <ul id="demo" className="collapse">
                  <li>
                    <Link to="/" activeClassName="active">Dropdown Item</Link>
                  </li>
                  <li>
                    <Link to="/" activeClassName="active">Dropdown Item</Link>
                  </li>
                </ul>
              </li>
              <li>
                <a href="blank-page.html"><i className="fa fa-fw fa-file"/>Blank Page</a>
              </li>
              <li>
                <a href="index-rtl.html"><i className="fa fa-fw fa-dashboard"/>RTL Dashboard</a>
              </li>
            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>

    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
