import { Header } from '../Header/Header';
import { Link } from 'react-router-dom';
import './ShoppingCartEmpty.css';

export const ShoppingCartEmpty = () => {
    return (
        <div className='shopcartempty'>
            <Header />
            <h1 className='pageTitle'>Your cart items</h1>
            <div className='icon'>
                <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="150" cy="150" r="150" fill="#56B280" fill-opacity="0.1" />
                    <path d="M122.342 204.091C122.342 211.773 116.118 218 108.44 218C100.761 218 94.5371 211.773 94.5371 204.091C94.5371 196.409 100.761 190.182 108.44 190.182C116.118 190.182 122.342 196.409 122.342 204.091Z" fill="#4AA675" />
                    <path d="M164.049 190.182C156.371 190.182 150.147 196.409 150.147 204.091C150.147 211.773 156.371 218 164.049 218C171.727 218 177.952 211.773 177.952 204.091C177.952 196.409 171.727 190.182 164.049 190.182Z" fill="#4AA675" />
                    <path d="M103.805 116H76V125.273H94.5365V180.909H177.951V171.636H103.805V116Z" fill="#4AA675" />
                    <path d="M113.073 162.363H187.219V153.091H113.073V162.363Z" fill="#4AA675" fill-opacity="0.2" />
                    <path d="M113.073 134.545V143.818H196.488V134.545H113.073Z" fill="#4AA675" fill-opacity="0.2" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M227.001 150.828L229.829 148L234.071 152.242L238.314 148L241.142 150.828L236.9 155.071L241.143 159.314L238.314 162.142L234.071 157.899L229.828 162.142L227 159.314L231.243 155.071L227.001 150.828Z" fill="#56B280" fill-opacity="0.6" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M169.001 67.8284L171.829 65L176.071 69.2423L180.314 65L183.142 67.8284L178.9 72.0707L183.143 76.3137L180.314 79.1421L176.071 74.8992L171.828 79.1421L169 76.3137L173.243 72.0707L169.001 67.8284Z" fill="#56B280" fill-opacity="0.6" />
                    <path d="M152 123.5C156.5 98 178 93 187 93C201.029 93 213.5 106 210 114C208.686 117.003 204.5 118.5 202 117.5C198.188 115.975 198 112.677 199 110C201.241 104 212.091 100.168 219.5 104C238.833 114 234.5 132 234.5 144" stroke="#4AA675" stroke-dasharray="2 2" />
                    <path d="M136.507 115.789C131.873 95.6467 133.066 85.3542 142.125 77.896C149.813 71.5664 159.177 69.4993 166.976 72.1782" stroke="#4AA675" stroke-dasharray="2 2" />
                </svg>
            </div>
            <h3 className='emptyMessage'>Unfortunately, your cart is empty...</h3>
            <span className='emptyCart'>Looks like you have not added anything to your cart. Go ahead and
                <Link to='/' style={{textDecoration:'none'}}><span className='explore'> explore our top picks.</span></Link>
            </span>
        </div>
    )
}