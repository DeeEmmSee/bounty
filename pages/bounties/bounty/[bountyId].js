import { withRouter } from 'next/router';

class Bounty extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div>
                {this.props.router.query.bountyId}
            </div>
        );
    }
}

export default withRouter(Bounty);