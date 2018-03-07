import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {TOGGLE_SIDEBAR} from '../actions/sidebarActions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class Index extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    }
  }
  toggleP() {
    console.log('halo')
    this.setState({
      visible: !this.state.visible
    });
  }
  render() {
    let {props} = this;
    return (<div className="App-intro">
    <p style={{padding: '10px'}}>
      <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab hic libero, unde, sunt eveniet perspiciatis officia, consectetur nostrum debitis accusantium repudiandae accusamus, ut porro nobis magnam animi temporibus illum. Non!</span>
      <span>Id officiis tempora, at in quam optio, corporis maxime doloribus dolore inventore officia voluptate quod nihil quia vero cum. Tempore id aperiam, alias cumque harum aliquam repudiandae, assumenda necessitatibus saepe!</span>
      <span>Quisquam, minima, et. Itaque sed sit harum molestiae molestias, quaerat sunt quam tempore sapiente veniam? Blanditiis dolore quisquam facilis, voluptates hic corporis mollitia magni. Repudiandae nam optio vero suscipit doloremque.</span>
      <span>Eius cupiditate, ex doloribus beatae quibusdam tenetur ad alias modi repudiandae! Nostrum dolor tempore ipsum placeat, dolores sequi reprehenderit aspernatur repudiandae facilis ipsa deleniti ex quis! Nobis tempora, odit eos!</span>
      <span>Aut perspiciatis praesentium officia eligendi assumenda incidunt recusandae ad vel in tempore, exercitationem, obcaecati corporis sapiente autem, illum perferendis unde facilis dignissimos aliquam pariatur. Minima nesciunt tenetur distinctio cum, reiciendis.</span>
      <span>Animi dolore iure neque impedit assumenda tempore tempora, voluptas praesentium, adipisci enim eaque. Maxime deserunt similique totam modi cumque sed. Laboriosam ratione, minus quasi tenetur cupiditate quidem, id illum quos.</span>
      <span>Sed quas impedit sunt explicabo corrupti non minus provident ipsam eaque odit reprehenderit maiores, quibusdam ut consectetur aperiam cum esse alias suscipit doloremque repudiandae officia, adipisci laudantium. Iste, natus, cupiditate.</span>
      <span>Explicabo quasi, cupiditate repellendus nesciunt dolores cum consequatur voluptate, assumenda vel possimus architecto magnam. Totam accusantium in neque explicabo sed suscipit minima velit ducimus, perferendis omnis beatae porro magnam aperiam.</span>
      <span>Quibusdam totam in suscipit beatae similique voluptates, tempora dolorum atque facilis laborum doloribus natus mollitia consectetur autem cumque, tempore quidem porro eius earum. Hic officiis obcaecati consequuntur, est placeat facere.</span>
      <span>Dolor, repellat dolorum sed consequatur totam distinctio et eius, maxime velit possimus aspernatur incidunt, aliquam odit qui inventore similique optio placeat, iste doloremque laborum dignissimos? Totam aliquam fuga placeat quas.</span>
    </p>
      <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {
          this.state.visible && <p className="App-intro">
              React test for Workout Partner
            </p>
        }
      </ReactCSSTransitionGroup>
      <button className="button is-primary" onClick={this.toggleP.bind(this)} style={{
          marginTop: '0.5rem'
        }}>
        Toggle text
      </button>

    </div>)
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleSidebar: TOGGLE_SIDEBAR
  }, dispatch);
}

var IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Index)

export default IndexContainer;
