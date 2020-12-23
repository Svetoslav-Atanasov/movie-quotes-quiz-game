import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

import '../../styles/Header.css';

const Header = () => {
	return (
		<AppBar position="fixed" color="inherit">
			<Toolbar className="Toolbar">
				<Link to={'/'} className="Toolbar-buttons">
					<Button size="large" color="secondary" variant="contained">
						Home
					</Button>
				</Link>
				<Link to={'/settings'} className="Toolbar-buttons">
					<Button size="large" color="secondary" variant="contained">
						Settings
					</Button>
				</Link>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
