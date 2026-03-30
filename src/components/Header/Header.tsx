import { Link } from 'react-router-dom';
import { Avatar, Button, Col, Layout, Menu, MenuProps, Row } from 'antd';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { selectCurrentUserLogin, selectIsAuth } from '../../store/auth-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth-reducer';
import type { AppDispatch } from '../../store/redux-store';

export type PropsType = {}

const items1: MenuProps['items'] = [
    {
        key: 'sub1',
        icon: <UserOutlined />,
        label: 'My Profile',
        children: [
            { key: '1', label: <Link to="/profile">Profile</Link> },
            { key: '2', label: <Link to="/dialogs">Messages</Link> },
        ],
    },
    {
        key: 'sub2',
        icon: <LaptopOutlined />,
        label: 'Developers',
        children: [
            { key: '5', label: <Link to="/developers">Contacts</Link> },
        ],
    },
];

export const Header: React.FC<PropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectCurrentUserLogin);

    const dispatch = useDispatch<AppDispatch>();
    const logoutCallBack = () => {
        dispatch(logout());
    }

    const { Header } = Layout;
    return <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Row>
            <Col flex="auto">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items1}
                    style={{ flex: 1, minWidth: 0 }}
                /></Col>
            {
                isAuth ? <>
                    <Col>
                        <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    </Col>
                    <Col>
                        <Button onClick={logoutCallBack}>Log out</Button>
                    </Col>
                </>
                    : <Col flex="none">
                        <Button>
                            <Link to={'/login'} replace>Login</Link>
                        </Button>
                    </Col>
            }
        </Row>
    </Header>
}
