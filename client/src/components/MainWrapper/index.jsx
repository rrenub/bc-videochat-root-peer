import React from 'react';
import { Layout, Modal } from 'antd'
import { fire } from '../../utils/fire'
import FooterBar from './components/FooterBar'
import Nav from '../Nav'

const { confirm } = Modal
const { Content } = Layout;

const MainWrapper = (props) => {
    const onSignOut = () => {
		confirm({
			title: '¿Está seguro de que quiere cerrar sesión?',
			onOk() {
                //props.history.push('/') 
				fire.auth().signOut()
		  	},
		  	onCancel() {
				console.log('Cancel');
		  	},
		});
	}

    return (
        <Layout className="main_layout">
            <Nav onSignOut={onSignOut}/>

            <Layout>
                <Content className="app_content">
                    <div className="app_wrapper">
                        {props.children}
                    </div>
                </Content>
                
                <FooterBar />

            </Layout>
        </Layout>
    );
};

export default MainWrapper;