import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {NAME_COMPANY} from '../constants/env';
import Loading from "./common/Loading";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {

  render() {
    return (
      <div id={this.props.isLoadingTab ? '' : 'wrapper'}>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <Link className="navbar-brand" to="/">{NAME_COMPANY} </Link>
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
              <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user"/> {this.props.user.name}
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
                  <a onClick={this.props.onLogOut}><i className="fa fa-fw fa-power-off"/>Đăng xuất</a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="collapse navbar-collapse navbar-ex1-collapse">
            {
              (!this.props.isLoadingTab &&  <ul className="nav navbar-nav side-nav">
                {
                  this.props.tabsListData.map((tab, index) => {
                    let checkDropdown = false;
                    if (tab.parent_id === 0) {
                      this.props.tabsListData.forEach((tabChild) => {
                        if (tabChild.parent_id === tab.id && !checkDropdown) {
                          checkDropdown = true;
                        }
                      });
                      if (checkDropdown){
                        return (
                          <li key={"keytabpar" + index}>
                            <a href={tab.url} data-toggle="collapse" data-target={'#tab' + tab.id}>
                              {tab.name}
                              <i className="fa fa-fw fa-caret-down"/>
                            </a>
                            <ul id={'tab' + tab.id} className="collapse">
                              {
                                this.props.tabsListData.map((tabChild, index) => {
                                  if (tabChild.parent_id === tab.id) {
                                    return (
                                      <li key={"keytabchil" + index}>
                                        <Link to={tabChild.url} activeClassName="active">{tabChild.name}</Link>
                                      </li>
                                    );
                                  }
                                })
                              }
                            </ul>
                          </li>
                        )} else {
                        return (
                          <li key={"keytabpar" + index}>
                            <Link to={tab.url} activeClassName="active">{tab.name}</Link>
                          </li>
                        );
                      }
                    }
                  })
                }
              </ul>)
            }

          </div>
        </nav>
        {!this.props.isLoadingTab ? this.props.children : <div id="loading-page"><Loading/></div>}
      </div>

    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
