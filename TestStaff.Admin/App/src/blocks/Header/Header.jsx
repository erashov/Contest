import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Header extends React.Component {

    constructor(props, context) {
        super(props);

        this.handleTouchTap = () => {
            this.context.router.replace('/');
        };

        this.handleMenuClick = (address) => {
            this.context.router.replace(address);
            this.setState({ open: false });
        };

        this.state = { open: false };
    }

    handleMenuTouchTap = () => {
        this.setState({ open: !this.state.open });
    };

    render() {
        return (
            <div className="header">
                <AppBar
                    title={<span>Система управления тестами</span>}
                    onLeftIconButtonTouchTap={this.handleMenuTouchTap}
                    />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                    >
                    <MenuItem onTouchTap={this.handleMenuClick.bind(this, '/contests')}>Список тестов</MenuItem>
                    <MenuItem onTouchTap={this.handleMenuClick.bind(this, '/client-groups')}>Группы</MenuItem>
                    <MenuItem onTouchTap={this.handleMenuClick.bind(this, '/clients')}>Клиенты</MenuItem>
                </Drawer>
            </div>
        );
    }
}

Header.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Header;
