import React,{useState} from 'react';
import { Menu, Header } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

function Navbar(){
    const [activeItem,setActiveItem] = useState('check')

    const handleItemClick = (e, { name }) => {setActiveItem(name)}


  return (
    <Menu vertical>
      <Menu.Item
        name='check'
        active={activeItem === 'check'}
        onClick={handleItemClick}
      >
        <Header as='h4'>Check Your Order</Header>
        <p>lhen</p>
      </Menu.Item>

      <Menu.Item
        name='create'
        active={activeItem === 'create'}
        onClick={handleItemClick}
      >
        <Header as='h4'>Create Your Order</Header>
        <p>Check out our collection of coupons</p>
      </Menu.Item>
    </Menu>
  )


}
export default Navbar;