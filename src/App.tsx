import React from 'react';
import './App.css';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import UsersPage from './components/Users/UsersContainer';
import { LoginPage } from './components/login/login';
import { connect } from "react-redux";
import { withRouter } from './components/Profile/withRouter';
import { compose } from 'redux';
import { initializeApp } from './store/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';
import { AppStateType } from './store/redux-store';
import { Breadcrumb, Button, Layout, Menu, MenuProps } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Header } from './components/Header/Header';


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

const items2: MenuProps['items'] = [
  {
    key: 'sub1',
    icon: <UserOutlined />,
    label: 'My Profile',
    children: [
      {
        key: '1', label: <Link to="/profile">Profile</Link>
      },
      {
        key: '2', label: <Link to="/dialogs">Messages</Link>
      },
    ],
  },
  {
    key: 'sub2',
    icon: <LaptopOutlined />,
    label: 'Developers',
    children: [
      {
        key: '5', label: <Link to="/developers">Contacts</Link>
      }
    ],
  },
];

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    initializeApp: () => void
}

type AppPropsType = MapPropsType & DispatchPropsType

class App extends React.Component<AppPropsType> {
  catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
    alert("Some error occurred: "+event.reason);
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    const DialogsWithSuspense = withSuspense(DialogsContainer);
    const ProfileWithSuspense = withSuspense(ProfileContainer);

    return (
      <Layout>
        <Header />
        <div style={{ padding: '0 48px' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
          />
          <Layout
            style={{ padding: '24px 0', background: '#fff' }}
          >
            <Sider width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Routes>
                <Route path="/" element={<Navigate to="/profile" replace />} />
                <Route path="/dialogs/*" element={<DialogsWithSuspense />} />
                <Route path="/profile/:userId?" element={<ProfileWithSuspense />} />
                <Route path="/developers" element={<UsersPage pageTitle={"Developers"} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<div><b>
                  404 Not Found
                  <Button>Ok</Button>
                </b></div>} />
              </Routes>
            </Content>
          </Layout>
        </div>
        <Footer style={{ textAlign: 'center' }}>
          Social Network ©2026 Created by olehpi
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
});

export default compose(
  withRouter,
  (connect(mapStateToProps, { initializeApp }))
)(App);
