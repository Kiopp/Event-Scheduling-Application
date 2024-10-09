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

class Users extends React.Component {

    componentDidMount() {
        axios.get('http://localhost:5001/api/session', { withCredentials: true })
          .then(response => {
            // eslint-disable-next-line
            this.setState({ user: response.data.user });
          })
          .catch(error => {
            // eslint-disable-next-line
            this.setState({ errorMessage: 'Please log in to see other users.' });
            this.props.navigate(`/login`);
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