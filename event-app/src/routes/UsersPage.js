import * as React from 'react';
import UserList from '../components/UserList';
import { useNavigate } from 'react-router-dom';
import { findSession } from '../model-data/UserData';

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
      const verifySession = async () => {
        try {
          const sessionStatus = await findSession();
          if (sessionStatus) {
            // eslint-disable-next-line
            this.setState({ user: sessionStatus.user });
          } else {
            // eslint-disable-next-line
            this.setState({ errorMessage: 'Please log in to see other users.' });
            this.props.navigate(`/login`);
          }
        } catch (error) {
          console.error('Error verifying session:', error);
        }
      };
      verifySession();
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