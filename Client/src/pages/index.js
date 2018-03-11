import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {bindActionCreators} from 'redux';
import {TOGGLE_SIDEBAR} from '../actions/sidebarActions';

class Index extends Component {

  render() {
    return (<div className="App-intro">
      <article className="content is-p-2">
        <h2>Index</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab hic libero, unde, sunt eveniet perspiciatis officia, consectetur nostrum debitis accusantium repudiandae accusamus, ut porro nobis magnam animi temporibus illum. Non!</p>
        <p>Id officiis tempora, at in quam optio, corporis maxime doloribus dolore inventore officia voluptate quod nihil quia vero cum. Tempore id aperiam, alias cumque harum aliquam repudiandae, assumenda necessitatibus saepe!</p>
        <p>Quisquam, minima, et. Itaque sed sit harum molestiae molestias, quaerat sunt quam tempore sapiente veniam? Blanditiis dolore quisquam facilis, voluptates hic corporis mollitia magni. Repudiandae nam optio vero suscipit doloremque.</p>
        <p>Eius cupiditate, ex doloribus beatae quibusdam tenetur ad alias modi repudiandae! Nostrum dolor tempore ipsum placeat, dolores sequi reprehenderit aspernatur repudiandae facilis ipsa deleniti ex quis! Nobis tempora, odit eos!</p>
        <p>Aut perspiciatis praesentium officia eligendi assumenda incidunt recusandae ad vel in tempore, exercitationem, obcaecati corporis sapiente autem, illum perferendis unde facilis dignissimos aliquam pariatur. Minima nesciunt tenetur distinctio cum, reiciendis.</p>
        <p>Animi dolore iure neque impedit assumenda tempore tempora, voluptas praesentium, adipisci enim eaque. Maxime deserunt similique totam modi cumque sed. Laboriosam ratione, minus quasi tenetur cupiditate quidem, id illum quos.</p>
        <p>Sed quas impedit sunt explicabo corrupti non minus provident ipsam eaque odit reprehenderit maiores, quibusdam ut consectetur aperiam cum esse alias suscipit doloremque repudiandae officia, adipisci laudantium. Iste, natus, cupiditate.</p>
        <p>Explicabo quasi, cupiditate repellendus nesciunt dolores cum consequatur voluptate, assumenda vel possimus architecto magnam. Totam accusantium in neque explicabo sed suscipit minima velit ducimus, perferendis omnis beatae porro magnam aperiam.</p>
        <p>Quibusdam totam in suscipit beatae similique voluptates, tempora dolorum atque facilis laborum doloribus natus mollitia consectetur autem cumque, tempore quidem porro eius earum. Hic officiis obcaecati consequuntur, est placeat facere.</p>
        <p>Dolor, repellat dolorum sed consequatur totam distinctio et eius, maxime velit possimus aspernatur incidunt, aliquam odit qui inventore similique optio placeat, iste doloremque laborum dignissimos? Totam aliquam fuga placeat quas.</p>

        <Link to="/secured" className="button is-large is-primary">Interested?</Link>
      </article>
    </div>)
  }
}

function mapStateToProps(state) {
  // TODO Take care of it
  return {
    isAuthenticated: state.auth.isAuthenticated, token: state.auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleSidebar: TOGGLE_SIDEBAR
  }, dispatch);
}

var IndexContainer = connect(mapStateToProps, mapDispatchToProps)(Index)

export default IndexContainer;
