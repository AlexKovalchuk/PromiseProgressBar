import React, { Component } from 'react';
import ElephantWrapper from '../../component/elephantWrapper/ElephantWrapper';
import './AboutView.styl';

class AboutView extends Component {

  render() {
    return (
        <ElephantWrapper>
            <div className="about-block-wrapper">
                <h2 className="block-title">Проект «СЛОН» (легенда)</h2>
                <div className="about-description">
                    <p>А ви знаєте, як правильно обрати слона? Як його купити? Що потім з ним робити? І, взагалі,
                        що це за «СЛОН» такий?</p>
                    <p>«Сільпо» завжди пропонує товари найкращої якості. Щоб серед них було легше обирати, цього року
                        започатковується щорічна премія — «СЛОН». Це премія найкращого товару у своїй категорії —
                        символ якості, вигідної ціни та вашої любові до продукту!</p>
                    <p>У період з 04.10.2018 по 31.10.2018 голосуйте на сайті за ваші улюблені продукти в різних
                        категоріях, у кожній номінації отримуйте фіксовану багаторазову знижку на обрані товари,
                        використовуйте знижку в період з 01.11.2018 по 30.11.2018.</p>
                    <p>Не зволікайте — купіть «СЛОНА»!</p>

                </div>
            </div>
        </ElephantWrapper>
    );
  }
}
export default AboutView;
