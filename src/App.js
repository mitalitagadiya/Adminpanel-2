import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import Products from './Containers/Products/Products';


function App() {
  return (
    <>
    
    <Layout>

    <Route path={"/Products"} exact component={Products}/>
    {/* <Route path={"/Products"} exact component={Products}/> */}


    </Layout>

    </>
  );
}

export default App;
