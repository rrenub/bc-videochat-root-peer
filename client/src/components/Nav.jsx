import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
	AppstoreOutlined,
    LoginOutlined,
	InfoCircleOutlined,
	AppstoreAddOutlined,
	RadarChartOutlined,
	CopyOutlined
  } from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Nav = (props) => {
	const { onSignOut } = props

    return (
        <Sider breakpoint="lg" collapsedWidth={0}>

            <h2 className="logo">Nodo raíz</h2>

          	<Menu theme="dark" mode="inline">

				<SubMenu key="sub1"  title="Nodos" icon={<AppstoreOutlined />}>

					<Menu.Item key="1" icon={<InfoCircleOutlined />}>
						<Link to='/nodes'>Administrar nodos</Link>
					</Menu.Item>

					<Menu.Item key="2" icon={<AppstoreAddOutlined />}>
						<Link to='/add-node'>Añadir nodo</Link>
					</Menu.Item>

				</SubMenu>

			  	<Menu.Item key="3" icon={<RadarChartOutlined />}>
					<Link to='/'>Cadena de bloques</Link>
				</Menu.Item>

				<Menu.Item key="4" icon={<CopyOutlined />}>
					<Link to='/transactions'>Transacciones</Link>
				</Menu.Item>

				<Menu.Item danger key="7" icon={<LoginOutlined />} onClick={onSignOut}>
					Cerrar sesión
				</Menu.Item>
          	</Menu>
			  
        </Sider>
    )
}

export default Nav;