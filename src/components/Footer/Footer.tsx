import * as React from 'react';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';
import { Icon } from "@progress/kendo-react-common";
import { Link } from "react-router-dom";
import './Footer.css';

export const Footer = () => {
  return <div className='footer'>
    <AppBar position={'bottom'} style={{
      backgroundColor: '#4AA675',
      width: '1922px',
      height: '321px'
    }}>
      <AppBarSpacer style={{
        width: 150
      }} />
      <AppBarSection>
        <div className='info'>
          <ul className='categories'>
              <li>
                <span className='title'>Categories</span>
              </li>
            <Link to='/components'>
              <li>
                <span className='listStyle'>Components</span>
              </li>
            </Link>
            <Link to='/bikes'>
              <li>
                <span className='listStyle'>Bikes</span>
              </li>
            </Link>
            <Link to='/clothes'>
              <li>
                <span className='listStyle'>Clothes</span>
              </li>
            </Link>
            <Link to='/accessories'>
              <li>
                <span className='listStyle'>Accessories</span>
              </li>
            </Link>
          </ul>
          <ul className='contacts'>
            <div className='address'>
              <li>
                <span className='title'>Contacts</span>
              </li>
              <li>
                <span className='listStyle'>United States <br></br>
                  932 Clousson Road Str <br></br>
                  Sergeant Bluff, Iowa<br></br>
                  712-923-1916 <br></br>
                  51054</span>
              </li>
            </div>
            <div className='email'>
              <li>
                <span className='listStyle'>contacts@voyago.com</span>
              </li>
            </div>
          </ul>
          <div className='payment'>
            <p className='title'>Payment Methods</p>
            <Link to=''><img src={require('../../images/paypalcards.png')} width="207" height="43.03" alt="online-payment" /></Link>
          </div>
          <div>
            <p className='title'>Socials</p>
            <div className="icon">
              <Link to='/'>
                <Icon name="facebook" />
              </Link>
              <Link to='/'>
                <Icon name="youtube" />
              </Link>
            </div>
          </div>
        </div>
      </AppBarSection>
      <AppBarSpacer style={{
        width: 100
      }} />
      <AppBarSection>
        <div className='copyright'>
          <span className='rights'>Progress | All rights reserved</span>
        </div>
      </AppBarSection>
    </AppBar>
  </div>;
};
