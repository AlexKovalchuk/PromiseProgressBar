/**
 * Created by alex on 10/8/18.
 */
import React, {Component} from 'react';
import './SliderSmall.styl';
// img, title,
const SLIDER_IMGS = [
    {
      img: '../../../src/images/ItemsImages/img-1.jpg',
      title: 'Валерин Диван',
      price: '15000'
    },
    {
      img: '../../../src/images/ItemsImages/img-2.png',
      title: 'Васин Диван',
      price: '15000'
    },
    {
      img: '../../../src/images/ItemsImages/img-3.jpg',
      title: 'Максима Диван',
      price: '15000'
    },
    {
      img: '../../../src/images/ItemsImages/img-4.jpg',
      title: 'Гены Диван',
      price: '15000'
    },
    {
      img: '../../../src/images/ItemsImages/img-5.jpg',
      title: 'Гошинин Диван',
      price: '15000'
    },
  ],
  go = 'Перейти',
  hrn = 'грн',
  basket = 'Додати в кошик';

class SliderSmall extends Component {
  render() {
    return (
      <div className="slider-small__wrapper">
        <ul className="slider-small-ul">
          {
            SLIDER_IMGS.map((item, index) => {
              const {img, title, price} = item;
              return (
                <li className="slider-small-item-li"
                    key={`small-slider-item-${index}`}
                >
                  <div className="slider-small-item-img-container">
                    <img src={img} alt="img"/>
                    <span>{go}</span>
                  </div>
                  <div className="slider-small-item-description-container">
                    <div className="description-title">{title}</div>
                    <span className="description-icon">i</span>
                    <div className="description-price">
                      {price}&nbsp;<span>{hrn}</span>
                    </div>
                    <div className="description-add-basket">{basket}</div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default SliderSmall;
