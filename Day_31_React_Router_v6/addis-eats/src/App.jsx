import { useState } from 'react';
// import './CategoryBar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Store from './Store.jsx';



function OrderCounter() {
const [count, setCount] = useState(0);
// value updater initial value
return (
<button onClick={() => setCount(count + 1)}>
Add Orders: {count}
</button>
);
}

function App() {

  return (
    <>
      <section id="center">
        <Header />
        <OrderCounter />
      </section>
      
      <Store />
      
      <section className='footer'>
        <Footer />
      </section>
    </>
  )
}

export default App
