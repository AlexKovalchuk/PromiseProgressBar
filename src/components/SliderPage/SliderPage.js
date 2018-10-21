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
  ulRef = null;
  prevRef = null;
  nextRef = null;
  liCounter = 1;

  componentDidMount(){
    this.setBigItem(this.liCounter, this.liCounter);
    this.setState({});
  }

  setBigItem(oldCounter, newCounter) {
    const liArr = document.querySelectorAll('.slider-small-item-li');
    const  li_img = document.querySelectorAll('.slider-small-item-img-container-small');
    const direction = oldCounter - newCounter;
    console.log(oldCounter,newCounter);

    if(newCounter < 0 || newCounter > liArr.length) return;

    if(liArr && liArr.length >= 2) {
        li_img[oldCounter].classList.remove('slider-small-item-li-big');
        li_img[newCounter].classList.add('slider-small-item-li-big');

      if(newCounter === 0) this.prevRef.style.display = 'none';
      else this.prevRef.style.display = 'block';

      if(newCounter === liArr.length-1) this.nextRef.style.display = 'none';
      else this.nextRef.style.display = 'block';
    }



  }

  render() {
    return (
      <section className='sliderPage__wrapper'>
        <div className="slider-big_wrapper">
          <img className="bg-img" src={BG_IMAGES[0]} alt="valerA"/>
          <img className="bg-img" src={BG_IMAGES[1]} alt="CHAMPION"/>
        </div>


        <div className="slider-small__wrapper">
          <ul className="slider-small-ul" ref={ref => {this.ulRef = ref}}>
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
          <div
            ref={ref => this.prevRef = ref}
            onClick={() => this.setBigItem(this.liCounter, --this.liCounter)}
            className="slider-small-buttons-prev"
          />
          <div
            ref={ref => this.nextRef = ref}
            onClick={() => this.setBigItem(this.liCounter, ++this.liCounter)}
            className="slider-small-buttons-next" />
        </div>

        <BottomSection />
      </section>
    )
  }
}

export default SliderPage;
