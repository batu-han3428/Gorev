import {connect} from 'react-redux';
import React from "react";



const Home = (props) => {
    return(
    <main className="main-content border-radius-lg col-md-10 ms-auto">  

    </main>
    );
}

const mapStateToProps = (store) =>{     
    return {
        User:store.userBilgileri || null
    }
}
  
export default connect(mapStateToProps)(Home);