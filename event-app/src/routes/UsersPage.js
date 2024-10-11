import * as React from 'react';
import axios from 'axios';
import UserList from '../components/UserList';
import { useNavigate } from 'react-router-dom';

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let navigate = useNavigate();
      return <Component {...props} navigate={navigate} />;
    }
  
    return ComponentWithRouterProp;
  }

// checks if the current user is logged in
class Users extends React.Component {

    componentDidMount() {
        axios.get('http://localhost:5001/api/session', { withCredentials: true }) // checks current session
          .then(response => {
            // eslint-disable-next-line
            this.setState({ user: response.data.user });
          })
          .catch(error => {
            // eslint-disable-next-line
            this.setState({ errorMessage: 'Please log in to see other users.' });
            this.props.navigate(`/login`); // if not logged in, is redirected to the login page
          });
      }

    render() {
        return (
            <div className='Content'>
                <h1 className='PageTitle'>
                    Users
                </h1>
                <UserList/>
            </div>
        );
    }
}

export default withRouter(Users);