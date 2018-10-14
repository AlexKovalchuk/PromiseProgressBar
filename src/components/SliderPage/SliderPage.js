import React, {Component} from 'react';
import './SliderPage.styl';
import BottomSection from './BottomSection/BottomSection';

const BG_IMAGES = [
    '../../src/images/Background/bg1.jpg',
    '../../src/images/Background/bg2.jpg',
  ],
  SLIDER_IMGS = [
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


class SliderPage extends Component {

  render() {
    return (
      <section className='sliderPage__wrapper'>
        <div className="slider-big_wrapper">
          <img className="bg-img" src={BG_IMAGES[0]} alt="valerA"/>
          <img className="bg-img" src={BG_IMAGES[1]} alt="CHAMPION"/>
        </div>

        <div className="slider-small__wrapper">
          <ul className="slider-small-ul">
            {
              SLIDER_IMGS.map((item, index) => {
                const {img, title, price} = item;
                return (
                  <li className="slider-small-item-li"
                      key={`small-slider-item-${index}`}
                  >
                    <div className="slider-small-item-img-container-small">
                      <img className="slider-small-item-img" src={img} alt="img"/>
                      <span className="slider-small-item-img-go">{go}</span>
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

        <BottomSection />
      </section>
    )
  }
}

export default SliderPage;
